/**
 * Ejemplo de integración del sistema i18n en el módulo de imagen
 * Este archivo muestra cómo añadir el selector de idioma al módulo existente
 */

import { runImage } from './image/index.js';
import { createLanguageSelector } from './core/language-selector.js';
import { t, getCurrentLanguage, setLanguage, AVAILABLE_LANGUAGES } from './locales/index.js';

/**
 * Versión mejorada del módulo de imagen con soporte completo de idiomas
 */
export async function runImageWithI18n() {
  // 1. Ejecutar el módulo de imagen normal
  await runImage();
  
  // 2. Añadir selector de idioma
  const languageSelector = createLanguageSelector({
    position: 'top-left', // Posición diferente para no interferir con la UI existente
    showFlags: true,
    onLanguageChange: (newLanguage) => {
      // Mostrar notificación de cambio
      console.log(`🌍 Idioma cambiado a: ${newLanguage}`);
      
      // Aquí se podría añadir lógica adicional como:
      // - Recargar la UI completa
      // - Actualizar textos dinámicos
      // - Guardar preferencias adicionales
      
      showLanguageChangeNotification(newLanguage);
    }
  });
  
  // 3. Montar el selector
  languageSelector.mount();
  
  // 4. Añadir información sobre el idioma actual en la consola
  logLanguageInfo();
  
  return languageSelector;
}

/**
 * Muestra una notificación temporal cuando cambia el idioma
 */
function showLanguageChangeNotification(language) {
  // Crear notificación temporal
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2d3748;
    color: #eee;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 999999;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    border-left: 4px solid #10b981;
    animation: slideInRight 0.3s ease-out;
  `;
  
  // Añadir estilos de animación
  if (!document.querySelector('#i18n-notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'i18n-notification-styles';
    styles.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(styles);
  }
  
  notification.textContent = t('common.languageChanged', { language });
  document.body.appendChild(notification);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

/**
 * Información de debug sobre el sistema de idiomas
 */
function logLanguageInfo() {
  const currentLang = getCurrentLanguage();
  console.group('🌍 Sistema de Internacionalización');
  console.log(`📍 Idioma actual: ${currentLang}`);
  console.log(`💾 LocalStorage deshabilitado en este bot`);
  console.log(`🌐 Idioma del navegador: ${window.navigator.language}`);
  console.log(`✅ Sistema i18n inicializado correctamente`);
  console.groupEnd();
}

/**
 * Función de utilidad para cambiar el idioma programáticamente
 * Útil para testing o controles adicionales
 */
export function changeLanguage(langCode) {
  if (AVAILABLE_LANGUAGES[langCode]) {
    setLanguage(langCode);
    console.log(`✅ Idioma cambiado a: ${langCode}`);
    return true;
  } else {
    console.error(`❌ Idioma '${langCode}' no disponible`);
    console.log('Idiomas disponibles:', Object.keys(AVAILABLE_LANGUAGES));
    return false;
  }
}

/**
 * Función para añadir atributos de internacionalización a elementos existentes
 * Útil para hacer que elementos antiguos sean traducibles
 */
export function makeElementTranslatable(element, textKey, params = {}) {
  // Añadir atributo para identificación
  element.setAttribute('data-text-key', textKey);
  if (Object.keys(params).length > 0) {
    element.setAttribute('data-text-params', JSON.stringify(params));
  }
  
  // Actualizar texto inicial
  updateElementText(element);
  
  // Escuchar cambios de idioma
  window.addEventListener('languageChanged', () => {
    updateElementText(element);
  });
}

function updateElementText(element) {
  const textKey = element.getAttribute('data-text-key');
  const paramsAttr = element.getAttribute('data-text-params');
  const params = paramsAttr ? JSON.parse(paramsAttr) : {};
  
  if (textKey) {
    element.textContent = t(textKey, params);
  }
}

// Exportar la función principal para uso fácil
export default runImageWithI18n;
