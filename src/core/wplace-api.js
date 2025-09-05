import { fetchWithTimeout } from "./http.js";
import { ensureToken, invalidateToken, getPawtectToken, getFingerprint, waitForPawtect } from "./turnstile.js";
import { log } from "./logger.js";

const BASE = "https://backend.wplace.live";

export async function getSession() {
  try {
    const me = await fetch(`${BASE}/me`, { credentials: 'include' }).then(r => r.json());
    const user = me || null;
    const c = me?.charges || {};
  const droplets = me?.droplets ?? 0;
    const charges = {
      count: c.count ?? 0,        // Mantener valor decimal original
      max: c.max ?? 0,            // Mantener valor original (puede variar por usuario)
      cooldownMs: c.cooldownMs ?? 30000
    };
    
    return { 
      success: true,
      data: {
        user, 
        charges: charges.count,
        maxCharges: charges.max,
    chargeRegen: charges.cooldownMs,
    droplets
      }
    };
  } catch (error) { 
    return { 
      success: false,
      error: error.message,
      data: {
        user: null, 
        charges: 0,
    maxCharges: 0,
    chargeRegen: 30000,
    droplets: 0
      }
    }; 
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${BASE}/health`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (response.ok) {
      const health = await response.json();
      return {
        ...health,
        lastCheck: Date.now(),
        status: 'online'
      };
    } else {
      return {
        database: false,
        up: false,
        uptime: 'N/A',
        lastCheck: Date.now(),
        status: 'error',
        statusCode: response.status
      };
    }
  } catch (error) {
    return {
      database: false,
      up: false,
      uptime: 'N/A',
      lastCheck: Date.now(),
      status: 'offline',
      error: error.message
    };
  }
}

// Compra de producto (ej. aumentar cargas máximas en +5)
export async function purchaseProduct(productId = 70, amount = 1) {
  try {
    const body = JSON.stringify({ product: { id: productId, amount } });
    const r = await fetchWithTimeout(`${BASE}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
      credentials: 'include',
      timeout: 15000
    });
    let json = {};
    try { json = await r.json(); } catch { json = {}; }
    return { success: r.ok, status: r.status, json };
  } catch (error) {
    return { success: false, status: 0, json: { error: error.message } };
  }
}

// Unifica post de píxel por lotes (batch por tile).
export async function postPixelBatch({ tileX, tileY, pixels, turnstileToken }) {
  // pixels: [{x,y,color}, …] relativos al tile -> convertir a coords/colors
  try { await waitForPawtect(5000); } catch {}
  let pawtect = getPawtectToken();
  let fp = getFingerprint();
  const coords = [];
  const colors = [];
  for (const p of pixels || []) {
    // Asegurar valores válidos 0..999
    const x = ((Number(p.x) % 1000) + 1000) % 1000;
    const y = ((Number(p.y) % 1000) + 1000) % 1000;
    if (Number.isFinite(x) && Number.isFinite(y)) {
      coords.push(x, y);
      colors.push(p.color?.id ?? p.color?.value ?? p.color ?? 1);
    }
  }
  // Si aún no hay fp, esperar un poco más de forma proactiva
  if (!fp) { try { await waitForPawtect(2000); } catch {} fp = getFingerprint(); pawtect = getPawtectToken(); }
  log(`[API] postPixelBatch include: pawtect=${!!pawtect} fp=${!!fp}`);
  const body = JSON.stringify({ colors, coords, t: turnstileToken, ...(fp ? { fp } : {}) });
  const r = await fetchWithTimeout(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
    method: "POST",
  headers: { "Content-Type": "text/plain;charset=UTF-8", ...(pawtect ? { "x-pawtect-token": pawtect } : {}) },
    body,
    credentials: "include"
  });
  
  // Algunas respuestas pueden no traer JSON aunque sean 200.
  if (r.status === 200) {
    try { return await r.json(); } catch { return { ok: true }; }
  }
  
  let msg = `HTTP ${r.status}`;
  try { 
    const j = await r.json(); 
    msg = j?.message || msg; 
  } catch {
    // Response not JSON
  }
  throw new Error(`paint failed: ${msg}`);
}

