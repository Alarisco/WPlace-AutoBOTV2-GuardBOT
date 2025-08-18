import { log } from "../core/logger.js";
import { postPixelBatchImage } from "../core/wplace-api.js";
import { getTurnstileToken } from "../core/turnstile.js";
import { guardState, GUARD_DEFAULTS } from "./config.js";
import { sleep } from "../core/timing.js";

// Globals del navegador
const { Image, URL, setTimeout } = window;

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
  
  if (width * height > GUARD_DEFAULTS.MAX_PROTECTION_SIZE) {
    throw new Error(`Área demasiado grande: ${width * height} píxeles (máximo: ${GUARD_DEFAULTS.MAX_PROTECTION_SIZE})`);
  }

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

// Reparar los cambios detectados
export async function repairChanges(changes) {
  if (!guardState.currentCharges || changes.size === 0) {
    log(`⚠️ No hay cargas suficientes para reparar ${changes.size} cambios`);
    return;
  }

  const changesArray = Array.from(changes.values());
  const batchSize = Math.min(GUARD_DEFAULTS.PIXELS_PER_BATCH, guardState.currentCharges, changesArray.length);
  
  log(`🛠️ Reparando ${batchSize} de ${changesArray.length} cambios...`);
  
  let repairedCount = 0;
  
  for (let i = 0; i < batchSize; i++) {
    const change = changesArray[i];
    const original = change.original;
    
    try {
      const result = await paintPixel(
        original.tileX,
        original.tileY,
        original.localX,
        original.localY,
        original.colorId
      );
      
      if (result.success) {
        repairedCount++;
        guardState.currentCharges = Math.max(0, guardState.currentCharges - 1);
        guardState.totalRepaired++;
        
        // Remover cambio reparado
        const key = `${original.globalX},${original.globalY}`;
        guardState.changes.delete(key);
        
        log(`✅ Reparado píxel (${original.globalX},${original.globalY})`);
      } else {
        log(`❌ Error reparando píxel:`, result.error);
      }
      
      // Pausa entre píxeles para evitar rate limiting
      await sleep(100);
      
    } catch (error) {
      log(`❌ Error reparando píxel:`, error);
    }
  }
  
  log(`🛠️ Reparación completada: ${repairedCount}/${batchSize} píxeles`);
  
  if (guardState.ui) {
    guardState.ui.updateStatus(`🛠️ Reparados ${repairedCount} píxeles`, 'success');
    guardState.ui.updateStats({
      charges: Math.floor(guardState.currentCharges),
      repaired: guardState.totalRepaired,
      pending: guardState.changes.size
    });
  }
  
  // Si quedan cambios y cargas, programar siguiente reparación
  if (guardState.changes.size > 0 && guardState.currentCharges > 0) {
    setTimeout(() => {
      if (guardState.running) {
        repairChanges(guardState.changes);
      }
    }, 5000);
  }
}

// Pintar un píxel individual
async function paintPixel(tileX, tileY, localX, localY, colorId) {
  try {
    const token = await getTurnstileToken(GUARD_DEFAULTS.SITEKEY);
    
    const response = await postPixelBatchImage(
      tileX, 
      tileY, 
      [localX, localY], 
      [colorId], 
      token
    );
    
    return {
      success: response.success,
      painted: response.painted,
      status: response.status
    };
  } catch (error) {
    return {
      success: false,
      painted: 0,
      error: error.message
    };
  }
}
