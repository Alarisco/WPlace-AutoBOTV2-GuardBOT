# 🎯 Patrones Humanos para Auto-Guard

Este documento describe los 10 nuevos patrones implementados en el sistema de protección Auto-Guard. Cada patrón simula comportamientos humanos naturales para hacer la protección más efectiva y menos detectable.

## 📝 1. Zigzag (Escritura)

**Icono:** 📝  
**Valor:** `zigzag`

### Descripción
Simula el patrón de escritura humana, procesando píxeles línea por línea y alternando la dirección (izquierda a derecha, luego derecha a izquierda).

### Funcionamiento
- Agrupa píxeles por filas (coordenada Y)
- Procesa cada fila de forma secuencial
- Alterna la dirección de lectura en cada fila
- Primera fila: izquierda → derecha
- Segunda fila: derecha → izquierda
- Y así sucesivamente...

### Casos de Uso
- Ideal para áreas rectangulares o texto
- Protección sistemática y predecible
- Simula lectura/escritura natural

---

## 📐 2. Diagonal (Lectura)

**Icono:** 📐  
**Valor:** `diagonal`

### Descripción
Recorre los píxeles siguiendo líneas diagonales, similar a como una persona leería un texto inclinado o seguiría una diagonal visual.

### Funcionamiento
- Calcula la suma de coordenadas (x + y) para cada píxel
- Ordena por esta suma diagonal
- Procesa píxeles que están en la misma línea diagonal
- Desempata por coordenada X

### Casos de Uso
- Efectivo para formas geométricas
- Protección de esquinas hacia el centro
- Patrones arquitectónicos o diseños angulares

---

## 🔗 3. Clusters (Agrupado)

**Icono:** 🔗  
**Valor:** `cluster`

### Descripción
Agrupa píxeles cercanos como haría un humano naturalmente, trabajando en "manchas" o áreas localizadas antes de moverse a otra zona.

### Funcionamiento
- Selecciona un punto aleatorio como centro de cluster
- Define un radio aleatorio (3-5 píxeles)
- Encuentra todos los píxeles dentro de ese radio
- Procesa algunos píxeles del cluster (máximo 5)
- Repite con un nuevo centro hasta completar

### Casos de Uso
- Ideal para imágenes con áreas de color sólido
- Protección eficiente de zonas compactas
- Simula trabajo humano por secciones

---

## 🌊 4. Ondas (Natural)

**Icono:** 🌊  
**Valor:** `wave`

### Descripción
Simula un movimiento ondulatorio natural, siguiendo una función sinusoidal que crea un patrón fluido y orgánico.

### Funcionamiento
- Calcula el rango horizontal del área
- Normaliza las coordenadas X
- Aplica función seno para crear una onda
- Ordena píxeles por proximidad a la curva de onda
- Desempata por posición horizontal

### Casos de Uso
- Perfecto para formas orgánicas o curvas
- Protección de paisajes o elementos naturales
- Patrones que requieren fluidez visual

---

## 📍 5. Esquinas (Referencia)

**Icono:** 📍  
**Valor:** `corners`

### Descripción
Prioriza esquinas y bordes como puntos de referencia, similar a como los humanos usan landmarks visuales para orientarse.

### Funcionamiento
- Calcula el bounding box del área
- Define las 4 esquinas principales
- Calcula distancia de cada píxel a la esquina más cercana
- Ordena por proximidad a esquinas
- Procesa desde las esquinas hacia el interior

### Casos de Uso
- Excelente para formas rectangulares
- Protección de marcos o bordes
- Establece puntos de referencia claros

---

## 🧹 6. Barrido (Sistemático)

**Icono:** 🧹  
**Valor:** `sweep`

### Descripción
Simula una limpieza sistemática dividiendo el área en secciones de 8x8 píxeles y procesándolas ordenadamente.

### Funcionamiento
- Divide el área en cuadrículas de 8x8 píxeles
- Asigna cada píxel a su sección correspondiente
- Procesa secciones en orden secuencial
- Toma algunos píxeles de cada sección antes de continuar

### Casos de Uso
- Ideal para áreas grandes y complejas
- Protección uniforme y sistemática
- Simula trabajo metódico y organizado

---

## ⭐ 7. Prioridad (Inteligente)

**Icono:** ⭐  
**Valor:** `priority`

### Descripción
Simula decisiones humanas inteligentes basadas en múltiples factores: importancia central, proximidad a bordes y elementos aleatorios.

### Funcionamiento
- Calcula el centro del área
- Factor 1: Distancia al centro (menor = mejor)
- Factor 2: Distancia a bordes (mayor = mejor para bordes)
- Factor 3: Componente aleatorio (simula decisiones humanas)
- Combina factores con pesos específicos

