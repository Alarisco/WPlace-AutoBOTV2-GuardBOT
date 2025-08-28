import { log } from "../core/logger.js";

/**
 * Algoritmos de patrones de protección para reparar píxeles
 */

/**
 * Patrón aleatorio - selecciona píxeles al azar
 */
export function getRandomPattern(changes, count) {
  const changesArray = Array.from(changes);
  const selected = [];
  
  // Crear una copia para no modificar el original
  const available = [...changesArray];
  
  for (let i = 0; i < Math.min(count, available.length); i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available.splice(randomIndex, 1)[0]);
  }
  
  return selected;
}

/**
 * Patrón lineal hacia arriba - recorre de arriba hacia abajo por filas
 */
export function getLineUpPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Agrupar por filas y ordenar de arriba hacia abajo
  const byRow = new Map();
  changesArray.forEach(coord => {
    const [_x, y] = coord.split(',').map(Number);
    if (!byRow.has(y)) byRow.set(y, []);
    byRow.get(y).push(coord);
  });
  
  const selected = [];
  const sortedRows = Array.from(byRow.keys()).sort((a, b) => a - b); // Arriba hacia abajo
  
  for (const row of sortedRows) {
    if (selected.length >= count) break;
    const rowPixels = byRow.get(row).sort((a, b) => {
      const [x1] = a.split(',').map(Number);
      const [x2] = b.split(',').map(Number);
      return x1 - x2; // Izquierda a derecha dentro de la fila
    });
    
    for (const coord of rowPixels) {
      if (selected.length >= count) break;
      selected.push(coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón lineal hacia abajo - recorre de abajo hacia arriba por filas
 */
export function getLineDownPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Agrupar por filas y ordenar de abajo hacia arriba
  const byRow = new Map();
  changesArray.forEach(coord => {
    const [_x, y] = coord.split(',').map(Number);
    if (!byRow.has(y)) byRow.set(y, []);
    byRow.get(y).push(coord);
  });
  
  const selected = [];
  const sortedRows = Array.from(byRow.keys()).sort((a, b) => b - a); // Abajo hacia arriba
  
  for (const row of sortedRows) {
    if (selected.length >= count) break;
    const rowPixels = byRow.get(row).sort((a, b) => {
      const [x1] = a.split(',').map(Number);
      const [x2] = b.split(',').map(Number);
      return x1 - x2; // Izquierda a derecha dentro de la fila
    });
    
    for (const coord of rowPixels) {
      if (selected.length >= count) break;
      selected.push(coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón lineal hacia la izquierda - recorre de izquierda a derecha por columnas
 */
export function getLineLeftPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Agrupar por columnas y ordenar de izquierda a derecha
  const byCol = new Map();
  changesArray.forEach(coord => {
    const [x, _y] = coord.split(',').map(Number);
    if (!byCol.has(x)) byCol.set(x, []);
    byCol.get(x).push(coord);
  });
  
  const selected = [];
  const sortedCols = Array.from(byCol.keys()).sort((a, b) => a - b); // Izquierda a derecha
  
  for (const col of sortedCols) {
    if (selected.length >= count) break;
    const colPixels = byCol.get(col).sort((a, b) => {
      const [, y1] = a.split(',').map(Number);
      const [, y2] = b.split(',').map(Number);
      return y1 - y2; // Arriba a abajo dentro de la columna
    });
    
    for (const coord of colPixels) {
      if (selected.length >= count) break;
      selected.push(coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón lineal hacia la derecha - recorre de derecha a izquierda por columnas
 */
export function getLineRightPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Agrupar por columnas y ordenar de derecha a izquierda
  const byCol = new Map();
  changesArray.forEach(coord => {
    const [x, _y] = coord.split(',').map(Number);
    if (!byCol.has(x)) byCol.set(x, []);
    byCol.get(x).push(coord);
  });
  
  const selected = [];
  const sortedCols = Array.from(byCol.keys()).sort((a, b) => b - a); // Derecha a izquierda
  
  for (const col of sortedCols) {
    if (selected.length >= count) break;
    const colPixels = byCol.get(col).sort((a, b) => {
      const [, y1] = a.split(',').map(Number);
      const [, y2] = b.split(',').map(Number);
      return y1 - y2; // Arriba a abajo dentro de la columna
    });
    
    for (const coord of colPixels) {
      if (selected.length >= count) break;
      selected.push(coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón de bordes - prioriza perímetro exterior, luego interior en anillos
 */
export function getBordersPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Calcular bounding box del área de cambios
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  changesArray.forEach(coord => {
    const [x, y] = coord.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });
  
  // Agrupar píxeles por anillos desde el borde exterior
  const ringMap = new Map();
  
  changesArray.forEach(coord => {
    const [x, y] = coord.split(',').map(Number);
    
    // Calcular distancia al borde más cercano
    const distToLeft = x - minX;
    const distToRight = maxX - x;
    const distToTop = y - minY;
    const distToBottom = maxY - y;
    
    // El anillo es la distancia mínima al borde
    const ring = Math.min(distToLeft, distToRight, distToTop, distToBottom);
    
    if (!ringMap.has(ring)) ringMap.set(ring, []);
    ringMap.get(ring).push(coord);
  });
  
  // Seleccionar desde el anillo más exterior (ring 0) hacia adentro
  const selected = [];
  const sortedRings = Array.from(ringMap.keys()).sort((a, b) => a - b);
  
  for (const ring of sortedRings) {
    if (selected.length >= count) break;
    const ringPixels = ringMap.get(ring);
    
    for (const coord of ringPixels) {
      if (selected.length >= count) break;
      selected.push(coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón de línea - selecciona píxeles en líneas horizontales/verticales
 */

/**
 * Patrón de centro - selecciona píxeles desde el centro hacia afuera
 */
export function getCenterPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Calcular el centro del área de cambios
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  changesArray.forEach(coord => {
    const [x, y] = coord.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });
  
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  
  // Ordenar por distancia al centro
  const withDistance = changesArray.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    return { coord, distance };
  });
  
  withDistance.sort((a, b) => a.distance - b.distance);
  
  return withDistance.slice(0, count).map(item => item.coord);
}

/**
 * Patrón espiral - selecciona píxeles en forma de espiral desde el centro
 */
export function getSpiralPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Calcular el centro del área de cambios
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  changesArray.forEach(coord => {
    const [x, y] = coord.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });
  
  const centerX = Math.round((minX + maxX) / 2);
  const centerY = Math.round((minY + maxY) / 2);
  
  // Crear un mapa de coordenadas disponibles
  const availableCoords = new Set(changesArray);
  const selected = [];
  
  // Generar espiral
  let x = centerX;
  let y = centerY;
  let dx = 0;
  let dy = -1;
  let steps = 1;
  let stepCount = 0;
  let direction = 0; // 0: up, 1: right, 2: down, 3: left
  
  // Comenzar desde el centro si está disponible
  const centerCoord = `${centerX},${centerY}`;
  if (availableCoords.has(centerCoord)) {
    selected.push(centerCoord);
    availableCoords.delete(centerCoord);
  }
  
  while (selected.length < count && availableCoords.size > 0) {
    // Mover en la dirección actual
    x += dx;
    y += dy;
    
    const coord = `${x},${y}`;
    if (availableCoords.has(coord)) {
      selected.push(coord);
      availableCoords.delete(coord);
    }
    
    stepCount++;
    
    // Cambiar dirección cuando sea necesario
    if (stepCount === steps) {
      stepCount = 0;
      
      // Cambiar dirección (girar 90 grados a la derecha)
      if (dx === 0 && dy === -1) { // up -> right
        dx = 1; dy = 0;
      } else if (dx === 1 && dy === 0) { // right -> down
        dx = 0; dy = 1;
      } else if (dx === 0 && dy === 1) { // down -> left
        dx = -1; dy = 0;
      } else if (dx === -1 && dy === 0) { // left -> up
        dx = 0; dy = -1;
      }
      
      direction = (direction + 1) % 4;
      
      // Incrementar pasos cada dos cambios de dirección
      if (direction % 2 === 0) {
        steps++;
      }
    }
    
    // Evitar bucle infinito si nos alejamos demasiado
    if (Math.abs(x - centerX) > 100 || Math.abs(y - centerY) > 100) {
      break;
    }
  }
  
  // Si no hemos seleccionado suficientes, completar con aleatorios
  if (selected.length < count && availableCoords.size > 0) {
    const remaining = Array.from(availableCoords);
    const needed = Math.min(count - selected.length, remaining.length);
    
    for (let i = 0; i < needed; i++) {
      const randomIndex = Math.floor(Math.random() * remaining.length);
      selected.push(remaining.splice(randomIndex, 1)[0]);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón humano - simula comportamiento humano con variaciones y pausas
 */

/**
 * Obtiene píxeles según el patrón seleccionado
 */
export function getPixelsByPattern(pattern, changes, count, preferColor = false, preferredColorId = null, preferredColorIds = null) {
  log(`🎯 Aplicando patrón ${pattern} para ${count} píxeles de ${changes.size} cambios detectados`);
  
  let selectedCoords;
  const changeKeys = changes instanceof Map ? Array.from(changes.keys()) : Array.from(changes);
  
  switch (pattern) {
    case 'lineUp':
      selectedCoords = getLineUpPattern(changeKeys, count);
      break;
    case 'lineDown':
      selectedCoords = getLineDownPattern(changeKeys, count);
      break;
    case 'lineLeft':
      selectedCoords = getLineLeftPattern(changeKeys, count);
      break;
    case 'lineRight':
      selectedCoords = getLineRightPattern(changeKeys, count);
      break;
  // 'line' eliminado
    case 'center':
      selectedCoords = getCenterPattern(changeKeys, count);
      break;
    case 'borders':
      selectedCoords = getBordersPattern(changeKeys, count);
      break;
    case 'spiral':
      selectedCoords = getSpiralPattern(changeKeys, count);
      break;
  // 'human' eliminado
    case 'random':
    default:
      selectedCoords = getRandomPattern(changeKeys, count);
      break;
  }
  
  // Aplicar filtro de color preferido si está habilitado
  if (preferColor && changes instanceof Map) {
    const ids = Array.isArray(preferredColorIds) && preferredColorIds.length > 0
      ? preferredColorIds
      : (preferredColorId !== null ? [preferredColorId] : []);
    if (ids.length > 0) {
      selectedCoords = applyColorPreference(selectedCoords, changes, ids, count);
    }
  }
  
  return selectedCoords;
}

/**
 * Aplica preferencia de color priorizando píxeles del color seleccionado
 */
function applyColorPreference(selectedCoords, changesMap, preferredColorIds, maxCount) {
  const preferredPixels = [];
  const otherPixels = [];
  
  // Separar píxeles por color preferido
  for (const coord of selectedCoords) {
    const changeData = changesMap.get(coord);
  if (changeData && changeData.original && (Array.isArray(preferredColorIds)
    ? preferredColorIds.includes(changeData.original.colorId)
    : changeData.original.colorId === preferredColorIds)) {
      preferredPixels.push(coord);
    } else {
      otherPixels.push(coord);
    }
  }
  
  // Priorizar píxeles del color preferido, luego completar con otros
  const result = [...preferredPixels, ...otherPixels].slice(0, maxCount);
  
  if (preferredPixels.length > 0) {
    log(`🎨 Priorización de color: ${preferredPixels.length} píxeles del color preferido, ${result.length - preferredPixels.length} otros`);
  }
  
  return result;
}

/*
 * PATRONES ADICIONALES SUGERIDOS PARA IMPLEMENTACIÓN FUTURA:
 * 
 * 1. SERPIENTE (ZIG-ZAG):
 *    - Patrón que avanza en zigzag por filas o columnas
 *    - Alterna dirección en cada fila/columna para simular escritura
 *    - Implementación: getSnakePattern(changes, count, direction = 'horizontal')
 * 
 * 2. BARRIDO DIAGONAL:
 *    - Recorre diagonalmente (↘️ o ↗️)
 *    - Útil para patrones diagonales en imágenes
 *    - Implementación: getDiagonalPattern(changes, count, direction = 'down-right')
 * 
 * 3. ESPIRAL HORARIA/ANTIHORARIA:
 *    - Variación del espiral actual con control de dirección
 *    - Implementación: getSpiralPattern(changes, count, clockwise = true)
 * 
 * 4. ALEATORIO SESGADO:
 *    - Aleatorio que pondera bordes o contornos
 *    - Implementación: getBiasedRandomPattern(changes, count, bias = 'edges')
 * 
 * 5. PUNTOS DE ANCLAJE:
 *    - Prioriza esquinas y centro, luego rellena
 *    - Implementación: getAnchorPointsPattern(changes, count)
 * 
 * 6. BLOQUES/TILES:
 *    - Divide en bloques de 8x8 o 16x16 y procesa por bloques
 *    - Implementación: getTiledPattern(changes, count, tileSize = 16)
 * 
 * 7. CALOR (HEATMAP):
 *    - Prioriza áreas con vandalismo reciente
 *    - Requiere tracking de historial de cambios
 *    - Implementación: getHeatPattern(changes, count, recentChanges)
 * 
 * Para añadir estos patrones:
 * 1. Implementar la función en este archivo
 * 2. Añadir al switch en getPixelsByPattern()
 * 3. Actualizar PROTECTION_PATTERNS en config.js
 * 4. Actualizar el selector en la UI
 */