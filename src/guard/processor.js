import { log } from "../core/logger.js";
import { getSession } from "../core/wplace-api.js";
// Usamos el mismo flujo de pintado que el bot de imagen para evitar 403
import { postPixelBatchImage } from '../core/wplace-api.js';
import { ensureToken, getCachedToken } from "../core/turnstile.js";
import { guardState, GUARD_DEFAULTS } from "./config.js";
import { sleep } from "../core/timing.js";
import { getPixelsByPattern } from "./patterns.js";
import { pixelsRepaired, reportError, trackEvent } from "../core/metrics/client.js";
import { getMetricsConfig } from "../core/metrics/config.js";

// Variables para monitoreo de cargas
let chargeMonitorInterval = null;
let independentChargeMonitorInterval = null; // Nuevo: monitoreo independiente
let lastChargeUpdate = null;
let calculatedCharges = 0;
let _lastChargeCheck = 0;
let _isRepairing = false; // Evitar bucles infinitos
let _countdownInterval = null;
let _nextChargeTime = 0;
const CHARGE_CHECK_INTERVAL = 30000; // 30 segundos
const CHARGE_REGENERATION_TIME = 31000; // 31 segundos por carga

/**
 * Inicia el contador de tiempo para el próximo lote
 */
function startCountdownTimer() {
  if (_countdownInterval) {
    window.clearInterval(_countdownInterval);
  }
  
  _countdownInterval = window.setInterval(() => {
    const now = Date.now();
    const timeLeft = Math.max(0, Math.ceil((_nextChargeTime - now) / 1000));
    
    if (guardState.ui) {
      guardState.ui.updateCountdown(timeLeft);
    }
    
    if (timeLeft <= 0) {
      window.clearInterval(_countdownInterval);
      _countdownInterval = null;
    }
  }, 1000);
}

/**
 * Detiene el contador de tiempo
 */
function stopCountdownTimer() {
  if (_countdownInterval) {
    window.clearInterval(_countdownInterval);
    _countdownInterval = null;
  }
  
  if (guardState.ui) {
    guardState.ui.showCountdown(false);
  }
}

/**
 * Inicia el monitoreo periódico de cargas (cuando el bot está activo)
 */
export function startChargeMonitoring() {
  if (chargeMonitorInterval) {
    log('🔄 Monitoreo de cargas ya está activo');
    return;
  }

  log('🔄 Iniciando monitoreo de cargas cada 30 segundos...');
  
  // Pausar el contador independiente si está activo
  if (independentChargeMonitorInterval) {
    log('⏸️ Pausando contador independiente - bot iniciado');
  }
  
  chargeMonitorInterval = window.setInterval(async () => {
    try {
      // Actualizar cargas en tiempo real
      const sessionResult = await getSession();
      
      if (sessionResult.success) {
        const availableCharges = Math.floor(sessionResult.data.charges);
        
        // Actualizar estado de cargas
        guardState.currentCharges = sessionResult.data.charges;
        guardState.maxCharges = sessionResult.data.maxCharges;
        
        // Sincronizar con el contador independiente
        calculatedCharges = sessionResult.data.charges;
        lastChargeUpdate = Date.now();
        
        // Actualizar UI con cargas actuales
        if (guardState.ui) {
          guardState.ui.updateStats({ charges: availableCharges });
        }
        
        // Solo verificar si hay cambios pendientes, no estamos reparando activamente, y el Guard está corriendo
        if (guardState.changes.size > 0 && guardState.running && !_isRepairing) {
          if (availableCharges >= guardState.minChargesToWait) {
            log(`🔄 Cargas detectadas: ${availableCharges}. Continuando reparación automáticamente...`);
            
            // Detener contador si está activo
            stopCountdownTimer();
            
            // Continuar con la reparación
            await repairChanges(guardState.changes);
          }
        }
      }
    } catch (error) {
      log(`Error en monitoreo de cargas: ${error.message}`);
    }
  }, CHARGE_CHECK_INTERVAL);
}

/**
 * Detener monitoreo de cargas (cuando el bot se detiene)
 */
export function stopChargeMonitoring() {
  if (chargeMonitorInterval) {
    window.clearInterval(chargeMonitorInterval);
    chargeMonitorInterval = null;
    log('🔄 Monitoreo de cargas detenido');
    
    // Reanudar el contador independiente si está configurado
    if (independentChargeMonitorInterval) {
      log('▶️ Reanudando contador independiente - bot detenido');
      // El contador independiente seguirá funcionando automáticamente
      // ya que verifica chargeMonitorInterval en cada iteración
    }
  }
  
  // También detener el contador
  stopCountdownTimer();
}

/**
 * Inicia el monitoreo independiente de cargas (solo cuando el bot NO está corriendo)
 * Hace una petición inicial y luego calcula las cargas usando un contador interno
 */
export function startIndependentChargeMonitoring() {
  if (independentChargeMonitorInterval) {
    log('🔄 Monitoreo independiente de cargas ya está activo');
    return;
  }

  log('🔄 Iniciando monitoreo independiente de cargas cada 30 segundos...');
  
  // Función para obtener cargas iniciales y luego usar contador
  const initializeChargeTracking = async () => {
    try {
      // Solo proceder si el bot no está corriendo
      if (chargeMonitorInterval) {
        log('🔄 Bot activo detectado, saltando inicialización independiente');
        return;
      }

      const sessionResult = await getSession();
      if (sessionResult.success) {
        calculatedCharges = sessionResult.data.charges;
        guardState.currentCharges = calculatedCharges;
        guardState.maxCharges = sessionResult.data.maxCharges;
        lastChargeUpdate = Date.now();
        
        const availableCharges = Math.floor(calculatedCharges);
        if (guardState.ui) {
          guardState.ui.updateStats({ charges: availableCharges });
        }
        
        log(`🔋 Cargas iniciales obtenidas: ${availableCharges}/${guardState.maxCharges}`);
      }
    } catch (error) {
      log(`Error obteniendo cargas iniciales: ${error.message}`);
    }
  };

  // Función para actualizar cargas usando contador interno
  const updateCalculatedCharges = () => {
    try {
      // Solo actualizar si el bot no está corriendo
      if (chargeMonitorInterval) {
        return;
      }

      if (lastChargeUpdate && calculatedCharges < guardState.maxCharges) {
        const now = Date.now();
        const timeSinceLastUpdate = now - lastChargeUpdate;
        const chargesGained = Math.floor(timeSinceLastUpdate / 30000); // 1 carga cada 30 segundos
        
        if (chargesGained > 0) {
          calculatedCharges = Math.min(calculatedCharges + chargesGained, guardState.maxCharges);
          guardState.currentCharges = calculatedCharges;
          lastChargeUpdate = now;
          
          const availableCharges = Math.floor(calculatedCharges);
          if (guardState.ui) {
            guardState.ui.updateStats({ charges: availableCharges });
          }
          
          // Log periódico para debug (opcional, cada 5 minutos)
          if (!_lastChargeCheck || now - _lastChargeCheck > 300000) { // 5 minutos
            log(`🔋 Cargas calculadas actualizadas: ${availableCharges}/${guardState.maxCharges}`);
            _lastChargeCheck = now;
          }
        }
      }
    } catch (error) {
      log(`Error actualizando cargas calculadas: ${error.message}`);
    }
  };

  // Inicializar cargas y luego actualizar cada 30 segundos
  initializeChargeTracking();
  independentChargeMonitorInterval = window.setInterval(updateCalculatedCharges, CHARGE_CHECK_INTERVAL);
}

