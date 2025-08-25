import { log } from "../core/logger.js";
import { postPixelBatchImage, getSession } from "../core/wplace-api.js";
import { ensureToken } from "../core/turnstile.js";
import { guardState, GUARD_DEFAULTS } from "./config.js";
import { sleep } from "../core/timing.js";
import { getPixelsByPattern } from "./patterns.js";

// Variables para monitoreo de cargas
let chargeMonitorInterval = null;
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
 * Inicia el monitoreo periódico de cargas
 */
export function startChargeMonitoring() {
  if (chargeMonitorInterval) {
    log('🔄 Monitoreo de cargas ya está activo');
    return;
  }

  log('🔄 Iniciando monitoreo de cargas cada 30 segundos...');
  
  chargeMonitorInterval = window.setInterval(async () => {
    try {
      // Actualizar cargas en tiempo real
      const sessionResult = await getSession();
      
      if (sessionResult.success) {
        const availableCharges = Math.floor(sessionResult.data.charges);
        
        // Actualizar estado de cargas
        guardState.currentCharges = sessionResult.data.charges;
        guardState.maxCharges = sessionResult.data.maxCharges;
        
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
 * Detener monitoreo de cargas
 */
export function stopChargeMonitoring() {
  if (chargeMonitorInterval) {
    window.clearInterval(chargeMonitorInterval);
    chargeMonitorInterval = null;
    log('🔄 Monitoreo de cargas detenido');
  }
  
  // También detener el contador
  stopCountdownTimer();
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

function rgbToLab(r, g, b) {
  const xyz = rgbToXyz(r, g, b);
  return xyzToLab(xyz.x, xyz.y, xyz.z);
}

// Función para calcular diferencia Delta E en espacio LAB
function calculateDeltaE(lab1, lab2) {
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;
  
  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

// Función para comparar colores usando diferentes métodos
function compareColors(color1, color2, method = 'rgb', threshold = 10) {
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

  for (const element of colorElements) {
    if (element.querySelector("svg")) continue;
    
    const colorId = parseInt(element.id.replace("color-", ""));
    if (colorId === 0) continue; // Evitar solo el color transparente (ID 0)
    
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

  log(`✅ ${colors.length} colores detectados`);
  return colors;
}

// Encontrar el color más cercano disponible
export function findClosestColor(r, g, b, availableColors) {
  let minDistance = Infinity;
  let closestColor = null;

  for (const color of availableColors) {
    const distance = Math.sqrt(
      Math.pow(r - color.r, 2) +
      Math.pow(g - color.g, 2) +
      Math.pow(b - color.b, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
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
                
                if (a > 0) { // Píxel visible
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
      
      // Iniciar reparación automática si está habilitada
      if (guardState.running) {
        await repairChanges(changes);
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
  
  // Si no hay cargas suficientes para reparar ni un píxel, esperar
  if (availableCharges === 0) {
    log(`⚠️ Sin cargas disponibles, esperando recarga...`);
    if (guardState.ui) {
      guardState.ui.updateStatus('⚡ Esperando cargas para reparar...', 'warning');
    }
    return;
  }

  // Si hay daños pero menos cargas que el mínimo configurado, gastar todas las disponibles
  const shouldRepairAll = availableCharges < guardState.minChargesToWait;
  const maxRepairs = shouldRepairAll 
    ? availableCharges  // Gastar todas las cargas disponibles
    : Math.min(changesArray.length, guardState.pixelsPerBatch); // Usar lote normal
  
  log(`🛠️ Cargas: ${availableCharges}, Mínimo: ${guardState.minChargesToWait}, Reparando: ${maxRepairs} píxeles`);
  
  if (guardState.ui) {
    const repairMode = shouldRepairAll ? " (gastando todas las cargas)" : "";
    guardState.ui.updateStatus(`🛠️ Reparando ${maxRepairs} píxeles${repairMode}...`, 'info');
  }
  
  // Seleccionar píxeles usando el patrón configurado
  const changeKeys = Array.from(changes.keys());
  const selectedKeys = getPixelsByPattern(guardState.protectionPattern, new Set(changeKeys), maxRepairs);
  const pixelsToRepair = selectedKeys.map(key => changes.get(key));
  
  // Agrupar cambios por tile para eficiencia
  const changesByTile = new Map();
  
  for (const change of pixelsToRepair) {
    let targetPixel, targetColorId;
    
    if (change.type === 'intrusion') {
      // Para intrusiones, usar las coordenadas del píxel actual pero pintar de blanco
      targetPixel = change.current;
      targetColorId = 5; // Blanco para borrar la intrusión
    } else {
      // Para cambios normales, restaurar al color original
      targetPixel = change.original;
      targetColorId = change.original.colorId;
    }
    
    const tileKey = `${targetPixel.tileX},${targetPixel.tileY}`;
    
    if (!changesByTile.has(tileKey)) {
      changesByTile.set(tileKey, []);
    }
    
    changesByTile.get(tileKey).push({
      localX: targetPixel.localX,
      localY: targetPixel.localY,
      colorId: targetColorId,
      globalX: targetPixel.globalX,
      globalY: targetPixel.globalY,
      changeType: change.type
    });
  }
  
  let totalRepaired = 0;
  
  // Reparar por lotes de tile
  for (const [tileKey, tileChanges] of changesByTile) {
    const [tileX, tileY] = tileKey.split(',').map(Number);
    
    try {
      const coords = [];
      const colors = [];
      
      for (const change of tileChanges) {
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
      } else {
        log(`❌ Error reparando tile (${tileX},${tileY}):`, result.error);
      }
      
    } catch (error) {
      log(`❌ Error reparando tile (${tileX},${tileY}):`, error);
    }
    
    // Pausa entre tiles para evitar rate limiting
    if (changesByTile.size > 1) {
      await sleep(500);
    }
  }
  
  const remainingCharges = Math.floor(guardState.currentCharges);
  const remainingChanges = guardState.changes.size;
  
  log(`🛠️ Reparación completada: ${totalRepaired} píxeles reparados, ${remainingCharges} cargas restantes`);
  
  if (guardState.ui) {
    if (remainingChanges > 0 && remainingCharges < guardState.minChargesToWait) {
      guardState.ui.updateStatus(`⏳ Esperando ${guardState.minChargesToWait} cargas para continuar (${remainingCharges} actuales)`, 'warning');
      
      // Calcular tiempo estimado para la próxima carga
      const chargesNeeded = guardState.minChargesToWait - remainingCharges;
      const timeToWait = chargesNeeded * CHARGE_REGENERATION_TIME;
      _nextChargeTime = Date.now() + timeToWait;
      
      // Iniciar contador de tiempo
      startCountdownTimer();
    } else {
      guardState.ui.updateStatus(`✅ Reparados ${totalRepaired} píxeles correctamente`, 'success');
      
      // Detener contador si está activo
      stopCountdownTimer();
    }
    
    guardState.ui.updateStats({
      charges: remainingCharges,
      repaired: guardState.totalRepaired,
      pending: remainingChanges
    });
  }
  
  } catch (error) {
    log(`❌ Error en reparación: ${error.message}`);
  } finally {
    _isRepairing = false;
  }
}

// Pintar múltiples píxeles en un solo tile
async function paintPixelBatch(tileX, tileY, coords, colors) {
  try {
    const token = await ensureToken();

    // Sanitizar coordenadas a rango 0..999
    const sanitizedCoords = [];
    for (let i = 0; i < coords.length; i += 2) {
      const x = ((Number(coords[i]) % 1000) + 1000) % 1000;
      const y = ((Number(coords[i + 1]) % 1000) + 1000) % 1000;
      sanitizedCoords.push(x, y);
    }

    // Log de diagnóstico (muestra hasta 3 pares)
    const previewPairs = sanitizedCoords.slice(0, 6).join(',');
    log(`[API] Enviando lote a tile ${tileX},${tileY} con ${colors.length} píxeles. Ejemplo coords: ${previewPairs}`);

    const response = await postPixelBatchImage(
      tileX,
      tileY,
      sanitizedCoords,
      colors,
      token
    );

    const painted = (typeof response.painted === 'number')
      ? response.painted
      : (typeof response.json?.painted === 'number' ? response.json.painted : 0);

    return {
      success: response.success,
      painted: painted,
      status: response.status,
      error: response.success ? null : (response.json?.message || response.json?.error || 'Error desconocido')
    };
  } catch (error) {
    return {
      success: false,
      painted: 0,
      error: error.message
    };
  }
}

// Pintar un píxel individual

