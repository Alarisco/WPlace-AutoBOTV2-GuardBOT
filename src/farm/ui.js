import { createOverlay } from "../ui/overlay.js";

export function mountFarmUI() {
  const ui = createOverlay({ title: "Auto-Farm" });
  ui.setStatus("Listo para iniciar");
  
  // TODO: Añadir aquí toda la UI compleja del farm original
  // - Panel de configuración
  // - Controles de start/stop/once
  // - Displays de estado
  // - Configuración de delays, cargas, colores, etc.
  
  return ui;
}
