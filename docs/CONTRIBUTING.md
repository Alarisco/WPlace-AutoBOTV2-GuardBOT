# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a WPlace AutoBOT! Esta guía te ayudará a entender cómo funciona el proyecto y cómo puedes colaborar.

## 📋 Reglas Básicas

- ✅ **Conventional Commits:** Usa el formato estándar en tus PRs
- ✅ **Issues primero:** Para cambios grandes, abre un Issue antes del PR
- ✅ **CI/CD:** El sistema valida automáticamente JS, Markdown y YAML
-### Ideas para Contribuir



---

## 🏗️ Estructura del Proyecto

El proyecto está modularizado para facilitar el mantenimiento y desarrollo:

```
WPlace-AutoBOT/
├── src/                    # Código fuente modular
│   ├── core/              # Módulos base reutilizables
│   │   ├── capture.js     # Sistema de captura de canvas
│   │   ├── dom.js         # Utilidades DOM y Shadow DOM
│   │   ├── http.js        # fetchWithTimeout y utilidades HTTP
│   │   ├── language-selector.js # Componente selector de idiomas
│   │   ├── loader.js      # loadAndEvalUrlWithFallback
│   │   ├── logger.js      # Sistema de logging
│   │   ├── storage.js     # LocalStorage wrapper
│   │   ├── timing.js      # sleep() y retry()
│   │   ├── turnstile.js   # Carga y ejecución de Turnstile
│   │   ├── ui-utils.js    # Utilidades de interfaz
│   │   ├── utils.js       # Utilidades generales
│   │   └── wplace-api.js  # API unificada de WPlace
│   ├── locales/           # 🌍 Sistema de internacionalización
│   │   ├── index.js       # Motor i18n: traducción, detección, persistencia
│   │   ├── es.js          # Traducciones en español (por defecto)
│   │   ├── en.js          # Traducciones en inglés
│   │   ├── fr.js          # Traducciones en francés
|   |   ├── zh-Hans.js     # Traducciones en 简体中文
|   |   └── zh-Hant.js     # Traducciones en 繁體中文
│   ├── ui/                # Componentes de interfaz
│   │   ├── drag.js        # makeDraggable - Sistema de arrastre
│   │   └── overlay.js     # createOverlay con Shadow DOM
│   ├── launcher/          # 🧭 Lógica del Auto-Launcher
│   │   ├── api.js         # API del launcher
│   │   ├── config.js      # Configuración del launcher
│   │   ├── index.js       # runLauncher principal
│   │   └── ui.js          # UI específica del launcher
│   ├── farm/              # 🌾 Lógica del Auto-Farm
│   │   ├── calibrate.js   # Calibración por fetch sniffing
│   │   ├── config.js      # Configuración del farm
│   │   ├── coords.js      # Coordenadas aleatorias y colores
│   │   ├── index.js       # runFarm principal
│   │   ├── loop.js        # Loop de pintado y retry
│   │   └── ui.js          # UI específica del farm
│   ├── image/             # 🎨 Lógica del Auto-Image
│   │   ├── batcher.js     # Agrupación por tiles
│   │   ├── config.js      # Configuración de imagen
│   │   ├── image-processor.js # Procesamiento de imágenes
│   │   ├── index.js       # runImage principal
│   │   ├── loop.js        # Loop de pintado por lotes
│   │   ├── painter.js     # Sistema de pintado
│   │   ├── palette.js     # Coincidencia de colores
│   │   ├── processor.js   # Procesador de imágenes
│   │   ├── progress.js    # Persistencia de progreso
│   │   ├── save-load.js   # Sistema guardar/cargar
│   │   └── ui.js          # UI específica de imagen
│   └── entries/           # Puntos de entrada (bookmarklets)
│       ├── farm.js        # Entry point para Auto-Farm.js
│       ├── image.js       # Entry point para Auto-Image.js
│       └── launcher.js    # Entry point para Auto-Launcher.js
├── Auto-Farm.js           # 🔴 GENERADO - No editar
├── Auto-Image.js          # 🔴 GENERADO - No editar
├── Auto-Launcher.js       # 🔴 GENERADO - No editar
├── build.mjs              # Script de build con esbuild
├── package.json           # Dependencias y scripts
├── eslint.config.js       # Configuración de ESLint v9
├── .prettierrc            # Configuración de Prettier
├── README.md              # 🇪🇸 Documentación principal en español
└── docs/                  # 📚 Documentación multiidioma
    ├── README.md          # Índice de navegación multiidioma
    ├── README-es.md       # 🇪🇸 Documentación completa en español
    ├── README-en.md       # 🇺🇸 Complete English documentation
    ├── README-fr.md       # 🇫🇷 Documentation complète en français
    ├── CONTRIBUTING.md    # Esta guía de contribución
    ├── I18N_GUIDE.md      # Guía del sistema de internacionalización
    ├── SECURITY.md        # Política de seguridad
    └── SUPPORT.md         # Guía de soporte
```

