# WPlace AutoBOT

<!-- Badges centrados -->
<p align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=Alarisco.WPlace-AutoBOTV2&left_color=black&right_color=blue&style=for-the-badge" alt="Visitas" />
  
  <img src="https://img.shields.io/github/stars/Alarisco/WPlace-AutoBOTV2?style=for-the-badge&logo=github"
       alt="GitHub Stars" />
  <img src="https://img.shields.io/github/forks/Alarisco/WPlace-AutoBOTV2?style=for-the-badge&logo=github"
       alt="GitHub Forks" />
  <img src="https://img.shields.io/github/issues/Alarisco/WPlace-AutoBOTV2?style=for-the-badge"
       alt="GitHub Issues" />
  <img src="https://img.shields.io/github/last-commit/Alarisco/WPlace-AutoBOTV2?style=for-the-badge"
       alt="Último commit" />
  <img src="https://img.shields.io/badge/Licence-MIT-green?style=for-the-badge"
       alt="Licence" />
</p>

## 🤖 WPlace AutoBOT

<p align="center">
  <img src="https://img.shields.io/badge/WPlace-AutoBOT-blue?style=for-the-badge" alt="WPlace AutoBOT">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge" alt="JavaScript">
</p>

<p align="center">
  <strong>Scripts automatizados para <a href="https://wplace.live" target="_blank">WPlace</a></strong><br>
  Farmeo automático de experiencia y creación de pixel art avanzada
</p>

---

## 📋 Tabla de Contenidos

