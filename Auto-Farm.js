(() => {
  // =========================================================
  // WPlace Auto Paint (API + UI).
  // - POST directo con {coords, colors, t} (Turnstile)
  // - UI configurable + captura de TILE_X/TILE_Y desde 1 pintada manual
  // - Persistencia en localStorage
  // =========================================================

  const DEFAULTS = {
    SITEKEY: '0x4AAAAAABpqJe8FO0N84q0F', // Turnstile sitekey (ajústalo si cambia)
    TILE_X: 1086,
    TILE_Y: 1565,
    TILE_SIZE: 3000,         // Tiles son de ~3000x3000 según investigación
    DELAY_MS: 15000,         // 15 segundos entre pintadas (predeterminado)
    MIN_CHARGES: 10,         // mínimo de cargas para empezar a pintar
    CHARGE_REGEN_MS: 30000,  // 1 carga cada 30 segundos
    PIXELS_PER_BATCH: 20,    // número de píxeles a pintar por lote
    COLOR_MIN: 1,
    COLOR_MAX: 32,
    COLOR_MODE: 'random',    // 'random' | 'fixed'
    COLOR_FIXED: 1,
    THEME: {
      primary: '#000000',
      secondary: '#111111',
      accent: '#222222',
      text: '#ffffff',
      highlight: '#775ce3',
      success: '#00ff00',
      error: '#ff0000',
      running: '#00cc00'     // Verde para cuando está corriendo
    }
  };

  // ---------- Estado ----------
  let cfg; // Será inicializado después de definir loadCfg()
  const state = {
    running: false,
    painted: 0,
    last: null,          // {x,y,color,status,json}
    charges: { count: 0, max: 0, cooldownMs: 30000 },
    user: null,
    panel: null,
    captureMode: false,  // sniffer activo para capturar TILE_X/Y desde un POST real
    originalFetch: window.fetch,
    retryCount: 0,       // contador de reintentos
    inCooldown: false,   // si está en cooldown de 2 minutos
    nextPaintTime: 0,    // timestamp de la próxima pintada
    cooldownEndTime: 0,  // timestamp del final del cooldown
    health: null         // estado de salud del backend
  };

  // ---------- Utils ----------
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const randInt = (n) => Math.floor(Math.random() * n);
  const log = (...a) => console.log('[WPA-UI]', ...a);
  const noop = () => {};
  function saveCfg() { try { localStorage.setItem('WPA_UI_CFG', JSON.stringify(cfg)); } catch { /* ignore save errors */ } }
  function loadCfg() {
    try {
      const s = localStorage.getItem('WPA_UI_CFG');
      if (s) {
        const loaded = { ...DEFAULTS, ...JSON.parse(s) };
        
        // Validar coordenadas cargadas (verificar que sean números válidos)
        if (!Number.isFinite(loaded.TILE_X) || !Number.isFinite(loaded.TILE_Y)) {
          log(`Configuración corrupta detectada: coordenadas (${loaded.TILE_X},${loaded.TILE_Y}) inválidas`);
          resetToSafeDefaults();
          return { ...DEFAULTS };
        }
        
        return loaded;
      }
  } catch { /* ignore load errors */ }
    return { ...DEFAULTS };
  }
  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
  
  // Resetear a configuración segura
  function resetToSafeDefaults() {
    try {
      localStorage.removeItem('WPA_UI_CFG');
      log('Configuración reseteada a valores seguros');
  } catch { /* ignore reset errors */ }
  }
  
  // Verificar si necesita calibración inicial
  function needsCalibration() {
    // Verificar si las coordenadas son las por defecto
    const hasDefaultCoords = cfg.TILE_X === DEFAULTS.TILE_X && cfg.TILE_Y === DEFAULTS.TILE_Y;
    // También verificar si no hay configuración guardada
    const hasNoSavedConfig = !localStorage.getItem('WPA_UI_CFG');
    // Verificar que las coordenadas sean números válidos
    const hasInvalidCoords = !Number.isFinite(cfg.TILE_X) || !Number.isFinite(cfg.TILE_Y);
    
    const needsCalib = hasDefaultCoords || hasNoSavedConfig || hasInvalidCoords;
    log(`Verificación calibración: defaults=${hasDefaultCoords}, noConfig=${hasNoSavedConfig}, invalid=${hasInvalidCoords}, coords=(${cfg.TILE_X},${cfg.TILE_Y})`);
    
    return needsCalib;
  }

  // ---------- Sesión / Charges ----------
  async function getSession() {
    try {
      const me = await fetch('https://backend.wplace.live/me', { credentials: 'include' }).then(r => r.json());
      state.user = me || null;
      const c = me?.charges || {};
      state.charges = {
        count: c.count ?? 0,        // Mantener valor decimal original
        max: c.max ?? 0,            // Mantener valor original (puede variar por usuario)
        cooldownMs: c.cooldownMs ?? 30000
      };
      return me;
  } catch { return null; }
  }

  // ---------- Health Check ----------
  async function checkBackendHealth() {
    try {
      const response = await fetch('https://backend.wplace.live/health', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        const health = await response.json();
        state.health = {
          ...health,
          lastCheck: Date.now(),
          status: 'online'
        };
        log('Health check exitoso:', health);
        return health;
      } else {
        state.health = {
          database: false,
          up: false,
          uptime: 'N/A',
          lastCheck: Date.now(),
          status: 'error',
          statusCode: response.status
        };
        log('Health check falló con status:', response.status);
        return null;
      }
    } catch (error) {
      state.health = {
        database: false,
        up: false,
        uptime: 'N/A',
        lastCheck: Date.now(),
        status: 'offline',
        error: error.message
      };
      log('Health check error:', error);
      return null;
    }
  }

  // ---------- Turnstile ----------
  function loadTurnstile() {
    return new Promise((resolve, reject) => {
      if (window.turnstile) return resolve();
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true; s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('No se pudo cargar Turnstile'));
      document.head.appendChild(s);
    });
  }
  async function getTurnstileToken() {
    await loadTurnstile();
    if (typeof window.turnstile?.execute === 'function') {
      try {
        const token = await window.turnstile.execute(cfg.SITEKEY, { action: 'paint' });
        if (token && token.length > 20) return token;
  } catch { /* fallback abajo */ }
    }
    // Fallback: render oculto
    return await new Promise((resolve) => {
      const host = document.createElement('div');
      host.style.position = 'fixed'; host.style.left = '-9999px';
      document.body.appendChild(host);
      window.turnstile.render(host, { sitekey: cfg.SITEKEY, callback: (t) => resolve(t) });
    });
  }

  // ---------- API backend ----------
  function randomCoords() {
    // Generar coordenadas locales directamente dentro del tile (0 a TILE_SIZE-1)
    const margin = Math.floor(cfg.TILE_SIZE * 0.05); // 5% del tamaño del tile como margen
    const safeSize = cfg.TILE_SIZE - (margin * 2); // Área segura descontando márgenes
    
    // Validar que el área segura sea válida
    if (safeSize <= 0) {
      log('Error: área segura inválida, usando coordenadas básicas');
      return [Math.floor(Math.random() * cfg.TILE_SIZE), Math.floor(Math.random() * cfg.TILE_SIZE)];
    }
    
    // Generar coordenadas locales dentro del área segura del tile
    const localX = margin + Math.floor(Math.random() * safeSize);
    const localY = margin + Math.floor(Math.random() * safeSize);
    
    // Log para debugging (solo ocasionalmente)
    if (Math.random() < 0.1) { // 10% de las veces
      log(`Coordenadas locales generadas: (${localX},${localY}) en área segura [${margin}-${margin + safeSize - 1}]`);
    }
    
    return [localX, localY];
  }

  function generateMultipleCoords(count) {
    const coords = [];
    for (let i = 0; i < count; i++) {
      const [x, y] = randomCoords();
      coords.push(x, y); // El formato del API requiere x,y,x,y,x,y...
    }
    return coords;
  }

  function generateMultipleColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(nextColor());
    }
    return colors;
  }

  function nextColor() {
    if (cfg.COLOR_MODE === 'fixed') {
      return clamp(parseInt(cfg.COLOR_FIXED,10)||1, cfg.COLOR_MIN, cfg.COLOR_MAX);
    }
    const span = cfg.COLOR_MAX - cfg.COLOR_MIN + 1;
    return cfg.COLOR_MIN + randInt(span);
  }

  // Función para actualizar el canvas visualmente
  async function updateCanvasPixel(localX, localY, color) {
    try {
      // Buscar elementos del canvas que puedan necesitar actualización
      const canvasElements = document.querySelectorAll('canvas');
      canvasElements.forEach(canvas => {
        try {
          // Intentar forzar un redibujado del canvas
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Emitir eventos para que el canvas se actualice
            const event = new CustomEvent('pixel-painted', {
              detail: { x: localX, y: localY, color, tileX: cfg.TILE_X, tileY: cfg.TILE_Y }
            });
            canvas.dispatchEvent(event);
          }
  } catch { /* ignore canvas error */ }
      });

      // Intentar actualizar tiles específicos si existen elementos con data-tile
      const tileElements = document.querySelectorAll(`[data-tile-x="${cfg.TILE_X}"][data-tile-y="${cfg.TILE_Y}"]`);
      tileElements.forEach(tile => {
        try {
          // Forzar actualización del tile
          if (tile.style) {
            tile.style.opacity = '0.8';
            setTimeout(() => { tile.style.opacity = '1'; }, 100);
          }
  } catch { /* ignore style update error */ }
      });

      // Buscar y actualizar elementos que contengan coordenadas
      const coordElements = document.querySelectorAll('[class*="tile"], [class*="canvas"], [id*="canvas"]');
      coordElements.forEach(el => {
        try {
          if (el.getAttribute && (el.getAttribute('data-x') == localX || el.getAttribute('data-y') == localY)) {
            el.style.filter = 'brightness(1.2)';
            setTimeout(() => { el.style.filter = ''; }, 200);
          }
  } catch { /* ignore coord highlight error */ }
      });

    } catch (error) {
      log('Error actualizando canvas:', error);
    }
  }

  // Función para refrescar el tile específico (solo actualización visual, sin GET)
  async function refreshTile(tileX, tileY) {
    try {
      // Solo actualizar visualmente el DOM sin hacer GET
      // El GET a /s0/tile no funciona y no es necesario para el funcionamiento
      const tileSelector = `[data-tile="${tileX}-${tileY}"], .tile-${tileX}-${tileY}, [data-tile-x="${tileX}"][data-tile-y="${tileY}"]`;
      const tileElement = document.querySelector(tileSelector);
      
      if (tileElement) {
        // Añadir una clase temporal para indicar actualización
        tileElement.classList.add('tile-updating');
        setTimeout(() => {
          tileElement.classList.remove('tile-updating');
          tileElement.classList.add('tile-updated');
          setTimeout(() => tileElement.classList.remove('tile-updated'), 1000);
        }, 100);
        log(`Tile (${tileX},${tileY}) actualizado visualmente`);
      } else {
        // Intentar forzar una actualización del canvas general
        const canvasElements = document.querySelectorAll('canvas');
        canvasElements.forEach(canvas => {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Trigger redraw sin hacer cambios
            const imageData = ctx.getImageData(0, 0, 1, 1);
            ctx.putImageData(imageData, 0, 0);
          }
        });
        log(`Actualización visual genérica realizada para tile (${tileX},${tileY})`);
      }
    } catch (error) {
      log('Error en actualización visual del tile:', error);
    }
  }

  async function postPixel(coords, colors, t) {
    try {
      const body = JSON.stringify({ colors, coords, t });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // Timeout de 15 segundos
      
      const res = await fetch(`https://backend.wplace.live/s0/pixel/${cfg.TILE_X}/${cfg.TILE_Y}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      let json = null;
      try { 
        const text = await res.text();
        if (text) {
          json = JSON.parse(text);
        }
      } catch (parseError) {
        log('Error parseando respuesta JSON:', parseError);
        // Si no se puede parsear, pero el status es 200, asumir éxito
        if (res.status === 200) {
          json = { painted: Math.min(coords.length / 2, colors.length) };
        }
      }
      
      return { status: res.status, json };
    } catch (error) {
      log('Error en postPixel:', error.name, error.message);
      
      // Diferentes tipos de error
      if (error.name === 'AbortError') {
        return { status: 408, json: { error: 'Timeout' } }; // Request Timeout
      }
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { status: 0, json: { error: 'Network Error' } }; // Error de red
      }
      
      return { status: 500, json: { error: error.message } };
    }
  }

  async function paintOnce() {
    // Verificar que las coordenadas del tile sean válidas antes de pintar
    if (!Number.isFinite(cfg.TILE_X) || !Number.isFinite(cfg.TILE_Y)) {
      setStatus(`🚫 Coordenadas del tile inválidas (${cfg.TILE_X},${cfg.TILE_Y}). Calibra primero`, 'error');
      log(`Pintado cancelado: coordenadas del tile inválidas`);
      return false;
    }
    
    // Usar cargas actuales (ya consultadas en el loop)
    const availableCharges = Math.floor(state.charges.count); // Cargas completas disponibles
    
      // Si no hay cargas completas disponibles, no pintar
      if (availableCharges < 1) {
        setStatus(`🔋 Sin cargas disponibles. Esperando...`, 'error');
        return false;
      }    // Calcular el número óptimo de píxeles a pintar
    // Usar el mínimo entre: cargas disponibles, configuración del usuario, y límite máximo (50)
    const optimalPixelCount = Math.min(availableCharges, cfg.PIXELS_PER_BATCH, 50);
    const pixelCount = Math.max(1, optimalPixelCount);
    
    // Informar si se ajustó el número de píxeles
    if (pixelCount < cfg.PIXELS_PER_BATCH) {
      log(`Ajustando píxeles por cargas completas disponibles: ${pixelCount}/${cfg.PIXELS_PER_BATCH} (${availableCharges} cargas completas de ${state.charges.count.toFixed(2)} totales)`);
    }
    
    const coords = generateMultipleCoords(pixelCount);
    const colors = generateMultipleColors(pixelCount);
    
    // Las coordenadas generadas ya son locales al tile, no necesitamos cálculos adicionales
    const firstLocalX = coords[0];
    const firstLocalY = coords[1];
    
    setStatus(`🎨 Pintando ${pixelCount} píxeles (${availableCharges} cargas completas) en tile(${cfg.TILE_X},${cfg.TILE_Y}) local(${firstLocalX},${firstLocalY})...`, 'status');
    
    const t = await getTurnstileToken();
    const r = await postPixel(coords, colors, t);

    state.last = { 
      x: firstLocalX, 
      y: firstLocalY, 
      color: colors[0], 
      pixelCount,
      availableCharges,
      status: r.status, 
      json: r.json 
    };
    
    if (r.status === 200 && r.json && (r.json.painted > 0 || r.json.painted === pixelCount)) {
      const actualPainted = r.json.painted || pixelCount;
      state.painted += actualPainted;
      state.retryCount = 0; // Resetear contador de reintentos al éxito
      
      // Actualizar visualmente el canvas para múltiples píxeles
      for (let i = 0; i < coords.length; i += 2) {
        const localX = coords[i];
        const localY = coords[i + 1];
        const color = colors[Math.floor(i / 2)];
        // Las coordenadas ya son locales al tile
        await updateCanvasPixel(localX, localY, color);
      }
      
      // Refrescar el tile específico
      await refreshTile(cfg.TILE_X, cfg.TILE_Y);
      
      // Actualizar la sesión para obtener las cargas actualizadas (única consulta tras pintar)
      await getSession();
      
      setStatus(`✅ Lote pintado: ${actualPainted}/${pixelCount} píxeles (${availableCharges} cargas usadas)`, 'success');
      flashEffect();
      
      // Emitir evento personalizado para notificar que se pintó un lote
      const event = new CustomEvent('wplace-batch-painted', {
        detail: { 
          firstX: firstLocalX, 
          firstY: firstLocalY, 
          pixelCount: actualPainted,
          totalPixels: pixelCount,
          colors: colors,
          coords: coords,
          tileX: cfg.TILE_X,
          tileY: cfg.TILE_Y,
          timestamp: Date.now()
        }
      });
      window.dispatchEvent(event);
      
      return true;
    }
    
    // Manejo de errores mejorado
    if (r.status === 403) {
      setStatus('⚠️ 403 (token expirado o Cloudflare). Reintentará...', 'error');
    } else if (r.status === 401) {
      setStatus('🔒 401 (no autorizado). Verifica tu sesión.', 'error');
    } else if (r.status === 429) {
      setStatus('⏳ 429 (límite de tasa). Esperando...', 'error');
    } else if (r.status === 408) {
      setStatus('⏰ Timeout del servidor. Coordenadas problemáticas o servidor sobrecargado', 'error');
    } else if (r.status === 0) {
      setStatus('🌐 Error de red. Verificando conectividad...', 'error');
    } else if (r.status === 500) {
      setStatus('🔥 500 (error interno del servidor). Reintentará...', 'error');
    } else if (r.status === 502 || r.status === 503 || r.status === 504) {
      setStatus(`🚫 ${r.status} (servidor no disponible). Reintentará...`, 'error');
    } else if (r.status === 404) {
      setStatus(`🗺️ 404 (tile no encontrado). Verificando coordenadas tile(${cfg.TILE_X},${cfg.TILE_Y})`, 'error');
    } else {
      // Para otros errores, verificar el health del backend
      try {
        await checkBackendHealth();
        const healthStatus = state.health?.up ? '🟢 Online' : '🔴 Offline';
        setStatus(`❌ Error ${r.status}: ${r.json?.message || r.json?.error || 'Fallo al pintar'} (Backend: ${healthStatus})`, 'error');
  } catch (healthError) {
        setStatus(`❌ Error ${r.status}: ${r.json?.message || r.json?.error || 'Fallo al pintar'} (Health check falló)`, 'error');
      }
    }
    
    // Log detallado para debugging
    log(`Fallo en pintado: status=${r.status}, json=`, r.json, 'coords=', coords, 'colors=', colors);
    
    return false;
  }

  async function paintWithRetry() {
    const maxAttempts = 5; // Aumentar a 5 intentos
    const baseDelay = 3000; // Delay base de 3 segundos
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const success = await paintOnce();
        if (success) {
          state.retryCount = 0; // Reset en éxito
          return true;
        }
        
        state.retryCount = attempt;
        
        if (attempt < maxAttempts) {
          // Delay exponencial: 3s, 6s, 12s, 24s
          const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), 30000); // Máximo 30s
          setStatus(`❌ Intento ${attempt}/${maxAttempts} falló. Reintentando en ${delay/1000}s...`, 'error');
          log(`Reintento ${attempt}/${maxAttempts} programado en ${delay/1000}s`);
          
          // Verificar si se debe detener durante el delay
          for (let i = 0; i < delay/1000 && state.running; i++) {
            await sleep(1000);
          }
          
          if (!state.running) {
            log('Bot detenido durante reintentos');
            return false;
          }
        }
      } catch (error) {
        log(`Error en intento ${attempt}:`, error);
        state.retryCount = attempt;
        
        if (attempt < maxAttempts) {
          const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), 30000);
          setStatus(`💥 Error en intento ${attempt}/${maxAttempts}. Reintentando en ${delay/1000}s...`, 'error');
          
          for (let i = 0; i < delay/1000 && state.running; i++) {
            await sleep(1000);
          }
          
          if (!state.running) {
            return false;
          }
        }
      }
    }
    
    // Si llegamos aquí, fallaron todos los intentos
    state.inCooldown = true;
    state.cooldownEndTime = Date.now() + (3 * 60 * 1000); // Aumentar a 3 minutos
    state.retryCount = 0;
    setStatus(`🚫 ${maxAttempts} intentos fallidos. Cooldown de 3 minutos...`, 'error');
    log(`Todos los reintentos fallaron, iniciando cooldown de 3 minutos`);
    return false;
  }

  async function loop() {
    // Verificar calibración antes de empezar
    if (needsCalibration()) {
      setStatus('🎯 Calibración requerida antes de iniciar el bot', 'error');
      enableCaptureOnce();
      
      // Esperar hasta que se complete la calibración
      while (state.captureMode && state.running) {
        await sleep(1000);
      }
      
      // Verificar si se capturó correctamente
      if (needsCalibration()) {
        setStatus('❌ Calibración cancelada. Deteniendo bot...', 'error');
        state.running = false;
        updateButtonStates();
        return;
      } else {
        setStatus('✅ Calibración completada. Iniciando bot...', 'success');
        await sleep(2000); // Mostrar mensaje por 2 segundos
      }
    }

    while (state.running) {
      try {
        // Hacer UNA consulta a /me al inicio de cada ciclo
        await getSession();
        
        // Verificar si estamos en cooldown
        if (state.inCooldown) {
          const now = Date.now();
          if (now < state.cooldownEndTime) {
            const remainingMs = state.cooldownEndTime - now;
            const remainingSec = Math.ceil(remainingMs / 1000);
            const remainingMin = Math.floor(remainingSec / 60);
            const remainingSecOnly = remainingSec % 60;
            if (remainingMin > 0) {
              setStatus(`🚫 Cooldown: ${remainingMin}m ${remainingSecOnly}s restantes`, 'error');
            } else {
              setStatus(`🚫 Cooldown: ${remainingSec}s restantes`, 'error');
            }
            await sleep(1000);
            updateStats();
            continue;
          } else {
            // Cooldown terminado
            state.inCooldown = false;
            state.cooldownEndTime = 0;
            setStatus('✅ Cooldown terminado. Continuando...', 'success');
          }
        }

      const { count } = state.charges;
      
      // Verificar si tenemos al menos las cargas mínimas para pintar
      if (count < cfg.MIN_CHARGES) {
        const waitTimeMs = cfg.MIN_CHARGES * 30 * 1000; // MIN_CHARGES × 30 segundos
        const waitTimeSec = Math.ceil(waitTimeMs / 1000);
        
        // Activar cooldown específico para cargas insuficientes
        if (!state.inCooldown) {
          state.inCooldown = true;
          state.cooldownEndTime = Date.now() + waitTimeMs;
          setStatus(`🔋 Cargas insuficientes (${Math.floor(count)}/${cfg.MIN_CHARGES}). Cooldown: ${Math.ceil(waitTimeSec/60)}min`, 'error');
        }
        
        const now = Date.now();
        if (now < state.cooldownEndTime) {
          const remainingMs = state.cooldownEndTime - now;
          const remainingSec = Math.ceil(remainingMs / 1000);
          const remainingMin = Math.floor(remainingSec / 60);
          const remainingSecOnly = remainingSec % 60;
          if (remainingMin > 0) {
            setStatus(`⏳ Cooldown: ${remainingMin}m ${remainingSecOnly}s (esperando ${cfg.MIN_CHARGES} cargas)`, 'status');
          } else {
            setStatus(`⏳ Cooldown: ${remainingSec}s (esperando ${cfg.MIN_CHARGES} cargas)`, 'status');
          }
          await sleep(1000);
          updateStats();
          continue;
        } else {
          // Cooldown terminado, verificar si ya tenemos suficientes cargas
          state.inCooldown = false;
          state.cooldownEndTime = 0;
          // NO hacer consulta adicional aquí - la próxima iteración del loop la hará
          if (state.charges.count >= cfg.MIN_CHARGES) {
            setStatus('✅ Cargas suficientes alcanzadas. Continuando...', 'success');
            updateStats();
            continue;
          } else {
            // Aún no hay suficientes cargas, renovar cooldown
            state.inCooldown = true;
            state.cooldownEndTime = Date.now() + waitTimeMs;
            setStatus(`🔋 Aún sin cargas suficientes. Renovando cooldown: ${Math.ceil(waitTimeSec/60)}min`, 'error');
            updateStats();
            continue;
          }
        }
      }
      
      // Si tenemos cargas disponibles, pintar
      state.nextPaintTime = Date.now() + cfg.DELAY_MS;
      
      try {
        const paintSuccess = await paintWithRetry();
        updateStats();
        
        // Si el pixel se pintó exitosamente, mantener el mensaje de éxito por 3 segundos
        if (paintSuccess) {
          await sleep(3000); // Mostrar mensaje de éxito por 3 segundos
          // Luego mostrar countdown con el tiempo restante
          const remainingDelay = cfg.DELAY_MS - 3000;
          if (remainingDelay > 0) {
            await sleepWithCountdown(remainingDelay);
          }
        } else {
          // Si falló el pintado, verificar el estado del backend
          try {
            await checkBackendHealth();
          } catch (healthError) {
            log('Error verificando health del backend:', healthError);
          }
          
          // Si falló, mostrar countdown completo
          await sleepWithCountdown(cfg.DELAY_MS);
        }
      } catch (paintError) {
        // Error crítico en el proceso de pintado
        log('Error crítico en paintWithRetry:', paintError);
        setStatus(`💥 Error crítico: ${paintError.message}. Cooldown de seguridad...`, 'error');
        
        // Cooldown de seguridad
        state.inCooldown = true;
        state.cooldownEndTime = Date.now() + (5 * 60 * 1000); // 5 minutos
        
        // Verificar health del backend
        try {
          await checkBackendHealth();
        } catch (healthError) {
          log('Error verificando health tras error crítico:', healthError);
        }
        
        updateStats();
      }
      } catch (cycleError) {
        // Error en el ciclo principal
        log('Error en ciclo del loop:', cycleError);
        setStatus(`💥 Error en ciclo: ${cycleError.message}. Reintentando en 10s...`, 'error');
        
        // Pausa de seguridad antes de continuar
        await sleep(10000);
        
        // Verificar health del backend
        try {
          await checkBackendHealth();
        } catch (healthError) {
          log('Error verificando health tras error de ciclo:', healthError);
        }
      }
    }
  }

  async function sleepWithCountdown(ms) {
    const endTime = Date.now() + ms;
    while (Date.now() < endTime && state.running) {
      const remainingMs = endTime - Date.now();
      const remainingSec = Math.ceil(remainingMs / 1000);
      if (remainingSec > 0) {
        setStatus(`⏳ Próxima pintada en: ${remainingSec}s`, 'status');
      }
      await sleep(1000);
    }
  }

  // ---------- Captura TILE_X / TILE_Y (sniffer) ----------
  function enableCaptureOnce() {
    if (state.captureMode) return;
    state.captureMode = true;
    setStatus('🎯 Esperando calibración: pinta un pixel manualmente...', 'status');

    window.fetch = async function(resource, init) {
      try {
        let url = typeof resource === 'string' ? resource : (resource && resource.url) || '';
        if (state.captureMode && url.includes('/s0/pixel/')) {
          // Extrae TILE_X/Y del path
          try {
            const u = new URL(url, location.origin);
            const parts = (u.pathname || '').split('/').filter(Boolean); // ["s0","pixel","1086","1565"]
            const px = parseInt(parts[2],10), py = parseInt(parts[3],10);
            if (Number.isFinite(px) && Number.isFinite(py)) {
              cfg.TILE_X = px; cfg.TILE_Y = py; saveCfg();
              fillInputsFromCfg();
              
              // Calcular información del área segura dentro del tile
              const margin = Math.floor(cfg.TILE_SIZE * 0.05);
              const safeMinX = margin;
              const safeMaxX = cfg.TILE_SIZE - margin - 1;
              const safeMinY = margin;
              const safeMaxY = cfg.TILE_SIZE - margin - 1;
              
              setStatus(`✅ Tile capturado: (${px},${py}) área local segura: (${safeMinX}-${safeMaxX}, ${safeMinY}-${safeMaxY})`, 'success');
              log(`Tile capturado: (${px},${py}), área local segura: (${safeMinX},${safeMinY}) a (${safeMaxX},${safeMaxY})`);
            }
          } catch { /* ignore parse error */ }
          // desactiva sniffer tras la primera coincidencia
          window.fetch = state.originalFetch;
          state.captureMode = false;
        }
  } catch { /* ignore fetch wrapper errors */ }
      return state.originalFetch.apply(this, arguments);
    };
  }

  // ---------- UI Functions ----------
  function updateButtonStates() {
    const el = {
      start: $('#wpa-start'),
      stop: $('#wpa-stop'),
      running: $('#wpa-running')
    };
    
    if (state.running) {
      el.start?.classList.add('running');
      if (el.start) el.start.textContent = 'Ejecutando...';
      el.stop?.classList.add('active');
      if (el.running) {
        el.running.textContent = '🟢 Activo';
        el.running.style.color = cfg.THEME.success;
      }
    } else {
      el.start?.classList.remove('running');
      if (el.start) el.start.textContent = 'Start';
      el.stop?.classList.remove('active');
      if (el.running) {
        el.running.textContent = '🔴 Detenido';
        el.running.style.color = cfg.THEME.error;
      }
    }
  }

  function createUI() {
    if (state.panel) return;
    const css = `
      @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(0,255,0,.7)}70%{box-shadow:0 0 0 10px rgba(0,255,0,0)}100%{box-shadow:0 0 0 0 rgba(0,255,0,0)}}
      @keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
      @keyframes pixelPaint{0%{filter:brightness(1)}50%{filter:brightness(1.5) saturate(1.3)}100%{filter:brightness(1)}}
      @keyframes tileUpdate{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}
      
      .wpa-panel{position:fixed;top:20px;right:20px;width:300px;background:${cfg.THEME.primary};border:1px solid ${cfg.THEME.accent};border-radius:10px;color:${cfg.THEME.text};font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;z-index:999999;box-shadow:0 8px 24px rgba(0,0,0,.5);overflow:hidden;animation:slideIn .3s}
      .wpa-head{display:flex;justify-content:space-between;align-items:center;background:${cfg.THEME.secondary};padding:10px 12px;color:${cfg.THEME.highlight};font-weight:600}
      .wpa-body{padding:12px}
      .wpa-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .wpa-row{display:flex;gap:8px;margin:8px 0}
      .wpa-input, .wpa-select{width:100%;padding:6px 8px;border-radius:6px;border:1px solid ${cfg.THEME.accent};background:#0f0f0f;color:${cfg.THEME.text}}
      .wpa-btn{flex:1;padding:9px;border:none;border-radius:8px;font-weight:700;cursor:pointer;transition:all 0.2s}
      .wpa-btn.primary{background:${cfg.THEME.accent};color:#fff}
      .wpa-btn.primary:hover{background:${cfg.THEME.highlight}}
      .wpa-btn.primary.running{background:${cfg.THEME.running};color:#fff;box-shadow:0 0 10px rgba(0,204,0,0.3)}
      .wpa-btn.stop{background:${cfg.THEME.error};color:#fff}
      .wpa-btn.stop.active{background:#cc0000;box-shadow:0 0 8px rgba(255,0,0,0.3)}
      .wpa-btn.ghost{background:transparent;border:1px solid ${cfg.THEME.accent};color:${cfg.THEME.text}}
      .wpa-btn.ghost:hover{background:${cfg.THEME.accent}22}
      .wpa-card{background:${cfg.THEME.secondary};padding:10px;border-radius:8px;margin-top:10px}
      .wpa-stat{display:flex;justify-content:space-between;margin:4px 0;font-size:13px;opacity:.95}
      .wpa-status{margin-top:10px;padding:8px;border-radius:6px;text-align:center;font-size:13px;background:rgba(255,255,255,.08);transition:all 0.3s}
      .wpa-status.success{background:rgba(0,255,0,.12);color:${cfg.THEME.success}}
      .wpa-status.error{background:rgba(255,0,0,.12);color:${cfg.THEME.error}}
      #wpa-effect{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;border-radius:10px}
      
      /* Estilos para tiles actualizados */
      .tile-updating{animation:tileUpdate 0.3s ease-in-out;}
      .tile-updated{animation:pixelPaint 0.5s ease-in-out;}
      
      /* Indicador de pixel pintado */
      .pixel-painted{
        position:relative;
      }
      .pixel-painted::after{
        content:'✓';
        position:absolute;
        top:-5px;
        right:-5px;
        background:${cfg.THEME.success};
        color:white;
        border-radius:50%;
        width:12px;
        height:12px;
        font-size:8px;
        display:flex;
        align-items:center;
        justify-content:center;
        animation:fadeInOut 2s ease-in-out;
      }
      
      @keyframes fadeInOut{
        0%{opacity:0;transform:scale(0)}
        50%{opacity:1;transform:scale(1)}
        100%{opacity:0;transform:scale(0)}
      }
    `;
    const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.className = 'wpa-panel';
    panel.innerHTML = `
      <div id="wpa-effect"></div>
      <div class="wpa-head">
        <div>WPlace Auto Paint</div>
      </div>
      <div class="wpa-body">
        <div class="wpa-grid">
          <div><label>Delay (seg)</label><input id="wpa-delay" class="wpa-input" type="number" min="5" max="300" /></div>
          <div><label>Min. Cargas</label><input id="wpa-mincharges" class="wpa-input" type="number" min="1" max="50" /></div>
          <div><label>Píxeles/Lote</label><input id="wpa-pixelsbatch" class="wpa-input" type="number" min="1" max="50" /></div>
          <div>
            <label>Color</label>
            <select id="wpa-cmode" class="wpa-select">
              <option value="random">Random</option>
              <option value="fixed">Fijo</option>
            </select>
          </div>
          <div id="wpa-cfixed-container"><label>Color fijo (1-32)</label><input id="wpa-cfixed" class="wpa-input" type="number" min="1" max="32"/></div>
        </div>

        <div class="wpa-row" style="margin-top:12px">
          <button id="wpa-start" class="wpa-btn primary">Start</button>
          <button id="wpa-once"  class="wpa-btn ghost">Once</button>
          <button id="wpa-stop"  class="wpa-btn ghost">Stop</button>
        </div>

        <div class="wpa-card" id="wpa-stats">
          <div class="wpa-stat"><span>User</span><span id="wpa-user">-</span></div>
          <div class="wpa-stat"><span>Charges</span><span id="wpa-charges">-</span></div>
          <div class="wpa-stat"><span>Painted</span><span id="wpa-painted">0</span></div>
          <div class="wpa-stat"><span>Último</span><span id="wpa-last">-</span></div>
          <div class="wpa-stat"><span>Estado</span><span id="wpa-running">🔴 Detenido</span></div>
          <div class="wpa-stat" id="wpa-retry-info" style="display:none"><span>Reintentos</span><span id="wpa-retries">0/5</span></div>
          <div class="wpa-stat" id="wpa-cooldown-info" style="display:none"><span>Cooldown</span><span id="wpa-cooldown">-</span></div>
        </div>

        <div class="wpa-card" id="wpa-health">
          <div class="wpa-stat"><span>Backend</span><span id="wpa-backend-status">🔄 Verificando...</span></div>
          <div class="wpa-stat"><span>Database</span><span id="wpa-database-status">-</span></div>
          <div class="wpa-stat"><span>Uptime</span><span id="wpa-uptime">-</span></div>
        </div>

        <div id="wpa-status" class="wpa-status">Ready</div>
      </div>
    `;
    document.body.appendChild(panel);
    state.panel = panel;

    // Inputs
    const el = {
      delay: $('#wpa-delay'),
      mincharges: $('#wpa-mincharges'), pixelsbatch: $('#wpa-pixelsbatch'), cmode: $('#wpa-cmode'), cfixed: $('#wpa-cfixed'),
      start: $('#wpa-start'), once: $('#wpa-once'), stop: $('#wpa-stop'),
      status: $('#wpa-status'), user: $('#wpa-user'), charges: $('#wpa-charges'),
      painted: $('#wpa-painted'), last: $('#wpa-last'), running: $('#wpa-running'), 
      retries: $('#wpa-retries'), retryInfo: $('#wpa-retry-info'), cooldown: $('#wpa-cooldown'), cooldownInfo: $('#wpa-cooldown-info'),
      effect: $('#wpa-effect')
    };

    function bindInputs() {
      el.delay.addEventListener('change', () => { 
        const delaySec = clamp(parseInt(el.delay.value,10)||15, 5, 300);
        cfg.DELAY_MS = delaySec * 1000; // Convertir segundos a milisegundos
        el.delay.value = delaySec; // Asegurar que el input muestre el valor clampado
        saveCfg(); 
      });
      el.mincharges.addEventListener('change', () => { cfg.MIN_CHARGES = clamp(parseInt(el.mincharges.value,10)||cfg.MIN_CHARGES, 1, 50); saveCfg(); });
      el.pixelsbatch.addEventListener('change', () => { 
        cfg.PIXELS_PER_BATCH = clamp(parseInt(el.pixelsbatch.value,10)||cfg.PIXELS_PER_BATCH, 1, 50); 
        el.pixelsbatch.value = cfg.PIXELS_PER_BATCH; // Asegurar que el input muestre el valor clampado
        saveCfg(); 
      });
      el.cmode.addEventListener('change', () => { 
        cfg.COLOR_MODE = el.cmode.value; 
        toggleColorFixedField();
        saveCfg(); 
      });
      el.cfixed.addEventListener('change', () => { cfg.COLOR_FIXED = clamp(parseInt(el.cfixed.value,10)||1, cfg.COLOR_MIN, cfg.COLOR_MAX); el.cfixed.value = cfg.COLOR_FIXED; saveCfg(); });
    }

    function toggleColorFixedField() {
      const container = $('#wpa-cfixed-container');
      if (container) {
        container.style.display = cfg.COLOR_MODE === 'fixed' ? 'block' : 'none';
      }
    }

    function bindButtons() {
      el.start.onclick = async () => {
        if (!state.running) {
          state.running = true;
          updateButtonStates();
          setStatus('🚀 Empezando…','status');
          loop();
        }
      };
      el.stop.onclick = () => { 
        state.running = false; 
        // También cancelar captura si está activa
        if (state.captureMode) {
          state.captureMode = false;
          window.fetch = state.originalFetch;
        }
        updateButtonStates();
        setStatus('⏸️ Bot detenido por el usuario','error'); 
      };
      el.once.onclick = async () => { 
        // Verificar calibración antes de pintar
        if (needsCalibration()) {
          setStatus('🎯 Calibración requerida: pinta un pixel manualmente primero', 'error');
          enableCaptureOnce();
          return;
        }
        setStatus('⏳ Consultando cargas y pintando…','status');
        
        // Hacer consulta manual solo para el botón "Once"
        await getSession();
        await paintWithRetry(); 
        updateStats(); 
      };
    }

    bindInputs(); bindButtons();
    fillInputsFromCfg();
    toggleColorFixedField(); // Inicializar visibilidad del campo color fijo
    updateStats();
    updateButtonStates(); // Inicializar estados de botones
    dragHeader(panel.querySelector('.wpa-head'), panel);
  }

  function fillInputsFromCfg() {
    $('#wpa-delay').value = Math.floor(cfg.DELAY_MS / 1000); // Mostrar en segundos
    $('#wpa-mincharges').value = cfg.MIN_CHARGES;
    $('#wpa-pixelsbatch').value = cfg.PIXELS_PER_BATCH;
    $('#wpa-cmode').value = cfg.COLOR_MODE;
    $('#wpa-cfixed').value = cfg.COLOR_FIXED;
  }

  function setStatus(msg, kind='status') {
    const el = $('#wpa-status'); if (!el) return;
    el.className = `wpa-status ${kind}`;
    el.textContent = msg;
  }

  function flashEffect() {
    const fx = $('#wpa-effect'); 
    if (!fx) return;
    
    // Efecto de pulso verde para éxito
    fx.style.animation = 'pulse .5s';
    fx.style.background = 'radial-gradient(circle, rgba(0,255,0,0.1) 0%, transparent 70%)';
    
    setTimeout(() => {
      fx.style.animation = '';
      fx.style.background = '';
    }, 500);
    
    // Agregar efecto de brillo al panel
    const panel = state.panel;
    if (panel) {
      panel.style.boxShadow = '0 8px 24px rgba(0,255,0,.3), 0 0 20px rgba(0,255,0,.2)';
      setTimeout(() => {
        panel.style.boxShadow = '0 8px 24px rgba(0,0,0,.5)';
      }, 800);
    }
  }

  async function updateStats() {
    // NO hacer consulta automática a /me - usar datos existentes
    $('#wpa-user').textContent = state.user?.name || '-';
    
    // Mostrar solo cargas completas disponibles (sin máximo)
    const completeCharges = Math.floor(state.charges.count);
    const chargeDisplay = `${completeCharges}`;
    $('#wpa-charges').textContent = chargeDisplay;
    
    // Mostrar información de cooldown si está activo
    const cooldownEl = $('#wpa-cooldown');
    const cooldownInfo = $('#wpa-cooldown-info');
    if (state.inCooldown && cooldownEl && cooldownInfo) {
      const remainingMs = state.cooldownEndTime - Date.now();
      const remainingSec = Math.ceil(remainingMs / 1000);
      if (remainingSec > 0) {
        const remainingMin = Math.floor(remainingSec / 60);
        const remainingSecOnly = remainingSec % 60;
        if (remainingMin > 0) {
          cooldownEl.textContent = `${remainingMin}m ${remainingSecOnly}s`;
        } else {
          cooldownEl.textContent = `${remainingSec}s`;
        }
        cooldownInfo.style.display = 'flex';
      } else {
        cooldownInfo.style.display = 'none';
      }
    } else if (cooldownInfo) {
      cooldownInfo.style.display = 'none';
    }
    
    $('#wpa-painted').textContent = String(state.painted);
    
    // Mostrar información de reintentos solo si hay reintentos activos
    if (state.retryCount > 0) {
      $('#wpa-retries').textContent = `${state.retryCount}/5`;
      $('#wpa-retry-info').style.display = 'flex';
    } else {
      $('#wpa-retry-info').style.display = 'none';
    }
    
    if (state.last) {
      const j = state.last;
      const statusIcon = j.status === 200 ? '✅' : j.status === 403 ? '⚠️' : '❌';
      const pixelInfo = j.pixelCount > 1 ? ` (${j.pixelCount} píxeles)` : '';
      const chargeInfo = j.availableCharges ? ` [${j.availableCharges} cargas]` : '';
      $('#wpa-last').textContent = `${statusIcon} ${j.status} @ (${j.x},${j.y}) c${j.color}${pixelInfo}${chargeInfo}`;
      
      // Agregar información adicional si hay JSON de respuesta
      if (j.json) {
        const additionalInfo = j.json.painted > 0 ? ` ✓${j.json.painted}` : 
                              j.json.message ? ` (${j.json.message})` : '';
        $('#wpa-last').textContent += additionalInfo;
      }
    }
    
    // Actualizar información de health del backend
    if (state.health) {
      const backendEl = $('#wpa-backend-status');
      const databaseEl = $('#wpa-database-status');
      const uptimeEl = $('#wpa-uptime');
      
      if (backendEl) {
        if (state.health.status === 'online' && state.health.up) {
          backendEl.textContent = '🟢 Online';
          backendEl.style.color = cfg.THEME.success;
        } else if (state.health.status === 'offline') {
          backendEl.textContent = '🔴 Offline';
          backendEl.style.color = cfg.THEME.error;
        } else {
          backendEl.textContent = '🟡 Error';
          backendEl.style.color = '#ffaa00';
        }
      }
      
      if (databaseEl) {
        databaseEl.textContent = state.health.database ? '🟢 OK' : '🔴 Error';
        databaseEl.style.color = state.health.database ? cfg.THEME.success : cfg.THEME.error;
      }
      
      if (uptimeEl) {
        uptimeEl.textContent = state.health.uptime || '-';
      }
    }
    
    // Actualizar título del panel con el estado actual
    const headerTitle = document.querySelector('.wpa-head div');
    if (headerTitle && state.running) {
      headerTitle.textContent = `WPlace Auto Paint [${state.painted} pixels]`;
    } else if (headerTitle && !state.running) {
      headerTitle.textContent = 'WPlace Auto Paint';
    }
    
    // Actualizar estados de botones
    updateButtonStates();
    
    // Mostrar información específica según el estado (sin referencias a tiempos de carga)
    if (state.inCooldown && state.running) {
      const remainingMs = state.cooldownEndTime - Date.now();
      const remainingSec = Math.ceil(remainingMs / 1000);
      const remainingMin = Math.floor(remainingSec / 60);
      const remainingSecOnly = remainingSec % 60;
      if (remainingMin > 0) {
        setStatus(`⏳ Cooldown: ${remainingMin}m ${remainingSecOnly}s (esperando ${cfg.MIN_CHARGES} cargas)`, 'status');
      } else {
        setStatus(`⏳ Cooldown: ${remainingSec}s (esperando ${cfg.MIN_CHARGES} cargas)`, 'status');
      }
    } else if (completeCharges < cfg.MIN_CHARGES && state.running && !state.inCooldown) {
      setStatus(`⚡ Cargas insuficientes: ${completeCharges}/${cfg.MIN_CHARGES} (iniciando cooldown...)`, 'status');
    }
  }

  // ---------- helpers UI ----------
  function $(sel){ return document.querySelector(sel); }

  function dragHeader(headerEl, panelEl){
    let dragging=false, sx=0, sy=0, ox=0, oy=0;
    headerEl.addEventListener('mousedown',(e)=>{
      dragging=true; sx=e.clientX; sy=e.clientY; const r=panelEl.getBoundingClientRect(); ox=r.left; oy=r.top;
      e.preventDefault();
    });
    document.addEventListener('mouseup',()=> dragging=false);
    document.addEventListener('mousemove',(e)=>{
      if (!dragging) return;
      const nx = ox + (e.clientX - sx);
      const ny = oy + (e.clientY - sy);
      panelEl.style.left = `${nx}px`;
      panelEl.style.top  = `${ny}px`;
      panelEl.style.right = 'auto';
    });
  }

  // ---------- Exponer API por consola ----------
  window.WPAUI = {
    start(){ 
      if (!state.running){ 
        state.running=true; 
        updateButtonStates();
        setStatus('🚀 Empezando…'); 
        loop(); 
      }
    },
    stop(){ 
      state.running=false; 
      updateButtonStates();
      setStatus('⏸️ Bot detenido'); 
    },
    once: paintOnce,
    set(o={}){ Object.assign(cfg,o); saveCfg(); fillInputsFromCfg(); },
    get: ()=>({ ...cfg }),
    capture: enableCaptureOnce,
    
    // Nuevas funciones de utilidad
    refreshCanvas: () => updateCanvasPixel(state.last?.x || 0, state.last?.y || 0, state.last?.color || 1),
    verifyPixel: async (x, y) => {
      try {
        const tileX = Math.floor(x / cfg.TILE_SIZE) * cfg.TILE_SIZE;
        const tileY = Math.floor(y / cfg.TILE_SIZE) * cfg.TILE_SIZE;
        const response = await fetch(`https://backend.wplace.live/s0/tile/${tileX}/${tileY}`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          console.log(`Pixel en (${x},${y}):`, data);
          return data;
        }
      } catch (err) {
        console.error('Error verificando pixel:', err);
      }
      return null;
    },
    
    getStats: () => ({
      painted: state.painted,
      last: state.last,
      charges: state.charges,
      user: state.user,
      running: state.running,
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
    
    // Función para establecer píxeles por lote
    setPixelsPerBatch: (count) => {
      cfg.PIXELS_PER_BATCH = clamp(count, 1, 50);
      saveCfg();
      fillInputsFromCfg();
      console.log(`Píxeles por lote establecido a: ${cfg.PIXELS_PER_BATCH}`);
    },
    
    // Funciones para gestión de cargas
    setMinCharges: (min) => {
      cfg.MIN_CHARGES = clamp(min, 1, 50);
      saveCfg();
      fillInputsFromCfg();
      console.log(`Mínimo de cargas establecido a: ${cfg.MIN_CHARGES}`);
    },
    
    setDelay: (seconds) => {
      const delaySec = clamp(seconds, 5, 300);
      cfg.DELAY_MS = delaySec * 1000;
      saveCfg();
      fillInputsFromCfg();
      console.log(`Delay establecido a: ${delaySec} segundos`);
    },
    
    // Función de diagnóstico
    diagnose: () => {
      const isValidTile = Number.isFinite(cfg.TILE_X) && Number.isFinite(cfg.TILE_Y);
      
      console.log('🔍 DIAGNÓSTICO DEL BOT:');
      console.log('─'.repeat(50));
      console.log(`Coordenadas del tile: (${cfg.TILE_X}, ${cfg.TILE_Y})`);
      console.log(`Tamaño del tile: ${cfg.TILE_SIZE}x${cfg.TILE_SIZE}`);
      console.log(`¿Tile válido?: ${isValidTile ? '✅ SÍ' : '❌ NO'}`);
      console.log(`¿Necesita calibración?: ${needsCalibration() ? '⚠️ SÍ' : '✅ NO'}`);
      console.log(`Estado del bot: ${state.running ? '🟢 Ejecutando' : '🔴 Detenido'}`);
      console.log(`Modo captura: ${state.captureMode ? '🎯 Activo' : '🚫 Inactivo'}`);
      console.log(`Cargas disponibles: ${Math.floor(state.charges.count)}`);
      console.log(`Píxeles por lote: ${cfg.PIXELS_PER_BATCH} (ajustable según cargas completas)`);
      console.log(`Pixels pintados: ${state.painted}`);
      if (state.last) {
        const pixelInfo = state.last.pixelCount > 1 ? ` (lote de ${state.last.pixelCount})` : '';
        const chargeInfo = state.last.availableCharges ? ` con ${state.last.availableCharges} cargas completas` : '';
        console.log(`Último intento: ${state.last.status} @ tile(${cfg.TILE_X},${cfg.TILE_Y}) local(${state.last.x},${state.last.y}) color ${state.last.color}${pixelInfo}${chargeInfo}`);
      }
      
      // Información de health del backend
      if (state.health) {
        console.log('🏥 ESTADO DEL BACKEND:');
        console.log(`  Servidor: ${state.health.up ? '🟢 Online' : '🔴 Offline'}`);
        console.log(`  Base de datos: ${state.health.database ? '🟢 OK' : '🔴 Error'}`);
        console.log(`  Uptime: ${state.health.uptime}`);
        if (state.health.lastCheck) {
          const checkTime = new Date(state.health.lastCheck).toLocaleTimeString();
          console.log(`  Última verificación: ${checkTime}`);
        }
      } else {
        console.log('🏥 ESTADO DEL BACKEND: No verificado');
      }
      
      console.log('─'.repeat(50));
      
      if (!isValidTile) {
        console.log('🚨 ACCIÓN REQUERIDA: Las coordenadas del tile no son válidas.');
        console.log('   Ejecuta: WPAUI.resetConfig() y luego pinta un pixel manualmente para calibrar.');
      }
      
      return {
        tileCoordinates: { x: cfg.TILE_X, y: cfg.TILE_Y },
        tileSize: cfg.TILE_SIZE,
        isValidTile,
        needsCalibration: needsCalibration(),
        botRunning: state.running,
        captureMode: state.captureMode,
        charges: state.charges,
        painted: state.painted,
        lastAttempt: state.last,
        backendHealth: state.health
      };
    },
    
    // Función para verificar health del backend manualmente
    checkHealth: async () => {
      console.log('🔄 Verificando estado del backend...');
      const health = await checkBackendHealth();
      updateStats();
      if (health) {
        console.log('✅ Backend funcionando correctamente:', health);
      } else {
        console.log('❌ Problemas detectados en el backend');
      }
      return state.health;
    },
    
    // Función para resetear configuración
    resetConfig: () => {
      resetToSafeDefaults();
      cfg = loadCfg();
      fillInputsFromCfg();
      setStatus('🔄 Configuración reseteada. Pinta un pixel manualmente para recalibrar.', 'error');
      enableCaptureOnce();
      console.log('✅ Configuración reseteada a valores seguros');
    },
    
    // Función para diagnosticar sistema de reintentos
    debugRetries: () => {
      console.log('🔄 SISTEMA DE REINTENTOS:');
      console.log('─'.repeat(50));
      console.log(`Reintentos actuales: ${state.retryCount}/5`);
      console.log(`En cooldown: ${state.inCooldown ? '✅ SÍ' : '❌ NO'}`);
      if (state.inCooldown && state.cooldownEndTime > Date.now()) {
        const remainingMs = state.cooldownEndTime - Date.now();
        const remainingMin = Math.floor(remainingMs / 60000);
        const remainingSec = Math.floor((remainingMs % 60000) / 1000);
        console.log(`Tiempo restante de cooldown: ${remainingMin}m ${remainingSec}s`);
      }
      console.log(`Última respuesta del servidor: ${state.last?.status || 'N/A'}`);
      if (state.last?.json) {
        console.log(`Respuesta JSON:`, state.last.json);
      }
      console.log('─'.repeat(50));
      
      // Consejos según el estado
      if (state.retryCount > 0) {
        console.log('💡 CONSEJOS:');
        console.log('- El bot está reintentando automáticamente');
        console.log('- Los delays son exponenciales: 3s, 6s, 12s, 24s');
        console.log('- Después de 5 fallos hay cooldown de 3 minutos');
      }
      if (state.inCooldown) {
        console.log('⏰ El bot está en cooldown de seguridad');
        console.log('- Esto es normal después de errores consecutivos');
        console.log('- Use WPAUI.checkHealth() para verificar el backend');
      }
      
      return {
        retryCount: state.retryCount,
        inCooldown: state.inCooldown,
        cooldownEndTime: state.cooldownEndTime,
        lastStatus: state.last?.status,
        lastResponse: state.last?.json
      };
    },
    
    // Función para forzar salir del cooldown (usar con cuidado)
    forceClearCooldown: () => {
      const wasCooldown = state.inCooldown;
      state.inCooldown = false;
      state.cooldownEndTime = 0;
      state.retryCount = 0;
      
      if (wasCooldown) {
        setStatus('🔓 Cooldown forzado a terminar por el usuario', 'success');
        console.log('⚠️ Cooldown eliminado manualmente');
        updateStats();
      } else {
        console.log('ℹ️ No había cooldown activo');
      }
      
      return !wasCooldown;
    },
    
    // Función para simular error (para testing)
    simulateError: (statusCode = 500) => {
      console.log(`🧪 Simulando error ${statusCode} para testing...`);
      state.last = {
        x: 0, y: 0, color: 1,
        status: statusCode,
        json: { error: 'Error simulado para testing' }
      };
      updateStats();
      setStatus(`🧪 Error ${statusCode} simulado`, 'error');
    }
  };

  // ---------- Arranque ----------
  cfg = loadCfg(); // Inicializar configuración ahora que loadCfg() está definida
  log('Bot iniciado con configuración:', cfg);
  log('¿Necesita calibración?', needsCalibration());
  
  // Usar sistema de tiles - ya no hay zonas "peligrosas" globales
  // Las coordenadas ahora son locales dentro de cada tile (0-2999)
  
  createUI();
  
  // Verificar health del backend y obtener sesión al inicializar
  Promise.all([checkBackendHealth(), getSession()]).then(() => {
    updateStats();
    
    // Verificar si necesita calibración al cargar
    if (needsCalibration()) {
      setTimeout(() => {
        setStatus('🎯 Calibración requerida: pinta un pixel para detectar tile actual', 'error');
        enableCaptureOnce(); // Activar captura automáticamente
      }, 1000);
    } else {
      // Mostrar estado basado en health del backend
      if (state.health?.up) {
        setStatus(`✅ Bot listo para usar (Backend: ${state.health.uptime})`, 'success');
      } else {
        setStatus('⚠️ Bot listo, pero hay problemas con el backend', 'error');
      }
    }
  }).catch(() => {
    // Si falla la verificación inicial, continuar con la inicialización básica
    getSession().then(() => {
      updateStats();
      if (needsCalibration()) {
        setTimeout(() => {
          setStatus('🎯 Calibración requerida: pinta un pixel para detectar tile actual', 'error');
          enableCaptureOnce();
        }, 1000);
      } else {
        setStatus('⚠️ Bot listo, pero no se pudo verificar el backend', 'error');
      }
    });
  });
})();