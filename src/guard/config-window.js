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
    <div style="display:flex;flex-direction:column;gap:16px;">
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

function setupEventListeners(overlay){
  const patternSelect = overlay.querySelector('#protectionPatternSelect');
  patternSelect.addEventListener('change', () => {
    guardState.protectionPattern = patternSelect.value;
    persistConfiguration();
  });

  const preferColorCheckbox = overlay.querySelector('#preferColorCheckbox');
  const colorSelectorContainer = overlay.querySelector('#colorSelectorContainer');
  preferColorCheckbox.addEventListener('change', (e)=>{
    colorSelectorContainer.style.display = e.target.checked ? 'block' : 'none';
    guardState.preferColor = !!e.target.checked;
    if(e.target.checked){ loadColorSelector(overlay); }
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
  log(`🎨 Colores preferidos: [${arr.join(', ')}]`);
  persistConfiguration();
    });
    if(Array.isArray(guardState.preferredColorIds) && guardState.preferredColorIds.includes(color.id)){ 
      el.style.borderColor = '#10b981'; 
      checkIcon.style.display = 'flex';
    }
    colorSelector.appendChild(el);
  });
}

function loadConfiguration(overlay){
  overlay.querySelector('#protectionPatternSelect').value = guardState.protectionPattern;
  const preferColorCheckbox = overlay.querySelector('#preferColorCheckbox');
  const colorSelectorContainer = overlay.querySelector('#colorSelectorContainer');
  preferColorCheckbox.checked = guardState.preferColor;
  colorSelectorContainer.style.display = guardState.preferColor ? 'block' : 'none';
  if(guardState.preferColor){ loadColorSelector(overlay); }

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
