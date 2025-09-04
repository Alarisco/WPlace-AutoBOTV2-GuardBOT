// Configuración por defecto para WPlace AutoFarm
export const FARM_DEFAULTS = {
  SITEKEY: '0x4AAAAAABpqJe8FO0N84q0F', // Turnstile sitekey (ajústalo si cambia)
  TILE_X: 1086,
  TILE_Y: 1565,
  TILE_SIZE: 3000,         // Tiles son de ~3000x3000 según investigación
  DELAY_MS: 15000,         // 15 segundos entre pintadas (predeterminado)
  MIN_CHARGES: 10,         // mínimo de cargas para empezar a pintar
  CHARGE_REGEN_MS: 30000,  // 1 carga cada 30 segundos
  PIXELS_PER_BATCH: 20,    // número de píxeles a pintar por lote
  COLOR_MIN: 1,
  COLOR_MAX: 32,
  COLOR_MODE: 'random',    // 'random' | 'fixed'
  COLOR_FIXED: 1,
  CUSTOM_PALETTE: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
  // Nueva funcionalidad de posición y radio
  BASE_X: null,            // Posición X base (local al tile) - se establece al seleccionar zona
  BASE_Y: null,            // Posición Y base (local al tile) - se establece al seleccionar zona
  FARM_RADIUS: 500,        // Radio de farming en píxeles (500px por defecto para zona segura)
  POSITION_SELECTED: false, // Flag para indicar si se seleccionó una posición
  // Auto-compra de cargas usando droplets cuando >= 500
  AUTO_BUY_ENABLED: false,
  UI_THEME: {
    primary: '#000000',
    secondary: '#111111',
    accent: '#222222',
    text: '#ffffff',
    highlight: '#775ce3',
    success: '#00ff00',
    error: '#ff0000',
    running: '#00cc00'     // Verde para cuando está corriendo
  }
};

// Estado global del farm
export const farmState = {
  running: false,
  painted: 0,
  last: null,          // {x,y,color,status,json}
  charges: { count: 0, max: 0, cooldownMs: 30000 },
  droplets: 0,
  user: null,
  panel: null,
  captureMode: false,  // sniffer activo para capturar TILE_X/Y desde un POST real
  selectingPosition: false, // sniffer activo para capturar posición base
  originalFetch: window.fetch,
  retryCount: 0,       // contador de reintentos
  inCooldown: false,   // si está en cooldown de 2 minutos
  nextPaintTime: 0,    // timestamp de la próxima pintada
  cooldownEndTime: 0,  // timestamp del final del cooldown
  health: null         // estado de salud del backend
};
