// === [Overlay del plan de pintado - Nueva implementación] ==================
(() => {
  const OVERLAY_STYLE_ID = 'wpa-plan-overlay-style';
  const OVERLAY_CLASS = 'wpa-plan-overlay';
  const TILE_SIZE = 3000; // Mantener en sincronía con IMAGE_DEFAULTS.TILE_SIZE

  const state = {
    enabled: false,
    boardLayer: null, // La capa transformada del mapa
  mainCanvas: null, // Canvas principal (sólo para elegir host)
  transformHost: null, // Elemento cuyo style.transform cambia con pan/zoom
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

  // == Board Layer Finder (pan/zoom layer) ==
  function findTransformedBoardLayer() {
    console.log('[PLAN OVERLAY] Searching for MapLibre GL transformed layer...');
    
    // 1) Buscar específicamente contenedores de MapLibre GL
    const maplibreSelectors = [
      '.maplibregl-map',
      '.maplibregl-canvas-container', 
      '.mapboxgl-map',
      '.mapboxgl-canvas-container'
    ];
    
    for (const selector of maplibreSelectors) {
      const elements = document.querySelectorAll(selector);
      for (const el of elements) {
        const cs = window.getComputedStyle(el);
        console.log(`[PLAN OVERLAY] Checking MapLibre container: ${selector}`, el, 'transform:', cs.transform);
        
        // Buscar un elemento padre o hijo con transform
        if (cs.transform && cs.transform !== 'none') {
          console.log('[PLAN OVERLAY] ✅ Found transformed MapLibre container:', el);
          return el;
        }
        
        // También buscar en el padre inmediato
        if (el.parentElement) {
          const parentCs = window.getComputedStyle(el.parentElement);
          if (parentCs.transform && parentCs.transform !== 'none') {
            console.log('[PLAN OVERLAY] ✅ Found transformed MapLibre parent:', el.parentElement);
            return el.parentElement;
          }
        }
        
        // Y en los hijos directos
        for (const child of el.children) {
          const childCs = window.getComputedStyle(child);
          if (childCs.transform && childCs.transform !== 'none') {
            console.log('[PLAN OVERLAY] ✅ Found transformed MapLibre child:', child);
            return child;
          }
        }
      }
    }
    
    // 2) Buscar el canvas principal y subir por TODOS los ancestros
    const canvases = document.querySelectorAll('canvas');
    console.log('[PLAN OVERLAY] Found canvases:', canvases.length);
    
    for (const cv of canvases) {
      console.log('[PLAN OVERLAY] Checking canvas:', cv, 'rect:', cv.getBoundingClientRect());
      
      let el = cv.parentElement;
      while (el && el !== document.body) {
        const cs = window.getComputedStyle(el);
        console.log('[PLAN OVERLAY] Checking parent:', el.tagName, el.className, el.id, 'transform:', cs.transform);
        
        if (cs.transform && cs.transform !== 'none') {
          console.log('[PLAN OVERLAY] ✅ Found transformed ancestor:', el, 'transform:', cs.transform);
          return el;
        }
        el = el.parentElement;
      }
    }
    
    // 3) Como último recurso, usar el contenedor MapLibre sin transform
    const mapContainer = document.querySelector('.maplibregl-map') || 
                        document.querySelector('.maplibregl-canvas-container') ||
                        document.querySelector('.mapboxgl-map') ||
                        document.querySelector('.mapboxgl-canvas-container');
    
    if (mapContainer) {
      console.log('[PLAN OVERLAY] Using MapLibre container without transform:', mapContainer);
      return mapContainer;
    }
    
    // 4) Fallback final: padre del canvas
    const firstCanvas = document.querySelector('canvas');
    if (firstCanvas && firstCanvas.parentElement) {
      const parent = firstCanvas.parentElement;
      console.log('[PLAN OVERLAY] Using canvas parent as final fallback:', parent);
      return parent;
    }
    
    console.log('[PLAN OVERLAY] Using document.body as absolute final fallback');
    return document.body;
  }

  function ensureBoardLayer() {
    // Preferir el contenedor raíz del mapa para evitar recortes de tamaño 0
    const mapRoot = document.querySelector('.maplibregl-map') || document.querySelector('.mapboxgl-map');
    // Intentar el selector exacto del canvas principal
    const mainCanvas = document.querySelector('div#map canvas.maplibregl-canvas')
      || document.querySelector('canvas.maplibregl-canvas')
      || document.querySelector('canvas');
    if (mainCanvas && state.mainCanvas !== mainCanvas) {
      state.mainCanvas = mainCanvas;
    }
    const layer = mapRoot || (state.mainCanvas && state.mainCanvas.parentElement) || findTransformedBoardLayer();
    if (layer && state.boardLayer !== layer) {
      state.boardLayer = layer;
      console.log('[PLAN OVERLAY] Board layer updated (mainCanvas.parentElement):', layer);
    }
    return state.boardLayer || document.body;
  }

  function findTransformHost(root) {
    if (!root) return null;
    // Preferidos conocidos de MapLibre/Mapbox
    const preferred = root.querySelector('.maplibregl-canvas-container')
                     || root.querySelector('.mapboxgl-canvas-container')
                     || root.querySelector('.maplibregl-transform')
                     || root.querySelector('.mapboxgl-transform');
    const candidates = [];
    if (preferred) candidates.push(preferred);
    // Escanear hijos directos en busca de transform activo
    const all = root.querySelectorAll('*');
    for (const el of all) {
      try {
        const cs = window.getComputedStyle(el);
        if (cs && cs.transform && cs.transform !== 'none') {
          candidates.push(el);
        }
      } catch (e) { void e; }
    }
    // Si no hay candidatos con transform, probar el propio root
    if (candidates.length === 0) {
      const csr = window.getComputedStyle(root);
      if (csr.transform && csr.transform !== 'none') return root;
      return null;
    }
    // Elegir el más profundo (último encontrado suele ser más específico)
    return candidates[candidates.length - 1];
  }

  function syncOverlayTransformFromHost(reason = 'init') {
    if (!state.canvas) return;
    const host = state.transformHost || findTransformHost(state.boardLayer);
    if (host) {
      state.transformHost = host;
      const tx = host.style?.transform || window.getComputedStyle(host).transform;
      if (tx && tx !== 'none') {
        state.canvas.style.transform = tx;
        console.log('[PLAN OVERLAY] Transform copied from host:', tx, `(${reason})`);
        return;
      }
    }
    // Fallback sin transform
    state.canvas.style.transform = 'none';
  }

  function ensureOverlayCanvas() {
    if (state.canvas && state.canvas.isConnected) return state.canvas;
    
    const host = ensureBoardLayer();
  const c = document.createElement('canvas');
  // Replicar atributos de BlueMarble para heredar estilos de MapLibre
  c.id = 'bm-canvas';
  c.className = `maplibregl-canvas ${OVERLAY_CLASS}`;
  c.style.position = 'absolute';
    c.style.pointerEvents = 'none';
    c.style.imageRendering = 'pixelated';
  c.style.transformOrigin = 'top left';
    c.style.zIndex = '2147483646';
  // DEBUG visual (se puede retirar cuando esté estable)
  // c.style.border = '1px dashed #ff0';
  // c.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
    c.hidden = !state.enabled;

    state.canvas = c;
    state.ctx = c.getContext('2d', { willReadFrequently: false });
    host.appendChild(c);
  // Sincronizar transform de inicio
  state.transformHost = findTransformHost(state.boardLayer);
  syncOverlayTransformFromHost('ensureOverlayCanvas');

    // Sincronizar tamaño con DPR del canvas principal (como BlueMarble)
    try {
      const mainCanvas = state.mainCanvas || document.querySelector('div#map canvas.maplibregl-canvas')
        || document.querySelector('canvas.maplibregl-canvas')
        || document.querySelector('canvas');
      if (mainCanvas) {
        state.mainCanvas = mainCanvas;
        const dpr = window.devicePixelRatio || 1;
        const w = Math.max(1, mainCanvas.clientWidth);
        const h = Math.max(1, mainCanvas.clientHeight);
        state.canvas.width = w * dpr; // tamaño interno
        state.canvas.height = h * dpr;
        state.canvas.style.width = `${w}px`;
        state.canvas.style.height = `${h}px`;
        // Nota: nuestra lógica de render usa coordenadas absolutas con left/top por bounds,
        // si se posiciona por bounds, actualizaremos tamaño después de recomputeBounds.
      }
    } catch (e) {
      console.log('[PLAN OVERLAY] Error syncing DPR size:', e);
    }
    
    console.log('[PLAN OVERLAY] Canvas created and added to transformed layer:', host);
    console.log('[PLAN OVERLAY] Canvas element:', c);
    console.log('[PLAN OVERLAY] Host element rect:', host.getBoundingClientRect());
    
  // (Pan/zoom desactivado temporalmente)

    // Observer para re-adherir si el DOM cambia y para cambios de estilo del host
    if (!state.observer) {
      state.observer = new window.MutationObserver((mutations) => {
        if (!state.canvas?.isConnected) {
          console.log('[PLAN OVERLAY] Canvas disconnected, re-attaching...');
          const h = ensureBoardLayer();
          h.appendChild(state.canvas);
          applyOverlayPosition();
        }
        // Si cambió el style del host transformado, re-sincronizar
        for (const m of mutations) {
          if (m.type === 'attributes' && m.target === state.transformHost && m.attributeName === 'style') {
            syncOverlayTransformFromHost('mutation');
          }
        }
      });
      // Observar el body para re-anclajes
      state.observer.observe(document.body, { childList: true, subtree: true });
      // Observar cambios de estilo en el host si existe
      if (state.transformHost) {
        state.observer.observe(state.transformHost, { attributes: true, attributeFilter: ['style'] });
      }
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
    // Dimensionar el canvas según el área a dibujar relativa al ancla
  let w = 2, h = 2; // mínimo visible
    if (state.anchor && (state.imageWidth && state.imageHeight)) {
      // Si tenemos dimensiones de imagen, usar exactamente esas
      w = Math.max(1, state.imageWidth|0);
      h = Math.max(1, state.imageHeight|0);
    } else if (state.anchor) {
      const ax = state.anchor.tileX * TILE_SIZE + (state.anchor.pxX || 0);
      const ay = state.anchor.tileY * TILE_SIZE + (state.anchor.pxY || 0);
      w = Math.max(1, (state.maxX - ax + 1) | 0);
      h = Math.max(1, (state.maxY - ay + 1) | 0);
    } else {
      w = Math.max(1, (state.maxX - state.minX + 1) | 0);
      h = Math.max(1, (state.maxY - state.minY + 1) | 0);
    }
  state.canvas.width = Math.max(2, w);
  state.canvas.height = Math.max(2, h);
    // Mantener estilo igual al contenido (CSS px)
  state.canvas.style.width = `${Math.max(2, w)}px`;
  state.canvas.style.height = `${Math.max(2, h)}px`;
  }

  function applyOverlayPosition() {
    if (!state.canvas || !state.anchor) return;
    // Posicionar el canvas en el sistema de coordenadas de WPlace usando el ancla (pin)
    const ax = state.anchor.tileX * TILE_SIZE + (state.anchor.pxX || 0);
    const ay = state.anchor.tileY * TILE_SIZE + (state.anchor.pxY || 0);
    // Si existe ancla CSS (coordenadas de clic en pantalla), usarla para que sea visible
    const hasCss = (state.cssAnchorX || state.cssAnchorY);
    if (hasCss) {
      // Reparentar al body para que position:fixed no quede atrapado por transforms
      if (state.canvas.parentElement !== document.body) {
        document.body.appendChild(state.canvas);
      }
      state.canvas.style.position = 'fixed';
      state.canvas.style.left = `${state.cssAnchorX}px`;
      state.canvas.style.top = `${state.cssAnchorY}px`;
      state.canvas.style.transform = 'none'; // fixed no usa transform del host
    } else {
      // Posicionamiento absoluto en el host del mapa
      const host = ensureBoardLayer();
      if (state.canvas.parentElement !== host) {
        host.appendChild(state.canvas);
      }
      state.canvas.style.position = 'absolute';
      state.canvas.style.left = `${ax}px`;
      state.canvas.style.top = `${ay}px`;
      // Copiar transform del host para seguir pan/zoom
      state.transformHost = findTransformHost(state.boardLayer);
      syncOverlayTransformFromHost('applyOverlayPosition');
    }
    // Debug opcional
    // state.canvas.style.border = '1px dashed #ff0';
    console.log('[PLAN OVERLAY] Positioned at anchor (global coords):', { left: ax, top: ay });
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

    console.log(`[PLAN OVERLAY] Rendering ${items.length} items in ${canvas.width}x${canvas.height} canvas (anchored)`);

    if (items.length === 0) return;

    // Pintado base relativo al ancla (pin) -> top-left del canvas es el ancla
    const ax = state.anchor.tileX * TILE_SIZE + (state.anchor.pxX || 0);
    const ay = state.anchor.tileY * TILE_SIZE + (state.anchor.pxY || 0);
    ctx.globalAlpha = 0.7;
    for (const p of items) {
      const x = (p.globalX - ax) | 0;
      const y = (p.globalY - ay) | 0;
      if (x < 0 || y < 0) continue; // fuera del canvas anclado
      ctx.fillStyle = `rgb(${p.r|0},${p.g|0},${p.b|0})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Resaltado del siguiente batch
    if (state.nextBatchCount > 0) {
      const n = Math.min(state.nextBatchCount, items.length);
      ctx.globalAlpha = 1.0;
      for (let i = 0; i < n; i++) {
        const p = items[i];
        const x = (p.globalX - ax) | 0;
        const y = (p.globalY - ay) | 0;
        if (x < 0 || y < 0) continue;
        ctx.fillStyle = `rgb(${p.r|0},${p.g|0},${p.b|0})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
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
  console.log('[PLAN OVERLAY] CSS anchor set:', { x: state.cssAnchorX, y: state.cssAnchorY });
  if (state.enabled) {
  applyOverlayPosition();
  }
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
    render: renderPlan,
    cleanup,
    get state() { return state; },
  };
})();
