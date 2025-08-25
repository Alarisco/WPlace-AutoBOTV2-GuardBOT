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
 * Patrón de línea - selecciona píxeles en líneas horizontales/verticales
 */
export function getLinePattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Agrupar por filas y columnas
  const byRow = new Map();
  const byCol = new Map();
  
  changesArray.forEach(coord => {
    const [x, y] = coord.split(',').map(Number);
    
    if (!byRow.has(y)) byRow.set(y, []);
    if (!byCol.has(x)) byCol.set(x, []);
    
    byRow.get(y).push(coord);
    byCol.get(x).push(coord);
  });
  
  const selected = [];
  const used = new Set();
  
  // Alternar entre filas y columnas
  const rows = Array.from(byRow.keys()).sort((a, b) => a - b);
  const cols = Array.from(byCol.keys()).sort((a, b) => a - b);
  
  let rowIndex = 0;
  let colIndex = 0;
  let useRow = true;
  
  while (selected.length < count && (rowIndex < rows.length || colIndex < cols.length)) {
    if (useRow && rowIndex < rows.length) {
      const row = rows[rowIndex];
      const rowPixels = byRow.get(row).filter(coord => !used.has(coord));
      
      if (rowPixels.length > 0) {
        // Tomar píxeles de la fila de izquierda a derecha
        const sortedRow = rowPixels.sort((a, b) => {
          const [x1] = a.split(',').map(Number);
          const [x2] = b.split(',').map(Number);
          return x1 - x2;
        });
        
        for (const coord of sortedRow) {
          if (selected.length >= count) break;
          selected.push(coord);
          used.add(coord);
        }
      }
      rowIndex++;
    } else if (!useRow && colIndex < cols.length) {
      const col = cols[colIndex];
      const colPixels = byCol.get(col).filter(coord => !used.has(coord));
      
      if (colPixels.length > 0) {
        // Tomar píxeles de la columna de arriba a abajo
        const sortedCol = colPixels.sort((a, b) => {
          const [, y1] = a.split(',').map(Number);
          const [, y2] = b.split(',').map(Number);
          return y1 - y2;
        });
        
        for (const coord of sortedCol) {
          if (selected.length >= count) break;
          selected.push(coord);
          used.add(coord);
        }
      }
      colIndex++;
    }
    
    useRow = !useRow;
  }
  
  return selected.slice(0, count);
}

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
export function getHumanPattern(changes, count) {
  const changesArray = Array.from(changes);
  if (changesArray.length === 0) return [];
  
  // Combinar diferentes estrategias como lo haría un humano
  const strategies = [
    () => getRandomPattern(new Set(changesArray), Math.ceil(count * 0.4)),
    () => getCenterPattern(new Set(changesArray), Math.ceil(count * 0.3)),
    () => getLinePattern(new Set(changesArray), Math.ceil(count * 0.3))
  ];
  
  const selected = [];
  const used = new Set();
  
  // Aplicar estrategias de forma aleatoria
  for (const strategy of strategies) {
    if (selected.length >= count) break;
    
    const availableChanges = new Set(changesArray.filter(coord => !used.has(coord)));
    if (availableChanges.size === 0) break;
    
    const strategyResult = strategy();
    
    for (const coord of strategyResult) {
      if (selected.length >= count) break;
      if (!used.has(coord)) {
        selected.push(coord);
        used.add(coord);
      }
    }
  }
  
  // Completar con aleatorios si es necesario
  if (selected.length < count) {
    const remaining = changesArray.filter(coord => !used.has(coord));
    const needed = Math.min(count - selected.length, remaining.length);
    
    for (let i = 0; i < needed; i++) {
      const randomIndex = Math.floor(Math.random() * remaining.length);
      const coord = remaining.splice(randomIndex, 1)[0];
      selected.push(coord);
      used.add(coord);
    }
  }
  
  return selected.slice(0, count);
}

/**
 * Obtiene píxeles según el patrón seleccionado
 */
export function getPixelsByPattern(pattern, changes, count) {
  log(`🎯 Aplicando patrón ${pattern} para ${count} píxeles de ${changes.size} cambios detectados`);
  
  switch (pattern) {
    case 'line':
      return getLinePattern(changes, count);
    case 'center':
      return getCenterPattern(changes, count);
    case 'spiral':
      return getSpiralPattern(changes, count);
    case 'human':
      return getHumanPattern(changes, count);
    case 'random':
    default:
      return getRandomPattern(changes, count);
  }
}