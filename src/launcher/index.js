import { log } from "../core/logger.js";
import { createLauncherUI } from "./ui.js";
import { getSession, checkHealth, downloadAndExecuteBot } from "../core/wplace-api.js";
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
    // Helpers para mapear datos de API unificada a la UI del launcher
    const mapHealthInfo = (raw) => ({
      up: Boolean(raw?.up ?? (raw?.status === 'online')),
      database: raw?.database?.ok ?? raw?.database,
      uptime: raw?.uptime ?? raw?.uptimeHuman ?? (typeof raw?.uptimeSeconds === 'number' ? `${raw.uptimeSeconds}s` : undefined)
    });

    const mapUserFromSession = (session) => {
      if (!session?.success || !session?.data?.user) return null;
      // Normalizar estructura para UI (usa name/username y charges.count)
      const u = session.data.user;
      return {
        ...u,
        charges: {
          count: session.data.charges,
          max: session.data.maxCharges,
          cooldownMs: session.data.chargeRegen
        }
      };
    };

    // Variable para el selector de idioma
    let languageSelector = null;
    
    // Crear interfaz de usuario
    const ui = createLauncherUI({
      onSelectBot: (botType) => {
        log(`🎯 Bot seleccionado: ${botType}`);
        // Ocultar el selector de idioma cuando se selecciona un bot
        if (languageSelector) {
          languageSelector.unmount();
          languageSelector = null;
        }
      },
      
      onLaunch: async (botType) => {
        log(`🚀 Lanzando bot: ${botType}`);
        await downloadAndExecuteBot(botType, LAUNCHER_CONFIG.RAW_BASE);
      },
      
      onClose: () => {
        log('👋 Cerrando launcher');
        // Asegurar que el selector se desmonte al cerrar
        if (languageSelector) {
          languageSelector.unmount();
          languageSelector = null;
        }
        window.__wplaceBot.launcherRunning = false;
      }
    });
    
    // Crear selector de idioma después de la UI
    languageSelector = createLanguageSelector({
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
    
    // Cargar estado del backend (mapeado)
    const healthRaw = await checkHealth();
    ui.setHealthInfo(mapHealthInfo(healthRaw));
    
    // Cargar información del usuario (mapeado desde getSession)
    const session = await getSession();
    const user = mapUserFromSession(session);
    ui.setUserInfo(user);
    
    // Configurar refresco periódico
    launcherState.refreshTimer = window.setInterval(async () => {
      log('🔄 Actualizando información...');
      
      try {
        const [newHealthRaw, newSession] = await Promise.all([
          checkHealth(),
          getSession()
        ]);
        
        ui.setHealthInfo(mapHealthInfo(newHealthRaw));
        ui.setUserInfo(mapUserFromSession(newSession));
      } catch (error) {
        log('❌ Error en actualización periódica:', error);
      }
    }, LAUNCHER_CONFIG.REFRESH_INTERVAL);
    
    // Cleanup cuando se cierre la página
    window.addEventListener('beforeunload', () => {
      ui.cleanup();
      if (languageSelector) {
        languageSelector.unmount();
      }
      window.__wplaceBot.launcherRunning = false;
    });
    
    log('✅ Auto-Launcher inicializado correctamente');
    
  } catch (error) {
    log('❌ Error inicializando Auto-Launcher:', error);
    window.__wplaceBot.launcherRunning = false;
    throw error;
  }
}
