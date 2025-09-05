import { log } from "../core/logger.js";
import { guardState } from "./config.js";

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
  
  // Preferir el centro del área protegida si existe para mayor estabilidad
  let centerX;
  let centerY;
  if (guardState?.protectionArea && typeof guardState.protectionArea.x1 === 'number' && typeof guardState.protectionArea.x2 === 'number' && typeof guardState.protectionArea.y1 === 'number' && typeof guardState.protectionArea.y2 === 'number') {
    centerX = (guardState.protectionArea.x1 + guardState.protectionArea.x2) / 2;
    centerY = (guardState.protectionArea.y1 + guardState.protectionArea.y2) / 2;
  } else {
    centerX = (minX + maxX) / 2;
    centerY = (minY + maxY) / 2;
  }
  
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
 * Patrón zigzag horizontal - simula escritura humana línea por línea
 */
export function getZigzagPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Agrupar por filas
  const byRow = new Map();
  changesArray.forEach(coord => {
    const [_x, y] = coord.split(',').map(Number);
    if (!byRow.has(y)) byRow.set(y, []);
    byRow.get(y).push(coord);
  });
  
  const selected = [];
  const sortedRows = Array.from(byRow.keys()).sort((a, b) => a - b);
  let leftToRight = true;
  
  for (const row of sortedRows) {
    if (selected.length >= count) break;
    const rowPixels = byRow.get(row).sort((a, b) => {
      const [x1] = a.split(',').map(Number);
      const [x2] = b.split(',').map(Number);
      return leftToRight ? x1 - x2 : x2 - x1;
    });
    
    for (const coord of rowPixels) {
      if (selected.length >= count) break;
      selected.push(coord);
    }
    
    leftToRight = !leftToRight; // Alternar dirección
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón diagonal - recorre diagonalmente como leyendo
 */
export function getDiagonalPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Ordenar por suma de coordenadas (diagonal principal)
  const withDiagonal = changesArray.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    return { coord, diagonal: x + y, x, y };
  });
  
  withDiagonal.sort((a, b) => {
    if (a.diagonal !== b.diagonal) return a.diagonal - b.diagonal;
    return a.x - b.x; // Desempate por x
  });
  
  return withDiagonal.slice(0, count).map(item => item.coord);
}

/**
 * Patrón de clusters - agrupa píxeles cercanos como haría un humano
 */
export function getClusterPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  const selected = [];
  const available = new Set(changesArray);
  
  while (selected.length < count && available.size > 0) {
    // Seleccionar un punto aleatorio como centro del cluster
    const availableArray = Array.from(available);
    const centerCoord = availableArray[Math.floor(Math.random() * availableArray.length)];
    const [centerX, centerY] = centerCoord.split(',').map(Number);
    
    // Encontrar píxeles cercanos (radio de 3-5 píxeles)
    const clusterRadius = 3 + Math.floor(Math.random() * 3);
    const cluster = [];
    
    for (const coord of available) {
      const [x, y] = coord.split(',').map(Number);
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      if (distance <= clusterRadius) {
        cluster.push(coord);
      }
    }
    
    // Añadir algunos píxeles del cluster
    const clusterSize = Math.min(cluster.length, Math.min(5, count - selected.length));
    for (let i = 0; i < clusterSize; i++) {
      const randomIndex = Math.floor(Math.random() * cluster.length);
      const coord = cluster.splice(randomIndex, 1)[0];
      selected.push(coord);
      available.delete(coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón de ondas - simula movimiento ondulatorio natural
 */
export function getWavePattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Calcular bounding box
  let minX = Infinity, maxX = -Infinity;
  changesArray.forEach(coord => {
    const [x] = coord.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
  });
  
  // Ordenar por función de onda
  const withWave = changesArray.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    const normalizedX = (x - minX) / (maxX - minX || 1);
    const waveY = Math.sin(normalizedX * Math.PI * 2) * 10;
    const distance = Math.abs(y - waveY);
    return { coord, distance, x };
  });
  
  withWave.sort((a, b) => {
    if (Math.abs(a.distance - b.distance) < 2) {
      return a.x - b.x; // Desempate por posición x
    }
    return a.distance - b.distance;
  });
  
  return withWave.slice(0, count).map(item => item.coord);
}

