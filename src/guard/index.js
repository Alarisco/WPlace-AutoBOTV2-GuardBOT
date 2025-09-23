import { log } from "../core/logger.js";
import { getSession } from "../core/wplace-api.js";
import { guardState, GUARD_DEFAULTS } from "./config.js";
import { detectAvailableColors, analyzeAreaPixels, checkForChanges, startChargeMonitoring, stopChargeMonitoring, startIndependentChargeMonitoring, stopIndependentChargeMonitoring } from "./processor.js";
import { createGuardUI, showConfirmDialog } from "./ui.js";
import { createLogWindow } from "../log_window/index.js";
import { saveProgress, loadProgress, hasProgress } from "./save-load.js";
import { initializeLanguage, getSection, t } from "../locales/index.js";
import { isPaletteOpen, findAndClickPaintButton } from "../core/dom.js";
import { prepareTokensForBot } from "../core/warmup.js";
import { sleep } from "../core/timing.js";
import { guardOverlay } from "./overlay.js";
import { sessionStart, sessionEnd, sessionPing, trackEvent } from "../core/metrics/client.js";
import { getMetricsConfig } from "../core/metrics/config.js";


// Globals del navegador
const { setInterval, clearInterval } = window;

export async function runGuard() {
  log('🛡️ Iniciando WPlace Auto-Guard');
  
  // Inicializar sistema de idiomas
  initializeLanguage();
  // Preparar tokens con la nueva ventana de captura
  try {
    const result = await prepareTokensForBot('Auto-Guard');
    if (!result.success) {
      log('⚠️ [guard] Tokens no preparados, continuando con interceptor activo');
    }
  } catch (error) {
    log('❌ [guard] Error preparando tokens:', error);
  }
  
  // Cargar configuración previa desde localStorage (si existe)
  try {
    const raw = localStorage.getItem('wplace-guard-config');
    if (raw) {
      const cfg = JSON.parse(raw);
      if (cfg && typeof cfg === 'object') {
        if (typeof cfg.protectionPattern === 'string') guardState.protectionPattern = cfg.protectionPattern;
        if (typeof cfg.operationMode === 'string') guardState.operationMode = cfg.operationMode;
        if (typeof cfg.preferColor === 'boolean') guardState.preferColor = cfg.preferColor;
        if (Array.isArray(cfg.preferredColorIds)) {
          guardState.preferredColorIds = cfg.preferredColorIds;
          guardState.preferredColorId = cfg.preferredColorIds.length > 0 ? cfg.preferredColorIds[0] : null; // legado
        } else if (typeof cfg.preferredColorId === 'number') {
          guardState.preferredColorIds = [cfg.preferredColorId];
          guardState.preferredColorId = cfg.preferredColorId;
        }
        if (typeof cfg.excludeColor === 'boolean') guardState.excludeColor = cfg.excludeColor;
        if (Array.isArray(cfg.excludedColorIds)) guardState.excludedColorIds = cfg.excludedColorIds;
        if (typeof cfg.spendAllPixelsOnStart === 'boolean') guardState.spendAllPixelsOnStart = cfg.spendAllPixelsOnStart;
        if (Number.isFinite(cfg.minChargesToWait)) guardState.minChargesToWait = cfg.minChargesToWait;
        if (Number.isFinite(cfg.pixelsPerBatch)) guardState.pixelsPerBatch = cfg.pixelsPerBatch;
        if (typeof cfg.randomWaitTime === 'boolean') guardState.randomWaitTime = cfg.randomWaitTime;
        if (Number.isFinite(cfg.randomWaitMin)) guardState.randomWaitMin = cfg.randomWaitMin;
        if (Number.isFinite(cfg.randomWaitMax)) guardState.randomWaitMax = cfg.randomWaitMax;
        
        // Cargar nuevas opciones de transparencia
        if (typeof cfg.protectTransparentPixels === 'boolean') guardState.protectTransparentPixels = cfg.protectTransparentPixels;
        if (typeof cfg.protectPerimeter === 'boolean') guardState.protectPerimeter = cfg.protectPerimeter;
        if (Number.isFinite(cfg.perimeterWidth) && cfg.perimeterWidth >= 1 && cfg.perimeterWidth <= 10) guardState.perimeterWidth = cfg.perimeterWidth;
      }
    }
  } catch (e) {
    log('⚠️ No se pudo cargar configuración previa:', e);
  }
  
  // Verificar conflictos con otros bots
  if (!checkExistingBots()) {
    return;
  }
  
  // Marcar como ejecutándose
  window.__wplaceBot = { 
    ...window.__wplaceBot, 
    guardRunning: true 
  };
  
  // Exponer guardState al objeto window para que el slave pueda acceder a él
  window.guardState = guardState;
  
  try {
    // Obtener textos en el idioma actual
    const texts = getSection('guard');
    
    // Crear UI
    guardState.ui = createGuardUI(texts);
    
    // Configurar event listeners
    setupEventListeners();
    
    // Iniciar sesión de métricas (no bloqueante)
    (async () => {
      try {
        const mcfg = getMetricsConfig({ VARIANT: 'auto-guard' });
        if (!mcfg.ENABLED) return;
        if (!window.__wplaceMetrics) window.__wplaceMetrics = {};
  log(`[METRICS] enabled → ${mcfg.BASE_URL}`);
        window.__wplaceMetrics.guardSessionActive = true;
        sessionStart({ botVariant: 'auto-guard', metadata: { source: 'guard' } });
        // Pings periódicos
        const pingEvery = Math.max(60_000, mcfg.PING_INTERVAL_MS || 300_000);
        window.__wplaceMetrics.guardPingInterval = setInterval(() => {
          sessionPing({ botVariant: 'auto-guard' });
        }, pingEvery);
      } catch {}
    })();
    
    // Función para auto-inicio del bot (robusta): valida colores reales y hace fallback a clic de Paint
    async function tryAutoInit() {
      log('🤖 Intentando auto-inicio del Guard...');
      guardState.ui.updateStatus(t('guard.paletteNotFound'), 'info');

      // 1) Si parece abierta, validar que haya colores reales
      if (isPaletteOpen()) {
        log('🎨 Paleta parece abierta. Validando colores...');
        const colorsNow = detectAvailableColors();
        if (colorsNow.length > 0) {
          guardState.ui.updateStatus(t('guard.paletteDetected'), 'success');
          return true;
        }
        log('⚠️ Paleta "abierta" pero sin colores detectados. Intentando presionar Paint...');
      }

      // 2) Intentar hacer clic en el botón Paint
      log('🔍 Buscando botón Paint...');
      guardState.ui.updateStatus(t('guard.clickingPaintButton'), 'info');
      if (findAndClickPaintButton()) {
        log('👆 Botón Paint encontrado y presionado');
        await sleep(3000); // Esperar a que cargue

        // Revalidar: primero colores reales, luego fallback a heurística de paleta
        const colorsAfter = detectAvailableColors();
        if (colorsAfter.length > 0) {
          log('✅ Colores detectados tras presionar Paint');
          guardState.ui.updateStatus(t('guard.paletteDetected'), 'success');
          return true;
        }
        if (isPaletteOpen()) {
          log('✅ Paleta abierta, pero sin colores accesibles aún');
          // Aún consideramos fallido para forzar inicio manual
        } else {
          log('❌ La paleta no se abrió después de hacer clic');
        }
      } else {
        log('❌ Botón Paint no encontrado');
      }

      guardState.ui.updateStatus(t('guard.autoInitFailed'), 'warning');
      return false;
    }
    
    // Intentar auto-inicio después de que la UI esté lista
    setTimeout(async () => {
      try {
        guardState.ui.updateStatus(t('guard.autoInitializing'), 'info');
        log('🤖 Intentando auto-inicio...');
        try { trackEvent('auto_init_attempt', { botVariant: 'auto-guard' }); } catch {}
        
        const autoInitSuccess = await tryAutoInit();
        
        if (autoInitSuccess) {
          guardState.ui.updateStatus(t('guard.autoInitSuccess'), 'success');
          log('✅ Auto-inicio exitoso');
          try { trackEvent('auto_init_result', { botVariant: 'auto-guard', metadata: { success: true } }); } catch {}
          
          // Ocultar el botón de inicialización manual
          guardState.ui.setInitButtonVisible(false);
          
          // Ejecutar la lógica de inicialización del bot
          const initResult = await initializeGuard(true); // true = es auto-inicio
          if (initResult) {
            log('🚀 Guard-BOT auto-iniciado completamente');
          }
        } else {
          guardState.ui.updateStatus(t('guard.autoInitFailed'), 'warning');
          log('⚠️ Auto-inicio falló, se requiere inicio manual');
          try { trackEvent('auto_init_result', { botVariant: 'auto-guard', metadata: { success: false } }); } catch {}
          // Asegurar que el botón de inicio manual esté visible
          guardState.ui.setInitButtonVisible(true);
        }
      } catch (error) {
        log('❌ Error en auto-inicio:', error);
        guardState.ui.updateStatus(t('guard.manualInitRequired'), 'warning');
        try { trackEvent('auto_init_result', { botVariant: 'auto-guard', metadata: { success: false, error: String(error?.message || error) } }); } catch {}
      }
  }, 1000); // 1s
    
    // Cleanup al cerrar
    window.addEventListener('beforeunload', () => {
      stopGuard();
      if (window.__wplaceBot) {
        window.__wplaceBot.guardRunning = false;
      }
      try {
        const mcfg = getMetricsConfig();
        if (mcfg.ENABLED) {
          if (window.__wplaceMetrics?.guardPingInterval) {
            clearInterval(window.__wplaceMetrics.guardPingInterval);
            window.__wplaceMetrics.guardPingInterval = null;
          }
          if (window.__wplaceMetrics?.guardSessionActive) {
            sessionEnd({ botVariant: 'auto-guard' });
            window.__wplaceMetrics.guardSessionActive = false;
          }
        }
      } catch {}
    });

    // Considerar al usuario online aunque esté ocioso: ping al recuperar visibilidad y foco
    try {
      const mcfg = getMetricsConfig();
      if (mcfg.ENABLED) {
        const visibilityHandler = () => {
          if (!document.hidden) {
            try { sessionPing({ botVariant: 'auto-guard', metadata: { reason: 'visibility' } }); } catch {}
          }
        };
        const focusHandler = () => {
          try { sessionPing({ botVariant: 'auto-guard', metadata: { reason: 'focus' } }); } catch {}
        };
        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('focus', focusHandler);
        // Guardar para limpiar en unload
        window.__wplaceMetrics = window.__wplaceMetrics || {};
        window.__wplaceMetrics.guardVisibilityHandler = visibilityHandler;
        window.__wplaceMetrics.guardFocusHandler = focusHandler;
      }
    } catch {}
    
    // Iniciar monitoreo independiente de cargas (funciona aunque el bot no esté iniciado)
    startIndependentChargeMonitoring();
    
    log('✅ Auto-Guard cargado correctamente');
    
  } catch (error) {
    log('❌ Error inicializando Auto-Guard:', error);
    if (window.__wplaceBot) {
      window.__wplaceBot.guardRunning = false;
    }
    throw error;
  }
}