/**
 * Detener monitoreo independiente de cargas
 */
export function stopIndependentChargeMonitoring() {
  if (independentChargeMonitorInterval) {
    window.clearInterval(independentChargeMonitorInterval);
    independentChargeMonitorInterval = null;
    lastChargeUpdate = null;
    calculatedCharges = 0;
    log('🔄 Monitoreo independiente de cargas detenido');
  }
}

// Funciones para conversión de color RGB a LAB
function rgbToXyz(r, g, b) {
  // Normalizar valores RGB a 0-1
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Aplicar corrección gamma
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convertir a XYZ usando matriz sRGB
  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  const z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

  return { x, y, z };
}

function xyzToLab(x, y, z) {
  // Usar iluminante D65
  const xn = 0.95047;
  const yn = 1.00000;
  const zn = 1.08883;

  x = x / xn;
  y = y / yn;
  z = z / zn;

  const fx = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x + 16/116);
  const fy = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y + 16/116);
  const fz = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z + 16/116);

  const l = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { l, a, b };
}

export function rgbToLab(r, g, b) {
  const xyz = rgbToXyz(r, g, b);
  return xyzToLab(xyz.x, xyz.y, xyz.z);
}

// Función para calcular diferencia Delta E en espacio LAB
export function calculateDeltaE(lab1, lab2) {
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;
  
  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

// Función para comparar colores usando diferentes métodos
function compareColors(color1, color2, method = 'rgb', threshold = 10) {
  // Manejar casos especiales con píxeles transparentes
  if (color1.colorId === 0 || color2.colorId === 0) {
    // Si uno es transparente y el otro no, son diferentes
    return color1.colorId !== color2.colorId;
  }
  
  // Verificar que ambos colores tengan valores RGB válidos
  if (color1.r === null || color1.g === null || color1.b === null ||
      color2.r === null || color2.g === null || color2.b === null) {
    // Si alguno tiene valores RGB null, comparar solo por colorId
    return color1.colorId !== color2.colorId;
  }
  
  if (method === 'lab') {
    const lab1 = rgbToLab(color1.r, color1.g, color1.b);
    const lab2 = rgbToLab(color2.r, color2.g, color2.b);
    const deltaE = calculateDeltaE(lab1, lab2);
    
    // Para LAB, un Delta E < 2.3 es imperceptible, < 5 es aceptable
    return deltaE > (threshold / 2); // Ajustar umbral para LAB
  } else {
    // Método RGB original
    const rDiff = Math.abs(color1.r - color2.r);
    const gDiff = Math.abs(color1.g - color2.g);
    const bDiff = Math.abs(color1.b - color2.b);
    const maxDiff = Math.max(rDiff, gDiff, bDiff);
    
    return maxDiff > threshold;
  }
}

// Globals del navegador
const { Image, URL } = window;

// Obtener imagen de tile desde la API
export async function getTileImage(tileX, tileY) {
  try {
    const url = `${GUARD_DEFAULTS.BACKEND_URL}/files/s0/tiles/${tileX}/${tileY}.png`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.blob();
  } catch (error) {
    log(`Error obteniendo tile ${tileX},${tileY}:`, error);
    return null;
  }
}

// Detectar colores disponibles del sitio
export function detectAvailableColors() {
  log("🎨 Detectando colores disponibles...");
  const colorElements = document.querySelectorAll('[id^="color-"]');
  const colors = [];

  // Siempre incluir el color transparente (ID 0) para consistencia con JSON cargados
  // IMPORTANTE: No usar RGB (0,0,0) para transparente ya que se confunde con negro
  colors.push({
    id: 0,
    r: null,
    g: null,
    b: null,
    element: null // No tiene elemento DOM
  });

  for (const element of colorElements) {
    if (element.querySelector("svg")) continue;
    
    const colorId = parseInt(element.id.replace("color-", ""));
    if (colorId === 0) continue; // Ya añadido arriba
    
    const bgColor = element.style.backgroundColor;
    if (bgColor) {
      const rgbMatch = bgColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        colors.push({
          id: colorId,
          r: parseInt(rgbMatch[0]),
          g: parseInt(rgbMatch[1]),
          b: parseInt(rgbMatch[2]),
          element: element
        });
      }
    }
  }

  log(`✅ ${colors.length} colores detectados (incluyendo transparente)`);
  return colors;
}

// Encontrar el color más cercano disponible
export function findClosestColor(r, g, b, availableColors) {
  // Seleccionar el color más cercano usando espacio LAB (Delta E)
  // para alinearse con el algoritmo del módulo de imagen y evitar falsos positivos
  if (!availableColors || availableColors.length === 0) return null;

  // Filtrar el color transparente (ID 0) ya que no tiene valores RGB válidos
  const validColors = availableColors.filter(color => color.id !== 0 && color.r !== null);
  
  if (validColors.length === 0) return null;

  const targetLab = rgbToLab(r, g, b);
  let minDeltaE = Infinity;
  let closestColor = null;

  for (const color of validColors) {
    const lab = rgbToLab(color.r, color.g, color.b);
    const deltaE = calculateDeltaE(targetLab, lab);
    if (deltaE < minDeltaE) {
      minDeltaE = deltaE;
      closestColor = color;
    }
  }

  return closestColor;
}