/**
 * Patrón de esquinas - prioriza esquinas y bordes como puntos de referencia
 */
export function getCornersPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Calcular bounding box
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  changesArray.forEach(coord => {
    const [x, y] = coord.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });
  
  // Definir las 4 esquinas
  const corners = [
    [minX, minY], [maxX, minY],
    [minX, maxY], [maxX, maxY]
  ];
  
  // Ordenar por distancia a la esquina más cercana
  const withCornerDistance = changesArray.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    let minDistance = Infinity;
    
    for (const [cornerX, cornerY] of corners) {
      const distance = Math.sqrt(Math.pow(x - cornerX, 2) + Math.pow(y - cornerY, 2));
      minDistance = Math.min(minDistance, distance);
    }
    
    return { coord, distance: minDistance };
  });
  
  withCornerDistance.sort((a, b) => a.distance - b.distance);
  
  return withCornerDistance.slice(0, count).map(item => item.coord);
}

/**
 * Patrón de barrido - simula limpieza sistemática por secciones
 */
export function getSweepPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Dividir en secciones de 8x8
  const sections = new Map();
  
  changesArray.forEach(coord => {
    const [x, y] = coord.split(',').map(Number);
    const sectionX = Math.floor(x / 8);
    const sectionY = Math.floor(y / 8);
    const sectionKey = `${sectionX},${sectionY}`;
    
    if (!sections.has(sectionKey)) sections.set(sectionKey, []);
    sections.get(sectionKey).push(coord);
  });
  
  const selected = [];
  const sectionKeys = Array.from(sections.keys());
  
  // Procesar secciones en orden
  for (const sectionKey of sectionKeys) {
    if (selected.length >= count) break;
    
    const sectionPixels = sections.get(sectionKey);
    const toTake = Math.min(sectionPixels.length, count - selected.length);
    
    // Tomar algunos píxeles de esta sección
    for (let i = 0; i < toTake; i++) {
      selected.push(sectionPixels[i]);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón de prioridad - simula decisiones humanas de importancia
 */
export function getPriorityPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Calcular centro para dar más prioridad a píxeles centrales
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
  
  // Calcular prioridad basada en múltiples factores
  const withPriority = changesArray.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    
    // Factor 1: Distancia al centro (menor = mejor)
    const centerDistance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    
    // Factor 2: Distancia a bordes (mayor = mejor para bordes)
    const edgeDistance = Math.min(x - minX, maxX - x, y - minY, maxY - y);
    
    // Factor 3: Componente aleatorio para simular decisiones humanas
    const randomFactor = Math.random() * 0.3;
    
    // Combinar factores (menor score = mayor prioridad)
    const priority = centerDistance * 0.4 - edgeDistance * 0.3 + randomFactor;
    
    return { coord, priority };
  });
  
  withPriority.sort((a, b) => a.priority - b.priority);
  
  return withPriority.slice(0, count).map(item => item.coord);
}

/**
 * Patrón de proximidad - agrupa píxeles por cercanía como haría un humano
 */