// Versión 'safe' que no arroja excepciones y retorna status/json
export async function postPixelBatchSafe(tileX, tileY, pixels, turnstileToken) {
  try {
  try { await waitForPawtect(5000); } catch {}
  let pawtect = getPawtectToken();
  let fp = getFingerprint();
    const coords = [];
    const colors = [];
    for (const p of (pixels || [])) {
      const x = ((Number(p.x) % 1000) + 1000) % 1000;
      const y = ((Number(p.y) % 1000) + 1000) % 1000;
      if (Number.isFinite(x) && Number.isFinite(y)) {
        coords.push(x, y);
        colors.push(p.color?.id ?? p.color?.value ?? p.color ?? 1);
      }
    }
  if (!fp) { try { await waitForPawtect(2000); } catch {} fp = getFingerprint(); pawtect = getPawtectToken(); }
  log(`[API] postPixelBatchSafe include: pawtect=${!!pawtect} fp=${!!fp}`);
  const body = JSON.stringify({ colors, coords, t: turnstileToken, ...(fp ? { fp } : {}) });
    const r = await fetchWithTimeout(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
      method: "POST",
  headers: { "Content-Type": "text/plain;charset=UTF-8", ...(pawtect ? { "x-pawtect-token": pawtect } : {}) },
      body,
      credentials: "include",
      timeout: 20000 // Aumentar timeout a 20 segundos
    });
  let json = {};
  // If response is not JSON, ignore parse error
  try { json = await r.json(); } catch { /* ignore */ }
    return { status: r.status, json, success: r.ok };
  } catch (error) {
    // Manejo específico para timeouts
    if (error.name === 'TimeoutError') {
      return { status: 408, json: { error: `Request timeout after ${error.timeout}ms` }, success: false };
    }
    return { status: 0, json: { error: error.message }, success: false };
  }
}

// Post píxel para farm (replicado del ejemplo con manejo de 403)
export async function postPixel(coords, colors, turnstileToken, tileX, tileY) {
  try {
    // Ensure pawtect tokens are present (best-effort wait)
  try { await waitForPawtect(5000); } catch {}
  let pawtect = getPawtectToken();
  let fp = getFingerprint();
  if (!fp) { try { await waitForPawtect(2000); } catch {} fp = getFingerprint(); pawtect = getPawtectToken(); }
    const body = JSON.stringify({ 
      colors: colors, 
      coords: coords, 
      t: turnstileToken,
      ...(fp ? { fp } : {})
    });
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // Aumentar timeout a 20 segundos

  const response = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
      method: 'POST',
      credentials: 'include',
  headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...(pawtect ? { 'x-pawtect-token': pawtect } : {}) },
      body: body,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

  if (response.status === 403) {
      try { await response.json(); } catch { /* Ignore JSON parsing errors */ }
      console.error("❌ 403 Forbidden. Turnstile token might be invalid or expired.");
      
      // Try to generate a new token and retry once
      try {
        console.log("🔄 Regenerating Turnstile token after 403...");
        const newToken = await ensureToken(true); // Force new token generation
        // re-check fp/pawtect in case they were captured after the first try
        pawtect = getPawtectToken();
        fp = getFingerprint();
        
        // Retry the request with new token
        const retryBody = JSON.stringify({ 
          colors: colors, 
          coords: coords, 
          t: newToken,
          ...(fp ? { fp } : {})
        });
        
        const retryController = new AbortController();
        const retryTimeoutId = setTimeout(() => retryController.abort(), 20000); // Aumentar timeout a 20 segundos

        const retryResponse = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...(pawtect ? { 'x-pawtect-token': pawtect } : {}) },
          body: retryBody,
          signal: retryController.signal
        });

        clearTimeout(retryTimeoutId);
        
        if (retryResponse.status === 403) {
          return {
            status: 403,
            json: { error: 'Fresh token expired or invalid after retry' },
            success: false
          };
        }
        
        let retryData = null;
        try {
          const text = await retryResponse.text();
          if (text) {
            retryData = JSON.parse(text);
          }
        } catch {
          retryData = {}; // Ignorar errores de JSON parse
        }
        
  // No invalidar el token en éxito: permite reutilización dentro del TTL.
        return {
          status: retryResponse.status,
          json: retryData,
          success: retryResponse.ok
        };
        
      } catch (retryError) {
        console.error("❌ Token regeneration failed:", retryError);
        return {
          status: 403,
          json: { error: 'Token regeneration failed' },
          success: false
        };
      }
    }

    // Si el servidor devuelve 5xx, intentar una vez con token nuevo
    if (response.status >= 500 && response.status <= 504) {
      try {
  const newToken = await ensureToken(true);
  // re-check fp/pawtect as well
  pawtect = getPawtectToken();
  fp = getFingerprint();
  const retryBody = JSON.stringify({ colors, coords, t: newToken, ...(fp ? { fp } : {}) });
        const retryController = new AbortController();
        const retryTimeoutId = setTimeout(() => retryController.abort(), 20000); // Aumentar timeout a 20 segundos
        const retryResponse = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...(pawtect ? { 'x-pawtect-token': pawtect } : {}) },
          body: retryBody,
          signal: retryController.signal
        });
        clearTimeout(retryTimeoutId);
        let retryData = null;
        try { const text = await retryResponse.text(); retryData = text ? JSON.parse(text) : {}; } catch { retryData = {}; }
        if (retryResponse.ok) {
          try { invalidateToken(); } catch {}
        }
        return { status: retryResponse.status, json: retryData, success: retryResponse.ok };
      } catch (e) {
        // Continuar devolviendo el 5xx original si falla
      }
    }

    let responseData = null;
    try {
      const text = await response.text();
      if (text) {
        responseData = JSON.parse(text);
      }
    } catch {
      responseData = {}; // Ignorar errores de JSON parse
    }

  // No invalidar el token en éxito: permite reutilización dentro del TTL.
    return {
      status: response.status,
      json: responseData,
      success: response.ok
    };
  } catch (error) {
    // Manejo específico para timeouts y abort errors
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return {
        status: 408,
        json: { error: 'Request timeout' },
        success: false
      };
    }
    return {
      status: 0,
      json: { error: error.message },
      success: false
    };
  }
}

