import { guardState } from './config.js';
import { log } from '../core/logger.js';
import { registerWindow, unregisterWindow } from '../core/window-manager.js';
import { t } from '../locales/index.js';

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

// Función para manejar transiciones suaves de contenedores
function toggleContainerVisibility(containerId, show) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (show) {
    // Mostrar con transición suave
    container.style.maxHeight = '200px';
    container.style.opacity = '1';
  } else {
    // Ocultar con transición suave
    container.style.maxHeight = '0';
    container.style.opacity = '0';
  }
}

export function createConfigWindow() {
  return _createConfigWindow();
}

export default function _createConfigWindow() {
  const existing = document.getElementById('guardConfigWindow');
  if (existing) { 
    existing.style.display = 'flex';
    existing.style.opacity = '1';
    const win = existing.querySelector('div');
    if (win) {
      win.style.opacity = '1';
      win.style.transform = 'scale(1) translateY(0)';
    }
    return; 
  }

  const overlay = document.createElement('div');
  overlay.id = 'guardConfigWindow';
  overlay.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;background:transparent;z-index:10002;display:flex;align-items:flex-start;justify-content:flex-start;pointer-events:none;opacity:0;transition:opacity 0.3s ease;';

  const win = document.createElement('div');
  win.style.cssText = 'background:#1a1a1a;border:2px solid #333;border-radius:12px;width:460px;max-width:90vw;max-height:80vh;color:#eee;font-family:Segoe UI,Roboto,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:auto;position:relative;resize:both;pointer-events:auto;opacity:0;transform:scale(0.95) translateY(-20px);transition:opacity 0.3s ease, transform 0.3s ease;';

  const header = document.createElement('div');
  header.style.cssText = 'background:#2d3748;padding:12px 16px;border-bottom:1px solid #4a5568;display:flex;align-items:center;justify-content:space-between;cursor:move;user-select:none;';
  header.innerHTML = `<h2 style="margin:0;font-size:16px;color:#e2e8f0;">⚙️ ${t('guard.configTitle')}</h2>`;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'background:none;border:none;color:#cbd5e0;font-size:18px;cursor:pointer;padding:0;width:24px;height:24px;';
  header.appendChild(closeBtn);

  const content = document.createElement('div');
  content.style.cssText = 'padding:16px;overflow:auto;flex:1;';
  content.innerHTML = `
    <div id="configGrid" style="display:grid;grid-template-columns:1fr;gap:16px;transition:grid-template-columns 0.3s ease;">
      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;"> Modo de Operación</h3>
        <select id="operationModeSelect" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;font-family:'Segoe UI Emoji',Arial,sans-serif;">
          <option value="protect">🛡️ Proteger - Reparar píxeles cambiados</option>
          <option value="erase">🗑️ Borrar - Convertir píxeles a transparente</option>
        </select>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;"🛡️ Patrones de Protección</h3>
        <select id="protectionPatternSelect" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;font-family:'Segoe UI Emoji',Arial,sans-serif;">
          <option value="random">🎲 Aleatorio</option>
          <option value="lineUp">⬆️ Lineal (Arriba)</option>
          <option value="lineDown">⬇️ Lineal (Abajo)</option>
          <option value="lineLeft">⬅️ Lineal (Izquierda)</option>
          <option value="lineRight">➡️ Lineal (Derecha)</option>
          <option value="center">🎯 Centro</option>
          <option value="borders">🟧 Bordes</option>
          <option value="spiral">🌀 Espiral</option>
          <option value="zigzag">〰️ Zigzag (Escritura)</option>
          <option value="diagonal">📐 Diagonal (Lectura)</option>
          <option value="cluster">🔗 Clusters (Agrupado)</option>
          <option value="wave">🌊 Ondas (Natural)</option>
          <option value="corners">📍 Esquinas (Referencia)</option>
          <option value="sweep">🧹 Barrido (Sistemático)</option>
          <option value="priority">⭐ Prioridad (Inteligente)</option>
          <option value="proximity">🤝 Proximidad (Cercano)</option>
          <option value="quadrant">⬜ Cuadrantes (Rotativo)</option>
          <option value="scattered">💫 Disperso (Espaciado)</option>
          <option value="snake">🐍 Serpiente (Zigzag Filas)</option>
          <option value="diagonalSweep">↗️ Barrido Diagonal</option>
          <option value="spiralClockwise">🔄 Espiral Horaria</option>
          <option value="spiralCounterClockwise">🔃 Espiral Antihoraria</option>
          <option value="biasedRandom">🎲 Aleatorio Sesgado</option>
          <option value="anchorPoints">⚓ Puntos de Anclaje</option>
        </select>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">🎨 ${t('guard.preferSpecificColor')}</h3>
        ${createToggle('preferColorCheckbox', t('guard.preferSpecificColor'), false)}
        <div id="colorSelectorContainer" style="max-height:0;overflow:hidden;margin-top:8px;transition:max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);opacity:0;">
          <div id="colorSelector" style="display:flex;flex-wrap:wrap;gap:8px;padding-top:8px;"></div>
          <button id="clearPreferredColors" style="display:none;margin-top:8px;padding:4px 12px;font-size:12px;background:#ef4444;color:white;border:none;border-radius:4px;cursor:pointer;">Clear</button>
        </div>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">🚫 Excluir Color</h3>
        ${createToggle('excludeColorCheckbox', t('guard.excludeSpecificColors'), false)}
        <div id="excludeColorSelectorContainer" style="max-height:0;overflow:hidden;margin-top:8px;transition:max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);opacity:0;">
          <div id="excludeColorSelector" style="display:flex;flex-wrap:wrap;gap:8px;padding-top:8px;"></div>
          <button id="clearExcludedColors" style="display:none;margin-top:8px;padding:4px 12px;font-size:12px;background:#ef4444;color:white;border:none;border-radius:4px;cursor:pointer;">Clear</button>
        </div>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">⚡ ${t('guard.loadManagement')}</h3>
        <label style="display:block;margin-bottom:6px;color:#e5e7eb;">${t('guard.minLoadsToWait')}:</label>
        <input type="number" id="minChargesToWaitInput" min="1" max="10" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
        <label style="display:block;margin:10px 0 6px;color:#e5e7eb;">${t('guard.pixelsPerBatch')}:</label>
        <input type="number" id="pixelsPerBatchInput" min="1" max="20" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
        <div style="margin-top:10px;">
          ${createToggle('spendAllPixelsCheckbox', t('guard.spendAllPixelsOnStart'), false)}
        </div>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">⏰ ${t('guard.waitTimes')}</h3>
        <div style="margin-bottom:8px;">
          ${createToggle('randomWaitCheckbox', t('guard.useRandomTimes'), false)}
        </div>
        <div id="randomWaitContainer" style="display:none;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <label style="display:block;margin-bottom:4px;color:#e5e7eb;">${t('guard.minTime')}:</label>
              <input type="number" id="randomWaitMinInput" min="0.5" max="10" step="0.1" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
            </div>
            <div>
              <label style="display:block;margin-bottom:4px;color:#e5e7eb;">${t('guard.maxTime')}:</label>
              <input type="number" id="randomWaitMaxInput" min="1" max="30" step="0.1" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
            </div>
          </div>
        </div>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">🫥 Protección de Transparencias</h3>
        <div style="margin-bottom:12px;">
          ${createToggle('protectTransparentPixelsCheckbox', 'Proteger píxeles transparentes', true)}
        </div>
        <div style="margin-bottom:8px;">
          ${createToggle('protectPerimeterCheckbox', 'Proteger perímetro', false)}
        </div>
        <div id="perimeterContainer" style="max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);opacity:0;">
          <label style="display:block;margin-bottom:6px;color:#e5e7eb;font-size:13px;">Ancho del perímetro (píxeles):</label>
          <input type="number" id="perimeterWidthInput" min="1" max="10" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
          <small style="color:#9ca3af;font-size:12px;display:block;margin-top:4px;">
            Crea una zona buffer transparente alrededor del área protegida
          </small>
        </div>
      </div>
    </div>`;

  const footer = document.createElement('div');
  footer.style.cssText = 'background:#2d3748;padding:12px 16px;border-top:1px solid #4a5568;display:flex;justify-content:flex-end;gap:10px;';
  const resetBtn = document.createElement('button');
  resetBtn.id = 'guardResetBtn';
  resetBtn.textContent = '🔄';
  resetBtn.style.cssText = 'padding:8px 16px;border:none;border-radius:6px;background:#6b7280;color:white;font-weight:600;cursor:pointer;';
  footer.appendChild(resetBtn);

  win.appendChild(header);
  win.appendChild(content);
  win.appendChild(footer);
  overlay.appendChild(win);
  document.body.appendChild(overlay);

  // Aplicar transición de apertura suave
  setTimeout(() => {
    overlay.style.opacity = '1';
    win.style.opacity = '1';
    win.style.transform = 'scale(1) translateY(0)';
  }, 10);

  makeDraggable(win, header);
  
  // Configurar responsividad
  setupResponsiveLayout(win);
  
  // Registrar overlay para manejo de z-index (no win)
  registerWindow(overlay);
  
  closeBtn.addEventListener('click', () => {
    // Aplicar transición de cierre suave
    overlay.style.transition = 'opacity 0.3s ease';
    win.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    overlay.style.opacity = '0';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.95) translateY(-20px)';
    
    // Completar el cierre después de la transición
    setTimeout(() => {
      unregisterWindow(overlay);
      overlay.style.display = 'none';
      // Resetear estilos para la próxima apertura
      overlay.style.transition = '';
      win.style.transition = '';
    }, 300);
  });
  // Nota: el overlay no captura eventos (pointer-events:none) para no bloquear el fondo.

  setupEventListeners(overlay);
  loadConfiguration(overlay);
  log('🔧 Ventana de configuración abierta');
}

