import { log } from "../core/logger.js";
import { sleep } from "../core/timing.js";
import { postPixelBatchImage } from "../core/wplace-api.js";
import { getTurnstileToken } from "../core/turnstile.js";
import { imageState, IMAGE_DEFAULTS } from "./config.js";
import { t } from "../locales/index.js";

export async function processImage(imageData, startPosition, onProgress, onComplete, onError) {
  const { width, height } = imageData;
  const { x: localStartX, y: localStartY } = startPosition;
  
  log(`Iniciando pintado: imagen(${width}x${height}) inicio LOCAL(${localStartX},${localStartY}) tile(${imageState.tileX},${imageState.tileY})`);
  
  // Generar cola de píxeles si no existe
  if (!imageState.remainingPixels || imageState.remainingPixels.length === 0 || (imageState.lastPosition.x === 0 && imageState.lastPosition.y === 0)) {
    log('Generando cola de píxeles...');
    imageState.remainingPixels = generatePixelQueue(imageData, startPosition, imageState.tileX, imageState.tileY);
    
    // Si hay una posición de continuación, filtrar píxeles ya pintados
    if (imageState.lastPosition.x > 0 || imageState.lastPosition.y > 0) {
      imageState.remainingPixels = imageState.remainingPixels.filter(pixel => {
        const pixelIndex = pixel.imageY * width + pixel.imageX;
        const lastIndex = imageState.lastPosition.y * width + imageState.lastPosition.x;
        return pixelIndex >= lastIndex;
      });
    }
    
    log(`Cola generada: ${imageState.remainingPixels.length} píxeles pendientes`);
  }
  
  try {
    while (imageState.remainingPixels.length > 0 && !imageState.stopFlag) {
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
      
      // Pintar el lote
      const result = await paintPixelBatch(batch);
      
      if (result.success && result.painted > 0) {
        imageState.paintedPixels += result.painted;
        
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

function generatePixelQueue(imageData, startPosition, tileX, tileY) {
  const { pixels } = imageData;
  const { x: localStartX, y: localStartY } = startPosition;
  const queue = [];

  for (const pixelData of pixels) {
    const globalX = localStartX + pixelData.x;
    const globalY = localStartY + pixelData.y;
    
    queue.push({
      imageX: pixelData.x,
      imageY: pixelData.y,
      localX: globalX,
      localY: globalY,
      tileX: tileX,
      tileY: tileY,
      color: pixelData.targetColor,
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