function checkExistingBots() {
  if (window.__wplaceBot?.imageRunning) {
    alert('Auto-Image está ejecutándose. Ciérralo antes de iniciar Auto-Guard.');
    return false;
  }
  if (window.__wplaceBot?.farmRunning) {
    alert('Auto-Farm está ejecutándose. Ciérralo antes de iniciar Auto-Guard.');
    return false;
  }
  return true;
}

function setupEventListeners() {
  const { elements } = guardState.ui;


  elements.initBtn.addEventListener('click', () => initializeGuard());
  elements.selectAreaBtn.addEventListener('click', selectAreaStepByStep);
  elements.loadAreaBtn.addEventListener('click', () => {
    elements.areaFileInput.click();
  });
  
  elements.areaFileInput.addEventListener('change', async () => {
    if (elements.areaFileInput.files.length > 0) {
      const result = await loadProgress(elements.areaFileInput.files[0]);
      if (result.success) {
        guardState.ui.updateStatus(`✅ Protección cargada: ${result.protectedPixels} píxeles protegidos`, 'success');
        log(`✅ Área de protección cargada desde archivo`);
      } else {
        guardState.ui.updateStatus(`❌ Error al cargar protección: ${result.error}`, 'error');
        log(`❌ Error cargando archivo: ${result.error}`);
      }
    }
  });
  
  elements.startBtn.addEventListener('click', startGuard);
  elements.stopBtn.addEventListener('click', async () => {
    // Usar la función stopGuard que maneja correctamente todos los estados
    stopGuard();
  });
  
  elements.watchBtn.addEventListener('click', () => {
    // Toggle entre iniciar y detener el modo Vigía
    if (guardState.running && guardState.watchMode) {
      // Si está corriendo en modo vigía, detenerlo
      stopGuard();
    } else {
      // Si no está corriendo o está en modo protección, iniciar vigía
      startWatch();
  try { trackEvent('mode_change', { botVariant: 'auto-guard', metadata: { mode: 'watch' } }); } catch {}
    }
  });
  

  
  // Event listener para el botón de logs
  let logWindow = null;
  elements.logWindowBtn.addEventListener('click', () => {
    if (!logWindow) {
      logWindow = createLogWindow('guard');
      logWindow.show();
    } else {
      logWindow.toggle();
    }
  });
  
  // Event listener para el botón de reposicionamiento
  elements.repositionBtn.addEventListener('click', () => startRepositioning());
  
  // Eventos para save/load/delete
  elements.saveBtn.addEventListener('click', async () => {
    if (!hasProgress()) {
      guardState.ui.updateStatus('❌ No hay área protegida para guardar', 'error');
      return;
    }
    
    // Mostrar diálogo de split
    const splitConfirm = await showConfirmDialog(
      '¿Deseas dividir el área protegida en partes para múltiples usuarios?<br><br>' +
      '<label for="splitCountInput">Número de partes (1 = sin dividir):</label><br>' +
      '<input type="number" id="splitCountInput" min="1" max="20" value="1" style="margin: 5px 0; padding: 5px; width: 100px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db;">',
      'Opciones de Guardado',
      {
        save: "Guardar",
        cancel: "Cancelar"
      }
    );
    if (splitConfirm === 'save') {
      const splitInput = document.querySelector('#splitCountInput');
      const splitCount = parseInt(splitInput?.value) || 1;
      const result = await saveProgress(null, splitCount);
      if (result.success) {
        guardState.ui.updateStatus(`✅ Protección guardada${splitCount > 1 ? ` (dividida en ${splitCount} partes)` : ''}`, 'success');
      } else {
        guardState.ui.updateStatus(`❌ Error al guardar: ${result.error}`, 'error');
      }
    }
  });
}

