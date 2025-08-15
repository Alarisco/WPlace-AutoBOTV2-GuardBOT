/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T08:18:02.779Z */
(() => {
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
  async function getSession() {
    const r = await fetchWithTimeout(`${BASE}/me`, { credentials: "include" });
    if (!r.ok) throw new Error("me failed");
    return r.json();
  }
  async function checkHealth() {
    const r = await fetchWithTimeout(`${BASE}/health`);
    if (!r.ok) throw new Error("health failed");
    return r.json().catch(() => ({}));
  }

  // src/core/loader.js
  async function loadAndEvalUrlWithFallback(url) {
    try {
      const txt = await fetch(url, { cache: "no-store" }).then((r) => r.text());
      (0, eval)(txt);
    } catch (e) {
      const s = document.createElement("script");
      s.src = url;
      s.async = true;
      document.head.appendChild(s);
    }
  }

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

  // src/entries/launcher.js
  (() => {
    "use strict";
    const ui = createOverlay({ title: "WPlace Launcher" });
    ui.setStatus("Comprobando backend\u2026");
    Promise.all([getSession(), checkHealth()]).then(() => ui.setStatus("Listo")).catch(() => ui.setStatus("Backend/Session no disponible"));
    ui.on("loadFarm", () => loadAndEvalUrlWithFallback(window.WPLACE_RAW_FARM_URL));
    ui.on("loadImage", () => loadAndEvalUrlWithFallback(window.WPLACE_RAW_IMAGE_URL));
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvaHR0cC5qcyIsICJzcmMvY29yZS93cGxhY2UtYXBpLmpzIiwgInNyYy9jb3JlL2xvYWRlci5qcyIsICJzcmMvY29yZS9kb20uanMiLCAic3JjL3VpL2RyYWcuanMiLCAic3JjL3VpL292ZXJsYXkuanMiLCAic3JjL2VudHJpZXMvbGF1bmNoZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFdpdGhUaW1lb3V0KHVybCwgeyB0aW1lb3V0ID0gMTAwMDAsIC4uLm9wdHMgfSA9IHt9KSB7XG4gIGNvbnN0IGN0cmwgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IGlkID0gc2V0VGltZW91dCgoKSA9PiBjdHJsLmFib3J0KFwidGltZW91dFwiKSwgdGltZW91dCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7IHNpZ25hbDogY3RybC5zaWduYWwsIC4uLm9wdHMgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSBmaW5hbGx5IHtcbiAgICBjbGVhclRpbWVvdXQoaWQpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgZmV0Y2hXaXRoVGltZW91dCB9IGZyb20gXCIuL2h0dHAuanNcIjtcblxuY29uc3QgQkFTRSA9IFwiaHR0cHM6Ly93cGxhY2Uud2lubmFsYWJzLmNvbS9hcGlcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlc3Npb24oKSB7XG4gIGNvbnN0IHIgPSBhd2FpdCBmZXRjaFdpdGhUaW1lb3V0KGAke0JBU0V9L21lYCwgeyBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIgfSk7XG4gIGlmICghci5vaykgdGhyb3cgbmV3IEVycm9yKFwibWUgZmFpbGVkXCIpO1xuICByZXR1cm4gci5qc29uKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0hlYWx0aCgpIHtcbiAgY29uc3QgciA9IGF3YWl0IGZldGNoV2l0aFRpbWVvdXQoYCR7QkFTRX0vaGVhbHRoYCk7XG4gIGlmICghci5vaykgdGhyb3cgbmV3IEVycm9yKFwiaGVhbHRoIGZhaWxlZFwiKTtcbiAgcmV0dXJuIHIuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xufVxuXG4vLyBVbmlmaWNhIHBvc3QgZGUgcFx1MDBFRHhlbCBwb3IgbG90ZXMgKGJhdGNoIHBvciB0aWxlKS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0UGl4ZWxCYXRjaCh7IHRpbGVYLCB0aWxlWSwgcGl4ZWxzLCB0dXJuc3RpbGVUb2tlbiB9KSB7XG4gIC8vIHBpeGVsczogW3t4LHksY29sb3J9LCBcdTIwMjZdIHJlbGF0aXZvcyBhbCB0aWxlXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IHBpeGVscywgdG9rZW46IHR1cm5zdGlsZVRva2VuIH0pO1xuICBjb25zdCByID0gYXdhaXQgZmV0Y2hXaXRoVGltZW91dChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICBib2R5LFxuICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIlxuICB9KTtcbiAgXG4gIC8vIEFsZ3VuYXMgcmVzcHVlc3RhcyBwdWVkZW4gbm8gdHJhZXIgSlNPTiBhdW5xdWUgc2VhbiAyMDAuXG4gIGlmIChyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgdHJ5IHsgcmV0dXJuIGF3YWl0IHIuanNvbigpOyB9IGNhdGNoIHsgcmV0dXJuIHsgb2s6IHRydWUgfTsgfVxuICB9XG4gIFxuICBsZXQgbXNnID0gYEhUVFAgJHtyLnN0YXR1c31gO1xuICB0cnkgeyBjb25zdCBqID0gYXdhaXQgci5qc29uKCk7IG1zZyA9IGo/Lm1lc3NhZ2UgfHwgbXNnOyB9IGNhdGNoIHt9XG4gIHRocm93IG5ldyBFcnJvcihgcGFpbnQgZmFpbGVkOiAke21zZ31gKTtcbn1cbiIsICJleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEFuZEV2YWxVcmxXaXRoRmFsbGJhY2sodXJsKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdHh0ID0gYXdhaXQgZmV0Y2godXJsLCB7IGNhY2hlOiBcIm5vLXN0b3JlXCIgfSkudGhlbihyID0+IHIudGV4dCgpKTtcbiAgICAvLyBldmFsIFwiaW5kaXJlY3RvXCIgcGFyYSBubyBoZXJlZGFyIHNjb3BlXG4gICAgKDAsIGV2YWwpKHR4dCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzLnNyYyA9IHVybDsgcy5hc3luYyA9IHRydWU7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCAkID0gKHNlbCwgcm9vdCA9IGRvY3VtZW50KSA9PiByb290LnF1ZXJ5U2VsZWN0b3Ioc2VsKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlKGNzcykge1xuICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBzLnRleHRDb250ZW50ID0gY3NzOyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpOyByZXR1cm4gcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50U2hhZG93KGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkpIHtcbiAgY29uc3QgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvc3QuaWQgPSBcIndwbGFjZS1ib3Qtcm9vdFwiO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaG9zdCk7XG4gIGNvbnN0IHJvb3QgPSBob3N0LmF0dGFjaFNoYWRvdyA/IGhvc3QuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSkgOiBob3N0O1xuICByZXR1cm4geyBob3N0LCByb290IH07XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIG1ha2VEcmFnZ2FibGUoaGVhZGVyLCBwYW5lbCkge1xuICBsZXQgb3ggPSAwLCBveSA9IDAsIGRyYWdnaW5nID0gZmFsc2U7XG4gIGhlYWRlci5zdHlsZS5jdXJzb3IgPSBcIm1vdmVcIjtcbiAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHsgXG4gICAgZHJhZ2dpbmcgPSB0cnVlOyBcbiAgICBveCA9IGUuY2xpZW50WCAtIHBhbmVsLm9mZnNldExlZnQ7IFxuICAgIG95ID0gZS5jbGllbnRZIC0gcGFuZWwub2Zmc2V0VG9wOyBcbiAgfSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGUpID0+IHtcbiAgICBpZiAoIWRyYWdnaW5nKSByZXR1cm47XG4gICAgcGFuZWwuc3R5bGUubGVmdCA9IGAke2UuY2xpZW50WCAtIG94fXB4YDtcbiAgICBwYW5lbC5zdHlsZS50b3AgPSBgJHtlLmNsaWVudFkgLSBveX1weGA7XG4gIH0pO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiBkcmFnZ2luZyA9IGZhbHNlKTtcbn1cbiIsICJpbXBvcnQgeyBtb3VudFNoYWRvdyB9IGZyb20gXCIuLi9jb3JlL2RvbS5qc1wiO1xuaW1wb3J0IHsgbWFrZURyYWdnYWJsZSB9IGZyb20gXCIuL2RyYWcuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXkoeyB0aXRsZSA9IFwiV1BsYWNlIEJPVFwiIH0gPSB7fSkge1xuICBjb25zdCB7IGhvc3QsIHJvb3QgfSA9IG1vdW50U2hhZG93KCk7XG4gIFxuICBjb25zdCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd3JhcC5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjpmaXhlZDsgdG9wOjIwcHg7IGxlZnQ6MjBweDsgei1pbmRleDo5OTk5OTk7IGJhY2tncm91bmQ6IzExMTsgY29sb3I6I2VlZTsgZm9udDoxMnB4IHN5c3RlbS11aTsgYm9yZGVyOjFweCBzb2xpZCAjMzMzOyBib3JkZXItcmFkaXVzOjEwcHg7IG92ZXJmbG93OmhpZGRlbjsgbWluLXdpZHRoOjI2MHB4OyBib3gtc2hhZG93OjAgOHB4IDI0cHggcmdiYSgwLDAsMCwuNSlcIjtcbiAgXG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhlYWRlci5zdHlsZS5jc3NUZXh0ID0gXCJiYWNrZ3JvdW5kOiMxZjI5Mzc7IHBhZGRpbmc6OHB4IDEwcHg7IGZvbnQtd2VpZ2h0OjYwMFwiO1xuICBoZWFkZXIudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2R5LnN0eWxlLmNzc1RleHQgPSBcInBhZGRpbmc6MTBweDsgZGlzcGxheTpmbGV4OyBnYXA6OHB4OyBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XCI7XG4gIFxuICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzdGF0dXMudGV4dENvbnRlbnQgPSBcIkluaWNpYW5kb1x1MjAyNlwiO1xuICBib2R5LmFwcGVuZENoaWxkKHN0YXR1cyk7XG4gIFxuICB3cmFwLmFwcGVuZENoaWxkKGhlYWRlcik7IHdyYXAuYXBwZW5kQ2hpbGQoYm9keSk7IHJvb3QuYXBwZW5kQ2hpbGQod3JhcCk7XG4gIG1ha2VEcmFnZ2FibGUoaGVhZGVyLCB3cmFwKTtcblxuICBjb25zdCBsaXN0ZW5lcnMgPSB7fTtcbiAgZnVuY3Rpb24gb24obmFtZSwgZm4peyBsaXN0ZW5lcnNbbmFtZV0gPSBmbjsgfVxuICBcbiAgLy8gQm90b25lcyBvcGNpb25hbGVzXG4gIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zLnN0eWxlLmNzc1RleHQgPSBcImRpc3BsYXk6ZmxleDsgZ2FwOjZweDsgZmxleC13cmFwOndyYXA7XCI7XG4gIGNvbnN0IGJGYXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTsgYkZhcm0udGV4dENvbnRlbnQgPSBcIkNhcmdhciBGYXJtXCI7IGJGYXJtLm9uY2xpY2sgPSAoKT0+IGxpc3RlbmVycy5sb2FkRmFybT8uKCk7XG4gIGNvbnN0IGJJbWFnZT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTsgYkltYWdlLnRleHRDb250ZW50PSBcIkNhcmdhciBJbWFnZVwiOyBiSW1hZ2Uub25jbGljaz0gKCk9PiBsaXN0ZW5lcnMubG9hZEltYWdlPy4oKTtcbiAgYnV0dG9ucy5hcHBlbmRDaGlsZChiRmFybSk7IGJ1dHRvbnMuYXBwZW5kQ2hpbGQoYkltYWdlKTsgYm9keS5hcHBlbmRDaGlsZChidXR0b25zKTtcblxuICByZXR1cm4ge1xuICAgIHJvb3QsIGhvc3QsXG4gICAgc2V0U3RhdHVzOiAodCkgPT4gKHN0YXR1cy50ZXh0Q29udGVudCA9IHQpLFxuICAgIG9uLFxuICAgIGRlc3Ryb3k6ICgpID0+IGhvc3QucmVtb3ZlKClcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBnZXRTZXNzaW9uLCBjaGVja0hlYWx0aCB9IGZyb20gXCIuLi9jb3JlL3dwbGFjZS1hcGkuanNcIjtcbmltcG9ydCB7IGxvYWRBbmRFdmFsVXJsV2l0aEZhbGxiYWNrIH0gZnJvbSBcIi4uL2NvcmUvbG9hZGVyLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVPdmVybGF5IH0gZnJvbSBcIi4uL3VpL292ZXJsYXkuanNcIjtcblxuKCgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIGNvbnN0IHVpID0gY3JlYXRlT3ZlcmxheSh7IHRpdGxlOiBcIldQbGFjZSBMYXVuY2hlclwiIH0pO1xuICB1aS5zZXRTdGF0dXMoXCJDb21wcm9iYW5kbyBiYWNrZW5kXHUyMDI2XCIpO1xuICBcbiAgUHJvbWlzZS5hbGwoW2dldFNlc3Npb24oKSwgY2hlY2tIZWFsdGgoKV0pXG4gICAgLnRoZW4oKCkgPT4gdWkuc2V0U3RhdHVzKFwiTGlzdG9cIikpXG4gICAgLmNhdGNoKCgpID0+IHVpLnNldFN0YXR1cyhcIkJhY2tlbmQvU2Vzc2lvbiBubyBkaXNwb25pYmxlXCIpKTtcbiAgICBcbiAgLy8gQm90b25lczogY2FyZ2FyIEF1dG8tRmFybSBvIEF1dG8tSW1hZ2UgZGVzZGUgUkFXIChpZ3VhbCBxdWUgYWhvcmEpXG4gIHVpLm9uKFwibG9hZEZhcm1cIiwgKCkgPT4gbG9hZEFuZEV2YWxVcmxXaXRoRmFsbGJhY2sod2luZG93LldQTEFDRV9SQVdfRkFSTV9VUkwpKTtcbiAgdWkub24oXCJsb2FkSW1hZ2VcIiwgKCkgPT4gbG9hZEFuZEV2YWxVcmxXaXRoRmFsbGJhY2sod2luZG93LldQTEFDRV9SQVdfSU1BR0VfVVJMKSk7XG59KSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBQUEsaUJBQXNCLGlCQUFpQixLQUFLLEVBQUUsVUFBVSxLQUFPLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRztBQUM3RSxVQUFNLE9BQU8sSUFBSSxnQkFBZ0I7QUFDakMsVUFBTSxLQUFLLFdBQVcsTUFBTSxLQUFLLE1BQU0sU0FBUyxHQUFHLE9BQU87QUFDMUQsUUFBSTtBQUNGLFlBQU0sTUFBTSxNQUFNLE1BQU0sS0FBSyxFQUFFLFFBQVEsS0FBSyxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQzdELGFBQU87QUFBQSxJQUNULFVBQUU7QUFDQSxtQkFBYSxFQUFFO0FBQUEsSUFDakI7QUFBQSxFQUNGOzs7QUNQQSxNQUFNLE9BQU87QUFFYixpQkFBc0IsYUFBYTtBQUNqQyxVQUFNLElBQUksTUFBTSxpQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBRSxhQUFhLFVBQVUsQ0FBQztBQUN6RSxRQUFJLENBQUMsRUFBRSxHQUFJLE9BQU0sSUFBSSxNQUFNLFdBQVc7QUFDdEMsV0FBTyxFQUFFLEtBQUs7QUFBQSxFQUNoQjtBQUVBLGlCQUFzQixjQUFjO0FBQ2xDLFVBQU0sSUFBSSxNQUFNLGlCQUFpQixHQUFHLElBQUksU0FB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
