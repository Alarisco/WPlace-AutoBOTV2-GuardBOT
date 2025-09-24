// Enhanced Pawtect computation with improved caching, error handling, and metrics
import { log } from './logger.js';

/**
 * Enhanced Pawtect Manager with robust caching, error handling, and performance metrics
 */
class PawtectManager {
  constructor() {
    // Core WASM state
    this._wasmMod = null;
    this._wasm = null;
    this._chunkUrl = null;
    this._initUser = false;
    this._busy = false;
    
    // Enhanced caching system
    this._cache = new Map();
    this.CACHE_TTL = 120000; // 2 minutes
    this._cacheCleanupInterval = null;
    
    // Configuration
    this.MAX_RETRIES = 3;
    this.RETRY_DELAY_BASE = 1000; // Base delay for exponential backoff
    this.CHUNK_DISCOVERY_TIMEOUT = 10000;
    this.WASM_LOAD_TIMEOUT = 15000;
    
    // Performance metrics
    this.metrics = {
      computations: 0,
      cacheHits: 0,
      cacheMisses: 0,
      errors: 0,
      retries: 0,
      avgComputeTime: 0,
      wasmLoadTime: 0,
      chunkDiscoveryTime: 0
    };
    
    // Error tracking
    this.errorHistory = [];
    this.MAX_ERROR_HISTORY = 50;
    
    // Initialize cache cleanup
    this._initializeCacheCleanup();
    
    log('[pawtect] Enhanced PawtectManager initialized');
  }

  /**
   * Initialize automatic cache cleanup
   * @private
   */
  _initializeCacheCleanup() {
    // Clean cache every minute
    if (typeof window !== 'undefined' && typeof window.setInterval === 'function') {
      this._cacheCleanupInterval = window.setInterval(() => {
        this._cleanupExpiredCache();
      }, 60000);
    }
  }