async function initializeGuard(isAutoInit = false) {
  try {
    guardState.ui.updateStatus(t('guard.checkingColors'), 'info');
    
    // Detectar colores disponibles
    let colors = detectAvailableColors();
    if (colors.length === 0) {
      // Fallback: intentar abrir la paleta automáticamente si aún no hay colores
      log('⚠️ 0 colores detectados. Intentando abrir paleta (fallback)...');
      guardState.ui.updateStatus(t('guard.clickingPaintButton'), 'info');
      if (findAndClickPaintButton()) {
        await sleep(2500);
        colors = detectAvailableColors();
      }
    }
    if (colors.length === 0) {
      guardState.ui.updateStatus(t('guard.noColorsFound'), 'error');
      return false;
    }
    
    guardState.availableColors = colors;
    guardState.colorsChecked = true;
    
    // Obtener información de sesión
    const session = await getSession();
    if (session.success) {
      guardState.currentCharges = session.data.charges;
      guardState.maxCharges = session.data.maxCharges;
      guardState.ui.updateStats({ charges: Math.floor(guardState.currentCharges) });
      log(`👤 Usuario: ${session.data.user?.name || 'Anónimo'} - Cargas: ${guardState.currentCharges}`);
    }
    
    guardState.initialized = true;
    guardState.ui.updateStatus(t('guard.colorsFound', { count: colors.length }), 'success');
    guardState.ui.showAreaSection();
    
    // Solo mostrar log una vez (evitar duplicado en auto-inicio)
    if (!isAutoInit) {
      log(`✅ ${colors.length} colores disponibles detectados`);
    }
    
    // Marcar como inicializado exitosamente para deshabilitar el botón
    guardState.ui.setInitialized(true);
    
    return true;
    
  } catch (error) {
    log('❌ Error inicializando:', error);
    guardState.ui.updateStatus(t('guard.initError'), 'error');
    return false;
  }
}

