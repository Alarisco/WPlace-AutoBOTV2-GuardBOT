// === [Sistema de overlay basado en Blue Marble - Intercepción de tiles] ===
(() => {
  const TILE_SIZE = 3000; // Tamaño de tile en WPlace

  const state = {
    enabled: false,
    templates: [], // Plantillas estilo Blue Marble
    templatesShouldBeDrawn: true,
    tileSize: 1000, // Tamaño de tile (como Blue Marble)
    drawMult: 3, // Multiplicador de dibujo
    // Plan de píxeles actual
    pixelPlan: null,
    nextBatchCount: 0,
    anchor: null, // { tileX, tileY, pxX, pxY }
    imageWidth: null,
    imageHeight: null,
    // Sistema de intercepción
    originalFetch: null,
    fetchedBlobQueue: new Map(),
    isIntercepting: false
  };

  function injectStyles() {
    // No necesitamos estilos CSS adicionales - Blue Marble usa el sistema de tiles nativo
    // Sistema inicializado silenciosamente
  }

  // === SISTEMA DE INTERCEPCIÓN DE FETCH (como Blue Marble) ===
  function startFetchInterception() {
    if (state.isIntercepting) return;

    state.originalFetch = window.fetch;
    state.isIntercepting = true;

    window.fetch = async function(...args) {
      const response = await state.originalFetch.apply(this, args);
      const cloned = response.clone();

      const endpointName = ((args[0] instanceof Request) ? args[0]?.url : args[0]) || 'ignore';
      const contentType = cloned.headers.get('content-type') || '';

      // Interceptar solo tiles de imagen (como Blue Marble)
      if (contentType.includes('image/') && 
          endpointName.includes('/tiles/') && 
          !endpointName.includes('openfreemap') && 
          !endpointName.includes('maps')) {

        // Interceptando tile request silenciosamente

        try {
          const blob = await cloned.blob();
          const processedBlob = await drawPlanOnTile(blob, endpointName);
          
          return new Response(processedBlob, {
            headers: cloned.headers,
            status: cloned.status,
            statusText: cloned.statusText
          });
        } catch (error) {
          console.error('[PLAN OVERLAY] Error processing tile:', error);
          return response;
        }
      }

      return response;
    };

    // Intercepción de fetch iniciada
  }

  function stopFetchInterception() {
    if (!state.isIntercepting || !state.originalFetch) return;

    window.fetch = state.originalFetch;
    state.isIntercepting = false;

    // Intercepción de fetch detenida
  }

  // === PROCESAMIENTO DE TILES (como Blue Marble) ===
  async function drawPlanOnTile(tileBlob, endpointUrl) {
    if (!state.enabled || !state.templatesShouldBeDrawn || !state.pixelPlan) {
      return tileBlob;
    }

    // Extraer coordenadas del tile desde la URL
    // Formato: ".../tiles/tileX/tileY/zoom.png"
    const urlParts = endpointUrl.split('/');
    const tileY = parseInt(urlParts[urlParts.length - 1].replace('.png', ''));
    const tileX = parseInt(urlParts[urlParts.length - 2]);

    if (isNaN(tileX) || isNaN(tileY)) {
      console.warn('[PLAN OVERLAY] Could not extract tile coordinates from URL:', endpointUrl);
      return tileBlob;
    }

    // Procesando tile silenciosamente

    // Verificar si este tile contiene píxeles de nuestro plan
    const tilePixels = getPixelsForTile(tileX, tileY);
    if (tilePixels.length === 0) {
      return tileBlob; // No hay píxeles en este tile
    }

    // Píxeles encontrados para tile (log reducido)

    // Procesar el tile (como Blue Marble)
    const drawSize = state.tileSize * state.drawMult;
    const tileBitmap = await createImageBitmap(tileBlob);
    
    const canvas = new OffscreenCanvas(drawSize, drawSize);
    const context = canvas.getContext('2d');
    
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, drawSize, drawSize);
    context.drawImage(tileBitmap, 0, 0, drawSize, drawSize);

    // Dibujar píxeles del plan (como Blue Marble dibuja templates)
    drawPixelsOnTile(context, tilePixels, tileX, tileY);

    return await canvas.convertToBlob({ type: 'image/png' });
  }

  function getPixelsForTile(tileX, tileY) {
    if (!state.pixelPlan || !state.pixelPlan.pixels) return [];

    return state.pixelPlan.pixels.filter(pixel => {
      // Calcular en qué tile está este píxel
      const pixelTileX = Math.floor(pixel.globalX / TILE_SIZE);
      const pixelTileY = Math.floor(pixel.globalY / TILE_SIZE);
      return pixelTileX === tileX && pixelTileY === tileY;
    });
  }

  function drawPixelsOnTile(context, pixels, tileX, tileY) {
    const tileStartX = tileX * TILE_SIZE;
    const tileStartY = tileY * TILE_SIZE;

    // Configurar transparencia del overlay
    context.globalAlpha = 0.7;

    for (const pixel of pixels) {
      // Convertir coordenadas globales a coordenadas locales del tile
      const localX = (pixel.globalX - tileStartX) * state.drawMult + 1; // +1 para centrar como Blue Marble
      const localY = (pixel.globalY - tileStartY) * state.drawMult + 1;

      // Solo dibujar si está dentro del tile
      if (localX >= 0 && localX < state.tileSize * state.drawMult && 
          localY >= 0 && localY < state.tileSize * state.drawMult) {
        
        context.fillStyle = `rgb(${pixel.r},${pixel.g},${pixel.b})`;
        context.fillRect(localX, localY, 1, 1);
      }
    }

    // Resaltar próximo batch con mayor opacidad
    if (state.nextBatchCount > 0) {
      context.globalAlpha = 1.0;
      const batchPixels = pixels.slice(0, state.nextBatchCount);
      
      for (const pixel of batchPixels) {
        const localX = (pixel.globalX - tileStartX) * state.drawMult + 1;
        const localY = (pixel.globalY - tileStartY) * state.drawMult + 1;

        if (localX >= 0 && localX < state.tileSize * state.drawMult && 
            localY >= 0 && localY < state.tileSize * state.drawMult) {
          
          context.fillStyle = `rgb(${pixel.r},${pixel.g},${pixel.b})`;
          context.fillRect(localX, localY, 1, 1);
        }
      }
    }
  }

  // === API PÚBLICA (compatible con la anterior) ===
  function setEnabled(enabled) {
    state.enabled = !!enabled;
    
    if (state.enabled) {
      startFetchInterception();
    } else {
      stopFetchInterception();
    }
    
    // Estado habilitado/deshabilitado silenciosamente
  }

  function setPlan(planItems, opts = {}) {
    if (!planItems || planItems.length === 0) {
      state.pixelPlan = null;
      // Plan limpiado silenciosamente
      return;
    }

    // Convertir formato Auto-Image a formato interno
    const pixels = [];
    for (const item of planItems) {
      let globalX, globalY;
      
      if (typeof item.tileX === 'number' && typeof item.localX === 'number') {
        // Formato tile/local
        globalX = item.tileX * TILE_SIZE + item.localX;
        globalY = item.tileY * TILE_SIZE + item.localY;
      } else if (opts.anchor && typeof item.imageX === 'number') {
        // Formato imageX/Y con ancla
        const baseX = opts.anchor.tileX * TILE_SIZE + (opts.anchor.pxX || 0);
        const baseY = opts.anchor.tileY * TILE_SIZE + (opts.anchor.pxY || 0);
        globalX = baseX + item.imageX;
        globalY = baseY + item.imageY;
      } else {
        continue;
      }

      pixels.push({
        globalX: globalX,
        globalY: globalY,
        r: item.color?.r || 0,
        g: item.color?.g || 0,
        b: item.color?.b || 0
      });
    }

    state.pixelPlan = { pixels };
    state.nextBatchCount = opts.nextBatchCount || 0;
    state.anchor = opts.anchor || null;
    state.imageWidth = opts.imageWidth || null;
    state.imageHeight = opts.imageHeight || null;

    // Plan establecido silenciosamente
    
    if (typeof opts.enabled === 'boolean') {
      setEnabled(opts.enabled);
    }
  }

  function setNextBatchCount(count) {
    state.nextBatchCount = Math.max(0, Number(count || 0));
    // Contador de próximo lote actualizado
  }

  function setAnchor(anchor) {
    state.anchor = anchor;
    // Ancla establecida silenciosamente
  }

  function setAnchorCss() {
    // En el sistema de tiles no necesitamos ancla CSS - es solo para compatibilidad
    // Ancla CSS establecida (ignorada en sistema de tiles)
  }

  function endSelectionMode() {
    // En el sistema de tiles no hay modo selección - es solo para compatibilidad
    // Modo selección terminado (ignorado en sistema de tiles)
  }

  function cleanup() {
    stopFetchInterception();
    state.pixelPlan = null;
    state.fetchedBlobQueue.clear();
    // Limpieza completada
  }

  // === API GLOBAL (compatible con la anterior) ===
  window.__WPA_PLAN_OVERLAY__ = {
    injectStyles,
    setEnabled,
    setPlan,
    setPlanItemsFromTileList: setPlan, // Alias
    setNextBatchCount,
    setAnchor,
    setAnchorCss,
    endSelectionMode,
    render: () => { /* No-op en sistema de tiles */ },
    cleanup,
    get state() { return state; }
  };

  // Sistema Blue Marble listo
})();
