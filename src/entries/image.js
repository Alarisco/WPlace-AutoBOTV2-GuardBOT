import { runImage } from "../image/index.js";
import { autoClickPaintButton } from "../core/dom.js";

(async () => {
  "use strict";
  
  console.log('[WPA-Image] 🚀 Entry point iniciado');
  
  // Auto-click del botón Paint al inicio
  try {
    console.log('[WPA-Image] 🤖 Iniciando auto-click del botón Paint...');
    await autoClickPaintButton(3, true);
    console.log('[WPA-Image] ✅ Auto-click completado');
  } catch (error) {
    console.log('[WPA-Image] ⚠️ Error en auto-click del botón Paint:', error);
  }
  
  // Verificar si el bot de imagen ya está ejecutándose
  if (window.__wplaceBot?.imageRunning) {
    console.log('[WPA-Image] ⚠️ Auto-Image ya está corriendo');
    alert("Auto-Image ya está corriendo.");
    return;
  }
  
  // Verificar si hay otros bots ejecutándose
  if (window.__wplaceBot?.farmRunning) {
    console.log('[WPA-Image] ⚠️ Auto-Farm está ejecutándose');
    alert("Auto-Farm está ejecutándose. Ciérralo antes de iniciar Auto-Image.");
    return;
  }

  // Inicializar el estado global si no existe
  if (!window.__wplaceBot) {
    window.__wplaceBot = {};
    console.log('[WPA-Image] 🔧 Estado global inicializado');
  }
  
  // Marcar que el image bot está ejecutándose
  window.__wplaceBot.imageRunning = true;
  console.log('[WPA-Image] 🏃 Marcado como ejecutándose');
  
  console.log('[WPA-Image] 🎯 Llamando a runImage()');
  runImage().catch((e) => {
    console.error("[BOT] Error en Auto-Image:", e);
    if (window.__wplaceBot) {
      window.__wplaceBot.imageRunning = false;
    }
    alert("Auto-Image: error inesperado. Revisa consola.");
  });
})();
