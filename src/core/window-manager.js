// Gestor global de ventanas para traer al frente y manejar modales
let currentMaxZIndex = 100000;
const windowElements = new Set();
let modalObserversSetup = false;
let hiddenWindowsByModal = new Set();
let DEBUG_MODAL_MANAGER = false;

/**
 * Activa/desactiva el modo debug
 * @param {boolean} enabled - Si activar el debug
 */
export function setModalDebug(enabled) {
  DEBUG_MODAL_MANAGER = enabled;
}

/**
 * Función de debug para logging
 * @param {string} message - Mensaje a logear
 * @param {*} data - Datos adicionales
 */
function debugLog(message, data = null) {
  if (!DEBUG_MODAL_MANAGER) return;
  if (data) {
    console.log(`[ModalManager] ${message}`, data);
  } else {
    console.log(`[ModalManager] ${message}`);
  }
}

/**
 * Verifica si hay algún modal abierto
 * @returns {boolean}
 */
function isAnyModalOpen() {
  const modals = document.querySelectorAll('dialog.modal[open], dialog[open], .modal[open], .modal.show');
  return modals.length > 0;
}

/**
 * Maneja la visibilidad de las ventanas según el estado de los modales
 */
function handleWindowsVisibilityOnModal() {
  const modalOpen = isAnyModalOpen();
  debugLog(`Modal state changed. Open: ${modalOpen}`);
  debugLog(`Windows registered: ${windowElements.size}`);
  debugLog(`Windows currently hidden by modal: ${hiddenWindowsByModal.size}`);

  windowElements.forEach(windowElement => {
    if (modalOpen) {
      // Ocultar ventana si hay modal abierto
      if (!hiddenWindowsByModal.has(windowElement)) {
        debugLog('Hiding window due to modal', windowElement);
        hiddenWindowsByModal.add(windowElement);
        windowElement.style.transition = 'all 0.3s ease-out';
        windowElement.style.opacity = '0';
        //windowElement.style.transform = 'scale(0.8)';
        windowElement.style.pointerEvents = 'none';

        // También ocultar el host si está en Shadow DOM
        const root = windowElement.getRootNode && windowElement.getRootNode();
        if (root && root.host && root.host.style) {
          debugLog('Also hiding Shadow DOM host', root.host);
          root.host.style.transition = 'all 0.3s ease-out';
          root.host.style.opacity = '0';
          //root.host.style.transform = 'scale(0.8)';
          root.host.style.pointerEvents = 'none';
        }
      }
    } else {
      // Mostrar ventana si no hay modales abiertos
      if (hiddenWindowsByModal.has(windowElement)) {
        debugLog('Showing window, no modals detected', windowElement);
        hiddenWindowsByModal.delete(windowElement);
        windowElement.style.transition = 'all 0.3s ease-in';
        windowElement.style.opacity = '1';
        //windowElement.style.transform = 'scale(1)';
        windowElement.style.pointerEvents = 'auto';

        // También mostrar el host si está en Shadow DOM
        const root = windowElement.getRootNode && windowElement.getRootNode();
        if (root && root.host && root.host.style) {
          debugLog('Also showing Shadow DOM host', root.host);
          root.host.style.transition = 'all 0.3s ease-in';
          root.host.style.opacity = '1';
          //root.host.style.transform = 'scale(1)';
          root.host.style.pointerEvents = 'auto';
        }
      }
    }
  });
}

/**
 * Configura los observadores de modales con debug mejorado
 */
