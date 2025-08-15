import { log } from "../core/logger.js";
import { FARM_DEFAULTS, farmState } from "./config.js";
import { createFarmUI, autoCalibrateTile } from "./ui.js";
import { loop, paintOnce } from "./loop.js";
import { getSession, checkHealth } from "../core/wplace-api.js";
import { initializeLanguage, t } from "../locales/index.js";
import { loadFarmCfg, saveFarmCfg } from "../core/storage.js";

export async function runFarm() {
  log('🚀 Iniciando WPlace Auto-Farm (versión con selección de zona)');
  
  // Inicializar sistema de idiomas
  initializeLanguage();
  
  // Asegurarse que el estado global existe
  window.__wplaceBot = { ...window.__wplaceBot, farmRunning: true };

  let currentUserInfo = null; // Variable global para información del usuario

  try {
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

        // Verificar que se haya seleccionado una zona
        if (!config.POSITION_SELECTED || config.BASE_X === null || config.BASE_Y === null) {
          ui.setStatus(t('farm.missingPosition'), 'error');
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
      },
      // onCalibrate
      async () => {
        ui.setStatus(t('farm.calibrating'), 'info');
        const result = await autoCalibrateTile(config);
        
        if (result.success) {
          ui.setStatus(`✅ Tile calibrado: (${result.tileX}, ${result.tileY})`, 'success');
          ui.updateConfig(); // Refrescar la UI con los nuevos valores
          saveFarmCfg(config);
        } else {
          ui.setStatus(`❌ Error en calibración: ${result.error || 'No se pudo detectar tile'}`, 'error');
        }
        
        return result.success;
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
    
  } catch (error) {
    log('❌ Error inicializando Auto-Farm:', error);
    if (window.__wplaceBot) {
      window.__wplaceBot.farmRunning = false;
    }
    throw error;
  }
}