// Post píxel para Auto-Image (replicado del ejemplo con manejo de 403)
export async function postPixelBatchImage(tileX, tileY, coords, colors, turnstileToken) {
  try {
    // Ensure pawtect tokens are present (best-effort wait)
  try { await waitForPawtect(5000); } catch {}
  let pawtect = getPawtectToken();
  let fp = getFingerprint();
  if (!fp) { try { await waitForPawtect(2000); } catch {} fp = getFingerprint(); pawtect = getPawtectToken(); }
    // Prepare exact body format as used in example
    const body = JSON.stringify({ 
      colors: colors, 
      coords: coords, 
      t: turnstileToken,
      ...(fp ? { fp } : {})
    });
    
    log(`[API] Sending batch to tile ${tileX},${tileY} with ${colors.length} pixels, token: ${turnstileToken ? turnstileToken.substring(0, 50) + '...' : 'null'}`);
    
  log(`[API] postPixelBatchImage include: pawtect=${!!pawtect} fp=${!!fp}`);
  const response = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
      method: 'POST',
      credentials: 'include',
  headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...(pawtect ? { 'x-pawtect-token': pawtect } : {}) },
      body: body
    });

    log(`[API] Response: ${response.status} ${response.statusText}`);

  if (response.status === 403) {
      try { await response.json(); } catch { /* Ignore JSON parsing errors */ }
      console.error("❌ 403 Forbidden. Turnstile token might be invalid or expired.");
      
      // Try to generate a new token and retry once
      try {
        console.log("🔄 Regenerating Turnstile token after 403...");
        
        // Force invalidation of current token and get completely fresh one
  const newToken = await ensureToken(true); // Force new token generation
  // re-check fp/pawtect as they may be available now
  pawtect = getPawtectToken();
  fp = getFingerprint();
        
        if (!newToken) {
          return {
            status: 403,
            json: { error: 'Could not generate new token' },
            success: false,
            painted: 0
          };
        }
        
        // Retry the request with new token
        const retryBody = JSON.stringify({ 
          colors: colors, 
          coords: coords, 
          t: newToken,
          ...(fp ? { fp } : {})
        });
        
        log(`[API] Retrying with fresh token: ${newToken.substring(0, 50)}...`);
        
        const retryResponse = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...(pawtect ? { 'x-pawtect-token': pawtect } : {}) },
          body: retryBody
        });
        
        log(`[API] Retry response: ${retryResponse.status} ${retryResponse.statusText}`);
        
        if (retryResponse.status === 403) {
          return {
            status: 403,
            json: { error: 'Fresh token still expired or invalid after retry' },
            success: false,
            painted: 0
          };
        }
        
        let retryData = null;
        try {
          const text = await retryResponse.text();
          if (text.trim()) {
            retryData = JSON.parse(text);
          } else {
            retryData = {}; // Empty response
          }
        } catch (parseError) {
          log(`[API] Warning: Could not parse retry response JSON: ${parseError.message}`);
          retryData = {}; // Use empty object if JSON parse fails
        }
        
        const painted = retryData?.painted || 0;
        log(`[API] Retry result: ${painted} pixels painted`);

  // No invalidar el token en éxito: permite reutilización dentro del TTL.

        return {
          status: retryResponse.status,
          json: retryData,
          success: retryResponse.ok,
          painted: painted
        };
        
      } catch (retryError) {
        console.error("❌ Token regeneration failed:", retryError);
        return {
          status: 403,
          json: { error: 'Token regeneration failed: ' + retryError.message },
          success: false,
          painted: 0
        };
      }
    }

    // Intentar una vez con token nuevo si es 5xx
    if (response.status >= 500 && response.status <= 504) {
      try {
  const newToken = await ensureToken(true);
  // re-check fp/pawtect for retry
  pawtect = getPawtectToken();
  fp = getFingerprint();
  const retryBody = JSON.stringify({ colors, coords, t: newToken, ...(fp ? { fp } : {}) });
        log(`[API] Retrying after ${response.status} with fresh token: ${newToken.substring(0, 50)}...`);
        const retryResponse = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...(pawtect ? { 'x-pawtect-token': pawtect } : {}) },
          body: retryBody
        });
        let retryData = null;
        try {
          const text = await retryResponse.text();
          retryData = text && text.trim() ? JSON.parse(text) : {};
        } catch { retryData = {}; }
        const painted = retryData?.painted || 0;
        log(`[API] Retry after ${response.status}: ${painted} pixels painted`);
  // No invalidar el token en éxito: permite reutilización dentro del TTL.
        return { status: retryResponse.status, json: retryData, success: retryResponse.ok, painted };
      } catch (e) {
        // Seguir al manejo estándar abajo
      }
    }

    let responseData = null;
    try {
      const text = await response.text();
      if (text.trim()) {
        responseData = JSON.parse(text);
      } else {
        responseData = {}; // Empty response
      }
    } catch (parseError) {
      log(`[API] Warning: Could not parse response JSON: ${parseError.message}`);
      responseData = {}; // Use empty object if JSON parse fails
    }

    const painted = responseData?.painted || 0;
    log(`[API] Success: ${painted} pixels painted`);

  // No invalidar el token en éxito: permite reutilización dentro del TTL.
    return {
      status: response.status,
      json: responseData,
      success: response.ok,
      painted: painted
    };
  } catch (error) {
    // Manejo específico para timeouts y abort errors
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      log(`[API] Request timeout for tile ${tileX},${tileY}`);
      return {
        status: 408,
        json: { error: 'Request timeout' },
        success: false,
        painted: 0
      };
    }
    log(`[API] Network error: ${error.message}`);
    return {
      status: 0,
      json: { error: error.message },
      success: false,
      painted: 0
    };
  }
}

