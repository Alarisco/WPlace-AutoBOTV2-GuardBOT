import { log } from "../core/logger.js";
import { createShadowRoot, makeDraggable } from "../core/ui-utils.js";

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
  `;
  root.appendChild(style);
  
  // Crear contenedor principal
  const container = document.createElement('div');
  container.className = 'container';
  container.innerHTML = `
    <div class="header">
      <div class="header-title">
        <i class="fas fa-image"></i>
        <span>${texts.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuración">
          <i class="fas fa-cog"></i>
        </button>
        <button class="header-btn minimize-btn" title="${texts.minimize}">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${texts.pixelsPerBatch}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="10">
        </div>
      </div>
      
      <div class="controls">
        <button class="btn btn-primary init-btn">
          <i class="fas fa-robot"></i>
          <span>${texts.initBot}</span>
        </button>
        <button class="btn btn-upload upload-btn" disabled>
          <i class="fas fa-upload"></i>
          <span>${texts.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          <i class="fas fa-file-import"></i>
          <span>${texts.loadProgress}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          <i class="fas fa-crosshairs"></i>
          <span>${texts.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          <i class="fas fa-play"></i>
          <span>${texts.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          <i class="fas fa-stop"></i>
          <span>${texts.stopPainting}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-info-circle"></i> ${texts.initMessage}</div>
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
  
  // Referencias a elementos
  const elements = {
    header: container.querySelector('.header'),
    configBtn: container.querySelector('.config-btn'),
    minimizeBtn: container.querySelector('.minimize-btn'),
    configPanel: container.querySelector('.config-panel'),
    pixelsPerBatch: container.querySelector('.pixels-per-batch'),
    initBtn: container.querySelector('.init-btn'),
    uploadBtn: container.querySelector('.upload-btn'),
    loadProgressBtn: container.querySelector('.load-progress-btn'),
    selectPosBtn: container.querySelector('.select-pos-btn'),
    startBtn: container.querySelector('.start-btn'),
    stopBtn: container.querySelector('.stop-btn'),
    progressBar: container.querySelector('.progress-bar'),
    statsArea: container.querySelector('.stats-area'),
    status: container.querySelector('.status'),
    content: container.querySelector('.content')
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
      elements.minimizeBtn.innerHTML = '<i class="fas fa-expand"></i>';
    } else {
      container.classList.remove('minimized');
      elements.minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
    }
  });
  
  elements.configBtn.addEventListener('click', () => {
    state.configVisible = !state.configVisible;
    if (state.configVisible) {
      elements.configPanel.classList.add('visible');
      elements.configBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      elements.configPanel.classList.remove('visible');
      elements.configBtn.innerHTML = '<i class="fas fa-cog"></i>';
    }
  });
  
  elements.initBtn.addEventListener('click', async () => {
    elements.initBtn.disabled = true;
    if (handlers.onInitBot) {
      const success = await handlers.onInitBot();
      if (success) {
        elements.uploadBtn.disabled = false;
        elements.loadProgressBtn.disabled = false;
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
        elements.selectPosBtn.disabled = false;
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
        elements.selectPosBtn.disabled = false;
        elements.startBtn.disabled = false;
      }
    }
  });
  
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
  
  elements.startBtn.addEventListener('click', async () => {
    if (handlers.onStartPainting) {
      elements.startBtn.disabled = true;
      elements.stopBtn.disabled = false;
      const success = await handlers.onStartPainting();
      if (!success) {
        elements.startBtn.disabled = false;
        elements.stopBtn.disabled = true;
      }
    }
  });
  
  elements.stopBtn.addEventListener('click', async () => {
    if (handlers.onStopPainting) {
      const shouldStop = await handlers.onStopPainting();
      if (shouldStop) {
        elements.startBtn.disabled = false;
        elements.stopBtn.disabled = true;
      }
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
        <div class="stat-label"><i class="fas fa-palette"></i> ${texts.progress}</div>
        <div>${current}/${total} (${percentage.toFixed(1)}%)</div>
      </div>
    `;
    
    // Agregar información del usuario si está disponible
    if (userInfo) {
      // Mostrar nombre de usuario
      if (userInfo.username) {
        statsHTML += `
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-user"></i> Usuario</div>
            <div>${userInfo.username}</div>
          </div>
        `;
      }
      
      // Mostrar cargas (número entero)
      if (userInfo.charges !== undefined) {
        statsHTML += `
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-bolt"></i> ${texts.charges}</div>
            <div>${Math.floor(userInfo.charges)}</div>
          </div>
        `;
      }
      
      // Mostrar píxeles pintados del usuario
      if (userInfo.pixels !== undefined) {
        statsHTML += `
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-cube"></i> ${texts.pixels}</div>
            <div>${userInfo.pixels.toLocaleString()}</div>
          </div>
        `;
      }
    }
    
    elements.statsArea.innerHTML = statsHTML;
  }
  
  function destroy() {
    host.remove();
  }
  
  log('✅ Interfaz de Auto-Image creada');
  
  return {
    setStatus,
    updateProgress,
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
