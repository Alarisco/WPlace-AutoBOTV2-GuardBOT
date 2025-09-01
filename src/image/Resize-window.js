import { log } from "../core/logger.js";
import { createColorPaletteSelector } from "./color-palette-selector.js";
import { registerWindow, unregisterWindow } from '../core/window-manager.js';

/**
 * Crea y gestiona el diálogo de redimensionamiento de imagen
 */
export function createResizeWindow() {
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
      z-index: 9999;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      resize: both;
      overflow: auto;
      display: none;
      flex-direction: column;
    `;

    resizeWindow.innerHTML = `
      <div style="padding: 12px 15px; background: #2d3748; color: #60a5fa; font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: move; flex-shrink: 0;" class="resize-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          🔧 <span>Redimensionar Imagen</span>
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
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #ffffff; font-size: 14px;">Ancho: <span class="width-value"></span>px</label>
            <input type="range" class="resize-slider width-slider" min="50" max="2000" step="1" style="width: 100%;">
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #ffffff; font-size: 14px;">Alto: <span class="height-value"></span>px</label>
            <input type="range" class="resize-slider height-slider" min="50" max="2000" step="1" style="width: 100%;">
          </div>
          
          <label style="color: #ffffff; font-size: 14px; display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" class="maintain-aspect" checked>
            Mantener proporción
          </label>
        </div>
        
        <!-- Aquí se insertará el selector de paleta de colores -->
        
        <div class="resize-buttons" style="display: flex; gap: 10px; margin-top: 20px;">
          <button class="btn btn-primary confirm-resize" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">✅ Aplicar</button>
          <button class="btn btn-secondary cancel-resize" style="flex: 1; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">❌ Cancelar</button>
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
      previewInfo: resizeWindow.querySelector('.resize-preview-info')
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
    
    // Función helper para actualizar la vista previa de forma ligera
    const updatePreview = () => {
      try {
        const imgW = currentWidth;
        const imgH = currentHeight;

        // Generar una única previsualización al tamaño seleccionado
        const dataUrl = processor.generatePreview(imgW, imgH);
        resizeElements.preview.src = dataUrl;

        // Actualizar info de previsualización
        if (resizeElements.previewInfo) {
          const total = imgW * imgH;
          resizeElements.previewInfo.textContent = `${imgW}×${imgH} px | Total: ${total.toLocaleString()} píxeles`;
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
      resizeElements.colorPaletteSelector = createColorPaletteSelector(colorPaletteContainer);
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
      updatePreview();
    }
    
    function updateHeight() {
      currentHeight = parseInt(resizeElements.heightSlider.value);
      resizeElements.heightValue.textContent = currentHeight;
      
      if (resizeElements.maintainAspect.checked) {
        currentWidth = Math.round(currentHeight * aspectRatio);
        resizeElements.widthSlider.value = currentWidth;
        resizeElements.widthValue.textContent = currentWidth;
      }
      updatePreview();
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
       if (handlers.onConfirmResize) {
         handlers.onConfirmResize(processor, currentWidth, currentHeight, selectedColors);
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
       const colors = handlers.getAvailableColors();
       setupColorPalette(colors);
     }
     
     // Configurar callback de selección de color
     if (handlers.onColorSelectionChange && resizeElements.colorPaletteSelector && resizeElements.colorPaletteSelector.onSelectionChange) {
       resizeElements.colorPaletteSelector.onSelectionChange(handlers.onColorSelectionChange);
     }
    
    // Mostrar diálogo
    resizeElements.resizeWindow.style.display = 'flex';

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

    // Generar vista previa inicial
    updatePreview();
    
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