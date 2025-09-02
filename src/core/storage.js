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
  try {
    localStorage.setItem('wplace-farm-config', JSON.stringify(cfg));
    console.log('[WPA-UI]', 'Configuración del farm guardada en localStorage');
  } catch (error) {
    console.warn('[WPA-UI]', 'Error guardando configuración del farm:', error);
  }
}

export function loadFarmCfg(defaults) {
  try {
    const saved = localStorage.getItem('wplace-farm-config');
    if (saved) {
      const cfg = JSON.parse(saved);
      console.log('[WPA-UI]', 'Configuración del farm cargada desde localStorage');
      return { ...defaults, ...cfg };
    }
  } catch (error) {
    console.warn('[WPA-UI]', 'Error cargando configuración del farm:', error);
  }
  return { ...defaults };
}

// Resetear configuración del farm
export function resetFarmCfg() {
  try {
    localStorage.removeItem('wplace-farm-config');
    console.log('[WPA-UI]', 'Configuración del farm eliminada de localStorage');
  } catch (error) {
    console.warn('[WPA-UI]', 'Error eliminando configuración del farm:', error);
  }
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
  // Verificar si hay configuración guardada en localStorage
  const hasNoSavedConfig = !localStorage.getItem('wplace-farm-config');
  // Verificar que las coordenadas sean números válidos
  const hasInvalidCoords = !Number.isFinite(cfg.TILE_X) || !Number.isFinite(cfg.TILE_Y);

  const needsCalib = hasDefaultCoords || hasNoSavedConfig || hasInvalidCoords;
  console.log(
    '[WPA-UI]',
    `Verificación calibración: defaults=${hasDefaultCoords}, noConfig=${hasNoSavedConfig}, invalid=${hasInvalidCoords}, coords=(${cfg.TILE_X},${cfg.TILE_Y})`,
  );

  return needsCalib;
}
