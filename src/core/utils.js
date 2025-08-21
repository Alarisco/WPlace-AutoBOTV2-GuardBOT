// Utility functions
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
export const randInt = (n) => Math.floor(Math.random() * n);
export const noop = () => { /* Función vacía intencional */ };

export function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

// Función para selector de elementos DOM
export function $(selector, root = document) {
  return root.querySelector(selector);
}

// Función para hacer elementos arrastrables
export function dragHeader(headerEl, panelEl) {
  let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

  headerEl.style.cursor = 'move';
  headerEl.addEventListener('mousedown', startDrag);

  function startDrag(e) {
    e.preventDefault();
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', doDrag);
  }

  function doDrag(e) {
    e.preventDefault();
    offsetX = mouseX - e.clientX;
    offsetY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const newTop = panelEl.offsetTop - offsetY;
    const newLeft = panelEl.offsetLeft - offsetX;
    
    panelEl.style.top = Math.max(0, newTop) + 'px';
    panelEl.style.left = Math.max(0, newLeft) + 'px';
  }

  function stopDrag() {
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('mousemove', doDrag);
  }
}

// Función para formatear tiempo
export function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

// Función para parsear hexadecimal
export function parseHex(str) {
  return parseInt(str.replace('#', ''), 16);
}

// Función para convertir número a hex
export function toHex(num) {
  return '#' + num.toString(16).padStart(6, '0');
}
