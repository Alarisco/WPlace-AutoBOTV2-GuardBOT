import { 
  AVAILABLE_LANGUAGES, 
  getCurrentLanguage, 
  setLanguage 
} from '../locales/index.js';

/**
 * Crea un selector de idioma
 * @param {Object} options - Opciones de configuración
 * @param {Function} options.onLanguageChange - Callback cuando cambia el idioma
 * @param {string} options.position - Posición del selector ('top-right', 'top-left', etc.)
 * @param {boolean} options.showFlags - Si mostrar banderas de países
 * @returns {Object} Objeto con métodos para controlar el selector
 */
export function createLanguageSelector(options = {}) {
  const {
    onLanguageChange = null,
    position = 'top-right',
    showFlags = true
  } = options;

  // Crear contenedor
  const container = document.createElement('div');
  container.className = 'language-selector';
  
  // Estilos CSS
  const styles = `
    .language-selector {
      position: fixed;
      ${getPositionStyles(position)}
      z-index: 999998;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
      user-select: none;
    }
    
    .language-selector-button {
      background: transparent;
      border: none;
      color: #eee;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s;
      width: 100%;
      text-align: left;
    }
    
    .language-selector-button:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .language-selector-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 6px;
      margin-top: 4px;
      display: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    
    .language-selector-dropdown.visible {
      display: block;
    }
    
    .language-option {
      background: transparent;
      border: none;
      color: #eee;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      text-align: left;
      transition: background 0.2s;
    }
    
    .language-option:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .language-option.active {
      background: rgba(119, 92, 227, 0.2);
      color: #775ce3;
    }
    
    .language-option:first-child {
      border-radius: 6px 6px 0 0;
    }
    
    .language-option:last-child {
      border-radius: 0 0 6px 6px;
    }
    
    .language-flag {
      font-size: 16px;
    }
    
    .language-name {
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .language-selector {
        position: fixed;
        top: 10px;
        right: 10px;
      }
    }
  `;
  
  // Añadir estilos al documento
  if (!document.querySelector('#language-selector-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'language-selector-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
  
  // Estado
  let isOpen = false;
  let currentLang = getCurrentLanguage();
  
  // Crear estructura HTML
  function render() {
    const langInfo = AVAILABLE_LANGUAGES[currentLang];
    
    container.innerHTML = `
      <button class="language-selector-button">
        ${showFlags ? `<span class="language-flag">${langInfo.flag}</span>` : ''}
        <span class="language-name">${langInfo.name}</span>
        <span style="margin-left: auto; transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.2s;">▼</span>
      </button>
      <div class="language-selector-dropdown ${isOpen ? 'visible' : ''}">
        ${Object.entries(AVAILABLE_LANGUAGES).map(([code, info]) => `
          <button class="language-option ${code === currentLang ? 'active' : ''}" data-lang="${code}">
            ${showFlags ? `<span class="language-flag">${info.flag}</span>` : ''}
            <span class="language-name">${info.name}</span>
          </button>
        `).join('')}
      </div>
    `;
    
    // Añadir event listeners
    setupEventListeners();
  }
  
  // Configurar event listeners
  function setupEventListeners() {
    const button = container.querySelector('.language-selector-button');
    const options = container.querySelectorAll('.language-option');
    
    // Toggle dropdown
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen = !isOpen;
      render();
    });
    
    // Selección de idioma
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = option.dataset.lang;
        
        if (selectedLang !== currentLang) {
          currentLang = selectedLang;
          setLanguage(selectedLang);
          
          if (onLanguageChange) {
            onLanguageChange(selectedLang);
          }
        }
        
        isOpen = false;
        render();
      });
    });
    
    // Cerrar al hacer click fuera
    document.addEventListener('click', () => {
      if (isOpen) {
        isOpen = false;
        render();
      }
    });
  }
  
  // Escuchar cambios de idioma desde otros componentes
  function handleLanguageChange(event) {
    if (event.detail.language !== currentLang) {
      currentLang = event.detail.language;
      render();
    }
  }
  
  // Añadir listener para cambios externos de idioma
  window.addEventListener('languageChanged', handleLanguageChange);
  
  // Renderizar inicialmente
  render();
  
  // Métodos públicos
  return {
    /**
     * Añade el selector al DOM
     * @param {HTMLElement} parent - Elemento padre (opcional, por defecto document.body)
     */
    mount(parent = document.body) {
      parent.appendChild(container);
    },
    
    /**
     * Remueve el selector del DOM
     */
    unmount() {
      window.removeEventListener('languageChanged', handleLanguageChange);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    },
    
    /**
     * Actualiza la posición del selector
     * @param {string} newPosition - Nueva posición
     */
    setPosition(newPosition) {
      container.style.cssText = getPositionStyles(newPosition);
    },
    
    /**
     * Obtiene el elemento DOM del selector
     * @returns {HTMLElement} Elemento DOM
     */
    getElement() {
      return container;
    },
    
    /**
     * Fuerza una actualización del componente
     */
    update() {
      currentLang = getCurrentLanguage();
      render();
    }
  };
}

/**
 * Obtiene los estilos CSS para posicionar el selector
 * @param {string} position - Posición deseada
 * @returns {string} Estilos CSS
 */
function getPositionStyles(position) {
  const positions = {
    'top-right': 'top: 15px; right: 15px;',
    'top-left': 'top: 15px; left: 15px;',
    'bottom-right': 'bottom: 15px; right: 15px;',
    'bottom-left': 'bottom: 15px; left: 15px;',
    'top-center': 'top: 15px; left: 50%; transform: translateX(-50%);',
    'bottom-center': 'bottom: 15px; left: 50%; transform: translateX(-50%);'
  };
  
  return positions[position] || positions['top-right'];
}
