import { log } from "../core/logger.js";
import { FARM_DEFAULTS } from "./config.js";
import { saveFarmCfg, loadFarmCfg, resetFarmCfg } from "../core/storage.js";
import { dragHeader, clamp } from "../core/utils.js";
import { t } from "../locales/index.js";

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
      position: relative;
    }
    
    .wplace-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      cursor: move;
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
      cursor: pointer;
      user-select: none;
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
    
    .wplace-input.wide {
      width: 100%;
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
      min-width: 60px;
    }
    
    .wplace-button:hover {
      background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
      transform: translateY(-1px);
    }
    
    .wplace-button:active {
      transform: translateY(0);
    }
    
    .wplace-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    
    .wplace-button.start {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    }
    
    .wplace-button.start:hover:not(:disabled) {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
    }
    
    .wplace-button.stop {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    }
    
    .wplace-button.stop:hover:not(:disabled) {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
    }
    
    .wplace-button.calibrate {
      background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
    }
    
    .wplace-button.calibrate:hover {
      background: linear-gradient(135deg, #dd6b20 0%, #c05621 100%);
    }
    
    .wplace-button.small {
      padding: 4px 8px;
      font-size: 11px;
      min-width: 40px;
    }
    
    .wplace-status {
      background: rgba(0,0,0,0.3);
      border-radius: 6px;
      padding: 8px;
      margin: 8px 0;
      font-size: 12px;
      min-height: 20px;
      word-wrap: break-word;
      transition: all 0.3s ease;
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
      grid-template-columns: 1fr 1fr 1fr 1fr;
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
      margin-top: 2px;
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
      min-height: 16px;
    }
    
    .wplace-color-dot {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    .wplace-health {
      font-size: 10px;
      color: #a0aec0;
      margin-top: 4px;
      text-align: center;
    }
    
    .wplace-health.online {
      color: #48bb78;
    }
    
    .wplace-health.offline {
      color: #f56565;
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
        🤖 ${t('farm.title')}
      </div>
      <button class="wplace-minimize">−</button>
    </div>
    
    <div class="wplace-content">
      <!-- Estado y controles principales -->
      <div class="wplace-section">
        <div class="wplace-status" id="status">💤 ${t('farm.stopped')}</div>
        
        <div class="wplace-stats">
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="painted-count">0</div>
            <div class="wplace-stat-label">${t('farm.painted')}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="charges-count">0</div>
            <div class="wplace-stat-label">${t('farm.charges')}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="retry-count">0</div>
            <div class="wplace-stat-label">${t('farm.retries')}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="tile-pos">0,0</div>
            <div class="wplace-stat-label">${t('farm.tile')}</div>
          </div>
        </div>
        
        <div class="wplace-buttons">
          <button class="wplace-button start" id="start-btn">▶️ ${t('farm.start')}</button>
          <button class="wplace-button stop" id="stop-btn" disabled>⏹️ ${t('farm.stop')}</button>
          <button class="wplace-button calibrate" id="calibrate-btn">🎯 ${t('farm.calibrate')}</button>
          <button class="wplace-button small" id="once-btn">🎨 ${t('farm.paintOnce')}</button>
        </div>
        
        <div class="wplace-health" id="health-status">🔍 ${t('farm.checkingStatus')}</div>
      </div>
      
      <!-- Configuración básica -->
      <div class="wplace-section">
        <div class="wplace-section-title">⚙️ ${t('farm.configuration')}</div>
        
        <div class="wplace-row">
          <span class="wplace-label">${t('farm.delay')}:</span>
          <input type="number" class="wplace-input" id="delay-input" min="1000" max="300000" step="1000">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${t('farm.pixelsPerBatch')}:</span>
          <input type="number" class="wplace-input" id="pixels-input" min="1" max="50">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${t('farm.minCharges')}:</span>
          <input type="number" class="wplace-input" id="min-charges-input" min="0" max="50" step="0.1">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${t('farm.colorMode')}:</span>
          <select class="wplace-select" id="color-mode-select">
            <option value="random">${t('farm.random')}</option>
            <option value="fixed">${t('farm.fixed')}</option>
          </select>
        </div>
        
        <div class="wplace-row" id="color-range-row">
          <span class="wplace-label">${t('farm.range')}:</span>
          <input type="number" class="wplace-input" id="color-min-input" min="1" max="32" style="width: 35px;">
          <span style="color: #cbd5e0;">-</span>
          <input type="number" class="wplace-input" id="color-max-input" min="1" max="32" style="width: 35px;">
        </div>
        
        <div class="wplace-row" id="color-fixed-row" style="display: none;">
          <span class="wplace-label">${t('farm.fixedColor')}:</span>
          <input type="number" class="wplace-input" id="color-fixed-input" min="1" max="32">
        </div>
      </div>
      
      <!-- Configuración avanzada (colapsable) -->
      <div class="wplace-section">
        <div class="wplace-section-title" id="advanced-toggle">
          🔧 ${t('farm.advanced')} <span id="advanced-arrow">▶</span>
        </div>
        
        <div class="wplace-advanced" id="advanced-section" style="display: none;">
          <div class="wplace-row">
            <span class="wplace-label">${t('farm.tileX')}:</span>
            <input type="number" class="wplace-input" id="tile-x-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">${t('farm.tileY')}:</span>
            <input type="number" class="wplace-input" id="tile-y-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">${t('farm.customPalette')}:</span>
          </div>
          <div class="wplace-row">
            <input type="text" class="wplace-input wide" id="custom-palette-input" 
                   placeholder="${t('farm.paletteExample')}">
          </div>
          
          <div class="wplace-buttons">
            <button class="wplace-button small" id="save-btn">💾 ${t('common.save')}</button>
            <button class="wplace-button small" id="load-btn">📁 ${t('common.load')}</button>
            <button class="wplace-button small" id="reset-btn">🔄 ${t('common.reset')}</button>
            <button class="wplace-button small" id="capture-btn">📸 ${t('farm.capture')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  shadow.appendChild(container);
  document.body.appendChild(shadowHost);
  
  // Hacer el panel arrastrable
  const header = shadow.querySelector('.wplace-header');
  dragHeader(header, shadowHost);
  
  // Referencias a elementos
  const elements = {
    minimizeBtn: shadow.querySelector('.wplace-minimize'),
    content: shadow.querySelector('.wplace-content'),
    status: shadow.getElementById('status'),
    paintedCount: shadow.getElementById('painted-count'),
    chargesCount: shadow.getElementById('charges-count'),
    retryCount: shadow.getElementById('retry-count'),
    tilePos: shadow.getElementById('tile-pos'),
    startBtn: shadow.getElementById('start-btn'),
    stopBtn: shadow.getElementById('stop-btn'),
    calibrateBtn: shadow.getElementById('calibrate-btn'),
    onceBtn: shadow.getElementById('once-btn'),
    healthStatus: shadow.getElementById('health-status'),
    delayInput: shadow.getElementById('delay-input'),
    pixelsInput: shadow.getElementById('pixels-input'),
    minChargesInput: shadow.getElementById('min-charges-input'),
    colorModeSelect: shadow.getElementById('color-mode-select'),
    colorRangeRow: shadow.getElementById('color-range-row'),
    colorFixedRow: shadow.getElementById('color-fixed-row'),
    colorMinInput: shadow.getElementById('color-min-input'),
    colorMaxInput: shadow.getElementById('color-max-input'),
    colorFixedInput: shadow.getElementById('color-fixed-input'),
    advancedToggle: shadow.getElementById('advanced-toggle'),
    advancedSection: shadow.getElementById('advanced-section'),
    advancedArrow: shadow.getElementById('advanced-arrow'),
    tileXInput: shadow.getElementById('tile-x-input'),
    tileYInput: shadow.getElementById('tile-y-input'),
    customPaletteInput: shadow.getElementById('custom-palette-input'),
    saveBtn: shadow.getElementById('save-btn'),
    loadBtn: shadow.getElementById('load-btn'),
    resetBtn: shadow.getElementById('reset-btn'),
    captureBtn: shadow.getElementById('capture-btn')
  };
  
  // Función para actualizar los valores de los inputs desde la configuración
  function updateInputsFromConfig() {
    elements.delayInput.value = config.DELAY_MS;
    elements.pixelsInput.value = config.PIXELS_PER_BATCH;
    elements.minChargesInput.value = config.MIN_CHARGES;
    elements.colorModeSelect.value = config.COLOR_MODE;
    elements.colorMinInput.value = config.COLOR_MIN;
    elements.colorMaxInput.value = config.COLOR_MAX;
    elements.colorFixedInput.value = config.COLOR_FIXED;
    elements.tileXInput.value = config.TILE_X || '';
    elements.tileYInput.value = config.TILE_Y || '';
    elements.customPaletteInput.value = (config.CUSTOM_PALETTE || []).join(',');
    
    // Actualizar visibilidad de controles de color
    updateColorModeVisibility();
    updateTileDisplay();
  }
  
  // Función para actualizar la configuración desde los inputs
  function updateConfigFromInputs() {
    config.DELAY_MS = parseInt(elements.delayInput.value) || FARM_DEFAULTS.DELAY_MS;
    config.PIXELS_PER_BATCH = clamp(parseInt(elements.pixelsInput.value) || FARM_DEFAULTS.PIXELS_PER_BATCH, 1, 50);
    config.MIN_CHARGES = parseFloat(elements.minChargesInput.value) || FARM_DEFAULTS.MIN_CHARGES;
    config.COLOR_MODE = elements.colorModeSelect.value;
    config.COLOR_MIN = clamp(parseInt(elements.colorMinInput.value) || FARM_DEFAULTS.COLOR_MIN, 1, 32);
    config.COLOR_MAX = clamp(parseInt(elements.colorMaxInput.value) || FARM_DEFAULTS.COLOR_MAX, 1, 32);
    config.COLOR_FIXED = clamp(parseInt(elements.colorFixedInput.value) || FARM_DEFAULTS.COLOR_FIXED, 1, 32);
    
    // Asegurar que MIN <= MAX
    if (config.COLOR_MIN > config.COLOR_MAX) {
      config.COLOR_MAX = config.COLOR_MIN;
      elements.colorMaxInput.value = config.COLOR_MAX;
    }
    
    const tileX = parseInt(elements.tileXInput.value);
    const tileY = parseInt(elements.tileYInput.value);
    if (Number.isFinite(tileX)) config.TILE_X = tileX;
    if (Number.isFinite(tileY)) config.TILE_Y = tileY;
    
    updateTileDisplay();
  }
  
  // Función para actualizar visibilidad de controles de modo de color
  function updateColorModeVisibility() {
    const mode = elements.colorModeSelect.value;
    elements.colorRangeRow.style.display = mode === 'random' ? 'flex' : 'none';
    elements.colorFixedRow.style.display = mode === 'fixed' ? 'flex' : 'none';
  }
  
  // Función para actualizar display del tile
  function updateTileDisplay() {
    if (elements.tilePos) {
      elements.tilePos.textContent = `${config.TILE_X || 0},${config.TILE_Y || 0}`;
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
    updateButtonStates(true);
  });
  
  elements.stopBtn?.addEventListener('click', () => {
    onStop();
    updateButtonStates(false);
  });
  
  elements.calibrateBtn?.addEventListener('click', () => {
    onCalibrate();
  });
  
  elements.onceBtn?.addEventListener('click', () => {
    updateConfigFromInputs();
    // Llamar a la función de pintar una vez si existe
    if (window.WPAUI && window.WPAUI.once) {
      window.WPAUI.once();
    }
  });
  
  elements.colorModeSelect?.addEventListener('change', () => {
    updateColorModeVisibility();
    updateConfigFromInputs();
  });
  
  elements.customPaletteInput?.addEventListener('input', () => {
    updateConfigFromInputs();
  });
  
  elements.advancedToggle?.addEventListener('click', () => {
    uiState.showAdvanced = !uiState.showAdvanced;
    elements.advancedSection.style.display = uiState.showAdvanced ? 'block' : 'none';
    elements.advancedArrow.textContent = uiState.showAdvanced ? '▼' : '▶';
  });
  
  // Listeners para inputs (actualización automática)
  ['delayInput', 'pixelsInput', 'minChargesInput', 'colorMinInput', 'colorMaxInput', 'colorFixedInput', 'tileXInput', 'tileYInput'].forEach(inputName => {
    elements[inputName]?.addEventListener('change', updateConfigFromInputs);
  });
  
  elements.saveBtn?.addEventListener('click', () => {
    updateConfigFromInputs();
    saveFarmCfg(config);
    setStatus(`💾 ${t('farm.configSaved')}`, 'success');
  });
  
  elements.loadBtn?.addEventListener('click', () => {
    const loaded = loadFarmCfg(FARM_DEFAULTS);
    Object.assign(config, loaded);
    updateInputsFromConfig();
    setStatus(`📁 ${t('farm.configLoaded')}`, 'success');
  });
  
  elements.resetBtn?.addEventListener('click', () => {
    resetFarmCfg();
    Object.assign(config, FARM_DEFAULTS);
    updateInputsFromConfig();
    setStatus(`🔄 ${t('farm.configReset')}`, 'success');
  });
  
  elements.captureBtn?.addEventListener('click', () => {
    // Función de captura - será implementada
    setStatus(`📸 ${t('farm.captureInstructions')}`, 'status');
    // Aquí iría la lógica de captura
  });
  
  // Función para actualizar estado de botones
  function updateButtonStates(running) {
    if (elements.startBtn) elements.startBtn.disabled = running;
    if (elements.stopBtn) elements.stopBtn.disabled = !running;
  }
  
  // Función para actualizar el estado visual
  function setStatus(message, type = 'status') {
    if (elements.status) {
      elements.status.textContent = message;
      elements.status.className = `wplace-status ${type}`;
      log(`Status: ${message}`);
    }
  }
  
  // Función para actualizar estadísticas
  function updateStats(painted, charges, retries = 0, health = null) {
    if (elements.paintedCount) {
      elements.paintedCount.textContent = painted || 0;
    }
    if (elements.chargesCount) {
      elements.chargesCount.textContent = typeof charges === 'number' ? charges.toFixed(1) : '0';
    }
    if (elements.retryCount) {
      elements.retryCount.textContent = retries || 0;
    }
    if (elements.healthStatus && health) {
      elements.healthStatus.textContent = health.up ? `🟢 ${t('farm.backendOnline')}` : `🔴 ${t('farm.backendOffline')}`;
      elements.healthStatus.className = `wplace-health ${health.up ? 'online' : 'offline'}`;
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
  
  // Función para actualizar textos cuando cambie el idioma
  function updateTexts() {
    // Actualizar título
    const title = shadow.querySelector('.wplace-title');
    if (title) {
      title.innerHTML = `🤖 ${t('farm.title')}`;
    }
    
    // Actualizar botones
    if (elements.startBtn) elements.startBtn.innerHTML = `▶️ ${t('farm.start')}`;
    if (elements.stopBtn) elements.stopBtn.innerHTML = `⏹️ ${t('farm.stop')}`;
    if (elements.calibrateBtn) elements.calibrateBtn.innerHTML = `🎯 ${t('farm.calibrate')}`;
    if (elements.onceBtn) elements.onceBtn.innerHTML = `🎨 ${t('farm.paintOnce')}`;
    
    // Actualizar etiquetas de estadísticas
    const paintedLabel = shadow.querySelector('#painted-count').parentElement.querySelector('.wplace-stat-label');
    const chargesLabel = shadow.querySelector('#charges-count').parentElement.querySelector('.wplace-stat-label');
    const retryLabel = shadow.querySelector('#retry-count').parentElement.querySelector('.wplace-stat-label');
    const tileLabel = shadow.querySelector('#tile-pos').parentElement.querySelector('.wplace-stat-label');
    
    if (paintedLabel) paintedLabel.textContent = t('farm.painted');
    if (chargesLabel) chargesLabel.textContent = t('farm.charges');
    if (retryLabel) retryLabel.textContent = t('farm.retries');
    if (tileLabel) tileLabel.textContent = t('farm.tile');
    
    // Actualizar secciones
    const configTitle = shadow.querySelector('.wplace-section-title');
    if (configTitle) configTitle.innerHTML = `⚙️ ${t('farm.configuration')}`;
    
    const advancedTitle = shadow.getElementById('advanced-toggle');
    if (advancedTitle) {
      const arrow = advancedTitle.querySelector('#advanced-arrow');
      const arrowText = arrow ? arrow.textContent : '▶';
      advancedTitle.innerHTML = `🔧 ${t('farm.advanced')} <span id="advanced-arrow">${arrowText}</span>`;
    }
    
    // Actualizar etiquetas de configuración
    // Las etiquetas se actualizan automáticamente desde el innerHTML inicial
    
    // Actualizar opciones del selector de modo de color
    const colorModeSelect = elements.colorModeSelect;
    if (colorModeSelect) {
      const randomOption = colorModeSelect.querySelector('option[value="random"]');
      const fixedOption = colorModeSelect.querySelector('option[value="fixed"]');
      if (randomOption) randomOption.textContent = t('farm.random');
      if (fixedOption) fixedOption.textContent = t('farm.fixed');
    }
    
    // Actualizar placeholder
    if (elements.customPaletteInput) {
      elements.customPaletteInput.placeholder = t('farm.paletteExample');
    }
    
    // Actualizar botones de configuración
    if (elements.saveBtn) elements.saveBtn.innerHTML = `💾 ${t('common.save')}`;
    if (elements.loadBtn) elements.loadBtn.innerHTML = `📁 ${t('common.load')}`;
    if (elements.resetBtn) elements.resetBtn.innerHTML = `🔄 ${t('common.reset')}`;
    if (elements.captureBtn) elements.captureBtn.innerHTML = `📸 ${t('farm.capture')}`;
    
    // Actualizar estado de salud si existe
    const healthStatus = elements.healthStatus;
    if (healthStatus && healthStatus.textContent.includes('🔍')) {
      healthStatus.textContent = `🔍 ${t('farm.checkingStatus')}`;
    }
    
    // Actualizar estado si está detenido
    const status = elements.status;
    if (status && status.textContent.includes('💤')) {
      status.textContent = `💤 ${t('farm.stopped')}`;
    }
  }
  
  // Escuchar cambios de idioma
  window.addEventListener('languageChanged', updateTexts);
  
  // API pública de la UI
  return {
    setStatus,
    updateStats,
    flashEffect,
    updateButtonStates,
    updateTexts,
    destroy: () => {
      window.removeEventListener('languageChanged', updateTexts);
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
    const urlParams = new window.URLSearchParams(window.location.search);
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
      const coordMatch = textContent.match(/(?:tile|pos|position)?\s*[([]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);
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
  // Esta función será llamada desde farm/index.js
  log('📱 Montando UI del farm...');
  
  // Crear una UI básica para el farm
  const ui = createFarmUI(
    FARM_DEFAULTS,
    () => log(t('farm.startingBot')),
    () => log(t('farm.stoppingBot')),
    () => log(t('farm.calibrating'))
  );
  
  return {
    setStatus: (msg) => {
      log(msg);
      ui.setStatus(msg);
    },
    updateStats: ui.updateStats,
    flashEffect: ui.flashEffect,
    updateTexts: ui.updateTexts,
    destroy: ui.destroy
  };
}
