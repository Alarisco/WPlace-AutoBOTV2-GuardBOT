let loaded = false;

export async function loadTurnstile() {
  if (loaded || window.turnstile) return;
  
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true; 
    s.defer = true;
    s.onload = () => {
      loaded = true;
      resolve();
    };
    s.onerror = () => reject(new Error('No se pudo cargar Turnstile'));
    document.head.appendChild(s);
  });
}

export async function executeTurnstile(siteKey, action = "paint") {
  await loadTurnstile();
  
  if (typeof window.turnstile?.execute === 'function') {
    try {
      const token = await window.turnstile.execute(siteKey, { action });
      if (token && token.length > 20) return token;
    } catch { 
      /* fallback abajo */ 
    }
  }
  
  // Fallback: render oculto
  return await new Promise((resolve) => {
    const host = document.createElement('div');
    host.style.position = 'fixed'; 
    host.style.left = '-9999px';
    document.body.appendChild(host);
    window.turnstile.render(host, { 
      sitekey: siteKey, 
      callback: (t) => {
        document.body.removeChild(host);
        resolve(t);
      } 
    });
  });
}

// Versión original para compatibilidad
export async function getTurnstileToken(siteKey) {
  return executeTurnstile(siteKey, 'paint');
}

// Detecta dinámicamente la sitekey de Turnstile del DOM o del contexto global.
// Prioridad: [data-sitekey] > .cf-turnstile[data-sitekey] > window.__TURNSTILE_SITEKEY > fallback
export function detectSiteKey(fallback = '') {
  try {
    // 1) Elemento con atributo data-sitekey (común en integraciones explícitas)
    const el = document.querySelector('[data-sitekey]');
    if (el) {
      const key = el.getAttribute('data-sitekey');
      if (key && key.length > 10) return key;
    }
    // 2) Widget Turnstile insertado (.cf-turnstile)
    const cf = document.querySelector('.cf-turnstile');
    if (cf && cf.dataset?.sitekey && cf.dataset.sitekey.length > 10) {
      return cf.dataset.sitekey;
    }
    // 3) Variable global opcional
    if (typeof window !== 'undefined' && window.__TURNSTILE_SITEKEY && window.__TURNSTILE_SITEKEY.length > 10) {
      return window.__TURNSTILE_SITEKEY;
    }
  } catch {
    // ignore
  }
  return fallback;
}
