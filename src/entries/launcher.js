import { runLauncher } from "../launcher/index.js";
import { autoClickPaintButton } from "../core/dom.js";

(async () => {
  "use strict";
  
  // Auto-click del botón Paint al inicio
  try {
    console.log('[Auto-Launcher] 🤖 Iniciando auto-click del botón Paint...');
    await autoClickPaintButton(3, true);
    console.log('[Auto-Launcher] ✅ Auto-click completado');
  } catch (error) {
    console.log('[Auto-Launcher] ⚠️ Error en auto-click del botón Paint:', error);
  }
  
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
