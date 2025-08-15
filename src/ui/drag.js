export function makeDraggable(header, panel) {
  let ox = 0, oy = 0, dragging = false;
  header.style.cursor = "move";
  header.addEventListener("mousedown", (e) => { 
    dragging = true; 
    ox = e.clientX - panel.offsetLeft; 
    oy = e.clientY - panel.offsetTop; 
  });
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    panel.style.left = `${e.clientX - ox}px`;
    panel.style.top = `${e.clientY - oy}px`;
  });
  document.addEventListener("mouseup", () => dragging = false);
}
