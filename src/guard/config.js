// Configuración para Auto-Guard
export const GUARD_DEFAULTS = {
  SITEKEY: "0x4AAAAAABpqJe8FO0N84q0F",
  COOLDOWN_DEFAULT: 31000,
  TILE_SIZE: 1000,
  CHECK_INTERVAL: 10000, // Revisar cada 10 segundos
  MAX_PROTECTION_SIZE: Infinity, // Sin límite de píxeles protegidos
  PIXELS_PER_BATCH: 10, // Menos que Image para ser más sutil
  MIN_CHARGES_TO_WAIT: 20, // Cargas mínimas a esperar antes de continuar
  BACKEND_URL: "https://backend.wplace.live",
  PROTECTION_PATTERN: "random" // Patrón por defecto
};

// Patrones de protección disponibles
export const PROTECTION_PATTERNS = {
  random: "Aleatorio",
  line: "Línea",
  center: "Centro",
  spiral: "Espiral",
  human: "Humano"
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
  totalRepaired: 0,
  isVirtualArea: false, // Indica si el área es virtual (convertida desde Auto-Image)
  // Configuración editable
  pixelsPerBatch: GUARD_DEFAULTS.PIXELS_PER_BATCH,
  minChargesToWait: GUARD_DEFAULTS.MIN_CHARGES_TO_WAIT,
  protectionPattern: GUARD_DEFAULTS.PROTECTION_PATTERN,
  config: {
    colorComparisonMethod: 'lab', // 'rgb' o 'lab' - LAB por defecto para reposicionamiento
    colorThreshold: 10 // Umbral de diferencia de color
  }
};
