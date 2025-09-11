import { getSection } from '../locales/index.js';

export const SLAVE_CONFIG = {
  RECONNECT_INTERVAL: 5000, // 5 segundos
  TELEMETRY_INTERVAL: 30000, // 30 segundos
  MAX_RECONNECT_ATTEMPTS: 10,
  THEME: {
    primary: '#000000',
    secondary: '#111111',
    accent: '#222222',
    text: '#ffffff',
    highlight: '#775ce3',
    success: '#00ff00',
    error: '#ff0000',
    warning: '#ffaa00',
    connected: '#00ff00',
    connecting: '#ffaa00',
    disconnected: '#ff0000'
  }
};

// Esta función retorna las traducciones dinámicamente
export function getSlaveTexts() {
  return getSection('slave');
}

// Función para obtener textos con parámetros
export function getSlaveText(key, params = {}) {
  const texts = getSlaveTexts();
  let text = texts[key] || key;
  
  // Interpolar parámetros
  Object.keys(params).forEach(param => {
    text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
  });
  
  return text;
}

// Textos por defecto para el slave
export const SLAVE_TEXTS = {
  get es() {
    return getSection('slave');
  }
};

export const slaveState = {
  connectionStatus: 'disconnected',
  slaveId: null,
  currentMode: null,
  isRunning: false,
  masterUrl: 'ws://localhost:8000/ws/slave',
  telemetryData: {
    repaired_pixels: 0,
    missing_pixels: 0,
    absent_pixels: 0,
    remaining_charges: 0
  }
};