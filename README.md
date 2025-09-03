# WPlace AutoBOT

<!-- Selector de idiomas -->
<p align="center">
  <strong>🌍 Idiomas disponibles / Available Languages / Langues disponibles / Доступные языки:</strong><br>
  <a href="README.md">🇪🇸 Español</a> |
  <a href="docs/README-en.md">🇺🇸 English</a> |
  <a href="docs/README-fr.md">🇫🇷 Français</a> |
  <a href="docs/README-ru.md">🇷🇺 Русский</a>
</p>

<p align="center">
  <a href="https://buymeacoffee.com/alariscoi">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Invítame a un café" height="50"></a>
</p>


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

- [🌍 Soporte Multiidioma](#-soporte-multiidioma)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [🔧 Bots Disponibles](#-bots-disponibles)
- [🛡️ Auto-Guard Bot](#️-auto-guard-bot)
- [🌾 Auto-Farm Bot](#-auto-farm-bot)
- [🎨 Auto-Image Bot](#-auto-image-bot)
- [📖 Guías Detalladas](#-guías-detalladas)
- [⚠️ Importante](#️-importante)
- [🆘 Soporte](#-soporte)

---

## 🚀 Inicio Rápido

### Instalación Universal

> Importante: Si tu marcador dejó de funcionar, debes actualizarlo al nuevo formato que inyecta el script mediante un Blob. Copia el bookmarklet actualizado de abajo para cada bot.

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

### 🚀 ¡NOVEDAD! 🛡️ Auto-Guard Bot
**El nuevo sistema de protección automática para tus obras de arte**

🛡️ **¿Tu pixel art está siendo vandalizado?** ¡Auto-Guard es la solución! 

✨ **Características principales:**
- 🎯 **Protección selectiva:** Define áreas específicas para proteger
- 🔍 **Monitoreo continuo:** Vigila cambios no autorizados 24/7
- ⚡ **Reparación automática:** Restaura píxeles alterados al instante
- 🧠 **Detección inteligente:** Distingue entre actualizaciones legítimas y vandalismo
- 🔋 **Gestión eficiente:** Usa cargas solo cuando es necesario

### 🧭 Launcher (recomendado)
Un único marcador que te deja elegir entre Auto-Farm, Auto-Image o **Auto-Guard** en cada ejecución.

```javascript
javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Launcher] No se pudo cargar/inyectar: "+e.message+"\nPrueba en otra página o usa la Opción C (módulo).");}})();
```

— O usa los bots por separado —

### 🛡️ Auto-Guard Bot
**Protección automática para tus obras de arte**

```javascript
javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Guard.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Guard] No se pudo cargar/inyectar: "+e.message+"\nPrueba en otra página o usa la Opción C (módulo).");}})();
```

**Características:**
- ✅ Protección de áreas específicas
- ✅ Monitoreo continuo 24/7
- ✅ Reparación automática de vandalismos
- ✅ Detección inteligente de cambios
- ✅ Gestión eficiente de cargas
- ✅ Selección visual de áreas

### 🌾 Auto-Farm Bot
**Farmeo automático de experiencia y cargas**

```javascript
javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Farm.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Farm] No se pudo cargar/inyectar: "+e.message+"\nPrueba en otra página o usa la Opción C (módulo).");}})();
```

**Características:**
- ✅ Farmeo automático 24/7
- ✅ Sistema anti-ban integrado
- ✅ Calibración automática
- ✅ Gestión inteligente de cargas
- ✅ Configuración avanzada

### 🎨 Auto-Image Bot
**Creación automática de pixel art desde imágenes**

```javascript
javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Image.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Image] No se pudo cargar/inyectar: "+e.message+"\nPrueba en otra página o usa la Opción C (módulo).");}})();
```

**Características:**
- ✅ Convierte imágenes a pixel art
- ✅ Redimensionado inteligente
- ✅ Selección precisa de posición
- ✅ Pintado por lotes optimizado
- ✅ Sistema de cooldown automático
- ✅ 🛡️ Protección del dibujo entre lotes (repara cambios antes del siguiente lote)
- ✅ 📐 Patrón de pintado: lineal (inicio/fin), aleatorio, centro→afuera, esquinas primero, espiral
- ✅ **💾 Guardar/Cargar progreso**
- ✅ **⏸️ Pausar y reanudar trabajos**
- ✅ Interfaz 100% en español

---

## 📖 Guías Detalladas

## 🛡️ Auto-Guard Bot - Manual Completo

### 🎯 ¿Qué es Auto-Guard?

Auto-Guard es el sistema de protección más avanzado para WPlace que mantiene tu pixel art seguro contra vandalismos. Define áreas específicas que quieres proteger y el bot se encarga del resto.

### ✨ Características Principales

- **🎯 Selección precisa:** Define áreas rectangulares para proteger
- **🔍 Monitoreo inteligente:** Verifica cambios cada 30 segundos
- **⚡ Respuesta inmediata:** Repara vandalismos automáticamente
- **🔋 Eficiencia energética:** Solo usa cargas cuando es necesario
- **📊 Estadísticas en tiempo real:** Píxeles protegidos, cambios detectados, reparaciones
- **🇪🇸 Interfaz en español:** 100% traducido

### 🚀 Uso Paso a Paso

#### 1️⃣ **Inicialización**
```text
1. Ejecuta el bookmarklet Auto-Guard en WPlace
2. Haz clic en "Inicializar Guard-BOT"
3. Espera la verificación de colores disponibles
```

#### 2️⃣ **Seleccionar Área a Proteger**
```text
1. Clic en "Seleccionar Área"
2. Pinta un píxel en la esquina SUPERIOR IZQUIERDA
3. Pinta un píxel en la esquina INFERIOR DERECHA  
4. El sistema calcula automáticamente el área rectangular
5. Confirma las coordenadas mostradas
```

#### 3️⃣ **Capturar Estado Original**
```text
1. Clic en "Capturar Área"
2. El bot toma una "foto" del estado actual
3. Este será el estado de referencia para detectar cambios
4. Verifica el número de píxeles bajo protección
```

#### 4️⃣ **Iniciar Protección**
```text
1. Clic en "Iniciar Protección"
2. El bot comienza el monitoreo continuo
3. Cada 30 segundos verifica cambios en el área
4. Si detecta alteraciones, las repara automáticamente
```

### 🔧 Panel de Control

#### 📊 **Información en Tiempo Real**
- **Píxeles Protegidos:** Total de píxeles bajo vigilancia
- **Cambios Detectados:** Número de alteraciones encontradas
- **Píxeles Reparados:** Cantidad de reparaciones exitosas
- **Cargas:** Cargas disponibles para reparaciones
- **Estado:** Activo, pausado, o en reparación

#### ⚡ **Controles Principales**
- **🛡️ Inicializar:** Prepara el sistema de protección
- **📐 Seleccionar Área:** Define zona a proteger
- **📸 Capturar Área:** Guarda estado de referencia
- **▶️ Iniciar Protección:** Activa monitoreo continuo
- **⏹️ Detener Protección:** Pausa el sistema

### 🎯 Casos de Uso

#### 🖼️ **Protección de Arte**
- **Obras terminadas:** Mantén tu pixel art intacto
- **Trabajos en progreso:** Protege áreas ya completadas
- **Arte colaborativo:** Vigila contribuciones no deseadas

#### 🏰 **Protección de Territorio**
- **Logos de comunidad:** Defiende símbolos grupales
- **Banderas:** Mantén colores nacionales correctos
- **Textos importantes:** Protege mensajes clave

#### 🛡️ **Defensa Preventiva**
- **Zonas conflictivas:** Anticípate a raids
- **Horas inactivas:** Protección mientras duermes
- **Eventos especiales:** Mantén estructuras durante guerras de píxeles

### ⚙️ Configuración Avanzada

#### 🔍 **Límites del Sistema**
- **Área máxima:** 10,000 píxeles por zona
- **Verificación:** Cada 30 segundos
- **Respuesta:** Reparación en <5 segundos
- **Precisión:** 100% de detección de cambios

#### 🔋 **Gestión de Cargas**
- **Uso inteligente:** Solo gasta cargas en reparaciones reales
- **Priorización:** Repara los cambios más críticos primero
- **Optimización:** Agrupa reparaciones para eficiencia
- **Monitoreo:** Verifica cargas antes de cada acción

### 🛠️ Funciones de Consola

```javascript
// Ver estado de protección actual
console.log(guardState)

// Información del área protegida
debugProtectedArea()

// Estadísticas de reparaciones
getRepairStats()

// Forzar verificación manual
checkForChanges()
```

### ⚠️ Consejos y Buenas Prácticas

#### ✅ **Recomendaciones**
- **Áreas pequeñas:** Empieza con zonas de 100-500 píxeles
- **Coordinación:** Informa a tu equipo sobre las áreas protegidas
- **Horarios clave:** Activa durante horas de sueño o trabajo
- **Verificación previa:** Asegúrate que el área esté completa antes de capturar

#### ❌ **Evitar**
- **Áreas muy grandes:** Consume muchas cargas innecesariamente
- **Protección de bordes:** Evita coordenadas cerca de 0 o límites del canvas
- **Múltiples instancias:** Solo ejecuta un Auto-Guard por pestaña
- **Captura incompleta:** No captures áreas que aún estés editando

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

## 🌍 Soporte Multiidioma

**¡WPlace AutoBOT ahora habla tu idioma!** 🗣️

### 🎯 Idiomas Disponibles
- **🇪🇸 Español** - Idioma por defecto
- **🇺🇸 English** - Full English support
- **🇫🇷 Français** - Support complet en français

### ✨ Características del Sistema i18n
- **🔄 Cambio automático**: Detecta tu idioma del navegador
- **🎛️ Selector manual**: Cambia idioma cuando quieras
- **💾 Memoria persistente**: Recuerda tu preferencia
- **🔗 Sincronización**: Todos los bots usan el mismo idioma
- **📱 Interfaz completa**: 100% traducido

### 📖 Documentación por Idioma
- **[🇪🇸 Documentación en Español](README.md)** (este archivo)
- **[�🇸 Documentación en Español (docs)](docs/README-es.md)**
- **[�🇺🇸 English Documentation](docs/README-en.md)**
- **[🇫🇷 Documentation Française](docs/README-fr.md)**

### 🎮 Cómo Cambiar Idioma
1. Ejecuta cualquier bot (Launcher recomendado)
2. Busca el selector de idiomas en la esquina superior izquierda 🌐
3. Haz clic y selecciona tu idioma preferido
4. ¡Toda la interfaz se actualiza automáticamente! ✨

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
| **"Área muy grande"** | Zona de protección excesiva | Reduce tamaño a <10,000 píxeles |
| **"Sin área capturada"** | No se definió zona a proteger | Usa "Seleccionar Área" y "Capturar Área" |
| **Guard no repara** | Sin cargas o error de detección | Verifica cargas y recaptura área |

### 📞 Contacto

- **🐛 Reportar bugs:** Issues en GitHub
- **💡 Sugerencias:** Discussions en GitHub  
- **📖 Documentación:** [GitHub Wiki](https://github.com/Alarisco/WPlace-AutoBOT)

### 🔄 Actualizaciones

Los bots se actualizan automáticamente al ejecutar el bookmarklet. Siempre obtienes la versión más reciente.

---

## 🤝 Contribuir

¿Quieres contribuir al proyecto? ¡Genial! 

👉 **[Consulta la guía completa de contribución](docs/CONTRIBUTING.md)**

Incluye:
- 🏗️ Estructura del proyecto y arquitectura
- 🔧 Scripts de desarrollo y build
- 📝 Estándares de código y commits
- 🚀 Flujo de desarrollo paso a paso

---

<p align="center">
  <strong>🎨 Hecho con ❤️ para la comunidad de WPlace</strong><br>
  <em>Usa responsablemente y disfruta creando arte píxel a píxel</em>
</p>
