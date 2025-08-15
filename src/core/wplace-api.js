import { fetchWithTimeout } from "./http.js";

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
    headers: { "Content-Type": "application/json" },
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

// Post píxel para farm (versión original)
export async function postPixel(coords, colors, turnstileToken) {
  try {
    const response = await fetch(`${BASE}/s0/paint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ coords, colors, t: turnstileToken })
    });

    const responseData = await response.json().catch(() => ({}));

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
