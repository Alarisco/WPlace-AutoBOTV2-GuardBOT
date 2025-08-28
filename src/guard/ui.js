import { hasProgress } from './save-load.js';
import { createConfigWindow } from './config-window.js';
import { registerWindow, unregisterWindow } from '../core/window-manager.js';

export function createGuardUI(texts) {
  // Crear contenedor principal
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;
    min-width: 280px;
    max-width: 500px;
    min-height: 200px;
    max-height: 80vh;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    color: #eee;
    font-family: 'Segoe UI', Roboto, sans-serif;
    z-index: 9999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    resize: both;
    overflow: auto;
    display: flex;
    flex-direction: column;
  `;

  container.innerHTML = `
    <div style="padding: 12px 15px; background: #2d3748; color: #60a5fa; font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: move; flex-shrink: 0;" class="guard-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        🛡️ <span>${texts.title}</span>
      </div>
      <button id="closeBtn" style="background: none; border: none; color: #eee; cursor: pointer; opacity: 0.7; padding: 5px;">❌</button>
    </div>
    
    <div style="padding: 15px; flex: 1; overflow-y: auto;">
      <!-- Estado de inicialización -->
      <div id="initSection">
        <button id="initBtn" style="width: 100%; padding: 10px; background: #60a5fa; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 10px;">
          🤖 ${texts.initBot}
        </button>
      </div>
      
      <!-- Selección de área -->
      <div id="areaSection" style="display: none;">
        <!-- Botones de área - en dos columnas con transición -->
        <div id="areaActionsRow" style="display: flex; gap: 10px; margin-bottom: 15px; overflow: hidden; transition: max-height 0.3s ease, opacity 0.3s ease; max-height: 200px; opacity: 1;">
          <button id="selectAreaBtn" style="flex: 1; padding: 10px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            🎯 ${texts.selectArea}
          </button>
          <button id="loadAreaBtn" style="flex: 1; padding: 10px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            📁 Cargar Archivo
          </button>
        </div>
        
        <!-- Fila 1: Iniciar / Detener -->
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <button id="startBtn" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;" disabled>
            ▶️ ${texts.startProtection}
          </button>
          <button id="stopBtn" style="flex: 1; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;" disabled>
            ⏹️ ${texts.stopProtection}
          </button>
        </div>

        <!-- Fila 2: Reposicionar / Guardar -->
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <button id="repositionBtn" style="flex: 1; padding: 8px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px;" disabled>
            📍 Reposicionar
          </button>
          <button id="saveBtn" style="flex: 1; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px;">
            💾 ${texts.save || 'Guardar'}
          </button>
        </div>

        <!-- Fila 3: Analizar Área / Logs -->
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <button id="analyzeBtn" style="flex: 1; padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; display: flex; align-items: center; justify-content: center;" disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="margin-right: 6px; flex-shrink: 0;" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"></circle>
              <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
            </svg>
            Analizar Área
          </button>
          <button id="logWindowBtn" style="flex: 1; padding: 8px; background: #6b7280; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; display: flex; align-items: center; justify-content: center;">
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="margin-right: 6px; flex-shrink: 0;" fill="none">
              <rect x="4" y="3" width="16" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"></rect>
              <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
              <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
              <line x1="8" y1="15" x2="13" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
            </svg>
            ${texts.logWindow || 'Logs'}
          </button>
        </div>

        <!-- Fila 4: Vigía / Configuración -->
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <button id="watchBtn" style="flex: 1; padding: 8px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px;" disabled>
            👁️ Vigía
          </button>
          <button id="configBtn" style="flex: 1; padding: 8px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px;">
            ⚙️ Configuración
          </button>
        </div>

        <!-- Coordenadas capturadas (solo lectura) - Movido al final -->
        <div style="margin-bottom: 15px;">
          <div style="display: flex; gap: 10px; margin-bottom: 8px;">
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">${texts.upperLeft}:</label>
              <div style="display: flex; gap: 5px;">
                <input id="x1Input" type="number" placeholder="X1" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
                <input id="y1Input" type="number" placeholder="Y1" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
              </div>
            </div>
          </div>
          
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">${texts.lowerRight}:</label>
              <div style="display: flex; gap: 5px;">
                <input id="x2Input" type="number" placeholder="X2" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
                <input id="y2Input" type="number" placeholder="Y2" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Estadísticas -->
      <div id="statsSection" style="background: #2d3748; padding: 10px; border-radius: 6px; margin-top: 10px;">
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>📊 ${texts.protectedPixels}: </span><span id="protectedCount">0</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>🚨 ${texts.detectedChanges}: </span><span id="changesCount">0</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>⚡ ${texts.charges}: </span><span id="chargesCount">0</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>🛠️ ${texts.repairedPixels}: </span><span id="repairedCount">0</span>
        </div>
        <div id="countdownSection" style="font-size: 13px; margin-bottom: 5px; display: none;">
          <span>⏰ Próximo lote en: </span><span id="countdownTimer">--</span>
        </div>
        
        <!-- Estadísticas de Análisis -->
        <hr style="border: none; border-top: 1px solid #4a5568; margin: 10px 0;">
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span style="color: #10b981;">✅ Píxeles Correctos: </span><span id="correctPixelsCount">-</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span style="color: #ef4444;">❌ Píxeles Incorrectos: </span><span id="incorrectPixelsCount">-</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span style="color: #f59e0b;">⚪ Píxeles Faltantes: </span><span id="missingPixelsCount">-</span>
        </div>
        <div style="font-size: 13px;">
          <span style="color: #8b5cf6;">🎯 Precisión: </span><span id="accuracyCount">-</span>
        </div>
      </div>
      
      </div>
      
      <!-- Estado -->
      <div id="statusBar" style="background: #2d3748; padding: 8px; border-radius: 4px; text-align: center; font-size: 13px; margin-top: 10px;">
        ⏳ ${texts.waitingInit}
      </div>
     </div>
     
     <!-- Indicador de redimensionamiento -->
     <div style="
       position: absolute;
       bottom: 0;
       right: 0;
       width: 20px;
       height: 20px;
       background: linear-gradient(-45deg, transparent 30%, #666 30%, #666 40%, transparent 40%, transparent 60%, #666 60%, #666 70%, transparent 70%);
       cursor: nw-resize;
       border-bottom-right-radius: 15px;
     "></div>
   `;

  document.body.appendChild(container);

  // Registrar ventana para manejo de z-index
  registerWindow(container);

  // Input oculto para archivos de área
  const areaFileInput = document.createElement('input');
  areaFileInput.type = 'file';
  areaFileInput.accept = '.json';
  areaFileInput.style.display = 'none';
  document.body.appendChild(areaFileInput);

  // Hacer arrastrable
  makeDraggable(container);

  // Elementos
  const elements = {
    initBtn: container.querySelector('#initBtn'),
    selectAreaBtn: container.querySelector('#selectAreaBtn'),
    loadAreaBtn: container.querySelector('#loadAreaBtn'),
    x1Input: container.querySelector('#x1Input'),
    y1Input: container.querySelector('#y1Input'),
    x2Input: container.querySelector('#x2Input'),
    y2Input: container.querySelector('#y2Input'),
    startBtn: container.querySelector('#startBtn'),
    stopBtn: container.querySelector('#stopBtn'),
    watchBtn: container.querySelector('#watchBtn'),
    logWindowBtn: container.querySelector('#logWindowBtn'),
    configBtn: container.querySelector('#configBtn'),
    repositionBtn: container.querySelector('#repositionBtn'),
    closeBtn: container.querySelector('#closeBtn'),
    initSection: container.querySelector('#initSection'),
    areaSection: container.querySelector('#areaSection'),
    protectedCount: container.querySelector('#protectedCount'),
    changesCount: container.querySelector('#changesCount'),
    chargesCount: container.querySelector('#chargesCount'),
    repairedCount: container.querySelector('#repairedCount'),
    countdownSection: container.querySelector('#countdownSection'),
    countdownTimer: container.querySelector('#countdownTimer'),
    correctPixelsCount: container.querySelector('#correctPixelsCount'),
    incorrectPixelsCount: container.querySelector('#incorrectPixelsCount'),
    missingPixelsCount: container.querySelector('#missingPixelsCount'),
    accuracyCount: container.querySelector('#accuracyCount'),
    statusBar: container.querySelector('#statusBar'),
    areaFileInput: areaFileInput,
    saveBtn: container.querySelector('#saveBtn'),
  analyzeBtn: container.querySelector('#analyzeBtn'),
  areaActionsRow: container.querySelector('#areaActionsRow')
  };

  // API de la UI
  const ui = {
    elements,
    
    updateStatus: (message, type = 'info') => {
      elements.statusBar.textContent = message;
      const colors = {
        info: '#60a5fa',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      };
      elements.statusBar.style.color = colors[type] || colors.info;
    },

    updateProgress: (current, total, isVirtual = false) => {
      elements.changesCount.textContent = current;
      if (isVirtual && total > 0) {
        elements.protectedCount.textContent = `${total} (área vacía)`;
      } else {
        elements.protectedCount.textContent = total;
      }
    },

    updateStats: (stats) => {
      if (stats.charges !== undefined) elements.chargesCount.textContent = stats.charges;
      if (stats.repaired !== undefined) elements.repairedCount.textContent = stats.repaired;
      if (stats.pending !== undefined) elements.changesCount.textContent = stats.pending;
    },

    showCountdown: (show = true) => {
      elements.countdownSection.style.display = show ? 'block' : 'none';
    },

    updateCountdown: (seconds) => {
      if (seconds <= 0) {
        elements.countdownTimer.textContent = '--';
        ui.showCountdown(false);
        return;
      }
      
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const timeStr = minutes > 0 
        ? `${minutes}m ${remainingSeconds}s`
        : `${remainingSeconds}s`;
      
      elements.countdownTimer.textContent = timeStr;
      ui.showCountdown(true);
    },

    updateAnalysisStats: (analysisStats) => {
      if (analysisStats.correct !== undefined) elements.correctPixelsCount.textContent = analysisStats.correct;
      if (analysisStats.incorrect !== undefined) elements.incorrectPixelsCount.textContent = analysisStats.incorrect;
      if (analysisStats.missing !== undefined) elements.missingPixelsCount.textContent = analysisStats.missing;
      if (analysisStats.accuracy !== undefined) elements.accuracyCount.textContent = `${analysisStats.accuracy}%`;
    },

    showAreaSection: () => {
      elements.initSection.style.display = 'none';
      elements.areaSection.style.display = 'block';
    },

    setInitButtonVisible: (visible) => {
      elements.initSection.style.display = visible ? 'block' : 'none';
    },

    setInitialized: (initialized) => {
      elements.initBtn.disabled = initialized;
      if (initialized) {
        elements.initBtn.style.opacity = '0.5';
        elements.initBtn.style.cursor = 'not-allowed';
      }
    },

    enableStartBtn: () => {
      elements.startBtn.disabled = false;
      elements.watchBtn.disabled = false;
      // También habilitar el botón de análisis cuando hay un área seleccionada
      elements.analyzeBtn.disabled = false;
      // Actualizar estado del botón de reposicionamiento
      ui.updateRepositionBtn();
    },

    updateRepositionBtn: () => {
      // El botón de reposicionamiento solo está disponible si hay progreso (área + píxeles)
      elements.repositionBtn.disabled = !hasProgress();
    },

    updateWatchButton: (isWatching) => {
      if (isWatching) {
        elements.watchBtn.innerHTML = '⏹️ Detener Vigía';
        elements.watchBtn.style.background = '#ef4444'; // Rojo para detener
      } else {
        elements.watchBtn.innerHTML = '👁️ Vigía';
        elements.watchBtn.style.background = '#f59e0b'; // Naranja original
      }
    },

    setRunningState: (running) => {
      elements.startBtn.disabled = running;
      elements.stopBtn.disabled = !running; // Stop deshabilitado si no corre
      elements.watchBtn.disabled = false; // Vigía siempre habilitado para toggle
      elements.selectAreaBtn.disabled = running;
      
      if (running) {
        // Deshabilitar reposicionamiento mientras está corriendo
        elements.repositionBtn.disabled = true;
        // Ocultar fila de selección/carga con transición
        if (elements.areaActionsRow) {
          elements.areaActionsRow.style.maxHeight = '0px';
          elements.areaActionsRow.style.opacity = '0';
          setTimeout(() => { elements.areaActionsRow.style.display = 'none'; }, 300);
        }
      } else {
        // Actualizar estado basado en si hay progreso
        ui.updateRepositionBtn();
        // Mantener el botón de análisis habilitado si hay área protegida
        if (elements.x1Input.value && elements.y1Input.value && elements.x2Input.value && elements.y2Input.value) {
          elements.analyzeBtn.disabled = false;
          elements.watchBtn.disabled = false;
        }
        // Mostrar fila de selección/carga con transición
        if (elements.areaActionsRow) {
          elements.areaActionsRow.style.display = 'flex';
          // usar raf para aplicar transición
          window.requestAnimationFrame(() => {
            elements.areaActionsRow.style.maxHeight = '200px';
            elements.areaActionsRow.style.opacity = '1';
          });
        }
      }
    },

    updateCoordinates: (coords) => {
      if (coords.x1 !== undefined) elements.x1Input.value = coords.x1;
      if (coords.y1 !== undefined) elements.y1Input.value = coords.y1;
      if (coords.x2 !== undefined) elements.x2Input.value = coords.x2;
      if (coords.y2 !== undefined) elements.y2Input.value = coords.y2;
      
      // Habilitar botón de análisis y vigía si todas las coordenadas están definidas
      if (elements.x1Input.value && elements.y1Input.value && elements.x2Input.value && elements.y2Input.value) {
        elements.analyzeBtn.disabled = false;
        elements.watchBtn.disabled = false;
      }
      
      // Actualizar estado del botón de reposicionamiento
      ui.updateRepositionBtn();
    },

    destroy: () => {
      // Desregistrar ventana del gestor
      unregisterWindow(container);
      container.remove();
      areaFileInput.remove();
    }
  };

  // Event listener para botón de configuración
  elements.configBtn.addEventListener('click', async () => {
    createConfigWindow();
  });

  // Event listener para botón de análisis
  elements.analyzeBtn.addEventListener('click', async () => {
    const { createAnalysisWindow } = await import('./analysis-window.js');
    createAnalysisWindow();
  });

  // Inicializar estado del botón de reposicionamiento
  ui.updateRepositionBtn();

  return ui;
}

export function showConfirmDialog(message, title, buttons = {}) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.zIndex = '10001';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    
    const modal = document.createElement('div');
    modal.style.background = '#1a1a1a';
    modal.style.border = '2px solid #333';
    modal.style.borderRadius = '15px';
    modal.style.padding = '25px';
    modal.style.color = '#eee';
    modal.style.minWidth = '350px';
    modal.style.maxWidth = '400px';
    modal.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    modal.style.fontFamily = "'Segoe UI', Roboto, sans-serif";
    
    modal.innerHTML = `
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${title}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${message}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${buttons.save ? `<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${buttons.save}</button>` : ''}
        ${buttons.discard ? `<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${buttons.discard}</button>` : ''}
        ${buttons.cancel ? `<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${buttons.cancel}</button>` : ''}
      </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Registrar modal para manejo de z-index
    registerWindow(modal);
    
    // Event listeners
    const saveBtn = modal.querySelector('.save-btn');
    const discardBtn = modal.querySelector('.discard-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    
    const cleanup = () => {
      // Desregistrar modal del gestor
      unregisterWindow(modal);
      document.body.removeChild(overlay);
    };
    
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        cleanup();
        resolve('save');
      });
    }
    
    if (discardBtn) {
      discardBtn.addEventListener('click', () => {
        cleanup();
        resolve('discard');
      });
    }
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        cleanup();
        resolve('cancel');
      });
    }
    
    // Cerrar al hacer click fuera
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup();
        resolve('cancel');
      }
    });
  });
}

function makeDraggable(element) {
  const header = element.querySelector('.guard-header');
  if (!header) return;

  let startX, startY, startLeft, startTop;

  header.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(window.getComputedStyle(element).left, 10);
    startTop = parseInt(window.getComputedStyle(element).top, 10);

    const onMouseMove = (e2) => {
      const deltaX = e2.clientX - startX;
      const deltaY = e2.clientY - startY;
      element.style.left = `${startLeft + deltaX}px`;
      element.style.top = `${startTop + deltaY}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}
