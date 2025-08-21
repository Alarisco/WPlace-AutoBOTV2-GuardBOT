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
export function findAndClickPaintButton(debug = false, doubleClick = false) {
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
      
      // Si se requiere doble clic, hacer segundo clic después de un delay
      if (doubleClick) {
        setTimeout(() => {
          if (debug) console.log(`[WPA-UI] 🎯 Segundo clic en botón Paint`);
          specificButton.click();
        }, 500);
      }
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
      
      // Si se requiere doble clic, hacer segundo clic después de un delay
      if (doubleClick) {
        setTimeout(() => {
          if (debug) console.log(`[WPA-UI] 🎯 Segundo clic en botón Paint`);
          button.click();
        }, 500);
      }
      return true;
    }
  }
  
  if (debug) console.log(`[WPA-UI] ❌ Botón Paint no encontrado`);
  return false;
}

// Función para realizar auto-click del botón Paint con secuencia correcta
export async function autoClickPaintButton(maxAttempts = 3, debug = true) {
  if (debug) console.log(`[WPA-UI] 🤖 Iniciando auto-click del botón Paint (máximo ${maxAttempts} intentos)`);
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (debug) console.log(`[WPA-UI] 🎯 Intento ${attempt}/${maxAttempts} - Buscando botón Paint...`);
    
    // Verificar si la paleta ya está abierta
    if (isPaletteOpen()) {
      if (debug) console.log(`[WPA-UI] ✅ Paleta ya está abierta, auto-click completado`);
      return true;
    }
    
    // CLIC ÚNICO: Presionar Paint una sola vez (solo para mostrar paleta/detectar colores)
    if (findAndClickPaintButton(debug, false)) {
      if (debug) console.log(`[WPA-UI] 👆 Clic en botón Paint realizado (sin segundo clic)`);
      
      // Esperar un poco para que la UI/paleta aparezca en pantalla
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Verificar si la paleta se abrió
      if (isPaletteOpen()) {
        if (debug) console.log(`[WPA-UI] ✅ Paleta abierta exitosamente después del intento ${attempt}`);
        return true;
      } else {
        if (debug) console.log(`[WPA-UI] ⚠️ Paleta no detectada tras el clic en intento ${attempt}. Reintentará.`);
      }
    } else {
      if (debug) console.log(`[WPA-UI] ❌ Botón Paint no encontrado para clic en intento ${attempt}`);
    }
    
    // Esperar antes del siguiente intento
    if (attempt < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  if (debug) console.log(`[WPA-UI] ❌ Auto-click falló después de ${maxAttempts} intentos`);
  return false;
}
