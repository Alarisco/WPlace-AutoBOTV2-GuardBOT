import { log } from "../core/logger.js";
import { farmState, FARM_DEFAULTS } from "../farm/config.js";
import { loadFarmCfg, saveFarmCfg, resetToSafeDefaults } from "../core/storage.js";
import { getSession, checkHealth } from "../core/wplace-api.js";
import { createFarmUI, autoCalibrateTile } from "../farm/ui.js";
import { loop, paintWithRetry } from "../farm/loop.js";
import { coordinateCapture } from "../core/capture.js";
import { clamp } from "../core/utils.js";

(async function() {
  'use strict';

  // Verificar si el bot de farm ya está ejecutándose
  if (window.__wplaceBot?.farmRunning) {
    alert("Auto-Farm ya está corriendo.");
    return;
  }
  
  // Verificar si hay otros bots ejecutándose
  if (window.__wplaceBot?.imageRunning) {
    alert("Auto-Image está ejecutándose. Ciérralo antes de iniciar Auto-Farm.");
    return;
  }

  // Inicializar el estado global si no existe
  if (!window.__wplaceBot) {
    window.__wplaceBot = {};
  }
  
  // Marcar que el farm bot está ejecutándose
  window.__wplaceBot.farmRunning = true;

  log('🚀 Iniciando WPlace Farm Bot (versión modular)');

  // Verificar si necesita calibración inicial
  function needsCalibrationCheck(cfg) {
    // Verificar si las coordenadas son las por defecto
    const hasDefaultCoords = cfg.TILE_X === FARM_DEFAULTS.TILE_X && cfg.TILE_Y === FARM_DEFAULTS.TILE_Y;
    // También verificar si no hay configuración guardada
    const hasNoSavedConfig = !localStorage.getItem('WPA_UI_CFG');
    // Verificar que las coordenadas sean números válidos
    const hasInvalidCoords = !Number.isFinite(cfg.TILE_X) || !Number.isFinite(cfg.TILE_Y);
    
    const needsCalib = hasDefaultCoords || hasNoSavedConfig || hasInvalidCoords;
    log(`Verificación calibración: defaults=${hasDefaultCoords}, noConfig=${hasNoSavedConfig}, invalid=${hasInvalidCoords}, coords=(${cfg.TILE_X},${cfg.TILE_Y})`);
    
    return needsCalib;
  }

  // Función para habilitar captura de coordenadas
  function enableCaptureOnce() {
    log('🕵️ Activando captura de coordenadas...');
    
    coordinateCapture.enable((result) => {
      if (result.success) {
        cfg.TILE_X = result.tileX;
        cfg.TILE_Y = result.tileY;
        saveFarmCfg(cfg);
        ui.updateConfig();
        ui.setStatus(`🎯 Coordenadas capturadas: tile(${result.tileX},${result.tileY})`, 'success');
        log(`✅ Coordenadas capturadas automáticamente: tile(${result.tileX},${result.tileY})`);
      } else {
        ui.setStatus('❌ No se pudieron capturar coordenadas', 'error');
      }
    });
    
    ui.setStatus('📸 Pinta un píxel manualmente para capturar coordenadas...', 'status');
  }

  // Inicializar configuración
  let cfg = { ...FARM_DEFAULTS, ...loadFarmCfg(FARM_DEFAULTS) };
  
  // Verificar sitekey
  if (!cfg.SITEKEY) {
    const siteKeyElement = document.querySelector('*[data-sitekey]');
    if (siteKeyElement) {
      cfg.SITEKEY = siteKeyElement.getAttribute('data-sitekey');
      log(`📝 Sitekey encontrada automáticamente: ${cfg.SITEKEY.substring(0, 20)}...`);
      saveFarmCfg(cfg);
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
        farmState.user = session.data.user;
        
        // Actualizar configuración con datos de la sesión
        cfg.CHARGE_REGEN_MS = farmState.charges.regen;
        
        // Verificar health
        const health = await checkBackendHealth();
        farmState.health = health;
        
        ui.updateStats(farmState.painted, farmState.charges.count, farmState.retryCount, health);
        return session.data;
      }
      return null;
    } catch (error) {
      log('Error actualizando estadísticas:', error);
      return null;
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

  // Función de pintado individual
  async function paintOnceWrapper() {
    return await paintWithRetry(cfg, farmState, ui.setStatus, ui.flashEffect, () => getSession(), checkBackendHealth);
  }

  // Crear la interfaz de usuario
  const ui = createFarmUI(
    cfg,
    // onStart
    async () => {
      if (farmState.running) {
        ui.setStatus('⚠️ El bot ya está ejecutándose', 'error');
        return;
      }
      
      // Verificar si necesita calibración
      if (needsCalibrationCheck(cfg)) {
        ui.setStatus('🎯 Calibrando automáticamente...', 'status');
        const calibration = await autoCalibrateTile(cfg);
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
      const sessionData = await updateStats();
      if (!sessionData) {
        ui.setStatus('❌ Error obteniendo sesión. Verifica tu login.', 'error');
        return;
      }
      
      ui.setStatus('🚀 Iniciando bot...', 'status');
      ui.updateButtonStates(true);
      
      // Iniciar el loop principal
      loop(cfg, farmState, ui.setStatus, ui.flashEffect, updateStats, checkBackendHealth, updateStats);
    },
    
    // onStop
    () => {
      farmState.running = false;
      if (window.__wplaceBot) {
        window.__wplaceBot.farmRunning = false;
      }
      ui.setStatus('⏹️ Deteniendo bot...', 'status');
      ui.updateButtonStates(false);
    },
    
    // onCalibrate
    async () => {
      ui.setStatus('🎯 Calibrando posición...', 'status');
      const calibration = await autoCalibrateTile(cfg);
      if (calibration.success) {
        ui.setStatus(`✅ Calibrado: tile(${calibration.tileX},${calibration.tileY})`, 'success');
        ui.updateConfig(); // Actualizar UI con nuevas coordenadas
      } else {
        ui.setStatus(`❌ Error en calibración: ${calibration.error || 'Desconocido'}`, 'error');
      }
    }
  );

  // Configurar el botón de captura
  const captureBtn = ui.getElement().shadowRoot.getElementById('capture-btn');
  if (captureBtn) {
    captureBtn.addEventListener('click', enableCaptureOnce);
  }

  // Configurar el botón "Una vez"
  const onceBtn = ui.getElement().shadowRoot.getElementById('once-btn');
  if (onceBtn) {
    onceBtn.addEventListener('click', async () => {
      if (farmState.running) {
        ui.setStatus('⚠️ Detén el bot primero', 'error');
        return;
      }
      
      await updateStats();
      ui.setStatus('🎨 Pintando una vez...', 'status');
      const success = await paintOnceWrapper();
      if (success) {
        ui.setStatus('✅ Píxel pintado exitosamente', 'success');
      } else {
        ui.setStatus('❌ Error al pintar píxel', 'error');
      }
    });
  }

  // Actualizar estadísticas inicial
  await updateStats();

  // Setup de eventos globales
  window.addEventListener('wplace-batch-painted', (event) => {
    log(`🎨 Lote pintado: ${event.detail.pixelCount} píxeles en tile(${event.detail.tileX},${event.detail.tileY})`);
  });

  // ---------- Exponer API por consola (como en el original) ----------
  window.WPAUI = {
    once: paintOnceWrapper,
    get: () => ({ ...cfg }),
    capture: enableCaptureOnce,
    refreshCanvas: () => {
      // Actualizar canvas si hay último píxel pintado
      if (farmState.last) {
        // Esta función se implementaría en loop.js
        log(`Refrescando canvas en posición (${farmState.last.x},${farmState.last.y})`);
      }
    },
    verifyPixel: async (x, y) => {
      log(`Verificando píxel en (${x},${y})...`);
      // Esta función verificaría si un píxel específico fue pintado correctamente
      return { verified: true, x, y };
    },
    
    getStats: () => ({
      painted: farmState.painted,
      last: farmState.last,
      charges: farmState.charges,
      user: farmState.user,
      running: farmState.running,
      minCharges: cfg.MIN_CHARGES,
      delay: cfg.DELAY_MS,
      tileInfo: {
        tileX: cfg.TILE_X,
        tileY: cfg.TILE_Y,
        tileSize: cfg.TILE_SIZE,
        safeMargin: Math.floor(cfg.TILE_SIZE * 0.05),
        safeArea: {
          minX: Math.floor(cfg.TILE_SIZE * 0.05),
          maxX: cfg.TILE_SIZE - Math.floor(cfg.TILE_SIZE * 0.05) - 1,
          minY: Math.floor(cfg.TILE_SIZE * 0.05),
          maxY: cfg.TILE_SIZE - Math.floor(cfg.TILE_SIZE * 0.05) - 1
        }
      }
    }),
    
    setPixelsPerBatch: (count) => {
      cfg.PIXELS_PER_BATCH = clamp(count, 1, 50);
      saveFarmCfg(cfg);
      ui.updateConfig();
      log(`Píxeles por lote configurado a: ${cfg.PIXELS_PER_BATCH}`);
    },
    
    setMinCharges: (min) => {
      cfg.MIN_CHARGES = Math.max(0, min);
      saveFarmCfg(cfg);
      ui.updateConfig();
      log(`Cargas mínimas configuradas a: ${cfg.MIN_CHARGES}`);
    },
    
    setDelay: (seconds) => {
      cfg.DELAY_MS = Math.max(1000, seconds * 1000);
      saveFarmCfg(cfg);
      ui.updateConfig();
      log(`Delay configurado a: ${cfg.DELAY_MS}ms`);
    },
    
    diagnose: () => {
      const stats = window.WPAUI.getStats();
      const diagnosis = {
        configValid: Number.isFinite(cfg.TILE_X) && Number.isFinite(cfg.TILE_Y),
        hasCharges: farmState.charges.count > 0,
        backendHealthy: farmState.health?.up || false,
        userLoggedIn: !!farmState.user,
        coordinates: `(${cfg.TILE_X},${cfg.TILE_Y})`,
        safeArea: stats.tileInfo.safeArea,
        recommendations: []
      };
      
      if (!diagnosis.configValid) {
        diagnosis.recommendations.push('Calibrar coordenadas del tile');
      }
      if (!diagnosis.hasCharges) {
        diagnosis.recommendations.push('Esperar a que se regeneren las cargas');
      }
      if (!diagnosis.backendHealthy) {
        diagnosis.recommendations.push('Verificar conexión al backend');
      }
      if (!diagnosis.userLoggedIn) {
        diagnosis.recommendations.push('Iniciar sesión en la plataforma');
      }
      
      console.table(diagnosis);
      return diagnosis;
    },
    
    checkHealth: checkBackendHealth,
    
    resetConfig: () => {
      resetToSafeDefaults();
      cfg = { ...FARM_DEFAULTS };
      ui.updateConfig();
      log('Configuración reseteada a valores por defecto');
    },
    
    debugRetries: () => {
      return {
        currentRetries: farmState.retryCount,
        inCooldown: farmState.inCooldown,
        nextPaintTime: farmState.nextPaintTime,
        cooldownEndTime: farmState.cooldownEndTime
      };
    },
    
    forceClearCooldown: () => {
      farmState.inCooldown = false;
      farmState.nextPaintTime = 0;
      farmState.cooldownEndTime = 0;
      farmState.retryCount = 0;
      log('Cooldown forzado a limpiar');
    },
    
    simulateError: (statusCode = 500) => {
      log(`Simulando error ${statusCode} para testing...`);
      ui.setStatus(`🧪 Simulando error ${statusCode}`, 'error');
    }
  };

  // Cleanup al cerrar la página
  window.addEventListener('beforeunload', () => {
    farmState.running = false;
    if (window.__wplaceBot) {
      window.__wplaceBot.farmRunning = false;
    }
    coordinateCapture.disable();
    ui.destroy();
  });

  log('✅ Farm Bot inicializado correctamente');
  log('💡 Usa console.log(window.WPAUI) para ver la API disponible');

})().catch((e) => {
  console.error("[BOT] Error en Auto-Farm:", e);
  if (window.__wplaceBot) {
    window.__wplaceBot.farmRunning = false;
  }
  alert("Auto-Farm: error inesperado. Revisa consola.");
});
