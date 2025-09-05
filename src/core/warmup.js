import { log } from "./logger.js";
import { isPaletteOpen, autoClickPaintButton, findAndClickPaintButton } from "./dom.js";
import { waitForPawtect } from "./turnstile.js";

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
