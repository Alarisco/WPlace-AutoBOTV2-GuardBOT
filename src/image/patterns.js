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
  SPIRAL: 'spiral',
  // Nuevos (inspirados en Guard)
  SNAKE: 'snake',
  DIAGONAL_SWEEP: 'diagonal_sweep',
  BORDERS: 'borders',
  CENTER: 'center',
  QUADRANTS: 'quadrants',
  BIASED_RANDOM: 'biased_random',
  CLUSTERS: 'clusters',
  PROXIMITY: 'proximity',
  SWEEP: 'sweep',
  PRIORITY: 'priority',
  ANCHOR_POINTS: 'anchor_points',
  SPIRAL_CW: 'spiral_cw',
  SPIRAL_CCW: 'spiral_ccw'
};

/**
 * Obtener nombre localizado del patrón
 */
export function getPatternName(pattern) {
  const names = {
    [PAINT_PATTERNS.LINEAR_START]: '➡️ Lineal (Inicio)',
    [PAINT_PATTERNS.LINEAR_END]: '⬅️ Lineal (Final)',
    [PAINT_PATTERNS.RANDOM]: '🎲 Aleatorio',
    [PAINT_PATTERNS.CENTER_OUT]: '💥 Centro hacia afuera',
    [PAINT_PATTERNS.CORNERS_FIRST]: '🏁 Esquinas primero',
    [PAINT_PATTERNS.SPIRAL]: '🌀 Espiral',
    [PAINT_PATTERNS.SNAKE]: '🐍 Serpiente (Zigzag)',
    [PAINT_PATTERNS.DIAGONAL_SWEEP]: '📐 Barrido diagonal',
    [PAINT_PATTERNS.BORDERS]: '🖼️ Bordes primero',
    [PAINT_PATTERNS.CENTER]: '🎯 Centro primero',
    [PAINT_PATTERNS.QUADRANTS]: '🔲 Cuadrantes',
    [PAINT_PATTERNS.BIASED_RANDOM]: '🎯 Aleatorio sesgado (bordes)',
    [PAINT_PATTERNS.CLUSTERS]: '🎪 Clusters',
    [PAINT_PATTERNS.PROXIMITY]: '🤝 Proximidad',
    [PAINT_PATTERNS.SWEEP]: '🧹 Barrido por secciones',
    [PAINT_PATTERNS.PRIORITY]: '⭐ Prioridad (mixto)',
    [PAINT_PATTERNS.ANCHOR_POINTS]: '⚓ Puntos de anclaje',
    [PAINT_PATTERNS.SPIRAL_CW]: '🔄 Espiral (horaria)',
    [PAINT_PATTERNS.SPIRAL_CCW]: '🔃 Espiral (antihoraria)'
  };
  return names[pattern] || pattern;
}/**
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

    // Nuevos patrones
    case PAINT_PATTERNS.SNAKE:
      return sortSnake(sortedPixels);

    case PAINT_PATTERNS.DIAGONAL_SWEEP:
      return sortDiagonalSweep(sortedPixels);

    case PAINT_PATTERNS.BORDERS:
      return sortBorders(sortedPixels, imageWidth, imageHeight);

    case PAINT_PATTERNS.CENTER:
      return sortCenter(sortedPixels, imageWidth, imageHeight);

    case PAINT_PATTERNS.QUADRANTS:
      return sortQuadrants(sortedPixels, imageWidth, imageHeight);

    case PAINT_PATTERNS.BIASED_RANDOM:
      return sortBiasedRandom(sortedPixels, imageWidth, imageHeight);

    case PAINT_PATTERNS.CLUSTERS:
      return sortClusters(sortedPixels, imageWidth, imageHeight);

    case PAINT_PATTERNS.PROXIMITY:
      return sortProximity(sortedPixels);

    case PAINT_PATTERNS.SWEEP:
      return sortSweepSections(sortedPixels);

    case PAINT_PATTERNS.PRIORITY:
      return sortPriority(sortedPixels, imageWidth, imageHeight);

    case PAINT_PATTERNS.ANCHOR_POINTS:
      return sortAnchorPoints(sortedPixels, imageWidth, imageHeight);

    case PAINT_PATTERNS.SPIRAL_CW:
      return sortSpiralDirectional(sortedPixels, imageWidth, imageHeight, true);

    case PAINT_PATTERNS.SPIRAL_CCW:
      return sortSpiralDirectional(sortedPixels, imageWidth, imageHeight, false);
      
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
 * Patrón serpiente (zigzag) por filas alternando dirección
 */
