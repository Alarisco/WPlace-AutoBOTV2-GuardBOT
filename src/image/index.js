import { log } from "../core/logger.js";
import { imageState, IMAGE_DEFAULTS } from "./config.js";
import { BlueMarblelImageProcessor, detectAvailableColors } from "./blue-marble-processor.js";
import { processImage, stopPainting } from "./painter.js";
import { saveProgress, loadProgress, clearProgress, getProgressInfo } from "./save-load.js";
import { createImageUI } from "./ui.js";
import { showGuardDialog, saveGuardJSON, showConfirmDialog } from "./safe-guard-window.js";
import { getSession } from "../core/wplace-api.js";
import { initializeLanguage, getSection, t, getCurrentLanguage } from "../locales/index.js";
import { isPaletteOpen, autoClickPaintButton } from "../core/dom.js";
import { prepareTokensForBot } from "../core/warmup.js";
import "./plan-overlay-blue-marble.js";
import { sessionStart, sessionPing, sessionEnd, reportError } from "../core/metrics/client.js";
import { getMetricsConfig } from "../core/metrics/config.js";

export async function runImage() {
  console.log('[WPA-Image] 🚀 runImage() iniciado');
  log('🚀 Iniciando WPlace Auto-Image (versión modular)');
  
  // Inicializar sistema de idiomas
  console.log('[WPA-Image] 🌍 Inicializando sistema de idiomas');
  initializeLanguage();
  console.log('[WPA-Image] ✅ Sistema de idiomas inicializado');
  
  // Asegurarse que el estado global existe
  window.__wplaceBot = { ...window.__wplaceBot, imageRunning: true };
  console.log('[WPA-Image] 🔧 Estado global actualizado');

  // Preparar tokens con la nueva ventana de captura
  try {
    const result = await prepareTokensForBot('Auto-Image');
    if (!result.success) {
      log('⚠️ [image] Tokens no preparados, continuando con interceptor activo');
    }
  } catch (error) {
    log('❌ [image] Error preparando tokens:', error);
  }

  let currentUserInfo = null; // Variable global para información del usuario
  let originalFetch = window.fetch; // Guardar fetch original globalmente
  
  // Función para restaurar fetch original de forma segura
  const restoreFetch = () => {
    // FIX: No restaurar fetch si el overlay está activo para evitar cancelar su intercepción
    const overlayActive = window.__WPA_PLAN_OVERLAY__ && window.__WPA_PLAN_OVERLAY__.state && window.__WPA_PLAN_OVERLAY__.state.enabled;
    
    if (window.fetch !== originalFetch && !overlayActive) {
      window.fetch = originalFetch;
      log('🔄 Fetch original restaurado');
    } else if (overlayActive) {
      log('🔄 Fetch NO restaurado - overlay activo');
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
    // Iniciar sesión de métricas
    try {
      const mcfg = getMetricsConfig({ VARIANT: 'auto-image' });
      if (mcfg.ENABLED) {
        if (!window.__wplaceMetrics) window.__wplaceMetrics = {};
  log(`[METRICS] enabled → ${mcfg.BASE_URL}`);
        window.__wplaceMetrics.imageSessionActive = true;
        sessionStart({ botVariant: 'auto-image' });
        const pingEvery = Math.max(60_000, mcfg.PING_INTERVAL_MS || 300_000);
        window.__wplaceMetrics.imagePingInterval = window.setInterval(() => sessionPing({ botVariant: 'auto-image' }), pingEvery);
      }
    } catch {}
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

    // Función para auto-inicio del bot
    async function tryAutoInit() {
      log(t('image.attemptingAutoStart'));
      
      // Verificar si la paleta ya está abierta
      if (isPaletteOpen()) {
        log(t('image.paletteAlreadyOpen'));
        return true;
      }
      
      log(t('image.paletteNotFound'));
      
      // Usar la nueva función de auto-click que hace doble clic automáticamente
      const success = await autoClickPaintButton(3, true);
      
      if (success) {
        log(t('image.autoClickSuccess'));
        return true;
      } else {
        log(t('image.autoClickFailed'));
        return false;
      }
    }

    // Función para inicializar el bot (usada tanto para auto-inicio como inicio manual)
    async function initializeBot(isAutoInit = false) {
      log('🤖 Inicializando Auto-Image...');
      
      // Verificar colores disponibles
      ui.setStatus(t('image.checkingColors'), 'info');
      const colors = detectAvailableColors();
      
      if (colors.length === 0) {
        ui.setStatus(t('image.noColorsFound'), 'error');
        return false;
      }
      
      // Almacenar colores detectados en el estado global
      imageState.availableColors = colors;
      log(`✅ ${colors.length} colores almacenados en estado global`);
      
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
        imageState.maxCharges = sessionInfo.data.maxCharges || 9999; // Guardar maxCharges en state
        log(`👤 Usuario conectado: ${sessionInfo.data.user.name || 'Anónimo'} - Cargas: ${userInfo.charges}/${userInfo.maxCharges} - Píxeles: ${userInfo.pixels}`);
      } else {
        log('⚠️ No se pudo obtener información del usuario');
      }
      
      imageState.availableColors = colors;
      imageState.colorsChecked = true;
      
      ui.setStatus(t('image.colorsFound', { count: colors.length }), 'success');
      ui.updateProgress(0, 0, userInfo);
      
      // Solo mostrar log una vez (evitar duplicado en auto-inicio)
      if (!isAutoInit) {
        log(`✅ ${colors.length} colores disponibles detectados`);
      }
      
      // Marcar como inicializado exitosamente para deshabilitar el botón
      ui.setInitialized(true);
      
      // Habilitar botones de upload y load progress
      ui.enableButtonsAfterInit();

      // Inicializar plan overlay si ya hay cola previa (p.ej. reanudación)
      try {
    // Removed references to __WPA_PLAN_OVERLAY__
      } catch {
        // noop
      }
      
      return true;
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

        if (config.paintPattern !== undefined) {
          imageState.paintPattern = config.paintPattern;
          log(`🎨 Patrón de pintado cambiado a: ${config.paintPattern}`);
          
          // Si hay píxeles restantes, reaplicar el patrón
          if (imageState.remainingPixels && imageState.remainingPixels.length > 0) {
            import('./patterns.js').then(({ applyPaintPattern }) => {
              imageState.remainingPixels = applyPaintPattern(
                imageState.remainingPixels, 
                config.paintPattern, 
                imageState.imageData
              );
              
              // Actualizar overlay si está activo
              try {
                if (window.__WPA_PLAN_OVERLAY__) {
                  window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
                    enabled: true,
                    nextBatchCount: imageState.pixelsPerBatch
                  });
                  log(`✅ Overlay actualizado con nuevo patrón: ${config.paintPattern}`);
                }
              } catch (e) {
                log('⚠️ Error actualizando overlay con nuevo patrón:', e);
              }
            }).catch(error => {
              log('❌ Error aplicando nuevo patrón:', error);
            });
          }
        }
        log(`Configuración actualizada:`, config);
      },
      
      onInitBot: initializeBot,
      
      onUploadImage: async (file) => {
        try {
          ui.setStatus(t('image.loadingImage'), 'info');
          
          const imageUrl = window.URL.createObjectURL(file);
          const processor = new BlueMarblelImageProcessor(imageUrl);
          processor.originalName = file.name;
          
          await processor.load();
          
          // Inicializar paleta de colores Blue Marble
          const availableColors = processor.initializeColorPalette();
          imageState.availableColors = availableColors;
          // Tolerancia LAB por defecto ahora 100 (intentar siempre el más próximo)
          processor.setLabTolerance(100);
          
          // Analizar píxeles de la imagen
          const analysisResult = await processor.analyzePixels();
          
          // Establecer coordenadas base (se actualizarán al seleccionar posición)
          processor.setCoords(0, 0, 0, 0);
          
          // Nuevo: remapear inmediatamente a pixelart y descartar original visual (mantener copia para 'Mostrar original')
          try {
            await processor.remapImageToPalette();
            log('✅ Imagen remapeada a paleta automáticamente tras subir');
          } catch (e) {
            log('⚠️ Error remapeando imagen tras subir (continuando con original):', e);
          }
          
          // Obtener datos de imagen procesados
          const processedData = processor.getImageData();
          
          imageState.imageData = processedData;
          imageState.imageData.processor = processor; // Guardar referencia al processor para resize
          imageState.totalPixels = analysisResult.requiredPixels;
          imageState.paintedPixels = 0;
          imageState.originalImageName = file.name;
          imageState.imageLoaded = true;
          
          ui.setStatus(t('image.imageLoaded', { count: analysisResult.requiredPixels }), 'success');
          ui.updateProgress(0, analysisResult.requiredPixels, currentUserInfo);
          
          log(`✅ [BLUE MARBLE] Imagen cargada: ${processedData.width}x${processedData.height}, ${analysisResult.requiredPixels} píxeles válidos`);
          log(`✅ [BLUE MARBLE] Análisis: ${analysisResult.uniqueColors} colores únicos, ${analysisResult.defacePixels} píxeles #deface`);
          
          // Limpiar URL temporal (el overlay usa un dataURL separado)
          window.URL.revokeObjectURL(imageUrl);

          // Activar overlay de plan automáticamente cuando se carga imagen
          try {
            if (window.__WPA_PLAN_OVERLAY__) {
              window.__WPA_PLAN_OVERLAY__.injectStyles();
              window.__WPA_PLAN_OVERLAY__.setEnabled(true); // Activar automáticamente
              // Configurar ancla base con la posición del tile (será ajustada al seleccionar posición)
              window.__WPA_PLAN_OVERLAY__.setPlan([], {
                enabled: true,
                nextBatchCount: 0
              });
              log('✅ Plan overlay activado automáticamente al cargar imagen');
            }
          } catch (e) {
            log('⚠️ Error activando plan overlay:', e);
          }
          
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
                        const tileX = parseInt(tileMatch[1]);
                        const tileY = parseInt(tileMatch[2]);
                        
                        // Guardar coordenadas tile/pixel
                        imageState.tileX = tileX;
                        imageState.tileY = tileY;
                        imageState.startPosition = { x: localX, y: localY };
                        imageState.selectingPosition = false;
                        
                        // Actualizar coordenadas del procesador Blue Marble
                        if (imageState.imageData && imageState.imageData.processor) {
                          const processor = imageState.imageData.processor;
                          processor.setCoords(tileX, tileY, localX, localY);
                          
                          // Generar tiles de template una vez que tenemos coordenadas
                          try {
                            await processor.createTemplateTiles();
                            log(`✅ [BLUE MARBLE] Template tiles creados para posición tile(${tileX},${tileY}) pixel(${localX},${localY})`);
                          } catch (error) {
                            log(`❌ [BLUE MARBLE] Error creando template tiles: ${error.message}`);
                          }
                          
                          // Regenerar cola de píxeles con coordenadas actualizadas
                          const pixelQueue = processor.generatePixelQueue();
                          imageState.remainingPixels = pixelQueue;
                          // No sobrescribir totalPixels si ya fue establecido por el análisis inicial
                          if (!imageState.totalPixels || imageState.totalPixels === 0) {
                            imageState.totalPixels = pixelQueue.length;
                          }
                          
                          log(`✅ Cola de píxeles generada: ${pixelQueue.length} píxeles para overlay`);
                        }
                        
                        // Configurar overlay del plan con la posición seleccionada
                        try {
                          if (window.__WPA_PLAN_OVERLAY__) {
                            // FIX: Forzar reinicio completo del overlay
                            // Desactivar overlay para limpiar estado anterior
                            window.__WPA_PLAN_OVERLAY__.setEnabled(false);
                            
                            // Limpiar plan anterior
                            window.__WPA_PLAN_OVERLAY__.setPlan([], {});
                            
                            // Inyectar estilos y reactivar
                            window.__WPA_PLAN_OVERLAY__.injectStyles();
                            window.__WPA_PLAN_OVERLAY__.setEnabled(true);
                            
                            // Configurar ancla lógica (tile/pixel) para posicionamiento
                            window.__WPA_PLAN_OVERLAY__.setAnchor({
                              tileX: tileX,
                              tileY: tileY,
                              pxX: localX,
                              pxY: localY
                            });
                            
                            // Usar la cola de píxeles regenerada
                            if (imageState.remainingPixels && imageState.remainingPixels.length > 0) {
                              window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
                                anchor: { tileX: tileX, tileY: tileY, pxX: localX, pxY: localY },
                                imageWidth: imageState.imageData.width,
                                imageHeight: imageState.imageData.height,
                                enabled: true
                              });
                              
                              log(`✅ Plan overlay reiniciado y anclado en tile(${tileX},${tileY}) local(${localX},${localY})`);
                            } else {
                              log(`⚠️ No hay píxeles para mostrar en overlay`);
                            }
                          }
                        } catch (error) {
                          log(`❌ Error configurando overlay: ${error.message}`);
                        }
                        
                        // Restaurar fetch original inmediatamente
                        restoreFetch();
                        
                        ui.setStatus(t('image.positionSet'), 'success');
                        log(`✅ Posición establecida: tile(${imageState.tileX},${imageState.tileY}) local(${localX},${localY})`);
                        
                        // Mostrar diálogo del guard después de seleccionar posición
                        setTimeout(async () => {
                          try {
                            log('🛡️ Mostrando diálogo de Auto-Guard...');
                            const userWantsGuard = await showGuardDialog(imageState, texts);
                            if (userWantsGuard) {
                              log('✅ Usuario aceptó generar JSON para Auto-Guard');
                              // Generar datos compatibles con Auto-Guard
                              let guardData = null;
                              if (typeof ui.generateGuardJSON === 'function') {
                                guardData = ui.generateGuardJSON();
                              } else {
                                throw new Error('generateGuardJSON no está disponible en la UI');
                              }
                              await saveGuardJSON(guardData);
                            } else {
                              log('ℹ️ Usuario decidió no generar JSON para Auto-Guard');
                            }
                          } catch (error) {
                            log('❌ Error mostrando diálogo de Auto-Guard:', error);
                          }
                        }, 1000);
                        
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
                // Calcular coordenadas CSS relativas al contenedor del board para ancla CSS
                try {
                  const board = document.querySelector('canvas')?.parentElement || document.body;
                  const rect = board.getBoundingClientRect();
                  const cssX = event.clientX - rect.left;
                  const cssY = event.clientY - rect.top;
                  if (window.__WPA_PLAN_OVERLAY__) {
                    window.__WPA_PLAN_OVERLAY__.setAnchorCss(cssX, cssY);
                    log(`Plan overlay: ancla CSS establecida en (${cssX}, ${cssY})`);
                  }
                } catch (e) {
                  log('Plan Overlay: error calculando ancla CSS', e);
                }
                
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
  // Asegurar fp justo antes de iniciar el pintado manual/usuario
  // Los tokens ya están preparados por prepareTokensForBot
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
        // Siempre resetear flag de primera pasada cuando se inicia pintado
        // independientemente de si es nuevo o reanudación
        imageState.isFirstBatch = imageState.useAllChargesFirst; 

        log(`🚀 Iniciando pintado - isFirstBatch: ${imageState.isFirstBatch}, useAllChargesFirst: ${imageState.useAllChargesFirst}`);
        
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
                // Usar función optimizada para mensajes de cooldown para evitar parpadeo
                if (message.includes('⏳') && imageState.inCooldown) {
                  ui.updateCooldownMessage(message);
                } else {
                  ui.setStatus(message, 'info');
                }
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
              try { reportError(String(error?.message || error), { botVariant: 'auto-image' }); } catch {}
              imageState.running = false;
              // No resetear aquí para permitir reintentos que continúen el delta
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
            
            // Actualizar la interfaz con los valores cargados
            ui.updateUIFromState();
            
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
      
      onConfirmResize: async (processor, newWidth, newHeight, selectedColors, skipConfig) => {
        log(`🔄 Redimensionando imagen de ${processor.getDimensions().width}x${processor.getDimensions().height} a ${newWidth}x${newHeight}`);
        log(`🎨 Colores seleccionados: ${selectedColors ? selectedColors.length : 'todos'}`);
        log(`🎯 Skip Color config: ${skipConfig ? JSON.stringify(skipConfig) : 'none'}`);
        
        try {
          // Aplicar configuración Skip Color al processor
          if (skipConfig && typeof processor.setSkipColorMode === 'function') {
            processor.setSkipColorMode(skipConfig.enabled, skipConfig.threshold);
          }
          
          // Redimensionar la imagen usando Blue Marble
          await processor.resize(newWidth, newHeight);
          
          // Actualizar colores seleccionados si se proporcionaron
          if (selectedColors && selectedColors.length > 0) {
            const selectedColorObjects = imageState.availableColors.filter(color => 
              selectedColors.includes(color.id)
            );
            processor.setSelectedColors(selectedColorObjects);
            log(`🎨 Paleta actualizada con ${selectedColors.length} colores seleccionados`);
          }
          
          // Solo remapear si Skip Color NO está activo, para preservar colores originales
          if (!skipConfig || !skipConfig.enabled) {
            // Importante: remapear la imagen al estado actual de paleta/tolerancia para que el overlay
            // se base en el resultado final del procesador (no en la imagen original)
            try {
              await processor.remapImageToPalette();
              log('✅ Imagen remapeada tras redimensionado/selección antes de generar overlay');
            } catch (e) {
              log('⚠️ Error remapeando imagen tras redimensionado:', e);
            }
          } else {
            log('🎯 Skip Color activo: manteniendo imagen original sin remapear');
          }
          
          // Reanalizar imagen con nuevo tamaño usando Blue Marble (ya remapeada)
          const analysisResult = await processor.analyzePixels();
          
          // Actualizar imageState con resultados de Blue Marble
          imageState.imageData = {
            processor: processor,
            width: newWidth,
            height: newHeight,
            // Mantener compatibilidad: usar requiredPixels como validPixelCount
            validPixelCount: analysisResult.requiredPixels,
            requiredPixels: analysisResult.requiredPixels,
            totalPixels: analysisResult.totalPixels
          };
          
          imageState.totalPixels = analysisResult.requiredPixels;
          imageState.paintedPixels = 0;
          imageState.remainingPixels = []; // Resetear cola al redimensionar
          imageState.lastPosition = { x: 0, y: 0 };
          
          // Actualizar UI
          ui.updateProgress(0, analysisResult.requiredPixels, currentUserInfo);
          ui.setStatus(t('image.resizeSuccess', { width: newWidth, height: newHeight }), 'success');
          
          log(`✅ Imagen redimensionada: ${analysisResult.requiredPixels} píxeles válidos de ${analysisResult.totalPixels} totales`);

          // Ya no es necesario seleccionar posición nuevamente después del resize
          if (imageState.startPosition && imageState.tileX != null && imageState.tileY != null) {
            log('📍 Manteniendo posición previamente seleccionada tras el redimensionado');
          } else {
            log('ℹ️ No hay posición previa establecida; podrás seleccionar una cuando lo desees');
          }

          // Actualizar overlay si ya hay posición seleccionada
          try {
            if (window.__WPA_PLAN_OVERLAY__ && imageState.startPosition && imageState.tileX != null && imageState.tileY != null) {
              // Regenerar template tiles con nuevo tamaño
              await processor.createTemplateTiles();
              
              // Regenerar cola de píxeles con Blue Marble
              const pixelQueue = processor.generatePixelQueue();
              imageState.remainingPixels = pixelQueue;
              // Evitar sobrescribir totalPixels aquí; ya fue establecido por el análisis anterior
              // Mantener imageState.totalPixels basado en requiredPixels para un progreso consistente
              // if (!imageState.totalPixels || imageState.totalPixels === 0) {
              //   imageState.totalPixels = pixelQueue.length;
              // }
              
              // Actualizar overlay con nueva cola
              window.__WPA_PLAN_OVERLAY__.setPlan(pixelQueue, {
                anchor: { 
                  tileX: imageState.tileX, 
                  tileY: imageState.tileY, 
                  pxX: imageState.startPosition.x, 
                  pxY: imageState.startPosition.y 
                },
                imageWidth: newWidth,
                imageHeight: newHeight,
                enabled: true
              });
              
              log(`✅ Overlay actualizado con ${pixelQueue.length} píxeles después del resize`);
            }
          } catch (overlayError) {
            log(`⚠️ Error actualizando overlay después del resize: ${overlayError.message}`);
          }
        } catch (error) {
          log(`❌ Error redimensionando imagen: ${error.message}`);
          ui.setStatus(t('image.imageError'), 'error');
        }
      },
      
      // Función para obtener colores disponibles
      getAvailableColors: () => {
        if (imageState.availableColors && imageState.availableColors.length > 0) {
          return imageState.availableColors;
        }
        
        // Fallback: intentar detectar colores en tiempo real
        try {
          const colors = detectAvailableColors();
          imageState.availableColors = colors;
          return colors;
        } catch (error) {
          log('⚠️ Error obteniendo colores disponibles:', error);
          return [];
        }
      },
      
      // Función para manejar cambios en la selección de colores
      onColorSelectionChange: (selectedColorIds) => {
        log(`🎨 Selección de colores cambiada: ${selectedColorIds.length} colores seleccionados`);
        // Esta información se usará en onConfirmResize
      },
      
      // Función para generar JSON compatible con Auto-Guard.js
      generateGuardJSON: () => {
        if (!imageState.imageLoaded || !imageState.imageData || !imageState.startPosition || imageState.tileX == null || imageState.tileY == null) {
          throw new Error('Datos insuficientes para generar JSON del Guard. Asegúrate de haber cargado una imagen y seleccionado una posición.');
        }
        
        const processor = imageState.imageData.processor;
        if (!processor) {
          throw new Error('Procesador de imagen no disponible.');
        }
        
        // Calcular área de protección basada en la imagen y posición
        const { width, height } = imageState.imageData;
        const { x: startX, y: startY } = imageState.startPosition;
        const { tileX, tileY } = imageState;
        
        // Convertir coordenadas locales a coordenadas globales del canvas
        const globalStartX = (tileX * 1000) + startX;
        const globalStartY = (tileY * 1000) + startY;
        const globalEndX = globalStartX + width - 1;
        const globalEndY = globalStartY + height - 1;
        
        // Generar TODOS los píxeles de la imagen (no solo los restantes)
        const allPixels = processor.generatePixelQueue();
        const originalPixels = [];
        
        // Helper para normalizar modulo positivo 0..999
        const mod1000 = (v) => ((v % 1000) + 1000) % 1000;
        const getColorId = (rgb) => {
          // Intentar obtener id directamente, o resolver por coincidencia exacta de RGB en la paleta disponible
          if (rgb && typeof rgb.id !== 'undefined') return rgb.id;
          const palette = imageState.availableColors || [];
          const found = palette.find(c => c.r === rgb.r && c.g === rgb.g && c.b === rgb.b);
          return found ? found.id : undefined;
        };
        
        if (allPixels && allPixels.length > 0) {
          allPixels.forEach(pixel => {
            // Coordenadas globales para el Guard
            const pxGlobalX = (typeof pixel.globalX === 'number') ? pixel.globalX : ((tileX * 1000) + startX + pixel.imageX);
            const pxGlobalY = (typeof pixel.globalY === 'number') ? pixel.globalY : ((tileY * 1000) + startY + pixel.imageY);
            const key = `${pxGlobalX},${pxGlobalY}`;
            
            // Calcular tile/local por píxel (preferir los provistos por el generador si existen)
            const pxTileX = (typeof pixel.tileX === 'number') ? pixel.tileX : Math.floor(pxGlobalX / 1000);
            const pxTileY = (typeof pixel.tileY === 'number') ? pixel.tileY : Math.floor(pxGlobalY / 1000);
            const pxLocalX = (typeof pixel.localX === 'number') ? pixel.localX : mod1000(pxGlobalX);
            const pxLocalY = (typeof pixel.localY === 'number') ? pixel.localY : mod1000(pxGlobalY);
            
            const rgb = pixel.color || pixel.targetColor || {};
            const colorId = getColorId(rgb);
            
            originalPixels.push({
              key,
              // Colores en nivel superior (formato esperado por Guard)
              r: rgb.r,
              g: rgb.g,
              b: rgb.b,
              colorId: typeof colorId !== 'undefined' ? colorId : null,
              // Metadatos de coordenadas (compatibles con Guard)
              globalX: pxGlobalX,
              globalY: pxGlobalY,
              localX: pxLocalX,
              localY: pxLocalY,
              tileX: pxTileX,
              tileY: pxTileY
            });
          });
        }
        
        // Crear estructura JSON compatible con Guard
        const guardData = {
          version: "1.0",
          timestamp: Date.now(),
          protectionData: {
            area: {
              x1: globalStartX,
              y1: globalStartY,
              x2: globalEndX,
              y2: globalEndY
            },
            protectedPixels: originalPixels.length,
            splitInfo: null // No dividir por defecto
          },
          progress: {
            totalRepaired: 0,
            lastCheck: Date.now()
          },
          config: {
            maxProtectionSize: 100000,
            pixelsPerBatch: 50,
            checkInterval: 10000
          },
          colors: (imageState.availableColors || []).map(color => ({
            id: color.id,
            r: color.r,
            g: color.g,
            b: color.b
          })),
          // IMPORTANTE: el formato debe coincidir con save-load.js del Guard
          originalPixels: originalPixels
        };
        
        log(`✅ JSON del Guard generado: área (${globalStartX},${globalStartY}) a (${globalEndX},${globalEndY}), ${originalPixels.length} píxeles de ${allPixels?.length || 0} totales`);
         return guardData;
       }
       
       // Las funciones showGuardDialog y saveGuardJSON ahora se importan desde safe-guard-window.js
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
      try {
        const mcfg = getMetricsConfig();
        if (mcfg.ENABLED && window.__wplaceMetrics?.imageSessionActive) {
          sessionEnd({ botVariant: 'auto-image' });
          window.__wplaceMetrics.imageSessionActive = false;
        }
        if (window.__wplaceMetrics?.imagePingInterval) {
          window.clearInterval(window.__wplaceMetrics.imagePingInterval);
          window.__wplaceMetrics.imagePingInterval = null;
        }
        if (window.__wplaceMetrics?.imageVisibilityHandler) {
          document.removeEventListener('visibilitychange', window.__wplaceMetrics.imageVisibilityHandler);
          delete window.__wplaceMetrics.imageVisibilityHandler;
        }
        if (window.__wplaceMetrics?.imageFocusHandler) {
          window.removeEventListener('focus', window.__wplaceMetrics.imageFocusHandler);
          delete window.__wplaceMetrics.imageFocusHandler;
        }
      } catch {}
    });

    log('✅ Auto-Image inicializado correctamente');
    
    // Considerar al usuario online aunque esté ocioso: ping al recuperar visibilidad/foco
    try {
      const mcfg = getMetricsConfig();
      if (mcfg.ENABLED) {
        const visibilityHandler = () => {
          if (!document.hidden) {
            try { sessionPing({ botVariant: 'auto-image', metadata: { reason: 'visibility' } }); } catch {}
          }
        };
        const focusHandler = () => {
          try { sessionPing({ botVariant: 'auto-image', metadata: { reason: 'focus' } }); } catch {}
        };
        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('focus', focusHandler);
        window.__wplaceMetrics = window.__wplaceMetrics || {};
        window.__wplaceMetrics.imageVisibilityHandler = visibilityHandler;
        window.__wplaceMetrics.imageFocusHandler = focusHandler;
      }
    } catch {}

    // Intentar auto-inicio después de que la UI esté lista
    setTimeout(async () => {
      try {
        ui.setStatus(t('image.autoInitializing'), 'info');
        log('🤖 Intentando auto-inicio...');
        
        const autoInitSuccess = await tryAutoInit();
        
        if (autoInitSuccess) {
          ui.setStatus(t('image.autoInitSuccess'), 'success');
          log('✅ Auto-inicio exitoso');
          
          // Ocultar el botón de inicialización manual
          ui.setInitButtonVisible(false);
          
          // Ejecutar la lógica de inicialización del bot
          const initResult = await initializeBot(true); // true = es auto-inicio
          if (initResult) {
            log('🚀 Bot auto-iniciado completamente');
          }
        } else {
          ui.setStatus(t('image.autoInitFailed'), 'warning');
          log('⚠️ Auto-inicio falló, se requiere inicio manual');
          // El botón de inicio manual permanece visible
        }
      } catch (error) {
        log('❌ Error en auto-inicio:', error);
        ui.setStatus(t('image.manualInitRequired'), 'warning');
      }
    }, 1000); // Esperar 1 segundo para que la UI esté completamente cargada
    
  } catch (error) {
    log('❌ Error inicializando Auto-Image:', error);
    if (window.__wplaceBot) {
      window.__wplaceBot.imageRunning = false;
    }
    throw error;
  }
}
