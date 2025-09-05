import { getSection } from '../locales/index.js';

export const LAUNCHER_CONFIG = {
  RAW_BASE: 'https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOTV2-GuardBOT/refs/heads/launcherfix',
  REFRESH_INTERVAL: 60000, // 1 minuto
  THEME: {
    primary: '#000000',
    secondary: '#111111',
    accent: '#222222',
    text: '#ffffff',
    highlight: '#775ce3',
    success: '#00ff00',
    error: '#ff0000'
  }
};

// Esta función ahora retorna las traducciones dinámicamente
export function getLauncherTexts() {
  return getSection('launcher');
}

// Función para obtener textos con parámetros
export function getLauncherText(key, params = {}) {
  const texts = getLauncherTexts();
  let text = texts[key] || key;
  
  // Interpolar parámetros
  if (params && Object.keys(params).length > 0) {
    text = text.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }
  
  return text;
}

// Mantener LAUNCHER_TEXTS por compatibilidad pero marcarlo como deprecated
export const LAUNCHER_TEXTS = {
  get es() {
    console.warn('LAUNCHER_TEXTS.es está deprecated. Usa getLauncherTexts() en su lugar.');
    return getLauncherTexts();
  }
};

export const launcherState = {
  me: null,
  health: null,
  refreshTimer: null,
  selectedBot: null
};
