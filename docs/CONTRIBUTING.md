# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a WPlace AutoBOT! Esta guía te ayudará a entender cómo funciona el proyecto y cómo puedes colaborar.

## 📋 Reglas Básicas

- ✅ **Conventional Commits:** Usa el formato estándar en tus PRs
- ✅ **Issues primero:** Para cambios grandes, abre un Issue antes del PR
- ✅ **CI/CD:** El sistema valida automáticamente JS, Markdown y YAML
-### Ideas para Contribuir

#### 🔥 PRIORIDAD ALTA: Completar Migración Modular

El proyecto necesita completar la migración del código monolítico a la arquitectura modular:

**Farm Module (`src/farm/`):**
- [ ] Migrar configuración y estado desde `Auto-Farm.original.js`
- [ ] Extraer UI compleja (paneles, controles, configuración)
- [ ] Separar lógica de pintado y cooldowns
- [ ] Implementar calibración automática
- [ ] Sistema de retry y manejo de errores

**Image Module (`src/image/`):**
- [ ] Migrar procesamiento de imágenes desde `Auto-Image.original.js`
- [ ] Sistema de progreso y guardado/carga
- [ ] UI de configuración (redimensionado, paleta, posición)
- [ ] Optimización de batches por tiles
- [ ] Validación de colores

**Core Modules (`src/core/`):**
- [ ] Expandir `wplace-api.js` con todas las llamadas API
- [ ] Mejorar `turnstile.js` con gestión completa
- [ ] Sistema robusto de configuración en `storage.js`
- [ ] Logging completo en `logger.js`

**Cómo Contribuir a la Migración:**

1. **Elige un módulo específico** (ej: `src/farm/coords.js`)
2. **Estudia el código original** en `Auto-Farm.original.js`
3. **Extrae la funcionalidad** relacionada
4. **Mantén la API compatible** 
5. **Añade tests si es posible**
6. **Documenta los cambios**

**Cuando la migración esté completa:**
- Cambiar `useOriginals = false` en `build.mjs`
- Los archivos se generarán desde `src/`
- Eliminar archivos `.original.js`

#### Nuevas Funcionalidades**Bookmarklets:** Deben apuntar a `raw.githubusercontent.com/.../main/Auto-*.js`

---

## 🏗️ Estructura del Proyecto

El proyecto está modularizado para facilitar el mantenimiento y desarrollo:

```
WPlace-AutoBOT/
├── src/                    # Código fuente modular
│   ├── core/              # Módulos base reutilizables
│   │   ├── dom.js         # Utilidades DOM y Shadow DOM
│   │   ├── http.js        # fetchWithTimeout y utilidades HTTP
│   │   ├── loader.js      # loadAndEvalUrlWithFallback
│   │   ├── logger.js      # Sistema de logging
│   │   ├── storage.js     # LocalStorage wrapper
│   │   ├── timing.js      # sleep() y retry()
│   │   ├── turnstile.js   # Carga y ejecución de Turnstile
│   │   └── wplace-api.js  # API unificada de WPlace
│   ├── ui/                # Componentes de interfaz
│   │   ├── drag.js        # makeDraggable
│   │   └── overlay.js     # createOverlay con Shadow DOM
│   ├── farm/              # Lógica del Auto-Farm
│   │   ├── calibrate.js   # Calibración por fetch sniffing
│   │   ├── coords.js      # Coordenadas aleatorias y colores
│   │   ├── index.js       # runFarm principal
│   │   ├── loop.js        # Loop de pintado y retry
│   │   └── ui.js          # UI específica del farm
│   ├── image/             # Lógica del Auto-Image
│   │   ├── batcher.js     # Agrupación por tiles
│   │   ├── image-processor.js # Procesamiento de imágenes
│   │   ├── index.js       # runImage principal
│   │   ├── loop.js        # Loop de pintado por lotes
│   │   ├── palette.js     # Coincidencia de colores
│   │   ├── progress.js    # Persistencia de progreso
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
└── docs/
    ├── CONTRIBUTING.md    # Esta guía
    ├── SECURITY.md        # Política de seguridad
    └── SUPPORT.md         # Guía de soporte
```

## 🔧 Scripts Disponibles

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
chore(build): actualizar esbuild a v0.21.5
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

#### `src/core/turnstile.js`
Gestión de Cloudflare Turnstile:
- `loadTurnstile()` - Carga el script
- `executeTurnstile()` - Obtiene tokens

#### `src/core/http.js`
Utilidades HTTP:
- `fetchWithTimeout()` - Fetch con timeout

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

### Mejoras Técnicas

- ⚡ **Performance:** Optimización de algoritmos
- 🛡️ **Security:** Validación adicional
- 🌐 **I18n:** Internacionalización
- 📱 **Mobile:** Mejoras para móviles
- 🧪 **Tests:** Testing automatizado

### Documentación

- 📖 **Wiki:** Guías avanzadas
- 🎥 **Videos:** Tutoriales
- 🌍 **Traducciones:** Otros idiomas
- 📊 **Examples:** Casos de uso

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
