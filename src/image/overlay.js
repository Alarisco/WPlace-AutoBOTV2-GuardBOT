// === [Overlay de plantilla] ==================================================
(() => {
  // Estado y constantes del overlay
  const OVERLAY_CLASS = 'wpa-overlay';
  const OVERLAY_STYLE_ID = 'wpa-overlay-style';

  // Guardamos también coordenadas CSS del click (relativas al contenedor del tablero)
  const overlayState = {
    enabled: false,
    // dataURL o URL de la imagen ya cargada por Auto-Image
    src: null,
    // ancla superior-izquierda (CSS px relativos al contenedor del board)
    cssX: 0,
    cssY: 0,
    // fallback: coordenadas lógicas que ya maneja el bot
    tileX: 0,
    tileY: 0,
    pxX: 0,
    pxY: 0,
    // referencias DOM
    node: null,
    board: null,
    observer: null,
  };

  // 1) Estilos del overlay (aislados, sin interferir)
  function injectOverlayStyles() {
    if (document.getElementById(OVERLAY_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = OVERLAY_STYLE_ID;
    style.textContent = `
      .${OVERLAY_CLASS} {
        position: absolute !important;
        pointer-events: none !important; /* no intercepta clics */
        image-rendering: pixelated !important;
        opacity: 0.65;                 /* opacidad visible, ajustable */
        z-index: 2147483646;           /* muy alto, pero deja pasar eventos */
        transform-origin: top left;    /* estabilidad en zoom */
        will-change: transform, left, top;
      }
    `;
    document.head.appendChild(style);
  }

  // 2) Encontrar el contenedor del tablero (mismo que usa wplace para tiles/canvas)
  function findBoardContainer() {
    // Heurística robusta: buscar el canvas principal y usar su padre.
    // Mantener fallback para futuros cambios del DOM.
    const candidates = [
      document.querySelector('canvas')?.parentElement,
      document.querySelector('div[id*="board"],div[class*="board"]'),
      document.querySelector('div[class*="canvas"],div[id*="canvas"]'),
    ].filter(Boolean);
    return candidates[0] || document.body;
  }

  // 3) Crear el nodo overlay si no existe
  function ensureOverlayNode() {
    if (overlayState.node && overlayState.node.isConnected) return overlayState.node;
    overlayState.board = findBoardContainer();
    const img = document.createElement('img');
    img.className = OVERLAY_CLASS;
    img.hidden = !overlayState.enabled;
    overlayState.node = img;
    overlayState.board.appendChild(img);

    // Observar si el board se re-monta (cambios de pantalla, recargas parciales)
    if (!overlayState.observer && window.MutationObserver) {
      overlayState.observer = new window.MutationObserver(() => {
        if (!overlayState.node?.isConnected) {
          overlayState.board = findBoardContainer();
          overlayState.board.appendChild(overlayState.node);
          applyOverlayPosition(); // re-posicionar por si el layout cambió
        }
      });
      overlayState.observer.observe(document.body, { childList: true, subtree: true });
    }
    return img;
  }

  // 4) Establecer la imagen del overlay (usamos la misma que Auto-Image va a pintar)
  function setOverlayImageSrc(src) {
    overlayState.src = src;
    const node = ensureOverlayNode();
    node.src = src;
  }

  // 5) Posición: preferimos las coords CSS calculadas a partir del click “Seleccionar Posición”
  function applyOverlayPosition() {
    if (!overlayState.node) return;
    const node = overlayState.node;

    // Posicionamiento absoluto en el mismo sistema de coordenadas del board.
    node.style.left = `${Math.round(overlayState.cssX)}px`;
    node.style.top  = `${Math.round(overlayState.cssY)}px`;

    // Nota: si el contenedor aplica transform para pan/zoom, el overlay hereda ese transform,
    // al estar dentro del mismo contenedor. Por eso no recalculamos en cada zoom.
  }

  // 6) Toggle ON/OFF
  function setOverlayEnabled(next) {
    overlayState.enabled = typeof next === 'boolean' ? next : !overlayState.enabled;
    ensureOverlayNode();
    overlayState.node.hidden = !overlayState.enabled;
    // No cambiamos listeners del bot ni bloqueamos nada (pointer-events:none)
  }

  // 7) API pública para integrar con la UI existente del bot
  window.__WPA_OVERLAY__ = {
    injectOverlayStyles,
    setOverlayImageSrc,
    applyOverlayPosition,
    setOverlayEnabled,
    setAnchorCss(x, y) {
      overlayState.cssX = x;
      overlayState.cssY = y;
      applyOverlayPosition();
    },
    setLogicalCoords({ tileX, tileY, pxX, pxY }) {
      // Guardamos por si en el futuro calculamos cssX/cssY a partir de nodos de tile
      overlayState.tileX = tileX ?? overlayState.tileX;
      overlayState.tileY = tileY ?? overlayState.tileY;
      overlayState.pxX   = pxX   ?? overlayState.pxX;
      overlayState.pxY   = pxY   ?? overlayState.pxY;
    },
    get state() { return overlayState; },
  };
})();
