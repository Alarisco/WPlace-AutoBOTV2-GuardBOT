// === [Sistema de overlay basado en Blue Marble - Intercepción de tiles] ===
(() => {
  const TILE_SIZE = 3000; // Tamaño de tile en WPlace
  const DRAW_MULT = 3; // Factor de escalado para píxeles (como Blue Marble)

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
    console.log('[PLAN OVERLAY] Blue Marble tile system initialized');
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

        console.log('[PLAN OVERLAY] Intercepting tile request:', endpointName);

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

    console.log('[PLAN OVERLAY] Fetch interception started');
  }

  function stopFetchInterception() {
    if (!state.isIntercepting || !state.originalFetch) return;

    window.fetch = state.originalFetch;
    state.isIntercepting = false;

    console.log('[PLAN OVERLAY] Fetch interception stopped');
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

    console.log(`[PLAN OVERLAY] Processing tile: ${tileX},${tileY}`);

    // Verificar si este tile contiene píxeles de nuestro plan
    const tilePixels = getPixelsForTile(tileX, tileY);
    if (tilePixels.length === 0) {
      return tileBlob; // No hay píxeles en este tile
    }

    console.log(`[PLAN OVERLAY] Found ${tilePixels.length} pixels for tile ${tileX},${tileY}`);

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
    
    console.log(`[PLAN OVERLAY] setEnabled: ${state.enabled}`);
  }

  function setPlan(planItems, opts = {}) {
    if (!planItems || planItems.length === 0) {
      state.pixelPlan = null;
      console.log('[PLAN OVERLAY] Plan cleared');
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

    console.log(`[PLAN OVERLAY] Plan set: ${pixels.length} pixels`);
    
    if (typeof opts.enabled === 'boolean') {
      setEnabled(opts.enabled);
    }
  }

  function setNextBatchCount(count) {
    state.nextBatchCount = Math.max(0, Number(count || 0));
    console.log(`[PLAN OVERLAY] Next batch count: ${state.nextBatchCount}`);
  }

  function setAnchor(anchor) {
    state.anchor = anchor;
    console.log('[PLAN OVERLAY] Anchor set:', anchor);
  }

  function setAnchorCss(x, y) {
    // En el sistema de tiles no necesitamos ancla CSS - es solo para compatibilidad
    console.log('[PLAN OVERLAY] CSS anchor set (ignored in tile system):', { x, y });
  }

  function endSelectionMode() {
    // En el sistema de tiles no hay modo selección - es solo para compatibilidad
    console.log('[PLAN OVERLAY] Selection mode ended (ignored in tile system)');
  }

  function cleanup() {
    stopFetchInterception();
    state.pixelPlan = null;
    state.fetchedBlobQueue.clear();
    console.log('[PLAN OVERLAY] Cleanup completed');
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
    render: () => {}, // No-op en sistema de tiles
    cleanup,
    get state() { return state; }
  };

    console.log('[PLAN OVERLAY] Blue Marble tile system ready');
})();
})();
  const OVERLAY_STYLE_ID = 'wpa-plan-overlay-style';
  const OVERLAY_CLASS = 'wpa-plan-overlay';
  const TILE_SIZE = 3000; // Mantener en sincronía con IMAGE_DEFAULTS.TILE_SIZE

  const state = {
    enabled: false,
    boardLayer: null, // El contenedor padre del canvas principal (hereda transformaciones)
    mainCanvas: null, // Canvas principal de MapLibre
    canvas: null,
    ctx: null,
    // Lista normalizada: { globalX, globalY, r, g, b }
    items: [],
    // Bounding box global
    minX: 0, minY: 0, maxX: -1, maxY: -1,
    // Resaltado de siguiente batch
    nextBatchCount: 0,
    // Dimensiones explícitas de la imagen (si se proporcionan)
    imageWidth: null,
    imageHeight: null,
    // Modo selección: mientras sea true, se usa ancla CSS (position: fixed)
    selectingMode: false,
    // Observador para reanclar si el DOM cambia
    observer: null,
    // Ancla lógica y ancla CSS (para fijar el pin exactamente donde el usuario clicó)
    anchor: null, // { tileX, tileY, pxX, pxY }
    cssAnchorX: 0,
    cssAnchorY: 0,
  };

  function injectStyles() {
    if (document.getElementById(OVERLAY_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = OVERLAY_STYLE_ID;
    style.textContent = `
      .${OVERLAY_CLASS} {
        position: absolute !important;
        pointer-events: none !important;
        image-rendering: pixelated !important;
        z-index: 2147483646 !important;
        transform-origin: top left !important;
        opacity: 0.8 !important;
      }
    `;
    document.head.appendChild(style);
    console.log('[PLAN OVERLAY] Styles injected');
  }

  // == Blue Marble Pattern: Canvas Sibling Insertion ==
  function findMainCanvas() {
    // Usar exactamente el mismo selector que Blue Marble
    return document.querySelector('div#map canvas.maplibregl-canvas')
      || document.querySelector('canvas.maplibregl-canvas')
      || document.querySelector('canvas');
  }

  function ensureBoardLayer() {
    // Aplicar el patrón exacto de Blue Marble:
    // 1. Encontrar el canvas principal de MapLibre
    const mainCanvas = findMainCanvas();
    if (mainCanvas && state.mainCanvas !== mainCanvas) {
      state.mainCanvas = mainCanvas;
      console.log('[PLAN OVERLAY] Main canvas found:', mainCanvas);
    }
    
    // 2. Obtener el padre del canvas principal
    // Este padre es el que recibe las transformaciones de pan/zoom
    const canvasParent = state.mainCanvas?.parentElement;
    if (canvasParent && state.boardLayer !== canvasParent) {
      state.boardLayer = canvasParent;
      console.log('[PLAN OVERLAY] Board layer set to canvas parent:', canvasParent);
    }
    
    return state.boardLayer || document.body;
  }

  // Ya no copiamos transform; el overlay hereda al ser hijo del host.

  function ensureOverlayCanvas() {
    if (state.canvas && state.canvas.isConnected) return state.canvas;
    
    const boardLayer = ensureBoardLayer();
    if (!boardLayer) {
      console.error('[PLAN OVERLAY] No board layer found!');
      return null;
    }
    
    const c = document.createElement('canvas');
    
    // === APLICAR PATRÓN EXACTO DE BLUE MARBLE ===
    // 1. Usar mismo ID y clase que Blue Marble para heredar estilos
    c.id = 'bm-canvas';
    c.className = 'maplibregl-canvas';
    
    // 2. Configuración de posicionamiento absoluto (como Blue Marble)
    c.style.position = 'absolute';
    c.style.top = '0';
    c.style.left = '0';
    c.style.pointerEvents = 'none';
    c.style.imageRendering = 'pixelated';
    c.style.zIndex = '8999'; // Z-index de Blue Marble
    
    // 3. Dimensionamiento con DPR (Device Pixel Ratio) como Blue Marble
    if (state.mainCanvas) {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, state.mainCanvas.clientWidth);
      const h = Math.max(1, state.mainCanvas.clientHeight);
      
      // Tamaño del canvas interno (con DPR)
      c.width = w * dpr;
      c.height = h * dpr;
      
      // Tamaño visual en CSS
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      
      console.log('[PLAN OVERLAY] Canvas sized with DPR:', { 
        cssSize: `${w}x${h}`, 
        internalSize: `${c.width}x${c.height}`, 
        dpr 
      });
    }
    
    c.hidden = !state.enabled;

    state.canvas = c;
    state.ctx = c.getContext('2d', { willReadFrequently: false });
    
    // 4. INSERCIÓN COMO HERMANO DEL CANVAS PRINCIPAL (patrón Blue Marble)
    boardLayer.appendChild(c);
    
    console.log('[PLAN OVERLAY] Canvas created with Blue Marble pattern');
    console.log('[PLAN OVERLAY] - Canvas element:', c);
    console.log('[PLAN OVERLAY] - Parent (board layer):', boardLayer);
    console.log('[PLAN OVERLAY] - Main canvas:', state.mainCanvas);
    
    // Observer para re-adherir si el DOM cambia
    if (!state.observer) {
      state.observer = new window.MutationObserver(() => {
        if (!state.canvas?.isConnected) {
          console.log('[PLAN OVERLAY] Canvas disconnected, re-attaching...');
          const layer = ensureBoardLayer();
          if (layer && state.canvas) {
            layer.appendChild(state.canvas);
            applyOverlayPosition();
          }
        }
      });
      state.observer.observe(document.body, { childList: true, subtree: true });
    }
    
    return c;
  }

  function recomputeBounds() {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    
    for (const p of state.items) {
      if (p.globalX < minX) minX = p.globalX;
      if (p.globalY < minY) minY = p.globalY;
      if (p.globalX > maxX) maxX = p.globalX;
      if (p.globalY > maxY) maxY = p.globalY;
    }
    
    if (!isFinite(minX)) {
      minX = minY = 0;
      maxX = maxY = -1;
    }
    
    state.minX = minX;
    state.minY = minY;
    state.maxX = maxX;
    state.maxY = maxY;
  }

  function resizeCanvasToBounds() {
    if (!state.canvas) return;
    
    if (state.selectingMode || !state.mainCanvas) {
      // === MODO SELECCIÓN O SIN CANVAS PRINCIPAL ===
      // Usar el tamaño de la imagen o del área de píxeles
      let w = 2, h = 2;
      
      if (state.anchor && (state.imageWidth && state.imageHeight)) {
        // Si tenemos dimensiones de imagen, usar exactamente esas
        w = Math.max(1, state.imageWidth|0);
        h = Math.max(1, state.imageHeight|0);
      } else if (state.anchor) {
        // Calcular tamaño del área de píxeles relativa al ancla
        const ax = state.anchor.tileX * TILE_SIZE + (state.anchor.pxX || 0);
        const ay = state.anchor.tileY * TILE_SIZE + (state.anchor.pxY || 0);
        w = Math.max(1, (state.maxX - ax + 1) | 0);
        h = Math.max(1, (state.maxY - ay + 1) | 0);
      } else {
        // Tamaño total del área de píxeles
        w = Math.max(1, (state.maxX - state.minX + 1) | 0);
        h = Math.max(1, (state.maxY - state.minY + 1) | 0);
      }
      
      state.canvas.width = Math.max(2, w);
      state.canvas.height = Math.max(2, h);
      state.canvas.style.width = `${Math.max(2, w)}px`;
      state.canvas.style.height = `${Math.max(2, h)}px`;
      
      console.log('[PLAN OVERLAY] Canvas sized for selection/fallback mode:', {
        size: `${w}x${h}`,
        reason: state.selectingMode ? 'selection mode' : 'no main canvas'
      });
    } else {
      // === MODO NORMAL: TAMAÑO DEL VIEWPORT ===
      // Mantener el canvas del tamaño del viewport para herencia de transformaciones
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, state.mainCanvas.clientWidth);
      const h = Math.max(1, state.mainCanvas.clientHeight);
      
      // Solo redimensionar si cambió el tamaño
      if (state.canvas.style.width !== `${w}px` || state.canvas.style.height !== `${h}px`) {
        state.canvas.width = w * dpr;
        state.canvas.height = h * dpr;
        state.canvas.style.width = `${w}px`;
        state.canvas.style.height = `${h}px`;
        
        console.log('[PLAN OVERLAY] Canvas resized to match main canvas:', { 
          cssSize: `${w}x${h}`, 
          internalSize: `${state.canvas.width}x${state.canvas.height}` 
        });
      }
    }
  }

  function applyOverlayPosition() {
    if (!state.canvas || !state.anchor) return;
    
    // === APLICAR PATRÓN BLUE MARBLE: POSICIONAMIENTO ABSOLUTO ===
    // Blue Marble usa posición absoluta con coordenadas del sistema de tiles
    // y deja que el contenedor padre maneje las transformaciones de pan/zoom
    
    const boardLayer = ensureBoardLayer();
    
    if (state.selectingMode && (state.cssAnchorX || state.cssAnchorY)) {
      // Durante selección: usar position fixed en el body para visibilidad inmediata
      if (state.canvas.parentElement !== document.body) {
        document.body.appendChild(state.canvas);
      }
      state.canvas.style.position = 'fixed';
      state.canvas.style.left = `${state.cssAnchorX}px`;
      state.canvas.style.top = `${state.cssAnchorY}px`;
      state.canvas.style.transform = 'none';
      console.log('[PLAN OVERLAY] Selection mode: fixed positioning at CSS coords:', {
        x: state.cssAnchorX, 
        y: state.cssAnchorY
      });
    } else {
      // Modo normal: usar patrón Blue Marble con posición absoluta
      if (state.canvas.parentElement !== boardLayer) {
        boardLayer.appendChild(state.canvas);
      }
      
      // === POSICIONAMIENTO EXACTO COMO BLUE MARBLE ===
      state.canvas.style.position = 'absolute';
      state.canvas.style.top = '0';
      state.canvas.style.left = '0';
      // NO aplicar transform manual - se hereda del contenedor padre
      state.canvas.style.transform = 'none';
      
      console.log('[PLAN OVERLAY] Blue Marble mode: absolute positioning at origin');
      console.log('[PLAN OVERLAY] - Canvas will inherit transform from parent:', boardLayer);
    }
  }

  function clearCanvas() {
    if (!state.ctx) return;
    state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
  }

  function renderPlan() {
    ensureOverlayCanvas();
    recomputeBounds();
    resizeCanvasToBounds();
    applyOverlayPosition();

    const { ctx, items, canvas } = state;
    clearCanvas();

    console.log(`[PLAN OVERLAY] Rendering ${items.length} items in ${canvas.width}x${canvas.height} canvas`);

    if (items.length === 0 || !state.anchor) return;

    const anchorGlobalX = state.anchor.tileX * TILE_SIZE + (state.anchor.pxX || 0);
    const anchorGlobalY = state.anchor.tileY * TILE_SIZE + (state.anchor.pxY || 0);
    
    console.log('[PLAN OVERLAY] Rendering with anchor at global coords:', {
      x: anchorGlobalX, 
      y: anchorGlobalY
    });

    // === RENDERIZADO CORREGIDO: COORDENADAS RELATIVAS ===
    // Todas las coordenadas se dibujan relativas al ancla
    ctx.globalAlpha = 0.7;
    let pixelsDrawn = 0;
    
    for (const p of items) {
      // Convertir coordenadas globales a relativas al ancla
      const x = p.globalX - anchorGlobalX;
      const y = p.globalY - anchorGlobalY;
      
      // Solo dibujar si está dentro del canvas
      if (x >= 0 && y >= 0 && x < canvas.width && y < canvas.height) {
        ctx.fillStyle = `rgb(${p.r|0},${p.g|0},${p.b|0})`;
        ctx.fillRect(x, y, 1, 1);
        pixelsDrawn++;
      }
    }

    // Resaltado del siguiente batch
    if (state.nextBatchCount > 0) {
      const n = Math.min(state.nextBatchCount, items.length);
      ctx.globalAlpha = 1.0;
      let batchPixelsDrawn = 0;
      
      for (let i = 0; i < n; i++) {
        const p = items[i];
        const x = p.globalX - anchorGlobalX;
        const y = p.globalY - anchorGlobalY;
        
        if (x >= 0 && y >= 0 && x < canvas.width && y < canvas.height) {
          ctx.fillStyle = `rgb(${p.r|0},${p.g|0},${p.b|0})`;
          ctx.fillRect(x, y, 1, 1);
          batchPixelsDrawn++;
        }
      }
      
      console.log(`[PLAN OVERLAY] Batch pixels highlighted: ${batchPixelsDrawn}/${n}`);
    }
    
    console.log(`[PLAN OVERLAY] Rendering complete - drew ${pixelsDrawn}/${items.length} pixels in canvas`);
  }

  function setEnabled(enabled) {
    state.enabled = !!enabled;
    ensureOverlayCanvas();
    state.canvas.hidden = !state.enabled;
    console.log(`[PLAN OVERLAY] setEnabled: ${state.enabled}, canvas hidden: ${state.canvas.hidden}`);
    
    if (state.enabled && state.items.length > 0) {
      renderPlan();
    }
  }

  function setNextBatchCount(count) {
    state.nextBatchCount = Math.max(0, Number(count || 0) | 0);
    if (state.enabled) renderPlan();
  }

  // Conversión desde formato tile/local a coordenadas globales
  function normalizePlanItems(planItems, anchor) {
    const result = [];
    for (const it of planItems || []) {
      let gx = 0, gy = 0;
      
      if (typeof it.tileX === 'number' && typeof it.tileY === 'number' &&
          typeof it.localX === 'number' && typeof it.localY === 'number') {
        // Formato tile/local directo
        gx = it.tileX * TILE_SIZE + it.localX;
        gy = it.tileY * TILE_SIZE + it.localY;
      } else if (anchor && typeof it.imageX === 'number' && typeof it.imageY === 'number') {
        // Formato imageX/Y con ancla
        const baseX = anchor.tileX * TILE_SIZE + (anchor.pxX || 0);
        const baseY = anchor.tileY * TILE_SIZE + (anchor.pxY || 0);
        gx = baseX + it.imageX;
        gy = baseY + it.imageY;
      } else {
        continue;
      }
      
      const r = it.color?.r ?? 0;
      const g = it.color?.g ?? 0;
      const b = it.color?.b ?? 0;
      result.push({ globalX: gx|0, globalY: gy|0, r, g, b });
    }
    
    console.log(`[PLAN OVERLAY] Normalized ${result.length} items, sample coords:`, 
      result.slice(0, 3).map(p => `(${p.globalX}, ${p.globalY})`));
    
    return result;
  }

  function setPlanItemsFromTileList(list, opts = {}) {
    const normalized = normalizePlanItems(list, opts.anchor);
    state.items = normalized;
    console.log(`[PLAN OVERLAY] setPlan: ${list?.length || 0} items -> ${normalized.length} normalized items`);
    
    if (typeof opts.nextBatchCount === 'number') {
      state.nextBatchCount = Math.max(0, opts.nextBatchCount | 0);
    }
    if (typeof opts.imageWidth === 'number' && typeof opts.imageHeight === 'number') {
      state.imageWidth = Math.max(1, opts.imageWidth|0);
      state.imageHeight = Math.max(1, opts.imageHeight|0);
      console.log('[PLAN OVERLAY] Image dimensions set for overlay:', state.imageWidth, 'x', state.imageHeight);
    } else {
      state.imageWidth = null;
      state.imageHeight = null;
    }
    if (typeof opts.enabled === 'boolean') {
      setEnabled(opts.enabled);
    }
    if (state.enabled) renderPlan();
  }

  function cleanup() {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
    if (state.canvas && state.canvas.parentNode) {
      state.canvas.parentNode.removeChild(state.canvas);
    }
  }

  function setAnchor(anchor) {
    if (!anchor) return;
    
    // Guardar la información del ancla para compatibilidad
    state.anchor = {
      tileX: anchor.tileX|0,
      tileY: anchor.tileY|0,
      pxX: (anchor.pxX||0)|0,
      pxY: (anchor.pxY||0)|0,
    };
    
    console.log('[PLAN OVERLAY] Anchor set:', state.anchor);
    
    // Calcular coordenadas base del ancla según sistema WPlace
    const anchorGlobalX = state.anchor.tileX * TILE_SIZE + state.anchor.pxX;
    const anchorGlobalY = state.anchor.tileY * TILE_SIZE + state.anchor.pxY;
    console.log('[PLAN OVERLAY] Anchor global coords:', { x: anchorGlobalX, y: anchorGlobalY });
    
  ensureOverlayCanvas();
    renderPlan();
  }

function setAnchorCss(x, y) {
  state.cssAnchorX = Math.round(Number(x) || 0);
  state.cssAnchorY = Math.round(Number(y) || 0);
  state.selectingMode = true;
  console.log('[PLAN OVERLAY] CSS anchor set:', { x: state.cssAnchorX, y: state.cssAnchorY });
  if (state.enabled) {
  applyOverlayPosition();
  }
}

function endSelectionMode() {
  state.selectingMode = false;
  // No borramos los valores por si se quiere depurar; simplemente dejamos de usarlos
  if (state.enabled) applyOverlayPosition();
}

// API pública compatible con la anterior
  window.__WPA_PLAN_OVERLAY__ = {
    injectStyles,
    setEnabled,
    setPlan: setPlanItemsFromTileList, // Alias para compatibilidad
    setPlanItemsFromTileList,
    setNextBatchCount,
    setAnchor,
    setAnchorCss,
  endSelectionMode,
    render: renderPlan,
    cleanup,
    get state() { return state; },
  };
})();