## 🌍 Sistema de Internacionalización (i18n)

### Arquitectura del Sistema i18n

El proyecto incluye un sistema completo de internacionalización que permite soporte para múltiples idiomas:

#### `src/locales/index.js` - Motor Principal
- **🔧 Funciones principales:**
  - `initializeLanguage()` - Inicialización automática
  - `t(key, params)` - Función de traducción con interpolación
  - `setLanguage(lang)` - Cambio de idioma con persistencia
  - `getCurrentLanguage()` - Obtener idioma actual

#### Archivos de Traducción
```javascript
// src/locales/es.js - Español (por defecto)
export default {
  launcher: { title: "WPlace AutoBOT", /* ... */ },
  image: { title: "WPlace Auto-Image", /* ... */ },
  farm: { title: "WPlace Farm Bot", /* ... */ },
  common: { yes: "Sí", no: "No", /* ... */ }
};
```

#### `src/core/language-selector.js` - Componente UI
- **🎨 Selector visual** con banderas de países
- **📱 Responsive** y posicionamiento configurable
- **🔄 Auto-actualización** cuando cambia el idioma
- **🎛️ Callbacks** para eventos de cambio

### Idiomas Soportados
- **🇪🇸 Español (es)** - Idioma por defecto
- **🇺🇸 English (en)** - Soporte completo
- **🇫🇷 Français (fr)** - Soporte completo

### Agregar un Nuevo Idioma

1. **Crear archivo de traducciones:**
```bash
# Ejemplo para alemán
cp src/locales/es.js src/locales/de.js
```

2. **Traducir todas las claves:**
```javascript
// src/locales/de.js
export default {
  launcher: {
    title: "WPlace AutoBOT",
    autoFarm: "🌾 Auto-Farm",
    // ... todas las traducciones
  }
};
```

3. **Registrar en el motor i18n:**
```javascript
// src/locales/index.js
import de from './de.js';

const translations = {
  es: { name: "Español", flag: "🇪🇸", code: "es" },
  en: { name: "English", flag: "🇺🇸", code: "en" },
  fr: { name: "Français", flag: "🇫🇷", code: "fr" },
  de: { name: "Deutsch", flag: "🇩🇪", code: "de" }  // ← Nuevo
};

const translationsData = { es, en, fr, de }; // ← Agregar
```

4. **Crear documentación:**
```bash
# Traducir README
cp docs/README-en.md docs/README-de.md
# Traducir contenido...
```

### Uso en el Código

#### Traducción Básica
```javascript
import { t } from '../locales/index.js';

// Texto simple
const title = t('launcher.title'); // → "WPlace AutoBOT"

// Con interpolación
const progress = t('image.paintingProgress', {
  painted: 150,
  total: 500
}); // → "🧱 Progreso: 150/500 píxeles..."
```

#### Integración en UI
```javascript
import { initializeLanguage, t, getCurrentLanguage } from '../locales/index.js';
import { createLanguageSelector } from '../core/language-selector.js';

// Inicializar sistema
initializeLanguage();

// Crear selector de idiomas
const languageSelector = createLanguageSelector({
  position: 'top-left',
  showFlags: true,
  onLanguageChange: (newLang) => {
    console.log(`Idioma cambiado a: ${newLang}`);
    updateTexts(); // Actualizar toda la UI
  }
});

// Montar componente
languageSelector.mount();

// Función para actualizar textos
function updateTexts() {
  document.querySelector('.title').textContent = t('launcher.title');
  document.querySelector('.start-btn').textContent = t('common.start');
  // ... actualizar todos los elementos
}

// Escuchar cambios globales de idioma
window.addEventListener('languageChanged', (event) => {
  const { language } = event.detail;
  updateTexts();
});
```

