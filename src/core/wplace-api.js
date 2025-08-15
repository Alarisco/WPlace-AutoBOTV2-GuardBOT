import { fetchWithTimeout } from "./http.js";

const BASE = "https://wplace.winnalabs.com/api";

export async function getSession() {
  const r = await fetchWithTimeout(`${BASE}/me`, { credentials: "include" });
  if (!r.ok) throw new Error("me failed");
  return r.json();
}

export async function checkHealth() {
  const r = await fetchWithTimeout(`${BASE}/health`);
  if (!r.ok) throw new Error("health failed");
  return r.json().catch(() => ({}));
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
  try { const j = await r.json(); msg = j?.message || msg; } catch {}
  throw new Error(`paint failed: ${msg}`);
}
