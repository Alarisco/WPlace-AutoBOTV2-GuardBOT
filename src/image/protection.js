import { log } from "../core/logger.js";
import { postPixelBatchImage } from "../core/wplace-api.js";
import { ensureToken } from "../core/turnstile.js";
import { imageState } from "./config.js";
import { sleep } from "../core/timing.js";

// Globals del navegador
const { Image, URL } = window;

/**
 * Obtener imagen de tile desde la API
 */
export async function getTileImage(tileX, tileY) {
  try {
    const url = `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`;
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

/**
 * Encontrar el color más cercano disponible
 */
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

/**
 * Analizar píxeles pintados para crear un mapa de protección
 */
export async function analyzeDrawnPixels(paintedPixelsList) {
  if (!paintedPixelsList || paintedPixelsList.length === 0) {
    return new Map();
  }

  log(`🔍 Analizando ${paintedPixelsList.length} píxeles pintados para protección`);
  
  const pixelMap = new Map();
  const tileMap = new Map(); // Agrupar píxeles por tile para optimizar requests

  // Agrupar píxeles por tile
  for (const pixel of paintedPixelsList) {
    const tileKey = `${pixel.tileX},${pixel.tileY}`;
    if (!tileMap.has(tileKey)) {
      tileMap.set(tileKey, []);
    }
    tileMap.get(tileKey).push(pixel);
  }

  // Analizar cada tile
  for (const [tileKey, tilePixels] of tileMap) {
    const [tileX, tileY] = tileKey.split(',').map(Number);
    
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

      // Verificar cada píxel pintado en este tile
      for (const pixel of tilePixels) {
        const { localX, localY } = pixel;
        
        if (localX >= 0 && localX < canvas.width && 
            localY >= 0 && localY < canvas.height) {
          
          const pixelIndex = (localY * canvas.width + localX) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          const a = data[pixelIndex + 3];
          
          if (a > 0) { // Píxel visible
            const currentColor = findClosestColor(r, g, b, imageState.availableColors);
            
            pixelMap.set(`${pixel.imageX},${pixel.imageY}`, {
              imageX: pixel.imageX,
              imageY: pixel.imageY,
              localX: pixel.localX,
              localY: pixel.localY,
              tileX: pixel.tileX,
              tileY: pixel.tileY,
              expectedColor: pixel.color,
              currentColor: currentColor,
              currentRGB: { r, g, b },
              isCorrect: currentColor && currentColor.id === pixel.color.id
            });
          }
        }
      }

      URL.revokeObjectURL(img.src);
    } catch (error) {
      log(`❌ Error analizando tile ${tileX},${tileY}:`, error);
    }
  }

  log(`✅ Análisis completado: ${pixelMap.size} píxeles analizados`);
  return pixelMap;
}

/**
 * Detectar cambios en píxeles ya pintados
 * Compara contra los colores originales aplicados por el bot
 */
export async function detectChangesInDrawnArea(paintedPixelsList) {
  if (!paintedPixelsList || paintedPixelsList.length === 0) {
    return [];
  }

  log(`🔍 Verificando ${paintedPixelsList.length} píxeles pintados para detectar cambios`);
  
  const changes = [];
  const tileMap = new Map(); // Agrupar píxeles por tile para optimizar requests

  // Agrupar píxeles por tile
  for (const pixel of paintedPixelsList) {
    const tileKey = `${pixel.tileX},${pixel.tileY}`;
    if (!tileMap.has(tileKey)) {
      tileMap.set(tileKey, []);
    }
    tileMap.get(tileKey).push(pixel);
  }

  // Analizar cada tile
  for (const [tileKey, tilePixels] of tileMap) {
    const [tileX, tileY] = tileKey.split(',').map(Number);
    
    try {
      const tileBlob = await getTileImage(tileX, tileY);
      if (!tileBlob) {
        log(`⚠️ No se pudo obtener tile ${tileX},${tileY} para verificación de protección`);
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

      // Verificar cada píxel pintado en este tile
      for (const pixel of tilePixels) {
        const { localX, localY } = pixel;
        
        if (localX >= 0 && localX < canvas.width && 
            localY >= 0 && localY < canvas.height) {
          
          const pixelIndex = (localY * canvas.width + localX) * 4;
          const currentR = data[pixelIndex];
          const currentG = data[pixelIndex + 1];
          const currentB = data[pixelIndex + 2];
          const currentA = data[pixelIndex + 3];
          
          if (currentA > 0) { // Píxel visible
            // Comparar directamente con el color original aplicado por el bot
            const originalColor = pixel.color;
            const tolerance = 5; // Tolerancia para pequeñas diferencias de compresión
            
            const isOriginalColor = 
              Math.abs(currentR - originalColor.r) <= tolerance &&
              Math.abs(currentG - originalColor.g) <= tolerance &&
              Math.abs(currentB - originalColor.b) <= tolerance;
            
            if (!isOriginalColor) {
              // El píxel ha sido alterado - debe restaurarse al color original
              changes.push({
                imageX: pixel.imageX,
                imageY: pixel.imageY,
                localX: pixel.localX,
                localY: pixel.localY,
                tileX: pixel.tileX,
                tileY: pixel.tileY,
                originalColor: pixel.color, // Color que el bot aplicó originalmente
                currentRGB: { r: currentR, g: currentG, b: currentB },
                paintedAt: pixel.paintedAt || Date.now()
              });
              
              log(`🚨 Píxel alterado detectado: (${localX},${localY}) en tile (${tileX},${tileY}) - Original: RGB(${originalColor.r},${originalColor.g},${originalColor.b}) vs Actual: RGB(${currentR},${currentG},${currentB})`);
            }
          }
        }
      }

      URL.revokeObjectURL(img.src);
    } catch (error) {
      log(`❌ Error analizando tile ${tileX},${tileY} para protección:`, error);
    }
  }

  if (changes.length > 0) {
    log(`🚨 Detectados ${changes.length} píxeles alterados que necesitan restauración a sus colores originales`);
  } else {
    log(`✅ Todos los píxeles pintados mantienen sus colores originales`);
  }

  return changes;
}

/**
 * Reparar píxeles alterados con prioridad sobre el pintado normal
 */
export async function repairChangedPixels(changedPixels, onProgress) {
  if (!changedPixels || changedPixels.length === 0) {
    return { success: true, repaired: 0 };
  }

  const availableCharges = Math.floor(imageState.currentCharges);
  
  if (availableCharges === 0) {
    log(`⚠️ Sin cargas disponibles para reparar, esperando recarga...`);
    if (onProgress) {
      onProgress(imageState.paintedPixels, imageState.totalPixels, 
        "⚡ Sin cargas para reparar píxeles alterados, esperando...");
    }
    return { success: false, repaired: 0, reason: 'no_charges' };
  }

  // Prioridad de protección: usar todas las cargas disponibles si es necesario
  const maxRepairs = Math.min(changedPixels.length, availableCharges);
  const pixelsToRepair = changedPixels.slice(0, maxRepairs);

  log(`🛠️ Reparando ${pixelsToRepair.length} píxeles alterados (cargas: ${availableCharges})`);
  
  if (onProgress) {
    onProgress(imageState.paintedPixels, imageState.totalPixels, 
      `🛡️ Protegiendo dibujo: reparando ${pixelsToRepair.length} píxeles alterados...`);
  }

  // Agrupar por tile para eficiencia
  const changesByTile = new Map();
  
  for (const change of pixelsToRepair) {
    const tileKey = `${change.tileX},${change.tileY}`;
    
    if (!changesByTile.has(tileKey)) {
      changesByTile.set(tileKey, []);
    }
    
    changesByTile.get(tileKey).push(change);
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
        colors.push(change.originalColor.id); // Usar el color original aplicado por el bot
      }
      
      const result = await repairPixelBatch(tileX, tileY, coords, colors);
      
      if (result.success && result.painted > 0) {
        totalRepaired += result.painted;
        imageState.currentCharges = Math.max(0, imageState.currentCharges - result.painted);
        
        log(`✅ Reparados ${result.painted} píxeles en tile (${tileX},${tileY})`);
      } else {
        log(`❌ Error reparando tile (${tileX},${tileY}):`, result.error);
      }
      
    } catch (error) {
      log(`❌ Error reparando tile (${tileX},${tileY}):`, error);
    }
    
    // Pausa entre tiles para evitar rate limiting
    if (changesByTile.size > 1) {
      await sleep(300);
    }
  }

  const remainingCharges = Math.floor(imageState.currentCharges);
  log(`🛡️ Protección completada: ${totalRepaired} píxeles reparados, ${remainingCharges} cargas restantes`);
  
  if (onProgress && totalRepaired > 0) {
    onProgress(imageState.paintedPixels, imageState.totalPixels, 
      `✅ Dibujo protegido: ${totalRepaired} píxeles reparados`);
  }

  return { 
    success: totalRepaired > 0, 
    repaired: totalRepaired, 
    remainingCharges 
  };
}

