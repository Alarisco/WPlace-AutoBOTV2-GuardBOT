import { runImage } from "../image/index.js";

(() => {
  "use strict";
  if (window.__wplaceBot?.running) {
    alert("WPlace BOT ya está corriendo.");
    return;
  }
  window.__wplaceBot = { running: true };
  runImage().catch((e) => {
    console.error("[BOT] Error en Auto-Image:", e);
    window.__wplaceBot.running = false;
    alert("Auto-Image: error inesperado. Revisa consola.");
  });
})();
