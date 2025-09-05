import { log } from "./logger.js";

// ========================================
// TURNSTILE TOKEN MANAGEMENT
// ========================================

// Optimized Turnstile token handling with caching and retry logic
let turnstileToken = null;
let tokenExpiryTime = 0;
let tokenGenerationInProgress = false;
let currentGenerationPromise = null; // comparte la promesa entre llamadas concurrentes
let _resolveToken = null;
let tokenPromise = new Promise((resolve) => { _resolveToken = resolve });
const TOKEN_LIFETIME = 240000; // 4 minutes (tokens typically last 5 min, use 4 for safety)

// Turnstile widget management (replicated from example)
let _turnstileWidgetId = null;
let _turnstileContainer = null;
let _turnstileOverlay = null;
let _lastSitekey = null;
let _cachedSitekey = null;

function setTurnstileToken(t) {
  if (_resolveToken) {
    _resolveToken(t);
    _resolveToken = null;
  }
  turnstileToken = t;
  tokenExpiryTime = Date.now() + TOKEN_LIFETIME;
  log("✅ Turnstile token set successfully");
}

function isTokenValid() {
  return turnstileToken && Date.now() < tokenExpiryTime;
}

// Force token invalidation (for 403 errors)
function invalidateToken() {
  turnstileToken = null;
  tokenExpiryTime = 0;
  log("🗑️ Token invalidated, will force fresh generation");
}

// Main token function - replicated from example
export async function ensureToken(forceNew = false) {
  // Return cached token if still valid and not forcing new
  if (isTokenValid() && !forceNew) {
    return turnstileToken;
  }

  // If forcing new, invalidate current token
  if (forceNew) {
    invalidateToken();
  }

  // Avoid multiple simultaneous token generations: esperar la promesa en curso
  if (tokenGenerationInProgress && currentGenerationPromise) {
    log("🔄 Token generation already in progress, waiting for existing promise...");
    try {
      const t = await currentGenerationPromise;
      return t && t.length > 20 ? t : (isTokenValid() ? turnstileToken : null);
    } catch {
      // Si falla, continuar con un nuevo intento abajo
    }
  }

  tokenGenerationInProgress = true;
  currentGenerationPromise = (async () => {
    try {
      log("🔄 Token expired or missing, generating new one...");

      // First try invisible Turnstile
      const token = await handleCaptcha();
      if (token && token.length > 20) {
        setTurnstileToken(token);
        log("✅ Token captured and cached successfully");
        return token;
      }

      // If invisible fails, force browser automation
      log("⚠️ Invisible Turnstile failed, forcing browser automation...");
      const fallbackToken = await handleCaptchaFallback();
      if (fallbackToken && fallbackToken.length > 20) {
        setTurnstileToken(fallbackToken);
        log("✅ Fallback token captured successfully");
        return fallbackToken;
      }

      log("❌ All token generation methods failed");
      return null;
    } finally {
      tokenGenerationInProgress = false;
      currentGenerationPromise = null;
    }
  })();

  return currentGenerationPromise;
}

// Main captcha handler - replicated from example
async function handleCaptcha() {
  const startTime = Date.now();
  try {
    // Use optimized token generation with automatic sitekey detection
    const sitekey = detectSitekey();
    log("🔑 Generating Turnstile token for sitekey:", sitekey);
    if (typeof window !== 'undefined' && window.navigator) {
      log('🧭 UA:', window.navigator.userAgent, 'Platform:', window.navigator.platform);
    }
    
    const token = await generatePaintToken(sitekey);
    
    if (token && token.length > 20) {
      const duration = Math.round(Date.now() - startTime);
      log(`✅ Turnstile token generated successfully in ${duration}ms`);
      return token;
    } else {
      throw new Error("Invalid or empty token received");
    }
  } catch (error) {
    const duration = Math.round(Date.now() - startTime);
    log(`❌ Turnstile token generation failed after ${duration}ms:`, error);
    throw error; // Re-throw to be caught by ensureToken
  }
}

async function generatePaintToken(sitekey) {
  return executeTurnstile(sitekey, 'paint');
}

// TURNSTILE CORE FUNCTIONS (replicated from example)