### Casos de Uso
- Perfecto para protección inteligente
- Balancea centro y bordes
- Añade impredecibilidad natural

---

## 🤝 8. Proximidad (Cercano)

**Icono:** 🤝  
**Valor:** `proximity`

### Descripción
Agrupa píxeles por cercanía, como haría un humano al trabajar de forma eficiente, minimizando movimientos.

### Funcionamiento
- Comienza con un píxel aleatorio
- Encuentra el píxel más cercano al actual
- Se mueve a ese píxel y repite el proceso
- Crea una cadena de píxeles conectados por proximidad

### Casos de Uso
- Eficiente para formas conectadas
- Minimiza "saltos" entre píxeles
- Simula trabajo humano eficiente

---

## 🔲 9. Cuadrantes (Rotativo)

**Icono:** 🔲  
**Valor:** `quadrant`

### Descripción
Divide el área en 4 cuadrantes y los procesa rotativamente, distribuyendo el trabajo de forma equilibrada.

### Funcionamiento
- Calcula el centro del área
- Divide en 4 cuadrantes: TL, TR, BL, BR
- Asigna cada píxel a su cuadrante correspondiente
- Procesa rotativamente: un píxel de cada cuadrante
- Continúa hasta agotar todos los cuadrantes

### Casos de Uso
- Excelente para protección equilibrada
- Evita concentración en una sola área
- Distribución uniforme del trabajo

---

## 💫 10. Disperso (Espaciado)

**Icono:** 💫  
**Valor:** `scattered`

### Descripción
Patrón aleatorio inteligente que evita agrupaciones, manteniendo distancia entre píxeles seleccionados para máxima cobertura.

### Funcionamiento
- Evalúa cada píxel disponible
- Calcula distancia mínima a píxeles ya seleccionados
- Añade factor aleatorio para naturalidad
- Selecciona píxeles que maximizan la dispersión
- Evita crear clusters no deseados

### Casos de Uso
- Ideal para máxima cobertura visual
- Protección distribuida uniformemente
- Evita patrones predecibles

---

## 🎮 Cómo Usar los Patrones

### En la Interfaz
1. Abre la configuración del Guard (⚙️)
2. Ve a la sección "🛡️ Patrones de Protección"
3. Selecciona el patrón deseado del menú desplegable
4. El patrón se aplicará automáticamente en la próxima protección

### Recomendaciones de Uso

| Tipo de Imagen | Patrones Recomendados |
|---|---|
| **Texto/Escritura** | 📝 Zigzag, 📐 Diagonal |
| **Formas Geométricas** | 📍 Esquinas, 🔲 Cuadrantes |
| **Imágenes Naturales** | 🌊 Ondas, 🔗 Clusters |
| **Áreas Grandes** | 🧹 Barrido, 💫 Disperso |
| **Protección Inteligente** | ⭐ Prioridad, 🤝 Proximidad |

---

## 🔧 Implementación Técnica

Todos los patrones están implementados en `src/guard/patterns.js` y siguen la misma interfaz:

```javascript
export function getNombrePattern(changes, count) {
  // changes: Set de coordenadas "x,y"
  // count: número máximo de píxeles a seleccionar
  // return: array de coordenadas seleccionadas
}
```

### Características Comunes
- ✅ Manejo seguro de arrays vacíos
- ✅ Respeto del límite de píxeles (`count`)
- ✅ Optimización de rendimiento
- ✅ Comportamiento predecible
- ✅ Elementos aleatorios controlados

---

## 📊 Comparación de Patrones

| Patrón | Predictibilidad | Eficiencia | Naturalidad | Cobertura |
|---|---|---|---|---|
| 📝 Zigzag | Alta | Alta | Media | Buena |
| 📐 Diagonal | Alta | Media | Media | Buena |
| 🔗 Clusters | Baja | Alta | Alta | Media |
| 🌊 Ondas | Media | Media | Alta | Buena |
| 📍 Esquinas | Alta | Media | Media | Excelente |
| 🧹 Barrido | Alta | Alta | Media | Excelente |
| ⭐ Prioridad | Media | Alta | Alta | Excelente |
| 🤝 Proximidad | Media | Alta | Alta | Media |
| 🔲 Cuadrantes | Media | Alta | Media | Excelente |
| 💫 Disperso | Baja | Media | Alta | Excelente |
| 🐍 Serpiente | Alta | Alta | Alta | Excelente |
| ↗️ Barrido Diagonal | Alta | Alta | Media | Excelente |
| 🔄 Espiral Horaria | Media | Media | Alta | Buena |
| 🔃 Espiral Antihoraria | Media | Media | Alta | Buena |
| 🎲 Aleatorio Sesgado | Baja | Alta | Alta | Excelente |

---

## 🆕 Nuevos Patrones Avanzados

