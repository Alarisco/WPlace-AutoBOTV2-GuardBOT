# Fix de Headers para WPlace AutoBOT

## Problema Identificado

Los bots estaban recibiendo errores HTTP 400 (Bad Request) debido a que las peticiones HTTP no incluían todos los headers que el navegador normalmente envía automáticamente. Los headers hardcodeados eran insuficientes para que el servidor reconociera las peticiones como legítimas.

### Errores observados:
```
POST https://backend.wplace.live/s0/pixel/992/749 400 (Bad Request)
[WPA-UI] Reintento 1/5 después de 3s. Error: HTTP 400
```

## Solución Implementada

### 1. Sistema de Captura de Headers Originales

Se implementó un sistema en `src/core/wplace-api.js` que:

- **Intercepta peticiones del usuario**: Captura los headers de peticiones reales que hace el usuario al backend
- **Construye headers completos**: Incluye todos los headers necesarios como:
  - `User-Agent`: Identifica el navegador del usuario
  - `Accept-Language`: Idioma preferido del usuario
  - `Origin` y `Referer`: Información de la página actual
  - `Accept-Encoding`: Codificaciones soportadas
  - `Sec-Fetch-*`: Headers de seguridad del navegador

### 2. Funciones Principales Añadidas

#### `captureUserHeaders()`
- Intercepta temporalmente `window.fetch`
- Captura headers de peticiones reales al backend WPlace
- Restaura automáticamente el fetch original después de capturar

#### `getEnhancedHeaders(contentType)`
- Combina headers capturados con headers específicos por tipo de petición
- Fallback a headers básicos mejorados si no se capturaron headers
- Respeta el Content-Type específico de cada tipo de petición

#### `ensureHeadersCaptured()`
- Fuerza la captura de headers antes de operaciones críticas
- Timeout de fallback a headers básicos si la captura falla

### 3. Integración en los Bots

Se integró la captura de headers en:

- **Auto-Launcher** (`src/entries/launcher.js`)
- **Auto-Farm** (`src/entries/farm.js`)
- **Auto-Image** (`src/entries/image.js`)
- **Auto-Guard** (`src/entries/guard.js`)

### 4. Mejoras en Funciones de API

Todas las funciones de pintado fueron actualizadas:

- `postPixel()` - Para Auto-Farm
- `postPixelBatchImage()` - Para Auto-Image
- `postPixelBatch()` - Para lotes genéricos
- `postPixelBatchSafe()` - Versión segura con manejo de errores

## Beneficios

1. **Compatibilidad mejorada**: Los bots envían peticiones que parecen más "humanas"
2. **Reducción de errores 400**: El servidor acepta las peticiones con headers completos
3. **Mantenimiento automático**: El sistema se adapta automáticamente a diferentes navegadores y configuraciones
4. **Fallback robusto**: Si falla la captura, usa headers básicos mejorados

## Uso

El sistema funciona automáticamente. Cuando se inicia cualquier bot:

1. Se intenta capturar headers del usuario
2. Los headers se usan en todas las peticiones HTTP
3. Si no se pueden capturar, se usan headers básicos mejorados

## Logs de Depuración

El sistema genera logs informativos:
```
[WPA-Headers] Headers capturados del usuario: {...}
[WPA-Farm] 📡 Sistema de captura de headers iniciado
[WPA-Headers] Forzando captura de headers...
```

Esto permite monitorear el funcionamiento del sistema en la consola del navegador.
