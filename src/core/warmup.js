import { log } from "./logger.js";
import { getFingerprint, getPawtectToken } from "./turnstile.js";
// Eliminado token-capture-window y token-interceptor (flujo ahora totalmente pasivo/dinámico)
import { seedPawtect } from './pawtect.js';
import { ensureFingerprint } from './fingerprint.js';

/**
 * Función principal para preparar tokens antes de iniciar un bot
 * Muestra la ventana de captura si es necesario
 * @param {string} botName - Nombre del bot que se está iniciando
 * @returns {Promise<Object>} - Resultado de la captura
 */
export async function prepareTokensForBot(botName = "Bot") {
  log(`🚀 [${botName}] Preparando tokens (modo simplificado)`);
  // Precarga no bloqueante
  try { ensureFingerprint({}); } catch {}
  try { seedPawtect(); } catch {}
  // No hay UI: devolvemos estado actual
  return { success: true, fingerprint: getFingerprint(), pawtectToken: getPawtectToken(), skipped: true };
}

/**
 * Función de compatibilidad - reemplaza warmUpForTokens
 * @deprecated Usar prepareTokensForBot en su lugar
 */
export async function warmUpForTokens(context = "bot") {
  log(`⚠️ warmUpForTokens está deprecado, usar prepareTokensForBot`);
  const result = await prepareTokensForBot(context);
  return result.success;
}

/**
 * Función de compatibilidad - verifica si ya tenemos fingerprint
 * @deprecated El nuevo sistema maneja esto automáticamente
 */
export async function ensureFingerprintReady(context = "bot", options = {}) {
  log(`⚠️ ensureFingerprintReady está deprecado, usar prepareTokensForBot`);
  
  // Fast-path si ya existe
  const fp = getFingerprint();
  if (fp) {
    log(`🆔 [fp:${context}] Ya disponible`);
    return true;
  }
  
  // Usar el nuevo sistema
  const result = await prepareTokensForBot(context);
  return result.success && result.fingerprint;
}

/**
 * Verifica si tenemos tokens disponibles sin mostrar UI
 * @returns {Object} - Estado de los tokens
 */
export function checkTokensAvailable() {
  const fingerprint = getFingerprint();
  const pawtectToken = getPawtectToken();
  return {
    hasFingerprint: !!fingerprint,
    hasPawtectToken: !!pawtectToken,
  interceptorReady: true,
  allReady: !!fingerprint && !!pawtectToken
  };
}
