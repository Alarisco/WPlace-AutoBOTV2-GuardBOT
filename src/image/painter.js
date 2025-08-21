import { log } from "../core/logger.js";
import { sleep } from "../core/timing.js";
import { postPixelBatchImage } from "../core/wplace-api.js";
import { getTurnstileToken, detectSiteKey } from "../core/turnstile.js";
import { imageState, IMAGE_DEFAULTS } from "./config.js";
import { t } from "../locales/index.js";
import { protectBeforeNextBatch } from "./protection.js";
import { applyPaintPattern } from "./patterns.js";

export async function processImage(imageData, startPosition, onProgress, onComplete, onError) {
  const { width, height } = imageData;
  const { x: localStartX, y: localStartY } = startPosition;
  
  log(`Iniciando pintado: imagen(${width}x${height}) inicio LOCAL(${localStartX},${localStartY}) tile(${imageState.tileX},${imageState.tileY})`);
  log(`🛡️ Protección: ${imageState.protectionEnabled ? 'habilitada' : 'deshabilitada'}, Patrón: ${imageState.paintPattern}`);
  
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
    
    log(`Cola generada: ${imageState.remainingPixels.length} píxeles pendientes`);
    // Actualizar overlay del plan al (re)generar la cola
    try {
      if (window.__WPA_PLAN_OVERLAY__) {
        window.__WPA_PLAN_OVERLAY__.injectStyles();
        window.__WPA_PLAN_OVERLAY__.setEnabled(true); // Asegurar que esté activado
        
        // Configurar ancla con la posición de inicio si está disponible
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
        
        log(`✅ Plan overlay actualizado con ${imageState.remainingPixels.length} píxeles en cola`);
      }
    } catch (e) {
      log('⚠️ Error actualizando plan overlay:', e);
    }
  }
  
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
      if (imageState.isFirstBatch && imageState.useAllChargesFirst && availableCharges > 0) {
        // Primera pasada: usar todas las cargas disponibles
        pixelsPerBatch = Math.min(availableCharges, imageState.remainingPixels.length);
        imageState.isFirstBatch = false; // Marcar que ya no es la primera pasada
        log(`Primera pasada: usando ${pixelsPerBatch} cargas de ${availableCharges} disponibles`);
      } else {
        // Pasadas siguientes: usar configuración normal
        pixelsPerBatch = Math.min(imageState.pixelsPerBatch, imageState.remainingPixels.length);
      }
      
      if (availableCharges < pixelsPerBatch) {
        log(`Cargas insuficientes: ${availableCharges}/${pixelsPerBatch} necesarias`);
        await waitForCooldown(pixelsPerBatch - availableCharges, onProgress);
        // Volver a verificar cargas después del cooldown
        availableCharges = Math.floor(imageState.currentCharges);
        // Recalcular el tamaño del lote si es necesario
        if (!imageState.isFirstBatch) {
          pixelsPerBatch = Math.min(imageState.pixelsPerBatch, imageState.remainingPixels.length, availableCharges);
        }
        continue;
      }
      
  // Tomar el siguiente lote de píxeles
      const batch = imageState.remainingPixels.splice(0, pixelsPerBatch);
      
      log(`Pintando lote de ${batch.length} píxeles...`);
      
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
        imageState.paintedPixels += result.painted;
        
        // *** NUEVA FUNCIONALIDAD: Registrar píxeles pintados para protección ***
        if (imageState.protectionEnabled) {
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
        }
        
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
      if (onComplete) {
        onComplete(false, imageState.paintedPixels);
      }
    } else {
      log(`Pintado completado: ${imageState.paintedPixels} píxeles pintados`);
      imageState.lastPosition = { x: 0, y: 0 };
      imageState.remainingPixels = [];
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
    const byTile = new Map(); // key: `${tx},${ty}` -> { coords: [], colors: [], tx, ty }
    for (const p of batch) {
      const key = `${p.tileX},${p.tileY}`;
      if (!byTile.has(key)) byTile.set(key, { coords: [], colors: [], tx: p.tileX, ty: p.tileY });
      const bucket = byTile.get(key);
      bucket.coords.push(p.localX, p.localY);
      bucket.colors.push(p.color.id || p.color.value || 1);
    }

    // Obtener un único token de Turnstile para el conjunto
    const siteKey = detectSiteKey(IMAGE_DEFAULTS.SITEKEY);
    const token = await getTurnstileToken(siteKey);

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
      } catch (e) {
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
      totalPainted += resp.painted || 0;
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
    const token = await getTurnstileToken(IMAGE_DEFAULTS.SITEKEY);
    
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
    imageState.maxCharges || 50, // usar maxCharges del estado
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

export { calculateEstimatedTime };

export function stopPainting() {
  imageState.stopFlag = true;
  imageState.running = false;
  log('🛑 Deteniendo proceso de pintado...');
}

export function pausePainting() {
  imageState.stopFlag = true;
  log('⏸️ Pausando proceso de pintado...');
}

export function resumePainting() {
  imageState.stopFlag = false;
  imageState.running = true;
  log('▶️ Reanudando proceso de pintado...');
}
