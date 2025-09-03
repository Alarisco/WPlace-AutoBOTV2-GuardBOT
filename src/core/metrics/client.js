import { fetchWithTimeout } from "../http.js";
import { getMetricsConfig, computeUserHash, getAnonymousId } from "./config.js";
import { log } from "../logger.js";

// Helper: POST JSON con headers y API key
async function postJson(url, body, { timeout, apiKey }) {
  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['X-API-Key'] = apiKey;
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    timeout
  });
  return res;
}

function safeJson(res) {
  return res.text().then(t => {
    try { return t ? JSON.parse(t) : {}; } catch { return {}; }
  });
}

// Envío robusto con reintentos mínimos, silencioso en error
async function send(body, overrides) {
  const cfg = getMetricsConfig(overrides);
  if (!cfg.ENABLED) return { ok: false, skipped: true };
  const url = `${cfg.BASE_URL}/v1/events`;

  let attempt = 0;
  let lastErr = null;
  while (attempt <= cfg.RETRIES) {
    try {
      const res = await postJson(url, body, { timeout: cfg.TIMEOUT_MS, apiKey: cfg.API_KEY });
      if (!res.ok) {
        const data = await safeJson(res);
        // No levantar excepción; log suave y salir
        log(`[METRICS] HTTP ${res.status}: ${data?.message || data?.detail || 'error'}`);
        return { ok: false, status: res.status, data };
      }
      const data = await safeJson(res);
      // Log de éxito minimal para confirmar envío
      try {
        const t = body?.event_type;
        const d = body?.pixel_delta;
        const v = body?.bot_variant;
        if (t === 'session_start' || t === 'session_end' || t === 'session_ping') {
          log(`[METRICS] sent ${t} (${v})`);
        } else if (t === 'pixel_repaired') {
          log(`[METRICS] repaired +${d ?? 0} (${v})`);
        } else if (t) {
          log(`[METRICS] sent ${t} (${v})`);
        }
      } catch {}
      return { ok: true, data };
    } catch (e) {
      lastErr = e;
      attempt++;
      if (attempt > cfg.RETRIES) break;
      await new Promise(r => setTimeout(r, 300 * attempt));
    }
  }
  log(`[METRICS] error: ${lastErr?.message || lastErr}`);
  return { ok: false, error: lastErr?.message || String(lastErr) };
}

// API pública del cliente de métricas

/**
 * Envía un evento crudo.
 */
export async function sendEvent({ botVariant, eventType, pixelDelta, timestamp, metadata } = {}, overrides) {
  const cfg = getMetricsConfig(overrides);
  if (!cfg.ENABLED) return { ok: false, skipped: true };

  const body = {};
  body.bot_variant = botVariant || cfg.VARIANT;
  body.event_type = eventType;
  if (typeof pixelDelta === 'number') body.pixel_delta = pixelDelta;
  if (timestamp) body.timestamp = timestamp;
  if (metadata && typeof metadata === 'object') body.event_metadata = metadata;

  // Generar hash anónimo estable por navegador sin exponer identidad
  const anon = getAnonymousId();
  if (anon) {
    const userHash = await computeUserHash(anon);
    if (userHash) body.user_hash = await userHash;
  }

  return send(body, overrides);
}

/**
 * Marca inicio de sesión/uso del bot.
 */
export async function sessionStart({ botVariant, metadata } = {}, overrides) {
  return sendEvent({ botVariant, eventType: 'session_start', metadata }, overrides);
}

/**
 * Ping periódico para sesiones activas.
 */
export async function sessionPing({ botVariant, metadata } = {}, overrides) {
  return sendEvent({ botVariant, eventType: 'session_ping', metadata }, overrides);
}

/**
 * Fin de sesión/uso del bot.
 */
export async function sessionEnd({ botVariant, metadata } = {}, overrides) {
  return sendEvent({ botVariant, eventType: 'session_end', metadata }, overrides);
}

/**
 * Reporta píxeles reparados (Auto-Guard) o pintados (otros bots).
 */
export async function pixelsRepaired(count, { botVariant, metadata } = {}, overrides) {
  if (!Number.isFinite(count) || count <= 0) return { ok: false, skipped: true };
  return sendEvent({ botVariant, eventType: 'pixel_repaired', pixelDelta: Math.trunc(count), metadata }, overrides);
}

/**
 * Reporta errores operativos.
 */
export async function reportError(message, { botVariant, metadata } = {}, overrides) {
  const md = { message, ...(metadata || {}) };
  return sendEvent({ botVariant, eventType: 'error', metadata: md }, overrides);
}

/**
 * Envía un evento genérico con nombre y metadatos.
 * Azúcar sintáctico sobre sendEvent para instrumentación granular.
 */
export async function trackEvent(name, { botVariant, metadata, timestamp } = {}, overrides) {
  if (!name) return { ok: false, skipped: true };
  return sendEvent({ botVariant, eventType: name, metadata, timestamp }, overrides);
}

/**
 * Reporta píxeles pintados (Auto-Image/Auto-Farm).
 */
export async function pixelsPainted(count, { botVariant, metadata } = {}, overrides) {
  if (!Number.isFinite(count) || count <= 0) return { ok: false, skipped: true };
  return sendEvent({ botVariant, eventType: 'pixel_painted', pixelDelta: Math.trunc(count), metadata }, overrides);
}
