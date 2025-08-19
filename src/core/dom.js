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
export function isPaletteOpen(debug = false) {
  // Buscar elementos comunes de la paleta de colores (método original)
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
      if (debug) console.log(`[WPA-UI] 🎨 Paleta detectada por selector: ${selector}`);
      return true;
    }
  }
  
  // Buscar por colores en un grid o lista (método original)
  const colorElements = document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]');
  let visibleColors = 0;
  for (const el of colorElements) {
    if (el.offsetParent !== null && el.offsetWidth > 10 && el.offsetHeight > 10) {
      visibleColors++;
      if (visibleColors >= 5) {
        if (debug) console.log(`[WPA-UI] 🎨 Paleta detectada por colores visibles: ${visibleColors}`);
        return true; // Si hay 5+ elementos de color visibles
      }
    }
  }
  
  if (debug) console.log(`[WPA-UI] 🔍 Paleta no detectada. Colores visibles: ${visibleColors}`);
  return false;
}

// Función para encontrar y hacer clic en el botón de Paint
export function findAndClickPaintButton(debug = false) {
  // Método 1: Búsqueda específica por clases (método original, más confiable)
  const specificButton = document.querySelector('button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl');
  
  if (specificButton) {
    const buttonText = specificButton.textContent.toLowerCase();
    const hasPaintText = buttonText.includes('paint') || buttonText.includes('pintar');
    const hasPaintIcon = specificButton.querySelector('svg path[d*="240-120"]') || 
                        specificButton.querySelector('svg path[d*="M15"]');
    
    if (hasPaintText || hasPaintIcon) {
      if (debug) console.log(`[WPA-UI] 🎯 Botón Paint encontrado por selector específico: "${buttonText}"`);
      specificButton.click();
      return true;
    }
  }
  
  // Método 2: Búsqueda simple por texto (método original)
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    const buttonText = button.textContent.toLowerCase();
    if ((buttonText.includes('paint') || buttonText.includes('pintar')) && 
        button.offsetParent !== null &&
        !button.disabled) {
      if (debug) console.log(`[WPA-UI] 🎯 Botón Paint encontrado por texto: "${button.textContent.trim()}"`);
      button.click();
      return true;
    }
  }
  
  if (debug) console.log(`[WPA-UI] ❌ Botón Paint no encontrado`);
  return false;
}
