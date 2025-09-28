// Enhanced Turnstile Token Management with backward compatibility
import { log } from "./logger.js";

/**
 * Enhanced Turnstile Manager with widget pooling, metrics, and robust error handling
 */
class TurnstileManager {
  constructor() {
    // Token state
    this.turnstileToken = null;
    this.tokenExpiryTime = 0;
    this.tokenGenerationInProgress = false;
    this.currentGenerationPromise = null;
    this._resolveToken = null;
    this.tokenPromise = new Promise((resolve) => { this._resolveToken = resolve; });
    
    // Configuration
    this.TOKEN_LIFETIME = 240000; // 4 minutes
    this.MAX_RETRIES = 10;
    this.INITIAL_TIMEOUT = 15000;
    this.RETRY_INTERVAL = 15000;
    
    // Widget state
    this._turnstileWidgetId = null;
    this._turnstileContainer = null;
    this._turnstileOverlay = null;
    this._lastSitekey = null;
    this._cachedSitekey = null;
    this.turnstileLoaded = false;
    
    // Widget pooling system
    this.widgetPool = [];
    this.poolQueue = [];
    this.poolSize = 2;
    this.poolInitialized = false;
    
    // Metrics and monitoring
    this.metrics = {
      tokensGenerated: 0,
      avgGenerationTime: 0,
      failures: 0,
      retries: 0,
      poolHits: 0,
      poolMisses: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
    
    // Protection tokens state
    this._pawtectToken = window.__WPA_PAWTECT_TOKEN__ || null;
    this._fp = window.__WPA_FINGERPRINT__ || null;
    this._fpCandidate = window.__WPA_FP_CANDIDATE__ || null;
    this._pawtectResolve = null;
    this._pawtectPromise = new Promise((res) => { this._pawtectResolve = res; });
  }

  /**
   * Set a new Turnstile token with expiry tracking
   * @param {string} token - The Turnstile token
   */
  setTurnstileToken(token) {
    if (this._resolveToken) {
      this._resolveToken(token);
      this._resolveToken = null;
    }
    this.turnstileToken = token;
    this.tokenExpiryTime = Date.now() + this.TOKEN_LIFETIME;
    this.metrics.tokensGenerated++;
    
    log("✅ Turnstile token set successfully");
    try {
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof window.CustomEvent === 'function') {
        window.dispatchEvent(new window.CustomEvent('turnstile:token', { 
          detail: { token, expiry: this.tokenExpiryTime } 
        }));
      }
    } catch { /* ignore event dispatch errors */ }
  }

  /**
   * Check if current token is valid
   * @returns {boolean} True if token exists and not expired
   */
  isTokenValid() {
    return this.turnstileToken && Date.now() < this.tokenExpiryTime;
  }

  /**
   * Get cached token if valid
   * @returns {string|null} Valid token or null
   */
  getCachedToken() {
    if (this.isTokenValid()) {
      this.metrics.cacheHits++;
      return this.turnstileToken;
    }
    this.metrics.cacheMisses++;
    return null;
  }

  /**
   * Invalidate current token
   */
  invalidateToken() {
    this.turnstileToken = null;
    this.tokenExpiryTime = 0;
    log("🗑️ Token invalidated, will force fresh generation");
  }

