import { log } from "../core/logger.js";
import { createLauncherUI } from "./ui.js";
import { getSession, checkBackendHealth, downloadAndExecuteBot } from "./api.js";
import { launcherState, LAUNCHER_CONFIG } from "./config.js";
import { initializeLanguage } from "../locales/index.js";
import { createLanguageSelector } from "../core/language-selector.js";

export async function runLauncher() {
  log('🚀 Iniciando WPlace Auto-Launcher (versión modular)');
  
  // Inicializar sistema de idiomas
  initializeLanguage();
  
  // Verificar si ya está ejecutándose
  if (window.__wplaceBot?.launcherRunning) {
    alert("Auto-Launcher ya está ejecutándose.");
    return;
  }
  
  // Inicializar o preservar el estado global
  window.__wplaceBot = { ...window.__wplaceBot, launcherRunning: true };
  
  try {
    // Crear interfaz de usuario
    const ui = createLauncherUI({
      onSelectBot: (botType) => {
        log(`🎯 Bot seleccionado: ${botType}`);
      },
      
      onLaunch: async (botType) => {
        log(`🚀 Lanzando bot: ${botType}`);
        await downloadAndExecuteBot(botType, LAUNCHER_CONFIG.RAW_BASE);
      },
      
      onClose: () => {
        log('👋 Cerrando launcher');
        window.__wplaceBot.launcherRunning = false;
      }
    });
    
    // Crear selector de idioma integrado en el launcher
    const languageSelector = createLanguageSelector({
      position: 'top-left', // Esquina opuesta al launcher
      showFlags: true,
      onLanguageChange: (newLanguage) => {
        log(`🌍 Idioma cambiado a: ${newLanguage} desde el launcher`);
        
        // Actualizar textos de la UI del launcher
        ui.updateTexts();
        
        // Emitir evento personalizado para notificar a otros módulos
        if (typeof window !== 'undefined' && window.CustomEvent) {
          window.dispatchEvent(new window.CustomEvent('launcherLanguageChanged', {
            detail: { language: newLanguage }
          }));
        }
      }
    });
    
    // Montar el selector
    languageSelector.mount();
    
    // Cargar información inicial
    log('📊 Cargando información inicial...');
    
    // Cargar estado del backend
    const health = await checkBackendHealth();
    ui.setHealthInfo(health);
    
    // Cargar información del usuario
    const user = await getSession();
    ui.setUserInfo(user);
    
    // Configurar refresco periódico
    launcherState.refreshTimer = window.setInterval(async () => {
      log('🔄 Actualizando información...');
      
      try {
        const [newHealth, newUser] = await Promise.all([
          checkBackendHealth(),
          getSession()
        ]);
        
        ui.setHealthInfo(newHealth);
        ui.setUserInfo(newUser);
      } catch (error) {
        log('❌ Error en actualización periódica:', error);
      }
    }, LAUNCHER_CONFIG.REFRESH_INTERVAL);
    
    // Cleanup cuando se cierre la página
    window.addEventListener('beforeunload', () => {
      ui.cleanup();
      languageSelector.unmount();
      window.__wplaceBot.launcherRunning = false;
    });
    
    log('✅ Auto-Launcher inicializado correctamente');
    
  } catch (error) {
    log('❌ Error inicializando Auto-Launcher:', error);
    window.__wplaceBot.launcherRunning = false;
    throw error;
  }
}