/**
 * Pintar múltiples píxeles en un solo tile (función específica para reparación)
 */
async function repairPixelBatch(tileX, tileY, coords, colors) {
  try {
    // Generate token for protection painting
    const token = await ensureToken();
    
    // Sanitizar coordenadas para asegurar que están en rango 0-999
    const sanitizedCoords = [];
    for (let i = 0; i < coords.length; i += 2) {
      const x = ((Number(coords[i]) % 1000) + 1000) % 1000;
      const y = ((Number(coords[i + 1]) % 1000) + 1000) % 1000;
      if (Number.isFinite(x) && Number.isFinite(y)) {
        sanitizedCoords.push(x, y);
      }
    }
    
    const response = await postPixelBatchImage(
      tileX, 
      tileY, 
      sanitizedCoords, 
      colors, 
      token
    );
    
    return {
      success: response.status === 200,
      painted: response.painted || 0,
      status: response.status,
      error: response.status === 200 ? null : (response.json?.message || 'Error desconocido')
    };
  } catch (error) {
    return {
      success: false,
      painted: 0,
      error: error.message
    };
  }
}

/**
 * Obtener lista de píxeles ya pintados desde el estado actual
 */
export function getPaintedPixelsList() {
  // Usar directamente el mapa de píxeles dibujados que se llena al pintar
  return Array.from(imageState.drawnPixelsMap.values());
}