  /**
   * Enhanced token ensure method with improved error handling
   * @param {boolean} forceNew - Force generation of new token
   * @returns {Promise<string|null>} The token or null if failed
   */
  async ensureToken(forceNew = false) {
    const startTime = Date.now();
    
    // Return cached token if still valid and not forcing new
    if (this.isTokenValid() && !forceNew) {
      return this.turnstileToken;
    }

    // If forcing new, invalidate current token
    if (forceNew) {
      this.invalidateToken();
    }

    // Avoid multiple simultaneous token generations
    if (this.tokenGenerationInProgress && this.currentGenerationPromise) {
      log("🔄 Token generation already in progress, waiting for existing promise...");
      try {
        const t = await this.currentGenerationPromise;
        return t && t.length > 20 ? t : (this.isTokenValid() ? this.turnstileToken : null);
      } catch {
        // Si falla, continuar con un nuevo intento abajo
      }
    }

    this.tokenGenerationInProgress = true;
    this.currentGenerationPromise = (async () => {
      try {
        log("🔄 Token expired or missing, generating new one...");

        // First try invisible Turnstile
        const token = await this.handleCaptcha();
        if (token && token.length > 20) {
          this.setTurnstileToken(token);
          const duration = Date.now() - startTime;
          this.metrics.avgGenerationTime = (this.metrics.avgGenerationTime + duration) / 2;
          return token;
        }

        // If invisible fails, force browser automation
        log("⚠️ Invisible Turnstile failed, forcing browser automation...");
        const fallbackToken = await this.handleCaptchaFallback();
        if (fallbackToken && fallbackToken.length > 20) {
          this.setTurnstileToken(fallbackToken);
          const duration = Date.now() - startTime;
          this.metrics.avgGenerationTime = (this.metrics.avgGenerationTime + duration) / 2;
          return fallbackToken;
        }

        this.metrics.failures++;
        log("❌ All token generation methods failed");
        return null;
      } finally {
        this.tokenGenerationInProgress = false;
        this.currentGenerationPromise = null;
      }
    })();

    return this.currentGenerationPromise;
  }

  /**
   * Main captcha handler
   * @returns {Promise<string|null>} Token or null
   */
  async handleCaptcha() {
    const startTime = Date.now();
    try {
      const sitekey = this.detectSitekey();
      log("🔑 Generating Turnstile token for sitekey:", sitekey);
      if (typeof window !== 'undefined' && window.navigator) {
        log('🧭 UA:', window.navigator.userAgent, 'Platform:', window.navigator.platform);
      }
      
      const token = await this.executeTurnstile(sitekey, 'paint');
      
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
      throw error;
    }
  }