// Analizar píxeles de un área específica
export async function analyzeAreaPixels(area, options = {}) {
  const { allowVirtual = false } = options;
  const { x1, y1, x2, y2 } = area;
  const width = x2 - x1 + 1; // inclusivo
  const height = y2 - y1 + 1; // inclusivo

  log(`🔍 Analizando área ${width}x${height} desde (${x1},${y1}) hasta (${x2},${y2})`);
  
  // Asegurar que tenemos colores disponibles antes de analizar
  if (!guardState.availableColors || guardState.availableColors.length === 0) {
    const detected = detectAvailableColors();
    if (detected.length > 0) {
      guardState.availableColors = detected;
      log(`🎨 Colores detectados para análisis: ${detected.length}`);
    } else {
      log(`⚠️ Sin colores disponibles para análisis. Omitiendo análisis para evitar falsos positivos.`);
      return new Map();
    }
  }

  const pixelMap = new Map();
  
  // Obtener tiles únicos que cubren el área
  const startTileX = Math.floor(x1 / GUARD_DEFAULTS.TILE_SIZE);
  const startTileY = Math.floor(y1 / GUARD_DEFAULTS.TILE_SIZE);
  const endTileX = Math.floor(x2 / GUARD_DEFAULTS.TILE_SIZE);
  const endTileY = Math.floor(y2 / GUARD_DEFAULTS.TILE_SIZE);
  
  // Para simplificar, analizar tile por tile
  for (let tileY = startTileY; tileY <= endTileY; tileY++) {
    for (let tileX = startTileX; tileX <= endTileX; tileX++) {
      try {
        const tileBlob = await getTileImage(tileX, tileY);
        if (!tileBlob) {
          log(`⚠️ No se pudo obtener tile ${tileX},${tileY}, continuando...`);
          continue;
        }

        // Crear canvas para analizar la imagen
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = URL.createObjectURL(tileBlob);
        });

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Analizar píxeles en el área especificada de este tile
        const tileStartX = tileX * GUARD_DEFAULTS.TILE_SIZE;
        const tileStartY = tileY * GUARD_DEFAULTS.TILE_SIZE;
        const tileEndXExclusive = tileStartX + GUARD_DEFAULTS.TILE_SIZE;
        const tileEndYExclusive = tileStartY + GUARD_DEFAULTS.TILE_SIZE;
        
        // Calcular intersección del área (inclusiva) con este tile usando fin-exclusivo
        const areaEndXExclusive = x2 + 1;
        const areaEndYExclusive = y2 + 1;
        const analyzeStartX = Math.max(x1, tileStartX);
        const analyzeStartY = Math.max(y1, tileStartY);
        const analyzeEndXExclusive = Math.min(areaEndXExclusive, tileEndXExclusive);
        const analyzeEndYExclusive = Math.min(areaEndYExclusive, tileEndYExclusive);
        
        for (let globalY = analyzeStartY; globalY < analyzeEndYExclusive; globalY++) {
          for (let globalX = analyzeStartX; globalX < analyzeEndXExclusive; globalX++) {
            const localXRaw = globalX - tileStartX;
            const localYRaw = globalY - tileStartY;
            const localX = ((localXRaw % 1000) + 1000) % 1000;
            const localY = ((localYRaw % 1000) + 1000) % 1000;
            
            // Verificar que estamos dentro de los límites del tile
            if (localX >= 0 && localX < GUARD_DEFAULTS.TILE_SIZE && 
                localY >= 0 && localY < GUARD_DEFAULTS.TILE_SIZE) {
              
              // Las coordenadas de la imagen son 1:1 con las coordenadas del tile
              if (localX < canvas.width && localY < canvas.height) {
                const pixelIndex = (localY * canvas.width + localX) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                const a = data[pixelIndex + 3];
                
                if (a > 0) { 
                  // Píxel visible - encontrar color más cercano
                  const closestColor = findClosestColor(r, g, b, guardState.availableColors);
                  if (closestColor) {
                    pixelMap.set(`${globalX},${globalY}`, {
                      r, g, b,
                      colorId: closestColor.id,
                      globalX,
                      globalY,
                      localX,
                      localY,
                      tileX,
                      tileY
                    });
                  }
                } else {
                  // Píxel transparente (a = 0) - guardarlo como color ID 0
                  pixelMap.set(`${globalX},${globalY}`, {
                    r: null, g: null, b: null, // RGB null para transparente
                    colorId: 0, // ID 0 = transparente
                    globalX,
                    globalY,
                    localX,
                    localY,
                    tileX,
                    tileY
                  });
                }
              }
            }
          }
        }

        URL.revokeObjectURL(img.src);
      } catch (error) {
        log(`❌ Error analizando tile ${tileX},${tileY}:`, error);
      }
    }
  }

  log(`✅ Análisis completado: ${pixelMap.size} píxeles protegidos`);
  
  // Si no encontramos píxeles en el mapa, crear "virtuales" solo si está permitido (captura)
  if (pixelMap.size === 0) {
    if (allowVirtual) {
      log(`⚠️ No se encontraron píxeles existentes, creando área virtual para protección`);
      const areaEndXExclusive = x2 + 1;
      const areaEndYExclusive = y2 + 1;
      // Crear entradas virtuales para cada píxel del área (inclusivo)
      for (let globalY = y1; globalY < areaEndYExclusive; globalY++) {
        for (let globalX = x1; globalX < areaEndXExclusive; globalX++) {
          const tileX = Math.floor(globalX / GUARD_DEFAULTS.TILE_SIZE);
          const tileY = Math.floor(globalY / GUARD_DEFAULTS.TILE_SIZE);
          const localXRaw = globalX - (tileX * GUARD_DEFAULTS.TILE_SIZE);
          const localYRaw = globalY - (tileY * GUARD_DEFAULTS.TILE_SIZE);
          const localX = ((localXRaw % 1000) + 1000) % 1000;
          const localY = ((localYRaw % 1000) + 1000) % 1000;
          
          // Usar color blanco por defecto (ID 5) para píxeles vacíos
          pixelMap.set(`${globalX},${globalY}`, {
            r: 255, g: 255, b: 255, // Blanco por defecto
            colorId: 5, // ID correcto del color blanco
            globalX,
            globalY,
            localX,
            localY,
            tileX,
            tileY
          });
        }
      }
      
      log(`✅ Área virtual creada: ${pixelMap.size} píxeles para proteger`);
    } else {
      log(`ℹ️ Análisis vacío y fallback virtual deshabilitado (modo verificación)`);
    }
  }
  
  return pixelMap;
}

/**
 * Función específica para el modo borrado
 * Analiza un área y devuelve solo los píxeles que NO son transparentes (id ≠ 0)
 */