function setupModalObservers() {
  if (modalObserversSetup) return;
  debugLog('Setting up modal observers');

  const modalAttributeObserver = new MutationObserver((mutations) => {
    debugLog(`Attribute mutations detected: ${mutations.length}`);
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' &&
        (mutation.attributeName === 'open' || mutation.attributeName === 'class')) {
        debugLog(`Attribute changed: ${mutation.attributeName} on`, mutation.target);
        debugLog(`Old value: ${mutation.oldValue}`);
        debugLog(`New value: ${mutation.target.getAttribute(mutation.attributeName)}`);
        handleWindowsVisibilityOnModal();
      }
    });
  });

  const domObserver = new MutationObserver((mutations) => {
    debugLog(`DOM mutations detected: ${mutations.length}`);
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Selectores más amplios para capturar diferentes tipos de modales
            const modalSelectors = 'dialog.modal, dialog, .modal, [role="dialog"], .overlay, .popup';
            if (node.matches && node.matches(modalSelectors)) {
              debugLog('New modal element detected', node);
              modalAttributeObserver.observe(node, {
                attributes: true,
                attributeFilter: ['open', 'class', 'aria-hidden'],
                attributeOldValue: true
              });
              handleWindowsVisibilityOnModal();
            }

            const nestedModals = node.querySelectorAll ?
              node.querySelectorAll(modalSelectors) : [];
            if (nestedModals.length > 0) {
              debugLog(`Found ${nestedModals.length} nested modals`);
            }

            nestedModals.forEach((modal) => {
              debugLog('Observing nested modal', modal);
              modalAttributeObserver.observe(modal, {
                attributes: true,
                attributeFilter: ['open', 'class', 'aria-hidden'],
                attributeOldValue: true
              });
            });

            if (nestedModals.length > 0) {
              handleWindowsVisibilityOnModal();
            }
          }
        });

        if (mutation.removedNodes.length > 0) {
          debugLog(`${mutation.removedNodes.length} nodes removed`);
          handleWindowsVisibilityOnModal();
        }
      }
    });
  });

  // Observar modales existentes con selectores más completos
  const modalSelectors = 'dialog.modal, dialog, .modal, [role="dialog"], .overlay, .popup';
  const existingModals = document.querySelectorAll(modalSelectors);
  debugLog(`Found ${existingModals.length} existing modals`);

  existingModals.forEach((modal) => {
    debugLog('Observing existing modal', modal);
    modalAttributeObserver.observe(modal, {
      attributes: true,
      attributeFilter: ['open', 'class', 'aria-hidden'],
      attributeOldValue: true
    });
  });

  domObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  modalObserversSetup = true;
  debugLog('Modal observers setup complete');
}

/**
 * Registra una ventana para el manejo de z-index y modales
 * @param {HTMLElement} windowElement - El elemento de la ventana
 */
export function registerWindow(windowElement) {
  if (!windowElement) return;

  windowElements.add(windowElement);

  // Configurar observadores de modales si es la primera ventana
  if (!modalObserversSetup) {
    setTimeout(() => {
      setupModalObservers();
    }, 100);
  }

  // Agregar event listener para traer al frente al hacer click
  const bringToFrontHandler = (event) => {
    // Solo traer al frente si el click es en la ventana misma, no en elementos internos específicos
    if (event.target === windowElement || windowElement.contains(event.target)) {
      bringWindowToFront(windowElement);
    }
  };

  windowElement.addEventListener('mousedown', bringToFrontHandler);
  // Guardar referencia del handler para poder removerlo después
  windowElement._bringToFrontHandler = bringToFrontHandler;

  // Establecer z-index inicial si no tiene uno
  if (!windowElement.style.zIndex) {
    windowElement.style.zIndex = currentMaxZIndex++;

    // Si la ventana está dentro de un Shadow DOM, sincronizar también el host
    const root = windowElement.getRootNode && windowElement.getRootNode();
    if (root && root.host && root.host.style) {
      root.host.style.zIndex = windowElement.style.zIndex;
    }
  }

  // Verificar estado inicial de modales
  handleWindowsVisibilityOnModal();

  debugLog('Window registered successfully', windowElement);
}

/**
 * Desregistra una ventana del manejo de z-index
 * @param {HTMLElement} windowElement - El elemento de la ventana
 */
