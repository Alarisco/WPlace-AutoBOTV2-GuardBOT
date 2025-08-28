import { guardState } from './config.js';
import { log } from '../core/logger.js';
import { registerWindow, unregisterWindow } from '../core/window-manager.js';

export function createConfigWindow() {
  return _createConfigWindow();
}

export default function _createConfigWindow() {
  const existing = document.getElementById('guardConfigWindow');
  if (existing) { existing.style.display = 'flex'; return; }

  const overlay = document.createElement('div');
  overlay.id = 'guardConfigWindow';
  overlay.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;background:transparent;z-index:10002;display:flex;align-items:flex-start;justify-content:flex-start;pointer-events:none;';

  const win = document.createElement('div');
  win.style.cssText = 'background:#1a1a1a;border:2px solid #333;border-radius:12px;width:460px;max-width:90vw;max-height:80vh;color:#eee;font-family:Segoe UI,Roboto,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:auto;position:relative;resize:both;pointer-events:auto;';

  const header = document.createElement('div');
  header.style.cssText = 'background:#2d3748;padding:12px 16px;border-bottom:1px solid #4a5568;display:flex;align-items:center;justify-content:space-between;cursor:move;user-select:none;';
  header.innerHTML = '<h2 style="margin:0;font-size:16px;color:#e2e8f0;">⚙️ Configuración del Guard</h2>';
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'background:none;border:none;color:#cbd5e0;font-size:18px;cursor:pointer;padding:0;width:24px;height:24px;';
  header.appendChild(closeBtn);

  const content = document.createElement('div');
  content.style.cssText = 'padding:16px;overflow:auto;flex:1;';
  content.innerHTML = `
    <div id="configGrid" style="display:grid;grid-template-columns:1fr;gap:16px;transition:grid-template-columns 0.3s ease;">
      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">🛡️ Patrones de Protección</h3>
        <select id="protectionPatternSelect" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
          <option value="random">🎲 Aleatorio</option>
          <option value="lineUp">⬆️ Lineal (Arriba)</option>
          <option value="lineDown">⬇️ Lineal (Abajo)</option>
          <option value="lineLeft">⬅️ Lineal (Izquierda)</option>
          <option value="lineRight">➡️ Lineal (Derecha)</option>
          <option value="center">🎯 Centro</option>
          <option value="borders">🧱 Bordes</option>
          <option value="spiral">🌀 Espiral</option>
          <option value="zigzag">📝 Zigzag (Escritura)</option>
          <option value="diagonal">📐 Diagonal (Lectura)</option>
          <option value="cluster">🔗 Clusters (Agrupado)</option>
          <option value="wave">🌊 Ondas (Natural)</option>
          <option value="corners">📍 Esquinas (Referencia)</option>
          <option value="sweep">🧹 Barrido (Sistemático)</option>
          <option value="priority">⭐ Prioridad (Inteligente)</option>
          <option value="proximity">🤝 Proximidad (Cercano)</option>
          <option value="quadrant">🔲 Cuadrantes (Rotativo)</option>
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
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">🎨 Preferencia de Color</h3>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
          <input type="checkbox" id="preferColorCheckbox" style="width:16px;height:16px;accent-color:#10b981;">
          <span style="color:#e5e7eb;">Priorizar color específico</span>
        </label>
        <div id="colorSelectorContainer" style="display:none;margin-top:8px;">
          <div id="colorSelector" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
          <button id="clearPreferredColors" style="display:none;margin-top:8px;padding:4px 12px;font-size:12px;background:#ef4444;color:white;border:none;border-radius:4px;cursor:pointer;">Clear</button>
        </div>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">🚫 Excluir Color</h3>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
          <input type="checkbox" id="excludeColorCheckbox" style="width:16px;height:16px;accent-color:#ef4444;">
          <span style="color:#e5e7eb;">No reparar colores específicos</span>
        </label>
        <div id="excludeColorSelectorContainer" style="display:none;margin-top:8px;">
          <div id="excludeColorSelector" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
          <button id="clearExcludedColors" style="display:none;margin-top:8px;padding:4px 12px;font-size:12px;background:#ef4444;color:white;border:none;border-radius:4px;cursor:pointer;">Clear</button>
        </div>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">⚡ Gestión de Cargas</h3>
        <label style="display:block;margin-bottom:6px;color:#e5e7eb;">Mínimo de cargas para esperar:</label>
        <input type="number" id="minChargesToWaitInput" min="1" max="10" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
        <label style="display:block;margin:10px 0 6px;color:#e5e7eb;">Píxeles por lote:</label>
        <input type="number" id="pixelsPerBatchInput" min="1" max="20" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
        <label style="display:flex;align-items:center;gap:8px;margin-top:10px;cursor:pointer;">
          <input type="checkbox" id="spendAllPixelsCheckbox" style="width:16px;height:16px;accent-color:#10b981;">
          <span style="color:#e5e7eb;">Gastar todos los píxeles al iniciar</span>
        </label>
      </div>

      <div style="background:#2d3748;padding:12px;border-radius:8px;border:1px solid #4a5568;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#e2e8f0;">⏰ Tiempos de Espera</h3>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:8px;">
          <input type="checkbox" id="randomWaitCheckbox" style="width:16px;height:16px;accent-color:#10b981;">
          <span style="color:#e5e7eb;">Usar tiempos aleatorios entre lotes</span>
        </label>
        <div id="randomWaitContainer" style="display:none;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <label style="display:block;margin-bottom:4px;color:#e5e7eb;">Tiempo mínimo (s):</label>
              <input type="number" id="randomWaitMinInput" min="0.5" max="10" step="0.1" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
            </div>
            <div>
              <label style="display:block;margin-bottom:4px;color:#e5e7eb;">Tiempo máximo (s):</label>
              <input type="number" id="randomWaitMaxInput" min="1" max="30" step="0.1" style="width:100%;padding:8px;background:#374151;border:1px solid #6b7280;color:#e5e7eb;border-radius:6px;">
            </div>
          </div>
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

  makeDraggable(win, header);
  
  // Configurar responsividad
  setupResponsiveLayout(win);
  
  // Registrar overlay para manejo de z-index (no win)
  registerWindow(overlay);
  
  closeBtn.addEventListener('click', () => {
    unregisterWindow(overlay);
    overlay.style.display = 'none';
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
  const patternSelect = overlay.querySelector('#protectionPatternSelect');
  patternSelect.addEventListener('change', () => {
    guardState.protectionPattern = patternSelect.value;
    persistConfiguration();
  });

  const preferColorCheckbox = overlay.querySelector('#preferColorCheckbox');
  const colorSelectorContainer = overlay.querySelector('#colorSelectorContainer');
  const clearPreferredColorsBtn = overlay.querySelector('#clearPreferredColors');
  
  preferColorCheckbox.addEventListener('change', (e)=>{
    colorSelectorContainer.style.display = e.target.checked ? 'block' : 'none';
    guardState.preferColor = !!e.target.checked;
    if(e.target.checked){ loadColorSelector(overlay); }
    persistConfiguration();
  });
  
  clearPreferredColorsBtn.addEventListener('click', () => {
    guardState.preferredColorIds = [];
    guardState.preferredColorId = null;
    loadColorSelector(overlay);
    persistConfiguration();
  });

  const excludeColorCheckbox = overlay.querySelector('#excludeColorCheckbox');
  const excludeColorSelectorContainer = overlay.querySelector('#excludeColorSelectorContainer');
  const clearExcludedColorsBtn = overlay.querySelector('#clearExcludedColors');
  
  excludeColorCheckbox.addEventListener('change', (e)=>{
    excludeColorSelectorContainer.style.display = e.target.checked ? 'block' : 'none';
    guardState.excludeColor = !!e.target.checked;
    if(e.target.checked){ loadExcludeColorSelector(overlay); }
    persistConfiguration();
  });
  
  clearExcludedColorsBtn.addEventListener('click', () => {
    guardState.excludedColorIds = [];
    loadExcludeColorSelector(overlay);
    persistConfiguration();
  });

  const randomWaitCheckbox = overlay.querySelector('#randomWaitCheckbox');
  const randomWaitContainer = overlay.querySelector('#randomWaitContainer');
  randomWaitCheckbox.addEventListener('change', (e)=>{
    randomWaitContainer.style.display = e.target.checked ? 'block' : 'none';
    guardState.randomWaitTime = !!e.target.checked;
    persistConfiguration();
  });

  const minInput = overlay.querySelector('#randomWaitMinInput');
  const maxInput = overlay.querySelector('#randomWaitMaxInput');
  minInput.addEventListener('change', ()=>{ const min = parseFloat(minInput.value); const max = parseFloat(maxInput.value); if(min >= max) maxInput.value = (min + 0.5).toString(); guardState.randomWaitMin = parseFloat(minInput.value); persistConfiguration(); });
  maxInput.addEventListener('change', ()=>{ const min = parseFloat(minInput.value); const max = parseFloat(maxInput.value); if(max <= min) minInput.value = (max - 0.5).toString(); guardState.randomWaitMax = parseFloat(maxInput.value); persistConfiguration(); });

  // Otros controles numéricos y de flags
  const minChargesToWaitInput = overlay.querySelector('#minChargesToWaitInput');
  const pixelsPerBatchInput = overlay.querySelector('#pixelsPerBatchInput');
  const spendAllPixelsCheckbox = overlay.querySelector('#spendAllPixelsCheckbox');
  minChargesToWaitInput.addEventListener('change', ()=>{ guardState.minChargesToWait = parseInt(minChargesToWaitInput.value); persistConfiguration(); });
  pixelsPerBatchInput.addEventListener('change', ()=>{ guardState.pixelsPerBatch = parseInt(pixelsPerBatchInput.value); persistConfiguration(); });
  spendAllPixelsCheckbox.addEventListener('change', ()=>{ guardState.spendAllPixelsOnStart = !!spendAllPixelsCheckbox.checked; persistConfiguration(); });

  const resetBtnEl = overlay.querySelector('#guardResetBtn');
  resetBtnEl.addEventListener('click', ()=> resetConfiguration(overlay));

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
  overlay.querySelector('#protectionPatternSelect').value = guardState.protectionPattern;
  const preferColorCheckbox = overlay.querySelector('#preferColorCheckbox');
  const colorSelectorContainer = overlay.querySelector('#colorSelectorContainer');
  preferColorCheckbox.checked = guardState.preferColor;
  colorSelectorContainer.style.display = guardState.preferColor ? 'block' : 'none';
  if(guardState.preferColor){ loadColorSelector(overlay); }

  const excludeColorCheckbox = overlay.querySelector('#excludeColorCheckbox');
  const excludeColorSelectorContainer = overlay.querySelector('#excludeColorSelectorContainer');
  excludeColorCheckbox.checked = guardState.excludeColor;
  excludeColorSelectorContainer.style.display = guardState.excludeColor ? 'block' : 'none';
  if(guardState.excludeColor){ loadExcludeColorSelector(overlay); }

  // Actualizar visibilidad de botones Clear
  const clearPreferredBtn = overlay.querySelector('#clearPreferredColors');
  const clearExcludedBtn = overlay.querySelector('#clearExcludedColors');
  
  const hasPreferredColors = Array.isArray(guardState.preferredColorIds) && guardState.preferredColorIds.length > 0;
  const hasExcludedColors = Array.isArray(guardState.excludedColorIds) && guardState.excludedColorIds.length > 0;
  
  clearPreferredBtn.style.display = hasPreferredColors ? 'block' : 'none';
  clearExcludedBtn.style.display = hasExcludedColors ? 'block' : 'none';

  overlay.querySelector('#spendAllPixelsCheckbox').checked = guardState.spendAllPixelsOnStart;
  overlay.querySelector('#minChargesToWaitInput').value = guardState.minChargesToWait;
  overlay.querySelector('#pixelsPerBatchInput').value = guardState.pixelsPerBatch;

  const randomWaitCheckbox = overlay.querySelector('#randomWaitCheckbox');
  const randomWaitContainer = overlay.querySelector('#randomWaitContainer');
  const minInput = overlay.querySelector('#randomWaitMinInput');
  const maxInput = overlay.querySelector('#randomWaitMaxInput');
  randomWaitCheckbox.checked = guardState.randomWaitTime;
  randomWaitContainer.style.display = guardState.randomWaitTime ? 'block' : 'none';
  minInput.value = guardState.randomWaitMin;
  maxInput.value = guardState.randomWaitMax;
}

function persistConfiguration(){
  try {
    const toSave = {
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
      randomWaitMax: guardState.randomWaitMax
    };
    localStorage.setItem('wplace-guard-config', JSON.stringify(toSave));
    log('💾 Configuración actualizada');
  } catch (err) {
    log('❌ Error guardando configuración:', err);
  }
}

function resetConfiguration(overlay){
  if(!window.confirm('¿Restablecer configuración por defecto?')) return;
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
  loadConfiguration(overlay);
  persistConfiguration();
  log('🔄 Configuración restablecida');
}
