import { log } from "../core/logger.js";
import { imageState } from "./config.js";
import { createColorPaletteSelector } from "./color-palette-selector.js";
import { registerWindow, unregisterWindow, bringWindowToFront } from '../core/window-manager.js';

/**
 * Crea y gestiona el diálogo de redimensionamiento de imagen
 */
export function createResizeWindow(texts = {}) {
  let resizeElements = null;

  // Crear elementos del diálogo de redimensionamiento
  function createResizeElements(container) {
    // Crear ventana navegable directamente en el body (no en el container shadow root)
    const resizeWindow = document.createElement('div');
    resizeWindow.style.cssText = `
      position: fixed;
      top: 50px;
      left: 50px;
      width: 450px;
      min-width: 350px;
      max-width: 600px;
      min-height: 400px;
      max-height: 80vh;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      color: #eee;
      font-family: 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      resize: both;
      overflow: auto;
      display: none;
      flex-direction: column;
    `;

  // (sin estilos extra: checkbox simple para 'Original')

    resizeWindow.innerHTML = `
      <div style="padding: 12px 15px; background: #2d3748; color: #60a5fa; font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: move; flex-shrink: 0;" class="resize-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          🔧 <span>${texts.resizeTitle}</span>
        </div>
        <div style="display: flex; gap: 5px;">
          <button id="minimizeResizeBtn" style="background: none; border: none; color: #eee; cursor: pointer; opacity: 0.7; padding: 5px; transition: opacity 0.2s ease;">➖</button>
          <button id="closeResizeBtn" style="background: none; border: none; color: #eee; cursor: pointer; opacity: 0.7; padding: 5px; transition: opacity 0.2s ease;">✖️</button>
        </div>
      </div>
      
      <div style="padding: 15px; flex: 1; overflow-y: auto;" class="resize-content">
        <div class="resize-preview-container" style="display: flex; align-items: center; justify-content: center; text-align: center; margin-bottom: 8px; height: 320px; overflow: hidden; padding: 8px; background: #111; border: 1px solid #333; border-radius: 6px;">
          <img class="resize-preview" alt="Vista previa" draggable="false" style="image-rendering: pixelated; image-rendering: crisp-edges; display: block; margin: 0 auto; width: 100%; height: 100%; object-fit: contain; -webkit-user-drag: none; user-select: none;">
        </div>
        <div class="resize-preview-info" style="font-size: 12px; color: #aaa; text-align: center; margin-bottom: 12px;"></div>
        
        <div class="resize-controls" style="display: flex; flex-direction: column; gap: 15px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <label style="color: #ffffff; font-size: 14px; display: flex; align-items: center; gap: 8px; margin: 0;">
              <input type="checkbox" class="toggle-original">
              ${texts.resizeOriginal}
            </label>
            <div style="display: flex; align-items: center; gap: 8px; margin-left: auto;">
              <label style="color: #ffffff; font-size: 14px; white-space: nowrap;">${texts.resizeToleranceLab}</label>
              <input type="range" class="lab-tolerance" min="0" max="100" step="1" value="100">
              <span class="lab-tolerance-value" style="color:#aaa; font-size:12px;">100</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #ffffff; font-size: 14px;">${texts.resizeWidth}: <span class="width-value"></span>px</label>
            <input type="range" class="resize-slider width-slider" min="50" max="2000" step="1" style="width: 100%;">
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #ffffff; font-size: 14px;">${texts.resizeHeight}: <span class="height-value"></span>px</label>
            <input type="range" class="resize-slider height-slider" min="50" max="2000" step="1" style="width: 100%;">
          </div>
          
          <label style="color: #ffffff; font-size: 14px; display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" class="maintain-aspect" checked>
            ${texts.resizeKeepAspect}
          </label>
        </div>
        
        <!-- Aquí se insertará el selector de paleta de colores -->
        
        <!-- Sección Skip Color -->
        <div class="skip-color-section" style="display: none; margin-top: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 15px; border: 1px solid rgba(255,255,255,0.1);">
          <div class="skip-color-title" style="font-size: 14px; font-weight: 600; color: #60a5fa; margin-bottom: 12px; display: flex; align-items: center;">
            <span>🎯 Skip Color</span>
          </div>
          <div class="skip-color-controls" style="display: flex; flex-direction: column; gap: 12px;">
            <label style="color: #ffffff; font-size: 14px; display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" class="skip-color-enabled" style="cursor: pointer;">
              <span>Skip colors that don't match exactly</span>
            </label>
            <div class="skip-threshold-container" style="display: none; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="color: #ffffff; font-size: 14px; white-space: nowrap;">Similarity threshold:</label>
                <input type="range" class="skip-threshold-slider" min="0" max="100" step="1" value="100" style="flex: 1;">
                <span class="skip-threshold-value" style="color: #aaa; font-size: 12px; min-width: 35px;">100%</span>
              </div>
              <div class="skip-threshold-description" style="font-size: 12px; color: #aaa; padding: 8px; background: rgba(0,0,0,0.2); border-radius: 4px; border-left: 3px solid #60a5fa;">
                <span class="skip-description-text">Only exact color matches will be painted (100% similarity).</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="resize-buttons" style="display: flex; gap: 10px; margin-top: 20px;">
          <button class="btn btn-primary confirm-resize" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">✅ ${texts.resizeApply}</button>
          <button class="btn btn-secondary cancel-resize" style="flex: 1; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">❌ ${texts.resizeCancel}</button>
        </div>
      </div>
      
      <!-- Indicador de redimensionamiento -->
      <div style="
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background: linear-gradient(-45deg, transparent 30%, #666 30%, #666 40%, transparent 40%, transparent 60%, #666 60%, #666 70%, transparent 70%);
        cursor: nw-resize;
        border-bottom-right-radius: 8px;
      "></div>
    `;

    document.body.appendChild(resizeWindow);

    // Obtener referencias a los elementos
    resizeElements = {
      overlay: resizeWindow,
      container: resizeWindow,
      preview: resizeWindow.querySelector('.resize-preview'),
      previewContainer: resizeWindow.querySelector('.resize-preview-container'),
      widthSlider: resizeWindow.querySelector('.width-slider'),
      heightSlider: resizeWindow.querySelector('.height-slider'),
      widthValue: resizeWindow.querySelector('.width-value'),
      heightValue: resizeWindow.querySelector('.height-value'),
      maintainAspect: resizeWindow.querySelector('.maintain-aspect'),
      confirmBtn: resizeWindow.querySelector('.confirm-resize'),
      cancelBtn: resizeWindow.querySelector('.cancel-resize'),
      colorPaletteSelector: null,
      resizeWindow: resizeWindow,
      resizeHeader: resizeWindow.querySelector('.resize-header'),
      minimizeBtn: resizeWindow.querySelector('#minimizeResizeBtn'),
      closeBtn: resizeWindow.querySelector('#closeResizeBtn'),
      resizeContent: resizeWindow.querySelector('.resize-content'),
      previewInfo: resizeWindow.querySelector('.resize-preview-info'),
      toggleOriginal: resizeWindow.querySelector('.toggle-original'),
      labTolerance: resizeWindow.querySelector('.lab-tolerance'),
      labToleranceValue: resizeWindow.querySelector('.lab-tolerance-value'),
      // Skip Color elements
      skipColorSection: resizeWindow.querySelector('.skip-color-section'),
      skipColorEnabled: resizeWindow.querySelector('.skip-color-enabled'),
      skipThresholdContainer: resizeWindow.querySelector('.skip-threshold-container'),
      skipThresholdSlider: resizeWindow.querySelector('.skip-threshold-slider'),
      skipThresholdValue: resizeWindow.querySelector('.skip-threshold-value'),
      skipDescriptionText: resizeWindow.querySelector('.skip-description-text')
    };

    // Evitar arrastre nativo dentro de la ventana (especialmente imágenes)
    resizeWindow.addEventListener('dragstart', (e) => e.preventDefault());
    if (resizeElements.preview) {
      resizeElements.preview.addEventListener('dragstart', (e) => e.preventDefault());
    }

    // Hacer la ventana arrastrable
    makeDraggable(resizeWindow, resizeElements.resizeHeader);

    // Funcionalidad de minimizar
    let isMinimized = false;
    resizeElements.minimizeBtn.addEventListener('click', () => {
      isMinimized = !isMinimized;
      if (isMinimized) {
        resizeElements.resizeContent.style.display = 'none';
        resizeWindow.style.height = 'auto';
        resizeWindow.style.resize = 'none';
        resizeElements.minimizeBtn.textContent = '➕';
      } else {
        resizeElements.resizeContent.style.display = 'block';
        resizeWindow.style.resize = 'both';
        resizeElements.minimizeBtn.textContent = '➖';
      }
    });

    // Funcionalidad de cerrar
    resizeElements.closeBtn.addEventListener('click', () => {
      closeResizeDialog();
    });

    // Registrar la ventana
    registerWindow(resizeWindow);

    log('✅ Elementos del diálogo de redimensionamiento creados');
  }



  // Mostrar el diálogo de redimensionamiento
  function showResizeDialog(processor, handlers = {}) {
    if (!resizeElements) {
      log('❌ Error: Elementos de redimensionamiento no inicializados');
      return;
    }
    
    // Obtener dimensiones del processor
    const dimensions = processor.getDimensions();
    const originalWidth = dimensions.width;
    const originalHeight = dimensions.height;
    let currentWidth = originalWidth;
    let currentHeight = originalHeight;
    let aspectRatio = originalWidth / originalHeight;
    
    // Función helper para actualizar la vista previa de forma ligera o con paleta
    const updatePreview = (usePalette = false, selectedColorsForPreview = null) => {
      try {
        const imgW = currentWidth;
        const imgH = currentHeight;

        let dataUrl = null;
        let stats = null;

        // Si el usuario quiere ver el original, usar preview original
        if (resizeElements.toggleOriginal && resizeElements.toggleOriginal.checked && typeof processor.generateOriginalPreview === 'function') {
          dataUrl = processor.generateOriginalPreview(imgW, imgH);
        } else if (usePalette && typeof processor.generatePreviewWithPalette === 'function') {
          // Si nos pasan selección, aplicarla
          if (Array.isArray(selectedColorsForPreview)) {
            processor.setSelectedColors(selectedColorsForPreview);
          }
          const result = processor.generatePreviewWithPalette(imgW, imgH);
          dataUrl = result?.dataUrl || null;
          stats = result?.stats || null;
        } else {
          // Preview normal sin restricciones
          dataUrl = processor.generatePreview(imgW, imgH);
        }
        if (dataUrl) {
          resizeElements.preview.src = dataUrl;
        }

        // Actualizar info de previsualización
        if (resizeElements.previewInfo) {
          const total = imgW * imgH;
          let extra = '';
          if (stats) {
            extra = ` | Exact: ${stats.exact.toLocaleString()} | LAB: ${stats.lab.toLocaleString()} | Removed: ${stats.removed.toLocaleString()}`;
          }
          resizeElements.previewInfo.textContent = `${imgW}×${imgH} px | Total: ${total.toLocaleString()} píxeles${extra}`;
        }
      } catch (e) {
        log('⚠️ Error generando vista previa:', e);
      }
    };

    // Configurar sliders
    resizeElements.widthSlider.value = originalWidth;
    resizeElements.heightSlider.value = originalHeight;
    resizeElements.widthValue.textContent = originalWidth;
    resizeElements.heightValue.textContent = originalHeight;

    // Configurar el selector de paleta de colores
    if (!resizeElements.colorPaletteSelector) {
      const colorPaletteContainer = resizeElements.container.querySelector('.resize-content') || resizeElements.container;
      // Usar colores cacheados en el estado para inicializar el selector, evitando depender del DOM de la paleta del sitio
      const initialColors = Array.isArray(imageState?.availableColors) ? imageState.availableColors : [];
      resizeElements.colorPaletteSelector = createColorPaletteSelector(colorPaletteContainer, initialColors);
    }

  // Event listeners para los sliders
    function updateWidth() {
      currentWidth = parseInt(resizeElements.widthSlider.value);
      resizeElements.widthValue.textContent = currentWidth;
      
      if (resizeElements.maintainAspect.checked) {
        currentHeight = Math.round(currentWidth / aspectRatio);
        resizeElements.heightSlider.value = currentHeight;
        resizeElements.heightValue.textContent = currentHeight;
      }
      // Siempre usar preview con paleta activa
      const selectedIds = resizeElements.colorPaletteSelector?.getSelectedColors?.() || [];
      const sourceColors = imageState?.availableColors || [];
      const byId = new Map(sourceColors.map(c => [c.id, c]));
      const palette = selectedIds.map(id => byId.get(id)).filter(Boolean);
      updatePreview(true, palette);
    }
    
    function updateHeight() {
      currentHeight = parseInt(resizeElements.heightSlider.value);
      resizeElements.heightValue.textContent = currentHeight;
      
      if (resizeElements.maintainAspect.checked) {
        currentWidth = Math.round(currentHeight * aspectRatio);
        resizeElements.widthSlider.value = currentWidth;
        resizeElements.widthValue.textContent = currentWidth;
      }
      const selectedIds = resizeElements.colorPaletteSelector?.getSelectedColors?.() || [];
      const sourceColors = imageState?.availableColors || [];
      const byId = new Map(sourceColors.map(c => [c.id, c]));
      const palette = selectedIds.map(id => byId.get(id)).filter(Boolean);
      updatePreview(true, palette);
    }

    function handleToggleOriginal() {
      // Cambiar preview entre original y paleta actual
      const selectedIds = resizeElements.colorPaletteSelector?.getSelectedColors?.() || [];
      const sourceColors = imageState?.availableColors || [];
      const byId = new Map(sourceColors.map(c => [c.id, c]));
      const palette = selectedIds.map(id => byId.get(id)).filter(Boolean);
      updatePreview(true, palette);
    }

    function handleLabToleranceChange() {
      const val = parseInt(resizeElements.labTolerance.value) || 0;
      resizeElements.labToleranceValue.textContent = String(val);
      try { processor.setLabTolerance(val); } catch {}
      // Regenerar preview con nueva tolerancia
      const selectedIds = resizeElements.colorPaletteSelector?.getSelectedColors?.() || [];
      const sourceColors = imageState?.availableColors || [];
      const byId = new Map(sourceColors.map(c => [c.id, c]));
      const palette = selectedIds.map(id => byId.get(id)).filter(Boolean);
      updatePreview(true, palette);
    }

    function handleMaintainAspectChange() {
      // Recalcular la otra dimensión para respetar la proporción actual
      if (resizeElements.maintainAspect.checked) {
        // Ajustar alto en base al ancho actual
        currentWidth = parseInt(resizeElements.widthSlider.value);
        currentHeight = Math.round(currentWidth / aspectRatio);
        resizeElements.heightSlider.value = currentHeight;
        resizeElements.heightValue.textContent = currentHeight;
      }
      updatePreview();
    }
    
    // Limpiar event listeners anteriores
    resizeElements.widthSlider.removeEventListener('input', updateWidth);
    resizeElements.heightSlider.removeEventListener('input', updateHeight);
    resizeElements.maintainAspect.removeEventListener('change', handleMaintainAspectChange);
    
    // Agregar nuevos event listeners
    resizeElements.widthSlider.addEventListener('input', updateWidth);
    resizeElements.heightSlider.addEventListener('input', updateHeight);
    resizeElements.maintainAspect.addEventListener('change', handleMaintainAspectChange);
    if (resizeElements.toggleOriginal) {
      resizeElements.toggleOriginal.removeEventListener('change', handleToggleOriginal);
      resizeElements.toggleOriginal.addEventListener('change', handleToggleOriginal);
    }
    if (resizeElements.labTolerance) {
      resizeElements.labTolerance.removeEventListener('input', handleLabToleranceChange);
      resizeElements.labTolerance.addEventListener('input', handleLabToleranceChange);
      // Inicializar con tolerancia del processor si existe
  const initialTol = Math.min(100, Math.max(0, Math.round(processor.labTolerance ?? 100)));
      resizeElements.labTolerance.value = String(initialTol);
      resizeElements.labToleranceValue.textContent = String(initialTol);
    }

    // Función para obtener colores seleccionados
     function getSelectedColors() {
       if (resizeElements.colorPaletteSelector && resizeElements.colorPaletteSelector.getSelectedColors) {
         return resizeElements.colorPaletteSelector.getSelectedColors();
       }
       // Fallback: buscar swatches activos en la paleta
       const activeSwatches = resizeElements.colorPaletteSelector?.element?.querySelectorAll('.wplace-color-swatch.active');
       return activeSwatches ? Array.from(activeSwatches).map(s => parseInt(s.dataset.colorId)) : [];
     }
     
     // Función para configurar la paleta de colores
     function setupColorPalette(colors) {
       if (!colors || !resizeElements.colorPaletteSelector) return;
       
       // El selector de paleta ya maneja la configuración de colores internamente
       if (resizeElements.colorPaletteSelector.updateAvailableColors) {
         resizeElements.colorPaletteSelector.updateAvailableColors(colors);
       }
     }
    
    // Event listener para el botón de confirmar
     function handleConfirm() {
       const selectedColors = getSelectedColors();
       
       // Obtener configuración de Skip Color
       const skipConfig = {
         enabled: resizeElements.skipColorEnabled ? resizeElements.skipColorEnabled.checked : false,
         threshold: resizeElements.skipThresholdSlider ? parseInt(resizeElements.skipThresholdSlider.value) || 100 : 100
       };
       
       if (handlers.onConfirmResize) {
         handlers.onConfirmResize(processor, currentWidth, currentHeight, selectedColors, skipConfig);
       }
       closeResizeDialog();
     }
    
    // Event listener para el botón de cancelar
    function handleCancel() {
      closeResizeDialog();
    }
    
    // Limpiar event listeners anteriores
    resizeElements.confirmBtn.removeEventListener('click', handleConfirm);
    resizeElements.cancelBtn.removeEventListener('click', handleCancel);
    
    // Agregar nuevos event listeners
    resizeElements.confirmBtn.addEventListener('click', handleConfirm);
    resizeElements.cancelBtn.addEventListener('click', handleCancel);
    
    // Configurar selector de colores
     if (handlers.getAvailableColors) {
       // Intentar obtener colores desde el handler; si no hay, mantener los cacheados
       const colors = handlers.getAvailableColors();
       if (Array.isArray(colors) && colors.length > 0) {
         setupColorPalette(colors);
       } else if (Array.isArray(imageState?.availableColors) && imageState.availableColors.length > 0) {
         setupColorPalette(imageState.availableColors);
       }
     }

    // Mostrar la sección Skip Color después de configurar la paleta
    if (resizeElements.skipColorSection) {
      resizeElements.skipColorSection.style.display = 'block';
    }

    // Funciones para manejar Skip Color
    function updateSkipDescription(threshold) {
      if (!resizeElements.skipDescriptionText) return;
      
      if (threshold === 100) {
        resizeElements.skipDescriptionText.textContent = "Only exact color matches will be painted (100% similarity).";
      } else if (threshold >= 90) {
        resizeElements.skipDescriptionText.textContent = `Very strict matching: colors must be at least ${threshold}% similar to be painted.`;
      } else if (threshold >= 70) {
        resizeElements.skipDescriptionText.textContent = `Moderate matching: colors must be at least ${threshold}% similar to be painted.`;
      } else if (threshold >= 50) {
        resizeElements.skipDescriptionText.textContent = `Loose matching: colors must be at least ${threshold}% similar to be painted.`;
      } else {
        resizeElements.skipDescriptionText.textContent = `Very loose matching: colors must be at least ${threshold}% similar to be painted.`;
      }
    }

    function handleSkipColorToggle() {
      const isEnabled = resizeElements.skipColorEnabled.checked;
      
      if (resizeElements.skipThresholdContainer) {
        resizeElements.skipThresholdContainer.style.display = isEnabled ? 'flex' : 'none';
      }
      
      // Aplicar configuración al processor
      if (processor && typeof processor.setSkipColorMode === 'function') {
        const threshold = parseInt(resizeElements.skipThresholdSlider.value) || 100;
        processor.setSkipColorMode(isEnabled, threshold);
      }
      
      // Actualizar preview inmediatamente
      const selectedIds = resizeElements.colorPaletteSelector?.getSelectedColors?.() || [];
      const sourceColors = imageState?.availableColors || [];
      const byId = new Map(sourceColors.map(c => [c.id, c]));
      const palette = selectedIds.map(id => byId.get(id)).filter(Boolean);
      updatePreview(true, palette);
      
      log(`🎯 Skip Color ${isEnabled ? 'enabled' : 'disabled'}`);
    }

    function handleSkipThresholdChange() {
      const threshold = parseInt(resizeElements.skipThresholdSlider.value) || 100;
      resizeElements.skipThresholdValue.textContent = `${threshold}%`;
      
      updateSkipDescription(threshold);
      
      // Aplicar configuración al processor
      if (processor && typeof processor.setSkipColorMode === 'function') {
        const isEnabled = resizeElements.skipColorEnabled.checked;
        processor.setSkipColorMode(isEnabled, threshold);
      }
      
      // Actualizar preview inmediatamente
      const selectedIds = resizeElements.colorPaletteSelector?.getSelectedColors?.() || [];
      const sourceColors = imageState?.availableColors || [];
      const byId = new Map(sourceColors.map(c => [c.id, c]));
      const palette = selectedIds.map(id => byId.get(id)).filter(Boolean);
      updatePreview(true, palette);
    }

    // Event listeners para Skip Color
    if (resizeElements.skipColorEnabled) {
      resizeElements.skipColorEnabled.removeEventListener('change', handleSkipColorToggle);
      resizeElements.skipColorEnabled.addEventListener('change', handleSkipColorToggle);
    }
    
    if (resizeElements.skipThresholdSlider) {
      resizeElements.skipThresholdSlider.removeEventListener('input', handleSkipThresholdChange);
      resizeElements.skipThresholdSlider.addEventListener('input', handleSkipThresholdChange);
      
      // Inicializar valores por defecto
      resizeElements.skipThresholdSlider.value = '100';
      resizeElements.skipThresholdValue.textContent = '100%';
      updateSkipDescription(100);
    }
     
     // Configurar callback de selección de color
     if (resizeElements.colorPaletteSelector && resizeElements.colorPaletteSelector.onSelectionChange) {
       resizeElements.colorPaletteSelector.onSelectionChange((selectedColorIds) => {
         // Mapear IDs seleccionados a objetos de color desde availableColors en estado/handler
         let palette = [];
         const sourceColors = (typeof handlers.getAvailableColors === 'function')
           ? handlers.getAvailableColors()
           : (Array.isArray(imageState?.availableColors) ? imageState.availableColors : []);
         if (Array.isArray(sourceColors) && sourceColors.length > 0) {
           const byId = new Map(sourceColors.map(c => [c.id, c]));
           palette = selectedColorIds.map(id => byId.get(id)).filter(Boolean);
         }

         // Notificar a UI/handlers
         if (typeof handlers.onColorSelectionChange === 'function') {
           handlers.onColorSelectionChange(selectedColorIds);
         }

         // Actualizar preview aplicando paleta seleccionada con matching LAB
         updatePreview(true, palette);

         // Si no hay opciones disponibles, informar claramente en la UI
         if (!palette || palette.length === 0) {
           try {
             resizeElements.previewInfo.textContent += ' | Sin colores seleccionados: se ocultarán los píxeles sin opción disponible';
           } catch {}
         }
       });
     }
    
    // Mostrar diálogo
    resizeElements.resizeWindow.style.display = 'flex';
    
    // Traer la ventana al frente
    bringWindowToFront(resizeElements.resizeWindow);

    // Observador para cambios de tamaño del contenedor de vista previa
    if (resizeElements.previewResizeObserver) {
      try { resizeElements.previewResizeObserver.disconnect(); } catch (_) {}
    }
    if (window.ResizeObserver) {
      resizeElements.previewResizeObserver = new window.ResizeObserver(() => updatePreview());
      if (resizeElements.previewContainer) {
        resizeElements.previewResizeObserver.observe(resizeElements.previewContainer);
      }
    } else {
      // Fallback: escuchar resize de ventana
      resizeElements.onWindowResize = () => updatePreview();
      window.addEventListener('resize', resizeElements.onWindowResize, { passive: true });
    }

  // Generar vista previa inicial (si hay selección previa respetarla)
  // Preview inicial: usar paleta inicial (si no hay selección, se usa paleta activa por defecto)
  const initialIds = resizeElements.colorPaletteSelector?.getSelectedColors?.() || [];
  const sourceColors = imageState?.availableColors || [];
  const byId = new Map(sourceColors.map(c => [c.id, c]));
  const initialPalette = initialIds.map(id => byId.get(id)).filter(Boolean);
  updatePreview(true, initialPalette);
    
    log('📏 Diálogo de redimensionamiento mostrado');
  }

  // Función para hacer una ventana arrastrable
  function makeDraggable(element, handle) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const isInteractive = (el) => !!el.closest('button, input, select, textarea, a, label, .btn');

    handle.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag, { passive: false });
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
      // Solo iniciar si el click fue dentro del handle y no en un control interactivo
      if (!handle.contains(e.target) || isInteractive(e.target)) return;

      e.preventDefault();
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      isDragging = true;
      // Evitar selección de texto durante el arrastre
      element.style.userSelect = 'none';
      document.body.style.userSelect = 'none';
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        element.style.left = currentX + 'px';
        element.style.top = currentY + 'px';
      }
    }

    function dragEnd() {
      isDragging = false;
      // Restaurar selección de texto
      element.style.userSelect = '';
      document.body.style.userSelect = '';
    }
  }

  // Cerrar el diálogo de redimensionamiento
  function closeResizeDialog() {
    if (!resizeElements || !resizeElements.resizeWindow) {
      log('❌ Error: Elementos de redimensionamiento no encontrados');
      return;
    }
    
    resizeElements.resizeWindow.style.display = 'none';

    // Desregistrar la ventana
    unregisterWindow(resizeElements.resizeWindow);

    // Limpiar observers/listeners
    if (resizeElements.previewResizeObserver) {
      try { resizeElements.previewResizeObserver.disconnect(); } catch (_) {}
      resizeElements.previewResizeObserver = null;
    }
    if (resizeElements.onWindowResize) {
      window.removeEventListener('resize', resizeElements.onWindowResize);
      resizeElements.onWindowResize = null;
    }

    log('📏 Diálogo de redimensionamiento cerrado');
  }

  // Inicializar el diálogo
  function initialize(container) {
    createResizeElements(container);
    log('✅ Ventana de redimensionamiento inicializada');
  }

  return {
    initialize,
    showResizeDialog,
    closeResizeDialog
  };
}