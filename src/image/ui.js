import { createOverlay } from "../ui/overlay.js";

export function mountImageUI() {
  const ui = createOverlay({ title: "Auto-Image" });
  ui.setStatus("Carga una imagen y configura opciones");
  return ui;
}
