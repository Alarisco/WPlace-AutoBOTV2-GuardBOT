/**
 * Configuración del servidor de métricas (WPlace Metrics API)
 *
 * Objetivo
 * - Centralizar y facilitar la configuración de la API de métricas.
 * - Permitir overrides vía:
 *   1) Parámetros de URL (metricsUrl, metricsKey, metricsSalt, metricsEnabled, metricsVariant)
 *   2) Ventana global: window.__WPLACE_METRICS__ o window.__WPLACE_CONFIG__.metrics
 *   3) Overrides programáticos (parámetro de getMetricsConfig)
 *
 * No hace llamadas de red; solo provee configuración y utilidades.
 */

// Valores por defecto seguros para desarrollo local
const DEFAULTS = Object.freeze({
  ENABLED: true,                 // Habilitar/deshabilitar envío de métricas
  BASE_URL: 'https://metricswplaceapi.alarisco.xyz', // URL base del servidor de métricas
  API_KEY: 'wplace_2c8e4b2b1e0a4f7cb9d3a76f4a1c0b6f', // API Key por defecto para despliegue (puedes sobreescribir)
  PUBLIC_SALT: 'wplace_public_salt_2024', // Sal pública por defecto (alineada con docker-compose)
  VARIANT: 'auto-guard',         // Variant por defecto; cada bot debe sobreescribirlo
  TIMEOUT_MS: 10000,             // Timeout de requests
  RETRIES: 1,                    // Reintentos básicos para ingesta
  PING_INTERVAL_MS: 2 * 60 * 1000 // 2 minutos para session_ping (mejor reflejo de usuarios online)
});

function readFromUrl() {
  try {
  if (typeof window === 'undefined' || !globalThis.URLSearchParams) return {};
  const sp = new globalThis.URLSearchParams(globalThis.location?.search || '');
    const enabled = sp.get('metricsEnabled');
    const baseUrl = sp.get('metricsUrl');
    const apiKey = sp.get('metricsKey');
    const salt = sp.get('metricsSalt');
    const variant = sp.get('metricsVariant');
    const timeout = sp.get('metricsTimeoutMs');
    const retries = sp.get('metricsRetries');
    const ping = sp.get('metricsPingMs');

    const out = {};
    if (enabled != null) out.ENABLED = enabled === 'true' || enabled === '1';
    if (baseUrl) out.BASE_URL = baseUrl;
    if (apiKey) out.API_KEY = apiKey;
    if (salt) out.PUBLIC_SALT = salt;
    if (variant) out.VARIANT = variant;
    if (timeout && !Number.isNaN(Number(timeout))) out.TIMEOUT_MS = Number(timeout);
    if (retries && !Number.isNaN(Number(retries))) out.RETRIES = Number(retries);
    if (ping && !Number.isNaN(Number(ping))) out.PING_INTERVAL_MS = Number(ping);
    return out;
  } catch {
    return {};
  }
}

function readFromGlobal() {
  // Prioridad: window.__WPLACE_METRICS__ > window.__WPLACE_CONFIG__?.metrics
  const g = (typeof window !== 'undefined' && (window.__WPLACE_METRICS__ || window.__WPLACE_CONFIG__?.metrics)) || {};
  const out = {};
  if (typeof g.ENABLED === 'boolean') out.ENABLED = g.ENABLED;
  if (typeof g.BASE_URL === 'string') out.BASE_URL = g.BASE_URL;
  if (typeof g.API_KEY === 'string') out.API_KEY = g.API_KEY;
  if (typeof g.PUBLIC_SALT === 'string') out.PUBLIC_SALT = g.PUBLIC_SALT;
  if (typeof g.VARIANT === 'string') out.VARIANT = g.VARIANT;
  if (Number.isFinite(g.TIMEOUT_MS)) out.TIMEOUT_MS = g.TIMEOUT_MS;
  if (Number.isFinite(g.RETRIES)) out.RETRIES = g.RETRIES;
  if (Number.isFinite(g.PING_INTERVAL_MS)) out.PING_INTERVAL_MS = g.PING_INTERVAL_MS;
  return out;
}

function sanitize(cfg) {
  const out = { ...cfg };
  // Normalizar URL base quitando trailing slash
  if (typeof out.BASE_URL === 'string') {
    out.BASE_URL = out.BASE_URL.replace(/\/$/, '');
  }
  // Normalizar variant
  if (!['auto-guard', 'auto-farm', 'auto-image', 'launcher'].includes(out.VARIANT)) {
    out.VARIANT = DEFAULTS.VARIANT;
  }
  return out;
}

// Snapshot inicial (se recalcula en getMetricsConfig para permitir cambios dinámicos)
let _cached = null;

/**
 * Retorna la configuración efectiva de métricas.
 * Precedencia: DEFAULTS < Global < URL < overrides (parámetro)
 */
export function getMetricsConfig(overrides = {}) {
  const merged = {
    ...DEFAULTS,
    ...readFromGlobal(),
    ...readFromUrl(),
    ...overrides
  };
  _cached = sanitize(merged);
  return _cached;
}

/**
 * Establece/actualiza configuración global en tiempo de ejecución.
 * Útil para ajustar valores desde la consola o antes de cargar un bot.
 */
export function setMetricsConfig(patch = {}) {
  if (typeof window === 'undefined') return;
  window.__WPLACE_METRICS__ = { ...(window.__WPLACE_METRICS__ || {}), ...patch };
  _cached = null; // invalidar cache
}

/**
 * Utilidad: generar SHA-256 hex del string dado (Web Crypto API).
 */
export async function sha256Hex(str) {
  const Encoder = globalThis.TextEncoder;
  const webCrypto = globalThis.crypto;
  if (!Encoder || !webCrypto?.subtle) throw new Error('WebCrypto no disponible');
  const enc = new Encoder();
  const buf = await webCrypto.subtle.digest('SHA-256', enc.encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Genera user_hash usando PUBLIC_SALT + userIdentifier.
 * Si no hay salt configurada, retorna null para evitar exponer identificadores en texto.
 */
export async function computeUserHash(userIdentifier, saltOverride) {
  const cfg = _cached || getMetricsConfig();
  const salt = typeof saltOverride === 'string' ? saltOverride : cfg.PUBLIC_SALT;
  if (!salt || !userIdentifier) return null;
  return sha256Hex(String(salt) + String(userIdentifier));
}

// Exportar los defaults por si se requieren en otros módulos
export const METRICS_DEFAULTS = DEFAULTS;

/**
 * Retorna un identificador anónimo estable por navegador.
 * Prioriza window.__WPLACE_METRICS__.anonId, si no existe usa localStorage.
 */
export function getAnonymousId() {
  try {
    if (typeof window === 'undefined') return null;
    // Permitir override explícito
    if (window.__WPLACE_METRICS__?.anonId) return String(window.__WPLACE_METRICS__.anonId);
    const key = 'wplace_metrics_aid';
    let val = null;
    try { val = localStorage.getItem(key); } catch {}
    if (val && typeof val === 'string') return val;
    // Generar aleatorio críptograficamente seguro (16 bytes -> hex 32)
    const bytes = new Uint8Array(16);
    (globalThis.crypto || {}).getRandomValues?.(bytes);
    const rnd = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    try { localStorage.setItem(key, rnd); } catch {}
    // Guardar también en global para esta sesión
    if (!window.__WPLACE_METRICS__) window.__WPLACE_METRICS__ = {};
    window.__WPLACE_METRICS__.anonId = rnd;
    return rnd;
  } catch {
    return null;
  }
}
