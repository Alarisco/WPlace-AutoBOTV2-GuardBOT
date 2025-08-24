import { log } from "../core/logger.js";
import { sleep } from "../core/timing.js";
import { postPixelBatchImage, getSession } from "../core/wplace-api.js";
import { ensureToken } from "../core/turnstile.js";
import { imageState, IMAGE_DEFAULTS } from "./config.js";
import { t } from "../locales/index.js";
import { protectBeforeNextBatch } from "./protection.js";
import { applyPaintPattern } from "./patterns.js";

// Variables para monitoreo de cargas
let chargeMonitorInterval = null;
let _lastChargeCheck = 0;
const CHARGE_CHECK_INTERVAL = 10000; // 10 segundos

/**
 * Monitorear cargas periódicamente y continuar pintando si hay píxeles pendientes
 */
async function startChargeMonitoring() {
  if (chargeMonitorInterval) {
    window.clearInterval(chargeMonitorInterval);
  }
  
  chargeMonitorInterval = window.setInterval(async () => {
    try {
      // Solo verificar si hay píxeles pendientes y no estamos pintando activamente
      if (imageState.remainingPixels.length > 0 && !imageState.running) {
        const sessionResult = await getSession();
        
        if (sessionResult.success && sessionResult.data.charges > 0) {
          const availableCharges = Math.floor(sessionResult.data.charges);
          log(`🔄 Cargas detectadas: ${availableCharges}. Continuando pintado automáticamente...`);
          
          // Actualizar estado de cargas
          imageState.currentCharges = sessionResult.data.charges;
          imageState.maxCharges = sessionResult.data.maxCharges;
          
          // Reanudar pintado automáticamente
          if (window.imageBot && typeof window.imageBot.onStartPainting === 'function') {
            window.imageBot.onStartPainting();
          }
        }
      }
    } catch (error) {
      log(`Error en monitoreo de cargas: ${error.message}`);
    }
  }, CHARGE_CHECK_INTERVAL);
  
  log(`✅ Monitoreo de cargas iniciado (cada ${CHARGE_CHECK_INTERVAL/1000}s)`);
}

/**
 * Detener monitoreo de cargas
 */
function stopChargeMonitoring() {
  if (chargeMonitorInterval) {
    window.clearInterval(chargeMonitorInterval);
    chargeMonitorInterval = null;
    log(`⏹️ Monitoreo de cargas detenido`);
  }
}

/**
 * Verificar cargas antes de cada lote y esperar si es necesario
 */
async function ensureSufficientCharges(requiredCharges, onProgress) {
  const sessionResult = await getSession();
  
  if (sessionResult.success) {
    const availableCharges = Math.floor(sessionResult.data.charges);
    imageState.currentCharges = sessionResult.data.charges;
    imageState.maxCharges = sessionResult.data.maxCharges;
    
    if (availableCharges < requiredCharges) {
      log(`⏳ Cargas insuficientes: ${availableCharges}/${requiredCharges}. Esperando...`);
      await waitForCooldown(requiredCharges - availableCharges, onProgress);
      
      // Verificar nuevamente después del cooldown
      return await ensureSufficientCharges(requiredCharges, onProgress);
    }
    
    return true;
  }
  
  log(`⚠️ No se pudo verificar cargas, continuando con valor cached: ${imageState.currentCharges}`);
  return imageState.currentCharges >= requiredCharges;
}

/**
 * Obtener imagen de tile desde la API para verificación de píxeles
 */
