/* global setInterval, clearInterval */
import { log } from '../core/logger.js';
import { imageState } from './config.js';

// Clave para localStorage del progreso de imagen
const IMAGE_STORAGE_KEY = 'wplace-auto-image-progress';

// Variable para controlar el auto-guardado
let autoSaveInterval = null;

/**
 * Obtener datos completos de píxeles para guardar
 */
function getFullPixelData() {
  if (!imageState.imageData) {
    return null;
  }

  // Si hay un processor Blue Marble, usar su método
  if (
    imageState.imageData.processor &&
    typeof imageState.imageData.processor.generatePixelQueue === 'function'
  ) {
    return imageState.imageData.processor.generatePixelQueue();
  }

  // Si hay datos completos guardados en el progreso, usarlos
  if (
    imageState.imageData.fullPixelData &&
    Array.isArray(imageState.imageData.fullPixelData) &&
    imageState.imageData.fullPixelData.length > 0
  ) {
    return imageState.imageData.fullPixelData;
  }

  // Fallback para formato clásico
  if (imageState.imageData.pixels && imageState.imageData.pixels.length > 0) {
    return imageState.imageData.pixels;
  }

  // Último recurso: usar remainingPixels del plan, aunque no contenga todo el proyecto
  if (imageState.remainingPixels && imageState.remainingPixels.length > 0) {
    log('⚠️ Exportando usando remainingPixels (posible subconjunto del proyecto)');
    return imageState.remainingPixels;
  }

  return null;
}

/**
 * Crear datos de progreso para guardar
 */
function createProgressData() {
  if (!imageState.imageData) {
    return null;
  }

  // Obtener datos de píxeles de forma segura
  let fullPixelData = null;
  try {
    const pixelData = getFullPixelData();
    // Limitar el tamaño de los datos para localStorage
    if (pixelData && Array.isArray(pixelData)) {
      // Para localStorage, limitamos a 10000 píxeles para evitar límites de tamaño
      if (pixelData.length > 10000) {
        log('⚠️ Datos de píxeles muy grandes, limitando para localStorage');
        fullPixelData = pixelData.slice(0, 10000);
      } else {
        fullPixelData = pixelData;
      }
    }
  } catch (pixelError) {
    log('⚠️ Error obteniendo datos de píxeles:', pixelError.message);
  }

  return {
    timestamp: Date.now(),
    version: '2.0',
    imageData: {
      originalName: imageState.originalImageName,
      ...(fullPixelData && { fullPixelData }),
    },
    progress: {
      paintedPixels: imageState.paintedPixels,
      totalPixels: imageState.totalPixels,
      lastPosition: { ...imageState.lastPosition },
    },
    position: {
      startPosition: { ...imageState.startPosition },
      tileX: imageState.tileX,
      tileY: imageState.tileY,
    },
    config: {
      pixelsPerBatch: imageState.pixelsPerBatch,
      useAllChargesFirst: imageState.useAllChargesFirst,
      isFirstBatch: imageState.isFirstBatch,
      maxCharges: imageState.maxCharges,
      paintPattern: imageState.paintPattern,
    },
    colors: imageState.availableColors.map((color) => ({
      id: color.id,
      r: color.r,
      g: color.g,
      b: color.b,
    })),
    remainingPixels: imageState.remainingPixels || [],
  };
}

/**
 * Guardar progreso en localStorage
 */
export function saveToLocalStorage() {
  try {
    const progressData = createProgressData();
    if (!progressData) {
      log('⚠️ No hay datos para guardar en localStorage');
      return false;
    }

    localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(progressData));
    log('💾 Progreso guardado automáticamente en localStorage');
    return true;
  } catch (error) {
    log('❌ Error guardando en localStorage:', error.message);
    return false;
  }
}

/**
 * Cargar progreso desde localStorage
 */
export function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem(IMAGE_STORAGE_KEY);
    if (!saved) {
      log('📂 No hay progreso guardado en localStorage');
      return null;
    }

    const progressData = JSON.parse(saved);

    // Validar estructura
    const requiredFields = ['imageData', 'progress', 'position', 'colors'];
    const missingFields = requiredFields.filter((field) => !(field in progressData));

    if (missingFields.length > 0) {
      log(`❌ Datos inválidos en localStorage. Faltan: ${missingFields.join(', ')}`);
      return null;
    }

    // Restaurar estado
    Object.assign(imageState, {
      imageData: progressData.imageData,
      paintedPixels: progressData.progress.paintedPixels || 0,
      totalPixels: progressData.progress.totalPixels || 0,
      lastPosition: progressData.progress.lastPosition || { x: 0, y: 0 },
      startPosition: progressData.position.startPosition || { x: 0, y: 0 },
      tileX: progressData.position.tileX || 0,
      tileY: progressData.position.tileY || 0,
      availableColors: progressData.colors || [],
      remainingPixels: progressData.remainingPixels || [],
      pixelsPerBatch: progressData.config?.pixelsPerBatch || 5,
      useAllChargesFirst: progressData.config?.useAllChargesFirst ?? true,
      isFirstBatch: progressData.config?.isFirstBatch ?? false,
      maxCharges: progressData.config?.maxCharges || 3,
      paintPattern: progressData.config?.paintPattern || 'default',
    });

    log(
      `✅ Progreso cargado desde localStorage: ${imageState.paintedPixels}/${imageState.totalPixels} píxeles`,
    );
    return progressData;
  } catch (error) {
    log('❌ Error cargando desde localStorage:', error.message);
    return null;
  }
}

