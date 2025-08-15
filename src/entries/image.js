import { runImage } from "../image/index.js";

(() => {
  "use strict";
  // Verificar si el bot de imagen ya está ejecutándose
  if (window.__wplaceBot?.imageRunning) {
    alert("Auto-Image ya está corriendo.");
    return;
  }
  
  // Verificar si hay otros bots ejecutándose
  if (window.__wplaceBot?.farmRunning) {
    alert("Auto-Farm está ejecutándose. Ciérralo antes de iniciar Auto-Image.");
    return;
  }

  // Inicializar el estado global si no existe
  if (!window.__wplaceBot) {
    window.__wplaceBot = {};
  }
  
  // Marcar que el image bot está ejecutándose
  window.__wplaceBot.imageRunning = true;
  
  runImage().catch((e) => {
    console.error("[BOT] Error en Auto-Image:", e);
    if (window.__wplaceBot) {
      window.__wplaceBot.imageRunning = false;
    }
    alert("Auto-Image: error inesperado. Revisa consola.");
  });
})();
