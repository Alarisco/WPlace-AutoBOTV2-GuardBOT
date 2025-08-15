import { log } from "../core/logger.js";
import { launcherState } from "./config.js";

// API calls para obtener información del usuario y estado del backend
export async function getSession() {
  log('📡 Obteniendo información de sesión...');
  
  try {
    const res = await fetch('https://backend.wplace.live/me', { 
      credentials: 'include' 
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    launcherState.me = await res.json();
    log('✅ Información de sesión obtenida:', launcherState.me?.name || launcherState.me?.username || 'Usuario');
    
    return launcherState.me;
  } catch (error) {
    log('❌ Error obteniendo sesión:', error.message);
    launcherState.me = null;
    return null;
  }
}

export async function checkBackendHealth() {
  log('🏥 Verificando estado del backend...');
  
  try {
    const res = await fetch('https://backend.wplace.live/health', { 
      method: 'GET', 
      credentials: 'include' 
    });
    
    let json = null;
    try { 
      json = await res.json(); 
    } catch { 
      json = null; 
    }
    
    if (res.ok && json) {
      launcherState.health = {
        up: Boolean(json.up ?? true),
        database: json.database?.ok ?? json.database ?? undefined,
        uptime: json.uptime ?? json.uptimeHuman ?? (typeof json.uptimeSeconds === 'number' ? `${json.uptimeSeconds}s` : undefined)
      };
      log('✅ Estado del backend obtenido:', launcherState.health);
    } else {
      launcherState.health = { 
        up: false, 
        database: false, 
        uptime: undefined 
      };
      log('⚠️ Backend no responde correctamente');
    }
  } catch (error) {
    log('❌ Error verificando backend:', error.message);
    launcherState.health = { 
      up: false, 
      database: false, 
      uptime: undefined 
    };
  }
  
  return launcherState.health;
}

export async function downloadAndExecuteBot(botType, rawBase) {
  log(`📥 Descargando bot: ${botType}`);
  
  try {
    const url = botType === 'farm' 
      ? `${rawBase}/Auto-Farm.js` 
      : `${rawBase}/Auto-Image.js`;
    
    log(`🌐 URL: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const code = await response.text();
    log(`✅ Bot descargado (${code.length} chars), ejecutando...`);
    
    // Evaluar el código del bot
    (0, eval)(code);
    
    log('🚀 Bot ejecutado exitosamente');
    return true;
  } catch (error) {
    log('❌ Error descargando/ejecutando bot:', error.message);
    throw error;
  }
}