/**
 * Limpiar progreso de localStorage
 */
export function clearLocalStorage() {
  try {
    localStorage.removeItem(IMAGE_STORAGE_KEY);
    log('🗑️ Progreso eliminado de localStorage');
    return true;
  } catch (error) {
    log('❌ Error limpiando localStorage:', error.message);
    return false;
  }
}

/**
 * Iniciar auto-guardado periódico
 */
export function startAutoSave(intervalMinutes = 2) {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }

  autoSaveInterval = setInterval(
    () => {
      if (imageState.imageData && imageState.paintedPixels > 0) {
        saveToLocalStorage();
      }
    },
    intervalMinutes * 60 * 1000,
  );

  log(`🔄 Auto-guardado iniciado cada ${intervalMinutes} minutos`);
}

/**
 * Detener auto-guardado periódico
 */
export function stopAutoSave() {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
    autoSaveInterval = null;
    log('⏹️ Auto-guardado detenido');
  }
}

export function saveProgress(filename = null) {
  try {
    if (!imageState.imageData || imageState.paintedPixels === 0) {
      throw new Error('No hay progreso para guardar');
    }

    // Crear datos usando la función común
    const progressData = createProgressData();
    if (!progressData) {
      throw new Error('No se pudieron crear los datos de progreso');
    }

    // Guardar también en localStorage automáticamente
    saveToLocalStorage();

    // Crear archivo JSON para descarga
    const dataStr = JSON.stringify(progressData, null, 2);
    const blob = new window.Blob([dataStr], { type: 'application/json' });

    const finalFilename =
      filename ||
      `wplace_progress_${imageState.originalImageName || 'image'}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;

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
          const missingFields = requiredFields.filter((field) => !(field in progressData));

          if (missingFields.length > 0) {
            throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
          }

          // Detectar versión del archivo para retrocompatibilidad
          const fileVersion = progressData.version || '1.0';
          log(`📁 Cargando progreso versión ${fileVersion}`);

          // Si no hay colores en estado, usar los del archivo para asegurar exportación correcta
          if (!imageState.availableColors || imageState.availableColors.length === 0) {
            imageState.availableColors = Array.isArray(progressData.colors)
              ? progressData.colors
              : [];
          }

          // Verificar compatibilidad de colores
          if (imageState.availableColors.length > 0 && Array.isArray(progressData.colors)) {
            const savedColorIds = progressData.colors.map((c) => c.id);
            const currentColorIds = imageState.availableColors.map((c) => c.id);
            const commonColors = savedColorIds.filter((id) => currentColorIds.includes(id));

            if (commonColors.length < savedColorIds.length * 0.8) {
              log('⚠️ Los colores guardados no coinciden completamente con los actuales');
            }
          }

          // Restaurar estado básico (compatible con v1.0 y v2.0)
          imageState.imageData = {
            ...progressData.imageData,
            pixels: [], // Los píxeles se regenerarán si es necesario
          };

          // Rellenar datos completos de píxeles si existen en el archivo (v2.0)
          const fullPixelData = progressData.imageData.fullPixelData || progressData.fullPixelData;
          if (Array.isArray(fullPixelData) && fullPixelData.length > 0) {
            imageState.imageData.fullPixelData = fullPixelData;
            imageState.imageData.pixels = fullPixelData; // para compatibilidad con getFullPixelData
            log(`✅ Cargados ${fullPixelData.length} píxeles completos del proyecto`);
          }

          imageState.paintedPixels = progressData.progress.paintedPixels;
          imageState.totalPixels = progressData.progress.totalPixels;

          // Manejar tanto formato original como modular para posiciones
          if (progressData.progress.lastPosition) {
            // Formato modular
            imageState.lastPosition = progressData.progress.lastPosition;
          } else if (
            progressData.position.lastX !== undefined &&
            progressData.position.lastY !== undefined
          ) {
            // Formato original
            imageState.lastPosition = {
              x: progressData.position.lastX,
              y: progressData.position.lastY,
            };
          }

          // Manejar tanto formato original como modular para startPosition
          if (progressData.position.startPosition) {
            // Formato modular
            imageState.startPosition = progressData.position.startPosition;
          } else if (
            progressData.position.startX !== undefined &&
            progressData.position.startY !== undefined
          ) {
            // Formato original
            imageState.startPosition = {
              x: progressData.position.startX,
              y: progressData.position.startY,
            };
          }

          imageState.tileX = progressData.position.tileX;
          imageState.tileY = progressData.position.tileY;
          imageState.originalImageName = progressData.imageData.originalName;

          // Manejar remainingPixels tanto en progress como en raíz
          imageState.remainingPixels =
            progressData.remainingPixels || progressData.progress.remainingPixels || [];

          // Cargar configuración (retrocompatible)
          if (progressData.config) {
            imageState.pixelsPerBatch =
              progressData.config.pixelsPerBatch || imageState.pixelsPerBatch;
            imageState.useAllChargesFirst =
              progressData.config.useAllChargesFirst !== undefined
                ? progressData.config.useAllChargesFirst
                : imageState.useAllChargesFirst;

            // Si useAllChargesFirst está activado, la próxima pasada debería ser como primer lote
            // Si no está activado o no está definido, continuar como pasada normal
            imageState.isFirstBatch = imageState.useAllChargesFirst
              ? true
              : progressData.config.isFirstBatch !== undefined
                ? progressData.config.isFirstBatch
                : false;

            log(
              `📁 Progreso cargado - useAllChargesFirst: ${imageState.useAllChargesFirst}, isFirstBatch: ${imageState.isFirstBatch}`,
            );
            imageState.maxCharges = progressData.config.maxCharges || imageState.maxCharges;

            // Nuevas configuraciones v2.0 (solo si están disponibles)
            if (fileVersion >= '2.0') {
              imageState.paintPattern = progressData.config.paintPattern || 'linear_start';
            }
          }

          // Aplicar patrón de pintado a píxeles restantes (solo si hay configuración)
          if (
            imageState.paintPattern &&
            imageState.paintPattern !== 'linear_start' &&
            imageState.remainingPixels.length > 0
          ) {
            try {
              import('./patterns.js')
                .then(({ applyPaintPattern }) => {
                  imageState.remainingPixels = applyPaintPattern(
                    imageState.remainingPixels,
                    imageState.paintPattern,
                    imageState.imageData,
                  );
                  log(`🎨 Patrón de pintado aplicado: ${imageState.paintPattern}`);
                })
                .catch((patternError) => {
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
              if (
                imageState.startPosition &&
                imageState.tileX !== undefined &&
                imageState.tileY !== undefined
              ) {
                window.__WPA_PLAN_OVERLAY__.setAnchor({
                  tileX: imageState.tileX,
                  tileY: imageState.tileY,
                  pxX: imageState.startPosition.x,
                  pxY: imageState.startPosition.y,
                });
                log(
                  `✅ Plan overlay anclado con posición cargada: tile(${imageState.tileX},${imageState.tileY}) local(${imageState.startPosition.x},${imageState.startPosition.y})`,
                );
              }

              window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
                enabled: true,
                nextBatchCount: imageState.pixelsPerBatch,
              });

              log(
                `✅ Plan overlay activado con ${imageState.remainingPixels.length} píxeles restantes`,
              );
            }
          } catch (e) {
            log('⚠️ Error activando plan overlay al cargar progreso:', e);
          }

          // Marcar como imagen cargada y listo para continuar
          imageState.imageLoaded = true;
          imageState.colorsChecked = true;

          // Ya no se restaura overlay de imagen; el overlay de plan se llena más abajo

          log(
            `✅ Progreso cargado (v${fileVersion}): ${imageState.paintedPixels}/${imageState.totalPixels} píxeles`,
          );
          if (fileVersion >= '2.0') {
            log(`🎨 Patrón: ${imageState.paintPattern}`);
          }

          resolve({
            success: true,
            data: progressData,
            painted: imageState.paintedPixels,
            total: imageState.totalPixels,
            canContinue: imageState.remainingPixels.length > 0,
            version: fileVersion,
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
  return (
    imageState.imageLoaded &&
    imageState.paintedPixels > 0 &&
    imageState.remainingPixels &&
    imageState.remainingPixels.length > 0
  );
}

export function getProgressInfo() {
  return {
    hasProgress: hasProgress(),
    painted: imageState.paintedPixels,
    total: imageState.totalPixels,
    remaining: imageState.remainingPixels ? imageState.remainingPixels.length : 0,
    percentage:
      imageState.totalPixels > 0 ? (imageState.paintedPixels / imageState.totalPixels) * 100 : 0,
    lastPosition: { ...imageState.lastPosition },
    canContinue: hasProgress(),
  };
}