### Convenciones de Claves

#### Estructura Jerárquica
```javascript
{
  module: {           // launcher, image, farm, common
    section: {        // ui, actions, status, etc.
      key: "value"    // title, start, stop, etc.
    }
  }
}
```

#### Ejemplos de Claves
```javascript
// ✅ Buenas prácticas
"launcher.title"           // Título del launcher
"image.uploadImage"        // Botón subir imagen
"farm.configuration"       // Sección configuración
"common.save"             // Botón guardar (reutilizable)

// ❌ Evitar
"launcherTitle"           // Sin jerarquía
"upload_image_button"     // Muy específico
"save_farm_config"        // No reutilizable
```

### Testing de Traducciones

```bash
# Verificar que todas las claves están traducidas
npm run lint:i18n  # (script futuro)

# Probar cambio de idioma en desarrollo
npm run watch
# Abrir navegador y probar selector de idiomas
```

---

### Instalación de Dependencias

```bash
# Instalar todas las dependencias
npm install
```

### Scripts de Build

```bash
# Build de producción (minificado)
npm run build

# Build de desarrollo (con sourcemaps)
npm run build:dev

# Modo watch (reconstruye automáticamente)
npm run watch

# Linter
npm run lint
```

### Detalles de los Scripts

#### `npm run build`
- ✅ **Minificación:** Código optimizado para producción
- ✅ **Bundle:** Todo el código en archivos únicos IIFE
- ✅ **Target:** ES2019 para máxima compatibilidad
- ✅ **Banner:** Incluye timestamp de compilación

#### `npm run build:dev`
- ✅ **Sin minificar:** Código legible para debug
- ✅ **Sourcemaps:** Mapeo a código fuente original
- ✅ **Debug mode:** `NODE_ENV=development`

#### `npm run watch`
- ✅ **Auto-rebuild:** Detecta cambios en `src/`
- ✅ **Notificaciones:** Informa éxito/error de rebuild
- ✅ **Desarrollo continuo:** Ideal para desarrollo activo

#### `npm run lint`
- ✅ **ESLint v9:** Configuración moderna
- ✅ **Errores y warnings:** Detecta problemas de código
- ✅ **Estándares:** Aplica buenas prácticas

## ⚙️ Sistema de Build

### Estado Actual: Migración en Progreso

> ⚠️ **Nota Importante**: Actualmente el proyecto está en **migración gradual** hacia la arquitectura modular.
> Los archivos `Auto-*.js` utilizan temporalmente el código original mientras completamos la refactorización.

### Proceso con esbuild

El sistema está configurado para usar **esbuild** para generar los 3 archivos finales en la raíz:

```javascript
// build.mjs - Estado actual
const useOriginals = true; // 🔄 Cambiará a false cuando la migración esté completa

if (useOriginals) {
  // Copia los archivos originales (comportamiento actual)
  copyFileSync("Auto-Farm.original.js", "Auto-Farm.js");
  // ...
} else {
  // Genera desde módulos en src/ (objetivo final)
  // ...
}
```

### Configuración Final (en desarrollo)

```javascript
// build.mjs
const jobs = [
  { in: "src/entries/farm.js",     out: "Auto-Farm.js" },
  { in: "src/entries/image.js",    out: "Auto-Image.js" },
  { in: "src/entries/launcher.js", out: "Auto-Launcher.js" }
]
```

### Configuración

```javascript
const common = {
  bundle: true,
  format: "iife",           // Ideal para bookmarklets
  target: ["es2019"],       // Compatibilidad amplia
  legalComments: "none",    // Sin comentarios de licencia
  banner: {
    js: "/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado [timestamp] */"
  }
}
```

### ¿Por qué IIFE?

- **Bookmarklets:** Formato perfecto para `javascript:` URLs
- **Encapsulación:** No contamina el scope global
- **Compatibilidad:** Funciona en todos los navegadores

## 🔄 Flujo de Desarrollo

### 1. Setup Inicial

