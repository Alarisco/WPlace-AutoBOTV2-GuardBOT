// Dynamic pawtect computation (stubbed similar to wplacer approach)
import { log } from './logger.js';

let _wasmMod = null;
let _wasm = null;
let _chunkUrl = null;
let _initUser = false;
let _busy = false;
const _cache = new Map(); // key -> { token, ts }
const CACHE_TTL = 120000; // 2 min

function stableJson(obj){
  try { return JSON.stringify(obj); } catch { return ''; }
}

async function discoverChunk() {
  if (_chunkUrl) return _chunkUrl;
  try {
    if (typeof document === 'undefined') return null;
    const urls = new Set();
  try { document.querySelectorAll('script[src]')?.forEach(s=>{ try { if (typeof window !== 'undefined' && window.URL && window.location) urls.add(new window.URL(s.src, window.location.href).href); } catch {} }); } catch {}
  try { document.querySelectorAll('link[rel="modulepreload"][href],link[as="script"][href]')?.forEach(l=>{ try { if (typeof window !== 'undefined' && window.URL && window.location) urls.add(new window.URL(l.href, window.location.href).href); } catch {} }); } catch {}
  try { if (typeof window !== 'undefined' && window.performance) (window.performance.getEntriesByType('resource')||[]).forEach(e=>{ if (e?.name) urls.add(e.name); }); } catch{}
    const candidates = [...urls].filter(u=>/\/(_app|assets)\/immutable\/chunks\/.*\.js/i.test(u));
    for (const src of candidates) {
      try {
        const txt = await fetch(src, { credentials:'omit' }).then(r=>r.text());
        if (/get_pawtected_endpoint_payload|pawtect/i.test(txt)) {
          _chunkUrl = src; log('[pawtect] chunk encontrado', src); return src;
        }
      } catch{}
    }
  } catch{}
  return null;
}

async function loadWasm() {
  if (_wasm) return _wasm;
  const url = await discoverChunk();
  if (!url) { log('[pawtect] no se encontró chunk'); return null; }
  try {
    _wasmMod = await import(/* @vite-ignore */ url);
    if (typeof _wasmMod._ === 'function') {
      _wasm = await _wasmMod._();
      log('[pawtect] wasm cargado');
    }
  } catch(e){ log('[pawtect] error import wasm', e.message); }
  return _wasm;
}

function maybeInitUser(me){
  if (!_wasmMod || _initUser) return;
  try {
    if (me?.id && typeof _wasmMod.i === 'function') { _wasmMod.i(me.id); _initUser = true; }
  } catch{}
}

export async function computePawtect(bodyObj, { force = false } = {}) {
  const bodyStr = stableJson(bodyObj);
  const key = bodyStr;
  const now = Date.now();
  if (!force && _cache.has(key)) {
    const c = _cache.get(key);
    if (now - c.ts < CACHE_TTL) return c.token;
  }
  if (_busy) { // simple de-dupe
    await new Promise(r=>setTimeout(r, 150));
    if (!force && _cache.has(key)) return _cache.get(key).token;
  }
  _busy = true;
  try {
    const wasm = await loadWasm();
    if (!wasm || typeof wasm.get_pawtected_endpoint_payload !== 'function') return null;
    // Intentar inicializar user con un /me rápido (best effort una vez)
    if (!_initUser) {
      try { const me = await fetch('https://backend.wplace.live/me',{ credentials:'include'}).then(r=>r.ok?r.json():null); maybeInitUser(me); } catch{}
    }
  const enc = (typeof window !== 'undefined' && window.TextEncoder) ? new window.TextEncoder() : { encode: (t)=> new Uint8Array([...unescape(encodeURIComponent(t))].map(c=>c.charCodeAt(0))) };
  const dec = (typeof window !== 'undefined' && window.TextDecoder) ? new window.TextDecoder() : { decode: (b)=> decodeURIComponent(escape(String.fromCharCode(...b))) };
    const bytes = enc.encode(bodyStr);
    let ptr;
    try {
      ptr = wasm.__wbindgen_malloc(bytes.length, 1);
      new Uint8Array(wasm.memory.buffer, ptr, bytes.length).set(bytes);
    } catch{}
    let out;
    try { out = wasm.get_pawtected_endpoint_payload(ptr, bytes.length); } catch(e){ log('[pawtect] fallo get_pawtected...', e.message); return null; }
    let token = null;
    if (Array.isArray(out)) {
      const [op, ol] = out;
      token = dec.decode(new Uint8Array(wasm.memory.buffer, op, ol));
      try { wasm.__wbindgen_free(op, ol, 1); } catch{}
    } else if (typeof out === 'string') { token = out; }
    else if (out && typeof out.ptr === 'number' && typeof out.len === 'number') {
      token = dec.decode(new Uint8Array(wasm.memory.buffer, out.ptr, out.len));
      try { wasm.__wbindgen_free(out.ptr, out.len, 1); } catch{}
    }
    if (token) {
      _cache.set(key, { token, ts: now });
      try { window.__WPA_PAWTECT_TOKEN__ = token; } catch{}
      log('[pawtect] token calculado len=' + token.length);
    }
    return token;
  } finally { _busy = false; }
}

export async function seedPawtect() {
  try {
    await computePawtect({ colors:[0], coords:[1,1], t:'seed', fp:'seed' }, { force:true });
  } catch{}
}
