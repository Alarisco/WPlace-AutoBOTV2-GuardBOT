/* Centralización de lógica de pintado para reutilizar token y protección */
import { ensureToken, getPawtectToken, getFingerprint, waitForPawtect } from './turnstile.js';
import { fetchWithTimeout } from './http.js';
import { safeParseResponse } from './json.js';
import { log } from './logger.js';

const BASE = 'https://backend.wplace.live';

// Estados internos para reuso
let _lastToken = null;
let _lastTokenExpiry = 0; // epoch ms
const TOKEN_SOFT_TTL = 240000; // 4 min (igual que turnstile.js) - aquí solo referencia

function tokenStillValid() {
  return _lastToken && Date.now() < _lastTokenExpiry - 5000; // margen 5s
}

export function getCachedToken() { return tokenStillValid() ? _lastToken : null; }

async function getToken(force = false) {
  if (!force && tokenStillValid()) return _lastToken;
  const t = await ensureToken(force);
  if (t) {
    _lastToken = t;
    _lastTokenExpiry = Date.now() + TOKEN_SOFT_TTL;
  }
  return t;
}

export async function postPixelUnified({ tileX, tileY, coords, colors, forceNewToken = false, timeout = 20000 }) {
  if (!Array.isArray(coords) || !Array.isArray(colors) || coords.length === 0 || colors.length === 0) {
    return { ok: false, status: 0, painted: 0, error: 'invalid-payload' };
  }
  try { await waitForPawtect(3000); } catch {}
  let pawtect = getPawtectToken();
  let fp = getFingerprint();
  if (!fp) { try { await waitForPawtect(1500); } catch {} fp = getFingerprint(); pawtect = getPawtectToken(); }

  const token = await getToken(forceNewToken);
  if (!token) return { ok: false, status: 0, painted: 0, error: 'no-token' };

  const body = JSON.stringify({ colors, coords, t: token, ...(fp ? { fp } : {}) });

  const res = await fetchWithTimeout(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...(pawtect ? { 'x-pawtect-token': pawtect } : {}) },
    credentials: 'include',
    body,
    timeout
  });

  const parsed = await safeParseResponse(res);
  if (res.status === 403) {
    return { ok: false, status: 403, painted: 0, category: 'auth', error: 'forbidden' };
  }
  if (res.status >= 500) {
    return { ok: false, status: res.status, painted: 0, category: 'server', error: 'server-error' };
  }
  if (!res.ok) {
    return { ok: false, status: res.status, painted: 0, category: 'client', error: parsed.json?.message || 'request-failed' };
  }
  const painted = parsed.json?.painted || (colors.length) || 0;
  return { ok: true, status: res.status, painted, json: parsed.json || {}, category: 'success' };
}

// Retry wrapper con política homogénea
export async function postPixelWithRetry(opts, { maxAttempts = 2 } = {}) {
  let lastError = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const r = await postPixelUnified({ ...opts, forceNewToken: attempt > 1 });
    if (r.ok) return { ...r, attempts: attempt };
    lastError = r;
    if (r.status === 403 && attempt < maxAttempts) {
      log(`🔄 403 -> regenerar token (attempt ${attempt})`);
      continue;
    }
    if (r.status >= 500 && attempt < maxAttempts) {
      const backoff = 1000 * attempt;
      await new Promise(res => setTimeout(res, backoff));
      continue;
    }
    break;
  }
  return { ...lastError, attempts: maxAttempts };
}