function sortSnake(pixels) {
  return pixels.sort((a, b) => {
    const ay = a.imageY ?? a.y; const by = b.imageY ?? b.y;
    if (ay !== by) return ay - by;
    const ax = a.imageX ?? a.x; const bx = b.imageX ?? b.x;
    // Filas pares (0-indexed) izq->der, impares der->izq
    return (ay % 2 === 0) ? (ax - bx) : (bx - ax);
  });
}

/**
 * Barrido diagonal por suma de coordenadas (x+y)
 */
function sortDiagonalSweep(pixels) {
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const da = ax + ay; const db = bx + by;
    if (da !== db) return da - db;
    return ax - bx;
  });
}

/**
 * Bordes primero: distancia mínima a cualquier borde
 */
function sortBorders(pixels, w, h) {
  const maxX = w - 1, maxY = h - 1;
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const da = Math.min(ax, ay, maxX - ax, maxY - ay);
    const db = Math.min(bx, by, maxX - bx, maxY - by);
    return da - db;
  });
}

/**
 * Centro primero: por distancia al centro
 */
function sortCenter(pixels, w, h) {
  const cx = w / 2, cy = h / 2;
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const da = (ax - cx) * (ax - cx) + (ay - cy) * (ay - cy);
    const db = (bx - cx) * (bx - cx) + (by - cy) * (by - cy);
    return da - db;
  });
}

/**
 * Cuadrantes rotativos
 */
function sortQuadrants(pixels, w, h) {
  const cx = w / 2, cy = h / 2;
  const quadIndex = (x, y) => (y < cy ? (x < cx ? 0 : 1) : (x < cx ? 2 : 3));
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const qa = quadIndex(ax, ay); const qb = quadIndex(bx, by);
    if (qa !== qb) return qa - qb;
    // Dentro de cada cuadrante: centro primero
    const da = (ax - cx) * (ax - cx) + (ay - cy) * (ay - cy);
    const db = (bx - cx) * (bx - cx) + (by - cy) * (by - cy);
    return da - db;
  });
}

/**
 * Aleatorio sesgado: más cerca del borde, mayor prioridad
 * Usa hash determinista para evitar cambios en cada llamada
 */
function sortBiasedRandom(pixels, w, h) {
  const maxX = w - 1, maxY = h - 1;
  const edgeWeight = (x, y) => 1 + (Math.min(x, y, maxX - x, maxY - y));
  const hash = (x, y) => {
    // xorshift simple determinista
    let v = ((x + 1) * 73856093) ^ ((y + 1) * 19349663);
    v ^= v << 13; v ^= v >> 17; v ^= v << 5; return (v >>> 0) / 0xffffffff;
  };
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const sa = edgeWeight(ax, ay) - hash(ax, ay);
    const sb = edgeWeight(bx, by) - hash(bx, by);
    return sb - sa; // mayor score primero
  });
}

/**
 * Clusters: agrupa por cercanía a algunas semillas
 */
function sortClusters(pixels, w, h) {
  if (pixels.length < 64) return sortCenter(pixels, w, h);
  // Elegir 9 semillas en una cuadrícula 3x3
  const seeds = [];
  for (let sy = 1; sy <= 3; sy++) {
    for (let sx = 1; sx <= 3; sx++) {
      seeds.push({ x: Math.round((sx * w) / 4), y: Math.round((sy * h) / 4) });
    }
  }
  const seedIndex = (x, y) => {
    let best = 0, bestD = Infinity;
    for (let i = 0; i < seeds.length; i++) {
      const s = seeds[i];
      const d = (x - s.x) * (x - s.x) + (y - s.y) * (y - s.y);
      if (d < bestD) { bestD = d; best = i; }
    }
    return best;
  };
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const ca = seedIndex(ax, ay), cb = seedIndex(bx, by);
    if (ca !== cb) return ca - cb;
    // Dentro del cluster: centro de su semilla primero
    const s = seeds[ca];
    const da = (ax - s.x) * (ax - s.x) + (ay - s.y) * (ay - s.y);
    const db = (bx - s.x) * (bx - s.x) + (by - s.y) * (by - s.y);
    return da - db;
  });
}

