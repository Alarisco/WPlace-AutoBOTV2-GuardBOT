export const logger = {
  debugEnabled: false,
  setDebug(v) { this.debugEnabled = !!v; },
  debug(...a) { if (this.debugEnabled) console.debug("[BOT]", ...a); },
  info(...a)  { console.info("[BOT]", ...a); },
  warn(...a)  { console.warn("[BOT]", ...a); },
  error(...a) { console.error("[BOT]", ...a); }
};

// Farm-specific logger
export const log = (...a) => console.log('[WPA-UI]', ...a);

// Utility functions
export const noop = () => { /* Función vacía intencional */ };
export const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
