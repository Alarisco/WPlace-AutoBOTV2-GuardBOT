export const logger = {
  debugEnabled: false,
  setDebug(v) { this.debugEnabled = !!v; },
  debug(...a) { if (this.debugEnabled) console.debug("[BOT]", ...a); },
  info(...a)  { console.info("[BOT]", ...a); },
  warn(...a)  { console.warn("[BOT]", ...a); },
  error(...a) { console.error("[BOT]", ...a); }
};
