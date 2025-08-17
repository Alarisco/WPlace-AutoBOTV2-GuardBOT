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
        pixelsPerBatch: imageState.pixelsPerBatch,
        useAllChargesFirst: imageState.useAllChargesFirst,
        isFirstBatch: imageState.isFirstBatch,
        maxCharges: imageState.maxCharges
      },
      // Filtrar solo los datos serializables de los colores (sin elementos DOM)
      colors: imageState.availableColors.map(color => ({
        id: color.id,
        r: color.r,
        g: color.g,
        b: color.b
      })),
      remainingPixels: imageState.remainingPixels || []
    };

    // Persistencia del overlay de imagen eliminada; el overlay de plan se infiere desde remainingPixels
    
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
          
          // Manejar tanto formato original como modular para posiciones
          if (progressData.progress.lastPosition) {
            // Formato modular
            imageState.lastPosition = progressData.progress.lastPosition;
          } else if (progressData.position.lastX !== undefined && progressData.position.lastY !== undefined) {
            // Formato original
            imageState.lastPosition = { x: progressData.position.lastX, y: progressData.position.lastY };
          }
          
          // Manejar tanto formato original como modular para startPosition
          if (progressData.position.startPosition) {
            // Formato modular
            imageState.startPosition = progressData.position.startPosition;
          } else if (progressData.position.startX !== undefined && progressData.position.startY !== undefined) {
            // Formato original
            imageState.startPosition = { x: progressData.position.startX, y: progressData.position.startY };
          }
          
          imageState.tileX = progressData.position.tileX;
          imageState.tileY = progressData.position.tileY;
          imageState.originalImageName = progressData.imageData.originalName;
          
          // Manejar remainingPixels tanto en progress como en raíz
          imageState.remainingPixels = progressData.remainingPixels || progressData.progress.remainingPixels || [];

          // Actualizar overlay del plan con los píxeles restantes (si los hay)
          try {
            if (window.__WPA_PLAN_OVERLAY__) {
              window.__WPA_PLAN_OVERLAY__.injectStyles();
              window.__WPA_PLAN_OVERLAY__.setEnabled(true); // Activar automáticamente al cargar progreso
              
              // Configurar ancla si tenemos posición de inicio
              if (imageState.startPosition && imageState.tileX !== undefined && imageState.tileY !== undefined) {
                window.__WPA_PLAN_OVERLAY__.setAnchor({
                  tileX: imageState.tileX,
                  tileY: imageState.tileY,
                  pxX: imageState.startPosition.x,
                  pxY: imageState.startPosition.y
                });
                log(`✅ Plan overlay anclado con posición cargada: tile(${imageState.tileX},${imageState.tileY}) local(${imageState.startPosition.x},${imageState.startPosition.y})`);
              }
              
              window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
                enabled: true,
                nextBatchCount: imageState.pixelsPerBatch
              });
              
              log(`✅ Plan overlay activado con ${imageState.remainingPixels.length} píxeles restantes`);
            }
          } catch (e) {
            log('⚠️ Error activando plan overlay al cargar progreso:', e);
          }
          
          if (progressData.config) {
            imageState.pixelsPerBatch = progressData.config.pixelsPerBatch || imageState.pixelsPerBatch;
            imageState.useAllChargesFirst = progressData.config.useAllChargesFirst !== undefined ? 
              progressData.config.useAllChargesFirst : imageState.useAllChargesFirst;
            imageState.isFirstBatch = progressData.config.isFirstBatch !== undefined ? 
              progressData.config.isFirstBatch : true; // Por defecto, continuar como no primera pasada
            imageState.maxCharges = progressData.config.maxCharges || imageState.maxCharges;
          }
          
          // Marcar como imagen cargada y listo para continuar
          imageState.imageLoaded = true;
          imageState.colorsChecked = true;

          // Ya no se restaura overlay de imagen; el overlay de plan se llena más abajo
          
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
  imageState.isFirstBatch = true; // Resetear para nueva imagen
  imageState.nextBatchCooldown = 0;
  
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
