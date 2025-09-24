import { log } from "../core/logger.js";
import { createShadowRoot } from "../core/ui-utils.js";
import { createLogWindow } from "../log_window/index.js";
import { createResizeWindow } from "./Resize-window.js";
import { saveGuardJSON } from "./safe-guard-window.js";
import { registerWindow, unregisterWindow, bringWindowToFront } from '../core/window-manager.js';

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
      right: 70px;
      width: 300px;
      min-width: 250px;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      font-family: 'Segoe UI', Roboto, sans-serif;
      color: #eee;
      animation: slideIn 0.4s ease-out;
      resize: both;
      overflow: auto;
      display: flex;
      flex-direction: column;
      min-height: 200px;
      max-height: 80vh;
    }
    /* Estado minimizado: el contenedor no fuerza altura mínima */
    .container.minimized {
      min-height: 0 !important;
      height: auto !important;
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
      flex-shrink: 0;
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
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      display: block;
      position: relative;
    }
    
    /* Elementos que se ocultan cuando está minimizado */
    .collapsible-content {
      max-height: 1000px;
      transition: max-height 0.35s ease, opacity 0.25s ease, padding 0.25s ease;
    }
    
    .content.collapsed .collapsible-content {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      padding: 0;
    }
    /* El content deja de expandir al estar colapsado */
    .content.collapsed {
      flex: 0;
    }
    
    /* Status siempre visible */
    .content.collapsed .status {
      display: block !important;
      margin-top: 8px;
      animation: slideIn 0.3s ease-out;
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
          margin-bottom: 6px;
          font-size: 14px;
        }
        
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ef4444;
          transition: .3s;
          border-radius: 24px;
        }
        
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        
        input:checked + .toggle-slider {
          background-color: #10b981;
        }
        
        input:checked + .toggle-slider:before {
          transform: translateX(20px);
          background-color: white;
        }
    
    .config-input {
      width: 60px;
      padding: 4px;
      border: 1px solid #333;
      border-radius: 4px;
      background: #1a1a1a;
      color: #eee;
      text-align: center;
      font-size: 14px;
    }
    
    .config-input.paint-pattern {
      width: 140px;
      font-size: 15px;
      padding: 6px;
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
    
    .btn-half {
          width: calc(50% - 3px);
        }
    
    .btn-full {
      width: 100%;
    }
    
    .button-row {
          display: flex;
          gap: 6px;
          margin: 3px 0;
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
    /* Estilo reforzado cuando la pintura está activa */
    .btn-stop-running {
      background: #ef4444 !important;
      color: #fff !important;
      box-shadow: 0 0 0 2px rgba(239,68,68,0.35);
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
    
    /* Media queries para responsividad */
    @media (max-width: 768px) {
      .container {
        width: calc(100vw - 20px);
        max-width: 350px;
        left: 10px !important;
        right: 10px;
        top: 10px !important;
        font-size: 14px;
      }
      
      .header {
        padding: 10px 12px;
        font-size: 14px;
      }
      
      .content {
        padding: 12px;
      }
      
      .btn {
        padding: 8px;
        font-size: 13px;
      }
      
      .config-item {
        font-size: 13px;
      }
      
      .stat-item {
        font-size: 13px;
      }
    }
    
    @media (max-width: 480px) {
      .container {
        width: calc(100vw - 10px);
        left: 5px !important;
        right: 5px;
        top: 5px !important;
        font-size: 13px;
      }
      
      .header {
        padding: 8px 10px;
        font-size: 13px;
      }
      
      .content {
        padding: 10px;
      }
      
      .btn {
        padding: 6px;
        font-size: 12px;
        gap: 4px;
      }
      
      .config-item {
        font-size: 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
      
      .stat-item {
        font-size: 12px;
        flex-direction: column;
        align-items: flex-start;
      }
      
      .config-input {
        width: 100%;
        max-width: 120px;
      }
    }
    
    @media (max-height: 600px) {
      .container {
        max-height: calc(100vh - 20px);
        overflow-y: auto;
      }
      
      .stats {
        margin-bottom: 10px;
      }
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
      <div class="collapsible-content">
        <div class="config-panel">
        <div class="config-item">
          <label>${texts.batchSize}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="9999" value="20">
        </div>
        <div class="config-item">
          <label>${texts.useAllCharges}</label>
          <label class="toggle-switch">
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="config-item">
          <label>${texts.showOverlay || 'Mostrar overlay'}</label>
          <label class="toggle-switch">
            <input class="config-checkbox show-overlay" type="checkbox" checked>
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="config-item">
          <label>${texts.paintPattern}:</label>
          <select class="config-input paint-pattern">
            <option value="linear_start">➡️ ${texts.patternLinearStart}</option>
            <option value="linear_end">⬅️ ${texts.patternLinearEnd}</option>
            <option value="random">🎲 ${texts.patternRandom}</option>
            <option value="center_out">💥 ${texts.patternCenterOut}</option>
            <option value="corners_first">🏁 ${texts.patternCornersFirst}</option>
            <option value="spiral">🌀 ${texts.patternSpiral}</option>
            <option value="snake">🐍 ${texts.patternSnake}</option>
            <option value="diagonal_sweep">📐 ${texts.patternDiagonalSweep}</option>
            <option value="borders">🖼️ ${texts.patternBorders}</option>
            <option value="center">🎯 ${texts.patternCenter}</option>
            <option value="quadrants">🔲 ${texts.patternQuadrants}</option>
            <option value="biased_random">🎯 ${texts.patternBiasedRandom}</option>
            <option value="clusters">🎪 ${texts.patternClusters}</option>
            <option value="proximity">🤝 ${texts.patternProximity}</option>
            <option value="sweep">🧹 ${texts.patternSweep}</option>
            <option value="priority">⭐ ${texts.patternPriority}</option>
            <option value="anchor_points">⚓ ${texts.patternAnchorPoints}</option>
            <option value="spiral_cw">🔄 ${texts.patternSpiralCw}</option>
            <option value="spiral_ccw">🔃 ${texts.patternSpiralCccw}</option>
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
        <!-- Botones siempre visibles: Cargar imagen y Cargar progreso -->
        <div class="button-row">
          <button class="btn btn-upload upload-btn btn-half">
            📤
            <span>${texts.uploadImage}</span>
          </button>
          <button class="btn btn-load load-progress-btn btn-half">
            📁
            <span>${texts.loadProgress}</span>
          </button>
        </div>
        
        <!-- Botones para imagen: Redimensionar y Seleccionar posición -->
        <div class="button-row image-controls" style="display: none;">
          <button class="btn btn-primary resize-btn btn-half">
            🔄
            <span>${texts.resizeImage}</span>
          </button>
          <button class="btn btn-select select-pos-btn btn-half">
            🎯
            <span>${texts.selectPosition}</span>
          </button>
        </div>
        
        <!-- Botones de control: Iniciar y Detener -->
        <div class="button-row painting-controls" style="display: none;">
          <button class="btn btn-start start-btn btn-half">
            ▶️
            <span>${texts.startPainting}</span>
          </button>
          <button class="btn btn-stop stop-btn btn-half">
            ⏹️
            <span>${texts.stopPainting}</span>
          </button>
        </div>
        
        <!-- Botones de utilidades -->
        <div class="button-row utility-controls" style="display: none;">
          <button class="btn btn-secondary save-progress-btn btn-half">
            💾
            <span>${texts.saveProgressBtn}</span>
          </button>
          <button class="btn btn-secondary log-window-btn btn-half">
            📋
            <span>${texts.logWindow || 'Logs'}</span>
          </button>
        </div>
        
        <!-- Guard JSON siempre disponible cuando hay datos -->
        <button class="btn btn-secondary guard-json-btn btn-full guard-controls" style="display: none;">
          🛡️
          <span>${texts.guardJsonBtn}</span>
        </button>
        
        <!-- Botón de inicialización oculto por defecto -->
        <button class="btn btn-primary init-btn btn-full" style="display: none;">
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
      </div> <!-- Fin collapsible-content -->
      
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
  
  // Referencias a elementos
  const elements = {
    header: container.querySelector('.header'),
    configBtn: container.querySelector('.config-btn'),
    minimizeBtn: container.querySelector('.minimize-btn'),
    configPanel: container.querySelector('.config-panel'),
    pixelsPerBatch: container.querySelector('.pixels-per-batch'),
    useAllCharges: container.querySelector('.use-all-charges'),
    paintPattern: container.querySelector('.paint-pattern'),
    showOverlay: container.querySelector('.show-overlay'),
    batchValue: container.querySelector('.batch-value'),
    cooldownValue: container.querySelector('.cooldown-value'),
    initBtn: container.querySelector('.init-btn'),
    uploadBtn: container.querySelector('.upload-btn'),
    loadProgressBtn: container.querySelector('.load-progress-btn'),
    saveProgressBtn: container.querySelector('.save-progress-btn'),
    guardJsonBtn: container.querySelector('.guard-json-btn'),
    resizeBtn: container.querySelector('.resize-btn'),
    selectPosBtn: container.querySelector('.select-pos-btn'),
    startBtn: container.querySelector('.start-btn'),
    stopBtn: container.querySelector('.stop-btn'),
    logWindowBtn: container.querySelector('.log-window-btn'),
    progressBar: container.querySelector('.progress-bar'),
    statsArea: container.querySelector('.stats-area'),
    status: container.querySelector('.status'),
    content: container.querySelector('.content'),
    // Contenedores de controles
    imageControls: container.querySelector('.image-controls'),
    paintingControls: container.querySelector('.painting-controls'),
    utilityControls: container.querySelector('.utility-controls'),
    guardControls: container.querySelector('.guard-controls')
  };
  
  // Estado actual de la interfaz (manejado por la función setState)
  

  
  // Estado de la UI
  let state = {
    minimized: false,
    configVisible: false
  };
  
  // Configuración persistente para tamaño y posición
  let windowConfig = {
    width: 300,
    height: 'auto',
    x: 20,
    y: 20
  };
  
  // Cargar configuración guardada
  function loadWindowConfig() {
    try {
      const saved = localStorage.getItem('wplace-auto-image-window-config');
      if (saved) {
        windowConfig = { ...windowConfig, ...JSON.parse(saved) };
        applyWindowConfig();
      }
    } catch (error) {
      console.warn('Error cargando configuración de ventana:', error);
    }
  }
  
  // Guardar configuración
  function saveWindowConfig() {
    try {
      localStorage.setItem('wplace-auto-image-window-config', JSON.stringify(windowConfig));
    } catch (error) {
      console.warn('Error guardando configuración de ventana:', error);
    }
  }
  
  // Aplicar configuración a la ventana
  function applyWindowConfig() {
    container.style.width = typeof windowConfig.width === 'number' ? windowConfig.width + 'px' : windowConfig.width;
    if (typeof windowConfig.height === 'number') {
      container.style.height = windowConfig.height + 'px';
    }
    container.style.left = windowConfig.x + 'px';
    container.style.top = windowConfig.y + 'px';
  }
  

  

  
  // Cargar configuración guardada
  loadWindowConfig();
  
  // Registrar ventana con el window manager para gestión de z-index y arrastre
  registerWindow(container);
  
  // Traer la ventana al frente inicialmente
  bringWindowToFront(container);
  
  // Hacer el header arrastrable manualmente para mantener guardado de posición
  makeDraggableWithSave(elements.header, container);
  
  // Función personalizada de arrastre que guarda la posición
  function makeDraggableWithSave(dragHandle, element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    dragHandle.style.cursor = 'move';
    dragHandle.addEventListener('mousedown', dragMouseDown);
    
    function dragMouseDown(e) {
      // Evitar arrastre si es un botón de la cabecera
      if (e.target.closest('.header-btn, .wplace-header-btn')) return;
      
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
    }
    
    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      const newTop = element.offsetTop - pos2;
      const newLeft = element.offsetLeft - pos1;
      
      // Limitar a los bordes de la ventana
      const maxLeft = window.innerWidth - element.offsetWidth;
      const maxTop = window.innerHeight - element.offsetHeight;
      
      const constrainedLeft = Math.max(0, Math.min(maxLeft, newLeft));
      const constrainedTop = Math.max(0, Math.min(maxTop, newTop));
      
      element.style.top = constrainedTop + "px";
      element.style.left = constrainedLeft + "px";
      
      // Actualizar configuración
      windowConfig.x = constrainedLeft;
      windowConfig.y = constrainedTop;
    }
    
    function closeDragElement() {
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
      // Guardar configuración al terminar el arrastre
      saveWindowConfig();
    }
  }
  
  // Event listeners
  elements.minimizeBtn.addEventListener('click', () => {
    const content = container.querySelector('.content');
    
    if (content.classList.contains('collapsed')) {
      // Restaurar ventana
      content.classList.remove('collapsed');
      container.classList.remove('minimized');
      elements.minimizeBtn.innerHTML = '➖';
    } else {
      // Minimizar ventana con animación suave
      content.classList.add('collapsed');
      container.classList.add('minimized');
      elements.minimizeBtn.innerHTML = '🔼';
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
  

  
  elements.paintPattern.addEventListener('change', () => {
    if (handlers.onConfigChange) {
      handlers.onConfigChange({ paintPattern: elements.paintPattern.value });
    }
  });
  
  // Funciones para mostrar/ocultar grupos de controles
  function showImageControls(show = true) {
    elements.imageControls.style.display = show ? 'flex' : 'none';
  }
  
  function showPaintingControls(show = true) {
    elements.paintingControls.style.display = show ? 'flex' : 'none';
  }
  
  function showUtilityControls(show = true) {
    elements.utilityControls.style.display = show ? 'flex' : 'none';
  }
  
  function showGuardControls(show = true) {
    elements.guardControls.style.display = show ? 'flex' : 'none';
  }
  
  // Función para mostrar controles cuando se carga una imagen
  function showControlsForImage() {
    showImageControls(true);
    showPaintingControls(true);
    showUtilityControls(true);
    showGuardControls(true);
    log('🔄 Controles de imagen mostrados');
  }
  
  // Función para mostrar controles cuando se carga progreso
  function showControlsForProgress() {
    showImageControls(false); // No necesita redimensionar/seleccionar
    showPaintingControls(true);
    showUtilityControls(true);
    showGuardControls(true);
    log('🔄 Controles de progreso mostrados');
  }
  
  // Función para ocultar controles (estado inicial)
  function hideAllControls() {
    showImageControls(false);
    showPaintingControls(false);
    showUtilityControls(false);
    showGuardControls(false);
    log('🔄 Todos los controles ocultos');
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
        showControlsForImage();
        // Abrir automáticamente el diálogo de redimensionar
        if (handlers.onResizeImage) {
          setTimeout(() => {
            handlers.onResizeImage();
          }, 500); // Pequeño delay para que la UI se actualice
        }
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
        showControlsForProgress();
      }
    }
  });
  
  // Event listener para el botón de guardar progreso
  elements.saveProgressBtn.addEventListener('click', () => {
    if (handlers.onSaveProgress) {
      handlers.onSaveProgress();
    }
  });
  
  // Event listener para Guard JSON
  elements.guardJsonBtn.addEventListener('click', async () => {
    try {
      if (!handlers.generateGuardJSON) {
        alert('No se puede generar el JSON del Guard en este momento.');
        return;
      }
      log('🛡️ Generando Guard JSON...');
      const data = await handlers.generateGuardJSON();
      if (!data) {
        alert('No hay datos disponibles para guardar.');
        return;
      }
      await saveGuardJSON(data);
    } catch (err) {
      console.error(err);
      alert('Error al generar o guardar el Guard JSON');
    }
  });
  
  elements.resizeBtn.addEventListener('click', () => {
    if (handlers.onResizeImage) {
      handlers.onResizeImage();
    }
  });
  

  
  // Event listeners para botones de selección de posición
  elements.selectPosBtn.addEventListener('click', async () => {
    if (handlers.onSelectPosition) {
      elements.selectPosBtn.disabled = true;
      const success = await handlers.onSelectPosition();
      if (success) {
        elements.startBtn.disabled = false;
      }
      elements.selectPosBtn.disabled = false;
    }
  });

  // Checkbox mostrar overlay
  elements.showOverlay.addEventListener('change', () => {
    if (!window.__WPA_PLAN_OVERLAY__) return;
    window.__WPA_PLAN_OVERLAY__.injectStyles();
    const isEnabled = elements.showOverlay.checked;
    window.__WPA_PLAN_OVERLAY__.setEnabled(isEnabled);
  });
  
  // Event listeners para botones de start/stop
  elements.startBtn.addEventListener('click', async () => {
    if (handlers.onStartPainting) {
      // Establecer estado de pintura activa
      setPaintingState(true);
      const success = await handlers.onStartPainting();
      if (!success) {
        // Si falla, volver al estado de no pintura
        setPaintingState(false);
      }
    }
  });
  
  elements.stopBtn.addEventListener('click', async () => {
    if (handlers.onStopPainting) {
      const shouldStop = await handlers.onStopPainting();
      if (shouldStop) {
        // Establecer estado de pintura inactiva
        setPaintingState(false);
      }
    }
  });
  
  // Variable para mantener referencia a la ventana de logs
  let logWindow = null;
  
  // Event listener para botón de logs
  elements.logWindowBtn.addEventListener('click', () => {
    if (!logWindow) {
      logWindow = createLogWindow('image');
      logWindow.show();
    } else {
      logWindow.toggle();
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
    hideAllControls();
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
    // Desregistrar ventana del window manager
    unregisterWindow(container);
    host.remove();
  }
  
  // Función para gestionar el estado de los botones según el estado de la pintura
  function setPaintingState(isPainting) {
    // Deshabilitar/habilitar botones de inicio según el estado
    elements.startBtn.disabled = isPainting;
    
    // Habilitar/deshabilitar botones de parada según el estado
    elements.stopBtn.disabled = !isPainting;

    // Asegurar botón Detener en rojo visible cuando está pintando
    if (isPainting) {
      elements.stopBtn.classList.add('btn-stop-running');
    } else {
      elements.stopBtn.classList.remove('btn-stop-running');
    }
    
    // Deshabilitar/habilitar botón de cargar progreso durante la pintura
    elements.loadProgressBtn.disabled = isPainting;
  }
  
  // Función para actualizar la interfaz con los valores del estado
  function updateUIFromState() {
    // Importar imageState dinámicamente para evitar dependencias circulares
    import('./config.js').then(({ imageState }) => {
      // Actualizar toggle de usar todas las cargas
      if (elements.useAllCharges) {
        elements.useAllCharges.checked = imageState.useAllChargesFirst;
      }
      
      // Actualizar selector de patrón de pintado
      if (elements.paintPattern && imageState.paintPattern) {
        elements.paintPattern.value = imageState.paintPattern;
      }
      
      // Actualizar toggle de mostrar overlay
      if (elements.showOverlay && imageState.showOverlay !== undefined) {
        elements.showOverlay.checked = imageState.showOverlay;
      }
      
      log('✅ Interfaz actualizada con valores del estado cargado');
    }).catch(error => {
      log('⚠️ Error actualizando interfaz desde estado:', error);
    });
  }
  
  // Crear ventana de redimensionamiento
  const resizeWindow = createResizeWindow();
  resizeWindow.initialize(root);
  
  // Función para actualizar textos dinámicamente
  function updateTexts(newTexts) {
    texts = newTexts;
    
    // Actualizar textos en elementos existentes
    const saveProgressBtn = container.querySelector('.save-progress-btn span');
    if (saveProgressBtn) saveProgressBtn.textContent = texts.saveProgressBtn;
    
    const guardJsonBtn = container.querySelector('.guard-json-btn span');
    if (guardJsonBtn) guardJsonBtn.textContent = texts.guardJsonBtn;
    
    // Actualizar etiquetas de configuración
    const paintPatternLabel = container.querySelector('.config-item label');
    if (paintPatternLabel && paintPatternLabel.textContent.includes('Patrón')) {
      paintPatternLabel.textContent = texts.paintPattern + ':';
    }
    
    // Actualizar opciones del select de patrones
    const patternSelect = container.querySelector('.paint-pattern');
    if (patternSelect) {
      const options = patternSelect.querySelectorAll('option');
      const patternKeys = [
        'patternLinearStart', 'patternLinearEnd', 'patternRandom', 'patternCenterOut',
        'patternCornersFirst', 'patternSpiral', 'patternSnake', 'patternDiagonalSweep',
        'patternBorders', 'patternCenter', 'patternQuadrants', 'patternBiasedRandom',
        'patternClusters', 'patternProximity', 'patternSweep', 'patternPriority',
        'patternAnchorPoints', 'patternSpiralCw', 'patternSpiralCccw'
      ];
      
      options.forEach((option, index) => {
        if (patternKeys[index] && texts[patternKeys[index]]) {
          const emoji = option.textContent.split(' ')[0];
          option.textContent = `${emoji} ${texts[patternKeys[index]]}`;
        }
      });
    }
  }

  log('✅ Interfaz de Auto-Image creada');
  
  // Inicializar en estado inicial (todo oculto)
  hideAllControls();
  
  return {
    setStatus,
    updateProgress,
    updateCooldownDisplay,
    updateCooldownMessage,
    setInitialized,
    setInitButtonVisible,
    enableButtonsAfterInit,
    showControlsForImage,
    showControlsForProgress,
    resetToInitialState,
    showResizeDialog: (processor) => {
      resizeWindow.showResizeDialog(processor, {
        getAvailableColors: handlers.getAvailableColors,
        onColorSelectionChange: handlers.onColorSelectionChange,
        onConfirmResize: handlers.onConfirmResize
      });
    },
    closeResizeDialog: () => {
      resizeWindow.closeResizeDialog();
    },
    setPaintingState,
    updateUIFromState,
    updateTexts,
    destroy,
    // Exponer generador de JSON para Auto-Guard si fue provisto por los handlers
    generateGuardJSON: handlers.generateGuardJSON,
    elements
  };
}
