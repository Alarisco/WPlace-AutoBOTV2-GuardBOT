import { log } from "./logger.js";
import { isPaletteOpen, autoClickPaintButton, findAndClickPaintButton } from "./dom.js";
import { waitForPawtect, getFingerprint, getPawtectToken } from "./turnstile.js";

// Pequeña utilidad local
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Warm-up global guard para no repetir
if (!window.__WPA_WARMUP__) {
  window.__WPA_WARMUP__ = { done: false, running: false };
}

/**
 * Realiza una acción mínima de pintado a través de la UI nativa para capturar fp/x-pawtect-token/t.
 * Seguro de llamar múltiples veces: solo ejecuta una vez por sesión.
 */
export async function warmUpForTokens(context = "bot") {
  const st = window.__WPA_WARMUP__;
  if (st.done || st.running) return false;
  st.running = true;
  try {
    log(`🧪 [warm-up:${context}] Iniciando warm-up para capturar credenciales`);

    // 1) Asegurar paleta abierta (clic en Paint si es necesario)
    if (!isPaletteOpen()) {
      await autoClickPaintButton(3, false);
      // una espera breve para que la UI aparezca
      await sleep(800);
    }

    // 2) Seleccionar algún color (preferir transparente si existe)
    try {
      let btn = document.querySelector('button#color-0');
      if (!btn) {
        const any = document.querySelector('button[id^="color-"]');
        if (any) btn = any;
      }
      if (btn && !btn.disabled) {
        btn.click();
        await sleep(150);
      }
    } catch {}

    // 3) Click en un punto aleatorio del primer canvas visible
    const canvas = Array.from(document.querySelectorAll('canvas')).find(c => c.offsetParent !== null && c.width > 10 && c.height > 10);
    if (canvas) {
      // calcular un punto seguro dentro del canvas visible
      const rect = canvas.getBoundingClientRect();
      const rx = rect.left + Math.max(4, Math.random() * Math.max(8, rect.width - 8));
      const ry = rect.top + Math.max(4, Math.random() * Math.max(8, rect.height - 8));

      try {
        canvas.setAttribute('tabindex', '0');
        canvas.focus();
      } catch {}

      try {
        const ME = (typeof window !== 'undefined' && window.MouseEvent) ? window.MouseEvent : null;
        const KE = (typeof window !== 'undefined' && window.KeyboardEvent) ? window.KeyboardEvent : null;
        if (ME) {
          canvas.dispatchEvent(new ME('mousemove', { clientX: rx, clientY: ry, bubbles: true }));
          canvas.dispatchEvent(new ME('mousedown', { clientX: rx, clientY: ry, bubbles: true }));
          await sleep(30);
          canvas.dispatchEvent(new ME('mouseup', { clientX: rx, clientY: ry, bubbles: true }));
        } else {
          // Fallback genérico
          canvas.click();
        }
        // Algunas UIs confirman con tecla espacio
        if (KE) {
          canvas.dispatchEvent(new KE('keydown', { key: ' ', code: 'Space', bubbles: true }));
          await sleep(20);
          canvas.dispatchEvent(new KE('keyup', { key: ' ', code: 'Space', bubbles: true }));
        }
      } catch {}
    }

    // 4) Intentar presionar nuevamente el botón principal para forzar confirmación, si aplica
    try {
      // Un solo intento suave, sin doble clic
      findAndClickPaintButton(false, false);
    } catch {}

    // 5) Esperar brevemente y verificar si ya capturamos pawtect/fp
    await sleep(3000);
    try { await waitForPawtect(1500); } catch {}
    log(`✅ [warm-up:${context}] Finalizado (best-effort)`);
    st.done = true;
    return true;
  } catch (e) {
    log(`⚠️ [warm-up:${context}] Falló: ${e?.message || e}`);
    return false;
  } finally {
    st.running = false;
  }
}

