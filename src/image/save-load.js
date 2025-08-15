import { log } from "../core/logger.js";
import { imageState } from "./config.js";

export function saveProgress(filename = null) {
  try {
    if (!imageState.imageData || imageState.paintedPixels === 0) {
      throw new Error('No hay progreso para guardar');
    }
    
    const progressData = {
      version: "1.0",
      timestamp: Date.now(),
      imageData: {
        width: imageState.imageData.width,
        height: imageState.imageData.height,
        originalName: imageState.originalImageName
      },
      progress: {
        paintedPixels: imageState.paintedPixels,
        totalPixels: imageState.totalPixels,
        lastPosition: { ...imageState.lastPosition }
      },
      position: {
        startPosition: { ...imageState.startPosition },
        tileX: imageState.tileX,
        tileY: imageState.tileY
      },
      config: {
        pixelsPerBatch: imageState.pixelsPerBatch
      },
      colors: imageState.availableColors,
      remainingPixels: imageState.remainingPixels || []
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const blob = new window.Blob([dataStr], { type: 'application/json' });
    
    const finalFilename = filename || `wplace_progress_${imageState.originalImageName || 'image'}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
    // Crear y disparar descarga
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    log(`✅ Progreso guardado: ${finalFilename}`);
    return { success: true, filename: finalFilename };
    
  } catch (error) {
    log('❌ Error guardando progreso:', error);
    return { success: false, error: error.message };
  }
}

export async function loadProgress(file) {
  return new Promise((resolve) => {
    try {
      const reader = new window.FileReader();
      
      reader.onload = (e) => {
        try {
          const progressData = JSON.parse(e.target.result);
          
          // Validar estructura del archivo
          const requiredFields = ['imageData', 'progress', 'position', 'colors'];
          const missingFields = requiredFields.filter(field => !(field in progressData));
          
          if (missingFields.length > 0) {
            throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
          }
          
          // Verificar compatibilidad de colores
          if (imageState.availableColors.length > 0) {
            const savedColorIds = progressData.colors.map(c => c.id);
            const currentColorIds = imageState.availableColors.map(c => c.id);
            const commonColors = savedColorIds.filter(id => currentColorIds.includes(id));
            
            if (commonColors.length < savedColorIds.length * 0.8) {
              log('⚠️ Los colores guardados no coinciden completamente con los actuales');
            }
          }
          
          // Restaurar estado
          imageState.imageData = {
            ...progressData.imageData,
            pixels: [] // Los píxeles se regenerarán si es necesario
          };
          
          imageState.paintedPixels = progressData.progress.paintedPixels;
          imageState.totalPixels = progressData.progress.totalPixels;
          imageState.lastPosition = progressData.progress.lastPosition;
          imageState.startPosition = progressData.position.startPosition;
          imageState.tileX = progressData.position.tileX;
          imageState.tileY = progressData.position.tileY;
          imageState.originalImageName = progressData.imageData.originalName;
          imageState.remainingPixels = progressData.remainingPixels || [];
          
          if (progressData.config) {
            imageState.pixelsPerBatch = progressData.config.pixelsPerBatch || imageState.pixelsPerBatch;
          }
          
          // Marcar como imagen cargada y listo para continuar
          imageState.imageLoaded = true;
          imageState.colorsChecked = true;
          
          log(`✅ Progreso cargado: ${imageState.paintedPixels}/${imageState.totalPixels} píxeles`);
          
          resolve({ 
            success: true, 
            data: progressData,
            painted: imageState.paintedPixels,
            total: imageState.totalPixels,
            canContinue: imageState.remainingPixels.length > 0
          });
          
        } catch (parseError) {
          log('❌ Error parseando archivo de progreso:', parseError);
          resolve({ success: false, error: parseError.message });
        }
      };
      
      reader.onerror = () => {
        const error = 'Error leyendo archivo';
        log('❌', error);
        resolve({ success: false, error });
      };
      
      reader.readAsText(file);
      
    } catch (error) {
      log('❌ Error cargando progreso:', error);
      resolve({ success: false, error: error.message });
    }
  });
}

export function clearProgress() {
  imageState.paintedPixels = 0;
  imageState.totalPixels = 0;
  imageState.lastPosition = { x: 0, y: 0 };
  imageState.remainingPixels = [];
  imageState.imageData = null;
  imageState.startPosition = null;
  imageState.imageLoaded = false;
  imageState.originalImageName = null;
  
  log('🧹 Progreso limpiado');
}

export function hasProgress() {
  return imageState.imageLoaded && 
         imageState.paintedPixels > 0 && 
         imageState.remainingPixels && 
         imageState.remainingPixels.length > 0;
}

export function getProgressInfo() {
  return {
    hasProgress: hasProgress(),
    painted: imageState.paintedPixels,
    total: imageState.totalPixels,
    remaining: imageState.remainingPixels ? imageState.remainingPixels.length : 0,
    percentage: imageState.totalPixels > 0 ? (imageState.paintedPixels / imageState.totalPixels * 100) : 0,
    lastPosition: { ...imageState.lastPosition },
    canContinue: hasProgress()
  };
}