async function getTileImageForVerification(tileX, tileY) {
  try {
    const url = `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.blob();
  } catch (error) {
    log(`Error obteniendo tile para verificación ${tileX},${tileY}:`, error);
    return null;
  }
}



/**
 * Filtrar píxeles que ya tienen el color correcto (verificación inteligente)
 * Implementa llenado recursivo para mantener el tamaño del lote configurado
 */
async function filterPixelsThatNeedPainting(initialBatch, targetBatchSize = null) {
  const desiredBatchSize = targetBatchSize || initialBatch.length;
  let currentBatch = [...initialBatch];
  let filteredBatch = [];
  let totalSkippedCount = 0;
  let iterations = 0;
  const maxIterations = 3; // Evitar bucles infinitos (máximo 3 iteraciones)
  
  log(`🔍 Iniciando verificación inteligente para lote de ${desiredBatchSize} píxeles`);
  
  while (filteredBatch.length < desiredBatchSize && currentBatch.length > 0 && iterations < maxIterations) {
    iterations++;
    log(`🔄 Iteración ${iterations}: verificando ${currentBatch.length} píxeles`);
    
    const verificationResult = await verifyPixelBatch(currentBatch);
    const newValidPixels = verificationResult.filteredBatch;
    const skippedInThisIteration = verificationResult.skippedCount;
    
    // Agregar píxeles válidos al lote final
    filteredBatch.push(...newValidPixels);
    totalSkippedCount += skippedInThisIteration;
    
    log(`✅ Iteración ${iterations}: ${newValidPixels.length} píxeles válidos, ${skippedInThisIteration} omitidos`);
    
    // Si ya tenemos suficientes píxeles, terminar
    if (filteredBatch.length >= desiredBatchSize) {
      filteredBatch = filteredBatch.slice(0, desiredBatchSize);
      break;
    }
    
    // Si necesitamos más píxeles, tomar del pool restante
    const pixelsNeeded = desiredBatchSize - filteredBatch.length;
    if (pixelsNeeded > 0 && imageState.remainingPixels.length > 0) {
      const additionalPixels = imageState.remainingPixels.splice(0, pixelsNeeded);
      currentBatch = additionalPixels;
      log(`🔄 Necesitamos ${pixelsNeeded} píxeles más, tomando ${additionalPixels.length} adicionales`);
    } else {
      // No hay más píxeles disponibles
      break;
    }
  }
  
  log(`🎯 Verificación completada: ${filteredBatch.length}/${desiredBatchSize} píxeles válidos, ${totalSkippedCount} omitidos en ${iterations} iteraciones`);
  
  return { 
    filteredBatch, 
    skippedCount: totalSkippedCount,
    iterations 
  };
}

/**
 * Verificar un lote de píxeles sin llenado recursivo (función auxiliar)
 */
async function verifyPixelBatch(batch) {
  const pixelsByTile = new Map();
  
  // Agrupar píxeles por tile para optimizar verificaciones
  for (const pixel of batch) {
    const tileKey = `${pixel.tileX},${pixel.tileY}`;
    if (!pixelsByTile.has(tileKey)) {
      pixelsByTile.set(tileKey, []);
    }
    pixelsByTile.get(tileKey).push(pixel);
  }
  
  const filteredBatch = [];
  const skippedPixels = [];
  let skippedCount = 0;
  
  for (const [tileKey, tilePixels] of pixelsByTile) {
    const [tileX, tileY] = tileKey.split(',').map(Number);
    
    try {
      const tileBlob = await getTileImageForVerification(tileX, tileY);
      if (!tileBlob) {
        // Si no podemos obtener el tile, incluimos todos los píxeles
        filteredBatch.push(...tilePixels);
        continue;
      }
      
      // Crear canvas para analizar la imagen del tile
      const img = new window.Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let objectUrl = null;
      
      try {
        objectUrl = window.URL.createObjectURL(tileBlob);
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            try {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              
              for (const pixel of tilePixels) {
                // Verificar si las coordenadas están dentro del tile
                if (pixel.localX >= 0 && pixel.localX < canvas.width && 
                    pixel.localY >= 0 && pixel.localY < canvas.height) {
                  
                  const pixelIndex = (pixel.localY * canvas.width + pixel.localX) * 4;
                  const currentR = imageData.data[pixelIndex];
                  const currentG = imageData.data[pixelIndex + 1];
                  const currentB = imageData.data[pixelIndex + 2];
                  
                  // Comparar con el color objetivo (coincidencia EXACTA)
                  const targetColor = pixel.color;
                  const isCorrectColor =
                    currentR === targetColor.r &&
                    currentG === targetColor.g &&
                    currentB === targetColor.b;
                  
                  if (isCorrectColor) {
                    skippedCount++;
                    skippedPixels.push(pixel);
                    log(`💡 Píxel ya correcto: (${pixel.localX},${pixel.localY}) en tile (${tileX},${tileY}) - RGB actual EXACTO`);
                  } else {
                    log(`🎯 Píxel necesita pintura: (${pixel.localX},${pixel.localY}) en tile (${tileX},${tileY}) - RGB actual != objetivo`);
                    filteredBatch.push(pixel);
                  }
                } else {
                  // Si está fuera del tile, incluirlo (no debería pasar)
                  log(`⚠️ Píxel fuera del tile: (${pixel.localX},${pixel.localY}) en tile (${tileX},${tileY}) de tamaño ${canvas.width}x${canvas.height}`);
                  filteredBatch.push(pixel);
                }
              }
              resolve();
            } catch (error) {
              reject(error);
            }
          };
          
          img.onerror = (error) => {
            log(`Error cargando imagen del tile ${tileKey}:`, error);
            // Si hay error cargando la imagen, incluir todos los píxeles
            filteredBatch.push(...tilePixels);
            resolve();
          };
          
          img.src = objectUrl;
        });
      } finally {
        // Limpiar recursos
        if (objectUrl) {
          window.URL.revokeObjectURL(objectUrl);
        }
        // Limpiar canvas
        canvas.width = 0;
        canvas.height = 0;
      }
      
    } catch (error) {
      log(`Error verificando tile ${tileKey}:`, error);
      // Si hay error, incluir todos los píxeles del tile
      filteredBatch.push(...tilePixels);
    }
  }
  
  return { filteredBatch, skippedCount, skippedPixels };
}

// Revalidación final del lote justo antes del envío, con un único relleno para mantener tamaño.
async function revalidateAndTopUpBatch(selectedBatch, targetBatchSize) {
  log(`🔎 Revalidación final del lote (objetivo: ${targetBatchSize})`);
  const { filteredBatch, skippedCount } = await verifyPixelBatch(selectedBatch);
  let finalBatch = [...filteredBatch];
  let totalSkipped = skippedCount;

  // Intento único de relleno para mantener el tamaño configurado
  if (finalBatch.length < targetBatchSize && imageState.remainingPixels.length > 0) {
    const need = Math.min(targetBatchSize - finalBatch.length, imageState.remainingPixels.length);
    const candidates = imageState.remainingPixels.splice(0, need);
    const topUp = await verifyPixelBatch(candidates);
    finalBatch.push(...topUp.filteredBatch);
    totalSkipped += topUp.skippedCount;
    log(`🔁 Relleno final: +${topUp.filteredBatch.length} válidos, ${topUp.skippedCount} omitidos`);
  }

  log(`✅ Revalidación final completada: ${finalBatch.length}/${targetBatchSize} para pintar`);
  return { finalBatch, skippedAdded: totalSkipped };
}

// Prevalidación inicial basada en instantánea del tablero actual
async function prevalidateAllPixelsOnStart(onProgress) {
  try {
    if (imageState.__prevalidated) {
      return;
    }
    if (!imageState.smartVerification) {
      imageState.__prevalidated = true;
      return;
    }
    if (!imageState.remainingPixels || imageState.remainingPixels.length === 0) {
      imageState.__prevalidated = true;
      return;
    }

    log(`📸 Iniciando prevalidación inicial de ${imageState.remainingPixels.length} píxeles (instantánea por tiles)`);

    const pixelsByTile = new Map();
    for (const p of imageState.remainingPixels) {
      if (!p) continue;
      const k = `${p.tileX},${p.tileY}`;
      if (!pixelsByTile.has(k)) pixelsByTile.set(k, []);
      pixelsByTile.get(k).push(p);
    }

    let matchedCount = 0;
    const stillNeeded = [];

    for (const [tileKey, tilePixels] of pixelsByTile) {
      const [tileX, tileY] = tileKey.split(',').map(Number);
      try {
        const tileBlob = await getTileImageForVerification(tileX, tileY);
        if (!tileBlob) {
          stillNeeded.push(...tilePixels);
          continue;
        }

        const img = new window.Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let objectUrl = null;

        try {
          objectUrl = window.URL.createObjectURL(tileBlob);
          await new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = (e) => reject(e);
            img.src = objectUrl;
          });

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

          for (const pixel of tilePixels) {
            const lx = pixel.localX;
            const ly = pixel.localY;
            if (lx >= 0 && lx < canvas.width && ly >= 0 && ly < canvas.height) {
              const idx = (ly * canvas.width + lx) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];

              const target = pixel.color;
              const isCorrect = r === target.r && g === target.g && b === target.b;

              if (isCorrect) {
                matchedCount++;
                if (imageState.protectionEnabled) {
                  const key = `${pixel.imageX},${pixel.imageY}`;
                  imageState.drawnPixelsMap.set(key, {
                    imageX: pixel.imageX,
                    imageY: pixel.imageY,
                    localX: pixel.localX,
                    localY: pixel.localY,
                    tileX: pixel.tileX,
                    tileY: pixel.tileY,
                    color: pixel.color,
                    paintedAt: Date.now(),
                    skipped: true
                  });
                }
              } else {
                stillNeeded.push(pixel);
              }
            } else {
              stillNeeded.push(pixel);
            }
          }
        } finally {
          if (objectUrl) window.URL.revokeObjectURL(objectUrl);
          canvas.width = 0;
          canvas.height = 0;
        }
      } catch (error) {
        log(`⚠️ Error prevalidando tile ${tileKey}:`, error);
        stillNeeded.push(...tilePixels);
      }
    }

    const prevLen = imageState.remainingPixels.length;
    if (matchedCount > 0) {
      imageState.paintedPixels += matchedCount;
      imageState.remainingPixels = stillNeeded;
      log(`✅ Prevalidación inicial completada: ${matchedCount} ya correctos de ${prevLen}. Restantes: ${stillNeeded.length}`);
      if (onProgress && imageState.totalPixels > 0) {
        const percentage = Math.round((imageState.paintedPixels / imageState.totalPixels) * 100);
        onProgress(imageState.paintedPixels, imageState.totalPixels, `💡 ${matchedCount} píxeles ya correctos al inicio - Progreso: ${percentage}%`);
      }
    } else {
      log(`ℹ️ Prevalidación inicial: no se encontraron píxeles ya correctos`);
    }

    imageState.__prevalidated = true;
  } catch (err) {
    log('⚠️ Error en prevalidación inicial:', err);
  }
}
export async function processImage(imageData, startPosition, onProgress, onComplete, onError) {
  const { width, height } = imageData;
  const { x: localStartX, y: localStartY } = startPosition;
  
  log(`Iniciando pintado: imagen(${width}x${height}) inicio LOCAL(${localStartX},${localStartY}) tile(${imageState.tileX},${imageState.tileY})`);
  log(`🛡️ Protección: ${imageState.protectionEnabled ? 'habilitada' : 'deshabilitada'}, Patrón: ${imageState.paintPattern}`);
  
  // Iniciar monitoreo de cargas
  startChargeMonitoring();
  
  // *** NUEVO: Generar token al inicio del proceso ***
  try {
    log("🔑 Generando token Turnstile al inicio del proceso...");
    const initialToken = await ensureToken();
    if (!initialToken) {
      log("⚠️ No se pudo generar token inicial, continuando con flujo normal");
    } else {
      log("✅ Token inicial generado exitosamente");
    }
  } catch (error) {
    log("⚠️ Error generando token inicial:", error.message);
  }
  
  // Generar cola de píxeles si no existe
  if (!imageState.remainingPixels || imageState.remainingPixels.length === 0 || (imageState.lastPosition.x === 0 && imageState.lastPosition.y === 0)) {
    log('Generando cola de píxeles...');
    imageState.remainingPixels = generatePixelQueue(imageData, startPosition, imageState.tileX, imageState.tileY);
    
    // Aplicar patrón de pintado
    if (imageState.paintPattern && imageState.paintPattern !== 'linear_start') {
      log(`🎨 Aplicando patrón de pintado: ${imageState.paintPattern}`);
      imageState.remainingPixels = applyPaintPattern(imageState.remainingPixels, imageState.paintPattern, imageData);
    }
    
    // Si hay una posición de continuación, filtrar píxeles ya pintados
    if (imageState.lastPosition.x > 0 || imageState.lastPosition.y > 0) {
      imageState.remainingPixels = imageState.remainingPixels.filter(pixel => {
        const pixelIndex = pixel.imageY * width + pixel.imageX;
        const lastIndex = imageState.lastPosition.y * width + imageState.lastPosition.x;
        return pixelIndex >= lastIndex;
      });
    }
    
    // Reiniciar flag de prevalidación cuando (re)generamos la cola
    imageState.__prevalidated = false;

    // Ejecutar prevalidación inicial tipo "instantánea" antes de configurar el overlay
    await prevalidateAllPixelsOnStart(onProgress);

    log(`Cola generada: ${imageState.remainingPixels.length} píxeles pendientes`);
    // Actualizar overlay del plan al (re)generar la cola
    try {
      if (window.__WPA_PLAN_OVERLAY__) {
        window.__WPA_PLAN_OVERLAY__.injectStyles();
        window.__WPA_PLAN_OVERLAY__.setEnabled(true);
        if (imageState.startPosition && imageState.tileX !== undefined && imageState.tileY !== undefined) {
          window.__WPA_PLAN_OVERLAY__.setAnchor({
            tileX: imageState.tileX,
            tileY: imageState.tileY,
            pxX: imageState.startPosition.x,
            pxY: imageState.startPosition.y
          });
        }
        window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
          enabled: true,
          nextBatchCount: imageState.pixelsPerBatch
        });
      }
    } catch (e) {
      log('⚠️ Error actualizando plan overlay:', e);
    }

    // (ANTES) NUEVO: Prevalidar toda la cola antes de comenzar a pintar
    // await prevalidateAllPixelsOnStart(onProgress);
  }
  
  // Asegurar prevalidación incluso si la cola venía preconstruida (desde imagen/JSON)
  // Eliminado para optimizar: usaremos verificación por lotes durante el flujo normal
  // await prevalidateAllPixelsOnStart(onProgress);
  await prevalidateAllPixelsOnStart(onProgress);

  try {
    while (imageState.remainingPixels.length > 0 && !imageState.stopFlag) {
      // *** NUEVA FUNCIONALIDAD: Protección antes de cada lote ***
      if (imageState.protectionEnabled && imageState.paintedPixels > 0) {
        try {
          const protectionResult = await protectBeforeNextBatch(onProgress);
          
          if (!protectionResult.canContinue) {
            if (protectionResult.reason === 'no_charges_for_protection') {
              log(`🛡️ No hay cargas suficientes para proteger ${protectionResult.changesCount} píxeles alterados, esperando...`);
              if (onProgress) {
                onProgress(imageState.paintedPixels, imageState.totalPixels, 
                  `🛡️ Protegiendo dibujo: esperando cargas para reparar ${protectionResult.changesCount} píxeles alterados...`);
              }
              
              // Esperar cargas antes de continuar
              await waitForCooldown(Math.min(protectionResult.changesCount, 20), onProgress);
              continue; // Volver a intentar el ciclo con protección
            }
          } else if (protectionResult.needsProtection) {
            if (protectionResult.reason === 'protection_completed') {
              log(`🛡️ Protección completada: ${protectionResult.repairedCount} píxeles reparados`);
              // Actualizar cargas después de la reparación
              imageState.currentCharges = protectionResult.remainingCharges || imageState.currentCharges;
            } else if (protectionResult.reason === 'protection_failed') {
              log(`⚠️ Protección falló, continuando con advertencia (${protectionResult.changesCount} cambios no reparados)`);
            }
          }
        } catch (protectionError) {
          log('❌ Error en protección:', protectionError);
          // Continuar pintado aunque la protección falle
        }
      }

      // Verificar cargas disponibles
      let availableCharges = Math.floor(imageState.currentCharges);
      
      // Determinar tamaño del lote basado en configuración
      let pixelsPerBatch;
      
      // Debug logging para diagnosticar problema del primer lote
      log(`🔍 Estado del primer lote - isFirstBatch: ${imageState.isFirstBatch}, useAllChargesFirst: ${imageState.useAllChargesFirst}, availableCharges: ${availableCharges}`);
      
      if (imageState.isFirstBatch && imageState.useAllChargesFirst && availableCharges > 0) {
        // Primera pasada: usar todas las cargas disponibles
        pixelsPerBatch = Math.min(availableCharges, imageState.remainingPixels.length);
        imageState.isFirstBatch = false; // Marcar que ya no es la primera pasada
        log(`🚀 Primera pasada: usando ${pixelsPerBatch} cargas de ${availableCharges} disponibles`);
      } else {
        // Pasadas siguientes: usar configuración normal
        pixelsPerBatch = Math.min(imageState.pixelsPerBatch, imageState.remainingPixels.length);
        log(`⚙️ Pasada normal: usando ${pixelsPerBatch} píxeles (configurado: ${imageState.pixelsPerBatch})`);
      }
      
      // Usar la nueva función de verificación de cargas
      const hasEnoughCharges = await ensureSufficientCharges(pixelsPerBatch, onProgress);
      if (!hasEnoughCharges) {
        log(`⚠️ No se pudieron obtener suficientes cargas, pausando pintado`);
        break;
      }
      
      // Actualizar availableCharges después de la verificación
      availableCharges = Math.floor(imageState.currentCharges);
      
  // Tomar el siguiente lote de píxeles
      const initialBatch = imageState.remainingPixels.splice(0, pixelsPerBatch);
      let batch = initialBatch;
      let skippedCount = 0;
      
      log(`Verificando lote de ${initialBatch.length} píxeles...`);
      
      // *** NUEVA FUNCIONALIDAD: Verificación inteligente de píxeles ***
      if (imageState.smartVerification) {
        const verificationResult = await filterPixelsThatNeedPainting(initialBatch, pixelsPerBatch);
        batch = verificationResult.filteredBatch;
        skippedCount = verificationResult.skippedCount;
        
        // Si todos los píxeles ya tenían el color correcto, continuar al siguiente lote
        if (batch.length === 0) {
          log(`💡 Todos los píxeles del lote ya tenían el color correcto. Continuando al siguiente lote.`);
          imageState.paintedPixels += skippedCount; // Contar como "pintados" aunque se omitieron
          
          // Actualizar progreso
          if (onProgress) {
            const percentage = Math.round((imageState.paintedPixels / imageState.totalPixels) * 100);
            onProgress(imageState.paintedPixels, imageState.totalPixels, 
              `💡 ${skippedCount} píxeles ya correctos - Progreso: ${percentage}%`);
          }
          continue;
        }
        
        log(`🎯 Lote inteligente completado: ${batch.length} píxeles para pintar (${skippedCount} omitidos, ${verificationResult.iterations} iteraciones)`);
      } else {
        log(`Pintando lote de ${batch.length} píxeles...`);
      }
      
      // Revalidación final del lote para sustituir cambios de última hora y rellenar una vez
      try {
        const beforeLen = batch.length;
        const { finalBatch, skippedAdded } = await revalidateAndTopUpBatch(batch, pixelsPerBatch);
        if (skippedAdded > 0) {
          skippedCount += skippedAdded;
          log(`🔎 Revalidación final: ${beforeLen} -> ${finalBatch.length} píxeles; ${skippedAdded} omitidos adicionales`);
        }
        batch = finalBatch;

        // Si tras la revalidación no quedan píxeles por pintar, continuar
        if (batch.length === 0) {
          log(`💡 Todos los píxeles del lote quedaron correctos tras la revalidación final. Continuando...`);
          imageState.paintedPixels += skippedCount;
          if (onProgress) {
            const percentage = Math.round((imageState.paintedPixels / imageState.totalPixels) * 100);
            onProgress(imageState.paintedPixels, imageState.totalPixels, 
              `💡 ${skippedCount} píxeles ya correctos - Progreso: ${percentage}%`);
          }
          continue;
        }
      } catch (e) {
        log(`⚠️ Error en revalidación final del lote:`, e);
      }
      
      // Actualizar overlay del plan para reflejar el lote siguiente resaltado
      try {
        if (window.__WPA_PLAN_OVERLAY__) {
          window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
            enabled: true, // Mantener habilitado
            nextBatchCount: imageState.pixelsPerBatch
          });
        }
      } catch (e) {
        log('⚠️ Error actualizando plan overlay durante pintado:', e);
      }

      // Pintar el lote con sistema de reintentos
      const result = await paintPixelBatchWithRetry(batch, onProgress);
      
      if (result.success && result.painted > 0) {
        // Sumar píxeles realmente pintados + píxeles omitidos por verificación inteligente
        imageState.paintedPixels += result.painted + skippedCount;
        
        // *** NUEVA FUNCIONALIDAD: Registrar píxeles pintados para protección ***
        if (imageState.protectionEnabled) {
          // Registrar píxeles realmente pintados
          for (const pixel of batch.slice(0, result.painted)) {
            const key = `${pixel.imageX},${pixel.imageY}`;
            imageState.drawnPixelsMap.set(key, {
              imageX: pixel.imageX,
              imageY: pixel.imageY,
              localX: pixel.localX,
              localY: pixel.localY,
              tileX: pixel.tileX,
              tileY: pixel.tileY,
              color: pixel.color,
              paintedAt: Date.now()
            });
          }
          
          // Registrar píxeles omitidos como "ya correctos" para protección (solo si hay verificación inteligente)
          if (imageState.smartVerification && skippedCount > 0) {
            // Obtener los píxeles omitidos (los que estaban en initialBatch pero no en batch)
            const skippedPixels = initialBatch.filter(ip => !batch.some(bp => 
              bp.imageX === ip.imageX && bp.imageY === ip.imageY
            ));
            
            for (const pixel of skippedPixels) {
              const key = `${pixel.imageX},${pixel.imageY}`;
              imageState.drawnPixelsMap.set(key, {
                imageX: pixel.imageX,
                imageY: pixel.imageY,
                localX: pixel.localX,
                localY: pixel.localY,
                tileX: pixel.tileX,
                tileY: pixel.tileY,
                color: pixel.color,
                paintedAt: Date.now(),
                skipped: true // Marcar como omitido por verificación inteligente/final
              });
            }
          }
        }
        
        // Actualizar cargas consumidas
        imageState.currentCharges = Math.max(0, imageState.currentCharges - result.painted);
        log(`Cargas después del lote: ${imageState.currentCharges.toFixed(1)} (consumidas: ${result.painted})`);
        
        // Actualizar cargas consumidas
        imageState.currentCharges = Math.max(0, imageState.currentCharges - result.painted);
        log(`Cargas después del lote: ${imageState.currentCharges.toFixed(1)} (consumidas: ${result.painted})`);
        
        // Actualizar posición para continuar desde aquí si se interrumpe
        if (batch.length > 0) {
          const lastPixel = batch[batch.length - 1];
          imageState.lastPosition = { x: lastPixel.imageX, y: lastPixel.imageY };
        }
        
        log(`Lote exitoso: ${result.painted}/${batch.length} píxeles pintados. Total: ${imageState.paintedPixels}/${imageState.totalPixels}`);
        
        // Calcular tiempo estimado
        const estimatedTime = calculateEstimatedTime();
        
        // Mostrar mensaje de confirmación de pasada completada
        const progressPercent = ((imageState.paintedPixels / imageState.totalPixels) * 100).toFixed(1);
        const successMessage = t('image.passCompleted', {
          painted: result.painted,
          percent: progressPercent,
          current: imageState.paintedPixels,
          total: imageState.totalPixels
        });
        
        // Actualizar progreso con mensaje de éxito
        if (onProgress) {
          onProgress(imageState.paintedPixels, imageState.totalPixels, successMessage, estimatedTime);
        }
        
  // Pausa para que el usuario vea el mensaje de éxito antes del cooldown
        await sleep(2000);
      } else if (result.shouldContinue) {
        // Si el sistema de reintentos falló pero debe continuar
        log(`Lote falló después de todos los reintentos, continuando con siguiente lote...`);
      } else {
        // En caso de fallo, devolver el lote a la cola
        imageState.remainingPixels.unshift(...batch);
        log(`Lote falló: reintentando en 5 segundos...`);
        await sleep(5000);
      }
      
  // Pausa breve entre lotes
      await sleep(500);
    }
    
    if (imageState.stopFlag) {
      log(`Pintado pausado en píxel imagen(${imageState.lastPosition.x},${imageState.lastPosition.y})`);
      // Mantener monitoreo activo para reanudar automáticamente
      if (onComplete) {
        onComplete(false, imageState.paintedPixels);
      }
    } else {
      log(`Pintado completado: ${imageState.paintedPixels} píxeles pintados`);
      imageState.lastPosition = { x: 0, y: 0 };
      imageState.remainingPixels = [];
      // Detener monitoreo al completar
      stopChargeMonitoring();
      // Limpiar overlay del plan al completar
      try {
        if (window.__WPA_PLAN_OVERLAY__) {
          window.__WPA_PLAN_OVERLAY__.setPlan([], { 
            enabled: true, // Mantener habilitado pero sin píxeles
            nextBatchCount: 0 
          });
          log('✅ Plan overlay limpiado al completar pintado');
        }
      } catch (e) {
        log('⚠️ Error limpiando plan overlay:', e);
      }
      if (onComplete) {
        onComplete(true, imageState.paintedPixels);
      }
    }
  } catch (error) {
    log('Error en proceso de pintado:', error);
    stopChargeMonitoring();
    if (onError) {
      onError(error);
    }
  }
}

export async function paintPixelBatch(batch) {
  try {
    if (!batch || batch.length === 0) {
      return { success: false, painted: 0, error: 'Lote vacío' };
    }
    
    // Agrupar el lote por tile como hace wplacer
    const byTile = new Map(); // key: `${tx},${ty}` -> { coords: [], colors: [], tx: p.tileX, ty: p.tileY }
    for (const p of batch) {
      const key = `${p.tileX},${p.tileY}`;
      if (!byTile.has(key)) byTile.set(key, { coords: [], colors: [], tx: p.tileX, ty: p.tileY });
      const bucket = byTile.get(key);
      bucket.coords.push(p.localX, p.localY);
      bucket.colors.push(p.color.id || p.color.value || 1);
    }

    // Obtener un único token de Turnstile para el conjunto
    const token = await ensureToken();

    let totalPainted = 0;
    for (const { coords, colors, tx, ty } of byTile.values()) {
      if (colors.length === 0) continue;
      // Saneado extra de coords (0..999) y depuración de rangos
      const sanitized = [];
      for (let i = 0; i < coords.length; i += 2) {
        const x = ((Number(coords[i]) % 1000) + 1000) % 1000;
        const y = ((Number(coords[i + 1]) % 1000) + 1000) % 1000;
        // Filtrar NaN/undefined
        if (Number.isFinite(x) && Number.isFinite(y)) {
          sanitized.push(x, y);
        }
      }
      // Log de diagnóstico
      try {
        let minX = 999, maxX = 0, minY = 999, maxY = 0;
        for (let i = 0; i < sanitized.length; i += 2) {
          const x = sanitized[i], y = sanitized[i + 1];
          if (x < minX) minX = x; if (x > maxX) maxX = x;
          if (y < minY) minY = y; if (y > maxY) maxY = y;
        }
        log(`[IMG] Enviando tile ${tx},${ty}: ${colors.length} px | x:[${minX},${maxX}] y:[${minY},${maxY}]`);
      } catch {
        // noop (solo diagnóstico)
      }

      const resp = await postPixelBatchImage(tx, ty, sanitized, colors, token);
      if (resp.status !== 200) {
        return {
          success: false,
          painted: totalPainted,
          error: resp.json?.message || `HTTP ${resp.status}`,
          status: resp.status
        };
      }
      
      // Verificar que realmente se pintaron píxeles
      const actualPainted = resp.painted || 0;
      if (actualPainted === 0 && colors.length > 0) {
        log(`⚠️ API devolvió 200 OK pero painted=0 para ${colors.length} píxeles en tile ${tx},${ty}`);
        // Considerar esto como un fallo parcial para activar reintentos
        return {
          success: false,
          painted: totalPainted,
          error: `API devolvió painted=0 para ${colors.length} píxeles`,
          status: 200,
          shouldRetry: true
        };
      }
      
      totalPainted += actualPainted;
      log(`✅ Tile ${tx},${ty}: ${actualPainted}/${colors.length} píxeles pintados exitosamente`);
    }

    return { success: true, painted: totalPainted };
  } catch (error) {
    log('Error en paintPixelBatch:', error);
    return {
      success: false,
      painted: 0,
      error: error.message
    };
  }
}

// Función de pintado con sistema de reintentos (adaptado del Auto-Farm)
export async function paintPixelBatchWithRetry(batch, onProgress) {
  const maxAttempts = 5; // 5 intentos como en el Farm
  const baseDelay = 3000; // Delay base de 3 segundos
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await paintPixelBatch(batch);
      
      if (result.success) {
        imageState.retryCount = 0; // Reset en éxito
        return result;
      }
      
      imageState.retryCount = attempt;
      
      if (attempt < maxAttempts) {
        const delay = baseDelay * Math.pow(2, attempt - 1); // Backoff exponencial
        const delaySeconds = Math.round(delay / 1000);
        
        // Determinar tipo de error para mensaje específico
        let errorMessage;
        if (result.status === 0 || result.status === 'NetworkError') {
          errorMessage = t('image.networkError');
        } else if (result.status >= 500) {
          errorMessage = t('image.serverError');
        } else if (result.status === 408) {
          errorMessage = t('image.timeoutError');
        } else {
          errorMessage = t('image.retryAttempt', { 
            attempt, 
            maxAttempts, 
            delay: delaySeconds 
          });
        }
        
        if (onProgress) {
          onProgress(imageState.paintedPixels, imageState.totalPixels, errorMessage);
        }
        
        log(`Reintento ${attempt}/${maxAttempts} después de ${delaySeconds}s. Error: ${result.error}`);
        await sleep(delay);
      }
      
    } catch (error) {
      log(`Error en intento ${attempt}:`, error);
      imageState.retryCount = attempt;
      
      if (attempt < maxAttempts) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        const delaySeconds = Math.round(delay / 1000);
        
        const errorMessage = t('image.retryError', { 
          attempt, 
          maxAttempts, 
          delay: delaySeconds 
        });
        
        if (onProgress) {
          onProgress(imageState.paintedPixels, imageState.totalPixels, errorMessage);
        }
        
        await sleep(delay);
      }
    }
  }
  
  imageState.retryCount = maxAttempts;
  const failMessage = t('image.retryFailed', { maxAttempts });
  
  if (onProgress) {
    onProgress(imageState.paintedPixels, imageState.totalPixels, failMessage);
  }
  
  log(`Falló después de ${maxAttempts} intentos, continuando con siguiente lote`);
  
  // Retornar un resultado de fallo que permita continuar
  return {
    success: false,
    painted: 0,
    error: `Falló después de ${maxAttempts} intentos`,
    shouldContinue: true // Indica que debe continuar con el siguiente lote
  };
}

export async function paintPixelBatch_ORIGINAL(batch) {
  try {
    if (!batch || batch.length === 0) {
      return { success: false, painted: 0, error: 'Lote vacío' };
    }
    
    // Convertir el lote al formato esperado por la API
    const coords = [];
    const colors = [];
    let tileX = null;
    let tileY = null;
    
    for (const pixel of batch) {
      coords.push(pixel.localX, pixel.localY);
      colors.push(pixel.color.id || pixel.color.value || 1);
      
      // Tomar tileX/tileY del primer píxel (todos deberían tener el mismo tile)
      if (tileX === null) {
        tileX = pixel.tileX;
        tileY = pixel.tileY;
      }
    }
    
    // Obtener token de Turnstile
    const token = await ensureToken();
    
    // Enviar píxeles usando el formato correcto
    const response = await postPixelBatchImage(tileX, tileY, coords, colors, token);
    
    if (response.status === 200) {
      return {
        success: true,
        painted: response.painted,
        response: response.json
      };
    } else {
      return {
        success: false,
        painted: 0,
        error: response.json?.message || `HTTP ${response.status}`,
        status: response.status
      };
    }
  } catch (error) {
    log('Error en paintPixelBatch:', error);
    return {
      success: false,
      painted: 0,
      error: error.message
    };
  }
}

async function waitForCooldown(chargesNeeded, onProgress) {
  const chargeTime = IMAGE_DEFAULTS.CHARGE_REGEN_MS * chargesNeeded;
  const waitTime = chargeTime + 5000; // Tiempo necesario + 5 segundos de seguridad
  
  log(`Esperando ${Math.round(waitTime/1000)}s para obtener ${chargesNeeded} cargas`);
  
  // Actualizar estado de cooldown
  imageState.inCooldown = true;
  imageState.cooldownEndTime = Date.now() + waitTime;
  imageState.nextBatchCooldown = Math.round(waitTime / 1000);
  
  if (onProgress) {
    const minutes = Math.floor(waitTime / 60000);
    const seconds = Math.floor((waitTime % 60000) / 1000);
    const timeText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    const message = t('image.waitingChargesRegen', {
      current: Math.floor(imageState.currentCharges),
      needed: chargesNeeded,
      time: timeText
    });
    onProgress(imageState.paintedPixels, imageState.totalPixels, message);
  }
  
  // Contar hacia atrás
  for (let i = Math.round(waitTime/1000); i > 0; i--) {
    if (imageState.stopFlag) break;
    
    imageState.nextBatchCooldown = i;
    
    // Solo actualizar el mensaje cada 5 segundos o en los últimos 10 segundos para reducir parpadeo
    if (onProgress && (i % 5 === 0 || i <= 10 || i === Math.round(waitTime/1000))) {
      const minutes = Math.floor(i / 60);
      const seconds = i % 60;
      const timeText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
      const message = t('image.waitingChargesCountdown', {
        current: Math.floor(imageState.currentCharges),
        needed: chargesNeeded,
        time: timeText
      });
      onProgress(imageState.paintedPixels, imageState.totalPixels, message);
    }
    
    await sleep(1000);
  }
  
  imageState.inCooldown = false;
  imageState.nextBatchCooldown = 0;
  
  // Simular regeneración de cargas
  imageState.currentCharges = Math.min(
    imageState.maxCharges || 9999, // usar maxCharges del estado
    imageState.currentCharges + (waitTime / IMAGE_DEFAULTS.CHARGE_REGEN_MS)
  );
}

function generatePixelQueue(imageData, startPosition, baseTileX, baseTileY) {
  const { pixels } = imageData;
  const { x: localStartX, y: localStartY } = startPosition;
  const queue = [];

  // Verificar si pixels es un array iterable
  if (!Array.isArray(pixels)) {
    log(`❌ Error: pixels no es un array iterable. Tipo: ${typeof pixels}`, pixels);
    return [];
  }

  for (const pixelData of pixels) {
    if (!pixelData) continue;
    
    // Manejar diferentes formatos de píxel
    // Formato Blue Marble: imageX, imageY, color
    // Formato clásico: x, y, targetColor
    const pixelX = pixelData.imageX !== undefined ? pixelData.imageX : pixelData.x;
    const pixelY = pixelData.imageY !== undefined ? pixelData.imageY : pixelData.y;
    const pixelColor = pixelData.color !== undefined ? pixelData.color : pixelData.targetColor;
    
    if (pixelX === undefined || pixelY === undefined) {
      log(`⚠️ Píxel con coordenadas inválidas:`, pixelData);
      continue;
    }
    
    // global dentro del mosaico base, puede exceder 0..999 y cruzar a otros tiles
    const globalX = localStartX + pixelX;
    const globalY = localStartY + pixelY;
    const tileOffsetX = Math.floor(globalX / 1000);
    const tileOffsetY = Math.floor(globalY / 1000);
    const tx = baseTileX + tileOffsetX;
    const ty = baseTileY + tileOffsetY;
    const localX = ((globalX % 1000) + 1000) % 1000; // asegurar 0..999
    const localY = ((globalY % 1000) + 1000) % 1000;
    
    queue.push({
      imageX: pixelX,
      imageY: pixelY,
      localX,
      localY,
      tileX: tx,
      tileY: ty,
      color: pixelColor,
      originalColor: pixelData.originalColor
    });
  }

  log(`Cola de píxeles generada: ${queue.length} píxeles para pintar`);
  return queue;
}

function calculateEstimatedTime() {
  if (!imageState.remainingPixels || imageState.remainingPixels.length === 0) {
    return 0;
  }
  
  const remainingPixels = imageState.remainingPixels.length;
  const batchSize = imageState.pixelsPerBatch;
  const chargeRegenTime = IMAGE_DEFAULTS.CHARGE_REGEN_MS / 1000; // en segundos
  
  // Calcular número de lotes necesarios
  const batchesNeeded = Math.ceil(remainingPixels / batchSize);
  
  // Tiempo de espera entre lotes (cada píxel necesita 1 carga, cada carga tarda 30s)
  const waitTimeBetweenBatches = batchSize * chargeRegenTime;
  
  // Tiempo total estimado
  const totalWaitTime = (batchesNeeded - 1) * waitTimeBetweenBatches;
  const executionTime = batchesNeeded * 2; // ~2 segundos por lote de ejecución
  
  return Math.ceil(totalWaitTime + executionTime);
}

export { calculateEstimatedTime, startChargeMonitoring, stopChargeMonitoring };

export function stopPainting() {
  imageState.stopFlag = true;
  imageState.running = false;
  stopChargeMonitoring();
  log('🛑 Deteniendo proceso de pintado...');
}

export function pausePainting() {
  imageState.stopFlag = true;
  stopChargeMonitoring();
  log('⏸️ Pausando proceso de pintado...');
}

export function resumePainting() {
  imageState.stopFlag = false;
  imageState.running = true;
  if (imageState.remainingPixels.length > 0) {
    startChargeMonitoring();
  }
  log('▶️ Reanudando proceso de pintado...');
}
