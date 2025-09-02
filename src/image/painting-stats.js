import { log } from "../core/logger.js";
import { createShadowRoot } from "../core/ui-utils.js";
import { registerWindow, unregisterWindow, bringWindowToFront } from '../core/window-manager.js';
import { COLOR_MAP } from "./palette.js";

/**
 * Crea la ventana de estadísticas de pintado
 */
export function createPaintingStatsWindow() {
  log('📊 Creando ventana de estadísticas de pintado');
  
  const { host, root } = createShadowRoot();
  
  // Crear estilos
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .stats-container {
      position: fixed;
      top: 60px;
      right: 20px;
      width: 380px;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      z-index: 9997;
      font-family: 'Segoe UI', Roboto, sans-serif;
      color: #eee;
      animation: slideIn 0.4s ease-out;
      overflow: hidden;
      display: none;
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
      max-height: 70vh;
      overflow-y: auto;
    }
    
    .stats-section {
      background: #2d3748;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 15px;
      border: 1px solid #3a4553;
    }
    
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #60a5fa;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      font-size: 14px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .stat-item:last-child {
      border-bottom: none;
    }
    
    .stat-label {
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.8;
    }
    
    .stat-value {
      font-weight: 600;
      color: #60a5fa;
    }
    
    .colors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
      gap: 6px;
      margin-top: 10px;
    }
    
    .color-swatch {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      border: 2px solid #333;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
      position: relative;
      transition: all 0.2s;
      cursor: pointer;
    }
    
    .color-swatch:hover {
      transform: scale(1.1);
      border-color: #60a5fa;
    }
    
    .color-swatch.unavailable {
      opacity: 0.4;
      border-color: #666;
    }
    
    .color-info {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      background: #000;
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 1000;
    }
    
    .color-swatch:hover .color-info {
      opacity: 1;
    }
    
    .refresh-btn {
      background: #60a5fa;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .refresh-btn:hover {
      background: #4facfe;
      transform: translateY(-2px);
    }
    
    .refresh-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
    
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #333;
      border-radius: 4px;
      overflow: hidden;
      margin: 8px 0;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #60a5fa, #4facfe);
      transition: width 0.3s;
      width: 0%;
    }
  `;
  root.appendChild(style);
  
  // Crear contenedor principal
  const container = document.createElement('div');
  container.className = 'stats-container';
  container.innerHTML = `
    <div class="header">
      <div class="header-title">
        📊
        <span>Painting Stats</span>
      </div>
      <div class="header-controls">
        <button class="header-btn refresh-btn-header" title="Actualizar estadísticas">
          🔄
        </button>
        <button class="header-btn close-btn" title="Cerrar">
          ✕
        </button>
      </div>
    </div>
    <div class="content">
      <div class="stats-section">
        <div class="section-title">
          👤 Información del Usuario
        </div>
        <div class="user-stats">
          <div class="stat-item">
            <div class="stat-label">Cargando estadísticas...</div>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <div class="section-title">
          🎨 Progreso de la Imagen
        </div>
        <div class="image-stats">
          <div class="stat-item">
            <div class="stat-label">No hay imagen cargada</div>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <div class="section-title">
          🎨 Colores Disponibles
          <button class="refresh-btn" style="margin-left: auto;">
            🔄 Actualizar
          </button>
        </div>
        <div class="colors-stats">
          <div class="stat-item">
            <div class="stat-label">Abra la paleta de colores en el sitio</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  root.appendChild(container);
  
  // Referencias a elementos
  const elements = {
    container,
    header: container.querySelector('.header'),
    refreshBtnHeader: container.querySelector('.refresh-btn-header'),
    closeBtn: container.querySelector('.close-btn'),
    userStats: container.querySelector('.user-stats'),
    imageStats: container.querySelector('.image-stats'),
    colorsStats: container.querySelector('.colors-stats'),
    refreshBtn: container.querySelector('.refresh-btn')
  };
  
  // Registrar ventana en window manager
  registerWindow(container);
  
  // Estado de la ventana
  let visible = false;
  let refreshCallback = null;
  
  // Event listeners
  elements.closeBtn.addEventListener('click', () => {
    hide();
  });
  
  elements.refreshBtnHeader.addEventListener('click', () => {
    if (refreshCallback) {
      refreshCallback();
    }
  });
  
  elements.refreshBtn.addEventListener('click', () => {
    if (refreshCallback) {
      refreshCallback();
    }
  });
  
  // Funciones públicas
  function show() {
    container.style.display = 'block';
    bringWindowToFront(container);
    visible = true;
    log('📊 Ventana de estadísticas mostrada');
  }
  
  function hide() {
    container.style.display = 'none';
    visible = false;
    log('📊 Ventana de estadísticas ocultada');
  }
  
  function toggle() {
    if (visible) {
      hide();
    } else {
      show();
    }
  }
  
  function updateUserStats(userInfo) {
    if (!userInfo) {
      elements.userStats.innerHTML = `
        <div class="stat-item">
          <div class="stat-label">❌ No se pudo obtener información del usuario</div>
        </div>
      `;
      return;
    }
    
    let statsHTML = '';
    
    if (userInfo.username) {
      statsHTML += `
        <div class="stat-item">
          <div class="stat-label">👤 Usuario</div>
          <div class="stat-value">${userInfo.username}</div>
        </div>
      `;
    }
    
    if (userInfo.charges !== undefined) {
      statsHTML += `
        <div class="stat-item">
          <div class="stat-label">⚡ Cargas</div>
          <div class="stat-value">${Math.floor(userInfo.charges)} / ${userInfo.maxCharges || 'N/A'}</div>
        </div>
      `;
    }
    
    if (userInfo.pixels !== undefined) {
      statsHTML += `
        <div class="stat-item">
          <div class="stat-label">🔳 Píxeles Pintados</div>
          <div class="stat-value">${userInfo.pixels.toLocaleString()}</div>
        </div>
      `;
    }
    
    if (userInfo.cooldown !== undefined && userInfo.cooldown > 0) {
      const minutes = Math.floor(userInfo.cooldown / 60);
      const seconds = userInfo.cooldown % 60;
      const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
      
      statsHTML += `
        <div class="stat-item">
          <div class="stat-label">⏰ Cooldown</div>
          <div class="stat-value">${timeStr}</div>
        </div>
      `;
    }
    
    elements.userStats.innerHTML = statsHTML || `
      <div class="stat-item">
        <div class="stat-label">ℹ️ Información no disponible</div>
      </div>
    `;
  }
  
  function updateImageStats(imageInfo) {
    if (!imageInfo || !imageInfo.loaded) {
      elements.imageStats.innerHTML = `
        <div class="stat-item">
          <div class="stat-label">📷 No hay imagen cargada</div>
        </div>
      `;
      return;
    }
    
    const progress = imageInfo.totalPixels > 0 
      ? Math.round((imageInfo.paintedPixels / imageInfo.totalPixels) * 100) 
      : 0;
    
    let statsHTML = `
      <div class="stat-item">
        <div class="stat-label">📊 Progreso</div>
        <div class="stat-value">${progress}%</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="stat-item">
        <div class="stat-label">🎨 Píxeles</div>
        <div class="stat-value">${imageInfo.paintedPixels}/${imageInfo.totalPixels}</div>
      </div>
    `;
    
    if (imageInfo.estimatedTime !== undefined && imageInfo.estimatedTime > 0) {
      const hours = Math.floor(imageInfo.estimatedTime / 3600);
      const minutes = Math.floor((imageInfo.estimatedTime % 3600) / 60);
      const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      
      statsHTML += `
        <div class="stat-item">
          <div class="stat-label">⏰ Tiempo Estimado</div>
          <div class="stat-value">${timeStr}</div>
        </div>
      `;
    }
    
    if (imageInfo.originalName) {
      statsHTML += `
        <div class="stat-item">
          <div class="stat-label">📁 Archivo</div>
          <div class="stat-value">${imageInfo.originalName}</div>
        </div>
      `;
    }
    
    elements.imageStats.innerHTML = statsHTML;
  }
  
  function updateColorsStats(availableColors) {
    if (!availableColors || availableColors.length === 0) {
      elements.colorsStats.innerHTML = `
        <div class="stat-item">
          <div class="stat-label">❌ Abra la paleta de colores en el sitio</div>
        </div>
      `;
      return;
    }
    
    // Obtener todos los colores del COLOR_MAP para mostrar disponibles y no disponibles
    const allColors = Object.values(COLOR_MAP).filter(c => c.rgb !== null); // Filtrar transparente
    const availableIds = new Set(availableColors.map(c => c.id));
    
    let statsHTML = `
      <div class="stat-item">
        <div class="stat-label">✅ Colores Disponibles</div>
        <div class="stat-value">${availableColors.length}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">📊 Total de Colores</div>
        <div class="stat-value">${allColors.length}</div>
      </div>
      <div class="colors-grid">
    `;
    
    // Primero mostrar colores disponibles
    availableColors.forEach(color => {
      const colorInfo = COLOR_MAP[Object.keys(COLOR_MAP).find(key => COLOR_MAP[key].id === color.id)];
      const name = colorInfo ? colorInfo.name : `Color ${color.id}`;
      const rgb = color.rgb || [0, 0, 0];
      const rgbString = `rgb(${rgb.join(',')})`;
      
      statsHTML += `
        <div class="color-swatch" style="background-color: ${rgbString};" title="${name} (ID: ${color.id})">
          <div class="color-info">${name}</div>
        </div>
      `;
    });
    
    // Luego mostrar colores no disponibles si los hay
    const unavailableColors = allColors.filter(c => !availableIds.has(c.id));
    unavailableColors.forEach(color => {
      const rgb = [color.rgb.r, color.rgb.g, color.rgb.b];
      const rgbString = `rgb(${rgb.join(',')})`;
      
      statsHTML += `
        <div class="color-swatch unavailable" style="background-color: ${rgbString};" title="${color.name} (ID: ${color.id}) - No disponible">
          <div class="color-info">${color.name} (No disponible)</div>
        </div>
      `;
    });
    
    statsHTML += '</div>';
    
    elements.colorsStats.innerHTML = statsHTML;
  }
  
  function setRefreshCallback(callback) {
    refreshCallback = callback;
  }
  
  function destroy() {
    // Desregistrar ventana del window manager
    unregisterWindow(container);
    host.remove();
  }
  
  log('✅ Ventana de estadísticas de pintado creada');
  
  return {
    show,
    hide,
    toggle,
    updateUserStats,
    updateImageStats,
    updateColorsStats,
    setRefreshCallback,
    destroy,
    isVisible: () => visible
  };
}
