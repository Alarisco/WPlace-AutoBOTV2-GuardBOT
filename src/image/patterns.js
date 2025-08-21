import { log } from "../core/logger.js";

/**
 * Patrones de pintado disponibles
 */
export const PAINT_PATTERNS = {
  LINEAR_START: 'linear_start',
  LINEAR_END: 'linear_end', 
  RANDOM: 'random',
  CENTER_OUT: 'center_out',
  CORNERS_FIRST: 'corners_first',
  SPIRAL: 'spiral'
};

/**
 * Obtener nombre localizado del patrón
 */
export function getPatternName(pattern) {
  const names = {
    [PAINT_PATTERNS.LINEAR_START]: 'Lineal (Inicio)',
    [PAINT_PATTERNS.LINEAR_END]: 'Lineal (Final)',
    [PAINT_PATTERNS.RANDOM]: 'Aleatorio',
    [PAINT_PATTERNS.CENTER_OUT]: 'Centro hacia afuera',
    [PAINT_PATTERNS.CORNERS_FIRST]: 'Esquinas primero',
    [PAINT_PATTERNS.SPIRAL]: 'Espiral'
  };
  return names[pattern] || pattern;
}

/**
 * Ordenar píxeles según el patrón seleccionado
 */
export function sortPixelsByPattern(pixels, pattern, imageWidth, imageHeight) {
  if (!pixels || pixels.length === 0) {
    return pixels;
  }

  log(`🎨 Aplicando patrón de pintado: ${getPatternName(pattern)} (${pixels.length} píxeles)`);

  const sortedPixels = [...pixels]; // Crear copia para no modificar el original

  switch (pattern) {
    case PAINT_PATTERNS.LINEAR_START:
      return sortLinearStart(sortedPixels);
      
    case PAINT_PATTERNS.LINEAR_END:
      return sortLinearEnd(sortedPixels);
      
    case PAINT_PATTERNS.RANDOM:
      return sortRandom(sortedPixels);
      
    case PAINT_PATTERNS.CENTER_OUT:
      return sortCenterOut(sortedPixels, imageWidth, imageHeight);
      
    case PAINT_PATTERNS.CORNERS_FIRST:
      return sortCornersFirst(sortedPixels, imageWidth, imageHeight);
      
    case PAINT_PATTERNS.SPIRAL:
      return sortSpiral(sortedPixels, imageWidth, imageHeight);
      
    default:
      log(`⚠️ Patrón desconocido: ${pattern}, usando linear_start`);
      return sortLinearStart(sortedPixels);
  }
}

/**
 * Patrón lineal desde el inicio (izquierda a derecha, arriba a abajo)
 */
function sortLinearStart(pixels) {
  return pixels.sort((a, b) => {
    const aY = a.imageY !== undefined ? a.imageY : a.y;
    const bY = b.imageY !== undefined ? b.imageY : b.y;
    const aX = a.imageX !== undefined ? a.imageX : a.x;
    const bX = b.imageX !== undefined ? b.imageX : b.x;
    
    if (aY !== bY) return aY - bY; // Primero por Y (arriba a abajo)
    return aX - bX; // Luego por X (izquierda a derecha)
  });
}

/**
 * Patrón lineal desde el final (derecha a izquierda, abajo a arriba)
 */
function sortLinearEnd(pixels) {
  return pixels.sort((a, b) => {
    const aY = a.imageY !== undefined ? a.imageY : a.y;
    const bY = b.imageY !== undefined ? b.imageY : b.y;
    const aX = a.imageX !== undefined ? a.imageX : a.x;
    const bX = b.imageX !== undefined ? b.imageX : b.x;
    
    if (aY !== bY) return bY - aY; // Primero por Y (abajo a arriba)
    return bX - aX; // Luego por X (derecha a izquierda)
  });
}

/**
 * Patrón aleatorio
 */
function sortRandom(pixels) {
  // Usar algoritmo Fisher-Yates para mezcla aleatoria
  for (let i = pixels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pixels[i], pixels[j]] = [pixels[j], pixels[i]];
  }
  return pixels;
}

/**
 * Patrón desde el centro hacia afuera
 */
