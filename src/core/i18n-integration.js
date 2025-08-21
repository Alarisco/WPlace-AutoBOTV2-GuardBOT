import { createLanguageSelector } from '../core/language-selector.js';
import { getCurrentLanguage, t } from '../locales/index.js';

/**
 * Añade el selector de idioma al módulo de imagen
 * @param {Object} ui - Instancia de la UI del módulo imagen
 */
export function addLanguageSelector(ui) {
  // Crear selector de idioma
  const languageSelector = createLanguageSelector({
    position: 'top-left',
    showFlags: true,
    onLanguageChange: (newLanguage) => {
      console.log(`Idioma cambiado a: ${newLanguage}`);
      
      // Mostrar notificación
      if (ui && ui.setStatus) {
        ui.setStatus(t('common.languageChanged', { language: newLanguage }), 'info');
      }
      
      // Aquí podrías recargar la UI o actualizar textos dinámicamente
      // Por ejemplo, reconstruir botones, actualizar labels, etc.
      updateUITexts(ui);
    }
  });
  
  // Montar el selector
  languageSelector.mount();
  
  // Escuchar cambios de idioma externos
  window.addEventListener('languageChanged', (event) => {
    console.log('Evento languageChanged recibido:', event.detail);
    updateUITexts(ui);
  });
  
  return languageSelector;
}

/**
 * Actualiza los textos de la UI cuando cambia el idioma
 * @param {Object} ui - Instancia de la UI
 */
function updateUITexts(ui) {
  // Aquí puedes añadir lógica para actualizar textos dinámicamente
  // Por ejemplo:
  
  // 1. Actualizar títulos de botones
  const buttons = document.querySelectorAll('[data-text-key]');
  buttons.forEach(button => {
    const textKey = button.getAttribute('data-text-key');
    if (textKey) {
      button.textContent = t(textKey);
    }
  });
  
  // 2. Actualizar mensajes de estado
  if (ui && ui.setStatus) {
    const currentLang = getCurrentLanguage();
    ui.setStatus(t('common.languageChanged', { language: currentLang }), 'success');
  }
  
  // 3. Actualizar labels de formularios
  const labels = document.querySelectorAll('[data-label-key]');
  labels.forEach(label => {
    const labelKey = label.getAttribute('data-label-key');
    if (labelKey) {
      label.textContent = t(labelKey);
    }
  });
}

/**
 * Wrapper para facilitar el uso en cualquier módulo
 * Ejemplo de uso:
 * 
 * import { initializeLanguageSupport } from '../core/i18n-integration.js';
 * 
 * const ui = createImageUI(...);
 * const langSelector = initializeLanguageSupport(ui);
 */
export function initializeLanguageSupport(ui = null) {
  return addLanguageSelector(ui);
}