// Variable para almacenar fetch original
let originalFetch = window.fetch;

async function selectAreaStepByStep() {
  log('🎯 Iniciando selección paso a paso del área');
  
  // Estado para la selección
  let upperLeftCorner = null;
  let lowerRightCorner = null;
  let selectionPhase = 'upperLeft'; // 'upperLeft' | 'lowerRight'
  let positionCaptured = false;
  
  // Función para restaurar fetch original
  const restoreFetch = () => {
    if (window.fetch !== originalFetch) {
      window.fetch = originalFetch;
      log('🔄 Fetch original restaurado');
    }
  };
  
  // Función para interceptar pintado y capturar coordenadas
  const setupFetchInterception = () => {
    window.fetch = async (url, options) => {
      // Solo interceptar requests específicos de pintado durante selección
      if (!positionCaptured &&
          typeof url === 'string' && 
          url.includes('/s0/pixel/') && 
          options && 
          options.method === 'POST') {
        
        try {
          log(`🎯 Interceptando request de pintado: ${url}`);
          
          const response = await originalFetch(url, options);
          
          if (response.ok && options.body) {
            let bodyData;
            try {
              bodyData = JSON.parse(options.body);
            } catch (parseError) {
              log('Error parseando body del request:', parseError);
              return response;
            }
            
            if (bodyData.coords && Array.isArray(bodyData.coords) && bodyData.coords.length >= 2) {
              const localX = bodyData.coords[0];
              const localY = bodyData.coords[1];
              
              // Extraer tile de la URL
              const tileMatch = url.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);
              if (tileMatch) {
                const tileX = parseInt(tileMatch[1]);
                const tileY = parseInt(tileMatch[2]);
                
                // Calcular coordenadas globales usando TILE_SIZE correcto
                const globalX = tileX * GUARD_DEFAULTS.TILE_SIZE + localX;
                const globalY = tileY * GUARD_DEFAULTS.TILE_SIZE + localY;
                
                if (selectionPhase === 'upperLeft') {
                  // Capturar esquina superior izquierda
                  upperLeftCorner = { x: globalX, y: globalY };
                  guardState.ui.updateCoordinates({ x1: globalX, y1: globalY });
                  guardState.ui.updateStatus(t('guard.upperLeftCaptured', { x: globalX, y: globalY }), 'success');
                  log(`✅ Esquina superior izquierda capturada: (${globalX}, ${globalY})`);
                  
                  // Cambiar a fase de esquina inferior derecha
                  selectionPhase = 'lowerRight';
                  setTimeout(() => {
                    if (selectionPhase === 'lowerRight') {
                      guardState.ui.updateStatus(t('guard.selectLowerRight'), 'info');
                    }
                  }, 1500);
                  
                } else if (selectionPhase === 'lowerRight') {
                  // Capturar esquina inferior derecha
                  lowerRightCorner = { x: globalX, y: globalY };
                  guardState.ui.updateCoordinates({ x2: globalX, y2: globalY });
                  guardState.ui.updateStatus(t('guard.lowerRightCaptured', { x: globalX, y: globalY }), 'success');
                  log(`✅ Esquina inferior derecha capturada: (${globalX}, ${globalY})`);
                  
                  // Completar selección
                  positionCaptured = true;
                  restoreFetch();
                  
                  // Validar área
                  if (upperLeftCorner.x >= lowerRightCorner.x || upperLeftCorner.y >= lowerRightCorner.y) {
                    guardState.ui.updateStatus(t('guard.invalidArea'), 'error');
                    return response;
                  }
                  
                  // Capturar área automáticamente
                  setTimeout(async () => {
                    await captureAreaFromCoordinates(upperLeftCorner, lowerRightCorner);
                  }, 1000);
                }
              }
            }
          }
          
          return response;
        } catch (error) {
          log('❌ Error interceptando pixel:', error);
          restoreFetch();
          return originalFetch(url, options);
        }
      }
      
      // Para todos los demás requests, usar fetch original
      return originalFetch(url, options);
    };
  };
  
  // Configurar interceptación
  setupFetchInterception();
  
  // Iniciar con esquina superior izquierda
  guardState.ui.updateStatus(t('guard.selectUpperLeft'), 'info');
  
  // Timeout para selección (2 minutos)
  setTimeout(() => {
    if (!positionCaptured) {
      restoreFetch();
      guardState.ui.updateStatus(t('guard.selectionTimeout'), 'error');
      log('⏰ Timeout en selección de área');
    }
  }, 120000);
}