async function loadTurnstile() {
  // If Turnstile is already present, just resolve.
  if (window.turnstile) {
    return Promise.resolve();
  }
  
  return new Promise((resolve, reject) => {
    // Avoid adding the script twice
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
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      log("✅ Turnstile script loaded successfully");
      resolve();
    };
    script.onerror = () => {
      log("❌ Failed to load Turnstile script");
      reject(new Error('Failed to load Turnstile'));
    };
    document.head.appendChild(script);
  });
}

function ensureTurnstileContainer() {
  if (!_turnstileContainer || !document.body.contains(_turnstileContainer)) {
    // Clean up old container if it exists
    if (_turnstileContainer) {
      _turnstileContainer.remove();
    }
    
    _turnstileContainer = document.createElement('div');
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
    _turnstileContainer.setAttribute('aria-hidden', 'true');
    _turnstileContainer.id = 'turnstile-widget-container';
    document.body.appendChild(_turnstileContainer);
  }
  return _turnstileContainer;
}

function ensureTurnstileOverlayContainer() {
  if (_turnstileOverlay && document.body.contains(_turnstileOverlay)) {
    return _turnstileOverlay;
  }
  const overlay = document.createElement('div');
  overlay.id = 'turnstile-overlay-container';
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
  const title = document.createElement('div');
  title.textContent = 'Cloudflare Turnstile — please complete the check if shown';
  title.style.cssText = 'font: 600 12px/1.3 "Segoe UI",sans-serif; margin-bottom: 8px; opacity: 0.9;';
  const widgetHost = document.createElement('div');
  widgetHost.id = 'turnstile-overlay-host';
  widgetHost.style.cssText = 'width: 100%; min-height: 70px;';
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Hide';
  closeBtn.style.cssText = 'position:absolute; top:6px; right:6px; font-size:11px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:2px 6px; cursor:pointer;';
  closeBtn.addEventListener('click', () => overlay.remove());
  overlay.appendChild(title);
  overlay.appendChild(widgetHost);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);
  _turnstileOverlay = overlay;
  return overlay;
}

