# 🌍 Sistema de Internacionalización (i18n) - WPlace AutoBOT

## 📖 Resumen

Se ha implementado un sistema completo de internacionalización que permite:

- ✅ **Soporte multi-idioma**: Español, Inglés y Francés
- ✅ **Detección automática**: Detecta el idioma del navegador
- ✅ **Persistencia**: Guarda la preferencia en localStorage
- ✅ **Selector visual**: Componente UI para cambiar idiomas
- ✅ **Interpolación**: Soporte para parámetros en textos
- ✅ **Eventos**: Sistema de eventos para cambios de idioma
- ✅ **Backward compatibility**: Compatible con código existente

## 🚀 Inicio Rápido

### Uso básico en cualquier módulo:

```javascript
import { t, initializeLanguage } from './locales/index.js';

// Inicializar
initializeLanguage();

// Usar traducciones
const title = t('image.title'); // "WPlace Auto-Image"
const message = t('image.colorsFound', { count: 25 });
```

### Añadir selector de idioma:

```javascript
import { createLanguageSelector } from './core/language-selector.js';

const selector = createLanguageSelector({ position: 'top-right' });
selector.mount();
```

## 📁 Archivos Creados/Modificados

### Nuevos archivos:
- `src/locales/index.js` - Sistema principal i18n
- `src/locales/es.js` - Traducciones español
- `src/locales/en.js` - Traducciones inglés  
- `src/locales/fr.js` - Traducciones francés
- `src/core/language-selector.js` - Componente selector
- `src/core/i18n-integration.js` - Helpers integración
- `src/examples/image-with-i18n.js` - Ejemplo uso
- `docs/I18N_GUIDE.md` - Documentación completa

### Archivos modificados:
- `src/image/config.js` - Adaptado para usar nuevo sistema
- `src/image/index.js` - Integrado con sistema i18n
- `src/launcher/config.js` - Adaptado para nuevo sistema
- `src/launcher/ui.js` - Usando funciones dinámicas

## 🎯 Funcionalidades Implementadas

### 1. Sistema Principal (`src/locales/index.js`)
- Detección automática del idioma del navegador
- Persistencia en localStorage
- Función `t()` para traducciones con interpolación
- Eventos `languageChanged` para actualización en tiempo real
- Funciones de utilidad: `setLanguage()`, `getCurrentLanguage()`, etc.

### 2. Selector Visual (`src/core/language-selector.js`)
- Dropdown elegante con banderas de países
- Posicionamiento configurable (top-right, top-left, etc.)
- Callbacks para cambios de idioma
- Responsive y accesible

### 3. Traducciones Organizadas
Estructura jerárquica por módulos:
```javascript
{
  launcher: { title, buttons, messages... },
  image: { title, actions, status... },
  common: { save, cancel, error... }
}
```

### 4. Interpolación de Parámetros
```javascript
// Texto: "Procesando {count} de {total} elementos"
t('status.processing', { count: 5, total: 100 });
// Resultado: "Procesando 5 de 100 elementos"
```

## 🔧 Integración en Módulos Existentes

### Opción 1: Integración mínima
```javascript
// En tu módulo existente
import { t, initializeLanguage } from '../locales/index.js';

initializeLanguage();
// Reemplazar textos hardcodeados por t('clave')
```

### Opción 2: Integración completa
```javascript
// Usar el helper completo
import { initializeLanguageSupport } from '../core/i18n-integration.js';

const ui = createMyUI();
const languageSelector = initializeLanguageSupport(ui);
```

## 📋 Idiomas Soportados

| Código | Idioma | Bandera | Estado |
|--------|--------|---------|--------|
| `es` | Español | 🇪🇸 | ✅ Completo |
| `en` | English | 🇺🇸 | ✅ Completo |
| `fr` | Français | 🇫🇷 | ✅ Completo |

## ➕ Añadir Nuevo Idioma

1. **Crear archivo de traducciones**:
```javascript
// src/locales/de.js
export const de = {
  launcher: { title: 'WPlace AutoBOT', ... },
  image: { title: 'WPlace Auto-Image', ... },
  common: { save: 'Speichern', ... }
};
```

2. **Registrar en el sistema**:
```javascript
// src/locales/index.js
import { de } from './de.js';

export const AVAILABLE_LANGUAGES = {
  // ... existentes ...
  de: { name: 'Deutsch', flag: '🇩🇪', code: 'de' }
};

const translations = { es, en, fr, de };
```

## 🧪 Testing y Debugging

### Cambiar idioma por consola:
```javascript
// En la consola del navegador
import('./locales/index.js').then(({ setLanguage }) => {
  setLanguage('en'); // Cambiar a inglés
});
```

### Ver estado actual:
```javascript
import('./locales/index.js').then(({ getCurrentLanguage, AVAILABLE_LANGUAGES }) => {
  console.log('Idioma actual:', getCurrentLanguage());
  console.log('Idiomas disponibles:', AVAILABLE_LANGUAGES);
});
```

## 🎨 Personalización del Selector

```javascript
const selector = createLanguageSelector({
  position: 'bottom-right',     // Posición
  showFlags: true,              // Mostrar banderas
  onLanguageChange: (lang) => { // Callback personalizado
    console.log(`Cambiado a: ${lang}`);
    // Lógica personalizada aquí
  }
});
```

## 📈 Próximas Mejoras

- [ ] Soporte para más idiomas (alemán, portugués, etc.)
- [ ] Detección automática de región (es-ES vs es-MX)
- [ ] Pluralización inteligente
- [ ] Formateado de fechas/números por región
- [ ] Carga dinámica de traducciones
- [ ] Herramientas de traducción automática

## 💡 Tips de Uso

1. **Usa claves descriptivas**: `image.upload.success` mejor que `imgOk`
2. **Agrupa por módulo**: Mantén las traducciones organizadas
3. **Usa interpolación**: Para textos dinámicos usa `{parametros}`
4. **Escucha eventos**: Para actualizar UI en tiempo real
5. **Fallbacks**: El sistema devuelve la clave si no encuentra traducción

## 🆘 Solución de Problemas

**P: Los textos no cambian al cambiar idioma**
R: Asegúrate de escuchar el evento `languageChanged` y actualizar la UI manualmente.

**P: Error "t is not defined"**
R: Importa la función: `import { t } from '../locales/index.js'`

**P: El selector no aparece**
R: Llama a `selector.mount()` después de crearlo.

---

✨ **¡El sistema está listo para usar!** Consulta `docs/I18N_GUIDE.md` para documentación detallada.