async function captureAreaFromCoordinates(upperLeft, lowerRight) {
  try {
    const area = {
      x1: upperLeft.x,
      y1: upperLeft.y,
      x2: lowerRight.x,
      y2: lowerRight.y
    };
    
    guardState.ui.updateStatus(t('guard.capturingArea'), 'info');
    
    const pixelMap = await analyzeAreaPixels(area, { allowVirtual: true });
    
    guardState.protectionArea = area;
    guardState.originalPixels = pixelMap;
    guardState.changes.clear();
    
    // Detectar si el área es virtual (todos los píxeles son blancos con ID 5)
    const isVirtual = pixelMap.size > 0 && Array.from(pixelMap.values())
      .every(pixel => pixel.colorId === 5 && pixel.r === 255 && pixel.g === 255 && pixel.b === 255);
    
    guardState.ui.updateProgress(pixelMap.size, 0, isVirtual);
    guardState.ui.updateStatus(t('guard.areaCaptured', { count: pixelMap.size }), 'success');
    guardState.ui.enableStartBtn();
    
  log(`✅ Área capturada: ${pixelMap.size} píxeles protegidos`);
  try { trackEvent('area_captured', { botVariant: 'auto-guard', metadata: { count: pixelMap.size, x1: area.x1, y1: area.y1, x2: area.x2, y2: area.y2 } }); } catch {}
    
  } catch (error) {
    log('❌ Error capturando área:', error);
    guardState.ui.updateStatus(t('guard.captureError', { error: error.message }), 'error');
  }
}

async function startGuard() {
  if (!guardState.protectionArea || !guardState.originalPixels.size) {
    guardState.ui.updateStatus(t('guard.captureFirst'), 'error');
    return;
  }
  
  guardState.running = true;
  guardState.watchMode = false;
  guardState.totalRepaired = 0; // Resetear contador para "gastar todos los píxeles al iniciar"
  guardState.ui.setRunningState(true);
  
  // Comportamiento según el modo de operación
  if (guardState.operationMode === 'erase') {
    // Modo borrado: comportamiento continuo como protección
    guardState.ui.updateStatus('🗑️ Protección de borrado iniciada', 'success');
    log('🗑️ Iniciando protección de borrado del área');
    try { trackEvent('mode_change', { botVariant: 'auto-guard', metadata: { mode: 'erase' } }); } catch {}
  } else {
    // Modo protección: comportamiento normal
    guardState.ui.updateStatus(t('guard.protectionStarted'), 'success');
    log('🛡️ Iniciando protección del área');
    try { trackEvent('mode_change', { botVariant: 'auto-guard', metadata: { mode: 'protect' } }); } catch {}
  }
  
  // Configurar intervalo de verificación para ambos modos
  guardState.checkInterval = setInterval(checkForChanges, GUARD_DEFAULTS.CHECK_INTERVAL);
  
  // Iniciar monitoreo de cargas
  startChargeMonitoring();
  
  // Primera verificación inmediata
  await checkForChanges();
}

async function startWatch() {
  if (!guardState.protectionArea || !guardState.originalPixels.size) {
    guardState.ui.updateStatus(t('guard.captureFirst'), 'error');
    return;
  }
  
  guardState.running = true;
  guardState.watchMode = true; // Modo solo vigilancia, sin reparar
  guardState.totalRepaired = 0; // Resetear contador para consistencia
  guardState.ui.setRunningState(true);
  guardState.ui.updateWatchButton(true); // Actualizar botón a estado "detener"
  guardState.ui.updateStatus('👁️ Modo Vigía iniciado - solo monitorización', 'success');
  
  log('👁️ Iniciando modo Vigía del área');
  
  // Configurar intervalo de verificación (mismo que protección)
  guardState.checkInterval = setInterval(checkForChanges, GUARD_DEFAULTS.CHECK_INTERVAL);
  
  // Iniciar monitoreo de cargas (para mostrar estadísticas)
  startChargeMonitoring();
  
  // Primera verificación inmediata
  await checkForChanges();
}

