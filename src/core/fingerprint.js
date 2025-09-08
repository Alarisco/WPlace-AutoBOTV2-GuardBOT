// Fingerprint generation (heuristic, deterministic, privacy-aware)
// Intenta emular enfoque típico: combinación de UA, hardware, canvas, webgl, pantalla y zona horaria.
// Produce hash SHA-256 hex (fallback FNV-1a) y expone ensureFingerprint().

import { log } from './logger.js';

let _fp = null;
let _inFlight = null;

function getCanvasFingerprint() {
  try {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    if (!ctx) return 'nocanvas';
    c.width = 200; c.height = 40;
    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial"';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0,0,200,40);
    ctx.fillStyle = '#069';
    ctx.fillText('wplace-fp-canvas', 2, 2);
    ctx.strokeStyle = '#ff0';
    ctx.beginPath(); ctx.arc(100,20,18,0,Math.PI*2); ctx.stroke();
    const data = c.toDataURL();
    return data.slice(0,64);
  } catch { return 'nocanvas'; }
}

function getWebGLInfo() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    if (!gl) return 'nowebgl';
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);
    const renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    return vendor + '|' + renderer;
  } catch { return 'nowebgl'; }
}

function simpleHash(str) { // 32-bit FNV-1a
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0; // h * 16777619
  }
  return ('00000000' + h.toString(16)).slice(-8);
}

async function sha256Hex(data) {
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    try {
  const TEnc = (typeof window !== 'undefined' && window.TextEncoder) ? window.TextEncoder : null;
  const enc = TEnc ? new TEnc().encode(data) : new Uint8Array([...unescape(encodeURIComponent(data))].map(c=>c.charCodeAt(0)));
      const digest = await window.crypto.subtle.digest('SHA-256', enc);
      return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');
    } catch {}
  }
  return simpleHash(data);
}

function collectRaw() {
  const nav = (typeof window !== 'undefined' && window.navigator) ? window.navigator : {};
  const scr = (typeof window !== 'undefined' && window.screen) ? window.screen : {};
  const tz = (typeof Intl !== 'undefined' && Intl.DateTimeFormat) ? (Intl.DateTimeFormat().resolvedOptions().timeZone || '') : '';
  const props = {
    ua: nav.userAgent || '',
    plat: nav.platform || '',
    lang: (nav.languages||[]).join(',') || nav.language || '',
    cores: nav.hardwareConcurrency || 0,
    mem: nav.deviceMemory || 0,
    width: scr.width || 0,
    height: scr.height || 0,
    depth: scr.colorDepth || 0,
    tz,
    canvas: getCanvasFingerprint(),
    webgl: getWebGLInfo(),
  };
  return props;
}

export async function ensureFingerprint({ force = false } = {}) {
  if (_fp && !force) return _fp;
  if (_inFlight) return _inFlight;
  _inFlight = (async () => {
    try {
      const raw = collectRaw();
      const stable = Object.keys(raw).sort().map(k=>k+':'+raw[k]).join('|');
      const hash = await sha256Hex(stable);
      _fp = 'fp:' + hash.slice(0,64); // limitar
      try { window.__WPA_FINGERPRINT__ = _fp; } catch {}
      log('[fp] generado len=' + _fp.length);
      return _fp;
    } finally { _inFlight = null; }
  })();
  return _inFlight;
}

export function getLocalFingerprint() { return _fp || (typeof window !== 'undefined' ? window.__WPA_FINGERPRINT__ : null); }
