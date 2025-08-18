import { log } from "../core/logger.js";
import { getSession } from "../core/wplace-api.js";
import { guardState, GUARD_DEFAULTS } from "./config.js";
import { detectAvailableColors, analyzeAreaPixels, checkForChanges } from "./processor.js";
import { createGuardUI } from "./ui.js";
import { saveGuardData, loadGuardData } from "./save-load.js";
import { initializeLanguage, getSection, t, getCurrentLanguage } from "../locales/index.js";
import { isPaletteOpen, findAndClickPaintButton } from "../core/dom.js";
import { sleep } from "../core/timing.js";

// Globals del navegador
const { setInterval, clearInterval } = window;

export async function runGuard() {
  log('🛡️ Iniciando WPlace Auto-Guard');
  
  // Inicializar sistema de idiomas
  initializeLanguage();
  
  // Verificar conflictos con otros bots
  if (!checkExistingBots()) {
    return;
  }
  
  // Marcar como ejecutándose
  window.__wplaceBot = { 
    ...window.__wplaceBot, 
    guardRunning: true 
  };
  
  try {
    // Obtener textos en el idioma actual
    const texts = getSection('guard');
    
    // Crear UI
    guardState.ui = createGuardUI(texts);
    
    // Configurar event listeners
    setupEventListeners();
    
    // Función para auto-inicio del bot
    async function tryAutoInit() {
      log('🤖 Intentando auto-inicio del Guard...');
      
      // Verificar si la paleta ya está abierta
      if (isPaletteOpen()) {
        log('🎨 Paleta de colores ya está abierta');
        return true;
      }
      
      log('🔍 Paleta no encontrada, buscando botón Paint...');
      
      // Intentar hacer clic en el botón Paint
      if (findAndClickPaintButton()) {
        log('👆 Botón Paint encontrado y presionado');
        
        // Esperar un momento para que la paleta se abra
        await sleep(2000);
        
        // Verificar si la paleta se abrió
        if (isPaletteOpen()) {
          log('✅ Paleta abierta exitosamente');
          return true;
        } else {
          log('❌ La paleta no se abrió después de hacer clic');
          return false;
        }
      } else {
        log('❌ Botón Paint no encontrado');
        return false;
      }
    }
    
    // Intentar auto-inicio después de que la UI esté lista
    setTimeout(async () => {
      try {
        guardState.ui.updateStatus(t('guard.autoInitializing'), 'info');
        log('🤖 Intentando auto-inicio...');
        
        const autoInitSuccess = await tryAutoInit();
        
        if (autoInitSuccess) {
          guardState.ui.updateStatus(t('guard.autoInitSuccess'), 'success');
          log('✅ Auto-inicio exitoso');
          
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
          // El botón de inicio manual permanece visible
        }
      } catch (error) {
        log('❌ Error en auto-inicio:', error);
        guardState.ui.updateStatus(t('guard.manualInitRequired'), 'warning');
      }
    }, 1000); // Esperar 1 segundo para que la UI esté completamente cargada
    
    // Cleanup al cerrar
    window.addEventListener('beforeunload', () => {
      stopGuard();
      if (window.__wplaceBot) {
        window.__wplaceBot.guardRunning = false;
      }
    });
    
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
  
  elements.closeBtn.addEventListener('click', () => {
    stopGuard();
    guardState.ui.destroy();
    if (window.__wplaceBot) {
      window.__wplaceBot.guardRunning = false;
    }
  });

  elements.initBtn.addEventListener('click', () => initializeGuard());
  elements.selectAreaBtn.addEventListener('click', selectAreaStepByStep);
  elements.loadAreaBtn.addEventListener('click', () => {
    elements.areaFileInput.click();
  });
  
  elements.areaFileInput.addEventListener('change', async () => {
    if (elements.areaFileInput.files.length > 0) {
      const result = await loadGuardData(elements.areaFileInput.files[0]);
      if (result.success) {
        guardState.ui.updateStatus(`✅ Área cargada: ${result.protectedPixels} píxeles protegidos`, 'success');
        log(`✅ Área de protección cargada desde archivo`);
      } else {
        guardState.ui.updateStatus(`❌ Error cargando archivo: ${result.error}`, 'error');
        log(`❌ Error cargando archivo: ${result.error}`);
      }
    }
  });
  
  elements.startBtn.addEventListener('click', startGuard);
  elements.stopBtn.addEventListener('click', () => {
    // Preguntar al usuario si quiere guardar el área antes de detener
    if (guardState.protectionArea && guardState.originalPixels.size > 0) {
      const shouldSave = window.confirm('¿Deseas guardar el área de protección antes de detener?');
      if (shouldSave) {
        const saveResult = saveGuardData();
        if (saveResult.success) {
          guardState.ui.updateStatus(`✅ Área guardada como ${saveResult.filename}`, 'success');
          log(`✅ Área guardada automáticamente: ${saveResult.filename}`);
        } else {
          guardState.ui.updateStatus(`❌ Error guardando: ${saveResult.error}`, 'error');
          log(`❌ Error guardando área: ${saveResult.error}`);
        }
      }
    }
    stopGuard();
  });
}

async function initializeGuard(isAutoInit = false) {
  try {
    guardState.ui.updateStatus(t('guard.checkingColors'), 'info');
    
    // Detectar colores disponibles
    const colors = detectAvailableColors();
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
                
                // Calcular coordenadas globales
                const globalX = tileX * 3000 + localX;
                const globalY = tileY * 3000 + localY;
                
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
    
    const pixelMap = await analyzeAreaPixels(area);
    
    guardState.protectionArea = area;
    guardState.originalPixels = pixelMap;
    guardState.changes.clear();
    
    guardState.ui.updateProgress(0, pixelMap.size);
    guardState.ui.updateStatus(t('guard.areaCaptured', { count: pixelMap.size }), 'success');
    guardState.ui.enableStartBtn();
    
    log(`✅ Área capturada: ${pixelMap.size} píxeles protegidos`);
    
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
  guardState.ui.setRunningState(true);
  guardState.ui.updateStatus(t('guard.protectionStarted'), 'success');
  
  log('🛡️ Iniciando protección del área');
  
  // Configurar intervalo de verificación
  guardState.checkInterval = setInterval(checkForChanges, GUARD_DEFAULTS.CHECK_INTERVAL);
  
  // Primera verificación inmediata
  await checkForChanges();
}

function stopGuard() {
  guardState.running = false;
  
  if (guardState.checkInterval) {
    clearInterval(guardState.checkInterval);
    guardState.checkInterval = null;
  }
  
  if (guardState.ui) {
    guardState.ui.setRunningState(false);
    guardState.ui.updateStatus(t('guard.protectionStopped'), 'warning');
  }
  
  log('⏹️ Protección detenida');
}