export function unregisterWindow(windowElement) {
  if (!windowElement) return;

  windowElements.delete(windowElement);
  hiddenWindowsByModal.delete(windowElement);

  // Remover event listener
  if (windowElement._bringToFrontHandler) {
    windowElement.removeEventListener('mousedown', windowElement._bringToFrontHandler);
    delete windowElement._bringToFrontHandler;
  }
}

/**
 * Trae una ventana al frente (solo si no hay modales abiertos)
 * @param {HTMLElement} windowElement - El elemento de la ventana a traer al frente
 */
export function bringWindowToFront(windowElement) {
  if (!windowElement || !windowElements.has(windowElement)) return;

  // No traer al frente si hay un modal abierto
  if (isAnyModalOpen()) return;

  // Incrementar el z-index máximo y asignarlo a esta ventana
  currentMaxZIndex++;
  windowElement.style.zIndex = currentMaxZIndex;

  // Si está dentro de un Shadow DOM, también elevar el host para que el stacking funcione entre contextos
  const root = windowElement.getRootNode && windowElement.getRootNode();
  if (root && root.host && root.host.style) {
    root.host.style.zIndex = currentMaxZIndex;
  }
}

/**
 * Fuerza la actualización del estado de visibilidad de las ventanas
 */
export function refreshWindowsVisibility() {
  handleWindowsVisibilityOnModal();
}

/**
 * Obtiene el z-index máximo actual
 * @returns {number} - El z-index máximo actual
 */
export function getCurrentMaxZIndex() {
  return currentMaxZIndex;
}

/**
 * Establece un z-index mínimo para futuras ventanas
 * @param {number} minZIndex - El z-index mínimo
 */
export function setMinZIndex(minZIndex) {
  if (minZIndex > currentMaxZIndex) {
    currentMaxZIndex = minZIndex;
  }
}

/**
 * Función para debug manual - listar estado actual
 */
export function debugModalState() {
  console.log('=== MODAL MANAGER DEBUG STATE ===');
  console.log('Debug enabled:', DEBUG_MODAL_MANAGER);
  console.log('Observers setup:', modalObserversSetup);
  console.log('Windows registered:', windowElements.size);
  console.log('Windows hidden by modal:', hiddenWindowsByModal.size);
  console.log('Current max Z-Index:', currentMaxZIndex);
  console.log('Any modal open:', isAnyModalOpen());

  // Listar todas las ventanas registradas
  console.log('\n--- Registered Windows ---');
  windowElements.forEach((window, index) => {
    console.log(`Window ${index}:`, {
      element: window,
      zIndex: window.style.zIndex,
      opacity: window.style.opacity,
      isHidden: hiddenWindowsByModal.has(window)
    });
  });

  // Listar modales encontrados
  console.log('\n--- Current Modals ---');
  const modals = document.querySelectorAll('dialog.modal[open], dialog[open], .modal[open], .modal.show, [role="dialog"]');
  modals.forEach((modal, index) => {
    console.log(`Modal ${index}:`, {
      element: modal,
      isOpen: modal.hasAttribute('open') || modal.classList.contains('show'),
      display: window.getComputedStyle(modal).display,
      visibility: window.getComputedStyle(modal).visibility
    });
  });
}

// === EXPOSICIÓN GLOBAL AUTOMÁTICA ===
// Hacer las funciones disponibles globalmente para debug y uso externo
if (typeof window !== 'undefined') {
  window.setModalDebug = setModalDebug;
  window.debugModalState = debugModalState;
  window.registerWindow = registerWindow;
  window.unregisterWindow = unregisterWindow;

  // También exponer variables internas para debug
  window.__modalManagerDebug = {
    windowElements,
    hiddenWindowsByModal,
    isAnyModalOpen,
    refreshWindowsVisibility
  };

  console.log('[WindowManager] Funciones expuestas globalmente automáticamente');
}
