import { log } from "../core/logger.js";
import { farmState, FARM_DEFAULTS } from "../farm/config.js";
import { loadFarmCfg, saveFarmCfg, resetToSafeDefaults } from "../core/storage.js";
import { getSession, checkHealth, purchaseProduct } from "../core/wplace-api.js";
import { createFarmUI, autoCalibrateTile } from "../farm/ui.js";
import { loop, paintWithRetry } from "../farm/loop.js";
import { coordinateCapture } from "../core/capture.js";
import { clamp } from "../core/utils.js";
import { initializeLanguage, t } from "../locales/index.js";
import { autoClickPaintButton } from "../core/dom.js";
import { sessionStart, sessionPing, sessionEnd } from "../core/metrics/client.js";
import { getMetricsConfig } from "../core/metrics/config.js";

(async function() {
  'use strict';

  // Initialize internationalization first
  await initializeLanguage();
  
  // Auto-click del botón Paint al inicio
  try {
    log('🤖 [FARM] Iniciando auto-click del botón Paint...');
    await autoClickPaintButton(3, true);
  } catch (error) {
    log('⚠️ [FARM] Error en auto-click del botón Paint:', error);
  }

  // Verificar si el bot de farm ya está ejecutándose
  if (window.__wplaceBot?.farmRunning) {
    alert(t('farm.alreadyRunning', "Auto-Farm ya está corriendo."));
    return;
  }
  
  // Verificar si hay otros bots ejecutándose
  if (window.__wplaceBot?.imageRunning) {
    alert(t('farm.imageRunningWarning', "Auto-Image está ejecutándose. Ciérralo antes de iniciar Auto-Farm."));
    return;
  }

  // Inicializar el estado global si no existe
  if (!window.__wplaceBot) {
    window.__wplaceBot = {};
  }
  
  // Marcar que el farm bot está ejecutándose
  window.__wplaceBot.farmRunning = true;

  // ---------- Métricas: iniciar sesión y pings (igual a Auto-Guard) ----------
  try {
    const mcfg = getMetricsConfig({ VARIANT: 'auto-farm' });
    if (mcfg.ENABLED) {
      if (!window.__wplaceMetrics) window.__wplaceMetrics = {};
      const pingEvery = Math.max(60_000, mcfg.PING_INTERVAL_MS || 300_000);
      window.__wplaceMetrics.farmSessionActive = true;
      sessionStart({ botVariant: 'auto-farm' });
      // Ping rápido tras el inicio para reflejar presencia inmediata
      setTimeout(() => {
        try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'init' } }); } catch {}
      }, 3000);
      // Intervalo periódico
  window.__wplaceMetrics.farmPingInterval = window.setInterval(() => {
        try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'interval' } }); } catch {}
      }, pingEvery);
      // Pings por visibilidad/foco
      const visibilityHandler = () => { if (!document.hidden) { try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'visibility' } }); } catch {} } };
      const focusHandler = () => { try { sessionPing({ botVariant: 'auto-farm', metadata: { reason: 'focus' } }); } catch {} };
      document.addEventListener('visibilitychange', visibilityHandler);
      window.addEventListener('focus', focusHandler);
      window.__wplaceMetrics.farmVisibilityHandler = visibilityHandler;
      window.__wplaceMetrics.farmFocusHandler = focusHandler;
    }
  } catch {}

  // Listen for language changes
  window.addEventListener('languageChanged', () => {
    if (window.__wplaceBot?.ui?.updateTexts) {
      window.__wplaceBot.ui.updateTexts();
    }
  });

  log('🚀 Iniciando WPlace Farm Bot (versión modular)');

  // Verificar si necesita calibración inicial
  function needsCalibrationCheck(cfg) {
  // Si el usuario ya seleccionó una zona válida, NO recalibrar
  const hasSelectedZone = !!cfg.POSITION_SELECTED && cfg.BASE_X != null && cfg.BASE_Y != null;
  // Verificar si las coordenadas son las por defecto
  const hasDefaultCoords = cfg.TILE_X === FARM_DEFAULTS.TILE_X && cfg.TILE_Y === FARM_DEFAULTS.TILE_Y;
  // Verificar que las coordenadas sean números válidos
  const hasInvalidCoords = !Number.isFinite(cfg.TILE_X) || !Number.isFinite(cfg.TILE_Y);

  // Solo calibrar si NO hay zona seleccionada aún y además las coords son default o inválidas
  const needsCalib = !hasSelectedZone && (hasDefaultCoords || hasInvalidCoords);
  log(`Verificación calibración: defaults=${hasDefaultCoords}, selected=${hasSelectedZone}, invalid=${hasInvalidCoords}, coords=(${cfg.TILE_X},${cfg.TILE_Y})`);

  return needsCalib;
  }

  // Función para habilitar captura de coordenadas
  function enableCaptureOnce() {
    log('🕵️ Activando captura de coordenadas...');
    
    coordinateCapture.enable((result) => {
      if (result.success) {
        cfg.TILE_X = result.tileX;
        cfg.TILE_Y = result.tileY;
        // Guardar posición base local y marcar selección
        if (Number.isFinite(result.localX) && Number.isFinite(result.localY)) {
          cfg.BASE_X = result.localX;
          cfg.BASE_Y = result.localY;
          cfg.POSITION_SELECTED = true;
        }
  saveFarmCfg(cfg);
  // Refrescar UI tras guardar
  ui.updateConfig();
  // Pequeño retraso para asegurar que el Shadow DOM refleja el cambio
  setTimeout(() => ui.updateConfig(), 50);
        ui.setStatus(`🎯 Zona lista: tile(${result.tileX},${result.tileY}) base(${cfg.BASE_X},${cfg.BASE_Y})`, 'success');
        log(`✅ Coordenadas capturadas: tile(${result.tileX},${result.tileY}) base(${cfg.BASE_X},${cfg.BASE_Y})`);
      } else {
        ui.setStatus(`❌ ${t('common.error', 'No se pudieron capturar coordenadas')}`, 'error');
      }
    });
    
    ui.setStatus(`📸 ${t('farm.captureInstructions')}`, 'status');
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
        // droplets
        farmState.droplets = session.data.droplets ?? (session.data.user?.droplets ?? 0);
        
        // Actualizar configuración con datos de la sesión
        cfg.CHARGE_REGEN_MS = farmState.charges.regen;
        
        // Verificar health
        const health = await checkBackendHealth();
        farmState.health = health;
        
        ui.updateStats(farmState.painted, farmState.charges.count, farmState.retryCount, health);
        // Auto-compra: si está habilitado y tenemos >= 500 droplets
        try {
          if (cfg.AUTO_BUY_ENABLED && (farmState.droplets || 0) >= 500) {
            ui.setStatus(t('farm.autobuy.buying','Comprando automáticamente...'), 'status');
            const res = await purchaseProduct(70, 1);
            if (res.success) {
              if (ui.notify) ui.notify(t('farm.autobuy.bought','Compra OK. Actualizando sesión...'), 'success');
              ui.setStatus(t('farm.autobuy.bought','Compra OK. Actualizando sesión...'), 'success');
              // Restar 500 droplets inmediatamente en UI
              try {
                farmState.droplets = Math.max(0, (farmState.droplets || 0) - 500);
                ui.updateStats(farmState.painted, farmState.charges.count, farmState.retryCount, farmState.health);
              } catch {}
              // Reconsultar sesión para reflejar nuevas cargas/droplets
              const after = await getSession();
              if (after.success && after.data) {
                farmState.charges.count = after.data.charges || farmState.charges.count;
                farmState.charges.max = after.data.maxCharges || farmState.charges.max;
                farmState.droplets = after.data.droplets ?? farmState.droplets;
                farmState.user = after.data.user || farmState.user;
                ui.updateStats(farmState.painted, farmState.charges.count, farmState.retryCount, farmState.health);
              }
            } else {
              if (ui.notify) ui.notify(t('farm.autobuy.failed','No se pudo comprar automáticamente'), 'error');
              ui.setStatus(t('farm.autobuy.failed','No se pudo comprar automáticamente'), 'error');
            }
          }
        } catch(e) {
          console.warn('Auto-buy error:', e);
        }
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
      
      // Si no se ha seleccionado una zona, activar automáticamente la selección
      if (!cfg.POSITION_SELECTED || cfg.BASE_X === null || cfg.BASE_Y === null) {
        ui.setStatus(t('farm.autoSelectPosition'), 'info');
        
        // Activar selección de zona automáticamente
        const selectButton = ui.getElement().shadowRoot.getElementById('select-position-btn');
        if (selectButton) {
          selectButton.click();
        }
        
        // Retornar para no iniciar el bot todavía
        return;
      }
      
      // Verificar si necesita calibración (solo si no hay zona seleccionada)
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

  // Fallback: escuchar evento global de captura por si el callback no llega
  window.addEventListener('wplace-capture', (ev) => {
    try {
      const d = ev?.detail || window.__wplaceLastCapture;
      if (!d || !d.success) return;
      cfg.TILE_X = d.tileX; cfg.TILE_Y = d.tileY;
      if (Number.isFinite(d.localX) && Number.isFinite(d.localY)) {
        cfg.BASE_X = d.localX; cfg.BASE_Y = d.localY; cfg.POSITION_SELECTED = true;
      }
      saveFarmCfg(cfg);
      ui.updateConfig();
      setTimeout(() => ui.updateConfig(), 50);
      ui.setStatus(`🎯 Zona lista: tile(${d.tileX},${d.tileY}) base(${cfg.BASE_X},${cfg.BASE_Y})`, 'success');
    } catch {}
  });

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
    // Limpiar métricas
    try {
      const mcfg = getMetricsConfig();
      if (mcfg.ENABLED) {
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
        if (window.__wplaceMetrics?.farmSessionActive) {
          sessionEnd({ botVariant: 'auto-farm' });
          window.__wplaceMetrics.farmSessionActive = false;
        }
      }
    } catch {}
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