export function getProximityPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  const selected = [];
  const available = new Set(changesArray);
  
  // Comenzar con un píxel aleatorio
  let currentCoord = changesArray[Math.floor(Math.random() * changesArray.length)];
  selected.push(currentCoord);
  available.delete(currentCoord);
  
  while (selected.length < count && available.size > 0) {
    const [currentX, currentY] = currentCoord.split(',').map(Number);
    
    // Encontrar el píxel más cercano al actual
    let closestCoord = null;
    let closestDistance = Infinity;
    
    for (const coord of available) {
      const [x, y] = coord.split(',').map(Number);
      const distance = Math.sqrt(Math.pow(x - currentX, 2) + Math.pow(y - currentY, 2));
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCoord = coord;
      }
    }
    
    if (closestCoord) {
      selected.push(closestCoord);
      available.delete(closestCoord);
      currentCoord = closestCoord;
    } else {
      break;
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón de cuadrantes - divide en 4 cuadrantes y los procesa rotativamente
 */
export function getQuadrantPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Calcular centro
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
  
  // Dividir en cuadrantes
  const quadrants = [[], [], [], []]; // TL, TR, BL, BR
  
  changesArray.forEach(coord => {
    const [x, y] = coord.split(',').map(Number);
    
    if (x <= centerX && y <= centerY) {
      quadrants[0].push(coord); // Top-Left
    } else if (x > centerX && y <= centerY) {
      quadrants[1].push(coord); // Top-Right
    } else if (x <= centerX && y > centerY) {
      quadrants[2].push(coord); // Bottom-Left
    } else {
      quadrants[3].push(coord); // Bottom-Right
    }
  });
  
  // Seleccionar rotativamente de cada cuadrante
  const selected = [];
  let quadrantIndex = 0;
  const quadrantPointers = [0, 0, 0, 0];
  
  while (selected.length < count) {
    const currentQuadrant = quadrants[quadrantIndex];
    const pointer = quadrantPointers[quadrantIndex];
    
    if (pointer < currentQuadrant.length) {
      selected.push(currentQuadrant[pointer]);
      quadrantPointers[quadrantIndex]++;
    }
    
    quadrantIndex = (quadrantIndex + 1) % 4;
    
    // Si todos los cuadrantes están vacíos, salir
    if (quadrantPointers.every((p, i) => p >= quadrants[i].length)) {
      break;
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón de dispersión controlada - aleatorio con tendencia a evitar agrupaciones
 */
export function getScatteredPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  const selected = [];
  const available = [...changesArray];
  
  while (selected.length < count && available.length > 0) {
    let bestCoord = null;
    let bestScore = -1;
    let bestIndex = -1;
    
    // Evaluar cada píxel disponible
    for (let i = 0; i < available.length; i++) {
      const coord = available[i];
      const [x, y] = coord.split(',').map(Number);
      
      // Calcular distancia mínima a píxeles ya seleccionados
      let minDistance = Infinity;
      for (const selectedCoord of selected) {
        const [sx, sy] = selectedCoord.split(',').map(Number);
        const distance = Math.sqrt(Math.pow(x - sx, 2) + Math.pow(y - sy, 2));
        minDistance = Math.min(minDistance, distance);
      }
      
      // Añadir componente aleatorio
      const randomFactor = Math.random() * 0.5;
      const score = minDistance + randomFactor;
      
      if (score > bestScore) {
        bestScore = score;
        bestCoord = coord;
        bestIndex = i;
      }
    }
    
    if (bestCoord) {
      selected.push(bestCoord);
      available.splice(bestIndex, 1);
    } else {
      break;
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Obtiene píxeles según el patrón seleccionado
 */
export function getPixelsByPattern(pattern, changes, count, preferColor = false, preferredColorId = null, preferredColorIds = null, excludeColor = false, excludedColorIds = null) {
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
    case 'zigzag':
      selectedCoords = getZigzagPattern(changeKeys, count);
      break;
    case 'diagonal':
      selectedCoords = getDiagonalPattern(changeKeys, count);
      break;
    case 'cluster':
      selectedCoords = getClusterPattern(changeKeys, count);
      break;
    case 'wave':
      selectedCoords = getWavePattern(changeKeys, count);
      break;
    case 'corners':
      selectedCoords = getCornersPattern(changeKeys, count);
      break;
    case 'sweep':
      selectedCoords = getSweepPattern(changeKeys, count);
      break;
    case 'priority':
      selectedCoords = getPriorityPattern(changeKeys, count);
      break;
    case 'proximity':
      selectedCoords = getProximityPattern(changeKeys, count);
      break;
    case 'quadrant':
      selectedCoords = getQuadrantPattern(changeKeys, count);
      break;
    case 'scattered':
      selectedCoords = getScatteredPattern(changeKeys, count);
      break;
    case 'snake':
      selectedCoords = getSnakePattern(changeKeys, count);
      break;
    case 'diagonalSweep':
      selectedCoords = getDiagonalSweepPattern(changeKeys, count);
      break;
    case 'spiralClockwise':
      selectedCoords = getDirectionalSpiralPattern(changeKeys, count, true);
      break;
    case 'spiralCounterClockwise':
      selectedCoords = getDirectionalSpiralPattern(changeKeys, count, false);
      break;
    case 'biasedRandom':
      selectedCoords = getBiasedRandomPattern(changeKeys, count);
      break;
    case 'anchorPoints':
      selectedCoords = getAnchorPointsPattern(changeKeys, count);
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

  // Aplicar filtro de exclusión de colores si está habilitado
  if (excludeColor && changes instanceof Map) {
    const excludeIds = Array.isArray(excludedColorIds) && excludedColorIds.length > 0
      ? excludedColorIds
      : [];
    if (excludeIds.length > 0) {
      selectedCoords = applyColorExclusion(selectedCoords, changes, excludeIds);
    }
  }

  return selectedCoords;
}

/**
 * Aplica preferencia de color priorizando píxeles del color seleccionado
 * SOLO debe usar píxeles del color preferido hasta que no queden más de ese color
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

  // Nueva lógica: priorizar preferidos y RELLENAR con otros hasta completar maxCount
  const result = [];
  if (preferredPixels.length > 0) {
    const takePreferred = preferredPixels.slice(0, Math.min(maxCount, preferredPixels.length));
    result.push(...takePreferred);
  }
  if (result.length < maxCount && otherPixels.length > 0) {
    const remaining = maxCount - result.length;
    const takeOthers = otherPixels.slice(0, remaining);
    result.push(...takeOthers);
  }

  log(`🎨 Priorización de color: ${preferredPixels.length} preferidos disponibles, rellenando hasta ${maxCount}. Seleccionados: ${result.length}`);
  return result;
}

/**
 * Aplica exclusión de colores filtrando píxeles de los colores especificados
 */
function applyColorExclusion(selectedCoords, changesMap, excludedColorIds) {
  const filteredPixels = [];
  let excludedCount = 0;
  
  // Filtrar píxeles excluyendo los colores especificados
  for (const coord of selectedCoords) {
    const changeData = changesMap.get(coord);
    
    // Si el píxel tiene color original y está en la lista de exclusión, no lo incluimos
    if (changeData && changeData.original && excludedColorIds.includes(changeData.original.colorId)) {
      excludedCount++;
    } else {
      filteredPixels.push(coord);
    }
  }
  
  if (excludedCount > 0) {
    log(`🚫 Exclusión de colores: ${excludedCount} píxeles excluidos, ${filteredPixels.length} píxeles seleccionados`);
  }
  
  return filteredPixels;
}

/**
 * Patrón serpiente (zigzag) - avanza en zigzag por filas alternando dirección
 */
export function getSnakePattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Agrupar por filas
  const rowGroups = {};
  for (const coord of changesArray) {
    const [x, y] = coord.split(',').map(Number);
    if (!rowGroups[y]) rowGroups[y] = [];
    rowGroups[y].push({ coord, x, y });
  }
  
  // Ordenar filas y alternar dirección
  const sortedRows = Object.keys(rowGroups).map(Number).sort((a, b) => a - b);
  const selected = [];
  
  for (let i = 0; i < sortedRows.length && selected.length < count; i++) {
    const row = sortedRows[i];
    const pixels = rowGroups[row];
    
    // Alternar dirección: filas pares izq->der, impares der->izq
    if (i % 2 === 0) {
      pixels.sort((a, b) => a.x - b.x); // Izquierda a derecha
    } else {
      pixels.sort((a, b) => b.x - a.x); // Derecha a izquierda
    }
    
    for (const pixel of pixels) {
      if (selected.length >= count) break;
      selected.push(pixel.coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón de barrido diagonal - recorre diagonalmente
 */
export function getDiagonalSweepPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Agrupar por diagonales (suma de coordenadas)
  const diagonalGroups = {};
  for (const coord of changesArray) {
    const [x, y] = coord.split(',').map(Number);
    const diagonal = x + y; // Diagonal principal
    if (!diagonalGroups[diagonal]) diagonalGroups[diagonal] = [];
    diagonalGroups[diagonal].push({ coord, x, y });
  }
  
  // Ordenar diagonales y píxeles dentro de cada diagonal
  const sortedDiagonals = Object.keys(diagonalGroups).map(Number).sort((a, b) => a - b);
  const selected = [];
  
  for (const diagonal of sortedDiagonals) {
    if (selected.length >= count) break;
    
    const pixels = diagonalGroups[diagonal];
    pixels.sort((a, b) => a.x - b.x); // Ordenar por X dentro de la diagonal
    
    for (const pixel of pixels) {
      if (selected.length >= count) break;
      selected.push(pixel.coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón espiral con dirección controlada (horaria/antihoraria)
 */
export function getDirectionalSpiralPattern(changes, count, clockwise = true) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Encontrar centro
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const coords = changesArray.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    return { coord, x, y };
  });
  
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  
  // Calcular ángulo y distancia desde el centro
  coords.forEach(item => {
    const dx = item.x - centerX;
    const dy = item.y - centerY;
    item.distance = Math.sqrt(dx * dx + dy * dy);
    item.angle = Math.atan2(dy, dx);
    
    // Ajustar ángulo para dirección
    if (!clockwise) {
      item.angle = -item.angle;
    }
  });
  
  // Ordenar por distancia y luego por ángulo
  coords.sort((a, b) => {
    const distDiff = a.distance - b.distance;
    if (Math.abs(distDiff) < 1) {
      return a.angle - b.angle;
    }
    return distDiff;
  });
  
  return coords.slice(0, count).map(item => item.coord);
}

/**
 * Patrón aleatorio sesgado - aleatorio con preferencia por bordes
 */
export function getBiasedRandomPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Encontrar límites
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const coord of changesArray) {
    const [x, y] = coord.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  
  // Calcular peso basado en proximidad a bordes
  const weightedCoords = changesArray.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    
    // Distancia a los bordes
    const distToLeft = x - minX;
    const distToRight = maxX - x;
    const distToTop = y - minY;
    const distToBottom = maxY - y;
    
    // Peso mayor para píxeles cerca de bordes
    const minDistToBorder = Math.min(distToLeft, distToRight, distToTop, distToBottom);
    const weight = 1 / (minDistToBorder + 1) + Math.random() * 0.5;
    
    return { coord, weight };
  });
  
  // Ordenar por peso (mayor peso = mayor probabilidad)
  weightedCoords.sort((a, b) => b.weight - a.weight);
  
  // Selección sesgada con componente aleatorio
  const selected = [];
  const available = [...weightedCoords];
  
  while (selected.length < count && available.length > 0) {
    // Selección sesgada: mayor probabilidad para pesos altos
    const totalWeight = available.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    let selectedIndex = 0;
    for (let i = 0; i < available.length; i++) {
      random -= available[i].weight;
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }
    
    selected.push(available[selectedIndex].coord);
    available.splice(selectedIndex, 1);
  }
  
  return selected.slice(0, count);
}

/**
 * Patrón de puntos de anclaje - prioriza esquinas y centro
 */
export function getAnchorPointsPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Encontrar límites
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const coords = changesArray.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    return { coord, x, y };
  });
  
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  
  // Definir puntos de anclaje
  const anchorPoints = [
    { x: minX, y: minY, priority: 1 }, // Esquina superior izquierda
    { x: maxX, y: minY, priority: 1 }, // Esquina superior derecha
    { x: minX, y: maxY, priority: 1 }, // Esquina inferior izquierda
    { x: maxX, y: maxY, priority: 1 }, // Esquina inferior derecha
    { x: centerX, y: centerY, priority: 2 }, // Centro
    { x: centerX, y: minY, priority: 3 }, // Centro superior
    { x: centerX, y: maxY, priority: 3 }, // Centro inferior
    { x: minX, y: centerY, priority: 3 }, // Centro izquierdo
    { x: maxX, y: centerY, priority: 3 }  // Centro derecho
  ];
  
  // Calcular prioridad para cada píxel
  coords.forEach(item => {
    let minDistance = Infinity;
    let bestPriority = 10;
    
    for (const anchor of anchorPoints) {
      const distance = Math.sqrt(
        Math.pow(item.x - anchor.x, 2) + Math.pow(item.y - anchor.y, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        bestPriority = anchor.priority;
      }
    }
    
    item.priority = bestPriority;
    item.distanceToAnchor = minDistance;
  });
  
  // Ordenar por prioridad y luego por distancia
  coords.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.distanceToAnchor - b.distanceToAnchor;
  });
  
  return coords.slice(0, count).map(item => item.coord);
}