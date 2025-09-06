import { log } from "../core/logger.js";
import { createShadowRoot, makeDraggable } from "../core/ui-utils.js";
import { launcherState, LAUNCHER_CONFIG, getLauncherTexts } from "./config.js";
import { getCurrentLanguage, t } from "../locales/index.js";
import { createLogWindow } from "../log_window/index.js";

export function createLauncherUI({ 
  onSelectBot, 
  onLaunch
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
      right: 70px;
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
      <div class="row">
        <button class="btn ghost guard-btn">${texts.autoGuard}</button>
        <button class="btn ghost log-window-btn">${texts.logWindow}</button>
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
      <div class="info-box" style="margin: 10px 0; padding: 8px; background: rgba(119, 92, 227, 0.1); border-radius: 6px; font-size: 12px; color: #b8b8b8;">
        💡 ${texts.localExecution || 'Ejecución local con acceso completo al sistema de tokens'}
      </div>
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
    guardBtn: panel.querySelector('.guard-btn'),
    logWindowBtn: panel.querySelector('.log-window-btn'),
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
    
    elements.choice.textContent = botType === 'farm' ? t('launcher.autoFarm') : 
                                  botType === 'image' ? t('launcher.autoImage') : 
                                  t('launcher.autoGuard');
    elements.launchBtn.disabled = false;
    
    // Actualizar estilos de botones
    elements.farmBtn.classList.remove('primary');
    elements.farmBtn.classList.add('ghost');
    elements.imageBtn.classList.remove('primary');
    elements.imageBtn.classList.add('ghost');
    elements.guardBtn.classList.remove('primary');
    elements.guardBtn.classList.add('ghost');
    
    if (botType === 'farm') {
      elements.farmBtn.classList.add('primary');
      elements.farmBtn.classList.remove('ghost');
    } else if (botType === 'image') {
      elements.imageBtn.classList.add('primary');
      elements.imageBtn.classList.remove('ghost');
    } else if (botType === 'guard') {
      elements.guardBtn.classList.add('primary');
      elements.guardBtn.classList.remove('ghost');
    }
    
    elements.statusText.textContent = t('launcher.readyToLaunch');
    
    if (onSelectBot) {
      onSelectBot(botType);
    }
  }
  
  // Event listeners
  elements.farmBtn.addEventListener('click', () => selectBot('farm'));
  elements.imageBtn.addEventListener('click', () => selectBot('image'));
  elements.guardBtn.addEventListener('click', () => selectBot('guard'));
  
  // Variable para mantener referencia a la ventana de logs
  let logWindow = null;
  elements.logWindowBtn.addEventListener('click', () => {
    if (!logWindow) {
      logWindow = createLogWindow('launcher');
      logWindow.show();
    } else {
      logWindow.toggle();
    }
  });
  
  elements.launchBtn.addEventListener('click', async () => {
    if (!selectedBot) return;
    
    elements.launchBtn.disabled = true;
    elements.launchBtn.textContent = t('launcher.loading');
    elements.statusText.textContent = t('launcher.downloading');
    
    try {
      if (onLaunch) {
        await onLaunch(selectedBot);
        // Dar tiempo al bot para inicializarse antes de cerrar el launcher
        log('⏳ Esperando inicialización del bot...');
        elements.statusText.textContent = t('launcher.botStarting') || 'Bot iniciando...';
        setTimeout(() => {
          cleanup();
        }, 3000); // Esperar 3 segundos antes de cerrar
      }
    } catch (error) {
      log('❌ Error en launch:', error);
      alert(t('launcher.loadErrorMsg'));
      elements.launchBtn.disabled = false;
      elements.launchBtn.textContent = t('launcher.launch');
      elements.statusText.textContent = t('launcher.loadError');
    }
  });
  
  // Función de limpieza
  function cleanup() {
    window.removeEventListener('languageChanged', handleLanguageChange);
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
  
  // Escuchar cambios de idioma
  const handleLanguageChange = () => {
    updateTexts();
  };
  
  window.addEventListener('languageChanged', handleLanguageChange);
  
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
      elements.backendStatus.textContent = t('launcher.offline');
      elements.databaseStatus.textContent = '-';
      elements.uptime.textContent = '-';
      return;
    }
    
    const up = Boolean(healthInfo.up);
    const db = healthInfo.database;
    const uptime = healthInfo.uptime || '-';
    
    elements.backendStatus.textContent = up ? t('launcher.online') : t('launcher.offline');
    
    if (db === undefined || db === null) {
      elements.databaseStatus.textContent = '-';
    } else {
      elements.databaseStatus.textContent = db ? t('launcher.ok') : t('launcher.error');
    }
    
    elements.uptime.textContent = typeof uptime === 'number' ? `${uptime}s` : (uptime || '-');
  }
  
  function updateTexts() {
    // Obtener nuevas traducciones
    const newTexts = getLauncherTexts();
    
    // Actualizar elementos principales
    const titleElement = panel.querySelector('.header div:first-child');
    if (titleElement) {
      titleElement.textContent = newTexts.title;
    }
    
    if (elements.farmBtn) {
      elements.farmBtn.textContent = newTexts.autoFarm;
    }
    
    if (elements.imageBtn) {
      elements.imageBtn.textContent = newTexts.autoImage;
    }
    
    if (elements.guardBtn) {
      elements.guardBtn.textContent = newTexts.autoGuard;
    }
    
    if (elements.launchBtn) {
      elements.launchBtn.textContent = newTexts.launch;
    }
    
    if (elements.closeBtn) {
      elements.closeBtn.textContent = newTexts.close;
    }
    
    // Actualizar labels de estadísticas
    const selectionSpan = panel.querySelector('.card:first-of-type .stat span:first-child');
    if (selectionSpan) {
      selectionSpan.textContent = newTexts.selection;
    }
    
    const userSpan = panel.querySelector('.user-card .stat:first-child span:first-child');
    if (userSpan) {
      userSpan.textContent = newTexts.user;
    }
    
    const chargesSpan = panel.querySelector('.user-card .stat:last-child span:first-child');
    if (chargesSpan) {
      chargesSpan.textContent = newTexts.charges;
    }
    
    const backendSpan = panel.querySelector('.health-card .stat:first-child span:first-child');
    if (backendSpan) {
      backendSpan.textContent = newTexts.backend;
    }
    
    const databaseSpan = panel.querySelector('.health-card .stat:nth-child(2) span:first-child');
    if (databaseSpan) {
      databaseSpan.textContent = newTexts.database;
    }
    
    const uptimeSpan = panel.querySelector('.health-card .stat:last-child span:first-child');
    if (uptimeSpan) {
      uptimeSpan.textContent = newTexts.uptime;
    }
    
    // Actualizar status si está en mensaje por defecto
    if (elements.statusText) {
      const currentStatus = elements.statusText.textContent;
      if (currentStatus === texts.chooseBot || currentStatus === newTexts.chooseBot) {
        elements.statusText.textContent = newTexts.chooseBot;
      } else if (currentStatus === texts.loading || currentStatus === newTexts.loading) {
        elements.statusText.textContent = newTexts.loading;
      } else if (currentStatus === texts.downloading || currentStatus === newTexts.downloading) {
        elements.statusText.textContent = newTexts.downloading;
      } else if (currentStatus === texts.readyToLaunch || currentStatus === newTexts.readyToLaunch) {
        elements.statusText.textContent = newTexts.readyToLaunch;
      } else if (currentStatus === texts.loadError || currentStatus === newTexts.loadError) {
        elements.statusText.textContent = newTexts.loadError;
      }
    }
    
    // Actualizar estados dinámicos de salud del backend
    if (elements.backendStatus) {
      const currentBackend = elements.backendStatus.textContent;
      if (currentBackend === texts.online || currentBackend === newTexts.online) {
        elements.backendStatus.textContent = newTexts.online;
      } else if (currentBackend === texts.offline || currentBackend === newTexts.offline) {
        elements.backendStatus.textContent = newTexts.offline;
      } else if (currentBackend === texts.checking || currentBackend === newTexts.checking) {
        elements.backendStatus.textContent = newTexts.checking;
      }
    }
    
    // Actualizar estado de la base de datos
    if (elements.databaseStatus) {
      const currentDb = elements.databaseStatus.textContent;
      if (currentDb === texts.ok || currentDb === newTexts.ok) {
        elements.databaseStatus.textContent = newTexts.ok;
      } else if (currentDb === texts.error || currentDb === newTexts.error) {
        elements.databaseStatus.textContent = newTexts.error;
      }
    }
    
    // Actualizar la selección actual si hay alguna
    if (selectedBot && elements.choice) {
      elements.choice.textContent = selectedBot === 'farm' ? newTexts.autoFarm : 
                                    selectedBot === 'image' ? newTexts.autoImage : 
                                    newTexts.autoGuard;
    }
    
    // Actualizar textos de referencia local
    Object.assign(texts, newTexts);
    
    log(`🌍 Textos del launcher actualizados al idioma: ${getCurrentLanguage()}`);
  }
  
  log('✅ Launcher UI creado exitosamente');
  
  return {
    setUserInfo,
    setHealthInfo,
    cleanup,
    selectBot,
    updateTexts,
    getSelectedBot: () => selectedBot
  };
}