function makeDraggable(element, handle){
  let dragging = false, sx=0, sy=0, sl=0, st=0;
  handle.addEventListener('mousedown', (e)=>{
    dragging = true; sx = e.clientX; sy = e.clientY;
    const r = element.getBoundingClientRect(); sl = r.left; st = r.top;
    element.style.position = 'fixed'; element.style.left = sl + 'px'; element.style.top = st + 'px';
    const mm = (ev)=>{ if(!dragging) return; element.style.left = (sl + ev.clientX - sx)+'px'; element.style.top = (st + ev.clientY - sy)+'px'; };
    const mu = ()=>{ dragging = false; document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
    document.addEventListener('mousemove', mm); document.addEventListener('mouseup', mu);
  });
}

function setupResponsiveLayout(windowElement) {
  const configGrid = windowElement.querySelector('#configGrid');
  if (!configGrid) return;
  
  let lastWidth = 0;
  
  const updateLayout = () => {
    const windowWidth = windowElement.offsetWidth;
    
    // Solo actualizar si el ancho cambió significativamente
    if (Math.abs(windowWidth - lastWidth) < 10) return;
    lastWidth = windowWidth;
    
    if (windowWidth >= 900) {
      // 3 columnas para ventanas muy anchas
      configGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else if (windowWidth >= 650) {
      // 2 columnas para ventanas medianas
      configGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
      // 1 columna para ventanas estrechas
      configGrid.style.gridTemplateColumns = '1fr';
    }
  };
  
  // Polling ligero para detectar cambios de tamaño
  const checkInterval = window.setInterval(updateLayout, 200);
  
  // También escuchar eventos de resize de la ventana
  const resizeHandler = () => window.setTimeout(updateLayout, 50);
  window.addEventListener('resize', resizeHandler);
  
  // Llamada inicial
  updateLayout();
  
  // Limpiar cuando se cierre la ventana
  const originalRemove = windowElement.remove;
  windowElement.remove = function() {
    window.clearInterval(checkInterval);
    window.removeEventListener('resize', resizeHandler);
    originalRemove.call(this);
  };
}

function setupEventListeners(overlay){
  const operationModeSelect = overlay.querySelector('#operationModeSelect');
  if (operationModeSelect) {
    operationModeSelect.addEventListener('change', () => {
      const newMode = operationModeSelect.value;
      guardState.operationMode = newMode;
      
      // Actualizar el texto del botón start según el modo en la UI principal
      if (guardState.ui && guardState.ui.elements) {
        if (newMode === 'erase') {
          guardState.ui.elements.startBtn.innerHTML = `🗑️ ${t('guard.startErase','Iniciar Borrado')}`;
        } else {
          guardState.ui.elements.startBtn.innerHTML = '▶️ Iniciar Protección';
        }
      }
      
      log(`🔧 Modo de operación cambiado a: ${newMode}`);
      persistConfiguration();
    });
  }

  const patternSelect = overlay.querySelector('#protectionPatternSelect');
  if (patternSelect) {
    patternSelect.addEventListener('change', () => {
      guardState.protectionPattern = patternSelect.value;
      persistConfiguration();
    });
  }

  const preferColorCheckbox = overlay.querySelector('#preferColorCheckbox');
  const clearPreferredColorsBtn = overlay.querySelector('#clearPreferredColors');
  
  if (preferColorCheckbox) {
    preferColorCheckbox.addEventListener('change', (e)=>{
      const checked = e.target.checked;
      updateToggleState('preferColorCheckbox', checked);
      toggleContainerVisibility('colorSelectorContainer', checked);
      guardState.preferColor = !!checked;
      if(checked){ loadColorSelector(overlay); }
      persistConfiguration();
    });
  }
  
  if (clearPreferredColorsBtn) {
    clearPreferredColorsBtn.addEventListener('click', () => {
      guardState.preferredColorIds = [];
      guardState.preferredColorId = null;
      loadColorSelector(overlay);
      persistConfiguration();
    });
  }

  const excludeColorCheckbox = overlay.querySelector('#excludeColorCheckbox');
  const clearExcludedColorsBtn = overlay.querySelector('#clearExcludedColors');

  if (excludeColorCheckbox) {
    excludeColorCheckbox.addEventListener('change', (e)=>{
      const checked = e.target.checked;
      updateToggleState('excludeColorCheckbox', checked);
      toggleContainerVisibility('excludeColorSelectorContainer', checked);
      guardState.excludeColor = !!checked;
      if(checked){ loadExcludeColorSelector(overlay); }
      persistConfiguration();
    });
  }
  
  if (clearExcludedColorsBtn) {
    clearExcludedColorsBtn.addEventListener('click', () => {
      guardState.excludedColorIds = [];
      loadExcludeColorSelector(overlay);
      persistConfiguration();
    });
  }

  const randomWaitCheckbox = overlay.querySelector('#randomWaitCheckbox');
  const randomWaitContainer = overlay.querySelector('#randomWaitContainer');
  if (randomWaitCheckbox) {
    randomWaitCheckbox.addEventListener('change', (e)=>{
      const checked = e.target.checked;
      updateToggleState('randomWaitCheckbox', checked);
      if (randomWaitContainer) {
        randomWaitContainer.style.display = checked ? 'block' : 'none';
      }
      guardState.randomWaitTime = !!checked;
      persistConfiguration();
    });
  }

  const minInput = overlay.querySelector('#randomWaitMinInput');
  const maxInput = overlay.querySelector('#randomWaitMaxInput');
  if (minInput) {
    minInput.addEventListener('change', ()=>{ 
      const min = parseFloat(minInput.value); 
      const max = maxInput ? parseFloat(maxInput.value) : 0; 
      if(min >= max && maxInput) maxInput.value = (min + 0.5).toString(); 
      guardState.randomWaitMin = parseFloat(minInput.value); 
      persistConfiguration(); 
    });
  }
  if (maxInput) {
    maxInput.addEventListener('change', ()=>{ 
      const min = minInput ? parseFloat(minInput.value) : 0; 
      const max = parseFloat(maxInput.value); 
      if(max <= min && minInput) minInput.value = (max - 0.5).toString(); 
      guardState.randomWaitMax = parseFloat(maxInput.value); 
      persistConfiguration(); 
    });
  }

  // Otros controles numéricos y de flags
  const minChargesToWaitInput = overlay.querySelector('#minChargesToWaitInput');
  const pixelsPerBatchInput = overlay.querySelector('#pixelsPerBatchInput');
  const spendAllPixelsCheckbox = overlay.querySelector('#spendAllPixelsCheckbox');
  
  if (minChargesToWaitInput) {
    minChargesToWaitInput.addEventListener('change', ()=>{ 
      guardState.minChargesToWait = parseInt(minChargesToWaitInput.value); 
      persistConfiguration(); 
    });
  }
  
  if (pixelsPerBatchInput) {
    pixelsPerBatchInput.addEventListener('change', ()=>{ 
      guardState.pixelsPerBatch = parseInt(pixelsPerBatchInput.value); 
      persistConfiguration(); 
    });
  }
  
  if (spendAllPixelsCheckbox) {
    spendAllPixelsCheckbox.addEventListener('change', (e)=>{ 
      const checked = e.target.checked;
      updateToggleState('spendAllPixelsCheckbox', checked);
      guardState.spendAllPixelsOnStart = !!checked; 
      persistConfiguration(); 
    });
  }

  // Nuevos controles de transparencia
  const protectTransparentPixelsCheckbox = overlay.querySelector('#protectTransparentPixelsCheckbox');
  const protectPerimeterCheckbox = overlay.querySelector('#protectPerimeterCheckbox');
  const perimeterWidthInput = overlay.querySelector('#perimeterWidthInput');

  if (protectTransparentPixelsCheckbox) {
    protectTransparentPixelsCheckbox.addEventListener('change', (e)=>{ 
      const checked = e.target.checked;
      updateToggleState('protectTransparentPixelsCheckbox', checked);
      guardState.protectTransparentPixels = !!checked; 
      persistConfiguration(); 
    });
  }

  if (protectPerimeterCheckbox) {
    protectPerimeterCheckbox.addEventListener('change', (e)=>{ 
      const checked = e.target.checked;
      updateToggleState('protectPerimeterCheckbox', checked);
      toggleContainerVisibility('perimeterContainer', checked);
      guardState.protectPerimeter = !!checked; 
      persistConfiguration(); 
    });
  }

  if (perimeterWidthInput) {
    perimeterWidthInput.addEventListener('change', ()=>{ 
      const value = parseInt(perimeterWidthInput.value);
      if (value >= 1 && value <= 10) {
        guardState.perimeterWidth = value; 
        persistConfiguration(); 
      }
    });
  }

  const resetBtnEl = overlay.querySelector('#guardResetBtn');
  if (resetBtnEl) {
    resetBtnEl.addEventListener('click', ()=> resetConfiguration(overlay));
  }

  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && overlay.style.display !== 'none'){ overlay.style.display = 'none'; } });
}

