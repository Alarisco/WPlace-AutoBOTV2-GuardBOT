const NS = "wplace-bot";

export function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(`${NS}:${key}`)) ?? fallback; }
  catch { return fallback; }
}

export function save(key, value) {
  try { 
    localStorage.setItem(`${NS}:${key}`, JSON.stringify(value)); 
  } catch {
    // Storage not available
  }
}