```bash
# Clonar el repositorio
git clone https://github.com/Alarisco/WPlace-AutoBOT.git
cd WPlace-AutoBOT

# Instalar dependencias
npm install

# Verificar que todo funciona
npm run build
```

### 2. Desarrollo

```bash
# Modo watch para desarrollo
npm run watch

# En otra terminal, servir archivos (opcional)
python3 -m http.server 8000
```

### 3. Editar Código

- ✅ **Solo edita archivos en `src/`**
- ❌ **NUNCA edites los archivos `Auto-*.js`** (se sobrescriben)
- ✅ **Usa el linter:** `npm run lint`
- ✅ **Prueba frecuentemente:** Los archivos se regeneran automáticamente

### 4. Testing

```bash
# Build final antes de commit
npm run build

# Verificar que no hay errores de lint
npm run lint

# Probar los bookmarklets generados
```

### 5. Commit y PR

```bash
# Conventional commits
git add .
git commit -m "feat(core): nueva funcionalidad X"
git push origin feature/nueva-funcionalidad

# Abrir PR en GitHub
```

## 📝 Conventional Commits

Usa este formato para tus commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Tipos Válidos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Solo documentación
- `style`: Formato, espacios, etc
- `refactor`: Reestructuración sin cambios funcionales
- `test`: Añadir o corregir tests
- `chore`: Mantenimiento, deps, build

### Scopes Recomendados

- `core`: Módulos base (`src/core/`)
- `ui`: Componentes de interfaz (`src/ui/`)
- `i18n`: Sistema de internacionalización (`src/locales/`)
- `launcher`: Auto-Launcher (`src/launcher/`)
- `farm`: Auto-Farm (`src/farm/`)
- `image`: Auto-Image (`src/image/`)
- `build`: Sistema de build
- `docs`: Documentación

### Ejemplos

```bash
feat(core): añadir módulo de retry con backoff exponencial
fix(farm): corregir calibración en tiles negativos
docs(readme): actualizar guía de instalación
refactor(ui): migrar overlay a shadow DOM
feat(i18n): agregar soporte para idioma alemán
feat(launcher): añadir selector de idiomas
chore(build): actualizar esbuild a v0.21.5
docs(i18n): crear guía de traducción
```

## 🧪 Testing y Calidad

### Linting

El proyecto usa ESLint v9 con configuración moderna:

```javascript
// eslint.config.js
export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: { /* browser globals */ }
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none' }],
      'no-implicit-globals': 'error',
      'no-alert': 'off'  // Los bookmarklets usan alert
    }
  }
];
```

### Prettier

Formateo automático:

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100
}
```

## 🚀 Arquitectura

### Módulos Core

#### `src/core/wplace-api.js`
API unificada para WPlace:
- `getSession()` - Obtener datos del usuario
- `checkHealth()` - Estado del servidor
- `postPixelBatch()` - Envío de píxeles por lotes

#### `src/core/language-selector.js`
Componente de selector de idiomas:
- `createLanguageSelector()` - Crear componente con opciones
- Posicionamiento configurable y callbacks
- Auto-actualización y cleanup automático

#### `src/core/turnstile.js`
Gestión de Cloudflare Turnstile:
- `loadTurnstile()` - Carga el script
- `executeTurnstile()` - Obtiene tokens

#### `src/core/http.js`
Utilidades HTTP:
- `fetchWithTimeout()` - Fetch con timeout

### Módulos de Funcionalidad

#### `src/launcher/index.js`
Launcher principal que permite elegir entre bots:
- Interfaz unificada para selección de bot
- Gestión de estado del servidor y usuario
- Integración completa con sistema i18n

#### `src/locales/index.js`
Motor de internacionalización:
- Detección automática de idioma del navegador
- Persistencia de preferencias en localStorage
- Sistema de eventos para sincronización global

### Entry Points

Cada entry point (`src/entries/*.js`) envuelve la lógica principal:

```javascript
// src/entries/farm.js
import { runFarm } from "../farm/index.js";

(() => {
  "use strict";
  if (window.__wplaceBot?.running) {
    alert("WPlace BOT ya está corriendo.");
    return;
  }
  window.__wplaceBot = { running: true };
  runFarm().catch(/* error handling */);
})();
```

### UI Components

#### Shadow DOM
Evita conflictos CSS con la página:

```javascript
// src/ui/overlay.js
import { mountShadow } from "../core/dom.js";

