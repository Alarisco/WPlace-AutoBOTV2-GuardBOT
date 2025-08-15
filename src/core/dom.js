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
  // Buscar elementos comunes de la paleta de colores
  const paletteSelectors = [
    '[data-testid="color-picker"]',
    '.color-picker',
    '.palette',
    '[class*="color"][class*="picker"]',
    '[class*="palette"]'
  ];
  
  for (const selector of paletteSelectors) {
    const element = document.querySelector(selector);
    if (element && element.offsetParent !== null) {
      return true;
    }
  }
  
  // Buscar por colores en un grid o lista
  const colorElements = document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]');
  let visibleColors = 0;
  for (const el of colorElements) {
    if (el.offsetParent !== null && el.offsetWidth > 10 && el.offsetHeight > 10) {
      visibleColors++;
      if (visibleColors >= 5) return true; // Si hay 5+ elementos de color visibles
    }
  }
  
  return false;
}

// Función para encontrar y hacer clic en el botón de Paint
export function findAndClickPaintButton() {
  // Buscar botón específico con las clases mencionadas
  const paintButton = document.querySelector('button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl');
  
  if (paintButton) {
    // Verificar que contenga texto "Paint" o el icono SVG característico
    const buttonText = paintButton.textContent.toLowerCase();
    const hasPaintText = buttonText.includes('paint');
    const hasPaintIcon = paintButton.querySelector('svg path[d*="240-120"]'); // Parte del path del icono
    
    if (hasPaintText || hasPaintIcon) {
      paintButton.click();
      return true;
    }
  }
  
  // Búsqueda alternativa por texto "Paint"
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    if (button.textContent.toLowerCase().includes('paint') && 
        button.offsetParent !== null &&
        !button.disabled) {
      button.click();
      return true;
    }
  }
  
  return false;
}
