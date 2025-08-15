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