async function executeTurnstile(sitekey, action = 'paint') {
  await loadTurnstile();

  if (_turnstileWidgetId && _lastSitekey === sitekey && window.turnstile?.execute) {
    try {
      log("🔄 Reusing existing Turnstile widget...");
      const token = await Promise.race([
        window.turnstile.execute(_turnstileWidgetId, { action }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Execute timeout')), 15000))
      ]);
      if (token && token.length > 20) {
        log("✅ Token generated via widget reuse");
        return token;
      }
    } catch (err) {
      log('🔄 Widget reuse failed, will create a fresh widget:', err.message);
    }
  }

  const invisible = await createNewTurnstileWidgetInvisible(sitekey, action);
  if (invisible && invisible.length > 20) return invisible;

  log('👀 Falling back to interactive Turnstile (visible).');
  // Aviso inicial al usuario del primer intento interactivo
  try { showUserNotificationTopCenter('🔄 Resolviendo CAPTCHA...', 'info'); } catch {}
  
  // Sistema de reintentos indefinidos con timeout inicial de 30s
  const INITIAL_TIMEOUT = 30000; // 30 segundos para el primer intento
  const RETRY_INTERVAL = 30000;  // 30 segundos entre reintentos
  
  let attempt = 1;
  let hasShownFirstRetryNotification = false;
  
  while (true) {
    const currentTimeout = attempt === 1 ? INITIAL_TIMEOUT : RETRY_INTERVAL;
    log(`🔄 Intento ${attempt} de resolución del CAPTCHA (timeout: ${currentTimeout/1000}s)...`);
    
    // Mostrar notificación al usuario a partir del primer reintento
    if (attempt > 1 && !hasShownFirstRetryNotification) {
      showUserNotification(`🔄 CAPTCHA: Reintentando automáticamente cada 30 segundos (intento ${attempt})`, 'info');
      hasShownFirstRetryNotification = true;
    } else if (attempt > 2) {
      showUserNotification(`🔄 CAPTCHA: Intento ${attempt} - Continuando automáticamente`, 'info');
    }
    
    try {
      // Limpiar cualquier widget existente antes de cada intento
      if (_turnstileWidgetId && window.turnstile?.remove) {
        try { 
          window.turnstile.remove(_turnstileWidgetId); 
          _turnstileWidgetId = null;
        } catch { /* Ignore removal errors */ }
      }
      
      // Crear nueva ventana interactiva
      const token = await createNewTurnstileWidgetInteractiveWithRetry(sitekey, action, true, currentTimeout);
      
      if (token && token.length > 20) {
        log(`✅ CAPTCHA resuelto exitosamente en el intento ${attempt}`);
        if (attempt > 1) {
          showUserNotification('✅ CAPTCHA resuelto exitosamente', 'success');
        }
        return token;
      }
      
      log(`⚠️ Intento ${attempt} falló, reintentando en 30 segundos...`);
      if (attempt > 1) {
        showUserNotification(`⚠️ Intento ${attempt} falló, reintentando en 30 segundos...`, 'info');
      }
      await sleep(30000); // Esperar 30 segundos antes del siguiente intento
      
    } catch (error) {
      log(`❌ Error en intento ${attempt}:`, error.message);
      if (attempt > 1) {
        showUserNotification(`❌ Error en intento ${attempt}, reintentando en 30 segundos`, 'error');
      }
      await sleep(30000);
    }
    
    attempt++;
  }
}

async function createNewTurnstileWidgetInvisible(sitekey, action) {
  return new Promise((resolve) => {
    try {
      if (_turnstileWidgetId && window.turnstile?.remove) {
        try { window.turnstile.remove(_turnstileWidgetId); } catch { /* Ignore removal errors */ }
      }
      const container = ensureTurnstileContainer();
      container.innerHTML = '';
      const widgetId = window.turnstile.render(container, {
        sitekey,
        action,
        size: 'invisible',
        retry: 'auto',
        'retry-interval': 8000,
        callback: (token) => {
          log('✅ Invisible Turnstile callback');
          resolve(token);
        },
        'error-callback': () => resolve(null),
        'timeout-callback': () => resolve(null),
      });
      _turnstileWidgetId = widgetId;
      _lastSitekey = sitekey;
      if (!widgetId) return resolve(null);
      Promise.race([
        window.turnstile.execute(widgetId, { action }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Invisible execute timeout')), 12000))
      ]).then(resolve).catch(() => resolve(null));
    } catch (e) {
      log('Invisible Turnstile failed:', e);
      resolve(null);
    }
  });
}

// Versión con reintentos automáticos para resolución del CAPTCHA
async function createNewTurnstileWidgetInteractiveWithRetry(sitekey, action, isAutoRetry = true, customTimeout = 30000) {
  return new Promise((resolve, reject) => {
    try {
      if (_turnstileWidgetId && window.turnstile?.remove) {
        try { window.turnstile.remove(_turnstileWidgetId); } catch { /* Ignore removal errors */ }
      }

      const overlay = ensureTurnstileOverlayContainer();
      const host = overlay.querySelector('#turnstile-overlay-host');
      host.innerHTML = '';

      // Timeout progresivo para reintentos automáticos
      const timeout = isAutoRetry ? customTimeout : 120000; // Timeout personalizado para auto-retry, 2 minutos para manual
      const timeoutId = setTimeout(() => {
        log(`⏰ Interactive Turnstile timed out (${isAutoRetry ? 'auto-retry' : 'manual'})`);
        // Limpiar overlay en timeout
        try { overlay.remove(); } catch { /* Ignore removal errors */ }
        resolve(null);
      }, timeout);

      const widgetId = window.turnstile.render(host, {
        sitekey,
        action,
        size: 'normal',
        retry: 'auto',
        'retry-interval': isAutoRetry ? 3000 : 8000, // Intervalo más rápido para auto-retry
        callback: (token) => {
          clearTimeout(timeoutId);
          // Hide overlay after success
          try { overlay.remove(); } catch { /* Ignore removal errors */ }
          log(`✅ Interactive Turnstile solved (${isAutoRetry ? 'auto-retry' : 'manual'})`);
          resolve(token);
        },
        'error-callback': (error) => {
          log(`🚨 Interactive Turnstile error (${isAutoRetry ? 'auto-retry' : 'manual'}):`, error);
          if (isAutoRetry) {
            // En modo auto-retry, resolver con null para continuar con el siguiente intento
            clearTimeout(timeoutId);
            try { overlay.remove(); } catch { /* Ignore removal errors */ }
            resolve(null);
          }
        },
        'timeout-callback': () => {
          log(`⏰ Turnstile timeout callback (${isAutoRetry ? 'auto-retry' : 'manual'})`);
          if (isAutoRetry) {
            clearTimeout(timeoutId);
            try { overlay.remove(); } catch { /* Ignore removal errors */ }
            resolve(null);
          }
        },
        'expired-callback': () => {
          log(`⚠️ Interactive Turnstile token expired (${isAutoRetry ? 'auto-retry' : 'manual'})`);
          if (isAutoRetry) {
            clearTimeout(timeoutId);
            try { overlay.remove(); } catch { /* Ignore removal errors */ }
            resolve(null);
          }
        }
      });

      _turnstileWidgetId = widgetId;
      _lastSitekey = sitekey;
      if (!widgetId) {
        clearTimeout(timeoutId);
        try { overlay.remove(); } catch { /* Ignore removal errors */ }
        resolve(null);
        return;
      }
    } catch (error) {
      log(`❌ Error creating interactive Turnstile widget (${isAutoRetry ? 'auto-retry' : 'manual'}):`, error);
      reject(error);
    }
  });
}

function detectSitekey(fallback = '0x4AAAAAABpqJe8FO0N84q0F') {
  // Cache sitekey to avoid repeated DOM queries
  if (_cachedSitekey) {
    return _cachedSitekey;
  }

  try {
    // Try to find sitekey in data attributes
    const sitekeySel = document.querySelector('[data-sitekey]');
    if (sitekeySel) {
      const sitekey = sitekeySel.getAttribute('data-sitekey');
      if (sitekey && sitekey.length > 10) {
        _cachedSitekey = sitekey;
        log("🔍 Sitekey detected from data attribute:", sitekey);
        return sitekey;
      }
    }

    // Try turnstile element
    const turnstileEl = document.querySelector('.cf-turnstile');
    if (turnstileEl?.dataset?.sitekey && turnstileEl.dataset.sitekey.length > 10) {
      _cachedSitekey = turnstileEl.dataset.sitekey;
      log("🔍 Sitekey detected from turnstile element:", _cachedSitekey);
      return _cachedSitekey;
    }

    // Try global variable
    if (typeof window !== 'undefined' && window.__TURNSTILE_SITEKEY && window.__TURNSTILE_SITEKEY.length > 10) {
      _cachedSitekey = window.__TURNSTILE_SITEKEY;
      log("🔍 Sitekey detected from global variable:", _cachedSitekey);
      return _cachedSitekey;
    }

    // Try script tags for inline sitekey
    const scripts = document.querySelectorAll('script');
    for (const script of scripts) {
      const content = script.textContent || script.innerHTML;
      const sitekeyMatch = content.match(/sitekey['":\s]+(['"0-9a-zA-Z_-]{20,})/i);
      if (sitekeyMatch && sitekeyMatch[1] && sitekeyMatch[1].length > 10) {
        _cachedSitekey = sitekeyMatch[1].replace(/['"]/g, '');
        log("🔍 Sitekey detected from script content:", _cachedSitekey);
        return _cachedSitekey;
      }
    }
  } catch (error) {
    log('Error detecting sitekey:', error);
  }
  
  log("🔍 Using fallback sitekey:", fallback);
  _cachedSitekey = fallback;
  return fallback;
}

// Helper functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Función para mostrar notificaciones al usuario
function showUserNotification(message, type = 'info') {
  // Compatibilidad: delegar a top-center para unificar con Auto-Farm
  showUserNotificationTopCenter(message, type);
}

// Estilo top-center como Auto-Farm
function showUserNotificationTopCenter(message, type = 'info', timeout = 3000) {
  let c = document.getElementById('wplace-toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'wplace-toast-container';
    c.style.cssText = `
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    `;
    document.body.appendChild(c);
  }

  const bg = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
  const el = document.createElement('div');
  el.className = 'wplace-toast';
  el.textContent = message;
  el.style.cssText = `
    min-width: 240px;
    max-width: 80vw;
    margin: 0 auto;
    background: ${bg};
    color: white;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    padding: 10px 14px;
    font-weight: 600;
    letter-spacing: .2px;
    transform: translateY(-10px) scale(0.98);
    opacity: 0;
    transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), opacity .25s ease;
    pointer-events: auto;
  `;
  c.appendChild(el);

  const raf = (cb) => (typeof window !== 'undefined' && window.requestAnimationFrame ? window.requestAnimationFrame(cb) : setTimeout(cb, 16));
  raf(() => {
    el.style.transform = 'translateY(0) scale(1)';
    el.style.opacity = '1';
  });

  const remove = () => {
    el.style.transform = 'translateY(-10px) scale(0.98)';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 250);
  };
  if (timeout > 0) setTimeout(remove, timeout);
  el.addEventListener('click', remove);
}

function waitForSelector(selector, interval = 200, timeout = 10000) {
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

// Keep original method as fallback
async function handleCaptchaFallback() {
  return new Promise((resolve, reject) => {
    const executeFlow = async () => {
      try {
        log("🎯 Starting automatic CAPTCHA solving process...");
  try { showUserNotificationTopCenter('Intentando resolver... Tiempo de espera maximo 30 s', 'info'); } catch {}
        
        // Clear any existing token to force fresh generation
        invalidateToken();
        
        // Ensure we have a fresh promise to await for a new token capture
        tokenPromise = new Promise((res) => { _resolveToken = res; });
        
        const timeoutPromise = sleep(30000).then(() => reject(new Error("Auto-CAPTCHA timed out after 30 seconds.")));

        const solvePromise = (async () => {
          // Try to find the main paint button - different selectors for different states
          let mainPaintBtn = await waitForSelector('button.btn.btn-primary.btn-lg', 200, 3000);
          if (!mainPaintBtn) {
            mainPaintBtn = await waitForSelector('button.btn-primary.sm\\:btn-xl', 200, 3000);
          }
          if (!mainPaintBtn) {
            mainPaintBtn = await waitForSelector('button.btn-primary', 200, 3000);
          }
          if (!mainPaintBtn) {
            // If no paint button, try to trigger the flow manually
            log("🎯 No paint button found, clicking on canvas directly to trigger CAPTCHA...");
            const canvas = await waitForSelector('canvas', 200, 5000);
            if (canvas) {
              canvas.click();
              await sleep(1000);
              // Try again to find paint button
              mainPaintBtn = await waitForSelector('button.btn.btn-primary.btn-lg, button.btn-primary.sm\\:btn-xl, button.btn-primary', 200, 5000);
            }
          }
          
          if (!mainPaintBtn) throw new Error("Could not find any paint button after attempts.");
          
          log("🎯 Found paint button, clicking...");
          mainPaintBtn.click();
          await sleep(500);

          // Select transparent color (color 0)
          log("🎯 Selecting transparent color...");
          const transBtn = await waitForSelector('button#color-0', 200, 5000);
          if (!transBtn) {
            log("⚠️ Could not find transparent color button, trying alternative selectors...");
            const colorBtns = document.querySelectorAll('button[id^="color-"]');
            if (colorBtns.length > 0) {
              colorBtns[0].click();
              log("🎯 Clicked first available color button");
            }
          } else {
            transBtn.click();
          }
          await sleep(500);

          // Find and interact with canvas
          log("🎯 Finding canvas element...");
          const canvas = await waitForSelector('canvas', 200, 5000);
          if (!canvas) throw new Error("Could not find the canvas element.");

          canvas.setAttribute('tabindex', '0');
          canvas.focus();
          const rect = canvas.getBoundingClientRect();
          const centerX = Math.round(rect.left + rect.width / 2);
          const centerY = Math.round(rect.top + rect.height / 2);

          log("🎯 Simulating canvas interaction...");
          if (typeof window !== 'undefined' && window.MouseEvent && window.KeyboardEvent) {
            // Simulate mouse movement and click
            canvas.dispatchEvent(new window.MouseEvent('mousemove', { clientX: centerX, clientY: centerY, bubbles: true }));
            canvas.dispatchEvent(new window.MouseEvent('mousedown', { clientX: centerX, clientY: centerY, bubbles: true }));
            await sleep(50);
            canvas.dispatchEvent(new window.MouseEvent('mouseup', { clientX: centerX, clientY: centerY, bubbles: true }));
            
            // Simulate space key press
            canvas.dispatchEvent(new window.KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true }));
            await sleep(50);
            canvas.dispatchEvent(new window.KeyboardEvent('keyup', { key: ' ', code: 'Space', bubbles: true }));
          }
          await sleep(1000);

          // Wait a bit more for CAPTCHA to potentially appear
          log("🎯 Waiting for CAPTCHA challenge...");
          await sleep(2000);

          // Keep confirming until token is captured or timeout
          log("🎯 Starting confirmation loop...");
          const startTime = Date.now();
          const confirmLoop = async () => {
            let attempts = 0;
            while (!isTokenValid() && Date.now() - startTime < 25000) { // 25 second timeout for confirmations
              attempts++;
              
              // Look for confirm button with multiple selectors
              let confirmBtn = await waitForSelector('button.btn.btn-primary.btn-lg', 100, 1000);
              if (!confirmBtn) {
                confirmBtn = await waitForSelector('button.btn.btn-primary.sm\\:btn-xl', 100, 1000);
              }
              if (!confirmBtn) {
                const allPrimary = Array.from(document.querySelectorAll('button.btn-primary'));
                confirmBtn = allPrimary.length ? allPrimary[allPrimary.length - 1] : null;
              }
              
              if (confirmBtn && !confirmBtn.disabled) {
                log(`🎯 Clicking confirmation button (attempt ${attempts})...`);
                confirmBtn.click();
              } else {
                log(`🎯 No active confirm button found (attempt ${attempts})`);
              }
              
              await sleep(800); // Slightly longer delay between attempts
            }
          };

          // Start confirmation loop and wait for token
          confirmLoop();
          const token = await tokenPromise;
          await sleep(500); // small delay after token is captured
          log("✅ Token successfully captured through browser automation");
          resolve(token);
        })();

        await Promise.race([solvePromise, timeoutPromise]);

      } catch (error) {
        log("❌ Auto-CAPTCHA process failed:", error);
        reject(error);
      }
    };

    executeFlow();
  });
}

// TOKEN CAPTURE SYSTEM (replicated from example)
// This must be called by the site when the turnstile token is received
window.__WPA_SET_TURNSTILE_TOKEN__ = function(token) {
  if (token && typeof token === 'string' && token.length > 20) {
    log("✅ Turnstile Token Captured:", token);
    setTurnstileToken(token);
  }
};

// Hook into fetch to capture turnstile tokens from POST requests (replicated from example)
(function() {
  if (window.__WPA_FETCH_HOOKED__) return; // Avoid hooking twice
  window.__WPA_FETCH_HOOKED__ = true;

  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const response = await originalFetch.apply(this, args);
    const url = (args[0] instanceof Request) ? args[0].url : args[0];

    if (typeof url === "string") {
    if (url.includes("https://backend.wplace.live/s0/pixel/")) {
        try {
          const payload = JSON.parse(args[1].body);
      const capturedToken = payload.t || payload.token || null;
      if (capturedToken) {
            // Only capture token if we don't have a valid one or if it's different
            if (!isTokenValid() || turnstileToken !== capturedToken) {
              log("✅ Turnstile Token Captured:", capturedToken);
              window.postMessage({ source: 'turnstile-capture', token: capturedToken }, '*');
            }
          }
        } catch { /* ignore */ }
      }
    }

    return response;
  };

  // Listen for token capture messages
  window.addEventListener('message', (event) => {
    const { source, token } = event.data;

    if (source === 'turnstile-capture' && token) {
      // Only set if we don't have a valid token or if it's a different/newer token
      if (!isTokenValid() || turnstileToken !== token) {
        setTurnstileToken(token);
      }
    }
  });
})();

// Export the key functions
export { handleCaptcha, loadTurnstile, executeTurnstile, detectSitekey, invalidateToken };

// Legacy compatibility function 
export async function getTurnstileToken(_siteKey) {
  log("⚠️ Using legacy getTurnstileToken function, consider migrating to ensureToken()");
  return await ensureToken();
}
