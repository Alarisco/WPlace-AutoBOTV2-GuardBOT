/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T08:18:02.779Z */
(() => {
  // src/core/dom.js
  function mountShadow(container = document.body) {
    const host = document.createElement("div");
    host.id = "wplace-bot-root";
    container.appendChild(host);
    const root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    return { host, root };
  }

  // src/ui/drag.js
  function makeDraggable(header, panel) {
    let ox = 0, oy = 0, dragging = false;
    header.style.cursor = "move";
    header.addEventListener("mousedown", (e) => {
      dragging = true;
      ox = e.clientX - panel.offsetLeft;
      oy = e.clientY - panel.offsetTop;
    });
    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      panel.style.left = `${e.clientX - ox}px`;
      panel.style.top = `${e.clientY - oy}px`;
    });
    document.addEventListener("mouseup", () => dragging = false);
  }

  // src/ui/overlay.js
  function createOverlay({ title = "WPlace BOT" } = {}) {
    const { host, root } = mountShadow();
    const wrap = document.createElement("div");
    wrap.style.cssText = "position:fixed; top:20px; left:20px; z-index:999999; background:#111; color:#eee; font:12px system-ui; border:1px solid #333; border-radius:10px; overflow:hidden; min-width:260px; box-shadow:0 8px 24px rgba(0,0,0,.5)";
    const header = document.createElement("div");
    header.style.cssText = "background:#1f2937; padding:8px 10px; font-weight:600";
    header.textContent = title;
    const body = document.createElement("div");
    body.style.cssText = "padding:10px; display:flex; gap:8px; flex-direction:column;";
    const status = document.createElement("div");
    status.textContent = "Iniciando\u2026";
    body.appendChild(status);
    wrap.appendChild(header);
    wrap.appendChild(body);
    root.appendChild(wrap);
    makeDraggable(header, wrap);
    const listeners = {};
    function on(name, fn) {
      listeners[name] = fn;
    }
    const buttons = document.createElement("div");
    buttons.style.cssText = "display:flex; gap:6px; flex-wrap:wrap;";
    const bFarm = document.createElement("button");
    bFarm.textContent = "Cargar Farm";
    bFarm.onclick = () => {
      var _a;
      return (_a = listeners.loadFarm) == null ? void 0 : _a.call(listeners);
    };
    const bImage = document.createElement("button");
    bImage.textContent = "Cargar Image";
    bImage.onclick = () => {
      var _a;
      return (_a = listeners.loadImage) == null ? void 0 : _a.call(listeners);
    };
    buttons.appendChild(bFarm);
    buttons.appendChild(bImage);
    body.appendChild(buttons);
    return {
      root,
      host,
      setStatus: (t) => status.textContent = t,
      on,
      destroy: () => host.remove()
    };
  }

  // src/farm/ui.js
  function mountFarmUI() {
    const ui = createOverlay({ title: "Auto-Farm" });
    ui.setStatus("Listo para iniciar");
    return ui;
  }

  // src/core/turnstile.js
  var loaded = false;
  async function loadTurnstile(siteKey) {
    if (loaded) return;
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      s.onload = () => res();
      s.onerror = () => rej(new Error("Turnstile load failed"));
      document.head.appendChild(s);
    });
    loaded = true;
  }
  function executeTurnstile(siteKey, action = "paint") {
    return new Promise((resolve, reject) => {
      if (!window.turnstile) return reject(new Error("Turnstile no disponible"));
      window.turnstile.render(document.createElement("div"), {
        sitekey: siteKey,
        action,
        callback: (token) => resolve(token),
        "error-callback": () => reject(new Error("Turnstile error"))
      });
    });
  }

  // src/core/http.js
  async function fetchWithTimeout(url, { timeout = 1e4, ...opts } = {}) {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort("timeout"), timeout);
    try {
      const res = await fetch(url, { signal: ctrl.signal, ...opts });
      return res;
    } finally {
      clearTimeout(id);
    }
  }

  // src/core/wplace-api.js
  var BASE = "https://wplace.winnalabs.com/api";
  async function postPixelBatch({ tileX, tileY, pixels, turnstileToken }) {
    const body = JSON.stringify({ pixels, token: turnstileToken });
    const r = await fetchWithTimeout(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      credentials: "include"
    });
    if (r.status === 200) {
      try {
        return await r.json();
      } catch {
        return { ok: true };
      }
    }
    let msg = `HTTP ${r.status}`;
    try {
      const j = await r.json();
      msg = (j == null ? void 0 : j.message) || msg;
    } catch {
    }
    throw new Error(`paint failed: ${msg}`);
  }

  // src/farm/coords.js
  function randomCoordInTile(tileX, tileY, margin = 0.05) {
    const size = 3e3;
    const m = Math.floor(size * margin);
    const rx = Math.floor(Math.random() * (size - 2 * m)) + m;
    const ry = Math.floor(Math.random() * (size - 2 * m)) + m;
    return { x: rx, y: ry, absX: tileX * size + rx, absY: tileY * size + ry };
  }
  function nextColor(palette) {
    return palette[Math.floor(Math.random() * palette.length)];
  }

  // src/farm/loop.js
  async function paintOnce({ tileX, tileY, palette, siteKey }) {
    await loadTurnstile(siteKey);
    const token = await executeTurnstile(siteKey, "paint");
    const coord = randomCoordInTile(tileX, tileY);
    const px = [{ x: coord.x, y: coord.y, color: nextColor(palette) }];
    return postPixelBatch({ tileX, tileY, pixels: px, turnstileToken: token });
  }
  async function loop(config, onStatus) {
    while (config.running) {
      try {
        await paintOnce(config);
        onStatus == null ? void 0 : onStatus("Pintado OK; aplicando cooldown\u2026");
        await new Promise((r) => setTimeout(r, config.cooldownMs || 3e4));
      } catch (e) {
        onStatus == null ? void 0 : onStatus("Error: " + e.message + " (reintentando)");
        await new Promise((r) => setTimeout(r, 5e3));
      }
    }
  }

  // src/farm/index.js
  async function runFarm() {
    const ui = mountFarmUI();
    const config = {
      running: true,
      tileX: 0,
      tileY: 0,
      palette: ["#000000", "#ffffff"],
      // reemplaza por tu paleta real
      siteKey: "TU_TURNSTILE_SITEKEY",
      cooldownMs: 3e4
    };
    window.__wplaceBot.stop = () => (config.running = false, ui.setStatus("Detenido"));
    await loop(config, (s) => ui.setStatus(s));
  }

  // src/entries/farm.js
  (() => {
    "use strict";
    var _a;
    if ((_a = window.__wplaceBot) == null ? void 0 : _a.running) {
      alert("WPlace BOT ya est\xE1 corriendo.");
      return;
    }
    window.__wplaceBot = { running: true };
    runFarm().catch((e) => {
      console.error("[BOT] Error en Auto-Farm:", e);
      window.__wplaceBot.running = false;
      alert("Auto-Farm: error inesperado. Revisa consola.");
    });
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvZG9tLmpzIiwgInNyYy91aS9kcmFnLmpzIiwgInNyYy91aS9vdmVybGF5LmpzIiwgInNyYy9mYXJtL3VpLmpzIiwgInNyYy9jb3JlL3R1cm5zdGlsZS5qcyIsICJzcmMvY29yZS9odHRwLmpzIiwgInNyYy9jb3JlL3dwbGFjZS1hcGkuanMiLCAic3JjL2Zhcm0vY29vcmRzLmpzIiwgInNyYy9mYXJtL2xvb3AuanMiLCAic3JjL2Zhcm0vaW5kZXguanMiLCAic3JjL2VudHJpZXMvZmFybS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0ICQgPSAoc2VsLCByb290ID0gZG9jdW1lbnQpID0+IHJvb3QucXVlcnlTZWxlY3RvcihzZWwpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3R5bGUoY3NzKSB7XG4gIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHMudGV4dENvbnRlbnQgPSBjc3M7IGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7IHJldHVybiBzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW91bnRTaGFkb3coY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSkge1xuICBjb25zdCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaG9zdC5pZCA9IFwid3BsYWNlLWJvdC1yb290XCI7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChob3N0KTtcbiAgY29uc3Qgcm9vdCA9IGhvc3QuYXR0YWNoU2hhZG93ID8gaG9zdC5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KSA6IGhvc3Q7XG4gIHJldHVybiB7IGhvc3QsIHJvb3QgfTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gbWFrZURyYWdnYWJsZShoZWFkZXIsIHBhbmVsKSB7XG4gIGxldCBveCA9IDAsIG95ID0gMCwgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgaGVhZGVyLnN0eWxlLmN1cnNvciA9IFwibW92ZVwiO1xuICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4geyBcbiAgICBkcmFnZ2luZyA9IHRydWU7IFxuICAgIG94ID0gZS5jbGllbnRYIC0gcGFuZWwub2Zmc2V0TGVmdDsgXG4gICAgb3kgPSBlLmNsaWVudFkgLSBwYW5lbC5vZmZzZXRUb3A7IFxuICB9KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4ge1xuICAgIGlmICghZHJhZ2dpbmcpIHJldHVybjtcbiAgICBwYW5lbC5zdHlsZS5sZWZ0ID0gYCR7ZS5jbGllbnRYIC0gb3h9cHhgO1xuICAgIHBhbmVsLnN0eWxlLnRvcCA9IGAke2UuY2xpZW50WSAtIG95fXB4YDtcbiAgfSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IGRyYWdnaW5nID0gZmFsc2UpO1xufVxuIiwgImltcG9ydCB7IG1vdW50U2hhZG93IH0gZnJvbSBcIi4uL2NvcmUvZG9tLmpzXCI7XG5pbXBvcnQgeyBtYWtlRHJhZ2dhYmxlIH0gZnJvbSBcIi4vZHJhZy5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3ZlcmxheSh7IHRpdGxlID0gXCJXUGxhY2UgQk9UXCIgfSA9IHt9KSB7XG4gIGNvbnN0IHsgaG9zdCwgcm9vdCB9ID0gbW91bnRTaGFkb3coKTtcbiAgXG4gIGNvbnN0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3cmFwLnN0eWxlLmNzc1RleHQgPSBcInBvc2l0aW9uOmZpeGVkOyB0b3A6MjBweDsgbGVmdDoyMHB4OyB6LWluZGV4Ojk5OTk5OTsgYmFja2dyb3VuZDojMTExOyBjb2xvcjojZWVlOyBmb250OjEycHggc3lzdGVtLXVpOyBib3JkZXI6MXB4IHNvbGlkICMzMzM7IGJvcmRlci1yYWRpdXM6MTBweDsgb3ZlcmZsb3c6aGlkZGVuOyBtaW4td2lkdGg6MjYwcHg7IGJveC1zaGFkb3c6MCA4cHggMjRweCByZ2JhKDAsMCwwLC41KVwiO1xuICBcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaGVhZGVyLnN0eWxlLmNzc1RleHQgPSBcImJhY2tncm91bmQ6IzFmMjkzNzsgcGFkZGluZzo4cHggMTBweDsgZm9udC13ZWlnaHQ6NjAwXCI7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvZHkuc3R5bGUuY3NzVGV4dCA9IFwicGFkZGluZzoxMHB4OyBkaXNwbGF5OmZsZXg7IGdhcDo4cHg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcIjtcbiAgXG4gIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHN0YXR1cy50ZXh0Q29udGVudCA9IFwiSW5pY2lhbmRvXHUyMDI2XCI7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoc3RhdHVzKTtcbiAgXG4gIHdyYXAuYXBwZW5kQ2hpbGQoaGVhZGVyKTsgd3JhcC5hcHBlbmRDaGlsZChib2R5KTsgcm9vdC5hcHBlbmRDaGlsZCh3cmFwKTtcbiAgbWFrZURyYWdnYWJsZShoZWFkZXIsIHdyYXApO1xuXG4gIGNvbnN0IGxpc3RlbmVycyA9IHt9O1xuICBmdW5jdGlvbiBvbihuYW1lLCBmbil7IGxpc3RlbmVyc1tuYW1lXSA9IGZuOyB9XG4gIFxuICAvLyBCb3RvbmVzIG9wY2lvbmFsZXNcbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnMuc3R5bGUuY3NzVGV4dCA9IFwiZGlzcGxheTpmbGV4OyBnYXA6NnB4OyBmbGV4LXdyYXA6d3JhcDtcIjtcbiAgY29uc3QgYkZhcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpOyBiRmFybS50ZXh0Q29udGVudCA9IFwiQ2FyZ2FyIEZhcm1cIjsgYkZhcm0ub25jbGljayA9ICgpPT4gbGlzdGVuZXJzLmxvYWRGYXJtPy4oKTtcbiAgY29uc3QgYkltYWdlPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpOyBiSW1hZ2UudGV4dENvbnRlbnQ9IFwiQ2FyZ2FyIEltYWdlXCI7IGJJbWFnZS5vbmNsaWNrPSAoKT0+IGxpc3RlbmVycy5sb2FkSW1hZ2U/LigpO1xuICBidXR0b25zLmFwcGVuZENoaWxkKGJGYXJtKTsgYnV0dG9ucy5hcHBlbmRDaGlsZChiSW1hZ2UpOyBib2R5LmFwcGVuZENoaWxkKGJ1dHRvbnMpO1xuXG4gIHJldHVybiB7XG4gICAgcm9vdCwgaG9zdCxcbiAgICBzZXRTdGF0dXM6ICh0KSA9PiAoc3RhdHVzLnRleHRDb250ZW50ID0gdCksXG4gICAgb24sXG4gICAgZGVzdHJveTogKCkgPT4gaG9zdC5yZW1vdmUoKVxuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZU92ZXJsYXkgfSBmcm9tIFwiLi4vdWkvb3ZlcmxheS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbW91bnRGYXJtVUkoKSB7XG4gIGNvbnN0IHVpID0gY3JlYXRlT3ZlcmxheSh7IHRpdGxlOiBcIkF1dG8tRmFybVwiIH0pO1xuICB1aS5zZXRTdGF0dXMoXCJMaXN0byBwYXJhIGluaWNpYXJcIik7XG4gIHJldHVybiB1aTtcbn1cbiIsICJsZXQgbG9hZGVkID0gZmFsc2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkVHVybnN0aWxlKHNpdGVLZXkpIHtcbiAgaWYgKGxvYWRlZCkgcmV0dXJuO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzLnNyYyA9IFwiaHR0cHM6Ly9jaGFsbGVuZ2VzLmNsb3VkZmxhcmUuY29tL3R1cm5zdGlsZS92MC9hcGkuanNcIjtcbiAgICBzLmFzeW5jID0gdHJ1ZTsgcy5kZWZlciA9IHRydWU7XG4gICAgcy5vbmxvYWQgPSAoKSA9PiByZXMoKTtcbiAgICBzLm9uZXJyb3IgPSAoKSA9PiByZWoobmV3IEVycm9yKFwiVHVybnN0aWxlIGxvYWQgZmFpbGVkXCIpKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO1xuICB9KTtcbiAgbG9hZGVkID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVUdXJuc3RpbGUoc2l0ZUtleSwgYWN0aW9uID0gXCJwYWludFwiKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKCF3aW5kb3cudHVybnN0aWxlKSByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIlR1cm5zdGlsZSBubyBkaXNwb25pYmxlXCIpKTtcbiAgICB3aW5kb3cudHVybnN0aWxlLnJlbmRlcihkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCB7XG4gICAgICBzaXRla2V5OiBzaXRlS2V5LCBhY3Rpb24sXG4gICAgICBjYWxsYmFjazogKHRva2VuKSA9PiByZXNvbHZlKHRva2VuKSxcbiAgICAgIFwiZXJyb3ItY2FsbGJhY2tcIjogKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihcIlR1cm5zdGlsZSBlcnJvclwiKSlcbiAgICB9KTtcbiAgfSk7XG59XG4iLCAiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoV2l0aFRpbWVvdXQodXJsLCB7IHRpbWVvdXQgPSAxMDAwMCwgLi4ub3B0cyB9ID0ge30pIHtcbiAgY29uc3QgY3RybCA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgY29uc3QgaWQgPSBzZXRUaW1lb3V0KCgpID0+IGN0cmwuYWJvcnQoXCJ0aW1lb3V0XCIpLCB0aW1lb3V0KTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgc2lnbmFsOiBjdHJsLnNpZ25hbCwgLi4ub3B0cyB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGZpbmFsbHkge1xuICAgIGNsZWFyVGltZW91dChpZCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBmZXRjaFdpdGhUaW1lb3V0IH0gZnJvbSBcIi4vaHR0cC5qc1wiO1xuXG5jb25zdCBCQVNFID0gXCJodHRwczovL3dwbGFjZS53aW5uYWxhYnMuY29tL2FwaVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpIHtcbiAgY29uc3QgciA9IGF3YWl0IGZldGNoV2l0aFRpbWVvdXQoYCR7QkFTRX0vbWVgLCB7IGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIiB9KTtcbiAgaWYgKCFyLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJtZSBmYWlsZWRcIik7XG4gIHJldHVybiByLmpzb24oKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrSGVhbHRoKCkge1xuICBjb25zdCByID0gYXdhaXQgZmV0Y2hXaXRoVGltZW91dChgJHtCQVNFfS9oZWFsdGhgKTtcbiAgaWYgKCFyLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJoZWFsdGggZmFpbGVkXCIpO1xuICByZXR1cm4gci5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG59XG5cbi8vIFVuaWZpY2EgcG9zdCBkZSBwXHUwMEVEeGVsIHBvciBsb3RlcyAoYmF0Y2ggcG9yIHRpbGUpLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbEJhdGNoKHsgdGlsZVgsIHRpbGVZLCBwaXhlbHMsIHR1cm5zdGlsZVRva2VuIH0pIHtcbiAgLy8gcGl4ZWxzOiBbe3gseSxjb2xvcn0sIFx1MjAyNl0gcmVsYXRpdm9zIGFsIHRpbGVcbiAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgcGl4ZWxzLCB0b2tlbjogdHVybnN0aWxlVG9rZW4gfSk7XG4gIGNvbnN0IHIgPSBhd2FpdCBmZXRjaFdpdGhUaW1lb3V0KGAke0JBU0V9L3MwL3BpeGVsLyR7dGlsZVh9LyR7dGlsZVl9YCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIGJvZHksXG4gICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiXG4gIH0pO1xuICBcbiAgLy8gQWxndW5hcyByZXNwdWVzdGFzIHB1ZWRlbiBubyB0cmFlciBKU09OIGF1bnF1ZSBzZWFuIDIwMC5cbiAgaWYgKHIuc3RhdHVzID09PSAyMDApIHtcbiAgICB0cnkgeyByZXR1cm4gYXdhaXQgci5qc29uKCk7IH0gY2F0Y2ggeyByZXR1cm4geyBvazogdHJ1ZSB9OyB9XG4gIH1cbiAgXG4gIGxldCBtc2cgPSBgSFRUUCAke3Iuc3RhdHVzfWA7XG4gIHRyeSB7IGNvbnN0IGogPSBhd2FpdCByLmpzb24oKTsgbXNnID0gaj8ubWVzc2FnZSB8fCBtc2c7IH0gY2F0Y2gge31cbiAgdGhyb3cgbmV3IEVycm9yKGBwYWludCBmYWlsZWQ6ICR7bXNnfWApO1xufVxuIiwgImV4cG9ydCBmdW5jdGlvbiByYW5kb21Db29yZEluVGlsZSh0aWxlWCwgdGlsZVksIG1hcmdpbiA9IDAuMDUpIHtcbiAgY29uc3Qgc2l6ZSA9IDMwMDA7XG4gIGNvbnN0IG0gPSBNYXRoLmZsb29yKHNpemUgKiBtYXJnaW4pO1xuICBjb25zdCByeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChzaXplIC0gMiptKSkgKyBtO1xuICBjb25zdCByeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChzaXplIC0gMiptKSkgKyBtO1xuICByZXR1cm4geyB4OiByeCwgeTogcnksIGFic1g6IHRpbGVYICogc2l6ZSArIHJ4LCBhYnNZOiB0aWxlWSAqIHNpemUgKyByeSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dENvbG9yKHBhbGV0dGUpIHtcbiAgcmV0dXJuIHBhbGV0dGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGFsZXR0ZS5sZW5ndGgpXTtcbn1cbiIsICJpbXBvcnQgeyBleGVjdXRlVHVybnN0aWxlLCBsb2FkVHVybnN0aWxlIH0gZnJvbSBcIi4uL2NvcmUvdHVybnN0aWxlLmpzXCI7XG5pbXBvcnQgeyBwb3N0UGl4ZWxCYXRjaCB9IGZyb20gXCIuLi9jb3JlL3dwbGFjZS1hcGkuanNcIjtcbmltcG9ydCB7IHJhbmRvbUNvb3JkSW5UaWxlLCBuZXh0Q29sb3IgfSBmcm9tIFwiLi9jb29yZHMuanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhaW50T25jZSh7IHRpbGVYLCB0aWxlWSwgcGFsZXR0ZSwgc2l0ZUtleSB9KSB7XG4gIGF3YWl0IGxvYWRUdXJuc3RpbGUoc2l0ZUtleSk7XG4gIGNvbnN0IHRva2VuID0gYXdhaXQgZXhlY3V0ZVR1cm5zdGlsZShzaXRlS2V5LCBcInBhaW50XCIpO1xuICBjb25zdCBjb29yZCA9IHJhbmRvbUNvb3JkSW5UaWxlKHRpbGVYLCB0aWxlWSk7XG4gIGNvbnN0IHB4ID0gW3sgeDogY29vcmQueCwgeTogY29vcmQueSwgY29sb3I6IG5leHRDb2xvcihwYWxldHRlKSB9XTtcbiAgcmV0dXJuIHBvc3RQaXhlbEJhdGNoKHsgdGlsZVgsIHRpbGVZLCBwaXhlbHM6IHB4LCB0dXJuc3RpbGVUb2tlbjogdG9rZW4gfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb29wKGNvbmZpZywgb25TdGF0dXMpIHtcbiAgLy8gU3VzdGl0dXllIGVzdGUgZXNxdWVtYSBwb3IgdHUgbFx1MDBGM2dpY2EgYWN0dWFsIGRlIGNvb2xkb3duL3JldHJ5L2NvdW50ZXIuXG4gIHdoaWxlIChjb25maWcucnVubmluZykge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBwYWludE9uY2UoY29uZmlnKTtcbiAgICAgIG9uU3RhdHVzPy4oXCJQaW50YWRvIE9LOyBhcGxpY2FuZG8gY29vbGRvd25cdTIwMjZcIik7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgY29uZmlnLmNvb2xkb3duTXMgfHwgMzAwMDApKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBvblN0YXR1cz8uKFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlICsgXCIgKHJlaW50ZW50YW5kbylcIik7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgNTAwMCkpO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IG1vdW50RmFybVVJIH0gZnJvbSBcIi4vdWkuanNcIjtcbmltcG9ydCB7IGxvb3AgfSBmcm9tIFwiLi9sb29wLmpzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5GYXJtKCkge1xuICBjb25zdCB1aSA9IG1vdW50RmFybVVJKCk7XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBydW5uaW5nOiB0cnVlLFxuICAgIHRpbGVYOiAwLCB0aWxlWTogMCxcbiAgICBwYWxldHRlOiBbXCIjMDAwMDAwXCIsIFwiI2ZmZmZmZlwiXSwgIC8vIHJlZW1wbGF6YSBwb3IgdHUgcGFsZXRhIHJlYWxcbiAgICBzaXRlS2V5OiBcIlRVX1RVUk5TVElMRV9TSVRFS0VZXCIsXG4gICAgY29vbGRvd25NczogMzAwMDBcbiAgfTtcbiAgXG4gIHdpbmRvdy5fX3dwbGFjZUJvdC5zdG9wID0gKCkgPT4gKGNvbmZpZy5ydW5uaW5nID0gZmFsc2UsIHVpLnNldFN0YXR1cyhcIkRldGVuaWRvXCIpKTtcbiAgYXdhaXQgbG9vcChjb25maWcsIChzKSA9PiB1aS5zZXRTdGF0dXMocykpO1xufVxuIiwgImltcG9ydCB7IHJ1bkZhcm0gfSBmcm9tIFwiLi4vZmFybS9pbmRleC5qc1wiO1xuXG4oKCkgPT4ge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgaWYgKHdpbmRvdy5fX3dwbGFjZUJvdD8ucnVubmluZykge1xuICAgIGFsZXJ0KFwiV1BsYWNlIEJPVCB5YSBlc3RcdTAwRTEgY29ycmllbmRvLlwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgd2luZG93Ll9fd3BsYWNlQm90ID0geyBydW5uaW5nOiB0cnVlIH07XG4gIHJ1bkZhcm0oKS5jYXRjaCgoZSkgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbQk9UXSBFcnJvciBlbiBBdXRvLUZhcm06XCIsIGUpO1xuICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5ydW5uaW5nID0gZmFsc2U7XG4gICAgYWxlcnQoXCJBdXRvLUZhcm06IGVycm9yIGluZXNwZXJhZG8uIFJldmlzYSBjb25zb2xhLlwiKTtcbiAgfSk7XG59KSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBT08sV0FBUyxZQUFZLFlBQVksU0FBUyxNQUFNO0FBQ3JELFVBQU0sT0FBTyxTQUFTLGNBQWMsS0FBSztBQUN6QyxTQUFLLEtBQUs7QUFDVixjQUFVLFlBQVksSUFBSTtBQUMxQixVQUFNLE9BQU8sS0FBSyxlQUFlLEtBQUssYUFBYSxFQUFFLE1BQU0sT0FBTyxDQUFDLElBQUk7QUFDdkUsV0FBTyxFQUFFLE1BQU0sS0FBSztBQUFBLEVBQ3RCOzs7QUNiTyxXQUFTLGNBQWMsUUFBUSxPQUFPO0FBQzNDLFFBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxXQUFXO0FBQy9CLFdBQU8sTUFBTSxTQUFTO0FBQ3RCLFdBQU8saUJBQWlCLGFBQWEsQ0FBQyxNQUFNO0FBQzFDLGlCQUFXO0FBQ1gsV0FBSyxFQUFFLFVBQVUsTUFBTTtBQUN2QixXQUFLLEVBQUUsVUFBVSxNQUFNO0FBQUEsSUFDekIsQ0FBQztBQUNELGFBQVMsaUJBQWlCLGFBQWEsQ0FBQyxNQUFNO0FBQzVDLFVBQUksQ0FBQyxTQUFVO0FBQ2YsWUFBTSxNQUFNLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRTtBQUNwQyxZQUFNLE1BQU0sTUFBTSxHQUFHLEVBQUUsVUFBVSxFQUFFO0FBQUEsSUFDckMsQ0FBQztBQUNELGFBQVMsaUJBQWlCLFdBQVcsTUFBTSxXQUFXLEtBQUs7QUFBQSxFQUM3RDs7O0FDWE8sV0FBUyxjQUFjLEVBQUUsUUFBUSxhQUFhLElBQUksQ0FBQyxHQUFHO0FBQzNELFVBQU0sRUFBRSxNQUFNLEtBQUssSUFBSSxZQUFZO0FBRW5DLFVBQU0sT0FBTyxTQUFTLGNBQWMsS0FBSztBQUN6QyxTQUFLLE1BQU0sVUFBVTtBQUVyQixVQUFN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
