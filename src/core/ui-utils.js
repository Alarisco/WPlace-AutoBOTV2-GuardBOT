export function createShadowRoot(hostId = null) {
  const host = document.createElement('div');
  if (hostId) {
    host.id = hostId;
  }
  host.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 0; /* No forzar al frente; el window-manager ajustará según corresponda */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;
  
  const root = host.attachShadow({ mode: 'open' });
  document.body.appendChild(host);
  
  return { host, root };
}

export function makeDraggable(dragHandle, element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  dragHandle.style.cursor = 'move';
  dragHandle.addEventListener('mousedown', dragMouseDown);
  
  function dragMouseDown(e) {
    // Evitar arrastra si es un botón de la cabecera
    if (e.target.closest('.header-btn, .wplace-header-btn')) return;
    
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', elementDrag);
  }
  
  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }
  
  function closeDragElement() {
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }
}