/**
 * Fuerza la captura de fp antes de iniciar cualquier bot.
 * Repite pequeñas interacciones de UI hasta que getFingerprint() devuelva valor o se alcance el timeout.
 * Devuelve true si se capturó fp, false si expiró el tiempo sin lograrlo.
 */
export async function ensureFingerprintReady(context = "bot", { timeoutMs = 15000, maxAttempts = 5 } = {}) {
  const start = Date.now();
  // Fast-path si ya existe
  if (getFingerprint()) {
    log(`🆔 [fp:${context}] Ya disponible (fast-path)`);
    return true;
  }

  log(`🧪 [fp:${context}] Asegurando captura de fp antes de iniciar (timeout ${timeoutMs}ms)`);

  let attempt = 0;
  while (!getFingerprint() && Date.now() - start < timeoutMs && attempt < maxAttempts) {
    attempt++;
    try {
      await attemptUiInteraction(context, attempt);
    } catch {}

    // Espera de activación del botón (3s) + pequeña espera de señal
    await sleep(3000);
    try { await waitForPawtect(2000); } catch {}

    const haveFp = !!getFingerprint();
    const havePaw = !!getPawtectToken();
    log(`🔎 [fp:${context}] intento ${attempt}: pawtect=${havePaw} fp=${haveFp}`);
    if (haveFp) break;

    // Pequeño backoff adicional antes del siguiente intento
    await sleep(1000 + Math.min(2000, attempt * 300));
  }

  const ok = !!getFingerprint();
  log(ok ? `✅ [fp:${context}] Capturado antes de iniciar` : `⏰ [fp:${context}] No se capturó fp dentro del tiempo`);
  return ok;
}

// Pequeña interacción idempotente que intenta disparar el flujo de pintado nativo
async function attemptUiInteraction(context = "bot", attempt = 1) {
  // 1) Abrir paleta si no está abierta
  if (!isPaletteOpen()) {
    await autoClickPaintButton(2, false);
    await sleep(600);
  }

  // 2) Seleccionar color (transparente si existe, o el primero disponible)
  try {
    let btn = document.querySelector('button#color-0');
    if (!btn) {
      const any = document.querySelector('button[id^="color-"]');
      if (any) btn = any;
    }
    if (btn && !btn.disabled) {
      btn.click();
      await sleep(120);
    }
  } catch {}

  // 3) Interactuar con el canvas
  const canvas = Array.from(document.querySelectorAll('canvas')).find(c => c.offsetParent !== null && c.width > 10 && c.height > 10);
  if (canvas) {
    const rect = canvas.getBoundingClientRect();
    const rx = rect.left + Math.max(4, Math.random() * Math.max(8, rect.width - 8));
    const ry = rect.top + Math.max(4, Math.random() * Math.max(8, rect.height - 8));
    try { canvas.setAttribute('tabindex', '0'); canvas.focus(); } catch {}
    try {
      const ME = (typeof window !== 'undefined' && window.MouseEvent) ? window.MouseEvent : null;
      const KE = (typeof window !== 'undefined' && window.KeyboardEvent) ? window.KeyboardEvent : null;
      if (ME) {
        canvas.dispatchEvent(new ME('mousemove', { clientX: rx, clientY: ry, bubbles: true }));
        canvas.dispatchEvent(new ME('mousedown', { clientX: rx, clientY: ry, bubbles: true }));
        await sleep(25);
        canvas.dispatchEvent(new ME('mouseup', { clientX: rx, clientY: ry, bubbles: true }));
      } else {
        canvas.click();
      }
      if (KE) {
        canvas.dispatchEvent(new KE('keydown', { key: ' ', code: 'Space', bubbles: true }));
        await sleep(15);
        canvas.dispatchEvent(new KE('keyup', { key: ' ', code: 'Space', bubbles: true }));
      }
    } catch {}
  }

  // 4) Un clic suave en el botón de pintar si aplica
  try { findAndClickPaintButton(false, false); } catch {}
}