- [🚀 Inicio Rápido](#-inicio-rápido)
- [🔧 Bots Disponibles](#-bots-disponibles)
- [🌾 Auto-Farm Bot](#-auto-farm-bot)
- [🎨 Auto-Image Bot](#-auto-image-bot)
- [📖 Guías Detalladas](#-guías-detalladas)
- [⚠️ Importante](#️-importante)
- [🆘 Soporte](#-soporte)

---

## 🚀 Inicio Rápido

### Instalación Universal

1. **Copia el código del bot deseado**
2. **Crea un marcador en tu navegador:**
   - Botón derecho en la barra de marcadores → "Agregar página"
   - Nombre: `WPlace Bot`
  - URL: Pega el código JavaScript
3. **Úsalo en WPlace:**
   - Ve a [wplace.live](https://wplace.live)
   - Inicia sesión
   - Haz clic en tu marcador

---

## 🔧 Bots Disponibles

### 🧭 Launcher (recomendado)
Un único marcador que te deja elegir entre Auto-Farm o Auto-Image en cada ejecución.

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js").then(r=>r.text()).then(eval)
```

— O usa los bots por separado —

### 🌾 Auto-Farm Bot
**Farmeo automático de experiencia y cargas**

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOTV2/refs/heads/main/Auto-Farm.js").then(t=>t.text()).then(eval);
```

**Características:**
- ✅ Farmeo automático 24/7
- ✅ Sistema anti-ban integrado
- ✅ Calibración automática
- ✅ Gestión inteligente de cargas
- ✅ Configuración avanzada

### 🎨 Auto-Image Bot
**Creación automática de pixel art desde imágenes**

### 🎨 Auto-Image Bot
**Creación automática de pixel art desde imágenes**

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOTV2/refs/heads/main/Auto-Image.js").then(t=>t.text()).then(eval);
```

**Características:**
- ✅ Convierte imágenes a pixel art
- ✅ Redimensionado inteligente
- ✅ Selección precisa de posición
- ✅ Pintado por lotes optimizado
- ✅ Sistema de cooldown automático
- ✅ **💾 Guardar/Cargar progreso**
- ✅ **⏸️ Pausar y reanudar trabajos**
- ✅ Interfaz 100% en español

---

## 📖 Guías Detalladas

## 🌾 Auto-Farm Bot - Manual Completo

### � Configuración

| Parámetro | Rango | Recomendado | Descripción |
|-----------|-------|-------------|-------------|
| **Delay (seg)** | 5-300 | 15-30 | Tiempo entre lotes de píxeles |
| **Min. Cargas** | 1-50 | 10-20 | Cargas mínimas antes de pintar |
| **Píxeles/Lote** | 1-50 | 10-30 | Píxeles simultáneos por lote |
| **Modo Color** | Random/Fijo | Random | Selección de colores |

### 🎮 Controles

- **🟢 Start:** Inicia el farmeo automático continuo
- **🔵 Once:** Pinta un solo lote (útil para pruebas)
- **🔴 Stop:** Detiene completamente el bot

### 📊 Panel de Estado

**Información del Usuario:**
- User, Charges, Painted, Último intento, Estado actual

**Estado del Servidor:**
- Backend, Database, Uptime

---

## 🎨 Auto-Image Bot - Manual Completo

### ✨ Características Principales

- **🖼️ Carga de imágenes:** PNG, JPEG compatible
- **📏 Redimensionado inteligente:** Ajuste automático con vista previa
- **🎯 Posición precisa:** Selección exacta del punto de inicio  
- **⚡ Pintado optimizado:** Lotes de 20 píxeles (configurable 1-50)
- **🔋 Gestión de cargas:** Sistema inteligente de cooldown
- **� Guardar/Cargar progreso:** Pausa y reanuda proyectos
- **📁 Archivos JSON:** Formato estándar para compatibilidad
- **�🚫 Anti-ban:** Mínimas consultas API, comportamiento humano
- **🇪🇸 Interfaz española:** 100% traducido

### 🚀 Uso Paso a Paso

#### 1️⃣ **Inicialización**
```text
1. Ejecuta el bookmarklet en WPlace
2. Haz clic en "Iniciar Auto-BOT"
3. Espera la verificación de colores disponibles
```

#### 2️⃣ **Cargar Imagen**
```text
1. Clic en "Subir Imagen"
2. Selecciona tu archivo (PNG/JPEG)
3. Espera a que se procese y analice
```

#### 3️⃣ **Redimensionar (Opcional)**
```text
1. Clic en "Redimensionar Imagen"
2. Ajusta ancho/alto con los sliders
3. Marca "Mantener proporción" si deseas
4. Previsualiza el resultado
5. Confirma los cambios
```

#### 4️⃣ **Seleccionar Posición**
```text
1. Clic en "Seleccionar Posición"
2. Haz clic en el canvas donde quieres que inicie
3. El punto seleccionado será la esquina superior izquierda
4. Confirma la posición mostrada
```

#### 5️⃣ **Iniciar Pintado**
```text
1. Clic en "Iniciar Pintura"
2. El bot pintará automáticamente por lotes
3. Observa el progreso en tiempo real
4. El bot esperará cooldowns automáticamente
```

### 💾 Sistema de Guardar/Cargar Progreso

#### 📁 **Guardar Progreso**
```text
Opción 1: Al detener manualmente
1. Clic en "Detener Pintura" 
2. Aparece modal personalizado
3. Selecciona "💾 Guardar Progreso"
4. Se descarga archivo JSON automáticamente

Opción 2: Nombre automático
- Formato: "imagen_X_Y_progreso.json"
- Incluye nombre original y coordenadas
- Compatible con todos los navegadores
```

#### 📂 **Cargar Progreso**
```text
1. Clic en "Cargar Progreso"
2. Selecciona archivo JSON guardado
3. Validación automática de datos
4. Restauración completa del estado:
   ✅ Imagen original
   ✅ Posición de inicio  
   ✅ Píxeles ya pintados
   ✅ Píxeles restantes
   ✅ Configuración de lotes
5. Continúa desde donde lo dejaste
```

#### 🔄 **Características del Sistema**
- **🛡️ Validación robusta:** Verifica integridad de archivos
- **🎨 Compatibilidad de colores:** Verifica paleta actual vs guardada
- **📊 Información completa:** Progreso, posición, metadata
- **⚡ Carga instantánea:** Restaura estado en segundos
- **🔒 Formato seguro:** JSON estándar, sin ejecutables

### ⚙️ Configuración Avanzada

#### 🎨 **Píxeles por Lote**
- **Rango:** 1-50 píxeles
- **Por defecto:** 20 píxeles
- **Recomendado:** 15-25 para mejor rendimiento
- **Modificar:** Panel de configuración o `setPixelsPerBatch(20)`

#### ⏱️ **Sistema de Cooldown**
- **Regeneración:** 1 carga cada 30 segundos
- **Automático:** El bot espera automáticamente
- **Inteligente:** Calcula tiempo restante sin consultas excesivas
- **Optimizado:** Mínimas llamadas a `/me` para evitar baneos

#### 📊 **Información en Tiempo Real**
- **Progreso:** Píxeles pintados vs total
- **Cargas:** Disponibles (número entero)
- **Tiempo estimado:** Duración restante aproximada
- **Estado:** Pintando, esperando cooldown, pausado

### 🔧 Funciones de Consola

```javascript
// Debug de coordenadas
debugCoords()

// Debug de cargas
debugCharges()

// Configurar píxeles por lote
setPixelsPerBatch(25)

// Ver estado actual
console.log(state)

// Debug del sistema de progreso
console.log('Progreso:', state.paintedPixels, '/', state.totalPixels)
```

### 🎯 Casos de Uso del Sistema de Progreso

#### 📋 **Proyectos Grandes**
- **Arte complejo:** Divide trabajos de varios días
- **Sesiones largas:** Pausa cuando necesites el ordenador
- **Gestión de tiempo:** Programa pintado en horarios específicos

#### 🔄 **Flexibilidad Total**
- **Cambio de dispositivo:** Continúa en otro ordenador
- **Interrupciones:** Pausas imprevistas sin pérdida
- **Experimentación:** Prueba diferentes configuraciones

#### 📁 **Organización**
- **Múltiples proyectos:** Gestiona varios trabajos simultáneamente
- **Respaldos:** Copia de seguridad de tu progreso
- **Compartir:** Envía tu progreso a otros usuarios

### ⚠️ Consejos y Buenas Prácticas

#### ✅ **Recomendaciones**
- **Imágenes pequeñas:** Empieza con 50x50px para aprender
- **Posición central:** Evita los bordes del canvas
- **Lotes moderados:** 15-25 píxeles por lote funciona mejor
- **Supervisa el proceso:** Revisa el progreso ocasionalmente
- **💾 Guarda frecuentemente:** Especialmente en proyectos grandes
- **📁 Organiza archivos:** Nombra tus proyectos descriptivamente
- **🔄 Verifica compatibilidad:** Antes de cargar progreso viejo

#### ❌ **Evitar**
- **Imágenes muy grandes:** Consumirá muchas cargas
- **Lotes muy grandes:** Puede causar errores de API
- **Posiciones en bordes:** Coordenadas cerca de 0 o 3000
- **Múltiples instancias:** Solo ejecuta un bot por pestaña
- **❌ Archivos corruptos:** No modifiques JSONs manualmente
- **⚠️ Progreso antiguo:** Verifica compatibilidad de colores

---

## ⚠️ Importante

### 🛡️ Sistema Anti-Ban

Ambos bots incluyen protecciones avanzadas:

- **⏱️ Delays inteligentes:** Tiempo realista entre acciones
- **📡 API optimizada:** Mínimas consultas al servidor
- **🔄 Reintentos limitados:** Máximo 3 intentos por operación
- **🕐 Cooldowns automáticos:** Respeta límites del servidor
- **🤖 Comportamiento humano:** Patrones naturales de uso

### 📜 Términos de Uso

- ✅ **Uso personal:** Permitido para cuentas propias
- ✅ **Modificación:** Puedes adaptar el código
- ❌ **Comercial:** No vendas ni redistribuyas
- ❌ **Abuso:** No hagas spam ni ataques
- ⚖️ **Responsabilidad:** Uso bajo tu propio riesgo

---

## 🆘 Soporte

### 🔍 Solución de Problemas Comunes

| Problema | Causa | Solución |
|----------|-------|----------|
| **"Calibración requerida"** | Sin coordenadas válidas | Pinta un píxel manualmente |
| **"Sin cargas disponibles"** | Cargas insuficientes | Espera regeneración (30s/carga) |
| **Error 403/429** | Límites de API | Aumenta delays |
| **"Coordenadas peligrosas"** | Muy cerca del borde | Recalibra en zona central |
| **Bot no responde** | Error de JavaScript | Recarga página y reintenta |
| **"Error al cargar progreso"** | Archivo JSON inválido | Verifica integridad del archivo |
| **"Incompatibilidad de colores"** | Paleta diferente | Reinicia bot y verifica colores |
| **Progreso no se guarda** | Permisos de descarga | Permite descargas en el navegador |

### 📞 Contacto

- **🐛 Reportar bugs:** Issues en GitHub
- **💡 Sugerencias:** Discussions en GitHub  
- **📖 Documentación:** [GitHub Wiki](https://github.com/Alarisco/WPlace-AutoBOT)

### 🔄 Actualizaciones

Los bots se actualizan automáticamente al ejecutar el bookmarklet. Siempre obtienes la versión más reciente.

---

## 🔧 Desarrollo

### Estructura del Proyecto

El proyecto está modularizado para facilitar el mantenimiento:

```
src/
├── core/          # Módulos base reutilizables
│   ├── api.js     # API de WPlace
│   ├── http.js    # Utilidades HTTP
│   ├── storage.js # Almacenamiento local
│   └── ...
├── ui/            # Componentes de interfaz
├── farm/          # Lógica del Auto-Farm
├── image/         # Lógica del Auto-Image
└── entries/       # Puntos de entrada (farm.js, image.js, launcher.js)
```

### Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Build de producción (minificado)
npm run build

# Build de desarrollo (con sourcemaps)
npm run build:dev

# Modo watch (reconstruye automáticamente)
npm run watch

# Linter
npm run lint
```

### Proceso de Build

El sistema usa **esbuild** para generar los 3 archivos finales en la raíz:
- `Auto-Farm.js`
- `Auto-Image.js` 
- `Auto-Launcher.js`

Estos archivos mantienen la compatibilidad con los bookmarklets existentes.

### Contribuir

1. Fork del repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Desarrolla en `src/`
4. Ejecuta `npm run build` para generar los archivos
5. Asegúrate de que `npm run lint` pase sin errores
6. Commit y push
7. Abre un Pull Request

---

<p align="center">
  <strong>🎨 Hecho con ❤️ para la comunidad de WPlace</strong><br>
  <em>Usa responsablemente y disfruta creando arte píxel a píxel</em>
</p>
