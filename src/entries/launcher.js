import { getSession, checkHealth } from "../core/wplace-api.js";
import { loadAndEvalUrlWithFallback } from "../core/loader.js";
import { createOverlay } from "../ui/overlay.js";

(() => {
  "use strict";
  const ui = createOverlay({ title: "WPlace Launcher" });
  ui.setStatus("Comprobando backend…");
  
  Promise.all([getSession(), checkHealth()])
    .then(() => ui.setStatus("Listo"))
    .catch(() => ui.setStatus("Backend/Session no disponible"));
    
  // Botones: cargar Auto-Farm o Auto-Image desde RAW (igual que ahora)
  ui.on("loadFarm", () => loadAndEvalUrlWithFallback(window.WPLACE_RAW_FARM_URL));
  ui.on("loadImage", () => loadAndEvalUrlWithFallback(window.WPLACE_RAW_IMAGE_URL));
})();