function loadColorSelector(overlay){
  const colorSelector = overlay.querySelector('#colorSelector');
  if(!colorSelector || !guardState.availableColors) return;
  // Retrocompatibilidad y estado inicial múltiple
  if (!Array.isArray(guardState.preferredColorIds)) {
    guardState.preferredColorIds = [];
    if (typeof guardState.preferredColorId === 'number') {
      guardState.preferredColorIds = [guardState.preferredColorId];
    }
  }
  log(`🔍 Cargando selector de colores preferidos. Colores preferidos actuales: [${guardState.preferredColorIds.join(', ')}]`);
  colorSelector.innerHTML = '';
  guardState.availableColors.forEach(color => {
    const el = document.createElement('div');
    el.style.cssText = `width:28px;height:28px;border-radius:6px;cursor:pointer;border:2px solid transparent;background-color: rgb(${color.r},${color.g},${color.b});position:relative;`;
    el.title = `Color ${color.id}: RGB(${color.r}, ${color.g}, ${color.b})`;
    el.dataset.colorId = color.id;
    
    // Crear indicador de selección (check verde)
    const checkIcon = document.createElement('div');
    checkIcon.style.cssText = `
      position: absolute;
      top: -2px;
      right: -2px;
      width: 16px;
      height: 16px;
      background: #10b981;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 10px;
      font-weight: bold;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;
    checkIcon.innerHTML = '✓';
    el.appendChild(checkIcon);
    
    el.addEventListener('click', ()=>{
      // toggle múltiple
      const arr = Array.isArray(guardState.preferredColorIds) ? guardState.preferredColorIds : [];
      const idx = arr.indexOf(color.id);
      if (idx >= 0) {
        arr.splice(idx, 1);
        el.style.borderColor = 'transparent';
        checkIcon.style.display = 'none';
      } else {
        arr.push(color.id);
        el.style.borderColor = '#10b981';
        checkIcon.style.display = 'flex';
      }
      guardState.preferredColorIds = arr;
      // Mantener compatibilidad con código legado que usa un único id
      guardState.preferredColorId = arr.length > 0 ? arr[0] : null;
      
      // Actualizar visibilidad del botón Clear
      const clearBtn = overlay.querySelector('#clearPreferredColors');
      clearBtn.style.display = arr.length > 0 ? 'block' : 'none';
      
      log(`🎨 Colores preferidos: [${arr.join(', ')}]`);
      persistConfiguration();
    });
    if(Array.isArray(guardState.preferredColorIds) && guardState.preferredColorIds.includes(color.id)){ 
      el.style.borderColor = '#10b981'; 
      checkIcon.style.display = 'flex';
    }
    colorSelector.appendChild(el);
  });
  
  // Mostrar/ocultar botón Clear según si hay colores seleccionados
  const clearBtn = overlay.querySelector('#clearPreferredColors');
  const hasSelectedColors = Array.isArray(guardState.preferredColorIds) && guardState.preferredColorIds.length > 0;
  clearBtn.style.display = hasSelectedColors ? 'block' : 'none';
}

function loadExcludeColorSelector(overlay){
  const excludeColorSelector = overlay.querySelector('#excludeColorSelector');
  if(!excludeColorSelector || !guardState.availableColors) return;
  // Inicializar array de colores excluidos si no existe
  if (!Array.isArray(guardState.excludedColorIds)) {
    guardState.excludedColorIds = [];
  }
  
  log(`🔍 Cargando selector de colores excluidos. Colores excluidos actuales: [${guardState.excludedColorIds.join(', ')}]`);
  excludeColorSelector.innerHTML = '';
  guardState.availableColors.forEach(color => {
    const el = document.createElement('div');
    el.style.cssText = `width:28px;height:28px;border-radius:6px;cursor:pointer;border:2px solid transparent;background-color: rgb(${color.r},${color.g},${color.b});position:relative;`;
    el.title = `Color ${color.id}: RGB(${color.r}, ${color.g}, ${color.b})`;
    el.dataset.colorId = color.id;
    
    // Crear indicador de selección (X roja para excluir)
    const excludeIcon = document.createElement('div');
    excludeIcon.style.cssText = `
      position: absolute;
      top: -2px;
      right: -2px;
      width: 16px;
      height: 16px;
      background: #ef4444;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 10px;
      font-weight: bold;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;
    excludeIcon.innerHTML = '✕';
    el.appendChild(excludeIcon);
    
    el.addEventListener('click', ()=>{
      // toggle múltiple para colores excluidos
      const arr = Array.isArray(guardState.excludedColorIds) ? guardState.excludedColorIds : [];
      const idx = arr.indexOf(color.id);
      if (idx >= 0) {
        arr.splice(idx, 1);
        el.style.borderColor = 'transparent';
        excludeIcon.style.display = 'none';
      } else {
        arr.push(color.id);
        el.style.borderColor = '#ef4444';
        excludeIcon.style.display = 'flex';
      }
      guardState.excludedColorIds = arr;
      
      // Actualizar visibilidad del botón Clear
      const clearBtn = overlay.querySelector('#clearExcludedColors');
      clearBtn.style.display = arr.length > 0 ? 'block' : 'none';
      
      log(`🚫 Colores excluidos: [${arr.join(', ')}]`);
      persistConfiguration();
    });
    if(Array.isArray(guardState.excludedColorIds) && guardState.excludedColorIds.includes(color.id)){ 
      el.style.borderColor = '#ef4444'; 
      excludeIcon.style.display = 'flex';
    }
    excludeColorSelector.appendChild(el);
  });
  
  // Mostrar/ocultar botón Clear según si hay colores excluidos
  const clearBtn = overlay.querySelector('#clearExcludedColors');
  const hasExcludedColors = Array.isArray(guardState.excludedColorIds) && guardState.excludedColorIds.length > 0;
  clearBtn.style.display = hasExcludedColors ? 'block' : 'none';
}