function stopGuard() {
  const wasWatchMode = guardState.watchMode;
  guardState.running = false;
  guardState.watchMode = false; // Resetear modo vigía
  
  if (guardState.checkInterval) {
    clearInterval(guardState.checkInterval);
    guardState.checkInterval = null;
  }
  
  // Detener monitoreo de cargas
  stopChargeMonitoring();
  
  // Detener monitoreo independiente de cargas
  stopIndependentChargeMonitoring();
  
  // Finalizar sesión de métricas si estaba activa
  try {
    const mcfg = getMetricsConfig();
    if (mcfg.ENABLED) {
      if (window.__wplaceMetrics?.guardPingInterval) {
        clearInterval(window.__wplaceMetrics.guardPingInterval);
        window.__wplaceMetrics.guardPingInterval = null;
      }
      if (window.__wplaceMetrics?.guardSessionActive) {
  sessionEnd({ botVariant: 'auto-guard' });
        window.__wplaceMetrics.guardSessionActive = false;
      }
    }
  } catch {}
  
  if (guardState.ui) {
    guardState.ui.setRunningState(false);
    guardState.ui.updateWatchButton(false); // Actualizar botón a estado "iniciar"
    const statusMessage = wasWatchMode ? '⏹️ Vigía detenido' : t('guard.protectionStopped');
    guardState.ui.updateStatus(statusMessage, 'warning');
  }
  
  log(wasWatchMode ? '⏹️ Vigía detenido' : '⏹️ Protección detenida');
  try { trackEvent('mode_change', { botVariant: 'auto-guard', metadata: { mode: 'stopped' } }); } catch {}
}

// Variables para el sistema de reposicionamiento
let repositionState = {
  isRepositioning: false,
  originalPixels: null,
  originalArea: null,
  overlayEnabled: false
};

// Función para iniciar el reposicionamiento
async function startRepositioning() {
  if (!guardState.protectionArea || !guardState.originalPixels || guardState.originalPixels.size === 0) {
    guardState.ui.updateStatus('❌ No hay área protegida para reposicionar', 'error');
    log('❌ No hay área capturada para reposicionar');
    return;
  }

  log('📍 Iniciando reposicionamiento del área protegida...');
  
  // Guardar estado original
  repositionState.originalPixels = new Map(guardState.originalPixels);
  repositionState.originalArea = { ...guardState.protectionArea };
  repositionState.isRepositioning = true;
  
  // Mostrar instrucciones
  const statusDiv = document.createElement('div');
  statusDiv.id = 'repositionStatus';
  statusDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #1f2937;
    color: #fff;
    padding: 15px 20px;
    border-radius: 8px;
    border: 2px solid #8b5cf6;
    z-index: 100003;
    font-family: 'Segoe UI', Roboto, sans-serif;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  statusDiv.innerHTML = `
    <div style="text-align: center;">
      <div style="font-weight: bold; margin-bottom: 8px;">📍 Reposicionamiento Activo</div>
      <div style="font-size: 14px; color: #cbd5e0;">Pinta un píxel en la nueva esquina superior izquierda</div>
    </div>
  `;
  document.body.appendChild(statusDiv);
  
  // Interceptar clicks para capturar nueva posición
  await captureNewPosition(statusDiv);
}

// Función para capturar la nueva posición
async function captureNewPosition(statusDiv) {
  return new Promise((resolve) => {
    let positionCaptured = false;
    
    // Interceptar fetch para detectar pintado
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const response = await originalFetch.apply(this, args);
      
      if (!repositionState.isRepositioning || positionCaptured) {
        return response;
      }
      
      // Detectar request de pintado de WPlace
      const url = args[0]?.url || args[0];
      if (url && url.includes('/s0/pixel/') && args[1]?.method === 'POST') {
        try {
          log('🔍 Request interceptado:', url);
          
          // Extraer coordenadas del tile de la URL - mejorar patrón de captura
          const urlMatch = url.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);
          if (urlMatch) {
            const tileX = parseInt(urlMatch[1]);
            const tileY = parseInt(urlMatch[2]);
            
            log(`🔍 Tile extraído de URL: (${tileX}, ${tileY})`);
            
            // Extraer coordenadas del request body
            const requestBody = args[1]?.body;
            log('🔍 Request body:', requestBody);
            
            if (requestBody) {
              const bodyData = JSON.parse(requestBody);
              log('🔍 Body data:', bodyData);
              const coords = bodyData.coords;
              
              if (coords && coords.length > 0) {
                positionCaptured = true;
                log('🔍 Coords array structure:', coords, 'Length:', coords.length);
                
                // Las coordenadas pueden estar en diferentes formatos
                let relativeX, relativeY;
                
                if (coords.length >= 2 && typeof coords[0] === 'number' && typeof coords[1] === 'number') {
                  // Formato: [x, y] como números separados
                  relativeX = coords[0];
                  relativeY = coords[1];
                  log('🔍 Coordenadas como números separados:', relativeX, relativeY);
                } else if (Array.isArray(coords[0])) {
                  // Formato: [[x, y]]
                  relativeX = coords[0][0];
                  relativeY = coords[0][1];
                  log('🔍 Coordenadas como array anidado:', relativeX, relativeY);
                } else if (typeof coords[0] === 'object' && coords[0].x !== undefined) {
                  // Formato: [{x, y}]
                  relativeX = coords[0].x;
                  relativeY = coords[0].y;
                  log('🔍 Coordenadas como objeto:', relativeX, relativeY);
                } else {
                  log('❌ Formato de coordenadas no reconocido:', coords);
                  return response;
                }
                
                // Validar que las coordenadas relativas están en rango válido (0-999)
                if (relativeX < 0 || relativeX >= 1000 || relativeY < 0 || relativeY >= 1000) {
                  log(`⚠️ Coordenadas relativas fuera de rango: (${relativeX}, ${relativeY})`);
                }
                
                // Las coordenadas en el body son relativas al tile, convertir a absolutas
                const newX = tileX * 1000 + relativeX;
                const newY = tileY * 1000 + relativeY;
                
                log(`📍 Nueva posición capturada: (${newX}, ${newY})`);
                log(`📐 Cálculo: Tile(${tileX}, ${tileY}) * 1000 + Relativa(${relativeX}, ${relativeY}) = Global(${newX}, ${newY})`);
                
                // Restaurar fetch original
                window.fetch = originalFetch;
                
                // Calcular offset y reposicionar área
                await repositionArea(newX, newY, statusDiv);
                resolve();
              }
            }
          } else {
            log('❌ No se pudo extraer tile de URL:', url);
          }
        } catch (error) {
          log('❌ Error capturando nueva posición:', error);
        }
      }
      
      return response;
    };
    
    // Timeout de 30 segundos
    setTimeout(() => {
      if (!positionCaptured) {
        window.fetch = originalFetch;
        repositionState.isRepositioning = false;
        statusDiv.remove();
        log('⏰ Timeout en captura de nueva posición');
        resolve();
      }
    }, 30000);
  });
}

