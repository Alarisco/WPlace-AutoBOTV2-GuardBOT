import { mountShadow } from "../core/dom.js";
import { makeDraggable } from "./drag.js";

export function createOverlay({ title = "WPlace BOT" } = {}) {
  const { host, root } = mountShadow();
  
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:fixed; top:20px; left:20px; z-index:999999; background:#111; color:#eee; font:12px system-ui; border:1px solid #333; border-radius:10px; overflow:hidden; min-width:260px; box-shadow:0 8px 24px rgba(0,0,0,.5)";
  
  const header = document.createElement("div");
  header.style.cssText = "background:#1f2937; padding:8px 10px; font-weight:600";
  header.textContent = title;
  
  const body = document.createElement("div");
  body.style.cssText = "padding:10px; display:flex; gap:8px; flex-direction:column;";
  
  const status = document.createElement("div");
  status.textContent = "Iniciando…";
  body.appendChild(status);
  
  wrap.appendChild(header); wrap.appendChild(body); root.appendChild(wrap);
  makeDraggable(header, wrap);

  const listeners = {};
  function on(name, fn){ listeners[name] = fn; }
  
  // Botones opcionales
  const buttons = document.createElement("div");
  buttons.style.cssText = "display:flex; gap:6px; flex-wrap:wrap;";
  const bFarm = document.createElement("button"); bFarm.textContent = "Cargar Farm"; bFarm.onclick = ()=> listeners.loadFarm?.();
  const bImage= document.createElement("button"); bImage.textContent= "Cargar Image"; bImage.onclick= ()=> listeners.loadImage?.();
  buttons.appendChild(bFarm); buttons.appendChild(bImage); body.appendChild(buttons);

  return {
    root, host,
    setStatus: (t) => (status.textContent = t),
    on,
    destroy: () => host.remove()
  };
}
