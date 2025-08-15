# Guía de Internacionalización (i18n) - WPlace AutoBOT

Esta guía explica cómo usar el sistema de internacionalización implementado en el proyecto.

## 📁 Estructura de Archivos

```
src/
├── locales/
│   ├── index.js          # Sistema principal de i18n
│   ├── es.js            # Traducciones en español
│   ├── en.js            # Traducciones en inglés
│   └── fr.js            # Traducciones en francés
└── core/
    ├── language-selector.js  # Componente selector de idioma
    └── i18n-integration.js   # Helper para integración
```

## 🚀 Uso Básico

### 1. Inicializar el sistema de idiomas

```javascript
import { initializeLanguage, t, getCurrentLanguage } from '../locales/index.js';

// Inicializar automáticamente (detecta idioma del navegador/guardado)
initializeLanguage();

// Obtener idioma actual
const currentLang = getCurrentLanguage(); // 'es', 'en', 'fr'
```

### 2. Obtener textos traducidos

```javascript
import { t, getSection } from '../locales/index.js';

// Método 1: Usar función t() con claves de objeto
const title = t('image.title'); // "WPlace Auto-Image"
const button = t('common.save'); // "Guardar"

// Método 2: Obtener sección completa
const imageTexts = getSection('image');
const title = imageTexts.title;

// Con parámetros
const message = t('image.colorsFound', { count: 25 }); // "✅ 25 colores disponibles encontrados"
```

### 3. Cambiar idioma

```javascript
import { setLanguage, AVAILABLE_LANGUAGES } from '../locales/index.js';

// Cambiar a inglés
setLanguage('en');

// Listar idiomas disponibles
console.log(AVAILABLE_LANGUAGES);
// {
//   es: { name: 'Español', flag: '🇪🇸', code: 'es' },
//   en: { name: 'English', flag: '🇺🇸', code: 'en' },
//   fr: { name: 'Français', flag: '🇫🇷', code: 'fr' }
// }
```

## 🎛️ Selector de Idioma

### Uso básico del selector

```javascript
import { createLanguageSelector } from '../core/language-selector.js';

// Crear selector
const selector = createLanguageSelector({
  position: 'top-right',  // 'top-right', 'top-left', 'bottom-right', etc.
  showFlags: true,        // Mostrar banderas de países
  onLanguageChange: (newLanguage) => {
    console.log(`Idioma cambiado a: ${newLanguage}`);
    // Actualizar UI, recargar textos, etc.
  }
});

// Montar en el DOM
selector.mount(); // Se añade a document.body por defecto
// o
selector.mount(document.getElementById('my-container'));

// Métodos disponibles
selector.setPosition('bottom-left');
selector.update(); // Forzar actualización
selector.unmount(); // Remover del DOM
```

### Integración completa

```javascript
import { initializeLanguageSupport } from '../core/i18n-integration.js';

// En tu módulo principal (ej: image/index.js)
export async function runImage() {
  // ... código existente ...
  
  const ui = await createImageUI({ texts, ...handlers });
  
  // Añadir soporte de idiomas
  const languageSelector = initializeLanguageSupport(ui);
  
  // ... resto del código ...
}
```

## 📝 Añadir Nuevas Traducciones

### 1. Añadir nuevo idioma

1. Crear archivo en `src/locales/nuevo-idioma.js`:

```javascript
export const de = {
  launcher: {
    title: 'WPlace AutoBOT',
    // ... más traducciones
  },
  image: {
    title: "WPlace Auto-Image",
    // ... más traducciones
  },
  common: {
    save: "Speichern",
    // ... más traducciones
  }
};
```

2. Añadir al archivo principal `src/locales/index.js`:

```javascript
import { de } from './de.js';

export const AVAILABLE_LANGUAGES = {
  es: { name: 'Español', flag: '🇪🇸', code: 'es' },
  en: { name: 'English', flag: '🇺🇸', code: 'en' },
  fr: { name: 'Français', flag: '🇫🇷', code: 'fr' },
  de: { name: 'Deutsch', flag: '🇩🇪', code: 'de' }  // ← Añadir aquí
};

const translations = {
  es, en, fr, de  // ← Y aquí
};
```

### 2. Añadir nuevas claves de traducción

Simplemente añade la nueva clave a todos los archivos de idioma:

```javascript
// es.js
export const es = {
  image: {
    // ... claves existentes ...
    newFeature: "Nueva funcionalidad",
    complexMessage: "Procesando {count} elementos de {total}"
  }
};

// en.js
export const en = {
  image: {
    // ... claves existentes ...
    newFeature: "New feature",
    complexMessage: "Processing {count} items of {total}"
  }
};
```

## 🔄 Escuchar Cambios de Idioma

```javascript
// Escuchar evento global de cambio de idioma
window.addEventListener('languageChanged', (event) => {
  const { language, translations } = event.detail;
  console.log(`Idioma cambiado a: ${language}`);
  
  // Actualizar UI
  updateButtonTexts();
  refreshLabels();
  // etc.
});

function updateButtonTexts() {
  // Ejemplo: actualizar botones con data attributes
  document.querySelectorAll('[data-text-key]').forEach(element => {
    const key = element.getAttribute('data-text-key');
    element.textContent = t(key);
  });
}
```

## 📋 Buenas Prácticas

### 1. Organización de claves

```javascript
// ✅ Bueno: Organizado por módulo y jerarquía
t('image.upload.success')
t('image.upload.error')
t('launcher.bot.select')
t('common.buttons.save')

// ❌ Malo: Claves planas y confusas
t('imgUploadOk')
t('errorImg')
t('saveBtn')
```

### 2. Interpolación de parámetros

```javascript
// ✅ Bueno: Parámetros claros
const message = t('image.progress', { painted: 150, total: 500 });
// Resultado: "Progreso: 150/500 píxeles..."

// ❌ Malo: Concatenación manual
const message = t('painted') + ': ' + painted + '/' + total + ' ' + t('pixels');
```

### 3. Valores por defecto

```javascript
// ✅ Bueno: El sistema devuelve la clave si no encuentra traducción
const text = t('unknown.key'); // Retorna 'unknown.key' como fallback

// ✅ Mejor: Verificar si la clave existe
import { isLanguageAvailable } from '../locales/index.js';

if (isLanguageAvailable('pt')) {
  setLanguage('pt');
} else {
  console.warn('Idioma portugués no disponible');
}
```

## 🧪 Ejemplo Completo

```javascript
// ejemplo-modulo.js
import { 
  initializeLanguage, 
  t, 
  getCurrentLanguage,
  setLanguage 
} from '../locales/index.js';
import { createLanguageSelector } from '../core/language-selector.js';

export function createMyModule() {
  // Inicializar idiomas
  initializeLanguage();
  
  // Crear UI
  const container = document.createElement('div');
  container.innerHTML = \`
    <h1>\${t('myModule.title')}</h1>
    <button data-text-key="common.save">\${t('common.save')}</button>
    <p>\${t('myModule.welcome', { user: 'Juan' })}</p>
  \`;
  
  // Añadir selector de idioma
  const languageSelector = createLanguageSelector({
    position: 'top-right',
    onLanguageChange: (lang) => {
      // Actualizar textos cuando cambia el idioma
      updateTexts(container);
    }
  });
  
  languageSelector.mount();
  
  // Escuchar cambios externos
  window.addEventListener('languageChanged', () => {
    updateTexts(container);
  });
  
  return { container, languageSelector };
}

function updateTexts(container) {
  // Actualizar título
  const title = container.querySelector('h1');
  title.textContent = t('myModule.title');
  
  // Actualizar botones con data-text-key
  container.querySelectorAll('[data-text-key]').forEach(element => {
    const key = element.getAttribute('data-text-key');
    element.textContent = t(key);
  });
  
  // Actualizar párrafo con parámetros
  const welcome = container.querySelector('p');
  welcome.textContent = t('myModule.welcome', { user: 'Juan' });
}
```

## 🐛 Solución de Problemas

### Problema: Los textos no se actualizan al cambiar idioma

**Solución**: Asegúrate de escuchar el evento `languageChanged` y actualizar la UI manualmente.

### Problema: Clave de traducción no encontrada

**Solución**: Verifica que la clave exista en todos los archivos de idioma. El sistema devuelve la clave como fallback.

### Problema: El idioma no se guarda entre sesiones

**Solución**: El sistema guarda automáticamente en localStorage. Verifica que el navegador permita localStorage.

### Problema: El selector de idioma no aparece

**Solución**: Asegúrate de llamar a `selector.mount()` después de crear el selector.