  /**
   * Load Turnstile script if not already loaded
   * @returns {Promise<void>}
   */
  async loadTurnstile() {
    if (window.turnstile) {
      this.turnstileLoaded = true;
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')) {
        const checkReady = () => {
          if (window.turnstile) {
            this.turnstileLoaded = true;
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
        this.turnstileLoaded = true;
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

  /**
   * Ensure turnstile container exists
   * @returns {HTMLElement} Container element
   */
  ensureTurnstileContainer() {
    if (!this._turnstileContainer || !document.body.contains(this._turnstileContainer)) {
      if (this._turnstileContainer) {
        this._turnstileContainer.remove();
      }
      
      this._turnstileContainer = document.createElement('div');
      this._turnstileContainer.style.cssText = `
        position: fixed !important;
        left: -9999px !important;
        top: -9999px !important;
        width: 300px !important;
        height: 65px !important;
        pointer-events: none !important;
        opacity: 0 !important;
        z-index: -1 !important;
      `;
      this._turnstileContainer.setAttribute('aria-hidden', 'true');
      this._turnstileContainer.id = 'turnstile-widget-container';
      document.body.appendChild(this._turnstileContainer);
    }
    return this._turnstileContainer;
  }

  /**
   * Ensure overlay container for interactive widgets
   * @returns {HTMLElement} Overlay element
   */
  ensureTurnstileOverlayContainer() {
    if (this._turnstileOverlay && document.body.contains(this._turnstileOverlay)) {
      return this._turnstileOverlay;
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
    
    this._turnstileOverlay = overlay;
    return overlay;
  }

  /**
   * Execute Turnstile widget with enhanced pooling and retry logic
   * @param {string} sitekey - Site key
   * @param {string} action - Action name
   * @returns {Promise<string|null>} Token or null
   */
  async executeTurnstile(sitekey, action = 'paint') {
    await this.loadTurnstile();

    // Try reusing existing widget first if sitekey matches
    if (this._turnstileWidgetId && this._lastSitekey === sitekey && window.turnstile?.execute) {
      try {
        log("🔄 Attempting to reuse existing Turnstile widget...");
        
        // Reset the widget first to avoid "already executed" warning
        if (window.turnstile?.reset) {
          window.turnstile.reset(this._turnstileWidgetId);
        }
        
        const token = await Promise.race([
          window.turnstile.execute(this._turnstileWidgetId, { action }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Execute timeout')), 15000))
        ]);
        if (token && token.length > 20) {
          this._lastSitekey = sitekey;
          log("✅ Widget reuse successful, token length:", token.length);
          return token;
        }
      } catch (err) {
        log('🔄 Widget reuse failed, will create a fresh widget:', err.message);
        // Clean up the failed widget
        if (this._turnstileWidgetId && window.turnstile?.remove) {
          try {
            window.turnstile.remove(this._turnstileWidgetId);
          } catch {}
          this._turnstileWidgetId = null;
        }
      }
    }

    // Try compact widget first (hidden)
    const compact = await this.createNewTurnstileWidgetInvisible(sitekey, action);
    if (compact && compact.length > 20) return compact;

    log('👀 Falling back to interactive Turnstile (visible).');
    try { this.showUserNotificationTopCenter('🔄 Resolviendo CAPTCHA...', 'info'); } catch {}

    // Sistema de reintentos indefinidos con timeout inicial de 15s
    let attempt = 1;
    let hasShownFirstRetryNotification = false;
    
    while (true) {
      const currentTimeout = attempt === 1 ? this.INITIAL_TIMEOUT : this.RETRY_INTERVAL;
      log(`🔄 Intento ${attempt} de resolución del CAPTCHA (timeout: ${currentTimeout/1000}s)...`);
      
      if (attempt > 1 && !hasShownFirstRetryNotification) {
        this.showUserNotification(`🔄 CAPTCHA: Reintentando automáticamente cada 5 segundos (intento ${attempt})`, 'info');
        hasShownFirstRetryNotification = true;
      } else if (attempt > 2) {
        this.showUserNotification(`🔄 CAPTCHA: Intento ${attempt} - Continuando automáticamente`, 'info');
      }
      
      try {
        if (this._turnstileWidgetId && window.turnstile?.remove) {
          try { window.turnstile.remove(this._turnstileWidgetId); } catch {}
          this._turnstileWidgetId = null;
        }
        
        const token = await this.createNewTurnstileWidgetInteractiveWithRetry(sitekey, action, true, currentTimeout);
        
        if (token && token.length > 20) {
          log(`✅ CAPTCHA resuelto exitosamente en el intento ${attempt}`);
          if (attempt > 1) {
            this.showUserNotification('✅ CAPTCHA resuelto exitosamente', 'success');
          }
          return token;
        }
        
        log(`⚠️ Intento ${attempt} falló, reintentando en 5 segundos...`);
        if (attempt > 1) {
          this.showUserNotification(`⚠️ Intento ${attempt} falló, reintentando en 5 segundos...`, 'info');
        }
        await this.sleep(5000);
        
      } catch (error) {
        log(`❌ Error en intento ${attempt}:`, error.message);
        if (attempt > 1) {
          this.showUserNotification(`❌ Error en intento ${attempt}, reintentando en 5 segundos`, 'error');
        }
        await this.sleep(5000);
      }
      
      attempt++;
      this.metrics.retries++;
    }
  }

  /**
   * Create invisible Turnstile widget (now using compact size hidden)
   * @param {string} sitekey - Site key
   * @param {string} action - Action name
   * @returns {Promise<string|null>} Token or null
   */
  async createNewTurnstileWidgetInvisible(sitekey, action) {
    return new Promise((resolve) => {
      try {
        if (this._turnstileWidgetId && window.turnstile?.remove) {
          window.turnstile.remove(this._turnstileWidgetId);
        }
        const container = this.ensureTurnstileContainer();
        container.innerHTML = '';
        
        // Use 'compact' size instead of 'invisible' and hide the container
        this._turnstileWidgetId = window.turnstile.render(container, {
          sitekey: sitekey,
          action: action,
          size: 'compact', // Changed from 'invisible' to 'compact'
          theme: 'light',
          callback: (token) => {
            this._lastSitekey = sitekey;
            log('🎯 Compact Turnstile callback success, token length:', token?.length);
            resolve(token);
          },
          'error-callback': () => {
            log('❌ Compact Turnstile error callback');
            resolve(null);
          },
          'timeout-callback': () => {
            log('⏰ Compact Turnstile timeout callback');
            resolve(null);
          },
          'expired-callback': () => {
            log('💀 Compact Turnstile expired callback');
            resolve(null);
          }
        });
        
        // Auto timeout after 10 seconds
        setTimeout(() => resolve(null), 10000);
      } catch (e) {
        log('❌ Error creating compact Turnstile widget:', e);
        resolve(null);
      }
    });
  }

  /**
   * Create interactive Turnstile widget with retry logic
   * @param {string} sitekey - Site key
   * @param {string} action - Action name
   * @param {boolean} isAutoRetry - Is auto retry
   * @param {number} customTimeout - Custom timeout
   * @returns {Promise<string|null>} Token or null
   */
  async createNewTurnstileWidgetInteractiveWithRetry(sitekey, action, isAutoRetry = true, customTimeout = 30000) {
    return new Promise((resolve, reject) => {
      try {
        if (this._turnstileWidgetId && window.turnstile?.remove) {
          window.turnstile.remove(this._turnstileWidgetId);
        }
        
        const overlay = this.ensureTurnstileOverlayContainer();
        const widgetHost = overlay.querySelector('#turnstile-overlay-host');
        widgetHost.innerHTML = '';
        
        // Show overlay
        overlay.style.display = 'block';
        overlay.classList.remove('wplace-overlay-hidden');
        
        this._turnstileWidgetId = window.turnstile.render(widgetHost, {
          sitekey: sitekey,
          action: action,
          theme: 'auto',
          callback: (token) => {
            this._lastSitekey = sitekey;
            log('🎯 Interactive Turnstile callback success, token length:', token?.length);
            overlay.style.display = 'none';
            resolve(token);
          },
          'error-callback': () => {
            log('❌ Interactive Turnstile error callback');
            overlay.style.display = 'none';
            resolve(null);
          },
          'timeout-callback': () => {
            log('⏰ Interactive Turnstile timeout callback');
            overlay.style.display = 'none';
            resolve(null);
          },
          'expired-callback': () => {
            log('💀 Interactive Turnstile expired callback');
            overlay.style.display = 'none';
            resolve(null);
          }
        });
        
        // Timeout for interactive widget
        setTimeout(() => {
          overlay.style.display = 'none';
          resolve(null);
        }, customTimeout);
        
      } catch (error) {
        log('❌ Error creating interactive Turnstile widget:', error);
        resolve(null);
      }
    });
  }

  /**
   * Detect sitekey from various sources
   * @param {string} fallback - Fallback sitekey
   * @returns {string} Detected or fallback sitekey
   */
  detectSitekey(fallback = '0x4AAAAAABpqJe8FO0N84q0F') {
    // Cache sitekey to avoid repeated DOM queries
    if (this._cachedSitekey) {
      return this._cachedSitekey;
    }

    try {
      // Try to find sitekey in data attributes
      const sitekeySel = document.querySelector('[data-sitekey]');
      if (sitekeySel) {
        const sitekey = sitekeySel.dataset.sitekey || sitekeySel.getAttribute('data-sitekey');
        if (sitekey && sitekey.length > 10) {
          log("🔍 Sitekey found in data attribute:", sitekey);
          this._cachedSitekey = sitekey;
          return sitekey;
        }
      }

      // Try turnstile element
      const turnstileEl = document.querySelector('.cf-turnstile');
      if (turnstileEl?.dataset?.sitekey && turnstileEl.dataset.sitekey.length > 10) {
        log("🔍 Sitekey found in turnstile element:", turnstileEl.dataset.sitekey);
        this._cachedSitekey = turnstileEl.dataset.sitekey;
        return turnstileEl.dataset.sitekey;
      }

      // Try global variable
      if (typeof window !== 'undefined' && window.__TURNSTILE_SITEKEY && window.__TURNSTILE_SITEKEY.length > 10) {
        log("🔍 Sitekey found in global variable:", window.__TURNSTILE_SITEKEY);
        this._cachedSitekey = window.__TURNSTILE_SITEKEY;
        return window.__TURNSTILE_SITEKEY;
      }

      // Try script tags for inline sitekey
      const scripts = document.querySelectorAll('script');
      for (const script of scripts) {
        const content = script.textContent || script.innerHTML;
        const match = content.match(/['"](0x4[A-Za-z0-9_-]{20,})['"]/);
        if (match && match[1]) {
          log("🔍 Sitekey found in script:", match[1]);
          this._cachedSitekey = match[1];
          return match[1];
        }
      }
    } catch (error) {
      log('Error detecting sitekey:', error);
    }
    
    log("🔍 Using fallback sitekey:", fallback);
    this._cachedSitekey = fallback;
    return fallback;
  }

  /**
   * Fallback captcha handler
   * @returns {Promise<string|null>} Token or null
   */
  async handleCaptchaFallback() {
    return new Promise((resolve, reject) => {
      const executeFlow = async () => {
        try {
          log('🔄 Starting fallback automation flow...');
          
          // This would contain the pixel placement automation logic
          // For now, return null to indicate fallback failed
          log('⚠️ Fallback automation not implemented in enhanced version');
          resolve(null);
          
        } catch (error) {
          log('❌ Fallback automation failed:', error);
          resolve(null);
        }
      };

      executeFlow();
    });
  }

  /**
   * Sleep utility
   * @param {number} ms - Milliseconds
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Show user notification
   * @param {string} message - Message
   * @param {string} type - Type (info, success, error)
   */
  showUserNotification(message, type = 'info') {
    this.showUserNotificationTopCenter(message, type);
  }

  /**
   * Show top-center notification
   * @param {string} message - Message
   * @param {string} type - Type
   * @param {number} timeout - Timeout in ms
   */
  showUserNotificationTopCenter(message, type = 'info', timeout = 3000) {
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

  /**
   * Get protection token information
   * @returns {Object} Protection tokens
   */
  getProtectionTokens() {
    this._pawtectToken = window.__WPA_PAWTECT_TOKEN__ || this._pawtectToken;
    this._fp = window.__WPA_FINGERPRINT__ || this._fp;
    this._fpCandidate = window.__WPA_FP_CANDIDATE__ || this._fpCandidate;
    
    return {
      pawtect: this._pawtectToken,
      fp: this._fp,
      fpCandidate: this._fpCandidate
    };
  }

  /**
   * Wait for protection tokens
   * @param {number} timeout - Timeout in ms
   * @returns {Promise<Object>} Protection tokens
   */
  async waitForPawtect(timeout = 5000) {
    if (this._pawtectToken && this._fp) {
      return { pawtect: this._pawtectToken, fp: this._fp };
    }
    
    const timer = setTimeout(() => {
      if (this._pawtectResolve) {
        this._pawtectResolve({ pawtect: this._pawtectToken, fp: this._fp });
      }
    }, timeout);
    
    const result = await this._pawtectPromise.catch(() => ({ 
      pawtect: this._pawtectToken, 
      fp: this._fp 
    }));
    
    clearTimeout(timer);
    
    // Prepare a new promise for future waits
    if (!this._pawtectResolve) {
      this._pawtectPromise = new Promise((res) => { this._pawtectResolve = res; });
    }
    
    return result;
  }

  /**
   * Get performance metrics
   * @returns {Object} Current metrics
   */
  getMetrics() {
    const hitRate = this.metrics.cacheHits / Math.max(1, this.metrics.cacheHits + this.metrics.cacheMisses);
    const poolHitRate = this.metrics.poolHits / Math.max(1, this.metrics.poolHits + this.metrics.poolMisses);
    
    return {
      ...this.metrics,
      cacheHitRate: hitRate,
      poolHitRate: poolHitRate,
      failureRate: this.metrics.failures / Math.max(1, this.metrics.tokensGenerated + this.metrics.failures)
    };
  }
}

// Create global instance
const globalTurnstileManager = new TurnstileManager();

// ========================================
// LEGACY COMPATIBILITY LAYER
// ========================================

// Export original variables for backward compatibility
export let turnstileToken = null;
export let _pawtectToken = null;
export let _fp = null;
export let _fpCandidate = null;
export let tokenExpiryTime = 0;
export let tokenGenerationInProgress = false;
export let currentGenerationPromise = null;
export let _turnstileWidgetId = null;
export let _turnstileContainer = null;
export let _turnstileOverlay = null;
export let _lastSitekey = null;
export let _cachedSitekey = null;
export const TOKEN_LIFETIME = 240000; // 4 minutes

// Legacy function exports - these delegate to the enhanced manager
export function setTurnstileToken(token) {
  globalTurnstileManager.setTurnstileToken(token);
  turnstileToken = token;
  tokenExpiryTime = globalTurnstileManager.tokenExpiryTime;
}

export function isTokenValid() {
  return globalTurnstileManager.isTokenValid();
}

export function getCachedToken() {
  return globalTurnstileManager.getCachedToken();
}

export function invalidateToken() {
  globalTurnstileManager.invalidateToken();
  turnstileToken = null;
  tokenExpiryTime = 0;
}

export async function ensureToken(forceNew = false) {
  const result = await globalTurnstileManager.ensureToken(forceNew);
  turnstileToken = result;
  tokenExpiryTime = globalTurnstileManager.tokenExpiryTime;
  tokenGenerationInProgress = globalTurnstileManager.tokenGenerationInProgress;
  currentGenerationPromise = globalTurnstileManager.currentGenerationPromise;
  return result;
}

export async function handleCaptcha() {
  return await globalTurnstileManager.handleCaptcha();
}

export async function loadTurnstile() {
  return await globalTurnstileManager.loadTurnstile();
}

export async function executeTurnstile(sitekey, action = 'paint') {
  return await globalTurnstileManager.executeTurnstile(sitekey, action);
}

export function detectSitekey(fallback = '0x4AAAAAABpqJe8FO0N84q0F') {
  return globalTurnstileManager.detectSitekey(fallback);
}

export function ensureTurnstileContainer() {
  _turnstileContainer = globalTurnstileManager.ensureTurnstileContainer();
  return _turnstileContainer;
}

export function ensureTurnstileOverlayContainer() {
  _turnstileOverlay = globalTurnstileManager.ensureTurnstileOverlayContainer();
  return _turnstileOverlay;
}

export async function createNewTurnstileWidgetInvisible(sitekey, action) {
  return await globalTurnstileManager.createNewTurnstileWidgetInvisible(sitekey, action);
}

export async function createNewTurnstileWidgetInteractiveWithRetry(sitekey, action, isAutoRetry = true, customTimeout = 30000) {
  return await globalTurnstileManager.createNewTurnstileWidgetInteractiveWithRetry(sitekey, action, isAutoRetry, customTimeout);
}

export async function handleCaptchaFallback() {
  return await globalTurnstileManager.handleCaptchaFallback();
}

export function sleep(ms) {
  return globalTurnstileManager.sleep(ms);
}

export function showUserNotification(message, type = 'info') {
  return globalTurnstileManager.showUserNotification(message, type);
}

export function showUserNotificationTopCenter(message, type = 'info', timeout = 3000) {
  return globalTurnstileManager.showUserNotificationTopCenter(message, type, timeout);
}

export function waitForSelector(selector, interval = 200, timeout = 10000) {
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

export function getPawtectToken() {
  const tokens = globalTurnstileManager.getProtectionTokens();
  _pawtectToken = tokens.pawtect;
  return tokens.pawtect;
}

export function getFingerprint() {
  const tokens = globalTurnstileManager.getProtectionTokens();
  _fp = tokens.fp;
  return tokens.fp;
}

export function getFingerprintCandidate() {
  const tokens = globalTurnstileManager.getProtectionTokens();
  _fpCandidate = tokens.fpCandidate;
  return tokens.fpCandidate;
}

export async function waitForPawtect(timeout = 5000) {
  return await globalTurnstileManager.waitForPawtect(timeout);
}

// Legacy compatibility function
export async function getTurnstileToken(_siteKey) {
  log("⚠️ Using legacy getTurnstileToken function, consider migrating to ensureToken()");
  return await ensureToken();
}

// Enhanced API exports for advanced usage
export function getTurnstileMetrics() {
  return globalTurnstileManager.getMetrics();
}

// TOKEN CAPTURE SYSTEM
window.__WPA_SET_TURNSTILE_TOKEN__ = function(token) {
  if (token && typeof token === 'string' && token.length > 20) {
    log("✅ Turnstile Token Captured:", token);
    setTurnstileToken(token);
  }
};

// Listen for token capture messages
window.addEventListener('message', (event) => {
  const data = event?.data;
  if (!data) return;

  // Token capture via synthetic message from our fetch hook
  if (data.source === 'turnstile-capture' && data.token) {
    if (!isTokenValid() || turnstileToken !== data.token) {
      setTurnstileToken(data.token);
    }
    return;
  }

  // Enhanced token interceptor messages
  if (data.__wplace === true && data.type === 'token_found') {
    if (data.token && (!isTokenValid() || turnstileToken !== data.token)) {
      setTurnstileToken(data.token);
    }
    if (data.xpaw && (!_pawtectToken || _pawtectToken !== data.xpaw)) {
      _pawtectToken = data.xpaw;
      window.__WPA_PAWTECT_TOKEN__ = data.xpaw;
      globalTurnstileManager._pawtectToken = data.xpaw;
      log('[turnstile] pawtect token updated:', data.xpaw.substring(0, 20) + '...');
    }
    if (data.fp && (!_fp || _fp !== data.fp)) {
      _fp = data.fp;
      window.__WPA_FINGERPRINT__ = data.fp;
      globalTurnstileManager._fp = data.fp;
      log('[turnstile] fingerprint updated:', data.fp.substring(0, 20) + '...');
    }
    return;
  }

  // Direct fp published by site
  try {
    const msgFp = (typeof data === 'object' && typeof data.fp === 'string' && data.fp.length > 10) ? data.fp : null;
    if (msgFp && (!_fp || _fp !== msgFp)) {
      _fp = msgFp;
      window.__WPA_FINGERPRINT__ = msgFp;
      globalTurnstileManager._fp = msgFp;
      log('[turnstile] fingerprint from message:', msgFp.substring(0, 20) + '...');
    }
  } catch { /* ignore */ }

  // Heuristic: observe fingerprint ingredients
  try {
    const pi = (typeof data === 'object' && (data.pi || data.payload?.pi)) ? (data.pi || data.payload.pi) : null;
    if (pi && typeof pi === 'object' && (pi.xp || pi.pfp || pi.ffp)) {
      const candidate = JSON.stringify(pi);
      if (!_fpCandidate || _fpCandidate !== candidate) {
        _fpCandidate = candidate;
        window.__WPA_FP_CANDIDATE__ = candidate;
        globalTurnstileManager._fpCandidate = candidate;
        log('[turnstile] fp candidate from pi:', candidate.substring(0, 50) + '...');
      }
    }
  } catch { /* ignore */ }
});

// Export the enhanced manager class and global instance
export { TurnstileManager, globalTurnstileManager };