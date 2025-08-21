import { log } from "../core/logger.js";
import { imageState } from "./config.js";

/**
 * Obtener datos completos de píxeles para guardar
 */
function getFullPixelData() {
  if (!imageState.imageData) {
    return null;
  }

  // Si hay un processor Blue Marble, usar su método
  if (imageState.imageData.processor && typeof imageState.imageData.processor.generatePixelQueue === 'function') {
    return imageState.imageData.processor.generatePixelQueue();
  }

  // Fallback para formato clásico
  if (imageState.imageData.pixels) {
    return imageState.imageData.pixels;
  }

  return null;
}

/**
 * Exportar progreso en formato compatible con Auto-Guard
 */
export function exportForGuard(filename = null) {
  try {
    if (!imageState.imageData || imageState.drawnPixelsMap.size === 0) {
      throw new Error('No hay píxeles dibujados para exportar a Guard');
    }
    
    // Calcular área de protección basada en píxeles dibujados
    const drawnPixels = Array.from(imageState.drawnPixelsMap.values());
    let minX = Number.MAX_SAFE_INTEGER, maxX = Number.MIN_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER, maxY = Number.MIN_SAFE_INTEGER;
    
    // Calcular coordenadas globales para encontrar el área mínima
    for (const pixel of drawnPixels) {
      const globalX = (pixel.tileX * 1000) + pixel.localX;
      const globalY = (pixel.tileY * 1000) + pixel.localY;
      
      minX = Math.min(minX, globalX);
      maxX = Math.max(maxX, globalX);
      minY = Math.min(minY, globalY);
      maxY = Math.max(maxY, globalY);
    }
    
    // Crear datos compatible con Auto-Guard
    const guardData = {
      version: "2.0-guard",
      timestamp: Date.now(),
      source: "Auto-Image",
      originalProject: {
        name: imageState.originalImageName,
        totalPixels: imageState.totalPixels,
        paintedPixels: imageState.paintedPixels
      },
      protectionArea: {
        x1: minX,
        y1: minY,
        x2: maxX + 1, // +1 para área inclusiva
        y2: maxY + 1,
        width: maxX - minX + 1,
        height: maxY - minY + 1,
        pixelCount: drawnPixels.length
      },
      // Mapa de píxeles original en formato Guard
      originalPixels: drawnPixels.map(pixel => {
        const globalX = (pixel.tileX * 1000) + pixel.localX;
        const globalY = (pixel.tileY * 1000) + pixel.localY;
        
        return {
          key: `${globalX},${globalY}`,
          globalX,
          globalY,
          localX: pixel.localX,
          localY: pixel.localY,
          tileX: pixel.tileX,
          tileY: pixel.tileY,
          colorId: pixel.color.id,
          r: pixel.color.r || 255,
          g: pixel.color.g || 255,
          b: pixel.color.b || 255,
          paintedAt: pixel.paintedAt || Date.now()
        };
      }),
      // Colores disponibles
      colors: imageState.availableColors.map(color => ({
        id: color.id,
        r: color.r,
        g: color.g,
        b: color.b
      })),
      guardConfig: {
        pixelsPerBatch: 10, // Configuración por defecto de Guard
        minChargesToWait: 20,
        checkInterval: 10000
      }
    };
    
    const dataStr = JSON.stringify(guardData, null, 2);
    const blob = new window.Blob([dataStr], { type: 'application/json' });
    
    const finalFilename = filename || `wplace_guard_${imageState.originalImageName || 'drawing'}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
    // Crear y disparar descarga
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    log(`✅ Datos exportados para Auto-Guard: ${finalFilename}`);
    log(`📊 Área de protección: (${minX},${minY}) a (${maxX},${maxY}) - ${drawnPixels.length} píxeles`);
    
    return { success: true, filename: finalFilename, pixelCount: drawnPixels.length };
    
  } catch (error) {
    log('❌ Error exportando para Guard:', error);
    return { success: false, error: error.message };
  }
}

export function saveProgress(filename = null) {
  try {
    if (!imageState.imageData || imageState.paintedPixels === 0) {
      throw new Error('No hay progreso para guardar');
    }
    
    const progressData = {
      version: "2.0", // Versión actualizada para compatibilidad
      timestamp: Date.now(),
      imageData: {
        width: imageState.imageData.width,
        height: imageState.imageData.height,
        originalName: imageState.originalImageName,
        // Guardar todos los píxeles del proyecto completo para protección
        fullPixelData: getFullPixelData()
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
        maxCharges: imageState.maxCharges,
        // Nuevas configuraciones v2.0
        protectionEnabled: imageState.protectionEnabled,
        paintPattern: imageState.paintPattern
      },
      // Filtrar solo los datos serializables de los colores (sin elementos DOM)
      colors: imageState.availableColors.map(color => ({
        id: color.id,
        r: color.r,
        g: color.g,
        b: color.b
      })),
      remainingPixels: imageState.remainingPixels || [],
      // Nueva información v2.0 para protección
      drawnPixels: Array.from(imageState.drawnPixelsMap.values()),
      protection: {
        enabled: imageState.protectionEnabled,
        lastCheck: imageState.lastProtectionCheck
      }
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
          
          // Detectar versión del archivo para retrocompatibilidad
          const fileVersion = progressData.version || "1.0";
          log(`📁 Cargando progreso versión ${fileVersion}`);
          
          // Verificar compatibilidad de colores
          if (imageState.availableColors.length > 0) {
            const savedColorIds = progressData.colors.map(c => c.id);
            const currentColorIds = imageState.availableColors.map(c => c.id);
            const commonColors = savedColorIds.filter(id => currentColorIds.includes(id));
            
            if (commonColors.length < savedColorIds.length * 0.8) {
              log('⚠️ Los colores guardados no coinciden completamente con los actuales');
            }
          }
          
          // Restaurar estado básico (compatible con v1.0 y v2.0)
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

          // Cargar configuración (retrocompatible)
          if (progressData.config) {
            imageState.pixelsPerBatch = progressData.config.pixelsPerBatch || imageState.pixelsPerBatch;
            imageState.useAllChargesFirst = progressData.config.useAllChargesFirst !== undefined ? 
              progressData.config.useAllChargesFirst : imageState.useAllChargesFirst;
            imageState.isFirstBatch = progressData.config.isFirstBatch !== undefined ? 
              progressData.config.isFirstBatch : true; // Por defecto, continuar como no primera pasada
            imageState.maxCharges = progressData.config.maxCharges || imageState.maxCharges;
            
            // Nuevas configuraciones v2.0 (solo si están disponibles)
            if (fileVersion >= "2.0") {
              imageState.protectionEnabled = progressData.config.protectionEnabled !== undefined ? 
                progressData.config.protectionEnabled : true;
              imageState.paintPattern = progressData.config.paintPattern || 'linear_start';
            }
          }
          
          // Cargar datos de protección (solo en v2.0+)
          if (fileVersion >= "2.0" && progressData.drawnPixels) {
            // Reconstruir mapa de píxeles dibujados
            imageState.drawnPixelsMap.clear();
            for (const pixel of progressData.drawnPixels) {
              const key = `${pixel.imageX},${pixel.imageY}`;
              imageState.drawnPixelsMap.set(key, pixel);
            }
            log(`✅ Cargados ${progressData.drawnPixels.length} píxeles dibujados para protección`);
            
            // Cargar información de protección
            if (progressData.protection) {
              imageState.protectionEnabled = progressData.protection.enabled !== undefined ? 
                progressData.protection.enabled : true;
              imageState.lastProtectionCheck = progressData.protection.lastCheck || 0;
            }
          } else {
            // En archivos v1.0, crear mapa de protección basado en progreso actual
            imageState.drawnPixelsMap.clear();
            log('📁 Archivo v1.0 detectado, protección se activará al continuar pintado');
          }
          
          // Aplicar patrón de pintado a píxeles restantes (solo si hay configuración)
          if (imageState.paintPattern && imageState.paintPattern !== 'linear_start' && imageState.remainingPixels.length > 0) {
            try {
              import('./patterns.js').then(({ applyPaintPattern }) => {
                imageState.remainingPixels = applyPaintPattern(
                  imageState.remainingPixels, 
                  imageState.paintPattern, 
                  imageState.imageData
                );
                log(`🎨 Patrón de pintado aplicado: ${imageState.paintPattern}`);
              }).catch(patternError => {
                log('⚠️ Error aplicando patrón de pintado:', patternError);
              });
            } catch (patternError) {
              log('⚠️ Error cargando módulo de patrones:', patternError);
            }
          }

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
          
          // Marcar como imagen cargada y listo para continuar
          imageState.imageLoaded = true;
          imageState.colorsChecked = true;

          // Ya no se restaura overlay de imagen; el overlay de plan se llena más abajo
          
          log(`✅ Progreso cargado (v${fileVersion}): ${imageState.paintedPixels}/${imageState.totalPixels} píxeles`);
          if (fileVersion >= "2.0") {
            log(`🛡️ Protección: ${imageState.protectionEnabled ? 'habilitada' : 'deshabilitada'}, Patrón: ${imageState.paintPattern}`);
          }
          
          resolve({ 
            success: true, 
            data: progressData,
            painted: imageState.paintedPixels,
            total: imageState.totalPixels,
            canContinue: imageState.remainingPixels.length > 0,
            version: fileVersion
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
  // Limpiar nuevos campos v2.0
  imageState.drawnPixelsMap.clear();
  imageState.lastProtectionCheck = 0;
  
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
