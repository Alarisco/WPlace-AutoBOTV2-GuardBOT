// Utilidades de parseo seguro para respuestas fetch
// Evita múltiples lecturas y centraliza manejo de errores
export async function safeParseResponse(response) {
  if (!response) return { ok: false, status: 0, json: {}, text: '', parseError: 'no-response' };
  const status = response.status;
  let text = '';
  try { text = await response.text(); } catch (e) {
    return { ok: response.ok, status, json: {}, text: '', parseError: e.message };
  }
  if (!text) return { ok: response.ok, status, json: {}, text: '' };
  try {
    const json = JSON.parse(text);
    return { ok: response.ok, status, json, text };
  } catch (e) {
    return { ok: response.ok, status, json: {}, text, parseError: e.message };
  }
}

export function safeParseJsonString(str) {
  if (typeof str !== 'string' || !str) return null;
  try { return JSON.parse(str); } catch { return null; }
}