function loadConfiguration(overlay){
  overlay.querySelector('#operationModeSelect').value = guardState.operationMode || 'protect';
  overlay.querySelector('#protectionPatternSelect').value = guardState.protectionPattern;
  const preferColorCheckbox = overlay.querySelector('#preferColorCheckbox');
  preferColorCheckbox.checked = guardState.preferColor;
  updateToggleState('preferColorCheckbox', guardState.preferColor);
  toggleContainerVisibility('colorSelectorContainer', guardState.preferColor);
  if(guardState.preferColor){ loadColorSelector(overlay); }

  const excludeColorCheckbox = overlay.querySelector('#excludeColorCheckbox');
  excludeColorCheckbox.checked = guardState.excludeColor;
  updateToggleState('excludeColorCheckbox', guardState.excludeColor);
  toggleContainerVisibility('excludeColorSelectorContainer', guardState.excludeColor);
  if(guardState.excludeColor){ loadExcludeColorSelector(overlay); }

  // Actualizar visibilidad de botones Clear
  const clearPreferredBtn = overlay.querySelector('#clearPreferredColors');
  const clearExcludedBtn = overlay.querySelector('#clearExcludedColors');
  
  const hasPreferredColors = Array.isArray(guardState.preferredColorIds) && guardState.preferredColorIds.length > 0;
  const hasExcludedColors = Array.isArray(guardState.excludedColorIds) && guardState.excludedColorIds.length > 0;
  
  clearPreferredBtn.style.display = hasPreferredColors ? 'block' : 'none';
  clearExcludedBtn.style.display = hasExcludedColors ? 'block' : 'none';

  const spendAllPixelsCheckbox = overlay.querySelector('#spendAllPixelsCheckbox');
  spendAllPixelsCheckbox.checked = guardState.spendAllPixelsOnStart;
  updateToggleState('spendAllPixelsCheckbox', guardState.spendAllPixelsOnStart);
  overlay.querySelector('#minChargesToWaitInput').value = guardState.minChargesToWait;
  overlay.querySelector('#pixelsPerBatchInput').value = guardState.pixelsPerBatch;

  const randomWaitCheckbox = overlay.querySelector('#randomWaitCheckbox');
  const randomWaitContainer = overlay.querySelector('#randomWaitContainer');
  const minInput = overlay.querySelector('#randomWaitMinInput');
  const maxInput = overlay.querySelector('#randomWaitMaxInput');
  randomWaitCheckbox.checked = guardState.randomWaitTime;
  updateToggleState('randomWaitCheckbox', guardState.randomWaitTime);
  randomWaitContainer.style.display = guardState.randomWaitTime ? 'block' : 'none';
  minInput.value = guardState.randomWaitMin;
  maxInput.value = guardState.randomWaitMax;

  // Cargar configuración de transparencia
  const protectTransparentPixelsCheckbox = overlay.querySelector('#protectTransparentPixelsCheckbox');
  const protectPerimeterCheckbox = overlay.querySelector('#protectPerimeterCheckbox');
  const perimeterWidthInput = overlay.querySelector('#perimeterWidthInput');

  if (protectTransparentPixelsCheckbox) {
    protectTransparentPixelsCheckbox.checked = guardState.protectTransparentPixels;
    updateToggleState('protectTransparentPixelsCheckbox', guardState.protectTransparentPixels);
  }

  if (protectPerimeterCheckbox) {
    protectPerimeterCheckbox.checked = guardState.protectPerimeter;
    updateToggleState('protectPerimeterCheckbox', guardState.protectPerimeter);
    toggleContainerVisibility('perimeterContainer', guardState.protectPerimeter);
  }

  if (perimeterWidthInput) {
    perimeterWidthInput.value = guardState.perimeterWidth;
  }
}

