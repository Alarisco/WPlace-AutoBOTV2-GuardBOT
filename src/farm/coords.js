import { randInt } from "../core/timing.js";
import { log } from "../core/logger.js";

export function randomCoordInTile(tileX, tileY, margin = 0.05) {
  const size = 3000;
  const m = Math.floor(size * margin);
  const rx = Math.floor(Math.random() * (size - 2*m)) + m;
  const ry = Math.floor(Math.random() * (size - 2*m)) + m;
  return { x: rx, y: ry, absX: tileX * size + rx, absY: tileY * size + ry };
}

// Farm-specific coordinate generation
export function randomCoords(cfg) {
  // Generar coordenadas locales directamente dentro del tile (0 a TILE_SIZE-1)
  const margin = Math.floor(cfg.TILE_SIZE * 0.05); // 5% del tamaño del tile como margen
  const safeSize = cfg.TILE_SIZE - (margin * 2); // Área segura descontando márgenes
  
  // Validar que el área segura sea válida
  if (safeSize <= 0) {
    log('Error: área segura inválida, usando coordenadas básicas');
    return [Math.floor(Math.random() * cfg.TILE_SIZE), Math.floor(Math.random() * cfg.TILE_SIZE)];
  }
  
  // Generar coordenadas locales dentro del área segura del tile
  const localX = margin + Math.floor(Math.random() * safeSize);
  const localY = margin + Math.floor(Math.random() * safeSize);
  
  // Log para debugging (solo ocasionalmente)
  if (Math.random() < 0.1) { // 10% de las veces
    log(`Coordenadas locales generadas: (${localX},${localY}) en área segura [${margin}-${margin + safeSize - 1}]`);
  }
  
  return [localX, localY];
}

export function generateMultipleCoords(count, cfg) {
  const coords = [];
  for (let i = 0; i < count; i++) {
    coords.push(randomCoords(cfg));
  }
  return coords;
}

export function generateMultipleColors(count, cfg) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(nextColor(cfg));
  }
  return colors;
}

export function nextColor(cfg) {
  if (cfg.COLOR_MODE === 'fixed') {
    return cfg.COLOR_FIXED;
  } else {
    // Modo random: color entre COLOR_MIN y COLOR_MAX (inclusivo)
    return cfg.COLOR_MIN + randInt(cfg.COLOR_MAX - cfg.COLOR_MIN + 1);
  }
}

export function nextColorLegacy(palette) {
  return palette[Math.floor(Math.random() * palette.length)];
}