// Descarga y evalúa el bot seleccionado (compartido para otros lanzadores si aplica)
export async function downloadAndExecuteBot(botType, rawBase) {
  log(`📥 Descargando bot: ${botType}`);
  try {
    const botFiles = {
      'farm': 'Auto-Farm.js',
      'image': 'Auto-Image.js',
      'guard': 'Auto-Guard.js'
    };

    const fileName = botFiles[botType];
    if (!fileName) throw new Error(`Tipo de bot desconocido: ${botType}`);

    const url = `${rawBase}/${fileName}`;
    log(`🌐 URL: ${url}`);

    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const code = await response.text();
    log(`✅ Bot descargado (${code.length} chars), inyectando...`);

    const sourceURL = `\n//# sourceURL=${url}`;
    
    // Para que el launcher pueda capturar tokens de turnstile.js,
    // ejecutamos SIEMPRE con eval() en el contexto global actual
    // evitando crear contextos aislados con <script> tags o import()
    log('🚀 Ejecutando bot en contexto global (para acceso a turnstile.js)...');
    (0, eval)(code + sourceURL);
    log('✅ Bot ejecutado con acceso completo a turnstile.js');
    try {
      // Auto-invocación segura según tipo
      if (botType === 'guard' && typeof window.runGuard === 'function' && !window.__wplaceBot?.guardRunning) {
        log('▶️ Invocando runGuard() automáticamente');
        window.runGuard();
      } else if (botType === 'farm' && typeof window.runFarm === 'function' && !window.__wplaceBot?.farmRunning) {
        log('▶️ Invocando runFarm() automáticamente');
        window.runFarm();
      } else if (botType === 'image' && typeof window.runImage === 'function' && !window.__wplaceBot?.imageRunning) {
        log('▶️ Invocando runImage() automáticamente');
        window.runImage();
      } else {
        log('ℹ️ No se auto-invocó (ya running o función no expuesta)');
      }
    } catch (e) {
      log('⚠️ Error auto-invocando runner:', e?.message || e);
    }
    return true;
  } catch (error) {
    log('❌ Error descargando/ejecutando bot:', error.message);
    throw error;
  }
}
