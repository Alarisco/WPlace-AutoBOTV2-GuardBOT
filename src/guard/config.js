// Configuración para Auto-Guard
export const GUARD_DEFAULTS = {
  SITEKEY: "0x4AAAAAABpqJe8FO0N84q0F",
  COOLDOWN_DEFAULT: 31000,
  TILE_SIZE: 3000,
  CHECK_INTERVAL: 10000, // Revisar cada 10 segundos
  MAX_PROTECTION_SIZE: 100000, // Máximo 100k píxeles protegidos
  PIXELS_PER_BATCH: 10, // Menos que Image para ser más sutil
  BACKEND_URL: "https://backend.wplace.live"
};

// Estado global del Guard
export const guardState = {
  running: false,
  initialized: false,
  protectionArea: null, // { x1, y1, x2, y2, tileX, tileY }
  originalPixels: new Map(), // Map de "x,y" -> {r, g, b, colorId}
  changes: new Map(), // Map de "x,y" -> {timestamp, originalColor, currentColor}
  currentCharges: 0,
  maxCharges: 50,
  lastCheck: 0,
  checkInterval: null,
  availableColors: [],
  colorsChecked: false,
  ui: null,
  totalRepaired: 0
};
