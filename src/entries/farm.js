import { log } from "../core/logger.js";
import { farmState, FARM_DEFAULTS } from "../farm/config.js";
import { loadFarmCfg, saveFarmCfg, needsCalibration } from "../core/storage.js";
import { getSession, checkHealth } from "../core/wplace-api.js";
import { createFarmUI, autoCalibrateTile } from "../farm/ui.js";
import { loop } from "../farm/loop.js";

(async function() {
  'use strict';

  // Verificar si ya está ejecutándose
  if (window.__wplaceBot?.running) {
    alert("WPlace BOT ya está corriendo.");
    return;
  }
  
  window.__wplaceBot = { running: true };

  log('🚀 Iniciando WPlace Farm Bot (versión modular)');

  // Inicializar configuración
  const config = { ...FARM_DEFAULTS, ...loadFarmCfg(FARM_DEFAULTS) };
  
  // Verificar sitekey
  if (!config.SITEKEY) {
    const siteKeyElement = document.querySelector('*[data-sitekey]');
    if (siteKeyElement) {
      config.SITEKEY = siteKeyElement.getAttribute('data-sitekey');
      log(`📝 Sitekey encontrada automáticamente: ${config.SITEKEY.substring(0, 20)}...`);
      saveFarmCfg(config);
    } else {
      log('⚠️ No se pudo encontrar la sitekey automáticamente');
    }
  }

  // Función para actualizar sesión y estadísticas
  async function updateStats() {
    try {
      const session = await getSession();
      if (session.success && session.data) {
        farmState.charges.count = session.data.charges || 0;
        farmState.charges.max = session.data.maxCharges || 50;
        farmState.charges.regen = session.data.chargeRegen || 30000;
        
        // Actualizar configuración con datos de la sesión
        config.CHARGE_REGEN_MS = farmState.charges.regen;
        
        ui.updateStats(farmState.painted, farmState.charges.count);
        return true;
      }
      return false;
    } catch (error) {
      log('Error actualizando estadísticas:', error);
      return false;
    }
  }

  // Función para verificar health del backend
  async function checkBackendHealth() {
    try {
      return await checkHealth();
    } catch (error) {
      log('Error verificando health:', error);
      return { up: false, error: error.message };
    }
  }

  // Crear la interfaz de usuario
  const ui = createFarmUI(
    config,
    // onStart
    async () => {
      if (farmState.running) {
        ui.setStatus('⚠️ El bot ya está ejecutándose', 'error');
        return;
      }
      
      // Verificar si necesita calibración
      if (needsCalibration(config, FARM_DEFAULTS)) {
        ui.setStatus('🎯 Calibrando automáticamente...', 'status');
        const calibration = await autoCalibrateTile(config);
        if (calibration.success) {
          ui.setStatus(`✅ Calibrado: tile(${calibration.tileX},${calibration.tileY})`, 'success');
          ui.updateConfig(); // Actualizar UI con nuevas coordenadas
        } else {
          ui.setStatus('❌ Error en calibración. Configura manualmente.', 'error');
          return;
        }
      }
      
      // Verificar conectividad
      ui.setStatus('🔍 Verificando conectividad...', 'status');
      const health = await checkBackendHealth();
      if (!health.up) {
        ui.setStatus('🔴 Backend no disponible. Verifica tu conexión.', 'error');
        return;
      }
      
      // Obtener sesión inicial
      ui.setStatus('🔄 Obteniendo información de sesión...', 'status');
      const sessionOk = await updateStats();
      if (!sessionOk) {
        ui.setStatus('❌ Error obteniendo sesión. Verifica tu login.', 'error');
        return;
      }
      
      ui.setStatus('🚀 Iniciando bot...', 'status');
      
      // Iniciar el loop principal
      loop(config, farmState, ui.setStatus, ui.flashEffect, updateStats, checkBackendHealth, updateStats);
    },
    
    // onStop
    () => {
      farmState.running = false;
      window.__wplaceBot.running = false;
      ui.setStatus('⏹️ Deteniendo bot...', 'status');
    },
    
    // onCalibrate
    async () => {
      ui.setStatus('🎯 Calibrando posición...', 'status');
      const calibration = await autoCalibrateTile(config);
      if (calibration.success) {
        ui.setStatus(`✅ Calibrado: tile(${calibration.tileX},${calibration.tileY})`, 'success');
        ui.updateConfig(); // Actualizar UI con nuevas coordenadas
      } else {
        ui.setStatus(`❌ Error en calibración: ${calibration.error || 'Desconocido'}`, 'error');
      }
    }
  );

  // Actualizar estadísticas inicial
  await updateStats();

  // Setup de eventos globales
  window.addEventListener('wplace-batch-painted', (event) => {
    log(`🎨 Lote pintado: ${event.detail.pixelCount} píxeles en tile(${event.detail.tileX},${event.detail.tileY})`);
  });

  // Cleanup al cerrar la página
  window.addEventListener('beforeunload', () => {
    farmState.running = false;
    window.__wplaceBot.running = false;
    ui.destroy();
  });

  log('✅ Farm Bot inicializado correctamente');

})().catch((e) => {
  console.error("[BOT] Error en Auto-Farm:", e);
  window.__wplaceBot.running = false;
  alert("Auto-Farm: error inesperado. Revisa consola.");
});
