import { log } from "../core/logger.js";
import { FARM_DEFAULTS, farmState } from "./config.js";
import { createFarmUI } from "./ui.js";
import { loop, paintOnce } from "./loop.js";
import { getSession, checkHealth } from "../core/wplace-api.js";
import { initializeLanguage, t } from "../locales/index.js";
import { loadFarmCfg } from "../core/storage.js";
import { sessionStart, sessionPing, sessionEnd } from "../core/metrics/client.js";
import { getMetricsConfig } from "../core/metrics/config.js";

export async function runFarm() {
  log('🚀 Iniciando WPlace Auto-Farm (versión con selección de zona)');
  
  // Inicializar sistema de idiomas
  initializeLanguage();
  // Interceptor eliminado: ya no es necesario inicializar token-interceptor
  
  // Asegurarse que el estado global existe
  window.__wplaceBot = { ...window.__wplaceBot, farmRunning: true };

  let currentUserInfo = null; // Variable global para información del usuario

  try {
    // Iniciar sesión de métricas para Farm
    try {
      const mcfg = getMetricsConfig({ VARIANT: 'auto-farm' });
      if (mcfg.ENABLED) {
        if (!window.__wplaceMetrics) window.__wplaceMetrics = {};
        window.__wplaceMetrics.farmSessionActive = true;
        sessionStart({ botVariant: 'auto-farm' });
          // Ping rápido tras el inicio para reflejar presencia inmediata
          setTimeout(() => {
            try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'init' } }); } catch {}
          }, 3000);
        const pingEvery = Math.max(60_000, mcfg.PING_INTERVAL_MS || 300_000);
        window.__wplaceMetrics.farmPingInterval = window.setInterval(() => {
          try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'interval' } }); } catch {}
        }, pingEvery);
      }
    } catch {}
    // Cargar configuración guardada o usar defaults
    const savedConfig = loadFarmCfg(FARM_DEFAULTS);
    const config = { ...FARM_DEFAULTS, ...savedConfig};
    
    // Detectar sitekey automáticamente si no está configurada
    if (!config.SITEKEY) {
      const siteKeyElement = document.querySelector('*[data-sitekey]');
      if (siteKeyElement) {
        config.SITEKEY = siteKeyElement.getAttribute('data-sitekey');
        log(`📝 Sitekey encontrada automáticamente: ${config.SITEKEY.substring(0, 20)}...`);
      } else {
        log('⚠️ No se pudo encontrar la sitekey automáticamente');
      }
    }

    // Obtener información inicial del usuario
    const sessionInfo = await getSession();
    if (sessionInfo.success && sessionInfo.data.user) {
      currentUserInfo = {
        username: sessionInfo.data.user.name || 'Anónimo',
        charges: sessionInfo.data.charges,
        maxCharges: sessionInfo.data.maxCharges,
        pixels: sessionInfo.data.user.pixelsPainted || 0
      };
      farmState.user = currentUserInfo;
      farmState.charges.count = sessionInfo.data.charges;
      farmState.charges.max = sessionInfo.data.maxCharges;
      log(`👤 Usuario conectado: ${currentUserInfo.username} - Cargas: ${currentUserInfo.charges}/${currentUserInfo.maxCharges} - Píxeles: ${currentUserInfo.pixels}`);
    } else {
      log('⚠️ No se pudo obtener información del usuario');
    }

    // Crear interfaz de usuario
    const ui = createFarmUI(
      config,
      // onStart
      async () => {
        if (farmState.running) {
          ui.setStatus(t('farm.alreadyRunning'), 'warning');
          return false;
        }

  // Los tokens ya están preparados por prepareTokensForBot

        // Si no se ha seleccionado una zona, activar automáticamente la selección
        if (!config.POSITION_SELECTED || config.BASE_X === null || config.BASE_Y === null) {
          ui.setStatus(t('farm.autoSelectPosition'), 'info');
          
          // Activar selección de zona automáticamente
          const selectButton = ui.getElement().shadowRoot.getElementById('select-position-btn');
          if (selectButton) {
            selectButton.click();
          }
          
          // Retornar false para no iniciar el bot todavía
          return false;
        }

        // Verificar si Auto-Image está corriendo
        if (window.__wplaceBot?.imageRunning) {
          ui.setStatus(t('farm.imageRunningWarning'), 'warning');
          return false;
        }

        farmState.running = true;
        ui.setStatus(t('farm.startingBot'), 'info');
        ui.updateButtonStates(true);

  // Refrescar presencia al iniciar realmente el loop
  try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'start' } }); } catch {}

        // Iniciar el loop principal
  await loop(
          config,
          farmState,
          ui.setStatus,
          ui.flashEffect,
          updateSession,
          checkBackendHealth,
          updateStats
        );

        return true;
      },
      // onStop
      async () => {
        farmState.running = false;
        ui.setStatus(t('farm.stoppingBot'), 'info');
        ui.updateButtonStates(false);
        setTimeout(() => {
          ui.setStatus(t('farm.stopped'), 'status');
        }, 500);
        return true;
      }
    );

    // Función para actualizar información de sesión
    async function updateSession() {
      try {
        const sessionInfo = await getSession();
        if (sessionInfo.success && sessionInfo.data.user) {
          currentUserInfo = {
            username: sessionInfo.data.user.name || 'Anónimo',
            charges: sessionInfo.data.charges,
            maxCharges: sessionInfo.data.maxCharges,
            pixels: sessionInfo.data.user.pixelsPainted || 0
          };
          farmState.user = currentUserInfo;
          farmState.charges.count = sessionInfo.data.charges;
          farmState.charges.max = sessionInfo.data.maxCharges;
          farmState.charges.cooldownMs = sessionInfo.data.chargeRegen || 30000;
        }
      } catch (error) {
        log('Error actualizando sesión:', error);
      }
    }

    // Función para verificar salud del backend
    async function checkBackendHealth() {
      try {
        const health = await checkHealth();
        farmState.health = health;
        return health;
      } catch (error) {
        log('Error verificando salud del backend:', error);
        return { up: false, error: error.message };
      }
    }

    // Función para actualizar estadísticas en la UI
    function updateStats() {
      if (currentUserInfo) {
        ui.updateStats(
          farmState.painted,
          farmState.charges.count,
          farmState.retryCount,
          config.TILE_X || 0,
          config.TILE_Y || 0,
          farmState.health
        );
      }
    }

    // Función global para pintar una vez (testing)
    window.WPAUI = {
      ...window.WPAUI,
      once: async () => {
        if (farmState.running) {
          ui.setStatus('❌ Detén el bot primero antes de pintar manualmente', 'error');
          return;
        }

  // Los tokens están manejados por el interceptor activo

        const success = await paintOnce(
          config,
          farmState,
          ui.setStatus,
          ui.flashEffect,
          updateSession,
          checkBackendHealth
        );

        if (success) {
          updateStats();
        }
      }
    };

    // Actualizar estadísticas iniciales
    updateStats();

    // Escuchar cambios de idioma desde el launcher
    const handleLanguageChange = (event) => {
      const { language } = event.detail;
      log(`🌍 Farm: Detectado cambio de idioma: ${language}`);
      ui.updateTexts();
    };
    
    window.addEventListener('launcherLanguageChanged', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);

    // Cleanup al cerrar la página
    window.addEventListener('beforeunload', () => {
      farmState.running = false;
      ui.destroy();
      window.removeEventListener('launcherLanguageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
      if (window.__wplaceBot) {
        window.__wplaceBot.farmRunning = false;
      }
    try {
        const mcfg = getMetricsConfig();
        if (mcfg.ENABLED && window.__wplaceMetrics?.farmSessionActive) {
      sessionEnd({ botVariant: 'auto-farm' });
          window.__wplaceMetrics.farmSessionActive = false;
        }
        if (window.__wplaceMetrics?.farmPingInterval) {
      window.clearInterval(window.__wplaceMetrics.farmPingInterval);
          window.__wplaceMetrics.farmPingInterval = null;
        }
        if (window.__wplaceMetrics?.farmVisibilityHandler) {
          document.removeEventListener('visibilitychange', window.__wplaceMetrics.farmVisibilityHandler);
          delete window.__wplaceMetrics.farmVisibilityHandler;
        }
        if (window.__wplaceMetrics?.farmFocusHandler) {
          window.removeEventListener('focus', window.__wplaceMetrics.farmFocusHandler);
          delete window.__wplaceMetrics.farmFocusHandler;
        }
      } catch {}
    });

    // Verificar salud del backend inicialmente
    checkBackendHealth().then(health => {
      ui.updateStats(
        farmState.painted,
        farmState.charges.count,
        farmState.retryCount,
        config.TILE_X || 0,
        config.TILE_Y || 0,
        health
      );
    });

    log('✅ Auto-Farm inicializado correctamente');

    // Considerar al usuario online aunque esté ocioso: ping al recuperar visibilidad/foco
    try {
      const mcfg = getMetricsConfig();
      if (mcfg.ENABLED) {
        const visibilityHandler = () => {
          if (!document.hidden) {
            try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'visibility' } }); } catch {}
          }
        };
        const focusHandler = () => {
          try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'focus' } }); } catch {}
        };
        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('focus', focusHandler);
        window.__wplaceMetrics = window.__wplaceMetrics || {};
        window.__wplaceMetrics.farmVisibilityHandler = visibilityHandler;
        window.__wplaceMetrics.farmFocusHandler = focusHandler;
      }
    } catch {}
    
  } catch (error) {
    log('❌ Error inicializando Auto-Farm:', error);
    if (window.__wplaceBot) {
      window.__wplaceBot.farmRunning = false;
    }
    throw error;
  }
}
