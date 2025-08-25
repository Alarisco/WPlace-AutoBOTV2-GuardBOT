import { log } from "../core/logger.js";
import { createShadowRoot, makeDraggable } from "../core/ui-utils.js";
import { createLogWindow } from "../log_window/index.js";
import { createPaintingStatsWindow } from "./painting-stats.js";
import { createColorPaletteSelector } from "./color-palette-selector.js";

export async function createImageUI({ texts, ...handlers }) {
  log('🎨 Creando interfaz de Auto-Image');
  
  // Agregar FontAwesome al document.head si no existe
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
    log('📦 FontAwesome añadido al document.head');
  }
  
  // Crear shadow root para aislamiento de estilos
  const { host, root } = createShadowRoot();
  
  // Crear estilos
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
    }
    
    .container {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      z-index: 9998;
      font-family: 'Segoe UI', Roboto, sans-serif;
      color: #eee;
      animation: slideIn 0.4s ease-out;
      overflow: hidden;
    }
    
    .header {
      padding: 12px 15px;
      background: #2d3748;
      color: #60a5fa;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;
      user-select: none;
    }
    
    .header-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .header-controls {
      display: flex;
      gap: 10px;
    }
    
    .header-btn {
      background: none;
      border: none;
      color: #eee;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
      padding: 5px;
    }
    
    .header-btn:hover {
      opacity: 1;
    }
    
    .content {
      padding: 15px;
      display: block;
    }
    
    .controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 15px;
    }
    
    .config-panel {
      display: none;
      background: #2d3748;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 10px;
    }
    
    .config-panel.visible {
      display: block;
    }
    
    .config-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .config-input {
      width: 60px;
      padding: 4px;
      border: 1px solid #333;
      border-radius: 4px;
      background: #1a1a1a;
      color: #eee;
      text-align: center;
    }
    
    .config-input[type="text"], 
    .config-input select {
      width: 120px;
      text-align: left;
    }
    
    .config-checkbox {
      margin-right: 8px;
    }
    
    .main-config {
      background: #2d3748;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 10px;
      border: 1px solid #3a4553;
    }
    
    .config-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    
    .config-label {
      font-size: 13px;
      color: #cbd5e0;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .batch-value, .cooldown-value {
      font-weight: bold;
      color: #60a5fa;
    }
    
    .btn {
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
      font-size: 14px;
    }
    
    .btn:hover:not(:disabled) {
      transform: translateY(-2px);
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
    
    .btn-primary {
      background: #60a5fa;
      color: white;
    }
    
    .btn-upload {
      background: #2d3748;
      color: white;
      border: 1px dashed #eee;
    }
    
    .btn-load {
      background: #2196F3;
      color: white;
    }
    
    .btn-start {
      background: #10b981;
      color: white;
    }
    
    .btn-stop {
      background: #ef4444;
      color: white;
    }
    
    .btn-select {
      background: #f59e0b;
      color: black;
    }
    
    .btn-secondary {
      background: #6b7280;
      color: white;
    }
    
    .progress {
      width: 100%;
      background: #2d3748;
      border-radius: 4px;
      margin: 10px 0;
      overflow: hidden;
      height: 10px;
    }
    
    .progress-bar {
      height: 100%;
      background: #60a5fa;
      transition: width 0.3s;
      width: 0%;
    }
    
    .stats {
      background: #2d3748;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 15px;
    }
    
    .stat-item {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 14px;
    }
    
    .stat-label {
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.8;
    }
    
    .status {
      padding: 8px;
      border-radius: 4px;
      text-align: center;
      font-size: 13px;
    }
    
    .status-default {
      background: rgba(255,255,255,0.1);
    }
    
    .status-success {
      background: rgba(0, 255, 0, 0.1);
      color: #10b981;
    }
    
    .status-error {
      background: rgba(255, 0, 0, 0.1);
      color: #ef4444;
    }
    
    .status-warning {
      background: rgba(255, 165, 0, 0.1);
      color: orange;
    }
    
    .status-info {
      background: rgba(0, 150, 255, 0.1);
      color: #60a5fa;
    }
    
    .minimized .content {
      display: none;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal {
      background: #1a1a1a;
      border: 2px solid #333;
      border-radius: 15px;
      padding: 25px;
      color: #eee;
      min-width: 350px;
      max-width: 400px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    .modal h3 {
      margin: 0 0 15px 0;
      text-align: center;
      font-size: 18px;
    }
    
    .modal p {
      margin: 0 0 20px 0;
      text-align: center;
      line-height: 1.4;
    }
    
    .modal-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    
    .modal-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      min-width: 100px;
    }
    
    .modal-btn-save {
      background: #10b981;
      color: white;
    }
    
    .modal-btn-discard {
      background: #ef4444;
      color: white;
    }
    
    .modal-btn-cancel {
      background: #2d3748;
      color: white;
    }
    
    .modal-btn:hover {
      transform: translateY(-2px);
    }
    
    /* Resize Dialog Styles */
    .resize-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 9999;
      display: none;
    }
    
    .resize-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1a1a1a;
      padding: 20px;
      border-radius: 8px;
      z-index: 10000;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
      max-width: 90%;
      max-height: 90%;
      overflow: auto;
      color: #ffffff;
      display: none;
    }
    
    .resize-container h3 {
      margin: 0 0 15px 0;
      color: #ffffff;
    }
    
    .resize-controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 15px;
    }
    
    .resize-controls label {
      color: #ffffff;
      font-size: 14px;
    }
    
    .resize-slider {
      width: 100%;
      margin: 5px 0;
    }
    
    .resize-preview {
      max-width: 100%;
      max-height: 300px;
      margin: 10px 0;
      border: 1px solid #333;
      display: block;
    }
    
    .resize-buttons {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
  `;
  root.appendChild(style);
  
  // Crear contenedor principal
  const container = document.createElement('div');
  container.className = 'container';
  container.innerHTML = `
    <div class="header">
      <div class="header-title">
        🖼️
        <span>${texts.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuración">
          ⚙️
        </button>
        <button class="header-btn minimize-btn" title="${texts.minimize}">
          ➖
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${texts.batchSize}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="9999" value="20">
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            ${texts.useAllCharges}
          </label>
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox show-overlay" type="checkbox" checked>
            ${texts.showOverlay || 'Mostrar overlay'}
          </label>
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox protection-enabled" type="checkbox" checked>
            🛡️ Protección del dibujo
          </label>
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox smart-verification" type="checkbox" checked>
            💡 Verificación inteligente
          </label>
        </div>
        <div class="config-item">
          <label>📐 Patrón de pintado:</label>
          <select class="config-input paint-pattern">
            <option value="linear_start">Lineal (Inicio)</option>
            <option value="linear_end">Lineal (Final)</option>
            <option value="random">Aleatorio</option>
            <option value="center_out">Centro hacia afuera</option>
            <option value="corners_first">Esquinas primero</option>
            <option value="spiral">Espiral</option>
          </select>
        </div>
      </div>
      
      <!-- Configuración visible en la interfaz principal -->
      <div class="main-config">
        <div class="config-row">
          <div class="config-label">
            🎯 ${texts.batchSize}:
            <span class="batch-value">20</span>
          </div>
          <div class="config-label">
            ⏱️ ${texts.nextBatchTime}:
            <span class="cooldown-value">--</span>
          </div>
        </div>
      </div>
      
      <div class="controls">
        <!-- Estado inicial: Solo 3 botones principales -->
        <button class="btn btn-upload upload-btn" data-state="initial">
          📤
          <span>${texts.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" data-state="initial">
          📁
          <span>${texts.loadProgress}</span>
        </button>
        <button class="btn btn-secondary stats-btn" data-state="initial">
          📊
          <span>Estadísticas</span>
        </button>
        <button class="btn btn-secondary log-window-btn" data-state="initial,load-progress,upload-image">
          📋
          <span>${texts.logWindow || 'Logs'}</span>
        </button>
        
        <!-- Flujo de carga de progreso -->
        <button class="btn btn-load load-progress-btn-flow" data-state="load-progress" style="display: none;">
          📁
          <span>${texts.loadProgress}</span>
        </button>
        <button class="btn btn-start start-btn" data-state="load-progress" style="display: none;">
          ▶️
          <span>${texts.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" data-state="load-progress" style="display: none;">
          ⏹️
          <span>${texts.stopPainting}</span>
        </button>

        
        <!-- Flujo de subida de imagen -->
        <button class="btn btn-primary resize-btn" data-state="upload-image" style="display: none;">
          🔄
          <span>${texts.resizeImage}</span>
        </button>
        <button class="btn btn-select select-pos-btn" data-state="upload-image" style="display: none;">
          🎯
          <span>${texts.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn-upload" data-state="upload-image" style="display: none;">
          ▶️
          <span>${texts.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn-upload" data-state="upload-image" style="display: none;">
          ⏹️
          <span>${texts.stopPainting}</span>
        </button>
        
        <!-- Botón de inicialización oculto por defecto -->
        <button class="btn btn-primary init-btn" style="display: none;">
          🤖
          <span>${texts.initBot}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label">ℹ️ ${texts.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${texts.waitingInit}
      </div>
    </div>
  `;
  
  root.appendChild(container);
  
  // Input oculto para archivos
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/png,image/jpeg';
  fileInput.style.display = 'none';
  root.appendChild(fileInput);
  
  const progressFileInput = document.createElement('input');
  progressFileInput.type = 'file';
  progressFileInput.accept = '.json';
  progressFileInput.style.display = 'none';
  root.appendChild(progressFileInput);
  
  // Modal de resize
  const resizeOverlay = document.createElement('div');
  resizeOverlay.className = 'resize-overlay';
  root.appendChild(resizeOverlay);
  
  const resizeContainer = document.createElement('div');
  resizeContainer.className = 'resize-container';
  resizeContainer.innerHTML = `
    <h3>${texts.resizeImage}</h3>
    <div class="resize-controls">
      <label>
        ${texts.width}: <span class="width-value">0</span>px
        <input type="range" class="resize-slider width-slider" min="10" max="500" value="100">
      </label>
      <label>
        ${texts.height}: <span class="height-value">0</span>px
        <input type="range" class="resize-slider height-slider" min="10" max="500" value="100">
      </label>
      <label>
        <input type="checkbox" class="keep-aspect" checked>
        ${texts.keepAspect}
      </label>
      <img class="resize-preview" src="" alt="Preview">
      <div class="resize-buttons">
        <button class="btn btn-primary confirm-resize">
          ✅
          <span>${texts.apply}</span>
        </button>
        <button class="btn btn-stop cancel-resize">
          ❌
          <span>${texts.cancel}</span>
        </button>
      </div>
    </div>
  `;
  root.appendChild(resizeContainer);
  
  // Referencias a elementos
  const elements = {
    header: container.querySelector('.header'),
    configBtn: container.querySelector('.config-btn'),
    minimizeBtn: container.querySelector('.minimize-btn'),
    configPanel: container.querySelector('.config-panel'),
    pixelsPerBatch: container.querySelector('.pixels-per-batch'),
    useAllCharges: container.querySelector('.use-all-charges'),
    protectionEnabled: container.querySelector('.protection-enabled'),
    smartVerification: container.querySelector('.smart-verification'),
    paintPattern: container.querySelector('.paint-pattern'),
    showOverlay: container.querySelector('.show-overlay'),
    batchValue: container.querySelector('.batch-value'),
    cooldownValue: container.querySelector('.cooldown-value'),
    initBtn: container.querySelector('.init-btn'),
    uploadBtn: container.querySelector('.upload-btn'),
    loadProgressBtn: container.querySelector('.load-progress-btn'),
    loadProgressBtnFlow: container.querySelector('.load-progress-btn-flow'),

    resizeBtn: container.querySelector('.resize-btn'),
    selectPosBtn: container.querySelector('.select-pos-btn'),
    startBtn: container.querySelector('.start-btn'),
    startBtnUpload: container.querySelector('.start-btn-upload'),
    stopBtn: container.querySelector('.stop-btn'),
    stopBtnUpload: container.querySelector('.stop-btn-upload'),
    statsBtn: container.querySelector('.stats-btn'),
    logWindowBtn: container.querySelector('.log-window-btn'),
    progressBar: container.querySelector('.progress-bar'),
    statsArea: container.querySelector('.stats-area'),
    status: container.querySelector('.status'),
    content: container.querySelector('.content')
  };
  
  // Estado actual de la interfaz (manejado por la función setState)
  
  // Referencias a elementos del resize dialog
  const resizeElements = {
    overlay: resizeOverlay,
    container: resizeContainer,
    widthSlider: resizeContainer.querySelector('.width-slider'),
    heightSlider: resizeContainer.querySelector('.height-slider'),
    widthValue: resizeContainer.querySelector('.width-value'),
    heightValue: resizeContainer.querySelector('.height-value'),
    keepAspect: resizeContainer.querySelector('.keep-aspect'),
    preview: resizeContainer.querySelector('.resize-preview'),
    confirmBtn: resizeContainer.querySelector('.confirm-resize'),
    cancelBtn: resizeContainer.querySelector('.cancel-resize')
  };
  
  // Estado de la UI
  let state = {
    minimized: false,
    configVisible: false
  };
  
  // Hacer draggable
  makeDraggable(elements.header, container);
  
  // Event listeners
  elements.minimizeBtn.addEventListener('click', () => {
    state.minimized = !state.minimized;
    if (state.minimized) {
      container.classList.add('minimized');
      elements.minimizeBtn.innerHTML = '🔼';
    } else {
      container.classList.remove('minimized');
      elements.minimizeBtn.innerHTML = '🔽';
    }
  });
  
  elements.configBtn.addEventListener('click', () => {
    state.configVisible = !state.configVisible;
    if (state.configVisible) {
      elements.configPanel.classList.add('visible');
      elements.configBtn.innerHTML = '❌';
    } else {
      elements.configPanel.classList.remove('visible');
      elements.configBtn.innerHTML = '⚙️';
    }
  });
  
  // Event listeners para configuración
  elements.pixelsPerBatch.addEventListener('change', () => {
    const value = parseInt(elements.pixelsPerBatch.value) || 20;
    elements.batchValue.textContent = value;
    
    // Actualizar configuración si hay handlers
    if (handlers.onConfigChange) {
      handlers.onConfigChange({ pixelsPerBatch: value });
    }
  });
  
  elements.useAllCharges.addEventListener('change', () => {
    if (handlers.onConfigChange) {
      handlers.onConfigChange({ useAllCharges: elements.useAllCharges.checked });
    }
  });
  
  elements.protectionEnabled.addEventListener('change', () => {
    if (handlers.onConfigChange) {
      handlers.onConfigChange({ protectionEnabled: elements.protectionEnabled.checked });
    }
  });
  
  elements.smartVerification.addEventListener('change', () => {
    if (handlers.onConfigChange) {
      handlers.onConfigChange({ smartVerification: elements.smartVerification.checked });
    }
  });
  
  elements.paintPattern.addEventListener('change', () => {
    if (handlers.onConfigChange) {
      handlers.onConfigChange({ paintPattern: elements.paintPattern.value });
    }
  });
  
  // Función para cambiar el estado de la interfaz
  function setState(newState) {
    // Ocultar todos los botones
    const allButtons = container.querySelectorAll('[data-state]');
    allButtons.forEach(btn => {
      btn.style.display = 'none';
    });
    
    // Mostrar botones del estado actual
    const stateButtons = container.querySelectorAll(`[data-state*="${newState}"]`);
    stateButtons.forEach(btn => {
      btn.style.display = 'flex';
    });
    
    log(`🔄 Estado cambiado a: ${newState}`);
  }
  
  // Función para habilitar botones después de inicialización exitosa
  function enableButtonsAfterInit() {
    // Ya no es necesaria, se maneja con estados
  }
  
  elements.initBtn.addEventListener('click', async () => {
    elements.initBtn.disabled = true;
    if (handlers.onInitBot) {
      const success = await handlers.onInitBot();
      if (success) {
        enableButtonsAfterInit();
      }
    }
    elements.initBtn.disabled = false;
  });
  
  elements.uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });
  
  fileInput.addEventListener('change', async () => {
    if (fileInput.files.length > 0 && handlers.onUploadImage) {
      const success = await handlers.onUploadImage(fileInput.files[0]);
      if (success) {
        setState('upload-image');
      }
    }
  });
  
  elements.loadProgressBtn.addEventListener('click', () => {
    progressFileInput.click();
  });
  
  progressFileInput.addEventListener('change', async () => {
    if (progressFileInput.files.length > 0 && handlers.onLoadProgress) {
      const success = await handlers.onLoadProgress(progressFileInput.files[0]);
      if (success) {
        setState('load-progress');
      }
    }
  });
  
  // Event listener para el botón de cargar progreso en el flujo
  elements.loadProgressBtnFlow.addEventListener('click', () => {
    progressFileInput.click();
  });
  
  elements.resizeBtn.addEventListener('click', () => {
    if (handlers.onResizeImage) {
      handlers.onResizeImage();
    }
  });
  

  
  // Event listeners para botones de selección de posición (ambos flujos)
  const handleSelectPosition = async (btn, startBtn) => {
    if (handlers.onSelectPosition) {
      btn.disabled = true;
      const success = await handlers.onSelectPosition();
      if (success && startBtn) {
        startBtn.disabled = false;
      }
      btn.disabled = false;
    }
  };
  
  elements.selectPosBtn.addEventListener('click', () => {
    handleSelectPosition(elements.selectPosBtn, elements.startBtnUpload);
  });

  // Checkbox mostrar overlay
  elements.showOverlay.addEventListener('change', () => {
    if (!window.__WPA_PLAN_OVERLAY__) return;
    window.__WPA_PLAN_OVERLAY__.injectStyles();
    const isEnabled = elements.showOverlay.checked;
    window.__WPA_PLAN_OVERLAY__.setEnabled(isEnabled);
  });
  
  // Event listeners para botones de start/stop (ambos flujos)
  const handleStartPainting = async (startBtn, stopBtn) => {
    if (handlers.onStartPainting) {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      const success = await handlers.onStartPainting();
      if (!success) {
        startBtn.disabled = false;
        stopBtn.disabled = true;
      }
    }
  };
  
  const handleStopPainting = async (startBtn, stopBtn) => {
    if (handlers.onStopPainting) {
      const shouldStop = await handlers.onStopPainting();
      if (shouldStop) {
        startBtn.disabled = false;
        stopBtn.disabled = true;
      }
    }
  };
  
  // Flujo de carga de progreso
  elements.startBtn.addEventListener('click', () => {
    handleStartPainting(elements.startBtn, elements.stopBtn);
  });
  
  elements.stopBtn.addEventListener('click', () => {
    handleStopPainting(elements.startBtn, elements.stopBtn);
  });
  
  // Flujo de subida de imagen
  elements.startBtnUpload.addEventListener('click', () => {
    handleStartPainting(elements.startBtnUpload, elements.stopBtnUpload);
  });
  
  elements.stopBtnUpload.addEventListener('click', () => {
    handleStopPainting(elements.startBtnUpload, elements.stopBtnUpload);
  });
  
  // Variable para mantener referencia a la ventana de logs
  let logWindow = null;
  
  // Variable para mantener referencia a la ventana de estadísticas
  let statsWindow = null;
  
  elements.logWindowBtn.addEventListener('click', () => {
    if (!logWindow) {
      logWindow = createLogWindow('image');
      logWindow.show();
    } else {
      logWindow.toggle();
    }
  });
  
  elements.statsBtn.addEventListener('click', () => {
    if (!statsWindow) {
      statsWindow = createPaintingStatsWindow();
      
      // Configurar callback de actualización
      statsWindow.setRefreshCallback(() => {
        if (handlers.onRefreshStats) {
          handlers.onRefreshStats();
        }
      });
      
      statsWindow.show();
    } else {
      statsWindow.toggle();
    }
  });
  
  // Función para actualizar el estado
  function setStatus(message, type = 'default') {
    elements.status.textContent = message;
    elements.status.className = `status status-${type}`;
    elements.status.style.animation = 'none';
    void elements.status.offsetWidth;
    elements.status.style.animation = 'slideIn 0.3s ease-out';
  }
  
  function showResizeDialog(processor) {
    const { width, height } = processor.getDimensions();
    const aspectRatio = width / height;
    
    // Inicializar valores
    resizeElements.widthSlider.value = width;
    resizeElements.heightSlider.value = height;
    resizeElements.widthValue.textContent = width;
    resizeElements.heightValue.textContent = height;
    resizeElements.preview.src = processor.img.src;
    
    // Crear selector de paleta de colores si no existe
    if (!resizeElements.colorPaletteSelector) {
      // Obtener colores disponibles de los handlers
      const availableColors = handlers.getAvailableColors ? handlers.getAvailableColors() : [];
      
      resizeElements.colorPaletteSelector = createColorPaletteSelector(
        resizeElements.container.querySelector('.resize-buttons').parentNode,
        availableColors
      );
      
      // Configurar callback para cambios en la selección
      resizeElements.colorPaletteSelector.onSelectionChange((selectedColorIds) => {
        if (handlers.onColorSelectionChange) {
          handlers.onColorSelectionChange(selectedColorIds);
        }
      });
      
      // Mover la paleta antes de los botones
      const buttonsDiv = resizeElements.container.querySelector('.resize-buttons');
      buttonsDiv.parentNode.insertBefore(resizeElements.colorPaletteSelector.element, buttonsDiv);
    } else {
      // Actualizar colores disponibles
      const availableColors = handlers.getAvailableColors ? handlers.getAvailableColors() : [];
      resizeElements.colorPaletteSelector.updateAvailableColors(availableColors);
    }
    
    // Mostrar modal
    resizeElements.overlay.style.display = 'block';
    resizeElements.container.style.display = 'block';
    
    const updatePreview = () => {
      const newWidth = parseInt(resizeElements.widthSlider.value);
      const newHeight = parseInt(resizeElements.heightSlider.value);
      
      resizeElements.widthValue.textContent = newWidth;
      resizeElements.heightValue.textContent = newHeight;
      
      resizeElements.preview.src = processor.generatePreview(newWidth, newHeight);
    };
    
    // Event listeners para sliders
    const onWidthChange = () => {
      if (resizeElements.keepAspect.checked) {
        const newWidth = parseInt(resizeElements.widthSlider.value);
        const newHeight = Math.round(newWidth / aspectRatio);
        resizeElements.heightSlider.value = newHeight;
      }
      updatePreview();
    };
    
    const onHeightChange = () => {
      if (resizeElements.keepAspect.checked) {
        const newHeight = parseInt(resizeElements.heightSlider.value);
        const newWidth = Math.round(newHeight * aspectRatio);
        resizeElements.widthSlider.value = newWidth;
      }
      updatePreview();
    };
    
    // Añadir event listeners temporales
    resizeElements.widthSlider.addEventListener('input', onWidthChange);
    resizeElements.heightSlider.addEventListener('input', onHeightChange);
    
    // Event listener para confirmar
    const onConfirm = () => {
      const newWidth = parseInt(resizeElements.widthSlider.value);
      const newHeight = parseInt(resizeElements.heightSlider.value);
      const selectedColors = resizeElements.colorPaletteSelector.getSelectedColors();
      
      if (handlers.onConfirmResize) {
        handlers.onConfirmResize(processor, newWidth, newHeight, selectedColors);
      }
      
      closeResizeDialog();
    };
    
    // Event listener para cancelar
    const onCancel = () => {
      closeResizeDialog();
    };
    
    resizeElements.confirmBtn.addEventListener('click', onConfirm);
    resizeElements.cancelBtn.addEventListener('click', onCancel);
    resizeElements.overlay.addEventListener('click', onCancel);
    
    // Función para limpiar listeners
    window.cleanupResizeDialog = () => {
      resizeElements.widthSlider.removeEventListener('input', onWidthChange);
      resizeElements.heightSlider.removeEventListener('input', onHeightChange);
      resizeElements.confirmBtn.removeEventListener('click', onConfirm);
      resizeElements.cancelBtn.removeEventListener('click', onCancel);
      resizeElements.overlay.removeEventListener('click', onCancel);
    };
    
    // Generar preview inicial
    updatePreview();
  }
  
  function closeResizeDialog() {
    resizeElements.overlay.style.display = 'none';
    resizeElements.container.style.display = 'none';
    
    // Limpiar event listeners
    if (window.cleanupResizeDialog) {
      window.cleanupResizeDialog();
      delete window.cleanupResizeDialog;
    }
  }
  
  function updateProgress(current, total, userInfo = null) {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    elements.progressBar.style.width = `${percentage}%`;
    
    // Actualizar stats
    let statsHTML = `
      <div class="stat-item">
        <div class="stat-label">🎨 ${texts.progress}</div>
        <div>${current}/${total} (${percentage.toFixed(1)}%)</div>
      </div>
    `;
    
    // Agregar información del usuario si está disponible
    if (userInfo) {
      // Mostrar nombre de usuario
      if (userInfo.username) {
        statsHTML += `
          <div class="stat-item">
            <div class="stat-label">👤 ${texts.userName}</div>
            <div>${userInfo.username}</div>
          </div>
        `;
      }
      
      // Mostrar cargas (número entero)
      if (userInfo.charges !== undefined) {
        statsHTML += `
          <div class="stat-item">
            <div class="stat-label">⚡ ${texts.charges}</div>
            <div>${Math.floor(userInfo.charges)}</div>
          </div>
        `;
      }
      
      // Mostrar píxeles pintados del usuario
      if (userInfo.pixels !== undefined) {
        statsHTML += `
          <div class="stat-item">
            <div class="stat-label">🔳 ${texts.pixels}</div>
            <div>${userInfo.pixels.toLocaleString()}</div>
          </div>
        `;
      }
      
      // Mostrar tiempo estimado si está disponible
      if (userInfo.estimatedTime !== undefined && userInfo.estimatedTime > 0) {
        const hours = Math.floor(userInfo.estimatedTime / 3600);
        const minutes = Math.floor((userInfo.estimatedTime % 3600) / 60);
        const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        
        statsHTML += `
          <div class="stat-item">
            <div class="stat-label">⏰ ${texts.timeRemaining}</div>
            <div>${timeStr}</div>
          </div>
        `;
      }
    }
    
    elements.statsArea.innerHTML = statsHTML;
  }
  
  function updateCooldownDisplay(seconds) {
    if (seconds > 0) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const timeStr = minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
      elements.cooldownValue.textContent = timeStr;
    } else {
      elements.cooldownValue.textContent = '--';
    }
  }
  
  // Nueva función para actualizar solo el mensaje de cooldown sin parpadeo
  function updateCooldownMessage(message) {
    if (message && message.includes('⏳')) {
      // Es un mensaje de cooldown, actualizar solo el texto sin recargar todo
      elements.status.textContent = message;
      elements.status.className = 'status status-info';
      // No hacer animación para evitar parpadeo
    } else if (message) {
      // Mensaje normal, usar setStatus completo
      setStatus(message, 'info');
    }
  }
  
  // Función para controlar el estado del botón de inicialización
  function setInitialized(isInitialized) {
    if (isInitialized) {
      elements.initBtn.disabled = true;
      elements.initBtn.style.opacity = '0.6';
      elements.initBtn.innerHTML = `✅ <span>${texts.initBot} - Completado</span>`;
    } else {
      elements.initBtn.disabled = false;
      elements.initBtn.style.opacity = '1';
      elements.initBtn.innerHTML = `🤖 <span>${texts.initBot}</span>`;
    }
  }
  
  // Función para ocultar/mostrar el botón de inicialización
  function setInitButtonVisible(visible) {
    elements.initBtn.style.display = visible ? 'flex' : 'none';
  }
  
  // Función para resetear al estado inicial
  function resetToInitialState() {
    setState('initial');
    // Resetear estados de botones
    const allButtons = container.querySelectorAll('button');
    allButtons.forEach(btn => {
      btn.disabled = false;
    });
  }
  
  function destroy() {
    if (logWindow) {
      logWindow.destroy();
    }
    if (statsWindow) {
      statsWindow.destroy();
    }
    host.remove();
  }
  
  // Función para actualizar las estadísticas desde el código principal
  function updateStatsWindow(data) {
    if (statsWindow && statsWindow.isVisible()) {
      if (data.userInfo) {
        statsWindow.updateUserStats(data.userInfo);
      }
      if (data.imageInfo) {
        statsWindow.updateImageStats(data.imageInfo);
      }
      if (data.availableColors) {
        statsWindow.updateColorsStats(data.availableColors);
      }
    }
  }
  
  log('✅ Interfaz de Auto-Image creada');
  
  // Inicializar en estado inicial
  setState('initial');
  
  return {
    setStatus,
    updateProgress,
    updateCooldownDisplay,
    updateCooldownMessage,
    setInitialized,
    setInitButtonVisible,
    enableButtonsAfterInit,
    setState,
    resetToInitialState,
    showResizeDialog,
    closeResizeDialog,
    updateStatsWindow,
    destroy
  };
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