/**
 * Proximidad: orden Z (Morton) para proximidad espacial
 */
function sortProximity(pixels) {
  const part1by1 = (n) => {
    n &= 0x0000ffff; n = (n | (n << 8)) & 0x00FF00FF; n = (n | (n << 4)) & 0x0F0F0F0F; n = (n | (n << 2)) & 0x33333333; n = (n | (n << 1)) & 0x55555555; return n;
  };
  const morton = (x, y) => (part1by1(y) << 1) | part1by1(x);
  return pixels.sort((a, b) => morton(a.imageX ?? a.x, a.imageY ?? a.y) - morton(b.imageX ?? b.x, b.imageY ?? b.y));
}

/**
 * Barrido por secciones 8x8
 */
function sortSweepSections(pixels) {
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const sa = (Math.floor(ay / 8) << 16) | Math.floor(ax / 8);
    const sb = (Math.floor(by / 8) << 16) | Math.floor(bx / 8);
    if (sa !== sb) return sa - sb;
    if (ay !== by) return ay - by;
    return ax - bx;
  });
}

/**
 * Prioridad combinada (centro, borde, aleatorio leve)
 */
function sortPriority(pixels, w, h) {
  const cx = w / 2, cy = h / 2; const maxX = w - 1, maxY = h - 1;
  const edge = (x, y) => Math.min(x, y, maxX - x, maxY - y);
  const hash = (x, y) => { let v = ((x + 7) * 2654435761) ^ ((y + 13) * 2246822519); v ^= v << 13; v ^= v >> 17; v ^= v << 5; return (v >>> 0) / 0xffffffff; };
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const centerA = (ax - cx) * (ax - cx) + (ay - cy) * (ay - cy);
    const centerB = (bx - cx) * (bx - cx) + (by - cy) * (by - cy);
    const scoreA = -0.4 * centerA + 0.3 * edge(ax, ay) + 0.3 * hash(ax, ay);
    const scoreB = -0.4 * centerB + 0.3 * edge(bx, by) + 0.3 * hash(bx, by);
    return scoreB - scoreA; // mayor score primero
  });
}

/**
 * Puntos de anclaje: esquinas y centro
 */
function sortAnchorPoints(pixels, w, h) {
  const anchors = [
    { x: 0, y: 0 }, { x: w - 1, y: 0 }, { x: 0, y: h - 1 }, { x: w - 1, y: h - 1 },
    { x: Math.round((w - 1) / 2), y: Math.round((h - 1) / 2) }
  ];
  const distAnchor = (x, y) => {
    let d = Infinity; for (const a of anchors) { const v = (x - a.x) * (x - a.x) + (y - a.y) * (y - a.y); if (v < d) d = v; } return d;
  };
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    return distAnchor(ax, ay) - distAnchor(bx, by);
  });
}

/**
 * Espiral con dirección
 */
function sortSpiralDirectional(pixels, w, h, clockwise = true) {
  const cx = (w - 1) / 2, cy = (h - 1) / 2;
  return pixels.sort((a, b) => {
    const ax = a.imageX ?? a.x; const ay = a.imageY ?? a.y;
    const bx = b.imageX ?? b.x; const by = b.imageY ?? b.y;
    const ra = Math.hypot(ax - cx, ay - cy); const rb = Math.hypot(bx - cx, by - cy);
    if (Math.abs(ra - rb) > 0.5) return ra - rb; // radio ascendente
    const aa = Math.atan2(ay - cy, ax - cx); const ab = Math.atan2(by - cy, bx - cx);
    return clockwise ? (aa - ab) : (ab - aa);
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