/**
 * Verificar y proteger área antes de pintar el siguiente lote
 */
export async function protectBeforeNextBatch(onProgress) {
  const paintedPixels = getPaintedPixelsList();
  
  // No proteger si no hay píxeles realmente pintados
  if (paintedPixels.length === 0) {
    return { needsProtection: false, canContinue: true };
  }

  if (onProgress) {
    onProgress(imageState.paintedPixels, imageState.totalPixels, 
      "🔍 Verificando integridad del dibujo...");
  }

  const changes = await detectChangesInDrawnArea(paintedPixels);
  
  if (changes.length === 0) {
    return { needsProtection: false, canContinue: true };
  }

  log(`🚨 Se detectaron ${changes.length} píxeles alterados de ${paintedPixels.length} píxeles pintados`);

  // Se detectaron cambios, intentar reparar
  const repairResult = await repairChangedPixels(changes, onProgress);
  
  if (!repairResult.success) {
    if (repairResult.reason === 'no_charges') {
      // Sin cargas para reparar, necesita esperar
      return { 
        needsProtection: true, 
        canContinue: false, 
        reason: 'no_charges_for_protection',
        changesCount: changes.length 
      };
    }
    // Otros errores, puede continuar pero con advertencia
    return { 
      needsProtection: true, 
      canContinue: true, 
      reason: 'protection_failed',
      changesCount: changes.length 
    };
  }

  // Reparación exitosa
  return { 
    needsProtection: true, 
    canContinue: true, 
    reason: 'protection_completed',
    repairedCount: repairResult.repaired,
    remainingCharges: repairResult.remainingCharges
  };
}
