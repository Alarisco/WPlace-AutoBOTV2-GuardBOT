import { log } from "../core/logger.js";
import { imageState, IMAGE_DEFAULTS } from "./config.js";
import { ImageProcessor, detectAvailableColors } from "./processor.js";
import { processImage, stopPainting } from "./painter.js";
import { saveProgress, loadProgress, clearProgress, getProgressInfo } from "./save-load.js";
import { createImageUI, showConfirmDialog } from "./ui.js";
import { getSession } from "../core/wplace-api.js";
import { initializeLanguage, getSection, t, getCurrentLanguage } from "../locales/index.js";

export async function runImage() {
  log('🚀 Iniciando WPlace Auto-Image (versión modular)');
  
  // Inicializar sistema de idiomas
  initializeLanguage();
  
  // Asegurarse que el estado global existe
  window.__wplaceBot = { ...window.__wplaceBot, imageRunning: true };

  let currentUserInfo = null; // Variable global para información del usuario
  let originalFetch = window.fetch; // Guardar fetch original globalmente
  
  // Función para restaurar fetch original de forma segura
  const restoreFetch = () => {
    if (window.fetch !== originalFetch) {
      window.fetch = originalFetch;
      log('🔄 Fetch original restaurado');
    }
    if (imageState.positionTimeoutId) {
      clearTimeout(imageState.positionTimeoutId);
      imageState.positionTimeoutId = null;
    }
    if (imageState.cleanupObserver) {
      imageState.cleanupObserver();
      imageState.cleanupObserver = null;
    }
    imageState.selectingPosition = false;
  };

  try {
    // Inicializar configuración
    const config = { ...IMAGE_DEFAULTS };
    
    // Obtener textos en el idioma actual
    const texts = getSection('image');
    
    // Actualizar estado del idioma
    imageState.language = getCurrentLanguage();
    
    // Verificar sitekey
    if (!config.SITEKEY) {
      const siteKeyElement = document.querySelector('*[data-sitekey]');
      if (siteKeyElement) {
        config.SITEKEY = siteKeyElement.getAttribute('data-sitekey');
        log(`📝 Sitekey encontrada automáticamente: ${config.SITEKEY.substring(0, 20)}...`);
      } else {
        log('⚠️ No se pudo encontrar la sitekey automáticamente');
      }
    }

    // Crear interfaz de usuario
    const ui = await createImageUI({
      texts,
      
      onConfigChange: (config) => {
        // Manejar cambios de configuración
        if (config.pixelsPerBatch !== undefined) {
          imageState.pixelsPerBatch = config.pixelsPerBatch;
        }
        if (config.useAllCharges !== undefined) {
          imageState.useAllChargesFirst = config.useAllCharges;
        }
        log(`Configuración actualizada:`, config);
      },
      
      onInitBot: async () => {
        log('🤖 Inicializando Auto-Image...');
        
        // Verificar colores disponibles
        ui.setStatus(t('image.checkingColors'), 'info');
        const colors = detectAvailableColors();
        
        if (colors.length === 0) {
          ui.setStatus(t('image.noColorsFound'), 'error');
          return false;
        }
        
        // Obtener información del usuario
        const sessionInfo = await getSession();
        let userInfo = null;
        if (sessionInfo.success && sessionInfo.data.user) {
          userInfo = {
            username: sessionInfo.data.user.name || 'Anónimo',
            charges: sessionInfo.data.charges,
            maxCharges: sessionInfo.data.maxCharges,
            pixels: sessionInfo.data.user.pixelsPainted || 0  // Usar pixelsPainted en lugar de pixels
          };
          currentUserInfo = userInfo; // Actualizar variable global
          imageState.currentCharges = sessionInfo.data.charges;
          imageState.maxCharges = sessionInfo.data.maxCharges || 50; // Guardar maxCharges en state
          log(`👤 Usuario conectado: ${sessionInfo.data.user.name || 'Anónimo'} - Cargas: ${userInfo.charges}/${userInfo.maxCharges} - Píxeles: ${userInfo.pixels}`);
        } else {
          log('⚠️ No se pudo obtener información del usuario');
        }
        
        imageState.availableColors = colors;
        imageState.colorsChecked = true;
        
        ui.setStatus(t('image.colorsFound', { count: colors.length }), 'success');
        ui.updateProgress(0, 0, userInfo);
        log(`✅ ${colors.length} colores disponibles detectados`);
        
        return true;
      },
      
      onUploadImage: async (file) => {
        try {
          ui.setStatus(t('image.loadingImage'), 'info');
          
          const imageUrl = window.URL.createObjectURL(file);
          const processor = new ImageProcessor(imageUrl);
          processor.originalName = file.name;
          
          await processor.load();
          
          // Procesar imagen con colores disponibles
          const processedData = processor.processImage(imageState.availableColors, config);
          
          imageState.imageData = processedData;
          imageState.imageData.processor = processor; // Guardar referencia al processor para resize
          imageState.totalPixels = processedData.validPixelCount;
          imageState.paintedPixels = 0;
          imageState.originalImageName = file.name;
          imageState.imageLoaded = true;
          
          ui.setStatus(t('image.imageLoaded', { count: processedData.validPixelCount }), 'success');
          ui.updateProgress(0, processedData.validPixelCount, currentUserInfo);
          
          log(`✅ Imagen cargada: ${processedData.width}x${processedData.height}, ${processedData.validPixelCount} píxeles válidos`);
          
          // Limpiar URL temporal
          window.URL.revokeObjectURL(imageUrl);
          
          return true;
        } catch (error) {
          ui.setStatus(t('image.imageError'), 'error');
          log('❌ Error cargando imagen:', error);
          return false;
        }
      },
      
      onSelectPosition: async () => {
        return new Promise((resolve) => {
          ui.setStatus(t('image.selectPositionAlert'), 'info');
          ui.setStatus(t('image.waitingPosition'), 'info');
          
          imageState.selectingPosition = true;
          let positionCaptured = false;
          
          // Método 1: Interceptar fetch (método original mejorado)
          const setupFetchInterception = () => {
            window.fetch = async (url, options) => {
              // Solo interceptar requests específicos de pintado cuando estamos seleccionando posición
              if (imageState.selectingPosition && 
                  !positionCaptured &&
                  typeof url === 'string' && 
                  url.includes('/s0/pixel/') && 
                  options && 
                  options.method === 'POST') {
                
                try {
                  log(`🎯 Interceptando request de pintado: ${url}`);
                  
                  const response = await originalFetch(url, options);
                  
                  if (response.ok && options.body) {
                    let bodyData;
                    try {
                      bodyData = JSON.parse(options.body);
                    } catch (parseError) {
                      log('Error parseando body del request:', parseError);
                      return response;
                    }
                    
                    if (bodyData.coords && Array.isArray(bodyData.coords) && bodyData.coords.length >= 2) {
                      const localX = bodyData.coords[0];
                      const localY = bodyData.coords[1];
                      
                      // Extraer tile de la URL de forma más robusta
                      const tileMatch = url.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);
                      if (tileMatch && !positionCaptured) {
                        positionCaptured = true;
                        imageState.tileX = parseInt(tileMatch[1]);
                        imageState.tileY = parseInt(tileMatch[2]);
                        
                        imageState.startPosition = { x: localX, y: localY };
                        imageState.selectingPosition = false;
                        
                        // Restaurar fetch original inmediatamente
                        restoreFetch();
                        
                        ui.setStatus(t('image.positionSet'), 'success');
                        log(`✅ Posición establecida: tile(${imageState.tileX},${imageState.tileY}) local(${localX},${localY})`);
                        
                        resolve(true);
                      } else {
                        log('⚠️ No se pudo extraer tile de la URL:', url);
                      }
                    }
                  }
                  
                  return response;
                } catch (error) {
                  log('❌ Error interceptando pixel:', error);
                  // En caso de error, restaurar fetch y continuar con el original
                  if (!positionCaptured) {
                    restoreFetch();
                    return originalFetch(url, options);
                  }
                }
              }
              
              // Para todos los demás requests, usar fetch original
              return originalFetch(url, options);
            };
          };
          
          // Método 2: Observer de canvas para detectar cambios visuales
          const setupCanvasObserver = () => {
            const canvasElements = document.querySelectorAll('canvas');
            if (canvasElements.length === 0) {
              log('⚠️ No se encontraron elementos canvas');
              return;
            }
            
            log(`📊 Configurando observer para ${canvasElements.length} canvas`);
            
            // Escuchar eventos de click en el documento para detectar pintado
            const clickHandler = (event) => {
              if (!imageState.selectingPosition || positionCaptured) return;
              
              // Verificar si el click fue en un canvas
              const target = event.target;
              if (target && target.tagName === 'CANVAS') {
                log('🖱️ Click detectado en canvas durante selección');
                
                // Dar tiempo para que se procese el pintado
                setTimeout(() => {
                  if (!positionCaptured && imageState.selectingPosition) {
                    log('🔍 Buscando requests recientes de pintado...');
                    // El fetch interceptor manejará la captura
                  }
                }, 500);
              }
            };
            
            document.addEventListener('click', clickHandler);
            
            // Limpiar observer al finalizar
            imageState.cleanupObserver = () => {
              document.removeEventListener('click', clickHandler);
            };
          };
          
          // Configurar ambos métodos
          setupFetchInterception();
          setupCanvasObserver();
          
          // Timeout para selección de posición con cleanup mejorado
          const timeoutId = setTimeout(() => {
            if (imageState.selectingPosition && !positionCaptured) {
              restoreFetch();
              if (imageState.cleanupObserver) {
                imageState.cleanupObserver();
              }
              ui.setStatus(t('image.positionTimeout'), 'error');
              log('⏰ Timeout en selección de posición');
              resolve(false);
            }
          }, 120000); // 2 minutos
          
          // Guardar timeout para poder cancelarlo
          imageState.positionTimeoutId = timeoutId;
        });
      },
      
      onStartPainting: async () => {
        // Debug: verificar estado antes de validar
        log(`🔍 Estado para iniciar pintura:`, {
          imageLoaded: imageState.imageLoaded,
          startPosition: imageState.startPosition,
          tileX: imageState.tileX,
          tileY: imageState.tileY,
          totalPixels: imageState.totalPixels,
          remainingPixels: imageState.remainingPixels?.length || 0
        });
        
        if (!imageState.imageLoaded || !imageState.startPosition) {
          ui.setStatus(t('image.missingRequirements'), 'error');
          log(`❌ Validación fallida: imageLoaded=${imageState.imageLoaded}, startPosition=${!!imageState.startPosition}`);
          return false;
        }
        
        imageState.running = true;
        imageState.stopFlag = false;
        imageState.isFirstBatch = true; // Resetear flag de primera pasada
        
        ui.setStatus(t('image.startPaintingMsg'), 'success');
        
        try {
          await processImage(
            imageState.imageData,
            imageState.startPosition,
            // onProgress - ahora incluye tiempo estimado
            (painted, total, message, estimatedTime) => {
              // Actualizar cargas en userInfo si existe
              if (currentUserInfo) {
                currentUserInfo.charges = Math.floor(imageState.currentCharges);
                if (estimatedTime !== undefined) {
                  currentUserInfo.estimatedTime = estimatedTime;
                }
              }
              
              ui.updateProgress(painted, total, currentUserInfo);
              
              // Actualizar display de cooldown si hay cooldown activo
              if (imageState.inCooldown && imageState.nextBatchCooldown > 0) {
                ui.updateCooldownDisplay(imageState.nextBatchCooldown);
              } else {
                ui.updateCooldownDisplay(0);
              }
              
              if (message) {
                ui.setStatus(message, 'info');
              } else {
                ui.setStatus(t('image.paintingProgress', { painted, total }), 'info');
              }
            },
            // onComplete
            (completed, pixelsPainted) => {
              if (completed) {
                ui.setStatus(t('image.paintingComplete', { count: pixelsPainted }), 'success');
                clearProgress();
              } else {
                ui.setStatus(t('image.paintingStopped'), 'warning');
              }
              imageState.running = false;
            },
            // onError
            (error) => {
              ui.setStatus(t('image.paintingError'), 'error');
              log('❌ Error en proceso de pintado:', error);
              imageState.running = false;
            }
          );
          
          return true;
        } catch (error) {
          ui.setStatus(t('image.paintingError'), 'error');
          log('❌ Error iniciando pintado:', error);
          imageState.running = false;
          return false;
        }
      },
      
      onStopPainting: async () => {
        const progressInfo = getProgressInfo();
        
        if (progressInfo.hasProgress) {
          const shouldSave = await showConfirmDialog(
            t('image.confirmSaveProgress'),
            t('image.saveProgressTitle'),
            {
              save: t('image.saveProgress'),
              discard: t('image.discardProgress'),
              cancel: t('image.cancel')
            }
          );
          
          if (shouldSave === 'save') {
            const result = saveProgress();
            if (result.success) {
              ui.setStatus(t('image.progressSaved', { filename: result.filename }), 'success');
            } else {
              ui.setStatus(t('image.progressSaveError', { error: result.error }), 'error');
            }
          } else if (shouldSave === 'cancel') {
            return false; // No detener
          }
        }
        
        stopPainting();
        ui.setStatus(t('image.paintingStopped'), 'warning');
        return true;
      },
      
      onSaveProgress: async () => {
        const result = saveProgress();
        if (result.success) {
          ui.setStatus(t('image.progressSaved', { filename: result.filename }), 'success');
        } else {
          ui.setStatus(t('image.progressSaveError', { error: result.error }), 'error');
        }
        return result.success;
      },
      
      onLoadProgress: async (file) => {
        try {
          const result = await loadProgress(file);
          if (result.success) {
            ui.setStatus(t('image.progressLoaded', { painted: result.painted, total: result.total }), 'success');
            ui.updateProgress(result.painted, result.total, currentUserInfo);
            
            // Habilitar botones después de cargar progreso exitosamente
            // No es necesario subir imagen ni seleccionar posición de nuevo
            log('✅ Progreso cargado - habilitando botones de inicio');
            
            return true;
          } else {
            ui.setStatus(t('image.progressLoadError', { error: result.error }), 'error');
            return false;
          }
        } catch (error) {
          ui.setStatus(t('image.progressLoadError', { error: error.message }), 'error');
          return false;
        }
      },
      
      onResizeImage: () => {
        if (imageState.imageLoaded && imageState.imageData && imageState.imageData.processor) {
          ui.showResizeDialog(imageState.imageData.processor);
        }
      },
      
      onConfirmResize: (processor, newWidth, newHeight) => {
        log(`🔄 Redimensionando imagen de ${processor.getDimensions().width}x${processor.getDimensions().height} a ${newWidth}x${newHeight}`);
        
        try {
          // Redimensionar la imagen
          processor.resize(newWidth, newHeight);
          
          // Recalcular píxeles válidos
          const processedData = processor.processImage(imageState.availableColors, config);
          
          // Actualizar imageState
          imageState.imageData = processedData;
          imageState.totalPixels = processedData.validPixelCount;
          imageState.paintedPixels = 0;
          imageState.remainingPixels = []; // Resetear cola al redimensionar
          imageState.lastPosition = { x: 0, y: 0 };
          
          // Actualizar UI
          ui.updateProgress(0, processedData.validPixelCount, currentUserInfo);
          ui.setStatus(t('image.resizeSuccess', { width: newWidth, height: newHeight }), 'success');
          
          log(`✅ Imagen redimensionada: ${processedData.validPixelCount} píxeles válidos`);
        } catch (error) {
          log(`❌ Error redimensionando imagen: ${error.message}`);
          ui.setStatus(t('image.imageError'), 'error');
        }
      }
    });

    // Escuchar cambios de idioma desde el launcher
    const handleLauncherLanguageChange = (event) => {
      const { language } = event.detail;
      log(`🌍 Imagen: Detectado cambio de idioma desde launcher: ${language}`);
      
      // Actualizar estado del idioma
      imageState.language = language;
      
      // Aquí se podría añadir lógica adicional para actualizar la UI
      // Por ejemplo, actualizar textos dinámicos, re-renderizar elementos, etc.
    };
    
    window.addEventListener('launcherLanguageChanged', handleLauncherLanguageChange);
    window.addEventListener('languageChanged', handleLauncherLanguageChange);

    // Cleanup al cerrar la página
    window.addEventListener('beforeunload', () => {
      // Restaurar fetch original si está interceptado
      restoreFetch();
      
      stopPainting();
      ui.destroy();
      window.removeEventListener('launcherLanguageChanged', handleLauncherLanguageChange);
      window.removeEventListener('languageChanged', handleLauncherLanguageChange);
      if (window.__wplaceBot) {
        window.__wplaceBot.imageRunning = false;
      }
    });

    log('✅ Auto-Image inicializado correctamente');
    
  } catch (error) {
    log('❌ Error inicializando Auto-Image:', error);
    if (window.__wplaceBot) {
      window.__wplaceBot.imageRunning = false;
    }
    throw error;
  }
}
