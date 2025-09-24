// Configuración para Auto-Guard
export const GUARD_DEFAULTS = {
  SITEKEY: "0x4AAAAAABpqJe8FO0N84q0F",
  COOLDOWN_DEFAULT: 31000,
  TILE_SIZE: 1000,
  CHECK_INTERVAL: 10000, // Revisar cada 10 segundos
  MAX_PROTECTION_SIZE: Infinity, // Sin límite de píxeles protegidos
  PIXELS_PER_BATCH: 10, // Menos que Image para ser más sutil
  MAX_PIXELS_PER_BATCH: 9999, // Nuevo máximo para tamaño de lote
  MIN_CHARGES_TO_WAIT: 20, // Cargas mínimas a esperar antes de continuar
  BACKEND_URL: "https://backend.wplace.live",
  PROTECTION_PATTERN: "random" // Patrón por defecto
};

// Patrones de protección disponibles
export const PROTECTION_PATTERNS = {
  random: "Aleatorio",
  lineUp: "Lineal (Arriba)",
  lineDown: "Lineal (Abajo)",
  lineLeft: "Lineal (Izquierda)",
  lineRight: "Lineal (Derecha)",
  center: "Centro",
  borders: "Bordes",
  spiral: "Espiral",
  
};

// Modos de operación
export const OPERATION_MODES = {
  protect: "Proteger",
  erase: "Borrar"
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

  // Configuración editable
  pixelsPerBatch: GUARD_DEFAULTS.PIXELS_PER_BATCH,
  minChargesToWait: GUARD_DEFAULTS.MIN_CHARGES_TO_WAIT,
  protectionPattern: GUARD_DEFAULTS.PROTECTION_PATTERN,
  operationMode: "protect", // "protect" o "erase"
  
  // Nuevas opciones de configuración
  preferColor: false,
  preferredColorId: null, // legado
  preferredColorIds: [],
  excludeColor: false, // Nueva opción para excluir colores
  excludedColorIds: [], // Colores a excluir de la reparación
  spendAllPixelsOnStart: false,
  randomWaitTime: false,
  randomWaitMin: 5, // segundos
  randomWaitMax: 15, // segundos
  watchMode: false, // Modo vigía: solo observa, no repara
  
  // Nuevas opciones de transparencia
  protectTransparentPixels: true, // Proteger píxeles que deben ser transparentes
  protectPerimeter: false, // Crear perímetro transparente alrededor
  perimeterWidth: 1, // Ancho del perímetro en píxeles (1-10)
  
  config: {
    colorComparisonMethod: 'lab', // 'rgb' o 'lab' - LAB por defecto para reposicionamiento
    colorThreshold: 10 // Umbral de diferencia de color
  }
};