export async function analyzeAreaForErasing(area) {
  const { x1, y1, x2, y2 } = area;
  log(`🗑️ Analizando área para borrado: (${x1},${y1}) a (${x2},${y2})`);
  
  const pixelsToErase = new Map();
  
  // Obtener tiles únicos que cubren el área
  const startTileX = Math.floor(x1 / GUARD_DEFAULTS.TILE_SIZE);
  const startTileY = Math.floor(y1 / GUARD_DEFAULTS.TILE_SIZE);
  const endTileX = Math.floor(x2 / GUARD_DEFAULTS.TILE_SIZE);
  const endTileY = Math.floor(y2 / GUARD_DEFAULTS.TILE_SIZE);
  
  // Analizar tile por tile
  for (let tileY = startTileY; tileY <= endTileY; tileY++) {
    for (let tileX = startTileX; tileX <= endTileX; tileX++) {
      try {
        const tileBlob = await getTileImage(tileX, tileY);
        if (!tileBlob) {
          log(`⚠️ No se pudo obtener tile ${tileX},${tileY}, continuando...`);
          continue;
        }

        // Crear canvas para analizar la imagen
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = URL.createObjectURL(tileBlob);
        });

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Analizar píxeles en el área especificada de este tile
        const tileStartX = tileX * GUARD_DEFAULTS.TILE_SIZE;
        const tileStartY = tileY * GUARD_DEFAULTS.TILE_SIZE;
        const tileEndXExclusive = tileStartX + GUARD_DEFAULTS.TILE_SIZE;
        const tileEndYExclusive = tileStartY + GUARD_DEFAULTS.TILE_SIZE;
        
        // Calcular intersección del área con este tile
        const areaEndXExclusive = x2 + 1;
        const areaEndYExclusive = y2 + 1;
        const analyzeStartX = Math.max(x1, tileStartX);
        const analyzeStartY = Math.max(y1, tileStartY);
        const analyzeEndXExclusive = Math.min(areaEndXExclusive, tileEndXExclusive);
        const analyzeEndYExclusive = Math.min(areaEndYExclusive, tileEndYExclusive);
        
        for (let globalY = analyzeStartY; globalY < analyzeEndYExclusive; globalY++) {
          for (let globalX = analyzeStartX; globalX < analyzeEndXExclusive; globalX++) {
            const localXRaw = globalX - tileStartX;
            const localYRaw = globalY - tileStartY;
            const localX = ((localXRaw % 1000) + 1000) % 1000;
            const localY = ((localYRaw % 1000) + 1000) % 1000;
            
            // Verificar que estamos dentro de los límites del tile
            if (localX >= 0 && localX < GUARD_DEFAULTS.TILE_SIZE && 
                localY >= 0 && localY < GUARD_DEFAULTS.TILE_SIZE) {
              
              if (localX < canvas.width && localY < canvas.height) {
                const pixelIndex = (localY * canvas.width + localX) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                const a = data[pixelIndex + 3];
                
                if (a > 0) { // Píxel visible
                  const closestColor = findClosestColor(r, g, b, guardState.availableColors);
                  if (closestColor && closestColor.id !== 0) { // Solo píxeles NO transparentes
                    pixelsToErase.set(`${globalX},${globalY}`, {
                      r, g, b,
                      colorId: closestColor.id,
                      globalX,
                      globalY,
                      localX,
                      localY,
                      tileX,
                      tileY
                    });
                  }
                }
              }
            }
          }
        }

        URL.revokeObjectURL(img.src);
      } catch (error) {
        log(`❌ Error analizando tile ${tileX},${tileY} para borrado:`, error);
      }
    }
  }

  log(`🗑️ Análisis para borrado completado: ${pixelsToErase.size} píxeles no transparentes encontrados`);
  return pixelsToErase;
}

/**
 * Analiza píxeles transparentes que han sido pintados (transparente → sólido)
 * @param {Object} protectionArea - Área a analizar
 * @returns {Map} - Mapa de píxeles transparentes que fueron pintados
 */
async function analyzeTransparentPixelsDamage(protectionArea) {
  const damagedTransparentPixels = new Map();
  
  if (!guardState.protectTransparentPixels) {
    return damagedTransparentPixels;
  }

  // Obtener píxeles actuales del área
  const currentPixels = await analyzeAreaPixels(protectionArea);
  
  // Buscar píxeles originalmente transparentes que ahora son sólidos
  for (const [key, originalPixel] of guardState.originalPixels) {
    if (originalPixel.colorId === 0) { // Píxel original era transparente
      const currentPixel = currentPixels.get(key);
      
      if (currentPixel && currentPixel.colorId !== 0) {
        // Píxel transparente fue pintado → marcarlo para reparación
        damagedTransparentPixels.set(key, {
          original: originalPixel,
          current: currentPixel,
          targetColorId: 0, // Objetivo: volver a transparente
          type: 'transparent_damaged'
        });
      }
    }
  }

  log(`🫥 Análisis de píxeles transparentes: ${damagedTransparentPixels.size} píxeles transparentes dañados encontrados`);
  return damagedTransparentPixels;
}

/**
 * Crea un área de perímetro transparente alrededor del área protegida
 * @param {Object} protectionArea - Área protegida base
 * @returns {Object} - Área expandida con perímetro
 */
function createPerimeterArea(protectionArea) {
  if (!guardState.protectPerimeter || guardState.perimeterWidth <= 0) {
    return null;
  }

  const width = guardState.perimeterWidth;
  
  return {
    x1: protectionArea.x1 - width,
    y1: protectionArea.y1 - width,
    x2: protectionArea.x2 + width,
    y2: protectionArea.y2 + width,
    tileX: protectionArea.tileX,
    tileY: protectionArea.tileY
  };
}

/**
 * Analiza píxeles en el perímetro que no deberían estar (deben ser transparentes)
 * @param {Object} protectionArea - Área protegida base
 * @returns {Map} - Píxeles en el perímetro que deben convertirse a transparente
 */
async function analyzePerimeterIntrusions(protectionArea) {
  const perimeterIntrusions = new Map();
  
  if (!guardState.protectPerimeter) {
    return perimeterIntrusions;
  }

  const perimeterArea = createPerimeterArea(protectionArea);
  if (!perimeterArea) {
    return perimeterIntrusions;
  }

  // Obtener todos los píxeles del área expandida (incluyendo perímetro)
  const allPixels = await analyzeAreaPixels(perimeterArea);
  
  // Identificar píxeles que están en el perímetro (no en el área protegida original)
  for (const [key, pixel] of allPixels) {
    const [x, y] = key.split(',').map(Number);
    
    // Verificar si está en el perímetro (fuera del área protegida original)
    const isInPerimeter = (
      x < protectionArea.x1 || x > protectionArea.x2 ||
      y < protectionArea.y1 || y > protectionArea.y2
    );
    
    if (isInPerimeter && pixel.colorId !== 0) {
      // Píxel en perímetro que no es transparente → marcarlo para borrado
      perimeterIntrusions.set(key, {
        original: null, // No hay original en el perímetro
        current: pixel,
        targetColorId: 0, // Objetivo: transparente
        type: 'perimeter_intrusion'
      });
    }
  }

  log(`🛡️ Análisis de perímetro: ${perimeterIntrusions.size} intrusiones en perímetro encontradas`);
  return perimeterIntrusions;
}

