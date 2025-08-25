/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-25T19:29:27.740Z */
(() => {
  // src/core/logger.js
  var log = (...a) => console.log("[WPA-UI]", ...a);

  // src/farm/config.js
  var FARM_DEFAULTS = {
    SITEKEY: "0x4AAAAAABpqJe8FO0N84q0F",
    // Turnstile sitekey (ajústalo si cambia)
    TILE_X: 1086,
    TILE_Y: 1565,
    TILE_SIZE: 3e3,
    // Tiles son de ~3000x3000 según investigación
    DELAY_MS: 15e3,
    // 15 segundos entre pintadas (predeterminado)
    MIN_CHARGES: 10,
    // mínimo de cargas para empezar a pintar
    CHARGE_REGEN_MS: 3e4,
    // 1 carga cada 30 segundos
    PIXELS_PER_BATCH: 20,
    // número de píxeles a pintar por lote
    COLOR_MIN: 1,
    COLOR_MAX: 32,
    COLOR_MODE: "random",
    // 'random' | 'fixed'
    COLOR_FIXED: 1,
    CUSTOM_PALETTE: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
    // Nueva funcionalidad de posición y radio
    BASE_X: null,
    // Posición X base (local al tile) - se establece al seleccionar zona
    BASE_Y: null,
    // Posición Y base (local al tile) - se establece al seleccionar zona
    FARM_RADIUS: 500,
    // Radio de farming en píxeles (500px por defecto para zona segura)
    POSITION_SELECTED: false,
    // Flag para indicar si se seleccionó una posición
    UI_THEME: {
      primary: "#000000",
      secondary: "#111111",
      accent: "#222222",
      text: "#ffffff",
      highlight: "#775ce3",
      success: "#00ff00",
      error: "#ff0000",
      running: "#00cc00"
      // Verde para cuando está corriendo
    }
  };
  var farmState = {
    running: false,
    painted: 0,
    last: null,
    // {x,y,color,status,json}
    charges: { count: 0, max: 0, cooldownMs: 3e4 },
    user: null,
    panel: null,
    captureMode: false,
    // sniffer activo para capturar TILE_X/Y desde un POST real
    selectingPosition: false,
    // sniffer activo para capturar posición base
    originalFetch: window.fetch,
    retryCount: 0,
    // contador de reintentos
    inCooldown: false,
    // si está en cooldown de 2 minutos
    nextPaintTime: 0,
    // timestamp de la próxima pintada
    cooldownEndTime: 0,
    // timestamp del final del cooldown
    health: null
    // estado de salud del backend
  };

  // src/core/storage.js
  function saveFarmCfg(cfg) {
    return;
  }
  function loadFarmCfg(defaults) {
    return { ...defaults };
  }
  function resetFarmCfg() {
    console.log("[WPA-UI]", "Configuraci\xF3n del farm reseteada (localStorage deshabilitado)");
  }
  function resetToSafeDefaults() {
    console.log("[WPA-UI]", "Configuraci\xF3n reseteada a valores seguros (localStorage deshabilitado)");
  }

  // src/core/turnstile.js
  var turnstileToken = null;
  var tokenExpiryTime = 0;
  var tokenGenerationInProgress = false;
  var _resolveToken = null;
  var tokenPromise = new Promise((resolve) => {
    _resolveToken = resolve;
  });
  var TOKEN_LIFETIME = 24e4;
  var _turnstileWidgetId = null;
  var _turnstileContainer = null;
  var _turnstileOverlay = null;
  var _lastSitekey = null;
  var _cachedSitekey = null;
  function setTurnstileToken(t2) {
    if (_resolveToken) {
      _resolveToken(t2);
      _resolveToken = null;
    }
    turnstileToken = t2;
    tokenExpiryTime = Date.now() + TOKEN_LIFETIME;
    log("\u2705 Turnstile token set successfully");
  }
  function isTokenValid() {
    return turnstileToken && Date.now() < tokenExpiryTime;
  }
  function invalidateToken() {
    turnstileToken = null;
    tokenExpiryTime = 0;
    log("\u{1F5D1}\uFE0F Token invalidated, will force fresh generation");
  }
  async function ensureToken(forceNew = false) {
    if (isTokenValid() && !forceNew) {
      return turnstileToken;
    }
    if (forceNew) {
      invalidateToken();
    }
    if (tokenGenerationInProgress) {
      log("\u{1F504} Token generation already in progress, waiting...");
      await sleep(2e3);
      return isTokenValid() ? turnstileToken : null;
    }
    tokenGenerationInProgress = true;
    try {
      log("\u{1F504} Token expired or missing, generating new one...");
      const token = await handleCaptcha();
      if (token && token.length > 20) {
        setTurnstileToken(token);
        log("\u2705 Token captured and cached successfully");
        return token;
      }
      log("\u26A0\uFE0F Invisible Turnstile failed, forcing browser automation...");
      const fallbackToken = await handleCaptchaFallback();
      if (fallbackToken && fallbackToken.length > 20) {
        setTurnstileToken(fallbackToken);
        log("\u2705 Fallback token captured successfully");
        return fallbackToken;
      }
      log("\u274C All token generation methods failed");
      return null;
    } finally {
      tokenGenerationInProgress = false;
    }
  }
  async function handleCaptcha() {
    const startTime = Date.now();
    try {
      const sitekey = detectSitekey();
      log("\u{1F511} Generating Turnstile token for sitekey:", sitekey);
      if (typeof window !== "undefined" && window.navigator) {
        log("\u{1F9ED} UA:", window.navigator.userAgent, "Platform:", window.navigator.platform);
      }
      const token = await generatePaintToken(sitekey);
      if (token && token.length > 20) {
        const duration = Math.round(Date.now() - startTime);
        log(`\u2705 Turnstile token generated successfully in ${duration}ms`);
        return token;
      } else {
        throw new Error("Invalid or empty token received");
      }
    } catch (error) {
      const duration = Math.round(Date.now() - startTime);
      log(`\u274C Turnstile token generation failed after ${duration}ms:`, error);
      throw error;
    }
  }
  async function generatePaintToken(sitekey) {
    return executeTurnstile(sitekey, "paint");
  }
  async function loadTurnstile() {
    if (window.turnstile) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')) {
        const checkReady = () => {
          if (window.turnstile) {
            resolve();
          } else {
            setTimeout(checkReady, 100);
          }
        };
        return checkReady();
      }
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        log("\u2705 Turnstile script loaded successfully");
        resolve();
      };
      script.onerror = () => {
        log("\u274C Failed to load Turnstile script");
        reject(new Error("Failed to load Turnstile"));
      };
      document.head.appendChild(script);
    });
  }
  function ensureTurnstileContainer() {
    if (!_turnstileContainer || !document.body.contains(_turnstileContainer)) {
      if (_turnstileContainer) {
        _turnstileContainer.remove();
      }
      _turnstileContainer = document.createElement("div");
      _turnstileContainer.style.cssText = `
      position: fixed !important;
      left: -9999px !important; /* keep off-screen for invisible mode */
      top: -9999px !important;
      width: 300px !important;
      height: 65px !important;
      pointer-events: none !important;
      opacity: 0 !important; /* do not use visibility:hidden to avoid engine quirks */
      z-index: -1 !important;
    `;
      _turnstileContainer.setAttribute("aria-hidden", "true");
      _turnstileContainer.id = "turnstile-widget-container";
      document.body.appendChild(_turnstileContainer);
    }
    return _turnstileContainer;
  }
  function ensureTurnstileOverlayContainer() {
    if (_turnstileOverlay && document.body.contains(_turnstileOverlay)) {
      return _turnstileOverlay;
    }
    const overlay = document.createElement("div");
    overlay.id = "turnstile-overlay-container";
    overlay.style.cssText = `
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 320px;
    min-height: 80px;
    background: rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 12px;
    z-index: 100000;
    backdrop-filter: blur(6px);
    color: #fff;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  `;
    const title = document.createElement("div");
    title.textContent = "Cloudflare Turnstile \u2014 please complete the check if shown";
    title.style.cssText = 'font: 600 12px/1.3 "Segoe UI",sans-serif; margin-bottom: 8px; opacity: 0.9;';
    const widgetHost = document.createElement("div");
    widgetHost.id = "turnstile-overlay-host";
    widgetHost.style.cssText = "width: 100%; min-height: 70px;";
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Hide";
    closeBtn.style.cssText = "position:absolute; top:6px; right:6px; font-size:11px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:2px 6px; cursor:pointer;";
    closeBtn.addEventListener("click", () => overlay.remove());
    overlay.appendChild(title);
    overlay.appendChild(widgetHost);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    _turnstileOverlay = overlay;
    return overlay;
  }
  async function executeTurnstile(sitekey, action = "paint") {
    var _a;
    await loadTurnstile();
    if (_turnstileWidgetId && _lastSitekey === sitekey && ((_a = window.turnstile) == null ? void 0 : _a.execute)) {
      try {
        log("\u{1F504} Reusing existing Turnstile widget...");
        const token = await Promise.race([
          window.turnstile.execute(_turnstileWidgetId, { action }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Execute timeout")), 15e3))
        ]);
        if (token && token.length > 20) {
          log("\u2705 Token generated via widget reuse");
          return token;
        }
      } catch (err) {
        log("\u{1F504} Widget reuse failed, will create a fresh widget:", err.message);
      }
    }
    const invisible = await createNewTurnstileWidgetInvisible(sitekey, action);
    if (invisible && invisible.length > 20) return invisible;
    log("\u{1F440} Falling back to interactive Turnstile (visible).");
    return await createNewTurnstileWidgetInteractive(sitekey, action);
  }
  async function createNewTurnstileWidgetInvisible(sitekey, action) {
    return new Promise((resolve) => {
      var _a;
      try {
        if (_turnstileWidgetId && ((_a = window.turnstile) == null ? void 0 : _a.remove)) {
          try {
            window.turnstile.remove(_turnstileWidgetId);
          } catch {
          }
        }
        const container = ensureTurnstileContainer();
        container.innerHTML = "";
        const widgetId = window.turnstile.render(container, {
          sitekey,
          action,
          size: "invisible",
          retry: "auto",
          "retry-interval": 8e3,
          callback: (token) => {
            log("\u2705 Invisible Turnstile callback");
            resolve(token);
          },
          "error-callback": () => resolve(null),
          "timeout-callback": () => resolve(null)
        });
        _turnstileWidgetId = widgetId;
        _lastSitekey = sitekey;
        if (!widgetId) return resolve(null);
        Promise.race([
          window.turnstile.execute(widgetId, { action }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Invisible execute timeout")), 12e3))
        ]).then(resolve).catch(() => resolve(null));
      } catch (e) {
        log("Invisible Turnstile failed:", e);
        resolve(null);
      }
    });
  }
  async function createNewTurnstileWidgetInteractive(sitekey, action) {
    return new Promise((resolve, reject) => {
      var _a;
      try {
        if (_turnstileWidgetId && ((_a = window.turnstile) == null ? void 0 : _a.remove)) {
          try {
            window.turnstile.remove(_turnstileWidgetId);
          } catch {
          }
        }
        const overlay = ensureTurnstileOverlayContainer();
        const host = overlay.querySelector("#turnstile-overlay-host");
        host.innerHTML = "";
        const timeoutId = setTimeout(() => {
          log("\u23F0 Interactive Turnstile timed out");
          resolve(null);
        }, 12e4);
        const widgetId = window.turnstile.render(host, {
          sitekey,
          action,
          size: "normal",
          retry: "auto",
          "retry-interval": 8e3,
          callback: (token) => {
            clearTimeout(timeoutId);
            try {
              overlay.remove();
            } catch {
            }
            log("\u2705 Interactive Turnstile solved");
            resolve(token);
          },
          "error-callback": (error) => {
            log("\u{1F6A8} Interactive Turnstile error:", error);
          },
          "timeout-callback": () => {
            log("\u23F0 Turnstile timeout callback (interactive)");
          },
          "expired-callback": () => {
            log("\u26A0\uFE0F Interactive Turnstile token expired");
          }
        });
        _turnstileWidgetId = widgetId;
        _lastSitekey = sitekey;
        if (!widgetId) {
          clearTimeout(timeoutId);
          resolve(null);
          return;
        }
      } catch (error) {
        log("\u274C Error creating interactive Turnstile widget:", error);
        reject(error);
      }
    });
  }
  function detectSitekey(fallback = "0x4AAAAAABpqJe8FO0N84q0F") {
    var _a;
    if (_cachedSitekey) {
      return _cachedSitekey;
    }
    try {
      const sitekeySel = document.querySelector("[data-sitekey]");
      if (sitekeySel) {
        const sitekey = sitekeySel.getAttribute("data-sitekey");
        if (sitekey && sitekey.length > 10) {
          _cachedSitekey = sitekey;
          log("\u{1F50D} Sitekey detected from data attribute:", sitekey);
          return sitekey;
        }
      }
      const turnstileEl = document.querySelector(".cf-turnstile");
      if (((_a = turnstileEl == null ? void 0 : turnstileEl.dataset) == null ? void 0 : _a.sitekey) && turnstileEl.dataset.sitekey.length > 10) {
        _cachedSitekey = turnstileEl.dataset.sitekey;
        log("\u{1F50D} Sitekey detected from turnstile element:", _cachedSitekey);
        return _cachedSitekey;
      }
      if (typeof window !== "undefined" && window.__TURNSTILE_SITEKEY && window.__TURNSTILE_SITEKEY.length > 10) {
        _cachedSitekey = window.__TURNSTILE_SITEKEY;
        log("\u{1F50D} Sitekey detected from global variable:", _cachedSitekey);
        return _cachedSitekey;
      }
      const scripts = document.querySelectorAll("script");
      for (const script of scripts) {
        const content = script.textContent || script.innerHTML;
        const sitekeyMatch = content.match(/sitekey['":\s]+(['"0-9a-zA-Z_-]{20,})/i);
        if (sitekeyMatch && sitekeyMatch[1] && sitekeyMatch[1].length > 10) {
          _cachedSitekey = sitekeyMatch[1].replace(/['"]/g, "");
          log("\u{1F50D} Sitekey detected from script content:", _cachedSitekey);
          return _cachedSitekey;
        }
      }
    } catch (error) {
      log("Error detecting sitekey:", error);
    }
    log("\u{1F50D} Using fallback sitekey:", fallback);
    _cachedSitekey = fallback;
    return fallback;
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function waitForSelector(selector, interval = 200, timeout = 1e4) {
    return new Promise((resolve) => {
      const endTime = Date.now() + timeout;
      const check = () => {
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (Date.now() < endTime) {
          setTimeout(check, interval);
        } else {
          resolve(null);
        }
      };
      check();
    });
  }
  async function handleCaptchaFallback() {
    return new Promise((resolve, reject) => {
      const executeFlow = async () => {
        try {
          log("\u{1F3AF} Starting automatic CAPTCHA solving process...");
          invalidateToken();
          tokenPromise = new Promise((res) => {
            _resolveToken = res;
          });
          const timeoutPromise = sleep(3e4).then(() => reject(new Error("Auto-CAPTCHA timed out after 30 seconds.")));
          const solvePromise = (async () => {
            let mainPaintBtn = await waitForSelector("button.btn.btn-primary.btn-lg", 200, 3e3);
            if (!mainPaintBtn) {
              mainPaintBtn = await waitForSelector("button.btn-primary.sm\\:btn-xl", 200, 3e3);
            }
            if (!mainPaintBtn) {
              mainPaintBtn = await waitForSelector("button.btn-primary", 200, 3e3);
            }
            if (!mainPaintBtn) {
              log("\u{1F3AF} No paint button found, clicking on canvas directly to trigger CAPTCHA...");
              const canvas2 = await waitForSelector("canvas", 200, 5e3);
              if (canvas2) {
                canvas2.click();
                await sleep(1e3);
                mainPaintBtn = await waitForSelector("button.btn.btn-primary.btn-lg, button.btn-primary.sm\\:btn-xl, button.btn-primary", 200, 5e3);
              }
            }
            if (!mainPaintBtn) throw new Error("Could not find any paint button after attempts.");
            log("\u{1F3AF} Found paint button, clicking...");
            mainPaintBtn.click();
            await sleep(500);
            log("\u{1F3AF} Selecting transparent color...");
            const transBtn = await waitForSelector("button#color-0", 200, 5e3);
            if (!transBtn) {
              log("\u26A0\uFE0F Could not find transparent color button, trying alternative selectors...");
              const colorBtns = document.querySelectorAll('button[id^="color-"]');
              if (colorBtns.length > 0) {
                colorBtns[0].click();
                log("\u{1F3AF} Clicked first available color button");
              }
            } else {
              transBtn.click();
            }
            await sleep(500);
            log("\u{1F3AF} Finding canvas element...");
            const canvas = await waitForSelector("canvas", 200, 5e3);
            if (!canvas) throw new Error("Could not find the canvas element.");
            canvas.setAttribute("tabindex", "0");
            canvas.focus();
            const rect = canvas.getBoundingClientRect();
            const centerX = Math.round(rect.left + rect.width / 2);
            const centerY = Math.round(rect.top + rect.height / 2);
            log("\u{1F3AF} Simulating canvas interaction...");
            if (typeof window !== "undefined" && window.MouseEvent && window.KeyboardEvent) {
              canvas.dispatchEvent(new window.MouseEvent("mousemove", { clientX: centerX, clientY: centerY, bubbles: true }));
              canvas.dispatchEvent(new window.MouseEvent("mousedown", { clientX: centerX, clientY: centerY, bubbles: true }));
              await sleep(50);
              canvas.dispatchEvent(new window.MouseEvent("mouseup", { clientX: centerX, clientY: centerY, bubbles: true }));
              canvas.dispatchEvent(new window.KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true }));
              await sleep(50);
              canvas.dispatchEvent(new window.KeyboardEvent("keyup", { key: " ", code: "Space", bubbles: true }));
            }
            await sleep(1e3);
            log("\u{1F3AF} Waiting for CAPTCHA challenge...");
            await sleep(2e3);
            log("\u{1F3AF} Starting confirmation loop...");
            const startTime = Date.now();
            const confirmLoop = async () => {
              let attempts = 0;
              while (!isTokenValid() && Date.now() - startTime < 25e3) {
                attempts++;
                let confirmBtn = await waitForSelector("button.btn.btn-primary.btn-lg", 100, 1e3);
                if (!confirmBtn) {
                  confirmBtn = await waitForSelector("button.btn.btn-primary.sm\\:btn-xl", 100, 1e3);
                }
                if (!confirmBtn) {
                  const allPrimary = Array.from(document.querySelectorAll("button.btn-primary"));
                  confirmBtn = allPrimary.length ? allPrimary[allPrimary.length - 1] : null;
                }
                if (confirmBtn && !confirmBtn.disabled) {
                  log(`\u{1F3AF} Clicking confirmation button (attempt ${attempts})...`);
                  confirmBtn.click();
                } else {
                  log(`\u{1F3AF} No active confirm button found (attempt ${attempts})`);
                }
                await sleep(800);
              }
            };
            confirmLoop();
            const token = await tokenPromise;
            await sleep(500);
            log("\u2705 Token successfully captured through browser automation");
            resolve(token);
          })();
          await Promise.race([solvePromise, timeoutPromise]);
        } catch (error) {
          log("\u274C Auto-CAPTCHA process failed:", error);
          reject(error);
        }
      };
      executeFlow();
    });
  }
  window.__WPA_SET_TURNSTILE_TOKEN__ = function(token) {
    if (token && typeof token === "string" && token.length > 20) {
      log("\u2705 Turnstile Token Captured:", token);
      setTurnstileToken(token);
    }
  };
  (function() {
    if (window.__WPA_FETCH_HOOKED__) return;
    window.__WPA_FETCH_HOOKED__ = true;
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const response = await originalFetch.apply(this, args);
      const url = args[0] instanceof Request ? args[0].url : args[0];
      if (typeof url === "string") {
        if (url.includes("https://backend.wplace.live/s0/pixel/")) {
          try {
            const payload = JSON.parse(args[1].body);
            if (payload.t) {
              const capturedToken = payload.t;
              if (!isTokenValid() || turnstileToken !== capturedToken) {
                log("\u2705 Turnstile Token Captured:", capturedToken);
                window.postMessage({ source: "turnstile-capture", token: capturedToken }, "*");
              }
            }
          } catch {
          }
        }
      }
      return response;
    };
    window.addEventListener("message", (event) => {
      const { source, token } = event.data;
      if (source === "turnstile-capture" && token) {
        if (!isTokenValid() || turnstileToken !== token) {
          setTurnstileToken(token);
        }
      }
    });
  })();

  // src/core/wplace-api.js
  var BASE = "https://backend.wplace.live";
  async function getSession() {
    var _a, _b, _c;
    try {
      const me = await fetch(`${BASE}/me`, { credentials: "include" }).then((r) => r.json());
      const user = me || null;
      const c = (me == null ? void 0 : me.charges) || {};
      const charges = {
        count: (_a = c.count) != null ? _a : 0,
        // Mantener valor decimal original
        max: (_b = c.max) != null ? _b : 0,
        // Mantener valor original (puede variar por usuario)
        cooldownMs: (_c = c.cooldownMs) != null ? _c : 3e4
      };
      return {
        success: true,
        data: {
          user,
          charges: charges.count,
          maxCharges: charges.max,
          chargeRegen: charges.cooldownMs
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: {
          user: null,
          charges: 0,
          maxCharges: 0,
          chargeRegen: 3e4
        }
      };
    }
  }
  async function checkHealth() {
    try {
      const response = await fetch(`${BASE}/health`, {
        method: "GET",
        credentials: "include"
      });
      if (response.ok) {
        const health = await response.json();
        return {
          ...health,
          lastCheck: Date.now(),
          status: "online"
        };
      } else {
        return {
          database: false,
          up: false,
          uptime: "N/A",
          lastCheck: Date.now(),
          status: "error",
          statusCode: response.status
        };
      }
    } catch (error) {
      return {
        database: false,
        up: false,
        uptime: "N/A",
        lastCheck: Date.now(),
        status: "offline",
        error: error.message
      };
    }
  }
  async function postPixelBatchImage(tileX, tileY, coords, colors, turnstileToken2) {
    try {
      const body = JSON.stringify({
        colors,
        coords,
        t: turnstileToken2
      });
      log(`[API] Sending batch to tile ${tileX},${tileY} with ${colors.length} pixels, token: ${turnstileToken2 ? turnstileToken2.substring(0, 50) + "..." : "null"}`);
      const response = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body
      });
      log(`[API] Response: ${response.status} ${response.statusText}`);
      if (response.status === 403) {
        try {
          await response.json();
        } catch {
        }
        console.error("\u274C 403 Forbidden. Turnstile token might be invalid or expired.");
        try {
          console.log("\u{1F504} Regenerating Turnstile token after 403...");
          const newToken = await ensureToken(true);
          if (!newToken) {
            return {
              status: 403,
              json: { error: "Could not generate new token" },
              success: false,
              painted: 0
            };
          }
          const retryBody = JSON.stringify({
            colors,
            coords,
            t: newToken
          });
          log(`[API] Retrying with fresh token: ${newToken.substring(0, 50)}...`);
          const retryResponse = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "text/plain;charset=UTF-8" },
            body: retryBody
          });
          log(`[API] Retry response: ${retryResponse.status} ${retryResponse.statusText}`);
          if (retryResponse.status === 403) {
            return {
              status: 403,
              json: { error: "Fresh token still expired or invalid after retry" },
              success: false,
              painted: 0
            };
          }
          let retryData = null;
          try {
            const text = await retryResponse.text();
            if (text.trim()) {
              retryData = JSON.parse(text);
            } else {
              retryData = {};
            }
          } catch (parseError) {
            log(`[API] Warning: Could not parse retry response JSON: ${parseError.message}`);
            retryData = {};
          }
          const painted2 = (retryData == null ? void 0 : retryData.painted) || 0;
          log(`[API] Retry result: ${painted2} pixels painted`);
          return {
            status: retryResponse.status,
            json: retryData,
            success: retryResponse.ok,
            painted: painted2
          };
        } catch (retryError) {
          console.error("\u274C Token regeneration failed:", retryError);
          return {
            status: 403,
            json: { error: "Token regeneration failed: " + retryError.message },
            success: false,
            painted: 0
          };
        }
      }
      let responseData = null;
      try {
        const text = await response.text();
        if (text.trim()) {
          responseData = JSON.parse(text);
        } else {
          responseData = {};
        }
      } catch (parseError) {
        log(`[API] Warning: Could not parse response JSON: ${parseError.message}`);
        responseData = {};
      }
      const painted = (responseData == null ? void 0 : responseData.painted) || 0;
      log(`[API] Success: ${painted} pixels painted`);
      return {
        status: response.status,
        json: responseData,
        success: response.ok,
        painted
      };
    } catch (error) {
      log(`[API] Network error: ${error.message}`);
      return {
        status: 0,
        json: { error: error.message },
        success: false,
        painted: 0
      };
    }
  }

  // src/core/utils.js
  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }
  function dragHeader(headerEl, panelEl) {
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;
    headerEl.style.cursor = "move";
    headerEl.addEventListener("mousedown", startDrag);
    function startDrag(e) {
      e.preventDefault();
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("mousemove", doDrag);
    }
    function doDrag(e) {
      e.preventDefault();
      offsetX = mouseX - e.clientX;
      offsetY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      const newTop = panelEl.offsetTop - offsetY;
      const newLeft = panelEl.offsetLeft - offsetX;
      panelEl.style.top = Math.max(0, newTop) + "px";
      panelEl.style.left = Math.max(0, newLeft) + "px";
    }
    function stopDrag() {
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("mousemove", doDrag);
    }
  }

  // src/locales/es.js
  var es = {
    // Launcher
    launcher: {
      title: "WPlace AutoBOT",
      autoFarm: "\u{1F33E} Auto-Farm",
      autoImage: "\u{1F3A8} Auto-Image",
      autoGuard: "\u{1F6E1}\uFE0F Auto-Guard",
      selection: "Selecci\xF3n",
      user: "Usuario",
      charges: "Cargas",
      backend: "Backend",
      database: "Database",
      uptime: "Uptime",
      close: "Cerrar",
      launch: "Lanzar",
      loading: "Cargando\u2026",
      executing: "Ejecutando\u2026",
      downloading: "Descargando script\u2026",
      chooseBot: "Elige un bot y presiona Lanzar",
      readyToLaunch: "Listo para lanzar",
      loadError: "Error al cargar",
      loadErrorMsg: "No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",
      checking: "\u{1F504} Verificando...",
      online: "\u{1F7E2} Online",
      offline: "\u{1F534} Offline",
      ok: "\u{1F7E2} OK",
      error: "\u{1F534} Error",
      unknown: "-",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "Descargar Logs",
      clearLogs: "Limpiar Logs",
      closeLogs: "Cerrar"
    },
    // Image Module
    image: {
      title: "WPlace Auto-Image",
      initBot: "Iniciar Auto-BOT",
      uploadImage: "Subir Imagen",
      resizeImage: "Redimensionar Imagen",
      selectPosition: "Seleccionar Posici\xF3n",
      startPainting: "Iniciar Pintura",
      stopPainting: "Detener Pintura",
      saveProgress: "Guardar Progreso",
      loadProgress: "Cargar Progreso",
      checkingColors: "\u{1F50D} Verificando colores disponibles...",
      noColorsFound: "\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",
      colorsFound: "\u2705 {count} colores disponibles encontrados",
      loadingImage: "\u{1F5BC}\uFE0F Cargando imagen...",
      imageLoaded: "\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",
      imageError: "\u274C Error al cargar la imagen",
      selectPositionAlert: "\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",
      waitingPosition: "\u{1F446} Esperando que pintes el p\xEDxel de referencia...",
      positionSet: "\u2705 \xA1Posici\xF3n establecida con \xE9xito!",
      positionTimeout: "\u274C Tiempo agotado para seleccionar posici\xF3n",
      positionDetected: "\u{1F3AF} Posici\xF3n detectada, procesando...",
      positionError: "\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",
      startPaintingMsg: "\u{1F3A8} Iniciando pintura...",
      paintingProgress: "\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",
      noCharges: "\u231B Sin cargas. Esperando {time}...",
      paintingStopped: "\u23F9\uFE0F Pintura detenida por el usuario",
      paintingComplete: "\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",
      paintingError: "\u274C Error durante la pintura",
      missingRequirements: "\u274C Carga una imagen y selecciona una posici\xF3n primero",
      progress: "Progreso",
      userName: "Usuario",
      pixels: "P\xEDxeles",
      charges: "Cargas",
      estimatedTime: "Tiempo estimado",
      initMessage: "Haz clic en 'Iniciar Auto-BOT' para comenzar",
      waitingInit: "Esperando inicializaci\xF3n...",
      resizeSuccess: "\u2705 Imagen redimensionada a {width}x{height}",
      paintingPaused: "\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",
      pixelsPerBatch: "P\xEDxeles por lote",
      batchSize: "Tama\xF1o del lote",
      nextBatchTime: "Siguiente lote en",
      useAllCharges: "Usar todas las cargas disponibles",
      showOverlay: "Mostrar overlay",
      maxCharges: "Cargas m\xE1ximas por lote",
      waitingForCharges: "\u23F3 Esperando cargas: {current}/{needed}",
      timeRemaining: "Tiempo restante",
      cooldownWaiting: "\u23F3 Esperando {time} para continuar...",
      progressSaved: "\u2705 Progreso guardado como {filename}",
      progressLoaded: "\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",
      progressLoadError: "\u274C Error al cargar progreso: {error}",
      progressSaveError: "\u274C Error al guardar progreso: {error}",
      confirmSaveProgress: "\xBFDeseas guardar el progreso actual antes de detener?",
      saveProgressTitle: "Guardar Progreso",
      discardProgress: "Descartar",
      cancel: "Cancelar",
      minimize: "Minimizar",
      width: "Ancho",
      height: "Alto",
      keepAspect: "Mantener proporci\xF3n",
      apply: "Aplicar",
      overlayOn: "Overlay: ON",
      overlayOff: "Overlay: OFF",
      passCompleted: "\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",
      waitingChargesCountdown: "\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",
      autoInitializing: "\u{1F916} Inicializando autom\xE1ticamente...",
      autoInitSuccess: "\u2705 Bot iniciado autom\xE1ticamente",
      autoInitFailed: "\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",
      paletteDetected: "\u{1F3A8} Paleta de colores detectada",
      paletteNotFound: "\u{1F50D} Buscando paleta de colores...",
      clickingPaintButton: "\u{1F446} Haciendo clic en el bot\xF3n Paint...",
      paintButtonNotFound: "\u274C Bot\xF3n Paint no encontrado",
      manualInitRequired: "\u{1F527} Inicio manual requerido",
      retryAttempt: "\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",
      retryError: "\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",
      retryFailed: "\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",
      networkError: "\u{1F310} Error de red. Reintentando...",
      serverError: "\u{1F525} Error del servidor. Reintentando...",
      timeoutError: "\u23F0 Timeout del servidor. Reintentando...",
      // Nuevos textos v2.0
      protectionEnabled: "\u{1F6E1}\uFE0F Protecci\xF3n habilitada",
      protectionDisabled: "\u{1F6E1}\uFE0F Protecci\xF3n deshabilitada",
      paintPattern: "\u{1F4D0} Patr\xF3n de pintado",
      patternLinearStart: "Lineal (Inicio)",
      patternLinearEnd: "Lineal (Final)",
      patternRandom: "Aleatorio",
      patternCenterOut: "Centro hacia afuera",
      patternCornersFirst: "Esquinas primero",
      patternSpiral: "Espiral",
      protectingDrawing: "\u{1F6E1}\uFE0F Protegiendo dibujo...",
      changesDetected: "\u{1F6A8} {count} cambios detectados en el dibujo",
      repairing: "\u{1F527} Reparando {count} p\xEDxeles alterados...",
      repairCompleted: "\u2705 Reparaci\xF3n completada: {count} p\xEDxeles",
      noChargesForRepair: "\u26A1 Sin cargas para reparar, esperando...",
      protectionPriority: "\u{1F6E1}\uFE0F Prioridad de protecci\xF3n activada",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "Descargar Logs",
      clearLogs: "Limpiar Logs",
      closeLogs: "Cerrar",
      // Nuevas funcionalidades
      paintingStats: "Estad\xEDsticas de Pintado",
      userInfo: "Informaci\xF3n del Usuario",
      imageProgress: "Progreso de la Imagen",
      availableColors: "Colores Disponibles",
      refreshStats: "Actualizar Estad\xEDsticas",
      noImageLoaded: "No hay imagen cargada",
      cooldown: "Tiempo de espera",
      totalColors: "Total de Colores",
      colorPalette: "Paleta de Colores",
      showAllColors: "Mostrar Todos los Colores (incluyendo no disponibles)",
      selectAllColors: "Seleccionar Todos",
      unselectAllColors: "Deseleccionar Todos",
      noAvailable: "No disponible",
      colorSelected: "Color seleccionado",
      statsUpdated: "\u2705 Estad\xEDsticas actualizadas: {count} colores disponibles"
    },
    // Farm Module (por implementar)
    farm: {
      title: "WPlace Farm Bot",
      start: "Iniciar",
      stop: "Detener",
      stopped: "Bot detenido",
      calibrate: "Calibrar",
      paintOnce: "Una vez",
      checkingStatus: "Verificando estado...",
      configuration: "Configuraci\xF3n",
      delay: "Delay (ms)",
      pixelsPerBatch: "P\xEDxeles/lote",
      minCharges: "Cargas m\xEDn",
      colorMode: "Modo color",
      random: "Aleatorio",
      fixed: "Fijo",
      range: "Rango",
      fixedColor: "Color fijo",
      advanced: "Avanzado",
      tileX: "Tile X",
      tileY: "Tile Y",
      customPalette: "Paleta personalizada",
      paletteExample: "ej: #FF0000,#00FF00,#0000FF",
      capture: "Capturar",
      painted: "Pintados",
      charges: "Cargas",
      retries: "Fallos",
      tile: "Tile",
      configSaved: "Configuraci\xF3n guardada",
      configLoaded: "Configuraci\xF3n cargada",
      configReset: "Configuraci\xF3n reiniciada",
      captureInstructions: "Pinta un p\xEDxel manualmente para capturar coordenadas...",
      backendOnline: "Backend Online",
      backendOffline: "Backend Offline",
      startingBot: "Iniciando bot...",
      stoppingBot: "Deteniendo bot...",
      calibrating: "Calibrando...",
      alreadyRunning: "Auto-Farm ya est\xE1 corriendo.",
      imageRunningWarning: "Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",
      selectPosition: "Seleccionar Zona",
      selectPositionAlert: "\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",
      waitingPosition: "\u{1F446} Esperando que pintes el p\xEDxel de referencia...",
      positionSet: "\u2705 \xA1Zona establecida! Radio: 500px",
      positionTimeout: "\u274C Tiempo agotado para seleccionar zona",
      missingPosition: "\u274C Selecciona una zona primero usando 'Seleccionar Zona'",
      farmRadius: "Radio farm",
      positionInfo: "Zona actual",
      farmingInRadius: "\u{1F33E} Farming en radio {radius}px desde ({x},{y})",
      selectEmptyArea: "\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",
      noPosition: "Sin zona",
      currentZone: "Zona: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "Descargar Logs",
      clearLogs: "Limpiar Logs",
      closeLogs: "Cerrar"
    },
    // Common/Shared
    common: {
      yes: "S\xED",
      no: "No",
      ok: "Aceptar",
      cancel: "Cancelar",
      close: "Cerrar",
      save: "Guardar",
      load: "Cargar",
      delete: "Eliminar",
      edit: "Editar",
      start: "Iniciar",
      stop: "Detener",
      pause: "Pausar",
      resume: "Reanudar",
      reset: "Reiniciar",
      settings: "Configuraci\xF3n",
      help: "Ayuda",
      about: "Acerca de",
      language: "Idioma",
      loading: "Cargando...",
      error: "Error",
      success: "\xC9xito",
      warning: "Advertencia",
      info: "Informaci\xF3n",
      languageChanged: "Idioma cambiado a {language}"
    },
    // Guard Module
    guard: {
      title: "WPlace Auto-Guard",
      initBot: "Inicializar Guard-BOT",
      selectArea: "Seleccionar \xC1rea",
      captureArea: "Capturar \xC1rea",
      startProtection: "Iniciar Protecci\xF3n",
      stopProtection: "Detener Protecci\xF3n",
      upperLeft: "Esquina Superior Izquierda",
      lowerRight: "Esquina Inferior Derecha",
      protectedPixels: "P\xEDxeles Protegidos",
      detectedChanges: "Cambios Detectados",
      repairedPixels: "P\xEDxeles Reparados",
      charges: "Cargas",
      waitingInit: "Esperando inicializaci\xF3n...",
      checkingColors: "\u{1F3A8} Verificando colores disponibles...",
      noColorsFound: "\u274C No se encontraron colores. Abre la paleta de colores en el sitio.",
      colorsFound: "\u2705 {count} colores disponibles encontrados",
      initSuccess: "\u2705 Guard-BOT inicializado correctamente",
      initError: "\u274C Error inicializando Guard-BOT",
      invalidCoords: "\u274C Coordenadas inv\xE1lidas",
      invalidArea: "\u274C El \xE1rea debe tener esquina superior izquierda menor que inferior derecha",
      areaTooLarge: "\u274C \xC1rea demasiado grande: {size} p\xEDxeles (m\xE1ximo: {max})",
      capturingArea: "\u{1F4F8} Capturando \xE1rea de protecci\xF3n...",
      areaCaptured: "\u2705 \xC1rea capturada: {count} p\xEDxeles bajo protecci\xF3n",
      captureError: "\u274C Error capturando \xE1rea: {error}",
      captureFirst: "\u274C Primero captura un \xE1rea de protecci\xF3n",
      protectionStarted: "\u{1F6E1}\uFE0F Protecci\xF3n iniciada - monitoreando \xE1rea",
      protectionStopped: "\u23F9\uFE0F Protecci\xF3n detenida",
      noChanges: "\u2705 \xC1rea protegida - sin cambios detectados",
      changesDetected: "\u{1F6A8} {count} cambios detectados en el \xE1rea protegida",
      repairing: "\u{1F6E0}\uFE0F Reparando {count} p\xEDxeles alterados...",
      repairedSuccess: "\u2705 Reparados {count} p\xEDxeles correctamente",
      repairError: "\u274C Error reparando p\xEDxeles: {error}",
      noCharges: "\u26A0\uFE0F Sin cargas suficientes para reparar cambios",
      checkingChanges: "\u{1F50D} Verificando cambios en \xE1rea protegida...",
      errorChecking: "\u274C Error verificando cambios: {error}",
      guardActive: "\u{1F6E1}\uFE0F Guardi\xE1n activo - \xE1rea bajo protecci\xF3n",
      lastCheck: "\xDAltima verificaci\xF3n: {time}",
      nextCheck: "Pr\xF3xima verificaci\xF3n en: {time}s",
      autoInitializing: "\u{1F916} Inicializando autom\xE1ticamente...",
      autoInitSuccess: "\u2705 Guard-BOT iniciado autom\xE1ticamente",
      autoInitFailed: "\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",
      manualInitRequired: "\u{1F527} Inicio manual requerido",
      paletteDetected: "\u{1F3A8} Paleta de colores detectada",
      paletteNotFound: "\u{1F50D} Buscando paleta de colores...",
      clickingPaintButton: "\u{1F446} Haciendo clic en el bot\xF3n Paint...",
      paintButtonNotFound: "\u274C Bot\xF3n Paint no encontrado",
      selectUpperLeft: "\u{1F3AF} Pinta un p\xEDxel en la esquina SUPERIOR IZQUIERDA del \xE1rea a proteger",
      selectLowerRight: "\u{1F3AF} Ahora pinta un p\xEDxel en la esquina INFERIOR DERECHA del \xE1rea",
      waitingUpperLeft: "\u{1F446} Esperando selecci\xF3n de esquina superior izquierda...",
      waitingLowerRight: "\u{1F446} Esperando selecci\xF3n de esquina inferior derecha...",
      upperLeftCaptured: "\u2705 Esquina superior izquierda capturada: ({x}, {y})",
      lowerRightCaptured: "\u2705 Esquina inferior derecha capturada: ({x}, {y})",
      selectionTimeout: "\u274C Tiempo agotado para selecci\xF3n",
      selectionError: "\u274C Error en selecci\xF3n, int\xE9ntalo de nuevo",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "Descargar Logs",
      clearLogs: "Limpiar Logs",
      closeLogs: "Cerrar"
    }
  };

  // src/locales/en.js
  var en = {
    // Launcher
    launcher: {
      title: "WPlace AutoBOT",
      autoFarm: "\u{1F33E} Auto-Farm",
      autoImage: "\u{1F3A8} Auto-Image",
      autoGuard: "\u{1F6E1}\uFE0F Auto-Guard",
      selection: "Selection",
      user: "User",
      charges: "Charges",
      backend: "Backend",
      database: "Database",
      uptime: "Uptime",
      close: "Close",
      launch: "Launch",
      loading: "Loading\u2026",
      executing: "Executing\u2026",
      downloading: "Downloading script\u2026",
      chooseBot: "Choose a bot and press Launch",
      readyToLaunch: "Ready to launch",
      loadError: "Load error",
      loadErrorMsg: "Could not load the selected bot. Check your connection or try again.",
      checking: "\u{1F504} Checking...",
      online: "\u{1F7E2} Online",
      offline: "\u{1F534} Offline",
      ok: "\u{1F7E2} OK",
      error: "\u{1F534} Error",
      unknown: "-",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "Download Logs",
      clearLogs: "Clear Logs",
      closeLogs: "Close"
    },
    // Image Module
    image: {
      title: "WPlace Auto-Image",
      initBot: "Initialize Auto-BOT",
      uploadImage: "Upload Image",
      resizeImage: "Resize Image",
      selectPosition: "Select Position",
      startPainting: "Start Painting",
      stopPainting: "Stop Painting",
      saveProgress: "Save Progress",
      loadProgress: "Load Progress",
      checkingColors: "\u{1F50D} Checking available colors...",
      noColorsFound: "\u274C Open the color palette on the site and try again!",
      colorsFound: "\u2705 Found {count} available colors",
      loadingImage: "\u{1F5BC}\uFE0F Loading image...",
      imageLoaded: "\u2705 Image loaded with {count} valid pixels",
      imageError: "\u274C Error loading image",
      selectPositionAlert: "Paint the first pixel at the location where you want the art to start!",
      waitingPosition: "\u{1F446} Waiting for you to paint the reference pixel...",
      positionSet: "\u2705 Position set successfully!",
      positionTimeout: "\u274C Timeout for position selection",
      positionDetected: "\u{1F3AF} Position detected, processing...",
      positionError: "\u274C Error detecting position, please try again",
      startPaintingMsg: "\u{1F3A8} Starting painting...",
      paintingProgress: "\u{1F9F1} Progress: {painted}/{total} pixels...",
      noCharges: "\u231B No charges. Waiting {time}...",
      paintingStopped: "\u23F9\uFE0F Painting stopped by user",
      paintingComplete: "\u2705 Painting completed! {count} pixels painted.",
      paintingError: "\u274C Error during painting",
      missingRequirements: "\u274C Load an image and select a position first",
      progress: "Progress",
      userName: "User",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Estimated time",
      initMessage: "Click 'Initialize Auto-BOT' to begin",
      waitingInit: "Waiting for initialization...",
      resizeSuccess: "\u2705 Image resized to {width}x{height}",
      paintingPaused: "\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",
      pixelsPerBatch: "Pixels per batch",
      batchSize: "Batch size",
      nextBatchTime: "Next batch in",
      useAllCharges: "Use all available charges",
      showOverlay: "Show overlay",
      maxCharges: "Max charges per batch",
      waitingForCharges: "\u23F3 Waiting for charges: {current}/{needed}",
      timeRemaining: "Time remaining",
      cooldownWaiting: "\u23F3 Waiting {time} to continue...",
      progressSaved: "\u2705 Progress saved as {filename}",
      progressLoaded: "\u2705 Progress loaded: {painted}/{total} pixels painted",
      progressLoadError: "\u274C Error loading progress: {error}",
      progressSaveError: "\u274C Error saving progress: {error}",
      confirmSaveProgress: "Do you want to save the current progress before stopping?",
      saveProgressTitle: "Save Progress",
      discardProgress: "Discard",
      cancel: "Cancel",
      minimize: "Minimize",
      width: "Width",
      height: "Height",
      keepAspect: "Keep aspect ratio",
      apply: "Apply",
      overlayOn: "Overlay: ON",
      overlayOff: "Overlay: OFF",
      passCompleted: "\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",
      waitingChargesCountdown: "\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",
      autoInitializing: "\u{1F916} Auto-initializing...",
      autoInitSuccess: "\u2705 Bot auto-started successfully",
      autoInitFailed: "\u26A0\uFE0F Could not auto-start. Use manual button.",
      paletteDetected: "\u{1F3A8} Color palette detected",
      paletteNotFound: "\u{1F50D} Searching for color palette...",
      clickingPaintButton: "\u{1F446} Clicking Paint button...",
      paintButtonNotFound: "\u274C Paint button not found",
      manualInitRequired: "\u{1F527} Manual initialization required",
      retryAttempt: "\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",
      retryError: "\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",
      retryFailed: "\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",
      networkError: "\u{1F310} Network error. Retrying...",
      serverError: "\u{1F525} Server error. Retrying...",
      timeoutError: "\u23F0 Server timeout, retrying...",
      // v2.0 - Protection and Patterns
      protectionEnabled: "Protection enabled",
      protectionDisabled: "Protection disabled",
      paintPattern: "Paint pattern",
      patternLinearStart: "Linear (Start)",
      patternLinearEnd: "Linear (End)",
      patternRandom: "Random",
      patternCenterOut: "Center outward",
      patternCornersFirst: "Corners first",
      patternSpiral: "Spiral",
      solid: "Solid",
      stripes: "Stripes",
      checkerboard: "Checkerboard",
      gradient: "Gradient",
      dots: "Dots",
      waves: "Waves",
      spiral: "Spiral",
      mosaic: "Mosaic",
      bricks: "Bricks",
      zigzag: "Zigzag",
      protectingDrawing: "Protecting drawing...",
      changesDetected: "\u{1F6A8} {count} changes detected in drawing",
      repairing: "\u{1F527} Repairing {count} altered pixels...",
      repairCompleted: "\u2705 Repair completed: {count} pixels",
      noChargesForRepair: "\u26A1 No charges for repair, waiting...",
      protectionPriority: "\u{1F6E1}\uFE0F Protection priority activated",
      patternApplied: "Pattern applied",
      customPattern: "Custom pattern",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "Download Logs",
      clearLogs: "Clear Logs",
      closeLogs: "Close"
    },
    // Farm module (to be implemented)
    farm: {
      title: "WPlace Farm Bot",
      start: "Start",
      stop: "Stop",
      stopped: "Bot stopped",
      calibrate: "Calibrate",
      paintOnce: "Once",
      checkingStatus: "Checking status...",
      configuration: "Configuration",
      delay: "Delay (ms)",
      pixelsPerBatch: "Pixels/batch",
      minCharges: "Min charges",
      colorMode: "Color mode",
      random: "Random",
      fixed: "Fixed",
      range: "Range",
      fixedColor: "Fixed color",
      advanced: "Advanced",
      tileX: "Tile X",
      tileY: "Tile Y",
      customPalette: "Custom palette",
      paletteExample: "e.g: #FF0000,#00FF00,#0000FF",
      capture: "Capture",
      painted: "Painted",
      charges: "Charges",
      retries: "Retries",
      tile: "Tile",
      configSaved: "Configuration saved",
      configLoaded: "Configuration loaded",
      configReset: "Configuration reset",
      captureInstructions: "Paint a pixel manually to capture coordinates...",
      backendOnline: "Backend Online",
      backendOffline: "Backend Offline",
      startingBot: "Starting bot...",
      stoppingBot: "Stopping bot...",
      calibrating: "Calibrating...",
      alreadyRunning: "Auto-Farm is already running.",
      imageRunningWarning: "Auto-Image is running. Close it before starting Auto-Farm.",
      selectPosition: "Select Area",
      selectPositionAlert: "\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",
      waitingPosition: "\u{1F446} Waiting for you to paint the reference pixel...",
      positionSet: "\u2705 Area set! Radius: 500px",
      positionTimeout: "\u274C Timeout for area selection",
      missingPosition: "\u274C Select an area first using 'Select Area'",
      farmRadius: "Farm radius",
      positionInfo: "Current area",
      farmingInRadius: "\u{1F33E} Farming in {radius}px radius from ({x},{y})",
      selectEmptyArea: "\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",
      noPosition: "No area",
      currentZone: "Zone: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "Download Logs",
      clearLogs: "Clear Logs",
      closeLogs: "Close"
    },
    // Common/Shared
    common: {
      yes: "Yes",
      no: "No",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      save: "Save",
      load: "Load",
      delete: "Delete",
      edit: "Edit",
      start: "Start",
      stop: "Stop",
      pause: "Pause",
      resume: "Resume",
      reset: "Reset",
      settings: "Settings",
      help: "Help",
      about: "About",
      language: "Language",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information",
      languageChanged: "Language changed to {language}"
    },
    // Guard Module
    guard: {
      title: "WPlace Auto-Guard",
      initBot: "Initialize Guard-BOT",
      selectArea: "Select Area",
      captureArea: "Capture Area",
      startProtection: "Start Protection",
      stopProtection: "Stop Protection",
      upperLeft: "Upper Left Corner",
      lowerRight: "Lower Right Corner",
      protectedPixels: "Protected Pixels",
      detectedChanges: "Detected Changes",
      repairedPixels: "Repaired Pixels",
      charges: "Charges",
      waitingInit: "Waiting for initialization...",
      checkingColors: "\u{1F3A8} Checking available colors...",
      noColorsFound: "\u274C No colors found. Open the color palette on the site.",
      colorsFound: "\u2705 Found {count} available colors",
      initSuccess: "\u2705 Guard-BOT initialized successfully",
      initError: "\u274C Error initializing Guard-BOT",
      invalidCoords: "\u274C Invalid coordinates",
      invalidArea: "\u274C Area must have upper left corner less than lower right corner",
      areaTooLarge: "\u274C Area too large: {size} pixels (maximum: {max})",
      capturingArea: "\u{1F4F8} Capturing protection area...",
      areaCaptured: "\u2705 Area captured: {count} pixels under protection",
      captureError: "\u274C Error capturing area: {error}",
      captureFirst: "\u274C First capture a protection area",
      protectionStarted: "\u{1F6E1}\uFE0F Protection started - monitoring area",
      protectionStopped: "\u23F9\uFE0F Protection stopped",
      noChanges: "\u2705 Protected area - no changes detected",
      changesDetected: "\u{1F6A8} {count} changes detected in protected area",
      repairing: "\u{1F6E0}\uFE0F Repairing {count} altered pixels...",
      repairedSuccess: "\u2705 Successfully repaired {count} pixels",
      repairError: "\u274C Error repairing pixels: {error}",
      noCharges: "\u26A0\uFE0F Insufficient charges to repair changes",
      checkingChanges: "\u{1F50D} Checking changes in protected area...",
      errorChecking: "\u274C Error checking changes: {error}",
      guardActive: "\u{1F6E1}\uFE0F Guardian active - area under protection",
      lastCheck: "Last check: {time}",
      nextCheck: "Next check in: {time}s",
      autoInitializing: "\u{1F916} Auto-initializing...",
      autoInitSuccess: "\u2705 Guard-BOT auto-started successfully",
      autoInitFailed: "\u26A0\uFE0F Could not auto-start. Use manual button.",
      manualInitRequired: "\u{1F527} Manual initialization required",
      paletteDetected: "\u{1F3A8} Color palette detected",
      paletteNotFound: "\u{1F50D} Searching for color palette...",
      clickingPaintButton: "\u{1F446} Clicking Paint button...",
      paintButtonNotFound: "\u274C Paint button not found",
      selectUpperLeft: "\u{1F3AF} Paint a pixel at the UPPER LEFT corner of the area to protect",
      selectLowerRight: "\u{1F3AF} Now paint a pixel at the LOWER RIGHT corner of the area",
      waitingUpperLeft: "\u{1F446} Waiting for upper left corner selection...",
      waitingLowerRight: "\u{1F446} Waiting for lower right corner selection...",
      upperLeftCaptured: "\u2705 Upper left corner captured: ({x}, {y})",
      lowerRightCaptured: "\u2705 Lower right corner captured: ({x}, {y})",
      selectionTimeout: "\u274C Selection timeout",
      selectionError: "\u274C Selection error, please try again",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "Download Logs",
      clearLogs: "Clear Logs",
      closeLogs: "Close"
    }
  };

  // src/locales/fr.js
  var fr = {
    // Launcher
    launcher: {
      title: "WPlace AutoBOT",
      autoFarm: "\u{1F33E} Auto-Farm",
      autoImage: "\u{1F3A8} Auto-Image",
      autoGuard: "\u{1F6E1}\uFE0F Auto-Guard",
      selection: "S\xE9lection",
      user: "Utilisateur",
      charges: "Charges",
      backend: "Backend",
      database: "Base de donn\xE9es",
      uptime: "Temps actif",
      close: "Fermer",
      launch: "Lancer",
      loading: "Chargement\u2026",
      executing: "Ex\xE9cution\u2026",
      downloading: "T\xE9l\xE9chargement du script\u2026",
      chooseBot: "Choisissez un bot et appuyez sur Lancer",
      readyToLaunch: "Pr\xEAt \xE0 lancer",
      loadError: "Erreur de chargement",
      loadErrorMsg: "Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",
      checking: "\u{1F504} V\xE9rification...",
      online: "\u{1F7E2} En ligne",
      offline: "\u{1F534} Hors ligne",
      ok: "\u{1F7E2} OK",
      error: "\u{1F534} Erreur",
      unknown: "-",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "T\xE9l\xE9charger Logs",
      clearLogs: "Effacer Logs",
      closeLogs: "Fermer"
    },
    // Image Module
    image: {
      title: "WPlace Auto-Image",
      initBot: "Initialiser Auto-BOT",
      uploadImage: "T\xE9l\xE9charger Image",
      resizeImage: "Redimensionner Image",
      selectPosition: "S\xE9lectionner Position",
      startPainting: "Commencer Peinture",
      stopPainting: "Arr\xEAter Peinture",
      saveProgress: "Sauvegarder Progr\xE8s",
      loadProgress: "Charger Progr\xE8s",
      checkingColors: "\u{1F50D} V\xE9rification des couleurs disponibles...",
      noColorsFound: "\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",
      colorsFound: "\u2705 {count} couleurs disponibles trouv\xE9es",
      loadingImage: "\u{1F5BC}\uFE0F Chargement de l'image...",
      imageLoaded: "\u2705 Image charg\xE9e avec {count} pixels valides",
      imageError: "\u274C Erreur lors du chargement de l'image",
      selectPositionAlert: "Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",
      waitingPosition: "\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",
      positionSet: "\u2705 Position d\xE9finie avec succ\xE8s!",
      positionTimeout: "\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",
      positionDetected: "\u{1F3AF} Position d\xE9tect\xE9e, traitement...",
      positionError: "\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",
      startPaintingMsg: "\u{1F3A8} D\xE9but de la peinture...",
      paintingProgress: "\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",
      noCharges: "\u231B Aucune charge. Attendre {time}...",
      paintingStopped: "\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",
      paintingComplete: "\u2705 Peinture termin\xE9e! {count} pixels peints.",
      paintingError: "\u274C Erreur pendant la peinture",
      missingRequirements: "\u274C Chargez une image et s\xE9lectionnez une position d'abord",
      progress: "Progr\xE8s",
      userName: "Usager",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Temps estim\xE9",
      initMessage: "Cliquez sur 'Initialiser Auto-BOT' pour commencer",
      waitingInit: "En attente d'initialisation...",
      resizeSuccess: "\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",
      paintingPaused: "\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",
      pixelsPerBatch: "Pixels par lot",
      batchSize: "Taille du lot",
      nextBatchTime: "Prochain lot dans",
      useAllCharges: "Utiliser toutes les charges disponibles",
      showOverlay: "Afficher l'overlay",
      maxCharges: "Charges max par lot",
      waitingForCharges: "\u23F3 En attente de charges: {current}/{needed}",
      timeRemaining: "Temps restant",
      cooldownWaiting: "\u23F3 Attendre {time} pour continuer...",
      progressSaved: "\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",
      progressLoaded: "\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",
      progressLoadError: "\u274C Erreur lors du chargement du progr\xE8s: {error}",
      progressSaveError: "\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",
      confirmSaveProgress: "Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",
      saveProgressTitle: "Sauvegarder Progr\xE8s",
      discardProgress: "Abandonner",
      cancel: "Annuler",
      minimize: "Minimiser",
      width: "Largeur",
      height: "Hauteur",
      keepAspect: "Garder les proportions",
      apply: "Appliquer",
      overlayOn: "Overlay : ON",
      overlayOff: "Overlay : OFF",
      passCompleted: "\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",
      waitingChargesCountdown: "\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",
      autoInitializing: "\u{1F916} Initialisation automatique...",
      autoInitSuccess: "\u2705 Bot d\xE9marr\xE9 automatiquement",
      autoInitFailed: "\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",
      paletteDetected: "\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",
      paletteNotFound: "\u{1F50D} Recherche de la palette de couleurs...",
      clickingPaintButton: "\u{1F446} Clic sur le bouton Paint...",
      paintButtonNotFound: "\u274C Bouton Paint introuvable",
      manualInitRequired: "\u{1F527} Initialisation manuelle requise",
      retryAttempt: "\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",
      retryError: "\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",
      retryFailed: "\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",
      networkError: "\u{1F310} Erreur r\xE9seau. Nouvel essai...",
      serverError: "\u{1F525} Erreur serveur. Nouvel essai...",
      timeoutError: "\u23F0 D\xE9lai d\u2019attente du serveur, nouvelle tentative...",
      // v2.0 - Protection et motifs
      protectionEnabled: "Protection activ\xE9e",
      protectionDisabled: "Protection d\xE9sactiv\xE9e",
      paintPattern: "Motif de peinture",
      patternLinearStart: "Lin\xE9aire (D\xE9but)",
      patternLinearEnd: "Lin\xE9aire (Fin)",
      patternRandom: "Al\xE9atoire",
      patternCenterOut: "Centre vers l\u2019ext\xE9rieur",
      patternCornersFirst: "Coins d\u2019abord",
      patternSpiral: "Spirale",
      solid: "Plein",
      stripes: "Rayures",
      checkerboard: "Damier",
      gradient: "D\xE9grad\xE9",
      dots: "Points",
      waves: "Vagues",
      spiral: "Spirale",
      mosaic: "Mosa\xEFque",
      bricks: "Briques",
      zigzag: "Zigzag",
      protectingDrawing: "Protection du dessin...",
      changesDetected: "\u{1F6A8} {count} changements d\xE9tect\xE9s dans le dessin",
      repairing: "\u{1F527} R\xE9paration de {count} pixels modifi\xE9s...",
      repairCompleted: "\u2705 R\xE9paration termin\xE9e : {count} pixels",
      noChargesForRepair: "\u26A1 Pas de frais pour la r\xE9paration, en attente...",
      protectionPriority: "\u{1F6E1}\uFE0F Priorit\xE9 \xE0 la protection activ\xE9e",
      patternApplied: "Motif appliqu\xE9",
      customPattern: "Motif personnalis\xE9",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "T\xE9l\xE9charger Logs",
      clearLogs: "Effacer Logs",
      closeLogs: "Fermer"
    },
    // Farm Module (to be implemented)
    farm: {
      title: "WPlace Farm Bot",
      start: "D\xE9marrer",
      stop: "Arr\xEAter",
      stopped: "Bot arr\xEAt\xE9",
      calibrate: "Calibrer",
      paintOnce: "Une fois",
      checkingStatus: "V\xE9rification du statut...",
      configuration: "Configuration",
      delay: "D\xE9lai (ms)",
      pixelsPerBatch: "Pixels/lot",
      minCharges: "Charges min",
      colorMode: "Mode couleur",
      random: "Al\xE9atoire",
      fixed: "Fixe",
      range: "Plage",
      fixedColor: "Couleur fixe",
      advanced: "Avanc\xE9",
      tileX: "Tuile X",
      tileY: "Tuile Y",
      customPalette: "Palette personnalis\xE9e",
      paletteExample: "ex: #FF0000,#00FF00,#0000FF",
      capture: "Capturer",
      painted: "Peints",
      charges: "Charges",
      retries: "\xC9checs",
      tile: "Tuile",
      configSaved: "Configuration sauvegard\xE9e",
      configLoaded: "Configuration charg\xE9e",
      configReset: "Configuration r\xE9initialis\xE9e",
      captureInstructions: "Peindre un pixel manuellement pour capturer les coordonn\xE9es...",
      backendOnline: "Backend En ligne",
      backendOffline: "Backend Hors ligne",
      startingBot: "D\xE9marrage du bot...",
      stoppingBot: "Arr\xEAt du bot...",
      calibrating: "Calibrage...",
      alreadyRunning: "Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",
      imageRunningWarning: "Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",
      selectPosition: "S\xE9lectionner Zone",
      selectPositionAlert: "\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",
      waitingPosition: "\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",
      positionSet: "\u2705 Zone d\xE9finie! Rayon: 500px",
      positionTimeout: "\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",
      missingPosition: "\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",
      farmRadius: "Rayon farm",
      positionInfo: "Zone actuelle",
      farmingInRadius: "\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",
      selectEmptyArea: "\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",
      noPosition: "Aucune zone",
      currentZone: "Zone: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "T\xE9l\xE9charger Logs",
      clearLogs: "Effacer Logs",
      closeLogs: "Fermer"
    },
    // Common/Shared
    common: {
      yes: "Oui",
      no: "Non",
      ok: "OK",
      cancel: "Annuler",
      close: "Fermer",
      save: "Sauvegarder",
      load: "Charger",
      delete: "Supprimer",
      edit: "Modifier",
      start: "D\xE9marrer",
      stop: "Arr\xEAter",
      pause: "Pause",
      resume: "Reprendre",
      reset: "R\xE9initialiser",
      settings: "Param\xE8tres",
      help: "Aide",
      about: "\xC0 propos",
      language: "Langue",
      loading: "Chargement...",
      error: "Erreur",
      success: "Succ\xE8s",
      warning: "Avertissement",
      info: "Information",
      languageChanged: "Langue chang\xE9e en {language}"
    },
    // Guard Module
    guard: {
      title: "WPlace Auto-Guard",
      initBot: "Initialiser Guard-BOT",
      selectArea: "S\xE9lectionner Zone",
      captureArea: "Capturer Zone",
      startProtection: "D\xE9marrer Protection",
      stopProtection: "Arr\xEAter Protection",
      upperLeft: "Coin Sup\xE9rieur Gauche",
      lowerRight: "Coin Inf\xE9rieur Droit",
      protectedPixels: "Pixels Prot\xE9g\xE9s",
      detectedChanges: "Changements D\xE9tect\xE9s",
      repairedPixels: "Pixels R\xE9par\xE9s",
      charges: "Charges",
      waitingInit: "En attente d'initialisation...",
      checkingColors: "\u{1F3A8} V\xE9rification des couleurs disponibles...",
      noColorsFound: "\u274C Aucune couleur trouv\xE9e. Ouvrez la palette de couleurs sur le site.",
      colorsFound: "\u2705 {count} couleurs disponibles trouv\xE9es",
      initSuccess: "\u2705 Guard-BOT initialis\xE9 avec succ\xE8s",
      initError: "\u274C Erreur lors de l'initialisation de Guard-BOT",
      invalidCoords: "\u274C Coordonn\xE9es invalides",
      invalidArea: "\u274C La zone doit avoir le coin sup\xE9rieur gauche inf\xE9rieur au coin inf\xE9rieur droit",
      areaTooLarge: "\u274C Zone trop grande: {size} pixels (maximum: {max})",
      capturingArea: "\u{1F4F8} Capture de la zone de protection...",
      areaCaptured: "\u2705 Zone captur\xE9e: {count} pixels sous protection",
      captureError: "\u274C Erreur lors de la capture de zone: {error}",
      captureFirst: "\u274C Capturez d'abord une zone de protection",
      protectionStarted: "\u{1F6E1}\uFE0F Protection d\xE9marr\xE9e - surveillance de la zone",
      protectionStopped: "\u23F9\uFE0F Protection arr\xEAt\xE9e",
      noChanges: "\u2705 Zone prot\xE9g\xE9e - aucun changement d\xE9tect\xE9",
      changesDetected: "\u{1F6A8} {count} changements d\xE9tect\xE9s dans la zone prot\xE9g\xE9e",
      repairing: "\u{1F6E0}\uFE0F R\xE9paration de {count} pixels alt\xE9r\xE9s...",
      repairedSuccess: "\u2705 {count} pixels r\xE9par\xE9s avec succ\xE8s",
      repairError: "\u274C Erreur lors de la r\xE9paration des pixels: {error}",
      noCharges: "\u26A0\uFE0F Charges insuffisantes pour r\xE9parer les changements",
      checkingChanges: "\u{1F50D} V\xE9rification des changements dans la zone prot\xE9g\xE9e...",
      errorChecking: "\u274C Erreur lors de la v\xE9rification des changements: {error}",
      guardActive: "\u{1F6E1}\uFE0F Gardien actif - zone sous protection",
      lastCheck: "Derni\xE8re v\xE9rification: {time}",
      nextCheck: "Prochaine v\xE9rification dans: {time}s",
      autoInitializing: "\u{1F916} Initialisation automatique...",
      autoInitSuccess: "\u2705 Guard-BOT d\xE9marr\xE9 automatiquement",
      autoInitFailed: "\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",
      manualInitRequired: "\u{1F527} Initialisation manuelle requise",
      paletteDetected: "\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",
      paletteNotFound: "\u{1F50D} Recherche de la palette de couleurs...",
      clickingPaintButton: "\u{1F446} Clic sur le bouton Paint...",
      paintButtonNotFound: "\u274C Bouton Paint introuvable",
      selectUpperLeft: "\u{1F3AF} Peignez un pixel au coin SUP\xC9RIEUR GAUCHE de la zone \xE0 prot\xE9ger",
      selectLowerRight: "\u{1F3AF} Maintenant peignez un pixel au coin INF\xC9RIEUR DROIT de la zone",
      waitingUpperLeft: "\u{1F446} En attente de la s\xE9lection du coin sup\xE9rieur gauche...",
      waitingLowerRight: "\u{1F446} En attente de la s\xE9lection du coin inf\xE9rieur droit...",
      upperLeftCaptured: "\u2705 Coin sup\xE9rieur gauche captur\xE9: ({x}, {y})",
      lowerRightCaptured: "\u2705 Coin inf\xE9rieur droit captur\xE9: ({x}, {y})",
      selectionTimeout: "\u274C D\xE9lai de s\xE9lection d\xE9pass\xE9",
      selectionError: "\u274C Erreur de s\xE9lection, veuillez r\xE9essayer",
      logWindow: "Logs",
      logWindowTitle: "Logs - {botName}",
      downloadLogs: "T\xE9l\xE9charger Logs",
      clearLogs: "Effacer Logs",
      closeLogs: "Fermer"
    }
  };

  // src/locales/ru.js
  var ru = {
    // Launcher
    launcher: {
      title: "WPlace AutoBOT",
      autoFarm: "\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",
      autoImage: "\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
      autoGuard: "\u{1F6E1}\uFE0F \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",
      selection: "\u0412\u044B\u0431\u0440\u0430\u043D\u043E",
      user: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
      charges: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
      backend: "\u0411\u044D\u043A\u0435\u043D\u0434",
      database: "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",
      uptime: "\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",
      close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
      launch: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
      loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
      executing: "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",
      downloading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",
      chooseBot: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
      readyToLaunch: "\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",
      loadError: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",
      loadErrorMsg: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",
      checking: "\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",
      online: "\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",
      offline: "\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",
      ok: "\u{1F7E2} \u041E\u041A",
      error: "\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",
      unknown: "-",
      logWindow: "Logs",
      logWindowTitle: "\u041B\u043E\u0433\u0438 - {botName}",
      downloadLogs: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",
      clearLogs: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",
      closeLogs: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
    },
    // Image Module
    image: {
      title: "WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
      initBot: "\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",
      uploadImage: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
      resizeImage: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
      selectPosition: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",
      startPainting: "\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",
      stopPainting: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",
      saveProgress: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      loadProgress: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      checkingColors: "\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",
      noColorsFound: "\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",
      colorsFound: "\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",
      loadingImage: "\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",
      imageLoaded: "\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",
      imageError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
      selectPositionAlert: "\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",
      waitingPosition: "\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",
      positionSet: "\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",
      positionTimeout: "\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",
      positionDetected: "\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",
      positionError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",
      startPaintingMsg: "\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",
      paintingProgress: "\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",
      noCharges: "\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",
      paintingStopped: "\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",
      paintingComplete: "\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",
      paintingError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",
      missingRequirements: "\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",
      progress: "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      userName: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
      pixels: "\u041F\u0438\u043A\u0441\u0435\u043B\u0438",
      charges: "\u0417\u0430\u0440\u044F\u0434\u044B",
      estimatedTime: "\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",
      initMessage: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",
      waitingInit: "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",
      resizeSuccess: "\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",
      paintingPaused: "\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",
      pixelsPerBatch: "\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",
      batchSize: "\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",
      nextBatchTime: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437",
      useAllCharges: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",
      showOverlay: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
      maxCharges: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",
      waitingForCharges: "\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",
      timeRemaining: "\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",
      cooldownWaiting: "\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",
      progressSaved: "\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",
      progressLoaded: "\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",
      progressLoadError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",
      progressSaveError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",
      confirmSaveProgress: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",
      saveProgressTitle: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      discardProgress: "\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      cancel: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
      minimize: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
      width: "\u0428\u0438\u0440\u0438\u043D\u0430",
      height: "\u0412\u044B\u0441\u043E\u0442\u0430",
      keepAspect: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",
      apply: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
      overlayOn: "\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u041A\u041B",
      overlayOff: "\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u042B\u041A\u041B",
      passCompleted: "\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",
      waitingChargesRegen: "\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",
      waitingChargesCountdown: "\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",
      autoInitializing: "\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",
      autoInitSuccess: "\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
      autoInitFailed: "\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
      paletteDetected: "\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",
      paletteNotFound: "\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",
      clickingPaintButton: "\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",
      paintButtonNotFound: "\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
      manualInitRequired: "\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",
      retryAttempt: "\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",
      retryError: "\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",
      retryFailed: "\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",
      networkError: "\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",
      serverError: "\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",
      timeoutError: "\u23F0 \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",
      // v2.0 - Защита и шаблоны
      protectionEnabled: "\u0417\u0430\u0449\u0438\u0442\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430",
      protectionDisabled: "\u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",
      paintPattern: "\u0428\u0430\u0431\u043B\u043E\u043D \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",
      patternLinearStart: "\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043D\u0430\u0447\u0430\u043B\u043E)",
      patternLinearEnd: "\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043A\u043E\u043D\u0435\u0446)",
      patternRandom: "\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",
      patternCenterOut: "\u0418\u0437 \u0446\u0435\u043D\u0442\u0440\u0430 \u043D\u0430\u0440\u0443\u0436\u0443",
      patternCornersFirst: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0433\u043B\u044B",
      patternSpiral: "\u0421\u043F\u0438\u0440\u0430\u043B\u044C",
      solid: "\u0421\u043F\u043B\u043E\u0448\u043D\u043E\u0439",
      stripes: "\u041F\u043E\u043B\u043E\u0441\u044B",
      checkerboard: "\u0428\u0430\u0445\u043C\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u043A\u0430",
      gradient: "\u0413\u0440\u0430\u0434\u0438\u0435\u043D\u0442",
      dots: "\u0422\u043E\u0447\u043A\u0438",
      waves: "\u0412\u043E\u043B\u043D\u044B",
      spiral: "\u0421\u043F\u0438\u0440\u0430\u043B\u044C",
      mosaic: "\u041C\u043E\u0437\u0430\u0438\u043A\u0430",
      bricks: "\u041A\u0438\u0440\u043F\u0438\u0447\u0438",
      zigzag: "\u0417\u0438\u0433\u0437\u0430\u0433",
      protectingDrawing: "\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0438\u0441\u0443\u043D\u043A\u0430...",
      changesDetected: "\u{1F6A8} \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {count}",
      repairing: "\u{1F527} \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",
      repairCompleted: "\u2705 \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",
      noChargesForRepair: "\u26A1 \u041A\u043E\u043C\u0438\u0441\u0441\u0438\u0439 \u0437\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435\u0442, \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435...",
      protectionPriority: "\u{1F6E1}\uFE0F \u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u044B \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D",
      patternApplied: "\u0428\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D",
      customPattern: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0448\u0430\u0431\u043B\u043E\u043D",
      logWindow: "Logs",
      logWindowTitle: "\u041B\u043E\u0433\u0438 - {botName}",
      downloadLogs: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",
      clearLogs: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",
      closeLogs: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
    },
    // Farm Module (to be implemented)
    farm: {
      title: "WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",
      start: "\u041D\u0430\u0447\u0430\u0442\u044C",
      stop: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
      stopped: "\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",
      calibrate: "\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",
      paintOnce: "\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",
      checkingStatus: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",
      configuration: "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",
      delay: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",
      pixelsPerBatch: "\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",
      minCharges: "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",
      colorMode: "\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",
      random: "\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",
      fixed: "\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",
      range: "\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      fixedColor: "\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",
      advanced: "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",
      tileX: "\u041F\u043B\u0438\u0442\u043A\u0430 X",
      tileY: "\u041F\u043B\u0438\u0442\u043A\u0430 Y",
      customPalette: "\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",
      paletteExample: "\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",
      capture: "\u0417\u0430\u0445\u0432\u0430\u0442",
      painted: "\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",
      charges: "\u0417\u0430\u0440\u044F\u0434\u044B",
      retries: "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",
      tile: "\u041F\u043B\u0438\u0442\u043A\u0430",
      configSaved: "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",
      configLoaded: "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",
      configReset: "\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",
      captureInstructions: "\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",
      backendOnline: "\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",
      backendOffline: "\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u0444\u043B\u0430\u0439\u043D",
      startingBot: "\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",
      stoppingBot: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",
      calibrating: "\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",
      alreadyRunning: "\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",
      imageRunningWarning: "\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",
      selectPosition: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
      selectPositionAlert: "\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",
      waitingPosition: "\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",
      positionSet: "\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",
      positionTimeout: "\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      missingPosition: "\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",
      farmRadius: "\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",
      positionInfo: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",
      farmingInRadius: "\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",
      selectEmptyArea: "\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",
      noPosition: "\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      currentZone: "\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",
      logWindow: "Logs",
      logWindowTitle: "\u041B\u043E\u0433\u0438 - {botName}",
      downloadLogs: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",
      clearLogs: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",
      closeLogs: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
    },
    // Common/Shared
    common: {
      yes: "\u0414\u0430",
      no: "\u041D\u0435\u0442",
      ok: "\u041E\u041A",
      cancel: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
      close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
      save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
      load: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",
      delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
      edit: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
      start: "\u041D\u0430\u0447\u0430\u0442\u044C",
      stop: "\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",
      pause: "\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
      resume: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
      reset: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",
      settings: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
      help: "\u041F\u043E\u043C\u043E\u0449\u044C",
      about: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
      language: "\u042F\u0437\u044B\u043A",
      loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",
      error: "\u041E\u0448\u0438\u0431\u043A\u0430",
      success: "\u0423\u0441\u043F\u0435\u0445",
      warning: "\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",
      info: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
      languageChanged: "\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"
    },
    // Guard Module
    guard: {
      title: "WPlace \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",
      initBot: "\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Guard-BOT",
      selectArea: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",
      captureArea: "\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",
      startProtection: "\u041D\u0430\u0447\u0430\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",
      stopProtection: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",
      upperLeft: "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u041B\u0435\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",
      lowerRight: "\u041D\u0438\u0436\u043D\u0438\u0439 \u041F\u0440\u0430\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",
      protectedPixels: "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",
      detectedChanges: "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0435 \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
      repairedPixels: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",
      charges: "\u0417\u0430\u0440\u044F\u0434\u044B",
      waitingInit: "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",
      checkingColors: "\u{1F3A8} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",
      noColorsFound: "\u274C \u0426\u0432\u0435\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435.",
      colorsFound: "\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",
      initSuccess: "\u2705 Guard-BOT \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D",
      initError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 Guard-BOT",
      invalidCoords: "\u274C \u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B",
      invalidArea: "\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430",
      areaTooLarge: "\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F: {size} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 (\u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C: {max})",
      capturingArea: "\u{1F4F8} \u0417\u0430\u0445\u0432\u0430\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0437\u0430\u0449\u0438\u0442\u044B...",
      areaCaptured: "\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D\u0430: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",
      captureError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438: {error}",
      captureFirst: "\u274C \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u044B",
      protectionStarted: "\u{1F6E1}\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430 - \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      protectionStopped: "\u23F9\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",
      noChanges: "\u2705 \u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C - \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E",
      changesDetected: "\u{1F6A8} {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      repairing: "\u{1F6E0}\uFE0F \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",
      repairedSuccess: "\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",
      repairError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439: {error}",
      noCharges: "\u26A0\uFE0F \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439",
      checkingChanges: "\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438...",
      errorChecking: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {error}",
      guardActive: "\u{1F6E1}\uFE0F \u0421\u0442\u0440\u0430\u0436 \u0430\u043A\u0442\u0438\u0432\u0435\u043D - \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",
      lastCheck: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: {time}",
      nextCheck: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u0440\u0435\u0437: {time}\u0441",
      autoInitializing: "\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",
      autoInitSuccess: "\u2705 Guard-BOT \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
      autoInitFailed: "\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
      manualInitRequired: "\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",
      paletteDetected: "\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",
      paletteNotFound: "\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",
      clickingPaintButton: "\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",
      paintButtonNotFound: "\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
      selectUpperLeft: "\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0412\u0415\u0420\u0425\u041D\u0415\u041C \u041B\u0415\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B",
      selectLowerRight: "\u{1F3AF} \u0422\u0435\u043F\u0435\u0440\u044C \u043D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041D\u0418\u0416\u041D\u0415\u041C \u041F\u0420\u0410\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      waitingUpperLeft: "\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u043B\u0435\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",
      waitingLowerRight: "\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",
      upperLeftCaptured: "\u2705 \u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",
      lowerRightCaptured: "\u2705 \u041D\u0438\u0436\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",
      selectionTimeout: "\u274C \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430",
      selectionError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430",
      logWindow: "Logs",
      logWindowTitle: "\u041B\u043E\u0433\u0438 - {botName}",
      downloadLogs: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",
      clearLogs: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",
      closeLogs: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
    }
  };

  // src/locales/zh-Hans.js
  var zhHans = {
    // 启动器
    launcher: {
      title: "WPlace \u81EA\u52A8\u673A\u5668\u4EBA",
      autoFarm: "\u{1F33E} \u81EA\u52A8\u519C\u573A",
      autoImage: "\u{1F3A8} \u81EA\u52A8\u7ED8\u56FE",
      autoGuard: "\u{1F6E1}\uFE0F \u81EA\u52A8\u5B88\u62A4",
      selection: "\u9009\u62E9",
      user: "\u7528\u6237",
      charges: "\u6B21\u6570",
      backend: "\u540E\u7AEF",
      database: "\u6570\u636E\u5E93",
      uptime: "\u8FD0\u884C\u65F6\u95F4",
      close: "\u5173\u95ED",
      launch: "\u542F\u52A8",
      loading: "\u52A0\u8F7D\u4E2D\u2026",
      executing: "\u6267\u884C\u4E2D\u2026",
      downloading: "\u6B63\u5728\u4E0B\u8F7D\u811A\u672C\u2026",
      chooseBot: "\u9009\u62E9\u4E00\u4E2A\u673A\u5668\u4EBA\u5E76\u70B9\u51FB\u542F\u52A8",
      readyToLaunch: "\u51C6\u5907\u542F\u52A8",
      loadError: "\u52A0\u8F7D\u9519\u8BEF",
      loadErrorMsg: "\u65E0\u6CD5\u52A0\u8F7D\u6240\u9009\u673A\u5668\u4EBA\u3002\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6216\u91CD\u8BD5\u3002",
      checking: "\u{1F504} \u68C0\u67E5\u4E2D...",
      online: "\u{1F7E2} \u5728\u7EBF",
      offline: "\u{1F534} \u79BB\u7EBF",
      ok: "\u{1F7E2} \u6B63\u5E38",
      error: "\u{1F534} \u9519\u8BEF",
      unknown: "-",
      logWindow: "\u{1F4CB} Logs",
      logWindowTitle: "\u65E5\u5FD7\u7A97\u53E3",
      downloadLogs: "\u4E0B\u8F7D\u65E5\u5FD7",
      clearLogs: "\u6E05\u9664\u65E5\u5FD7",
      closeLogs: "\u5173\u95ED"
    },
    // 绘图模块
    image: {
      title: "WPlace \u81EA\u52A8\u7ED8\u56FE",
      initBot: "\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA",
      uploadImage: "\u4E0A\u4F20\u56FE\u7247",
      resizeImage: "\u8C03\u6574\u56FE\u7247\u5927\u5C0F",
      selectPosition: "\u9009\u62E9\u4F4D\u7F6E",
      startPainting: "\u5F00\u59CB\u7ED8\u5236",
      stopPainting: "\u505C\u6B62\u7ED8\u5236",
      saveProgress: "\u4FDD\u5B58\u8FDB\u5EA6",
      loadProgress: "\u52A0\u8F7D\u8FDB\u5EA6",
      checkingColors: "\u{1F50D} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",
      noColorsFound: "\u274C \u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u540E\u91CD\u8BD5\uFF01",
      colorsFound: "\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",
      loadingImage: "\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F7D\u56FE\u7247...",
      imageLoaded: "\u2705 \u56FE\u7247\u5DF2\u52A0\u8F7D\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u4E2A",
      imageError: "\u274C \u56FE\u7247\u52A0\u8F7D\u5931\u8D25",
      selectPositionAlert: "\u8BF7\u5728\u4F60\u60F3\u5F00\u59CB\u7ED8\u5236\u7684\u5730\u65B9\u6D82\u7B2C\u4E00\u4E2A\u50CF\u7D20\uFF01",
      waitingPosition: "\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",
      positionSet: "\u2705 \u4F4D\u7F6E\u8BBE\u7F6E\u6210\u529F\uFF01",
      positionTimeout: "\u274C \u4F4D\u7F6E\u9009\u62E9\u8D85\u65F6",
      positionDetected: "\u{1F3AF} \u5DF2\u68C0\u6D4B\u5230\u4F4D\u7F6E\uFF0C\u5904\u7406\u4E2D...",
      positionError: "\u274C \u4F4D\u7F6E\u68C0\u6D4B\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
      startPaintingMsg: "\u{1F3A8} \u5F00\u59CB\u7ED8\u5236...",
      paintingProgress: "\u{1F9F1} \u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20...",
      noCharges: "\u231B \u6CA1\u6709\u6B21\u6570\u3002\u7B49\u5F85 {time}...",
      paintingStopped: "\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7ED8\u5236",
      paintingComplete: "\u2705 \u7ED8\u5236\u5B8C\u6210\uFF01\u5171\u7ED8\u5236 {count} \u4E2A\u50CF\u7D20\u3002",
      paintingError: "\u274C \u7ED8\u5236\u8FC7\u7A0B\u4E2D\u51FA\u9519",
      missingRequirements: "\u274C \u8BF7\u5148\u52A0\u8F7D\u56FE\u7247\u5E76\u9009\u62E9\u4F4D\u7F6E",
      progress: "\u8FDB\u5EA6",
      userName: "\u7528\u6237",
      pixels: "\u50CF\u7D20",
      charges: "\u6B21\u6570",
      estimatedTime: "\u9884\u8BA1\u65F6\u95F4",
      initMessage: "\u70B9\u51FB\u201C\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA\u201D\u5F00\u59CB",
      waitingInit: "\u7B49\u5F85\u521D\u59CB\u5316...",
      resizeSuccess: "\u2705 \u56FE\u7247\u5DF2\u8C03\u6574\u4E3A {width}x{height}",
      paintingPaused: "\u23F8\uFE0F \u7ED8\u5236\u6682\u505C\u4E8E\u4F4D\u7F6E X: {x}, Y: {y}",
      pixelsPerBatch: "\u6BCF\u6279\u50CF\u7D20\u6570",
      batchSize: "\u6279\u6B21\u5927\u5C0F",
      nextBatchTime: "\u4E0B\u6B21\u6279\u6B21\u65F6\u95F4",
      useAllCharges: "\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6570",
      showOverlay: "\u663E\u793A\u8986\u76D6\u5C42",
      maxCharges: "\u6BCF\u6279\u6700\u5927\u6B21\u6570",
      waitingForCharges: "\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed}",
      timeRemaining: "\u5269\u4F59\u65F6\u95F4",
      cooldownWaiting: "\u23F3 \u7B49\u5F85 {time} \u540E\u7EE7\u7EED...",
      progressSaved: "\u2705 \u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u4E3A {filename}",
      progressLoaded: "\u2705 \u5DF2\u52A0\u8F7D\u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7ED8\u5236",
      progressLoadError: "\u274C \u52A0\u8F7D\u8FDB\u5EA6\u5931\u8D25: {error}",
      progressSaveError: "\u274C \u4FDD\u5B58\u8FDB\u5EA6\u5931\u8D25: {error}",
      confirmSaveProgress: "\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u5F53\u524D\u8FDB\u5EA6\u5417\uFF1F",
      saveProgressTitle: "\u4FDD\u5B58\u8FDB\u5EA6",
      discardProgress: "\u653E\u5F03",
      cancel: "\u53D6\u6D88",
      minimize: "\u6700\u5C0F\u5316",
      width: "\u5BBD\u5EA6",
      height: "\u9AD8\u5EA6",
      keepAspect: "\u4FDD\u6301\u7EB5\u6A2A\u6BD4",
      apply: "\u5E94\u7528",
      overlayOn: "\u8986\u76D6\u5C42: \u5F00\u542F",
      overlayOff: "\u8986\u76D6\u5C42: \u5173\u95ED",
      passCompleted: "\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7ED8\u5236 {painted} \u50CF\u7D20 | \u8FDB\u5EA6: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 \u7B49\u5F85\u6B21\u6570\u6062\u590D: {current}/{needed} - \u65F6\u95F4: {time}",
      waitingChargesCountdown: "\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed} - \u5269\u4F59: {time}",
      autoInitializing: "\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",
      autoInitSuccess: "\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",
      autoInitFailed: "\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",
      paletteDetected: "\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",
      paletteNotFound: "\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",
      clickingPaintButton: "\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",
      paintButtonNotFound: "\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",
      manualInitRequired: "\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",
      retryAttempt: "\u{1F504} \u91CD\u8BD5 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",
      retryError: "\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5C1D\u8BD5\u51FA\u9519\uFF0C\u5C06\u5728 {delay} \u79D2\u540E\u91CD\u8BD5...",
      retryFailed: "\u274C \u8D85\u8FC7 {maxAttempts} \u6B21\u5C1D\u8BD5\u5931\u8D25\u3002\u7EE7\u7EED\u4E0B\u4E00\u6279...",
      networkError: "\u{1F310} \u7F51\u7EDC\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",
      serverError: "\u{1F525} \u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",
      timeoutError: "\u23F0 \u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u6B63\u5728\u91CD\u8BD5...",
      // v2.0 - 保护与绘制模式
      protectionEnabled: "\u5DF2\u5F00\u542F\u4FDD\u62A4",
      protectionDisabled: "\u5DF2\u5173\u95ED\u4FDD\u62A4",
      paintPattern: "\u7ED8\u5236\u6A21\u5F0F",
      patternLinearStart: "\u7EBF\u6027\uFF08\u8D77\u70B9\uFF09",
      patternLinearEnd: "\u7EBF\u6027\uFF08\u7EC8\u70B9\uFF09",
      patternRandom: "\u968F\u673A",
      patternCenterOut: "\u4ECE\u4E2D\u5FC3\u5411\u5916",
      patternCornersFirst: "\u5148\u89D2\u843D",
      patternSpiral: "\u87BA\u65CB",
      solid: "\u5B9E\u5FC3",
      stripes: "\u6761\u7EB9",
      checkerboard: "\u68CB\u76D8\u683C",
      gradient: "\u6E10\u53D8",
      dots: "\u70B9\u72B6",
      waves: "\u6CE2\u6D6A",
      spiral: "\u87BA\u65CB",
      mosaic: "\u9A6C\u8D5B\u514B",
      bricks: "\u7816\u5757",
      zigzag: "\u4E4B\u5B57\u5F62",
      protectingDrawing: "\u6B63\u5728\u4FDD\u62A4\u56FE\u7A3F...",
      changesDetected: "\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u5904\u66F4\u6539",
      repairing: "\u{1F527} \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u66F4\u6539\u7684\u50CF\u7D20...",
      repairCompleted: "\u2705 \u4FEE\u590D\u5B8C\u6210\uFF1A{count} \u4E2A\u50CF\u7D20",
      noChargesForRepair: "\u26A1 \u4FEE\u590D\u4E0D\u6D88\u8017\u70B9\u6570\uFF0C\u7B49\u5F85\u4E2D...",
      protectionPriority: "\u{1F6E1}\uFE0F \u5DF2\u542F\u7528\u4FDD\u62A4\u4F18\u5148",
      patternApplied: "\u5DF2\u5E94\u7528\u6A21\u5F0F",
      customPattern: "\u81EA\u5B9A\u4E49\u6A21\u5F0F",
      logWindow: "\u{1F4CB} Logs",
      logWindowTitle: "\u65E5\u5FD7\u7A97\u53E3",
      downloadLogs: "\u4E0B\u8F7D\u65E5\u5FD7",
      clearLogs: "\u6E05\u9664\u65E5\u5FD7",
      closeLogs: "\u5173\u95ED"
    },
    // 农场模块（待实现）
    farm: {
      title: "WPlace \u519C\u573A\u673A\u5668\u4EBA",
      start: "\u5F00\u59CB",
      stop: "\u505C\u6B62",
      stopped: "\u673A\u5668\u4EBA\u5DF2\u505C\u6B62",
      calibrate: "\u6821\u51C6",
      paintOnce: "\u4E00\u6B21",
      checkingStatus: "\u68C0\u67E5\u72B6\u6001\u4E2D...",
      configuration: "\u914D\u7F6E",
      delay: "\u5EF6\u8FDF (\u6BEB\u79D2)",
      pixelsPerBatch: "\u6BCF\u6279\u50CF\u7D20",
      minCharges: "\u6700\u5C11\u6B21\u6570",
      colorMode: "\u989C\u8272\u6A21\u5F0F",
      random: "\u968F\u673A",
      fixed: "\u56FA\u5B9A",
      range: "\u8303\u56F4",
      fixedColor: "\u56FA\u5B9A\u989C\u8272",
      advanced: "\u9AD8\u7EA7",
      tileX: "\u74E6\u7247 X",
      tileY: "\u74E6\u7247 Y",
      customPalette: "\u81EA\u5B9A\u4E49\u8C03\u8272\u677F",
      paletteExample: "\u4F8B\u5982: #FF0000,#00FF00,#0000FF",
      capture: "\u6355\u83B7",
      painted: "\u5DF2\u7ED8\u5236",
      charges: "\u6B21\u6570",
      retries: "\u91CD\u8BD5",
      tile: "\u74E6\u7247",
      configSaved: "\u914D\u7F6E\u5DF2\u4FDD\u5B58",
      configLoaded: "\u914D\u7F6E\u5DF2\u52A0\u8F7D",
      configReset: "\u914D\u7F6E\u5DF2\u91CD\u7F6E",
      captureInstructions: "\u8BF7\u624B\u52A8\u7ED8\u5236\u4E00\u4E2A\u50CF\u7D20\u4EE5\u6355\u83B7\u5750\u6807...",
      backendOnline: "\u540E\u7AEF\u5728\u7EBF",
      backendOffline: "\u540E\u7AEF\u79BB\u7EBF",
      startingBot: "\u6B63\u5728\u542F\u52A8\u673A\u5668\u4EBA...",
      stoppingBot: "\u6B63\u5728\u505C\u6B62\u673A\u5668\u4EBA...",
      calibrating: "\u6821\u51C6\u4E2D...",
      alreadyRunning: "\u81EA\u52A8\u519C\u573A\u5DF2\u5728\u8FD0\u884C\u3002",
      imageRunningWarning: "\u81EA\u52A8\u7ED8\u56FE\u6B63\u5728\u8FD0\u884C\uFF0C\u8BF7\u5148\u5173\u95ED\u518D\u542F\u52A8\u81EA\u52A8\u519C\u573A\u3002",
      selectPosition: "\u9009\u62E9\u533A\u57DF",
      selectPositionAlert: "\u{1F3AF} \u5728\u5730\u56FE\u7684\u7A7A\u767D\u533A\u57DF\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",
      waitingPosition: "\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",
      positionSet: "\u2705 \u533A\u57DF\u8BBE\u7F6E\u6210\u529F\uFF01\u534A\u5F84: 500px",
      positionTimeout: "\u274C \u533A\u57DF\u9009\u62E9\u8D85\u65F6",
      missingPosition: "\u274C \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF08\u4F7F\u7528\u201C\u9009\u62E9\u533A\u57DF\u201D\u6309\u94AE\uFF09",
      farmRadius: "\u519C\u573A\u534A\u5F84",
      positionInfo: "\u5F53\u524D\u533A\u57DF",
      farmingInRadius: "\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F84 {radius}px \u5728 ({x},{y}) \u519C\u573A",
      selectEmptyArea: "\u26A0\uFE0F \u91CD\u8981: \u8BF7\u9009\u62E9\u7A7A\u767D\u533A\u57DF\u4EE5\u907F\u514D\u51B2\u7A81",
      noPosition: "\u672A\u9009\u62E9\u533A\u57DF",
      currentZone: "\u533A\u57DF: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF0C\u5728\u5730\u56FE\u4E0A\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",
      logWindow: "\u{1F4CB} Logs",
      logWindowTitle: "\u65E5\u5FD7\u7A97\u53E3",
      downloadLogs: "\u4E0B\u8F7D\u65E5\u5FD7",
      clearLogs: "\u6E05\u9664\u65E5\u5FD7",
      closeLogs: "\u5173\u95ED"
    },
    // 公共
    common: {
      yes: "\u662F",
      no: "\u5426",
      ok: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88",
      close: "\u5173\u95ED",
      save: "\u4FDD\u5B58",
      load: "\u52A0\u8F7D",
      delete: "\u5220\u9664",
      edit: "\u7F16\u8F91",
      start: "\u5F00\u59CB",
      stop: "\u505C\u6B62",
      pause: "\u6682\u505C",
      resume: "\u7EE7\u7EED",
      reset: "\u91CD\u7F6E",
      settings: "\u8BBE\u7F6E",
      help: "\u5E2E\u52A9",
      about: "\u5173\u4E8E",
      language: "\u8BED\u8A00",
      loading: "\u52A0\u8F7D\u4E2D...",
      error: "\u9519\u8BEF",
      success: "\u6210\u529F",
      warning: "\u8B66\u544A",
      info: "\u4FE1\u606F",
      languageChanged: "\u8BED\u8A00\u5DF2\u5207\u6362\u4E3A {language}"
    },
    // 守护模块
    guard: {
      title: "WPlace \u81EA\u52A8\u5B88\u62A4",
      initBot: "\u521D\u59CB\u5316\u5B88\u62A4\u673A\u5668\u4EBA",
      selectArea: "\u9009\u62E9\u533A\u57DF",
      captureArea: "\u6355\u83B7\u533A\u57DF",
      startProtection: "\u5F00\u59CB\u5B88\u62A4",
      stopProtection: "\u505C\u6B62\u5B88\u62A4",
      upperLeft: "\u5DE6\u4E0A\u89D2",
      lowerRight: "\u53F3\u4E0B\u89D2",
      protectedPixels: "\u53D7\u4FDD\u62A4\u50CF\u7D20",
      detectedChanges: "\u68C0\u6D4B\u5230\u7684\u53D8\u5316",
      repairedPixels: "\u4FEE\u590D\u7684\u50CF\u7D20",
      charges: "\u6B21\u6570",
      waitingInit: "\u7B49\u5F85\u521D\u59CB\u5316...",
      checkingColors: "\u{1F3A8} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",
      noColorsFound: "\u274C \u672A\u627E\u5230\u989C\u8272\uFF0C\u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u3002",
      colorsFound: "\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",
      initSuccess: "\u2705 \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",
      initError: "\u274C \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u5931\u8D25",
      invalidCoords: "\u274C \u5750\u6807\u65E0\u6548",
      invalidArea: "\u274C \u533A\u57DF\u65E0\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u987B\u5C0F\u4E8E\u53F3\u4E0B\u89D2",
      areaTooLarge: "\u274C \u533A\u57DF\u8FC7\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",
      capturingArea: "\u{1F4F8} \u6355\u83B7\u5B88\u62A4\u533A\u57DF\u4E2D...",
      areaCaptured: "\u2705 \u533A\u57DF\u6355\u83B7\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u62A4",
      captureError: "\u274C \u6355\u83B7\u533A\u57DF\u51FA\u9519: {error}",
      captureFirst: "\u274C \u8BF7\u5148\u6355\u83B7\u4E00\u4E2A\u5B88\u62A4\u533A\u57DF",
      protectionStarted: "\u{1F6E1}\uFE0F \u5B88\u62A4\u5DF2\u542F\u52A8 - \u533A\u57DF\u76D1\u63A7\u4E2D",
      protectionStopped: "\u23F9\uFE0F \u5B88\u62A4\u5DF2\u505C\u6B62",
      noChanges: "\u2705 \u533A\u57DF\u5B89\u5168 - \u672A\u68C0\u6D4B\u5230\u53D8\u5316",
      changesDetected: "\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u4E2A\u53D8\u5316",
      repairing: "\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u50CF\u7D20...",
      repairedSuccess: "\u2705 \u5DF2\u6210\u529F\u4FEE\u590D {count} \u4E2A\u50CF\u7D20",
      repairError: "\u274C \u4FEE\u590D\u51FA\u9519: {error}",
      noCharges: "\u26A0\uFE0F \u6B21\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4FEE\u590D",
      checkingChanges: "\u{1F50D} \u6B63\u5728\u68C0\u67E5\u533A\u57DF\u53D8\u5316...",
      errorChecking: "\u274C \u68C0\u67E5\u51FA\u9519: {error}",
      guardActive: "\u{1F6E1}\uFE0F \u5B88\u62A4\u4E2D - \u533A\u57DF\u53D7\u4FDD\u62A4",
      lastCheck: "\u4E0A\u6B21\u68C0\u67E5: {time}",
      nextCheck: "\u4E0B\u6B21\u68C0\u67E5: {time} \u79D2\u540E",
      autoInitializing: "\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",
      autoInitSuccess: "\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",
      autoInitFailed: "\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",
      manualInitRequired: "\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",
      paletteDetected: "\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",
      paletteNotFound: "\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",
      clickingPaintButton: "\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",
      paintButtonNotFound: "\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",
      selectUpperLeft: "\u{1F3AF} \u5728\u9700\u8981\u4FDD\u62A4\u533A\u57DF\u7684\u5DE6\u4E0A\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",
      selectLowerRight: "\u{1F3AF} \u73B0\u5728\u5728\u53F3\u4E0B\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",
      waitingUpperLeft: "\u{1F446} \u7B49\u5F85\u9009\u62E9\u5DE6\u4E0A\u89D2...",
      waitingLowerRight: "\u{1F446} \u7B49\u5F85\u9009\u62E9\u53F3\u4E0B\u89D2...",
      upperLeftCaptured: "\u2705 \u5DF2\u6355\u83B7\u5DE6\u4E0A\u89D2: ({x}, {y})",
      lowerRightCaptured: "\u2705 \u5DF2\u6355\u83B7\u53F3\u4E0B\u89D2: ({x}, {y})",
      selectionTimeout: "\u274C \u9009\u62E9\u8D85\u65F6",
      selectionError: "\u274C \u9009\u62E9\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5",
      logWindow: "\u{1F4CB} Logs",
      logWindowTitle: "\u65E5\u5FD7\u7A97\u53E3",
      downloadLogs: "\u4E0B\u8F7D\u65E5\u5FD7",
      clearLogs: "\u6E05\u9664\u65E5\u5FD7",
      closeLogs: "\u5173\u95ED"
    }
  };

  // src/locales/zh-Hant.js
  var zhHant = {
    // 啓動器
    launcher: {
      title: "WPlace \u81EA\u52D5\u6A5F\u5668\u4EBA",
      autoFarm: "\u{1F33E} \u81EA\u52D5\u8FB2\u5834",
      autoImage: "\u{1F3A8} \u81EA\u52D5\u7E6A\u5716",
      autoGuard: "\u{1F6E1}\uFE0F \u81EA\u52D5\u5B88\u8B77",
      selection: "\u9078\u64C7",
      user: "\u7528\u6237",
      charges: "\u6B21\u6578",
      backend: "\u5F8C\u7AEF",
      database: "\u6578\u64DA\u5EAB",
      uptime: "\u904B\u884C\u6642\u9593",
      close: "\u95DC\u9589",
      launch: "\u5553\u52D5",
      loading: "\u52A0\u8F09\u4E2D\u2026",
      executing: "\u57F7\u884C\u4E2D\u2026",
      downloading: "\u6B63\u5728\u4E0B\u8F09\u8173\u672C\u2026",
      chooseBot: "\u9078\u64C7\u4E00\u500B\u6A5F\u5668\u4EBA\u4E26\u9EDE\u64CA\u5553\u52D5",
      readyToLaunch: "\u6E96\u5099\u5553\u52D5",
      loadError: "\u52A0\u8F09\u932F\u8AA4",
      loadErrorMsg: "\u7121\u6CD5\u52A0\u8F09\u6240\u9078\u6A5F\u5668\u4EBA\u3002\u8ACB\u6AA2\u67E5\u7DB2\u7D61\u9023\u63A5\u6216\u91CD\u8A66\u3002",
      checking: "\u{1F504} \u6AA2\u67E5\u4E2D...",
      online: "\u{1F7E2} \u5728\u7DDA",
      offline: "\u{1F534} \u96E2\u7DDA",
      ok: "\u{1F7E2} \u6B63\u5E38",
      error: "\u{1F534} \u932F\u8AA4",
      unknown: "-",
      logWindow: "\u{1F4CB} Logs",
      logWindowTitle: "\u65E5\u8A8C\u8996\u7A97",
      downloadLogs: "\u4E0B\u8F09\u65E5\u8A8C",
      clearLogs: "\u6E05\u9664\u65E5\u8A8C",
      closeLogs: "\u95DC\u9589"
    },
    // 繪圖模塊
    image: {
      title: "WPlace \u81EA\u52D5\u7E6A\u5716",
      initBot: "\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA",
      uploadImage: "\u4E0A\u50B3\u5716\u7247",
      resizeImage: "\u8ABF\u6574\u5716\u7247\u5927\u5C0F",
      selectPosition: "\u9078\u64C7\u4F4D\u7F6E",
      startPainting: "\u958B\u59CB\u7E6A\u88FD",
      stopPainting: "\u505C\u6B62\u7E6A\u88FD",
      saveProgress: "\u4FDD\u5B58\u9032\u5EA6",
      loadProgress: "\u52A0\u8F09\u9032\u5EA6",
      checkingColors: "\u{1F50D} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",
      noColorsFound: "\u274C \u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u5F8C\u91CD\u8A66\uFF01",
      colorsFound: "\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",
      loadingImage: "\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F09\u5716\u7247...",
      imageLoaded: "\u2705 \u5716\u7247\u5DF2\u52A0\u8F09\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u500B",
      imageError: "\u274C \u5716\u7247\u52A0\u8F09\u5931\u6557",
      selectPositionAlert: "\u8ACB\u5728\u4F60\u60F3\u958B\u59CB\u7E6A\u88FD\u7684\u5730\u65B9\u5857\u7B2C\u4E00\u500B\u50CF\u7D20\uFF01",
      waitingPosition: "\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",
      positionSet: "\u2705 \u4F4D\u7F6E\u8A2D\u7F6E\u6210\u529F\uFF01",
      positionTimeout: "\u274C \u4F4D\u7F6E\u9078\u64C7\u8D85\u6642",
      positionDetected: "\u{1F3AF} \u5DF2\u6AA2\u6E2C\u5230\u4F4D\u7F6E\uFF0C\u8655\u7406\u4E2D...",
      positionError: "\u274C \u4F4D\u7F6E\u6AA2\u6E2C\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66",
      startPaintingMsg: "\u{1F3A8} \u958B\u59CB\u7E6A\u88FD...",
      paintingProgress: "\u{1F9F1} \u9032\u5EA6: {painted}/{total} \u50CF\u7D20...",
      noCharges: "\u231B \u6C92\u6709\u6B21\u6578\u3002\u7B49\u5F85 {time}...",
      paintingStopped: "\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7E6A\u88FD",
      paintingComplete: "\u2705 \u7E6A\u88FD\u5B8C\u6210\uFF01\u5171\u7E6A\u88FD {count} \u500B\u50CF\u7D20\u3002",
      paintingError: "\u274C \u7E6A\u88FD\u904E\u7A0B\u4E2D\u51FA\u932F",
      missingRequirements: "\u274C \u8ACB\u5148\u52A0\u8F09\u5716\u7247\u4E26\u9078\u64C7\u4F4D\u7F6E",
      progress: "\u9032\u5EA6",
      userName: "\u7528\u6237",
      pixels: "\u50CF\u7D20",
      charges: "\u6B21\u6578",
      estimatedTime: "\u9810\u8A08\u6642\u9593",
      initMessage: "\u9EDE\u64CA\u201C\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA\u201D\u958B\u59CB",
      waitingInit: "\u7B49\u5F85\u521D\u59CB\u5316...",
      resizeSuccess: "\u2705 \u5716\u7247\u5DF2\u8ABF\u6574\u70BA {width}x{height}",
      paintingPaused: "\u23F8\uFE0F \u7E6A\u88FD\u66AB\u505C\u65BC\u4F4D\u7F6E X: {x}, Y: {y}",
      pixelsPerBatch: "\u6BCF\u6279\u50CF\u7D20\u6578",
      batchSize: "\u6279\u6B21\u5927\u5C0F",
      nextBatchTime: "\u4E0B\u6B21\u6279\u6B21\u6642\u9593",
      useAllCharges: "\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6578",
      showOverlay: "\u986F\u793A\u8986\u84CB\u5C64",
      maxCharges: "\u6BCF\u6279\u6700\u5927\u6B21\u6578",
      waitingForCharges: "\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed}",
      timeRemaining: "\u5269\u9918\u6642\u9593",
      cooldownWaiting: "\u23F3 \u7B49\u5F85 {time} \u5F8C\u7E7C\u7E8C...",
      progressSaved: "\u2705 \u9032\u5EA6\u5DF2\u4FDD\u5B58\u70BA {filename}",
      progressLoaded: "\u2705 \u5DF2\u52A0\u8F09\u9032\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7E6A\u88FD",
      progressLoadError: "\u274C \u52A0\u8F09\u9032\u5EA6\u5931\u6557: {error}",
      progressSaveError: "\u274C \u4FDD\u5B58\u9032\u5EA6\u5931\u6557: {error}",
      confirmSaveProgress: "\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u7576\u524D\u9032\u5EA6\u55CE\uFF1F",
      saveProgressTitle: "\u4FDD\u5B58\u9032\u5EA6",
      discardProgress: "\u653E\u68C4",
      cancel: "\u53D6\u6D88",
      minimize: "\u6700\u5C0F\u5316",
      width: "\u5BEC\u5EA6",
      height: "\u9AD8\u5EA6",
      keepAspect: "\u4FDD\u6301\u7E31\u6A6B\u6BD4",
      apply: "\u61C9\u7528",
      overlayOn: "\u8986\u84CB\u5C64: \u958B\u5553",
      overlayOff: "\u8986\u84CB\u5C64: \u95DC\u9589",
      passCompleted: "\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7E6A\u88FD {painted} \u50CF\u7D20 | \u9032\u5EA6: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 \u7B49\u5F85\u6B21\u6578\u6062\u5FA9: {current}/{needed} - \u6642\u9593: {time}",
      waitingChargesCountdown: "\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed} - \u5269\u9918: {time}",
      autoInitializing: "\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",
      autoInitSuccess: "\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",
      autoInitFailed: "\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",
      paletteDetected: "\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",
      paletteNotFound: "\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",
      clickingPaintButton: "\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",
      paintButtonNotFound: "\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",
      manualInitRequired: "\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",
      retryAttempt: "\u{1F504} \u91CD\u8A66 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",
      retryError: "\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5617\u8A66\u51FA\u932F\uFF0C\u5C07\u5728 {delay} \u79D2\u5F8C\u91CD\u8A66...",
      retryFailed: "\u274C \u8D85\u904E {maxAttempts} \u6B21\u5617\u8A66\u5931\u6557\u3002\u7E7C\u7E8C\u4E0B\u4E00\u6279...",
      networkError: "\u{1F310} \u7DB2\u7D61\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",
      serverError: "\u{1F525} \u670D\u52D9\u5668\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",
      timeoutError: "\u23F0 \u4F3A\u670D\u5668\u903E\u6642\uFF0C\u6B63\u5728\u91CD\u8A66...",
      // v2.0 - 保護與繪製模式
      protectionEnabled: "\u5DF2\u555F\u7528\u4FDD\u8B77",
      protectionDisabled: "\u5DF2\u505C\u7528\u4FDD\u8B77",
      paintPattern: "\u7E6A\u88FD\u6A21\u5F0F",
      patternLinearStart: "\u7DDA\u6027\uFF08\u8D77\u9EDE\uFF09",
      patternLinearEnd: "\u7DDA\u6027\uFF08\u7D42\u9EDE\uFF09",
      patternRandom: "\u96A8\u6A5F",
      patternCenterOut: "\u7531\u4E2D\u5FC3\u5411\u5916",
      patternCornersFirst: "\u5148\u89D2\u843D",
      patternSpiral: "\u87BA\u65CB",
      solid: "\u5BE6\u5FC3",
      stripes: "\u689D\u7D0B",
      checkerboard: "\u68CB\u76E4\u683C",
      gradient: "\u6F38\u5C64",
      dots: "\u9EDE\u72C0",
      waves: "\u6CE2\u6D6A",
      spiral: "\u87BA\u65CB",
      mosaic: "\u99AC\u8CFD\u514B",
      bricks: "\u78DA\u584A",
      zigzag: "\u4E4B\u5B57\u5F62",
      protectingDrawing: "\u6B63\u5728\u4FDD\u8B77\u7E6A\u5716...",
      changesDetected: "\u{1F6A8} \u5075\u6E2C\u5230 {count} \u8655\u8B8A\u66F4",
      repairing: "\u{1F527} \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u8B8A\u66F4\u7684\u50CF\u7D20...",
      repairCompleted: "\u2705 \u4FEE\u5FA9\u5B8C\u6210\uFF1A{count} \u500B\u50CF\u7D20",
      noChargesForRepair: "\u26A1 \u4FEE\u5FA9\u4E0D\u6D88\u8017\u9EDE\u6578\uFF0C\u7B49\u5F85\u4E2D...",
      protectionPriority: "\u{1F6E1}\uFE0F \u5DF2\u555F\u7528\u4FDD\u8B77\u512A\u5148",
      patternApplied: "\u5DF2\u5957\u7528\u6A21\u5F0F",
      customPattern: "\u81EA\u8A02\u6A21\u5F0F",
      logWindow: "\u{1F4CB} Logs",
      logWindowTitle: "\u65E5\u8A8C\u8996\u7A97",
      downloadLogs: "\u4E0B\u8F09\u65E5\u8A8C",
      clearLogs: "\u6E05\u9664\u65E5\u8A8C",
      closeLogs: "\u95DC\u9589"
    },
    // 農場模塊（待實現）
    farm: {
      title: "WPlace \u8FB2\u5834\u6A5F\u5668\u4EBA",
      start: "\u958B\u59CB",
      stop: "\u505C\u6B62",
      stopped: "\u6A5F\u5668\u4EBA\u5DF2\u505C\u6B62",
      calibrate: "\u6821\u6E96",
      paintOnce: "\u4E00\u6B21",
      checkingStatus: "\u6AA2\u67E5\u72C0\u614B\u4E2D...",
      configuration: "\u914D\u7F6E",
      delay: "\u5EF6\u9072 (\u6BEB\u79D2)",
      pixelsPerBatch: "\u6BCF\u6279\u50CF\u7D20",
      minCharges: "\u6700\u5C11\u6B21\u6578",
      colorMode: "\u984F\u8272\u6A21\u5F0F",
      random: "\u96A8\u6A5F",
      fixed: "\u56FA\u5B9A",
      range: "\u7BC4\u570D",
      fixedColor: "\u56FA\u5B9A\u984F\u8272",
      advanced: "\u9AD8\u7D1A",
      tileX: "\u74E6\u7247 X",
      tileY: "\u74E6\u7247 Y",
      customPalette: "\u81EA\u5B9A\u7FA9\u8ABF\u8272\u677F",
      paletteExample: "\u4F8B\u5982: #FF0000,#00FF00,#0000FF",
      capture: "\u6355\u7372",
      painted: "\u5DF2\u7E6A\u88FD",
      charges: "\u6B21\u6578",
      retries: "\u91CD\u8A66",
      tile: "\u74E6\u7247",
      configSaved: "\u914D\u7F6E\u5DF2\u4FDD\u5B58",
      configLoaded: "\u914D\u7F6E\u5DF2\u52A0\u8F09",
      configReset: "\u914D\u7F6E\u5DF2\u91CD\u7F6E",
      captureInstructions: "\u8ACB\u624B\u52D5\u7E6A\u88FD\u4E00\u500B\u50CF\u7D20\u4EE5\u6355\u7372\u5EA7\u6A19...",
      backendOnline: "\u5F8C\u7AEF\u5728\u7DDA",
      backendOffline: "\u5F8C\u7AEF\u96E2\u7DDA",
      startingBot: "\u6B63\u5728\u5553\u52D5\u6A5F\u5668\u4EBA...",
      stoppingBot: "\u6B63\u5728\u505C\u6B62\u6A5F\u5668\u4EBA...",
      calibrating: "\u6821\u6E96\u4E2D...",
      alreadyRunning: "\u81EA\u52D5\u8FB2\u5834\u5DF2\u5728\u904B\u884C\u3002",
      imageRunningWarning: "\u81EA\u52D5\u7E6A\u5716\u6B63\u5728\u904B\u884C\uFF0C\u8ACB\u5148\u95DC\u9589\u518D\u5553\u52D5\u81EA\u52D5\u8FB2\u5834\u3002",
      selectPosition: "\u9078\u64C7\u5340\u57DF",
      selectPositionAlert: "\u{1F3AF} \u5728\u5730\u5716\u7684\u7A7A\u767D\u5340\u57DF\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",
      waitingPosition: "\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",
      positionSet: "\u2705 \u5340\u57DF\u8A2D\u7F6E\u6210\u529F\uFF01\u534A\u5F91: 500px",
      positionTimeout: "\u274C \u5340\u57DF\u9078\u64C7\u8D85\u6642",
      missingPosition: "\u274C \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF08\u4F7F\u7528\u201C\u9078\u64C7\u5340\u57DF\u201D\u6309\u9215\uFF09",
      farmRadius: "\u8FB2\u5834\u534A\u5F91",
      positionInfo: "\u7576\u524D\u5340\u57DF",
      farmingInRadius: "\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F91 {radius}px \u5728 ({x},{y}) \u8FB2\u5834",
      selectEmptyArea: "\u26A0\uFE0F \u91CD\u8981: \u8ACB\u9078\u64C7\u7A7A\u767D\u5340\u57DF\u4EE5\u907F\u514D\u885D\u7A81",
      noPosition: "\u672A\u9078\u64C7\u5340\u57DF",
      currentZone: "\u5340\u57DF: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF0C\u5728\u5730\u5716\u4E0A\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",
      logWindow: "\u{1F4CB} Logs",
      logWindowTitle: "\u65E5\u8A8C\u8996\u7A97",
      downloadLogs: "\u4E0B\u8F09\u65E5\u8A8C",
      clearLogs: "\u6E05\u9664\u65E5\u8A8C",
      closeLogs: "\u95DC\u9589"
    },
    // 公共
    common: {
      yes: "\u662F",
      no: "\u5426",
      ok: "\u78BA\u8A8D",
      cancel: "\u53D6\u6D88",
      close: "\u95DC\u9589",
      save: "\u4FDD\u5B58",
      load: "\u52A0\u8F09",
      delete: "\u522A\u9664",
      edit: "\u7DE8\u8F2F",
      start: "\u958B\u59CB",
      stop: "\u505C\u6B62",
      pause: "\u66AB\u505C",
      resume: "\u7E7C\u7E8C",
      reset: "\u91CD\u7F6E",
      settings: "\u8A2D\u7F6E",
      help: "\u5E6B\u52A9",
      about: "\u95DC\u65BC",
      language: "\u8A9E\u8A00",
      loading: "\u52A0\u8F09\u4E2D...",
      error: "\u932F\u8AA4",
      success: "\u6210\u529F",
      warning: "\u8B66\u544A",
      info: "\u4FE1\u606F",
      languageChanged: "\u8A9E\u8A00\u5DF2\u5207\u63DB\u70BA {language}"
    },
    // 守護模塊
    guard: {
      title: "WPlace \u81EA\u52D5\u5B88\u8B77",
      initBot: "\u521D\u59CB\u5316\u5B88\u8B77\u6A5F\u5668\u4EBA",
      selectArea: "\u9078\u64C7\u5340\u57DF",
      captureArea: "\u6355\u7372\u5340\u57DF",
      startProtection: "\u958B\u59CB\u5B88\u8B77",
      stopProtection: "\u505C\u6B62\u5B88\u8B77",
      upperLeft: "\u5DE6\u4E0A\u89D2",
      lowerRight: "\u53F3\u4E0B\u89D2",
      protectedPixels: "\u53D7\u4FDD\u8B77\u50CF\u7D20",
      detectedChanges: "\u6AA2\u6E2C\u5230\u7684\u8B8A\u5316",
      repairedPixels: "\u4FEE\u5FA9\u7684\u50CF\u7D20",
      charges: "\u6B21\u6578",
      waitingInit: "\u7B49\u5F85\u521D\u59CB\u5316...",
      checkingColors: "\u{1F3A8} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",
      noColorsFound: "\u274C \u672A\u627E\u5230\u984F\u8272\uFF0C\u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u3002",
      colorsFound: "\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",
      initSuccess: "\u2705 \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",
      initError: "\u274C \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u5931\u6557",
      invalidCoords: "\u274C \u5EA7\u6A19\u7121\u6548",
      invalidArea: "\u274C \u5340\u57DF\u7121\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u9808\u5C0F\u65BC\u53F3\u4E0B\u89D2",
      areaTooLarge: "\u274C \u5340\u57DF\u904E\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",
      capturingArea: "\u{1F4F8} \u6355\u7372\u5B88\u8B77\u5340\u57DF\u4E2D...",
      areaCaptured: "\u2705 \u5340\u57DF\u6355\u7372\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u8B77",
      captureError: "\u274C \u6355\u7372\u5340\u57DF\u51FA\u932F: {error}",
      captureFirst: "\u274C \u8ACB\u5148\u6355\u7372\u4E00\u500B\u5B88\u8B77\u5340\u57DF",
      protectionStarted: "\u{1F6E1}\uFE0F \u5B88\u8B77\u5DF2\u5553\u52D5 - \u5340\u57DF\u76E3\u63A7\u4E2D",
      protectionStopped: "\u23F9\uFE0F \u5B88\u8B77\u5DF2\u505C\u6B62",
      noChanges: "\u2705 \u5340\u57DF\u5B89\u5168 - \u672A\u6AA2\u6E2C\u5230\u8B8A\u5316",
      changesDetected: "\u{1F6A8} \u6AA2\u6E2C\u5230 {count} \u500B\u8B8A\u5316",
      repairing: "\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20...",
      repairedSuccess: "\u2705 \u5DF2\u6210\u529F\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20",
      repairError: "\u274C \u4FEE\u5FA9\u51FA\u932F: {error}",
      noCharges: "\u26A0\uFE0F \u6B21\u6578\u4E0D\u8DB3\uFF0C\u7121\u6CD5\u4FEE\u5FA9",
      checkingChanges: "\u{1F50D} \u6B63\u5728\u6AA2\u67E5\u5340\u57DF\u8B8A\u5316...",
      errorChecking: "\u274C \u6AA2\u67E5\u51FA\u932F: {error}",
      guardActive: "\u{1F6E1}\uFE0F \u5B88\u8B77\u4E2D - \u5340\u57DF\u53D7\u4FDD\u8B77",
      lastCheck: "\u4E0A\u6B21\u6AA2\u67E5: {time}",
      nextCheck: "\u4E0B\u6B21\u6AA2\u67E5: {time} \u79D2\u5F8C",
      autoInitializing: "\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",
      autoInitSuccess: "\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",
      autoInitFailed: "\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",
      manualInitRequired: "\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",
      paletteDetected: "\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",
      paletteNotFound: "\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",
      clickingPaintButton: "\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",
      paintButtonNotFound: "\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",
      selectUpperLeft: "\u{1F3AF} \u5728\u9700\u8981\u4FDD\u8B77\u5340\u57DF\u7684\u5DE6\u4E0A\u89D2\u5857\u4E00\u500B\u50CF\u7D20",
      selectLowerRight: "\u{1F3AF} \u73FE\u5728\u5728\u53F3\u4E0B\u89D2\u5857\u4E00\u500B\u50CF\u7D20",
      waitingUpperLeft: "\u{1F446} \u7B49\u5F85\u9078\u64C7\u5DE6\u4E0A\u89D2...",
      waitingLowerRight: "\u{1F446} \u7B49\u5F85\u9078\u64C7\u53F3\u4E0B\u89D2...",
      upperLeftCaptured: "\u2705 \u5DF2\u6355\u7372\u5DE6\u4E0A\u89D2: ({x}, {y})",
      lowerRightCaptured: "\u2705 \u5DF2\u6355\u7372\u53F3\u4E0B\u89D2: ({x}, {y})",
      selectionTimeout: "\u274C \u9078\u64C7\u8D85\u6642",
      selectionError: "\u274C \u9078\u64C7\u51FA\u932F\uFF0C\u8ACB\u91CD\u8A66",
      logWindow: "\u{1F4CB} Logs",
      logWindowTitle: "\u65E5\u8A8C\u8996\u7A97",
      downloadLogs: "\u4E0B\u8F09\u65E5\u8A8C",
      clearLogs: "\u6E05\u9664\u65E5\u8A8C",
      closeLogs: "\u95DC\u9589"
    }
  };

  // src/locales/index.js
  var translations = {
    es,
    en,
    fr,
    ru,
    zhHans,
    zhHant
  };
  var currentLanguage = "es";
  var currentTranslations = translations[currentLanguage];
  function detectBrowserLanguage() {
    const browserLang = window.navigator.language || window.navigator.userLanguage || "es";
    const langCode = browserLang.split("-")[0].toLowerCase();
    if (translations[langCode]) {
      return langCode;
    }
    return "es";
  }
  function getSavedLanguage() {
    return null;
  }
  function saveLanguage(langCode) {
    return;
  }
  function initializeLanguage() {
    const savedLang = getSavedLanguage();
    const browserLang = detectBrowserLanguage();
    let selectedLang = "es";
    if (savedLang && translations[savedLang]) {
      selectedLang = savedLang;
    } else if (browserLang && translations[browserLang]) {
      selectedLang = browserLang;
    }
    setLanguage(selectedLang);
    return selectedLang;
  }
  function setLanguage(langCode) {
    if (!translations[langCode]) {
      console.warn(`Idioma '${langCode}' no disponible. Usando '${currentLanguage}'`);
      return;
    }
    currentLanguage = langCode;
    currentTranslations = translations[langCode];
    saveLanguage(langCode);
    if (typeof window !== "undefined" && window.CustomEvent) {
      window.dispatchEvent(new window.CustomEvent("languageChanged", {
        detail: { language: langCode, translations: currentTranslations }
      }));
    }
  }
  function t(key, params = {}) {
    const keys = key.split(".");
    let value = currentTranslations;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Clave de traducci\xF3n no encontrada: '${key}'`);
        return key;
      }
    }
    if (typeof value !== "string") {
      console.warn(`Clave de traducci\xF3n no es string: '${key}'`);
      return key;
    }
    return interpolate(value, params);
  }
  function interpolate(text, params) {
    if (!params || Object.keys(params).length === 0) {
      return text;
    }
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== void 0 ? params[key] : match;
    });
  }
  initializeLanguage();

  // src/log_window/log-window.js
  var LogWindow = class {
    constructor(botName = "Bot") {
      this.botName = botName;
      this.isVisible = false;
      this.logs = [];
      this.maxLogs = 1e3;
      this.container = null;
      this.logContent = null;
      this.isResizing = false;
      this.resizeHandle = null;
      this.originalConsole = {};
      this.config = {
        width: 600,
        height: 400,
        x: window.innerWidth - 620,
        y: 20,
        visible: false
      };
      this.loadConfig();
      this.createWindow();
      this.setupLogInterception();
      this.setupEventListeners();
    }
    /**
     * Carga la configuración guardada del localStorage
     */
    loadConfig() {
      try {
        const saved = localStorage.getItem(`wplace-log-window-${this.botName}`);
        if (saved) {
          this.config = { ...this.config, ...JSON.parse(saved) };
        }
      } catch (error) {
        log("Error cargando configuraci\xF3n de ventana de logs:", error);
      }
    }
    /**
     * Guarda la configuración actual en localStorage
     */
    saveConfig() {
      try {
        localStorage.setItem(`wplace-log-window-${this.botName}`, JSON.stringify(this.config));
      } catch (error) {
        log("Error guardando configuraci\xF3n de ventana de logs:", error);
      }
    }
    /**
     * Crea la estructura HTML de la ventana
     */
    createWindow() {
      this.container = document.createElement("div");
      this.container.className = "wplace-log-window";
      this.container.style.cssText = `
      position: fixed;
      left: ${this.config.x}px;
      top: ${this.config.y}px;
      width: ${this.config.width}px;
      height: ${this.config.height}px;
      background: rgba(0, 0, 0, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      z-index: 100001;
      display: ${this.config.visible ? "flex" : "none"};
      flex-direction: column;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      color: #fff;
      resize: none;
      overflow: hidden;
    `;
      const header = document.createElement("div");
      header.className = "log-window-header";
      header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      cursor: move;
      user-select: none;
      border-radius: 7px 7px 0 0;
    `;
      const title = document.createElement("div");
      title.textContent = `\u{1F4CB} Logs - ${this.botName}`;
      title.style.cssText = `
      font-weight: bold;
      font-size: 14px;
      color: #e2e8f0;
    `;
      const controls = document.createElement("div");
      controls.style.cssText = `
      display: flex;
      gap: 8px;
    `;
      const downloadBtn = document.createElement("button");
      downloadBtn.innerHTML = "\u{1F4BE}";
      downloadBtn.title = "Descargar logs";
      downloadBtn.style.cssText = `
      background: rgba(34, 197, 94, 0.8);
      border: none;
      border-radius: 4px;
      color: white;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    `;
      downloadBtn.addEventListener("mouseenter", () => {
        downloadBtn.style.background = "rgba(34, 197, 94, 1)";
      });
      downloadBtn.addEventListener("mouseleave", () => {
        downloadBtn.style.background = "rgba(34, 197, 94, 0.8)";
      });
      downloadBtn.addEventListener("click", () => this.downloadLogs());
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "\u2715";
      closeBtn.title = "Cerrar ventana";
      closeBtn.style.cssText = `
      background: rgba(239, 68, 68, 0.8);
      border: none;
      border-radius: 4px;
      color: white;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    `;
      closeBtn.addEventListener("mouseenter", () => {
        closeBtn.style.background = "rgba(239, 68, 68, 1)";
      });
      closeBtn.addEventListener("mouseleave", () => {
        closeBtn.style.background = "rgba(239, 68, 68, 0.8)";
      });
      closeBtn.addEventListener("click", () => this.hide());
      controls.appendChild(downloadBtn);
      controls.appendChild(closeBtn);
      header.appendChild(title);
      header.appendChild(controls);
      this.logContent = document.createElement("div");
      this.logContent.className = "log-window-content";
      this.logContent.style.cssText = `
      flex: 1;
      padding: 8px;
      overflow-y: auto;
      font-size: 12px;
      line-height: 1.4;
      white-space: pre-wrap;
      word-break: break-word;
    `;
      this.resizeHandle = document.createElement("div");
      this.resizeHandle.className = "log-window-resize-handle";
      this.resizeHandle.style.cssText = `
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
      background: linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%);
      border-radius: 0 0 8px 0;
    `;
      this.container.appendChild(header);
      this.container.appendChild(this.logContent);
      this.container.appendChild(this.resizeHandle);
      document.body.appendChild(this.container);
      this.setupDragging(header);
      this.setupResizing();
      this.isVisible = this.config.visible;
    }
    /**
     * Configura el arrastre de la ventana
     */
    setupDragging(header) {
      let isDragging = false;
      let dragOffset = { x: 0, y: 0 };
      header.addEventListener("mousedown", (e) => {
        if (e.target.tagName === "BUTTON") return;
        isDragging = true;
        dragOffset.x = e.clientX - this.container.offsetLeft;
        dragOffset.y = e.clientY - this.container.offsetTop;
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", stopDrag);
        e.preventDefault();
      });
      const handleDrag = (e) => {
        if (!isDragging) return;
        const newX = Math.max(0, Math.min(window.innerWidth - this.container.offsetWidth, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - this.container.offsetHeight, e.clientY - dragOffset.y));
        this.container.style.left = newX + "px";
        this.container.style.top = newY + "px";
        this.config.x = newX;
        this.config.y = newY;
      };
      const stopDrag = () => {
        isDragging = false;
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", stopDrag);
        this.saveConfig();
      };
    }
    /**
     * Configura el redimensionamiento de la ventana
     */
    setupResizing() {
      let isResizing = false;
      let startX, startY, startWidth, startHeight;
      this.resizeHandle.addEventListener("mousedown", (e) => {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(this.container).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(this.container).height, 10);
        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", stopResize);
        e.preventDefault();
      });
      const handleResize = (e) => {
        if (!isResizing) return;
        const newWidth = Math.max(300, startWidth + e.clientX - startX);
        const newHeight = Math.max(200, startHeight + e.clientY - startY);
        this.container.style.width = newWidth + "px";
        this.container.style.height = newHeight + "px";
        this.config.width = newWidth;
        this.config.height = newHeight;
      };
      const stopResize = () => {
        isResizing = false;
        document.removeEventListener("mousemove", handleResize);
        document.removeEventListener("mouseup", stopResize);
        this.saveConfig();
      };
    }
    /**
     * Configura la interceptación de logs de consola
     */
    setupLogInterception() {
      this.originalConsole = {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error,
        debug: console.debug
      };
      console.log = (...args) => {
        this.originalConsole.log.apply(console, args);
        this.addLog("log", args);
      };
      console.info = (...args) => {
        this.originalConsole.info.apply(console, args);
        this.addLog("info", args);
      };
      console.warn = (...args) => {
        this.originalConsole.warn.apply(console, args);
        this.addLog("warn", args);
      };
      console.error = (...args) => {
        this.originalConsole.error.apply(console, args);
        this.addLog("error", args);
      };
      console.debug = (...args) => {
        this.originalConsole.debug.apply(console, args);
        this.addLog("debug", args);
      };
    }
    /**
     * Añade un log a la ventana
     */
    addLog(type, args) {
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      const message = args.map(
        (arg) => typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(" ");
      const logEntry = {
        timestamp,
        type,
        message,
        raw: args
      };
      this.logs.push(logEntry);
      if (this.logs.length > this.maxLogs) {
        this.logs.shift();
      }
      if (this.isVisible) {
        this.updateLogDisplay();
      }
    }
    /**
     * Actualiza la visualización de logs
     */
    updateLogDisplay() {
      if (!this.logContent) return;
      const logHtml = this.logs.map((entry) => {
        const color = this.getLogColor(entry.type);
        return `<div style="color: ${color}; margin-bottom: 2px;">[${entry.timestamp}] ${entry.message}</div>`;
      }).join("");
      this.logContent.innerHTML = logHtml;
      this.logContent.scrollTop = this.logContent.scrollHeight;
    }
    /**
     * Obtiene el color para cada tipo de log
     */
    getLogColor(type) {
      const colors = {
        log: "#e2e8f0",
        info: "#60a5fa",
        warn: "#fbbf24",
        error: "#f87171",
        debug: "#a78bfa"
      };
      return colors[type] || colors.log;
    }
    /**
     * Descarga los logs como archivo
     */
    downloadLogs() {
      const now = /* @__PURE__ */ new Date();
      const dateStr = now.toISOString().split("T")[0];
      const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");
      const filename = `log_${this.botName}_${dateStr}_${timeStr}.log`;
      const logText = this.logs.map(
        (entry) => `[${entry.timestamp}] [${entry.type.toUpperCase()}] ${entry.message}`
      ).join("\n");
      const blob = new Blob([logText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      log(`\u{1F4E5} Logs descargados como: ${filename}`);
    }
    /**
     * Muestra la ventana de logs
     */
    show() {
      if (this.container) {
        this.container.style.display = "flex";
        this.isVisible = true;
        this.config.visible = true;
        this.updateLogDisplay();
        this.saveConfig();
      }
    }
    /**
     * Oculta la ventana de logs
     */
    hide() {
      if (this.container) {
        this.container.style.display = "none";
        this.isVisible = false;
        this.config.visible = false;
        this.saveConfig();
      }
    }
    /**
     * Alterna la visibilidad de la ventana
     */
    toggle() {
      if (this.isVisible) {
        this.hide();
      } else {
        this.show();
      }
    }
    /**
     * Limpia todos los logs
     */
    clear() {
      this.logs = [];
      if (this.logContent) {
        this.logContent.innerHTML = "";
      }
    }
    /**
     * Configura los event listeners globales
     */
    setupEventListeners() {
      window.addEventListener("resize", () => {
        if (this.container) {
          const maxX = window.innerWidth - this.container.offsetWidth;
          const maxY = window.innerHeight - this.container.offsetHeight;
          if (this.config.x > maxX) {
            this.config.x = Math.max(0, maxX);
            this.container.style.left = this.config.x + "px";
          }
          if (this.config.y > maxY) {
            this.config.y = Math.max(0, maxY);
            this.container.style.top = this.config.y + "px";
          }
          this.saveConfig();
        }
      });
    }
    /**
     * Destruye la ventana y restaura console original
     */
    destroy() {
      if (this.originalConsole.log) {
        console.log = this.originalConsole.log;
        console.info = this.originalConsole.info;
        console.warn = this.originalConsole.warn;
        console.error = this.originalConsole.error;
        console.debug = this.originalConsole.debug;
      }
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      this.container = null;
      this.logContent = null;
      this.logs = [];
    }
  };
  window.__wplaceLogWindows = window.__wplaceLogWindows || {};
  function createLogWindow(botName) {
    if (!window.__wplaceLogWindows[botName]) {
      window.__wplaceLogWindows[botName] = new LogWindow(botName);
    }
    return window.__wplaceLogWindows[botName];
  }

  // src/farm/ui.js
  function createFarmUI(config, onStart, onStop) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const shadowHost = document.createElement("div");
    shadowHost.id = "wplace-farm-ui";
    shadowHost.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;
    const shadow = shadowHost.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
    .wplace-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: 2px solid #4a5568;
      border-radius: 12px;
      padding: 16px;
      min-width: 320px;
      max-width: 400px;
      color: white;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      font-size: 14px;
      backdrop-filter: blur(10px);
      position: relative;
    }
    
    .wplace-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      cursor: move;
    }
    
    .wplace-title {
      font-weight: bold;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .wplace-minimize {
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .wplace-minimize:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .wplace-content {
      display: block;
    }
    
    .wplace-content.minimized {
      display: none;
    }
    
    .wplace-section {
      margin-bottom: 12px;
    }
    
    .wplace-section-title {
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 13px;
      color: #e2e8f0;
      cursor: pointer;
      user-select: none;
    }
    
    .wplace-row {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      gap: 8px;
    }
    
    .wplace-label {
      flex: 1;
      font-size: 12px;
      color: #cbd5e0;
    }
    
    .wplace-input {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      width: 80px;
    }
    
    .wplace-input:focus {
      outline: none;
      border-color: #90cdf4;
      background: rgba(255,255,255,0.15);
    }
    
    .wplace-input.wide {
      width: 100%;
    }
    
    .wplace-select {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      width: 100px;
    }
    
    .wplace-button {
      background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
      border: none;
      border-radius: 6px;
      color: white;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      margin: 2px;
      transition: all 0.2s;
      min-width: 60px;
    }
    
    .wplace-button:hover {
      background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
      transform: translateY(-1px);
    }
    
    .wplace-button:active {
      transform: translateY(0);
    }
    
    .wplace-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    
    .wplace-button.start {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    }
    
    .wplace-button.start:hover:not(:disabled) {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
    }
    
    .wplace-button.stop {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    }
    
    .wplace-button.stop:hover:not(:disabled) {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
    }
    
    .wplace-button.secondary {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
    }
    
    .wplace-button.secondary:hover:not(:disabled) {
      background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
    }
    
    .wplace-button.small {
      padding: 4px 8px;
      font-size: 11px;
      min-width: 40px;
    }
    
    .wplace-status {
      background: rgba(0,0,0,0.3);
      border-radius: 6px;
      padding: 8px;
      margin: 8px 0;
      font-size: 12px;
      min-height: 20px;
      word-wrap: break-word;
      transition: all 0.3s ease;
    }
    
    .wplace-status.success {
      background: rgba(72, 187, 120, 0.2);
      border-left: 3px solid #48bb78;
    }
    
    .wplace-status.error {
      background: rgba(245, 101, 101, 0.2);
      border-left: 3px solid #f56565;
    }
    
    .wplace-status.status {
      background: rgba(66, 153, 225, 0.2);
      border-left: 3px solid #4299e1;
    }
    
    .wplace-stats {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    
    .wplace-stat {
      background: rgba(0,0,0,0.2);
      border-radius: 4px;
      padding: 6px;
      text-align: center;
    }
    
    .wplace-stat-value {
      font-weight: bold;
      font-size: 14px;
    }
    
    .wplace-stat-label {
      font-size: 10px;
      color: #a0aec0;
      margin-top: 2px;
    }
    
    .wplace-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 8px;
    }
    
    .wplace-advanced {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    
    .wplace-theme-preview {
      display: flex;
      gap: 2px;
      flex-wrap: wrap;
      margin-top: 4px;
      min-height: 16px;
    }
    
    .wplace-color-dot {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    .wplace-health {
      font-size: 10px;
      color: #a0aec0;
      margin-top: 4px;
      text-align: center;
    }
    
    .wplace-health.online {
      color: #48bb78;
    }
    
    .wplace-health.offline {
      color: #f56565;
    }
    
    .wplace-zone-info {
      background: rgba(0,0,0,0.2);
      border-radius: 6px;
      padding: 8px;
      margin: 8px 0;
      font-size: 11px;
    }
    
    .wplace-zone-text {
      color: #e2e8f0;
      margin-bottom: 4px;
    }
    
    .wplace-zone-warning {
      color: #ffd700;
      font-size: 10px;
      font-style: italic;
    }
    
    #zone-display {
      font-weight: bold;
      color: #90cdf4;
    }
  `;
    shadow.appendChild(style);
    const container = document.createElement("div");
    container.className = "wplace-container";
    const uiState = {
      minimized: false,
      showAdvanced: false
    };
    container.innerHTML = `
    <div class="wplace-header">
      <div class="wplace-title">
        \u{1F916} ${t("farm.title")}
      </div>
      <button class="wplace-minimize">\u2212</button>
    </div>
    
    <div class="wplace-content">
      <!-- Estado y controles principales -->
      <div class="wplace-section">
        <div class="wplace-status" id="status">\u{1F4A4} ${t("farm.stopped")}</div>
        
        <div class="wplace-stats">
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="painted-count">0</div>
            <div class="wplace-stat-label">${t("farm.painted")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="charges-count">0</div>
            <div class="wplace-stat-label">${t("farm.charges")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="retry-count">0</div>
            <div class="wplace-stat-label">${t("farm.retries")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="tile-pos">0,0</div>
            <div class="wplace-stat-label">${t("farm.tile")}</div>
          </div>
        </div>
        
        <div class="wplace-buttons">
          <button class="wplace-button start" id="start-btn">\u25B6\uFE0F ${t("farm.start")}</button>
          <button class="wplace-button stop" id="stop-btn" disabled>\u23F9\uFE0F ${t("farm.stop")}</button>
          <button class="wplace-button small" id="select-position-btn">\u{1F30D} ${t("farm.selectPosition")}</button>
          <button class="wplace-button small" id="once-btn">\u{1F3A8} ${t("farm.paintOnce")}</button>
          <button class="wplace-button secondary small" id="log-window-btn">\u{1F4CB} ${t("farm.logWindow") || "Logs"}</button>
        </div>
        
        <!-- Informaci\xF3n de la zona seleccionada -->
        <div class="wplace-zone-info" id="zone-info">
          <div class="wplace-zone-text">\u{1F4CD} ${t("farm.positionInfo")}: <span id="zone-display">${t("farm.noPosition")}</span></div>
          <div class="wplace-zone-warning">\u26A0\uFE0F ${t("farm.selectEmptyArea")}</div>
        </div>
        
        <div class="wplace-health" id="health-status">\u{1F50D} ${t("farm.checkingStatus")}</div>
      </div>
      
      <!-- Configuraci\xF3n b\xE1sica -->
      <div class="wplace-section">
        <div class="wplace-section-title">\u2699\uFE0F ${t("farm.configuration")}</div>
        
        <div class="wplace-row">
          <span class="wplace-label">${t("farm.delay")}:</span>
          <input type="number" class="wplace-input" id="delay-input" min="1000" max="300000" step="1000">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${t("farm.pixelsPerBatch")}:</span>
          <input type="number" class="wplace-input" id="pixels-input" min="1" max="50">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${t("farm.minCharges")}:</span>
          <input type="number" class="wplace-input" id="min-charges-input" min="0" max="50" step="0.1">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${t("farm.colorMode")}:</span>
          <select class="wplace-select" id="color-mode-select">
            <option value="random">${t("farm.random")}</option>
            <option value="fixed">${t("farm.fixed")}</option>
          </select>
        </div>
        
        <div class="wplace-row" id="color-range-row">
          <span class="wplace-label">${t("farm.range")}:</span>
          <input type="number" class="wplace-input" id="color-min-input" min="1" max="32" style="width: 35px;">
          <span style="color: #cbd5e0;">-</span>
          <input type="number" class="wplace-input" id="color-max-input" min="1" max="32" style="width: 35px;">
        </div>
        
        <div class="wplace-row" id="color-fixed-row" style="display: none;">
          <span class="wplace-label">${t("farm.fixedColor")}:</span>
          <input type="number" class="wplace-input" id="color-fixed-input" min="1" max="32">
        </div>
      </div>
      
      <!-- Configuraci\xF3n avanzada (colapsable) -->
      <div class="wplace-section">
        <div class="wplace-section-title" id="advanced-toggle">
          \u{1F527} ${t("farm.advanced")} <span id="advanced-arrow">\u25B6</span>
        </div>
        
        <div class="wplace-advanced" id="advanced-section" style="display: none;">
          <div class="wplace-row">
            <span class="wplace-label">${t("farm.tileX")}:</span>
            <input type="number" class="wplace-input" id="tile-x-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">${t("farm.tileY")}:</span>
            <input type="number" class="wplace-input" id="tile-y-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">${t("farm.customPalette")}:</span>
          </div>
          <div class="wplace-row">
            <input type="text" class="wplace-input wide" id="custom-palette-input" 
                   placeholder="${t("farm.paletteExample")}">
          </div>
          
          <div class="wplace-buttons">
            <button class="wplace-button small" id="save-btn">\u{1F4BE} ${t("common.save")}</button>
            <button class="wplace-button small" id="load-btn">\u{1F4C1} ${t("common.load")}</button>
            <button class="wplace-button small" id="reset-btn">\u{1F504} ${t("common.reset")}</button>
            <button class="wplace-button small" id="capture-btn">\u{1F4F8} ${t("farm.capture")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
    shadow.appendChild(container);
    document.body.appendChild(shadowHost);
    const header = shadow.querySelector(".wplace-header");
    dragHeader(header, shadowHost);
    const elements = {
      minimizeBtn: shadow.querySelector(".wplace-minimize"),
      content: shadow.querySelector(".wplace-content"),
      status: shadow.getElementById("status"),
      paintedCount: shadow.getElementById("painted-count"),
      chargesCount: shadow.getElementById("charges-count"),
      retryCount: shadow.getElementById("retry-count"),
      tilePos: shadow.getElementById("tile-pos"),
      startBtn: shadow.getElementById("start-btn"),
      stopBtn: shadow.getElementById("stop-btn"),
      selectPositionBtn: shadow.getElementById("select-position-btn"),
      onceBtn: shadow.getElementById("once-btn"),
      logWindowBtn: shadow.getElementById("log-window-btn"),
      zoneInfo: shadow.getElementById("zone-info"),
      zoneDisplay: shadow.getElementById("zone-display"),
      healthStatus: shadow.getElementById("health-status"),
      delayInput: shadow.getElementById("delay-input"),
      pixelsInput: shadow.getElementById("pixels-input"),
      minChargesInput: shadow.getElementById("min-charges-input"),
      colorModeSelect: shadow.getElementById("color-mode-select"),
      colorRangeRow: shadow.getElementById("color-range-row"),
      colorFixedRow: shadow.getElementById("color-fixed-row"),
      colorMinInput: shadow.getElementById("color-min-input"),
      colorMaxInput: shadow.getElementById("color-max-input"),
      colorFixedInput: shadow.getElementById("color-fixed-input"),
      advancedToggle: shadow.getElementById("advanced-toggle"),
      advancedSection: shadow.getElementById("advanced-section"),
      advancedArrow: shadow.getElementById("advanced-arrow"),
      tileXInput: shadow.getElementById("tile-x-input"),
      tileYInput: shadow.getElementById("tile-y-input"),
      customPaletteInput: shadow.getElementById("custom-palette-input"),
      saveBtn: shadow.getElementById("save-btn"),
      loadBtn: shadow.getElementById("load-btn"),
      resetBtn: shadow.getElementById("reset-btn"),
      captureBtn: shadow.getElementById("capture-btn")
    };
    function updateInputsFromConfig() {
      var _a2;
      elements.delayInput.value = config.DELAY_MS;
      elements.pixelsInput.value = config.PIXELS_PER_BATCH;
      elements.minChargesInput.value = config.MIN_CHARGES;
      elements.colorModeSelect.value = config.COLOR_MODE;
      elements.colorMinInput.value = config.COLOR_MIN;
      elements.colorMaxInput.value = config.COLOR_MAX;
      elements.colorFixedInput.value = config.COLOR_FIXED;
      elements.tileXInput.value = config.TILE_X || "";
      elements.tileYInput.value = config.TILE_Y || "";
      elements.customPaletteInput.value = (config.CUSTOM_PALETTE || []).join(",");
      updateColorModeVisibility();
      updateTileDisplay();
      updateZoneDisplay();
      updateButtonStates(((_a2 = farmState) == null ? void 0 : _a2.running) || false);
    }
    function updateConfigFromInputs() {
      config.DELAY_MS = parseInt(elements.delayInput.value) || FARM_DEFAULTS.DELAY_MS;
      config.PIXELS_PER_BATCH = clamp(parseInt(elements.pixelsInput.value) || FARM_DEFAULTS.PIXELS_PER_BATCH, 1, 50);
      config.MIN_CHARGES = parseFloat(elements.minChargesInput.value) || FARM_DEFAULTS.MIN_CHARGES;
      config.COLOR_MODE = elements.colorModeSelect.value;
      config.COLOR_MIN = clamp(parseInt(elements.colorMinInput.value) || FARM_DEFAULTS.COLOR_MIN, 1, 32);
      config.COLOR_MAX = clamp(parseInt(elements.colorMaxInput.value) || FARM_DEFAULTS.COLOR_MAX, 1, 32);
      config.COLOR_FIXED = clamp(parseInt(elements.colorFixedInput.value) || FARM_DEFAULTS.COLOR_FIXED, 1, 32);
      if (config.COLOR_MIN > config.COLOR_MAX) {
        config.COLOR_MAX = config.COLOR_MIN;
        elements.colorMaxInput.value = config.COLOR_MAX;
      }
      const tileX = parseInt(elements.tileXInput.value);
      const tileY = parseInt(elements.tileYInput.value);
      if (Number.isFinite(tileX)) config.TILE_X = tileX;
      if (Number.isFinite(tileY)) config.TILE_Y = tileY;
      updateTileDisplay();
      updateZoneDisplay();
    }
    function updateColorModeVisibility() {
      const mode = elements.colorModeSelect.value;
      elements.colorRangeRow.style.display = mode === "random" ? "flex" : "none";
      elements.colorFixedRow.style.display = mode === "fixed" ? "flex" : "none";
    }
    function updateTileDisplay() {
      if (elements.tilePos) {
        elements.tilePos.textContent = `${config.TILE_X || 0},${config.TILE_Y || 0}`;
      }
    }
    function updateZoneDisplay() {
      var _a2;
      if (elements.zoneDisplay) {
        if (config.POSITION_SELECTED && config.BASE_X !== null && config.BASE_Y !== null) {
          elements.zoneDisplay.textContent = t("farm.currentZone", { x: config.BASE_X, y: config.BASE_Y });
          elements.zoneDisplay.style.color = "#48bb78";
        } else {
          elements.zoneDisplay.textContent = t("farm.noPosition");
          elements.zoneDisplay.style.color = "#f56565";
        }
      }
      updateButtonStates(((_a2 = farmState) == null ? void 0 : _a2.running) || false);
    }
    (_a = elements.minimizeBtn) == null ? void 0 : _a.addEventListener("click", () => {
      uiState.minimized = !uiState.minimized;
      elements.content.classList.toggle("minimized", uiState.minimized);
      elements.minimizeBtn.textContent = uiState.minimized ? "+" : "\u2212";
    });
    (_b = elements.startBtn) == null ? void 0 : _b.addEventListener("click", () => {
      updateConfigFromInputs();
      onStart();
      updateButtonStates(true);
    });
    (_c = elements.stopBtn) == null ? void 0 : _c.addEventListener("click", () => {
      onStop();
      updateButtonStates(false);
    });
    (_d = elements.onceBtn) == null ? void 0 : _d.addEventListener("click", () => {
      updateInputsFromConfig();
      updateConfigFromInputs();
      if (window.WPAUI && window.WPAUI.once) {
        window.WPAUI.once();
      }
    });
    (_e = elements.selectPositionBtn) == null ? void 0 : _e.addEventListener("click", () => {
      selectFarmPosition(config, setStatus, updateZoneDisplay);
    });
    let logWindow = null;
    (_f = elements.logWindowBtn) == null ? void 0 : _f.addEventListener("click", () => {
      if (!logWindow) {
        logWindow = createLogWindow("farm");
        logWindow.show();
      } else {
        logWindow.toggle();
      }
    });
    (_g = elements.colorModeSelect) == null ? void 0 : _g.addEventListener("change", () => {
      updateColorModeVisibility();
      updateConfigFromInputs();
    });
    (_h = elements.customPaletteInput) == null ? void 0 : _h.addEventListener("input", () => {
      updateConfigFromInputs();
    });
    (_i = elements.advancedToggle) == null ? void 0 : _i.addEventListener("click", () => {
      uiState.showAdvanced = !uiState.showAdvanced;
      elements.advancedSection.style.display = uiState.showAdvanced ? "block" : "none";
      elements.advancedArrow.textContent = uiState.showAdvanced ? "\u25BC" : "\u25B6";
    });
    ["delayInput", "pixelsInput", "minChargesInput", "colorMinInput", "colorMaxInput", "colorFixedInput", "tileXInput", "tileYInput"].forEach((inputName) => {
      var _a2;
      (_a2 = elements[inputName]) == null ? void 0 : _a2.addEventListener("change", updateConfigFromInputs);
    });
    (_j = elements.saveBtn) == null ? void 0 : _j.addEventListener("click", () => {
      updateConfigFromInputs();
      saveFarmCfg(config);
      setStatus(`\u{1F4BE} ${t("farm.configSaved")}`, "success");
    });
    (_k = elements.loadBtn) == null ? void 0 : _k.addEventListener("click", () => {
      const loaded = loadFarmCfg(FARM_DEFAULTS);
      Object.assign(config, loaded);
      updateInputsFromConfig();
      setStatus(`\u{1F4C1} ${t("farm.configLoaded")}`, "success");
    });
    (_l = elements.resetBtn) == null ? void 0 : _l.addEventListener("click", () => {
      resetFarmCfg();
      Object.assign(config, FARM_DEFAULTS);
      updateInputsFromConfig();
      setStatus(`\u{1F504} ${t("farm.configReset")}`, "success");
    });
    (_m = elements.captureBtn) == null ? void 0 : _m.addEventListener("click", () => {
      setStatus(`\u{1F4F8} ${t("farm.captureInstructions")}`, "status");
    });
    function updateButtonStates(running) {
      if (elements.startBtn) {
        const noZoneSelected = !config.POSITION_SELECTED || config.BASE_X === null || config.BASE_Y === null;
        elements.startBtn.disabled = running || noZoneSelected;
        if (noZoneSelected) {
          elements.startBtn.textContent = `\u{1F6AB} ${t("farm.selectPosition")} \u26A0\uFE0F`;
          elements.startBtn.title = t("farm.missingPosition");
        } else {
          elements.startBtn.textContent = `\u25B6\uFE0F ${t("farm.start")}`;
          elements.startBtn.title = "";
        }
      }
      if (elements.stopBtn) elements.stopBtn.disabled = !running;
    }
    function setStatus(message, type = "status") {
      if (elements.status) {
        elements.status.textContent = message;
        elements.status.className = `wplace-status ${type}`;
        log(`Status: ${message}`);
      }
    }
    function updateStats(painted, charges, retries = 0, health = null) {
      if (elements.paintedCount) {
        elements.paintedCount.textContent = painted || 0;
      }
      if (elements.chargesCount) {
        elements.chargesCount.textContent = typeof charges === "number" ? charges.toFixed(1) : "0";
      }
      if (elements.retryCount) {
        elements.retryCount.textContent = retries || 0;
      }
      if (elements.healthStatus && health) {
        elements.healthStatus.textContent = health.up ? `\u{1F7E2} ${t("farm.backendOnline")}` : `\u{1F534} ${t("farm.backendOffline")}`;
        elements.healthStatus.className = `wplace-health ${health.up ? "online" : "offline"}`;
      }
    }
    function flashEffect() {
      container.style.boxShadow = "0 0 20px #48bb78";
      setTimeout(() => {
        container.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
      }, 200);
    }
    updateInputsFromConfig();
    function updateTexts() {
      var _a2;
      const title = shadow.querySelector(".wplace-title");
      if (title) {
        title.innerHTML = `\u{1F916} ${t("farm.title")}`;
      }
      if (elements.startBtn) elements.startBtn.innerHTML = `\u25B6\uFE0F ${t("farm.start")}`;
      if (elements.stopBtn) elements.stopBtn.innerHTML = `\u23F9\uFE0F ${t("farm.stop")}`;
      if (elements.selectPositionBtn) elements.selectPositionBtn.innerHTML = `\u{1F30D} ${t("farm.selectPosition")}`;
      if (elements.onceBtn) elements.onceBtn.innerHTML = `\u{1F3A8} ${t("farm.paintOnce")}`;
      const paintedLabel = shadow.querySelector("#painted-count").parentElement.querySelector(".wplace-stat-label");
      const chargesLabel = shadow.querySelector("#charges-count").parentElement.querySelector(".wplace-stat-label");
      const retryLabel = shadow.querySelector("#retry-count").parentElement.querySelector(".wplace-stat-label");
      const tileLabel = shadow.querySelector("#tile-pos").parentElement.querySelector(".wplace-stat-label");
      if (paintedLabel) paintedLabel.textContent = t("farm.painted");
      if (chargesLabel) chargesLabel.textContent = t("farm.charges");
      if (retryLabel) retryLabel.textContent = t("farm.retries");
      if (tileLabel) tileLabel.textContent = t("farm.tile");
      const configTitle = shadow.querySelector(".wplace-section-title");
      if (configTitle) configTitle.innerHTML = `\u2699\uFE0F ${t("farm.configuration")}`;
      const advancedTitle = shadow.getElementById("advanced-toggle");
      if (advancedTitle) {
        const arrow = advancedTitle.querySelector("#advanced-arrow");
        const arrowText = arrow ? arrow.textContent : "\u25B6";
        advancedTitle.innerHTML = `\u{1F527} ${t("farm.advanced")} <span id="advanced-arrow">${arrowText}</span>`;
      }
      const colorModeSelect = elements.colorModeSelect;
      if (colorModeSelect) {
        const randomOption = colorModeSelect.querySelector('option[value="random"]');
        const fixedOption = colorModeSelect.querySelector('option[value="fixed"]');
        if (randomOption) randomOption.textContent = t("farm.random");
        if (fixedOption) fixedOption.textContent = t("farm.fixed");
      }
      if (elements.customPaletteInput) {
        elements.customPaletteInput.placeholder = t("farm.paletteExample");
      }
      if (elements.saveBtn) elements.saveBtn.innerHTML = `\u{1F4BE} ${t("common.save")}`;
      if (elements.loadBtn) elements.loadBtn.innerHTML = `\u{1F4C1} ${t("common.load")}`;
      if (elements.resetBtn) elements.resetBtn.innerHTML = `\u{1F504} ${t("common.reset")}`;
      if (elements.captureBtn) elements.captureBtn.innerHTML = `\u{1F4F8} ${t("farm.capture")}`;
      updateZoneDisplay();
      updateButtonStates(((_a2 = farmState) == null ? void 0 : _a2.running) || false);
      const healthStatus = elements.healthStatus;
      if (healthStatus && healthStatus.textContent.includes("\u{1F50D}")) {
        healthStatus.textContent = `\u{1F50D} ${t("farm.checkingStatus")}`;
      }
      const status = elements.status;
      if (status && status.textContent.includes("\u{1F4A4}")) {
        status.textContent = `\u{1F4A4} ${t("farm.stopped")}`;
      }
    }
    async function selectFarmPosition(config2, setStatus2, updateZoneDisplay2) {
      return new Promise((resolve) => {
        setStatus2(t("farm.selectPositionAlert"), "info");
        config2.selectingPosition = true;
        const originalFetch = window.fetch;
        window.fetch = async (url, options) => {
          if (config2.selectingPosition && url.includes("/s0/pixel/")) {
            try {
              const response = await originalFetch(url, options);
              if (response.ok && options && options.body) {
                const bodyData = JSON.parse(options.body);
                if (bodyData.coords && bodyData.coords.length >= 2) {
                  const localX = bodyData.coords[0];
                  const localY = bodyData.coords[1];
                  const tileMatch = url.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);
                  if (tileMatch) {
                    config2.TILE_X = parseInt(tileMatch[1]);
                    config2.TILE_Y = parseInt(tileMatch[2]);
                  }
                  config2.BASE_X = localX;
                  config2.BASE_Y = localY;
                  config2.POSITION_SELECTED = true;
                  config2.selectingPosition = false;
                  window.fetch = originalFetch;
                  updateZoneDisplay2();
                  updateTileDisplay();
                  updateInputsFromConfig();
                  setStatus2(t("farm.positionSet"), "success");
                  log(`\u2705 Zona de farming establecida: tile(${config2.TILE_X},${config2.TILE_Y}) base(${localX},${localY}) radio(${config2.FARM_RADIUS}px)`);
                  saveFarmCfg(config2);
                  resolve(true);
                }
              }
              return response;
            } catch (error) {
              log("Error interceptando pixel:", error);
              return originalFetch(url, options);
            }
          }
          return originalFetch(url, options);
        };
        setTimeout(() => {
          if (config2.selectingPosition) {
            window.fetch = originalFetch;
            config2.selectingPosition = false;
            setStatus2(t("farm.positionTimeout"), "error");
            resolve(false);
          }
        }, 12e4);
      });
    }
    window.addEventListener("languageChanged", updateTexts);
    return {
      setStatus,
      updateStats,
      flashEffect,
      updateButtonStates,
      updateTexts,
      destroy: () => {
        window.removeEventListener("languageChanged", updateTexts);
        document.body.removeChild(shadowHost);
      },
      updateConfig: updateInputsFromConfig,
      getElement: () => shadowHost
    };
  }
  async function autoCalibrateTile(config) {
    try {
      log("\u{1F3AF} Iniciando auto-calibraci\xF3n del tile...");
      if (config.POSITION_SELECTED && config.BASE_X != null && config.BASE_Y != null && Number.isFinite(config.TILE_X) && Number.isFinite(config.TILE_Y)) {
        log(`\u2139\uFE0F Ya existe zona seleccionada. Se mantiene tile actual: (${config.TILE_X}, ${config.TILE_Y})`);
        saveFarmCfg(config);
        return { tileX: config.TILE_X, tileY: config.TILE_Y, success: true };
      }
      const urlParams = new window.URLSearchParams(window.location.search);
      const hashParams = window.location.hash;
      let tileX, tileY;
      if (urlParams.has("x") && urlParams.has("y")) {
        tileX = parseInt(urlParams.get("x"));
        tileY = parseInt(urlParams.get("y"));
      }
      if (!tileX && !tileY && hashParams) {
        const hashMatch = hashParams.match(/#(-?\d+),(-?\d+)/);
        if (hashMatch) {
          tileX = parseInt(hashMatch[1]);
          tileY = parseInt(hashMatch[2]);
        }
      }
      if (!tileX && !tileY) {
        const positionElements = document.querySelectorAll("[data-x], [data-y], .coordinates, .position");
        for (const el of positionElements) {
          const x = el.getAttribute("data-x") || el.getAttribute("x");
          const y = el.getAttribute("data-y") || el.getAttribute("y");
          if (x && y) {
            tileX = parseInt(x);
            tileY = parseInt(y);
            break;
          }
        }
      }
      if (!tileX && !tileY) {
        const textContent = document.body.textContent || "";
        const coordMatch = textContent.match(/(?:tile|pos|position)?\s*[([]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);
        if (coordMatch) {
          tileX = parseInt(coordMatch[1]);
          tileY = parseInt(coordMatch[2]);
        }
      }
      if (!Number.isFinite(tileX) || !Number.isFinite(tileY)) {
        tileX = 0;
        tileY = 0;
        log("\u26A0\uFE0F No se pudieron detectar coordenadas autom\xE1ticamente, usando (0,0)");
      }
      if (Math.abs(tileX) > 1e6 || Math.abs(tileY) > 1e6) {
        log("\u26A0\uFE0F Coordenadas detectadas parecen incorrectas, limitando a rango v\xE1lido");
        tileX = Math.max(-1e6, Math.min(1e6, tileX));
        tileY = Math.max(-1e6, Math.min(1e6, tileY));
      }
      config.TILE_X = tileX;
      config.TILE_Y = tileY;
      log(`\u2705 Tile calibrado autom\xE1ticamente: (${tileX}, ${tileY})`);
      saveFarmCfg(config);
      return { tileX, tileY, success: true };
    } catch (error) {
      log("\u274C Error en auto-calibraci\xF3n:", error);
      return { tileX: 0, tileY: 0, success: false, error: error.message };
    }
  }

  // src/farm/coords.js
  var randInt = (n) => Math.floor(Math.random() * n);
  function generateMultipleCoords(count, cfg) {
    if (!cfg.POSITION_SELECTED || cfg.BASE_X === null || cfg.BASE_Y === null) {
      log("\u26A0\uFE0F No se ha seleccionado una posici\xF3n base. Usando coordenadas aleatorias fallback.");
      const coords2 = [];
      const margin = Math.floor(cfg.TILE_SIZE * 0.05);
      const safeSize = cfg.TILE_SIZE - margin * 2;
      for (let i = 0; i < count; i++) {
        const localX = margin + Math.floor(Math.random() * safeSize);
        const localY = margin + Math.floor(Math.random() * safeSize);
        coords2.push(localX, localY);
      }
      return coords2;
    }
    const coords = [];
    const maxSize = cfg.TILE_SIZE - 1;
    let currentX = Math.max(0, Math.min(maxSize, cfg.BASE_X));
    let currentY = Math.max(0, Math.min(maxSize, cfg.BASE_Y));
    for (let i = 0; i < count; i++) {
      currentX = Math.max(0, Math.min(maxSize, currentX));
      currentY = Math.max(0, Math.min(maxSize, currentY));
      coords.push(currentX, currentY);
      currentX++;
      if (currentX > maxSize) {
        currentX = Math.max(0, Math.min(maxSize, cfg.BASE_X));
        currentY++;
        if (currentY > maxSize) {
          currentY = Math.max(0, Math.min(maxSize, cfg.BASE_Y));
        }
      }
    }
    if (coords.length >= 4) {
      log(`\u{1F3AF} L\xEDnea recta generada: [${coords.slice(0, 8).join(",")}...] total: ${coords.length / 2} p\xEDxeles`);
    }
    return coords;
  }
  function generateMultipleColors(count, cfg) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(nextColor(cfg));
    }
    return colors;
  }
  function nextColor(cfg) {
    if (cfg.COLOR_MODE === "fixed") {
      return cfg.COLOR_FIXED;
    } else {
      const span = cfg.COLOR_MAX - cfg.COLOR_MIN + 1;
      return cfg.COLOR_MIN + randInt(span);
    }
  }

  // src/core/timing.js
  var sleep2 = (ms) => new Promise((r) => setTimeout(r, ms));
  async function sleepWithCountdown(ms, onUpdate, state) {
    const startTime = Date.now();
    const endTime = startTime + ms;
    while (Date.now() < endTime && (!state || state.running)) {
      const remaining = endTime - Date.now();
      if (onUpdate) {
        onUpdate(remaining);
      }
      await sleep2(Math.min(1e3, remaining));
    }
  }

  // src/farm/loop.js
  async function updateCanvasPixel(localX, localY, color) {
    try {
      const canvases = document.querySelectorAll("canvas");
      for (const canvas of canvases) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const colorHex = typeof color === "number" ? `#${color.toString(16).padStart(6, "0")}` : color;
          ctx.fillStyle = colorHex;
          ctx.fillRect(localX, localY, 1, 1);
          if (typeof window !== "undefined" && window.Event) {
            canvas.dispatchEvent(new window.Event("pixel-updated"));
          }
        }
      }
    } catch (error) {
      log("Error actualizando canvas:", error);
    }
  }
  async function refreshTile(tileX, tileY) {
    try {
      const tileSelector = `[data-tile="${tileX}-${tileY}"], .tile-${tileX}-${tileY}, [data-tile-x="${tileX}"][data-tile-y="${tileY}"]`;
      const tileElement = document.querySelector(tileSelector);
      if (tileElement) {
        tileElement.classList.add("tile-updating");
        setTimeout(() => {
          tileElement.classList.remove("tile-updating");
          tileElement.classList.add("tile-updated");
          setTimeout(() => tileElement.classList.remove("tile-updated"), 1e3);
        }, 100);
        log(`Tile (${tileX},${tileY}) actualizado visualmente`);
      } else {
        const canvasElements = document.querySelectorAll("canvas");
        canvasElements.forEach((canvas) => {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const imageData = ctx.getImageData(0, 0, 1, 1);
            ctx.putImageData(imageData, 0, 0);
          }
        });
        log(`Actualizaci\xF3n visual gen\xE9rica realizada para tile (${tileX},${tileY})`);
      }
    } catch (error) {
      log("Error en actualizaci\xF3n visual del tile:", error);
    }
  }
  async function paintOnce(cfg, state, setStatus, flashEffect, getSession2, checkBackendHealth) {
    var _a, _b, _c, _d;
    if (!cfg.POSITION_SELECTED || cfg.BASE_X === null || cfg.BASE_Y === null) {
      setStatus(`\u{1F3AF} Selecciona una zona primero usando 'Seleccionar Zona'`, "error");
      log(`Pintado cancelado: no se ha seleccionado una posici\xF3n base`);
      return false;
    }
    if (!Number.isFinite(cfg.TILE_X) || !Number.isFinite(cfg.TILE_Y)) {
      setStatus(`\u{1F6AB} Coordenadas del tile inv\xE1lidas (${cfg.TILE_X},${cfg.TILE_Y}). Calibra primero`, "error");
      log(`Pintado cancelado: coordenadas del tile inv\xE1lidas`);
      return false;
    }
    const availableCharges = Math.floor(state.charges.count);
    if (availableCharges < 1) {
      setStatus(`\u{1F50B} Sin cargas disponibles. Esperando...`, "error");
      return false;
    }
    const optimalPixelCount = Math.min(availableCharges, cfg.PIXELS_PER_BATCH, 50);
    const pixelCount = Math.max(1, optimalPixelCount);
    if (pixelCount < cfg.PIXELS_PER_BATCH) {
      log(`Ajustando p\xEDxeles por cargas completas disponibles: ${pixelCount}/${cfg.PIXELS_PER_BATCH} (${availableCharges} cargas completas de ${state.charges.count.toFixed(2)} totales)`);
    }
    const coords = generateMultipleCoords(pixelCount, cfg);
    const colors = generateMultipleColors(pixelCount, cfg);
    const firstLocalX = coords[0];
    const firstLocalY = coords[1];
    setStatus(`\u{1F33E} Farmeando ${pixelCount} p\xEDxeles en radio ${cfg.FARM_RADIUS}px desde (${cfg.BASE_X},${cfg.BASE_Y}) tile(${cfg.TILE_X},${cfg.TILE_Y})...`, "status");
    const t2 = await ensureToken();
    const r = await postPixelBatchImage(cfg.TILE_X, cfg.TILE_Y, coords, colors, t2);
    state.last = {
      x: firstLocalX,
      y: firstLocalY,
      color: colors[0],
      pixelCount,
      availableCharges,
      status: r.status,
      json: r.json
    };
    if (r.status === 200 && r.json && (r.json.painted > 0 || r.json.painted === pixelCount || r.json.ok)) {
      const actualPainted = r.json.painted || pixelCount;
      state.painted += actualPainted;
      state.retryCount = 0;
      for (let i = 0; i < coords.length; i += 2) {
        const localX = coords[i];
        const localY = coords[i + 1];
        const color = colors[Math.floor(i / 2)];
        await updateCanvasPixel(localX, localY, color);
      }
      await refreshTile(cfg.TILE_X, cfg.TILE_Y);
      await getSession2();
      setStatus(`\u2705 Lote pintado: ${actualPainted}/${pixelCount} p\xEDxeles en zona (${cfg.BASE_X},${cfg.BASE_Y}) radio ${cfg.FARM_RADIUS}px`, "success");
      flashEffect();
      if (typeof window !== "undefined" && window.CustomEvent) {
        const event = new window.CustomEvent("wplace-batch-painted", {
          detail: {
            firstX: firstLocalX,
            firstY: firstLocalY,
            pixelCount: actualPainted,
            totalPixels: pixelCount,
            colors,
            coords,
            tileX: cfg.TILE_X,
            tileY: cfg.TILE_Y,
            baseX: cfg.BASE_X,
            baseY: cfg.BASE_Y,
            radius: cfg.FARM_RADIUS,
            timestamp: Date.now()
          }
        });
        window.dispatchEvent(event);
      }
      return true;
    }
    if (r.status === 403) {
      setStatus("\u26A0\uFE0F 403 (token expirado o Cloudflare). Reintentar\xE1...", "error");
    } else if (r.status === 401) {
      setStatus("\u{1F512} 401 (no autorizado). Verifica tu sesi\xF3n.", "error");
    } else if (r.status === 429) {
      setStatus("\u23F3 429 (l\xEDmite de tasa). Esperando...", "error");
    } else if (r.status === 408) {
      setStatus("\u23F0 Timeout del servidor. Coordenadas problem\xE1ticas o servidor sobrecargado", "error");
    } else if (r.status === 0) {
      setStatus("\u{1F310} Error de red. Verificando conectividad...", "error");
    } else if (r.status === 500) {
      setStatus("\u{1F525} 500 (error interno del servidor). Reintentar\xE1...", "error");
    } else if (r.status === 502 || r.status === 503 || r.status === 504) {
      setStatus(`\u{1F6AB} ${r.status} (servidor no disponible). Reintentar\xE1...`, "error");
    } else if (r.status === 404) {
      setStatus(`\u{1F5FA}\uFE0F 404 (tile no encontrado). Verificando coordenadas tile(${cfg.TILE_X},${cfg.TILE_Y})`, "error");
    } else {
      try {
        const health = await checkBackendHealth();
        const healthStatus = (health == null ? void 0 : health.up) ? "\u{1F7E2} Online" : "\u{1F534} Offline";
        setStatus(`\u274C Error ${r.status}: ${((_a = r.json) == null ? void 0 : _a.message) || ((_b = r.json) == null ? void 0 : _b.error) || "Fallo al pintar"} (Backend: ${healthStatus})`, "error");
      } catch {
        setStatus(`\u274C Error ${r.status}: ${((_c = r.json) == null ? void 0 : _c.message) || ((_d = r.json) == null ? void 0 : _d.error) || "Fallo al pintar"} (Health check fall\xF3)`, "error");
      }
    }
    log(`Fallo en pintado: status=${r.status}, json=`, r.json, "coords=", coords, "colors=", colors);
    return false;
  }
  async function paintWithRetry(cfg, state, setStatus, flashEffect, getSession2, checkBackendHealth) {
    const maxAttempts = 5;
    const baseDelay = 3e3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const success = await paintOnce(cfg, state, setStatus, flashEffect, getSession2, checkBackendHealth);
        if (success) {
          state.retryCount = 0;
          return true;
        }
        state.retryCount = attempt;
        if (attempt < maxAttempts) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          setStatus(`\u{1F504} Reintento ${attempt}/${maxAttempts} en ${delay / 1e3}s...`, "error");
          await sleep2(delay);
        }
      } catch (error) {
        log(`Error en intento ${attempt}:`, error);
        state.retryCount = attempt;
        if (attempt < maxAttempts) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          setStatus(`\u{1F4A5} Error en intento ${attempt}/${maxAttempts}, reintentando en ${delay / 1e3}s...`, "error");
          await sleep2(delay);
        }
      }
    }
    state.retryCount = maxAttempts;
    setStatus(`\u274C Fall\xF3 despu\xE9s de ${maxAttempts} intentos. Se requiere intervenci\xF3n manual.`, "error");
    return false;
  }
  async function loop(cfg, state, setStatus, flashEffect, getSession2, checkBackendHealth, updateStats) {
    log("\u{1F680} Loop iniciado");
    state.running = true;
    while (state.running) {
      try {
        await updateStats();
        if (state.charges.count < cfg.MIN_CHARGES) {
          const waitTime = Math.max(0, (cfg.MIN_CHARGES - state.charges.count) * cfg.CHARGE_REGEN_MS);
          setStatus(`\u23F3 Esperando cargas: ${state.charges.count.toFixed(1)}/${cfg.MIN_CHARGES} (${Math.round(waitTime / 1e3)}s)`, "status");
          await sleepWithCountdown(Math.min(waitTime, cfg.DELAY_MS), (remaining) => {
            setStatus(`\u23F3 Esperando cargas: ${state.charges.count.toFixed(1)}/${cfg.MIN_CHARGES} (~${Math.round(remaining / 1e3)}s)`, "status");
          }, state);
          continue;
        }
        const success = await paintWithRetry(cfg, state, setStatus, flashEffect, getSession2, checkBackendHealth);
        if (!success) {
          setStatus("\u{1F634} Esperando antes del siguiente intento...", "error");
          await sleepWithCountdown(cfg.DELAY_MS * 2, (remaining) => {
            setStatus(`\u{1F634} Cooldown extendido: ${Math.round(remaining / 1e3)}s`, "error");
          });
          continue;
        }
        if (state.running) {
          await sleepWithCountdown(cfg.DELAY_MS, (remaining) => {
            setStatus(`\u{1F4A4} Esperando ${Math.round(remaining / 1e3)}s hasta siguiente pintada...`, "status");
          });
        }
      } catch (error) {
        log("Error cr\xEDtico en loop:", error);
        setStatus(`\u{1F4A5} Error cr\xEDtico: ${error.message}`, "error");
        if (state.running) {
          await sleepWithCountdown(cfg.DELAY_MS * 3, (remaining) => {
            setStatus(`\u{1F6A8} Recuper\xE1ndose de error cr\xEDtico: ${Math.round(remaining / 1e3)}s`, "error");
          });
        }
      }
    }
    log("\u23F9\uFE0F Loop detenido");
    setStatus("\u23F9\uFE0F Bot detenido", "status");
  }

  // src/core/capture.js
  var CoordinateCapture = class {
    constructor() {
      this.active = false;
      this.originalFetch = window.fetch;
      this.callback = null;
    }
    // Habilitar captura de coordenadas por una vez
    enable(callback) {
      if (this.active) {
        log("\u26A0\uFE0F Captura ya est\xE1 activa");
        return;
      }
      this.active = true;
      this.callback = callback;
      log("\u{1F575}\uFE0F Captura de coordenadas activada. Pinta un p\xEDxel manualmente...");
      window.fetch = async (...args) => {
        const result = await this.originalFetch.apply(window, args);
        if (this.active && this.shouldCapture(args[0], args[1])) {
          await this.handleCapture(args[0], args[1], result.clone());
        }
        return result;
      };
      setTimeout(() => {
        if (this.active) {
          this.disable();
          log("\u23F0 Captura de coordenadas expirada");
        }
      }, 3e4);
    }
    // Verificar si debemos capturar esta petición
    shouldCapture(url, options) {
      if (!url || !options) return false;
      const urlStr = url.toString();
      if (!urlStr.includes("paint") && !urlStr.includes("pixel") && !urlStr.includes("place")) {
        return false;
      }
      if (!options.method || options.method.toUpperCase() !== "POST") {
        return false;
      }
      return true;
    }
    // Manejar la captura de coordenadas
    async handleCapture(url, options, response) {
      try {
        let coords = null;
        let tileX = null, tileY = null;
        if (options.body) {
          let body;
          if (typeof options.body === "string") {
            try {
              body = JSON.parse(options.body);
            } catch {
              body = options.body;
            }
          } else {
            body = options.body;
          }
          if (body.coords && Array.isArray(body.coords)) {
            coords = body.coords;
          } else if (body.x !== void 0 && body.y !== void 0) {
            coords = [body.x, body.y];
          } else if (body.coordinates) {
            coords = body.coordinates;
          }
        }
        const urlStr = url.toString();
        const tileMatch = urlStr.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);
        if (tileMatch) {
          tileX = parseInt(tileMatch[1]);
          tileY = parseInt(tileMatch[2]);
        }
        if (!coords) {
          const urlCoordMatch = urlStr.match(/[?&](?:x|coords?)=([^&]+)/);
          if (urlCoordMatch) {
            const coordStr = decodeURIComponent(urlCoordMatch[1]);
            try {
              coords = JSON.parse(coordStr);
            } catch {
              const parts = coordStr.split(",");
              if (parts.length >= 2) {
                coords = [parseInt(parts[0]), parseInt(parts[1])];
              }
            }
          }
        }
        if (coords && coords.length >= 2) {
          let globalX, globalY, localX, localY;
          if (Number.isInteger(tileX) && Number.isInteger(tileY)) {
            localX = coords[0];
            localY = coords[1];
            globalX = tileX * 3e3 + localX;
            globalY = tileY * 3e3 + localY;
            log(`\u{1F3AF} Coordenadas capturadas (locales): tile(${tileX},${tileY}) local(${localX},${localY}) -> global(${globalX},${globalY})`);
          } else {
            globalX = coords[0];
            globalY = coords[1];
            tileX = Math.floor(globalX / 3e3);
            tileY = Math.floor(globalY / 3e3);
            localX = globalX % 3e3;
            localY = globalY % 3e3;
            log(`\u{1F3AF} Coordenadas capturadas (globales): global(${globalX},${globalY}) -> tile(${tileX},${tileY}) local(${localX},${localY})`);
          }
          if (response.ok) {
            this.disable();
            if (this.callback) {
              this.callback({
                success: true,
                tileX,
                tileY,
                globalX,
                globalY,
                localX,
                localY
              });
            }
          } else {
            log("\u26A0\uFE0F Captura realizada pero la respuesta no fue exitosa");
          }
        }
      } catch (error) {
        log("Error procesando captura:", error);
      }
    }
    // Desactivar captura
    disable() {
      if (!this.active) return;
      this.active = false;
      window.fetch = this.originalFetch;
      this.callback = null;
      log("\u{1F512} Captura de coordenadas desactivada");
    }
  };
  var coordinateCapture = new CoordinateCapture();

  // src/core/dom.js
  function isPaletteOpen(debug = false) {
    const paletteSelectors = [
      '[data-testid="color-picker"]',
      ".color-picker",
      ".palette",
      '[class*="color"][class*="picker"]',
      '[class*="palette"]'
    ];
    for (const selector of paletteSelectors) {
      const element = document.querySelector(selector);
      if (element && element.offsetParent !== null) {
        if (debug) console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por selector: ${selector}`);
        return true;
      }
    }
    const colorElements = document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]');
    let visibleColors = 0;
    for (const el of colorElements) {
      if (el.offsetParent !== null && el.offsetWidth > 10 && el.offsetHeight > 10) {
        visibleColors++;
        if (visibleColors >= 5) {
          if (debug) console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por colores visibles: ${visibleColors}`);
          return true;
        }
      }
    }
    if (debug) console.log(`[WPA-UI] \u{1F50D} Paleta no detectada. Colores visibles: ${visibleColors}`);
    return false;
  }
  function findAndClickPaintButton(debug = false, doubleClick = false) {
    const specificButton = document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");
    if (specificButton) {
      const buttonText = specificButton.textContent.toLowerCase();
      const hasPaintText = buttonText.includes("paint") || buttonText.includes("pintar");
      const hasPaintIcon = specificButton.querySelector('svg path[d*="240-120"]') || specificButton.querySelector('svg path[d*="M15"]');
      if (hasPaintText || hasPaintIcon) {
        if (debug) console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por selector espec\xEDfico: "${buttonText}"`);
        specificButton.click();
        if (doubleClick) {
          setTimeout(() => {
            if (debug) console.log(`[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint`);
            specificButton.click();
          }, 500);
        }
        return true;
      }
    }
    const buttons = document.querySelectorAll("button");
    for (const button of buttons) {
      const buttonText = button.textContent.toLowerCase();
      if ((buttonText.includes("paint") || buttonText.includes("pintar")) && button.offsetParent !== null && !button.disabled) {
        if (debug) console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por texto: "${button.textContent.trim()}"`);
        button.click();
        if (doubleClick) {
          setTimeout(() => {
            if (debug) console.log(`[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint`);
            button.click();
          }, 500);
        }
        return true;
      }
    }
    if (debug) console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado`);
    return false;
  }
  async function autoClickPaintButton(maxAttempts = 3, debug = true) {
    if (debug) console.log(`[WPA-UI] \u{1F916} Iniciando auto-click del bot\xF3n Paint (m\xE1ximo ${maxAttempts} intentos)`);
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (debug) console.log(`[WPA-UI] \u{1F3AF} Intento ${attempt}/${maxAttempts} - Buscando bot\xF3n Paint...`);
      if (isPaletteOpen()) {
        if (debug) console.log(`[WPA-UI] \u2705 Paleta ya est\xE1 abierta, auto-click completado`);
        return true;
      }
      if (findAndClickPaintButton(debug, false)) {
        if (debug) console.log(`[WPA-UI] \u{1F446} Clic en bot\xF3n Paint realizado (sin segundo clic)`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (isPaletteOpen()) {
          if (debug) console.log(`[WPA-UI] \u2705 Paleta abierta exitosamente despu\xE9s del intento ${attempt}`);
          return true;
        } else {
          if (debug) console.log(`[WPA-UI] \u26A0\uFE0F Paleta no detectada tras el clic en intento ${attempt}. Reintentar\xE1.`);
        }
      } else {
        if (debug) console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado para clic en intento ${attempt}`);
      }
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      }
    }
    if (debug) console.log(`[WPA-UI] \u274C Auto-click fall\xF3 despu\xE9s de ${maxAttempts} intentos`);
    return false;
  }

  // src/entries/farm.js
  (async function() {
    "use strict";
    var _a, _b;
    await initializeLanguage();
    try {
      log("\u{1F916} [FARM] Iniciando auto-click del bot\xF3n Paint...");
      await autoClickPaintButton(3, true);
    } catch (error) {
      log("\u26A0\uFE0F [FARM] Error en auto-click del bot\xF3n Paint:", error);
    }
    if ((_a = window.__wplaceBot) == null ? void 0 : _a.farmRunning) {
      alert(t("farm.alreadyRunning", "Auto-Farm ya est\xE1 corriendo."));
      return;
    }
    if ((_b = window.__wplaceBot) == null ? void 0 : _b.imageRunning) {
      alert(t("farm.imageRunningWarning", "Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm."));
      return;
    }
    if (!window.__wplaceBot) {
      window.__wplaceBot = {};
    }
    window.__wplaceBot.farmRunning = true;
    window.addEventListener("languageChanged", () => {
      var _a2, _b2;
      if ((_b2 = (_a2 = window.__wplaceBot) == null ? void 0 : _a2.ui) == null ? void 0 : _b2.updateTexts) {
        window.__wplaceBot.ui.updateTexts();
      }
    });
    log("\u{1F680} Iniciando WPlace Farm Bot (versi\xF3n modular)");
    function needsCalibrationCheck(cfg2) {
      const hasSelectedZone = !!cfg2.POSITION_SELECTED && cfg2.BASE_X != null && cfg2.BASE_Y != null;
      const hasDefaultCoords = cfg2.TILE_X === FARM_DEFAULTS.TILE_X && cfg2.TILE_Y === FARM_DEFAULTS.TILE_Y;
      const hasInvalidCoords = !Number.isFinite(cfg2.TILE_X) || !Number.isFinite(cfg2.TILE_Y);
      const needsCalib = !hasSelectedZone && (hasDefaultCoords || hasInvalidCoords);
      log(`Verificaci\xF3n calibraci\xF3n: defaults=${hasDefaultCoords}, selected=${hasSelectedZone}, invalid=${hasInvalidCoords}, coords=(${cfg2.TILE_X},${cfg2.TILE_Y})`);
      return needsCalib;
    }
    function enableCaptureOnce() {
      log("\u{1F575}\uFE0F Activando captura de coordenadas...");
      coordinateCapture.enable((result) => {
        if (result.success) {
          cfg.TILE_X = result.tileX;
          cfg.TILE_Y = result.tileY;
          saveFarmCfg(cfg);
          ui.updateConfig();
          ui.setStatus(`\u{1F3AF} Coordenadas capturadas: tile(${result.tileX},${result.tileY})`, "success");
          log(`\u2705 Coordenadas capturadas autom\xE1ticamente: tile(${result.tileX},${result.tileY})`);
        } else {
          ui.setStatus(`\u274C ${t("common.error", "No se pudieron capturar coordenadas")}`, "error");
        }
      });
      ui.setStatus(`\u{1F4F8} ${t("farm.captureInstructions")}`, "status");
    }
    let cfg = { ...FARM_DEFAULTS, ...loadFarmCfg(FARM_DEFAULTS) };
    if (!cfg.SITEKEY) {
      const siteKeyElement = document.querySelector("*[data-sitekey]");
      if (siteKeyElement) {
        cfg.SITEKEY = siteKeyElement.getAttribute("data-sitekey");
        log(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${cfg.SITEKEY.substring(0, 20)}...`);
        saveFarmCfg(cfg);
      } else {
        log("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente");
      }
    }
    async function updateStats() {
      try {
        const session = await getSession();
        if (session.success && session.data) {
          farmState.charges.count = session.data.charges || 0;
          farmState.charges.max = session.data.maxCharges || 50;
          farmState.charges.regen = session.data.chargeRegen || 3e4;
          farmState.user = session.data.user;
          cfg.CHARGE_REGEN_MS = farmState.charges.regen;
          const health = await checkBackendHealth();
          farmState.health = health;
          ui.updateStats(farmState.painted, farmState.charges.count, farmState.retryCount, health);
          return session.data;
        }
        return null;
      } catch (error) {
        log("Error actualizando estad\xEDsticas:", error);
        return null;
      }
    }
    async function checkBackendHealth() {
      try {
        return await checkHealth();
      } catch (error) {
        log("Error verificando health:", error);
        return { up: false, error: error.message };
      }
    }
    async function paintOnceWrapper() {
      return await paintWithRetry(cfg, farmState, ui.setStatus, ui.flashEffect, () => getSession(), checkBackendHealth);
    }
    const ui = createFarmUI(
      cfg,
      // onStart
      async () => {
        if (farmState.running) {
          ui.setStatus("\u26A0\uFE0F El bot ya est\xE1 ejecut\xE1ndose", "error");
          return;
        }
        if (!cfg.POSITION_SELECTED || cfg.BASE_X === null || cfg.BASE_Y === null) {
          ui.setStatus(t("farm.autoSelectPosition"), "info");
          const selectButton = ui.getElement().shadowRoot.getElementById("select-position-btn");
          if (selectButton) {
            selectButton.click();
          }
          return;
        }
        if (needsCalibrationCheck(cfg)) {
          ui.setStatus("\u{1F3AF} Calibrando autom\xE1ticamente...", "status");
          const calibration = await autoCalibrateTile(cfg);
          if (calibration.success) {
            ui.setStatus(`\u2705 Calibrado: tile(${calibration.tileX},${calibration.tileY})`, "success");
            ui.updateConfig();
          } else {
            ui.setStatus("\u274C Error en calibraci\xF3n. Configura manualmente.", "error");
            return;
          }
        }
        ui.setStatus("\u{1F50D} Verificando conectividad...", "status");
        const health = await checkBackendHealth();
        if (!health.up) {
          ui.setStatus("\u{1F534} Backend no disponible. Verifica tu conexi\xF3n.", "error");
          return;
        }
        ui.setStatus("\u{1F504} Obteniendo informaci\xF3n de sesi\xF3n...", "status");
        const sessionData = await updateStats();
        if (!sessionData) {
          ui.setStatus("\u274C Error obteniendo sesi\xF3n. Verifica tu login.", "error");
          return;
        }
        ui.setStatus("\u{1F680} Iniciando bot...", "status");
        ui.updateButtonStates(true);
        loop(cfg, farmState, ui.setStatus, ui.flashEffect, updateStats, checkBackendHealth, updateStats);
      },
      // onStop
      () => {
        farmState.running = false;
        if (window.__wplaceBot) {
          window.__wplaceBot.farmRunning = false;
        }
        ui.setStatus("\u23F9\uFE0F Deteniendo bot...", "status");
        ui.updateButtonStates(false);
      },
      // onCalibrate
      async () => {
        ui.setStatus("\u{1F3AF} Calibrando posici\xF3n...", "status");
        const calibration = await autoCalibrateTile(cfg);
        if (calibration.success) {
          ui.setStatus(`\u2705 Calibrado: tile(${calibration.tileX},${calibration.tileY})`, "success");
          ui.updateConfig();
        } else {
          ui.setStatus(`\u274C Error en calibraci\xF3n: ${calibration.error || "Desconocido"}`, "error");
        }
      }
    );
    const captureBtn = ui.getElement().shadowRoot.getElementById("capture-btn");
    if (captureBtn) {
      captureBtn.addEventListener("click", enableCaptureOnce);
    }
    const onceBtn = ui.getElement().shadowRoot.getElementById("once-btn");
    if (onceBtn) {
      onceBtn.addEventListener("click", async () => {
        if (farmState.running) {
          ui.setStatus("\u26A0\uFE0F Det\xE9n el bot primero", "error");
          return;
        }
        await updateStats();
        ui.setStatus("\u{1F3A8} Pintando una vez...", "status");
        const success = await paintOnceWrapper();
        if (success) {
          ui.setStatus("\u2705 P\xEDxel pintado exitosamente", "success");
        } else {
          ui.setStatus("\u274C Error al pintar p\xEDxel", "error");
        }
      });
    }
    await updateStats();
    window.addEventListener("wplace-batch-painted", (event) => {
      log(`\u{1F3A8} Lote pintado: ${event.detail.pixelCount} p\xEDxeles en tile(${event.detail.tileX},${event.detail.tileY})`);
    });
    window.WPAUI = {
      once: paintOnceWrapper,
      get: () => ({ ...cfg }),
      capture: enableCaptureOnce,
      refreshCanvas: () => {
        if (farmState.last) {
          log(`Refrescando canvas en posici\xF3n (${farmState.last.x},${farmState.last.y})`);
        }
      },
      verifyPixel: async (x, y) => {
        log(`Verificando p\xEDxel en (${x},${y})...`);
        return { verified: true, x, y };
      },
      getStats: () => ({
        painted: farmState.painted,
        last: farmState.last,
        charges: farmState.charges,
        user: farmState.user,
        running: farmState.running,
        minCharges: cfg.MIN_CHARGES,
        delay: cfg.DELAY_MS,
        tileInfo: {
          tileX: cfg.TILE_X,
          tileY: cfg.TILE_Y,
          tileSize: cfg.TILE_SIZE,
          safeMargin: Math.floor(cfg.TILE_SIZE * 0.05),
          safeArea: {
            minX: Math.floor(cfg.TILE_SIZE * 0.05),
            maxX: cfg.TILE_SIZE - Math.floor(cfg.TILE_SIZE * 0.05) - 1,
            minY: Math.floor(cfg.TILE_SIZE * 0.05),
            maxY: cfg.TILE_SIZE - Math.floor(cfg.TILE_SIZE * 0.05) - 1
          }
        }
      }),
      setPixelsPerBatch: (count) => {
        cfg.PIXELS_PER_BATCH = clamp(count, 1, 50);
        saveFarmCfg(cfg);
        ui.updateConfig();
        log(`P\xEDxeles por lote configurado a: ${cfg.PIXELS_PER_BATCH}`);
      },
      setMinCharges: (min) => {
        cfg.MIN_CHARGES = Math.max(0, min);
        saveFarmCfg(cfg);
        ui.updateConfig();
        log(`Cargas m\xEDnimas configuradas a: ${cfg.MIN_CHARGES}`);
      },
      setDelay: (seconds) => {
        cfg.DELAY_MS = Math.max(1e3, seconds * 1e3);
        saveFarmCfg(cfg);
        ui.updateConfig();
        log(`Delay configurado a: ${cfg.DELAY_MS}ms`);
      },
      diagnose: () => {
        var _a2;
        const stats = window.WPAUI.getStats();
        const diagnosis = {
          configValid: Number.isFinite(cfg.TILE_X) && Number.isFinite(cfg.TILE_Y),
          hasCharges: farmState.charges.count > 0,
          backendHealthy: ((_a2 = farmState.health) == null ? void 0 : _a2.up) || false,
          userLoggedIn: !!farmState.user,
          coordinates: `(${cfg.TILE_X},${cfg.TILE_Y})`,
          safeArea: stats.tileInfo.safeArea,
          recommendations: []
        };
        if (!diagnosis.configValid) {
          diagnosis.recommendations.push("Calibrar coordenadas del tile");
        }
        if (!diagnosis.hasCharges) {
          diagnosis.recommendations.push("Esperar a que se regeneren las cargas");
        }
        if (!diagnosis.backendHealthy) {
          diagnosis.recommendations.push("Verificar conexi\xF3n al backend");
        }
        if (!diagnosis.userLoggedIn) {
          diagnosis.recommendations.push("Iniciar sesi\xF3n en la plataforma");
        }
        console.table(diagnosis);
        return diagnosis;
      },
      checkHealth: checkBackendHealth,
      resetConfig: () => {
        resetToSafeDefaults();
        cfg = { ...FARM_DEFAULTS };
        ui.updateConfig();
        log("Configuraci\xF3n reseteada a valores por defecto");
      },
      debugRetries: () => {
        return {
          currentRetries: farmState.retryCount,
          inCooldown: farmState.inCooldown,
          nextPaintTime: farmState.nextPaintTime,
          cooldownEndTime: farmState.cooldownEndTime
        };
      },
      forceClearCooldown: () => {
        farmState.inCooldown = false;
        farmState.nextPaintTime = 0;
        farmState.cooldownEndTime = 0;
        farmState.retryCount = 0;
        log("Cooldown forzado a limpiar");
      },
      simulateError: (statusCode = 500) => {
        log(`Simulando error ${statusCode} para testing...`);
        ui.setStatus(`\u{1F9EA} Simulando error ${statusCode}`, "error");
      }
    };
    window.addEventListener("beforeunload", () => {
      farmState.running = false;
      if (window.__wplaceBot) {
        window.__wplaceBot.farmRunning = false;
      }
      coordinateCapture.disable();
      ui.destroy();
    });
    log("\u2705 Farm Bot inicializado correctamente");
    log("\u{1F4A1} Usa console.log(window.WPAUI) para ver la API disponible");
  })().catch((e) => {
    console.error("[BOT] Error en Auto-Farm:", e);
    if (window.__wplaceBot) {
      window.__wplaceBot.farmRunning = false;
    }
    alert("Auto-Farm: error inesperado. Revisa consola.");
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvbG9nZ2VyLmpzIiwgInNyYy9mYXJtL2NvbmZpZy5qcyIsICJzcmMvY29yZS9zdG9yYWdlLmpzIiwgInNyYy9jb3JlL3R1cm5zdGlsZS5qcyIsICJzcmMvY29yZS93cGxhY2UtYXBpLmpzIiwgInNyYy9jb3JlL3V0aWxzLmpzIiwgInNyYy9sb2NhbGVzL2VzLmpzIiwgInNyYy9sb2NhbGVzL2VuLmpzIiwgInNyYy9sb2NhbGVzL2ZyLmpzIiwgInNyYy9sb2NhbGVzL3J1LmpzIiwgInNyYy9sb2NhbGVzL3poLUhhbnMuanMiLCAic3JjL2xvY2FsZXMvemgtSGFudC5qcyIsICJzcmMvbG9jYWxlcy9pbmRleC5qcyIsICJzcmMvbG9nX3dpbmRvdy9sb2ctd2luZG93LmpzIiwgInNyYy9mYXJtL3VpLmpzIiwgInNyYy9mYXJtL2Nvb3Jkcy5qcyIsICJzcmMvY29yZS90aW1pbmcuanMiLCAic3JjL2Zhcm0vbG9vcC5qcyIsICJzcmMvY29yZS9jYXB0dXJlLmpzIiwgInNyYy9jb3JlL2RvbS5qcyIsICJzcmMvZW50cmllcy9mYXJtLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY29uc3QgbG9nZ2VyID0ge1xuICBkZWJ1Z0VuYWJsZWQ6IGZhbHNlLFxuICBzZXREZWJ1Zyh2KSB7IHRoaXMuZGVidWdFbmFibGVkID0gISF2OyB9LFxuICBkZWJ1ZyguLi5hKSB7IGlmICh0aGlzLmRlYnVnRW5hYmxlZCkgY29uc29sZS5kZWJ1ZyhcIltCT1RdXCIsIC4uLmEpOyB9LFxuICBpbmZvKC4uLmEpICB7IGNvbnNvbGUuaW5mbyhcIltCT1RdXCIsIC4uLmEpOyB9LFxuICB3YXJuKC4uLmEpICB7IGNvbnNvbGUud2FybihcIltCT1RdXCIsIC4uLmEpOyB9LFxuICBlcnJvciguLi5hKSB7IGNvbnNvbGUuZXJyb3IoXCJbQk9UXVwiLCAuLi5hKTsgfVxufTtcblxuLy8gRmFybS1zcGVjaWZpYyBsb2dnZXJcbmV4cG9ydCBjb25zdCBsb2cgPSAoLi4uYSkgPT4gY29uc29sZS5sb2coJ1tXUEEtVUldJywgLi4uYSk7XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5leHBvcnQgY29uc3Qgbm9vcCA9ICgpID0+IHsgLyogRnVuY2lcdTAwRjNuIHZhY1x1MDBFRGEgaW50ZW5jaW9uYWwgKi8gfTtcbmV4cG9ydCBjb25zdCBjbGFtcCA9IChuLCBhLCBiKSA9PiBNYXRoLm1heChhLCBNYXRoLm1pbihiLCBuKSk7XG4iLCAiLy8gQ29uZmlndXJhY2lcdTAwRjNuIHBvciBkZWZlY3RvIHBhcmEgV1BsYWNlIEF1dG9GYXJtXG5leHBvcnQgY29uc3QgRkFSTV9ERUZBVUxUUyA9IHtcbiAgU0lURUtFWTogJzB4NEFBQUFBQUJwcUplOEZPME44NHEwRicsIC8vIFR1cm5zdGlsZSBzaXRla2V5IChhalx1MDBGQXN0YWxvIHNpIGNhbWJpYSlcbiAgVElMRV9YOiAxMDg2LFxuICBUSUxFX1k6IDE1NjUsXG4gIFRJTEVfU0laRTogMzAwMCwgICAgICAgICAvLyBUaWxlcyBzb24gZGUgfjMwMDB4MzAwMCBzZWdcdTAwRkFuIGludmVzdGlnYWNpXHUwMEYzblxuICBERUxBWV9NUzogMTUwMDAsICAgICAgICAgLy8gMTUgc2VndW5kb3MgZW50cmUgcGludGFkYXMgKHByZWRldGVybWluYWRvKVxuICBNSU5fQ0hBUkdFUzogMTAsICAgICAgICAgLy8gbVx1MDBFRG5pbW8gZGUgY2FyZ2FzIHBhcmEgZW1wZXphciBhIHBpbnRhclxuICBDSEFSR0VfUkVHRU5fTVM6IDMwMDAwLCAgLy8gMSBjYXJnYSBjYWRhIDMwIHNlZ3VuZG9zXG4gIFBJWEVMU19QRVJfQkFUQ0g6IDIwLCAgICAvLyBuXHUwMEZBbWVybyBkZSBwXHUwMEVEeGVsZXMgYSBwaW50YXIgcG9yIGxvdGVcbiAgQ09MT1JfTUlOOiAxLFxuICBDT0xPUl9NQVg6IDMyLFxuICBDT0xPUl9NT0RFOiAncmFuZG9tJywgICAgLy8gJ3JhbmRvbScgfCAnZml4ZWQnXG4gIENPTE9SX0ZJWEVEOiAxLFxuICBDVVNUT01fUEFMRVRURTogWycjRkYwMDAwJywgJyMwMEZGMDAnLCAnIzAwMDBGRicsICcjRkZGRjAwJywgJyNGRjAwRkYnLCAnIzAwRkZGRiddLFxuICAvLyBOdWV2YSBmdW5jaW9uYWxpZGFkIGRlIHBvc2ljaVx1MDBGM24geSByYWRpb1xuICBCQVNFX1g6IG51bGwsICAgICAgICAgICAgLy8gUG9zaWNpXHUwMEYzbiBYIGJhc2UgKGxvY2FsIGFsIHRpbGUpIC0gc2UgZXN0YWJsZWNlIGFsIHNlbGVjY2lvbmFyIHpvbmFcbiAgQkFTRV9ZOiBudWxsLCAgICAgICAgICAgIC8vIFBvc2ljaVx1MDBGM24gWSBiYXNlIChsb2NhbCBhbCB0aWxlKSAtIHNlIGVzdGFibGVjZSBhbCBzZWxlY2Npb25hciB6b25hXG4gIEZBUk1fUkFESVVTOiA1MDAsICAgICAgICAvLyBSYWRpbyBkZSBmYXJtaW5nIGVuIHBcdTAwRUR4ZWxlcyAoNTAwcHggcG9yIGRlZmVjdG8gcGFyYSB6b25hIHNlZ3VyYSlcbiAgUE9TSVRJT05fU0VMRUNURUQ6IGZhbHNlLCAvLyBGbGFnIHBhcmEgaW5kaWNhciBzaSBzZSBzZWxlY2Npb25cdTAwRjMgdW5hIHBvc2ljaVx1MDBGM25cbiAgVUlfVEhFTUU6IHtcbiAgICBwcmltYXJ5OiAnIzAwMDAwMCcsXG4gICAgc2Vjb25kYXJ5OiAnIzExMTExMScsXG4gICAgYWNjZW50OiAnIzIyMjIyMicsXG4gICAgdGV4dDogJyNmZmZmZmYnLFxuICAgIGhpZ2hsaWdodDogJyM3NzVjZTMnLFxuICAgIHN1Y2Nlc3M6ICcjMDBmZjAwJyxcbiAgICBlcnJvcjogJyNmZjAwMDAnLFxuICAgIHJ1bm5pbmc6ICcjMDBjYzAwJyAgICAgLy8gVmVyZGUgcGFyYSBjdWFuZG8gZXN0XHUwMEUxIGNvcnJpZW5kb1xuICB9XG59O1xuXG4vLyBFc3RhZG8gZ2xvYmFsIGRlbCBmYXJtXG5leHBvcnQgY29uc3QgZmFybVN0YXRlID0ge1xuICBydW5uaW5nOiBmYWxzZSxcbiAgcGFpbnRlZDogMCxcbiAgbGFzdDogbnVsbCwgICAgICAgICAgLy8ge3gseSxjb2xvcixzdGF0dXMsanNvbn1cbiAgY2hhcmdlczogeyBjb3VudDogMCwgbWF4OiAwLCBjb29sZG93bk1zOiAzMDAwMCB9LFxuICB1c2VyOiBudWxsLFxuICBwYW5lbDogbnVsbCxcbiAgY2FwdHVyZU1vZGU6IGZhbHNlLCAgLy8gc25pZmZlciBhY3Rpdm8gcGFyYSBjYXB0dXJhciBUSUxFX1gvWSBkZXNkZSB1biBQT1NUIHJlYWxcbiAgc2VsZWN0aW5nUG9zaXRpb246IGZhbHNlLCAvLyBzbmlmZmVyIGFjdGl2byBwYXJhIGNhcHR1cmFyIHBvc2ljaVx1MDBGM24gYmFzZVxuICBvcmlnaW5hbEZldGNoOiB3aW5kb3cuZmV0Y2gsXG4gIHJldHJ5Q291bnQ6IDAsICAgICAgIC8vIGNvbnRhZG9yIGRlIHJlaW50ZW50b3NcbiAgaW5Db29sZG93bjogZmFsc2UsICAgLy8gc2kgZXN0XHUwMEUxIGVuIGNvb2xkb3duIGRlIDIgbWludXRvc1xuICBuZXh0UGFpbnRUaW1lOiAwLCAgICAvLyB0aW1lc3RhbXAgZGUgbGEgcHJcdTAwRjN4aW1hIHBpbnRhZGFcbiAgY29vbGRvd25FbmRUaW1lOiAwLCAgLy8gdGltZXN0YW1wIGRlbCBmaW5hbCBkZWwgY29vbGRvd25cbiAgaGVhbHRoOiBudWxsICAgICAgICAgLy8gZXN0YWRvIGRlIHNhbHVkIGRlbCBiYWNrZW5kXG59O1xuIiwgImV4cG9ydCBmdW5jdGlvbiBsb2FkKGtleSwgZmFsbGJhY2spIHtcbiAgLy8gTm8gdXNhciBsb2NhbFN0b3JhZ2UgLSBzaWVtcHJlIHJldG9ybmFyIGZhbGxiYWNrXG4gIHJldHVybiBmYWxsYmFjaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmUoa2V5LCB2YWx1ZSkge1xuICAvLyBObyBndWFyZGFyIGVuIGxvY2FsU3RvcmFnZSAtIGZ1bmNpXHUwMEYzbiBkZXNoYWJpbGl0YWRhXG4gIHJldHVybjtcbn1cblxuLy8gRmFybS1zcGVjaWZpYyBzdG9yYWdlIGZ1bmN0aW9uc1xuZXhwb3J0IGZ1bmN0aW9uIHNhdmVGYXJtQ2ZnKGNmZykgeyBcbiAgLy8gTm8gZ3VhcmRhciBlbiBsb2NhbFN0b3JhZ2UgLSBmdW5jaVx1MDBGM24gZGVzaGFiaWxpdGFkYVxuICByZXR1cm47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmFybUNmZyhkZWZhdWx0cykge1xuICAvLyBObyBjYXJnYXIgZGUgbG9jYWxTdG9yYWdlIC0gc2llbXByZSB1c2FyIGRlZmF1bHRzXG4gIHJldHVybiB7IC4uLmRlZmF1bHRzIH07XG59XG5cbi8vIFJlc2V0ZWFyIGNvbmZpZ3VyYWNpXHUwMEYzbiBkZWwgZmFybVxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0RmFybUNmZygpIHtcbiAgLy8gTm8gaGF5IGxvY2FsU3RvcmFnZSBxdWUgcmVzZXRlYXIgLSBmdW5jaVx1MDBGM24gZGVzaGFiaWxpdGFkYVxuICBjb25zb2xlLmxvZygnW1dQQS1VSV0nLCAnQ29uZmlndXJhY2lcdTAwRjNuIGRlbCBmYXJtIHJlc2V0ZWFkYSAobG9jYWxTdG9yYWdlIGRlc2hhYmlsaXRhZG8pJyk7XG59XG5cbi8vIFJlc2V0ZWFyIGEgY29uZmlndXJhY2lcdTAwRjNuIHNlZ3VyYVxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VG9TYWZlRGVmYXVsdHMoKSB7XG4gIC8vIE5vIGhheSBsb2NhbFN0b3JhZ2UgcXVlIHJlc2V0ZWFyIC0gZnVuY2lcdTAwRjNuIGRlc2hhYmlsaXRhZGFcbiAgY29uc29sZS5sb2coJ1tXUEEtVUldJywgJ0NvbmZpZ3VyYWNpXHUwMEYzbiByZXNldGVhZGEgYSB2YWxvcmVzIHNlZ3Vyb3MgKGxvY2FsU3RvcmFnZSBkZXNoYWJpbGl0YWRvKScpO1xufVxuXG4vLyBWZXJpZmljYXIgc2kgbmVjZXNpdGEgY2FsaWJyYWNpXHUwMEYzbiBpbmljaWFsXG5leHBvcnQgZnVuY3Rpb24gbmVlZHNDYWxpYnJhdGlvbihjZmcsIGRlZmF1bHRzKSB7XG4gIC8vIFZlcmlmaWNhciBzaSBsYXMgY29vcmRlbmFkYXMgc29uIGxhcyBwb3IgZGVmZWN0b1xuICBjb25zdCBoYXNEZWZhdWx0Q29vcmRzID0gY2ZnLlRJTEVfWCA9PT0gZGVmYXVsdHMuVElMRV9YICYmIGNmZy5USUxFX1kgPT09IGRlZmF1bHRzLlRJTEVfWTtcbiAgLy8gU2luIGxvY2FsU3RvcmFnZSwgc2llbXByZSBjb25zaWRlcmFtb3MgcXVlIG5vIGhheSBjb25maWd1cmFjaVx1MDBGM24gZ3VhcmRhZGFcbiAgY29uc3QgaGFzTm9TYXZlZENvbmZpZyA9IHRydWU7XG4gIC8vIFZlcmlmaWNhciBxdWUgbGFzIGNvb3JkZW5hZGFzIHNlYW4gblx1MDBGQW1lcm9zIHZcdTAwRTFsaWRvc1xuICBjb25zdCBoYXNJbnZhbGlkQ29vcmRzID0gIU51bWJlci5pc0Zpbml0ZShjZmcuVElMRV9YKSB8fCAhTnVtYmVyLmlzRmluaXRlKGNmZy5USUxFX1kpO1xuICBcbiAgY29uc3QgbmVlZHNDYWxpYiA9IGhhc0RlZmF1bHRDb29yZHMgfHwgaGFzTm9TYXZlZENvbmZpZyB8fCBoYXNJbnZhbGlkQ29vcmRzO1xuICBjb25zb2xlLmxvZygnW1dQQS1VSV0nLCBgVmVyaWZpY2FjaVx1MDBGM24gY2FsaWJyYWNpXHUwMEYzbjogZGVmYXVsdHM9JHtoYXNEZWZhdWx0Q29vcmRzfSwgbm9Db25maWc9JHtoYXNOb1NhdmVkQ29uZmlnfSwgaW52YWxpZD0ke2hhc0ludmFsaWRDb29yZHN9LCBjb29yZHM9KCR7Y2ZnLlRJTEVfWH0sJHtjZmcuVElMRV9ZfSlgKTtcbiAgXG4gIHJldHVybiBuZWVkc0NhbGliO1xufVxuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlci5qc1wiO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBUVVJOU1RJTEUgVE9LRU4gTUFOQUdFTUVOVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyBPcHRpbWl6ZWQgVHVybnN0aWxlIHRva2VuIGhhbmRsaW5nIHdpdGggY2FjaGluZyBhbmQgcmV0cnkgbG9naWNcbmxldCB0dXJuc3RpbGVUb2tlbiA9IG51bGw7XG5sZXQgdG9rZW5FeHBpcnlUaW1lID0gMDtcbmxldCB0b2tlbkdlbmVyYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG5sZXQgX3Jlc29sdmVUb2tlbiA9IG51bGw7XG5sZXQgdG9rZW5Qcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHsgX3Jlc29sdmVUb2tlbiA9IHJlc29sdmUgfSk7XG5jb25zdCBUT0tFTl9MSUZFVElNRSA9IDI0MDAwMDsgLy8gNCBtaW51dGVzICh0b2tlbnMgdHlwaWNhbGx5IGxhc3QgNSBtaW4sIHVzZSA0IGZvciBzYWZldHkpXG5cbi8vIFR1cm5zdGlsZSB3aWRnZXQgbWFuYWdlbWVudCAocmVwbGljYXRlZCBmcm9tIGV4YW1wbGUpXG5sZXQgX3R1cm5zdGlsZVdpZGdldElkID0gbnVsbDtcbmxldCBfdHVybnN0aWxlQ29udGFpbmVyID0gbnVsbDtcbmxldCBfdHVybnN0aWxlT3ZlcmxheSA9IG51bGw7XG5sZXQgX2xhc3RTaXRla2V5ID0gbnVsbDtcbmxldCBfY2FjaGVkU2l0ZWtleSA9IG51bGw7XG5cbmZ1bmN0aW9uIHNldFR1cm5zdGlsZVRva2VuKHQpIHtcbiAgaWYgKF9yZXNvbHZlVG9rZW4pIHtcbiAgICBfcmVzb2x2ZVRva2VuKHQpO1xuICAgIF9yZXNvbHZlVG9rZW4gPSBudWxsO1xuICB9XG4gIHR1cm5zdGlsZVRva2VuID0gdDtcbiAgdG9rZW5FeHBpcnlUaW1lID0gRGF0ZS5ub3coKSArIFRPS0VOX0xJRkVUSU1FO1xuICBsb2coXCJcdTI3MDUgVHVybnN0aWxlIHRva2VuIHNldCBzdWNjZXNzZnVsbHlcIik7XG59XG5cbmZ1bmN0aW9uIGlzVG9rZW5WYWxpZCgpIHtcbiAgcmV0dXJuIHR1cm5zdGlsZVRva2VuICYmIERhdGUubm93KCkgPCB0b2tlbkV4cGlyeVRpbWU7XG59XG5cbi8vIEZvcmNlIHRva2VuIGludmFsaWRhdGlvbiAoZm9yIDQwMyBlcnJvcnMpXG5mdW5jdGlvbiBpbnZhbGlkYXRlVG9rZW4oKSB7XG4gIHR1cm5zdGlsZVRva2VuID0gbnVsbDtcbiAgdG9rZW5FeHBpcnlUaW1lID0gMDtcbiAgbG9nKFwiXHVEODNEXHVEREQxXHVGRTBGIFRva2VuIGludmFsaWRhdGVkLCB3aWxsIGZvcmNlIGZyZXNoIGdlbmVyYXRpb25cIik7XG59XG5cbi8vIE1haW4gdG9rZW4gZnVuY3Rpb24gLSByZXBsaWNhdGVkIGZyb20gZXhhbXBsZVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZVRva2VuKGZvcmNlTmV3ID0gZmFsc2UpIHtcbiAgLy8gUmV0dXJuIGNhY2hlZCB0b2tlbiBpZiBzdGlsbCB2YWxpZCBhbmQgbm90IGZvcmNpbmcgbmV3XG4gIGlmIChpc1Rva2VuVmFsaWQoKSAmJiAhZm9yY2VOZXcpIHtcbiAgICByZXR1cm4gdHVybnN0aWxlVG9rZW47XG4gIH1cblxuICAvLyBJZiBmb3JjaW5nIG5ldywgaW52YWxpZGF0ZSBjdXJyZW50IHRva2VuXG4gIGlmIChmb3JjZU5ldykge1xuICAgIGludmFsaWRhdGVUb2tlbigpO1xuICB9XG5cbiAgLy8gQXZvaWQgbXVsdGlwbGUgc2ltdWx0YW5lb3VzIHRva2VuIGdlbmVyYXRpb25zXG4gIGlmICh0b2tlbkdlbmVyYXRpb25JblByb2dyZXNzKSB7XG4gICAgbG9nKFwiXHVEODNEXHVERDA0IFRva2VuIGdlbmVyYXRpb24gYWxyZWFkeSBpbiBwcm9ncmVzcywgd2FpdGluZy4uLlwiKTtcbiAgICBhd2FpdCBzbGVlcCgyMDAwKTtcbiAgICByZXR1cm4gaXNUb2tlblZhbGlkKCkgPyB0dXJuc3RpbGVUb2tlbiA6IG51bGw7XG4gIH1cblxuICB0b2tlbkdlbmVyYXRpb25JblByb2dyZXNzID0gdHJ1ZTtcbiAgXG4gIHRyeSB7XG4gICAgbG9nKFwiXHVEODNEXHVERDA0IFRva2VuIGV4cGlyZWQgb3IgbWlzc2luZywgZ2VuZXJhdGluZyBuZXcgb25lLi4uXCIpO1xuICAgIFxuICAgIC8vIEZpcnN0IHRyeSBpbnZpc2libGUgVHVybnN0aWxlXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBoYW5kbGVDYXB0Y2hhKCk7XG4gICAgaWYgKHRva2VuICYmIHRva2VuLmxlbmd0aCA+IDIwKSB7XG4gICAgICBzZXRUdXJuc3RpbGVUb2tlbih0b2tlbik7XG4gICAgICBsb2coXCJcdTI3MDUgVG9rZW4gY2FwdHVyZWQgYW5kIGNhY2hlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICAgIFxuICAgIC8vIElmIGludmlzaWJsZSBmYWlscywgZm9yY2UgYnJvd3NlciBhdXRvbWF0aW9uXG4gICAgbG9nKFwiXHUyNkEwXHVGRTBGIEludmlzaWJsZSBUdXJuc3RpbGUgZmFpbGVkLCBmb3JjaW5nIGJyb3dzZXIgYXV0b21hdGlvbi4uLlwiKTtcbiAgICBjb25zdCBmYWxsYmFja1Rva2VuID0gYXdhaXQgaGFuZGxlQ2FwdGNoYUZhbGxiYWNrKCk7XG4gICAgaWYgKGZhbGxiYWNrVG9rZW4gJiYgZmFsbGJhY2tUb2tlbi5sZW5ndGggPiAyMCkge1xuICAgICAgc2V0VHVybnN0aWxlVG9rZW4oZmFsbGJhY2tUb2tlbik7XG4gICAgICBsb2coXCJcdTI3MDUgRmFsbGJhY2sgdG9rZW4gY2FwdHVyZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgcmV0dXJuIGZhbGxiYWNrVG9rZW47XG4gICAgfVxuICAgIFxuICAgIGxvZyhcIlx1Mjc0QyBBbGwgdG9rZW4gZ2VuZXJhdGlvbiBtZXRob2RzIGZhaWxlZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBmaW5hbGx5IHtcbiAgICB0b2tlbkdlbmVyYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG4gIH1cbn1cblxuLy8gTWFpbiBjYXB0Y2hhIGhhbmRsZXIgLSByZXBsaWNhdGVkIGZyb20gZXhhbXBsZVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ2FwdGNoYSgpIHtcbiAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgdHJ5IHtcbiAgICAvLyBVc2Ugb3B0aW1pemVkIHRva2VuIGdlbmVyYXRpb24gd2l0aCBhdXRvbWF0aWMgc2l0ZWtleSBkZXRlY3Rpb25cbiAgICBjb25zdCBzaXRla2V5ID0gZGV0ZWN0U2l0ZWtleSgpO1xuICAgIGxvZyhcIlx1RDgzRFx1REQxMSBHZW5lcmF0aW5nIFR1cm5zdGlsZSB0b2tlbiBmb3Igc2l0ZWtleTpcIiwgc2l0ZWtleSk7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIGxvZygnXHVEODNFXHVEREVEIFVBOicsIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LCAnUGxhdGZvcm06Jywgd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2VuZXJhdGVQYWludFRva2VuKHNpdGVrZXkpO1xuICAgIFxuICAgIGlmICh0b2tlbiAmJiB0b2tlbi5sZW5ndGggPiAyMCkge1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLSBzdGFydFRpbWUpO1xuICAgICAgbG9nKGBcdTI3MDUgVHVybnN0aWxlIHRva2VuIGdlbmVyYXRlZCBzdWNjZXNzZnVsbHkgaW4gJHtkdXJhdGlvbn1tc2ApO1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG9yIGVtcHR5IHRva2VuIHJlY2VpdmVkXCIpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSk7XG4gICAgbG9nKGBcdTI3NEMgVHVybnN0aWxlIHRva2VuIGdlbmVyYXRpb24gZmFpbGVkIGFmdGVyICR7ZHVyYXRpb259bXM6YCwgZXJyb3IpO1xuICAgIHRocm93IGVycm9yOyAvLyBSZS10aHJvdyB0byBiZSBjYXVnaHQgYnkgZW5zdXJlVG9rZW5cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVBhaW50VG9rZW4oc2l0ZWtleSkge1xuICByZXR1cm4gZXhlY3V0ZVR1cm5zdGlsZShzaXRla2V5LCAncGFpbnQnKTtcbn1cblxuLy8gVFVSTlNUSUxFIENPUkUgRlVOQ1RJT05TIChyZXBsaWNhdGVkIGZyb20gZXhhbXBsZSlcblxuYXN5bmMgZnVuY3Rpb24gbG9hZFR1cm5zdGlsZSgpIHtcbiAgLy8gSWYgVHVybnN0aWxlIGlzIGFscmVhZHkgcHJlc2VudCwganVzdCByZXNvbHZlLlxuICBpZiAod2luZG93LnR1cm5zdGlsZSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBBdm9pZCBhZGRpbmcgdGhlIHNjcmlwdCB0d2ljZVxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbc3JjXj1cImh0dHBzOi8vY2hhbGxlbmdlcy5jbG91ZGZsYXJlLmNvbS90dXJuc3RpbGUvdjAvYXBpLmpzXCJdJykpIHtcbiAgICAgIGNvbnN0IGNoZWNrUmVhZHkgPSAoKSA9PiB7XG4gICAgICAgIGlmICh3aW5kb3cudHVybnN0aWxlKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tSZWFkeSwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBjaGVja1JlYWR5KCk7XG4gICAgfVxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly9jaGFsbGVuZ2VzLmNsb3VkZmxhcmUuY29tL3R1cm5zdGlsZS92MC9hcGkuanM/cmVuZGVyPWV4cGxpY2l0JztcbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxvZyhcIlx1MjcwNSBUdXJuc3RpbGUgc2NyaXB0IGxvYWRlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfTtcbiAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgIGxvZyhcIlx1Mjc0QyBGYWlsZWQgdG8gbG9hZCBUdXJuc3RpbGUgc2NyaXB0XCIpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgVHVybnN0aWxlJykpO1xuICAgIH07XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlVHVybnN0aWxlQ29udGFpbmVyKCkge1xuICBpZiAoIV90dXJuc3RpbGVDb250YWluZXIgfHwgIWRvY3VtZW50LmJvZHkuY29udGFpbnMoX3R1cm5zdGlsZUNvbnRhaW5lcikpIHtcbiAgICAvLyBDbGVhbiB1cCBvbGQgY29udGFpbmVyIGlmIGl0IGV4aXN0c1xuICAgIGlmIChfdHVybnN0aWxlQ29udGFpbmVyKSB7XG4gICAgICBfdHVybnN0aWxlQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH1cbiAgICBcbiAgICBfdHVybnN0aWxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3R1cm5zdGlsZUNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgcG9zaXRpb246IGZpeGVkICFpbXBvcnRhbnQ7XG4gICAgICBsZWZ0OiAtOTk5OXB4ICFpbXBvcnRhbnQ7IC8qIGtlZXAgb2ZmLXNjcmVlbiBmb3IgaW52aXNpYmxlIG1vZGUgKi9cbiAgICAgIHRvcDogLTk5OTlweCAhaW1wb3J0YW50O1xuICAgICAgd2lkdGg6IDMwMHB4ICFpbXBvcnRhbnQ7XG4gICAgICBoZWlnaHQ6IDY1cHggIWltcG9ydGFudDtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7XG4gICAgICBvcGFjaXR5OiAwICFpbXBvcnRhbnQ7IC8qIGRvIG5vdCB1c2UgdmlzaWJpbGl0eTpoaWRkZW4gdG8gYXZvaWQgZW5naW5lIHF1aXJrcyAqL1xuICAgICAgei1pbmRleDogLTEgIWltcG9ydGFudDtcbiAgICBgO1xuICAgIF90dXJuc3RpbGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgX3R1cm5zdGlsZUNvbnRhaW5lci5pZCA9ICd0dXJuc3RpbGUtd2lkZ2V0LWNvbnRhaW5lcic7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChfdHVybnN0aWxlQ29udGFpbmVyKTtcbiAgfVxuICByZXR1cm4gX3R1cm5zdGlsZUNvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gZW5zdXJlVHVybnN0aWxlT3ZlcmxheUNvbnRhaW5lcigpIHtcbiAgaWYgKF90dXJuc3RpbGVPdmVybGF5ICYmIGRvY3VtZW50LmJvZHkuY29udGFpbnMoX3R1cm5zdGlsZU92ZXJsYXkpKSB7XG4gICAgcmV0dXJuIF90dXJuc3RpbGVPdmVybGF5O1xuICB9XG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgb3ZlcmxheS5pZCA9ICd0dXJuc3RpbGUtb3ZlcmxheS1jb250YWluZXInO1xuICBvdmVybGF5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHJpZ2h0OiAxNnB4O1xuICAgIGJvdHRvbTogMTZweDtcbiAgICB3aWR0aDogMzIwcHg7XG4gICAgbWluLWhlaWdodDogODBweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNyk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTJweDtcbiAgICB6LWluZGV4OiAxMDAwMDA7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDZweCk7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm94LXNoYWRvdzogMCA4cHggMjRweCByZ2JhKDAsMCwwLDAuNCk7XG4gIGA7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gJ0Nsb3VkZmxhcmUgVHVybnN0aWxlIFx1MjAxNCBwbGVhc2UgY29tcGxldGUgdGhlIGNoZWNrIGlmIHNob3duJztcbiAgdGl0bGUuc3R5bGUuY3NzVGV4dCA9ICdmb250OiA2MDAgMTJweC8xLjMgXCJTZWdvZSBVSVwiLHNhbnMtc2VyaWY7IG1hcmdpbi1ib3R0b206IDhweDsgb3BhY2l0eTogMC45Oyc7XG4gIGNvbnN0IHdpZGdldEhvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgd2lkZ2V0SG9zdC5pZCA9ICd0dXJuc3RpbGUtb3ZlcmxheS1ob3N0JztcbiAgd2lkZ2V0SG9zdC5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOiAxMDAlOyBtaW4taGVpZ2h0OiA3MHB4Oyc7XG4gIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNsb3NlQnRuLnRleHRDb250ZW50ID0gJ0hpZGUnO1xuICBjbG9zZUJ0bi5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmFic29sdXRlOyB0b3A6NnB4OyByaWdodDo2cHg7IGZvbnQtc2l6ZToxMXB4OyBiYWNrZ3JvdW5kOnRyYW5zcGFyZW50OyBjb2xvcjojZmZmOyBib3JkZXI6MXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKTsgYm9yZGVyLXJhZGl1czo2cHg7IHBhZGRpbmc6MnB4IDZweDsgY3Vyc29yOnBvaW50ZXI7JztcbiAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBvdmVybGF5LnJlbW92ZSgpKTtcbiAgb3ZlcmxheS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIG92ZXJsYXkuYXBwZW5kQ2hpbGQod2lkZ2V0SG9zdCk7XG4gIG92ZXJsYXkuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICBfdHVybnN0aWxlT3ZlcmxheSA9IG92ZXJsYXk7XG4gIHJldHVybiBvdmVybGF5O1xufVxuXG5hc3luYyBmdW5jdGlvbiBleGVjdXRlVHVybnN0aWxlKHNpdGVrZXksIGFjdGlvbiA9ICdwYWludCcpIHtcbiAgYXdhaXQgbG9hZFR1cm5zdGlsZSgpO1xuXG4gIGlmIChfdHVybnN0aWxlV2lkZ2V0SWQgJiYgX2xhc3RTaXRla2V5ID09PSBzaXRla2V5ICYmIHdpbmRvdy50dXJuc3RpbGU/LmV4ZWN1dGUpIHtcbiAgICB0cnkge1xuICAgICAgbG9nKFwiXHVEODNEXHVERDA0IFJldXNpbmcgZXhpc3RpbmcgVHVybnN0aWxlIHdpZGdldC4uLlwiKTtcbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgd2luZG93LnR1cm5zdGlsZS5leGVjdXRlKF90dXJuc3RpbGVXaWRnZXRJZCwgeyBhY3Rpb24gfSksXG4gICAgICAgIG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+IHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignRXhlY3V0ZSB0aW1lb3V0JykpLCAxNTAwMCkpXG4gICAgICBdKTtcbiAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi5sZW5ndGggPiAyMCkge1xuICAgICAgICBsb2coXCJcdTI3MDUgVG9rZW4gZ2VuZXJhdGVkIHZpYSB3aWRnZXQgcmV1c2VcIik7XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZygnXHVEODNEXHVERDA0IFdpZGdldCByZXVzZSBmYWlsZWQsIHdpbGwgY3JlYXRlIGEgZnJlc2ggd2lkZ2V0OicsIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBpbnZpc2libGUgPSBhd2FpdCBjcmVhdGVOZXdUdXJuc3RpbGVXaWRnZXRJbnZpc2libGUoc2l0ZWtleSwgYWN0aW9uKTtcbiAgaWYgKGludmlzaWJsZSAmJiBpbnZpc2libGUubGVuZ3RoID4gMjApIHJldHVybiBpbnZpc2libGU7XG5cbiAgbG9nKCdcdUQ4M0RcdURDNDAgRmFsbGluZyBiYWNrIHRvIGludGVyYWN0aXZlIFR1cm5zdGlsZSAodmlzaWJsZSkuJyk7XG4gIHJldHVybiBhd2FpdCBjcmVhdGVOZXdUdXJuc3RpbGVXaWRnZXRJbnRlcmFjdGl2ZShzaXRla2V5LCBhY3Rpb24pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVOZXdUdXJuc3RpbGVXaWRnZXRJbnZpc2libGUoc2l0ZWtleSwgYWN0aW9uKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoX3R1cm5zdGlsZVdpZGdldElkICYmIHdpbmRvdy50dXJuc3RpbGU/LnJlbW92ZSkge1xuICAgICAgICB0cnkgeyB3aW5kb3cudHVybnN0aWxlLnJlbW92ZShfdHVybnN0aWxlV2lkZ2V0SWQpOyB9IGNhdGNoIHsgLyogSWdub3JlIHJlbW92YWwgZXJyb3JzICovIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVuc3VyZVR1cm5zdGlsZUNvbnRhaW5lcigpO1xuICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgY29uc3Qgd2lkZ2V0SWQgPSB3aW5kb3cudHVybnN0aWxlLnJlbmRlcihjb250YWluZXIsIHtcbiAgICAgICAgc2l0ZWtleSxcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBzaXplOiAnaW52aXNpYmxlJyxcbiAgICAgICAgcmV0cnk6ICdhdXRvJyxcbiAgICAgICAgJ3JldHJ5LWludGVydmFsJzogODAwMCxcbiAgICAgICAgY2FsbGJhY2s6ICh0b2tlbikgPT4ge1xuICAgICAgICAgIGxvZygnXHUyNzA1IEludmlzaWJsZSBUdXJuc3RpbGUgY2FsbGJhY2snKTtcbiAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2Vycm9yLWNhbGxiYWNrJzogKCkgPT4gcmVzb2x2ZShudWxsKSxcbiAgICAgICAgJ3RpbWVvdXQtY2FsbGJhY2snOiAoKSA9PiByZXNvbHZlKG51bGwpLFxuICAgICAgfSk7XG4gICAgICBfdHVybnN0aWxlV2lkZ2V0SWQgPSB3aWRnZXRJZDtcbiAgICAgIF9sYXN0U2l0ZWtleSA9IHNpdGVrZXk7XG4gICAgICBpZiAoIXdpZGdldElkKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgIFByb21pc2UucmFjZShbXG4gICAgICAgIHdpbmRvdy50dXJuc3RpbGUuZXhlY3V0ZSh3aWRnZXRJZCwgeyBhY3Rpb24gfSksXG4gICAgICAgIG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+IHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignSW52aXNpYmxlIGV4ZWN1dGUgdGltZW91dCcpKSwgMTIwMDApKVxuICAgICAgXSkudGhlbihyZXNvbHZlKS5jYXRjaCgoKSA9PiByZXNvbHZlKG51bGwpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2coJ0ludmlzaWJsZSBUdXJuc3RpbGUgZmFpbGVkOicsIGUpO1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVOZXdUdXJuc3RpbGVXaWRnZXRJbnRlcmFjdGl2ZShzaXRla2V5LCBhY3Rpb24pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKF90dXJuc3RpbGVXaWRnZXRJZCAmJiB3aW5kb3cudHVybnN0aWxlPy5yZW1vdmUpIHtcbiAgICAgICAgdHJ5IHsgd2luZG93LnR1cm5zdGlsZS5yZW1vdmUoX3R1cm5zdGlsZVdpZGdldElkKTsgfSBjYXRjaCB7IC8qIElnbm9yZSByZW1vdmFsIGVycm9ycyAqLyB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG92ZXJsYXkgPSBlbnN1cmVUdXJuc3RpbGVPdmVybGF5Q29udGFpbmVyKCk7XG4gICAgICBjb25zdCBob3N0ID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjdHVybnN0aWxlLW92ZXJsYXktaG9zdCcpO1xuICAgICAgaG9zdC5pbm5lckhUTUwgPSAnJztcblxuICAgICAgY29uc3QgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGxvZygnXHUyM0YwIEludGVyYWN0aXZlIFR1cm5zdGlsZSB0aW1lZCBvdXQnKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH0sIDEyMDAwMCk7IC8vIGdpdmUgdXNlcnMgdXAgdG8gMiBtaW51dGVzXG5cbiAgICAgIGNvbnN0IHdpZGdldElkID0gd2luZG93LnR1cm5zdGlsZS5yZW5kZXIoaG9zdCwge1xuICAgICAgICBzaXRla2V5LFxuICAgICAgICBhY3Rpb24sXG4gICAgICAgIHNpemU6ICdub3JtYWwnLFxuICAgICAgICByZXRyeTogJ2F1dG8nLFxuICAgICAgICAncmV0cnktaW50ZXJ2YWwnOiA4MDAwLFxuICAgICAgICBjYWxsYmFjazogKHRva2VuKSA9PiB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgICAgLy8gSGlkZSBvdmVybGF5IGFmdGVyIHN1Y2Nlc3NcbiAgICAgICAgICB0cnkgeyBvdmVybGF5LnJlbW92ZSgpOyB9IGNhdGNoIHsgLyogSWdub3JlIHJlbW92YWwgZXJyb3JzICovIH1cbiAgICAgICAgICBsb2coJ1x1MjcwNSBJbnRlcmFjdGl2ZSBUdXJuc3RpbGUgc29sdmVkJyk7XG4gICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgIH0sXG4gICAgICAgICdlcnJvci1jYWxsYmFjayc6IChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZygnXHVEODNEXHVERUE4IEludGVyYWN0aXZlIFR1cm5zdGlsZSBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgIH0sXG4gICAgICAgICd0aW1lb3V0LWNhbGxiYWNrJzogKCkgPT4ge1xuICAgICAgICAgIGxvZygnXHUyM0YwIFR1cm5zdGlsZSB0aW1lb3V0IGNhbGxiYWNrIChpbnRlcmFjdGl2ZSknKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2V4cGlyZWQtY2FsbGJhY2snOiAoKSA9PiB7XG4gICAgICAgICAgbG9nKCdcdTI2QTBcdUZFMEYgSW50ZXJhY3RpdmUgVHVybnN0aWxlIHRva2VuIGV4cGlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIF90dXJuc3RpbGVXaWRnZXRJZCA9IHdpZGdldElkO1xuICAgICAgX2xhc3RTaXRla2V5ID0gc2l0ZWtleTtcbiAgICAgIGlmICghd2lkZ2V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCdcdTI3NEMgRXJyb3IgY3JlYXRpbmcgaW50ZXJhY3RpdmUgVHVybnN0aWxlIHdpZGdldDonLCBlcnJvcik7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRldGVjdFNpdGVrZXkoZmFsbGJhY2sgPSAnMHg0QUFBQUFBQnBxSmU4Rk8wTjg0cTBGJykge1xuICAvLyBDYWNoZSBzaXRla2V5IHRvIGF2b2lkIHJlcGVhdGVkIERPTSBxdWVyaWVzXG4gIGlmIChfY2FjaGVkU2l0ZWtleSkge1xuICAgIHJldHVybiBfY2FjaGVkU2l0ZWtleTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVHJ5IHRvIGZpbmQgc2l0ZWtleSBpbiBkYXRhIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBzaXRla2V5U2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2l0ZWtleV0nKTtcbiAgICBpZiAoc2l0ZWtleVNlbCkge1xuICAgICAgY29uc3Qgc2l0ZWtleSA9IHNpdGVrZXlTZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNpdGVrZXknKTtcbiAgICAgIGlmIChzaXRla2V5ICYmIHNpdGVrZXkubGVuZ3RoID4gMTApIHtcbiAgICAgICAgX2NhY2hlZFNpdGVrZXkgPSBzaXRla2V5O1xuICAgICAgICBsb2coXCJcdUQ4M0RcdUREMEQgU2l0ZWtleSBkZXRlY3RlZCBmcm9tIGRhdGEgYXR0cmlidXRlOlwiLCBzaXRla2V5KTtcbiAgICAgICAgcmV0dXJuIHNpdGVrZXk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJ5IHR1cm5zdGlsZSBlbGVtZW50XG4gICAgY29uc3QgdHVybnN0aWxlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2YtdHVybnN0aWxlJyk7XG4gICAgaWYgKHR1cm5zdGlsZUVsPy5kYXRhc2V0Py5zaXRla2V5ICYmIHR1cm5zdGlsZUVsLmRhdGFzZXQuc2l0ZWtleS5sZW5ndGggPiAxMCkge1xuICAgICAgX2NhY2hlZFNpdGVrZXkgPSB0dXJuc3RpbGVFbC5kYXRhc2V0LnNpdGVrZXk7XG4gICAgICBsb2coXCJcdUQ4M0RcdUREMEQgU2l0ZWtleSBkZXRlY3RlZCBmcm9tIHR1cm5zdGlsZSBlbGVtZW50OlwiLCBfY2FjaGVkU2l0ZWtleSk7XG4gICAgICByZXR1cm4gX2NhY2hlZFNpdGVrZXk7XG4gICAgfVxuXG4gICAgLy8gVHJ5IGdsb2JhbCB2YXJpYWJsZVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuX19UVVJOU1RJTEVfU0lURUtFWSAmJiB3aW5kb3cuX19UVVJOU1RJTEVfU0lURUtFWS5sZW5ndGggPiAxMCkge1xuICAgICAgX2NhY2hlZFNpdGVrZXkgPSB3aW5kb3cuX19UVVJOU1RJTEVfU0lURUtFWTtcbiAgICAgIGxvZyhcIlx1RDgzRFx1REQwRCBTaXRla2V5IGRldGVjdGVkIGZyb20gZ2xvYmFsIHZhcmlhYmxlOlwiLCBfY2FjaGVkU2l0ZWtleSk7XG4gICAgICByZXR1cm4gX2NhY2hlZFNpdGVrZXk7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHNjcmlwdCB0YWdzIGZvciBpbmxpbmUgc2l0ZWtleVxuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKTtcbiAgICBmb3IgKGNvbnN0IHNjcmlwdCBvZiBzY3JpcHRzKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gc2NyaXB0LnRleHRDb250ZW50IHx8IHNjcmlwdC5pbm5lckhUTUw7XG4gICAgICBjb25zdCBzaXRla2V5TWF0Y2ggPSBjb250ZW50Lm1hdGNoKC9zaXRla2V5WydcIjpcXHNdKyhbJ1wiMC05YS16QS1aXy1dezIwLH0pL2kpO1xuICAgICAgaWYgKHNpdGVrZXlNYXRjaCAmJiBzaXRla2V5TWF0Y2hbMV0gJiYgc2l0ZWtleU1hdGNoWzFdLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgIF9jYWNoZWRTaXRla2V5ID0gc2l0ZWtleU1hdGNoWzFdLnJlcGxhY2UoL1snXCJdL2csICcnKTtcbiAgICAgICAgbG9nKFwiXHVEODNEXHVERDBEIFNpdGVrZXkgZGV0ZWN0ZWQgZnJvbSBzY3JpcHQgY29udGVudDpcIiwgX2NhY2hlZFNpdGVrZXkpO1xuICAgICAgICByZXR1cm4gX2NhY2hlZFNpdGVrZXk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnRXJyb3IgZGV0ZWN0aW5nIHNpdGVrZXk6JywgZXJyb3IpO1xuICB9XG4gIFxuICBsb2coXCJcdUQ4M0RcdUREMEQgVXNpbmcgZmFsbGJhY2sgc2l0ZWtleTpcIiwgZmFsbGJhY2spO1xuICBfY2FjaGVkU2l0ZWtleSA9IGZhbGxiYWNrO1xuICByZXR1cm4gZmFsbGJhY2s7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnNcbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cblxuZnVuY3Rpb24gd2FpdEZvclNlbGVjdG9yKHNlbGVjdG9yLCBpbnRlcnZhbCA9IDIwMCwgdGltZW91dCA9IDEwMDAwKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGVuZFRpbWUgPSBEYXRlLm5vdygpICsgdGltZW91dDtcbiAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICB9IGVsc2UgaWYgKERhdGUubm93KCkgPCBlbmRUaW1lKSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2hlY2ssIGludGVydmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjaGVjaygpO1xuICB9KTtcbn1cblxuLy8gS2VlcCBvcmlnaW5hbCBtZXRob2QgYXMgZmFsbGJhY2tcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNhcHRjaGFGYWxsYmFjaygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBleGVjdXRlRmxvdyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvZyhcIlx1RDgzQ1x1REZBRiBTdGFydGluZyBhdXRvbWF0aWMgQ0FQVENIQSBzb2x2aW5nIHByb2Nlc3MuLi5cIik7XG4gICAgICAgIFxuICAgICAgICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgdG9rZW4gdG8gZm9yY2UgZnJlc2ggZ2VuZXJhdGlvblxuICAgICAgICBpbnZhbGlkYXRlVG9rZW4oKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEVuc3VyZSB3ZSBoYXZlIGEgZnJlc2ggcHJvbWlzZSB0byBhd2FpdCBmb3IgYSBuZXcgdG9rZW4gY2FwdHVyZVxuICAgICAgICB0b2tlblByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzKSA9PiB7IF9yZXNvbHZlVG9rZW4gPSByZXM7IH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGltZW91dFByb21pc2UgPSBzbGVlcCgzMDAwMCkudGhlbigoKSA9PiByZWplY3QobmV3IEVycm9yKFwiQXV0by1DQVBUQ0hBIHRpbWVkIG91dCBhZnRlciAzMCBzZWNvbmRzLlwiKSkpO1xuXG4gICAgICAgIGNvbnN0IHNvbHZlUHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIG1haW4gcGFpbnQgYnV0dG9uIC0gZGlmZmVyZW50IHNlbGVjdG9ycyBmb3IgZGlmZmVyZW50IHN0YXRlc1xuICAgICAgICAgIGxldCBtYWluUGFpbnRCdG4gPSBhd2FpdCB3YWl0Rm9yU2VsZWN0b3IoJ2J1dHRvbi5idG4uYnRuLXByaW1hcnkuYnRuLWxnJywgMjAwLCAzMDAwKTtcbiAgICAgICAgICBpZiAoIW1haW5QYWludEJ0bikge1xuICAgICAgICAgICAgbWFpblBhaW50QnRuID0gYXdhaXQgd2FpdEZvclNlbGVjdG9yKCdidXR0b24uYnRuLXByaW1hcnkuc21cXFxcOmJ0bi14bCcsIDIwMCwgMzAwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbWFpblBhaW50QnRuKSB7XG4gICAgICAgICAgICBtYWluUGFpbnRCdG4gPSBhd2FpdCB3YWl0Rm9yU2VsZWN0b3IoJ2J1dHRvbi5idG4tcHJpbWFyeScsIDIwMCwgMzAwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbWFpblBhaW50QnRuKSB7XG4gICAgICAgICAgICAvLyBJZiBubyBwYWludCBidXR0b24sIHRyeSB0byB0cmlnZ2VyIHRoZSBmbG93IG1hbnVhbGx5XG4gICAgICAgICAgICBsb2coXCJcdUQ4M0NcdURGQUYgTm8gcGFpbnQgYnV0dG9uIGZvdW5kLCBjbGlja2luZyBvbiBjYW52YXMgZGlyZWN0bHkgdG8gdHJpZ2dlciBDQVBUQ0hBLi4uXCIpO1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gYXdhaXQgd2FpdEZvclNlbGVjdG9yKCdjYW52YXMnLCAyMDAsIDUwMDApO1xuICAgICAgICAgICAgaWYgKGNhbnZhcykge1xuICAgICAgICAgICAgICBjYW52YXMuY2xpY2soKTtcbiAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgICAgICAgICAgIC8vIFRyeSBhZ2FpbiB0byBmaW5kIHBhaW50IGJ1dHRvblxuICAgICAgICAgICAgICBtYWluUGFpbnRCdG4gPSBhd2FpdCB3YWl0Rm9yU2VsZWN0b3IoJ2J1dHRvbi5idG4uYnRuLXByaW1hcnkuYnRuLWxnLCBidXR0b24uYnRuLXByaW1hcnkuc21cXFxcOmJ0bi14bCwgYnV0dG9uLmJ0bi1wcmltYXJ5JywgMjAwLCA1MDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKCFtYWluUGFpbnRCdG4pIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGFueSBwYWludCBidXR0b24gYWZ0ZXIgYXR0ZW1wdHMuXCIpO1xuICAgICAgICAgIFxuICAgICAgICAgIGxvZyhcIlx1RDgzQ1x1REZBRiBGb3VuZCBwYWludCBidXR0b24sIGNsaWNraW5nLi4uXCIpO1xuICAgICAgICAgIG1haW5QYWludEJ0bi5jbGljaygpO1xuICAgICAgICAgIGF3YWl0IHNsZWVwKDUwMCk7XG5cbiAgICAgICAgICAvLyBTZWxlY3QgdHJhbnNwYXJlbnQgY29sb3IgKGNvbG9yIDApXG4gICAgICAgICAgbG9nKFwiXHVEODNDXHVERkFGIFNlbGVjdGluZyB0cmFuc3BhcmVudCBjb2xvci4uLlwiKTtcbiAgICAgICAgICBjb25zdCB0cmFuc0J0biA9IGF3YWl0IHdhaXRGb3JTZWxlY3RvcignYnV0dG9uI2NvbG9yLTAnLCAyMDAsIDUwMDApO1xuICAgICAgICAgIGlmICghdHJhbnNCdG4pIHtcbiAgICAgICAgICAgIGxvZyhcIlx1MjZBMFx1RkUwRiBDb3VsZCBub3QgZmluZCB0cmFuc3BhcmVudCBjb2xvciBidXR0b24sIHRyeWluZyBhbHRlcm5hdGl2ZSBzZWxlY3RvcnMuLi5cIik7XG4gICAgICAgICAgICBjb25zdCBjb2xvckJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWRePVwiY29sb3ItXCJdJyk7XG4gICAgICAgICAgICBpZiAoY29sb3JCdG5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY29sb3JCdG5zWzBdLmNsaWNrKCk7XG4gICAgICAgICAgICAgIGxvZyhcIlx1RDgzQ1x1REZBRiBDbGlja2VkIGZpcnN0IGF2YWlsYWJsZSBjb2xvciBidXR0b25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zQnRuLmNsaWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHNsZWVwKDUwMCk7XG5cbiAgICAgICAgICAvLyBGaW5kIGFuZCBpbnRlcmFjdCB3aXRoIGNhbnZhc1xuICAgICAgICAgIGxvZyhcIlx1RDgzQ1x1REZBRiBGaW5kaW5nIGNhbnZhcyBlbGVtZW50Li4uXCIpO1xuICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGF3YWl0IHdhaXRGb3JTZWxlY3RvcignY2FudmFzJywgMjAwLCA1MDAwKTtcbiAgICAgICAgICBpZiAoIWNhbnZhcykgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgdGhlIGNhbnZhcyBlbGVtZW50LlwiKTtcblxuICAgICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICBjYW52YXMuZm9jdXMoKTtcbiAgICAgICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGNvbnN0IGNlbnRlclggPSBNYXRoLnJvdW5kKHJlY3QubGVmdCArIHJlY3Qud2lkdGggLyAyKTtcbiAgICAgICAgICBjb25zdCBjZW50ZXJZID0gTWF0aC5yb3VuZChyZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICBsb2coXCJcdUQ4M0NcdURGQUYgU2ltdWxhdGluZyBjYW52YXMgaW50ZXJhY3Rpb24uLi5cIik7XG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5Nb3VzZUV2ZW50ICYmIHdpbmRvdy5LZXlib2FyZEV2ZW50KSB7XG4gICAgICAgICAgICAvLyBTaW11bGF0ZSBtb3VzZSBtb3ZlbWVudCBhbmQgY2xpY2tcbiAgICAgICAgICAgIGNhbnZhcy5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTW91c2VFdmVudCgnbW91c2Vtb3ZlJywgeyBjbGllbnRYOiBjZW50ZXJYLCBjbGllbnRZOiBjZW50ZXJZLCBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgICAgICAgIGNhbnZhcy5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTW91c2VFdmVudCgnbW91c2Vkb3duJywgeyBjbGllbnRYOiBjZW50ZXJYLCBjbGllbnRZOiBjZW50ZXJZLCBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKDUwKTtcbiAgICAgICAgICAgIGNhbnZhcy5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTW91c2VFdmVudCgnbW91c2V1cCcsIHsgY2xpZW50WDogY2VudGVyWCwgY2xpZW50WTogY2VudGVyWSwgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNpbXVsYXRlIHNwYWNlIGtleSBwcmVzc1xuICAgICAgICAgICAgY2FudmFzLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5LZXlib2FyZEV2ZW50KCdrZXlkb3duJywgeyBrZXk6ICcgJywgY29kZTogJ1NwYWNlJywgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICBhd2FpdCBzbGVlcCg1MCk7XG4gICAgICAgICAgICBjYW52YXMuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93LktleWJvYXJkRXZlbnQoJ2tleXVwJywgeyBrZXk6ICcgJywgY29kZTogJ1NwYWNlJywgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHNsZWVwKDEwMDApO1xuXG4gICAgICAgICAgLy8gV2FpdCBhIGJpdCBtb3JlIGZvciBDQVBUQ0hBIHRvIHBvdGVudGlhbGx5IGFwcGVhclxuICAgICAgICAgIGxvZyhcIlx1RDgzQ1x1REZBRiBXYWl0aW5nIGZvciBDQVBUQ0hBIGNoYWxsZW5nZS4uLlwiKTtcbiAgICAgICAgICBhd2FpdCBzbGVlcCgyMDAwKTtcblxuICAgICAgICAgIC8vIEtlZXAgY29uZmlybWluZyB1bnRpbCB0b2tlbiBpcyBjYXB0dXJlZCBvciB0aW1lb3V0XG4gICAgICAgICAgbG9nKFwiXHVEODNDXHVERkFGIFN0YXJ0aW5nIGNvbmZpcm1hdGlvbiBsb29wLi4uXCIpO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgY29uc3QgY29uZmlybUxvb3AgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKCFpc1Rva2VuVmFsaWQoKSAmJiBEYXRlLm5vdygpIC0gc3RhcnRUaW1lIDwgMjUwMDApIHsgLy8gMjUgc2Vjb25kIHRpbWVvdXQgZm9yIGNvbmZpcm1hdGlvbnNcbiAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIExvb2sgZm9yIGNvbmZpcm0gYnV0dG9uIHdpdGggbXVsdGlwbGUgc2VsZWN0b3JzXG4gICAgICAgICAgICAgIGxldCBjb25maXJtQnRuID0gYXdhaXQgd2FpdEZvclNlbGVjdG9yKCdidXR0b24uYnRuLmJ0bi1wcmltYXJ5LmJ0bi1sZycsIDEwMCwgMTAwMCk7XG4gICAgICAgICAgICAgIGlmICghY29uZmlybUJ0bikge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdG4gPSBhd2FpdCB3YWl0Rm9yU2VsZWN0b3IoJ2J1dHRvbi5idG4uYnRuLXByaW1hcnkuc21cXFxcOmJ0bi14bCcsIDEwMCwgMTAwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb25maXJtQnRuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWxsUHJpbWFyeSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uLmJ0bi1wcmltYXJ5JykpO1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdG4gPSBhbGxQcmltYXJ5Lmxlbmd0aCA/IGFsbFByaW1hcnlbYWxsUHJpbWFyeS5sZW5ndGggLSAxXSA6IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGlmIChjb25maXJtQnRuICYmICFjb25maXJtQnRuLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgbG9nKGBcdUQ4M0NcdURGQUYgQ2xpY2tpbmcgY29uZmlybWF0aW9uIGJ1dHRvbiAoYXR0ZW1wdCAke2F0dGVtcHRzfSkuLi5gKTtcbiAgICAgICAgICAgICAgICBjb25maXJtQnRuLmNsaWNrKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nKGBcdUQ4M0NcdURGQUYgTm8gYWN0aXZlIGNvbmZpcm0gYnV0dG9uIGZvdW5kIChhdHRlbXB0ICR7YXR0ZW1wdHN9KWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBhd2FpdCBzbGVlcCg4MDApOyAvLyBTbGlnaHRseSBsb25nZXIgZGVsYXkgYmV0d2VlbiBhdHRlbXB0c1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBTdGFydCBjb25maXJtYXRpb24gbG9vcCBhbmQgd2FpdCBmb3IgdG9rZW5cbiAgICAgICAgICBjb25maXJtTG9vcCgpO1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdG9rZW5Qcm9taXNlO1xuICAgICAgICAgIGF3YWl0IHNsZWVwKDUwMCk7IC8vIHNtYWxsIGRlbGF5IGFmdGVyIHRva2VuIGlzIGNhcHR1cmVkXG4gICAgICAgICAgbG9nKFwiXHUyNzA1IFRva2VuIHN1Y2Nlc3NmdWxseSBjYXB0dXJlZCB0aHJvdWdoIGJyb3dzZXIgYXV0b21hdGlvblwiKTtcbiAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLnJhY2UoW3NvbHZlUHJvbWlzZSwgdGltZW91dFByb21pc2VdKTtcblxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nKFwiXHUyNzRDIEF1dG8tQ0FQVENIQSBwcm9jZXNzIGZhaWxlZDpcIiwgZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBleGVjdXRlRmxvdygpO1xuICB9KTtcbn1cblxuLy8gVE9LRU4gQ0FQVFVSRSBTWVNURU0gKHJlcGxpY2F0ZWQgZnJvbSBleGFtcGxlKVxuLy8gVGhpcyBtdXN0IGJlIGNhbGxlZCBieSB0aGUgc2l0ZSB3aGVuIHRoZSB0dXJuc3RpbGUgdG9rZW4gaXMgcmVjZWl2ZWRcbndpbmRvdy5fX1dQQV9TRVRfVFVSTlNUSUxFX1RPS0VOX18gPSBmdW5jdGlvbih0b2tlbikge1xuICBpZiAodG9rZW4gJiYgdHlwZW9mIHRva2VuID09PSAnc3RyaW5nJyAmJiB0b2tlbi5sZW5ndGggPiAyMCkge1xuICAgIGxvZyhcIlx1MjcwNSBUdXJuc3RpbGUgVG9rZW4gQ2FwdHVyZWQ6XCIsIHRva2VuKTtcbiAgICBzZXRUdXJuc3RpbGVUb2tlbih0b2tlbik7XG4gIH1cbn07XG5cbi8vIEhvb2sgaW50byBmZXRjaCB0byBjYXB0dXJlIHR1cm5zdGlsZSB0b2tlbnMgZnJvbSBQT1NUIHJlcXVlc3RzIChyZXBsaWNhdGVkIGZyb20gZXhhbXBsZSlcbihmdW5jdGlvbigpIHtcbiAgaWYgKHdpbmRvdy5fX1dQQV9GRVRDSF9IT09LRURfXykgcmV0dXJuOyAvLyBBdm9pZCBob29raW5nIHR3aWNlXG4gIHdpbmRvdy5fX1dQQV9GRVRDSF9IT09LRURfXyA9IHRydWU7XG5cbiAgY29uc3Qgb3JpZ2luYWxGZXRjaCA9IHdpbmRvdy5mZXRjaDtcbiAgd2luZG93LmZldGNoID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2guYXBwbHkodGhpcywgYXJncyk7XG4gICAgY29uc3QgdXJsID0gKGFyZ3NbMF0gaW5zdGFuY2VvZiBSZXF1ZXN0KSA/IGFyZ3NbMF0udXJsIDogYXJnc1swXTtcblxuICAgIGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAodXJsLmluY2x1ZGVzKFwiaHR0cHM6Ly9iYWNrZW5kLndwbGFjZS5saXZlL3MwL3BpeGVsL1wiKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKGFyZ3NbMV0uYm9keSk7XG4gICAgICAgICAgaWYgKHBheWxvYWQudCkge1xuICAgICAgICAgICAgLy8gT25seSBjYXB0dXJlIHRva2VuIGlmIHdlIGRvbid0IGhhdmUgYSB2YWxpZCBvbmUgb3IgaWYgaXQncyBkaWZmZXJlbnRcbiAgICAgICAgICAgIGNvbnN0IGNhcHR1cmVkVG9rZW4gPSBwYXlsb2FkLnQ7XG4gICAgICAgICAgICBpZiAoIWlzVG9rZW5WYWxpZCgpIHx8IHR1cm5zdGlsZVRva2VuICE9PSBjYXB0dXJlZFRva2VuKSB7XG4gICAgICAgICAgICAgIGxvZyhcIlx1MjcwNSBUdXJuc3RpbGUgVG9rZW4gQ2FwdHVyZWQ6XCIsIGNhcHR1cmVkVG9rZW4pO1xuICAgICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoeyBzb3VyY2U6ICd0dXJuc3RpbGUtY2FwdHVyZScsIHRva2VuOiBjYXB0dXJlZFRva2VuIH0sICcqJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH07XG5cbiAgLy8gTGlzdGVuIGZvciB0b2tlbiBjYXB0dXJlIG1lc3NhZ2VzXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyBzb3VyY2UsIHRva2VuIH0gPSBldmVudC5kYXRhO1xuXG4gICAgaWYgKHNvdXJjZSA9PT0gJ3R1cm5zdGlsZS1jYXB0dXJlJyAmJiB0b2tlbikge1xuICAgICAgLy8gT25seSBzZXQgaWYgd2UgZG9uJ3QgaGF2ZSBhIHZhbGlkIHRva2VuIG9yIGlmIGl0J3MgYSBkaWZmZXJlbnQvbmV3ZXIgdG9rZW5cbiAgICAgIGlmICghaXNUb2tlblZhbGlkKCkgfHwgdHVybnN0aWxlVG9rZW4gIT09IHRva2VuKSB7XG4gICAgICAgIHNldFR1cm5zdGlsZVRva2VuKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSkoKTtcblxuLy8gRXhwb3J0IHRoZSBrZXkgZnVuY3Rpb25zXG5leHBvcnQgeyBoYW5kbGVDYXB0Y2hhLCBsb2FkVHVybnN0aWxlLCBleGVjdXRlVHVybnN0aWxlLCBkZXRlY3RTaXRla2V5LCBpbnZhbGlkYXRlVG9rZW4gfTtcblxuLy8gTGVnYWN5IGNvbXBhdGliaWxpdHkgZnVuY3Rpb24gXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VHVybnN0aWxlVG9rZW4oX3NpdGVLZXkpIHtcbiAgbG9nKFwiXHUyNkEwXHVGRTBGIFVzaW5nIGxlZ2FjeSBnZXRUdXJuc3RpbGVUb2tlbiBmdW5jdGlvbiwgY29uc2lkZXIgbWlncmF0aW5nIHRvIGVuc3VyZVRva2VuKClcIik7XG4gIHJldHVybiBhd2FpdCBlbnN1cmVUb2tlbigpO1xufVxuIiwgImltcG9ydCB7IGZldGNoV2l0aFRpbWVvdXQgfSBmcm9tIFwiLi9odHRwLmpzXCI7XG5pbXBvcnQgeyBlbnN1cmVUb2tlbiB9IGZyb20gXCIuL3R1cm5zdGlsZS5qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyLmpzXCI7XG5cbmNvbnN0IEJBU0UgPSBcImh0dHBzOi8vYmFja2VuZC53cGxhY2UubGl2ZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBtZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L21lYCwgeyBjcmVkZW50aWFsczogJ2luY2x1ZGUnIH0pLnRoZW4ociA9PiByLmpzb24oKSk7XG4gICAgY29uc3QgdXNlciA9IG1lIHx8IG51bGw7XG4gICAgY29uc3QgYyA9IG1lPy5jaGFyZ2VzIHx8IHt9O1xuICAgIGNvbnN0IGNoYXJnZXMgPSB7XG4gICAgICBjb3VudDogYy5jb3VudCA/PyAwLCAgICAgICAgLy8gTWFudGVuZXIgdmFsb3IgZGVjaW1hbCBvcmlnaW5hbFxuICAgICAgbWF4OiBjLm1heCA/PyAwLCAgICAgICAgICAgIC8vIE1hbnRlbmVyIHZhbG9yIG9yaWdpbmFsIChwdWVkZSB2YXJpYXIgcG9yIHVzdWFyaW8pXG4gICAgICBjb29sZG93bk1zOiBjLmNvb2xkb3duTXMgPz8gMzAwMDBcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlciwgXG4gICAgICAgIGNoYXJnZXM6IGNoYXJnZXMuY291bnQsXG4gICAgICAgIG1heENoYXJnZXM6IGNoYXJnZXMubWF4LFxuICAgICAgICBjaGFyZ2VSZWdlbjogY2hhcmdlcy5jb29sZG93bk1zXG4gICAgICB9XG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgXG4gICAgcmV0dXJuIHsgXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlLFxuICAgICAgZGF0YToge1xuICAgICAgICB1c2VyOiBudWxsLCBcbiAgICAgICAgY2hhcmdlczogMCxcbiAgICAgICAgbWF4Q2hhcmdlczogMCxcbiAgICAgICAgY2hhcmdlUmVnZW46IDMwMDAwXG4gICAgICB9XG4gICAgfTsgXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrSGVhbHRoKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFTRX0vaGVhbHRoYCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KTtcbiAgICBcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IGhlYWx0aCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmhlYWx0aCxcbiAgICAgICAgbGFzdENoZWNrOiBEYXRlLm5vdygpLFxuICAgICAgICBzdGF0dXM6ICdvbmxpbmUnXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhYmFzZTogZmFsc2UsXG4gICAgICAgIHVwOiBmYWxzZSxcbiAgICAgICAgdXB0aW1lOiAnTi9BJyxcbiAgICAgICAgbGFzdENoZWNrOiBEYXRlLm5vdygpLFxuICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFiYXNlOiBmYWxzZSxcbiAgICAgIHVwOiBmYWxzZSxcbiAgICAgIHVwdGltZTogJ04vQScsXG4gICAgICBsYXN0Q2hlY2s6IERhdGUubm93KCksXG4gICAgICBzdGF0dXM6ICdvZmZsaW5lJyxcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlXG4gICAgfTtcbiAgfVxufVxuXG4vLyBVbmlmaWNhIHBvc3QgZGUgcFx1MDBFRHhlbCBwb3IgbG90ZXMgKGJhdGNoIHBvciB0aWxlKS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0UGl4ZWxCYXRjaCh7IHRpbGVYLCB0aWxlWSwgcGl4ZWxzLCB0dXJuc3RpbGVUb2tlbiB9KSB7XG4gIC8vIHBpeGVsczogW3t4LHksY29sb3J9LCBcdTIwMjZdIHJlbGF0aXZvcyBhbCB0aWxlXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IHBpeGVscywgdG9rZW46IHR1cm5zdGlsZVRva2VuIH0pO1xuICBjb25zdCByID0gYXdhaXQgZmV0Y2hXaXRoVGltZW91dChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIiB9LFxuICAgIGJvZHksXG4gICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiXG4gIH0pO1xuICBcbiAgLy8gQWxndW5hcyByZXNwdWVzdGFzIHB1ZWRlbiBubyB0cmFlciBKU09OIGF1bnF1ZSBzZWFuIDIwMC5cbiAgaWYgKHIuc3RhdHVzID09PSAyMDApIHtcbiAgICB0cnkgeyByZXR1cm4gYXdhaXQgci5qc29uKCk7IH0gY2F0Y2ggeyByZXR1cm4geyBvazogdHJ1ZSB9OyB9XG4gIH1cbiAgXG4gIGxldCBtc2cgPSBgSFRUUCAke3Iuc3RhdHVzfWA7XG4gIHRyeSB7IFxuICAgIGNvbnN0IGogPSBhd2FpdCByLmpzb24oKTsgXG4gICAgbXNnID0gaj8ubWVzc2FnZSB8fCBtc2c7IFxuICB9IGNhdGNoIHtcbiAgICAvLyBSZXNwb25zZSBub3QgSlNPTlxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgcGFpbnQgZmFpbGVkOiAke21zZ31gKTtcbn1cblxuLy8gVmVyc2lcdTAwRjNuICdzYWZlJyBxdWUgbm8gYXJyb2phIGV4Y2VwY2lvbmVzIHkgcmV0b3JuYSBzdGF0dXMvanNvblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbEJhdGNoU2FmZSh0aWxlWCwgdGlsZVksIHBpeGVscywgdHVybnN0aWxlVG9rZW4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBwaXhlbHMsIHRva2VuOiB0dXJuc3RpbGVUb2tlbiB9KTtcbiAgICBjb25zdCByID0gYXdhaXQgZmV0Y2hXaXRoVGltZW91dChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIgfSxcbiAgICAgIGJvZHksXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCJcbiAgICB9KTtcbiAgbGV0IGpzb24gPSB7fTtcbiAgLy8gSWYgcmVzcG9uc2UgaXMgbm90IEpTT04sIGlnbm9yZSBwYXJzZSBlcnJvclxuICB0cnkgeyBqc29uID0gYXdhaXQgci5qc29uKCk7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICAgIHJldHVybiB7IHN0YXR1czogci5zdGF0dXMsIGpzb24sIHN1Y2Nlc3M6IHIub2sgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdGF0dXM6IDAsIGpzb246IHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgc3VjY2VzczogZmFsc2UgfTtcbiAgfVxufVxuXG4vLyBQb3N0IHBcdTAwRUR4ZWwgcGFyYSBmYXJtIChyZXBsaWNhZG8gZGVsIGVqZW1wbG8gY29uIG1hbmVqbyBkZSA0MDMpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9zdFBpeGVsKGNvb3JkcywgY29sb3JzLCB0dXJuc3RpbGVUb2tlbiwgdGlsZVgsIHRpbGVZKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICBjb2xvcnM6IGNvbG9ycywgXG4gICAgICBjb29yZHM6IGNvb3JkcywgXG4gICAgICB0OiB0dXJuc3RpbGVUb2tlbiBcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxNTAwMCk7IC8vIFRpbWVvdXQgZGUgMTUgc2VndW5kb3NcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFTRX0vczAvcGl4ZWwvJHt0aWxlWH0vJHt0aWxlWX1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JyB9LFxuICAgICAgYm9keTogYm9keSxcbiAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWxcbiAgICB9KTtcblxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICB0cnkgeyBhd2FpdCByZXNwb25zZS5qc29uKCk7IH0gY2F0Y2ggeyAvKiBJZ25vcmUgSlNPTiBwYXJzaW5nIGVycm9ycyAqLyB9XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHUyNzRDIDQwMyBGb3JiaWRkZW4uIFR1cm5zdGlsZSB0b2tlbiBtaWdodCBiZSBpbnZhbGlkIG9yIGV4cGlyZWQuXCIpO1xuICAgICAgXG4gICAgICAvLyBUcnkgdG8gZ2VuZXJhdGUgYSBuZXcgdG9rZW4gYW5kIHJldHJ5IG9uY2VcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiXHVEODNEXHVERDA0IFJlZ2VuZXJhdGluZyBUdXJuc3RpbGUgdG9rZW4gYWZ0ZXIgNDAzLi4uXCIpO1xuICAgICAgICBjb25zdCBuZXdUb2tlbiA9IGF3YWl0IGVuc3VyZVRva2VuKHRydWUpOyAvLyBGb3JjZSBuZXcgdG9rZW4gZ2VuZXJhdGlvblxuICAgICAgICBcbiAgICAgICAgLy8gUmV0cnkgdGhlIHJlcXVlc3Qgd2l0aCBuZXcgdG9rZW5cbiAgICAgICAgY29uc3QgcmV0cnlCb2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBcbiAgICAgICAgICBjb2xvcnM6IGNvbG9ycywgXG4gICAgICAgICAgY29vcmRzOiBjb29yZHMsIFxuICAgICAgICAgIHQ6IG5ld1Rva2VuIFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJldHJ5Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgY29uc3QgcmV0cnlUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHJldHJ5Q29udHJvbGxlci5hYm9ydCgpLCAxNTAwMCk7XG5cbiAgICAgICAgY29uc3QgcmV0cnlSZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L3MwL3BpeGVsLyR7dGlsZVh9LyR7dGlsZVl9YCwge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcgfSxcbiAgICAgICAgICBib2R5OiByZXRyeUJvZHksXG4gICAgICAgICAgc2lnbmFsOiByZXRyeUNvbnRyb2xsZXIuc2lnbmFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNsZWFyVGltZW91dChyZXRyeVRpbWVvdXRJZCk7XG4gICAgICAgIFxuICAgICAgICBpZiAocmV0cnlSZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IDQwMyxcbiAgICAgICAgICAgIGpzb246IHsgZXJyb3I6ICdGcmVzaCB0b2tlbiBleHBpcmVkIG9yIGludmFsaWQgYWZ0ZXIgcmV0cnknIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCByZXRyeURhdGEgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXRyeVJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgcmV0cnlEYXRhID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHJldHJ5RGF0YSA9IHt9OyAvLyBJZ25vcmFyIGVycm9yZXMgZGUgSlNPTiBwYXJzZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1czogcmV0cnlSZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAganNvbjogcmV0cnlEYXRhLFxuICAgICAgICAgIHN1Y2Nlc3M6IHJldHJ5UmVzcG9uc2Uub2tcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICB9IGNhdGNoIChyZXRyeUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTI3NEMgVG9rZW4gcmVnZW5lcmF0aW9uIGZhaWxlZDpcIiwgcmV0cnlFcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzOiA0MDMsXG4gICAgICAgICAganNvbjogeyBlcnJvcjogJ1Rva2VuIHJlZ2VuZXJhdGlvbiBmYWlsZWQnIH0sXG4gICAgICAgICAgc3VjY2VzczogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIHJlc3BvbnNlRGF0YSA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXNwb25zZURhdGEgPSB7fTsgLy8gSWdub3JhciBlcnJvcmVzIGRlIEpTT04gcGFyc2VcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBqc29uOiByZXNwb25zZURhdGEsXG4gICAgICBzdWNjZXNzOiByZXNwb25zZS5va1xuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogMCxcbiAgICAgIGpzb246IHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgfVxufVxuXG4vLyBQb3N0IHBcdTAwRUR4ZWwgcGFyYSBBdXRvLUltYWdlIChyZXBsaWNhZG8gZGVsIGVqZW1wbG8gY29uIG1hbmVqbyBkZSA0MDMpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9zdFBpeGVsQmF0Y2hJbWFnZSh0aWxlWCwgdGlsZVksIGNvb3JkcywgY29sb3JzLCB0dXJuc3RpbGVUb2tlbikge1xuICB0cnkge1xuICAgIC8vIFByZXBhcmUgZXhhY3QgYm9keSBmb3JtYXQgYXMgdXNlZCBpbiBleGFtcGxlXG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICBjb2xvcnM6IGNvbG9ycywgXG4gICAgICBjb29yZHM6IGNvb3JkcywgXG4gICAgICB0OiB0dXJuc3RpbGVUb2tlbiBcbiAgICB9KTtcbiAgICBcbiAgICBsb2coYFtBUEldIFNlbmRpbmcgYmF0Y2ggdG8gdGlsZSAke3RpbGVYfSwke3RpbGVZfSB3aXRoICR7Y29sb3JzLmxlbmd0aH0gcGl4ZWxzLCB0b2tlbjogJHt0dXJuc3RpbGVUb2tlbiA/IHR1cm5zdGlsZVRva2VuLnN1YnN0cmluZygwLCA1MCkgKyAnLi4uJyA6ICdudWxsJ31gKTtcbiAgICBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L3MwL3BpeGVsLyR7dGlsZVh9LyR7dGlsZVl9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcgfSxcbiAgICAgIGJvZHk6IGJvZHlcbiAgICB9KTtcblxuICAgIGxvZyhgW0FQSV0gUmVzcG9uc2U6ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgIHRyeSB7IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsgfSBjYXRjaCB7IC8qIElnbm9yZSBKU09OIHBhcnNpbmcgZXJyb3JzICovIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTI3NEMgNDAzIEZvcmJpZGRlbi4gVHVybnN0aWxlIHRva2VuIG1pZ2h0IGJlIGludmFsaWQgb3IgZXhwaXJlZC5cIik7XG4gICAgICBcbiAgICAgIC8vIFRyeSB0byBnZW5lcmF0ZSBhIG5ldyB0b2tlbiBhbmQgcmV0cnkgb25jZVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJcdUQ4M0RcdUREMDQgUmVnZW5lcmF0aW5nIFR1cm5zdGlsZSB0b2tlbiBhZnRlciA0MDMuLi5cIik7XG4gICAgICAgIFxuICAgICAgICAvLyBGb3JjZSBpbnZhbGlkYXRpb24gb2YgY3VycmVudCB0b2tlbiBhbmQgZ2V0IGNvbXBsZXRlbHkgZnJlc2ggb25lXG4gICAgICAgIGNvbnN0IG5ld1Rva2VuID0gYXdhaXQgZW5zdXJlVG9rZW4odHJ1ZSk7IC8vIEZvcmNlIG5ldyB0b2tlbiBnZW5lcmF0aW9uXG4gICAgICAgIFxuICAgICAgICBpZiAoIW5ld1Rva2VuKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogNDAzLFxuICAgICAgICAgICAganNvbjogeyBlcnJvcjogJ0NvdWxkIG5vdCBnZW5lcmF0ZSBuZXcgdG9rZW4nIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIHBhaW50ZWQ6IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBSZXRyeSB0aGUgcmVxdWVzdCB3aXRoIG5ldyB0b2tlblxuICAgICAgICBjb25zdCByZXRyeUJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgICAgIGNvbG9yczogY29sb3JzLCBcbiAgICAgICAgICBjb29yZHM6IGNvb3JkcywgXG4gICAgICAgICAgdDogbmV3VG9rZW4gXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgbG9nKGBbQVBJXSBSZXRyeWluZyB3aXRoIGZyZXNoIHRva2VuOiAke25ld1Rva2VuLnN1YnN0cmluZygwLCA1MCl9Li4uYCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCByZXRyeVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFTRX0vczAvcGl4ZWwvJHt0aWxlWH0vJHt0aWxlWX1gLCB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JyB9LFxuICAgICAgICAgIGJvZHk6IHJldHJ5Qm9keVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGxvZyhgW0FQSV0gUmV0cnkgcmVzcG9uc2U6ICR7cmV0cnlSZXNwb25zZS5zdGF0dXN9ICR7cmV0cnlSZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICBcbiAgICAgICAgaWYgKHJldHJ5UmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiA0MDMsXG4gICAgICAgICAgICBqc29uOiB7IGVycm9yOiAnRnJlc2ggdG9rZW4gc3RpbGwgZXhwaXJlZCBvciBpbnZhbGlkIGFmdGVyIHJldHJ5JyB9LFxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBwYWludGVkOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHJldHJ5RGF0YSA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJldHJ5UmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgIGlmICh0ZXh0LnRyaW0oKSkge1xuICAgICAgICAgICAgcmV0cnlEYXRhID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0cnlEYXRhID0ge307IC8vIEVtcHR5IHJlc3BvbnNlXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChwYXJzZUVycm9yKSB7XG4gICAgICAgICAgbG9nKGBbQVBJXSBXYXJuaW5nOiBDb3VsZCBub3QgcGFyc2UgcmV0cnkgcmVzcG9uc2UgSlNPTjogJHtwYXJzZUVycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0cnlEYXRhID0ge307IC8vIFVzZSBlbXB0eSBvYmplY3QgaWYgSlNPTiBwYXJzZSBmYWlsc1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwYWludGVkID0gcmV0cnlEYXRhPy5wYWludGVkIHx8IDA7XG4gICAgICAgIGxvZyhgW0FQSV0gUmV0cnkgcmVzdWx0OiAke3BhaW50ZWR9IHBpeGVscyBwYWludGVkYCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1czogcmV0cnlSZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAganNvbjogcmV0cnlEYXRhLFxuICAgICAgICAgIHN1Y2Nlc3M6IHJldHJ5UmVzcG9uc2Uub2ssXG4gICAgICAgICAgcGFpbnRlZDogcGFpbnRlZFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgIH0gY2F0Y2ggKHJldHJ5RXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlx1Mjc0QyBUb2tlbiByZWdlbmVyYXRpb24gZmFpbGVkOlwiLCByZXRyeUVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXM6IDQwMyxcbiAgICAgICAgICBqc29uOiB7IGVycm9yOiAnVG9rZW4gcmVnZW5lcmF0aW9uIGZhaWxlZDogJyArIHJldHJ5RXJyb3IubWVzc2FnZSB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIHBhaW50ZWQ6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGlmICh0ZXh0LnRyaW0oKSkge1xuICAgICAgICByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzcG9uc2VEYXRhID0ge307IC8vIEVtcHR5IHJlc3BvbnNlXG4gICAgICB9XG4gICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgbG9nKGBbQVBJXSBXYXJuaW5nOiBDb3VsZCBub3QgcGFyc2UgcmVzcG9uc2UgSlNPTjogJHtwYXJzZUVycm9yLm1lc3NhZ2V9YCk7XG4gICAgICByZXNwb25zZURhdGEgPSB7fTsgLy8gVXNlIGVtcHR5IG9iamVjdCBpZiBKU09OIHBhcnNlIGZhaWxzXG4gICAgfVxuXG4gICAgY29uc3QgcGFpbnRlZCA9IHJlc3BvbnNlRGF0YT8ucGFpbnRlZCB8fCAwO1xuICAgIGxvZyhgW0FQSV0gU3VjY2VzczogJHtwYWludGVkfSBwaXhlbHMgcGFpbnRlZGApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAganNvbjogcmVzcG9uc2VEYXRhLFxuICAgICAgc3VjY2VzczogcmVzcG9uc2Uub2ssXG4gICAgICBwYWludGVkOiBwYWludGVkXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coYFtBUEldIE5ldHdvcmsgZXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiAwLFxuICAgICAganNvbjogeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBwYWludGVkOiAwXG4gICAgfTtcbiAgfVxufVxuIiwgIi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5leHBvcnQgY29uc3Qgc2xlZXAgPSAobXMpID0+IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCBtcykpO1xuZXhwb3J0IGNvbnN0IHJhbmRJbnQgPSAobikgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbik7XG5leHBvcnQgY29uc3Qgbm9vcCA9ICgpID0+IHsgLyogRnVuY2lcdTAwRjNuIHZhY1x1MDBFRGEgaW50ZW5jaW9uYWwgKi8gfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKG4sIGEsIGIpIHtcbiAgcmV0dXJuIE1hdGgubWF4KGEsIE1hdGgubWluKGIsIG4pKTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgc2VsZWN0b3IgZGUgZWxlbWVudG9zIERPTVxuZXhwb3J0IGZ1bmN0aW9uICQoc2VsZWN0b3IsIHJvb3QgPSBkb2N1bWVudCkge1xuICByZXR1cm4gcm9vdC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgaGFjZXIgZWxlbWVudG9zIGFycmFzdHJhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGRyYWdIZWFkZXIoaGVhZGVyRWwsIHBhbmVsRWwpIHtcbiAgbGV0IG9mZnNldFggPSAwLCBvZmZzZXRZID0gMCwgbW91c2VYID0gMCwgbW91c2VZID0gMDtcblxuICBoZWFkZXJFbC5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gIGhlYWRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN0YXJ0RHJhZyk7XG5cbiAgZnVuY3Rpb24gc3RhcnREcmFnKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbW91c2VYID0gZS5jbGllbnRYO1xuICAgIG1vdXNlWSA9IGUuY2xpZW50WTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcERyYWcpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRvRHJhZyk7XG4gIH1cblxuICBmdW5jdGlvbiBkb0RyYWcoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBvZmZzZXRYID0gbW91c2VYIC0gZS5jbGllbnRYO1xuICAgIG9mZnNldFkgPSBtb3VzZVkgLSBlLmNsaWVudFk7XG4gICAgbW91c2VYID0gZS5jbGllbnRYO1xuICAgIG1vdXNlWSA9IGUuY2xpZW50WTtcbiAgICBcbiAgICBjb25zdCBuZXdUb3AgPSBwYW5lbEVsLm9mZnNldFRvcCAtIG9mZnNldFk7XG4gICAgY29uc3QgbmV3TGVmdCA9IHBhbmVsRWwub2Zmc2V0TGVmdCAtIG9mZnNldFg7XG4gICAgXG4gICAgcGFuZWxFbC5zdHlsZS50b3AgPSBNYXRoLm1heCgwLCBuZXdUb3ApICsgJ3B4JztcbiAgICBwYW5lbEVsLnN0eWxlLmxlZnQgPSBNYXRoLm1heCgwLCBuZXdMZWZ0KSArICdweCc7XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wRHJhZygpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcERyYWcpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRvRHJhZyk7XG4gIH1cbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgZm9ybWF0ZWFyIHRpZW1wb1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFRpbWUobXMpIHtcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IobXMgLyAxMDAwKTtcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCk7XG4gIFxuICBpZiAoaG91cnMgPiAwKSB7XG4gICAgcmV0dXJuIGAke2hvdXJzfWggJHttaW51dGVzICUgNjB9bWA7XG4gIH0gZWxzZSBpZiAobWludXRlcyA+IDApIHtcbiAgICByZXR1cm4gYCR7bWludXRlc31tICR7c2Vjb25kcyAlIDYwfXNgO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgJHtzZWNvbmRzfXNgO1xuICB9XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIHBhcnNlYXIgaGV4YWRlY2ltYWxcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhleChzdHIpIHtcbiAgcmV0dXJuIHBhcnNlSW50KHN0ci5yZXBsYWNlKCcjJywgJycpLCAxNik7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGNvbnZlcnRpciBuXHUwMEZBbWVybyBhIGhleFxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4KG51bSkge1xuICByZXR1cm4gJyMnICsgbnVtLnRvU3RyaW5nKDE2KS5wYWRTdGFydCg2LCAnMCcpO1xufVxuIiwgImV4cG9ydCBjb25zdCBlcyA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU2VsZWNjaVx1MDBGM24nLFxuICAgIHVzZXI6ICdVc3VhcmlvJyxcbiAgICBjaGFyZ2VzOiAnQ2FyZ2FzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdEYXRhYmFzZScsXG4gICAgdXB0aW1lOiAnVXB0aW1lJyxcbiAgICBjbG9zZTogJ0NlcnJhcicsXG4gICAgbGF1bmNoOiAnTGFuemFyJyxcbiAgICBsb2FkaW5nOiAnQ2FyZ2FuZG9cdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0VqZWN1dGFuZG9cdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnRGVzY2FyZ2FuZG8gc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdFbGlnZSB1biBib3QgeSBwcmVzaW9uYSBMYW56YXInLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdMaXN0byBwYXJhIGxhbnphcicsXG4gICAgbG9hZEVycm9yOiAnRXJyb3IgYWwgY2FyZ2FyJyxcbiAgICBsb2FkRXJyb3JNc2c6ICdObyBzZSBwdWRvIGNhcmdhciBlbCBib3Qgc2VsZWNjaW9uYWRvLiBSZXZpc2EgdHUgY29uZXhpXHUwMEYzbiBvIGludFx1MDBFOW50YWxvIGRlIG51ZXZvLicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgVmVyaWZpY2FuZG8uLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBPbmxpbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgT2ZmbGluZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycm9yJyxcbiAgICB1bmtub3duOiAnLScsXG4gICAgbG9nV2luZG93OiAnTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdMb2dzIC0ge2JvdE5hbWV9JyxcbiAgICBkb3dubG9hZExvZ3M6ICdEZXNjYXJnYXIgTG9ncycsXG4gICAgY2xlYXJMb2dzOiAnTGltcGlhciBMb2dzJyxcbiAgICBjbG9zZUxvZ3M6ICdDZXJyYXInXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaWNpYXIgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJTdWJpciBJbWFnZW5cIixcbiAgICByZXNpemVJbWFnZTogXCJSZWRpbWVuc2lvbmFyIEltYWdlblwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjY2lvbmFyIFBvc2ljaVx1MDBGM25cIixcbiAgICBzdGFydFBhaW50aW5nOiBcIkluaWNpYXIgUGludHVyYVwiLFxuICAgIHN0b3BQYWludGluZzogXCJEZXRlbmVyIFBpbnR1cmFcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiR3VhcmRhciBQcm9ncmVzb1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJDYXJnYXIgUHJvZ3Jlc29cIixcblxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBWZXJpZmljYW5kbyBjb2xvcmVzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHUwMEExQWJyZSBsYSBwYWxldGEgZGUgY29sb3JlcyBlbiBlbCBzaXRpbyBlIGludFx1MDBFOW50YWxvIGRlIG51ZXZvIVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvbG9yZXMgZGlzcG9uaWJsZXMgZW5jb250cmFkb3NcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIENhcmdhbmRvIGltYWdlbi4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBJbWFnZW4gY2FyZ2FkYSBjb24ge2NvdW50fSBwXHUwMEVEeGVsZXMgdlx1MDBFMWxpZG9zXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgRXJyb3IgYWwgY2FyZ2FyIGxhIGltYWdlblwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHUwMEExUGludGEgZWwgcHJpbWVyIHBcdTAwRUR4ZWwgZW4gbGEgdWJpY2FjaVx1MDBGM24gZG9uZGUgcXVpZXJlcyBxdWUgY29taWVuY2UgZWwgYXJ0ZSFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBxdWUgcGludGVzIGVsIHBcdTAwRUR4ZWwgZGUgcmVmZXJlbmNpYS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTAwQTFQb3NpY2lcdTAwRjNuIGVzdGFibGVjaWRhIGNvbiBcdTAwRTl4aXRvIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2Npb25hciBwb3NpY2lcdTAwRjNuXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgUG9zaWNpXHUwMEYzbiBkZXRlY3RhZGEsIHByb2Nlc2FuZG8uLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJvciBkZXRlY3RhbmRvIHBvc2ljaVx1MDBGM24sIGludFx1MDBFOW50YWxvIGRlIG51ZXZvXCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggSW5pY2lhbmRvIHBpbnR1cmEuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9ncmVzbzoge3BhaW50ZWR9L3t0b3RhbH0gcFx1MDBFRHhlbGVzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBTaW4gY2FyZ2FzLiBFc3BlcmFuZG8ge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQaW50dXJhIGRldGVuaWRhIHBvciBlbCB1c3VhcmlvXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgXHUwMEExUGludHVyYSBjb21wbGV0YWRhISB7Y291bnR9IHBcdTAwRUR4ZWxlcyBwaW50YWRvcy5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJvciBkdXJhbnRlIGxhIHBpbnR1cmFcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBDYXJnYSB1bmEgaW1hZ2VuIHkgc2VsZWNjaW9uYSB1bmEgcG9zaWNpXHUwMEYzbiBwcmltZXJvXCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3Jlc29cIixcbiAgICB1c2VyTmFtZTogXCJVc3VhcmlvXCIsXG4gICAgcGl4ZWxzOiBcIlBcdTAwRUR4ZWxlc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2FyZ2FzXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJUaWVtcG8gZXN0aW1hZG9cIixcbiAgICBpbml0TWVzc2FnZTogXCJIYXogY2xpYyBlbiAnSW5pY2lhciBBdXRvLUJPVCcgcGFyYSBjb21lbnphclwiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVzcGVyYW5kbyBpbmljaWFsaXphY2lcdTAwRjNuLi4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgSW1hZ2VuIHJlZGltZW5zaW9uYWRhIGEge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQaW50dXJhIHBhdXNhZGEgZW4gbGEgcG9zaWNpXHUwMEYzbiBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBcdTAwRUR4ZWxlcyBwb3IgbG90ZVwiLFxuICAgIGJhdGNoU2l6ZTogXCJUYW1hXHUwMEYxbyBkZWwgbG90ZVwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiU2lndWllbnRlIGxvdGUgZW5cIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlVzYXIgdG9kYXMgbGFzIGNhcmdhcyBkaXNwb25pYmxlc1wiLFxuICAgIHNob3dPdmVybGF5OiBcIk1vc3RyYXIgb3ZlcmxheVwiLFxuICAgIG1heENoYXJnZXM6IFwiQ2FyZ2FzIG1cdTAwRTF4aW1hcyBwb3IgbG90ZVwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBFc3BlcmFuZG8gY2FyZ2FzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRpZW1wbyByZXN0YW50ZVwiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgRXNwZXJhbmRvIHt0aW1lfSBwYXJhIGNvbnRpbnVhci4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyZXNvIGd1YXJkYWRvIGNvbW8ge2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBQcm9ncmVzbyBjYXJnYWRvOiB7cGFpbnRlZH0ve3RvdGFsfSBwXHUwMEVEeGVsZXMgcGludGFkb3NcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgRXJyb3IgYWwgY2FyZ2FyIHByb2dyZXNvOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGd1YXJkYXIgcHJvZ3Jlc286IHtlcnJvcn1cIixcblxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiXHUwMEJGRGVzZWFzIGd1YXJkYXIgZWwgcHJvZ3Jlc28gYWN0dWFsIGFudGVzIGRlIGRldGVuZXI/XCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiR3VhcmRhciBQcm9ncmVzb1wiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJEZXNjYXJ0YXJcIixcbiAgICBjYW5jZWw6IFwiQ2FuY2VsYXJcIixcbiAgICBtaW5pbWl6ZTogXCJNaW5pbWl6YXJcIixcbiAgICB3aWR0aDogXCJBbmNob1wiLFxuICAgIGhlaWdodDogXCJBbHRvXCIsIFxuICAgIGtlZXBBc3BlY3Q6IFwiTWFudGVuZXIgcHJvcG9yY2lcdTAwRjNuXCIsXG4gICAgYXBwbHk6IFwiQXBsaWNhclwiLFxuICBvdmVybGF5T246IFwiT3ZlcmxheTogT05cIixcbiAgb3ZlcmxheU9mZjogXCJPdmVybGF5OiBPRkZcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBQYXNhZGEgY29tcGxldGFkYToge3BhaW50ZWR9IHBcdTAwRUR4ZWxlcyBwaW50YWRvcyB8IFByb2dyZXNvOiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBFc3BlcmFuZG8gcmVnZW5lcmFjaVx1MDBGM24gZGUgY2FyZ2FzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBUaWVtcG86IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBFc3BlcmFuZG8gY2FyZ2FzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBRdWVkYW46IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEluaWNpYWxpemFuZG8gYXV0b21cdTAwRTF0aWNhbWVudGUuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEJvdCBpbmljaWFkbyBhdXRvbVx1MDBFMXRpY2FtZW50ZVwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBObyBzZSBwdWRvIGluaWNpYXIgYXV0b21cdTAwRTF0aWNhbWVudGUuIFVzYSBlbCBib3RcdTAwRjNuIG1hbnVhbC5cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFBhbGV0YSBkZSBjb2xvcmVzIGRldGVjdGFkYVwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgQnVzY2FuZG8gcGFsZXRhIGRlIGNvbG9yZXMuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBIYWNpZW5kbyBjbGljIGVuIGVsIGJvdFx1MDBGM24gUGFpbnQuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG9cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IEluaWNpbyBtYW51YWwgcmVxdWVyaWRvXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBSZWludGVudG8ge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gZW4ge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBFcnJvciBlbiBpbnRlbnRvIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9LCByZWludGVudGFuZG8gZW4ge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgRmFsbFx1MDBGMyBkZXNwdVx1MDBFOXMgZGUge21heEF0dGVtcHRzfSBpbnRlbnRvcy4gQ29udGludWFuZG8gY29uIHNpZ3VpZW50ZSBsb3RlLi4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBFcnJvciBkZSByZWQuIFJlaW50ZW50YW5kby4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBFcnJvciBkZWwgc2Vydmlkb3IuIFJlaW50ZW50YW5kby4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgVGltZW91dCBkZWwgc2Vydmlkb3IuIFJlaW50ZW50YW5kby4uLlwiLFxuICAgIC8vIE51ZXZvcyB0ZXh0b3MgdjIuMFxuICAgIHByb3RlY3Rpb25FbmFibGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gaGFiaWxpdGFkYVwiLFxuICAgIHByb3RlY3Rpb25EaXNhYmxlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjY2lcdTAwRjNuIGRlc2hhYmlsaXRhZGFcIiwgXG4gICAgcGFpbnRQYXR0ZXJuOiBcIlx1RDgzRFx1RENEMCBQYXRyXHUwMEYzbiBkZSBwaW50YWRvXCIsXG4gICAgcGF0dGVybkxpbmVhclN0YXJ0OiBcIkxpbmVhbCAoSW5pY2lvKVwiLFxuICAgIHBhdHRlcm5MaW5lYXJFbmQ6IFwiTGluZWFsIChGaW5hbClcIixcbiAgICBwYXR0ZXJuUmFuZG9tOiBcIkFsZWF0b3Jpb1wiLFxuICAgIHBhdHRlcm5DZW50ZXJPdXQ6IFwiQ2VudHJvIGhhY2lhIGFmdWVyYVwiLFxuICAgIHBhdHRlcm5Db3JuZXJzRmlyc3Q6IFwiRXNxdWluYXMgcHJpbWVyb1wiLFxuICAgIHBhdHRlcm5TcGlyYWw6IFwiRXNwaXJhbFwiLFxuICAgIHByb3RlY3RpbmdEcmF3aW5nOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWdpZW5kbyBkaWJ1am8uLi5cIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2FtYmlvcyBkZXRlY3RhZG9zIGVuIGVsIGRpYnVqb1wiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdUREMjcgUmVwYXJhbmRvIHtjb3VudH0gcFx1MDBFRHhlbGVzIGFsdGVyYWRvcy4uLlwiLFxuICAgIHJlcGFpckNvbXBsZXRlZDogXCJcdTI3MDUgUmVwYXJhY2lcdTAwRjNuIGNvbXBsZXRhZGE6IHtjb3VudH0gcFx1MDBFRHhlbGVzXCIsXG4gICAgbm9DaGFyZ2VzRm9yUmVwYWlyOiBcIlx1MjZBMSBTaW4gY2FyZ2FzIHBhcmEgcmVwYXJhciwgZXNwZXJhbmRvLi4uXCIsXG4gICAgcHJvdGVjdGlvblByaW9yaXR5OiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcmlvcmlkYWQgZGUgcHJvdGVjY2lcdTAwRjNuIGFjdGl2YWRhXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIkRlc2NhcmdhciBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkxpbXBpYXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJDZXJyYXJcIixcbiAgICAvLyBOdWV2YXMgZnVuY2lvbmFsaWRhZGVzXG4gICAgcGFpbnRpbmdTdGF0czogXCJFc3RhZFx1MDBFRHN0aWNhcyBkZSBQaW50YWRvXCIsXG4gICAgdXNlckluZm86IFwiSW5mb3JtYWNpXHUwMEYzbiBkZWwgVXN1YXJpb1wiLFxuICAgIGltYWdlUHJvZ3Jlc3M6IFwiUHJvZ3Jlc28gZGUgbGEgSW1hZ2VuXCIsXG4gICAgYXZhaWxhYmxlQ29sb3JzOiBcIkNvbG9yZXMgRGlzcG9uaWJsZXNcIixcbiAgICByZWZyZXNoU3RhdHM6IFwiQWN0dWFsaXphciBFc3RhZFx1MDBFRHN0aWNhc1wiLFxuICAgIG5vSW1hZ2VMb2FkZWQ6IFwiTm8gaGF5IGltYWdlbiBjYXJnYWRhXCIsXG4gICAgY29vbGRvd246IFwiVGllbXBvIGRlIGVzcGVyYVwiLFxuICAgIHRvdGFsQ29sb3JzOiBcIlRvdGFsIGRlIENvbG9yZXNcIixcbiAgICBjb2xvclBhbGV0dGU6IFwiUGFsZXRhIGRlIENvbG9yZXNcIixcbiAgICBzaG93QWxsQ29sb3JzOiBcIk1vc3RyYXIgVG9kb3MgbG9zIENvbG9yZXMgKGluY2x1eWVuZG8gbm8gZGlzcG9uaWJsZXMpXCIsXG4gICAgc2VsZWN0QWxsQ29sb3JzOiBcIlNlbGVjY2lvbmFyIFRvZG9zXCIsXG4gICAgdW5zZWxlY3RBbGxDb2xvcnM6IFwiRGVzZWxlY2Npb25hciBUb2Rvc1wiLFxuICAgIG5vQXZhaWxhYmxlOiBcIk5vIGRpc3BvbmlibGVcIixcbiAgICBjb2xvclNlbGVjdGVkOiBcIkNvbG9yIHNlbGVjY2lvbmFkb1wiLFxuICAgIHN0YXRzVXBkYXRlZDogXCJcdTI3MDUgRXN0YWRcdTAwRURzdGljYXMgYWN0dWFsaXphZGFzOiB7Y291bnR9IGNvbG9yZXMgZGlzcG9uaWJsZXNcIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlIChwb3IgaW1wbGVtZW50YXIpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgRmFybSBCb3RcIixcbiAgICBzdGFydDogXCJJbmljaWFyXCIsXG4gICAgc3RvcDogXCJEZXRlbmVyXCIsIFxuICAgIHN0b3BwZWQ6IFwiQm90IGRldGVuaWRvXCIsXG4gICAgY2FsaWJyYXRlOiBcIkNhbGlicmFyXCIsXG4gICAgcGFpbnRPbmNlOiBcIlVuYSB2ZXpcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJWZXJpZmljYW5kbyBlc3RhZG8uLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYWNpXHUwMEYzblwiLFxuICAgIGRlbGF5OiBcIkRlbGF5IChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQXHUwMEVEeGVsZXMvbG90ZVwiLFxuICAgIG1pbkNoYXJnZXM6IFwiQ2FyZ2FzIG1cdTAwRURuXCIsXG4gICAgY29sb3JNb2RlOiBcIk1vZG8gY29sb3JcIixcbiAgICByYW5kb206IFwiQWxlYXRvcmlvXCIsXG4gICAgZml4ZWQ6IFwiRmlqb1wiLFxuICAgIHJhbmdlOiBcIlJhbmdvXCIsXG4gICAgZml4ZWRDb2xvcjogXCJDb2xvciBmaWpvXCIsXG4gICAgYWR2YW5jZWQ6IFwiQXZhbnphZG9cIixcbiAgICB0aWxlWDogXCJUaWxlIFhcIixcbiAgICB0aWxlWTogXCJUaWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlBhbGV0YSBwZXJzb25hbGl6YWRhXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZWo6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJhclwiLFxuICAgIHBhaW50ZWQ6IFwiUGludGFkb3NcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIHJldHJpZXM6IFwiRmFsbG9zXCIsXG4gICAgdGlsZTogXCJUaWxlXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiQ29uZmlndXJhY2lcdTAwRjNuIGd1YXJkYWRhXCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiBjYXJnYWRhXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiQ29uZmlndXJhY2lcdTAwRjNuIHJlaW5pY2lhZGFcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBpbnRhIHVuIHBcdTAwRUR4ZWwgbWFudWFsbWVudGUgcGFyYSBjYXB0dXJhciBjb29yZGVuYWRhcy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiQmFja2VuZCBPbmxpbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIE9mZmxpbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJJbmljaWFuZG8gYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiRGV0ZW5pZW5kbyBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhbmRvLi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiQXV0by1GYXJtIHlhIGVzdFx1MDBFMSBjb3JyaWVuZG8uXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGVzdFx1MDBFMSBlamVjdXRcdTAwRTFuZG9zZS4gQ2lcdTAwRTlycmFsbyBhbnRlcyBkZSBpbmljaWFyIEF1dG8tRmFybS5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTZWxlY2Npb25hciBab25hXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGludGEgdW4gcFx1MDBFRHhlbCBlbiB1bmEgem9uYSBERVNQT0JMQURBIGRlbCBtYXBhIHBhcmEgZXN0YWJsZWNlciBlbCBcdTAwRTFyZWEgZGUgZmFybWluZ1wiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRXNwZXJhbmRvIHF1ZSBwaW50ZXMgZWwgcFx1MDBFRHhlbCBkZSByZWZlcmVuY2lhLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1MDBBMVpvbmEgZXN0YWJsZWNpZGEhIFJhZGlvOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2Npb25hciB6b25hXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTZWxlY2Npb25hIHVuYSB6b25hIHByaW1lcm8gdXNhbmRvICdTZWxlY2Npb25hciBab25hJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiUmFkaW8gZmFybVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJab25hIGFjdHVhbFwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgRmFybWluZyBlbiByYWRpbyB7cmFkaXVzfXB4IGRlc2RlICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgSU1QT1JUQU5URTogU2VsZWNjaW9uYSB1bmEgem9uYSBERVNQT0JMQURBIHBhcmEgZXZpdGFyIGNvbmZsaWN0b3NcIixcbiAgICBub1Bvc2l0aW9uOiBcIlNpbiB6b25hXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uYTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTZWxlY2Npb25hIHVuYSB6b25hIHByaW1lcm8uIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gZWwgbWFwYSBwYXJhIGVzdGFibGVjZXIgbGEgem9uYSBkZSBmYXJtaW5nXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIkRlc2NhcmdhciBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkxpbXBpYXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJDZXJyYXJcIlxuICB9LFxuXG4gIC8vIENvbW1vbi9TaGFyZWRcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlNcdTAwRURcIixcbiAgICBubzogXCJOb1wiLFxuICAgIG9rOiBcIkFjZXB0YXJcIixcbiAgICBjYW5jZWw6IFwiQ2FuY2VsYXJcIixcbiAgICBjbG9zZTogXCJDZXJyYXJcIixcbiAgICBzYXZlOiBcIkd1YXJkYXJcIixcbiAgICBsb2FkOiBcIkNhcmdhclwiLFxuICAgIGRlbGV0ZTogXCJFbGltaW5hclwiLFxuICAgIGVkaXQ6IFwiRWRpdGFyXCIsXG4gICAgc3RhcnQ6IFwiSW5pY2lhclwiLFxuICAgIHN0b3A6IFwiRGV0ZW5lclwiLFxuICAgIHBhdXNlOiBcIlBhdXNhclwiLFxuICAgIHJlc3VtZTogXCJSZWFudWRhclwiLFxuICAgIHJlc2V0OiBcIlJlaW5pY2lhclwiLFxuICAgIHNldHRpbmdzOiBcIkNvbmZpZ3VyYWNpXHUwMEYzblwiLFxuICAgIGhlbHA6IFwiQXl1ZGFcIixcbiAgICBhYm91dDogXCJBY2VyY2EgZGVcIixcbiAgICBsYW5ndWFnZTogXCJJZGlvbWFcIixcbiAgICBsb2FkaW5nOiBcIkNhcmdhbmRvLi4uXCIsXG4gICAgZXJyb3I6IFwiRXJyb3JcIixcbiAgICBzdWNjZXNzOiBcIlx1MDBDOXhpdG9cIixcbiAgICB3YXJuaW5nOiBcIkFkdmVydGVuY2lhXCIsXG4gICAgaW5mbzogXCJJbmZvcm1hY2lcdTAwRjNuXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIklkaW9tYSBjYW1iaWFkbyBhIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIEd1YXJkIE1vZHVsZVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBBdXRvLUd1YXJkXCIsXG4gICAgaW5pdEJvdDogXCJJbmljaWFsaXphciBHdWFyZC1CT1RcIixcbiAgICBzZWxlY3RBcmVhOiBcIlNlbGVjY2lvbmFyIFx1MDBDMXJlYVwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIkNhcHR1cmFyIFx1MDBDMXJlYVwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJJbmljaWFyIFByb3RlY2NpXHUwMEYzblwiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIkRldGVuZXIgUHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgdXBwZXJMZWZ0OiBcIkVzcXVpbmEgU3VwZXJpb3IgSXpxdWllcmRhXCIsXG4gICAgbG93ZXJSaWdodDogXCJFc3F1aW5hIEluZmVyaW9yIERlcmVjaGFcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiUFx1MDBFRHhlbGVzIFByb3RlZ2lkb3NcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiQ2FtYmlvcyBEZXRlY3RhZG9zXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiUFx1MDBFRHhlbGVzIFJlcGFyYWRvc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2FyZ2FzXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiRXNwZXJhbmRvIGluaWNpYWxpemFjaVx1MDBGM24uLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggVmVyaWZpY2FuZG8gY29sb3JlcyBkaXNwb25pYmxlcy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIE5vIHNlIGVuY29udHJhcm9uIGNvbG9yZXMuIEFicmUgbGEgcGFsZXRhIGRlIGNvbG9yZXMgZW4gZWwgc2l0aW8uXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IHtjb3VudH0gY29sb3JlcyBkaXNwb25pYmxlcyBlbmNvbnRyYWRvc1wiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgaW5pY2lhbGl6YWRvIGNvcnJlY3RhbWVudGVcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIEVycm9yIGluaWNpYWxpemFuZG8gR3VhcmQtQk9UXCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgQ29vcmRlbmFkYXMgaW52XHUwMEUxbGlkYXNcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgRWwgXHUwMEUxcmVhIGRlYmUgdGVuZXIgZXNxdWluYSBzdXBlcmlvciBpenF1aWVyZGEgbWVub3IgcXVlIGluZmVyaW9yIGRlcmVjaGFcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFx1MDBDMXJlYSBkZW1hc2lhZG8gZ3JhbmRlOiB7c2l6ZX0gcFx1MDBFRHhlbGVzIChtXHUwMEUxeGltbzoge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggQ2FwdHVyYW5kbyBcdTAwRTFyZWEgZGUgcHJvdGVjY2lcdTAwRjNuLi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBcdTAwQzFyZWEgY2FwdHVyYWRhOiB7Y291bnR9IHBcdTAwRUR4ZWxlcyBiYWpvIHByb3RlY2NpXHUwMEYzblwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgRXJyb3IgY2FwdHVyYW5kbyBcdTAwRTFyZWE6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIFByaW1lcm8gY2FwdHVyYSB1biBcdTAwRTFyZWEgZGUgcHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY2NpXHUwMEYzbiBpbmljaWFkYSAtIG1vbml0b3JlYW5kbyBcdTAwRTFyZWFcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUHJvdGVjY2lcdTAwRjNuIGRldGVuaWRhXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBcdTAwQzFyZWEgcHJvdGVnaWRhIC0gc2luIGNhbWJpb3MgZGV0ZWN0YWRvc1wiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBjYW1iaW9zIGRldGVjdGFkb3MgZW4gZWwgXHUwMEUxcmVhIHByb3RlZ2lkYVwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgUmVwYXJhbmRvIHtjb3VudH0gcFx1MDBFRHhlbGVzIGFsdGVyYWRvcy4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgUmVwYXJhZG9zIHtjb3VudH0gcFx1MDBFRHhlbGVzIGNvcnJlY3RhbWVudGVcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgRXJyb3IgcmVwYXJhbmRvIHBcdTAwRUR4ZWxlczoge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgU2luIGNhcmdhcyBzdWZpY2llbnRlcyBwYXJhIHJlcGFyYXIgY2FtYmlvc1wiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgVmVyaWZpY2FuZG8gY2FtYmlvcyBlbiBcdTAwRTFyZWEgcHJvdGVnaWRhLi4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgRXJyb3IgdmVyaWZpY2FuZG8gY2FtYmlvczoge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBHdWFyZGlcdTAwRTFuIGFjdGl2byAtIFx1MDBFMXJlYSBiYWpvIHByb3RlY2NpXHUwMEYzblwiLFxuICAgIGxhc3RDaGVjazogXCJcdTAwREFsdGltYSB2ZXJpZmljYWNpXHUwMEYzbjoge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlByXHUwMEYzeGltYSB2ZXJpZmljYWNpXHUwMEYzbiBlbjoge3RpbWV9c1wiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEluaWNpYWxpemFuZG8gYXV0b21cdTAwRTF0aWNhbWVudGUuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBpbmljaWFkbyBhdXRvbVx1MDBFMXRpY2FtZW50ZVwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBObyBzZSBwdWRvIGluaWNpYXIgYXV0b21cdTAwRTF0aWNhbWVudGUuIFVzYSBlbCBib3RcdTAwRjNuIG1hbnVhbC5cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IEluaWNpbyBtYW51YWwgcmVxdWVyaWRvXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBQYWxldGEgZGUgY29sb3JlcyBkZXRlY3RhZGFcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIEJ1c2NhbmRvIHBhbGV0YSBkZSBjb2xvcmVzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgSGFjaWVuZG8gY2xpYyBlbiBlbCBib3RcdTAwRjNuIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm90XHUwMEYzbiBQYWludCBubyBlbmNvbnRyYWRvXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBQaW50YSB1biBwXHUwMEVEeGVsIGVuIGxhIGVzcXVpbmEgU1VQRVJJT1IgSVpRVUlFUkRBIGRlbCBcdTAwRTFyZWEgYSBwcm90ZWdlclwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIEFob3JhIHBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gbGEgZXNxdWluYSBJTkZFUklPUiBERVJFQ0hBIGRlbCBcdTAwRTFyZWFcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBFc3BlcmFuZG8gc2VsZWNjaVx1MDBGM24gZGUgZXNxdWluYSBzdXBlcmlvciBpenF1aWVyZGEuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgRXNwZXJhbmRvIHNlbGVjY2lcdTAwRjNuIGRlIGVzcXVpbmEgaW5mZXJpb3IgZGVyZWNoYS4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBFc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYSBjYXB0dXJhZGE6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IEVzcXVpbmEgaW5mZXJpb3IgZGVyZWNoYSBjYXB0dXJhZGE6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaWVtcG8gYWdvdGFkbyBwYXJhIHNlbGVjY2lcdTAwRjNuXCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIEVycm9yIGVuIHNlbGVjY2lcdTAwRjNuLCBpbnRcdTAwRTludGFsbyBkZSBudWV2b1wiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJEZXNjYXJnYXIgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJMaW1waWFyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiQ2VycmFyXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgZW4gPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NlbGVjdGlvbicsXG4gICAgdXNlcjogJ1VzZXInLFxuICAgIGNoYXJnZXM6ICdDaGFyZ2VzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdEYXRhYmFzZScsXG4gICAgdXB0aW1lOiAnVXB0aW1lJyxcbiAgICBjbG9zZTogJ0Nsb3NlJyxcbiAgICBsYXVuY2g6ICdMYXVuY2gnLFxuICAgIGxvYWRpbmc6ICdMb2FkaW5nXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFeGVjdXRpbmdcdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnRG93bmxvYWRpbmcgc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdDaG9vc2UgYSBib3QgYW5kIHByZXNzIExhdW5jaCcsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1JlYWR5IHRvIGxhdW5jaCcsXG4gICAgbG9hZEVycm9yOiAnTG9hZCBlcnJvcicsXG4gICAgbG9hZEVycm9yTXNnOiAnQ291bGQgbm90IGxvYWQgdGhlIHNlbGVjdGVkIGJvdC4gQ2hlY2sgeW91ciBjb25uZWN0aW9uIG9yIHRyeSBhZ2Fpbi4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IENoZWNraW5nLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgT25saW5lJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IE9mZmxpbmUnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIE9LJyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBFcnJvcicsXG4gICAgdW5rbm93bjogJy0nLFxuICAgIGxvZ1dpbmRvdzogJ0xvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnTG9ncyAtIHtib3ROYW1lfScsXG4gICAgZG93bmxvYWRMb2dzOiAnRG93bmxvYWQgTG9ncycsXG4gICAgY2xlYXJMb2dzOiAnQ2xlYXIgTG9ncycsXG4gICAgY2xvc2VMb2dzOiAnQ2xvc2UnXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpemUgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJVcGxvYWQgSW1hZ2VcIixcbiAgICByZXNpemVJbWFnZTogXCJSZXNpemUgSW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTZWxlY3QgUG9zaXRpb25cIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlN0YXJ0IFBhaW50aW5nXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlN0b3AgUGFpbnRpbmdcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiU2F2ZSBQcm9ncmVzc1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJMb2FkIFByb2dyZXNzXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIENoZWNraW5nIGF2YWlsYWJsZSBjb2xvcnMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBPcGVuIHRoZSBjb2xvciBwYWxldHRlIG9uIHRoZSBzaXRlIGFuZCB0cnkgYWdhaW4hXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IEZvdW5kIHtjb3VudH0gYXZhaWxhYmxlIGNvbG9yc1wiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgTG9hZGluZyBpbWFnZS4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBJbWFnZSBsb2FkZWQgd2l0aCB7Y291bnR9IHZhbGlkIHBpeGVsc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGxvYWRpbmcgaW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlBhaW50IHRoZSBmaXJzdCBwaXhlbCBhdCB0aGUgbG9jYXRpb24gd2hlcmUgeW91IHdhbnQgdGhlIGFydCB0byBzdGFydCFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHlvdSB0byBwYWludCB0aGUgcmVmZXJlbmNlIHBpeGVsLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFBvc2l0aW9uIHNldCBzdWNjZXNzZnVsbHkhXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaW1lb3V0IGZvciBwb3NpdGlvbiBzZWxlY3Rpb25cIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBQb3NpdGlvbiBkZXRlY3RlZCwgcHJvY2Vzc2luZy4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIEVycm9yIGRldGVjdGluZyBwb3NpdGlvbiwgcGxlYXNlIHRyeSBhZ2FpblwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IFN0YXJ0aW5nIHBhaW50aW5nLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgUHJvZ3Jlc3M6IHtwYWludGVkfS97dG90YWx9IHBpeGVscy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgTm8gY2hhcmdlcy4gV2FpdGluZyB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFBhaW50aW5nIHN0b3BwZWQgYnkgdXNlclwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFBhaW50aW5nIGNvbXBsZXRlZCEge2NvdW50fSBwaXhlbHMgcGFpbnRlZC5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJvciBkdXJpbmcgcGFpbnRpbmdcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBMb2FkIGFuIGltYWdlIGFuZCBzZWxlY3QgYSBwb3NpdGlvbiBmaXJzdFwiLFxuICAgIHByb2dyZXNzOiBcIlByb2dyZXNzXCIsXG4gICAgdXNlck5hbWU6IFwiVXNlclwiLFxuICAgIHBpeGVsczogXCJQaXhlbHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIkVzdGltYXRlZCB0aW1lXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiQ2xpY2sgJ0luaXRpYWxpemUgQXV0by1CT1QnIHRvIGJlZ2luXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiV2FpdGluZyBmb3IgaW5pdGlhbGl6YXRpb24uLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBJbWFnZSByZXNpemVkIHRvIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgUGFpbnRpbmcgcGF1c2VkIGF0IHBvc2l0aW9uIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzIHBlciBiYXRjaFwiLFxuICAgIGJhdGNoU2l6ZTogXCJCYXRjaCBzaXplXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJOZXh0IGJhdGNoIGluXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVc2UgYWxsIGF2YWlsYWJsZSBjaGFyZ2VzXCIsXG4gICAgc2hvd092ZXJsYXk6IFwiU2hvdyBvdmVybGF5XCIsXG4gICAgbWF4Q2hhcmdlczogXCJNYXggY2hhcmdlcyBwZXIgYmF0Y2hcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgV2FpdGluZyBmb3IgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJUaW1lIHJlbWFpbmluZ1wiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgV2FpdGluZyB7dGltZX0gdG8gY29udGludWUuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBQcm9ncmVzcyBzYXZlZCBhcyB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFByb2dyZXNzIGxvYWRlZDoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzIHBhaW50ZWRcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgRXJyb3IgbG9hZGluZyBwcm9ncmVzczoge2Vycm9yfVwiLFxuXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycm9yIHNhdmluZyBwcm9ncmVzczoge2Vycm9yfVwiLFxuXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJEbyB5b3Ugd2FudCB0byBzYXZlIHRoZSBjdXJyZW50IHByb2dyZXNzIGJlZm9yZSBzdG9wcGluZz9cIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJTYXZlIFByb2dyZXNzXCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIkRpc2NhcmRcIixcbiAgICBjYW5jZWw6IFwiQ2FuY2VsXCIsXG4gICAgbWluaW1pemU6IFwiTWluaW1pemVcIixcbiAgICB3aWR0aDogXCJXaWR0aFwiLFxuICAgIGhlaWdodDogXCJIZWlnaHRcIiwgXG4gICAga2VlcEFzcGVjdDogXCJLZWVwIGFzcGVjdCByYXRpb1wiLFxuICAgIGFwcGx5OiBcIkFwcGx5XCIsXG4gIG92ZXJsYXlPbjogXCJPdmVybGF5OiBPTlwiLFxuICBvdmVybGF5T2ZmOiBcIk92ZXJsYXk6IE9GRlwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFBhc3MgY29tcGxldGVkOiB7cGFpbnRlZH0gcGl4ZWxzIHBhaW50ZWQgfCBQcm9ncmVzczoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgV2FpdGluZyBmb3IgY2hhcmdlIHJlZ2VuZXJhdGlvbjoge2N1cnJlbnR9L3tuZWVkZWR9IC0gVGltZToge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIFdhaXRpbmcgZm9yIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFJlbWFpbmluZzoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgQXV0by1pbml0aWFsaXppbmcuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEJvdCBhdXRvLXN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIENvdWxkIG5vdCBhdXRvLXN0YXJ0LiBVc2UgbWFudWFsIGJ1dHRvbi5cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IENvbG9yIHBhbGV0dGUgZGV0ZWN0ZWRcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFNlYXJjaGluZyBmb3IgY29sb3IgcGFsZXR0ZS4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IENsaWNraW5nIFBhaW50IGJ1dHRvbi4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFBhaW50IGJ1dHRvbiBub3QgZm91bmRcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IE1hbnVhbCBpbml0aWFsaXphdGlvbiByZXF1aXJlZFwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgUmV0cnkge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gaW4ge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBFcnJvciBpbiBhdHRlbXB0IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9LCByZXRyeWluZyBpbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBGYWlsZWQgYWZ0ZXIge21heEF0dGVtcHRzfSBhdHRlbXB0cy4gQ29udGludWluZyB3aXRoIG5leHQgYmF0Y2guLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIE5ldHdvcmsgZXJyb3IuIFJldHJ5aW5nLi4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IFNlcnZlciBlcnJvci4gUmV0cnlpbmcuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFNlcnZlciB0aW1lb3V0LCByZXRyeWluZy4uLlwiLFxuICAgIC8vIHYyLjAgLSBQcm90ZWN0aW9uIGFuZCBQYXR0ZXJuc1xuICAgIHByb3RlY3Rpb25FbmFibGVkOiBcIlByb3RlY3Rpb24gZW5hYmxlZFwiLFxuICAgIHByb3RlY3Rpb25EaXNhYmxlZDogXCJQcm90ZWN0aW9uIGRpc2FibGVkXCIsXG4gICAgcGFpbnRQYXR0ZXJuOiBcIlBhaW50IHBhdHRlcm5cIixcbiAgICBwYXR0ZXJuTGluZWFyU3RhcnQ6IFwiTGluZWFyIChTdGFydClcIixcbiAgICBwYXR0ZXJuTGluZWFyRW5kOiBcIkxpbmVhciAoRW5kKVwiLFxuICAgIHBhdHRlcm5SYW5kb206IFwiUmFuZG9tXCIsXG4gICAgcGF0dGVybkNlbnRlck91dDogXCJDZW50ZXIgb3V0d2FyZFwiLFxuICAgIHBhdHRlcm5Db3JuZXJzRmlyc3Q6IFwiQ29ybmVycyBmaXJzdFwiLFxuICAgIHBhdHRlcm5TcGlyYWw6IFwiU3BpcmFsXCIsXG4gICAgc29saWQ6IFwiU29saWRcIixcbiAgICBzdHJpcGVzOiBcIlN0cmlwZXNcIixcbiAgICBjaGVja2VyYm9hcmQ6IFwiQ2hlY2tlcmJvYXJkXCIsXG4gICAgZ3JhZGllbnQ6IFwiR3JhZGllbnRcIixcbiAgICBkb3RzOiBcIkRvdHNcIixcbiAgICB3YXZlczogXCJXYXZlc1wiLFxuICAgIHNwaXJhbDogXCJTcGlyYWxcIixcbiAgICBtb3NhaWM6IFwiTW9zYWljXCIsXG4gICAgYnJpY2tzOiBcIkJyaWNrc1wiLFxuICAgIHppZ3phZzogXCJaaWd6YWdcIixcbiAgICBwcm90ZWN0aW5nRHJhd2luZzogXCJQcm90ZWN0aW5nIGRyYXdpbmcuLi5cIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2hhbmdlcyBkZXRlY3RlZCBpbiBkcmF3aW5nXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REQyNyBSZXBhaXJpbmcge2NvdW50fSBhbHRlcmVkIHBpeGVscy4uLlwiLFxuICAgIHJlcGFpckNvbXBsZXRlZDogXCJcdTI3MDUgUmVwYWlyIGNvbXBsZXRlZDoge2NvdW50fSBwaXhlbHNcIixcbiAgICBub0NoYXJnZXNGb3JSZXBhaXI6IFwiXHUyNkExIE5vIGNoYXJnZXMgZm9yIHJlcGFpciwgd2FpdGluZy4uLlwiLFxuICAgIHByb3RlY3Rpb25Qcmlvcml0eTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjdGlvbiBwcmlvcml0eSBhY3RpdmF0ZWRcIixcbiAgICBwYXR0ZXJuQXBwbGllZDogXCJQYXR0ZXJuIGFwcGxpZWRcIixcbiAgICBjdXN0b21QYXR0ZXJuOiBcIkN1c3RvbSBwYXR0ZXJuXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIkRvd25sb2FkIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiQ2xlYXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJDbG9zZVwiXG4gIH0sXG5cbiAgLy8gRmFybSBtb2R1bGUgKHRvIGJlIGltcGxlbWVudGVkKVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEZhcm0gQm90XCIsXG4gICAgc3RhcnQ6IFwiU3RhcnRcIixcbiAgICBzdG9wOiBcIlN0b3BcIixcbiAgICBzdG9wcGVkOiBcIkJvdCBzdG9wcGVkXCIsXG4gICAgY2FsaWJyYXRlOiBcIkNhbGlicmF0ZVwiLFxuICAgIHBhaW50T25jZTogXCJPbmNlXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiQ2hlY2tpbmcgc3RhdHVzLi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJDb25maWd1cmF0aW9uXCIsXG4gICAgZGVsYXk6IFwiRGVsYXkgKG1zKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBpeGVscy9iYXRjaFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiTWluIGNoYXJnZXNcIixcbiAgICBjb2xvck1vZGU6IFwiQ29sb3IgbW9kZVwiLFxuICAgIHJhbmRvbTogXCJSYW5kb21cIixcbiAgICBmaXhlZDogXCJGaXhlZFwiLFxuICAgIHJhbmdlOiBcIlJhbmdlXCIsXG4gICAgZml4ZWRDb2xvcjogXCJGaXhlZCBjb2xvclwiLFxuICAgIGFkdmFuY2VkOiBcIkFkdmFuY2VkXCIsXG4gICAgdGlsZVg6IFwiVGlsZSBYXCIsXG4gICAgdGlsZVk6IFwiVGlsZSBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJDdXN0b20gcGFsZXR0ZVwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcImUuZzogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIkNhcHR1cmVcIixcbiAgICBwYWludGVkOiBcIlBhaW50ZWRcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICByZXRyaWVzOiBcIlJldHJpZXNcIixcbiAgICB0aWxlOiBcIlRpbGVcIixcbiAgICBjb25maWdTYXZlZDogXCJDb25maWd1cmF0aW9uIHNhdmVkXCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIkNvbmZpZ3VyYXRpb24gbG9hZGVkXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiQ29uZmlndXJhdGlvbiByZXNldFwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiUGFpbnQgYSBwaXhlbCBtYW51YWxseSB0byBjYXB0dXJlIGNvb3JkaW5hdGVzLi4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJCYWNrZW5kIE9ubGluZVwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIkJhY2tlbmQgT2ZmbGluZVwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIlN0YXJ0aW5nIGJvdC4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIlN0b3BwaW5nIGJvdC4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIkNhbGlicmF0aW5nLi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiQXV0by1GYXJtIGlzIGFscmVhZHkgcnVubmluZy5cIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIkF1dG8tSW1hZ2UgaXMgcnVubmluZy4gQ2xvc2UgaXQgYmVmb3JlIHN0YXJ0aW5nIEF1dG8tRmFybS5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTZWxlY3QgQXJlYVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFBhaW50IGEgcGl4ZWwgaW4gYW4gRU1QVFkgYXJlYSBvZiB0aGUgbWFwIHRvIHNldCB0aGUgZmFybWluZyB6b25lXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBXYWl0aW5nIGZvciB5b3UgdG8gcGFpbnQgdGhlIHJlZmVyZW5jZSBwaXhlbC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBBcmVhIHNldCEgUmFkaXVzOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgVGltZW91dCBmb3IgYXJlYSBzZWxlY3Rpb25cIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFNlbGVjdCBhbiBhcmVhIGZpcnN0IHVzaW5nICdTZWxlY3QgQXJlYSdcIixcbiAgICBmYXJtUmFkaXVzOiBcIkZhcm0gcmFkaXVzXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIkN1cnJlbnQgYXJlYVwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgRmFybWluZyBpbiB7cmFkaXVzfXB4IHJhZGl1cyBmcm9tICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgSU1QT1JUQU5UOiBTZWxlY3QgYW4gRU1QVFkgYXJlYSB0byBhdm9pZCBjb25mbGljdHNcIixcbiAgICBub1Bvc2l0aW9uOiBcIk5vIGFyZWFcIixcbiAgICBjdXJyZW50Wm9uZTogXCJab25lOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFNlbGVjdCBhbiBhcmVhIGZpcnN0LiBQYWludCBhIHBpeGVsIG9uIHRoZSBtYXAgdG8gc2V0IHRoZSBmYXJtaW5nIHpvbmVcIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiRG93bmxvYWQgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJDbGVhciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkNsb3NlXCJcbiAgfSxcblxuICAvLyBDb21tb24vU2hhcmVkXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJZZXNcIixcbiAgICBubzogXCJOb1wiLFxuICAgIG9rOiBcIk9LXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbFwiLFxuICAgIGNsb3NlOiBcIkNsb3NlXCIsXG4gICAgc2F2ZTogXCJTYXZlXCIsXG4gICAgbG9hZDogXCJMb2FkXCIsXG4gICAgZGVsZXRlOiBcIkRlbGV0ZVwiLFxuICAgIGVkaXQ6IFwiRWRpdFwiLFxuICAgIHN0YXJ0OiBcIlN0YXJ0XCIsXG4gICAgc3RvcDogXCJTdG9wXCIsXG4gICAgcGF1c2U6IFwiUGF1c2VcIixcbiAgICByZXN1bWU6IFwiUmVzdW1lXCIsXG4gICAgcmVzZXQ6IFwiUmVzZXRcIixcbiAgICBzZXR0aW5nczogXCJTZXR0aW5nc1wiLFxuICAgIGhlbHA6IFwiSGVscFwiLFxuICAgIGFib3V0OiBcIkFib3V0XCIsXG4gICAgbGFuZ3VhZ2U6IFwiTGFuZ3VhZ2VcIixcbiAgICBsb2FkaW5nOiBcIkxvYWRpbmcuLi5cIixcbiAgICBlcnJvcjogXCJFcnJvclwiLFxuICAgIHN1Y2Nlc3M6IFwiU3VjY2Vzc1wiLFxuICAgIHdhcm5pbmc6IFwiV2FybmluZ1wiLFxuICAgIGluZm86IFwiSW5mb3JtYXRpb25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiTGFuZ3VhZ2UgY2hhbmdlZCB0byB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGl6ZSBHdWFyZC1CT1RcIixcbiAgICBzZWxlY3RBcmVhOiBcIlNlbGVjdCBBcmVhXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyZSBBcmVhXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIlN0YXJ0IFByb3RlY3Rpb25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJTdG9wIFByb3RlY3Rpb25cIixcbiAgICB1cHBlckxlZnQ6IFwiVXBwZXIgTGVmdCBDb3JuZXJcIixcbiAgICBsb3dlclJpZ2h0OiBcIkxvd2VyIFJpZ2h0IENvcm5lclwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQcm90ZWN0ZWQgUGl4ZWxzXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkRldGVjdGVkIENoYW5nZXNcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJSZXBhaXJlZCBQaXhlbHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICB3YWl0aW5nSW5pdDogXCJXYWl0aW5nIGZvciBpbml0aWFsaXphdGlvbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBDaGVja2luZyBhdmFpbGFibGUgY29sb3JzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgTm8gY29sb3JzIGZvdW5kLiBPcGVuIHRoZSBjb2xvciBwYWxldHRlIG9uIHRoZSBzaXRlLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBGb3VuZCB7Y291bnR9IGF2YWlsYWJsZSBjb2xvcnNcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgRXJyb3IgaW5pdGlhbGl6aW5nIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIEludmFsaWQgY29vcmRpbmF0ZXNcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgQXJlYSBtdXN0IGhhdmUgdXBwZXIgbGVmdCBjb3JuZXIgbGVzcyB0aGFuIGxvd2VyIHJpZ2h0IGNvcm5lclwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgQXJlYSB0b28gbGFyZ2U6IHtzaXplfSBwaXhlbHMgKG1heGltdW06IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmluZyBwcm90ZWN0aW9uIGFyZWEuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IEFyZWEgY2FwdHVyZWQ6IHtjb3VudH0gcGl4ZWxzIHVuZGVyIHByb3RlY3Rpb25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGNhcHR1cmluZyBhcmVhOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBGaXJzdCBjYXB0dXJlIGEgcHJvdGVjdGlvbiBhcmVhXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY3Rpb24gc3RhcnRlZCAtIG1vbml0b3JpbmcgYXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWN0aW9uIHN0b3BwZWRcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFByb3RlY3RlZCBhcmVhIC0gbm8gY2hhbmdlcyBkZXRlY3RlZFwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBjaGFuZ2VzIGRldGVjdGVkIGluIHByb3RlY3RlZCBhcmVhXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSZXBhaXJpbmcge2NvdW50fSBhbHRlcmVkIHBpeGVscy4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgU3VjY2Vzc2Z1bGx5IHJlcGFpcmVkIHtjb3VudH0gcGl4ZWxzXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIEVycm9yIHJlcGFpcmluZyBwaXhlbHM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIEluc3VmZmljaWVudCBjaGFyZ2VzIHRvIHJlcGFpciBjaGFuZ2VzXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBDaGVja2luZyBjaGFuZ2VzIGluIHByb3RlY3RlZCBhcmVhLi4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgRXJyb3IgY2hlY2tpbmcgY2hhbmdlczoge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBHdWFyZGlhbiBhY3RpdmUgLSBhcmVhIHVuZGVyIHByb3RlY3Rpb25cIixcbiAgICBsYXN0Q2hlY2s6IFwiTGFzdCBjaGVjazoge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIk5leHQgY2hlY2sgaW46IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBBdXRvLWluaXRpYWxpemluZy4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGF1dG8tc3RhcnRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgQ291bGQgbm90IGF1dG8tc3RhcnQuIFVzZSBtYW51YWwgYnV0dG9uLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgTWFudWFsIGluaXRpYWxpemF0aW9uIHJlcXVpcmVkXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBDb2xvciBwYWxldHRlIGRldGVjdGVkXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBTZWFyY2hpbmcgZm9yIGNvbG9yIHBhbGV0dGUuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGlja2luZyBQYWludCBidXR0b24uLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBQYWludCBidXR0b24gbm90IGZvdW5kXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBQYWludCBhIHBpeGVsIGF0IHRoZSBVUFBFUiBMRUZUIGNvcm5lciBvZiB0aGUgYXJlYSB0byBwcm90ZWN0XCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgTm93IHBhaW50IGEgcGl4ZWwgYXQgdGhlIExPV0VSIFJJR0hUIGNvcm5lciBvZiB0aGUgYXJlYVwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHVwcGVyIGxlZnQgY29ybmVyIHNlbGVjdGlvbi4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBXYWl0aW5nIGZvciBsb3dlciByaWdodCBjb3JuZXIgc2VsZWN0aW9uLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFVwcGVyIGxlZnQgY29ybmVyIGNhcHR1cmVkOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBMb3dlciByaWdodCBjb3JuZXIgY2FwdHVyZWQ6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBTZWxlY3Rpb24gdGltZW91dFwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBTZWxlY3Rpb24gZXJyb3IsIHBsZWFzZSB0cnkgYWdhaW5cIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiRG93bmxvYWQgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJDbGVhciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkNsb3NlXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgZnIgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NcdTAwRTlsZWN0aW9uJyxcbiAgICB1c2VyOiAnVXRpbGlzYXRldXInLFxuICAgIGNoYXJnZXM6ICdDaGFyZ2VzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdCYXNlIGRlIGRvbm5cdTAwRTllcycsXG4gICAgdXB0aW1lOiAnVGVtcHMgYWN0aWYnLFxuICAgIGNsb3NlOiAnRmVybWVyJyxcbiAgICBsYXVuY2g6ICdMYW5jZXInLFxuICAgIGxvYWRpbmc6ICdDaGFyZ2VtZW50XHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFeFx1MDBFOWN1dGlvblx1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdUXHUwMEU5bFx1MDBFOWNoYXJnZW1lbnQgZHUgc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdDaG9pc2lzc2V6IHVuIGJvdCBldCBhcHB1eWV6IHN1ciBMYW5jZXInLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdQclx1MDBFQXQgXHUwMEUwIGxhbmNlcicsXG4gICAgbG9hZEVycm9yOiAnRXJyZXVyIGRlIGNoYXJnZW1lbnQnLFxuICAgIGxvYWRFcnJvck1zZzogJ0ltcG9zc2libGUgZGUgY2hhcmdlciBsZSBib3Qgc1x1MDBFOWxlY3Rpb25uXHUwMEU5LiBWXHUwMEU5cmlmaWV6IHZvdHJlIGNvbm5leGlvbiBvdSByXHUwMEU5ZXNzYXllei4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFZcdTAwRTlyaWZpY2F0aW9uLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgRW4gbGlnbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgSG9ycyBsaWduZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycmV1cicsXG4gICAgdW5rbm93bjogJy0nLFxuICAgIGxvZ1dpbmRvdzogJ0xvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnTG9ncyAtIHtib3ROYW1lfScsXG4gICAgZG93bmxvYWRMb2dzOiAnVFx1MDBFOWxcdTAwRTljaGFyZ2VyIExvZ3MnLFxuICAgIGNsZWFyTG9nczogJ0VmZmFjZXIgTG9ncycsXG4gICAgY2xvc2VMb2dzOiAnRmVybWVyJ1xuICB9LFxuXG4gIC8vIEltYWdlIE1vZHVsZVxuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBBdXRvLUltYWdlXCIsXG4gICAgaW5pdEJvdDogXCJJbml0aWFsaXNlciBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlRcdTAwRTlsXHUwMEU5Y2hhcmdlciBJbWFnZVwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlJlZGltZW5zaW9ubmVyIEltYWdlXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU1x1MDBFOWxlY3Rpb25uZXIgUG9zaXRpb25cIixcbiAgICBzdGFydFBhaW50aW5nOiBcIkNvbW1lbmNlciBQZWludHVyZVwiLFxuICAgIHN0b3BQYWludGluZzogXCJBcnJcdTAwRUF0ZXIgUGVpbnR1cmVcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiU2F1dmVnYXJkZXIgUHJvZ3JcdTAwRThzXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIkNoYXJnZXIgUHJvZ3JcdTAwRThzXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFZcdTAwRTlyaWZpY2F0aW9uIGRlcyBjb3VsZXVycyBkaXNwb25pYmxlcy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIE91dnJleiBsYSBwYWxldHRlIGRlIGNvdWxldXJzIHN1ciBsZSBzaXRlIGV0IHJcdTAwRTllc3NheWV6IVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvdWxldXJzIGRpc3BvbmlibGVzIHRyb3V2XHUwMEU5ZXNcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIENoYXJnZW1lbnQgZGUgbCdpbWFnZS4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBJbWFnZSBjaGFyZ1x1MDBFOWUgYXZlYyB7Y291bnR9IHBpeGVscyB2YWxpZGVzXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZHUgY2hhcmdlbWVudCBkZSBsJ2ltYWdlXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJQZWlnbmV6IGxlIHByZW1pZXIgcGl4ZWwgXHUwMEUwIGwnZW1wbGFjZW1lbnQgb1x1MDBGOSB2b3VzIHZvdWxleiBxdWUgbCdhcnQgY29tbWVuY2UhXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIHF1ZSB2b3VzIHBlaWduaWV6IGxlIHBpeGVsIGRlIHJcdTAwRTlmXHUwMEU5cmVuY2UuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgUG9zaXRpb24gZFx1MDBFOWZpbmllIGF2ZWMgc3VjY1x1MDBFOHMhXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBEXHUwMEU5bGFpIGRcdTAwRTlwYXNzXHUwMEU5IHBvdXIgbGEgc1x1MDBFOWxlY3Rpb24gZGUgcG9zaXRpb25cIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBQb3NpdGlvbiBkXHUwMEU5dGVjdFx1MDBFOWUsIHRyYWl0ZW1lbnQuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJldXIgZFx1MDBFOXRlY3RhbnQgbGEgcG9zaXRpb24sIGVzc2F5ZXogXHUwMEUwIG5vdXZlYXVcIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBEXHUwMEU5YnV0IGRlIGxhIHBlaW50dXJlLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgUHJvZ3JcdTAwRThzOiB7cGFpbnRlZH0ve3RvdGFsfSBwaXhlbHMuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIEF1Y3VuZSBjaGFyZ2UuIEF0dGVuZHJlIHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUGVpbnR1cmUgYXJyXHUwMEVBdFx1MDBFOWUgcGFyIGwndXRpbGlzYXRldXJcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBQZWludHVyZSB0ZXJtaW5cdTAwRTllISB7Y291bnR9IHBpeGVscyBwZWludHMuXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgRXJyZXVyIHBlbmRhbnQgbGEgcGVpbnR1cmVcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBDaGFyZ2V6IHVuZSBpbWFnZSBldCBzXHUwMEU5bGVjdGlvbm5leiB1bmUgcG9zaXRpb24gZCdhYm9yZFwiLFxuICAgIHByb2dyZXNzOiBcIlByb2dyXHUwMEU4c1wiLFxuICAgIHVzZXJOYW1lOiBcIlVzYWdlclwiLFxuICAgIHBpeGVsczogXCJQaXhlbHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlRlbXBzIGVzdGltXHUwMEU5XCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiQ2xpcXVleiBzdXIgJ0luaXRpYWxpc2VyIEF1dG8tQk9UJyBwb3VyIGNvbW1lbmNlclwiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVuIGF0dGVudGUgZCdpbml0aWFsaXNhdGlvbi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IEltYWdlIHJlZGltZW5zaW9ublx1MDBFOWUgXHUwMEUwIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgUGVpbnR1cmUgbWlzZSBlbiBwYXVzZSBcdTAwRTAgbGEgcG9zaXRpb24gWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMgcGFyIGxvdFwiLFxuICAgIGJhdGNoU2l6ZTogXCJUYWlsbGUgZHUgbG90XCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJQcm9jaGFpbiBsb3QgZGFuc1wiLFxuICAgIHVzZUFsbENoYXJnZXM6IFwiVXRpbGlzZXIgdG91dGVzIGxlcyBjaGFyZ2VzIGRpc3BvbmlibGVzXCIsXG4gICAgc2hvd092ZXJsYXk6IFwiQWZmaWNoZXIgbCdvdmVybGF5XCIsXG4gICAgbWF4Q2hhcmdlczogXCJDaGFyZ2VzIG1heCBwYXIgbG90XCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIEVuIGF0dGVudGUgZGUgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJUZW1wcyByZXN0YW50XCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBBdHRlbmRyZSB7dGltZX0gcG91ciBjb250aW51ZXIuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBQcm9nclx1MDBFOHMgc2F1dmVnYXJkXHUwMEU5IHNvdXMge2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBQcm9nclx1MDBFOHMgY2hhcmdcdTAwRTk6IHtwYWludGVkfS97dG90YWx9IHBpeGVscyBwZWludHNcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZHUgY2hhcmdlbWVudCBkdSBwcm9nclx1MDBFOHM6IHtlcnJvcn1cIixcbiBcbiAgICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUgZHUgcHJvZ3JcdTAwRThzOiB7ZXJyb3J9XCIsXG5cbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlZvdWxlei12b3VzIHNhdXZlZ2FyZGVyIGxlIHByb2dyXHUwMEU4cyBhY3R1ZWwgYXZhbnQgZCdhcnJcdTAwRUF0ZXI/XCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiU2F1dmVnYXJkZXIgUHJvZ3JcdTAwRThzXCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIkFiYW5kb25uZXJcIixcbiAgICBjYW5jZWw6IFwiQW5udWxlclwiLFxuICAgIG1pbmltaXplOiBcIk1pbmltaXNlclwiLFxuICAgIHdpZHRoOiBcIkxhcmdldXJcIixcbiAgICBoZWlnaHQ6IFwiSGF1dGV1clwiLCBcbiAgICBrZWVwQXNwZWN0OiBcIkdhcmRlciBsZXMgcHJvcG9ydGlvbnNcIixcbiAgICBhcHBseTogXCJBcHBsaXF1ZXJcIixcbiAgb3ZlcmxheU9uOiBcIk92ZXJsYXkgOiBPTlwiLFxuICBvdmVybGF5T2ZmOiBcIk92ZXJsYXkgOiBPRkZcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBQYXNzYWdlIHRlcm1pblx1MDBFOToge3BhaW50ZWR9IHBpeGVscyBwZWludHMgfCBQcm9nclx1MDBFOHM6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIEF0dGVudGUgZGUgclx1MDBFOWdcdTAwRTluXHUwMEU5cmF0aW9uIGRlcyBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBUZW1wczoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIEF0dGVudGUgZGVzIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFJlc3RhbnQ6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEluaXRpYWxpc2F0aW9uIGF1dG9tYXRpcXVlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBCb3QgZFx1MDBFOW1hcnJcdTAwRTkgYXV0b21hdGlxdWVtZW50XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIEltcG9zc2libGUgZGUgZFx1MDBFOW1hcnJlciBhdXRvbWF0aXF1ZW1lbnQuIFV0aWxpc2V6IGxlIGJvdXRvbiBtYW51ZWwuXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBQYWxldHRlIGRlIGNvdWxldXJzIGRcdTAwRTl0ZWN0XHUwMEU5ZVwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgUmVjaGVyY2hlIGRlIGxhIHBhbGV0dGUgZGUgY291bGV1cnMuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGljIHN1ciBsZSBib3V0b24gUGFpbnQuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBCb3V0b24gUGFpbnQgaW50cm91dmFibGVcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IEluaXRpYWxpc2F0aW9uIG1hbnVlbGxlIHJlcXVpc2VcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFRlbnRhdGl2ZSB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBkYW5zIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgRXJyZXVyIGRhbnMgdGVudGF0aXZlIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9LCBub3V2ZWwgZXNzYWkgZGFucyB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBcdTAwQzljaGVjIGFwclx1MDBFOHMge21heEF0dGVtcHRzfSB0ZW50YXRpdmVzLiBDb250aW51YW50IGF2ZWMgbGUgbG90IHN1aXZhbnQuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIEVycmV1ciByXHUwMEU5c2VhdS4gTm91dmVsIGVzc2FpLi4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IEVycmV1ciBzZXJ2ZXVyLiBOb3V2ZWwgZXNzYWkuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIERcdTAwRTlsYWkgZFx1MjAxOWF0dGVudGUgZHUgc2VydmV1ciwgbm91dmVsbGUgdGVudGF0aXZlLi4uXCIsXG4gICAgLy8gdjIuMCAtIFByb3RlY3Rpb24gZXQgbW90aWZzXG4gICAgcHJvdGVjdGlvbkVuYWJsZWQ6IFwiUHJvdGVjdGlvbiBhY3Rpdlx1MDBFOWVcIixcbiAgICBwcm90ZWN0aW9uRGlzYWJsZWQ6IFwiUHJvdGVjdGlvbiBkXHUwMEU5c2FjdGl2XHUwMEU5ZVwiLFxuICAgIHBhaW50UGF0dGVybjogXCJNb3RpZiBkZSBwZWludHVyZVwiLFxuICAgIHBhdHRlcm5MaW5lYXJTdGFydDogXCJMaW5cdTAwRTlhaXJlIChEXHUwMEU5YnV0KVwiLFxuICAgIHBhdHRlcm5MaW5lYXJFbmQ6IFwiTGluXHUwMEU5YWlyZSAoRmluKVwiLFxuICAgIHBhdHRlcm5SYW5kb206IFwiQWxcdTAwRTlhdG9pcmVcIixcbiAgICBwYXR0ZXJuQ2VudGVyT3V0OiBcIkNlbnRyZSB2ZXJzIGxcdTIwMTlleHRcdTAwRTlyaWV1clwiLFxuICAgIHBhdHRlcm5Db3JuZXJzRmlyc3Q6IFwiQ29pbnMgZFx1MjAxOWFib3JkXCIsXG4gICAgcGF0dGVyblNwaXJhbDogXCJTcGlyYWxlXCIsXG4gICAgc29saWQ6IFwiUGxlaW5cIixcbiAgICBzdHJpcGVzOiBcIlJheXVyZXNcIixcbiAgICBjaGVja2VyYm9hcmQ6IFwiRGFtaWVyXCIsXG4gICAgZ3JhZGllbnQ6IFwiRFx1MDBFOWdyYWRcdTAwRTlcIixcbiAgICBkb3RzOiBcIlBvaW50c1wiLFxuICAgIHdhdmVzOiBcIlZhZ3Vlc1wiLFxuICAgIHNwaXJhbDogXCJTcGlyYWxlXCIsXG4gICAgbW9zYWljOiBcIk1vc2FcdTAwRUZxdWVcIixcbiAgICBicmlja3M6IFwiQnJpcXVlc1wiLFxuICAgIHppZ3phZzogXCJaaWd6YWdcIixcbiAgICBwcm90ZWN0aW5nRHJhd2luZzogXCJQcm90ZWN0aW9uIGR1IGRlc3Npbi4uLlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBjaGFuZ2VtZW50cyBkXHUwMEU5dGVjdFx1MDBFOXMgZGFucyBsZSBkZXNzaW5cIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERDI3IFJcdTAwRTlwYXJhdGlvbiBkZSB7Y291bnR9IHBpeGVscyBtb2RpZmlcdTAwRTlzLi4uXCIsXG4gICAgcmVwYWlyQ29tcGxldGVkOiBcIlx1MjcwNSBSXHUwMEU5cGFyYXRpb24gdGVybWluXHUwMEU5ZSA6IHtjb3VudH0gcGl4ZWxzXCIsXG4gICAgbm9DaGFyZ2VzRm9yUmVwYWlyOiBcIlx1MjZBMSBQYXMgZGUgZnJhaXMgcG91ciBsYSByXHUwMEU5cGFyYXRpb24sIGVuIGF0dGVudGUuLi5cIixcbiAgICBwcm90ZWN0aW9uUHJpb3JpdHk6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByaW9yaXRcdTAwRTkgXHUwMEUwIGxhIHByb3RlY3Rpb24gYWN0aXZcdTAwRTllXCIsXG4gICAgcGF0dGVybkFwcGxpZWQ6IFwiTW90aWYgYXBwbGlxdVx1MDBFOVwiLFxuICAgIGN1c3RvbVBhdHRlcm46IFwiTW90aWYgcGVyc29ubmFsaXNcdTAwRTlcIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiVFx1MDBFOWxcdTAwRTljaGFyZ2VyIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiRWZmYWNlciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkZlcm1lclwiXG4gIH0sXG5cbiAgLy8gRmFybSBNb2R1bGUgKHRvIGJlIGltcGxlbWVudGVkKVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEZhcm0gQm90XCIsXG4gICAgc3RhcnQ6IFwiRFx1MDBFOW1hcnJlclwiLFxuICAgIHN0b3A6IFwiQXJyXHUwMEVBdGVyXCIsXG4gICAgc3RvcHBlZDogXCJCb3QgYXJyXHUwMEVBdFx1MDBFOVwiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJlclwiLFxuICAgIHBhaW50T25jZTogXCJVbmUgZm9pc1wiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlZcdTAwRTlyaWZpY2F0aW9uIGR1IHN0YXR1dC4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiQ29uZmlndXJhdGlvblwiLFxuICAgIGRlbGF5OiBcIkRcdTAwRTlsYWkgKG1zKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBpeGVscy9sb3RcIixcbiAgICBtaW5DaGFyZ2VzOiBcIkNoYXJnZXMgbWluXCIsXG4gICAgY29sb3JNb2RlOiBcIk1vZGUgY291bGV1clwiLFxuICAgIHJhbmRvbTogXCJBbFx1MDBFOWF0b2lyZVwiLFxuICAgIGZpeGVkOiBcIkZpeGVcIixcbiAgICByYW5nZTogXCJQbGFnZVwiLFxuICAgIGZpeGVkQ29sb3I6IFwiQ291bGV1ciBmaXhlXCIsXG4gICAgYWR2YW5jZWQ6IFwiQXZhbmNcdTAwRTlcIixcbiAgICB0aWxlWDogXCJUdWlsZSBYXCIsXG4gICAgdGlsZVk6IFwiVHVpbGUgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiUGFsZXR0ZSBwZXJzb25uYWxpc1x1MDBFOWVcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJleDogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIkNhcHR1cmVyXCIsXG4gICAgcGFpbnRlZDogXCJQZWludHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICByZXRyaWVzOiBcIlx1MDBDOWNoZWNzXCIsXG4gICAgdGlsZTogXCJUdWlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYXRpb24gc2F1dmVnYXJkXHUwMEU5ZVwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmF0aW9uIGNoYXJnXHUwMEU5ZVwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYXRpb24gclx1MDBFOWluaXRpYWxpc1x1MDBFOWVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBlaW5kcmUgdW4gcGl4ZWwgbWFudWVsbGVtZW50IHBvdXIgY2FwdHVyZXIgbGVzIGNvb3Jkb25uXHUwMEU5ZXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgRW4gbGlnbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIEhvcnMgbGlnbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJEXHUwMEU5bWFycmFnZSBkdSBib3QuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJBcnJcdTAwRUF0IGR1IGJvdC4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIkNhbGlicmFnZS4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSBlc3QgZFx1MDBFOWpcdTAwRTAgZW4gY291cnMgZCdleFx1MDBFOWN1dGlvbi5cIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIkF1dG8tSW1hZ2UgZXN0IGVuIGNvdXJzIGQnZXhcdTAwRTljdXRpb24uIEZlcm1lei1sZSBhdmFudCBkZSBkXHUwMEU5bWFycmVyIEF1dG8tRmFybS5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTXHUwMEU5bGVjdGlvbm5lciBab25lXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGVpZ25leiB1biBwaXhlbCBkYW5zIHVuZSB6b25lIFZJREUgZGUgbGEgY2FydGUgcG91ciBkXHUwMEU5ZmluaXIgbGEgem9uZSBkZSBmYXJtaW5nXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIHF1ZSB2b3VzIHBlaWduaWV6IGxlIHBpeGVsIGRlIHJcdTAwRTlmXHUwMEU5cmVuY2UuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgWm9uZSBkXHUwMEU5ZmluaWUhIFJheW9uOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkXHUwMEU5cGFzc1x1MDBFOSBwb3VyIGxhIHNcdTAwRTlsZWN0aW9uIGRlIHpvbmVcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFNcdTAwRTlsZWN0aW9ubmV6IHVuZSB6b25lIGQnYWJvcmQgZW4gdXRpbGlzYW50ICdTXHUwMEU5bGVjdGlvbm5lciBab25lJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiUmF5b24gZmFybVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJab25lIGFjdHVlbGxlXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBGYXJtaW5nIGRhbnMgdW4gcmF5b24gZGUge3JhZGl1c31weCBkZXB1aXMgKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBJTVBPUlRBTlQ6IFNcdTAwRTlsZWN0aW9ubmV6IHVuZSB6b25lIFZJREUgcG91ciBcdTAwRTl2aXRlciBsZXMgY29uZmxpdHNcIixcbiAgICBub1Bvc2l0aW9uOiBcIkF1Y3VuZSB6b25lXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uZTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBkJ2Fib3JkLiBQZWlnbmV6IHVuIHBpeGVsIHN1ciBsYSBjYXJ0ZSBwb3VyIGRcdTAwRTlmaW5pciBsYSB6b25lIGRlIGZhcm1pbmdcIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiVFx1MDBFOWxcdTAwRTljaGFyZ2VyIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiRWZmYWNlciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkZlcm1lclwiXG4gIH0sXG5cbiAgICAvLyBDb21tb24vU2hhcmVkXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJPdWlcIixcbiAgICBubzogXCJOb25cIixcbiAgICBvazogXCJPS1wiLFxuICAgIGNhbmNlbDogXCJBbm51bGVyXCIsXG4gICAgY2xvc2U6IFwiRmVybWVyXCIsXG4gICAgc2F2ZTogXCJTYXV2ZWdhcmRlclwiLFxuICAgIGxvYWQ6IFwiQ2hhcmdlclwiLFxuICAgIGRlbGV0ZTogXCJTdXBwcmltZXJcIixcbiAgICBlZGl0OiBcIk1vZGlmaWVyXCIsXG4gICAgc3RhcnQ6IFwiRFx1MDBFOW1hcnJlclwiLFxuICAgIHN0b3A6IFwiQXJyXHUwMEVBdGVyXCIsXG4gICAgcGF1c2U6IFwiUGF1c2VcIixcbiAgICByZXN1bWU6IFwiUmVwcmVuZHJlXCIsXG4gICAgcmVzZXQ6IFwiUlx1MDBFOWluaXRpYWxpc2VyXCIsXG4gICAgc2V0dGluZ3M6IFwiUGFyYW1cdTAwRTh0cmVzXCIsXG4gICAgaGVscDogXCJBaWRlXCIsXG4gICAgYWJvdXQ6IFwiXHUwMEMwIHByb3Bvc1wiLFxuICAgIGxhbmd1YWdlOiBcIkxhbmd1ZVwiLFxuICAgIGxvYWRpbmc6IFwiQ2hhcmdlbWVudC4uLlwiLFxuICAgIGVycm9yOiBcIkVycmV1clwiLFxuICAgIHN1Y2Nlc3M6IFwiU3VjY1x1MDBFOHNcIixcbiAgICB3YXJuaW5nOiBcIkF2ZXJ0aXNzZW1lbnRcIixcbiAgICBpbmZvOiBcIkluZm9ybWF0aW9uXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIkxhbmd1ZSBjaGFuZ1x1MDBFOWUgZW4ge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gR3VhcmQgTW9kdWxlXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tR3VhcmRcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpc2VyIEd1YXJkLUJPVFwiLFxuICAgIHNlbGVjdEFyZWE6IFwiU1x1MDBFOWxlY3Rpb25uZXIgWm9uZVwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIkNhcHR1cmVyIFpvbmVcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiRFx1MDBFOW1hcnJlciBQcm90ZWN0aW9uXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiQXJyXHUwMEVBdGVyIFByb3RlY3Rpb25cIixcbiAgICB1cHBlckxlZnQ6IFwiQ29pbiBTdXBcdTAwRTlyaWV1ciBHYXVjaGVcIixcbiAgICBsb3dlclJpZ2h0OiBcIkNvaW4gSW5mXHUwMEU5cmlldXIgRHJvaXRcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiUGl4ZWxzIFByb3RcdTAwRTlnXHUwMEU5c1wiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJDaGFuZ2VtZW50cyBEXHUwMEU5dGVjdFx1MDBFOXNcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJQaXhlbHMgUlx1MDBFOXBhclx1MDBFOXNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFbiBhdHRlbnRlIGQnaW5pdGlhbGlzYXRpb24uLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggVlx1MDBFOXJpZmljYXRpb24gZGVzIGNvdWxldXJzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgQXVjdW5lIGNvdWxldXIgdHJvdXZcdTAwRTllLiBPdXZyZXogbGEgcGFsZXR0ZSBkZSBjb3VsZXVycyBzdXIgbGUgc2l0ZS5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb3VsZXVycyBkaXNwb25pYmxlcyB0cm91dlx1MDBFOWVzXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBpbml0aWFsaXNcdTAwRTkgYXZlYyBzdWNjXHUwMEU4c1wiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbCdpbml0aWFsaXNhdGlvbiBkZSBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBDb29yZG9ublx1MDBFOWVzIGludmFsaWRlc1wiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBMYSB6b25lIGRvaXQgYXZvaXIgbGUgY29pbiBzdXBcdTAwRTlyaWV1ciBnYXVjaGUgaW5mXHUwMEU5cmlldXIgYXUgY29pbiBpbmZcdTAwRTlyaWV1ciBkcm9pdFwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgWm9uZSB0cm9wIGdyYW5kZToge3NpemV9IHBpeGVscyAobWF4aW11bToge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggQ2FwdHVyZSBkZSBsYSB6b25lIGRlIHByb3RlY3Rpb24uLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFpvbmUgY2FwdHVyXHUwMEU5ZToge2NvdW50fSBwaXhlbHMgc291cyBwcm90ZWN0aW9uXCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSBjYXB0dXJlIGRlIHpvbmU6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIENhcHR1cmV6IGQnYWJvcmQgdW5lIHpvbmUgZGUgcHJvdGVjdGlvblwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWN0aW9uIGRcdTAwRTltYXJyXHUwMEU5ZSAtIHN1cnZlaWxsYW5jZSBkZSBsYSB6b25lXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFByb3RlY3Rpb24gYXJyXHUwMEVBdFx1MDBFOWVcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFpvbmUgcHJvdFx1MDBFOWdcdTAwRTllIC0gYXVjdW4gY2hhbmdlbWVudCBkXHUwMEU5dGVjdFx1MDBFOVwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBjaGFuZ2VtZW50cyBkXHUwMEU5dGVjdFx1MDBFOXMgZGFucyBsYSB6b25lIHByb3RcdTAwRTlnXHUwMEU5ZVwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgUlx1MDBFOXBhcmF0aW9uIGRlIHtjb3VudH0gcGl4ZWxzIGFsdFx1MDBFOXJcdTAwRTlzLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSB7Y291bnR9IHBpeGVscyByXHUwMEU5cGFyXHUwMEU5cyBhdmVjIHN1Y2NcdTAwRThzXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGxhIHJcdTAwRTlwYXJhdGlvbiBkZXMgcGl4ZWxzOiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBDaGFyZ2VzIGluc3VmZmlzYW50ZXMgcG91ciByXHUwMEU5cGFyZXIgbGVzIGNoYW5nZW1lbnRzXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBWXHUwMEU5cmlmaWNhdGlvbiBkZXMgY2hhbmdlbWVudHMgZGFucyBsYSB6b25lIHByb3RcdTAwRTlnXHUwMEU5ZS4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGxhIHZcdTAwRTlyaWZpY2F0aW9uIGRlcyBjaGFuZ2VtZW50czoge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBHYXJkaWVuIGFjdGlmIC0gem9uZSBzb3VzIHByb3RlY3Rpb25cIixcbiAgICBsYXN0Q2hlY2s6IFwiRGVybmlcdTAwRThyZSB2XHUwMEU5cmlmaWNhdGlvbjoge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlByb2NoYWluZSB2XHUwMEU5cmlmaWNhdGlvbiBkYW5zOiB7dGltZX1zXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pdGlhbGlzYXRpb24gYXV0b21hdGlxdWUuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBkXHUwMEU5bWFyclx1MDBFOSBhdXRvbWF0aXF1ZW1lbnRcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgSW1wb3NzaWJsZSBkZSBkXHUwMEU5bWFycmVyIGF1dG9tYXRpcXVlbWVudC4gVXRpbGlzZXogbGUgYm91dG9uIG1hbnVlbC5cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IEluaXRpYWxpc2F0aW9uIG1hbnVlbGxlIHJlcXVpc2VcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFBhbGV0dGUgZGUgY291bGV1cnMgZFx1MDBFOXRlY3RcdTAwRTllXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBSZWNoZXJjaGUgZGUgbGEgcGFsZXR0ZSBkZSBjb3VsZXVycy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IENsaWMgc3VyIGxlIGJvdXRvbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdXRvbiBQYWludCBpbnRyb3V2YWJsZVwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgUGVpZ25leiB1biBwaXhlbCBhdSBjb2luIFNVUFx1MDBDOVJJRVVSIEdBVUNIRSBkZSBsYSB6b25lIFx1MDBFMCBwcm90XHUwMEU5Z2VyXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgTWFpbnRlbmFudCBwZWlnbmV6IHVuIHBpeGVsIGF1IGNvaW4gSU5GXHUwMEM5UklFVVIgRFJPSVQgZGUgbGEgem9uZVwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IEVuIGF0dGVudGUgZGUgbGEgc1x1MDBFOWxlY3Rpb24gZHUgY29pbiBzdXBcdTAwRTlyaWV1ciBnYXVjaGUuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBkZSBsYSBzXHUwMEU5bGVjdGlvbiBkdSBjb2luIGluZlx1MDBFOXJpZXVyIGRyb2l0Li4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IENvaW4gc3VwXHUwMEU5cmlldXIgZ2F1Y2hlIGNhcHR1clx1MDBFOTogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgQ29pbiBpbmZcdTAwRTlyaWV1ciBkcm9pdCBjYXB0dXJcdTAwRTk6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBEXHUwMEU5bGFpIGRlIHNcdTAwRTlsZWN0aW9uIGRcdTAwRTlwYXNzXHUwMEU5XCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBkZSBzXHUwMEU5bGVjdGlvbiwgdmV1aWxsZXogclx1MDBFOWVzc2F5ZXJcIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiVFx1MDBFOWxcdTAwRTljaGFyZ2VyIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiRWZmYWNlciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkZlcm1lclwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHJ1ID0ge1xuICAvLyBMYXVuY2hlclxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIEF1dG9CT1QnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0MnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1JyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCcsXG4gICAgc2VsZWN0aW9uOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDNFJyxcbiAgICB1c2VyOiAnXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDJyxcbiAgICBjaGFyZ2VzOiAnXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGJyxcbiAgICBiYWNrZW5kOiAnXHUwNDExXHUwNDREXHUwNDNBXHUwNDM1XHUwNDNEXHUwNDM0JyxcbiAgICBkYXRhYmFzZTogJ1x1MDQxMVx1MDQzMFx1MDQzN1x1MDQzMCBcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0NDUnLFxuICAgIHVwdGltZTogJ1x1MDQxMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQ0RiBcdTA0NDBcdTA0MzBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0NEInLFxuICAgIGNsb3NlOiAnXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDJyxcbiAgICBsYXVuY2g6ICdcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMnLFxuICAgIGxvYWRpbmc6ICdcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAnLFxuICAgIGV4ZWN1dGluZzogJ1x1MDQxMlx1MDQ0Qlx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNScsXG4gICAgZG93bmxvYWRpbmc6ICdcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDNBXHUwNDQwXHUwNDM4XHUwNDNGXHUwNDQyXHUwNDMwLi4uJyxcbiAgICBjaG9vc2VCb3Q6ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwIFx1MDQzOCBcdTA0M0RcdTA0MzBcdTA0MzZcdTA0M0NcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHUwNDEzXHUwNDNFXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFIFx1MDQzQSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0NDMnLFxuICAgIGxvYWRFcnJvcjogJ1x1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzgnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1MDQxRFx1MDQzNVx1MDQzMlx1MDQzRVx1MDQzN1x1MDQzQ1x1MDQzRVx1MDQzNlx1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMC4gXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDRDXHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzRVx1MDQzNFx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0JcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQ0OVx1MDQzNSBcdTA0NDBcdTA0MzBcdTA0MzcuJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBcdTA0MUVcdTA0M0RcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0QnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgXHUwNDFFXHUwNDQ0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBcdTA0MUVcdTA0MUEnLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCcsXG4gICAgdW5rbm93bjogJy0nLFxuICAgIGxvZ1dpbmRvdzogJ0xvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4IC0ge2JvdE5hbWV9JyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTA0MjFcdTA0M0FcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4JyxcbiAgICBjbGVhckxvZ3M6ICdcdTA0MUVcdTA0NDdcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4JyxcbiAgICBjbG9zZUxvZ3M6ICdcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NEMnXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBpbml0Qm90OiBcIlx1MDQxOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICByZXNpemVJbWFnZTogXCJcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDNDXHUwNDM1XHUwNDQwIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0M0UgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGxvYWRQcm9ncmVzczogXCJcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0MyBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIgXHUwNDNEXHUwNDMwIFx1MDQ0MVx1MDQzMFx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzMCFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHUwNDFEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDNFIHtjb3VudH0gXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQ0MSB7Y291bnR9IFx1MDQzNFx1MDQzNVx1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEZcdTA0M0NcdTA0MzhcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDM4IFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQ0Mlx1MDQzRVx1MDQzQyBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzUsIFx1MDQzM1x1MDQzNFx1MDQzNSBcdTA0MzJcdTA0NEIgXHUwNDQ1XHUwNDNFXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDM1LCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDNEXHUwNDNFXHUwNDNBIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzOFx1MDQzRFx1MDQzMFx1MDQzQlx1MDQ0MVx1MDQ0RiFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRGLi4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTA0MUZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwIFx1MDQ0M1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQ1x1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDM4XCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHUwNDFGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzMCwgXHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0ZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzgsIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzVcdTA0NDlcdTA0MzUgXHUwNDQwXHUwNDMwXHUwNDM3XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDNFIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MToge3BhaW50ZWR9IFx1MDQzOFx1MDQzNyB7dG90YWx9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOS4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgXHUwNDFEXHUwNDM1XHUwNDQyIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMi4gXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHUwNDIwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0MzVcdTA0M0NcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBcdTA0MjBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDNFISB7Y291bnR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0UuXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDZcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzUgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgXHUwNDIxXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0M0UgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwXCIsXG4gICAgcHJvZ3Jlc3M6IFwiXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgdXNlck5hbWU6IFwiXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXCIsXG4gICAgcGl4ZWxzOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0VcdTA0MzZcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDMyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHUwNDFEXHUwNDMwXHUwNDM2XHUwNDNDXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDBBQlx1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBBdXRvLUJPVFx1MDBCQiwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzguLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBcdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzNFx1MDQzRSB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFx1MDQyMFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDNEXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzOCBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0MzIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XHUwNDM1XCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1MDQyMFx1MDQzMFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQ0MCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzBcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlx1MDQyMVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQ0RVx1MDQ0OVx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzQgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3XCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTA0MThcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDQxXHUwNDM1IFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0NEJcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTA0MUZcdTA0M0VcdTA0M0FcdTA0MzBcdTA0MzdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgbWF4Q2hhcmdlczogXCJcdTA0MUNcdTA0MzBcdTA0M0FcdTA0NDFcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNCLVx1MDQzMlx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzIgXHUwNDM3XHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJcdTA0MTJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzggXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUge3RpbWV9IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM1XHUwNDNEIFx1MDQzQVx1MDQzMFx1MDQzQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0Q6IHtwYWludGVkfSBcdTA0MzhcdTA0Mzcge3RvdGFsfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNFXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzggXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXHUwNDMwOiB7ZXJyb3J9XCIsXG5cbiAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzA6IHtlcnJvcn1cIixcblxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0Mlx1MDQzNVx1MDQzQVx1MDQ0M1x1MDQ0OVx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM0IFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQVx1MDQzRVx1MDQzOT9cIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIlx1MDQxRFx1MDQzNSBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0NEZcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgY2FuY2VsOiBcIlx1MDQxRVx1MDQ0Mlx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIG1pbmltaXplOiBcIlx1MDQyMVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzRFx1MDQ0M1x1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHdpZHRoOiBcIlx1MDQyOFx1MDQzOFx1MDQ0MFx1MDQzOFx1MDQzRFx1MDQzMFwiLFxuICAgIGhlaWdodDogXCJcdTA0MTJcdTA0NEJcdTA0NDFcdTA0M0VcdTA0NDJcdTA0MzBcIixcbiAgICBrZWVwQXNwZWN0OiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDFcdTA0M0VcdTA0M0VcdTA0NDJcdTA0M0RcdTA0M0VcdTA0NDhcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNFXHUwNDNEXCIsXG4gICAgYXBwbHk6IFwiXHUwNDFGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgb3ZlcmxheU9uOiBcIlx1MDQxRFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNTogXHUwNDEyXHUwNDFBXHUwNDFCXCIsXG4gICAgb3ZlcmxheU9mZjogXCJcdTA0MURcdTA0MzBcdTA0M0JcdTA0M0VcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzU6IFx1MDQxMlx1MDQyQlx1MDQxQVx1MDQxQlwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQ0Nlx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDhcdTA0MzVcdTA0M0Q6IHtwYWludGVkfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNFIHwgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxOiB7cGVyY2VudH0lICh7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHt0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0MzA6IHtjdXJyZW50fSBcdTA0MzhcdTA0Mzcge25lZWRlZH0gLSBcdTA0MTJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0NEY6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9IC0gXHUwNDIyXHUwNDQwXHUwNDM1XHUwNDMxXHUwNDQzXHUwNDM1XHUwNDQyXHUwNDQxXHUwNDRGOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTA0MTFcdTA0M0VcdTA0NDIgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0MVx1MDQ0RiBcdTA0MzBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzhcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHUwNDFEXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QyBcdTA0MzJcdTA0NEJcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBLiBcdTA0MThcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDQzIFx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0MzAuXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzOSBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0NEIuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MURcdTA0MzBcdTA0MzZcdTA0MzBcdTA0NDJcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDM4IFx1MDBBQlBhaW50XHUwMEJCLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHUwNDFBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDMwIFx1MDBBQlBhaW50XHUwMEJCIFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0RiBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwIHthdHRlbXB0fSBcdTA0MzhcdTA0Mzcge21heEF0dGVtcHRzfSBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzcge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzNSB7YXR0ZW1wdH0gXHUwNDM4XHUwNDM3IHttYXhBdHRlbXB0c30sIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzcge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQ0MVx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQ0RiB7bWF4QXR0ZW1wdHN9IFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzRVx1MDQzQS4gXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMiBcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0NDNcdTA0NEVcdTA0NDlcdTA0MzVcdTA0M0MgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XHUwNDM1Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDM1XHUwNDQyXHUwNDM4LiBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0MzAuIFx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQy1cdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDQxXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDMwLCBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgLy8gdjIuMCAtIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCBcdTA0MzggXHUwNDQ4XHUwNDMwXHUwNDMxXHUwNDNCXHUwNDNFXHUwNDNEXHUwNDRCXG4gICAgcHJvdGVjdGlvbkVuYWJsZWQ6IFwiXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHByb3RlY3Rpb25EaXNhYmxlZDogXCJcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgcGFpbnRQYXR0ZXJuOiBcIlx1MDQyOFx1MDQzMFx1MDQzMVx1MDQzQlx1MDQzRVx1MDQzRCBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NEZcIixcbiAgICBwYXR0ZXJuTGluZWFyU3RhcnQ6IFwiXHUwNDFCXHUwNDM4XHUwNDNEXHUwNDM1XHUwNDM5XHUwNDNEXHUwNDRCXHUwNDM5IChcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0M0UpXCIsXG4gICAgcGF0dGVybkxpbmVhckVuZDogXCJcdTA0MUJcdTA0MzhcdTA0M0RcdTA0MzVcdTA0MzlcdTA0M0RcdTA0NEJcdTA0MzkgKFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQzNVx1MDQ0NilcIixcbiAgICBwYXR0ZXJuUmFuZG9tOiBcIlx1MDQyMVx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQzMFx1MDQzOVx1MDQzRFx1MDQ0Qlx1MDQzOVwiLFxuICAgIHBhdHRlcm5DZW50ZXJPdXQ6IFwiXHUwNDE4XHUwNDM3IFx1MDQ0Nlx1MDQzNVx1MDQzRFx1MDQ0Mlx1MDQ0MFx1MDQzMCBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0NDNcIixcbiAgICBwYXR0ZXJuQ29ybmVyc0ZpcnN0OiBcIlx1MDQyMVx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMCBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0NEJcIixcbiAgICBwYXR0ZXJuU3BpcmFsOiBcIlx1MDQyMVx1MDQzRlx1MDQzOFx1MDQ0MFx1MDQzMFx1MDQzQlx1MDQ0Q1wiLFxuICAgIHNvbGlkOiBcIlx1MDQyMVx1MDQzRlx1MDQzQlx1MDQzRVx1MDQ0OFx1MDQzRFx1MDQzRVx1MDQzOVwiLFxuICAgIHN0cmlwZXM6IFwiXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRCXCIsXG4gICAgY2hlY2tlcmJvYXJkOiBcIlx1MDQyOFx1MDQzMFx1MDQ0NVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0M0FcdTA0MzBcIixcbiAgICBncmFkaWVudDogXCJcdTA0MTNcdTA0NDBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0MzVcdTA0M0RcdTA0NDJcIixcbiAgICBkb3RzOiBcIlx1MDQyMlx1MDQzRVx1MDQ0N1x1MDQzQVx1MDQzOFwiLFxuICAgIHdhdmVzOiBcIlx1MDQxMlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQ0QlwiLFxuICAgIHNwaXJhbDogXCJcdTA0MjFcdTA0M0ZcdTA0MzhcdTA0NDBcdTA0MzBcdTA0M0JcdTA0NENcIixcbiAgICBtb3NhaWM6IFwiXHUwNDFDXHUwNDNFXHUwNDM3XHUwNDMwXHUwNDM4XHUwNDNBXHUwNDMwXCIsXG4gICAgYnJpY2tzOiBcIlx1MDQxQVx1MDQzOFx1MDQ0MFx1MDQzRlx1MDQzOFx1MDQ0N1x1MDQzOFwiLFxuICAgIHppZ3phZzogXCJcdTA0MTdcdTA0MzhcdTA0MzNcdTA0MzdcdTA0MzBcdTA0MzNcIixcbiAgICBwcm90ZWN0aW5nRHJhd2luZzogXCJcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDNEXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTA0MUVcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5OiB7Y291bnR9XCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REQyNyBcdTA0MTJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUge2NvdW50fSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NTFcdTA0M0RcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5Li4uXCIsXG4gICAgcmVwYWlyQ29tcGxldGVkOiBcIlx1MjcwNSBcdTA0MTJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDNFOiB7Y291bnR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOVwiLFxuICAgIG5vQ2hhcmdlc0ZvclJlcGFpcjogXCJcdTI2QTEgXHUwNDFBXHUwNDNFXHUwNDNDXHUwNDM4XHUwNDQxXHUwNDQxXHUwNDM4XHUwNDM5IFx1MDQzN1x1MDQzMCBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNEXHUwNDM1XHUwNDQyLCBcdTA0M0VcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUuLi5cIixcbiAgICBwcm90ZWN0aW9uUHJpb3JpdHk6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1MDQxRlx1MDQ0MFx1MDQzOFx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQ0MiBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEIgXHUwNDMwXHUwNDNBXHUwNDQyXHUwNDM4XHUwNDMyXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXCIsXG4gICAgcGF0dGVybkFwcGxpZWQ6IFwiXHUwNDI4XHUwNDMwXHUwNDMxXHUwNDNCXHUwNDNFXHUwNDNEIFx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ1MVx1MDQzRFwiLFxuICAgIGN1c3RvbVBhdHRlcm46IFwiXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXHUwNDQxXHUwNDNBXHUwNDM4XHUwNDM5IFx1MDQ0OFx1MDQzMFx1MDQzMVx1MDQzQlx1MDQzRVx1MDQzRFwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4IC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIlx1MDQyMVx1MDQzQVx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzhcIixcbiAgICBjbGVhckxvZ3M6IFwiXHUwNDFFXHUwNDQ3XHUwNDM4XHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOFwiLFxuICAgIGNsb3NlTG9nczogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NENcIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDXCIsXG4gICAgc3RhcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcDogXCJcdTA0MUVcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wcGVkOiBcIlx1MDQxMVx1MDQzRVx1MDQ0MiBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcIixcbiAgICBjYWxpYnJhdGU6IFwiXHUwNDFBXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDMxXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgcGFpbnRPbmNlOiBcIlx1MDQxNVx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzRVx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzRVx1MDQzMlx1MDQzRVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0NDNcdTA0NDFcdTA0MzAuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIlx1MDQxQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGRlbGF5OiBcIlx1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMCAoXHUwNDNDXHUwNDQxKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0MzdcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XCIsXG4gICAgbWluQ2hhcmdlczogXCJcdTA0MUNcdTA0MzhcdTA0M0RcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNCLVx1MDQzMlx1MDQzRVwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTA0MjBcdTA0MzVcdTA0MzZcdTA0MzhcdTA0M0MgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgcmFuZG9tOiBcIlx1MDQyMVx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQzMFx1MDQzOVx1MDQzRFx1MDQ0Qlx1MDQzOVwiLFxuICAgIGZpeGVkOiBcIlx1MDQyNFx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOVwiLFxuICAgIHJhbmdlOiBcIlx1MDQxNFx1MDQzOFx1MDQzMFx1MDQzRlx1MDQzMFx1MDQzN1x1MDQzRVx1MDQzRFwiLFxuICAgIGZpeGVkQ29sb3I6IFwiXHUwNDI0XHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0MlwiLFxuICAgIGFkdmFuY2VkOiBcIlx1MDQyMFx1MDQzMFx1MDQ0MVx1MDQ0OFx1MDQzOFx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNVwiLFxuICAgIHRpbGVYOiBcIlx1MDQxRlx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQzQVx1MDQzMCBYXCIsXG4gICAgdGlsZVk6IFwiXHUwNDFGXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDNBXHUwNDMwIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlx1MDQyMVx1MDQzMlx1MDQzRVx1MDQ0RiBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0MzBcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDA6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTA0MTdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcIixcbiAgICBwYWludGVkOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQzMFx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzRVwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgcmV0cmllczogXCJcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDM4XCIsXG4gICAgdGlsZTogXCJcdTA0MUZcdTA0M0JcdTA0MzhcdTA0NDJcdTA0M0FcdTA0MzBcIixcbiAgICBjb25maWdTYXZlZDogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIlx1MDQxQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBjb25maWdSZXNldDogXCJcdTA0MjFcdTA0MzFcdTA0NDBcdTA0M0VcdTA0NDEgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4XCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzMlx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQ0M1x1MDQ0RSBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDMwIFx1MDQzQVx1MDQzRVx1MDQzRVx1MDQ0MFx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzMFx1MDQ0Mi4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHUwNDExXHUwNDREXHUwNDNBXHUwNDREXHUwNDNEXHUwNDM0IFx1MDQxRVx1MDQzRFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRFwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIlx1MDQxMVx1MDQ0RFx1MDQzQVx1MDQ0RFx1MDQzRFx1MDQzNCBcdTA0MUVcdTA0NDRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcIixcbiAgICBzdGFydGluZ0JvdDogXCJcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0EgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLi4uXCIsXG5cbiAgICBzdG9wcGluZ0JvdDogXCJcdTA0MUVcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0FcdTA0MzAgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHUwNDFBXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDMxXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQyBcdTA0NDNcdTA0MzZcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRS4gXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzQgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDNFXHUwNDNDIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzAuXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDFGXHUwNDIzXHUwNDIxXHUwNDIyXHUwNDFFXHUwNDE5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0NEIsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0M0VcdTA0MzFcdTA0M0VcdTA0MzdcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0NFx1MDQzMFx1MDQ0MFx1MDQzQ1x1MDQzMC5cIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRGLi4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwISBcdTA0MjBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDE6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTA0MjJcdTA0MzBcdTA0MzlcdTA0M0NcdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDEgXHUwNDNGXHUwNDNFXHUwNDNDXHUwNDNFXHUwNDQ5XHUwNDRDXHUwNDRFIFx1MDBBQlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcdTAwQkJcIixcbiAgICBmYXJtUmFkaXVzOiBcIlx1MDQyMFx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0M1x1MDQ0MSBcdTA0NDRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzBcIixcbiAgICBwb3NpdGlvbkluZm86IFwiXHUwNDIyXHUwNDM1XHUwNDNBXHUwNDQzXHUwNDQ5XHUwNDMwXHUwNDRGIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDIFx1MDQzMiBcdTA0NDBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDFcdTA0MzUge3JhZGl1c31weCBcdTA0M0VcdTA0NDIgKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBcdTA0MTJcdTA0MTBcdTA0MTZcdTA0MURcdTA0MUU6IFx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MUZcdTA0MjNcdTA0MjFcdTA0MjJcdTA0MjNcdTA0MkUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDM4XHUwNDM3XHUwNDMxXHUwNDM1XHUwNDM2XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzQlx1MDQzOFx1MDQzQVx1MDQ0Mlx1MDQzRVx1MDQzMi5cIixcbiAgICBub1Bvc2l0aW9uOiBcIlx1MDQxRFx1MDQzNVx1MDQ0MiBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEM6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHUwNDIxXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMuIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDNEXHUwNDMwIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzNSwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzRVx1MDQzMVx1MDQzRVx1MDQzN1x1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQ0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwLlwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4IC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIlx1MDQyMVx1MDQzQVx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzhcIixcbiAgICBjbGVhckxvZ3M6IFwiXHUwNDFFXHUwNDQ3XHUwNDM4XHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOFwiLFxuICAgIGNsb3NlTG9nczogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NENcIlxuICB9LFxuXG4gIC8vIENvbW1vbi9TaGFyZWRcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1MDQxNFx1MDQzMFwiLFxuICAgIG5vOiBcIlx1MDQxRFx1MDQzNVx1MDQ0MlwiLFxuICAgIG9rOiBcIlx1MDQxRVx1MDQxQVwiLFxuICAgIGNhbmNlbDogXCJcdTA0MUVcdTA0NDJcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBjbG9zZTogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NENcIixcbiAgICBzYXZlOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGxvYWQ6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgZGVsZXRlOiBcIlx1MDQyM1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGVkaXQ6IFwiXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc3RhcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcDogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBwYXVzZTogXCJcdTA0MUZcdTA0NDBcdTA0MzhcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICByZXN1bWU6IFwiXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgcmVzZXQ6IFwiXHUwNDIxXHUwNDMxXHUwNDQwXHUwNDNFXHUwNDQxXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc2V0dGluZ3M6IFwiXHUwNDFEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4XCIsXG4gICAgaGVscDogXCJcdTA0MUZcdTA0M0VcdTA0M0NcdTA0M0VcdTA0NDlcdTA0NENcIixcbiAgICBhYm91dDogXCJcdTA0MThcdTA0M0RcdTA0NDRcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBsYW5ndWFnZTogXCJcdTA0MkZcdTA0MzdcdTA0NEJcdTA0M0FcIixcbiAgICBsb2FkaW5nOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMC4uLlwiLFxuICAgIGVycm9yOiBcIlx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMFwiLFxuICAgIHN1Y2Nlc3M6IFwiXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ1XCIsXG4gICAgd2FybmluZzogXCJcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0NDNcdTA0M0ZcdTA0NDBcdTA0MzVcdTA0MzZcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBpbmZvOiBcIlx1MDQxOFx1MDQzRFx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdTA0MkZcdTA0MzdcdTA0NEJcdTA0M0EgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEIFx1MDQzRFx1MDQzMCB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMFwiLFxuICAgIGluaXRCb3Q6IFwiXHUwNDE4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIEd1YXJkLUJPVFwiLFxuICAgIHNlbGVjdEFyZWE6IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGNhcHR1cmVBcmVhOiBcIlx1MDQxN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0M1wiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NDNcIixcbiAgICB1cHBlckxlZnQ6IFwiXHUwNDEyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQxQlx1MDQzNVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0MjNcdTA0MzNcdTA0M0VcdTA0M0JcIixcbiAgICBsb3dlclJpZ2h0OiBcIlx1MDQxRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0MUZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDIzXHUwNDMzXHUwNDNFXHUwNDNCXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzhcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiXHUwNDFFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlx1MDQxMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzhcIixcbiAgICBjaGFyZ2VzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzguLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0MzAgXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQ0Qi4gXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0MyBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIgXHUwNDNEXHUwNDMwIFx1MDQ0MVx1MDQzMFx1MDQzOVx1MDQ0Mlx1MDQzNS5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHUwNDFEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDNFIHtjb3VudH0gXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOCBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBcdTA0MURcdTA0MzVcdTA0MzRcdTA0MzVcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzJcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNFXHUwNDQwXHUwNDM0XHUwNDM4XHUwNDNEXHUwNDMwXHUwNDQyXHUwNDRCXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0M0RcdTA0MzAgXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0JcdTA0MzVcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0Q1x1MDQ0OFx1MDQzNSBcdTA0M0RcdTA0MzhcdTA0MzZcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMFwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0MVx1MDQzQlx1MDQzOFx1MDQ0OFx1MDQzQVx1MDQzRVx1MDQzQyBcdTA0MzFcdTA0M0VcdTA0M0JcdTA0NENcdTA0NDhcdTA0MzBcdTA0NEY6IHtzaXplfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgKFx1MDQzQ1x1MDQzMFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQzQ1x1MDQ0M1x1MDQzQzoge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEIuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzA6IHtjb3VudH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRlx1MDQzRVx1MDQzNCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0M0VcdTA0MzlcIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzAgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4OiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdTA0MjFcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEJcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzMCAtIFx1MDQzQ1x1MDQzRVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQzRFx1MDQzMyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyAtIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0RcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNFXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDMyIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1MDQxMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSB7Y291bnR9IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFx1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzlcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0Mzk6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNVx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzlcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDMyIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzguLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDM4IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOToge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTA0MjFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0MzYgXHUwNDMwXHUwNDNBXHUwNDQyXHUwNDM4XHUwNDMyXHUwNDM1XHUwNDNEIC0gXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQzNCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0M0VcdTA0MzlcIixcbiAgICBsYXN0Q2hlY2s6IFwiXHUwNDFGXHUwNDNFXHUwNDQxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDNEXHUwNDRGXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMDoge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1MDQyMVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQ0RVx1MDQ0OVx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3OiB7dGltZX1cdTA0NDFcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTA0MURcdTA0MzUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzguIFx1MDQxOFx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0NDMgXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzMC5cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0RiBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzOSBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0NEIuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MURcdTA0MzBcdTA0MzZcdTA0MzBcdTA0NDJcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDM4IFx1MDBBQlBhaW50XHUwMEJCLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHUwNDFBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDMwIFx1MDBBQlBhaW50XHUwMEJCIFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxMlx1MDQxNVx1MDQyMFx1MDQyNVx1MDQxRFx1MDQxNVx1MDQxQyBcdTA0MUJcdTA0MTVcdTA0MTJcdTA0MUVcdTA0MUMgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDQzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDRCXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHUwNDIyXHUwNDM1XHUwNDNGXHUwNDM1XHUwNDQwXHUwNDRDIFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxRFx1MDQxOFx1MDQxNlx1MDQxRFx1MDQxNVx1MDQxQyBcdTA0MUZcdTA0MjBcdTA0MTBcdTA0MTJcdTA0MUVcdTA0MUMgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDQzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM1XHUwNDMzXHUwNDNFIFx1MDQzQlx1MDQzNVx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0MzAuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0RcdTA0MzhcdTA0MzZcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMC4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTA0MTJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDNCXHUwNDM1XHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQ0M1x1MDQzM1x1MDQzRVx1MDQzQiBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDdcdTA0MzVcdTA0M0Q6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRDogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQy1cdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwXCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAsIFx1MDQzRlx1MDQzRVx1MDQzNlx1MDQzMFx1MDQzQlx1MDQ0M1x1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMCwgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzMFwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4IC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIlx1MDQyMVx1MDQzQVx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzhcIixcbiAgICBjbGVhckxvZ3M6IFwiXHUwNDFFXHUwNDQ3XHUwNDM4XHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOFwiLFxuICAgIGNsb3NlTG9nczogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NENcIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCB6aEhhbnMgPSB7XG4gIC8vIFx1NTQyRlx1NTJBOFx1NTY2OFxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIFx1ODFFQVx1NTJBOFx1NjczQVx1NTY2OFx1NEVCQScsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgXHU4MUVBXHU1MkE4XHU1MTlDXHU1NzNBJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggXHU4MUVBXHU1MkE4XHU3RUQ4XHU1NkZFJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgXHU4MUVBXHU1MkE4XHU1Qjg4XHU2MkE0JyxcbiAgICBzZWxlY3Rpb246ICdcdTkwMDlcdTYyRTknLFxuICAgIHVzZXI6ICdcdTc1MjhcdTYyMzcnLFxuICAgIGNoYXJnZXM6ICdcdTZCMjFcdTY1NzAnLFxuICAgIGJhY2tlbmQ6ICdcdTU0MEVcdTdBRUYnLFxuICAgIGRhdGFiYXNlOiAnXHU2NTcwXHU2MzZFXHU1RTkzJyxcbiAgICB1cHRpbWU6ICdcdThGRDBcdTg4NENcdTY1RjZcdTk1RjQnLFxuICAgIGNsb3NlOiAnXHU1MTczXHU5NUVEJyxcbiAgICBsYXVuY2g6ICdcdTU0MkZcdTUyQTgnLFxuICAgIGxvYWRpbmc6ICdcdTUyQTBcdThGN0RcdTRFMkRcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdcdTZCNjNcdTU3MjhcdTRFMEJcdThGN0RcdTgxMUFcdTY3MkNcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ1x1OTAwOVx1NjJFOVx1NEUwMFx1NEUyQVx1NjczQVx1NTY2OFx1NEVCQVx1NUU3Nlx1NzBCOVx1NTFGQlx1NTQyRlx1NTJBOCcsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1x1NTFDNlx1NTkwN1x1NTQyRlx1NTJBOCcsXG4gICAgbG9hZEVycm9yOiAnXHU1MkEwXHU4RjdEXHU5NTE5XHU4QkVGJyxcbiAgICBsb2FkRXJyb3JNc2c6ICdcdTY1RTBcdTZDRDVcdTUyQTBcdThGN0RcdTYyNDBcdTkwMDlcdTY3M0FcdTU2NjhcdTRFQkFcdTMwMDJcdThCRjdcdTY4QzBcdTY3RTVcdTdGNTFcdTdFRENcdThGREVcdTYzQTVcdTYyMTZcdTkxQ0RcdThCRDVcdTMwMDInLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFx1NjhDMFx1NjdFNVx1NEUyRC4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIFx1NTcyOFx1N0VCRicsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBcdTc5QkJcdTdFQkYnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIFx1NkI2M1x1NUUzOCcsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgXHU5NTE5XHU4QkVGJyxcbiAgICB1bmtub3duOiAnLScsXG4gICAgbG9nV2luZG93OiAnXHVEODNEXHVEQ0NCIExvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHU2NUU1XHU1RkQ3XHU3QTk3XHU1M0UzJyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTRFMEJcdThGN0RcdTY1RTVcdTVGRDcnLFxuICAgIGNsZWFyTG9nczogJ1x1NkUwNVx1OTY2NFx1NjVFNVx1NUZENycsXG4gICAgY2xvc2VMb2dzOiAnXHU1MTczXHU5NUVEJ1xuICB9LFxuXG4gIC8vIFx1N0VEOFx1NTZGRVx1NkEyMVx1NTc1N1xuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkVcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJBOFx1NjczQVx1NTY2OFx1NEVCQVwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1NEUwQVx1NEYyMFx1NTZGRVx1NzI0N1wiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1OEMwM1x1NjU3NFx1NTZGRVx1NzI0N1x1NTkyN1x1NUMwRlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTAwOVx1NjJFOVx1NEY0RFx1N0Y2RVwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2XCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1NTA1Q1x1NkI2Mlx1N0VEOFx1NTIzNlwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTRGRERcdTVCNThcdThGREJcdTVFQTZcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2XCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1NjhDMFx1NjdFNVx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1OEJGN1x1NTcyOFx1N0Y1MVx1N0FEOVx1NEUwQVx1NjI1M1x1NUYwMFx1OEMwM1x1ODI3Mlx1Njc3Rlx1NTQwRVx1OTFDRFx1OEJENVx1RkYwMVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTc5Q0RcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzJcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIFx1NkI2M1x1NTcyOFx1NTJBMFx1OEY3RFx1NTZGRVx1NzI0Ny4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTU2RkVcdTcyNDdcdTVERjJcdTUyQTBcdThGN0RcdUZGMENcdTY3MDlcdTY1NDhcdTUwQ0ZcdTdEMjAge2NvdW50fSBcdTRFMkFcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTU2RkVcdTcyNDdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1OEJGN1x1NTcyOFx1NEY2MFx1NjBGM1x1NUYwMFx1NTlDQlx1N0VEOFx1NTIzNlx1NzY4NFx1NTczMFx1NjVCOVx1NkQ4Mlx1N0IyQ1x1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1RkYwMVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU2RDgyXHU1M0MyXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NEY0RFx1N0Y2RVx1OEJCRVx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU5MDA5XHU2MkU5XHU4RDg1XHU2NUY2XCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHU1REYyXHU2OEMwXHU2RDRCXHU1MjMwXHU0RjREXHU3RjZFXHVGRjBDXHU1OTA0XHU3NDA2XHU0RTJELi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU2OEMwXHU2RDRCXHU1OTMxXHU4RDI1XHVGRjBDXHU4QkY3XHU5MUNEXHU4QkQ1XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2Li4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHU4RkRCXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIFx1NkNBMVx1NjcwOVx1NkIyMVx1NjU3MFx1MzAwMlx1N0I0OVx1NUY4NSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NzUyOFx1NjIzN1x1NURGMlx1NTA1Q1x1NkI2Mlx1N0VEOFx1NTIzNlwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1N0VEOFx1NTIzNlx1NUI4Q1x1NjIxMFx1RkYwMVx1NTE3MVx1N0VEOFx1NTIzNiB7Y291bnR9IFx1NEUyQVx1NTBDRlx1N0QyMFx1MzAwMlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIFx1N0VEOFx1NTIzNlx1OEZDN1x1N0EwQlx1NEUyRFx1NTFGQVx1OTUxOVwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1NTJBMFx1OEY3RFx1NTZGRVx1NzI0N1x1NUU3Nlx1OTAwOVx1NjJFOVx1NEY0RFx1N0Y2RVwiLFxuICAgIHByb2dyZXNzOiBcIlx1OEZEQlx1NUVBNlwiLFxuICAgIHVzZXJOYW1lOiBcIlx1NzUyOFx1NjIzN1wiLFxuICAgIHBpeGVsczogXCJcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3MFwiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiXHU5ODg0XHU4QkExXHU2NUY2XHU5NUY0XCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHU3MEI5XHU1MUZCXHUyMDFDXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBXHUyMDFEXHU1RjAwXHU1OUNCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgXHU1NkZFXHU3MjQ3XHU1REYyXHU4QzAzXHU2NTc0XHU0RTNBIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHU3RUQ4XHU1MjM2XHU2NjgyXHU1MDVDXHU0RThFXHU0RjREXHU3RjZFIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXHU2NTcwXCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1NjI3OVx1NkIyMVx1NTkyN1x1NUMwRlwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHU0RTBCXHU2QjIxXHU2Mjc5XHU2QjIxXHU2NUY2XHU5NUY0XCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTRGN0ZcdTc1MjhcdTYyNDBcdTY3MDlcdTUzRUZcdTc1MjhcdTZCMjFcdTY1NzBcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTY2M0VcdTc5M0FcdTg5ODZcdTc2RDZcdTVDNDJcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1NkJDRlx1NjI3OVx1NjcwMFx1NTkyN1x1NkIyMVx1NjU3MFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzA6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiXHU1MjY5XHU0RjU5XHU2NUY2XHU5NUY0XCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTdCNDlcdTVGODUge3RpbWV9IFx1NTQwRVx1N0VFN1x1N0VFRC4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1OEZEQlx1NUVBNlx1NURGMlx1NEZERFx1NUI1OFx1NEUzQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1NURGMlx1NTJBMFx1OEY3RFx1OEZEQlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwXHU1REYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1NTJBMFx1OEY3RFx1OEZEQlx1NUVBNlx1NTkzMVx1OEQyNToge2Vycm9yfVwiLFxuIFxuICAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgXHU0RkREXHU1QjU4XHU4RkRCXHU1RUE2XHU1OTMxXHU4RDI1OiB7ZXJyb3J9XCIsXG5cbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1NTcyOFx1NTA1Q1x1NkI2Mlx1NEU0Qlx1NTI0RFx1ODk4MVx1NEZERFx1NUI1OFx1NUY1M1x1NTI0RFx1OEZEQlx1NUVBNlx1NTQxN1x1RkYxRlwiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTY1M0VcdTVGMDNcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgbWluaW1pemU6IFwiXHU2NzAwXHU1QzBGXHU1MzE2XCIsXG4gICAgd2lkdGg6IFwiXHU1QkJEXHU1RUE2XCIsXG4gICAgaGVpZ2h0OiBcIlx1OUFEOFx1NUVBNlwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHU0RkREXHU2MzAxXHU3RUI1XHU2QTJBXHU2QkQ0XCIsXG4gICAgYXBwbHk6IFwiXHU1RTk0XHU3NTI4XCIsXG4gICAgb3ZlcmxheU9uOiBcIlx1ODk4Nlx1NzZENlx1NUM0MjogXHU1RjAwXHU1NDJGXCIsXG4gICAgb3ZlcmxheU9mZjogXCJcdTg5ODZcdTc2RDZcdTVDNDI6IFx1NTE3M1x1OTVFRFwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1NjI3OVx1NkIyMVx1NUI4Q1x1NjIxMDogXHU1REYyXHU3RUQ4XHU1MjM2IHtwYWludGVkfSBcdTUwQ0ZcdTdEMjAgfCBcdThGREJcdTVFQTY6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3MFx1NjA2Mlx1NTkwRDoge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU2NUY2XHU5NUY0OiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTcwOiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTUyNjlcdTRGNTk6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NjVFMFx1NkNENVx1ODFFQVx1NTJBOFx1NTQyRlx1NTJBOFx1RkYwQ1x1OEJGN1x1NjI0Qlx1NTJBOFx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2OEMwXHU2RDRCXHU1MjMwXHU4QzAzXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThDMDNcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTcwQjlcdTUxRkJcdTdFRDhcdTUyMzZcdTYzMDlcdTk0QUUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFRDhcdTUyMzZcdTYzMDlcdTk0QUVcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHU5MUNEXHU4QkQ1IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9XHVGRjBDXHU3QjQ5XHU1Rjg1IHtkZWxheX0gXHU3OUQyLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHU3QjJDIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NUMxRFx1OEJENVx1NTFGQVx1OTUxOVx1RkYwQ1x1NUMwNlx1NTcyOCB7ZGVsYXl9IFx1NzlEMlx1NTQwRVx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBcdThEODVcdThGQzcge21heEF0dGVtcHRzfSBcdTZCMjFcdTVDMURcdThCRDVcdTU5MzFcdThEMjVcdTMwMDJcdTdFRTdcdTdFRURcdTRFMEJcdTRFMDBcdTYyNzkuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIFx1N0Y1MVx1N0VEQ1x1OTUxOVx1OEJFRlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTY3MERcdTUyQTFcdTU2NjhcdTk1MTlcdThCRUZcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThCRDUuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1NjcwRFx1NTJBMVx1NTY2OFx1OEQ4NVx1NjVGNlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiLFxuICAgIC8vIHYyLjAgLSBcdTRGRERcdTYyQTRcdTRFMEVcdTdFRDhcdTUyMzZcdTZBMjFcdTVGMEZcbiAgICBwcm90ZWN0aW9uRW5hYmxlZDogXCJcdTVERjJcdTVGMDBcdTU0MkZcdTRGRERcdTYyQTRcIixcbiAgICBwcm90ZWN0aW9uRGlzYWJsZWQ6IFwiXHU1REYyXHU1MTczXHU5NUVEXHU0RkREXHU2MkE0XCIsXG4gICAgcGFpbnRQYXR0ZXJuOiBcIlx1N0VEOFx1NTIzNlx1NkEyMVx1NUYwRlwiLFxuICAgIHBhdHRlcm5MaW5lYXJTdGFydDogXCJcdTdFQkZcdTYwMjdcdUZGMDhcdThENzdcdTcwQjlcdUZGMDlcIixcbiAgICBwYXR0ZXJuTGluZWFyRW5kOiBcIlx1N0VCRlx1NjAyN1x1RkYwOFx1N0VDOFx1NzBCOVx1RkYwOVwiLFxuICAgIHBhdHRlcm5SYW5kb206IFwiXHU5NjhGXHU2NzNBXCIsXG4gICAgcGF0dGVybkNlbnRlck91dDogXCJcdTRFQ0VcdTRFMkRcdTVGQzNcdTU0MTFcdTU5MTZcIixcbiAgICBwYXR0ZXJuQ29ybmVyc0ZpcnN0OiBcIlx1NTE0OFx1ODlEMlx1ODQzRFwiLFxuICAgIHBhdHRlcm5TcGlyYWw6IFwiXHU4N0JBXHU2NUNCXCIsXG4gICAgc29saWQ6IFwiXHU1QjlFXHU1RkMzXCIsXG4gICAgc3RyaXBlczogXCJcdTY3NjFcdTdFQjlcIixcbiAgICBjaGVja2VyYm9hcmQ6IFwiXHU2OENCXHU3NkQ4XHU2ODNDXCIsXG4gICAgZ3JhZGllbnQ6IFwiXHU2RTEwXHU1M0Q4XCIsXG4gICAgZG90czogXCJcdTcwQjlcdTcyQjZcIixcbiAgICB3YXZlczogXCJcdTZDRTJcdTZENkFcIixcbiAgICBzcGlyYWw6IFwiXHU4N0JBXHU2NUNCXCIsXG4gICAgbW9zYWljOiBcIlx1OUE2Q1x1OEQ1Qlx1NTE0QlwiLFxuICAgIGJyaWNrczogXCJcdTc4MTZcdTU3NTdcIixcbiAgICB6aWd6YWc6IFwiXHU0RTRCXHU1QjU3XHU1RjYyXCIsXG4gICAgcHJvdGVjdGluZ0RyYXdpbmc6IFwiXHU2QjYzXHU1NzI4XHU0RkREXHU2MkE0XHU1NkZFXHU3QTNGLi4uXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTY4QzBcdTZENEJcdTUyMzAge2NvdW50fSBcdTU5MDRcdTY2RjRcdTY1MzlcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERDI3IFx1NkI2M1x1NTcyOFx1NEZFRVx1NTkwRCB7Y291bnR9IFx1NEUyQVx1NjZGNFx1NjUzOVx1NzY4NFx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHJlcGFpckNvbXBsZXRlZDogXCJcdTI3MDUgXHU0RkVFXHU1OTBEXHU1QjhDXHU2MjEwXHVGRjFBe2NvdW50fSBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICBub0NoYXJnZXNGb3JSZXBhaXI6IFwiXHUyNkExIFx1NEZFRVx1NTkwRFx1NEUwRFx1NkQ4OFx1ODAxN1x1NzBCOVx1NjU3MFx1RkYwQ1x1N0I0OVx1NUY4NVx1NEUyRC4uLlwiLFxuICAgIHByb3RlY3Rpb25Qcmlvcml0eTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1REYyXHU1NDJGXHU3NTI4XHU0RkREXHU2MkE0XHU0RjE4XHU1MTQ4XCIsXG4gICAgcGF0dGVybkFwcGxpZWQ6IFwiXHU1REYyXHU1RTk0XHU3NTI4XHU2QTIxXHU1RjBGXCIsXG4gICAgY3VzdG9tUGF0dGVybjogXCJcdTgxRUFcdTVCOUFcdTRFNDlcdTZBMjFcdTVGMEZcIixcbiAgICBsb2dXaW5kb3c6ICdcdUQ4M0RcdURDQ0IgTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTY1RTVcdTVGRDdcdTdBOTdcdTUzRTMnLFxuICAgIGRvd25sb2FkTG9nczogJ1x1NEUwQlx1OEY3RFx1NjVFNVx1NUZENycsXG4gICAgY2xlYXJMb2dzOiAnXHU2RTA1XHU5NjY0XHU2NUU1XHU1RkQ3JyxcbiAgICBjbG9zZUxvZ3M6ICdcdTUxNzNcdTk1RUQnXG4gIH0sXG5cbiAgLy8gXHU1MTlDXHU1NzNBXHU2QTIxXHU1NzU3XHVGRjA4XHU1Rjg1XHU1QjlFXHU3M0IwXHVGRjA5XG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU1MTlDXHU1NzNBXHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgc3RhcnQ6IFwiXHU1RjAwXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBzdG9wcGVkOiBcIlx1NjczQVx1NTY2OFx1NEVCQVx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIGNhbGlicmF0ZTogXCJcdTY4MjFcdTUxQzZcIixcbiAgICBwYWludE9uY2U6IFwiXHU0RTAwXHU2QjIxXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiXHU2OEMwXHU2N0U1XHU3MkI2XHU2MDAxXHU0RTJELi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTkxNERcdTdGNkVcIixcbiAgICBkZWxheTogXCJcdTVFRjZcdThGREYgKFx1NkJFQlx1NzlEMilcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcIixcbiAgICBtaW5DaGFyZ2VzOiBcIlx1NjcwMFx1NUMxMVx1NkIyMVx1NjU3MFwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTk4OUNcdTgyNzJcdTZBMjFcdTVGMEZcIixcbiAgICByYW5kb206IFwiXHU5NjhGXHU2NzNBXCIsXG4gICAgZml4ZWQ6IFwiXHU1NkZBXHU1QjlBXCIsXG4gICAgcmFuZ2U6IFwiXHU4MzAzXHU1NkY0XCIsXG4gICAgZml4ZWRDb2xvcjogXCJcdTU2RkFcdTVCOUFcdTk4OUNcdTgyNzJcIixcbiAgICBhZHZhbmNlZDogXCJcdTlBRDhcdTdFQTdcIixcbiAgICB0aWxlWDogXCJcdTc0RTZcdTcyNDcgWFwiLFxuICAgIHRpbGVZOiBcIlx1NzRFNlx1NzI0NyBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTgxRUFcdTVCOUFcdTRFNDlcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTRGOEJcdTU5ODI6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTYzNTVcdTgzQjdcIixcbiAgICBwYWludGVkOiBcIlx1NURGMlx1N0VEOFx1NTIzNlwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgcmV0cmllczogXCJcdTkxQ0RcdThCRDVcIixcbiAgICB0aWxlOiBcIlx1NzRFNlx1NzI0N1wiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NEZERFx1NUI1OFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTUyQTBcdThGN0RcIixcbiAgICBjb25maWdSZXNldDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTkxQ0RcdTdGNkVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlx1OEJGN1x1NjI0Qlx1NTJBOFx1N0VEOFx1NTIzNlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1NEVFNVx1NjM1NVx1ODNCN1x1NTc1MFx1NjgwNy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHU1NDBFXHU3QUVGXHU1NzI4XHU3RUJGXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiXHU1NDBFXHU3QUVGXHU3OUJCXHU3RUJGXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1NDJGXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1MDVDXHU2QjYyXHU2NzNBXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHU2ODIxXHU1MUM2XHU0RTJELi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHU4MUVBXHU1MkE4XHU1MTlDXHU1NzNBXHU1REYyXHU1NzI4XHU4RkQwXHU4ODRDXHUzMDAyXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkVcdTZCNjNcdTU3MjhcdThGRDBcdTg4NENcdUZGMENcdThCRjdcdTUxNDhcdTUxNzNcdTk1RURcdTUxOERcdTU0MkZcdTUyQThcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0FcdTMwMDJcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTU3MzBcdTU2RkVcdTc2ODRcdTdBN0FcdTc2N0RcdTUzM0FcdTU3REZcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcdTRFRTVcdThCQkVcdTdGNkVcdTUxOUNcdTU3M0FcdTUzM0FcdTU3REZcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NkQ4Mlx1NTNDMlx1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdThCQkVcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcdTUzNEFcdTVGODQ6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTUzM0FcdTU3REZcdTkwMDlcdTYyRTlcdThEODVcdTY1RjZcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlx1RkYwOFx1NEY3Rlx1NzUyOFx1MjAxQ1x1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlx1MjAxRFx1NjMwOVx1OTRBRVx1RkYwOVwiLFxuICAgIGZhcm1SYWRpdXM6IFwiXHU1MTlDXHU1NzNBXHU1MzRBXHU1Rjg0XCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1NUY1M1x1NTI0RFx1NTMzQVx1NTdERlwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHU2QjYzXHU1NzI4XHU0RUU1XHU1MzRBXHU1Rjg0IHtyYWRpdXN9cHggXHU1NzI4ICh7eH0se3l9KSBcdTUxOUNcdTU3M0FcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIFx1OTFDRFx1ODk4MTogXHU4QkY3XHU5MDA5XHU2MkU5XHU3QTdBXHU3NjdEXHU1MzNBXHU1N0RGXHU0RUU1XHU5MDdGXHU1MTREXHU1MUIyXHU3QTgxXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTY3MkFcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTUzM0FcdTU3REY6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHU4QkY3XHU1MTQ4XHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHVGRjBDXHU1NzI4XHU1NzMwXHU1NkZFXHU0RTBBXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHU0RUU1XHU4QkJFXHU3RjZFXHU1MTlDXHU1NzNBXHU1MzNBXHU1N0RGXCIsXG4gICAgbG9nV2luZG93OiAnXHVEODNEXHVEQ0NCIExvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHU2NUU1XHU1RkQ3XHU3QTk3XHU1M0UzJyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTRFMEJcdThGN0RcdTY1RTVcdTVGRDcnLFxuICAgIGNsZWFyTG9nczogJ1x1NkUwNVx1OTY2NFx1NjVFNVx1NUZENycsXG4gICAgY2xvc2VMb2dzOiAnXHU1MTczXHU5NUVEJ1xuICB9LFxuXG4gIC8vIFx1NTE2Q1x1NTE3MVxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiXHU2NjJGXCIsXG4gICAgbm86IFwiXHU1NDI2XCIsXG4gICAgb2s6IFwiXHU3ODZFXHU4QkE0XCIsXG4gICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgIGNsb3NlOiBcIlx1NTE3M1x1OTVFRFwiLFxuICAgIHNhdmU6IFwiXHU0RkREXHU1QjU4XCIsXG4gICAgbG9hZDogXCJcdTUyQTBcdThGN0RcIixcbiAgICBkZWxldGU6IFwiXHU1MjIwXHU5NjY0XCIsXG4gICAgZWRpdDogXCJcdTdGMTZcdThGOTFcIixcbiAgICBzdGFydDogXCJcdTVGMDBcdTU5Q0JcIixcbiAgICBzdG9wOiBcIlx1NTA1Q1x1NkI2MlwiLFxuICAgIHBhdXNlOiBcIlx1NjY4Mlx1NTA1Q1wiLFxuICAgIHJlc3VtZTogXCJcdTdFRTdcdTdFRURcIixcbiAgICByZXNldDogXCJcdTkxQ0RcdTdGNkVcIixcbiAgICBzZXR0aW5nczogXCJcdThCQkVcdTdGNkVcIixcbiAgICBoZWxwOiBcIlx1NUUyRVx1NTJBOVwiLFxuICAgIGFib3V0OiBcIlx1NTE3M1x1NEU4RVwiLFxuICAgIGxhbmd1YWdlOiBcIlx1OEJFRFx1OEEwMFwiLFxuICAgIGxvYWRpbmc6IFwiXHU1MkEwXHU4RjdEXHU0RTJELi4uXCIsXG4gICAgZXJyb3I6IFwiXHU5NTE5XHU4QkVGXCIsXG4gICAgc3VjY2VzczogXCJcdTYyMTBcdTUyOUZcIixcbiAgICB3YXJuaW5nOiBcIlx1OEI2Nlx1NTQ0QVwiLFxuICAgIGluZm86IFwiXHU0RkUxXHU2MDZGXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIlx1OEJFRFx1OEEwMFx1NURGMlx1NTIwN1x1NjM2Mlx1NEUzQSB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBcdTVCODhcdTYyQTRcdTZBMjFcdTU3NTdcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4MUVBXHU1MkE4XHU1Qjg4XHU2MkE0XCIsXG4gICAgaW5pdEJvdDogXCJcdTUyMURcdTU5Q0JcdTUzMTZcdTVCODhcdTYyQTRcdTY3M0FcdTU2NjhcdTRFQkFcIixcbiAgICBzZWxlY3RBcmVhOiBcIlx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIlx1NjM1NVx1ODNCN1x1NTMzQVx1NTdERlwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJcdTVGMDBcdTU5Q0JcdTVCODhcdTYyQTRcIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJcdTUwNUNcdTZCNjJcdTVCODhcdTYyQTRcIixcbiAgICB1cHBlckxlZnQ6IFwiXHU1REU2XHU0RTBBXHU4OUQyXCIsXG4gICAgbG93ZXJSaWdodDogXCJcdTUzRjNcdTRFMEJcdTg5RDJcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiXHU1M0Q3XHU0RkREXHU2MkE0XHU1MENGXHU3RDIwXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIlx1NjhDMFx1NkQ0Qlx1NTIzMFx1NzY4NFx1NTNEOFx1NTMxNlwiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlx1NEZFRVx1NTkwRFx1NzY4NFx1NTBDRlx1N0QyMFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFx1NjhDMFx1NjdFNVx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1OTg5Q1x1ODI3Mlx1RkYwQ1x1OEJGN1x1NTcyOFx1N0Y1MVx1N0FEOVx1NEUwQVx1NjI1M1x1NUYwMFx1OEMwM1x1ODI3Mlx1Njc3Rlx1MzAwMlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTc5Q0RcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzJcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgXHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU2MjEwXHU1MjlGXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBcdTVCODhcdTYyQTRcdTY3M0FcdTU2NjhcdTRFQkFcdTUyMURcdTU5Q0JcdTUzMTZcdTU5MzFcdThEMjVcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBcdTU3NTBcdTY4MDdcdTY1RTBcdTY1NDhcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgXHU1MzNBXHU1N0RGXHU2NUUwXHU2NTQ4XHVGRjBDXHU1REU2XHU0RTBBXHU4OUQyXHU1RkM1XHU5ODdCXHU1QzBGXHU0RThFXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTUzM0FcdTU3REZcdThGQzdcdTU5Mjc6IHtzaXplfSBcdTUwQ0ZcdTdEMjAgKFx1NjcwMFx1NTkyNzoge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggXHU2MzU1XHU4M0I3XHU1Qjg4XHU2MkE0XHU1MzNBXHU1N0RGXHU0RTJELi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdTYzNTVcdTgzQjdcdTYyMTBcdTUyOUY6IHtjb3VudH0gXHU1MENGXHU3RDIwXHU1M0Q3XHU0RkREXHU2MkE0XCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBcdTYzNTVcdTgzQjdcdTUzM0FcdTU3REZcdTUxRkFcdTk1MTk6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1NjM1NVx1ODNCN1x1NEUwMFx1NEUyQVx1NUI4OFx1NjJBNFx1NTMzQVx1NTdERlwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVCODhcdTYyQTRcdTVERjJcdTU0MkZcdTUyQTggLSBcdTUzM0FcdTU3REZcdTc2RDFcdTYzQTdcdTRFMkRcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHU1Qjg4XHU2MkE0XHU1REYyXHU1MDVDXHU2QjYyXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdTVCODlcdTUxNjggLSBcdTY3MkFcdTY4QzBcdTZENEJcdTUyMzBcdTUzRDhcdTUzMTZcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IFx1NjhDMFx1NkQ0Qlx1NTIzMCB7Y291bnR9IFx1NEUyQVx1NTNEOFx1NTMxNlwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgXHU2QjYzXHU1NzI4XHU0RkVFXHU1OTBEIHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBcdTVERjJcdTYyMTBcdTUyOUZcdTRGRUVcdTU5MEQge2NvdW50fSBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgXHU0RkVFXHU1OTBEXHU1MUZBXHU5NTE5OiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBcdTZCMjFcdTY1NzBcdTRFMERcdThEQjNcdUZGMENcdTY1RTBcdTZDRDVcdTRGRUVcdTU5MERcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjhDMFx1NjdFNVx1NTMzQVx1NTdERlx1NTNEOFx1NTMxNi4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIFx1NjhDMFx1NjdFNVx1NTFGQVx1OTUxOToge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVCODhcdTYyQTRcdTRFMkQgLSBcdTUzM0FcdTU3REZcdTUzRDdcdTRGRERcdTYyQTRcIixcbiAgICBsYXN0Q2hlY2s6IFwiXHU0RTBBXHU2QjIxXHU2OEMwXHU2N0U1OiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiXHU0RTBCXHU2QjIxXHU2OEMwXHU2N0U1OiB7dGltZX0gXHU3OUQyXHU1NDBFXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHU2QjYzXHU1NzI4XHU4MUVBXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTgxRUFcdTUyQThcdTU0MkZcdTUyQThcdTYyMTBcdTUyOUZcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHU2NUUwXHU2Q0Q1XHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHVGRjBDXHU4QkY3XHU2MjRCXHU1MkE4XHU2NENEXHU0RjVDXHUzMDAyXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyQThcdTUyMURcdTU5Q0JcdTUzMTZcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1NURGMlx1NjhDMFx1NkQ0Qlx1NTIzMFx1OEMwM1x1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2NDFDXHU3RDIyXHU4QzAzXHU4MjcyXHU2NzdGLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHU2QjYzXHU1NzI4XHU3MEI5XHU1MUZCXHU3RUQ4XHU1MjM2XHU2MzA5XHU5NEFFLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU3RUQ4XHU1MjM2XHU2MzA5XHU5NEFFXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTk3MDBcdTg5ODFcdTRGRERcdTYyQTRcdTUzM0FcdTU3REZcdTc2ODRcdTVERTZcdTRFMEFcdTg5RDJcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBcdTczQjBcdTU3MjhcdTU3MjhcdTUzRjNcdTRFMEJcdTg5RDJcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTkwMDlcdTYyRTlcdTVERTZcdTRFMEFcdTg5RDIuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDA5XHU2MkU5XHU1M0YzXHU0RTBCXHU4OUQyLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1ODNCN1x1NURFNlx1NEUwQVx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgXHU1REYyXHU2MzU1XHU4M0I3XHU1M0YzXHU0RTBCXHU4OUQyOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgXHU5MDA5XHU2MkU5XHU4RDg1XHU2NUY2XCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIFx1OTAwOVx1NjJFOVx1NTFGQVx1OTUxOVx1RkYwQ1x1OEJGN1x1OTFDRFx1OEJENVwiLFxuICAgIGxvZ1dpbmRvdzogJ1x1RDgzRFx1RENDQiBMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1NjVFNVx1NUZEN1x1N0E5N1x1NTNFMycsXG4gICAgZG93bmxvYWRMb2dzOiAnXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3JyxcbiAgICBjbGVhckxvZ3M6ICdcdTZFMDVcdTk2NjRcdTY1RTVcdTVGRDcnLFxuICAgIGNsb3NlTG9nczogJ1x1NTE3M1x1OTVFRCdcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgemhIYW50ID0ge1xuICAvLyBcdTU1NTNcdTUyRDVcdTU2NjhcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBcdTgxRUFcdTUyRDVcdTZBNUZcdTU2NjhcdTRFQkEnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIFx1ODFFQVx1NTJENVx1OEZCMlx1NTgzNCcsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IFx1ODFFQVx1NTJENVx1N0U2QVx1NTcxNicsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIFx1ODFFQVx1NTJENVx1NUI4OFx1OEI3NycsXG4gICAgc2VsZWN0aW9uOiAnXHU5MDc4XHU2NEM3JyxcbiAgICB1c2VyOiAnXHU3NTI4XHU2MjM3JyxcbiAgICBjaGFyZ2VzOiAnXHU2QjIxXHU2NTc4JyxcbiAgICBiYWNrZW5kOiAnXHU1RjhDXHU3QUVGJyxcbiAgICBkYXRhYmFzZTogJ1x1NjU3OFx1NjREQVx1NUVBQicsXG4gICAgdXB0aW1lOiAnXHU5MDRCXHU4ODRDXHU2NjQyXHU5NTkzJyxcbiAgICBjbG9zZTogJ1x1OTVEQ1x1OTU4OScsXG4gICAgbGF1bmNoOiAnXHU1NTUzXHU1MkQ1JyxcbiAgICBsb2FkaW5nOiAnXHU1MkEwXHU4RjA5XHU0RTJEXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdcdTU3RjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnXHU2QjYzXHU1NzI4XHU0RTBCXHU4RjA5XHU4MTczXHU2NzJDXHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdcdTkwNzhcdTY0QzdcdTRFMDBcdTUwMEJcdTZBNUZcdTU2NjhcdTRFQkFcdTRFMjZcdTlFREVcdTY0Q0FcdTU1NTNcdTUyRDUnLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdcdTZFOTZcdTUwOTlcdTU1NTNcdTUyRDUnLFxuICAgIGxvYWRFcnJvcjogJ1x1NTJBMFx1OEYwOVx1OTMyRlx1OEFBNCcsXG4gICAgbG9hZEVycm9yTXNnOiAnXHU3MTIxXHU2Q0Q1XHU1MkEwXHU4RjA5XHU2MjQwXHU5MDc4XHU2QTVGXHU1NjY4XHU0RUJBXHUzMDAyXHU4QUNCXHU2QUEyXHU2N0U1XHU3REIyXHU3RDYxXHU5MDIzXHU2M0E1XHU2MjE2XHU5MUNEXHU4QTY2XHUzMDAyJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBcdTZBQTJcdTY3RTVcdTRFMkQuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBcdTU3MjhcdTdEREEnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgXHU5NkUyXHU3RERBJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBcdTZCNjNcdTVFMzgnLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IFx1OTMyRlx1OEFBNCcsXG4gICAgdW5rbm93bjogJy0nLFxuICAgIGxvZ1dpbmRvdzogJ1x1RDgzRFx1RENDQiBMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1NjVFNVx1OEE4Q1x1ODk5Nlx1N0E5NycsXG4gICAgZG93bmxvYWRMb2dzOiAnXHU0RTBCXHU4RjA5XHU2NUU1XHU4QThDJyxcbiAgICBjbGVhckxvZ3M6ICdcdTZFMDVcdTk2NjRcdTY1RTVcdThBOEMnLFxuICAgIGNsb3NlTG9nczogJ1x1OTVEQ1x1OTU4OSdcbiAgfSxcblxuICAvLyBcdTdFNkFcdTU3MTZcdTZBMjFcdTU4NEFcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2XCIsXG4gICAgaW5pdEJvdDogXCJcdTUyMURcdTU5Q0JcdTUzMTZcdTgxRUFcdTUyRDVcdTZBNUZcdTU2NjhcdTRFQkFcIixcbiAgICB1cGxvYWRJbWFnZTogXCJcdTRFMEFcdTUwQjNcdTU3MTZcdTcyNDdcIixcbiAgICByZXNpemVJbWFnZTogXCJcdThBQkZcdTY1NzRcdTU3MTZcdTcyNDdcdTU5MjdcdTVDMEZcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwNzhcdTY0QzdcdTRGNERcdTdGNkVcIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlx1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRFwiLFxuICAgIHN0b3BQYWludGluZzogXCJcdTUwNUNcdTZCNjJcdTdFNkFcdTg4RkRcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiXHU0RkREXHU1QjU4XHU5MDMyXHU1RUE2XCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIlx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBcdTZBQTJcdTY3RTVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdThBQ0JcdTU3MjhcdTdEQjJcdTdBRDlcdTRFMEFcdTYyNTNcdTk1OEJcdThBQkZcdTgyNzJcdTY3N0ZcdTVGOENcdTkxQ0RcdThBNjZcdUZGMDFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3QTJFXHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBcdTZCNjNcdTU3MjhcdTUyQTBcdThGMDlcdTU3MTZcdTcyNDcuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgXHU1NzE2XHU3MjQ3XHU1REYyXHU1MkEwXHU4RjA5XHVGRjBDXHU2NzA5XHU2NTQ4XHU1MENGXHU3RDIwIHtjb3VudH0gXHU1MDBCXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgXHU1NzE2XHU3MjQ3XHU1MkEwXHU4RjA5XHU1OTMxXHU2NTU3XCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdThBQ0JcdTU3MjhcdTRGNjBcdTYwRjNcdTk1OEJcdTU5Q0JcdTdFNkFcdTg4RkRcdTc2ODRcdTU3MzBcdTY1QjlcdTU4NTdcdTdCMkNcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdUZGMDFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NTg1N1x1NTNDM1x1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTRGNERcdTdGNkVcdThBMkRcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1NEY0RFx1N0Y2RVx1OTA3OFx1NjRDN1x1OEQ4NVx1NjY0MlwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFx1NURGMlx1NkFBMlx1NkUyQ1x1NTIzMFx1NEY0RFx1N0Y2RVx1RkYwQ1x1ODY1NVx1NzQwNlx1NEUyRC4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIFx1NEY0RFx1N0Y2RVx1NkFBMlx1NkUyQ1x1NTkzMVx1NjU1N1x1RkYwQ1x1OEFDQlx1OTFDRFx1OEE2NlwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IFx1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRC4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFx1OTAzMlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBcdTZDOTJcdTY3MDlcdTZCMjFcdTY1NzhcdTMwMDJcdTdCNDlcdTVGODUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTc1MjhcdTYyMzdcdTVERjJcdTUwNUNcdTZCNjJcdTdFNkFcdTg4RkRcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBcdTdFNkFcdTg4RkRcdTVCOENcdTYyMTBcdUZGMDFcdTUxNzFcdTdFNkFcdTg4RkQge2NvdW50fSBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTMwMDJcIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBcdTdFNkFcdTg4RkRcdTkwNEVcdTdBMEJcdTRFMkRcdTUxRkFcdTkzMkZcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTUyQTBcdThGMDlcdTU3MTZcdTcyNDdcdTRFMjZcdTkwNzhcdTY0QzdcdTRGNERcdTdGNkVcIixcbiAgICBwcm9ncmVzczogXCJcdTkwMzJcdTVFQTZcIixcbiAgICB1c2VyTmFtZTogXCJcdTc1MjhcdTYyMzdcIixcbiAgICBwaXhlbHM6IFwiXHU1MENGXHU3RDIwXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzhcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlx1OTgxMFx1OEEwOFx1NjY0Mlx1OTU5M1wiLFxuICAgIGluaXRNZXNzYWdlOiBcIlx1OUVERVx1NjRDQVx1MjAxQ1x1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQVx1MjAxRFx1OTU4Qlx1NTlDQlwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IFx1NTcxNlx1NzI0N1x1NURGMlx1OEFCRlx1NjU3NFx1NzBCQSB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFx1N0U2QVx1ODhGRFx1NjZBQlx1NTA1Q1x1NjVCQ1x1NEY0RFx1N0Y2RSBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1NkJDRlx1NjI3OVx1NTBDRlx1N0QyMFx1NjU3OFwiLFxuICAgIGJhdGNoU2l6ZTogXCJcdTYyNzlcdTZCMjFcdTU5MjdcdTVDMEZcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlx1NEUwQlx1NkIyMVx1NjI3OVx1NkIyMVx1NjY0Mlx1OTU5M1wiLFxuICAgIHVzZUFsbENoYXJnZXM6IFwiXHU0RjdGXHU3NTI4XHU2MjQwXHU2NzA5XHU1M0VGXHU3NTI4XHU2QjIxXHU2NTc4XCIsXG4gICAgc2hvd092ZXJsYXk6IFwiXHU5ODZGXHU3OTNBXHU4OTg2XHU4NENCXHU1QzY0XCIsXG4gICAgbWF4Q2hhcmdlczogXCJcdTZCQ0ZcdTYyNzlcdTY3MDBcdTU5MjdcdTZCMjFcdTY1NzhcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTc4OiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlx1NTI2OVx1OTkxOFx1NjY0Mlx1OTU5M1wiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1IHt0aW1lfSBcdTVGOENcdTdFN0NcdTdFOEMuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBcdTkwMzJcdTVFQTZcdTVERjJcdTRGRERcdTVCNThcdTcwQkEge2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBcdTVERjJcdTUyQTBcdThGMDlcdTkwMzJcdTVFQTY6IHtwYWludGVkfS97dG90YWx9IFx1NTBDRlx1N0QyMFx1NURGMlx1N0U2QVx1ODhGRFwiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBcdTUyQTBcdThGMDlcdTkwMzJcdTVFQTZcdTU5MzFcdTY1NTc6IHtlcnJvcn1cIixcbiBcbiAgICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIFx1NEZERFx1NUI1OFx1OTAzMlx1NUVBNlx1NTkzMVx1NjU1Nzoge2Vycm9yfVwiLFxuXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTU3MjhcdTUwNUNcdTZCNjJcdTRFNEJcdTUyNERcdTg5ODFcdTRGRERcdTVCNThcdTc1NzZcdTUyNERcdTkwMzJcdTVFQTZcdTU1Q0VcdUZGMUZcIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiXHU2NTNFXHU2OEM0XCIsXG4gICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgIG1pbmltaXplOiBcIlx1NjcwMFx1NUMwRlx1NTMxNlwiLFxuICAgIHdpZHRoOiBcIlx1NUJFQ1x1NUVBNlwiLFxuICAgIGhlaWdodDogXCJcdTlBRDhcdTVFQTZcIixcbiAgICBrZWVwQXNwZWN0OiBcIlx1NEZERFx1NjMwMVx1N0UzMVx1NkE2Qlx1NkJENFwiLFxuICAgIGFwcGx5OiBcIlx1NjFDOVx1NzUyOFwiLFxuICAgIG92ZXJsYXlPbjogXCJcdTg5ODZcdTg0Q0JcdTVDNjQ6IFx1OTU4Qlx1NTU1M1wiLFxuICAgIG92ZXJsYXlPZmY6IFwiXHU4OTg2XHU4NENCXHU1QzY0OiBcdTk1RENcdTk1ODlcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBcdTYyNzlcdTZCMjFcdTVCOENcdTYyMTA6IFx1NURGMlx1N0U2QVx1ODhGRCB7cGFpbnRlZH0gXHU1MENGXHU3RDIwIHwgXHU5MDMyXHU1RUE2OiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzhcdTYwNjJcdTVGQTk6IHtjdXJyZW50fS97bmVlZGVkfSAtIFx1NjY0Mlx1OTU5Mzoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3ODoge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU1MjY5XHU5OTE4OiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTZCNjNcdTU3MjhcdTgxRUFcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1NjIxMFx1NTI5RlwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTcxMjFcdTZDRDVcdTgxRUFcdTUyRDVcdTU1NTNcdTUyRDVcdUZGMENcdThBQ0JcdTYyNEJcdTUyRDVcdTY0Q0RcdTRGNUNcdTMwMDJcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1NURGMlx1NkFBMlx1NkUyQ1x1NTIzMFx1OEFCRlx1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2NDFDXHU3RDIyXHU4QUJGXHU4MjcyXHU2NzdGLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHU2QjYzXHU1NzI4XHU5RURFXHU2NENBXHU3RTZBXHU4OEZEXHU2MzA5XHU5MjE1Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU3RTZBXHU4OEZEXHU2MzA5XHU5MjE1XCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTZcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFx1OTFDRFx1OEE2NiB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfVx1RkYwQ1x1N0I0OVx1NUY4NSB7ZGVsYXl9IFx1NzlEMi4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IFx1N0IyQyB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBcdTZCMjFcdTU2MTdcdThBNjZcdTUxRkFcdTkzMkZcdUZGMENcdTVDMDdcdTU3Mjgge2RlbGF5fSBcdTc5RDJcdTVGOENcdTkxQ0RcdThBNjYuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHU4RDg1XHU5MDRFIHttYXhBdHRlbXB0c30gXHU2QjIxXHU1NjE3XHU4QTY2XHU1OTMxXHU2NTU3XHUzMDAyXHU3RTdDXHU3RThDXHU0RTBCXHU0RTAwXHU2Mjc5Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBcdTdEQjJcdTdENjFcdTkzMkZcdThBQTRcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgXHU2NzBEXHU1MkQ5XHU1NjY4XHU5MzJGXHU4QUE0XHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QTY2Li4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBcdTRGM0FcdTY3MERcdTU2NjhcdTkwM0VcdTY2NDJcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIixcbiAgICAvLyB2Mi4wIC0gXHU0RkREXHU4Qjc3XHU4MjA3XHU3RTZBXHU4OEZEXHU2QTIxXHU1RjBGXG4gICAgcHJvdGVjdGlvbkVuYWJsZWQ6IFwiXHU1REYyXHU1NTVGXHU3NTI4XHU0RkREXHU4Qjc3XCIsXG4gICAgcHJvdGVjdGlvbkRpc2FibGVkOiBcIlx1NURGMlx1NTA1Q1x1NzUyOFx1NEZERFx1OEI3N1wiLFxuICAgIHBhaW50UGF0dGVybjogXCJcdTdFNkFcdTg4RkRcdTZBMjFcdTVGMEZcIixcbiAgICBwYXR0ZXJuTGluZWFyU3RhcnQ6IFwiXHU3RERBXHU2MDI3XHVGRjA4XHU4RDc3XHU5RURFXHVGRjA5XCIsXG4gICAgcGF0dGVybkxpbmVhckVuZDogXCJcdTdEREFcdTYwMjdcdUZGMDhcdTdENDJcdTlFREVcdUZGMDlcIixcbiAgICBwYXR0ZXJuUmFuZG9tOiBcIlx1OTZBOFx1NkE1RlwiLFxuICAgIHBhdHRlcm5DZW50ZXJPdXQ6IFwiXHU3NTMxXHU0RTJEXHU1RkMzXHU1NDExXHU1OTE2XCIsXG4gICAgcGF0dGVybkNvcm5lcnNGaXJzdDogXCJcdTUxNDhcdTg5RDJcdTg0M0RcIixcbiAgICBwYXR0ZXJuU3BpcmFsOiBcIlx1ODdCQVx1NjVDQlwiLFxuICAgIHNvbGlkOiBcIlx1NUJFNlx1NUZDM1wiLFxuICAgIHN0cmlwZXM6IFwiXHU2ODlEXHU3RDBCXCIsXG4gICAgY2hlY2tlcmJvYXJkOiBcIlx1NjhDQlx1NzZFNFx1NjgzQ1wiLFxuICAgIGdyYWRpZW50OiBcIlx1NkYzOFx1NUM2NFwiLFxuICAgIGRvdHM6IFwiXHU5RURFXHU3MkMwXCIsXG4gICAgd2F2ZXM6IFwiXHU2Q0UyXHU2RDZBXCIsXG4gICAgc3BpcmFsOiBcIlx1ODdCQVx1NjVDQlwiLFxuICAgIG1vc2FpYzogXCJcdTk5QUNcdThDRkRcdTUxNEJcIixcbiAgICBicmlja3M6IFwiXHU3OERBXHU1ODRBXCIsXG4gICAgemlnemFnOiBcIlx1NEU0Qlx1NUI1N1x1NUY2MlwiLFxuICAgIHByb3RlY3RpbmdEcmF3aW5nOiBcIlx1NkI2M1x1NTcyOFx1NEZERFx1OEI3N1x1N0U2QVx1NTcxNi4uLlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTggXHU1MDc1XHU2RTJDXHU1MjMwIHtjb3VudH0gXHU4NjU1XHU4QjhBXHU2NkY0XCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REQyNyBcdTZCNjNcdTU3MjhcdTRGRUVcdTVGQTkge2NvdW50fSBcdTUwMEJcdThCOEFcdTY2RjRcdTc2ODRcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICByZXBhaXJDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1NEZFRVx1NUZBOVx1NUI4Q1x1NjIxMFx1RkYxQXtjb3VudH0gXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgbm9DaGFyZ2VzRm9yUmVwYWlyOiBcIlx1MjZBMSBcdTRGRUVcdTVGQTlcdTRFMERcdTZEODhcdTgwMTdcdTlFREVcdTY1NzhcdUZGMENcdTdCNDlcdTVGODVcdTRFMkQuLi5cIixcbiAgICBwcm90ZWN0aW9uUHJpb3JpdHk6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NURGMlx1NTU1Rlx1NzUyOFx1NEZERFx1OEI3N1x1NTEyQVx1NTE0OFwiLFxuICAgIHBhdHRlcm5BcHBsaWVkOiBcIlx1NURGMlx1NTk1N1x1NzUyOFx1NkEyMVx1NUYwRlwiLFxuICAgIGN1c3RvbVBhdHRlcm46IFwiXHU4MUVBXHU4QTAyXHU2QTIxXHU1RjBGXCIsXG4gICAgbG9nV2luZG93OiAnXHVEODNEXHVEQ0NCIExvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHU2NUU1XHU4QThDXHU4OTk2XHU3QTk3JyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTRFMEJcdThGMDlcdTY1RTVcdThBOEMnLFxuICAgIGNsZWFyTG9nczogJ1x1NkUwNVx1OTY2NFx1NjVFNVx1OEE4QycsXG4gICAgY2xvc2VMb2dzOiAnXHU5NURDXHU5NTg5J1xuICB9LFxuXG4gIC8vIFx1OEZCMlx1NTgzNFx1NkEyMVx1NTg0QVx1RkYwOFx1NUY4NVx1NUJFNlx1NzNGRVx1RkYwOVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1OEZCMlx1NTgzNFx1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHN0YXJ0OiBcIlx1OTU4Qlx1NTlDQlwiLFxuICAgIHN0b3A6IFwiXHU1MDVDXHU2QjYyXCIsXG4gICAgc3RvcHBlZDogXCJcdTZBNUZcdTU2NjhcdTRFQkFcdTVERjJcdTUwNUNcdTZCNjJcIixcbiAgICBjYWxpYnJhdGU6IFwiXHU2ODIxXHU2RTk2XCIsXG4gICAgcGFpbnRPbmNlOiBcIlx1NEUwMFx1NkIyMVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlx1NkFBMlx1NjdFNVx1NzJDMFx1NjE0Qlx1NEUyRC4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiXHU5MTREXHU3RjZFXCIsXG4gICAgZGVsYXk6IFwiXHU1RUY2XHU5MDcyIChcdTZCRUJcdTc5RDIpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXCIsXG4gICAgbWluQ2hhcmdlczogXCJcdTY3MDBcdTVDMTFcdTZCMjFcdTY1NzhcIixcbiAgICBjb2xvck1vZGU6IFwiXHU5ODRGXHU4MjcyXHU2QTIxXHU1RjBGXCIsXG4gICAgcmFuZG9tOiBcIlx1OTZBOFx1NkE1RlwiLFxuICAgIGZpeGVkOiBcIlx1NTZGQVx1NUI5QVwiLFxuICAgIHJhbmdlOiBcIlx1N0JDNFx1NTcwRFwiLFxuICAgIGZpeGVkQ29sb3I6IFwiXHU1NkZBXHU1QjlBXHU5ODRGXHU4MjcyXCIsXG4gICAgYWR2YW5jZWQ6IFwiXHU5QUQ4XHU3RDFBXCIsXG4gICAgdGlsZVg6IFwiXHU3NEU2XHU3MjQ3IFhcIixcbiAgICB0aWxlWTogXCJcdTc0RTZcdTcyNDcgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiXHU4MUVBXHU1QjlBXHU3RkE5XHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiXHU0RjhCXHU1OTgyOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiXHU2MzU1XHU3MzcyXCIsXG4gICAgcGFpbnRlZDogXCJcdTVERjJcdTdFNkFcdTg4RkRcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIHJldHJpZXM6IFwiXHU5MUNEXHU4QTY2XCIsXG4gICAgdGlsZTogXCJcdTc0RTZcdTcyNDdcIixcbiAgICBjb25maWdTYXZlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTRGRERcdTVCNThcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU1MkEwXHU4RjA5XCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU5MUNEXHU3RjZFXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJcdThBQ0JcdTYyNEJcdTUyRDVcdTdFNkFcdTg4RkRcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTRFRTVcdTYzNTVcdTczNzJcdTVFQTdcdTZBMTkuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIlx1NUY4Q1x1N0FFRlx1NTcyOFx1N0REQVwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIlx1NUY4Q1x1N0FFRlx1OTZFMlx1N0REQVwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIlx1NkI2M1x1NTcyOFx1NTU1M1x1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQS4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIlx1NkI2M1x1NTcyOFx1NTA1Q1x1NkI2Mlx1NkE1Rlx1NTY2OFx1NEVCQS4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIlx1NjgyMVx1NkU5Nlx1NEUyRC4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIlx1ODFFQVx1NTJENVx1OEZCMlx1NTgzNFx1NURGMlx1NTcyOFx1OTA0Qlx1ODg0Q1x1MzAwMlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2XHU2QjYzXHU1NzI4XHU5MDRCXHU4ODRDXHVGRjBDXHU4QUNCXHU1MTQ4XHU5NURDXHU5NTg5XHU1MThEXHU1NTUzXHU1MkQ1XHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0XHUzMDAyXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU1NzMwXHU1NzE2XHU3Njg0XHU3QTdBXHU3NjdEXHU1MzQwXHU1N0RGXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXHU0RUU1XHU4QTJEXHU3RjZFXHU4RkIyXHU1ODM0XHU1MzQwXHU1N0RGXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTRGNjBcdTU4NTdcdTUzQzNcdTgwMDNcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU4QTJEXHU3RjZFXHU2MjEwXHU1MjlGXHVGRjAxXHU1MzRBXHU1RjkxOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU1MzQwXHU1N0RGXHU5MDc4XHU2NEM3XHU4RDg1XHU2NjQyXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcdUZGMDhcdTRGN0ZcdTc1MjhcdTIwMUNcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcdTIwMURcdTYzMDlcdTkyMTVcdUZGMDlcIixcbiAgICBmYXJtUmFkaXVzOiBcIlx1OEZCMlx1NTgzNFx1NTM0QVx1NUY5MVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJcdTc1NzZcdTUyNERcdTUzNDBcdTU3REZcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIFx1NkI2M1x1NTcyOFx1NEVFNVx1NTM0QVx1NUY5MSB7cmFkaXVzfXB4IFx1NTcyOCAoe3h9LHt5fSkgXHU4RkIyXHU1ODM0XCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBcdTkxQ0RcdTg5ODE6IFx1OEFDQlx1OTA3OFx1NjRDN1x1N0E3QVx1NzY3RFx1NTM0MFx1NTdERlx1NEVFNVx1OTA3Rlx1NTE0RFx1ODg1RFx1N0E4MVwiLFxuICAgIG5vUG9zaXRpb246IFwiXHU2NzJBXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgY3VycmVudFpvbmU6IFwiXHU1MzQwXHU1N0RGOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFx1OEFDQlx1NTE0OFx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1RkYwQ1x1NTcyOFx1NTczMFx1NTcxNlx1NEUwQVx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1NEVFNVx1OEEyRFx1N0Y2RVx1OEZCMlx1NTgzNFx1NTM0MFx1NTdERlwiLFxuICAgIGxvZ1dpbmRvdzogJ1x1RDgzRFx1RENDQiBMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1NjVFNVx1OEE4Q1x1ODk5Nlx1N0E5NycsXG4gICAgZG93bmxvYWRMb2dzOiAnXHU0RTBCXHU4RjA5XHU2NUU1XHU4QThDJyxcbiAgICBjbGVhckxvZ3M6ICdcdTZFMDVcdTk2NjRcdTY1RTVcdThBOEMnLFxuICAgIGNsb3NlTG9nczogJ1x1OTVEQ1x1OTU4OSdcbiAgfSxcblxuICAvLyBcdTUxNkNcdTUxNzFcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1NjYyRlwiLFxuICAgIG5vOiBcIlx1NTQyNlwiLFxuICAgIG9rOiBcIlx1NzhCQVx1OEE4RFwiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBjbG9zZTogXCJcdTk1RENcdTk1ODlcIixcbiAgICBzYXZlOiBcIlx1NEZERFx1NUI1OFwiLFxuICAgIGxvYWQ6IFwiXHU1MkEwXHU4RjA5XCIsXG4gICAgZGVsZXRlOiBcIlx1NTIyQVx1OTY2NFwiLFxuICAgIGVkaXQ6IFwiXHU3REU4XHU4RjJGXCIsXG4gICAgc3RhcnQ6IFwiXHU5NThCXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBwYXVzZTogXCJcdTY2QUJcdTUwNUNcIixcbiAgICByZXN1bWU6IFwiXHU3RTdDXHU3RThDXCIsXG4gICAgcmVzZXQ6IFwiXHU5MUNEXHU3RjZFXCIsXG4gICAgc2V0dGluZ3M6IFwiXHU4QTJEXHU3RjZFXCIsXG4gICAgaGVscDogXCJcdTVFNkJcdTUyQTlcIixcbiAgICBhYm91dDogXCJcdTk1RENcdTY1QkNcIixcbiAgICBsYW5ndWFnZTogXCJcdThBOUVcdThBMDBcIixcbiAgICBsb2FkaW5nOiBcIlx1NTJBMFx1OEYwOVx1NEUyRC4uLlwiLFxuICAgIGVycm9yOiBcIlx1OTMyRlx1OEFBNFwiLFxuICAgIHN1Y2Nlc3M6IFwiXHU2MjEwXHU1MjlGXCIsXG4gICAgd2FybmluZzogXCJcdThCNjZcdTU0NEFcIixcbiAgICBpbmZvOiBcIlx1NEZFMVx1NjA2RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdThBOUVcdThBMDBcdTVERjJcdTUyMDdcdTYzREJcdTcwQkEge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gXHU1Qjg4XHU4Qjc3XHU2QTIxXHU1ODRBXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJENVx1NUI4OFx1OEI3N1wiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU1Qjg4XHU4Qjc3XHU2QTVGXHU1NjY4XHU0RUJBXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBjYXB0dXJlQXJlYTogXCJcdTYzNTVcdTczNzJcdTUzNDBcdTU3REZcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHU5NThCXHU1OUNCXHU1Qjg4XHU4Qjc3XCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHU1MDVDXHU2QjYyXHU1Qjg4XHU4Qjc3XCIsXG4gICAgdXBwZXJMZWZ0OiBcIlx1NURFNlx1NEUwQVx1ODlEMlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1NTNEN1x1NEZERFx1OEI3N1x1NTBDRlx1N0QyMFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTZBQTJcdTZFMkNcdTUyMzBcdTc2ODRcdThCOEFcdTUzMTZcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJcdTRGRUVcdTVGQTlcdTc2ODRcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTZBQTJcdTY3RTVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTk4NEZcdTgyNzJcdUZGMENcdThBQ0JcdTU3MjhcdTdEQjJcdTdBRDlcdTRFMEFcdTYyNTNcdTk1OEJcdThBQkZcdTgyNzJcdTY3N0ZcdTMwMDJcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3QTJFXHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NjIxMFx1NTI5RlwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHU1Qjg4XHU4Qjc3XHU2QTVGXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU1OTMxXHU2NTU3XCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgXHU1RUE3XHU2QTE5XHU3MTIxXHU2NTQ4XCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1NTM0MFx1NTdERlx1NzEyMVx1NjU0OFx1RkYwQ1x1NURFNlx1NEUwQVx1ODlEMlx1NUZDNVx1OTgwOFx1NUMwRlx1NjVCQ1x1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHU1MzQwXHU1N0RGXHU5MDRFXHU1OTI3OiB7c2l6ZX0gXHU1MENGXHU3RDIwIChcdTY3MDBcdTU5Mjc6IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IFx1NjM1NVx1NzM3Mlx1NUI4OFx1OEI3N1x1NTM0MFx1NTdERlx1NEUyRC4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU2MzU1XHU3MzcyXHU2MjEwXHU1MjlGOiB7Y291bnR9IFx1NTBDRlx1N0QyMFx1NTNEN1x1NEZERFx1OEI3N1wiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHU2MzU1XHU3MzcyXHU1MzQwXHU1N0RGXHU1MUZBXHU5MzJGOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTYzNTVcdTczNzJcdTRFMDBcdTUwMEJcdTVCODhcdThCNzdcdTUzNDBcdTU3REZcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU4Qjc3XHU1REYyXHU1NTUzXHU1MkQ1IC0gXHU1MzQwXHU1N0RGXHU3NkUzXHU2M0E3XHU0RTJEXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NUI4OFx1OEI3N1x1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU1Qjg5XHU1MTY4IC0gXHU2NzJBXHU2QUEyXHU2RTJDXHU1MjMwXHU4QjhBXHU1MzE2XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTZBQTJcdTZFMkNcdTUyMzAge2NvdW50fSBcdTUwMEJcdThCOEFcdTUzMTZcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1NkI2M1x1NTcyOFx1NEZFRVx1NUZBOSB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHU1REYyXHU2MjEwXHU1MjlGXHU0RkVFXHU1RkE5IHtjb3VudH0gXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIFx1NEZFRVx1NUZBOVx1NTFGQVx1OTMyRjoge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHU2QjIxXHU2NTc4XHU0RTBEXHU4REIzXHVGRjBDXHU3MTIxXHU2Q0Q1XHU0RkVFXHU1RkE5XCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTZBQTJcdTY3RTVcdTUzNDBcdTU3REZcdThCOEFcdTUzMTYuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTZBQTJcdTY3RTVcdTUxRkFcdTkzMkY6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU4Qjc3XHU0RTJEIC0gXHU1MzQwXHU1N0RGXHU1M0Q3XHU0RkREXHU4Qjc3XCIsXG4gICAgbGFzdENoZWNrOiBcIlx1NEUwQVx1NkIyMVx1NkFBMlx1NjdFNToge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1NEUwQlx1NkIyMVx1NkFBMlx1NjdFNToge3RpbWV9IFx1NzlEMlx1NUY4Q1wiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkQ1XHU1NTUzXHU1MkQ1XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NzEyMVx1NkNENVx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1RkYwQ1x1OEFDQlx1NjI0Qlx1NTJENVx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkQ1XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTZBQTJcdTZFMkNcdTUyMzBcdThBQkZcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEFCRlx1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1OUVERVx1NjRDQVx1N0U2QVx1ODhGRFx1NjMwOVx1OTIxNS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0U2QVx1ODhGRFx1NjMwOVx1OTIxNVwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU5NzAwXHU4OTgxXHU0RkREXHU4Qjc3XHU1MzQwXHU1N0RGXHU3Njg0XHU1REU2XHU0RTBBXHU4OUQyXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHU3M0ZFXHU1NzI4XHU1NzI4XHU1M0YzXHU0RTBCXHU4OUQyXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDc4XHU2NEM3XHU1REU2XHU0RTBBXHU4OUQyLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTA3OFx1NjRDN1x1NTNGM1x1NEUwQlx1ODlEMi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTczNzJcdTVERTZcdTRFMEFcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1NzM3Mlx1NTNGM1x1NEUwQlx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1OTA3OFx1NjRDN1x1OEQ4NVx1NjY0MlwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTkwNzhcdTY0QzdcdTUxRkFcdTkzMkZcdUZGMENcdThBQ0JcdTkxQ0RcdThBNjZcIixcbiAgICBsb2dXaW5kb3c6ICdcdUQ4M0RcdURDQ0IgTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTY1RTVcdThBOENcdTg5OTZcdTdBOTcnLFxuICAgIGRvd25sb2FkTG9nczogJ1x1NEUwQlx1OEYwOVx1NjVFNVx1OEE4QycsXG4gICAgY2xlYXJMb2dzOiAnXHU2RTA1XHU5NjY0XHU2NUU1XHU4QThDJyxcbiAgICBjbG9zZUxvZ3M6ICdcdTk1RENcdTk1ODknXG4gIH1cbn07IiwgImltcG9ydCB7IGVzIH0gZnJvbSAnLi9lcy5qcyc7XG5pbXBvcnQgeyBlbiB9IGZyb20gJy4vZW4uanMnO1xuaW1wb3J0IHsgZnIgfSBmcm9tICcuL2ZyLmpzJztcbmltcG9ydCB7IHJ1IH0gZnJvbSAnLi9ydS5qcyc7XG5pbXBvcnQgeyB6aEhhbnMgfSBmcm9tICcuL3poLUhhbnMuanMnO1xuaW1wb3J0IHsgemhIYW50IH0gZnJvbSAnLi96aC1IYW50LmpzJztcblxuLy8gSWRpb21hcyBkaXNwb25pYmxlc1xuZXhwb3J0IGNvbnN0IEFWQUlMQUJMRV9MQU5HVUFHRVMgPSB7XG4gIGVzOiB7IG5hbWU6ICdFc3BhXHUwMEYxb2wnLCBmbGFnOiAnXHVEODNDXHVEREVBXHVEODNDXHVEREY4JywgY29kZTogJ2VzJyB9LFxuICBlbjogeyBuYW1lOiAnRW5nbGlzaCcsIGZsYWc6ICdcdUQ4M0NcdURERkFcdUQ4M0NcdURERjgnLCBjb2RlOiAnZW4nIH0sXG4gIGZyOiB7IG5hbWU6ICdGcmFuXHUwMEU3YWlzJywgZmxhZzogJ1x1RDgzQ1x1RERFQlx1RDgzQ1x1RERGNycsIGNvZGU6ICdmcicgfSxcbiAgcnU6IHsgbmFtZTogJ1x1MDQyMFx1MDQ0M1x1MDQ0MVx1MDQ0MVx1MDQzQVx1MDQzOFx1MDQzOScsIGZsYWc6ICdcdUQ4M0NcdURERjdcdUQ4M0NcdURERkEnLCBjb2RlOiAncnUnIH0sXG4gIHpoSGFuczogeyBuYW1lOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JywgZmxhZzogJ1x1RDgzQ1x1RERFOFx1RDgzQ1x1RERGMycsIGNvZGU6ICd6aC1IYW5zJyB9LFxuICB6aEhhbnQ6IHsgbmFtZTogJ1x1N0U0MVx1OUFENFx1NEUyRFx1NjU4NycsIGZsYWc6ICdcdUQ4M0NcdURERThcdUQ4M0NcdURERjMnLCBjb2RlOiAnemgtSGFudCcgfVxufTtcblxuLy8gVG9kYXMgbGFzIHRyYWR1Y2Npb25lc1xuY29uc3QgdHJhbnNsYXRpb25zID0ge1xuICBlcyxcbiAgZW4sXG4gIGZyLFxuICBydSxcbiAgemhIYW5zLFxuICB6aEhhbnRcbn07XG5cbi8vIEVzdGFkbyBkZWwgaWRpb21hIGFjdHVhbFxubGV0IGN1cnJlbnRMYW5ndWFnZSA9ICdlcyc7XG5sZXQgY3VycmVudFRyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9uc1tjdXJyZW50TGFuZ3VhZ2VdO1xuXG4vKipcbiAqIERldGVjdGEgZWwgaWRpb21hIGRlbCBuYXZlZ2Fkb3JcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENcdTAwRjNkaWdvIGRlbCBpZGlvbWEgZGV0ZWN0YWRvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RCcm93c2VyTGFuZ3VhZ2UoKSB7XG4gIGNvbnN0IGJyb3dzZXJMYW5nID0gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLnVzZXJMYW5ndWFnZSB8fCAnZXMnO1xuXG4gIC8vIEV4dHJhZXIgc29sbyBlbCBjXHUwMEYzZGlnbyBkZWwgaWRpb21hIChlajogJ2VzLUVTJyAtPiAnZXMnKVxuICBjb25zdCBsYW5nQ29kZSA9IGJyb3dzZXJMYW5nLnNwbGl0KCctJylbMF0udG9Mb3dlckNhc2UoKTtcblxuICAvLyBWZXJpZmljYXIgc2kgdGVuZW1vcyBzb3BvcnRlIHBhcmEgZXN0ZSBpZGlvbWFcbiAgaWYgKHRyYW5zbGF0aW9uc1tsYW5nQ29kZV0pIHtcbiAgICByZXR1cm4gbGFuZ0NvZGU7XG4gIH1cblxuICAvLyBGYWxsYmFjayBhIGVzcGFcdTAwRjFvbCBwb3IgZGVmZWN0b1xuICByZXR1cm4gJ2VzJztcbn1cblxuLyoqXG4gKiBPYnRpZW5lIGVsIGlkaW9tYSBndWFyZGFkbyAoZGVzaGFiaWxpdGFkbyAtIG5vIHVzYXIgbG9jYWxTdG9yYWdlKVxuICogQHJldHVybnMge3N0cmluZ30gU2llbXByZSByZXRvcm5hIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNhdmVkTGFuZ3VhZ2UoKSB7XG4gIC8vIE5vIHVzYXIgbG9jYWxTdG9yYWdlIC0gc2llbXByZSByZXRvcm5hciBudWxsXG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEd1YXJkYSBlbCBpZGlvbWEgKGRlc2hhYmlsaXRhZG8gLSBubyB1c2FyIGxvY2FsU3RvcmFnZSlcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nQ29kZSAtIENcdTAwRjNkaWdvIGRlbCBpZGlvbWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdmVMYW5ndWFnZShsYW5nQ29kZSkge1xuICAvLyBObyBndWFyZGFyIGVuIGxvY2FsU3RvcmFnZSAtIGZ1bmNpXHUwMEYzbiBkZXNoYWJpbGl0YWRhXG4gIHJldHVybjtcbn1cblxuLyoqXG4gKiBJbmljaWFsaXphIGVsIHNpc3RlbWEgZGUgaWRpb21hc1xuICogQHJldHVybnMge3N0cmluZ30gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYSBpbmljaWFsaXphZG9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVMYW5ndWFnZSgpIHtcbiAgLy8gUHJpb3JpZGFkOiBndWFyZGFkbyA+IG5hdmVnYWRvciA+IGVzcGFcdTAwRjFvbFxuICBjb25zdCBzYXZlZExhbmcgPSBnZXRTYXZlZExhbmd1YWdlKCk7XG4gIGNvbnN0IGJyb3dzZXJMYW5nID0gZGV0ZWN0QnJvd3Nlckxhbmd1YWdlKCk7XG5cbiAgbGV0IHNlbGVjdGVkTGFuZyA9ICdlcyc7IC8vIGZhbGxiYWNrIHBvciBkZWZlY3RvXG5cbiAgaWYgKHNhdmVkTGFuZyAmJiB0cmFuc2xhdGlvbnNbc2F2ZWRMYW5nXSkge1xuICAgIHNlbGVjdGVkTGFuZyA9IHNhdmVkTGFuZztcbiAgfSBlbHNlIGlmIChicm93c2VyTGFuZyAmJiB0cmFuc2xhdGlvbnNbYnJvd3NlckxhbmddKSB7XG4gICAgc2VsZWN0ZWRMYW5nID0gYnJvd3Nlckxhbmc7XG4gIH1cblxuICBzZXRMYW5ndWFnZShzZWxlY3RlZExhbmcpO1xuICByZXR1cm4gc2VsZWN0ZWRMYW5nO1xufVxuXG4vKipcbiAqIENhbWJpYSBlbCBpZGlvbWEgYWN0dWFsXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ0NvZGUgLSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRMYW5ndWFnZShsYW5nQ29kZSkge1xuICBpZiAoIXRyYW5zbGF0aW9uc1tsYW5nQ29kZV0pIHtcbiAgICBjb25zb2xlLndhcm4oYElkaW9tYSAnJHtsYW5nQ29kZX0nIG5vIGRpc3BvbmlibGUuIFVzYW5kbyAnJHtjdXJyZW50TGFuZ3VhZ2V9J2ApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGN1cnJlbnRMYW5ndWFnZSA9IGxhbmdDb2RlO1xuICBjdXJyZW50VHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zW2xhbmdDb2RlXTtcbiAgc2F2ZUxhbmd1YWdlKGxhbmdDb2RlKTtcblxuICAvLyBFbWl0aXIgZXZlbnRvIHBlcnNvbmFsaXphZG8gcGFyYSBxdWUgbG9zIG1cdTAwRjNkdWxvcyBwdWVkYW4gcmVhY2Npb25hclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkN1c3RvbUV2ZW50KSB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5DdXN0b21FdmVudCgnbGFuZ3VhZ2VDaGFuZ2VkJywge1xuICAgICAgZGV0YWlsOiB7IGxhbmd1YWdlOiBsYW5nQ29kZSwgdHJhbnNsYXRpb25zOiBjdXJyZW50VHJhbnNsYXRpb25zIH1cbiAgICB9KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBPYnRpZW5lIGVsIGlkaW9tYSBhY3R1YWxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENcdTAwRjNkaWdvIGRlbCBpZGlvbWEgYWN0dWFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50TGFuZ3VhZ2UoKSB7XG4gIHJldHVybiBjdXJyZW50TGFuZ3VhZ2U7XG59XG5cbi8qKlxuICogT2J0aWVuZSBsYXMgdHJhZHVjY2lvbmVzIGFjdHVhbGVzXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBPYmpldG8gY29uIHRvZGFzIGxhcyB0cmFkdWNjaW9uZXMgZGVsIGlkaW9tYSBhY3R1YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRUcmFuc2xhdGlvbnMoKSB7XG4gIHJldHVybiBjdXJyZW50VHJhbnNsYXRpb25zO1xufVxuXG4vKipcbiAqIE9idGllbmUgdW4gdGV4dG8gdHJhZHVjaWRvIHVzYW5kbyBub3RhY2lcdTAwRjNuIGRlIHB1bnRvXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gQ2xhdmUgZGVsIHRleHRvIChlajogJ2ltYWdlLnRpdGxlJywgJ2NvbW1vbi5jYW5jZWwnKVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAtIFBhclx1MDBFMW1ldHJvcyBwYXJhIGludGVycG9sYWNpXHUwMEYzbiAoZWo6IHtjb3VudDogNX0pXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZXh0byB0cmFkdWNpZG9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHQoa2V5LCBwYXJhbXMgPSB7fSkge1xuICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KCcuJyk7XG4gIGxldCB2YWx1ZSA9IGN1cnJlbnRUcmFuc2xhdGlvbnM7XG5cbiAgLy8gTmF2ZWdhciBwb3IgbGEgZXN0cnVjdHVyYSBkZSBvYmpldG9zXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgayBpbiB2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZVtrXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKGBDbGF2ZSBkZSB0cmFkdWNjaVx1MDBGM24gbm8gZW5jb250cmFkYTogJyR7a2V5fSdgKTtcbiAgICAgIHJldHVybiBrZXk7IC8vIFJldG9ybmFyIGxhIGNsYXZlIGNvbW8gZmFsbGJhY2tcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIGNvbnNvbGUud2FybihgQ2xhdmUgZGUgdHJhZHVjY2lcdTAwRjNuIG5vIGVzIHN0cmluZzogJyR7a2V5fSdgKTtcbiAgICByZXR1cm4ga2V5O1xuICB9XG5cbiAgLy8gSW50ZXJwb2xhciBwYXJcdTAwRTFtZXRyb3NcbiAgcmV0dXJuIGludGVycG9sYXRlKHZhbHVlLCBwYXJhbXMpO1xufVxuXG4vKipcbiAqIEludGVycG9sYSBwYXJcdTAwRTFtZXRyb3MgZW4gdW4gc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRleHRvIGNvbiBtYXJjYWRvcmVzIHtrZXl9XG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zIC0gUGFyXHUwMEUxbWV0cm9zIGEgaW50ZXJwb2xhclxuICogQHJldHVybnMge3N0cmluZ30gVGV4dG8gY29uIHBhclx1MDBFMW1ldHJvcyBpbnRlcnBvbGFkb3NcbiAqL1xuZnVuY3Rpb24gaW50ZXJwb2xhdGUodGV4dCwgcGFyYW1zKSB7XG4gIGlmICghcGFyYW1zIHx8IE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHsoXFx3KylcXH0vZywgKG1hdGNoLCBrZXkpID0+IHtcbiAgICByZXR1cm4gcGFyYW1zW2tleV0gIT09IHVuZGVmaW5lZCA/IHBhcmFtc1trZXldIDogbWF0Y2g7XG4gIH0pO1xufVxuXG4vKipcbiAqIE9idGllbmUgdHJhZHVjY2lvbmVzIGRlIHVuYSBzZWNjaVx1MDBGM24gZXNwZWNcdTAwRURmaWNhXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbiAtIFNlY2NpXHUwMEYzbiAoZWo6ICdpbWFnZScsICdsYXVuY2hlcicsICdjb21tb24nKVxuICogQHJldHVybnMge29iamVjdH0gT2JqZXRvIGNvbiBsYXMgdHJhZHVjY2lvbmVzIGRlIGxhIHNlY2NpXHUwMEYzblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VjdGlvbihzZWN0aW9uKSB7XG4gIGlmIChjdXJyZW50VHJhbnNsYXRpb25zW3NlY3Rpb25dKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGlvbnNbc2VjdGlvbl07XG4gIH1cblxuICBjb25zb2xlLndhcm4oYFNlY2NpXHUwMEYzbiBkZSB0cmFkdWNjaVx1MDBGM24gbm8gZW5jb250cmFkYTogJyR7c2VjdGlvbn0nYCk7XG4gIHJldHVybiB7fTtcbn1cblxuLyoqXG4gKiBWZXJpZmljYSBzaSB1biBpZGlvbWEgZXN0XHUwMEUxIGRpc3BvbmlibGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nQ29kZSAtIENcdTAwRjNkaWdvIGRlbCBpZGlvbWFcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIHNpIGVzdFx1MDBFMSBkaXNwb25pYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xhbmd1YWdlQXZhaWxhYmxlKGxhbmdDb2RlKSB7XG4gIHJldHVybiAhIXRyYW5zbGF0aW9uc1tsYW5nQ29kZV07XG59XG5cbi8vIEluaWNpYWxpemFyIGF1dG9tXHUwMEUxdGljYW1lbnRlIGFsIGNhcmdhciBlbCBtXHUwMEYzZHVsb1xuaW5pdGlhbGl6ZUxhbmd1YWdlKCk7XG4iLCAiaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vY29yZS9sb2dnZXIuanMnO1xuXG4vKiBnbG9iYWwgQmxvYiwgVVJMICovXG5cbi8qKlxuICogVmVudGFuYSBkZSBsb2dzIHVuaWZpY2FkYSBwYXJhIHRvZG9zIGxvcyBib3RzXG4gKiBDYXJhY3Rlclx1MDBFRHN0aWNhczpcbiAqIC0gTXVlc3RyYSBsb2dzIGVuIHRpZW1wbyByZWFsXG4gKiAtIFJlZGltZW5zaW9uYWJsZSBtZWRpYW50ZSBhcnJhc3RyZVxuICogLSBDb250cm9sZXMgcGFyYSBjZXJyYXIgeSBkZXNjYXJnYXIgbG9nc1xuICogLSBQZXJzaXN0ZW5jaWEgZGVsIGVzdGFkbyBlbnRyZSBzZXNpb25lc1xuICogLSBJbnRlZ3JhY2lcdTAwRjNuIGNvbiB0b2RvcyBsb3MgYm90c1xuICovXG5cbmNsYXNzIExvZ1dpbmRvdyB7XG4gIGNvbnN0cnVjdG9yKGJvdE5hbWUgPSAnQm90Jykge1xuICAgIHRoaXMuYm90TmFtZSA9IGJvdE5hbWU7XG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmxvZ3MgPSBbXTtcbiAgICB0aGlzLm1heExvZ3MgPSAxMDAwOyAvLyBMXHUwMEVEbWl0ZSBkZSBsb2dzIHBhcmEgZXZpdGFyIHByb2JsZW1hcyBkZSBtZW1vcmlhXG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMubG9nQ29udGVudCA9IG51bGw7XG4gICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZXNpemVIYW5kbGUgPSBudWxsO1xuICAgIHRoaXMub3JpZ2luYWxDb25zb2xlID0ge307XG4gICAgXG4gICAgLy8gQ29uZmlndXJhY2lcdTAwRjNuIHBvciBkZWZlY3RvXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICB3aWR0aDogNjAwLFxuICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICB4OiB3aW5kb3cuaW5uZXJXaWR0aCAtIDYyMCxcbiAgICAgIHk6IDIwLFxuICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICB9O1xuICAgIFxuICAgIHRoaXMubG9hZENvbmZpZygpO1xuICAgIHRoaXMuY3JlYXRlV2luZG93KCk7XG4gICAgdGhpcy5zZXR1cExvZ0ludGVyY2VwdGlvbigpO1xuICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcmdhIGxhIGNvbmZpZ3VyYWNpXHUwMEYzbiBndWFyZGFkYSBkZWwgbG9jYWxTdG9yYWdlXG4gICAqL1xuICBsb2FkQ29uZmlnKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGB3cGxhY2UtbG9nLXdpbmRvdy0ke3RoaXMuYm90TmFtZX1gKTtcbiAgICAgIGlmIChzYXZlZCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgLi4udGhpcy5jb25maWcsIC4uLkpTT04ucGFyc2Uoc2F2ZWQpIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnRXJyb3IgY2FyZ2FuZG8gY29uZmlndXJhY2lcdTAwRjNuIGRlIHZlbnRhbmEgZGUgbG9nczonLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEd1YXJkYSBsYSBjb25maWd1cmFjaVx1MDBGM24gYWN0dWFsIGVuIGxvY2FsU3RvcmFnZVxuICAgKi9cbiAgc2F2ZUNvbmZpZygpIHtcbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHdwbGFjZS1sb2ctd2luZG93LSR7dGhpcy5ib3ROYW1lfWAsIEpTT04uc3RyaW5naWZ5KHRoaXMuY29uZmlnKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnRXJyb3IgZ3VhcmRhbmRvIGNvbmZpZ3VyYWNpXHUwMEYzbiBkZSB2ZW50YW5hIGRlIGxvZ3M6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhIGxhIGVzdHJ1Y3R1cmEgSFRNTCBkZSBsYSB2ZW50YW5hXG4gICAqL1xuICBjcmVhdGVXaW5kb3coKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUgPSAnd3BsYWNlLWxvZy13aW5kb3cnO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICBsZWZ0OiAke3RoaXMuY29uZmlnLnh9cHg7XG4gICAgICB0b3A6ICR7dGhpcy5jb25maWcueX1weDtcbiAgICAgIHdpZHRoOiAke3RoaXMuY29uZmlnLndpZHRofXB4O1xuICAgICAgaGVpZ2h0OiAke3RoaXMuY29uZmlnLmhlaWdodH1weDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC45KTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIHotaW5kZXg6IDEwMDAwMTtcbiAgICAgIGRpc3BsYXk6ICR7dGhpcy5jb25maWcudmlzaWJsZSA/ICdmbGV4JyA6ICdub25lJ307XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpO1xuICAgICAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gICAgICBmb250LWZhbWlseTogJ0NvbnNvbGFzJywgJ01vbmFjbycsICdDb3VyaWVyIE5ldycsIG1vbm9zcGFjZTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgcmVzaXplOiBub25lO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBgO1xuXG4gICAgLy8gSGVhZGVyIGNvbiB0XHUwMEVEdHVsbyB5IGNvbnRyb2xlc1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlYWRlci5jbGFzc05hbWUgPSAnbG9nLXdpbmRvdy1oZWFkZXInO1xuICAgIGhlYWRlci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDdweCA3cHggMCAwO1xuICAgIGA7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gYFx1RDgzRFx1RENDQiBMb2dzIC0gJHt0aGlzLmJvdE5hbWV9YDtcbiAgICB0aXRsZS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogI2UyZThmMDtcbiAgICBgO1xuXG4gICAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250cm9scy5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogOHB4O1xuICAgIGA7XG5cbiAgICAvLyBCb3RcdTAwRjNuIGRlIGRlc2NhcmdhXG4gICAgY29uc3QgZG93bmxvYWRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkb3dubG9hZEJ0bi5pbm5lckhUTUwgPSAnXHVEODNEXHVEQ0JFJztcbiAgICBkb3dubG9hZEJ0bi50aXRsZSA9ICdEZXNjYXJnYXIgbG9ncyc7XG4gICAgZG93bmxvYWRCdG4uc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMzQsIDE5NywgOTQsIDAuOCk7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XG4gICAgYDtcbiAgICBkb3dubG9hZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgZG93bmxvYWRCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDM0LCAxOTcsIDk0LCAxKSc7XG4gICAgfSk7XG4gICAgZG93bmxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGRvd25sb2FkQnRuLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgzNCwgMTk3LCA5NCwgMC44KSc7XG4gICAgfSk7XG4gICAgZG93bmxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmRvd25sb2FkTG9ncygpKTtcblxuICAgIC8vIEJvdFx1MDBGM24gZGUgY2VycmFyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnXHUyNzE1JztcbiAgICBjbG9zZUJ0bi50aXRsZSA9ICdDZXJyYXIgdmVudGFuYSc7XG4gICAgY2xvc2VCdG4uc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjM5LCA2OCwgNjgsIDAuOCk7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XG4gICAgYDtcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgY2xvc2VCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDIzOSwgNjgsIDY4LCAxKSc7XG4gICAgfSk7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGNsb3NlQnRuLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyMzksIDY4LCA2OCwgMC44KSc7XG4gICAgfSk7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG5cbiAgICBjb250cm9scy5hcHBlbmRDaGlsZChkb3dubG9hZEJ0bik7XG4gICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNvbnRyb2xzKTtcblxuICAgIC8vIENvbnRlbmlkbyBkZSBsb2dzXG4gICAgdGhpcy5sb2dDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5sb2dDb250ZW50LmNsYXNzTmFtZSA9ICdsb2ctd2luZG93LWNvbnRlbnQnO1xuICAgIHRoaXMubG9nQ29udGVudC5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgZmxleDogMTtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgICBgO1xuXG4gICAgLy8gSGFuZGxlIGRlIHJlZGltZW5zaW9uYW1pZW50b1xuICAgIHRoaXMucmVzaXplSGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZXNpemVIYW5kbGUuY2xhc3NOYW1lID0gJ2xvZy13aW5kb3ctcmVzaXplLWhhbmRsZSc7XG4gICAgdGhpcy5yZXNpemVIYW5kbGUuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICBjdXJzb3I6IHNlLXJlc2l6ZTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgtNDVkZWcsIHRyYW5zcGFyZW50IDMwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjMpIDMwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjMpIDcwJSwgdHJhbnNwYXJlbnQgNzAlKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAgMCA4cHggMDtcbiAgICBgO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxvZ0NvbnRlbnQpO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVzaXplSGFuZGxlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgIC8vIENvbmZpZ3VyYXIgYXJyYXN0cmUgZGUgdmVudGFuYVxuICAgIHRoaXMuc2V0dXBEcmFnZ2luZyhoZWFkZXIpO1xuICAgIC8vIENvbmZpZ3VyYXIgcmVkaW1lbnNpb25hbWllbnRvXG4gICAgdGhpcy5zZXR1cFJlc2l6aW5nKCk7XG5cbiAgICB0aGlzLmlzVmlzaWJsZSA9IHRoaXMuY29uZmlnLnZpc2libGU7XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJhIGVsIGFycmFzdHJlIGRlIGxhIHZlbnRhbmFcbiAgICovXG4gIHNldHVwRHJhZ2dpbmcoaGVhZGVyKSB7XG4gICAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBsZXQgZHJhZ09mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuXG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0JVVFRPTicpIHJldHVybjtcbiAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgZHJhZ09mZnNldC54ID0gZS5jbGllbnRYIC0gdGhpcy5jb250YWluZXIub2Zmc2V0TGVmdDtcbiAgICAgIGRyYWdPZmZzZXQueSA9IGUuY2xpZW50WSAtIHRoaXMuY29udGFpbmVyLm9mZnNldFRvcDtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZURyYWcpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BEcmFnKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZURyYWcgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFpc0RyYWdnaW5nKSByZXR1cm47XG4gICAgICBjb25zdCBuZXdYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4od2luZG93LmlubmVyV2lkdGggLSB0aGlzLmNvbnRhaW5lci5vZmZzZXRXaWR0aCwgZS5jbGllbnRYIC0gZHJhZ09mZnNldC54KSk7XG4gICAgICBjb25zdCBuZXdZID0gTWF0aC5tYXgoMCwgTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0LCBlLmNsaWVudFkgLSBkcmFnT2Zmc2V0LnkpKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBuZXdYICsgJ3B4JztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IG5ld1kgKyAncHgnO1xuICAgICAgdGhpcy5jb25maWcueCA9IG5ld1g7XG4gICAgICB0aGlzLmNvbmZpZy55ID0gbmV3WTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RvcERyYWcgPSAoKSA9PiB7XG4gICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVEcmFnKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRHJhZyk7XG4gICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyYSBlbCByZWRpbWVuc2lvbmFtaWVudG8gZGUgbGEgdmVudGFuYVxuICAgKi9cbiAgc2V0dXBSZXNpemluZygpIHtcbiAgICBsZXQgaXNSZXNpemluZyA9IGZhbHNlO1xuICAgIGxldCBzdGFydFgsIHN0YXJ0WSwgc3RhcnRXaWR0aCwgc3RhcnRIZWlnaHQ7XG5cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICAgaXNSZXNpemluZyA9IHRydWU7XG4gICAgICBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgICBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgICBzdGFydFdpZHRoID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRhaW5lcikud2lkdGgsIDEwKTtcbiAgICAgIHN0YXJ0SGVpZ2h0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRhaW5lcikuaGVpZ2h0LCAxMCk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVSZXNpemUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BSZXNpemUpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKGUpID0+IHtcbiAgICAgIGlmICghaXNSZXNpemluZykgcmV0dXJuO1xuICAgICAgY29uc3QgbmV3V2lkdGggPSBNYXRoLm1heCgzMDAsIHN0YXJ0V2lkdGggKyBlLmNsaWVudFggLSBzdGFydFgpO1xuICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gTWF0aC5tYXgoMjAwLCBzdGFydEhlaWdodCArIGUuY2xpZW50WSAtIHN0YXJ0WSk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IG5ld1dpZHRoICsgJ3B4JztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArICdweCc7XG4gICAgICB0aGlzLmNvbmZpZy53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgdGhpcy5jb25maWcuaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgIH07XG5cbiAgICBjb25zdCBzdG9wUmVzaXplID0gKCkgPT4ge1xuICAgICAgaXNSZXNpemluZyA9IGZhbHNlO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlUmVzaXplKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wUmVzaXplKTtcbiAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJhIGxhIGludGVyY2VwdGFjaVx1MDBGM24gZGUgbG9ncyBkZSBjb25zb2xhXG4gICAqL1xuICBzZXR1cExvZ0ludGVyY2VwdGlvbigpIHtcbiAgICAvLyBHdWFyZGFyIHJlZmVyZW5jaWFzIG9yaWdpbmFsZXNcbiAgICB0aGlzLm9yaWdpbmFsQ29uc29sZSA9IHtcbiAgICAgIGxvZzogY29uc29sZS5sb2csXG4gICAgICBpbmZvOiBjb25zb2xlLmluZm8sXG4gICAgICB3YXJuOiBjb25zb2xlLndhcm4sXG4gICAgICBlcnJvcjogY29uc29sZS5lcnJvcixcbiAgICAgIGRlYnVnOiBjb25zb2xlLmRlYnVnXG4gICAgfTtcblxuICAgIC8vIEludGVyY2VwdGFyIGNvbnNvbGUubG9nXG4gICAgY29uc29sZS5sb2cgPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgdGhpcy5hZGRMb2coJ2xvZycsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvLyBJbnRlcmNlcHRhciBjb25zb2xlLmluZm9cbiAgICBjb25zb2xlLmluZm8gPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAgIHRoaXMuYWRkTG9nKCdpbmZvJywgYXJncyk7XG4gICAgfTtcblxuICAgIC8vIEludGVyY2VwdGFyIGNvbnNvbGUud2FyblxuICAgIGNvbnNvbGUud2FybiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgdGhpcy5hZGRMb2coJ3dhcm4nLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgLy8gSW50ZXJjZXB0YXIgY29uc29sZS5lcnJvclxuICAgIGNvbnNvbGUuZXJyb3IgPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICB0aGlzLmFkZExvZygnZXJyb3InLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgLy8gSW50ZXJjZXB0YXIgY29uc29sZS5kZWJ1Z1xuICAgIGNvbnNvbGUuZGVidWcgPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICB0aGlzLmFkZExvZygnZGVidWcnLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFcdTAwRjFhZGUgdW4gbG9nIGEgbGEgdmVudGFuYVxuICAgKi9cbiAgYWRkTG9nKHR5cGUsIGFyZ3MpIHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBhcmdzLm1hcChhcmcgPT4gXG4gICAgICB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGFyZywgbnVsbCwgMikgOiBTdHJpbmcoYXJnKVxuICAgICkuam9pbignICcpO1xuXG4gICAgY29uc3QgbG9nRW50cnkgPSB7XG4gICAgICB0aW1lc3RhbXAsXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHJhdzogYXJnc1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ3MucHVzaChsb2dFbnRyeSk7XG5cbiAgICAvLyBMaW1pdGFyIG5cdTAwRkFtZXJvIGRlIGxvZ3NcbiAgICBpZiAodGhpcy5sb2dzLmxlbmd0aCA+IHRoaXMubWF4TG9ncykge1xuICAgICAgdGhpcy5sb2dzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgLy8gQWN0dWFsaXphciBVSSBzaSBlc3RcdTAwRTEgdmlzaWJsZVxuICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgdGhpcy51cGRhdGVMb2dEaXNwbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGl6YSBsYSB2aXN1YWxpemFjaVx1MDBGM24gZGUgbG9nc1xuICAgKi9cbiAgdXBkYXRlTG9nRGlzcGxheSgpIHtcbiAgICBpZiAoIXRoaXMubG9nQ29udGVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbG9nSHRtbCA9IHRoaXMubG9ncy5tYXAoZW50cnkgPT4ge1xuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmdldExvZ0NvbG9yKGVudHJ5LnR5cGUpO1xuICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7Y29sb3J9OyBtYXJnaW4tYm90dG9tOiAycHg7XCI+WyR7ZW50cnkudGltZXN0YW1wfV0gJHtlbnRyeS5tZXNzYWdlfTwvZGl2PmA7XG4gICAgfSkuam9pbignJyk7XG5cbiAgICB0aGlzLmxvZ0NvbnRlbnQuaW5uZXJIVE1MID0gbG9nSHRtbDtcbiAgICBcbiAgICAvLyBBdXRvLXNjcm9sbCBhbCBmaW5hbFxuICAgIHRoaXMubG9nQ29udGVudC5zY3JvbGxUb3AgPSB0aGlzLmxvZ0NvbnRlbnQuc2Nyb2xsSGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIE9idGllbmUgZWwgY29sb3IgcGFyYSBjYWRhIHRpcG8gZGUgbG9nXG4gICAqL1xuICBnZXRMb2dDb2xvcih0eXBlKSB7XG4gICAgY29uc3QgY29sb3JzID0ge1xuICAgICAgbG9nOiAnI2UyZThmMCcsXG4gICAgICBpbmZvOiAnIzYwYTVmYScsXG4gICAgICB3YXJuOiAnI2ZiYmYyNCcsXG4gICAgICBlcnJvcjogJyNmODcxNzEnLFxuICAgICAgZGVidWc6ICcjYTc4YmZhJ1xuICAgIH07XG4gICAgcmV0dXJuIGNvbG9yc1t0eXBlXSB8fCBjb2xvcnMubG9nO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NhcmdhIGxvcyBsb2dzIGNvbW8gYXJjaGl2b1xuICAgKi9cbiAgZG93bmxvYWRMb2dzKCkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgY29uc3QgdGltZVN0ciA9IG5vdy50b1RpbWVTdHJpbmcoKS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoLzovZywgJy0nKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGBsb2dfJHt0aGlzLmJvdE5hbWV9XyR7ZGF0ZVN0cn1fJHt0aW1lU3RyfS5sb2dgO1xuXG4gICAgY29uc3QgbG9nVGV4dCA9IHRoaXMubG9ncy5tYXAoZW50cnkgPT4gXG4gICAgICBgWyR7ZW50cnkudGltZXN0YW1wfV0gWyR7ZW50cnkudHlwZS50b1VwcGVyQ2FzZSgpfV0gJHtlbnRyeS5tZXNzYWdlfWBcbiAgICApLmpvaW4oJ1xcbicpO1xuXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtsb2dUZXh0XSwgeyB0eXBlOiAndGV4dC9wbGFpbicgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG5cbiAgICBsb2coYFx1RDgzRFx1RENFNSBMb2dzIGRlc2NhcmdhZG9zIGNvbW86ICR7ZmlsZW5hbWV9YCk7XG4gIH1cblxuICAvKipcbiAgICogTXVlc3RyYSBsYSB2ZW50YW5hIGRlIGxvZ3NcbiAgICovXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgdGhpcy5jb25maWcudmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLnVwZGF0ZUxvZ0Rpc3BsYXkoKTtcbiAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPY3VsdGEgbGEgdmVudGFuYSBkZSBsb2dzXG4gICAqL1xuICBoaWRlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLmNvbmZpZy52aXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWx0ZXJuYSBsYSB2aXNpYmlsaWRhZCBkZSBsYSB2ZW50YW5hXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpbXBpYSB0b2RvcyBsb3MgbG9nc1xuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5sb2dzID0gW107XG4gICAgaWYgKHRoaXMubG9nQ29udGVudCkge1xuICAgICAgdGhpcy5sb2dDb250ZW50LmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmEgbG9zIGV2ZW50IGxpc3RlbmVycyBnbG9iYWxlc1xuICAgKi9cbiAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBBanVzdGFyIHBvc2ljaVx1MDBGM24gYWwgcmVkaW1lbnNpb25hciB2ZW50YW5hXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBtYXhYID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLmNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgbWF4WSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuY29udGFpbmVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy54ID4gbWF4WCkge1xuICAgICAgICAgIHRoaXMuY29uZmlnLnggPSBNYXRoLm1heCgwLCBtYXhYKTtcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gdGhpcy5jb25maWcueCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy55ID4gbWF4WSkge1xuICAgICAgICAgIHRoaXMuY29uZmlnLnkgPSBNYXRoLm1heCgwLCBtYXhZKTtcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0aGlzLmNvbmZpZy55ICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJ1eWUgbGEgdmVudGFuYSB5IHJlc3RhdXJhIGNvbnNvbGUgb3JpZ2luYWxcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gUmVzdGF1cmFyIGNvbnNvbGUgb3JpZ2luYWxcbiAgICBpZiAodGhpcy5vcmlnaW5hbENvbnNvbGUubG9nKSB7XG4gICAgICBjb25zb2xlLmxvZyA9IHRoaXMub3JpZ2luYWxDb25zb2xlLmxvZztcbiAgICAgIGNvbnNvbGUuaW5mbyA9IHRoaXMub3JpZ2luYWxDb25zb2xlLmluZm87XG4gICAgICBjb25zb2xlLndhcm4gPSB0aGlzLm9yaWdpbmFsQ29uc29sZS53YXJuO1xuICAgICAgY29uc29sZS5lcnJvciA9IHRoaXMub3JpZ2luYWxDb25zb2xlLmVycm9yO1xuICAgICAgY29uc29sZS5kZWJ1ZyA9IHRoaXMub3JpZ2luYWxDb25zb2xlLmRlYnVnO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZXIgdmVudGFuYSBkZWwgRE9NXG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLmxvZ0NvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMubG9ncyA9IFtdO1xuICB9XG59XG5cbi8vIEluc3RhbmNpYSBnbG9iYWwgcGFyYSBnZXN0aW9uYXIgdmVudGFuYXMgZGUgbG9nc1xud2luZG93Ll9fd3BsYWNlTG9nV2luZG93cyA9IHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3MgfHwge307XG5cbi8qKlxuICogQ3JlYSBvIG9idGllbmUgdW5hIHZlbnRhbmEgZGUgbG9ncyBwYXJhIHVuIGJvdCBlc3BlY1x1MDBFRGZpY29cbiAqIEBwYXJhbSB7c3RyaW5nfSBib3ROYW1lIC0gTm9tYnJlIGRlbCBib3RcbiAqIEByZXR1cm5zIHtMb2dXaW5kb3d9IC0gSW5zdGFuY2lhIGRlIGxhIHZlbnRhbmEgZGUgbG9nc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9nV2luZG93KGJvdE5hbWUpIHtcbiAgaWYgKCF3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzW2JvdE5hbWVdKSB7XG4gICAgd2luZG93Ll9fd3BsYWNlTG9nV2luZG93c1tib3ROYW1lXSA9IG5ldyBMb2dXaW5kb3coYm90TmFtZSk7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3NbYm90TmFtZV07XG59XG5cbi8qKlxuICogT2J0aWVuZSBsYSB2ZW50YW5hIGRlIGxvZ3MgZGUgdW4gYm90IGVzcGVjXHUwMEVEZmljb1xuICogQHBhcmFtIHtzdHJpbmd9IGJvdE5hbWUgLSBOb21icmUgZGVsIGJvdFxuICogQHJldHVybnMge0xvZ1dpbmRvd3xudWxsfSAtIEluc3RhbmNpYSBkZSBsYSB2ZW50YW5hIGRlIGxvZ3MgbyBudWxsIHNpIG5vIGV4aXN0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9nV2luZG93KGJvdE5hbWUpIHtcbiAgcmV0dXJuIHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3NbYm90TmFtZV0gfHwgbnVsbDtcbn1cblxuLyoqXG4gKiBEZXN0cnV5ZSBsYSB2ZW50YW5hIGRlIGxvZ3MgZGUgdW4gYm90IGVzcGVjXHUwMEVEZmljb1xuICogQHBhcmFtIHtzdHJpbmd9IGJvdE5hbWUgLSBOb21icmUgZGVsIGJvdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUxvZ1dpbmRvdyhib3ROYW1lKSB7XG4gIGlmICh3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzW2JvdE5hbWVdKSB7XG4gICAgd2luZG93Ll9fd3BsYWNlTG9nV2luZG93c1tib3ROYW1lXS5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3NbYm90TmFtZV07XG4gIH1cbn1cblxuLyoqXG4gKiBEZXN0cnV5ZSB0b2RhcyBsYXMgdmVudGFuYXMgZGUgbG9nc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUFsbExvZ1dpbmRvd3MoKSB7XG4gIE9iamVjdC5rZXlzKHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3MpLmZvckVhY2goYm90TmFtZSA9PiB7XG4gICAgZGVzdHJveUxvZ1dpbmRvdyhib3ROYW1lKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IExvZ1dpbmRvdyB9OyIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IEZBUk1fREVGQVVMVFMsIGZhcm1TdGF0ZSB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IHsgc2F2ZUZhcm1DZmcsIGxvYWRGYXJtQ2ZnLCByZXNldEZhcm1DZmcgfSBmcm9tIFwiLi4vY29yZS9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyBkcmFnSGVhZGVyLCBjbGFtcCB9IGZyb20gXCIuLi9jb3JlL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcIi4uL2xvY2FsZXMvaW5kZXguanNcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ1dpbmRvdyB9IGZyb20gXCIuLi9sb2dfd2luZG93L2luZGV4LmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGYXJtVUkoY29uZmlnLCBvblN0YXJ0LCBvblN0b3ApIHtcbiAgY29uc3Qgc2hhZG93SG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzaGFkb3dIb3N0LmlkID0gJ3dwbGFjZS1mYXJtLXVpJztcbiAgc2hhZG93SG9zdC5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDEwcHg7XG4gICAgcmlnaHQ6IDEwcHg7XG4gICAgei1pbmRleDogMjE0NzQ4MzY0NztcbiAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCAnUm9ib3RvJywgc2Fucy1zZXJpZjtcbiAgYDtcbiAgXG4gIGNvbnN0IHNoYWRvdyA9IHNoYWRvd0hvc3QuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICBcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbiAgICAud3BsYWNlLWNvbnRhaW5lciB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpO1xuICAgICAgYm9yZGVyOiAycHggc29saWQgIzRhNTU2ODtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBwYWRkaW5nOiAxNnB4O1xuICAgICAgbWluLXdpZHRoOiAzMjBweDtcbiAgICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBib3gtc2hhZG93OiAwIDEwcHggMjVweCByZ2JhKDAsMCwwLDAuMyk7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiA4cHg7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpO1xuICAgICAgY3Vyc29yOiBtb3ZlO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1taW5pbWl6ZSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMik7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLW1pbmltaXplOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4zKTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1jb250ZW50IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWNvbnRlbnQubWluaW1pemVkIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utc2VjdGlvbiB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXNlY3Rpb24tdGl0bGUge1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBjb2xvcjogI2UyZThmMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXJvdyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIGdhcDogOHB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWxhYmVsIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBjb2xvcjogI2NiZDVlMDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1pbnB1dCB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMik7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgd2lkdGg6IDgwcHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtaW5wdXQ6Zm9jdXMge1xuICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgIGJvcmRlci1jb2xvcjogIzkwY2RmNDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4xNSk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtaW5wdXQud2lkZSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zZWxlY3Qge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjEpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIHdpZHRoOiAxMDBweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1idXR0b24ge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzQyOTllMSAwJSwgIzMxODJjZSAxMDAlKTtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDhweCAxNnB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIG1hcmdpbjogMnB4O1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG4gICAgICBtaW4td2lkdGg6IDYwcHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMzMTgyY2UgMCUsICMyYzUyODIgMTAwJSk7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uOmFjdGl2ZSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uOmRpc2FibGVkIHtcbiAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uLnN0YXJ0IHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM0OGJiNzggMCUsICMzOGExNjkgMTAwJSk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uLnN0YXJ0OmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMzOGExNjkgMCUsICMyZjg1NWEgMTAwJSk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uLnN0b3Age1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y1NjU2NSAwJSwgI2U1M2UzZSAxMDAlKTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1idXR0b24uc3RvcDpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZTUzZTNlIDAlLCAjYzUzMDMwIDEwMCUpO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWJ1dHRvbi5zZWNvbmRhcnkge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzZiNzI4MCAwJSwgIzRiNTU2MyAxMDAlKTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1idXR0b24uc2Vjb25kYXJ5OmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM0YjU1NjMgMCUsICMzNzQxNTEgMTAwJSk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uLnNtYWxsIHtcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBtaW4td2lkdGg6IDQwcHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utc3RhdHVzIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC4zKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgIG1hcmdpbjogOHB4IDA7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBtaW4taGVpZ2h0OiAyMHB4O1xuICAgICAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zdGF0dXMuc3VjY2VzcyB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDcyLCAxODcsIDEyMCwgMC4yKTtcbiAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzQ4YmI3ODtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zdGF0dXMuZXJyb3Ige1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDEwMSwgMTAxLCAwLjIpO1xuICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjZjU2NTY1O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXN0YXR1cy5zdGF0dXMge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSg2NiwgMTUzLCAyMjUsIDAuMik7XG4gICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICM0Mjk5ZTE7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utc3RhdHMge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnIgMWZyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utc3RhdCB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMik7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBwYWRkaW5nOiA2cHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utc3RhdC12YWx1ZSB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zdGF0LWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgIGNvbG9yOiAjYTBhZWMwO1xuICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWJ1dHRvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogNHB4O1xuICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWFkdmFuY2VkIHtcbiAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICAgIHBhZGRpbmctdG9wOiA4cHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjEpO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXRoZW1lLXByZXZpZXcge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMnB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgbWFyZ2luLXRvcDogNHB4O1xuICAgICAgbWluLWhlaWdodDogMTZweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1jb2xvci1kb3Qge1xuICAgICAgd2lkdGg6IDEycHg7XG4gICAgICBoZWlnaHQ6IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMyk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtaGVhbHRoIHtcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgIGNvbG9yOiAjYTBhZWMwO1xuICAgICAgbWFyZ2luLXRvcDogNHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWhlYWx0aC5vbmxpbmUge1xuICAgICAgY29sb3I6ICM0OGJiNzg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtaGVhbHRoLm9mZmxpbmUge1xuICAgICAgY29sb3I6ICNmNTY1NjU7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utem9uZS1pbmZvIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC4yKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgIG1hcmdpbjogOHB4IDA7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utem9uZS10ZXh0IHtcbiAgICAgIGNvbG9yOiAjZTJlOGYwO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXpvbmUtd2FybmluZyB7XG4gICAgICBjb2xvcjogI2ZmZDcwMDtcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG4gICAgXG4gICAgI3pvbmUtZGlzcGxheSB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIGNvbG9yOiAjOTBjZGY0O1xuICAgIH1cbiAgYDtcbiAgXG4gIHNoYWRvdy5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIFxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9ICd3cGxhY2UtY29udGFpbmVyJztcbiAgXG4gIC8vIEVzdGFkbyBpbnRlcm5vIGRlIGxhIFVJXG4gIGNvbnN0IHVpU3RhdGUgPSB7XG4gICAgbWluaW1pemVkOiBmYWxzZSxcbiAgICBzaG93QWR2YW5jZWQ6IGZhbHNlXG4gIH07XG4gIFxuICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2UtaGVhZGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXRpdGxlXCI+XG4gICAgICAgIFx1RDgzRVx1REQxNiAke3QoJ2Zhcm0udGl0bGUnKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cIndwbGFjZS1taW5pbWl6ZVwiPlx1MjIxMjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2UtY29udGVudFwiPlxuICAgICAgPCEtLSBFc3RhZG8geSBjb250cm9sZXMgcHJpbmNpcGFsZXMgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXNlY3Rpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0dXNcIiBpZD1cInN0YXR1c1wiPlx1RDgzRFx1RENBNCAke3QoJ2Zhcm0uc3RvcHBlZCcpfTwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc3RhdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0LXZhbHVlXCIgaWQ9XCJwYWludGVkLWNvdW50XCI+MDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0LWxhYmVsXCI+JHt0KCdmYXJtLnBhaW50ZWQnKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc3RhdC12YWx1ZVwiIGlkPVwiY2hhcmdlcy1jb3VudFwiPjA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc3RhdC1sYWJlbFwiPiR7dCgnZmFybS5jaGFyZ2VzJyl9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXQtdmFsdWVcIiBpZD1cInJldHJ5LWNvdW50XCI+MDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0LWxhYmVsXCI+JHt0KCdmYXJtLnJldHJpZXMnKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc3RhdC12YWx1ZVwiIGlkPVwidGlsZS1wb3NcIj4wLDA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc3RhdC1sYWJlbFwiPiR7dCgnZmFybS50aWxlJyl9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1idXR0b25zXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIndwbGFjZS1idXR0b24gc3RhcnRcIiBpZD1cInN0YXJ0LWJ0blwiPlx1MjVCNlx1RkUwRiAke3QoJ2Zhcm0uc3RhcnQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwid3BsYWNlLWJ1dHRvbiBzdG9wXCIgaWQ9XCJzdG9wLWJ0blwiIGRpc2FibGVkPlx1MjNGOVx1RkUwRiAke3QoJ2Zhcm0uc3RvcCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ3cGxhY2UtYnV0dG9uIHNtYWxsXCIgaWQ9XCJzZWxlY3QtcG9zaXRpb24tYnRuXCI+XHVEODNDXHVERjBEICR7dCgnZmFybS5zZWxlY3RQb3NpdGlvbicpfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ3cGxhY2UtYnV0dG9uIHNtYWxsXCIgaWQ9XCJvbmNlLWJ0blwiPlx1RDgzQ1x1REZBOCAke3QoJ2Zhcm0ucGFpbnRPbmNlJyl9PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIndwbGFjZS1idXR0b24gc2Vjb25kYXJ5IHNtYWxsXCIgaWQ9XCJsb2ctd2luZG93LWJ0blwiPlx1RDgzRFx1RENDQiAke3QoJ2Zhcm0ubG9nV2luZG93JykgfHwgJ0xvZ3MnfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDwhLS0gSW5mb3JtYWNpXHUwMEYzbiBkZSBsYSB6b25hIHNlbGVjY2lvbmFkYSAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS16b25lLWluZm9cIiBpZD1cInpvbmUtaW5mb1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utem9uZS10ZXh0XCI+XHVEODNEXHVEQ0NEICR7dCgnZmFybS5wb3NpdGlvbkluZm8nKX06IDxzcGFuIGlkPVwiem9uZS1kaXNwbGF5XCI+JHt0KCdmYXJtLm5vUG9zaXRpb24nKX08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS16b25lLXdhcm5pbmdcIj5cdTI2QTBcdUZFMEYgJHt0KCdmYXJtLnNlbGVjdEVtcHR5QXJlYScpfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2UtaGVhbHRoXCIgaWQ9XCJoZWFsdGgtc3RhdHVzXCI+XHVEODNEXHVERDBEICR7dCgnZmFybS5jaGVja2luZ1N0YXR1cycpfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDwhLS0gQ29uZmlndXJhY2lcdTAwRjNuIGJcdTAwRTFzaWNhIC0tPlxuICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zZWN0aW9uXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc2VjdGlvbi10aXRsZVwiPlx1MjY5OVx1RkUwRiAke3QoJ2Zhcm0uY29uZmlndXJhdGlvbicpfTwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1yb3dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIndwbGFjZS1sYWJlbFwiPiR7dCgnZmFybS5kZWxheScpfTo8L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cIndwbGFjZS1pbnB1dFwiIGlkPVwiZGVsYXktaW5wdXRcIiBtaW49XCIxMDAwXCIgbWF4PVwiMzAwMDAwXCIgc3RlcD1cIjEwMDBcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXJvd1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwid3BsYWNlLWxhYmVsXCI+JHt0KCdmYXJtLnBpeGVsc1BlckJhdGNoJyl9Ojwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwid3BsYWNlLWlucHV0XCIgaWQ9XCJwaXhlbHMtaW5wdXRcIiBtaW49XCIxXCIgbWF4PVwiNTBcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXJvd1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwid3BsYWNlLWxhYmVsXCI+JHt0KCdmYXJtLm1pbkNoYXJnZXMnKX06PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJ3cGxhY2UtaW5wdXRcIiBpZD1cIm1pbi1jaGFyZ2VzLWlucHV0XCIgbWluPVwiMFwiIG1heD1cIjUwXCIgc3RlcD1cIjAuMVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utcm93XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3cGxhY2UtbGFiZWxcIj4ke3QoJ2Zhcm0uY29sb3JNb2RlJyl9Ojwvc3Bhbj5cbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwid3BsYWNlLXNlbGVjdFwiIGlkPVwiY29sb3ItbW9kZS1zZWxlY3RcIj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyYW5kb21cIj4ke3QoJ2Zhcm0ucmFuZG9tJyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZml4ZWRcIj4ke3QoJ2Zhcm0uZml4ZWQnKX08L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXJvd1wiIGlkPVwiY29sb3ItcmFuZ2Utcm93XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3cGxhY2UtbGFiZWxcIj4ke3QoJ2Zhcm0ucmFuZ2UnKX06PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJ3cGxhY2UtaW5wdXRcIiBpZD1cImNvbG9yLW1pbi1pbnB1dFwiIG1pbj1cIjFcIiBtYXg9XCIzMlwiIHN0eWxlPVwid2lkdGg6IDM1cHg7XCI+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogI2NiZDVlMDtcIj4tPC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJ3cGxhY2UtaW5wdXRcIiBpZD1cImNvbG9yLW1heC1pbnB1dFwiIG1pbj1cIjFcIiBtYXg9XCIzMlwiIHN0eWxlPVwid2lkdGg6IDM1cHg7XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1yb3dcIiBpZD1cImNvbG9yLWZpeGVkLXJvd1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIndwbGFjZS1sYWJlbFwiPiR7dCgnZmFybS5maXhlZENvbG9yJyl9Ojwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwid3BsYWNlLWlucHV0XCIgaWQ9XCJjb2xvci1maXhlZC1pbnB1dFwiIG1pbj1cIjFcIiBtYXg9XCIzMlwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8IS0tIENvbmZpZ3VyYWNpXHUwMEYzbiBhdmFuemFkYSAoY29sYXBzYWJsZSkgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXNlY3Rpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zZWN0aW9uLXRpdGxlXCIgaWQ9XCJhZHZhbmNlZC10b2dnbGVcIj5cbiAgICAgICAgICBcdUQ4M0RcdUREMjcgJHt0KCdmYXJtLmFkdmFuY2VkJyl9IDxzcGFuIGlkPVwiYWR2YW5jZWQtYXJyb3dcIj5cdTI1QjY8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1hZHZhbmNlZFwiIGlkPVwiYWR2YW5jZWQtc2VjdGlvblwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXJvd1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3cGxhY2UtbGFiZWxcIj4ke3QoJ2Zhcm0udGlsZVgnKX06PC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cIndwbGFjZS1pbnB1dFwiIGlkPVwidGlsZS14LWlucHV0XCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1yb3dcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwid3BsYWNlLWxhYmVsXCI+JHt0KCdmYXJtLnRpbGVZJyl9Ojwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJ3cGxhY2UtaW5wdXRcIiBpZD1cInRpbGUteS1pbnB1dFwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utcm93XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIndwbGFjZS1sYWJlbFwiPiR7dCgnZmFybS5jdXN0b21QYWxldHRlJyl9Ojwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXJvd1wiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ3cGxhY2UtaW5wdXQgd2lkZVwiIGlkPVwiY3VzdG9tLXBhbGV0dGUtaW5wdXRcIiBcbiAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiR7dCgnZmFybS5wYWxldHRlRXhhbXBsZScpfVwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2UtYnV0dG9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIndwbGFjZS1idXR0b24gc21hbGxcIiBpZD1cInNhdmUtYnRuXCI+XHVEODNEXHVEQ0JFICR7dCgnY29tbW9uLnNhdmUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ3cGxhY2UtYnV0dG9uIHNtYWxsXCIgaWQ9XCJsb2FkLWJ0blwiPlx1RDgzRFx1RENDMSAke3QoJ2NvbW1vbi5sb2FkJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwid3BsYWNlLWJ1dHRvbiBzbWFsbFwiIGlkPVwicmVzZXQtYnRuXCI+XHVEODNEXHVERDA0ICR7dCgnY29tbW9uLnJlc2V0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwid3BsYWNlLWJ1dHRvbiBzbWFsbFwiIGlkPVwiY2FwdHVyZS1idG5cIj5cdUQ4M0RcdURDRjggJHt0KCdmYXJtLmNhcHR1cmUnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcbiAgXG4gIHNoYWRvdy5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNoYWRvd0hvc3QpO1xuICBcbiAgLy8gSGFjZXIgZWwgcGFuZWwgYXJyYXN0cmFibGVcbiAgY29uc3QgaGVhZGVyID0gc2hhZG93LnF1ZXJ5U2VsZWN0b3IoJy53cGxhY2UtaGVhZGVyJyk7XG4gIGRyYWdIZWFkZXIoaGVhZGVyLCBzaGFkb3dIb3N0KTtcbiAgXG4gIC8vIFJlZmVyZW5jaWFzIGEgZWxlbWVudG9zXG4gIGNvbnN0IGVsZW1lbnRzID0ge1xuICAgIG1pbmltaXplQnRuOiBzaGFkb3cucXVlcnlTZWxlY3RvcignLndwbGFjZS1taW5pbWl6ZScpLFxuICAgIGNvbnRlbnQ6IHNoYWRvdy5xdWVyeVNlbGVjdG9yKCcud3BsYWNlLWNvbnRlbnQnKSxcbiAgICBzdGF0dXM6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJyksXG4gICAgcGFpbnRlZENvdW50OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3BhaW50ZWQtY291bnQnKSxcbiAgICBjaGFyZ2VzQ291bnQ6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnY2hhcmdlcy1jb3VudCcpLFxuICAgIHJldHJ5Q291bnQ6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgncmV0cnktY291bnQnKSxcbiAgICB0aWxlUG9zOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3RpbGUtcG9zJyksXG4gICAgc3RhcnRCdG46IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnRuJyksXG4gICAgc3RvcEJ0bjogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdzdG9wLWJ0bicpLFxuICAgIHNlbGVjdFBvc2l0aW9uQnRuOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC1wb3NpdGlvbi1idG4nKSxcbiAgICBvbmNlQnRuOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ29uY2UtYnRuJyksXG4gICAgbG9nV2luZG93QnRuOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2xvZy13aW5kb3ctYnRuJyksXG4gICAgem9uZUluZm86IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnem9uZS1pbmZvJyksXG4gICAgem9uZURpc3BsYXk6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnem9uZS1kaXNwbGF5JyksXG4gICAgaGVhbHRoU3RhdHVzOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2hlYWx0aC1zdGF0dXMnKSxcbiAgICBkZWxheUlucHV0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2RlbGF5LWlucHV0JyksXG4gICAgcGl4ZWxzSW5wdXQ6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgncGl4ZWxzLWlucHV0JyksXG4gICAgbWluQ2hhcmdlc0lucHV0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ21pbi1jaGFyZ2VzLWlucHV0JyksXG4gICAgY29sb3JNb2RlU2VsZWN0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLW1vZGUtc2VsZWN0JyksXG4gICAgY29sb3JSYW5nZVJvdzogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdjb2xvci1yYW5nZS1yb3cnKSxcbiAgICBjb2xvckZpeGVkUm93OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLWZpeGVkLXJvdycpLFxuICAgIGNvbG9yTWluSW5wdXQ6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnY29sb3ItbWluLWlucHV0JyksXG4gICAgY29sb3JNYXhJbnB1dDogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdjb2xvci1tYXgtaW5wdXQnKSxcbiAgICBjb2xvckZpeGVkSW5wdXQ6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnY29sb3ItZml4ZWQtaW5wdXQnKSxcbiAgICBhZHZhbmNlZFRvZ2dsZTogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdhZHZhbmNlZC10b2dnbGUnKSxcbiAgICBhZHZhbmNlZFNlY3Rpb246IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnYWR2YW5jZWQtc2VjdGlvbicpLFxuICAgIGFkdmFuY2VkQXJyb3c6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnYWR2YW5jZWQtYXJyb3cnKSxcbiAgICB0aWxlWElucHV0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3RpbGUteC1pbnB1dCcpLFxuICAgIHRpbGVZSW5wdXQ6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgndGlsZS15LWlucHV0JyksXG4gICAgY3VzdG9tUGFsZXR0ZUlucHV0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbS1wYWxldHRlLWlucHV0JyksXG4gICAgc2F2ZUJ0bjogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdzYXZlLWJ0bicpLFxuICAgIGxvYWRCdG46IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnbG9hZC1idG4nKSxcbiAgICByZXNldEJ0bjogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdyZXNldC1idG4nKSxcbiAgICBjYXB0dXJlQnRuOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2NhcHR1cmUtYnRuJylcbiAgfTtcbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGFjdHVhbGl6YXIgbG9zIHZhbG9yZXMgZGUgbG9zIGlucHV0cyBkZXNkZSBsYSBjb25maWd1cmFjaVx1MDBGM25cbiAgZnVuY3Rpb24gdXBkYXRlSW5wdXRzRnJvbUNvbmZpZygpIHtcbiAgICBlbGVtZW50cy5kZWxheUlucHV0LnZhbHVlID0gY29uZmlnLkRFTEFZX01TO1xuICAgIGVsZW1lbnRzLnBpeGVsc0lucHV0LnZhbHVlID0gY29uZmlnLlBJWEVMU19QRVJfQkFUQ0g7XG4gICAgZWxlbWVudHMubWluQ2hhcmdlc0lucHV0LnZhbHVlID0gY29uZmlnLk1JTl9DSEFSR0VTO1xuICAgIGVsZW1lbnRzLmNvbG9yTW9kZVNlbGVjdC52YWx1ZSA9IGNvbmZpZy5DT0xPUl9NT0RFO1xuICAgIGVsZW1lbnRzLmNvbG9yTWluSW5wdXQudmFsdWUgPSBjb25maWcuQ09MT1JfTUlOO1xuICAgIGVsZW1lbnRzLmNvbG9yTWF4SW5wdXQudmFsdWUgPSBjb25maWcuQ09MT1JfTUFYO1xuICAgIGVsZW1lbnRzLmNvbG9yRml4ZWRJbnB1dC52YWx1ZSA9IGNvbmZpZy5DT0xPUl9GSVhFRDtcbiAgICBlbGVtZW50cy50aWxlWElucHV0LnZhbHVlID0gY29uZmlnLlRJTEVfWCB8fCAnJztcbiAgICBlbGVtZW50cy50aWxlWUlucHV0LnZhbHVlID0gY29uZmlnLlRJTEVfWSB8fCAnJztcbiAgICBlbGVtZW50cy5jdXN0b21QYWxldHRlSW5wdXQudmFsdWUgPSAoY29uZmlnLkNVU1RPTV9QQUxFVFRFIHx8IFtdKS5qb2luKCcsJyk7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciB2aXNpYmlsaWRhZCBkZSBjb250cm9sZXMgZGUgY29sb3JcbiAgICB1cGRhdGVDb2xvck1vZGVWaXNpYmlsaXR5KCk7XG4gICAgdXBkYXRlVGlsZURpc3BsYXkoKTtcbiAgICB1cGRhdGVab25lRGlzcGxheSgpO1xuICAgIHVwZGF0ZUJ1dHRvblN0YXRlcyhmYXJtU3RhdGU/LnJ1bm5pbmcgfHwgZmFsc2UpO1xuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIGxhIGNvbmZpZ3VyYWNpXHUwMEYzbiBkZXNkZSBsb3MgaW5wdXRzXG4gIGZ1bmN0aW9uIHVwZGF0ZUNvbmZpZ0Zyb21JbnB1dHMoKSB7XG4gICAgY29uZmlnLkRFTEFZX01TID0gcGFyc2VJbnQoZWxlbWVudHMuZGVsYXlJbnB1dC52YWx1ZSkgfHwgRkFSTV9ERUZBVUxUUy5ERUxBWV9NUztcbiAgICBjb25maWcuUElYRUxTX1BFUl9CQVRDSCA9IGNsYW1wKHBhcnNlSW50KGVsZW1lbnRzLnBpeGVsc0lucHV0LnZhbHVlKSB8fCBGQVJNX0RFRkFVTFRTLlBJWEVMU19QRVJfQkFUQ0gsIDEsIDUwKTtcbiAgICBjb25maWcuTUlOX0NIQVJHRVMgPSBwYXJzZUZsb2F0KGVsZW1lbnRzLm1pbkNoYXJnZXNJbnB1dC52YWx1ZSkgfHwgRkFSTV9ERUZBVUxUUy5NSU5fQ0hBUkdFUztcbiAgICBjb25maWcuQ09MT1JfTU9ERSA9IGVsZW1lbnRzLmNvbG9yTW9kZVNlbGVjdC52YWx1ZTtcbiAgICBjb25maWcuQ09MT1JfTUlOID0gY2xhbXAocGFyc2VJbnQoZWxlbWVudHMuY29sb3JNaW5JbnB1dC52YWx1ZSkgfHwgRkFSTV9ERUZBVUxUUy5DT0xPUl9NSU4sIDEsIDMyKTtcbiAgICBjb25maWcuQ09MT1JfTUFYID0gY2xhbXAocGFyc2VJbnQoZWxlbWVudHMuY29sb3JNYXhJbnB1dC52YWx1ZSkgfHwgRkFSTV9ERUZBVUxUUy5DT0xPUl9NQVgsIDEsIDMyKTtcbiAgICBjb25maWcuQ09MT1JfRklYRUQgPSBjbGFtcChwYXJzZUludChlbGVtZW50cy5jb2xvckZpeGVkSW5wdXQudmFsdWUpIHx8IEZBUk1fREVGQVVMVFMuQ09MT1JfRklYRUQsIDEsIDMyKTtcbiAgICBcbiAgICAvLyBBc2VndXJhciBxdWUgTUlOIDw9IE1BWFxuICAgIGlmIChjb25maWcuQ09MT1JfTUlOID4gY29uZmlnLkNPTE9SX01BWCkge1xuICAgICAgY29uZmlnLkNPTE9SX01BWCA9IGNvbmZpZy5DT0xPUl9NSU47XG4gICAgICBlbGVtZW50cy5jb2xvck1heElucHV0LnZhbHVlID0gY29uZmlnLkNPTE9SX01BWDtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdGlsZVggPSBwYXJzZUludChlbGVtZW50cy50aWxlWElucHV0LnZhbHVlKTtcbiAgICBjb25zdCB0aWxlWSA9IHBhcnNlSW50KGVsZW1lbnRzLnRpbGVZSW5wdXQudmFsdWUpO1xuICAgIGlmIChOdW1iZXIuaXNGaW5pdGUodGlsZVgpKSBjb25maWcuVElMRV9YID0gdGlsZVg7XG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZSh0aWxlWSkpIGNvbmZpZy5USUxFX1kgPSB0aWxlWTtcbiAgICBcbiAgICB1cGRhdGVUaWxlRGlzcGxheSgpO1xuICAgIHVwZGF0ZVpvbmVEaXNwbGF5KCk7XG4gIH1cbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGFjdHVhbGl6YXIgdmlzaWJpbGlkYWQgZGUgY29udHJvbGVzIGRlIG1vZG8gZGUgY29sb3JcbiAgZnVuY3Rpb24gdXBkYXRlQ29sb3JNb2RlVmlzaWJpbGl0eSgpIHtcbiAgICBjb25zdCBtb2RlID0gZWxlbWVudHMuY29sb3JNb2RlU2VsZWN0LnZhbHVlO1xuICAgIGVsZW1lbnRzLmNvbG9yUmFuZ2VSb3cuc3R5bGUuZGlzcGxheSA9IG1vZGUgPT09ICdyYW5kb20nID8gJ2ZsZXgnIDogJ25vbmUnO1xuICAgIGVsZW1lbnRzLmNvbG9yRml4ZWRSb3cuc3R5bGUuZGlzcGxheSA9IG1vZGUgPT09ICdmaXhlZCcgPyAnZmxleCcgOiAnbm9uZSc7XG4gIH1cbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGFjdHVhbGl6YXIgZGlzcGxheSBkZWwgdGlsZVxuICBmdW5jdGlvbiB1cGRhdGVUaWxlRGlzcGxheSgpIHtcbiAgICBpZiAoZWxlbWVudHMudGlsZVBvcykge1xuICAgICAgZWxlbWVudHMudGlsZVBvcy50ZXh0Q29udGVudCA9IGAke2NvbmZpZy5USUxFX1ggfHwgMH0sJHtjb25maWcuVElMRV9ZIHx8IDB9YDtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGFjdHVhbGl6YXIgZWwgZGlzcGxheSBkZSBsYSB6b25hIHNlbGVjY2lvbmFkYVxuICBmdW5jdGlvbiB1cGRhdGVab25lRGlzcGxheSgpIHtcbiAgICBpZiAoZWxlbWVudHMuem9uZURpc3BsYXkpIHtcbiAgICAgIGlmIChjb25maWcuUE9TSVRJT05fU0VMRUNURUQgJiYgY29uZmlnLkJBU0VfWCAhPT0gbnVsbCAmJiBjb25maWcuQkFTRV9ZICE9PSBudWxsKSB7XG4gICAgICAgIGVsZW1lbnRzLnpvbmVEaXNwbGF5LnRleHRDb250ZW50ID0gdCgnZmFybS5jdXJyZW50Wm9uZScsIHsgeDogY29uZmlnLkJBU0VfWCwgeTogY29uZmlnLkJBU0VfWSB9KTtcbiAgICAgICAgZWxlbWVudHMuem9uZURpc3BsYXkuc3R5bGUuY29sb3IgPSAnIzQ4YmI3OCc7IC8vIFZlcmRlIHBhcmEgaW5kaWNhciBhY3RpdmFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnRzLnpvbmVEaXNwbGF5LnRleHRDb250ZW50ID0gdCgnZmFybS5ub1Bvc2l0aW9uJyk7XG4gICAgICAgIGVsZW1lbnRzLnpvbmVEaXNwbGF5LnN0eWxlLmNvbG9yID0gJyNmNTY1NjUnOyAvLyBSb2pvIHBhcmEgaW5kaWNhciBubyBzZWxlY2Npb25hZGFcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGUgYm90b25lcyBjdWFuZG8gY2FtYmllIGxhIHpvbmFcbiAgICB1cGRhdGVCdXR0b25TdGF0ZXMoZmFybVN0YXRlPy5ydW5uaW5nIHx8IGZhbHNlKTtcbiAgfVxuICBcbiAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gIGVsZW1lbnRzLm1pbmltaXplQnRuPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB1aVN0YXRlLm1pbmltaXplZCA9ICF1aVN0YXRlLm1pbmltaXplZDtcbiAgICBlbGVtZW50cy5jb250ZW50LmNsYXNzTGlzdC50b2dnbGUoJ21pbmltaXplZCcsIHVpU3RhdGUubWluaW1pemVkKTtcbiAgICBlbGVtZW50cy5taW5pbWl6ZUJ0bi50ZXh0Q29udGVudCA9IHVpU3RhdGUubWluaW1pemVkID8gJysnIDogJ1x1MjIxMic7XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuc3RhcnRCdG4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHVwZGF0ZUNvbmZpZ0Zyb21JbnB1dHMoKTtcbiAgICBvblN0YXJ0KCk7XG4gICAgdXBkYXRlQnV0dG9uU3RhdGVzKHRydWUpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLnN0b3BCdG4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG9uU3RvcCgpO1xuICAgIHVwZGF0ZUJ1dHRvblN0YXRlcyhmYWxzZSk7XG4gIH0pO1xuICBcbiAgZWxlbWVudHMub25jZUJ0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgLy8gQXNlZ3VyYXIgcXVlIGlucHV0cyByZWZsZWphbiBsYSBcdTAwRkFsdGltYSBjYXB0dXJhL2NhbGlicmFjaVx1MDBGM25cbiAgICB1cGRhdGVJbnB1dHNGcm9tQ29uZmlnKCk7XG4gICAgdXBkYXRlQ29uZmlnRnJvbUlucHV0cygpO1xuICAgIC8vIExsYW1hciBhIGxhIGZ1bmNpXHUwMEYzbiBkZSBwaW50YXIgdW5hIHZleiBzaSBleGlzdGVcbiAgICBpZiAod2luZG93LldQQVVJICYmIHdpbmRvdy5XUEFVSS5vbmNlKSB7XG4gICAgICB3aW5kb3cuV1BBVUkub25jZSgpO1xuICAgIH1cbiAgfSk7XG4gIFxuICBlbGVtZW50cy5zZWxlY3RQb3NpdGlvbkJ0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgc2VsZWN0RmFybVBvc2l0aW9uKGNvbmZpZywgc2V0U3RhdHVzLCB1cGRhdGVab25lRGlzcGxheSk7XG4gIH0pO1xuICBcbiAgLy8gRXZlbnQgbGlzdGVuZXIgcGFyYSBlbCBib3RcdTAwRjNuIGRlIGxvZ3NcbiAgbGV0IGxvZ1dpbmRvdyA9IG51bGw7XG4gIGVsZW1lbnRzLmxvZ1dpbmRvd0J0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKCFsb2dXaW5kb3cpIHtcbiAgICAgIGxvZ1dpbmRvdyA9IGNyZWF0ZUxvZ1dpbmRvdygnZmFybScpO1xuICAgICAgbG9nV2luZG93LnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nV2luZG93LnRvZ2dsZSgpO1xuICAgIH1cbiAgfSk7XG4gIFxuICBlbGVtZW50cy5jb2xvck1vZGVTZWxlY3Q/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICB1cGRhdGVDb2xvck1vZGVWaXNpYmlsaXR5KCk7XG4gICAgdXBkYXRlQ29uZmlnRnJvbUlucHV0cygpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLmN1c3RvbVBhbGV0dGVJbnB1dD8uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgdXBkYXRlQ29uZmlnRnJvbUlucHV0cygpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLmFkdmFuY2VkVG9nZ2xlPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB1aVN0YXRlLnNob3dBZHZhbmNlZCA9ICF1aVN0YXRlLnNob3dBZHZhbmNlZDtcbiAgICBlbGVtZW50cy5hZHZhbmNlZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IHVpU3RhdGUuc2hvd0FkdmFuY2VkID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICBlbGVtZW50cy5hZHZhbmNlZEFycm93LnRleHRDb250ZW50ID0gdWlTdGF0ZS5zaG93QWR2YW5jZWQgPyAnXHUyNUJDJyA6ICdcdTI1QjYnO1xuICB9KTtcbiAgXG4gIC8vIExpc3RlbmVycyBwYXJhIGlucHV0cyAoYWN0dWFsaXphY2lcdTAwRjNuIGF1dG9tXHUwMEUxdGljYSlcbiAgWydkZWxheUlucHV0JywgJ3BpeGVsc0lucHV0JywgJ21pbkNoYXJnZXNJbnB1dCcsICdjb2xvck1pbklucHV0JywgJ2NvbG9yTWF4SW5wdXQnLCAnY29sb3JGaXhlZElucHV0JywgJ3RpbGVYSW5wdXQnLCAndGlsZVlJbnB1dCddLmZvckVhY2goaW5wdXROYW1lID0+IHtcbiAgICBlbGVtZW50c1tpbnB1dE5hbWVdPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVDb25maWdGcm9tSW5wdXRzKTtcbiAgfSk7XG4gIFxuICBlbGVtZW50cy5zYXZlQnRuPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB1cGRhdGVDb25maWdGcm9tSW5wdXRzKCk7XG4gICAgc2F2ZUZhcm1DZmcoY29uZmlnKTtcbiAgICBzZXRTdGF0dXMoYFx1RDgzRFx1RENCRSAke3QoJ2Zhcm0uY29uZmlnU2F2ZWQnKX1gLCAnc3VjY2VzcycpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLmxvYWRCdG4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGxvYWRGYXJtQ2ZnKEZBUk1fREVGQVVMVFMpO1xuICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLCBsb2FkZWQpO1xuICAgIHVwZGF0ZUlucHV0c0Zyb21Db25maWcoKTtcbiAgICBzZXRTdGF0dXMoYFx1RDgzRFx1RENDMSAke3QoJ2Zhcm0uY29uZmlnTG9hZGVkJyl9YCwgJ3N1Y2Nlc3MnKTtcbiAgfSk7XG4gIFxuICBlbGVtZW50cy5yZXNldEJ0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVzZXRGYXJtQ2ZnKCk7XG4gICAgT2JqZWN0LmFzc2lnbihjb25maWcsIEZBUk1fREVGQVVMVFMpO1xuICAgIHVwZGF0ZUlucHV0c0Zyb21Db25maWcoKTtcbiAgICBzZXRTdGF0dXMoYFx1RDgzRFx1REQwNCAke3QoJ2Zhcm0uY29uZmlnUmVzZXQnKX1gLCAnc3VjY2VzcycpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLmNhcHR1cmVCdG4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIC8vIEZ1bmNpXHUwMEYzbiBkZSBjYXB0dXJhIC0gc2VyXHUwMEUxIGltcGxlbWVudGFkYVxuICAgIHNldFN0YXR1cyhgXHVEODNEXHVEQ0Y4ICR7dCgnZmFybS5jYXB0dXJlSW5zdHJ1Y3Rpb25zJyl9YCwgJ3N0YXR1cycpO1xuICAgIC8vIEFxdVx1MDBFRCBpclx1MDBFRGEgbGEgbFx1MDBGM2dpY2EgZGUgY2FwdHVyYVxuICB9KTtcbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGFjdHVhbGl6YXIgZXN0YWRvIGRlIGJvdG9uZXNcbiAgZnVuY3Rpb24gdXBkYXRlQnV0dG9uU3RhdGVzKHJ1bm5pbmcpIHtcbiAgICBpZiAoZWxlbWVudHMuc3RhcnRCdG4pIHtcbiAgICAgIC8vIEVsIGJvdFx1MDBGM24gZGUgaW5pY2lvIGVzdFx1MDBFMSBkZXNoYWJpbGl0YWRvIHNpOlxuICAgICAgLy8gMS4gRWwgYm90IGVzdFx1MDBFMSBjb3JyaWVuZG8sIE9cbiAgICAgIC8vIDIuIE5vIHNlIGhhIHNlbGVjY2lvbmFkbyB1bmEgem9uYVxuICAgICAgY29uc3Qgbm9ab25lU2VsZWN0ZWQgPSAhY29uZmlnLlBPU0lUSU9OX1NFTEVDVEVEIHx8IGNvbmZpZy5CQVNFX1ggPT09IG51bGwgfHwgY29uZmlnLkJBU0VfWSA9PT0gbnVsbDtcbiAgICAgIGVsZW1lbnRzLnN0YXJ0QnRuLmRpc2FibGVkID0gcnVubmluZyB8fCBub1pvbmVTZWxlY3RlZDtcbiAgICAgIFxuICAgICAgLy8gQ2FtYmlhciB0ZXh0byBkZWwgYm90XHUwMEYzbiBzZWdcdTAwRkFuIGVsIGVzdGFkb1xuICAgICAgaWYgKG5vWm9uZVNlbGVjdGVkKSB7XG4gICAgICAgIGVsZW1lbnRzLnN0YXJ0QnRuLnRleHRDb250ZW50ID0gYFx1RDgzRFx1REVBQiAke3QoJ2Zhcm0uc2VsZWN0UG9zaXRpb24nKX0gXHUyNkEwXHVGRTBGYDtcbiAgICAgICAgZWxlbWVudHMuc3RhcnRCdG4udGl0bGUgPSB0KCdmYXJtLm1pc3NpbmdQb3NpdGlvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHMuc3RhcnRCdG4udGV4dENvbnRlbnQgPSBgXHUyNUI2XHVGRTBGICR7dCgnZmFybS5zdGFydCcpfWA7XG4gICAgICAgIGVsZW1lbnRzLnN0YXJ0QnRuLnRpdGxlID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbGVtZW50cy5zdG9wQnRuKSBlbGVtZW50cy5zdG9wQnRuLmRpc2FibGVkID0gIXJ1bm5pbmc7XG4gIH1cbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGFjdHVhbGl6YXIgZWwgZXN0YWRvIHZpc3VhbFxuICBmdW5jdGlvbiBzZXRTdGF0dXMobWVzc2FnZSwgdHlwZSA9ICdzdGF0dXMnKSB7XG4gICAgaWYgKGVsZW1lbnRzLnN0YXR1cykge1xuICAgICAgZWxlbWVudHMuc3RhdHVzLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgIGVsZW1lbnRzLnN0YXR1cy5jbGFzc05hbWUgPSBgd3BsYWNlLXN0YXR1cyAke3R5cGV9YDtcbiAgICAgIGxvZyhgU3RhdHVzOiAke21lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIGVzdGFkXHUwMEVEc3RpY2FzXG4gIGZ1bmN0aW9uIHVwZGF0ZVN0YXRzKHBhaW50ZWQsIGNoYXJnZXMsIHJldHJpZXMgPSAwLCBoZWFsdGggPSBudWxsKSB7XG4gICAgaWYgKGVsZW1lbnRzLnBhaW50ZWRDb3VudCkge1xuICAgICAgZWxlbWVudHMucGFpbnRlZENvdW50LnRleHRDb250ZW50ID0gcGFpbnRlZCB8fCAwO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudHMuY2hhcmdlc0NvdW50KSB7XG4gICAgICBlbGVtZW50cy5jaGFyZ2VzQ291bnQudGV4dENvbnRlbnQgPSB0eXBlb2YgY2hhcmdlcyA9PT0gJ251bWJlcicgPyBjaGFyZ2VzLnRvRml4ZWQoMSkgOiAnMCc7XG4gICAgfVxuICAgIGlmIChlbGVtZW50cy5yZXRyeUNvdW50KSB7XG4gICAgICBlbGVtZW50cy5yZXRyeUNvdW50LnRleHRDb250ZW50ID0gcmV0cmllcyB8fCAwO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudHMuaGVhbHRoU3RhdHVzICYmIGhlYWx0aCkge1xuICAgICAgZWxlbWVudHMuaGVhbHRoU3RhdHVzLnRleHRDb250ZW50ID0gaGVhbHRoLnVwID8gYFx1RDgzRFx1REZFMiAke3QoJ2Zhcm0uYmFja2VuZE9ubGluZScpfWAgOiBgXHVEODNEXHVERDM0ICR7dCgnZmFybS5iYWNrZW5kT2ZmbGluZScpfWA7XG4gICAgICBlbGVtZW50cy5oZWFsdGhTdGF0dXMuY2xhc3NOYW1lID0gYHdwbGFjZS1oZWFsdGggJHtoZWFsdGgudXAgPyAnb25saW5lJyA6ICdvZmZsaW5lJ31gO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgZWZlY3RvIHZpc3VhbCBkZSBmbGFzaFxuICBmdW5jdGlvbiBmbGFzaEVmZmVjdCgpIHtcbiAgICBjb250YWluZXIuc3R5bGUuYm94U2hhZG93ID0gJzAgMCAyMHB4ICM0OGJiNzgnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29udGFpbmVyLnN0eWxlLmJveFNoYWRvdyA9ICcwIDEwcHggMjVweCByZ2JhKDAsMCwwLDAuMyknO1xuICAgIH0sIDIwMCk7XG4gIH1cbiAgXG4gIC8vIEluaWNpYWxpemFyIHZhbG9yZXNcbiAgdXBkYXRlSW5wdXRzRnJvbUNvbmZpZygpO1xuICBcbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgYWN0dWFsaXphciB0ZXh0b3MgY3VhbmRvIGNhbWJpZSBlbCBpZGlvbWFcbiAgZnVuY3Rpb24gdXBkYXRlVGV4dHMoKSB7XG4gICAgLy8gQWN0dWFsaXphciB0XHUwMEVEdHVsb1xuICAgIGNvbnN0IHRpdGxlID0gc2hhZG93LnF1ZXJ5U2VsZWN0b3IoJy53cGxhY2UtdGl0bGUnKTtcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIHRpdGxlLmlubmVySFRNTCA9IGBcdUQ4M0VcdUREMTYgJHt0KCdmYXJtLnRpdGxlJyl9YDtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBib3RvbmVzXG4gICAgaWYgKGVsZW1lbnRzLnN0YXJ0QnRuKSBlbGVtZW50cy5zdGFydEJ0bi5pbm5lckhUTUwgPSBgXHUyNUI2XHVGRTBGICR7dCgnZmFybS5zdGFydCcpfWA7XG4gICAgaWYgKGVsZW1lbnRzLnN0b3BCdG4pIGVsZW1lbnRzLnN0b3BCdG4uaW5uZXJIVE1MID0gYFx1MjNGOVx1RkUwRiAke3QoJ2Zhcm0uc3RvcCcpfWA7XG4gICAgaWYgKGVsZW1lbnRzLnNlbGVjdFBvc2l0aW9uQnRuKSBlbGVtZW50cy5zZWxlY3RQb3NpdGlvbkJ0bi5pbm5lckhUTUwgPSBgXHVEODNDXHVERjBEICR7dCgnZmFybS5zZWxlY3RQb3NpdGlvbicpfWA7XG4gICAgaWYgKGVsZW1lbnRzLm9uY2VCdG4pIGVsZW1lbnRzLm9uY2VCdG4uaW5uZXJIVE1MID0gYFx1RDgzQ1x1REZBOCAke3QoJ2Zhcm0ucGFpbnRPbmNlJyl9YDtcbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGV0aXF1ZXRhcyBkZSBlc3RhZFx1MDBFRHN0aWNhc1xuICAgIGNvbnN0IHBhaW50ZWRMYWJlbCA9IHNoYWRvdy5xdWVyeVNlbGVjdG9yKCcjcGFpbnRlZC1jb3VudCcpLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndwbGFjZS1zdGF0LWxhYmVsJyk7XG4gICAgY29uc3QgY2hhcmdlc0xhYmVsID0gc2hhZG93LnF1ZXJ5U2VsZWN0b3IoJyNjaGFyZ2VzLWNvdW50JykucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud3BsYWNlLXN0YXQtbGFiZWwnKTtcbiAgICBjb25zdCByZXRyeUxhYmVsID0gc2hhZG93LnF1ZXJ5U2VsZWN0b3IoJyNyZXRyeS1jb3VudCcpLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndwbGFjZS1zdGF0LWxhYmVsJyk7XG4gICAgY29uc3QgdGlsZUxhYmVsID0gc2hhZG93LnF1ZXJ5U2VsZWN0b3IoJyN0aWxlLXBvcycpLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndwbGFjZS1zdGF0LWxhYmVsJyk7XG4gICAgXG4gICAgaWYgKHBhaW50ZWRMYWJlbCkgcGFpbnRlZExhYmVsLnRleHRDb250ZW50ID0gdCgnZmFybS5wYWludGVkJyk7XG4gICAgaWYgKGNoYXJnZXNMYWJlbCkgY2hhcmdlc0xhYmVsLnRleHRDb250ZW50ID0gdCgnZmFybS5jaGFyZ2VzJyk7XG4gICAgaWYgKHJldHJ5TGFiZWwpIHJldHJ5TGFiZWwudGV4dENvbnRlbnQgPSB0KCdmYXJtLnJldHJpZXMnKTtcbiAgICBpZiAodGlsZUxhYmVsKSB0aWxlTGFiZWwudGV4dENvbnRlbnQgPSB0KCdmYXJtLnRpbGUnKTtcbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIHNlY2Npb25lc1xuICAgIGNvbnN0IGNvbmZpZ1RpdGxlID0gc2hhZG93LnF1ZXJ5U2VsZWN0b3IoJy53cGxhY2Utc2VjdGlvbi10aXRsZScpO1xuICAgIGlmIChjb25maWdUaXRsZSkgY29uZmlnVGl0bGUuaW5uZXJIVE1MID0gYFx1MjY5OVx1RkUwRiAke3QoJ2Zhcm0uY29uZmlndXJhdGlvbicpfWA7XG4gICAgXG4gICAgY29uc3QgYWR2YW5jZWRUaXRsZSA9IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnYWR2YW5jZWQtdG9nZ2xlJyk7XG4gICAgaWYgKGFkdmFuY2VkVGl0bGUpIHtcbiAgICAgIGNvbnN0IGFycm93ID0gYWR2YW5jZWRUaXRsZS5xdWVyeVNlbGVjdG9yKCcjYWR2YW5jZWQtYXJyb3cnKTtcbiAgICAgIGNvbnN0IGFycm93VGV4dCA9IGFycm93ID8gYXJyb3cudGV4dENvbnRlbnQgOiAnXHUyNUI2JztcbiAgICAgIGFkdmFuY2VkVGl0bGUuaW5uZXJIVE1MID0gYFx1RDgzRFx1REQyNyAke3QoJ2Zhcm0uYWR2YW5jZWQnKX0gPHNwYW4gaWQ9XCJhZHZhbmNlZC1hcnJvd1wiPiR7YXJyb3dUZXh0fTwvc3Bhbj5gO1xuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGV0aXF1ZXRhcyBkZSBjb25maWd1cmFjaVx1MDBGM25cbiAgICAvLyBMYXMgZXRpcXVldGFzIHNlIGFjdHVhbGl6YW4gYXV0b21cdTAwRTF0aWNhbWVudGUgZGVzZGUgZWwgaW5uZXJIVE1MIGluaWNpYWxcbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIG9wY2lvbmVzIGRlbCBzZWxlY3RvciBkZSBtb2RvIGRlIGNvbG9yXG4gICAgY29uc3QgY29sb3JNb2RlU2VsZWN0ID0gZWxlbWVudHMuY29sb3JNb2RlU2VsZWN0O1xuICAgIGlmIChjb2xvck1vZGVTZWxlY3QpIHtcbiAgICAgIGNvbnN0IHJhbmRvbU9wdGlvbiA9IGNvbG9yTW9kZVNlbGVjdC5xdWVyeVNlbGVjdG9yKCdvcHRpb25bdmFsdWU9XCJyYW5kb21cIl0nKTtcbiAgICAgIGNvbnN0IGZpeGVkT3B0aW9uID0gY29sb3JNb2RlU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvblt2YWx1ZT1cImZpeGVkXCJdJyk7XG4gICAgICBpZiAocmFuZG9tT3B0aW9uKSByYW5kb21PcHRpb24udGV4dENvbnRlbnQgPSB0KCdmYXJtLnJhbmRvbScpO1xuICAgICAgaWYgKGZpeGVkT3B0aW9uKSBmaXhlZE9wdGlvbi50ZXh0Q29udGVudCA9IHQoJ2Zhcm0uZml4ZWQnKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBwbGFjZWhvbGRlclxuICAgIGlmIChlbGVtZW50cy5jdXN0b21QYWxldHRlSW5wdXQpIHtcbiAgICAgIGVsZW1lbnRzLmN1c3RvbVBhbGV0dGVJbnB1dC5wbGFjZWhvbGRlciA9IHQoJ2Zhcm0ucGFsZXR0ZUV4YW1wbGUnKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBib3RvbmVzIGRlIGNvbmZpZ3VyYWNpXHUwMEYzblxuICAgIGlmIChlbGVtZW50cy5zYXZlQnRuKSBlbGVtZW50cy5zYXZlQnRuLmlubmVySFRNTCA9IGBcdUQ4M0RcdURDQkUgJHt0KCdjb21tb24uc2F2ZScpfWA7XG4gICAgaWYgKGVsZW1lbnRzLmxvYWRCdG4pIGVsZW1lbnRzLmxvYWRCdG4uaW5uZXJIVE1MID0gYFx1RDgzRFx1RENDMSAke3QoJ2NvbW1vbi5sb2FkJyl9YDtcbiAgICBpZiAoZWxlbWVudHMucmVzZXRCdG4pIGVsZW1lbnRzLnJlc2V0QnRuLmlubmVySFRNTCA9IGBcdUQ4M0RcdUREMDQgJHt0KCdjb21tb24ucmVzZXQnKX1gO1xuICAgIGlmIChlbGVtZW50cy5jYXB0dXJlQnRuKSBlbGVtZW50cy5jYXB0dXJlQnRuLmlubmVySFRNTCA9IGBcdUQ4M0RcdURDRjggJHt0KCdmYXJtLmNhcHR1cmUnKX1gO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgaW5mb3JtYWNpXHUwMEYzbiBkZSB6b25hXG4gICAgdXBkYXRlWm9uZURpc3BsYXkoKTtcbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGVzdGFkbyBkZSBib3RvbmVzIChwYXJhIGFjdHVhbGl6YXIgdGV4dG9zKVxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlcyhmYXJtU3RhdGU/LnJ1bm5pbmcgfHwgZmFsc2UpO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgZXN0YWRvIGRlIHNhbHVkIHNpIGV4aXN0ZVxuICAgIGNvbnN0IGhlYWx0aFN0YXR1cyA9IGVsZW1lbnRzLmhlYWx0aFN0YXR1cztcbiAgICBpZiAoaGVhbHRoU3RhdHVzICYmIGhlYWx0aFN0YXR1cy50ZXh0Q29udGVudC5pbmNsdWRlcygnXHVEODNEXHVERDBEJykpIHtcbiAgICAgIGhlYWx0aFN0YXR1cy50ZXh0Q29udGVudCA9IGBcdUQ4M0RcdUREMEQgJHt0KCdmYXJtLmNoZWNraW5nU3RhdHVzJyl9YDtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlc3RhZG8gc2kgZXN0XHUwMEUxIGRldGVuaWRvXG4gICAgY29uc3Qgc3RhdHVzID0gZWxlbWVudHMuc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzLnRleHRDb250ZW50LmluY2x1ZGVzKCdcdUQ4M0RcdURDQTQnKSkge1xuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gYFx1RDgzRFx1RENBNCAke3QoJ2Zhcm0uc3RvcHBlZCcpfWA7XG4gICAgfVxuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBzZWxlY2Npb25hciBwb3NpY2lcdTAwRjNuIGRlIGZhcm1pbmdcbiAgYXN5bmMgZnVuY3Rpb24gc2VsZWN0RmFybVBvc2l0aW9uKGNvbmZpZywgc2V0U3RhdHVzLCB1cGRhdGVab25lRGlzcGxheSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgc2V0U3RhdHVzKHQoJ2Zhcm0uc2VsZWN0UG9zaXRpb25BbGVydCcpLCAnaW5mbycpO1xuICAgICAgXG4gICAgICAvLyBBY3RpdmFyIG1vZG8gZGUgc2VsZWNjaVx1MDBGM24gZGUgcG9zaWNpXHUwMEYzblxuICAgICAgY29uZmlnLnNlbGVjdGluZ1Bvc2l0aW9uID0gdHJ1ZTtcbiAgICAgIFxuICAgICAgLy8gSW50ZXJjZXB0YXIgcmVxdWVzdHMgcGFyYSBjYXB0dXJhciBwb3NpY2lcdTAwRjNuXG4gICAgICBjb25zdCBvcmlnaW5hbEZldGNoID0gd2luZG93LmZldGNoO1xuICAgICAgd2luZG93LmZldGNoID0gYXN5bmMgKHVybCwgb3B0aW9ucykgPT4ge1xuICAgICAgICBpZiAoY29uZmlnLnNlbGVjdGluZ1Bvc2l0aW9uICYmIHVybC5pbmNsdWRlcygnL3MwL3BpeGVsLycpKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3JpZ2luYWxGZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2sgJiYgb3B0aW9ucyAmJiBvcHRpb25zLmJvZHkpIHtcbiAgICAgICAgICAgICAgY29uc3QgYm9keURhdGEgPSBKU09OLnBhcnNlKG9wdGlvbnMuYm9keSk7XG4gICAgICAgICAgICAgIGlmIChib2R5RGF0YS5jb29yZHMgJiYgYm9keURhdGEuY29vcmRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxYID0gYm9keURhdGEuY29vcmRzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsWSA9IGJvZHlEYXRhLmNvb3Jkc1sxXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBFeHRyYWVyIHRpbGUgZGUgbGEgVVJMXG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZU1hdGNoID0gdXJsLm1hdGNoKC9cXC9zMFxcL3BpeGVsXFwvKC0/XFxkKylcXC8oLT9cXGQrKS8pO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgIGNvbmZpZy5USUxFX1ggPSBwYXJzZUludCh0aWxlTWF0Y2hbMV0pO1xuICAgICAgICAgICAgICAgICAgY29uZmlnLlRJTEVfWSA9IHBhcnNlSW50KHRpbGVNYXRjaFsyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEVzdGFibGVjZXIgcG9zaWNpXHUwMEYzbiBiYXNlIHkgYWN0aXZhciBzaXN0ZW1hIGRlIHJhZGlvXG4gICAgICAgICAgICAgICAgY29uZmlnLkJBU0VfWCA9IGxvY2FsWDtcbiAgICAgICAgICAgICAgICBjb25maWcuQkFTRV9ZID0gbG9jYWxZO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5QT1NJVElPTl9TRUxFQ1RFRCA9IHRydWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uZmlnLnNlbGVjdGluZ1Bvc2l0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgd2luZG93LmZldGNoID0gb3JpZ2luYWxGZXRjaDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBBY3R1YWxpemFyIGRpc3BsYXlzIHkgc2luY3Jvbml6YXIgaW5wdXRzIGNvbiBsYSBudWV2YSBjb25maWdcbiAgICAgICAgICAgICAgICB1cGRhdGVab25lRGlzcGxheSgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVRpbGVEaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgLy8gTVVZIElNUE9SVEFOVEU6IHNpbmNyb25pemFyIGxvcyBpbnB1dHMgcGFyYSBxdWUgJ3VwZGF0ZUNvbmZpZ0Zyb21JbnB1dHMoKSdcbiAgICAgICAgICAgICAgICAvLyBubyBzb2JyZWVzY3JpYmEgZWwgVElMRV9YL1RJTEVfWSBjb24gdmFsb3JlcyBhbnRpZ3VvcyBhbCBwdWxzYXIgXCJVbmEgdmV6XCIvXCJJbmljaWFyXCJcbiAgICAgICAgICAgICAgICB1cGRhdGVJbnB1dHNGcm9tQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzKHQoJ2Zhcm0ucG9zaXRpb25TZXQnKSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICBsb2coYFx1MjcwNSBab25hIGRlIGZhcm1pbmcgZXN0YWJsZWNpZGE6IHRpbGUoJHtjb25maWcuVElMRV9YfSwke2NvbmZpZy5USUxFX1l9KSBiYXNlKCR7bG9jYWxYfSwke2xvY2FsWX0pIHJhZGlvKCR7Y29uZmlnLkZBUk1fUkFESVVTfXB4KWApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEd1YXJkYXIgY29uZmlndXJhY2lcdTAwRjNuXG4gICAgICAgICAgICAgICAgc2F2ZUZhcm1DZmcoY29uZmlnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9nKCdFcnJvciBpbnRlcmNlcHRhbmRvIHBpeGVsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnaW5hbEZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgICB9O1xuICAgICAgXG4gICAgICAvLyBUaW1lb3V0IHBhcmEgc2VsZWNjaVx1MDBGM24gZGUgcG9zaWNpXHUwMEYzblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChjb25maWcuc2VsZWN0aW5nUG9zaXRpb24pIHtcbiAgICAgICAgICB3aW5kb3cuZmV0Y2ggPSBvcmlnaW5hbEZldGNoO1xuICAgICAgICAgIGNvbmZpZy5zZWxlY3RpbmdQb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgIHNldFN0YXR1cyh0KCdmYXJtLnBvc2l0aW9uVGltZW91dCcpLCAnZXJyb3InKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTIwMDAwKTsgLy8gMiBtaW51dG9zXG4gICAgfSk7XG4gIH1cbiAgXG4gIC8vIEVzY3VjaGFyIGNhbWJpb3MgZGUgaWRpb21hXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsYW5ndWFnZUNoYW5nZWQnLCB1cGRhdGVUZXh0cyk7XG4gIFxuICAvLyBBUEkgcFx1MDBGQWJsaWNhIGRlIGxhIFVJXG4gIHJldHVybiB7XG4gICAgc2V0U3RhdHVzLFxuICAgIHVwZGF0ZVN0YXRzLFxuICAgIGZsYXNoRWZmZWN0LFxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlcyxcbiAgICB1cGRhdGVUZXh0cyxcbiAgICBkZXN0cm95OiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbGFuZ3VhZ2VDaGFuZ2VkJywgdXBkYXRlVGV4dHMpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzaGFkb3dIb3N0KTtcbiAgICB9LFxuICAgIHVwZGF0ZUNvbmZpZzogdXBkYXRlSW5wdXRzRnJvbUNvbmZpZyxcbiAgICBnZXRFbGVtZW50OiAoKSA9PiBzaGFkb3dIb3N0XG4gIH07XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGF1dG8tY2FsaWJyYXIgbGFzIGNvb3JkZW5hZGFzIGRlbCB0aWxlIGJhc1x1MDBFMW5kb3NlIGVuIGxhIHBvc2ljaVx1MDBGM24gZGVsIHZpZXdwb3J0XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0b0NhbGlicmF0ZVRpbGUoY29uZmlnKSB7XG4gIHRyeSB7XG4gICAgbG9nKCdcdUQ4M0NcdURGQUYgSW5pY2lhbmRvIGF1dG8tY2FsaWJyYWNpXHUwMEYzbiBkZWwgdGlsZS4uLicpO1xuICAgIC8vIFNpIHlhIGhheSB1bmEgem9uYSBzZWxlY2Npb25hZGEgeSB1biB0aWxlIGRlZmluaWRvLCBubyBmb3J6YXIgbnVldmEgY2FsaWJyYWNpXHUwMEYzblxuICAgIGlmIChjb25maWcuUE9TSVRJT05fU0VMRUNURUQgJiYgY29uZmlnLkJBU0VfWCAhPSBudWxsICYmIGNvbmZpZy5CQVNFX1kgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUoY29uZmlnLlRJTEVfWCkgJiYgTnVtYmVyLmlzRmluaXRlKGNvbmZpZy5USUxFX1kpKSB7XG4gICAgICBsb2coYFx1MjEzOVx1RkUwRiBZYSBleGlzdGUgem9uYSBzZWxlY2Npb25hZGEuIFNlIG1hbnRpZW5lIHRpbGUgYWN0dWFsOiAoJHtjb25maWcuVElMRV9YfSwgJHtjb25maWcuVElMRV9ZfSlgKTtcbiAgICAgIHNhdmVGYXJtQ2ZnKGNvbmZpZyk7XG4gICAgICByZXR1cm4geyB0aWxlWDogY29uZmlnLlRJTEVfWCwgdGlsZVk6IGNvbmZpZy5USUxFX1ksIHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9XG4gICAgXG4gICAgLy8gQnVzY2FyIGVsZW1lbnRvcyBxdWUgaW5kaXF1ZW4gbGEgcG9zaWNpXHUwMEYzbiBhY3R1YWxcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgd2luZG93LlVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBoYXNoUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgXG4gICAgLy8gSW50ZW50YXIgZXh0cmFlciBjb29yZGVuYWRhcyBkZSBsYSBVUkxcbiAgICBsZXQgdGlsZVgsIHRpbGVZO1xuICAgIFxuICAgIC8vIEJ1c2NhciBlbiBxdWVyeSBwYXJhbXNcbiAgICBpZiAodXJsUGFyYW1zLmhhcygneCcpICYmIHVybFBhcmFtcy5oYXMoJ3knKSkge1xuICAgICAgdGlsZVggPSBwYXJzZUludCh1cmxQYXJhbXMuZ2V0KCd4JykpO1xuICAgICAgdGlsZVkgPSBwYXJzZUludCh1cmxQYXJhbXMuZ2V0KCd5JykpO1xuICAgIH1cbiAgICBcbiAgICAvLyBCdXNjYXIgZW4gaGFzaCAoZm9ybWF0byAjeCx5IG8gc2ltaWxhcilcbiAgICBpZiAoIXRpbGVYICYmICF0aWxlWSAmJiBoYXNoUGFyYW1zKSB7XG4gICAgICBjb25zdCBoYXNoTWF0Y2ggPSBoYXNoUGFyYW1zLm1hdGNoKC8jKC0/XFxkKyksKC0/XFxkKykvKTtcbiAgICAgIGlmIChoYXNoTWF0Y2gpIHtcbiAgICAgICAgdGlsZVggPSBwYXJzZUludChoYXNoTWF0Y2hbMV0pO1xuICAgICAgICB0aWxlWSA9IHBhcnNlSW50KGhhc2hNYXRjaFsyXSk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEJ1c2NhciBlbGVtZW50b3MgRE9NIHF1ZSBpbmRpcXVlbiBwb3NpY2lcdTAwRjNuXG4gICAgaWYgKCF0aWxlWCAmJiAhdGlsZVkpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS14XSwgW2RhdGEteV0sIC5jb29yZGluYXRlcywgLnBvc2l0aW9uJyk7XG4gICAgICBmb3IgKGNvbnN0IGVsIG9mIHBvc2l0aW9uRWxlbWVudHMpIHtcbiAgICAgICAgY29uc3QgeCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgfHwgZWwuZ2V0QXR0cmlidXRlKCd4Jyk7XG4gICAgICAgIGNvbnN0IHkgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpIHx8IGVsLmdldEF0dHJpYnV0ZSgneScpO1xuICAgICAgICBpZiAoeCAmJiB5KSB7XG4gICAgICAgICAgdGlsZVggPSBwYXJzZUludCh4KTtcbiAgICAgICAgICB0aWxlWSA9IHBhcnNlSW50KHkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEJ1c2NhciBlbiBlbCB0ZXh0byB2aXNpYmxlIGRlIGxhIHBcdTAwRTFnaW5hXG4gICAgaWYgKCF0aWxlWCAmJiAhdGlsZVkpIHtcbiAgICAgIGNvbnN0IHRleHRDb250ZW50ID0gZG9jdW1lbnQuYm9keS50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgIGNvbnN0IGNvb3JkTWF0Y2ggPSB0ZXh0Q29udGVudC5tYXRjaCgvKD86dGlsZXxwb3N8cG9zaXRpb24pP1xccypbKFtdP1xccyooLT9cXGQrKVxccypbLDtdXFxzKigtP1xcZCspXFxzKlspXFxdXT8vaSk7XG4gICAgICBpZiAoY29vcmRNYXRjaCkge1xuICAgICAgICB0aWxlWCA9IHBhcnNlSW50KGNvb3JkTWF0Y2hbMV0pO1xuICAgICAgICB0aWxlWSA9IHBhcnNlSW50KGNvb3JkTWF0Y2hbMl0pO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBWYWxvcmVzIHBvciBkZWZlY3RvIHNpIG5vIHNlIGVuY3VlbnRyYSBuYWRhXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUodGlsZVgpIHx8ICFOdW1iZXIuaXNGaW5pdGUodGlsZVkpKSB7XG4gICAgICB0aWxlWCA9IDA7XG4gICAgICB0aWxlWSA9IDA7XG4gICAgICBsb2coJ1x1MjZBMFx1RkUwRiBObyBzZSBwdWRpZXJvbiBkZXRlY3RhciBjb29yZGVuYWRhcyBhdXRvbVx1MDBFMXRpY2FtZW50ZSwgdXNhbmRvICgwLDApJyk7XG4gICAgfVxuICAgIFxuICAgIC8vIFZhbGlkYXIgcXVlIGxhcyBjb29yZGVuYWRhcyBzZWFuIHJhem9uYWJsZXNcbiAgICBpZiAoTWF0aC5hYnModGlsZVgpID4gMTAwMDAwMCB8fCBNYXRoLmFicyh0aWxlWSkgPiAxMDAwMDAwKSB7XG4gICAgICBsb2coJ1x1MjZBMFx1RkUwRiBDb29yZGVuYWRhcyBkZXRlY3RhZGFzIHBhcmVjZW4gaW5jb3JyZWN0YXMsIGxpbWl0YW5kbyBhIHJhbmdvIHZcdTAwRTFsaWRvJyk7XG4gICAgICB0aWxlWCA9IE1hdGgubWF4KC0xMDAwMDAwLCBNYXRoLm1pbigxMDAwMDAwLCB0aWxlWCkpO1xuICAgICAgdGlsZVkgPSBNYXRoLm1heCgtMTAwMDAwMCwgTWF0aC5taW4oMTAwMDAwMCwgdGlsZVkpKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBjb25maWd1cmFjaVx1MDBGM25cbiAgICBjb25maWcuVElMRV9YID0gdGlsZVg7XG4gICAgY29uZmlnLlRJTEVfWSA9IHRpbGVZO1xuICAgIFxuICAgIGxvZyhgXHUyNzA1IFRpbGUgY2FsaWJyYWRvIGF1dG9tXHUwMEUxdGljYW1lbnRlOiAoJHt0aWxlWH0sICR7dGlsZVl9KWApO1xuICAgIFxuICAgIC8vIEd1YXJkYXIgbGEgY29uZmlndXJhY2lcdTAwRjNuIGNhbGlicmFkYVxuICAgIHNhdmVGYXJtQ2ZnKGNvbmZpZyk7XG4gICAgXG4gICAgcmV0dXJuIHsgdGlsZVgsIHRpbGVZLCBzdWNjZXNzOiB0cnVlIH07XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKCdcdTI3NEMgRXJyb3IgZW4gYXV0by1jYWxpYnJhY2lcdTAwRjNuOicsIGVycm9yKTtcbiAgICByZXR1cm4geyB0aWxlWDogMCwgdGlsZVk6IDAsIHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3VudEZhcm1VSSgpIHtcbiAgLy8gRXN0YSBmdW5jaVx1MDBGM24gc2VyXHUwMEUxIGxsYW1hZGEgZGVzZGUgZmFybS9pbmRleC5qc1xuICBsb2coJ1x1RDgzRFx1RENGMSBNb250YW5kbyBVSSBkZWwgZmFybS4uLicpO1xuICBcbiAgLy8gQ3JlYXIgdW5hIFVJIGJcdTAwRTFzaWNhIHBhcmEgZWwgZmFybVxuICBjb25zdCB1aSA9IGNyZWF0ZUZhcm1VSShcbiAgICBGQVJNX0RFRkFVTFRTLFxuICAgICgpID0+IGxvZyh0KCdmYXJtLnN0YXJ0aW5nQm90JykpLFxuICAgICgpID0+IGxvZyh0KCdmYXJtLnN0b3BwaW5nQm90JykpLFxuICAgICgpID0+IGxvZyh0KCdmYXJtLmNhbGlicmF0aW5nJykpXG4gICk7XG4gIFxuICByZXR1cm4ge1xuICAgIHNldFN0YXR1czogKG1zZykgPT4ge1xuICAgICAgbG9nKG1zZyk7XG4gICAgICB1aS5zZXRTdGF0dXMobXNnKTtcbiAgICB9LFxuICAgIHVwZGF0ZVN0YXRzOiB1aS51cGRhdGVTdGF0cyxcbiAgICBmbGFzaEVmZmVjdDogdWkuZmxhc2hFZmZlY3QsXG4gICAgdXBkYXRlVGV4dHM6IHVpLnVwZGF0ZVRleHRzLFxuICAgIGRlc3Ryb3k6IHVpLmRlc3Ryb3lcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcblxuY29uc3QgcmFuZEludCA9IChuKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUNvb3JkSW5UaWxlKHRpbGVYLCB0aWxlWSwgbWFyZ2luID0gMC4wNSkge1xuICBjb25zdCBzaXplID0gMzAwMDtcbiAgY29uc3QgbSA9IE1hdGguZmxvb3Ioc2l6ZSAqIG1hcmdpbik7XG4gIGNvbnN0IHJ4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHNpemUgLSAyKm0pKSArIG07XG4gIGNvbnN0IHJ5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHNpemUgLSAyKm0pKSArIG07XG4gIHJldHVybiB7IHg6IHJ4LCB5OiByeSwgYWJzWDogdGlsZVggKiBzaXplICsgcngsIGFic1k6IHRpbGVZICogc2l6ZSArIHJ5IH07XG59XG5cbi8vIEZhcm0tc3BlY2lmaWMgY29vcmRpbmF0ZSBnZW5lcmF0aW9uIHVzYW5kbyBwb3NpY2lcdTAwRjNuIGJhc2UgeSByYWRpb1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUNvb3JkcyhjZmcpIHtcbiAgLy8gVmVyaWZpY2FyIHNpIHNlIGhhIHNlbGVjY2lvbmFkbyB1bmEgcG9zaWNpXHUwMEYzbiBiYXNlXG4gIGlmICghY2ZnLlBPU0lUSU9OX1NFTEVDVEVEIHx8IGNmZy5CQVNFX1ggPT09IG51bGwgfHwgY2ZnLkJBU0VfWSA9PT0gbnVsbCkge1xuICAgIGxvZygnXHUyNkEwXHVGRTBGIE5vIHNlIGhhIHNlbGVjY2lvbmFkbyB1bmEgcG9zaWNpXHUwMEYzbiBiYXNlLiBVc2FuZG8gY29vcmRlbmFkYXMgYWxlYXRvcmlhcyBmYWxsYmFjay4nKTtcbiAgICAvLyBGYWxsYmFjayBhIGNvb3JkZW5hZGFzIGFsZWF0b3JpYXMgZW4gZWwgdGlsZSAoY29tcG9ydGFtaWVudG8gYW50ZXJpb3IpXG4gICAgY29uc3QgbWFyZ2luID0gTWF0aC5mbG9vcihjZmcuVElMRV9TSVpFICogMC4wNSk7XG4gICAgY29uc3Qgc2FmZVNpemUgPSBjZmcuVElMRV9TSVpFIC0gKG1hcmdpbiAqIDIpO1xuICAgIFxuICAgIGlmIChzYWZlU2l6ZSA8PSAwKSB7XG4gICAgICByZXR1cm4gW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNmZy5USUxFX1NJWkUpLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjZmcuVElMRV9TSVpFKV07XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGxvY2FsWCA9IG1hcmdpbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNhZmVTaXplKTtcbiAgICBjb25zdCBsb2NhbFkgPSBtYXJnaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzYWZlU2l6ZSk7XG4gICAgcmV0dXJuIFtsb2NhbFgsIGxvY2FsWV07XG4gIH1cbiAgXG4gIC8vIEVORk9RVUUgU0lNUExJRklDQURPOiBHZW5lcmFyIGNvb3JkZW5hZGFzIGRpcmVjdGFtZW50ZSBlbiBlbCB0aWxlIGFjdHVhbFxuICAvLyBwYXJhIGV2aXRhciBwcm9ibGVtYXMgZGUgY29udmVyc2lcdTAwRjNuIGFic29sdXRhL2xvY2FsXG4gIFxuICBjb25zdCByYWRpdXMgPSBjZmcuRkFSTV9SQURJVVM7XG4gIGNvbnN0IG1heFNpemUgPSBjZmcuVElMRV9TSVpFIC0gMTsgLy8gMjk5OSBwYXJhIHRpbGUgZGUgMzAwMFxuICBcbiAgLy8gR2VuZXJhciB1biBcdTAwRTFuZ3VsbyBhbGVhdG9yaW8geSB1bmEgZGlzdGFuY2lhIGFsZWF0b3JpYSBkZW50cm8gZGVsIHJhZGlvXG4gIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJO1xuICBjb25zdCBkaXN0YW5jZSA9IE1hdGgucmFuZG9tKCkgKiByYWRpdXM7XG4gIFxuICAvLyBDYWxjdWxhciBvZmZzZXQgZGVzZGUgbGEgcG9zaWNpXHUwMEYzbiBiYXNlIChsb2NhbClcbiAgY29uc3Qgb2Zmc2V0WCA9IE1hdGgucm91bmQoZGlzdGFuY2UgKiBNYXRoLmNvcyhhbmdsZSkpO1xuICBjb25zdCBvZmZzZXRZID0gTWF0aC5yb3VuZChkaXN0YW5jZSAqIE1hdGguc2luKGFuZ2xlKSk7XG4gIFxuICAvLyBDYWxjdWxhciBjb29yZGVuYWRhcyBsb2NhbGVzIGZpbmFsZXMgZGlyZWN0YW1lbnRlXG4gIGxldCBsb2NhbFggPSBjZmcuQkFTRV9YICsgb2Zmc2V0WDtcbiAgbGV0IGxvY2FsWSA9IGNmZy5CQVNFX1kgKyBvZmZzZXRZO1xuICBcbiAgLy8gVFJJUExFIFZBTElEQUNJXHUwMEQzTjogQXBsaWNhciBsXHUwMEVEbWl0ZXMgZXN0cmljdG9zIG1cdTAwRkFsdGlwbGVzIHZlY2VzXG4gIGxvY2FsWCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGxvY2FsWCkpO1xuICBsb2NhbFkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBsb2NhbFkpKTtcbiAgXG4gIC8vIFNlZ3VuZGEgdmFsaWRhY2lcdTAwRjNuIGNvbiBNYXRoLmFicyBjb21vIHJlc3BhbGRvXG4gIGlmIChsb2NhbFggPCAwIHx8IGxvY2FsWCA+IG1heFNpemUgfHwgbG9jYWxZIDwgMCB8fCBsb2NhbFkgPiBtYXhTaXplKSB7XG4gICAgbG9nKGBcdTI2QTBcdUZFMEYgUHJpbWVyYSB2YWxpZGFjaVx1MDBGM24gZmFsbFx1MDBGMzogKCR7bG9jYWxYfSwke2xvY2FsWX0pLCBhcGxpY2FuZG8gY29ycmVjY2lcdTAwRjNuIGFic29sdXRhLi4uYCk7XG4gICAgbG9jYWxYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4U2l6ZSwgTWF0aC5hYnMobG9jYWxYKSkpO1xuICAgIGxvY2FsWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIE1hdGguYWJzKGxvY2FsWSkpKTtcbiAgfVxuICBcbiAgLy8gVGVyY2VyYSB2YWxpZGFjaVx1MDBGM24gZmluYWwgLSBmb3J6YXIgcmFuZ28gdlx1MDBFMWxpZG9cbiAgbG9jYWxYID0gTWF0aC5mbG9vcihNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBsb2NhbFgpKSk7XG4gIGxvY2FsWSA9IE1hdGguZmxvb3IoTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4U2l6ZSwgbG9jYWxZKSkpO1xuICBcbiAgLy8gVmFsaWRhY2lcdTAwRjNuIGZpbmFsIGNyXHUwMEVEdGljYVxuICBpZiAobG9jYWxYIDwgMCB8fCBsb2NhbFggPiBtYXhTaXplIHx8IGxvY2FsWSA8IDAgfHwgbG9jYWxZID4gbWF4U2l6ZSkge1xuICAgIGxvZyhgXHVEODNEXHVERUE4IENSSVRJQ0FMIEVSUk9SOiBDb29yZGVuYWRhcyBhXHUwMEZBbiBpbnZcdTAwRTFsaWRhcyBkZXNwdVx1MDBFOXMgZGUgdHJpcGxlIHZhbGlkYWNpXHUwMEYzbjogKCR7bG9jYWxYfSwke2xvY2FsWX0pLiBGb3J6YW5kbyBjb29yZGVuYWRhcyBzZWd1cmFzLmApO1xuICAgIGxvY2FsWCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGNmZy5CQVNFX1gpKTtcbiAgICBsb2NhbFkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBjZmcuQkFTRV9ZKSk7XG4gIH1cbiAgXG4gIC8vIExvZyBvY2FzaW9uYWwgcGFyYSBkZWJ1Z2dpbmcgY29uIHZhbGlkYWNpXHUwMEYzblxuICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMSkge1xuICAgIGxvZyhgXHVEODNDXHVERkFGIENvb3JkZW5hZGFzIGVuIHJhZGlvOiBiYXNlKCR7Y2ZnLkJBU0VfWH0sJHtjZmcuQkFTRV9ZfSkgb2Zmc2V0KCR7b2Zmc2V0WH0sJHtvZmZzZXRZfSkgZmluYWwoJHtsb2NhbFh9LCR7bG9jYWxZfSkgdGlsZSgke2NmZy5USUxFX1h9LCR7Y2ZnLlRJTEVfWX0pIHZhbGlkPSR7bG9jYWxYID49IDAgJiYgbG9jYWxYIDw9IG1heFNpemUgJiYgbG9jYWxZID49IDAgJiYgbG9jYWxZIDw9IG1heFNpemV9YCk7XG4gIH1cbiAgXG4gIHJldHVybiBbbG9jYWxYLCBsb2NhbFldO1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSB2ZXJpZmljYXIgc2kgdW5hIHBvc2ljaVx1MDBGM24gZXN0XHUwMEUxIGRlbnRybyBkZWwgcmFkaW8gZGUgZmFybWluZ1xuZXhwb3J0IGZ1bmN0aW9uIGlzV2l0aGluRmFybVJhZGl1cyh4LCB5LCBjZmcpIHtcbiAgaWYgKCFjZmcuUE9TSVRJT05fU0VMRUNURUQgfHwgY2ZnLkJBU0VfWCA9PT0gbnVsbCB8fCBjZmcuQkFTRV9ZID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICAvLyBDYWxjdWxhciBkaXN0YW5jaWEgZGlyZWN0YW1lbnRlIGVuIGNvb3JkZW5hZGFzIGxvY2FsZXMgKHNpbXBsaWZpY2FkbylcbiAgY29uc3QgZGVsdGFYID0geCAtIGNmZy5CQVNFX1g7XG4gIGNvbnN0IGRlbHRhWSA9IHkgLSBjZmcuQkFTRV9ZO1xuICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkZWx0YVggKiBkZWx0YVggKyBkZWx0YVkgKiBkZWx0YVkpO1xuICBcbiAgcmV0dXJuIGRpc3RhbmNlIDw9IGNmZy5GQVJNX1JBRElVUztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlTXVsdGlwbGVDb29yZHMoY291bnQsIGNmZykge1xuICAvLyBTaSBubyBzZSBoYSBzZWxlY2Npb25hZG8gdW5hIHBvc2ljaVx1MDBGM24sIHVzYXIgY29vcmRlbmFkYXMgYWxlYXRvcmlhcyBkZSBmYWxsYmFja1xuICBpZiAoIWNmZy5QT1NJVElPTl9TRUxFQ1RFRCB8fCBjZmcuQkFTRV9YID09PSBudWxsIHx8IGNmZy5CQVNFX1kgPT09IG51bGwpIHtcbiAgICBsb2coJ1x1MjZBMFx1RkUwRiBObyBzZSBoYSBzZWxlY2Npb25hZG8gdW5hIHBvc2ljaVx1MDBGM24gYmFzZS4gVXNhbmRvIGNvb3JkZW5hZGFzIGFsZWF0b3JpYXMgZmFsbGJhY2suJyk7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgY29uc3QgbWFyZ2luID0gTWF0aC5mbG9vcihjZmcuVElMRV9TSVpFICogMC4wNSk7XG4gICAgY29uc3Qgc2FmZVNpemUgPSBjZmcuVElMRV9TSVpFIC0gKG1hcmdpbiAqIDIpO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgY29uc3QgbG9jYWxYID0gbWFyZ2luICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2FmZVNpemUpO1xuICAgICAgY29uc3QgbG9jYWxZID0gbWFyZ2luICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2FmZVNpemUpO1xuICAgICAgY29vcmRzLnB1c2gobG9jYWxYLCBsb2NhbFkpO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgLy8gTlVFVk8gRU5GT1FVRTogR2VuZXJhciBsXHUwMEVEbmVhIHJlY3RhIGNvbW8gQXV0by1JbWFnZVxuICBjb25zdCBjb29yZHMgPSBbXTtcbiAgY29uc3QgbWF4U2l6ZSA9IGNmZy5USUxFX1NJWkUgLSAxOyAvLyAyOTk5IHBhcmEgdGlsZSBkZSAzMDAwXG4gIFxuICAvLyBQdW50byBkZSBpbmljaW86IHBvc2ljaVx1MDBGM24gYmFzZSBzZWxlY2Npb25hZGFcbiAgbGV0IGN1cnJlbnRYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4U2l6ZSwgY2ZnLkJBU0VfWCkpO1xuICBsZXQgY3VycmVudFkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBjZmcuQkFTRV9ZKSk7XG4gIFxuICAvLyBHZW5lcmFyIGxcdTAwRURuZWEgaG9yaXpvbnRhbCAoY29tbyBlbCBlamVtcGxvIGRlbCB1c3VhcmlvOiA2MjIsNjM1LDYyMyw2MzUsNjI0LDYzNS4uLilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgLy8gQXNlZ3VyYXIgcXVlIGxhcyBjb29yZGVuYWRhcyBlc3RcdTAwRTFuIGRlbnRybyBkZWwgcmFuZ28gdlx1MDBFMWxpZG9cbiAgICBjdXJyZW50WCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGN1cnJlbnRYKSk7XG4gICAgY3VycmVudFkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBjdXJyZW50WSkpO1xuICAgIFxuICAgIGNvb3Jkcy5wdXNoKGN1cnJlbnRYLCBjdXJyZW50WSk7XG4gICAgXG4gICAgLy8gQXZhbnphciBoYWNpYSBsYSBkZXJlY2hhIChsXHUwMEVEbmVhIGhvcml6b250YWwpXG4gICAgY3VycmVudFgrKztcbiAgICBcbiAgICAvLyBTaSBsbGVnYW1vcyBhbCBib3JkZSBkZXJlY2hvLCBwYXNhciBhIGxhIHNpZ3VpZW50ZSBsXHUwMEVEbmVhXG4gICAgaWYgKGN1cnJlbnRYID4gbWF4U2l6ZSkge1xuICAgICAgY3VycmVudFggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBjZmcuQkFTRV9YKSk7IC8vIFZvbHZlciBhbCBpbmljaW8gWFxuICAgICAgY3VycmVudFkrKzsgLy8gQmFqYXIgdW5hIGxcdTAwRURuZWFcbiAgICAgIFxuICAgICAgLy8gU2kgbGxlZ2Ftb3MgYWwgYm9yZGUgaW5mZXJpb3IsIHZvbHZlciBhcnJpYmFcbiAgICAgIGlmIChjdXJyZW50WSA+IG1heFNpemUpIHtcbiAgICAgICAgY3VycmVudFkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBjZmcuQkFTRV9ZKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAvLyBMb2cgcGFyYSBkZWJ1Z2dpbmcgLSBtb3N0cmFyIHBhdHJcdTAwRjNuIGRlIGxcdTAwRURuZWEgcmVjdGEgZ2VuZXJhZG9cbiAgaWYgKGNvb3Jkcy5sZW5ndGggPj0gNCkge1xuICAgIGxvZyhgXHVEODNDXHVERkFGIExcdTAwRURuZWEgcmVjdGEgZ2VuZXJhZGE6IFske2Nvb3Jkcy5zbGljZSgwLCA4KS5qb2luKCcsJyl9Li4uXSB0b3RhbDogJHtjb29yZHMubGVuZ3RoLzJ9IHBcdTAwRUR4ZWxlc2ApO1xuICB9XG4gIFxuICByZXR1cm4gY29vcmRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNdWx0aXBsZUNvbG9ycyhjb3VudCwgY2ZnKSB7XG4gIGNvbnN0IGNvbG9ycyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICBjb2xvcnMucHVzaChuZXh0Q29sb3IoY2ZnKSk7XG4gIH1cbiAgcmV0dXJuIGNvbG9ycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRDb2xvcihjZmcpIHtcbiAgaWYgKGNmZy5DT0xPUl9NT0RFID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIGNmZy5DT0xPUl9GSVhFRDtcbiAgfSBlbHNlIHtcbiAgICAvLyBNb2RvIHJhbmRvbTogY29sb3IgZW50cmUgQ09MT1JfTUlOIHkgQ09MT1JfTUFYIChpbmNsdXNpdm8pXG4gICAgY29uc3Qgc3BhbiA9IGNmZy5DT0xPUl9NQVggLSBjZmcuQ09MT1JfTUlOICsgMTtcbiAgICByZXR1cm4gY2ZnLkNPTE9SX01JTiArIHJhbmRJbnQoc3Bhbik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRDb2xvckxlZ2FjeShwYWxldHRlKSB7XG4gIHJldHVybiBwYWxldHRlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBhbGV0dGUubGVuZ3RoKV07XG59XG4iLCAiZXhwb3J0IGNvbnN0IHNsZWVwID0gKG1zKSA9PiBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgbXMpKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJldHJ5KGZuLCB7IHRyaWVzID0gMywgYmFzZSA9IDUwMCB9ID0ge30pIHtcbiAgbGV0IGxhc3Q7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpZXM7IGkrKykge1xuICAgIHRyeSB7IHJldHVybiBhd2FpdCBmbigpOyB9XG4gICAgY2F0Y2ggKGUpIHsgbGFzdCA9IGU7IGF3YWl0IHNsZWVwKGJhc2UgKiAyICoqIGkpOyB9XG4gIH1cbiAgdGhyb3cgbGFzdDtcbn1cblxuZXhwb3J0IGNvbnN0IHJhbmRJbnQgPSAobikgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbik7XG5cbi8vIFNsZWVwIHdpdGggY291bnRkb3duIChmcm9tIGZhcm0pXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2xlZXBXaXRoQ291bnRkb3duKG1zLCBvblVwZGF0ZSwgc3RhdGUpIHtcbiAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgZW5kVGltZSA9IHN0YXJ0VGltZSArIG1zO1xuICBcbiAgd2hpbGUgKERhdGUubm93KCkgPCBlbmRUaW1lICYmICghc3RhdGUgfHwgc3RhdGUucnVubmluZykpIHtcbiAgICBjb25zdCByZW1haW5pbmcgPSBlbmRUaW1lIC0gRGF0ZS5ub3coKTtcbiAgICBcbiAgICBpZiAob25VcGRhdGUpIHtcbiAgICAgIG9uVXBkYXRlKHJlbWFpbmluZyk7XG4gICAgfVxuICAgIFxuICAgIGF3YWl0IHNsZWVwKE1hdGgubWluKDEwMDAsIHJlbWFpbmluZykpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgZW5zdXJlVG9rZW4gfSBmcm9tIFwiLi4vY29yZS90dXJuc3RpbGUuanNcIjtcbmltcG9ydCB7IHBvc3RQaXhlbEJhdGNoSW1hZ2UgfSBmcm9tIFwiLi4vY29yZS93cGxhY2UtYXBpLmpzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZU11bHRpcGxlQ29vcmRzLCBnZW5lcmF0ZU11bHRpcGxlQ29sb3JzIH0gZnJvbSBcIi4vY29vcmRzLmpzXCI7XG5pbXBvcnQgeyBzbGVlcCwgc2xlZXBXaXRoQ291bnRkb3duIH0gZnJvbSBcIi4uL2NvcmUvdGltaW5nLmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcblxuLy8gVXBkYXRlIGNhbnZhcyBwaXhlbCBmdW5jdGlvblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNhbnZhc1BpeGVsKGxvY2FsWCwgbG9jYWxZLCBjb2xvcikge1xuICB0cnkge1xuICAgIC8vIEJ1c2NhciBlbCBjYW52YXMgYWN0aXZvXG4gICAgY29uc3QgY2FudmFzZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdjYW52YXMnKTtcbiAgICBmb3IgKGNvbnN0IGNhbnZhcyBvZiBjYW52YXNlcykge1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBpZiAoY3R4KSB7XG4gICAgICAgIC8vIENvbnZlcnRpciBjb2xvciAoblx1MDBGQW1lcm8pIGEgaGV4XG4gICAgICAgIGNvbnN0IGNvbG9ySGV4ID0gdHlwZW9mIGNvbG9yID09PSAnbnVtYmVyJyA/IGAjJHtjb2xvci50b1N0cmluZygxNikucGFkU3RhcnQoNiwgJzAnKX1gIDogY29sb3I7XG4gICAgICAgIFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JIZXg7XG4gICAgICAgIGN0eC5maWxsUmVjdChsb2NhbFgsIGxvY2FsWSwgMSwgMSk7XG4gICAgICAgIFxuICAgICAgICAvLyBUcmlnZ2VyIHJlZHJhdyBldmVudCBzaSBleGlzdGVcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5FdmVudCkge1xuICAgICAgICAgIGNhbnZhcy5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuRXZlbnQoJ3BpeGVsLXVwZGF0ZWQnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKCdFcnJvciBhY3R1YWxpemFuZG8gY2FudmFzOicsIGVycm9yKTtcbiAgfVxufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSByZWZyZXNjYXIgZWwgdGlsZSBlc3BlY1x1MDBFRGZpY28gKHNvbG8gYWN0dWFsaXphY2lcdTAwRjNuIHZpc3VhbCwgc2luIEdFVClcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoVGlsZSh0aWxlWCwgdGlsZVkpIHtcbiAgdHJ5IHtcbiAgICAvLyBTb2xvIGFjdHVhbGl6YXIgdmlzdWFsbWVudGUgZWwgRE9NIHNpbiBoYWNlciBHRVRcbiAgICAvLyBFbCBHRVQgYSAvczAvdGlsZSBubyBmdW5jaW9uYSB5IG5vIGVzIG5lY2VzYXJpbyBwYXJhIGVsIGZ1bmNpb25hbWllbnRvXG4gICAgY29uc3QgdGlsZVNlbGVjdG9yID0gYFtkYXRhLXRpbGU9XCIke3RpbGVYfS0ke3RpbGVZfVwiXSwgLnRpbGUtJHt0aWxlWH0tJHt0aWxlWX0sIFtkYXRhLXRpbGUteD1cIiR7dGlsZVh9XCJdW2RhdGEtdGlsZS15PVwiJHt0aWxlWX1cIl1gO1xuICAgIGNvbnN0IHRpbGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aWxlU2VsZWN0b3IpO1xuICAgIFxuICAgIGlmICh0aWxlRWxlbWVudCkge1xuICAgICAgLy8gQVx1MDBGMWFkaXIgdW5hIGNsYXNlIHRlbXBvcmFsIHBhcmEgaW5kaWNhciBhY3R1YWxpemFjaVx1MDBGM25cbiAgICAgIHRpbGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3RpbGUtdXBkYXRpbmcnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aWxlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0aWxlLXVwZGF0aW5nJyk7XG4gICAgICAgIHRpbGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3RpbGUtdXBkYXRlZCcpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRpbGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RpbGUtdXBkYXRlZCcpLCAxMDAwKTtcbiAgICAgIH0sIDEwMCk7XG4gICAgICBsb2coYFRpbGUgKCR7dGlsZVh9LCR7dGlsZVl9KSBhY3R1YWxpemFkbyB2aXN1YWxtZW50ZWApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJbnRlbnRhciBmb3J6YXIgdW5hIGFjdHVhbGl6YWNpXHUwMEYzbiBkZWwgY2FudmFzIGdlbmVyYWxcbiAgICAgIGNvbnN0IGNhbnZhc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnY2FudmFzJyk7XG4gICAgICBjYW52YXNFbGVtZW50cy5mb3JFYWNoKGNhbnZhcyA9PiB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgLy8gVHJpZ2dlciByZWRyYXcgc2luIGhhY2VyIGNhbWJpb3NcbiAgICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIDEsIDEpO1xuICAgICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsb2coYEFjdHVhbGl6YWNpXHUwMEYzbiB2aXN1YWwgZ2VuXHUwMEU5cmljYSByZWFsaXphZGEgcGFyYSB0aWxlICgke3RpbGVYfSwke3RpbGVZfSlgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKCdFcnJvciBlbiBhY3R1YWxpemFjaVx1MDBGM24gdmlzdWFsIGRlbCB0aWxlOicsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGFpbnRPbmNlKGNmZywgc3RhdGUsIHNldFN0YXR1cywgZmxhc2hFZmZlY3QsIGdldFNlc3Npb24sIGNoZWNrQmFja2VuZEhlYWx0aCkge1xuICAvLyBWZXJpZmljYXIgcXVlIHNlIGhheWEgc2VsZWNjaW9uYWRvIHVuYSBwb3NpY2lcdTAwRjNuIHZcdTAwRTFsaWRhXG4gIGlmICghY2ZnLlBPU0lUSU9OX1NFTEVDVEVEIHx8IGNmZy5CQVNFX1ggPT09IG51bGwgfHwgY2ZnLkJBU0VfWSA9PT0gbnVsbCkge1xuICAgIHNldFN0YXR1cyhgXHVEODNDXHVERkFGIFNlbGVjY2lvbmEgdW5hIHpvbmEgcHJpbWVybyB1c2FuZG8gJ1NlbGVjY2lvbmFyIFpvbmEnYCwgJ2Vycm9yJyk7XG4gICAgbG9nKGBQaW50YWRvIGNhbmNlbGFkbzogbm8gc2UgaGEgc2VsZWNjaW9uYWRvIHVuYSBwb3NpY2lcdTAwRjNuIGJhc2VgKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIC8vIFZlcmlmaWNhciBxdWUgbGFzIGNvb3JkZW5hZGFzIGRlbCB0aWxlIHNlYW4gdlx1MDBFMWxpZGFzIGFudGVzIGRlIHBpbnRhclxuICBpZiAoIU51bWJlci5pc0Zpbml0ZShjZmcuVElMRV9YKSB8fCAhTnVtYmVyLmlzRmluaXRlKGNmZy5USUxFX1kpKSB7XG4gICAgc2V0U3RhdHVzKGBcdUQ4M0RcdURFQUIgQ29vcmRlbmFkYXMgZGVsIHRpbGUgaW52XHUwMEUxbGlkYXMgKCR7Y2ZnLlRJTEVfWH0sJHtjZmcuVElMRV9ZfSkuIENhbGlicmEgcHJpbWVyb2AsICdlcnJvcicpO1xuICAgIGxvZyhgUGludGFkbyBjYW5jZWxhZG86IGNvb3JkZW5hZGFzIGRlbCB0aWxlIGludlx1MDBFMWxpZGFzYCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICAvLyBVc2FyIGNhcmdhcyBhY3R1YWxlcyAoeWEgY29uc3VsdGFkYXMgZW4gZWwgbG9vcClcbiAgY29uc3QgYXZhaWxhYmxlQ2hhcmdlcyA9IE1hdGguZmxvb3Ioc3RhdGUuY2hhcmdlcy5jb3VudCk7IC8vIENhcmdhcyBjb21wbGV0YXMgZGlzcG9uaWJsZXNcbiAgXG4gIC8vIFNpIG5vIGhheSBjYXJnYXMgY29tcGxldGFzIGRpc3BvbmlibGVzLCBubyBwaW50YXJcbiAgaWYgKGF2YWlsYWJsZUNoYXJnZXMgPCAxKSB7XG4gICAgc2V0U3RhdHVzKGBcdUQ4M0RcdUREMEIgU2luIGNhcmdhcyBkaXNwb25pYmxlcy4gRXNwZXJhbmRvLi4uYCwgJ2Vycm9yJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICAvLyBDYWxjdWxhciBlbCBuXHUwMEZBbWVybyBcdTAwRjNwdGltbyBkZSBwXHUwMEVEeGVsZXMgYSBwaW50YXJcbiAgLy8gVXNhciBlbCBtXHUwMEVEbmltbyBlbnRyZTogY2FyZ2FzIGRpc3BvbmlibGVzLCBjb25maWd1cmFjaVx1MDBGM24gZGVsIHVzdWFyaW8sIHkgbFx1MDBFRG1pdGUgbVx1MDBFMXhpbW8gKDUwKVxuICBjb25zdCBvcHRpbWFsUGl4ZWxDb3VudCA9IE1hdGgubWluKGF2YWlsYWJsZUNoYXJnZXMsIGNmZy5QSVhFTFNfUEVSX0JBVENILCA1MCk7XG4gIGNvbnN0IHBpeGVsQ291bnQgPSBNYXRoLm1heCgxLCBvcHRpbWFsUGl4ZWxDb3VudCk7XG4gIFxuICAvLyBJbmZvcm1hciBzaSBzZSBhanVzdFx1MDBGMyBlbCBuXHUwMEZBbWVybyBkZSBwXHUwMEVEeGVsZXNcbiAgaWYgKHBpeGVsQ291bnQgPCBjZmcuUElYRUxTX1BFUl9CQVRDSCkge1xuICAgIGxvZyhgQWp1c3RhbmRvIHBcdTAwRUR4ZWxlcyBwb3IgY2FyZ2FzIGNvbXBsZXRhcyBkaXNwb25pYmxlczogJHtwaXhlbENvdW50fS8ke2NmZy5QSVhFTFNfUEVSX0JBVENIfSAoJHthdmFpbGFibGVDaGFyZ2VzfSBjYXJnYXMgY29tcGxldGFzIGRlICR7c3RhdGUuY2hhcmdlcy5jb3VudC50b0ZpeGVkKDIpfSB0b3RhbGVzKWApO1xuICB9XG4gIFxuICBjb25zdCBjb29yZHMgPSBnZW5lcmF0ZU11bHRpcGxlQ29vcmRzKHBpeGVsQ291bnQsIGNmZyk7XG4gIGNvbnN0IGNvbG9ycyA9IGdlbmVyYXRlTXVsdGlwbGVDb2xvcnMocGl4ZWxDb3VudCwgY2ZnKTtcbiAgXG4gIC8vIExhcyBjb29yZGVuYWRhcyBnZW5lcmFkYXMgeWEgc29uIGxvY2FsZXMgYWwgdGlsZSwgbm8gbmVjZXNpdGFtb3MgY1x1MDBFMWxjdWxvcyBhZGljaW9uYWxlc1xuICBjb25zdCBmaXJzdExvY2FsWCA9IGNvb3Jkc1swXTtcbiAgY29uc3QgZmlyc3RMb2NhbFkgPSBjb29yZHNbMV07XG4gIFxuICBzZXRTdGF0dXMoYFx1RDgzQ1x1REYzRSBGYXJtZWFuZG8gJHtwaXhlbENvdW50fSBwXHUwMEVEeGVsZXMgZW4gcmFkaW8gJHtjZmcuRkFSTV9SQURJVVN9cHggZGVzZGUgKCR7Y2ZnLkJBU0VfWH0sJHtjZmcuQkFTRV9ZfSkgdGlsZSgke2NmZy5USUxFX1h9LCR7Y2ZnLlRJTEVfWX0pLi4uYCwgJ3N0YXR1cycpO1xuICBcbiAgY29uc3QgdCA9IGF3YWl0IGVuc3VyZVRva2VuKCk7XG4gIC8vIFVzYXIgZWwgbWlzbW8gZm9ybWF0byBxdWUgQXV0by1JbWFnZTogdGV4dC9wbGFpbiBjb24geyBjb2xvcnMsIGNvb3JkcywgdCB9XG4gIGNvbnN0IHIgPSBhd2FpdCBwb3N0UGl4ZWxCYXRjaEltYWdlKGNmZy5USUxFX1gsIGNmZy5USUxFX1ksIGNvb3JkcywgY29sb3JzLCB0KTtcblxuICBzdGF0ZS5sYXN0ID0geyBcbiAgICB4OiBmaXJzdExvY2FsWCwgXG4gICAgeTogZmlyc3RMb2NhbFksIFxuICAgIGNvbG9yOiBjb2xvcnNbMF0sIFxuICAgIHBpeGVsQ291bnQsXG4gICAgYXZhaWxhYmxlQ2hhcmdlcyxcbiAgICBzdGF0dXM6IHIuc3RhdHVzLCBcbiAgICBqc29uOiByLmpzb24gXG4gIH07XG4gIFxuICBpZiAoci5zdGF0dXMgPT09IDIwMCAmJiByLmpzb24gJiYgKHIuanNvbi5wYWludGVkID4gMCB8fCByLmpzb24ucGFpbnRlZCA9PT0gcGl4ZWxDb3VudCB8fCByLmpzb24ub2spKSB7XG4gICAgY29uc3QgYWN0dWFsUGFpbnRlZCA9IHIuanNvbi5wYWludGVkIHx8IHBpeGVsQ291bnQ7XG4gICAgc3RhdGUucGFpbnRlZCArPSBhY3R1YWxQYWludGVkO1xuICAgIHN0YXRlLnJldHJ5Q291bnQgPSAwOyAvLyBSZXNldGVhciBjb250YWRvciBkZSByZWludGVudG9zIGFsIFx1MDBFOXhpdG9cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIHZpc3VhbG1lbnRlIGVsIGNhbnZhcyBwYXJhIG1cdTAwRkFsdGlwbGVzIHBcdTAwRUR4ZWxlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICBjb25zdCBsb2NhbFggPSBjb29yZHNbaV07XG4gICAgICBjb25zdCBsb2NhbFkgPSBjb29yZHNbaSArIDFdO1xuICAgICAgY29uc3QgY29sb3IgPSBjb2xvcnNbTWF0aC5mbG9vcihpIC8gMildO1xuICAgICAgLy8gTGFzIGNvb3JkZW5hZGFzIHlhIHNvbiBsb2NhbGVzIGFsIHRpbGVcbiAgICAgIGF3YWl0IHVwZGF0ZUNhbnZhc1BpeGVsKGxvY2FsWCwgbG9jYWxZLCBjb2xvcik7XG4gICAgfVxuICAgIFxuICAgIC8vIFJlZnJlc2NhciBlbCB0aWxlIGVzcGVjXHUwMEVEZmljb1xuICAgIGF3YWl0IHJlZnJlc2hUaWxlKGNmZy5USUxFX1gsIGNmZy5USUxFX1kpO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgbGEgc2VzaVx1MDBGM24gcGFyYSBvYnRlbmVyIGxhcyBjYXJnYXMgYWN0dWFsaXphZGFzIChcdTAwRkFuaWNhIGNvbnN1bHRhIHRyYXMgcGludGFyKVxuICAgIGF3YWl0IGdldFNlc3Npb24oKTtcbiAgICBcbiAgICBzZXRTdGF0dXMoYFx1MjcwNSBMb3RlIHBpbnRhZG86ICR7YWN0dWFsUGFpbnRlZH0vJHtwaXhlbENvdW50fSBwXHUwMEVEeGVsZXMgZW4gem9uYSAoJHtjZmcuQkFTRV9YfSwke2NmZy5CQVNFX1l9KSByYWRpbyAke2NmZy5GQVJNX1JBRElVU31weGAsICdzdWNjZXNzJyk7XG4gICAgZmxhc2hFZmZlY3QoKTtcbiAgICBcbiAgICAvLyBFbWl0aXIgZXZlbnRvIHBlcnNvbmFsaXphZG8gcGFyYSBub3RpZmljYXIgcXVlIHNlIHBpbnRcdTAwRjMgdW4gbG90ZVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuQ3VzdG9tRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudCgnd3BsYWNlLWJhdGNoLXBhaW50ZWQnLCB7XG4gICAgICAgIGRldGFpbDogeyBcbiAgICAgICAgICBmaXJzdFg6IGZpcnN0TG9jYWxYLCBcbiAgICAgICAgICBmaXJzdFk6IGZpcnN0TG9jYWxZLCBcbiAgICAgICAgICBwaXhlbENvdW50OiBhY3R1YWxQYWludGVkLFxuICAgICAgICAgIHRvdGFsUGl4ZWxzOiBwaXhlbENvdW50LFxuICAgICAgICAgIGNvbG9yczogY29sb3JzLFxuICAgICAgICAgIGNvb3JkczogY29vcmRzLFxuICAgICAgICAgIHRpbGVYOiBjZmcuVElMRV9YLFxuICAgICAgICAgIHRpbGVZOiBjZmcuVElMRV9ZLFxuICAgICAgICAgIGJhc2VYOiBjZmcuQkFTRV9YLFxuICAgICAgICAgIGJhc2VZOiBjZmcuQkFTRV9ZLFxuICAgICAgICAgIHJhZGl1czogY2ZnLkZBUk1fUkFESVVTLFxuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgXG4gIC8vIE1hbmVqbyBkZSBlcnJvcmVzIG1lam9yYWRvXG4gIGlmIChyLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgc2V0U3RhdHVzKCdcdTI2QTBcdUZFMEYgNDAzICh0b2tlbiBleHBpcmFkbyBvIENsb3VkZmxhcmUpLiBSZWludGVudGFyXHUwMEUxLi4uJywgJ2Vycm9yJyk7XG4gIH0gZWxzZSBpZiAoci5zdGF0dXMgPT09IDQwMSkge1xuICAgIHNldFN0YXR1cygnXHVEODNEXHVERDEyIDQwMSAobm8gYXV0b3JpemFkbykuIFZlcmlmaWNhIHR1IHNlc2lcdTAwRjNuLicsICdlcnJvcicpO1xuICB9IGVsc2UgaWYgKHIuc3RhdHVzID09PSA0MjkpIHtcbiAgICBzZXRTdGF0dXMoJ1x1MjNGMyA0MjkgKGxcdTAwRURtaXRlIGRlIHRhc2EpLiBFc3BlcmFuZG8uLi4nLCAnZXJyb3InKTtcbiAgfSBlbHNlIGlmIChyLnN0YXR1cyA9PT0gNDA4KSB7XG4gICAgc2V0U3RhdHVzKCdcdTIzRjAgVGltZW91dCBkZWwgc2Vydmlkb3IuIENvb3JkZW5hZGFzIHByb2JsZW1cdTAwRTF0aWNhcyBvIHNlcnZpZG9yIHNvYnJlY2FyZ2FkbycsICdlcnJvcicpO1xuICB9IGVsc2UgaWYgKHIuc3RhdHVzID09PSAwKSB7XG4gICAgc2V0U3RhdHVzKCdcdUQ4M0NcdURGMTAgRXJyb3IgZGUgcmVkLiBWZXJpZmljYW5kbyBjb25lY3RpdmlkYWQuLi4nLCAnZXJyb3InKTtcbiAgfSBlbHNlIGlmIChyLnN0YXR1cyA9PT0gNTAwKSB7XG4gICAgc2V0U3RhdHVzKCdcdUQ4M0RcdUREMjUgNTAwIChlcnJvciBpbnRlcm5vIGRlbCBzZXJ2aWRvcikuIFJlaW50ZW50YXJcdTAwRTEuLi4nLCAnZXJyb3InKTtcbiAgfSBlbHNlIGlmIChyLnN0YXR1cyA9PT0gNTAyIHx8IHIuc3RhdHVzID09PSA1MDMgfHwgci5zdGF0dXMgPT09IDUwNCkge1xuICAgIHNldFN0YXR1cyhgXHVEODNEXHVERUFCICR7ci5zdGF0dXN9IChzZXJ2aWRvciBubyBkaXNwb25pYmxlKS4gUmVpbnRlbnRhclx1MDBFMS4uLmAsICdlcnJvcicpO1xuICB9IGVsc2UgaWYgKHIuc3RhdHVzID09PSA0MDQpIHtcbiAgICBzZXRTdGF0dXMoYFx1RDgzRFx1RERGQVx1RkUwRiA0MDQgKHRpbGUgbm8gZW5jb250cmFkbykuIFZlcmlmaWNhbmRvIGNvb3JkZW5hZGFzIHRpbGUoJHtjZmcuVElMRV9YfSwke2NmZy5USUxFX1l9KWAsICdlcnJvcicpO1xuICB9IGVsc2Uge1xuICAgIC8vIFBhcmEgb3Ryb3MgZXJyb3JlcywgdmVyaWZpY2FyIGVsIGhlYWx0aCBkZWwgYmFja2VuZFxuICAgIHRyeSB7XG4gICAgICBjb25zdCBoZWFsdGggPSBhd2FpdCBjaGVja0JhY2tlbmRIZWFsdGgoKTtcbiAgICAgIGNvbnN0IGhlYWx0aFN0YXR1cyA9IGhlYWx0aD8udXAgPyAnXHVEODNEXHVERkUyIE9ubGluZScgOiAnXHVEODNEXHVERDM0IE9mZmxpbmUnO1xuICAgICAgc2V0U3RhdHVzKGBcdTI3NEMgRXJyb3IgJHtyLnN0YXR1c306ICR7ci5qc29uPy5tZXNzYWdlIHx8IHIuanNvbj8uZXJyb3IgfHwgJ0ZhbGxvIGFsIHBpbnRhcid9IChCYWNrZW5kOiAke2hlYWx0aFN0YXR1c30pYCwgJ2Vycm9yJyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRTdGF0dXMoYFx1Mjc0QyBFcnJvciAke3Iuc3RhdHVzfTogJHtyLmpzb24/Lm1lc3NhZ2UgfHwgci5qc29uPy5lcnJvciB8fCAnRmFsbG8gYWwgcGludGFyJ30gKEhlYWx0aCBjaGVjayBmYWxsXHUwMEYzKWAsICdlcnJvcicpO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gTG9nIGRldGFsbGFkbyBwYXJhIGRlYnVnZ2luZ1xuICBsb2coYEZhbGxvIGVuIHBpbnRhZG86IHN0YXR1cz0ke3Iuc3RhdHVzfSwganNvbj1gLCByLmpzb24sICdjb29yZHM9JywgY29vcmRzLCAnY29sb3JzPScsIGNvbG9ycyk7XG4gIFxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYWludFdpdGhSZXRyeShjZmcsIHN0YXRlLCBzZXRTdGF0dXMsIGZsYXNoRWZmZWN0LCBnZXRTZXNzaW9uLCBjaGVja0JhY2tlbmRIZWFsdGgpIHtcbiAgY29uc3QgbWF4QXR0ZW1wdHMgPSA1OyAvLyBBdW1lbnRhciBhIDUgaW50ZW50b3NcbiAgY29uc3QgYmFzZURlbGF5ID0gMzAwMDsgLy8gRGVsYXkgYmFzZSBkZSAzIHNlZ3VuZG9zXG4gIFxuICBmb3IgKGxldCBhdHRlbXB0ID0gMTsgYXR0ZW1wdCA8PSBtYXhBdHRlbXB0czsgYXR0ZW1wdCsrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBwYWludE9uY2UoY2ZnLCBzdGF0ZSwgc2V0U3RhdHVzLCBmbGFzaEVmZmVjdCwgZ2V0U2Vzc2lvbiwgY2hlY2tCYWNrZW5kSGVhbHRoKTtcbiAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgIHN0YXRlLnJldHJ5Q291bnQgPSAwOyAvLyBSZXNldCBlbiBcdTAwRTl4aXRvXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgXG4gICAgICBzdGF0ZS5yZXRyeUNvdW50ID0gYXR0ZW1wdDtcbiAgICAgIFxuICAgICAgaWYgKGF0dGVtcHQgPCBtYXhBdHRlbXB0cykge1xuICAgICAgICBjb25zdCBkZWxheSA9IGJhc2VEZWxheSAqIE1hdGgucG93KDIsIGF0dGVtcHQgLSAxKTsgLy8gQmFja29mZiBleHBvbmVuY2lhbFxuICAgICAgICBzZXRTdGF0dXMoYFx1RDgzRFx1REQwNCBSZWludGVudG8gJHthdHRlbXB0fS8ke21heEF0dGVtcHRzfSBlbiAke2RlbGF5LzEwMDB9cy4uLmAsICdlcnJvcicpO1xuICAgICAgICBhd2FpdCBzbGVlcChkZWxheSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKGBFcnJvciBlbiBpbnRlbnRvICR7YXR0ZW1wdH06YCwgZXJyb3IpO1xuICAgICAgc3RhdGUucmV0cnlDb3VudCA9IGF0dGVtcHQ7XG4gICAgICBcbiAgICAgIGlmIChhdHRlbXB0IDwgbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgY29uc3QgZGVsYXkgPSBiYXNlRGVsYXkgKiBNYXRoLnBvdygyLCBhdHRlbXB0IC0gMSk7XG4gICAgICAgIHNldFN0YXR1cyhgXHVEODNEXHVEQ0E1IEVycm9yIGVuIGludGVudG8gJHthdHRlbXB0fS8ke21heEF0dGVtcHRzfSwgcmVpbnRlbnRhbmRvIGVuICR7ZGVsYXkvMTAwMH1zLi4uYCwgJ2Vycm9yJyk7XG4gICAgICAgIGF3YWl0IHNsZWVwKGRlbGF5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIHN0YXRlLnJldHJ5Q291bnQgPSBtYXhBdHRlbXB0cztcbiAgc2V0U3RhdHVzKGBcdTI3NEMgRmFsbFx1MDBGMyBkZXNwdVx1MDBFOXMgZGUgJHttYXhBdHRlbXB0c30gaW50ZW50b3MuIFNlIHJlcXVpZXJlIGludGVydmVuY2lcdTAwRjNuIG1hbnVhbC5gLCAnZXJyb3InKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9vcChjZmcsIHN0YXRlLCBzZXRTdGF0dXMsIGZsYXNoRWZmZWN0LCBnZXRTZXNzaW9uLCBjaGVja0JhY2tlbmRIZWFsdGgsIHVwZGF0ZVN0YXRzKSB7XG4gIGxvZygnXHVEODNEXHVERTgwIExvb3AgaW5pY2lhZG8nKTtcbiAgc3RhdGUucnVubmluZyA9IHRydWU7XG4gIFxuICB3aGlsZSAoc3RhdGUucnVubmluZykge1xuICAgIHRyeSB7XG4gICAgICAvLyBBY3R1YWxpemFyIGVzdGFkXHUwMEVEc3RpY2FzIGFudGVzIGRlIGNhZGEgY2ljbG9cbiAgICAgIGF3YWl0IHVwZGF0ZVN0YXRzKCk7XG4gICAgICBcbiAgICAgIC8vIFZlcmlmaWNhciBzaSBoYXkgY2FyZ2FzIHN1ZmljaWVudGVzIHBhcmEgcGludGFyXG4gICAgICBpZiAoc3RhdGUuY2hhcmdlcy5jb3VudCA8IGNmZy5NSU5fQ0hBUkdFUykge1xuICAgICAgICBjb25zdCB3YWl0VGltZSA9IE1hdGgubWF4KDAsIChjZmcuTUlOX0NIQVJHRVMgLSBzdGF0ZS5jaGFyZ2VzLmNvdW50KSAqIGNmZy5DSEFSR0VfUkVHRU5fTVMpO1xuICAgICAgICBzZXRTdGF0dXMoYFx1MjNGMyBFc3BlcmFuZG8gY2FyZ2FzOiAke3N0YXRlLmNoYXJnZXMuY291bnQudG9GaXhlZCgxKX0vJHtjZmcuTUlOX0NIQVJHRVN9ICgke01hdGgucm91bmQod2FpdFRpbWUvMTAwMCl9cylgLCAnc3RhdHVzJyk7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzbGVlcFdpdGhDb3VudGRvd24oTWF0aC5taW4od2FpdFRpbWUsIGNmZy5ERUxBWV9NUyksIChyZW1haW5pbmcpID0+IHtcbiAgICAgICAgICBzZXRTdGF0dXMoYFx1MjNGMyBFc3BlcmFuZG8gY2FyZ2FzOiAke3N0YXRlLmNoYXJnZXMuY291bnQudG9GaXhlZCgxKX0vJHtjZmcuTUlOX0NIQVJHRVN9ICh+JHtNYXRoLnJvdW5kKHJlbWFpbmluZy8xMDAwKX1zKWAsICdzdGF0dXMnKTtcbiAgICAgICAgfSwgc3RhdGUpO1xuICAgICAgICBcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEludGVudGFyIHBpbnRhclxuICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IHBhaW50V2l0aFJldHJ5KGNmZywgc3RhdGUsIHNldFN0YXR1cywgZmxhc2hFZmZlY3QsIGdldFNlc3Npb24sIGNoZWNrQmFja2VuZEhlYWx0aCk7XG4gICAgICBcbiAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAvLyBTaSBmYWxsXHUwMEYzIGRlc3B1XHUwMEU5cyBkZSB0b2RvcyBsb3MgcmVpbnRlbnRvcywgZXNwZXJhciBtXHUwMEUxcyB0aWVtcG9cbiAgICAgICAgc2V0U3RhdHVzKCdcdUQ4M0RcdURFMzQgRXNwZXJhbmRvIGFudGVzIGRlbCBzaWd1aWVudGUgaW50ZW50by4uLicsICdlcnJvcicpO1xuICAgICAgICBhd2FpdCBzbGVlcFdpdGhDb3VudGRvd24oY2ZnLkRFTEFZX01TICogMiwgKHJlbWFpbmluZykgPT4ge1xuICAgICAgICAgIHNldFN0YXR1cyhgXHVEODNEXHVERTM0IENvb2xkb3duIGV4dGVuZGlkbzogJHtNYXRoLnJvdW5kKHJlbWFpbmluZy8xMDAwKX1zYCwgJ2Vycm9yJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gRGVsYXkgbm9ybWFsIGVudHJlIHBpbnRhZGFzIGV4aXRvc2FzXG4gICAgICBpZiAoc3RhdGUucnVubmluZykge1xuICAgICAgICBhd2FpdCBzbGVlcFdpdGhDb3VudGRvd24oY2ZnLkRFTEFZX01TLCAocmVtYWluaW5nKSA9PiB7XG4gICAgICAgICAgc2V0U3RhdHVzKGBcdUQ4M0RcdURDQTQgRXNwZXJhbmRvICR7TWF0aC5yb3VuZChyZW1haW5pbmcvMTAwMCl9cyBoYXN0YSBzaWd1aWVudGUgcGludGFkYS4uLmAsICdzdGF0dXMnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCdFcnJvciBjclx1MDBFRHRpY28gZW4gbG9vcDonLCBlcnJvcik7XG4gICAgICBzZXRTdGF0dXMoYFx1RDgzRFx1RENBNSBFcnJvciBjclx1MDBFRHRpY286ICR7ZXJyb3IubWVzc2FnZX1gLCAnZXJyb3InKTtcbiAgICAgIFxuICAgICAgLy8gRXNwZXJhciBtXHUwMEUxcyB0aWVtcG8gYW50ZXMgZGUgY29udGludWFyIHRyYXMgZXJyb3IgY3JcdTAwRUR0aWNvXG4gICAgICBpZiAoc3RhdGUucnVubmluZykge1xuICAgICAgICBhd2FpdCBzbGVlcFdpdGhDb3VudGRvd24oY2ZnLkRFTEFZX01TICogMywgKHJlbWFpbmluZykgPT4ge1xuICAgICAgICAgIHNldFN0YXR1cyhgXHVEODNEXHVERUE4IFJlY3VwZXJcdTAwRTFuZG9zZSBkZSBlcnJvciBjclx1MDBFRHRpY286ICR7TWF0aC5yb3VuZChyZW1haW5pbmcvMTAwMCl9c2AsICdlcnJvcicpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGxvZygnXHUyM0Y5XHVGRTBGIExvb3AgZGV0ZW5pZG8nKTtcbiAgc2V0U3RhdHVzKCdcdTIzRjlcdUZFMEYgQm90IGRldGVuaWRvJywgJ3N0YXR1cycpO1xufVxuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlci5qc1wiO1xuXG4vLyBTaXN0ZW1hIGRlIGNhcHR1cmEgcGFyYSBjb29yZGVuYWRhcyBkZWwgdGlsZVxuZXhwb3J0IGNsYXNzIENvb3JkaW5hdGVDYXB0dXJlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLm9yaWdpbmFsRmV0Y2ggPSB3aW5kb3cuZmV0Y2g7XG4gICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XG4gIH1cblxuICAvLyBIYWJpbGl0YXIgY2FwdHVyYSBkZSBjb29yZGVuYWRhcyBwb3IgdW5hIHZlelxuICBlbmFibGUoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIGxvZygnXHUyNkEwXHVGRTBGIENhcHR1cmEgeWEgZXN0XHUwMEUxIGFjdGl2YScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgXG4gICAgbG9nKCdcdUQ4M0RcdURENzVcdUZFMEYgQ2FwdHVyYSBkZSBjb29yZGVuYWRhcyBhY3RpdmFkYS4gUGludGEgdW4gcFx1MDBFRHhlbCBtYW51YWxtZW50ZS4uLicpO1xuICAgIFxuICAgIC8vIEludGVyY2VwdGFyIGZldGNoXG4gICAgd2luZG93LmZldGNoID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMub3JpZ2luYWxGZXRjaC5hcHBseSh3aW5kb3csIGFyZ3MpO1xuICAgICAgXG4gICAgICBpZiAodGhpcy5hY3RpdmUgJiYgdGhpcy5zaG91bGRDYXB0dXJlKGFyZ3NbMF0sIGFyZ3NbMV0pKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2FwdHVyZShhcmdzWzBdLCBhcmdzWzFdLCByZXN1bHQuY2xvbmUoKSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8vIEF1dG8tZGVzYWN0aXZhciBkZXNwdVx1MDBFOXMgZGUgMzAgc2VndW5kb3NcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgbG9nKCdcdTIzRjAgQ2FwdHVyYSBkZSBjb29yZGVuYWRhcyBleHBpcmFkYScpO1xuICAgICAgfVxuICAgIH0sIDMwMDAwKTtcbiAgfVxuXG4gIC8vIFZlcmlmaWNhciBzaSBkZWJlbW9zIGNhcHR1cmFyIGVzdGEgcGV0aWNpXHUwMEYzblxuICBzaG91bGRDYXB0dXJlKHVybCwgb3B0aW9ucykge1xuICAgIGlmICghdXJsIHx8ICFvcHRpb25zKSByZXR1cm4gZmFsc2U7XG4gICAgXG4gICAgLy8gQnVzY2FyIHBhdHJvbmVzIGRlIFVSTCByZWxhY2lvbmFkb3MgY29uIHBpbnRhclxuICAgIGNvbnN0IHVybFN0ciA9IHVybC50b1N0cmluZygpO1xuICAgIGlmICghdXJsU3RyLmluY2x1ZGVzKCdwYWludCcpICYmICF1cmxTdHIuaW5jbHVkZXMoJ3BpeGVsJykgJiYgIXVybFN0ci5pbmNsdWRlcygncGxhY2UnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFZlcmlmaWNhciBxdWUgc2VhIHVuIFBPU1QgY29uIGRhdG9zXG4gICAgaWYgKCFvcHRpb25zLm1ldGhvZCB8fCBvcHRpb25zLm1ldGhvZC50b1VwcGVyQ2FzZSgpICE9PSAnUE9TVCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIE1hbmVqYXIgbGEgY2FwdHVyYSBkZSBjb29yZGVuYWRhc1xuICBhc3luYyBoYW5kbGVDYXB0dXJlKHVybCwgb3B0aW9ucywgcmVzcG9uc2UpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGNvb3JkcyA9IG51bGw7XG4gICAgICBsZXQgdGlsZVggPSBudWxsLCB0aWxlWSA9IG51bGw7XG5cbiAgICAgIC8vIEludGVudGFyIGV4dHJhZXIgY29vcmRlbmFkYXMgZGVsIGN1ZXJwbyBkZSBsYSBwZXRpY2lcdTAwRjNuXG4gICAgICBpZiAob3B0aW9ucy5ib2R5KSB7XG4gICAgICAgIGxldCBib2R5O1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKG9wdGlvbnMuYm9keSk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBib2R5ID0gb3B0aW9ucy5ib2R5O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib2R5ID0gb3B0aW9ucy5ib2R5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQnVzY2FyIGNvb3JkZW5hZGFzIGVuIGRpZmVyZW50ZXMgZm9ybWF0b3NcbiAgICAgICAgaWYgKGJvZHkuY29vcmRzICYmIEFycmF5LmlzQXJyYXkoYm9keS5jb29yZHMpKSB7XG4gICAgICAgICAgY29vcmRzID0gYm9keS5jb29yZHM7XG4gICAgICAgIH0gZWxzZSBpZiAoYm9keS54ICE9PSB1bmRlZmluZWQgJiYgYm9keS55ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb29yZHMgPSBbYm9keS54LCBib2R5LnldO1xuICAgICAgICB9IGVsc2UgaWYgKGJvZHkuY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICBjb29yZHMgPSBib2R5LmNvb3JkaW5hdGVzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEV4dHJhZXIgdGlsZSBkZXNkZSBsYSBVUkwgc2kgZXN0XHUwMEUxIHByZXNlbnRlXG4gICAgICBjb25zdCB1cmxTdHIgPSB1cmwudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHRpbGVNYXRjaCA9IHVybFN0ci5tYXRjaCgvXFwvczBcXC9waXhlbFxcLygtP1xcZCspXFwvKC0/XFxkKykvKTtcbiAgICAgIGlmICh0aWxlTWF0Y2gpIHtcbiAgICAgICAgdGlsZVggPSBwYXJzZUludCh0aWxlTWF0Y2hbMV0pO1xuICAgICAgICB0aWxlWSA9IHBhcnNlSW50KHRpbGVNYXRjaFsyXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEludGVudGFyIGV4dHJhZXIgY29vcmRzIGRlIGxhIFVSTCBzaSBubyB2aW5pZXJvbiBlbiBlbCBib2R5XG4gICAgICBpZiAoIWNvb3Jkcykge1xuICAgICAgICBjb25zdCB1cmxDb29yZE1hdGNoID0gdXJsU3RyLm1hdGNoKC9bPyZdKD86eHxjb29yZHM/KT0oW14mXSspLyk7XG4gICAgICAgIGlmICh1cmxDb29yZE1hdGNoKSB7XG4gICAgICAgICAgY29uc3QgY29vcmRTdHIgPSBkZWNvZGVVUklDb21wb25lbnQodXJsQ29vcmRNYXRjaFsxXSk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvb3JkcyA9IEpTT04ucGFyc2UoY29vcmRTdHIpO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBjb29yZFN0ci5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgIGNvb3JkcyA9IFtwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNpIGVuY29udHJhbW9zIGNvb3JkZW5hZGFzLCBjYWxjdWxhciBlbCB0aWxlXG4gICAgICBpZiAoY29vcmRzICYmIGNvb3Jkcy5sZW5ndGggPj0gMikge1xuICAgICAgICBsZXQgZ2xvYmFsWCwgZ2xvYmFsWSwgbG9jYWxYLCBsb2NhbFk7XG5cbiAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodGlsZVgpICYmIE51bWJlci5pc0ludGVnZXIodGlsZVkpKSB7XG4gICAgICAgICAgLy8gVHJhdGFtb3MgY29vcmRzIGNvbW8gbG9jYWxlcyBhbCB0aWxlIGV4dHJhXHUwMEVEZG8gZGUgbGEgVVJMXG4gICAgICAgICAgbG9jYWxYID0gY29vcmRzWzBdO1xuICAgICAgICAgIGxvY2FsWSA9IGNvb3Jkc1sxXTtcbiAgICAgICAgICBnbG9iYWxYID0gdGlsZVggKiAzMDAwICsgbG9jYWxYO1xuICAgICAgICAgIGdsb2JhbFkgPSB0aWxlWSAqIDMwMDAgKyBsb2NhbFk7XG4gICAgICAgICAgbG9nKGBcdUQ4M0NcdURGQUYgQ29vcmRlbmFkYXMgY2FwdHVyYWRhcyAobG9jYWxlcyk6IHRpbGUoJHt0aWxlWH0sJHt0aWxlWX0pIGxvY2FsKCR7bG9jYWxYfSwke2xvY2FsWX0pIC0+IGdsb2JhbCgke2dsb2JhbFh9LCR7Z2xvYmFsWX0pYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2luIHRpbGUgZW4gVVJMLCBpbnRlcnByZXRhbW9zIGNvb3JkcyBjb21vIGdsb2JhbGVzIHkgZGVyaXZhbW9zIHRpbGVcbiAgICAgICAgICBnbG9iYWxYID0gY29vcmRzWzBdO1xuICAgICAgICAgIGdsb2JhbFkgPSBjb29yZHNbMV07XG4gICAgICAgICAgdGlsZVggPSBNYXRoLmZsb29yKGdsb2JhbFggLyAzMDAwKTtcbiAgICAgICAgICB0aWxlWSA9IE1hdGguZmxvb3IoZ2xvYmFsWSAvIDMwMDApO1xuICAgICAgICAgIGxvY2FsWCA9IGdsb2JhbFggJSAzMDAwO1xuICAgICAgICAgIGxvY2FsWSA9IGdsb2JhbFkgJSAzMDAwO1xuICAgICAgICAgIGxvZyhgXHVEODNDXHVERkFGIENvb3JkZW5hZGFzIGNhcHR1cmFkYXMgKGdsb2JhbGVzKTogZ2xvYmFsKCR7Z2xvYmFsWH0sJHtnbG9iYWxZfSkgLT4gdGlsZSgke3RpbGVYfSwke3RpbGVZfSkgbG9jYWwoJHtsb2NhbFh9LCR7bG9jYWxZfSlgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZlcmlmaWNhciBxdWUgbGEgcmVzcHVlc3RhIHNlYSBleGl0b3NhXG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgdGlsZVgsXG4gICAgICAgICAgICAgIHRpbGVZLFxuICAgICAgICAgICAgICBnbG9iYWxYLFxuICAgICAgICAgICAgICBnbG9iYWxZLFxuICAgICAgICAgICAgICBsb2NhbFgsXG4gICAgICAgICAgICAgIGxvY2FsWVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIENhcHR1cmEgcmVhbGl6YWRhIHBlcm8gbGEgcmVzcHVlc3RhIG5vIGZ1ZSBleGl0b3NhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ0Vycm9yIHByb2Nlc2FuZG8gY2FwdHVyYTonLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLy8gRGVzYWN0aXZhciBjYXB0dXJhXG4gIGRpc2FibGUoKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgd2luZG93LmZldGNoID0gdGhpcy5vcmlnaW5hbEZldGNoO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICAgIFxuICAgIGxvZygnXHVEODNEXHVERDEyIENhcHR1cmEgZGUgY29vcmRlbmFkYXMgZGVzYWN0aXZhZGEnKTtcbiAgfVxufVxuXG4vLyBJbnN0YW5jaWEgZ2xvYmFsXG5leHBvcnQgY29uc3QgY29vcmRpbmF0ZUNhcHR1cmUgPSBuZXcgQ29vcmRpbmF0ZUNhcHR1cmUoKTtcbiIsICJleHBvcnQgY29uc3QgJCA9IChzZWwsIHJvb3QgPSBkb2N1bWVudCkgPT4gcm9vdC5xdWVyeVNlbGVjdG9yKHNlbCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHlsZShjc3MpIHtcbiAgY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgcy50ZXh0Q29udGVudCA9IGNzczsgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTsgcmV0dXJuIHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3VudFNoYWRvdyhjb250YWluZXIgPSBkb2N1bWVudC5ib2R5KSB7XG4gIGNvbnN0IGhvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob3N0LmlkID0gXCJ3cGxhY2UtYm90LXJvb3RcIjtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhvc3QpO1xuICBjb25zdCByb290ID0gaG9zdC5hdHRhY2hTaGFkb3cgPyBob3N0LmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pIDogaG9zdDtcbiAgcmV0dXJuIHsgaG9zdCwgcm9vdCB9O1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSBkZXRlY3RhciBzaSBsYSBwYWxldGEgZGUgY29sb3JlcyBlc3RcdTAwRTEgYWJpZXJ0YVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFsZXR0ZU9wZW4oZGVidWcgPSBmYWxzZSkge1xuICAvLyBCdXNjYXIgZWxlbWVudG9zIGNvbXVuZXMgZGUgbGEgcGFsZXRhIGRlIGNvbG9yZXMgKG1cdTAwRTl0b2RvIG9yaWdpbmFsKVxuICBjb25zdCBwYWxldHRlU2VsZWN0b3JzID0gW1xuICAgICdbZGF0YS10ZXN0aWQ9XCJjb2xvci1waWNrZXJcIl0nLFxuICAgICcuY29sb3ItcGlja2VyJyxcbiAgICAnLnBhbGV0dGUnLFxuICAgICdbY2xhc3MqPVwiY29sb3JcIl1bY2xhc3MqPVwicGlja2VyXCJdJyxcbiAgICAnW2NsYXNzKj1cInBhbGV0dGVcIl0nXG4gIF07XG4gIFxuICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHBhbGV0dGVTZWxlY3RvcnMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBOCBQYWxldGEgZGV0ZWN0YWRhIHBvciBzZWxlY3RvcjogJHtzZWxlY3Rvcn1gKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gQnVzY2FyIHBvciBjb2xvcmVzIGVuIHVuIGdyaWQgbyBsaXN0YSAobVx1MDBFOXRvZG8gb3JpZ2luYWwpXG4gIGNvbnN0IGNvbG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbc3R5bGUqPVwiYmFja2dyb3VuZC1jb2xvclwiXSwgW3N0eWxlKj1cImJhY2tncm91bmQ6XCJdLCAuY29sb3IsIFtjbGFzcyo9XCJjb2xvclwiXScpO1xuICBsZXQgdmlzaWJsZUNvbG9ycyA9IDA7XG4gIGZvciAoY29uc3QgZWwgb2YgY29sb3JFbGVtZW50cykge1xuICAgIGlmIChlbC5vZmZzZXRQYXJlbnQgIT09IG51bGwgJiYgZWwub2Zmc2V0V2lkdGggPiAxMCAmJiBlbC5vZmZzZXRIZWlnaHQgPiAxMCkge1xuICAgICAgdmlzaWJsZUNvbG9ycysrO1xuICAgICAgaWYgKHZpc2libGVDb2xvcnMgPj0gNSkge1xuICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQTggUGFsZXRhIGRldGVjdGFkYSBwb3IgY29sb3JlcyB2aXNpYmxlczogJHt2aXNpYmxlQ29sb3JzfWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gU2kgaGF5IDUrIGVsZW1lbnRvcyBkZSBjb2xvciB2aXNpYmxlc1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNEXHVERDBEIFBhbGV0YSBubyBkZXRlY3RhZGEuIENvbG9yZXMgdmlzaWJsZXM6ICR7dmlzaWJsZUNvbG9yc31gKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSBlbmNvbnRyYXIgeSBoYWNlciBjbGljIGVuIGVsIGJvdFx1MDBGM24gZGUgUGFpbnRcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQW5kQ2xpY2tQYWludEJ1dHRvbihkZWJ1ZyA9IGZhbHNlLCBkb3VibGVDbGljayA9IGZhbHNlKSB7XG4gIC8vIE1cdTAwRTl0b2RvIDE6IEJcdTAwRkFzcXVlZGEgZXNwZWNcdTAwRURmaWNhIHBvciBjbGFzZXMgKG1cdTAwRTl0b2RvIG9yaWdpbmFsLCBtXHUwMEUxcyBjb25maWFibGUpXG4gIGNvbnN0IHNwZWNpZmljQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmJ0bi5idG4tcHJpbWFyeS5idG4tbGcsIGJ1dHRvbi5idG4uYnRuLXByaW1hcnkuc21cXFxcOmJ0bi14bCcpO1xuICBcbiAgaWYgKHNwZWNpZmljQnV0dG9uKSB7XG4gICAgY29uc3QgYnV0dG9uVGV4dCA9IHNwZWNpZmljQnV0dG9uLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgaGFzUGFpbnRUZXh0ID0gYnV0dG9uVGV4dC5pbmNsdWRlcygncGFpbnQnKSB8fCBidXR0b25UZXh0LmluY2x1ZGVzKCdwaW50YXInKTtcbiAgICBjb25zdCBoYXNQYWludEljb24gPSBzcGVjaWZpY0J1dHRvbi5xdWVyeVNlbGVjdG9yKCdzdmcgcGF0aFtkKj1cIjI0MC0xMjBcIl0nKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmljQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZyBwYXRoW2QqPVwiTTE1XCJdJyk7XG4gICAgXG4gICAgaWYgKGhhc1BhaW50VGV4dCB8fCBoYXNQYWludEljb24pIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBRiBCb3RcdTAwRjNuIFBhaW50IGVuY29udHJhZG8gcG9yIHNlbGVjdG9yIGVzcGVjXHUwMEVEZmljbzogXCIke2J1dHRvblRleHR9XCJgKTtcbiAgICAgIHNwZWNpZmljQnV0dG9uLmNsaWNrKCk7XG4gICAgICBcbiAgICAgIC8vIFNpIHNlIHJlcXVpZXJlIGRvYmxlIGNsaWMsIGhhY2VyIHNlZ3VuZG8gY2xpYyBkZXNwdVx1MDBFOXMgZGUgdW4gZGVsYXlcbiAgICAgIGlmIChkb3VibGVDbGljaykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgU2VndW5kbyBjbGljIGVuIGJvdFx1MDBGM24gUGFpbnRgKTtcbiAgICAgICAgICBzcGVjaWZpY0J1dHRvbi5jbGljaygpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIFxuICAvLyBNXHUwMEU5dG9kbyAyOiBCXHUwMEZBc3F1ZWRhIHNpbXBsZSBwb3IgdGV4dG8gKG1cdTAwRTl0b2RvIG9yaWdpbmFsKVxuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gIGZvciAoY29uc3QgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcbiAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKChidXR0b25UZXh0LmluY2x1ZGVzKCdwYWludCcpIHx8IGJ1dHRvblRleHQuaW5jbHVkZXMoJ3BpbnRhcicpKSAmJiBcbiAgICAgICAgYnV0dG9uLm9mZnNldFBhcmVudCAhPT0gbnVsbCAmJlxuICAgICAgICAhYnV0dG9uLmRpc2FibGVkKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgQm90XHUwMEYzbiBQYWludCBlbmNvbnRyYWRvIHBvciB0ZXh0bzogXCIke2J1dHRvbi50ZXh0Q29udGVudC50cmltKCl9XCJgKTtcbiAgICAgIGJ1dHRvbi5jbGljaygpO1xuICAgICAgXG4gICAgICAvLyBTaSBzZSByZXF1aWVyZSBkb2JsZSBjbGljLCBoYWNlciBzZWd1bmRvIGNsaWMgZGVzcHVcdTAwRTlzIGRlIHVuIGRlbGF5XG4gICAgICBpZiAoZG91YmxlQ2xpY2spIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkFGIFNlZ3VuZG8gY2xpYyBlbiBib3RcdTAwRjNuIFBhaW50YCk7XG4gICAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG9gKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSByZWFsaXphciBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50IGNvbiBzZWN1ZW5jaWEgY29ycmVjdGFcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdXRvQ2xpY2tQYWludEJ1dHRvbihtYXhBdHRlbXB0cyA9IDMsIGRlYnVnID0gdHJ1ZSkge1xuICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0VcdUREMTYgSW5pY2lhbmRvIGF1dG8tY2xpY2sgZGVsIGJvdFx1MDBGM24gUGFpbnQgKG1cdTAwRTF4aW1vICR7bWF4QXR0ZW1wdHN9IGludGVudG9zKWApO1xuICBcbiAgZm9yIChsZXQgYXR0ZW1wdCA9IDE7IGF0dGVtcHQgPD0gbWF4QXR0ZW1wdHM7IGF0dGVtcHQrKykge1xuICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBRiBJbnRlbnRvICR7YXR0ZW1wdH0vJHttYXhBdHRlbXB0c30gLSBCdXNjYW5kbyBib3RcdTAwRjNuIFBhaW50Li4uYCk7XG4gICAgXG4gICAgLy8gVmVyaWZpY2FyIHNpIGxhIHBhbGV0YSB5YSBlc3RcdTAwRTEgYWJpZXJ0YVxuICAgIGlmIChpc1BhbGV0dGVPcGVuKCkpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1MjcwNSBQYWxldGEgeWEgZXN0XHUwMEUxIGFiaWVydGEsIGF1dG8tY2xpY2sgY29tcGxldGFkb2ApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIC8vIENMSUMgXHUwMERBTklDTzogUHJlc2lvbmFyIFBhaW50IHVuYSBzb2xhIHZleiAoc29sbyBwYXJhIG1vc3RyYXIgcGFsZXRhL2RldGVjdGFyIGNvbG9yZXMpXG4gICAgaWYgKGZpbmRBbmRDbGlja1BhaW50QnV0dG9uKGRlYnVnLCBmYWxzZSkpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzRFx1REM0NiBDbGljIGVuIGJvdFx1MDBGM24gUGFpbnQgcmVhbGl6YWRvIChzaW4gc2VndW5kbyBjbGljKWApO1xuICAgICAgXG4gICAgICAvLyBFc3BlcmFyIHVuIHBvY28gcGFyYSBxdWUgbGEgVUkvcGFsZXRhIGFwYXJlemNhIGVuIHBhbnRhbGxhXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTUwMCkpO1xuICAgICAgXG4gICAgICAvLyBWZXJpZmljYXIgc2kgbGEgcGFsZXRhIHNlIGFicmlcdTAwRjNcbiAgICAgIGlmIChpc1BhbGV0dGVPcGVuKCkpIHtcbiAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHUyNzA1IFBhbGV0YSBhYmllcnRhIGV4aXRvc2FtZW50ZSBkZXNwdVx1MDBFOXMgZGVsIGludGVudG8gJHthdHRlbXB0fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1MjZBMFx1RkUwRiBQYWxldGEgbm8gZGV0ZWN0YWRhIHRyYXMgZWwgY2xpYyBlbiBpbnRlbnRvICR7YXR0ZW1wdH0uIFJlaW50ZW50YXJcdTAwRTEuYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG8gcGFyYSBjbGljIGVuIGludGVudG8gJHthdHRlbXB0fWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBFc3BlcmFyIGFudGVzIGRlbCBzaWd1aWVudGUgaW50ZW50b1xuICAgIGlmIChhdHRlbXB0IDwgbWF4QXR0ZW1wdHMpIHtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gICAgfVxuICB9XG4gIFxuICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3NEMgQXV0by1jbGljayBmYWxsXHUwMEYzIGRlc3B1XHUwMEU5cyBkZSAke21heEF0dGVtcHRzfSBpbnRlbnRvc2ApO1xuICByZXR1cm4gZmFsc2U7XG59XG4iLCAiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2VyLmpzXCI7XG5pbXBvcnQgeyBmYXJtU3RhdGUsIEZBUk1fREVGQVVMVFMgfSBmcm9tIFwiLi4vZmFybS9jb25maWcuanNcIjtcbmltcG9ydCB7IGxvYWRGYXJtQ2ZnLCBzYXZlRmFybUNmZywgcmVzZXRUb1NhZmVEZWZhdWx0cyB9IGZyb20gXCIuLi9jb3JlL3N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IGdldFNlc3Npb24sIGNoZWNrSGVhbHRoIH0gZnJvbSBcIi4uL2NvcmUvd3BsYWNlLWFwaS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlRmFybVVJLCBhdXRvQ2FsaWJyYXRlVGlsZSB9IGZyb20gXCIuLi9mYXJtL3VpLmpzXCI7XG5pbXBvcnQgeyBsb29wLCBwYWludFdpdGhSZXRyeSB9IGZyb20gXCIuLi9mYXJtL2xvb3AuanNcIjtcbmltcG9ydCB7IGNvb3JkaW5hdGVDYXB0dXJlIH0gZnJvbSBcIi4uL2NvcmUvY2FwdHVyZS5qc1wiO1xuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vY29yZS91dGlscy5qc1wiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUxhbmd1YWdlLCB0IH0gZnJvbSBcIi4uL2xvY2FsZXMvaW5kZXguanNcIjtcbmltcG9ydCB7IGF1dG9DbGlja1BhaW50QnV0dG9uIH0gZnJvbSBcIi4uL2NvcmUvZG9tLmpzXCI7XG5cbihhc3luYyBmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEluaXRpYWxpemUgaW50ZXJuYXRpb25hbGl6YXRpb24gZmlyc3RcbiAgYXdhaXQgaW5pdGlhbGl6ZUxhbmd1YWdlKCk7XG4gIFxuICAvLyBBdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50IGFsIGluaWNpb1xuICB0cnkge1xuICAgIGxvZygnXHVEODNFXHVERDE2IFtGQVJNXSBJbmljaWFuZG8gYXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludC4uLicpO1xuICAgIGF3YWl0IGF1dG9DbGlja1BhaW50QnV0dG9uKDMsIHRydWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNkEwXHVGRTBGIFtGQVJNXSBFcnJvciBlbiBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50OicsIGVycm9yKTtcbiAgfVxuXG4gIC8vIFZlcmlmaWNhciBzaSBlbCBib3QgZGUgZmFybSB5YSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2VcbiAgaWYgKHdpbmRvdy5fX3dwbGFjZUJvdD8uZmFybVJ1bm5pbmcpIHtcbiAgICBhbGVydCh0KCdmYXJtLmFscmVhZHlSdW5uaW5nJywgXCJBdXRvLUZhcm0geWEgZXN0XHUwMEUxIGNvcnJpZW5kby5cIikpO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgLy8gVmVyaWZpY2FyIHNpIGhheSBvdHJvcyBib3RzIGVqZWN1dFx1MDBFMW5kb3NlXG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmltYWdlUnVubmluZykge1xuICAgIGFsZXJ0KHQoJ2Zhcm0uaW1hZ2VSdW5uaW5nV2FybmluZycsIFwiQXV0by1JbWFnZSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UuIENpXHUwMEU5cnJhbG8gYW50ZXMgZGUgaW5pY2lhciBBdXRvLUZhcm0uXCIpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBJbmljaWFsaXphciBlbCBlc3RhZG8gZ2xvYmFsIHNpIG5vIGV4aXN0ZVxuICBpZiAoIXdpbmRvdy5fX3dwbGFjZUJvdCkge1xuICAgIHdpbmRvdy5fX3dwbGFjZUJvdCA9IHt9O1xuICB9XG4gIFxuICAvLyBNYXJjYXIgcXVlIGVsIGZhcm0gYm90IGVzdFx1MDBFMSBlamVjdXRcdTAwRTFuZG9zZVxuICB3aW5kb3cuX193cGxhY2VCb3QuZmFybVJ1bm5pbmcgPSB0cnVlO1xuXG4gIC8vIExpc3RlbiBmb3IgbGFuZ3VhZ2UgY2hhbmdlc1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbGFuZ3VhZ2VDaGFuZ2VkJywgKCkgPT4ge1xuICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LnVpPy51cGRhdGVUZXh0cykge1xuICAgICAgd2luZG93Ll9fd3BsYWNlQm90LnVpLnVwZGF0ZVRleHRzKCk7XG4gICAgfVxuICB9KTtcblxuICBsb2coJ1x1RDgzRFx1REU4MCBJbmljaWFuZG8gV1BsYWNlIEZhcm0gQm90ICh2ZXJzaVx1MDBGM24gbW9kdWxhciknKTtcblxuICAvLyBWZXJpZmljYXIgc2kgbmVjZXNpdGEgY2FsaWJyYWNpXHUwMEYzbiBpbmljaWFsXG4gIGZ1bmN0aW9uIG5lZWRzQ2FsaWJyYXRpb25DaGVjayhjZmcpIHtcbiAgLy8gU2kgZWwgdXN1YXJpbyB5YSBzZWxlY2Npb25cdTAwRjMgdW5hIHpvbmEgdlx1MDBFMWxpZGEsIE5PIHJlY2FsaWJyYXJcbiAgY29uc3QgaGFzU2VsZWN0ZWRab25lID0gISFjZmcuUE9TSVRJT05fU0VMRUNURUQgJiYgY2ZnLkJBU0VfWCAhPSBudWxsICYmIGNmZy5CQVNFX1kgIT0gbnVsbDtcbiAgLy8gVmVyaWZpY2FyIHNpIGxhcyBjb29yZGVuYWRhcyBzb24gbGFzIHBvciBkZWZlY3RvXG4gIGNvbnN0IGhhc0RlZmF1bHRDb29yZHMgPSBjZmcuVElMRV9YID09PSBGQVJNX0RFRkFVTFRTLlRJTEVfWCAmJiBjZmcuVElMRV9ZID09PSBGQVJNX0RFRkFVTFRTLlRJTEVfWTtcbiAgLy8gVmVyaWZpY2FyIHF1ZSBsYXMgY29vcmRlbmFkYXMgc2VhbiBuXHUwMEZBbWVyb3Mgdlx1MDBFMWxpZG9zXG4gIGNvbnN0IGhhc0ludmFsaWRDb29yZHMgPSAhTnVtYmVyLmlzRmluaXRlKGNmZy5USUxFX1gpIHx8ICFOdW1iZXIuaXNGaW5pdGUoY2ZnLlRJTEVfWSk7XG5cbiAgLy8gU29sbyBjYWxpYnJhciBzaSBOTyBoYXkgem9uYSBzZWxlY2Npb25hZGEgYVx1MDBGQW4geSBhZGVtXHUwMEUxcyBsYXMgY29vcmRzIHNvbiBkZWZhdWx0IG8gaW52XHUwMEUxbGlkYXNcbiAgY29uc3QgbmVlZHNDYWxpYiA9ICFoYXNTZWxlY3RlZFpvbmUgJiYgKGhhc0RlZmF1bHRDb29yZHMgfHwgaGFzSW52YWxpZENvb3Jkcyk7XG4gIGxvZyhgVmVyaWZpY2FjaVx1MDBGM24gY2FsaWJyYWNpXHUwMEYzbjogZGVmYXVsdHM9JHtoYXNEZWZhdWx0Q29vcmRzfSwgc2VsZWN0ZWQ9JHtoYXNTZWxlY3RlZFpvbmV9LCBpbnZhbGlkPSR7aGFzSW52YWxpZENvb3Jkc30sIGNvb3Jkcz0oJHtjZmcuVElMRV9YfSwke2NmZy5USUxFX1l9KWApO1xuXG4gIHJldHVybiBuZWVkc0NhbGliO1xuICB9XG5cbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgaGFiaWxpdGFyIGNhcHR1cmEgZGUgY29vcmRlbmFkYXNcbiAgZnVuY3Rpb24gZW5hYmxlQ2FwdHVyZU9uY2UoKSB7XG4gICAgbG9nKCdcdUQ4M0RcdURENzVcdUZFMEYgQWN0aXZhbmRvIGNhcHR1cmEgZGUgY29vcmRlbmFkYXMuLi4nKTtcbiAgICBcbiAgICBjb29yZGluYXRlQ2FwdHVyZS5lbmFibGUoKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIGNmZy5USUxFX1ggPSByZXN1bHQudGlsZVg7XG4gICAgICAgIGNmZy5USUxFX1kgPSByZXN1bHQudGlsZVk7XG4gICAgICAgIHNhdmVGYXJtQ2ZnKGNmZyk7XG4gICAgICAgIHVpLnVwZGF0ZUNvbmZpZygpO1xuICAgICAgICB1aS5zZXRTdGF0dXMoYFx1RDgzQ1x1REZBRiBDb29yZGVuYWRhcyBjYXB0dXJhZGFzOiB0aWxlKCR7cmVzdWx0LnRpbGVYfSwke3Jlc3VsdC50aWxlWX0pYCwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgbG9nKGBcdTI3MDUgQ29vcmRlbmFkYXMgY2FwdHVyYWRhcyBhdXRvbVx1MDBFMXRpY2FtZW50ZTogdGlsZSgke3Jlc3VsdC50aWxlWH0sJHtyZXN1bHQudGlsZVl9KWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdWkuc2V0U3RhdHVzKGBcdTI3NEMgJHt0KCdjb21tb24uZXJyb3InLCAnTm8gc2UgcHVkaWVyb24gY2FwdHVyYXIgY29vcmRlbmFkYXMnKX1gLCAnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICB1aS5zZXRTdGF0dXMoYFx1RDgzRFx1RENGOCAke3QoJ2Zhcm0uY2FwdHVyZUluc3RydWN0aW9ucycpfWAsICdzdGF0dXMnKTtcbiAgfVxuXG4gIC8vIEluaWNpYWxpemFyIGNvbmZpZ3VyYWNpXHUwMEYzblxuICBsZXQgY2ZnID0geyAuLi5GQVJNX0RFRkFVTFRTLCAuLi5sb2FkRmFybUNmZyhGQVJNX0RFRkFVTFRTKSB9O1xuICBcbiAgLy8gVmVyaWZpY2FyIHNpdGVrZXlcbiAgaWYgKCFjZmcuU0lURUtFWSkge1xuICAgIGNvbnN0IHNpdGVLZXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltkYXRhLXNpdGVrZXldJyk7XG4gICAgaWYgKHNpdGVLZXlFbGVtZW50KSB7XG4gICAgICBjZmcuU0lURUtFWSA9IHNpdGVLZXlFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zaXRla2V5Jyk7XG4gICAgICBsb2coYFx1RDgzRFx1RENERCBTaXRla2V5IGVuY29udHJhZGEgYXV0b21cdTAwRTF0aWNhbWVudGU6ICR7Y2ZnLlNJVEVLRVkuc3Vic3RyaW5nKDAsIDIwKX0uLi5gKTtcbiAgICAgIHNhdmVGYXJtQ2ZnKGNmZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZygnXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gZW5jb250cmFyIGxhIHNpdGVrZXkgYXV0b21cdTAwRTF0aWNhbWVudGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIHNlc2lcdTAwRjNuIHkgZXN0YWRcdTAwRURzdGljYXNcbiAgYXN5bmMgZnVuY3Rpb24gdXBkYXRlU3RhdHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKCk7XG4gICAgICBpZiAoc2Vzc2lvbi5zdWNjZXNzICYmIHNlc3Npb24uZGF0YSkge1xuICAgICAgICBmYXJtU3RhdGUuY2hhcmdlcy5jb3VudCA9IHNlc3Npb24uZGF0YS5jaGFyZ2VzIHx8IDA7XG4gICAgICAgIGZhcm1TdGF0ZS5jaGFyZ2VzLm1heCA9IHNlc3Npb24uZGF0YS5tYXhDaGFyZ2VzIHx8IDUwO1xuICAgICAgICBmYXJtU3RhdGUuY2hhcmdlcy5yZWdlbiA9IHNlc3Npb24uZGF0YS5jaGFyZ2VSZWdlbiB8fCAzMDAwMDtcbiAgICAgICAgZmFybVN0YXRlLnVzZXIgPSBzZXNzaW9uLmRhdGEudXNlcjtcbiAgICAgICAgXG4gICAgICAgIC8vIEFjdHVhbGl6YXIgY29uZmlndXJhY2lcdTAwRjNuIGNvbiBkYXRvcyBkZSBsYSBzZXNpXHUwMEYzblxuICAgICAgICBjZmcuQ0hBUkdFX1JFR0VOX01TID0gZmFybVN0YXRlLmNoYXJnZXMucmVnZW47XG4gICAgICAgIFxuICAgICAgICAvLyBWZXJpZmljYXIgaGVhbHRoXG4gICAgICAgIGNvbnN0IGhlYWx0aCA9IGF3YWl0IGNoZWNrQmFja2VuZEhlYWx0aCgpO1xuICAgICAgICBmYXJtU3RhdGUuaGVhbHRoID0gaGVhbHRoO1xuICAgICAgICBcbiAgICAgICAgdWkudXBkYXRlU3RhdHMoZmFybVN0YXRlLnBhaW50ZWQsIGZhcm1TdGF0ZS5jaGFyZ2VzLmNvdW50LCBmYXJtU3RhdGUucmV0cnlDb3VudCwgaGVhbHRoKTtcbiAgICAgICAgcmV0dXJuIHNlc3Npb24uZGF0YTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ0Vycm9yIGFjdHVhbGl6YW5kbyBlc3RhZFx1MDBFRHN0aWNhczonLCBlcnJvcik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSB2ZXJpZmljYXIgaGVhbHRoIGRlbCBiYWNrZW5kXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrQmFja2VuZEhlYWx0aCgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGNoZWNrSGVhbHRoKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnRXJyb3IgdmVyaWZpY2FuZG8gaGVhbHRoOicsIGVycm9yKTtcbiAgICAgIHJldHVybiB7IHVwOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfTtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jaVx1MDBGM24gZGUgcGludGFkbyBpbmRpdmlkdWFsXG4gIGFzeW5jIGZ1bmN0aW9uIHBhaW50T25jZVdyYXBwZXIoKSB7XG4gICAgcmV0dXJuIGF3YWl0IHBhaW50V2l0aFJldHJ5KGNmZywgZmFybVN0YXRlLCB1aS5zZXRTdGF0dXMsIHVpLmZsYXNoRWZmZWN0LCAoKSA9PiBnZXRTZXNzaW9uKCksIGNoZWNrQmFja2VuZEhlYWx0aCk7XG4gIH1cblxuICAvLyBDcmVhciBsYSBpbnRlcmZheiBkZSB1c3VhcmlvXG4gIGNvbnN0IHVpID0gY3JlYXRlRmFybVVJKFxuICAgIGNmZyxcbiAgICAvLyBvblN0YXJ0XG4gICAgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKGZhcm1TdGF0ZS5ydW5uaW5nKSB7XG4gICAgICAgIHVpLnNldFN0YXR1cygnXHUyNkEwXHVGRTBGIEVsIGJvdCB5YSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UnLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBTaSBubyBzZSBoYSBzZWxlY2Npb25hZG8gdW5hIHpvbmEsIGFjdGl2YXIgYXV0b21cdTAwRTF0aWNhbWVudGUgbGEgc2VsZWNjaVx1MDBGM25cbiAgICAgIGlmICghY2ZnLlBPU0lUSU9OX1NFTEVDVEVEIHx8IGNmZy5CQVNFX1ggPT09IG51bGwgfHwgY2ZnLkJBU0VfWSA9PT0gbnVsbCkge1xuICAgICAgICB1aS5zZXRTdGF0dXModCgnZmFybS5hdXRvU2VsZWN0UG9zaXRpb24nKSwgJ2luZm8nKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFjdGl2YXIgc2VsZWNjaVx1MDBGM24gZGUgem9uYSBhdXRvbVx1MDBFMXRpY2FtZW50ZVxuICAgICAgICBjb25zdCBzZWxlY3RCdXR0b24gPSB1aS5nZXRFbGVtZW50KCkuc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0LXBvc2l0aW9uLWJ0bicpO1xuICAgICAgICBpZiAoc2VsZWN0QnV0dG9uKSB7XG4gICAgICAgICAgc2VsZWN0QnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFJldG9ybmFyIHBhcmEgbm8gaW5pY2lhciBlbCBib3QgdG9kYXZcdTAwRURhXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gVmVyaWZpY2FyIHNpIG5lY2VzaXRhIGNhbGlicmFjaVx1MDBGM24gKHNvbG8gc2kgbm8gaGF5IHpvbmEgc2VsZWNjaW9uYWRhKVxuICAgICAgaWYgKG5lZWRzQ2FsaWJyYXRpb25DaGVjayhjZmcpKSB7XG4gICAgICAgIHVpLnNldFN0YXR1cygnXHVEODNDXHVERkFGIENhbGlicmFuZG8gYXV0b21cdTAwRTF0aWNhbWVudGUuLi4nLCAnc3RhdHVzJyk7XG4gICAgICAgIGNvbnN0IGNhbGlicmF0aW9uID0gYXdhaXQgYXV0b0NhbGlicmF0ZVRpbGUoY2ZnKTtcbiAgICAgICAgaWYgKGNhbGlicmF0aW9uLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB1aS5zZXRTdGF0dXMoYFx1MjcwNSBDYWxpYnJhZG86IHRpbGUoJHtjYWxpYnJhdGlvbi50aWxlWH0sJHtjYWxpYnJhdGlvbi50aWxlWX0pYCwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICB1aS51cGRhdGVDb25maWcoKTsgLy8gQWN0dWFsaXphciBVSSBjb24gbnVldmFzIGNvb3JkZW5hZGFzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdWkuc2V0U3RhdHVzKCdcdTI3NEMgRXJyb3IgZW4gY2FsaWJyYWNpXHUwMEYzbi4gQ29uZmlndXJhIG1hbnVhbG1lbnRlLicsICdlcnJvcicpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBWZXJpZmljYXIgY29uZWN0aXZpZGFkXG4gICAgICB1aS5zZXRTdGF0dXMoJ1x1RDgzRFx1REQwRCBWZXJpZmljYW5kbyBjb25lY3RpdmlkYWQuLi4nLCAnc3RhdHVzJyk7XG4gICAgICBjb25zdCBoZWFsdGggPSBhd2FpdCBjaGVja0JhY2tlbmRIZWFsdGgoKTtcbiAgICAgIGlmICghaGVhbHRoLnVwKSB7XG4gICAgICAgIHVpLnNldFN0YXR1cygnXHVEODNEXHVERDM0IEJhY2tlbmQgbm8gZGlzcG9uaWJsZS4gVmVyaWZpY2EgdHUgY29uZXhpXHUwMEYzbi4nLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBPYnRlbmVyIHNlc2lcdTAwRjNuIGluaWNpYWxcbiAgICAgIHVpLnNldFN0YXR1cygnXHVEODNEXHVERDA0IE9idGVuaWVuZG8gaW5mb3JtYWNpXHUwMEYzbiBkZSBzZXNpXHUwMEYzbi4uLicsICdzdGF0dXMnKTtcbiAgICAgIGNvbnN0IHNlc3Npb25EYXRhID0gYXdhaXQgdXBkYXRlU3RhdHMoKTtcbiAgICAgIGlmICghc2Vzc2lvbkRhdGEpIHtcbiAgICAgICAgdWkuc2V0U3RhdHVzKCdcdTI3NEMgRXJyb3Igb2J0ZW5pZW5kbyBzZXNpXHUwMEYzbi4gVmVyaWZpY2EgdHUgbG9naW4uJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdWkuc2V0U3RhdHVzKCdcdUQ4M0RcdURFODAgSW5pY2lhbmRvIGJvdC4uLicsICdzdGF0dXMnKTtcbiAgICAgIHVpLnVwZGF0ZUJ1dHRvblN0YXRlcyh0cnVlKTtcbiAgICAgIFxuICAgICAgLy8gSW5pY2lhciBlbCBsb29wIHByaW5jaXBhbFxuICAgICAgbG9vcChjZmcsIGZhcm1TdGF0ZSwgdWkuc2V0U3RhdHVzLCB1aS5mbGFzaEVmZmVjdCwgdXBkYXRlU3RhdHMsIGNoZWNrQmFja2VuZEhlYWx0aCwgdXBkYXRlU3RhdHMpO1xuICAgIH0sXG4gICAgXG4gICAgLy8gb25TdG9wXG4gICAgKCkgPT4ge1xuICAgICAgZmFybVN0YXRlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgICAgd2luZG93Ll9fd3BsYWNlQm90LmZhcm1SdW5uaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB1aS5zZXRTdGF0dXMoJ1x1MjNGOVx1RkUwRiBEZXRlbmllbmRvIGJvdC4uLicsICdzdGF0dXMnKTtcbiAgICAgIHVpLnVwZGF0ZUJ1dHRvblN0YXRlcyhmYWxzZSk7XG4gICAgfSxcbiAgICBcbiAgICAvLyBvbkNhbGlicmF0ZVxuICAgIGFzeW5jICgpID0+IHtcbiAgICAgIHVpLnNldFN0YXR1cygnXHVEODNDXHVERkFGIENhbGlicmFuZG8gcG9zaWNpXHUwMEYzbi4uLicsICdzdGF0dXMnKTtcbiAgICAgIGNvbnN0IGNhbGlicmF0aW9uID0gYXdhaXQgYXV0b0NhbGlicmF0ZVRpbGUoY2ZnKTtcbiAgICAgIGlmIChjYWxpYnJhdGlvbi5zdWNjZXNzKSB7XG4gICAgICAgIHVpLnNldFN0YXR1cyhgXHUyNzA1IENhbGlicmFkbzogdGlsZSgke2NhbGlicmF0aW9uLnRpbGVYfSwke2NhbGlicmF0aW9uLnRpbGVZfSlgLCAnc3VjY2VzcycpO1xuICAgICAgICB1aS51cGRhdGVDb25maWcoKTsgLy8gQWN0dWFsaXphciBVSSBjb24gbnVldmFzIGNvb3JkZW5hZGFzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1aS5zZXRTdGF0dXMoYFx1Mjc0QyBFcnJvciBlbiBjYWxpYnJhY2lcdTAwRjNuOiAke2NhbGlicmF0aW9uLmVycm9yIHx8ICdEZXNjb25vY2lkbyd9YCwgJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8vIENvbmZpZ3VyYXIgZWwgYm90XHUwMEYzbiBkZSBjYXB0dXJhXG4gIGNvbnN0IGNhcHR1cmVCdG4gPSB1aS5nZXRFbGVtZW50KCkuc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnY2FwdHVyZS1idG4nKTtcbiAgaWYgKGNhcHR1cmVCdG4pIHtcbiAgICBjYXB0dXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZW5hYmxlQ2FwdHVyZU9uY2UpO1xuICB9XG5cbiAgLy8gQ29uZmlndXJhciBlbCBib3RcdTAwRjNuIFwiVW5hIHZlelwiXG4gIGNvbnN0IG9uY2VCdG4gPSB1aS5nZXRFbGVtZW50KCkuc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnb25jZS1idG4nKTtcbiAgaWYgKG9uY2VCdG4pIHtcbiAgICBvbmNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKGZhcm1TdGF0ZS5ydW5uaW5nKSB7XG4gICAgICAgIHVpLnNldFN0YXR1cygnXHUyNkEwXHVGRTBGIERldFx1MDBFOW4gZWwgYm90IHByaW1lcm8nLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICBhd2FpdCB1cGRhdGVTdGF0cygpO1xuICAgICAgdWkuc2V0U3RhdHVzKCdcdUQ4M0NcdURGQTggUGludGFuZG8gdW5hIHZlei4uLicsICdzdGF0dXMnKTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBwYWludE9uY2VXcmFwcGVyKCk7XG4gICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICB1aS5zZXRTdGF0dXMoJ1x1MjcwNSBQXHUwMEVEeGVsIHBpbnRhZG8gZXhpdG9zYW1lbnRlJywgJ3N1Y2Nlc3MnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVpLnNldFN0YXR1cygnXHUyNzRDIEVycm9yIGFsIHBpbnRhciBwXHUwMEVEeGVsJywgJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBBY3R1YWxpemFyIGVzdGFkXHUwMEVEc3RpY2FzIGluaWNpYWxcbiAgYXdhaXQgdXBkYXRlU3RhdHMoKTtcblxuICAvLyBTZXR1cCBkZSBldmVudG9zIGdsb2JhbGVzXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3cGxhY2UtYmF0Y2gtcGFpbnRlZCcsIChldmVudCkgPT4ge1xuICAgIGxvZyhgXHVEODNDXHVERkE4IExvdGUgcGludGFkbzogJHtldmVudC5kZXRhaWwucGl4ZWxDb3VudH0gcFx1MDBFRHhlbGVzIGVuIHRpbGUoJHtldmVudC5kZXRhaWwudGlsZVh9LCR7ZXZlbnQuZGV0YWlsLnRpbGVZfSlgKTtcbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLSBFeHBvbmVyIEFQSSBwb3IgY29uc29sYSAoY29tbyBlbiBlbCBvcmlnaW5hbCkgLS0tLS0tLS0tLVxuICB3aW5kb3cuV1BBVUkgPSB7XG4gICAgb25jZTogcGFpbnRPbmNlV3JhcHBlcixcbiAgICBnZXQ6ICgpID0+ICh7IC4uLmNmZyB9KSxcbiAgICBjYXB0dXJlOiBlbmFibGVDYXB0dXJlT25jZSxcbiAgICByZWZyZXNoQ2FudmFzOiAoKSA9PiB7XG4gICAgICAvLyBBY3R1YWxpemFyIGNhbnZhcyBzaSBoYXkgXHUwMEZBbHRpbW8gcFx1MDBFRHhlbCBwaW50YWRvXG4gICAgICBpZiAoZmFybVN0YXRlLmxhc3QpIHtcbiAgICAgICAgLy8gRXN0YSBmdW5jaVx1MDBGM24gc2UgaW1wbGVtZW50YXJcdTAwRURhIGVuIGxvb3AuanNcbiAgICAgICAgbG9nKGBSZWZyZXNjYW5kbyBjYW52YXMgZW4gcG9zaWNpXHUwMEYzbiAoJHtmYXJtU3RhdGUubGFzdC54fSwke2Zhcm1TdGF0ZS5sYXN0Lnl9KWApO1xuICAgICAgfVxuICAgIH0sXG4gICAgdmVyaWZ5UGl4ZWw6IGFzeW5jICh4LCB5KSA9PiB7XG4gICAgICBsb2coYFZlcmlmaWNhbmRvIHBcdTAwRUR4ZWwgZW4gKCR7eH0sJHt5fSkuLi5gKTtcbiAgICAgIC8vIEVzdGEgZnVuY2lcdTAwRjNuIHZlcmlmaWNhclx1MDBFRGEgc2kgdW4gcFx1MDBFRHhlbCBlc3BlY1x1MDBFRGZpY28gZnVlIHBpbnRhZG8gY29ycmVjdGFtZW50ZVxuICAgICAgcmV0dXJuIHsgdmVyaWZpZWQ6IHRydWUsIHgsIHkgfTtcbiAgICB9LFxuICAgIFxuICAgIGdldFN0YXRzOiAoKSA9PiAoe1xuICAgICAgcGFpbnRlZDogZmFybVN0YXRlLnBhaW50ZWQsXG4gICAgICBsYXN0OiBmYXJtU3RhdGUubGFzdCxcbiAgICAgIGNoYXJnZXM6IGZhcm1TdGF0ZS5jaGFyZ2VzLFxuICAgICAgdXNlcjogZmFybVN0YXRlLnVzZXIsXG4gICAgICBydW5uaW5nOiBmYXJtU3RhdGUucnVubmluZyxcbiAgICAgIG1pbkNoYXJnZXM6IGNmZy5NSU5fQ0hBUkdFUyxcbiAgICAgIGRlbGF5OiBjZmcuREVMQVlfTVMsXG4gICAgICB0aWxlSW5mbzoge1xuICAgICAgICB0aWxlWDogY2ZnLlRJTEVfWCxcbiAgICAgICAgdGlsZVk6IGNmZy5USUxFX1ksXG4gICAgICAgIHRpbGVTaXplOiBjZmcuVElMRV9TSVpFLFxuICAgICAgICBzYWZlTWFyZ2luOiBNYXRoLmZsb29yKGNmZy5USUxFX1NJWkUgKiAwLjA1KSxcbiAgICAgICAgc2FmZUFyZWE6IHtcbiAgICAgICAgICBtaW5YOiBNYXRoLmZsb29yKGNmZy5USUxFX1NJWkUgKiAwLjA1KSxcbiAgICAgICAgICBtYXhYOiBjZmcuVElMRV9TSVpFIC0gTWF0aC5mbG9vcihjZmcuVElMRV9TSVpFICogMC4wNSkgLSAxLFxuICAgICAgICAgIG1pblk6IE1hdGguZmxvb3IoY2ZnLlRJTEVfU0laRSAqIDAuMDUpLFxuICAgICAgICAgIG1heFk6IGNmZy5USUxFX1NJWkUgLSBNYXRoLmZsb29yKGNmZy5USUxFX1NJWkUgKiAwLjA1KSAtIDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICAgIFxuICAgIHNldFBpeGVsc1BlckJhdGNoOiAoY291bnQpID0+IHtcbiAgICAgIGNmZy5QSVhFTFNfUEVSX0JBVENIID0gY2xhbXAoY291bnQsIDEsIDUwKTtcbiAgICAgIHNhdmVGYXJtQ2ZnKGNmZyk7XG4gICAgICB1aS51cGRhdGVDb25maWcoKTtcbiAgICAgIGxvZyhgUFx1MDBFRHhlbGVzIHBvciBsb3RlIGNvbmZpZ3VyYWRvIGE6ICR7Y2ZnLlBJWEVMU19QRVJfQkFUQ0h9YCk7XG4gICAgfSxcbiAgICBcbiAgICBzZXRNaW5DaGFyZ2VzOiAobWluKSA9PiB7XG4gICAgICBjZmcuTUlOX0NIQVJHRVMgPSBNYXRoLm1heCgwLCBtaW4pO1xuICAgICAgc2F2ZUZhcm1DZmcoY2ZnKTtcbiAgICAgIHVpLnVwZGF0ZUNvbmZpZygpO1xuICAgICAgbG9nKGBDYXJnYXMgbVx1MDBFRG5pbWFzIGNvbmZpZ3VyYWRhcyBhOiAke2NmZy5NSU5fQ0hBUkdFU31gKTtcbiAgICB9LFxuICAgIFxuICAgIHNldERlbGF5OiAoc2Vjb25kcykgPT4ge1xuICAgICAgY2ZnLkRFTEFZX01TID0gTWF0aC5tYXgoMTAwMCwgc2Vjb25kcyAqIDEwMDApO1xuICAgICAgc2F2ZUZhcm1DZmcoY2ZnKTtcbiAgICAgIHVpLnVwZGF0ZUNvbmZpZygpO1xuICAgICAgbG9nKGBEZWxheSBjb25maWd1cmFkbyBhOiAke2NmZy5ERUxBWV9NU31tc2ApO1xuICAgIH0sXG4gICAgXG4gICAgZGlhZ25vc2U6ICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRzID0gd2luZG93LldQQVVJLmdldFN0YXRzKCk7XG4gICAgICBjb25zdCBkaWFnbm9zaXMgPSB7XG4gICAgICAgIGNvbmZpZ1ZhbGlkOiBOdW1iZXIuaXNGaW5pdGUoY2ZnLlRJTEVfWCkgJiYgTnVtYmVyLmlzRmluaXRlKGNmZy5USUxFX1kpLFxuICAgICAgICBoYXNDaGFyZ2VzOiBmYXJtU3RhdGUuY2hhcmdlcy5jb3VudCA+IDAsXG4gICAgICAgIGJhY2tlbmRIZWFsdGh5OiBmYXJtU3RhdGUuaGVhbHRoPy51cCB8fCBmYWxzZSxcbiAgICAgICAgdXNlckxvZ2dlZEluOiAhIWZhcm1TdGF0ZS51c2VyLFxuICAgICAgICBjb29yZGluYXRlczogYCgke2NmZy5USUxFX1h9LCR7Y2ZnLlRJTEVfWX0pYCxcbiAgICAgICAgc2FmZUFyZWE6IHN0YXRzLnRpbGVJbmZvLnNhZmVBcmVhLFxuICAgICAgICByZWNvbW1lbmRhdGlvbnM6IFtdXG4gICAgICB9O1xuICAgICAgXG4gICAgICBpZiAoIWRpYWdub3Npcy5jb25maWdWYWxpZCkge1xuICAgICAgICBkaWFnbm9zaXMucmVjb21tZW5kYXRpb25zLnB1c2goJ0NhbGlicmFyIGNvb3JkZW5hZGFzIGRlbCB0aWxlJyk7XG4gICAgICB9XG4gICAgICBpZiAoIWRpYWdub3Npcy5oYXNDaGFyZ2VzKSB7XG4gICAgICAgIGRpYWdub3Npcy5yZWNvbW1lbmRhdGlvbnMucHVzaCgnRXNwZXJhciBhIHF1ZSBzZSByZWdlbmVyZW4gbGFzIGNhcmdhcycpO1xuICAgICAgfVxuICAgICAgaWYgKCFkaWFnbm9zaXMuYmFja2VuZEhlYWx0aHkpIHtcbiAgICAgICAgZGlhZ25vc2lzLnJlY29tbWVuZGF0aW9ucy5wdXNoKCdWZXJpZmljYXIgY29uZXhpXHUwMEYzbiBhbCBiYWNrZW5kJyk7XG4gICAgICB9XG4gICAgICBpZiAoIWRpYWdub3Npcy51c2VyTG9nZ2VkSW4pIHtcbiAgICAgICAgZGlhZ25vc2lzLnJlY29tbWVuZGF0aW9ucy5wdXNoKCdJbmljaWFyIHNlc2lcdTAwRjNuIGVuIGxhIHBsYXRhZm9ybWEnKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc29sZS50YWJsZShkaWFnbm9zaXMpO1xuICAgICAgcmV0dXJuIGRpYWdub3NpcztcbiAgICB9LFxuICAgIFxuICAgIGNoZWNrSGVhbHRoOiBjaGVja0JhY2tlbmRIZWFsdGgsXG4gICAgXG4gICAgcmVzZXRDb25maWc6ICgpID0+IHtcbiAgICAgIHJlc2V0VG9TYWZlRGVmYXVsdHMoKTtcbiAgICAgIGNmZyA9IHsgLi4uRkFSTV9ERUZBVUxUUyB9O1xuICAgICAgdWkudXBkYXRlQ29uZmlnKCk7XG4gICAgICBsb2coJ0NvbmZpZ3VyYWNpXHUwMEYzbiByZXNldGVhZGEgYSB2YWxvcmVzIHBvciBkZWZlY3RvJyk7XG4gICAgfSxcbiAgICBcbiAgICBkZWJ1Z1JldHJpZXM6ICgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnRSZXRyaWVzOiBmYXJtU3RhdGUucmV0cnlDb3VudCxcbiAgICAgICAgaW5Db29sZG93bjogZmFybVN0YXRlLmluQ29vbGRvd24sXG4gICAgICAgIG5leHRQYWludFRpbWU6IGZhcm1TdGF0ZS5uZXh0UGFpbnRUaW1lLFxuICAgICAgICBjb29sZG93bkVuZFRpbWU6IGZhcm1TdGF0ZS5jb29sZG93bkVuZFRpbWVcbiAgICAgIH07XG4gICAgfSxcbiAgICBcbiAgICBmb3JjZUNsZWFyQ29vbGRvd246ICgpID0+IHtcbiAgICAgIGZhcm1TdGF0ZS5pbkNvb2xkb3duID0gZmFsc2U7XG4gICAgICBmYXJtU3RhdGUubmV4dFBhaW50VGltZSA9IDA7XG4gICAgICBmYXJtU3RhdGUuY29vbGRvd25FbmRUaW1lID0gMDtcbiAgICAgIGZhcm1TdGF0ZS5yZXRyeUNvdW50ID0gMDtcbiAgICAgIGxvZygnQ29vbGRvd24gZm9yemFkbyBhIGxpbXBpYXInKTtcbiAgICB9LFxuICAgIFxuICAgIHNpbXVsYXRlRXJyb3I6IChzdGF0dXNDb2RlID0gNTAwKSA9PiB7XG4gICAgICBsb2coYFNpbXVsYW5kbyBlcnJvciAke3N0YXR1c0NvZGV9IHBhcmEgdGVzdGluZy4uLmApO1xuICAgICAgdWkuc2V0U3RhdHVzKGBcdUQ4M0VcdURERUEgU2ltdWxhbmRvIGVycm9yICR7c3RhdHVzQ29kZX1gLCAnZXJyb3InKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQ2xlYW51cCBhbCBjZXJyYXIgbGEgcFx1MDBFMWdpbmFcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcbiAgICBmYXJtU3RhdGUucnVubmluZyA9IGZhbHNlO1xuICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5mYXJtUnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBjb29yZGluYXRlQ2FwdHVyZS5kaXNhYmxlKCk7XG4gICAgdWkuZGVzdHJveSgpO1xuICB9KTtcblxuICBsb2coJ1x1MjcwNSBGYXJtIEJvdCBpbmljaWFsaXphZG8gY29ycmVjdGFtZW50ZScpO1xuICBsb2coJ1x1RDgzRFx1RENBMSBVc2EgY29uc29sZS5sb2cod2luZG93LldQQVVJKSBwYXJhIHZlciBsYSBBUEkgZGlzcG9uaWJsZScpO1xuXG59KSgpLmNhdGNoKChlKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoXCJbQk9UXSBFcnJvciBlbiBBdXRvLUZhcm06XCIsIGUpO1xuICBpZiAod2luZG93Ll9fd3BsYWNlQm90KSB7XG4gICAgd2luZG93Ll9fd3BsYWNlQm90LmZhcm1SdW5uaW5nID0gZmFsc2U7XG4gIH1cbiAgYWxlcnQoXCJBdXRvLUZhcm06IGVycm9yIGluZXNwZXJhZG8uIFJldmlzYSBjb25zb2xhLlwiKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBVU8sTUFBTSxNQUFNLElBQUksTUFBTSxRQUFRLElBQUksWUFBWSxHQUFHLENBQUM7OztBQ1RsRCxNQUFNLGdCQUFnQjtBQUFBLElBQzNCLFNBQVM7QUFBQTtBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBO0FBQUEsSUFDWCxVQUFVO0FBQUE7QUFBQSxJQUNWLGFBQWE7QUFBQTtBQUFBLElBQ2IsaUJBQWlCO0FBQUE7QUFBQSxJQUNqQixrQkFBa0I7QUFBQTtBQUFBLElBQ2xCLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsZ0JBQWdCLENBQUMsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFNBQVM7QUFBQTtBQUFBLElBRWpGLFFBQVE7QUFBQTtBQUFBLElBQ1IsUUFBUTtBQUFBO0FBQUEs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LE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLGVBQWU7QUFBQSxNQUNmLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BRW5CLHFCQUFxQjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNWLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLHlCQUF5QjtBQUFBLE1BQ3pCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUFBLE1BRWQsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2Qsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBO0FBQUEsTUFFWCxlQUFlO0FBQUEsTUFDZixVQUFVO0FBQUEsTUFDVixlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixtQkFBbUI7QUFBQSxNQUNuQixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsSUFDaEI7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGOzs7QUNqVE8sTUFBTSxLQUFLO0FBQUE7QUFBQSxJQUVoQixVQUFVO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsSUFDYjtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixtQkFBbUI7QUFBQSxNQUVuQixtQkFBbUI7QUFBQSxNQUVuQixxQkFBcUI7QUFBQSxNQUNyQixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDVixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQix5QkFBeUI7QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixvQkFBb0I7QUFBQSxNQUNwQixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUE7QUFBQSxNQUVkLG1CQUFtQjtBQUFBLE1BQ25CLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLG9CQUFvQjtBQUFBLE1BQ3BCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLHFCQUFxQjtBQUFBLE1BQ3JCLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLG9CQUFvQjtBQUFBLE1BQ3BCLG9CQUFvQjtBQUFBLE1BQ3BCLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLHFCQUFxQjtBQUFBLE1BQ3JCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLHFCQUFxQjtBQUFBLE1BQ3JCLGdCQUFnQjtBQUFBLE1BQ2hCLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLG9CQUFvQjtBQUFBLE1BQ3BCLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLFFBQVE7QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLElBQUk7QUFBQSxNQUNKLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLElBQ25CO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLG9CQUFvQjtBQUFBLE1BQ3BCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLG9CQUFvQjtBQUFBLE1BQ3BCLGtCQUFrQjtBQUFBLE1BQ2xCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjs7O0FDN1NPLE1BQU0sS0FBSztBQUFBO0FBQUEsSUFFaEIsVUFBVTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFB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QSxNQUNYLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLGVBQWU7QUFBQSxNQUNmLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBLE1BRW5CLG1CQUFtQjtBQUFBLE1BRW5CLHFCQUFxQjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLHlCQUF5QjtBQUFBLE1BQ3pCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUFBLE1BRWQsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2Qsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BRWIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGOzs7QUM5U08sTUFBTSxTQUFTO0FBQUE7QUFBQSxJQUVwQixVQUFVO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsSUFDYjtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFD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N1NPLE1BQU0sU0FBUztBQUFBO0FBQUEsSUFFcEIsVUFBVTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUEsTUFFbEIsbUJBQW1CO0FBQUEsTUFFcEIscUJBQXFCO0FBQUEsTUFDckIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIseUJBQXlCO0FBQUEsTUFDekIsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBO0FBQUEsTUFFZCxtQkFB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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlTcEIsV0FBTyxZQUFZLEtBQUs7QUFFeEIsVUFBTSxZQUFZLFNBQVMsY0FBYyxLQUFLO0FBQzlDLGNBQVUsWUFBWTtBQUd0QixVQUFNLFVBQVU7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxJQUNoQjtBQUVBLGNBQVUsWUFBWTtBQUFBO0FBQUE7QUFBQSxvQkFHWCxFQUFFLFlBQVksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkRBUXdCLEVBQUUsY0FBYyxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FLeEIsRUFBRSxjQUFjLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FJakIsRUFBRSxjQUFjLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FJakIsRUFBRSxjQUFjLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FJakIsRUFBRSxXQUFXLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRFQUtPLEVBQUUsWUFBWSxDQUFDO0FBQUEsbUZBQ1IsRUFBRSxXQUFXLENBQUM7QUFBQSxtRkFDWCxFQUFFLHFCQUFxQixDQUFDO0FBQUEsd0VBQ25DLEVBQUUsZ0JBQWdCLENBQUM7QUFBQSx3RkFDSCxFQUFFLGdCQUFnQixLQUFLLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9EQUtqRSxFQUFFLG1CQUFtQixDQUFDLDZCQUE2QixFQUFFLGlCQUFpQixDQUFDO0FBQUEsMERBQ3BFLEVBQUUsc0JBQXNCLENBQUM7QUFBQTtBQUFBO0FBQUEsa0VBR2QsRUFBRSxxQkFBcUIsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseURBS3BDLEVBQUUsb0JBQW9CLENBQUM7QUFBQTtBQUFBO0FBQUEsdUNBRy9CLEVBQUUsWUFBWSxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FLZixFQUFFLHFCQUFxQixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FLeEIsRUFBRSxpQkFBaUIsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBS3BCLEVBQUUsZ0JBQWdCLENBQUM7QUFBQTtBQUFBLHFDQUVyQixFQUFFLGFBQWEsQ0FBQztBQUFBLG9DQUNqQixFQUFFLFlBQVksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBS1osRUFBRSxZQUFZLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FPZixFQUFFLGlCQUFpQixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFRNUMsRUFBRSxlQUFlLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQUtRLEVBQUUsWUFBWSxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FLZixFQUFFLFlBQVksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBS2YsRUFBRSxvQkFBb0IsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLGtDQUk5QixFQUFFLHFCQUFxQixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEVBSVMsRUFBRSxhQUFhLENBQUM7QUFBQSwwRUFDaEIsRUFBRSxhQUFhLENBQUM7QUFBQSwyRUFDZixFQUFFLGNBQWMsQ0FBQztBQUFBLDZFQUNmLEVBQUUsY0FBYyxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9yRixXQUFPLFlBQVksU0FBUztBQUM1QixhQUFTLEtBQUssWUFBWSxVQUFVO0FBR3BDLFVBQU0sU0FBUyxPQUFPLGNBQWMsZ0JBQWdCO0FBQ3BELGVBQVcsUUFBUSxVQUFVO0FBRzdCLFVBQU0sV0FBVztBQUFBLE1BQ2YsYUFBYSxPQUFPLGNBQWMsa0JBQWtCO0FBQUEsTUFDcEQsU0FBUyxPQUFPLGNBQWMsaUJBQWlCO0FBQUEsTUFDL0MsUUFBUSxPQUFPLGVBQWUsUUFBUTtBQUFBLE1BQ3RDLGNBQWMsT0FBTyxlQUFlLGVBQWU7QUFBQSxNQUNuRCxjQUFjLE9BQU8sZUFBZSxlQUFlO0FBQUEsTUFDbkQsWUFBWSxPQUFPLGVBQWUsYUFBYTtBQUFBLE1BQy9DLFNBQVMsT0FBTyxlQUFlLFVBQVU7QUFBQSxNQUN6QyxVQUFVLE9BQU8sZUFBZSxXQUFXO0FBQUEsTUFDM0MsU0FBUyxPQUFPLGVBQWUsVUFBVTtBQUFBLE1BQ3pDLG1CQUFtQixPQUFPLGVBQWUscUJBQXFCO0FBQUEsTUFDOUQsU0FBUyxPQUFPLGVBQWUsVUFBVTtBQUFBLE1BQ3pDLGNBQWMsT0FBTyxlQUFlLGdCQUFnQjtBQUFBLE1BQ3BELFVBQVUsT0FBTyxlQUFlLFdBQVc7QUFBQSxNQUMzQyxhQUFhLE9BQU8sZUFBZSxjQUFjO0FBQUEsTUFDakQsY0FBYyxPQUFPLGVBQWUsZUFBZTtBQUFBLE1BQ25ELFlBQVksT0FBTyxlQUFlLGFBQWE7QUFBQSxNQUMvQyxhQUFhLE9BQU8sZUFBZSxjQUFjO0FBQUEsTUFDakQsaUJBQWlCLE9BQU8sZUFBZSxtQkFBbUI7QUFBQSxNQUMxRCxpQkFBaUIsT0FBTyxlQUFlLG1CQUFtQjtBQUFBLE1BQzFELGVBQWUsT0FBTyxlQUFlLGlCQUFpQjtBQUFBLE1BQ3RELGVBQWUsT0FBTyxlQUFlLGlCQUFpQjtBQUFBLE1BQ3RELGVBQWUsT0FBTyxlQUFlLGlCQUFpQjtBQUFBLE1BQ3RELGVBQWUsT0FBTyxlQUFlLGlCQUFpQjtBQUFBLE1BQ3RELGlCQUFpQixPQUFPLGVBQWUsbUJBQW1CO0FBQUEsTUFDMUQsZ0JBQWdCLE9BQU8sZUFBZSxpQkFBaUI7QUFBQSxNQUN2RCxpQkFBaUIsT0FBTyxlQUFlLGtCQUFrQjtBQUFBLE1BQ3pELGVBQWUsT0FBTyxlQUFlLGdCQUFnQjtBQUFBLE1BQ3JELFlBQVksT0FBTyxlQUFlLGNBQWM7QUFBQSxNQUNoRCxZQUFZLE9BQU8sZUFBZSxjQUFjO0FBQUEsTUFDaEQsb0JBQW9CLE9BQU8sZUFBZSxzQkFBc0I7QUFBQSxNQUNoRSxTQUFTLE9BQU8sZUFBZSxVQUFVO0FBQUEsTUFDekMsU0FBUyxPQUFPLGVBQWUsVUFBVTtBQUFBLE1BQ3pDLFVBQVUsT0FBTyxlQUFlLFdBQVc7QUFBQSxNQUMzQyxZQUFZLE9BQU8sZUFBZSxhQUFhO0FBQUEsSUFDakQ7QUFHQSxhQUFTLHlCQUF5QjtBQTVlcEMsVUFBQUM7QUE2ZUksZUFBUyxXQUFXLFFBQVEsT0FBTztBQUNuQyxlQUFTLFlBQVksUUFBUSxPQUFPO0FBQ3BDLGVBQVMsZ0JBQWdCLFFBQVEsT0FBTztBQUN4QyxlQUFTLGdCQUFnQixRQUFRLE9BQU87QUFDeEMsZUFBUyxjQUFjLFFBQVEsT0FBTztBQUN0QyxlQUFTLGNBQWMsUUFBUSxPQUFPO0FBQ3RDLGVBQVMsZ0JBQWdCLFFBQVEsT0FBTztBQUN4QyxlQUFTLFdBQVcsUUFBUSxPQUFPLFVBQVU7QUFDN0MsZUFBUyxXQUFXLFFBQVEsT0FBTyxVQUFVO0FBQzdDLGVBQVMsbUJBQW1CLFNBQVMsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLEtBQUssR0FBRztBQUcxRSxnQ0FBMEI7QUFDMUIsd0JBQWtCO0FBQ2xCLHdCQUFrQjtBQUNsQiwyQkFBbUJBLE1BQUEsOEJBQUFBLElBQVcsWUFBVyxLQUFLO0FBQUEsSUFDaEQ7QUFHQSxhQUFTLHlCQUF5QjtBQUNoQyxhQUFPLFdBQVcsU0FBUyxTQUFTLFdBQVcsS0FBSyxLQUFLLGNBQWM7QUFDdkUsYUFBTyxtQkFBbUIsTUFBTSxTQUFTLFNBQVMsWUFBWSxLQUFLLEtBQUssY0FBYyxrQkFBa0IsR0FBRyxFQUFFO0FBQzdHLGFBQU8sY0FBYyxXQUFXLFNBQVMsZ0JBQWdCLEtBQUssS0FBSyxjQUFjO0FBQ2pGLGFBQU8sYUFBYSxTQUFTLGdCQUFnQjtBQUM3QyxhQUFPLFlBQVksTUFBTSxTQUFTLFNBQVMsY0FBYyxLQUFLLEtBQUssY0FBYyxXQUFXLEdBQUcsRUFBRTtBQUNqRyxhQUFPLFlBQVksTUFBTSxTQUFTLFNBQVMsY0FBYyxLQUFLLEtBQUssY0FBYyxXQUFXLEdBQUcsRUFBRTtBQUNqRyxhQUFPLGNBQWMsTUFBTSxTQUFTLFNBQVMsZ0JBQWdCLEtBQUssS0FBSyxjQUFjLGFBQWEsR0FBRyxFQUFFO0FBR3ZHLFVBQUksT0FBTyxZQUFZLE9BQU8sV0FBVztBQUN2QyxlQUFPLFlBQVksT0FBTztBQUMxQixpQkFBUyxjQUFjLFFBQVEsT0FBTztBQUFBLE1BQ3hDO0FBRUEsWUFBTSxRQUFRLFNBQVMsU0FBUyxXQUFXLEtBQUs7QUFDaEQsWUFBTSxRQUFRLFNBQVMsU0FBUyxXQUFXLEtBQUs7QUFDaEQsVUFBSSxPQUFPLFNBQVMsS0FBSyxFQUFHLFFBQU8sU0FBUztBQUM1QyxVQUFJLE9BQU8sU0FBUyxLQUFLLEVBQUcsUUFBTyxTQUFTO0FBRTVDLHdCQUFrQjtBQUNsQix3QkFBa0I7QUFBQSxJQUNwQjtBQUdBLGFBQVMsNEJBQTRCO0FBQ25DLFlBQU0sT0FBTyxTQUFTLGdCQUFnQjtBQUN0QyxlQUFTLGNBQWMsTUFBTSxVQUFVLFNBQVMsV0FBVyxTQUFTO0FBQ3BFLGVBQVMsY0FBYyxNQUFNLFVBQVUsU0FBUyxVQUFVLFNBQVM7QUFBQSxJQUNyRTtBQUdBLGFBQVMsb0JBQW9CO0FBQzNCLFVBQUksU0FBUyxTQUFTO0FBQ3BCLGlCQUFTLFFBQVEsY0FBYyxHQUFHLE9BQU8sVUFBVSxDQUFDLElBQUksT0FBTyxVQUFVLENBQUM7QUFBQSxNQUM1RTtBQUFBLElBQ0Y7QUFHQSxhQUFTLG9CQUFvQjtBQXZpQi9CLFVBQUFBO0FBd2lCSSxVQUFJLFNBQVMsYUFBYTtBQUN4QixZQUFJLE9BQU8scUJBQXFCLE9BQU8sV0FBVyxRQUFRLE9BQU8sV0FBVyxNQUFNO0FBQ2hGLG1CQUFTLFlBQVksY0FBYyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsT0FBTyxRQUFRLEdBQUcsT0FBTyxPQUFPLENBQUM7QUFDL0YsbUJBQVMsWUFBWSxNQUFNLFFBQVE7QUFBQSxRQUNyQyxPQUFPO0FBQ0wsbUJBQVMsWUFBWSxjQUFjLEVBQUUsaUJBQWlCO0FBQ3RELG1CQUFTLFlBQVksTUFBTSxRQUFRO0FBQUEsUUFDckM7QUFBQSxNQUNGO0FBR0EsMkJBQW1CQSxNQUFBLDhCQUFBQSxJQUFXLFlBQVcsS0FBSztBQUFBLElBQ2hEO0FBR0EsbUJBQVMsZ0JBQVQsbUJBQXNCLGlCQUFpQixTQUFTLE1BQU07QUFDcEQsY0FBUSxZQUFZLENBQUMsUUFBUTtBQUM3QixlQUFTLFFBQVEsVUFBVSxPQUFPLGFBQWEsUUFBUSxTQUFTO0FBQ2hFLGVBQVMsWUFBWSxjQUFjLFFBQVEsWUFBWSxNQUFNO0FBQUEsSUFDL0Q7QUFFQSxtQkFBUyxhQUFULG1CQUFtQixpQkFBaUIsU0FBUyxNQUFNO0FBQ2pELDZCQUF1QjtBQUN2QixjQUFRO0FBQ1IseUJBQW1CLElBQUk7QUFBQSxJQUN6QjtBQUVBLG1CQUFTLFlBQVQsbUJBQWtCLGlCQUFpQixTQUFTLE1BQU07QUFDaEQsYUFBTztBQUNQLHlCQUFtQixLQUFLO0FBQUEsSUFDMUI7QUFFQSxtQkFBUyxZQUFULG1CQUFrQixpQkFBaUIsU0FBUyxNQUFNO0FBRWhELDZCQUF1QjtBQUN2Qiw2QkFBdUI7QUFFdkIsVUFBSSxPQUFPLFNBQVMsT0FBTyxNQUFNLE1BQU07QUFDckMsZUFBTyxNQUFNLEtBQUs7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFFQSxtQkFBUyxzQkFBVCxtQkFBNEIsaUJBQWlCLFNBQVMsTUFBTTtBQUMxRCx5QkFBbUIsUUFBUSxXQUFXLGlCQUFpQjtBQUFBLElBQ3pEO0FBR0EsUUFBSSxZQUFZO0FBQ2hCLG1CQUFTLGlCQUFULG1CQUF1QixpQkFBaUIsU0FBUyxNQUFNO0FBQ3JELFVBQUksQ0FBQyxXQUFXO0FBQ2Qsb0JBQVksZ0JBQWdCLE1BQU07QUFDbEMsa0JBQVUsS0FBSztBQUFBLE1BQ2pCLE9BQU87QUFDTCxrQkFBVSxPQUFPO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRUEsbUJBQVMsb0JBQVQsbUJBQTBCLGlCQUFpQixVQUFVLE1BQU07QUFDekQsZ0NBQTBCO0FBQzFCLDZCQUF1QjtBQUFBLElBQ3pCO0FBRUEsbUJBQVMsdUJBQVQsbUJBQTZCLGlCQUFpQixTQUFTLE1BQU07QUFDM0QsNkJBQXVCO0FBQUEsSUFDekI7QUFFQSxtQkFBUyxtQkFBVCxtQkFBeUIsaUJBQWlCLFNBQVMsTUFBTTtBQUN2RCxjQUFRLGVBQWUsQ0FBQyxRQUFRO0FBQ2hDLGVBQVMsZ0JBQWdCLE1BQU0sVUFBVSxRQUFRLGVBQWUsVUFBVTtBQUMxRSxlQUFTLGNBQWMsY0FBYyxRQUFRLGVBQWUsV0FBTTtBQUFBLElBQ3BFO0FBR0EsS0FBQyxjQUFjLGVBQWUsbUJBQW1CLGlCQUFpQixpQkFBaUIsbUJBQW1CLGNBQWMsWUFBWSxFQUFFLFFBQVEsZUFBYTtBQWpuQnpKLFVBQUFBO0FBa25CSSxPQUFBQSxNQUFBLFNBQVMsU0FBUyxNQUFsQixnQkFBQUEsSUFBcUIsaUJBQWlCLFVBQVU7QUFBQSxJQUNsRCxDQUFDO0FBRUQsbUJBQVMsWUFBVCxtQkFBa0IsaUJBQWlCLFNBQVMsTUFBTTtBQUNoRCw2QkFBdUI7QUFDdkIsa0JBQVksTUFBTTtBQUNsQixnQkFBVSxhQUFNLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxTQUFTO0FBQUEsSUFDcEQ7QUFFQSxtQkFBUyxZQUFULG1CQUFrQixpQkFBaUIsU0FBUyxNQUFNO0FBQ2hELFlBQU0sU0FBUyxZQUFZLGFBQWE7QUFDeEMsYUFBTyxPQUFPLFFBQVEsTUFBTTtBQUM1Qiw2QkFBdUI7QUFDdkIsZ0JBQVUsYUFBTSxFQUFFLG1CQUFtQixDQUFDLElBQUksU0FBUztBQUFBLElBQ3JEO0FBRUEsbUJBQVMsYUFBVCxtQkFBbUIsaUJBQWlCLFNBQVMsTUFBTTtBQUNqRCxtQkFBYTtBQUNiLGFBQU8sT0FBTyxRQUFRLGFBQWE7QUFDbkMsNkJBQXVCO0FBQ3ZCLGdCQUFVLGFBQU0sRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLFNBQVM7QUFBQSxJQUNwRDtBQUVBLG1CQUFTLGVBQVQsbUJBQXFCLGlCQUFpQixTQUFTLE1BQU07QUFFbkQsZ0JBQVUsYUFBTSxFQUFFLDBCQUEwQixDQUFDLElBQUksUUFBUTtBQUFBLElBRTNEO0FBR0EsYUFBUyxtQkFBbUIsU0FBUztBQUNuQyxVQUFJLFNBQVMsVUFBVTtBQUlyQixjQUFNLGlCQUFpQixDQUFDLE9BQU8scUJBQXFCLE9BQU8sV0FBVyxRQUFRLE9BQU8sV0FBVztBQUNoRyxpQkFBUyxTQUFTLFdBQVcsV0FBVztBQUd4QyxZQUFJLGdCQUFnQjtBQUNsQixtQkFBUyxTQUFTLGNBQWMsYUFBTSxFQUFFLHFCQUFxQixDQUFDO0FBQzlELG1CQUFTLFNBQVMsUUFBUSxFQUFFLHNCQUFzQjtBQUFBLFFBQ3BELE9BQU87QUFDTCxtQkFBUyxTQUFTLGNBQWMsZ0JBQU0sRUFBRSxZQUFZLENBQUM7QUFDckQsbUJBQVMsU0FBUyxRQUFRO0FBQUEsUUFDNUI7QUFBQSxNQUNGO0FBQ0EsVUFBSSxTQUFTLFFBQVMsVUFBUyxRQUFRLFdBQVcsQ0FBQztBQUFBLElBQ3JEO0FBR0EsYUFBUyxVQUFVLFNBQVMsT0FBTyxVQUFVO0FBQzNDLFVBQUksU0FBUyxRQUFRO0FBQ25CLGlCQUFTLE9BQU8sY0FBYztBQUM5QixpQkFBUyxPQUFPLFlBQVksaUJBQWlCLElBQUk7QUFDakQsWUFBSSxXQUFXLE9BQU8sRUFBRTtBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQUdBLGFBQVMsWUFBWSxTQUFTLFNBQVMsVUFBVSxHQUFHLFNBQVMsTUFBTTtBQUNqRSxVQUFJLFNBQVMsY0FBYztBQUN6QixpQkFBUyxhQUFhLGNBQWMsV0FBVztBQUFBLE1BQ2pEO0FBQ0EsVUFBSSxTQUFTLGNBQWM7QUFDekIsaUJBQVMsYUFBYSxjQUFjLE9BQU8sWUFBWSxXQUFXLFFBQVEsUUFBUSxDQUFDLElBQUk7QUFBQSxNQUN6RjtBQUNBLFVBQUksU0FBUyxZQUFZO0FBQ3ZCLGlCQUFTLFdBQVcsY0FBYyxXQUFXO0FBQUEsTUFDL0M7QUFDQSxVQUFJLFNBQVMsZ0JBQWdCLFFBQVE7QUFDbkMsaUJBQVMsYUFBYSxjQUFjLE9BQU8sS0FBSyxhQUFNLEVBQUUsb0JBQW9CLENBQUMsS0FBSyxhQUFNLEVBQUUscUJBQXFCLENBQUM7QUFDaEgsaUJBQVMsYUFBYSxZQUFZLGlCQUFpQixPQUFPLEtBQUssV0FBVyxTQUFTO0FBQUEsTUFDckY7QUFBQSxJQUNGO0FBR0EsYUFBUyxjQUFjO0FBQ3JCLGdCQUFVLE1BQU0sWUFBWTtBQUM1QixpQkFBVyxNQUFNO0FBQ2Ysa0JBQVUsTUFBTSxZQUFZO0FBQUEsTUFDOUIsR0FBRyxHQUFHO0FBQUEsSUFDUjtBQUdBLDJCQUF1QjtBQUd2QixhQUFTLGNBQWM7QUExc0J6QixVQUFBQTtBQTRzQkksWUFBTSxRQUFRLE9BQU8sY0FBYyxlQUFlO0FBQ2xELFVBQUksT0FBTztBQUNULGNBQU0sWUFBWSxhQUFNLEVBQUUsWUFBWSxDQUFDO0FBQUEsTUFDekM7QUFHQSxVQUFJLFNBQVMsU0FBVSxVQUFTLFNBQVMsWUFBWSxnQkFBTSxFQUFFLFlBQVksQ0FBQztBQUMxRSxVQUFJLFNBQVMsUUFBUyxVQUFTLFFBQVEsWUFBWSxnQkFBTSxFQUFFLFdBQVcsQ0FBQztBQUN2RSxVQUFJLFNBQVMsa0JBQW1CLFVBQVMsa0JBQWtCLFlBQVksYUFBTSxFQUFFLHFCQUFxQixDQUFDO0FBQ3JHLFVBQUksU0FBUyxRQUFTLFVBQVMsUUFBUSxZQUFZLGFBQU0sRUFBRSxnQkFBZ0IsQ0FBQztBQUc1RSxZQUFNLGVBQWUsT0FBTyxjQUFjLGdCQUFnQixFQUFFLGNBQWMsY0FBYyxvQkFBb0I7QUFDNUcsWUFBTSxlQUFlLE9BQU8sY0FBYyxnQkFBZ0IsRUFBRSxjQUFjLGNBQWMsb0JBQW9CO0FBQzVHLFlBQU0sYUFBYSxPQUFPLGNBQWMsY0FBYyxFQUFFLGNBQWMsY0FBYyxvQkFBb0I7QUFDeEcsWUFBTSxZQUFZLE9BQU8sY0FBYyxXQUFXLEVBQUUsY0FBYyxjQUFjLG9CQUFvQjtBQUVwRyxVQUFJLGFBQWMsY0FBYSxjQUFjLEVBQUUsY0FBYztBQUM3RCxVQUFJLGFBQWMsY0FBYSxjQUFjLEVBQUUsY0FBYztBQUM3RCxVQUFJLFdBQVksWUFBVyxjQUFjLEVBQUUsY0FBYztBQUN6RCxVQUFJLFVBQVcsV0FBVSxjQUFjLEVBQUUsV0FBVztBQUdwRCxZQUFNLGNBQWMsT0FBTyxjQUFjLHVCQUF1QjtBQUNoRSxVQUFJLFlBQWEsYUFBWSxZQUFZLGdCQUFNLEVBQUUsb0JBQW9CLENBQUM7QUFFdEUsWUFBTSxnQkFBZ0IsT0FBTyxlQUFlLGlCQUFpQjtBQUM3RCxVQUFJLGVBQWU7QUFDakIsY0FBTSxRQUFRLGNBQWMsY0FBYyxpQkFBaUI7QUFDM0QsY0FBTSxZQUFZLFFBQVEsTUFBTSxjQUFjO0FBQzlDLHNCQUFjLFlBQVksYUFBTSxFQUFFLGVBQWUsQ0FBQyw4QkFBOEIsU0FBUztBQUFBLE1BQzNGO0FBTUEsWUFBTSxrQkFBa0IsU0FBUztBQUNqQyxVQUFJLGlCQUFpQjtBQUNuQixjQUFNLGVBQWUsZ0JBQWdCLGNBQWMsd0JBQXdCO0FBQzNFLGNBQU0sY0FBYyxnQkFBZ0IsY0FBYyx1QkFBdUI7QUFDekUsWUFBSSxhQUFjLGNBQWEsY0FBYyxFQUFFLGFBQWE7QUFDNUQsWUFBSSxZQUFhLGFBQVksY0FBYyxFQUFFLFlBQVk7QUFBQSxNQUMzRDtBQUdBLFVBQUksU0FBUyxvQkFBb0I7QUFDL0IsaUJBQVMsbUJBQW1CLGNBQWMsRUFBRSxxQkFBcUI7QUFBQSxNQUNuRTtBQUdBLFVBQUksU0FBUyxRQUFTLFVBQVMsUUFBUSxZQUFZLGFBQU0sRUFBRSxhQUFhLENBQUM7QUFDekUsVUFBSSxTQUFTLFFBQVMsVUFBUyxRQUFRLFlBQVksYUFBTSxFQUFFLGFBQWEsQ0FBQztBQUN6RSxVQUFJLFNBQVMsU0FBVSxVQUFTLFNBQVMsWUFBWSxhQUFNLEVBQUUsY0FBYyxDQUFDO0FBQzVFLFVBQUksU0FBUyxXQUFZLFVBQVMsV0FBVyxZQUFZLGFBQU0sRUFBRSxjQUFjLENBQUM7QUFHaEYsd0JBQWtCO0FBR2xCLDJCQUFtQkEsTUFBQSw4QkFBQUEsSUFBVyxZQUFXLEtBQUs7QUFHOUMsWUFBTSxlQUFlLFNBQVM7QUFDOUIsVUFBSSxnQkFBZ0IsYUFBYSxZQUFZLFNBQVMsV0FBSSxHQUFHO0FBQzNELHFCQUFhLGNBQWMsYUFBTSxFQUFFLHFCQUFxQixDQUFDO0FBQUEsTUFDM0Q7QUFHQSxZQUFNLFNBQVMsU0FBUztBQUN4QixVQUFJLFVBQVUsT0FBTyxZQUFZLFNBQVMsV0FBSSxHQUFHO0FBQy9DLGVBQU8sY0FBYyxhQUFNLEVBQUUsY0FBYyxDQUFDO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBR0EsbUJBQWUsbUJBQW1CQyxTQUFRQyxZQUFXQyxvQkFBbUI7QUFDdEUsYUFBTyxJQUFJLFFBQVEsQ0FBQyxZQUFZO0FBQzlCLFFBQUFELFdBQVUsRUFBRSwwQkFBMEIsR0FBRyxNQUFNO0FBRy9DLFFBQUFELFFBQU8sb0JBQW9CO0FBRzNCLGNBQU0sZ0JBQWdCLE9BQU87QUFDN0IsZUFBTyxRQUFRLE9BQU8sS0FBSyxZQUFZO0FBQ3JDLGNBQUlBLFFBQU8scUJBQXFCLElBQUksU0FBUyxZQUFZLEdBQUc7QUFDMUQsZ0JBQUk7QUFDRixvQkFBTSxXQUFXLE1BQU0sY0FBYyxLQUFLLE9BQU87QUFFakQsa0JBQUksU0FBUyxNQUFNLFdBQVcsUUFBUSxNQUFNO0FBQzFDLHNCQUFNLFdBQVcsS0FBSyxNQUFNLFFBQVEsSUFBSTtBQUN4QyxvQkFBSSxTQUFTLFVBQVUsU0FBUyxPQUFPLFVBQVUsR0FBRztBQUNsRCx3QkFBTSxTQUFTLFNBQVMsT0FBTyxDQUFDO0FBQ2hDLHdCQUFNLFNBQVMsU0FBUyxPQUFPLENBQUM7QUFHaEMsd0JBQU0sWUFBWSxJQUFJLE1BQU0sK0JBQStCO0FBQzNELHNCQUFJLFdBQVc7QUFDYixvQkFBQUEsUUFBTyxTQUFTLFNBQVMsVUFBVSxDQUFDLENBQUM7QUFDckMsb0JBQUFBLFFBQU8sU0FBUyxTQUFTLFVBQVUsQ0FBQyxDQUFDO0FBQUEsa0JBQ3ZDO0FBR0Esa0JBQUFBLFFBQU8sU0FBUztBQUNoQixrQkFBQUEsUUFBTyxTQUFTO0FBQ2hCLGtCQUFBQSxRQUFPLG9CQUFvQjtBQUUzQixrQkFBQUEsUUFBTyxvQkFBb0I7QUFDM0IseUJBQU8sUUFBUTtBQUdmLGtCQUFBRSxtQkFBa0I7QUFDbEIsb0NBQWtCO0FBR2xCLHlDQUF1QjtBQUV2QixrQkFBQUQsV0FBVSxFQUFFLGtCQUFrQixHQUFHLFNBQVM7QUFDMUMsc0JBQUksNENBQXVDRCxRQUFPLE1BQU0sSUFBSUEsUUFBTyxNQUFNLFVBQVUsTUFBTSxJQUFJLE1BQU0sV0FBV0EsUUFBTyxXQUFXLEtBQUs7QUFHckksOEJBQVlBLE9BQU07QUFFbEIsMEJBQVEsSUFBSTtBQUFBLGdCQUNkO0FBQUEsY0FDRjtBQUVBLHFCQUFPO0FBQUEsWUFDVCxTQUFTLE9BQU87QUFDZCxrQkFBSSw4QkFBOEIsS0FBSztBQUN2QyxxQkFBTyxjQUFjLEtBQUssT0FBTztBQUFBLFlBQ25DO0FBQUEsVUFDRjtBQUNBLGlCQUFPLGNBQWMsS0FBSyxPQUFPO0FBQUEsUUFDbkM7QUFHQSxtQkFBVyxNQUFNO0FBQ2YsY0FBSUEsUUFBTyxtQkFBbUI7QUFDNUIsbUJBQU8sUUFBUTtBQUNmLFlBQUFBLFFBQU8sb0JBQW9CO0FBQzNCLFlBQUFDLFdBQVUsRUFBRSxzQkFBc0IsR0FBRyxPQUFPO0FBQzVDLG9CQUFRLEtBQUs7QUFBQSxVQUNmO0FBQUEsUUFDRixHQUFHLElBQU07QUFBQSxNQUNYLENBQUM7QUFBQSxJQUNIO0FBR0EsV0FBTyxpQkFBaUIsbUJBQW1CLFdBQVc7QUFHdEQsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxTQUFTLE1BQU07QUFDYixlQUFPLG9CQUFvQixtQkFBbUIsV0FBVztBQUN6RCxpQkFBUyxLQUFLLFlBQVksVUFBVTtBQUFBLE1BQ3RDO0FBQUEsTUFDQSxjQUFjO0FBQUEsTUFDZCxZQUFZLE1BQU07QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFHQSxpQkFBc0Isa0JBQWtCLFFBQVE7QUFDOUMsUUFBSTtBQUNGLFVBQUkscURBQTJDO0FBRS9DLFVBQUksT0FBTyxxQkFBcUIsT0FBTyxVQUFVLFFBQVEsT0FBTyxVQUFVLFFBQVEsT0FBTyxTQUFTLE9BQU8sTUFBTSxLQUFLLE9BQU8sU0FBUyxPQUFPLE1BQU0sR0FBRztBQUNsSixZQUFJLHVFQUE2RCxPQUFPLE1BQU0sS0FBSyxPQUFPLE1BQU0sR0FBRztBQUNuRyxvQkFBWSxNQUFNO0FBQ2xCLGVBQU8sRUFBRSxPQUFPLE9BQU8sUUFBUSxPQUFPLE9BQU8sUUFBUSxTQUFTLEtBQUs7QUFBQSxNQUNyRTtBQUdBLFlBQU0sWUFBWSxJQUFJLE9BQU8sZ0JBQWdCLE9BQU8sU0FBUyxNQUFNO0FBQ25FLFlBQU0sYUFBYSxPQUFPLFNBQVM7QUFHbkMsVUFBSSxPQUFPO0FBR1gsVUFBSSxVQUFVLElBQUksR0FBRyxLQUFLLFVBQVUsSUFBSSxHQUFHLEdBQUc7QUFDNUMsZ0JBQVEsU0FBUyxVQUFVLElBQUksR0FBRyxDQUFDO0FBQ25DLGdCQUFRLFNBQVMsVUFBVSxJQUFJLEdBQUcsQ0FBQztBQUFBLE1BQ3JDO0FBR0EsVUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLFlBQVk7QUFDbEMsY0FBTSxZQUFZLFdBQVcsTUFBTSxrQkFBa0I7QUFDckQsWUFBSSxXQUFXO0FBQ2Isa0JBQVEsU0FBUyxVQUFVLENBQUMsQ0FBQztBQUM3QixrQkFBUSxTQUFTLFVBQVUsQ0FBQyxDQUFDO0FBQUEsUUFDL0I7QUFBQSxNQUNGO0FBR0EsVUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO0FBQ3BCLGNBQU0sbUJBQW1CLFNBQVMsaUJBQWlCLDZDQUE2QztBQUNoRyxtQkFBVyxNQUFNLGtCQUFrQjtBQUNqQyxnQkFBTSxJQUFJLEdBQUcsYUFBYSxRQUFRLEtBQUssR0FBRyxhQUFhLEdBQUc7QUFDMUQsZ0JBQU0sSUFBSSxHQUFHLGFBQWEsUUFBUSxLQUFLLEdBQUcsYUFBYSxHQUFHO0FBQzFELGNBQUksS0FBSyxHQUFHO0FBQ1Ysb0JBQVEsU0FBUyxDQUFDO0FBQ2xCLG9CQUFRLFNBQVMsQ0FBQztBQUNsQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUdBLFVBQUksQ0FBQyxTQUFTLENBQUMsT0FBTztBQUNwQixjQUFNLGNBQWMsU0FBUyxLQUFLLGVBQWU7QUFDakQsY0FBTSxhQUFhLFlBQVksTUFBTSxxRUFBcUU7QUFDMUcsWUFBSSxZQUFZO0FBQ2Qsa0JBQVEsU0FBUyxXQUFXLENBQUMsQ0FBQztBQUM5QixrQkFBUSxTQUFTLFdBQVcsQ0FBQyxDQUFDO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBR0EsVUFBSSxDQUFDLE9BQU8sU0FBUyxLQUFLLEtBQUssQ0FBQyxPQUFPLFNBQVMsS0FBSyxHQUFHO0FBQ3RELGdCQUFRO0FBQ1IsZ0JBQVE7QUFDUixZQUFJLG1GQUFzRTtBQUFBLE1BQzVFO0FBR0EsVUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLE9BQVcsS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFTO0FBQzFELFlBQUksc0ZBQXlFO0FBQzdFLGdCQUFRLEtBQUssSUFBSSxNQUFVLEtBQUssSUFBSSxLQUFTLEtBQUssQ0FBQztBQUNuRCxnQkFBUSxLQUFLLElBQUksTUFBVSxLQUFLLElBQUksS0FBUyxLQUFLLENBQUM7QUFBQSxNQUNyRDtBQUdBLGFBQU8sU0FBUztBQUNoQixhQUFPLFNBQVM7QUFFaEIsVUFBSSw4Q0FBc0MsS0FBSyxLQUFLLEtBQUssR0FBRztBQUc1RCxrQkFBWSxNQUFNO0FBRWxCLGFBQU8sRUFBRSxPQUFPLE9BQU8sU0FBUyxLQUFLO0FBQUEsSUFFdkMsU0FBUyxPQUFPO0FBQ2QsVUFBSSx3Q0FBZ0MsS0FBSztBQUN6QyxhQUFPLEVBQUUsT0FBTyxHQUFHLE9BQU8sR0FBRyxTQUFTLE9BQU8sT0FBTyxNQUFNLFFBQVE7QUFBQSxJQUNwRTtBQUFBLEVBQ0Y7OztBQ3g4QkEsTUFBTSxVQUFVLENBQUMsTUFBTSxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksQ0FBQztBQTBGNUMsV0FBUyx1QkFBdUIsT0FBTyxLQUFLO0FBRWpELFFBQUksQ0FBQyxJQUFJLHFCQUFxQixJQUFJLFdBQVcsUUFBUSxJQUFJLFdBQVcsTUFBTTtBQUN4RSxVQUFJLGtHQUFxRjtBQUN6RixZQUFNRSxVQUFTLENBQUM7QUFDaEIsWUFBTSxTQUFTLEtBQUssTUFBTSxJQUFJLFlBQVksSUFBSTtBQUM5QyxZQUFNLFdBQVcsSUFBSSxZQUFhLFNBQVM7QUFFM0MsZUFBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLEtBQUs7QUFDOUIsY0FBTSxTQUFTLFNBQVMsS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLFFBQVE7QUFDM0QsY0FBTSxTQUFTLFNBQVMsS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLFFBQVE7QUFDM0QsUUFBQUEsUUFBTyxLQUFLLFFBQVEsTUFBTTtBQUFBLE1BQzVCO0FBQ0EsYUFBT0E7QUFBQSxJQUNUO0FBR0EsVUFBTSxTQUFTLENBQUM7QUFDaEIsVUFBTSxVQUFVLElBQUksWUFBWTtBQUdoQyxRQUFJLFdBQVcsS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUM7QUFDeEQsUUFBSSxXQUFXLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxTQUFTLElBQUksTUFBTSxDQUFDO0FBR3hELGFBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxLQUFLO0FBRTlCLGlCQUFXLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUNsRCxpQkFBVyxLQUFLLElBQUksR0FBRyxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFFbEQsYUFBTyxLQUFLLFVBQVUsUUFBUTtBQUc5QjtBQUdBLFVBQUksV0FBVyxTQUFTO0FBQ3RCLG1CQUFXLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxTQUFTLElBQUksTUFBTSxDQUFDO0FBQ3BEO0FBR0EsWUFBSSxXQUFXLFNBQVM7QUFDdEIscUJBQVcsS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUM7QUFBQSxRQUN0RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBR0EsUUFBSSxPQUFPLFVBQVUsR0FBRztBQUN0QixVQUFJLHVDQUE2QixPQUFPLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsZUFBZSxPQUFPLFNBQU8sQ0FBQyxhQUFVO0FBQUEsSUFDdkc7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUVPLFdBQVMsdUJBQXVCLE9BQU8sS0FBSztBQUNqRCxVQUFNLFNBQVMsQ0FBQztBQUNoQixhQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSztBQUM5QixhQUFPLEtBQUssVUFBVSxHQUFHLENBQUM7QUFBQSxJQUM1QjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRU8sV0FBUyxVQUFVLEtBQUs7QUFDN0IsUUFBSSxJQUFJLGVBQWUsU0FBUztBQUM5QixhQUFPLElBQUk7QUFBQSxJQUNiLE9BQU87QUFFTCxZQUFNLE9BQU8sSUFBSSxZQUFZLElBQUksWUFBWTtBQUM3QyxhQUFPLElBQUksWUFBWSxRQUFRLElBQUk7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7OztBQ25LTyxNQUFNQyxTQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsT0FBSyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBYy9ELGlCQUFzQixtQkFBbUIsSUFBSSxVQUFVLE9BQU87QUFDNUQsVUFBTSxZQUFZLEtBQUssSUFBSTtBQUMzQixVQUFNLFVBQVUsWUFBWTtBQUU1QixXQUFPLEtBQUssSUFBSSxJQUFJLFlBQVksQ0FBQyxTQUFTLE1BQU0sVUFBVTtBQUN4RCxZQUFNLFlBQVksVUFBVSxLQUFLLElBQUk7QUFFckMsVUFBSSxVQUFVO0FBQ1osaUJBQVMsU0FBUztBQUFBLE1BQ3BCO0FBRUEsWUFBTUMsT0FBTSxLQUFLLElBQUksS0FBTSxTQUFTLENBQUM7QUFBQSxJQUN2QztBQUFBLEVBQ0Y7OztBQ3BCQSxpQkFBc0Isa0JBQWtCLFFBQVEsUUFBUSxPQUFPO0FBQzdELFFBQUk7QUFFRixZQUFNLFdBQVcsU0FBUyxpQkFBaUIsUUFBUTtBQUNuRCxpQkFBVyxVQUFVLFVBQVU7QUFDN0IsY0FBTSxNQUFNLE9BQU8sV0FBVyxJQUFJO0FBQ2xDLFlBQUksS0FBSztBQUVQLGdCQUFNLFdBQVcsT0FBTyxVQUFVLFdBQVcsSUFBSSxNQUFNLFNBQVMsRUFBRSxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSztBQUV6RixjQUFJLFlBQVk7QUFDaEIsY0FBSSxTQUFTLFFBQVEsUUFBUSxHQUFHLENBQUM7QUFHakMsY0FBSSxPQUFPLFdBQVcsZUFBZSxPQUFPLE9BQU87QUFDakQsbUJBQU8sY0FBYyxJQUFJLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFBQSxVQUN4RDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixTQUFTLE9BQU87QUFDZCxVQUFJLDhCQUE4QixLQUFLO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBR0EsaUJBQXNCLFlBQVksT0FBTyxPQUFPO0FBQzlDLFFBQUk7QUFHRixZQUFNLGVBQWUsZUFBZSxLQUFLLElBQUksS0FBSyxhQUFhLEtBQUssSUFBSSxLQUFLLG1CQUFtQixLQUFLLG1CQUFtQixLQUFLO0FBQzdILFlBQU0sY0FBYyxTQUFTLGNBQWMsWUFBWTtBQUV2RCxVQUFJLGFBQWE7QUFFZixvQkFBWSxVQUFVLElBQUksZUFBZTtBQUN6QyxtQkFBVyxNQUFNO0FBQ2Ysc0JBQVksVUFBVSxPQUFPLGVBQWU7QUFDNUMsc0JBQVksVUFBVSxJQUFJLGNBQWM7QUFDeEMscUJBQVcsTUFBTSxZQUFZLFVBQVUsT0FBTyxjQUFjLEdBQUcsR0FBSTtBQUFBLFFBQ3JFLEdBQUcsR0FBRztBQUNOLFlBQUksU0FBUyxLQUFLLElBQUksS0FBSywyQkFBMkI7QUFBQSxNQUN4RCxPQUFPO0FBRUwsY0FBTSxpQkFBaUIsU0FBUyxpQkFBaUIsUUFBUTtBQUN6RCx1QkFBZSxRQUFRLFlBQVU7QUFDL0IsZ0JBQU0sTUFBTSxPQUFPLFdBQVcsSUFBSTtBQUNsQyxjQUFJLEtBQUs7QUFFUCxrQkFBTSxZQUFZLElBQUksYUFBYSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQzdDLGdCQUFJLGFBQWEsV0FBVyxHQUFHLENBQUM7QUFBQSxVQUNsQztBQUFBLFFBQ0YsQ0FBQztBQUNELFlBQUksNERBQXNELEtBQUssSUFBSSxLQUFLLEdBQUc7QUFBQSxNQUM3RTtBQUFBLElBQ0YsU0FBUyxPQUFPO0FBQ2QsVUFBSSw4Q0FBMkMsS0FBSztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUVBLGlCQUFzQixVQUFVLEtBQUssT0FBTyxXQUFXLGFBQWFDLGFBQVksb0JBQW9CO0FBbEVwRztBQW9FRSxRQUFJLENBQUMsSUFBSSxxQkFBcUIsSUFBSSxXQUFXLFFBQVEsSUFBSSxXQUFXLE1BQU07QUFDeEUsZ0JBQVUsbUVBQTRELE9BQU87QUFDN0UsVUFBSSwrREFBNEQ7QUFDaEUsYUFBTztBQUFBLElBQ1Q7QUFHQSxRQUFJLENBQUMsT0FBTyxTQUFTLElBQUksTUFBTSxLQUFLLENBQUMsT0FBTyxTQUFTLElBQUksTUFBTSxHQUFHO0FBQ2hFLGdCQUFVLGdEQUFzQyxJQUFJLE1BQU0sSUFBSSxJQUFJLE1BQU0sc0JBQXNCLE9BQU87QUFDckcsVUFBSSxzREFBbUQ7QUFDdkQsYUFBTztBQUFBLElBQ1Q7QUFHQSxVQUFNLG1CQUFtQixLQUFLLE1BQU0sTUFBTSxRQUFRLEtBQUs7QUFHdkQsUUFBSSxtQkFBbUIsR0FBRztBQUN4QixnQkFBVSxrREFBMkMsT0FBTztBQUM1RCxhQUFPO0FBQUEsSUFDVDtBQUlBLFVBQU0sb0JBQW9CLEtBQUssSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsRUFBRTtBQUM3RSxVQUFNLGFBQWEsS0FBSyxJQUFJLEdBQUcsaUJBQWlCO0FBR2hELFFBQUksYUFBYSxJQUFJLGtCQUFrQjtBQUNyQyxVQUFJLDBEQUF1RCxVQUFVLElBQUksSUFBSSxnQkFBZ0IsS0FBSyxnQkFBZ0Isd0JBQXdCLE1BQU0sUUFBUSxNQUFNLFFBQVEsQ0FBQyxDQUFDLFdBQVc7QUFBQSxJQUNyTDtBQUVBLFVBQU0sU0FBUyx1QkFBdUIsWUFBWSxHQUFHO0FBQ3JELFVBQU0sU0FBUyx1QkFBdUIsWUFBWSxHQUFHO0FBR3JELFVBQU0sY0FBYyxPQUFPLENBQUM7QUFDNUIsVUFBTSxjQUFjLE9BQU8sQ0FBQztBQUU1QixjQUFVLHVCQUFnQixVQUFVLHdCQUFxQixJQUFJLFdBQVcsYUFBYSxJQUFJLE1BQU0sSUFBSSxJQUFJLE1BQU0sVUFBVSxJQUFJLE1BQU0sSUFBSSxJQUFJLE1BQU0sUUFBUSxRQUFRO0FBRS9KLFVBQU1DLEtBQUksTUFBTSxZQUFZO0FBRTVCLFVBQU0sSUFBSSxNQUFNLG9CQUFvQixJQUFJLFFBQVEsSUFBSSxRQUFRLFFBQVEsUUFBUUEsRUFBQztBQUU3RSxVQUFNLE9BQU87QUFBQSxNQUNYLEdBQUc7QUFBQSxNQUNILEdBQUc7QUFBQSxNQUNILE9BQU8sT0FBTyxDQUFDO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxNQUNBLFFBQVEsRUFBRTtBQUFBLE1BQ1YsTUFBTSxFQUFFO0FBQUEsSUFDVjtBQUVBLFFBQUksRUFBRSxXQUFXLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxVQUFVLEtBQUssRUFBRSxLQUFLLFlBQVksY0FBYyxFQUFFLEtBQUssS0FBSztBQUNwRyxZQUFNLGdCQUFnQixFQUFFLEtBQUssV0FBVztBQUN4QyxZQUFNLFdBQVc7QUFDakIsWUFBTSxhQUFhO0FBR25CLGVBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxRQUFRLEtBQUssR0FBRztBQUN6QyxjQUFNLFNBQVMsT0FBTyxDQUFDO0FBQ3ZCLGNBQU0sU0FBUyxPQUFPLElBQUksQ0FBQztBQUMzQixjQUFNLFFBQVEsT0FBTyxLQUFLLE1BQU0sSUFBSSxDQUFDLENBQUM7QUFFdEMsY0FBTSxrQkFBa0IsUUFBUSxRQUFRLEtBQUs7QUFBQSxNQUMvQztBQUdBLFlBQU0sWUFBWSxJQUFJLFFBQVEsSUFBSSxNQUFNO0FBR3hDLFlBQU1ELFlBQVc7QUFFakIsZ0JBQVUsd0JBQW1CLGFBQWEsSUFBSSxVQUFVLHdCQUFxQixJQUFJLE1BQU0sSUFBSSxJQUFJLE1BQU0sV0FBVyxJQUFJLFdBQVcsTUFBTSxTQUFTO0FBQzlJLGtCQUFZO0FBR1osVUFBSSxPQUFPLFdBQVcsZUFBZSxPQUFPLGFBQWE7QUFDdkQsY0FBTSxRQUFRLElBQUksT0FBTyxZQUFZLHdCQUF3QjtBQUFBLFVBQzNELFFBQVE7QUFBQSxZQUNOLFFBQVE7QUFBQSxZQUNSLFFBQVE7QUFBQSxZQUNSLFlBQVk7QUFBQSxZQUNaLGFBQWE7QUFBQSxZQUNiO0FBQUEsWUFDQTtBQUFBLFlBQ0EsT0FBTyxJQUFJO0FBQUEsWUFDWCxPQUFPLElBQUk7QUFBQSxZQUNYLE9BQU8sSUFBSTtBQUFBLFlBQ1gsT0FBTyxJQUFJO0FBQUEsWUFDWCxRQUFRLElBQUk7QUFBQSxZQUNaLFdBQVcsS0FBSyxJQUFJO0FBQUEsVUFDdEI7QUFBQSxRQUNGLENBQUM7QUFDRCxlQUFPLGNBQWMsS0FBSztBQUFBLE1BQzVCO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFHQSxRQUFJLEVBQUUsV0FBVyxLQUFLO0FBQ3BCLGdCQUFVLHFFQUF3RCxPQUFPO0FBQUEsSUFDM0UsV0FBVyxFQUFFLFdBQVcsS0FBSztBQUMzQixnQkFBVSx5REFBK0MsT0FBTztBQUFBLElBQ2xFLFdBQVcsRUFBRSxXQUFXLEtBQUs7QUFDM0IsZ0JBQVUsZ0RBQXdDLE9BQU87QUFBQSxJQUMzRCxXQUFXLEVBQUUsV0FBVyxLQUFLO0FBQzNCLGdCQUFVLHFGQUE2RSxPQUFPO0FBQUEsSUFDaEcsV0FBVyxFQUFFLFdBQVcsR0FBRztBQUN6QixnQkFBVSx1REFBZ0QsT0FBTztBQUFBLElBQ25FLFdBQVcsRUFBRSxXQUFXLEtBQUs7QUFDM0IsZ0JBQVUsaUVBQXVELE9BQU87QUFBQSxJQUMxRSxXQUFXLEVBQUUsV0FBVyxPQUFPLEVBQUUsV0FBVyxPQUFPLEVBQUUsV0FBVyxLQUFLO0FBQ25FLGdCQUFVLGFBQU0sRUFBRSxNQUFNLGdEQUE2QyxPQUFPO0FBQUEsSUFDOUUsV0FBVyxFQUFFLFdBQVcsS0FBSztBQUMzQixnQkFBVSwwRUFBOEQsSUFBSSxNQUFNLElBQUksSUFBSSxNQUFNLEtBQUssT0FBTztBQUFBLElBQzlHLE9BQU87QUFFTCxVQUFJO0FBQ0YsY0FBTSxTQUFTLE1BQU0sbUJBQW1CO0FBQ3hDLGNBQU0sZ0JBQWUsaUNBQVEsTUFBSyxxQkFBYztBQUNoRCxrQkFBVSxnQkFBVyxFQUFFLE1BQU0sT0FBSyxPQUFFLFNBQUYsbUJBQVEsY0FBVyxPQUFFLFNBQUYsbUJBQVEsVUFBUyxpQkFBaUIsY0FBYyxZQUFZLEtBQUssT0FBTztBQUFBLE1BQy9ILFFBQVE7QUFDTixrQkFBVSxnQkFBVyxFQUFFLE1BQU0sT0FBSyxPQUFFLFNBQUYsbUJBQVEsY0FBVyxPQUFFLFNBQUYsbUJBQVEsVUFBUyxpQkFBaUIsNEJBQXlCLE9BQU87QUFBQSxNQUN6SDtBQUFBLElBQ0Y7QUFHQSxRQUFJLDRCQUE0QixFQUFFLE1BQU0sV0FBVyxFQUFFLE1BQU0sV0FBVyxRQUFRLFdBQVcsTUFBTTtBQUUvRixXQUFPO0FBQUEsRUFDVDtBQUVBLGlCQUFzQixlQUFlLEtBQUssT0FBTyxXQUFXLGFBQWFBLGFBQVksb0JBQW9CO0FBQ3ZHLFVBQU0sY0FBYztBQUNwQixVQUFNLFlBQVk7QUFFbEIsYUFBUyxVQUFVLEdBQUcsV0FBVyxhQUFhLFdBQVc7QUFDdkQsVUFBSTtBQUNGLGNBQU0sVUFBVSxNQUFNLFVBQVUsS0FBSyxPQUFPLFdBQVcsYUFBYUEsYUFBWSxrQkFBa0I7QUFDbEcsWUFBSSxTQUFTO0FBQ1gsZ0JBQU0sYUFBYTtBQUNuQixpQkFBTztBQUFBLFFBQ1Q7QUFFQSxjQUFNLGFBQWE7QUFFbkIsWUFBSSxVQUFVLGFBQWE7QUFDekIsZ0JBQU0sUUFBUSxZQUFZLEtBQUssSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUNqRCxvQkFBVSx1QkFBZ0IsT0FBTyxJQUFJLFdBQVcsT0FBTyxRQUFNLEdBQUksUUFBUSxPQUFPO0FBQ2hGLGdCQUFNRSxPQUFNLEtBQUs7QUFBQSxRQUNuQjtBQUFBLE1BRUYsU0FBUyxPQUFPO0FBQ2QsWUFBSSxvQkFBb0IsT0FBTyxLQUFLLEtBQUs7QUFDekMsY0FBTSxhQUFhO0FBRW5CLFlBQUksVUFBVSxhQUFhO0FBQ3pCLGdCQUFNLFFBQVEsWUFBWSxLQUFLLElBQUksR0FBRyxVQUFVLENBQUM7QUFDakQsb0JBQVUsOEJBQXVCLE9BQU8sSUFBSSxXQUFXLHFCQUFxQixRQUFNLEdBQUksUUFBUSxPQUFPO0FBQ3JHLGdCQUFNQSxPQUFNLEtBQUs7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxhQUFhO0FBQ25CLGNBQVUsaUNBQXNCLFdBQVcsa0RBQStDLE9BQU87QUFDakcsV0FBTztBQUFBLEVBQ1Q7QUFFQSxpQkFBc0IsS0FBSyxLQUFLLE9BQU8sV0FBVyxhQUFhRixhQUFZLG9CQUFvQixhQUFhO0FBQzFHLFFBQUkseUJBQWtCO0FBQ3RCLFVBQU0sVUFBVTtBQUVoQixXQUFPLE1BQU0sU0FBUztBQUNwQixVQUFJO0FBRUYsY0FBTSxZQUFZO0FBR2xCLFlBQUksTUFBTSxRQUFRLFFBQVEsSUFBSSxhQUFhO0FBQ3pDLGdCQUFNLFdBQVcsS0FBSyxJQUFJLElBQUksSUFBSSxjQUFjLE1BQU0sUUFBUSxTQUFTLElBQUksZUFBZTtBQUMxRixvQkFBVSw0QkFBdUIsTUFBTSxRQUFRLE1BQU0sUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVcsS0FBSyxLQUFLLE1BQU0sV0FBUyxHQUFJLENBQUMsTUFBTSxRQUFRO0FBRTlILGdCQUFNLG1CQUFtQixLQUFLLElBQUksVUFBVSxJQUFJLFFBQVEsR0FBRyxDQUFDLGNBQWM7QUFDeEUsc0JBQVUsNEJBQXVCLE1BQU0sUUFBUSxNQUFNLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxXQUFXLE1BQU0sS0FBSyxNQUFNLFlBQVUsR0FBSSxDQUFDLE1BQU0sUUFBUTtBQUFBLFVBQ2xJLEdBQUcsS0FBSztBQUVSO0FBQUEsUUFDRjtBQUdBLGNBQU0sVUFBVSxNQUFNLGVBQWUsS0FBSyxPQUFPLFdBQVcsYUFBYUEsYUFBWSxrQkFBa0I7QUFFdkcsWUFBSSxDQUFDLFNBQVM7QUFFWixvQkFBVSxzREFBK0MsT0FBTztBQUNoRSxnQkFBTSxtQkFBbUIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxjQUFjO0FBQ3hELHNCQUFVLGlDQUEwQixLQUFLLE1BQU0sWUFBVSxHQUFJLENBQUMsS0FBSyxPQUFPO0FBQUEsVUFDNUUsQ0FBQztBQUNEO0FBQUEsUUFDRjtBQUdBLFlBQUksTUFBTSxTQUFTO0FBQ2pCLGdCQUFNLG1CQUFtQixJQUFJLFVBQVUsQ0FBQyxjQUFjO0FBQ3BELHNCQUFVLHVCQUFnQixLQUFLLE1BQU0sWUFBVSxHQUFJLENBQUMsZ0NBQWdDLFFBQVE7QUFBQSxVQUM5RixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BRUYsU0FBUyxPQUFPO0FBQ2QsWUFBSSw2QkFBMEIsS0FBSztBQUNuQyxrQkFBVSwrQkFBcUIsTUFBTSxPQUFPLElBQUksT0FBTztBQUd2RCxZQUFJLE1BQU0sU0FBUztBQUNqQixnQkFBTSxtQkFBbUIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxjQUFjO0FBQ3hELHNCQUFVLG1EQUFzQyxLQUFLLE1BQU0sWUFBVSxHQUFJLENBQUMsS0FBSyxPQUFPO0FBQUEsVUFDeEYsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFFBQUksNEJBQWtCO0FBQ3RCLGNBQVUsNkJBQW1CLFFBQVE7QUFBQSxFQUN2Qzs7O0FDclNPLE1BQU0sb0JBQU4sTUFBd0I7QUFBQSxJQUM3QixjQUFjO0FBQ1osV0FBSyxTQUFTO0FBQ2QsV0FBSyxnQkFBZ0IsT0FBTztBQUM1QixXQUFLLFdBQVc7QUFBQSxJQUNsQjtBQUFBO0FBQUEsSUFHQSxPQUFPLFVBQVU7QUFDZixVQUFJLEtBQUssUUFBUTtBQUNmLFlBQUksd0NBQTJCO0FBQy9CO0FBQUEsTUFDRjtBQUVBLFdBQUssU0FBUztBQUNkLFdBQUssV0FBVztBQUVoQixVQUFJLG1GQUFvRTtBQUd4RSxhQUFPLFFBQVEsVUFBVSxTQUFTO0FBQ2hDLGNBQU0sU0FBUyxNQUFNLEtBQUssY0FBYyxNQUFNLFFBQVEsSUFBSTtBQUUxRCxZQUFJLEtBQUssVUFBVSxLQUFLLGNBQWMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRztBQUN2RCxnQkFBTSxLQUFLLGNBQWMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsT0FBTyxNQUFNLENBQUM7QUFBQSxRQUMzRDtBQUVBLGVBQU87QUFBQSxNQUNUO0FBR0EsaUJBQVcsTUFBTTtBQUNmLFlBQUksS0FBSyxRQUFRO0FBQ2YsZUFBSyxRQUFRO0FBQ2IsY0FBSSx3Q0FBbUM7QUFBQSxRQUN6QztBQUFBLE1BQ0YsR0FBRyxHQUFLO0FBQUEsSUFDVjtBQUFBO0FBQUEsSUFHQSxjQUFjLEtBQUssU0FBUztBQUMxQixVQUFJLENBQUMsT0FBTyxDQUFDLFFBQVMsUUFBTztBQUc3QixZQUFNLFNBQVMsSUFBSSxTQUFTO0FBQzVCLFVBQUksQ0FBQyxPQUFPLFNBQVMsT0FBTyxLQUFLLENBQUMsT0FBTyxTQUFTLE9BQU8sS0FBSyxDQUFDLE9BQU8sU0FBUyxPQUFPLEdBQUc7QUFDdkYsZUFBTztBQUFBLE1BQ1Q7QUFHQSxVQUFJLENBQUMsUUFBUSxVQUFVLFFBQVEsT0FBTyxZQUFZLE1BQU0sUUFBUTtBQUM5RCxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQSxJQUdBLE1BQU0sY0FBYyxLQUFLLFNBQVMsVUFBVTtBQUMxQyxVQUFJO0FBQ0YsWUFBSSxTQUFTO0FBQ2IsWUFBSSxRQUFRLE1BQU0sUUFBUTtBQUcxQixZQUFJLFFBQVEsTUFBTTtBQUNoQixjQUFJO0FBRUosY0FBSSxPQUFPLFFBQVEsU0FBUyxVQUFVO0FBQ3BDLGdCQUFJO0FBQ0YscUJBQU8sS0FBSyxNQUFNLFFBQVEsSUFBSTtBQUFBLFlBQ2hDLFFBQVE7QUFDTixxQkFBTyxRQUFRO0FBQUEsWUFDakI7QUFBQSxVQUNGLE9BQU87QUFDTCxtQkFBTyxRQUFRO0FBQUEsVUFDakI7QUFHQSxjQUFJLEtBQUssVUFBVSxNQUFNLFFBQVEsS0FBSyxNQUFNLEdBQUc7QUFDN0MscUJBQVMsS0FBSztBQUFBLFVBQ2hCLFdBQVcsS0FBSyxNQUFNLFVBQWEsS0FBSyxNQUFNLFFBQVc7QUFDdkQscUJBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQUEsVUFDMUIsV0FBVyxLQUFLLGFBQWE7QUFDM0IscUJBQVMsS0FBSztBQUFBLFVBQ2hCO0FBQUEsUUFDRjtBQUdBLGNBQU0sU0FBUyxJQUFJLFNBQVM7QUFDNUIsY0FBTSxZQUFZLE9BQU8sTUFBTSwrQkFBK0I7QUFDOUQsWUFBSSxXQUFXO0FBQ2Isa0JBQVEsU0FBUyxVQUFVLENBQUMsQ0FBQztBQUM3QixrQkFBUSxTQUFTLFVBQVUsQ0FBQyxDQUFDO0FBQUEsUUFDL0I7QUFHQSxZQUFJLENBQUMsUUFBUTtBQUNYLGdCQUFNLGdCQUFnQixPQUFPLE1BQU0sMkJBQTJCO0FBQzlELGNBQUksZUFBZTtBQUNqQixrQkFBTSxXQUFXLG1CQUFtQixjQUFjLENBQUMsQ0FBQztBQUNwRCxnQkFBSTtBQUNGLHVCQUFTLEtBQUssTUFBTSxRQUFRO0FBQUEsWUFDOUIsUUFBUTtBQUNOLG9CQUFNLFFBQVEsU0FBUyxNQUFNLEdBQUc7QUFDaEMsa0JBQUksTUFBTSxVQUFVLEdBQUc7QUFDckIseUJBQVMsQ0FBQyxTQUFTLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQUEsY0FDbEQ7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFHQSxZQUFJLFVBQVUsT0FBTyxVQUFVLEdBQUc7QUFDaEMsY0FBSSxTQUFTLFNBQVMsUUFBUTtBQUU5QixjQUFJLE9BQU8sVUFBVSxLQUFLLEtBQUssT0FBTyxVQUFVLEtBQUssR0FBRztBQUV0RCxxQkFBUyxPQUFPLENBQUM7QUFDakIscUJBQVMsT0FBTyxDQUFDO0FBQ2pCLHNCQUFVLFFBQVEsTUFBTztBQUN6QixzQkFBVSxRQUFRLE1BQU87QUFDekIsZ0JBQUksb0RBQTZDLEtBQUssSUFBSSxLQUFLLFdBQVcsTUFBTSxJQUFJLE1BQU0sZUFBZSxPQUFPLElBQUksT0FBTyxHQUFHO0FBQUEsVUFDaEksT0FBTztBQUVMLHNCQUFVLE9BQU8sQ0FBQztBQUNsQixzQkFBVSxPQUFPLENBQUM7QUFDbEIsb0JBQVEsS0FBSyxNQUFNLFVBQVUsR0FBSTtBQUNqQyxvQkFBUSxLQUFLLE1BQU0sVUFBVSxHQUFJO0FBQ2pDLHFCQUFTLFVBQVU7QUFDbkIscUJBQVMsVUFBVTtBQUNuQixnQkFBSSx1REFBZ0QsT0FBTyxJQUFJLE9BQU8sYUFBYSxLQUFLLElBQUksS0FBSyxXQUFXLE1BQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxVQUNqSTtBQUdBLGNBQUksU0FBUyxJQUFJO0FBQ2YsaUJBQUssUUFBUTtBQUViLGdCQUFJLEtBQUssVUFBVTtBQUNqQixtQkFBSyxTQUFTO0FBQUEsZ0JBQ1osU0FBUztBQUFBLGdCQUNUO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGNBQ0YsQ0FBQztBQUFBLFlBQ0g7QUFBQSxVQUNGLE9BQU87QUFDTCxnQkFBSSxpRUFBdUQ7QUFBQSxVQUM3RDtBQUFBLFFBQ0Y7QUFBQSxNQUVGLFNBQVMsT0FBTztBQUNkLFlBQUksNkJBQTZCLEtBQUs7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsVUFBVTtBQUNSLFVBQUksQ0FBQyxLQUFLLE9BQVE7QUFFbEIsV0FBSyxTQUFTO0FBQ2QsYUFBTyxRQUFRLEtBQUs7QUFDcEIsV0FBSyxXQUFXO0FBRWhCLFVBQUksOENBQXVDO0FBQUEsSUFDN0M7QUFBQSxFQUNGO0FBR08sTUFBTSxvQkFBb0IsSUFBSSxrQkFBa0I7OztBQzlKaEQsV0FBUyxjQUFjLFFBQVEsT0FBTztBQUUzQyxVQUFNLG1CQUFtQjtBQUFBLE1BQ3ZCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFFQSxlQUFXLFlBQVksa0JBQWtCO0FBQ3ZDLFlBQU0sVUFBVSxTQUFTLGNBQWMsUUFBUTtBQUMvQyxVQUFJLFdBQVcsUUFBUSxpQkFBaUIsTUFBTTtBQUM1QyxZQUFJLE1BQU8sU0FBUSxJQUFJLHFEQUE4QyxRQUFRLEVBQUU7QUFDL0UsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBR0EsVUFBTSxnQkFBZ0IsU0FBUyxpQkFBaUIsK0VBQStFO0FBQy9ILFFBQUksZ0JBQWdCO0FBQ3BCLGVBQVcsTUFBTSxlQUFlO0FBQzlCLFVBQUksR0FBRyxpQkFBaUIsUUFBUSxHQUFHLGNBQWMsTUFBTSxHQUFHLGVBQWUsSUFBSTtBQUMzRTtBQUNBLFlBQUksaUJBQWlCLEdBQUc7QUFDdEIsY0FBSSxNQUFPLFNBQVEsSUFBSSw2REFBc0QsYUFBYSxFQUFFO0FBQzVGLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsUUFBSSxNQUFPLFNBQVEsSUFBSSw2REFBc0QsYUFBYSxFQUFFO0FBQzVGLFdBQU87QUFBQSxFQUNUO0FBR08sV0FBUyx3QkFBd0IsUUFBUSxPQUFPLGNBQWMsT0FBTztBQUUxRSxVQUFNLGlCQUFpQixTQUFTLGNBQWMsbUVBQW1FO0FBRWpILFFBQUksZ0JBQWdCO0FBQ2xCLFlBQU0sYUFBYSxlQUFlLFlBQVksWUFBWTtBQUMxRCxZQUFNLGVBQWUsV0FBVyxTQUFTLE9BQU8sS0FBSyxXQUFXLFNBQVMsUUFBUTtBQUNqRixZQUFNLGVBQWUsZUFBZSxjQUFjLHdCQUF3QixLQUN0RCxlQUFlLGNBQWMsb0JBQW9CO0FBRXJFLFVBQUksZ0JBQWdCLGNBQWM7QUFDaEMsWUFBSSxNQUFPLFNBQVEsSUFBSSw2RUFBZ0UsVUFBVSxHQUFHO0FBQ3BHLHVCQUFlLE1BQU07QUFHckIsWUFBSSxhQUFhO0FBQ2YscUJBQVcsTUFBTTtBQUNmLGdCQUFJLE1BQU8sU0FBUSxJQUFJLG1EQUF5QztBQUNoRSwyQkFBZSxNQUFNO0FBQUEsVUFDdkIsR0FBRyxHQUFHO0FBQUEsUUFDUjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUdBLFVBQU0sVUFBVSxTQUFTLGlCQUFpQixRQUFRO0FBQ2xELGVBQVcsVUFBVSxTQUFTO0FBQzVCLFlBQU0sYUFBYSxPQUFPLFlBQVksWUFBWTtBQUNsRCxXQUFLLFdBQVcsU0FBUyxPQUFPLEtBQUssV0FBVyxTQUFTLFFBQVEsTUFDN0QsT0FBTyxpQkFBaUIsUUFDeEIsQ0FBQyxPQUFPLFVBQVU7QUFDcEIsWUFBSSxNQUFPLFNBQVEsSUFBSSw0REFBa0QsT0FBTyxZQUFZLEtBQUssQ0FBQyxHQUFHO0FBQ3JHLGVBQU8sTUFBTTtBQUdiLFlBQUksYUFBYTtBQUNmLHFCQUFXLE1BQU07QUFDZixnQkFBSSxNQUFPLFNBQVEsSUFBSSxtREFBeUM7QUFDaEUsbUJBQU8sTUFBTTtBQUFBLFVBQ2YsR0FBRyxHQUFHO0FBQUEsUUFDUjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUVBLFFBQUksTUFBTyxTQUFRLElBQUksOENBQXNDO0FBQzdELFdBQU87QUFBQSxFQUNUO0FBR0EsaUJBQXNCLHFCQUFxQixjQUFjLEdBQUcsUUFBUSxNQUFNO0FBQ3hFLFFBQUksTUFBTyxTQUFRLElBQUkseUVBQTRELFdBQVcsWUFBWTtBQUUxRyxhQUFTLFVBQVUsR0FBRyxXQUFXLGFBQWEsV0FBVztBQUN2RCxVQUFJLE1BQU8sU0FBUSxJQUFJLDhCQUF1QixPQUFPLElBQUksV0FBVywrQkFBNEI7QUFHaEcsVUFBSSxjQUFjLEdBQUc7QUFDbkIsWUFBSSxNQUFPLFNBQVEsSUFBSSxrRUFBMEQ7QUFDakYsZUFBTztBQUFBLE1BQ1Q7QUFHQSxVQUFJLHdCQUF3QixPQUFPLEtBQUssR0FBRztBQUN6QyxZQUFJLE1BQU8sU0FBUSxJQUFJLHdFQUE4RDtBQUdyRixjQUFNLElBQUksUUFBUSxhQUFXLFdBQVcsU0FBUyxJQUFJLENBQUM7QUFHdEQsWUFBSSxjQUFjLEdBQUc7QUFDbkIsY0FBSSxNQUFPLFNBQVEsSUFBSSxzRUFBOEQsT0FBTyxFQUFFO0FBQzlGLGlCQUFPO0FBQUEsUUFDVCxPQUFPO0FBQ0wsY0FBSSxNQUFPLFNBQVEsSUFBSSxxRUFBMkQsT0FBTyxtQkFBZ0I7QUFBQSxRQUMzRztBQUFBLE1BQ0YsT0FBTztBQUNMLFlBQUksTUFBTyxTQUFRLElBQUkscUVBQTZELE9BQU8sRUFBRTtBQUFBLE1BQy9GO0FBR0EsVUFBSSxVQUFVLGFBQWE7QUFDekIsY0FBTSxJQUFJLFFBQVEsYUFBVyxXQUFXLFNBQVMsR0FBSSxDQUFDO0FBQUEsTUFDeEQ7QUFBQSxJQUNGO0FBRUEsUUFBSSxNQUFPLFNBQVEsSUFBSSxxREFBMEMsV0FBVyxXQUFXO0FBQ3ZGLFdBQU87QUFBQSxFQUNUOzs7QUNsSUEsR0FBQyxpQkFBaUI7QUFDaEI7QUFaRjtBQWVFLFVBQU0sbUJBQW1CO0FBR3pCLFFBQUk7QUFDRixVQUFJLDZEQUFtRDtBQUN2RCxZQUFNLHFCQUFxQixHQUFHLElBQUk7QUFBQSxJQUNwQyxTQUFTLE9BQU87QUFDZCxVQUFJLCtEQUFrRCxLQUFLO0FBQUEsSUFDN0Q7QUFHQSxTQUFJLFlBQU8sZ0JBQVAsbUJBQW9CLGFBQWE7QUFDbkMsWUFBTSxFQUFFLHVCQUF1QixpQ0FBOEIsQ0FBQztBQUM5RDtBQUFBLElBQ0Y7QUFHQSxTQUFJLFlBQU8sZ0JBQVAsbUJBQW9CLGNBQWM7QUFDcEMsWUFBTSxFQUFFLDRCQUE0Qiw2RUFBb0UsQ0FBQztBQUN6RztBQUFBLElBQ0Y7QUFHQSxRQUFJLENBQUMsT0FBTyxhQUFhO0FBQ3ZCLGFBQU8sY0FBYyxDQUFDO0FBQUEsSUFDeEI7QUFHQSxXQUFPLFlBQVksY0FBYztBQUdqQyxXQUFPLGlCQUFpQixtQkFBbUIsTUFBTTtBQTlDbkQsVUFBQUcsS0FBQUM7QUErQ0ksV0FBSUEsT0FBQUQsTUFBQSxPQUFPLGdCQUFQLGdCQUFBQSxJQUFvQixPQUFwQixnQkFBQUMsSUFBd0IsYUFBYTtBQUN2QyxlQUFPLFlBQVksR0FBRyxZQUFZO0FBQUEsTUFDcEM7QUFBQSxJQUNGLENBQUM7QUFFRCxRQUFJLDBEQUFnRDtBQUdwRCxhQUFTLHNCQUFzQkMsTUFBSztBQUVwQyxZQUFNLGtCQUFrQixDQUFDLENBQUNBLEtBQUkscUJBQXFCQSxLQUFJLFVBQVUsUUFBUUEsS0FBSSxVQUFVO0FBRXZGLFlBQU0sbUJBQW1CQSxLQUFJLFdBQVcsY0FBYyxVQUFVQSxLQUFJLFdBQVcsY0FBYztBQUU3RixZQUFNLG1CQUFtQixDQUFDLE9BQU8sU0FBU0EsS0FBSSxNQUFNLEtBQUssQ0FBQyxPQUFPLFNBQVNBLEtBQUksTUFBTTtBQUdwRixZQUFNLGFBQWEsQ0FBQyxvQkFBb0Isb0JBQW9CO0FBQzVELFVBQUksNENBQXNDLGdCQUFnQixjQUFjLGVBQWUsYUFBYSxnQkFBZ0IsYUFBYUEsS0FBSSxNQUFNLElBQUlBLEtBQUksTUFBTSxHQUFHO0FBRTVKLGFBQU87QUFBQSxJQUNQO0FBR0EsYUFBUyxvQkFBb0I7QUFDM0IsVUFBSSxxREFBeUM7QUFFN0Msd0JBQWtCLE9BQU8sQ0FBQyxXQUFXO0FBQ25DLFlBQUksT0FBTyxTQUFTO0FBQ2xCLGNBQUksU0FBUyxPQUFPO0FBQ3BCLGNBQUksU0FBUyxPQUFPO0FBQ3BCLHNCQUFZLEdBQUc7QUFDZixhQUFHLGFBQWE7QUFDaEIsYUFBRyxVQUFVLDBDQUFtQyxPQUFPLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTO0FBQzFGLGNBQUksMERBQWtELE9BQU8sS0FBSyxJQUFJLE9BQU8sS0FBSyxHQUFHO0FBQUEsUUFDdkYsT0FBTztBQUNMLGFBQUcsVUFBVSxVQUFLLEVBQUUsZ0JBQWdCLHFDQUFxQyxDQUFDLElBQUksT0FBTztBQUFBLFFBQ3ZGO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRyxVQUFVLGFBQU0sRUFBRSwwQkFBMEIsQ0FBQyxJQUFJLFFBQVE7QUFBQSxJQUM5RDtBQUdBLFFBQUksTUFBTSxFQUFFLEdBQUcsZUFBZSxHQUFHLFlBQVksYUFBYSxFQUFFO0FBRzVELFFBQUksQ0FBQyxJQUFJLFNBQVM7QUFDaEIsWUFBTSxpQkFBaUIsU0FBUyxjQUFjLGlCQUFpQjtBQUMvRCxVQUFJLGdCQUFnQjtBQUNsQixZQUFJLFVBQVUsZUFBZSxhQUFhLGNBQWM7QUFDeEQsWUFBSSxvREFBMEMsSUFBSSxRQUFRLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSztBQUMvRSxvQkFBWSxHQUFHO0FBQUEsTUFDakIsT0FBTztBQUNMLFlBQUksaUVBQW9EO0FBQUEsTUFDMUQ7QUFBQSxJQUNGO0FBR0EsbUJBQWUsY0FBYztBQUMzQixVQUFJO0FBQ0YsY0FBTSxVQUFVLE1BQU0sV0FBVztBQUNqQyxZQUFJLFFBQVEsV0FBVyxRQUFRLE1BQU07QUFDbkMsb0JBQVUsUUFBUSxRQUFRLFFBQVEsS0FBSyxXQUFXO0FBQ2xELG9CQUFVLFFBQVEsTUFBTSxRQUFRLEtBQUssY0FBYztBQUNuRCxvQkFBVSxRQUFRLFFBQVEsUUFBUSxLQUFLLGVBQWU7QUFDdEQsb0JBQVUsT0FBTyxRQUFRLEtBQUs7QUFHOUIsY0FBSSxrQkFBa0IsVUFBVSxRQUFRO0FBR3hDLGdCQUFNLFNBQVMsTUFBTSxtQkFBbUI7QUFDeEMsb0JBQVUsU0FBUztBQUVuQixhQUFHLFlBQVksVUFBVSxTQUFTLFVBQVUsUUFBUSxPQUFPLFVBQVUsWUFBWSxNQUFNO0FBQ3ZGLGlCQUFPLFFBQVE7QUFBQSxRQUNqQjtBQUNBLGVBQU87QUFBQSxNQUNULFNBQVMsT0FBTztBQUNkLFlBQUksdUNBQW9DLEtBQUs7QUFDN0MsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBR0EsbUJBQWUscUJBQXFCO0FBQ2xDLFVBQUk7QUFDRixlQUFPLE1BQU0sWUFBWTtBQUFBLE1BQzNCLFNBQVMsT0FBTztBQUNkLFlBQUksNkJBQTZCLEtBQUs7QUFDdEMsZUFBTyxFQUFFLElBQUksT0FBTyxPQUFPLE1BQU0sUUFBUTtBQUFBLE1BQzNDO0FBQUEsSUFDRjtBQUdBLG1CQUFlLG1CQUFtQjtBQUNoQyxhQUFPLE1BQU0sZUFBZSxLQUFLLFdBQVcsR0FBRyxXQUFXLEdBQUcsYUFBYSxNQUFNLFdBQVcsR0FBRyxrQkFBa0I7QUFBQSxJQUNsSDtBQUdBLFVBQU0sS0FBSztBQUFBLE1BQ1Q7QUFBQTtBQUFBLE1BRUEsWUFBWTtBQUNWLFlBQUksVUFBVSxTQUFTO0FBQ3JCLGFBQUcsVUFBVSxrREFBa0MsT0FBTztBQUN0RDtBQUFBLFFBQ0Y7QUFHQSxZQUFJLENBQUMsSUFBSSxxQkFBcUIsSUFBSSxXQUFXLFFBQVEsSUFBSSxXQUFXLE1BQU07QUFDeEUsYUFBRyxVQUFVLEVBQUUseUJBQXlCLEdBQUcsTUFBTTtBQUdqRCxnQkFBTSxlQUFlLEdBQUcsV0FBVyxFQUFFLFdBQVcsZUFBZSxxQkFBcUI7QUFDcEYsY0FBSSxjQUFjO0FBQ2hCLHlCQUFhLE1BQU07QUFBQSxVQUNyQjtBQUdBO0FBQUEsUUFDRjtBQUdBLFlBQUksc0JBQXNCLEdBQUcsR0FBRztBQUM5QixhQUFHLFVBQVUsOENBQW9DLFFBQVE7QUFDekQsZ0JBQU0sY0FBYyxNQUFNLGtCQUFrQixHQUFHO0FBQy9DLGNBQUksWUFBWSxTQUFTO0FBQ3ZCLGVBQUcsVUFBVSwwQkFBcUIsWUFBWSxLQUFLLElBQUksWUFBWSxLQUFLLEtBQUssU0FBUztBQUN0RixlQUFHLGFBQWE7QUFBQSxVQUNsQixPQUFPO0FBQ0wsZUFBRyxVQUFVLDBEQUFrRCxPQUFPO0FBQ3RFO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFHQSxXQUFHLFVBQVUseUNBQWtDLFFBQVE7QUFDdkQsY0FBTSxTQUFTLE1BQU0sbUJBQW1CO0FBQ3hDLFlBQUksQ0FBQyxPQUFPLElBQUk7QUFDZCxhQUFHLFVBQVUsNkRBQW1ELE9BQU87QUFDdkU7QUFBQSxRQUNGO0FBR0EsV0FBRyxVQUFVLHVEQUEwQyxRQUFRO0FBQy9ELGNBQU0sY0FBYyxNQUFNLFlBQVk7QUFDdEMsWUFBSSxDQUFDLGFBQWE7QUFDaEIsYUFBRyxVQUFVLHlEQUFpRCxPQUFPO0FBQ3JFO0FBQUEsUUFDRjtBQUVBLFdBQUcsVUFBVSw4QkFBdUIsUUFBUTtBQUM1QyxXQUFHLG1CQUFtQixJQUFJO0FBRzFCLGFBQUssS0FBSyxXQUFXLEdBQUcsV0FBVyxHQUFHLGFBQWEsYUFBYSxvQkFBb0IsV0FBVztBQUFBLE1BQ2pHO0FBQUE7QUFBQSxNQUdBLE1BQU07QUFDSixrQkFBVSxVQUFVO0FBQ3BCLFlBQUksT0FBTyxhQUFhO0FBQ3RCLGlCQUFPLFlBQVksY0FBYztBQUFBLFFBQ25DO0FBQ0EsV0FBRyxVQUFVLGtDQUF3QixRQUFRO0FBQzdDLFdBQUcsbUJBQW1CLEtBQUs7QUFBQSxNQUM3QjtBQUFBO0FBQUEsTUFHQSxZQUFZO0FBQ1YsV0FBRyxVQUFVLHVDQUE2QixRQUFRO0FBQ2xELGNBQU0sY0FBYyxNQUFNLGtCQUFrQixHQUFHO0FBQy9DLFlBQUksWUFBWSxTQUFTO0FBQ3ZCLGFBQUcsVUFBVSwwQkFBcUIsWUFBWSxLQUFLLElBQUksWUFBWSxLQUFLLEtBQUssU0FBUztBQUN0RixhQUFHLGFBQWE7QUFBQSxRQUNsQixPQUFPO0FBQ0wsYUFBRyxVQUFVLG1DQUEyQixZQUFZLFNBQVMsYUFBYSxJQUFJLE9BQU87QUFBQSxRQUN2RjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBR0EsVUFBTSxhQUFhLEdBQUcsV0FBVyxFQUFFLFdBQVcsZUFBZSxhQUFhO0FBQzFFLFFBQUksWUFBWTtBQUNkLGlCQUFXLGlCQUFpQixTQUFTLGlCQUFpQjtBQUFBLElBQ3hEO0FBR0EsVUFBTSxVQUFVLEdBQUcsV0FBVyxFQUFFLFdBQVcsZUFBZSxVQUFVO0FBQ3BFLFFBQUksU0FBUztBQUNYLGNBQVEsaUJBQWlCLFNBQVMsWUFBWTtBQUM1QyxZQUFJLFVBQVUsU0FBUztBQUNyQixhQUFHLFVBQVUsd0NBQTJCLE9BQU87QUFDL0M7QUFBQSxRQUNGO0FBRUEsY0FBTSxZQUFZO0FBQ2xCLFdBQUcsVUFBVSxpQ0FBMEIsUUFBUTtBQUMvQyxjQUFNLFVBQVUsTUFBTSxpQkFBaUI7QUFDdkMsWUFBSSxTQUFTO0FBQ1gsYUFBRyxVQUFVLHdDQUFnQyxTQUFTO0FBQUEsUUFDeEQsT0FBTztBQUNMLGFBQUcsVUFBVSxtQ0FBMkIsT0FBTztBQUFBLFFBQ2pEO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUdBLFVBQU0sWUFBWTtBQUdsQixXQUFPLGlCQUFpQix3QkFBd0IsQ0FBQyxVQUFVO0FBQ3pELFVBQUksMkJBQW9CLE1BQU0sT0FBTyxVQUFVLHVCQUFvQixNQUFNLE9BQU8sS0FBSyxJQUFJLE1BQU0sT0FBTyxLQUFLLEdBQUc7QUFBQSxJQUNoSCxDQUFDO0FBR0QsV0FBTyxRQUFRO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixLQUFLLE9BQU8sRUFBRSxHQUFHLElBQUk7QUFBQSxNQUNyQixTQUFTO0FBQUEsTUFDVCxlQUFlLE1BQU07QUFFbkIsWUFBSSxVQUFVLE1BQU07QUFFbEIsY0FBSSxzQ0FBbUMsVUFBVSxLQUFLLENBQUMsSUFBSSxVQUFVLEtBQUssQ0FBQyxHQUFHO0FBQUEsUUFDaEY7QUFBQSxNQUNGO0FBQUEsTUFDQSxhQUFhLE9BQU8sR0FBRyxNQUFNO0FBQzNCLFlBQUksNEJBQXlCLENBQUMsSUFBSSxDQUFDLE1BQU07QUFFekMsZUFBTyxFQUFFLFVBQVUsTUFBTSxHQUFHLEVBQUU7QUFBQSxNQUNoQztBQUFBLE1BRUEsVUFBVSxPQUFPO0FBQUEsUUFDZixTQUFTLFVBQVU7QUFBQSxRQUNuQixNQUFNLFVBQVU7QUFBQSxRQUNoQixTQUFTLFVBQVU7QUFBQSxRQUNuQixNQUFNLFVBQVU7QUFBQSxRQUNoQixTQUFTLFVBQVU7QUFBQSxRQUNuQixZQUFZLElBQUk7QUFBQSxRQUNoQixPQUFPLElBQUk7QUFBQSxRQUNYLFVBQVU7QUFBQSxVQUNSLE9BQU8sSUFBSTtBQUFBLFVBQ1gsT0FBTyxJQUFJO0FBQUEsVUFDWCxVQUFVLElBQUk7QUFBQSxVQUNkLFlBQVksS0FBSyxNQUFNLElBQUksWUFBWSxJQUFJO0FBQUEsVUFDM0MsVUFBVTtBQUFBLFlBQ1IsTUFBTSxLQUFLLE1BQU0sSUFBSSxZQUFZLElBQUk7QUFBQSxZQUNyQyxNQUFNLElBQUksWUFBWSxLQUFLLE1BQU0sSUFBSSxZQUFZLElBQUksSUFBSTtBQUFBLFlBQ3pELE1BQU0sS0FBSyxNQUFNLElBQUksWUFBWSxJQUFJO0FBQUEsWUFDckMsTUFBTSxJQUFJLFlBQVksS0FBSyxNQUFNLElBQUksWUFBWSxJQUFJLElBQUk7QUFBQSxVQUMzRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFFQSxtQkFBbUIsQ0FBQyxVQUFVO0FBQzVCLFlBQUksbUJBQW1CLE1BQU0sT0FBTyxHQUFHLEVBQUU7QUFDekMsb0JBQVksR0FBRztBQUNmLFdBQUcsYUFBYTtBQUNoQixZQUFJLHNDQUFtQyxJQUFJLGdCQUFnQixFQUFFO0FBQUEsTUFDL0Q7QUFBQSxNQUVBLGVBQWUsQ0FBQyxRQUFRO0FBQ3RCLFlBQUksY0FBYyxLQUFLLElBQUksR0FBRyxHQUFHO0FBQ2pDLG9CQUFZLEdBQUc7QUFDZixXQUFHLGFBQWE7QUFDaEIsWUFBSSxxQ0FBa0MsSUFBSSxXQUFXLEVBQUU7QUFBQSxNQUN6RDtBQUFBLE1BRUEsVUFBVSxDQUFDLFlBQVk7QUFDckIsWUFBSSxXQUFXLEtBQUssSUFBSSxLQUFNLFVBQVUsR0FBSTtBQUM1QyxvQkFBWSxHQUFHO0FBQ2YsV0FBRyxhQUFhO0FBQ2hCLFlBQUksd0JBQXdCLElBQUksUUFBUSxJQUFJO0FBQUEsTUFDOUM7QUFBQSxNQUVBLFVBQVUsTUFBTTtBQXJVcEIsWUFBQUY7QUFzVU0sY0FBTSxRQUFRLE9BQU8sTUFBTSxTQUFTO0FBQ3BDLGNBQU0sWUFBWTtBQUFBLFVBQ2hCLGFBQWEsT0FBTyxTQUFTLElBQUksTUFBTSxLQUFLLE9BQU8sU0FBUyxJQUFJLE1BQU07QUFBQSxVQUN0RSxZQUFZLFVBQVUsUUFBUSxRQUFRO0FBQUEsVUFDdEMsa0JBQWdCQSxNQUFBLFVBQVUsV0FBVixnQkFBQUEsSUFBa0IsT0FBTTtBQUFBLFVBQ3hDLGNBQWMsQ0FBQyxDQUFDLFVBQVU7QUFBQSxVQUMxQixhQUFhLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxNQUFNO0FBQUEsVUFDekMsVUFBVSxNQUFNLFNBQVM7QUFBQSxVQUN6QixpQkFBaUIsQ0FBQztBQUFBLFFBQ3BCO0FBRUEsWUFBSSxDQUFDLFVBQVUsYUFBYTtBQUMxQixvQkFBVSxnQkFBZ0IsS0FBSywrQkFBK0I7QUFBQSxRQUNoRTtBQUNBLFlBQUksQ0FBQyxVQUFVLFlBQVk7QUFDekIsb0JBQVUsZ0JBQWdCLEtBQUssdUNBQXVDO0FBQUEsUUFDeEU7QUFDQSxZQUFJLENBQUMsVUFBVSxnQkFBZ0I7QUFDN0Isb0JBQVUsZ0JBQWdCLEtBQUssa0NBQStCO0FBQUEsUUFDaEU7QUFDQSxZQUFJLENBQUMsVUFBVSxjQUFjO0FBQzNCLG9CQUFVLGdCQUFnQixLQUFLLG9DQUFpQztBQUFBLFFBQ2xFO0FBRUEsZ0JBQVEsTUFBTSxTQUFTO0FBQ3ZCLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFFQSxhQUFhO0FBQUEsTUFFYixhQUFhLE1BQU07QUFDakIsNEJBQW9CO0FBQ3BCLGNBQU0sRUFBRSxHQUFHLGNBQWM7QUFDekIsV0FBRyxhQUFhO0FBQ2hCLFlBQUksa0RBQStDO0FBQUEsTUFDckQ7QUFBQSxNQUVBLGNBQWMsTUFBTTtBQUNsQixlQUFPO0FBQUEsVUFDTCxnQkFBZ0IsVUFBVTtBQUFBLFVBQzFCLFlBQVksVUFBVTtBQUFBLFVBQ3RCLGVBQWUsVUFBVTtBQUFBLFVBQ3pCLGlCQUFpQixVQUFVO0FBQUEsUUFDN0I7QUFBQSxNQUNGO0FBQUEsTUFFQSxvQkFBb0IsTUFBTTtBQUN4QixrQkFBVSxhQUFhO0FBQ3ZCLGtCQUFVLGdCQUFnQjtBQUMxQixrQkFBVSxrQkFBa0I7QUFDNUIsa0JBQVUsYUFBYTtBQUN2QixZQUFJLDRCQUE0QjtBQUFBLE1BQ2xDO0FBQUEsTUFFQSxlQUFlLENBQUMsYUFBYSxRQUFRO0FBQ25DLFlBQUksbUJBQW1CLFVBQVUsa0JBQWtCO0FBQ25ELFdBQUcsVUFBVSw2QkFBc0IsVUFBVSxJQUFJLE9BQU87QUFBQSxNQUMxRDtBQUFBLElBQ0Y7QUFHQSxXQUFPLGlCQUFpQixnQkFBZ0IsTUFBTTtBQUM1QyxnQkFBVSxVQUFVO0FBQ3BCLFVBQUksT0FBTyxhQUFhO0FBQ3RCLGVBQU8sWUFBWSxjQUFjO0FBQUEsTUFDbkM7QUFDQSx3QkFBa0IsUUFBUTtBQUMxQixTQUFHLFFBQVE7QUFBQSxJQUNiLENBQUM7QUFFRCxRQUFJLDRDQUF1QztBQUMzQyxRQUFJLG9FQUE2RDtBQUFBLEVBRW5FLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTTtBQUNoQixZQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDNUMsUUFBSSxPQUFPLGFBQWE7QUFDdEIsYUFBTyxZQUFZLGNBQWM7QUFBQSxJQUNuQztBQUNBLFVBQU0sOENBQThDO0FBQUEsRUFDdEQsQ0FBQzsiLAogICJuYW1lcyI6IFsidCIsICJjYW52YXMiLCAidHVybnN0aWxlVG9rZW4iLCAicGFpbnRlZCIsICJfYSIsICJjb25maWciLCAic2V0U3RhdHVzIiwgInVwZGF0ZVpvbmVEaXNwbGF5IiwgImNvb3JkcyIsICJzbGVlcCIsICJzbGVlcCIsICJnZXRTZXNzaW9uIiwgInQiLCAic2xlZXAiLCAiX2EiLCAiX2IiLCAiY2ZnIl0KfQo=
