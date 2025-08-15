const NS = "wplace-bot";

export function load(key, fallback) {
  try { 
    return JSON.parse(localStorage.getItem(`${NS}:${key}`)) ?? fallback; 
  } catch { 
    return fallback; 
  }
}

export function save(key, value) {
  try { 
    localStorage.setItem(`${NS}:${key}`, JSON.stringify(value)); 
  } catch {
    // Storage not available
  }
}

// Farm-specific storage functions
export function saveFarmCfg(cfg) { 
  try { 
    localStorage.setItem('WPA_UI_CFG', JSON.stringify(cfg)); 
  } catch { 
    /* ignore save errors */ 
  } 
}

export function loadFarmCfg(defaults) {
  try {
    const s = localStorage.getItem('WPA_UI_CFG');
    if (s) {
      const loaded = { ...defaults, ...JSON.parse(s) };
      
      // Validar coordenadas cargadas (verificar que sean números válidos)
      if (!Number.isFinite(loaded.TILE_X) || !Number.isFinite(loaded.TILE_Y)) {
        console.log('[WPA-UI]', `Configuración corrupta detectada: coordenadas (${loaded.TILE_X},${loaded.TILE_Y}) inválidas`);
        resetFarmCfg();
        return { ...defaults };
      }
      
      return loaded;
    }
  } catch { 
    /* ignore load errors */ 
  }
  return { ...defaults };
}

// Resetear configuración del farm
export function resetFarmCfg() {
  try {
    localStorage.removeItem('WPA_UI_CFG');
    console.log('[WPA-UI]', 'Configuración del farm reseteada');
  } catch { 
    /* ignore reset errors */ 
  }
}

// Resetear a configuración segura
export function resetToSafeDefaults() {
  try {
    localStorage.removeItem('WPA_UI_CFG');
    console.log('[WPA-UI]', 'Configuración reseteada a valores seguros');
  } catch { 
    /* ignore reset errors */ 
  }
}

// Verificar si necesita calibración inicial
export function needsCalibration(cfg, defaults) {
  // Verificar si las coordenadas son las por defecto
  const hasDefaultCoords = cfg.TILE_X === defaults.TILE_X && cfg.TILE_Y === defaults.TILE_Y;
  // También verificar si no hay configuración guardada
  const hasNoSavedConfig = !localStorage.getItem('WPA_UI_CFG');
  // Verificar que las coordenadas sean números válidos
  const hasInvalidCoords = !Number.isFinite(cfg.TILE_X) || !Number.isFinite(cfg.TILE_Y);
  
  const needsCalib = hasDefaultCoords || hasNoSavedConfig || hasInvalidCoords;
  console.log('[WPA-UI]', `Verificación calibración: defaults=${hasDefaultCoords}, noConfig=${hasNoSavedConfig}, invalid=${hasInvalidCoords}, coords=(${cfg.TILE_X},${cfg.TILE_Y})`);
  
  return needsCalib;
}