// Actualizar estadísticas de análisis en la UI principal
function updateAnalysisStatsInUI(originalPixels, currentPixels) {
  if (!guardState.ui || !guardState.ui.updateAnalysisStats) {
    return;
  }

  const total = originalPixels.size;
  let correctCount = 0;
  let incorrectCount = 0;
  let missingCount = 0;

  if (total === 0) {
    // No hay píxeles originales para comparar
    guardState.ui.updateAnalysisStats({
      correct: 0,
      incorrect: 0,
      missing: 0,
      accuracy: 0
    });
    return;
  }

  // Comparar cada píxel original con el actual
  for (const [key, originalPixel] of originalPixels) {
    const currentPixel = currentPixels.get(key);
    
    if (!currentPixel) {
      // Píxel faltante
      missingCount++;
    } else {
      // Comparar colores usando el método configurado
      const comparisonMethod = guardState.config?.colorComparisonMethod || 'rgb';
      const threshold = guardState.config?.colorThreshold || 10;
      
      const isChanged = compareColors(currentPixel, originalPixel, comparisonMethod, threshold);
      
      if (isChanged) {
        incorrectCount++;
      } else {
        correctCount++;
      }
    }
  }

  const accuracy = total > 0 ? ((correctCount / total) * 100).toFixed(1) : 0;

  guardState.ui.updateAnalysisStats({
    correct: correctCount,
    incorrect: incorrectCount,
    missing: missingCount,
    accuracy: accuracy
  });
}

// Detectar cambios en el área protegida
export async function checkForChanges() {
  if (!guardState.protectionArea || !guardState.originalPixels.size) {
    return;
  }

  try {
    // En modo borrado, analizar el área buscando píxeles no transparentes
    if (guardState.operationMode === 'erase') {
      const pixelsToErase = await analyzeAreaForErasing(guardState.protectionArea);
      
      if (pixelsToErase.size === 0) {
        // No hay píxeles no transparentes, el área está completamente borrada
        guardState.lastCheck = Date.now();
        if (guardState.ui) {
          guardState.ui.updateStatus('✅ Área completamente borrada - todos los píxeles son transparentes', 'success');
          guardState.ui.updateProgress(0, guardState.originalPixels.size, false);
        }
        return;
      }
      
      // Crear "cambios" para todos los píxeles no transparentes encontrados
      const changes = new Map();
      for (const [key, pixel] of pixelsToErase) {
        changes.set(key, {
          timestamp: Date.now(),
          type: 'erase',
          original: pixel, // El píxel actual no transparente
          current: pixel,
          targetColorId: 0 // Color objetivo: transparente
        });
      }
      
      log(`🗑️ Detectados ${pixelsToErase.size} píxeles no transparentes para borrar`);
      guardState.changes = changes;
      
      if (guardState.ui) {
        guardState.ui.updateStatus(`🗑️ ${pixelsToErase.size} píxeles no transparentes detectados`, 'warning');
        guardState.ui.updateProgress(pixelsToErase.size, guardState.originalPixels.size, false);
      }
      
      // Iniciar proceso de borrado si está habilitado y no está en modo vigía
      if (guardState.running && !guardState.watchMode) {
        await repairChanges(changes);
      }
      
      return;
    }

    // Modo protección normal: analizar píxeles actuales vs originales
    const currentPixels = await analyzeAreaPixels(guardState.protectionArea);

    // Si el análisis actual está vacío pero tenemos píxeles originales virtuales,
    // esto significa que el área sigue vacía como se esperaba
    if (!currentPixels || currentPixels.size === 0) {
      if (guardState.isVirtualArea) {
        // Área virtual sigue vacía como se esperaba, no hay cambios
        guardState.lastCheck = Date.now();
        if (guardState.ui) {
          guardState.ui.updateStatus('✅ Área protegida - sin cambios (área virtual vacía)', 'success');
        }
        return;
      } else {
        // Tenemos píxeles originales reales pero el análisis actual está vacío
        // Esto indica que los píxeles fueron borrados
        log(`🚨 Píxeles originales detectados pero análisis actual vacío - píxeles fueron borrados`);
      }
    }

    const changes = new Map();
    let changedCount = 0;

    if (guardState.isVirtualArea && currentPixels && currentPixels.size > 0) {
      // Caso especial: área virtual (originalmente vacía) pero ahora tiene píxeles
      // Todos los píxeles actuales son "intrusos" que deben ser borrados
      for (const [key, currentPixel] of currentPixels) {
        changes.set(key, {
          timestamp: Date.now(),
          type: 'intrusion', // Nuevo tipo para píxeles que no deberían estar
          original: null, // No hay píxel original en área virtual
          current: currentPixel
        });
        changedCount++;
      }
    } else {
      // Comparación normal: píxeles originales vs actuales
      for (const [key, originalPixel] of guardState.originalPixels) {
        const currentPixel = currentPixels.get(key);
        // Si el usuario desactiva la protección de píxeles transparentes,
        // no debemos considerar cambios para píxeles que originalmente eran transparentes
        if (!guardState.protectTransparentPixels && originalPixel?.colorId === 0) {
          continue;
        }
        
        if (!currentPixel) {
          // Píxel fue borrado
          changes.set(key, {
            timestamp: Date.now(),
            type: 'deleted',
            original: originalPixel,
            current: null
          });
          changedCount++;
        } else {
          // Para píxeles de JSON importado, usar comparación más tolerante
          // Comparar primero por colorId, y si no coincide, verificar si los colores son similares
          let isChanged = false;
          
          if (currentPixel.colorId !== originalPixel.colorId) {
            // Usar el método de comparación configurado (RGB o LAB)
            const comparisonMethod = guardState.config?.colorComparisonMethod || 'rgb';
            const threshold = guardState.config?.colorThreshold || 10;
            
            isChanged = compareColors(currentPixel, originalPixel, comparisonMethod, threshold);
          }
          
          if (isChanged) {
            changes.set(key, {
              timestamp: Date.now(),
              type: 'changed',
              original: originalPixel,
              current: currentPixel
            });
            changedCount++;
          }
        }
      }
    }

    // NUEVA LÓGICA: Verificar píxeles transparentes dañados y perímetro
    if ((guardState.protectTransparentPixels || guardState.protectPerimeter)) {
      // Analizar píxeles transparentes que fueron pintados
      if (guardState.protectTransparentPixels) {
        const transparentDamage = await analyzeTransparentPixelsDamage(guardState.protectionArea);
        
        for (const [key, damage] of transparentDamage) {
          if (!changes.has(key)) { // No sobrescribir cambios ya detectados
            changes.set(key, {
              timestamp: Date.now(),
              type: 'transparent_repair',
              original: damage.original,
              current: damage.current,
              targetColorId: 0 // Reparar a transparente
            });
            changedCount++;
          }
        }
      }

      // Analizar intrusiones en el perímetro
      // Solo limpiar perímetro si la opción está activa
      if (guardState.protectPerimeter) {
        const perimeterIntrusions = await analyzePerimeterIntrusions(guardState.protectionArea);
        for (const [key, intrusion] of perimeterIntrusions) {
          if (!changes.has(key)) { // No sobrescribir cambios ya detectados
            changes.set(key, {
              timestamp: Date.now(),
              type: 'perimeter_clear',
              original: intrusion.original,
              current: intrusion.current,
              targetColorId: 0 // Limpiar perímetro a transparente
            });
            changedCount++;
          }
        }
      }
    }

  if (changedCount > 0) {
      log(`🚨 Detectados ${changedCount} cambios en el área protegida`);
      guardState.changes = changes;
      
      // Actualizar UI
      if (guardState.ui) {
        guardState.ui.updateStatus(`🚨 ${changedCount} cambios detectados`, 'warning');
        guardState.ui.updateProgress(changes.size, guardState.originalPixels.size, guardState.isVirtualArea);
        
        // Actualizar estadísticas de análisis
        updateAnalysisStatsInUI(guardState.originalPixels, currentPixels);
      }
      
      // Métricas: resumen de análisis (con cambios)
      try {
        let incorrect = 0;
        let missing = 0;
        for (const v of changes.values()) {
          if (v.type === 'deleted') missing++;
          else incorrect++;
        }
        debouncedAnalysisSummary({ total: guardState.originalPixels.size, incorrect, missing });
      } catch {}

      // Iniciar reparación automática si está habilitada y no está en modo vigía
  if (guardState.running && !guardState.watchMode) {
        await repairChanges(changes);
      } else if (guardState.watchMode) {
        // En modo vigía, solo registrar los cambios sin reparar
        log(`👁️ Modo Vigía: ${changes.size} cambios detectados (sin reparar)`);
        if (guardState.ui) {
          guardState.ui.updateStatus(`👁️ Vigía: ${changes.size} cambios detectados`, 'warning');
        }
      }
  } else {
      // Actualizar timestamp de última verificación
      guardState.lastCheck = Date.now();
      if (guardState.ui) {
        guardState.ui.updateStatus('✅ Área protegida - sin cambios', 'success');
        guardState.ui.updateProgress(0, guardState.originalPixels.size, guardState.isVirtualArea);
        
        // Actualizar estadísticas de análisis también cuando no hay cambios
        updateAnalysisStatsInUI(guardState.originalPixels, currentPixels);
      }

      // Métricas: resumen de análisis (sin cambios)
      try {
        debouncedAnalysisSummary({
          total: guardState.originalPixels.size,
          incorrect: 0,
          missing: 0
        });
      } catch {}
    }

  } catch (error) {
    log(`❌ Error verificando cambios:`, error);
    if (guardState.ui) {
      guardState.ui.updateStatus(`❌ Error verificando: ${error.message}`, 'error');
    }
  }
}

