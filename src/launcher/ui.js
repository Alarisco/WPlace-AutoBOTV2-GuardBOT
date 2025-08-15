import { log } from "../core/logger.js";
import { createShadowRoot, makeDraggable } from "../core/ui-utils.js";
import { launcherState, LAUNCHER_CONFIG, getLauncherTexts } from "./config.js";

export function createLauncherUI({ 
  onSelectBot, 
  onLaunch, 
  onClose,
  updateUserInfo,
  updateHealthInfo 
}) {
  log('🎛️ Creando interfaz del Launcher');
  
  // Verificar si ya existe un panel para evitar duplicados
  const existing = document.getElementById('wpl-panel');
  if (existing) {
    existing.remove();
    log('🗑️ Panel existente removido');
  }
  
  const texts = getLauncherTexts();
  const { host, root } = createShadowRoot('wpl-panel');
  
  // Crear estilos
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: ${LAUNCHER_CONFIG.THEME.primary};
      border: 1px solid ${LAUNCHER_CONFIG.THEME.accent};
      border-radius: 10px;
      color: ${LAUNCHER_CONFIG.THEME.text};
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
      background: ${LAUNCHER_CONFIG.THEME.secondary};
      padding: 10px 12px;
      color: ${LAUNCHER_CONFIG.THEME.highlight};
      font-weight: 600;
      cursor: move;
      user-select: none;
    }
    
    .body {
      padding: 12px;
    }
    
    .row {
      display: flex;
      gap: 8px;
      margin: 8px 0;
    }
    
    .btn {
      flex: 1;
      padding: 9px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn.primary {
      background: ${LAUNCHER_CONFIG.THEME.accent};
      color: white;
    }
    
    .btn.primary:hover:not(:disabled) {
      background: ${LAUNCHER_CONFIG.THEME.highlight};
    }
    
    .btn.ghost {
      background: transparent;
      border: 1px solid ${LAUNCHER_CONFIG.THEME.accent};
      color: ${LAUNCHER_CONFIG.THEME.text};
    }
    
    .btn.ghost:hover:not(:disabled) {
      background: ${LAUNCHER_CONFIG.THEME.accent}22;
    }
    
    .btn.close {
      flex: 0 0 auto;
      padding: 6px 8px;
    }
    
    .card {
      background: ${LAUNCHER_CONFIG.THEME.secondary};
      padding: 10px;
      border-radius: 8px;
      margin-top: 10px;
    }
    
    .stat {
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
      font-size: 13px;
      opacity: 0.95;
    }
    
    .status {
      margin-top: 10px;
      padding: 8px;
      border-radius: 6px;
      text-align: center;
      font-size: 13px;
      background: rgba(255,255,255,0.08);
    }
    
    .selected {
      outline: 2px solid ${LAUNCHER_CONFIG.THEME.highlight};
    }
  `;
  root.appendChild(style);
  
  // Crear panel principal
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = `
    <div class="header">
      <div>${texts.title}</div>
      <button class="btn ghost close close-btn">✕</button>
    </div>
    <div class="body">
      <div class="row">
        <button class="btn primary farm-btn">${texts.autoFarm}</button>
        <button class="btn ghost image-btn">${texts.autoImage}</button>
      </div>
      <div class="card">
        <div class="stat">
          <span>${texts.selection}</span>
          <span class="choice">—</span>
        </div>
      </div>
      <div class="card user-card">
        <div class="stat">
          <span>${texts.user}</span>
          <span class="user-name">-</span>
        </div>
        <div class="stat">
          <span>${texts.charges}</span>
          <span class="user-charges">-</span>
        </div>
      </div>
      <div class="card health-card">
        <div class="stat">
          <span>${texts.backend}</span>
          <span class="backend-status">${texts.checking}</span>
        </div>
        <div class="stat">
          <span>${texts.database}</span>
          <span class="database-status">-</span>
        </div>
        <div class="stat">
          <span>${texts.uptime}</span>
          <span class="uptime">-</span>
        </div>
      </div>
      <div class="status status-text">${texts.chooseBot}</div>
      <div class="row" style="margin-top: 12px;">
        <button class="btn primary launch-btn" disabled>${texts.launch}</button>
        <button class="btn ghost cancel-btn">${texts.close}</button>
      </div>
    </div>
  `;
  
  root.appendChild(panel);
  
  // Referencias a elementos
  const elements = {
    header: panel.querySelector('.header'),
    farmBtn: panel.querySelector('.farm-btn'),
    imageBtn: panel.querySelector('.image-btn'),
    launchBtn: panel.querySelector('.launch-btn'),
    cancelBtn: panel.querySelector('.cancel-btn'),
    closeBtn: panel.querySelector('.close-btn'),
    statusText: panel.querySelector('.status-text'),
    choice: panel.querySelector('.choice'),
    userName: panel.querySelector('.user-name'),
    userCharges: panel.querySelector('.user-charges'),
    backendStatus: panel.querySelector('.backend-status'),
    databaseStatus: panel.querySelector('.database-status'),
    uptime: panel.querySelector('.uptime')
  };
  
  // Hacer draggable
  makeDraggable(elements.header, panel);
  
  // Estado interno
  let selectedBot = null;
  
  // Función para seleccionar bot
  function selectBot(botType) {
    selectedBot = botType;
    launcherState.selectedBot = botType;
    
    elements.choice.textContent = botType === 'farm' ? texts.autoFarm : texts.autoImage;
    elements.launchBtn.disabled = false;
    
    // Actualizar estilos de botones
    if (botType === 'farm') {
      elements.farmBtn.classList.add('primary');
      elements.farmBtn.classList.remove('ghost');
      elements.imageBtn.classList.add('ghost');
      elements.imageBtn.classList.remove('primary');
    } else {
      elements.imageBtn.classList.add('primary');
      elements.imageBtn.classList.remove('ghost');
      elements.farmBtn.classList.add('ghost');
      elements.farmBtn.classList.remove('primary');
    }
    
    elements.statusText.textContent = texts.readyToLaunch;
    
    if (onSelectBot) {
      onSelectBot(botType);
    }
  }
  
  // Event listeners
  elements.farmBtn.addEventListener('click', () => selectBot('farm'));
  elements.imageBtn.addEventListener('click', () => selectBot('image'));
  
  elements.launchBtn.addEventListener('click', async () => {
    if (!selectedBot) return;
    
    elements.launchBtn.disabled = true;
    elements.launchBtn.textContent = texts.loading;
    elements.statusText.textContent = texts.downloading;
    
    try {
      if (onLaunch) {
        await onLaunch(selectedBot);
        // Si llegamos aquí, el bot se ejecutó correctamente
        cleanup();
      }
    } catch (error) {
      log('❌ Error en launch:', error);
      alert(texts.loadErrorMsg);
      elements.launchBtn.disabled = false;
      elements.launchBtn.textContent = texts.launch;
      elements.statusText.textContent = texts.loadError;
    }
  });
  
  // Función de limpieza
  function cleanup() {
    if (launcherState.refreshTimer) {
      window.clearInterval(launcherState.refreshTimer);
      launcherState.refreshTimer = null;
    }
    host.remove();
    log('🧹 Launcher UI eliminado');
  }
  
  elements.cancelBtn.addEventListener('click', cleanup);
  elements.closeBtn.addEventListener('click', cleanup);
  
  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cleanup();
    }
  }, { once: true });
  
  // Funciones de actualización de UI
  function setUserInfo(userInfo) {
    if (!userInfo) {
      elements.userName.textContent = '-';
      elements.userCharges.textContent = '-';
      return;
    }
    
    const name = userInfo.name || userInfo.username || '-';
    const charges = Math.floor(Number(userInfo.charges?.count ?? NaN));
    
    elements.userName.textContent = name;
    elements.userCharges.textContent = Number.isFinite(charges) ? String(charges) : '-';
  }
  
  function setHealthInfo(healthInfo) {
    if (!healthInfo) {
      elements.backendStatus.textContent = texts.offline;
      elements.databaseStatus.textContent = '-';
      elements.uptime.textContent = '-';
      return;
    }
    
    const up = Boolean(healthInfo.up);
    const db = healthInfo.database;
    const uptime = healthInfo.uptime || '-';
    
    elements.backendStatus.textContent = up ? texts.online : texts.offline;
    
    if (db === undefined || db === null) {
      elements.databaseStatus.textContent = '-';
    } else {
      elements.databaseStatus.textContent = db ? texts.ok : texts.error;
    }
    
    elements.uptime.textContent = typeof uptime === 'number' ? `${uptime}s` : (uptime || '-');
  }
  
  log('✅ Launcher UI creado exitosamente');
  
  return {
    setUserInfo,
    setHealthInfo,
    cleanup,
    selectBot,
    getSelectedBot: () => selectedBot
  };
}
