import { log } from "../core/logger.js";
import { farmState, FARM_DEFAULTS } from "./config.js";
import { saveFarmCfg, loadFarmCfg, resetFarmCfg } from "../core/storage.js";

export function createFarmUI(config, onStart, onStop, onCalibrate) {
  const shadowHost = document.createElement('div');
  shadowHost.id = 'wplace-farm-ui';
  shadowHost.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;
  
  const shadow = shadowHost.attachShadow({ mode: 'open' });
  
  const style = document.createElement('style');
  style.textContent = `
    .wplace-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: 2px solid #4a5568;
      border-radius: 12px;
      padding: 16px;
      min-width: 320px;
      max-width: 400px;
      color: white;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      font-size: 14px;
      backdrop-filter: blur(10px);
    }
    
    .wplace-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    
    .wplace-title {
      font-weight: bold;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .wplace-minimize {
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .wplace-minimize:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .wplace-content {
      display: block;
    }
    
    .wplace-content.minimized {
      display: none;
    }
    
    .wplace-section {
      margin-bottom: 12px;
    }
    
    .wplace-section-title {
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 13px;
      color: #e2e8f0;
    }
    
    .wplace-row {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      gap: 8px;
    }
    
    .wplace-label {
      flex: 1;
      font-size: 12px;
      color: #cbd5e0;
    }
    
    .wplace-input {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      width: 80px;
    }
    
    .wplace-input:focus {
      outline: none;
      border-color: #90cdf4;
      background: rgba(255,255,255,0.15);
    }
    
    .wplace-select {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      width: 100px;
    }
    
    .wplace-button {
      background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
      border: none;
      border-radius: 6px;
      color: white;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      margin: 2px;
      transition: all 0.2s;
    }
    
    .wplace-button:hover {
      background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
      transform: translateY(-1px);
    }
    
    .wplace-button:active {
      transform: translateY(0);
    }
    
    .wplace-button.start {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    }
    
    .wplace-button.start:hover {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
    }
    
    .wplace-button.stop {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    }
    
    .wplace-button.stop:hover {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
    }
    
    .wplace-button.calibrate {
      background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
    }
    
    .wplace-button.calibrate:hover {
      background: linear-gradient(135deg, #dd6b20 0%, #c05621 100%);
    }
    
    .wplace-status {
      background: rgba(0,0,0,0.3);
      border-radius: 6px;
      padding: 8px;
      margin: 8px 0;
      font-size: 12px;
      min-height: 20px;
      word-wrap: break-word;
    }
    
    .wplace-status.success {
      background: rgba(72, 187, 120, 0.2);
      border-left: 3px solid #48bb78;
    }
    
    .wplace-status.error {
      background: rgba(245, 101, 101, 0.2);
      border-left: 3px solid #f56565;
    }
    
    .wplace-status.status {
      background: rgba(66, 153, 225, 0.2);
      border-left: 3px solid #4299e1;
    }
    
    .wplace-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    
    .wplace-stat {
      background: rgba(0,0,0,0.2);
      border-radius: 4px;
      padding: 6px;
      text-align: center;
    }
    
    .wplace-stat-value {
      font-weight: bold;
      font-size: 14px;
    }
    
    .wplace-stat-label {
      font-size: 10px;
      color: #a0aec0;
    }
    
    .wplace-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 8px;
    }
    
    .wplace-advanced {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    
    .wplace-theme-preview {
      display: flex;
      gap: 2px;
      flex-wrap: wrap;
      margin-top: 4px;
    }
    
    .wplace-color-dot {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      border: 1px solid rgba(255,255,255,0.3);
    }
  `;
  
  shadow.appendChild(style);
  
  const container = document.createElement('div');
  container.className = 'wplace-container';
  
  // Estado interno de la UI
  const uiState = {
    minimized: false,
    showAdvanced: false
  };
  
  container.innerHTML = `
    <div class="wplace-header">
      <div class="wplace-title">
        🤖 WPlace Farm Bot
      </div>
      <button class="wplace-minimize">−</button>
    </div>
    
    <div class="wplace-content">
      <!-- Estado y controles principales -->
      <div class="wplace-section">
        <div class="wplace-status" id="status">💤 Bot detenido</div>
        
        <div class="wplace-stats">
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="painted-count">0</div>
            <div class="wplace-stat-label">Pintados</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="charges-count">0</div>
            <div class="wplace-stat-label">Cargas</div>
          </div>
        </div>
        
        <div class="wplace-buttons">
          <button class="wplace-button start" id="start-btn">▶️ Iniciar</button>
          <button class="wplace-button stop" id="stop-btn" disabled>⏹️ Detener</button>
          <button class="wplace-button calibrate" id="calibrate-btn">🎯 Calibrar</button>
        </div>
      </div>
      
      <!-- Configuración básica -->
      <div class="wplace-section">
        <div class="wplace-section-title">⚙️ Configuración</div>
        
        <div class="wplace-row">
          <span class="wplace-label">Tema:</span>
          <select class="wplace-select" id="theme-select">
            <option value="random">🎲 Aleatorio</option>
            <option value="ukraine">🇺🇦 Ucrania</option>
            <option value="spain">🇪🇸 España</option>
            <option value="catalonia">🏴󠁥󠁳󠁣󠁴󠁿 Cataluña</option>
            <option value="usa">🇺🇸 USA</option>
            <option value="trans">🏳️‍⚧️ Trans</option>
            <option value="rainbow">🌈 Arcoíris</option>
            <option value="custom">🎨 Personalizado</option>
          </select>
        </div>
        
        <div class="wplace-theme-preview" id="theme-preview"></div>
        
        <div class="wplace-row">
          <span class="wplace-label">Delay (ms):</span>
          <input type="number" class="wplace-input" id="delay-input" min="1000" max="300000" step="1000">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">Píxeles/lote:</span>
          <input type="number" class="wplace-input" id="pixels-input" min="1" max="50">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">Cargas mín:</span>
          <input type="number" class="wplace-input" id="min-charges-input" min="0" max="50" step="0.1">
        </div>
      </div>
      
      <!-- Configuración avanzada (colapsable) -->
      <div class="wplace-section">
        <div class="wplace-section-title" style="cursor: pointer;" id="advanced-toggle">
          🔧 Avanzado <span id="advanced-arrow">▶</span>
        </div>
        
        <div class="wplace-advanced" id="advanced-section" style="display: none;">
          <div class="wplace-row">
            <span class="wplace-label">Tile X:</span>
            <input type="number" class="wplace-input" id="tile-x-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">Tile Y:</span>
            <input type="number" class="wplace-input" id="tile-y-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">Paleta personalizada:</span>
          </div>
          <div class="wplace-row">
            <input type="text" class="wplace-input" id="custom-palette-input" 
                   placeholder="ej: #FF0000,#00FF00,#0000FF" style="width: 100%;">
          </div>
          
          <div class="wplace-buttons">
            <button class="wplace-button" id="save-btn">💾 Guardar</button>
            <button class="wplace-button" id="load-btn">📁 Cargar</button>
            <button class="wplace-button" id="reset-btn">🔄 Reset</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  shadow.appendChild(container);
  document.body.appendChild(shadowHost);
  
  // Referencias a elementos
  const elements = {
    minimizeBtn: shadow.getElementById('minimize-btn') || shadow.querySelector('.wplace-minimize'),
    content: shadow.querySelector('.wplace-content'),
    status: shadow.getElementById('status'),
    paintedCount: shadow.getElementById('painted-count'),
    chargesCount: shadow.getElementById('charges-count'),
    startBtn: shadow.getElementById('start-btn'),
    stopBtn: shadow.getElementById('stop-btn'),
    calibrateBtn: shadow.getElementById('calibrate-btn'),
    themeSelect: shadow.getElementById('theme-select'),
    themePreview: shadow.getElementById('theme-preview'),
    delayInput: shadow.getElementById('delay-input'),
    pixelsInput: shadow.getElementById('pixels-input'),
    minChargesInput: shadow.getElementById('min-charges-input'),
    advancedToggle: shadow.getElementById('advanced-toggle'),
    advancedSection: shadow.getElementById('advanced-section'),
    advancedArrow: shadow.getElementById('advanced-arrow'),
    tileXInput: shadow.getElementById('tile-x-input'),
    tileYInput: shadow.getElementById('tile-y-input'),
    customPaletteInput: shadow.getElementById('custom-palette-input'),
    saveBtn: shadow.getElementById('save-btn'),
    loadBtn: shadow.getElementById('load-btn'),
    resetBtn: shadow.getElementById('reset-btn')
  };
  
  // Función para actualizar la vista previa del tema
  function updateThemePreview() {
    const theme = elements.themeSelect.value;
    const preview = elements.themePreview;
    preview.innerHTML = '';
    
    let colors = [];
    
    switch (theme) {
      case 'ukraine':
        colors = ['#0057B7', '#FFD700'];
        break;
      case 'spain':
        colors = ['#AA151B', '#F1BF00', '#AA151B'];
        break;
      case 'catalonia':
        colors = ['#FCDD09', '#DA020E', '#FCDD09', '#DA020E'];
        break;
      case 'usa':
        colors = ['#B22234', '#FFFFFF', '#3C3B6E'];
        break;
      case 'trans':
        colors = ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'];
        break;
      case 'rainbow':
        colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
        break;
      case 'custom':
        const customStr = elements.customPaletteInput.value;
        colors = customStr ? customStr.split(',').map(c => c.trim()) : ['#CCCCCC'];
        break;
      default:
        colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    }
    
    colors.forEach(color => {
      const dot = document.createElement('div');
      dot.className = 'wplace-color-dot';
      dot.style.backgroundColor = color;
      dot.title = color;
      preview.appendChild(dot);
    });
  }
  
  // Función para actualizar los valores de los inputs desde la configuración
  function updateInputsFromConfig() {
    elements.themeSelect.value = config.THEME;
    elements.delayInput.value = config.DELAY_MS;
    elements.pixelsInput.value = config.PIXELS_PER_BATCH;
    elements.minChargesInput.value = config.MIN_CHARGES;
    elements.tileXInput.value = config.TILE_X || '';
    elements.tileYInput.value = config.TILE_Y || '';
    elements.customPaletteInput.value = config.CUSTOM_PALETTE.join(',');
    updateThemePreview();
  }
  
  // Función para actualizar la configuración desde los inputs
  function updateConfigFromInputs() {
    config.THEME = elements.themeSelect.value;
    config.DELAY_MS = parseInt(elements.delayInput.value) || FARM_DEFAULTS.DELAY_MS;
    config.PIXELS_PER_BATCH = parseInt(elements.pixelsInput.value) || FARM_DEFAULTS.PIXELS_PER_BATCH;
    config.MIN_CHARGES = parseFloat(elements.minChargesInput.value) || FARM_DEFAULTS.MIN_CHARGES;
    config.TILE_X = parseInt(elements.tileXInput.value) || config.TILE_X;
    config.TILE_Y = parseInt(elements.tileYInput.value) || config.TILE_Y;
    
    if (config.THEME === 'custom') {
      const customStr = elements.customPaletteInput.value;
      config.CUSTOM_PALETTE = customStr ? customStr.split(',').map(c => c.trim()) : FARM_DEFAULTS.CUSTOM_PALETTE;
    }
  }
  
  // Event listeners
  elements.minimizeBtn?.addEventListener('click', () => {
    uiState.minimized = !uiState.minimized;
    elements.content.classList.toggle('minimized', uiState.minimized);
    elements.minimizeBtn.textContent = uiState.minimized ? '+' : '−';
  });
  
  elements.startBtn?.addEventListener('click', () => {
    updateConfigFromInputs();
    onStart();
    elements.startBtn.disabled = true;
    elements.stopBtn.disabled = false;
  });
  
  elements.stopBtn?.addEventListener('click', () => {
    onStop();
    elements.startBtn.disabled = false;
    elements.stopBtn.disabled = true;
  });
  
  elements.calibrateBtn?.addEventListener('click', () => {
    onCalibrate();
  });
  
  elements.themeSelect?.addEventListener('change', () => {
    updateThemePreview();
    updateConfigFromInputs();
  });
  
  elements.customPaletteInput?.addEventListener('input', () => {
    if (elements.themeSelect.value === 'custom') {
      updateThemePreview();
      updateConfigFromInputs();
    }
  });
  
  elements.advancedToggle?.addEventListener('click', () => {
    uiState.showAdvanced = !uiState.showAdvanced;
    elements.advancedSection.style.display = uiState.showAdvanced ? 'block' : 'none';
    elements.advancedArrow.textContent = uiState.showAdvanced ? '▼' : '▶';
  });
  
  // Listeners para inputs (actualización automática)
  ['delayInput', 'pixelsInput', 'minChargesInput', 'tileXInput', 'tileYInput'].forEach(inputName => {
    elements[inputName]?.addEventListener('change', updateConfigFromInputs);
  });
  
  elements.saveBtn?.addEventListener('click', () => {
    updateConfigFromInputs();
    saveFarmCfg(config);
    setStatus('💾 Configuración guardada', 'success');
  });
  
  elements.loadBtn?.addEventListener('click', () => {
    const loaded = loadFarmCfg(FARM_DEFAULTS);
    Object.assign(config, loaded);
    updateInputsFromConfig();
    setStatus('📁 Configuración cargada', 'success');
  });
  
  elements.resetBtn?.addEventListener('click', () => {
    resetFarmCfg();
    Object.assign(config, FARM_DEFAULTS);
    updateInputsFromConfig();
    setStatus('🔄 Configuración reiniciada', 'success');
  });
  
  // Función para actualizar el estado visual
  function setStatus(message, type = 'status') {
    if (elements.status) {
      elements.status.textContent = message;
      elements.status.className = `wplace-status ${type}`;
      log(`Status: ${message}`);
    }
  }
  
  // Función para actualizar estadísticas
  function updateStats(painted, charges) {
    if (elements.paintedCount) {
      elements.paintedCount.textContent = painted || 0;
    }
    if (elements.chargesCount) {
      elements.chargesCount.textContent = typeof charges === 'number' ? charges.toFixed(1) : '0';
    }
  }
  
  // Función para efecto visual de flash
  function flashEffect() {
    container.style.boxShadow = '0 0 20px #48bb78';
    setTimeout(() => {
      container.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    }, 200);
  }
  
  // Inicializar valores
  updateInputsFromConfig();
  
  // API pública de la UI
  return {
    setStatus,
    updateStats,
    flashEffect,
    destroy: () => {
      document.body.removeChild(shadowHost);
    },
    updateConfig: updateInputsFromConfig,
    getElement: () => shadowHost
  };
}

// Función para auto-calibrar las coordenadas del tile basándose en la posición del viewport
export async function autoCalibrateTile(config) {
  try {
    log('🎯 Iniciando auto-calibración del tile...');
    
    // Buscar elementos que indiquen la posición actual
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = window.location.hash;
    
    // Intentar extraer coordenadas de la URL
    let tileX, tileY;
    
    // Buscar en query params
    if (urlParams.has('x') && urlParams.has('y')) {
      tileX = parseInt(urlParams.get('x'));
      tileY = parseInt(urlParams.get('y'));
    }
    
    // Buscar en hash (formato #x,y o similar)
    if (!tileX && !tileY && hashParams) {
      const hashMatch = hashParams.match(/#(-?\d+),(-?\d+)/);
      if (hashMatch) {
        tileX = parseInt(hashMatch[1]);
        tileY = parseInt(hashMatch[2]);
      }
    }
    
    // Buscar elementos DOM que indiquen posición
    if (!tileX && !tileY) {
      const positionElements = document.querySelectorAll('[data-x], [data-y], .coordinates, .position');
      for (const el of positionElements) {
        const x = el.getAttribute('data-x') || el.getAttribute('x');
        const y = el.getAttribute('data-y') || el.getAttribute('y');
        if (x && y) {
          tileX = parseInt(x);
          tileY = parseInt(y);
          break;
        }
      }
    }
    
    // Buscar en el texto visible de la página
    if (!tileX && !tileY) {
      const textContent = document.body.textContent || '';
      const coordMatch = textContent.match(/(?:tile|pos|position)?\s*[(\[]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);
      if (coordMatch) {
        tileX = parseInt(coordMatch[1]);
        tileY = parseInt(coordMatch[2]);
      }
    }
    
    // Valores por defecto si no se encuentra nada
    if (!Number.isFinite(tileX) || !Number.isFinite(tileY)) {
      tileX = 0;
      tileY = 0;
      log('⚠️ No se pudieron detectar coordenadas automáticamente, usando (0,0)');
    }
    
    // Validar que las coordenadas sean razonables
    if (Math.abs(tileX) > 1000000 || Math.abs(tileY) > 1000000) {
      log('⚠️ Coordenadas detectadas parecen incorrectas, limitando a rango válido');
      tileX = Math.max(-1000000, Math.min(1000000, tileX));
      tileY = Math.max(-1000000, Math.min(1000000, tileY));
    }
    
    // Actualizar configuración
    config.TILE_X = tileX;
    config.TILE_Y = tileY;
    
    log(`✅ Tile calibrado automáticamente: (${tileX}, ${tileY})`);
    
    // Guardar la configuración calibrada
    saveFarmCfg(config);
    
    return { tileX, tileY, success: true };
    
  } catch (error) {
    log('❌ Error en auto-calibración:', error);
    return { tileX: 0, tileY: 0, success: false, error: error.message };
  }
}

export function mountFarmUI() {
  const ui = createOverlay({ title: "Auto-Farm" });
  ui.setStatus("Listo para iniciar");
  
  // TODO: Añadir aquí toda la UI compleja del farm original
  // - Panel de configuración
  // - Controles de start/stop/once
  // - Displays de estado
  // - Configuración de delays, cargas, colores, etc.
  
  return ui;
}