// Reparar los cambios detectados - ahora con gestión de cargas mínimas
export async function repairChanges(changes) {
  if (changes.size === 0) {
    return;
  }
  
  // Evitar bucles infinitos del monitoreo de cargas
  if (_isRepairing) {
    log('🔄 Reparación ya en progreso, omitiendo llamada duplicada');
    return;
  }
  
  _isRepairing = true;
  
  try {
    const changesArray = Array.from(changes.values());
    const availableCharges = Math.floor(guardState.currentCharges);
    
    // Lógica especial para "gastar todos los píxeles al iniciar"
    let maxRepairs;
    let isFirstBatch = guardState.spendAllPixelsOnStart && guardState.totalRepaired === 0;
    
    if (isFirstBatch) {
      // En el primer batch, usar todas las cargas disponibles pero respetando un mínimo de seguridad
      const safetyMinimum = Math.min(5, guardState.minChargesToWait); // Mantener al menos 5 cargas o el mínimo configurado
      const spendableCharges = Math.max(0, availableCharges - safetyMinimum);
      maxRepairs = Math.min(changesArray.length, spendableCharges, GUARD_DEFAULTS.MAX_PIXELS_PER_BATCH);
      log(`⚡ Primer batch - gastando ${maxRepairs} píxeles de ${spendableCharges} cargas gastables (${availableCharges} total, ${safetyMinimum} mínimo de seguridad)`);
    } else {
      // Determinar cuántos píxeles necesitamos reparar
      const pixelsNeeded = changesArray.length;
      const batchSize = guardState.pixelsPerBatch;
      
      // Si quedan menos píxeles que el tamaño del lote, usar solo los píxeles restantes
      if (pixelsNeeded > 0 && pixelsNeeded < batchSize) {
        // Calcular cargas disponibles para gastar (total - mínimo a mantener)
        const spendableCharges = Math.max(0, availableCharges - guardState.minChargesToWait);
        
        // Verificar si tenemos suficientes cargas para los píxeles restantes
        if (spendableCharges >= pixelsNeeded) {
          maxRepairs = pixelsNeeded;
          log(`🎯 Píxeles restantes: gastando solo ${maxRepairs} píxeles de ${spendableCharges} cargas gastables (${availableCharges} total, ${guardState.minChargesToWait} mínimo)`);
        } else {
          const totalNeeded = guardState.minChargesToWait + pixelsNeeded;
          log(`⚠️ Cargas insuficientes para píxeles restantes: ${availableCharges}/${totalNeeded} (necesita ${pixelsNeeded} + ${guardState.minChargesToWait} mínimo). Esperando más cargas...`);
          if (guardState.ui) {
            guardState.ui.updateStatus(`⏳ Esperando ${totalNeeded} cargas para píxeles restantes (${availableCharges} actuales, mínimo ${guardState.minChargesToWait})`, 'warning');
            
            const chargesNeeded = totalNeeded - availableCharges;
            const timeToWait = chargesNeeded * CHARGE_REGENERATION_TIME;
            _nextChargeTime = Date.now() + timeToWait;
            startCountdownTimer();
          }
          return;
        }
      } else {
        // Lógica normal: verificar si hay cargas suficientes para un lote completo
        // Calcular cargas disponibles para gastar (total - mínimo a mantener)
        const spendableCharges = Math.max(0, availableCharges - guardState.minChargesToWait);
        const requiredCharges = guardState.pixelsPerBatch;
        
          if (spendableCharges < requiredCharges) {
          const totalNeeded = guardState.minChargesToWait + requiredCharges;
          log(`⚠️ Cargas insuficientes para lote completo: ${availableCharges}/${totalNeeded} (necesita ${requiredCharges} + ${guardState.minChargesToWait} mínimo). Esperando más cargas...`);
          if (guardState.ui) {
            guardState.ui.updateStatus(`⏳ Esperando ${totalNeeded} cargas para continuar (${availableCharges} actuales, mínimo ${guardState.minChargesToWait})`, 'warning');
            
            const chargesNeeded = totalNeeded - availableCharges;
            const timeToWait = chargesNeeded * CHARGE_REGENERATION_TIME;
            _nextChargeTime = Date.now() + timeToWait;
            startCountdownTimer();
          }
            try { trackEvent('repair_wait', { botVariant: 'auto-guard', metadata: { available: availableCharges, minToWait: guardState.minChargesToWait, required: requiredCharges } }); } catch {}
          return;
        }
        
        // Si hay cargas suficientes, usar el lote normal configurado
        maxRepairs = Math.min(changesArray.length, guardState.pixelsPerBatch, spendableCharges);
      }
    }
    
    log(`🛠️ Cargas: ${availableCharges}, Mínimo: ${guardState.minChargesToWait}, Reparando: ${maxRepairs} píxeles`);
    
    if (guardState.ui) {
      guardState.ui.updateStatus(`🛠️ Reparando ${maxRepairs} píxeles...`, 'info');
    }
    
    // Seleccionar píxeles usando el patrón configurado con preferencia y exclusión de color
    // Nueva lógica: intentar completar el lote al máximo revalidando hasta 3 veces
    let selectedKeys = getPixelsByPattern(
      guardState.protectionPattern,
      changes,
      maxRepairs,
      guardState.preferColor,
      guardState.preferredColorId,
      guardState.preferredColorIds,
      guardState.excludeColor,
      guardState.excludedColorIds
    );

    let attempts = 0;
    while (selectedKeys.length < maxRepairs && attempts < 3) {
      attempts++;
      // Revalidar contra el mapa de cambios actual por si ha habido variaciones
      // y volver a intentar completar el lote
      selectedKeys = getPixelsByPattern(
        guardState.protectionPattern,
        changes,
        maxRepairs,
        guardState.preferColor,
        guardState.preferredColorId,
        guardState.preferredColorIds,
        guardState.excludeColor,
        guardState.excludedColorIds
      );
      if (selectedKeys.length < maxRepairs) {
        log(`🔁 Reintentando completar lote (${selectedKeys.length}/${maxRepairs}) intento ${attempts}/3`);
        await sleep(100); // breve espera para dar tiempo a cambios concurrentes
      }
    }

    // Concentrar el batch en un único tile para minimizar llamadas a la API
    if (selectedKeys.length > 0) {
      // Agrupar claves seleccionadas por tile
      const tileGroups = new Map(); // tileKey -> array de keys
      for (const key of selectedKeys) {
        const ch = changes.get(key);
        const px = ch?.type === 'intrusion' ? ch?.current : ch?.original;
        if (!px) continue;
        const tkey = `${px.tileX},${px.tileY}`;
        if (!tileGroups.has(tkey)) tileGroups.set(tkey, []);
        tileGroups.get(tkey).push(key);
      }

      if (tileGroups.size > 1) {
        // Elegir el tile con más candidatos
        let bestTileKey = null;
        let bestCount = -1;
        for (const [tkey, keys] of tileGroups) {
          if (keys.length > bestCount) {
            bestCount = keys.length;
            bestTileKey = tkey;
          }
        }

        let finalKeys = tileGroups.get(bestTileKey) || [];

        // Intentar rellenar hasta maxRepairs con más claves del mismo tile
        if (finalKeys.length < maxRepairs) {
          const [bestTileX, bestTileY] = bestTileKey.split(',').map(Number);
          // Construir un mapa filtrado solo con cambios de ese tile
          const filteredChanges = new Map();
          for (const [k, ch] of changes) {
            const pxAny = ch?.type === 'intrusion' ? ch?.current : ch?.original;
            if (pxAny && pxAny.tileX === bestTileX && pxAny.tileY === bestTileY) {
              filteredChanges.set(k, ch);
            }
          }

          // Usar el mismo patrón y preferencias para obtener más candidatos del tile
          if (filteredChanges.size > 0) {
            const tileKeys = getPixelsByPattern(
              guardState.protectionPattern,
              filteredChanges,
              maxRepairs,
              guardState.preferColor,
              guardState.preferredColorId,
              guardState.preferredColorIds,
              guardState.excludeColor,
              guardState.excludedColorIds
            );
            // Añadir los que no estén ya
            const existing = new Set(finalKeys);
            for (const k of tileKeys) {
              if (existing.has(k)) continue;
              finalKeys.push(k);
              existing.add(k);
              if (finalKeys.length >= maxRepairs) break;
            }
          }

          log(`📦 Concentrando lote en tile (${bestTileX},${bestTileY}): ${finalKeys.length}/${maxRepairs} píxeles`);
        }

        // Usar solo las claves del tile objetivo
        selectedKeys = finalKeys;
      }
    }

    const pixelsToRepair = selectedKeys.map(key => changes.get(key));
    
  // Agrupar cambios por tile para eficiencia (tras posible concentración)
  const changesByTile = new Map();
    
    for (const change of pixelsToRepair) {
      let targetPixel, targetColorId;
      
      if (change.type === 'intrusion') {
        // Para intrusiones, usar las coordenadas del píxel actual pero pintar de blanco
        targetPixel = change.current;
        targetColorId = 5; // Blanco para borrar la intrusión
      } else if (change.type === 'erase') {
        // Para borrado, usar las coordenadas del píxel original pero pintar transparente
        targetPixel = change.original;
        targetColorId = 0; // Transparente para borrar
      } else if (change.type === 'transparent_repair') {
        // Para reparar píxeles transparentes, usar coordenadas del píxel original y pintar transparente
        targetPixel = change.original;
        targetColorId = 0; // Restaurar a transparente
      } else if (change.type === 'perimeter_clear') {
        // Para limpiar perímetro, usar coordenadas del píxel actual y pintar transparente
        targetPixel = change.current;
        targetColorId = 0; // Limpiar a transparente
      } else {
        // Para cambios normales, restaurar al color original
        targetPixel = change.original;
        targetColorId = change.original.colorId;
      }
      
      // Log de diagnóstico para verificar coordenadas
      const tX = Number.isFinite(targetPixel?.tileX) ? targetPixel.tileX : Math.floor(targetPixel.globalX / GUARD_DEFAULTS.TILE_SIZE);
      const tY = Number.isFinite(targetPixel?.tileY) ? targetPixel.tileY : Math.floor(targetPixel.globalY / GUARD_DEFAULTS.TILE_SIZE);
      const lXraw = Number.isFinite(targetPixel?.localX) ? targetPixel.localX : (targetPixel.globalX - (tX * GUARD_DEFAULTS.TILE_SIZE));
      const lYraw = Number.isFinite(targetPixel?.localY) ? targetPixel.localY : (targetPixel.globalY - (tY * GUARD_DEFAULTS.TILE_SIZE));
      const lX = ((Number(lXraw) % 1000) + 1000) % 1000;
      const lY = ((Number(lYraw) % 1000) + 1000) % 1000;
      log(`🔧 Reparando píxel en (${targetPixel.globalX}, ${targetPixel.globalY}) tile(${tX}, ${tY}) local(${lX}, ${lY})`);
      
      const tileKey = `${tX},${tY}`;
      
      if (!changesByTile.has(tileKey)) {
        changesByTile.set(tileKey, []);
      }
      
      changesByTile.get(tileKey).push({
        localX: lX,
        localY: lY,
        colorId: targetColorId,
        globalX: targetPixel.globalX,
        globalY: targetPixel.globalY,
        changeType: change.type
      });
    }
    
    let totalRepaired = 0;
    
    // Si hay múltiples tiles, optar por un único tile por batch (el más grande)
    let entries = Array.from(changesByTile.entries());
    if (entries.length > 1) {
      entries.sort((a, b) => b[1].length - a[1].length);
      entries = [entries[0]];
    }

    // Reparar por lote (un solo tile)
    for (const [tileKey, tileChanges] of entries) {
      const [tileX, tileY] = tileKey.split(',').map(Number);
      
      try {
        const coords = [];
        const colors = [];
        
          // Orden determinista: primero por Y luego X (igual que orden top-to-bottom / left-to-right)
          const ordered = [...tileChanges].sort((a,b)=> (a.localY - b.localY) || (a.localX - b.localX));
          for (const change of ordered) {
            coords.push(change.localX, change.localY);
            colors.push(change.colorId);
          }
        
        const result = await paintPixelBatch(tileX, tileY, coords, colors);
        
        if (result.success && result.painted > 0) {
          totalRepaired += result.painted;
          guardState.currentCharges = Math.max(0, guardState.currentCharges - result.painted);
          guardState.totalRepaired += result.painted;
          
          // Remover cambios reparados exitosamente
          for (let i = 0; i < result.painted && i < tileChanges.length; i++) {
            const change = tileChanges[i];
            const key = `${change.globalX},${change.globalY}`;
            guardState.changes.delete(key);
          }
          
          log(`✅ Reparados ${result.painted} píxeles en tile (${tileX},${tileY})`);
          // Métricas: acumular por lote
          try {
            const mcfg = getMetricsConfig({ VARIANT: 'auto-guard' });
            if (mcfg.ENABLED) {
              // Enviar por lote (tile) para granularidad sin saturar
              pixelsRepaired(result.painted, {
                botVariant: 'auto-guard',
                metadata: {
                  tileX, tileY,
                  batchSize: tileChanges.length,
                  pendingAfter: guardState.changes.size
                }
              });
            }
          } catch {}
        } else {
          log(`❌ Error reparando tile (${tileX},${tileY}):`, result.error);
          try {
            const mcfg = getMetricsConfig();
            if (mcfg.ENABLED && result.error) {
              reportError(`repair tile ${tileX},${tileY}: ${result.error}`, {
                botVariant: 'auto-guard'
              });
            }
          } catch {}
        }
      } catch (error) {
        log(`❌ Error reparando tile (${tileX},${tileY}):`, error);
        try {
          const mcfg = getMetricsConfig();
          if (mcfg.ENABLED && error?.message) {
            reportError(`exception tile ${tileX},${tileY}: ${error.message}`, {
              botVariant: 'auto-guard'
            });
          }
        } catch {}
      }
      
      // Delay entre tiles si hay múltiples
      if (changesByTile.size > 1) {
        if (guardState.randomWaitTime) {
          // Tiempo aleatorio entre lotes
          const randomDelay = Math.random() * (guardState.randomWaitMax - guardState.randomWaitMin) + guardState.randomWaitMin;
          log(`⏰ Esperando ${randomDelay.toFixed(1)} segundos (aleatorio) antes del siguiente lote`);
          await sleep(randomDelay * 1000);
        } else {
          await sleep(500);
        }
      }
    }
    
  const remainingCharges = Math.floor(guardState.currentCharges);
  const pendingChanges = guardState.changes.size;
    
    log(`🛠️ Reparación completada: ${totalRepaired} píxeles reparados, ${remainingCharges} cargas restantes`);
    
    if (guardState.ui) {
      if (pendingChanges > 0 && remainingCharges < guardState.minChargesToWait) {
        guardState.ui.updateStatus(`⏳ Esperando ${guardState.minChargesToWait} cargas para continuar (${remainingCharges} actuales)`, 'warning');
        
        // Calcular tiempo estimado para alcanzar el mínimo de cargas
        const chargesNeeded = guardState.minChargesToWait - remainingCharges;
        const timeToWait = chargesNeeded * CHARGE_REGENERATION_TIME;
        _nextChargeTime = Date.now() + timeToWait;
        
        // Iniciar contador de tiempo
        startCountdownTimer();
      } else {
        guardState.ui.updateStatus(`✅ Reparados ${totalRepaired} píxeles correctamente`, 'success');
        stopCountdownTimer();
      }
      
      guardState.ui.updateStats({
        charges: remainingCharges,
        repaired: guardState.totalRepaired,
        pending: pendingChanges
      });
    }
    
    // Aplicar delay aleatorio entre batches si está configurado
    if (guardState.randomWaitTime && pendingChanges > 0 && remainingCharges >= guardState.minChargesToWait) {
      const randomDelay = Math.random() * (guardState.randomWaitMax - guardState.randomWaitMin) + guardState.randomWaitMin;
      log(`⏰ Esperando ${randomDelay.toFixed(1)} segundos (aleatorio) antes del siguiente batch`);
      await sleep(randomDelay * 1000);
    }
    
  } catch (error) {
    log(`❌ Error en reparación: ${error.message}`);
  } finally {
    _isRepairing = false;
  }
}

