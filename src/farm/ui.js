import { createOverlay } from "../ui/overlay.js";

export function mountFarmUI() {
  const ui = createOverlay({ title: "Auto-Farm" });
  ui.setStatus("Listo para iniciar");
  return ui;
}
