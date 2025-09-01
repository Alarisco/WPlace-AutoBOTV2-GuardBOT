import { log } from '../core/logger.js';
import { createShadowRoot, makeDraggable } from '../core/ui-utils.js';
import { createLogWindow } from '../log_window/index.js';
import { createPaintingStatsWindow } from './painting-stats.js';
import { createColorPaletteSelector } from './color-palette-selector.js';

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
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 90vh;
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

    .btn-tertiary {
      background: #374151;
      color: #d1d5db;
      font-size: 12px;
    }

    .btn-tertiary:hover {
      background: #4b5563;
    }

    .btn-danger {
      background: #dc2626;
      color: white;
      font-size: 12px;
    }

    .btn-danger:hover {
      background: #b91c1c;
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

    /* Resize handle */
    .resize-handle {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
      background: linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%);
      border-radius: 0 0 8px 0;
      z-index: 10;
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

        <!-- Botones movidos al final: Guardar progreso y Logs -->
        <button class="btn btn-secondary save-progress-btn" data-state="load-progress,upload-image" style="display: none;">
          💾
          <span>Guardar progreso</span>
        </button>
        <button class="btn btn-tertiary load-storage-btn" data-state="initial,load-progress,upload-image">
          📂
          <span>Cargar desde navegador</span>
        </button>
        <button class="btn btn-danger clear-storage-btn" data-state="initial,load-progress,upload-image">
          🗑️
          <span>Borrar del navegador</span>
        </button>
        <button class="btn btn-secondary log-window-btn" data-state="initial,load-progress,upload-image">
          📋
          <span>${texts.logWindow || 'Logs'}</span>
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

      <!-- Handle de redimensionamiento -->
      <div class="resize-handle"></div>
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

    paintPattern: container.querySelector('.paint-pattern'),
    showOverlay: container.querySelector('.show-overlay'),
    batchValue: container.querySelector('.batch-value'),
    cooldownValue: container.querySelector('.cooldown-value'),
    initBtn: container.querySelector('.init-btn'),
    uploadBtn: container.querySelector('.upload-btn'),
    loadProgressBtn: container.querySelector('.load-progress-btn'),
    loadProgressBtnFlow: container.querySelector('.load-progress-btn-flow'),
    saveProgressBtn: container.querySelector('.save-progress-btn'),
    loadStorageBtn: container.querySelector('.load-storage-btn'),
    clearStorageBtn: container.querySelector('.clear-storage-btn'),

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
    content: container.querySelector('.content'),
    resizeHandle: container.querySelector('.resize-handle'),
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
    cancelBtn: resizeContainer.querySelector('.cancel-resize'),
  };

  // Estado de la UI
  let state = {
    minimized: false,
    configVisible: false,
  };

  // Configuración persistente para tamaño y posición
  let windowConfig = {
    width: 300,
    height: 'auto',
    x: 20,
    y: 20,
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
    container.style.width =
      typeof windowConfig.width === 'number' ? windowConfig.width + 'px' : windowConfig.width;
    if (typeof windowConfig.height === 'number') {
      container.style.height = windowConfig.height + 'px';
    }
    container.style.left = windowConfig.x + 'px';
    container.style.top = windowConfig.y + 'px';
  }

  // Configurar redimensionamiento
  function setupResizing() {
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    elements.resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);

      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
      e.preventDefault();
    });

    const handleResize = (e) => {
      if (!isResizing) return;

      const newWidth = Math.max(250, startWidth + e.clientX - startX);
      const newHeight = Math.max(200, startHeight + e.clientY - startY);

      container.style.width = newWidth + 'px';
      container.style.height = newHeight + 'px';

      windowConfig.width = newWidth;
      windowConfig.height = newHeight;

      // Escalar elementos según el nuevo tamaño
      scaleElements(newWidth);
    };

    const stopResize = () => {
      isResizing = false;
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
      saveWindowConfig();
    };
  }

  // Escalar elementos según el tamaño de la ventana
  function scaleElements(width) {
    const baseWidth = 300;
    const scale = Math.max(0.8, Math.min(1.2, width / baseWidth));

    // Escalar fuentes
    const scaledFontSize = Math.round(14 * scale);
    container.style.fontSize = scaledFontSize + 'px';

    // Escalar botones
    const buttons = container.querySelectorAll('.btn');
    buttons.forEach((btn) => {
      const scaledPadding = Math.round(10 * scale);
      btn.style.padding = scaledPadding + 'px';
    });

    // Escalar header
    const header = container.querySelector('.header');
    if (header) {
      const scaledHeaderPadding = Math.round(12 * scale);
      header.style.padding = scaledHeaderPadding + 'px ' + Math.round(15 * scale) + 'px';
    }

    // Escalar contenido
    const content = container.querySelector('.content');
    if (content) {
      const scaledContentPadding = Math.round(15 * scale);
      content.style.padding = scaledContentPadding + 'px';
    }
  }

  // Cargar configuración guardada
  loadWindowConfig();

  // Configurar redimensionamiento
  setupResizing();

  // Hacer draggable con guardado de posición
  makeDraggableWithSave(elements.header, container);

  // Función personalizada de arrastre que guarda la posición
  function makeDraggableWithSave(dragHandle, element) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

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

      element.style.top = constrainedTop + 'px';
      element.style.left = constrainedLeft + 'px';

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

  elements.paintPattern.addEventListener('change', () => {
    if (handlers.onConfigChange) {
      handlers.onConfigChange({ paintPattern: elements.paintPattern.value });
    }
  });

  // Función para cambiar el estado de la interfaz
  function setState(newState) {
    // Ocultar todos los botones
    const allButtons = container.querySelectorAll('[data-state]');
    allButtons.forEach((btn) => {
      btn.style.display = 'none';
    });

    // Mostrar botones del estado actual
    const stateButtons = container.querySelectorAll(`[data-state*="${newState}"]`);
    stateButtons.forEach((btn) => {
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

  // Event listener para el botón de guardar progreso
  elements.saveProgressBtn.addEventListener('click', () => {
    if (handlers.onSaveProgress) {
      handlers.onSaveProgress();
    }
  });

  // Event listener para cargar desde localStorage
  elements.loadStorageBtn.addEventListener('click', async () => {
    try {
      // Importar las funciones de localStorage
      const { loadFromLocalStorage, startAutoSave } = await import('./save-load.js');

      const result = loadFromLocalStorage();
      if (result) {
        log('✅ Progreso cargado desde navegador');

        // Iniciar auto-guardado
        startAutoSave(2); // Auto-guardar cada 2 minutos

        // Actualizar interfaz
        setState('load-progress');

        // Notificar al handler si existe
        if (handlers.onLoadFromStorage) {
          handlers.onLoadFromStorage(result);
        }
      } else {
        log('⚠️ No hay progreso guardado en el navegador');
      }
    } catch (error) {
      log('❌ Error cargando desde navegador:', error);
    }
  });

  // Event listener para limpiar localStorage
  elements.clearStorageBtn.addEventListener('click', async () => {
    try {
      if (
        window.confirm(
          '¿Estás seguro de que quieres borrar el progreso guardado en el navegador? Esta acción no se puede deshacer.',
        )
      ) {
        const { clearLocalStorage, stopAutoSave } = await import('./save-load.js');

        const success = clearLocalStorage();
        if (success) {
          log('✅ Progreso eliminado del navegador');

          // Detener auto-guardado
          stopAutoSave();

          // Resetear interfaz
          setState('initial');
        } else {
          log('❌ Error eliminando progreso del navegador');
        }
      }
    } catch (error) {
      log('❌ Error eliminando progreso:', error);
    }
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
      // Establecer estado de pintura activa
      setPaintingState(true);

      // Iniciar auto-guardado en localStorage
      try {
        const { startAutoSave } = await import('./save-load.js');
        startAutoSave(2); // Auto-guardar cada 2 minutos
        log('🔄 Auto-guardado iniciado');
      } catch (error) {
        log('⚠️ Error iniciando auto-guardado:', error);
      }

      const success = await handlers.onStartPainting();
      if (!success) {
        // Si falla, volver al estado de no pintura
        setPaintingState(false);
      }
    }
  };

  const handleStopPainting = async (startBtn, stopBtn) => {
    if (handlers.onStopPainting) {
      const shouldStop = await handlers.onStopPainting();
      if (shouldStop) {
        // Establecer estado de pintura inactiva
        setPaintingState(false);

        // Detener auto-guardado y hacer un último guardado
        try {
          const { stopAutoSave, saveToLocalStorage } = await import('./save-load.js');
          stopAutoSave();
          saveToLocalStorage(); // Guardado final
          log('⏹️ Auto-guardado detenido y progreso guardado');
        } catch (error) {
          log('⚠️ Error deteniendo auto-guardado:', error);
        }
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
        availableColors,
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
    allButtons.forEach((btn) => {
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

  // Función para gestionar el estado de los botones según el estado de la pintura
  function setPaintingState(isPainting) {
    // Deshabilitar/habilitar botones de inicio según el estado
    elements.startBtn.disabled = isPainting;
    elements.startBtnUpload.disabled = isPainting;

    // Habilitar/deshabilitar botones de parada según el estado
    elements.stopBtn.disabled = !isPainting;
    elements.stopBtnUpload.disabled = !isPainting;

    // Deshabilitar/habilitar botón de cargar progreso durante la pintura
    elements.loadProgressBtn.disabled = isPainting;
  }

  log('✅ Interfaz de Auto-Image creada');

  // Inicializar en estado inicial
  setState('initial');

  // Intentar cargar progreso automáticamente desde localStorage
  setTimeout(async () => {
    try {
      const { loadFromLocalStorage } = await import('./save-load.js');
      const result = loadFromLocalStorage();
      if (result) {
        log('📂 Progreso encontrado en localStorage, cargando automáticamente...');
        setState('load-progress');

        // Notificar al handler si existe
        if (handlers.onLoadFromStorage) {
          handlers.onLoadFromStorage(result);
        }
      }
    } catch (error) {
      log('⚠️ Error verificando localStorage:', error);
    }
  }, 1000); // Esperar 1 segundo para que todo esté inicializado

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
    setPaintingState,
    destroy,
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