function persistConfiguration(){
  try {
    const toSave = {
      operationMode: guardState.operationMode,
      protectionPattern: guardState.protectionPattern,
      preferColor: guardState.preferColor,
      preferredColorId: guardState.preferredColorId, // legado
      preferredColorIds: Array.isArray(guardState.preferredColorIds) ? guardState.preferredColorIds : [],
      excludeColor: guardState.excludeColor,
      excludedColorIds: Array.isArray(guardState.excludedColorIds) ? guardState.excludedColorIds : [],
      spendAllPixelsOnStart: guardState.spendAllPixelsOnStart,
      minChargesToWait: guardState.minChargesToWait,
      pixelsPerBatch: guardState.pixelsPerBatch,
      randomWaitTime: guardState.randomWaitTime,
      randomWaitMin: guardState.randomWaitMin,
      randomWaitMax: guardState.randomWaitMax,
      // Nuevas opciones de transparencia
      protectTransparentPixels: guardState.protectTransparentPixels,
      protectPerimeter: guardState.protectPerimeter,
      perimeterWidth: guardState.perimeterWidth
    };
    localStorage.setItem('wplace-guard-config', JSON.stringify(toSave));
    log('💾 Configuración actualizada');
  } catch (err) {
    log('❌ Error guardando configuración:', err);
  }
}

function resetConfiguration(overlay){
  if(!window.confirm('¿Restablecer configuración por defecto?')) return;
  guardState.operationMode = 'protect';
  guardState.protectionPattern = 'random';
  guardState.preferColor = false;
  guardState.preferredColorIds = [];
  guardState.preferredColorId = 5; // legado, sin efecto si preferColor=false
  guardState.excludeColor = false;
  guardState.excludedColorIds = [];
  guardState.spendAllPixelsOnStart = false;
  guardState.minChargesToWait = 20;
  guardState.pixelsPerBatch = 10;
  guardState.randomWaitTime = false;
  guardState.randomWaitMin = 1.0;
  guardState.randomWaitMax = 5.0;
  // Resetear opciones de transparencia
  guardState.protectTransparentPixels = true;
  guardState.protectPerimeter = false;
  guardState.perimeterWidth = 1;
  loadConfiguration(overlay);
  persistConfiguration();
  log('🔄 Configuración restablecida');
}
