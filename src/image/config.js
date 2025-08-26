import { getSection } from '../locales/index.js';

export const IMAGE_DEFAULTS = {
  SITEKEY: '0x4AAAAAABpqJe8FO0N84q0F',
  COOLDOWN_DEFAULT: 31000,
  TRANSPARENCY_THRESHOLD: 100,
  WHITE_THRESHOLD: 250,
  LOG_INTERVAL: 10,
  TILE_SIZE: 3000,
  PIXELS_PER_BATCH: 20,
  CHARGE_REGEN_MS: 30000,
  THEME: {
    primary: '#000000',
    secondary: '#111111',
    accent: '#222222',
    text: '#ffffff',
    highlight: '#775ce3',
    success: '#00ff00',
    error: '#ff0000',
    warning: '#ffaa00'
  }
};

// Esta función ahora retorna las traducciones dinámicamente
export function getImageTexts() {
  return getSection('image');
}

// Función para obtener textos con parámetros
export function getImageText(key, params = {}) {
  const texts = getImageTexts();
  let text = texts[key] || key;
  
  // Interpolar parámetros
  if (params && Object.keys(params).length > 0) {
    text = text.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }
  
  return text;
}

// Mantener TEXTS por compatibilidad pero marcarlo como deprecated
export const TEXTS = {
  get es() {
    console.warn('TEXTS.es está deprecated. Usa getImageTexts() en su lugar.');
    return getImageTexts();
  }
};

export const imageState = {
  running: false,
  imageLoaded: false,
  processing: false,
  totalPixels: 0,
  paintedPixels: 0,
  availableColors: [],
  currentCharges: 0,
  cooldown: IMAGE_DEFAULTS.COOLDOWN_DEFAULT,
  imageData: null,
  stopFlag: false,
  colorsChecked: false,
  startPosition: null,
  selectingPosition: false,
  positionTimeoutId: null, // Para manejar timeout de selección
  cleanupObserver: null, // Para limpiar observers
  region: null,
  minimized: false,
  lastPosition: { x: 0, y: 0 },
  estimatedTime: 0,
  language: 'es',
  tileX: null,
  tileY: null,
  pixelsPerBatch: IMAGE_DEFAULTS.PIXELS_PER_BATCH,
  useAllChargesFirst: true, // Usar todas las cargas en la primera pasada
  isFirstBatch: true, // Controlar si es la primera pasada
  maxCharges: 9999, // Cargas máximas del usuario
  nextBatchCooldown: 0, // Tiempo para el siguiente lote
  inCooldown: false,
  cooldownEndTime: 0,
  remainingPixels: [],
  lastChargeUpdate: 0,
  chargeDecimalPart: 0,
  originalImageName: null,
  retryCount: 0, // Contador de reintentos para estadísticas
  // Nuevas opciones para patrones
  paintPattern: 'linear_start' // Patrón de pintado predeterminado
};