// Debounce simple para resumen de análisis
let _analysisDebounceId = null;
function debouncedAnalysisSummary({ total, incorrect, missing }) {
  if (_analysisDebounceId) {
    clearTimeout(_analysisDebounceId);
  }
  _analysisDebounceId = setTimeout(() => {
    try {
      trackEvent('analysis_summary', {
        botVariant: 'auto-guard',
        metadata: { total, incorrect, missing }
      });
    } catch {}
  }, 1500);
}

// Pintar múltiples píxeles en un solo tile
async function paintPixelBatch(tileX, tileY, coords, colors) {
  try {
    // Reutilizar token de turnstile si está cacheado (no forzar nuevo)
    let token = getCachedToken();
    if (!token) token = await ensureToken();

    // Sanitizar coordenadas (igual que image/painter.js)
    const sanitized = [];
    for (let i = 0; i < coords.length; i += 2) {
      const x = ((Number(coords[i]) % 1000) + 1000) % 1000;
      const y = ((Number(coords[i + 1]) % 1000) + 1000) % 1000;
      if (Number.isFinite(x) && Number.isFinite(y)) sanitized.push(x, y);
    }

    const previewPairs = sanitized.slice(0, 6).join(',');
    log(`[API] Enviando lote a tile ${tileX},${tileY} con ${colors.length} píxeles. Ejemplo coords: ${previewPairs}`);

    // Llamar a la misma API que usa el bot de imagen (garantiza mismo body y cabeceras)
    const resp = await postPixelBatchImage(tileX, tileY, sanitized, colors, token);

    return {
      success: resp.success,
      painted: resp.painted || 0,
      status: resp.status,
      error: resp.success ? null : (resp.json?.error || resp.json?.message || `HTTP ${resp.status}`)
    };
  } catch (error) {
    return { success: false, painted: 0, error: error.message };
  }
}