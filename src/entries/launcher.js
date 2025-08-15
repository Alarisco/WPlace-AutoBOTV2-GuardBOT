import { runLauncher } from "../launcher/index.js";

(() => {
  "use strict";
  if (window.__wplaceBot?.running) {
    alert("WPlace BOT ya está corriendo.");
    return;
  }
  window.__wplaceBot = { running: true };
  runLauncher().catch((e) => {
    console.error("[BOT] Error en Auto-Launcher:", e);
    window.__wplaceBot.running = false;
    alert("Auto-Launcher: error inesperado. Revisa consola.");
  });
})();
