import { log } from "../core/logger.js";
import { postPixelBatchImage } from "../core/wplace-api.js";
import { getTurnstileToken } from "../core/turnstile.js";
import { guardState, GUARD_DEFAULTS } from "./config.js";
import { sleep } from "../core/timing.js";

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
    if (colorId === 0 || colorId === 5) continue; // Evitar colores especiales
    
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
export async function analyzeAreaPixels(area) {
  const { x1, y1, x2, y2 } = area;
  const width = x2 - x1;
  const height = y2 - y1;

  log(`🔍 Analizando área ${width}x${height} desde (${x1},${y1}) hasta (${x2},${y2})`);
  
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
        const tileEndX = tileStartX + GUARD_DEFAULTS.TILE_SIZE;
        const tileEndY = tileStartY + GUARD_DEFAULTS.TILE_SIZE;
        
        // Calcular intersección del área con este tile
        const analyzeStartX = Math.max(x1, tileStartX);
        const analyzeStartY = Math.max(y1, tileStartY);
        const analyzeEndX = Math.min(x2, tileEndX);
        const analyzeEndY = Math.min(y2, tileEndY);
        
        for (let globalY = analyzeStartY; globalY < analyzeEndY; globalY++) {
          for (let globalX = analyzeStartX; globalX < analyzeEndX; globalX++) {
            const localX = globalX - tileStartX;
            const localY = globalY - tileStartY;
            
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
  
  // Si no encontramos píxeles, crear píxeles "virtuales" para el área seleccionada
  if (pixelMap.size === 0) {
    log(`⚠️ No se encontraron píxeles existentes, creando área virtual para protección`);
    
    // Crear entradas virtuales para cada píxel del área
    for (let globalY = y1; globalY < y2; globalY++) {
      for (let globalX = x1; globalX < x2; globalX++) {
        const tileX = Math.floor(globalX / GUARD_DEFAULTS.TILE_SIZE);
        const tileY = Math.floor(globalY / GUARD_DEFAULTS.TILE_SIZE);
        const localX = globalX - (tileX * GUARD_DEFAULTS.TILE_SIZE);
        const localY = globalY - (tileY * GUARD_DEFAULTS.TILE_SIZE);
        
        // Usar color blanco por defecto (ID 1) para píxeles vacíos
        pixelMap.set(`${globalX},${globalY}`, {
          r: 255, g: 255, b: 255, // Blanco por defecto
          colorId: 1, // ID del color blanco
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
  }
  
  return pixelMap;
}

// Detectar cambios en el área protegida
export async function checkForChanges() {
  if (!guardState.protectionArea || !guardState.originalPixels.size) {
    return;
  }

  try {
    const currentPixels = await analyzeAreaPixels(guardState.protectionArea);
    const changes = new Map();
    let changedCount = 0;

    // Comparar píxeles originales vs actuales
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
      } else if (currentPixel.colorId !== originalPixel.colorId) {
        // Píxel cambió de color
        changes.set(key, {
          timestamp: Date.now(),
          type: 'changed',
          original: originalPixel,
          current: currentPixel
        });
        changedCount++;
      }
    }

    if (changedCount > 0) {
      log(`🚨 Detectados ${changedCount} cambios en el área protegida`);
      guardState.changes = changes;
      
      // Actualizar UI
      if (guardState.ui) {
        guardState.ui.updateStatus(`🚨 ${changedCount} cambios detectados`, 'warning');
        guardState.ui.updateProgress(changes.size, guardState.originalPixels.size);
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
  
  // Procesar píxeles en lotes más pequeños para mejor rendimiento
  const pixelsToRepair = changesArray.slice(0, maxRepairs);
  
  // Agrupar cambios por tile para eficiencia
  const changesByTile = new Map();
  
  for (const change of pixelsToRepair) {
    const original = change.original;
    const tileKey = `${original.tileX},${original.tileY}`;
    
    if (!changesByTile.has(tileKey)) {
      changesByTile.set(tileKey, []);
    }
    
    changesByTile.get(tileKey).push({
      localX: original.localX,
      localY: original.localY,
      colorId: original.colorId,
      globalX: original.globalX,
      globalY: original.globalY
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
    } else {
      guardState.ui.updateStatus(`✅ Reparados ${totalRepaired} píxeles correctamente`, 'success');
    }
    
    guardState.ui.updateStats({
      charges: remainingCharges,
      repaired: guardState.totalRepaired,
      pending: remainingChanges
    });
  }
}

// Pintar múltiples píxeles en un solo tile
async function paintPixelBatch(tileX, tileY, coords, colors) {
  try {
    const token = await getTurnstileToken(GUARD_DEFAULTS.SITEKEY);
    
    const response = await postPixelBatchImage(
      tileX, 
      tileY, 
      coords, 
      colors, 
      token
    );
    
    return {
      success: response.success,
      painted: response.painted,
      status: response.status,
      error: response.success ? null : (response.json?.message || 'Error desconocido')
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