// Función para reposicionar el área
async function repositionArea(newX, newY, statusDiv) {
  // Calcular offset basado en la esquina superior izquierda original
  const originalArea = repositionState.originalArea;
  const offsetX = newX - originalArea.x1;
  const offsetY = newY - originalArea.y1;
  
  log(`📐 Calculando offset para trasladar patrón: (${offsetX}, ${offsetY})`);
  log(`📋 Trasladando ${repositionState.originalPixels.size} píxeles con sus colores originales`);
  
  // Crear nueva área con las posiciones actualizadas
  const newArea = {
    x1: originalArea.x1 + offsetX,
    y1: originalArea.y1 + offsetY,
    x2: originalArea.x2 + offsetX,
    y2: originalArea.y2 + offsetY,
    tileX: Math.floor((originalArea.x1 + offsetX) / GUARD_DEFAULTS.TILE_SIZE),
    tileY: Math.floor((originalArea.y1 + offsetY) / GUARD_DEFAULTS.TILE_SIZE)
  };
  
  // CRÍTICO: Trasladar los píxeles originales manteniendo sus colores exactos
  const newPixels = new Map();
  repositionState.originalPixels.forEach((originalColorData, key) => {
    const [x, y] = key.split(',').map(Number);
    const newGlobalX = x + offsetX;
    const newGlobalY = y + offsetY;
    const newKey = `${newGlobalX},${newGlobalY}`;
    
    // Recalcular información de tile y coordenadas locales para las nuevas coordenadas
    const newTileX = Math.floor(newGlobalX / GUARD_DEFAULTS.TILE_SIZE);
    const newTileY = Math.floor(newGlobalY / GUARD_DEFAULTS.TILE_SIZE);
    const newLocalX = ((newGlobalX % GUARD_DEFAULTS.TILE_SIZE) + GUARD_DEFAULTS.TILE_SIZE) % GUARD_DEFAULTS.TILE_SIZE;
    const newLocalY = ((newGlobalY % GUARD_DEFAULTS.TILE_SIZE) + GUARD_DEFAULTS.TILE_SIZE) % GUARD_DEFAULTS.TILE_SIZE;
    
    // Validación de cálculos
    const expectedGlobalX = newTileX * GUARD_DEFAULTS.TILE_SIZE + newLocalX;
    const expectedGlobalY = newTileY * GUARD_DEFAULTS.TILE_SIZE + newLocalY;
    
    if (expectedGlobalX !== newGlobalX || expectedGlobalY !== newGlobalY) {
      log(`⚠️ Error en cálculo de coordenadas: Global(${newGlobalX},${newGlobalY}) vs Esperado(${expectedGlobalX},${expectedGlobalY})`);
    }
    
    // Crear nuevo píxel manteniendo EXACTAMENTE los colores originales
    const newPixelData = {
      r: originalColorData.r,           // Color original RGB
      g: originalColorData.g,
      b: originalColorData.b,
      colorId: originalColorData.colorId, // ID de color original
      globalX: newGlobalX,              // Nuevas coordenadas globales
      globalY: newGlobalY,
      localX: newLocalX,                // Nuevas coordenadas locales
      localY: newLocalY,
      tileX: newTileX,                  // Nuevo tile
      tileY: newTileY
    };
    
    newPixels.set(newKey, newPixelData);
    
    // Log de verificación para algunos píxeles - mostrar más información
    if (newPixels.size <= 5) {
      log(`🎨 Píxel trasladado #${newPixels.size}:`);
      log(`   Original: (${x},${y}) color(${originalColorData.r},${originalColorData.g},${originalColorData.b}) ID:${originalColorData.colorId}`);
      log(`   Nuevo: Global(${newGlobalX},${newGlobalY}) Tile(${newTileX},${newTileY}) Local(${newLocalX},${newLocalY})`);
      log(`   Verificación: ${newTileX}*1000 + ${newLocalX} = ${newTileX * 1000 + newLocalX} (debe ser ${newGlobalX})`);
    }
  });
  
  log(`✅ Patrón de colores trasladado: ${newPixels.size} píxeles con coordenadas actualizadas`);
  
  // Mostrar overlay de confirmación
  await showRepositionOverlay(newArea, newPixels, statusDiv);
}

