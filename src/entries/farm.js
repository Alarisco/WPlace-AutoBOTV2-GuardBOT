import { runFarm } from "../farm/index.js";

(() => {
  "use strict";
  if (window.__wplaceBot?.running) {
    alert("WPlace BOT ya está corriendo.");
    return;
  }
  window.__wplaceBot = { running: true };
  runFarm().catch((e) => {
    console.error("[BOT] Error en Auto-Farm:", e);
    window.__wplaceBot.running = false;
    alert("Auto-Farm: error inesperado. Revisa consola.");
  });
})();
