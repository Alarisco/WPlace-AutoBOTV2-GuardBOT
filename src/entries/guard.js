import { runGuard } from "../guard/index.js";

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