// Función para mostrar el overlay de reposicionamiento
async function showRepositionOverlay(newArea, newPixels, statusDiv) {
  repositionState.overlayEnabled = true;
  
  // Mostrar overlay visual en el canvas
  guardOverlay.showProtectionArea(newArea);
  log('🎯 Overlay visual activado para vista previa de reposicionamiento');
  
  // Actualizar el status con botones de confirmación
  statusDiv.innerHTML = `
    <div style="text-align: center;">
      <div style="font-weight: bold; margin-bottom: 8px;">📍 Vista Previa de Reposicionamiento</div>
      <div style="font-size: 14px; color: #cbd5e0; margin-bottom: 8px;">Nueva área: (${newArea.x1}, ${newArea.y1}) → (${newArea.x2}, ${newArea.y2})</div>
      <div style="font-size: 14px; color: #cbd5e0; margin-bottom: 15px;">¿Confirmar nueva posición?</div>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button id="confirmReposition" style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
          ✅ Aceptar
        </button>
        <button id="retryReposition" style="padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
          🔄 Repetir
        </button>
        <button id="cancelReposition" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
          ❌ Cancelar
        </button>
      </div>
    </div>
  `;
  
  // Event listeners para los botones
  statusDiv.querySelector('#confirmReposition').addEventListener('click', () => {
    confirmRepositioning(newArea, newPixels, statusDiv);
  });
  
  statusDiv.querySelector('#retryReposition').addEventListener('click', () => {
    retryRepositioning(statusDiv);
  });
  
  statusDiv.querySelector('#cancelReposition').addEventListener('click', () => {
    cancelRepositioning(statusDiv);
  });
}

// Función para confirmar el reposicionamiento
async function confirmRepositioning(newArea, newPixels, statusDiv) {
  // Actualizar el estado permanentemente
  guardState.protectionArea = newArea;
  guardState.originalPixels = newPixels;
  
  // CRÍTICO: Limpiar cambios detectados anteriormente ya que apuntan a coordenadas antiguas
  guardState.changes.clear();
  guardState.totalRepaired = 0; // Reiniciar contador de reparaciones
  
  // Actualizar la UI con las nuevas coordenadas
  guardState.ui.updateCoordinates({
    x1: newArea.x1,
    y1: newArea.y1,
    x2: newArea.x2,
    y2: newArea.y2
  });
  
  // Actualizar estadísticas
  guardState.ui.updateProgress(0, newPixels.size);
  
  // Ocultar overlay visual
  guardOverlay.hideProtectionArea();
  log('🎯 Overlay visual desactivado tras confirmar reposicionamiento');
  
  // Limpiar estado de reposicionamiento
  cleanupRepositioning(statusDiv);
  
  guardState.ui.updateStatus('✅ Área reposicionada correctamente', 'success');
  log('✅ Reposicionamiento confirmado - patrón de colores trasladado a nueva ubicación');
  try { trackEvent('reposition_confirm', { botVariant: 'auto-guard', metadata: { size: newPixels.size, x1: newArea.x1, y1: newArea.y1, x2: newArea.x2, y2: newArea.y2 } }); } catch {}
  log(`📋 Protegiendo ${newPixels.size} píxeles con los colores originales en coordenadas (${newArea.x1},${newArea.y1}) → (${newArea.x2},${newArea.y2})`);
  
  // Forzar una nueva verificación inmediata para detectar cambios en la nueva ubicación
  if (guardState.running) {
    log('🔍 Ejecutando verificación inmediata tras reposicionamiento...');
    setTimeout(async () => {
      await checkForChanges();
    }, 2000); // Pausa para asegurar que se complete la actualización
  }
}

// Función para reintentar el reposicionamiento
function retryRepositioning(statusDiv) {
  // Ocultar overlay visual actual
  guardOverlay.hideProtectionArea();
  log('🎯 Overlay visual desactivado para reintentar reposicionamiento');
  
  // Limpiar overlay
  cleanupRepositioning(statusDiv);
  
  // Reiniciar proceso
  startRepositioning();
  try { trackEvent('reposition_retry', { botVariant: 'auto-guard' }); } catch {}
}

// Función para cancelar el reposicionamiento
function cancelRepositioning(statusDiv) {
  // Ocultar overlay visual
  guardOverlay.hideProtectionArea();
  log('🎯 Overlay visual desactivado tras cancelar reposicionamiento');
  
  // Limpiar todo
  cleanupRepositioning(statusDiv);
  
  guardState.ui.updateStatus('❌ Reposicionamiento cancelado', 'warning');
  log('❌ Reposicionamiento cancelado');
  try { trackEvent('reposition_cancel', { botVariant: 'auto-guard' }); } catch {}
}

// Función para limpiar el estado de reposicionamiento
function cleanupRepositioning(statusDiv) {
  repositionState.isRepositioning = false;
  repositionState.originalPixels = null;
  repositionState.originalArea = null;
  repositionState.overlayEnabled = false;
  
  // Remover elementos UI
  statusDiv.remove();
}
