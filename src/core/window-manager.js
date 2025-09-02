// Gestor global de ventanas para traer al frente
let currentMaxZIndex = 100000;
const windowElements = new Set();

/**
 * Registra una ventana para el manejo de z-index
 * @param {HTMLElement} windowElement - El elemento de la ventana
 */
export function registerWindow(windowElement) {
  if (!windowElement) return;
  
  windowElements.add(windowElement);
  
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
    // Asignar un z-index inicial y avanzar el contador
    windowElement.style.zIndex = currentMaxZIndex++;

    // Si la ventana está dentro de un Shadow DOM, sincronizar también el host
    const root = windowElement.getRootNode && windowElement.getRootNode();
    if (root && root.host && root.host.style) {
      root.host.style.zIndex = windowElement.style.zIndex;
    }
  }
}

/**
 * Desregistra una ventana del manejo de z-index
 * @param {HTMLElement} windowElement - El elemento de la ventana
 */
export function unregisterWindow(windowElement) {
  if (!windowElement) return;
  
  windowElements.delete(windowElement);
  
  // Remover event listener
  if (windowElement._bringToFrontHandler) {
    windowElement.removeEventListener('mousedown', windowElement._bringToFrontHandler);
    delete windowElement._bringToFrontHandler;
  }
}

/**
 * Trae una ventana al frente
 * @param {HTMLElement} windowElement - El elemento de la ventana a traer al frente
 */
export function bringWindowToFront(windowElement) {
  if (!windowElement || !windowElements.has(windowElement)) return;
  
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