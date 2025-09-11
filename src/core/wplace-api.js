import { fetchWithTimeout } from "./http.js";
import { ensureToken, invalidateToken, getPawtectToken, getFingerprint, waitForPawtect } from "./turnstile.js";
import { ensureFingerprint } from './fingerprint.js';
import { computePawtect } from './pawtect.js';
import { log } from "./logger.js";
import { safeParseResponse } from './json.js';
// pixel-client eliminado: usamos directamente postPixelBatchImage/postPixel

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
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
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

// postPixelBatch / postPixelBatchSafe eliminados

// Post píxel para farm (replicado del ejemplo con manejo de 403)
export async function postPixel(coords, colors, turnstileToken, tileX, tileY) {
  try {
    // Normalizar formatos de entrada (coords puede llegar como [{x,y}] | [[x,y]] | [x,y,...])
    const normalizeCoords = (arr) => {
      if (!Array.isArray(arr)) return [];
      const flat = [];
      // Caso 1: array plano de números
      if (arr.length > 0 && typeof arr[0] === 'number') {
        for (let i = 0; i < arr.length; i += 2) {
          const x = Math.trunc(arr[i]);
          const y = Math.trunc(arr[i + 1]);
          if (Number.isFinite(x) && Number.isFinite(y)) {
            flat.push(((x % 1000) + 1000) % 1000, ((y % 1000) + 1000) % 1000);
          }
        }
        return flat;
      }
      // Caso 2: array de objetos {x,y}
      if (typeof arr[0] === 'object' && arr[0] && ('x' in arr[0] || 'y' in arr[0])) {
        for (const p of arr) {
          const x = Math.trunc(p?.x);
          const y = Math.trunc(p?.y);
          if (Number.isFinite(x) && Number.isFinite(y)) {
            flat.push(((x % 1000) + 1000) % 1000, ((y % 1000) + 1000) % 1000);
          }
        }
        return flat;
      }
      // Caso 3: array de arrays [x,y]
      if (Array.isArray(arr[0])) {
        for (const p of arr) {
          const x = Math.trunc(p?.[0]);
          const y = Math.trunc(p?.[1]);
          if (Number.isFinite(x) && Number.isFinite(y)) {
            flat.push(((x % 1000) + 1000) % 1000, ((y % 1000) + 1000) % 1000);
          }
        }
        return flat;
      }
      return flat;
    };
    const normalizeColors = (cols) => Array.isArray(cols) ? cols.map(c => Math.trunc(Number(c)) || 0) : [];

    const coordsNorm = normalizeCoords(coords);
    const colorsNorm = normalizeColors(colors);
    if (coordsNorm.length === 0 || colorsNorm.length === 0 || (coordsNorm.length / 2) !== colorsNorm.length) {
      return { status: 400, json: { error: 'Invalid coords/colors format' }, success: false };
    }
    
    // Intento de cálculo dinámico de pawtect antes de esperar
  // Fingerprint proactivo si falta
  let fp = getFingerprint();
  if (!fp) { try { fp = await ensureFingerprint({}); } catch {} }
  let pawtect = getPawtectToken();
    if (!pawtect) {
      try {
        // Usar datos normalizados para evitar desajustes con el cuerpo real
        const dyn = await computePawtect({ colors: colorsNorm, coords: coordsNorm, t: turnstileToken, ...(fp ? { fp } : {}) });
        if (dyn) pawtect = dyn;
      } catch {}
    }
    if (!fp || !pawtect) {
      try { await waitForPawtect(1500); } catch {}
      // Releer
      if (!pawtect) pawtect = getPawtectToken();
      if (!fp) fp = getFingerprint();
      if (!pawtect) {
        try {
          const dyn2 = await computePawtect({ colors: colorsNorm, coords: coordsNorm, t: turnstileToken, ...(fp ? { fp } : {}) });
          if (dyn2) pawtect = dyn2;
        } catch {}
      }
    }
  const body = JSON.stringify({ colors: colorsNorm, coords: coordsNorm, t: turnstileToken, ...(fp ? { fp } : {}) });
    
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
        if (!pawtect) {
          try {
            const dyn3 = await computePawtect({ colors: colorsNorm, coords: coordsNorm, t: newToken, ...(fp ? { fp } : {}) });
            if (dyn3) pawtect = dyn3;
          } catch {}
        }
        
        // Retry the request with new token
        const retryBody = JSON.stringify({ 
          colors: colorsNorm, 
          coords: coordsNorm, 
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
  if (!pawtect) {
    try {
      const dyn4 = await computePawtect({ colors: colorsNorm, coords: coordsNorm, t: newToken, ...(fp ? { fp } : {}) });
      if (dyn4) pawtect = dyn4;
    } catch {}
  }
  const retryBody = JSON.stringify({ colors: colorsNorm, coords: coordsNorm, t: newToken, ...(fp ? { fp } : {}) });
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
  const retryParsed = await safeParseResponse(retryResponse);
  if (retryResponse.ok) {
          try { invalidateToken(); } catch {}
        }
  return { status: retryResponse.status, json: retryParsed.json, success: retryResponse.ok };
      } catch (e) {
        // Continuar devolviendo el 5xx original si falla
      }
    }

  const parsed = await safeParseResponse(response);
  return { status: response.status, json: parsed.json, success: response.ok };
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
    // Normalizar coords/colors al formato exacto que espera el backend
    const normalizeCoords = (arr) => {
      if (!Array.isArray(arr)) return [];
      const flat = [];
      if (arr.length > 0 && typeof arr[0] === 'number') {
        for (let i = 0; i < arr.length; i += 2) {
          const x = Math.trunc(arr[i]);
          const y = Math.trunc(arr[i + 1]);
          if (Number.isFinite(x) && Number.isFinite(y)) {
            flat.push(((x % 1000) + 1000) % 1000, ((y % 1000) + 1000) % 1000);
          }
        }
        return flat;
      }
      if (typeof arr[0] === 'object' && arr[0] && ('x' in arr[0] || 'y' in arr[0])) {
        for (const p of arr) {
          const x = Math.trunc(p?.x);
          const y = Math.trunc(p?.y);
          if (Number.isFinite(x) && Number.isFinite(y)) {
            flat.push(((x % 1000) + 1000) % 1000, ((y % 1000) + 1000) % 1000);
          }
        }
        return flat;
      }
      if (Array.isArray(arr[0])) {
        for (const p of arr) {
          const x = Math.trunc(p?.[0]);
          const y = Math.trunc(p?.[1]);
          if (Number.isFinite(x) && Number.isFinite(y)) {
            flat.push(((x % 1000) + 1000) % 1000, ((y % 1000) + 1000) % 1000);
          }
        }
        return flat;
      }
      return flat;
    };
    const normalizeColors = (cols) => Array.isArray(cols) ? cols.map(c => Math.trunc(Number(c)) || 0) : [];

    const coordsNorm = normalizeCoords(coords);
    const colorsNorm = normalizeColors(colors);
    if (coordsNorm.length === 0 || colorsNorm.length === 0 || (coordsNorm.length / 2) !== colorsNorm.length) {
      log(`[API] Invalid coords/colors for tile ${tileX},${tileY} → coordsPairs=${coordsNorm.length/2} colors=${colorsNorm.length}`);
      return { status: 400, json: { error: 'Invalid coords/colors format' }, success: false, painted: 0 };
    }
    // Ensure pawtect tokens are present (best-effort wait)
  // Fingerprint proactivo si falta
  let fp = getFingerprint();
  if (!fp) { try { fp = await ensureFingerprint({}); } catch {} }
  // Siempre intentar cálculo dinámico (override) para evitar mismatch aleatorio
  let pawtect = null;
  try {
    const preview = { colors, coords, t: turnstileToken || 'seed', ...(fp ? { fp } : { fp: 'seed' }) };
    const dyn = await computePawtect(preview);
    if (dyn) pawtect = dyn; else pawtect = getPawtectToken();
  } catch { pawtect = getPawtectToken(); }
  if (!fp) { try { await waitForPawtect(1200); } catch {} fp = getFingerprint(); }
    // Prepare exact body format as used in example
  const body = JSON.stringify({ 
      colors: colorsNorm, 
      coords: coordsNorm, 
      t: turnstileToken,
      ...(fp ? { fp } : {})
    });
  // Hash diagnóstico (FNV-1a simplificado) para detectar cuerpos repetidos en 500
  let bodyHash = '';
  try {
    let h = 0x811c9dc5;
    for (let i=0;i<body.length;i++) { h ^= body.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    bodyHash = ('00000000'+(h>>>0).toString(16)).slice(-8);
  } catch {}
    
    log(`[API] Sending batch to tile ${tileX},${tileY} with ${colors.length} pixels, token: ${turnstileToken ? turnstileToken.substring(0, 50) + '...' : 'null'}`);
    
  log(`[API] postPixelBatchImage include: pawtect=${!!pawtect} fp=${!!fp} bodyHash=${bodyHash}`);
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
          colors: colorsNorm, 
          coords: coordsNorm, 
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
        
  const retryParsed = await safeParseResponse(retryResponse);
  const painted = retryParsed.json?.painted || 0;
        log(`[API] Retry result: ${painted} pixels painted`);

  // No invalidar el token en éxito: permite reutilización dentro del TTL.

  return { status: retryResponse.status, json: retryParsed.json, success: retryResponse.ok, painted };
        
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
  const retryBody = JSON.stringify({ colors: colorsNorm, coords: coordsNorm, t: newToken, ...(fp ? { fp } : {}) });
        log(`[API] Retrying after ${response.status} with fresh token: ${newToken.substring(0, 50)}...`);
        const retryResponse = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...(pawtect ? { 'x-pawtect-token': pawtect } : {}) },
          body: retryBody
        });
  const retryParsed2 = await safeParseResponse(retryResponse);
  const painted = retryParsed2.json?.painted || 0;
        log(`[API] Retry after ${response.status}: ${painted} pixels painted`);
  // No invalidar el token en éxito: permite reutilización dentro del TTL.
  return { status: retryResponse.status, json: retryParsed2.json, success: retryResponse.ok, painted };
      } catch (e) {
        // Seguir al manejo estándar abajo
      }
    }

  const finalParsed = await safeParseResponse(response);
  const painted = finalParsed.json?.painted || 0;
    log(`[API] Success: ${painted} pixels painted`);

  // No invalidar el token en éxito: permite reutilización dentro del TTL.
    return {
      status: response.status,
  json: finalParsed.json,
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
    return true;
  } catch (error) {
    log('❌ Error descargando/ejecutando bot:', error.message);
    throw error;
  }
}
