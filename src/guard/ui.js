export function createGuardUI(texts) {
  // Crear contenedor principal
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    color: #eee;
    font-family: 'Segoe UI', Roboto, sans-serif;
    z-index: 9999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  `;

  container.innerHTML = `
    <div style="padding: 12px 15px; background: #2d3748; color: #60a5fa; font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: move;" class="guard-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        🛡️ <span>${texts.title}</span>
      </div>
      <button id="closeBtn" style="background: none; border: none; color: #eee; cursor: pointer; opacity: 0.7; padding: 5px;">❌</button>
    </div>
    
    <div style="padding: 15px;">
      <!-- Estado de inicialización -->
      <div id="initSection">
        <button id="initBtn" style="width: 100%; padding: 10px; background: #60a5fa; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 10px;">
          🤖 ${texts.initBot}
        </button>
      </div>
      
      <!-- Selección de área -->
      <div id="areaSection" style="display: none;">
        <!-- Botones de área - en dos columnas -->
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <button id="selectAreaBtn" style="flex: 1; padding: 10px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            🎯 ${texts.selectArea}
          </button>
          <button id="loadAreaBtn" style="flex: 1; padding: 10px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            📁 Cargar Archivo
          </button>
        </div>
        
        <!-- Coordenadas capturadas (solo lectura) -->
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
        
        <button id="startBtn" style="width: 100%; padding: 10px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 10px;" disabled>
          ▶️ ${texts.startProtection}
        </button>
        
        <button id="stopBtn" style="width: 100%; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;" disabled>
          ⏹️ ${texts.stopProtection}
        </button>
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
        <div style="font-size: 13px;">
          <span>🛠️ ${texts.repairedPixels}: </span><span id="repairedCount">0</span>
        </div>
      </div>
      
      <!-- Controles de configuración -->
      <div id="configSection" style="background: #2d3748; padding: 10px; border-radius: 6px; margin-top: 10px;">
        <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #cbd5e0;">⚙️ Configuración</h4>
        
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">Píxeles por lote:</label>
            <input id="pixelsPerBatchInput" type="number" min="1" max="50" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
          </div>
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">Cargas mínimas:</label>
            <input id="minChargesInput" type="number" min="1" max="100" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
          </div>
        </div>
        
        <!-- Controles de save/load -->
        <div style="display: flex; gap: 10px;">
          <button id="saveBtn" style="width: 100%; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px;">
            💾 Guardar Protección
          </button>
        </div>
      </div>
      
      <!-- Estado -->
      <div id="statusBar" style="background: #2d3748; padding: 8px; border-radius: 4px; text-align: center; font-size: 13px; margin-top: 10px;">
        ⏳ ${texts.waitingInit}
      </div>
    </div>
  `;

  document.body.appendChild(container);

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
    closeBtn: container.querySelector('#closeBtn'),
    initSection: container.querySelector('#initSection'),
    areaSection: container.querySelector('#areaSection'),
    protectedCount: container.querySelector('#protectedCount'),
    changesCount: container.querySelector('#changesCount'),
    chargesCount: container.querySelector('#chargesCount'),
    repairedCount: container.querySelector('#repairedCount'),
    statusBar: container.querySelector('#statusBar'),
    areaFileInput: areaFileInput,
    pixelsPerBatchInput: container.querySelector('#pixelsPerBatchInput'),
    minChargesInput: container.querySelector('#minChargesInput'),
    saveBtn: container.querySelector('#saveBtn')
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

    updateProgress: (current, total) => {
      elements.changesCount.textContent = current;
      elements.protectedCount.textContent = total;
    },

    updateStats: (stats) => {
      if (stats.charges !== undefined) elements.chargesCount.textContent = stats.charges;
      if (stats.repaired !== undefined) elements.repairedCount.textContent = stats.repaired;
      if (stats.pending !== undefined) elements.changesCount.textContent = stats.pending;
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
    },

    setRunningState: (running) => {
      elements.startBtn.disabled = running;
      elements.stopBtn.disabled = !running;
      elements.selectAreaBtn.disabled = running;
    },

    updateCoordinates: (coords) => {
      if (coords.x1 !== undefined) elements.x1Input.value = coords.x1;
      if (coords.y1 !== undefined) elements.y1Input.value = coords.y1;
      if (coords.x2 !== undefined) elements.x2Input.value = coords.x2;
      if (coords.y2 !== undefined) elements.y2Input.value = coords.y2;
    },

    destroy: () => {
      container.remove();
      areaFileInput.remove();
    }
  };

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
    
    // Event listeners
    const saveBtn = modal.querySelector('.save-btn');
    const discardBtn = modal.querySelector('.discard-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    
    const cleanup = () => {
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
    
    // Cerrar con overlay
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup();
        resolve('cancel');
      }
    });
  });
}

function makeDraggable(element) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  const header = element.querySelector('.guard-header');
  header.addEventListener('mousedown', (e) => {
    if (e.target.id === 'closeBtn') return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(window.getComputedStyle(element).left, 10);
    startTop = parseInt(window.getComputedStyle(element).top, 10);
    
    element.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    element.style.left = `${startLeft + deltaX}px`;
    element.style.top = `${startTop + deltaY}px`;
    element.style.right = 'auto';
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      element.style.cursor = 'default';
    }
  });
}
