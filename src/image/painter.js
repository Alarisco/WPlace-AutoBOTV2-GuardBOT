import { log } from "../core/logger.js";
import { sleep } from "../core/timing.js";
import { postPixel } from "../core/wplace-api.js";
import { getTurnstileToken } from "../core/turnstile.js";
import { imageState, IMAGE_DEFAULTS } from "./config.js";

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
      const availableCharges = Math.floor(imageState.currentCharges);
      const pixelsPerBatch = Math.min(imageState.pixelsPerBatch, imageState.remainingPixels.length);
      
      if (availableCharges < pixelsPerBatch) {
        log(`Cargas insuficientes: ${availableCharges}/${pixelsPerBatch} necesarias`);
        await waitForCooldown(pixelsPerBatch - availableCharges, onProgress);
        continue;
      }
      
      // Tomar el siguiente lote de píxeles
      const batch = imageState.remainingPixels.splice(0, pixelsPerBatch);
      
      log(`Pintando lote de ${batch.length} píxeles...`);
      
      // Pintar el lote
      const result = await paintPixelBatch(batch);
      
      if (result.success && result.painted > 0) {
        imageState.paintedPixels += result.painted;
        
        // Actualizar posición para continuar desde aquí si se interrumpe
        if (batch.length > 0) {
          const lastPixel = batch[batch.length - 1];
          imageState.lastPosition = { x: lastPixel.imageX, y: lastPixel.imageY };
        }
        
        log(`Lote exitoso: ${result.painted}/${batch.length} píxeles pintados. Total: ${imageState.paintedPixels}/${imageState.totalPixels}`);
        
        // Actualizar progreso
        if (onProgress) {
          onProgress(imageState.paintedPixels, imageState.totalPixels);
        }
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
    
    for (const pixel of batch) {
      coords.push(pixel.localX, pixel.localY);
      colors.push(pixel.color.id || pixel.color.value || 1);
    }
    
    // Obtener token de Turnstile
    const token = await getTurnstileToken(IMAGE_DEFAULTS.SITEKEY);
    
    // Enviar píxeles
    const response = await postPixel(coords, colors, token);
    
    if (response.status === 200 && response.json) {
      const painted = response.json.painted || batch.length;
      return {
        success: true,
        painted,
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
  const waitTime = Math.min(chargeTime, 60000); // Máximo 1 minuto de espera
  
  log(`Esperando ${Math.round(waitTime/1000)}s para obtener ${chargesNeeded} cargas`);
  
  if (onProgress) {
    onProgress(imageState.paintedPixels, imageState.totalPixels, `Esperando cargas (${Math.round(waitTime/1000)}s)`);
  }
  
  await sleep(waitTime);
  
  // Simular regeneración de cargas
  imageState.currentCharges = Math.min(
    50, // máximo de cargas
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