  /**
   * Clean up expired cache entries
   * @private
   */
  _cleanupExpiredCache() {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, value] of this._cache.entries()) {
      if (now - value.ts > this.CACHE_TTL) {
        this._cache.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      log(`[pawtect] Cleaned ${cleanedCount} expired cache entries`);
    }
  }

  /**
   * Validate and normalize input body object
   * @param {Object} bodyObj - Input body object
   * @returns {string} Stable JSON string
   * @private
   */
  _validateAndNormalizeInput(bodyObj) {
    if (!bodyObj || typeof bodyObj !== 'object') {
      throw new Error('Invalid bodyObj: must be a non-null object');
    }
    
    try {
      return JSON.stringify(bodyObj, Object.keys(bodyObj).sort());
    } catch (error) {
      log('[pawtect] Error serializing bodyObj:', error);
      throw new Error('Failed to serialize bodyObj to JSON');
    }
  }

  /**
   * Enhanced chunk discovery with multiple strategies and timeout
   * @returns {Promise<string|null>} Chunk URL or null
   * @private
   */
  async _discoverChunkAdvanced() {
    if (this._chunkUrl) return this._chunkUrl;
    
    const startTime = Date.now();
    
    try {
      if (typeof document === 'undefined') return null;
      
      const strategies = [
        () => this._discoverFromScriptTags(),
        () => this._discoverFromLinks(),
        () => this._discoverFromPerformanceAPI()
      ];
      
      for (const strategy of strategies) {
        try {
          const url = await Promise.race([
            strategy(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Strategy timeout')), 3000)
            )
          ]);
          
          if (url) {
            this._chunkUrl = url;
            this.metrics.chunkDiscoveryTime = Date.now() - startTime;
            log('[pawtect] chunk encontrado con estrategia avanzada:', url);
            return url;
          }
        } catch (error) {
          log('[pawtect] strategy failed:', error.message);
        }
      }
    } catch (error) {
      log('[pawtect] chunk discovery failed:', error);
    }
    
    this.metrics.chunkDiscoveryTime = Date.now() - startTime;
    return null;
  }

  /**
   * Discover chunks from script tags
   * @returns {Promise<string|null>}
   * @private
   */
  async _discoverFromScriptTags() {
    const urls = new Set();
    
    try {
      document.querySelectorAll('script[src]')?.forEach(s => {
        try {
          if (typeof window !== 'undefined' && window.URL && window.location) {
            urls.add(new window.URL(s.src, window.location.href).href);
          }
        } catch {}
      });
    } catch {}
    
    return this._testUrlCandidates([...urls]);
  }

  /**
   * Discover chunks from link tags
   * @returns {Promise<string|null>}
   * @private
   */
  async _discoverFromLinks() {
    const urls = new Set();
    
    try {
      document.querySelectorAll('link[rel="modulepreload"][href],link[as="script"][href]')?.forEach(l => {
        try {
          if (typeof window !== 'undefined' && window.URL && window.location) {
            urls.add(new window.URL(l.href, window.location.href).href);
          }
        } catch {}
      });
    } catch {}
    
    return this._testUrlCandidates([...urls]);
  }

  /**
   * Discover chunks from Performance API
   * @returns {Promise<string|null>}
   * @private
   */
  async _discoverFromPerformanceAPI() {
    const urls = new Set();
    
    try {
      if (typeof window !== 'undefined' && window.performance) {
        (window.performance.getEntriesByType('resource') || []).forEach(e => {
          if (e?.name) urls.add(e.name);
        });
      }
    } catch {}
    
    return this._testUrlCandidates([...urls]);
  }

  /**
   * Test URL candidates for pawtect functionality
   * @param {string[]} urls - URLs to test
   * @returns {Promise<string|null>}
   * @private
   */
  async _testUrlCandidates(urls) {
    const candidates = urls.filter(u => 
      /\/(_app|assets)\/immutable\/chunks\/.*\.js/i.test(u)
    );
    
    for (const src of candidates) {
      try {
        const response = await Promise.race([
          fetch(src, { credentials: 'omit' }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Fetch timeout')), 5000)
          )
        ]);
        
        const txt = await response.text();
        if (/get_pawtected_endpoint_payload|pawtect/i.test(txt)) {
          return src;
        }
      } catch (error) {
        log('[pawtect] failed to test candidate:', src, error.message);
      }
    }
    
    return null;
  }

  /**
   * Load WASM module with enhanced error handling and timeout
   * @returns {Promise<Object|null>} WASM module or null
   * @private
   */
  async _loadWasmEnhanced() {
    if (this._wasm) return this._wasm;
    
    const startTime = Date.now();
    
    try {
      const url = await Promise.race([
        this._discoverChunkAdvanced(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Chunk discovery timeout')), this.CHUNK_DISCOVERY_TIMEOUT)
        )
      ]);
      
      if (!url) {
        log('[pawtect] no se encontró chunk después de búsqueda avanzada');
        return null;
      }
      
      const wasmMod = await Promise.race([
        import(/* @vite-ignore */ url),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('WASM import timeout')), this.WASM_LOAD_TIMEOUT)
        )
      ]);
      
      if (typeof wasmMod._ === 'function') {
        this._wasmMod = wasmMod;
        this._wasm = await wasmMod._();
        this.metrics.wasmLoadTime = Date.now() - startTime;
        log('[pawtect] wasm cargado exitosamente en', this.metrics.wasmLoadTime, 'ms');
        return this._wasm;
      }
      
      throw new Error('WASM module does not have expected interface');
      
    } catch (error) {
      this.metrics.wasmLoadTime = Date.now() - startTime;
      this._recordError('WASM load failed', error);
      log('[pawtect] error cargando wasm:', error.message);
      return null;
    }
  }

  /**
   * Initialize user if not already done
   * @param {Object} me - User object
   * @private
   */
  _maybeInitUser(me) {
    if (!this._wasmMod || this._initUser) return;
    
    try {
      if (me?.id) {
        // Try different possible initialization methods
        if (typeof this._wasmMod.i === 'function') {
          this._wasmMod.i(me.id);
          this._initUser = true;
          log('[pawtect] user initialized with function:', me.id);
        } else if (typeof this._wasmMod.i === 'object' && this._wasmMod.i.constructor) {
          // If it's a class, try to instantiate it
          try {
            new this._wasmMod.i(me.id);
            this._initUser = true;
            log('[pawtect] user initialized with class:', me.id);
          } catch (classError) {
            log('[pawtect] class instantiation failed, trying alternative methods:', classError.message);
            // Try alternative initialization methods
            this._tryAlternativeUserInit(me);
          }
        } else {
          log('[pawtect] user initialization skipped - no valid method found');
        }
      }
    } catch (error) {
      log('[pawtect] user initialization failed:', error.message);
      // Don't throw, just log and continue
    }
  }

  /**
   * Try alternative user initialization methods
   * @param {Object} me - User object
   * @private
   */
  _tryAlternativeUserInit(me) {
    try {
      // Try other possible initialization patterns
      if (this._wasmMod.initUser && typeof this._wasmMod.initUser === 'function') {
        this._wasmMod.initUser(me.id);
        this._initUser = true;
        log('[pawtect] user initialized with initUser:', me.id);
      } else if (this._wasmMod.init && typeof this._wasmMod.init === 'function') {
        this._wasmMod.init(me.id);
        this._initUser = true;
        log('[pawtect] user initialized with init:', me.id);
      } else {
        // If no initialization method works, just mark as initialized to avoid repeated attempts
        this._initUser = true;
        log('[pawtect] user initialization skipped - marking as done to avoid retries');
      }
    } catch (error) {
      this._initUser = true; // Mark as done to avoid infinite retries
      log('[pawtect] alternative user initialization failed:', error.message);
    }
  }

  /**
   * Get user information with retry logic
   * @returns {Promise<Object|null>} User object or null
   * @private
   */
  async _getUserWithRetry() {
    for (let i = 0; i < 3; i++) {
      try {
        const response = await Promise.race([
          fetch('https://backend.wplace.live/me', { credentials: 'include' }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('User fetch timeout')), 5000)
          )
        ]);
        
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        log(`[pawtect] user fetch attempt ${i + 1} failed:`, error.message);
        if (i < 2) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }
    return null;
  }

  /**
   * Record error for debugging and monitoring
   * @param {string} context - Error context
   * @param {Error} error - Error object
   * @private
   */
  _recordError(context, error) {
    const errorRecord = {
      timestamp: Date.now(),
      context,
      message: error.message,
      stack: error.stack
    };
    
    this.errorHistory.push(errorRecord);
    
    // Keep only recent errors
    if (this.errorHistory.length > this.MAX_ERROR_HISTORY) {
      this.errorHistory.shift();
    }
    
    this.metrics.errors++;
  }

  /**
   * Compute pawtect token with enhanced error handling and retry logic
   * @param {Object} bodyObj - Body object to process
   * @param {Object} options - Options
   * @param {boolean} options.force - Force computation (skip cache)
   * @returns {Promise<string|null>} Pawtect token or null
   */
  async computePawtect(bodyObj, { force = false } = {}) {
    const startTime = Date.now();
    
    try {
      const bodyStr = this._validateAndNormalizeInput(bodyObj);
      const key = bodyStr;
      const now = Date.now();
      
      // Check cache first (unless forced)
      if (!force && this._cache.has(key)) {
        const cached = this._cache.get(key);
        if (now - cached.ts < this.CACHE_TTL) {
          this.metrics.cacheHits++;
          log('[pawtect] cache hit, token length:', cached.token?.length || 0);
          return cached.token;
        } else {
          // Remove expired entry
          this._cache.delete(key);
        }
      }
      
      this.metrics.cacheMisses++;
      
      // Wait if another computation is in progress
      if (this._busy) {
        await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 100));
        
        // Check cache again after waiting
        if (!force && this._cache.has(key)) {
          const cached = this._cache.get(key);
          if (now - cached.ts < this.CACHE_TTL) {
            this.metrics.cacheHits++;
            return cached.token;
          }
        }
      }
      
      return await this._computeWithRetry(bodyStr, key, startTime);
      
    } catch (error) {
      this._recordError('computePawtect', error);
      const duration = Date.now() - startTime;
      log('[pawtect] computation failed after', duration, 'ms:', error.message);
      return null;
    }
  }

  /**
   * Compute with retry logic and exponential backoff
   * @param {string} bodyStr - Body string
   * @param {string} key - Cache key
   * @param {number} startTime - Start time
   * @returns {Promise<string|null>} Token or null
   * @private
   */
  async _computeWithRetry(bodyStr, key, startTime) {
    let lastError = null;
    
    for (let attempt = 0; attempt < this.MAX_RETRIES; attempt++) {
      this._busy = true;
      
      try {
        const token = await this._performComputation(bodyStr);
        
        if (token) {
          // Cache successful result
          this._cache.set(key, { token, ts: Date.now() });
          
          // Update global state
          try {
            window.__WPA_PAWTECT_TOKEN__ = token;
          } catch {}
          
          // Update metrics
          this.metrics.computations++;
          const duration = Date.now() - startTime;
          this.metrics.avgComputeTime = 
            (this.metrics.avgComputeTime * (this.metrics.computations - 1) + duration) / this.metrics.computations;
          
          log('[pawtect] token calculado exitosamente, len=', token.length, 'duration=', duration, 'ms');
          return token;
        }
        
        throw new Error('No token generated from WASM');
        
      } catch (error) {
        lastError = error;
        this.metrics.retries++;
        
        log(`[pawtect] attempt ${attempt + 1} failed:`, error.message);
        
        if (attempt < this.MAX_RETRIES - 1) {
          const delay = this.RETRY_DELAY_BASE * Math.pow(2, attempt);
          log(`[pawtect] retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } finally {
        this._busy = false;
      }
    }
    
    this._recordError('All computation attempts failed', lastError);
    return null;
  }

  /**
   * Perform the actual computation
   * @param {string} bodyStr - Body string
   * @returns {Promise<string|null>} Token or null
   * @private
   */
  async _performComputation(bodyStr) {
    const wasm = await this._loadWasmEnhanced();
    if (!wasm || typeof wasm.get_pawtected_endpoint_payload !== 'function') {
      throw new Error('WASM not available or missing function');
    }
    
    // Initialize user if needed
    if (!this._initUser) {
      const me = await this._getUserWithRetry();
      this._maybeInitUser(me);
    }
    
    // Setup text encoders/decoders with fallbacks
    const enc = (typeof window !== 'undefined' && window.TextEncoder) 
      ? new window.TextEncoder() 
      : {
          encode: (t) => new Uint8Array([...unescape(encodeURIComponent(t))].map(c => c.charCodeAt(0)))
        };
    
    const dec = (typeof window !== 'undefined' && window.TextDecoder) 
      ? new window.TextDecoder() 
      : {
          decode: (b) => decodeURIComponent(escape(String.fromCharCode(...b)))
        };
    
    // Helper to decode various output shapes from WASM
    const decodeOut = (out) => {
      if (!out) return null;
      if (typeof out === 'string') return out;
      if (Array.isArray(out) && out.length >= 2) {
        const [op, ol] = out;
        const view = new Uint8Array(wasm.memory.buffer, op, ol);
        const tok = dec.decode(view);
        try { wasm.__wbindgen_free ? (wasm.__wbindgen_free.length >= 2 ? wasm.__wbindgen_free(op, ol) : wasm.__wbindgen_free(op)) : null; } catch {}
        return tok;
      }
      if (typeof out === 'object' && typeof out.ptr === 'number' && typeof out.len === 'number') {
        const view = new Uint8Array(wasm.memory.buffer, out.ptr, out.len);
        const tok = dec.decode(view);
        try { wasm.__wbindgen_free ? (wasm.__wbindgen_free.length >= 2 ? wasm.__wbindgen_free(out.ptr, out.len) : wasm.__wbindgen_free(out.ptr)) : null; } catch {}
        return tok;
      }
      return null;
    };

    // Prefer direct string ABI if supported
    try {
      const outDirect = wasm.get_pawtected_endpoint_payload(bodyStr);
      const tokenDirect = decodeOut(outDirect);
      if (tokenDirect && typeof tokenDirect === 'string' && tokenDirect.length > 0) {
        return tokenDirect;
      }
    } catch (e) {
      // Fall back to pointer ABI below
    }

    // Fallback: pointer/length ABI with defensive bounds checking
    const bytes = enc.encode(bodyStr);
    let ptr = null;
    try {
      // Allocate memory (try 1-arg first)
      if (typeof wasm.__wbindgen_malloc === 'function') {
        try {
          ptr = wasm.__wbindgen_malloc(bytes.length);
        } catch {
          // Some builds require (size, align)
          ptr = wasm.__wbindgen_malloc(bytes.length, 1);
        }
      }
      if (!ptr || typeof ptr !== 'number' || ptr <= 0) {
        throw new Error('Failed to allocate WASM memory');
      }

      // Ensure buffer is large enough (rare, but be safe)
      const end = ptr + bytes.length;
      if (end > wasm.memory.buffer.byteLength && typeof wasm.memory.grow === 'function') {
        const pageSize = 65536;
        const needed = end - wasm.memory.buffer.byteLength;
        const pages = Math.ceil(needed / pageSize);
        if (pages > 0) {
          try { wasm.memory.grow(pages); } catch {}
        }
      }

      new Uint8Array(wasm.memory.buffer, ptr, bytes.length).set(bytes);

      const out = wasm.get_pawtected_endpoint_payload(ptr, bytes.length);
      const token = decodeOut(out);
      return token;
    } catch (error) {
      throw new Error(`WASM computation failed: ${error.message}`);
    } finally {
      if (ptr) {
        try {
          if (typeof wasm.__wbindgen_free === 'function') {
            if (wasm.__wbindgen_free.length >= 2) {
              wasm.__wbindgen_free(ptr, bytes.length);
            } else {
              wasm.__wbindgen_free(ptr);
            }
          }
        } catch {}
      }
    }
  }

  /**
   * Seed pawtect computation for initialization
   * @returns {Promise<void>}
   */
  async seedPawtect() {
    try {
      log('[pawtect] seeding computation...');
      await this.computePawtect(
        { colors: [0], coords: [1, 1], t: 'seed', fp: 'seed' }, 
        { force: true }
      );
      log('[pawtect] seed computation completed');
    } catch (error) {
      log('[pawtect] seed computation failed:', error);
    }
  }

  /**
   * Get performance metrics
   * @returns {Object} Current metrics
   */
  getMetrics() {
    const cacheSize = this._cache.size;
    const cacheHitRate = this.metrics.cacheHits / Math.max(1, this.metrics.cacheHits + this.metrics.cacheMisses);
    const errorRate = this.metrics.errors / Math.max(1, this.metrics.computations + this.metrics.errors);
    
    return {
      ...this.metrics,
      cacheSize,
      cacheHitRate,
      errorRate,
      recentErrors: this.errorHistory.slice(-5)
    };
  }

  /**
   * Clear cache manually
   */
  clearCache() {
    const size = this._cache.size;
    this._cache.clear();
    log(`[pawtect] cache cleared, removed ${size} entries`);
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    if (this._cacheCleanupInterval && typeof window !== 'undefined' && typeof window.clearInterval === 'function') {
      window.clearInterval(this._cacheCleanupInterval);
      this._cacheCleanupInterval = null;
    }
    
    this._cache.clear();
    this._wasm = null;
    this._wasmMod = null;
    this._chunkUrl = null;
    
    log('[pawtect] cleanup completed');
  }
}

// Create global instance
const globalPawtectManager = new PawtectManager();

// ========================================
// LEGACY COMPATIBILITY LAYER
// ========================================

// Legacy function exports - maintain backward compatibility
export async function computePawtect(bodyObj, options = {}) {
  return await globalPawtectManager.computePawtect(bodyObj, options);
}

export async function seedPawtect() {
  return await globalPawtectManager.seedPawtect();
}

// Legacy exports for internal functions (now enhanced)
export async function discoverChunk() {
  return await globalPawtectManager._discoverChunkAdvanced();
}

export async function loadWasm() {
  return await globalPawtectManager._loadWasmEnhanced();
}

// Utility function export
export function stableJson(obj) {
  try {
    return JSON.stringify(obj, Object.keys(obj || {}).sort());
  } catch {
    return '';
  }
}

// Export the enhanced manager and global instance
export { PawtectManager, globalPawtectManager };

// Initialize seeding after a short delay
if (typeof window !== 'undefined' && typeof window.setTimeout === 'function') {
  window.setTimeout(() => {
    globalPawtectManager.seedPawtect();
  }, 1000);
}