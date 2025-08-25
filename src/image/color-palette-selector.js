import { log } from "../core/logger.js";
import { COLOR_MAP } from "./palette.js";

/**
 * Crea un selector de paleta de colores para el resize dialog
 */
export function createColorPaletteSelector(container, availableColors = []) {
  log('🎨 Creando selector de paleta de colores');
  
  // Crear la sección de paleta de colores
  const paletteSection = document.createElement('div');
  paletteSection.className = 'wplace-section';
  paletteSection.id = 'color-palette-section';
  paletteSection.style.marginTop = '15px';
  paletteSection.innerHTML = `
    <div class="wplace-section-title">
      <i class="fas fa-palette"></i>&nbsp;Color Palette
    </div>
    <div class="wplace-controls">
      <div class="wplace-row single">
        <label style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
          <input type="checkbox" id="showAllColorsToggle" style="cursor: pointer;">
          <span>Show All Colors (including unavailable)</span>
        </label>
      </div>
      <div class="wplace-row">
        <button id="selectAllBtn" class="wplace-btn">Select All</button>
        <button id="unselectAllBtn" class="wplace-btn">Unselect All</button>
      </div>
      <div id="colors-container" class="wplace-color-grid"></div>
    </div>
  `;
  
  // Añadir estilos específicos para la paleta (usando los mismos estilos del bot ejemplo)
  const style = document.createElement('style');
  style.textContent = `
    .wplace-section {
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 15px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    
    .wplace-section-title {
      font-size: 14px;
      font-weight: 600;
      color: #60a5fa;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
    }
    
    .wplace-controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .wplace-row {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    .wplace-row.single {
      justify-content: flex-start;
    }
    
    .wplace-btn {
      background: #60a5fa;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.2s;
    }
    
    .wplace-btn:hover {
      background: #4facfe;
      transform: translateY(-1px);
    }
    
    .wplace-color-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
      padding: 12px;
      max-height: 300px;
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .wplace-color-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    
    .wplace-color-item-name {
      font-size: 9px;
      color: #ccc;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      line-height: 1.2;
    }
    
    .wplace-color-swatch {
      width: 32px;
      height: 32px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      margin: 0 auto;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .wplace-color-swatch.unavailable {
      border-color: #666;
      border-style: dashed;
      cursor: not-allowed;
      opacity: 0.4;
      filter: grayscale(70%);
    }
    
    .wplace-color-swatch:hover:not(.unavailable) {
      transform: scale(1.05);
      border-color: #60a5fa;
      box-shadow: 0 0 8px rgba(96, 165, 250, 0.3);
      z-index: 1;
    }
    
    .wplace-color-swatch:not(.active):not(.unavailable) {
      opacity: 0.5;
      filter: grayscale(60%);
    }
    
    .wplace-color-swatch.unavailable:not(.active) {
      opacity: 0.3;
      filter: grayscale(80%);
    }
    
    .wplace-color-swatch.active {
      border-color: #10b981;
      opacity: 1;
      filter: none;
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.4);
    }
    
    .wplace-color-swatch.active::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-shadow: 
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000,
        0 0 3px rgba(0,0,0,0.8);
      z-index: 2;
    }
    
    .wplace-color-item.unavailable .wplace-color-item-name {
      color: #888;
      font-style: italic;
    }
  `;
  
  // Añadir estilos dentro del Shadow DOM si existe (para que apliquen en el modal)
  const rootNode = container.getRootNode && container.getRootNode();
  const isShadowRoot = rootNode && rootNode.nodeType === 11 && rootNode.host; // 11 = DOCUMENT_FRAGMENT_NODE
  if (isShadowRoot) {
    if (!rootNode.querySelector('#color-palette-styles')) {
      style.id = 'color-palette-styles';
      rootNode.appendChild(style);
    }
  } else {
    if (!document.head.querySelector('#color-palette-styles')) {
      style.id = 'color-palette-styles';
      document.head.appendChild(style);
    }
  }
  
  container.appendChild(paletteSection);
  
  // Referencias a elementos
  const elements = {
    showAllToggle: paletteSection.querySelector('#showAllColorsToggle'),
    selectAllBtn: paletteSection.querySelector('#selectAllBtn'),
    unselectAllBtn: paletteSection.querySelector('#unselectAllBtn'),
    colorsContainer: paletteSection.querySelector('#colors-container')
  };
  
  // Estado
  let selectedColors = new Set();
  let showUnavailable = false;
  let changeCallback = null;
  
  // Función para actualizar la paleta activa
  function updateActiveColorPalette() {
    selectedColors.clear();
    const activeSwatches = elements.colorsContainer.querySelectorAll('.wplace-color-swatch.active');
    activeSwatches.forEach(swatch => {
      const colorId = parseInt(swatch.dataset.colorId);
      if (!isNaN(colorId)) {
        selectedColors.add(colorId);
      }
    });
    
    if (changeCallback) {
      changeCallback(Array.from(selectedColors));
    }
  }
  
  // Función para alternar todos los colores
  function toggleAllColors(select, showingUnavailable = false) {
    const swatches = elements.colorsContainer.querySelectorAll('.wplace-color-swatch');
    swatches.forEach(swatch => {
      const isUnavailable = swatch.classList.contains('unavailable');
      const colorId = parseInt(swatch.dataset.colorId);
      
      if (!isUnavailable || showingUnavailable) {
        if (!isUnavailable) {
          swatch.classList.toggle('active', select);
          if (select) {
            selectedColors.add(colorId);
          } else {
            selectedColors.delete(colorId);
          }
        }
      }
    });
    updateActiveColorPalette();
    
    log(`🎨 ${select ? 'Seleccionados' : 'Deseleccionados'} todos los colores disponibles`);
  }
  
  // Función para poblar los colores
  function populateColors(showUnavailable = false) {
    elements.colorsContainer.innerHTML = '';
    
    if (!availableColors || availableColors.length === 0) {
      elements.colorsContainer.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">Upload an image first to capture available colors</div>';
      return;
    }
    
    let _availableCount = 0;
    let _totalCount = 0;

    // Determinar si ya existe una selección previa (no debe cambiar durante el render)
    const hasExistingSelection = selectedColors.size > 0;
    const nextSelected = new Set();
    
    // Convertir COLOR_MAP a array y filtrar transparente
    const allColors = Object.values(COLOR_MAP).filter(color => color.rgb !== null);
    
    allColors.forEach(colorData => {
      const { id, name, rgb } = colorData;
      const rgbKey = `${rgb.r},${rgb.g},${rgb.b}`;
      _totalCount++;
      
      // Verificar si este color está disponible en los colores capturados
      const isAvailable = availableColors.some(c =>
        c.r === rgb.r && c.g === rgb.g && c.b === rgb.b
      );
      
      // Si no se muestran todos los colores y este color no está disponible, saltarlo
      if (!showUnavailable && !isAvailable) {
        return;
      }
      
      if (isAvailable) _availableCount++;
      
      const colorItem = document.createElement('div');
      colorItem.className = 'wplace-color-item';
      
      const swatch = document.createElement('button');
      swatch.className = `wplace-color-swatch ${!isAvailable ? 'unavailable' : ''}`;
      swatch.title = `${name} (ID: ${id})${!isAvailable ? ' (Unavailable)' : ''}`;
      swatch.dataset.rgb = rgbKey;
      swatch.dataset.colorId = id;
      swatch.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      
      // Marcar colores no disponibles y calcular estado activo
      if (!isAvailable) {
        swatch.disabled = true;
      }
      // Selección inicial estable: si no hay selección previa, activar todos los disponibles; si ya hay, respetar selección previa
      const shouldBeActive = hasExistingSelection ? selectedColors.has(id) : isAvailable;
      swatch.classList.toggle('active', shouldBeActive);

      if (shouldBeActive) {
        nextSelected.add(id);
      } else {
        nextSelected.delete(id);
      }
      
      const nameLabel = document.createElement('span');
      nameLabel.className = 'wplace-color-item-name';
      nameLabel.textContent = name + (!isAvailable ? ' (N/A)' : '');
      if (!isAvailable) {
        nameLabel.style.color = '#888';
        nameLabel.style.fontStyle = 'italic';
      }
      
      // Solo añadir click listener para colores disponibles
      if (isAvailable) {
        swatch.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const wasActive = swatch.classList.contains('active');
          swatch.classList.toggle('active', !wasActive);
          
          if (wasActive) {
            selectedColors.delete(id);
          } else {
            selectedColors.add(id);
          }
          
          updateActiveColorPalette();
          
          log(`🎨 Color ${name} (ID: ${id}) ${wasActive ? 'deseleccionado' : 'seleccionado'}`);
        });
      }
      
      colorItem.appendChild(swatch);
      colorItem.appendChild(nameLabel);
      elements.colorsContainer.appendChild(colorItem);
    });

    // Actualizar el set seleccionado con la selección calculada durante el render
    selectedColors = nextSelected;
    
    // Sincronizar estado visual después de renderizar
    const swatches = elements.colorsContainer.querySelectorAll('.wplace-color-swatch');
    swatches.forEach(swatch => {
      const colorId = parseInt(swatch.dataset.colorId);
      const shouldBeActive = selectedColors.has(colorId);
      swatch.classList.toggle('active', shouldBeActive);
    });
    
    updateActiveColorPalette();
  }
  
  // Event listeners
  elements.showAllToggle.addEventListener('change', (e) => {
    showUnavailable = e.target.checked;
    populateColors(showUnavailable);
  });
  
  elements.selectAllBtn.addEventListener('click', () => {
    toggleAllColors(true, showUnavailable);
  });
  
  elements.unselectAllBtn.addEventListener('click', () => {
    toggleAllColors(false, showUnavailable);
  });
  
  // Inicializar con solo colores disponibles
  populateColors(false);
  
  function updateAvailableColors(newAvailableColors) {
    availableColors = newAvailableColors || [];
    populateColors(showUnavailable);
  }
  
  function getSelectedColors() {
    return Array.from(selectedColors);
  }
  
  function setSelectedColors(colorIds) {
    selectedColors = new Set(colorIds || []);
    
    // Sincronizar estado visual con selección
    const swatches = elements.colorsContainer.querySelectorAll('.wplace-color-swatch');
    swatches.forEach(swatch => {
      const colorId = parseInt(swatch.dataset.colorId);
      const shouldBeActive = selectedColors.has(colorId);
      swatch.classList.toggle('active', shouldBeActive);
    });
    
    if (changeCallback) {
      changeCallback(Array.from(selectedColors));
    }
  }
  
  function onSelectionChange(callback) {
    changeCallback = callback;
  }
  
  log('✅ Selector de paleta de colores creado');
  
  return {
    updateAvailableColors,
    getSelectedColors,
    setSelectedColors,
    onSelectionChange,
    element: paletteSection
  };
}