### 11. 🐍 Serpiente (Snake Pattern)

**Propósito**: Simula el movimiento de escritura natural por filas, alternando la dirección en cada línea como una serpiente.

**Funcionamiento**: 
- Agrupa píxeles por filas (coordenada Y)
- Alterna dirección: filas pares de izquierda a derecha, filas impares de derecha a izquierda
- Simula el patrón natural de escritura o lectura línea por línea

**Casos de uso**:
- ✅ Protección de texto y contenido escrito
- ✅ Reparación de imágenes con estructura horizontal
- ✅ Simulación de comportamiento humano de lectura

**Implementación técnica**:
```javascript
// Agrupa por filas y alterna dirección
for (let i = 0; i < sortedRows.length; i++) {
  if (i % 2 === 0) {
    pixels.sort((a, b) => a.x - b.x); // Izq->Der
  } else {
    pixels.sort((a, b) => b.x - a.x); // Der->Izq
  }
}
```

### 12. ↗️ Barrido Diagonal (Diagonal Sweep)

**Propósito**: Recorre la imagen siguiendo líneas diagonales, útil para patrones geométricos diagonales.

**Funcionamiento**:
- Agrupa píxeles por diagonales (suma de coordenadas x+y)
- Procesa cada diagonal de forma secuencial
- Mantiene orden dentro de cada diagonal

**Casos de uso**:
- ✅ Reparación de patrones diagonales
- ✅ Protección de elementos geométricos inclinados
- ✅ Optimización para contenido con estructura diagonal

**Implementación técnica**:
```javascript
// Agrupa por diagonales usando x+y
const diagonal = x + y;
if (!diagonalGroups[diagonal]) diagonalGroups[diagonal] = [];
diagonalGroups[diagonal].push({ coord, x, y });
```

### 13. 🔄 Espiral Horaria (Clockwise Spiral)

**Propósito**: Versión mejorada del patrón espiral con control de dirección horaria.

**Funcionamiento**:
- Calcula el centro del área de cambios
- Ordena píxeles por distancia al centro y ángulo
- Procesa en movimiento espiral desde el centro hacia afuera

**Casos de uso**:
- ✅ Protección de elementos circulares o radiales
- ✅ Reparación desde puntos centrales
- ✅ Simulación de movimiento natural circular

### 14. 🔃 Espiral Antihoraria (Counter-Clockwise Spiral)

**Propósito**: Variante del espiral horario con dirección inversa para mayor variabilidad.

**Funcionamiento**:
- Mismo algoritmo que el espiral horario
- Invierte el ángulo para cambiar la dirección
- Proporciona movimiento antihorario natural

**Casos de uso**:
- ✅ Alternativa al espiral horario
- ✅ Mayor variabilidad en patrones de protección
- ✅ Simulación de diferentes preferencias humanas

### 15. 🎲 Aleatorio Sesgado (Biased Random)

**Propósito**: Selección aleatoria inteligente que prioriza píxeles cerca de los bordes.

**Funcionamiento**:
- Calcula la distancia de cada píxel a los bordes del área
- Asigna mayor peso a píxeles cerca de bordes
- Selección probabilística basada en pesos

**Casos de uso**:
- ✅ Protección prioritaria de contornos
- ✅ Reparación de bordes y límites
- ✅ Comportamiento humano natural (atención a bordes)

**Implementación técnica**:
 ```javascript
 // Calcula peso basado en proximidad a bordes
 const minDistToBorder = Math.min(distToLeft, distToRight, distToTop, distToBottom);
 const weight = 1 / (minDistToBorder + 1) + Math.random() * 0.5;
 ```
 
 ### 16. ⚓ Puntos de Anclaje (Anchor Points)
 
 **Propósito**: Prioriza puntos estratégicos (esquinas, centro, bordes) antes de procesar el resto.
 
 **Funcionamiento**:
 - Define puntos de anclaje: 4 esquinas, centro, y puntos medios
 - Asigna prioridades: esquinas (1), centro (2), puntos medios (3)
 - Procesa píxeles según proximidad a puntos de anclaje
 
 **Casos de uso**:
 - ✅ Establecimiento de estructura base
 - ✅ Protección de puntos de referencia visual
 - ✅ Reparación sistemática desde puntos clave
 
 **Implementación técnica**:
 ```javascript
 // Define puntos de anclaje con prioridades
 const anchorPoints = [
   { x: minX, y: minY, priority: 1 }, // Esquinas
   { x: centerX, y: centerY, priority: 2 }, // Centro
   { x: centerX, y: minY, priority: 3 } // Puntos medios
 ];
 ```
 
 ---

*Documento generado automáticamente para Auto-Guard v2024*
*Última actualización: Diciembre 2024*
*Total de patrones disponibles: 24 (18 originales + 6 nuevos)*