export function createOverlay({ title = "WPlace BOT" } = {}) {
  const { host, root } = mountShadow();
  // UI components...
}
```

## 🔍 Debugging

### Console Commands

```javascript
// Debug de coordenadas
debugCoords()

// Debug de cargas
debugCharges()

// Configurar píxeles por lote
setPixelsPerBatch(25)

// Ver estado actual
console.log(window.__wplaceBot)
```

### Build Debug

```bash
# Build en modo desarrollo
npm run build:dev

# Los sourcemaps permiten debugging en devtools
```

## 📦 Releases

### Proceso de Release

1. **Develop en rama feature**
2. **PR a `main`**
3. **CI/CD valida automáticamente**
4. **Merge crea nueva release**
5. **Bookmarklets** apuntan automáticamente a la nueva versión

### Versioning

- Usa **Semantic Versioning** (`MAJOR.MINOR.PATCH`)
- Tags en formato `vX.Y.Z`
- Los bookmarklets siempre cargan desde `main`

## 💡 Ideas para Contribuir

### Nuevas Funcionalidades

- 🎨 **Filtros de imagen:** Blur, sharpen, contrast
- 🎯 **Modos de pintado:** Espiral, por líneas, aleatorio
- 📊 **Analytics:** Estadísticas de pintado
- 🔄 **Sync:** Sincronización entre dispositivos
- 🎮 **Templates:** Plantillas predefinidas
- 🌍 **Nuevos idiomas:** Alemán, italiano, portugués, etc.
- 🎛️ **Configuración avanzada i18n:** Formatos de fecha/hora regionales

### Mejoras Técnicas

- ⚡ **Performance:** Optimización de algoritmos
- 🛡️ **Security:** Validación adicional
- 🌐 **I18n avanzado:** Pluralización, contexto, RTL
- 📱 **Mobile:** Mejoras para móviles
- 🧪 **Tests:** Testing automatizado
- 🔧 **i18n tooling:** Scripts de validación de traducciones

### Documentación

- 📖 **Wiki:** Guías avanzadas
- 🎥 **Videos:** Tutoriales multiidioma
- 🌍 **Traducciones:** Más idiomas para README
- 📊 **Examples:** Casos de uso
- 🛠️ **i18n Guide:** Guía detallada de internacionalización

### Contribuciones de Traducción

#### Idiomas Prioritarios
- 🇩🇪 **Alemán** - Gran comunidad europea
- 🇮🇹 **Italiano** - Comunidad activa en pixel art
- 🇵🇹 **Portugués** - Brasil y Portugal
- 🇯🇵 **Japonés** - Cultura tech avanzada
- 🇷🇺 **Ruso** - Gran base de usuarios

#### Proceso de Traducción
1. **Fork del repositorio**
2. **Copiar archivo base:** `cp src/locales/es.js src/locales/XX.js`
3. **Traducir todas las claves** manteniendo la estructura
4. **Registrar en motor i18n**
5. **Crear README-XX.md** traducido
6. **Pull Request** con las traducciones

#### Calidad de Traducciones
- ✅ **Contexto técnico:** Usar terminología correcta
- ✅ **Consistencia:** Mantener términos unificados
- ✅ **Longitud apropiada:** Considerar espacio en UI
- ✅ **Culturalmente apropiado:** Adaptar expresiones locales

## 🆘 Ayuda

### Problemas Comunes

**"Module not found"**
```bash
npm install  # Reinstalar dependencias
```

**"Build failed"**
```bash
npm run lint  # Verificar errores de sintaxis
```

**"Watch no funciona"**
```bash
# Verificar que los archivos están en src/
ls -la src/
```

### Contacto

- 🐛 **Bugs:** [GitHub Issues](https://github.com/Alarisco/WPlace-AutoBOT/issues)
- 💬 **Discusiones:** [GitHub Discussions](https://github.com/Alarisco/WPlace-AutoBOT/discussions)
- 📧 **Email:** A través de GitHub

---

<p align="center">
  <strong>¡Gracias por contribuir a WPlace AutoBOT! 🎨</strong><br>
  <em>Juntos hacemos que la comunidad de WPlace sea más creativa</em>
</p>
