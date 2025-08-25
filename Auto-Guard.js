/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-25T19:29:27.740Z */
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/core/logger.js
  var log;
  var init_logger = __esm({
    "src/core/logger.js"() {
      log = (...a) => console.log("[WPA-UI]", ...a);
    }
  });

  // src/core/http.js
  var init_http = __esm({
    "src/core/http.js"() {
    }
  });

  // src/core/turnstile.js
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
  var turnstileToken, tokenExpiryTime, tokenGenerationInProgress, _resolveToken, tokenPromise, TOKEN_LIFETIME, _turnstileWidgetId, _turnstileContainer, _turnstileOverlay, _lastSitekey, _cachedSitekey;
  var init_turnstile = __esm({
    "src/core/turnstile.js"() {
      init_logger();
      turnstileToken = null;
      tokenExpiryTime = 0;
      tokenGenerationInProgress = false;
      _resolveToken = null;
      tokenPromise = new Promise((resolve) => {
        _resolveToken = resolve;
      });
      TOKEN_LIFETIME = 24e4;
      _turnstileWidgetId = null;
      _turnstileContainer = null;
      _turnstileOverlay = null;
      _lastSitekey = null;
      _cachedSitekey = null;
      window.__WPA_SET_TURNSTILE_TOKEN__ = function(token) {
        if (token && typeof token === "string" && token.length > 20) {
          log("\u2705 Turnstile Token Captured:", token);
          setTurnstileToken(token);
        }
      };
      (function() {
        if (window.__WPA_FETCH_HOOKED__) return;
        window.__WPA_FETCH_HOOKED__ = true;
        const originalFetch2 = window.fetch;
        window.fetch = async function(...args) {
          const response = await originalFetch2.apply(this, args);
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
    }
  });

  // src/core/wplace-api.js
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
  var BASE;
  var init_wplace_api = __esm({
    "src/core/wplace-api.js"() {
      init_http();
      init_turnstile();
      init_logger();
      BASE = "https://backend.wplace.live";
    }
  });

  // src/guard/config.js
  var GUARD_DEFAULTS, guardState;
  var init_config = __esm({
    "src/guard/config.js"() {
      GUARD_DEFAULTS = {
        SITEKEY: "0x4AAAAAABpqJe8FO0N84q0F",
        COOLDOWN_DEFAULT: 31e3,
        TILE_SIZE: 1e3,
        CHECK_INTERVAL: 1e4,
        // Revisar cada 10 segundos
        MAX_PROTECTION_SIZE: Infinity,
        // Sin límite de píxeles protegidos
        PIXELS_PER_BATCH: 10,
        // Menos que Image para ser más sutil
        MIN_CHARGES_TO_WAIT: 20,
        // Cargas mínimas a esperar antes de continuar
        BACKEND_URL: "https://backend.wplace.live",
        PROTECTION_PATTERN: "random"
        // Patrón por defecto
      };
      guardState = {
        running: false,
        initialized: false,
        protectionArea: null,
        // { x1, y1, x2, y2, tileX, tileY }
        originalPixels: /* @__PURE__ */ new Map(),
        // Map de "x,y" -> {r, g, b, colorId}
        changes: /* @__PURE__ */ new Map(),
        // Map de "x,y" -> {timestamp, originalColor, currentColor}
        currentCharges: 0,
        maxCharges: 50,
        lastCheck: 0,
        checkInterval: null,
        availableColors: [],
        colorsChecked: false,
        ui: null,
        totalRepaired: 0,
        // Configuración editable
        pixelsPerBatch: GUARD_DEFAULTS.PIXELS_PER_BATCH,
        minChargesToWait: GUARD_DEFAULTS.MIN_CHARGES_TO_WAIT,
        protectionPattern: GUARD_DEFAULTS.PROTECTION_PATTERN,
        config: {
          colorComparisonMethod: "lab",
          // 'rgb' o 'lab' - LAB por defecto para reposicionamiento
          colorThreshold: 10
          // Umbral de diferencia de color
        }
      };
    }
  });

  // src/core/timing.js
  var sleep2;
  var init_timing = __esm({
    "src/core/timing.js"() {
      sleep2 = (ms) => new Promise((r) => setTimeout(r, ms));
    }
  });

  // src/guard/patterns.js
  function getRandomPattern(changes, count) {
    const changesArray = Array.from(changes);
    const selected = [];
    const available = [...changesArray];
    for (let i = 0; i < Math.min(count, available.length); i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      selected.push(available.splice(randomIndex, 1)[0]);
    }
    return selected;
  }
  function getLinePattern(changes, count) {
    const changesArray = Array.from(changes);
    if (changesArray.length === 0) return [];
    const byRow = /* @__PURE__ */ new Map();
    const byCol = /* @__PURE__ */ new Map();
    changesArray.forEach((coord) => {
      const [x, y] = coord.split(",").map(Number);
      if (!byRow.has(y)) byRow.set(y, []);
      if (!byCol.has(x)) byCol.set(x, []);
      byRow.get(y).push(coord);
      byCol.get(x).push(coord);
    });
    const selected = [];
    const used = /* @__PURE__ */ new Set();
    const rows = Array.from(byRow.keys()).sort((a, b) => a - b);
    const cols = Array.from(byCol.keys()).sort((a, b) => a - b);
    let rowIndex = 0;
    let colIndex = 0;
    let useRow = true;
    while (selected.length < count && (rowIndex < rows.length || colIndex < cols.length)) {
      if (useRow && rowIndex < rows.length) {
        const row = rows[rowIndex];
        const rowPixels = byRow.get(row).filter((coord) => !used.has(coord));
        if (rowPixels.length > 0) {
          const sortedRow = rowPixels.sort((a, b) => {
            const [x1] = a.split(",").map(Number);
            const [x2] = b.split(",").map(Number);
            return x1 - x2;
          });
          for (const coord of sortedRow) {
            if (selected.length >= count) break;
            selected.push(coord);
            used.add(coord);
          }
        }
        rowIndex++;
      } else if (!useRow && colIndex < cols.length) {
        const col = cols[colIndex];
        const colPixels = byCol.get(col).filter((coord) => !used.has(coord));
        if (colPixels.length > 0) {
          const sortedCol = colPixels.sort((a, b) => {
            const [, y1] = a.split(",").map(Number);
            const [, y2] = b.split(",").map(Number);
            return y1 - y2;
          });
          for (const coord of sortedCol) {
            if (selected.length >= count) break;
            selected.push(coord);
            used.add(coord);
          }
        }
        colIndex++;
      }
      useRow = !useRow;
    }
    return selected.slice(0, count);
  }
  function getCenterPattern(changes, count) {
    const changesArray = Array.from(changes);
    if (changesArray.length === 0) return [];
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    changesArray.forEach((coord) => {
      const [x, y] = coord.split(",").map(Number);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const withDistance = changesArray.map((coord) => {
      const [x, y] = coord.split(",").map(Number);
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      return { coord, distance };
    });
    withDistance.sort((a, b) => a.distance - b.distance);
    return withDistance.slice(0, count).map((item) => item.coord);
  }
  function getSpiralPattern(changes, count) {
    const changesArray = Array.from(changes);
    if (changesArray.length === 0) return [];
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    changesArray.forEach((coord) => {
      const [x2, y2] = coord.split(",").map(Number);
      minX = Math.min(minX, x2);
      maxX = Math.max(maxX, x2);
      minY = Math.min(minY, y2);
      maxY = Math.max(maxY, y2);
    });
    const centerX = Math.round((minX + maxX) / 2);
    const centerY = Math.round((minY + maxY) / 2);
    const availableCoords = new Set(changesArray);
    const selected = [];
    let x = centerX;
    let y = centerY;
    let dx = 0;
    let dy = -1;
    let steps = 1;
    let stepCount = 0;
    let direction = 0;
    const centerCoord = `${centerX},${centerY}`;
    if (availableCoords.has(centerCoord)) {
      selected.push(centerCoord);
      availableCoords.delete(centerCoord);
    }
    while (selected.length < count && availableCoords.size > 0) {
      x += dx;
      y += dy;
      const coord = `${x},${y}`;
      if (availableCoords.has(coord)) {
        selected.push(coord);
        availableCoords.delete(coord);
      }
      stepCount++;
      if (stepCount === steps) {
        stepCount = 0;
        if (dx === 0 && dy === -1) {
          dx = 1;
          dy = 0;
        } else if (dx === 1 && dy === 0) {
          dx = 0;
          dy = 1;
        } else if (dx === 0 && dy === 1) {
          dx = -1;
          dy = 0;
        } else if (dx === -1 && dy === 0) {
          dx = 0;
          dy = -1;
        }
        direction = (direction + 1) % 4;
        if (direction % 2 === 0) {
          steps++;
        }
      }
      if (Math.abs(x - centerX) > 100 || Math.abs(y - centerY) > 100) {
        break;
      }
    }
    if (selected.length < count && availableCoords.size > 0) {
      const remaining = Array.from(availableCoords);
      const needed = Math.min(count - selected.length, remaining.length);
      for (let i = 0; i < needed; i++) {
        const randomIndex = Math.floor(Math.random() * remaining.length);
        selected.push(remaining.splice(randomIndex, 1)[0]);
      }
    }
    return selected.slice(0, count);
  }
  function getHumanPattern(changes, count) {
    const changesArray = Array.from(changes);
    if (changesArray.length === 0) return [];
    const strategies = [
      () => getRandomPattern(new Set(changesArray), Math.ceil(count * 0.4)),
      () => getCenterPattern(new Set(changesArray), Math.ceil(count * 0.3)),
      () => getLinePattern(new Set(changesArray), Math.ceil(count * 0.3))
    ];
    const selected = [];
    const used = /* @__PURE__ */ new Set();
    for (const strategy of strategies) {
      if (selected.length >= count) break;
      const availableChanges = new Set(changesArray.filter((coord) => !used.has(coord)));
      if (availableChanges.size === 0) break;
      const strategyResult = strategy();
      for (const coord of strategyResult) {
        if (selected.length >= count) break;
        if (!used.has(coord)) {
          selected.push(coord);
          used.add(coord);
        }
      }
    }
    if (selected.length < count) {
      const remaining = changesArray.filter((coord) => !used.has(coord));
      const needed = Math.min(count - selected.length, remaining.length);
      for (let i = 0; i < needed; i++) {
        const randomIndex = Math.floor(Math.random() * remaining.length);
        const coord = remaining.splice(randomIndex, 1)[0];
        selected.push(coord);
        used.add(coord);
      }
    }
    return selected.slice(0, count);
  }
  function getPixelsByPattern(pattern, changes, count) {
    log(`\u{1F3AF} Aplicando patr\xF3n ${pattern} para ${count} p\xEDxeles de ${changes.size} cambios detectados`);
    switch (pattern) {
      case "line":
        return getLinePattern(changes, count);
      case "center":
        return getCenterPattern(changes, count);
      case "spiral":
        return getSpiralPattern(changes, count);
      case "human":
        return getHumanPattern(changes, count);
      case "random":
      default:
        return getRandomPattern(changes, count);
    }
  }
  var init_patterns = __esm({
    "src/guard/patterns.js"() {
      init_logger();
    }
  });

  // src/guard/processor.js
  var processor_exports = {};
  __export(processor_exports, {
    analyzeAreaPixels: () => analyzeAreaPixels,
    checkForChanges: () => checkForChanges,
    detectAvailableColors: () => detectAvailableColors,
    findClosestColor: () => findClosestColor,
    getTileImage: () => getTileImage,
    repairChanges: () => repairChanges,
    startChargeMonitoring: () => startChargeMonitoring,
    stopChargeMonitoring: () => stopChargeMonitoring
  });
  function startCountdownTimer() {
    if (_countdownInterval) {
      window.clearInterval(_countdownInterval);
    }
    _countdownInterval = window.setInterval(() => {
      const now = Date.now();
      const timeLeft = Math.max(0, Math.ceil((_nextChargeTime - now) / 1e3));
      if (guardState.ui) {
        guardState.ui.updateCountdown(timeLeft);
      }
      if (timeLeft <= 0) {
        window.clearInterval(_countdownInterval);
        _countdownInterval = null;
      }
    }, 1e3);
  }
  function stopCountdownTimer() {
    if (_countdownInterval) {
      window.clearInterval(_countdownInterval);
      _countdownInterval = null;
    }
    if (guardState.ui) {
      guardState.ui.showCountdown(false);
    }
  }
  function startChargeMonitoring() {
    if (chargeMonitorInterval) {
      log("\u{1F504} Monitoreo de cargas ya est\xE1 activo");
      return;
    }
    log("\u{1F504} Iniciando monitoreo de cargas cada 30 segundos...");
    chargeMonitorInterval = window.setInterval(async () => {
      try {
        const sessionResult = await getSession();
        if (sessionResult.success) {
          const availableCharges = Math.floor(sessionResult.data.charges);
          guardState.currentCharges = sessionResult.data.charges;
          guardState.maxCharges = sessionResult.data.maxCharges;
          if (guardState.ui) {
            guardState.ui.updateStats({ charges: availableCharges });
          }
          if (guardState.changes.size > 0 && guardState.running && !_isRepairing) {
            if (availableCharges >= guardState.minChargesToWait) {
              log(`\u{1F504} Cargas detectadas: ${availableCharges}. Continuando reparaci\xF3n autom\xE1ticamente...`);
              stopCountdownTimer();
              await repairChanges(guardState.changes);
            }
          }
        }
      } catch (error) {
        log(`Error en monitoreo de cargas: ${error.message}`);
      }
    }, CHARGE_CHECK_INTERVAL);
  }
  function stopChargeMonitoring() {
    if (chargeMonitorInterval) {
      window.clearInterval(chargeMonitorInterval);
      chargeMonitorInterval = null;
      log("\u{1F504} Monitoreo de cargas detenido");
    }
    stopCountdownTimer();
  }
  function rgbToXyz(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
    const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
    return { x, y, z };
  }
  function xyzToLab(x, y, z) {
    const xn = 0.95047;
    const yn = 1;
    const zn = 1.08883;
    x = x / xn;
    y = y / yn;
    z = z / zn;
    const fx = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    const fy = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    const fz = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const b = 200 * (fy - fz);
    return { l, a, b };
  }
  function rgbToLab(r, g, b) {
    const xyz = rgbToXyz(r, g, b);
    return xyzToLab(xyz.x, xyz.y, xyz.z);
  }
  function calculateDeltaE(lab1, lab2) {
    const deltaL = lab1.l - lab2.l;
    const deltaA = lab1.a - lab2.a;
    const deltaB = lab1.b - lab2.b;
    return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
  }
  function compareColors(color1, color2, method = "rgb", threshold = 10) {
    if (method === "lab") {
      const lab1 = rgbToLab(color1.r, color1.g, color1.b);
      const lab2 = rgbToLab(color2.r, color2.g, color2.b);
      const deltaE = calculateDeltaE(lab1, lab2);
      return deltaE > threshold / 2;
    } else {
      const rDiff = Math.abs(color1.r - color2.r);
      const gDiff = Math.abs(color1.g - color2.g);
      const bDiff = Math.abs(color1.b - color2.b);
      const maxDiff = Math.max(rDiff, gDiff, bDiff);
      return maxDiff > threshold;
    }
  }
  async function getTileImage(tileX, tileY) {
    try {
      const url = `${GUARD_DEFAULTS.BACKEND_URL}/files/s0/tiles/${tileX}/${tileY}.png`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      log(`Error obteniendo tile ${tileX},${tileY}:`, error);
      return null;
    }
  }
  function detectAvailableColors() {
    log("\u{1F3A8} Detectando colores disponibles...");
    const colorElements = document.querySelectorAll('[id^="color-"]');
    const colors = [];
    for (const element of colorElements) {
      if (element.querySelector("svg")) continue;
      const colorId = parseInt(element.id.replace("color-", ""));
      if (colorId === 0) continue;
      const bgColor = element.style.backgroundColor;
      if (bgColor) {
        const rgbMatch = bgColor.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          colors.push({
            id: colorId,
            r: parseInt(rgbMatch[0]),
            g: parseInt(rgbMatch[1]),
            b: parseInt(rgbMatch[2]),
            element
          });
        }
      }
    }
    log(`\u2705 ${colors.length} colores detectados`);
    return colors;
  }
  function findClosestColor(r, g, b, availableColors) {
    let minDistance = Infinity;
    let closestColor = null;
    for (const color of availableColors) {
      const distance = Math.sqrt(
        Math.pow(r - color.r, 2) + Math.pow(g - color.g, 2) + Math.pow(b - color.b, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = color;
      }
    }
    return closestColor;
  }
  async function analyzeAreaPixels(area, options = {}) {
    const { allowVirtual = false } = options;
    const { x1, y1, x2, y2 } = area;
    const width = x2 - x1 + 1;
    const height = y2 - y1 + 1;
    log(`\u{1F50D} Analizando \xE1rea ${width}x${height} desde (${x1},${y1}) hasta (${x2},${y2})`);
    if (!guardState.availableColors || guardState.availableColors.length === 0) {
      const detected = detectAvailableColors();
      if (detected.length > 0) {
        guardState.availableColors = detected;
        log(`\u{1F3A8} Colores detectados para an\xE1lisis: ${detected.length}`);
      } else {
        log(`\u26A0\uFE0F Sin colores disponibles para an\xE1lisis. Omitiendo an\xE1lisis para evitar falsos positivos.`);
        return /* @__PURE__ */ new Map();
      }
    }
    const pixelMap = /* @__PURE__ */ new Map();
    const startTileX = Math.floor(x1 / GUARD_DEFAULTS.TILE_SIZE);
    const startTileY = Math.floor(y1 / GUARD_DEFAULTS.TILE_SIZE);
    const endTileX = Math.floor(x2 / GUARD_DEFAULTS.TILE_SIZE);
    const endTileY = Math.floor(y2 / GUARD_DEFAULTS.TILE_SIZE);
    for (let tileY = startTileY; tileY <= endTileY; tileY++) {
      for (let tileX = startTileX; tileX <= endTileX; tileX++) {
        try {
          const tileBlob = await getTileImage(tileX, tileY);
          if (!tileBlob) {
            log(`\u26A0\uFE0F No se pudo obtener tile ${tileX},${tileY}, continuando...`);
            continue;
          }
          const img = new Image();
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = URL2.createObjectURL(tileBlob);
          });
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const tileStartX = tileX * GUARD_DEFAULTS.TILE_SIZE;
          const tileStartY = tileY * GUARD_DEFAULTS.TILE_SIZE;
          const tileEndXExclusive = tileStartX + GUARD_DEFAULTS.TILE_SIZE;
          const tileEndYExclusive = tileStartY + GUARD_DEFAULTS.TILE_SIZE;
          const areaEndXExclusive = x2 + 1;
          const areaEndYExclusive = y2 + 1;
          const analyzeStartX = Math.max(x1, tileStartX);
          const analyzeStartY = Math.max(y1, tileStartY);
          const analyzeEndXExclusive = Math.min(areaEndXExclusive, tileEndXExclusive);
          const analyzeEndYExclusive = Math.min(areaEndYExclusive, tileEndYExclusive);
          for (let globalY = analyzeStartY; globalY < analyzeEndYExclusive; globalY++) {
            for (let globalX = analyzeStartX; globalX < analyzeEndXExclusive; globalX++) {
              const localXRaw = globalX - tileStartX;
              const localYRaw = globalY - tileStartY;
              const localX = (localXRaw % 1e3 + 1e3) % 1e3;
              const localY = (localYRaw % 1e3 + 1e3) % 1e3;
              if (localX >= 0 && localX < GUARD_DEFAULTS.TILE_SIZE && localY >= 0 && localY < GUARD_DEFAULTS.TILE_SIZE) {
                if (localX < canvas.width && localY < canvas.height) {
                  const pixelIndex = (localY * canvas.width + localX) * 4;
                  const r = data[pixelIndex];
                  const g = data[pixelIndex + 1];
                  const b = data[pixelIndex + 2];
                  const a = data[pixelIndex + 3];
                  if (a > 0) {
                    const closestColor = findClosestColor(r, g, b, guardState.availableColors);
                    if (closestColor) {
                      pixelMap.set(`${globalX},${globalY}`, {
                        r,
                        g,
                        b,
                        colorId: closestColor.id,
                        globalX,
                        globalY,
                        localX,
                        localY,
                        tileX,
                        tileY
                      });
                    }
                  }
                }
              }
            }
          }
          URL2.revokeObjectURL(img.src);
        } catch (error) {
          log(`\u274C Error analizando tile ${tileX},${tileY}:`, error);
        }
      }
    }
    log(`\u2705 An\xE1lisis completado: ${pixelMap.size} p\xEDxeles protegidos`);
    if (pixelMap.size === 0) {
      if (allowVirtual) {
        log(`\u26A0\uFE0F No se encontraron p\xEDxeles existentes, creando \xE1rea virtual para protecci\xF3n`);
        const areaEndXExclusive = x2 + 1;
        const areaEndYExclusive = y2 + 1;
        for (let globalY = y1; globalY < areaEndYExclusive; globalY++) {
          for (let globalX = x1; globalX < areaEndXExclusive; globalX++) {
            const tileX = Math.floor(globalX / GUARD_DEFAULTS.TILE_SIZE);
            const tileY = Math.floor(globalY / GUARD_DEFAULTS.TILE_SIZE);
            const localXRaw = globalX - tileX * GUARD_DEFAULTS.TILE_SIZE;
            const localYRaw = globalY - tileY * GUARD_DEFAULTS.TILE_SIZE;
            const localX = (localXRaw % 1e3 + 1e3) % 1e3;
            const localY = (localYRaw % 1e3 + 1e3) % 1e3;
            pixelMap.set(`${globalX},${globalY}`, {
              r: 255,
              g: 255,
              b: 255,
              // Blanco por defecto
              colorId: 5,
              // ID correcto del color blanco
              globalX,
              globalY,
              localX,
              localY,
              tileX,
              tileY
            });
          }
        }
        log(`\u2705 \xC1rea virtual creada: ${pixelMap.size} p\xEDxeles para proteger`);
      } else {
        log(`\u2139\uFE0F An\xE1lisis vac\xEDo y fallback virtual deshabilitado (modo verificaci\xF3n)`);
      }
    }
    return pixelMap;
  }
  function updateAnalysisStatsInUI(originalPixels, currentPixels) {
    var _a, _b;
    if (!guardState.ui || !guardState.ui.updateAnalysisStats) {
      return;
    }
    const total = originalPixels.size;
    let correctCount = 0;
    let incorrectCount = 0;
    let missingCount = 0;
    if (total === 0) {
      guardState.ui.updateAnalysisStats({
        correct: 0,
        incorrect: 0,
        missing: 0,
        accuracy: 0
      });
      return;
    }
    for (const [key, originalPixel] of originalPixels) {
      const currentPixel = currentPixels.get(key);
      if (!currentPixel) {
        missingCount++;
      } else {
        const comparisonMethod = ((_a = guardState.config) == null ? void 0 : _a.colorComparisonMethod) || "rgb";
        const threshold = ((_b = guardState.config) == null ? void 0 : _b.colorThreshold) || 10;
        const isChanged = compareColors(currentPixel, originalPixel, comparisonMethod, threshold);
        if (isChanged) {
          incorrectCount++;
        } else {
          correctCount++;
        }
      }
    }
    const accuracy = total > 0 ? (correctCount / total * 100).toFixed(1) : 0;
    guardState.ui.updateAnalysisStats({
      correct: correctCount,
      incorrect: incorrectCount,
      missing: missingCount,
      accuracy
    });
  }
  async function checkForChanges() {
    var _a, _b;
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      return;
    }
    try {
      const currentPixels = await analyzeAreaPixels(guardState.protectionArea);
      if (!currentPixels || currentPixels.size === 0) {
        if (guardState.isVirtualArea) {
          guardState.lastCheck = Date.now();
          if (guardState.ui) {
            guardState.ui.updateStatus("\u2705 \xC1rea protegida - sin cambios (\xE1rea virtual vac\xEDa)", "success");
          }
          return;
        } else {
          log(`\u{1F6A8} P\xEDxeles originales detectados pero an\xE1lisis actual vac\xEDo - p\xEDxeles fueron borrados`);
        }
      }
      const changes = /* @__PURE__ */ new Map();
      let changedCount = 0;
      if (guardState.isVirtualArea && currentPixels && currentPixels.size > 0) {
        for (const [key, currentPixel] of currentPixels) {
          changes.set(key, {
            timestamp: Date.now(),
            type: "intrusion",
            // Nuevo tipo para píxeles que no deberían estar
            original: null,
            // No hay píxel original en área virtual
            current: currentPixel
          });
          changedCount++;
        }
      } else {
        for (const [key, originalPixel] of guardState.originalPixels) {
          const currentPixel = currentPixels.get(key);
          if (!currentPixel) {
            changes.set(key, {
              timestamp: Date.now(),
              type: "deleted",
              original: originalPixel,
              current: null
            });
            changedCount++;
          } else {
            let isChanged = false;
            if (currentPixel.colorId !== originalPixel.colorId) {
              const comparisonMethod = ((_a = guardState.config) == null ? void 0 : _a.colorComparisonMethod) || "rgb";
              const threshold = ((_b = guardState.config) == null ? void 0 : _b.colorThreshold) || 10;
              isChanged = compareColors(currentPixel, originalPixel, comparisonMethod, threshold);
            }
            if (isChanged) {
              changes.set(key, {
                timestamp: Date.now(),
                type: "changed",
                original: originalPixel,
                current: currentPixel
              });
              changedCount++;
            }
          }
        }
      }
      if (changedCount > 0) {
        log(`\u{1F6A8} Detectados ${changedCount} cambios en el \xE1rea protegida`);
        guardState.changes = changes;
        if (guardState.ui) {
          guardState.ui.updateStatus(`\u{1F6A8} ${changedCount} cambios detectados`, "warning");
          guardState.ui.updateProgress(changes.size, guardState.originalPixels.size, guardState.isVirtualArea);
          updateAnalysisStatsInUI(guardState.originalPixels, currentPixels);
        }
        if (guardState.running) {
          await repairChanges(changes);
        }
      } else {
        guardState.lastCheck = Date.now();
        if (guardState.ui) {
          guardState.ui.updateStatus("\u2705 \xC1rea protegida - sin cambios", "success");
          guardState.ui.updateProgress(0, guardState.originalPixels.size, guardState.isVirtualArea);
          updateAnalysisStatsInUI(guardState.originalPixels, currentPixels);
        }
      }
    } catch (error) {
      log(`\u274C Error verificando cambios:`, error);
      if (guardState.ui) {
        guardState.ui.updateStatus(`\u274C Error verificando: ${error.message}`, "error");
      }
    }
  }
  async function repairChanges(changes) {
    if (changes.size === 0) {
      return;
    }
    if (_isRepairing) {
      log("\u{1F504} Reparaci\xF3n ya en progreso, omitiendo llamada duplicada");
      return;
    }
    _isRepairing = true;
    try {
      const changesArray = Array.from(changes.values());
      const availableCharges = Math.floor(guardState.currentCharges);
      if (availableCharges === 0) {
        log(`\u26A0\uFE0F Sin cargas disponibles, esperando recarga...`);
        if (guardState.ui) {
          guardState.ui.updateStatus("\u26A1 Esperando cargas para reparar...", "warning");
        }
        return;
      }
      const shouldRepairAll = availableCharges < guardState.minChargesToWait;
      const maxRepairs = shouldRepairAll ? availableCharges : Math.min(changesArray.length, guardState.pixelsPerBatch);
      log(`\u{1F6E0}\uFE0F Cargas: ${availableCharges}, M\xEDnimo: ${guardState.minChargesToWait}, Reparando: ${maxRepairs} p\xEDxeles`);
      if (guardState.ui) {
        const repairMode = shouldRepairAll ? " (gastando todas las cargas)" : "";
        guardState.ui.updateStatus(`\u{1F6E0}\uFE0F Reparando ${maxRepairs} p\xEDxeles${repairMode}...`, "info");
      }
      const changeKeys = Array.from(changes.keys());
      const selectedKeys = getPixelsByPattern(guardState.protectionPattern, new Set(changeKeys), maxRepairs);
      const pixelsToRepair = selectedKeys.map((key) => changes.get(key));
      const changesByTile = /* @__PURE__ */ new Map();
      for (const change of pixelsToRepair) {
        let targetPixel, targetColorId;
        if (change.type === "intrusion") {
          targetPixel = change.current;
          targetColorId = 5;
        } else {
          targetPixel = change.original;
          targetColorId = change.original.colorId;
        }
        const tileKey = `${targetPixel.tileX},${targetPixel.tileY}`;
        if (!changesByTile.has(tileKey)) {
          changesByTile.set(tileKey, []);
        }
        changesByTile.get(tileKey).push({
          localX: targetPixel.localX,
          localY: targetPixel.localY,
          colorId: targetColorId,
          globalX: targetPixel.globalX,
          globalY: targetPixel.globalY,
          changeType: change.type
        });
      }
      let totalRepaired = 0;
      for (const [tileKey, tileChanges] of changesByTile) {
        const [tileX, tileY] = tileKey.split(",").map(Number);
        try {
          const coords = [];
          const colors = [];
          for (const change of tileChanges) {
            coords.push(change.localX, change.localY);
            colors.push(change.colorId);
          }
          const result = await paintPixelBatch(tileX, tileY, coords, colors);
          if (result.success && result.painted > 0) {
            totalRepaired += result.painted;
            guardState.currentCharges = Math.max(0, guardState.currentCharges - result.painted);
            guardState.totalRepaired += result.painted;
            for (let i = 0; i < result.painted && i < tileChanges.length; i++) {
              const change = tileChanges[i];
              const key = `${change.globalX},${change.globalY}`;
              guardState.changes.delete(key);
            }
            log(`\u2705 Reparados ${result.painted} p\xEDxeles en tile (${tileX},${tileY})`);
          } else {
            log(`\u274C Error reparando tile (${tileX},${tileY}):`, result.error);
          }
        } catch (error) {
          log(`\u274C Error reparando tile (${tileX},${tileY}):`, error);
        }
        if (changesByTile.size > 1) {
          await sleep2(500);
        }
      }
      const remainingCharges = Math.floor(guardState.currentCharges);
      const remainingChanges = guardState.changes.size;
      log(`\u{1F6E0}\uFE0F Reparaci\xF3n completada: ${totalRepaired} p\xEDxeles reparados, ${remainingCharges} cargas restantes`);
      if (guardState.ui) {
        if (remainingChanges > 0 && remainingCharges < guardState.minChargesToWait) {
          guardState.ui.updateStatus(`\u23F3 Esperando ${guardState.minChargesToWait} cargas para continuar (${remainingCharges} actuales)`, "warning");
          const chargesNeeded = guardState.minChargesToWait - remainingCharges;
          const timeToWait = chargesNeeded * CHARGE_REGENERATION_TIME;
          _nextChargeTime = Date.now() + timeToWait;
          startCountdownTimer();
        } else {
          guardState.ui.updateStatus(`\u2705 Reparados ${totalRepaired} p\xEDxeles correctamente`, "success");
          stopCountdownTimer();
        }
        guardState.ui.updateStats({
          charges: remainingCharges,
          repaired: guardState.totalRepaired,
          pending: remainingChanges
        });
      }
    } catch (error) {
      log(`\u274C Error en reparaci\xF3n: ${error.message}`);
    } finally {
      _isRepairing = false;
    }
  }
  async function paintPixelBatch(tileX, tileY, coords, colors) {
    var _a, _b, _c;
    try {
      const token = await ensureToken();
      const sanitizedCoords = [];
      for (let i = 0; i < coords.length; i += 2) {
        const x = (Number(coords[i]) % 1e3 + 1e3) % 1e3;
        const y = (Number(coords[i + 1]) % 1e3 + 1e3) % 1e3;
        sanitizedCoords.push(x, y);
      }
      const previewPairs = sanitizedCoords.slice(0, 6).join(",");
      log(`[API] Enviando lote a tile ${tileX},${tileY} con ${colors.length} p\xEDxeles. Ejemplo coords: ${previewPairs}`);
      const response = await postPixelBatchImage(
        tileX,
        tileY,
        sanitizedCoords,
        colors,
        token
      );
      const painted = typeof response.painted === "number" ? response.painted : typeof ((_a = response.json) == null ? void 0 : _a.painted) === "number" ? response.json.painted : 0;
      return {
        success: response.success,
        painted,
        status: response.status,
        error: response.success ? null : ((_b = response.json) == null ? void 0 : _b.message) || ((_c = response.json) == null ? void 0 : _c.error) || "Error desconocido"
      };
    } catch (error) {
      return {
        success: false,
        painted: 0,
        error: error.message
      };
    }
  }
  var chargeMonitorInterval, _isRepairing, _countdownInterval, _nextChargeTime, CHARGE_CHECK_INTERVAL, CHARGE_REGENERATION_TIME, Image, URL2;
  var init_processor = __esm({
    "src/guard/processor.js"() {
      init_logger();
      init_wplace_api();
      init_turnstile();
      init_config();
      init_timing();
      init_patterns();
      chargeMonitorInterval = null;
      _isRepairing = false;
      _countdownInterval = null;
      _nextChargeTime = 0;
      CHARGE_CHECK_INTERVAL = 3e4;
      CHARGE_REGENERATION_TIME = 31e3;
      ({ Image, URL: URL2 } = window);
    }
  });

  // src/guard/analysis-window.js
  var analysis_window_exports = {};
  __export(analysis_window_exports, {
    closeAnalysisWindow: () => closeAnalysisWindow,
    createAnalysisWindow: () => createAnalysisWindow
  });
  function closeAnalysisWindow() {
    if (analysisWindowInstance) {
      if (autoRefreshInterval) {
        window.clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
      }
      if (analysisWindowInstance.analysisWindow && analysisWindowInstance.analysisWindow.parentNode) {
        document.body.removeChild(analysisWindowInstance.analysisWindow);
      }
      analysisWindowInstance = null;
      log("\u{1F50D} Ventana de an\xE1lisis cerrada");
    }
  }
  function createAnalysisWindow() {
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      alert("\u274C No hay \xE1rea protegida o p\xEDxeles cargados para analizar");
      return;
    }
    if (analysisWindowInstance) {
      closeAnalysisWindow();
    }
    const analysisWindow = document.createElement("div");
    analysisWindow.style.cssText = `
    position: fixed;
    left: 50px;
    top: 50px;
    width: 1200px;
    height: 800px;
    background: #1a1a1a;
    border: 2px solid #333;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    z-index: 100002;
    backdrop-filter: blur(10px);
  `;
    const header = document.createElement("div");
    header.style.cssText = `
    padding: 15px 20px;
    background: #2d3748;
    color: #60a5fa;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    cursor: move;
    user-select: none;
  `;
    header.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      \u{1F50D} <span>An\xE1lisis de Diferencias - JSON vs Canvas Actual</span>
    </div>
    <button id="closeAnalysisBtn" style="background: none; border: none; color: #eee; cursor: pointer; font-size: 20px; padding: 5px;">\u274C</button>
  `;
    const content = document.createElement("div");
    content.style.cssText = `
    flex: 1;
    display: flex;
    overflow: hidden;
  `;
    const controlPanel = document.createElement("div");
    controlPanel.style.cssText = `
    width: 300px;
    background: #2d3748;
    padding: 20px;
    border-right: 1px solid #333;
    overflow-y: auto;
    color: #eee;
    font-family: 'Segoe UI', Roboto, sans-serif;
  `;
    controlPanel.innerHTML = `
    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">\u{1F4CA} Estad\xEDsticas</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <div style="margin-bottom: 10px;">
        <span style="color: #10b981;">\u2705 P\xEDxeles Correctos:</span>
        <span id="correctPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div style="margin-bottom: 10px;">
        <span style="color: #ef4444;">\u274C P\xEDxeles Incorrectos:</span>
        <span id="incorrectPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div style="margin-bottom: 10px;">
        <span style="color: #f59e0b;">\u26AA P\xEDxeles Faltantes:</span>
        <span id="missingPixels" style="float: right; font-weight: bold;">-</span>
      </div>
      <div>
        <span style="color: #8b5cf6;">\u{1F3AF} Precisi\xF3n:</span>
        <span id="accuracy" style="float: right; font-weight: bold;">-</span>
      </div>
    </div>

    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">\u{1F3A8} Visualizaci\xF3n</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" id="showCorrect" checked style="margin-right: 8px;">
        <span style="color: #10b981;">\u2705 Mostrar Correctos</span>
      </label>
      <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" id="showIncorrect" checked style="margin-right: 8px;">
        <span style="color: #ef4444;">\u274C Mostrar Incorrectos</span>
      </label>
      <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" id="showMissing" checked style="margin-right: 8px;">
        <span style="color: #f59e0b;">\u26AA Mostrar Faltantes</span>
      </label>

    </div>

    <h3 style="margin: 0 0 15px 0; color: #60a5fa;">\u2699\uFE0F Configuraci\xF3n</h3>
    <div style="background: #374151; padding: 15px; border-radius: 8px;">
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-size: 14px;">\u{1F50D} Zoom:</label>
        <input type="range" id="zoomSlider" min="0.5" max="5" step="0.1" value="1" style="width: 100%;">
        <span id="zoomValue" style="font-size: 12px; color: #cbd5e0;">100%</span>
      </div>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-size: 14px;">\u{1F39A}\uFE0F Opacidad:</label>
        <input type="range" id="opacitySlider" min="0.1" max="1" step="0.1" value="0.8" style="width: 100%;">
        <span id="opacityValue" style="font-size: 12px; color: #cbd5e0;">80%</span>
      </div>
      <div style="margin-bottom: 15px;">
        <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
          <input type="checkbox" id="autoRefresh" style="margin-right: 8px;">
          <span style="color: #60a5fa;">\u{1F504} Auto-refresco</span>
        </label>
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="font-size: 12px; color: #cbd5e0;">Intervalo (s):</label>
          <input type="number" id="refreshInterval" min="1" max="60" value="5" style="width: 60px; padding: 4px; background: #4b5563; color: white; border: 1px solid #6b7280; border-radius: 4px;">
        </div>
      </div>
      <button id="refreshAnalysis" style="width: 100%; padding: 10px; background: #60a5fa; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
        \u{1F504} Actualizar An\xE1lisis
      </button>
      <button id="autoFitZoom" style="width: 100%; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 8px;">
        \u{1F4D0} Ajustar Zoom
      </button>
    </div>
  `;
    const canvasArea = document.createElement("div");
    canvasArea.style.cssText = `
    flex: 1;
    position: relative;
    overflow: auto;
    background: #111;
  `;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
    display: block;
    margin: 0;
    border: 1px solid #333;
    cursor: crosshair;
  `;
    const resizeHandle = document.createElement("div");
    resizeHandle.style.cssText = `
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    background: linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%);
    border-radius: 0 0 12px 0;
    z-index: 1;
  `;
    content.appendChild(controlPanel);
    content.appendChild(canvasArea);
    canvasArea.appendChild(canvas);
    analysisWindow.appendChild(header);
    analysisWindow.appendChild(content);
    analysisWindow.appendChild(resizeHandle);
    document.body.appendChild(analysisWindow);
    initializeAnalysis(canvas, controlPanel);
    analysisWindowInstance = { analysisWindow, canvas, controlPanel };
    header.querySelector("#closeAnalysisBtn").addEventListener("click", closeAnalysisWindow);
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    header.addEventListener("mousedown", (e) => {
      if (e.target.id !== "closeAnalysisBtn") {
        isDragging = true;
        const rect = analysisWindow.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", stopDrag);
      }
    });
    function handleDrag(e) {
      if (isDragging) {
        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;
        analysisWindow.style.position = "absolute";
        analysisWindow.style.left = `${Math.max(0, Math.min(x, window.innerWidth - analysisWindow.offsetWidth))}px`;
        analysisWindow.style.top = `${Math.max(0, Math.min(y, window.innerHeight - analysisWindow.offsetHeight))}px`;
      }
    }
    function stopDrag() {
      isDragging = false;
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", stopDrag);
    }
    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    resizeHandle.addEventListener("mousedown", (e) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(analysisWindow).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(analysisWindow).height, 10);
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", stopResize);
      e.preventDefault();
    });
    function handleResize(e) {
      if (isResizing) {
        const newWidth = Math.max(600, startWidth + e.clientX - startX);
        const newHeight = Math.max(400, startHeight + e.clientY - startY);
        analysisWindow.style.width = newWidth + "px";
        analysisWindow.style.height = newHeight + "px";
      }
    }
    function stopResize() {
      isResizing = false;
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    }
    return { analysisWindow, canvas, controlPanel };
  }
  async function initializeAnalysis(canvas, controlPanel) {
    var _a, _b;
    try {
      log("\u{1F50D} Iniciando an\xE1lisis de diferencias...");
      log(`\u{1F4CD} \xC1rea de protecci\xF3n:`, guardState.protectionArea);
      log(`\u{1F4CA} P\xEDxeles originales en guardState: ${((_a = guardState.originalPixels) == null ? void 0 : _a.size) || 0}`);
      log(`\u{1F3A8} Colores disponibles: ${((_b = guardState.availableColors) == null ? void 0 : _b.length) || 0}`);
      if (!guardState.availableColors || guardState.availableColors.length === 0) {
        log("\u26A0\uFE0F No hay colores disponibles, intentando detectar...");
        const { detectAvailableColors: detectAvailableColors2 } = await Promise.resolve().then(() => (init_processor(), processor_exports));
        const detected = detectAvailableColors2();
        if (detected.length > 0) {
          guardState.availableColors = detected;
          log(`\u{1F3A8} Colores detectados: ${detected.length}`);
        } else {
          log("\u274C No se pudieron detectar colores para el an\xE1lisis");
          alert("\u274C No se pueden detectar colores. Aseg\xFArate de que la paleta est\xE9 abierta.");
          return;
        }
      }
      log("\u{1F50D} Obteniendo p\xEDxeles actuales del canvas...");
      const currentPixels = await analyzeAreaPixels(guardState.protectionArea);
      log(`\u{1F5BC}\uFE0F P\xEDxeles actuales obtenidos: ${(currentPixels == null ? void 0 : currentPixels.size) || 0}`);
      log("\u{1F50D} Comparando p\xEDxeles...");
      const analysis = comparePixels(guardState.originalPixels, currentPixels || /* @__PURE__ */ new Map());
      updateStatistics(controlPanel, analysis);
      renderVisualization(canvas, analysis);
      setupControls(controlPanel, canvas, analysis);
      log("\u2705 An\xE1lisis completado");
    } catch (error) {
      log("\u274C Error en an\xE1lisis:", error);
      console.error("Error detallado:", error);
    }
  }
  function comparePixels(originalPixels, currentPixels) {
    var _a, _b;
    const correct = /* @__PURE__ */ new Map();
    const incorrect = /* @__PURE__ */ new Map();
    const missing = /* @__PURE__ */ new Map();
    const comparisonMethod = ((_a = guardState.config) == null ? void 0 : _a.colorComparisonMethod) || "rgb";
    const threshold = ((_b = guardState.config) == null ? void 0 : _b.colorThreshold) || 10;
    const compareColors2 = (color1, color2) => {
      if (comparisonMethod === "lab") {
        const lab1 = rgbToLab2(color1.r, color1.g, color1.b);
        const lab2 = rgbToLab2(color2.r, color2.g, color2.b);
        const deltaE = calculateDeltaE2(lab1, lab2);
        return deltaE <= threshold / 2;
      } else {
        const rDiff = Math.abs(color1.r - color2.r);
        const gDiff = Math.abs(color1.g - color2.g);
        const bDiff = Math.abs(color1.b - color2.b);
        const maxDiff = Math.max(rDiff, gDiff, bDiff);
        return maxDiff <= threshold;
      }
    };
    for (const [key, originalPixel] of originalPixels) {
      const currentPixel = currentPixels.get(key);
      if (!currentPixel) {
        missing.set(key, originalPixel);
      } else if (compareColors2(originalPixel, currentPixel)) {
        correct.set(key, { original: originalPixel, current: currentPixel });
      } else {
        incorrect.set(key, { original: originalPixel, current: currentPixel });
      }
    }
    return { correct, incorrect, missing, originalPixels, currentPixels };
  }
  function updateStatistics(controlPanel, analysis) {
    const total = analysis.originalPixels.size;
    const correctCount = analysis.correct.size;
    const incorrectCount = analysis.incorrect.size;
    const missingCount = analysis.missing.size;
    const accuracy = total > 0 ? (correctCount / total * 100).toFixed(1) : 0;
    controlPanel.querySelector("#correctPixels").textContent = correctCount;
    controlPanel.querySelector("#incorrectPixels").textContent = incorrectCount;
    controlPanel.querySelector("#missingPixels").textContent = missingCount;
    controlPanel.querySelector("#accuracy").textContent = `${accuracy}%`;
  }
  function renderVisualization(canvas, analysis) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const area = guardState.protectionArea;
    const width = area.x2 - area.x1 + 1;
    const height = area.y2 - area.y1 + 1;
    log(`\u{1F5BC}\uFE0F Renderizando visualizaci\xF3n: ${width}x${height} p\xEDxeles`);
    log(`\u{1F4CA} P\xEDxeles originales: ${((_a = analysis.originalPixels) == null ? void 0 : _a.size) || 0}`);
    log(`\u2705 P\xEDxeles correctos: ${((_b = analysis.correct) == null ? void 0 : _b.size) || 0}`);
    log(`\u274C P\xEDxeles incorrectos: ${((_c = analysis.incorrect) == null ? void 0 : _c.size) || 0}`);
    log(`\u26A0\uFE0F P\xEDxeles faltantes: ${((_d = analysis.missing) == null ? void 0 : _d.size) || 0}`);
    canvas.width = width;
    canvas.height = height;
    const canvasArea = canvas.parentElement;
    const areaRect = canvasArea.getBoundingClientRect();
    const availableWidth = areaRect.width - 20;
    const availableHeight = areaRect.height - 20;
    const scaleX = availableWidth / width;
    const scaleY = availableHeight / height;
    const scale = Math.min(scaleX, scaleY, 3);
    canvas.style.width = `${width * scale}px`;
    canvas.style.height = `${height * scale}px`;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 240;
      imageData.data[i + 1] = 240;
      imageData.data[i + 2] = 240;
      imageData.data[i + 3] = 255;
    }
    const analysisWindow = canvas.closest(".analysis-window");
    const panelElement = analysisWindow ? analysisWindow.querySelector(".control-panel") : null;
    const showCorrect = panelElement ? (_f = (_e = panelElement.querySelector("#showCorrect")) == null ? void 0 : _e.checked) != null ? _f : true : true;
    const showIncorrect = panelElement ? (_h = (_g = panelElement.querySelector("#showIncorrect")) == null ? void 0 : _g.checked) != null ? _h : true : true;
    const showMissing = panelElement ? (_j = (_i = panelElement.querySelector("#showMissing")) == null ? void 0 : _i.checked) != null ? _j : true : true;
    log(`\u{1F39B}\uFE0F Estados de visualizaci\xF3n - Correctos: ${showCorrect}, Incorrectos: ${showIncorrect}, Faltantes: ${showMissing}`);
    for (const [key, pixel] of analysis.originalPixels || /* @__PURE__ */ new Map()) {
      const [x, y] = key.split(",").map(Number);
      const index = ((y - area.y1) * width + (x - area.x1)) * 4;
      if (index >= 0 && index < imageData.data.length - 3) {
        imageData.data[index] = pixel.r;
        imageData.data[index + 1] = pixel.g;
        imageData.data[index + 2] = pixel.b;
        imageData.data[index + 3] = 255;
      }
    }
    const drawPixel = (x, y, r, g, b, a = 255) => {
      const index = ((y - area.y1) * width + (x - area.x1)) * 4;
      if (index >= 0 && index < imageData.data.length - 3) {
        imageData.data[index] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
      }
    };
    if (showCorrect) {
      for (const [key, _data] of analysis.correct) {
        const [x, y] = key.split(",").map(Number);
        drawPixel(x, y, 0, 255, 0, 128);
      }
    }
    if (showIncorrect) {
      for (const [key, _data] of analysis.incorrect) {
        const [x, y] = key.split(",").map(Number);
        drawPixel(x, y, 255, 0, 0, 200);
      }
    }
    if (showMissing) {
      for (const [key, _pixel] of analysis.missing) {
        const [x, y] = key.split(",").map(Number);
        drawPixel(x, y, 255, 255, 0, 150);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
  function setupControls(controlPanel, canvas, analysis) {
    const zoomSlider = controlPanel.querySelector("#zoomSlider");
    const zoomValue = controlPanel.querySelector("#zoomValue");
    const opacitySlider = controlPanel.querySelector("#opacitySlider");
    const opacityValue = controlPanel.querySelector("#opacityValue");
    const refreshBtn = controlPanel.querySelector("#refreshAnalysis");
    const autoRefreshCheckbox = controlPanel.querySelector("#autoRefresh");
    const refreshIntervalInput = controlPanel.querySelector("#refreshInterval");
    const autoFitZoomBtn = controlPanel.querySelector("#autoFitZoom");
    const _repositionBtn = controlPanel.querySelector("#repositionArea");
    zoomSlider.addEventListener("input", (e) => {
      const zoom = parseFloat(e.target.value);
      zoomValue.textContent = `${Math.round(zoom * 100)}%`;
      canvas.style.transform = `scale(${zoom})`;
      canvas.style.transformOrigin = "top left";
    });
    opacitySlider.addEventListener("input", (e) => {
      const opacity = parseFloat(e.target.value);
      opacityValue.textContent = `${Math.round(opacity * 100)}%`;
      canvas.style.opacity = opacity;
    });
    autoFitZoomBtn.addEventListener("click", () => {
      const canvasArea = canvas.parentElement;
      const areaRect = canvasArea.getBoundingClientRect();
      const currentCanvasWidth = parseFloat(canvas.style.width) || canvas.width;
      const currentCanvasHeight = parseFloat(canvas.style.height) || canvas.height;
      const scaleX = (areaRect.width - 20) / currentCanvasWidth;
      const scaleY = (areaRect.height - 20) / currentCanvasHeight;
      const optimalZoom = Math.min(scaleX, scaleY, 3);
      zoomSlider.value = optimalZoom;
      zoomValue.textContent = `${Math.round(optimalZoom * 100)}%`;
      canvas.style.transform = `scale(${optimalZoom})`;
      canvas.style.transformOrigin = "top left";
      log(`\u{1F50D} Zoom ajustado autom\xE1ticamente a ${Math.round(optimalZoom * 100)}%`);
    });
    autoRefreshCheckbox.addEventListener("change", () => {
      if (autoRefreshCheckbox.checked) {
        const interval = parseInt(refreshIntervalInput.value) * 1e3;
        autoRefreshInterval = window.setInterval(async () => {
          const currentZoom = parseFloat(zoomSlider.value);
          const currentOpacity = parseFloat(opacitySlider.value);
          await initializeAnalysis(canvas, controlPanel);
          zoomSlider.value = currentZoom;
          zoomValue.textContent = `${Math.round(currentZoom * 100)}%`;
          canvas.style.transform = `scale(${currentZoom})`;
          canvas.style.transformOrigin = "top left";
          opacitySlider.value = currentOpacity;
          opacityValue.textContent = `${Math.round(currentOpacity * 100)}%`;
          canvas.style.opacity = currentOpacity;
        }, interval);
        log(`\u{1F504} Auto-refresco activado cada ${refreshIntervalInput.value} segundos`);
      } else {
        if (autoRefreshInterval) {
          window.clearInterval(autoRefreshInterval);
          autoRefreshInterval = null;
        }
        log("\u{1F504} Auto-refresco desactivado");
      }
    });
    refreshIntervalInput.addEventListener("change", () => {
      if (autoRefreshCheckbox.checked) {
        if (autoRefreshInterval) {
          window.clearInterval(autoRefreshInterval);
        }
        const interval = parseInt(refreshIntervalInput.value) * 1e3;
        autoRefreshInterval = window.setInterval(async () => {
          const currentZoom = parseFloat(zoomSlider.value);
          const currentOpacity = parseFloat(opacitySlider.value);
          await initializeAnalysis(canvas, controlPanel);
          zoomSlider.value = currentZoom;
          zoomValue.textContent = `${Math.round(currentZoom * 100)}%`;
          canvas.style.transform = `scale(${currentZoom})`;
          canvas.style.transformOrigin = "top left";
          opacitySlider.value = currentOpacity;
          opacityValue.textContent = `${Math.round(currentOpacity * 100)}%`;
          canvas.style.opacity = currentOpacity;
        }, interval);
        log(`\u{1F504} Intervalo de auto-refresco actualizado a ${refreshIntervalInput.value} segundos`);
      }
    });
    refreshBtn.addEventListener("click", async () => {
      await initializeAnalysis(canvas, controlPanel);
    });
    const checkboxes = ["showCorrect", "showIncorrect", "showMissing"];
    checkboxes.forEach((id) => {
      const checkbox = controlPanel.querySelector(`#${id}`);
      checkbox.addEventListener("change", () => {
        const currentZoom = parseFloat(zoomSlider.value);
        const currentOpacity = parseFloat(opacitySlider.value);
        renderVisualization(canvas, analysis);
        canvas.style.transform = `scale(${currentZoom})`;
        canvas.style.transformOrigin = "top left";
        canvas.style.opacity = currentOpacity;
        log(`\u{1F441}\uFE0F Visualizaci\xF3n actualizada: ${id} = ${checkbox.checked}`);
      });
    });
    setTimeout(() => {
      autoFitZoomBtn.click();
    }, 100);
  }
  function rgbToLab2(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
    const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
    const xn = 0.95047;
    const yn = 1;
    const zn = 1.08883;
    const fx = x / xn > 8856e-6 ? Math.pow(x / xn, 1 / 3) : 7.787 * (x / xn) + 16 / 116;
    const fy = y / yn > 8856e-6 ? Math.pow(y / yn, 1 / 3) : 7.787 * (y / yn) + 16 / 116;
    const fz = z / zn > 8856e-6 ? Math.pow(z / zn, 1 / 3) : 7.787 * (z / zn) + 16 / 116;
    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const bLab = 200 * (fy - fz);
    return { l, a, b: bLab };
  }
  function calculateDeltaE2(lab1, lab2) {
    const deltaL = lab1.l - lab2.l;
    const deltaA = lab1.a - lab2.a;
    const deltaB = lab1.b - lab2.b;
    return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
  }
  var analysisWindowInstance, autoRefreshInterval;
  var init_analysis_window = __esm({
    "src/guard/analysis-window.js"() {
      init_logger();
      init_config();
      init_processor();
      analysisWindowInstance = null;
      autoRefreshInterval = null;
    }
  });

  // src/guard/index.js
  init_logger();
  init_wplace_api();
  init_config();
  init_processor();

  // src/guard/save-load.js
  init_config();
  init_logger();
  function splitProtectionArea(area, splitCount) {
    const { x1, y1, x2, y2 } = area;
    const width = x2 - x1;
    const height = y2 - y1;
    const areas = [];
    if (splitCount <= 1) {
      return [area];
    }
    const divideHorizontally = width >= height;
    if (divideHorizontally) {
      const segmentWidth = Math.floor(width / splitCount);
      for (let i = 0; i < splitCount; i++) {
        const startX = x1 + i * segmentWidth;
        const endX = i === splitCount - 1 ? x2 : startX + segmentWidth;
        areas.push({
          x1: startX,
          y1,
          x2: endX,
          y2
        });
      }
    } else {
      const segmentHeight = Math.floor(height / splitCount);
      for (let i = 0; i < splitCount; i++) {
        const startY = y1 + i * segmentHeight;
        const endY = i === splitCount - 1 ? y2 : startY + segmentHeight;
        areas.push({
          x1,
          y1: startY,
          x2,
          y2: endY
        });
      }
    }
    return areas;
  }
  function getPixelsInArea(area, pixelsMap) {
    const pixels = [];
    const { x1, y1, x2, y2 } = area;
    for (const [key, value] of pixelsMap.entries()) {
      const [x, y] = key.split(",").map(Number);
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        pixels.push({ key, ...value });
      }
    }
    return pixels;
  }
  function saveProgress(filename = null, splitCount = null) {
    try {
      if (!guardState.protectionArea || !guardState.originalPixels.size) {
        throw new Error("No hay progreso para guardar");
      }
      const areas = splitCount && splitCount > 1 ? splitProtectionArea(guardState.protectionArea, splitCount) : [guardState.protectionArea];
      const results = [];
      for (let i = 0; i < areas.length; i++) {
        const area = areas[i];
        const areaPixels = getPixelsInArea(area, guardState.originalPixels);
        const progressData = {
          version: "1.0",
          timestamp: Date.now(),
          protectionData: {
            area: { ...area },
            protectedPixels: areaPixels.length,
            splitInfo: splitCount > 1 ? {
              total: splitCount,
              current: i + 1,
              originalArea: { ...guardState.protectionArea }
            } : null
          },
          progress: {
            totalRepaired: guardState.totalRepaired,
            lastCheck: guardState.lastCheck
          },
          config: {
            maxProtectionSize: 1e5,
            pixelsPerBatch: 10,
            checkInterval: 1e4
          },
          // Filtrar solo los datos serializables de los colores (sin elementos DOM)
          colors: guardState.availableColors.map((color) => ({
            id: color.id,
            r: color.r,
            g: color.g,
            b: color.b
          })),
          // Convertir Map a array para serialización - solo píxeles del área
          originalPixels: areaPixels
        };
        const dataStr = JSON.stringify(progressData, null, 2);
        const blob = new window.Blob([dataStr], { type: "application/json" });
        const suffix = splitCount > 1 ? `_parte${i + 1}de${splitCount}` : "";
        const finalFilename = filename || `wplace_GUARD_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-")}${suffix}.json`;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = finalFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        results.push({ success: true, filename: finalFilename });
        log(`\u2705 Progreso guardado: ${finalFilename}`);
      }
      return {
        success: true,
        filename: results.length === 1 ? results[0].filename : `${results.length} archivos`,
        files: results
      };
    } catch (error) {
      log("\u274C Error guardando progreso:", error);
      return { success: false, error: error.message };
    }
  }
  async function loadProgress(file) {
    try {
      const text = await file.text();
      const progressData = JSON.parse(text);
      log("\u{1F4C1} Archivo cargado correctamente");
      const requiredFields = ["protectionData", "originalPixels", "colors"];
      const missingFields = requiredFields.filter((field) => !(field in progressData));
      if (missingFields.length > 0) {
        throw new Error(`Campos requeridos faltantes: ${missingFields.join(", ")}`);
      }
      if (guardState.availableColors.length > 0) {
        const savedColorIds = progressData.colors.map((c) => c.id);
        const currentColorIds = guardState.availableColors.map((c) => c.id);
        const commonColors = savedColorIds.filter((id) => currentColorIds.includes(id));
        if (commonColors.length < savedColorIds.length * 0.8) {
          log("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales");
        }
      }
      if (!guardState.availableColors || guardState.availableColors.length === 0) {
        guardState.availableColors = Array.isArray(progressData.colors) ? progressData.colors.map((c) => ({ id: c.id, r: c.r, g: c.g, b: c.b })) : [];
        log(`\u{1F3A8} Colores cargados desde archivo: ${guardState.availableColors.length}`);
      }
      if (progressData.protectionData) {
        guardState.protectionArea = progressData.protectionData.area;
        guardState.isVirtualArea = progressData.protectionData.virtualArea || false;
      } else if (progressData.protectionArea) {
        guardState.protectionArea = progressData.protectionArea;
        guardState.isVirtualArea = false;
      }
      guardState.originalPixels = /* @__PURE__ */ new Map();
      for (const pixelData of progressData.originalPixels) {
        const { key, ...pixelInfo } = pixelData;
        guardState.originalPixels.set(key, pixelInfo);
      }
      if (progressData.progress) {
        guardState.totalRepaired = progressData.progress.totalRepaired || 0;
        guardState.lastCheck = progressData.progress.lastCheck || 0;
      } else if (progressData.statistics) {
        guardState.totalRepaired = progressData.statistics.totalRepaired || 0;
        guardState.lastCheck = progressData.statistics.lastCheck || 0;
      }
      guardState.changes.clear();
      if (guardState.ui) {
        guardState.ui.updateCoordinates({
          x1: guardState.protectionArea.x1,
          y1: guardState.protectionArea.y1,
          x2: guardState.protectionArea.x2,
          y2: guardState.protectionArea.y2
        });
        guardState.ui.updateProgress(guardState.originalPixels.size, 0);
        guardState.ui.updateStats({
          repaired: guardState.totalRepaired
        });
        guardState.ui.enableStartBtn();
      }
      log(`\u2705 Progreso cargado: ${guardState.originalPixels.size} p\xEDxeles protegidos`);
      return {
        success: true,
        data: progressData,
        protectedPixels: guardState.originalPixels.size,
        area: guardState.protectionArea
      };
    } catch (error) {
      log("\u274C Error cargando progreso:", error);
      return { success: false, error: error.message };
    }
  }
  function hasProgress() {
    return guardState.protectionArea && guardState.originalPixels.size > 0;
  }

  // src/guard/ui.js
  function createGuardUI(texts) {
    const container = document.createElement("div");
    container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    color: #eee;
    font-family: 'Segoe UI', Roboto, sans-serif;
    z-index: 9999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  `;
    container.innerHTML = `
    <div style="padding: 12px 15px; background: #2d3748; color: #60a5fa; font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: move;" class="guard-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        \u{1F6E1}\uFE0F <span>${texts.title}</span>
      </div>
      <button id="closeBtn" style="background: none; border: none; color: #eee; cursor: pointer; opacity: 0.7; padding: 5px;">\u274C</button>
    </div>
    
    <div style="padding: 15px;">
      <!-- Estado de inicializaci\xF3n -->
      <div id="initSection">
        <button id="initBtn" style="width: 100%; padding: 10px; background: #60a5fa; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 10px;">
          \u{1F916} ${texts.initBot}
        </button>
      </div>
      
      <!-- Selecci\xF3n de \xE1rea -->
      <div id="areaSection" style="display: none;">
        <!-- Botones de \xE1rea - en dos columnas -->
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <button id="selectAreaBtn" style="flex: 1; padding: 10px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            \u{1F3AF} ${texts.selectArea}
          </button>
          <button id="loadAreaBtn" style="flex: 1; padding: 10px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            \u{1F4C1} Cargar Archivo
          </button>
        </div>
        
        <!-- Coordenadas capturadas (solo lectura) -->
        <div style="margin-bottom: 15px;">
          <div style="display: flex; gap: 10px; margin-bottom: 8px;">
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">${texts.upperLeft}:</label>
              <div style="display: flex; gap: 5px;">
                <input id="x1Input" type="number" placeholder="X1" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
                <input id="y1Input" type="number" placeholder="Y1" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
              </div>
            </div>
          </div>
          
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">${texts.lowerRight}:</label>
              <div style="display: flex; gap: 5px;">
                <input id="x2Input" type="number" placeholder="X2" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
                <input id="y2Input" type="number" placeholder="Y2" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
              </div>
            </div>
          </div>
        </div>
        
        <button id="startBtn" style="width: 100%; padding: 10px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 10px;" disabled>
          \u25B6\uFE0F ${texts.startProtection}
        </button>
        
        <button id="stopBtn" style="width: 100%; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 10px;" disabled>
          \u23F9\uFE0F ${texts.stopProtection}
        </button>


        
        <button id="logWindowBtn" style="width: 100%; padding: 8px; background: #6b7280; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 0; font-size: 13px;">
          \u{1F4CB} ${texts.logWindow || "Logs"}
        </button>
        
        <button id="repositionBtn" style="width: 100%; padding: 8px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 5px; font-size: 13px;" disabled>
          \u{1F4CD} Reposicionar
        </button>
      </div>
      
      <!-- Estad\xEDsticas -->
      <div id="statsSection" style="background: #2d3748; padding: 10px; border-radius: 6px; margin-top: 10px;">
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>\u{1F4CA} ${texts.protectedPixels}: </span><span id="protectedCount">0</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>\u{1F6A8} ${texts.detectedChanges}: </span><span id="changesCount">0</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>\u26A1 ${texts.charges}: </span><span id="chargesCount">0</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>\u{1F6E0}\uFE0F ${texts.repairedPixels}: </span><span id="repairedCount">0</span>
        </div>
        <div id="countdownSection" style="font-size: 13px; margin-bottom: 5px; display: none;">
          <span>\u23F0 Pr\xF3ximo lote en: </span><span id="countdownTimer">--</span>
        </div>
        
        <!-- Estad\xEDsticas de An\xE1lisis -->
        <hr style="border: none; border-top: 1px solid #4a5568; margin: 10px 0;">
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span style="color: #10b981;">\u2705 P\xEDxeles Correctos: </span><span id="correctPixelsCount">-</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span style="color: #ef4444;">\u274C P\xEDxeles Incorrectos: </span><span id="incorrectPixelsCount">-</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span style="color: #f59e0b;">\u26AA P\xEDxeles Faltantes: </span><span id="missingPixelsCount">-</span>
        </div>
        <div style="font-size: 13px;">
          <span style="color: #8b5cf6;">\u{1F3AF} Precisi\xF3n: </span><span id="accuracyCount">-</span>
        </div>
      </div>
      
      <!-- Controles de configuraci\xF3n -->
      <div id="configSection" style="background: #2d3748; padding: 10px; border-radius: 6px; margin-top: 10px;">
        <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #cbd5e0;">\u2699\uFE0F Configuraci\xF3n</h4>
        
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">P\xEDxeles por lote:</label>
            <input id="pixelsPerBatchInput" type="number" min="1" max="50" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
          </div>
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">Cargas m\xEDnimas:</label>
            <input id="minChargesInput" type="number" min="1" max="100" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
          </div>
        </div>
        
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">\u{1F3AF} Patr\xF3n de Protecci\xF3n:</label>
          <select id="protectionPatternSelect" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
            <option value="random">\u{1F3B2} Aleatorio</option>
            <option value="line">\u{1F4CF} L\xEDnea</option>
            <option value="center">\u{1F3AF} Centro</option>
            <option value="spiral">\u{1F300} Espiral</option>
            <option value="human">\u{1F464} Humano</option>
          </select>
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">\u{1F3A8} Comparaci\xF3n de Color:</label>
            <select id="colorComparisonSelect" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
              <option value="rgb">RGB (R\xE1pido)</option>
              <option value="lab">LAB (Preciso)</option>
            </select>
          </div>
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">\u{1F39A}\uFE0F Umbral:</label>
            <input id="colorThresholdInput" type="number" min="1" max="50" value="10" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
          </div>
        </div>
        
        <!-- Controles de save/load -->
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <button id="saveBtn" style="flex: 1; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px;">
            \u{1F4BE} Guardar
          </button>
          <button id="analyzeBtn" style="flex: 1; padding: 8px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px;" disabled>
            \u{1F50D} Analizar
          </button>
        </div>
      </div>
      
      <!-- Estado -->
      <div id="statusBar" style="background: #2d3748; padding: 8px; border-radius: 4px; text-align: center; font-size: 13px; margin-top: 10px;">
        \u23F3 ${texts.waitingInit}
      </div>
    </div>
  `;
    document.body.appendChild(container);
    const areaFileInput = document.createElement("input");
    areaFileInput.type = "file";
    areaFileInput.accept = ".json";
    areaFileInput.style.display = "none";
    document.body.appendChild(areaFileInput);
    makeDraggable(container);
    const elements = {
      initBtn: container.querySelector("#initBtn"),
      selectAreaBtn: container.querySelector("#selectAreaBtn"),
      loadAreaBtn: container.querySelector("#loadAreaBtn"),
      x1Input: container.querySelector("#x1Input"),
      y1Input: container.querySelector("#y1Input"),
      x2Input: container.querySelector("#x2Input"),
      y2Input: container.querySelector("#y2Input"),
      startBtn: container.querySelector("#startBtn"),
      stopBtn: container.querySelector("#stopBtn"),
      logWindowBtn: container.querySelector("#logWindowBtn"),
      repositionBtn: container.querySelector("#repositionBtn"),
      closeBtn: container.querySelector("#closeBtn"),
      initSection: container.querySelector("#initSection"),
      areaSection: container.querySelector("#areaSection"),
      protectedCount: container.querySelector("#protectedCount"),
      changesCount: container.querySelector("#changesCount"),
      chargesCount: container.querySelector("#chargesCount"),
      repairedCount: container.querySelector("#repairedCount"),
      countdownSection: container.querySelector("#countdownSection"),
      countdownTimer: container.querySelector("#countdownTimer"),
      correctPixelsCount: container.querySelector("#correctPixelsCount"),
      incorrectPixelsCount: container.querySelector("#incorrectPixelsCount"),
      missingPixelsCount: container.querySelector("#missingPixelsCount"),
      accuracyCount: container.querySelector("#accuracyCount"),
      statusBar: container.querySelector("#statusBar"),
      areaFileInput,
      pixelsPerBatchInput: container.querySelector("#pixelsPerBatchInput"),
      minChargesInput: container.querySelector("#minChargesInput"),
      protectionPatternSelect: container.querySelector("#protectionPatternSelect"),
      colorComparisonSelect: container.querySelector("#colorComparisonSelect"),
      colorThresholdInput: container.querySelector("#colorThresholdInput"),
      saveBtn: container.querySelector("#saveBtn"),
      analyzeBtn: container.querySelector("#analyzeBtn")
    };
    const ui = {
      elements,
      updateStatus: (message, type = "info") => {
        elements.statusBar.textContent = message;
        const colors = {
          info: "#60a5fa",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444"
        };
        elements.statusBar.style.color = colors[type] || colors.info;
      },
      updateProgress: (current, total, isVirtual = false) => {
        elements.changesCount.textContent = current;
        if (isVirtual && total > 0) {
          elements.protectedCount.textContent = `${total} (\xE1rea vac\xEDa)`;
        } else {
          elements.protectedCount.textContent = total;
        }
      },
      updateStats: (stats) => {
        if (stats.charges !== void 0) elements.chargesCount.textContent = stats.charges;
        if (stats.repaired !== void 0) elements.repairedCount.textContent = stats.repaired;
        if (stats.pending !== void 0) elements.changesCount.textContent = stats.pending;
      },
      showCountdown: (show = true) => {
        elements.countdownSection.style.display = show ? "block" : "none";
      },
      updateCountdown: (seconds) => {
        if (seconds <= 0) {
          elements.countdownTimer.textContent = "--";
          ui.showCountdown(false);
          return;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timeStr = minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
        elements.countdownTimer.textContent = timeStr;
        ui.showCountdown(true);
      },
      updateAnalysisStats: (analysisStats) => {
        if (analysisStats.correct !== void 0) elements.correctPixelsCount.textContent = analysisStats.correct;
        if (analysisStats.incorrect !== void 0) elements.incorrectPixelsCount.textContent = analysisStats.incorrect;
        if (analysisStats.missing !== void 0) elements.missingPixelsCount.textContent = analysisStats.missing;
        if (analysisStats.accuracy !== void 0) elements.accuracyCount.textContent = `${analysisStats.accuracy}%`;
      },
      showAreaSection: () => {
        elements.initSection.style.display = "none";
        elements.areaSection.style.display = "block";
      },
      setInitButtonVisible: (visible) => {
        elements.initSection.style.display = visible ? "block" : "none";
      },
      setInitialized: (initialized) => {
        elements.initBtn.disabled = initialized;
        if (initialized) {
          elements.initBtn.style.opacity = "0.5";
          elements.initBtn.style.cursor = "not-allowed";
        }
      },
      enableStartBtn: () => {
        elements.startBtn.disabled = false;
        elements.analyzeBtn.disabled = false;
        ui.updateRepositionBtn();
      },
      updateRepositionBtn: () => {
        elements.repositionBtn.disabled = !hasProgress();
      },
      setRunningState: (running) => {
        elements.startBtn.disabled = running;
        elements.stopBtn.disabled = !running;
        elements.selectAreaBtn.disabled = running;
        if (running) {
          elements.repositionBtn.disabled = true;
        } else {
          ui.updateRepositionBtn();
          if (elements.x1Input.value && elements.y1Input.value && elements.x2Input.value && elements.y2Input.value) {
            elements.analyzeBtn.disabled = false;
          }
        }
      },
      updateCoordinates: (coords) => {
        if (coords.x1 !== void 0) elements.x1Input.value = coords.x1;
        if (coords.y1 !== void 0) elements.y1Input.value = coords.y1;
        if (coords.x2 !== void 0) elements.x2Input.value = coords.x2;
        if (coords.y2 !== void 0) elements.y2Input.value = coords.y2;
        if (elements.x1Input.value && elements.y1Input.value && elements.x2Input.value && elements.y2Input.value) {
          elements.analyzeBtn.disabled = false;
        }
        ui.updateRepositionBtn();
      },
      destroy: () => {
        container.remove();
        areaFileInput.remove();
      }
    };
    elements.analyzeBtn.addEventListener("click", async () => {
      const { createAnalysisWindow: createAnalysisWindow2 } = await Promise.resolve().then(() => (init_analysis_window(), analysis_window_exports));
      createAnalysisWindow2();
    });
    ui.updateRepositionBtn();
    return ui;
  }
  function showConfirmDialog(message, title, buttons = {}) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "rgba(0,0,0,0.7)";
      overlay.style.zIndex = "10001";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      const modal = document.createElement("div");
      modal.style.background = "#1a1a1a";
      modal.style.border = "2px solid #333";
      modal.style.borderRadius = "15px";
      modal.style.padding = "25px";
      modal.style.color = "#eee";
      modal.style.minWidth = "350px";
      modal.style.maxWidth = "400px";
      modal.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
      modal.style.fontFamily = "'Segoe UI', Roboto, sans-serif";
      modal.innerHTML = `
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${title}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${message}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${buttons.save ? `<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${buttons.save}</button>` : ""}
        ${buttons.discard ? `<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${buttons.discard}</button>` : ""}
        ${buttons.cancel ? `<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${buttons.cancel}</button>` : ""}
      </div>
    `;
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      const saveBtn = modal.querySelector(".save-btn");
      const discardBtn = modal.querySelector(".discard-btn");
      const cancelBtn = modal.querySelector(".cancel-btn");
      const cleanup = () => {
        document.body.removeChild(overlay);
      };
      if (saveBtn) {
        saveBtn.addEventListener("click", () => {
          cleanup();
          resolve("save");
        });
      }
      if (discardBtn) {
        discardBtn.addEventListener("click", () => {
          cleanup();
          resolve("discard");
        });
      }
      if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
          cleanup();
          resolve("cancel");
        });
      }
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          cleanup();
          resolve("cancel");
        }
      });
    });
  }
  function makeDraggable(element) {
    const header = element.querySelector(".guard-header");
    if (!header) return;
    let startX, startY, startLeft, startTop;
    header.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(window.getComputedStyle(element).left, 10);
      startTop = parseInt(window.getComputedStyle(element).top, 10);
      const onMouseMove = (e2) => {
        const deltaX = e2.clientX - startX;
        const deltaY = e2.clientY - startY;
        element.style.left = `${startLeft + deltaX}px`;
        element.style.top = `${startTop + deltaY}px`;
      };
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  // src/log_window/log-window.js
  init_logger();
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
  function getSection(section) {
    if (currentTranslations[section]) {
      return currentTranslations[section];
    }
    console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${section}'`);
    return {};
  }
  initializeLanguage();

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

  // src/guard/index.js
  init_timing();

  // src/guard/overlay.js
  init_logger();
  init_config();
  var { setTimeout: setTimeout2, Request: Request2, Response, createImageBitmap, OffscreenCanvas } = window;
  var GuardOverlay = class {
    constructor() {
      this.isEnabled = false;
      this.displayEnabled = false;
      this.protectionArea = null;
      this.originalFetch = null;
      this.isIntercepting = false;
      this.TILE_SIZE = 1e3;
    }
    initialize() {
      try {
        log("\u2705 Overlay de protecci\xF3n inicializado");
        return true;
      } catch (error) {
        log("\u274C Error inicializando overlay:", error);
        return false;
      }
    }
    showProtectionArea(area) {
      this.protectionArea = area;
      this.isEnabled = true;
      this.startFetchInterception();
      log(`\u{1F6E1}\uFE0F Mostrando \xE1rea de protecci\xF3n: (${area.x1},${area.y1}) a (${area.x2},${area.y2})`);
    }
    hideProtectionArea() {
      this.isEnabled = false;
      this.stopFetchInterception();
      log("\u{1F50D} Ocultando \xE1rea de protecci\xF3n");
    }
    // Nuevo: mostrar/ocultar modo Display
    showDisplay(area) {
      this.displayEnabled = true;
      this.showProtectionArea(area);
      log("\u{1F5BC}\uFE0F Display activado");
    }
    hideDisplay() {
      this.displayEnabled = false;
      this.hideProtectionArea();
      log("\u{1F5BC}\uFE0F Display desactivado");
    }
    // === SISTEMA DE INTERCEPCIÓN DE FETCH ===
    startFetchInterception() {
      if (this.isIntercepting) return;
      this.originalFetch = window.fetch;
      this.isIntercepting = true;
      window.fetch = async (...args) => {
        var _a;
        const response = await this.originalFetch.apply(window, args);
        const cloned = response.clone();
        const endpointName = (args[0] instanceof Request2 ? (_a = args[0]) == null ? void 0 : _a.url : args[0]) || "ignore";
        const contentType = cloned.headers.get("content-type") || "";
        if (endpointName.includes("tiles") || endpointName.includes("tile")) {
          log(`\u{1F50D} TILE REQUEST: ${endpointName} | ContentType: ${contentType}`);
        }
        if (contentType.includes("image/") && (endpointName.includes("/tiles/") || endpointName.includes("/tile/")) && !endpointName.includes("openfreemap") && !endpointName.includes("maps")) {
          log(`\u{1F4E1} Interceptando tile: ${endpointName}`);
          try {
            const blob = await cloned.blob();
            const processedBlob = await this.drawProtectionOnTile(blob, endpointName);
            return new Response(processedBlob, {
              headers: cloned.headers,
              status: cloned.status,
              statusText: cloned.statusText
            });
          } catch (error) {
            log("\u274C Error procesando tile:", error);
            return response;
          }
        }
        return response;
      };
      log("\u{1F50D} Intercepci\xF3n de tiles iniciada para overlay de protecci\xF3n");
    }
    stopFetchInterception() {
      if (!this.isIntercepting || !this.originalFetch) return;
      window.fetch = this.originalFetch;
      this.isIntercepting = false;
      log("\u23F9\uFE0F Intercepci\xF3n de tiles detenida");
    }
    // === PROCESAMIENTO DE TILES ===
    async drawProtectionOnTile(tileBlob, endpointUrl) {
      if (!this.isEnabled || !this.protectionArea) {
        return tileBlob;
      }
      log(`\u{1F527} Procesando tile: ${endpointUrl}`);
      let tileX, tileY;
      const urlParts = endpointUrl.split("/");
      const lastPart = urlParts[urlParts.length - 1].replace(/\.(png|jpg|jpeg|webp).*$/i, "");
      const secondLastPart = urlParts[urlParts.length - 2];
      tileY = parseInt(lastPart);
      tileX = parseInt(secondLastPart);
      if (isNaN(tileX) || isNaN(tileY)) {
        const numberMatches = endpointUrl.match(/\/(\d+)\/(\d+)(?:\/\d+)?\.(?:png|jpg|jpeg|webp)/i);
        if (numberMatches) {
          tileX = parseInt(numberMatches[1]);
          tileY = parseInt(numberMatches[2]);
        }
      }
      if (isNaN(tileX) || isNaN(tileY)) {
        log(`\u274C No se pudieron extraer coordenadas de: ${endpointUrl}`);
        return tileBlob;
      }
      log(`\u{1F4CD} Coordenadas extra\xEDdas: tile(${tileX}, ${tileY})`);
      if (!this.tileIntersectsProtectionArea(tileX, tileY)) {
        log(`\u27A1\uFE0F Tile ${tileX},${tileY} no intersecta con \xE1rea de protecci\xF3n`);
        return tileBlob;
      }
      log(`\u{1F3AF} Tile ${tileX},${tileY} INTERSECTA con \xE1rea de protecci\xF3n - aplicando overlay`);
      const tileBitmap = await createImageBitmap(tileBlob);
      const canvas = new OffscreenCanvas(tileBitmap.width, tileBitmap.height);
      const context = canvas.getContext("2d");
      context.imageSmoothingEnabled = false;
      context.drawImage(tileBitmap, 0, 0);
      this.drawProtectionOverlay(context, tileX, tileY, tileBitmap.width, tileBitmap.height);
      const result = await canvas.convertToBlob({ type: "image/png" });
      log(`\u2705 Tile ${tileX},${tileY} procesado con overlay`);
      return result;
    }
    tileIntersectsProtectionArea(tileX, tileY) {
      if (!this.protectionArea) return false;
      const { x1, y1, x2, y2 } = this.protectionArea;
      const tileStartX = tileX * this.TILE_SIZE;
      const tileEndX = tileStartX + this.TILE_SIZE;
      const tileStartY = tileY * this.TILE_SIZE;
      const tileEndY = tileStartY + this.TILE_SIZE;
      log(`\u{1F50D} Verificando intersecci\xF3n:`);
      log(`   Tile ${tileX},${tileY}: (${tileStartX}-${tileEndX}, ${tileStartY}-${tileEndY})`);
      log(`   \xC1rea protecci\xF3n: (${x1}-${x2}, ${y1}-${y2})`);
      const intersects = !(x2 < tileStartX || x1 > tileEndX || y2 < tileStartY || y1 > tileEndY);
      log(`   \u{1F3AF} Intersecta: ${intersects}`);
      return intersects;
    }
    drawProtectionOverlay(context, tileX, tileY, tileWidth, tileHeight) {
      var _a;
      if (!this.protectionArea) return;
      const { x1, y1, x2, y2 } = this.protectionArea;
      const tileStartX = tileX * this.TILE_SIZE;
      const tileStartY = tileY * this.TILE_SIZE;
      const localX1 = Math.max(0, x1 - tileStartX);
      const localY1 = Math.max(0, y1 - tileStartY);
      const localX2 = Math.min(this.TILE_SIZE, x2 - tileStartX);
      const localY2 = Math.min(this.TILE_SIZE, y2 - tileStartY);
      if (localX1 >= localX2 || localY1 >= localY2) return;
      const scaleX = tileWidth / this.TILE_SIZE;
      const scaleY = tileHeight / this.TILE_SIZE;
      const renderX1 = localX1 * scaleX;
      const renderY1 = localY1 * scaleY;
      const renderWidth = (localX2 - localX1) * scaleX;
      const renderHeight = (localY2 - localY1) * scaleY;
      log(`\u{1F3A8} Dibujando overlay en tile ${tileX},${tileY}:`);
      log(`   Local: (${localX1},${localY1}) a (${localX2},${localY2})`);
      log(`   Render: (${renderX1},${renderY1}) tama\xF1o: ${renderWidth}x${renderHeight}`);
      log(`   Scale: ${scaleX} x ${scaleY}, TileSize: ${tileWidth}x${tileHeight}`);
      context.save();
      if (this.displayEnabled) {
        context.globalCompositeOperation = "difference";
        context.fillStyle = "white";
        context.fillRect(renderX1, renderY1, renderWidth, renderHeight);
        context.globalCompositeOperation = "source-over";
        if (((_a = guardState) == null ? void 0 : _a.changes) && guardState.changes.size > 0) {
          context.fillStyle = "rgba(255, 0, 0, 0.9)";
          for (const [_key, change] of guardState.changes) {
            const orig = change.original;
            if (!orig) continue;
            if (orig.tileX !== tileX || orig.tileY !== tileY) continue;
            if (orig.localX < localX1 || orig.localX >= localX2 || orig.localY < localY1 || orig.localY >= localY2) continue;
            const px = orig.localX * scaleX;
            const py = orig.localY * scaleY;
            context.fillRect(px, py, Math.max(1, scaleX), Math.max(1, scaleY));
          }
        }
        context.strokeStyle = "rgba(255, 255, 255, 0.9)";
        context.lineWidth = Math.max(1, 1.5 * Math.max(scaleX, scaleY));
        context.strokeRect(renderX1, renderY1, renderWidth, renderHeight);
      } else {
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(renderX1, renderY1, renderWidth, renderHeight);
        context.strokeStyle = "rgba(255, 0, 0, 1.0)";
        context.lineWidth = Math.max(1, 1.5 * Math.max(scaleX, scaleY));
        context.strokeRect(renderX1, renderY1, renderWidth, renderHeight);
        context.strokeStyle = "rgba(255, 255, 0, 0.8)";
        context.lineWidth = Math.max(0.5, 1 * Math.max(scaleX, scaleY));
        for (let i = 0; i <= renderWidth; i += 10 * scaleX) {
          context.beginPath();
          context.moveTo(renderX1 + i, renderY1);
          context.lineTo(renderX1 + i, renderY1 + renderHeight);
          context.stroke();
        }
        for (let i = 0; i <= renderHeight; i += 10 * scaleY) {
          context.beginPath();
          context.moveTo(renderX1, renderY1 + i);
          context.lineTo(renderX1 + renderWidth, renderY1 + i);
          context.stroke();
        }
      }
      context.restore();
      log(`\u2705 Overlay dibujado en tile ${tileX},${tileY}`);
    }
    updateArea(newArea) {
      this.protectionArea = newArea;
    }
    toggle() {
      if (this.isEnabled) {
        this.hideProtectionArea();
      } else if (this.protectionArea) {
        this.showProtectionArea(this.protectionArea);
      }
    }
    destroy() {
      this.stopFetchInterception();
      this.protectionArea = null;
      this.isEnabled = false;
      this.displayEnabled = false;
      log("\u{1F5D1}\uFE0F Overlay destruido");
    }
    // Métodos compatibles con el sistema anterior
    handleViewportChange() {
    }
  };
  var guardOverlay = new GuardOverlay();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout2(() => guardOverlay.initialize(), 1e3);
    });
  } else {
    setTimeout2(() => guardOverlay.initialize(), 1e3);
  }

  // src/guard/index.js
  var { setInterval, clearInterval } = window;
  async function runGuard() {
    log("\u{1F6E1}\uFE0F Iniciando WPlace Auto-Guard");
    initializeLanguage();
    if (!checkExistingBots()) {
      return;
    }
    window.__wplaceBot = {
      ...window.__wplaceBot,
      guardRunning: true
    };
    try {
      const texts = getSection("guard");
      guardState.ui = createGuardUI(texts);
      setupEventListeners();
      async function tryAutoInit() {
        log("\u{1F916} Intentando auto-inicio del Guard...");
        guardState.ui.updateStatus(t("guard.paletteNotFound"), "info");
        if (isPaletteOpen()) {
          log("\u{1F3A8} Paleta parece abierta. Validando colores...");
          const colorsNow = detectAvailableColors();
          if (colorsNow.length > 0) {
            guardState.ui.updateStatus(t("guard.paletteDetected"), "success");
            return true;
          }
          log('\u26A0\uFE0F Paleta "abierta" pero sin colores detectados. Intentando presionar Paint...');
        }
        log("\u{1F50D} Buscando bot\xF3n Paint...");
        guardState.ui.updateStatus(t("guard.clickingPaintButton"), "info");
        if (findAndClickPaintButton()) {
          log("\u{1F446} Bot\xF3n Paint encontrado y presionado");
          await sleep2(3e3);
          const colorsAfter = detectAvailableColors();
          if (colorsAfter.length > 0) {
            log("\u2705 Colores detectados tras presionar Paint");
            guardState.ui.updateStatus(t("guard.paletteDetected"), "success");
            return true;
          }
          if (isPaletteOpen()) {
            log("\u2705 Paleta abierta, pero sin colores accesibles a\xFAn");
          } else {
            log("\u274C La paleta no se abri\xF3 despu\xE9s de hacer clic");
          }
        } else {
          log("\u274C Bot\xF3n Paint no encontrado");
        }
        guardState.ui.updateStatus(t("guard.autoInitFailed"), "warning");
        return false;
      }
      setTimeout(async () => {
        try {
          guardState.ui.updateStatus(t("guard.autoInitializing"), "info");
          log("\u{1F916} Intentando auto-inicio...");
          const autoInitSuccess = await tryAutoInit();
          if (autoInitSuccess) {
            guardState.ui.updateStatus(t("guard.autoInitSuccess"), "success");
            log("\u2705 Auto-inicio exitoso");
            guardState.ui.setInitButtonVisible(false);
            const initResult = await initializeGuard(true);
            if (initResult) {
              log("\u{1F680} Guard-BOT auto-iniciado completamente");
            }
          } else {
            guardState.ui.updateStatus(t("guard.autoInitFailed"), "warning");
            log("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual");
            guardState.ui.setInitButtonVisible(true);
          }
        } catch (error) {
          log("\u274C Error en auto-inicio:", error);
          guardState.ui.updateStatus(t("guard.manualInitRequired"), "warning");
        }
      }, 1e3);
      window.addEventListener("beforeunload", () => {
        stopGuard();
        if (window.__wplaceBot) {
          window.__wplaceBot.guardRunning = false;
        }
      });
      log("\u2705 Auto-Guard cargado correctamente");
    } catch (error) {
      log("\u274C Error inicializando Auto-Guard:", error);
      if (window.__wplaceBot) {
        window.__wplaceBot.guardRunning = false;
      }
      throw error;
    }
  }
  function checkExistingBots() {
    var _a, _b;
    if ((_a = window.__wplaceBot) == null ? void 0 : _a.imageRunning) {
      alert("Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Guard.");
      return false;
    }
    if ((_b = window.__wplaceBot) == null ? void 0 : _b.farmRunning) {
      alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Guard.");
      return false;
    }
    return true;
  }
  function setupEventListeners() {
    const { elements } = guardState.ui;
    elements.closeBtn.addEventListener("click", () => {
      stopGuard();
      guardState.ui.destroy();
      if (window.__wplaceBot) {
        window.__wplaceBot.guardRunning = false;
      }
    });
    elements.initBtn.addEventListener("click", () => initializeGuard());
    elements.selectAreaBtn.addEventListener("click", selectAreaStepByStep);
    elements.loadAreaBtn.addEventListener("click", () => {
      elements.areaFileInput.click();
    });
    elements.areaFileInput.addEventListener("change", async () => {
      if (elements.areaFileInput.files.length > 0) {
        const result = await loadProgress(elements.areaFileInput.files[0]);
        if (result.success) {
          guardState.ui.updateStatus(`\u2705 Protecci\xF3n cargada: ${result.protectedPixels} p\xEDxeles protegidos`, "success");
          log(`\u2705 \xC1rea de protecci\xF3n cargada desde archivo`);
        } else {
          guardState.ui.updateStatus(`\u274C Error al cargar protecci\xF3n: ${result.error}`, "error");
          log(`\u274C Error cargando archivo: ${result.error}`);
        }
      }
    });
    elements.startBtn.addEventListener("click", startGuard);
    elements.stopBtn.addEventListener("click", async () => {
      guardState.running = false;
      guardState.loopId = null;
      guardState.ui.setRunningState(false);
      guardState.ui.updateStatus("\u23F9\uFE0F Protecci\xF3n detenida", "warning");
      if (guardState.checkInterval) {
        clearInterval(guardState.checkInterval);
        guardState.checkInterval = null;
      }
    });
    let logWindow = null;
    elements.logWindowBtn.addEventListener("click", () => {
      if (!logWindow) {
        logWindow = createLogWindow("guard");
        logWindow.show();
      } else {
        logWindow.toggle();
      }
    });
    elements.repositionBtn.addEventListener("click", () => startRepositioning());
    elements.saveBtn.addEventListener("click", async () => {
      if (!hasProgress()) {
        guardState.ui.updateStatus("\u274C No hay \xE1rea protegida para guardar", "error");
        return;
      }
      const splitConfirm = await showConfirmDialog(
        '\xBFDeseas dividir el \xE1rea protegida en partes para m\xFAltiples usuarios?<br><br><label for="splitCountInput">N\xFAmero de partes (1 = sin dividir):</label><br><input type="number" id="splitCountInput" min="1" max="20" value="1" style="margin: 5px 0; padding: 5px; width: 100px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db;">',
        "Opciones de Guardado",
        {
          save: "Guardar",
          cancel: "Cancelar"
        }
      );
      if (splitConfirm === "save") {
        const splitInput = document.querySelector("#splitCountInput");
        const splitCount = parseInt(splitInput == null ? void 0 : splitInput.value) || 1;
        const result = await saveProgress(null, splitCount);
        if (result.success) {
          guardState.ui.updateStatus(`\u2705 Protecci\xF3n guardada${splitCount > 1 ? ` (dividida en ${splitCount} partes)` : ""}`, "success");
        } else {
          guardState.ui.updateStatus(`\u274C Error al guardar: ${result.error}`, "error");
        }
      }
    });
    elements.pixelsPerBatchInput.addEventListener("change", (e) => {
      guardState.pixelsPerBatch = Math.max(1, Math.min(50, parseInt(e.target.value) || 10));
      e.target.value = guardState.pixelsPerBatch;
    });
    elements.minChargesInput.addEventListener("change", (e) => {
      guardState.minChargesToWait = Math.max(1, Math.min(100, parseInt(e.target.value) || 20));
      e.target.value = guardState.minChargesToWait;
    });
    elements.protectionPatternSelect.addEventListener("change", (e) => {
      guardState.protectionPattern = e.target.value;
      log(`\u{1F3AF} Patr\xF3n de protecci\xF3n cambiado a: ${e.target.value}`);
    });
    elements.colorComparisonSelect.addEventListener("change", (e) => {
      guardState.config.colorComparisonMethod = e.target.value;
      log(`\u{1F3A8} M\xE9todo de comparaci\xF3n de color cambiado a: ${e.target.value}`);
    });
    elements.pixelsPerBatchInput.value = guardState.pixelsPerBatch;
    elements.minChargesInput.value = guardState.minChargesToWait;
    elements.protectionPatternSelect.value = guardState.protectionPattern;
    elements.colorComparisonSelect.value = guardState.config.colorComparisonMethod;
  }
  async function initializeGuard(isAutoInit = false) {
    var _a;
    try {
      guardState.ui.updateStatus(t("guard.checkingColors"), "info");
      let colors = detectAvailableColors();
      if (colors.length === 0) {
        log("\u26A0\uFE0F 0 colores detectados. Intentando abrir paleta (fallback)...");
        guardState.ui.updateStatus(t("guard.clickingPaintButton"), "info");
        if (findAndClickPaintButton()) {
          await sleep2(2500);
          colors = detectAvailableColors();
        }
      }
      if (colors.length === 0) {
        guardState.ui.updateStatus(t("guard.noColorsFound"), "error");
        return false;
      }
      guardState.availableColors = colors;
      guardState.colorsChecked = true;
      const session = await getSession();
      if (session.success) {
        guardState.currentCharges = session.data.charges;
        guardState.maxCharges = session.data.maxCharges;
        guardState.ui.updateStats({ charges: Math.floor(guardState.currentCharges) });
        log(`\u{1F464} Usuario: ${((_a = session.data.user) == null ? void 0 : _a.name) || "An\xF3nimo"} - Cargas: ${guardState.currentCharges}`);
      }
      guardState.initialized = true;
      guardState.ui.updateStatus(t("guard.colorsFound", { count: colors.length }), "success");
      guardState.ui.showAreaSection();
      if (!isAutoInit) {
        log(`\u2705 ${colors.length} colores disponibles detectados`);
      }
      guardState.ui.setInitialized(true);
      return true;
    } catch (error) {
      log("\u274C Error inicializando:", error);
      guardState.ui.updateStatus(t("guard.initError"), "error");
      return false;
    }
  }
  var originalFetch = window.fetch;
  async function selectAreaStepByStep() {
    log("\u{1F3AF} Iniciando selecci\xF3n paso a paso del \xE1rea");
    let upperLeftCorner = null;
    let lowerRightCorner = null;
    let selectionPhase = "upperLeft";
    let positionCaptured = false;
    const restoreFetch = () => {
      if (window.fetch !== originalFetch) {
        window.fetch = originalFetch;
        log("\u{1F504} Fetch original restaurado");
      }
    };
    const setupFetchInterception = () => {
      window.fetch = async (url, options) => {
        if (!positionCaptured && typeof url === "string" && url.includes("/s0/pixel/") && options && options.method === "POST") {
          try {
            log(`\u{1F3AF} Interceptando request de pintado: ${url}`);
            const response = await originalFetch(url, options);
            if (response.ok && options.body) {
              let bodyData;
              try {
                bodyData = JSON.parse(options.body);
              } catch (parseError) {
                log("Error parseando body del request:", parseError);
                return response;
              }
              if (bodyData.coords && Array.isArray(bodyData.coords) && bodyData.coords.length >= 2) {
                const localX = bodyData.coords[0];
                const localY = bodyData.coords[1];
                const tileMatch = url.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);
                if (tileMatch) {
                  const tileX = parseInt(tileMatch[1]);
                  const tileY = parseInt(tileMatch[2]);
                  const globalX = tileX * GUARD_DEFAULTS.TILE_SIZE + localX;
                  const globalY = tileY * GUARD_DEFAULTS.TILE_SIZE + localY;
                  if (selectionPhase === "upperLeft") {
                    upperLeftCorner = { x: globalX, y: globalY };
                    guardState.ui.updateCoordinates({ x1: globalX, y1: globalY });
                    guardState.ui.updateStatus(t("guard.upperLeftCaptured", { x: globalX, y: globalY }), "success");
                    log(`\u2705 Esquina superior izquierda capturada: (${globalX}, ${globalY})`);
                    selectionPhase = "lowerRight";
                    setTimeout(() => {
                      if (selectionPhase === "lowerRight") {
                        guardState.ui.updateStatus(t("guard.selectLowerRight"), "info");
                      }
                    }, 1500);
                  } else if (selectionPhase === "lowerRight") {
                    lowerRightCorner = { x: globalX, y: globalY };
                    guardState.ui.updateCoordinates({ x2: globalX, y2: globalY });
                    guardState.ui.updateStatus(t("guard.lowerRightCaptured", { x: globalX, y: globalY }), "success");
                    log(`\u2705 Esquina inferior derecha capturada: (${globalX}, ${globalY})`);
                    positionCaptured = true;
                    restoreFetch();
                    if (upperLeftCorner.x >= lowerRightCorner.x || upperLeftCorner.y >= lowerRightCorner.y) {
                      guardState.ui.updateStatus(t("guard.invalidArea"), "error");
                      return response;
                    }
                    setTimeout(async () => {
                      await captureAreaFromCoordinates(upperLeftCorner, lowerRightCorner);
                    }, 1e3);
                  }
                }
              }
            }
            return response;
          } catch (error) {
            log("\u274C Error interceptando pixel:", error);
            restoreFetch();
            return originalFetch(url, options);
          }
        }
        return originalFetch(url, options);
      };
    };
    setupFetchInterception();
    guardState.ui.updateStatus(t("guard.selectUpperLeft"), "info");
    setTimeout(() => {
      if (!positionCaptured) {
        restoreFetch();
        guardState.ui.updateStatus(t("guard.selectionTimeout"), "error");
        log("\u23F0 Timeout en selecci\xF3n de \xE1rea");
      }
    }, 12e4);
  }
  async function captureAreaFromCoordinates(upperLeft, lowerRight) {
    try {
      const area = {
        x1: upperLeft.x,
        y1: upperLeft.y,
        x2: lowerRight.x,
        y2: lowerRight.y
      };
      guardState.ui.updateStatus(t("guard.capturingArea"), "info");
      const pixelMap = await analyzeAreaPixels(area, { allowVirtual: true });
      guardState.protectionArea = area;
      guardState.originalPixels = pixelMap;
      guardState.changes.clear();
      const isVirtual = pixelMap.size > 0 && Array.from(pixelMap.values()).every((pixel) => pixel.colorId === 5 && pixel.r === 255 && pixel.g === 255 && pixel.b === 255);
      guardState.ui.updateProgress(pixelMap.size, 0, isVirtual);
      guardState.ui.updateStatus(t("guard.areaCaptured", { count: pixelMap.size }), "success");
      guardState.ui.enableStartBtn();
      log(`\u2705 \xC1rea capturada: ${pixelMap.size} p\xEDxeles protegidos`);
    } catch (error) {
      log("\u274C Error capturando \xE1rea:", error);
      guardState.ui.updateStatus(t("guard.captureError", { error: error.message }), "error");
    }
  }
  async function startGuard() {
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      guardState.ui.updateStatus(t("guard.captureFirst"), "error");
      return;
    }
    guardState.running = true;
    guardState.ui.setRunningState(true);
    guardState.ui.updateStatus(t("guard.protectionStarted"), "success");
    log("\u{1F6E1}\uFE0F Iniciando protecci\xF3n del \xE1rea");
    guardState.checkInterval = setInterval(checkForChanges, GUARD_DEFAULTS.CHECK_INTERVAL);
    startChargeMonitoring();
    await checkForChanges();
  }
  function stopGuard() {
    guardState.running = false;
    if (guardState.checkInterval) {
      clearInterval(guardState.checkInterval);
      guardState.checkInterval = null;
    }
    stopChargeMonitoring();
    if (guardState.ui) {
      guardState.ui.setRunningState(false);
      guardState.ui.updateStatus(t("guard.protectionStopped"), "warning");
    }
    log("\u23F9\uFE0F Protecci\xF3n detenida");
  }
  var repositionState = {
    isRepositioning: false,
    originalPixels: null,
    originalArea: null,
    overlayEnabled: false
  };
  async function startRepositioning() {
    if (!guardState.protectionArea || !guardState.originalPixels || guardState.originalPixels.size === 0) {
      guardState.ui.updateStatus("\u274C No hay \xE1rea protegida para reposicionar", "error");
      log("\u274C No hay \xE1rea capturada para reposicionar");
      return;
    }
    log("\u{1F4CD} Iniciando reposicionamiento del \xE1rea protegida...");
    repositionState.originalPixels = new Map(guardState.originalPixels);
    repositionState.originalArea = { ...guardState.protectionArea };
    repositionState.isRepositioning = true;
    const statusDiv = document.createElement("div");
    statusDiv.id = "repositionStatus";
    statusDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #1f2937;
    color: #fff;
    padding: 15px 20px;
    border-radius: 8px;
    border: 2px solid #8b5cf6;
    z-index: 100003;
    font-family: 'Segoe UI', Roboto, sans-serif;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
    statusDiv.innerHTML = `
    <div style="text-align: center;">
      <div style="font-weight: bold; margin-bottom: 8px;">\u{1F4CD} Reposicionamiento Activo</div>
      <div style="font-size: 14px; color: #cbd5e0;">Pinta un p\xEDxel en la nueva esquina superior izquierda</div>
    </div>
  `;
    document.body.appendChild(statusDiv);
    await captureNewPosition(statusDiv);
  }
  async function captureNewPosition(statusDiv) {
    return new Promise((resolve) => {
      let positionCaptured = false;
      const originalFetch2 = window.fetch;
      window.fetch = async function(...args) {
        var _a, _b, _c;
        const response = await originalFetch2.apply(this, args);
        if (!repositionState.isRepositioning || positionCaptured) {
          return response;
        }
        const url = ((_a = args[0]) == null ? void 0 : _a.url) || args[0];
        if (url && url.includes("/s0/pixel/") && ((_b = args[1]) == null ? void 0 : _b.method) === "POST") {
          try {
            log("\u{1F50D} Request interceptado:", url);
            const urlMatch = url.match(/\/s0\/pixel\/(\d+)\/(\d+)/);
            if (urlMatch) {
              const tileX = parseInt(urlMatch[1]);
              const tileY = parseInt(urlMatch[2]);
              const requestBody = (_c = args[1]) == null ? void 0 : _c.body;
              log("\u{1F50D} Request body:", requestBody);
              if (requestBody) {
                const bodyData = JSON.parse(requestBody);
                log("\u{1F50D} Body data:", bodyData);
                const coords = bodyData.coords;
                if (coords && coords.length > 0) {
                  positionCaptured = true;
                  log("\u{1F50D} Coords array structure:", coords, "Length:", coords.length);
                  let relativeX, relativeY;
                  if (coords.length >= 2 && typeof coords[0] === "number" && typeof coords[1] === "number") {
                    relativeX = coords[0];
                    relativeY = coords[1];
                    log("\u{1F50D} Coordenadas como n\xFAmeros separados:", relativeX, relativeY);
                  } else if (Array.isArray(coords[0])) {
                    relativeX = coords[0][0];
                    relativeY = coords[0][1];
                    log("\u{1F50D} Coordenadas como array anidado:", relativeX, relativeY);
                  } else if (typeof coords[0] === "object" && coords[0].x !== void 0) {
                    relativeX = coords[0].x;
                    relativeY = coords[0].y;
                    log("\u{1F50D} Coordenadas como objeto:", relativeX, relativeY);
                  } else {
                    log("\u274C Formato de coordenadas no reconocido:", coords);
                    return;
                  }
                  const newX = tileX * 1e3 + relativeX;
                  const newY = tileY * 1e3 + relativeY;
                  log(`\u{1F4CD} Nueva posici\xF3n capturada: (${newX}, ${newY})`);
                  log(`\u{1F4D0} Tile: (${tileX}, ${tileY}), Relativa: (${relativeX}, ${relativeY})`);
                  window.fetch = originalFetch2;
                  await repositionArea(newX, newY, statusDiv);
                  resolve();
                }
              }
            }
          } catch (error) {
            log("\u274C Error capturando nueva posici\xF3n:", error);
          }
        }
        return response;
      };
      setTimeout(() => {
        if (!positionCaptured) {
          window.fetch = originalFetch2;
          repositionState.isRepositioning = false;
          statusDiv.remove();
          log("\u23F0 Timeout en captura de nueva posici\xF3n");
          resolve();
        }
      }, 3e4);
    });
  }
  async function repositionArea(newX, newY, statusDiv) {
    const originalArea = repositionState.originalArea;
    const offsetX = newX - originalArea.x1;
    const offsetY = newY - originalArea.y1;
    log(`\u{1F4D0} Calculando offset: (${offsetX}, ${offsetY})`);
    const newArea = {
      x1: originalArea.x1 + offsetX,
      y1: originalArea.y1 + offsetY,
      x2: originalArea.x2 + offsetX,
      y2: originalArea.y2 + offsetY,
      tileX: Math.floor((originalArea.x1 + offsetX) / GUARD_DEFAULTS.TILE_SIZE),
      tileY: Math.floor((originalArea.y1 + offsetY) / GUARD_DEFAULTS.TILE_SIZE)
    };
    const newPixels = /* @__PURE__ */ new Map();
    repositionState.originalPixels.forEach((colorData, key) => {
      const [x, y] = key.split(",").map(Number);
      const newKey = `${x + offsetX},${y + offsetY}`;
      newPixels.set(newKey, colorData);
    });
    await showRepositionOverlay(newArea, newPixels, statusDiv);
  }
  async function showRepositionOverlay(newArea, newPixels, statusDiv) {
    repositionState.overlayEnabled = true;
    guardOverlay.showProtectionArea(newArea);
    log("\u{1F3AF} Overlay visual activado para vista previa de reposicionamiento");
    statusDiv.innerHTML = `
    <div style="text-align: center;">
      <div style="font-weight: bold; margin-bottom: 8px;">\u{1F4CD} Vista Previa de Reposicionamiento</div>
      <div style="font-size: 14px; color: #cbd5e0; margin-bottom: 8px;">Nueva \xE1rea: (${newArea.x1}, ${newArea.y1}) \u2192 (${newArea.x2}, ${newArea.y2})</div>
      <div style="font-size: 14px; color: #cbd5e0; margin-bottom: 15px;">\xBFConfirmar nueva posici\xF3n?</div>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button id="confirmReposition" style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
          \u2705 Aceptar
        </button>
        <button id="retryReposition" style="padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
          \u{1F504} Repetir
        </button>
        <button id="cancelReposition" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
          \u274C Cancelar
        </button>
      </div>
    </div>
  `;
    statusDiv.querySelector("#confirmReposition").addEventListener("click", () => {
      confirmRepositioning(newArea, newPixels, statusDiv);
    });
    statusDiv.querySelector("#retryReposition").addEventListener("click", () => {
      retryRepositioning(statusDiv);
    });
    statusDiv.querySelector("#cancelReposition").addEventListener("click", () => {
      cancelRepositioning(statusDiv);
    });
  }
  function confirmRepositioning(newArea, newPixels, statusDiv) {
    guardState.protectionArea = newArea;
    guardState.originalPixels = newPixels;
    guardState.ui.updateCoordinates({
      x1: newArea.x1,
      y1: newArea.y1,
      x2: newArea.x2,
      y2: newArea.y2
    });
    guardState.ui.updateProgress(0, newPixels.size);
    guardOverlay.hideProtectionArea();
    log("\u{1F3AF} Overlay visual desactivado tras confirmar reposicionamiento");
    cleanupRepositioning(statusDiv);
    guardState.ui.updateStatus("\u2705 \xC1rea reposicionada correctamente", "success");
    log("\u2705 Reposicionamiento confirmado");
  }
  function retryRepositioning(statusDiv) {
    guardOverlay.hideProtectionArea();
    log("\u{1F3AF} Overlay visual desactivado para reintentar reposicionamiento");
    cleanupRepositioning(statusDiv);
    startRepositioning();
  }
  function cancelRepositioning(statusDiv) {
    guardOverlay.hideProtectionArea();
    log("\u{1F3AF} Overlay visual desactivado tras cancelar reposicionamiento");
    cleanupRepositioning(statusDiv);
    guardState.ui.updateStatus("\u274C Reposicionamiento cancelado", "warning");
    log("\u274C Reposicionamiento cancelado");
  }
  function cleanupRepositioning(statusDiv) {
    repositionState.isRepositioning = false;
    repositionState.originalPixels = null;
    repositionState.originalArea = null;
    repositionState.overlayEnabled = false;
    statusDiv.remove();
  }

  // src/entries/guard.js
  (async function() {
    var _a;
    try {
      console.log("[WPA-Guard] \u{1F916} Iniciando auto-click del bot\xF3n Paint...");
      await autoClickPaintButton(3, true);
    } catch (error) {
      console.log("[WPA-Guard] \u26A0\uFE0F Error en auto-click del bot\xF3n Paint:", error);
    }
    if ((_a = window.__wplaceBot) == null ? void 0 : _a.guardRunning) {
      alert("Auto-Guard ya est\xE1 corriendo.");
    } else {
      runGuard().catch((error) => {
        console.error("[WPA-GUARD] Error en Auto-Guard:", error);
        if (window.__wplaceBot) {
          window.__wplaceBot.guardRunning = false;
        }
        alert("Auto-Guard: error inesperado. Revisa consola.");
      });
    }
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvbG9nZ2VyLmpzIiwgInNyYy9jb3JlL2h0dHAuanMiLCAic3JjL2NvcmUvdHVybnN0aWxlLmpzIiwgInNyYy9jb3JlL3dwbGFjZS1hcGkuanMiLCAic3JjL2d1YXJkL2NvbmZpZy5qcyIsICJzcmMvY29yZS90aW1pbmcuanMiLCAic3JjL2d1YXJkL3BhdHRlcm5zLmpzIiwgInNyYy9ndWFyZC9wcm9jZXNzb3IuanMiLCAic3JjL2d1YXJkL2FuYWx5c2lzLXdpbmRvdy5qcyIsICJzcmMvZ3VhcmQvaW5kZXguanMiLCAic3JjL2d1YXJkL3NhdmUtbG9hZC5qcyIsICJzcmMvZ3VhcmQvdWkuanMiLCAic3JjL2xvZ193aW5kb3cvbG9nLXdpbmRvdy5qcyIsICJzcmMvbG9jYWxlcy9lcy5qcyIsICJzcmMvbG9jYWxlcy9lbi5qcyIsICJzcmMvbG9jYWxlcy9mci5qcyIsICJzcmMvbG9jYWxlcy9ydS5qcyIsICJzcmMvbG9jYWxlcy96aC1IYW5zLmpzIiwgInNyYy9sb2NhbGVzL3poLUhhbnQuanMiLCAic3JjL2xvY2FsZXMvaW5kZXguanMiLCAic3JjL2NvcmUvZG9tLmpzIiwgInNyYy9ndWFyZC9vdmVybGF5LmpzIiwgInNyYy9lbnRyaWVzL2d1YXJkLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY29uc3QgbG9nZ2VyID0ge1xuICBkZWJ1Z0VuYWJsZWQ6IGZhbHNlLFxuICBzZXREZWJ1Zyh2KSB7IHRoaXMuZGVidWdFbmFibGVkID0gISF2OyB9LFxuICBkZWJ1ZyguLi5hKSB7IGlmICh0aGlzLmRlYnVnRW5hYmxlZCkgY29uc29sZS5kZWJ1ZyhcIltCT1RdXCIsIC4uLmEpOyB9LFxuICBpbmZvKC4uLmEpICB7IGNvbnNvbGUuaW5mbyhcIltCT1RdXCIsIC4uLmEpOyB9LFxuICB3YXJuKC4uLmEpICB7IGNvbnNvbGUud2FybihcIltCT1RdXCIsIC4uLmEpOyB9LFxuICBlcnJvciguLi5hKSB7IGNvbnNvbGUuZXJyb3IoXCJbQk9UXVwiLCAuLi5hKTsgfVxufTtcblxuLy8gRmFybS1zcGVjaWZpYyBsb2dnZXJcbmV4cG9ydCBjb25zdCBsb2cgPSAoLi4uYSkgPT4gY29uc29sZS5sb2coJ1tXUEEtVUldJywgLi4uYSk7XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5leHBvcnQgY29uc3Qgbm9vcCA9ICgpID0+IHsgLyogRnVuY2lcdTAwRjNuIHZhY1x1MDBFRGEgaW50ZW5jaW9uYWwgKi8gfTtcbmV4cG9ydCBjb25zdCBjbGFtcCA9IChuLCBhLCBiKSA9PiBNYXRoLm1heChhLCBNYXRoLm1pbihiLCBuKSk7XG4iLCAiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoV2l0aFRpbWVvdXQodXJsLCB7IHRpbWVvdXQgPSAxMDAwMCwgLi4ub3B0cyB9ID0ge30pIHtcbiAgY29uc3QgY3RybCA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgY29uc3QgaWQgPSBzZXRUaW1lb3V0KCgpID0+IGN0cmwuYWJvcnQoXCJ0aW1lb3V0XCIpLCB0aW1lb3V0KTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgc2lnbmFsOiBjdHJsLnNpZ25hbCwgLi4ub3B0cyB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGZpbmFsbHkge1xuICAgIGNsZWFyVGltZW91dChpZCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXIuanNcIjtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVFVSTlNUSUxFIFRPS0VOIE1BTkFHRU1FTlRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gT3B0aW1pemVkIFR1cm5zdGlsZSB0b2tlbiBoYW5kbGluZyB3aXRoIGNhY2hpbmcgYW5kIHJldHJ5IGxvZ2ljXG5sZXQgdHVybnN0aWxlVG9rZW4gPSBudWxsO1xubGV0IHRva2VuRXhwaXJ5VGltZSA9IDA7XG5sZXQgdG9rZW5HZW5lcmF0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xubGV0IF9yZXNvbHZlVG9rZW4gPSBudWxsO1xubGV0IHRva2VuUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IF9yZXNvbHZlVG9rZW4gPSByZXNvbHZlIH0pO1xuY29uc3QgVE9LRU5fTElGRVRJTUUgPSAyNDAwMDA7IC8vIDQgbWludXRlcyAodG9rZW5zIHR5cGljYWxseSBsYXN0IDUgbWluLCB1c2UgNCBmb3Igc2FmZXR5KVxuXG4vLyBUdXJuc3RpbGUgd2lkZ2V0IG1hbmFnZW1lbnQgKHJlcGxpY2F0ZWQgZnJvbSBleGFtcGxlKVxubGV0IF90dXJuc3RpbGVXaWRnZXRJZCA9IG51bGw7XG5sZXQgX3R1cm5zdGlsZUNvbnRhaW5lciA9IG51bGw7XG5sZXQgX3R1cm5zdGlsZU92ZXJsYXkgPSBudWxsO1xubGV0IF9sYXN0U2l0ZWtleSA9IG51bGw7XG5sZXQgX2NhY2hlZFNpdGVrZXkgPSBudWxsO1xuXG5mdW5jdGlvbiBzZXRUdXJuc3RpbGVUb2tlbih0KSB7XG4gIGlmIChfcmVzb2x2ZVRva2VuKSB7XG4gICAgX3Jlc29sdmVUb2tlbih0KTtcbiAgICBfcmVzb2x2ZVRva2VuID0gbnVsbDtcbiAgfVxuICB0dXJuc3RpbGVUb2tlbiA9IHQ7XG4gIHRva2VuRXhwaXJ5VGltZSA9IERhdGUubm93KCkgKyBUT0tFTl9MSUZFVElNRTtcbiAgbG9nKFwiXHUyNzA1IFR1cm5zdGlsZSB0b2tlbiBzZXQgc3VjY2Vzc2Z1bGx5XCIpO1xufVxuXG5mdW5jdGlvbiBpc1Rva2VuVmFsaWQoKSB7XG4gIHJldHVybiB0dXJuc3RpbGVUb2tlbiAmJiBEYXRlLm5vdygpIDwgdG9rZW5FeHBpcnlUaW1lO1xufVxuXG4vLyBGb3JjZSB0b2tlbiBpbnZhbGlkYXRpb24gKGZvciA0MDMgZXJyb3JzKVxuZnVuY3Rpb24gaW52YWxpZGF0ZVRva2VuKCkge1xuICB0dXJuc3RpbGVUb2tlbiA9IG51bGw7XG4gIHRva2VuRXhwaXJ5VGltZSA9IDA7XG4gIGxvZyhcIlx1RDgzRFx1REREMVx1RkUwRiBUb2tlbiBpbnZhbGlkYXRlZCwgd2lsbCBmb3JjZSBmcmVzaCBnZW5lcmF0aW9uXCIpO1xufVxuXG4vLyBNYWluIHRva2VuIGZ1bmN0aW9uIC0gcmVwbGljYXRlZCBmcm9tIGV4YW1wbGVcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbnN1cmVUb2tlbihmb3JjZU5ldyA9IGZhbHNlKSB7XG4gIC8vIFJldHVybiBjYWNoZWQgdG9rZW4gaWYgc3RpbGwgdmFsaWQgYW5kIG5vdCBmb3JjaW5nIG5ld1xuICBpZiAoaXNUb2tlblZhbGlkKCkgJiYgIWZvcmNlTmV3KSB7XG4gICAgcmV0dXJuIHR1cm5zdGlsZVRva2VuO1xuICB9XG5cbiAgLy8gSWYgZm9yY2luZyBuZXcsIGludmFsaWRhdGUgY3VycmVudCB0b2tlblxuICBpZiAoZm9yY2VOZXcpIHtcbiAgICBpbnZhbGlkYXRlVG9rZW4oKTtcbiAgfVxuXG4gIC8vIEF2b2lkIG11bHRpcGxlIHNpbXVsdGFuZW91cyB0b2tlbiBnZW5lcmF0aW9uc1xuICBpZiAodG9rZW5HZW5lcmF0aW9uSW5Qcm9ncmVzcykge1xuICAgIGxvZyhcIlx1RDgzRFx1REQwNCBUb2tlbiBnZW5lcmF0aW9uIGFscmVhZHkgaW4gcHJvZ3Jlc3MsIHdhaXRpbmcuLi5cIik7XG4gICAgYXdhaXQgc2xlZXAoMjAwMCk7XG4gICAgcmV0dXJuIGlzVG9rZW5WYWxpZCgpID8gdHVybnN0aWxlVG9rZW4gOiBudWxsO1xuICB9XG5cbiAgdG9rZW5HZW5lcmF0aW9uSW5Qcm9ncmVzcyA9IHRydWU7XG4gIFxuICB0cnkge1xuICAgIGxvZyhcIlx1RDgzRFx1REQwNCBUb2tlbiBleHBpcmVkIG9yIG1pc3NpbmcsIGdlbmVyYXRpbmcgbmV3IG9uZS4uLlwiKTtcbiAgICBcbiAgICAvLyBGaXJzdCB0cnkgaW52aXNpYmxlIFR1cm5zdGlsZVxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgaGFuZGxlQ2FwdGNoYSgpO1xuICAgIGlmICh0b2tlbiAmJiB0b2tlbi5sZW5ndGggPiAyMCkge1xuICAgICAgc2V0VHVybnN0aWxlVG9rZW4odG9rZW4pO1xuICAgICAgbG9nKFwiXHUyNzA1IFRva2VuIGNhcHR1cmVkIGFuZCBjYWNoZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgICBcbiAgICAvLyBJZiBpbnZpc2libGUgZmFpbHMsIGZvcmNlIGJyb3dzZXIgYXV0b21hdGlvblxuICAgIGxvZyhcIlx1MjZBMFx1RkUwRiBJbnZpc2libGUgVHVybnN0aWxlIGZhaWxlZCwgZm9yY2luZyBicm93c2VyIGF1dG9tYXRpb24uLi5cIik7XG4gICAgY29uc3QgZmFsbGJhY2tUb2tlbiA9IGF3YWl0IGhhbmRsZUNhcHRjaGFGYWxsYmFjaygpO1xuICAgIGlmIChmYWxsYmFja1Rva2VuICYmIGZhbGxiYWNrVG9rZW4ubGVuZ3RoID4gMjApIHtcbiAgICAgIHNldFR1cm5zdGlsZVRva2VuKGZhbGxiYWNrVG9rZW4pO1xuICAgICAgbG9nKFwiXHUyNzA1IEZhbGxiYWNrIHRva2VuIGNhcHR1cmVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIHJldHVybiBmYWxsYmFja1Rva2VuO1xuICAgIH1cbiAgICBcbiAgICBsb2coXCJcdTI3NEMgQWxsIHRva2VuIGdlbmVyYXRpb24gbWV0aG9kcyBmYWlsZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZmluYWxseSB7XG4gICAgdG9rZW5HZW5lcmF0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICB9XG59XG5cbi8vIE1haW4gY2FwdGNoYSBoYW5kbGVyIC0gcmVwbGljYXRlZCBmcm9tIGV4YW1wbGVcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNhcHRjaGEoKSB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIHRyeSB7XG4gICAgLy8gVXNlIG9wdGltaXplZCB0b2tlbiBnZW5lcmF0aW9uIHdpdGggYXV0b21hdGljIHNpdGVrZXkgZGV0ZWN0aW9uXG4gICAgY29uc3Qgc2l0ZWtleSA9IGRldGVjdFNpdGVrZXkoKTtcbiAgICBsb2coXCJcdUQ4M0RcdUREMTEgR2VuZXJhdGluZyBUdXJuc3RpbGUgdG9rZW4gZm9yIHNpdGVrZXk6XCIsIHNpdGVrZXkpO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgICBsb2coJ1x1RDgzRVx1RERFRCBVQTonLCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCwgJ1BsYXRmb3JtOicsIHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdlbmVyYXRlUGFpbnRUb2tlbihzaXRla2V5KTtcbiAgICBcbiAgICBpZiAodG9rZW4gJiYgdG9rZW4ubGVuZ3RoID4gMjApIHtcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKTtcbiAgICAgIGxvZyhgXHUyNzA1IFR1cm5zdGlsZSB0b2tlbiBnZW5lcmF0ZWQgc3VjY2Vzc2Z1bGx5IGluICR7ZHVyYXRpb259bXNgKTtcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBvciBlbXB0eSB0b2tlbiByZWNlaXZlZFwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLSBzdGFydFRpbWUpO1xuICAgIGxvZyhgXHUyNzRDIFR1cm5zdGlsZSB0b2tlbiBnZW5lcmF0aW9uIGZhaWxlZCBhZnRlciAke2R1cmF0aW9ufW1zOmAsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjsgLy8gUmUtdGhyb3cgdG8gYmUgY2F1Z2h0IGJ5IGVuc3VyZVRva2VuXG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVQYWludFRva2VuKHNpdGVrZXkpIHtcbiAgcmV0dXJuIGV4ZWN1dGVUdXJuc3RpbGUoc2l0ZWtleSwgJ3BhaW50Jyk7XG59XG5cbi8vIFRVUk5TVElMRSBDT1JFIEZVTkNUSU9OUyAocmVwbGljYXRlZCBmcm9tIGV4YW1wbGUpXG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRUdXJuc3RpbGUoKSB7XG4gIC8vIElmIFR1cm5zdGlsZSBpcyBhbHJlYWR5IHByZXNlbnQsIGp1c3QgcmVzb2x2ZS5cbiAgaWYgKHdpbmRvdy50dXJuc3RpbGUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gQXZvaWQgYWRkaW5nIHRoZSBzY3JpcHQgdHdpY2VcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyY149XCJodHRwczovL2NoYWxsZW5nZXMuY2xvdWRmbGFyZS5jb20vdHVybnN0aWxlL3YwL2FwaS5qc1wiXScpKSB7XG4gICAgICBjb25zdCBjaGVja1JlYWR5ID0gKCkgPT4ge1xuICAgICAgICBpZiAod2luZG93LnR1cm5zdGlsZSkge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrUmVhZHksIDEwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gY2hlY2tSZWFkeSgpO1xuICAgIH1cbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vY2hhbGxlbmdlcy5jbG91ZGZsYXJlLmNvbS90dXJuc3RpbGUvdjAvYXBpLmpzP3JlbmRlcj1leHBsaWNpdCc7XG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2coXCJcdTI3MDUgVHVybnN0aWxlIHNjcmlwdCBsb2FkZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH07XG4gICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBsb2coXCJcdTI3NEMgRmFpbGVkIHRvIGxvYWQgVHVybnN0aWxlIHNjcmlwdFwiKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIFR1cm5zdGlsZScpKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVR1cm5zdGlsZUNvbnRhaW5lcigpIHtcbiAgaWYgKCFfdHVybnN0aWxlQ29udGFpbmVyIHx8ICFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKF90dXJuc3RpbGVDb250YWluZXIpKSB7XG4gICAgLy8gQ2xlYW4gdXAgb2xkIGNvbnRhaW5lciBpZiBpdCBleGlzdHNcbiAgICBpZiAoX3R1cm5zdGlsZUNvbnRhaW5lcikge1xuICAgICAgX3R1cm5zdGlsZUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9XG4gICAgXG4gICAgX3R1cm5zdGlsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIF90dXJuc3RpbGVDb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50O1xuICAgICAgbGVmdDogLTk5OTlweCAhaW1wb3J0YW50OyAvKiBrZWVwIG9mZi1zY3JlZW4gZm9yIGludmlzaWJsZSBtb2RlICovXG4gICAgICB0b3A6IC05OTk5cHggIWltcG9ydGFudDtcbiAgICAgIHdpZHRoOiAzMDBweCAhaW1wb3J0YW50O1xuICAgICAgaGVpZ2h0OiA2NXB4ICFpbXBvcnRhbnQ7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgb3BhY2l0eTogMCAhaW1wb3J0YW50OyAvKiBkbyBub3QgdXNlIHZpc2liaWxpdHk6aGlkZGVuIHRvIGF2b2lkIGVuZ2luZSBxdWlya3MgKi9cbiAgICAgIHotaW5kZXg6IC0xICFpbXBvcnRhbnQ7XG4gICAgYDtcbiAgICBfdHVybnN0aWxlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIF90dXJuc3RpbGVDb250YWluZXIuaWQgPSAndHVybnN0aWxlLXdpZGdldC1jb250YWluZXInO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoX3R1cm5zdGlsZUNvbnRhaW5lcik7XG4gIH1cbiAgcmV0dXJuIF90dXJuc3RpbGVDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVR1cm5zdGlsZU92ZXJsYXlDb250YWluZXIoKSB7XG4gIGlmIChfdHVybnN0aWxlT3ZlcmxheSAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKF90dXJuc3RpbGVPdmVybGF5KSkge1xuICAgIHJldHVybiBfdHVybnN0aWxlT3ZlcmxheTtcbiAgfVxuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG92ZXJsYXkuaWQgPSAndHVybnN0aWxlLW92ZXJsYXktY29udGFpbmVyJztcbiAgb3ZlcmxheS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICByaWdodDogMTZweDtcbiAgICBib3R0b206IDE2cHg7XG4gICAgd2lkdGg6IDMyMHB4O1xuICAgIG1pbi1oZWlnaHQ6IDgwcHg7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjcpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKTtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHBhZGRpbmc6IDEycHg7XG4gICAgei1pbmRleDogMTAwMDAwO1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cig2cHgpO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjQpO1xuICBgO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9ICdDbG91ZGZsYXJlIFR1cm5zdGlsZSBcdTIwMTQgcGxlYXNlIGNvbXBsZXRlIHRoZSBjaGVjayBpZiBzaG93bic7XG4gIHRpdGxlLnN0eWxlLmNzc1RleHQgPSAnZm9udDogNjAwIDEycHgvMS4zIFwiU2Vnb2UgVUlcIixzYW5zLXNlcmlmOyBtYXJnaW4tYm90dG9tOiA4cHg7IG9wYWNpdHk6IDAuOTsnO1xuICBjb25zdCB3aWRnZXRIb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHdpZGdldEhvc3QuaWQgPSAndHVybnN0aWxlLW92ZXJsYXktaG9zdCc7XG4gIHdpZGdldEhvc3Quc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDogMTAwJTsgbWluLWhlaWdodDogNzBweDsnO1xuICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBjbG9zZUJ0bi50ZXh0Q29udGVudCA9ICdIaWRlJztcbiAgY2xvc2VCdG4uc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjphYnNvbHV0ZTsgdG9wOjZweDsgcmlnaHQ6NnB4OyBmb250LXNpemU6MTFweDsgYmFja2dyb3VuZDp0cmFuc3BhcmVudDsgY29sb3I6I2ZmZjsgYm9yZGVyOjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMik7IGJvcmRlci1yYWRpdXM6NnB4OyBwYWRkaW5nOjJweCA2cHg7IGN1cnNvcjpwb2ludGVyOyc7XG4gIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3ZlcmxheS5yZW1vdmUoKSk7XG4gIG92ZXJsYXkuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBvdmVybGF5LmFwcGVuZENoaWxkKHdpZGdldEhvc3QpO1xuICBvdmVybGF5LmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcbiAgX3R1cm5zdGlsZU92ZXJsYXkgPSBvdmVybGF5O1xuICByZXR1cm4gb3ZlcmxheTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVR1cm5zdGlsZShzaXRla2V5LCBhY3Rpb24gPSAncGFpbnQnKSB7XG4gIGF3YWl0IGxvYWRUdXJuc3RpbGUoKTtcblxuICBpZiAoX3R1cm5zdGlsZVdpZGdldElkICYmIF9sYXN0U2l0ZWtleSA9PT0gc2l0ZWtleSAmJiB3aW5kb3cudHVybnN0aWxlPy5leGVjdXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxvZyhcIlx1RDgzRFx1REQwNCBSZXVzaW5nIGV4aXN0aW5nIFR1cm5zdGlsZSB3aWRnZXQuLi5cIik7XG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgIHdpbmRvdy50dXJuc3RpbGUuZXhlY3V0ZShfdHVybnN0aWxlV2lkZ2V0SWQsIHsgYWN0aW9uIH0pLFxuICAgICAgICBuZXcgUHJvbWlzZSgoXywgcmVqZWN0KSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlamVjdChuZXcgRXJyb3IoJ0V4ZWN1dGUgdGltZW91dCcpKSwgMTUwMDApKVxuICAgICAgXSk7XG4gICAgICBpZiAodG9rZW4gJiYgdG9rZW4ubGVuZ3RoID4gMjApIHtcbiAgICAgICAgbG9nKFwiXHUyNzA1IFRva2VuIGdlbmVyYXRlZCB2aWEgd2lkZ2V0IHJldXNlXCIpO1xuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2coJ1x1RDgzRFx1REQwNCBXaWRnZXQgcmV1c2UgZmFpbGVkLCB3aWxsIGNyZWF0ZSBhIGZyZXNoIHdpZGdldDonLCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaW52aXNpYmxlID0gYXdhaXQgY3JlYXRlTmV3VHVybnN0aWxlV2lkZ2V0SW52aXNpYmxlKHNpdGVrZXksIGFjdGlvbik7XG4gIGlmIChpbnZpc2libGUgJiYgaW52aXNpYmxlLmxlbmd0aCA+IDIwKSByZXR1cm4gaW52aXNpYmxlO1xuXG4gIGxvZygnXHVEODNEXHVEQzQwIEZhbGxpbmcgYmFjayB0byBpbnRlcmFjdGl2ZSBUdXJuc3RpbGUgKHZpc2libGUpLicpO1xuICByZXR1cm4gYXdhaXQgY3JlYXRlTmV3VHVybnN0aWxlV2lkZ2V0SW50ZXJhY3RpdmUoc2l0ZWtleSwgYWN0aW9uKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTmV3VHVybnN0aWxlV2lkZ2V0SW52aXNpYmxlKHNpdGVrZXksIGFjdGlvbikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKF90dXJuc3RpbGVXaWRnZXRJZCAmJiB3aW5kb3cudHVybnN0aWxlPy5yZW1vdmUpIHtcbiAgICAgICAgdHJ5IHsgd2luZG93LnR1cm5zdGlsZS5yZW1vdmUoX3R1cm5zdGlsZVdpZGdldElkKTsgfSBjYXRjaCB7IC8qIElnbm9yZSByZW1vdmFsIGVycm9ycyAqLyB9XG4gICAgICB9XG4gICAgICBjb25zdCBjb250YWluZXIgPSBlbnN1cmVUdXJuc3RpbGVDb250YWluZXIoKTtcbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgIGNvbnN0IHdpZGdldElkID0gd2luZG93LnR1cm5zdGlsZS5yZW5kZXIoY29udGFpbmVyLCB7XG4gICAgICAgIHNpdGVrZXksXG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgc2l6ZTogJ2ludmlzaWJsZScsXG4gICAgICAgIHJldHJ5OiAnYXV0bycsXG4gICAgICAgICdyZXRyeS1pbnRlcnZhbCc6IDgwMDAsXG4gICAgICAgIGNhbGxiYWNrOiAodG9rZW4pID0+IHtcbiAgICAgICAgICBsb2coJ1x1MjcwNSBJbnZpc2libGUgVHVybnN0aWxlIGNhbGxiYWNrJyk7XG4gICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgIH0sXG4gICAgICAgICdlcnJvci1jYWxsYmFjayc6ICgpID0+IHJlc29sdmUobnVsbCksXG4gICAgICAgICd0aW1lb3V0LWNhbGxiYWNrJzogKCkgPT4gcmVzb2x2ZShudWxsKSxcbiAgICAgIH0pO1xuICAgICAgX3R1cm5zdGlsZVdpZGdldElkID0gd2lkZ2V0SWQ7XG4gICAgICBfbGFzdFNpdGVrZXkgPSBzaXRla2V5O1xuICAgICAgaWYgKCF3aWRnZXRJZCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICBQcm9taXNlLnJhY2UoW1xuICAgICAgICB3aW5kb3cudHVybnN0aWxlLmV4ZWN1dGUod2lkZ2V0SWQsIHsgYWN0aW9uIH0pLFxuICAgICAgICBuZXcgUHJvbWlzZSgoXywgcmVqZWN0KSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlamVjdChuZXcgRXJyb3IoJ0ludmlzaWJsZSBleGVjdXRlIHRpbWVvdXQnKSksIDEyMDAwKSlcbiAgICAgIF0pLnRoZW4ocmVzb2x2ZSkuY2F0Y2goKCkgPT4gcmVzb2x2ZShudWxsKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nKCdJbnZpc2libGUgVHVybnN0aWxlIGZhaWxlZDonLCBlKTtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTmV3VHVybnN0aWxlV2lkZ2V0SW50ZXJhY3RpdmUoc2l0ZWtleSwgYWN0aW9uKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfdHVybnN0aWxlV2lkZ2V0SWQgJiYgd2luZG93LnR1cm5zdGlsZT8ucmVtb3ZlKSB7XG4gICAgICAgIHRyeSB7IHdpbmRvdy50dXJuc3RpbGUucmVtb3ZlKF90dXJuc3RpbGVXaWRnZXRJZCk7IH0gY2F0Y2ggeyAvKiBJZ25vcmUgcmVtb3ZhbCBlcnJvcnMgKi8gfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvdmVybGF5ID0gZW5zdXJlVHVybnN0aWxlT3ZlcmxheUNvbnRhaW5lcigpO1xuICAgICAgY29uc3QgaG9zdCA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3R1cm5zdGlsZS1vdmVybGF5LWhvc3QnKTtcbiAgICAgIGhvc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsb2coJ1x1MjNGMCBJbnRlcmFjdGl2ZSBUdXJuc3RpbGUgdGltZWQgb3V0Jyk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCAxMjAwMDApOyAvLyBnaXZlIHVzZXJzIHVwIHRvIDIgbWludXRlc1xuXG4gICAgICBjb25zdCB3aWRnZXRJZCA9IHdpbmRvdy50dXJuc3RpbGUucmVuZGVyKGhvc3QsIHtcbiAgICAgICAgc2l0ZWtleSxcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBzaXplOiAnbm9ybWFsJyxcbiAgICAgICAgcmV0cnk6ICdhdXRvJyxcbiAgICAgICAgJ3JldHJ5LWludGVydmFsJzogODAwMCxcbiAgICAgICAgY2FsbGJhY2s6ICh0b2tlbikgPT4ge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICAgIC8vIEhpZGUgb3ZlcmxheSBhZnRlciBzdWNjZXNzXG4gICAgICAgICAgdHJ5IHsgb3ZlcmxheS5yZW1vdmUoKTsgfSBjYXRjaCB7IC8qIElnbm9yZSByZW1vdmFsIGVycm9ycyAqLyB9XG4gICAgICAgICAgbG9nKCdcdTI3MDUgSW50ZXJhY3RpdmUgVHVybnN0aWxlIHNvbHZlZCcpO1xuICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICB9LFxuICAgICAgICAnZXJyb3ItY2FsbGJhY2snOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2coJ1x1RDgzRFx1REVBOCBJbnRlcmFjdGl2ZSBUdXJuc3RpbGUgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICB9LFxuICAgICAgICAndGltZW91dC1jYWxsYmFjayc6ICgpID0+IHtcbiAgICAgICAgICBsb2coJ1x1MjNGMCBUdXJuc3RpbGUgdGltZW91dCBjYWxsYmFjayAoaW50ZXJhY3RpdmUpJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdleHBpcmVkLWNhbGxiYWNrJzogKCkgPT4ge1xuICAgICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIEludGVyYWN0aXZlIFR1cm5zdGlsZSB0b2tlbiBleHBpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBfdHVybnN0aWxlV2lkZ2V0SWQgPSB3aWRnZXRJZDtcbiAgICAgIF9sYXN0U2l0ZWtleSA9IHNpdGVrZXk7XG4gICAgICBpZiAoIXdpZGdldElkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnXHUyNzRDIEVycm9yIGNyZWF0aW5nIGludGVyYWN0aXZlIFR1cm5zdGlsZSB3aWRnZXQ6JywgZXJyb3IpO1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RTaXRla2V5KGZhbGxiYWNrID0gJzB4NEFBQUFBQUJwcUplOEZPME44NHEwRicpIHtcbiAgLy8gQ2FjaGUgc2l0ZWtleSB0byBhdm9pZCByZXBlYXRlZCBET00gcXVlcmllc1xuICBpZiAoX2NhY2hlZFNpdGVrZXkpIHtcbiAgICByZXR1cm4gX2NhY2hlZFNpdGVrZXk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIFRyeSB0byBmaW5kIHNpdGVrZXkgaW4gZGF0YSBhdHRyaWJ1dGVzXG4gICAgY29uc3Qgc2l0ZWtleVNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNpdGVrZXldJyk7XG4gICAgaWYgKHNpdGVrZXlTZWwpIHtcbiAgICAgIGNvbnN0IHNpdGVrZXkgPSBzaXRla2V5U2VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXRla2V5Jyk7XG4gICAgICBpZiAoc2l0ZWtleSAmJiBzaXRla2V5Lmxlbmd0aCA+IDEwKSB7XG4gICAgICAgIF9jYWNoZWRTaXRla2V5ID0gc2l0ZWtleTtcbiAgICAgICAgbG9nKFwiXHVEODNEXHVERDBEIFNpdGVrZXkgZGV0ZWN0ZWQgZnJvbSBkYXRhIGF0dHJpYnV0ZTpcIiwgc2l0ZWtleSk7XG4gICAgICAgIHJldHVybiBzaXRla2V5O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyeSB0dXJuc3RpbGUgZWxlbWVudFxuICAgIGNvbnN0IHR1cm5zdGlsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNmLXR1cm5zdGlsZScpO1xuICAgIGlmICh0dXJuc3RpbGVFbD8uZGF0YXNldD8uc2l0ZWtleSAmJiB0dXJuc3RpbGVFbC5kYXRhc2V0LnNpdGVrZXkubGVuZ3RoID4gMTApIHtcbiAgICAgIF9jYWNoZWRTaXRla2V5ID0gdHVybnN0aWxlRWwuZGF0YXNldC5zaXRla2V5O1xuICAgICAgbG9nKFwiXHVEODNEXHVERDBEIFNpdGVrZXkgZGV0ZWN0ZWQgZnJvbSB0dXJuc3RpbGUgZWxlbWVudDpcIiwgX2NhY2hlZFNpdGVrZXkpO1xuICAgICAgcmV0dXJuIF9jYWNoZWRTaXRla2V5O1xuICAgIH1cblxuICAgIC8vIFRyeSBnbG9iYWwgdmFyaWFibGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Ll9fVFVSTlNUSUxFX1NJVEVLRVkgJiYgd2luZG93Ll9fVFVSTlNUSUxFX1NJVEVLRVkubGVuZ3RoID4gMTApIHtcbiAgICAgIF9jYWNoZWRTaXRla2V5ID0gd2luZG93Ll9fVFVSTlNUSUxFX1NJVEVLRVk7XG4gICAgICBsb2coXCJcdUQ4M0RcdUREMEQgU2l0ZWtleSBkZXRlY3RlZCBmcm9tIGdsb2JhbCB2YXJpYWJsZTpcIiwgX2NhY2hlZFNpdGVrZXkpO1xuICAgICAgcmV0dXJuIF9jYWNoZWRTaXRla2V5O1xuICAgIH1cblxuICAgIC8vIFRyeSBzY3JpcHQgdGFncyBmb3IgaW5saW5lIHNpdGVrZXlcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0Jyk7XG4gICAgZm9yIChjb25zdCBzY3JpcHQgb2Ygc2NyaXB0cykge1xuICAgICAgY29uc3QgY29udGVudCA9IHNjcmlwdC50ZXh0Q29udGVudCB8fCBzY3JpcHQuaW5uZXJIVE1MO1xuICAgICAgY29uc3Qgc2l0ZWtleU1hdGNoID0gY29udGVudC5tYXRjaCgvc2l0ZWtleVsnXCI6XFxzXSsoWydcIjAtOWEtekEtWl8tXXsyMCx9KS9pKTtcbiAgICAgIGlmIChzaXRla2V5TWF0Y2ggJiYgc2l0ZWtleU1hdGNoWzFdICYmIHNpdGVrZXlNYXRjaFsxXS5sZW5ndGggPiAxMCkge1xuICAgICAgICBfY2FjaGVkU2l0ZWtleSA9IHNpdGVrZXlNYXRjaFsxXS5yZXBsYWNlKC9bJ1wiXS9nLCAnJyk7XG4gICAgICAgIGxvZyhcIlx1RDgzRFx1REQwRCBTaXRla2V5IGRldGVjdGVkIGZyb20gc2NyaXB0IGNvbnRlbnQ6XCIsIF9jYWNoZWRTaXRla2V5KTtcbiAgICAgICAgcmV0dXJuIF9jYWNoZWRTaXRla2V5O1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ0Vycm9yIGRldGVjdGluZyBzaXRla2V5OicsIGVycm9yKTtcbiAgfVxuICBcbiAgbG9nKFwiXHVEODNEXHVERDBEIFVzaW5nIGZhbGxiYWNrIHNpdGVrZXk6XCIsIGZhbGxiYWNrKTtcbiAgX2NhY2hlZFNpdGVrZXkgPSBmYWxsYmFjaztcbiAgcmV0dXJuIGZhbGxiYWNrO1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zXG5mdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG59XG5cbmZ1bmN0aW9uIHdhaXRGb3JTZWxlY3RvcihzZWxlY3RvciwgaW50ZXJ2YWwgPSAyMDAsIHRpbWVvdXQgPSAxMDAwMCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBlbmRUaW1lID0gRGF0ZS5ub3coKSArIHRpbWVvdXQ7XG4gICAgY29uc3QgY2hlY2sgPSAoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIGlmIChEYXRlLm5vdygpIDwgZW5kVGltZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGNoZWNrLCBpbnRlcnZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfVxuICAgIH07XG4gICAgY2hlY2soKTtcbiAgfSk7XG59XG5cbi8vIEtlZXAgb3JpZ2luYWwgbWV0aG9kIGFzIGZhbGxiYWNrXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDYXB0Y2hhRmFsbGJhY2soKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZXhlY3V0ZUZsb3cgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsb2coXCJcdUQ4M0NcdURGQUYgU3RhcnRpbmcgYXV0b21hdGljIENBUFRDSEEgc29sdmluZyBwcm9jZXNzLi4uXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2xlYXIgYW55IGV4aXN0aW5nIHRva2VuIHRvIGZvcmNlIGZyZXNoIGdlbmVyYXRpb25cbiAgICAgICAgaW52YWxpZGF0ZVRva2VuKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBFbnN1cmUgd2UgaGF2ZSBhIGZyZXNoIHByb21pc2UgdG8gYXdhaXQgZm9yIGEgbmV3IHRva2VuIGNhcHR1cmVcbiAgICAgICAgdG9rZW5Qcm9taXNlID0gbmV3IFByb21pc2UoKHJlcykgPT4geyBfcmVzb2x2ZVRva2VuID0gcmVzOyB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRpbWVvdXRQcm9taXNlID0gc2xlZXAoMzAwMDApLnRoZW4oKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihcIkF1dG8tQ0FQVENIQSB0aW1lZCBvdXQgYWZ0ZXIgMzAgc2Vjb25kcy5cIikpKTtcblxuICAgICAgICBjb25zdCBzb2x2ZVByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBtYWluIHBhaW50IGJ1dHRvbiAtIGRpZmZlcmVudCBzZWxlY3RvcnMgZm9yIGRpZmZlcmVudCBzdGF0ZXNcbiAgICAgICAgICBsZXQgbWFpblBhaW50QnRuID0gYXdhaXQgd2FpdEZvclNlbGVjdG9yKCdidXR0b24uYnRuLmJ0bi1wcmltYXJ5LmJ0bi1sZycsIDIwMCwgMzAwMCk7XG4gICAgICAgICAgaWYgKCFtYWluUGFpbnRCdG4pIHtcbiAgICAgICAgICAgIG1haW5QYWludEJ0biA9IGF3YWl0IHdhaXRGb3JTZWxlY3RvcignYnV0dG9uLmJ0bi1wcmltYXJ5LnNtXFxcXDpidG4teGwnLCAyMDAsIDMwMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIW1haW5QYWludEJ0bikge1xuICAgICAgICAgICAgbWFpblBhaW50QnRuID0gYXdhaXQgd2FpdEZvclNlbGVjdG9yKCdidXR0b24uYnRuLXByaW1hcnknLCAyMDAsIDMwMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIW1haW5QYWludEJ0bikge1xuICAgICAgICAgICAgLy8gSWYgbm8gcGFpbnQgYnV0dG9uLCB0cnkgdG8gdHJpZ2dlciB0aGUgZmxvdyBtYW51YWxseVxuICAgICAgICAgICAgbG9nKFwiXHVEODNDXHVERkFGIE5vIHBhaW50IGJ1dHRvbiBmb3VuZCwgY2xpY2tpbmcgb24gY2FudmFzIGRpcmVjdGx5IHRvIHRyaWdnZXIgQ0FQVENIQS4uLlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGF3YWl0IHdhaXRGb3JTZWxlY3RvcignY2FudmFzJywgMjAwLCA1MDAwKTtcbiAgICAgICAgICAgIGlmIChjYW52YXMpIHtcbiAgICAgICAgICAgICAgY2FudmFzLmNsaWNrKCk7XG4gICAgICAgICAgICAgIGF3YWl0IHNsZWVwKDEwMDApO1xuICAgICAgICAgICAgICAvLyBUcnkgYWdhaW4gdG8gZmluZCBwYWludCBidXR0b25cbiAgICAgICAgICAgICAgbWFpblBhaW50QnRuID0gYXdhaXQgd2FpdEZvclNlbGVjdG9yKCdidXR0b24uYnRuLmJ0bi1wcmltYXJ5LmJ0bi1sZywgYnV0dG9uLmJ0bi1wcmltYXJ5LnNtXFxcXDpidG4teGwsIGJ1dHRvbi5idG4tcHJpbWFyeScsIDIwMCwgNTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmICghbWFpblBhaW50QnRuKSB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBhbnkgcGFpbnQgYnV0dG9uIGFmdGVyIGF0dGVtcHRzLlwiKTtcbiAgICAgICAgICBcbiAgICAgICAgICBsb2coXCJcdUQ4M0NcdURGQUYgRm91bmQgcGFpbnQgYnV0dG9uLCBjbGlja2luZy4uLlwiKTtcbiAgICAgICAgICBtYWluUGFpbnRCdG4uY2xpY2soKTtcbiAgICAgICAgICBhd2FpdCBzbGVlcCg1MDApO1xuXG4gICAgICAgICAgLy8gU2VsZWN0IHRyYW5zcGFyZW50IGNvbG9yIChjb2xvciAwKVxuICAgICAgICAgIGxvZyhcIlx1RDgzQ1x1REZBRiBTZWxlY3RpbmcgdHJhbnNwYXJlbnQgY29sb3IuLi5cIik7XG4gICAgICAgICAgY29uc3QgdHJhbnNCdG4gPSBhd2FpdCB3YWl0Rm9yU2VsZWN0b3IoJ2J1dHRvbiNjb2xvci0wJywgMjAwLCA1MDAwKTtcbiAgICAgICAgICBpZiAoIXRyYW5zQnRuKSB7XG4gICAgICAgICAgICBsb2coXCJcdTI2QTBcdUZFMEYgQ291bGQgbm90IGZpbmQgdHJhbnNwYXJlbnQgY29sb3IgYnV0dG9uLCB0cnlpbmcgYWx0ZXJuYXRpdmUgc2VsZWN0b3JzLi4uXCIpO1xuICAgICAgICAgICAgY29uc3QgY29sb3JCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkXj1cImNvbG9yLVwiXScpO1xuICAgICAgICAgICAgaWYgKGNvbG9yQnRucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbG9yQnRuc1swXS5jbGljaygpO1xuICAgICAgICAgICAgICBsb2coXCJcdUQ4M0NcdURGQUYgQ2xpY2tlZCBmaXJzdCBhdmFpbGFibGUgY29sb3IgYnV0dG9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc0J0bi5jbGljaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBzbGVlcCg1MDApO1xuXG4gICAgICAgICAgLy8gRmluZCBhbmQgaW50ZXJhY3Qgd2l0aCBjYW52YXNcbiAgICAgICAgICBsb2coXCJcdUQ4M0NcdURGQUYgRmluZGluZyBjYW52YXMgZWxlbWVudC4uLlwiKTtcbiAgICAgICAgICBjb25zdCBjYW52YXMgPSBhd2FpdCB3YWl0Rm9yU2VsZWN0b3IoJ2NhbnZhcycsIDIwMCwgNTAwMCk7XG4gICAgICAgICAgaWYgKCFjYW52YXMpIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIHRoZSBjYW52YXMgZWxlbWVudC5cIik7XG5cbiAgICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgICAgY2FudmFzLmZvY3VzKCk7XG4gICAgICAgICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCBjZW50ZXJYID0gTWF0aC5yb3VuZChyZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMik7XG4gICAgICAgICAgY29uc3QgY2VudGVyWSA9IE1hdGgucm91bmQocmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgbG9nKFwiXHVEODNDXHVERkFGIFNpbXVsYXRpbmcgY2FudmFzIGludGVyYWN0aW9uLi4uXCIpO1xuICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTW91c2VFdmVudCAmJiB3aW5kb3cuS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgbW91c2UgbW92ZW1lbnQgYW5kIGNsaWNrXG4gICAgICAgICAgICBjYW52YXMuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1vdXNlRXZlbnQoJ21vdXNlbW92ZScsIHsgY2xpZW50WDogY2VudGVyWCwgY2xpZW50WTogY2VudGVyWSwgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICBjYW52YXMuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1vdXNlRXZlbnQoJ21vdXNlZG93bicsIHsgY2xpZW50WDogY2VudGVyWCwgY2xpZW50WTogY2VudGVyWSwgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICBhd2FpdCBzbGVlcCg1MCk7XG4gICAgICAgICAgICBjYW52YXMuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1vdXNlRXZlbnQoJ21vdXNldXAnLCB7IGNsaWVudFg6IGNlbnRlclgsIGNsaWVudFk6IGNlbnRlclksIGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTaW11bGF0ZSBzcGFjZSBrZXkgcHJlc3NcbiAgICAgICAgICAgIGNhbnZhcy5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuS2V5Ym9hcmRFdmVudCgna2V5ZG93bicsIHsga2V5OiAnICcsIGNvZGU6ICdTcGFjZScsIGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgICAgICAgICAgYXdhaXQgc2xlZXAoNTApO1xuICAgICAgICAgICAgY2FudmFzLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5LZXlib2FyZEV2ZW50KCdrZXl1cCcsIHsga2V5OiAnICcsIGNvZGU6ICdTcGFjZScsIGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBzbGVlcCgxMDAwKTtcblxuICAgICAgICAgIC8vIFdhaXQgYSBiaXQgbW9yZSBmb3IgQ0FQVENIQSB0byBwb3RlbnRpYWxseSBhcHBlYXJcbiAgICAgICAgICBsb2coXCJcdUQ4M0NcdURGQUYgV2FpdGluZyBmb3IgQ0FQVENIQSBjaGFsbGVuZ2UuLi5cIik7XG4gICAgICAgICAgYXdhaXQgc2xlZXAoMjAwMCk7XG5cbiAgICAgICAgICAvLyBLZWVwIGNvbmZpcm1pbmcgdW50aWwgdG9rZW4gaXMgY2FwdHVyZWQgb3IgdGltZW91dFxuICAgICAgICAgIGxvZyhcIlx1RDgzQ1x1REZBRiBTdGFydGluZyBjb25maXJtYXRpb24gbG9vcC4uLlwiKTtcbiAgICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgIGNvbnN0IGNvbmZpcm1Mb29wID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIHdoaWxlICghaXNUb2tlblZhbGlkKCkgJiYgRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSA8IDI1MDAwKSB7IC8vIDI1IHNlY29uZCB0aW1lb3V0IGZvciBjb25maXJtYXRpb25zXG4gICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvLyBMb29rIGZvciBjb25maXJtIGJ1dHRvbiB3aXRoIG11bHRpcGxlIHNlbGVjdG9yc1xuICAgICAgICAgICAgICBsZXQgY29uZmlybUJ0biA9IGF3YWl0IHdhaXRGb3JTZWxlY3RvcignYnV0dG9uLmJ0bi5idG4tcHJpbWFyeS5idG4tbGcnLCAxMDAsIDEwMDApO1xuICAgICAgICAgICAgICBpZiAoIWNvbmZpcm1CdG4pIHtcbiAgICAgICAgICAgICAgICBjb25maXJtQnRuID0gYXdhaXQgd2FpdEZvclNlbGVjdG9yKCdidXR0b24uYnRuLmJ0bi1wcmltYXJ5LnNtXFxcXDpidG4teGwnLCAxMDAsIDEwMDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29uZmlybUJ0bikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFsbFByaW1hcnkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbi5idG4tcHJpbWFyeScpKTtcbiAgICAgICAgICAgICAgICBjb25maXJtQnRuID0gYWxsUHJpbWFyeS5sZW5ndGggPyBhbGxQcmltYXJ5W2FsbFByaW1hcnkubGVuZ3RoIC0gMV0gOiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBpZiAoY29uZmlybUJ0biAmJiAhY29uZmlybUJ0bi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIGxvZyhgXHVEODNDXHVERkFGIENsaWNraW5nIGNvbmZpcm1hdGlvbiBidXR0b24gKGF0dGVtcHQgJHthdHRlbXB0c30pLi4uYCk7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ0bi5jbGljaygpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZyhgXHVEODNDXHVERkFGIE5vIGFjdGl2ZSBjb25maXJtIGJ1dHRvbiBmb3VuZCAoYXR0ZW1wdCAke2F0dGVtcHRzfSlgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoODAwKTsgLy8gU2xpZ2h0bHkgbG9uZ2VyIGRlbGF5IGJldHdlZW4gYXR0ZW1wdHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gU3RhcnQgY29uZmlybWF0aW9uIGxvb3AgYW5kIHdhaXQgZm9yIHRva2VuXG4gICAgICAgICAgY29uZmlybUxvb3AoKTtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRva2VuUHJvbWlzZTtcbiAgICAgICAgICBhd2FpdCBzbGVlcCg1MDApOyAvLyBzbWFsbCBkZWxheSBhZnRlciB0b2tlbiBpcyBjYXB0dXJlZFxuICAgICAgICAgIGxvZyhcIlx1MjcwNSBUb2tlbiBzdWNjZXNzZnVsbHkgY2FwdHVyZWQgdGhyb3VnaCBicm93c2VyIGF1dG9tYXRpb25cIik7XG4gICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5yYWNlKFtzb2x2ZVByb21pc2UsIHRpbWVvdXRQcm9taXNlXSk7XG5cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZyhcIlx1Mjc0QyBBdXRvLUNBUFRDSEEgcHJvY2VzcyBmYWlsZWQ6XCIsIGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZXhlY3V0ZUZsb3coKTtcbiAgfSk7XG59XG5cbi8vIFRPS0VOIENBUFRVUkUgU1lTVEVNIChyZXBsaWNhdGVkIGZyb20gZXhhbXBsZSlcbi8vIFRoaXMgbXVzdCBiZSBjYWxsZWQgYnkgdGhlIHNpdGUgd2hlbiB0aGUgdHVybnN0aWxlIHRva2VuIGlzIHJlY2VpdmVkXG53aW5kb3cuX19XUEFfU0VUX1RVUk5TVElMRV9UT0tFTl9fID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgaWYgKHRva2VuICYmIHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycgJiYgdG9rZW4ubGVuZ3RoID4gMjApIHtcbiAgICBsb2coXCJcdTI3MDUgVHVybnN0aWxlIFRva2VuIENhcHR1cmVkOlwiLCB0b2tlbik7XG4gICAgc2V0VHVybnN0aWxlVG9rZW4odG9rZW4pO1xuICB9XG59O1xuXG4vLyBIb29rIGludG8gZmV0Y2ggdG8gY2FwdHVyZSB0dXJuc3RpbGUgdG9rZW5zIGZyb20gUE9TVCByZXF1ZXN0cyAocmVwbGljYXRlZCBmcm9tIGV4YW1wbGUpXG4oZnVuY3Rpb24oKSB7XG4gIGlmICh3aW5kb3cuX19XUEFfRkVUQ0hfSE9PS0VEX18pIHJldHVybjsgLy8gQXZvaWQgaG9va2luZyB0d2ljZVxuICB3aW5kb3cuX19XUEFfRkVUQ0hfSE9PS0VEX18gPSB0cnVlO1xuXG4gIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSB3aW5kb3cuZmV0Y2g7XG4gIHdpbmRvdy5mZXRjaCA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvcmlnaW5hbEZldGNoLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIGNvbnN0IHVybCA9IChhcmdzWzBdIGluc3RhbmNlb2YgUmVxdWVzdCkgPyBhcmdzWzBdLnVybCA6IGFyZ3NbMF07XG5cbiAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKHVybC5pbmNsdWRlcyhcImh0dHBzOi8vYmFja2VuZC53cGxhY2UubGl2ZS9zMC9waXhlbC9cIikpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShhcmdzWzFdLmJvZHkpO1xuICAgICAgICAgIGlmIChwYXlsb2FkLnQpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgY2FwdHVyZSB0b2tlbiBpZiB3ZSBkb24ndCBoYXZlIGEgdmFsaWQgb25lIG9yIGlmIGl0J3MgZGlmZmVyZW50XG4gICAgICAgICAgICBjb25zdCBjYXB0dXJlZFRva2VuID0gcGF5bG9hZC50O1xuICAgICAgICAgICAgaWYgKCFpc1Rva2VuVmFsaWQoKSB8fCB0dXJuc3RpbGVUb2tlbiAhPT0gY2FwdHVyZWRUb2tlbikge1xuICAgICAgICAgICAgICBsb2coXCJcdTI3MDUgVHVybnN0aWxlIFRva2VuIENhcHR1cmVkOlwiLCBjYXB0dXJlZFRva2VuKTtcbiAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHsgc291cmNlOiAndHVybnN0aWxlLWNhcHR1cmUnLCB0b2tlbjogY2FwdHVyZWRUb2tlbiB9LCAnKicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9O1xuXG4gIC8vIExpc3RlbiBmb3IgdG9rZW4gY2FwdHVyZSBtZXNzYWdlc1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHsgc291cmNlLCB0b2tlbiB9ID0gZXZlbnQuZGF0YTtcblxuICAgIGlmIChzb3VyY2UgPT09ICd0dXJuc3RpbGUtY2FwdHVyZScgJiYgdG9rZW4pIHtcbiAgICAgIC8vIE9ubHkgc2V0IGlmIHdlIGRvbid0IGhhdmUgYSB2YWxpZCB0b2tlbiBvciBpZiBpdCdzIGEgZGlmZmVyZW50L25ld2VyIHRva2VuXG4gICAgICBpZiAoIWlzVG9rZW5WYWxpZCgpIHx8IHR1cm5zdGlsZVRva2VuICE9PSB0b2tlbikge1xuICAgICAgICBzZXRUdXJuc3RpbGVUb2tlbih0b2tlbik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pKCk7XG5cbi8vIEV4cG9ydCB0aGUga2V5IGZ1bmN0aW9uc1xuZXhwb3J0IHsgaGFuZGxlQ2FwdGNoYSwgbG9hZFR1cm5zdGlsZSwgZXhlY3V0ZVR1cm5zdGlsZSwgZGV0ZWN0U2l0ZWtleSwgaW52YWxpZGF0ZVRva2VuIH07XG5cbi8vIExlZ2FjeSBjb21wYXRpYmlsaXR5IGZ1bmN0aW9uIFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFR1cm5zdGlsZVRva2VuKF9zaXRlS2V5KSB7XG4gIGxvZyhcIlx1MjZBMFx1RkUwRiBVc2luZyBsZWdhY3kgZ2V0VHVybnN0aWxlVG9rZW4gZnVuY3Rpb24sIGNvbnNpZGVyIG1pZ3JhdGluZyB0byBlbnN1cmVUb2tlbigpXCIpO1xuICByZXR1cm4gYXdhaXQgZW5zdXJlVG9rZW4oKTtcbn1cbiIsICJpbXBvcnQgeyBmZXRjaFdpdGhUaW1lb3V0IH0gZnJvbSBcIi4vaHR0cC5qc1wiO1xuaW1wb3J0IHsgZW5zdXJlVG9rZW4gfSBmcm9tIFwiLi90dXJuc3RpbGUuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlci5qc1wiO1xuXG5jb25zdCBCQVNFID0gXCJodHRwczovL2JhY2tlbmQud3BsYWNlLmxpdmVcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlc3Npb24oKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWUgPSBhd2FpdCBmZXRjaChgJHtCQVNFfS9tZWAsIHsgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyB9KS50aGVuKHIgPT4gci5qc29uKCkpO1xuICAgIGNvbnN0IHVzZXIgPSBtZSB8fCBudWxsO1xuICAgIGNvbnN0IGMgPSBtZT8uY2hhcmdlcyB8fCB7fTtcbiAgICBjb25zdCBjaGFyZ2VzID0ge1xuICAgICAgY291bnQ6IGMuY291bnQgPz8gMCwgICAgICAgIC8vIE1hbnRlbmVyIHZhbG9yIGRlY2ltYWwgb3JpZ2luYWxcbiAgICAgIG1heDogYy5tYXggPz8gMCwgICAgICAgICAgICAvLyBNYW50ZW5lciB2YWxvciBvcmlnaW5hbCAocHVlZGUgdmFyaWFyIHBvciB1c3VhcmlvKVxuICAgICAgY29vbGRvd25NczogYy5jb29sZG93bk1zID8/IDMwMDAwXG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4geyBcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXIsIFxuICAgICAgICBjaGFyZ2VzOiBjaGFyZ2VzLmNvdW50LFxuICAgICAgICBtYXhDaGFyZ2VzOiBjaGFyZ2VzLm1heCxcbiAgICAgICAgY2hhcmdlUmVnZW46IGNoYXJnZXMuY29vbGRvd25Nc1xuICAgICAgfVxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IFxuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcjogbnVsbCwgXG4gICAgICAgIGNoYXJnZXM6IDAsXG4gICAgICAgIG1heENoYXJnZXM6IDAsXG4gICAgICAgIGNoYXJnZVJlZ2VuOiAzMDAwMFxuICAgICAgfVxuICAgIH07IFxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0hlYWx0aCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L2hlYWx0aGAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBoZWFsdGggPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5oZWFsdGgsXG4gICAgICAgIGxhc3RDaGVjazogRGF0ZS5ub3coKSxcbiAgICAgICAgc3RhdHVzOiAnb25saW5lJ1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YWJhc2U6IGZhbHNlLFxuICAgICAgICB1cDogZmFsc2UsXG4gICAgICAgIHVwdGltZTogJ04vQScsXG4gICAgICAgIGxhc3RDaGVjazogRGF0ZS5ub3coKSxcbiAgICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNcbiAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhYmFzZTogZmFsc2UsXG4gICAgICB1cDogZmFsc2UsXG4gICAgICB1cHRpbWU6ICdOL0EnLFxuICAgICAgbGFzdENoZWNrOiBEYXRlLm5vdygpLFxuICAgICAgc3RhdHVzOiAnb2ZmbGluZScsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZVxuICAgIH07XG4gIH1cbn1cblxuLy8gVW5pZmljYSBwb3N0IGRlIHBcdTAwRUR4ZWwgcG9yIGxvdGVzIChiYXRjaCBwb3IgdGlsZSkuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9zdFBpeGVsQmF0Y2goeyB0aWxlWCwgdGlsZVksIHBpeGVscywgdHVybnN0aWxlVG9rZW4gfSkge1xuICAvLyBwaXhlbHM6IFt7eCx5LGNvbG9yfSwgXHUyMDI2XSByZWxhdGl2b3MgYWwgdGlsZVxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBwaXhlbHMsIHRva2VuOiB0dXJuc3RpbGVUb2tlbiB9KTtcbiAgY29uc3QgciA9IGF3YWl0IGZldGNoV2l0aFRpbWVvdXQoYCR7QkFTRX0vczAvcGl4ZWwvJHt0aWxlWH0vJHt0aWxlWX1gLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIgfSxcbiAgICBib2R5LFxuICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIlxuICB9KTtcbiAgXG4gIC8vIEFsZ3VuYXMgcmVzcHVlc3RhcyBwdWVkZW4gbm8gdHJhZXIgSlNPTiBhdW5xdWUgc2VhbiAyMDAuXG4gIGlmIChyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgdHJ5IHsgcmV0dXJuIGF3YWl0IHIuanNvbigpOyB9IGNhdGNoIHsgcmV0dXJuIHsgb2s6IHRydWUgfTsgfVxuICB9XG4gIFxuICBsZXQgbXNnID0gYEhUVFAgJHtyLnN0YXR1c31gO1xuICB0cnkgeyBcbiAgICBjb25zdCBqID0gYXdhaXQgci5qc29uKCk7IFxuICAgIG1zZyA9IGo/Lm1lc3NhZ2UgfHwgbXNnOyBcbiAgfSBjYXRjaCB7XG4gICAgLy8gUmVzcG9uc2Ugbm90IEpTT05cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYHBhaW50IGZhaWxlZDogJHttc2d9YCk7XG59XG5cbi8vIFZlcnNpXHUwMEYzbiAnc2FmZScgcXVlIG5vIGFycm9qYSBleGNlcGNpb25lcyB5IHJldG9ybmEgc3RhdHVzL2pzb25cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0UGl4ZWxCYXRjaFNhZmUodGlsZVgsIHRpbGVZLCBwaXhlbHMsIHR1cm5zdGlsZVRva2VuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgcGl4ZWxzLCB0b2tlbjogdHVybnN0aWxlVG9rZW4gfSk7XG4gICAgY29uc3QgciA9IGF3YWl0IGZldGNoV2l0aFRpbWVvdXQoYCR7QkFTRX0vczAvcGl4ZWwvJHt0aWxlWH0vJHt0aWxlWX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiIH0sXG4gICAgICBib2R5LFxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiXG4gICAgfSk7XG4gIGxldCBqc29uID0ge307XG4gIC8vIElmIHJlc3BvbnNlIGlzIG5vdCBKU09OLCBpZ25vcmUgcGFyc2UgZXJyb3JcbiAgdHJ5IHsganNvbiA9IGF3YWl0IHIuanNvbigpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgICByZXR1cm4geyBzdGF0dXM6IHIuc3RhdHVzLCBqc29uLCBzdWNjZXNzOiByLm9rIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3RhdHVzOiAwLCBqc29uOiB7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHN1Y2Nlc3M6IGZhbHNlIH07XG4gIH1cbn1cblxuLy8gUG9zdCBwXHUwMEVEeGVsIHBhcmEgZmFybSAocmVwbGljYWRvIGRlbCBlamVtcGxvIGNvbiBtYW5lam8gZGUgNDAzKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbChjb29yZHMsIGNvbG9ycywgdHVybnN0aWxlVG9rZW4sIHRpbGVYLCB0aWxlWSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgY29sb3JzOiBjb2xvcnMsIFxuICAgICAgY29vcmRzOiBjb29yZHMsIFxuICAgICAgdDogdHVybnN0aWxlVG9rZW4gXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgMTUwMDApOyAvLyBUaW1lb3V0IGRlIDE1IHNlZ3VuZG9zXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L3MwL3BpeGVsLyR7dGlsZVh9LyR7dGlsZVl9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcgfSxcbiAgICAgIGJvZHk6IGJvZHksXG4gICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsXG4gICAgfSk7XG5cbiAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgdHJ5IHsgYXdhaXQgcmVzcG9uc2UuanNvbigpOyB9IGNhdGNoIHsgLyogSWdub3JlIEpTT04gcGFyc2luZyBlcnJvcnMgKi8gfVxuICAgICAgY29uc29sZS5lcnJvcihcIlx1Mjc0QyA0MDMgRm9yYmlkZGVuLiBUdXJuc3RpbGUgdG9rZW4gbWlnaHQgYmUgaW52YWxpZCBvciBleHBpcmVkLlwiKTtcbiAgICAgIFxuICAgICAgLy8gVHJ5IHRvIGdlbmVyYXRlIGEgbmV3IHRva2VuIGFuZCByZXRyeSBvbmNlXG4gICAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlx1RDgzRFx1REQwNCBSZWdlbmVyYXRpbmcgVHVybnN0aWxlIHRva2VuIGFmdGVyIDQwMy4uLlwiKTtcbiAgICAgICAgY29uc3QgbmV3VG9rZW4gPSBhd2FpdCBlbnN1cmVUb2tlbih0cnVlKTsgLy8gRm9yY2UgbmV3IHRva2VuIGdlbmVyYXRpb25cbiAgICAgICAgXG4gICAgICAgIC8vIFJldHJ5IHRoZSByZXF1ZXN0IHdpdGggbmV3IHRva2VuXG4gICAgICAgIGNvbnN0IHJldHJ5Qm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgICAgY29sb3JzOiBjb2xvcnMsIFxuICAgICAgICAgIGNvb3JkczogY29vcmRzLCBcbiAgICAgICAgICB0OiBuZXdUb2tlbiBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCByZXRyeUNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIGNvbnN0IHJldHJ5VGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiByZXRyeUNvbnRyb2xsZXIuYWJvcnQoKSwgMTUwMDApO1xuXG4gICAgICAgIGNvbnN0IHJldHJ5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnIH0sXG4gICAgICAgICAgYm9keTogcmV0cnlCb2R5LFxuICAgICAgICAgIHNpZ25hbDogcmV0cnlDb250cm9sbGVyLnNpZ25hbFxuICAgICAgICB9KTtcblxuICAgICAgICBjbGVhclRpbWVvdXQocmV0cnlUaW1lb3V0SWQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHJldHJ5UmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiA0MDMsXG4gICAgICAgICAgICBqc29uOiB7IGVycm9yOiAnRnJlc2ggdG9rZW4gZXhwaXJlZCBvciBpbnZhbGlkIGFmdGVyIHJldHJ5JyB9LFxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcmV0cnlEYXRhID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmV0cnlSZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgIHJldHJ5RGF0YSA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICByZXRyeURhdGEgPSB7fTsgLy8gSWdub3JhciBlcnJvcmVzIGRlIEpTT04gcGFyc2VcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXM6IHJldHJ5UmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgIGpzb246IHJldHJ5RGF0YSxcbiAgICAgICAgICBzdWNjZXNzOiByZXRyeVJlc3BvbnNlLm9rXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgfSBjYXRjaCAocmV0cnlFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiXHUyNzRDIFRva2VuIHJlZ2VuZXJhdGlvbiBmYWlsZWQ6XCIsIHJldHJ5RXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1czogNDAzLFxuICAgICAgICAgIGpzb246IHsgZXJyb3I6ICdUb2tlbiByZWdlbmVyYXRpb24gZmFpbGVkJyB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlc3BvbnNlRGF0YSA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBpZiAodGV4dCkge1xuICAgICAgICByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgcmVzcG9uc2VEYXRhID0ge307IC8vIElnbm9yYXIgZXJyb3JlcyBkZSBKU09OIHBhcnNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAganNvbjogcmVzcG9uc2VEYXRhLFxuICAgICAgc3VjY2VzczogcmVzcG9uc2Uub2tcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IDAsXG4gICAgICBqc29uOiB7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sXG4gICAgICBzdWNjZXNzOiBmYWxzZVxuICAgIH07XG4gIH1cbn1cblxuLy8gUG9zdCBwXHUwMEVEeGVsIHBhcmEgQXV0by1JbWFnZSAocmVwbGljYWRvIGRlbCBlamVtcGxvIGNvbiBtYW5lam8gZGUgNDAzKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbEJhdGNoSW1hZ2UodGlsZVgsIHRpbGVZLCBjb29yZHMsIGNvbG9ycywgdHVybnN0aWxlVG9rZW4pIHtcbiAgdHJ5IHtcbiAgICAvLyBQcmVwYXJlIGV4YWN0IGJvZHkgZm9ybWF0IGFzIHVzZWQgaW4gZXhhbXBsZVxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgY29sb3JzOiBjb2xvcnMsIFxuICAgICAgY29vcmRzOiBjb29yZHMsIFxuICAgICAgdDogdHVybnN0aWxlVG9rZW4gXG4gICAgfSk7XG4gICAgXG4gICAgbG9nKGBbQVBJXSBTZW5kaW5nIGJhdGNoIHRvIHRpbGUgJHt0aWxlWH0sJHt0aWxlWX0gd2l0aCAke2NvbG9ycy5sZW5ndGh9IHBpeGVscywgdG9rZW46ICR7dHVybnN0aWxlVG9rZW4gPyB0dXJuc3RpbGVUb2tlbi5zdWJzdHJpbmcoMCwgNTApICsgJy4uLicgOiAnbnVsbCd9YCk7XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnIH0sXG4gICAgICBib2R5OiBib2R5XG4gICAgfSk7XG5cbiAgICBsb2coYFtBUEldIFJlc3BvbnNlOiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICB0cnkgeyBhd2FpdCByZXNwb25zZS5qc29uKCk7IH0gY2F0Y2ggeyAvKiBJZ25vcmUgSlNPTiBwYXJzaW5nIGVycm9ycyAqLyB9XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHUyNzRDIDQwMyBGb3JiaWRkZW4uIFR1cm5zdGlsZSB0b2tlbiBtaWdodCBiZSBpbnZhbGlkIG9yIGV4cGlyZWQuXCIpO1xuICAgICAgXG4gICAgICAvLyBUcnkgdG8gZ2VuZXJhdGUgYSBuZXcgdG9rZW4gYW5kIHJldHJ5IG9uY2VcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiXHVEODNEXHVERDA0IFJlZ2VuZXJhdGluZyBUdXJuc3RpbGUgdG9rZW4gYWZ0ZXIgNDAzLi4uXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gRm9yY2UgaW52YWxpZGF0aW9uIG9mIGN1cnJlbnQgdG9rZW4gYW5kIGdldCBjb21wbGV0ZWx5IGZyZXNoIG9uZVxuICAgICAgICBjb25zdCBuZXdUb2tlbiA9IGF3YWl0IGVuc3VyZVRva2VuKHRydWUpOyAvLyBGb3JjZSBuZXcgdG9rZW4gZ2VuZXJhdGlvblxuICAgICAgICBcbiAgICAgICAgaWYgKCFuZXdUb2tlbikge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IDQwMyxcbiAgICAgICAgICAgIGpzb246IHsgZXJyb3I6ICdDb3VsZCBub3QgZ2VuZXJhdGUgbmV3IHRva2VuJyB9LFxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBwYWludGVkOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gUmV0cnkgdGhlIHJlcXVlc3Qgd2l0aCBuZXcgdG9rZW5cbiAgICAgICAgY29uc3QgcmV0cnlCb2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBcbiAgICAgICAgICBjb2xvcnM6IGNvbG9ycywgXG4gICAgICAgICAgY29vcmRzOiBjb29yZHMsIFxuICAgICAgICAgIHQ6IG5ld1Rva2VuIFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGxvZyhgW0FQSV0gUmV0cnlpbmcgd2l0aCBmcmVzaCB0b2tlbjogJHtuZXdUb2tlbi5zdWJzdHJpbmcoMCwgNTApfS4uLmApO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcmV0cnlSZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L3MwL3BpeGVsLyR7dGlsZVh9LyR7dGlsZVl9YCwge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcgfSxcbiAgICAgICAgICBib2R5OiByZXRyeUJvZHlcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBsb2coYFtBUEldIFJldHJ5IHJlc3BvbnNlOiAke3JldHJ5UmVzcG9uc2Uuc3RhdHVzfSAke3JldHJ5UmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChyZXRyeVJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogNDAzLFxuICAgICAgICAgICAganNvbjogeyBlcnJvcjogJ0ZyZXNoIHRva2VuIHN0aWxsIGV4cGlyZWQgb3IgaW52YWxpZCBhZnRlciByZXRyeScgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgcGFpbnRlZDogMFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCByZXRyeURhdGEgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXRyeVJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICBpZiAodGV4dC50cmltKCkpIHtcbiAgICAgICAgICAgIHJldHJ5RGF0YSA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHJ5RGF0YSA9IHt9OyAvLyBFbXB0eSByZXNwb25zZVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgICAgIGxvZyhgW0FQSV0gV2FybmluZzogQ291bGQgbm90IHBhcnNlIHJldHJ5IHJlc3BvbnNlIEpTT046ICR7cGFyc2VFcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgIHJldHJ5RGF0YSA9IHt9OyAvLyBVc2UgZW1wdHkgb2JqZWN0IGlmIEpTT04gcGFyc2UgZmFpbHNcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgcGFpbnRlZCA9IHJldHJ5RGF0YT8ucGFpbnRlZCB8fCAwO1xuICAgICAgICBsb2coYFtBUEldIFJldHJ5IHJlc3VsdDogJHtwYWludGVkfSBwaXhlbHMgcGFpbnRlZGApO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXM6IHJldHJ5UmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgIGpzb246IHJldHJ5RGF0YSxcbiAgICAgICAgICBzdWNjZXNzOiByZXRyeVJlc3BvbnNlLm9rLFxuICAgICAgICAgIHBhaW50ZWQ6IHBhaW50ZWRcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICB9IGNhdGNoIChyZXRyeUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTI3NEMgVG9rZW4gcmVnZW5lcmF0aW9uIGZhaWxlZDpcIiwgcmV0cnlFcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzOiA0MDMsXG4gICAgICAgICAganNvbjogeyBlcnJvcjogJ1Rva2VuIHJlZ2VuZXJhdGlvbiBmYWlsZWQ6ICcgKyByZXRyeUVycm9yLm1lc3NhZ2UgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBwYWludGVkOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlc3BvbnNlRGF0YSA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBpZiAodGV4dC50cmltKCkpIHtcbiAgICAgICAgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlRGF0YSA9IHt9OyAvLyBFbXB0eSByZXNwb25zZVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKHBhcnNlRXJyb3IpIHtcbiAgICAgIGxvZyhgW0FQSV0gV2FybmluZzogQ291bGQgbm90IHBhcnNlIHJlc3BvbnNlIEpTT046ICR7cGFyc2VFcnJvci5tZXNzYWdlfWApO1xuICAgICAgcmVzcG9uc2VEYXRhID0ge307IC8vIFVzZSBlbXB0eSBvYmplY3QgaWYgSlNPTiBwYXJzZSBmYWlsc1xuICAgIH1cblxuICAgIGNvbnN0IHBhaW50ZWQgPSByZXNwb25zZURhdGE/LnBhaW50ZWQgfHwgMDtcbiAgICBsb2coYFtBUEldIFN1Y2Nlc3M6ICR7cGFpbnRlZH0gcGl4ZWxzIHBhaW50ZWRgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGpzb246IHJlc3BvbnNlRGF0YSxcbiAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlLm9rLFxuICAgICAgcGFpbnRlZDogcGFpbnRlZFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKGBbQVBJXSBOZXR3b3JrIGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogMCxcbiAgICAgIGpzb246IHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgcGFpbnRlZDogMFxuICAgIH07XG4gIH1cbn1cbiIsICIvLyBDb25maWd1cmFjaVx1MDBGM24gcGFyYSBBdXRvLUd1YXJkXG5leHBvcnQgY29uc3QgR1VBUkRfREVGQVVMVFMgPSB7XG4gIFNJVEVLRVk6IFwiMHg0QUFBQUFBQnBxSmU4Rk8wTjg0cTBGXCIsXG4gIENPT0xET1dOX0RFRkFVTFQ6IDMxMDAwLFxuICBUSUxFX1NJWkU6IDEwMDAsXG4gIENIRUNLX0lOVEVSVkFMOiAxMDAwMCwgLy8gUmV2aXNhciBjYWRhIDEwIHNlZ3VuZG9zXG4gIE1BWF9QUk9URUNUSU9OX1NJWkU6IEluZmluaXR5LCAvLyBTaW4gbFx1MDBFRG1pdGUgZGUgcFx1MDBFRHhlbGVzIHByb3RlZ2lkb3NcbiAgUElYRUxTX1BFUl9CQVRDSDogMTAsIC8vIE1lbm9zIHF1ZSBJbWFnZSBwYXJhIHNlciBtXHUwMEUxcyBzdXRpbFxuICBNSU5fQ0hBUkdFU19UT19XQUlUOiAyMCwgLy8gQ2FyZ2FzIG1cdTAwRURuaW1hcyBhIGVzcGVyYXIgYW50ZXMgZGUgY29udGludWFyXG4gIEJBQ0tFTkRfVVJMOiBcImh0dHBzOi8vYmFja2VuZC53cGxhY2UubGl2ZVwiLFxuICBQUk9URUNUSU9OX1BBVFRFUk46IFwicmFuZG9tXCIgLy8gUGF0clx1MDBGM24gcG9yIGRlZmVjdG9cbn07XG5cbi8vIFBhdHJvbmVzIGRlIHByb3RlY2NpXHUwMEYzbiBkaXNwb25pYmxlc1xuZXhwb3J0IGNvbnN0IFBST1RFQ1RJT05fUEFUVEVSTlMgPSB7XG4gIHJhbmRvbTogXCJBbGVhdG9yaW9cIixcbiAgbGluZTogXCJMXHUwMEVEbmVhXCIsXG4gIGNlbnRlcjogXCJDZW50cm9cIixcbiAgc3BpcmFsOiBcIkVzcGlyYWxcIixcbiAgaHVtYW46IFwiSHVtYW5vXCJcbn07XG5cbi8vIEVzdGFkbyBnbG9iYWwgZGVsIEd1YXJkXG5leHBvcnQgY29uc3QgZ3VhcmRTdGF0ZSA9IHtcbiAgcnVubmluZzogZmFsc2UsXG4gIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgcHJvdGVjdGlvbkFyZWE6IG51bGwsIC8vIHsgeDEsIHkxLCB4MiwgeTIsIHRpbGVYLCB0aWxlWSB9XG4gIG9yaWdpbmFsUGl4ZWxzOiBuZXcgTWFwKCksIC8vIE1hcCBkZSBcIngseVwiIC0+IHtyLCBnLCBiLCBjb2xvcklkfVxuICBjaGFuZ2VzOiBuZXcgTWFwKCksIC8vIE1hcCBkZSBcIngseVwiIC0+IHt0aW1lc3RhbXAsIG9yaWdpbmFsQ29sb3IsIGN1cnJlbnRDb2xvcn1cbiAgY3VycmVudENoYXJnZXM6IDAsXG4gIG1heENoYXJnZXM6IDUwLFxuICBsYXN0Q2hlY2s6IDAsXG4gIGNoZWNrSW50ZXJ2YWw6IG51bGwsXG4gIGF2YWlsYWJsZUNvbG9yczogW10sXG4gIGNvbG9yc0NoZWNrZWQ6IGZhbHNlLFxuICB1aTogbnVsbCxcbiAgdG90YWxSZXBhaXJlZDogMCxcblxuICAvLyBDb25maWd1cmFjaVx1MDBGM24gZWRpdGFibGVcbiAgcGl4ZWxzUGVyQmF0Y2g6IEdVQVJEX0RFRkFVTFRTLlBJWEVMU19QRVJfQkFUQ0gsXG4gIG1pbkNoYXJnZXNUb1dhaXQ6IEdVQVJEX0RFRkFVTFRTLk1JTl9DSEFSR0VTX1RPX1dBSVQsXG4gIHByb3RlY3Rpb25QYXR0ZXJuOiBHVUFSRF9ERUZBVUxUUy5QUk9URUNUSU9OX1BBVFRFUk4sXG4gIGNvbmZpZzoge1xuICAgIGNvbG9yQ29tcGFyaXNvbk1ldGhvZDogJ2xhYicsIC8vICdyZ2InIG8gJ2xhYicgLSBMQUIgcG9yIGRlZmVjdG8gcGFyYSByZXBvc2ljaW9uYW1pZW50b1xuICAgIGNvbG9yVGhyZXNob2xkOiAxMCAvLyBVbWJyYWwgZGUgZGlmZXJlbmNpYSBkZSBjb2xvclxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCBzbGVlcCA9IChtcykgPT4gbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIG1zKSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXRyeShmbiwgeyB0cmllcyA9IDMsIGJhc2UgPSA1MDAgfSA9IHt9KSB7XG4gIGxldCBsYXN0O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWVzOyBpKyspIHtcbiAgICB0cnkgeyByZXR1cm4gYXdhaXQgZm4oKTsgfVxuICAgIGNhdGNoIChlKSB7IGxhc3QgPSBlOyBhd2FpdCBzbGVlcChiYXNlICogMiAqKiBpKTsgfVxuICB9XG4gIHRocm93IGxhc3Q7XG59XG5cbmV4cG9ydCBjb25zdCByYW5kSW50ID0gKG4pID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG4pO1xuXG4vLyBTbGVlcCB3aXRoIGNvdW50ZG93biAoZnJvbSBmYXJtKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNsZWVwV2l0aENvdW50ZG93bihtcywgb25VcGRhdGUsIHN0YXRlKSB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIGNvbnN0IGVuZFRpbWUgPSBzdGFydFRpbWUgKyBtcztcbiAgXG4gIHdoaWxlIChEYXRlLm5vdygpIDwgZW5kVGltZSAmJiAoIXN0YXRlIHx8IHN0YXRlLnJ1bm5pbmcpKSB7XG4gICAgY29uc3QgcmVtYWluaW5nID0gZW5kVGltZSAtIERhdGUubm93KCk7XG4gICAgXG4gICAgaWYgKG9uVXBkYXRlKSB7XG4gICAgICBvblVwZGF0ZShyZW1haW5pbmcpO1xuICAgIH1cbiAgICBcbiAgICBhd2FpdCBzbGVlcChNYXRoLm1pbigxMDAwLCByZW1haW5pbmcpKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuXG4vKipcbiAqIEFsZ29yaXRtb3MgZGUgcGF0cm9uZXMgZGUgcHJvdGVjY2lcdTAwRjNuIHBhcmEgcmVwYXJhciBwXHUwMEVEeGVsZXNcbiAqL1xuXG4vKipcbiAqIFBhdHJcdTAwRjNuIGFsZWF0b3JpbyAtIHNlbGVjY2lvbmEgcFx1MDBFRHhlbGVzIGFsIGF6YXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbVBhdHRlcm4oY2hhbmdlcywgY291bnQpIHtcbiAgY29uc3QgY2hhbmdlc0FycmF5ID0gQXJyYXkuZnJvbShjaGFuZ2VzKTtcbiAgY29uc3Qgc2VsZWN0ZWQgPSBbXTtcbiAgXG4gIC8vIENyZWFyIHVuYSBjb3BpYSBwYXJhIG5vIG1vZGlmaWNhciBlbCBvcmlnaW5hbFxuICBjb25zdCBhdmFpbGFibGUgPSBbLi4uY2hhbmdlc0FycmF5XTtcbiAgXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5taW4oY291bnQsIGF2YWlsYWJsZS5sZW5ndGgpOyBpKyspIHtcbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZS5sZW5ndGgpO1xuICAgIHNlbGVjdGVkLnB1c2goYXZhaWxhYmxlLnNwbGljZShyYW5kb21JbmRleCwgMSlbMF0pO1xuICB9XG4gIFxuICByZXR1cm4gc2VsZWN0ZWQ7XG59XG5cbi8qKlxuICogUGF0clx1MDBGM24gZGUgbFx1MDBFRG5lYSAtIHNlbGVjY2lvbmEgcFx1MDBFRHhlbGVzIGVuIGxcdTAwRURuZWFzIGhvcml6b250YWxlcy92ZXJ0aWNhbGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5lUGF0dGVybihjaGFuZ2VzLCBjb3VudCkge1xuICBjb25zdCBjaGFuZ2VzQXJyYXkgPSBBcnJheS5mcm9tKGNoYW5nZXMpO1xuICBpZiAoY2hhbmdlc0FycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuICBcbiAgLy8gQWdydXBhciBwb3IgZmlsYXMgeSBjb2x1bW5hc1xuICBjb25zdCBieVJvdyA9IG5ldyBNYXAoKTtcbiAgY29uc3QgYnlDb2wgPSBuZXcgTWFwKCk7XG4gIFxuICBjaGFuZ2VzQXJyYXkuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgY29uc3QgW3gsIHldID0gY29vcmQuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICBcbiAgICBpZiAoIWJ5Um93Lmhhcyh5KSkgYnlSb3cuc2V0KHksIFtdKTtcbiAgICBpZiAoIWJ5Q29sLmhhcyh4KSkgYnlDb2wuc2V0KHgsIFtdKTtcbiAgICBcbiAgICBieVJvdy5nZXQoeSkucHVzaChjb29yZCk7XG4gICAgYnlDb2wuZ2V0KHgpLnB1c2goY29vcmQpO1xuICB9KTtcbiAgXG4gIGNvbnN0IHNlbGVjdGVkID0gW107XG4gIGNvbnN0IHVzZWQgPSBuZXcgU2V0KCk7XG4gIFxuICAvLyBBbHRlcm5hciBlbnRyZSBmaWxhcyB5IGNvbHVtbmFzXG4gIGNvbnN0IHJvd3MgPSBBcnJheS5mcm9tKGJ5Um93LmtleXMoKSkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICBjb25zdCBjb2xzID0gQXJyYXkuZnJvbShieUNvbC5rZXlzKCkpLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgXG4gIGxldCByb3dJbmRleCA9IDA7XG4gIGxldCBjb2xJbmRleCA9IDA7XG4gIGxldCB1c2VSb3cgPSB0cnVlO1xuICBcbiAgd2hpbGUgKHNlbGVjdGVkLmxlbmd0aCA8IGNvdW50ICYmIChyb3dJbmRleCA8IHJvd3MubGVuZ3RoIHx8IGNvbEluZGV4IDwgY29scy5sZW5ndGgpKSB7XG4gICAgaWYgKHVzZVJvdyAmJiByb3dJbmRleCA8IHJvd3MubGVuZ3RoKSB7XG4gICAgICBjb25zdCByb3cgPSByb3dzW3Jvd0luZGV4XTtcbiAgICAgIGNvbnN0IHJvd1BpeGVscyA9IGJ5Um93LmdldChyb3cpLmZpbHRlcihjb29yZCA9PiAhdXNlZC5oYXMoY29vcmQpKTtcbiAgICAgIFxuICAgICAgaWYgKHJvd1BpeGVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIFRvbWFyIHBcdTAwRUR4ZWxlcyBkZSBsYSBmaWxhIGRlIGl6cXVpZXJkYSBhIGRlcmVjaGFcbiAgICAgICAgY29uc3Qgc29ydGVkUm93ID0gcm93UGl4ZWxzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBjb25zdCBbeDFdID0gYS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgICAgICAgIGNvbnN0IFt4Ml0gPSBiLnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgICAgICAgcmV0dXJuIHgxIC0geDI7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgZm9yIChjb25zdCBjb29yZCBvZiBzb3J0ZWRSb3cpIHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID49IGNvdW50KSBicmVhaztcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKGNvb3JkKTtcbiAgICAgICAgICB1c2VkLmFkZChjb29yZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJvd0luZGV4Kys7XG4gICAgfSBlbHNlIGlmICghdXNlUm93ICYmIGNvbEluZGV4IDwgY29scy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNvbCA9IGNvbHNbY29sSW5kZXhdO1xuICAgICAgY29uc3QgY29sUGl4ZWxzID0gYnlDb2wuZ2V0KGNvbCkuZmlsdGVyKGNvb3JkID0+ICF1c2VkLmhhcyhjb29yZCkpO1xuICAgICAgXG4gICAgICBpZiAoY29sUGl4ZWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gVG9tYXIgcFx1MDBFRHhlbGVzIGRlIGxhIGNvbHVtbmEgZGUgYXJyaWJhIGEgYWJham9cbiAgICAgICAgY29uc3Qgc29ydGVkQ29sID0gY29sUGl4ZWxzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBjb25zdCBbLCB5MV0gPSBhLnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgICAgICAgY29uc3QgWywgeTJdID0gYi5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgICAgICAgIHJldHVybiB5MSAtIHkyO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGZvciAoY29uc3QgY29vcmQgb2Ygc29ydGVkQ29sKSB7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA+PSBjb3VudCkgYnJlYWs7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaChjb29yZCk7XG4gICAgICAgICAgdXNlZC5hZGQoY29vcmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb2xJbmRleCsrO1xuICAgIH1cbiAgICBcbiAgICB1c2VSb3cgPSAhdXNlUm93O1xuICB9XG4gIFxuICByZXR1cm4gc2VsZWN0ZWQuc2xpY2UoMCwgY291bnQpO1xufVxuXG4vKipcbiAqIFBhdHJcdTAwRjNuIGRlIGNlbnRybyAtIHNlbGVjY2lvbmEgcFx1MDBFRHhlbGVzIGRlc2RlIGVsIGNlbnRybyBoYWNpYSBhZnVlcmFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENlbnRlclBhdHRlcm4oY2hhbmdlcywgY291bnQpIHtcbiAgY29uc3QgY2hhbmdlc0FycmF5ID0gQXJyYXkuZnJvbShjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXNBcnJheS5sZW5ndGggPT09IDApIHJldHVybiBbXTtcbiAgXG4gIC8vIENhbGN1bGFyIGVsIGNlbnRybyBkZWwgXHUwMEUxcmVhIGRlIGNhbWJpb3NcbiAgbGV0IG1pblggPSBJbmZpbml0eSwgbWF4WCA9IC1JbmZpbml0eTtcbiAgbGV0IG1pblkgPSBJbmZpbml0eSwgbWF4WSA9IC1JbmZpbml0eTtcbiAgXG4gIGNoYW5nZXNBcnJheS5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZC5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCB4KTtcbiAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgeCk7XG4gICAgbWluWSA9IE1hdGgubWluKG1pblksIHkpO1xuICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCB5KTtcbiAgfSk7XG4gIFxuICBjb25zdCBjZW50ZXJYID0gKG1pblggKyBtYXhYKSAvIDI7XG4gIGNvbnN0IGNlbnRlclkgPSAobWluWSArIG1heFkpIC8gMjtcbiAgXG4gIC8vIE9yZGVuYXIgcG9yIGRpc3RhbmNpYSBhbCBjZW50cm9cbiAgY29uc3Qgd2l0aERpc3RhbmNlID0gY2hhbmdlc0FycmF5Lm1hcChjb29yZCA9PiB7XG4gICAgY29uc3QgW3gsIHldID0gY29vcmQuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyh4IC0gY2VudGVyWCwgMikgKyBNYXRoLnBvdyh5IC0gY2VudGVyWSwgMikpO1xuICAgIHJldHVybiB7IGNvb3JkLCBkaXN0YW5jZSB9O1xuICB9KTtcbiAgXG4gIHdpdGhEaXN0YW5jZS5zb3J0KChhLCBiKSA9PiBhLmRpc3RhbmNlIC0gYi5kaXN0YW5jZSk7XG4gIFxuICByZXR1cm4gd2l0aERpc3RhbmNlLnNsaWNlKDAsIGNvdW50KS5tYXAoaXRlbSA9PiBpdGVtLmNvb3JkKTtcbn1cblxuLyoqXG4gKiBQYXRyXHUwMEYzbiBlc3BpcmFsIC0gc2VsZWNjaW9uYSBwXHUwMEVEeGVsZXMgZW4gZm9ybWEgZGUgZXNwaXJhbCBkZXNkZSBlbCBjZW50cm9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNwaXJhbFBhdHRlcm4oY2hhbmdlcywgY291bnQpIHtcbiAgY29uc3QgY2hhbmdlc0FycmF5ID0gQXJyYXkuZnJvbShjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXNBcnJheS5sZW5ndGggPT09IDApIHJldHVybiBbXTtcbiAgXG4gIC8vIENhbGN1bGFyIGVsIGNlbnRybyBkZWwgXHUwMEUxcmVhIGRlIGNhbWJpb3NcbiAgbGV0IG1pblggPSBJbmZpbml0eSwgbWF4WCA9IC1JbmZpbml0eTtcbiAgbGV0IG1pblkgPSBJbmZpbml0eSwgbWF4WSA9IC1JbmZpbml0eTtcbiAgXG4gIGNoYW5nZXNBcnJheS5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZC5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCB4KTtcbiAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgeCk7XG4gICAgbWluWSA9IE1hdGgubWluKG1pblksIHkpO1xuICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCB5KTtcbiAgfSk7XG4gIFxuICBjb25zdCBjZW50ZXJYID0gTWF0aC5yb3VuZCgobWluWCArIG1heFgpIC8gMik7XG4gIGNvbnN0IGNlbnRlclkgPSBNYXRoLnJvdW5kKChtaW5ZICsgbWF4WSkgLyAyKTtcbiAgXG4gIC8vIENyZWFyIHVuIG1hcGEgZGUgY29vcmRlbmFkYXMgZGlzcG9uaWJsZXNcbiAgY29uc3QgYXZhaWxhYmxlQ29vcmRzID0gbmV3IFNldChjaGFuZ2VzQXJyYXkpO1xuICBjb25zdCBzZWxlY3RlZCA9IFtdO1xuICBcbiAgLy8gR2VuZXJhciBlc3BpcmFsXG4gIGxldCB4ID0gY2VudGVyWDtcbiAgbGV0IHkgPSBjZW50ZXJZO1xuICBsZXQgZHggPSAwO1xuICBsZXQgZHkgPSAtMTtcbiAgbGV0IHN0ZXBzID0gMTtcbiAgbGV0IHN0ZXBDb3VudCA9IDA7XG4gIGxldCBkaXJlY3Rpb24gPSAwOyAvLyAwOiB1cCwgMTogcmlnaHQsIDI6IGRvd24sIDM6IGxlZnRcbiAgXG4gIC8vIENvbWVuemFyIGRlc2RlIGVsIGNlbnRybyBzaSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICBjb25zdCBjZW50ZXJDb29yZCA9IGAke2NlbnRlclh9LCR7Y2VudGVyWX1gO1xuICBpZiAoYXZhaWxhYmxlQ29vcmRzLmhhcyhjZW50ZXJDb29yZCkpIHtcbiAgICBzZWxlY3RlZC5wdXNoKGNlbnRlckNvb3JkKTtcbiAgICBhdmFpbGFibGVDb29yZHMuZGVsZXRlKGNlbnRlckNvb3JkKTtcbiAgfVxuICBcbiAgd2hpbGUgKHNlbGVjdGVkLmxlbmd0aCA8IGNvdW50ICYmIGF2YWlsYWJsZUNvb3Jkcy5zaXplID4gMCkge1xuICAgIC8vIE1vdmVyIGVuIGxhIGRpcmVjY2lcdTAwRjNuIGFjdHVhbFxuICAgIHggKz0gZHg7XG4gICAgeSArPSBkeTtcbiAgICBcbiAgICBjb25zdCBjb29yZCA9IGAke3h9LCR7eX1gO1xuICAgIGlmIChhdmFpbGFibGVDb29yZHMuaGFzKGNvb3JkKSkge1xuICAgICAgc2VsZWN0ZWQucHVzaChjb29yZCk7XG4gICAgICBhdmFpbGFibGVDb29yZHMuZGVsZXRlKGNvb3JkKTtcbiAgICB9XG4gICAgXG4gICAgc3RlcENvdW50Kys7XG4gICAgXG4gICAgLy8gQ2FtYmlhciBkaXJlY2NpXHUwMEYzbiBjdWFuZG8gc2VhIG5lY2VzYXJpb1xuICAgIGlmIChzdGVwQ291bnQgPT09IHN0ZXBzKSB7XG4gICAgICBzdGVwQ291bnQgPSAwO1xuICAgICAgXG4gICAgICAvLyBDYW1iaWFyIGRpcmVjY2lcdTAwRjNuIChnaXJhciA5MCBncmFkb3MgYSBsYSBkZXJlY2hhKVxuICAgICAgaWYgKGR4ID09PSAwICYmIGR5ID09PSAtMSkgeyAvLyB1cCAtPiByaWdodFxuICAgICAgICBkeCA9IDE7IGR5ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoZHggPT09IDEgJiYgZHkgPT09IDApIHsgLy8gcmlnaHQgLT4gZG93blxuICAgICAgICBkeCA9IDA7IGR5ID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoZHggPT09IDAgJiYgZHkgPT09IDEpIHsgLy8gZG93biAtPiBsZWZ0XG4gICAgICAgIGR4ID0gLTE7IGR5ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoZHggPT09IC0xICYmIGR5ID09PSAwKSB7IC8vIGxlZnQgLT4gdXBcbiAgICAgICAgZHggPSAwOyBkeSA9IC0xO1xuICAgICAgfVxuICAgICAgXG4gICAgICBkaXJlY3Rpb24gPSAoZGlyZWN0aW9uICsgMSkgJSA0O1xuICAgICAgXG4gICAgICAvLyBJbmNyZW1lbnRhciBwYXNvcyBjYWRhIGRvcyBjYW1iaW9zIGRlIGRpcmVjY2lcdTAwRjNuXG4gICAgICBpZiAoZGlyZWN0aW9uICUgMiA9PT0gMCkge1xuICAgICAgICBzdGVwcysrO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBFdml0YXIgYnVjbGUgaW5maW5pdG8gc2kgbm9zIGFsZWphbW9zIGRlbWFzaWFkb1xuICAgIGlmIChNYXRoLmFicyh4IC0gY2VudGVyWCkgPiAxMDAgfHwgTWF0aC5hYnMoeSAtIGNlbnRlclkpID4gMTAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNpIG5vIGhlbW9zIHNlbGVjY2lvbmFkbyBzdWZpY2llbnRlcywgY29tcGxldGFyIGNvbiBhbGVhdG9yaW9zXG4gIGlmIChzZWxlY3RlZC5sZW5ndGggPCBjb3VudCAmJiBhdmFpbGFibGVDb29yZHMuc2l6ZSA+IDApIHtcbiAgICBjb25zdCByZW1haW5pbmcgPSBBcnJheS5mcm9tKGF2YWlsYWJsZUNvb3Jkcyk7XG4gICAgY29uc3QgbmVlZGVkID0gTWF0aC5taW4oY291bnQgLSBzZWxlY3RlZC5sZW5ndGgsIHJlbWFpbmluZy5sZW5ndGgpO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVlZGVkOyBpKyspIHtcbiAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmVtYWluaW5nLmxlbmd0aCk7XG4gICAgICBzZWxlY3RlZC5wdXNoKHJlbWFpbmluZy5zcGxpY2UocmFuZG9tSW5kZXgsIDEpWzBdKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBzZWxlY3RlZC5zbGljZSgwLCBjb3VudCk7XG59XG5cbi8qKlxuICogUGF0clx1MDBGM24gaHVtYW5vIC0gc2ltdWxhIGNvbXBvcnRhbWllbnRvIGh1bWFubyBjb24gdmFyaWFjaW9uZXMgeSBwYXVzYXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEh1bWFuUGF0dGVybihjaGFuZ2VzLCBjb3VudCkge1xuICBjb25zdCBjaGFuZ2VzQXJyYXkgPSBBcnJheS5mcm9tKGNoYW5nZXMpO1xuICBpZiAoY2hhbmdlc0FycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuICBcbiAgLy8gQ29tYmluYXIgZGlmZXJlbnRlcyBlc3RyYXRlZ2lhcyBjb21vIGxvIGhhclx1MDBFRGEgdW4gaHVtYW5vXG4gIGNvbnN0IHN0cmF0ZWdpZXMgPSBbXG4gICAgKCkgPT4gZ2V0UmFuZG9tUGF0dGVybihuZXcgU2V0KGNoYW5nZXNBcnJheSksIE1hdGguY2VpbChjb3VudCAqIDAuNCkpLFxuICAgICgpID0+IGdldENlbnRlclBhdHRlcm4obmV3IFNldChjaGFuZ2VzQXJyYXkpLCBNYXRoLmNlaWwoY291bnQgKiAwLjMpKSxcbiAgICAoKSA9PiBnZXRMaW5lUGF0dGVybihuZXcgU2V0KGNoYW5nZXNBcnJheSksIE1hdGguY2VpbChjb3VudCAqIDAuMykpXG4gIF07XG4gIFxuICBjb25zdCBzZWxlY3RlZCA9IFtdO1xuICBjb25zdCB1c2VkID0gbmV3IFNldCgpO1xuICBcbiAgLy8gQXBsaWNhciBlc3RyYXRlZ2lhcyBkZSBmb3JtYSBhbGVhdG9yaWFcbiAgZm9yIChjb25zdCBzdHJhdGVneSBvZiBzdHJhdGVnaWVzKSB7XG4gICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA+PSBjb3VudCkgYnJlYWs7XG4gICAgXG4gICAgY29uc3QgYXZhaWxhYmxlQ2hhbmdlcyA9IG5ldyBTZXQoY2hhbmdlc0FycmF5LmZpbHRlcihjb29yZCA9PiAhdXNlZC5oYXMoY29vcmQpKSk7XG4gICAgaWYgKGF2YWlsYWJsZUNoYW5nZXMuc2l6ZSA9PT0gMCkgYnJlYWs7XG4gICAgXG4gICAgY29uc3Qgc3RyYXRlZ3lSZXN1bHQgPSBzdHJhdGVneSgpO1xuICAgIFxuICAgIGZvciAoY29uc3QgY29vcmQgb2Ygc3RyYXRlZ3lSZXN1bHQpIHtcbiAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPj0gY291bnQpIGJyZWFrO1xuICAgICAgaWYgKCF1c2VkLmhhcyhjb29yZCkpIHtcbiAgICAgICAgc2VsZWN0ZWQucHVzaChjb29yZCk7XG4gICAgICAgIHVzZWQuYWRkKGNvb3JkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8vIENvbXBsZXRhciBjb24gYWxlYXRvcmlvcyBzaSBlcyBuZWNlc2FyaW9cbiAgaWYgKHNlbGVjdGVkLmxlbmd0aCA8IGNvdW50KSB7XG4gICAgY29uc3QgcmVtYWluaW5nID0gY2hhbmdlc0FycmF5LmZpbHRlcihjb29yZCA9PiAhdXNlZC5oYXMoY29vcmQpKTtcbiAgICBjb25zdCBuZWVkZWQgPSBNYXRoLm1pbihjb3VudCAtIHNlbGVjdGVkLmxlbmd0aCwgcmVtYWluaW5nLmxlbmd0aCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWQ7IGkrKykge1xuICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByZW1haW5pbmcubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGNvb3JkID0gcmVtYWluaW5nLnNwbGljZShyYW5kb21JbmRleCwgMSlbMF07XG4gICAgICBzZWxlY3RlZC5wdXNoKGNvb3JkKTtcbiAgICAgIHVzZWQuYWRkKGNvb3JkKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBzZWxlY3RlZC5zbGljZSgwLCBjb3VudCk7XG59XG5cbi8qKlxuICogT2J0aWVuZSBwXHUwMEVEeGVsZXMgc2VnXHUwMEZBbiBlbCBwYXRyXHUwMEYzbiBzZWxlY2Npb25hZG9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBpeGVsc0J5UGF0dGVybihwYXR0ZXJuLCBjaGFuZ2VzLCBjb3VudCkge1xuICBsb2coYFx1RDgzQ1x1REZBRiBBcGxpY2FuZG8gcGF0clx1MDBGM24gJHtwYXR0ZXJufSBwYXJhICR7Y291bnR9IHBcdTAwRUR4ZWxlcyBkZSAke2NoYW5nZXMuc2l6ZX0gY2FtYmlvcyBkZXRlY3RhZG9zYCk7XG4gIFxuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlICdsaW5lJzpcbiAgICAgIHJldHVybiBnZXRMaW5lUGF0dGVybihjaGFuZ2VzLCBjb3VudCk7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiBnZXRDZW50ZXJQYXR0ZXJuKGNoYW5nZXMsIGNvdW50KTtcbiAgICBjYXNlICdzcGlyYWwnOlxuICAgICAgcmV0dXJuIGdldFNwaXJhbFBhdHRlcm4oY2hhbmdlcywgY291bnQpO1xuICAgIGNhc2UgJ2h1bWFuJzpcbiAgICAgIHJldHVybiBnZXRIdW1hblBhdHRlcm4oY2hhbmdlcywgY291bnQpO1xuICAgIGNhc2UgJ3JhbmRvbSc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBnZXRSYW5kb21QYXR0ZXJuKGNoYW5nZXMsIGNvdW50KTtcbiAgfVxufSIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IHBvc3RQaXhlbEJhdGNoSW1hZ2UsIGdldFNlc3Npb24gfSBmcm9tIFwiLi4vY29yZS93cGxhY2UtYXBpLmpzXCI7XG5pbXBvcnQgeyBlbnN1cmVUb2tlbiB9IGZyb20gXCIuLi9jb3JlL3R1cm5zdGlsZS5qc1wiO1xuaW1wb3J0IHsgZ3VhcmRTdGF0ZSwgR1VBUkRfREVGQVVMVFMgfSBmcm9tIFwiLi9jb25maWcuanNcIjtcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSBcIi4uL2NvcmUvdGltaW5nLmpzXCI7XG5pbXBvcnQgeyBnZXRQaXhlbHNCeVBhdHRlcm4gfSBmcm9tIFwiLi9wYXR0ZXJucy5qc1wiO1xuXG4vLyBWYXJpYWJsZXMgcGFyYSBtb25pdG9yZW8gZGUgY2FyZ2FzXG5sZXQgY2hhcmdlTW9uaXRvckludGVydmFsID0gbnVsbDtcbmxldCBfbGFzdENoYXJnZUNoZWNrID0gMDtcbmxldCBfaXNSZXBhaXJpbmcgPSBmYWxzZTsgLy8gRXZpdGFyIGJ1Y2xlcyBpbmZpbml0b3NcbmxldCBfY291bnRkb3duSW50ZXJ2YWwgPSBudWxsO1xubGV0IF9uZXh0Q2hhcmdlVGltZSA9IDA7XG5jb25zdCBDSEFSR0VfQ0hFQ0tfSU5URVJWQUwgPSAzMDAwMDsgLy8gMzAgc2VndW5kb3NcbmNvbnN0IENIQVJHRV9SRUdFTkVSQVRJT05fVElNRSA9IDMxMDAwOyAvLyAzMSBzZWd1bmRvcyBwb3IgY2FyZ2FcblxuLyoqXG4gKiBJbmljaWEgZWwgY29udGFkb3IgZGUgdGllbXBvIHBhcmEgZWwgcHJcdTAwRjN4aW1vIGxvdGVcbiAqL1xuZnVuY3Rpb24gc3RhcnRDb3VudGRvd25UaW1lcigpIHtcbiAgaWYgKF9jb3VudGRvd25JbnRlcnZhbCkge1xuICAgIHdpbmRvdy5jbGVhckludGVydmFsKF9jb3VudGRvd25JbnRlcnZhbCk7XG4gIH1cbiAgXG4gIF9jb3VudGRvd25JbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCB0aW1lTGVmdCA9IE1hdGgubWF4KDAsIE1hdGguY2VpbCgoX25leHRDaGFyZ2VUaW1lIC0gbm93KSAvIDEwMDApKTtcbiAgICBcbiAgICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVDb3VudGRvd24odGltZUxlZnQpO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGltZUxlZnQgPD0gMCkge1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoX2NvdW50ZG93bkludGVydmFsKTtcbiAgICAgIF9jb3VudGRvd25JbnRlcnZhbCA9IG51bGw7XG4gICAgfVxuICB9LCAxMDAwKTtcbn1cblxuLyoqXG4gKiBEZXRpZW5lIGVsIGNvbnRhZG9yIGRlIHRpZW1wb1xuICovXG5mdW5jdGlvbiBzdG9wQ291bnRkb3duVGltZXIoKSB7XG4gIGlmIChfY291bnRkb3duSW50ZXJ2YWwpIHtcbiAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChfY291bnRkb3duSW50ZXJ2YWwpO1xuICAgIF9jb3VudGRvd25JbnRlcnZhbCA9IG51bGw7XG4gIH1cbiAgXG4gIGlmIChndWFyZFN0YXRlLnVpKSB7XG4gICAgZ3VhcmRTdGF0ZS51aS5zaG93Q291bnRkb3duKGZhbHNlKTtcbiAgfVxufVxuXG4vKipcbiAqIEluaWNpYSBlbCBtb25pdG9yZW8gcGVyaVx1MDBGM2RpY28gZGUgY2FyZ2FzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydENoYXJnZU1vbml0b3JpbmcoKSB7XG4gIGlmIChjaGFyZ2VNb25pdG9ySW50ZXJ2YWwpIHtcbiAgICBsb2coJ1x1RDgzRFx1REQwNCBNb25pdG9yZW8gZGUgY2FyZ2FzIHlhIGVzdFx1MDBFMSBhY3Rpdm8nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2coJ1x1RDgzRFx1REQwNCBJbmljaWFuZG8gbW9uaXRvcmVvIGRlIGNhcmdhcyBjYWRhIDMwIHNlZ3VuZG9zLi4uJyk7XG4gIFxuICBjaGFyZ2VNb25pdG9ySW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBBY3R1YWxpemFyIGNhcmdhcyBlbiB0aWVtcG8gcmVhbFxuICAgICAgY29uc3Qgc2Vzc2lvblJlc3VsdCA9IGF3YWl0IGdldFNlc3Npb24oKTtcbiAgICAgIFxuICAgICAgaWYgKHNlc3Npb25SZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICBjb25zdCBhdmFpbGFibGVDaGFyZ2VzID0gTWF0aC5mbG9vcihzZXNzaW9uUmVzdWx0LmRhdGEuY2hhcmdlcyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBY3R1YWxpemFyIGVzdGFkbyBkZSBjYXJnYXNcbiAgICAgICAgZ3VhcmRTdGF0ZS5jdXJyZW50Q2hhcmdlcyA9IHNlc3Npb25SZXN1bHQuZGF0YS5jaGFyZ2VzO1xuICAgICAgICBndWFyZFN0YXRlLm1heENoYXJnZXMgPSBzZXNzaW9uUmVzdWx0LmRhdGEubWF4Q2hhcmdlcztcbiAgICAgICAgXG4gICAgICAgIC8vIEFjdHVhbGl6YXIgVUkgY29uIGNhcmdhcyBhY3R1YWxlc1xuICAgICAgICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHMoeyBjaGFyZ2VzOiBhdmFpbGFibGVDaGFyZ2VzIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTb2xvIHZlcmlmaWNhciBzaSBoYXkgY2FtYmlvcyBwZW5kaWVudGVzLCBubyBlc3RhbW9zIHJlcGFyYW5kbyBhY3RpdmFtZW50ZSwgeSBlbCBHdWFyZCBlc3RcdTAwRTEgY29ycmllbmRvXG4gICAgICAgIGlmIChndWFyZFN0YXRlLmNoYW5nZXMuc2l6ZSA+IDAgJiYgZ3VhcmRTdGF0ZS5ydW5uaW5nICYmICFfaXNSZXBhaXJpbmcpIHtcbiAgICAgICAgICBpZiAoYXZhaWxhYmxlQ2hhcmdlcyA+PSBndWFyZFN0YXRlLm1pbkNoYXJnZXNUb1dhaXQpIHtcbiAgICAgICAgICAgIGxvZyhgXHVEODNEXHVERDA0IENhcmdhcyBkZXRlY3RhZGFzOiAke2F2YWlsYWJsZUNoYXJnZXN9LiBDb250aW51YW5kbyByZXBhcmFjaVx1MDBGM24gYXV0b21cdTAwRTF0aWNhbWVudGUuLi5gKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRGV0ZW5lciBjb250YWRvciBzaSBlc3RcdTAwRTEgYWN0aXZvXG4gICAgICAgICAgICBzdG9wQ291bnRkb3duVGltZXIoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ29udGludWFyIGNvbiBsYSByZXBhcmFjaVx1MDBGM25cbiAgICAgICAgICAgIGF3YWl0IHJlcGFpckNoYW5nZXMoZ3VhcmRTdGF0ZS5jaGFuZ2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKGBFcnJvciBlbiBtb25pdG9yZW8gZGUgY2FyZ2FzOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9LCBDSEFSR0VfQ0hFQ0tfSU5URVJWQUwpO1xufVxuXG4vKipcbiAqIERldGVuZXIgbW9uaXRvcmVvIGRlIGNhcmdhc1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3RvcENoYXJnZU1vbml0b3JpbmcoKSB7XG4gIGlmIChjaGFyZ2VNb25pdG9ySW50ZXJ2YWwpIHtcbiAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChjaGFyZ2VNb25pdG9ySW50ZXJ2YWwpO1xuICAgIGNoYXJnZU1vbml0b3JJbnRlcnZhbCA9IG51bGw7XG4gICAgbG9nKCdcdUQ4M0RcdUREMDQgTW9uaXRvcmVvIGRlIGNhcmdhcyBkZXRlbmlkbycpO1xuICB9XG4gIFxuICAvLyBUYW1iaVx1MDBFOW4gZGV0ZW5lciBlbCBjb250YWRvclxuICBzdG9wQ291bnRkb3duVGltZXIoKTtcbn1cblxuLy8gRnVuY2lvbmVzIHBhcmEgY29udmVyc2lcdTAwRjNuIGRlIGNvbG9yIFJHQiBhIExBQlxuZnVuY3Rpb24gcmdiVG9YeXoociwgZywgYikge1xuICAvLyBOb3JtYWxpemFyIHZhbG9yZXMgUkdCIGEgMC0xXG4gIHIgPSByIC8gMjU1O1xuICBnID0gZyAvIDI1NTtcbiAgYiA9IGIgLyAyNTU7XG5cbiAgLy8gQXBsaWNhciBjb3JyZWNjaVx1MDBGM24gZ2FtbWFcbiAgciA9IHIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKHIgKyAwLjA1NSkgLyAxLjA1NSwgMi40KSA6IHIgLyAxMi45MjtcbiAgZyA9IGcgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKGcgKyAwLjA1NSkgLyAxLjA1NSwgMi40KSA6IGcgLyAxMi45MjtcbiAgYiA9IGIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKGIgKyAwLjA1NSkgLyAxLjA1NSwgMi40KSA6IGIgLyAxMi45MjtcblxuICAvLyBDb252ZXJ0aXIgYSBYWVogdXNhbmRvIG1hdHJpeiBzUkdCXG4gIGNvbnN0IHggPSByICogMC40MTI0NTY0ICsgZyAqIDAuMzU3NTc2MSArIGIgKiAwLjE4MDQzNzU7XG4gIGNvbnN0IHkgPSByICogMC4yMTI2NzI5ICsgZyAqIDAuNzE1MTUyMiArIGIgKiAwLjA3MjE3NTA7XG4gIGNvbnN0IHogPSByICogMC4wMTkzMzM5ICsgZyAqIDAuMTE5MTkyMCArIGIgKiAwLjk1MDMwNDE7XG5cbiAgcmV0dXJuIHsgeCwgeSwgeiB9O1xufVxuXG5mdW5jdGlvbiB4eXpUb0xhYih4LCB5LCB6KSB7XG4gIC8vIFVzYXIgaWx1bWluYW50ZSBENjVcbiAgY29uc3QgeG4gPSAwLjk1MDQ3O1xuICBjb25zdCB5biA9IDEuMDAwMDA7XG4gIGNvbnN0IHpuID0gMS4wODg4MztcblxuICB4ID0geCAvIHhuO1xuICB5ID0geSAvIHluO1xuICB6ID0geiAvIHpuO1xuXG4gIGNvbnN0IGZ4ID0geCA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeCwgMS8zKSA6ICg3Ljc4NyAqIHggKyAxNi8xMTYpO1xuICBjb25zdCBmeSA9IHkgPiAwLjAwODg1NiA/IE1hdGgucG93KHksIDEvMykgOiAoNy43ODcgKiB5ICsgMTYvMTE2KTtcbiAgY29uc3QgZnogPSB6ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh6LCAxLzMpIDogKDcuNzg3ICogeiArIDE2LzExNik7XG5cbiAgY29uc3QgbCA9IDExNiAqIGZ5IC0gMTY7XG4gIGNvbnN0IGEgPSA1MDAgKiAoZnggLSBmeSk7XG4gIGNvbnN0IGIgPSAyMDAgKiAoZnkgLSBmeik7XG5cbiAgcmV0dXJuIHsgbCwgYSwgYiB9O1xufVxuXG5mdW5jdGlvbiByZ2JUb0xhYihyLCBnLCBiKSB7XG4gIGNvbnN0IHh5eiA9IHJnYlRvWHl6KHIsIGcsIGIpO1xuICByZXR1cm4geHl6VG9MYWIoeHl6LngsIHh5ei55LCB4eXoueik7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGNhbGN1bGFyIGRpZmVyZW5jaWEgRGVsdGEgRSBlbiBlc3BhY2lvIExBQlxuZnVuY3Rpb24gY2FsY3VsYXRlRGVsdGFFKGxhYjEsIGxhYjIpIHtcbiAgY29uc3QgZGVsdGFMID0gbGFiMS5sIC0gbGFiMi5sO1xuICBjb25zdCBkZWx0YUEgPSBsYWIxLmEgLSBsYWIyLmE7XG4gIGNvbnN0IGRlbHRhQiA9IGxhYjEuYiAtIGxhYjIuYjtcbiAgXG4gIHJldHVybiBNYXRoLnNxcnQoZGVsdGFMICogZGVsdGFMICsgZGVsdGFBICogZGVsdGFBICsgZGVsdGFCICogZGVsdGFCKTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgY29tcGFyYXIgY29sb3JlcyB1c2FuZG8gZGlmZXJlbnRlcyBtXHUwMEU5dG9kb3NcbmZ1bmN0aW9uIGNvbXBhcmVDb2xvcnMoY29sb3IxLCBjb2xvcjIsIG1ldGhvZCA9ICdyZ2InLCB0aHJlc2hvbGQgPSAxMCkge1xuICBpZiAobWV0aG9kID09PSAnbGFiJykge1xuICAgIGNvbnN0IGxhYjEgPSByZ2JUb0xhYihjb2xvcjEuciwgY29sb3IxLmcsIGNvbG9yMS5iKTtcbiAgICBjb25zdCBsYWIyID0gcmdiVG9MYWIoY29sb3IyLnIsIGNvbG9yMi5nLCBjb2xvcjIuYik7XG4gICAgY29uc3QgZGVsdGFFID0gY2FsY3VsYXRlRGVsdGFFKGxhYjEsIGxhYjIpO1xuICAgIFxuICAgIC8vIFBhcmEgTEFCLCB1biBEZWx0YSBFIDwgMi4zIGVzIGltcGVyY2VwdGlibGUsIDwgNSBlcyBhY2VwdGFibGVcbiAgICByZXR1cm4gZGVsdGFFID4gKHRocmVzaG9sZCAvIDIpOyAvLyBBanVzdGFyIHVtYnJhbCBwYXJhIExBQlxuICB9IGVsc2Uge1xuICAgIC8vIE1cdTAwRTl0b2RvIFJHQiBvcmlnaW5hbFxuICAgIGNvbnN0IHJEaWZmID0gTWF0aC5hYnMoY29sb3IxLnIgLSBjb2xvcjIucik7XG4gICAgY29uc3QgZ0RpZmYgPSBNYXRoLmFicyhjb2xvcjEuZyAtIGNvbG9yMi5nKTtcbiAgICBjb25zdCBiRGlmZiA9IE1hdGguYWJzKGNvbG9yMS5iIC0gY29sb3IyLmIpO1xuICAgIGNvbnN0IG1heERpZmYgPSBNYXRoLm1heChyRGlmZiwgZ0RpZmYsIGJEaWZmKTtcbiAgICBcbiAgICByZXR1cm4gbWF4RGlmZiA+IHRocmVzaG9sZDtcbiAgfVxufVxuXG4vLyBHbG9iYWxzIGRlbCBuYXZlZ2Fkb3JcbmNvbnN0IHsgSW1hZ2UsIFVSTCB9ID0gd2luZG93O1xuXG4vLyBPYnRlbmVyIGltYWdlbiBkZSB0aWxlIGRlc2RlIGxhIEFQSVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRpbGVJbWFnZSh0aWxlWCwgdGlsZVkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBgJHtHVUFSRF9ERUZBVUxUUy5CQUNLRU5EX1VSTH0vZmlsZXMvczAvdGlsZXMvJHt0aWxlWH0vJHt0aWxlWX0ucG5nYDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZyhgRXJyb3Igb2J0ZW5pZW5kbyB0aWxlICR7dGlsZVh9LCR7dGlsZVl9OmAsIGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vLyBEZXRlY3RhciBjb2xvcmVzIGRpc3BvbmlibGVzIGRlbCBzaXRpb1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEF2YWlsYWJsZUNvbG9ycygpIHtcbiAgbG9nKFwiXHVEODNDXHVERkE4IERldGVjdGFuZG8gY29sb3JlcyBkaXNwb25pYmxlcy4uLlwiKTtcbiAgY29uc3QgY29sb3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49XCJjb2xvci1cIl0nKTtcbiAgY29uc3QgY29sb3JzID0gW107XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbG9yRWxlbWVudHMpIHtcbiAgICBpZiAoZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwic3ZnXCIpKSBjb250aW51ZTtcbiAgICBcbiAgICBjb25zdCBjb2xvcklkID0gcGFyc2VJbnQoZWxlbWVudC5pZC5yZXBsYWNlKFwiY29sb3ItXCIsIFwiXCIpKTtcbiAgICBpZiAoY29sb3JJZCA9PT0gMCkgY29udGludWU7IC8vIEV2aXRhciBzb2xvIGVsIGNvbG9yIHRyYW5zcGFyZW50ZSAoSUQgMClcbiAgICBcbiAgICBjb25zdCBiZ0NvbG9yID0gZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgaWYgKGJnQ29sb3IpIHtcbiAgICAgIGNvbnN0IHJnYk1hdGNoID0gYmdDb2xvci5tYXRjaCgvXFxkKy9nKTtcbiAgICAgIGlmIChyZ2JNYXRjaCAmJiByZ2JNYXRjaC5sZW5ndGggPj0gMykge1xuICAgICAgICBjb2xvcnMucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbG9ySWQsXG4gICAgICAgICAgcjogcGFyc2VJbnQocmdiTWF0Y2hbMF0pLFxuICAgICAgICAgIGc6IHBhcnNlSW50KHJnYk1hdGNoWzFdKSxcbiAgICAgICAgICBiOiBwYXJzZUludChyZ2JNYXRjaFsyXSksXG4gICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2coYFx1MjcwNSAke2NvbG9ycy5sZW5ndGh9IGNvbG9yZXMgZGV0ZWN0YWRvc2ApO1xuICByZXR1cm4gY29sb3JzO1xufVxuXG4vLyBFbmNvbnRyYXIgZWwgY29sb3IgbVx1MDBFMXMgY2VyY2FubyBkaXNwb25pYmxlXG5leHBvcnQgZnVuY3Rpb24gZmluZENsb3Nlc3RDb2xvcihyLCBnLCBiLCBhdmFpbGFibGVDb2xvcnMpIHtcbiAgbGV0IG1pbkRpc3RhbmNlID0gSW5maW5pdHk7XG4gIGxldCBjbG9zZXN0Q29sb3IgPSBudWxsO1xuXG4gIGZvciAoY29uc3QgY29sb3Igb2YgYXZhaWxhYmxlQ29sb3JzKSB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoXG4gICAgICBNYXRoLnBvdyhyIC0gY29sb3IuciwgMikgK1xuICAgICAgTWF0aC5wb3coZyAtIGNvbG9yLmcsIDIpICtcbiAgICAgIE1hdGgucG93KGIgLSBjb2xvci5iLCAyKVxuICAgICk7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgIGNsb3Nlc3RDb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbG9zZXN0Q29sb3I7XG59XG5cbi8vIEFuYWxpemFyIHBcdTAwRUR4ZWxlcyBkZSB1biBcdTAwRTFyZWEgZXNwZWNcdTAwRURmaWNhXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYW5hbHl6ZUFyZWFQaXhlbHMoYXJlYSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgYWxsb3dWaXJ0dWFsID0gZmFsc2UgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHsgeDEsIHkxLCB4MiwgeTIgfSA9IGFyZWE7XG4gIGNvbnN0IHdpZHRoID0geDIgLSB4MSArIDE7IC8vIGluY2x1c2l2b1xuICBjb25zdCBoZWlnaHQgPSB5MiAtIHkxICsgMTsgLy8gaW5jbHVzaXZvXG5cbiAgbG9nKGBcdUQ4M0RcdUREMEQgQW5hbGl6YW5kbyBcdTAwRTFyZWEgJHt3aWR0aH14JHtoZWlnaHR9IGRlc2RlICgke3gxfSwke3kxfSkgaGFzdGEgKCR7eDJ9LCR7eTJ9KWApO1xuICBcbiAgLy8gQXNlZ3VyYXIgcXVlIHRlbmVtb3MgY29sb3JlcyBkaXNwb25pYmxlcyBhbnRlcyBkZSBhbmFsaXphclxuICBpZiAoIWd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzIHx8IGd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IGRldGVjdGVkID0gZGV0ZWN0QXZhaWxhYmxlQ29sb3JzKCk7XG4gICAgaWYgKGRldGVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIGd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzID0gZGV0ZWN0ZWQ7XG4gICAgICBsb2coYFx1RDgzQ1x1REZBOCBDb2xvcmVzIGRldGVjdGFkb3MgcGFyYSBhblx1MDBFMWxpc2lzOiAke2RldGVjdGVkLmxlbmd0aH1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKGBcdTI2QTBcdUZFMEYgU2luIGNvbG9yZXMgZGlzcG9uaWJsZXMgcGFyYSBhblx1MDBFMWxpc2lzLiBPbWl0aWVuZG8gYW5cdTAwRTFsaXNpcyBwYXJhIGV2aXRhciBmYWxzb3MgcG9zaXRpdm9zLmApO1xuICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwaXhlbE1hcCA9IG5ldyBNYXAoKTtcbiAgXG4gIC8vIE9idGVuZXIgdGlsZXMgXHUwMEZBbmljb3MgcXVlIGN1YnJlbiBlbCBcdTAwRTFyZWFcbiAgY29uc3Qgc3RhcnRUaWxlWCA9IE1hdGguZmxvb3IoeDEgLyBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkUpO1xuICBjb25zdCBzdGFydFRpbGVZID0gTWF0aC5mbG9vcih5MSAvIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRSk7XG4gIGNvbnN0IGVuZFRpbGVYID0gTWF0aC5mbG9vcih4MiAvIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRSk7XG4gIGNvbnN0IGVuZFRpbGVZID0gTWF0aC5mbG9vcih5MiAvIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRSk7XG4gIFxuICAvLyBQYXJhIHNpbXBsaWZpY2FyLCBhbmFsaXphciB0aWxlIHBvciB0aWxlXG4gIGZvciAobGV0IHRpbGVZID0gc3RhcnRUaWxlWTsgdGlsZVkgPD0gZW5kVGlsZVk7IHRpbGVZKyspIHtcbiAgICBmb3IgKGxldCB0aWxlWCA9IHN0YXJ0VGlsZVg7IHRpbGVYIDw9IGVuZFRpbGVYOyB0aWxlWCsrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB0aWxlQmxvYiA9IGF3YWl0IGdldFRpbGVJbWFnZSh0aWxlWCwgdGlsZVkpO1xuICAgICAgICBpZiAoIXRpbGVCbG9iKSB7XG4gICAgICAgICAgbG9nKGBcdTI2QTBcdUZFMEYgTm8gc2UgcHVkbyBvYnRlbmVyIHRpbGUgJHt0aWxlWH0sJHt0aWxlWX0sIGNvbnRpbnVhbmRvLi4uYCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhciBjYW52YXMgcGFyYSBhbmFsaXphciBsYSBpbWFnZW5cbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpbWcub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgICBpbWcuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh0aWxlQmxvYik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhO1xuXG4gICAgICAgIC8vIEFuYWxpemFyIHBcdTAwRUR4ZWxlcyBlbiBlbCBcdTAwRTFyZWEgZXNwZWNpZmljYWRhIGRlIGVzdGUgdGlsZVxuICAgICAgICBjb25zdCB0aWxlU3RhcnRYID0gdGlsZVggKiBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkU7XG4gICAgICAgIGNvbnN0IHRpbGVTdGFydFkgPSB0aWxlWSAqIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRTtcbiAgICAgICAgY29uc3QgdGlsZUVuZFhFeGNsdXNpdmUgPSB0aWxlU3RhcnRYICsgR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFO1xuICAgICAgICBjb25zdCB0aWxlRW5kWUV4Y2x1c2l2ZSA9IHRpbGVTdGFydFkgKyBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkU7XG4gICAgICAgIFxuICAgICAgICAvLyBDYWxjdWxhciBpbnRlcnNlY2NpXHUwMEYzbiBkZWwgXHUwMEUxcmVhIChpbmNsdXNpdmEpIGNvbiBlc3RlIHRpbGUgdXNhbmRvIGZpbi1leGNsdXNpdm9cbiAgICAgICAgY29uc3QgYXJlYUVuZFhFeGNsdXNpdmUgPSB4MiArIDE7XG4gICAgICAgIGNvbnN0IGFyZWFFbmRZRXhjbHVzaXZlID0geTIgKyAxO1xuICAgICAgICBjb25zdCBhbmFseXplU3RhcnRYID0gTWF0aC5tYXgoeDEsIHRpbGVTdGFydFgpO1xuICAgICAgICBjb25zdCBhbmFseXplU3RhcnRZID0gTWF0aC5tYXgoeTEsIHRpbGVTdGFydFkpO1xuICAgICAgICBjb25zdCBhbmFseXplRW5kWEV4Y2x1c2l2ZSA9IE1hdGgubWluKGFyZWFFbmRYRXhjbHVzaXZlLCB0aWxlRW5kWEV4Y2x1c2l2ZSk7XG4gICAgICAgIGNvbnN0IGFuYWx5emVFbmRZRXhjbHVzaXZlID0gTWF0aC5taW4oYXJlYUVuZFlFeGNsdXNpdmUsIHRpbGVFbmRZRXhjbHVzaXZlKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGdsb2JhbFkgPSBhbmFseXplU3RhcnRZOyBnbG9iYWxZIDwgYW5hbHl6ZUVuZFlFeGNsdXNpdmU7IGdsb2JhbFkrKykge1xuICAgICAgICAgIGZvciAobGV0IGdsb2JhbFggPSBhbmFseXplU3RhcnRYOyBnbG9iYWxYIDwgYW5hbHl6ZUVuZFhFeGNsdXNpdmU7IGdsb2JhbFgrKykge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxYUmF3ID0gZ2xvYmFsWCAtIHRpbGVTdGFydFg7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFlSYXcgPSBnbG9iYWxZIC0gdGlsZVN0YXJ0WTtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsWCA9ICgobG9jYWxYUmF3ICUgMTAwMCkgKyAxMDAwKSAlIDEwMDA7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFkgPSAoKGxvY2FsWVJhdyAlIDEwMDApICsgMTAwMCkgJSAxMDAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBWZXJpZmljYXIgcXVlIGVzdGFtb3MgZGVudHJvIGRlIGxvcyBsXHUwMEVEbWl0ZXMgZGVsIHRpbGVcbiAgICAgICAgICAgIGlmIChsb2NhbFggPj0gMCAmJiBsb2NhbFggPCBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkUgJiYgXG4gICAgICAgICAgICAgICAgbG9jYWxZID49IDAgJiYgbG9jYWxZIDwgR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvLyBMYXMgY29vcmRlbmFkYXMgZGUgbGEgaW1hZ2VuIHNvbiAxOjEgY29uIGxhcyBjb29yZGVuYWRhcyBkZWwgdGlsZVxuICAgICAgICAgICAgICBpZiAobG9jYWxYIDwgY2FudmFzLndpZHRoICYmIGxvY2FsWSA8IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwaXhlbEluZGV4ID0gKGxvY2FsWSAqIGNhbnZhcy53aWR0aCArIGxvY2FsWCkgKiA0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBkYXRhW3BpeGVsSW5kZXhdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGcgPSBkYXRhW3BpeGVsSW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBiID0gZGF0YVtwaXhlbEluZGV4ICsgMl07XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IGRhdGFbcGl4ZWxJbmRleCArIDNdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChhID4gMCkgeyAvLyBQXHUwMEVEeGVsIHZpc2libGVcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb3Nlc3RDb2xvciA9IGZpbmRDbG9zZXN0Q29sb3IociwgZywgYiwgZ3VhcmRTdGF0ZS5hdmFpbGFibGVDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBwaXhlbE1hcC5zZXQoYCR7Z2xvYmFsWH0sJHtnbG9iYWxZfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgICByLCBnLCBiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9ySWQ6IGNsb3Nlc3RDb2xvci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxYLFxuICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbFksXG4gICAgICAgICAgICAgICAgICAgICAgbG9jYWxYLFxuICAgICAgICAgICAgICAgICAgICAgIGxvY2FsWSxcbiAgICAgICAgICAgICAgICAgICAgICB0aWxlWCxcbiAgICAgICAgICAgICAgICAgICAgICB0aWxlWVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nKGBcdTI3NEMgRXJyb3IgYW5hbGl6YW5kbyB0aWxlICR7dGlsZVh9LCR7dGlsZVl9OmAsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2coYFx1MjcwNSBBblx1MDBFMWxpc2lzIGNvbXBsZXRhZG86ICR7cGl4ZWxNYXAuc2l6ZX0gcFx1MDBFRHhlbGVzIHByb3RlZ2lkb3NgKTtcbiAgXG4gIC8vIFNpIG5vIGVuY29udHJhbW9zIHBcdTAwRUR4ZWxlcyBlbiBlbCBtYXBhLCBjcmVhciBcInZpcnR1YWxlc1wiIHNvbG8gc2kgZXN0XHUwMEUxIHBlcm1pdGlkbyAoY2FwdHVyYSlcbiAgaWYgKHBpeGVsTWFwLnNpemUgPT09IDApIHtcbiAgICBpZiAoYWxsb3dWaXJ0dWFsKSB7XG4gICAgICBsb2coYFx1MjZBMFx1RkUwRiBObyBzZSBlbmNvbnRyYXJvbiBwXHUwMEVEeGVsZXMgZXhpc3RlbnRlcywgY3JlYW5kbyBcdTAwRTFyZWEgdmlydHVhbCBwYXJhIHByb3RlY2NpXHUwMEYzbmApO1xuICAgICAgY29uc3QgYXJlYUVuZFhFeGNsdXNpdmUgPSB4MiArIDE7XG4gICAgICBjb25zdCBhcmVhRW5kWUV4Y2x1c2l2ZSA9IHkyICsgMTtcbiAgICAgIC8vIENyZWFyIGVudHJhZGFzIHZpcnR1YWxlcyBwYXJhIGNhZGEgcFx1MDBFRHhlbCBkZWwgXHUwMEUxcmVhIChpbmNsdXNpdm8pXG4gICAgICBmb3IgKGxldCBnbG9iYWxZID0geTE7IGdsb2JhbFkgPCBhcmVhRW5kWUV4Y2x1c2l2ZTsgZ2xvYmFsWSsrKSB7XG4gICAgICAgIGZvciAobGV0IGdsb2JhbFggPSB4MTsgZ2xvYmFsWCA8IGFyZWFFbmRYRXhjbHVzaXZlOyBnbG9iYWxYKyspIHtcbiAgICAgICAgICBjb25zdCB0aWxlWCA9IE1hdGguZmxvb3IoZ2xvYmFsWCAvIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRSk7XG4gICAgICAgICAgY29uc3QgdGlsZVkgPSBNYXRoLmZsb29yKGdsb2JhbFkgLyBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkUpO1xuICAgICAgICAgIGNvbnN0IGxvY2FsWFJhdyA9IGdsb2JhbFggLSAodGlsZVggKiBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkUpO1xuICAgICAgICAgIGNvbnN0IGxvY2FsWVJhdyA9IGdsb2JhbFkgLSAodGlsZVkgKiBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkUpO1xuICAgICAgICAgIGNvbnN0IGxvY2FsWCA9ICgobG9jYWxYUmF3ICUgMTAwMCkgKyAxMDAwKSAlIDEwMDA7XG4gICAgICAgICAgY29uc3QgbG9jYWxZID0gKChsb2NhbFlSYXcgJSAxMDAwKSArIDEwMDApICUgMTAwMDtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBVc2FyIGNvbG9yIGJsYW5jbyBwb3IgZGVmZWN0byAoSUQgNSkgcGFyYSBwXHUwMEVEeGVsZXMgdmFjXHUwMEVEb3NcbiAgICAgICAgICBwaXhlbE1hcC5zZXQoYCR7Z2xvYmFsWH0sJHtnbG9iYWxZfWAsIHtcbiAgICAgICAgICAgIHI6IDI1NSwgZzogMjU1LCBiOiAyNTUsIC8vIEJsYW5jbyBwb3IgZGVmZWN0b1xuICAgICAgICAgICAgY29sb3JJZDogNSwgLy8gSUQgY29ycmVjdG8gZGVsIGNvbG9yIGJsYW5jb1xuICAgICAgICAgICAgZ2xvYmFsWCxcbiAgICAgICAgICAgIGdsb2JhbFksXG4gICAgICAgICAgICBsb2NhbFgsXG4gICAgICAgICAgICBsb2NhbFksXG4gICAgICAgICAgICB0aWxlWCxcbiAgICAgICAgICAgIHRpbGVZXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgbG9nKGBcdTI3MDUgXHUwMEMxcmVhIHZpcnR1YWwgY3JlYWRhOiAke3BpeGVsTWFwLnNpemV9IHBcdTAwRUR4ZWxlcyBwYXJhIHByb3RlZ2VyYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZyhgXHUyMTM5XHVGRTBGIEFuXHUwMEUxbGlzaXMgdmFjXHUwMEVEbyB5IGZhbGxiYWNrIHZpcnR1YWwgZGVzaGFiaWxpdGFkbyAobW9kbyB2ZXJpZmljYWNpXHUwMEYzbilgKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBwaXhlbE1hcDtcbn1cblxuLy8gQWN0dWFsaXphciBlc3RhZFx1MDBFRHN0aWNhcyBkZSBhblx1MDBFMWxpc2lzIGVuIGxhIFVJIHByaW5jaXBhbFxuZnVuY3Rpb24gdXBkYXRlQW5hbHlzaXNTdGF0c0luVUkob3JpZ2luYWxQaXhlbHMsIGN1cnJlbnRQaXhlbHMpIHtcbiAgaWYgKCFndWFyZFN0YXRlLnVpIHx8ICFndWFyZFN0YXRlLnVpLnVwZGF0ZUFuYWx5c2lzU3RhdHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0b3RhbCA9IG9yaWdpbmFsUGl4ZWxzLnNpemU7XG4gIGxldCBjb3JyZWN0Q291bnQgPSAwO1xuICBsZXQgaW5jb3JyZWN0Q291bnQgPSAwO1xuICBsZXQgbWlzc2luZ0NvdW50ID0gMDtcblxuICBpZiAodG90YWwgPT09IDApIHtcbiAgICAvLyBObyBoYXkgcFx1MDBFRHhlbGVzIG9yaWdpbmFsZXMgcGFyYSBjb21wYXJhclxuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlQW5hbHlzaXNTdGF0cyh7XG4gICAgICBjb3JyZWN0OiAwLFxuICAgICAgaW5jb3JyZWN0OiAwLFxuICAgICAgbWlzc2luZzogMCxcbiAgICAgIGFjY3VyYWN5OiAwXG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ29tcGFyYXIgY2FkYSBwXHUwMEVEeGVsIG9yaWdpbmFsIGNvbiBlbCBhY3R1YWxcbiAgZm9yIChjb25zdCBba2V5LCBvcmlnaW5hbFBpeGVsXSBvZiBvcmlnaW5hbFBpeGVscykge1xuICAgIGNvbnN0IGN1cnJlbnRQaXhlbCA9IGN1cnJlbnRQaXhlbHMuZ2V0KGtleSk7XG4gICAgXG4gICAgaWYgKCFjdXJyZW50UGl4ZWwpIHtcbiAgICAgIC8vIFBcdTAwRUR4ZWwgZmFsdGFudGVcbiAgICAgIG1pc3NpbmdDb3VudCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDb21wYXJhciBjb2xvcmVzIHVzYW5kbyBlbCBtXHUwMEU5dG9kbyBjb25maWd1cmFkb1xuICAgICAgY29uc3QgY29tcGFyaXNvbk1ldGhvZCA9IGd1YXJkU3RhdGUuY29uZmlnPy5jb2xvckNvbXBhcmlzb25NZXRob2QgfHwgJ3JnYic7XG4gICAgICBjb25zdCB0aHJlc2hvbGQgPSBndWFyZFN0YXRlLmNvbmZpZz8uY29sb3JUaHJlc2hvbGQgfHwgMTA7XG4gICAgICBcbiAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IGNvbXBhcmVDb2xvcnMoY3VycmVudFBpeGVsLCBvcmlnaW5hbFBpeGVsLCBjb21wYXJpc29uTWV0aG9kLCB0aHJlc2hvbGQpO1xuICAgICAgXG4gICAgICBpZiAoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGluY29ycmVjdENvdW50Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3JyZWN0Q291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBhY2N1cmFjeSA9IHRvdGFsID4gMCA/ICgoY29ycmVjdENvdW50IC8gdG90YWwpICogMTAwKS50b0ZpeGVkKDEpIDogMDtcblxuICBndWFyZFN0YXRlLnVpLnVwZGF0ZUFuYWx5c2lzU3RhdHMoe1xuICAgIGNvcnJlY3Q6IGNvcnJlY3RDb3VudCxcbiAgICBpbmNvcnJlY3Q6IGluY29ycmVjdENvdW50LFxuICAgIG1pc3Npbmc6IG1pc3NpbmdDb3VudCxcbiAgICBhY2N1cmFjeTogYWNjdXJhY3lcbiAgfSk7XG59XG5cbi8vIERldGVjdGFyIGNhbWJpb3MgZW4gZWwgXHUwMEUxcmVhIHByb3RlZ2lkYVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrRm9yQ2hhbmdlcygpIHtcbiAgaWYgKCFndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhIHx8ICFndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLnNpemUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGN1cnJlbnRQaXhlbHMgPSBhd2FpdCBhbmFseXplQXJlYVBpeGVscyhndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhKTtcblxuICAgIC8vIFNpIGVsIGFuXHUwMEUxbGlzaXMgYWN0dWFsIGVzdFx1MDBFMSB2YWNcdTAwRURvIHBlcm8gdGVuZW1vcyBwXHUwMEVEeGVsZXMgb3JpZ2luYWxlcyB2aXJ0dWFsZXMsXG4gICAgLy8gZXN0byBzaWduaWZpY2EgcXVlIGVsIFx1MDBFMXJlYSBzaWd1ZSB2YWNcdTAwRURhIGNvbW8gc2UgZXNwZXJhYmFcbiAgICBpZiAoIWN1cnJlbnRQaXhlbHMgfHwgY3VycmVudFBpeGVscy5zaXplID09PSAwKSB7XG4gICAgICBpZiAoZ3VhcmRTdGF0ZS5pc1ZpcnR1YWxBcmVhKSB7XG4gICAgICAgIC8vIFx1MDBDMXJlYSB2aXJ0dWFsIHNpZ3VlIHZhY1x1MDBFRGEgY29tbyBzZSBlc3BlcmFiYSwgbm8gaGF5IGNhbWJpb3NcbiAgICAgICAgZ3VhcmRTdGF0ZS5sYXN0Q2hlY2sgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKCdcdTI3MDUgXHUwMEMxcmVhIHByb3RlZ2lkYSAtIHNpbiBjYW1iaW9zIChcdTAwRTFyZWEgdmlydHVhbCB2YWNcdTAwRURhKScsICdzdWNjZXNzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGVuZW1vcyBwXHUwMEVEeGVsZXMgb3JpZ2luYWxlcyByZWFsZXMgcGVybyBlbCBhblx1MDBFMWxpc2lzIGFjdHVhbCBlc3RcdTAwRTEgdmFjXHUwMEVEb1xuICAgICAgICAvLyBFc3RvIGluZGljYSBxdWUgbG9zIHBcdTAwRUR4ZWxlcyBmdWVyb24gYm9ycmFkb3NcbiAgICAgICAgbG9nKGBcdUQ4M0RcdURFQTggUFx1MDBFRHhlbGVzIG9yaWdpbmFsZXMgZGV0ZWN0YWRvcyBwZXJvIGFuXHUwMEUxbGlzaXMgYWN0dWFsIHZhY1x1MDBFRG8gLSBwXHUwMEVEeGVsZXMgZnVlcm9uIGJvcnJhZG9zYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlcyA9IG5ldyBNYXAoKTtcbiAgICBsZXQgY2hhbmdlZENvdW50ID0gMDtcblxuICAgIGlmIChndWFyZFN0YXRlLmlzVmlydHVhbEFyZWEgJiYgY3VycmVudFBpeGVscyAmJiBjdXJyZW50UGl4ZWxzLnNpemUgPiAwKSB7XG4gICAgICAvLyBDYXNvIGVzcGVjaWFsOiBcdTAwRTFyZWEgdmlydHVhbCAob3JpZ2luYWxtZW50ZSB2YWNcdTAwRURhKSBwZXJvIGFob3JhIHRpZW5lIHBcdTAwRUR4ZWxlc1xuICAgICAgLy8gVG9kb3MgbG9zIHBcdTAwRUR4ZWxlcyBhY3R1YWxlcyBzb24gXCJpbnRydXNvc1wiIHF1ZSBkZWJlbiBzZXIgYm9ycmFkb3NcbiAgICAgIGZvciAoY29uc3QgW2tleSwgY3VycmVudFBpeGVsXSBvZiBjdXJyZW50UGl4ZWxzKSB7XG4gICAgICAgIGNoYW5nZXMuc2V0KGtleSwge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0eXBlOiAnaW50cnVzaW9uJywgLy8gTnVldm8gdGlwbyBwYXJhIHBcdTAwRUR4ZWxlcyBxdWUgbm8gZGViZXJcdTAwRURhbiBlc3RhclxuICAgICAgICAgIG9yaWdpbmFsOiBudWxsLCAvLyBObyBoYXkgcFx1MDBFRHhlbCBvcmlnaW5hbCBlbiBcdTAwRTFyZWEgdmlydHVhbFxuICAgICAgICAgIGN1cnJlbnQ6IGN1cnJlbnRQaXhlbFxuICAgICAgICB9KTtcbiAgICAgICAgY2hhbmdlZENvdW50Kys7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENvbXBhcmFjaVx1MDBGM24gbm9ybWFsOiBwXHUwMEVEeGVsZXMgb3JpZ2luYWxlcyB2cyBhY3R1YWxlc1xuICAgICAgZm9yIChjb25zdCBba2V5LCBvcmlnaW5hbFBpeGVsXSBvZiBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQaXhlbCA9IGN1cnJlbnRQaXhlbHMuZ2V0KGtleSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWN1cnJlbnRQaXhlbCkge1xuICAgICAgICAgIC8vIFBcdTAwRUR4ZWwgZnVlIGJvcnJhZG9cbiAgICAgICAgICBjaGFuZ2VzLnNldChrZXksIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHR5cGU6ICdkZWxldGVkJyxcbiAgICAgICAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbFBpeGVsLFxuICAgICAgICAgICAgY3VycmVudDogbnVsbFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNoYW5nZWRDb3VudCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFBhcmEgcFx1MDBFRHhlbGVzIGRlIEpTT04gaW1wb3J0YWRvLCB1c2FyIGNvbXBhcmFjaVx1MDBGM24gbVx1MDBFMXMgdG9sZXJhbnRlXG4gICAgICAgICAgLy8gQ29tcGFyYXIgcHJpbWVybyBwb3IgY29sb3JJZCwgeSBzaSBubyBjb2luY2lkZSwgdmVyaWZpY2FyIHNpIGxvcyBjb2xvcmVzIHNvbiBzaW1pbGFyZXNcbiAgICAgICAgICBsZXQgaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGN1cnJlbnRQaXhlbC5jb2xvcklkICE9PSBvcmlnaW5hbFBpeGVsLmNvbG9ySWQpIHtcbiAgICAgICAgICAgIC8vIFVzYXIgZWwgbVx1MDBFOXRvZG8gZGUgY29tcGFyYWNpXHUwMEYzbiBjb25maWd1cmFkbyAoUkdCIG8gTEFCKVxuICAgICAgICAgICAgY29uc3QgY29tcGFyaXNvbk1ldGhvZCA9IGd1YXJkU3RhdGUuY29uZmlnPy5jb2xvckNvbXBhcmlzb25NZXRob2QgfHwgJ3JnYic7XG4gICAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBndWFyZFN0YXRlLmNvbmZpZz8uY29sb3JUaHJlc2hvbGQgfHwgMTA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlzQ2hhbmdlZCA9IGNvbXBhcmVDb2xvcnMoY3VycmVudFBpeGVsLCBvcmlnaW5hbFBpeGVsLCBjb21wYXJpc29uTWV0aG9kLCB0aHJlc2hvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLnNldChrZXksIHtcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICB0eXBlOiAnY2hhbmdlZCcsXG4gICAgICAgICAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbFBpeGVsLFxuICAgICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50UGl4ZWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hhbmdlZENvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWRDb3VudCA+IDApIHtcbiAgICAgIGxvZyhgXHVEODNEXHVERUE4IERldGVjdGFkb3MgJHtjaGFuZ2VkQ291bnR9IGNhbWJpb3MgZW4gZWwgXHUwMEUxcmVhIHByb3RlZ2lkYWApO1xuICAgICAgZ3VhcmRTdGF0ZS5jaGFuZ2VzID0gY2hhbmdlcztcbiAgICAgIFxuICAgICAgLy8gQWN0dWFsaXphciBVSVxuICAgICAgaWYgKGd1YXJkU3RhdGUudWkpIHtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoYFx1RDgzRFx1REVBOCAke2NoYW5nZWRDb3VudH0gY2FtYmlvcyBkZXRlY3RhZG9zYCwgJ3dhcm5pbmcnKTtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVQcm9ncmVzcyhjaGFuZ2VzLnNpemUsIGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSwgZ3VhcmRTdGF0ZS5pc1ZpcnR1YWxBcmVhKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFjdHVhbGl6YXIgZXN0YWRcdTAwRURzdGljYXMgZGUgYW5cdTAwRTFsaXNpc1xuICAgICAgICB1cGRhdGVBbmFseXNpc1N0YXRzSW5VSShndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLCBjdXJyZW50UGl4ZWxzKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gSW5pY2lhciByZXBhcmFjaVx1MDBGM24gYXV0b21cdTAwRTF0aWNhIHNpIGVzdFx1MDBFMSBoYWJpbGl0YWRhXG4gICAgICBpZiAoZ3VhcmRTdGF0ZS5ydW5uaW5nKSB7XG4gICAgICAgIGF3YWl0IHJlcGFpckNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFjdHVhbGl6YXIgdGltZXN0YW1wIGRlIFx1MDBGQWx0aW1hIHZlcmlmaWNhY2lcdTAwRjNuXG4gICAgICBndWFyZFN0YXRlLmxhc3RDaGVjayA9IERhdGUubm93KCk7XG4gICAgICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cygnXHUyNzA1IFx1MDBDMXJlYSBwcm90ZWdpZGEgLSBzaW4gY2FtYmlvcycsICdzdWNjZXNzJyk7XG4gICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlUHJvZ3Jlc3MoMCwgZ3VhcmRTdGF0ZS5vcmlnaW5hbFBpeGVscy5zaXplLCBndWFyZFN0YXRlLmlzVmlydHVhbEFyZWEpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWN0dWFsaXphciBlc3RhZFx1MDBFRHN0aWNhcyBkZSBhblx1MDBFMWxpc2lzIHRhbWJpXHUwMEU5biBjdWFuZG8gbm8gaGF5IGNhbWJpb3NcbiAgICAgICAgdXBkYXRlQW5hbHlzaXNTdGF0c0luVUkoZ3VhcmRTdGF0ZS5vcmlnaW5hbFBpeGVscywgY3VycmVudFBpeGVscyk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKGBcdTI3NEMgRXJyb3IgdmVyaWZpY2FuZG8gY2FtYmlvczpgLCBlcnJvcik7XG4gICAgaWYgKGd1YXJkU3RhdGUudWkpIHtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKGBcdTI3NEMgRXJyb3IgdmVyaWZpY2FuZG86ICR7ZXJyb3IubWVzc2FnZX1gLCAnZXJyb3InKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gUmVwYXJhciBsb3MgY2FtYmlvcyBkZXRlY3RhZG9zIC0gYWhvcmEgY29uIGdlc3RpXHUwMEYzbiBkZSBjYXJnYXMgbVx1MDBFRG5pbWFzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVwYWlyQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gIGlmIChjaGFuZ2VzLnNpemUgPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIC8vIEV2aXRhciBidWNsZXMgaW5maW5pdG9zIGRlbCBtb25pdG9yZW8gZGUgY2FyZ2FzXG4gIGlmIChfaXNSZXBhaXJpbmcpIHtcbiAgICBsb2coJ1x1RDgzRFx1REQwNCBSZXBhcmFjaVx1MDBGM24geWEgZW4gcHJvZ3Jlc28sIG9taXRpZW5kbyBsbGFtYWRhIGR1cGxpY2FkYScpO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgX2lzUmVwYWlyaW5nID0gdHJ1ZTtcbiAgXG4gIHRyeSB7XG5cbiAgY29uc3QgY2hhbmdlc0FycmF5ID0gQXJyYXkuZnJvbShjaGFuZ2VzLnZhbHVlcygpKTtcbiAgY29uc3QgYXZhaWxhYmxlQ2hhcmdlcyA9IE1hdGguZmxvb3IoZ3VhcmRTdGF0ZS5jdXJyZW50Q2hhcmdlcyk7XG4gIFxuICAvLyBTaSBubyBoYXkgY2FyZ2FzIHN1ZmljaWVudGVzIHBhcmEgcmVwYXJhciBuaSB1biBwXHUwMEVEeGVsLCBlc3BlcmFyXG4gIGlmIChhdmFpbGFibGVDaGFyZ2VzID09PSAwKSB7XG4gICAgbG9nKGBcdTI2QTBcdUZFMEYgU2luIGNhcmdhcyBkaXNwb25pYmxlcywgZXNwZXJhbmRvIHJlY2FyZ2EuLi5gKTtcbiAgICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoJ1x1MjZBMSBFc3BlcmFuZG8gY2FyZ2FzIHBhcmEgcmVwYXJhci4uLicsICd3YXJuaW5nJyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFNpIGhheSBkYVx1MDBGMW9zIHBlcm8gbWVub3MgY2FyZ2FzIHF1ZSBlbCBtXHUwMEVEbmltbyBjb25maWd1cmFkbywgZ2FzdGFyIHRvZGFzIGxhcyBkaXNwb25pYmxlc1xuICBjb25zdCBzaG91bGRSZXBhaXJBbGwgPSBhdmFpbGFibGVDaGFyZ2VzIDwgZ3VhcmRTdGF0ZS5taW5DaGFyZ2VzVG9XYWl0O1xuICBjb25zdCBtYXhSZXBhaXJzID0gc2hvdWxkUmVwYWlyQWxsIFxuICAgID8gYXZhaWxhYmxlQ2hhcmdlcyAgLy8gR2FzdGFyIHRvZGFzIGxhcyBjYXJnYXMgZGlzcG9uaWJsZXNcbiAgICA6IE1hdGgubWluKGNoYW5nZXNBcnJheS5sZW5ndGgsIGd1YXJkU3RhdGUucGl4ZWxzUGVyQmF0Y2gpOyAvLyBVc2FyIGxvdGUgbm9ybWFsXG4gIFxuICBsb2coYFx1RDgzRFx1REVFMFx1RkUwRiBDYXJnYXM6ICR7YXZhaWxhYmxlQ2hhcmdlc30sIE1cdTAwRURuaW1vOiAke2d1YXJkU3RhdGUubWluQ2hhcmdlc1RvV2FpdH0sIFJlcGFyYW5kbzogJHttYXhSZXBhaXJzfSBwXHUwMEVEeGVsZXNgKTtcbiAgXG4gIGlmIChndWFyZFN0YXRlLnVpKSB7XG4gICAgY29uc3QgcmVwYWlyTW9kZSA9IHNob3VsZFJlcGFpckFsbCA/IFwiIChnYXN0YW5kbyB0b2RhcyBsYXMgY2FyZ2FzKVwiIDogXCJcIjtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHVEODNEXHVERUUwXHVGRTBGIFJlcGFyYW5kbyAke21heFJlcGFpcnN9IHBcdTAwRUR4ZWxlcyR7cmVwYWlyTW9kZX0uLi5gLCAnaW5mbycpO1xuICB9XG4gIFxuICAvLyBTZWxlY2Npb25hciBwXHUwMEVEeGVsZXMgdXNhbmRvIGVsIHBhdHJcdTAwRjNuIGNvbmZpZ3VyYWRvXG4gIGNvbnN0IGNoYW5nZUtleXMgPSBBcnJheS5mcm9tKGNoYW5nZXMua2V5cygpKTtcbiAgY29uc3Qgc2VsZWN0ZWRLZXlzID0gZ2V0UGl4ZWxzQnlQYXR0ZXJuKGd1YXJkU3RhdGUucHJvdGVjdGlvblBhdHRlcm4sIG5ldyBTZXQoY2hhbmdlS2V5cyksIG1heFJlcGFpcnMpO1xuICBjb25zdCBwaXhlbHNUb1JlcGFpciA9IHNlbGVjdGVkS2V5cy5tYXAoa2V5ID0+IGNoYW5nZXMuZ2V0KGtleSkpO1xuICBcbiAgLy8gQWdydXBhciBjYW1iaW9zIHBvciB0aWxlIHBhcmEgZWZpY2llbmNpYVxuICBjb25zdCBjaGFuZ2VzQnlUaWxlID0gbmV3IE1hcCgpO1xuICBcbiAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgcGl4ZWxzVG9SZXBhaXIpIHtcbiAgICBsZXQgdGFyZ2V0UGl4ZWwsIHRhcmdldENvbG9ySWQ7XG4gICAgXG4gICAgaWYgKGNoYW5nZS50eXBlID09PSAnaW50cnVzaW9uJykge1xuICAgICAgLy8gUGFyYSBpbnRydXNpb25lcywgdXNhciBsYXMgY29vcmRlbmFkYXMgZGVsIHBcdTAwRUR4ZWwgYWN0dWFsIHBlcm8gcGludGFyIGRlIGJsYW5jb1xuICAgICAgdGFyZ2V0UGl4ZWwgPSBjaGFuZ2UuY3VycmVudDtcbiAgICAgIHRhcmdldENvbG9ySWQgPSA1OyAvLyBCbGFuY28gcGFyYSBib3JyYXIgbGEgaW50cnVzaVx1MDBGM25cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUGFyYSBjYW1iaW9zIG5vcm1hbGVzLCByZXN0YXVyYXIgYWwgY29sb3Igb3JpZ2luYWxcbiAgICAgIHRhcmdldFBpeGVsID0gY2hhbmdlLm9yaWdpbmFsO1xuICAgICAgdGFyZ2V0Q29sb3JJZCA9IGNoYW5nZS5vcmlnaW5hbC5jb2xvcklkO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB0aWxlS2V5ID0gYCR7dGFyZ2V0UGl4ZWwudGlsZVh9LCR7dGFyZ2V0UGl4ZWwudGlsZVl9YDtcbiAgICBcbiAgICBpZiAoIWNoYW5nZXNCeVRpbGUuaGFzKHRpbGVLZXkpKSB7XG4gICAgICBjaGFuZ2VzQnlUaWxlLnNldCh0aWxlS2V5LCBbXSk7XG4gICAgfVxuICAgIFxuICAgIGNoYW5nZXNCeVRpbGUuZ2V0KHRpbGVLZXkpLnB1c2goe1xuICAgICAgbG9jYWxYOiB0YXJnZXRQaXhlbC5sb2NhbFgsXG4gICAgICBsb2NhbFk6IHRhcmdldFBpeGVsLmxvY2FsWSxcbiAgICAgIGNvbG9ySWQ6IHRhcmdldENvbG9ySWQsXG4gICAgICBnbG9iYWxYOiB0YXJnZXRQaXhlbC5nbG9iYWxYLFxuICAgICAgZ2xvYmFsWTogdGFyZ2V0UGl4ZWwuZ2xvYmFsWSxcbiAgICAgIGNoYW5nZVR5cGU6IGNoYW5nZS50eXBlXG4gICAgfSk7XG4gIH1cbiAgXG4gIGxldCB0b3RhbFJlcGFpcmVkID0gMDtcbiAgXG4gIC8vIFJlcGFyYXIgcG9yIGxvdGVzIGRlIHRpbGVcbiAgZm9yIChjb25zdCBbdGlsZUtleSwgdGlsZUNoYW5nZXNdIG9mIGNoYW5nZXNCeVRpbGUpIHtcbiAgICBjb25zdCBbdGlsZVgsIHRpbGVZXSA9IHRpbGVLZXkuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29vcmRzID0gW107XG4gICAgICBjb25zdCBjb2xvcnMgPSBbXTtcbiAgICAgIFxuICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgdGlsZUNoYW5nZXMpIHtcbiAgICAgICAgY29vcmRzLnB1c2goY2hhbmdlLmxvY2FsWCwgY2hhbmdlLmxvY2FsWSk7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNoYW5nZS5jb2xvcklkKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcGFpbnRQaXhlbEJhdGNoKHRpbGVYLCB0aWxlWSwgY29vcmRzLCBjb2xvcnMpO1xuICAgICAgXG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0LnBhaW50ZWQgPiAwKSB7XG4gICAgICAgIHRvdGFsUmVwYWlyZWQgKz0gcmVzdWx0LnBhaW50ZWQ7XG4gICAgICAgIGd1YXJkU3RhdGUuY3VycmVudENoYXJnZXMgPSBNYXRoLm1heCgwLCBndWFyZFN0YXRlLmN1cnJlbnRDaGFyZ2VzIC0gcmVzdWx0LnBhaW50ZWQpO1xuICAgICAgICBndWFyZFN0YXRlLnRvdGFsUmVwYWlyZWQgKz0gcmVzdWx0LnBhaW50ZWQ7XG4gICAgICAgIFxuICAgICAgICAvLyBSZW1vdmVyIGNhbWJpb3MgcmVwYXJhZG9zIGV4aXRvc2FtZW50ZVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5wYWludGVkICYmIGkgPCB0aWxlQ2hhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNoYW5nZSA9IHRpbGVDaGFuZ2VzW2ldO1xuICAgICAgICAgIGNvbnN0IGtleSA9IGAke2NoYW5nZS5nbG9iYWxYfSwke2NoYW5nZS5nbG9iYWxZfWA7XG4gICAgICAgICAgZ3VhcmRTdGF0ZS5jaGFuZ2VzLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsb2coYFx1MjcwNSBSZXBhcmFkb3MgJHtyZXN1bHQucGFpbnRlZH0gcFx1MDBFRHhlbGVzIGVuIHRpbGUgKCR7dGlsZVh9LCR7dGlsZVl9KWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nKGBcdTI3NEMgRXJyb3IgcmVwYXJhbmRvIHRpbGUgKCR7dGlsZVh9LCR7dGlsZVl9KTpgLCByZXN1bHQuZXJyb3IpO1xuICAgICAgfVxuICAgICAgXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZyhgXHUyNzRDIEVycm9yIHJlcGFyYW5kbyB0aWxlICgke3RpbGVYfSwke3RpbGVZfSk6YCwgZXJyb3IpO1xuICAgIH1cbiAgICBcbiAgICAvLyBQYXVzYSBlbnRyZSB0aWxlcyBwYXJhIGV2aXRhciByYXRlIGxpbWl0aW5nXG4gICAgaWYgKGNoYW5nZXNCeVRpbGUuc2l6ZSA+IDEpIHtcbiAgICAgIGF3YWl0IHNsZWVwKDUwMCk7XG4gICAgfVxuICB9XG4gIFxuICBjb25zdCByZW1haW5pbmdDaGFyZ2VzID0gTWF0aC5mbG9vcihndWFyZFN0YXRlLmN1cnJlbnRDaGFyZ2VzKTtcbiAgY29uc3QgcmVtYWluaW5nQ2hhbmdlcyA9IGd1YXJkU3RhdGUuY2hhbmdlcy5zaXplO1xuICBcbiAgbG9nKGBcdUQ4M0RcdURFRTBcdUZFMEYgUmVwYXJhY2lcdTAwRjNuIGNvbXBsZXRhZGE6ICR7dG90YWxSZXBhaXJlZH0gcFx1MDBFRHhlbGVzIHJlcGFyYWRvcywgJHtyZW1haW5pbmdDaGFyZ2VzfSBjYXJnYXMgcmVzdGFudGVzYCk7XG4gIFxuICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgIGlmIChyZW1haW5pbmdDaGFuZ2VzID4gMCAmJiByZW1haW5pbmdDaGFyZ2VzIDwgZ3VhcmRTdGF0ZS5taW5DaGFyZ2VzVG9XYWl0KSB7XG4gICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHUyM0YzIEVzcGVyYW5kbyAke2d1YXJkU3RhdGUubWluQ2hhcmdlc1RvV2FpdH0gY2FyZ2FzIHBhcmEgY29udGludWFyICgke3JlbWFpbmluZ0NoYXJnZXN9IGFjdHVhbGVzKWAsICd3YXJuaW5nJyk7XG4gICAgICBcbiAgICAgIC8vIENhbGN1bGFyIHRpZW1wbyBlc3RpbWFkbyBwYXJhIGxhIHByXHUwMEYzeGltYSBjYXJnYVxuICAgICAgY29uc3QgY2hhcmdlc05lZWRlZCA9IGd1YXJkU3RhdGUubWluQ2hhcmdlc1RvV2FpdCAtIHJlbWFpbmluZ0NoYXJnZXM7XG4gICAgICBjb25zdCB0aW1lVG9XYWl0ID0gY2hhcmdlc05lZWRlZCAqIENIQVJHRV9SRUdFTkVSQVRJT05fVElNRTtcbiAgICAgIF9uZXh0Q2hhcmdlVGltZSA9IERhdGUubm93KCkgKyB0aW1lVG9XYWl0O1xuICAgICAgXG4gICAgICAvLyBJbmljaWFyIGNvbnRhZG9yIGRlIHRpZW1wb1xuICAgICAgc3RhcnRDb3VudGRvd25UaW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHUyNzA1IFJlcGFyYWRvcyAke3RvdGFsUmVwYWlyZWR9IHBcdTAwRUR4ZWxlcyBjb3JyZWN0YW1lbnRlYCwgJ3N1Y2Nlc3MnKTtcbiAgICAgIFxuICAgICAgLy8gRGV0ZW5lciBjb250YWRvciBzaSBlc3RcdTAwRTEgYWN0aXZvXG4gICAgICBzdG9wQ291bnRkb3duVGltZXIoKTtcbiAgICB9XG4gICAgXG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0cyh7XG4gICAgICBjaGFyZ2VzOiByZW1haW5pbmdDaGFyZ2VzLFxuICAgICAgcmVwYWlyZWQ6IGd1YXJkU3RhdGUudG90YWxSZXBhaXJlZCxcbiAgICAgIHBlbmRpbmc6IHJlbWFpbmluZ0NoYW5nZXNcbiAgICB9KTtcbiAgfVxuICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coYFx1Mjc0QyBFcnJvciBlbiByZXBhcmFjaVx1MDBGM246ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBfaXNSZXBhaXJpbmcgPSBmYWxzZTtcbiAgfVxufVxuXG4vLyBQaW50YXIgbVx1MDBGQWx0aXBsZXMgcFx1MDBFRHhlbGVzIGVuIHVuIHNvbG8gdGlsZVxuYXN5bmMgZnVuY3Rpb24gcGFpbnRQaXhlbEJhdGNoKHRpbGVYLCB0aWxlWSwgY29vcmRzLCBjb2xvcnMpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGVuc3VyZVRva2VuKCk7XG5cbiAgICAvLyBTYW5pdGl6YXIgY29vcmRlbmFkYXMgYSByYW5nbyAwLi45OTlcbiAgICBjb25zdCBzYW5pdGl6ZWRDb29yZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgY29uc3QgeCA9ICgoTnVtYmVyKGNvb3Jkc1tpXSkgJSAxMDAwKSArIDEwMDApICUgMTAwMDtcbiAgICAgIGNvbnN0IHkgPSAoKE51bWJlcihjb29yZHNbaSArIDFdKSAlIDEwMDApICsgMTAwMCkgJSAxMDAwO1xuICAgICAgc2FuaXRpemVkQ29vcmRzLnB1c2goeCwgeSk7XG4gICAgfVxuXG4gICAgLy8gTG9nIGRlIGRpYWduXHUwMEYzc3RpY28gKG11ZXN0cmEgaGFzdGEgMyBwYXJlcylcbiAgICBjb25zdCBwcmV2aWV3UGFpcnMgPSBzYW5pdGl6ZWRDb29yZHMuc2xpY2UoMCwgNikuam9pbignLCcpO1xuICAgIGxvZyhgW0FQSV0gRW52aWFuZG8gbG90ZSBhIHRpbGUgJHt0aWxlWH0sJHt0aWxlWX0gY29uICR7Y29sb3JzLmxlbmd0aH0gcFx1MDBFRHhlbGVzLiBFamVtcGxvIGNvb3JkczogJHtwcmV2aWV3UGFpcnN9YCk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHBvc3RQaXhlbEJhdGNoSW1hZ2UoXG4gICAgICB0aWxlWCxcbiAgICAgIHRpbGVZLFxuICAgICAgc2FuaXRpemVkQ29vcmRzLFxuICAgICAgY29sb3JzLFxuICAgICAgdG9rZW5cbiAgICApO1xuXG4gICAgY29uc3QgcGFpbnRlZCA9ICh0eXBlb2YgcmVzcG9uc2UucGFpbnRlZCA9PT0gJ251bWJlcicpXG4gICAgICA/IHJlc3BvbnNlLnBhaW50ZWRcbiAgICAgIDogKHR5cGVvZiByZXNwb25zZS5qc29uPy5wYWludGVkID09PSAnbnVtYmVyJyA/IHJlc3BvbnNlLmpzb24ucGFpbnRlZCA6IDApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlLnN1Y2Nlc3MsXG4gICAgICBwYWludGVkOiBwYWludGVkLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBlcnJvcjogcmVzcG9uc2Uuc3VjY2VzcyA/IG51bGwgOiAocmVzcG9uc2UuanNvbj8ubWVzc2FnZSB8fCByZXNwb25zZS5qc29uPy5lcnJvciB8fCAnRXJyb3IgZGVzY29ub2NpZG8nKVxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgcGFpbnRlZDogMCxcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlXG4gICAgfTtcbiAgfVxufVxuXG4vLyBQaW50YXIgdW4gcFx1MDBFRHhlbCBpbmRpdmlkdWFsXG5cbiIsICIvLyBWZW50YW5hIGRlIGFuXHUwMEUxbGlzaXMgcGFyYSBzdXBlcnBvbmVyIEpTT04gc29icmUgY2FudmFzIGFjdHVhbFxuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vY29yZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgZ3VhcmRTdGF0ZSB9IGZyb20gJy4vY29uZmlnLmpzJztcbmltcG9ydCB7IGFuYWx5emVBcmVhUGl4ZWxzIH0gZnJvbSAnLi9wcm9jZXNzb3IuanMnO1xuXG4vLyBWYXJpYWJsZXMgZ2xvYmFsZXMgcGFyYSBsYSB2ZW50YW5hXG5sZXQgYW5hbHlzaXNXaW5kb3dJbnN0YW5jZSA9IG51bGw7XG5sZXQgYXV0b1JlZnJlc2hJbnRlcnZhbCA9IG51bGw7XG5cblxuXG4vLyBDZXJyYXIgdmVudGFuYSBkZSBhblx1MDBFMWxpc2lzXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VBbmFseXNpc1dpbmRvdygpIHtcbiAgaWYgKGFuYWx5c2lzV2luZG93SW5zdGFuY2UpIHtcbiAgICAvLyBMaW1waWFyIGludGVydmFsIHNpIGV4aXN0ZVxuICAgICBpZiAoYXV0b1JlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGF1dG9SZWZyZXNoSW50ZXJ2YWwpO1xuICAgICAgIGF1dG9SZWZyZXNoSW50ZXJ2YWwgPSBudWxsO1xuICAgICB9XG4gICAgXG4gICAgLy8gUmVtb3ZlciBsYSB2ZW50YW5hIGRlbCBET01cbiAgICBpZiAoYW5hbHlzaXNXaW5kb3dJbnN0YW5jZS5hbmFseXNpc1dpbmRvdyAmJiBhbmFseXNpc1dpbmRvd0luc3RhbmNlLmFuYWx5c2lzV2luZG93LnBhcmVudE5vZGUpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYW5hbHlzaXNXaW5kb3dJbnN0YW5jZS5hbmFseXNpc1dpbmRvdyk7XG4gICAgfVxuICAgIFxuICAgIC8vIExpbXBpYXIgcmVmZXJlbmNpYVxuICAgIGFuYWx5c2lzV2luZG93SW5zdGFuY2UgPSBudWxsO1xuICAgIFxuICAgIGxvZygnXHVEODNEXHVERDBEIFZlbnRhbmEgZGUgYW5cdTAwRTFsaXNpcyBjZXJyYWRhJyk7XG4gIH1cbn1cblxuLy8gQ3JlYXIgdmVudGFuYSBkZSBhblx1MDBFMWxpc2lzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQW5hbHlzaXNXaW5kb3coKSB7XG4gIC8vIFZlcmlmaWNhciBxdWUgaGF5IGRhdG9zIHBhcmEgYW5hbGl6YXJcbiAgaWYgKCFndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhIHx8ICFndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLnNpemUpIHtcbiAgICBhbGVydCgnXHUyNzRDIE5vIGhheSBcdTAwRTFyZWEgcHJvdGVnaWRhIG8gcFx1MDBFRHhlbGVzIGNhcmdhZG9zIHBhcmEgYW5hbGl6YXInKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBTaSB5YSBleGlzdGUgdW5hIHZlbnRhbmEsIGxhIGNlcnJhbW9zXG4gIGlmIChhbmFseXNpc1dpbmRvd0luc3RhbmNlKSB7XG4gICAgY2xvc2VBbmFseXNpc1dpbmRvdygpO1xuICB9XG5cbiAgLy8gQ3JlYXIgdmVudGFuYSBkZSBhblx1MDBFMWxpc2lzIGRpcmVjdGFtZW50ZSAoc2luIG92ZXJsYXkgZGUgZm9uZG8pXG4gIGNvbnN0IGFuYWx5c2lzV2luZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFuYWx5c2lzV2luZG93LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGxlZnQ6IDUwcHg7XG4gICAgdG9wOiA1MHB4O1xuICAgIHdpZHRoOiAxMjAwcHg7XG4gICAgaGVpZ2h0OiA4MDBweDtcbiAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICMzMzM7XG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3gtc2hhZG93OiAwIDEwcHggMzBweCByZ2JhKDAsMCwwLDAuNSk7XG4gICAgei1pbmRleDogMTAwMDAyO1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMHB4KTtcbiAgYDtcblxuICAvLyBIZWFkZXIgZGUgbGEgdmVudGFuYVxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaGVhZGVyLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcGFkZGluZzogMTVweCAyMHB4O1xuICAgIGJhY2tncm91bmQ6ICMyZDM3NDg7XG4gICAgY29sb3I6ICM2MGE1ZmE7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMzMztcbiAgICBjdXJzb3I6IG1vdmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGA7XG4gIGhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDtcIj5cbiAgICAgIFx1RDgzRFx1REQwRCA8c3Bhbj5Bblx1MDBFMWxpc2lzIGRlIERpZmVyZW5jaWFzIC0gSlNPTiB2cyBDYW52YXMgQWN0dWFsPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxidXR0b24gaWQ9XCJjbG9zZUFuYWx5c2lzQnRuXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiBub25lOyBib3JkZXI6IG5vbmU7IGNvbG9yOiAjZWVlOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMjBweDsgcGFkZGluZzogNXB4O1wiPlx1Mjc0QzwvYnV0dG9uPlxuICBgO1xuXG4gIC8vIFx1MDBDMXJlYSBkZSBjb250ZW5pZG8gcHJpbmNpcGFsXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGVudC5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIGZsZXg6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICBgO1xuXG4gIC8vIFBhbmVsIGRlIGNvbnRyb2xlc1xuICBjb25zdCBjb250cm9sUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udHJvbFBhbmVsLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgd2lkdGg6IDMwMHB4O1xuICAgIGJhY2tncm91bmQ6ICMyZDM3NDg7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMzMzO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgY29sb3I6ICNlZWU7XG4gICAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZjtcbiAgYDtcblxuICBjb250cm9sUGFuZWwuaW5uZXJIVE1MID0gYFxuICAgIDxoMyBzdHlsZT1cIm1hcmdpbjogMCAwIDE1cHggMDsgY29sb3I6ICM2MGE1ZmE7XCI+XHVEODNEXHVEQ0NBIEVzdGFkXHUwMEVEc3RpY2FzPC9oMz5cbiAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogIzM3NDE1MTsgcGFkZGluZzogMTVweDsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxuICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDEwcHg7XCI+XG4gICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMxMGI5ODE7XCI+XHUyNzA1IFBcdTAwRUR4ZWxlcyBDb3JyZWN0b3M6PC9zcGFuPlxuICAgICAgICA8c3BhbiBpZD1cImNvcnJlY3RQaXhlbHNcIiBzdHlsZT1cImZsb2F0OiByaWdodDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+LTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDEwcHg7XCI+XG4gICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICNlZjQ0NDQ7XCI+XHUyNzRDIFBcdTAwRUR4ZWxlcyBJbmNvcnJlY3Rvczo8L3NwYW4+XG4gICAgICAgIDxzcGFuIGlkPVwiaW5jb3JyZWN0UGl4ZWxzXCIgc3R5bGU9XCJmbG9hdDogcmlnaHQ7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPi08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxMHB4O1wiPlxuICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjZjU5ZTBiO1wiPlx1MjZBQSBQXHUwMEVEeGVsZXMgRmFsdGFudGVzOjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gaWQ9XCJtaXNzaW5nUGl4ZWxzXCIgc3R5bGU9XCJmbG9hdDogcmlnaHQ7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPi08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICM4YjVjZjY7XCI+XHVEODNDXHVERkFGIFByZWNpc2lcdTAwRjNuOjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gaWQ9XCJhY2N1cmFjeVwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0OyBmb250LXdlaWdodDogYm9sZDtcIj4tPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8aDMgc3R5bGU9XCJtYXJnaW46IDAgMCAxNXB4IDA7IGNvbG9yOiAjNjBhNWZhO1wiPlx1RDgzQ1x1REZBOCBWaXN1YWxpemFjaVx1MDBGM248L2gzPlxuICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjMzc0MTUxOyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbi1ib3R0b206IDIwcHg7XCI+XG4gICAgICA8bGFiZWwgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAxMHB4OyBjdXJzb3I6IHBvaW50ZXI7XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInNob3dDb3JyZWN0XCIgY2hlY2tlZCBzdHlsZT1cIm1hcmdpbi1yaWdodDogOHB4O1wiPlxuICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMTBiOTgxO1wiPlx1MjcwNSBNb3N0cmFyIENvcnJlY3Rvczwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8bGFiZWwgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAxMHB4OyBjdXJzb3I6IHBvaW50ZXI7XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInNob3dJbmNvcnJlY3RcIiBjaGVja2VkIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiA4cHg7XCI+XG4gICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICNlZjQ0NDQ7XCI+XHUyNzRDIE1vc3RyYXIgSW5jb3JyZWN0b3M8L3NwYW4+XG4gICAgICA8L2xhYmVsPlxuICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMTBweDsgY3Vyc29yOiBwb2ludGVyO1wiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJzaG93TWlzc2luZ1wiIGNoZWNrZWQgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDhweDtcIj5cbiAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogI2Y1OWUwYjtcIj5cdTI2QUEgTW9zdHJhciBGYWx0YW50ZXM8L3NwYW4+XG4gICAgICA8L2xhYmVsPlxuXG4gICAgPC9kaXY+XG5cbiAgICA8aDMgc3R5bGU9XCJtYXJnaW46IDAgMCAxNXB4IDA7IGNvbG9yOiAjNjBhNWZhO1wiPlx1MjY5OVx1RkUwRiBDb25maWd1cmFjaVx1MDBGM248L2gzPlxuICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjMzc0MTUxOyBwYWRkaW5nOiAxNXB4OyBib3JkZXItcmFkaXVzOiA4cHg7XCI+XG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTVweDtcIj5cbiAgICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDVweDsgZm9udC1zaXplOiAxNHB4O1wiPlx1RDgzRFx1REQwRCBab29tOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cInpvb21TbGlkZXJcIiBtaW49XCIwLjVcIiBtYXg9XCI1XCIgc3RlcD1cIjAuMVwiIHZhbHVlPVwiMVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7XCI+XG4gICAgICAgIDxzcGFuIGlkPVwiem9vbVZhbHVlXCIgc3R5bGU9XCJmb250LXNpemU6IDEycHg7IGNvbG9yOiAjY2JkNWUwO1wiPjEwMCU8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxuICAgICAgICA8bGFiZWwgc3R5bGU9XCJkaXNwbGF5OiBibG9jazsgbWFyZ2luLWJvdHRvbTogNXB4OyBmb250LXNpemU6IDE0cHg7XCI+XHVEODNDXHVERjlBXHVGRTBGIE9wYWNpZGFkOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cIm9wYWNpdHlTbGlkZXJcIiBtaW49XCIwLjFcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMVwiIHZhbHVlPVwiMC44XCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIj5cbiAgICAgICAgPHNwYW4gaWQ9XCJvcGFjaXR5VmFsdWVcIiBzdHlsZT1cImZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICNjYmQ1ZTA7XCI+ODAlPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTVweDtcIj5cbiAgICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMTBweDsgY3Vyc29yOiBwb2ludGVyO1wiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImF1dG9SZWZyZXNoXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDhweDtcIj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjNjBhNWZhO1wiPlx1RDgzRFx1REQwNCBBdXRvLXJlZnJlc2NvPC9zcGFuPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxMHB4O1wiPlxuICAgICAgICAgIDxsYWJlbCBzdHlsZT1cImZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICNjYmQ1ZTA7XCI+SW50ZXJ2YWxvIChzKTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCJyZWZyZXNoSW50ZXJ2YWxcIiBtaW49XCIxXCIgbWF4PVwiNjBcIiB2YWx1ZT1cIjVcIiBzdHlsZT1cIndpZHRoOiA2MHB4OyBwYWRkaW5nOiA0cHg7IGJhY2tncm91bmQ6ICM0YjU1NjM7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiAxcHggc29saWQgIzZiNzI4MDsgYm9yZGVyLXJhZGl1czogNHB4O1wiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBpZD1cInJlZnJlc2hBbmFseXNpc1wiIHN0eWxlPVwid2lkdGg6IDEwMCU7IHBhZGRpbmc6IDEwcHg7IGJhY2tncm91bmQ6ICM2MGE1ZmE7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA2cHg7IGZvbnQtd2VpZ2h0OiA2MDA7IGN1cnNvcjogcG9pbnRlcjtcIj5cbiAgICAgICAgXHVEODNEXHVERDA0IEFjdHVhbGl6YXIgQW5cdTAwRTFsaXNpc1xuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGlkPVwiYXV0b0ZpdFpvb21cIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBwYWRkaW5nOiA4cHg7IGJhY2tncm91bmQ6ICMxMGI5ODE7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA2cHg7IGZvbnQtd2VpZ2h0OiA2MDA7IGN1cnNvcjogcG9pbnRlcjsgbWFyZ2luLXRvcDogOHB4O1wiPlxuICAgICAgICBcdUQ4M0RcdURDRDAgQWp1c3RhciBab29tXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICAvLyBcdTAwQzFyZWEgZGVsIGNhbnZhc1xuICBjb25zdCBjYW52YXNBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNhbnZhc0FyZWEuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBmbGV4OiAxO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBiYWNrZ3JvdW5kOiAjMTExO1xuICBgO1xuXG4gIC8vIENhbnZhcyBwYXJhIGxhIHZpc3VhbGl6YWNpXHUwMEYzblxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY2FudmFzLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7XG4gICAgY3Vyc29yOiBjcm9zc2hhaXI7XG4gIGA7XG5cbiAgLy8gSGFuZGxlIGRlIHJlZGltZW5zaW9uYW1pZW50b1xuICBjb25zdCByZXNpemVIYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcmVzaXplSGFuZGxlLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgY3Vyc29yOiBzZS1yZXNpemU7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KC00NWRlZywgdHJhbnNwYXJlbnQgMzAlLCByZ2JhKDI1NSwyNTUsMjU1LDAuMykgMzAlLCByZ2JhKDI1NSwyNTUsMjU1LDAuMykgNzAlLCB0cmFuc3BhcmVudCA3MCUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDAgMCAxMnB4IDA7XG4gICAgei1pbmRleDogMTtcbiAgYDtcblxuICAvLyBFbnNhbWJsYXIgbGEgdmVudGFuYVxuICBjb250ZW50LmFwcGVuZENoaWxkKGNvbnRyb2xQYW5lbCk7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY2FudmFzQXJlYSk7XG4gIGNhbnZhc0FyZWEuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgYW5hbHlzaXNXaW5kb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgYW5hbHlzaXNXaW5kb3cuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIGFuYWx5c2lzV2luZG93LmFwcGVuZENoaWxkKHJlc2l6ZUhhbmRsZSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYW5hbHlzaXNXaW5kb3cpO1xuXG4gIC8vIEluaWNpYWxpemFyIGVsIGFuXHUwMEUxbGlzaXNcbiAgaW5pdGlhbGl6ZUFuYWx5c2lzKGNhbnZhcywgY29udHJvbFBhbmVsKTtcblxuICAvLyBHdWFyZGFyIHJlZmVyZW5jaWEgZGUgbGEgaW5zdGFuY2lhXG4gIGFuYWx5c2lzV2luZG93SW5zdGFuY2UgPSB7IGFuYWx5c2lzV2luZG93LCBjYW52YXMsIGNvbnRyb2xQYW5lbCB9O1xuXG4gIC8vIEV2ZW50IGxpc3RlbmVyc1xuICBoZWFkZXIucXVlcnlTZWxlY3RvcignI2Nsb3NlQW5hbHlzaXNCdG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlQW5hbHlzaXNXaW5kb3cpO1xuXG4gIC8vIENvbWVudGFkbzogTm8gY2VycmFyIGFsIGhhY2VyIGNsaWMgZnVlcmEgZGUgbGEgdmVudGFuYVxuICAvLyBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgLy8gICBpZiAoZS50YXJnZXQgPT09IG92ZXJsYXkpIHtcbiAgLy8gICAgIGNsb3NlQW5hbHlzaXNXaW5kb3coKTtcbiAgLy8gICB9XG4gIC8vIH0pO1xuXG4gIC8vIEZ1bmNpb25hbGlkYWQgZGUgYXJyYXN0cmVcbiAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgbGV0IGRyYWdPZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcblxuICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuaWQgIT09ICdjbG9zZUFuYWx5c2lzQnRuJykge1xuICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICBjb25zdCByZWN0ID0gYW5hbHlzaXNXaW5kb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBkcmFnT2Zmc2V0LnggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICBkcmFnT2Zmc2V0LnkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZURyYWcpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BEcmFnKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZURyYWcoZSkge1xuICAgIGlmIChpc0RyYWdnaW5nKSB7XG4gICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gZHJhZ09mZnNldC54O1xuICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGRyYWdPZmZzZXQueTtcbiAgICAgIGFuYWx5c2lzV2luZG93LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGFuYWx5c2lzV2luZG93LnN0eWxlLmxlZnQgPSBgJHtNYXRoLm1heCgwLCBNYXRoLm1pbih4LCB3aW5kb3cuaW5uZXJXaWR0aCAtIGFuYWx5c2lzV2luZG93Lm9mZnNldFdpZHRoKSl9cHhgO1xuICAgICAgYW5hbHlzaXNXaW5kb3cuc3R5bGUudG9wID0gYCR7TWF0aC5tYXgoMCwgTWF0aC5taW4oeSwgd2luZG93LmlubmVySGVpZ2h0IC0gYW5hbHlzaXNXaW5kb3cub2Zmc2V0SGVpZ2h0KSl9cHhgO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3BEcmFnKCkge1xuICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZURyYWcpO1xuICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcERyYWcpO1xuICAgfVxuXG4gICAvLyBGdW5jaW9uYWxpZGFkIGRlIHJlZGltZW5zaW9uYW1pZW50b1xuICAgbGV0IGlzUmVzaXppbmcgPSBmYWxzZTtcbiAgIGxldCBzdGFydFgsIHN0YXJ0WSwgc3RhcnRXaWR0aCwgc3RhcnRIZWlnaHQ7XG5cbiAgIHJlc2l6ZUhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICBpc1Jlc2l6aW5nID0gdHJ1ZTtcbiAgICAgc3RhcnRYID0gZS5jbGllbnRYO1xuICAgICBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgIHN0YXJ0V2lkdGggPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGFuYWx5c2lzV2luZG93KS53aWR0aCwgMTApO1xuICAgICBzdGFydEhlaWdodCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoYW5hbHlzaXNXaW5kb3cpLmhlaWdodCwgMTApO1xuICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVSZXNpemUpO1xuICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcFJlc2l6ZSk7XG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgIH0pO1xuXG4gICBmdW5jdGlvbiBoYW5kbGVSZXNpemUoZSkge1xuICAgICBpZiAoaXNSZXNpemluZykge1xuICAgICAgIGNvbnN0IG5ld1dpZHRoID0gTWF0aC5tYXgoNjAwLCBzdGFydFdpZHRoICsgZS5jbGllbnRYIC0gc3RhcnRYKTtcbiAgICAgICBjb25zdCBuZXdIZWlnaHQgPSBNYXRoLm1heCg0MDAsIHN0YXJ0SGVpZ2h0ICsgZS5jbGllbnRZIC0gc3RhcnRZKTtcbiAgICAgICBhbmFseXNpc1dpbmRvdy5zdHlsZS53aWR0aCA9IG5ld1dpZHRoICsgJ3B4JztcbiAgICAgICBhbmFseXNpc1dpbmRvdy5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyAncHgnO1xuICAgICB9XG4gICB9XG5cbiAgIGZ1bmN0aW9uIHN0b3BSZXNpemUoKSB7XG4gICAgIGlzUmVzaXppbmcgPSBmYWxzZTtcbiAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlUmVzaXplKTtcbiAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BSZXNpemUpO1xuICAgfVxuXG4gICByZXR1cm4geyBhbmFseXNpc1dpbmRvdywgY2FudmFzLCBjb250cm9sUGFuZWwgfTtcbn1cblxuLy8gSW5pY2lhbGl6YXIgZWwgYW5cdTAwRTFsaXNpcyB5IHZpc3VhbGl6YWNpXHUwMEYzblxuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZUFuYWx5c2lzKGNhbnZhcywgY29udHJvbFBhbmVsKSB7XG4gIHRyeSB7XG4gICAgbG9nKCdcdUQ4M0RcdUREMEQgSW5pY2lhbmRvIGFuXHUwMEUxbGlzaXMgZGUgZGlmZXJlbmNpYXMuLi4nKTtcbiAgICBcbiAgICAvLyBEZWJ1ZzogVmVyaWZpY2FyIGVzdGFkbyBpbmljaWFsXG4gICAgbG9nKGBcdUQ4M0RcdURDQ0QgXHUwMEMxcmVhIGRlIHByb3RlY2NpXHUwMEYzbjpgLCBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhKTtcbiAgICBsb2coYFx1RDgzRFx1RENDQSBQXHUwMEVEeGVsZXMgb3JpZ2luYWxlcyBlbiBndWFyZFN0YXRlOiAke2d1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHM/LnNpemUgfHwgMH1gKTtcbiAgICBsb2coYFx1RDgzQ1x1REZBOCBDb2xvcmVzIGRpc3BvbmlibGVzOiAke2d1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzPy5sZW5ndGggfHwgMH1gKTtcbiAgICBcbiAgICAvLyBWZXJpZmljYXIgcXVlIHRlbmVtb3MgY29sb3JlcyBkaXNwb25pYmxlcyBwYXJhIGVsIGFuXHUwMEUxbGlzaXNcbiAgICBpZiAoIWd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzIHx8IGd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9nKCdcdTI2QTBcdUZFMEYgTm8gaGF5IGNvbG9yZXMgZGlzcG9uaWJsZXMsIGludGVudGFuZG8gZGV0ZWN0YXIuLi4nKTtcbiAgICAgIGNvbnN0IHsgZGV0ZWN0QXZhaWxhYmxlQ29sb3JzIH0gPSBhd2FpdCBpbXBvcnQoJy4vcHJvY2Vzc29yLmpzJyk7XG4gICAgICBjb25zdCBkZXRlY3RlZCA9IGRldGVjdEF2YWlsYWJsZUNvbG9ycygpO1xuICAgICAgaWYgKGRldGVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZ3VhcmRTdGF0ZS5hdmFpbGFibGVDb2xvcnMgPSBkZXRlY3RlZDtcbiAgICAgICAgbG9nKGBcdUQ4M0NcdURGQTggQ29sb3JlcyBkZXRlY3RhZG9zOiAke2RldGVjdGVkLmxlbmd0aH1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZygnXHUyNzRDIE5vIHNlIHB1ZGllcm9uIGRldGVjdGFyIGNvbG9yZXMgcGFyYSBlbCBhblx1MDBFMWxpc2lzJyk7XG4gICAgICAgIGFsZXJ0KCdcdTI3NEMgTm8gc2UgcHVlZGVuIGRldGVjdGFyIGNvbG9yZXMuIEFzZWdcdTAwRkFyYXRlIGRlIHF1ZSBsYSBwYWxldGEgZXN0XHUwMEU5IGFiaWVydGEuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gT2J0ZW5lciBwXHUwMEVEeGVsZXMgYWN0dWFsZXMgZGVsIGNhbnZhc1xuICAgIGxvZygnXHVEODNEXHVERDBEIE9idGVuaWVuZG8gcFx1MDBFRHhlbGVzIGFjdHVhbGVzIGRlbCBjYW52YXMuLi4nKTtcbiAgICBjb25zdCBjdXJyZW50UGl4ZWxzID0gYXdhaXQgYW5hbHl6ZUFyZWFQaXhlbHMoZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSk7XG4gICAgbG9nKGBcdUQ4M0RcdUREQkNcdUZFMEYgUFx1MDBFRHhlbGVzIGFjdHVhbGVzIG9idGVuaWRvczogJHtjdXJyZW50UGl4ZWxzPy5zaXplIHx8IDB9YCk7XG4gICAgXG4gICAgLy8gQ29tcGFyYXIgY29uIHBcdTAwRUR4ZWxlcyBvcmlnaW5hbGVzXG4gICAgbG9nKCdcdUQ4M0RcdUREMEQgQ29tcGFyYW5kbyBwXHUwMEVEeGVsZXMuLi4nKTtcbiAgICBjb25zdCBhbmFseXNpcyA9IGNvbXBhcmVQaXhlbHMoZ3VhcmRTdGF0ZS5vcmlnaW5hbFBpeGVscywgY3VycmVudFBpeGVscyB8fCBuZXcgTWFwKCkpO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgZXN0YWRcdTAwRURzdGljYXNcbiAgICB1cGRhdGVTdGF0aXN0aWNzKGNvbnRyb2xQYW5lbCwgYW5hbHlzaXMpO1xuICAgIFxuICAgIC8vIFJlbmRlcml6YXIgdmlzdWFsaXphY2lcdTAwRjNuXG4gICAgcmVuZGVyVmlzdWFsaXphdGlvbihjYW52YXMsIGFuYWx5c2lzKTtcbiAgICBcbiAgICAvLyBDb25maWd1cmFyIGNvbnRyb2xlc1xuICAgIHNldHVwQ29udHJvbHMoY29udHJvbFBhbmVsLCBjYW52YXMsIGFuYWx5c2lzKTtcbiAgICBcbiAgICBsb2coJ1x1MjcwNSBBblx1MDBFMWxpc2lzIGNvbXBsZXRhZG8nKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBlbiBhblx1MDBFMWxpc2lzOicsIGVycm9yKTtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZXRhbGxhZG86JywgZXJyb3IpO1xuICB9XG59XG5cbi8vIENvbXBhcmFyIHBcdTAwRUR4ZWxlcyBvcmlnaW5hbGVzIHZzIGFjdHVhbGVzXG5mdW5jdGlvbiBjb21wYXJlUGl4ZWxzKG9yaWdpbmFsUGl4ZWxzLCBjdXJyZW50UGl4ZWxzKSB7XG4gIGNvbnN0IGNvcnJlY3QgPSBuZXcgTWFwKCk7XG4gIGNvbnN0IGluY29ycmVjdCA9IG5ldyBNYXAoKTtcbiAgY29uc3QgbWlzc2luZyA9IG5ldyBNYXAoKTtcbiAgXG4gIGNvbnN0IGNvbXBhcmlzb25NZXRob2QgPSBndWFyZFN0YXRlLmNvbmZpZz8uY29sb3JDb21wYXJpc29uTWV0aG9kIHx8ICdyZ2InO1xuICBjb25zdCB0aHJlc2hvbGQgPSBndWFyZFN0YXRlLmNvbmZpZz8uY29sb3JUaHJlc2hvbGQgfHwgMTA7XG4gIFxuICAvLyBJbXBvcnRhciBmdW5jaVx1MDBGM24gZGUgY29tcGFyYWNpXHUwMEYzblxuICBjb25zdCBjb21wYXJlQ29sb3JzID0gKGNvbG9yMSwgY29sb3IyKSA9PiB7XG4gICAgaWYgKGNvbXBhcmlzb25NZXRob2QgPT09ICdsYWInKSB7XG4gICAgICAvLyBVc2FyIGNvbXBhcmFjaVx1MDBGM24gTEFCIChpbXBsZW1lbnRhZGEgZW4gcHJvY2Vzc29yLmpzKVxuICAgICAgY29uc3QgbGFiMSA9IHJnYlRvTGFiKGNvbG9yMS5yLCBjb2xvcjEuZywgY29sb3IxLmIpO1xuICAgICAgY29uc3QgbGFiMiA9IHJnYlRvTGFiKGNvbG9yMi5yLCBjb2xvcjIuZywgY29sb3IyLmIpO1xuICAgICAgY29uc3QgZGVsdGFFID0gY2FsY3VsYXRlRGVsdGFFKGxhYjEsIGxhYjIpO1xuICAgICAgcmV0dXJuIGRlbHRhRSA8PSAodGhyZXNob2xkIC8gMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzYXIgY29tcGFyYWNpXHUwMEYzbiBSR0JcbiAgICAgIGNvbnN0IHJEaWZmID0gTWF0aC5hYnMoY29sb3IxLnIgLSBjb2xvcjIucik7XG4gICAgICBjb25zdCBnRGlmZiA9IE1hdGguYWJzKGNvbG9yMS5nIC0gY29sb3IyLmcpO1xuICAgICAgY29uc3QgYkRpZmYgPSBNYXRoLmFicyhjb2xvcjEuYiAtIGNvbG9yMi5iKTtcbiAgICAgIGNvbnN0IG1heERpZmYgPSBNYXRoLm1heChyRGlmZiwgZ0RpZmYsIGJEaWZmKTtcbiAgICAgIHJldHVybiBtYXhEaWZmIDw9IHRocmVzaG9sZDtcbiAgICB9XG4gIH07XG4gIFxuICAvLyBDb21wYXJhciBjYWRhIHBcdTAwRUR4ZWwgb3JpZ2luYWxcbiAgZm9yIChjb25zdCBba2V5LCBvcmlnaW5hbFBpeGVsXSBvZiBvcmlnaW5hbFBpeGVscykge1xuICAgIGNvbnN0IGN1cnJlbnRQaXhlbCA9IGN1cnJlbnRQaXhlbHMuZ2V0KGtleSk7XG4gICAgXG4gICAgaWYgKCFjdXJyZW50UGl4ZWwpIHtcbiAgICAgIC8vIFBcdTAwRUR4ZWwgZmFsdGFudGVcbiAgICAgIG1pc3Npbmcuc2V0KGtleSwgb3JpZ2luYWxQaXhlbCk7XG4gICAgfSBlbHNlIGlmIChjb21wYXJlQ29sb3JzKG9yaWdpbmFsUGl4ZWwsIGN1cnJlbnRQaXhlbCkpIHtcbiAgICAgIC8vIFBcdTAwRUR4ZWwgY29ycmVjdG9cbiAgICAgIGNvcnJlY3Quc2V0KGtleSwgeyBvcmlnaW5hbDogb3JpZ2luYWxQaXhlbCwgY3VycmVudDogY3VycmVudFBpeGVsIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQXHUwMEVEeGVsIGluY29ycmVjdG9cbiAgICAgIGluY29ycmVjdC5zZXQoa2V5LCB7IG9yaWdpbmFsOiBvcmlnaW5hbFBpeGVsLCBjdXJyZW50OiBjdXJyZW50UGl4ZWwgfSk7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4geyBjb3JyZWN0LCBpbmNvcnJlY3QsIG1pc3NpbmcsIG9yaWdpbmFsUGl4ZWxzLCBjdXJyZW50UGl4ZWxzIH07XG59XG5cbi8vIEFjdHVhbGl6YXIgZXN0YWRcdTAwRURzdGljYXMgZW4gZWwgcGFuZWxcbmZ1bmN0aW9uIHVwZGF0ZVN0YXRpc3RpY3MoY29udHJvbFBhbmVsLCBhbmFseXNpcykge1xuICBjb25zdCB0b3RhbCA9IGFuYWx5c2lzLm9yaWdpbmFsUGl4ZWxzLnNpemU7XG4gIGNvbnN0IGNvcnJlY3RDb3VudCA9IGFuYWx5c2lzLmNvcnJlY3Quc2l6ZTtcbiAgY29uc3QgaW5jb3JyZWN0Q291bnQgPSBhbmFseXNpcy5pbmNvcnJlY3Quc2l6ZTtcbiAgY29uc3QgbWlzc2luZ0NvdW50ID0gYW5hbHlzaXMubWlzc2luZy5zaXplO1xuICBjb25zdCBhY2N1cmFjeSA9IHRvdGFsID4gMCA/ICgoY29ycmVjdENvdW50IC8gdG90YWwpICogMTAwKS50b0ZpeGVkKDEpIDogMDtcbiAgXG4gIGNvbnRyb2xQYW5lbC5xdWVyeVNlbGVjdG9yKCcjY29ycmVjdFBpeGVscycpLnRleHRDb250ZW50ID0gY29ycmVjdENvdW50O1xuICBjb250cm9sUGFuZWwucXVlcnlTZWxlY3RvcignI2luY29ycmVjdFBpeGVscycpLnRleHRDb250ZW50ID0gaW5jb3JyZWN0Q291bnQ7XG4gIGNvbnRyb2xQYW5lbC5xdWVyeVNlbGVjdG9yKCcjbWlzc2luZ1BpeGVscycpLnRleHRDb250ZW50ID0gbWlzc2luZ0NvdW50O1xuICBjb250cm9sUGFuZWwucXVlcnlTZWxlY3RvcignI2FjY3VyYWN5JykudGV4dENvbnRlbnQgPSBgJHthY2N1cmFjeX0lYDtcbn1cblxuLy8gUmVuZGVyaXphciB2aXN1YWxpemFjaVx1MDBGM24gZW4gY2FudmFzXG5mdW5jdGlvbiByZW5kZXJWaXN1YWxpemF0aW9uKGNhbnZhcywgYW5hbHlzaXMpIHtcbiAgY29uc3QgYXJlYSA9IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWE7XG4gIGNvbnN0IHdpZHRoID0gYXJlYS54MiAtIGFyZWEueDEgKyAxO1xuICBjb25zdCBoZWlnaHQgPSBhcmVhLnkyIC0gYXJlYS55MSArIDE7XG4gIFxuICBsb2coYFx1RDgzRFx1RERCQ1x1RkUwRiBSZW5kZXJpemFuZG8gdmlzdWFsaXphY2lcdTAwRjNuOiAke3dpZHRofXgke2hlaWdodH0gcFx1MDBFRHhlbGVzYCk7XG4gIGxvZyhgXHVEODNEXHVEQ0NBIFBcdTAwRUR4ZWxlcyBvcmlnaW5hbGVzOiAke2FuYWx5c2lzLm9yaWdpbmFsUGl4ZWxzPy5zaXplIHx8IDB9YCk7XG4gIGxvZyhgXHUyNzA1IFBcdTAwRUR4ZWxlcyBjb3JyZWN0b3M6ICR7YW5hbHlzaXMuY29ycmVjdD8uc2l6ZSB8fCAwfWApO1xuICBsb2coYFx1Mjc0QyBQXHUwMEVEeGVsZXMgaW5jb3JyZWN0b3M6ICR7YW5hbHlzaXMuaW5jb3JyZWN0Py5zaXplIHx8IDB9YCk7XG4gIGxvZyhgXHUyNkEwXHVGRTBGIFBcdTAwRUR4ZWxlcyBmYWx0YW50ZXM6ICR7YW5hbHlzaXMubWlzc2luZz8uc2l6ZSB8fCAwfWApO1xuICBcbiAgLy8gQ29uZmlndXJhciBjYW52YXNcbiAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIFxuICAvLyBDYWxjdWxhciB0YW1hXHUwMEYxbyBkZSB2aXN1YWxpemFjaVx1MDBGM24gYmFzYWRvIGVuIGVsIFx1MDBFMXJlYSBkaXNwb25pYmxlXG4gIGNvbnN0IGNhbnZhc0FyZWEgPSBjYW52YXMucGFyZW50RWxlbWVudDtcbiAgY29uc3QgYXJlYVJlY3QgPSBjYW52YXNBcmVhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IGFyZWFSZWN0LndpZHRoIC0gMjA7IC8vIE1hcmdlbiBwZXF1ZVx1MDBGMW9cbiAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gYXJlYVJlY3QuaGVpZ2h0IC0gMjA7XG4gIFxuICAvLyBDYWxjdWxhciBlc2NhbGEgcGFyYSBhanVzdGFyIGFsIFx1MDBFMXJlYSBkaXNwb25pYmxlXG4gIGNvbnN0IHNjYWxlWCA9IGF2YWlsYWJsZVdpZHRoIC8gd2lkdGg7XG4gIGNvbnN0IHNjYWxlWSA9IGF2YWlsYWJsZUhlaWdodCAvIGhlaWdodDtcbiAgY29uc3Qgc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSwgMyk7IC8vIE1cdTAwRTF4aW1vIDN4IHBhcmEgZXZpdGFyIHBpeGVsYWRvIGV4Y2VzaXZvXG4gIFxuICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aCAqIHNjYWxlfXB4YDtcbiAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodCAqIHNjYWxlfXB4YDtcbiAgXG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBjb25zdCBpbWFnZURhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuICBcbiAgLy8gSW5pY2lhbGl6YXIgY29uIGZvbmRvIGJsYW5jbyBwYXJhIGRlYnVnXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VEYXRhLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICBpbWFnZURhdGEuZGF0YVtpXSA9IDI0MDsgICAgIC8vIFJcbiAgICBpbWFnZURhdGEuZGF0YVtpICsgMV0gPSAyNDA7IC8vIEdcbiAgICBpbWFnZURhdGEuZGF0YVtpICsgMl0gPSAyNDA7IC8vIEJcbiAgICBpbWFnZURhdGEuZGF0YVtpICsgM10gPSAyNTU7IC8vIEFcbiAgfVxuICBcbiAgLy8gT2J0ZW5lciBlc3RhZG8gZGUgbG9zIGNoZWNrYm94ZXNcbiAgY29uc3QgYW5hbHlzaXNXaW5kb3cgPSBjYW52YXMuY2xvc2VzdCgnLmFuYWx5c2lzLXdpbmRvdycpO1xuICBjb25zdCBwYW5lbEVsZW1lbnQgPSBhbmFseXNpc1dpbmRvdyA/IGFuYWx5c2lzV2luZG93LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sLXBhbmVsJykgOiBudWxsO1xuICBcbiAgLy8gVXNhciB2YWxvcmVzIHBvciBkZWZlY3RvIHNpIG5vIHNlIHB1ZWRlIGFjY2VkZXIgYWwgcGFuZWxcbiAgY29uc3Qgc2hvd0NvcnJlY3QgPSBwYW5lbEVsZW1lbnQgPyBwYW5lbEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Nob3dDb3JyZWN0Jyk/LmNoZWNrZWQgPz8gdHJ1ZSA6IHRydWU7XG4gIGNvbnN0IHNob3dJbmNvcnJlY3QgPSBwYW5lbEVsZW1lbnQgPyBwYW5lbEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Nob3dJbmNvcnJlY3QnKT8uY2hlY2tlZCA/PyB0cnVlIDogdHJ1ZTtcbiAgY29uc3Qgc2hvd01pc3NpbmcgPSBwYW5lbEVsZW1lbnQgPyBwYW5lbEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Nob3dNaXNzaW5nJyk/LmNoZWNrZWQgPz8gdHJ1ZSA6IHRydWU7XG4gIFxuICBsb2coYFx1RDgzQ1x1REY5Qlx1RkUwRiBFc3RhZG9zIGRlIHZpc3VhbGl6YWNpXHUwMEYzbiAtIENvcnJlY3RvczogJHtzaG93Q29ycmVjdH0sIEluY29ycmVjdG9zOiAke3Nob3dJbmNvcnJlY3R9LCBGYWx0YW50ZXM6ICR7c2hvd01pc3Npbmd9YCk7XG4gIFxuICAvLyBEaWJ1amFyIHBcdTAwRUR4ZWxlcyBvcmlnaW5hbGVzIGNvbW8gZm9uZG9cbiAgZm9yIChjb25zdCBba2V5LCBwaXhlbF0gb2YgYW5hbHlzaXMub3JpZ2luYWxQaXhlbHMgfHwgbmV3IE1hcCgpKSB7XG4gICAgY29uc3QgW3gsIHldID0ga2V5LnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgY29uc3QgaW5kZXggPSAoKHkgLSBhcmVhLnkxKSAqIHdpZHRoICsgKHggLSBhcmVhLngxKSkgKiA0O1xuICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgaW1hZ2VEYXRhLmRhdGEubGVuZ3RoIC0gMykge1xuICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXhdID0gcGl4ZWwucjtcbiAgICAgIGltYWdlRGF0YS5kYXRhW2luZGV4ICsgMV0gPSBwaXhlbC5nO1xuICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAyXSA9IHBpeGVsLmI7XG4gICAgICBpbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gMjU1O1xuICAgIH1cbiAgfVxuICBcbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgZGlidWphciBwXHUwMEVEeGVsXG4gIGNvbnN0IGRyYXdQaXhlbCA9ICh4LCB5LCByLCBnLCBiLCBhID0gMjU1KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSAoKHkgLSBhcmVhLnkxKSAqIHdpZHRoICsgKHggLSBhcmVhLngxKSkgKiA0O1xuICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgaW1hZ2VEYXRhLmRhdGEubGVuZ3RoIC0gMykge1xuICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXhdID0gcjtcbiAgICAgIGltYWdlRGF0YS5kYXRhW2luZGV4ICsgMV0gPSBnO1xuICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAyXSA9IGI7XG4gICAgICBpbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gYTtcbiAgICB9XG4gIH07XG4gIFxuICAvLyBEaWJ1amFyIHBcdTAwRUR4ZWxlcyBjb3JyZWN0b3MgKHZlcmRlKSBzaSBlc3RcdTAwRTEgaGFiaWxpdGFkb1xuICBpZiAoc2hvd0NvcnJlY3QpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIF9kYXRhXSBvZiBhbmFseXNpcy5jb3JyZWN0KSB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBrZXkuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICAgIGRyYXdQaXhlbCh4LCB5LCAwLCAyNTUsIDAsIDEyOCk7XG4gICAgfVxuICB9XG4gIFxuICAvLyBEaWJ1amFyIHBcdTAwRUR4ZWxlcyBpbmNvcnJlY3RvcyAocm9qbykgc2kgZXN0XHUwMEUxIGhhYmlsaXRhZG9cbiAgaWYgKHNob3dJbmNvcnJlY3QpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIF9kYXRhXSBvZiBhbmFseXNpcy5pbmNvcnJlY3QpIHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IGtleS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgICAgZHJhd1BpeGVsKHgsIHksIDI1NSwgMCwgMCwgMjAwKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIERpYnVqYXIgcFx1MDBFRHhlbGVzIGZhbHRhbnRlcyAoYW1hcmlsbG8pIHNpIGVzdFx1MDBFMSBoYWJpbGl0YWRvXG4gIGlmIChzaG93TWlzc2luZykge1xuICAgIGZvciAoY29uc3QgW2tleSwgX3BpeGVsXSBvZiBhbmFseXNpcy5taXNzaW5nKSB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBrZXkuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICAgIGRyYXdQaXhlbCh4LCB5LCAyNTUsIDI1NSwgMCwgMTUwKTtcbiAgICB9XG4gIH1cbiAgXG4gIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbn1cblxuLy8gQ29uZmlndXJhciBjb250cm9sZXMgaW50ZXJhY3Rpdm9zXG5mdW5jdGlvbiBzZXR1cENvbnRyb2xzKGNvbnRyb2xQYW5lbCwgY2FudmFzLCBhbmFseXNpcykge1xuICBjb25zdCB6b29tU2xpZGVyID0gY29udHJvbFBhbmVsLnF1ZXJ5U2VsZWN0b3IoJyN6b29tU2xpZGVyJyk7XG4gIGNvbnN0IHpvb21WYWx1ZSA9IGNvbnRyb2xQYW5lbC5xdWVyeVNlbGVjdG9yKCcjem9vbVZhbHVlJyk7XG4gIGNvbnN0IG9wYWNpdHlTbGlkZXIgPSBjb250cm9sUGFuZWwucXVlcnlTZWxlY3RvcignI29wYWNpdHlTbGlkZXInKTtcbiAgY29uc3Qgb3BhY2l0eVZhbHVlID0gY29udHJvbFBhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNvcGFjaXR5VmFsdWUnKTtcbiAgY29uc3QgcmVmcmVzaEJ0biA9IGNvbnRyb2xQYW5lbC5xdWVyeVNlbGVjdG9yKCcjcmVmcmVzaEFuYWx5c2lzJyk7XG4gIGNvbnN0IGF1dG9SZWZyZXNoQ2hlY2tib3ggPSBjb250cm9sUGFuZWwucXVlcnlTZWxlY3RvcignI2F1dG9SZWZyZXNoJyk7XG4gIGNvbnN0IHJlZnJlc2hJbnRlcnZhbElucHV0ID0gY29udHJvbFBhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNyZWZyZXNoSW50ZXJ2YWwnKTtcbiAgY29uc3QgYXV0b0ZpdFpvb21CdG4gPSBjb250cm9sUGFuZWwucXVlcnlTZWxlY3RvcignI2F1dG9GaXRab29tJyk7XG4gIGNvbnN0IF9yZXBvc2l0aW9uQnRuID0gY29udHJvbFBhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNyZXBvc2l0aW9uQXJlYScpO1xuICBcbiAgLy8gQ29udHJvbCBkZSB6b29tXG4gIHpvb21TbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgIGNvbnN0IHpvb20gPSBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB6b29tVmFsdWUudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKHpvb20gKiAxMDApfSVgO1xuICAgIGNhbnZhcy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHt6b29tfSlgO1xuICAgIGNhbnZhcy5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAndG9wIGxlZnQnO1xuICB9KTtcbiAgXG4gIC8vIENvbnRyb2wgZGUgb3BhY2lkYWRcbiAgb3BhY2l0eVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgY29uc3Qgb3BhY2l0eSA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xuICAgIG9wYWNpdHlWYWx1ZS50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQob3BhY2l0eSAqIDEwMCl9JWA7XG4gICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5O1xuICB9KTtcbiAgXG4gIC8vIEF1dG8tYWp1c3RlIGRlIHpvb21cbiAgYXV0b0ZpdFpvb21CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzQXJlYSA9IGNhbnZhcy5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGFyZWFSZWN0ID0gY2FudmFzQXJlYS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBcbiAgICAvLyBPYnRlbmVyIGRpbWVuc2lvbmVzIGFjdHVhbGVzIGRlbCBjYW52YXMgKHlhIGVzY2FsYWRvKVxuICAgIGNvbnN0IGN1cnJlbnRDYW52YXNXaWR0aCA9IHBhcnNlRmxvYXQoY2FudmFzLnN0eWxlLndpZHRoKSB8fCBjYW52YXMud2lkdGg7XG4gICAgY29uc3QgY3VycmVudENhbnZhc0hlaWdodCA9IHBhcnNlRmxvYXQoY2FudmFzLnN0eWxlLmhlaWdodCkgfHwgY2FudmFzLmhlaWdodDtcbiAgICBcbiAgICAvLyBDYWxjdWxhciB6b29tIFx1MDBGM3B0aW1vIHBhcmEgYWp1c3RhciBhbCBcdTAwRTFyZWEgZGlzcG9uaWJsZVxuICAgIGNvbnN0IHNjYWxlWCA9IChhcmVhUmVjdC53aWR0aCAtIDIwKSAvIGN1cnJlbnRDYW52YXNXaWR0aDtcbiAgICBjb25zdCBzY2FsZVkgPSAoYXJlYVJlY3QuaGVpZ2h0IC0gMjApIC8gY3VycmVudENhbnZhc0hlaWdodDtcbiAgICBjb25zdCBvcHRpbWFsWm9vbSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZLCAzKTsgLy8gTVx1MDBFMXhpbW8gM3hcbiAgICBcbiAgICB6b29tU2xpZGVyLnZhbHVlID0gb3B0aW1hbFpvb207XG4gICAgem9vbVZhbHVlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChvcHRpbWFsWm9vbSAqIDEwMCl9JWA7XG4gICAgY2FudmFzLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke29wdGltYWxab29tfSlgO1xuICAgIGNhbnZhcy5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAndG9wIGxlZnQnO1xuICAgIFxuICAgIGxvZyhgXHVEODNEXHVERDBEIFpvb20gYWp1c3RhZG8gYXV0b21cdTAwRTF0aWNhbWVudGUgYSAke01hdGgucm91bmQob3B0aW1hbFpvb20gKiAxMDApfSVgKTtcbiAgfSk7XG5cbiAgLy8gQXV0by1yZWZyZXNjb1xuICAgYXV0b1JlZnJlc2hDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgIGlmIChhdXRvUmVmcmVzaENoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICBjb25zdCBpbnRlcnZhbCA9IHBhcnNlSW50KHJlZnJlc2hJbnRlcnZhbElucHV0LnZhbHVlKSAqIDEwMDA7XG4gICAgICAgYXV0b1JlZnJlc2hJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAvLyBQcmVzZXJ2YXIgZWwgem9vbSBhY3R1YWwgYW50ZXMgZGVsIHJlZnJlc2NvXG4gICAgICAgICBjb25zdCBjdXJyZW50Wm9vbSA9IHBhcnNlRmxvYXQoem9vbVNsaWRlci52YWx1ZSk7XG4gICAgICAgICBjb25zdCBjdXJyZW50T3BhY2l0eSA9IHBhcnNlRmxvYXQob3BhY2l0eVNsaWRlci52YWx1ZSk7XG4gICAgICAgICBcbiAgICAgICAgIGF3YWl0IGluaXRpYWxpemVBbmFseXNpcyhjYW52YXMsIGNvbnRyb2xQYW5lbCk7XG4gICAgICAgICBcbiAgICAgICAgIC8vIFJlc3RhdXJhciBlbCB6b29tIHkgb3BhY2lkYWQgZGVzcHVcdTAwRTlzIGRlbCByZWZyZXNjb1xuICAgICAgICAgem9vbVNsaWRlci52YWx1ZSA9IGN1cnJlbnRab29tO1xuICAgICAgICAgem9vbVZhbHVlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChjdXJyZW50Wm9vbSAqIDEwMCl9JWA7XG4gICAgICAgICBjYW52YXMuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7Y3VycmVudFpvb219KWA7XG4gICAgICAgICBjYW52YXMuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJ3RvcCBsZWZ0JztcbiAgICAgICAgIFxuICAgICAgICAgb3BhY2l0eVNsaWRlci52YWx1ZSA9IGN1cnJlbnRPcGFjaXR5O1xuICAgICAgICAgb3BhY2l0eVZhbHVlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChjdXJyZW50T3BhY2l0eSAqIDEwMCl9JWA7XG4gICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSA9IGN1cnJlbnRPcGFjaXR5O1xuICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICBsb2coYFx1RDgzRFx1REQwNCBBdXRvLXJlZnJlc2NvIGFjdGl2YWRvIGNhZGEgJHtyZWZyZXNoSW50ZXJ2YWxJbnB1dC52YWx1ZX0gc2VndW5kb3NgKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICBpZiAoYXV0b1JlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoYXV0b1JlZnJlc2hJbnRlcnZhbCk7XG4gICAgICAgICBhdXRvUmVmcmVzaEludGVydmFsID0gbnVsbDtcbiAgICAgICB9XG4gICAgICAgbG9nKCdcdUQ4M0RcdUREMDQgQXV0by1yZWZyZXNjbyBkZXNhY3RpdmFkbycpO1xuICAgICB9XG4gICB9KTtcblxuICAvLyBDYW1iaW8gZGUgaW50ZXJ2YWxvXG4gICByZWZyZXNoSW50ZXJ2YWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgIGlmIChhdXRvUmVmcmVzaENoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAvLyBSZWluaWNpYXIgZWwgaW50ZXJ2YWxvIGNvbiBlbCBudWV2byB2YWxvclxuICAgICAgIGlmIChhdXRvUmVmcmVzaEludGVydmFsKSB7XG4gICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChhdXRvUmVmcmVzaEludGVydmFsKTtcbiAgICAgICB9XG4gICAgICAgY29uc3QgaW50ZXJ2YWwgPSBwYXJzZUludChyZWZyZXNoSW50ZXJ2YWxJbnB1dC52YWx1ZSkgKiAxMDAwO1xuICAgICAgIGF1dG9SZWZyZXNoSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgLy8gUHJlc2VydmFyIGVsIHpvb20gYWN0dWFsIGFudGVzIGRlbCByZWZyZXNjb1xuICAgICAgICAgY29uc3QgY3VycmVudFpvb20gPSBwYXJzZUZsb2F0KHpvb21TbGlkZXIudmFsdWUpO1xuICAgICAgICAgY29uc3QgY3VycmVudE9wYWNpdHkgPSBwYXJzZUZsb2F0KG9wYWNpdHlTbGlkZXIudmFsdWUpO1xuICAgICAgICAgXG4gICAgICAgICBhd2FpdCBpbml0aWFsaXplQW5hbHlzaXMoY2FudmFzLCBjb250cm9sUGFuZWwpO1xuICAgICAgICAgXG4gICAgICAgICAvLyBSZXN0YXVyYXIgZWwgem9vbSB5IG9wYWNpZGFkIGRlc3B1XHUwMEU5cyBkZWwgcmVmcmVzY29cbiAgICAgICAgIHpvb21TbGlkZXIudmFsdWUgPSBjdXJyZW50Wm9vbTtcbiAgICAgICAgIHpvb21WYWx1ZS50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoY3VycmVudFpvb20gKiAxMDApfSVgO1xuICAgICAgICAgY2FudmFzLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke2N1cnJlbnRab29tfSlgO1xuICAgICAgICAgY2FudmFzLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICd0b3AgbGVmdCc7XG4gICAgICAgICBcbiAgICAgICAgIG9wYWNpdHlTbGlkZXIudmFsdWUgPSBjdXJyZW50T3BhY2l0eTtcbiAgICAgICAgIG9wYWNpdHlWYWx1ZS50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoY3VycmVudE9wYWNpdHkgKiAxMDApfSVgO1xuICAgICAgICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50T3BhY2l0eTtcbiAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgICAgbG9nKGBcdUQ4M0RcdUREMDQgSW50ZXJ2YWxvIGRlIGF1dG8tcmVmcmVzY28gYWN0dWFsaXphZG8gYSAke3JlZnJlc2hJbnRlcnZhbElucHV0LnZhbHVlfSBzZWd1bmRvc2ApO1xuICAgICB9XG4gICB9KTtcbiAgXG4gIC8vIEJvdFx1MDBGM24gZGUgYWN0dWFsaXphclxuICByZWZyZXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGluaXRpYWxpemVBbmFseXNpcyhjYW52YXMsIGNvbnRyb2xQYW5lbCk7XG4gIH0pO1xuICBcbiAgLy8gQ2hlY2tib3hlcyBkZSB2aXN1YWxpemFjaVx1MDBGM24gLSByZWZyZXNjbyBpbm1lZGlhdG9cbiAgY29uc3QgY2hlY2tib3hlcyA9IFsnc2hvd0NvcnJlY3QnLCAnc2hvd0luY29ycmVjdCcsICdzaG93TWlzc2luZyddO1xuICBjaGVja2JveGVzLmZvckVhY2goaWQgPT4ge1xuICAgIGNvbnN0IGNoZWNrYm94ID0gY29udHJvbFBhbmVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIC8vIFByZXNlcnZhciBlbCB6b29tIGFjdHVhbCBkdXJhbnRlIGVsIHJlZnJlc2NvXG4gICAgICBjb25zdCBjdXJyZW50Wm9vbSA9IHBhcnNlRmxvYXQoem9vbVNsaWRlci52YWx1ZSk7XG4gICAgICBjb25zdCBjdXJyZW50T3BhY2l0eSA9IHBhcnNlRmxvYXQob3BhY2l0eVNsaWRlci52YWx1ZSk7XG4gICAgICBcbiAgICAgIHJlbmRlclZpc3VhbGl6YXRpb24oY2FudmFzLCBhbmFseXNpcyk7XG4gICAgICBcbiAgICAgIC8vIFJlc3RhdXJhciBlbCB6b29tIHkgb3BhY2lkYWQgZGVzcHVcdTAwRTlzIGRlbCByZW5kZXJpemFkb1xuICAgICAgY2FudmFzLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke2N1cnJlbnRab29tfSlgO1xuICAgICAgY2FudmFzLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICd0b3AgbGVmdCc7XG4gICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSA9IGN1cnJlbnRPcGFjaXR5O1xuICAgICAgXG4gICAgICBsb2coYFx1RDgzRFx1REM0MVx1RkUwRiBWaXN1YWxpemFjaVx1MDBGM24gYWN0dWFsaXphZGE6ICR7aWR9ID0gJHtjaGVja2JveC5jaGVja2VkfWApO1xuICAgIH0pO1xuICB9KTtcblxuXG5cbiAgLy8gQXV0by1hanVzdGUgaW5pY2lhbCBkZWwgem9vbVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBhdXRvRml0Wm9vbUJ0bi5jbGljaygpO1xuICB9LCAxMDApO1xufVxuXG5cblxuLy8gRnVuY2lvbmVzIGF1eGlsaWFyZXMgcGFyYSBMQUIgKGR1cGxpY2FkYXMgZGVzZGUgcHJvY2Vzc29yLmpzIHBhcmEgaW5kZXBlbmRlbmNpYSlcbmZ1bmN0aW9uIHJnYlRvTGFiKHIsIGcsIGIpIHtcbiAgLy8gTm9ybWFsaXphciB2YWxvcmVzIFJHQiBhIDAtMVxuICByID0gciAvIDI1NTtcbiAgZyA9IGcgLyAyNTU7XG4gIGIgPSBiIC8gMjU1O1xuXG4gIC8vIEFwbGljYXIgY29ycmVjY2lcdTAwRjNuIGdhbW1hXG4gIHIgPSByID4gMC4wNDA0NSA/IE1hdGgucG93KChyICsgMC4wNTUpIC8gMS4wNTUsIDIuNCkgOiByIC8gMTIuOTI7XG4gIGcgPSBnID4gMC4wNDA0NSA/IE1hdGgucG93KChnICsgMC4wNTUpIC8gMS4wNTUsIDIuNCkgOiBnIC8gMTIuOTI7XG4gIGIgPSBiID4gMC4wNDA0NSA/IE1hdGgucG93KChiICsgMC4wNTUpIC8gMS4wNTUsIDIuNCkgOiBiIC8gMTIuOTI7XG5cbiAgLy8gQ29udmVydGlyIGEgWFlaIHVzYW5kbyBtYXRyaXogc1JHQlxuICBjb25zdCB4ID0gciAqIDAuNDEyNDU2NCArIGcgKiAwLjM1NzU3NjEgKyBiICogMC4xODA0Mzc1O1xuICBjb25zdCB5ID0gciAqIDAuMjEyNjcyOSArIGcgKiAwLjcxNTE1MjIgKyBiICogMC4wNzIxNzUwO1xuICBjb25zdCB6ID0gciAqIDAuMDE5MzMzOSArIGcgKiAwLjExOTE5MjAgKyBiICogMC45NTAzMDQxO1xuXG4gIC8vIFVzYXIgaWx1bWluYW50ZSBENjVcbiAgY29uc3QgeG4gPSAwLjk1MDQ3O1xuICBjb25zdCB5biA9IDEuMDAwMDA7XG4gIGNvbnN0IHpuID0gMS4wODg4MztcblxuICBjb25zdCBmeCA9ICh4IC8geG4pID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh4IC8geG4sIDEvMykgOiAoNy43ODcgKiAoeCAvIHhuKSArIDE2LzExNik7XG4gIGNvbnN0IGZ5ID0gKHkgLyB5bikgPiAwLjAwODg1NiA/IE1hdGgucG93KHkgLyB5biwgMS8zKSA6ICg3Ljc4NyAqICh5IC8geW4pICsgMTYvMTE2KTtcbiAgY29uc3QgZnogPSAoeiAvIHpuKSA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeiAvIHpuLCAxLzMpIDogKDcuNzg3ICogKHogLyB6bikgKyAxNi8xMTYpO1xuXG4gIGNvbnN0IGwgPSAxMTYgKiBmeSAtIDE2O1xuICBjb25zdCBhID0gNTAwICogKGZ4IC0gZnkpO1xuICBjb25zdCBiTGFiID0gMjAwICogKGZ5IC0gZnopO1xuXG4gIHJldHVybiB7IGwsIGEsIGI6IGJMYWIgfTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlRGVsdGFFKGxhYjEsIGxhYjIpIHtcbiAgY29uc3QgZGVsdGFMID0gbGFiMS5sIC0gbGFiMi5sO1xuICBjb25zdCBkZWx0YUEgPSBsYWIxLmEgLSBsYWIyLmE7XG4gIGNvbnN0IGRlbHRhQiA9IGxhYjEuYiAtIGxhYjIuYjtcbiAgXG4gIHJldHVybiBNYXRoLnNxcnQoZGVsdGFMICogZGVsdGFMICsgZGVsdGFBICogZGVsdGFBICsgZGVsdGFCICogZGVsdGFCKTtcbn0iLCAiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2VyLmpzXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uIH0gZnJvbSBcIi4uL2NvcmUvd3BsYWNlLWFwaS5qc1wiO1xuaW1wb3J0IHsgZ3VhcmRTdGF0ZSwgR1VBUkRfREVGQVVMVFMgfSBmcm9tIFwiLi9jb25maWcuanNcIjtcbmltcG9ydCB7IGRldGVjdEF2YWlsYWJsZUNvbG9ycywgYW5hbHl6ZUFyZWFQaXhlbHMsIGNoZWNrRm9yQ2hhbmdlcywgc3RhcnRDaGFyZ2VNb25pdG9yaW5nLCBzdG9wQ2hhcmdlTW9uaXRvcmluZyB9IGZyb20gXCIuL3Byb2Nlc3Nvci5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlR3VhcmRVSSwgc2hvd0NvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi91aS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlTG9nV2luZG93IH0gZnJvbSBcIi4uL2xvZ193aW5kb3cvaW5kZXguanNcIjtcbmltcG9ydCB7IHNhdmVQcm9ncmVzcywgbG9hZFByb2dyZXNzLCBoYXNQcm9ncmVzcyB9IGZyb20gXCIuL3NhdmUtbG9hZC5qc1wiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUxhbmd1YWdlLCBnZXRTZWN0aW9uLCB0IH0gZnJvbSBcIi4uL2xvY2FsZXMvaW5kZXguanNcIjtcbmltcG9ydCB7IGlzUGFsZXR0ZU9wZW4sIGZpbmRBbmRDbGlja1BhaW50QnV0dG9uIH0gZnJvbSBcIi4uL2NvcmUvZG9tLmpzXCI7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gXCIuLi9jb3JlL3RpbWluZy5qc1wiO1xuaW1wb3J0IHsgZ3VhcmRPdmVybGF5IH0gZnJvbSBcIi4vb3ZlcmxheS5qc1wiO1xuXG5cbi8vIEdsb2JhbHMgZGVsIG5hdmVnYWRvclxuY29uc3QgeyBzZXRJbnRlcnZhbCwgY2xlYXJJbnRlcnZhbCB9ID0gd2luZG93O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuR3VhcmQoKSB7XG4gIGxvZygnXHVEODNEXHVERUUxXHVGRTBGIEluaWNpYW5kbyBXUGxhY2UgQXV0by1HdWFyZCcpO1xuICBcbiAgLy8gSW5pY2lhbGl6YXIgc2lzdGVtYSBkZSBpZGlvbWFzXG4gIGluaXRpYWxpemVMYW5ndWFnZSgpO1xuICBcbiAgLy8gVmVyaWZpY2FyIGNvbmZsaWN0b3MgY29uIG90cm9zIGJvdHNcbiAgaWYgKCFjaGVja0V4aXN0aW5nQm90cygpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICAvLyBNYXJjYXIgY29tbyBlamVjdXRcdTAwRTFuZG9zZVxuICB3aW5kb3cuX193cGxhY2VCb3QgPSB7IFxuICAgIC4uLndpbmRvdy5fX3dwbGFjZUJvdCwgXG4gICAgZ3VhcmRSdW5uaW5nOiB0cnVlIFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICAvLyBPYnRlbmVyIHRleHRvcyBlbiBlbCBpZGlvbWEgYWN0dWFsXG4gICAgY29uc3QgdGV4dHMgPSBnZXRTZWN0aW9uKCdndWFyZCcpO1xuICAgIFxuICAgIC8vIENyZWFyIFVJXG4gICAgZ3VhcmRTdGF0ZS51aSA9IGNyZWF0ZUd1YXJkVUkodGV4dHMpO1xuICAgIFxuICAgIC8vIENvbmZpZ3VyYXIgZXZlbnQgbGlzdGVuZXJzXG4gICAgc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgIFxuICAgIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGF1dG8taW5pY2lvIGRlbCBib3QgKHJvYnVzdGEpOiB2YWxpZGEgY29sb3JlcyByZWFsZXMgeSBoYWNlIGZhbGxiYWNrIGEgY2xpYyBkZSBQYWludFxuICAgIGFzeW5jIGZ1bmN0aW9uIHRyeUF1dG9Jbml0KCkge1xuICAgICAgbG9nKCdcdUQ4M0VcdUREMTYgSW50ZW50YW5kbyBhdXRvLWluaWNpbyBkZWwgR3VhcmQuLi4nKTtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLnBhbGV0dGVOb3RGb3VuZCcpLCAnaW5mbycpO1xuXG4gICAgICAvLyAxKSBTaSBwYXJlY2UgYWJpZXJ0YSwgdmFsaWRhciBxdWUgaGF5YSBjb2xvcmVzIHJlYWxlc1xuICAgICAgaWYgKGlzUGFsZXR0ZU9wZW4oKSkge1xuICAgICAgICBsb2coJ1x1RDgzQ1x1REZBOCBQYWxldGEgcGFyZWNlIGFiaWVydGEuIFZhbGlkYW5kbyBjb2xvcmVzLi4uJyk7XG4gICAgICAgIGNvbnN0IGNvbG9yc05vdyA9IGRldGVjdEF2YWlsYWJsZUNvbG9ycygpO1xuICAgICAgICBpZiAoY29sb3JzTm93Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5wYWxldHRlRGV0ZWN0ZWQnKSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsb2coJ1x1MjZBMFx1RkUwRiBQYWxldGEgXCJhYmllcnRhXCIgcGVybyBzaW4gY29sb3JlcyBkZXRlY3RhZG9zLiBJbnRlbnRhbmRvIHByZXNpb25hciBQYWludC4uLicpO1xuICAgICAgfVxuXG4gICAgICAvLyAyKSBJbnRlbnRhciBoYWNlciBjbGljIGVuIGVsIGJvdFx1MDBGM24gUGFpbnRcbiAgICAgIGxvZygnXHVEODNEXHVERDBEIEJ1c2NhbmRvIGJvdFx1MDBGM24gUGFpbnQuLi4nKTtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmNsaWNraW5nUGFpbnRCdXR0b24nKSwgJ2luZm8nKTtcbiAgICAgIGlmIChmaW5kQW5kQ2xpY2tQYWludEJ1dHRvbigpKSB7XG4gICAgICAgIGxvZygnXHVEODNEXHVEQzQ2IEJvdFx1MDBGM24gUGFpbnQgZW5jb250cmFkbyB5IHByZXNpb25hZG8nKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMzAwMCk7IC8vIEVzcGVyYXIgYSBxdWUgY2FyZ3VlXG5cbiAgICAgICAgLy8gUmV2YWxpZGFyOiBwcmltZXJvIGNvbG9yZXMgcmVhbGVzLCBsdWVnbyBmYWxsYmFjayBhIGhldXJcdTAwRURzdGljYSBkZSBwYWxldGFcbiAgICAgICAgY29uc3QgY29sb3JzQWZ0ZXIgPSBkZXRlY3RBdmFpbGFibGVDb2xvcnMoKTtcbiAgICAgICAgaWYgKGNvbG9yc0FmdGVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsb2coJ1x1MjcwNSBDb2xvcmVzIGRldGVjdGFkb3MgdHJhcyBwcmVzaW9uYXIgUGFpbnQnKTtcbiAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5wYWxldHRlRGV0ZWN0ZWQnKSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQYWxldHRlT3BlbigpKSB7XG4gICAgICAgICAgbG9nKCdcdTI3MDUgUGFsZXRhIGFiaWVydGEsIHBlcm8gc2luIGNvbG9yZXMgYWNjZXNpYmxlcyBhXHUwMEZBbicpO1xuICAgICAgICAgIC8vIEFcdTAwRkFuIGNvbnNpZGVyYW1vcyBmYWxsaWRvIHBhcmEgZm9yemFyIGluaWNpbyBtYW51YWxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2coJ1x1Mjc0QyBMYSBwYWxldGEgbm8gc2UgYWJyaVx1MDBGMyBkZXNwdVx1MDBFOXMgZGUgaGFjZXIgY2xpYycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2coJ1x1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG8nKTtcbiAgICAgIH1cblxuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuYXV0b0luaXRGYWlsZWQnKSwgJ3dhcm5pbmcnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgLy8gSW50ZW50YXIgYXV0by1pbmljaW8gZGVzcHVcdTAwRTlzIGRlIHF1ZSBsYSBVSSBlc3RcdTAwRTkgbGlzdGFcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmF1dG9Jbml0aWFsaXppbmcnKSwgJ2luZm8nKTtcbiAgICAgICAgbG9nKCdcdUQ4M0VcdUREMTYgSW50ZW50YW5kbyBhdXRvLWluaWNpby4uLicpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYXV0b0luaXRTdWNjZXNzID0gYXdhaXQgdHJ5QXV0b0luaXQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChhdXRvSW5pdFN1Y2Nlc3MpIHtcbiAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5hdXRvSW5pdFN1Y2Nlc3MnKSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICBsb2coJ1x1MjcwNSBBdXRvLWluaWNpbyBleGl0b3NvJyk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gT2N1bHRhciBlbCBib3RcdTAwRjNuIGRlIGluaWNpYWxpemFjaVx1MDBGM24gbWFudWFsXG4gICAgICAgICAgZ3VhcmRTdGF0ZS51aS5zZXRJbml0QnV0dG9uVmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gRWplY3V0YXIgbGEgbFx1MDBGM2dpY2EgZGUgaW5pY2lhbGl6YWNpXHUwMEYzbiBkZWwgYm90XG4gICAgICAgICAgY29uc3QgaW5pdFJlc3VsdCA9IGF3YWl0IGluaXRpYWxpemVHdWFyZCh0cnVlKTsgLy8gdHJ1ZSA9IGVzIGF1dG8taW5pY2lvXG4gICAgICAgICAgaWYgKGluaXRSZXN1bHQpIHtcbiAgICAgICAgICAgIGxvZygnXHVEODNEXHVERTgwIEd1YXJkLUJPVCBhdXRvLWluaWNpYWRvIGNvbXBsZXRhbWVudGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuYXV0b0luaXRGYWlsZWQnKSwgJ3dhcm5pbmcnKTtcbiAgICAgICAgICBsb2coJ1x1MjZBMFx1RkUwRiBBdXRvLWluaWNpbyBmYWxsXHUwMEYzLCBzZSByZXF1aWVyZSBpbmljaW8gbWFudWFsJyk7XG4gICAgICAgICAgLy8gQXNlZ3VyYXIgcXVlIGVsIGJvdFx1MDBGM24gZGUgaW5pY2lvIG1hbnVhbCBlc3RcdTAwRTkgdmlzaWJsZVxuICAgICAgICAgIGd1YXJkU3RhdGUudWkuc2V0SW5pdEJ1dHRvblZpc2libGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZygnXHUyNzRDIEVycm9yIGVuIGF1dG8taW5pY2lvOicsIGVycm9yKTtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQubWFudWFsSW5pdFJlcXVpcmVkJyksICd3YXJuaW5nJyk7XG4gICAgICB9XG4gIH0sIDEwMDApOyAvLyAxc1xuICAgIFxuICAgIC8vIENsZWFudXAgYWwgY2VycmFyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcbiAgICAgIHN0b3BHdWFyZCgpO1xuICAgICAgaWYgKHdpbmRvdy5fX3dwbGFjZUJvdCkge1xuICAgICAgICB3aW5kb3cuX193cGxhY2VCb3QuZ3VhcmRSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgbG9nKCdcdTI3MDUgQXV0by1HdWFyZCBjYXJnYWRvIGNvcnJlY3RhbWVudGUnKTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBpbmljaWFsaXphbmRvIEF1dG8tR3VhcmQ6JywgZXJyb3IpO1xuICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5ndWFyZFJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tFeGlzdGluZ0JvdHMoKSB7XG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmltYWdlUnVubmluZykge1xuICAgIGFsZXJ0KCdBdXRvLUltYWdlIGVzdFx1MDBFMSBlamVjdXRcdTAwRTFuZG9zZS4gQ2lcdTAwRTlycmFsbyBhbnRlcyBkZSBpbmljaWFyIEF1dG8tR3VhcmQuJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmZhcm1SdW5uaW5nKSB7XG4gICAgYWxlcnQoJ0F1dG8tRmFybSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UuIENpXHUwMEU5cnJhbG8gYW50ZXMgZGUgaW5pY2lhciBBdXRvLUd1YXJkLicpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgY29uc3QgeyBlbGVtZW50cyB9ID0gZ3VhcmRTdGF0ZS51aTtcbiAgXG4gIGVsZW1lbnRzLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHN0b3BHdWFyZCgpO1xuICAgIGd1YXJkU3RhdGUudWkuZGVzdHJveSgpO1xuICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5ndWFyZFJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIGVsZW1lbnRzLmluaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBpbml0aWFsaXplR3VhcmQoKSk7XG4gIGVsZW1lbnRzLnNlbGVjdEFyZWFCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RBcmVhU3RlcEJ5U3RlcCk7XG4gIGVsZW1lbnRzLmxvYWRBcmVhQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGVsZW1lbnRzLmFyZWFGaWxlSW5wdXQuY2xpY2soKTtcbiAgfSk7XG4gIFxuICBlbGVtZW50cy5hcmVhRmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoZWxlbWVudHMuYXJlYUZpbGVJbnB1dC5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBsb2FkUHJvZ3Jlc3MoZWxlbWVudHMuYXJlYUZpbGVJbnB1dC5maWxlc1swXSk7XG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoYFx1MjcwNSBQcm90ZWNjaVx1MDBGM24gY2FyZ2FkYTogJHtyZXN1bHQucHJvdGVjdGVkUGl4ZWxzfSBwXHUwMEVEeGVsZXMgcHJvdGVnaWRvc2AsICdzdWNjZXNzJyk7XG4gICAgICAgIGxvZyhgXHUyNzA1IFx1MDBDMXJlYSBkZSBwcm90ZWNjaVx1MDBGM24gY2FyZ2FkYSBkZXNkZSBhcmNoaXZvYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHUyNzRDIEVycm9yIGFsIGNhcmdhciBwcm90ZWNjaVx1MDBGM246ICR7cmVzdWx0LmVycm9yfWAsICdlcnJvcicpO1xuICAgICAgICBsb2coYFx1Mjc0QyBFcnJvciBjYXJnYW5kbyBhcmNoaXZvOiAke3Jlc3VsdC5lcnJvcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEd1YXJkKTtcbiAgZWxlbWVudHMuc3RvcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAvLyBTaW1wbGVtZW50ZSBkZXRlbmVyIGxhIHByb3RlY2NpXHUwMEYzbiBzaW4gb3BjaW9uZXMgZGUgZ3VhcmRhZG9cbiAgICBndWFyZFN0YXRlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICBndWFyZFN0YXRlLmxvb3BJZCA9IG51bGw7XG4gICAgZ3VhcmRTdGF0ZS51aS5zZXRSdW5uaW5nU3RhdGUoZmFsc2UpO1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKCdcdTIzRjlcdUZFMEYgUHJvdGVjY2lcdTAwRjNuIGRldGVuaWRhJywgJ3dhcm5pbmcnKTtcbiAgICBcbiAgICBpZiAoZ3VhcmRTdGF0ZS5jaGVja0ludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKGd1YXJkU3RhdGUuY2hlY2tJbnRlcnZhbCk7XG4gICAgICBndWFyZFN0YXRlLmNoZWNrSW50ZXJ2YWwgPSBudWxsO1xuICAgIH1cbiAgfSk7XG4gIFxuXG4gIFxuICAvLyBFdmVudCBsaXN0ZW5lciBwYXJhIGVsIGJvdFx1MDBGM24gZGUgbG9nc1xuICBsZXQgbG9nV2luZG93ID0gbnVsbDtcbiAgZWxlbWVudHMubG9nV2luZG93QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmICghbG9nV2luZG93KSB7XG4gICAgICBsb2dXaW5kb3cgPSBjcmVhdGVMb2dXaW5kb3coJ2d1YXJkJyk7XG4gICAgICBsb2dXaW5kb3cuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dXaW5kb3cudG9nZ2xlKCk7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVyIHBhcmEgZWwgYm90XHUwMEYzbiBkZSByZXBvc2ljaW9uYW1pZW50b1xuICBlbGVtZW50cy5yZXBvc2l0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc3RhcnRSZXBvc2l0aW9uaW5nKCkpO1xuICBcbiAgLy8gRXZlbnRvcyBwYXJhIHNhdmUvbG9hZC9kZWxldGVcbiAgZWxlbWVudHMuc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWhhc1Byb2dyZXNzKCkpIHtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKCdcdTI3NEMgTm8gaGF5IFx1MDBFMXJlYSBwcm90ZWdpZGEgcGFyYSBndWFyZGFyJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIC8vIE1vc3RyYXIgZGlcdTAwRTFsb2dvIGRlIHNwbGl0XG4gICAgY29uc3Qgc3BsaXRDb25maXJtID0gYXdhaXQgc2hvd0NvbmZpcm1EaWFsb2coXG4gICAgICAnXHUwMEJGRGVzZWFzIGRpdmlkaXIgZWwgXHUwMEUxcmVhIHByb3RlZ2lkYSBlbiBwYXJ0ZXMgcGFyYSBtXHUwMEZBbHRpcGxlcyB1c3Vhcmlvcz88YnI+PGJyPicgK1xuICAgICAgJzxsYWJlbCBmb3I9XCJzcGxpdENvdW50SW5wdXRcIj5OXHUwMEZBbWVybyBkZSBwYXJ0ZXMgKDEgPSBzaW4gZGl2aWRpcik6PC9sYWJlbD48YnI+JyArXG4gICAgICAnPGlucHV0IHR5cGU9XCJudW1iZXJcIiBpZD1cInNwbGl0Q291bnRJbnB1dFwiIG1pbj1cIjFcIiBtYXg9XCIyMFwiIHZhbHVlPVwiMVwiIHN0eWxlPVwibWFyZ2luOiA1cHggMDsgcGFkZGluZzogNXB4OyB3aWR0aDogMTAwcHg7IGJhY2tncm91bmQ6ICMzNzQxNTE7IGJvcmRlcjogMXB4IHNvbGlkICM0YjU1NjM7IGJvcmRlci1yYWRpdXM6IDRweDsgY29sb3I6ICNkMWQ1ZGI7XCI+JyxcbiAgICAgICdPcGNpb25lcyBkZSBHdWFyZGFkbycsXG4gICAgICB7XG4gICAgICAgIHNhdmU6IFwiR3VhcmRhclwiLFxuICAgICAgICBjYW5jZWw6IFwiQ2FuY2VsYXJcIlxuICAgICAgfVxuICAgICk7XG4gICAgXG4gICAgaWYgKHNwbGl0Q29uZmlybSA9PT0gJ3NhdmUnKSB7XG4gICAgICBjb25zdCBzcGxpdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NwbGl0Q291bnRJbnB1dCcpO1xuICAgICAgY29uc3Qgc3BsaXRDb3VudCA9IHBhcnNlSW50KHNwbGl0SW5wdXQ/LnZhbHVlKSB8fCAxO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2F2ZVByb2dyZXNzKG51bGwsIHNwbGl0Q291bnQpO1xuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKGBcdTI3MDUgUHJvdGVjY2lcdTAwRjNuIGd1YXJkYWRhJHtzcGxpdENvdW50ID4gMSA/IGAgKGRpdmlkaWRhIGVuICR7c3BsaXRDb3VudH0gcGFydGVzKWAgOiAnJ31gLCAnc3VjY2VzcycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoYFx1Mjc0QyBFcnJvciBhbCBndWFyZGFyOiAke3Jlc3VsdC5lcnJvcn1gLCAnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIEV2ZW50b3MgcGFyYSBjb25maWd1cmFjaVx1MDBGM24gZWRpdGFibGVcbiAgZWxlbWVudHMucGl4ZWxzUGVyQmF0Y2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgIGd1YXJkU3RhdGUucGl4ZWxzUGVyQmF0Y2ggPSBNYXRoLm1heCgxLCBNYXRoLm1pbig1MCwgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIHx8IDEwKSk7XG4gICAgZS50YXJnZXQudmFsdWUgPSBndWFyZFN0YXRlLnBpeGVsc1BlckJhdGNoO1xuICB9KTtcblxuICBlbGVtZW50cy5taW5DaGFyZ2VzSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICBndWFyZFN0YXRlLm1pbkNoYXJnZXNUb1dhaXQgPSBNYXRoLm1heCgxLCBNYXRoLm1pbigxMDAsIHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSB8fCAyMCkpO1xuICAgIGUudGFyZ2V0LnZhbHVlID0gZ3VhcmRTdGF0ZS5taW5DaGFyZ2VzVG9XYWl0O1xuICB9KTtcblxuICBlbGVtZW50cy5wcm90ZWN0aW9uUGF0dGVyblNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgIGd1YXJkU3RhdGUucHJvdGVjdGlvblBhdHRlcm4gPSBlLnRhcmdldC52YWx1ZTtcbiAgICBsb2coYFx1RDgzQ1x1REZBRiBQYXRyXHUwMEYzbiBkZSBwcm90ZWNjaVx1MDBGM24gY2FtYmlhZG8gYTogJHtlLnRhcmdldC52YWx1ZX1gKTtcbiAgfSk7XG5cbiAgZWxlbWVudHMuY29sb3JDb21wYXJpc29uU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgZ3VhcmRTdGF0ZS5jb25maWcuY29sb3JDb21wYXJpc29uTWV0aG9kID0gZS50YXJnZXQudmFsdWU7XG4gICAgbG9nKGBcdUQ4M0NcdURGQTggTVx1MDBFOXRvZG8gZGUgY29tcGFyYWNpXHUwMEYzbiBkZSBjb2xvciBjYW1iaWFkbyBhOiAke2UudGFyZ2V0LnZhbHVlfWApO1xuICB9KTtcblxuICAvLyBBY3R1YWxpemFyIGlucHV0cyBjb24gdmFsb3JlcyBkZWwgZXN0YWRvXG4gIGVsZW1lbnRzLnBpeGVsc1BlckJhdGNoSW5wdXQudmFsdWUgPSBndWFyZFN0YXRlLnBpeGVsc1BlckJhdGNoO1xuICBlbGVtZW50cy5taW5DaGFyZ2VzSW5wdXQudmFsdWUgPSBndWFyZFN0YXRlLm1pbkNoYXJnZXNUb1dhaXQ7XG4gIGVsZW1lbnRzLnByb3RlY3Rpb25QYXR0ZXJuU2VsZWN0LnZhbHVlID0gZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uUGF0dGVybjtcbiAgZWxlbWVudHMuY29sb3JDb21wYXJpc29uU2VsZWN0LnZhbHVlID0gZ3VhcmRTdGF0ZS5jb25maWcuY29sb3JDb21wYXJpc29uTWV0aG9kO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplR3VhcmQoaXNBdXRvSW5pdCA9IGZhbHNlKSB7XG4gIHRyeSB7XG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuY2hlY2tpbmdDb2xvcnMnKSwgJ2luZm8nKTtcbiAgICBcbiAgICAvLyBEZXRlY3RhciBjb2xvcmVzIGRpc3BvbmlibGVzXG4gICAgbGV0IGNvbG9ycyA9IGRldGVjdEF2YWlsYWJsZUNvbG9ycygpO1xuICAgIGlmIChjb2xvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBGYWxsYmFjazogaW50ZW50YXIgYWJyaXIgbGEgcGFsZXRhIGF1dG9tXHUwMEUxdGljYW1lbnRlIHNpIGFcdTAwRkFuIG5vIGhheSBjb2xvcmVzXG4gICAgICBsb2coJ1x1MjZBMFx1RkUwRiAwIGNvbG9yZXMgZGV0ZWN0YWRvcy4gSW50ZW50YW5kbyBhYnJpciBwYWxldGEgKGZhbGxiYWNrKS4uLicpO1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuY2xpY2tpbmdQYWludEJ1dHRvbicpLCAnaW5mbycpO1xuICAgICAgaWYgKGZpbmRBbmRDbGlja1BhaW50QnV0dG9uKCkpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoMjUwMCk7XG4gICAgICAgIGNvbG9ycyA9IGRldGVjdEF2YWlsYWJsZUNvbG9ycygpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQubm9Db2xvcnNGb3VuZCcpLCAnZXJyb3InKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgZ3VhcmRTdGF0ZS5hdmFpbGFibGVDb2xvcnMgPSBjb2xvcnM7XG4gICAgZ3VhcmRTdGF0ZS5jb2xvcnNDaGVja2VkID0gdHJ1ZTtcbiAgICBcbiAgICAvLyBPYnRlbmVyIGluZm9ybWFjaVx1MDBGM24gZGUgc2VzaVx1MDBGM25cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2Vzc2lvbigpO1xuICAgIGlmIChzZXNzaW9uLnN1Y2Nlc3MpIHtcbiAgICAgIGd1YXJkU3RhdGUuY3VycmVudENoYXJnZXMgPSBzZXNzaW9uLmRhdGEuY2hhcmdlcztcbiAgICAgIGd1YXJkU3RhdGUubWF4Q2hhcmdlcyA9IHNlc3Npb24uZGF0YS5tYXhDaGFyZ2VzO1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0cyh7IGNoYXJnZXM6IE1hdGguZmxvb3IoZ3VhcmRTdGF0ZS5jdXJyZW50Q2hhcmdlcykgfSk7XG4gICAgICBsb2coYFx1RDgzRFx1REM2NCBVc3VhcmlvOiAke3Nlc3Npb24uZGF0YS51c2VyPy5uYW1lIHx8ICdBblx1MDBGM25pbW8nfSAtIENhcmdhczogJHtndWFyZFN0YXRlLmN1cnJlbnRDaGFyZ2VzfWApO1xuICAgIH1cbiAgICBcbiAgICBndWFyZFN0YXRlLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5jb2xvcnNGb3VuZCcsIHsgY291bnQ6IGNvbG9ycy5sZW5ndGggfSksICdzdWNjZXNzJyk7XG4gICAgZ3VhcmRTdGF0ZS51aS5zaG93QXJlYVNlY3Rpb24oKTtcbiAgICBcbiAgICAvLyBTb2xvIG1vc3RyYXIgbG9nIHVuYSB2ZXogKGV2aXRhciBkdXBsaWNhZG8gZW4gYXV0by1pbmljaW8pXG4gICAgaWYgKCFpc0F1dG9Jbml0KSB7XG4gICAgICBsb2coYFx1MjcwNSAke2NvbG9ycy5sZW5ndGh9IGNvbG9yZXMgZGlzcG9uaWJsZXMgZGV0ZWN0YWRvc2ApO1xuICAgIH1cbiAgICBcbiAgICAvLyBNYXJjYXIgY29tbyBpbmljaWFsaXphZG8gZXhpdG9zYW1lbnRlIHBhcmEgZGVzaGFiaWxpdGFyIGVsIGJvdFx1MDBGM25cbiAgICBndWFyZFN0YXRlLnVpLnNldEluaXRpYWxpemVkKHRydWUpO1xuICAgIFxuICAgIHJldHVybiB0cnVlO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNzRDIEVycm9yIGluaWNpYWxpemFuZG86JywgZXJyb3IpO1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmluaXRFcnJvcicpLCAnZXJyb3InKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gVmFyaWFibGUgcGFyYSBhbG1hY2VuYXIgZmV0Y2ggb3JpZ2luYWxcbmxldCBvcmlnaW5hbEZldGNoID0gd2luZG93LmZldGNoO1xuXG5hc3luYyBmdW5jdGlvbiBzZWxlY3RBcmVhU3RlcEJ5U3RlcCgpIHtcbiAgbG9nKCdcdUQ4M0NcdURGQUYgSW5pY2lhbmRvIHNlbGVjY2lcdTAwRjNuIHBhc28gYSBwYXNvIGRlbCBcdTAwRTFyZWEnKTtcbiAgXG4gIC8vIEVzdGFkbyBwYXJhIGxhIHNlbGVjY2lcdTAwRjNuXG4gIGxldCB1cHBlckxlZnRDb3JuZXIgPSBudWxsO1xuICBsZXQgbG93ZXJSaWdodENvcm5lciA9IG51bGw7XG4gIGxldCBzZWxlY3Rpb25QaGFzZSA9ICd1cHBlckxlZnQnOyAvLyAndXBwZXJMZWZ0JyB8ICdsb3dlclJpZ2h0J1xuICBsZXQgcG9zaXRpb25DYXB0dXJlZCA9IGZhbHNlO1xuICBcbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgcmVzdGF1cmFyIGZldGNoIG9yaWdpbmFsXG4gIGNvbnN0IHJlc3RvcmVGZXRjaCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmZldGNoICE9PSBvcmlnaW5hbEZldGNoKSB7XG4gICAgICB3aW5kb3cuZmV0Y2ggPSBvcmlnaW5hbEZldGNoO1xuICAgICAgbG9nKCdcdUQ4M0RcdUREMDQgRmV0Y2ggb3JpZ2luYWwgcmVzdGF1cmFkbycpO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGludGVyY2VwdGFyIHBpbnRhZG8geSBjYXB0dXJhciBjb29yZGVuYWRhc1xuICBjb25zdCBzZXR1cEZldGNoSW50ZXJjZXB0aW9uID0gKCkgPT4ge1xuICAgIHdpbmRvdy5mZXRjaCA9IGFzeW5jICh1cmwsIG9wdGlvbnMpID0+IHtcbiAgICAgIC8vIFNvbG8gaW50ZXJjZXB0YXIgcmVxdWVzdHMgZXNwZWNcdTAwRURmaWNvcyBkZSBwaW50YWRvIGR1cmFudGUgc2VsZWNjaVx1MDBGM25cbiAgICAgIGlmICghcG9zaXRpb25DYXB0dXJlZCAmJlxuICAgICAgICAgIHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnICYmIFxuICAgICAgICAgIHVybC5pbmNsdWRlcygnL3MwL3BpeGVsLycpICYmIFxuICAgICAgICAgIG9wdGlvbnMgJiYgXG4gICAgICAgICAgb3B0aW9ucy5tZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsb2coYFx1RDgzQ1x1REZBRiBJbnRlcmNlcHRhbmRvIHJlcXVlc3QgZGUgcGludGFkbzogJHt1cmx9YCk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvcmlnaW5hbEZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rICYmIG9wdGlvbnMuYm9keSkge1xuICAgICAgICAgICAgbGV0IGJvZHlEYXRhO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYm9keURhdGEgPSBKU09OLnBhcnNlKG9wdGlvbnMuYm9keSk7XG4gICAgICAgICAgICB9IGNhdGNoIChwYXJzZUVycm9yKSB7XG4gICAgICAgICAgICAgIGxvZygnRXJyb3IgcGFyc2VhbmRvIGJvZHkgZGVsIHJlcXVlc3Q6JywgcGFyc2VFcnJvcik7XG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGJvZHlEYXRhLmNvb3JkcyAmJiBBcnJheS5pc0FycmF5KGJvZHlEYXRhLmNvb3JkcykgJiYgYm9keURhdGEuY29vcmRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGxvY2FsWCA9IGJvZHlEYXRhLmNvb3Jkc1swXTtcbiAgICAgICAgICAgICAgY29uc3QgbG9jYWxZID0gYm9keURhdGEuY29vcmRzWzFdO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gRXh0cmFlciB0aWxlIGRlIGxhIFVSTFxuICAgICAgICAgICAgICBjb25zdCB0aWxlTWF0Y2ggPSB1cmwubWF0Y2goL1xcL3MwXFwvcGl4ZWxcXC8oLT9cXGQrKVxcLygtP1xcZCspLyk7XG4gICAgICAgICAgICAgIGlmICh0aWxlTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlWCA9IHBhcnNlSW50KHRpbGVNYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZVkgPSBwYXJzZUludCh0aWxlTWF0Y2hbMl0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGFyIGNvb3JkZW5hZGFzIGdsb2JhbGVzIHVzYW5kbyBUSUxFX1NJWkUgY29ycmVjdG9cbiAgICAgICAgICAgICAgICBjb25zdCBnbG9iYWxYID0gdGlsZVggKiBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkUgKyBsb2NhbFg7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2xvYmFsWSA9IHRpbGVZICogR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFICsgbG9jYWxZO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25QaGFzZSA9PT0gJ3VwcGVyTGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgIC8vIENhcHR1cmFyIGVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhXG4gICAgICAgICAgICAgICAgICB1cHBlckxlZnRDb3JuZXIgPSB7IHg6IGdsb2JhbFgsIHk6IGdsb2JhbFkgfTtcbiAgICAgICAgICAgICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlQ29vcmRpbmF0ZXMoeyB4MTogZ2xvYmFsWCwgeTE6IGdsb2JhbFkgfSk7XG4gICAgICAgICAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC51cHBlckxlZnRDYXB0dXJlZCcsIHsgeDogZ2xvYmFsWCwgeTogZ2xvYmFsWSB9KSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgIGxvZyhgXHUyNzA1IEVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhIGNhcHR1cmFkYTogKCR7Z2xvYmFsWH0sICR7Z2xvYmFsWX0pYCk7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIENhbWJpYXIgYSBmYXNlIGRlIGVzcXVpbmEgaW5mZXJpb3IgZGVyZWNoYVxuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uUGhhc2UgPSAnbG93ZXJSaWdodCc7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblBoYXNlID09PSAnbG93ZXJSaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5zZWxlY3RMb3dlclJpZ2h0JyksICdpbmZvJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rpb25QaGFzZSA9PT0gJ2xvd2VyUmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAvLyBDYXB0dXJhciBlc3F1aW5hIGluZmVyaW9yIGRlcmVjaGFcbiAgICAgICAgICAgICAgICAgIGxvd2VyUmlnaHRDb3JuZXIgPSB7IHg6IGdsb2JhbFgsIHk6IGdsb2JhbFkgfTtcbiAgICAgICAgICAgICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlQ29vcmRpbmF0ZXMoeyB4MjogZ2xvYmFsWCwgeTI6IGdsb2JhbFkgfSk7XG4gICAgICAgICAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5sb3dlclJpZ2h0Q2FwdHVyZWQnLCB7IHg6IGdsb2JhbFgsIHk6IGdsb2JhbFkgfSksICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICBsb2coYFx1MjcwNSBFc3F1aW5hIGluZmVyaW9yIGRlcmVjaGEgY2FwdHVyYWRhOiAoJHtnbG9iYWxYfSwgJHtnbG9iYWxZfSlgKTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gQ29tcGxldGFyIHNlbGVjY2lcdTAwRjNuXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbkNhcHR1cmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHJlc3RvcmVGZXRjaCgpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBWYWxpZGFyIFx1MDBFMXJlYVxuICAgICAgICAgICAgICAgICAgaWYgKHVwcGVyTGVmdENvcm5lci54ID49IGxvd2VyUmlnaHRDb3JuZXIueCB8fCB1cHBlckxlZnRDb3JuZXIueSA+PSBsb3dlclJpZ2h0Q29ybmVyLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuaW52YWxpZEFyZWEnKSwgJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gQ2FwdHVyYXIgXHUwMEUxcmVhIGF1dG9tXHUwMEUxdGljYW1lbnRlXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2FwdHVyZUFyZWFGcm9tQ29vcmRpbmF0ZXModXBwZXJMZWZ0Q29ybmVyLCBsb3dlclJpZ2h0Q29ybmVyKTtcbiAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nKCdcdTI3NEMgRXJyb3IgaW50ZXJjZXB0YW5kbyBwaXhlbDonLCBlcnJvcik7XG4gICAgICAgICAgcmVzdG9yZUZldGNoKCk7XG4gICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBQYXJhIHRvZG9zIGxvcyBkZW1cdTAwRTFzIHJlcXVlc3RzLCB1c2FyIGZldGNoIG9yaWdpbmFsXG4gICAgICByZXR1cm4gb3JpZ2luYWxGZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgIH07XG4gIH07XG4gIFxuICAvLyBDb25maWd1cmFyIGludGVyY2VwdGFjaVx1MDBGM25cbiAgc2V0dXBGZXRjaEludGVyY2VwdGlvbigpO1xuICBcbiAgLy8gSW5pY2lhciBjb24gZXNxdWluYSBzdXBlcmlvciBpenF1aWVyZGFcbiAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuc2VsZWN0VXBwZXJMZWZ0JyksICdpbmZvJyk7XG4gIFxuICAvLyBUaW1lb3V0IHBhcmEgc2VsZWNjaVx1MDBGM24gKDIgbWludXRvcylcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKCFwb3NpdGlvbkNhcHR1cmVkKSB7XG4gICAgICByZXN0b3JlRmV0Y2goKTtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLnNlbGVjdGlvblRpbWVvdXQnKSwgJ2Vycm9yJyk7XG4gICAgICBsb2coJ1x1MjNGMCBUaW1lb3V0IGVuIHNlbGVjY2lcdTAwRjNuIGRlIFx1MDBFMXJlYScpO1xuICAgIH1cbiAgfSwgMTIwMDAwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2FwdHVyZUFyZWFGcm9tQ29vcmRpbmF0ZXModXBwZXJMZWZ0LCBsb3dlclJpZ2h0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYXJlYSA9IHtcbiAgICAgIHgxOiB1cHBlckxlZnQueCxcbiAgICAgIHkxOiB1cHBlckxlZnQueSxcbiAgICAgIHgyOiBsb3dlclJpZ2h0LngsXG4gICAgICB5MjogbG93ZXJSaWdodC55XG4gICAgfTtcbiAgICBcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5jYXB0dXJpbmdBcmVhJyksICdpbmZvJyk7XG4gICAgXG4gICAgY29uc3QgcGl4ZWxNYXAgPSBhd2FpdCBhbmFseXplQXJlYVBpeGVscyhhcmVhLCB7IGFsbG93VmlydHVhbDogdHJ1ZSB9KTtcbiAgICBcbiAgICBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhID0gYXJlYTtcbiAgICBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzID0gcGl4ZWxNYXA7XG4gICAgZ3VhcmRTdGF0ZS5jaGFuZ2VzLmNsZWFyKCk7XG4gICAgXG4gICAgLy8gRGV0ZWN0YXIgc2kgZWwgXHUwMEUxcmVhIGVzIHZpcnR1YWwgKHRvZG9zIGxvcyBwXHUwMEVEeGVsZXMgc29uIGJsYW5jb3MgY29uIElEIDUpXG4gICAgY29uc3QgaXNWaXJ0dWFsID0gcGl4ZWxNYXAuc2l6ZSA+IDAgJiYgQXJyYXkuZnJvbShwaXhlbE1hcC52YWx1ZXMoKSlcbiAgICAgIC5ldmVyeShwaXhlbCA9PiBwaXhlbC5jb2xvcklkID09PSA1ICYmIHBpeGVsLnIgPT09IDI1NSAmJiBwaXhlbC5nID09PSAyNTUgJiYgcGl4ZWwuYiA9PT0gMjU1KTtcbiAgICBcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVByb2dyZXNzKHBpeGVsTWFwLnNpemUsIDAsIGlzVmlydHVhbCk7XG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuYXJlYUNhcHR1cmVkJywgeyBjb3VudDogcGl4ZWxNYXAuc2l6ZSB9KSwgJ3N1Y2Nlc3MnKTtcbiAgICBndWFyZFN0YXRlLnVpLmVuYWJsZVN0YXJ0QnRuKCk7XG4gICAgXG4gICAgbG9nKGBcdTI3MDUgXHUwMEMxcmVhIGNhcHR1cmFkYTogJHtwaXhlbE1hcC5zaXplfSBwXHUwMEVEeGVsZXMgcHJvdGVnaWRvc2ApO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNzRDIEVycm9yIGNhcHR1cmFuZG8gXHUwMEUxcmVhOicsIGVycm9yKTtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5jYXB0dXJlRXJyb3InLCB7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0pLCAnZXJyb3InKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzdGFydEd1YXJkKCkge1xuICBpZiAoIWd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEgfHwgIWd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSkge1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmNhcHR1cmVGaXJzdCcpLCAnZXJyb3InKTtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIGd1YXJkU3RhdGUucnVubmluZyA9IHRydWU7XG4gIGd1YXJkU3RhdGUudWkuc2V0UnVubmluZ1N0YXRlKHRydWUpO1xuICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5wcm90ZWN0aW9uU3RhcnRlZCcpLCAnc3VjY2VzcycpO1xuICBcbiAgbG9nKCdcdUQ4M0RcdURFRTFcdUZFMEYgSW5pY2lhbmRvIHByb3RlY2NpXHUwMEYzbiBkZWwgXHUwMEUxcmVhJyk7XG4gIFxuICAvLyBDb25maWd1cmFyIGludGVydmFsbyBkZSB2ZXJpZmljYWNpXHUwMEYzblxuICBndWFyZFN0YXRlLmNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChjaGVja0ZvckNoYW5nZXMsIEdVQVJEX0RFRkFVTFRTLkNIRUNLX0lOVEVSVkFMKTtcbiAgXG4gIC8vIEluaWNpYXIgbW9uaXRvcmVvIGRlIGNhcmdhc1xuICBzdGFydENoYXJnZU1vbml0b3JpbmcoKTtcbiAgXG4gIC8vIFByaW1lcmEgdmVyaWZpY2FjaVx1MDBGM24gaW5tZWRpYXRhXG4gIGF3YWl0IGNoZWNrRm9yQ2hhbmdlcygpO1xufVxuXG5mdW5jdGlvbiBzdG9wR3VhcmQoKSB7XG4gIGd1YXJkU3RhdGUucnVubmluZyA9IGZhbHNlO1xuICBcbiAgaWYgKGd1YXJkU3RhdGUuY2hlY2tJbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwoZ3VhcmRTdGF0ZS5jaGVja0ludGVydmFsKTtcbiAgICBndWFyZFN0YXRlLmNoZWNrSW50ZXJ2YWwgPSBudWxsO1xuICB9XG4gIFxuICAvLyBEZXRlbmVyIG1vbml0b3JlbyBkZSBjYXJnYXNcbiAgc3RvcENoYXJnZU1vbml0b3JpbmcoKTtcbiAgXG4gIGlmIChndWFyZFN0YXRlLnVpKSB7XG4gICAgZ3VhcmRTdGF0ZS51aS5zZXRSdW5uaW5nU3RhdGUoZmFsc2UpO1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLnByb3RlY3Rpb25TdG9wcGVkJyksICd3YXJuaW5nJyk7XG4gIH1cbiAgXG4gIGxvZygnXHUyM0Y5XHVGRTBGIFByb3RlY2NpXHUwMEYzbiBkZXRlbmlkYScpO1xufVxuXG4vLyBWYXJpYWJsZXMgcGFyYSBlbCBzaXN0ZW1hIGRlIHJlcG9zaWNpb25hbWllbnRvXG5sZXQgcmVwb3NpdGlvblN0YXRlID0ge1xuICBpc1JlcG9zaXRpb25pbmc6IGZhbHNlLFxuICBvcmlnaW5hbFBpeGVsczogbnVsbCxcbiAgb3JpZ2luYWxBcmVhOiBudWxsLFxuICBvdmVybGF5RW5hYmxlZDogZmFsc2Vcbn07XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGluaWNpYXIgZWwgcmVwb3NpY2lvbmFtaWVudG9cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0UmVwb3NpdGlvbmluZygpIHtcbiAgaWYgKCFndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhIHx8ICFndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzIHx8IGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSA9PT0gMCkge1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKCdcdTI3NEMgTm8gaGF5IFx1MDBFMXJlYSBwcm90ZWdpZGEgcGFyYSByZXBvc2ljaW9uYXInLCAnZXJyb3InKTtcbiAgICBsb2coJ1x1Mjc0QyBObyBoYXkgXHUwMEUxcmVhIGNhcHR1cmFkYSBwYXJhIHJlcG9zaWNpb25hcicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZygnXHVEODNEXHVEQ0NEIEluaWNpYW5kbyByZXBvc2ljaW9uYW1pZW50byBkZWwgXHUwMEUxcmVhIHByb3RlZ2lkYS4uLicpO1xuICBcbiAgLy8gR3VhcmRhciBlc3RhZG8gb3JpZ2luYWxcbiAgcmVwb3NpdGlvblN0YXRlLm9yaWdpbmFsUGl4ZWxzID0gbmV3IE1hcChndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzKTtcbiAgcmVwb3NpdGlvblN0YXRlLm9yaWdpbmFsQXJlYSA9IHsgLi4uZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSB9O1xuICByZXBvc2l0aW9uU3RhdGUuaXNSZXBvc2l0aW9uaW5nID0gdHJ1ZTtcbiAgXG4gIC8vIE1vc3RyYXIgaW5zdHJ1Y2Npb25lc1xuICBjb25zdCBzdGF0dXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc3RhdHVzRGl2LmlkID0gJ3JlcG9zaXRpb25TdGF0dXMnO1xuICBzdGF0dXNEaXYuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAyMHB4O1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gICAgYmFja2dyb3VuZDogIzFmMjkzNztcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBwYWRkaW5nOiAxNXB4IDIwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICM4YjVjZjY7XG4gICAgei1pbmRleDogMTAwMDAzO1xuICAgIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBSb2JvdG8sIHNhbnMtc2VyaWY7XG4gICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMyk7XG4gIGA7XG4gIHN0YXR1c0Rpdi5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj5cbiAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZDsgbWFyZ2luLWJvdHRvbTogOHB4O1wiPlx1RDgzRFx1RENDRCBSZXBvc2ljaW9uYW1pZW50byBBY3Rpdm88L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDE0cHg7IGNvbG9yOiAjY2JkNWUwO1wiPlBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gbGEgbnVldmEgZXNxdWluYSBzdXBlcmlvciBpenF1aWVyZGE8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGF0dXNEaXYpO1xuICBcbiAgLy8gSW50ZXJjZXB0YXIgY2xpY2tzIHBhcmEgY2FwdHVyYXIgbnVldmEgcG9zaWNpXHUwMEYzblxuICBhd2FpdCBjYXB0dXJlTmV3UG9zaXRpb24oc3RhdHVzRGl2KTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgY2FwdHVyYXIgbGEgbnVldmEgcG9zaWNpXHUwMEYzblxuYXN5bmMgZnVuY3Rpb24gY2FwdHVyZU5ld1Bvc2l0aW9uKHN0YXR1c0Rpdikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBsZXQgcG9zaXRpb25DYXB0dXJlZCA9IGZhbHNlO1xuICAgIFxuICAgIC8vIEludGVyY2VwdGFyIGZldGNoIHBhcmEgZGV0ZWN0YXIgcGludGFkb1xuICAgIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSB3aW5kb3cuZmV0Y2g7XG4gICAgd2luZG93LmZldGNoID0gYXN5bmMgZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvcmlnaW5hbEZldGNoLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgXG4gICAgICBpZiAoIXJlcG9zaXRpb25TdGF0ZS5pc1JlcG9zaXRpb25pbmcgfHwgcG9zaXRpb25DYXB0dXJlZCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIERldGVjdGFyIHJlcXVlc3QgZGUgcGludGFkbyBkZSBXUGxhY2VcbiAgICAgIGNvbnN0IHVybCA9IGFyZ3NbMF0/LnVybCB8fCBhcmdzWzBdO1xuICAgICAgaWYgKHVybCAmJiB1cmwuaW5jbHVkZXMoJy9zMC9waXhlbC8nKSAmJiBhcmdzWzFdPy5tZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxvZygnXHVEODNEXHVERDBEIFJlcXVlc3QgaW50ZXJjZXB0YWRvOicsIHVybCk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gRXh0cmFlciBjb29yZGVuYWRhcyBkZWwgdGlsZSBkZSBsYSBVUkxcbiAgICAgICAgICBjb25zdCB1cmxNYXRjaCA9IHVybC5tYXRjaCgvXFwvczBcXC9waXhlbFxcLyhcXGQrKVxcLyhcXGQrKS8pO1xuICAgICAgICAgIGlmICh1cmxNYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgdGlsZVggPSBwYXJzZUludCh1cmxNYXRjaFsxXSk7XG4gICAgICAgICAgICBjb25zdCB0aWxlWSA9IHBhcnNlSW50KHVybE1hdGNoWzJdKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRXh0cmFlciBjb29yZGVuYWRhcyBkZWwgcmVxdWVzdCBib2R5XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IGFyZ3NbMV0/LmJvZHk7XG4gICAgICAgICAgICBsb2coJ1x1RDgzRFx1REQwRCBSZXF1ZXN0IGJvZHk6JywgcmVxdWVzdEJvZHkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmVxdWVzdEJvZHkpIHtcbiAgICAgICAgICAgICAgY29uc3QgYm9keURhdGEgPSBKU09OLnBhcnNlKHJlcXVlc3RCb2R5KTtcbiAgICAgICAgICAgICAgbG9nKCdcdUQ4M0RcdUREMEQgQm9keSBkYXRhOicsIGJvZHlEYXRhKTtcbiAgICAgICAgICAgICAgY29uc3QgY29vcmRzID0gYm9keURhdGEuY29vcmRzO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKGNvb3JkcyAmJiBjb29yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uQ2FwdHVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxvZygnXHVEODNEXHVERDBEIENvb3JkcyBhcnJheSBzdHJ1Y3R1cmU6JywgY29vcmRzLCAnTGVuZ3RoOicsIGNvb3Jkcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIExhcyBjb29yZGVuYWRhcyBwdWVkZW4gZXN0YXIgZW4gZGlmZXJlbnRlcyBmb3JtYXRvc1xuICAgICAgICAgICAgICAgIGxldCByZWxhdGl2ZVgsIHJlbGF0aXZlWTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY29vcmRzLmxlbmd0aCA+PSAyICYmIHR5cGVvZiBjb29yZHNbMF0gPT09ICdudW1iZXInICYmIHR5cGVvZiBjb29yZHNbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAvLyBGb3JtYXRvOiBbeCwgeV0gY29tbyBuXHUwMEZBbWVyb3Mgc2VwYXJhZG9zXG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZVggPSBjb29yZHNbMF07XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZVkgPSBjb29yZHNbMV07XG4gICAgICAgICAgICAgICAgICBsb2coJ1x1RDgzRFx1REQwRCBDb29yZGVuYWRhcyBjb21vIG5cdTAwRkFtZXJvcyBzZXBhcmFkb3M6JywgcmVsYXRpdmVYLCByZWxhdGl2ZVkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb29yZHNbMF0pKSB7XG4gICAgICAgICAgICAgICAgICAvLyBGb3JtYXRvOiBbW3gsIHldXVxuICAgICAgICAgICAgICAgICAgcmVsYXRpdmVYID0gY29vcmRzWzBdWzBdO1xuICAgICAgICAgICAgICAgICAgcmVsYXRpdmVZID0gY29vcmRzWzBdWzFdO1xuICAgICAgICAgICAgICAgICAgbG9nKCdcdUQ4M0RcdUREMEQgQ29vcmRlbmFkYXMgY29tbyBhcnJheSBhbmlkYWRvOicsIHJlbGF0aXZlWCwgcmVsYXRpdmVZKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb29yZHNbMF0gPT09ICdvYmplY3QnICYmIGNvb3Jkc1swXS54ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEZvcm1hdG86IFt7eCwgeX1dXG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZVggPSBjb29yZHNbMF0ueDtcbiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlWSA9IGNvb3Jkc1swXS55O1xuICAgICAgICAgICAgICAgICAgbG9nKCdcdUQ4M0RcdUREMEQgQ29vcmRlbmFkYXMgY29tbyBvYmpldG86JywgcmVsYXRpdmVYLCByZWxhdGl2ZVkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBsb2coJ1x1Mjc0QyBGb3JtYXRvIGRlIGNvb3JkZW5hZGFzIG5vIHJlY29ub2NpZG86JywgY29vcmRzKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gTGFzIGNvb3JkZW5hZGFzIGVuIGVsIGJvZHkgc29uIHJlbGF0aXZhcyBhbCB0aWxlLCBjb252ZXJ0aXIgYSBhYnNvbHV0YXNcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdYID0gdGlsZVggKiAxMDAwICsgcmVsYXRpdmVYO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1kgPSB0aWxlWSAqIDEwMDAgKyByZWxhdGl2ZVk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbG9nKGBcdUQ4M0RcdURDQ0QgTnVldmEgcG9zaWNpXHUwMEYzbiBjYXB0dXJhZGE6ICgke25ld1h9LCAke25ld1l9KWApO1xuICAgICAgICAgICAgICAgIGxvZyhgXHVEODNEXHVEQ0QwIFRpbGU6ICgke3RpbGVYfSwgJHt0aWxlWX0pLCBSZWxhdGl2YTogKCR7cmVsYXRpdmVYfSwgJHtyZWxhdGl2ZVl9KWApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFJlc3RhdXJhciBmZXRjaCBvcmlnaW5hbFxuICAgICAgICAgICAgICAgIHdpbmRvdy5mZXRjaCA9IG9yaWdpbmFsRmV0Y2g7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXIgb2Zmc2V0IHkgcmVwb3NpY2lvbmFyIFx1MDBFMXJlYVxuICAgICAgICAgICAgICAgIGF3YWl0IHJlcG9zaXRpb25BcmVhKG5ld1gsIG5ld1ksIHN0YXR1c0Rpdik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZygnXHUyNzRDIEVycm9yIGNhcHR1cmFuZG8gbnVldmEgcG9zaWNpXHUwMEYzbjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG4gICAgXG4gICAgLy8gVGltZW91dCBkZSAzMCBzZWd1bmRvc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCFwb3NpdGlvbkNhcHR1cmVkKSB7XG4gICAgICAgIHdpbmRvdy5mZXRjaCA9IG9yaWdpbmFsRmV0Y2g7XG4gICAgICAgIHJlcG9zaXRpb25TdGF0ZS5pc1JlcG9zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgc3RhdHVzRGl2LnJlbW92ZSgpO1xuICAgICAgICBsb2coJ1x1MjNGMCBUaW1lb3V0IGVuIGNhcHR1cmEgZGUgbnVldmEgcG9zaWNpXHUwMEYzbicpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSwgMzAwMDApO1xuICB9KTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgcmVwb3NpY2lvbmFyIGVsIFx1MDBFMXJlYVxuYXN5bmMgZnVuY3Rpb24gcmVwb3NpdGlvbkFyZWEobmV3WCwgbmV3WSwgc3RhdHVzRGl2KSB7XG4gIC8vIENhbGN1bGFyIG9mZnNldCBiYXNhZG8gZW4gbGEgZXNxdWluYSBzdXBlcmlvciBpenF1aWVyZGEgb3JpZ2luYWxcbiAgY29uc3Qgb3JpZ2luYWxBcmVhID0gcmVwb3NpdGlvblN0YXRlLm9yaWdpbmFsQXJlYTtcbiAgY29uc3Qgb2Zmc2V0WCA9IG5ld1ggLSBvcmlnaW5hbEFyZWEueDE7XG4gIGNvbnN0IG9mZnNldFkgPSBuZXdZIC0gb3JpZ2luYWxBcmVhLnkxO1xuICBcbiAgbG9nKGBcdUQ4M0RcdURDRDAgQ2FsY3VsYW5kbyBvZmZzZXQ6ICgke29mZnNldFh9LCAke29mZnNldFl9KWApO1xuICBcbiAgLy8gQ3JlYXIgbnVldmEgXHUwMEUxcmVhIGNvbiBsYXMgcG9zaWNpb25lcyBhY3R1YWxpemFkYXNcbiAgY29uc3QgbmV3QXJlYSA9IHtcbiAgICB4MTogb3JpZ2luYWxBcmVhLngxICsgb2Zmc2V0WCxcbiAgICB5MTogb3JpZ2luYWxBcmVhLnkxICsgb2Zmc2V0WSxcbiAgICB4Mjogb3JpZ2luYWxBcmVhLngyICsgb2Zmc2V0WCxcbiAgICB5Mjogb3JpZ2luYWxBcmVhLnkyICsgb2Zmc2V0WSxcbiAgICB0aWxlWDogTWF0aC5mbG9vcigob3JpZ2luYWxBcmVhLngxICsgb2Zmc2V0WCkgLyBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkUpLFxuICAgIHRpbGVZOiBNYXRoLmZsb29yKChvcmlnaW5hbEFyZWEueTEgKyBvZmZzZXRZKSAvIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRSlcbiAgfTtcbiAgXG4gIC8vIENyZWFyIG51ZXZvcyBwXHUwMEVEeGVsZXMgY29uIGxhcyBwb3NpY2lvbmVzIGFjdHVhbGl6YWRhc1xuICBjb25zdCBuZXdQaXhlbHMgPSBuZXcgTWFwKCk7XG4gIHJlcG9zaXRpb25TdGF0ZS5vcmlnaW5hbFBpeGVscy5mb3JFYWNoKChjb2xvckRhdGEsIGtleSkgPT4ge1xuICAgIGNvbnN0IFt4LCB5XSA9IGtleS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgIGNvbnN0IG5ld0tleSA9IGAke3ggKyBvZmZzZXRYfSwke3kgKyBvZmZzZXRZfWA7XG4gICAgbmV3UGl4ZWxzLnNldChuZXdLZXksIGNvbG9yRGF0YSk7XG4gIH0pO1xuICBcbiAgLy8gTW9zdHJhciBvdmVybGF5IGRlIGNvbmZpcm1hY2lcdTAwRjNuXG4gIGF3YWl0IHNob3dSZXBvc2l0aW9uT3ZlcmxheShuZXdBcmVhLCBuZXdQaXhlbHMsIHN0YXR1c0Rpdik7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIG1vc3RyYXIgZWwgb3ZlcmxheSBkZSByZXBvc2ljaW9uYW1pZW50b1xuYXN5bmMgZnVuY3Rpb24gc2hvd1JlcG9zaXRpb25PdmVybGF5KG5ld0FyZWEsIG5ld1BpeGVscywgc3RhdHVzRGl2KSB7XG4gIHJlcG9zaXRpb25TdGF0ZS5vdmVybGF5RW5hYmxlZCA9IHRydWU7XG4gIFxuICAvLyBNb3N0cmFyIG92ZXJsYXkgdmlzdWFsIGVuIGVsIGNhbnZhc1xuICBndWFyZE92ZXJsYXkuc2hvd1Byb3RlY3Rpb25BcmVhKG5ld0FyZWEpO1xuICBsb2coJ1x1RDgzQ1x1REZBRiBPdmVybGF5IHZpc3VhbCBhY3RpdmFkbyBwYXJhIHZpc3RhIHByZXZpYSBkZSByZXBvc2ljaW9uYW1pZW50bycpO1xuICBcbiAgLy8gQWN0dWFsaXphciBlbCBzdGF0dXMgY29uIGJvdG9uZXMgZGUgY29uZmlybWFjaVx1MDBGM25cbiAgc3RhdHVzRGl2LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPlxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkOyBtYXJnaW4tYm90dG9tOiA4cHg7XCI+XHVEODNEXHVEQ0NEIFZpc3RhIFByZXZpYSBkZSBSZXBvc2ljaW9uYW1pZW50bzwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTRweDsgY29sb3I6ICNjYmQ1ZTA7IG1hcmdpbi1ib3R0b206IDhweDtcIj5OdWV2YSBcdTAwRTFyZWE6ICgke25ld0FyZWEueDF9LCAke25ld0FyZWEueTF9KSBcdTIxOTIgKCR7bmV3QXJlYS54Mn0sICR7bmV3QXJlYS55Mn0pPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxNHB4OyBjb2xvcjogI2NiZDVlMDsgbWFyZ2luLWJvdHRvbTogMTVweDtcIj5cdTAwQkZDb25maXJtYXIgbnVldmEgcG9zaWNpXHUwMEYzbj88L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBnYXA6IDEwcHg7IGp1c3RpZnktY29udGVudDogY2VudGVyO1wiPlxuICAgICAgICA8YnV0dG9uIGlkPVwiY29uZmlybVJlcG9zaXRpb25cIiBzdHlsZT1cInBhZGRpbmc6IDhweCAxNnB4OyBiYWNrZ3JvdW5kOiAjMTBiOTgxOyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogNnB4OyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtd2VpZ2h0OiA2MDA7XCI+XG4gICAgICAgICAgXHUyNzA1IEFjZXB0YXJcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gaWQ9XCJyZXRyeVJlcG9zaXRpb25cIiBzdHlsZT1cInBhZGRpbmc6IDhweCAxNnB4OyBiYWNrZ3JvdW5kOiAjZjU5ZTBiOyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogNnB4OyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtd2VpZ2h0OiA2MDA7XCI+XG4gICAgICAgICAgXHVEODNEXHVERDA0IFJlcGV0aXJcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gaWQ9XCJjYW5jZWxSZXBvc2l0aW9uXCIgc3R5bGU9XCJwYWRkaW5nOiA4cHggMTZweDsgYmFja2dyb3VuZDogI2VmNDQ0NDsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDZweDsgY3Vyc29yOiBwb2ludGVyOyBmb250LXdlaWdodDogNjAwO1wiPlxuICAgICAgICAgIFx1Mjc0QyBDYW5jZWxhclxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgO1xuICBcbiAgLy8gRXZlbnQgbGlzdGVuZXJzIHBhcmEgbG9zIGJvdG9uZXNcbiAgc3RhdHVzRGl2LnF1ZXJ5U2VsZWN0b3IoJyNjb25maXJtUmVwb3NpdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbmZpcm1SZXBvc2l0aW9uaW5nKG5ld0FyZWEsIG5ld1BpeGVscywgc3RhdHVzRGl2KTtcbiAgfSk7XG4gIFxuICBzdGF0dXNEaXYucXVlcnlTZWxlY3RvcignI3JldHJ5UmVwb3NpdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHJldHJ5UmVwb3NpdGlvbmluZyhzdGF0dXNEaXYpO1xuICB9KTtcbiAgXG4gIHN0YXR1c0Rpdi5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsUmVwb3NpdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNhbmNlbFJlcG9zaXRpb25pbmcoc3RhdHVzRGl2KTtcbiAgfSk7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGNvbmZpcm1hciBlbCByZXBvc2ljaW9uYW1pZW50b1xuZnVuY3Rpb24gY29uZmlybVJlcG9zaXRpb25pbmcobmV3QXJlYSwgbmV3UGl4ZWxzLCBzdGF0dXNEaXYpIHtcbiAgLy8gQWN0dWFsaXphciBlbCBlc3RhZG8gcGVybWFuZW50ZW1lbnRlXG4gIGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEgPSBuZXdBcmVhO1xuICBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzID0gbmV3UGl4ZWxzO1xuICBcbiAgLy8gQWN0dWFsaXphciBsYSBVSSBjb24gbGFzIG51ZXZhcyBjb29yZGVuYWRhc1xuICBndWFyZFN0YXRlLnVpLnVwZGF0ZUNvb3JkaW5hdGVzKHtcbiAgICB4MTogbmV3QXJlYS54MSxcbiAgICB5MTogbmV3QXJlYS55MSxcbiAgICB4MjogbmV3QXJlYS54MixcbiAgICB5MjogbmV3QXJlYS55MlxuICB9KTtcbiAgXG4gIC8vIEFjdHVhbGl6YXIgZXN0YWRcdTAwRURzdGljYXNcbiAgZ3VhcmRTdGF0ZS51aS51cGRhdGVQcm9ncmVzcygwLCBuZXdQaXhlbHMuc2l6ZSk7XG4gIFxuICAvLyBPY3VsdGFyIG92ZXJsYXkgdmlzdWFsXG4gIGd1YXJkT3ZlcmxheS5oaWRlUHJvdGVjdGlvbkFyZWEoKTtcbiAgbG9nKCdcdUQ4M0NcdURGQUYgT3ZlcmxheSB2aXN1YWwgZGVzYWN0aXZhZG8gdHJhcyBjb25maXJtYXIgcmVwb3NpY2lvbmFtaWVudG8nKTtcbiAgXG4gIC8vIExpbXBpYXIgZXN0YWRvIGRlIHJlcG9zaWNpb25hbWllbnRvXG4gIGNsZWFudXBSZXBvc2l0aW9uaW5nKHN0YXR1c0Rpdik7XG4gIFxuICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cygnXHUyNzA1IFx1MDBDMXJlYSByZXBvc2ljaW9uYWRhIGNvcnJlY3RhbWVudGUnLCAnc3VjY2VzcycpO1xuICBsb2coJ1x1MjcwNSBSZXBvc2ljaW9uYW1pZW50byBjb25maXJtYWRvJyk7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIHJlaW50ZW50YXIgZWwgcmVwb3NpY2lvbmFtaWVudG9cbmZ1bmN0aW9uIHJldHJ5UmVwb3NpdGlvbmluZyhzdGF0dXNEaXYpIHtcbiAgLy8gT2N1bHRhciBvdmVybGF5IHZpc3VhbCBhY3R1YWxcbiAgZ3VhcmRPdmVybGF5LmhpZGVQcm90ZWN0aW9uQXJlYSgpO1xuICBsb2coJ1x1RDgzQ1x1REZBRiBPdmVybGF5IHZpc3VhbCBkZXNhY3RpdmFkbyBwYXJhIHJlaW50ZW50YXIgcmVwb3NpY2lvbmFtaWVudG8nKTtcbiAgXG4gIC8vIExpbXBpYXIgb3ZlcmxheVxuICBjbGVhbnVwUmVwb3NpdGlvbmluZyhzdGF0dXNEaXYpO1xuICBcbiAgLy8gUmVpbmljaWFyIHByb2Nlc29cbiAgc3RhcnRSZXBvc2l0aW9uaW5nKCk7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGNhbmNlbGFyIGVsIHJlcG9zaWNpb25hbWllbnRvXG5mdW5jdGlvbiBjYW5jZWxSZXBvc2l0aW9uaW5nKHN0YXR1c0Rpdikge1xuICAvLyBPY3VsdGFyIG92ZXJsYXkgdmlzdWFsXG4gIGd1YXJkT3ZlcmxheS5oaWRlUHJvdGVjdGlvbkFyZWEoKTtcbiAgbG9nKCdcdUQ4M0NcdURGQUYgT3ZlcmxheSB2aXN1YWwgZGVzYWN0aXZhZG8gdHJhcyBjYW5jZWxhciByZXBvc2ljaW9uYW1pZW50bycpO1xuICBcbiAgLy8gTGltcGlhciB0b2RvXG4gIGNsZWFudXBSZXBvc2l0aW9uaW5nKHN0YXR1c0Rpdik7XG4gIFxuICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cygnXHUyNzRDIFJlcG9zaWNpb25hbWllbnRvIGNhbmNlbGFkbycsICd3YXJuaW5nJyk7XG4gIGxvZygnXHUyNzRDIFJlcG9zaWNpb25hbWllbnRvIGNhbmNlbGFkbycpO1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSBsaW1waWFyIGVsIGVzdGFkbyBkZSByZXBvc2ljaW9uYW1pZW50b1xuZnVuY3Rpb24gY2xlYW51cFJlcG9zaXRpb25pbmcoc3RhdHVzRGl2KSB7XG4gIHJlcG9zaXRpb25TdGF0ZS5pc1JlcG9zaXRpb25pbmcgPSBmYWxzZTtcbiAgcmVwb3NpdGlvblN0YXRlLm9yaWdpbmFsUGl4ZWxzID0gbnVsbDtcbiAgcmVwb3NpdGlvblN0YXRlLm9yaWdpbmFsQXJlYSA9IG51bGw7XG4gIHJlcG9zaXRpb25TdGF0ZS5vdmVybGF5RW5hYmxlZCA9IGZhbHNlO1xuICBcbiAgLy8gUmVtb3ZlciBlbGVtZW50b3MgVUlcbiAgc3RhdHVzRGl2LnJlbW92ZSgpO1xufVxuIiwgImltcG9ydCB7IGd1YXJkU3RhdGUgfSBmcm9tICcuL2NvbmZpZy5qcyc7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9jb3JlL2xvZ2dlci5qcyc7XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGRpdmlkaXIgZWwgXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzbiBlbiBtXHUwMEZBbHRpcGxlcyBwYXJ0ZXNcbmZ1bmN0aW9uIHNwbGl0UHJvdGVjdGlvbkFyZWEoYXJlYSwgc3BsaXRDb3VudCkge1xuICBjb25zdCB7IHgxLCB5MSwgeDIsIHkyIH0gPSBhcmVhO1xuICBjb25zdCB3aWR0aCA9IHgyIC0geDE7XG4gIGNvbnN0IGhlaWdodCA9IHkyIC0geTE7XG4gIGNvbnN0IGFyZWFzID0gW107XG4gIFxuICBpZiAoc3BsaXRDb3VudCA8PSAxKSB7XG4gICAgcmV0dXJuIFthcmVhXTtcbiAgfVxuICBcbiAgLy8gRGV0ZXJtaW5hciBzaSBkaXZpZGlyIGhvcml6b250YWwgbyB2ZXJ0aWNhbG1lbnRlIGJhc2FkbyBlbiBsYXMgZGltZW5zaW9uZXNcbiAgY29uc3QgZGl2aWRlSG9yaXpvbnRhbGx5ID0gd2lkdGggPj0gaGVpZ2h0O1xuICBcbiAgaWYgKGRpdmlkZUhvcml6b250YWxseSkge1xuICAgIGNvbnN0IHNlZ21lbnRXaWR0aCA9IE1hdGguZmxvb3Iod2lkdGggLyBzcGxpdENvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3Qgc3RhcnRYID0geDEgKyAoaSAqIHNlZ21lbnRXaWR0aCk7XG4gICAgICBjb25zdCBlbmRYID0gaSA9PT0gc3BsaXRDb3VudCAtIDEgPyB4MiA6IHN0YXJ0WCArIHNlZ21lbnRXaWR0aDtcbiAgICAgIGFyZWFzLnB1c2goe1xuICAgICAgICB4MTogc3RhcnRYLFxuICAgICAgICB5MTogeTEsXG4gICAgICAgIHgyOiBlbmRYLFxuICAgICAgICB5MjogeTJcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzZWdtZW50SGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgLyBzcGxpdENvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3Qgc3RhcnRZID0geTEgKyAoaSAqIHNlZ21lbnRIZWlnaHQpO1xuICAgICAgY29uc3QgZW5kWSA9IGkgPT09IHNwbGl0Q291bnQgLSAxID8geTIgOiBzdGFydFkgKyBzZWdtZW50SGVpZ2h0O1xuICAgICAgYXJlYXMucHVzaCh7XG4gICAgICAgIHgxOiB4MSxcbiAgICAgICAgeTE6IHN0YXJ0WSxcbiAgICAgICAgeDI6IHgyLFxuICAgICAgICB5MjogZW5kWVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gYXJlYXM7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIG9idGVuZXIgcFx1MDBFRHhlbGVzIGRlbnRybyBkZSB1biBcdTAwRTFyZWEgZXNwZWNcdTAwRURmaWNhXG5mdW5jdGlvbiBnZXRQaXhlbHNJbkFyZWEoYXJlYSwgcGl4ZWxzTWFwKSB7XG4gIGNvbnN0IHBpeGVscyA9IFtdO1xuICBjb25zdCB7IHgxLCB5MSwgeDIsIHkyIH0gPSBhcmVhO1xuICBcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgcGl4ZWxzTWFwLmVudHJpZXMoKSkge1xuICAgIGNvbnN0IFt4LCB5XSA9IGtleS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgIGlmICh4ID49IHgxICYmIHggPD0geDIgJiYgeSA+PSB5MSAmJiB5IDw9IHkyKSB7XG4gICAgICBwaXhlbHMucHVzaCh7IGtleSwgLi4udmFsdWUgfSk7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gcGl4ZWxzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVByb2dyZXNzKGZpbGVuYW1lID0gbnVsbCwgc3BsaXRDb3VudCA9IG51bGwpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIWd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEgfHwgIWd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBoYXkgcHJvZ3Jlc28gcGFyYSBndWFyZGFyJyk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGFyZWFzID0gc3BsaXRDb3VudCAmJiBzcGxpdENvdW50ID4gMSA/IFxuICAgICAgc3BsaXRQcm90ZWN0aW9uQXJlYShndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLCBzcGxpdENvdW50KSA6IFxuICAgICAgW2d1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWFdO1xuICAgIFxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZWFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhcmVhID0gYXJlYXNbaV07XG4gICAgICBjb25zdCBhcmVhUGl4ZWxzID0gZ2V0UGl4ZWxzSW5BcmVhKGFyZWEsIGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMpO1xuICAgICAgXG4gICAgICBjb25zdCBwcm9ncmVzc0RhdGEgPSB7XG4gICAgICAgIHZlcnNpb246IFwiMS4wXCIsXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgcHJvdGVjdGlvbkRhdGE6IHtcbiAgICAgICAgICBhcmVhOiB7IC4uLmFyZWEgfSxcbiAgICAgICAgICBwcm90ZWN0ZWRQaXhlbHM6IGFyZWFQaXhlbHMubGVuZ3RoLFxuICAgICAgICAgIHNwbGl0SW5mbzogc3BsaXRDb3VudCA+IDEgPyB7IFxuICAgICAgICAgICAgdG90YWw6IHNwbGl0Q291bnQsIFxuICAgICAgICAgICAgY3VycmVudDogaSArIDEsXG4gICAgICAgICAgICBvcmlnaW5hbEFyZWE6IHsgLi4uZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSB9XG4gICAgICAgICAgfSA6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvZ3Jlc3M6IHtcbiAgICAgICAgICB0b3RhbFJlcGFpcmVkOiBndWFyZFN0YXRlLnRvdGFsUmVwYWlyZWQsXG4gICAgICAgICAgbGFzdENoZWNrOiBndWFyZFN0YXRlLmxhc3RDaGVja1xuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICBtYXhQcm90ZWN0aW9uU2l6ZTogMTAwMDAwLFxuICAgICAgICAgIHBpeGVsc1BlckJhdGNoOiAxMCxcbiAgICAgICAgICBjaGVja0ludGVydmFsOiAxMDAwMFxuICAgICAgICB9LFxuICAgICAgICAvLyBGaWx0cmFyIHNvbG8gbG9zIGRhdG9zIHNlcmlhbGl6YWJsZXMgZGUgbG9zIGNvbG9yZXMgKHNpbiBlbGVtZW50b3MgRE9NKVxuICAgICAgICBjb2xvcnM6IGd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzLm1hcChjb2xvciA9PiAoe1xuICAgICAgICAgIGlkOiBjb2xvci5pZCxcbiAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICB9KSksXG4gICAgICAgIC8vIENvbnZlcnRpciBNYXAgYSBhcnJheSBwYXJhIHNlcmlhbGl6YWNpXHUwMEYzbiAtIHNvbG8gcFx1MDBFRHhlbGVzIGRlbCBcdTAwRTFyZWFcbiAgICAgICAgb3JpZ2luYWxQaXhlbHM6IGFyZWFQaXhlbHNcbiAgICAgIH07XG4gICAgICBcbiAgICAgIGNvbnN0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShwcm9ncmVzc0RhdGEsIG51bGwsIDIpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyB3aW5kb3cuQmxvYihbZGF0YVN0cl0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBzdWZmaXggPSBzcGxpdENvdW50ID4gMSA/IGBfcGFydGUke2kgKyAxfWRlJHtzcGxpdENvdW50fWAgOiAnJztcbiAgICAgIGNvbnN0IGZpbmFsRmlsZW5hbWUgPSBmaWxlbmFtZSB8fCBcbiAgICAgICAgYHdwbGFjZV9HVUFSRF8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxOSkucmVwbGFjZSgvOi9nLCAnLScpfSR7c3VmZml4fS5qc29uYDtcbiAgICAgIFxuICAgICAgLy8gQ3JlYXIgeSBkaXNwYXJhciBkZXNjYXJnYVxuICAgICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgbGluay5kb3dubG9hZCA9IGZpbmFsRmlsZW5hbWU7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgbGluay5jbGljaygpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICBcbiAgICAgIHJlc3VsdHMucHVzaCh7IHN1Y2Nlc3M6IHRydWUsIGZpbGVuYW1lOiBmaW5hbEZpbGVuYW1lIH0pO1xuICAgICAgbG9nKGBcdTI3MDUgUHJvZ3Jlc28gZ3VhcmRhZG86ICR7ZmluYWxGaWxlbmFtZX1gKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHsgXG4gICAgICBzdWNjZXNzOiB0cnVlLCBcbiAgICAgIGZpbGVuYW1lOiByZXN1bHRzLmxlbmd0aCA9PT0gMSA/IHJlc3VsdHNbMF0uZmlsZW5hbWUgOiBgJHtyZXN1bHRzLmxlbmd0aH0gYXJjaGl2b3NgLFxuICAgICAgZmlsZXM6IHJlc3VsdHNcbiAgICB9O1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNzRDIEVycm9yIGd1YXJkYW5kbyBwcm9ncmVzbzonLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRQcm9ncmVzcyhmaWxlKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IGZpbGUudGV4dCgpO1xuICAgIGNvbnN0IHByb2dyZXNzRGF0YSA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgXG4gICAgbG9nKCdcdUQ4M0RcdURDQzEgQXJjaGl2byBjYXJnYWRvIGNvcnJlY3RhbWVudGUnKTtcbiAgICBcbiAgICAvLyBWYWxpZGFyIGVzdHJ1Y3R1cmEgZGVsIGFyY2hpdm9cbiAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IFsncHJvdGVjdGlvbkRhdGEnLCAnb3JpZ2luYWxQaXhlbHMnLCAnY29sb3JzJ107XG4gICAgY29uc3QgbWlzc2luZ0ZpZWxkcyA9IHJlcXVpcmVkRmllbGRzLmZpbHRlcihmaWVsZCA9PiAhKGZpZWxkIGluIHByb2dyZXNzRGF0YSkpO1xuICAgIFxuICAgIGlmIChtaXNzaW5nRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FtcG9zIHJlcXVlcmlkb3MgZmFsdGFudGVzOiAke21pc3NpbmdGaWVsZHMuam9pbignLCAnKX1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gVmVyaWZpY2FyIGNvbXBhdGliaWxpZGFkIGRlIGNvbG9yZXNcbiAgICBpZiAoZ3VhcmRTdGF0ZS5hdmFpbGFibGVDb2xvcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgc2F2ZWRDb2xvcklkcyA9IHByb2dyZXNzRGF0YS5jb2xvcnMubWFwKGMgPT4gYy5pZCk7XG4gICAgICBjb25zdCBjdXJyZW50Q29sb3JJZHMgPSBndWFyZFN0YXRlLmF2YWlsYWJsZUNvbG9ycy5tYXAoYyA9PiBjLmlkKTtcbiAgICAgIGNvbnN0IGNvbW1vbkNvbG9ycyA9IHNhdmVkQ29sb3JJZHMuZmlsdGVyKGlkID0+IGN1cnJlbnRDb2xvcklkcy5pbmNsdWRlcyhpZCkpO1xuICAgICAgXG4gICAgICBpZiAoY29tbW9uQ29sb3JzLmxlbmd0aCA8IHNhdmVkQ29sb3JJZHMubGVuZ3RoICogMC44KSB7XG4gICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIExvcyBjb2xvcmVzIGd1YXJkYWRvcyBubyBjb2luY2lkZW4gY29tcGxldGFtZW50ZSBjb24gbG9zIGFjdHVhbGVzJyk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFNpIG5vIGhheSBjb2xvcmVzIGRldGVjdGFkb3MgYVx1MDBGQW4sIHBvYmxhcmxvcyBkZXNkZSBlbCBhcmNoaXZvXG4gICAgaWYgKCFndWFyZFN0YXRlLmF2YWlsYWJsZUNvbG9ycyB8fCBndWFyZFN0YXRlLmF2YWlsYWJsZUNvbG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzID0gQXJyYXkuaXNBcnJheShwcm9ncmVzc0RhdGEuY29sb3JzKVxuICAgICAgICA/IHByb2dyZXNzRGF0YS5jb2xvcnMubWFwKGMgPT4gKHsgaWQ6IGMuaWQsIHI6IGMuciwgZzogYy5nLCBiOiBjLmIgfSkpXG4gICAgICAgIDogW107XG4gICAgICBsb2coYFx1RDgzQ1x1REZBOCBDb2xvcmVzIGNhcmdhZG9zIGRlc2RlIGFyY2hpdm86ICR7Z3VhcmRTdGF0ZS5hdmFpbGFibGVDb2xvcnMubGVuZ3RofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZXN0YXVyYXIgZXN0YWRvXG4gICAgaWYgKHByb2dyZXNzRGF0YS5wcm90ZWN0aW9uRGF0YSkge1xuICAgICAgZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSA9IHByb2dyZXNzRGF0YS5wcm90ZWN0aW9uRGF0YS5hcmVhO1xuICAgICAgLy8gRXN0YWJsZWNlciBzaSBlcyBcdTAwRTFyZWEgdmlydHVhbCBiYXNcdTAwRTFuZG9zZSBlbiBsb3MgbWV0YWRhdG9zXG4gICAgICBndWFyZFN0YXRlLmlzVmlydHVhbEFyZWEgPSBwcm9ncmVzc0RhdGEucHJvdGVjdGlvbkRhdGEudmlydHVhbEFyZWEgfHwgZmFsc2U7XG4gICAgfSBlbHNlIGlmIChwcm9ncmVzc0RhdGEucHJvdGVjdGlvbkFyZWEpIHtcbiAgICAgIC8vIENvbXBhdGliaWxpZGFkIGNvbiBmb3JtYXRvIGFudGVyaW9yXG4gICAgICBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhID0gcHJvZ3Jlc3NEYXRhLnByb3RlY3Rpb25BcmVhO1xuICAgICAgZ3VhcmRTdGF0ZS5pc1ZpcnR1YWxBcmVhID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIC8vIENvbnZlcnRpciBhcnJheSBkZSBwXHUwMEVEeGVsZXMgZGUgdnVlbHRhIGEgTWFwXG4gICAgZ3VhcmRTdGF0ZS5vcmlnaW5hbFBpeGVscyA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IHBpeGVsRGF0YSBvZiBwcm9ncmVzc0RhdGEub3JpZ2luYWxQaXhlbHMpIHtcbiAgICAgIGNvbnN0IHsga2V5LCAuLi5waXhlbEluZm8gfSA9IHBpeGVsRGF0YTtcbiAgICAgIGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2V0KGtleSwgcGl4ZWxJbmZvKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVzdGF1cmFyIGVzdGFkXHUwMEVEc3RpY2FzIHNpIGVzdFx1MDBFMW4gZGlzcG9uaWJsZXNcbiAgICBpZiAocHJvZ3Jlc3NEYXRhLnByb2dyZXNzKSB7XG4gICAgICBndWFyZFN0YXRlLnRvdGFsUmVwYWlyZWQgPSBwcm9ncmVzc0RhdGEucHJvZ3Jlc3MudG90YWxSZXBhaXJlZCB8fCAwO1xuICAgICAgZ3VhcmRTdGF0ZS5sYXN0Q2hlY2sgPSBwcm9ncmVzc0RhdGEucHJvZ3Jlc3MubGFzdENoZWNrIHx8IDA7XG4gICAgfSBlbHNlIGlmIChwcm9ncmVzc0RhdGEuc3RhdGlzdGljcykge1xuICAgICAgLy8gQ29tcGF0aWJpbGlkYWQgY29uIGZvcm1hdG8gYW50ZXJpb3JcbiAgICAgIGd1YXJkU3RhdGUudG90YWxSZXBhaXJlZCA9IHByb2dyZXNzRGF0YS5zdGF0aXN0aWNzLnRvdGFsUmVwYWlyZWQgfHwgMDtcbiAgICAgIGd1YXJkU3RhdGUubGFzdENoZWNrID0gcHJvZ3Jlc3NEYXRhLnN0YXRpc3RpY3MubGFzdENoZWNrIHx8IDA7XG4gICAgfVxuICAgIFxuICAgIC8vIExpbXBpYXIgY2FtYmlvcyBwcmV2aW9zXG4gICAgZ3VhcmRTdGF0ZS5jaGFuZ2VzLmNsZWFyKCk7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBVSSBjb24gbG9zIGRhdG9zIGNhcmdhZG9zXG4gICAgaWYgKGd1YXJkU3RhdGUudWkpIHtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlQ29vcmRpbmF0ZXMoe1xuICAgICAgICB4MTogZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYS54MSxcbiAgICAgICAgeTE6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueTEsXG4gICAgICAgIHgyOiBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLngyLFxuICAgICAgICB5MjogZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYS55MlxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlUHJvZ3Jlc3MoZ3VhcmRTdGF0ZS5vcmlnaW5hbFBpeGVscy5zaXplLCAwKTtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHMoe1xuICAgICAgICByZXBhaXJlZDogZ3VhcmRTdGF0ZS50b3RhbFJlcGFpcmVkXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgZ3VhcmRTdGF0ZS51aS5lbmFibGVTdGFydEJ0bigpO1xuICAgIH1cbiAgICBcbiAgICBsb2coYFx1MjcwNSBQcm9ncmVzbyBjYXJnYWRvOiAke2d1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZX0gcFx1MDBFRHhlbGVzIHByb3RlZ2lkb3NgKTtcbiAgICBcbiAgICByZXR1cm4geyBcbiAgICAgIHN1Y2Nlc3M6IHRydWUsIFxuICAgICAgZGF0YTogcHJvZ3Jlc3NEYXRhLFxuICAgICAgcHJvdGVjdGVkUGl4ZWxzOiBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLnNpemUsXG4gICAgICBhcmVhOiBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhXG4gICAgfTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBjYXJnYW5kbyBwcm9ncmVzbzonLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyUHJvZ3Jlc3MoKSB7XG4gIGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEgPSBudWxsO1xuICBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLmNsZWFyKCk7XG4gIGd1YXJkU3RhdGUuY2hhbmdlcy5jbGVhcigpO1xuICBndWFyZFN0YXRlLnRvdGFsUmVwYWlyZWQgPSAwO1xuICBndWFyZFN0YXRlLmxhc3RDaGVjayA9IDA7XG4gIFxuICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlQ29vcmRpbmF0ZXMoeyB4MTogJycsIHkxOiAnJywgeDI6ICcnLCB5MjogJycgfSk7XG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVQcm9ncmVzcygwLCAwKTtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXRzKHsgcmVwYWlyZWQ6IDAgfSk7XG4gIH1cbiAgXG4gIGxvZygnXHVEODNFXHVEREY5IFByb2dyZXNvIGxpbXBpYWRvJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNQcm9ncmVzcygpIHtcbiAgcmV0dXJuIGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEgJiYgXG4gICAgICAgICBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLnNpemUgPiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvZ3Jlc3NJbmZvKCkge1xuICByZXR1cm4ge1xuICAgIGhhc1Byb2dyZXNzOiBoYXNQcm9ncmVzcygpLFxuICAgIHByb3RlY3RlZFBpeGVsczogZ3VhcmRTdGF0ZS5vcmlnaW5hbFBpeGVscy5zaXplLFxuICAgIHRvdGFsUmVwYWlyZWQ6IGd1YXJkU3RhdGUudG90YWxSZXBhaXJlZCxcbiAgICBhcmVhOiBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhID8ge1xuICAgICAgd2lkdGg6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueDIgLSBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLngxLFxuICAgICAgaGVpZ2h0OiBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLnkyIC0gZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYS55MSxcbiAgICAgIHgxOiBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLngxLFxuICAgICAgeTE6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueTEsXG4gICAgICB4MjogZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYS54MixcbiAgICAgIHkyOiBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLnkyXG4gICAgfSA6IG51bGxcbiAgfTtcbn1cblxuLy8gQWxpYXMgcGFyYSBjb21wYXRpYmlsaWRhZFxuZXhwb3J0IGNvbnN0IHNhdmVHdWFyZERhdGEgPSBzYXZlUHJvZ3Jlc3M7XG5leHBvcnQgY29uc3QgbG9hZEd1YXJkRGF0YSA9IGxvYWRQcm9ncmVzcztcbmV4cG9ydCBjb25zdCBjbGVhckd1YXJkRGF0YSA9IGNsZWFyUHJvZ3Jlc3M7XG5leHBvcnQgY29uc3QgaGFzR3VhcmREYXRhID0gaGFzUHJvZ3Jlc3M7XG5leHBvcnQgY29uc3QgZ2V0R3VhcmREYXRhSW5mbyA9IGdldFByb2dyZXNzSW5mbztcbiIsICJpbXBvcnQgeyBoYXNQcm9ncmVzcyB9IGZyb20gJy4vc2F2ZS1sb2FkLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUd1YXJkVUkodGV4dHMpIHtcbiAgLy8gQ3JlYXIgY29udGVuZWRvciBwcmluY2lwYWxcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDIwcHg7XG4gICAgcmlnaHQ6IDIwcHg7XG4gICAgd2lkdGg6IDM1MHB4O1xuICAgIGJhY2tncm91bmQ6ICMxYTFhMWE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgY29sb3I6ICNlZWU7XG4gICAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZjtcbiAgICB6LWluZGV4OiA5OTk5O1xuICAgIGJveC1zaGFkb3c6IDAgNXB4IDE1cHggcmdiYSgwLDAsMCwwLjUpO1xuICBgO1xuXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDEycHggMTVweDsgYmFja2dyb3VuZDogIzJkMzc0ODsgY29sb3I6ICM2MGE1ZmE7IGZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDYwMDsgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBhbGlnbi1pdGVtczogY2VudGVyOyBjdXJzb3I6IG1vdmU7XCIgY2xhc3M9XCJndWFyZC1oZWFkZXJcIj5cbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDhweDtcIj5cbiAgICAgICAgXHVEODNEXHVERUUxXHVGRTBGIDxzcGFuPiR7dGV4dHMudGl0bGV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGlkPVwiY2xvc2VCdG5cIiBzdHlsZT1cImJhY2tncm91bmQ6IG5vbmU7IGJvcmRlcjogbm9uZTsgY29sb3I6ICNlZWU7IGN1cnNvcjogcG9pbnRlcjsgb3BhY2l0eTogMC43OyBwYWRkaW5nOiA1cHg7XCI+XHUyNzRDPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDE1cHg7XCI+XG4gICAgICA8IS0tIEVzdGFkbyBkZSBpbmljaWFsaXphY2lcdTAwRjNuIC0tPlxuICAgICAgPGRpdiBpZD1cImluaXRTZWN0aW9uXCI+XG4gICAgICAgIDxidXR0b24gaWQ9XCJpbml0QnRuXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgcGFkZGluZzogMTBweDsgYmFja2dyb3VuZDogIzYwYTVmYTsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC13ZWlnaHQ6IDYwMDsgY3Vyc29yOiBwb2ludGVyOyBtYXJnaW4tYm90dG9tOiAxMHB4O1wiPlxuICAgICAgICAgIFx1RDgzRVx1REQxNiAke3RleHRzLmluaXRCb3R9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDwhLS0gU2VsZWNjaVx1MDBGM24gZGUgXHUwMEUxcmVhIC0tPlxuICAgICAgPGRpdiBpZD1cImFyZWFTZWN0aW9uXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPlxuICAgICAgICA8IS0tIEJvdG9uZXMgZGUgXHUwMEUxcmVhIC0gZW4gZG9zIGNvbHVtbmFzIC0tPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxuICAgICAgICAgIDxidXR0b24gaWQ9XCJzZWxlY3RBcmVhQnRuXCIgc3R5bGU9XCJmbGV4OiAxOyBwYWRkaW5nOiAxMHB4OyBiYWNrZ3JvdW5kOiAjOGI1Y2Y2OyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogNnB4OyBmb250LXdlaWdodDogNjAwOyBjdXJzb3I6IHBvaW50ZXI7XCI+XG4gICAgICAgICAgICBcdUQ4M0NcdURGQUYgJHt0ZXh0cy5zZWxlY3RBcmVhfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gaWQ9XCJsb2FkQXJlYUJ0blwiIHN0eWxlPVwiZmxleDogMTsgcGFkZGluZzogMTBweDsgYmFja2dyb3VuZDogI2Y1OWUwYjsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC13ZWlnaHQ6IDYwMDsgY3Vyc29yOiBwb2ludGVyO1wiPlxuICAgICAgICAgICAgXHVEODNEXHVEQ0MxIENhcmdhciBBcmNoaXZvXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPCEtLSBDb29yZGVuYWRhcyBjYXB0dXJhZGFzIChzb2xvIGxlY3R1cmEpIC0tPlxuICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTVweDtcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiA4cHg7XCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleDogMTtcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDVweDsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogI2NiZDVlMDtcIj4ke3RleHRzLnVwcGVyTGVmdH06PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogNXB4O1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIngxSW5wdXRcIiB0eXBlPVwibnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJYMVwiIHJlYWRvbmx5IHN0eWxlPVwiZmxleDogMTsgcGFkZGluZzogNXB4OyBiYWNrZ3JvdW5kOiAjMzc0MTUxOyBib3JkZXI6IDFweCBzb2xpZCAjNGI1NTYzOyBib3JkZXItcmFkaXVzOiA0cHg7IGNvbG9yOiAjZDFkNWRiOyBmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwieTFJbnB1dFwiIHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIlkxXCIgcmVhZG9ubHkgc3R5bGU9XCJmbGV4OiAxOyBwYWRkaW5nOiA1cHg7IGJhY2tncm91bmQ6ICMzNzQxNTE7IGJvcmRlcjogMXB4IHNvbGlkICM0YjU1NjM7IGJvcmRlci1yYWRpdXM6IDRweDsgY29sb3I6ICNkMWQ1ZGI7IGZvbnQtc2l6ZTogMTNweDtcIj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDE7XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tYm90dG9tOiA1cHg7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICNjYmQ1ZTA7XCI+JHt0ZXh0cy5sb3dlclJpZ2h0fTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiA1cHg7XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwieDJJbnB1dFwiIHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIlgyXCIgcmVhZG9ubHkgc3R5bGU9XCJmbGV4OiAxOyBwYWRkaW5nOiA1cHg7IGJhY2tncm91bmQ6ICMzNzQxNTE7IGJvcmRlcjogMXB4IHNvbGlkICM0YjU1NjM7IGJvcmRlci1yYWRpdXM6IDRweDsgY29sb3I6ICNkMWQ1ZGI7IGZvbnQtc2l6ZTogMTNweDtcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ5MklucHV0XCIgdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiWTJcIiByZWFkb25seSBzdHlsZT1cImZsZXg6IDE7IHBhZGRpbmc6IDVweDsgYmFja2dyb3VuZDogIzM3NDE1MTsgYm9yZGVyOiAxcHggc29saWQgIzRiNTU2MzsgYm9yZGVyLXJhZGl1czogNHB4OyBjb2xvcjogI2QxZDVkYjsgZm9udC1zaXplOiAxM3B4O1wiPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxidXR0b24gaWQ9XCJzdGFydEJ0blwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IHBhZGRpbmc6IDEwcHg7IGJhY2tncm91bmQ6ICMxMGI5ODE7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA2cHg7IGZvbnQtd2VpZ2h0OiA2MDA7IGN1cnNvcjogcG9pbnRlcjsgbWFyZ2luLWJvdHRvbTogMTBweDtcIiBkaXNhYmxlZD5cbiAgICAgICAgICBcdTI1QjZcdUZFMEYgJHt0ZXh0cy5zdGFydFByb3RlY3Rpb259XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPGJ1dHRvbiBpZD1cInN0b3BCdG5cIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBwYWRkaW5nOiAxMHB4OyBiYWNrZ3JvdW5kOiAjZWY0NDQ0OyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogNnB4OyBmb250LXdlaWdodDogNjAwOyBjdXJzb3I6IHBvaW50ZXI7IG1hcmdpbi1ib3R0b206IDEwcHg7XCIgZGlzYWJsZWQ+XG4gICAgICAgICAgXHUyM0Y5XHVGRTBGICR7dGV4dHMuc3RvcFByb3RlY3Rpb259XG4gICAgICAgIDwvYnV0dG9uPlxuXG5cbiAgICAgICAgXG4gICAgICAgIDxidXR0b24gaWQ9XCJsb2dXaW5kb3dCdG5cIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBwYWRkaW5nOiA4cHg7IGJhY2tncm91bmQ6ICM2YjcyODA7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA2cHg7IGZvbnQtd2VpZ2h0OiA2MDA7IGN1cnNvcjogcG9pbnRlcjsgbWFyZ2luLXRvcDogMDsgZm9udC1zaXplOiAxM3B4O1wiPlxuICAgICAgICAgIFx1RDgzRFx1RENDQiAke3RleHRzLmxvZ1dpbmRvdyB8fCAnTG9ncyd9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPGJ1dHRvbiBpZD1cInJlcG9zaXRpb25CdG5cIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBwYWRkaW5nOiA4cHg7IGJhY2tncm91bmQ6ICM4YjVjZjY7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA2cHg7IGZvbnQtd2VpZ2h0OiA2MDA7IGN1cnNvcjogcG9pbnRlcjsgbWFyZ2luLXRvcDogNXB4OyBmb250LXNpemU6IDEzcHg7XCIgZGlzYWJsZWQ+XG4gICAgICAgICAgXHVEODNEXHVEQ0NEIFJlcG9zaWNpb25hclxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8IS0tIEVzdGFkXHUwMEVEc3RpY2FzIC0tPlxuICAgICAgPGRpdiBpZD1cInN0YXRzU2VjdGlvblwiIHN0eWxlPVwiYmFja2dyb3VuZDogIzJkMzc0ODsgcGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogNnB4OyBtYXJnaW4tdG9wOiAxMHB4O1wiPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxM3B4OyBtYXJnaW4tYm90dG9tOiA1cHg7XCI+XG4gICAgICAgICAgPHNwYW4+XHVEODNEXHVEQ0NBICR7dGV4dHMucHJvdGVjdGVkUGl4ZWxzfTogPC9zcGFuPjxzcGFuIGlkPVwicHJvdGVjdGVkQ291bnRcIj4wPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTNweDsgbWFyZ2luLWJvdHRvbTogNXB4O1wiPlxuICAgICAgICAgIDxzcGFuPlx1RDgzRFx1REVBOCAke3RleHRzLmRldGVjdGVkQ2hhbmdlc306IDwvc3Bhbj48c3BhbiBpZD1cImNoYW5nZXNDb3VudFwiPjA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxM3B4OyBtYXJnaW4tYm90dG9tOiA1cHg7XCI+XG4gICAgICAgICAgPHNwYW4+XHUyNkExICR7dGV4dHMuY2hhcmdlc306IDwvc3Bhbj48c3BhbiBpZD1cImNoYXJnZXNDb3VudFwiPjA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxM3B4OyBtYXJnaW4tYm90dG9tOiA1cHg7XCI+XG4gICAgICAgICAgPHNwYW4+XHVEODNEXHVERUUwXHVGRTBGICR7dGV4dHMucmVwYWlyZWRQaXhlbHN9OiA8L3NwYW4+PHNwYW4gaWQ9XCJyZXBhaXJlZENvdW50XCI+MDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJjb3VudGRvd25TZWN0aW9uXCIgc3R5bGU9XCJmb250LXNpemU6IDEzcHg7IG1hcmdpbi1ib3R0b206IDVweDsgZGlzcGxheTogbm9uZTtcIj5cbiAgICAgICAgICA8c3Bhbj5cdTIzRjAgUHJcdTAwRjN4aW1vIGxvdGUgZW46IDwvc3Bhbj48c3BhbiBpZD1cImNvdW50ZG93blRpbWVyXCI+LS08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPCEtLSBFc3RhZFx1MDBFRHN0aWNhcyBkZSBBblx1MDBFMWxpc2lzIC0tPlxuICAgICAgICA8aHIgc3R5bGU9XCJib3JkZXI6IG5vbmU7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGE1NTY4OyBtYXJnaW46IDEwcHggMDtcIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMTNweDsgbWFyZ2luLWJvdHRvbTogNXB4O1wiPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMxMGI5ODE7XCI+XHUyNzA1IFBcdTAwRUR4ZWxlcyBDb3JyZWN0b3M6IDwvc3Bhbj48c3BhbiBpZD1cImNvcnJlY3RQaXhlbHNDb3VudFwiPi08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxM3B4OyBtYXJnaW4tYm90dG9tOiA1cHg7XCI+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogI2VmNDQ0NDtcIj5cdTI3NEMgUFx1MDBFRHhlbGVzIEluY29ycmVjdG9zOiA8L3NwYW4+PHNwYW4gaWQ9XCJpbmNvcnJlY3RQaXhlbHNDb3VudFwiPi08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxM3B4OyBtYXJnaW4tYm90dG9tOiA1cHg7XCI+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogI2Y1OWUwYjtcIj5cdTI2QUEgUFx1MDBFRHhlbGVzIEZhbHRhbnRlczogPC9zcGFuPjxzcGFuIGlkPVwibWlzc2luZ1BpeGVsc0NvdW50XCI+LTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogIzhiNWNmNjtcIj5cdUQ4M0NcdURGQUYgUHJlY2lzaVx1MDBGM246IDwvc3Bhbj48c3BhbiBpZD1cImFjY3VyYWN5Q291bnRcIj4tPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8IS0tIENvbnRyb2xlcyBkZSBjb25maWd1cmFjaVx1MDBGM24gLS0+XG4gICAgICA8ZGl2IGlkPVwiY29uZmlnU2VjdGlvblwiIHN0eWxlPVwiYmFja2dyb3VuZDogIzJkMzc0ODsgcGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogNnB4OyBtYXJnaW4tdG9wOiAxMHB4O1wiPlxuICAgICAgICA8aDQgc3R5bGU9XCJtYXJnaW46IDAgMCAxMHB4IDA7IGZvbnQtc2l6ZTogMTRweDsgY29sb3I6ICNjYmQ1ZTA7XCI+XHUyNjk5XHVGRTBGIENvbmZpZ3VyYWNpXHUwMEYzbjwvaDQ+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiAxMHB4O1wiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJmbGV4OiAxO1wiPlxuICAgICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDVweDsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogI2NiZDVlMDtcIj5QXHUwMEVEeGVsZXMgcG9yIGxvdGU6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInBpeGVsc1BlckJhdGNoSW5wdXRcIiB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIjUwXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgcGFkZGluZzogNXB4OyBiYWNrZ3JvdW5kOiAjMzc0MTUxOyBib3JkZXI6IDFweCBzb2xpZCAjNGI1NTYzOyBib3JkZXItcmFkaXVzOiA0cHg7IGNvbG9yOiAjZDFkNWRiOyBmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDE7XCI+XG4gICAgICAgICAgICA8bGFiZWwgc3R5bGU9XCJkaXNwbGF5OiBibG9jazsgbWFyZ2luLWJvdHRvbTogNXB4OyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjY2JkNWUwO1wiPkNhcmdhcyBtXHUwMEVEbmltYXM6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cIm1pbkNoYXJnZXNJbnB1dFwiIHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgcGFkZGluZzogNXB4OyBiYWNrZ3JvdW5kOiAjMzc0MTUxOyBib3JkZXI6IDFweCBzb2xpZCAjNGI1NTYzOyBib3JkZXItcmFkaXVzOiA0cHg7IGNvbG9yOiAjZDFkNWRiOyBmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDEwcHg7XCI+XG4gICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDVweDsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogI2NiZDVlMDtcIj5cdUQ4M0NcdURGQUYgUGF0clx1MDBGM24gZGUgUHJvdGVjY2lcdTAwRjNuOjwvbGFiZWw+XG4gICAgICAgICAgPHNlbGVjdCBpZD1cInByb3RlY3Rpb25QYXR0ZXJuU2VsZWN0XCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgcGFkZGluZzogNXB4OyBiYWNrZ3JvdW5kOiAjMzc0MTUxOyBib3JkZXI6IDFweCBzb2xpZCAjNGI1NTYzOyBib3JkZXItcmFkaXVzOiA0cHg7IGNvbG9yOiAjZDFkNWRiOyBmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmFuZG9tXCI+XHVEODNDXHVERkIyIEFsZWF0b3Jpbzwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxpbmVcIj5cdUQ4M0RcdURDQ0YgTFx1MDBFRG5lYTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNlbnRlclwiPlx1RDgzQ1x1REZBRiBDZW50cm88L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzcGlyYWxcIj5cdUQ4M0NcdURGMDAgRXNwaXJhbDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImh1bWFuXCI+XHVEODNEXHVEQzY0IEh1bWFubzwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBnYXA6IDEwcHg7IG1hcmdpbi1ib3R0b206IDEwcHg7XCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDE7XCI+XG4gICAgICAgICAgICA8bGFiZWwgc3R5bGU9XCJkaXNwbGF5OiBibG9jazsgbWFyZ2luLWJvdHRvbTogNXB4OyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjY2JkNWUwO1wiPlx1RDgzQ1x1REZBOCBDb21wYXJhY2lcdTAwRjNuIGRlIENvbG9yOjwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IGlkPVwiY29sb3JDb21wYXJpc29uU2VsZWN0XCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgcGFkZGluZzogNXB4OyBiYWNrZ3JvdW5kOiAjMzc0MTUxOyBib3JkZXI6IDFweCBzb2xpZCAjNGI1NTYzOyBib3JkZXItcmFkaXVzOiA0cHg7IGNvbG9yOiAjZDFkNWRiOyBmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2JcIj5SR0IgKFJcdTAwRTFwaWRvKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibGFiXCI+TEFCIChQcmVjaXNvKTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDE7XCI+XG4gICAgICAgICAgICA8bGFiZWwgc3R5bGU9XCJkaXNwbGF5OiBibG9jazsgbWFyZ2luLWJvdHRvbTogNXB4OyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjY2JkNWUwO1wiPlx1RDgzQ1x1REY5QVx1RkUwRiBVbWJyYWw6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNvbG9yVGhyZXNob2xkSW5wdXRcIiB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIjUwXCIgdmFsdWU9XCIxMFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IHBhZGRpbmc6IDVweDsgYmFja2dyb3VuZDogIzM3NDE1MTsgYm9yZGVyOiAxcHggc29saWQgIzRiNTU2MzsgYm9yZGVyLXJhZGl1czogNHB4OyBjb2xvcjogI2QxZDVkYjsgZm9udC1zaXplOiAxM3B4O1wiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDwhLS0gQ29udHJvbGVzIGRlIHNhdmUvbG9hZCAtLT5cbiAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMTBweDsgbWFyZ2luLWJvdHRvbTogMTBweDtcIj5cbiAgICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZUJ0blwiIHN0eWxlPVwiZmxleDogMTsgcGFkZGluZzogOHB4OyBiYWNrZ3JvdW5kOiAjMTBiOTgxOyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogNnB4OyBmb250LXdlaWdodDogNjAwOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTNweDtcIj5cbiAgICAgICAgICAgIFx1RDgzRFx1RENCRSBHdWFyZGFyXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBpZD1cImFuYWx5emVCdG5cIiBzdHlsZT1cImZsZXg6IDE7IHBhZGRpbmc6IDhweDsgYmFja2dyb3VuZDogIzhiNWNmNjsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC13ZWlnaHQ6IDYwMDsgY3Vyc29yOiBwb2ludGVyOyBmb250LXNpemU6IDEzcHg7XCIgZGlzYWJsZWQ+XG4gICAgICAgICAgICBcdUQ4M0RcdUREMEQgQW5hbGl6YXJcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPCEtLSBFc3RhZG8gLS0+XG4gICAgICA8ZGl2IGlkPVwic3RhdHVzQmFyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjMmQzNzQ4OyBwYWRkaW5nOiA4cHg7IGJvcmRlci1yYWRpdXM6IDRweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDEzcHg7IG1hcmdpbi10b3A6IDEwcHg7XCI+XG4gICAgICAgIFx1MjNGMyAke3RleHRzLndhaXRpbmdJbml0fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gIC8vIElucHV0IG9jdWx0byBwYXJhIGFyY2hpdm9zIGRlIFx1MDBFMXJlYVxuICBjb25zdCBhcmVhRmlsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgYXJlYUZpbGVJbnB1dC50eXBlID0gJ2ZpbGUnO1xuICBhcmVhRmlsZUlucHV0LmFjY2VwdCA9ICcuanNvbic7XG4gIGFyZWFGaWxlSW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcmVhRmlsZUlucHV0KTtcblxuICAvLyBIYWNlciBhcnJhc3RyYWJsZVxuICBtYWtlRHJhZ2dhYmxlKGNvbnRhaW5lcik7XG5cbiAgLy8gRWxlbWVudG9zXG4gIGNvbnN0IGVsZW1lbnRzID0ge1xuICAgIGluaXRCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjaW5pdEJ0bicpLFxuICAgIHNlbGVjdEFyZWFCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0QXJlYUJ0bicpLFxuICAgIGxvYWRBcmVhQnRuOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2xvYWRBcmVhQnRuJyksXG4gICAgeDFJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyN4MUlucHV0JyksXG4gICAgeTFJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyN5MUlucHV0JyksXG4gICAgeDJJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyN4MklucHV0JyksXG4gICAgeTJJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyN5MklucHV0JyksXG4gICAgc3RhcnRCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjc3RhcnRCdG4nKSxcbiAgICBzdG9wQnRuOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI3N0b3BCdG4nKSxcblxuICAgIGxvZ1dpbmRvd0J0bjogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNsb2dXaW5kb3dCdG4nKSxcbiAgICByZXBvc2l0aW9uQnRuOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI3JlcG9zaXRpb25CdG4nKSxcbiAgICBjbG9zZUJ0bjogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZUJ0bicpLFxuICAgIGluaXRTZWN0aW9uOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2luaXRTZWN0aW9uJyksXG4gICAgYXJlYVNlY3Rpb246IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjYXJlYVNlY3Rpb24nKSxcbiAgICBwcm90ZWN0ZWRDb3VudDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNwcm90ZWN0ZWRDb3VudCcpLFxuICAgIGNoYW5nZXNDb3VudDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2VzQ291bnQnKSxcbiAgICBjaGFyZ2VzQ291bnQ6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjY2hhcmdlc0NvdW50JyksXG4gICAgcmVwYWlyZWRDb3VudDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNyZXBhaXJlZENvdW50JyksXG4gICAgY291bnRkb3duU2VjdGlvbjogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNjb3VudGRvd25TZWN0aW9uJyksXG4gICAgY291bnRkb3duVGltZXI6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjY291bnRkb3duVGltZXInKSxcbiAgICBjb3JyZWN0UGl4ZWxzQ291bnQ6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjY29ycmVjdFBpeGVsc0NvdW50JyksXG4gICAgaW5jb3JyZWN0UGl4ZWxzQ291bnQ6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjaW5jb3JyZWN0UGl4ZWxzQ291bnQnKSxcbiAgICBtaXNzaW5nUGl4ZWxzQ291bnQ6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjbWlzc2luZ1BpeGVsc0NvdW50JyksXG4gICAgYWNjdXJhY3lDb3VudDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNhY2N1cmFjeUNvdW50JyksXG4gICAgc3RhdHVzQmFyOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI3N0YXR1c0JhcicpLFxuICAgIGFyZWFGaWxlSW5wdXQ6IGFyZWFGaWxlSW5wdXQsXG4gICAgcGl4ZWxzUGVyQmF0Y2hJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNwaXhlbHNQZXJCYXRjaElucHV0JyksXG4gICAgbWluQ2hhcmdlc0lucHV0OiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI21pbkNoYXJnZXNJbnB1dCcpLFxuICAgIHByb3RlY3Rpb25QYXR0ZXJuU2VsZWN0OiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI3Byb3RlY3Rpb25QYXR0ZXJuU2VsZWN0JyksXG4gICAgY29sb3JDb21wYXJpc29uU2VsZWN0OiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2NvbG9yQ29tcGFyaXNvblNlbGVjdCcpLFxuICAgIGNvbG9yVGhyZXNob2xkSW5wdXQ6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjY29sb3JUaHJlc2hvbGRJbnB1dCcpLFxuICAgIHNhdmVCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjc2F2ZUJ0bicpLFxuICAgIGFuYWx5emVCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjYW5hbHl6ZUJ0bicpXG4gIH07XG5cbiAgLy8gQVBJIGRlIGxhIFVJXG4gIGNvbnN0IHVpID0ge1xuICAgIGVsZW1lbnRzLFxuICAgIFxuICAgIHVwZGF0ZVN0YXR1czogKG1lc3NhZ2UsIHR5cGUgPSAnaW5mbycpID0+IHtcbiAgICAgIGVsZW1lbnRzLnN0YXR1c0Jhci50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICBjb25zdCBjb2xvcnMgPSB7XG4gICAgICAgIGluZm86ICcjNjBhNWZhJyxcbiAgICAgICAgc3VjY2VzczogJyMxMGI5ODEnLFxuICAgICAgICB3YXJuaW5nOiAnI2Y1OWUwYicsXG4gICAgICAgIGVycm9yOiAnI2VmNDQ0NCdcbiAgICAgIH07XG4gICAgICBlbGVtZW50cy5zdGF0dXNCYXIuc3R5bGUuY29sb3IgPSBjb2xvcnNbdHlwZV0gfHwgY29sb3JzLmluZm87XG4gICAgfSxcblxuICAgIHVwZGF0ZVByb2dyZXNzOiAoY3VycmVudCwgdG90YWwsIGlzVmlydHVhbCA9IGZhbHNlKSA9PiB7XG4gICAgICBlbGVtZW50cy5jaGFuZ2VzQ291bnQudGV4dENvbnRlbnQgPSBjdXJyZW50O1xuICAgICAgaWYgKGlzVmlydHVhbCAmJiB0b3RhbCA+IDApIHtcbiAgICAgICAgZWxlbWVudHMucHJvdGVjdGVkQ291bnQudGV4dENvbnRlbnQgPSBgJHt0b3RhbH0gKFx1MDBFMXJlYSB2YWNcdTAwRURhKWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50cy5wcm90ZWN0ZWRDb3VudC50ZXh0Q29udGVudCA9IHRvdGFsO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVTdGF0czogKHN0YXRzKSA9PiB7XG4gICAgICBpZiAoc3RhdHMuY2hhcmdlcyAhPT0gdW5kZWZpbmVkKSBlbGVtZW50cy5jaGFyZ2VzQ291bnQudGV4dENvbnRlbnQgPSBzdGF0cy5jaGFyZ2VzO1xuICAgICAgaWYgKHN0YXRzLnJlcGFpcmVkICE9PSB1bmRlZmluZWQpIGVsZW1lbnRzLnJlcGFpcmVkQ291bnQudGV4dENvbnRlbnQgPSBzdGF0cy5yZXBhaXJlZDtcbiAgICAgIGlmIChzdGF0cy5wZW5kaW5nICE9PSB1bmRlZmluZWQpIGVsZW1lbnRzLmNoYW5nZXNDb3VudC50ZXh0Q29udGVudCA9IHN0YXRzLnBlbmRpbmc7XG4gICAgfSxcblxuICAgIHNob3dDb3VudGRvd246IChzaG93ID0gdHJ1ZSkgPT4ge1xuICAgICAgZWxlbWVudHMuY291bnRkb3duU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gc2hvdyA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgfSxcblxuICAgIHVwZGF0ZUNvdW50ZG93bjogKHNlY29uZHMpID0+IHtcbiAgICAgIGlmIChzZWNvbmRzIDw9IDApIHtcbiAgICAgICAgZWxlbWVudHMuY291bnRkb3duVGltZXIudGV4dENvbnRlbnQgPSAnLS0nO1xuICAgICAgICB1aS5zaG93Q291bnRkb3duKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgY29uc3QgcmVtYWluaW5nU2Vjb25kcyA9IHNlY29uZHMgJSA2MDtcbiAgICAgIGNvbnN0IHRpbWVTdHIgPSBtaW51dGVzID4gMCBcbiAgICAgICAgPyBgJHttaW51dGVzfW0gJHtyZW1haW5pbmdTZWNvbmRzfXNgXG4gICAgICAgIDogYCR7cmVtYWluaW5nU2Vjb25kc31zYDtcbiAgICAgIFxuICAgICAgZWxlbWVudHMuY291bnRkb3duVGltZXIudGV4dENvbnRlbnQgPSB0aW1lU3RyO1xuICAgICAgdWkuc2hvd0NvdW50ZG93bih0cnVlKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlQW5hbHlzaXNTdGF0czogKGFuYWx5c2lzU3RhdHMpID0+IHtcbiAgICAgIGlmIChhbmFseXNpc1N0YXRzLmNvcnJlY3QgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMuY29ycmVjdFBpeGVsc0NvdW50LnRleHRDb250ZW50ID0gYW5hbHlzaXNTdGF0cy5jb3JyZWN0O1xuICAgICAgaWYgKGFuYWx5c2lzU3RhdHMuaW5jb3JyZWN0ICE9PSB1bmRlZmluZWQpIGVsZW1lbnRzLmluY29ycmVjdFBpeGVsc0NvdW50LnRleHRDb250ZW50ID0gYW5hbHlzaXNTdGF0cy5pbmNvcnJlY3Q7XG4gICAgICBpZiAoYW5hbHlzaXNTdGF0cy5taXNzaW5nICE9PSB1bmRlZmluZWQpIGVsZW1lbnRzLm1pc3NpbmdQaXhlbHNDb3VudC50ZXh0Q29udGVudCA9IGFuYWx5c2lzU3RhdHMubWlzc2luZztcbiAgICAgIGlmIChhbmFseXNpc1N0YXRzLmFjY3VyYWN5ICE9PSB1bmRlZmluZWQpIGVsZW1lbnRzLmFjY3VyYWN5Q291bnQudGV4dENvbnRlbnQgPSBgJHthbmFseXNpc1N0YXRzLmFjY3VyYWN5fSVgO1xuICAgIH0sXG5cbiAgICBzaG93QXJlYVNlY3Rpb246ICgpID0+IHtcbiAgICAgIGVsZW1lbnRzLmluaXRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBlbGVtZW50cy5hcmVhU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9LFxuXG4gICAgc2V0SW5pdEJ1dHRvblZpc2libGU6ICh2aXNpYmxlKSA9PiB7XG4gICAgICBlbGVtZW50cy5pbml0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gdmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgfSxcblxuICAgIHNldEluaXRpYWxpemVkOiAoaW5pdGlhbGl6ZWQpID0+IHtcbiAgICAgIGVsZW1lbnRzLmluaXRCdG4uZGlzYWJsZWQgPSBpbml0aWFsaXplZDtcbiAgICAgIGlmIChpbml0aWFsaXplZCkge1xuICAgICAgICBlbGVtZW50cy5pbml0QnRuLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICAgICAgZWxlbWVudHMuaW5pdEJ0bi5zdHlsZS5jdXJzb3IgPSAnbm90LWFsbG93ZWQnO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBlbmFibGVTdGFydEJ0bjogKCkgPT4ge1xuICAgICAgZWxlbWVudHMuc3RhcnRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIC8vIFRhbWJpXHUwMEU5biBoYWJpbGl0YXIgZWwgYm90XHUwMEYzbiBkZSBhblx1MDBFMWxpc2lzIGN1YW5kbyBoYXkgdW4gXHUwMEUxcmVhIHNlbGVjY2lvbmFkYVxuICAgICAgZWxlbWVudHMuYW5hbHl6ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGVsIGJvdFx1MDBGM24gZGUgcmVwb3NpY2lvbmFtaWVudG9cbiAgICAgIHVpLnVwZGF0ZVJlcG9zaXRpb25CdG4oKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUmVwb3NpdGlvbkJ0bjogKCkgPT4ge1xuICAgICAgLy8gRWwgYm90XHUwMEYzbiBkZSByZXBvc2ljaW9uYW1pZW50byBzb2xvIGVzdFx1MDBFMSBkaXNwb25pYmxlIHNpIGhheSBwcm9ncmVzbyAoXHUwMEUxcmVhICsgcFx1MDBFRHhlbGVzKVxuICAgICAgZWxlbWVudHMucmVwb3NpdGlvbkJ0bi5kaXNhYmxlZCA9ICFoYXNQcm9ncmVzcygpO1xuICAgIH0sXG5cbiAgICBzZXRSdW5uaW5nU3RhdGU6IChydW5uaW5nKSA9PiB7XG4gICAgICBlbGVtZW50cy5zdGFydEJ0bi5kaXNhYmxlZCA9IHJ1bm5pbmc7XG4gICAgICBlbGVtZW50cy5zdG9wQnRuLmRpc2FibGVkID0gIXJ1bm5pbmc7XG4gICAgICBlbGVtZW50cy5zZWxlY3RBcmVhQnRuLmRpc2FibGVkID0gcnVubmluZztcbiAgICAgIFxuICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgLy8gRGVzaGFiaWxpdGFyIHJlcG9zaWNpb25hbWllbnRvIG1pZW50cmFzIGVzdFx1MDBFMSBjb3JyaWVuZG9cbiAgICAgICAgZWxlbWVudHMucmVwb3NpdGlvbkJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBY3R1YWxpemFyIGVzdGFkbyBiYXNhZG8gZW4gc2kgaGF5IHByb2dyZXNvXG4gICAgICAgIHVpLnVwZGF0ZVJlcG9zaXRpb25CdG4oKTtcbiAgICAgICAgLy8gTWFudGVuZXIgZWwgYm90XHUwMEYzbiBkZSBhblx1MDBFMWxpc2lzIGhhYmlsaXRhZG8gc2kgaGF5IFx1MDBFMXJlYSBwcm90ZWdpZGFcbiAgICAgICAgaWYgKGVsZW1lbnRzLngxSW5wdXQudmFsdWUgJiYgZWxlbWVudHMueTFJbnB1dC52YWx1ZSAmJiBlbGVtZW50cy54MklucHV0LnZhbHVlICYmIGVsZW1lbnRzLnkySW5wdXQudmFsdWUpIHtcbiAgICAgICAgICBlbGVtZW50cy5hbmFseXplQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlQ29vcmRpbmF0ZXM6IChjb29yZHMpID0+IHtcbiAgICAgIGlmIChjb29yZHMueDEgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMueDFJbnB1dC52YWx1ZSA9IGNvb3Jkcy54MTtcbiAgICAgIGlmIChjb29yZHMueTEgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMueTFJbnB1dC52YWx1ZSA9IGNvb3Jkcy55MTtcbiAgICAgIGlmIChjb29yZHMueDIgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMueDJJbnB1dC52YWx1ZSA9IGNvb3Jkcy54MjtcbiAgICAgIGlmIChjb29yZHMueTIgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMueTJJbnB1dC52YWx1ZSA9IGNvb3Jkcy55MjtcbiAgICAgIFxuICAgICAgLy8gSGFiaWxpdGFyIGJvdFx1MDBGM24gZGUgYW5cdTAwRTFsaXNpcyBzaSB0b2RhcyBsYXMgY29vcmRlbmFkYXMgZXN0XHUwMEUxbiBkZWZpbmlkYXNcbiAgICAgIGlmIChlbGVtZW50cy54MUlucHV0LnZhbHVlICYmIGVsZW1lbnRzLnkxSW5wdXQudmFsdWUgJiYgZWxlbWVudHMueDJJbnB1dC52YWx1ZSAmJiBlbGVtZW50cy55MklucHV0LnZhbHVlKSB7XG4gICAgICAgIGVsZW1lbnRzLmFuYWx5emVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGVsIGJvdFx1MDBGM24gZGUgcmVwb3NpY2lvbmFtaWVudG9cbiAgICAgIHVpLnVwZGF0ZVJlcG9zaXRpb25CdG4oKTtcbiAgICB9LFxuXG4gICAgZGVzdHJveTogKCkgPT4ge1xuICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgYXJlYUZpbGVJbnB1dC5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRXZlbnQgbGlzdGVuZXIgcGFyYSBib3RcdTAwRjNuIGRlIGFuXHUwMEUxbGlzaXNcbiAgZWxlbWVudHMuYW5hbHl6ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGNyZWF0ZUFuYWx5c2lzV2luZG93IH0gPSBhd2FpdCBpbXBvcnQoJy4vYW5hbHlzaXMtd2luZG93LmpzJyk7XG4gICAgY3JlYXRlQW5hbHlzaXNXaW5kb3coKTtcbiAgfSk7XG5cbiAgLy8gSW5pY2lhbGl6YXIgZXN0YWRvIGRlbCBib3RcdTAwRjNuIGRlIHJlcG9zaWNpb25hbWllbnRvXG4gIHVpLnVwZGF0ZVJlcG9zaXRpb25CdG4oKTtcblxuICByZXR1cm4gdWk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93Q29uZmlybURpYWxvZyhtZXNzYWdlLCB0aXRsZSwgYnV0dG9ucyA9IHt9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBvdmVybGF5LmNsYXNzTmFtZSA9ICdtb2RhbC1vdmVybGF5JztcbiAgICBvdmVybGF5LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICBvdmVybGF5LnN0eWxlLnRvcCA9ICcwJztcbiAgICBvdmVybGF5LnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgb3ZlcmxheS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBvdmVybGF5LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBvdmVybGF5LnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgwLDAsMCwwLjcpJztcbiAgICBvdmVybGF5LnN0eWxlLnpJbmRleCA9ICcxMDAwMSc7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIG92ZXJsYXkuc3R5bGUuYWxpZ25JdGVtcyA9ICdjZW50ZXInO1xuICAgIG92ZXJsYXkuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcbiAgICBcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1vZGFsLnN0eWxlLmJhY2tncm91bmQgPSAnIzFhMWExYSc7XG4gICAgbW9kYWwuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCAjMzMzJztcbiAgICBtb2RhbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgbW9kYWwuc3R5bGUucGFkZGluZyA9ICcyNXB4JztcbiAgICBtb2RhbC5zdHlsZS5jb2xvciA9ICcjZWVlJztcbiAgICBtb2RhbC5zdHlsZS5taW5XaWR0aCA9ICczNTBweCc7XG4gICAgbW9kYWwuc3R5bGUubWF4V2lkdGggPSAnNDAwcHgnO1xuICAgIG1vZGFsLnN0eWxlLmJveFNoYWRvdyA9ICcwIDEwcHggMzBweCByZ2JhKDAsMCwwLDAuNSknO1xuICAgIG1vZGFsLnN0eWxlLmZvbnRGYW1pbHkgPSBcIidTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZlwiO1xuICAgIFxuICAgIG1vZGFsLmlubmVySFRNTCA9IGBcbiAgICAgIDxoMyBzdHlsZT1cIm1hcmdpbjogMCAwIDE1cHggMDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDE4cHg7XCI+JHt0aXRsZX08L2gzPlxuICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDAgMCAyMHB4IDA7IHRleHQtYWxpZ246IGNlbnRlcjsgbGluZS1oZWlnaHQ6IDEuNDtcIj4ke21lc3NhZ2V9PC9wPlxuICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMTBweDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XCI+XG4gICAgICAgICR7YnV0dG9ucy5zYXZlID8gYDxidXR0b24gY2xhc3M9XCJzYXZlLWJ0blwiIHN0eWxlPVwicGFkZGluZzogMTBweCAyMHB4OyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDhweDsgZm9udC1zaXplOiAxNHB4OyBmb250LXdlaWdodDogYm9sZDsgY3Vyc29yOiBwb2ludGVyOyBtaW4td2lkdGg6IDEwMHB4OyBiYWNrZ3JvdW5kOiAjMTBiOTgxOyBjb2xvcjogd2hpdGU7XCI+JHtidXR0b25zLnNhdmV9PC9idXR0b24+YCA6ICcnfVxuICAgICAgICAke2J1dHRvbnMuZGlzY2FyZCA/IGA8YnV0dG9uIGNsYXNzPVwiZGlzY2FyZC1idG5cIiBzdHlsZT1cInBhZGRpbmc6IDEwcHggMjBweDsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA4cHg7IGZvbnQtc2l6ZTogMTRweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGN1cnNvcjogcG9pbnRlcjsgbWluLXdpZHRoOiAxMDBweDsgYmFja2dyb3VuZDogI2VmNDQ0NDsgY29sb3I6IHdoaXRlO1wiPiR7YnV0dG9ucy5kaXNjYXJkfTwvYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgJHtidXR0b25zLmNhbmNlbCA/IGA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsLWJ0blwiIHN0eWxlPVwicGFkZGluZzogMTBweCAyMHB4OyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDhweDsgZm9udC1zaXplOiAxNHB4OyBmb250LXdlaWdodDogYm9sZDsgY3Vyc29yOiBwb2ludGVyOyBtaW4td2lkdGg6IDEwMHB4OyBiYWNrZ3JvdW5kOiAjMmQzNzQ4OyBjb2xvcjogd2hpdGU7XCI+JHtidXR0b25zLmNhbmNlbH08L2J1dHRvbj5gIDogJyd9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIFxuICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gICAgXG4gICAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gICAgY29uc3Qgc2F2ZUJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYXZlLWJ0bicpO1xuICAgIGNvbnN0IGRpc2NhcmRCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuZGlzY2FyZC1idG4nKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWJ0bicpO1xuICAgIFxuICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG92ZXJsYXkpO1xuICAgIH07XG4gICAgXG4gICAgaWYgKHNhdmVCdG4pIHtcbiAgICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgcmVzb2x2ZSgnc2F2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGlmIChkaXNjYXJkQnRuKSB7XG4gICAgICBkaXNjYXJkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIHJlc29sdmUoJ2Rpc2NhcmQnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoY2FuY2VsQnRuKSB7XG4gICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgcmVzb2x2ZSgnY2FuY2VsJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy8gQ2VycmFyIGFsIGhhY2VyIGNsaWNrIGZ1ZXJhXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IG92ZXJsYXkpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCdjYW5jZWwnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VEcmFnZ2FibGUoZWxlbWVudCkge1xuICBjb25zdCBoZWFkZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ndWFyZC1oZWFkZXInKTtcbiAgaWYgKCFoZWFkZXIpIHJldHVybjtcblxuICBsZXQgc3RhcnRYLCBzdGFydFksIHN0YXJ0TGVmdCwgc3RhcnRUb3A7XG5cbiAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgc3RhcnRMZWZ0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkubGVmdCwgMTApO1xuICAgIHN0YXJ0VG9wID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkudG9wLCAxMCk7XG5cbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChlMikgPT4ge1xuICAgICAgY29uc3QgZGVsdGFYID0gZTIuY2xpZW50WCAtIHN0YXJ0WDtcbiAgICAgIGNvbnN0IGRlbHRhWSA9IGUyLmNsaWVudFkgLSBzdGFydFk7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtzdGFydExlZnQgKyBkZWx0YVh9cHhgO1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBgJHtzdGFydFRvcCArIGRlbHRhWX1weGA7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VVcCA9ICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gIH0pO1xufVxuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gJy4uL2NvcmUvbG9nZ2VyLmpzJztcblxuLyogZ2xvYmFsIEJsb2IsIFVSTCAqL1xuXG4vKipcbiAqIFZlbnRhbmEgZGUgbG9ncyB1bmlmaWNhZGEgcGFyYSB0b2RvcyBsb3MgYm90c1xuICogQ2FyYWN0ZXJcdTAwRURzdGljYXM6XG4gKiAtIE11ZXN0cmEgbG9ncyBlbiB0aWVtcG8gcmVhbFxuICogLSBSZWRpbWVuc2lvbmFibGUgbWVkaWFudGUgYXJyYXN0cmVcbiAqIC0gQ29udHJvbGVzIHBhcmEgY2VycmFyIHkgZGVzY2FyZ2FyIGxvZ3NcbiAqIC0gUGVyc2lzdGVuY2lhIGRlbCBlc3RhZG8gZW50cmUgc2VzaW9uZXNcbiAqIC0gSW50ZWdyYWNpXHUwMEYzbiBjb24gdG9kb3MgbG9zIGJvdHNcbiAqL1xuXG5jbGFzcyBMb2dXaW5kb3cge1xuICBjb25zdHJ1Y3Rvcihib3ROYW1lID0gJ0JvdCcpIHtcbiAgICB0aGlzLmJvdE5hbWUgPSBib3ROYW1lO1xuICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5sb2dzID0gW107XG4gICAgdGhpcy5tYXhMb2dzID0gMTAwMDsgLy8gTFx1MDBFRG1pdGUgZGUgbG9ncyBwYXJhIGV2aXRhciBwcm9ibGVtYXMgZGUgbWVtb3JpYVxuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLmxvZ0NvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMuaXNSZXNpemluZyA9IGZhbHNlO1xuICAgIHRoaXMucmVzaXplSGFuZGxlID0gbnVsbDtcbiAgICB0aGlzLm9yaWdpbmFsQ29uc29sZSA9IHt9O1xuICAgIFxuICAgIC8vIENvbmZpZ3VyYWNpXHUwMEYzbiBwb3IgZGVmZWN0b1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgd2lkdGg6IDYwMCxcbiAgICAgIGhlaWdodDogNDAwLFxuICAgICAgeDogd2luZG93LmlubmVyV2lkdGggLSA2MjAsXG4gICAgICB5OiAyMCxcbiAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmxvYWRDb25maWcoKTtcbiAgICB0aGlzLmNyZWF0ZVdpbmRvdygpO1xuICAgIHRoaXMuc2V0dXBMb2dJbnRlcmNlcHRpb24oKTtcbiAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXJnYSBsYSBjb25maWd1cmFjaVx1MDBGM24gZ3VhcmRhZGEgZGVsIGxvY2FsU3RvcmFnZVxuICAgKi9cbiAgbG9hZENvbmZpZygpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgd3BsYWNlLWxvZy13aW5kb3ctJHt0aGlzLmJvdE5hbWV9YCk7XG4gICAgICBpZiAoc2F2ZWQpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7IC4uLnRoaXMuY29uZmlnLCAuLi5KU09OLnBhcnNlKHNhdmVkKSB9O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ0Vycm9yIGNhcmdhbmRvIGNvbmZpZ3VyYWNpXHUwMEYzbiBkZSB2ZW50YW5hIGRlIGxvZ3M6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHdWFyZGEgbGEgY29uZmlndXJhY2lcdTAwRjNuIGFjdHVhbCBlbiBsb2NhbFN0b3JhZ2VcbiAgICovXG4gIHNhdmVDb25maWcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGB3cGxhY2UtbG9nLXdpbmRvdy0ke3RoaXMuYm90TmFtZX1gLCBKU09OLnN0cmluZ2lmeSh0aGlzLmNvbmZpZykpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ0Vycm9yIGd1YXJkYW5kbyBjb25maWd1cmFjaVx1MDBGM24gZGUgdmVudGFuYSBkZSBsb2dzOicsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYSBsYSBlc3RydWN0dXJhIEhUTUwgZGUgbGEgdmVudGFuYVxuICAgKi9cbiAgY3JlYXRlV2luZG93KCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lID0gJ3dwbGFjZS1sb2ctd2luZG93JztcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgbGVmdDogJHt0aGlzLmNvbmZpZy54fXB4O1xuICAgICAgdG9wOiAke3RoaXMuY29uZmlnLnl9cHg7XG4gICAgICB3aWR0aDogJHt0aGlzLmNvbmZpZy53aWR0aH1weDtcbiAgICAgIGhlaWdodDogJHt0aGlzLmNvbmZpZy5oZWlnaHR9cHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuOSk7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICB6LWluZGV4OiAxMDAwMDE7XG4gICAgICBkaXNwbGF5OiAke3RoaXMuY29uZmlnLnZpc2libGUgPyAnZmxleCcgOiAnbm9uZSd9O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMHB4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDMycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgICAgZm9udC1mYW1pbHk6ICdDb25zb2xhcycsICdNb25hY28nLCAnQ291cmllciBOZXcnLCBtb25vc3BhY2U7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIHJlc2l6ZTogbm9uZTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYDtcblxuICAgIC8vIEhlYWRlciBjb24gdFx1MDBFRHR1bG8geSBjb250cm9sZXNcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFkZXIuY2xhc3NOYW1lID0gJ2xvZy13aW5kb3ctaGVhZGVyJztcbiAgICBoZWFkZXIuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogOHB4IDEycHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgICAgY3Vyc29yOiBtb3ZlO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA3cHggN3B4IDAgMDtcbiAgICBgO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IGBcdUQ4M0RcdURDQ0IgTG9ncyAtICR7dGhpcy5ib3ROYW1lfWA7XG4gICAgdGl0bGUuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgY29sb3I6ICNlMmU4ZjA7XG4gICAgYDtcblxuICAgIGNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udHJvbHMuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDhweDtcbiAgICBgO1xuXG4gICAgLy8gQm90XHUwMEYzbiBkZSBkZXNjYXJnYVxuICAgIGNvbnN0IGRvd25sb2FkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZG93bmxvYWRCdG4uaW5uZXJIVE1MID0gJ1x1RDgzRFx1RENCRSc7XG4gICAgZG93bmxvYWRCdG4udGl0bGUgPSAnRGVzY2FyZ2FyIGxvZ3MnO1xuICAgIGRvd25sb2FkQnRuLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDM0LCAxOTcsIDk0LCAwLjgpO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzO1xuICAgIGA7XG4gICAgZG93bmxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGRvd25sb2FkQnRuLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgzNCwgMTk3LCA5NCwgMSknO1xuICAgIH0pO1xuICAgIGRvd25sb2FkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICBkb3dubG9hZEJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMzQsIDE5NywgOTQsIDAuOCknO1xuICAgIH0pO1xuICAgIGRvd25sb2FkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5kb3dubG9hZExvZ3MoKSk7XG5cbiAgICAvLyBCb3RcdTAwRjNuIGRlIGNlcnJhclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2xvc2VCdG4uaW5uZXJIVE1MID0gJ1x1MjcxNSc7XG4gICAgY2xvc2VCdG4udGl0bGUgPSAnQ2VycmFyIHZlbnRhbmEnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDIzOSwgNjgsIDY4LCAwLjgpO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzO1xuICAgIGA7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGNsb3NlQnRuLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyMzksIDY4LCA2OCwgMSknO1xuICAgIH0pO1xuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICBjbG9zZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjM5LCA2OCwgNjgsIDAuOCknO1xuICAgIH0pO1xuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oaWRlKCkpO1xuXG4gICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoZG93bmxvYWRCdG4pO1xuICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChjb250cm9scyk7XG5cbiAgICAvLyBDb250ZW5pZG8gZGUgbG9nc1xuICAgIHRoaXMubG9nQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMubG9nQ29udGVudC5jbGFzc05hbWUgPSAnbG9nLXdpbmRvdy1jb250ZW50JztcbiAgICB0aGlzLmxvZ0NvbnRlbnQuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIGZsZXg6IDE7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gICAgYDtcblxuICAgIC8vIEhhbmRsZSBkZSByZWRpbWVuc2lvbmFtaWVudG9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVzaXplSGFuZGxlLmNsYXNzTmFtZSA9ICdsb2ctd2luZG93LXJlc2l6ZS1oYW5kbGUnO1xuICAgIHRoaXMucmVzaXplSGFuZGxlLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgY3Vyc29yOiBzZS1yZXNpemU7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCB0cmFuc3BhcmVudCAzMCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4zKSAzMCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4zKSA3MCUsIHRyYW5zcGFyZW50IDcwJSk7XG4gICAgICBib3JkZXItcmFkaXVzOiAwIDAgOHB4IDA7XG4gICAgYDtcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2dDb250ZW50KTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlc2l6ZUhhbmRsZSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAvLyBDb25maWd1cmFyIGFycmFzdHJlIGRlIHZlbnRhbmFcbiAgICB0aGlzLnNldHVwRHJhZ2dpbmcoaGVhZGVyKTtcbiAgICAvLyBDb25maWd1cmFyIHJlZGltZW5zaW9uYW1pZW50b1xuICAgIHRoaXMuc2V0dXBSZXNpemluZygpO1xuXG4gICAgdGhpcy5pc1Zpc2libGUgPSB0aGlzLmNvbmZpZy52aXNpYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyYSBlbCBhcnJhc3RyZSBkZSBsYSB2ZW50YW5hXG4gICAqL1xuICBzZXR1cERyYWdnaW5nKGhlYWRlcikge1xuICAgIGxldCBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgbGV0IGRyYWdPZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcblxuICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nKSByZXR1cm47XG4gICAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIGRyYWdPZmZzZXQueCA9IGUuY2xpZW50WCAtIHRoaXMuY29udGFpbmVyLm9mZnNldExlZnQ7XG4gICAgICBkcmFnT2Zmc2V0LnkgPSBlLmNsaWVudFkgLSB0aGlzLmNvbnRhaW5lci5vZmZzZXRUb3A7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVEcmFnKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRHJhZyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBoYW5kbGVEcmFnID0gKGUpID0+IHtcbiAgICAgIGlmICghaXNEcmFnZ2luZykgcmV0dXJuO1xuICAgICAgY29uc3QgbmV3WCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGgsIGUuY2xpZW50WCAtIGRyYWdPZmZzZXQueCkpO1xuICAgICAgY29uc3QgbmV3WSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuY29udGFpbmVyLm9mZnNldEhlaWdodCwgZS5jbGllbnRZIC0gZHJhZ09mZnNldC55KSk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbmV3WCArICdweCc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSBuZXdZICsgJ3B4JztcbiAgICAgIHRoaXMuY29uZmlnLnggPSBuZXdYO1xuICAgICAgdGhpcy5jb25maWcueSA9IG5ld1k7XG4gICAgfTtcblxuICAgIGNvbnN0IHN0b3BEcmFnID0gKCkgPT4ge1xuICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlRHJhZyk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcERyYWcpO1xuICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmEgZWwgcmVkaW1lbnNpb25hbWllbnRvIGRlIGxhIHZlbnRhbmFcbiAgICovXG4gIHNldHVwUmVzaXppbmcoKSB7XG4gICAgbGV0IGlzUmVzaXppbmcgPSBmYWxzZTtcbiAgICBsZXQgc3RhcnRYLCBzdGFydFksIHN0YXJ0V2lkdGgsIHN0YXJ0SGVpZ2h0O1xuXG4gICAgdGhpcy5yZXNpemVIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgIGlzUmVzaXppbmcgPSB0cnVlO1xuICAgICAgc3RhcnRYID0gZS5jbGllbnRYO1xuICAgICAgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgICAgc3RhcnRXaWR0aCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUodGhpcy5jb250YWluZXIpLndpZHRoLCAxMCk7XG4gICAgICBzdGFydEhlaWdodCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUodGhpcy5jb250YWluZXIpLmhlaWdodCwgMTApO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlUmVzaXplKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wUmVzaXplKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9IChlKSA9PiB7XG4gICAgICBpZiAoIWlzUmVzaXppbmcpIHJldHVybjtcbiAgICAgIGNvbnN0IG5ld1dpZHRoID0gTWF0aC5tYXgoMzAwLCBzdGFydFdpZHRoICsgZS5jbGllbnRYIC0gc3RhcnRYKTtcbiAgICAgIGNvbnN0IG5ld0hlaWdodCA9IE1hdGgubWF4KDIwMCwgc3RhcnRIZWlnaHQgKyBlLmNsaWVudFkgLSBzdGFydFkpO1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSBuZXdXaWR0aCArICdweCc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyAncHgnO1xuICAgICAgdGhpcy5jb25maWcud2lkdGggPSBuZXdXaWR0aDtcbiAgICAgIHRoaXMuY29uZmlnLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RvcFJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIGlzUmVzaXppbmcgPSBmYWxzZTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZVJlc2l6ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcFJlc2l6ZSk7XG4gICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyYSBsYSBpbnRlcmNlcHRhY2lcdTAwRjNuIGRlIGxvZ3MgZGUgY29uc29sYVxuICAgKi9cbiAgc2V0dXBMb2dJbnRlcmNlcHRpb24oKSB7XG4gICAgLy8gR3VhcmRhciByZWZlcmVuY2lhcyBvcmlnaW5hbGVzXG4gICAgdGhpcy5vcmlnaW5hbENvbnNvbGUgPSB7XG4gICAgICBsb2c6IGNvbnNvbGUubG9nLFxuICAgICAgaW5mbzogY29uc29sZS5pbmZvLFxuICAgICAgd2FybjogY29uc29sZS53YXJuLFxuICAgICAgZXJyb3I6IGNvbnNvbGUuZXJyb3IsXG4gICAgICBkZWJ1ZzogY29uc29sZS5kZWJ1Z1xuICAgIH07XG5cbiAgICAvLyBJbnRlcmNlcHRhciBjb25zb2xlLmxvZ1xuICAgIGNvbnNvbGUubG9nID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAgIHRoaXMuYWRkTG9nKCdsb2cnLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgLy8gSW50ZXJjZXB0YXIgY29uc29sZS5pbmZvXG4gICAgY29uc29sZS5pbmZvID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICB0aGlzLmFkZExvZygnaW5mbycsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvLyBJbnRlcmNlcHRhciBjb25zb2xlLndhcm5cbiAgICBjb25zb2xlLndhcm4gPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAgIHRoaXMuYWRkTG9nKCd3YXJuJywgYXJncyk7XG4gICAgfTtcblxuICAgIC8vIEludGVyY2VwdGFyIGNvbnNvbGUuZXJyb3JcbiAgICBjb25zb2xlLmVycm9yID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgdGhpcy5hZGRMb2coJ2Vycm9yJywgYXJncyk7XG4gICAgfTtcblxuICAgIC8vIEludGVyY2VwdGFyIGNvbnNvbGUuZGVidWdcbiAgICBjb25zb2xlLmRlYnVnID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgdGhpcy5hZGRMb2coJ2RlYnVnJywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBXHUwMEYxYWRlIHVuIGxvZyBhIGxhIHZlbnRhbmFcbiAgICovXG4gIGFkZExvZyh0eXBlLCBhcmdzKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgICBjb25zdCBtZXNzYWdlID0gYXJncy5tYXAoYXJnID0+IFxuICAgICAgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeShhcmcsIG51bGwsIDIpIDogU3RyaW5nKGFyZylcbiAgICApLmpvaW4oJyAnKTtcblxuICAgIGNvbnN0IGxvZ0VudHJ5ID0ge1xuICAgICAgdGltZXN0YW1wLFxuICAgICAgdHlwZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICByYXc6IGFyZ3NcbiAgICB9O1xuXG4gICAgdGhpcy5sb2dzLnB1c2gobG9nRW50cnkpO1xuXG4gICAgLy8gTGltaXRhciBuXHUwMEZBbWVybyBkZSBsb2dzXG4gICAgaWYgKHRoaXMubG9ncy5sZW5ndGggPiB0aGlzLm1heExvZ3MpIHtcbiAgICAgIHRoaXMubG9ncy5zaGlmdCgpO1xuICAgIH1cblxuICAgIC8vIEFjdHVhbGl6YXIgVUkgc2kgZXN0XHUwMEUxIHZpc2libGVcbiAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTG9nRGlzcGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY3R1YWxpemEgbGEgdmlzdWFsaXphY2lcdTAwRjNuIGRlIGxvZ3NcbiAgICovXG4gIHVwZGF0ZUxvZ0Rpc3BsYXkoKSB7XG4gICAgaWYgKCF0aGlzLmxvZ0NvbnRlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGxvZ0h0bWwgPSB0aGlzLmxvZ3MubWFwKGVudHJ5ID0+IHtcbiAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5nZXRMb2dDb2xvcihlbnRyeS50eXBlKTtcbiAgICAgIHJldHVybiBgPGRpdiBzdHlsZT1cImNvbG9yOiAke2NvbG9yfTsgbWFyZ2luLWJvdHRvbTogMnB4O1wiPlske2VudHJ5LnRpbWVzdGFtcH1dICR7ZW50cnkubWVzc2FnZX08L2Rpdj5gO1xuICAgIH0pLmpvaW4oJycpO1xuXG4gICAgdGhpcy5sb2dDb250ZW50LmlubmVySFRNTCA9IGxvZ0h0bWw7XG4gICAgXG4gICAgLy8gQXV0by1zY3JvbGwgYWwgZmluYWxcbiAgICB0aGlzLmxvZ0NvbnRlbnQuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250ZW50LnNjcm9sbEhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYnRpZW5lIGVsIGNvbG9yIHBhcmEgY2FkYSB0aXBvIGRlIGxvZ1xuICAgKi9cbiAgZ2V0TG9nQ29sb3IodHlwZSkge1xuICAgIGNvbnN0IGNvbG9ycyA9IHtcbiAgICAgIGxvZzogJyNlMmU4ZjAnLFxuICAgICAgaW5mbzogJyM2MGE1ZmEnLFxuICAgICAgd2FybjogJyNmYmJmMjQnLFxuICAgICAgZXJyb3I6ICcjZjg3MTcxJyxcbiAgICAgIGRlYnVnOiAnI2E3OGJmYSdcbiAgICB9O1xuICAgIHJldHVybiBjb2xvcnNbdHlwZV0gfHwgY29sb3JzLmxvZztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNjYXJnYSBsb3MgbG9ncyBjb21vIGFyY2hpdm9cbiAgICovXG4gIGRvd25sb2FkTG9ncygpIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBub3cudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuICAgIGNvbnN0IHRpbWVTdHIgPSBub3cudG9UaW1lU3RyaW5nKCkuc3BsaXQoJyAnKVswXS5yZXBsYWNlKC86L2csICctJyk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgbG9nXyR7dGhpcy5ib3ROYW1lfV8ke2RhdGVTdHJ9XyR7dGltZVN0cn0ubG9nYDtcblxuICAgIGNvbnN0IGxvZ1RleHQgPSB0aGlzLmxvZ3MubWFwKGVudHJ5ID0+IFxuICAgICAgYFske2VudHJ5LnRpbWVzdGFtcH1dIFske2VudHJ5LnR5cGUudG9VcHBlckNhc2UoKX1dICR7ZW50cnkubWVzc2FnZX1gXG4gICAgKS5qb2luKCdcXG4nKTtcblxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbG9nVGV4dF0sIHsgdHlwZTogJ3RleHQvcGxhaW4nIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgXG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuXG4gICAgbG9nKGBcdUQ4M0RcdURDRTUgTG9ncyBkZXNjYXJnYWRvcyBjb21vOiAke2ZpbGVuYW1lfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIE11ZXN0cmEgbGEgdmVudGFuYSBkZSBsb2dzXG4gICAqL1xuICBzaG93KCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuY29uZmlnLnZpc2libGUgPSB0cnVlO1xuICAgICAgdGhpcy51cGRhdGVMb2dEaXNwbGF5KCk7XG4gICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT2N1bHRhIGxhIHZlbnRhbmEgZGUgbG9nc1xuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jb25maWcudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsdGVybmEgbGEgdmlzaWJpbGlkYWQgZGUgbGEgdmVudGFuYVxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaW1waWEgdG9kb3MgbG9zIGxvZ3NcbiAgICovXG4gIGNsZWFyKCkge1xuICAgIHRoaXMubG9ncyA9IFtdO1xuICAgIGlmICh0aGlzLmxvZ0NvbnRlbnQpIHtcbiAgICAgIHRoaXMubG9nQ29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJhIGxvcyBldmVudCBsaXN0ZW5lcnMgZ2xvYmFsZXNcbiAgICovXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy8gQWp1c3RhciBwb3NpY2lcdTAwRjNuIGFsIHJlZGltZW5zaW9uYXIgdmVudGFuYVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNvbnN0IG1heFkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5jb25maWcueCA+IG1heFgpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy54ID0gTWF0aC5tYXgoMCwgbWF4WCk7XG4gICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuY29uZmlnLnggKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5jb25maWcueSA+IG1heFkpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy55ID0gTWF0aC5tYXgoMCwgbWF4WSk7XG4gICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdGhpcy5jb25maWcueSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RydXllIGxhIHZlbnRhbmEgeSByZXN0YXVyYSBjb25zb2xlIG9yaWdpbmFsXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIC8vIFJlc3RhdXJhciBjb25zb2xlIG9yaWdpbmFsXG4gICAgaWYgKHRoaXMub3JpZ2luYWxDb25zb2xlLmxvZykge1xuICAgICAgY29uc29sZS5sb2cgPSB0aGlzLm9yaWdpbmFsQ29uc29sZS5sb2c7XG4gICAgICBjb25zb2xlLmluZm8gPSB0aGlzLm9yaWdpbmFsQ29uc29sZS5pbmZvO1xuICAgICAgY29uc29sZS53YXJuID0gdGhpcy5vcmlnaW5hbENvbnNvbGUud2FybjtcbiAgICAgIGNvbnNvbGUuZXJyb3IgPSB0aGlzLm9yaWdpbmFsQ29uc29sZS5lcnJvcjtcbiAgICAgIGNvbnNvbGUuZGVidWcgPSB0aGlzLm9yaWdpbmFsQ29uc29sZS5kZWJ1ZztcbiAgICB9XG5cbiAgICAvLyBSZW1vdmVyIHZlbnRhbmEgZGVsIERPTVxuICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5sb2dDb250ZW50ID0gbnVsbDtcbiAgICB0aGlzLmxvZ3MgPSBbXTtcbiAgfVxufVxuXG4vLyBJbnN0YW5jaWEgZ2xvYmFsIHBhcmEgZ2VzdGlvbmFyIHZlbnRhbmFzIGRlIGxvZ3NcbndpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3MgPSB3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzIHx8IHt9O1xuXG4vKipcbiAqIENyZWEgbyBvYnRpZW5lIHVuYSB2ZW50YW5hIGRlIGxvZ3MgcGFyYSB1biBib3QgZXNwZWNcdTAwRURmaWNvXG4gKiBAcGFyYW0ge3N0cmluZ30gYm90TmFtZSAtIE5vbWJyZSBkZWwgYm90XG4gKiBAcmV0dXJucyB7TG9nV2luZG93fSAtIEluc3RhbmNpYSBkZSBsYSB2ZW50YW5hIGRlIGxvZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvZ1dpbmRvdyhib3ROYW1lKSB7XG4gIGlmICghd2luZG93Ll9fd3BsYWNlTG9nV2luZG93c1tib3ROYW1lXSkge1xuICAgIHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3NbYm90TmFtZV0gPSBuZXcgTG9nV2luZG93KGJvdE5hbWUpO1xuICB9XG4gIHJldHVybiB3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzW2JvdE5hbWVdO1xufVxuXG4vKipcbiAqIE9idGllbmUgbGEgdmVudGFuYSBkZSBsb2dzIGRlIHVuIGJvdCBlc3BlY1x1MDBFRGZpY29cbiAqIEBwYXJhbSB7c3RyaW5nfSBib3ROYW1lIC0gTm9tYnJlIGRlbCBib3RcbiAqIEByZXR1cm5zIHtMb2dXaW5kb3d8bnVsbH0gLSBJbnN0YW5jaWEgZGUgbGEgdmVudGFuYSBkZSBsb2dzIG8gbnVsbCBzaSBubyBleGlzdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ1dpbmRvdyhib3ROYW1lKSB7XG4gIHJldHVybiB3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzW2JvdE5hbWVdIHx8IG51bGw7XG59XG5cbi8qKlxuICogRGVzdHJ1eWUgbGEgdmVudGFuYSBkZSBsb2dzIGRlIHVuIGJvdCBlc3BlY1x1MDBFRGZpY29cbiAqIEBwYXJhbSB7c3RyaW5nfSBib3ROYW1lIC0gTm9tYnJlIGRlbCBib3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lMb2dXaW5kb3coYm90TmFtZSkge1xuICBpZiAod2luZG93Ll9fd3BsYWNlTG9nV2luZG93c1tib3ROYW1lXSkge1xuICAgIHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3NbYm90TmFtZV0uZGVzdHJveSgpO1xuICAgIGRlbGV0ZSB3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzW2JvdE5hbWVdO1xuICB9XG59XG5cbi8qKlxuICogRGVzdHJ1eWUgdG9kYXMgbGFzIHZlbnRhbmFzIGRlIGxvZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lBbGxMb2dXaW5kb3dzKCkge1xuICBPYmplY3Qua2V5cyh3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzKS5mb3JFYWNoKGJvdE5hbWUgPT4ge1xuICAgIGRlc3Ryb3lMb2dXaW5kb3coYm90TmFtZSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBMb2dXaW5kb3cgfTsiLCAiZXhwb3J0IGNvbnN0IGVzID0ge1xuICAvLyBMYXVuY2hlclxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIEF1dG9CT1QnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIEF1dG8tRmFybScsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IEF1dG8tSW1hZ2UnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBBdXRvLUd1YXJkJyxcbiAgICBzZWxlY3Rpb246ICdTZWxlY2NpXHUwMEYzbicsXG4gICAgdXNlcjogJ1VzdWFyaW8nLFxuICAgIGNoYXJnZXM6ICdDYXJnYXMnLFxuICAgIGJhY2tlbmQ6ICdCYWNrZW5kJyxcbiAgICBkYXRhYmFzZTogJ0RhdGFiYXNlJyxcbiAgICB1cHRpbWU6ICdVcHRpbWUnLFxuICAgIGNsb3NlOiAnQ2VycmFyJyxcbiAgICBsYXVuY2g6ICdMYW56YXInLFxuICAgIGxvYWRpbmc6ICdDYXJnYW5kb1x1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnRWplY3V0YW5kb1x1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdEZXNjYXJnYW5kbyBzY3JpcHRcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ0VsaWdlIHVuIGJvdCB5IHByZXNpb25hIExhbnphcicsXG4gICAgcmVhZHlUb0xhdW5jaDogJ0xpc3RvIHBhcmEgbGFuemFyJyxcbiAgICBsb2FkRXJyb3I6ICdFcnJvciBhbCBjYXJnYXInLFxuICAgIGxvYWRFcnJvck1zZzogJ05vIHNlIHB1ZG8gY2FyZ2FyIGVsIGJvdCBzZWxlY2Npb25hZG8uIFJldmlzYSB0dSBjb25leGlcdTAwRjNuIG8gaW50XHUwMEU5bnRhbG8gZGUgbnVldm8uJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBWZXJpZmljYW5kby4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIE9ubGluZScsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBPZmZsaW5lJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBPSycsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgRXJyb3InLFxuICAgIHVua25vd246ICctJyxcbiAgICBsb2dXaW5kb3c6ICdMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ0xvZ3MgLSB7Ym90TmFtZX0nLFxuICAgIGRvd25sb2FkTG9nczogJ0Rlc2NhcmdhciBMb2dzJyxcbiAgICBjbGVhckxvZ3M6ICdMaW1waWFyIExvZ3MnLFxuICAgIGNsb3NlTG9nczogJ0NlcnJhcidcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pY2lhciBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlN1YmlyIEltYWdlblwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlJlZGltZW5zaW9uYXIgSW1hZ2VuXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWNjaW9uYXIgUG9zaWNpXHUwMEYzblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiSW5pY2lhciBQaW50dXJhXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIkRldGVuZXIgUGludHVyYVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJHdWFyZGFyIFByb2dyZXNvXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIkNhcmdhciBQcm9ncmVzb1wiLFxuXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFZlcmlmaWNhbmRvIGNvbG9yZXMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTAwQTFBYnJlIGxhIHBhbGV0YSBkZSBjb2xvcmVzIGVuIGVsIHNpdGlvIGUgaW50XHUwMEU5bnRhbG8gZGUgbnVldm8hXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IHtjb3VudH0gY29sb3JlcyBkaXNwb25pYmxlcyBlbmNvbnRyYWRvc1wiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgQ2FyZ2FuZG8gaW1hZ2VuLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IEltYWdlbiBjYXJnYWRhIGNvbiB7Y291bnR9IHBcdTAwRUR4ZWxlcyB2XHUwMEUxbGlkb3NcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBhbCBjYXJnYXIgbGEgaW1hZ2VuXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdTAwQTFQaW50YSBlbCBwcmltZXIgcFx1MDBFRHhlbCBlbiBsYSB1YmljYWNpXHUwMEYzbiBkb25kZSBxdWllcmVzIHF1ZSBjb21pZW5jZSBlbCBhcnRlIVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRXNwZXJhbmRvIHF1ZSBwaW50ZXMgZWwgcFx1MDBFRHhlbCBkZSByZWZlcmVuY2lhLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1MDBBMVBvc2ljaVx1MDBGM24gZXN0YWJsZWNpZGEgY29uIFx1MDBFOXhpdG8hXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaWVtcG8gYWdvdGFkbyBwYXJhIHNlbGVjY2lvbmFyIHBvc2ljaVx1MDBGM25cIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBQb3NpY2lcdTAwRjNuIGRldGVjdGFkYSwgcHJvY2VzYW5kby4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIEVycm9yIGRldGVjdGFuZG8gcG9zaWNpXHUwMEYzbiwgaW50XHUwMEU5bnRhbG8gZGUgbnVldm9cIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBJbmljaWFuZG8gcGludHVyYS4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFByb2dyZXNvOiB7cGFpbnRlZH0ve3RvdGFsfSBwXHUwMEVEeGVsZXMuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIFNpbiBjYXJnYXMuIEVzcGVyYW5kbyB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFBpbnR1cmEgZGV0ZW5pZGEgcG9yIGVsIHVzdWFyaW9cIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBcdTAwQTFQaW50dXJhIGNvbXBsZXRhZGEhIHtjb3VudH0gcFx1MDBFRHhlbGVzIHBpbnRhZG9zLlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIEVycm9yIGR1cmFudGUgbGEgcGludHVyYVwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIENhcmdhIHVuYSBpbWFnZW4geSBzZWxlY2Npb25hIHVuYSBwb3NpY2lcdTAwRjNuIHByaW1lcm9cIixcbiAgICBwcm9ncmVzczogXCJQcm9ncmVzb1wiLFxuICAgIHVzZXJOYW1lOiBcIlVzdWFyaW9cIixcbiAgICBwaXhlbHM6IFwiUFx1MDBFRHhlbGVzXCIsXG4gICAgY2hhcmdlczogXCJDYXJnYXNcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlRpZW1wbyBlc3RpbWFkb1wiLFxuICAgIGluaXRNZXNzYWdlOiBcIkhheiBjbGljIGVuICdJbmljaWFyIEF1dG8tQk9UJyBwYXJhIGNvbWVuemFyXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiRXNwZXJhbmRvIGluaWNpYWxpemFjaVx1MDBGM24uLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBJbWFnZW4gcmVkaW1lbnNpb25hZGEgYSB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFBpbnR1cmEgcGF1c2FkYSBlbiBsYSBwb3NpY2lcdTAwRjNuIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUFx1MDBFRHhlbGVzIHBvciBsb3RlXCIsXG4gICAgYmF0Y2hTaXplOiBcIlRhbWFcdTAwRjFvIGRlbCBsb3RlXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJTaWd1aWVudGUgbG90ZSBlblwiLFxuICAgIHVzZUFsbENoYXJnZXM6IFwiVXNhciB0b2RhcyBsYXMgY2FyZ2FzIGRpc3BvbmlibGVzXCIsXG4gICAgc2hvd092ZXJsYXk6IFwiTW9zdHJhciBvdmVybGF5XCIsXG4gICAgbWF4Q2hhcmdlczogXCJDYXJnYXMgbVx1MDBFMXhpbWFzIHBvciBsb3RlXCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIEVzcGVyYW5kbyBjYXJnYXM6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiVGllbXBvIHJlc3RhbnRlXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBFc3BlcmFuZG8ge3RpbWV9IHBhcmEgY29udGludWFyLi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgUHJvZ3Jlc28gZ3VhcmRhZG8gY29tbyB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFByb2dyZXNvIGNhcmdhZG86IHtwYWludGVkfS97dG90YWx9IHBcdTAwRUR4ZWxlcyBwaW50YWRvc1wiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBFcnJvciBhbCBjYXJnYXIgcHJvZ3Jlc286IHtlcnJvcn1cIixcbiAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgRXJyb3IgYWwgZ3VhcmRhciBwcm9ncmVzbzoge2Vycm9yfVwiLFxuXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTAwQkZEZXNlYXMgZ3VhcmRhciBlbCBwcm9ncmVzbyBhY3R1YWwgYW50ZXMgZGUgZGV0ZW5lcj9cIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJHdWFyZGFyIFByb2dyZXNvXCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIkRlc2NhcnRhclwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxhclwiLFxuICAgIG1pbmltaXplOiBcIk1pbmltaXphclwiLFxuICAgIHdpZHRoOiBcIkFuY2hvXCIsXG4gICAgaGVpZ2h0OiBcIkFsdG9cIiwgXG4gICAga2VlcEFzcGVjdDogXCJNYW50ZW5lciBwcm9wb3JjaVx1MDBGM25cIixcbiAgICBhcHBseTogXCJBcGxpY2FyXCIsXG4gIG92ZXJsYXlPbjogXCJPdmVybGF5OiBPTlwiLFxuICBvdmVybGF5T2ZmOiBcIk92ZXJsYXk6IE9GRlwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFBhc2FkYSBjb21wbGV0YWRhOiB7cGFpbnRlZH0gcFx1MDBFRHhlbGVzIHBpbnRhZG9zIHwgUHJvZ3Jlc286IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIEVzcGVyYW5kbyByZWdlbmVyYWNpXHUwMEYzbiBkZSBjYXJnYXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFRpZW1wbzoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIEVzcGVyYW5kbyBjYXJnYXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFF1ZWRhbjoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pY2lhbGl6YW5kbyBhdXRvbVx1MDBFMXRpY2FtZW50ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGluaWNpYWRvIGF1dG9tXHUwMEUxdGljYW1lbnRlXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gaW5pY2lhciBhdXRvbVx1MDBFMXRpY2FtZW50ZS4gVXNhIGVsIGJvdFx1MDBGM24gbWFudWFsLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXRhIGRlIGNvbG9yZXMgZGV0ZWN0YWRhXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBCdXNjYW5kbyBwYWxldGEgZGUgY29sb3Jlcy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IEhhY2llbmRvIGNsaWMgZW4gZWwgYm90XHUwMEYzbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkb1wiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pY2lvIG1hbnVhbCByZXF1ZXJpZG9cIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFJlaW50ZW50byB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBlbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycm9yIGVuIGludGVudG8ge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIHJlaW50ZW50YW5kbyBlbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBGYWxsXHUwMEYzIGRlc3B1XHUwMEU5cyBkZSB7bWF4QXR0ZW1wdHN9IGludGVudG9zLiBDb250aW51YW5kbyBjb24gc2lndWllbnRlIGxvdGUuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIEVycm9yIGRlIHJlZC4gUmVpbnRlbnRhbmRvLi4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IEVycm9yIGRlbCBzZXJ2aWRvci4gUmVpbnRlbnRhbmRvLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBUaW1lb3V0IGRlbCBzZXJ2aWRvci4gUmVpbnRlbnRhbmRvLi4uXCIsXG4gICAgLy8gTnVldm9zIHRleHRvcyB2Mi4wXG4gICAgcHJvdGVjdGlvbkVuYWJsZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY2NpXHUwMEYzbiBoYWJpbGl0YWRhXCIsXG4gICAgcHJvdGVjdGlvbkRpc2FibGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gZGVzaGFiaWxpdGFkYVwiLCBcbiAgICBwYWludFBhdHRlcm46IFwiXHVEODNEXHVEQ0QwIFBhdHJcdTAwRjNuIGRlIHBpbnRhZG9cIixcbiAgICBwYXR0ZXJuTGluZWFyU3RhcnQ6IFwiTGluZWFsIChJbmljaW8pXCIsXG4gICAgcGF0dGVybkxpbmVhckVuZDogXCJMaW5lYWwgKEZpbmFsKVwiLFxuICAgIHBhdHRlcm5SYW5kb206IFwiQWxlYXRvcmlvXCIsXG4gICAgcGF0dGVybkNlbnRlck91dDogXCJDZW50cm8gaGFjaWEgYWZ1ZXJhXCIsXG4gICAgcGF0dGVybkNvcm5lcnNGaXJzdDogXCJFc3F1aW5hcyBwcmltZXJvXCIsXG4gICAgcGF0dGVyblNwaXJhbDogXCJFc3BpcmFsXCIsXG4gICAgcHJvdGVjdGluZ0RyYXdpbmc6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlZ2llbmRvIGRpYnVqby4uLlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBjYW1iaW9zIGRldGVjdGFkb3MgZW4gZWwgZGlidWpvXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REQyNyBSZXBhcmFuZG8ge2NvdW50fSBwXHUwMEVEeGVsZXMgYWx0ZXJhZG9zLi4uXCIsXG4gICAgcmVwYWlyQ29tcGxldGVkOiBcIlx1MjcwNSBSZXBhcmFjaVx1MDBGM24gY29tcGxldGFkYToge2NvdW50fSBwXHUwMEVEeGVsZXNcIixcbiAgICBub0NoYXJnZXNGb3JSZXBhaXI6IFwiXHUyNkExIFNpbiBjYXJnYXMgcGFyYSByZXBhcmFyLCBlc3BlcmFuZG8uLi5cIixcbiAgICBwcm90ZWN0aW9uUHJpb3JpdHk6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByaW9yaWRhZCBkZSBwcm90ZWNjaVx1MDBGM24gYWN0aXZhZGFcIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiRGVzY2FyZ2FyIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiTGltcGlhciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkNlcnJhclwiLFxuICAgIC8vIE51ZXZhcyBmdW5jaW9uYWxpZGFkZXNcbiAgICBwYWludGluZ1N0YXRzOiBcIkVzdGFkXHUwMEVEc3RpY2FzIGRlIFBpbnRhZG9cIixcbiAgICB1c2VySW5mbzogXCJJbmZvcm1hY2lcdTAwRjNuIGRlbCBVc3VhcmlvXCIsXG4gICAgaW1hZ2VQcm9ncmVzczogXCJQcm9ncmVzbyBkZSBsYSBJbWFnZW5cIixcbiAgICBhdmFpbGFibGVDb2xvcnM6IFwiQ29sb3JlcyBEaXNwb25pYmxlc1wiLFxuICAgIHJlZnJlc2hTdGF0czogXCJBY3R1YWxpemFyIEVzdGFkXHUwMEVEc3RpY2FzXCIsXG4gICAgbm9JbWFnZUxvYWRlZDogXCJObyBoYXkgaW1hZ2VuIGNhcmdhZGFcIixcbiAgICBjb29sZG93bjogXCJUaWVtcG8gZGUgZXNwZXJhXCIsXG4gICAgdG90YWxDb2xvcnM6IFwiVG90YWwgZGUgQ29sb3Jlc1wiLFxuICAgIGNvbG9yUGFsZXR0ZTogXCJQYWxldGEgZGUgQ29sb3Jlc1wiLFxuICAgIHNob3dBbGxDb2xvcnM6IFwiTW9zdHJhciBUb2RvcyBsb3MgQ29sb3JlcyAoaW5jbHV5ZW5kbyBubyBkaXNwb25pYmxlcylcIixcbiAgICBzZWxlY3RBbGxDb2xvcnM6IFwiU2VsZWNjaW9uYXIgVG9kb3NcIixcbiAgICB1bnNlbGVjdEFsbENvbG9yczogXCJEZXNlbGVjY2lvbmFyIFRvZG9zXCIsXG4gICAgbm9BdmFpbGFibGU6IFwiTm8gZGlzcG9uaWJsZVwiLFxuICAgIGNvbG9yU2VsZWN0ZWQ6IFwiQ29sb3Igc2VsZWNjaW9uYWRvXCIsXG4gICAgc3RhdHNVcGRhdGVkOiBcIlx1MjcwNSBFc3RhZFx1MDBFRHN0aWNhcyBhY3R1YWxpemFkYXM6IHtjb3VudH0gY29sb3JlcyBkaXNwb25pYmxlc1wiXG4gIH0sXG5cbiAgLy8gRmFybSBNb2R1bGUgKHBvciBpbXBsZW1lbnRhcilcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBGYXJtIEJvdFwiLFxuICAgIHN0YXJ0OiBcIkluaWNpYXJcIixcbiAgICBzdG9wOiBcIkRldGVuZXJcIiwgXG4gICAgc3RvcHBlZDogXCJCb3QgZGV0ZW5pZG9cIixcbiAgICBjYWxpYnJhdGU6IFwiQ2FsaWJyYXJcIixcbiAgICBwYWludE9uY2U6IFwiVW5hIHZlelwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlZlcmlmaWNhbmRvIGVzdGFkby4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiQ29uZmlndXJhY2lcdTAwRjNuXCIsXG4gICAgZGVsYXk6IFwiRGVsYXkgKG1zKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBcdTAwRUR4ZWxlcy9sb3RlXCIsXG4gICAgbWluQ2hhcmdlczogXCJDYXJnYXMgbVx1MDBFRG5cIixcbiAgICBjb2xvck1vZGU6IFwiTW9kbyBjb2xvclwiLFxuICAgIHJhbmRvbTogXCJBbGVhdG9yaW9cIixcbiAgICBmaXhlZDogXCJGaWpvXCIsXG4gICAgcmFuZ2U6IFwiUmFuZ29cIixcbiAgICBmaXhlZENvbG9yOiBcIkNvbG9yIGZpam9cIixcbiAgICBhZHZhbmNlZDogXCJBdmFuemFkb1wiLFxuICAgIHRpbGVYOiBcIlRpbGUgWFwiLFxuICAgIHRpbGVZOiBcIlRpbGUgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiUGFsZXRhIHBlcnNvbmFsaXphZGFcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJlajogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIkNhcHR1cmFyXCIsXG4gICAgcGFpbnRlZDogXCJQaW50YWRvc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2FyZ2FzXCIsXG4gICAgcmV0cmllczogXCJGYWxsb3NcIixcbiAgICB0aWxlOiBcIlRpbGVcIixcbiAgICBjb25maWdTYXZlZDogXCJDb25maWd1cmFjaVx1MDBGM24gZ3VhcmRhZGFcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiQ29uZmlndXJhY2lcdTAwRjNuIGNhcmdhZGFcIixcbiAgICBjb25maWdSZXNldDogXCJDb25maWd1cmFjaVx1MDBGM24gcmVpbmljaWFkYVwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiUGludGEgdW4gcFx1MDBFRHhlbCBtYW51YWxtZW50ZSBwYXJhIGNhcHR1cmFyIGNvb3JkZW5hZGFzLi4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJCYWNrZW5kIE9ubGluZVwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIkJhY2tlbmQgT2ZmbGluZVwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIkluaWNpYW5kbyBib3QuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJEZXRlbmllbmRvIGJvdC4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIkNhbGlicmFuZG8uLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJBdXRvLUZhcm0geWEgZXN0XHUwMEUxIGNvcnJpZW5kby5cIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIkF1dG8tSW1hZ2UgZXN0XHUwMEUxIGVqZWN1dFx1MDBFMW5kb3NlLiBDaVx1MDBFOXJyYWxvIGFudGVzIGRlIGluaWNpYXIgQXV0by1GYXJtLlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjY2lvbmFyIFpvbmFcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBQaW50YSB1biBwXHUwMEVEeGVsIGVuIHVuYSB6b25hIERFU1BPQkxBREEgZGVsIG1hcGEgcGFyYSBlc3RhYmxlY2VyIGVsIFx1MDBFMXJlYSBkZSBmYXJtaW5nXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBFc3BlcmFuZG8gcXVlIHBpbnRlcyBlbCBwXHUwMEVEeGVsIGRlIHJlZmVyZW5jaWEuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHUwMEExWm9uYSBlc3RhYmxlY2lkYSEgUmFkaW86IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaWVtcG8gYWdvdGFkbyBwYXJhIHNlbGVjY2lvbmFyIHpvbmFcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFNlbGVjY2lvbmEgdW5hIHpvbmEgcHJpbWVybyB1c2FuZG8gJ1NlbGVjY2lvbmFyIFpvbmEnXCIsXG4gICAgZmFybVJhZGl1czogXCJSYWRpbyBmYXJtXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlpvbmEgYWN0dWFsXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBGYXJtaW5nIGVuIHJhZGlvIHtyYWRpdXN9cHggZGVzZGUgKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBJTVBPUlRBTlRFOiBTZWxlY2Npb25hIHVuYSB6b25hIERFU1BPQkxBREEgcGFyYSBldml0YXIgY29uZmxpY3Rvc1wiLFxuICAgIG5vUG9zaXRpb246IFwiU2luIHpvbmFcIixcbiAgICBjdXJyZW50Wm9uZTogXCJab25hOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFNlbGVjY2lvbmEgdW5hIHpvbmEgcHJpbWVyby4gUGludGEgdW4gcFx1MDBFRHhlbCBlbiBlbCBtYXBhIHBhcmEgZXN0YWJsZWNlciBsYSB6b25hIGRlIGZhcm1pbmdcIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiRGVzY2FyZ2FyIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiTGltcGlhciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkNlcnJhclwiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiU1x1MDBFRFwiLFxuICAgIG5vOiBcIk5vXCIsXG4gICAgb2s6IFwiQWNlcHRhclwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxhclwiLFxuICAgIGNsb3NlOiBcIkNlcnJhclwiLFxuICAgIHNhdmU6IFwiR3VhcmRhclwiLFxuICAgIGxvYWQ6IFwiQ2FyZ2FyXCIsXG4gICAgZGVsZXRlOiBcIkVsaW1pbmFyXCIsXG4gICAgZWRpdDogXCJFZGl0YXJcIixcbiAgICBzdGFydDogXCJJbmljaWFyXCIsXG4gICAgc3RvcDogXCJEZXRlbmVyXCIsXG4gICAgcGF1c2U6IFwiUGF1c2FyXCIsXG4gICAgcmVzdW1lOiBcIlJlYW51ZGFyXCIsXG4gICAgcmVzZXQ6IFwiUmVpbmljaWFyXCIsXG4gICAgc2V0dGluZ3M6IFwiQ29uZmlndXJhY2lcdTAwRjNuXCIsXG4gICAgaGVscDogXCJBeXVkYVwiLFxuICAgIGFib3V0OiBcIkFjZXJjYSBkZVwiLFxuICAgIGxhbmd1YWdlOiBcIklkaW9tYVwiLFxuICAgIGxvYWRpbmc6IFwiQ2FyZ2FuZG8uLi5cIixcbiAgICBlcnJvcjogXCJFcnJvclwiLFxuICAgIHN1Y2Nlc3M6IFwiXHUwMEM5eGl0b1wiLFxuICAgIHdhcm5pbmc6IFwiQWR2ZXJ0ZW5jaWFcIixcbiAgICBpbmZvOiBcIkluZm9ybWFjaVx1MDBGM25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiSWRpb21hIGNhbWJpYWRvIGEge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gR3VhcmQgTW9kdWxlXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tR3VhcmRcIixcbiAgICBpbml0Qm90OiBcIkluaWNpYWxpemFyIEd1YXJkLUJPVFwiLFxuICAgIHNlbGVjdEFyZWE6IFwiU2VsZWNjaW9uYXIgXHUwMEMxcmVhXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyYXIgXHUwMEMxcmVhXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIkluaWNpYXIgUHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiRGV0ZW5lciBQcm90ZWNjaVx1MDBGM25cIixcbiAgICB1cHBlckxlZnQ6IFwiRXNxdWluYSBTdXBlcmlvciBJenF1aWVyZGFcIixcbiAgICBsb3dlclJpZ2h0OiBcIkVzcXVpbmEgSW5mZXJpb3IgRGVyZWNoYVwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQXHUwMEVEeGVsZXMgUHJvdGVnaWRvc1wiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJDYW1iaW9zIERldGVjdGFkb3NcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJQXHUwMEVEeGVsZXMgUmVwYXJhZG9zXCIsXG4gICAgY2hhcmdlczogXCJDYXJnYXNcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFc3BlcmFuZG8gaW5pY2lhbGl6YWNpXHUwMEYzbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBWZXJpZmljYW5kbyBjb2xvcmVzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgTm8gc2UgZW5jb250cmFyb24gY29sb3Jlcy4gQWJyZSBsYSBwYWxldGEgZGUgY29sb3JlcyBlbiBlbCBzaXRpby5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb2xvcmVzIGRpc3BvbmlibGVzIGVuY29udHJhZG9zXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBpbmljaWFsaXphZG8gY29ycmVjdGFtZW50ZVwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgRXJyb3IgaW5pY2lhbGl6YW5kbyBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBDb29yZGVuYWRhcyBpbnZcdTAwRTFsaWRhc1wiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBFbCBcdTAwRTFyZWEgZGViZSB0ZW5lciBlc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYSBtZW5vciBxdWUgaW5mZXJpb3IgZGVyZWNoYVwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHUwMEMxcmVhIGRlbWFzaWFkbyBncmFuZGU6IHtzaXplfSBwXHUwMEVEeGVsZXMgKG1cdTAwRTF4aW1vOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJhbmRvIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM24uLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDBDMXJlYSBjYXB0dXJhZGE6IHtjb3VudH0gcFx1MDBFRHhlbGVzIGJham8gcHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBjYXB0dXJhbmRvIFx1MDBFMXJlYToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgUHJpbWVybyBjYXB0dXJhIHVuIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjY2lcdTAwRjNuIGluaWNpYWRhIC0gbW9uaXRvcmVhbmRvIFx1MDBFMXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gZGV0ZW5pZGFcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFx1MDBDMXJlYSBwcm90ZWdpZGEgLSBzaW4gY2FtYmlvcyBkZXRlY3RhZG9zXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNhbWJpb3MgZGV0ZWN0YWRvcyBlbiBlbCBcdTAwRTFyZWEgcHJvdGVnaWRhXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSZXBhcmFuZG8ge2NvdW50fSBwXHUwMEVEeGVsZXMgYWx0ZXJhZG9zLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBSZXBhcmFkb3Mge2NvdW50fSBwXHUwMEVEeGVsZXMgY29ycmVjdGFtZW50ZVwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJvciByZXBhcmFuZG8gcFx1MDBFRHhlbGVzOiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBTaW4gY2FyZ2FzIHN1ZmljaWVudGVzIHBhcmEgcmVwYXJhciBjYW1iaW9zXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBWZXJpZmljYW5kbyBjYW1iaW9zIGVuIFx1MDBFMXJlYSBwcm90ZWdpZGEuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBFcnJvciB2ZXJpZmljYW5kbyBjYW1iaW9zOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIEd1YXJkaVx1MDBFMW4gYWN0aXZvIC0gXHUwMEUxcmVhIGJham8gcHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgbGFzdENoZWNrOiBcIlx1MDBEQWx0aW1hIHZlcmlmaWNhY2lcdTAwRjNuOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiUHJcdTAwRjN4aW1hIHZlcmlmaWNhY2lcdTAwRjNuIGVuOiB7dGltZX1zXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pY2lhbGl6YW5kbyBhdXRvbVx1MDBFMXRpY2FtZW50ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaWNpYWRvIGF1dG9tXHUwMEUxdGljYW1lbnRlXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gaW5pY2lhciBhdXRvbVx1MDBFMXRpY2FtZW50ZS4gVXNhIGVsIGJvdFx1MDBGM24gbWFudWFsLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pY2lvIG1hbnVhbCByZXF1ZXJpZG9cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFBhbGV0YSBkZSBjb2xvcmVzIGRldGVjdGFkYVwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgQnVzY2FuZG8gcGFsZXRhIGRlIGNvbG9yZXMuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBIYWNpZW5kbyBjbGljIGVuIGVsIGJvdFx1MDBGM24gUGFpbnQuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG9cIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gbGEgZXNxdWluYSBTVVBFUklPUiBJWlFVSUVSREEgZGVsIFx1MDBFMXJlYSBhIHByb3RlZ2VyXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgQWhvcmEgcGludGEgdW4gcFx1MDBFRHhlbCBlbiBsYSBlc3F1aW5hIElORkVSSU9SIERFUkVDSEEgZGVsIFx1MDBFMXJlYVwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBzZWxlY2NpXHUwMEYzbiBkZSBlc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYS4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBFc3BlcmFuZG8gc2VsZWNjaVx1MDBGM24gZGUgZXNxdWluYSBpbmZlcmlvciBkZXJlY2hhLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IEVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhIGNhcHR1cmFkYTogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgRXNxdWluYSBpbmZlcmlvciBkZXJlY2hhIGNhcHR1cmFkYTogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaVx1MDBGM25cIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZW4gc2VsZWNjaVx1MDBGM24sIGludFx1MDBFOW50YWxvIGRlIG51ZXZvXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIkRlc2NhcmdhciBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkxpbXBpYXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJDZXJyYXJcIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCBlbiA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU2VsZWN0aW9uJyxcbiAgICB1c2VyOiAnVXNlcicsXG4gICAgY2hhcmdlczogJ0NoYXJnZXMnLFxuICAgIGJhY2tlbmQ6ICdCYWNrZW5kJyxcbiAgICBkYXRhYmFzZTogJ0RhdGFiYXNlJyxcbiAgICB1cHRpbWU6ICdVcHRpbWUnLFxuICAgIGNsb3NlOiAnQ2xvc2UnLFxuICAgIGxhdW5jaDogJ0xhdW5jaCcsXG4gICAgbG9hZGluZzogJ0xvYWRpbmdcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0V4ZWN1dGluZ1x1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdEb3dubG9hZGluZyBzY3JpcHRcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ0Nob29zZSBhIGJvdCBhbmQgcHJlc3MgTGF1bmNoJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnUmVhZHkgdG8gbGF1bmNoJyxcbiAgICBsb2FkRXJyb3I6ICdMb2FkIGVycm9yJyxcbiAgICBsb2FkRXJyb3JNc2c6ICdDb3VsZCBub3QgbG9hZCB0aGUgc2VsZWN0ZWQgYm90LiBDaGVjayB5b3VyIGNvbm5lY3Rpb24gb3IgdHJ5IGFnYWluLicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgQ2hlY2tpbmcuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBPbmxpbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgT2ZmbGluZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycm9yJyxcbiAgICB1bmtub3duOiAnLScsXG4gICAgbG9nV2luZG93OiAnTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdMb2dzIC0ge2JvdE5hbWV9JyxcbiAgICBkb3dubG9hZExvZ3M6ICdEb3dubG9hZCBMb2dzJyxcbiAgICBjbGVhckxvZ3M6ICdDbGVhciBMb2dzJyxcbiAgICBjbG9zZUxvZ3M6ICdDbG9zZSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGl6ZSBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlVwbG9hZCBJbWFnZVwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlJlc2l6ZSBJbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjdCBQb3NpdGlvblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiU3RhcnQgUGFpbnRpbmdcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiU3RvcCBQYWludGluZ1wiLFxuICAgIHNhdmVQcm9ncmVzczogXCJTYXZlIFByb2dyZXNzXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIkxvYWQgUHJvZ3Jlc3NcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgQ2hlY2tpbmcgYXZhaWxhYmxlIGNvbG9ycy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIE9wZW4gdGhlIGNvbG9yIHBhbGV0dGUgb24gdGhlIHNpdGUgYW5kIHRyeSBhZ2FpbiFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgRm91bmQge2NvdW50fSBhdmFpbGFibGUgY29sb3JzXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBMb2FkaW5nIGltYWdlLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IEltYWdlIGxvYWRlZCB3aXRoIHtjb3VudH0gdmFsaWQgcGl4ZWxzXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgRXJyb3IgbG9hZGluZyBpbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiUGFpbnQgdGhlIGZpcnN0IHBpeGVsIGF0IHRoZSBsb2NhdGlvbiB3aGVyZSB5b3Ugd2FudCB0aGUgYXJ0IHRvIHN0YXJ0IVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgeW91IHRvIHBhaW50IHRoZSByZWZlcmVuY2UgcGl4ZWwuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgUG9zaXRpb24gc2V0IHN1Y2Nlc3NmdWxseSFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpbWVvdXQgZm9yIHBvc2l0aW9uIHNlbGVjdGlvblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2l0aW9uIGRldGVjdGVkLCBwcm9jZXNzaW5nLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZGV0ZWN0aW5nIHBvc2l0aW9uLCBwbGVhc2UgdHJ5IGFnYWluXCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggU3RhcnRpbmcgcGFpbnRpbmcuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9ncmVzczoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBObyBjaGFyZ2VzLiBXYWl0aW5nIHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUGFpbnRpbmcgc3RvcHBlZCBieSB1c2VyXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgUGFpbnRpbmcgY29tcGxldGVkISB7Y291bnR9IHBpeGVscyBwYWludGVkLlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIEVycm9yIGR1cmluZyBwYWludGluZ1wiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIExvYWQgYW4gaW1hZ2UgYW5kIHNlbGVjdCBhIHBvc2l0aW9uIGZpcnN0XCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3Jlc3NcIixcbiAgICB1c2VyTmFtZTogXCJVc2VyXCIsXG4gICAgcGl4ZWxzOiBcIlBpeGVsc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiRXN0aW1hdGVkIHRpbWVcIixcbiAgICBpbml0TWVzc2FnZTogXCJDbGljayAnSW5pdGlhbGl6ZSBBdXRvLUJPVCcgdG8gYmVnaW5cIixcbiAgICB3YWl0aW5nSW5pdDogXCJXYWl0aW5nIGZvciBpbml0aWFsaXphdGlvbi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IEltYWdlIHJlc2l6ZWQgdG8ge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQYWludGluZyBwYXVzZWQgYXQgcG9zaXRpb24gWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMgcGVyIGJhdGNoXCIsXG4gICAgYmF0Y2hTaXplOiBcIkJhdGNoIHNpemVcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIk5leHQgYmF0Y2ggaW5cIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlVzZSBhbGwgYXZhaWxhYmxlIGNoYXJnZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJTaG93IG92ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIk1heCBjaGFyZ2VzIHBlciBiYXRjaFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRpbWUgcmVtYWluaW5nXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBXYWl0aW5nIHt0aW1lfSB0byBjb250aW51ZS4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyZXNzIHNhdmVkIGFzIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3Jlc3MgbG9hZGVkOiB7cGFpbnRlZH0ve3RvdGFsfSBwaXhlbHMgcGFpbnRlZFwiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBFcnJvciBsb2FkaW5nIHByb2dyZXNzOiB7ZXJyb3J9XCIsXG5cbiAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgRXJyb3Igc2F2aW5nIHByb2dyZXNzOiB7ZXJyb3J9XCIsXG5cbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIkRvIHlvdSB3YW50IHRvIHNhdmUgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgYmVmb3JlIHN0b3BwaW5nP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlNhdmUgUHJvZ3Jlc3NcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiRGlzY2FyZFwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxcIixcbiAgICBtaW5pbWl6ZTogXCJNaW5pbWl6ZVwiLFxuICAgIHdpZHRoOiBcIldpZHRoXCIsXG4gICAgaGVpZ2h0OiBcIkhlaWdodFwiLCBcbiAgICBrZWVwQXNwZWN0OiBcIktlZXAgYXNwZWN0IHJhdGlvXCIsXG4gICAgYXBwbHk6IFwiQXBwbHlcIixcbiAgb3ZlcmxheU9uOiBcIk92ZXJsYXk6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheTogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzcyBjb21wbGV0ZWQ6IHtwYWludGVkfSBwaXhlbHMgcGFpbnRlZCB8IFByb2dyZXNzOiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2UgcmVnZW5lcmF0aW9uOiB7Y3VycmVudH0ve25lZWRlZH0gLSBUaW1lOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgV2FpdGluZyBmb3IgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUmVtYWluaW5nOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBBdXRvLWluaXRpYWxpemluZy4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGF1dG8tc3RhcnRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgQ291bGQgbm90IGF1dG8tc3RhcnQuIFVzZSBtYW51YWwgYnV0dG9uLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggQ29sb3IgcGFsZXR0ZSBkZXRlY3RlZFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgU2VhcmNoaW5nIGZvciBjb2xvciBwYWxldHRlLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpY2tpbmcgUGFpbnQgYnV0dG9uLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgUGFpbnQgYnV0dG9uIG5vdCBmb3VuZFwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgTWFudWFsIGluaXRpYWxpemF0aW9uIHJlcXVpcmVkXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBSZXRyeSB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBpbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycm9yIGluIGF0dGVtcHQge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIHJldHJ5aW5nIGluIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIEZhaWxlZCBhZnRlciB7bWF4QXR0ZW1wdHN9IGF0dGVtcHRzLiBDb250aW51aW5nIHdpdGggbmV4dCBiYXRjaC4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgTmV0d29yayBlcnJvci4gUmV0cnlpbmcuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgU2VydmVyIGVycm9yLiBSZXRyeWluZy4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgU2VydmVyIHRpbWVvdXQsIHJldHJ5aW5nLi4uXCIsXG4gICAgLy8gdjIuMCAtIFByb3RlY3Rpb24gYW5kIFBhdHRlcm5zXG4gICAgcHJvdGVjdGlvbkVuYWJsZWQ6IFwiUHJvdGVjdGlvbiBlbmFibGVkXCIsXG4gICAgcHJvdGVjdGlvbkRpc2FibGVkOiBcIlByb3RlY3Rpb24gZGlzYWJsZWRcIixcbiAgICBwYWludFBhdHRlcm46IFwiUGFpbnQgcGF0dGVyblwiLFxuICAgIHBhdHRlcm5MaW5lYXJTdGFydDogXCJMaW5lYXIgKFN0YXJ0KVwiLFxuICAgIHBhdHRlcm5MaW5lYXJFbmQ6IFwiTGluZWFyIChFbmQpXCIsXG4gICAgcGF0dGVyblJhbmRvbTogXCJSYW5kb21cIixcbiAgICBwYXR0ZXJuQ2VudGVyT3V0OiBcIkNlbnRlciBvdXR3YXJkXCIsXG4gICAgcGF0dGVybkNvcm5lcnNGaXJzdDogXCJDb3JuZXJzIGZpcnN0XCIsXG4gICAgcGF0dGVyblNwaXJhbDogXCJTcGlyYWxcIixcbiAgICBzb2xpZDogXCJTb2xpZFwiLFxuICAgIHN0cmlwZXM6IFwiU3RyaXBlc1wiLFxuICAgIGNoZWNrZXJib2FyZDogXCJDaGVja2VyYm9hcmRcIixcbiAgICBncmFkaWVudDogXCJHcmFkaWVudFwiLFxuICAgIGRvdHM6IFwiRG90c1wiLFxuICAgIHdhdmVzOiBcIldhdmVzXCIsXG4gICAgc3BpcmFsOiBcIlNwaXJhbFwiLFxuICAgIG1vc2FpYzogXCJNb3NhaWNcIixcbiAgICBicmlja3M6IFwiQnJpY2tzXCIsXG4gICAgemlnemFnOiBcIlppZ3phZ1wiLFxuICAgIHByb3RlY3RpbmdEcmF3aW5nOiBcIlByb3RlY3RpbmcgZHJhd2luZy4uLlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBjaGFuZ2VzIGRldGVjdGVkIGluIGRyYXdpbmdcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERDI3IFJlcGFpcmluZyB7Y291bnR9IGFsdGVyZWQgcGl4ZWxzLi4uXCIsXG4gICAgcmVwYWlyQ29tcGxldGVkOiBcIlx1MjcwNSBSZXBhaXIgY29tcGxldGVkOiB7Y291bnR9IHBpeGVsc1wiLFxuICAgIG5vQ2hhcmdlc0ZvclJlcGFpcjogXCJcdTI2QTEgTm8gY2hhcmdlcyBmb3IgcmVwYWlyLCB3YWl0aW5nLi4uXCIsXG4gICAgcHJvdGVjdGlvblByaW9yaXR5OiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWN0aW9uIHByaW9yaXR5IGFjdGl2YXRlZFwiLFxuICAgIHBhdHRlcm5BcHBsaWVkOiBcIlBhdHRlcm4gYXBwbGllZFwiLFxuICAgIGN1c3RvbVBhdHRlcm46IFwiQ3VzdG9tIHBhdHRlcm5cIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiRG93bmxvYWQgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJDbGVhciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkNsb3NlXCJcbiAgfSxcblxuICAvLyBGYXJtIG1vZHVsZSAodG8gYmUgaW1wbGVtZW50ZWQpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgRmFybSBCb3RcIixcbiAgICBzdGFydDogXCJTdGFydFwiLFxuICAgIHN0b3A6IFwiU3RvcFwiLFxuICAgIHN0b3BwZWQ6IFwiQm90IHN0b3BwZWRcIixcbiAgICBjYWxpYnJhdGU6IFwiQ2FsaWJyYXRlXCIsXG4gICAgcGFpbnRPbmNlOiBcIk9uY2VcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJDaGVja2luZyBzdGF0dXMuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYXRpb25cIixcbiAgICBkZWxheTogXCJEZWxheSAobXMpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzL2JhdGNoXCIsXG4gICAgbWluQ2hhcmdlczogXCJNaW4gY2hhcmdlc1wiLFxuICAgIGNvbG9yTW9kZTogXCJDb2xvciBtb2RlXCIsXG4gICAgcmFuZG9tOiBcIlJhbmRvbVwiLFxuICAgIGZpeGVkOiBcIkZpeGVkXCIsXG4gICAgcmFuZ2U6IFwiUmFuZ2VcIixcbiAgICBmaXhlZENvbG9yOiBcIkZpeGVkIGNvbG9yXCIsXG4gICAgYWR2YW5jZWQ6IFwiQWR2YW5jZWRcIixcbiAgICB0aWxlWDogXCJUaWxlIFhcIixcbiAgICB0aWxlWTogXCJUaWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIkN1c3RvbSBwYWxldHRlXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZS5nOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiQ2FwdHVyZVwiLFxuICAgIHBhaW50ZWQ6IFwiUGFpbnRlZFwiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIHJldHJpZXM6IFwiUmV0cmllc1wiLFxuICAgIHRpbGU6IFwiVGlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYXRpb24gc2F2ZWRcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiQ29uZmlndXJhdGlvbiBsb2FkZWRcIixcbiAgICBjb25maWdSZXNldDogXCJDb25maWd1cmF0aW9uIHJlc2V0XCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQYWludCBhIHBpeGVsIG1hbnVhbGx5IHRvIGNhcHR1cmUgY29vcmRpbmF0ZXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgT25saW5lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBPZmZsaW5lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiU3RhcnRpbmcgYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiU3RvcHBpbmcgYm90Li4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiQ2FsaWJyYXRpbmcuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJBdXRvLUZhcm0gaXMgYWxyZWFkeSBydW5uaW5nLlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiQXV0by1JbWFnZSBpcyBydW5uaW5nLiBDbG9zZSBpdCBiZWZvcmUgc3RhcnRpbmcgQXV0by1GYXJtLlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjdCBBcmVhXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGFpbnQgYSBwaXhlbCBpbiBhbiBFTVBUWSBhcmVhIG9mIHRoZSBtYXAgdG8gc2V0IHRoZSBmYXJtaW5nIHpvbmVcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHlvdSB0byBwYWludCB0aGUgcmVmZXJlbmNlIHBpeGVsLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IEFyZWEgc2V0ISBSYWRpdXM6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaW1lb3V0IGZvciBhcmVhIHNlbGVjdGlvblwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgU2VsZWN0IGFuIGFyZWEgZmlyc3QgdXNpbmcgJ1NlbGVjdCBBcmVhJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiRmFybSByYWRpdXNcIixcbiAgICBwb3NpdGlvbkluZm86IFwiQ3VycmVudCBhcmVhXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBGYXJtaW5nIGluIHtyYWRpdXN9cHggcmFkaXVzIGZyb20gKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBJTVBPUlRBTlQ6IFNlbGVjdCBhbiBFTVBUWSBhcmVhIHRvIGF2b2lkIGNvbmZsaWN0c1wiLFxuICAgIG5vUG9zaXRpb246IFwiTm8gYXJlYVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmU6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU2VsZWN0IGFuIGFyZWEgZmlyc3QuIFBhaW50IGEgcGl4ZWwgb24gdGhlIG1hcCB0byBzZXQgdGhlIGZhcm1pbmcgem9uZVwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJEb3dubG9hZCBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkNsZWFyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiQ2xvc2VcIlxuICB9LFxuXG4gIC8vIENvbW1vbi9TaGFyZWRcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlllc1wiLFxuICAgIG5vOiBcIk5vXCIsXG4gICAgb2s6IFwiT0tcIixcbiAgICBjYW5jZWw6IFwiQ2FuY2VsXCIsXG4gICAgY2xvc2U6IFwiQ2xvc2VcIixcbiAgICBzYXZlOiBcIlNhdmVcIixcbiAgICBsb2FkOiBcIkxvYWRcIixcbiAgICBkZWxldGU6IFwiRGVsZXRlXCIsXG4gICAgZWRpdDogXCJFZGl0XCIsXG4gICAgc3RhcnQ6IFwiU3RhcnRcIixcbiAgICBzdG9wOiBcIlN0b3BcIixcbiAgICBwYXVzZTogXCJQYXVzZVwiLFxuICAgIHJlc3VtZTogXCJSZXN1bWVcIixcbiAgICByZXNldDogXCJSZXNldFwiLFxuICAgIHNldHRpbmdzOiBcIlNldHRpbmdzXCIsXG4gICAgaGVscDogXCJIZWxwXCIsXG4gICAgYWJvdXQ6IFwiQWJvdXRcIixcbiAgICBsYW5ndWFnZTogXCJMYW5ndWFnZVwiLFxuICAgIGxvYWRpbmc6IFwiTG9hZGluZy4uLlwiLFxuICAgIGVycm9yOiBcIkVycm9yXCIsXG4gICAgc3VjY2VzczogXCJTdWNjZXNzXCIsXG4gICAgd2FybmluZzogXCJXYXJuaW5nXCIsXG4gICAgaW5mbzogXCJJbmZvcm1hdGlvblwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJMYW5ndWFnZSBjaGFuZ2VkIHRvIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIEd1YXJkIE1vZHVsZVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBBdXRvLUd1YXJkXCIsXG4gICAgaW5pdEJvdDogXCJJbml0aWFsaXplIEd1YXJkLUJPVFwiLFxuICAgIHNlbGVjdEFyZWE6IFwiU2VsZWN0IEFyZWFcIixcbiAgICBjYXB0dXJlQXJlYTogXCJDYXB0dXJlIEFyZWFcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiU3RhcnQgUHJvdGVjdGlvblwiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIlN0b3AgUHJvdGVjdGlvblwiLFxuICAgIHVwcGVyTGVmdDogXCJVcHBlciBMZWZ0IENvcm5lclwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiTG93ZXIgUmlnaHQgQ29ybmVyXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlByb3RlY3RlZCBQaXhlbHNcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiRGV0ZWN0ZWQgQ2hhbmdlc1wiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlJlcGFpcmVkIFBpeGVsc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIldhaXRpbmcgZm9yIGluaXRpYWxpemF0aW9uLi4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IENoZWNraW5nIGF2YWlsYWJsZSBjb2xvcnMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBObyBjb2xvcnMgZm91bmQuIE9wZW4gdGhlIGNvbG9yIHBhbGV0dGUgb24gdGhlIHNpdGUuXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IEZvdW5kIHtjb3VudH0gYXZhaWxhYmxlIGNvbG9yc1wiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBFcnJvciBpbml0aWFsaXppbmcgR3VhcmQtQk9UXCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgSW52YWxpZCBjb29yZGluYXRlc1wiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBBcmVhIG11c3QgaGF2ZSB1cHBlciBsZWZ0IGNvcm5lciBsZXNzIHRoYW4gbG93ZXIgcmlnaHQgY29ybmVyXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBBcmVhIHRvbyBsYXJnZToge3NpemV9IHBpeGVscyAobWF4aW11bToge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggQ2FwdHVyaW5nIHByb3RlY3Rpb24gYXJlYS4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgQXJlYSBjYXB0dXJlZDoge2NvdW50fSBwaXhlbHMgdW5kZXIgcHJvdGVjdGlvblwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgRXJyb3IgY2FwdHVyaW5nIGFyZWE6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIEZpcnN0IGNhcHR1cmUgYSBwcm90ZWN0aW9uIGFyZWFcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjdGlvbiBzdGFydGVkIC0gbW9uaXRvcmluZyBhcmVhXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFByb3RlY3Rpb24gc3RvcHBlZFwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgUHJvdGVjdGVkIGFyZWEgLSBubyBjaGFuZ2VzIGRldGVjdGVkXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNoYW5nZXMgZGV0ZWN0ZWQgaW4gcHJvdGVjdGVkIGFyZWFcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFJlcGFpcmluZyB7Y291bnR9IGFsdGVyZWQgcGl4ZWxzLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBTdWNjZXNzZnVsbHkgcmVwYWlyZWQge2NvdW50fSBwaXhlbHNcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgRXJyb3IgcmVwYWlyaW5nIHBpeGVsczoge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgSW5zdWZmaWNpZW50IGNoYXJnZXMgdG8gcmVwYWlyIGNoYW5nZXNcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIENoZWNraW5nIGNoYW5nZXMgaW4gcHJvdGVjdGVkIGFyZWEuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBFcnJvciBjaGVja2luZyBjaGFuZ2VzOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIEd1YXJkaWFuIGFjdGl2ZSAtIGFyZWEgdW5kZXIgcHJvdGVjdGlvblwiLFxuICAgIGxhc3RDaGVjazogXCJMYXN0IGNoZWNrOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiTmV4dCBjaGVjayBpbjoge3RpbWV9c1wiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEF1dG8taW5pdGlhbGl6aW5nLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgYXV0by1zdGFydGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBDb3VsZCBub3QgYXV0by1zdGFydC4gVXNlIG1hbnVhbCBidXR0b24uXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBNYW51YWwgaW5pdGlhbGl6YXRpb24gcmVxdWlyZWRcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IENvbG9yIHBhbGV0dGUgZGV0ZWN0ZWRcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFNlYXJjaGluZyBmb3IgY29sb3IgcGFsZXR0ZS4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IENsaWNraW5nIFBhaW50IGJ1dHRvbi4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFBhaW50IGJ1dHRvbiBub3QgZm91bmRcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFBhaW50IGEgcGl4ZWwgYXQgdGhlIFVQUEVSIExFRlQgY29ybmVyIG9mIHRoZSBhcmVhIHRvIHByb3RlY3RcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBOb3cgcGFpbnQgYSBwaXhlbCBhdCB0aGUgTE9XRVIgUklHSFQgY29ybmVyIG9mIHRoZSBhcmVhXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgdXBwZXIgbGVmdCBjb3JuZXIgc2VsZWN0aW9uLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIGxvd2VyIHJpZ2h0IGNvcm5lciBzZWxlY3Rpb24uLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgVXBwZXIgbGVmdCBjb3JuZXIgY2FwdHVyZWQ6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IExvd2VyIHJpZ2h0IGNvcm5lciBjYXB0dXJlZDogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFNlbGVjdGlvbiB0aW1lb3V0XCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIFNlbGVjdGlvbiBlcnJvciwgcGxlYXNlIHRyeSBhZ2FpblwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJEb3dubG9hZCBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkNsZWFyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiQ2xvc2VcIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCBmciA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU1x1MDBFOWxlY3Rpb24nLFxuICAgIHVzZXI6ICdVdGlsaXNhdGV1cicsXG4gICAgY2hhcmdlczogJ0NoYXJnZXMnLFxuICAgIGJhY2tlbmQ6ICdCYWNrZW5kJyxcbiAgICBkYXRhYmFzZTogJ0Jhc2UgZGUgZG9ublx1MDBFOWVzJyxcbiAgICB1cHRpbWU6ICdUZW1wcyBhY3RpZicsXG4gICAgY2xvc2U6ICdGZXJtZXInLFxuICAgIGxhdW5jaDogJ0xhbmNlcicsXG4gICAgbG9hZGluZzogJ0NoYXJnZW1lbnRcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0V4XHUwMEU5Y3V0aW9uXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1RcdTAwRTlsXHUwMEU5Y2hhcmdlbWVudCBkdSBzY3JpcHRcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ0Nob2lzaXNzZXogdW4gYm90IGV0IGFwcHV5ZXogc3VyIExhbmNlcicsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1ByXHUwMEVBdCBcdTAwRTAgbGFuY2VyJyxcbiAgICBsb2FkRXJyb3I6ICdFcnJldXIgZGUgY2hhcmdlbWVudCcsXG4gICAgbG9hZEVycm9yTXNnOiAnSW1wb3NzaWJsZSBkZSBjaGFyZ2VyIGxlIGJvdCBzXHUwMEU5bGVjdGlvbm5cdTAwRTkuIFZcdTAwRTlyaWZpZXogdm90cmUgY29ubmV4aW9uIG91IHJcdTAwRTllc3NheWV6LicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgVlx1MDBFOXJpZmljYXRpb24uLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBFbiBsaWduZScsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBIb3JzIGxpZ25lJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBPSycsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgRXJyZXVyJyxcbiAgICB1bmtub3duOiAnLScsXG4gICAgbG9nV2luZG93OiAnTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdMb2dzIC0ge2JvdE5hbWV9JyxcbiAgICBkb3dubG9hZExvZ3M6ICdUXHUwMEU5bFx1MDBFOWNoYXJnZXIgTG9ncycsXG4gICAgY2xlYXJMb2dzOiAnRWZmYWNlciBMb2dzJyxcbiAgICBjbG9zZUxvZ3M6ICdGZXJtZXInXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpc2VyIEF1dG8tQk9UXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiVFx1MDBFOWxcdTAwRTljaGFyZ2VyIEltYWdlXCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiUmVkaW1lbnNpb25uZXIgSW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTXHUwMEU5bGVjdGlvbm5lciBQb3NpdGlvblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiQ29tbWVuY2VyIFBlaW50dXJlXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIkFyclx1MDBFQXRlciBQZWludHVyZVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJTYXV2ZWdhcmRlciBQcm9nclx1MDBFOHNcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiQ2hhcmdlciBQcm9nclx1MDBFOHNcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgVlx1MDBFOXJpZmljYXRpb24gZGVzIGNvdWxldXJzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgT3V2cmV6IGxhIHBhbGV0dGUgZGUgY291bGV1cnMgc3VyIGxlIHNpdGUgZXQgclx1MDBFOWVzc2F5ZXohXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IHtjb3VudH0gY291bGV1cnMgZGlzcG9uaWJsZXMgdHJvdXZcdTAwRTllc1wiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgQ2hhcmdlbWVudCBkZSBsJ2ltYWdlLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IEltYWdlIGNoYXJnXHUwMEU5ZSBhdmVjIHtjb3VudH0gcGl4ZWxzIHZhbGlkZXNcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkdSBjaGFyZ2VtZW50IGRlIGwnaW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlBlaWduZXogbGUgcHJlbWllciBwaXhlbCBcdTAwRTAgbCdlbXBsYWNlbWVudCBvXHUwMEY5IHZvdXMgdm91bGV6IHF1ZSBsJ2FydCBjb21tZW5jZSFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVuIGF0dGVudGUgcXVlIHZvdXMgcGVpZ25pZXogbGUgcGl4ZWwgZGUgclx1MDBFOWZcdTAwRTlyZW5jZS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBQb3NpdGlvbiBkXHUwMEU5ZmluaWUgYXZlYyBzdWNjXHUwMEU4cyFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZFx1MDBFOXBhc3NcdTAwRTkgcG91ciBsYSBzXHUwMEU5bGVjdGlvbiBkZSBwb3NpdGlvblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2l0aW9uIGRcdTAwRTl0ZWN0XHUwMEU5ZSwgdHJhaXRlbWVudC4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBkXHUwMEU5dGVjdGFudCBsYSBwb3NpdGlvbiwgZXNzYXlleiBcdTAwRTAgbm91dmVhdVwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IERcdTAwRTlidXQgZGUgbGEgcGVpbnR1cmUuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9nclx1MDBFOHM6IHtwYWludGVkfS97dG90YWx9IHBpeGVscy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgQXVjdW5lIGNoYXJnZS4gQXR0ZW5kcmUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQZWludHVyZSBhcnJcdTAwRUF0XHUwMEU5ZSBwYXIgbCd1dGlsaXNhdGV1clwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFBlaW50dXJlIHRlcm1pblx1MDBFOWUhIHtjb3VudH0gcGl4ZWxzIHBlaW50cy5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJldXIgcGVuZGFudCBsYSBwZWludHVyZVwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIENoYXJnZXogdW5lIGltYWdlIGV0IHNcdTAwRTlsZWN0aW9ubmV6IHVuZSBwb3NpdGlvbiBkJ2Fib3JkXCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3JcdTAwRThzXCIsXG4gICAgdXNlck5hbWU6IFwiVXNhZ2VyXCIsXG4gICAgcGl4ZWxzOiBcIlBpeGVsc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiVGVtcHMgZXN0aW1cdTAwRTlcIixcbiAgICBpbml0TWVzc2FnZTogXCJDbGlxdWV6IHN1ciAnSW5pdGlhbGlzZXIgQXV0by1CT1QnIHBvdXIgY29tbWVuY2VyXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiRW4gYXR0ZW50ZSBkJ2luaXRpYWxpc2F0aW9uLi4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgSW1hZ2UgcmVkaW1lbnNpb25uXHUwMEU5ZSBcdTAwRTAge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQZWludHVyZSBtaXNlIGVuIHBhdXNlIFx1MDBFMCBsYSBwb3NpdGlvbiBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBpeGVscyBwYXIgbG90XCIsXG4gICAgYmF0Y2hTaXplOiBcIlRhaWxsZSBkdSBsb3RcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlByb2NoYWluIGxvdCBkYW5zXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVdGlsaXNlciB0b3V0ZXMgbGVzIGNoYXJnZXMgZGlzcG9uaWJsZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJBZmZpY2hlciBsJ292ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIkNoYXJnZXMgbWF4IHBhciBsb3RcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgRW4gYXR0ZW50ZSBkZSBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRlbXBzIHJlc3RhbnRcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIEF0dGVuZHJlIHt0aW1lfSBwb3VyIGNvbnRpbnVlci4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyXHUwMEU4cyBzYXV2ZWdhcmRcdTAwRTkgc291cyB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFByb2dyXHUwMEU4cyBjaGFyZ1x1MDBFOToge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzIHBlaW50c1wiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkdSBjaGFyZ2VtZW50IGR1IHByb2dyXHUwMEU4czoge2Vycm9yfVwiLFxuIFxuICAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgc2F1dmVnYXJkZSBkdSBwcm9nclx1MDBFOHM6IHtlcnJvcn1cIixcblxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiVm91bGV6LXZvdXMgc2F1dmVnYXJkZXIgbGUgcHJvZ3JcdTAwRThzIGFjdHVlbCBhdmFudCBkJ2Fyclx1MDBFQXRlcj9cIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJTYXV2ZWdhcmRlciBQcm9nclx1MDBFOHNcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiQWJhbmRvbm5lclwiLFxuICAgIGNhbmNlbDogXCJBbm51bGVyXCIsXG4gICAgbWluaW1pemU6IFwiTWluaW1pc2VyXCIsXG4gICAgd2lkdGg6IFwiTGFyZ2V1clwiLFxuICAgIGhlaWdodDogXCJIYXV0ZXVyXCIsIFxuICAgIGtlZXBBc3BlY3Q6IFwiR2FyZGVyIGxlcyBwcm9wb3J0aW9uc1wiLFxuICAgIGFwcGx5OiBcIkFwcGxpcXVlclwiLFxuICBvdmVybGF5T246IFwiT3ZlcmxheSA6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheSA6IE9GRlwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFBhc3NhZ2UgdGVybWluXHUwMEU5OiB7cGFpbnRlZH0gcGl4ZWxzIHBlaW50cyB8IFByb2dyXHUwMEU4czoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgQXR0ZW50ZSBkZSByXHUwMEU5Z1x1MDBFOW5cdTAwRTlyYXRpb24gZGVzIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFRlbXBzOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgQXR0ZW50ZSBkZXMgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUmVzdGFudDoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pdGlhbGlzYXRpb24gYXV0b21hdGlxdWUuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEJvdCBkXHUwMEU5bWFyclx1MDBFOSBhdXRvbWF0aXF1ZW1lbnRcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgSW1wb3NzaWJsZSBkZSBkXHUwMEU5bWFycmVyIGF1dG9tYXRpcXVlbWVudC4gVXRpbGlzZXogbGUgYm91dG9uIG1hbnVlbC5cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFBhbGV0dGUgZGUgY291bGV1cnMgZFx1MDBFOXRlY3RcdTAwRTllXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBSZWNoZXJjaGUgZGUgbGEgcGFsZXR0ZSBkZSBjb3VsZXVycy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IENsaWMgc3VyIGxlIGJvdXRvbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdXRvbiBQYWludCBpbnRyb3V2YWJsZVwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pdGlhbGlzYXRpb24gbWFudWVsbGUgcmVxdWlzZVwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgVGVudGF0aXZlIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGRhbnMge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBFcnJldXIgZGFucyB0ZW50YXRpdmUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIG5vdXZlbCBlc3NhaSBkYW5zIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1MDBDOWNoZWMgYXByXHUwMEU4cyB7bWF4QXR0ZW1wdHN9IHRlbnRhdGl2ZXMuIENvbnRpbnVhbnQgYXZlYyBsZSBsb3Qgc3VpdmFudC4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgRXJyZXVyIHJcdTAwRTlzZWF1LiBOb3V2ZWwgZXNzYWkuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgRXJyZXVyIHNlcnZldXIuIE5vdXZlbCBlc3NhaS4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgRFx1MDBFOWxhaSBkXHUyMDE5YXR0ZW50ZSBkdSBzZXJ2ZXVyLCBub3V2ZWxsZSB0ZW50YXRpdmUuLi5cIixcbiAgICAvLyB2Mi4wIC0gUHJvdGVjdGlvbiBldCBtb3RpZnNcbiAgICBwcm90ZWN0aW9uRW5hYmxlZDogXCJQcm90ZWN0aW9uIGFjdGl2XHUwMEU5ZVwiLFxuICAgIHByb3RlY3Rpb25EaXNhYmxlZDogXCJQcm90ZWN0aW9uIGRcdTAwRTlzYWN0aXZcdTAwRTllXCIsXG4gICAgcGFpbnRQYXR0ZXJuOiBcIk1vdGlmIGRlIHBlaW50dXJlXCIsXG4gICAgcGF0dGVybkxpbmVhclN0YXJ0OiBcIkxpblx1MDBFOWFpcmUgKERcdTAwRTlidXQpXCIsXG4gICAgcGF0dGVybkxpbmVhckVuZDogXCJMaW5cdTAwRTlhaXJlIChGaW4pXCIsXG4gICAgcGF0dGVyblJhbmRvbTogXCJBbFx1MDBFOWF0b2lyZVwiLFxuICAgIHBhdHRlcm5DZW50ZXJPdXQ6IFwiQ2VudHJlIHZlcnMgbFx1MjAxOWV4dFx1MDBFOXJpZXVyXCIsXG4gICAgcGF0dGVybkNvcm5lcnNGaXJzdDogXCJDb2lucyBkXHUyMDE5YWJvcmRcIixcbiAgICBwYXR0ZXJuU3BpcmFsOiBcIlNwaXJhbGVcIixcbiAgICBzb2xpZDogXCJQbGVpblwiLFxuICAgIHN0cmlwZXM6IFwiUmF5dXJlc1wiLFxuICAgIGNoZWNrZXJib2FyZDogXCJEYW1pZXJcIixcbiAgICBncmFkaWVudDogXCJEXHUwMEU5Z3JhZFx1MDBFOVwiLFxuICAgIGRvdHM6IFwiUG9pbnRzXCIsXG4gICAgd2F2ZXM6IFwiVmFndWVzXCIsXG4gICAgc3BpcmFsOiBcIlNwaXJhbGVcIixcbiAgICBtb3NhaWM6IFwiTW9zYVx1MDBFRnF1ZVwiLFxuICAgIGJyaWNrczogXCJCcmlxdWVzXCIsXG4gICAgemlnemFnOiBcIlppZ3phZ1wiLFxuICAgIHByb3RlY3RpbmdEcmF3aW5nOiBcIlByb3RlY3Rpb24gZHUgZGVzc2luLi4uXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNoYW5nZW1lbnRzIGRcdTAwRTl0ZWN0XHUwMEU5cyBkYW5zIGxlIGRlc3NpblwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdUREMjcgUlx1MDBFOXBhcmF0aW9uIGRlIHtjb3VudH0gcGl4ZWxzIG1vZGlmaVx1MDBFOXMuLi5cIixcbiAgICByZXBhaXJDb21wbGV0ZWQ6IFwiXHUyNzA1IFJcdTAwRTlwYXJhdGlvbiB0ZXJtaW5cdTAwRTllIDoge2NvdW50fSBwaXhlbHNcIixcbiAgICBub0NoYXJnZXNGb3JSZXBhaXI6IFwiXHUyNkExIFBhcyBkZSBmcmFpcyBwb3VyIGxhIHJcdTAwRTlwYXJhdGlvbiwgZW4gYXR0ZW50ZS4uLlwiLFxuICAgIHByb3RlY3Rpb25Qcmlvcml0eTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJpb3JpdFx1MDBFOSBcdTAwRTAgbGEgcHJvdGVjdGlvbiBhY3Rpdlx1MDBFOWVcIixcbiAgICBwYXR0ZXJuQXBwbGllZDogXCJNb3RpZiBhcHBsaXF1XHUwMEU5XCIsXG4gICAgY3VzdG9tUGF0dGVybjogXCJNb3RpZiBwZXJzb25uYWxpc1x1MDBFOVwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJUXHUwMEU5bFx1MDBFOWNoYXJnZXIgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJFZmZhY2VyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiRmVybWVyXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAodG8gYmUgaW1wbGVtZW50ZWQpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgRmFybSBCb3RcIixcbiAgICBzdGFydDogXCJEXHUwMEU5bWFycmVyXCIsXG4gICAgc3RvcDogXCJBcnJcdTAwRUF0ZXJcIixcbiAgICBzdG9wcGVkOiBcIkJvdCBhcnJcdTAwRUF0XHUwMEU5XCIsXG4gICAgY2FsaWJyYXRlOiBcIkNhbGlicmVyXCIsXG4gICAgcGFpbnRPbmNlOiBcIlVuZSBmb2lzXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiVlx1MDBFOXJpZmljYXRpb24gZHUgc3RhdHV0Li4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJDb25maWd1cmF0aW9uXCIsXG4gICAgZGVsYXk6IFwiRFx1MDBFOWxhaSAobXMpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzL2xvdFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiQ2hhcmdlcyBtaW5cIixcbiAgICBjb2xvck1vZGU6IFwiTW9kZSBjb3VsZXVyXCIsXG4gICAgcmFuZG9tOiBcIkFsXHUwMEU5YXRvaXJlXCIsXG4gICAgZml4ZWQ6IFwiRml4ZVwiLFxuICAgIHJhbmdlOiBcIlBsYWdlXCIsXG4gICAgZml4ZWRDb2xvcjogXCJDb3VsZXVyIGZpeGVcIixcbiAgICBhZHZhbmNlZDogXCJBdmFuY1x1MDBFOVwiLFxuICAgIHRpbGVYOiBcIlR1aWxlIFhcIixcbiAgICB0aWxlWTogXCJUdWlsZSBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJQYWxldHRlIHBlcnNvbm5hbGlzXHUwMEU5ZVwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcImV4OiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiQ2FwdHVyZXJcIixcbiAgICBwYWludGVkOiBcIlBlaW50c1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIHJldHJpZXM6IFwiXHUwMEM5Y2hlY3NcIixcbiAgICB0aWxlOiBcIlR1aWxlXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiQ29uZmlndXJhdGlvbiBzYXV2ZWdhcmRcdTAwRTllXCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIkNvbmZpZ3VyYXRpb24gY2hhcmdcdTAwRTllXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiQ29uZmlndXJhdGlvbiByXHUwMEU5aW5pdGlhbGlzXHUwMEU5ZVwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiUGVpbmRyZSB1biBwaXhlbCBtYW51ZWxsZW1lbnQgcG91ciBjYXB0dXJlciBsZXMgY29vcmRvbm5cdTAwRTllcy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiQmFja2VuZCBFbiBsaWduZVwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIkJhY2tlbmQgSG9ycyBsaWduZVwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIkRcdTAwRTltYXJyYWdlIGR1IGJvdC4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIkFyclx1MDBFQXQgZHUgYm90Li4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiQ2FsaWJyYWdlLi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiQXV0by1GYXJtIGVzdCBkXHUwMEU5alx1MDBFMCBlbiBjb3VycyBkJ2V4XHUwMEU5Y3V0aW9uLlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiQXV0by1JbWFnZSBlc3QgZW4gY291cnMgZCdleFx1MDBFOWN1dGlvbi4gRmVybWV6LWxlIGF2YW50IGRlIGRcdTAwRTltYXJyZXIgQXV0by1GYXJtLlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNcdTAwRTlsZWN0aW9ubmVyIFpvbmVcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBQZWlnbmV6IHVuIHBpeGVsIGRhbnMgdW5lIHpvbmUgVklERSBkZSBsYSBjYXJ0ZSBwb3VyIGRcdTAwRTlmaW5pciBsYSB6b25lIGRlIGZhcm1pbmdcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVuIGF0dGVudGUgcXVlIHZvdXMgcGVpZ25pZXogbGUgcGl4ZWwgZGUgclx1MDBFOWZcdTAwRTlyZW5jZS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBab25lIGRcdTAwRTlmaW5pZSEgUmF5b246IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBEXHUwMEU5bGFpIGRcdTAwRTlwYXNzXHUwMEU5IHBvdXIgbGEgc1x1MDBFOWxlY3Rpb24gZGUgem9uZVwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgU1x1MDBFOWxlY3Rpb25uZXogdW5lIHpvbmUgZCdhYm9yZCBlbiB1dGlsaXNhbnQgJ1NcdTAwRTlsZWN0aW9ubmVyIFpvbmUnXCIsXG4gICAgZmFybVJhZGl1czogXCJSYXlvbiBmYXJtXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlpvbmUgYWN0dWVsbGVcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIEZhcm1pbmcgZGFucyB1biByYXlvbiBkZSB7cmFkaXVzfXB4IGRlcHVpcyAoe3h9LHt5fSlcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIElNUE9SVEFOVDogU1x1MDBFOWxlY3Rpb25uZXogdW5lIHpvbmUgVklERSBwb3VyIFx1MDBFOXZpdGVyIGxlcyBjb25mbGl0c1wiLFxuICAgIG5vUG9zaXRpb246IFwiQXVjdW5lIHpvbmVcIixcbiAgICBjdXJyZW50Wm9uZTogXCJab25lOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFNcdTAwRTlsZWN0aW9ubmV6IHVuZSB6b25lIGQnYWJvcmQuIFBlaWduZXogdW4gcGl4ZWwgc3VyIGxhIGNhcnRlIHBvdXIgZFx1MDBFOWZpbmlyIGxhIHpvbmUgZGUgZmFybWluZ1wiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJUXHUwMEU5bFx1MDBFOWNoYXJnZXIgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJFZmZhY2VyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiRmVybWVyXCJcbiAgfSxcblxuICAgIC8vIENvbW1vbi9TaGFyZWRcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIk91aVwiLFxuICAgIG5vOiBcIk5vblwiLFxuICAgIG9rOiBcIk9LXCIsXG4gICAgY2FuY2VsOiBcIkFubnVsZXJcIixcbiAgICBjbG9zZTogXCJGZXJtZXJcIixcbiAgICBzYXZlOiBcIlNhdXZlZ2FyZGVyXCIsXG4gICAgbG9hZDogXCJDaGFyZ2VyXCIsXG4gICAgZGVsZXRlOiBcIlN1cHByaW1lclwiLFxuICAgIGVkaXQ6IFwiTW9kaWZpZXJcIixcbiAgICBzdGFydDogXCJEXHUwMEU5bWFycmVyXCIsXG4gICAgc3RvcDogXCJBcnJcdTAwRUF0ZXJcIixcbiAgICBwYXVzZTogXCJQYXVzZVwiLFxuICAgIHJlc3VtZTogXCJSZXByZW5kcmVcIixcbiAgICByZXNldDogXCJSXHUwMEU5aW5pdGlhbGlzZXJcIixcbiAgICBzZXR0aW5nczogXCJQYXJhbVx1MDBFOHRyZXNcIixcbiAgICBoZWxwOiBcIkFpZGVcIixcbiAgICBhYm91dDogXCJcdTAwQzAgcHJvcG9zXCIsXG4gICAgbGFuZ3VhZ2U6IFwiTGFuZ3VlXCIsXG4gICAgbG9hZGluZzogXCJDaGFyZ2VtZW50Li4uXCIsXG4gICAgZXJyb3I6IFwiRXJyZXVyXCIsXG4gICAgc3VjY2VzczogXCJTdWNjXHUwMEU4c1wiLFxuICAgIHdhcm5pbmc6IFwiQXZlcnRpc3NlbWVudFwiLFxuICAgIGluZm86IFwiSW5mb3JtYXRpb25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiTGFuZ3VlIGNoYW5nXHUwMEU5ZSBlbiB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGlzZXIgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTXHUwMEU5bGVjdGlvbm5lciBab25lXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyZXIgWm9uZVwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJEXHUwMEU5bWFycmVyIFByb3RlY3Rpb25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJBcnJcdTAwRUF0ZXIgUHJvdGVjdGlvblwiLFxuICAgIHVwcGVyTGVmdDogXCJDb2luIFN1cFx1MDBFOXJpZXVyIEdhdWNoZVwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiQ29pbiBJbmZcdTAwRTlyaWV1ciBEcm9pdFwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQaXhlbHMgUHJvdFx1MDBFOWdcdTAwRTlzXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkNoYW5nZW1lbnRzIERcdTAwRTl0ZWN0XHUwMEU5c1wiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlBpeGVscyBSXHUwMEU5cGFyXHUwMEU5c1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVuIGF0dGVudGUgZCdpbml0aWFsaXNhdGlvbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBWXHUwMEU5cmlmaWNhdGlvbiBkZXMgY291bGV1cnMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBBdWN1bmUgY291bGV1ciB0cm91dlx1MDBFOWUuIE91dnJleiBsYSBwYWxldHRlIGRlIGNvdWxldXJzIHN1ciBsZSBzaXRlLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvdWxldXJzIGRpc3BvbmlibGVzIHRyb3V2XHUwMEU5ZXNcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaXRpYWxpc1x1MDBFOSBhdmVjIHN1Y2NcdTAwRThzXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsJ2luaXRpYWxpc2F0aW9uIGRlIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIENvb3Jkb25uXHUwMEU5ZXMgaW52YWxpZGVzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIExhIHpvbmUgZG9pdCBhdm9pciBsZSBjb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZSBpbmZcdTAwRTlyaWV1ciBhdSBjb2luIGluZlx1MDBFOXJpZXVyIGRyb2l0XCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBab25lIHRyb3AgZ3JhbmRlOiB7c2l6ZX0gcGl4ZWxzIChtYXhpbXVtOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJlIGRlIGxhIHpvbmUgZGUgcHJvdGVjdGlvbi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgWm9uZSBjYXB0dXJcdTAwRTllOiB7Y291bnR9IHBpeGVscyBzb3VzIHByb3RlY3Rpb25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGxhIGNhcHR1cmUgZGUgem9uZToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgQ2FwdHVyZXogZCdhYm9yZCB1bmUgem9uZSBkZSBwcm90ZWN0aW9uXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY3Rpb24gZFx1MDBFOW1hcnJcdTAwRTllIC0gc3VydmVpbGxhbmNlIGRlIGxhIHpvbmVcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUHJvdGVjdGlvbiBhcnJcdTAwRUF0XHUwMEU5ZVwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgWm9uZSBwcm90XHUwMEU5Z1x1MDBFOWUgLSBhdWN1biBjaGFuZ2VtZW50IGRcdTAwRTl0ZWN0XHUwMEU5XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNoYW5nZW1lbnRzIGRcdTAwRTl0ZWN0XHUwMEU5cyBkYW5zIGxhIHpvbmUgcHJvdFx1MDBFOWdcdTAwRTllXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSXHUwMEU5cGFyYXRpb24gZGUge2NvdW50fSBwaXhlbHMgYWx0XHUwMEU5clx1MDBFOXMuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IHtjb3VudH0gcGl4ZWxzIHJcdTAwRTlwYXJcdTAwRTlzIGF2ZWMgc3VjY1x1MDBFOHNcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgclx1MDBFOXBhcmF0aW9uIGRlcyBwaXhlbHM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIENoYXJnZXMgaW5zdWZmaXNhbnRlcyBwb3VyIHJcdTAwRTlwYXJlciBsZXMgY2hhbmdlbWVudHNcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFZcdTAwRTlyaWZpY2F0aW9uIGRlcyBjaGFuZ2VtZW50cyBkYW5zIGxhIHpvbmUgcHJvdFx1MDBFOWdcdTAwRTllLi4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgdlx1MDBFOXJpZmljYXRpb24gZGVzIGNoYW5nZW1lbnRzOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIEdhcmRpZW4gYWN0aWYgLSB6b25lIHNvdXMgcHJvdGVjdGlvblwiLFxuICAgIGxhc3RDaGVjazogXCJEZXJuaVx1MDBFOHJlIHZcdTAwRTlyaWZpY2F0aW9uOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiUHJvY2hhaW5lIHZcdTAwRTlyaWZpY2F0aW9uIGRhbnM6IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbml0aWFsaXNhdGlvbiBhdXRvbWF0aXF1ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGRcdTAwRTltYXJyXHUwMEU5IGF1dG9tYXRpcXVlbWVudFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBJbXBvc3NpYmxlIGRlIGRcdTAwRTltYXJyZXIgYXV0b21hdGlxdWVtZW50LiBVdGlsaXNleiBsZSBib3V0b24gbWFudWVsLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pdGlhbGlzYXRpb24gbWFudWVsbGUgcmVxdWlzZVwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXR0ZSBkZSBjb3VsZXVycyBkXHUwMEU5dGVjdFx1MDBFOWVcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFJlY2hlcmNoZSBkZSBsYSBwYWxldHRlIGRlIGNvdWxldXJzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpYyBzdXIgbGUgYm91dG9uIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm91dG9uIFBhaW50IGludHJvdXZhYmxlXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBQZWlnbmV6IHVuIHBpeGVsIGF1IGNvaW4gU1VQXHUwMEM5UklFVVIgR0FVQ0hFIGRlIGxhIHpvbmUgXHUwMEUwIHByb3RcdTAwRTlnZXJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBNYWludGVuYW50IHBlaWduZXogdW4gcGl4ZWwgYXUgY29pbiBJTkZcdTAwQzlSSUVVUiBEUk9JVCBkZSBsYSB6b25lXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBkZSBsYSBzXHUwMEU5bGVjdGlvbiBkdSBjb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZS4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIGRlIGxhIHNcdTAwRTlsZWN0aW9uIGR1IGNvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXQuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgQ29pbiBzdXBcdTAwRTlyaWV1ciBnYXVjaGUgY2FwdHVyXHUwMEU5OiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBDb2luIGluZlx1MDBFOXJpZXVyIGRyb2l0IGNhcHR1clx1MDBFOTogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZGUgc1x1MDBFOWxlY3Rpb24gZFx1MDBFOXBhc3NcdTAwRTlcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgRXJyZXVyIGRlIHNcdTAwRTlsZWN0aW9uLCB2ZXVpbGxleiByXHUwMEU5ZXNzYXllclwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJUXHUwMEU5bFx1MDBFOWNoYXJnZXIgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJFZmZhY2VyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiRmVybWVyXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgcnUgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQycsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwJyxcbiAgICBzZWxlY3Rpb246ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0M0RcdTA0M0UnLFxuICAgIHVzZXI6ICdcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NEMnLFxuICAgIGNoYXJnZXM6ICdcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYnLFxuICAgIGJhY2tlbmQ6ICdcdTA0MTFcdTA0NERcdTA0M0FcdTA0MzVcdTA0M0RcdTA0MzQnLFxuICAgIGRhdGFiYXNlOiAnXHUwNDExXHUwNDMwXHUwNDM3XHUwNDMwIFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NScsXG4gICAgdXB0aW1lOiAnXHUwNDEyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGIFx1MDQ0MFx1MDQzMFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQ0QicsXG4gICAgY2xvc2U6ICdcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NEMnLFxuICAgIGxhdW5jaDogJ1x1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QycsXG4gICAgbG9hZGluZzogJ1x1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMCcsXG4gICAgZXhlY3V0aW5nOiAnXHUwNDEyXHUwNDRCXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1JyxcbiAgICBkb3dubG9hZGluZzogJ1x1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMCBcdTA0NDFcdTA0M0FcdTA0NDBcdTA0MzhcdTA0M0ZcdTA0NDJcdTA0MzAuLi4nLFxuICAgIGNob29zZUJvdDogJ1x1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0MzAgXHUwNDM4IFx1MDQzRFx1MDQzMFx1MDQzNlx1MDQzQ1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMnLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdcdTA0MTNcdTA0M0VcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0UgXHUwNDNBIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQ0MycsXG4gICAgbG9hZEVycm9yOiAnXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzOCcsXG4gICAgbG9hZEVycm9yTXNnOiAnXHUwNDFEXHUwNDM1XHUwNDMyXHUwNDNFXHUwNDM3XHUwNDNDXHUwNDNFXHUwNDM2XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLiBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NENcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDNFXHUwNDM0XHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzQlx1MDQzOCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDM1XHUwNDQ5XHUwNDM1IFx1MDQ0MFx1MDQzMFx1MDQzNy4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMC4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIFx1MDQxRVx1MDQzRFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRCcsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBcdTA0MUVcdTA0NDRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0QnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIFx1MDQxRVx1MDQxQScsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwJyxcbiAgICB1bmtub3duOiAnLScsXG4gICAgbG9nV2luZG93OiAnTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzggLSB7Ym90TmFtZX0nLFxuICAgIGRvd25sb2FkTG9nczogJ1x1MDQyMVx1MDQzQVx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzgnLFxuICAgIGNsZWFyTG9nczogJ1x1MDQxRVx1MDQ0N1x1MDQzOFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzgnLFxuICAgIGNsb3NlTG9nczogJ1x1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0QydcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIGluaXRCb3Q6IFwiXHUwNDE4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIEF1dG8tQk9UXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzBcdTA0MzdcdTA0M0NcdTA0MzVcdTA0NDAgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzRSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzBcIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDQzIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMiBcdTA0M0RcdTA0MzAgXHUwNDQxXHUwNDMwXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzOCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDMwIVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTA0MURcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IFx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDQxIHtjb3VudH0gXHUwNDM0XHUwNDM1XHUwNDM5XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXHUwNDNEXHUwNDRCXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0Rlx1MDQzQ1x1MDQzOFwiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDQyXHUwNDNFXHUwNDNDIFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzNSwgXHUwNDMzXHUwNDM0XHUwNDM1IFx1MDQzMlx1MDQ0QiBcdTA0NDVcdTA0M0VcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0M0RcdTA0M0VcdTA0M0EgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDM4XHUwNDNEXHUwNDMwXHUwNDNCXHUwNDQxXHUwNDRGIVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEYuLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzAgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDXHUwNDMwXHUwNDQzXHUwNDQyIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0ZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzhcIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBcdTA0MUZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDMwLCBcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzOCwgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQ0OVx1MDQzNSBcdTA0NDBcdTA0MzBcdTA0MzdcIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0M0UgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxOiB7cGFpbnRlZH0gXHUwNDM4XHUwNDM3IHt0b3RhbH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5Li4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBcdTA0MURcdTA0MzVcdTA0NDIgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyLiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTA0MjBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzQ1wiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1MDQyMFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0UhIHtjb3VudH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRS5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0Nlx1MDQzNVx1MDQ0MVx1MDQ0MVx1MDQzNSBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NEZcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBcdTA0MjFcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzggXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzRSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzBcIixcbiAgICBwcm9ncmVzczogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICB1c2VyTmFtZTogXCJcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcIixcbiAgICBwaXhlbHM6IFwiXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM4XCIsXG4gICAgY2hhcmdlczogXCJcdTA0MTdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0NEJcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlx1MDQxRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0MzJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0NEZcIixcbiAgICBpbml0TWVzc2FnZTogXCJcdTA0MURcdTA0MzBcdTA0MzZcdTA0M0NcdTA0MzhcdTA0NDJcdTA0MzUgXHUwMEFCXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIEF1dG8tQk9UXHUwMEJCLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOC4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IFx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDM0XHUwNDNFIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHUwNDIwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0M0RcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDM4IFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzMiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzVcIixcbiAgICBiYXRjaFNpemU6IFwiXHUwNDIwXHUwNDMwXHUwNDM3XHUwNDNDXHUwNDM1XHUwNDQwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzMFwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHUwNDIxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNCBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlx1MDQxOFx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0NDFcdTA0MzUgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHNob3dPdmVybGF5OiBcIlx1MDQxRlx1MDQzRVx1MDQzQVx1MDQzMFx1MDQzN1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0RcdTA0MzBcdTA0M0JcdTA0M0VcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1MDQxQ1x1MDQzMFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQzQ1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0ItXHUwNDMyXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMiBcdTA0MzdcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzI6IHtjdXJyZW50fSBcdTA0MzhcdTA0Mzcge25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlx1MDQxMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOCBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NENcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSB7dGltZX0gXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0QgXHUwNDNBXHUwNDMwXHUwNDNBIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRDoge3BhaW50ZWR9IFx1MDQzOFx1MDQzNyB7dG90YWx9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0VcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzOCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzA6IHtlcnJvcn1cIixcblxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVx1MDQzMDoge2Vycm9yfVwiLFxuXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQyXHUwNDM1XHUwNDNBXHUwNDQzXHUwNDQ5XHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzQgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDNFXHUwNDM5P1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiXHUwNDFEXHUwNDM1IFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQ0Rlx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBjYW5jZWw6IFwiXHUwNDFFXHUwNDQyXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgbWluaW1pemU6IFwiXHUwNDIxXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDQzXHUwNDQyXHUwNDRDXCIsXG4gICAgd2lkdGg6IFwiXHUwNDI4XHUwNDM4XHUwNDQwXHUwNDM4XHUwNDNEXHUwNDMwXCIsXG4gICAgaGVpZ2h0OiBcIlx1MDQxMlx1MDQ0Qlx1MDQ0MVx1MDQzRVx1MDQ0Mlx1MDQzMFwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MVx1MDQzRVx1MDQzRVx1MDQ0Mlx1MDQzRFx1MDQzRVx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0VcdTA0M0RcIixcbiAgICBhcHBseTogXCJcdTA0MUZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBvdmVybGF5T246IFwiXHUwNDFEXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1OiBcdTA0MTJcdTA0MUFcdTA0MUJcIixcbiAgICBvdmVybGF5T2ZmOiBcIlx1MDQxRFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNTogXHUwNDEyXHUwNDJCXHUwNDFBXHUwNDFCXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDQ2XHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQzN1x1MDQzMFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0OFx1MDQzNVx1MDQzRDoge3BhaW50ZWR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0UgfCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDE6IHtwZXJjZW50fSUgKHtjdXJyZW50fSBcdTA0MzhcdTA0Mzcge3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzMDoge2N1cnJlbnR9IFx1MDQzOFx1MDQzNyB7bmVlZGVkfSAtIFx1MDQxMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQ0Rjoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzI6IHtjdXJyZW50fSBcdTA0MzhcdTA0Mzcge25lZWRlZH0gLSBcdTA0MjJcdTA0NDBcdTA0MzVcdTA0MzFcdTA0NDNcdTA0MzVcdTA0NDJcdTA0NDFcdTA0NEY6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzMFx1MDQ0RiBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1MDQxMVx1MDQzRVx1MDQ0MiBcdTA0NDNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDQxXHUwNDRGIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTA0MURcdTA0MzUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQzMlx1MDQ0Qlx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0EuIFx1MDQxOFx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0NDMgXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzMC5cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1MDQyNlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0MzAgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTA0MUZcdTA0M0VcdTA0MzhcdTA0NDFcdTA0M0EgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDM5IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0Qi4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRFx1MDQzMFx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQzNSBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzggXHUwMEFCUGFpbnRcdTAwQkIuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTA0MUFcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzAgXHUwMEFCUGFpbnRcdTAwQkIgXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHUwNDIyXHUwNDQwXHUwNDM1XHUwNDMxXHUwNDQzXHUwNDM1XHUwNDQyXHUwNDQxXHUwNDRGIFx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzAge2F0dGVtcHR9IFx1MDQzOFx1MDQzNyB7bWF4QXR0ZW1wdHN9IFx1MDQ0N1x1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNyB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzIgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDM1IHthdHRlbXB0fSBcdTA0MzhcdTA0Mzcge21heEF0dGVtcHRzfSwgXHUwNDNGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0N1x1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNyB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDQxXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDRGIHttYXhBdHRlbXB0c30gXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNFXHUwNDNBLiBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDMyIFx1MDQ0MVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQ0RVx1MDQ0OVx1MDQzNVx1MDQzQyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzUuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0MzVcdTA0NDJcdTA0MzguIFx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzNVx1MDQ0MFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzMC4gXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDLVx1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0NDFcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0MzAsIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICAvLyB2Mi4wIC0gXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzOCBcdTA0NDhcdTA0MzBcdTA0MzFcdTA0M0JcdTA0M0VcdTA0M0RcdTA0NEJcbiAgICBwcm90ZWN0aW9uRW5hYmxlZDogXCJcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDMyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgcHJvdGVjdGlvbkRpc2FibGVkOiBcIlx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCBcdTA0M0VcdTA0NDJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBwYWludFBhdHRlcm46IFwiXHUwNDI4XHUwNDMwXHUwNDMxXHUwNDNCXHUwNDNFXHUwNDNEIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHBhdHRlcm5MaW5lYXJTdGFydDogXCJcdTA0MUJcdTA0MzhcdTA0M0RcdTA0MzVcdTA0MzlcdTA0M0RcdTA0NEJcdTA0MzkgKFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzRSlcIixcbiAgICBwYXR0ZXJuTGluZWFyRW5kOiBcIlx1MDQxQlx1MDQzOFx1MDQzRFx1MDQzNVx1MDQzOVx1MDQzRFx1MDQ0Qlx1MDQzOSAoXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDM1XHUwNDQ2KVwiLFxuICAgIHBhdHRlcm5SYW5kb206IFwiXHUwNDIxXHUwNDNCXHUwNDQzXHUwNDQ3XHUwNDMwXHUwNDM5XHUwNDNEXHUwNDRCXHUwNDM5XCIsXG4gICAgcGF0dGVybkNlbnRlck91dDogXCJcdTA0MThcdTA0MzcgXHUwNDQ2XHUwNDM1XHUwNDNEXHUwNDQyXHUwNDQwXHUwNDMwIFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQ0M1wiLFxuICAgIHBhdHRlcm5Db3JuZXJzRmlyc3Q6IFwiXHUwNDIxXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQ0QlwiLFxuICAgIHBhdHRlcm5TcGlyYWw6IFwiXHUwNDIxXHUwNDNGXHUwNDM4XHUwNDQwXHUwNDMwXHUwNDNCXHUwNDRDXCIsXG4gICAgc29saWQ6IFwiXHUwNDIxXHUwNDNGXHUwNDNCXHUwNDNFXHUwNDQ4XHUwNDNEXHUwNDNFXHUwNDM5XCIsXG4gICAgc3RyaXBlczogXCJcdTA0MUZcdTA0M0VcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEJcIixcbiAgICBjaGVja2VyYm9hcmQ6IFwiXHUwNDI4XHUwNDMwXHUwNDQ1XHUwNDNDXHUwNDMwXHUwNDQyXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQzQVx1MDQzMFwiLFxuICAgIGdyYWRpZW50OiBcIlx1MDQxM1x1MDQ0MFx1MDQzMFx1MDQzNFx1MDQzOFx1MDQzNVx1MDQzRFx1MDQ0MlwiLFxuICAgIGRvdHM6IFwiXHUwNDIyXHUwNDNFXHUwNDQ3XHUwNDNBXHUwNDM4XCIsXG4gICAgd2F2ZXM6IFwiXHUwNDEyXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDRCXCIsXG4gICAgc3BpcmFsOiBcIlx1MDQyMVx1MDQzRlx1MDQzOFx1MDQ0MFx1MDQzMFx1MDQzQlx1MDQ0Q1wiLFxuICAgIG1vc2FpYzogXCJcdTA0MUNcdTA0M0VcdTA0MzdcdTA0MzBcdTA0MzhcdTA0M0FcdTA0MzBcIixcbiAgICBicmlja3M6IFwiXHUwNDFBXHUwNDM4XHUwNDQwXHUwNDNGXHUwNDM4XHUwNDQ3XHUwNDM4XCIsXG4gICAgemlnemFnOiBcIlx1MDQxN1x1MDQzOFx1MDQzM1x1MDQzN1x1MDQzMFx1MDQzM1wiLFxuICAgIHByb3RlY3RpbmdEcmF3aW5nOiBcIlx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0M0RcdTA0M0FcdTA0MzAuLi5cIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IFx1MDQxRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0Mzk6IHtjb3VudH1cIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERDI3IFx1MDQxMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSB7Y291bnR9IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ1MVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkuLi5cIixcbiAgICByZXBhaXJDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1MDQxMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0U6IHtjb3VudH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5XCIsXG4gICAgbm9DaGFyZ2VzRm9yUmVwYWlyOiBcIlx1MjZBMSBcdTA0MUFcdTA0M0VcdTA0M0NcdTA0MzhcdTA0NDFcdTA0NDFcdTA0MzhcdTA0MzkgXHUwNDM3XHUwNDMwIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0M0RcdTA0MzVcdTA0NDIsIFx1MDQzRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNS4uLlwiLFxuICAgIHByb3RlY3Rpb25Qcmlvcml0eTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHUwNDFGXHUwNDQwXHUwNDM4XHUwNDNFXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1XHUwNDQyIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0QiBcdTA0MzBcdTA0M0FcdTA0NDJcdTA0MzhcdTA0MzJcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcIixcbiAgICBwYXR0ZXJuQXBwbGllZDogXCJcdTA0MjhcdTA0MzBcdTA0MzFcdTA0M0JcdTA0M0VcdTA0M0QgXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDUxXHUwNDNEXCIsXG4gICAgY3VzdG9tUGF0dGVybjogXCJcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0NDFcdTA0M0FcdTA0MzhcdTA0MzkgXHUwNDQ4XHUwNDMwXHUwNDMxXHUwNDNCXHUwNDNFXHUwNDNEXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzggLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiXHUwNDIxXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOFwiLFxuICAgIGNsZWFyTG9nczogXCJcdTA0MUVcdTA0NDdcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4XCIsXG4gICAgY2xvc2VMb2dzOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0Q1wiXG4gIH0sXG5cbiAgLy8gRmFybSBNb2R1bGUgKHRvIGJlIGltcGxlbWVudGVkKVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0NcIixcbiAgICBzdGFydDogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0b3BwZWQ6IFwiXHUwNDExXHUwNDNFXHUwNDQyIFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFwiLFxuICAgIGNhbGlicmF0ZTogXCJcdTA0MUFcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzFcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBwYWludE9uY2U6IFwiXHUwNDE1XHUwNDM0XHUwNDM4XHUwNDNEXHUwNDNFXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDNFXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQ0M1x1MDQ0MVx1MDQzMC4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiXHUwNDFBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgZGVsYXk6IFwiXHUwNDE3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDMwIChcdTA0M0NcdTA0NDEpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzN1x1MDQzMCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcIixcbiAgICBtaW5DaGFyZ2VzOiBcIlx1MDQxQ1x1MDQzOFx1MDQzRFx1MDQzOFx1MDQzQ1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0ItXHUwNDMyXHUwNDNFXCIsXG4gICAgY29sb3JNb2RlOiBcIlx1MDQyMFx1MDQzNVx1MDQzNlx1MDQzOFx1MDQzQyBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcIixcbiAgICByYW5kb206IFwiXHUwNDIxXHUwNDNCXHUwNDQzXHUwNDQ3XHUwNDMwXHUwNDM5XHUwNDNEXHUwNDRCXHUwNDM5XCIsXG4gICAgZml4ZWQ6IFwiXHUwNDI0XHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM5XCIsXG4gICAgcmFuZ2U6IFwiXHUwNDE0XHUwNDM4XHUwNDMwXHUwNDNGXHUwNDMwXHUwNDM3XHUwNDNFXHUwNDNEXCIsXG4gICAgZml4ZWRDb2xvcjogXCJcdTA0MjRcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzkgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXCIsXG4gICAgYWR2YW5jZWQ6IFwiXHUwNDIwXHUwNDMwXHUwNDQxXHUwNDQ4XHUwNDM4XHUwNDQwXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1XCIsXG4gICAgdGlsZVg6IFwiXHUwNDFGXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDNBXHUwNDMwIFhcIixcbiAgICB0aWxlWTogXCJcdTA0MUZcdTA0M0JcdTA0MzhcdTA0NDJcdTA0M0FcdTA0MzAgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiXHUwNDIxXHUwNDMyXHUwNDNFXHUwNDRGIFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQzMFwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcIlx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzQ1x1MDQzNVx1MDQ0MDogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIlx1MDQxN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0MlwiLFxuICAgIHBhaW50ZWQ6IFwiXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDMwXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDNFXCIsXG4gICAgY2hhcmdlczogXCJcdTA0MTdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0NEJcIixcbiAgICByZXRyaWVzOiBcIlx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzhcIixcbiAgICB0aWxlOiBcIlx1MDQxRlx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQzQVx1MDQzMFwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIlx1MDQxQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiXHUwNDFBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIlx1MDQyMVx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQ0MSBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzhcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDQzXHUwNDRFIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzAgXHUwNDNBXHUwNDNFXHUwNDNFXHUwNDQwXHUwNDM0XHUwNDM4XHUwNDNEXHUwNDMwXHUwNDQyLi4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJcdTA0MTFcdTA0NERcdTA0M0FcdTA0NERcdTA0M0RcdTA0MzQgXHUwNDFFXHUwNDNEXHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiXHUwNDExXHUwNDREXHUwNDNBXHUwNDREXHUwNDNEXHUwNDM0IFx1MDQxRVx1MDQ0NFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRFwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIlx1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQSBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0MzAuLi5cIixcblxuICAgIHN0b3BwaW5nQm90OiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQVx1MDQzMCBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0MzAuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJcdTA0MUFcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzFcdTA0NDBcdTA0M0VcdTA0MzJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDIFx1MDQ0M1x1MDQzNlx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDlcdTA0MzVcdTA0M0RcIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIlx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNFLiBcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDM1XHUwNDMzXHUwNDNFIFx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNCBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0M0VcdTA0M0MgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQ1x1MDQzMC5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzMiBcdTA0MUZcdTA0MjNcdTA0MjFcdTA0MjJcdTA0MUVcdTA0MTkgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQ0QiwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzRVx1MDQzMVx1MDQzRVx1MDQzN1x1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQ0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwLlwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEYuLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzAhIFx1MDQyMFx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0M1x1MDQ0MTogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQ1x1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0MSBcdTA0M0ZcdTA0M0VcdTA0M0NcdTA0M0VcdTA0NDlcdTA0NENcdTA0NEUgXHUwMEFCXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1x1MDBCQlwiLFxuICAgIGZhcm1SYWRpdXM6IFwiXHUwNDIwXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDQzXHUwNDQxIFx1MDQ0NFx1MDQzMFx1MDQ0MFx1MDQzQ1x1MDQzMFwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJcdTA0MjJcdTA0MzVcdTA0M0FcdTA0NDNcdTA0NDlcdTA0MzBcdTA0NEYgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBcdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0MgXHUwNDMyIFx1MDQ0MFx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0M1x1MDQ0MVx1MDQzNSB7cmFkaXVzfXB4IFx1MDQzRVx1MDQ0MiAoe3h9LHt5fSlcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIFx1MDQxMlx1MDQxMFx1MDQxNlx1MDQxRFx1MDQxRTogXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQxRlx1MDQyM1x1MDQyMVx1MDQyMlx1MDQyM1x1MDQyRSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0MzhcdTA0MzdcdTA0MzFcdTA0MzVcdTA0MzZcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDNCXHUwNDM4XHUwNDNBXHUwNDQyXHUwNDNFXHUwNDMyLlwiLFxuICAgIG5vUG9zaXRpb246IFwiXHUwNDFEXHUwNDM1XHUwNDQyIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIGN1cnJlbnRab25lOiBcIlx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QzogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBcdTA0MjFcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzAgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Qy4gXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0M0RcdTA0MzAgXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDM1LCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNFXHUwNDMxXHUwNDNFXHUwNDM3XHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzAuXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzggLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiXHUwNDIxXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOFwiLFxuICAgIGNsZWFyTG9nczogXCJcdTA0MUVcdTA0NDdcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4XCIsXG4gICAgY2xvc2VMb2dzOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0Q1wiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiXHUwNDE0XHUwNDMwXCIsXG4gICAgbm86IFwiXHUwNDFEXHUwNDM1XHUwNDQyXCIsXG4gICAgb2s6IFwiXHUwNDFFXHUwNDFBXCIsXG4gICAgY2FuY2VsOiBcIlx1MDQxRVx1MDQ0Mlx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGNsb3NlOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHNhdmU6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgbG9hZDogXCJcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBkZWxldGU6IFwiXHUwNDIzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgZWRpdDogXCJcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzdGFydDogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHBhdXNlOiBcIlx1MDQxRlx1MDQ0MFx1MDQzOFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHJlc3VtZTogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICByZXNldDogXCJcdTA0MjFcdTA0MzFcdTA0NDBcdTA0M0VcdTA0NDFcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzZXR0aW5nczogXCJcdTA0MURcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzlcdTA0M0FcdTA0MzhcIixcbiAgICBoZWxwOiBcIlx1MDQxRlx1MDQzRVx1MDQzQ1x1MDQzRVx1MDQ0OVx1MDQ0Q1wiLFxuICAgIGFib3V0OiBcIlx1MDQxOFx1MDQzRFx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGxhbmd1YWdlOiBcIlx1MDQyRlx1MDQzN1x1MDQ0Qlx1MDQzQVwiLFxuICAgIGxvYWRpbmc6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgZXJyb3I6IFwiXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwXCIsXG4gICAgc3VjY2VzczogXCJcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDVcIixcbiAgICB3YXJuaW5nOiBcIlx1MDQxRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQzRlx1MDQ0MFx1MDQzNVx1MDQzNlx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIGluZm86IFwiXHUwNDE4XHUwNDNEXHUwNDQ0XHUwNDNFXHUwNDQwXHUwNDNDXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIlx1MDQyRlx1MDQzN1x1MDQ0Qlx1MDQzQSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0QgXHUwNDNEXHUwNDMwIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIEd1YXJkIE1vZHVsZVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwXCIsXG4gICAgaW5pdEJvdDogXCJcdTA0MThcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDQzXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0M1wiLFxuICAgIHVwcGVyTGVmdDogXCJcdTA0MTJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDFCXHUwNDM1XHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQyM1x1MDQzM1x1MDQzRVx1MDQzQlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHUwNDFEXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQxRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0MjNcdTA0MzNcdTA0M0VcdTA0M0JcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTA0MUVcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiXHUwNDEyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOC4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1MDQyNlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzMCBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDRCLiBcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDQzIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMiBcdTA0M0RcdTA0MzAgXHUwNDQxXHUwNDMwXHUwNDM5XHUwNDQyXHUwNDM1LlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTA0MURcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBcdTA0NDNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4IEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIFx1MDQxRFx1MDQzNVx1MDQzNFx1MDQzNVx1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0VcdTA0NDBcdTA0MzRcdTA0MzhcdTA0M0RcdTA0MzBcdTA0NDJcdTA0NEJcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzRFx1MDQzMCBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzQlx1MDQzNVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0NDNcdTA0MzNcdTA0M0VcdTA0M0IgXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDRDXHUwNDQ4XHUwNDM1IFx1MDQzRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDMwXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQxXHUwNDNCXHUwNDM4XHUwNDQ4XHUwNDNBXHUwNDNFXHUwNDNDIFx1MDQzMVx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQ0OFx1MDQzMFx1MDQ0Rjoge3NpemV9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSAoXHUwNDNDXHUwNDMwXHUwNDNBXHUwNDQxXHUwNDM4XHUwNDNDXHUwNDQzXHUwNDNDOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBcdTA0MTdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDIgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0Qi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzMDoge2NvdW50fSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNGXHUwNDNFXHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQzOVwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0Mzg6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIFx1MDQyMVx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0QlwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDMwIC0gXHUwNDNDXHUwNDNFXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDNEXHUwNDMzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIC0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRFx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0VcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0MzIgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDNFXHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgXHUwNDEyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IHtjb3VudH0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOS4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSB7Y291bnR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOVwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOToge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHUwNDFEXHUwNDM1XHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMiBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOVwiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0MzIgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDNFXHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOC4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5OiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1MDQyMVx1MDQ0Mlx1MDQ0MFx1MDQzMFx1MDQzNiBcdTA0MzBcdTA0M0FcdTA0NDJcdTA0MzhcdTA0MzJcdTA0MzVcdTA0M0QgLSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQzOVwiLFxuICAgIGxhc3RDaGVjazogXCJcdTA0MUZcdTA0M0VcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0M0RcdTA0NEZcdTA0NEYgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiXHUwNDIxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzc6IHt0aW1lfVx1MDQ0MVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzMFx1MDQ0RiBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDlcdTA0MzVcdTA0M0QgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOC4gXHUwNDE4XHUwNDQxXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQ0MyBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDMwLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHUwNDIyXHUwNDQwXHUwNDM1XHUwNDMxXHUwNDQzXHUwNDM1XHUwNDQyXHUwNDQxXHUwNDRGIFx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1MDQyNlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0MzAgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTA0MUZcdTA0M0VcdTA0MzhcdTA0NDFcdTA0M0EgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDM5IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0Qi4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRFx1MDQzMFx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQzNSBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzggXHUwMEFCUGFpbnRcdTAwQkIuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTA0MUFcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzAgXHUwMEFCUGFpbnRcdTAwQkIgXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDEyXHUwNDE1XHUwNDIwXHUwNDI1XHUwNDFEXHUwNDE1XHUwNDFDIFx1MDQxQlx1MDQxNVx1MDQxMlx1MDQxRVx1MDQxQyBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0NDMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBcdTA0MjJcdTA0MzVcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDFEXHUwNDE4XHUwNDE2XHUwNDFEXHUwNDE1XHUwNDFDIFx1MDQxRlx1MDQyMFx1MDQxMFx1MDQxMlx1MDQxRVx1MDQxQyBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0NDMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNCXHUwNDM1XHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMC4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDMwLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0JcdTA0MzVcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRDogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgXHUwNDFEXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0NDNcdTA0MzNcdTA0M0VcdTA0M0IgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDNEOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDLVx1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzBcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCwgXHUwNDNGXHUwNDNFXHUwNDM2XHUwNDMwXHUwNDNCXHUwNDQzXHUwNDM5XHUwNDQxXHUwNDQyXHUwNDMwLCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDMwXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzggLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiXHUwNDIxXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOFwiLFxuICAgIGNsZWFyTG9nczogXCJcdTA0MUVcdTA0NDdcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4XCIsXG4gICAgY2xvc2VMb2dzOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0Q1wiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHpoSGFucyA9IHtcbiAgLy8gXHU1NDJGXHU1MkE4XHU1NjY4XG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgXHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0EnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkUnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTgxRUFcdTUyQThcdTVCODhcdTYyQTQnLFxuICAgIHNlbGVjdGlvbjogJ1x1OTAwOVx1NjJFOScsXG4gICAgdXNlcjogJ1x1NzUyOFx1NjIzNycsXG4gICAgY2hhcmdlczogJ1x1NkIyMVx1NjU3MCcsXG4gICAgYmFja2VuZDogJ1x1NTQwRVx1N0FFRicsXG4gICAgZGF0YWJhc2U6ICdcdTY1NzBcdTYzNkVcdTVFOTMnLFxuICAgIHVwdGltZTogJ1x1OEZEMFx1ODg0Q1x1NjVGNlx1OTVGNCcsXG4gICAgY2xvc2U6ICdcdTUxNzNcdTk1RUQnLFxuICAgIGxhdW5jaDogJ1x1NTQyRlx1NTJBOCcsXG4gICAgbG9hZGluZzogJ1x1NTJBMFx1OEY3RFx1NEUyRFx1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1x1NkI2M1x1NTcyOFx1NEUwQlx1OEY3RFx1ODExQVx1NjcyQ1x1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnXHU5MDA5XHU2MkU5XHU0RTAwXHU0RTJBXHU2NzNBXHU1NjY4XHU0RUJBXHU1RTc2XHU3MEI5XHU1MUZCXHU1NDJGXHU1MkE4JyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHU1MUM2XHU1OTA3XHU1NDJGXHU1MkE4JyxcbiAgICBsb2FkRXJyb3I6ICdcdTUyQTBcdThGN0RcdTk1MTlcdThCRUYnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1NjVFMFx1NkNENVx1NTJBMFx1OEY3RFx1NjI0MFx1OTAwOVx1NjczQVx1NTY2OFx1NEVCQVx1MzAwMlx1OEJGN1x1NjhDMFx1NjdFNVx1N0Y1MVx1N0VEQ1x1OEZERVx1NjNBNVx1NjIxNlx1OTFDRFx1OEJENVx1MzAwMicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgXHU2OEMwXHU2N0U1XHU0RTJELi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgXHU1NzI4XHU3RUJGJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IFx1NzlCQlx1N0VCRicsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgXHU2QjYzXHU1RTM4JyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBcdTk1MTlcdThCRUYnLFxuICAgIHVua25vd246ICctJyxcbiAgICBsb2dXaW5kb3c6ICdcdUQ4M0RcdURDQ0IgTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTY1RTVcdTVGRDdcdTdBOTdcdTUzRTMnLFxuICAgIGRvd25sb2FkTG9nczogJ1x1NEUwQlx1OEY3RFx1NjVFNVx1NUZENycsXG4gICAgY2xlYXJMb2dzOiAnXHU2RTA1XHU5NjY0XHU2NUU1XHU1RkQ3JyxcbiAgICBjbG9zZUxvZ3M6ICdcdTUxNzNcdTk1RUQnXG4gIH0sXG5cbiAgLy8gXHU3RUQ4XHU1NkZFXHU2QTIxXHU1NzU3XG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRVwiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiXHU0RTBBXHU0RjIwXHU1NkZFXHU3MjQ3XCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiXHU4QzAzXHU2NTc0XHU1NkZFXHU3MjQ3XHU1OTI3XHU1QzBGXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHU5MDA5XHU2MkU5XHU0RjREXHU3RjZFXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJcdTVGMDBcdTU5Q0JcdTdFRDhcdTUyMzZcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiXHU1MDVDXHU2QjYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlwiLFxuICAgIGxvYWRQcm9ncmVzczogXCJcdTUyQTBcdThGN0RcdThGREJcdTVFQTZcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgXHU2OEMwXHU2N0U1XHU1M0VGXHU3NTI4XHU5ODlDXHU4MjcyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHU4QkY3XHU1NzI4XHU3RjUxXHU3QUQ5XHU0RTBBXHU2MjUzXHU1RjAwXHU4QzAzXHU4MjcyXHU2NzdGXHU1NDBFXHU5MUNEXHU4QkQ1XHVGRjAxXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1NjI3RVx1NTIzMCB7Y291bnR9IFx1NzlDRFx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3MlwiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgXHU2QjYzXHU1NzI4XHU1MkEwXHU4RjdEXHU1NkZFXHU3MjQ3Li4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IFx1NTZGRVx1NzI0N1x1NURGMlx1NTJBMFx1OEY3RFx1RkYwQ1x1NjcwOVx1NjU0OFx1NTBDRlx1N0QyMCB7Y291bnR9IFx1NEUyQVwiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIFx1NTZGRVx1NzI0N1x1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHU4QkY3XHU1NzI4XHU0RjYwXHU2MEYzXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2XHU3Njg0XHU1NzMwXHU2NUI5XHU2RDgyXHU3QjJDXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHVGRjAxXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTRGNjBcdTZEODJcdTUzQzJcdTgwMDNcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHU0RjREXHU3RjZFXHU4QkJFXHU3RjZFXHU2MjEwXHU1MjlGXHVGRjAxXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTRGNERcdTdGNkVcdTkwMDlcdTYyRTlcdThEODVcdTY1RjZcIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdTRGNERcdTdGNkVcdUZGMENcdTU5MDRcdTc0MDZcdTRFMkQuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTRGNERcdTdGNkVcdTY4QzBcdTZENEJcdTU5MzFcdThEMjVcdUZGMENcdThCRjdcdTkxQ0RcdThCRDVcIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBcdTVGMDBcdTU5Q0JcdTdFRDhcdTUyMzYuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBcdThGREJcdTVFQTY6IHtwYWludGVkfS97dG90YWx9IFx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgXHU2Q0ExXHU2NzA5XHU2QjIxXHU2NTcwXHUzMDAyXHU3QjQ5XHU1Rjg1IHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHU3NTI4XHU2MjM3XHU1REYyXHU1MDVDXHU2QjYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgXHU3RUQ4XHU1MjM2XHU1QjhDXHU2MjEwXHVGRjAxXHU1MTcxXHU3RUQ4XHU1MjM2IHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwXHUzMDAyXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgXHU3RUQ4XHU1MjM2XHU4RkM3XHU3QTBCXHU0RTJEXHU1MUZBXHU5NTE5XCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgXHU4QkY3XHU1MTQ4XHU1MkEwXHU4RjdEXHU1NkZFXHU3MjQ3XHU1RTc2XHU5MDA5XHU2MkU5XHU0RjREXHU3RjZFXCIsXG4gICAgcHJvZ3Jlc3M6IFwiXHU4RkRCXHU1RUE2XCIsXG4gICAgdXNlck5hbWU6IFwiXHU3NTI4XHU2MjM3XCIsXG4gICAgcGl4ZWxzOiBcIlx1NTBDRlx1N0QyMFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJcdTk4ODRcdThCQTFcdTY1RjZcdTk1RjRcIixcbiAgICBpbml0TWVzc2FnZTogXCJcdTcwQjlcdTUxRkJcdTIwMUNcdTUyMURcdTU5Q0JcdTUzMTZcdTgxRUFcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkFcdTIwMURcdTVGMDBcdTU5Q0JcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTdCNDlcdTVGODVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBcdTU2RkVcdTcyNDdcdTVERjJcdThDMDNcdTY1NzRcdTRFM0Ege3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBcdTdFRDhcdTUyMzZcdTY2ODJcdTUwNUNcdTRFOEVcdTRGNERcdTdGNkUgWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcdTY1NzBcIixcbiAgICBiYXRjaFNpemU6IFwiXHU2Mjc5XHU2QjIxXHU1OTI3XHU1QzBGXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJcdTRFMEJcdTZCMjFcdTYyNzlcdTZCMjFcdTY1RjZcdTk1RjRcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlx1NEY3Rlx1NzUyOFx1NjI0MFx1NjcwOVx1NTNFRlx1NzUyOFx1NkIyMVx1NjU3MFwiLFxuICAgIHNob3dPdmVybGF5OiBcIlx1NjYzRVx1NzkzQVx1ODk4Nlx1NzZENlx1NUM0MlwiLFxuICAgIG1heENoYXJnZXM6IFwiXHU2QkNGXHU2Mjc5XHU2NzAwXHU1OTI3XHU2QjIxXHU2NTcwXCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3MDoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJcdTUyNjlcdTRGNTlcdTY1RjZcdTk1RjRcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIFx1N0I0OVx1NUY4NSB7dGltZX0gXHU1NDBFXHU3RUU3XHU3RUVELi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgXHU4RkRCXHU1RUE2XHU1REYyXHU0RkREXHU1QjU4XHU0RTNBIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgXHU1REYyXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjBcdTVERjJcdTdFRDhcdTUyMzZcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2XHU1OTMxXHU4RDI1OiB7ZXJyb3J9XCIsXG4gXG4gICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBcdTRGRERcdTVCNThcdThGREJcdTVFQTZcdTU5MzFcdThEMjU6IHtlcnJvcn1cIixcblxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiXHU1NzI4XHU1MDVDXHU2QjYyXHU0RTRCXHU1MjREXHU4OTgxXHU0RkREXHU1QjU4XHU1RjUzXHU1MjREXHU4RkRCXHU1RUE2XHU1NDE3XHVGRjFGXCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiXHU0RkREXHU1QjU4XHU4RkRCXHU1RUE2XCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIlx1NjUzRVx1NUYwM1wiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBtaW5pbWl6ZTogXCJcdTY3MDBcdTVDMEZcdTUzMTZcIixcbiAgICB3aWR0aDogXCJcdTVCQkRcdTVFQTZcIixcbiAgICBoZWlnaHQ6IFwiXHU5QUQ4XHU1RUE2XCIsXG4gICAga2VlcEFzcGVjdDogXCJcdTRGRERcdTYzMDFcdTdFQjVcdTZBMkFcdTZCRDRcIixcbiAgICBhcHBseTogXCJcdTVFOTRcdTc1MjhcIixcbiAgICBvdmVybGF5T246IFwiXHU4OTg2XHU3NkQ2XHU1QzQyOiBcdTVGMDBcdTU0MkZcIixcbiAgICBvdmVybGF5T2ZmOiBcIlx1ODk4Nlx1NzZENlx1NUM0MjogXHU1MTczXHU5NUVEXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgXHU2Mjc5XHU2QjIxXHU1QjhDXHU2MjEwOiBcdTVERjJcdTdFRDhcdTUyMzYge3BhaW50ZWR9IFx1NTBDRlx1N0QyMCB8IFx1OEZEQlx1NUVBNjoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTcwXHU2MDYyXHU1OTBEOiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTY1RjZcdTk1RjQ6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzA6IHtjdXJyZW50fS97bmVlZGVkfSAtIFx1NTI2OVx1NEY1OToge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHU2QjYzXHU1NzI4XHU4MUVBXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTgxRUFcdTUyQThcdTU0MkZcdTUyQThcdTYyMTBcdTUyOUZcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHU2NUUwXHU2Q0Q1XHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHVGRjBDXHU4QkY3XHU2MjRCXHU1MkE4XHU2NENEXHU0RjVDXHUzMDAyXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEMwM1x1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1NzBCOVx1NTFGQlx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRVwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBcdTkxQ0RcdThCRDUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c31cdUZGMENcdTdCNDlcdTVGODUge2RlbGF5fSBcdTc5RDIuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBcdTdCMkMge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gXHU2QjIxXHU1QzFEXHU4QkQ1XHU1MUZBXHU5NTE5XHVGRjBDXHU1QzA2XHU1NzI4IHtkZWxheX0gXHU3OUQyXHU1NDBFXHU5MUNEXHU4QkQ1Li4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1OEQ4NVx1OEZDNyB7bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NUMxRFx1OEJENVx1NTkzMVx1OEQyNVx1MzAwMlx1N0VFN1x1N0VFRFx1NEUwQlx1NEUwMFx1NjI3OS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgXHU3RjUxXHU3RURDXHU5NTE5XHU4QkVGXHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QkQ1Li4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IFx1NjcwRFx1NTJBMVx1NTY2OFx1OTUxOVx1OEJFRlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgXHU2NzBEXHU1MkExXHU1NjY4XHU4RDg1XHU2NUY2XHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QkQ1Li4uXCIsXG4gICAgLy8gdjIuMCAtIFx1NEZERFx1NjJBNFx1NEUwRVx1N0VEOFx1NTIzNlx1NkEyMVx1NUYwRlxuICAgIHByb3RlY3Rpb25FbmFibGVkOiBcIlx1NURGMlx1NUYwMFx1NTQyRlx1NEZERFx1NjJBNFwiLFxuICAgIHByb3RlY3Rpb25EaXNhYmxlZDogXCJcdTVERjJcdTUxNzNcdTk1RURcdTRGRERcdTYyQTRcIixcbiAgICBwYWludFBhdHRlcm46IFwiXHU3RUQ4XHU1MjM2XHU2QTIxXHU1RjBGXCIsXG4gICAgcGF0dGVybkxpbmVhclN0YXJ0OiBcIlx1N0VCRlx1NjAyN1x1RkYwOFx1OEQ3N1x1NzBCOVx1RkYwOVwiLFxuICAgIHBhdHRlcm5MaW5lYXJFbmQ6IFwiXHU3RUJGXHU2MDI3XHVGRjA4XHU3RUM4XHU3MEI5XHVGRjA5XCIsXG4gICAgcGF0dGVyblJhbmRvbTogXCJcdTk2OEZcdTY3M0FcIixcbiAgICBwYXR0ZXJuQ2VudGVyT3V0OiBcIlx1NEVDRVx1NEUyRFx1NUZDM1x1NTQxMVx1NTkxNlwiLFxuICAgIHBhdHRlcm5Db3JuZXJzRmlyc3Q6IFwiXHU1MTQ4XHU4OUQyXHU4NDNEXCIsXG4gICAgcGF0dGVyblNwaXJhbDogXCJcdTg3QkFcdTY1Q0JcIixcbiAgICBzb2xpZDogXCJcdTVCOUVcdTVGQzNcIixcbiAgICBzdHJpcGVzOiBcIlx1Njc2MVx1N0VCOVwiLFxuICAgIGNoZWNrZXJib2FyZDogXCJcdTY4Q0JcdTc2RDhcdTY4M0NcIixcbiAgICBncmFkaWVudDogXCJcdTZFMTBcdTUzRDhcIixcbiAgICBkb3RzOiBcIlx1NzBCOVx1NzJCNlwiLFxuICAgIHdhdmVzOiBcIlx1NkNFMlx1NkQ2QVwiLFxuICAgIHNwaXJhbDogXCJcdTg3QkFcdTY1Q0JcIixcbiAgICBtb3NhaWM6IFwiXHU5QTZDXHU4RDVCXHU1MTRCXCIsXG4gICAgYnJpY2tzOiBcIlx1NzgxNlx1NTc1N1wiLFxuICAgIHppZ3phZzogXCJcdTRFNEJcdTVCNTdcdTVGNjJcIixcbiAgICBwcm90ZWN0aW5nRHJhd2luZzogXCJcdTZCNjNcdTU3MjhcdTRGRERcdTYyQTRcdTU2RkVcdTdBM0YuLi5cIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IFx1NjhDMFx1NkQ0Qlx1NTIzMCB7Y291bnR9IFx1NTkwNFx1NjZGNFx1NjUzOVwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdUREMjcgXHU2QjYzXHU1NzI4XHU0RkVFXHU1OTBEIHtjb3VudH0gXHU0RTJBXHU2NkY0XHU2NTM5XHU3Njg0XHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcmVwYWlyQ29tcGxldGVkOiBcIlx1MjcwNSBcdTRGRUVcdTU5MERcdTVCOENcdTYyMTBcdUZGMUF7Y291bnR9IFx1NEUyQVx1NTBDRlx1N0QyMFwiLFxuICAgIG5vQ2hhcmdlc0ZvclJlcGFpcjogXCJcdTI2QTEgXHU0RkVFXHU1OTBEXHU0RTBEXHU2RDg4XHU4MDE3XHU3MEI5XHU2NTcwXHVGRjBDXHU3QjQ5XHU1Rjg1XHU0RTJELi4uXCIsXG4gICAgcHJvdGVjdGlvblByaW9yaXR5OiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVERjJcdTU0MkZcdTc1MjhcdTRGRERcdTYyQTRcdTRGMThcdTUxNDhcIixcbiAgICBwYXR0ZXJuQXBwbGllZDogXCJcdTVERjJcdTVFOTRcdTc1MjhcdTZBMjFcdTVGMEZcIixcbiAgICBjdXN0b21QYXR0ZXJuOiBcIlx1ODFFQVx1NUI5QVx1NEU0OVx1NkEyMVx1NUYwRlwiLFxuICAgIGxvZ1dpbmRvdzogJ1x1RDgzRFx1RENDQiBMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1NjVFNVx1NUZEN1x1N0E5N1x1NTNFMycsXG4gICAgZG93bmxvYWRMb2dzOiAnXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3JyxcbiAgICBjbGVhckxvZ3M6ICdcdTZFMDVcdTk2NjRcdTY1RTVcdTVGRDcnLFxuICAgIGNsb3NlTG9nczogJ1x1NTE3M1x1OTVFRCdcbiAgfSxcblxuICAvLyBcdTUxOUNcdTU3M0FcdTZBMjFcdTU3NTdcdUZGMDhcdTVGODVcdTVCOUVcdTczQjBcdUZGMDlcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTUxOUNcdTU3M0FcdTY3M0FcdTU2NjhcdTRFQkFcIixcbiAgICBzdGFydDogXCJcdTVGMDBcdTU5Q0JcIixcbiAgICBzdG9wOiBcIlx1NTA1Q1x1NkI2MlwiLFxuICAgIHN0b3BwZWQ6IFwiXHU2NzNBXHU1NjY4XHU0RUJBXHU1REYyXHU1MDVDXHU2QjYyXCIsXG4gICAgY2FsaWJyYXRlOiBcIlx1NjgyMVx1NTFDNlwiLFxuICAgIHBhaW50T25jZTogXCJcdTRFMDBcdTZCMjFcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJcdTY4QzBcdTY3RTVcdTcyQjZcdTYwMDFcdTRFMkQuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIlx1OTE0RFx1N0Y2RVwiLFxuICAgIGRlbGF5OiBcIlx1NUVGNlx1OEZERiAoXHU2QkVCXHU3OUQyKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1NkJDRlx1NjI3OVx1NTBDRlx1N0QyMFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiXHU2NzAwXHU1QzExXHU2QjIxXHU2NTcwXCIsXG4gICAgY29sb3JNb2RlOiBcIlx1OTg5Q1x1ODI3Mlx1NkEyMVx1NUYwRlwiLFxuICAgIHJhbmRvbTogXCJcdTk2OEZcdTY3M0FcIixcbiAgICBmaXhlZDogXCJcdTU2RkFcdTVCOUFcIixcbiAgICByYW5nZTogXCJcdTgzMDNcdTU2RjRcIixcbiAgICBmaXhlZENvbG9yOiBcIlx1NTZGQVx1NUI5QVx1OTg5Q1x1ODI3MlwiLFxuICAgIGFkdmFuY2VkOiBcIlx1OUFEOFx1N0VBN1wiLFxuICAgIHRpbGVYOiBcIlx1NzRFNlx1NzI0NyBYXCIsXG4gICAgdGlsZVk6IFwiXHU3NEU2XHU3MjQ3IFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlx1ODFFQVx1NUI5QVx1NEU0OVx1OEMwM1x1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcIlx1NEY4Qlx1NTk4MjogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIlx1NjM1NVx1ODNCN1wiLFxuICAgIHBhaW50ZWQ6IFwiXHU1REYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzBcIixcbiAgICByZXRyaWVzOiBcIlx1OTFDRFx1OEJENVwiLFxuICAgIHRpbGU6IFwiXHU3NEU2XHU3MjQ3XCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU0RkREXHU1QjU4XCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NTJBMFx1OEY3RFwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1OTFDRFx1N0Y2RVwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiXHU4QkY3XHU2MjRCXHU1MkE4XHU3RUQ4XHU1MjM2XHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHU0RUU1XHU2MzU1XHU4M0I3XHU1NzUwXHU2ODA3Li4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJcdTU0MEVcdTdBRUZcdTU3MjhcdTdFQkZcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJcdTU0MEVcdTdBRUZcdTc5QkJcdTdFQkZcIixcbiAgICBzdGFydGluZ0JvdDogXCJcdTZCNjNcdTU3MjhcdTU0MkZcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkEuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJcdTZCNjNcdTU3MjhcdTUwNUNcdTZCNjJcdTY3M0FcdTU2NjhcdTRFQkEuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJcdTY4MjFcdTUxQzZcdTRFMkQuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0FcdTVERjJcdTU3MjhcdThGRDBcdTg4NENcdTMwMDJcIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIlx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRVx1NkI2M1x1NTcyOFx1OEZEMFx1ODg0Q1x1RkYwQ1x1OEJGN1x1NTE0OFx1NTE3M1x1OTVFRFx1NTE4RFx1NTQyRlx1NTJBOFx1ODFFQVx1NTJBOFx1NTE5Q1x1NTczQVx1MzAwMlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFx1NTcyOFx1NTczMFx1NTZGRVx1NzY4NFx1N0E3QVx1NzY3RFx1NTMzQVx1NTdERlx1NkQ4Mlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1NEVFNVx1OEJCRVx1N0Y2RVx1NTE5Q1x1NTczQVx1NTMzQVx1NTdERlwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU2RDgyXHU1M0MyXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NTMzQVx1NTdERlx1OEJCRVx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVx1NTM0QVx1NUY4NDogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1NTMzQVx1NTdERlx1OTAwOVx1NjJFOVx1OEQ4NVx1NjVGNlwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgXHU4QkY3XHU1MTQ4XHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHVGRjA4XHU0RjdGXHU3NTI4XHUyMDFDXHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHUyMDFEXHU2MzA5XHU5NEFFXHVGRjA5XCIsXG4gICAgZmFybVJhZGl1czogXCJcdTUxOUNcdTU3M0FcdTUzNEFcdTVGODRcIixcbiAgICBwb3NpdGlvbkluZm86IFwiXHU1RjUzXHU1MjREXHU1MzNBXHU1N0RGXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBcdTZCNjNcdTU3MjhcdTRFRTVcdTUzNEFcdTVGODQge3JhZGl1c31weCBcdTU3MjggKHt4fSx7eX0pIFx1NTE5Q1x1NTczQVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgXHU5MUNEXHU4OTgxOiBcdThCRjdcdTkwMDlcdTYyRTlcdTdBN0FcdTc2N0RcdTUzM0FcdTU3REZcdTRFRTVcdTkwN0ZcdTUxNERcdTUxQjJcdTdBODFcIixcbiAgICBub1Bvc2l0aW9uOiBcIlx1NjcyQVx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIGN1cnJlbnRab25lOiBcIlx1NTMzQVx1NTdERjogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBcdThCRjdcdTUxNDhcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcdUZGMENcdTU3MjhcdTU3MzBcdTU2RkVcdTRFMEFcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcdTRFRTVcdThCQkVcdTdGNkVcdTUxOUNcdTU3M0FcdTUzM0FcdTU3REZcIixcbiAgICBsb2dXaW5kb3c6ICdcdUQ4M0RcdURDQ0IgTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTY1RTVcdTVGRDdcdTdBOTdcdTUzRTMnLFxuICAgIGRvd25sb2FkTG9nczogJ1x1NEUwQlx1OEY3RFx1NjVFNVx1NUZENycsXG4gICAgY2xlYXJMb2dzOiAnXHU2RTA1XHU5NjY0XHU2NUU1XHU1RkQ3JyxcbiAgICBjbG9zZUxvZ3M6ICdcdTUxNzNcdTk1RUQnXG4gIH0sXG5cbiAgLy8gXHU1MTZDXHU1MTcxXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJcdTY2MkZcIixcbiAgICBubzogXCJcdTU0MjZcIixcbiAgICBvazogXCJcdTc4NkVcdThCQTRcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgY2xvc2U6IFwiXHU1MTczXHU5NUVEXCIsXG4gICAgc2F2ZTogXCJcdTRGRERcdTVCNThcIixcbiAgICBsb2FkOiBcIlx1NTJBMFx1OEY3RFwiLFxuICAgIGRlbGV0ZTogXCJcdTUyMjBcdTk2NjRcIixcbiAgICBlZGl0OiBcIlx1N0YxNlx1OEY5MVwiLFxuICAgIHN0YXJ0OiBcIlx1NUYwMFx1NTlDQlwiLFxuICAgIHN0b3A6IFwiXHU1MDVDXHU2QjYyXCIsXG4gICAgcGF1c2U6IFwiXHU2NjgyXHU1MDVDXCIsXG4gICAgcmVzdW1lOiBcIlx1N0VFN1x1N0VFRFwiLFxuICAgIHJlc2V0OiBcIlx1OTFDRFx1N0Y2RVwiLFxuICAgIHNldHRpbmdzOiBcIlx1OEJCRVx1N0Y2RVwiLFxuICAgIGhlbHA6IFwiXHU1RTJFXHU1MkE5XCIsXG4gICAgYWJvdXQ6IFwiXHU1MTczXHU0RThFXCIsXG4gICAgbGFuZ3VhZ2U6IFwiXHU4QkVEXHU4QTAwXCIsXG4gICAgbG9hZGluZzogXCJcdTUyQTBcdThGN0RcdTRFMkQuLi5cIixcbiAgICBlcnJvcjogXCJcdTk1MTlcdThCRUZcIixcbiAgICBzdWNjZXNzOiBcIlx1NjIxMFx1NTI5RlwiLFxuICAgIHdhcm5pbmc6IFwiXHU4QjY2XHU1NDRBXCIsXG4gICAgaW5mbzogXCJcdTRGRTFcdTYwNkZcIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiXHU4QkVEXHU4QTAwXHU1REYyXHU1MjA3XHU2MzYyXHU0RTNBIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIFx1NUI4OFx1NjJBNFx1NkEyMVx1NTc1N1xuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyQThcdTVCODhcdTYyQTRcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1NUI4OFx1NjJBNFx1NjczQVx1NTY2OFx1NEVCQVwiLFxuICAgIHNlbGVjdEFyZWE6IFwiXHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiXHU2MzU1XHU4M0I3XHU1MzNBXHU1N0RGXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIlx1NUYwMFx1NTlDQlx1NUI4OFx1NjJBNFwiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIlx1NTA1Q1x1NkI2Mlx1NUI4OFx1NjJBNFwiLFxuICAgIHVwcGVyTGVmdDogXCJcdTVERTZcdTRFMEFcdTg5RDJcIixcbiAgICBsb3dlclJpZ2h0OiBcIlx1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJcdTUzRDdcdTRGRERcdTYyQTRcdTUwQ0ZcdTdEMjBcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiXHU2OEMwXHU2RDRCXHU1MjMwXHU3Njg0XHU1M0Q4XHU1MzE2XCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiXHU0RkVFXHU1OTBEXHU3Njg0XHU1MENGXHU3RDIwXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzBcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTdCNDlcdTVGODVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggXHU2OEMwXHU2N0U1XHU1M0VGXHU3NTI4XHU5ODlDXHU4MjcyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU5ODlDXHU4MjcyXHVGRjBDXHU4QkY3XHU1NzI4XHU3RjUxXHU3QUQ5XHU0RTBBXHU2MjUzXHU1RjAwXHU4QzAzXHU4MjcyXHU2NzdGXHUzMDAyXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1NjI3RVx1NTIzMCB7Y291bnR9IFx1NzlDRFx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3MlwiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTVCODhcdTYyQTRcdTY3M0FcdTU2NjhcdTRFQkFcdTUyMURcdTU5Q0JcdTUzMTZcdTYyMTBcdTUyOUZcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIFx1NUI4OFx1NjJBNFx1NjczQVx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NTkzMVx1OEQyNVwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIFx1NTc1MFx1NjgwN1x1NjVFMFx1NjU0OFwiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBcdTUzM0FcdTU3REZcdTY1RTBcdTY1NDhcdUZGMENcdTVERTZcdTRFMEFcdTg5RDJcdTVGQzVcdTk4N0JcdTVDMEZcdTRFOEVcdTUzRjNcdTRFMEJcdTg5RDJcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFx1NTMzQVx1NTdERlx1OEZDN1x1NTkyNzoge3NpemV9IFx1NTBDRlx1N0QyMCAoXHU2NzAwXHU1OTI3OiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBcdTYzNTVcdTgzQjdcdTVCODhcdTYyQTRcdTUzM0FcdTU3REZcdTRFMkQuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1NTMzQVx1NTdERlx1NjM1NVx1ODNCN1x1NjIxMFx1NTI5Rjoge2NvdW50fSBcdTUwQ0ZcdTdEMjBcdTUzRDdcdTRGRERcdTYyQTRcIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIFx1NjM1NVx1ODNCN1x1NTMzQVx1NTdERlx1NTFGQVx1OTUxOToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgXHU4QkY3XHU1MTQ4XHU2MzU1XHU4M0I3XHU0RTAwXHU0RTJBXHU1Qjg4XHU2MkE0XHU1MzNBXHU1N0RGXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NUI4OFx1NjJBNFx1NURGMlx1NTQyRlx1NTJBOCAtIFx1NTMzQVx1NTdERlx1NzZEMVx1NjNBN1x1NEUyRFwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTVCODhcdTYyQTRcdTVERjJcdTUwNUNcdTZCNjJcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFx1NTMzQVx1NTdERlx1NUI4OVx1NTE2OCAtIFx1NjcyQVx1NjhDMFx1NkQ0Qlx1NTIzMFx1NTNEOFx1NTMxNlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTggXHU2OEMwXHU2RDRCXHU1MjMwIHtjb3VudH0gXHU0RTJBXHU1M0Q4XHU1MzE2XCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBcdTZCNjNcdTU3MjhcdTRGRUVcdTU5MEQge2NvdW50fSBcdTRFMkFcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NURGMlx1NjIxMFx1NTI5Rlx1NEZFRVx1NTkwRCB7Y291bnR9IFx1NEUyQVx1NTBDRlx1N0QyMFwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBcdTRGRUVcdTU5MERcdTUxRkFcdTk1MTk6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFx1NkIyMVx1NjU3MFx1NEUwRFx1OERCM1x1RkYwQ1x1NjVFMFx1NkNENVx1NEZFRVx1NTkwRFwiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2OEMwXHU2N0U1XHU1MzNBXHU1N0RGXHU1M0Q4XHU1MzE2Li4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgXHU2OEMwXHU2N0U1XHU1MUZBXHU5NTE5OiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NUI4OFx1NjJBNFx1NEUyRCAtIFx1NTMzQVx1NTdERlx1NTNEN1x1NEZERFx1NjJBNFwiLFxuICAgIGxhc3RDaGVjazogXCJcdTRFMEFcdTZCMjFcdTY4QzBcdTY3RTU6IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJcdTRFMEJcdTZCMjFcdTY4QzBcdTY3RTU6IHt0aW1lfSBcdTc5RDJcdTU0MEVcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTZCNjNcdTU3MjhcdTgxRUFcdTUyQThcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1ODFFQVx1NTJBOFx1NTQyRlx1NTJBOFx1NjIxMFx1NTI5RlwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTY1RTBcdTZDRDVcdTgxRUFcdTUyQThcdTU0MkZcdTUyQThcdUZGMENcdThCRjdcdTYyNEJcdTUyQThcdTY0Q0RcdTRGNUNcdTMwMDJcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2OEMwXHU2RDRCXHU1MjMwXHU4QzAzXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThDMDNcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTcwQjlcdTUxRkJcdTdFRDhcdTUyMzZcdTYzMDlcdTk0QUUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFRDhcdTUyMzZcdTYzMDlcdTk0QUVcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFx1NTcyOFx1OTcwMFx1ODk4MVx1NEZERFx1NjJBNFx1NTMzQVx1NTdERlx1NzY4NFx1NURFNlx1NEUwQVx1ODlEMlx1NkQ4Mlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIFx1NzNCMFx1NTcyOFx1NTcyOFx1NTNGM1x1NEUwQlx1ODlEMlx1NkQ4Mlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTAwOVx1NjJFOVx1NURFNlx1NEUwQVx1ODlEMi4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTkwMDlcdTYyRTlcdTUzRjNcdTRFMEJcdTg5RDIuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgXHU1REYyXHU2MzU1XHU4M0I3XHU1REU2XHU0RTBBXHU4OUQyOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTgzQjdcdTUzRjNcdTRFMEJcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTkwMDlcdTYyRTlcdThEODVcdTY1RjZcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgXHU5MDA5XHU2MkU5XHU1MUZBXHU5NTE5XHVGRjBDXHU4QkY3XHU5MUNEXHU4QkQ1XCIsXG4gICAgbG9nV2luZG93OiAnXHVEODNEXHVEQ0NCIExvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHU2NUU1XHU1RkQ3XHU3QTk3XHU1M0UzJyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTRFMEJcdThGN0RcdTY1RTVcdTVGRDcnLFxuICAgIGNsZWFyTG9nczogJ1x1NkUwNVx1OTY2NFx1NjVFNVx1NUZENycsXG4gICAgY2xvc2VMb2dzOiAnXHU1MTczXHU5NUVEJ1xuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCB6aEhhbnQgPSB7XG4gIC8vIFx1NTU1M1x1NTJENVx1NTY2OFxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIFx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQScsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgXHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0JyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2JyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgXHU4MUVBXHU1MkQ1XHU1Qjg4XHU4Qjc3JyxcbiAgICBzZWxlY3Rpb246ICdcdTkwNzhcdTY0QzcnLFxuICAgIHVzZXI6ICdcdTc1MjhcdTYyMzcnLFxuICAgIGNoYXJnZXM6ICdcdTZCMjFcdTY1NzgnLFxuICAgIGJhY2tlbmQ6ICdcdTVGOENcdTdBRUYnLFxuICAgIGRhdGFiYXNlOiAnXHU2NTc4XHU2NERBXHU1RUFCJyxcbiAgICB1cHRpbWU6ICdcdTkwNEJcdTg4NENcdTY2NDJcdTk1OTMnLFxuICAgIGNsb3NlOiAnXHU5NURDXHU5NTg5JyxcbiAgICBsYXVuY2g6ICdcdTU1NTNcdTUyRDUnLFxuICAgIGxvYWRpbmc6ICdcdTUyQTBcdThGMDlcdTRFMkRcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ1x1NTdGN1x1ODg0Q1x1NEUyRFx1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdcdTZCNjNcdTU3MjhcdTRFMEJcdThGMDlcdTgxNzNcdTY3MkNcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ1x1OTA3OFx1NjRDN1x1NEUwMFx1NTAwQlx1NkE1Rlx1NTY2OFx1NEVCQVx1NEUyNlx1OUVERVx1NjRDQVx1NTU1M1x1NTJENScsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1x1NkU5Nlx1NTA5OVx1NTU1M1x1NTJENScsXG4gICAgbG9hZEVycm9yOiAnXHU1MkEwXHU4RjA5XHU5MzJGXHU4QUE0JyxcbiAgICBsb2FkRXJyb3JNc2c6ICdcdTcxMjFcdTZDRDVcdTUyQTBcdThGMDlcdTYyNDBcdTkwNzhcdTZBNUZcdTU2NjhcdTRFQkFcdTMwMDJcdThBQ0JcdTZBQTJcdTY3RTVcdTdEQjJcdTdENjFcdTkwMjNcdTYzQTVcdTYyMTZcdTkxQ0RcdThBNjZcdTMwMDInLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFx1NkFBMlx1NjdFNVx1NEUyRC4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIFx1NTcyOFx1N0REQScsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBcdTk2RTJcdTdEREEnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIFx1NkI2M1x1NUUzOCcsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgXHU5MzJGXHU4QUE0JyxcbiAgICB1bmtub3duOiAnLScsXG4gICAgbG9nV2luZG93OiAnXHVEODNEXHVEQ0NCIExvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHU2NUU1XHU4QThDXHU4OTk2XHU3QTk3JyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTRFMEJcdThGMDlcdTY1RTVcdThBOEMnLFxuICAgIGNsZWFyTG9nczogJ1x1NkUwNVx1OTY2NFx1NjVFNVx1OEE4QycsXG4gICAgY2xvc2VMb2dzOiAnXHU5NURDXHU5NTg5J1xuICB9LFxuXG4gIC8vIFx1N0U2QVx1NTcxNlx1NkEyMVx1NTg0QVxuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTZcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1NEUwQVx1NTBCM1x1NTcxNlx1NzI0N1wiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1OEFCRlx1NjU3NFx1NTcxNlx1NzI0N1x1NTkyN1x1NUMwRlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTA3OFx1NjRDN1x1NEY0RFx1N0Y2RVwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiXHU5NThCXHU1OUNCXHU3RTZBXHU4OEZEXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1NTA1Q1x1NkI2Mlx1N0U2QVx1ODhGRFwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiXHU1MkEwXHU4RjA5XHU5MDMyXHU1RUE2XCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1NkFBMlx1NjdFNVx1NTNFRlx1NzUyOFx1OTg0Rlx1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1OEFDQlx1NTcyOFx1N0RCMlx1N0FEOVx1NEUwQVx1NjI1M1x1OTU4Qlx1OEFCRlx1ODI3Mlx1Njc3Rlx1NUY4Q1x1OTFDRFx1OEE2Nlx1RkYwMVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTdBMkVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzJcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIFx1NkI2M1x1NTcyOFx1NTJBMFx1OEYwOVx1NTcxNlx1NzI0Ny4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTU3MTZcdTcyNDdcdTVERjJcdTUyQTBcdThGMDlcdUZGMENcdTY3MDlcdTY1NDhcdTUwQ0ZcdTdEMjAge2NvdW50fSBcdTUwMEJcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTU3MTZcdTcyNDdcdTUyQTBcdThGMDlcdTU5MzFcdTY1NTdcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1OEFDQlx1NTcyOFx1NEY2MFx1NjBGM1x1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRFx1NzY4NFx1NTczMFx1NjVCOVx1NTg1N1x1N0IyQ1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1RkYwMVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU1ODU3XHU1M0MzXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NEY0RFx1N0Y2RVx1OEEyRFx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU5MDc4XHU2NEM3XHU4RDg1XHU2NjQyXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU0RjREXHU3RjZFXHVGRjBDXHU4NjU1XHU3NDA2XHU0RTJELi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU2QUEyXHU2RTJDXHU1OTMxXHU2NTU3XHVGRjBDXHU4QUNCXHU5MUNEXHU4QTY2XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHU5NThCXHU1OUNCXHU3RTZBXHU4OEZELi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHU5MDMyXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIFx1NkM5Mlx1NjcwOVx1NkIyMVx1NjU3OFx1MzAwMlx1N0I0OVx1NUY4NSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NzUyOFx1NjIzN1x1NURGMlx1NTA1Q1x1NkI2Mlx1N0U2QVx1ODhGRFwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1N0U2QVx1ODhGRFx1NUI4Q1x1NjIxMFx1RkYwMVx1NTE3MVx1N0U2QVx1ODhGRCB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMFx1MzAwMlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIFx1N0U2QVx1ODhGRFx1OTA0RVx1N0EwQlx1NEUyRFx1NTFGQVx1OTMyRlwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIFx1OEFDQlx1NTE0OFx1NTJBMFx1OEYwOVx1NTcxNlx1NzI0N1x1NEUyNlx1OTA3OFx1NjRDN1x1NEY0RFx1N0Y2RVwiLFxuICAgIHByb2dyZXNzOiBcIlx1OTAzMlx1NUVBNlwiLFxuICAgIHVzZXJOYW1lOiBcIlx1NzUyOFx1NjIzN1wiLFxuICAgIHBpeGVsczogXCJcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiXHU5ODEwXHU4QTA4XHU2NjQyXHU5NTkzXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHU5RURFXHU2NENBXHUyMDFDXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBXHUyMDFEXHU5NThCXHU1OUNCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgXHU1NzE2XHU3MjQ3XHU1REYyXHU4QUJGXHU2NTc0XHU3MEJBIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHU3RTZBXHU4OEZEXHU2NkFCXHU1MDVDXHU2NUJDXHU0RjREXHU3RjZFIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXHU2NTc4XCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1NjI3OVx1NkIyMVx1NTkyN1x1NUMwRlwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHU0RTBCXHU2QjIxXHU2Mjc5XHU2QjIxXHU2NjQyXHU5NTkzXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTRGN0ZcdTc1MjhcdTYyNDBcdTY3MDlcdTUzRUZcdTc1MjhcdTZCMjFcdTY1NzhcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTk4NkZcdTc5M0FcdTg5ODZcdTg0Q0JcdTVDNjRcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1NkJDRlx1NjI3OVx1NjcwMFx1NTkyN1x1NkIyMVx1NjU3OFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1Nzg6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiXHU1MjY5XHU5OTE4XHU2NjQyXHU5NTkzXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTdCNDlcdTVGODUge3RpbWV9IFx1NUY4Q1x1N0U3Q1x1N0U4Qy4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1OTAzMlx1NUVBNlx1NURGMlx1NEZERFx1NUI1OFx1NzBCQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1NURGMlx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwXHU1REYyXHU3RTZBXHU4OEZEXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNlx1NTkzMVx1NjU1Nzoge2Vycm9yfVwiLFxuIFxuICAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgXHU0RkREXHU1QjU4XHU5MDMyXHU1RUE2XHU1OTMxXHU2NTU3OiB7ZXJyb3J9XCIsXG5cbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1NTcyOFx1NTA1Q1x1NkI2Mlx1NEU0Qlx1NTI0RFx1ODk4MVx1NEZERFx1NUI1OFx1NzU3Nlx1NTI0RFx1OTAzMlx1NUVBNlx1NTVDRVx1RkYxRlwiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1NEZERFx1NUI1OFx1OTAzMlx1NUVBNlwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTY1M0VcdTY4QzRcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgbWluaW1pemU6IFwiXHU2NzAwXHU1QzBGXHU1MzE2XCIsXG4gICAgd2lkdGg6IFwiXHU1QkVDXHU1RUE2XCIsXG4gICAgaGVpZ2h0OiBcIlx1OUFEOFx1NUVBNlwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHU0RkREXHU2MzAxXHU3RTMxXHU2QTZCXHU2QkQ0XCIsXG4gICAgYXBwbHk6IFwiXHU2MUM5XHU3NTI4XCIsXG4gICAgb3ZlcmxheU9uOiBcIlx1ODk4Nlx1ODRDQlx1NUM2NDogXHU5NThCXHU1NTUzXCIsXG4gICAgb3ZlcmxheU9mZjogXCJcdTg5ODZcdTg0Q0JcdTVDNjQ6IFx1OTVEQ1x1OTU4OVwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1NjI3OVx1NkIyMVx1NUI4Q1x1NjIxMDogXHU1REYyXHU3RTZBXHU4OEZEIHtwYWludGVkfSBcdTUwQ0ZcdTdEMjAgfCBcdTkwMzJcdTVFQTY6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3OFx1NjA2Mlx1NUZBOToge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU2NjQyXHU5NTkzOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTc4OiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTUyNjlcdTk5MTg6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkQ1XHU1NTUzXHU1MkQ1XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NzEyMVx1NkNENVx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1RkYwQ1x1OEFDQlx1NjI0Qlx1NTJENVx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThBQkZcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTlFREVcdTY0Q0FcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTVcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHU5MUNEXHU4QTY2IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9XHVGRjBDXHU3QjQ5XHU1Rjg1IHtkZWxheX0gXHU3OUQyLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHU3QjJDIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NTYxN1x1OEE2Nlx1NTFGQVx1OTMyRlx1RkYwQ1x1NUMwN1x1NTcyOCB7ZGVsYXl9IFx1NzlEMlx1NUY4Q1x1OTFDRFx1OEE2Ni4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBcdThEODVcdTkwNEUge21heEF0dGVtcHRzfSBcdTZCMjFcdTU2MTdcdThBNjZcdTU5MzFcdTY1NTdcdTMwMDJcdTdFN0NcdTdFOENcdTRFMEJcdTRFMDBcdTYyNzkuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIFx1N0RCMlx1N0Q2MVx1OTMyRlx1OEFBNFx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEE2Ni4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTY3MERcdTUyRDlcdTU2NjhcdTkzMkZcdThBQTRcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1NEYzQVx1NjcwRFx1NTY2OFx1OTAzRVx1NjY0Mlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEE2Ni4uLlwiLFxuICAgIC8vIHYyLjAgLSBcdTRGRERcdThCNzdcdTgyMDdcdTdFNkFcdTg4RkRcdTZBMjFcdTVGMEZcbiAgICBwcm90ZWN0aW9uRW5hYmxlZDogXCJcdTVERjJcdTU1NUZcdTc1MjhcdTRGRERcdThCNzdcIixcbiAgICBwcm90ZWN0aW9uRGlzYWJsZWQ6IFwiXHU1REYyXHU1MDVDXHU3NTI4XHU0RkREXHU4Qjc3XCIsXG4gICAgcGFpbnRQYXR0ZXJuOiBcIlx1N0U2QVx1ODhGRFx1NkEyMVx1NUYwRlwiLFxuICAgIHBhdHRlcm5MaW5lYXJTdGFydDogXCJcdTdEREFcdTYwMjdcdUZGMDhcdThENzdcdTlFREVcdUZGMDlcIixcbiAgICBwYXR0ZXJuTGluZWFyRW5kOiBcIlx1N0REQVx1NjAyN1x1RkYwOFx1N0Q0Mlx1OUVERVx1RkYwOVwiLFxuICAgIHBhdHRlcm5SYW5kb206IFwiXHU5NkE4XHU2QTVGXCIsXG4gICAgcGF0dGVybkNlbnRlck91dDogXCJcdTc1MzFcdTRFMkRcdTVGQzNcdTU0MTFcdTU5MTZcIixcbiAgICBwYXR0ZXJuQ29ybmVyc0ZpcnN0OiBcIlx1NTE0OFx1ODlEMlx1ODQzRFwiLFxuICAgIHBhdHRlcm5TcGlyYWw6IFwiXHU4N0JBXHU2NUNCXCIsXG4gICAgc29saWQ6IFwiXHU1QkU2XHU1RkMzXCIsXG4gICAgc3RyaXBlczogXCJcdTY4OURcdTdEMEJcIixcbiAgICBjaGVja2VyYm9hcmQ6IFwiXHU2OENCXHU3NkU0XHU2ODNDXCIsXG4gICAgZ3JhZGllbnQ6IFwiXHU2RjM4XHU1QzY0XCIsXG4gICAgZG90czogXCJcdTlFREVcdTcyQzBcIixcbiAgICB3YXZlczogXCJcdTZDRTJcdTZENkFcIixcbiAgICBzcGlyYWw6IFwiXHU4N0JBXHU2NUNCXCIsXG4gICAgbW9zYWljOiBcIlx1OTlBQ1x1OENGRFx1NTE0QlwiLFxuICAgIGJyaWNrczogXCJcdTc4REFcdTU4NEFcIixcbiAgICB6aWd6YWc6IFwiXHU0RTRCXHU1QjU3XHU1RjYyXCIsXG4gICAgcHJvdGVjdGluZ0RyYXdpbmc6IFwiXHU2QjYzXHU1NzI4XHU0RkREXHU4Qjc3XHU3RTZBXHU1NzE2Li4uXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTUwNzVcdTZFMkNcdTUyMzAge2NvdW50fSBcdTg2NTVcdThCOEFcdTY2RjRcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERDI3IFx1NkI2M1x1NTcyOFx1NEZFRVx1NUZBOSB7Y291bnR9IFx1NTAwQlx1OEI4QVx1NjZGNFx1NzY4NFx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHJlcGFpckNvbXBsZXRlZDogXCJcdTI3MDUgXHU0RkVFXHU1RkE5XHU1QjhDXHU2MjEwXHVGRjFBe2NvdW50fSBcdTUwMEJcdTUwQ0ZcdTdEMjBcIixcbiAgICBub0NoYXJnZXNGb3JSZXBhaXI6IFwiXHUyNkExIFx1NEZFRVx1NUZBOVx1NEUwRFx1NkQ4OFx1ODAxN1x1OUVERVx1NjU3OFx1RkYwQ1x1N0I0OVx1NUY4NVx1NEUyRC4uLlwiLFxuICAgIHByb3RlY3Rpb25Qcmlvcml0eTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1REYyXHU1NTVGXHU3NTI4XHU0RkREXHU4Qjc3XHU1MTJBXHU1MTQ4XCIsXG4gICAgcGF0dGVybkFwcGxpZWQ6IFwiXHU1REYyXHU1OTU3XHU3NTI4XHU2QTIxXHU1RjBGXCIsXG4gICAgY3VzdG9tUGF0dGVybjogXCJcdTgxRUFcdThBMDJcdTZBMjFcdTVGMEZcIixcbiAgICBsb2dXaW5kb3c6ICdcdUQ4M0RcdURDQ0IgTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTY1RTVcdThBOENcdTg5OTZcdTdBOTcnLFxuICAgIGRvd25sb2FkTG9nczogJ1x1NEUwQlx1OEYwOVx1NjVFNVx1OEE4QycsXG4gICAgY2xlYXJMb2dzOiAnXHU2RTA1XHU5NjY0XHU2NUU1XHU4QThDJyxcbiAgICBjbG9zZUxvZ3M6ICdcdTk1RENcdTk1ODknXG4gIH0sXG5cbiAgLy8gXHU4RkIyXHU1ODM0XHU2QTIxXHU1ODRBXHVGRjA4XHU1Rjg1XHU1QkU2XHU3M0ZFXHVGRjA5XG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4RkIyXHU1ODM0XHU2QTVGXHU1NjY4XHU0RUJBXCIsXG4gICAgc3RhcnQ6IFwiXHU5NThCXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBzdG9wcGVkOiBcIlx1NkE1Rlx1NTY2OFx1NEVCQVx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIGNhbGlicmF0ZTogXCJcdTY4MjFcdTZFOTZcIixcbiAgICBwYWludE9uY2U6IFwiXHU0RTAwXHU2QjIxXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiXHU2QUEyXHU2N0U1XHU3MkMwXHU2MTRCXHU0RTJELi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTkxNERcdTdGNkVcIixcbiAgICBkZWxheTogXCJcdTVFRjZcdTkwNzIgKFx1NkJFQlx1NzlEMilcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcIixcbiAgICBtaW5DaGFyZ2VzOiBcIlx1NjcwMFx1NUMxMVx1NkIyMVx1NjU3OFwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTk4NEZcdTgyNzJcdTZBMjFcdTVGMEZcIixcbiAgICByYW5kb206IFwiXHU5NkE4XHU2QTVGXCIsXG4gICAgZml4ZWQ6IFwiXHU1NkZBXHU1QjlBXCIsXG4gICAgcmFuZ2U6IFwiXHU3QkM0XHU1NzBEXCIsXG4gICAgZml4ZWRDb2xvcjogXCJcdTU2RkFcdTVCOUFcdTk4NEZcdTgyNzJcIixcbiAgICBhZHZhbmNlZDogXCJcdTlBRDhcdTdEMUFcIixcbiAgICB0aWxlWDogXCJcdTc0RTZcdTcyNDcgWFwiLFxuICAgIHRpbGVZOiBcIlx1NzRFNlx1NzI0NyBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTgxRUFcdTVCOUFcdTdGQTlcdThBQkZcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTRGOEJcdTU5ODI6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTYzNTVcdTczNzJcIixcbiAgICBwYWludGVkOiBcIlx1NURGMlx1N0U2QVx1ODhGRFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTc4XCIsXG4gICAgcmV0cmllczogXCJcdTkxQ0RcdThBNjZcIixcbiAgICB0aWxlOiBcIlx1NzRFNlx1NzI0N1wiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NEZERFx1NUI1OFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTUyQTBcdThGMDlcIixcbiAgICBjb25maWdSZXNldDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTkxQ0RcdTdGNkVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlx1OEFDQlx1NjI0Qlx1NTJENVx1N0U2QVx1ODhGRFx1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1NEVFNVx1NjM1NVx1NzM3Mlx1NUVBN1x1NkExOS4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHU1RjhDXHU3QUVGXHU1NzI4XHU3RERBXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiXHU1RjhDXHU3QUVGXHU5NkUyXHU3RERBXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1NTUzXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1MDVDXHU2QjYyXHU2QTVGXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHU2ODIxXHU2RTk2XHU0RTJELi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0XHU1REYyXHU1NzI4XHU5MDRCXHU4ODRDXHUzMDAyXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTZcdTZCNjNcdTU3MjhcdTkwNEJcdTg4NENcdUZGMENcdThBQ0JcdTUxNDhcdTk1RENcdTk1ODlcdTUxOERcdTU1NTNcdTUyRDVcdTgxRUFcdTUyRDVcdThGQjJcdTU4MzRcdTMwMDJcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTU3MzBcdTU3MTZcdTc2ODRcdTdBN0FcdTc2N0RcdTUzNDBcdTU3REZcdTU4NTdcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTRFRTVcdThBMkRcdTdGNkVcdThGQjJcdTU4MzRcdTUzNDBcdTU3REZcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NTg1N1x1NTNDM1x1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTUzNDBcdTU3REZcdThBMkRcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcdTUzNEFcdTVGOTE6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTUzNDBcdTU3REZcdTkwNzhcdTY0QzdcdThEODVcdTY2NDJcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1OEFDQlx1NTE0OFx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1RkYwOFx1NEY3Rlx1NzUyOFx1MjAxQ1x1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1MjAxRFx1NjMwOVx1OTIxNVx1RkYwOVwiLFxuICAgIGZhcm1SYWRpdXM6IFwiXHU4RkIyXHU1ODM0XHU1MzRBXHU1RjkxXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1NzU3Nlx1NTI0RFx1NTM0MFx1NTdERlwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHU2QjYzXHU1NzI4XHU0RUU1XHU1MzRBXHU1RjkxIHtyYWRpdXN9cHggXHU1NzI4ICh7eH0se3l9KSBcdThGQjJcdTU4MzRcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIFx1OTFDRFx1ODk4MTogXHU4QUNCXHU5MDc4XHU2NEM3XHU3QTdBXHU3NjdEXHU1MzQwXHU1N0RGXHU0RUU1XHU5MDdGXHU1MTREXHU4ODVEXHU3QTgxXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTY3MkFcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTUzNDBcdTU3REY6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHU4QUNCXHU1MTQ4XHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXHVGRjBDXHU1NzI4XHU1NzMwXHU1NzE2XHU0RTBBXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXHU0RUU1XHU4QTJEXHU3RjZFXHU4RkIyXHU1ODM0XHU1MzQwXHU1N0RGXCIsXG4gICAgbG9nV2luZG93OiAnXHVEODNEXHVEQ0NCIExvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHU2NUU1XHU4QThDXHU4OTk2XHU3QTk3JyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTRFMEJcdThGMDlcdTY1RTVcdThBOEMnLFxuICAgIGNsZWFyTG9nczogJ1x1NkUwNVx1OTY2NFx1NjVFNVx1OEE4QycsXG4gICAgY2xvc2VMb2dzOiAnXHU5NURDXHU5NTg5J1xuICB9LFxuXG4gIC8vIFx1NTE2Q1x1NTE3MVxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiXHU2NjJGXCIsXG4gICAgbm86IFwiXHU1NDI2XCIsXG4gICAgb2s6IFwiXHU3OEJBXHU4QThEXCIsXG4gICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgIGNsb3NlOiBcIlx1OTVEQ1x1OTU4OVwiLFxuICAgIHNhdmU6IFwiXHU0RkREXHU1QjU4XCIsXG4gICAgbG9hZDogXCJcdTUyQTBcdThGMDlcIixcbiAgICBkZWxldGU6IFwiXHU1MjJBXHU5NjY0XCIsXG4gICAgZWRpdDogXCJcdTdERThcdThGMkZcIixcbiAgICBzdGFydDogXCJcdTk1OEJcdTU5Q0JcIixcbiAgICBzdG9wOiBcIlx1NTA1Q1x1NkI2MlwiLFxuICAgIHBhdXNlOiBcIlx1NjZBQlx1NTA1Q1wiLFxuICAgIHJlc3VtZTogXCJcdTdFN0NcdTdFOENcIixcbiAgICByZXNldDogXCJcdTkxQ0RcdTdGNkVcIixcbiAgICBzZXR0aW5nczogXCJcdThBMkRcdTdGNkVcIixcbiAgICBoZWxwOiBcIlx1NUU2Qlx1NTJBOVwiLFxuICAgIGFib3V0OiBcIlx1OTVEQ1x1NjVCQ1wiLFxuICAgIGxhbmd1YWdlOiBcIlx1OEE5RVx1OEEwMFwiLFxuICAgIGxvYWRpbmc6IFwiXHU1MkEwXHU4RjA5XHU0RTJELi4uXCIsXG4gICAgZXJyb3I6IFwiXHU5MzJGXHU4QUE0XCIsXG4gICAgc3VjY2VzczogXCJcdTYyMTBcdTUyOUZcIixcbiAgICB3YXJuaW5nOiBcIlx1OEI2Nlx1NTQ0QVwiLFxuICAgIGluZm86IFwiXHU0RkUxXHU2MDZGXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIlx1OEE5RVx1OEEwMFx1NURGMlx1NTIwN1x1NjNEQlx1NzBCQSB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBcdTVCODhcdThCNzdcdTZBMjFcdTU4NEFcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4MUVBXHU1MkQ1XHU1Qjg4XHU4Qjc3XCIsXG4gICAgaW5pdEJvdDogXCJcdTUyMURcdTU5Q0JcdTUzMTZcdTVCODhcdThCNzdcdTZBNUZcdTU2NjhcdTRFQkFcIixcbiAgICBzZWxlY3RBcmVhOiBcIlx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIlx1NjM1NVx1NzM3Mlx1NTM0MFx1NTdERlwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJcdTk1OEJcdTU5Q0JcdTVCODhcdThCNzdcIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJcdTUwNUNcdTZCNjJcdTVCODhcdThCNzdcIixcbiAgICB1cHBlckxlZnQ6IFwiXHU1REU2XHU0RTBBXHU4OUQyXCIsXG4gICAgbG93ZXJSaWdodDogXCJcdTUzRjNcdTRFMEJcdTg5RDJcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiXHU1M0Q3XHU0RkREXHU4Qjc3XHU1MENGXHU3RDIwXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIlx1NkFBMlx1NkUyQ1x1NTIzMFx1NzY4NFx1OEI4QVx1NTMxNlwiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlx1NEZFRVx1NUZBOVx1NzY4NFx1NTBDRlx1N0QyMFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTc4XCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFx1NkFBMlx1NjdFNVx1NTNFRlx1NzUyOFx1OTg0Rlx1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1OTg0Rlx1ODI3Mlx1RkYwQ1x1OEFDQlx1NTcyOFx1N0RCMlx1N0FEOVx1NEUwQVx1NjI1M1x1OTU4Qlx1OEFCRlx1ODI3Mlx1Njc3Rlx1MzAwMlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTdBMkVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzJcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgXHU1Qjg4XHU4Qjc3XHU2QTVGXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU2MjEwXHU1MjlGXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBcdTVCODhcdThCNzdcdTZBNUZcdTU2NjhcdTRFQkFcdTUyMURcdTU5Q0JcdTUzMTZcdTU5MzFcdTY1NTdcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBcdTVFQTdcdTZBMTlcdTcxMjFcdTY1NDhcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgXHU1MzQwXHU1N0RGXHU3MTIxXHU2NTQ4XHVGRjBDXHU1REU2XHU0RTBBXHU4OUQyXHU1RkM1XHU5ODA4XHU1QzBGXHU2NUJDXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTUzNDBcdTU3REZcdTkwNEVcdTU5Mjc6IHtzaXplfSBcdTUwQ0ZcdTdEMjAgKFx1NjcwMFx1NTkyNzoge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggXHU2MzU1XHU3MzcyXHU1Qjg4XHU4Qjc3XHU1MzQwXHU1N0RGXHU0RTJELi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBcdTUzNDBcdTU3REZcdTYzNTVcdTczNzJcdTYyMTBcdTUyOUY6IHtjb3VudH0gXHU1MENGXHU3RDIwXHU1M0Q3XHU0RkREXHU4Qjc3XCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBcdTYzNTVcdTczNzJcdTUzNDBcdTU3REZcdTUxRkFcdTkzMkY6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIFx1OEFDQlx1NTE0OFx1NjM1NVx1NzM3Mlx1NEUwMFx1NTAwQlx1NUI4OFx1OEI3N1x1NTM0MFx1NTdERlwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVCODhcdThCNzdcdTVERjJcdTU1NTNcdTUyRDUgLSBcdTUzNDBcdTU3REZcdTc2RTNcdTYzQTdcdTRFMkRcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHU1Qjg4XHU4Qjc3XHU1REYyXHU1MDVDXHU2QjYyXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBcdTUzNDBcdTU3REZcdTVCODlcdTUxNjggLSBcdTY3MkFcdTZBQTJcdTZFMkNcdTUyMzBcdThCOEFcdTUzMTZcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IFx1NkFBMlx1NkUyQ1x1NTIzMCB7Y291bnR9IFx1NTAwQlx1OEI4QVx1NTMxNlwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgXHU2QjYzXHU1NzI4XHU0RkVFXHU1RkE5IHtjb3VudH0gXHU1MDBCXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBcdTVERjJcdTYyMTBcdTUyOUZcdTRGRUVcdTVGQTkge2NvdW50fSBcdTUwMEJcdTUwQ0ZcdTdEMjBcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgXHU0RkVFXHU1RkE5XHU1MUZBXHU5MzJGOiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBcdTZCMjFcdTY1NzhcdTRFMERcdThEQjNcdUZGMENcdTcxMjFcdTZDRDVcdTRGRUVcdTVGQTlcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NkFBMlx1NjdFNVx1NTM0MFx1NTdERlx1OEI4QVx1NTMxNi4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIFx1NkFBMlx1NjdFNVx1NTFGQVx1OTMyRjoge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVCODhcdThCNzdcdTRFMkQgLSBcdTUzNDBcdTU3REZcdTUzRDdcdTRGRERcdThCNzdcIixcbiAgICBsYXN0Q2hlY2s6IFwiXHU0RTBBXHU2QjIxXHU2QUEyXHU2N0U1OiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiXHU0RTBCXHU2QjIxXHU2QUEyXHU2N0U1OiB7dGltZX0gXHU3OUQyXHU1RjhDXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHU2QjYzXHU1NzI4XHU4MUVBXHU1MkQ1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTgxRUFcdTUyRDVcdTU1NTNcdTUyRDVcdTYyMTBcdTUyOUZcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHU3MTIxXHU2Q0Q1XHU4MUVBXHU1MkQ1XHU1NTUzXHU1MkQ1XHVGRjBDXHU4QUNCXHU2MjRCXHU1MkQ1XHU2NENEXHU0RjVDXHUzMDAyXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTZcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1NURGMlx1NkFBMlx1NkUyQ1x1NTIzMFx1OEFCRlx1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2NDFDXHU3RDIyXHU4QUJGXHU4MjcyXHU2NzdGLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHU2QjYzXHU1NzI4XHU5RURFXHU2NENBXHU3RTZBXHU4OEZEXHU2MzA5XHU5MjE1Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU3RTZBXHU4OEZEXHU2MzA5XHU5MjE1XCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTk3MDBcdTg5ODFcdTRGRERcdThCNzdcdTUzNDBcdTU3REZcdTc2ODRcdTVERTZcdTRFMEFcdTg5RDJcdTU4NTdcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBcdTczRkVcdTU3MjhcdTU3MjhcdTUzRjNcdTRFMEJcdTg5RDJcdTU4NTdcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTkwNzhcdTY0QzdcdTVERTZcdTRFMEFcdTg5RDIuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDc4XHU2NEM3XHU1M0YzXHU0RTBCXHU4OUQyLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1NzM3Mlx1NURFNlx1NEUwQVx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgXHU1REYyXHU2MzU1XHU3MzcyXHU1M0YzXHU0RTBCXHU4OUQyOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgXHU5MDc4XHU2NEM3XHU4RDg1XHU2NjQyXCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIFx1OTA3OFx1NjRDN1x1NTFGQVx1OTMyRlx1RkYwQ1x1OEFDQlx1OTFDRFx1OEE2NlwiLFxuICAgIGxvZ1dpbmRvdzogJ1x1RDgzRFx1RENDQiBMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1NjVFNVx1OEE4Q1x1ODk5Nlx1N0E5NycsXG4gICAgZG93bmxvYWRMb2dzOiAnXHU0RTBCXHU4RjA5XHU2NUU1XHU4QThDJyxcbiAgICBjbGVhckxvZ3M6ICdcdTZFMDVcdTk2NjRcdTY1RTVcdThBOEMnLFxuICAgIGNsb3NlTG9nczogJ1x1OTVEQ1x1OTU4OSdcbiAgfVxufTsiLCAiaW1wb3J0IHsgZXMgfSBmcm9tICcuL2VzLmpzJztcbmltcG9ydCB7IGVuIH0gZnJvbSAnLi9lbi5qcyc7XG5pbXBvcnQgeyBmciB9IGZyb20gJy4vZnIuanMnO1xuaW1wb3J0IHsgcnUgfSBmcm9tICcuL3J1LmpzJztcbmltcG9ydCB7IHpoSGFucyB9IGZyb20gJy4vemgtSGFucy5qcyc7XG5pbXBvcnQgeyB6aEhhbnQgfSBmcm9tICcuL3poLUhhbnQuanMnO1xuXG4vLyBJZGlvbWFzIGRpc3BvbmlibGVzXG5leHBvcnQgY29uc3QgQVZBSUxBQkxFX0xBTkdVQUdFUyA9IHtcbiAgZXM6IHsgbmFtZTogJ0VzcGFcdTAwRjFvbCcsIGZsYWc6ICdcdUQ4M0NcdURERUFcdUQ4M0NcdURERjgnLCBjb2RlOiAnZXMnIH0sXG4gIGVuOiB7IG5hbWU6ICdFbmdsaXNoJywgZmxhZzogJ1x1RDgzQ1x1RERGQVx1RDgzQ1x1RERGOCcsIGNvZGU6ICdlbicgfSxcbiAgZnI6IHsgbmFtZTogJ0ZyYW5cdTAwRTdhaXMnLCBmbGFnOiAnXHVEODNDXHVEREVCXHVEODNDXHVEREY3JywgY29kZTogJ2ZyJyB9LFxuICBydTogeyBuYW1lOiAnXHUwNDIwXHUwNDQzXHUwNDQxXHUwNDQxXHUwNDNBXHUwNDM4XHUwNDM5JywgZmxhZzogJ1x1RDgzQ1x1RERGN1x1RDgzQ1x1RERGQScsIGNvZGU6ICdydScgfSxcbiAgemhIYW5zOiB7IG5hbWU6ICdcdTdCODBcdTRGNTNcdTRFMkRcdTY1ODcnLCBmbGFnOiAnXHVEODNDXHVEREU4XHVEODNDXHVEREYzJywgY29kZTogJ3poLUhhbnMnIH0sXG4gIHpoSGFudDogeyBuYW1lOiAnXHU3RTQxXHU5QUQ0XHU0RTJEXHU2NTg3JywgZmxhZzogJ1x1RDgzQ1x1RERFOFx1RDgzQ1x1RERGMycsIGNvZGU6ICd6aC1IYW50JyB9XG59O1xuXG4vLyBUb2RhcyBsYXMgdHJhZHVjY2lvbmVzXG5jb25zdCB0cmFuc2xhdGlvbnMgPSB7XG4gIGVzLFxuICBlbixcbiAgZnIsXG4gIHJ1LFxuICB6aEhhbnMsXG4gIHpoSGFudFxufTtcblxuLy8gRXN0YWRvIGRlbCBpZGlvbWEgYWN0dWFsXG5sZXQgY3VycmVudExhbmd1YWdlID0gJ2VzJztcbmxldCBjdXJyZW50VHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zW2N1cnJlbnRMYW5ndWFnZV07XG5cbi8qKlxuICogRGV0ZWN0YSBlbCBpZGlvbWEgZGVsIG5hdmVnYWRvclxuICogQHJldHVybnMge3N0cmluZ30gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYSBkZXRlY3RhZG9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEJyb3dzZXJMYW5ndWFnZSgpIHtcbiAgY29uc3QgYnJvd3NlckxhbmcgPSB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckxhbmd1YWdlIHx8ICdlcyc7XG5cbiAgLy8gRXh0cmFlciBzb2xvIGVsIGNcdTAwRjNkaWdvIGRlbCBpZGlvbWEgKGVqOiAnZXMtRVMnIC0+ICdlcycpXG4gIGNvbnN0IGxhbmdDb2RlID0gYnJvd3Nlckxhbmcuc3BsaXQoJy0nKVswXS50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIFZlcmlmaWNhciBzaSB0ZW5lbW9zIHNvcG9ydGUgcGFyYSBlc3RlIGlkaW9tYVxuICBpZiAodHJhbnNsYXRpb25zW2xhbmdDb2RlXSkge1xuICAgIHJldHVybiBsYW5nQ29kZTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIGEgZXNwYVx1MDBGMW9sIHBvciBkZWZlY3RvXG4gIHJldHVybiAnZXMnO1xufVxuXG4vKipcbiAqIE9idGllbmUgZWwgaWRpb21hIGd1YXJkYWRvIChkZXNoYWJpbGl0YWRvIC0gbm8gdXNhciBsb2NhbFN0b3JhZ2UpXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTaWVtcHJlIHJldG9ybmEgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2F2ZWRMYW5ndWFnZSgpIHtcbiAgLy8gTm8gdXNhciBsb2NhbFN0b3JhZ2UgLSBzaWVtcHJlIHJldG9ybmFyIG51bGxcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogR3VhcmRhIGVsIGlkaW9tYSAoZGVzaGFiaWxpdGFkbyAtIG5vIHVzYXIgbG9jYWxTdG9yYWdlKVxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUxhbmd1YWdlKGxhbmdDb2RlKSB7XG4gIC8vIE5vIGd1YXJkYXIgZW4gbG9jYWxTdG9yYWdlIC0gZnVuY2lcdTAwRjNuIGRlc2hhYmlsaXRhZGFcbiAgcmV0dXJuO1xufVxuXG4vKipcbiAqIEluaWNpYWxpemEgZWwgc2lzdGVtYSBkZSBpZGlvbWFzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGluaWNpYWxpemFkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUxhbmd1YWdlKCkge1xuICAvLyBQcmlvcmlkYWQ6IGd1YXJkYWRvID4gbmF2ZWdhZG9yID4gZXNwYVx1MDBGMW9sXG4gIGNvbnN0IHNhdmVkTGFuZyA9IGdldFNhdmVkTGFuZ3VhZ2UoKTtcbiAgY29uc3QgYnJvd3NlckxhbmcgPSBkZXRlY3RCcm93c2VyTGFuZ3VhZ2UoKTtcblxuICBsZXQgc2VsZWN0ZWRMYW5nID0gJ2VzJzsgLy8gZmFsbGJhY2sgcG9yIGRlZmVjdG9cblxuICBpZiAoc2F2ZWRMYW5nICYmIHRyYW5zbGF0aW9uc1tzYXZlZExhbmddKSB7XG4gICAgc2VsZWN0ZWRMYW5nID0gc2F2ZWRMYW5nO1xuICB9IGVsc2UgaWYgKGJyb3dzZXJMYW5nICYmIHRyYW5zbGF0aW9uc1ticm93c2VyTGFuZ10pIHtcbiAgICBzZWxlY3RlZExhbmcgPSBicm93c2VyTGFuZztcbiAgfVxuXG4gIHNldExhbmd1YWdlKHNlbGVjdGVkTGFuZyk7XG4gIHJldHVybiBzZWxlY3RlZExhbmc7XG59XG5cbi8qKlxuICogQ2FtYmlhIGVsIGlkaW9tYSBhY3R1YWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nQ29kZSAtIENcdTAwRjNkaWdvIGRlbCBpZGlvbWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldExhbmd1YWdlKGxhbmdDb2RlKSB7XG4gIGlmICghdHJhbnNsYXRpb25zW2xhbmdDb2RlXSkge1xuICAgIGNvbnNvbGUud2FybihgSWRpb21hICcke2xhbmdDb2RlfScgbm8gZGlzcG9uaWJsZS4gVXNhbmRvICcke2N1cnJlbnRMYW5ndWFnZX0nYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3VycmVudExhbmd1YWdlID0gbGFuZ0NvZGU7XG4gIGN1cnJlbnRUcmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdO1xuICBzYXZlTGFuZ3VhZ2UobGFuZ0NvZGUpO1xuXG4gIC8vIEVtaXRpciBldmVudG8gcGVyc29uYWxpemFkbyBwYXJhIHF1ZSBsb3MgbVx1MDBGM2R1bG9zIHB1ZWRhbiByZWFjY2lvbmFyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuQ3VzdG9tRXZlbnQpIHtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93LkN1c3RvbUV2ZW50KCdsYW5ndWFnZUNoYW5nZWQnLCB7XG4gICAgICBkZXRhaWw6IHsgbGFuZ3VhZ2U6IGxhbmdDb2RlLCB0cmFuc2xhdGlvbnM6IGN1cnJlbnRUcmFuc2xhdGlvbnMgfVxuICAgIH0pKTtcbiAgfVxufVxuXG4vKipcbiAqIE9idGllbmUgZWwgaWRpb21hIGFjdHVhbFxuICogQHJldHVybnMge3N0cmluZ30gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYSBhY3R1YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRMYW5ndWFnZSgpIHtcbiAgcmV0dXJuIGN1cnJlbnRMYW5ndWFnZTtcbn1cblxuLyoqXG4gKiBPYnRpZW5lIGxhcyB0cmFkdWNjaW9uZXMgYWN0dWFsZXNcbiAqIEByZXR1cm5zIHtvYmplY3R9IE9iamV0byBjb24gdG9kYXMgbGFzIHRyYWR1Y2Npb25lcyBkZWwgaWRpb21hIGFjdHVhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFRyYW5zbGF0aW9ucygpIHtcbiAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGlvbnM7XG59XG5cbi8qKlxuICogT2J0aWVuZSB1biB0ZXh0byB0cmFkdWNpZG8gdXNhbmRvIG5vdGFjaVx1MDBGM24gZGUgcHVudG9cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBDbGF2ZSBkZWwgdGV4dG8gKGVqOiAnaW1hZ2UudGl0bGUnLCAnY29tbW9uLmNhbmNlbCcpXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zIC0gUGFyXHUwMEUxbWV0cm9zIHBhcmEgaW50ZXJwb2xhY2lcdTAwRjNuIChlajoge2NvdW50OiA1fSlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRleHRvIHRyYWR1Y2lkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gdChrZXksIHBhcmFtcyA9IHt9KSB7XG4gIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoJy4nKTtcbiAgbGV0IHZhbHVlID0gY3VycmVudFRyYW5zbGF0aW9ucztcblxuICAvLyBOYXZlZ2FyIHBvciBsYSBlc3RydWN0dXJhIGRlIG9iamV0b3NcbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBrIGluIHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlW2tdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oYENsYXZlIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlbmNvbnRyYWRhOiAnJHtrZXl9J2ApO1xuICAgICAgcmV0dXJuIGtleTsgLy8gUmV0b3JuYXIgbGEgY2xhdmUgY29tbyBmYWxsYmFja1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgY29uc29sZS53YXJuKGBDbGF2ZSBkZSB0cmFkdWNjaVx1MDBGM24gbm8gZXMgc3RyaW5nOiAnJHtrZXl9J2ApO1xuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGFyIHBhclx1MDBFMW1ldHJvc1xuICByZXR1cm4gaW50ZXJwb2xhdGUodmFsdWUsIHBhcmFtcyk7XG59XG5cbi8qKlxuICogSW50ZXJwb2xhIHBhclx1MDBFMW1ldHJvcyBlbiB1biBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gVGV4dG8gY29uIG1hcmNhZG9yZXMge2tleX1cbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBQYXJcdTAwRTFtZXRyb3MgYSBpbnRlcnBvbGFyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZXh0byBjb24gcGFyXHUwMEUxbWV0cm9zIGludGVycG9sYWRvc1xuICovXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZSh0ZXh0LCBwYXJhbXMpIHtcbiAgaWYgKCFwYXJhbXMgfHwgT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAobWF0Y2gsIGtleSkgPT4ge1xuICAgIHJldHVybiBwYXJhbXNba2V5XSAhPT0gdW5kZWZpbmVkID8gcGFyYW1zW2tleV0gOiBtYXRjaDtcbiAgfSk7XG59XG5cbi8qKlxuICogT2J0aWVuZSB0cmFkdWNjaW9uZXMgZGUgdW5hIHNlY2NpXHUwMEYzbiBlc3BlY1x1MDBFRGZpY2FcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uIC0gU2VjY2lcdTAwRjNuIChlajogJ2ltYWdlJywgJ2xhdW5jaGVyJywgJ2NvbW1vbicpXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBPYmpldG8gY29uIGxhcyB0cmFkdWNjaW9uZXMgZGUgbGEgc2VjY2lcdTAwRjNuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWN0aW9uKHNlY3Rpb24pIHtcbiAgaWYgKGN1cnJlbnRUcmFuc2xhdGlvbnNbc2VjdGlvbl0pIHtcbiAgICByZXR1cm4gY3VycmVudFRyYW5zbGF0aW9uc1tzZWN0aW9uXTtcbiAgfVxuXG4gIGNvbnNvbGUud2FybihgU2VjY2lcdTAwRjNuIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlbmNvbnRyYWRhOiAnJHtzZWN0aW9ufSdgKTtcbiAgcmV0dXJuIHt9O1xufVxuXG4vKipcbiAqIFZlcmlmaWNhIHNpIHVuIGlkaW9tYSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgc2kgZXN0XHUwMEUxIGRpc3BvbmlibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTGFuZ3VhZ2VBdmFpbGFibGUobGFuZ0NvZGUpIHtcbiAgcmV0dXJuICEhdHJhbnNsYXRpb25zW2xhbmdDb2RlXTtcbn1cblxuLy8gSW5pY2lhbGl6YXIgYXV0b21cdTAwRTF0aWNhbWVudGUgYWwgY2FyZ2FyIGVsIG1cdTAwRjNkdWxvXG5pbml0aWFsaXplTGFuZ3VhZ2UoKTtcbiIsICJleHBvcnQgY29uc3QgJCA9IChzZWwsIHJvb3QgPSBkb2N1bWVudCkgPT4gcm9vdC5xdWVyeVNlbGVjdG9yKHNlbCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHlsZShjc3MpIHtcbiAgY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgcy50ZXh0Q29udGVudCA9IGNzczsgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTsgcmV0dXJuIHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3VudFNoYWRvdyhjb250YWluZXIgPSBkb2N1bWVudC5ib2R5KSB7XG4gIGNvbnN0IGhvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob3N0LmlkID0gXCJ3cGxhY2UtYm90LXJvb3RcIjtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhvc3QpO1xuICBjb25zdCByb290ID0gaG9zdC5hdHRhY2hTaGFkb3cgPyBob3N0LmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pIDogaG9zdDtcbiAgcmV0dXJuIHsgaG9zdCwgcm9vdCB9O1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSBkZXRlY3RhciBzaSBsYSBwYWxldGEgZGUgY29sb3JlcyBlc3RcdTAwRTEgYWJpZXJ0YVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFsZXR0ZU9wZW4oZGVidWcgPSBmYWxzZSkge1xuICAvLyBCdXNjYXIgZWxlbWVudG9zIGNvbXVuZXMgZGUgbGEgcGFsZXRhIGRlIGNvbG9yZXMgKG1cdTAwRTl0b2RvIG9yaWdpbmFsKVxuICBjb25zdCBwYWxldHRlU2VsZWN0b3JzID0gW1xuICAgICdbZGF0YS10ZXN0aWQ9XCJjb2xvci1waWNrZXJcIl0nLFxuICAgICcuY29sb3ItcGlja2VyJyxcbiAgICAnLnBhbGV0dGUnLFxuICAgICdbY2xhc3MqPVwiY29sb3JcIl1bY2xhc3MqPVwicGlja2VyXCJdJyxcbiAgICAnW2NsYXNzKj1cInBhbGV0dGVcIl0nXG4gIF07XG4gIFxuICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHBhbGV0dGVTZWxlY3RvcnMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBOCBQYWxldGEgZGV0ZWN0YWRhIHBvciBzZWxlY3RvcjogJHtzZWxlY3Rvcn1gKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gQnVzY2FyIHBvciBjb2xvcmVzIGVuIHVuIGdyaWQgbyBsaXN0YSAobVx1MDBFOXRvZG8gb3JpZ2luYWwpXG4gIGNvbnN0IGNvbG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbc3R5bGUqPVwiYmFja2dyb3VuZC1jb2xvclwiXSwgW3N0eWxlKj1cImJhY2tncm91bmQ6XCJdLCAuY29sb3IsIFtjbGFzcyo9XCJjb2xvclwiXScpO1xuICBsZXQgdmlzaWJsZUNvbG9ycyA9IDA7XG4gIGZvciAoY29uc3QgZWwgb2YgY29sb3JFbGVtZW50cykge1xuICAgIGlmIChlbC5vZmZzZXRQYXJlbnQgIT09IG51bGwgJiYgZWwub2Zmc2V0V2lkdGggPiAxMCAmJiBlbC5vZmZzZXRIZWlnaHQgPiAxMCkge1xuICAgICAgdmlzaWJsZUNvbG9ycysrO1xuICAgICAgaWYgKHZpc2libGVDb2xvcnMgPj0gNSkge1xuICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQTggUGFsZXRhIGRldGVjdGFkYSBwb3IgY29sb3JlcyB2aXNpYmxlczogJHt2aXNpYmxlQ29sb3JzfWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gU2kgaGF5IDUrIGVsZW1lbnRvcyBkZSBjb2xvciB2aXNpYmxlc1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNEXHVERDBEIFBhbGV0YSBubyBkZXRlY3RhZGEuIENvbG9yZXMgdmlzaWJsZXM6ICR7dmlzaWJsZUNvbG9yc31gKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSBlbmNvbnRyYXIgeSBoYWNlciBjbGljIGVuIGVsIGJvdFx1MDBGM24gZGUgUGFpbnRcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQW5kQ2xpY2tQYWludEJ1dHRvbihkZWJ1ZyA9IGZhbHNlLCBkb3VibGVDbGljayA9IGZhbHNlKSB7XG4gIC8vIE1cdTAwRTl0b2RvIDE6IEJcdTAwRkFzcXVlZGEgZXNwZWNcdTAwRURmaWNhIHBvciBjbGFzZXMgKG1cdTAwRTl0b2RvIG9yaWdpbmFsLCBtXHUwMEUxcyBjb25maWFibGUpXG4gIGNvbnN0IHNwZWNpZmljQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmJ0bi5idG4tcHJpbWFyeS5idG4tbGcsIGJ1dHRvbi5idG4uYnRuLXByaW1hcnkuc21cXFxcOmJ0bi14bCcpO1xuICBcbiAgaWYgKHNwZWNpZmljQnV0dG9uKSB7XG4gICAgY29uc3QgYnV0dG9uVGV4dCA9IHNwZWNpZmljQnV0dG9uLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgaGFzUGFpbnRUZXh0ID0gYnV0dG9uVGV4dC5pbmNsdWRlcygncGFpbnQnKSB8fCBidXR0b25UZXh0LmluY2x1ZGVzKCdwaW50YXInKTtcbiAgICBjb25zdCBoYXNQYWludEljb24gPSBzcGVjaWZpY0J1dHRvbi5xdWVyeVNlbGVjdG9yKCdzdmcgcGF0aFtkKj1cIjI0MC0xMjBcIl0nKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmljQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZyBwYXRoW2QqPVwiTTE1XCJdJyk7XG4gICAgXG4gICAgaWYgKGhhc1BhaW50VGV4dCB8fCBoYXNQYWludEljb24pIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBRiBCb3RcdTAwRjNuIFBhaW50IGVuY29udHJhZG8gcG9yIHNlbGVjdG9yIGVzcGVjXHUwMEVEZmljbzogXCIke2J1dHRvblRleHR9XCJgKTtcbiAgICAgIHNwZWNpZmljQnV0dG9uLmNsaWNrKCk7XG4gICAgICBcbiAgICAgIC8vIFNpIHNlIHJlcXVpZXJlIGRvYmxlIGNsaWMsIGhhY2VyIHNlZ3VuZG8gY2xpYyBkZXNwdVx1MDBFOXMgZGUgdW4gZGVsYXlcbiAgICAgIGlmIChkb3VibGVDbGljaykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgU2VndW5kbyBjbGljIGVuIGJvdFx1MDBGM24gUGFpbnRgKTtcbiAgICAgICAgICBzcGVjaWZpY0J1dHRvbi5jbGljaygpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIFxuICAvLyBNXHUwMEU5dG9kbyAyOiBCXHUwMEZBc3F1ZWRhIHNpbXBsZSBwb3IgdGV4dG8gKG1cdTAwRTl0b2RvIG9yaWdpbmFsKVxuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gIGZvciAoY29uc3QgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcbiAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKChidXR0b25UZXh0LmluY2x1ZGVzKCdwYWludCcpIHx8IGJ1dHRvblRleHQuaW5jbHVkZXMoJ3BpbnRhcicpKSAmJiBcbiAgICAgICAgYnV0dG9uLm9mZnNldFBhcmVudCAhPT0gbnVsbCAmJlxuICAgICAgICAhYnV0dG9uLmRpc2FibGVkKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgQm90XHUwMEYzbiBQYWludCBlbmNvbnRyYWRvIHBvciB0ZXh0bzogXCIke2J1dHRvbi50ZXh0Q29udGVudC50cmltKCl9XCJgKTtcbiAgICAgIGJ1dHRvbi5jbGljaygpO1xuICAgICAgXG4gICAgICAvLyBTaSBzZSByZXF1aWVyZSBkb2JsZSBjbGljLCBoYWNlciBzZWd1bmRvIGNsaWMgZGVzcHVcdTAwRTlzIGRlIHVuIGRlbGF5XG4gICAgICBpZiAoZG91YmxlQ2xpY2spIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkFGIFNlZ3VuZG8gY2xpYyBlbiBib3RcdTAwRjNuIFBhaW50YCk7XG4gICAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG9gKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSByZWFsaXphciBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50IGNvbiBzZWN1ZW5jaWEgY29ycmVjdGFcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdXRvQ2xpY2tQYWludEJ1dHRvbihtYXhBdHRlbXB0cyA9IDMsIGRlYnVnID0gdHJ1ZSkge1xuICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0VcdUREMTYgSW5pY2lhbmRvIGF1dG8tY2xpY2sgZGVsIGJvdFx1MDBGM24gUGFpbnQgKG1cdTAwRTF4aW1vICR7bWF4QXR0ZW1wdHN9IGludGVudG9zKWApO1xuICBcbiAgZm9yIChsZXQgYXR0ZW1wdCA9IDE7IGF0dGVtcHQgPD0gbWF4QXR0ZW1wdHM7IGF0dGVtcHQrKykge1xuICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBRiBJbnRlbnRvICR7YXR0ZW1wdH0vJHttYXhBdHRlbXB0c30gLSBCdXNjYW5kbyBib3RcdTAwRjNuIFBhaW50Li4uYCk7XG4gICAgXG4gICAgLy8gVmVyaWZpY2FyIHNpIGxhIHBhbGV0YSB5YSBlc3RcdTAwRTEgYWJpZXJ0YVxuICAgIGlmIChpc1BhbGV0dGVPcGVuKCkpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1MjcwNSBQYWxldGEgeWEgZXN0XHUwMEUxIGFiaWVydGEsIGF1dG8tY2xpY2sgY29tcGxldGFkb2ApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIC8vIENMSUMgXHUwMERBTklDTzogUHJlc2lvbmFyIFBhaW50IHVuYSBzb2xhIHZleiAoc29sbyBwYXJhIG1vc3RyYXIgcGFsZXRhL2RldGVjdGFyIGNvbG9yZXMpXG4gICAgaWYgKGZpbmRBbmRDbGlja1BhaW50QnV0dG9uKGRlYnVnLCBmYWxzZSkpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzRFx1REM0NiBDbGljIGVuIGJvdFx1MDBGM24gUGFpbnQgcmVhbGl6YWRvIChzaW4gc2VndW5kbyBjbGljKWApO1xuICAgICAgXG4gICAgICAvLyBFc3BlcmFyIHVuIHBvY28gcGFyYSBxdWUgbGEgVUkvcGFsZXRhIGFwYXJlemNhIGVuIHBhbnRhbGxhXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTUwMCkpO1xuICAgICAgXG4gICAgICAvLyBWZXJpZmljYXIgc2kgbGEgcGFsZXRhIHNlIGFicmlcdTAwRjNcbiAgICAgIGlmIChpc1BhbGV0dGVPcGVuKCkpIHtcbiAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHUyNzA1IFBhbGV0YSBhYmllcnRhIGV4aXRvc2FtZW50ZSBkZXNwdVx1MDBFOXMgZGVsIGludGVudG8gJHthdHRlbXB0fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1MjZBMFx1RkUwRiBQYWxldGEgbm8gZGV0ZWN0YWRhIHRyYXMgZWwgY2xpYyBlbiBpbnRlbnRvICR7YXR0ZW1wdH0uIFJlaW50ZW50YXJcdTAwRTEuYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG8gcGFyYSBjbGljIGVuIGludGVudG8gJHthdHRlbXB0fWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBFc3BlcmFyIGFudGVzIGRlbCBzaWd1aWVudGUgaW50ZW50b1xuICAgIGlmIChhdHRlbXB0IDwgbWF4QXR0ZW1wdHMpIHtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gICAgfVxuICB9XG4gIFxuICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3NEMgQXV0by1jbGljayBmYWxsXHUwMEYzIGRlc3B1XHUwMEU5cyBkZSAke21heEF0dGVtcHRzfSBpbnRlbnRvc2ApO1xuICByZXR1cm4gZmFsc2U7XG59XG4iLCAiLy8gT3ZlcmxheSBkZWwgXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzbiBwYXJhIEF1dG8tR3VhcmQuanNcbi8vIFNpc3RlbWEgZGUgdmlzdWFsaXphY2lcdTAwRjNuIGJhc2FkbyBlbiBpbnRlcmNlcGNpXHUwMEYzbiBkZSB0aWxlc1xuXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9jb3JlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBndWFyZFN0YXRlIH0gZnJvbSAnLi9jb25maWcuanMnO1xuXG4vLyBHbG9iYWxzIGRlbCBuYXZlZ2Fkb3JcbmNvbnN0IHsgc2V0VGltZW91dCwgUmVxdWVzdCwgUmVzcG9uc2UsIGNyZWF0ZUltYWdlQml0bWFwLCBPZmZzY3JlZW5DYW52YXMgfSA9IHdpbmRvdztcblxuY2xhc3MgR3VhcmRPdmVybGF5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc3BsYXlFbmFibGVkID0gZmFsc2U7IC8vIE1vZG8gRGlzcGxheSAobmVnYXRpdm8gKyBkaWZlcmVuY2lhcylcbiAgICB0aGlzLnByb3RlY3Rpb25BcmVhID0gbnVsbDtcbiAgICB0aGlzLm9yaWdpbmFsRmV0Y2ggPSBudWxsO1xuICAgIHRoaXMuaXNJbnRlcmNlcHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLlRJTEVfU0laRSA9IDEwMDA7IC8vIFRhbWFcdTAwRjFvIGRlIHRpbGUgZW4gV1BsYWNlXG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRyeSB7XG4gICAgICBsb2coJ1x1MjcwNSBPdmVybGF5IGRlIHByb3RlY2NpXHUwMEYzbiBpbmljaWFsaXphZG8nKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ1x1Mjc0QyBFcnJvciBpbmljaWFsaXphbmRvIG92ZXJsYXk6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNob3dQcm90ZWN0aW9uQXJlYShhcmVhKSB7XG4gICAgdGhpcy5wcm90ZWN0aW9uQXJlYSA9IGFyZWE7XG4gICAgdGhpcy5pc0VuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRGZXRjaEludGVyY2VwdGlvbigpO1xuICAgIFxuICAgIGxvZyhgXHVEODNEXHVERUUxXHVGRTBGIE1vc3RyYW5kbyBcdTAwRTFyZWEgZGUgcHJvdGVjY2lcdTAwRjNuOiAoJHthcmVhLngxfSwke2FyZWEueTF9KSBhICgke2FyZWEueDJ9LCR7YXJlYS55Mn0pYCk7XG4gIH1cblxuICBoaWRlUHJvdGVjdGlvbkFyZWEoKSB7XG4gICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3BGZXRjaEludGVyY2VwdGlvbigpO1xuICAgIGxvZygnXHVEODNEXHVERDBEIE9jdWx0YW5kbyBcdTAwRTFyZWEgZGUgcHJvdGVjY2lcdTAwRjNuJyk7XG4gIH1cblxuICAvLyBOdWV2bzogbW9zdHJhci9vY3VsdGFyIG1vZG8gRGlzcGxheVxuICBzaG93RGlzcGxheShhcmVhKSB7XG4gICAgdGhpcy5kaXNwbGF5RW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5zaG93UHJvdGVjdGlvbkFyZWEoYXJlYSk7XG4gICAgbG9nKCdcdUQ4M0RcdUREQkNcdUZFMEYgRGlzcGxheSBhY3RpdmFkbycpO1xuICB9XG5cbiAgaGlkZURpc3BsYXkoKSB7XG4gICAgdGhpcy5kaXNwbGF5RW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVByb3RlY3Rpb25BcmVhKCk7XG4gICAgbG9nKCdcdUQ4M0RcdUREQkNcdUZFMEYgRGlzcGxheSBkZXNhY3RpdmFkbycpO1xuICB9XG5cbiAgLy8gPT09IFNJU1RFTUEgREUgSU5URVJDRVBDSVx1MDBEM04gREUgRkVUQ0ggPT09XG4gIHN0YXJ0RmV0Y2hJbnRlcmNlcHRpb24oKSB7XG4gICAgaWYgKHRoaXMuaXNJbnRlcmNlcHRpbmcpIHJldHVybjtcblxuICAgIHRoaXMub3JpZ2luYWxGZXRjaCA9IHdpbmRvdy5mZXRjaDtcbiAgICB0aGlzLmlzSW50ZXJjZXB0aW5nID0gdHJ1ZTtcblxuICAgIHdpbmRvdy5mZXRjaCA9IGFzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMub3JpZ2luYWxGZXRjaC5hcHBseSh3aW5kb3csIGFyZ3MpO1xuICAgICAgY29uc3QgY2xvbmVkID0gcmVzcG9uc2UuY2xvbmUoKTtcblxuICAgICAgY29uc3QgZW5kcG9pbnROYW1lID0gKChhcmdzWzBdIGluc3RhbmNlb2YgUmVxdWVzdCkgPyBhcmdzWzBdPy51cmwgOiBhcmdzWzBdKSB8fCAnaWdub3JlJztcbiAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gY2xvbmVkLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSB8fCAnJztcblxuICAgICAgLy8gTG9nIHRvZGFzIGxhcyByZXF1ZXN0cyBwYXJhIGRlcHVyYXJcbiAgICAgIGlmIChlbmRwb2ludE5hbWUuaW5jbHVkZXMoJ3RpbGVzJykgfHwgZW5kcG9pbnROYW1lLmluY2x1ZGVzKCd0aWxlJykpIHtcbiAgICAgICAgbG9nKGBcdUQ4M0RcdUREMEQgVElMRSBSRVFVRVNUOiAke2VuZHBvaW50TmFtZX0gfCBDb250ZW50VHlwZTogJHtjb250ZW50VHlwZX1gKTtcbiAgICAgIH1cblxuICAgICAgLy8gSW50ZXJjZXB0YXIgc29sbyB0aWxlcyBkZSBpbWFnZW4gLSBwYXRyXHUwMEYzbiBtXHUwMEUxcyBhbXBsaW9cbiAgICAgIGlmIChjb250ZW50VHlwZS5pbmNsdWRlcygnaW1hZ2UvJykgJiYgXG4gICAgICAgICAgKGVuZHBvaW50TmFtZS5pbmNsdWRlcygnL3RpbGVzLycpIHx8IGVuZHBvaW50TmFtZS5pbmNsdWRlcygnL3RpbGUvJykpICYmIFxuICAgICAgICAgICFlbmRwb2ludE5hbWUuaW5jbHVkZXMoJ29wZW5mcmVlbWFwJykgJiYgXG4gICAgICAgICAgIWVuZHBvaW50TmFtZS5pbmNsdWRlcygnbWFwcycpKSB7XG5cbiAgICAgICAgbG9nKGBcdUQ4M0RcdURDRTEgSW50ZXJjZXB0YW5kbyB0aWxlOiAke2VuZHBvaW50TmFtZX1gKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBjbG9uZWQuYmxvYigpO1xuICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEJsb2IgPSBhd2FpdCB0aGlzLmRyYXdQcm90ZWN0aW9uT25UaWxlKGJsb2IsIGVuZHBvaW50TmFtZSk7XG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShwcm9jZXNzZWRCbG9iLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiBjbG9uZWQuaGVhZGVycyxcbiAgICAgICAgICAgIHN0YXR1czogY2xvbmVkLnN0YXR1cyxcbiAgICAgICAgICAgIHN0YXR1c1RleHQ6IGNsb25lZC5zdGF0dXNUZXh0XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nKCdcdTI3NEMgRXJyb3IgcHJvY2VzYW5kbyB0aWxlOicsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG5cbiAgICBsb2coJ1x1RDgzRFx1REQwRCBJbnRlcmNlcGNpXHUwMEYzbiBkZSB0aWxlcyBpbmljaWFkYSBwYXJhIG92ZXJsYXkgZGUgcHJvdGVjY2lcdTAwRjNuJyk7XG4gIH1cblxuICBzdG9wRmV0Y2hJbnRlcmNlcHRpb24oKSB7XG4gICAgaWYgKCF0aGlzLmlzSW50ZXJjZXB0aW5nIHx8ICF0aGlzLm9yaWdpbmFsRmV0Y2gpIHJldHVybjtcblxuICAgIHdpbmRvdy5mZXRjaCA9IHRoaXMub3JpZ2luYWxGZXRjaDtcbiAgICB0aGlzLmlzSW50ZXJjZXB0aW5nID0gZmFsc2U7XG5cbiAgICBsb2coJ1x1MjNGOVx1RkUwRiBJbnRlcmNlcGNpXHUwMEYzbiBkZSB0aWxlcyBkZXRlbmlkYScpO1xuICB9XG5cbiAgLy8gPT09IFBST0NFU0FNSUVOVE8gREUgVElMRVMgPT09XG4gIGFzeW5jIGRyYXdQcm90ZWN0aW9uT25UaWxlKHRpbGVCbG9iLCBlbmRwb2ludFVybCkge1xuICAgIGlmICghdGhpcy5pc0VuYWJsZWQgfHwgIXRoaXMucHJvdGVjdGlvbkFyZWEpIHtcbiAgICAgIHJldHVybiB0aWxlQmxvYjtcbiAgICB9XG5cbiAgICBsb2coYFx1RDgzRFx1REQyNyBQcm9jZXNhbmRvIHRpbGU6ICR7ZW5kcG9pbnRVcmx9YCk7XG5cbiAgICAvLyBFeHRyYWVyIGNvb3JkZW5hZGFzIGRlbCB0aWxlIGRlc2RlIGxhIFVSTCAtIHBhdHJcdTAwRjNuIG1cdTAwRTFzIGZsZXhpYmxlXG4gICAgLy8gUG9zaWJsZXMgZm9ybWF0b3M6IFxuICAgIC8vIC0gXCIuLi4vdGlsZXMvdGlsZVgvdGlsZVkvem9vbS5wbmdcIlxuICAgIC8vIC0gXCIuLi4vdGlsZS90aWxlWC90aWxlWS5wbmdcIlxuICAgIC8vIC0gXCIuLi4vdGlsZVgvdGlsZVkucG5nXCJcbiAgICBcbiAgICBsZXQgdGlsZVgsIHRpbGVZO1xuICAgIFxuICAgIC8vIE1cdTAwRTl0b2RvIDE6IEV4dHJhZXIgblx1MDBGQW1lcm9zIGRlbCBmaW5hbCBkZSBsYSBVUkxcbiAgICBjb25zdCB1cmxQYXJ0cyA9IGVuZHBvaW50VXJsLnNwbGl0KCcvJyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSB1cmxQYXJ0c1t1cmxQYXJ0cy5sZW5ndGggLSAxXS5yZXBsYWNlKC9cXC4ocG5nfGpwZ3xqcGVnfHdlYnApLiokL2ksICcnKTtcbiAgICBjb25zdCBzZWNvbmRMYXN0UGFydCA9IHVybFBhcnRzW3VybFBhcnRzLmxlbmd0aCAtIDJdO1xuICAgIFxuICAgIC8vIEludGVudGFyIHBhcnNlYXIgY29tbyBuXHUwMEZBbWVyb3NcbiAgICB0aWxlWSA9IHBhcnNlSW50KGxhc3RQYXJ0KTtcbiAgICB0aWxlWCA9IHBhcnNlSW50KHNlY29uZExhc3RQYXJ0KTtcbiAgICBcbiAgICAvLyBNXHUwMEU5dG9kbyAyOiBTaSBubyBmdW5jaW9uYSwgYnVzY2FyIHBhdHJvbmVzIGVuIHRvZGEgbGEgVVJMXG4gICAgaWYgKGlzTmFOKHRpbGVYKSB8fCBpc05hTih0aWxlWSkpIHtcbiAgICAgIGNvbnN0IG51bWJlck1hdGNoZXMgPSBlbmRwb2ludFVybC5tYXRjaCgvXFwvKFxcZCspXFwvKFxcZCspKD86XFwvXFxkKyk/XFwuKD86cG5nfGpwZ3xqcGVnfHdlYnApL2kpO1xuICAgICAgaWYgKG51bWJlck1hdGNoZXMpIHtcbiAgICAgICAgdGlsZVggPSBwYXJzZUludChudW1iZXJNYXRjaGVzWzFdKTtcbiAgICAgICAgdGlsZVkgPSBwYXJzZUludChudW1iZXJNYXRjaGVzWzJdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNOYU4odGlsZVgpIHx8IGlzTmFOKHRpbGVZKSkge1xuICAgICAgbG9nKGBcdTI3NEMgTm8gc2UgcHVkaWVyb24gZXh0cmFlciBjb29yZGVuYWRhcyBkZTogJHtlbmRwb2ludFVybH1gKTtcbiAgICAgIHJldHVybiB0aWxlQmxvYjtcbiAgICB9XG5cbiAgICBsb2coYFx1RDgzRFx1RENDRCBDb29yZGVuYWRhcyBleHRyYVx1MDBFRGRhczogdGlsZSgke3RpbGVYfSwgJHt0aWxlWX0pYCk7XG5cbiAgICAvLyBWZXJpZmljYXIgc2kgZXN0ZSB0aWxlIGludGVyc2VjdGEgY29uIGVsIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM25cbiAgICBpZiAoIXRoaXMudGlsZUludGVyc2VjdHNQcm90ZWN0aW9uQXJlYSh0aWxlWCwgdGlsZVkpKSB7XG4gICAgICBsb2coYFx1MjdBMVx1RkUwRiBUaWxlICR7dGlsZVh9LCR7dGlsZVl9IG5vIGludGVyc2VjdGEgY29uIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM25gKTtcbiAgICAgIHJldHVybiB0aWxlQmxvYjsgLy8gTm8gaGF5IGludGVyc2VjY2lcdTAwRjNuXG4gICAgfVxuXG4gICAgbG9nKGBcdUQ4M0NcdURGQUYgVGlsZSAke3RpbGVYfSwke3RpbGVZfSBJTlRFUlNFQ1RBIGNvbiBcdTAwRTFyZWEgZGUgcHJvdGVjY2lcdTAwRjNuIC0gYXBsaWNhbmRvIG92ZXJsYXlgKTtcblxuICAgIC8vIFByb2Nlc2FyIGVsIHRpbGVcbiAgICBjb25zdCB0aWxlQml0bWFwID0gYXdhaXQgY3JlYXRlSW1hZ2VCaXRtYXAodGlsZUJsb2IpO1xuICAgIGNvbnN0IGNhbnZhcyA9IG5ldyBPZmZzY3JlZW5DYW52YXModGlsZUJpdG1hcC53aWR0aCwgdGlsZUJpdG1hcC5oZWlnaHQpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBcbiAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRpbGVCaXRtYXAsIDAsIDApO1xuXG4gICAgLy8gRGlidWphciBvdmVybGF5IGRlbCBcdTAwRTFyZWEgZGUgcHJvdGVjY2lcdTAwRjNuXG4gICAgdGhpcy5kcmF3UHJvdGVjdGlvbk92ZXJsYXkoY29udGV4dCwgdGlsZVgsIHRpbGVZLCB0aWxlQml0bWFwLndpZHRoLCB0aWxlQml0bWFwLmhlaWdodCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYW52YXMuY29udmVydFRvQmxvYih7IHR5cGU6ICdpbWFnZS9wbmcnIH0pO1xuICAgIGxvZyhgXHUyNzA1IFRpbGUgJHt0aWxlWH0sJHt0aWxlWX0gcHJvY2VzYWRvIGNvbiBvdmVybGF5YCk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHRpbGVJbnRlcnNlY3RzUHJvdGVjdGlvbkFyZWEodGlsZVgsIHRpbGVZKSB7XG4gICAgaWYgKCF0aGlzLnByb3RlY3Rpb25BcmVhKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCB7IHgxLCB5MSwgeDIsIHkyIH0gPSB0aGlzLnByb3RlY3Rpb25BcmVhO1xuICAgIFxuICAgIC8vIENhbGN1bGFyIGxcdTAwRURtaXRlcyBkZWwgdGlsZVxuICAgIGNvbnN0IHRpbGVTdGFydFggPSB0aWxlWCAqIHRoaXMuVElMRV9TSVpFO1xuICAgIGNvbnN0IHRpbGVFbmRYID0gdGlsZVN0YXJ0WCArIHRoaXMuVElMRV9TSVpFO1xuICAgIGNvbnN0IHRpbGVTdGFydFkgPSB0aWxlWSAqIHRoaXMuVElMRV9TSVpFO1xuICAgIGNvbnN0IHRpbGVFbmRZID0gdGlsZVN0YXJ0WSArIHRoaXMuVElMRV9TSVpFO1xuXG4gICAgLy8gTG9nIHBhcmEgZGVwdXJhclxuICAgIGxvZyhgXHVEODNEXHVERDBEIFZlcmlmaWNhbmRvIGludGVyc2VjY2lcdTAwRjNuOmApO1xuICAgIGxvZyhgICAgVGlsZSAke3RpbGVYfSwke3RpbGVZfTogKCR7dGlsZVN0YXJ0WH0tJHt0aWxlRW5kWH0sICR7dGlsZVN0YXJ0WX0tJHt0aWxlRW5kWX0pYCk7XG4gICAgbG9nKGAgICBcdTAwQzFyZWEgcHJvdGVjY2lcdTAwRjNuOiAoJHt4MX0tJHt4Mn0sICR7eTF9LSR7eTJ9KWApO1xuXG4gICAgLy8gVmVyaWZpY2FyIGludGVyc2VjY2lcdTAwRjNuXG4gICAgY29uc3QgaW50ZXJzZWN0cyA9ICEoeDIgPCB0aWxlU3RhcnRYIHx8IHgxID4gdGlsZUVuZFggfHwgeTIgPCB0aWxlU3RhcnRZIHx8IHkxID4gdGlsZUVuZFkpO1xuICAgIFxuICAgIGxvZyhgICAgXHVEODNDXHVERkFGIEludGVyc2VjdGE6ICR7aW50ZXJzZWN0c31gKTtcbiAgICBcbiAgICByZXR1cm4gaW50ZXJzZWN0cztcbiAgfVxuXG4gIGRyYXdQcm90ZWN0aW9uT3ZlcmxheShjb250ZXh0LCB0aWxlWCwgdGlsZVksIHRpbGVXaWR0aCwgdGlsZUhlaWdodCkge1xuICAgIGlmICghdGhpcy5wcm90ZWN0aW9uQXJlYSkgcmV0dXJuO1xuXG4gICAgY29uc3QgeyB4MSwgeTEsIHgyLCB5MiB9ID0gdGhpcy5wcm90ZWN0aW9uQXJlYTtcbiAgICBcbiAgICAvLyBDYWxjdWxhciBsXHUwMEVEbWl0ZXMgZGVsIHRpbGVcbiAgICBjb25zdCB0aWxlU3RhcnRYID0gdGlsZVggKiB0aGlzLlRJTEVfU0laRTtcbiAgICBjb25zdCB0aWxlU3RhcnRZID0gdGlsZVkgKiB0aGlzLlRJTEVfU0laRTtcbiAgICBcbiAgICAvLyBDYWxjdWxhciBsYSBwYXJ0ZSBkZWwgXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzbiBxdWUgY2FlIGVuIGVzdGUgdGlsZVxuICAgIGNvbnN0IGxvY2FsWDEgPSBNYXRoLm1heCgwLCB4MSAtIHRpbGVTdGFydFgpO1xuICAgIGNvbnN0IGxvY2FsWTEgPSBNYXRoLm1heCgwLCB5MSAtIHRpbGVTdGFydFkpO1xuICAgIGNvbnN0IGxvY2FsWDIgPSBNYXRoLm1pbih0aGlzLlRJTEVfU0laRSwgeDIgLSB0aWxlU3RhcnRYKTtcbiAgICBjb25zdCBsb2NhbFkyID0gTWF0aC5taW4odGhpcy5USUxFX1NJWkUsIHkyIC0gdGlsZVN0YXJ0WSk7XG5cbiAgICAvLyBTaSBubyBoYXkgXHUwMEUxcmVhIHZpc2libGUgZW4gZXN0ZSB0aWxlLCBzYWxpclxuICAgIGlmIChsb2NhbFgxID49IGxvY2FsWDIgfHwgbG9jYWxZMSA+PSBsb2NhbFkyKSByZXR1cm47XG5cbiAgICAvLyBFc2NhbGFyIGEgbGFzIGRpbWVuc2lvbmVzIGRlbCB0aWxlIHJlbmRlcml6YWRvXG4gICAgY29uc3Qgc2NhbGVYID0gdGlsZVdpZHRoIC8gdGhpcy5USUxFX1NJWkU7XG4gICAgY29uc3Qgc2NhbGVZID0gdGlsZUhlaWdodCAvIHRoaXMuVElMRV9TSVpFO1xuXG4gICAgY29uc3QgcmVuZGVyWDEgPSBsb2NhbFgxICogc2NhbGVYO1xuICAgIGNvbnN0IHJlbmRlclkxID0gbG9jYWxZMSAqIHNjYWxlWTtcbiAgICBjb25zdCByZW5kZXJXaWR0aCA9IChsb2NhbFgyIC0gbG9jYWxYMSkgKiBzY2FsZVg7XG4gICAgY29uc3QgcmVuZGVySGVpZ2h0ID0gKGxvY2FsWTIgLSBsb2NhbFkxKSAqIHNjYWxlWTtcblxuICAgIGxvZyhgXHVEODNDXHVERkE4IERpYnVqYW5kbyBvdmVybGF5IGVuIHRpbGUgJHt0aWxlWH0sJHt0aWxlWX06YCk7XG4gICAgbG9nKGAgICBMb2NhbDogKCR7bG9jYWxYMX0sJHtsb2NhbFkxfSkgYSAoJHtsb2NhbFgyfSwke2xvY2FsWTJ9KWApO1xuICAgIGxvZyhgICAgUmVuZGVyOiAoJHtyZW5kZXJYMX0sJHtyZW5kZXJZMX0pIHRhbWFcdTAwRjFvOiAke3JlbmRlcldpZHRofXgke3JlbmRlckhlaWdodH1gKTtcbiAgICBsb2coYCAgIFNjYWxlOiAke3NjYWxlWH0geCAke3NjYWxlWX0sIFRpbGVTaXplOiAke3RpbGVXaWR0aH14JHt0aWxlSGVpZ2h0fWApO1xuXG4gICAgLy8gR3VhcmRhciBlc3RhZG8gZGVsIGNvbnRleHRvXG4gICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICBpZiAodGhpcy5kaXNwbGF5RW5hYmxlZCkge1xuICAgICAgLy8gMSkgTW9kbyBEaXNwbGF5OiBhcGxpY2FyIG5lZ2F0aXZvIChpbnZlcnRpciBjb2xvcmVzKSBTT0xPIGRlbnRybyBkZWwgXHUwMEUxcmVhXG4gICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkaWZmZXJlbmNlJztcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJzsgLy8gZGlmZmVyZW5jZSBjb24gYmxhbmNvID0gaW52ZXJ0aWRvXG4gICAgICBjb250ZXh0LmZpbGxSZWN0KHJlbmRlclgxLCByZW5kZXJZMSwgcmVuZGVyV2lkdGgsIHJlbmRlckhlaWdodCk7XG4gICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG5cbiAgICAgIC8vIDIpIFJlc2FsdGFyIHBcdTAwRUR4ZWxlcyBxdWUgbm8gY29pbmNpZGVuIGVuIFJPSk8gc1x1MDBGM2xpZG8gdXNhbmRvIGd1YXJkU3RhdGUuY2hhbmdlc1xuICAgICAgaWYgKGd1YXJkU3RhdGU/LmNoYW5nZXMgJiYgZ3VhcmRTdGF0ZS5jaGFuZ2VzLnNpemUgPiAwKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMjU1LCAwLCAwLCAwLjkpJztcbiAgICAgICAgZm9yIChjb25zdCBbX2tleSwgY2hhbmdlXSBvZiBndWFyZFN0YXRlLmNoYW5nZXMpIHtcbiAgICAgICAgICBjb25zdCBvcmlnID0gY2hhbmdlLm9yaWdpbmFsO1xuICAgICAgICAgIGlmICghb3JpZykgY29udGludWU7XG4gICAgICAgICAgaWYgKG9yaWcudGlsZVggIT09IHRpbGVYIHx8IG9yaWcudGlsZVkgIT09IHRpbGVZKSBjb250aW51ZTsgLy8gU29sbyBlc3RlIHRpbGVcbiAgICAgICAgICAvLyBBc2VndXJhciBxdWUgY2FlIGVuIGVsIHJlY29ydGUgbG9jYWxcbiAgICAgICAgICBpZiAob3JpZy5sb2NhbFggPCBsb2NhbFgxIHx8IG9yaWcubG9jYWxYID49IGxvY2FsWDIgfHwgb3JpZy5sb2NhbFkgPCBsb2NhbFkxIHx8IG9yaWcubG9jYWxZID49IGxvY2FsWTIpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgY29uc3QgcHggPSBvcmlnLmxvY2FsWCAqIHNjYWxlWDtcbiAgICAgICAgICBjb25zdCBweSA9IG9yaWcubG9jYWxZICogc2NhbGVZO1xuICAgICAgICAgIC8vIFBpbnRhciBlbCByZWN0XHUwMEUxbmd1bG8gZGVsIHBcdTAwRUR4ZWxcbiAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHB4LCBweSwgTWF0aC5tYXgoMSwgc2NhbGVYKSwgTWF0aC5tYXgoMSwgc2NhbGVZKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQm9yZGUgc3V0aWwgcGFyYSBkZWxpbWl0YXIgXHUwMEUxcmVhIGVuIG1vZG8gRGlzcGxheVxuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSknO1xuICAgICAgY29udGV4dC5saW5lV2lkdGggPSBNYXRoLm1heCgxLCAxLjUgKiBNYXRoLm1heChzY2FsZVgsIHNjYWxlWSkpO1xuICAgICAgY29udGV4dC5zdHJva2VSZWN0KHJlbmRlclgxLCByZW5kZXJZMSwgcmVuZGVyV2lkdGgsIHJlbmRlckhlaWdodCk7XG5cbiAgICAgIC8vIEV0aXF1ZXRhIHJlbW92aWRhXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1vZG8gT3ZlcmxheSBjbFx1MDBFMXNpY28gKFx1MDBFMXJlYSByb2phIGNvbiBjdWFkclx1MDBFRGN1bGEpXG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwgMCwgMCwgMC41KSc7IC8vIDUwJSBvcGFjaWRhZFxuICAgICAgY29udGV4dC5maWxsUmVjdChyZW5kZXJYMSwgcmVuZGVyWTEsIHJlbmRlcldpZHRoLCByZW5kZXJIZWlnaHQpO1xuXG4gICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LCAwLCAwLCAxLjApJzsgLy8gVG90YWxtZW50ZSBvcGFjb1xuICAgICAgY29udGV4dC5saW5lV2lkdGggPSBNYXRoLm1heCgxLCAxLjUgKiBNYXRoLm1heChzY2FsZVgsIHNjYWxlWSkpO1xuICAgICAgY29udGV4dC5zdHJva2VSZWN0KHJlbmRlclgxLCByZW5kZXJZMSwgcmVuZGVyV2lkdGgsIHJlbmRlckhlaWdodCk7XG5cbiAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsIDI1NSwgMCwgMC44KSc7IC8vIExcdTAwRURuZWFzIGFtYXJpbGxhc1xuICAgICAgY29udGV4dC5saW5lV2lkdGggPSBNYXRoLm1heCgwLjUsIDEgKiBNYXRoLm1heChzY2FsZVgsIHNjYWxlWSkpO1xuICAgICAgXG4gICAgICAvLyBMXHUwMEVEbmVhcyB2ZXJ0aWNhbGVzIGNhZGEgMTAgcFx1MDBFRHhlbGVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSByZW5kZXJXaWR0aDsgaSArPSAxMCAqIHNjYWxlWCkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhyZW5kZXJYMSArIGksIHJlbmRlclkxKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8ocmVuZGVyWDEgKyBpLCByZW5kZXJZMSArIHJlbmRlckhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIExcdTAwRURuZWFzIGhvcml6b250YWxlcyBjYWRhIDEwIHBcdTAwRUR4ZWxlc1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcmVuZGVySGVpZ2h0OyBpICs9IDEwICogc2NhbGVZKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHJlbmRlclgxLCByZW5kZXJZMSArIGkpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyhyZW5kZXJYMSArIHJlbmRlcldpZHRoLCByZW5kZXJZMSArIGkpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBFdGlxdWV0YSByZW1vdmlkYVxuICAgIH1cblxuICAgIC8vIFJlc3RhdXJhciBlc3RhZG8gZGVsIGNvbnRleHRvXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICBsb2coYFx1MjcwNSBPdmVybGF5IGRpYnVqYWRvIGVuIHRpbGUgJHt0aWxlWH0sJHt0aWxlWX1gKTtcbiAgfVxuXG4gIHVwZGF0ZUFyZWEobmV3QXJlYSkge1xuICAgIHRoaXMucHJvdGVjdGlvbkFyZWEgPSBuZXdBcmVhO1xuICAgIC8vIEVsIG92ZXJsYXkgc2UgYWN0dWFsaXphclx1MDBFMSBhdXRvbVx1MDBFMXRpY2FtZW50ZSBjdWFuZG8gc2UgcmVjYXJncmVuIGxvcyB0aWxlc1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzRW5hYmxlZCkge1xuICAgICAgdGhpcy5oaWRlUHJvdGVjdGlvbkFyZWEoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvdGVjdGlvbkFyZWEpIHtcbiAgICAgIHRoaXMuc2hvd1Byb3RlY3Rpb25BcmVhKHRoaXMucHJvdGVjdGlvbkFyZWEpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wRmV0Y2hJbnRlcmNlcHRpb24oKTtcbiAgICB0aGlzLnByb3RlY3Rpb25BcmVhID0gbnVsbDtcbiAgICB0aGlzLmlzRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGlzcGxheUVuYWJsZWQgPSBmYWxzZTtcbiAgICBsb2coJ1x1RDgzRFx1REREMVx1RkUwRiBPdmVybGF5IGRlc3RydWlkbycpO1xuICB9XG5cbiAgLy8gTVx1MDBFOXRvZG9zIGNvbXBhdGlibGVzIGNvbiBlbCBzaXN0ZW1hIGFudGVyaW9yXG4gIGhhbmRsZVZpZXdwb3J0Q2hhbmdlKCkge1xuICAgIC8vIEVsIHNpc3RlbWEgZGUgaW50ZXJjZXBjaVx1MDBGM24gZGUgdGlsZXMgbm8gbmVjZXNpdGEgbWFuZWphciB2aWV3cG9ydCBtYW51YWxtZW50ZVxuICB9XG59XG5cbi8vIEluc3RhbmNpYSBnbG9iYWwgZGVsIG92ZXJsYXlcbmV4cG9ydCBjb25zdCBndWFyZE92ZXJsYXkgPSBuZXcgR3VhcmRPdmVybGF5KCk7XG5cbi8vIEF1dG8taW5pY2lhbGl6YXIgY3VhbmRvIGVsIERPTSBlc3RcdTAwRTkgbGlzdG9cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IGd1YXJkT3ZlcmxheS5pbml0aWFsaXplKCksIDEwMDApO1xuICB9KTtcbn0gZWxzZSB7XG4gIHNldFRpbWVvdXQoKCkgPT4gZ3VhcmRPdmVybGF5LmluaXRpYWxpemUoKSwgMTAwMCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGd1YXJkT3ZlcmxheTtcbiIsICJpbXBvcnQgeyBydW5HdWFyZCB9IGZyb20gXCIuLi9ndWFyZC9pbmRleC5qc1wiO1xuaW1wb3J0IHsgYXV0b0NsaWNrUGFpbnRCdXR0b24gfSBmcm9tIFwiLi4vY29yZS9kb20uanNcIjtcblxuLy8gQXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludCBhbCBpbmljaW9cbihhc3luYyBmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnW1dQQS1HdWFyZF0gXHVEODNFXHVERDE2IEluaWNpYW5kbyBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50Li4uJyk7XG4gICAgYXdhaXQgYXV0b0NsaWNrUGFpbnRCdXR0b24oMywgdHJ1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coJ1tXUEEtR3VhcmRdIFx1MjZBMFx1RkUwRiBFcnJvciBlbiBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50OicsIGVycm9yKTtcbiAgfVxuICBcbiAgLy8gVmVyaWZpY2FyIHNpIHlhIGhheSB1biBib3QgR3VhcmQgY29ycmllbmRvXG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/Lmd1YXJkUnVubmluZykge1xuICAgIGFsZXJ0KCdBdXRvLUd1YXJkIHlhIGVzdFx1MDBFMSBjb3JyaWVuZG8uJyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRWplY3V0YXIgZWwgYm90XG4gICAgcnVuR3VhcmQoKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbV1BBLUdVQVJEXSBFcnJvciBlbiBBdXRvLUd1YXJkOicsIGVycm9yKTtcbiAgICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgICAgd2luZG93Ll9fd3BsYWNlQm90Lmd1YXJkUnVubmluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYWxlcnQoJ0F1dG8tR3VhcmQ6IGVycm9yIGluZXNwZXJhZG8uIFJldmlzYSBjb25zb2xhLicpO1xuICAgIH0pO1xuICB9XG59KSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztBQUFBLE1BVWE7QUFWYjtBQUFBO0FBVU8sTUFBTSxNQUFNLElBQUksTUFBTSxRQUFRLElBQUksWUFBWSxHQUFHLENBQUM7QUFBQTtBQUFBOzs7QUNWekQ7QUFBQTtBQUFBO0FBQUE7OztBQ3FCQSxXQUFTLGtCQUFrQkEsSUFBRztBQUM1QixRQUFJLGVBQWU7QUFDakIsb0JBQWNBLEVBQUM7QUFDZixzQkFBZ0I7QUFBQSxJQUNsQjtBQUNBLHFCQUFpQkE7QUFDakIsc0JBQWtCLEtBQUssSUFBSSxJQUFJO0FBQy9CLFFBQUkseUNBQW9DO0FBQUEsRUFDMUM7QUFFQSxXQUFTLGVBQWU7QUFDdEIsV0FBTyxrQkFBa0IsS0FBSyxJQUFJLElBQUk7QUFBQSxFQUN4QztBQUdBLFdBQVMsa0JBQWtCO0FBQ3pCLHFCQUFpQjtBQUNqQixzQkFBa0I7QUFDbEIsUUFBSSxnRUFBb0Q7QUFBQSxFQUMxRDtBQUdBLGlCQUFzQixZQUFZLFdBQVcsT0FBTztBQUVsRCxRQUFJLGFBQWEsS0FBSyxDQUFDLFVBQVU7QUFDL0IsYUFBTztBQUFBLElBQ1Q7QUFHQSxRQUFJLFVBQVU7QUFDWixzQkFBZ0I7QUFBQSxJQUNsQjtBQUdBLFFBQUksMkJBQTJCO0FBQzdCLFVBQUksNERBQXFEO0FBQ3pELFlBQU0sTUFBTSxHQUFJO0FBQ2hCLGFBQU8sYUFBYSxJQUFJLGlCQUFpQjtBQUFBLElBQzNDO0FBRUEsZ0NBQTRCO0FBRTVCLFFBQUk7QUFDRixVQUFJLDJEQUFvRDtBQUd4RCxZQUFNLFFBQVEsTUFBTSxjQUFjO0FBQ2xDLFVBQUksU0FBUyxNQUFNLFNBQVMsSUFBSTtBQUM5QiwwQkFBa0IsS0FBSztBQUN2QixZQUFJLCtDQUEwQztBQUM5QyxlQUFPO0FBQUEsTUFDVDtBQUdBLFVBQUksd0VBQThEO0FBQ2xFLFlBQU0s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Q1IsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BRWQsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JB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QUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLGVBQWU7QUFBQSxNQUNmLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBLE1BRW5CLG1CQUFtQjtBQUFBLE1BRW5CLHFCQUFxQjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNWLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLHlCQUF5QjtBQUFBLE1BQ3pCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUFBLE1BRWQsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2Qsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFB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LE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUEsTUFFbkIsbUJBQW1CO0FBQUEsTUFFbkIscUJBQXFCO0FBQUEsTUFDckIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIseUJBQXlCO0FBQUEsTUFDekIsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIs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TUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxJQUNuQjtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixvQkFBb0I7QUFBQSxNQUNwQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixvQkFBb0I7QUFBQSxNQUNwQixrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7OztBQzlTTyxNQUFNLFNBQVM7QUFBQTtBQUFBLElBRXBCLFVBQVU7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLGVBQWU7QUFBQSxNQUNmLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBLE1BRWxCLG1CQUFtQjtBQUFBLE1BRXBCLHFCQUFxQjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLHlCQUF5QjtBQUFBLE1BQ3pCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUFBLE1BRWQsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2Qsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJB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QSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLHFCQUFxQjtBQUFBLE1BQ3JCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLHFCQUFxQjtBQUFBLE1BQ3JCLGdCQUFnQjtBQUFBLE1BQ2hCLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLG9CQUFvQjtBQUFBLE1BQ3BCLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLFFBQVE7QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLElBQUk7QUFBQSxNQUNKLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLElBQ25CO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLG1CQUFtQjtBQUFB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QUNkLGNBQVEsSUFBSSxvRUFBdUQsS0FBSztBQUFBLElBQzFFO0FBR0EsU0FBSSxZQUFPLGdCQUFQLG1CQUFvQixjQUFjO0FBQ3BDLFlBQU0sa0NBQStCO0FBQUEsSUFDdkMsT0FBTztBQUVMLGVBQVMsRUFBRSxNQUFNLFdBQVM7QUFDeEIsZ0JBQVEsTUFBTSxvQ0FBb0MsS0FBSztBQUN2RCxZQUFJLE9BQU8sYUFBYTtBQUN0QixpQkFBTyxZQUFZLGVBQWU7QUFBQSxRQUNwQztBQUNBLGNBQU0sK0NBQStDO0FBQUEsTUFDdkQsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGLEdBQUc7IiwKICAibmFtZXMiOiBbInQiLCAiY2FudmFzIiwgIm9yaWdpbmFsRmV0Y2giLCAidHVybnN0aWxlVG9rZW4iLCAicGFpbnRlZCIsICJzbGVlcCIsICJ4IiwgInkiLCAiVVJMIiwgInNsZWVwIiwgImRldGVjdEF2YWlsYWJsZUNvbG9ycyIsICJjb21wYXJlQ29sb3JzIiwgInJnYlRvTGFiIiwgImNhbGN1bGF0ZURlbHRhRSIsICJjcmVhdGVBbmFseXNpc1dpbmRvdyIsICJzZXRUaW1lb3V0IiwgIlJlcXVlc3QiLCAic2xlZXAiLCAib3JpZ2luYWxGZXRjaCJdCn0K
