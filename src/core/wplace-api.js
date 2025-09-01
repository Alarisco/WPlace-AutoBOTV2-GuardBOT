import { fetchWithTimeout } from "./http.js";
import { ensureToken } from "./turnstile.js";
import { log } from "./logger.js";

const BASE = "https://backend.wplace.live";

export async function getSession() {
  try {
    const me = await fetch(`${BASE}/me`, { credentials: 'include' }).then(r => r.json());
    const user = me || null;
    const c = me?.charges || {};
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
        chargeRegen: charges.cooldownMs
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
        chargeRegen: 30000
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

// Unifica post de píxel por lotes (batch por tile).
export async function postPixelBatch({ tileX, tileY, pixels, turnstileToken }) {
  // pixels: [{x,y,color}, …] relativos al tile
  const body = JSON.stringify({ pixels, token: turnstileToken });
  const r = await fetchWithTimeout(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
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
    const body = JSON.stringify({ pixels, token: turnstileToken });
    const r = await fetchWithTimeout(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body,
      credentials: "include"
    });
  let json = {};
  // If response is not JSON, ignore parse error
  try { json = await r.json(); } catch { /* ignore */ }
    return { status: r.status, json, success: r.ok };
  } catch (error) {
    return { status: 0, json: { error: error.message }, success: false };
  }
}

// Post píxel para farm (replicado del ejemplo con manejo de 403)
export async function postPixel(coords, colors, turnstileToken, tileX, tileY) {
  try {
    const body = JSON.stringify({ 
      colors: colors, 
      coords: coords, 
      t: turnstileToken 
    });
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // Timeout de 15 segundos

    const response = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
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
        
        // Retry the request with new token
        const retryBody = JSON.stringify({ 
          colors: colors, 
          coords: coords, 
          t: newToken 
        });
        
        const retryController = new AbortController();
        const retryTimeoutId = setTimeout(() => retryController.abort(), 15000);

        const retryResponse = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
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

    let responseData = null;
    try {
      const text = await response.text();
      if (text) {
        responseData = JSON.parse(text);
      }
    } catch {
      responseData = {}; // Ignorar errores de JSON parse
    }

    return {
      status: response.status,
      json: responseData,
      success: response.ok
    };
  } catch (error) {
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
    // Prepare exact body format as used in example
    const body = JSON.stringify({ 
      colors: colors, 
      coords: coords, 
      t: turnstileToken 
    });
    
    log(`[API] Sending batch to tile ${tileX},${tileY} with ${colors.length} pixels, token: ${turnstileToken ? turnstileToken.substring(0, 50) + '...' : 'null'}`);
    
    const response = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
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
          t: newToken 
        });
        
        log(`[API] Retrying with fresh token: ${newToken.substring(0, 50)}...`);
        
        const retryResponse = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
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

    return {
      status: response.status,
      json: responseData,
      success: response.ok,
      painted: painted
    };
  } catch (error) {
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

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const code = await response.text();
    log(`✅ Bot descargado (${code.length} chars), ejecutando...`);

    // Evaluar el código del bot
    (0, eval)(code);

    log('🚀 Bot ejecutado exitosamente');
    return true;
  } catch (error) {
    log('❌ Error descargando/ejecutando bot:', error.message);
    throw error;
  }
}
