// Ventana de análisis para superponer JSON sobre canvas actual
import { log } from '../core/logger.js';
import { guardState } from './config.js';
import { analyzeAreaPixels, rgbToLab, calculateDeltaE } from './processor.js';
import { registerWindow, unregisterWindow } from '../core/window-manager.js';
import { t } from '../locales/index.js';

// Variables globales para la ventana
let analysisWindowInstance = null;
let autoRefreshInterval = null;
let sessionRecording = false;
let sessionData = [];
let sessionStartTime = null;

// Función para crear toggle CSS personalizado
function createToggle(id, labelText, checked = false) {
  return `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; padding: 8px 0;">
      <span style="color: #eee; font-size: 14px; flex: 1;">${labelText}</span>
      <label class="toggle-switch" style="position: relative; display: inline-block; width: 50px; height: 26px; margin-left: 10px;">
        <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
        <span class="toggle-slider" style="
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${checked ? '#22c55e' : '#ef4444'};
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 13px;
          border: 1px solid ${checked ? '#16a34a' : '#dc2626'};
        "></span>
        <span class="toggle-knob" style="
          position: absolute;
          height: 20px;
          width: 20px;
          left: ${checked ? '27px' : '3px'};
          top: 3px;
          background-color: white;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></span>
      </label>
    </div>
  `;
}

// Función para actualizar el estado visual del toggle
function updateToggleState(toggleId, checked) {
  const toggle = document.getElementById(toggleId);
  if (!toggle) return;
  
  const slider = toggle.parentElement.querySelector('.toggle-slider');
  const knob = toggle.parentElement.querySelector('.toggle-knob');
  
  if (slider && knob) {
    slider.style.backgroundColor = checked ? '#22c55e' : '#ef4444';
    slider.style.borderColor = checked ? '#16a34a' : '#dc2626';
    knob.style.left = checked ? '27px' : '3px';
  }
}



// Cerrar ventana de análisis
export function closeAnalysisWindow() {
  if (analysisWindowInstance) {
    const analysisWindow = analysisWindowInstance.analysisWindow;
    
    // Aplicar transición de cierre suave
    analysisWindow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    analysisWindow.style.opacity = '0';
    analysisWindow.style.transform = 'scale(0.95) translateY(-20px)';
    
    // Completar el cierre después de la transición
    setTimeout(() => {
      // Desregistrar ventana del gestor
      unregisterWindow(analysisWindow);
      
      // Limpiar interval si existe
      if (autoRefreshInterval) {
        window.clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
      }
      
      // Detener grabación de sesión si está activa
      if (sessionRecording) {
        stopSessionRecording();
      }
      
      // Limpiar datos de sesión
      sessionData = [];
      sessionStartTime = null;
      
      // Remover la ventana del DOM
      if (analysisWindow && analysisWindow.parentNode) {
        document.body.removeChild(analysisWindow);
      }
      
      // Limpiar referencia
      analysisWindowInstance = null;
      
      log('🔍 Ventana de análisis cerrada');
    }, 300);
  }
}

