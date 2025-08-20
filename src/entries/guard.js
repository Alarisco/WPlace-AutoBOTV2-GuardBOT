import { runGuard } from "../guard/index.js";
import { autoClickPaintButton } from "../core/dom.js";

// Auto-click del botón Paint al inicio
(async function() {
  try {
    console.log('[WPA-Guard] 🤖 Iniciando auto-click del botón Paint...');
    await autoClickPaintButton(3, true);
  } catch (error) {
    console.log('[WPA-Guard] ⚠️ Error en auto-click del botón Paint:', error);
  }
  
  // Verificar si ya hay un bot Guard corriendo
  if (window.__wplaceBot?.guardRunning) {
    alert('Auto-Guard ya está corriendo.');
  } else {
    // Ejecutar el bot
    runGuard().catch(error => {
      console.error('[WPA-GUARD] Error en Auto-Guard:', error);
      if (window.__wplaceBot) {
        window.__wplaceBot.guardRunning = false;
      }
      alert('Auto-Guard: error inesperado. Revisa consola.');
    });
  }
})();
