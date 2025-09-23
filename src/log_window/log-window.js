import { log } from '../core/logger.js';
import { registerWindow, unregisterWindow, bringWindowToFront } from '../core/window-manager.js';


/**
 * Ventana de logs unificada para todos los bots
 * Características:
 * - Muestra logs en tiempo real
 * - Redimensionable mediante arrastre
 * - Controles para cerrar y descargar logs
 * - Persistencia del estado entre sesiones
 * - Integración con todos los bots
 */

class LogWindow {
  constructor(botName = 'Bot') {
    this.botName = botName;
    this.isVisible = false;
    this.logs = [];
    this.maxLogs = 1000; // Límite de logs para evitar problemas de memoria
    this.container = null;
    this.logContent = null;
    this.isResizing = false;
    this.resizeHandle = null;
    this.originalConsole = {};
    
    // Configuración por defecto
    this.config = {
      width: 600,
      height: 400,
      x: window.innerWidth - 620,
      y: 20,
      visible: false
    };
    
    this.loadConfig();
    this.createWindow();
    this.setupLogInterception();
    this.setupEventListeners();
  }

  /**
   * Carga la configuración guardada del localStorage
   */
  loadConfig() {
    try {
      const saved = localStorage.getItem(`wplace-log-window-${this.botName}`);
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (error) {
      log('Error cargando configuración de ventana de logs:', error);
    }
  }

  /**
   * Guarda la configuración actual en localStorage
   */
  saveConfig() {
    try {
      localStorage.setItem(`wplace-log-window-${this.botName}`, JSON.stringify(this.config));
    } catch (error) {
      log('Error guardando configuración de ventana de logs:', error);
    }
  }

  /**
   * Crea la estructura HTML de la ventana
   */
  createWindow() {
    this.container = document.createElement('div');
    this.container.className = 'wplace-log-window';
    this.container.style.cssText = `
      position: fixed;
      left: ${this.config.x}px;
      top: ${this.config.y}px;
      width: ${this.config.width}px;
      height: ${this.config.height}px;
      background: rgba(0, 0, 0, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      z-index: 100001;
      display: ${this.config.visible ? 'flex' : 'none'};
      flex-direction: column;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      color: #fff;
      resize: none;
      overflow: hidden;
    `;

    // Header con título y controles
    const header = document.createElement('div');
    header.className = 'log-window-header';
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      cursor: move;
      user-select: none;
      border-radius: 7px 7px 0 0;
    `;

    const title = document.createElement('div');
    title.textContent = `📋 Logs - ${this.botName}`;
    title.style.cssText = `
      font-weight: bold;
      font-size: 14px;
      color: #e2e8f0;
    `;

    const controls = document.createElement('div');
    controls.style.cssText = `
      display: flex;
      gap: 8px;
    `;

    // Botón de descarga
    const downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = '💾';
    downloadBtn.title = 'Descargar logs';
    downloadBtn.style.cssText = `
      background: rgba(34, 197, 94, 0.8);
      border: none;
      border-radius: 4px;
      color: white;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    `;
    downloadBtn.addEventListener('mouseenter', () => {
      downloadBtn.style.background = 'rgba(34, 197, 94, 1)';
    });
    downloadBtn.addEventListener('mouseleave', () => {
      downloadBtn.style.background = 'rgba(34, 197, 94, 0.8)';
    });
    downloadBtn.addEventListener('click', () => this.downloadLogs());

    // Botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Cerrar ventana';
    closeBtn.style.cssText = `
      background: rgba(239, 68, 68, 0.8);
      border: none;
      border-radius: 4px;
      color: white;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    `;
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'rgba(239, 68, 68, 1)';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'rgba(239, 68, 68, 0.8)';
    });
    closeBtn.addEventListener('click', () => this.hide());

    controls.appendChild(downloadBtn);
    controls.appendChild(closeBtn);
    header.appendChild(title);
    header.appendChild(controls);

    // Contenido de logs
    this.logContent = document.createElement('div');
    this.logContent.className = 'log-window-content';
    this.logContent.style.cssText = `
      flex: 1;
      padding: 8px;
      overflow-y: auto;
      font-size: 12px;
      line-height: 1.4;
      white-space: pre-wrap;
      word-break: break-word;
    `;

    // Handle de redimensionamiento
    this.resizeHandle = document.createElement('div');
    this.resizeHandle.className = 'log-window-resize-handle';
    this.resizeHandle.style.cssText = `
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
      background: linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%);
      border-radius: 0 0 8px 0;
    `;

    this.container.appendChild(header);
    this.container.appendChild(this.logContent);
    this.container.appendChild(this.resizeHandle);
    document.body.appendChild(this.container);

    // Registrar ventana para manejo de z-index
    registerWindow(this.container);

    // Configurar arrastre de ventana
    this.setupDragging(header);
    // Configurar redimensionamiento
    this.setupResizing();

    this.isVisible = this.config.visible;
  }

  /**
   * Configura el arrastre de la ventana
   */
  setupDragging(header) {
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    header.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      isDragging = true;
      dragOffset.x = e.clientX - this.container.offsetLeft;
      dragOffset.y = e.clientY - this.container.offsetTop;
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
      e.preventDefault();
    });

    const handleDrag = (e) => {
      if (!isDragging) return;
      const newX = Math.max(0, Math.min(window.innerWidth - this.container.offsetWidth, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - this.container.offsetHeight, e.clientY - dragOffset.y));
      this.container.style.left = newX + 'px';
      this.container.style.top = newY + 'px';
      this.config.x = newX;
      this.config.y = newY;
    };

    const stopDrag = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDrag);
      this.saveConfig();
    };
  }

  /**
   * Configura el redimensionamiento de la ventana
   */
  setupResizing() {
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    this.resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(this.container).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(this.container).height, 10);
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
      e.preventDefault();
    });

    const handleResize = (e) => {
      if (!isResizing) return;
      const newWidth = Math.max(300, startWidth + e.clientX - startX);
      const newHeight = Math.max(200, startHeight + e.clientY - startY);
      this.container.style.width = newWidth + 'px';
      this.container.style.height = newHeight + 'px';
      this.config.width = newWidth;
      this.config.height = newHeight;
    };

    const stopResize = () => {
      isResizing = false;
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
      this.saveConfig();
    };
  }

  /**
   * Configura la interceptación de logs de consola
   */
  setupLogInterception() {
    // Guardar referencias originales
    this.originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      debug: console.debug
    };

    // Interceptar console.log
    console.log = (...args) => {
      this.originalConsole.log.apply(console, args);
      this.addLog('log', args);
    };

    // Interceptar console.info
    console.info = (...args) => {
      this.originalConsole.info.apply(console, args);
      this.addLog('info', args);
    };

    // Interceptar console.warn
    console.warn = (...args) => {
      this.originalConsole.warn.apply(console, args);
      this.addLog('warn', args);
    };

    // Interceptar console.error
    console.error = (...args) => {
      this.originalConsole.error.apply(console, args);
      this.addLog('error', args);
    };

    // Interceptar console.debug
    console.debug = (...args) => {
      this.originalConsole.debug.apply(console, args);
      this.addLog('debug', args);
    };
  }

  /**
   * Añade un log a la ventana
   */
  addLog(type, args) {
    const timestamp = new Date().toLocaleTimeString();
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ');

    const logEntry = {
      timestamp,
      type,
      message,
      raw: args
    };

    this.logs.push(logEntry);

    // Limitar número de logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Actualizar UI si está visible
    if (this.isVisible) {
      this.updateLogDisplay();
    }
  }

  /**
   * Actualiza la visualización de logs
   */
  updateLogDisplay() {
    if (!this.logContent) return;

    const logHtml = this.logs.map(entry => {
      const color = this.getLogColor(entry.type);
      return `<div style="color: ${color}; margin-bottom: 2px;">[${entry.timestamp}] ${entry.message}</div>`;
    }).join('');

    this.logContent.innerHTML = logHtml;
    
    // Auto-scroll al final
    this.logContent.scrollTop = this.logContent.scrollHeight;
  }

  /**
   * Obtiene el color para cada tipo de log
   */
  getLogColor(type) {
    const colors = {
      log: '#e2e8f0',
      info: '#60a5fa',
      warn: '#fbbf24',
      error: '#f87171',
      debug: '#a78bfa'
    };
    return colors[type] || colors.log;
  }

  /**
   * Descarga los logs como archivo
   */
  downloadLogs() {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    const filename = `log_${this.botName}_${dateStr}_${timeStr}.log`;

    const logText = this.logs.map(entry => 
      `[${entry.timestamp}] [${entry.type.toUpperCase()}] ${entry.message}`
    ).join('\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    log(`📥 Logs descargados como: ${filename}`);
  }

  /**
   * Muestra la ventana de logs
   */
  show() {
    if (this.container) {
      this.container.style.display = 'flex';
      bringWindowToFront(this.container);
      this.isVisible = true;
      this.config.visible = true;
      this.updateLogDisplay();
      this.saveConfig();
    }
  }

  /**
   * Oculta la ventana de logs
   */
  hide() {
    if (this.container) {
      this.container.style.display = 'none';
      this.isVisible = false;
      this.config.visible = false;
      this.saveConfig();
    }
  }

  /**
   * Alterna la visibilidad de la ventana
   */
  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Limpia todos los logs
   */
  clear() {
    this.logs = [];
    if (this.logContent) {
      this.logContent.innerHTML = '';
    }
  }

  /**
   * Configura los event listeners globales
   */
  setupEventListeners() {
    // Ajustar posición al redimensionar ventana
    window.addEventListener('resize', () => {
      if (this.container) {
        const maxX = window.innerWidth - this.container.offsetWidth;
        const maxY = window.innerHeight - this.container.offsetHeight;
        
        if (this.config.x > maxX) {
          this.config.x = Math.max(0, maxX);
          this.container.style.left = this.config.x + 'px';
        }
        
        if (this.config.y > maxY) {
          this.config.y = Math.max(0, maxY);
          this.container.style.top = this.config.y + 'px';
        }
        
        this.saveConfig();
      }
    });
  }

  /**
   * Destruye la ventana y restaura console original
   */
  destroy() {
    // Restaurar console original
    if (this.originalConsole.log) {
      console.log = this.originalConsole.log;
      console.info = this.originalConsole.info;
      console.warn = this.originalConsole.warn;
      console.error = this.originalConsole.error;
      console.debug = this.originalConsole.debug;
    }

    // Remover ventana del DOM
    if (this.container && this.container.parentNode) {
      // Desregistrar ventana del gestor
      unregisterWindow(this.container);
      this.container.parentNode.removeChild(this.container);
    }

    this.container = null;
    this.logContent = null;
    this.logs = [];
  }
}

// Instancia global para gestionar ventanas de logs
window.__wplaceLogWindows = window.__wplaceLogWindows || {};

/**
 * Crea o obtiene una ventana de logs para un bot específico
 * @param {string} botName - Nombre del bot
 * @returns {LogWindow} - Instancia de la ventana de logs
 */
export function createLogWindow(botName) {
  if (!window.__wplaceLogWindows[botName]) {
    window.__wplaceLogWindows[botName] = new LogWindow(botName);
  }
  return window.__wplaceLogWindows[botName];
}

/**
 * Obtiene la ventana de logs de un bot específico
 * @param {string} botName - Nombre del bot
 * @returns {LogWindow|null} - Instancia de la ventana de logs o null si no existe
 */
export function getLogWindow(botName) {
  return window.__wplaceLogWindows[botName] || null;
}

/**
 * Destruye la ventana de logs de un bot específico
 * @param {string} botName - Nombre del bot
 */
export function destroyLogWindow(botName) {
  if (window.__wplaceLogWindows[botName]) {
    window.__wplaceLogWindows[botName].destroy();
    delete window.__wplaceLogWindows[botName];
  }
}

/**
 * Destruye todas las ventanas de logs
 */
export function destroyAllLogWindows() {
  Object.keys(window.__wplaceLogWindows).forEach(botName => {
    destroyLogWindow(botName);
  });
}

export { LogWindow };