// Función para actualizar textos cuando cambia el idioma
export function updateAnalysisTexts() {
  if (analysisWindowInstance) {
    const { analysisWindow, controlPanel } = analysisWindowInstance;
    
    // Actualizar título de la ventana
    const header = analysisWindow.querySelector('div[style*="background: #2d3748"]');
    if (header) {
      const titleSpan = header.querySelector('span');
      if (titleSpan) {
        titleSpan.textContent = t('guard.analysisTitle');
      }
    }
    
    // Actualizar textos del panel de control
    if (controlPanel) {
      // Recrear el contenido del panel con los nuevos textos
      controlPanel.innerHTML = `
        <h3 style="margin: 0 0 15px 0; color: #60a5fa;">📊 ${t('guard.statistics','Estadísticas')}</h3>
        <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <div style="margin-bottom: 10px;">
            <span style="color: #10b981;">✅ ${t('guard.correctPixels')}:</span>
            <span id="correctPixels" style="float: right; font-weight: bold;">-</span>
          </div>
          <div style="margin-bottom: 10px;">
            <span style="color: #ef4444;">❌ ${t('guard.incorrectPixels')}:</span>
            <span id="incorrectPixels" style="float: right; font-weight: bold;">-</span>
          </div>
          <div style="margin-bottom: 10px;">
            <span style="color: #f59e0b;">⚪ ${t('guard.missingPixels')}:</span>
            <span id="missingPixels" style="float: right; font-weight: bold;">-</span>
          </div>
          <div>
            <span style="color: #8b5cf6;">🎯 ${t('guard.precision','Precisión')}:</span>
            <span id="accuracy" style="float: right; font-weight: bold;">-</span>
          </div>
        </div>

        <h3 style="margin: 0 0 15px 0; color: #60a5fa;">🎨 ${t('guard.visualization','Visualización')}</h3>
        <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          ${createToggle('showCorrect', `✅ ${t('guard.showCorrect')}`, false)}
          ${createToggle('showIncorrect', `❌ ${t('guard.showIncorrect')}`, true)}
          ${createToggle('showMissing', `⚪ ${t('guard.showMissing')}`, true)}
        </div>

        <h3 style="margin: 0 0 15px 0; color: #60a5fa;">📹 ${t('guard.recording','Grabación')}</h3>
        <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          ${createToggle('recordSession', `📹 ${t('guard.recordSession','Grabar Sesión')}`, false)}
          <button id="snapshotBtn" style="width: 100%; padding: 10px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 10px;">
            📸 ${t('guard.snapshot','Snapshot')}
          </button>
          <div id="sessionControls" style="margin-top: 10px; opacity: 0; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
            <button id="downloadSession" style="width: 100%; padding: 8px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 12px;">
              💾 ${t('guard.downloadData','Descargar Datos')}
            </button>
          </div>
        </div>

        <h3 style="margin: 0 0 15px 0; color: #60a5fa;">⚙️ ${t('guard.configuration','Configuración')}</h3>
        <div style="background: #374151; padding: 15px; border-radius: 8px;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-size: 14px;">🔍 ${t('guard.zoom','Zoom')}:</label>
            <input type="range" id="zoomSlider" min="0.5" max="5" step="0.1" value="1" style="width: 100%;">
            <span id="zoomValue" style="font-size: 12px; color: #cbd5e0;">100%</span>
          </div>
          <div style="margin-bottom: 15px;">
            ${createToggle('autoRefresh', `🔄 ${t('guard.autoRefresh')}`, true)}
            <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
              <label style="font-size: 12px; color: #cbd5e0;">${t('guard.interval','Intervalo')} (s):</label>
              <input type="number" id="refreshInterval" min="1" max="60" value="5" style="width: 60px; padding: 4px; background: #4b5563; color: white; border: 1px solid #6b7280; border-radius: 4px;">
            </div>
          </div>
          <button id="refreshAnalysis" style="width: 100%; padding: 10px; background: #60a5fa; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            🔄 ${t('guard.updateAnalysis','Actualizar Análisis')}
          </button>
          <button id="autoFitZoom" style="width: 100%; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 8px;">
            📐 ${t('guard.adjustZoom','Ajustar Zoom')}
          </button>
          
          <!-- Coordenadas del área -->
          <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #4b5563;">
            <div style="font-size: 10px; color: #9ca3af; margin-bottom: 5px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                <span>${t('guard.upperLeft','Esquina Superior Izquierda')}:</span>
                <span id="coordsUpperLeft">--</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>${t('guard.lowerRight','Esquina Inferior Derecha')}:</span>
                <span id="coordsLowerRight">--</span>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Reconfigurar los controles después de actualizar el HTML
      if (guardState.lastAnalysis) {
        setupControls(controlPanel, analysisWindowInstance.canvas, guardState.lastAnalysis);
        setupSessionRecording(controlPanel, guardState.lastAnalysis);
        updateStatistics(controlPanel, guardState.lastAnalysis);
        updateCoordinatesDisplay(controlPanel);
      }
    }
  }
}

// Crear ventana de análisis
export function createAnalysisWindow() {
  // Verificar que hay datos para analizar
  if (!guardState.protectionArea || !guardState.originalPixels.size) {
    alert(`❌ ${t('guard.noAreaOrPixels','No hay área protegida o píxeles cargados para analizar')}`);
    return;
  }

  // Si ya existe una ventana, la cerramos
  if (analysisWindowInstance) {
    closeAnalysisWindow();
  }

  // Crear ventana de análisis directamente (sin overlay de fondo)
  const analysisWindow = document.createElement('div');
  analysisWindow.style.cssText = `
    position: fixed;
    left: 50px;
    top: 50px;
    width: 1200px;
    height: 800px;
    background: #1a1a1a;
    border: 2px solid #333;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    z-index: 100002;
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  `;

  // Header de la ventana
  const header = document.createElement('div');
  header.style.cssText = `
    padding: 15px 20px;
    background: #2d3748;
    color: #60a5fa;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    cursor: move;
    user-select: none;
  `;
  header.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      🔍 <span>${t('guard.analysisTitle')}</span>
    </div>
    <div style="display: flex; align-items: center; gap: 5px;">
      <button id="minimizeAnalysisBtn" style="background: none; border: none; color: #eee; cursor: pointer; font-size: 16px; padding: 5px; opacity: 0.7; transition: opacity 0.2s ease;">➖</button>
      <button id="closeAnalysisBtn" style="background: none; border: none; color: #eee; cursor: pointer; font-size: 20px; padding: 5px;">❌</button>
    </div>
  `;

  // Área de contenido principal
  const content = document.createElement('div');
  content.style.cssText = `
    flex: 1;
    display: flex;
    overflow: hidden;
  `;

  // Panel de controles
  const controlPanel = document.createElement('div');
  controlPanel.style.cssText = `
    width: 300px;
    background: #2d3748;
    padding: 20px;
    border-right: 1px solid #333;
    overflow-y: auto;
    color: #eee;
    font-family: 'Segoe UI', Roboto, sans-serif;
  `;

  controlPanel.innerHTML = `
    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">📊 ${t('guard.statistics','Estadísticas')}</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <div style="margin-bottom: 10px;">
        <span style="color: #10b981;">✅ ${t('guard.correctPixels')}:</span>
        <span id="correctPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div style="margin-bottom: 10px;">
        <span style="color: #ef4444;">❌ ${t('guard.incorrectPixels')}:</span>
        <span id="incorrectPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div style="margin-bottom: 10px;">
        <span style="color: #f59e0b;">⚪ ${t('guard.missingPixels')}:</span>
        <span id="missingPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div>
        <span style="color: #8b5cf6;">🎯 ${t('guard.precision','Precisión')}:</span>
        <span id="accuracy" style="float: right; font-weight: bold;">-</span>
      </div>
    </div>

    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">🎨 ${t('guard.visualization','Visualización')}</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      ${createToggle('showCorrect', `✅ ${t('guard.showCorrect')}`, false)}
      ${createToggle('showIncorrect', `❌ ${t('guard.showIncorrect')}`, true)}
      ${createToggle('showMissing', `⚪ ${t('guard.showMissing')}`, true)}
    </div>

    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">📹 ${t('guard.recording','Grabación')}</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      ${createToggle('recordSession', `📹 ${t('guard.recordSession','Grabar Sesión')}`, false)}
      <button id="snapshotBtn" style="width: 100%; padding: 10px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 10px;">
        📸 ${t('guard.snapshot','Snapshot')}
      </button>
      <div id="sessionControls" style="margin-top: 10px; opacity: 0; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
        <button id="downloadSession" style="width: 100%; padding: 8px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 12px;">
          💾 ${t('guard.downloadData','Descargar Datos')}
        </button>
      </div>
    </div>

    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">⚙️ ${t('guard.configuration','Configuración')}</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px;">
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-size: 14px;">🔍 ${t('guard.zoom','Zoom')}:</label>
        <input type="range" id="zoomSlider" min="0.5" max="5" step="0.1" value="1" style="width: 100%;">
        <span id="zoomValue" style="font-size: 12px; color: #cbd5e0;">100%</span>
      </div>
      <div style="margin-bottom: 15px;">
        ${createToggle('autoRefresh', `🔄 ${t('guard.autoRefresh')}`, true)}
        <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
          <label style="font-size: 12px; color: #cbd5e0;">${t('guard.interval','Intervalo')} (s):</label>
          <input type="number" id="refreshInterval" min="1" max="60" value="5" style="width: 60px; padding: 4px; background: #4b5563; color: white; border: 1px solid #6b7280; border-radius: 4px;">
        </div>
      </div>
      <button id="refreshAnalysis" style="width: 100%; padding: 10px; background: #60a5fa; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
        🔄 ${t('guard.updateAnalysis','Actualizar Análisis')}
      </button>
      <button id="autoFitZoom" style="width: 100%; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 8px;">
        📐 ${t('guard.adjustZoom','Ajustar Zoom')}
      </button>
      
      <!-- Coordenadas del área -->
      <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #4b5563;">
        <div style="font-size: 10px; color: #9ca3af; margin-bottom: 5px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span>${t('guard.upperLeft','Esquina Superior Izquierda')}:</span>
            <span id="coordsUpperLeft">--</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>${t('guard.lowerRight','Esquina Inferior Derecha')}:</span>
            <span id="coordsLowerRight">--</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Área del canvas
  const canvasArea = document.createElement('div');
  canvasArea.style.cssText = `
    flex: 1;
    position: relative;
    overflow: auto;
    background: #111;
  `;

  // Canvas para la visualización
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    display: block;
    margin: 0;
    border: 1px solid #333;
    cursor: grab;
  `;

  // Handle de redimensionamiento
  const resizeHandle = document.createElement('div');
  resizeHandle.style.cssText = `
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    background: linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%);
    border-radius: 0 0 12px 0;
    z-index: 1;
  `;

  // Ensamblar la ventana
  content.appendChild(controlPanel);
  content.appendChild(canvasArea);
  canvasArea.appendChild(canvas);
  analysisWindow.appendChild(header);
  analysisWindow.appendChild(content);
  analysisWindow.appendChild(resizeHandle);
  document.body.appendChild(analysisWindow);

  // Aplicar transición de apertura suave
  setTimeout(() => {
    analysisWindow.style.opacity = '1';
    analysisWindow.style.transform = 'scale(1) translateY(0)';
  }, 10);

  // Registrar ventana para manejo de z-index
  registerWindow(analysisWindow);

  // Inicializar el análisis
  initializeAnalysis(canvas, controlPanel);

  // Guardar referencia de la instancia
  analysisWindowInstance = { analysisWindow, canvas, controlPanel };

  // Event listeners
  // Event listener para minimizar ventana
  const minimizeBtn = header.querySelector('#minimizeAnalysisBtn');
  minimizeBtn.addEventListener('click', () => {
    if (content.style.display === 'none') {
      // Restaurar ventana sin transición
      content.style.display = 'flex';
      minimizeBtn.textContent = '➖';
      analysisWindow.style.height = '800px';
    } else {
      // Minimizar ventana sin transición
      content.style.display = 'none';
      analysisWindow.style.height = 'auto';
      
      minimizeBtn.textContent = '🔼';
      analysisWindow.style.height = 'auto';
    }
  });

  // Event listener para cerrar ventana
  header.querySelector('#closeAnalysisBtn').addEventListener('click', closeAnalysisWindow);

  // Comentado: No cerrar al hacer clic fuera de la ventana
  // overlay.addEventListener('click', (e) => {
  //   if (e.target === overlay) {
  //     closeAnalysisWindow();
  //   }
  // });

  // Funcionalidad de arrastre
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };

  header.addEventListener('mousedown', (e) => {
    if (e.target.id !== 'closeAnalysisBtn') {
      isDragging = true;
      const rect = analysisWindow.getBoundingClientRect();
      dragOffset.x = e.clientX - rect.left;
      dragOffset.y = e.clientY - rect.top;
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
    }
  });

  function handleDrag(e) {
    if (isDragging) {
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      analysisWindow.style.position = 'absolute';
      analysisWindow.style.left = `${Math.max(0, Math.min(x, window.innerWidth - analysisWindow.offsetWidth))}px`;
      analysisWindow.style.top = `${Math.max(0, Math.min(y, window.innerHeight - analysisWindow.offsetHeight))}px`;
    }
  }

  function stopDrag() {
     isDragging = false;
     document.removeEventListener('mousemove', handleDrag);
     document.removeEventListener('mouseup', stopDrag);
   }

   // Funcionalidad de redimensionamiento
   let isResizing = false;
   let startX, startY, startWidth, startHeight;

   resizeHandle.addEventListener('mousedown', (e) => {
     isResizing = true;
     startX = e.clientX;
     startY = e.clientY;
     startWidth = parseInt(document.defaultView.getComputedStyle(analysisWindow).width, 10);
     startHeight = parseInt(document.defaultView.getComputedStyle(analysisWindow).height, 10);
     document.addEventListener('mousemove', handleResize);
     document.addEventListener('mouseup', stopResize);
     e.preventDefault();
   });

   function handleResize(e) {
     if (isResizing) {
       const newWidth = Math.max(600, startWidth + e.clientX - startX);
       const newHeight = Math.max(400, startHeight + e.clientY - startY);
       analysisWindow.style.width = newWidth + 'px';
       analysisWindow.style.height = newHeight + 'px';
     }
   }

   function stopResize() {
     isResizing = false;
     document.removeEventListener('mousemove', handleResize);
     document.removeEventListener('mouseup', stopResize);
   }

   return { analysisWindow, canvas, controlPanel };
}

// Función para refrescar solo los datos sin reajustar zoom
async function refreshAnalysisData(canvas, controlPanel) {
  try {
    // Obtener píxeles actuales del canvas
    const currentPixels = await analyzeAreaPixels(guardState.protectionArea);
    
    // Comparar con píxeles originales
    const analysis = comparePixels(guardState.originalPixels, currentPixels || new Map());
    
    // Actualizar estadísticas
    updateStatistics(controlPanel, analysis);
    
    // Registrar datos de sesión si está grabando
    recordSessionData(analysis);
    
    // Renderizar visualización manteniendo zoom actual
    renderVisualization(canvas, analysis);
    
  } catch (error) {
    log('❌ Error en refresco de análisis:', error);
  }
}

// Inicializar el análisis y visualización
async function initializeAnalysis(canvas, controlPanel) {
  try {
    log('🔍 Iniciando análisis de diferencias...');
    
    // Debug: Verificar estado inicial
    log(`📍 Área de protección:`, guardState.protectionArea);
    log(`📊 Píxeles originales en guardState: ${guardState.originalPixels?.size || 0}`);
    log(`🎨 Colores disponibles: ${guardState.availableColors?.length || 0}`);
    
    // Verificar que tenemos colores disponibles para el análisis
    if (!guardState.availableColors || guardState.availableColors.length === 0) {
      log('⚠️ No hay colores disponibles, intentando detectar...');
      const { detectAvailableColors } = await import('./processor.js');
      const detected = detectAvailableColors();
      if (detected.length > 0) {
        guardState.availableColors = detected;
        log(`🎨 Colores detectados: ${detected.length}`);
      } else {
        log('❌ No se pudieron detectar colores para el análisis');
        alert('❌ No se pueden detectar colores. Asegúrate de que la paleta esté abierta.');
        return;
      }
    }
    
    // Obtener píxeles actuales del canvas
    log('🔍 Obteniendo píxeles actuales del canvas...');
    const currentPixels = await analyzeAreaPixels(guardState.protectionArea);
    log(`🖼️ Píxeles actuales obtenidos: ${currentPixels?.size || 0}`);
    
    // Comparar con píxeles originales
    log('🔍 Comparando píxeles...');
    const analysis = comparePixels(guardState.originalPixels, currentPixels || new Map());
    
    // Actualizar estadísticas
  updateStatistics(controlPanel, analysis);
  
  // Registrar datos de sesión si está grabando
  recordSessionData(analysis);
  
  // Renderizar visualización
  renderVisualization(canvas, analysis);
    
    // Configurar controles
  setupControls(controlPanel, canvas, analysis);
  
  // Configurar grabación de sesión
  setupSessionRecording(controlPanel, analysis);
  
  // Actualizar coordenadas
  updateCoordinatesDisplay(controlPanel);
  
  log('✅ Análisis completado');
  } catch (error) {
    log('❌ Error en análisis:', error);
    console.error('Error detallado:', error);
  }
}

// Comparar píxeles originales vs actuales
function comparePixels(originalPixels, currentPixels) {
  const correct = new Map();
  const incorrect = new Map();
  const missing = new Map();
  
  const comparisonMethod = guardState.config?.colorComparisonMethod || 'rgb';
  const threshold = guardState.config?.colorThreshold || 10;
  
  // Importar función de comparación
  const compareColors = (color1, color2) => {
    if (comparisonMethod === 'lab') {
      // Usar comparación LAB (implementada en processor.js)
      const lab1 = rgbToLab(color1.r, color1.g, color1.b);
      const lab2 = rgbToLab(color2.r, color2.g, color2.b);
      const deltaE = calculateDeltaE(lab1, lab2);
      return deltaE <= (threshold / 2);
    } else {
      // Usar comparación RGB
      const rDiff = Math.abs(color1.r - color2.r);
      const gDiff = Math.abs(color1.g - color2.g);
      const bDiff = Math.abs(color1.b - color2.b);
      const maxDiff = Math.max(rDiff, gDiff, bDiff);
      return maxDiff <= threshold;
    }
  };
  
  // Comparar cada píxel original
  for (const [key, originalPixel] of originalPixels) {
    const currentPixel = currentPixels.get(key);
    
    if (!currentPixel) {
      // Píxel faltante
      missing.set(key, originalPixel);
    } else if (compareColors(originalPixel, currentPixel)) {
      // Píxel correcto (colores dentro del umbral)
      correct.set(key, { original: originalPixel, current: currentPixel });
    } else {
      // Píxel incorrecto (colores fuera del umbral)
      incorrect.set(key, { original: originalPixel, current: currentPixel });
    }
  }
  
  return { correct, incorrect, missing, originalPixels, currentPixels };
}

// Actualizar estadísticas en el panel
function updateStatistics(controlPanel, analysis) {
  const total = analysis.originalPixels.size;
  const correctCount = analysis.correct.size;
  const incorrectCount = analysis.incorrect.size;
  const missingCount = analysis.missing.size;
  const accuracy = total > 0 ? ((correctCount / total) * 100).toFixed(1) : 0;
  
  controlPanel.querySelector('#correctPixels').textContent = correctCount;
  controlPanel.querySelector('#incorrectPixels').textContent = incorrectCount;
  controlPanel.querySelector('#missingPixels').textContent = missingCount;
  controlPanel.querySelector('#accuracy').textContent = `${accuracy}%`;
}

// Renderizar visualización en canvas
function renderVisualization(canvas, analysis) {
  const area = guardState.protectionArea;
  const width = area.x2 - area.x1 + 1;
  const height = area.y2 - area.y1 + 1;
  
  log(`🖼️ Renderizando visualización: ${width}x${height} píxeles`);
  log(`📊 Píxeles originales: ${analysis.originalPixels?.size || 0}`);
  log(`✅ Píxeles correctos: ${analysis.correct?.size || 0}`);
  log(`❌ Píxeles incorrectos: ${analysis.incorrect?.size || 0}`);
  log(`⚠️ Píxeles faltantes: ${analysis.missing?.size || 0}`);
  
  // Configurar canvas
  canvas.width = width;
  canvas.height = height;
  
  // Calcular tamaño de visualización basado en el área disponible
  const canvasArea = canvas.parentElement;
  const areaRect = canvasArea.getBoundingClientRect();
  const availableWidth = areaRect.width - 20; // Margen pequeño
  const availableHeight = areaRect.height - 20;
  
  // Calcular escala para ajustar al área disponible
  const scaleX = availableWidth / width;
  const scaleY = availableHeight / height;
  const scale = Math.min(scaleX, scaleY, 3); // Máximo 3x para evitar pixelado excesivo
  
  canvas.style.width = `${width * scale}px`;
  canvas.style.height = `${height * scale}px`;
  
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(width, height);
  
  // Inicializar con fondo blanco para debug
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = 240;     // R
    imageData.data[i + 1] = 240; // G
    imageData.data[i + 2] = 240; // B
    imageData.data[i + 3] = 255; // A
  }
  
  // Obtener estado de los checkboxes desde el panel de control
  const showCorrectElement = document.querySelector('#showCorrect');
  const showIncorrectElement = document.querySelector('#showIncorrect');
  const showMissingElement = document.querySelector('#showMissing');
  
  // Usar valores por defecto si no se puede acceder a los elementos
  const showCorrect = showCorrectElement ? showCorrectElement.checked : true;
  const showIncorrect = showIncorrectElement ? showIncorrectElement.checked : true;
  const showMissing = showMissingElement ? showMissingElement.checked : true;
  
  log(`🎛️ Estados de visualización - Correctos: ${showCorrect}, Incorrectos: ${showIncorrect}, Faltantes: ${showMissing}`);
  
  // Dibujar píxeles originales como fondo
  for (const [key, pixel] of analysis.originalPixels || new Map()) {
    const [x, y] = key.split(',').map(Number);
    const index = ((y - area.y1) * width + (x - area.x1)) * 4;
    if (index >= 0 && index < imageData.data.length - 3) {
      imageData.data[index] = pixel.r;
      imageData.data[index + 1] = pixel.g;
      imageData.data[index + 2] = pixel.b;
      imageData.data[index + 3] = 255;
    }
  }
  
  // Función para dibujar píxel
  const drawPixel = (x, y, r, g, b, a = 255) => {
    const index = ((y - area.y1) * width + (x - area.x1)) * 4;
    if (index >= 0 && index < imageData.data.length - 3) {
      imageData.data[index] = r;
      imageData.data[index + 1] = g;
      imageData.data[index + 2] = b;
      imageData.data[index + 3] = a;
    }
  };
  
  // Dibujar píxeles correctos (verde) si está habilitado
  if (showCorrect) {
    for (const [key, _data] of analysis.correct) {
      const [x, y] = key.split(',').map(Number);
      drawPixel(x, y, 0, 255, 0, 128);
    }
  }
  
  // Dibujar píxeles incorrectos (rojo) si está habilitado
  if (showIncorrect) {
    for (const [key, _data] of analysis.incorrect) {
      const [x, y] = key.split(',').map(Number);
      drawPixel(x, y, 255, 0, 0, 200);
    }
  }
  
  // Dibujar píxeles faltantes (amarillo) si está habilitado
  if (showMissing) {
    for (const [key, _pixel] of analysis.missing) {
      const [x, y] = key.split(',').map(Number);
      drawPixel(x, y, 255, 255, 0, 150);
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Configurar controles interactivos
function setupControls(controlPanel, canvas, analysis) {
  const zoomSlider = controlPanel.querySelector('#zoomSlider');
  const zoomValue = controlPanel.querySelector('#zoomValue');
  const refreshBtn = controlPanel.querySelector('#refreshAnalysis');
  const autoRefreshCheckbox = controlPanel.querySelector('#autoRefresh');
  const refreshIntervalInput = controlPanel.querySelector('#refreshInterval');
  const autoFitZoomBtn = controlPanel.querySelector('#autoFitZoom');
  const _repositionBtn = controlPanel.querySelector('#repositionArea');
  
  // Control de zoom (slider)
  zoomSlider.addEventListener('input', (e) => {
    const zoom = parseFloat(e.target.value);
    zoomValue.textContent = `${Math.round(zoom * 100)}%`;
    canvas.style.transform = `scale(${zoom})`;
    canvas.style.transformOrigin = 'top left';
  });
  
  // Auto-ajuste de zoom
  autoFitZoomBtn.addEventListener('click', () => {
    const canvasArea = canvas.parentElement;
    const areaRect = canvasArea.getBoundingClientRect();
    
    // Obtener dimensiones actuales del canvas (ya escalado)
    const currentCanvasWidth = parseFloat(canvas.style.width) || canvas.width;
    const currentCanvasHeight = parseFloat(canvas.style.height) || canvas.height;
    
    // Calcular zoom óptimo para ajustar al área disponible
    const scaleX = (areaRect.width - 20) / currentCanvasWidth;
    const scaleY = (areaRect.height - 20) / currentCanvasHeight;
    const optimalZoom = Math.min(scaleX, scaleY, 3); // Máximo 3x
    
    zoomSlider.value = optimalZoom;
    zoomValue.textContent = `${Math.round(optimalZoom * 100)}%`;
    canvas.style.transform = `scale(${optimalZoom})`;
    canvas.style.transformOrigin = 'top left';
    
    log(`🔍 ${t('guard.zoomAdjusted')} ${Math.round(optimalZoom * 100)}%`);
  });

  // Auto-refresco
  autoRefreshCheckbox.addEventListener('change', () => {
    updateToggleState('autoRefresh', autoRefreshCheckbox.checked);
    if (autoRefreshCheckbox.checked) {
      const interval = parseInt(refreshIntervalInput.value) * 1000;
      autoRefreshInterval = window.setInterval(async () => {
        await refreshAnalysisData(canvas, controlPanel);
      }, interval);
      log(`🔄 ${t('guard.autoRefreshEnabled')} ${refreshIntervalInput.value} segundos`);
    } else {
      if (autoRefreshInterval) {
        window.clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
      }
      log(`🔄 ${t('guard.autoRefreshDisabled')}`);
    }
  });

  // Cambio de intervalo
  refreshIntervalInput.addEventListener('change', () => {
    if (autoRefreshCheckbox.checked) {
      // Reiniciar el intervalo con el nuevo valor
      if (autoRefreshInterval) {
        window.clearInterval(autoRefreshInterval);
      }
      const interval = parseInt(refreshIntervalInput.value) * 1000;
      autoRefreshInterval = window.setInterval(async () => {
        await refreshAnalysisData(canvas, controlPanel);
      }, interval);
      log(`🔄 ${t('guard.autoRefreshIntervalUpdated')} ${refreshIntervalInput.value} segundos`);
    }
  });
  
  // Botón de actualizar
  refreshBtn.addEventListener('click', async () => {
    await refreshAnalysisData(canvas, controlPanel);
  });
  
  // Botón de snapshot
  const snapshotBtn = controlPanel.querySelector('#snapshotBtn');
  snapshotBtn.addEventListener('click', () => {
    captureSnapshot(canvas, controlPanel);
  });
  
  // Toggles de visualización - refresco inmediato
  const toggles = ['showCorrect', 'showIncorrect', 'showMissing'];
  toggles.forEach(id => {
    const toggle = controlPanel.querySelector(`#${id}`);
    toggle.addEventListener('change', () => {
      updateToggleState(id, toggle.checked);
      
      // Preservar el zoom actual durante el refresco
      const currentZoom = parseFloat(zoomSlider.value);
      
      renderVisualization(canvas, analysis);
      
      // Restaurar el zoom después del renderizado
      canvas.style.transform = `scale(${currentZoom})`;
      canvas.style.transformOrigin = 'top left';
      
      log(`👁️ ${t('guard.visualizationUpdated')}: ${id} = ${toggle.checked}`);
    });
  });

  // Interacciones tipo mapa: zoom con rueda y arrastre para mover
  const canvasArea = canvas.parentElement;
  canvasArea.style.overflow = 'auto';

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  canvasArea.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = 1.1;
    const oldZoom = parseFloat(zoomSlider.value);
    const newZoom = clamp(oldZoom * (e.deltaY < 0 ? factor : 1 / factor), 0.5, 5);

    // Coordenadas del puntero relativas al contenido desplazable
    const rect = canvasArea.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const contentX = canvasArea.scrollLeft + mouseX;
    const contentY = canvasArea.scrollTop + mouseY;

    // Aplicar zoom
    zoomSlider.value = newZoom;
    zoomValue.textContent = `${Math.round(newZoom * 100)}%`;
    canvas.style.transform = `scale(${newZoom})`;
    canvas.style.transformOrigin = 'top left';

    // Ajustar scroll para mantener el punto bajo el cursor
    const scaleRatio = newZoom / oldZoom;
    canvasArea.scrollLeft = contentX * scaleRatio - mouseX;
    canvasArea.scrollTop = contentY * scaleRatio - mouseY;
  }, { passive: false });

  let isPanning = false;
  let startX = 0;
  let startY = 0;
  let scrollLeftStart = 0;
  let scrollTopStart = 0;

  canvasArea.addEventListener('mousedown', (e) => {
    // Botón izquierdo para arrastrar
    if (e.button !== 0) return;
    isPanning = true;
    canvasArea.style.cursor = 'grabbing';
    const rect = canvasArea.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    scrollLeftStart = canvasArea.scrollLeft;
    scrollTopStart = canvasArea.scrollTop;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    const rect = canvasArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - startX;
    const dy = y - startY;
    canvasArea.scrollLeft = scrollLeftStart - dx;
    canvasArea.scrollTop = scrollTopStart - dy;
  });

  window.addEventListener('mouseup', () => {
    if (!isPanning) return;
    isPanning = false;
    canvasArea.style.cursor = 'grab';
  });

  // Auto-ajuste inicial del zoom
  setTimeout(() => {
    autoFitZoomBtn.click();
  }, 100);

  // Activar Auto-refresco por defecto si está marcado
  updateToggleState('autoRefresh', autoRefreshCheckbox.checked);
  if (autoRefreshCheckbox.checked) {
    const interval = parseInt(refreshIntervalInput.value) * 1000;
    autoRefreshInterval = window.setInterval(async () => {
      await refreshAnalysisData(canvas, controlPanel);
    }, interval);
  }
}




// Función para actualizar las coordenadas mostradas
function updateCoordinatesDisplay(controlPanel) {
  const coordsUpperLeft = controlPanel.querySelector('#coordsUpperLeft');
  const coordsLowerRight = controlPanel.querySelector('#coordsLowerRight');
  
  if (guardState.protectionArea) {
    const { x1, y1, x2, y2 } = guardState.protectionArea;
    coordsUpperLeft.textContent = `(${x1}, ${y1})`;
    coordsLowerRight.textContent = `(${x2}, ${y2})`;
  } else {
    coordsUpperLeft.textContent = '--';
    coordsLowerRight.textContent = '--';
  }
}

// Función para configurar la grabación de sesión
function setupSessionRecording(controlPanel, analysis) {
  const recordToggle = controlPanel.querySelector('#recordSession');
  const sessionControls = controlPanel.querySelector('#sessionControls');
  const downloadBtn = controlPanel.querySelector('#downloadSession');
  
  // Event listener para el toggle de grabación
  recordToggle.addEventListener('change', () => {
    // Actualizar estado visual del toggle
    updateToggleState('recordSession', recordToggle.checked);
    
    if (recordToggle.checked) {
      startSessionRecording(analysis);
      // Mostrar controles con animación suave
      sessionControls.style.maxHeight = '50px';
      sessionControls.style.opacity = '1';
    } else {
      stopSessionRecording();
      // Ocultar controles con animación suave
      sessionControls.style.maxHeight = '0';
      sessionControls.style.opacity = '0';
    }
  });
  
  // Event listener para descargar datos
  downloadBtn.addEventListener('click', () => {
    downloadSessionData();
  });
}

// Función para iniciar la grabación de sesión
function startSessionRecording(analysis) {
  sessionRecording = true;
  sessionData = [];
  sessionStartTime = new Date();
  
  // Activar autorefresh automáticamente
  const autoRefreshCheckbox = document.querySelector('#autoRefresh');
  if (autoRefreshCheckbox && !autoRefreshCheckbox.checked) {
    autoRefreshCheckbox.checked = true;
    updateToggleState('autoRefresh', true);
    
    // Disparar el evento change para activar el autorefresh
    autoRefreshCheckbox.dispatchEvent(new Event('change'));
  }
  
  // Registrar estado inicial
  recordSessionData(analysis);
  
  console.log(`📹 ${t('guard.sessionRecordingStarted','Grabación de sesión iniciada con autorefresh activado')}`);
}

// Función para detener la grabación de sesión
function stopSessionRecording() {
  sessionRecording = false;
  
  // Descargar automáticamente los datos al detener la grabación
  if (sessionData.length > 0) {
    downloadSessionData();
  }
  
  console.log(`⏹️ ${t('guard.sessionRecordingStopped','Grabación de sesión detenida')}`);
}

// Función para registrar datos de la sesión
function recordSessionData(analysis) {
  if (!sessionRecording || !analysis) return;
  
  const timestamp = new Date();
  const total = analysis.originalPixels?.size || 0;
  const correctCount = analysis.correct?.size || 0;
  const incorrectCount = analysis.incorrect?.size || 0;
  const missingCount = analysis.missing?.size || 0;
  const accuracy = total > 0 ? ((correctCount / total) * 100) : 0;
  
  const sessionEntry = {
    timestamp: timestamp.toISOString(),
    timeFromStart: timestamp - sessionStartTime,
    correct: correctCount,
    incorrect: incorrectCount,
    missing: missingCount,
    total: total,
    precision: parseFloat(accuracy.toFixed(1))
  };
  
  sessionData.push(sessionEntry);
}

// Función para descargar los datos de la sesión
function downloadSessionData() {
  if (sessionData.length === 0) {
    alert(t('guard.noSessionData','No hay datos de sesión para descargar'));
    return;
  }
  
  const sessionSummary = {
    sessionStart: sessionStartTime?.toISOString(),
    sessionEnd: new Date().toISOString(),
    totalDuration: sessionStartTime ? new Date() - sessionStartTime : 0,
    totalEntries: sessionData.length,
    data: sessionData,
    summary: {
      finalCorrect: sessionData[sessionData.length - 1]?.correct || 0,
      finalIncorrect: sessionData[sessionData.length - 1]?.incorrect || 0,
      finalMissing: sessionData[sessionData.length - 1]?.missing || 0,
      finalPrecision: sessionData[sessionData.length - 1]?.precision || 0
    }
  };
  
  const blob = new Blob([JSON.stringify(sessionSummary, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `session-data-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log(`💾 ${t('guard.sessionDataDownloaded','Datos de sesión descargados')}`);
}

// Función para capturar snapshot del canvas
function captureSnapshot(canvas, controlPanel) {
  try {
    // Obtener la precisión actual
    const accuracyElement = controlPanel.querySelector('#accuracy');
    const accuracy = accuracyElement ? accuracyElement.textContent.replace('%', '') : '0';
    
    // Crear un canvas temporal para capturar la imagen sin transformaciones
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    // Configurar el canvas temporal con las mismas dimensiones
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Copiar el contenido del canvas original
    tempCtx.drawImage(canvas, 0, 0);

    // Convertir a blob y descargar
    tempCanvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);

      // Crear nombre de archivo con timestamp y precisión
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      link.download = `snapshot-${timestamp}-precision-${accuracy}%.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      log(`📸 Snapshot capturado: precisión ${accuracy}%`);
    }, 'image/png');
    
  } catch (error) {
    log('❌ Error al capturar snapshot:', error);
    alert(`❌ ${t('guard.snapshotCaptureError','Error al capturar la imagen')}`);
  }
}