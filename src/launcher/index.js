import { log } from "../core/logger.js";
import { createLauncherUI } from "./ui.js";
import { getSession, checkHealth } from "../core/wplace-api.js";
import { launcherState, LAUNCHER_CONFIG } from "./config.js";
import { initializeLanguage } from "../locales/index.js";
import { createLanguageSelector } from "../core/language-selector.js";
import { sessionStart, sessionPing, sessionEnd, trackEvent } from "../core/metrics/client.js";
import { getMetricsConfig } from "../core/metrics/config.js";
// Importar directamente los módulos de los bots para ejecución local
import { runFarm } from "../farm/index.js";
import { runImage } from "../image/index.js";
import { runGuard } from "../guard/index.js";
import { runSlave } from "../slave/index.js";
// Importar el sistema de turnstile para compartir tokens
import { ensureToken, invalidateToken, getPawtectToken, getFingerprint } from "../core/turnstile.js";

// Función para ejecutar bots localmente con acceso completo al sistema de tokens
async function executeLocalBot(botType) {
  log(`🎯 Ejecutando bot local: ${botType}`);
  
  try {
    // Normalizar/limpiar flags "stale" antes de verificar duplicados (especialmente para Slave)
    try {
      if (window.__wplaceBot?.slaveRunning) {
        const hasPanel = !!document.getElementById('wpl-slave-panel');
        const hasInstance = !!window.__wplaceSlave;
        if (!hasPanel && !hasInstance) {
          // Flag quedó colgado de una ejecución previa: limpiar
          window.__wplaceBot.slaveRunning = false;
        }
      }
    } catch {}

    // Verificar que no haya otros bots ejecutándose
    if (window.__wplaceBot?.farmRunning || window.__wplaceBot?.imageRunning || window.__wplaceBot?.guardRunning || window.__wplaceBot?.slaveRunning) {
      throw new Error("Ya hay un bot ejecutándose. Ciérralo antes de lanzar otro.");
    }
    
    // Inicializar el estado global si no existe
    if (!window.__wplaceBot) {
      window.__wplaceBot = {};
    }
    
    // Asegurar que el sistema de turnstile esté disponible globalmente
    window.__WPA_TURNSTILE_SYSTEM__ = {
      ensureToken,
      invalidateToken,
      getPawtectToken,
      getFingerprint
    };
    
    // Ejecutar el bot correspondiente
    switch (botType) {
      case 'farm':
        log('🌾 Iniciando Auto-Farm...');
        await runFarm();
        break;
      case 'image':
        log('🎨 Iniciando Auto-Image...');
        await runImage();
        break;
      case 'guard':
        log('🛡️ Iniciando Auto-Guard...');
        await runGuard();
        break;
      case 'slave':
        log('🔗 Iniciando Auto-Slave...');
        await runSlave();
        break;
      default:
        throw new Error(`Tipo de bot desconocido: ${botType}`);
    }
    
    log(`✅ Bot ${botType} ejecutado exitosamente`);
    
  } catch (error) {
    log(`❌ Error ejecutando bot ${botType}:`, error);
    // Limpiar estado en caso de error
    if (window.__wplaceBot) {
      window.__wplaceBot[`${botType}Running`] = false;
    }
    throw error;
  }
}

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
        try { trackEvent('launcher_start_bot', { botVariant: 'launcher', metadata: { botType } }); } catch {}
        
        // Limpiar el estado del launcher antes de ejecutar el bot
        if (languageSelector) {
          languageSelector.unmount();
          languageSelector = null;
        }
        window.__wplaceBot.launcherRunning = false;

        // --- Limpieza de métricas del launcher para evitar pings residuales ---
        try {
          const mcfg = getMetricsConfig({ VARIANT: 'launcher' });
          if (window.__wplaceMetrics) {
            if (window.__wplaceMetrics.launcherPingInterval) {
              window.clearInterval(window.__wplaceMetrics.launcherPingInterval);
              window.__wplaceMetrics.launcherPingInterval = null;
            }
            if (window.__wplaceMetrics.launcherVisibilityHandler) {
              document.removeEventListener('visibilitychange', window.__wplaceMetrics.launcherVisibilityHandler);
              delete window.__wplaceMetrics.launcherVisibilityHandler;
            }
            if (window.__wplaceMetrics.launcherFocusHandler) {
              window.removeEventListener('focus', window.__wplaceMetrics.launcherFocusHandler);
              delete window.__wplaceMetrics.launcherFocusHandler;
            }
            if (mcfg.ENABLED && window.__wplaceMetrics.launcherSessionActive) {
              sessionEnd({ botVariant: 'launcher' });
              window.__wplaceMetrics.launcherSessionActive = false;
            }
          }
        } catch {}
        // ---------------------------------------------------------------------
        
        // Limpiar timer de refresco
        if (launcherState.refreshTimer) {
          window.clearInterval(launcherState.refreshTimer);
          launcherState.refreshTimer = null;
        }
        
        await executeLocalBot(botType);
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
      try {
        const mcfg = getMetricsConfig();
        if (mcfg.ENABLED && window.__wplaceMetrics?.launcherSessionActive) {
          sessionEnd({ botVariant: 'launcher' });
          window.__wplaceMetrics.launcherSessionActive = false;
        }
        if (window.__wplaceMetrics?.launcherPingInterval) {
          window.clearInterval(window.__wplaceMetrics.launcherPingInterval);
          window.__wplaceMetrics.launcherPingInterval = null;
        }
        if (window.__wplaceMetrics?.launcherVisibilityHandler) {
          document.removeEventListener('visibilitychange', window.__wplaceMetrics.launcherVisibilityHandler);
          delete window.__wplaceMetrics.launcherVisibilityHandler;
        }
        if (window.__wplaceMetrics?.launcherFocusHandler) {
          window.removeEventListener('focus', window.__wplaceMetrics.launcherFocusHandler);
          delete window.__wplaceMetrics.launcherFocusHandler;
        }
      } catch {}
    });
    
    log('✅ Auto-Launcher inicializado correctamente');
    // Iniciar sesión de métricas del launcher
    try {
      const mcfg = getMetricsConfig({ VARIANT: 'launcher' });
      if (mcfg.ENABLED) {
        if (!window.__wplaceMetrics) window.__wplaceMetrics = {};
        window.__wplaceMetrics.launcherSessionActive = true;
        sessionStart({ botVariant: 'launcher' });
        const pingEvery = Math.max(60_000, mcfg.PING_INTERVAL_MS || 300_000);
  window.__wplaceMetrics.launcherPingInterval = window.setInterval(() => sessionPing({ botVariant: 'launcher' }), pingEvery);

  // Pings al recuperar visibilidad/foco
  const visibilityHandler = () => { if (!document.hidden) { try { sessionPing({ botVariant: 'launcher', metadata: { reason: 'visibility' } }); } catch {} } };
  const focusHandler = () => { try { sessionPing({ botVariant: 'launcher', metadata: { reason: 'focus' } }); } catch {} };
  document.addEventListener('visibilitychange', visibilityHandler);
  window.addEventListener('focus', focusHandler);
  window.__wplaceMetrics.launcherVisibilityHandler = visibilityHandler;
  window.__wplaceMetrics.launcherFocusHandler = focusHandler;
      }
    } catch {}
    
  } catch (error) {
    log('❌ Error inicializando Auto-Launcher:', error);
    window.__wplaceBot.launcherRunning = false;
  try { trackEvent('error', { botVariant: 'launcher', metadata: { message: String(error?.message || error) } }); } catch {}
    throw error;
  }
}
