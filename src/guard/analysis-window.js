// Ventana de análisis para superponer JSON sobre canvas actual
import { log } from '../core/logger.js';
import { guardState } from './config.js';
import { analyzeAreaPixels } from './processor.js';
import { registerWindow, unregisterWindow } from '../core/window-manager.js';
import { getGuardTexts } from '../locales/index.js';

// Variables globales para la ventana
let analysisWindowInstance = null;
let autoRefreshInterval = null;



// Cerrar ventana de análisis
export function closeAnalysisWindow() {
  if (analysisWindowInstance) {
    // Desregistrar ventana del gestor
    unregisterWindow(analysisWindowInstance.analysisWindow);
    
    // Limpiar interval si existe
     if (autoRefreshInterval) {
       window.clearInterval(autoRefreshInterval);
       autoRefreshInterval = null;
     }
    
    // Remover la ventana del DOM
    if (analysisWindowInstance.analysisWindow && analysisWindowInstance.analysisWindow.parentNode) {
      document.body.removeChild(analysisWindowInstance.analysisWindow);
    }
    
    // Limpiar referencia
    analysisWindowInstance = null;
    
    log('🔍 Ventana de análisis cerrada');
  }
}

// Crear ventana de análisis
export function createAnalysisWindow() {
  // Verificar que hay datos para analizar
  if (!guardState.protectionArea || !guardState.originalPixels.size) {
    alert('❌ No hay área protegida o píxeles cargados para analizar');
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
      🔍 <span>Análisis de Diferencias - JSON vs Canvas Actual</span>
    </div>
    <button id="closeAnalysisBtn" style="background: none; border: none; color: #eee; cursor: pointer; font-size: 20px; padding: 5px;">❌</button>
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
    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">📊 Estadísticas</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <div style="margin-bottom: 10px;">
        <span style="color: #10b981;">✅ Píxeles Correctos:</span>
        <span id="correctPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div style="margin-bottom: 10px;">
        <span style="color: #ef4444;">❌ Píxeles Incorrectos:</span>
        <span id="incorrectPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div style="margin-bottom: 10px;">
        <span style="color: #f59e0b;">⚪ Píxeles Faltantes:</span>
        <span id="missingPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div>
        <span style="color: #8b5cf6;">🎯 Precisión:</span>
        <span id="accuracy" style="float: right; font-weight: bold;">-</span>
      </div>
    </div>

    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">🎨 Visualización</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" id="showCorrect" checked style="margin-right: 8px;">
        <span style="color: #10b981;">✅ Mostrar Correctos</span>
      </label>
      <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" id="showIncorrect" checked style="margin-right: 8px;">
        <span style="color: #ef4444;">❌ Mostrar Incorrectos</span>
      </label>
      <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" id="showMissing" checked style="margin-right: 8px;">
        <span style="color: #f59e0b;">⚪ Mostrar Faltantes</span>
      </label>

    </div>

    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">⚙️ Configuración</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px;">
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-size: 14px;">🔍 Zoom:</label>
        <input type="range" id="zoomSlider" min="0.5" max="5" step="0.1" value="1" style="width: 100%;">
        <span id="zoomValue" style="font-size: 12px; color: #cbd5e0;">100%</span>
      </div>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-size: 14px;">🎚️ Opacidad:</label>
        <input type="range" id="opacitySlider" min="0.1" max="1" step="0.1" value="0.8" style="width: 100%;">
        <span id="opacityValue" style="font-size: 12px; color: #cbd5e0;">80%</span>
      </div>
      <div style="margin-bottom: 15px;">
        <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
          <input type="checkbox" id="autoRefresh" style="margin-right: 8px;">
          <span style="color: #60a5fa;">🔄 Auto-refresco</span>
        </label>
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="font-size: 12px; color: #cbd5e0;">Intervalo (s):</label>
          <input type="number" id="refreshInterval" min="1" max="60" value="5" style="width: 60px; padding: 4px; background: #4b5563; color: white; border: 1px solid #6b7280; border-radius: 4px;">
        </div>
      </div>
      <button id="refreshAnalysis" style="width: 100%; padding: 10px; background: #60a5fa; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
        🔄 Actualizar Análisis
      </button>
      <button id="autoFitZoom" style="width: 100%; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 8px;">
        📐 Ajustar Zoom
      </button>
      
      <!-- Coordenadas del área -->
      <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #4b5563;">
        <div style="font-size: 10px; color: #9ca3af; margin-bottom: 5px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span>Superior Izq.:</span>
            <span id="coordsUpperLeft">--</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Inferior Der.:</span>
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
    cursor: crosshair;
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

  // Registrar ventana para manejo de z-index
  registerWindow(analysisWindow);

  // Inicializar el análisis
  initializeAnalysis(canvas, controlPanel);

  // Guardar referencia de la instancia
  analysisWindowInstance = { analysisWindow, canvas, controlPanel };

  // Event listeners
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
    
    // Renderizar visualización
    renderVisualization(canvas, analysis);
    
    // Configurar controles
  setupControls(controlPanel, canvas, analysis);
  
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
      // Píxel correcto
      correct.set(key, { original: originalPixel, current: currentPixel });
    } else {
      // Píxel incorrecto
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
  
  // Obtener estado de los checkboxes
  const analysisWindow = canvas.closest('.analysis-window');
  const panelElement = analysisWindow ? analysisWindow.querySelector('.control-panel') : null;
  
  // Usar valores por defecto si no se puede acceder al panel
  const showCorrect = panelElement ? panelElement.querySelector('#showCorrect')?.checked ?? true : true;
  const showIncorrect = panelElement ? panelElement.querySelector('#showIncorrect')?.checked ?? true : true;
  const showMissing = panelElement ? panelElement.querySelector('#showMissing')?.checked ?? true : true;
  
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
  const opacitySlider = controlPanel.querySelector('#opacitySlider');
  const opacityValue = controlPanel.querySelector('#opacityValue');
  const refreshBtn = controlPanel.querySelector('#refreshAnalysis');
  const autoRefreshCheckbox = controlPanel.querySelector('#autoRefresh');
  const refreshIntervalInput = controlPanel.querySelector('#refreshInterval');
  const autoFitZoomBtn = controlPanel.querySelector('#autoFitZoom');
  const _repositionBtn = controlPanel.querySelector('#repositionArea');
  
  // Control de zoom
  zoomSlider.addEventListener('input', (e) => {
    const zoom = parseFloat(e.target.value);
    zoomValue.textContent = `${Math.round(zoom * 100)}%`;
    canvas.style.transform = `scale(${zoom})`;
    canvas.style.transformOrigin = 'top left';
  });
  
  // Control de opacidad
  opacitySlider.addEventListener('input', (e) => {
    const opacity = parseFloat(e.target.value);
    opacityValue.textContent = `${Math.round(opacity * 100)}%`;
    canvas.style.opacity = opacity;
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
    
    log(`🔍 Zoom ajustado automáticamente a ${Math.round(optimalZoom * 100)}%`);
  });

  // Auto-refresco
   autoRefreshCheckbox.addEventListener('change', () => {
     if (autoRefreshCheckbox.checked) {
       const interval = parseInt(refreshIntervalInput.value) * 1000;
       autoRefreshInterval = window.setInterval(async () => {
         await refreshAnalysisData(canvas, controlPanel);
       }, interval);
       log(`🔄 Auto-refresco activado cada ${refreshIntervalInput.value} segundos`);
     } else {
       if (autoRefreshInterval) {
         window.clearInterval(autoRefreshInterval);
         autoRefreshInterval = null;
       }
       log('🔄 Auto-refresco desactivado');
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
       log(`🔄 Intervalo de auto-refresco actualizado a ${refreshIntervalInput.value} segundos`);
     }
   });
  
  // Botón de actualizar
  refreshBtn.addEventListener('click', async () => {
    await refreshAnalysisData(canvas, controlPanel);
  });
  
  // Checkboxes de visualización - refresco inmediato
  const checkboxes = ['showCorrect', 'showIncorrect', 'showMissing'];
  checkboxes.forEach(id => {
    const checkbox = controlPanel.querySelector(`#${id}`);
    checkbox.addEventListener('change', () => {
      // Preservar el zoom actual durante el refresco
      const currentZoom = parseFloat(zoomSlider.value);
      const currentOpacity = parseFloat(opacitySlider.value);
      
      renderVisualization(canvas, analysis);
      
      // Restaurar el zoom y opacidad después del renderizado
      canvas.style.transform = `scale(${currentZoom})`;
      canvas.style.transformOrigin = 'top left';
      canvas.style.opacity = currentOpacity;
      
      log(`👁️ Visualización actualizada: ${id} = ${checkbox.checked}`);
    });
  });



  // Auto-ajuste inicial del zoom
  setTimeout(() => {
    autoFitZoomBtn.click();
  }, 100);
}



// Funciones auxiliares para LAB (duplicadas desde processor.js para independencia)
function rgbToLab(r, g, b) {
  // Normalizar valores RGB a 0-1
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Aplicar corrección gamma
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convertir a XYZ usando matriz sRGB
  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  const z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

  // Usar iluminante D65
  const xn = 0.95047;
  const yn = 1.00000;
  const zn = 1.08883;

  const fx = (x / xn) > 0.008856 ? Math.pow(x / xn, 1/3) : (7.787 * (x / xn) + 16/116);
  const fy = (y / yn) > 0.008856 ? Math.pow(y / yn, 1/3) : (7.787 * (y / yn) + 16/116);
  const fz = (z / zn) > 0.008856 ? Math.pow(z / zn, 1/3) : (7.787 * (z / zn) + 16/116);

  const l = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const bLab = 200 * (fy - fz);

  return { l, a, b: bLab };
}

function calculateDeltaE(lab1, lab2) {
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;
  
  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
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