import { es } from './es.js';
import { en } from './en.js';
import { fr } from './fr.js';

// Idiomas disponibles
export const AVAILABLE_LANGUAGES = {
  es: { name: 'Español', flag: '🇪🇸', code: 'es' },
  en: { name: 'English', flag: '🇺🇸', code: 'en' },
  fr: { name: 'Français', flag: '🇫🇷', code: 'fr' }
};

// Todas las traducciones
const translations = {
  es,
  en,
  fr
};

// Estado del idioma actual
let currentLanguage = 'es';
let currentTranslations = translations[currentLanguage];

/**
 * Detecta el idioma del navegador
 * @returns {string} Código del idioma detectado
 */
export function detectBrowserLanguage() {
  const browserLang = window.navigator.language || window.navigator.userLanguage || 'es';
  
  // Extraer solo el código del idioma (ej: 'es-ES' -> 'es')
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Verificar si tenemos soporte para este idioma
  if (translations[langCode]) {
    return langCode;
  }
  
  // Fallback a español por defecto
  return 'es';
}

/**
 * Obtiene el idioma guardado en localStorage
 * @returns {string} Código del idioma guardado o null
 */
export function getSavedLanguage() {
  try {
    return localStorage.getItem('wplace-autobot-language');
  } catch (error) {
    console.warn('No se pudo acceder a localStorage:', error);
    return null;
  }
}

/**
 * Guarda el idioma en localStorage
 * @param {string} langCode - Código del idioma
 */
export function saveLanguage(langCode) {
  try {
    localStorage.setItem('wplace-autobot-language', langCode);
  } catch (error) {
    console.warn('No se pudo guardar el idioma en localStorage:', error);
  }
}

/**
 * Inicializa el sistema de idiomas
 * @returns {string} Código del idioma inicializado
 */
export function initializeLanguage() {
  // Prioridad: guardado > navegador > español
  const savedLang = getSavedLanguage();
  const browserLang = detectBrowserLanguage();
  
  let selectedLang = 'es'; // fallback por defecto
  
  if (savedLang && translations[savedLang]) {
    selectedLang = savedLang;
  } else if (browserLang && translations[browserLang]) {
    selectedLang = browserLang;
  }
  
  setLanguage(selectedLang);
  return selectedLang;
}

/**
 * Cambia el idioma actual
 * @param {string} langCode - Código del idioma
 */
export function setLanguage(langCode) {
  if (!translations[langCode]) {
    console.warn(`Idioma '${langCode}' no disponible. Usando '${currentLanguage}'`);
    return;
  }
  
  currentLanguage = langCode;
  currentTranslations = translations[langCode];
  saveLanguage(langCode);
  
  // Emitir evento personalizado para que los módulos puedan reaccionar
  if (typeof window !== 'undefined' && window.CustomEvent) {
    window.dispatchEvent(new window.CustomEvent('languageChanged', { 
      detail: { language: langCode, translations: currentTranslations } 
    }));
  }
}

/**
 * Obtiene el idioma actual
 * @returns {string} Código del idioma actual
 */
export function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Obtiene las traducciones actuales
 * @returns {object} Objeto con todas las traducciones del idioma actual
 */
export function getCurrentTranslations() {
  return currentTranslations;
}

/**
 * Obtiene un texto traducido usando notación de punto
 * @param {string} key - Clave del texto (ej: 'image.title', 'common.cancel')
 * @param {object} params - Parámetros para interpolación (ej: {count: 5})
 * @returns {string} Texto traducido
 */
export function t(key, params = {}) {
  const keys = key.split('.');
  let value = currentTranslations;
  
  // Navegar por la estructura de objetos
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Clave de traducción no encontrada: '${key}'`);
      return key; // Retornar la clave como fallback
    }
  }
  
  if (typeof value !== 'string') {
    console.warn(`Clave de traducción no es string: '${key}'`);
    return key;
  }
  
  // Interpolar parámetros
  return interpolate(value, params);
}

/**
 * Interpola parámetros en un string
 * @param {string} text - Texto con marcadores {key}
 * @param {object} params - Parámetros a interpolar
 * @returns {string} Texto con parámetros interpolados
 */
function interpolate(text, params) {
  if (!params || Object.keys(params).length === 0) {
    return text;
  }
  
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match;
  });
}

/**
 * Obtiene traducciones de una sección específica
 * @param {string} section - Sección (ej: 'image', 'launcher', 'common')
 * @returns {object} Objeto con las traducciones de la sección
 */
export function getSection(section) {
  if (currentTranslations[section]) {
    return currentTranslations[section];
  }
  
  console.warn(`Sección de traducción no encontrada: '${section}'`);
  return {};
}

/**
 * Verifica si un idioma está disponible
 * @param {string} langCode - Código del idioma
 * @returns {boolean} True si está disponible
 */
export function isLanguageAvailable(langCode) {
  return !!translations[langCode];
}

// Inicializar automáticamente al cargar el módulo
initializeLanguage();