function sortCenterOut(pixels, imageWidth, imageHeight) {
  const centerX = imageWidth / 2;
  const centerY = imageHeight / 2;
  
  return pixels.sort((a, b) => {
    const aX = a.imageX !== undefined ? a.imageX : a.x;
    const aY = a.imageY !== undefined ? a.imageY : a.y;
    const bX = b.imageX !== undefined ? b.imageX : b.x;
    const bY = b.imageY !== undefined ? b.imageY : b.y;
    
    const distA = Math.sqrt(Math.pow(aX - centerX, 2) + Math.pow(aY - centerY, 2));
    const distB = Math.sqrt(Math.pow(bX - centerX, 2) + Math.pow(bY - centerY, 2));
    
    return distA - distB; // Desde el centro hacia afuera
  });
}

/**
 * Patrón esquinas primero
 */
function sortCornersFirst(pixels, imageWidth, imageHeight) {
  const corners = [
    { x: 0, y: 0 }, // Superior izquierda
    { x: imageWidth - 1, y: 0 }, // Superior derecha
    { x: 0, y: imageHeight - 1 }, // Inferior izquierda
    { x: imageWidth - 1, y: imageHeight - 1 } // Inferior derecha
  ];
  
  return pixels.sort((a, b) => {
    const aX = a.imageX !== undefined ? a.imageX : a.x;
    const aY = a.imageY !== undefined ? a.imageY : a.y;
    const bX = b.imageX !== undefined ? b.imageX : b.x;
    const bY = b.imageY !== undefined ? b.imageY : b.y;
    
    // Encontrar distancia mínima a cualquier esquina
    const minDistA = Math.min(...corners.map(corner => 
      Math.sqrt(Math.pow(aX - corner.x, 2) + Math.pow(aY - corner.y, 2))
    ));
    const minDistB = Math.min(...corners.map(corner => 
      Math.sqrt(Math.pow(bX - corner.x, 2) + Math.pow(bY - corner.y, 2))
    ));
    
    return minDistA - minDistB; // Desde las esquinas hacia adentro
  });
}

/**
 * Patrón espiral (desde afuera hacia el centro)
 */
function sortSpiral(pixels, imageWidth, imageHeight) {
  // Crear mapa de coordenadas para sorting espiral
  const coordinateMap = new Map();
  
  // Generar orden espiral
  let spiralIndex = 0;
  let left = 0, right = imageWidth - 1;
  let top = 0, bottom = imageHeight - 1;
  
  while (left <= right && top <= bottom) {
    // Recorrer fila superior
    for (let x = left; x <= right; x++) {
      coordinateMap.set(`${x},${top}`, spiralIndex++);
    }
    top++;
    
    // Recorrer columna derecha
    for (let y = top; y <= bottom; y++) {
      coordinateMap.set(`${right},${y}`, spiralIndex++);
    }
    right--;
    
    // Recorrer fila inferior (si queda)
    if (top <= bottom) {
      for (let x = right; x >= left; x--) {
        coordinateMap.set(`${x},${bottom}`, spiralIndex++);
      }
      bottom--;
    }
    
    // Recorrer columna izquierda (si queda)
    if (left <= right) {
      for (let y = bottom; y >= top; y--) {
        coordinateMap.set(`${left},${y}`, spiralIndex++);
      }
      left++;
    }
  }
  
  return pixels.sort((a, b) => {
    const aX = a.imageX !== undefined ? a.imageX : a.x;
    const aY = a.imageY !== undefined ? a.imageY : a.y;
    const bX = b.imageX !== undefined ? b.imageX : b.x;
    const bY = b.imageY !== undefined ? b.imageY : b.y;
    
    const indexA = coordinateMap.get(`${aX},${aY}`) || Number.MAX_SAFE_INTEGER;
    const indexB = coordinateMap.get(`${bX},${bY}`) || Number.MAX_SAFE_INTEGER;
    
    return indexA - indexB;
  });
}

/**
 * Aplicar patrón de pintado a los píxeles restantes
 */
export function applyPaintPattern(remainingPixels, pattern, imageData) {
  if (!remainingPixels || remainingPixels.length === 0) {
    return remainingPixels;
  }

  const imageWidth = imageData?.width || 100;
  const imageHeight = imageData?.height || 100;
  
  const sortedPixels = sortPixelsByPattern(remainingPixels, pattern, imageWidth, imageHeight);
  
  log(`✅ Patrón aplicado: ${getPatternName(pattern)} a ${sortedPixels.length} píxeles`);
  
  return sortedPixels;
}
