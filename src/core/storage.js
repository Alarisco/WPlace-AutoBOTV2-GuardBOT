export function load(key, fallback) {
  // No usar localStorage - siempre retornar fallback
  return fallback;
}

export function save(key, value) {
  // No guardar en localStorage - función deshabilitada
  return;
}

// Farm-specific storage functions
export function saveFarmCfg(cfg) { 
  // No guardar en localStorage - función deshabilitada
  return;
}

export function loadFarmCfg(defaults) {
  // No cargar de localStorage - siempre usar defaults
  return { ...defaults };
}

// Resetear configuración del farm
export function resetFarmCfg() {
  // No hay localStorage que resetear - función deshabilitada
  console.log('[WPA-UI]', 'Configuración del farm reseteada (localStorage deshabilitado)');
}

// Resetear a configuración segura
export function resetToSafeDefaults() {
  // No hay localStorage que resetear - función deshabilitada
  console.log('[WPA-UI]', 'Configuración reseteada a valores seguros (localStorage deshabilitado)');
}

// Verificar si necesita calibración inicial
export function needsCalibration(cfg, defaults) {
  // Verificar si las coordenadas son las por defecto
  const hasDefaultCoords = cfg.TILE_X === defaults.TILE_X && cfg.TILE_Y === defaults.TILE_Y;
  // Sin localStorage, siempre consideramos que no hay configuración guardada
  const hasNoSavedConfig = true;
  // Verificar que las coordenadas sean números válidos
  const hasInvalidCoords = !Number.isFinite(cfg.TILE_X) || !Number.isFinite(cfg.TILE_Y);
  
  const needsCalib = hasDefaultCoords || hasNoSavedConfig || hasInvalidCoords;
  console.log('[WPA-UI]', `Verificación calibración: defaults=${hasDefaultCoords}, noConfig=${hasNoSavedConfig}, invalid=${hasInvalidCoords}, coords=(${cfg.TILE_X},${cfg.TILE_Y})`);
  
  return needsCalib;
}
