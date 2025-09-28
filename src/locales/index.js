import { es } from './es.js';
import { en } from './en.js';
import { de } from './de.js';
import { fr } from './fr.js';
import { ru } from './ru.js';
import { zhHans } from './zh-Hans.js';
import { zhHant } from './zh-Hant.js';
import { pt } from './pt.js';

// Idiomas disponibles
export const AVAILABLE_LANGUAGES = {
  es: { name: 'Español', flag: '🇪🇸', code: 'es' },
  en: { name: 'English', flag: '🇺🇸', code: 'en' },
  de: { name: 'Deutsch', flag: '🇩🇪', code: 'de' },
  fr: { name: 'Français', flag: '🇫🇷', code: 'fr' },
  ru: { name: 'Русский', flag: '🇷🇺', code: 'ru' },
  zhHans: { name: '简体中文', flag: '🇨🇳', code: 'zh-Hans' },
  zhHant: { name: '繁體中文', flag: '🇨🇳', code: 'zh-Hant' },
  pt: { name: 'Português (Brasil)', flag: '🇧🇷', code: 'pt' }
};

// Todas las traducciones
const translations = {
  es,
  en,
  de,
  fr,
  ru,
  zhHans,
  zhHant,
  pt
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

  // Extraer solo el código del idioma (ej: 'es-ES' -> 'es', 'pt-BR' -> 'pt')
  const langCode = browserLang.split('-')[0].toLowerCase();

  // Verificar si tenemos soporte para este idioma
  if (translations[langCode]) {
    return langCode;
  }

  // Fallback a español por defecto
  return 'es';
}

/**
 * Obtiene el idioma guardado (deshabilitado - no usar localStorage)
 * @returns {string} Siempre retorna null
 */
export function getSavedLanguage() {
  // No usar localStorage - siempre retornar null
  return null;
}

/**
 * Guarda el idioma (deshabilitado - no usar localStorage)
 * @param {string} langCode - Código del idioma
 */
export function saveLanguage(langCode) {
  // No guardar en localStorage - función deshabilitada
  return;
}

/**
 * Obtiene el idioma global del sistema de bots
 * @returns {string|null} Idioma global establecido o null
 */
function getGlobalLanguage() {
  try {
    return window.__wplaceBot?.globalLanguage || null;
  } catch {
    return null;
  }
}

/**
 * Establece el idioma global del sistema de bots
 * @param {string} langCode - Código del idioma
 */
function setGlobalLanguage(langCode) {
  try {
    if (!window.__wplaceBot) {
      window.__wplaceBot = {};
    }
    window.__wplaceBot.globalLanguage = langCode;
  } catch {
    // Silenciar errores
  }
}

/**
 * Inicializa el sistema de idiomas
 * @returns {string} Código del idioma inicializado
 */
export function initializeLanguage() {
  // Prioridad: global > guardado > navegador > español
  const globalLang = getGlobalLanguage();
  const savedLang = getSavedLanguage();
  const browserLang = detectBrowserLanguage();

  let selectedLang = 'es'; // fallback por defecto a español

  if (globalLang && translations[globalLang]) {
    selectedLang = globalLang;
  } else if (savedLang && translations[savedLang]) {
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
  setGlobalLanguage(langCode); // Actualizar idioma global

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
