export const $ = (sel, root = document) => root.querySelector(sel);

export function createStyle(css) {
  const s = document.createElement("style");
  s.textContent = css; document.head.appendChild(s); return s;
}

export function mountShadow(container = document.body) {
  const host = document.createElement("div");
  host.id = "wplace-bot-root";
  container.appendChild(host);
  const root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
  return { host, root };
}

// Función para detectar si la paleta de colores está abierta
export function isPaletteOpen() {
  // Buscar elementos específicos de la paleta de colores
  const paletteSelectors = [
    '[data-testid="color-picker"]',
    '.color-picker',
    '.palette',
    '[class*="color"][class*="picker"]',
    '[class*="palette"]',
    '[id^="color-"]', // IDs que empiezan con "color-"
    '.color-grid',
    '.colors'
  ];
  
  for (const selector of paletteSelectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 3) { // Si hay varios elementos de color
      return true;
    }
  }
  
  // Buscar por IDs de colores específicos (más confiable)
  const colorIds = document.querySelectorAll('[id^="color-"]');
  if (colorIds.length >= 5) { // Si hay al menos 5 elementos con ID de color
    console.log(`[WPA-UI] 🎨 Paleta detectada: ${colorIds.length} colores encontrados`);
    return true;
  }
  
  // Buscar por elementos con estilos de background-color
  const colorElements = document.querySelectorAll('[style*="background-color"], [style*="background:"]');
  let visibleColors = 0;
  for (const el of colorElements) {
    if (el.offsetParent !== null && el.offsetWidth > 15 && el.offsetHeight > 15) {
      const style = el.style.backgroundColor || el.style.background;
      if (style && (style.includes('rgb') || style.includes('#'))) {
        visibleColors++;
      }
    }
  }
  
  if (visibleColors >= 8) {
    console.log(`[WPA-UI] 🎨 Paleta detectada por colores visibles: ${visibleColors}`);
    return true;
  }
  
  console.log(`[WPA-UI] 🔍 Paleta no detectada. ColorIDs: ${colorIds.length}, Colores visibles: ${visibleColors}`);
  return false;
}

// Función para encontrar y hacer clic en el botón de Paint
export function findAndClickPaintButton() {
  // Lista de selectores para encontrar el botón Paint
  const paintButtonSelectors = [
    'button.btn.btn-primary.btn-lg',
    'button.btn.btn-primary.sm\\:btn-xl',
    'button[class*="btn"][class*="primary"]',
    'button[class*="paint"]',
    'button:has(svg)',
    'button'
  ];
  
  // Buscar por selectores específicos primero
  for (const selector of paintButtonSelectors) {
    try {
      const buttons = document.querySelectorAll(selector);
      
      for (const button of buttons) {
        if (!button.offsetParent || button.disabled) continue;
        
        const buttonText = button.textContent.toLowerCase().trim();
        const hasInnerHTML = button.innerHTML.toLowerCase();
        
        // Verificar si es un botón de Paint por texto
        if (buttonText.includes('paint') || 
            buttonText.includes('pintar') ||
            hasInnerHTML.includes('paint')) {
          
          console.log(`[WPA-UI] 🎯 Botón Paint encontrado por texto: "${buttonText}"`);
          button.click();
          return true;
        }
        
        // Verificar si tiene el icono SVG característico del botón Paint
        const svg = button.querySelector('svg');
        if (svg) {
          const svgContent = svg.outerHTML.toLowerCase();
          // Buscar patrones comunes en iconos de paint/brush
          if (svgContent.includes('paint') || 
              svgContent.includes('brush') ||
              svgContent.includes('240-120') || // Path específico del icono
              svgContent.includes('m15.5') ||   // Otro patrón común
              svg.querySelector('path[d*="240"]') ||
              svg.querySelector('path[d*="M15"]')) {
            
            console.log(`[WPA-UI] 🎯 Botón Paint encontrado por icono SVG`);
            button.click();
            return true;
          }
        }
        
        // Si es un botón principal grande y visible, podría ser el Paint
        const computedStyle = window.getComputedStyle(button);
        const isLargeButton = button.offsetWidth > 80 && button.offsetHeight > 35;
        const isPrimary = computedStyle.backgroundColor.includes('rgb') &&
                         (computedStyle.backgroundColor.includes('59, 130, 246') || // blue
                          computedStyle.backgroundColor.includes('37, 99, 235') ||  // blue-600
                          computedStyle.backgroundColor.includes('29, 78, 216'));   // blue-700
        
        if (isLargeButton && isPrimary) {
          console.log(`[WPA-UI] 🎯 Botón Paint potencial encontrado por estilo`);
          button.click();
          return true;
        }
      }
    } catch {
      // Continuar con el siguiente selector si hay error
      continue;
    }
  }
  
  // Búsqueda final más agresiva
  const allButtons = document.querySelectorAll('button, [role="button"], a[class*="btn"]');
  for (const element of allButtons) {
    if (!element.offsetParent || element.getAttribute('disabled') === 'true') continue;
    
    const fullText = element.textContent + ' ' + element.innerHTML + ' ' + (element.title || '') + ' ' + (element.getAttribute('aria-label') || '');
    
    if (fullText.toLowerCase().includes('paint') || 
        fullText.toLowerCase().includes('pintar') ||
        fullText.toLowerCase().includes('brush') ||
        fullText.toLowerCase().includes('draw')) {
      
      console.log(`[WPA-UI] 🎯 Botón Paint encontrado por búsqueda extensiva`);
      element.click();
      return true;
    }
  }
  
  console.log(`[WPA-UI] ❌ Botón Paint no encontrado`);
  return false;
}
