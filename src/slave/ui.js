import { log } from "../core/logger.js";
import { createShadowRoot, makeDraggable } from "../core/ui-utils.js";
import { SLAVE_CONFIG, getSlaveTexts } from "./config.js";
import { t } from "../locales/index.js";

export function createSlaveUI({ 
  onConnect, 
  onDisconnect,
  onClose
}) {
  log('🎛️ Creando interfaz del Slave');
  
  // Verificar si ya existe un panel para evitar duplicados
  const existing = document.getElementById('wpl-slave-panel');
  if (existing) {
    existing.remove();
    log('🗑️ Panel de slave existente removido');
  }
  
  const texts = getSlaveTexts() || {
    title: 'WPlace Slave',
    masterServer: 'Servidor Maestro',
    ipAddress: 'Dirección IP',
    connect: 'Conectar',
    disconnect: 'Desconectar',
    status: 'Estado',
    slaveId: 'ID Slave',
    mode: 'Modo',
    running: 'Ejecutando',
    idle: 'Inactivo',
    connected: 'Conectado',
    connecting: 'Conectando...',
    disconnected: 'Desconectado',
    error: 'Error',
    close: 'Cerrar',
    telemetry: 'Telemetría',
    repairedPixels: 'Píxeles Reparados',
    missingPixels: 'Píxeles Faltantes',
    absentPixels: 'Píxeles Ausentes',
    remainingCharges: 'Cargas Restantes'
  };
  
  const { host, root } = createShadowRoot('wpl-slave-panel');
  
  // Crear estilos
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .panel {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 320px;
      background: ${SLAVE_CONFIG.THEME.primary};
      border: 1px solid ${SLAVE_CONFIG.THEME.accent};
      border-radius: 10px;
      color: ${SLAVE_CONFIG.THEME.text};
      font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial;
      z-index: 999999;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      overflow: hidden;
      animation: slideIn 0.3s ease-out;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: ${SLAVE_CONFIG.THEME.secondary};
      padding: 10px 12px;
      color: ${SLAVE_CONFIG.THEME.highlight};
      font-weight: 600;
      cursor: move;
      user-select: none;
    }
    
    .body {
      padding: 12px;
    }
    
    .connection-section {
      background: ${SLAVE_CONFIG.THEME.secondary};
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .favorites {
      margin-top: 8px;
    }
    .fav-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 6px 8px;
      border-radius: 6px;
      background: ${SLAVE_CONFIG.THEME.primary};
      transition: background 0.2s ease;
    }
    .fav-header:hover { background: ${SLAVE_CONFIG.THEME.accent}; }
    .fav-title { font-size: 12px; opacity: 0.9; }
    .fav-chevron { transition: transform 0.2s ease; }
    .fav-chevron.open { transform: rotate(90deg); }
    .fav-list {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.25s ease;
    }
    .fav-list.open { max-height: 240px; }
    .fav-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 8px;
      border-bottom: 1px solid ${SLAVE_CONFIG.THEME.accent};
      font-size: 12px;
    }
    .fav-actions { display: flex; gap: 6px; }
    .star-btn {
      background: transparent;
      color: ${SLAVE_CONFIG.THEME.highlight};
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
    .mini-btn {
      background: ${SLAVE_CONFIG.THEME.accent};
      border: none;
      color: ${SLAVE_CONFIG.THEME.text};
      padding: 4px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
    }
    
    .input-group {
      margin-bottom: 10px;
    }
    
    .label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 4px;
      color: ${SLAVE_CONFIG.THEME.text};
    }
    
    .input {
      width: 100%;
      padding: 8px;
      border: 1px solid ${SLAVE_CONFIG.THEME.accent};
      border-radius: 6px;
      background: ${SLAVE_CONFIG.THEME.primary};
      color: ${SLAVE_CONFIG.THEME.text};
      font-size: 14px;
      box-sizing: border-box;
    }
    
    .input:focus {
      outline: none;
      border-color: ${SLAVE_CONFIG.THEME.highlight};
    }
    
    .btn {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn.connect {
      background: ${SLAVE_CONFIG.THEME.success};
      color: ${SLAVE_CONFIG.THEME.primary};
    }
    
    .btn.connect:hover:not(:disabled) {
      background: #00cc00;
    }
    
    .btn.disconnect {
      background: ${SLAVE_CONFIG.THEME.error};
      color: white;
    }
    
    .btn.disconnect:hover:not(:disabled) {
      background: #cc0000;
    }
    
    .btn.close {
      background: ${SLAVE_CONFIG.THEME.accent};
      color: ${SLAVE_CONFIG.THEME.text};
    }
    
    .btn.close:hover:not(:disabled) {
      background: ${SLAVE_CONFIG.THEME.highlight};
    }
    
    .status-indicator {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .status-indicator.connected {
      background: ${SLAVE_CONFIG.THEME.connected};
    }
    
    .status-indicator.connecting {
      background: ${SLAVE_CONFIG.THEME.connecting};
      animation: pulse 1s infinite;
    }
    
    .status-indicator.disconnected {
      background: ${SLAVE_CONFIG.THEME.disconnected};
    }
    
    .status-indicator.error {
      background: ${SLAVE_CONFIG.THEME.error};
    }
    
    .status-section {
      background: ${SLAVE_CONFIG.THEME.secondary};
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    
    .status-row {
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
      font-size: 13px;
    }
    
    .status-value {
      font-weight: 600;
    }
    
  /* Telemetría oculta: estilos eliminados */
    
    .minimized {
      width: 200px;
    }
    
    .minimized .body {
      display: none;
    }
    
    .error-message {
      background: rgba(255, 0, 0, 0.1);
      border: 1px solid ${SLAVE_CONFIG.THEME.error};
      color: ${SLAVE_CONFIG.THEME.error};
      padding: 8px;
      border-radius: 6px;
      font-size: 12px;
      margin-bottom: 10px;
    }
  `;
  root.appendChild(style);
  
  // Crear panel principal
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = `
    <div class="header">
      <div>${texts.title}</div>
      <button class="btn close close-btn" style="width: auto; padding: 4px 8px; margin: 0;">✕</button>
    </div>
    <div class="body">
      <div class="connection-section">
        <div class="input-group">
          <label class="label">${texts.masterServer}</label>
          <div style="display:flex; gap:6px; align-items:center;">
            <input type="text" class="input master-url-input" value="ws://localhost:8000/ws/slave" placeholder="host o ip (ej. 10.0.0.5:8000)" style="flex:1;">
            <button class="star-btn" title="Guardar como favorito">☆</button>
          </div>
          <div class="favorites">
            <div class="fav-header">
              <span class="fav-title">Servidores guardados</span>
              <span class="fav-chevron">▶</span>
            </div>
            <div class="fav-list"></div>
          </div>
        </div>
        <button class="btn connect connect-btn">${texts.connect}</button>
        <button class="btn disconnect disconnect-btn" style="display: none;">${texts.disconnect}</button>
        <div class="error-message error-display" style="display: none;"></div>
      </div>
      
      <div class="status-section">
        <div class="status-row">
          <span>${texts.status}</span>
          <span class="status-value">
            <span class="status-indicator disconnected"></span>
            <span class="status-text">${texts.disconnected}</span>
          </span>
        </div>
        <div class="status-row">
          <span>${texts.slaveId}</span>
          <span class="status-value slave-id">-</span>
        </div>
        <div class="status-row">
          <span>${texts.mode}</span>
          <span class="status-value current-mode">-</span>
        </div>
        <div class="status-row">
          <span>${texts.running}</span>
          <span class="status-value running-status">${texts.idle}</span>
        </div>
      </div>
      
  <!-- Telemetría oculta -->
      
      <button class="btn close close-panel-btn">${texts.close}</button>
    </div>
  `;
  
  root.appendChild(panel);
  
  // Referencias a elementos
  const elements = {
    header: panel.querySelector('.header'),
    masterUrlInput: panel.querySelector('.master-url-input'),
  connectBtn: panel.querySelector('.connect-btn'),
    disconnectBtn: panel.querySelector('.disconnect-btn'),
    closeBtn: panel.querySelector('.close-btn'),
    closePanelBtn: panel.querySelector('.close-panel-btn'),
    errorDisplay: panel.querySelector('.error-display'),
    statusIndicator: panel.querySelector('.status-indicator'),
    statusText: panel.querySelector('.status-text'),
    slaveId: panel.querySelector('.slave-id'),
    currentMode: panel.querySelector('.current-mode'),
    runningStatus: panel.querySelector('.running-status'),
  starBtn: panel.querySelector('.star-btn'),
  favHeader: panel.querySelector('.fav-header'),
  favChevron: panel.querySelector('.fav-chevron'),
  favList: panel.querySelector('.fav-list')
  };
  
  // Hacer draggable
  makeDraggable(elements.header, panel);
  
  // Utilidades URL
  function isLocalhostName(name) {
    return name === 'localhost' || name === '127.0.0.1' || name === '::1';
  }
  function normalizeWsUrl(raw) {
    try {
      if (!raw) return '';
      let v = String(raw).trim();
      // http(s) -> ws(s)
      v = v.replace(/^http:\/\//i, 'ws://').replace(/^https:\/\//i, 'wss://');
      // Añadir esquema si falta
      if (!/^[a-z]+:\/\//i.test(v)) {
        const scheme = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        v = scheme + v;
      }
      // Asegurar ruta por defecto si solo host[:puerto]
      try {
        const u = new URL(v);
        if (!u.pathname || u.pathname === '/') {
          u.pathname = '/ws/slave';
          v = u.toString();
        }
      } catch {}
      return v;
    } catch { return raw; }
  }

  // Última URL usada
  const LS_LAST_URL = 'wpl_slave_last_url';
  try {
    const last = localStorage.getItem(LS_LAST_URL);
    if (last) {
      elements.masterUrlInput.value = last;
    }
  } catch {}

  // ——— Favoritos (localStorage) ———
  const LS_KEY = 'wpl_slave_favorites';
  function loadFavorites() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
  }
  function saveFavorites(list) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch {}
  }
  function isFavorited(url) {
    const v = normalizeWsUrl(url || '');
    if (!v) return false;
    const list = loadFavorites();
    return list.includes(v);
  }
  function updateStarUI() {
    try {
      const v = normalizeWsUrl(elements.masterUrlInput.value.trim());
      if (isFavorited(v)) {
        elements.starBtn.textContent = '★';
        elements.starBtn.title = 'Eliminar de favoritos';
      } else {
        elements.starBtn.textContent = '☆';
        elements.starBtn.title = 'Guardar como favorito';
      }
    } catch {}
  }
  function addFavorite(url) {
    const v = normalizeWsUrl(url);
    if (!v) return;
    const list = loadFavorites();
    if (!list.includes(v)) { list.push(v); saveFavorites(list); renderFavorites(); }
    updateStarUI();
  }
  function removeFavorite(url) {
    const list = loadFavorites().filter(u => u !== url);
    saveFavorites(list); renderFavorites();
    updateStarUI();
  }
  function renderFavorites() {
    const list = loadFavorites();
    elements.favList.innerHTML = '';
    list.forEach(u => {
      const row = document.createElement('div');
      row.className = 'fav-item';
      row.innerHTML = `
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${u}</span>
        <div class="fav-actions">
          <button class="mini-btn connect-mini">Conectar</button>
          <button class="mini-btn remove-mini">Eliminar</button>
        </div>`;
      row.querySelector('.connect-mini').addEventListener('click', async () => {
        elements.masterUrlInput.value = u;
        updateStarUI();
        try { localStorage.setItem(LS_LAST_URL, u); } catch {}
        elements.connectBtn.click();
      });
      row.querySelector('.remove-mini').addEventListener('click', () => removeFavorite(u));
      elements.favList.appendChild(row);
    });
  }
  renderFavorites();

  // Estado interno
  let isMinimized = false;

  // Nota: ya no mostramos aviso de HTTPS; el auto-upgrade a wss sigue activo al conectar
  
  // Event listeners
  // Pulsar Enter para conectar
  elements.masterUrlInput.addEventListener('keydown', async (ev) => {
    if (ev.key === 'Enter') {
      elements.connectBtn.click();
    }
  });

  elements.connectBtn.addEventListener('click', async () => {
    let masterUrl = elements.masterUrlInput.value.trim();
    if (!masterUrl) {
      showError(t('slave.invalidUrl'));
      return;
    }
    // Normalizar la URL y prevenir Mixed Content
    masterUrl = normalizeWsUrl(masterUrl);
    try {
      const u = new URL(masterUrl);
      const isHttpsPage = window.location.protocol === 'https:';
      const isInsecureWs = /^ws:$/i.test(u.protocol);
      const isLocal = isLocalhostName(u.hostname);
      if (isHttpsPage && isInsecureWs && !isLocal) {
        // Auto-upgrade a wss y avisar
        const upgraded = masterUrl.replace(/^ws:\/\//i, 'wss://');
        showError(t('slave.httpsUpgrade'));
        elements.masterUrlInput.value = upgraded;
        masterUrl = upgraded;
      }
    } catch {}

    try {
      elements.connectBtn.disabled = true;
      elements.errorDisplay.style.display = 'none';
  try { localStorage.setItem(LS_LAST_URL, masterUrl); } catch {}
      await onConnect(masterUrl);
    } catch (error) {
      showError(`${t('slave.connectionError')}: ${error.message}`);
      elements.connectBtn.disabled = false;
    }
  });
  
  elements.disconnectBtn.addEventListener('click', () => {
    onDisconnect();
  });

  // Guardar como favorito
  elements.starBtn.addEventListener('click', () => {
    const v = normalizeWsUrl(elements.masterUrlInput.value.trim());
    if (!v) return;
    if (isFavorited(v)) {
      removeFavorite(v);
    } else {
      addFavorite(v);
    }
  });

  // Actualizar la estrella cuando el usuario cambia la URL manualmente
  elements.masterUrlInput.addEventListener('input', updateStarUI);

  // Sincronizar estado inicial de la estrella tras cargar la última URL
  updateStarUI();

  // Toggle desplegable favoritos
  let favOpen = false;
  elements.favHeader.addEventListener('click', () => {
    favOpen = !favOpen;
    elements.favList.classList.toggle('open', favOpen);
    elements.favChevron.classList.toggle('open', favOpen);
  });
  
  elements.closeBtn.addEventListener('click', () => {
    if (isMinimized) {
      // Restaurar
      panel.classList.remove('minimized');
      isMinimized = false;
      elements.closeBtn.textContent = '✕';
    } else {
      // Minimizar
      panel.classList.add('minimized');
      isMinimized = true;
      elements.closeBtn.textContent = '□';
    }
  });
  
  elements.closePanelBtn.addEventListener('click', () => {
    onClose();
    host.remove();
  });
  
  // Función para mostrar errores
  function showError(message) {
    elements.errorDisplay.textContent = message;
    elements.errorDisplay.style.display = 'block';
  }
  
  // Función para ocultar errores
  function hideError() {
    elements.errorDisplay.style.display = 'none';
  }
  
  // API pública
  const api = {
    updateStatus: (status) => {
  const { connectionStatus, slaveId, currentMode, isRunning, telemetryData: _telemetryData } = status;
      
      // Actualizar indicador de estado
      elements.statusIndicator.className = `status-indicator ${connectionStatus}`;
      
      // Actualizar texto de estado
      const statusTexts = {
        connected: texts.connected,
        connecting: texts.connecting,
        disconnected: texts.disconnected,
        error: texts.error
      };
      elements.statusText.textContent = statusTexts[connectionStatus] || connectionStatus;
      
      // Actualizar botones según el estado
      if (connectionStatus === 'connected') {
        elements.connectBtn.style.display = 'none';
        elements.disconnectBtn.style.display = 'block';
        elements.masterUrlInput.disabled = true;
        hideError();
      } else {
        elements.connectBtn.style.display = 'block';
        elements.disconnectBtn.style.display = 'none';
        elements.connectBtn.disabled = false;
        elements.masterUrlInput.disabled = false;
        
        if (connectionStatus === 'error') {
          showError(t('slave.connectionError'));
        }
      }
      
      // Actualizar información del slave
      elements.slaveId.textContent = slaveId || '-';
      elements.currentMode.textContent = currentMode || '-';
      elements.runningStatus.textContent = isRunning ? texts.running : texts.idle;
      
      // Actualizar telemetría
  // UI no muestra telemetría; omitimos actualizar estos campos
    },
    
    updateTexts: () => {
      const newTexts = getSlaveTexts();
      if (!newTexts) return;
      
      // Actualizar textos de la interfaz
      elements.titleElement.textContent = newTexts.title;
      elements.masterServerLabel.textContent = newTexts.masterServer;
      elements.connectBtn.textContent = newTexts.connect;
      elements.disconnectBtn.textContent = newTexts.disconnect;
      elements.statusLabel.textContent = newTexts.status;
      elements.slaveIdLabel.textContent = newTexts.slaveId;
      elements.modeLabel.textContent = newTexts.mode;
      elements.runningLabel.textContent = newTexts.running;
      elements.closeBtn.textContent = newTexts.close;
      
      // Actualizar textos de estado según el estado actual
      const statusTexts = {
        connected: newTexts.connected,
        connecting: newTexts.connecting,
        disconnected: newTexts.disconnected,
        error: newTexts.error
      };
      
      const currentStatus = elements.statusIndicator.className.split(' ')[1];
      if (statusTexts[currentStatus]) {
        elements.statusText.textContent = statusTexts[currentStatus];
      }
      
      // Actualizar texto de estado de ejecución
      const isCurrentlyRunning = elements.runningStatus.textContent === texts.running;
      elements.runningStatus.textContent = isCurrentlyRunning ? newTexts.running : newTexts.idle;
      
      // Actualizar referencia de textos para futuras actualizaciones
      Object.assign(texts, newTexts);
    },
    
    cleanup: () => {
      host.remove();
    }
  };
  
  return api;
}