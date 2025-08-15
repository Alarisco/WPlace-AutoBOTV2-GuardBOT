import { runLauncher } from "../launcher/index.js";

(() => {
  "use strict";
  // Verificar si hay bots específicos ejecutándose, no el launcher
  if (window.__wplaceBot?.farmRunning || window.__wplaceBot?.imageRunning) {
    alert("Ya hay un bot ejecutándose. Ciérralo antes de usar el launcher.");
    return;
  }
  
  // Inicializar el estado global si no existe
  if (!window.__wplaceBot) {
    window.__wplaceBot = {};
  }
  
  runLauncher().catch((e) => {
    console.error("[BOT] Error en Auto-Launcher:", e);
    // Limpiar solo el estado del launcher, no de otros bots
    if (window.__wplaceBot) {
      window.__wplaceBot.launcherRunning = false;
    }
    alert("Auto-Launcher: error inesperado. Revisa consola.");
  });
})();
