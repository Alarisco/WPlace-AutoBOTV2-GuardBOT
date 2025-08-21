/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-21T06:28:30.591Z */
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
  async function postPixelBatchImage(tileX, tileY, coords, colors, turnstileToken) {
    try {
      const body = JSON.stringify({
        colors,
        coords,
        t: turnstileToken
      });
      const response = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body
      });
      let responseData = null;
      try {
        responseData = await response.json();
      } catch {
        responseData = {};
      }
      return {
        status: response.status,
        json: responseData,
        success: response.ok,
        painted: (responseData == null ? void 0 : responseData.painted) || 0
      };
    } catch (error) {
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
      unknown: "-"
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
      timeoutError: "\u23F0 Timeout del servidor. Reintentando..."
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
      autoSelectPosition: "\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"
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
      selectionError: "\u274C Error en selecci\xF3n, int\xE9ntalo de nuevo"
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
      unknown: "-"
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
      timeoutError: "\u23F0 Server timeout. Retrying..."
    },
    // Farm Module (to be implemented)
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
      autoSelectPosition: "\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"
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
      selectionError: "\u274C Selection error, please try again"
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
      unknown: "-"
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
      timeoutError: "\u23F0 Timeout serveur. Nouvel essai..."
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
      autoSelectPosition: "\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"
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
      selectionError: "\u274C Erreur de s\xE9lection, veuillez r\xE9essayer"
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
      unknown: "-"
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
      timeoutError: "\u23F0 \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430..."
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
      backendOffline: "\u0411\u044D\u043A\u044D\u043D\u0434",
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
      autoSelectPosition: "\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430."
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
      selectionError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430"
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
      unknown: "-"
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
      timeoutError: "\u23F0 \u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u6B63\u5728\u91CD\u8BD5..."
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
      autoSelectPosition: "\u{1F3AF} \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF0C\u5728\u5730\u56FE\u4E0A\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF"
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
      selectionError: "\u274C \u9009\u62E9\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5"
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
      unknown: "-"
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
      timeoutError: "\u23F0 \u670D\u52D9\u5668\u8D85\u6642\uFF0C\u6B63\u5728\u91CD\u8A66..."
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
      autoSelectPosition: "\u{1F3AF} \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF0C\u5728\u5730\u5716\u4E0A\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF"
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
      selectionError: "\u274C \u9078\u64C7\u51FA\u932F\uFF0C\u8ACB\u91CD\u8A66"
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

  // src/farm/ui.js
  function createFarmUI(config, onStart, onStop) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
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
    (_f = elements.colorModeSelect) == null ? void 0 : _f.addEventListener("change", () => {
      updateColorModeVisibility();
      updateConfigFromInputs();
    });
    (_g = elements.customPaletteInput) == null ? void 0 : _g.addEventListener("input", () => {
      updateConfigFromInputs();
    });
    (_h = elements.advancedToggle) == null ? void 0 : _h.addEventListener("click", () => {
      uiState.showAdvanced = !uiState.showAdvanced;
      elements.advancedSection.style.display = uiState.showAdvanced ? "block" : "none";
      elements.advancedArrow.textContent = uiState.showAdvanced ? "\u25BC" : "\u25B6";
    });
    ["delayInput", "pixelsInput", "minChargesInput", "colorMinInput", "colorMaxInput", "colorFixedInput", "tileXInput", "tileYInput"].forEach((inputName) => {
      var _a2;
      (_a2 = elements[inputName]) == null ? void 0 : _a2.addEventListener("change", updateConfigFromInputs);
    });
    (_i = elements.saveBtn) == null ? void 0 : _i.addEventListener("click", () => {
      updateConfigFromInputs();
      saveFarmCfg(config);
      setStatus(`\u{1F4BE} ${t("farm.configSaved")}`, "success");
    });
    (_j = elements.loadBtn) == null ? void 0 : _j.addEventListener("click", () => {
      const loaded2 = loadFarmCfg(FARM_DEFAULTS);
      Object.assign(config, loaded2);
      updateInputsFromConfig();
      setStatus(`\u{1F4C1} ${t("farm.configLoaded")}`, "success");
    });
    (_k = elements.resetBtn) == null ? void 0 : _k.addEventListener("click", () => {
      resetFarmCfg();
      Object.assign(config, FARM_DEFAULTS);
      updateInputsFromConfig();
      setStatus(`\u{1F504} ${t("farm.configReset")}`, "success");
    });
    (_l = elements.captureBtn) == null ? void 0 : _l.addEventListener("click", () => {
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

  // src/core/turnstile.js
  var loaded = false;
  async function loadTurnstile() {
    if (loaded || window.turnstile) return;
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.onload = () => {
        loaded = true;
        resolve();
      };
      s.onerror = () => reject(new Error("No se pudo cargar Turnstile"));
      document.head.appendChild(s);
    });
  }
  async function executeTurnstile(siteKey, action = "paint") {
    var _a;
    await loadTurnstile();
    if (typeof ((_a = window.turnstile) == null ? void 0 : _a.execute) === "function") {
      try {
        const token = await window.turnstile.execute(siteKey, { action });
        if (token && token.length > 20) return token;
      } catch {
      }
    }
    return await new Promise((resolve) => {
      const host = document.createElement("div");
      host.style.position = "fixed";
      host.style.left = "-9999px";
      document.body.appendChild(host);
      window.turnstile.render(host, {
        sitekey: siteKey,
        callback: (t2) => {
          document.body.removeChild(host);
          resolve(t2);
        }
      });
    });
  }
  async function getTurnstileToken(siteKey) {
    return executeTurnstile(siteKey, "paint");
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
  var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function sleepWithCountdown(ms, onUpdate, state) {
    const startTime = Date.now();
    const endTime = startTime + ms;
    while (Date.now() < endTime && (!state || state.running)) {
      const remaining = endTime - Date.now();
      if (onUpdate) {
        onUpdate(remaining);
      }
      await sleep(Math.min(1e3, remaining));
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
    const t2 = await getTurnstileToken(cfg.SITEKEY);
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
          await sleep(delay);
        }
      } catch (error) {
        log(`Error en intento ${attempt}:`, error);
        state.retryCount = attempt;
        if (attempt < maxAttempts) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          setStatus(`\u{1F4A5} Error en intento ${attempt}/${maxAttempts}, reintentando en ${delay / 1e3}s...`, "error");
          await sleep(delay);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvbG9nZ2VyLmpzIiwgInNyYy9mYXJtL2NvbmZpZy5qcyIsICJzcmMvY29yZS9zdG9yYWdlLmpzIiwgInNyYy9jb3JlL3dwbGFjZS1hcGkuanMiLCAic3JjL2NvcmUvdXRpbHMuanMiLCAic3JjL2xvY2FsZXMvZXMuanMiLCAic3JjL2xvY2FsZXMvZW4uanMiLCAic3JjL2xvY2FsZXMvZnIuanMiLCAic3JjL2xvY2FsZXMvcnUuanMiLCAic3JjL2xvY2FsZXMvemgtSGFucy5qcyIsICJzcmMvbG9jYWxlcy96aC1IYW50LmpzIiwgInNyYy9sb2NhbGVzL2luZGV4LmpzIiwgInNyYy9mYXJtL3VpLmpzIiwgInNyYy9jb3JlL3R1cm5zdGlsZS5qcyIsICJzcmMvZmFybS9jb29yZHMuanMiLCAic3JjL2NvcmUvdGltaW5nLmpzIiwgInNyYy9mYXJtL2xvb3AuanMiLCAic3JjL2NvcmUvY2FwdHVyZS5qcyIsICJzcmMvY29yZS9kb20uanMiLCAic3JjL2VudHJpZXMvZmFybS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHtcbiAgZGVidWdFbmFibGVkOiBmYWxzZSxcbiAgc2V0RGVidWcodikgeyB0aGlzLmRlYnVnRW5hYmxlZCA9ICEhdjsgfSxcbiAgZGVidWcoLi4uYSkgeyBpZiAodGhpcy5kZWJ1Z0VuYWJsZWQpIGNvbnNvbGUuZGVidWcoXCJbQk9UXVwiLCAuLi5hKTsgfSxcbiAgaW5mbyguLi5hKSAgeyBjb25zb2xlLmluZm8oXCJbQk9UXVwiLCAuLi5hKTsgfSxcbiAgd2FybiguLi5hKSAgeyBjb25zb2xlLndhcm4oXCJbQk9UXVwiLCAuLi5hKTsgfSxcbiAgZXJyb3IoLi4uYSkgeyBjb25zb2xlLmVycm9yKFwiW0JPVF1cIiwgLi4uYSk7IH1cbn07XG5cbi8vIEZhcm0tc3BlY2lmaWMgbG9nZ2VyXG5leHBvcnQgY29uc3QgbG9nID0gKC4uLmEpID0+IGNvbnNvbGUubG9nKCdbV1BBLVVJXScsIC4uLmEpO1xuXG4vLyBVdGlsaXR5IGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcbmV4cG9ydCBjb25zdCBjbGFtcCA9IChuLCBhLCBiKSA9PiBNYXRoLm1heChhLCBNYXRoLm1pbihiLCBuKSk7XG4iLCAiLy8gQ29uZmlndXJhY2lcdTAwRjNuIHBvciBkZWZlY3RvIHBhcmEgV1BsYWNlIEF1dG9GYXJtXG5leHBvcnQgY29uc3QgRkFSTV9ERUZBVUxUUyA9IHtcbiAgU0lURUtFWTogJzB4NEFBQUFBQUJwcUplOEZPME44NHEwRicsIC8vIFR1cm5zdGlsZSBzaXRla2V5IChhalx1MDBGQXN0YWxvIHNpIGNhbWJpYSlcbiAgVElMRV9YOiAxMDg2LFxuICBUSUxFX1k6IDE1NjUsXG4gIFRJTEVfU0laRTogMzAwMCwgICAgICAgICAvLyBUaWxlcyBzb24gZGUgfjMwMDB4MzAwMCBzZWdcdTAwRkFuIGludmVzdGlnYWNpXHUwMEYzblxuICBERUxBWV9NUzogMTUwMDAsICAgICAgICAgLy8gMTUgc2VndW5kb3MgZW50cmUgcGludGFkYXMgKHByZWRldGVybWluYWRvKVxuICBNSU5fQ0hBUkdFUzogMTAsICAgICAgICAgLy8gbVx1MDBFRG5pbW8gZGUgY2FyZ2FzIHBhcmEgZW1wZXphciBhIHBpbnRhclxuICBDSEFSR0VfUkVHRU5fTVM6IDMwMDAwLCAgLy8gMSBjYXJnYSBjYWRhIDMwIHNlZ3VuZG9zXG4gIFBJWEVMU19QRVJfQkFUQ0g6IDIwLCAgICAvLyBuXHUwMEZBbWVybyBkZSBwXHUwMEVEeGVsZXMgYSBwaW50YXIgcG9yIGxvdGVcbiAgQ09MT1JfTUlOOiAxLFxuICBDT0xPUl9NQVg6IDMyLFxuICBDT0xPUl9NT0RFOiAncmFuZG9tJywgICAgLy8gJ3JhbmRvbScgfCAnZml4ZWQnXG4gIENPTE9SX0ZJWEVEOiAxLFxuICBDVVNUT01fUEFMRVRURTogWycjRkYwMDAwJywgJyMwMEZGMDAnLCAnIzAwMDBGRicsICcjRkZGRjAwJywgJyNGRjAwRkYnLCAnIzAwRkZGRiddLFxuICAvLyBOdWV2YSBmdW5jaW9uYWxpZGFkIGRlIHBvc2ljaVx1MDBGM24geSByYWRpb1xuICBCQVNFX1g6IG51bGwsICAgICAgICAgICAgLy8gUG9zaWNpXHUwMEYzbiBYIGJhc2UgKGxvY2FsIGFsIHRpbGUpIC0gc2UgZXN0YWJsZWNlIGFsIHNlbGVjY2lvbmFyIHpvbmFcbiAgQkFTRV9ZOiBudWxsLCAgICAgICAgICAgIC8vIFBvc2ljaVx1MDBGM24gWSBiYXNlIChsb2NhbCBhbCB0aWxlKSAtIHNlIGVzdGFibGVjZSBhbCBzZWxlY2Npb25hciB6b25hXG4gIEZBUk1fUkFESVVTOiA1MDAsICAgICAgICAvLyBSYWRpbyBkZSBmYXJtaW5nIGVuIHBcdTAwRUR4ZWxlcyAoNTAwcHggcG9yIGRlZmVjdG8gcGFyYSB6b25hIHNlZ3VyYSlcbiAgUE9TSVRJT05fU0VMRUNURUQ6IGZhbHNlLCAvLyBGbGFnIHBhcmEgaW5kaWNhciBzaSBzZSBzZWxlY2Npb25cdTAwRjMgdW5hIHBvc2ljaVx1MDBGM25cbiAgVUlfVEhFTUU6IHtcbiAgICBwcmltYXJ5OiAnIzAwMDAwMCcsXG4gICAgc2Vjb25kYXJ5OiAnIzExMTExMScsXG4gICAgYWNjZW50OiAnIzIyMjIyMicsXG4gICAgdGV4dDogJyNmZmZmZmYnLFxuICAgIGhpZ2hsaWdodDogJyM3NzVjZTMnLFxuICAgIHN1Y2Nlc3M6ICcjMDBmZjAwJyxcbiAgICBlcnJvcjogJyNmZjAwMDAnLFxuICAgIHJ1bm5pbmc6ICcjMDBjYzAwJyAgICAgLy8gVmVyZGUgcGFyYSBjdWFuZG8gZXN0XHUwMEUxIGNvcnJpZW5kb1xuICB9XG59O1xuXG4vLyBFc3RhZG8gZ2xvYmFsIGRlbCBmYXJtXG5leHBvcnQgY29uc3QgZmFybVN0YXRlID0ge1xuICBydW5uaW5nOiBmYWxzZSxcbiAgcGFpbnRlZDogMCxcbiAgbGFzdDogbnVsbCwgICAgICAgICAgLy8ge3gseSxjb2xvcixzdGF0dXMsanNvbn1cbiAgY2hhcmdlczogeyBjb3VudDogMCwgbWF4OiAwLCBjb29sZG93bk1zOiAzMDAwMCB9LFxuICB1c2VyOiBudWxsLFxuICBwYW5lbDogbnVsbCxcbiAgY2FwdHVyZU1vZGU6IGZhbHNlLCAgLy8gc25pZmZlciBhY3Rpdm8gcGFyYSBjYXB0dXJhciBUSUxFX1gvWSBkZXNkZSB1biBQT1NUIHJlYWxcbiAgc2VsZWN0aW5nUG9zaXRpb246IGZhbHNlLCAvLyBzbmlmZmVyIGFjdGl2byBwYXJhIGNhcHR1cmFyIHBvc2ljaVx1MDBGM24gYmFzZVxuICBvcmlnaW5hbEZldGNoOiB3aW5kb3cuZmV0Y2gsXG4gIHJldHJ5Q291bnQ6IDAsICAgICAgIC8vIGNvbnRhZG9yIGRlIHJlaW50ZW50b3NcbiAgaW5Db29sZG93bjogZmFsc2UsICAgLy8gc2kgZXN0XHUwMEUxIGVuIGNvb2xkb3duIGRlIDIgbWludXRvc1xuICBuZXh0UGFpbnRUaW1lOiAwLCAgICAvLyB0aW1lc3RhbXAgZGUgbGEgcHJcdTAwRjN4aW1hIHBpbnRhZGFcbiAgY29vbGRvd25FbmRUaW1lOiAwLCAgLy8gdGltZXN0YW1wIGRlbCBmaW5hbCBkZWwgY29vbGRvd25cbiAgaGVhbHRoOiBudWxsICAgICAgICAgLy8gZXN0YWRvIGRlIHNhbHVkIGRlbCBiYWNrZW5kXG59O1xuIiwgImV4cG9ydCBmdW5jdGlvbiBsb2FkKGtleSwgZmFsbGJhY2spIHtcbiAgLy8gTm8gdXNhciBsb2NhbFN0b3JhZ2UgLSBzaWVtcHJlIHJldG9ybmFyIGZhbGxiYWNrXG4gIHJldHVybiBmYWxsYmFjaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmUoa2V5LCB2YWx1ZSkge1xuICAvLyBObyBndWFyZGFyIGVuIGxvY2FsU3RvcmFnZSAtIGZ1bmNpXHUwMEYzbiBkZXNoYWJpbGl0YWRhXG4gIHJldHVybjtcbn1cblxuLy8gRmFybS1zcGVjaWZpYyBzdG9yYWdlIGZ1bmN0aW9uc1xuZXhwb3J0IGZ1bmN0aW9uIHNhdmVGYXJtQ2ZnKGNmZykgeyBcbiAgLy8gTm8gZ3VhcmRhciBlbiBsb2NhbFN0b3JhZ2UgLSBmdW5jaVx1MDBGM24gZGVzaGFiaWxpdGFkYVxuICByZXR1cm47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmFybUNmZyhkZWZhdWx0cykge1xuICAvLyBObyBjYXJnYXIgZGUgbG9jYWxTdG9yYWdlIC0gc2llbXByZSB1c2FyIGRlZmF1bHRzXG4gIHJldHVybiB7IC4uLmRlZmF1bHRzIH07XG59XG5cbi8vIFJlc2V0ZWFyIGNvbmZpZ3VyYWNpXHUwMEYzbiBkZWwgZmFybVxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0RmFybUNmZygpIHtcbiAgLy8gTm8gaGF5IGxvY2FsU3RvcmFnZSBxdWUgcmVzZXRlYXIgLSBmdW5jaVx1MDBGM24gZGVzaGFiaWxpdGFkYVxuICBjb25zb2xlLmxvZygnW1dQQS1VSV0nLCAnQ29uZmlndXJhY2lcdTAwRjNuIGRlbCBmYXJtIHJlc2V0ZWFkYSAobG9jYWxTdG9yYWdlIGRlc2hhYmlsaXRhZG8pJyk7XG59XG5cbi8vIFJlc2V0ZWFyIGEgY29uZmlndXJhY2lcdTAwRjNuIHNlZ3VyYVxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VG9TYWZlRGVmYXVsdHMoKSB7XG4gIC8vIE5vIGhheSBsb2NhbFN0b3JhZ2UgcXVlIHJlc2V0ZWFyIC0gZnVuY2lcdTAwRjNuIGRlc2hhYmlsaXRhZGFcbiAgY29uc29sZS5sb2coJ1tXUEEtVUldJywgJ0NvbmZpZ3VyYWNpXHUwMEYzbiByZXNldGVhZGEgYSB2YWxvcmVzIHNlZ3Vyb3MgKGxvY2FsU3RvcmFnZSBkZXNoYWJpbGl0YWRvKScpO1xufVxuXG4vLyBWZXJpZmljYXIgc2kgbmVjZXNpdGEgY2FsaWJyYWNpXHUwMEYzbiBpbmljaWFsXG5leHBvcnQgZnVuY3Rpb24gbmVlZHNDYWxpYnJhdGlvbihjZmcsIGRlZmF1bHRzKSB7XG4gIC8vIFZlcmlmaWNhciBzaSBsYXMgY29vcmRlbmFkYXMgc29uIGxhcyBwb3IgZGVmZWN0b1xuICBjb25zdCBoYXNEZWZhdWx0Q29vcmRzID0gY2ZnLlRJTEVfWCA9PT0gZGVmYXVsdHMuVElMRV9YICYmIGNmZy5USUxFX1kgPT09IGRlZmF1bHRzLlRJTEVfWTtcbiAgLy8gU2luIGxvY2FsU3RvcmFnZSwgc2llbXByZSBjb25zaWRlcmFtb3MgcXVlIG5vIGhheSBjb25maWd1cmFjaVx1MDBGM24gZ3VhcmRhZGFcbiAgY29uc3QgaGFzTm9TYXZlZENvbmZpZyA9IHRydWU7XG4gIC8vIFZlcmlmaWNhciBxdWUgbGFzIGNvb3JkZW5hZGFzIHNlYW4gblx1MDBGQW1lcm9zIHZcdTAwRTFsaWRvc1xuICBjb25zdCBoYXNJbnZhbGlkQ29vcmRzID0gIU51bWJlci5pc0Zpbml0ZShjZmcuVElMRV9YKSB8fCAhTnVtYmVyLmlzRmluaXRlKGNmZy5USUxFX1kpO1xuICBcbiAgY29uc3QgbmVlZHNDYWxpYiA9IGhhc0RlZmF1bHRDb29yZHMgfHwgaGFzTm9TYXZlZENvbmZpZyB8fCBoYXNJbnZhbGlkQ29vcmRzO1xuICBjb25zb2xlLmxvZygnW1dQQS1VSV0nLCBgVmVyaWZpY2FjaVx1MDBGM24gY2FsaWJyYWNpXHUwMEYzbjogZGVmYXVsdHM9JHtoYXNEZWZhdWx0Q29vcmRzfSwgbm9Db25maWc9JHtoYXNOb1NhdmVkQ29uZmlnfSwgaW52YWxpZD0ke2hhc0ludmFsaWRDb29yZHN9LCBjb29yZHM9KCR7Y2ZnLlRJTEVfWH0sJHtjZmcuVElMRV9ZfSlgKTtcbiAgXG4gIHJldHVybiBuZWVkc0NhbGliO1xufVxuIiwgImltcG9ydCB7IGZldGNoV2l0aFRpbWVvdXQgfSBmcm9tIFwiLi9odHRwLmpzXCI7XG5cbmNvbnN0IEJBU0UgPSBcImh0dHBzOi8vYmFja2VuZC53cGxhY2UubGl2ZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBtZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L21lYCwgeyBjcmVkZW50aWFsczogJ2luY2x1ZGUnIH0pLnRoZW4ociA9PiByLmpzb24oKSk7XG4gICAgY29uc3QgdXNlciA9IG1lIHx8IG51bGw7XG4gICAgY29uc3QgYyA9IG1lPy5jaGFyZ2VzIHx8IHt9O1xuICAgIGNvbnN0IGNoYXJnZXMgPSB7XG4gICAgICBjb3VudDogYy5jb3VudCA/PyAwLCAgICAgICAgLy8gTWFudGVuZXIgdmFsb3IgZGVjaW1hbCBvcmlnaW5hbFxuICAgICAgbWF4OiBjLm1heCA/PyAwLCAgICAgICAgICAgIC8vIE1hbnRlbmVyIHZhbG9yIG9yaWdpbmFsIChwdWVkZSB2YXJpYXIgcG9yIHVzdWFyaW8pXG4gICAgICBjb29sZG93bk1zOiBjLmNvb2xkb3duTXMgPz8gMzAwMDBcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlciwgXG4gICAgICAgIGNoYXJnZXM6IGNoYXJnZXMuY291bnQsXG4gICAgICAgIG1heENoYXJnZXM6IGNoYXJnZXMubWF4LFxuICAgICAgICBjaGFyZ2VSZWdlbjogY2hhcmdlcy5jb29sZG93bk1zXG4gICAgICB9XG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgXG4gICAgcmV0dXJuIHsgXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlLFxuICAgICAgZGF0YToge1xuICAgICAgICB1c2VyOiBudWxsLCBcbiAgICAgICAgY2hhcmdlczogMCxcbiAgICAgICAgbWF4Q2hhcmdlczogMCxcbiAgICAgICAgY2hhcmdlUmVnZW46IDMwMDAwXG4gICAgICB9XG4gICAgfTsgXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrSGVhbHRoKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFTRX0vaGVhbHRoYCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KTtcbiAgICBcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IGhlYWx0aCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmhlYWx0aCxcbiAgICAgICAgbGFzdENoZWNrOiBEYXRlLm5vdygpLFxuICAgICAgICBzdGF0dXM6ICdvbmxpbmUnXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhYmFzZTogZmFsc2UsXG4gICAgICAgIHVwOiBmYWxzZSxcbiAgICAgICAgdXB0aW1lOiAnTi9BJyxcbiAgICAgICAgbGFzdENoZWNrOiBEYXRlLm5vdygpLFxuICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFiYXNlOiBmYWxzZSxcbiAgICAgIHVwOiBmYWxzZSxcbiAgICAgIHVwdGltZTogJ04vQScsXG4gICAgICBsYXN0Q2hlY2s6IERhdGUubm93KCksXG4gICAgICBzdGF0dXM6ICdvZmZsaW5lJyxcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlXG4gICAgfTtcbiAgfVxufVxuXG4vLyBVbmlmaWNhIHBvc3QgZGUgcFx1MDBFRHhlbCBwb3IgbG90ZXMgKGJhdGNoIHBvciB0aWxlKS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0UGl4ZWxCYXRjaCh7IHRpbGVYLCB0aWxlWSwgcGl4ZWxzLCB0dXJuc3RpbGVUb2tlbiB9KSB7XG4gIC8vIHBpeGVsczogW3t4LHksY29sb3J9LCBcdTIwMjZdIHJlbGF0aXZvcyBhbCB0aWxlXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IHBpeGVscywgdG9rZW46IHR1cm5zdGlsZVRva2VuIH0pO1xuICBjb25zdCByID0gYXdhaXQgZmV0Y2hXaXRoVGltZW91dChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIiB9LFxuICAgIGJvZHksXG4gICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiXG4gIH0pO1xuICBcbiAgLy8gQWxndW5hcyByZXNwdWVzdGFzIHB1ZWRlbiBubyB0cmFlciBKU09OIGF1bnF1ZSBzZWFuIDIwMC5cbiAgaWYgKHIuc3RhdHVzID09PSAyMDApIHtcbiAgICB0cnkgeyByZXR1cm4gYXdhaXQgci5qc29uKCk7IH0gY2F0Y2ggeyByZXR1cm4geyBvazogdHJ1ZSB9OyB9XG4gIH1cbiAgXG4gIGxldCBtc2cgPSBgSFRUUCAke3Iuc3RhdHVzfWA7XG4gIHRyeSB7IFxuICAgIGNvbnN0IGogPSBhd2FpdCByLmpzb24oKTsgXG4gICAgbXNnID0gaj8ubWVzc2FnZSB8fCBtc2c7IFxuICB9IGNhdGNoIHtcbiAgICAvLyBSZXNwb25zZSBub3QgSlNPTlxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgcGFpbnQgZmFpbGVkOiAke21zZ31gKTtcbn1cblxuLy8gVmVyc2lcdTAwRjNuICdzYWZlJyBxdWUgbm8gYXJyb2phIGV4Y2VwY2lvbmVzIHkgcmV0b3JuYSBzdGF0dXMvanNvblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbEJhdGNoU2FmZSh0aWxlWCwgdGlsZVksIHBpeGVscywgdHVybnN0aWxlVG9rZW4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBwaXhlbHMsIHRva2VuOiB0dXJuc3RpbGVUb2tlbiB9KTtcbiAgICBjb25zdCByID0gYXdhaXQgZmV0Y2hXaXRoVGltZW91dChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIgfSxcbiAgICAgIGJvZHksXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCJcbiAgICB9KTtcbiAgbGV0IGpzb24gPSB7fTtcbiAgLy8gSWYgcmVzcG9uc2UgaXMgbm90IEpTT04sIGlnbm9yZSBwYXJzZSBlcnJvclxuICB0cnkgeyBqc29uID0gYXdhaXQgci5qc29uKCk7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICAgIHJldHVybiB7IHN0YXR1czogci5zdGF0dXMsIGpzb24sIHN1Y2Nlc3M6IHIub2sgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdGF0dXM6IDAsIGpzb246IHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgc3VjY2VzczogZmFsc2UgfTtcbiAgfVxufVxuXG4vLyBQb3N0IHBcdTAwRUR4ZWwgcGFyYSBmYXJtICh2ZXJzaVx1MDBGM24gY29ycmVnaWRhIGNvbiBmb3JtYXRvIG9yaWdpbmFsKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbChjb29yZHMsIGNvbG9ycywgdHVybnN0aWxlVG9rZW4sIHRpbGVYLCB0aWxlWSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgY29sb3JzOiBjb2xvcnMsIFxuICAgICAgY29vcmRzOiBjb29yZHMsIFxuICAgICAgdDogdHVybnN0aWxlVG9rZW4gXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgMTUwMDApOyAvLyBUaW1lb3V0IGRlIDE1IHNlZ3VuZG9zXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L3MwL3BpeGVsLyR7dGlsZVh9LyR7dGlsZVl9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcgfSxcbiAgICAgIGJvZHk6IGJvZHksXG4gICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsXG4gICAgfSk7XG5cbiAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcblxuICAgIGxldCByZXNwb25zZURhdGEgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIHJlc3BvbnNlRGF0YSA9IHt9OyAvLyBJZ25vcmFyIGVycm9yZXMgZGUgSlNPTiBwYXJzZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGpzb246IHJlc3BvbnNlRGF0YSxcbiAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlLm9rXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiAwLFxuICAgICAganNvbjogeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LFxuICAgICAgc3VjY2VzczogZmFsc2VcbiAgICB9O1xuICB9XG59XG5cbi8vIFBvc3QgcFx1MDBFRHhlbCBwYXJhIEF1dG8tSW1hZ2UgKGZvcm1hdG8gb3JpZ2luYWwgY29ycmVjdG8pXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9zdFBpeGVsQmF0Y2hJbWFnZSh0aWxlWCwgdGlsZVksIGNvb3JkcywgY29sb3JzLCB0dXJuc3RpbGVUb2tlbikge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgY29sb3JzOiBjb2xvcnMsIFxuICAgICAgY29vcmRzOiBjb29yZHMsIFxuICAgICAgdDogdHVybnN0aWxlVG9rZW4gXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnIH0sXG4gICAgICBib2R5OiBib2R5XG4gICAgfSk7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmVzcG9uc2VEYXRhID0ge307IC8vIElnbm9yYXIgZXJyb3JlcyBkZSBKU09OIHBhcnNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAganNvbjogcmVzcG9uc2VEYXRhLFxuICAgICAgc3VjY2VzczogcmVzcG9uc2Uub2ssXG4gICAgICBwYWludGVkOiByZXNwb25zZURhdGE/LnBhaW50ZWQgfHwgMFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogMCxcbiAgICAgIGpzb246IHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgcGFpbnRlZDogMFxuICAgIH07XG4gIH1cbn1cbiIsICIvLyBVdGlsaXR5IGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gKG1zKSA9PiBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgbXMpKTtcbmV4cG9ydCBjb25zdCByYW5kSW50ID0gKG4pID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG4pO1xuZXhwb3J0IGNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKG4sIGEsIGIpIHtcbiAgcmV0dXJuIE1hdGgubWF4KGEsIE1hdGgubWluKGIsIG4pKTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgc2VsZWN0b3IgZGUgZWxlbWVudG9zIERPTVxuZXhwb3J0IGZ1bmN0aW9uICQoc2VsZWN0b3IsIHJvb3QgPSBkb2N1bWVudCkge1xuICByZXR1cm4gcm9vdC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgaGFjZXIgZWxlbWVudG9zIGFycmFzdHJhYmxlc1xuZXhwb3J0IGZ1bmN0aW9uIGRyYWdIZWFkZXIoaGVhZGVyRWwsIHBhbmVsRWwpIHtcbiAgbGV0IG9mZnNldFggPSAwLCBvZmZzZXRZID0gMCwgbW91c2VYID0gMCwgbW91c2VZID0gMDtcblxuICBoZWFkZXJFbC5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gIGhlYWRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN0YXJ0RHJhZyk7XG5cbiAgZnVuY3Rpb24gc3RhcnREcmFnKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbW91c2VYID0gZS5jbGllbnRYO1xuICAgIG1vdXNlWSA9IGUuY2xpZW50WTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcERyYWcpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRvRHJhZyk7XG4gIH1cblxuICBmdW5jdGlvbiBkb0RyYWcoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBvZmZzZXRYID0gbW91c2VYIC0gZS5jbGllbnRYO1xuICAgIG9mZnNldFkgPSBtb3VzZVkgLSBlLmNsaWVudFk7XG4gICAgbW91c2VYID0gZS5jbGllbnRYO1xuICAgIG1vdXNlWSA9IGUuY2xpZW50WTtcbiAgICBcbiAgICBjb25zdCBuZXdUb3AgPSBwYW5lbEVsLm9mZnNldFRvcCAtIG9mZnNldFk7XG4gICAgY29uc3QgbmV3TGVmdCA9IHBhbmVsRWwub2Zmc2V0TGVmdCAtIG9mZnNldFg7XG4gICAgXG4gICAgcGFuZWxFbC5zdHlsZS50b3AgPSBNYXRoLm1heCgwLCBuZXdUb3ApICsgJ3B4JztcbiAgICBwYW5lbEVsLnN0eWxlLmxlZnQgPSBNYXRoLm1heCgwLCBuZXdMZWZ0KSArICdweCc7XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wRHJhZygpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcERyYWcpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRvRHJhZyk7XG4gIH1cbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgZm9ybWF0ZWFyIHRpZW1wb1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFRpbWUobXMpIHtcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IobXMgLyAxMDAwKTtcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCk7XG4gIFxuICBpZiAoaG91cnMgPiAwKSB7XG4gICAgcmV0dXJuIGAke2hvdXJzfWggJHttaW51dGVzICUgNjB9bWA7XG4gIH0gZWxzZSBpZiAobWludXRlcyA+IDApIHtcbiAgICByZXR1cm4gYCR7bWludXRlc31tICR7c2Vjb25kcyAlIDYwfXNgO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgJHtzZWNvbmRzfXNgO1xuICB9XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIHBhcnNlYXIgaGV4YWRlY2ltYWxcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhleChzdHIpIHtcbiAgcmV0dXJuIHBhcnNlSW50KHN0ci5yZXBsYWNlKCcjJywgJycpLCAxNik7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGNvbnZlcnRpciBuXHUwMEZBbWVybyBhIGhleFxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4KG51bSkge1xuICByZXR1cm4gJyMnICsgbnVtLnRvU3RyaW5nKDE2KS5wYWRTdGFydCg2LCAnMCcpO1xufVxuIiwgImV4cG9ydCBjb25zdCBlcyA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU2VsZWNjaVx1MDBGM24nLFxuICAgIHVzZXI6ICdVc3VhcmlvJyxcbiAgICBjaGFyZ2VzOiAnQ2FyZ2FzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdEYXRhYmFzZScsXG4gICAgdXB0aW1lOiAnVXB0aW1lJyxcbiAgICBjbG9zZTogJ0NlcnJhcicsXG4gICAgbGF1bmNoOiAnTGFuemFyJyxcbiAgICBsb2FkaW5nOiAnQ2FyZ2FuZG9cdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0VqZWN1dGFuZG9cdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnRGVzY2FyZ2FuZG8gc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdFbGlnZSB1biBib3QgeSBwcmVzaW9uYSBMYW56YXInLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdMaXN0byBwYXJhIGxhbnphcicsXG4gICAgbG9hZEVycm9yOiAnRXJyb3IgYWwgY2FyZ2FyJyxcbiAgICBsb2FkRXJyb3JNc2c6ICdObyBzZSBwdWRvIGNhcmdhciBlbCBib3Qgc2VsZWNjaW9uYWRvLiBSZXZpc2EgdHUgY29uZXhpXHUwMEYzbiBvIGludFx1MDBFOW50YWxvIGRlIG51ZXZvLicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgVmVyaWZpY2FuZG8uLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBPbmxpbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgT2ZmbGluZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycm9yJyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pY2lhciBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlN1YmlyIEltYWdlblwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlJlZGltZW5zaW9uYXIgSW1hZ2VuXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWNjaW9uYXIgUG9zaWNpXHUwMEYzblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiSW5pY2lhciBQaW50dXJhXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIkRldGVuZXIgUGludHVyYVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJHdWFyZGFyIFByb2dyZXNvXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIkNhcmdhciBQcm9ncmVzb1wiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBWZXJpZmljYW5kbyBjb2xvcmVzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHUwMEExQWJyZSBsYSBwYWxldGEgZGUgY29sb3JlcyBlbiBlbCBzaXRpbyBlIGludFx1MDBFOW50YWxvIGRlIG51ZXZvIVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvbG9yZXMgZGlzcG9uaWJsZXMgZW5jb250cmFkb3NcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIENhcmdhbmRvIGltYWdlbi4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBJbWFnZW4gY2FyZ2FkYSBjb24ge2NvdW50fSBwXHUwMEVEeGVsZXMgdlx1MDBFMWxpZG9zXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgRXJyb3IgYWwgY2FyZ2FyIGxhIGltYWdlblwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHUwMEExUGludGEgZWwgcHJpbWVyIHBcdTAwRUR4ZWwgZW4gbGEgdWJpY2FjaVx1MDBGM24gZG9uZGUgcXVpZXJlcyBxdWUgY29taWVuY2UgZWwgYXJ0ZSFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBxdWUgcGludGVzIGVsIHBcdTAwRUR4ZWwgZGUgcmVmZXJlbmNpYS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTAwQTFQb3NpY2lcdTAwRjNuIGVzdGFibGVjaWRhIGNvbiBcdTAwRTl4aXRvIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2Npb25hciBwb3NpY2lcdTAwRjNuXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgUG9zaWNpXHUwMEYzbiBkZXRlY3RhZGEsIHByb2Nlc2FuZG8uLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJvciBkZXRlY3RhbmRvIHBvc2ljaVx1MDBGM24sIGludFx1MDBFOW50YWxvIGRlIG51ZXZvXCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggSW5pY2lhbmRvIHBpbnR1cmEuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9ncmVzbzoge3BhaW50ZWR9L3t0b3RhbH0gcFx1MDBFRHhlbGVzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBTaW4gY2FyZ2FzLiBFc3BlcmFuZG8ge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQaW50dXJhIGRldGVuaWRhIHBvciBlbCB1c3VhcmlvXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgXHUwMEExUGludHVyYSBjb21wbGV0YWRhISB7Y291bnR9IHBcdTAwRUR4ZWxlcyBwaW50YWRvcy5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJvciBkdXJhbnRlIGxhIHBpbnR1cmFcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBDYXJnYSB1bmEgaW1hZ2VuIHkgc2VsZWNjaW9uYSB1bmEgcG9zaWNpXHUwMEYzbiBwcmltZXJvXCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3Jlc29cIixcbiAgICB1c2VyTmFtZTogXCJVc3VhcmlvXCIsXG4gICAgcGl4ZWxzOiBcIlBcdTAwRUR4ZWxlc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2FyZ2FzXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJUaWVtcG8gZXN0aW1hZG9cIixcbiAgICBpbml0TWVzc2FnZTogXCJIYXogY2xpYyBlbiAnSW5pY2lhciBBdXRvLUJPVCcgcGFyYSBjb21lbnphclwiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVzcGVyYW5kbyBpbmljaWFsaXphY2lcdTAwRjNuLi4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgSW1hZ2VuIHJlZGltZW5zaW9uYWRhIGEge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQaW50dXJhIHBhdXNhZGEgZW4gbGEgcG9zaWNpXHUwMEYzbiBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBcdTAwRUR4ZWxlcyBwb3IgbG90ZVwiLFxuICAgIGJhdGNoU2l6ZTogXCJUYW1hXHUwMEYxbyBkZWwgbG90ZVwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiU2lndWllbnRlIGxvdGUgZW5cIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlVzYXIgdG9kYXMgbGFzIGNhcmdhcyBkaXNwb25pYmxlc1wiLFxuICAgIHNob3dPdmVybGF5OiBcIk1vc3RyYXIgb3ZlcmxheVwiLFxuICAgIG1heENoYXJnZXM6IFwiQ2FyZ2FzIG1cdTAwRTF4aW1hcyBwb3IgbG90ZVwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBFc3BlcmFuZG8gY2FyZ2FzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRpZW1wbyByZXN0YW50ZVwiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgRXNwZXJhbmRvIHt0aW1lfSBwYXJhIGNvbnRpbnVhci4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyZXNvIGd1YXJkYWRvIGNvbW8ge2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBQcm9ncmVzbyBjYXJnYWRvOiB7cGFpbnRlZH0ve3RvdGFsfSBwXHUwMEVEeGVsZXMgcGludGFkb3NcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgRXJyb3IgYWwgY2FyZ2FyIHByb2dyZXNvOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGd1YXJkYXIgcHJvZ3Jlc286IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1MDBCRkRlc2VhcyBndWFyZGFyIGVsIHByb2dyZXNvIGFjdHVhbCBhbnRlcyBkZSBkZXRlbmVyP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIkd1YXJkYXIgUHJvZ3Jlc29cIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiRGVzY2FydGFyXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbGFyXCIsXG4gICAgbWluaW1pemU6IFwiTWluaW1pemFyXCIsXG4gICAgd2lkdGg6IFwiQW5jaG9cIixcbiAgICBoZWlnaHQ6IFwiQWx0b1wiLCBcbiAgICBrZWVwQXNwZWN0OiBcIk1hbnRlbmVyIHByb3BvcmNpXHUwMEYzblwiLFxuICAgIGFwcGx5OiBcIkFwbGljYXJcIixcbiAgb3ZlcmxheU9uOiBcIk92ZXJsYXk6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheTogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzYWRhIGNvbXBsZXRhZGE6IHtwYWludGVkfSBwXHUwMEVEeGVsZXMgcGludGFkb3MgfCBQcm9ncmVzbzoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgRXNwZXJhbmRvIHJlZ2VuZXJhY2lcdTAwRjNuIGRlIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gVGllbXBvOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgRXNwZXJhbmRvIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUXVlZGFuOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbmljaWFsaXphbmRvIGF1dG9tXHUwMEUxdGljYW1lbnRlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBCb3QgaW5pY2lhZG8gYXV0b21cdTAwRTF0aWNhbWVudGVcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgTm8gc2UgcHVkbyBpbmljaWFyIGF1dG9tXHUwMEUxdGljYW1lbnRlLiBVc2EgZWwgYm90XHUwMEYzbiBtYW51YWwuXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBQYWxldGEgZGUgY29sb3JlcyBkZXRlY3RhZGFcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIEJ1c2NhbmRvIHBhbGV0YSBkZSBjb2xvcmVzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgSGFjaWVuZG8gY2xpYyBlbiBlbCBib3RcdTAwRjNuIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm90XHUwMEYzbiBQYWludCBubyBlbmNvbnRyYWRvXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbmljaW8gbWFudWFsIHJlcXVlcmlkb1wiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgUmVpbnRlbnRvIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGVuIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgRXJyb3IgZW4gaW50ZW50byB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgcmVpbnRlbnRhbmRvIGVuIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIEZhbGxcdTAwRjMgZGVzcHVcdTAwRTlzIGRlIHttYXhBdHRlbXB0c30gaW50ZW50b3MuIENvbnRpbnVhbmRvIGNvbiBzaWd1aWVudGUgbG90ZS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgRXJyb3IgZGUgcmVkLiBSZWludGVudGFuZG8uLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgRXJyb3IgZGVsIHNlcnZpZG9yLiBSZWludGVudGFuZG8uLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFRpbWVvdXQgZGVsIHNlcnZpZG9yLiBSZWludGVudGFuZG8uLi5cIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlIChwb3IgaW1wbGVtZW50YXIpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgRmFybSBCb3RcIixcbiAgICBzdGFydDogXCJJbmljaWFyXCIsXG4gICAgc3RvcDogXCJEZXRlbmVyXCIsIFxuICAgIHN0b3BwZWQ6IFwiQm90IGRldGVuaWRvXCIsXG4gICAgY2FsaWJyYXRlOiBcIkNhbGlicmFyXCIsXG4gICAgcGFpbnRPbmNlOiBcIlVuYSB2ZXpcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJWZXJpZmljYW5kbyBlc3RhZG8uLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYWNpXHUwMEYzblwiLFxuICAgIGRlbGF5OiBcIkRlbGF5IChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQXHUwMEVEeGVsZXMvbG90ZVwiLFxuICAgIG1pbkNoYXJnZXM6IFwiQ2FyZ2FzIG1cdTAwRURuXCIsXG4gICAgY29sb3JNb2RlOiBcIk1vZG8gY29sb3JcIixcbiAgICByYW5kb206IFwiQWxlYXRvcmlvXCIsXG4gICAgZml4ZWQ6IFwiRmlqb1wiLFxuICAgIHJhbmdlOiBcIlJhbmdvXCIsXG4gICAgZml4ZWRDb2xvcjogXCJDb2xvciBmaWpvXCIsXG4gICAgYWR2YW5jZWQ6IFwiQXZhbnphZG9cIixcbiAgICB0aWxlWDogXCJUaWxlIFhcIixcbiAgICB0aWxlWTogXCJUaWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlBhbGV0YSBwZXJzb25hbGl6YWRhXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZWo6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJhclwiLFxuICAgIHBhaW50ZWQ6IFwiUGludGFkb3NcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIHJldHJpZXM6IFwiRmFsbG9zXCIsXG4gICAgdGlsZTogXCJUaWxlXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiQ29uZmlndXJhY2lcdTAwRjNuIGd1YXJkYWRhXCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiBjYXJnYWRhXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiQ29uZmlndXJhY2lcdTAwRjNuIHJlaW5pY2lhZGFcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBpbnRhIHVuIHBcdTAwRUR4ZWwgbWFudWFsbWVudGUgcGFyYSBjYXB0dXJhciBjb29yZGVuYWRhcy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiQmFja2VuZCBPbmxpbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIE9mZmxpbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJJbmljaWFuZG8gYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiRGV0ZW5pZW5kbyBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhbmRvLi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiQXV0by1GYXJtIHlhIGVzdFx1MDBFMSBjb3JyaWVuZG8uXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGVzdFx1MDBFMSBlamVjdXRcdTAwRTFuZG9zZS4gQ2lcdTAwRTlycmFsbyBhbnRlcyBkZSBpbmljaWFyIEF1dG8tRmFybS5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTZWxlY2Npb25hciBab25hXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGludGEgdW4gcFx1MDBFRHhlbCBlbiB1bmEgem9uYSBERVNQT0JMQURBIGRlbCBtYXBhIHBhcmEgZXN0YWJsZWNlciBlbCBcdTAwRTFyZWEgZGUgZmFybWluZ1wiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRXNwZXJhbmRvIHF1ZSBwaW50ZXMgZWwgcFx1MDBFRHhlbCBkZSByZWZlcmVuY2lhLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1MDBBMVpvbmEgZXN0YWJsZWNpZGEhIFJhZGlvOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2Npb25hciB6b25hXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTZWxlY2Npb25hIHVuYSB6b25hIHByaW1lcm8gdXNhbmRvICdTZWxlY2Npb25hciBab25hJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiUmFkaW8gZmFybVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJab25hIGFjdHVhbFwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgRmFybWluZyBlbiByYWRpbyB7cmFkaXVzfXB4IGRlc2RlICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgSU1QT1JUQU5URTogU2VsZWNjaW9uYSB1bmEgem9uYSBERVNQT0JMQURBIHBhcmEgZXZpdGFyIGNvbmZsaWN0b3NcIixcbiAgICBub1Bvc2l0aW9uOiBcIlNpbiB6b25hXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uYTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTZWxlY2Npb25hIHVuYSB6b25hIHByaW1lcm8uIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gZWwgbWFwYSBwYXJhIGVzdGFibGVjZXIgbGEgem9uYSBkZSBmYXJtaW5nXCJcbiAgfSxcblxuICAvLyBDb21tb24vU2hhcmVkXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJTXHUwMEVEXCIsXG4gICAgbm86IFwiTm9cIixcbiAgICBvazogXCJBY2VwdGFyXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbGFyXCIsXG4gICAgY2xvc2U6IFwiQ2VycmFyXCIsXG4gICAgc2F2ZTogXCJHdWFyZGFyXCIsXG4gICAgbG9hZDogXCJDYXJnYXJcIixcbiAgICBkZWxldGU6IFwiRWxpbWluYXJcIixcbiAgICBlZGl0OiBcIkVkaXRhclwiLFxuICAgIHN0YXJ0OiBcIkluaWNpYXJcIixcbiAgICBzdG9wOiBcIkRldGVuZXJcIixcbiAgICBwYXVzZTogXCJQYXVzYXJcIixcbiAgICByZXN1bWU6IFwiUmVhbnVkYXJcIixcbiAgICByZXNldDogXCJSZWluaWNpYXJcIixcbiAgICBzZXR0aW5nczogXCJDb25maWd1cmFjaVx1MDBGM25cIixcbiAgICBoZWxwOiBcIkF5dWRhXCIsXG4gICAgYWJvdXQ6IFwiQWNlcmNhIGRlXCIsXG4gICAgbGFuZ3VhZ2U6IFwiSWRpb21hXCIsXG4gICAgbG9hZGluZzogXCJDYXJnYW5kby4uLlwiLFxuICAgIGVycm9yOiBcIkVycm9yXCIsXG4gICAgc3VjY2VzczogXCJcdTAwQzl4aXRvXCIsXG4gICAgd2FybmluZzogXCJBZHZlcnRlbmNpYVwiLFxuICAgIGluZm86IFwiSW5mb3JtYWNpXHUwMEYzblwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJJZGlvbWEgY2FtYmlhZG8gYSB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pY2lhbGl6YXIgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTZWxlY2Npb25hciBcdTAwQzFyZWFcIixcbiAgICBjYXB0dXJlQXJlYTogXCJDYXB0dXJhciBcdTAwQzFyZWFcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiSW5pY2lhciBQcm90ZWNjaVx1MDBGM25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJEZXRlbmVyIFByb3RlY2NpXHUwMEYzblwiLFxuICAgIHVwcGVyTGVmdDogXCJFc3F1aW5hIFN1cGVyaW9yIEl6cXVpZXJkYVwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiRXNxdWluYSBJbmZlcmlvciBEZXJlY2hhXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlBcdTAwRUR4ZWxlcyBQcm90ZWdpZG9zXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkNhbWJpb3MgRGV0ZWN0YWRvc1wiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlBcdTAwRUR4ZWxlcyBSZXBhcmFkb3NcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVzcGVyYW5kbyBpbmljaWFsaXphY2lcdTAwRjNuLi4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFZlcmlmaWNhbmRvIGNvbG9yZXMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBObyBzZSBlbmNvbnRyYXJvbiBjb2xvcmVzLiBBYnJlIGxhIHBhbGV0YSBkZSBjb2xvcmVzIGVuIGVsIHNpdGlvLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvbG9yZXMgZGlzcG9uaWJsZXMgZW5jb250cmFkb3NcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaWNpYWxpemFkbyBjb3JyZWN0YW1lbnRlXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBFcnJvciBpbmljaWFsaXphbmRvIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIENvb3JkZW5hZGFzIGludlx1MDBFMWxpZGFzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIEVsIFx1MDBFMXJlYSBkZWJlIHRlbmVyIGVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhIG1lbm9yIHF1ZSBpbmZlcmlvciBkZXJlY2hhXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTAwQzFyZWEgZGVtYXNpYWRvIGdyYW5kZToge3NpemV9IHBcdTAwRUR4ZWxlcyAobVx1MDBFMXhpbW86IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmFuZG8gXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzbi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHUwMEMxcmVhIGNhcHR1cmFkYToge2NvdW50fSBwXHUwMEVEeGVsZXMgYmFqbyBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGNhcHR1cmFuZG8gXHUwMEUxcmVhOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBQcmltZXJvIGNhcHR1cmEgdW4gXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzblwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gaW5pY2lhZGEgLSBtb25pdG9yZWFuZG8gXHUwMEUxcmVhXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFByb3RlY2NpXHUwMEYzbiBkZXRlbmlkYVwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHUwMEMxcmVhIHByb3RlZ2lkYSAtIHNpbiBjYW1iaW9zIGRldGVjdGFkb3NcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2FtYmlvcyBkZXRlY3RhZG9zIGVuIGVsIFx1MDBFMXJlYSBwcm90ZWdpZGFcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFJlcGFyYW5kbyB7Y291bnR9IHBcdTAwRUR4ZWxlcyBhbHRlcmFkb3MuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFJlcGFyYWRvcyB7Y291bnR9IHBcdTAwRUR4ZWxlcyBjb3JyZWN0YW1lbnRlXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIEVycm9yIHJlcGFyYW5kbyBwXHUwMEVEeGVsZXM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFNpbiBjYXJnYXMgc3VmaWNpZW50ZXMgcGFyYSByZXBhcmFyIGNhbWJpb3NcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFZlcmlmaWNhbmRvIGNhbWJpb3MgZW4gXHUwMEUxcmVhIHByb3RlZ2lkYS4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIEVycm9yIHZlcmlmaWNhbmRvIGNhbWJpb3M6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR3VhcmRpXHUwMEUxbiBhY3Rpdm8gLSBcdTAwRTFyZWEgYmFqbyBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBsYXN0Q2hlY2s6IFwiXHUwMERBbHRpbWEgdmVyaWZpY2FjaVx1MDBGM246IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJQclx1MDBGM3hpbWEgdmVyaWZpY2FjaVx1MDBGM24gZW46IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbmljaWFsaXphbmRvIGF1dG9tXHUwMEUxdGljYW1lbnRlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgaW5pY2lhZG8gYXV0b21cdTAwRTF0aWNhbWVudGVcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgTm8gc2UgcHVkbyBpbmljaWFyIGF1dG9tXHUwMEUxdGljYW1lbnRlLiBVc2EgZWwgYm90XHUwMEYzbiBtYW51YWwuXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbmljaW8gbWFudWFsIHJlcXVlcmlkb1wiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXRhIGRlIGNvbG9yZXMgZGV0ZWN0YWRhXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBCdXNjYW5kbyBwYWxldGEgZGUgY29sb3Jlcy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IEhhY2llbmRvIGNsaWMgZW4gZWwgYm90XHUwMEYzbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkb1wiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgUGludGEgdW4gcFx1MDBFRHhlbCBlbiBsYSBlc3F1aW5hIFNVUEVSSU9SIElaUVVJRVJEQSBkZWwgXHUwMEUxcmVhIGEgcHJvdGVnZXJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBBaG9yYSBwaW50YSB1biBwXHUwMEVEeGVsIGVuIGxhIGVzcXVpbmEgSU5GRVJJT1IgREVSRUNIQSBkZWwgXHUwMEUxcmVhXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgRXNwZXJhbmRvIHNlbGVjY2lcdTAwRjNuIGRlIGVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBzZWxlY2NpXHUwMEYzbiBkZSBlc3F1aW5hIGluZmVyaW9yIGRlcmVjaGEuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgRXNxdWluYSBzdXBlcmlvciBpenF1aWVyZGEgY2FwdHVyYWRhOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBFc3F1aW5hIGluZmVyaW9yIGRlcmVjaGEgY2FwdHVyYWRhOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2NpXHUwMEYzblwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJvciBlbiBzZWxlY2NpXHUwMEYzbiwgaW50XHUwMEU5bnRhbG8gZGUgbnVldm9cIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCBlbiA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU2VsZWN0aW9uJyxcbiAgICB1c2VyOiAnVXNlcicsXG4gICAgY2hhcmdlczogJ0NoYXJnZXMnLFxuICAgIGJhY2tlbmQ6ICdCYWNrZW5kJyxcbiAgICBkYXRhYmFzZTogJ0RhdGFiYXNlJyxcbiAgICB1cHRpbWU6ICdVcHRpbWUnLFxuICAgIGNsb3NlOiAnQ2xvc2UnLFxuICAgIGxhdW5jaDogJ0xhdW5jaCcsXG4gICAgbG9hZGluZzogJ0xvYWRpbmdcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0V4ZWN1dGluZ1x1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdEb3dubG9hZGluZyBzY3JpcHRcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ0Nob29zZSBhIGJvdCBhbmQgcHJlc3MgTGF1bmNoJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnUmVhZHkgdG8gbGF1bmNoJyxcbiAgICBsb2FkRXJyb3I6ICdMb2FkIGVycm9yJyxcbiAgICBsb2FkRXJyb3JNc2c6ICdDb3VsZCBub3QgbG9hZCB0aGUgc2VsZWN0ZWQgYm90LiBDaGVjayB5b3VyIGNvbm5lY3Rpb24gb3IgdHJ5IGFnYWluLicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgQ2hlY2tpbmcuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBPbmxpbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgT2ZmbGluZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycm9yJyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGl6ZSBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlVwbG9hZCBJbWFnZVwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlJlc2l6ZSBJbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjdCBQb3NpdGlvblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiU3RhcnQgUGFpbnRpbmdcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiU3RvcCBQYWludGluZ1wiLFxuICAgIHNhdmVQcm9ncmVzczogXCJTYXZlIFByb2dyZXNzXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIkxvYWQgUHJvZ3Jlc3NcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgQ2hlY2tpbmcgYXZhaWxhYmxlIGNvbG9ycy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIE9wZW4gdGhlIGNvbG9yIHBhbGV0dGUgb24gdGhlIHNpdGUgYW5kIHRyeSBhZ2FpbiFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgRm91bmQge2NvdW50fSBhdmFpbGFibGUgY29sb3JzXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBMb2FkaW5nIGltYWdlLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IEltYWdlIGxvYWRlZCB3aXRoIHtjb3VudH0gdmFsaWQgcGl4ZWxzXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgRXJyb3IgbG9hZGluZyBpbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiUGFpbnQgdGhlIGZpcnN0IHBpeGVsIGF0IHRoZSBsb2NhdGlvbiB3aGVyZSB5b3Ugd2FudCB0aGUgYXJ0IHRvIHN0YXJ0IVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgeW91IHRvIHBhaW50IHRoZSByZWZlcmVuY2UgcGl4ZWwuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgUG9zaXRpb24gc2V0IHN1Y2Nlc3NmdWxseSFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpbWVvdXQgZm9yIHBvc2l0aW9uIHNlbGVjdGlvblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2l0aW9uIGRldGVjdGVkLCBwcm9jZXNzaW5nLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZGV0ZWN0aW5nIHBvc2l0aW9uLCBwbGVhc2UgdHJ5IGFnYWluXCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggU3RhcnRpbmcgcGFpbnRpbmcuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9ncmVzczoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBObyBjaGFyZ2VzLiBXYWl0aW5nIHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUGFpbnRpbmcgc3RvcHBlZCBieSB1c2VyXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgUGFpbnRpbmcgY29tcGxldGVkISB7Y291bnR9IHBpeGVscyBwYWludGVkLlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIEVycm9yIGR1cmluZyBwYWludGluZ1wiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIExvYWQgYW4gaW1hZ2UgYW5kIHNlbGVjdCBhIHBvc2l0aW9uIGZpcnN0XCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3Jlc3NcIixcbiAgICB1c2VyTmFtZTogXCJVc2VyXCIsXG4gICAgcGl4ZWxzOiBcIlBpeGVsc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiRXN0aW1hdGVkIHRpbWVcIixcbiAgICBpbml0TWVzc2FnZTogXCJDbGljayAnSW5pdGlhbGl6ZSBBdXRvLUJPVCcgdG8gYmVnaW5cIixcbiAgICB3YWl0aW5nSW5pdDogXCJXYWl0aW5nIGZvciBpbml0aWFsaXphdGlvbi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IEltYWdlIHJlc2l6ZWQgdG8ge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQYWludGluZyBwYXVzZWQgYXQgcG9zaXRpb24gWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMgcGVyIGJhdGNoXCIsXG4gICAgYmF0Y2hTaXplOiBcIkJhdGNoIHNpemVcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIk5leHQgYmF0Y2ggaW5cIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlVzZSBhbGwgYXZhaWxhYmxlIGNoYXJnZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJTaG93IG92ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIk1heCBjaGFyZ2VzIHBlciBiYXRjaFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRpbWUgcmVtYWluaW5nXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBXYWl0aW5nIHt0aW1lfSB0byBjb250aW51ZS4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyZXNzIHNhdmVkIGFzIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3Jlc3MgbG9hZGVkOiB7cGFpbnRlZH0ve3RvdGFsfSBwaXhlbHMgcGFpbnRlZFwiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBFcnJvciBsb2FkaW5nIHByb2dyZXNzOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycm9yIHNhdmluZyBwcm9ncmVzczoge2Vycm9yfVwiLFxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiRG8geW91IHdhbnQgdG8gc2F2ZSB0aGUgY3VycmVudCBwcm9ncmVzcyBiZWZvcmUgc3RvcHBpbmc/XCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiU2F2ZSBQcm9ncmVzc1wiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJEaXNjYXJkXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbFwiLFxuICAgIG1pbmltaXplOiBcIk1pbmltaXplXCIsXG4gICAgd2lkdGg6IFwiV2lkdGhcIixcbiAgICBoZWlnaHQ6IFwiSGVpZ2h0XCIsIFxuICAgIGtlZXBBc3BlY3Q6IFwiS2VlcCBhc3BlY3QgcmF0aW9cIixcbiAgICBhcHBseTogXCJBcHBseVwiLFxuICBvdmVybGF5T246IFwiT3ZlcmxheTogT05cIixcbiAgb3ZlcmxheU9mZjogXCJPdmVybGF5OiBPRkZcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBQYXNzIGNvbXBsZXRlZDoge3BhaW50ZWR9IHBpeGVscyBwYWludGVkIHwgUHJvZ3Jlc3M6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFdhaXRpbmcgZm9yIGNoYXJnZSByZWdlbmVyYXRpb246IHtjdXJyZW50fS97bmVlZGVkfSAtIFRpbWU6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBSZW1haW5pbmc6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEF1dG8taW5pdGlhbGl6aW5nLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBCb3QgYXV0by1zdGFydGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBDb3VsZCBub3QgYXV0by1zdGFydC4gVXNlIG1hbnVhbCBidXR0b24uXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBDb2xvciBwYWxldHRlIGRldGVjdGVkXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBTZWFyY2hpbmcgZm9yIGNvbG9yIHBhbGV0dGUuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGlja2luZyBQYWludCBidXR0b24uLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBQYWludCBidXR0b24gbm90IGZvdW5kXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBNYW51YWwgaW5pdGlhbGl6YXRpb24gcmVxdWlyZWRcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFJldHJ5IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGluIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgRXJyb3IgaW4gYXR0ZW1wdCB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgcmV0cnlpbmcgaW4ge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgRmFpbGVkIGFmdGVyIHttYXhBdHRlbXB0c30gYXR0ZW1wdHMuIENvbnRpbnVpbmcgd2l0aCBuZXh0IGJhdGNoLi4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBOZXR3b3JrIGVycm9yLiBSZXRyeWluZy4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBTZXJ2ZXIgZXJyb3IuIFJldHJ5aW5nLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBTZXJ2ZXIgdGltZW91dC4gUmV0cnlpbmcuLi5cIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBGYXJtIEJvdFwiLFxuICAgIHN0YXJ0OiBcIlN0YXJ0XCIsXG4gICAgc3RvcDogXCJTdG9wXCIsXG4gICAgc3RvcHBlZDogXCJCb3Qgc3RvcHBlZFwiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJhdGVcIixcbiAgICBwYWludE9uY2U6IFwiT25jZVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIkNoZWNraW5nIHN0YXR1cy4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiQ29uZmlndXJhdGlvblwiLFxuICAgIGRlbGF5OiBcIkRlbGF5IChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMvYmF0Y2hcIixcbiAgICBtaW5DaGFyZ2VzOiBcIk1pbiBjaGFyZ2VzXCIsXG4gICAgY29sb3JNb2RlOiBcIkNvbG9yIG1vZGVcIixcbiAgICByYW5kb206IFwiUmFuZG9tXCIsXG4gICAgZml4ZWQ6IFwiRml4ZWRcIixcbiAgICByYW5nZTogXCJSYW5nZVwiLFxuICAgIGZpeGVkQ29sb3I6IFwiRml4ZWQgY29sb3JcIixcbiAgICBhZHZhbmNlZDogXCJBZHZhbmNlZFwiLFxuICAgIHRpbGVYOiBcIlRpbGUgWFwiLFxuICAgIHRpbGVZOiBcIlRpbGUgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiQ3VzdG9tIHBhbGV0dGVcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJlLmc6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJlXCIsXG4gICAgcGFpbnRlZDogXCJQYWludGVkXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgcmV0cmllczogXCJSZXRyaWVzXCIsXG4gICAgdGlsZTogXCJUaWxlXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiQ29uZmlndXJhdGlvbiBzYXZlZFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmF0aW9uIGxvYWRlZFwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYXRpb24gcmVzZXRcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBhaW50IGEgcGl4ZWwgbWFudWFsbHkgdG8gY2FwdHVyZSBjb29yZGluYXRlcy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiQmFja2VuZCBPbmxpbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIE9mZmxpbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJTdGFydGluZyBib3QuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJTdG9wcGluZyBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhdGluZy4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSBpcyBhbHJlYWR5IHJ1bm5pbmcuXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGlzIHJ1bm5pbmcuIENsb3NlIGl0IGJlZm9yZSBzdGFydGluZyBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWN0IEFyZWFcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBQYWludCBhIHBpeGVsIGluIGFuIEVNUFRZIGFyZWEgb2YgdGhlIG1hcCB0byBzZXQgdGhlIGZhcm1pbmcgem9uZVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgeW91IHRvIHBhaW50IHRoZSByZWZlcmVuY2UgcGl4ZWwuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgQXJlYSBzZXQhIFJhZGl1czogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpbWVvdXQgZm9yIGFyZWEgc2VsZWN0aW9uXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTZWxlY3QgYW4gYXJlYSBmaXJzdCB1c2luZyAnU2VsZWN0IEFyZWEnXCIsXG4gICAgZmFybVJhZGl1czogXCJGYXJtIHJhZGl1c1wiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJDdXJyZW50IGFyZWFcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIEZhcm1pbmcgaW4ge3JhZGl1c31weCByYWRpdXMgZnJvbSAoe3h9LHt5fSlcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIElNUE9SVEFOVDogU2VsZWN0IGFuIEVNUFRZIGFyZWEgdG8gYXZvaWQgY29uZmxpY3RzXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJObyBhcmVhXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uZTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTZWxlY3QgYW4gYXJlYSBmaXJzdC4gUGFpbnQgYSBwaXhlbCBvbiB0aGUgbWFwIHRvIHNldCB0aGUgZmFybWluZyB6b25lXCJcbiAgfSxcblxuICAvLyBDb21tb24vU2hhcmVkXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJZZXNcIixcbiAgICBubzogXCJOb1wiLFxuICAgIG9rOiBcIk9LXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbFwiLFxuICAgIGNsb3NlOiBcIkNsb3NlXCIsXG4gICAgc2F2ZTogXCJTYXZlXCIsXG4gICAgbG9hZDogXCJMb2FkXCIsXG4gICAgZGVsZXRlOiBcIkRlbGV0ZVwiLFxuICAgIGVkaXQ6IFwiRWRpdFwiLFxuICAgIHN0YXJ0OiBcIlN0YXJ0XCIsXG4gICAgc3RvcDogXCJTdG9wXCIsXG4gICAgcGF1c2U6IFwiUGF1c2VcIixcbiAgICByZXN1bWU6IFwiUmVzdW1lXCIsXG4gICAgcmVzZXQ6IFwiUmVzZXRcIixcbiAgICBzZXR0aW5nczogXCJTZXR0aW5nc1wiLFxuICAgIGhlbHA6IFwiSGVscFwiLFxuICAgIGFib3V0OiBcIkFib3V0XCIsXG4gICAgbGFuZ3VhZ2U6IFwiTGFuZ3VhZ2VcIixcbiAgICBsb2FkaW5nOiBcIkxvYWRpbmcuLi5cIixcbiAgICBlcnJvcjogXCJFcnJvclwiLFxuICAgIHN1Y2Nlc3M6IFwiU3VjY2Vzc1wiLFxuICAgIHdhcm5pbmc6IFwiV2FybmluZ1wiLFxuICAgIGluZm86IFwiSW5mb3JtYXRpb25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiTGFuZ3VhZ2UgY2hhbmdlZCB0byB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGl6ZSBHdWFyZC1CT1RcIixcbiAgICBzZWxlY3RBcmVhOiBcIlNlbGVjdCBBcmVhXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyZSBBcmVhXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIlN0YXJ0IFByb3RlY3Rpb25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJTdG9wIFByb3RlY3Rpb25cIixcbiAgICB1cHBlckxlZnQ6IFwiVXBwZXIgTGVmdCBDb3JuZXJcIixcbiAgICBsb3dlclJpZ2h0OiBcIkxvd2VyIFJpZ2h0IENvcm5lclwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQcm90ZWN0ZWQgUGl4ZWxzXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkRldGVjdGVkIENoYW5nZXNcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJSZXBhaXJlZCBQaXhlbHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICB3YWl0aW5nSW5pdDogXCJXYWl0aW5nIGZvciBpbml0aWFsaXphdGlvbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBDaGVja2luZyBhdmFpbGFibGUgY29sb3JzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgTm8gY29sb3JzIGZvdW5kLiBPcGVuIHRoZSBjb2xvciBwYWxldHRlIG9uIHRoZSBzaXRlLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBGb3VuZCB7Y291bnR9IGF2YWlsYWJsZSBjb2xvcnNcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgRXJyb3IgaW5pdGlhbGl6aW5nIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIEludmFsaWQgY29vcmRpbmF0ZXNcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgQXJlYSBtdXN0IGhhdmUgdXBwZXIgbGVmdCBjb3JuZXIgbGVzcyB0aGFuIGxvd2VyIHJpZ2h0IGNvcm5lclwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgQXJlYSB0b28gbGFyZ2U6IHtzaXplfSBwaXhlbHMgKG1heGltdW06IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmluZyBwcm90ZWN0aW9uIGFyZWEuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IEFyZWEgY2FwdHVyZWQ6IHtjb3VudH0gcGl4ZWxzIHVuZGVyIHByb3RlY3Rpb25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGNhcHR1cmluZyBhcmVhOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBGaXJzdCBjYXB0dXJlIGEgcHJvdGVjdGlvbiBhcmVhXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY3Rpb24gc3RhcnRlZCAtIG1vbml0b3JpbmcgYXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWN0aW9uIHN0b3BwZWRcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFByb3RlY3RlZCBhcmVhIC0gbm8gY2hhbmdlcyBkZXRlY3RlZFwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBjaGFuZ2VzIGRldGVjdGVkIGluIHByb3RlY3RlZCBhcmVhXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSZXBhaXJpbmcge2NvdW50fSBhbHRlcmVkIHBpeGVscy4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgU3VjY2Vzc2Z1bGx5IHJlcGFpcmVkIHtjb3VudH0gcGl4ZWxzXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIEVycm9yIHJlcGFpcmluZyBwaXhlbHM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIEluc3VmZmljaWVudCBjaGFyZ2VzIHRvIHJlcGFpciBjaGFuZ2VzXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBDaGVja2luZyBjaGFuZ2VzIGluIHByb3RlY3RlZCBhcmVhLi4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgRXJyb3IgY2hlY2tpbmcgY2hhbmdlczoge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBHdWFyZGlhbiBhY3RpdmUgLSBhcmVhIHVuZGVyIHByb3RlY3Rpb25cIixcbiAgICBsYXN0Q2hlY2s6IFwiTGFzdCBjaGVjazoge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIk5leHQgY2hlY2sgaW46IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBBdXRvLWluaXRpYWxpemluZy4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGF1dG8tc3RhcnRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgQ291bGQgbm90IGF1dG8tc3RhcnQuIFVzZSBtYW51YWwgYnV0dG9uLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgTWFudWFsIGluaXRpYWxpemF0aW9uIHJlcXVpcmVkXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBDb2xvciBwYWxldHRlIGRldGVjdGVkXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBTZWFyY2hpbmcgZm9yIGNvbG9yIHBhbGV0dGUuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGlja2luZyBQYWludCBidXR0b24uLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBQYWludCBidXR0b24gbm90IGZvdW5kXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBQYWludCBhIHBpeGVsIGF0IHRoZSBVUFBFUiBMRUZUIGNvcm5lciBvZiB0aGUgYXJlYSB0byBwcm90ZWN0XCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgTm93IHBhaW50IGEgcGl4ZWwgYXQgdGhlIExPV0VSIFJJR0hUIGNvcm5lciBvZiB0aGUgYXJlYVwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHVwcGVyIGxlZnQgY29ybmVyIHNlbGVjdGlvbi4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBXYWl0aW5nIGZvciBsb3dlciByaWdodCBjb3JuZXIgc2VsZWN0aW9uLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFVwcGVyIGxlZnQgY29ybmVyIGNhcHR1cmVkOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBMb3dlciByaWdodCBjb3JuZXIgY2FwdHVyZWQ6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBTZWxlY3Rpb24gdGltZW91dFwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBTZWxlY3Rpb24gZXJyb3IsIHBsZWFzZSB0cnkgYWdhaW5cIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCBmciA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU1x1MDBFOWxlY3Rpb24nLFxuICAgIHVzZXI6ICdVdGlsaXNhdGV1cicsXG4gICAgY2hhcmdlczogJ0NoYXJnZXMnLFxuICAgIGJhY2tlbmQ6ICdCYWNrZW5kJyxcbiAgICBkYXRhYmFzZTogJ0Jhc2UgZGUgZG9ublx1MDBFOWVzJyxcbiAgICB1cHRpbWU6ICdUZW1wcyBhY3RpZicsXG4gICAgY2xvc2U6ICdGZXJtZXInLFxuICAgIGxhdW5jaDogJ0xhbmNlcicsXG4gICAgbG9hZGluZzogJ0NoYXJnZW1lbnRcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0V4XHUwMEU5Y3V0aW9uXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1RcdTAwRTlsXHUwMEU5Y2hhcmdlbWVudCBkdSBzY3JpcHRcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ0Nob2lzaXNzZXogdW4gYm90IGV0IGFwcHV5ZXogc3VyIExhbmNlcicsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1ByXHUwMEVBdCBcdTAwRTAgbGFuY2VyJyxcbiAgICBsb2FkRXJyb3I6ICdFcnJldXIgZGUgY2hhcmdlbWVudCcsXG4gICAgbG9hZEVycm9yTXNnOiAnSW1wb3NzaWJsZSBkZSBjaGFyZ2VyIGxlIGJvdCBzXHUwMEU5bGVjdGlvbm5cdTAwRTkuIFZcdTAwRTlyaWZpZXogdm90cmUgY29ubmV4aW9uIG91IHJcdTAwRTllc3NheWV6LicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgVlx1MDBFOXJpZmljYXRpb24uLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBFbiBsaWduZScsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBIb3JzIGxpZ25lJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBPSycsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgRXJyZXVyJyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGlzZXIgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJUXHUwMEU5bFx1MDBFOWNoYXJnZXIgSW1hZ2VcIixcbiAgICByZXNpemVJbWFnZTogXCJSZWRpbWVuc2lvbm5lciBJbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNcdTAwRTlsZWN0aW9ubmVyIFBvc2l0aW9uXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJDb21tZW5jZXIgUGVpbnR1cmVcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiQXJyXHUwMEVBdGVyIFBlaW50dXJlXCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlNhdXZlZ2FyZGVyIFByb2dyXHUwMEU4c1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJDaGFyZ2VyIFByb2dyXHUwMEU4c1wiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBWXHUwMEU5cmlmaWNhdGlvbiBkZXMgY291bGV1cnMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBPdXZyZXogbGEgcGFsZXR0ZSBkZSBjb3VsZXVycyBzdXIgbGUgc2l0ZSBldCByXHUwMEU5ZXNzYXlleiFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb3VsZXVycyBkaXNwb25pYmxlcyB0cm91dlx1MDBFOWVzXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBDaGFyZ2VtZW50IGRlIGwnaW1hZ2UuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgSW1hZ2UgY2hhcmdcdTAwRTllIGF2ZWMge2NvdW50fSBwaXhlbHMgdmFsaWRlc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGUgbCdpbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiUGVpZ25leiBsZSBwcmVtaWVyIHBpeGVsIFx1MDBFMCBsJ2VtcGxhY2VtZW50IG9cdTAwRjkgdm91cyB2b3VsZXogcXVlIGwnYXJ0IGNvbW1lbmNlIVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBxdWUgdm91cyBwZWlnbmlleiBsZSBwaXhlbCBkZSByXHUwMEU5Zlx1MDBFOXJlbmNlLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFBvc2l0aW9uIGRcdTAwRTlmaW5pZSBhdmVjIHN1Y2NcdTAwRThzIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkXHUwMEU5cGFzc1x1MDBFOSBwb3VyIGxhIHNcdTAwRTlsZWN0aW9uIGRlIHBvc2l0aW9uXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgUG9zaXRpb24gZFx1MDBFOXRlY3RcdTAwRTllLCB0cmFpdGVtZW50Li4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyZXVyIGRcdTAwRTl0ZWN0YW50IGxhIHBvc2l0aW9uLCBlc3NheWV6IFx1MDBFMCBub3V2ZWF1XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggRFx1MDBFOWJ1dCBkZSBsYSBwZWludHVyZS4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFByb2dyXHUwMEU4czoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBBdWN1bmUgY2hhcmdlLiBBdHRlbmRyZSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFBlaW50dXJlIGFyclx1MDBFQXRcdTAwRTllIHBhciBsJ3V0aWxpc2F0ZXVyXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgUGVpbnR1cmUgdGVybWluXHUwMEU5ZSEge2NvdW50fSBwaXhlbHMgcGVpbnRzLlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBwZW5kYW50IGxhIHBlaW50dXJlXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgQ2hhcmdleiB1bmUgaW1hZ2UgZXQgc1x1MDBFOWxlY3Rpb25uZXogdW5lIHBvc2l0aW9uIGQnYWJvcmRcIixcbiAgICBwcm9ncmVzczogXCJQcm9nclx1MDBFOHNcIixcbiAgICB1c2VyTmFtZTogXCJVc2FnZXJcIixcbiAgICBwaXhlbHM6IFwiUGl4ZWxzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJUZW1wcyBlc3RpbVx1MDBFOVwiLFxuICAgIGluaXRNZXNzYWdlOiBcIkNsaXF1ZXogc3VyICdJbml0aWFsaXNlciBBdXRvLUJPVCcgcG91ciBjb21tZW5jZXJcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFbiBhdHRlbnRlIGQnaW5pdGlhbGlzYXRpb24uLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBJbWFnZSByZWRpbWVuc2lvbm5cdTAwRTllIFx1MDBFMCB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFBlaW50dXJlIG1pc2UgZW4gcGF1c2UgXHUwMEUwIGxhIHBvc2l0aW9uIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzIHBhciBsb3RcIixcbiAgICBiYXRjaFNpemU6IFwiVGFpbGxlIGR1IGxvdFwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiUHJvY2hhaW4gbG90IGRhbnNcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlV0aWxpc2VyIHRvdXRlcyBsZXMgY2hhcmdlcyBkaXNwb25pYmxlc1wiLFxuICAgIHNob3dPdmVybGF5OiBcIkFmZmljaGVyIGwnb3ZlcmxheVwiLFxuICAgIG1heENoYXJnZXM6IFwiQ2hhcmdlcyBtYXggcGFyIGxvdFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBFbiBhdHRlbnRlIGRlIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiVGVtcHMgcmVzdGFudFwiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgQXR0ZW5kcmUge3RpbWV9IHBvdXIgY29udGludWVyLi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgUHJvZ3JcdTAwRThzIHNhdXZlZ2FyZFx1MDBFOSBzb3VzIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3JcdTAwRThzIGNoYXJnXHUwMEU5OiB7cGFpbnRlZH0ve3RvdGFsfSBwaXhlbHMgcGVpbnRzXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZHUgcHJvZ3JcdTAwRThzOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUgZHUgcHJvZ3JcdTAwRThzOiB7ZXJyb3J9XCIsXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJWb3VsZXotdm91cyBzYXV2ZWdhcmRlciBsZSBwcm9nclx1MDBFOHMgYWN0dWVsIGF2YW50IGQnYXJyXHUwMEVBdGVyP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlNhdXZlZ2FyZGVyIFByb2dyXHUwMEU4c1wiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJBYmFuZG9ubmVyXCIsXG4gICAgY2FuY2VsOiBcIkFubnVsZXJcIixcbiAgICBtaW5pbWl6ZTogXCJNaW5pbWlzZXJcIixcbiAgICB3aWR0aDogXCJMYXJnZXVyXCIsXG4gICAgaGVpZ2h0OiBcIkhhdXRldXJcIiwgXG4gICAga2VlcEFzcGVjdDogXCJHYXJkZXIgbGVzIHByb3BvcnRpb25zXCIsXG4gICAgYXBwbHk6IFwiQXBwbGlxdWVyXCIsXG4gIG92ZXJsYXlPbjogXCJPdmVybGF5IDogT05cIixcbiAgb3ZlcmxheU9mZjogXCJPdmVybGF5IDogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzc2FnZSB0ZXJtaW5cdTAwRTk6IHtwYWludGVkfSBwaXhlbHMgcGVpbnRzIHwgUHJvZ3JcdTAwRThzOiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBBdHRlbnRlIGRlIHJcdTAwRTlnXHUwMEU5blx1MDBFOXJhdGlvbiBkZXMgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gVGVtcHM6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBBdHRlbnRlIGRlcyBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBSZXN0YW50OiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbml0aWFsaXNhdGlvbiBhdXRvbWF0aXF1ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGRcdTAwRTltYXJyXHUwMEU5IGF1dG9tYXRpcXVlbWVudFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBJbXBvc3NpYmxlIGRlIGRcdTAwRTltYXJyZXIgYXV0b21hdGlxdWVtZW50LiBVdGlsaXNleiBsZSBib3V0b24gbWFudWVsLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXR0ZSBkZSBjb3VsZXVycyBkXHUwMEU5dGVjdFx1MDBFOWVcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFJlY2hlcmNoZSBkZSBsYSBwYWxldHRlIGRlIGNvdWxldXJzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpYyBzdXIgbGUgYm91dG9uIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm91dG9uIFBhaW50IGludHJvdXZhYmxlXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbml0aWFsaXNhdGlvbiBtYW51ZWxsZSByZXF1aXNlXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBUZW50YXRpdmUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gZGFucyB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycmV1ciBkYW5zIHRlbnRhdGl2ZSB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgbm91dmVsIGVzc2FpIGRhbnMge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHUwMEM5Y2hlYyBhcHJcdTAwRThzIHttYXhBdHRlbXB0c30gdGVudGF0aXZlcy4gQ29udGludWFudCBhdmVjIGxlIGxvdCBzdWl2YW50Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBFcnJldXIgclx1MDBFOXNlYXUuIE5vdXZlbCBlc3NhaS4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBFcnJldXIgc2VydmV1ci4gTm91dmVsIGVzc2FpLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBUaW1lb3V0IHNlcnZldXIuIE5vdXZlbCBlc3NhaS4uLlwiXG4gIH0sXG5cbiAgLy8gRmFybSBNb2R1bGUgKHRvIGJlIGltcGxlbWVudGVkKVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEZhcm0gQm90XCIsXG4gICAgc3RhcnQ6IFwiRFx1MDBFOW1hcnJlclwiLFxuICAgIHN0b3A6IFwiQXJyXHUwMEVBdGVyXCIsXG4gICAgc3RvcHBlZDogXCJCb3QgYXJyXHUwMEVBdFx1MDBFOVwiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJlclwiLFxuICAgIHBhaW50T25jZTogXCJVbmUgZm9pc1wiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlZcdTAwRTlyaWZpY2F0aW9uIGR1IHN0YXR1dC4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiQ29uZmlndXJhdGlvblwiLFxuICAgIGRlbGF5OiBcIkRcdTAwRTlsYWkgKG1zKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBpeGVscy9sb3RcIixcbiAgICBtaW5DaGFyZ2VzOiBcIkNoYXJnZXMgbWluXCIsXG4gICAgY29sb3JNb2RlOiBcIk1vZGUgY291bGV1clwiLFxuICAgIHJhbmRvbTogXCJBbFx1MDBFOWF0b2lyZVwiLFxuICAgIGZpeGVkOiBcIkZpeGVcIixcbiAgICByYW5nZTogXCJQbGFnZVwiLFxuICAgIGZpeGVkQ29sb3I6IFwiQ291bGV1ciBmaXhlXCIsXG4gICAgYWR2YW5jZWQ6IFwiQXZhbmNcdTAwRTlcIixcbiAgICB0aWxlWDogXCJUdWlsZSBYXCIsXG4gICAgdGlsZVk6IFwiVHVpbGUgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiUGFsZXR0ZSBwZXJzb25uYWxpc1x1MDBFOWVcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJleDogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIkNhcHR1cmVyXCIsXG4gICAgcGFpbnRlZDogXCJQZWludHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICByZXRyaWVzOiBcIlx1MDBDOWNoZWNzXCIsXG4gICAgdGlsZTogXCJUdWlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYXRpb24gc2F1dmVnYXJkXHUwMEU5ZVwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmF0aW9uIGNoYXJnXHUwMEU5ZVwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYXRpb24gclx1MDBFOWluaXRpYWxpc1x1MDBFOWVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBlaW5kcmUgdW4gcGl4ZWwgbWFudWVsbGVtZW50IHBvdXIgY2FwdHVyZXIgbGVzIGNvb3Jkb25uXHUwMEU5ZXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgRW4gbGlnbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIEhvcnMgbGlnbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJEXHUwMEU5bWFycmFnZSBkdSBib3QuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJBcnJcdTAwRUF0IGR1IGJvdC4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIkNhbGlicmFnZS4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSBlc3QgZFx1MDBFOWpcdTAwRTAgZW4gY291cnMgZCdleFx1MDBFOWN1dGlvbi5cIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIkF1dG8tSW1hZ2UgZXN0IGVuIGNvdXJzIGQnZXhcdTAwRTljdXRpb24uIEZlcm1lei1sZSBhdmFudCBkZSBkXHUwMEU5bWFycmVyIEF1dG8tRmFybS5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTXHUwMEU5bGVjdGlvbm5lciBab25lXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGVpZ25leiB1biBwaXhlbCBkYW5zIHVuZSB6b25lIFZJREUgZGUgbGEgY2FydGUgcG91ciBkXHUwMEU5ZmluaXIgbGEgem9uZSBkZSBmYXJtaW5nXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIHF1ZSB2b3VzIHBlaWduaWV6IGxlIHBpeGVsIGRlIHJcdTAwRTlmXHUwMEU5cmVuY2UuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgWm9uZSBkXHUwMEU5ZmluaWUhIFJheW9uOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkXHUwMEU5cGFzc1x1MDBFOSBwb3VyIGxhIHNcdTAwRTlsZWN0aW9uIGRlIHpvbmVcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFNcdTAwRTlsZWN0aW9ubmV6IHVuZSB6b25lIGQnYWJvcmQgZW4gdXRpbGlzYW50ICdTXHUwMEU5bGVjdGlvbm5lciBab25lJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiUmF5b24gZmFybVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJab25lIGFjdHVlbGxlXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBGYXJtaW5nIGRhbnMgdW4gcmF5b24gZGUge3JhZGl1c31weCBkZXB1aXMgKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBJTVBPUlRBTlQ6IFNcdTAwRTlsZWN0aW9ubmV6IHVuZSB6b25lIFZJREUgcG91ciBcdTAwRTl2aXRlciBsZXMgY29uZmxpdHNcIixcbiAgICBub1Bvc2l0aW9uOiBcIkF1Y3VuZSB6b25lXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uZTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBkJ2Fib3JkLiBQZWlnbmV6IHVuIHBpeGVsIHN1ciBsYSBjYXJ0ZSBwb3VyIGRcdTAwRTlmaW5pciBsYSB6b25lIGRlIGZhcm1pbmdcIlxuICB9LFxuXG4gICAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiT3VpXCIsXG4gICAgbm86IFwiTm9uXCIsXG4gICAgb2s6IFwiT0tcIixcbiAgICBjYW5jZWw6IFwiQW5udWxlclwiLFxuICAgIGNsb3NlOiBcIkZlcm1lclwiLFxuICAgIHNhdmU6IFwiU2F1dmVnYXJkZXJcIixcbiAgICBsb2FkOiBcIkNoYXJnZXJcIixcbiAgICBkZWxldGU6IFwiU3VwcHJpbWVyXCIsXG4gICAgZWRpdDogXCJNb2RpZmllclwiLFxuICAgIHN0YXJ0OiBcIkRcdTAwRTltYXJyZXJcIixcbiAgICBzdG9wOiBcIkFyclx1MDBFQXRlclwiLFxuICAgIHBhdXNlOiBcIlBhdXNlXCIsXG4gICAgcmVzdW1lOiBcIlJlcHJlbmRyZVwiLFxuICAgIHJlc2V0OiBcIlJcdTAwRTlpbml0aWFsaXNlclwiLFxuICAgIHNldHRpbmdzOiBcIlBhcmFtXHUwMEU4dHJlc1wiLFxuICAgIGhlbHA6IFwiQWlkZVwiLFxuICAgIGFib3V0OiBcIlx1MDBDMCBwcm9wb3NcIixcbiAgICBsYW5ndWFnZTogXCJMYW5ndWVcIixcbiAgICBsb2FkaW5nOiBcIkNoYXJnZW1lbnQuLi5cIixcbiAgICBlcnJvcjogXCJFcnJldXJcIixcbiAgICBzdWNjZXNzOiBcIlN1Y2NcdTAwRThzXCIsXG4gICAgd2FybmluZzogXCJBdmVydGlzc2VtZW50XCIsXG4gICAgaW5mbzogXCJJbmZvcm1hdGlvblwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJMYW5ndWUgY2hhbmdcdTAwRTllIGVuIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIEd1YXJkIE1vZHVsZVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBBdXRvLUd1YXJkXCIsXG4gICAgaW5pdEJvdDogXCJJbml0aWFsaXNlciBHdWFyZC1CT1RcIixcbiAgICBzZWxlY3RBcmVhOiBcIlNcdTAwRTlsZWN0aW9ubmVyIFpvbmVcIixcbiAgICBjYXB0dXJlQXJlYTogXCJDYXB0dXJlciBab25lXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIkRcdTAwRTltYXJyZXIgUHJvdGVjdGlvblwiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIkFyclx1MDBFQXRlciBQcm90ZWN0aW9uXCIsXG4gICAgdXBwZXJMZWZ0OiBcIkNvaW4gU3VwXHUwMEU5cmlldXIgR2F1Y2hlXCIsXG4gICAgbG93ZXJSaWdodDogXCJDb2luIEluZlx1MDBFOXJpZXVyIERyb2l0XCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlBpeGVscyBQcm90XHUwMEU5Z1x1MDBFOXNcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiQ2hhbmdlbWVudHMgRFx1MDBFOXRlY3RcdTAwRTlzXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiUGl4ZWxzIFJcdTAwRTlwYXJcdTAwRTlzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiRW4gYXR0ZW50ZSBkJ2luaXRpYWxpc2F0aW9uLi4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFZcdTAwRTlyaWZpY2F0aW9uIGRlcyBjb3VsZXVycyBkaXNwb25pYmxlcy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIEF1Y3VuZSBjb3VsZXVyIHRyb3V2XHUwMEU5ZS4gT3V2cmV6IGxhIHBhbGV0dGUgZGUgY291bGV1cnMgc3VyIGxlIHNpdGUuXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IHtjb3VudH0gY291bGV1cnMgZGlzcG9uaWJsZXMgdHJvdXZcdTAwRTllc1wiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgaW5pdGlhbGlzXHUwMEU5IGF2ZWMgc3VjY1x1MDBFOHNcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGwnaW5pdGlhbGlzYXRpb24gZGUgR3VhcmQtQk9UXCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgQ29vcmRvbm5cdTAwRTllcyBpbnZhbGlkZXNcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgTGEgem9uZSBkb2l0IGF2b2lyIGxlIGNvaW4gc3VwXHUwMEU5cmlldXIgZ2F1Y2hlIGluZlx1MDBFOXJpZXVyIGF1IGNvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXRcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFpvbmUgdHJvcCBncmFuZGU6IHtzaXplfSBwaXhlbHMgKG1heGltdW06IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmUgZGUgbGEgem9uZSBkZSBwcm90ZWN0aW9uLi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBab25lIGNhcHR1clx1MDBFOWU6IHtjb3VudH0gcGl4ZWxzIHNvdXMgcHJvdGVjdGlvblwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgY2FwdHVyZSBkZSB6b25lOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBDYXB0dXJleiBkJ2Fib3JkIHVuZSB6b25lIGRlIHByb3RlY3Rpb25cIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjdGlvbiBkXHUwMEU5bWFyclx1MDBFOWUgLSBzdXJ2ZWlsbGFuY2UgZGUgbGEgem9uZVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWN0aW9uIGFyclx1MDBFQXRcdTAwRTllXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBab25lIHByb3RcdTAwRTlnXHUwMEU5ZSAtIGF1Y3VuIGNoYW5nZW1lbnQgZFx1MDBFOXRlY3RcdTAwRTlcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2hhbmdlbWVudHMgZFx1MDBFOXRlY3RcdTAwRTlzIGRhbnMgbGEgem9uZSBwcm90XHUwMEU5Z1x1MDBFOWVcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFJcdTAwRTlwYXJhdGlvbiBkZSB7Y291bnR9IHBpeGVscyBhbHRcdTAwRTlyXHUwMEU5cy4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUge2NvdW50fSBwaXhlbHMgclx1MDBFOXBhclx1MDBFOXMgYXZlYyBzdWNjXHUwMEU4c1wiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSByXHUwMEU5cGFyYXRpb24gZGVzIHBpeGVsczoge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgQ2hhcmdlcyBpbnN1ZmZpc2FudGVzIHBvdXIgclx1MDBFOXBhcmVyIGxlcyBjaGFuZ2VtZW50c1wiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgVlx1MDBFOXJpZmljYXRpb24gZGVzIGNoYW5nZW1lbnRzIGRhbnMgbGEgem9uZSBwcm90XHUwMEU5Z1x1MDBFOWUuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSB2XHUwMEU5cmlmaWNhdGlvbiBkZXMgY2hhbmdlbWVudHM6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR2FyZGllbiBhY3RpZiAtIHpvbmUgc291cyBwcm90ZWN0aW9uXCIsXG4gICAgbGFzdENoZWNrOiBcIkRlcm5pXHUwMEU4cmUgdlx1MDBFOXJpZmljYXRpb246IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJQcm9jaGFpbmUgdlx1MDBFOXJpZmljYXRpb24gZGFuczoge3RpbWV9c1wiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEluaXRpYWxpc2F0aW9uIGF1dG9tYXRpcXVlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgZFx1MDBFOW1hcnJcdTAwRTkgYXV0b21hdGlxdWVtZW50XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIEltcG9zc2libGUgZGUgZFx1MDBFOW1hcnJlciBhdXRvbWF0aXF1ZW1lbnQuIFV0aWxpc2V6IGxlIGJvdXRvbiBtYW51ZWwuXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbml0aWFsaXNhdGlvbiBtYW51ZWxsZSByZXF1aXNlXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBQYWxldHRlIGRlIGNvdWxldXJzIGRcdTAwRTl0ZWN0XHUwMEU5ZVwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgUmVjaGVyY2hlIGRlIGxhIHBhbGV0dGUgZGUgY291bGV1cnMuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGljIHN1ciBsZSBib3V0b24gUGFpbnQuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBCb3V0b24gUGFpbnQgaW50cm91dmFibGVcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFBlaWduZXogdW4gcGl4ZWwgYXUgY29pbiBTVVBcdTAwQzlSSUVVUiBHQVVDSEUgZGUgbGEgem9uZSBcdTAwRTAgcHJvdFx1MDBFOWdlclwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIE1haW50ZW5hbnQgcGVpZ25leiB1biBwaXhlbCBhdSBjb2luIElORlx1MDBDOVJJRVVSIERST0lUIGRlIGxhIHpvbmVcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIGRlIGxhIHNcdTAwRTlsZWN0aW9uIGR1IGNvaW4gc3VwXHUwMEU5cmlldXIgZ2F1Y2hlLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IEVuIGF0dGVudGUgZGUgbGEgc1x1MDBFOWxlY3Rpb24gZHUgY29pbiBpbmZcdTAwRTlyaWV1ciBkcm9pdC4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBDb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZSBjYXB0dXJcdTAwRTk6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IENvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXQgY2FwdHVyXHUwMEU5OiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkZSBzXHUwMEU5bGVjdGlvbiBkXHUwMEU5cGFzc1x1MDBFOVwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJldXIgZGUgc1x1MDBFOWxlY3Rpb24sIHZldWlsbGV6IHJcdTAwRTllc3NheWVyXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgcnUgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQycsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwJyxcbiAgICBzZWxlY3Rpb246ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0M0RcdTA0M0UnLFxuICAgIHVzZXI6ICdcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NEMnLFxuICAgIGNoYXJnZXM6ICdcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYnLFxuICAgIGJhY2tlbmQ6ICdcdTA0MTFcdTA0NERcdTA0M0FcdTA0MzVcdTA0M0RcdTA0MzQnLFxuICAgIGRhdGFiYXNlOiAnXHUwNDExXHUwNDMwXHUwNDM3XHUwNDMwIFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NScsXG4gICAgdXB0aW1lOiAnXHUwNDEyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGIFx1MDQ0MFx1MDQzMFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQ0QicsXG4gICAgY2xvc2U6ICdcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NEMnLFxuICAgIGxhdW5jaDogJ1x1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QycsXG4gICAgbG9hZGluZzogJ1x1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMCcsXG4gICAgZXhlY3V0aW5nOiAnXHUwNDEyXHUwNDRCXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1JyxcbiAgICBkb3dubG9hZGluZzogJ1x1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMCBcdTA0NDFcdTA0M0FcdTA0NDBcdTA0MzhcdTA0M0ZcdTA0NDJcdTA0MzAuLi4nLFxuICAgIGNob29zZUJvdDogJ1x1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0MzAgXHUwNDM4IFx1MDQzRFx1MDQzMFx1MDQzNlx1MDQzQ1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMnLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdcdTA0MTNcdTA0M0VcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0UgXHUwNDNBIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQ0MycsXG4gICAgbG9hZEVycm9yOiAnXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzOCcsXG4gICAgbG9hZEVycm9yTXNnOiAnXHUwNDFEXHUwNDM1XHUwNDMyXHUwNDNFXHUwNDM3XHUwNDNDXHUwNDNFXHUwNDM2XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLiBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NENcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDNFXHUwNDM0XHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzQlx1MDQzOCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDM1XHUwNDQ5XHUwNDM1IFx1MDQ0MFx1MDQzMFx1MDQzNy4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMC4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIFx1MDQxRVx1MDQzRFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRCcsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBcdTA0MUVcdTA0NDRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0QnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIFx1MDQxRVx1MDQxQScsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwJyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIGluaXRCb3Q6IFwiXHUwNDE4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIEF1dG8tQk9UXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzBcdTA0MzdcdTA0M0NcdTA0MzVcdTA0NDAgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzRSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzBcIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDQzIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMiBcdTA0M0RcdTA0MzAgXHUwNDQxXHUwNDMwXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzOCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDMwIVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTA0MURcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IFx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDQxIHtjb3VudH0gXHUwNDM0XHUwNDM1XHUwNDM5XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXHUwNDNEXHUwNDRCXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0Rlx1MDQzQ1x1MDQzOFwiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDQyXHUwNDNFXHUwNDNDIFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzNSwgXHUwNDMzXHUwNDM0XHUwNDM1IFx1MDQzMlx1MDQ0QiBcdTA0NDVcdTA0M0VcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0M0RcdTA0M0VcdTA0M0EgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDM4XHUwNDNEXHUwNDMwXHUwNDNCXHUwNDQxXHUwNDRGIVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEYuLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzAgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDXHUwNDMwXHUwNDQzXHUwNDQyIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0ZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzhcIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBcdTA0MUZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDMwLCBcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzOCwgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQ0OVx1MDQzNSBcdTA0NDBcdTA0MzBcdTA0MzdcIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0M0UgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxOiB7cGFpbnRlZH0gXHUwNDM4XHUwNDM3IHt0b3RhbH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5Li4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBcdTA0MURcdTA0MzVcdTA0NDIgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyLiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTA0MjBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzQ1wiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1MDQyMFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0UhIHtjb3VudH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRS5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0Nlx1MDQzNVx1MDQ0MVx1MDQ0MVx1MDQzNSBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NEZcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBcdTA0MjFcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzggXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzRSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzBcIixcbiAgICBwcm9ncmVzczogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICB1c2VyTmFtZTogXCJcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcIixcbiAgICBwaXhlbHM6IFwiXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM4XCIsXG4gICAgY2hhcmdlczogXCJcdTA0MTdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0NEJcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlx1MDQxRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0MzJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0NEZcIixcbiAgICBpbml0TWVzc2FnZTogXCJcdTA0MURcdTA0MzBcdTA0MzZcdTA0M0NcdTA0MzhcdTA0NDJcdTA0MzUgXHUwMEFCXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIEF1dG8tQk9UXHUwMEJCLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOC4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IFx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDM0XHUwNDNFIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHUwNDIwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0M0RcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDM4IFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzMiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzVcIixcbiAgICBiYXRjaFNpemU6IFwiXHUwNDIwXHUwNDMwXHUwNDM3XHUwNDNDXHUwNDM1XHUwNDQwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzMFwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHUwNDIxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNCBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlx1MDQxOFx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0NDFcdTA0MzUgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHNob3dPdmVybGF5OiBcIlx1MDQxRlx1MDQzRVx1MDQzQVx1MDQzMFx1MDQzN1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0RcdTA0MzBcdTA0M0JcdTA0M0VcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1MDQxQ1x1MDQzMFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQzQ1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0ItXHUwNDMyXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMiBcdTA0MzdcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzI6IHtjdXJyZW50fSBcdTA0MzhcdTA0Mzcge25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlx1MDQxMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOCBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NENcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSB7dGltZX0gXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0QgXHUwNDNBXHUwNDMwXHUwNDNBIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRDoge3BhaW50ZWR9IFx1MDQzOFx1MDQzNyB7dG90YWx9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0VcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzOCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzA6IHtlcnJvcn1cIixcbiAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzA6IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDJcdTA0MzVcdTA0M0FcdTA0NDNcdTA0NDlcdTA0MzhcdTA0MzkgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNCBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0FcdTA0M0VcdTA0Mzk/XCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTA0MURcdTA0MzUgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDRGXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGNhbmNlbDogXCJcdTA0MUVcdTA0NDJcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBtaW5pbWl6ZTogXCJcdTA0MjFcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0RcdTA0NDNcdTA0NDJcdTA0NENcIixcbiAgICB3aWR0aDogXCJcdTA0MjhcdTA0MzhcdTA0NDBcdTA0MzhcdTA0M0RcdTA0MzBcIixcbiAgICBoZWlnaHQ6IFwiXHUwNDEyXHUwNDRCXHUwNDQxXHUwNDNFXHUwNDQyXHUwNDMwXCIsXG4gICAga2VlcEFzcGVjdDogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQxXHUwNDNFXHUwNDNFXHUwNDQyXHUwNDNEXHUwNDNFXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRVx1MDQzRFwiLFxuICAgIGFwcGx5OiBcIlx1MDQxRlx1MDQ0MFx1MDQzOFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQ0Nlx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDhcdTA0MzVcdTA0M0Q6IHtwYWludGVkfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNFIHwgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxOiB7cGVyY2VudH0lICh7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHt0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0MzA6IHtjdXJyZW50fSBcdTA0MzhcdTA0Mzcge25lZWRlZH0gLSBcdTA0MTJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0NEY6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9IC0gXHUwNDIyXHUwNDQwXHUwNDM1XHUwNDMxXHUwNDQzXHUwNDM1XHUwNDQyXHUwNDQxXHUwNDRGOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTA0MTFcdTA0M0VcdTA0NDIgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0MVx1MDQ0RiBcdTA0MzBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzhcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHUwNDFEXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QyBcdTA0MzJcdTA0NEJcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBLiBcdTA0MThcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDQzIFx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0MzAuXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzOSBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0NEIuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MURcdTA0MzBcdTA0MzZcdTA0MzBcdTA0NDJcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDM4IFx1MDBBQlBhaW50XHUwMEJCLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHUwNDFBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDMwIFx1MDBBQlBhaW50XHUwMEJCIFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0RiBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwIHthdHRlbXB0fSBcdTA0MzhcdTA0Mzcge21heEF0dGVtcHRzfSBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzcge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzNSB7YXR0ZW1wdH0gXHUwNDM4XHUwNDM3IHttYXhBdHRlbXB0c30sIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzcge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQ0MVx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQ0RiB7bWF4QXR0ZW1wdHN9IFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzRVx1MDQzQS4gXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMiBcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0NDNcdTA0NEVcdTA0NDlcdTA0MzVcdTA0M0MgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XHUwNDM1Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDM1XHUwNDQyXHUwNDM4LiBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0MzAuIFx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQ1x1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0NDFcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0MzAuIFx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDXCIsXG4gICAgc3RhcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcDogXCJcdTA0MUVcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wcGVkOiBcIlx1MDQxMVx1MDQzRVx1MDQ0MiBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcIixcbiAgICBjYWxpYnJhdGU6IFwiXHUwNDFBXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDMxXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgcGFpbnRPbmNlOiBcIlx1MDQxNVx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzRVx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzRVx1MDQzMlx1MDQzRVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0NDNcdTA0NDFcdTA0MzAuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIlx1MDQxQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGRlbGF5OiBcIlx1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMCAoXHUwNDNDXHUwNDQxKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0MzdcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XCIsXG4gICAgbWluQ2hhcmdlczogXCJcdTA0MUNcdTA0MzhcdTA0M0RcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNCLVx1MDQzMlx1MDQzRVwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTA0MjBcdTA0MzVcdTA0MzZcdTA0MzhcdTA0M0MgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgcmFuZG9tOiBcIlx1MDQyMVx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQzMFx1MDQzOVx1MDQzRFx1MDQ0Qlx1MDQzOVwiLFxuICAgIGZpeGVkOiBcIlx1MDQyNFx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOVwiLFxuICAgIHJhbmdlOiBcIlx1MDQxNFx1MDQzOFx1MDQzMFx1MDQzRlx1MDQzMFx1MDQzN1x1MDQzRVx1MDQzRFwiLFxuICAgIGZpeGVkQ29sb3I6IFwiXHUwNDI0XHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0MlwiLFxuICAgIGFkdmFuY2VkOiBcIlx1MDQyMFx1MDQzMFx1MDQ0MVx1MDQ0OFx1MDQzOFx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNVwiLFxuICAgIHRpbGVYOiBcIlx1MDQxRlx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQzQVx1MDQzMCBYXCIsXG4gICAgdGlsZVk6IFwiXHUwNDFGXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDNBXHUwNDMwIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlx1MDQyMVx1MDQzMlx1MDQzRVx1MDQ0RiBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0MzBcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDA6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTA0MTdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcIixcbiAgICBwYWludGVkOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQzMFx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzRVwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgcmV0cmllczogXCJcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDM4XCIsXG4gICAgdGlsZTogXCJcdTA0MUZcdTA0M0JcdTA0MzhcdTA0NDJcdTA0M0FcdTA0MzBcIixcbiAgICBjb25maWdTYXZlZDogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIlx1MDQxQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBjb25maWdSZXNldDogXCJcdTA0MjFcdTA0MzFcdTA0NDBcdTA0M0VcdTA0NDEgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4XCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzMlx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQ0M1x1MDQ0RSBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDMwIFx1MDQzQVx1MDQzRVx1MDQzRVx1MDQ0MFx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzMFx1MDQ0Mi4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHUwNDExXHUwNDREXHUwNDNBXHUwNDREXHUwNDNEXHUwNDM0IFx1MDQxRVx1MDQzRFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRFwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIlx1MDQxMVx1MDQ0RFx1MDQzQVx1MDQ0RFx1MDQzRFx1MDQzNFwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIlx1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQSBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0MzAuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJcdTA0MUVcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0FcdTA0MzAgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHUwNDFBXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDMxXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQyBcdTA0NDNcdTA0MzZcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRS4gXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzQgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDNFXHUwNDNDIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzAuXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDFGXHUwNDIzXHUwNDIxXHUwNDIyXHUwNDFFXHUwNDE5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0NEIsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0M0VcdTA0MzFcdTA0M0VcdTA0MzdcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0NFx1MDQzMFx1MDQ0MFx1MDQzQ1x1MDQzMC5cIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRGLi4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwISBcdTA0MjBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDE6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTA0MjJcdTA0MzBcdTA0MzlcdTA0M0NcdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDEgXHUwNDNGXHUwNDNFXHUwNDNDXHUwNDNFXHUwNDQ5XHUwNDRDXHUwNDRFIFx1MDBBQlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcdTAwQkJcIixcbiAgICBmYXJtUmFkaXVzOiBcIlx1MDQyMFx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0M1x1MDQ0MSBcdTA0NDRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzBcIixcbiAgICBwb3NpdGlvbkluZm86IFwiXHUwNDIyXHUwNDM1XHUwNDNBXHUwNDQzXHUwNDQ5XHUwNDMwXHUwNDRGIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDIFx1MDQzMiBcdTA0NDBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDFcdTA0MzUge3JhZGl1c31weCBcdTA0M0VcdTA0NDIgKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBcdTA0MTJcdTA0MTBcdTA0MTZcdTA0MURcdTA0MUU6IFx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MUZcdTA0MjNcdTA0MjFcdTA0MjJcdTA0MjNcdTA0MkUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDM4XHUwNDM3XHUwNDMxXHUwNDM1XHUwNDM2XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzQlx1MDQzOFx1MDQzQVx1MDQ0Mlx1MDQzRVx1MDQzMi5cIixcbiAgICBub1Bvc2l0aW9uOiBcIlx1MDQxRFx1MDQzNVx1MDQ0MiBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEM6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHUwNDIxXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMuIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDNEXHUwNDMwIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzNSwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzRVx1MDQzMVx1MDQzRVx1MDQzN1x1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQ0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwLlwiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiXHUwNDE0XHUwNDMwXCIsXG4gICAgbm86IFwiXHUwNDFEXHUwNDM1XHUwNDQyXCIsXG4gICAgb2s6IFwiXHUwNDFFXHUwNDFBXCIsXG4gICAgY2FuY2VsOiBcIlx1MDQxRVx1MDQ0Mlx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGNsb3NlOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHNhdmU6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgbG9hZDogXCJcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBkZWxldGU6IFwiXHUwNDIzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgZWRpdDogXCJcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzdGFydDogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHBhdXNlOiBcIlx1MDQxRlx1MDQ0MFx1MDQzOFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHJlc3VtZTogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICByZXNldDogXCJcdTA0MjFcdTA0MzFcdTA0NDBcdTA0M0VcdTA0NDFcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzZXR0aW5nczogXCJcdTA0MURcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzlcdTA0M0FcdTA0MzhcIixcbiAgICBoZWxwOiBcIlx1MDQxRlx1MDQzRVx1MDQzQ1x1MDQzRVx1MDQ0OVx1MDQ0Q1wiLFxuICAgIGFib3V0OiBcIlx1MDQxOFx1MDQzRFx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGxhbmd1YWdlOiBcIlx1MDQyRlx1MDQzN1x1MDQ0Qlx1MDQzQVwiLFxuICAgIGxvYWRpbmc6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgZXJyb3I6IFwiXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwXCIsXG4gICAgc3VjY2VzczogXCJcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDVcIixcbiAgICB3YXJuaW5nOiBcIlx1MDQxRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQzRlx1MDQ0MFx1MDQzNVx1MDQzNlx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIGluZm86IFwiXHUwNDE4XHUwNDNEXHUwNDQ0XHUwNDNFXHUwNDQwXHUwNDNDXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIlx1MDQyRlx1MDQzN1x1MDQ0Qlx1MDQzQSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0QgXHUwNDNEXHUwNDMwIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIEd1YXJkIE1vZHVsZVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwXCIsXG4gICAgaW5pdEJvdDogXCJcdTA0MThcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDQzXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0M1wiLFxuICAgIHVwcGVyTGVmdDogXCJcdTA0MTJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDFCXHUwNDM1XHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQyM1x1MDQzM1x1MDQzRVx1MDQzQlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHUwNDFEXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQxRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0MjNcdTA0MzNcdTA0M0VcdTA0M0JcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTA0MUVcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiXHUwNDEyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOC4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1MDQyNlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzMCBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDRCLiBcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDQzIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMiBcdTA0M0RcdTA0MzAgXHUwNDQxXHUwNDMwXHUwNDM5XHUwNDQyXHUwNDM1LlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTA0MURcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBcdTA0NDNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4IEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIFx1MDQxRFx1MDQzNVx1MDQzNFx1MDQzNVx1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0VcdTA0NDBcdTA0MzRcdTA0MzhcdTA0M0RcdTA0MzBcdTA0NDJcdTA0NEJcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzRFx1MDQzMCBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzQlx1MDQzNVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0NDNcdTA0MzNcdTA0M0VcdTA0M0IgXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDRDXHUwNDQ4XHUwNDM1IFx1MDQzRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDMwXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQxXHUwNDNCXHUwNDM4XHUwNDQ4XHUwNDNBXHUwNDNFXHUwNDNDIFx1MDQzMVx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQ0OFx1MDQzMFx1MDQ0Rjoge3NpemV9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSAoXHUwNDNDXHUwNDMwXHUwNDNBXHUwNDQxXHUwNDM4XHUwNDNDXHUwNDQzXHUwNDNDOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBcdTA0MTdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDIgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0Qi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzMDoge2NvdW50fSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNGXHUwNDNFXHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQzOVwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0Mzg6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIFx1MDQyMVx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0QlwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDMwIC0gXHUwNDNDXHUwNDNFXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDNEXHUwNDMzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIC0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRFx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0VcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0MzIgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDNFXHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgXHUwNDEyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IHtjb3VudH0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOS4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSB7Y291bnR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOVwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOToge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHUwNDFEXHUwNDM1XHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMiBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOVwiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0MzIgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDNFXHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOC4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5OiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1MDQyMVx1MDQ0Mlx1MDQ0MFx1MDQzMFx1MDQzNiBcdTA0MzBcdTA0M0FcdTA0NDJcdTA0MzhcdTA0MzJcdTA0MzVcdTA0M0QgLSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQzOVwiLFxuICAgIGxhc3RDaGVjazogXCJcdTA0MUZcdTA0M0VcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0M0RcdTA0NEZcdTA0NEYgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiXHUwNDIxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzc6IHt0aW1lfVx1MDQ0MVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzMFx1MDQ0RiBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDlcdTA0MzVcdTA0M0QgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOC4gXHUwNDE4XHUwNDQxXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQ0MyBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDMwLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHUwNDIyXHUwNDQwXHUwNDM1XHUwNDMxXHUwNDQzXHUwNDM1XHUwNDQyXHUwNDQxXHUwNDRGIFx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1MDQyNlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0MzAgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTA0MUZcdTA0M0VcdTA0MzhcdTA0NDFcdTA0M0EgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDM5IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0Qi4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRFx1MDQzMFx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQzNSBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzggXHUwMEFCUGFpbnRcdTAwQkIuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTA0MUFcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzAgXHUwMEFCUGFpbnRcdTAwQkIgXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDEyXHUwNDE1XHUwNDIwXHUwNDI1XHUwNDFEXHUwNDE1XHUwNDFDIFx1MDQxQlx1MDQxNVx1MDQxMlx1MDQxRVx1MDQxQyBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0NDMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBcdTA0MjJcdTA0MzVcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDFEXHUwNDE4XHUwNDE2XHUwNDFEXHUwNDE1XHUwNDFDIFx1MDQxRlx1MDQyMFx1MDQxMFx1MDQxMlx1MDQxRVx1MDQxQyBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0NDMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNCXHUwNDM1XHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMC4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDMwLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0JcdTA0MzVcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRDogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgXHUwNDFEXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0NDNcdTA0MzNcdTA0M0VcdTA0M0IgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDNEOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDLVx1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzBcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCwgXHUwNDNGXHUwNDNFXHUwNDM2XHUwNDMwXHUwNDNCXHUwNDQzXHUwNDM5XHUwNDQxXHUwNDQyXHUwNDMwLCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDMwXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgemhIYW5zID0ge1xuICAvLyBcdTU0MkZcdTUyQThcdTU2NjhcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBcdTgxRUFcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkEnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIFx1ODFFQVx1NTJBOFx1NTE5Q1x1NTczQScsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IFx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIFx1ODFFQVx1NTJBOFx1NUI4OFx1NjJBNCcsXG4gICAgc2VsZWN0aW9uOiAnXHU5MDA5XHU2MkU5JyxcbiAgICB1c2VyOiAnXHU3NTI4XHU2MjM3JyxcbiAgICBjaGFyZ2VzOiAnXHU2QjIxXHU2NTcwJyxcbiAgICBiYWNrZW5kOiAnXHU1NDBFXHU3QUVGJyxcbiAgICBkYXRhYmFzZTogJ1x1NjU3MFx1NjM2RVx1NUU5MycsXG4gICAgdXB0aW1lOiAnXHU4RkQwXHU4ODRDXHU2NUY2XHU5NUY0JyxcbiAgICBjbG9zZTogJ1x1NTE3M1x1OTVFRCcsXG4gICAgbGF1bmNoOiAnXHU1NDJGXHU1MkE4JyxcbiAgICBsb2FkaW5nOiAnXHU1MkEwXHU4RjdEXHU0RTJEXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnXHU2QjYzXHU1NzI4XHU0RTBCXHU4RjdEXHU4MTFBXHU2NzJDXHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdcdTkwMDlcdTYyRTlcdTRFMDBcdTRFMkFcdTY3M0FcdTU2NjhcdTRFQkFcdTVFNzZcdTcwQjlcdTUxRkJcdTU0MkZcdTUyQTgnLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdcdTUxQzZcdTU5MDdcdTU0MkZcdTUyQTgnLFxuICAgIGxvYWRFcnJvcjogJ1x1NTJBMFx1OEY3RFx1OTUxOVx1OEJFRicsXG4gICAgbG9hZEVycm9yTXNnOiAnXHU2NUUwXHU2Q0Q1XHU1MkEwXHU4RjdEXHU2MjQwXHU5MDA5XHU2NzNBXHU1NjY4XHU0RUJBXHUzMDAyXHU4QkY3XHU2OEMwXHU2N0U1XHU3RjUxXHU3RURDXHU4RkRFXHU2M0E1XHU2MjE2XHU5MUNEXHU4QkQ1XHUzMDAyJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBcdTY4QzBcdTY3RTVcdTRFMkQuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBcdTU3MjhcdTdFQkYnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgXHU3OUJCXHU3RUJGJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBcdTZCNjNcdTVFMzgnLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IFx1OTUxOVx1OEJFRicsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gXHU3RUQ4XHU1NkZFXHU2QTIxXHU1NzU3XG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRVwiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiXHU0RTBBXHU0RjIwXHU1NkZFXHU3MjQ3XCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiXHU4QzAzXHU2NTc0XHU1NkZFXHU3MjQ3XHU1OTI3XHU1QzBGXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHU5MDA5XHU2MkU5XHU0RjREXHU3RjZFXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJcdTVGMDBcdTU5Q0JcdTdFRDhcdTUyMzZcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiXHU1MDVDXHU2QjYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlwiLFxuICAgIGxvYWRQcm9ncmVzczogXCJcdTUyQTBcdThGN0RcdThGREJcdTVFQTZcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgXHU2OEMwXHU2N0U1XHU1M0VGXHU3NTI4XHU5ODlDXHU4MjcyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHU4QkY3XHU1NzI4XHU3RjUxXHU3QUQ5XHU0RTBBXHU2MjUzXHU1RjAwXHU4QzAzXHU4MjcyXHU2NzdGXHU1NDBFXHU5MUNEXHU4QkQ1XHVGRjAxXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1NjI3RVx1NTIzMCB7Y291bnR9IFx1NzlDRFx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3MlwiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgXHU2QjYzXHU1NzI4XHU1MkEwXHU4RjdEXHU1NkZFXHU3MjQ3Li4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IFx1NTZGRVx1NzI0N1x1NURGMlx1NTJBMFx1OEY3RFx1RkYwQ1x1NjcwOVx1NjU0OFx1NTBDRlx1N0QyMCB7Y291bnR9IFx1NEUyQVwiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIFx1NTZGRVx1NzI0N1x1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHU4QkY3XHU1NzI4XHU0RjYwXHU2MEYzXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2XHU3Njg0XHU1NzMwXHU2NUI5XHU2RDgyXHU3QjJDXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHVGRjAxXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTRGNjBcdTZEODJcdTUzQzJcdTgwMDNcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHU0RjREXHU3RjZFXHU4QkJFXHU3RjZFXHU2MjEwXHU1MjlGXHVGRjAxXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTRGNERcdTdGNkVcdTkwMDlcdTYyRTlcdThEODVcdTY1RjZcIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdTRGNERcdTdGNkVcdUZGMENcdTU5MDRcdTc0MDZcdTRFMkQuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTRGNERcdTdGNkVcdTY4QzBcdTZENEJcdTU5MzFcdThEMjVcdUZGMENcdThCRjdcdTkxQ0RcdThCRDVcIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBcdTVGMDBcdTU5Q0JcdTdFRDhcdTUyMzYuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBcdThGREJcdTVFQTY6IHtwYWludGVkfS97dG90YWx9IFx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgXHU2Q0ExXHU2NzA5XHU2QjIxXHU2NTcwXHUzMDAyXHU3QjQ5XHU1Rjg1IHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHU3NTI4XHU2MjM3XHU1REYyXHU1MDVDXHU2QjYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgXHU3RUQ4XHU1MjM2XHU1QjhDXHU2MjEwXHVGRjAxXHU1MTcxXHU3RUQ4XHU1MjM2IHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwXHUzMDAyXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgXHU3RUQ4XHU1MjM2XHU4RkM3XHU3QTBCXHU0RTJEXHU1MUZBXHU5NTE5XCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgXHU4QkY3XHU1MTQ4XHU1MkEwXHU4RjdEXHU1NkZFXHU3MjQ3XHU1RTc2XHU5MDA5XHU2MkU5XHU0RjREXHU3RjZFXCIsXG4gICAgcHJvZ3Jlc3M6IFwiXHU4RkRCXHU1RUE2XCIsXG4gICAgdXNlck5hbWU6IFwiXHU3NTI4XHU2MjM3XCIsXG4gICAgcGl4ZWxzOiBcIlx1NTBDRlx1N0QyMFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJcdTk4ODRcdThCQTFcdTY1RjZcdTk1RjRcIixcbiAgICBpbml0TWVzc2FnZTogXCJcdTcwQjlcdTUxRkJcdTIwMUNcdTUyMURcdTU5Q0JcdTUzMTZcdTgxRUFcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkFcdTIwMURcdTVGMDBcdTU5Q0JcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTdCNDlcdTVGODVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBcdTU2RkVcdTcyNDdcdTVERjJcdThDMDNcdTY1NzRcdTRFM0Ege3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBcdTdFRDhcdTUyMzZcdTY2ODJcdTUwNUNcdTRFOEVcdTRGNERcdTdGNkUgWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcdTY1NzBcIixcbiAgICBiYXRjaFNpemU6IFwiXHU2Mjc5XHU2QjIxXHU1OTI3XHU1QzBGXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJcdTRFMEJcdTZCMjFcdTYyNzlcdTZCMjFcdTY1RjZcdTk1RjRcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlx1NEY3Rlx1NzUyOFx1NjI0MFx1NjcwOVx1NTNFRlx1NzUyOFx1NkIyMVx1NjU3MFwiLFxuICAgIHNob3dPdmVybGF5OiBcIlx1NjYzRVx1NzkzQVx1ODk4Nlx1NzZENlx1NUM0MlwiLFxuICAgIG1heENoYXJnZXM6IFwiXHU2QkNGXHU2Mjc5XHU2NzAwXHU1OTI3XHU2QjIxXHU2NTcwXCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3MDoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJcdTUyNjlcdTRGNTlcdTY1RjZcdTk1RjRcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIFx1N0I0OVx1NUY4NSB7dGltZX0gXHU1NDBFXHU3RUU3XHU3RUVELi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgXHU4RkRCXHU1RUE2XHU1REYyXHU0RkREXHU1QjU4XHU0RTNBIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgXHU1REYyXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjBcdTVERjJcdTdFRDhcdTUyMzZcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2XHU1OTMxXHU4RDI1OiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIFx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlx1NTkzMVx1OEQyNToge2Vycm9yfVwiLFxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiXHU1NzI4XHU1MDVDXHU2QjYyXHU0RTRCXHU1MjREXHU4OTgxXHU0RkREXHU1QjU4XHU1RjUzXHU1MjREXHU4RkRCXHU1RUE2XHU1NDE3XHVGRjFGXCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiXHU0RkREXHU1QjU4XHU4RkRCXHU1RUE2XCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIlx1NjUzRVx1NUYwM1wiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBtaW5pbWl6ZTogXCJcdTY3MDBcdTVDMEZcdTUzMTZcIixcbiAgICB3aWR0aDogXCJcdTVCQkRcdTVFQTZcIixcbiAgICBoZWlnaHQ6IFwiXHU5QUQ4XHU1RUE2XCIsXG4gICAga2VlcEFzcGVjdDogXCJcdTRGRERcdTYzMDFcdTdFQjVcdTZBMkFcdTZCRDRcIixcbiAgICBhcHBseTogXCJcdTVFOTRcdTc1MjhcIixcbiAgICBvdmVybGF5T246IFwiXHU4OTg2XHU3NkQ2XHU1QzQyOiBcdTVGMDBcdTU0MkZcIixcbiAgICBvdmVybGF5T2ZmOiBcIlx1ODk4Nlx1NzZENlx1NUM0MjogXHU1MTczXHU5NUVEXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgXHU2Mjc5XHU2QjIxXHU1QjhDXHU2MjEwOiBcdTVERjJcdTdFRDhcdTUyMzYge3BhaW50ZWR9IFx1NTBDRlx1N0QyMCB8IFx1OEZEQlx1NUVBNjoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTcwXHU2MDYyXHU1OTBEOiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTY1RjZcdTk1RjQ6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzA6IHtjdXJyZW50fS97bmVlZGVkfSAtIFx1NTI2OVx1NEY1OToge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHU2QjYzXHU1NzI4XHU4MUVBXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTgxRUFcdTUyQThcdTU0MkZcdTUyQThcdTYyMTBcdTUyOUZcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHU2NUUwXHU2Q0Q1XHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHVGRjBDXHU4QkY3XHU2MjRCXHU1MkE4XHU2NENEXHU0RjVDXHUzMDAyXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEMwM1x1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1NzBCOVx1NTFGQlx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRVwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBcdTkxQ0RcdThCRDUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c31cdUZGMENcdTdCNDlcdTVGODUge2RlbGF5fSBcdTc5RDIuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBcdTdCMkMge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gXHU2QjIxXHU1QzFEXHU4QkQ1XHU1MUZBXHU5NTE5XHVGRjBDXHU1QzA2XHU1NzI4IHtkZWxheX0gXHU3OUQyXHU1NDBFXHU5MUNEXHU4QkQ1Li4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1OEQ4NVx1OEZDNyB7bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NUMxRFx1OEJENVx1NTkzMVx1OEQyNVx1MzAwMlx1N0VFN1x1N0VFRFx1NEUwQlx1NEUwMFx1NjI3OS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgXHU3RjUxXHU3RURDXHU5NTE5XHU4QkVGXHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QkQ1Li4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IFx1NjcwRFx1NTJBMVx1NTY2OFx1OTUxOVx1OEJFRlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgXHU2NzBEXHU1MkExXHU1NjY4XHU4RDg1XHU2NUY2XHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QkQ1Li4uXCJcbiAgfSxcblxuICAvLyBcdTUxOUNcdTU3M0FcdTZBMjFcdTU3NTdcdUZGMDhcdTVGODVcdTVCOUVcdTczQjBcdUZGMDlcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTUxOUNcdTU3M0FcdTY3M0FcdTU2NjhcdTRFQkFcIixcbiAgICBzdGFydDogXCJcdTVGMDBcdTU5Q0JcIixcbiAgICBzdG9wOiBcIlx1NTA1Q1x1NkI2MlwiLFxuICAgIHN0b3BwZWQ6IFwiXHU2NzNBXHU1NjY4XHU0RUJBXHU1REYyXHU1MDVDXHU2QjYyXCIsXG4gICAgY2FsaWJyYXRlOiBcIlx1NjgyMVx1NTFDNlwiLFxuICAgIHBhaW50T25jZTogXCJcdTRFMDBcdTZCMjFcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJcdTY4QzBcdTY3RTVcdTcyQjZcdTYwMDFcdTRFMkQuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIlx1OTE0RFx1N0Y2RVwiLFxuICAgIGRlbGF5OiBcIlx1NUVGNlx1OEZERiAoXHU2QkVCXHU3OUQyKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1NkJDRlx1NjI3OVx1NTBDRlx1N0QyMFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiXHU2NzAwXHU1QzExXHU2QjIxXHU2NTcwXCIsXG4gICAgY29sb3JNb2RlOiBcIlx1OTg5Q1x1ODI3Mlx1NkEyMVx1NUYwRlwiLFxuICAgIHJhbmRvbTogXCJcdTk2OEZcdTY3M0FcIixcbiAgICBmaXhlZDogXCJcdTU2RkFcdTVCOUFcIixcbiAgICByYW5nZTogXCJcdTgzMDNcdTU2RjRcIixcbiAgICBmaXhlZENvbG9yOiBcIlx1NTZGQVx1NUI5QVx1OTg5Q1x1ODI3MlwiLFxuICAgIGFkdmFuY2VkOiBcIlx1OUFEOFx1N0VBN1wiLFxuICAgIHRpbGVYOiBcIlx1NzRFNlx1NzI0NyBYXCIsXG4gICAgdGlsZVk6IFwiXHU3NEU2XHU3MjQ3IFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlx1ODFFQVx1NUI5QVx1NEU0OVx1OEMwM1x1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcIlx1NEY4Qlx1NTk4MjogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIlx1NjM1NVx1ODNCN1wiLFxuICAgIHBhaW50ZWQ6IFwiXHU1REYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzBcIixcbiAgICByZXRyaWVzOiBcIlx1OTFDRFx1OEJENVwiLFxuICAgIHRpbGU6IFwiXHU3NEU2XHU3MjQ3XCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU0RkREXHU1QjU4XCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NTJBMFx1OEY3RFwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1OTFDRFx1N0Y2RVwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiXHU4QkY3XHU2MjRCXHU1MkE4XHU3RUQ4XHU1MjM2XHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHU0RUU1XHU2MzU1XHU4M0I3XHU1NzUwXHU2ODA3Li4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJcdTU0MEVcdTdBRUZcdTU3MjhcdTdFQkZcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJcdTU0MEVcdTdBRUZcdTc5QkJcdTdFQkZcIixcbiAgICBzdGFydGluZ0JvdDogXCJcdTZCNjNcdTU3MjhcdTU0MkZcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkEuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJcdTZCNjNcdTU3MjhcdTUwNUNcdTZCNjJcdTY3M0FcdTU2NjhcdTRFQkEuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJcdTY4MjFcdTUxQzZcdTRFMkQuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0FcdTVERjJcdTU3MjhcdThGRDBcdTg4NENcdTMwMDJcIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIlx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRVx1NkI2M1x1NTcyOFx1OEZEMFx1ODg0Q1x1RkYwQ1x1OEJGN1x1NTE0OFx1NTE3M1x1OTVFRFx1NTE4RFx1NTQyRlx1NTJBOFx1ODFFQVx1NTJBOFx1NTE5Q1x1NTczQVx1MzAwMlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFx1NTcyOFx1NTczMFx1NTZGRVx1NzY4NFx1N0E3QVx1NzY3RFx1NTMzQVx1NTdERlx1NkQ4Mlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1NEVFNVx1OEJCRVx1N0Y2RVx1NTE5Q1x1NTczQVx1NTMzQVx1NTdERlwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU2RDgyXHU1M0MyXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NTMzQVx1NTdERlx1OEJCRVx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVx1NTM0QVx1NUY4NDogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1NTMzQVx1NTdERlx1OTAwOVx1NjJFOVx1OEQ4NVx1NjVGNlwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgXHU4QkY3XHU1MTQ4XHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHVGRjA4XHU0RjdGXHU3NTI4XHUyMDFDXHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHUyMDFEXHU2MzA5XHU5NEFFXHVGRjA5XCIsXG4gICAgZmFybVJhZGl1czogXCJcdTUxOUNcdTU3M0FcdTUzNEFcdTVGODRcIixcbiAgICBwb3NpdGlvbkluZm86IFwiXHU1RjUzXHU1MjREXHU1MzNBXHU1N0RGXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBcdTZCNjNcdTU3MjhcdTRFRTVcdTUzNEFcdTVGODQge3JhZGl1c31weCBcdTU3MjggKHt4fSx7eX0pIFx1NTE5Q1x1NTczQVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgXHU5MUNEXHU4OTgxOiBcdThCRjdcdTkwMDlcdTYyRTlcdTdBN0FcdTc2N0RcdTUzM0FcdTU3REZcdTRFRTVcdTkwN0ZcdTUxNERcdTUxQjJcdTdBODFcIixcbiAgICBub1Bvc2l0aW9uOiBcIlx1NjcyQVx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIGN1cnJlbnRab25lOiBcIlx1NTMzQVx1NTdERjogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBcdThCRjdcdTUxNDhcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcdUZGMENcdTU3MjhcdTU3MzBcdTU2RkVcdTRFMEFcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcdTRFRTVcdThCQkVcdTdGNkVcdTUxOUNcdTU3M0FcdTUzM0FcdTU3REZcIlxuICB9LFxuXG4gIC8vIFx1NTE2Q1x1NTE3MVxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiXHU2NjJGXCIsXG4gICAgbm86IFwiXHU1NDI2XCIsXG4gICAgb2s6IFwiXHU3ODZFXHU4QkE0XCIsXG4gICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgIGNsb3NlOiBcIlx1NTE3M1x1OTVFRFwiLFxuICAgIHNhdmU6IFwiXHU0RkREXHU1QjU4XCIsXG4gICAgbG9hZDogXCJcdTUyQTBcdThGN0RcIixcbiAgICBkZWxldGU6IFwiXHU1MjIwXHU5NjY0XCIsXG4gICAgZWRpdDogXCJcdTdGMTZcdThGOTFcIixcbiAgICBzdGFydDogXCJcdTVGMDBcdTU5Q0JcIixcbiAgICBzdG9wOiBcIlx1NTA1Q1x1NkI2MlwiLFxuICAgIHBhdXNlOiBcIlx1NjY4Mlx1NTA1Q1wiLFxuICAgIHJlc3VtZTogXCJcdTdFRTdcdTdFRURcIixcbiAgICByZXNldDogXCJcdTkxQ0RcdTdGNkVcIixcbiAgICBzZXR0aW5nczogXCJcdThCQkVcdTdGNkVcIixcbiAgICBoZWxwOiBcIlx1NUUyRVx1NTJBOVwiLFxuICAgIGFib3V0OiBcIlx1NTE3M1x1NEU4RVwiLFxuICAgIGxhbmd1YWdlOiBcIlx1OEJFRFx1OEEwMFwiLFxuICAgIGxvYWRpbmc6IFwiXHU1MkEwXHU4RjdEXHU0RTJELi4uXCIsXG4gICAgZXJyb3I6IFwiXHU5NTE5XHU4QkVGXCIsXG4gICAgc3VjY2VzczogXCJcdTYyMTBcdTUyOUZcIixcbiAgICB3YXJuaW5nOiBcIlx1OEI2Nlx1NTQ0QVwiLFxuICAgIGluZm86IFwiXHU0RkUxXHU2MDZGXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIlx1OEJFRFx1OEEwMFx1NURGMlx1NTIwN1x1NjM2Mlx1NEUzQSB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBcdTVCODhcdTYyQTRcdTZBMjFcdTU3NTdcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4MUVBXHU1MkE4XHU1Qjg4XHU2MkE0XCIsXG4gICAgaW5pdEJvdDogXCJcdTUyMURcdTU5Q0JcdTUzMTZcdTVCODhcdTYyQTRcdTY3M0FcdTU2NjhcdTRFQkFcIixcbiAgICBzZWxlY3RBcmVhOiBcIlx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIlx1NjM1NVx1ODNCN1x1NTMzQVx1NTdERlwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJcdTVGMDBcdTU5Q0JcdTVCODhcdTYyQTRcIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJcdTUwNUNcdTZCNjJcdTVCODhcdTYyQTRcIixcbiAgICB1cHBlckxlZnQ6IFwiXHU1REU2XHU0RTBBXHU4OUQyXCIsXG4gICAgbG93ZXJSaWdodDogXCJcdTUzRjNcdTRFMEJcdTg5RDJcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiXHU1M0Q3XHU0RkREXHU2MkE0XHU1MENGXHU3RDIwXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIlx1NjhDMFx1NkQ0Qlx1NTIzMFx1NzY4NFx1NTNEOFx1NTMxNlwiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlx1NEZFRVx1NTkwRFx1NzY4NFx1NTBDRlx1N0QyMFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFx1NjhDMFx1NjdFNVx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1OTg5Q1x1ODI3Mlx1RkYwQ1x1OEJGN1x1NTcyOFx1N0Y1MVx1N0FEOVx1NEUwQVx1NjI1M1x1NUYwMFx1OEMwM1x1ODI3Mlx1Njc3Rlx1MzAwMlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTc5Q0RcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzJcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgXHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU2MjEwXHU1MjlGXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBcdTVCODhcdTYyQTRcdTY3M0FcdTU2NjhcdTRFQkFcdTUyMURcdTU5Q0JcdTUzMTZcdTU5MzFcdThEMjVcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBcdTU3NTBcdTY4MDdcdTY1RTBcdTY1NDhcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgXHU1MzNBXHU1N0RGXHU2NUUwXHU2NTQ4XHVGRjBDXHU1REU2XHU0RTBBXHU4OUQyXHU1RkM1XHU5ODdCXHU1QzBGXHU0RThFXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTUzM0FcdTU3REZcdThGQzdcdTU5Mjc6IHtzaXplfSBcdTUwQ0ZcdTdEMjAgKFx1NjcwMFx1NTkyNzoge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggXHU2MzU1XHU4M0I3XHU1Qjg4XHU2MkE0XHU1MzNBXHU1N0RGXHU0RTJELi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdTYzNTVcdTgzQjdcdTYyMTBcdTUyOUY6IHtjb3VudH0gXHU1MENGXHU3RDIwXHU1M0Q3XHU0RkREXHU2MkE0XCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBcdTYzNTVcdTgzQjdcdTUzM0FcdTU3REZcdTUxRkFcdTk1MTk6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1NjM1NVx1ODNCN1x1NEUwMFx1NEUyQVx1NUI4OFx1NjJBNFx1NTMzQVx1NTdERlwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVCODhcdTYyQTRcdTVERjJcdTU0MkZcdTUyQTggLSBcdTUzM0FcdTU3REZcdTc2RDFcdTYzQTdcdTRFMkRcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHU1Qjg4XHU2MkE0XHU1REYyXHU1MDVDXHU2QjYyXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdTVCODlcdTUxNjggLSBcdTY3MkFcdTY4QzBcdTZENEJcdTUyMzBcdTUzRDhcdTUzMTZcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IFx1NjhDMFx1NkQ0Qlx1NTIzMCB7Y291bnR9IFx1NEUyQVx1NTNEOFx1NTMxNlwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgXHU2QjYzXHU1NzI4XHU0RkVFXHU1OTBEIHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBcdTVERjJcdTYyMTBcdTUyOUZcdTRGRUVcdTU5MEQge2NvdW50fSBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgXHU0RkVFXHU1OTBEXHU1MUZBXHU5NTE5OiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBcdTZCMjFcdTY1NzBcdTRFMERcdThEQjNcdUZGMENcdTY1RTBcdTZDRDVcdTRGRUVcdTU5MERcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjhDMFx1NjdFNVx1NTMzQVx1NTdERlx1NTNEOFx1NTMxNi4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIFx1NjhDMFx1NjdFNVx1NTFGQVx1OTUxOToge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVCODhcdTYyQTRcdTRFMkQgLSBcdTUzM0FcdTU3REZcdTUzRDdcdTRGRERcdTYyQTRcIixcbiAgICBsYXN0Q2hlY2s6IFwiXHU0RTBBXHU2QjIxXHU2OEMwXHU2N0U1OiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiXHU0RTBCXHU2QjIxXHU2OEMwXHU2N0U1OiB7dGltZX0gXHU3OUQyXHU1NDBFXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHU2QjYzXHU1NzI4XHU4MUVBXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTgxRUFcdTUyQThcdTU0MkZcdTUyQThcdTYyMTBcdTUyOUZcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHU2NUUwXHU2Q0Q1XHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHVGRjBDXHU4QkY3XHU2MjRCXHU1MkE4XHU2NENEXHU0RjVDXHUzMDAyXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyQThcdTUyMURcdTU5Q0JcdTUzMTZcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1NURGMlx1NjhDMFx1NkQ0Qlx1NTIzMFx1OEMwM1x1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2NDFDXHU3RDIyXHU4QzAzXHU4MjcyXHU2NzdGLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHU2QjYzXHU1NzI4XHU3MEI5XHU1MUZCXHU3RUQ4XHU1MjM2XHU2MzA5XHU5NEFFLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU3RUQ4XHU1MjM2XHU2MzA5XHU5NEFFXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTk3MDBcdTg5ODFcdTRGRERcdTYyQTRcdTUzM0FcdTU3REZcdTc2ODRcdTVERTZcdTRFMEFcdTg5RDJcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBcdTczQjBcdTU3MjhcdTU3MjhcdTUzRjNcdTRFMEJcdTg5RDJcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTkwMDlcdTYyRTlcdTVERTZcdTRFMEFcdTg5RDIuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDA5XHU2MkU5XHU1M0YzXHU0RTBCXHU4OUQyLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1ODNCN1x1NURFNlx1NEUwQVx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgXHU1REYyXHU2MzU1XHU4M0I3XHU1M0YzXHU0RTBCXHU4OUQyOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgXHU5MDA5XHU2MkU5XHU4RDg1XHU2NUY2XCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIFx1OTAwOVx1NjJFOVx1NTFGQVx1OTUxOVx1RkYwQ1x1OEJGN1x1OTFDRFx1OEJENVwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHpoSGFudCA9IHtcbiAgLy8gXHU1NTUzXHU1MkQ1XHU1NjY4XG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgXHU4MUVBXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBcdTgxRUFcdTUyRDVcdThGQjJcdTU4MzQnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTYnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTgxRUFcdTUyRDVcdTVCODhcdThCNzcnLFxuICAgIHNlbGVjdGlvbjogJ1x1OTA3OFx1NjRDNycsXG4gICAgdXNlcjogJ1x1NzUyOFx1NjIzNycsXG4gICAgY2hhcmdlczogJ1x1NkIyMVx1NjU3OCcsXG4gICAgYmFja2VuZDogJ1x1NUY4Q1x1N0FFRicsXG4gICAgZGF0YWJhc2U6ICdcdTY1NzhcdTY0REFcdTVFQUInLFxuICAgIHVwdGltZTogJ1x1OTA0Qlx1ODg0Q1x1NjY0Mlx1OTU5MycsXG4gICAgY2xvc2U6ICdcdTk1RENcdTk1ODknLFxuICAgIGxhdW5jaDogJ1x1NTU1M1x1NTJENScsXG4gICAgbG9hZGluZzogJ1x1NTJBMFx1OEYwOVx1NEUyRFx1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnXHU1N0Y3XHU4ODRDXHU0RTJEXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1x1NkI2M1x1NTcyOFx1NEUwQlx1OEYwOVx1ODE3M1x1NjcyQ1x1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnXHU5MDc4XHU2NEM3XHU0RTAwXHU1MDBCXHU2QTVGXHU1NjY4XHU0RUJBXHU0RTI2XHU5RURFXHU2NENBXHU1NTUzXHU1MkQ1JyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHU2RTk2XHU1MDk5XHU1NTUzXHU1MkQ1JyxcbiAgICBsb2FkRXJyb3I6ICdcdTUyQTBcdThGMDlcdTkzMkZcdThBQTQnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1NzEyMVx1NkNENVx1NTJBMFx1OEYwOVx1NjI0MFx1OTA3OFx1NkE1Rlx1NTY2OFx1NEVCQVx1MzAwMlx1OEFDQlx1NkFBMlx1NjdFNVx1N0RCMlx1N0Q2MVx1OTAyM1x1NjNBNVx1NjIxNlx1OTFDRFx1OEE2Nlx1MzAwMicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgXHU2QUEyXHU2N0U1XHU0RTJELi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgXHU1NzI4XHU3RERBJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IFx1OTZFMlx1N0REQScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgXHU2QjYzXHU1RTM4JyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBcdTkzMkZcdThBQTQnLFxuICAgIHVua25vd246ICctJ1xuICB9LFxuXG4gIC8vIFx1N0U2QVx1NTcxNlx1NkEyMVx1NTg0QVxuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTZcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1NEUwQVx1NTBCM1x1NTcxNlx1NzI0N1wiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1OEFCRlx1NjU3NFx1NTcxNlx1NzI0N1x1NTkyN1x1NUMwRlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTA3OFx1NjRDN1x1NEY0RFx1N0Y2RVwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiXHU5NThCXHU1OUNCXHU3RTZBXHU4OEZEXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1NTA1Q1x1NkI2Mlx1N0U2QVx1ODhGRFwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiXHU1MkEwXHU4RjA5XHU5MDMyXHU1RUE2XCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1NkFBMlx1NjdFNVx1NTNFRlx1NzUyOFx1OTg0Rlx1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1OEFDQlx1NTcyOFx1N0RCMlx1N0FEOVx1NEUwQVx1NjI1M1x1OTU4Qlx1OEFCRlx1ODI3Mlx1Njc3Rlx1NUY4Q1x1OTFDRFx1OEE2Nlx1RkYwMVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTdBMkVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzJcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIFx1NkI2M1x1NTcyOFx1NTJBMFx1OEYwOVx1NTcxNlx1NzI0Ny4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTU3MTZcdTcyNDdcdTVERjJcdTUyQTBcdThGMDlcdUZGMENcdTY3MDlcdTY1NDhcdTUwQ0ZcdTdEMjAge2NvdW50fSBcdTUwMEJcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTU3MTZcdTcyNDdcdTUyQTBcdThGMDlcdTU5MzFcdTY1NTdcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1OEFDQlx1NTcyOFx1NEY2MFx1NjBGM1x1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRFx1NzY4NFx1NTczMFx1NjVCOVx1NTg1N1x1N0IyQ1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1RkYwMVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU1ODU3XHU1M0MzXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NEY0RFx1N0Y2RVx1OEEyRFx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU5MDc4XHU2NEM3XHU4RDg1XHU2NjQyXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU0RjREXHU3RjZFXHVGRjBDXHU4NjU1XHU3NDA2XHU0RTJELi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU2QUEyXHU2RTJDXHU1OTMxXHU2NTU3XHVGRjBDXHU4QUNCXHU5MUNEXHU4QTY2XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHU5NThCXHU1OUNCXHU3RTZBXHU4OEZELi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHU5MDMyXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIFx1NkM5Mlx1NjcwOVx1NkIyMVx1NjU3OFx1MzAwMlx1N0I0OVx1NUY4NSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NzUyOFx1NjIzN1x1NURGMlx1NTA1Q1x1NkI2Mlx1N0U2QVx1ODhGRFwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1N0U2QVx1ODhGRFx1NUI4Q1x1NjIxMFx1RkYwMVx1NTE3MVx1N0U2QVx1ODhGRCB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMFx1MzAwMlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIFx1N0U2QVx1ODhGRFx1OTA0RVx1N0EwQlx1NEUyRFx1NTFGQVx1OTMyRlwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIFx1OEFDQlx1NTE0OFx1NTJBMFx1OEYwOVx1NTcxNlx1NzI0N1x1NEUyNlx1OTA3OFx1NjRDN1x1NEY0RFx1N0Y2RVwiLFxuICAgIHByb2dyZXNzOiBcIlx1OTAzMlx1NUVBNlwiLFxuICAgIHVzZXJOYW1lOiBcIlx1NzUyOFx1NjIzN1wiLFxuICAgIHBpeGVsczogXCJcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiXHU5ODEwXHU4QTA4XHU2NjQyXHU5NTkzXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHU5RURFXHU2NENBXHUyMDFDXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBXHUyMDFEXHU5NThCXHU1OUNCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgXHU1NzE2XHU3MjQ3XHU1REYyXHU4QUJGXHU2NTc0XHU3MEJBIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHU3RTZBXHU4OEZEXHU2NkFCXHU1MDVDXHU2NUJDXHU0RjREXHU3RjZFIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXHU2NTc4XCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1NjI3OVx1NkIyMVx1NTkyN1x1NUMwRlwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHU0RTBCXHU2QjIxXHU2Mjc5XHU2QjIxXHU2NjQyXHU5NTkzXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTRGN0ZcdTc1MjhcdTYyNDBcdTY3MDlcdTUzRUZcdTc1MjhcdTZCMjFcdTY1NzhcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTk4NkZcdTc5M0FcdTg5ODZcdTg0Q0JcdTVDNjRcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1NkJDRlx1NjI3OVx1NjcwMFx1NTkyN1x1NkIyMVx1NjU3OFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1Nzg6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiXHU1MjY5XHU5OTE4XHU2NjQyXHU5NTkzXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTdCNDlcdTVGODUge3RpbWV9IFx1NUY4Q1x1N0U3Q1x1N0U4Qy4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1OTAzMlx1NUVBNlx1NURGMlx1NEZERFx1NUI1OFx1NzBCQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1NURGMlx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwXHU1REYyXHU3RTZBXHU4OEZEXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNlx1NTkzMVx1NjU1Nzoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcdTU5MzFcdTY1NTc6IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1NTcyOFx1NTA1Q1x1NkI2Mlx1NEU0Qlx1NTI0RFx1ODk4MVx1NEZERFx1NUI1OFx1NzU3Nlx1NTI0RFx1OTAzMlx1NUVBNlx1NTVDRVx1RkYxRlwiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1NEZERFx1NUI1OFx1OTAzMlx1NUVBNlwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTY1M0VcdTY4QzRcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgbWluaW1pemU6IFwiXHU2NzAwXHU1QzBGXHU1MzE2XCIsXG4gICAgd2lkdGg6IFwiXHU1QkVDXHU1RUE2XCIsXG4gICAgaGVpZ2h0OiBcIlx1OUFEOFx1NUVBNlwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHU0RkREXHU2MzAxXHU3RTMxXHU2QTZCXHU2QkQ0XCIsXG4gICAgYXBwbHk6IFwiXHU2MUM5XHU3NTI4XCIsXG4gICAgb3ZlcmxheU9uOiBcIlx1ODk4Nlx1ODRDQlx1NUM2NDogXHU5NThCXHU1NTUzXCIsXG4gICAgb3ZlcmxheU9mZjogXCJcdTg5ODZcdTg0Q0JcdTVDNjQ6IFx1OTVEQ1x1OTU4OVwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1NjI3OVx1NkIyMVx1NUI4Q1x1NjIxMDogXHU1REYyXHU3RTZBXHU4OEZEIHtwYWludGVkfSBcdTUwQ0ZcdTdEMjAgfCBcdTkwMzJcdTVFQTY6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3OFx1NjA2Mlx1NUZBOToge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU2NjQyXHU5NTkzOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTc4OiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTUyNjlcdTk5MTg6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkQ1XHU1NTUzXHU1MkQ1XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NzEyMVx1NkNENVx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1RkYwQ1x1OEFDQlx1NjI0Qlx1NTJENVx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThBQkZcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTlFREVcdTY0Q0FcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTVcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHU5MUNEXHU4QTY2IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9XHVGRjBDXHU3QjQ5XHU1Rjg1IHtkZWxheX0gXHU3OUQyLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHU3QjJDIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NTYxN1x1OEE2Nlx1NTFGQVx1OTMyRlx1RkYwQ1x1NUMwN1x1NTcyOCB7ZGVsYXl9IFx1NzlEMlx1NUY4Q1x1OTFDRFx1OEE2Ni4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBcdThEODVcdTkwNEUge21heEF0dGVtcHRzfSBcdTZCMjFcdTU2MTdcdThBNjZcdTU5MzFcdTY1NTdcdTMwMDJcdTdFN0NcdTdFOENcdTRFMEJcdTRFMDBcdTYyNzkuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIFx1N0RCMlx1N0Q2MVx1OTMyRlx1OEFBNFx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEE2Ni4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTY3MERcdTUyRDlcdTU2NjhcdTkzMkZcdThBQTRcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1NjcwRFx1NTJEOVx1NTY2OFx1OEQ4NVx1NjY0Mlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEE2Ni4uLlwiXG4gIH0sXG5cbiAgLy8gXHU4RkIyXHU1ODM0XHU2QTIxXHU1ODRBXHVGRjA4XHU1Rjg1XHU1QkU2XHU3M0ZFXHVGRjA5XG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4RkIyXHU1ODM0XHU2QTVGXHU1NjY4XHU0RUJBXCIsXG4gICAgc3RhcnQ6IFwiXHU5NThCXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBzdG9wcGVkOiBcIlx1NkE1Rlx1NTY2OFx1NEVCQVx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIGNhbGlicmF0ZTogXCJcdTY4MjFcdTZFOTZcIixcbiAgICBwYWludE9uY2U6IFwiXHU0RTAwXHU2QjIxXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiXHU2QUEyXHU2N0U1XHU3MkMwXHU2MTRCXHU0RTJELi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTkxNERcdTdGNkVcIixcbiAgICBkZWxheTogXCJcdTVFRjZcdTkwNzIgKFx1NkJFQlx1NzlEMilcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcIixcbiAgICBtaW5DaGFyZ2VzOiBcIlx1NjcwMFx1NUMxMVx1NkIyMVx1NjU3OFwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTk4NEZcdTgyNzJcdTZBMjFcdTVGMEZcIixcbiAgICByYW5kb206IFwiXHU5NkE4XHU2QTVGXCIsXG4gICAgZml4ZWQ6IFwiXHU1NkZBXHU1QjlBXCIsXG4gICAgcmFuZ2U6IFwiXHU3QkM0XHU1NzBEXCIsXG4gICAgZml4ZWRDb2xvcjogXCJcdTU2RkFcdTVCOUFcdTk4NEZcdTgyNzJcIixcbiAgICBhZHZhbmNlZDogXCJcdTlBRDhcdTdEMUFcIixcbiAgICB0aWxlWDogXCJcdTc0RTZcdTcyNDcgWFwiLFxuICAgIHRpbGVZOiBcIlx1NzRFNlx1NzI0NyBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTgxRUFcdTVCOUFcdTdGQTlcdThBQkZcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTRGOEJcdTU5ODI6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTYzNTVcdTczNzJcIixcbiAgICBwYWludGVkOiBcIlx1NURGMlx1N0U2QVx1ODhGRFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTc4XCIsXG4gICAgcmV0cmllczogXCJcdTkxQ0RcdThBNjZcIixcbiAgICB0aWxlOiBcIlx1NzRFNlx1NzI0N1wiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NEZERFx1NUI1OFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTUyQTBcdThGMDlcIixcbiAgICBjb25maWdSZXNldDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTkxQ0RcdTdGNkVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlx1OEFDQlx1NjI0Qlx1NTJENVx1N0U2QVx1ODhGRFx1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1NEVFNVx1NjM1NVx1NzM3Mlx1NUVBN1x1NkExOS4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHU1RjhDXHU3QUVGXHU1NzI4XHU3RERBXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiXHU1RjhDXHU3QUVGXHU5NkUyXHU3RERBXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1NTUzXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1MDVDXHU2QjYyXHU2QTVGXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHU2ODIxXHU2RTk2XHU0RTJELi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0XHU1REYyXHU1NzI4XHU5MDRCXHU4ODRDXHUzMDAyXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTZcdTZCNjNcdTU3MjhcdTkwNEJcdTg4NENcdUZGMENcdThBQ0JcdTUxNDhcdTk1RENcdTk1ODlcdTUxOERcdTU1NTNcdTUyRDVcdTgxRUFcdTUyRDVcdThGQjJcdTU4MzRcdTMwMDJcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTU3MzBcdTU3MTZcdTc2ODRcdTdBN0FcdTc2N0RcdTUzNDBcdTU3REZcdTU4NTdcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTRFRTVcdThBMkRcdTdGNkVcdThGQjJcdTU4MzRcdTUzNDBcdTU3REZcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NTg1N1x1NTNDM1x1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTUzNDBcdTU3REZcdThBMkRcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcdTUzNEFcdTVGOTE6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTUzNDBcdTU3REZcdTkwNzhcdTY0QzdcdThEODVcdTY2NDJcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1OEFDQlx1NTE0OFx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1RkYwOFx1NEY3Rlx1NzUyOFx1MjAxQ1x1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1MjAxRFx1NjMwOVx1OTIxNVx1RkYwOVwiLFxuICAgIGZhcm1SYWRpdXM6IFwiXHU4RkIyXHU1ODM0XHU1MzRBXHU1RjkxXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1NzU3Nlx1NTI0RFx1NTM0MFx1NTdERlwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHU2QjYzXHU1NzI4XHU0RUU1XHU1MzRBXHU1RjkxIHtyYWRpdXN9cHggXHU1NzI4ICh7eH0se3l9KSBcdThGQjJcdTU4MzRcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIFx1OTFDRFx1ODk4MTogXHU4QUNCXHU5MDc4XHU2NEM3XHU3QTdBXHU3NjdEXHU1MzQwXHU1N0RGXHU0RUU1XHU5MDdGXHU1MTREXHU4ODVEXHU3QTgxXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTY3MkFcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTUzNDBcdTU3REY6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHU4QUNCXHU1MTQ4XHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXHVGRjBDXHU1NzI4XHU1NzMwXHU1NzE2XHU0RTBBXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXHU0RUU1XHU4QTJEXHU3RjZFXHU4RkIyXHU1ODM0XHU1MzQwXHU1N0RGXCJcbiAgfSxcblxuICAvLyBcdTUxNkNcdTUxNzFcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1NjYyRlwiLFxuICAgIG5vOiBcIlx1NTQyNlwiLFxuICAgIG9rOiBcIlx1NzhCQVx1OEE4RFwiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBjbG9zZTogXCJcdTk1RENcdTk1ODlcIixcbiAgICBzYXZlOiBcIlx1NEZERFx1NUI1OFwiLFxuICAgIGxvYWQ6IFwiXHU1MkEwXHU4RjA5XCIsXG4gICAgZGVsZXRlOiBcIlx1NTIyQVx1OTY2NFwiLFxuICAgIGVkaXQ6IFwiXHU3REU4XHU4RjJGXCIsXG4gICAgc3RhcnQ6IFwiXHU5NThCXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBwYXVzZTogXCJcdTY2QUJcdTUwNUNcIixcbiAgICByZXN1bWU6IFwiXHU3RTdDXHU3RThDXCIsXG4gICAgcmVzZXQ6IFwiXHU5MUNEXHU3RjZFXCIsXG4gICAgc2V0dGluZ3M6IFwiXHU4QTJEXHU3RjZFXCIsXG4gICAgaGVscDogXCJcdTVFNkJcdTUyQTlcIixcbiAgICBhYm91dDogXCJcdTk1RENcdTY1QkNcIixcbiAgICBsYW5ndWFnZTogXCJcdThBOUVcdThBMDBcIixcbiAgICBsb2FkaW5nOiBcIlx1NTJBMFx1OEYwOVx1NEUyRC4uLlwiLFxuICAgIGVycm9yOiBcIlx1OTMyRlx1OEFBNFwiLFxuICAgIHN1Y2Nlc3M6IFwiXHU2MjEwXHU1MjlGXCIsXG4gICAgd2FybmluZzogXCJcdThCNjZcdTU0NEFcIixcbiAgICBpbmZvOiBcIlx1NEZFMVx1NjA2RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdThBOUVcdThBMDBcdTVERjJcdTUyMDdcdTYzREJcdTcwQkEge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gXHU1Qjg4XHU4Qjc3XHU2QTIxXHU1ODRBXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJENVx1NUI4OFx1OEI3N1wiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU1Qjg4XHU4Qjc3XHU2QTVGXHU1NjY4XHU0RUJBXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBjYXB0dXJlQXJlYTogXCJcdTYzNTVcdTczNzJcdTUzNDBcdTU3REZcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHU5NThCXHU1OUNCXHU1Qjg4XHU4Qjc3XCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHU1MDVDXHU2QjYyXHU1Qjg4XHU4Qjc3XCIsXG4gICAgdXBwZXJMZWZ0OiBcIlx1NURFNlx1NEUwQVx1ODlEMlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1NTNEN1x1NEZERFx1OEI3N1x1NTBDRlx1N0QyMFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTZBQTJcdTZFMkNcdTUyMzBcdTc2ODRcdThCOEFcdTUzMTZcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJcdTRGRUVcdTVGQTlcdTc2ODRcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTZBQTJcdTY3RTVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTk4NEZcdTgyNzJcdUZGMENcdThBQ0JcdTU3MjhcdTdEQjJcdTdBRDlcdTRFMEFcdTYyNTNcdTk1OEJcdThBQkZcdTgyNzJcdTY3N0ZcdTMwMDJcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3QTJFXHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NjIxMFx1NTI5RlwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHU1Qjg4XHU4Qjc3XHU2QTVGXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU1OTMxXHU2NTU3XCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgXHU1RUE3XHU2QTE5XHU3MTIxXHU2NTQ4XCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1NTM0MFx1NTdERlx1NzEyMVx1NjU0OFx1RkYwQ1x1NURFNlx1NEUwQVx1ODlEMlx1NUZDNVx1OTgwOFx1NUMwRlx1NjVCQ1x1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHU1MzQwXHU1N0RGXHU5MDRFXHU1OTI3OiB7c2l6ZX0gXHU1MENGXHU3RDIwIChcdTY3MDBcdTU5Mjc6IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IFx1NjM1NVx1NzM3Mlx1NUI4OFx1OEI3N1x1NTM0MFx1NTdERlx1NEUyRC4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU2MzU1XHU3MzcyXHU2MjEwXHU1MjlGOiB7Y291bnR9IFx1NTBDRlx1N0QyMFx1NTNEN1x1NEZERFx1OEI3N1wiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHU2MzU1XHU3MzcyXHU1MzQwXHU1N0RGXHU1MUZBXHU5MzJGOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTYzNTVcdTczNzJcdTRFMDBcdTUwMEJcdTVCODhcdThCNzdcdTUzNDBcdTU3REZcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU4Qjc3XHU1REYyXHU1NTUzXHU1MkQ1IC0gXHU1MzQwXHU1N0RGXHU3NkUzXHU2M0E3XHU0RTJEXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NUI4OFx1OEI3N1x1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU1Qjg5XHU1MTY4IC0gXHU2NzJBXHU2QUEyXHU2RTJDXHU1MjMwXHU4QjhBXHU1MzE2XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTZBQTJcdTZFMkNcdTUyMzAge2NvdW50fSBcdTUwMEJcdThCOEFcdTUzMTZcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1NkI2M1x1NTcyOFx1NEZFRVx1NUZBOSB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHU1REYyXHU2MjEwXHU1MjlGXHU0RkVFXHU1RkE5IHtjb3VudH0gXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIFx1NEZFRVx1NUZBOVx1NTFGQVx1OTMyRjoge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHU2QjIxXHU2NTc4XHU0RTBEXHU4REIzXHVGRjBDXHU3MTIxXHU2Q0Q1XHU0RkVFXHU1RkE5XCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTZBQTJcdTY3RTVcdTUzNDBcdTU3REZcdThCOEFcdTUzMTYuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTZBQTJcdTY3RTVcdTUxRkFcdTkzMkY6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU4Qjc3XHU0RTJEIC0gXHU1MzQwXHU1N0RGXHU1M0Q3XHU0RkREXHU4Qjc3XCIsXG4gICAgbGFzdENoZWNrOiBcIlx1NEUwQVx1NkIyMVx1NkFBMlx1NjdFNToge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1NEUwQlx1NkIyMVx1NkFBMlx1NjdFNToge3RpbWV9IFx1NzlEMlx1NUY4Q1wiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkQ1XHU1NTUzXHU1MkQ1XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NzEyMVx1NkNENVx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1RkYwQ1x1OEFDQlx1NjI0Qlx1NTJENVx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkQ1XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTZBQTJcdTZFMkNcdTUyMzBcdThBQkZcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEFCRlx1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1OUVERVx1NjRDQVx1N0U2QVx1ODhGRFx1NjMwOVx1OTIxNS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0U2QVx1ODhGRFx1NjMwOVx1OTIxNVwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU5NzAwXHU4OTgxXHU0RkREXHU4Qjc3XHU1MzQwXHU1N0RGXHU3Njg0XHU1REU2XHU0RTBBXHU4OUQyXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHU3M0ZFXHU1NzI4XHU1NzI4XHU1M0YzXHU0RTBCXHU4OUQyXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDc4XHU2NEM3XHU1REU2XHU0RTBBXHU4OUQyLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTA3OFx1NjRDN1x1NTNGM1x1NEUwQlx1ODlEMi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTczNzJcdTVERTZcdTRFMEFcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1NzM3Mlx1NTNGM1x1NEUwQlx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1OTA3OFx1NjRDN1x1OEQ4NVx1NjY0MlwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTkwNzhcdTY0QzdcdTUxRkFcdTkzMkZcdUZGMENcdThBQ0JcdTkxQ0RcdThBNjZcIlxuICB9XG59OyIsICJpbXBvcnQgeyBlcyB9IGZyb20gJy4vZXMuanMnO1xuaW1wb3J0IHsgZW4gfSBmcm9tICcuL2VuLmpzJztcbmltcG9ydCB7IGZyIH0gZnJvbSAnLi9mci5qcyc7XG5pbXBvcnQgeyBydSB9IGZyb20gJy4vcnUuanMnO1xuaW1wb3J0IHsgemhIYW5zIH0gZnJvbSAnLi96aC1IYW5zLmpzJztcbmltcG9ydCB7IHpoSGFudCB9IGZyb20gJy4vemgtSGFudC5qcyc7XG5cbi8vIElkaW9tYXMgZGlzcG9uaWJsZXNcbmV4cG9ydCBjb25zdCBBVkFJTEFCTEVfTEFOR1VBR0VTID0ge1xuICBlczogeyBuYW1lOiAnRXNwYVx1MDBGMW9sJywgZmxhZzogJ1x1RDgzQ1x1RERFQVx1RDgzQ1x1RERGOCcsIGNvZGU6ICdlcycgfSxcbiAgZW46IHsgbmFtZTogJ0VuZ2xpc2gnLCBmbGFnOiAnXHVEODNDXHVEREZBXHVEODNDXHVEREY4JywgY29kZTogJ2VuJyB9LFxuICBmcjogeyBuYW1lOiAnRnJhblx1MDBFN2FpcycsIGZsYWc6ICdcdUQ4M0NcdURERUJcdUQ4M0NcdURERjcnLCBjb2RlOiAnZnInIH0sXG4gIHJ1OiB7IG5hbWU6ICdcdTA0MjBcdTA0NDNcdTA0NDFcdTA0NDFcdTA0M0FcdTA0MzhcdTA0MzknLCBmbGFnOiAnXHVEODNDXHVEREY3XHVEODNDXHVEREZBJywgY29kZTogJ3J1JyB9LFxuICB6aEhhbnM6IHsgbmFtZTogJ1x1N0I4MFx1NEY1M1x1NEUyRFx1NjU4NycsIGZsYWc6ICdcdUQ4M0NcdURERThcdUQ4M0NcdURERjMnLCBjb2RlOiAnemgtSGFucycgfSxcbiAgemhIYW50OiB7IG5hbWU6ICdcdTdFNDFcdTlBRDRcdTRFMkRcdTY1ODcnLCBmbGFnOiAnXHVEODNDXHVEREU4XHVEODNDXHVEREYzJywgY29kZTogJ3poLUhhbnQnIH1cbn07XG5cbi8vIFRvZGFzIGxhcyB0cmFkdWNjaW9uZXNcbmNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgZXMsXG4gIGVuLFxuICBmcixcbiAgcnUsXG4gIHpoSGFucyxcbiAgemhIYW50XG59O1xuXG4vLyBFc3RhZG8gZGVsIGlkaW9tYSBhY3R1YWxcbmxldCBjdXJyZW50TGFuZ3VhZ2UgPSAnZXMnO1xubGV0IGN1cnJlbnRUcmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnNbY3VycmVudExhbmd1YWdlXTtcblxuLyoqXG4gKiBEZXRlY3RhIGVsIGlkaW9tYSBkZWwgbmF2ZWdhZG9yXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGRldGVjdGFkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0QnJvd3Nlckxhbmd1YWdlKCkge1xuICBjb25zdCBicm93c2VyTGFuZyA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgfHwgJ2VzJztcblxuICAvLyBFeHRyYWVyIHNvbG8gZWwgY1x1MDBGM2RpZ28gZGVsIGlkaW9tYSAoZWo6ICdlcy1FUycgLT4gJ2VzJylcbiAgY29uc3QgbGFuZ0NvZGUgPSBicm93c2VyTGFuZy5zcGxpdCgnLScpWzBdLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gVmVyaWZpY2FyIHNpIHRlbmVtb3Mgc29wb3J0ZSBwYXJhIGVzdGUgaWRpb21hXG4gIGlmICh0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdKSB7XG4gICAgcmV0dXJuIGxhbmdDb2RlO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgYSBlc3BhXHUwMEYxb2wgcG9yIGRlZmVjdG9cbiAgcmV0dXJuICdlcyc7XG59XG5cbi8qKlxuICogT2J0aWVuZSBlbCBpZGlvbWEgZ3VhcmRhZG8gKGRlc2hhYmlsaXRhZG8gLSBubyB1c2FyIGxvY2FsU3RvcmFnZSlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFNpZW1wcmUgcmV0b3JuYSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTYXZlZExhbmd1YWdlKCkge1xuICAvLyBObyB1c2FyIGxvY2FsU3RvcmFnZSAtIHNpZW1wcmUgcmV0b3JuYXIgbnVsbFxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBHdWFyZGEgZWwgaWRpb21hIChkZXNoYWJpbGl0YWRvIC0gbm8gdXNhciBsb2NhbFN0b3JhZ2UpXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ0NvZGUgLSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYXZlTGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgLy8gTm8gZ3VhcmRhciBlbiBsb2NhbFN0b3JhZ2UgLSBmdW5jaVx1MDBGM24gZGVzaGFiaWxpdGFkYVxuICByZXR1cm47XG59XG5cbi8qKlxuICogSW5pY2lhbGl6YSBlbCBzaXN0ZW1hIGRlIGlkaW9tYXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENcdTAwRjNkaWdvIGRlbCBpZGlvbWEgaW5pY2lhbGl6YWRvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplTGFuZ3VhZ2UoKSB7XG4gIC8vIFByaW9yaWRhZDogZ3VhcmRhZG8gPiBuYXZlZ2Fkb3IgPiBlc3BhXHUwMEYxb2xcbiAgY29uc3Qgc2F2ZWRMYW5nID0gZ2V0U2F2ZWRMYW5ndWFnZSgpO1xuICBjb25zdCBicm93c2VyTGFuZyA9IGRldGVjdEJyb3dzZXJMYW5ndWFnZSgpO1xuXG4gIGxldCBzZWxlY3RlZExhbmcgPSAnZXMnOyAvLyBmYWxsYmFjayBwb3IgZGVmZWN0b1xuXG4gIGlmIChzYXZlZExhbmcgJiYgdHJhbnNsYXRpb25zW3NhdmVkTGFuZ10pIHtcbiAgICBzZWxlY3RlZExhbmcgPSBzYXZlZExhbmc7XG4gIH0gZWxzZSBpZiAoYnJvd3NlckxhbmcgJiYgdHJhbnNsYXRpb25zW2Jyb3dzZXJMYW5nXSkge1xuICAgIHNlbGVjdGVkTGFuZyA9IGJyb3dzZXJMYW5nO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2Uoc2VsZWN0ZWRMYW5nKTtcbiAgcmV0dXJuIHNlbGVjdGVkTGFuZztcbn1cblxuLyoqXG4gKiBDYW1iaWEgZWwgaWRpb21hIGFjdHVhbFxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgaWYgKCF0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdKSB7XG4gICAgY29uc29sZS53YXJuKGBJZGlvbWEgJyR7bGFuZ0NvZGV9JyBubyBkaXNwb25pYmxlLiBVc2FuZG8gJyR7Y3VycmVudExhbmd1YWdlfSdgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjdXJyZW50TGFuZ3VhZ2UgPSBsYW5nQ29kZTtcbiAgY3VycmVudFRyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9uc1tsYW5nQ29kZV07XG4gIHNhdmVMYW5ndWFnZShsYW5nQ29kZSk7XG5cbiAgLy8gRW1pdGlyIGV2ZW50byBwZXJzb25hbGl6YWRvIHBhcmEgcXVlIGxvcyBtXHUwMEYzZHVsb3MgcHVlZGFuIHJlYWNjaW9uYXJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5DdXN0b21FdmVudCkge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ2xhbmd1YWdlQ2hhbmdlZCcsIHtcbiAgICAgIGRldGFpbDogeyBsYW5ndWFnZTogbGFuZ0NvZGUsIHRyYW5zbGF0aW9uczogY3VycmVudFRyYW5zbGF0aW9ucyB9XG4gICAgfSkpO1xuICB9XG59XG5cbi8qKlxuICogT2J0aWVuZSBlbCBpZGlvbWEgYWN0dWFsXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGFjdHVhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudExhbmd1YWdlKCkge1xuICByZXR1cm4gY3VycmVudExhbmd1YWdlO1xufVxuXG4vKipcbiAqIE9idGllbmUgbGFzIHRyYWR1Y2Npb25lcyBhY3R1YWxlc1xuICogQHJldHVybnMge29iamVjdH0gT2JqZXRvIGNvbiB0b2RhcyBsYXMgdHJhZHVjY2lvbmVzIGRlbCBpZGlvbWEgYWN0dWFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VHJhbnNsYXRpb25zKCkge1xuICByZXR1cm4gY3VycmVudFRyYW5zbGF0aW9ucztcbn1cblxuLyoqXG4gKiBPYnRpZW5lIHVuIHRleHRvIHRyYWR1Y2lkbyB1c2FuZG8gbm90YWNpXHUwMEYzbiBkZSBwdW50b1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIENsYXZlIGRlbCB0ZXh0byAoZWo6ICdpbWFnZS50aXRsZScsICdjb21tb24uY2FuY2VsJylcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBQYXJcdTAwRTFtZXRyb3MgcGFyYSBpbnRlcnBvbGFjaVx1MDBGM24gKGVqOiB7Y291bnQ6IDV9KVxuICogQHJldHVybnMge3N0cmluZ30gVGV4dG8gdHJhZHVjaWRvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0KGtleSwgcGFyYW1zID0ge30pIHtcbiAgY29uc3Qga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICBsZXQgdmFsdWUgPSBjdXJyZW50VHJhbnNsYXRpb25zO1xuXG4gIC8vIE5hdmVnYXIgcG9yIGxhIGVzdHJ1Y3R1cmEgZGUgb2JqZXRvc1xuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIGsgaW4gdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWVba107XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihgQ2xhdmUgZGUgdHJhZHVjY2lcdTAwRjNuIG5vIGVuY29udHJhZGE6ICcke2tleX0nYCk7XG4gICAgICByZXR1cm4ga2V5OyAvLyBSZXRvcm5hciBsYSBjbGF2ZSBjb21vIGZhbGxiYWNrXG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICBjb25zb2xlLndhcm4oYENsYXZlIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlcyBzdHJpbmc6ICcke2tleX0nYCk7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIC8vIEludGVycG9sYXIgcGFyXHUwMEUxbWV0cm9zXG4gIHJldHVybiBpbnRlcnBvbGF0ZSh2YWx1ZSwgcGFyYW1zKTtcbn1cblxuLyoqXG4gKiBJbnRlcnBvbGEgcGFyXHUwMEUxbWV0cm9zIGVuIHVuIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBUZXh0byBjb24gbWFyY2Fkb3JlcyB7a2V5fVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAtIFBhclx1MDBFMW1ldHJvcyBhIGludGVycG9sYXJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRleHRvIGNvbiBwYXJcdTAwRTFtZXRyb3MgaW50ZXJwb2xhZG9zXG4gKi9cbmZ1bmN0aW9uIGludGVycG9sYXRlKHRleHQsIHBhcmFtcykge1xuICBpZiAoIXBhcmFtcyB8fCBPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csIChtYXRjaCwga2V5KSA9PiB7XG4gICAgcmV0dXJuIHBhcmFtc1trZXldICE9PSB1bmRlZmluZWQgPyBwYXJhbXNba2V5XSA6IG1hdGNoO1xuICB9KTtcbn1cblxuLyoqXG4gKiBPYnRpZW5lIHRyYWR1Y2Npb25lcyBkZSB1bmEgc2VjY2lcdTAwRjNuIGVzcGVjXHUwMEVEZmljYVxuICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBTZWNjaVx1MDBGM24gKGVqOiAnaW1hZ2UnLCAnbGF1bmNoZXInLCAnY29tbW9uJylcbiAqIEByZXR1cm5zIHtvYmplY3R9IE9iamV0byBjb24gbGFzIHRyYWR1Y2Npb25lcyBkZSBsYSBzZWNjaVx1MDBGM25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlY3Rpb24oc2VjdGlvbikge1xuICBpZiAoY3VycmVudFRyYW5zbGF0aW9uc1tzZWN0aW9uXSkge1xuICAgIHJldHVybiBjdXJyZW50VHJhbnNsYXRpb25zW3NlY3Rpb25dO1xuICB9XG5cbiAgY29uc29sZS53YXJuKGBTZWNjaVx1MDBGM24gZGUgdHJhZHVjY2lcdTAwRjNuIG5vIGVuY29udHJhZGE6ICcke3NlY3Rpb259J2ApO1xuICByZXR1cm4ge307XG59XG5cbi8qKlxuICogVmVyaWZpY2Egc2kgdW4gaWRpb21hIGVzdFx1MDBFMSBkaXNwb25pYmxlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ0NvZGUgLSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBzaSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMYW5ndWFnZUF2YWlsYWJsZShsYW5nQ29kZSkge1xuICByZXR1cm4gISF0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdO1xufVxuXG4vLyBJbmljaWFsaXphciBhdXRvbVx1MDBFMXRpY2FtZW50ZSBhbCBjYXJnYXIgZWwgbVx1MDBGM2R1bG9cbmluaXRpYWxpemVMYW5ndWFnZSgpO1xuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuaW1wb3J0IHsgRkFSTV9ERUZBVUxUUywgZmFybVN0YXRlIH0gZnJvbSBcIi4vY29uZmlnLmpzXCI7XG5pbXBvcnQgeyBzYXZlRmFybUNmZywgbG9hZEZhcm1DZmcsIHJlc2V0RmFybUNmZyB9IGZyb20gXCIuLi9jb3JlL3N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IGRyYWdIZWFkZXIsIGNsYW1wIH0gZnJvbSBcIi4uL2NvcmUvdXRpbHMuanNcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi4vbG9jYWxlcy9pbmRleC5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmFybVVJKGNvbmZpZywgb25TdGFydCwgb25TdG9wKSB7XG4gIGNvbnN0IHNoYWRvd0hvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2hhZG93SG9zdC5pZCA9ICd3cGxhY2UtZmFybS11aSc7XG4gIHNoYWRvd0hvc3Quc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAxMHB4O1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIHotaW5kZXg6IDIxNDc0ODM2NDc7XG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gIGA7XG4gIFxuICBjb25zdCBzaGFkb3cgPSBzaGFkb3dIb3N0LmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgLndwbGFjZS1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkICM0YTU1Njg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgIG1pbi13aWR0aDogMzIwcHg7XG4gICAgICBtYXgtd2lkdGg6IDQwMHB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgYm94LXNoYWRvdzogMCAxMHB4IDI1cHggcmdiYSgwLDAsMCwwLjMpO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKTtcbiAgICAgIGN1cnNvcjogbW92ZTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS10aXRsZSB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtbWluaW1pemUge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjIpO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1taW5pbWl6ZTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMyk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtY29udGVudCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1jb250ZW50Lm1pbmltaXplZCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXNlY3Rpb24ge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zZWN0aW9uLXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgY29sb3I6ICNlMmU4ZjA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1yb3cge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICBnYXA6IDhweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1sYWJlbCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgY29sb3I6ICNjYmQ1ZTA7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtaW5wdXQge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjEpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIHdpZHRoOiA4MHB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWlucHV0OmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICBib3JkZXItY29sb3I6ICM5MGNkZjQ7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMTUpO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWlucHV0LndpZGUge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utc2VsZWN0IHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4xKTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICB3aWR0aDogMTAwcHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM0Mjk5ZTEgMCUsICMzMTgyY2UgMTAwJSk7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBwYWRkaW5nOiA4cHggMTZweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBtYXJnaW46IDJweDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xuICAgICAgbWluLXdpZHRoOiA2MHB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMzE4MmNlIDAlLCAjMmM1MjgyIDEwMCUpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWJ1dHRvbjphY3RpdmUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWJ1dHRvbjpkaXNhYmxlZCB7XG4gICAgICBvcGFjaXR5OiAwLjU7XG4gICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWJ1dHRvbi5zdGFydCB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNDhiYjc4IDAlLCAjMzhhMTY5IDEwMCUpO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWJ1dHRvbi5zdGFydDpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMzhhMTY5IDAlLCAjMmY4NTVhIDEwMCUpO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWJ1dHRvbi5zdG9wIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmNTY1NjUgMCUsICNlNTNlM2UgMTAwJSk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9uLnN0b3A6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2U1M2UzZSAwJSwgI2M1MzAzMCAxMDAlKTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1idXR0b24uc21hbGwge1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIG1pbi13aWR0aDogNDBweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zdGF0dXMge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjMpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgbWFyZ2luOiA4cHggMDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIG1pbi1oZWlnaHQ6IDIwcHg7XG4gICAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXN0YXR1cy5zdWNjZXNzIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoNzIsIDE4NywgMTIwLCAwLjIpO1xuICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjNDhiYjc4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXN0YXR1cy5lcnJvciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwgMTAxLCAxMDEsIDAuMik7XG4gICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICNmNTY1NjU7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utc3RhdHVzLnN0YXR1cyB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDY2LCAxNTMsIDIyNSwgMC4yKTtcbiAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzQyOTllMTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zdGF0cyB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zdGF0IHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC4yKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIHBhZGRpbmc6IDZweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1zdGF0LXZhbHVlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLXN0YXQtbGFiZWwge1xuICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgY29sb3I6ICNhMGFlYzA7XG4gICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYnV0dG9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtYWR2YW5jZWQge1xuICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgICAgcGFkZGluZy10b3A6IDhweDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtdGhlbWUtcHJldmlldyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAycHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgICBtaW4taGVpZ2h0OiAxNnB4O1xuICAgIH1cbiAgICBcbiAgICAud3BsYWNlLWNvbG9yLWRvdCB7XG4gICAgICB3aWR0aDogMTJweDtcbiAgICAgIGhlaWdodDogMTJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4zKTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1oZWFsdGgge1xuICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgY29sb3I6ICNhMGFlYzA7XG4gICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2UtaGVhbHRoLm9ubGluZSB7XG4gICAgICBjb2xvcjogIzQ4YmI3ODtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS1oZWFsdGgub2ZmbGluZSB7XG4gICAgICBjb2xvcjogI2Y1NjU2NTtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS16b25lLWluZm8ge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgbWFyZ2luOiA4cHggMDtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICB9XG4gICAgXG4gICAgLndwbGFjZS16b25lLXRleHQge1xuICAgICAgY29sb3I6ICNlMmU4ZjA7XG4gICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgfVxuICAgIFxuICAgIC53cGxhY2Utem9uZS13YXJuaW5nIHtcbiAgICAgIGNvbG9yOiAjZmZkNzAwO1xuICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cbiAgICBcbiAgICAjem9uZS1kaXNwbGF5IHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgY29sb3I6ICM5MGNkZjQ7XG4gICAgfVxuICBgO1xuICBcbiAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gJ3dwbGFjZS1jb250YWluZXInO1xuICBcbiAgLy8gRXN0YWRvIGludGVybm8gZGUgbGEgVUlcbiAgY29uc3QgdWlTdGF0ZSA9IHtcbiAgICBtaW5pbWl6ZWQ6IGZhbHNlLFxuICAgIHNob3dBZHZhbmNlZDogZmFsc2VcbiAgfTtcbiAgXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cIndwbGFjZS1oZWFkZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2UtdGl0bGVcIj5cbiAgICAgICAgXHVEODNFXHVERDE2ICR7dCgnZmFybS50aXRsZScpfVxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwid3BsYWNlLW1pbmltaXplXCI+XHUyMjEyPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cIndwbGFjZS1jb250ZW50XCI+XG4gICAgICA8IS0tIEVzdGFkbyB5IGNvbnRyb2xlcyBwcmluY2lwYWxlcyAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc2VjdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXR1c1wiIGlkPVwic3RhdHVzXCI+XHVEODNEXHVEQ0E0ICR7dCgnZmFybS5zdG9wcGVkJyl9PC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXRzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXQtdmFsdWVcIiBpZD1cInBhaW50ZWQtY291bnRcIj4wPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXQtbGFiZWxcIj4ke3QoJ2Zhcm0ucGFpbnRlZCcpfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc3RhdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0LXZhbHVlXCIgaWQ9XCJjaGFyZ2VzLWNvdW50XCI+MDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0LWxhYmVsXCI+JHt0KCdmYXJtLmNoYXJnZXMnKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc3RhdC12YWx1ZVwiIGlkPVwicmV0cnktY291bnRcIj4wPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXN0YXQtbGFiZWxcIj4ke3QoJ2Zhcm0ucmV0cmllcycpfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc3RhdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0LXZhbHVlXCIgaWQ9XCJ0aWxlLXBvc1wiPjAsMDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zdGF0LWxhYmVsXCI+JHt0KCdmYXJtLnRpbGUnKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLWJ1dHRvbnNcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwid3BsYWNlLWJ1dHRvbiBzdGFydFwiIGlkPVwic3RhcnQtYnRuXCI+XHUyNUI2XHVGRTBGICR7dCgnZmFybS5zdGFydCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ3cGxhY2UtYnV0dG9uIHN0b3BcIiBpZD1cInN0b3AtYnRuXCIgZGlzYWJsZWQ+XHUyM0Y5XHVGRTBGICR7dCgnZmFybS5zdG9wJyl9PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIndwbGFjZS1idXR0b24gc21hbGxcIiBpZD1cInNlbGVjdC1wb3NpdGlvbi1idG5cIj5cdUQ4M0NcdURGMEQgJHt0KCdmYXJtLnNlbGVjdFBvc2l0aW9uJyl9PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIndwbGFjZS1idXR0b24gc21hbGxcIiBpZD1cIm9uY2UtYnRuXCI+XHVEODNDXHVERkE4ICR7dCgnZmFybS5wYWludE9uY2UnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8IS0tIEluZm9ybWFjaVx1MDBGM24gZGUgbGEgem9uYSBzZWxlY2Npb25hZGEgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utem9uZS1pbmZvXCIgaWQ9XCJ6b25lLWluZm9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXpvbmUtdGV4dFwiPlx1RDgzRFx1RENDRCAke3QoJ2Zhcm0ucG9zaXRpb25JbmZvJyl9OiA8c3BhbiBpZD1cInpvbmUtZGlzcGxheVwiPiR7dCgnZmFybS5ub1Bvc2l0aW9uJyl9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utem9uZS13YXJuaW5nXCI+XHUyNkEwXHVGRTBGICR7dCgnZmFybS5zZWxlY3RFbXB0eUFyZWEnKX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLWhlYWx0aFwiIGlkPVwiaGVhbHRoLXN0YXR1c1wiPlx1RDgzRFx1REQwRCAke3QoJ2Zhcm0uY2hlY2tpbmdTdGF0dXMnKX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8IS0tIENvbmZpZ3VyYWNpXHUwMEYzbiBiXHUwMEUxc2ljYSAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc2VjdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXNlY3Rpb24tdGl0bGVcIj5cdTI2OTlcdUZFMEYgJHt0KCdmYXJtLmNvbmZpZ3VyYXRpb24nKX08L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utcm93XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3cGxhY2UtbGFiZWxcIj4ke3QoJ2Zhcm0uZGVsYXknKX06PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJ3cGxhY2UtaW5wdXRcIiBpZD1cImRlbGF5LWlucHV0XCIgbWluPVwiMTAwMFwiIG1heD1cIjMwMDAwMFwiIHN0ZXA9XCIxMDAwXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1yb3dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIndwbGFjZS1sYWJlbFwiPiR7dCgnZmFybS5waXhlbHNQZXJCYXRjaCcpfTo8L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cIndwbGFjZS1pbnB1dFwiIGlkPVwicGl4ZWxzLWlucHV0XCIgbWluPVwiMVwiIG1heD1cIjUwXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1yb3dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIndwbGFjZS1sYWJlbFwiPiR7dCgnZmFybS5taW5DaGFyZ2VzJyl9Ojwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwid3BsYWNlLWlucHV0XCIgaWQ9XCJtaW4tY2hhcmdlcy1pbnB1dFwiIG1pbj1cIjBcIiBtYXg9XCI1MFwiIHN0ZXA9XCIwLjFcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXJvd1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwid3BsYWNlLWxhYmVsXCI+JHt0KCdmYXJtLmNvbG9yTW9kZScpfTo8L3NwYW4+XG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cIndwbGFjZS1zZWxlY3RcIiBpZD1cImNvbG9yLW1vZGUtc2VsZWN0XCI+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmFuZG9tXCI+JHt0KCdmYXJtLnJhbmRvbScpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImZpeGVkXCI+JHt0KCdmYXJtLmZpeGVkJyl9PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1yb3dcIiBpZD1cImNvbG9yLXJhbmdlLXJvd1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwid3BsYWNlLWxhYmVsXCI+JHt0KCdmYXJtLnJhbmdlJyl9Ojwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwid3BsYWNlLWlucHV0XCIgaWQ9XCJjb2xvci1taW4taW5wdXRcIiBtaW49XCIxXCIgbWF4PVwiMzJcIiBzdHlsZT1cIndpZHRoOiAzNXB4O1wiPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICNjYmQ1ZTA7XCI+LTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwid3BsYWNlLWlucHV0XCIgaWQ9XCJjb2xvci1tYXgtaW5wdXRcIiBtaW49XCIxXCIgbWF4PVwiMzJcIiBzdHlsZT1cIndpZHRoOiAzNXB4O1wiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utcm93XCIgaWQ9XCJjb2xvci1maXhlZC1yb3dcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3cGxhY2UtbGFiZWxcIj4ke3QoJ2Zhcm0uZml4ZWRDb2xvcicpfTo8L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cIndwbGFjZS1pbnB1dFwiIGlkPVwiY29sb3ItZml4ZWQtaW5wdXRcIiBtaW49XCIxXCIgbWF4PVwiMzJcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPCEtLSBDb25maWd1cmFjaVx1MDBGM24gYXZhbnphZGEgKGNvbGFwc2FibGUpIC0tPlxuICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1zZWN0aW9uXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utc2VjdGlvbi10aXRsZVwiIGlkPVwiYWR2YW5jZWQtdG9nZ2xlXCI+XG4gICAgICAgICAgXHVEODNEXHVERDI3ICR7dCgnZmFybS5hZHZhbmNlZCcpfSA8c3BhbiBpZD1cImFkdmFuY2VkLWFycm93XCI+XHUyNUI2PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2UtYWR2YW5jZWRcIiBpZD1cImFkdmFuY2VkLXNlY3Rpb25cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1yb3dcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwid3BsYWNlLWxhYmVsXCI+JHt0KCdmYXJtLnRpbGVYJyl9Ojwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJ3cGxhY2UtaW5wdXRcIiBpZD1cInRpbGUteC1pbnB1dFwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGxhY2Utcm93XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIndwbGFjZS1sYWJlbFwiPiR7dCgnZmFybS50aWxlWScpfTo8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwid3BsYWNlLWlucHV0XCIgaWQ9XCJ0aWxlLXktaW5wdXRcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLXJvd1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3cGxhY2UtbGFiZWxcIj4ke3QoJ2Zhcm0uY3VzdG9tUGFsZXR0ZScpfTo8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndwbGFjZS1yb3dcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwid3BsYWNlLWlucHV0IHdpZGVcIiBpZD1cImN1c3RvbS1wYWxldHRlLWlucHV0XCIgXG4gICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIke3QoJ2Zhcm0ucGFsZXR0ZUV4YW1wbGUnKX1cIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3BsYWNlLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ3cGxhY2UtYnV0dG9uIHNtYWxsXCIgaWQ9XCJzYXZlLWJ0blwiPlx1RDgzRFx1RENCRSAke3QoJ2NvbW1vbi5zYXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwid3BsYWNlLWJ1dHRvbiBzbWFsbFwiIGlkPVwibG9hZC1idG5cIj5cdUQ4M0RcdURDQzEgJHt0KCdjb21tb24ubG9hZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIndwbGFjZS1idXR0b24gc21hbGxcIiBpZD1cInJlc2V0LWJ0blwiPlx1RDgzRFx1REQwNCAke3QoJ2NvbW1vbi5yZXNldCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIndwbGFjZS1idXR0b24gc21hbGxcIiBpZD1cImNhcHR1cmUtYnRuXCI+XHVEODNEXHVEQ0Y4ICR7dCgnZmFybS5jYXB0dXJlJyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG4gIFxuICBzaGFkb3cuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaGFkb3dIb3N0KTtcbiAgXG4gIC8vIEhhY2VyIGVsIHBhbmVsIGFycmFzdHJhYmxlXG4gIGNvbnN0IGhlYWRlciA9IHNoYWRvdy5xdWVyeVNlbGVjdG9yKCcud3BsYWNlLWhlYWRlcicpO1xuICBkcmFnSGVhZGVyKGhlYWRlciwgc2hhZG93SG9zdCk7XG4gIFxuICAvLyBSZWZlcmVuY2lhcyBhIGVsZW1lbnRvc1xuICBjb25zdCBlbGVtZW50cyA9IHtcbiAgICBtaW5pbWl6ZUJ0bjogc2hhZG93LnF1ZXJ5U2VsZWN0b3IoJy53cGxhY2UtbWluaW1pemUnKSxcbiAgICBjb250ZW50OiBzaGFkb3cucXVlcnlTZWxlY3RvcignLndwbGFjZS1jb250ZW50JyksXG4gICAgc3RhdHVzOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1cycpLFxuICAgIHBhaW50ZWRDb3VudDogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdwYWludGVkLWNvdW50JyksXG4gICAgY2hhcmdlc0NvdW50OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJnZXMtY291bnQnKSxcbiAgICByZXRyeUNvdW50OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3JldHJ5LWNvdW50JyksXG4gICAgdGlsZVBvczogc2hhZG93LmdldEVsZW1lbnRCeUlkKCd0aWxlLXBvcycpLFxuICAgIHN0YXJ0QnRuOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LWJ0bicpLFxuICAgIHN0b3BCdG46IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnc3RvcC1idG4nKSxcbiAgICBzZWxlY3RQb3NpdGlvbkJ0bjogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdzZWxlY3QtcG9zaXRpb24tYnRuJyksXG4gICAgb25jZUJ0bjogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdvbmNlLWJ0bicpLFxuICAgIHpvbmVJbmZvOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3pvbmUtaW5mbycpLFxuICAgIHpvbmVEaXNwbGF5OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3pvbmUtZGlzcGxheScpLFxuICAgIGhlYWx0aFN0YXR1czogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdoZWFsdGgtc3RhdHVzJyksXG4gICAgZGVsYXlJbnB1dDogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdkZWxheS1pbnB1dCcpLFxuICAgIHBpeGVsc0lucHV0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVscy1pbnB1dCcpLFxuICAgIG1pbkNoYXJnZXNJbnB1dDogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdtaW4tY2hhcmdlcy1pbnB1dCcpLFxuICAgIGNvbG9yTW9kZVNlbGVjdDogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdjb2xvci1tb2RlLXNlbGVjdCcpLFxuICAgIGNvbG9yUmFuZ2VSb3c6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnY29sb3ItcmFuZ2Utcm93JyksXG4gICAgY29sb3JGaXhlZFJvdzogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdjb2xvci1maXhlZC1yb3cnKSxcbiAgICBjb2xvck1pbklucHV0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLW1pbi1pbnB1dCcpLFxuICAgIGNvbG9yTWF4SW5wdXQ6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnY29sb3ItbWF4LWlucHV0JyksXG4gICAgY29sb3JGaXhlZElucHV0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLWZpeGVkLWlucHV0JyksXG4gICAgYWR2YW5jZWRUb2dnbGU6IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnYWR2YW5jZWQtdG9nZ2xlJyksXG4gICAgYWR2YW5jZWRTZWN0aW9uOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2FkdmFuY2VkLXNlY3Rpb24nKSxcbiAgICBhZHZhbmNlZEFycm93OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2FkdmFuY2VkLWFycm93JyksXG4gICAgdGlsZVhJbnB1dDogc2hhZG93LmdldEVsZW1lbnRCeUlkKCd0aWxlLXgtaW5wdXQnKSxcbiAgICB0aWxlWUlucHV0OiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ3RpbGUteS1pbnB1dCcpLFxuICAgIGN1c3RvbVBhbGV0dGVJbnB1dDogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdjdXN0b20tcGFsZXR0ZS1pbnB1dCcpLFxuICAgIHNhdmVCdG46IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgnc2F2ZS1idG4nKSxcbiAgICBsb2FkQnRuOiBzaGFkb3cuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtYnRuJyksXG4gICAgcmVzZXRCdG46IHNoYWRvdy5nZXRFbGVtZW50QnlJZCgncmVzZXQtYnRuJyksXG4gICAgY2FwdHVyZUJ0bjogc2hhZG93LmdldEVsZW1lbnRCeUlkKCdjYXB0dXJlLWJ0bicpXG4gIH07XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIGxvcyB2YWxvcmVzIGRlIGxvcyBpbnB1dHMgZGVzZGUgbGEgY29uZmlndXJhY2lcdTAwRjNuXG4gIGZ1bmN0aW9uIHVwZGF0ZUlucHV0c0Zyb21Db25maWcoKSB7XG4gICAgZWxlbWVudHMuZGVsYXlJbnB1dC52YWx1ZSA9IGNvbmZpZy5ERUxBWV9NUztcbiAgICBlbGVtZW50cy5waXhlbHNJbnB1dC52YWx1ZSA9IGNvbmZpZy5QSVhFTFNfUEVSX0JBVENIO1xuICAgIGVsZW1lbnRzLm1pbkNoYXJnZXNJbnB1dC52YWx1ZSA9IGNvbmZpZy5NSU5fQ0hBUkdFUztcbiAgICBlbGVtZW50cy5jb2xvck1vZGVTZWxlY3QudmFsdWUgPSBjb25maWcuQ09MT1JfTU9ERTtcbiAgICBlbGVtZW50cy5jb2xvck1pbklucHV0LnZhbHVlID0gY29uZmlnLkNPTE9SX01JTjtcbiAgICBlbGVtZW50cy5jb2xvck1heElucHV0LnZhbHVlID0gY29uZmlnLkNPTE9SX01BWDtcbiAgICBlbGVtZW50cy5jb2xvckZpeGVkSW5wdXQudmFsdWUgPSBjb25maWcuQ09MT1JfRklYRUQ7XG4gICAgZWxlbWVudHMudGlsZVhJbnB1dC52YWx1ZSA9IGNvbmZpZy5USUxFX1ggfHwgJyc7XG4gICAgZWxlbWVudHMudGlsZVlJbnB1dC52YWx1ZSA9IGNvbmZpZy5USUxFX1kgfHwgJyc7XG4gICAgZWxlbWVudHMuY3VzdG9tUGFsZXR0ZUlucHV0LnZhbHVlID0gKGNvbmZpZy5DVVNUT01fUEFMRVRURSB8fCBbXSkuam9pbignLCcpO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgdmlzaWJpbGlkYWQgZGUgY29udHJvbGVzIGRlIGNvbG9yXG4gICAgdXBkYXRlQ29sb3JNb2RlVmlzaWJpbGl0eSgpO1xuICAgIHVwZGF0ZVRpbGVEaXNwbGF5KCk7XG4gICAgdXBkYXRlWm9uZURpc3BsYXkoKTtcbiAgICB1cGRhdGVCdXR0b25TdGF0ZXMoZmFybVN0YXRlPy5ydW5uaW5nIHx8IGZhbHNlKTtcbiAgfVxuICBcbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgYWN0dWFsaXphciBsYSBjb25maWd1cmFjaVx1MDBGM24gZGVzZGUgbG9zIGlucHV0c1xuICBmdW5jdGlvbiB1cGRhdGVDb25maWdGcm9tSW5wdXRzKCkge1xuICAgIGNvbmZpZy5ERUxBWV9NUyA9IHBhcnNlSW50KGVsZW1lbnRzLmRlbGF5SW5wdXQudmFsdWUpIHx8IEZBUk1fREVGQVVMVFMuREVMQVlfTVM7XG4gICAgY29uZmlnLlBJWEVMU19QRVJfQkFUQ0ggPSBjbGFtcChwYXJzZUludChlbGVtZW50cy5waXhlbHNJbnB1dC52YWx1ZSkgfHwgRkFSTV9ERUZBVUxUUy5QSVhFTFNfUEVSX0JBVENILCAxLCA1MCk7XG4gICAgY29uZmlnLk1JTl9DSEFSR0VTID0gcGFyc2VGbG9hdChlbGVtZW50cy5taW5DaGFyZ2VzSW5wdXQudmFsdWUpIHx8IEZBUk1fREVGQVVMVFMuTUlOX0NIQVJHRVM7XG4gICAgY29uZmlnLkNPTE9SX01PREUgPSBlbGVtZW50cy5jb2xvck1vZGVTZWxlY3QudmFsdWU7XG4gICAgY29uZmlnLkNPTE9SX01JTiA9IGNsYW1wKHBhcnNlSW50KGVsZW1lbnRzLmNvbG9yTWluSW5wdXQudmFsdWUpIHx8IEZBUk1fREVGQVVMVFMuQ09MT1JfTUlOLCAxLCAzMik7XG4gICAgY29uZmlnLkNPTE9SX01BWCA9IGNsYW1wKHBhcnNlSW50KGVsZW1lbnRzLmNvbG9yTWF4SW5wdXQudmFsdWUpIHx8IEZBUk1fREVGQVVMVFMuQ09MT1JfTUFYLCAxLCAzMik7XG4gICAgY29uZmlnLkNPTE9SX0ZJWEVEID0gY2xhbXAocGFyc2VJbnQoZWxlbWVudHMuY29sb3JGaXhlZElucHV0LnZhbHVlKSB8fCBGQVJNX0RFRkFVTFRTLkNPTE9SX0ZJWEVELCAxLCAzMik7XG4gICAgXG4gICAgLy8gQXNlZ3VyYXIgcXVlIE1JTiA8PSBNQVhcbiAgICBpZiAoY29uZmlnLkNPTE9SX01JTiA+IGNvbmZpZy5DT0xPUl9NQVgpIHtcbiAgICAgIGNvbmZpZy5DT0xPUl9NQVggPSBjb25maWcuQ09MT1JfTUlOO1xuICAgICAgZWxlbWVudHMuY29sb3JNYXhJbnB1dC52YWx1ZSA9IGNvbmZpZy5DT0xPUl9NQVg7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHRpbGVYID0gcGFyc2VJbnQoZWxlbWVudHMudGlsZVhJbnB1dC52YWx1ZSk7XG4gICAgY29uc3QgdGlsZVkgPSBwYXJzZUludChlbGVtZW50cy50aWxlWUlucHV0LnZhbHVlKTtcbiAgICBpZiAoTnVtYmVyLmlzRmluaXRlKHRpbGVYKSkgY29uZmlnLlRJTEVfWCA9IHRpbGVYO1xuICAgIGlmIChOdW1iZXIuaXNGaW5pdGUodGlsZVkpKSBjb25maWcuVElMRV9ZID0gdGlsZVk7XG4gICAgXG4gICAgdXBkYXRlVGlsZURpc3BsYXkoKTtcbiAgICB1cGRhdGVab25lRGlzcGxheSgpO1xuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIHZpc2liaWxpZGFkIGRlIGNvbnRyb2xlcyBkZSBtb2RvIGRlIGNvbG9yXG4gIGZ1bmN0aW9uIHVwZGF0ZUNvbG9yTW9kZVZpc2liaWxpdHkoKSB7XG4gICAgY29uc3QgbW9kZSA9IGVsZW1lbnRzLmNvbG9yTW9kZVNlbGVjdC52YWx1ZTtcbiAgICBlbGVtZW50cy5jb2xvclJhbmdlUm93LnN0eWxlLmRpc3BsYXkgPSBtb2RlID09PSAncmFuZG9tJyA/ICdmbGV4JyA6ICdub25lJztcbiAgICBlbGVtZW50cy5jb2xvckZpeGVkUm93LnN0eWxlLmRpc3BsYXkgPSBtb2RlID09PSAnZml4ZWQnID8gJ2ZsZXgnIDogJ25vbmUnO1xuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIGRpc3BsYXkgZGVsIHRpbGVcbiAgZnVuY3Rpb24gdXBkYXRlVGlsZURpc3BsYXkoKSB7XG4gICAgaWYgKGVsZW1lbnRzLnRpbGVQb3MpIHtcbiAgICAgIGVsZW1lbnRzLnRpbGVQb3MudGV4dENvbnRlbnQgPSBgJHtjb25maWcuVElMRV9YIHx8IDB9LCR7Y29uZmlnLlRJTEVfWSB8fCAwfWA7XG4gICAgfVxuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIGVsIGRpc3BsYXkgZGUgbGEgem9uYSBzZWxlY2Npb25hZGFcbiAgZnVuY3Rpb24gdXBkYXRlWm9uZURpc3BsYXkoKSB7XG4gICAgaWYgKGVsZW1lbnRzLnpvbmVEaXNwbGF5KSB7XG4gICAgICBpZiAoY29uZmlnLlBPU0lUSU9OX1NFTEVDVEVEICYmIGNvbmZpZy5CQVNFX1ggIT09IG51bGwgJiYgY29uZmlnLkJBU0VfWSAhPT0gbnVsbCkge1xuICAgICAgICBlbGVtZW50cy56b25lRGlzcGxheS50ZXh0Q29udGVudCA9IHQoJ2Zhcm0uY3VycmVudFpvbmUnLCB7IHg6IGNvbmZpZy5CQVNFX1gsIHk6IGNvbmZpZy5CQVNFX1kgfSk7XG4gICAgICAgIGVsZW1lbnRzLnpvbmVEaXNwbGF5LnN0eWxlLmNvbG9yID0gJyM0OGJiNzgnOyAvLyBWZXJkZSBwYXJhIGluZGljYXIgYWN0aXZhXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50cy56b25lRGlzcGxheS50ZXh0Q29udGVudCA9IHQoJ2Zhcm0ubm9Qb3NpdGlvbicpO1xuICAgICAgICBlbGVtZW50cy56b25lRGlzcGxheS5zdHlsZS5jb2xvciA9ICcjZjU2NTY1JzsgLy8gUm9qbyBwYXJhIGluZGljYXIgbm8gc2VsZWNjaW9uYWRhXG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgZXN0YWRvIGRlIGJvdG9uZXMgY3VhbmRvIGNhbWJpZSBsYSB6b25hXG4gICAgdXBkYXRlQnV0dG9uU3RhdGVzKGZhcm1TdGF0ZT8ucnVubmluZyB8fCBmYWxzZSk7XG4gIH1cbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVyc1xuICBlbGVtZW50cy5taW5pbWl6ZUJ0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgdWlTdGF0ZS5taW5pbWl6ZWQgPSAhdWlTdGF0ZS5taW5pbWl6ZWQ7XG4gICAgZWxlbWVudHMuY29udGVudC5jbGFzc0xpc3QudG9nZ2xlKCdtaW5pbWl6ZWQnLCB1aVN0YXRlLm1pbmltaXplZCk7XG4gICAgZWxlbWVudHMubWluaW1pemVCdG4udGV4dENvbnRlbnQgPSB1aVN0YXRlLm1pbmltaXplZCA/ICcrJyA6ICdcdTIyMTInO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLnN0YXJ0QnRuPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB1cGRhdGVDb25maWdGcm9tSW5wdXRzKCk7XG4gICAgb25TdGFydCgpO1xuICAgIHVwZGF0ZUJ1dHRvblN0YXRlcyh0cnVlKTtcbiAgfSk7XG4gIFxuICBlbGVtZW50cy5zdG9wQnRuPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBvblN0b3AoKTtcbiAgICB1cGRhdGVCdXR0b25TdGF0ZXMoZmFsc2UpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLm9uY2VCdG4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIC8vIEFzZWd1cmFyIHF1ZSBpbnB1dHMgcmVmbGVqYW4gbGEgXHUwMEZBbHRpbWEgY2FwdHVyYS9jYWxpYnJhY2lcdTAwRjNuXG4gICAgdXBkYXRlSW5wdXRzRnJvbUNvbmZpZygpO1xuICAgIHVwZGF0ZUNvbmZpZ0Zyb21JbnB1dHMoKTtcbiAgICAvLyBMbGFtYXIgYSBsYSBmdW5jaVx1MDBGM24gZGUgcGludGFyIHVuYSB2ZXogc2kgZXhpc3RlXG4gICAgaWYgKHdpbmRvdy5XUEFVSSAmJiB3aW5kb3cuV1BBVUkub25jZSkge1xuICAgICAgd2luZG93LldQQVVJLm9uY2UoKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuc2VsZWN0UG9zaXRpb25CdG4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHNlbGVjdEZhcm1Qb3NpdGlvbihjb25maWcsIHNldFN0YXR1cywgdXBkYXRlWm9uZURpc3BsYXkpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLmNvbG9yTW9kZVNlbGVjdD8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIHVwZGF0ZUNvbG9yTW9kZVZpc2liaWxpdHkoKTtcbiAgICB1cGRhdGVDb25maWdGcm9tSW5wdXRzKCk7XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuY3VzdG9tUGFsZXR0ZUlucHV0Py5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICB1cGRhdGVDb25maWdGcm9tSW5wdXRzKCk7XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuYWR2YW5jZWRUb2dnbGU/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHVpU3RhdGUuc2hvd0FkdmFuY2VkID0gIXVpU3RhdGUuc2hvd0FkdmFuY2VkO1xuICAgIGVsZW1lbnRzLmFkdmFuY2VkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gdWlTdGF0ZS5zaG93QWR2YW5jZWQgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIGVsZW1lbnRzLmFkdmFuY2VkQXJyb3cudGV4dENvbnRlbnQgPSB1aVN0YXRlLnNob3dBZHZhbmNlZCA/ICdcdTI1QkMnIDogJ1x1MjVCNic7XG4gIH0pO1xuICBcbiAgLy8gTGlzdGVuZXJzIHBhcmEgaW5wdXRzIChhY3R1YWxpemFjaVx1MDBGM24gYXV0b21cdTAwRTF0aWNhKVxuICBbJ2RlbGF5SW5wdXQnLCAncGl4ZWxzSW5wdXQnLCAnbWluQ2hhcmdlc0lucHV0JywgJ2NvbG9yTWluSW5wdXQnLCAnY29sb3JNYXhJbnB1dCcsICdjb2xvckZpeGVkSW5wdXQnLCAndGlsZVhJbnB1dCcsICd0aWxlWUlucHV0J10uZm9yRWFjaChpbnB1dE5hbWUgPT4ge1xuICAgIGVsZW1lbnRzW2lucHV0TmFtZV0/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZUNvbmZpZ0Zyb21JbnB1dHMpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLnNhdmVCdG4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHVwZGF0ZUNvbmZpZ0Zyb21JbnB1dHMoKTtcbiAgICBzYXZlRmFybUNmZyhjb25maWcpO1xuICAgIHNldFN0YXR1cyhgXHVEODNEXHVEQ0JFICR7dCgnZmFybS5jb25maWdTYXZlZCcpfWAsICdzdWNjZXNzJyk7XG4gIH0pO1xuICBcbiAgZWxlbWVudHMubG9hZEJ0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gbG9hZEZhcm1DZmcoRkFSTV9ERUZBVUxUUyk7XG4gICAgT2JqZWN0LmFzc2lnbihjb25maWcsIGxvYWRlZCk7XG4gICAgdXBkYXRlSW5wdXRzRnJvbUNvbmZpZygpO1xuICAgIHNldFN0YXR1cyhgXHVEODNEXHVEQ0MxICR7dCgnZmFybS5jb25maWdMb2FkZWQnKX1gLCAnc3VjY2VzcycpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLnJlc2V0QnRuPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZXNldEZhcm1DZmcoKTtcbiAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgRkFSTV9ERUZBVUxUUyk7XG4gICAgdXBkYXRlSW5wdXRzRnJvbUNvbmZpZygpO1xuICAgIHNldFN0YXR1cyhgXHVEODNEXHVERDA0ICR7dCgnZmFybS5jb25maWdSZXNldCcpfWAsICdzdWNjZXNzJyk7XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuY2FwdHVyZUJ0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgLy8gRnVuY2lcdTAwRjNuIGRlIGNhcHR1cmEgLSBzZXJcdTAwRTEgaW1wbGVtZW50YWRhXG4gICAgc2V0U3RhdHVzKGBcdUQ4M0RcdURDRjggJHt0KCdmYXJtLmNhcHR1cmVJbnN0cnVjdGlvbnMnKX1gLCAnc3RhdHVzJyk7XG4gICAgLy8gQXF1XHUwMEVEIGlyXHUwMEVEYSBsYSBsXHUwMEYzZ2ljYSBkZSBjYXB0dXJhXG4gIH0pO1xuICBcbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgYWN0dWFsaXphciBlc3RhZG8gZGUgYm90b25lc1xuICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdGF0ZXMocnVubmluZykge1xuICAgIGlmIChlbGVtZW50cy5zdGFydEJ0bikge1xuICAgICAgLy8gRWwgYm90XHUwMEYzbiBkZSBpbmljaW8gZXN0XHUwMEUxIGRlc2hhYmlsaXRhZG8gc2k6XG4gICAgICAvLyAxLiBFbCBib3QgZXN0XHUwMEUxIGNvcnJpZW5kbywgT1xuICAgICAgLy8gMi4gTm8gc2UgaGEgc2VsZWNjaW9uYWRvIHVuYSB6b25hXG4gICAgICBjb25zdCBub1pvbmVTZWxlY3RlZCA9ICFjb25maWcuUE9TSVRJT05fU0VMRUNURUQgfHwgY29uZmlnLkJBU0VfWCA9PT0gbnVsbCB8fCBjb25maWcuQkFTRV9ZID09PSBudWxsO1xuICAgICAgZWxlbWVudHMuc3RhcnRCdG4uZGlzYWJsZWQgPSBydW5uaW5nIHx8IG5vWm9uZVNlbGVjdGVkO1xuICAgICAgXG4gICAgICAvLyBDYW1iaWFyIHRleHRvIGRlbCBib3RcdTAwRjNuIHNlZ1x1MDBGQW4gZWwgZXN0YWRvXG4gICAgICBpZiAobm9ab25lU2VsZWN0ZWQpIHtcbiAgICAgICAgZWxlbWVudHMuc3RhcnRCdG4udGV4dENvbnRlbnQgPSBgXHVEODNEXHVERUFCICR7dCgnZmFybS5zZWxlY3RQb3NpdGlvbicpfSBcdTI2QTBcdUZFMEZgO1xuICAgICAgICBlbGVtZW50cy5zdGFydEJ0bi50aXRsZSA9IHQoJ2Zhcm0ubWlzc2luZ1Bvc2l0aW9uJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50cy5zdGFydEJ0bi50ZXh0Q29udGVudCA9IGBcdTI1QjZcdUZFMEYgJHt0KCdmYXJtLnN0YXJ0Jyl9YDtcbiAgICAgICAgZWxlbWVudHMuc3RhcnRCdG4udGl0bGUgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVsZW1lbnRzLnN0b3BCdG4pIGVsZW1lbnRzLnN0b3BCdG4uZGlzYWJsZWQgPSAhcnVubmluZztcbiAgfVxuICBcbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgYWN0dWFsaXphciBlbCBlc3RhZG8gdmlzdWFsXG4gIGZ1bmN0aW9uIHNldFN0YXR1cyhtZXNzYWdlLCB0eXBlID0gJ3N0YXR1cycpIHtcbiAgICBpZiAoZWxlbWVudHMuc3RhdHVzKSB7XG4gICAgICBlbGVtZW50cy5zdGF0dXMudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgZWxlbWVudHMuc3RhdHVzLmNsYXNzTmFtZSA9IGB3cGxhY2Utc3RhdHVzICR7dHlwZX1gO1xuICAgICAgbG9nKGBTdGF0dXM6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGFjdHVhbGl6YXIgZXN0YWRcdTAwRURzdGljYXNcbiAgZnVuY3Rpb24gdXBkYXRlU3RhdHMocGFpbnRlZCwgY2hhcmdlcywgcmV0cmllcyA9IDAsIGhlYWx0aCA9IG51bGwpIHtcbiAgICBpZiAoZWxlbWVudHMucGFpbnRlZENvdW50KSB7XG4gICAgICBlbGVtZW50cy5wYWludGVkQ291bnQudGV4dENvbnRlbnQgPSBwYWludGVkIHx8IDA7XG4gICAgfVxuICAgIGlmIChlbGVtZW50cy5jaGFyZ2VzQ291bnQpIHtcbiAgICAgIGVsZW1lbnRzLmNoYXJnZXNDb3VudC50ZXh0Q29udGVudCA9IHR5cGVvZiBjaGFyZ2VzID09PSAnbnVtYmVyJyA/IGNoYXJnZXMudG9GaXhlZCgxKSA6ICcwJztcbiAgICB9XG4gICAgaWYgKGVsZW1lbnRzLnJldHJ5Q291bnQpIHtcbiAgICAgIGVsZW1lbnRzLnJldHJ5Q291bnQudGV4dENvbnRlbnQgPSByZXRyaWVzIHx8IDA7XG4gICAgfVxuICAgIGlmIChlbGVtZW50cy5oZWFsdGhTdGF0dXMgJiYgaGVhbHRoKSB7XG4gICAgICBlbGVtZW50cy5oZWFsdGhTdGF0dXMudGV4dENvbnRlbnQgPSBoZWFsdGgudXAgPyBgXHVEODNEXHVERkUyICR7dCgnZmFybS5iYWNrZW5kT25saW5lJyl9YCA6IGBcdUQ4M0RcdUREMzQgJHt0KCdmYXJtLmJhY2tlbmRPZmZsaW5lJyl9YDtcbiAgICAgIGVsZW1lbnRzLmhlYWx0aFN0YXR1cy5jbGFzc05hbWUgPSBgd3BsYWNlLWhlYWx0aCAke2hlYWx0aC51cCA/ICdvbmxpbmUnIDogJ29mZmxpbmUnfWA7XG4gICAgfVxuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBlZmVjdG8gdmlzdWFsIGRlIGZsYXNoXG4gIGZ1bmN0aW9uIGZsYXNoRWZmZWN0KCkge1xuICAgIGNvbnRhaW5lci5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDIwcHggIzQ4YmI3OCc7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb250YWluZXIuc3R5bGUuYm94U2hhZG93ID0gJzAgMTBweCAyNXB4IHJnYmEoMCwwLDAsMC4zKSc7XG4gICAgfSwgMjAwKTtcbiAgfVxuICBcbiAgLy8gSW5pY2lhbGl6YXIgdmFsb3Jlc1xuICB1cGRhdGVJbnB1dHNGcm9tQ29uZmlnKCk7XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIHRleHRvcyBjdWFuZG8gY2FtYmllIGVsIGlkaW9tYVxuICBmdW5jdGlvbiB1cGRhdGVUZXh0cygpIHtcbiAgICAvLyBBY3R1YWxpemFyIHRcdTAwRUR0dWxvXG4gICAgY29uc3QgdGl0bGUgPSBzaGFkb3cucXVlcnlTZWxlY3RvcignLndwbGFjZS10aXRsZScpO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgdGl0bGUuaW5uZXJIVE1MID0gYFx1RDgzRVx1REQxNiAke3QoJ2Zhcm0udGl0bGUnKX1gO1xuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGJvdG9uZXNcbiAgICBpZiAoZWxlbWVudHMuc3RhcnRCdG4pIGVsZW1lbnRzLnN0YXJ0QnRuLmlubmVySFRNTCA9IGBcdTI1QjZcdUZFMEYgJHt0KCdmYXJtLnN0YXJ0Jyl9YDtcbiAgICBpZiAoZWxlbWVudHMuc3RvcEJ0bikgZWxlbWVudHMuc3RvcEJ0bi5pbm5lckhUTUwgPSBgXHUyM0Y5XHVGRTBGICR7dCgnZmFybS5zdG9wJyl9YDtcbiAgICBpZiAoZWxlbWVudHMuc2VsZWN0UG9zaXRpb25CdG4pIGVsZW1lbnRzLnNlbGVjdFBvc2l0aW9uQnRuLmlubmVySFRNTCA9IGBcdUQ4M0NcdURGMEQgJHt0KCdmYXJtLnNlbGVjdFBvc2l0aW9uJyl9YDtcbiAgICBpZiAoZWxlbWVudHMub25jZUJ0bikgZWxlbWVudHMub25jZUJ0bi5pbm5lckhUTUwgPSBgXHVEODNDXHVERkE4ICR7dCgnZmFybS5wYWludE9uY2UnKX1gO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgZXRpcXVldGFzIGRlIGVzdGFkXHUwMEVEc3RpY2FzXG4gICAgY29uc3QgcGFpbnRlZExhYmVsID0gc2hhZG93LnF1ZXJ5U2VsZWN0b3IoJyNwYWludGVkLWNvdW50JykucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud3BsYWNlLXN0YXQtbGFiZWwnKTtcbiAgICBjb25zdCBjaGFyZ2VzTGFiZWwgPSBzaGFkb3cucXVlcnlTZWxlY3RvcignI2NoYXJnZXMtY291bnQnKS5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGxhY2Utc3RhdC1sYWJlbCcpO1xuICAgIGNvbnN0IHJldHJ5TGFiZWwgPSBzaGFkb3cucXVlcnlTZWxlY3RvcignI3JldHJ5LWNvdW50JykucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud3BsYWNlLXN0YXQtbGFiZWwnKTtcbiAgICBjb25zdCB0aWxlTGFiZWwgPSBzaGFkb3cucXVlcnlTZWxlY3RvcignI3RpbGUtcG9zJykucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud3BsYWNlLXN0YXQtbGFiZWwnKTtcbiAgICBcbiAgICBpZiAocGFpbnRlZExhYmVsKSBwYWludGVkTGFiZWwudGV4dENvbnRlbnQgPSB0KCdmYXJtLnBhaW50ZWQnKTtcbiAgICBpZiAoY2hhcmdlc0xhYmVsKSBjaGFyZ2VzTGFiZWwudGV4dENvbnRlbnQgPSB0KCdmYXJtLmNoYXJnZXMnKTtcbiAgICBpZiAocmV0cnlMYWJlbCkgcmV0cnlMYWJlbC50ZXh0Q29udGVudCA9IHQoJ2Zhcm0ucmV0cmllcycpO1xuICAgIGlmICh0aWxlTGFiZWwpIHRpbGVMYWJlbC50ZXh0Q29udGVudCA9IHQoJ2Zhcm0udGlsZScpO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgc2VjY2lvbmVzXG4gICAgY29uc3QgY29uZmlnVGl0bGUgPSBzaGFkb3cucXVlcnlTZWxlY3RvcignLndwbGFjZS1zZWN0aW9uLXRpdGxlJyk7XG4gICAgaWYgKGNvbmZpZ1RpdGxlKSBjb25maWdUaXRsZS5pbm5lckhUTUwgPSBgXHUyNjk5XHVGRTBGICR7dCgnZmFybS5jb25maWd1cmF0aW9uJyl9YDtcbiAgICBcbiAgICBjb25zdCBhZHZhbmNlZFRpdGxlID0gc2hhZG93LmdldEVsZW1lbnRCeUlkKCdhZHZhbmNlZC10b2dnbGUnKTtcbiAgICBpZiAoYWR2YW5jZWRUaXRsZSkge1xuICAgICAgY29uc3QgYXJyb3cgPSBhZHZhbmNlZFRpdGxlLnF1ZXJ5U2VsZWN0b3IoJyNhZHZhbmNlZC1hcnJvdycpO1xuICAgICAgY29uc3QgYXJyb3dUZXh0ID0gYXJyb3cgPyBhcnJvdy50ZXh0Q29udGVudCA6ICdcdTI1QjYnO1xuICAgICAgYWR2YW5jZWRUaXRsZS5pbm5lckhUTUwgPSBgXHVEODNEXHVERDI3ICR7dCgnZmFybS5hZHZhbmNlZCcpfSA8c3BhbiBpZD1cImFkdmFuY2VkLWFycm93XCI+JHthcnJvd1RleHR9PC9zcGFuPmA7XG4gICAgfVxuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgZXRpcXVldGFzIGRlIGNvbmZpZ3VyYWNpXHUwMEYzblxuICAgIC8vIExhcyBldGlxdWV0YXMgc2UgYWN0dWFsaXphbiBhdXRvbVx1MDBFMXRpY2FtZW50ZSBkZXNkZSBlbCBpbm5lckhUTUwgaW5pY2lhbFxuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgb3BjaW9uZXMgZGVsIHNlbGVjdG9yIGRlIG1vZG8gZGUgY29sb3JcbiAgICBjb25zdCBjb2xvck1vZGVTZWxlY3QgPSBlbGVtZW50cy5jb2xvck1vZGVTZWxlY3Q7XG4gICAgaWYgKGNvbG9yTW9kZVNlbGVjdCkge1xuICAgICAgY29uc3QgcmFuZG9tT3B0aW9uID0gY29sb3JNb2RlU2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvblt2YWx1ZT1cInJhbmRvbVwiXScpO1xuICAgICAgY29uc3QgZml4ZWRPcHRpb24gPSBjb2xvck1vZGVTZWxlY3QucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwiZml4ZWRcIl0nKTtcbiAgICAgIGlmIChyYW5kb21PcHRpb24pIHJhbmRvbU9wdGlvbi50ZXh0Q29udGVudCA9IHQoJ2Zhcm0ucmFuZG9tJyk7XG4gICAgICBpZiAoZml4ZWRPcHRpb24pIGZpeGVkT3B0aW9uLnRleHRDb250ZW50ID0gdCgnZmFybS5maXhlZCcpO1xuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIHBsYWNlaG9sZGVyXG4gICAgaWYgKGVsZW1lbnRzLmN1c3RvbVBhbGV0dGVJbnB1dCkge1xuICAgICAgZWxlbWVudHMuY3VzdG9tUGFsZXR0ZUlucHV0LnBsYWNlaG9sZGVyID0gdCgnZmFybS5wYWxldHRlRXhhbXBsZScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGJvdG9uZXMgZGUgY29uZmlndXJhY2lcdTAwRjNuXG4gICAgaWYgKGVsZW1lbnRzLnNhdmVCdG4pIGVsZW1lbnRzLnNhdmVCdG4uaW5uZXJIVE1MID0gYFx1RDgzRFx1RENCRSAke3QoJ2NvbW1vbi5zYXZlJyl9YDtcbiAgICBpZiAoZWxlbWVudHMubG9hZEJ0bikgZWxlbWVudHMubG9hZEJ0bi5pbm5lckhUTUwgPSBgXHVEODNEXHVEQ0MxICR7dCgnY29tbW9uLmxvYWQnKX1gO1xuICAgIGlmIChlbGVtZW50cy5yZXNldEJ0bikgZWxlbWVudHMucmVzZXRCdG4uaW5uZXJIVE1MID0gYFx1RDgzRFx1REQwNCAke3QoJ2NvbW1vbi5yZXNldCcpfWA7XG4gICAgaWYgKGVsZW1lbnRzLmNhcHR1cmVCdG4pIGVsZW1lbnRzLmNhcHR1cmVCdG4uaW5uZXJIVE1MID0gYFx1RDgzRFx1RENGOCAke3QoJ2Zhcm0uY2FwdHVyZScpfWA7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBpbmZvcm1hY2lcdTAwRjNuIGRlIHpvbmFcbiAgICB1cGRhdGVab25lRGlzcGxheSgpO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgZXN0YWRvIGRlIGJvdG9uZXMgKHBhcmEgYWN0dWFsaXphciB0ZXh0b3MpXG4gICAgdXBkYXRlQnV0dG9uU3RhdGVzKGZhcm1TdGF0ZT8ucnVubmluZyB8fCBmYWxzZSk7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGUgc2FsdWQgc2kgZXhpc3RlXG4gICAgY29uc3QgaGVhbHRoU3RhdHVzID0gZWxlbWVudHMuaGVhbHRoU3RhdHVzO1xuICAgIGlmIChoZWFsdGhTdGF0dXMgJiYgaGVhbHRoU3RhdHVzLnRleHRDb250ZW50LmluY2x1ZGVzKCdcdUQ4M0RcdUREMEQnKSkge1xuICAgICAgaGVhbHRoU3RhdHVzLnRleHRDb250ZW50ID0gYFx1RDgzRFx1REQwRCAke3QoJ2Zhcm0uY2hlY2tpbmdTdGF0dXMnKX1gO1xuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGVzdGFkbyBzaSBlc3RcdTAwRTEgZGV0ZW5pZG9cbiAgICBjb25zdCBzdGF0dXMgPSBlbGVtZW50cy5zdGF0dXM7XG4gICAgaWYgKHN0YXR1cyAmJiBzdGF0dXMudGV4dENvbnRlbnQuaW5jbHVkZXMoJ1x1RDgzRFx1RENBNCcpKSB7XG4gICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBgXHVEODNEXHVEQ0E0ICR7dCgnZmFybS5zdG9wcGVkJyl9YDtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIHNlbGVjY2lvbmFyIHBvc2ljaVx1MDBGM24gZGUgZmFybWluZ1xuICBhc3luYyBmdW5jdGlvbiBzZWxlY3RGYXJtUG9zaXRpb24oY29uZmlnLCBzZXRTdGF0dXMsIHVwZGF0ZVpvbmVEaXNwbGF5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRTdGF0dXModCgnZmFybS5zZWxlY3RQb3NpdGlvbkFsZXJ0JyksICdpbmZvJyk7XG4gICAgICBcbiAgICAgIC8vIEFjdGl2YXIgbW9kbyBkZSBzZWxlY2NpXHUwMEYzbiBkZSBwb3NpY2lcdTAwRjNuXG4gICAgICBjb25maWcuc2VsZWN0aW5nUG9zaXRpb24gPSB0cnVlO1xuICAgICAgXG4gICAgICAvLyBJbnRlcmNlcHRhciByZXF1ZXN0cyBwYXJhIGNhcHR1cmFyIHBvc2ljaVx1MDBGM25cbiAgICAgIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSB3aW5kb3cuZmV0Y2g7XG4gICAgICB3aW5kb3cuZmV0Y2ggPSBhc3luYyAodXJsLCBvcHRpb25zKSA9PiB7XG4gICAgICAgIGlmIChjb25maWcuc2VsZWN0aW5nUG9zaXRpb24gJiYgdXJsLmluY2x1ZGVzKCcvczAvcGl4ZWwvJykpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvcmlnaW5hbEZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vayAmJiBvcHRpb25zICYmIG9wdGlvbnMuYm9keSkge1xuICAgICAgICAgICAgICBjb25zdCBib2R5RGF0YSA9IEpTT04ucGFyc2Uob3B0aW9ucy5ib2R5KTtcbiAgICAgICAgICAgICAgaWYgKGJvZHlEYXRhLmNvb3JkcyAmJiBib2R5RGF0YS5jb29yZHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFggPSBib2R5RGF0YS5jb29yZHNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxZID0gYm9keURhdGEuY29vcmRzWzFdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEV4dHJhZXIgdGlsZSBkZSBsYSBVUkxcbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlTWF0Y2ggPSB1cmwubWF0Y2goL1xcL3MwXFwvcGl4ZWxcXC8oLT9cXGQrKVxcLygtP1xcZCspLyk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGVNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgY29uZmlnLlRJTEVfWCA9IHBhcnNlSW50KHRpbGVNYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICBjb25maWcuVElMRV9ZID0gcGFyc2VJbnQodGlsZU1hdGNoWzJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gRXN0YWJsZWNlciBwb3NpY2lcdTAwRjNuIGJhc2UgeSBhY3RpdmFyIHNpc3RlbWEgZGUgcmFkaW9cbiAgICAgICAgICAgICAgICBjb25maWcuQkFTRV9YID0gbG9jYWxYO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5CQVNFX1kgPSBsb2NhbFk7XG4gICAgICAgICAgICAgICAgY29uZmlnLlBPU0lUSU9OX1NFTEVDVEVEID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25maWcuc2VsZWN0aW5nUG9zaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZmV0Y2ggPSBvcmlnaW5hbEZldGNoO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEFjdHVhbGl6YXIgZGlzcGxheXMgeSBzaW5jcm9uaXphciBpbnB1dHMgY29uIGxhIG51ZXZhIGNvbmZpZ1xuICAgICAgICAgICAgICAgIHVwZGF0ZVpvbmVEaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGlsZURpc3BsYXkoKTtcbiAgICAgICAgICAgICAgICAvLyBNVVkgSU1QT1JUQU5URTogc2luY3Jvbml6YXIgbG9zIGlucHV0cyBwYXJhIHF1ZSAndXBkYXRlQ29uZmlnRnJvbUlucHV0cygpJ1xuICAgICAgICAgICAgICAgIC8vIG5vIHNvYnJlZXNjcmliYSBlbCBUSUxFX1gvVElMRV9ZIGNvbiB2YWxvcmVzIGFudGlndW9zIGFsIHB1bHNhciBcIlVuYSB2ZXpcIi9cIkluaWNpYXJcIlxuICAgICAgICAgICAgICAgIHVwZGF0ZUlucHV0c0Zyb21Db25maWcoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZXRTdGF0dXModCgnZmFybS5wb3NpdGlvblNldCcpLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgIGxvZyhgXHUyNzA1IFpvbmEgZGUgZmFybWluZyBlc3RhYmxlY2lkYTogdGlsZSgke2NvbmZpZy5USUxFX1h9LCR7Y29uZmlnLlRJTEVfWX0pIGJhc2UoJHtsb2NhbFh9LCR7bG9jYWxZfSkgcmFkaW8oJHtjb25maWcuRkFSTV9SQURJVVN9cHgpYCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gR3VhcmRhciBjb25maWd1cmFjaVx1MDBGM25cbiAgICAgICAgICAgICAgICBzYXZlRmFybUNmZyhjb25maWcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2coJ0Vycm9yIGludGVyY2VwdGFuZG8gcGl4ZWw6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICAgIH07XG4gICAgICBcbiAgICAgIC8vIFRpbWVvdXQgcGFyYSBzZWxlY2NpXHUwMEYzbiBkZSBwb3NpY2lcdTAwRjNuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZy5zZWxlY3RpbmdQb3NpdGlvbikge1xuICAgICAgICAgIHdpbmRvdy5mZXRjaCA9IG9yaWdpbmFsRmV0Y2g7XG4gICAgICAgICAgY29uZmlnLnNlbGVjdGluZ1Bvc2l0aW9uID0gZmFsc2U7XG4gICAgICAgICAgc2V0U3RhdHVzKHQoJ2Zhcm0ucG9zaXRpb25UaW1lb3V0JyksICdlcnJvcicpO1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9LCAxMjAwMDApOyAvLyAyIG1pbnV0b3NcbiAgICB9KTtcbiAgfVxuICBcbiAgLy8gRXNjdWNoYXIgY2FtYmlvcyBkZSBpZGlvbWFcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIHVwZGF0ZVRleHRzKTtcbiAgXG4gIC8vIEFQSSBwXHUwMEZBYmxpY2EgZGUgbGEgVUlcbiAgcmV0dXJuIHtcbiAgICBzZXRTdGF0dXMsXG4gICAgdXBkYXRlU3RhdHMsXG4gICAgZmxhc2hFZmZlY3QsXG4gICAgdXBkYXRlQnV0dG9uU3RhdGVzLFxuICAgIHVwZGF0ZVRleHRzLFxuICAgIGRlc3Ryb3k6ICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsYW5ndWFnZUNoYW5nZWQnLCB1cGRhdGVUZXh0cyk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNoYWRvd0hvc3QpO1xuICAgIH0sXG4gICAgdXBkYXRlQ29uZmlnOiB1cGRhdGVJbnB1dHNGcm9tQ29uZmlnLFxuICAgIGdldEVsZW1lbnQ6ICgpID0+IHNoYWRvd0hvc3RcbiAgfTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgYXV0by1jYWxpYnJhciBsYXMgY29vcmRlbmFkYXMgZGVsIHRpbGUgYmFzXHUwMEUxbmRvc2UgZW4gbGEgcG9zaWNpXHUwMEYzbiBkZWwgdmlld3BvcnRcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdXRvQ2FsaWJyYXRlVGlsZShjb25maWcpIHtcbiAgdHJ5IHtcbiAgICBsb2coJ1x1RDgzQ1x1REZBRiBJbmljaWFuZG8gYXV0by1jYWxpYnJhY2lcdTAwRjNuIGRlbCB0aWxlLi4uJyk7XG4gICAgLy8gU2kgeWEgaGF5IHVuYSB6b25hIHNlbGVjY2lvbmFkYSB5IHVuIHRpbGUgZGVmaW5pZG8sIG5vIGZvcnphciBudWV2YSBjYWxpYnJhY2lcdTAwRjNuXG4gICAgaWYgKGNvbmZpZy5QT1NJVElPTl9TRUxFQ1RFRCAmJiBjb25maWcuQkFTRV9YICE9IG51bGwgJiYgY29uZmlnLkJBU0VfWSAhPSBudWxsICYmIE51bWJlci5pc0Zpbml0ZShjb25maWcuVElMRV9YKSAmJiBOdW1iZXIuaXNGaW5pdGUoY29uZmlnLlRJTEVfWSkpIHtcbiAgICAgIGxvZyhgXHUyMTM5XHVGRTBGIFlhIGV4aXN0ZSB6b25hIHNlbGVjY2lvbmFkYS4gU2UgbWFudGllbmUgdGlsZSBhY3R1YWw6ICgke2NvbmZpZy5USUxFX1h9LCAke2NvbmZpZy5USUxFX1l9KWApO1xuICAgICAgc2F2ZUZhcm1DZmcoY29uZmlnKTtcbiAgICAgIHJldHVybiB7IHRpbGVYOiBjb25maWcuVElMRV9YLCB0aWxlWTogY29uZmlnLlRJTEVfWSwgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBCdXNjYXIgZWxlbWVudG9zIHF1ZSBpbmRpcXVlbiBsYSBwb3NpY2lcdTAwRjNuIGFjdHVhbFxuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyB3aW5kb3cuVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IGhhc2hQYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICBcbiAgICAvLyBJbnRlbnRhciBleHRyYWVyIGNvb3JkZW5hZGFzIGRlIGxhIFVSTFxuICAgIGxldCB0aWxlWCwgdGlsZVk7XG4gICAgXG4gICAgLy8gQnVzY2FyIGVuIHF1ZXJ5IHBhcmFtc1xuICAgIGlmICh1cmxQYXJhbXMuaGFzKCd4JykgJiYgdXJsUGFyYW1zLmhhcygneScpKSB7XG4gICAgICB0aWxlWCA9IHBhcnNlSW50KHVybFBhcmFtcy5nZXQoJ3gnKSk7XG4gICAgICB0aWxlWSA9IHBhcnNlSW50KHVybFBhcmFtcy5nZXQoJ3knKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIEJ1c2NhciBlbiBoYXNoIChmb3JtYXRvICN4LHkgbyBzaW1pbGFyKVxuICAgIGlmICghdGlsZVggJiYgIXRpbGVZICYmIGhhc2hQYXJhbXMpIHtcbiAgICAgIGNvbnN0IGhhc2hNYXRjaCA9IGhhc2hQYXJhbXMubWF0Y2goLyMoLT9cXGQrKSwoLT9cXGQrKS8pO1xuICAgICAgaWYgKGhhc2hNYXRjaCkge1xuICAgICAgICB0aWxlWCA9IHBhcnNlSW50KGhhc2hNYXRjaFsxXSk7XG4gICAgICAgIHRpbGVZID0gcGFyc2VJbnQoaGFzaE1hdGNoWzJdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQnVzY2FyIGVsZW1lbnRvcyBET00gcXVlIGluZGlxdWVuIHBvc2ljaVx1MDBGM25cbiAgICBpZiAoIXRpbGVYICYmICF0aWxlWSkge1xuICAgICAgY29uc3QgcG9zaXRpb25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXhdLCBbZGF0YS15XSwgLmNvb3JkaW5hdGVzLCAucG9zaXRpb24nKTtcbiAgICAgIGZvciAoY29uc3QgZWwgb2YgcG9zaXRpb25FbGVtZW50cykge1xuICAgICAgICBjb25zdCB4ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3gnKTtcbiAgICAgICAgY29uc3QgeSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS15JykgfHwgZWwuZ2V0QXR0cmlidXRlKCd5Jyk7XG4gICAgICAgIGlmICh4ICYmIHkpIHtcbiAgICAgICAgICB0aWxlWCA9IHBhcnNlSW50KHgpO1xuICAgICAgICAgIHRpbGVZID0gcGFyc2VJbnQoeSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQnVzY2FyIGVuIGVsIHRleHRvIHZpc2libGUgZGUgbGEgcFx1MDBFMWdpbmFcbiAgICBpZiAoIXRpbGVYICYmICF0aWxlWSkge1xuICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBkb2N1bWVudC5ib2R5LnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgY29uc3QgY29vcmRNYXRjaCA9IHRleHRDb250ZW50Lm1hdGNoKC8oPzp0aWxlfHBvc3xwb3NpdGlvbik/XFxzKlsoW10/XFxzKigtP1xcZCspXFxzKlssO11cXHMqKC0/XFxkKylcXHMqWylcXF1dPy9pKTtcbiAgICAgIGlmIChjb29yZE1hdGNoKSB7XG4gICAgICAgIHRpbGVYID0gcGFyc2VJbnQoY29vcmRNYXRjaFsxXSk7XG4gICAgICAgIHRpbGVZID0gcGFyc2VJbnQoY29vcmRNYXRjaFsyXSk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFZhbG9yZXMgcG9yIGRlZmVjdG8gc2kgbm8gc2UgZW5jdWVudHJhIG5hZGFcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh0aWxlWCkgfHwgIU51bWJlci5pc0Zpbml0ZSh0aWxlWSkpIHtcbiAgICAgIHRpbGVYID0gMDtcbiAgICAgIHRpbGVZID0gMDtcbiAgICAgIGxvZygnXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZGllcm9uIGRldGVjdGFyIGNvb3JkZW5hZGFzIGF1dG9tXHUwMEUxdGljYW1lbnRlLCB1c2FuZG8gKDAsMCknKTtcbiAgICB9XG4gICAgXG4gICAgLy8gVmFsaWRhciBxdWUgbGFzIGNvb3JkZW5hZGFzIHNlYW4gcmF6b25hYmxlc1xuICAgIGlmIChNYXRoLmFicyh0aWxlWCkgPiAxMDAwMDAwIHx8IE1hdGguYWJzKHRpbGVZKSA+IDEwMDAwMDApIHtcbiAgICAgIGxvZygnXHUyNkEwXHVGRTBGIENvb3JkZW5hZGFzIGRldGVjdGFkYXMgcGFyZWNlbiBpbmNvcnJlY3RhcywgbGltaXRhbmRvIGEgcmFuZ28gdlx1MDBFMWxpZG8nKTtcbiAgICAgIHRpbGVYID0gTWF0aC5tYXgoLTEwMDAwMDAsIE1hdGgubWluKDEwMDAwMDAsIHRpbGVYKSk7XG4gICAgICB0aWxlWSA9IE1hdGgubWF4KC0xMDAwMDAwLCBNYXRoLm1pbigxMDAwMDAwLCB0aWxlWSkpO1xuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGNvbmZpZ3VyYWNpXHUwMEYzblxuICAgIGNvbmZpZy5USUxFX1ggPSB0aWxlWDtcbiAgICBjb25maWcuVElMRV9ZID0gdGlsZVk7XG4gICAgXG4gICAgbG9nKGBcdTI3MDUgVGlsZSBjYWxpYnJhZG8gYXV0b21cdTAwRTF0aWNhbWVudGU6ICgke3RpbGVYfSwgJHt0aWxlWX0pYCk7XG4gICAgXG4gICAgLy8gR3VhcmRhciBsYSBjb25maWd1cmFjaVx1MDBGM24gY2FsaWJyYWRhXG4gICAgc2F2ZUZhcm1DZmcoY29uZmlnKTtcbiAgICBcbiAgICByZXR1cm4geyB0aWxlWCwgdGlsZVksIHN1Y2Nlc3M6IHRydWUgfTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBlbiBhdXRvLWNhbGlicmFjaVx1MDBGM246JywgZXJyb3IpO1xuICAgIHJldHVybiB7IHRpbGVYOiAwLCB0aWxlWTogMCwgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50RmFybVVJKCkge1xuICAvLyBFc3RhIGZ1bmNpXHUwMEYzbiBzZXJcdTAwRTEgbGxhbWFkYSBkZXNkZSBmYXJtL2luZGV4LmpzXG4gIGxvZygnXHVEODNEXHVEQ0YxIE1vbnRhbmRvIFVJIGRlbCBmYXJtLi4uJyk7XG4gIFxuICAvLyBDcmVhciB1bmEgVUkgYlx1MDBFMXNpY2EgcGFyYSBlbCBmYXJtXG4gIGNvbnN0IHVpID0gY3JlYXRlRmFybVVJKFxuICAgIEZBUk1fREVGQVVMVFMsXG4gICAgKCkgPT4gbG9nKHQoJ2Zhcm0uc3RhcnRpbmdCb3QnKSksXG4gICAgKCkgPT4gbG9nKHQoJ2Zhcm0uc3RvcHBpbmdCb3QnKSksXG4gICAgKCkgPT4gbG9nKHQoJ2Zhcm0uY2FsaWJyYXRpbmcnKSlcbiAgKTtcbiAgXG4gIHJldHVybiB7XG4gICAgc2V0U3RhdHVzOiAobXNnKSA9PiB7XG4gICAgICBsb2cobXNnKTtcbiAgICAgIHVpLnNldFN0YXR1cyhtc2cpO1xuICAgIH0sXG4gICAgdXBkYXRlU3RhdHM6IHVpLnVwZGF0ZVN0YXRzLFxuICAgIGZsYXNoRWZmZWN0OiB1aS5mbGFzaEVmZmVjdCxcbiAgICB1cGRhdGVUZXh0czogdWkudXBkYXRlVGV4dHMsXG4gICAgZGVzdHJveTogdWkuZGVzdHJveVxuICB9O1xufVxuIiwgImxldCBsb2FkZWQgPSBmYWxzZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRUdXJuc3RpbGUoKSB7XG4gIGlmIChsb2FkZWQgfHwgd2luZG93LnR1cm5zdGlsZSkgcmV0dXJuO1xuICBcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgcy5zcmMgPSAnaHR0cHM6Ly9jaGFsbGVuZ2VzLmNsb3VkZmxhcmUuY29tL3R1cm5zdGlsZS92MC9hcGkuanM/cmVuZGVyPWV4cGxpY2l0JztcbiAgICBzLmFzeW5jID0gdHJ1ZTsgXG4gICAgcy5kZWZlciA9IHRydWU7XG4gICAgcy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcy5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignTm8gc2UgcHVkbyBjYXJnYXIgVHVybnN0aWxlJykpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVR1cm5zdGlsZShzaXRlS2V5LCBhY3Rpb24gPSBcInBhaW50XCIpIHtcbiAgYXdhaXQgbG9hZFR1cm5zdGlsZSgpO1xuICBcbiAgaWYgKHR5cGVvZiB3aW5kb3cudHVybnN0aWxlPy5leGVjdXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgd2luZG93LnR1cm5zdGlsZS5leGVjdXRlKHNpdGVLZXksIHsgYWN0aW9uIH0pO1xuICAgICAgaWYgKHRva2VuICYmIHRva2VuLmxlbmd0aCA+IDIwKSByZXR1cm4gdG9rZW47XG4gICAgfSBjYXRjaCB7IFxuICAgICAgLyogZmFsbGJhY2sgYWJham8gKi8gXG4gICAgfVxuICB9XG4gIFxuICAvLyBGYWxsYmFjazogcmVuZGVyIG9jdWx0b1xuICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaG9zdC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7IFxuICAgIGhvc3Quc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhvc3QpO1xuICAgIHdpbmRvdy50dXJuc3RpbGUucmVuZGVyKGhvc3QsIHsgXG4gICAgICBzaXRla2V5OiBzaXRlS2V5LCBcbiAgICAgIGNhbGxiYWNrOiAodCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGhvc3QpO1xuICAgICAgICByZXNvbHZlKHQpO1xuICAgICAgfSBcbiAgICB9KTtcbiAgfSk7XG59XG5cbi8vIFZlcnNpXHUwMEYzbiBvcmlnaW5hbCBwYXJhIGNvbXBhdGliaWxpZGFkXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VHVybnN0aWxlVG9rZW4oc2l0ZUtleSkge1xuICByZXR1cm4gZXhlY3V0ZVR1cm5zdGlsZShzaXRlS2V5LCAncGFpbnQnKTtcbn1cblxuLy8gRGV0ZWN0YSBkaW5cdTAwRTFtaWNhbWVudGUgbGEgc2l0ZWtleSBkZSBUdXJuc3RpbGUgZGVsIERPTSBvIGRlbCBjb250ZXh0byBnbG9iYWwuXG4vLyBQcmlvcmlkYWQ6IFtkYXRhLXNpdGVrZXldID4gLmNmLXR1cm5zdGlsZVtkYXRhLXNpdGVrZXldID4gd2luZG93Ll9fVFVSTlNUSUxFX1NJVEVLRVkgPiBmYWxsYmFja1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdFNpdGVLZXkoZmFsbGJhY2sgPSAnJykge1xuICB0cnkge1xuICAgIC8vIDEpIEVsZW1lbnRvIGNvbiBhdHJpYnV0byBkYXRhLXNpdGVrZXkgKGNvbVx1MDBGQW4gZW4gaW50ZWdyYWNpb25lcyBleHBsXHUwMEVEY2l0YXMpXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zaXRla2V5XScpO1xuICAgIGlmIChlbCkge1xuICAgICAgY29uc3Qga2V5ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNpdGVrZXknKTtcbiAgICAgIGlmIChrZXkgJiYga2V5Lmxlbmd0aCA+IDEwKSByZXR1cm4ga2V5O1xuICAgIH1cbiAgICAvLyAyKSBXaWRnZXQgVHVybnN0aWxlIGluc2VydGFkbyAoLmNmLXR1cm5zdGlsZSlcbiAgICBjb25zdCBjZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jZi10dXJuc3RpbGUnKTtcbiAgICBpZiAoY2YgJiYgY2YuZGF0YXNldD8uc2l0ZWtleSAmJiBjZi5kYXRhc2V0LnNpdGVrZXkubGVuZ3RoID4gMTApIHtcbiAgICAgIHJldHVybiBjZi5kYXRhc2V0LnNpdGVrZXk7XG4gICAgfVxuICAgIC8vIDMpIFZhcmlhYmxlIGdsb2JhbCBvcGNpb25hbFxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuX19UVVJOU1RJTEVfU0lURUtFWSAmJiB3aW5kb3cuX19UVVJOU1RJTEVfU0lURUtFWS5sZW5ndGggPiAxMCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5fX1RVUk5TVElMRV9TSVRFS0VZO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbiAgcmV0dXJuIGZhbGxiYWNrO1xufVxuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuXG5jb25zdCByYW5kSW50ID0gKG4pID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tQ29vcmRJblRpbGUodGlsZVgsIHRpbGVZLCBtYXJnaW4gPSAwLjA1KSB7XG4gIGNvbnN0IHNpemUgPSAzMDAwO1xuICBjb25zdCBtID0gTWF0aC5mbG9vcihzaXplICogbWFyZ2luKTtcbiAgY29uc3QgcnggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc2l6ZSAtIDIqbSkpICsgbTtcbiAgY29uc3QgcnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc2l6ZSAtIDIqbSkpICsgbTtcbiAgcmV0dXJuIHsgeDogcngsIHk6IHJ5LCBhYnNYOiB0aWxlWCAqIHNpemUgKyByeCwgYWJzWTogdGlsZVkgKiBzaXplICsgcnkgfTtcbn1cblxuLy8gRmFybS1zcGVjaWZpYyBjb29yZGluYXRlIGdlbmVyYXRpb24gdXNhbmRvIHBvc2ljaVx1MDBGM24gYmFzZSB5IHJhZGlvXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tQ29vcmRzKGNmZykge1xuICAvLyBWZXJpZmljYXIgc2kgc2UgaGEgc2VsZWNjaW9uYWRvIHVuYSBwb3NpY2lcdTAwRjNuIGJhc2VcbiAgaWYgKCFjZmcuUE9TSVRJT05fU0VMRUNURUQgfHwgY2ZnLkJBU0VfWCA9PT0gbnVsbCB8fCBjZmcuQkFTRV9ZID09PSBudWxsKSB7XG4gICAgbG9nKCdcdTI2QTBcdUZFMEYgTm8gc2UgaGEgc2VsZWNjaW9uYWRvIHVuYSBwb3NpY2lcdTAwRjNuIGJhc2UuIFVzYW5kbyBjb29yZGVuYWRhcyBhbGVhdG9yaWFzIGZhbGxiYWNrLicpO1xuICAgIC8vIEZhbGxiYWNrIGEgY29vcmRlbmFkYXMgYWxlYXRvcmlhcyBlbiBlbCB0aWxlIChjb21wb3J0YW1pZW50byBhbnRlcmlvcilcbiAgICBjb25zdCBtYXJnaW4gPSBNYXRoLmZsb29yKGNmZy5USUxFX1NJWkUgKiAwLjA1KTtcbiAgICBjb25zdCBzYWZlU2l6ZSA9IGNmZy5USUxFX1NJWkUgLSAobWFyZ2luICogMik7XG4gICAgXG4gICAgaWYgKHNhZmVTaXplIDw9IDApIHtcbiAgICAgIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2ZnLlRJTEVfU0laRSksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNmZy5USUxFX1NJWkUpXTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgbG9jYWxYID0gbWFyZ2luICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2FmZVNpemUpO1xuICAgIGNvbnN0IGxvY2FsWSA9IG1hcmdpbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNhZmVTaXplKTtcbiAgICByZXR1cm4gW2xvY2FsWCwgbG9jYWxZXTtcbiAgfVxuICBcbiAgLy8gRU5GT1FVRSBTSU1QTElGSUNBRE86IEdlbmVyYXIgY29vcmRlbmFkYXMgZGlyZWN0YW1lbnRlIGVuIGVsIHRpbGUgYWN0dWFsXG4gIC8vIHBhcmEgZXZpdGFyIHByb2JsZW1hcyBkZSBjb252ZXJzaVx1MDBGM24gYWJzb2x1dGEvbG9jYWxcbiAgXG4gIGNvbnN0IHJhZGl1cyA9IGNmZy5GQVJNX1JBRElVUztcbiAgY29uc3QgbWF4U2l6ZSA9IGNmZy5USUxFX1NJWkUgLSAxOyAvLyAyOTk5IHBhcmEgdGlsZSBkZSAzMDAwXG4gIFxuICAvLyBHZW5lcmFyIHVuIFx1MDBFMW5ndWxvIGFsZWF0b3JpbyB5IHVuYSBkaXN0YW5jaWEgYWxlYXRvcmlhIGRlbnRybyBkZWwgcmFkaW9cbiAgY29uc3QgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5yYW5kb20oKSAqIHJhZGl1cztcbiAgXG4gIC8vIENhbGN1bGFyIG9mZnNldCBkZXNkZSBsYSBwb3NpY2lcdTAwRjNuIGJhc2UgKGxvY2FsKVxuICBjb25zdCBvZmZzZXRYID0gTWF0aC5yb3VuZChkaXN0YW5jZSAqIE1hdGguY29zKGFuZ2xlKSk7XG4gIGNvbnN0IG9mZnNldFkgPSBNYXRoLnJvdW5kKGRpc3RhbmNlICogTWF0aC5zaW4oYW5nbGUpKTtcbiAgXG4gIC8vIENhbGN1bGFyIGNvb3JkZW5hZGFzIGxvY2FsZXMgZmluYWxlcyBkaXJlY3RhbWVudGVcbiAgbGV0IGxvY2FsWCA9IGNmZy5CQVNFX1ggKyBvZmZzZXRYO1xuICBsZXQgbG9jYWxZID0gY2ZnLkJBU0VfWSArIG9mZnNldFk7XG4gIFxuICAvLyBUUklQTEUgVkFMSURBQ0lcdTAwRDNOOiBBcGxpY2FyIGxcdTAwRURtaXRlcyBlc3RyaWN0b3MgbVx1MDBGQWx0aXBsZXMgdmVjZXNcbiAgbG9jYWxYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4U2l6ZSwgbG9jYWxYKSk7XG4gIGxvY2FsWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGxvY2FsWSkpO1xuICBcbiAgLy8gU2VndW5kYSB2YWxpZGFjaVx1MDBGM24gY29uIE1hdGguYWJzIGNvbW8gcmVzcGFsZG9cbiAgaWYgKGxvY2FsWCA8IDAgfHwgbG9jYWxYID4gbWF4U2l6ZSB8fCBsb2NhbFkgPCAwIHx8IGxvY2FsWSA+IG1heFNpemUpIHtcbiAgICBsb2coYFx1MjZBMFx1RkUwRiBQcmltZXJhIHZhbGlkYWNpXHUwMEYzbiBmYWxsXHUwMEYzOiAoJHtsb2NhbFh9LCR7bG9jYWxZfSksIGFwbGljYW5kbyBjb3JyZWNjaVx1MDBGM24gYWJzb2x1dGEuLi5gKTtcbiAgICBsb2NhbFggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBNYXRoLmFicyhsb2NhbFgpKSk7XG4gICAgbG9jYWxZID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4U2l6ZSwgTWF0aC5hYnMobG9jYWxZKSkpO1xuICB9XG4gIFxuICAvLyBUZXJjZXJhIHZhbGlkYWNpXHUwMEYzbiBmaW5hbCAtIGZvcnphciByYW5nbyB2XHUwMEUxbGlkb1xuICBsb2NhbFggPSBNYXRoLmZsb29yKE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGxvY2FsWCkpKTtcbiAgbG9jYWxZID0gTWF0aC5mbG9vcihNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBsb2NhbFkpKSk7XG4gIFxuICAvLyBWYWxpZGFjaVx1MDBGM24gZmluYWwgY3JcdTAwRUR0aWNhXG4gIGlmIChsb2NhbFggPCAwIHx8IGxvY2FsWCA+IG1heFNpemUgfHwgbG9jYWxZIDwgMCB8fCBsb2NhbFkgPiBtYXhTaXplKSB7XG4gICAgbG9nKGBcdUQ4M0RcdURFQTggQ1JJVElDQUwgRVJST1I6IENvb3JkZW5hZGFzIGFcdTAwRkFuIGludlx1MDBFMWxpZGFzIGRlc3B1XHUwMEU5cyBkZSB0cmlwbGUgdmFsaWRhY2lcdTAwRjNuOiAoJHtsb2NhbFh9LCR7bG9jYWxZfSkuIEZvcnphbmRvIGNvb3JkZW5hZGFzIHNlZ3VyYXMuYCk7XG4gICAgbG9jYWxYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4U2l6ZSwgY2ZnLkJBU0VfWCkpO1xuICAgIGxvY2FsWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGNmZy5CQVNFX1kpKTtcbiAgfVxuICBcbiAgLy8gTG9nIG9jYXNpb25hbCBwYXJhIGRlYnVnZ2luZyBjb24gdmFsaWRhY2lcdTAwRjNuXG4gIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4xKSB7XG4gICAgbG9nKGBcdUQ4M0NcdURGQUYgQ29vcmRlbmFkYXMgZW4gcmFkaW86IGJhc2UoJHtjZmcuQkFTRV9YfSwke2NmZy5CQVNFX1l9KSBvZmZzZXQoJHtvZmZzZXRYfSwke29mZnNldFl9KSBmaW5hbCgke2xvY2FsWH0sJHtsb2NhbFl9KSB0aWxlKCR7Y2ZnLlRJTEVfWH0sJHtjZmcuVElMRV9ZfSkgdmFsaWQ9JHtsb2NhbFggPj0gMCAmJiBsb2NhbFggPD0gbWF4U2l6ZSAmJiBsb2NhbFkgPj0gMCAmJiBsb2NhbFkgPD0gbWF4U2l6ZX1gKTtcbiAgfVxuICBcbiAgcmV0dXJuIFtsb2NhbFgsIGxvY2FsWV07XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIHZlcmlmaWNhciBzaSB1bmEgcG9zaWNpXHUwMEYzbiBlc3RcdTAwRTEgZGVudHJvIGRlbCByYWRpbyBkZSBmYXJtaW5nXG5leHBvcnQgZnVuY3Rpb24gaXNXaXRoaW5GYXJtUmFkaXVzKHgsIHksIGNmZykge1xuICBpZiAoIWNmZy5QT1NJVElPTl9TRUxFQ1RFRCB8fCBjZmcuQkFTRV9YID09PSBudWxsIHx8IGNmZy5CQVNFX1kgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIC8vIENhbGN1bGFyIGRpc3RhbmNpYSBkaXJlY3RhbWVudGUgZW4gY29vcmRlbmFkYXMgbG9jYWxlcyAoc2ltcGxpZmljYWRvKVxuICBjb25zdCBkZWx0YVggPSB4IC0gY2ZnLkJBU0VfWDtcbiAgY29uc3QgZGVsdGFZID0geSAtIGNmZy5CQVNFX1k7XG4gIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRlbHRhWCAqIGRlbHRhWCArIGRlbHRhWSAqIGRlbHRhWSk7XG4gIFxuICByZXR1cm4gZGlzdGFuY2UgPD0gY2ZnLkZBUk1fUkFESVVTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNdWx0aXBsZUNvb3Jkcyhjb3VudCwgY2ZnKSB7XG4gIC8vIFNpIG5vIHNlIGhhIHNlbGVjY2lvbmFkbyB1bmEgcG9zaWNpXHUwMEYzbiwgdXNhciBjb29yZGVuYWRhcyBhbGVhdG9yaWFzIGRlIGZhbGxiYWNrXG4gIGlmICghY2ZnLlBPU0lUSU9OX1NFTEVDVEVEIHx8IGNmZy5CQVNFX1ggPT09IG51bGwgfHwgY2ZnLkJBU0VfWSA9PT0gbnVsbCkge1xuICAgIGxvZygnXHUyNkEwXHVGRTBGIE5vIHNlIGhhIHNlbGVjY2lvbmFkbyB1bmEgcG9zaWNpXHUwMEYzbiBiYXNlLiBVc2FuZG8gY29vcmRlbmFkYXMgYWxlYXRvcmlhcyBmYWxsYmFjay4nKTtcbiAgICBjb25zdCBjb29yZHMgPSBbXTtcbiAgICBjb25zdCBtYXJnaW4gPSBNYXRoLmZsb29yKGNmZy5USUxFX1NJWkUgKiAwLjA1KTtcbiAgICBjb25zdCBzYWZlU2l6ZSA9IGNmZy5USUxFX1NJWkUgLSAobWFyZ2luICogMik7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBsb2NhbFggPSBtYXJnaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzYWZlU2l6ZSk7XG4gICAgICBjb25zdCBsb2NhbFkgPSBtYXJnaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzYWZlU2l6ZSk7XG4gICAgICBjb29yZHMucHVzaChsb2NhbFgsIGxvY2FsWSk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG4gIH1cblxuICAvLyBOVUVWTyBFTkZPUVVFOiBHZW5lcmFyIGxcdTAwRURuZWEgcmVjdGEgY29tbyBBdXRvLUltYWdlXG4gIGNvbnN0IGNvb3JkcyA9IFtdO1xuICBjb25zdCBtYXhTaXplID0gY2ZnLlRJTEVfU0laRSAtIDE7IC8vIDI5OTkgcGFyYSB0aWxlIGRlIDMwMDBcbiAgXG4gIC8vIFB1bnRvIGRlIGluaWNpbzogcG9zaWNpXHUwMEYzbiBiYXNlIHNlbGVjY2lvbmFkYVxuICBsZXQgY3VycmVudFggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTaXplLCBjZmcuQkFTRV9YKSk7XG4gIGxldCBjdXJyZW50WSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGNmZy5CQVNFX1kpKTtcbiAgXG4gIC8vIEdlbmVyYXIgbFx1MDBFRG5lYSBob3Jpem9udGFsIChjb21vIGVsIGVqZW1wbG8gZGVsIHVzdWFyaW86IDYyMiw2MzUsNjIzLDYzNSw2MjQsNjM1Li4uKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAvLyBBc2VndXJhciBxdWUgbGFzIGNvb3JkZW5hZGFzIGVzdFx1MDBFMW4gZGVudHJvIGRlbCByYW5nbyB2XHUwMEUxbGlkb1xuICAgIGN1cnJlbnRYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4U2l6ZSwgY3VycmVudFgpKTtcbiAgICBjdXJyZW50WSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGN1cnJlbnRZKSk7XG4gICAgXG4gICAgY29vcmRzLnB1c2goY3VycmVudFgsIGN1cnJlbnRZKTtcbiAgICBcbiAgICAvLyBBdmFuemFyIGhhY2lhIGxhIGRlcmVjaGEgKGxcdTAwRURuZWEgaG9yaXpvbnRhbClcbiAgICBjdXJyZW50WCsrO1xuICAgIFxuICAgIC8vIFNpIGxsZWdhbW9zIGFsIGJvcmRlIGRlcmVjaG8sIHBhc2FyIGEgbGEgc2lndWllbnRlIGxcdTAwRURuZWFcbiAgICBpZiAoY3VycmVudFggPiBtYXhTaXplKSB7XG4gICAgICBjdXJyZW50WCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGNmZy5CQVNFX1gpKTsgLy8gVm9sdmVyIGFsIGluaWNpbyBYXG4gICAgICBjdXJyZW50WSsrOyAvLyBCYWphciB1bmEgbFx1MDBFRG5lYVxuICAgICAgXG4gICAgICAvLyBTaSBsbGVnYW1vcyBhbCBib3JkZSBpbmZlcmlvciwgdm9sdmVyIGFycmliYVxuICAgICAgaWYgKGN1cnJlbnRZID4gbWF4U2l6ZSkge1xuICAgICAgICBjdXJyZW50WSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNpemUsIGNmZy5CQVNFX1kpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8vIExvZyBwYXJhIGRlYnVnZ2luZyAtIG1vc3RyYXIgcGF0clx1MDBGM24gZGUgbFx1MDBFRG5lYSByZWN0YSBnZW5lcmFkb1xuICBpZiAoY29vcmRzLmxlbmd0aCA+PSA0KSB7XG4gICAgbG9nKGBcdUQ4M0NcdURGQUYgTFx1MDBFRG5lYSByZWN0YSBnZW5lcmFkYTogWyR7Y29vcmRzLnNsaWNlKDAsIDgpLmpvaW4oJywnKX0uLi5dIHRvdGFsOiAke2Nvb3Jkcy5sZW5ndGgvMn0gcFx1MDBFRHhlbGVzYCk7XG4gIH1cbiAgXG4gIHJldHVybiBjb29yZHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU11bHRpcGxlQ29sb3JzKGNvdW50LCBjZmcpIHtcbiAgY29uc3QgY29sb3JzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIGNvbG9ycy5wdXNoKG5leHRDb2xvcihjZmcpKTtcbiAgfVxuICByZXR1cm4gY29sb3JzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dENvbG9yKGNmZykge1xuICBpZiAoY2ZnLkNPTE9SX01PREUgPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gY2ZnLkNPTE9SX0ZJWEVEO1xuICB9IGVsc2Uge1xuICAgIC8vIE1vZG8gcmFuZG9tOiBjb2xvciBlbnRyZSBDT0xPUl9NSU4geSBDT0xPUl9NQVggKGluY2x1c2l2bylcbiAgICBjb25zdCBzcGFuID0gY2ZnLkNPTE9SX01BWCAtIGNmZy5DT0xPUl9NSU4gKyAxO1xuICAgIHJldHVybiBjZmcuQ09MT1JfTUlOICsgcmFuZEludChzcGFuKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dENvbG9yTGVnYWN5KHBhbGV0dGUpIHtcbiAgcmV0dXJuIHBhbGV0dGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGFsZXR0ZS5sZW5ndGgpXTtcbn1cbiIsICJleHBvcnQgY29uc3Qgc2xlZXAgPSAobXMpID0+IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCBtcykpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmV0cnkoZm4sIHsgdHJpZXMgPSAzLCBiYXNlID0gNTAwIH0gPSB7fSkge1xuICBsZXQgbGFzdDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmllczsgaSsrKSB7XG4gICAgdHJ5IHsgcmV0dXJuIGF3YWl0IGZuKCk7IH1cbiAgICBjYXRjaCAoZSkgeyBsYXN0ID0gZTsgYXdhaXQgc2xlZXAoYmFzZSAqIDIgKiogaSk7IH1cbiAgfVxuICB0aHJvdyBsYXN0O1xufVxuXG5leHBvcnQgY29uc3QgcmFuZEludCA9IChuKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuKTtcblxuLy8gU2xlZXAgd2l0aCBjb3VudGRvd24gKGZyb20gZmFybSlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzbGVlcFdpdGhDb3VudGRvd24obXMsIG9uVXBkYXRlLCBzdGF0ZSkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjb25zdCBlbmRUaW1lID0gc3RhcnRUaW1lICsgbXM7XG4gIFxuICB3aGlsZSAoRGF0ZS5ub3coKSA8IGVuZFRpbWUgJiYgKCFzdGF0ZSB8fCBzdGF0ZS5ydW5uaW5nKSkge1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IGVuZFRpbWUgLSBEYXRlLm5vdygpO1xuICAgIFxuICAgIGlmIChvblVwZGF0ZSkge1xuICAgICAgb25VcGRhdGUocmVtYWluaW5nKTtcbiAgICB9XG4gICAgXG4gICAgYXdhaXQgc2xlZXAoTWF0aC5taW4oMTAwMCwgcmVtYWluaW5nKSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBnZXRUdXJuc3RpbGVUb2tlbiB9IGZyb20gXCIuLi9jb3JlL3R1cm5zdGlsZS5qc1wiO1xuaW1wb3J0IHsgcG9zdFBpeGVsQmF0Y2hJbWFnZSB9IGZyb20gXCIuLi9jb3JlL3dwbGFjZS1hcGkuanNcIjtcbmltcG9ydCB7IGdlbmVyYXRlTXVsdGlwbGVDb29yZHMsIGdlbmVyYXRlTXVsdGlwbGVDb2xvcnMgfSBmcm9tIFwiLi9jb29yZHMuanNcIjtcbmltcG9ydCB7IHNsZWVwLCBzbGVlcFdpdGhDb3VudGRvd24gfSBmcm9tIFwiLi4vY29yZS90aW1pbmcuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuXG4vLyBVcGRhdGUgY2FudmFzIHBpeGVsIGZ1bmN0aW9uXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlQ2FudmFzUGl4ZWwobG9jYWxYLCBsb2NhbFksIGNvbG9yKSB7XG4gIHRyeSB7XG4gICAgLy8gQnVzY2FyIGVsIGNhbnZhcyBhY3Rpdm9cbiAgICBjb25zdCBjYW52YXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2NhbnZhcycpO1xuICAgIGZvciAoY29uc3QgY2FudmFzIG9mIGNhbnZhc2VzKSB7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgLy8gQ29udmVydGlyIGNvbG9yIChuXHUwMEZBbWVybykgYSBoZXhcbiAgICAgICAgY29uc3QgY29sb3JIZXggPSB0eXBlb2YgY29sb3IgPT09ICdudW1iZXInID8gYCMke2NvbG9yLnRvU3RyaW5nKDE2KS5wYWRTdGFydCg2LCAnMCcpfWAgOiBjb2xvcjtcbiAgICAgICAgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvckhleDtcbiAgICAgICAgY3R4LmZpbGxSZWN0KGxvY2FsWCwgbG9jYWxZLCAxLCAxKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRyaWdnZXIgcmVkcmF3IGV2ZW50IHNpIGV4aXN0ZVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkV2ZW50KSB7XG4gICAgICAgICAgY2FudmFzLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5FdmVudCgncGl4ZWwtdXBkYXRlZCcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ0Vycm9yIGFjdHVhbGl6YW5kbyBjYW52YXM6JywgZXJyb3IpO1xuICB9XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIHJlZnJlc2NhciBlbCB0aWxlIGVzcGVjXHUwMEVEZmljbyAoc29sbyBhY3R1YWxpemFjaVx1MDBGM24gdmlzdWFsLCBzaW4gR0VUKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hUaWxlKHRpbGVYLCB0aWxlWSkge1xuICB0cnkge1xuICAgIC8vIFNvbG8gYWN0dWFsaXphciB2aXN1YWxtZW50ZSBlbCBET00gc2luIGhhY2VyIEdFVFxuICAgIC8vIEVsIEdFVCBhIC9zMC90aWxlIG5vIGZ1bmNpb25hIHkgbm8gZXMgbmVjZXNhcmlvIHBhcmEgZWwgZnVuY2lvbmFtaWVudG9cbiAgICBjb25zdCB0aWxlU2VsZWN0b3IgPSBgW2RhdGEtdGlsZT1cIiR7dGlsZVh9LSR7dGlsZVl9XCJdLCAudGlsZS0ke3RpbGVYfS0ke3RpbGVZfSwgW2RhdGEtdGlsZS14PVwiJHt0aWxlWH1cIl1bZGF0YS10aWxlLXk9XCIke3RpbGVZfVwiXWA7XG4gICAgY29uc3QgdGlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRpbGVTZWxlY3Rvcik7XG4gICAgXG4gICAgaWYgKHRpbGVFbGVtZW50KSB7XG4gICAgICAvLyBBXHUwMEYxYWRpciB1bmEgY2xhc2UgdGVtcG9yYWwgcGFyYSBpbmRpY2FyIGFjdHVhbGl6YWNpXHUwMEYzblxuICAgICAgdGlsZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGlsZS11cGRhdGluZycpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RpbGUtdXBkYXRpbmcnKTtcbiAgICAgICAgdGlsZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGlsZS11cGRhdGVkJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGlsZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndGlsZS11cGRhdGVkJyksIDEwMDApO1xuICAgICAgfSwgMTAwKTtcbiAgICAgIGxvZyhgVGlsZSAoJHt0aWxlWH0sJHt0aWxlWX0pIGFjdHVhbGl6YWRvIHZpc3VhbG1lbnRlYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEludGVudGFyIGZvcnphciB1bmEgYWN0dWFsaXphY2lcdTAwRjNuIGRlbCBjYW52YXMgZ2VuZXJhbFxuICAgICAgY29uc3QgY2FudmFzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdjYW52YXMnKTtcbiAgICAgIGNhbnZhc0VsZW1lbnRzLmZvckVhY2goY2FudmFzID0+IHtcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICAvLyBUcmlnZ2VyIHJlZHJhdyBzaW4gaGFjZXIgY2FtYmlvc1xuICAgICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgMSwgMSk7XG4gICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxvZyhgQWN0dWFsaXphY2lcdTAwRjNuIHZpc3VhbCBnZW5cdTAwRTlyaWNhIHJlYWxpemFkYSBwYXJhIHRpbGUgKCR7dGlsZVh9LCR7dGlsZVl9KWApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ0Vycm9yIGVuIGFjdHVhbGl6YWNpXHUwMEYzbiB2aXN1YWwgZGVsIHRpbGU6JywgZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYWludE9uY2UoY2ZnLCBzdGF0ZSwgc2V0U3RhdHVzLCBmbGFzaEVmZmVjdCwgZ2V0U2Vzc2lvbiwgY2hlY2tCYWNrZW5kSGVhbHRoKSB7XG4gIC8vIFZlcmlmaWNhciBxdWUgc2UgaGF5YSBzZWxlY2Npb25hZG8gdW5hIHBvc2ljaVx1MDBGM24gdlx1MDBFMWxpZGFcbiAgaWYgKCFjZmcuUE9TSVRJT05fU0VMRUNURUQgfHwgY2ZnLkJBU0VfWCA9PT0gbnVsbCB8fCBjZmcuQkFTRV9ZID09PSBudWxsKSB7XG4gICAgc2V0U3RhdHVzKGBcdUQ4M0NcdURGQUYgU2VsZWNjaW9uYSB1bmEgem9uYSBwcmltZXJvIHVzYW5kbyAnU2VsZWNjaW9uYXIgWm9uYSdgLCAnZXJyb3InKTtcbiAgICBsb2coYFBpbnRhZG8gY2FuY2VsYWRvOiBubyBzZSBoYSBzZWxlY2Npb25hZG8gdW5hIHBvc2ljaVx1MDBGM24gYmFzZWApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBcbiAgLy8gVmVyaWZpY2FyIHF1ZSBsYXMgY29vcmRlbmFkYXMgZGVsIHRpbGUgc2VhbiB2XHUwMEUxbGlkYXMgYW50ZXMgZGUgcGludGFyXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKGNmZy5USUxFX1gpIHx8ICFOdW1iZXIuaXNGaW5pdGUoY2ZnLlRJTEVfWSkpIHtcbiAgICBzZXRTdGF0dXMoYFx1RDgzRFx1REVBQiBDb29yZGVuYWRhcyBkZWwgdGlsZSBpbnZcdTAwRTFsaWRhcyAoJHtjZmcuVElMRV9YfSwke2NmZy5USUxFX1l9KS4gQ2FsaWJyYSBwcmltZXJvYCwgJ2Vycm9yJyk7XG4gICAgbG9nKGBQaW50YWRvIGNhbmNlbGFkbzogY29vcmRlbmFkYXMgZGVsIHRpbGUgaW52XHUwMEUxbGlkYXNgKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIC8vIFVzYXIgY2FyZ2FzIGFjdHVhbGVzICh5YSBjb25zdWx0YWRhcyBlbiBlbCBsb29wKVxuICBjb25zdCBhdmFpbGFibGVDaGFyZ2VzID0gTWF0aC5mbG9vcihzdGF0ZS5jaGFyZ2VzLmNvdW50KTsgLy8gQ2FyZ2FzIGNvbXBsZXRhcyBkaXNwb25pYmxlc1xuICBcbiAgLy8gU2kgbm8gaGF5IGNhcmdhcyBjb21wbGV0YXMgZGlzcG9uaWJsZXMsIG5vIHBpbnRhclxuICBpZiAoYXZhaWxhYmxlQ2hhcmdlcyA8IDEpIHtcbiAgICBzZXRTdGF0dXMoYFx1RDgzRFx1REQwQiBTaW4gY2FyZ2FzIGRpc3BvbmlibGVzLiBFc3BlcmFuZG8uLi5gLCAnZXJyb3InKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIC8vIENhbGN1bGFyIGVsIG5cdTAwRkFtZXJvIFx1MDBGM3B0aW1vIGRlIHBcdTAwRUR4ZWxlcyBhIHBpbnRhclxuICAvLyBVc2FyIGVsIG1cdTAwRURuaW1vIGVudHJlOiBjYXJnYXMgZGlzcG9uaWJsZXMsIGNvbmZpZ3VyYWNpXHUwMEYzbiBkZWwgdXN1YXJpbywgeSBsXHUwMEVEbWl0ZSBtXHUwMEUxeGltbyAoNTApXG4gIGNvbnN0IG9wdGltYWxQaXhlbENvdW50ID0gTWF0aC5taW4oYXZhaWxhYmxlQ2hhcmdlcywgY2ZnLlBJWEVMU19QRVJfQkFUQ0gsIDUwKTtcbiAgY29uc3QgcGl4ZWxDb3VudCA9IE1hdGgubWF4KDEsIG9wdGltYWxQaXhlbENvdW50KTtcbiAgXG4gIC8vIEluZm9ybWFyIHNpIHNlIGFqdXN0XHUwMEYzIGVsIG5cdTAwRkFtZXJvIGRlIHBcdTAwRUR4ZWxlc1xuICBpZiAocGl4ZWxDb3VudCA8IGNmZy5QSVhFTFNfUEVSX0JBVENIKSB7XG4gICAgbG9nKGBBanVzdGFuZG8gcFx1MDBFRHhlbGVzIHBvciBjYXJnYXMgY29tcGxldGFzIGRpc3BvbmlibGVzOiAke3BpeGVsQ291bnR9LyR7Y2ZnLlBJWEVMU19QRVJfQkFUQ0h9ICgke2F2YWlsYWJsZUNoYXJnZXN9IGNhcmdhcyBjb21wbGV0YXMgZGUgJHtzdGF0ZS5jaGFyZ2VzLmNvdW50LnRvRml4ZWQoMil9IHRvdGFsZXMpYCk7XG4gIH1cbiAgXG4gIGNvbnN0IGNvb3JkcyA9IGdlbmVyYXRlTXVsdGlwbGVDb29yZHMocGl4ZWxDb3VudCwgY2ZnKTtcbiAgY29uc3QgY29sb3JzID0gZ2VuZXJhdGVNdWx0aXBsZUNvbG9ycyhwaXhlbENvdW50LCBjZmcpO1xuICBcbiAgLy8gTGFzIGNvb3JkZW5hZGFzIGdlbmVyYWRhcyB5YSBzb24gbG9jYWxlcyBhbCB0aWxlLCBubyBuZWNlc2l0YW1vcyBjXHUwMEUxbGN1bG9zIGFkaWNpb25hbGVzXG4gIGNvbnN0IGZpcnN0TG9jYWxYID0gY29vcmRzWzBdO1xuICBjb25zdCBmaXJzdExvY2FsWSA9IGNvb3Jkc1sxXTtcbiAgXG4gIHNldFN0YXR1cyhgXHVEODNDXHVERjNFIEZhcm1lYW5kbyAke3BpeGVsQ291bnR9IHBcdTAwRUR4ZWxlcyBlbiByYWRpbyAke2NmZy5GQVJNX1JBRElVU31weCBkZXNkZSAoJHtjZmcuQkFTRV9YfSwke2NmZy5CQVNFX1l9KSB0aWxlKCR7Y2ZnLlRJTEVfWH0sJHtjZmcuVElMRV9ZfSkuLi5gLCAnc3RhdHVzJyk7XG4gIFxuICBjb25zdCB0ID0gYXdhaXQgZ2V0VHVybnN0aWxlVG9rZW4oY2ZnLlNJVEVLRVkpO1xuICAvLyBVc2FyIGVsIG1pc21vIGZvcm1hdG8gcXVlIEF1dG8tSW1hZ2U6IHRleHQvcGxhaW4gY29uIHsgY29sb3JzLCBjb29yZHMsIHQgfVxuICBjb25zdCByID0gYXdhaXQgcG9zdFBpeGVsQmF0Y2hJbWFnZShjZmcuVElMRV9YLCBjZmcuVElMRV9ZLCBjb29yZHMsIGNvbG9ycywgdCk7XG5cbiAgc3RhdGUubGFzdCA9IHsgXG4gICAgeDogZmlyc3RMb2NhbFgsIFxuICAgIHk6IGZpcnN0TG9jYWxZLCBcbiAgICBjb2xvcjogY29sb3JzWzBdLCBcbiAgICBwaXhlbENvdW50LFxuICAgIGF2YWlsYWJsZUNoYXJnZXMsXG4gICAgc3RhdHVzOiByLnN0YXR1cywgXG4gICAganNvbjogci5qc29uIFxuICB9O1xuICBcbiAgaWYgKHIuc3RhdHVzID09PSAyMDAgJiYgci5qc29uICYmIChyLmpzb24ucGFpbnRlZCA+IDAgfHwgci5qc29uLnBhaW50ZWQgPT09IHBpeGVsQ291bnQgfHwgci5qc29uLm9rKSkge1xuICAgIGNvbnN0IGFjdHVhbFBhaW50ZWQgPSByLmpzb24ucGFpbnRlZCB8fCBwaXhlbENvdW50O1xuICAgIHN0YXRlLnBhaW50ZWQgKz0gYWN0dWFsUGFpbnRlZDtcbiAgICBzdGF0ZS5yZXRyeUNvdW50ID0gMDsgLy8gUmVzZXRlYXIgY29udGFkb3IgZGUgcmVpbnRlbnRvcyBhbCBcdTAwRTl4aXRvXG4gICAgXG4gICAgLy8gQWN0dWFsaXphciB2aXN1YWxtZW50ZSBlbCBjYW52YXMgcGFyYSBtXHUwMEZBbHRpcGxlcyBwXHUwMEVEeGVsZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgY29uc3QgbG9jYWxYID0gY29vcmRzW2ldO1xuICAgICAgY29uc3QgbG9jYWxZID0gY29vcmRzW2kgKyAxXTtcbiAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW01hdGguZmxvb3IoaSAvIDIpXTtcbiAgICAgIC8vIExhcyBjb29yZGVuYWRhcyB5YSBzb24gbG9jYWxlcyBhbCB0aWxlXG4gICAgICBhd2FpdCB1cGRhdGVDYW52YXNQaXhlbChsb2NhbFgsIGxvY2FsWSwgY29sb3IpO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZWZyZXNjYXIgZWwgdGlsZSBlc3BlY1x1MDBFRGZpY29cbiAgICBhd2FpdCByZWZyZXNoVGlsZShjZmcuVElMRV9YLCBjZmcuVElMRV9ZKTtcbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGxhIHNlc2lcdTAwRjNuIHBhcmEgb2J0ZW5lciBsYXMgY2FyZ2FzIGFjdHVhbGl6YWRhcyAoXHUwMEZBbmljYSBjb25zdWx0YSB0cmFzIHBpbnRhcilcbiAgICBhd2FpdCBnZXRTZXNzaW9uKCk7XG4gICAgXG4gICAgc2V0U3RhdHVzKGBcdTI3MDUgTG90ZSBwaW50YWRvOiAke2FjdHVhbFBhaW50ZWR9LyR7cGl4ZWxDb3VudH0gcFx1MDBFRHhlbGVzIGVuIHpvbmEgKCR7Y2ZnLkJBU0VfWH0sJHtjZmcuQkFTRV9ZfSkgcmFkaW8gJHtjZmcuRkFSTV9SQURJVVN9cHhgLCAnc3VjY2VzcycpO1xuICAgIGZsYXNoRWZmZWN0KCk7XG4gICAgXG4gICAgLy8gRW1pdGlyIGV2ZW50byBwZXJzb25hbGl6YWRvIHBhcmEgbm90aWZpY2FyIHF1ZSBzZSBwaW50XHUwMEYzIHVuIGxvdGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkN1c3RvbUV2ZW50KSB7XG4gICAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ3dwbGFjZS1iYXRjaC1wYWludGVkJywge1xuICAgICAgICBkZXRhaWw6IHsgXG4gICAgICAgICAgZmlyc3RYOiBmaXJzdExvY2FsWCwgXG4gICAgICAgICAgZmlyc3RZOiBmaXJzdExvY2FsWSwgXG4gICAgICAgICAgcGl4ZWxDb3VudDogYWN0dWFsUGFpbnRlZCxcbiAgICAgICAgICB0b3RhbFBpeGVsczogcGl4ZWxDb3VudCxcbiAgICAgICAgICBjb2xvcnM6IGNvbG9ycyxcbiAgICAgICAgICBjb29yZHM6IGNvb3JkcyxcbiAgICAgICAgICB0aWxlWDogY2ZnLlRJTEVfWCxcbiAgICAgICAgICB0aWxlWTogY2ZnLlRJTEVfWSxcbiAgICAgICAgICBiYXNlWDogY2ZnLkJBU0VfWCxcbiAgICAgICAgICBiYXNlWTogY2ZnLkJBU0VfWSxcbiAgICAgICAgICByYWRpdXM6IGNmZy5GQVJNX1JBRElVUyxcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFxuICAvLyBNYW5lam8gZGUgZXJyb3JlcyBtZWpvcmFkb1xuICBpZiAoci5zdGF0dXMgPT09IDQwMykge1xuICAgIHNldFN0YXR1cygnXHUyNkEwXHVGRTBGIDQwMyAodG9rZW4gZXhwaXJhZG8gbyBDbG91ZGZsYXJlKS4gUmVpbnRlbnRhclx1MDBFMS4uLicsICdlcnJvcicpO1xuICB9IGVsc2UgaWYgKHIuc3RhdHVzID09PSA0MDEpIHtcbiAgICBzZXRTdGF0dXMoJ1x1RDgzRFx1REQxMiA0MDEgKG5vIGF1dG9yaXphZG8pLiBWZXJpZmljYSB0dSBzZXNpXHUwMEYzbi4nLCAnZXJyb3InKTtcbiAgfSBlbHNlIGlmIChyLnN0YXR1cyA9PT0gNDI5KSB7XG4gICAgc2V0U3RhdHVzKCdcdTIzRjMgNDI5IChsXHUwMEVEbWl0ZSBkZSB0YXNhKS4gRXNwZXJhbmRvLi4uJywgJ2Vycm9yJyk7XG4gIH0gZWxzZSBpZiAoci5zdGF0dXMgPT09IDQwOCkge1xuICAgIHNldFN0YXR1cygnXHUyM0YwIFRpbWVvdXQgZGVsIHNlcnZpZG9yLiBDb29yZGVuYWRhcyBwcm9ibGVtXHUwMEUxdGljYXMgbyBzZXJ2aWRvciBzb2JyZWNhcmdhZG8nLCAnZXJyb3InKTtcbiAgfSBlbHNlIGlmIChyLnN0YXR1cyA9PT0gMCkge1xuICAgIHNldFN0YXR1cygnXHVEODNDXHVERjEwIEVycm9yIGRlIHJlZC4gVmVyaWZpY2FuZG8gY29uZWN0aXZpZGFkLi4uJywgJ2Vycm9yJyk7XG4gIH0gZWxzZSBpZiAoci5zdGF0dXMgPT09IDUwMCkge1xuICAgIHNldFN0YXR1cygnXHVEODNEXHVERDI1IDUwMCAoZXJyb3IgaW50ZXJubyBkZWwgc2Vydmlkb3IpLiBSZWludGVudGFyXHUwMEUxLi4uJywgJ2Vycm9yJyk7XG4gIH0gZWxzZSBpZiAoci5zdGF0dXMgPT09IDUwMiB8fCByLnN0YXR1cyA9PT0gNTAzIHx8IHIuc3RhdHVzID09PSA1MDQpIHtcbiAgICBzZXRTdGF0dXMoYFx1RDgzRFx1REVBQiAke3Iuc3RhdHVzfSAoc2Vydmlkb3Igbm8gZGlzcG9uaWJsZSkuIFJlaW50ZW50YXJcdTAwRTEuLi5gLCAnZXJyb3InKTtcbiAgfSBlbHNlIGlmIChyLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgc2V0U3RhdHVzKGBcdUQ4M0RcdURERkFcdUZFMEYgNDA0ICh0aWxlIG5vIGVuY29udHJhZG8pLiBWZXJpZmljYW5kbyBjb29yZGVuYWRhcyB0aWxlKCR7Y2ZnLlRJTEVfWH0sJHtjZmcuVElMRV9ZfSlgLCAnZXJyb3InKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBQYXJhIG90cm9zIGVycm9yZXMsIHZlcmlmaWNhciBlbCBoZWFsdGggZGVsIGJhY2tlbmRcbiAgICB0cnkge1xuICAgICAgY29uc3QgaGVhbHRoID0gYXdhaXQgY2hlY2tCYWNrZW5kSGVhbHRoKCk7XG4gICAgICBjb25zdCBoZWFsdGhTdGF0dXMgPSBoZWFsdGg/LnVwID8gJ1x1RDgzRFx1REZFMiBPbmxpbmUnIDogJ1x1RDgzRFx1REQzNCBPZmZsaW5lJztcbiAgICAgIHNldFN0YXR1cyhgXHUyNzRDIEVycm9yICR7ci5zdGF0dXN9OiAke3IuanNvbj8ubWVzc2FnZSB8fCByLmpzb24/LmVycm9yIHx8ICdGYWxsbyBhbCBwaW50YXInfSAoQmFja2VuZDogJHtoZWFsdGhTdGF0dXN9KWAsICdlcnJvcicpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgc2V0U3RhdHVzKGBcdTI3NEMgRXJyb3IgJHtyLnN0YXR1c306ICR7ci5qc29uPy5tZXNzYWdlIHx8IHIuanNvbj8uZXJyb3IgfHwgJ0ZhbGxvIGFsIHBpbnRhcid9IChIZWFsdGggY2hlY2sgZmFsbFx1MDBGMylgLCAnZXJyb3InKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIExvZyBkZXRhbGxhZG8gcGFyYSBkZWJ1Z2dpbmdcbiAgbG9nKGBGYWxsbyBlbiBwaW50YWRvOiBzdGF0dXM9JHtyLnN0YXR1c30sIGpzb249YCwgci5qc29uLCAnY29vcmRzPScsIGNvb3JkcywgJ2NvbG9ycz0nLCBjb2xvcnMpO1xuICBcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGFpbnRXaXRoUmV0cnkoY2ZnLCBzdGF0ZSwgc2V0U3RhdHVzLCBmbGFzaEVmZmVjdCwgZ2V0U2Vzc2lvbiwgY2hlY2tCYWNrZW5kSGVhbHRoKSB7XG4gIGNvbnN0IG1heEF0dGVtcHRzID0gNTsgLy8gQXVtZW50YXIgYSA1IGludGVudG9zXG4gIGNvbnN0IGJhc2VEZWxheSA9IDMwMDA7IC8vIERlbGF5IGJhc2UgZGUgMyBzZWd1bmRvc1xuICBcbiAgZm9yIChsZXQgYXR0ZW1wdCA9IDE7IGF0dGVtcHQgPD0gbWF4QXR0ZW1wdHM7IGF0dGVtcHQrKykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgcGFpbnRPbmNlKGNmZywgc3RhdGUsIHNldFN0YXR1cywgZmxhc2hFZmZlY3QsIGdldFNlc3Npb24sIGNoZWNrQmFja2VuZEhlYWx0aCk7XG4gICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBzdGF0ZS5yZXRyeUNvdW50ID0gMDsgLy8gUmVzZXQgZW4gXHUwMEU5eGl0b1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgc3RhdGUucmV0cnlDb3VudCA9IGF0dGVtcHQ7XG4gICAgICBcbiAgICAgIGlmIChhdHRlbXB0IDwgbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgY29uc3QgZGVsYXkgPSBiYXNlRGVsYXkgKiBNYXRoLnBvdygyLCBhdHRlbXB0IC0gMSk7IC8vIEJhY2tvZmYgZXhwb25lbmNpYWxcbiAgICAgICAgc2V0U3RhdHVzKGBcdUQ4M0RcdUREMDQgUmVpbnRlbnRvICR7YXR0ZW1wdH0vJHttYXhBdHRlbXB0c30gZW4gJHtkZWxheS8xMDAwfXMuLi5gLCAnZXJyb3InKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoZGVsYXkpO1xuICAgICAgfVxuICAgICAgXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZyhgRXJyb3IgZW4gaW50ZW50byAke2F0dGVtcHR9OmAsIGVycm9yKTtcbiAgICAgIHN0YXRlLnJldHJ5Q291bnQgPSBhdHRlbXB0O1xuICAgICAgXG4gICAgICBpZiAoYXR0ZW1wdCA8IG1heEF0dGVtcHRzKSB7XG4gICAgICAgIGNvbnN0IGRlbGF5ID0gYmFzZURlbGF5ICogTWF0aC5wb3coMiwgYXR0ZW1wdCAtIDEpO1xuICAgICAgICBzZXRTdGF0dXMoYFx1RDgzRFx1RENBNSBFcnJvciBlbiBpbnRlbnRvICR7YXR0ZW1wdH0vJHttYXhBdHRlbXB0c30sIHJlaW50ZW50YW5kbyBlbiAke2RlbGF5LzEwMDB9cy4uLmAsICdlcnJvcicpO1xuICAgICAgICBhd2FpdCBzbGVlcChkZWxheSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBzdGF0ZS5yZXRyeUNvdW50ID0gbWF4QXR0ZW1wdHM7XG4gIHNldFN0YXR1cyhgXHUyNzRDIEZhbGxcdTAwRjMgZGVzcHVcdTAwRTlzIGRlICR7bWF4QXR0ZW1wdHN9IGludGVudG9zLiBTZSByZXF1aWVyZSBpbnRlcnZlbmNpXHUwMEYzbiBtYW51YWwuYCwgJ2Vycm9yJyk7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvb3AoY2ZnLCBzdGF0ZSwgc2V0U3RhdHVzLCBmbGFzaEVmZmVjdCwgZ2V0U2Vzc2lvbiwgY2hlY2tCYWNrZW5kSGVhbHRoLCB1cGRhdGVTdGF0cykge1xuICBsb2coJ1x1RDgzRFx1REU4MCBMb29wIGluaWNpYWRvJyk7XG4gIHN0YXRlLnJ1bm5pbmcgPSB0cnVlO1xuICBcbiAgd2hpbGUgKHN0YXRlLnJ1bm5pbmcpIHtcbiAgICB0cnkge1xuICAgICAgLy8gQWN0dWFsaXphciBlc3RhZFx1MDBFRHN0aWNhcyBhbnRlcyBkZSBjYWRhIGNpY2xvXG4gICAgICBhd2FpdCB1cGRhdGVTdGF0cygpO1xuICAgICAgXG4gICAgICAvLyBWZXJpZmljYXIgc2kgaGF5IGNhcmdhcyBzdWZpY2llbnRlcyBwYXJhIHBpbnRhclxuICAgICAgaWYgKHN0YXRlLmNoYXJnZXMuY291bnQgPCBjZmcuTUlOX0NIQVJHRVMpIHtcbiAgICAgICAgY29uc3Qgd2FpdFRpbWUgPSBNYXRoLm1heCgwLCAoY2ZnLk1JTl9DSEFSR0VTIC0gc3RhdGUuY2hhcmdlcy5jb3VudCkgKiBjZmcuQ0hBUkdFX1JFR0VOX01TKTtcbiAgICAgICAgc2V0U3RhdHVzKGBcdTIzRjMgRXNwZXJhbmRvIGNhcmdhczogJHtzdGF0ZS5jaGFyZ2VzLmNvdW50LnRvRml4ZWQoMSl9LyR7Y2ZnLk1JTl9DSEFSR0VTfSAoJHtNYXRoLnJvdW5kKHdhaXRUaW1lLzEwMDApfXMpYCwgJ3N0YXR1cycpO1xuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2xlZXBXaXRoQ291bnRkb3duKE1hdGgubWluKHdhaXRUaW1lLCBjZmcuREVMQVlfTVMpLCAocmVtYWluaW5nKSA9PiB7XG4gICAgICAgICAgc2V0U3RhdHVzKGBcdTIzRjMgRXNwZXJhbmRvIGNhcmdhczogJHtzdGF0ZS5jaGFyZ2VzLmNvdW50LnRvRml4ZWQoMSl9LyR7Y2ZnLk1JTl9DSEFSR0VTfSAofiR7TWF0aC5yb3VuZChyZW1haW5pbmcvMTAwMCl9cylgLCAnc3RhdHVzJyk7XG4gICAgICAgIH0sIHN0YXRlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBJbnRlbnRhciBwaW50YXJcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBwYWludFdpdGhSZXRyeShjZmcsIHN0YXRlLCBzZXRTdGF0dXMsIGZsYXNoRWZmZWN0LCBnZXRTZXNzaW9uLCBjaGVja0JhY2tlbmRIZWFsdGgpO1xuICAgICAgXG4gICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgLy8gU2kgZmFsbFx1MDBGMyBkZXNwdVx1MDBFOXMgZGUgdG9kb3MgbG9zIHJlaW50ZW50b3MsIGVzcGVyYXIgbVx1MDBFMXMgdGllbXBvXG4gICAgICAgIHNldFN0YXR1cygnXHVEODNEXHVERTM0IEVzcGVyYW5kbyBhbnRlcyBkZWwgc2lndWllbnRlIGludGVudG8uLi4nLCAnZXJyb3InKTtcbiAgICAgICAgYXdhaXQgc2xlZXBXaXRoQ291bnRkb3duKGNmZy5ERUxBWV9NUyAqIDIsIChyZW1haW5pbmcpID0+IHtcbiAgICAgICAgICBzZXRTdGF0dXMoYFx1RDgzRFx1REUzNCBDb29sZG93biBleHRlbmRpZG86ICR7TWF0aC5yb3VuZChyZW1haW5pbmcvMTAwMCl9c2AsICdlcnJvcicpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIERlbGF5IG5vcm1hbCBlbnRyZSBwaW50YWRhcyBleGl0b3Nhc1xuICAgICAgaWYgKHN0YXRlLnJ1bm5pbmcpIHtcbiAgICAgICAgYXdhaXQgc2xlZXBXaXRoQ291bnRkb3duKGNmZy5ERUxBWV9NUywgKHJlbWFpbmluZykgPT4ge1xuICAgICAgICAgIHNldFN0YXR1cyhgXHVEODNEXHVEQ0E0IEVzcGVyYW5kbyAke01hdGgucm91bmQocmVtYWluaW5nLzEwMDApfXMgaGFzdGEgc2lndWllbnRlIHBpbnRhZGEuLi5gLCAnc3RhdHVzJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnRXJyb3IgY3JcdTAwRUR0aWNvIGVuIGxvb3A6JywgZXJyb3IpO1xuICAgICAgc2V0U3RhdHVzKGBcdUQ4M0RcdURDQTUgRXJyb3IgY3JcdTAwRUR0aWNvOiAke2Vycm9yLm1lc3NhZ2V9YCwgJ2Vycm9yJyk7XG4gICAgICBcbiAgICAgIC8vIEVzcGVyYXIgbVx1MDBFMXMgdGllbXBvIGFudGVzIGRlIGNvbnRpbnVhciB0cmFzIGVycm9yIGNyXHUwMEVEdGljb1xuICAgICAgaWYgKHN0YXRlLnJ1bm5pbmcpIHtcbiAgICAgICAgYXdhaXQgc2xlZXBXaXRoQ291bnRkb3duKGNmZy5ERUxBWV9NUyAqIDMsIChyZW1haW5pbmcpID0+IHtcbiAgICAgICAgICBzZXRTdGF0dXMoYFx1RDgzRFx1REVBOCBSZWN1cGVyXHUwMEUxbmRvc2UgZGUgZXJyb3IgY3JcdTAwRUR0aWNvOiAke01hdGgucm91bmQocmVtYWluaW5nLzEwMDApfXNgLCAnZXJyb3InKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBsb2coJ1x1MjNGOVx1RkUwRiBMb29wIGRldGVuaWRvJyk7XG4gIHNldFN0YXR1cygnXHUyM0Y5XHVGRTBGIEJvdCBkZXRlbmlkbycsICdzdGF0dXMnKTtcbn1cbiIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXIuanNcIjtcblxuLy8gU2lzdGVtYSBkZSBjYXB0dXJhIHBhcmEgY29vcmRlbmFkYXMgZGVsIHRpbGVcbmV4cG9ydCBjbGFzcyBDb29yZGluYXRlQ2FwdHVyZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5vcmlnaW5hbEZldGNoID0gd2luZG93LmZldGNoO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICB9XG5cbiAgLy8gSGFiaWxpdGFyIGNhcHR1cmEgZGUgY29vcmRlbmFkYXMgcG9yIHVuYSB2ZXpcbiAgZW5hYmxlKGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICBsb2coJ1x1MjZBMFx1RkUwRiBDYXB0dXJhIHlhIGVzdFx1MDBFMSBhY3RpdmEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIFxuICAgIGxvZygnXHVEODNEXHVERDc1XHVGRTBGIENhcHR1cmEgZGUgY29vcmRlbmFkYXMgYWN0aXZhZGEuIFBpbnRhIHVuIHBcdTAwRUR4ZWwgbWFudWFsbWVudGUuLi4nKTtcbiAgICBcbiAgICAvLyBJbnRlcmNlcHRhciBmZXRjaFxuICAgIHdpbmRvdy5mZXRjaCA9IGFzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLm9yaWdpbmFsRmV0Y2guYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICAgIFxuICAgICAgaWYgKHRoaXMuYWN0aXZlICYmIHRoaXMuc2hvdWxkQ2FwdHVyZShhcmdzWzBdLCBhcmdzWzFdKSkge1xuICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUNhcHR1cmUoYXJnc1swXSwgYXJnc1sxXSwgcmVzdWx0LmNsb25lKCkpO1xuICAgICAgfVxuICAgICAgXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICAvLyBBdXRvLWRlc2FjdGl2YXIgZGVzcHVcdTAwRTlzIGRlIDMwIHNlZ3VuZG9zXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgIGxvZygnXHUyM0YwIENhcHR1cmEgZGUgY29vcmRlbmFkYXMgZXhwaXJhZGEnKTtcbiAgICAgIH1cbiAgICB9LCAzMDAwMCk7XG4gIH1cblxuICAvLyBWZXJpZmljYXIgc2kgZGViZW1vcyBjYXB0dXJhciBlc3RhIHBldGljaVx1MDBGM25cbiAgc2hvdWxkQ2FwdHVyZSh1cmwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXVybCB8fCAhb3B0aW9ucykgcmV0dXJuIGZhbHNlO1xuICAgIFxuICAgIC8vIEJ1c2NhciBwYXRyb25lcyBkZSBVUkwgcmVsYWNpb25hZG9zIGNvbiBwaW50YXJcbiAgICBjb25zdCB1cmxTdHIgPSB1cmwudG9TdHJpbmcoKTtcbiAgICBpZiAoIXVybFN0ci5pbmNsdWRlcygncGFpbnQnKSAmJiAhdXJsU3RyLmluY2x1ZGVzKCdwaXhlbCcpICYmICF1cmxTdHIuaW5jbHVkZXMoJ3BsYWNlJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBWZXJpZmljYXIgcXVlIHNlYSB1biBQT1NUIGNvbiBkYXRvc1xuICAgIGlmICghb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKSAhPT0gJ1BPU1QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBNYW5lamFyIGxhIGNhcHR1cmEgZGUgY29vcmRlbmFkYXNcbiAgYXN5bmMgaGFuZGxlQ2FwdHVyZSh1cmwsIG9wdGlvbnMsIHJlc3BvbnNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBjb29yZHMgPSBudWxsO1xuICAgICAgbGV0IHRpbGVYID0gbnVsbCwgdGlsZVkgPSBudWxsO1xuXG4gICAgICAvLyBJbnRlbnRhciBleHRyYWVyIGNvb3JkZW5hZGFzIGRlbCBjdWVycG8gZGUgbGEgcGV0aWNpXHUwMEYzblxuICAgICAgaWYgKG9wdGlvbnMuYm9keSkge1xuICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShvcHRpb25zLmJvZHkpO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1c2NhciBjb29yZGVuYWRhcyBlbiBkaWZlcmVudGVzIGZvcm1hdG9zXG4gICAgICAgIGlmIChib2R5LmNvb3JkcyAmJiBBcnJheS5pc0FycmF5KGJvZHkuY29vcmRzKSkge1xuICAgICAgICAgIGNvb3JkcyA9IGJvZHkuY29vcmRzO1xuICAgICAgICB9IGVsc2UgaWYgKGJvZHkueCAhPT0gdW5kZWZpbmVkICYmIGJvZHkueSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29vcmRzID0gW2JvZHkueCwgYm9keS55XTtcbiAgICAgICAgfSBlbHNlIGlmIChib2R5LmNvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgY29vcmRzID0gYm9keS5jb29yZGluYXRlcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBFeHRyYWVyIHRpbGUgZGVzZGUgbGEgVVJMIHNpIGVzdFx1MDBFMSBwcmVzZW50ZVxuICAgICAgY29uc3QgdXJsU3RyID0gdXJsLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCB0aWxlTWF0Y2ggPSB1cmxTdHIubWF0Y2goL1xcL3MwXFwvcGl4ZWxcXC8oLT9cXGQrKVxcLygtP1xcZCspLyk7XG4gICAgICBpZiAodGlsZU1hdGNoKSB7XG4gICAgICAgIHRpbGVYID0gcGFyc2VJbnQodGlsZU1hdGNoWzFdKTtcbiAgICAgICAgdGlsZVkgPSBwYXJzZUludCh0aWxlTWF0Y2hbMl0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnRlbnRhciBleHRyYWVyIGNvb3JkcyBkZSBsYSBVUkwgc2kgbm8gdmluaWVyb24gZW4gZWwgYm9keVxuICAgICAgaWYgKCFjb29yZHMpIHtcbiAgICAgICAgY29uc3QgdXJsQ29vcmRNYXRjaCA9IHVybFN0ci5tYXRjaCgvWz8mXSg/Onh8Y29vcmRzPyk9KFteJl0rKS8pO1xuICAgICAgICBpZiAodXJsQ29vcmRNYXRjaCkge1xuICAgICAgICAgIGNvbnN0IGNvb3JkU3RyID0gZGVjb2RlVVJJQ29tcG9uZW50KHVybENvb3JkTWF0Y2hbMV0pO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb29yZHMgPSBKU09OLnBhcnNlKGNvb3JkU3RyKTtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gY29vcmRTdHIuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICBjb29yZHMgPSBbcGFyc2VJbnQocGFydHNbMF0pLCBwYXJzZUludChwYXJ0c1sxXSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTaSBlbmNvbnRyYW1vcyBjb29yZGVuYWRhcywgY2FsY3VsYXIgZWwgdGlsZVxuICAgICAgaWYgKGNvb3JkcyAmJiBjb29yZHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgbGV0IGdsb2JhbFgsIGdsb2JhbFksIGxvY2FsWCwgbG9jYWxZO1xuXG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHRpbGVYKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHRpbGVZKSkge1xuICAgICAgICAgIC8vIFRyYXRhbW9zIGNvb3JkcyBjb21vIGxvY2FsZXMgYWwgdGlsZSBleHRyYVx1MDBFRGRvIGRlIGxhIFVSTFxuICAgICAgICAgIGxvY2FsWCA9IGNvb3Jkc1swXTtcbiAgICAgICAgICBsb2NhbFkgPSBjb29yZHNbMV07XG4gICAgICAgICAgZ2xvYmFsWCA9IHRpbGVYICogMzAwMCArIGxvY2FsWDtcbiAgICAgICAgICBnbG9iYWxZID0gdGlsZVkgKiAzMDAwICsgbG9jYWxZO1xuICAgICAgICAgIGxvZyhgXHVEODNDXHVERkFGIENvb3JkZW5hZGFzIGNhcHR1cmFkYXMgKGxvY2FsZXMpOiB0aWxlKCR7dGlsZVh9LCR7dGlsZVl9KSBsb2NhbCgke2xvY2FsWH0sJHtsb2NhbFl9KSAtPiBnbG9iYWwoJHtnbG9iYWxYfSwke2dsb2JhbFl9KWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNpbiB0aWxlIGVuIFVSTCwgaW50ZXJwcmV0YW1vcyBjb29yZHMgY29tbyBnbG9iYWxlcyB5IGRlcml2YW1vcyB0aWxlXG4gICAgICAgICAgZ2xvYmFsWCA9IGNvb3Jkc1swXTtcbiAgICAgICAgICBnbG9iYWxZID0gY29vcmRzWzFdO1xuICAgICAgICAgIHRpbGVYID0gTWF0aC5mbG9vcihnbG9iYWxYIC8gMzAwMCk7XG4gICAgICAgICAgdGlsZVkgPSBNYXRoLmZsb29yKGdsb2JhbFkgLyAzMDAwKTtcbiAgICAgICAgICBsb2NhbFggPSBnbG9iYWxYICUgMzAwMDtcbiAgICAgICAgICBsb2NhbFkgPSBnbG9iYWxZICUgMzAwMDtcbiAgICAgICAgICBsb2coYFx1RDgzQ1x1REZBRiBDb29yZGVuYWRhcyBjYXB0dXJhZGFzIChnbG9iYWxlcyk6IGdsb2JhbCgke2dsb2JhbFh9LCR7Z2xvYmFsWX0pIC0+IHRpbGUoJHt0aWxlWH0sJHt0aWxlWX0pIGxvY2FsKCR7bG9jYWxYfSwke2xvY2FsWX0pYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWZXJpZmljYXIgcXVlIGxhIHJlc3B1ZXN0YSBzZWEgZXhpdG9zYVxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIHRpbGVYLFxuICAgICAgICAgICAgICB0aWxlWSxcbiAgICAgICAgICAgICAgZ2xvYmFsWCxcbiAgICAgICAgICAgICAgZ2xvYmFsWSxcbiAgICAgICAgICAgICAgbG9jYWxYLFxuICAgICAgICAgICAgICBsb2NhbFlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2coJ1x1MjZBMFx1RkUwRiBDYXB0dXJhIHJlYWxpemFkYSBwZXJvIGxhIHJlc3B1ZXN0YSBubyBmdWUgZXhpdG9zYScpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCdFcnJvciBwcm9jZXNhbmRvIGNhcHR1cmE6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8vIERlc2FjdGl2YXIgY2FwdHVyYVxuICBkaXNhYmxlKCkge1xuICAgIGlmICghdGhpcy5hY3RpdmUpIHJldHVybjtcbiAgICBcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHdpbmRvdy5mZXRjaCA9IHRoaXMub3JpZ2luYWxGZXRjaDtcbiAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcbiAgICBcbiAgICBsb2coJ1x1RDgzRFx1REQxMiBDYXB0dXJhIGRlIGNvb3JkZW5hZGFzIGRlc2FjdGl2YWRhJyk7XG4gIH1cbn1cblxuLy8gSW5zdGFuY2lhIGdsb2JhbFxuZXhwb3J0IGNvbnN0IGNvb3JkaW5hdGVDYXB0dXJlID0gbmV3IENvb3JkaW5hdGVDYXB0dXJlKCk7XG4iLCAiZXhwb3J0IGNvbnN0ICQgPSAoc2VsLCByb290ID0gZG9jdW1lbnQpID0+IHJvb3QucXVlcnlTZWxlY3RvcihzZWwpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3R5bGUoY3NzKSB7XG4gIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHMudGV4dENvbnRlbnQgPSBjc3M7IGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7IHJldHVybiBzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW91bnRTaGFkb3coY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSkge1xuICBjb25zdCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaG9zdC5pZCA9IFwid3BsYWNlLWJvdC1yb290XCI7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChob3N0KTtcbiAgY29uc3Qgcm9vdCA9IGhvc3QuYXR0YWNoU2hhZG93ID8gaG9zdC5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KSA6IGhvc3Q7XG4gIHJldHVybiB7IGhvc3QsIHJvb3QgfTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgZGV0ZWN0YXIgc2kgbGEgcGFsZXRhIGRlIGNvbG9yZXMgZXN0XHUwMEUxIGFiaWVydGFcbmV4cG9ydCBmdW5jdGlvbiBpc1BhbGV0dGVPcGVuKGRlYnVnID0gZmFsc2UpIHtcbiAgLy8gQnVzY2FyIGVsZW1lbnRvcyBjb211bmVzIGRlIGxhIHBhbGV0YSBkZSBjb2xvcmVzIChtXHUwMEU5dG9kbyBvcmlnaW5hbClcbiAgY29uc3QgcGFsZXR0ZVNlbGVjdG9ycyA9IFtcbiAgICAnW2RhdGEtdGVzdGlkPVwiY29sb3ItcGlja2VyXCJdJyxcbiAgICAnLmNvbG9yLXBpY2tlcicsXG4gICAgJy5wYWxldHRlJyxcbiAgICAnW2NsYXNzKj1cImNvbG9yXCJdW2NsYXNzKj1cInBpY2tlclwiXScsXG4gICAgJ1tjbGFzcyo9XCJwYWxldHRlXCJdJ1xuICBdO1xuICBcbiAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBwYWxldHRlU2VsZWN0b3JzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQTggUGFsZXRhIGRldGVjdGFkYSBwb3Igc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEJ1c2NhciBwb3IgY29sb3JlcyBlbiB1biBncmlkIG8gbGlzdGEgKG1cdTAwRTl0b2RvIG9yaWdpbmFsKVxuICBjb25zdCBjb2xvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3N0eWxlKj1cImJhY2tncm91bmQtY29sb3JcIl0sIFtzdHlsZSo9XCJiYWNrZ3JvdW5kOlwiXSwgLmNvbG9yLCBbY2xhc3MqPVwiY29sb3JcIl0nKTtcbiAgbGV0IHZpc2libGVDb2xvcnMgPSAwO1xuICBmb3IgKGNvbnN0IGVsIG9mIGNvbG9yRWxlbWVudHMpIHtcbiAgICBpZiAoZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsICYmIGVsLm9mZnNldFdpZHRoID4gMTAgJiYgZWwub2Zmc2V0SGVpZ2h0ID4gMTApIHtcbiAgICAgIHZpc2libGVDb2xvcnMrKztcbiAgICAgIGlmICh2aXNpYmxlQ29sb3JzID49IDUpIHtcbiAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkE4IFBhbGV0YSBkZXRlY3RhZGEgcG9yIGNvbG9yZXMgdmlzaWJsZXM6ICR7dmlzaWJsZUNvbG9yc31gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIFNpIGhheSA1KyBlbGVtZW50b3MgZGUgY29sb3IgdmlzaWJsZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzRFx1REQwRCBQYWxldGEgbm8gZGV0ZWN0YWRhLiBDb2xvcmVzIHZpc2libGVzOiAke3Zpc2libGVDb2xvcnN9YCk7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgZW5jb250cmFyIHkgaGFjZXIgY2xpYyBlbiBlbCBib3RcdTAwRjNuIGRlIFBhaW50XG5leHBvcnQgZnVuY3Rpb24gZmluZEFuZENsaWNrUGFpbnRCdXR0b24oZGVidWcgPSBmYWxzZSwgZG91YmxlQ2xpY2sgPSBmYWxzZSkge1xuICAvLyBNXHUwMEU5dG9kbyAxOiBCXHUwMEZBc3F1ZWRhIGVzcGVjXHUwMEVEZmljYSBwb3IgY2xhc2VzIChtXHUwMEU5dG9kbyBvcmlnaW5hbCwgbVx1MDBFMXMgY29uZmlhYmxlKVxuICBjb25zdCBzcGVjaWZpY0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5idG4uYnRuLXByaW1hcnkuYnRuLWxnLCBidXR0b24uYnRuLmJ0bi1wcmltYXJ5LnNtXFxcXDpidG4teGwnKTtcbiAgXG4gIGlmIChzcGVjaWZpY0J1dHRvbikge1xuICAgIGNvbnN0IGJ1dHRvblRleHQgPSBzcGVjaWZpY0J1dHRvbi50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGhhc1BhaW50VGV4dCA9IGJ1dHRvblRleHQuaW5jbHVkZXMoJ3BhaW50JykgfHwgYnV0dG9uVGV4dC5pbmNsdWRlcygncGludGFyJyk7XG4gICAgY29uc3QgaGFzUGFpbnRJY29uID0gc3BlY2lmaWNCdXR0b24ucXVlcnlTZWxlY3Rvcignc3ZnIHBhdGhbZCo9XCIyNDAtMTIwXCJdJykgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpY0J1dHRvbi5xdWVyeVNlbGVjdG9yKCdzdmcgcGF0aFtkKj1cIk0xNVwiXScpO1xuICAgIFxuICAgIGlmIChoYXNQYWludFRleHQgfHwgaGFzUGFpbnRJY29uKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgQm90XHUwMEYzbiBQYWludCBlbmNvbnRyYWRvIHBvciBzZWxlY3RvciBlc3BlY1x1MDBFRGZpY286IFwiJHtidXR0b25UZXh0fVwiYCk7XG4gICAgICBzcGVjaWZpY0J1dHRvbi5jbGljaygpO1xuICAgICAgXG4gICAgICAvLyBTaSBzZSByZXF1aWVyZSBkb2JsZSBjbGljLCBoYWNlciBzZWd1bmRvIGNsaWMgZGVzcHVcdTAwRTlzIGRlIHVuIGRlbGF5XG4gICAgICBpZiAoZG91YmxlQ2xpY2spIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkFGIFNlZ3VuZG8gY2xpYyBlbiBib3RcdTAwRjNuIFBhaW50YCk7XG4gICAgICAgICAgc3BlY2lmaWNCdXR0b24uY2xpY2soKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gTVx1MDBFOXRvZG8gMjogQlx1MDBGQXNxdWVkYSBzaW1wbGUgcG9yIHRleHRvIChtXHUwMEU5dG9kbyBvcmlnaW5hbClcbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgY29uc3QgYnV0dG9uVGV4dCA9IGJ1dHRvbi50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICgoYnV0dG9uVGV4dC5pbmNsdWRlcygncGFpbnQnKSB8fCBidXR0b25UZXh0LmluY2x1ZGVzKCdwaW50YXInKSkgJiYgXG4gICAgICAgIGJ1dHRvbi5vZmZzZXRQYXJlbnQgIT09IG51bGwgJiZcbiAgICAgICAgIWJ1dHRvbi5kaXNhYmxlZCkge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkFGIEJvdFx1MDBGM24gUGFpbnQgZW5jb250cmFkbyBwb3IgdGV4dG86IFwiJHtidXR0b24udGV4dENvbnRlbnQudHJpbSgpfVwiYCk7XG4gICAgICBidXR0b24uY2xpY2soKTtcbiAgICAgIFxuICAgICAgLy8gU2kgc2UgcmVxdWllcmUgZG9ibGUgY2xpYywgaGFjZXIgc2VndW5kbyBjbGljIGRlc3B1XHUwMEU5cyBkZSB1biBkZWxheVxuICAgICAgaWYgKGRvdWJsZUNsaWNrKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBRiBTZWd1bmRvIGNsaWMgZW4gYm90XHUwMEYzbiBQYWludGApO1xuICAgICAgICAgIGJ1dHRvbi5jbGljaygpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIFxuICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3NEMgQm90XHUwMEYzbiBQYWludCBubyBlbmNvbnRyYWRvYCk7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgcmVhbGl6YXIgYXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludCBjb24gc2VjdWVuY2lhIGNvcnJlY3RhXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0b0NsaWNrUGFpbnRCdXR0b24obWF4QXR0ZW1wdHMgPSAzLCBkZWJ1ZyA9IHRydWUpIHtcbiAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNFXHVERDE2IEluaWNpYW5kbyBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50IChtXHUwMEUxeGltbyAke21heEF0dGVtcHRzfSBpbnRlbnRvcylgKTtcbiAgXG4gIGZvciAobGV0IGF0dGVtcHQgPSAxOyBhdHRlbXB0IDw9IG1heEF0dGVtcHRzOyBhdHRlbXB0KyspIHtcbiAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgSW50ZW50byAke2F0dGVtcHR9LyR7bWF4QXR0ZW1wdHN9IC0gQnVzY2FuZG8gYm90XHUwMEYzbiBQYWludC4uLmApO1xuICAgIFxuICAgIC8vIFZlcmlmaWNhciBzaSBsYSBwYWxldGEgeWEgZXN0XHUwMEUxIGFiaWVydGFcbiAgICBpZiAoaXNQYWxldHRlT3BlbigpKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3MDUgUGFsZXRhIHlhIGVzdFx1MDBFMSBhYmllcnRhLCBhdXRvLWNsaWNrIGNvbXBsZXRhZG9gKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBcbiAgICAvLyBDTElDIFx1MDBEQU5JQ086IFByZXNpb25hciBQYWludCB1bmEgc29sYSB2ZXogKHNvbG8gcGFyYSBtb3N0cmFyIHBhbGV0YS9kZXRlY3RhciBjb2xvcmVzKVxuICAgIGlmIChmaW5kQW5kQ2xpY2tQYWludEJ1dHRvbihkZWJ1ZywgZmFsc2UpKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0RcdURDNDYgQ2xpYyBlbiBib3RcdTAwRjNuIFBhaW50IHJlYWxpemFkbyAoc2luIHNlZ3VuZG8gY2xpYylgKTtcbiAgICAgIFxuICAgICAgLy8gRXNwZXJhciB1biBwb2NvIHBhcmEgcXVlIGxhIFVJL3BhbGV0YSBhcGFyZXpjYSBlbiBwYW50YWxsYVxuICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDE1MDApKTtcbiAgICAgIFxuICAgICAgLy8gVmVyaWZpY2FyIHNpIGxhIHBhbGV0YSBzZSBhYnJpXHUwMEYzXG4gICAgICBpZiAoaXNQYWxldHRlT3BlbigpKSB7XG4gICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1MjcwNSBQYWxldGEgYWJpZXJ0YSBleGl0b3NhbWVudGUgZGVzcHVcdTAwRTlzIGRlbCBpbnRlbnRvICR7YXR0ZW1wdH1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI2QTBcdUZFMEYgUGFsZXRhIG5vIGRldGVjdGFkYSB0cmFzIGVsIGNsaWMgZW4gaW50ZW50byAke2F0dGVtcHR9LiBSZWludGVudGFyXHUwMEUxLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3NEMgQm90XHUwMEYzbiBQYWludCBubyBlbmNvbnRyYWRvIHBhcmEgY2xpYyBlbiBpbnRlbnRvICR7YXR0ZW1wdH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXNwZXJhciBhbnRlcyBkZWwgc2lndWllbnRlIGludGVudG9cbiAgICBpZiAoYXR0ZW1wdCA8IG1heEF0dGVtcHRzKSB7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICAgIH1cbiAgfVxuICBcbiAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHUyNzRDIEF1dG8tY2xpY2sgZmFsbFx1MDBGMyBkZXNwdVx1MDBFOXMgZGUgJHttYXhBdHRlbXB0c30gaW50ZW50b3NgKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuaW1wb3J0IHsgZmFybVN0YXRlLCBGQVJNX0RFRkFVTFRTIH0gZnJvbSBcIi4uL2Zhcm0vY29uZmlnLmpzXCI7XG5pbXBvcnQgeyBsb2FkRmFybUNmZywgc2F2ZUZhcm1DZmcsIHJlc2V0VG9TYWZlRGVmYXVsdHMgfSBmcm9tIFwiLi4vY29yZS9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uLCBjaGVja0hlYWx0aCB9IGZyb20gXCIuLi9jb3JlL3dwbGFjZS1hcGkuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUZhcm1VSSwgYXV0b0NhbGlicmF0ZVRpbGUgfSBmcm9tIFwiLi4vZmFybS91aS5qc1wiO1xuaW1wb3J0IHsgbG9vcCwgcGFpbnRXaXRoUmV0cnkgfSBmcm9tIFwiLi4vZmFybS9sb29wLmpzXCI7XG5pbXBvcnQgeyBjb29yZGluYXRlQ2FwdHVyZSB9IGZyb20gXCIuLi9jb3JlL2NhcHR1cmUuanNcIjtcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4uL2NvcmUvdXRpbHMuanNcIjtcbmltcG9ydCB7IGluaXRpYWxpemVMYW5ndWFnZSwgdCB9IGZyb20gXCIuLi9sb2NhbGVzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBhdXRvQ2xpY2tQYWludEJ1dHRvbiB9IGZyb20gXCIuLi9jb3JlL2RvbS5qc1wiO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBJbml0aWFsaXplIGludGVybmF0aW9uYWxpemF0aW9uIGZpcnN0XG4gIGF3YWl0IGluaXRpYWxpemVMYW5ndWFnZSgpO1xuICBcbiAgLy8gQXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludCBhbCBpbmljaW9cbiAgdHJ5IHtcbiAgICBsb2coJ1x1RDgzRVx1REQxNiBbRkFSTV0gSW5pY2lhbmRvIGF1dG8tY2xpY2sgZGVsIGJvdFx1MDBGM24gUGFpbnQuLi4nKTtcbiAgICBhd2FpdCBhdXRvQ2xpY2tQYWludEJ1dHRvbigzLCB0cnVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1MjZBMFx1RkUwRiBbRkFSTV0gRXJyb3IgZW4gYXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludDonLCBlcnJvcik7XG4gIH1cblxuICAvLyBWZXJpZmljYXIgc2kgZWwgYm90IGRlIGZhcm0geWEgZXN0XHUwMEUxIGVqZWN1dFx1MDBFMW5kb3NlXG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmZhcm1SdW5uaW5nKSB7XG4gICAgYWxlcnQodCgnZmFybS5hbHJlYWR5UnVubmluZycsIFwiQXV0by1GYXJtIHlhIGVzdFx1MDBFMSBjb3JyaWVuZG8uXCIpKTtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIC8vIFZlcmlmaWNhciBzaSBoYXkgb3Ryb3MgYm90cyBlamVjdXRcdTAwRTFuZG9zZVxuICBpZiAod2luZG93Ll9fd3BsYWNlQm90Py5pbWFnZVJ1bm5pbmcpIHtcbiAgICBhbGVydCh0KCdmYXJtLmltYWdlUnVubmluZ1dhcm5pbmcnLCBcIkF1dG8tSW1hZ2UgZXN0XHUwMEUxIGVqZWN1dFx1MDBFMW5kb3NlLiBDaVx1MDBFOXJyYWxvIGFudGVzIGRlIGluaWNpYXIgQXV0by1GYXJtLlwiKSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gSW5pY2lhbGl6YXIgZWwgZXN0YWRvIGdsb2JhbCBzaSBubyBleGlzdGVcbiAgaWYgKCF3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICB3aW5kb3cuX193cGxhY2VCb3QgPSB7fTtcbiAgfVxuICBcbiAgLy8gTWFyY2FyIHF1ZSBlbCBmYXJtIGJvdCBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2VcbiAgd2luZG93Ll9fd3BsYWNlQm90LmZhcm1SdW5uaW5nID0gdHJ1ZTtcblxuICAvLyBMaXN0ZW4gZm9yIGxhbmd1YWdlIGNoYW5nZXNcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsICgpID0+IHtcbiAgICBpZiAod2luZG93Ll9fd3BsYWNlQm90Py51aT8udXBkYXRlVGV4dHMpIHtcbiAgICAgIHdpbmRvdy5fX3dwbGFjZUJvdC51aS51cGRhdGVUZXh0cygpO1xuICAgIH1cbiAgfSk7XG5cbiAgbG9nKCdcdUQ4M0RcdURFODAgSW5pY2lhbmRvIFdQbGFjZSBGYXJtIEJvdCAodmVyc2lcdTAwRjNuIG1vZHVsYXIpJyk7XG5cbiAgLy8gVmVyaWZpY2FyIHNpIG5lY2VzaXRhIGNhbGlicmFjaVx1MDBGM24gaW5pY2lhbFxuICBmdW5jdGlvbiBuZWVkc0NhbGlicmF0aW9uQ2hlY2soY2ZnKSB7XG4gIC8vIFNpIGVsIHVzdWFyaW8geWEgc2VsZWNjaW9uXHUwMEYzIHVuYSB6b25hIHZcdTAwRTFsaWRhLCBOTyByZWNhbGlicmFyXG4gIGNvbnN0IGhhc1NlbGVjdGVkWm9uZSA9ICEhY2ZnLlBPU0lUSU9OX1NFTEVDVEVEICYmIGNmZy5CQVNFX1ggIT0gbnVsbCAmJiBjZmcuQkFTRV9ZICE9IG51bGw7XG4gIC8vIFZlcmlmaWNhciBzaSBsYXMgY29vcmRlbmFkYXMgc29uIGxhcyBwb3IgZGVmZWN0b1xuICBjb25zdCBoYXNEZWZhdWx0Q29vcmRzID0gY2ZnLlRJTEVfWCA9PT0gRkFSTV9ERUZBVUxUUy5USUxFX1ggJiYgY2ZnLlRJTEVfWSA9PT0gRkFSTV9ERUZBVUxUUy5USUxFX1k7XG4gIC8vIFZlcmlmaWNhciBxdWUgbGFzIGNvb3JkZW5hZGFzIHNlYW4gblx1MDBGQW1lcm9zIHZcdTAwRTFsaWRvc1xuICBjb25zdCBoYXNJbnZhbGlkQ29vcmRzID0gIU51bWJlci5pc0Zpbml0ZShjZmcuVElMRV9YKSB8fCAhTnVtYmVyLmlzRmluaXRlKGNmZy5USUxFX1kpO1xuXG4gIC8vIFNvbG8gY2FsaWJyYXIgc2kgTk8gaGF5IHpvbmEgc2VsZWNjaW9uYWRhIGFcdTAwRkFuIHkgYWRlbVx1MDBFMXMgbGFzIGNvb3JkcyBzb24gZGVmYXVsdCBvIGludlx1MDBFMWxpZGFzXG4gIGNvbnN0IG5lZWRzQ2FsaWIgPSAhaGFzU2VsZWN0ZWRab25lICYmIChoYXNEZWZhdWx0Q29vcmRzIHx8IGhhc0ludmFsaWRDb29yZHMpO1xuICBsb2coYFZlcmlmaWNhY2lcdTAwRjNuIGNhbGlicmFjaVx1MDBGM246IGRlZmF1bHRzPSR7aGFzRGVmYXVsdENvb3Jkc30sIHNlbGVjdGVkPSR7aGFzU2VsZWN0ZWRab25lfSwgaW52YWxpZD0ke2hhc0ludmFsaWRDb29yZHN9LCBjb29yZHM9KCR7Y2ZnLlRJTEVfWH0sJHtjZmcuVElMRV9ZfSlgKTtcblxuICByZXR1cm4gbmVlZHNDYWxpYjtcbiAgfVxuXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGhhYmlsaXRhciBjYXB0dXJhIGRlIGNvb3JkZW5hZGFzXG4gIGZ1bmN0aW9uIGVuYWJsZUNhcHR1cmVPbmNlKCkge1xuICAgIGxvZygnXHVEODNEXHVERDc1XHVGRTBGIEFjdGl2YW5kbyBjYXB0dXJhIGRlIGNvb3JkZW5hZGFzLi4uJyk7XG4gICAgXG4gICAgY29vcmRpbmF0ZUNhcHR1cmUuZW5hYmxlKChyZXN1bHQpID0+IHtcbiAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICBjZmcuVElMRV9YID0gcmVzdWx0LnRpbGVYO1xuICAgICAgICBjZmcuVElMRV9ZID0gcmVzdWx0LnRpbGVZO1xuICAgICAgICBzYXZlRmFybUNmZyhjZmcpO1xuICAgICAgICB1aS51cGRhdGVDb25maWcoKTtcbiAgICAgICAgdWkuc2V0U3RhdHVzKGBcdUQ4M0NcdURGQUYgQ29vcmRlbmFkYXMgY2FwdHVyYWRhczogdGlsZSgke3Jlc3VsdC50aWxlWH0sJHtyZXN1bHQudGlsZVl9KWAsICdzdWNjZXNzJyk7XG4gICAgICAgIGxvZyhgXHUyNzA1IENvb3JkZW5hZGFzIGNhcHR1cmFkYXMgYXV0b21cdTAwRTF0aWNhbWVudGU6IHRpbGUoJHtyZXN1bHQudGlsZVh9LCR7cmVzdWx0LnRpbGVZfSlgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVpLnNldFN0YXR1cyhgXHUyNzRDICR7dCgnY29tbW9uLmVycm9yJywgJ05vIHNlIHB1ZGllcm9uIGNhcHR1cmFyIGNvb3JkZW5hZGFzJyl9YCwgJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgdWkuc2V0U3RhdHVzKGBcdUQ4M0RcdURDRjggJHt0KCdmYXJtLmNhcHR1cmVJbnN0cnVjdGlvbnMnKX1gLCAnc3RhdHVzJyk7XG4gIH1cblxuICAvLyBJbmljaWFsaXphciBjb25maWd1cmFjaVx1MDBGM25cbiAgbGV0IGNmZyA9IHsgLi4uRkFSTV9ERUZBVUxUUywgLi4ubG9hZEZhcm1DZmcoRkFSTV9ERUZBVUxUUykgfTtcbiAgXG4gIC8vIFZlcmlmaWNhciBzaXRla2V5XG4gIGlmICghY2ZnLlNJVEVLRVkpIHtcbiAgICBjb25zdCBzaXRlS2V5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbZGF0YS1zaXRla2V5XScpO1xuICAgIGlmIChzaXRlS2V5RWxlbWVudCkge1xuICAgICAgY2ZnLlNJVEVLRVkgPSBzaXRlS2V5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l0ZWtleScpO1xuICAgICAgbG9nKGBcdUQ4M0RcdURDREQgU2l0ZWtleSBlbmNvbnRyYWRhIGF1dG9tXHUwMEUxdGljYW1lbnRlOiAke2NmZy5TSVRFS0VZLnN1YnN0cmluZygwLCAyMCl9Li4uYCk7XG4gICAgICBzYXZlRmFybUNmZyhjZmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2coJ1x1MjZBMFx1RkUwRiBObyBzZSBwdWRvIGVuY29udHJhciBsYSBzaXRla2V5IGF1dG9tXHUwMEUxdGljYW1lbnRlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgYWN0dWFsaXphciBzZXNpXHUwMEYzbiB5IGVzdGFkXHUwMEVEc3RpY2FzXG4gIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVN0YXRzKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2Vzc2lvbigpO1xuICAgICAgaWYgKHNlc3Npb24uc3VjY2VzcyAmJiBzZXNzaW9uLmRhdGEpIHtcbiAgICAgICAgZmFybVN0YXRlLmNoYXJnZXMuY291bnQgPSBzZXNzaW9uLmRhdGEuY2hhcmdlcyB8fCAwO1xuICAgICAgICBmYXJtU3RhdGUuY2hhcmdlcy5tYXggPSBzZXNzaW9uLmRhdGEubWF4Q2hhcmdlcyB8fCA1MDtcbiAgICAgICAgZmFybVN0YXRlLmNoYXJnZXMucmVnZW4gPSBzZXNzaW9uLmRhdGEuY2hhcmdlUmVnZW4gfHwgMzAwMDA7XG4gICAgICAgIGZhcm1TdGF0ZS51c2VyID0gc2Vzc2lvbi5kYXRhLnVzZXI7XG4gICAgICAgIFxuICAgICAgICAvLyBBY3R1YWxpemFyIGNvbmZpZ3VyYWNpXHUwMEYzbiBjb24gZGF0b3MgZGUgbGEgc2VzaVx1MDBGM25cbiAgICAgICAgY2ZnLkNIQVJHRV9SRUdFTl9NUyA9IGZhcm1TdGF0ZS5jaGFyZ2VzLnJlZ2VuO1xuICAgICAgICBcbiAgICAgICAgLy8gVmVyaWZpY2FyIGhlYWx0aFxuICAgICAgICBjb25zdCBoZWFsdGggPSBhd2FpdCBjaGVja0JhY2tlbmRIZWFsdGgoKTtcbiAgICAgICAgZmFybVN0YXRlLmhlYWx0aCA9IGhlYWx0aDtcbiAgICAgICAgXG4gICAgICAgIHVpLnVwZGF0ZVN0YXRzKGZhcm1TdGF0ZS5wYWludGVkLCBmYXJtU3RhdGUuY2hhcmdlcy5jb3VudCwgZmFybVN0YXRlLnJldHJ5Q291bnQsIGhlYWx0aCk7XG4gICAgICAgIHJldHVybiBzZXNzaW9uLmRhdGE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCdFcnJvciBhY3R1YWxpemFuZG8gZXN0YWRcdTAwRURzdGljYXM6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgdmVyaWZpY2FyIGhlYWx0aCBkZWwgYmFja2VuZFxuICBhc3luYyBmdW5jdGlvbiBjaGVja0JhY2tlbmRIZWFsdGgoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBjaGVja0hlYWx0aCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ0Vycm9yIHZlcmlmaWNhbmRvIGhlYWx0aDonLCBlcnJvcik7XG4gICAgICByZXR1cm4geyB1cDogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH07XG4gICAgfVxuICB9XG5cbiAgLy8gRnVuY2lcdTAwRjNuIGRlIHBpbnRhZG8gaW5kaXZpZHVhbFxuICBhc3luYyBmdW5jdGlvbiBwYWludE9uY2VXcmFwcGVyKCkge1xuICAgIHJldHVybiBhd2FpdCBwYWludFdpdGhSZXRyeShjZmcsIGZhcm1TdGF0ZSwgdWkuc2V0U3RhdHVzLCB1aS5mbGFzaEVmZmVjdCwgKCkgPT4gZ2V0U2Vzc2lvbigpLCBjaGVja0JhY2tlbmRIZWFsdGgpO1xuICB9XG5cbiAgLy8gQ3JlYXIgbGEgaW50ZXJmYXogZGUgdXN1YXJpb1xuICBjb25zdCB1aSA9IGNyZWF0ZUZhcm1VSShcbiAgICBjZmcsXG4gICAgLy8gb25TdGFydFxuICAgIGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChmYXJtU3RhdGUucnVubmluZykge1xuICAgICAgICB1aS5zZXRTdGF0dXMoJ1x1MjZBMFx1RkUwRiBFbCBib3QgeWEgZXN0XHUwMEUxIGVqZWN1dFx1MDBFMW5kb3NlJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gU2kgbm8gc2UgaGEgc2VsZWNjaW9uYWRvIHVuYSB6b25hLCBhY3RpdmFyIGF1dG9tXHUwMEUxdGljYW1lbnRlIGxhIHNlbGVjY2lcdTAwRjNuXG4gICAgICBpZiAoIWNmZy5QT1NJVElPTl9TRUxFQ1RFRCB8fCBjZmcuQkFTRV9YID09PSBudWxsIHx8IGNmZy5CQVNFX1kgPT09IG51bGwpIHtcbiAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2Zhcm0uYXV0b1NlbGVjdFBvc2l0aW9uJyksICdpbmZvJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBY3RpdmFyIHNlbGVjY2lcdTAwRjNuIGRlIHpvbmEgYXV0b21cdTAwRTF0aWNhbWVudGVcbiAgICAgICAgY29uc3Qgc2VsZWN0QnV0dG9uID0gdWkuZ2V0RWxlbWVudCgpLnNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC1wb3NpdGlvbi1idG4nKTtcbiAgICAgICAgaWYgKHNlbGVjdEJ1dHRvbikge1xuICAgICAgICAgIHNlbGVjdEJ1dHRvbi5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBSZXRvcm5hciBwYXJhIG5vIGluaWNpYXIgZWwgYm90IHRvZGF2XHUwMEVEYVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIFZlcmlmaWNhciBzaSBuZWNlc2l0YSBjYWxpYnJhY2lcdTAwRjNuIChzb2xvIHNpIG5vIGhheSB6b25hIHNlbGVjY2lvbmFkYSlcbiAgICAgIGlmIChuZWVkc0NhbGlicmF0aW9uQ2hlY2soY2ZnKSkge1xuICAgICAgICB1aS5zZXRTdGF0dXMoJ1x1RDgzQ1x1REZBRiBDYWxpYnJhbmRvIGF1dG9tXHUwMEUxdGljYW1lbnRlLi4uJywgJ3N0YXR1cycpO1xuICAgICAgICBjb25zdCBjYWxpYnJhdGlvbiA9IGF3YWl0IGF1dG9DYWxpYnJhdGVUaWxlKGNmZyk7XG4gICAgICAgIGlmIChjYWxpYnJhdGlvbi5zdWNjZXNzKSB7XG4gICAgICAgICAgdWkuc2V0U3RhdHVzKGBcdTI3MDUgQ2FsaWJyYWRvOiB0aWxlKCR7Y2FsaWJyYXRpb24udGlsZVh9LCR7Y2FsaWJyYXRpb24udGlsZVl9KWAsICdzdWNjZXNzJyk7XG4gICAgICAgICAgdWkudXBkYXRlQ29uZmlnKCk7IC8vIEFjdHVhbGl6YXIgVUkgY29uIG51ZXZhcyBjb29yZGVuYWRhc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVpLnNldFN0YXR1cygnXHUyNzRDIEVycm9yIGVuIGNhbGlicmFjaVx1MDBGM24uIENvbmZpZ3VyYSBtYW51YWxtZW50ZS4nLCAnZXJyb3InKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gVmVyaWZpY2FyIGNvbmVjdGl2aWRhZFxuICAgICAgdWkuc2V0U3RhdHVzKCdcdUQ4M0RcdUREMEQgVmVyaWZpY2FuZG8gY29uZWN0aXZpZGFkLi4uJywgJ3N0YXR1cycpO1xuICAgICAgY29uc3QgaGVhbHRoID0gYXdhaXQgY2hlY2tCYWNrZW5kSGVhbHRoKCk7XG4gICAgICBpZiAoIWhlYWx0aC51cCkge1xuICAgICAgICB1aS5zZXRTdGF0dXMoJ1x1RDgzRFx1REQzNCBCYWNrZW5kIG5vIGRpc3BvbmlibGUuIFZlcmlmaWNhIHR1IGNvbmV4aVx1MDBGM24uJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gT2J0ZW5lciBzZXNpXHUwMEYzbiBpbmljaWFsXG4gICAgICB1aS5zZXRTdGF0dXMoJ1x1RDgzRFx1REQwNCBPYnRlbmllbmRvIGluZm9ybWFjaVx1MDBGM24gZGUgc2VzaVx1MDBGM24uLi4nLCAnc3RhdHVzJyk7XG4gICAgICBjb25zdCBzZXNzaW9uRGF0YSA9IGF3YWl0IHVwZGF0ZVN0YXRzKCk7XG4gICAgICBpZiAoIXNlc3Npb25EYXRhKSB7XG4gICAgICAgIHVpLnNldFN0YXR1cygnXHUyNzRDIEVycm9yIG9idGVuaWVuZG8gc2VzaVx1MDBGM24uIFZlcmlmaWNhIHR1IGxvZ2luLicsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIHVpLnNldFN0YXR1cygnXHVEODNEXHVERTgwIEluaWNpYW5kbyBib3QuLi4nLCAnc3RhdHVzJyk7XG4gICAgICB1aS51cGRhdGVCdXR0b25TdGF0ZXModHJ1ZSk7XG4gICAgICBcbiAgICAgIC8vIEluaWNpYXIgZWwgbG9vcCBwcmluY2lwYWxcbiAgICAgIGxvb3AoY2ZnLCBmYXJtU3RhdGUsIHVpLnNldFN0YXR1cywgdWkuZmxhc2hFZmZlY3QsIHVwZGF0ZVN0YXRzLCBjaGVja0JhY2tlbmRIZWFsdGgsIHVwZGF0ZVN0YXRzKTtcbiAgICB9LFxuICAgIFxuICAgIC8vIG9uU3RvcFxuICAgICgpID0+IHtcbiAgICAgIGZhcm1TdGF0ZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgICBpZiAod2luZG93Ll9fd3BsYWNlQm90KSB7XG4gICAgICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5mYXJtUnVubmluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdWkuc2V0U3RhdHVzKCdcdTIzRjlcdUZFMEYgRGV0ZW5pZW5kbyBib3QuLi4nLCAnc3RhdHVzJyk7XG4gICAgICB1aS51cGRhdGVCdXR0b25TdGF0ZXMoZmFsc2UpO1xuICAgIH0sXG4gICAgXG4gICAgLy8gb25DYWxpYnJhdGVcbiAgICBhc3luYyAoKSA9PiB7XG4gICAgICB1aS5zZXRTdGF0dXMoJ1x1RDgzQ1x1REZBRiBDYWxpYnJhbmRvIHBvc2ljaVx1MDBGM24uLi4nLCAnc3RhdHVzJyk7XG4gICAgICBjb25zdCBjYWxpYnJhdGlvbiA9IGF3YWl0IGF1dG9DYWxpYnJhdGVUaWxlKGNmZyk7XG4gICAgICBpZiAoY2FsaWJyYXRpb24uc3VjY2Vzcykge1xuICAgICAgICB1aS5zZXRTdGF0dXMoYFx1MjcwNSBDYWxpYnJhZG86IHRpbGUoJHtjYWxpYnJhdGlvbi50aWxlWH0sJHtjYWxpYnJhdGlvbi50aWxlWX0pYCwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgdWkudXBkYXRlQ29uZmlnKCk7IC8vIEFjdHVhbGl6YXIgVUkgY29uIG51ZXZhcyBjb29yZGVuYWRhc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdWkuc2V0U3RhdHVzKGBcdTI3NEMgRXJyb3IgZW4gY2FsaWJyYWNpXHUwMEYzbjogJHtjYWxpYnJhdGlvbi5lcnJvciB8fCAnRGVzY29ub2NpZG8nfWAsICdlcnJvcicpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvLyBDb25maWd1cmFyIGVsIGJvdFx1MDBGM24gZGUgY2FwdHVyYVxuICBjb25zdCBjYXB0dXJlQnRuID0gdWkuZ2V0RWxlbWVudCgpLnNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ2NhcHR1cmUtYnRuJyk7XG4gIGlmIChjYXB0dXJlQnRuKSB7XG4gICAgY2FwdHVyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVuYWJsZUNhcHR1cmVPbmNlKTtcbiAgfVxuXG4gIC8vIENvbmZpZ3VyYXIgZWwgYm90XHUwMEYzbiBcIlVuYSB2ZXpcIlxuICBjb25zdCBvbmNlQnRuID0gdWkuZ2V0RWxlbWVudCgpLnNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ29uY2UtYnRuJyk7XG4gIGlmIChvbmNlQnRuKSB7XG4gICAgb25jZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChmYXJtU3RhdGUucnVubmluZykge1xuICAgICAgICB1aS5zZXRTdGF0dXMoJ1x1MjZBMFx1RkUwRiBEZXRcdTAwRTluIGVsIGJvdCBwcmltZXJvJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgYXdhaXQgdXBkYXRlU3RhdHMoKTtcbiAgICAgIHVpLnNldFN0YXR1cygnXHVEODNDXHVERkE4IFBpbnRhbmRvIHVuYSB2ZXouLi4nLCAnc3RhdHVzJyk7XG4gICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgcGFpbnRPbmNlV3JhcHBlcigpO1xuICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgdWkuc2V0U3RhdHVzKCdcdTI3MDUgUFx1MDBFRHhlbCBwaW50YWRvIGV4aXRvc2FtZW50ZScsICdzdWNjZXNzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1aS5zZXRTdGF0dXMoJ1x1Mjc0QyBFcnJvciBhbCBwaW50YXIgcFx1MDBFRHhlbCcsICdlcnJvcicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQWN0dWFsaXphciBlc3RhZFx1MDBFRHN0aWNhcyBpbmljaWFsXG4gIGF3YWl0IHVwZGF0ZVN0YXRzKCk7XG5cbiAgLy8gU2V0dXAgZGUgZXZlbnRvcyBnbG9iYWxlc1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd3BsYWNlLWJhdGNoLXBhaW50ZWQnLCAoZXZlbnQpID0+IHtcbiAgICBsb2coYFx1RDgzQ1x1REZBOCBMb3RlIHBpbnRhZG86ICR7ZXZlbnQuZGV0YWlsLnBpeGVsQ291bnR9IHBcdTAwRUR4ZWxlcyBlbiB0aWxlKCR7ZXZlbnQuZGV0YWlsLnRpbGVYfSwke2V2ZW50LmRldGFpbC50aWxlWX0pYCk7XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0gRXhwb25lciBBUEkgcG9yIGNvbnNvbGEgKGNvbW8gZW4gZWwgb3JpZ2luYWwpIC0tLS0tLS0tLS1cbiAgd2luZG93LldQQVVJID0ge1xuICAgIG9uY2U6IHBhaW50T25jZVdyYXBwZXIsXG4gICAgZ2V0OiAoKSA9PiAoeyAuLi5jZmcgfSksXG4gICAgY2FwdHVyZTogZW5hYmxlQ2FwdHVyZU9uY2UsXG4gICAgcmVmcmVzaENhbnZhczogKCkgPT4ge1xuICAgICAgLy8gQWN0dWFsaXphciBjYW52YXMgc2kgaGF5IFx1MDBGQWx0aW1vIHBcdTAwRUR4ZWwgcGludGFkb1xuICAgICAgaWYgKGZhcm1TdGF0ZS5sYXN0KSB7XG4gICAgICAgIC8vIEVzdGEgZnVuY2lcdTAwRjNuIHNlIGltcGxlbWVudGFyXHUwMEVEYSBlbiBsb29wLmpzXG4gICAgICAgIGxvZyhgUmVmcmVzY2FuZG8gY2FudmFzIGVuIHBvc2ljaVx1MDBGM24gKCR7ZmFybVN0YXRlLmxhc3QueH0sJHtmYXJtU3RhdGUubGFzdC55fSlgKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHZlcmlmeVBpeGVsOiBhc3luYyAoeCwgeSkgPT4ge1xuICAgICAgbG9nKGBWZXJpZmljYW5kbyBwXHUwMEVEeGVsIGVuICgke3h9LCR7eX0pLi4uYCk7XG4gICAgICAvLyBFc3RhIGZ1bmNpXHUwMEYzbiB2ZXJpZmljYXJcdTAwRURhIHNpIHVuIHBcdTAwRUR4ZWwgZXNwZWNcdTAwRURmaWNvIGZ1ZSBwaW50YWRvIGNvcnJlY3RhbWVudGVcbiAgICAgIHJldHVybiB7IHZlcmlmaWVkOiB0cnVlLCB4LCB5IH07XG4gICAgfSxcbiAgICBcbiAgICBnZXRTdGF0czogKCkgPT4gKHtcbiAgICAgIHBhaW50ZWQ6IGZhcm1TdGF0ZS5wYWludGVkLFxuICAgICAgbGFzdDogZmFybVN0YXRlLmxhc3QsXG4gICAgICBjaGFyZ2VzOiBmYXJtU3RhdGUuY2hhcmdlcyxcbiAgICAgIHVzZXI6IGZhcm1TdGF0ZS51c2VyLFxuICAgICAgcnVubmluZzogZmFybVN0YXRlLnJ1bm5pbmcsXG4gICAgICBtaW5DaGFyZ2VzOiBjZmcuTUlOX0NIQVJHRVMsXG4gICAgICBkZWxheTogY2ZnLkRFTEFZX01TLFxuICAgICAgdGlsZUluZm86IHtcbiAgICAgICAgdGlsZVg6IGNmZy5USUxFX1gsXG4gICAgICAgIHRpbGVZOiBjZmcuVElMRV9ZLFxuICAgICAgICB0aWxlU2l6ZTogY2ZnLlRJTEVfU0laRSxcbiAgICAgICAgc2FmZU1hcmdpbjogTWF0aC5mbG9vcihjZmcuVElMRV9TSVpFICogMC4wNSksXG4gICAgICAgIHNhZmVBcmVhOiB7XG4gICAgICAgICAgbWluWDogTWF0aC5mbG9vcihjZmcuVElMRV9TSVpFICogMC4wNSksXG4gICAgICAgICAgbWF4WDogY2ZnLlRJTEVfU0laRSAtIE1hdGguZmxvb3IoY2ZnLlRJTEVfU0laRSAqIDAuMDUpIC0gMSxcbiAgICAgICAgICBtaW5ZOiBNYXRoLmZsb29yKGNmZy5USUxFX1NJWkUgKiAwLjA1KSxcbiAgICAgICAgICBtYXhZOiBjZmcuVElMRV9TSVpFIC0gTWF0aC5mbG9vcihjZmcuVElMRV9TSVpFICogMC4wNSkgLSAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgICBcbiAgICBzZXRQaXhlbHNQZXJCYXRjaDogKGNvdW50KSA9PiB7XG4gICAgICBjZmcuUElYRUxTX1BFUl9CQVRDSCA9IGNsYW1wKGNvdW50LCAxLCA1MCk7XG4gICAgICBzYXZlRmFybUNmZyhjZmcpO1xuICAgICAgdWkudXBkYXRlQ29uZmlnKCk7XG4gICAgICBsb2coYFBcdTAwRUR4ZWxlcyBwb3IgbG90ZSBjb25maWd1cmFkbyBhOiAke2NmZy5QSVhFTFNfUEVSX0JBVENIfWApO1xuICAgIH0sXG4gICAgXG4gICAgc2V0TWluQ2hhcmdlczogKG1pbikgPT4ge1xuICAgICAgY2ZnLk1JTl9DSEFSR0VTID0gTWF0aC5tYXgoMCwgbWluKTtcbiAgICAgIHNhdmVGYXJtQ2ZnKGNmZyk7XG4gICAgICB1aS51cGRhdGVDb25maWcoKTtcbiAgICAgIGxvZyhgQ2FyZ2FzIG1cdTAwRURuaW1hcyBjb25maWd1cmFkYXMgYTogJHtjZmcuTUlOX0NIQVJHRVN9YCk7XG4gICAgfSxcbiAgICBcbiAgICBzZXREZWxheTogKHNlY29uZHMpID0+IHtcbiAgICAgIGNmZy5ERUxBWV9NUyA9IE1hdGgubWF4KDEwMDAsIHNlY29uZHMgKiAxMDAwKTtcbiAgICAgIHNhdmVGYXJtQ2ZnKGNmZyk7XG4gICAgICB1aS51cGRhdGVDb25maWcoKTtcbiAgICAgIGxvZyhgRGVsYXkgY29uZmlndXJhZG8gYTogJHtjZmcuREVMQVlfTVN9bXNgKTtcbiAgICB9LFxuICAgIFxuICAgIGRpYWdub3NlOiAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0cyA9IHdpbmRvdy5XUEFVSS5nZXRTdGF0cygpO1xuICAgICAgY29uc3QgZGlhZ25vc2lzID0ge1xuICAgICAgICBjb25maWdWYWxpZDogTnVtYmVyLmlzRmluaXRlKGNmZy5USUxFX1gpICYmIE51bWJlci5pc0Zpbml0ZShjZmcuVElMRV9ZKSxcbiAgICAgICAgaGFzQ2hhcmdlczogZmFybVN0YXRlLmNoYXJnZXMuY291bnQgPiAwLFxuICAgICAgICBiYWNrZW5kSGVhbHRoeTogZmFybVN0YXRlLmhlYWx0aD8udXAgfHwgZmFsc2UsXG4gICAgICAgIHVzZXJMb2dnZWRJbjogISFmYXJtU3RhdGUudXNlcixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGAoJHtjZmcuVElMRV9YfSwke2NmZy5USUxFX1l9KWAsXG4gICAgICAgIHNhZmVBcmVhOiBzdGF0cy50aWxlSW5mby5zYWZlQXJlYSxcbiAgICAgICAgcmVjb21tZW5kYXRpb25zOiBbXVxuICAgICAgfTtcbiAgICAgIFxuICAgICAgaWYgKCFkaWFnbm9zaXMuY29uZmlnVmFsaWQpIHtcbiAgICAgICAgZGlhZ25vc2lzLnJlY29tbWVuZGF0aW9ucy5wdXNoKCdDYWxpYnJhciBjb29yZGVuYWRhcyBkZWwgdGlsZScpO1xuICAgICAgfVxuICAgICAgaWYgKCFkaWFnbm9zaXMuaGFzQ2hhcmdlcykge1xuICAgICAgICBkaWFnbm9zaXMucmVjb21tZW5kYXRpb25zLnB1c2goJ0VzcGVyYXIgYSBxdWUgc2UgcmVnZW5lcmVuIGxhcyBjYXJnYXMnKTtcbiAgICAgIH1cbiAgICAgIGlmICghZGlhZ25vc2lzLmJhY2tlbmRIZWFsdGh5KSB7XG4gICAgICAgIGRpYWdub3Npcy5yZWNvbW1lbmRhdGlvbnMucHVzaCgnVmVyaWZpY2FyIGNvbmV4aVx1MDBGM24gYWwgYmFja2VuZCcpO1xuICAgICAgfVxuICAgICAgaWYgKCFkaWFnbm9zaXMudXNlckxvZ2dlZEluKSB7XG4gICAgICAgIGRpYWdub3Npcy5yZWNvbW1lbmRhdGlvbnMucHVzaCgnSW5pY2lhciBzZXNpXHUwMEYzbiBlbiBsYSBwbGF0YWZvcm1hJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnNvbGUudGFibGUoZGlhZ25vc2lzKTtcbiAgICAgIHJldHVybiBkaWFnbm9zaXM7XG4gICAgfSxcbiAgICBcbiAgICBjaGVja0hlYWx0aDogY2hlY2tCYWNrZW5kSGVhbHRoLFxuICAgIFxuICAgIHJlc2V0Q29uZmlnOiAoKSA9PiB7XG4gICAgICByZXNldFRvU2FmZURlZmF1bHRzKCk7XG4gICAgICBjZmcgPSB7IC4uLkZBUk1fREVGQVVMVFMgfTtcbiAgICAgIHVpLnVwZGF0ZUNvbmZpZygpO1xuICAgICAgbG9nKCdDb25maWd1cmFjaVx1MDBGM24gcmVzZXRlYWRhIGEgdmFsb3JlcyBwb3IgZGVmZWN0bycpO1xuICAgIH0sXG4gICAgXG4gICAgZGVidWdSZXRyaWVzOiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50UmV0cmllczogZmFybVN0YXRlLnJldHJ5Q291bnQsXG4gICAgICAgIGluQ29vbGRvd246IGZhcm1TdGF0ZS5pbkNvb2xkb3duLFxuICAgICAgICBuZXh0UGFpbnRUaW1lOiBmYXJtU3RhdGUubmV4dFBhaW50VGltZSxcbiAgICAgICAgY29vbGRvd25FbmRUaW1lOiBmYXJtU3RhdGUuY29vbGRvd25FbmRUaW1lXG4gICAgICB9O1xuICAgIH0sXG4gICAgXG4gICAgZm9yY2VDbGVhckNvb2xkb3duOiAoKSA9PiB7XG4gICAgICBmYXJtU3RhdGUuaW5Db29sZG93biA9IGZhbHNlO1xuICAgICAgZmFybVN0YXRlLm5leHRQYWludFRpbWUgPSAwO1xuICAgICAgZmFybVN0YXRlLmNvb2xkb3duRW5kVGltZSA9IDA7XG4gICAgICBmYXJtU3RhdGUucmV0cnlDb3VudCA9IDA7XG4gICAgICBsb2coJ0Nvb2xkb3duIGZvcnphZG8gYSBsaW1waWFyJyk7XG4gICAgfSxcbiAgICBcbiAgICBzaW11bGF0ZUVycm9yOiAoc3RhdHVzQ29kZSA9IDUwMCkgPT4ge1xuICAgICAgbG9nKGBTaW11bGFuZG8gZXJyb3IgJHtzdGF0dXNDb2RlfSBwYXJhIHRlc3RpbmcuLi5gKTtcbiAgICAgIHVpLnNldFN0YXR1cyhgXHVEODNFXHVEREVBIFNpbXVsYW5kbyBlcnJvciAke3N0YXR1c0NvZGV9YCwgJ2Vycm9yJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIENsZWFudXAgYWwgY2VycmFyIGxhIHBcdTAwRTFnaW5hXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgZmFybVN0YXRlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICBpZiAod2luZG93Ll9fd3BsYWNlQm90KSB7XG4gICAgICB3aW5kb3cuX193cGxhY2VCb3QuZmFybVJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgY29vcmRpbmF0ZUNhcHR1cmUuZGlzYWJsZSgpO1xuICAgIHVpLmRlc3Ryb3koKTtcbiAgfSk7XG5cbiAgbG9nKCdcdTI3MDUgRmFybSBCb3QgaW5pY2lhbGl6YWRvIGNvcnJlY3RhbWVudGUnKTtcbiAgbG9nKCdcdUQ4M0RcdURDQTEgVXNhIGNvbnNvbGUubG9nKHdpbmRvdy5XUEFVSSkgcGFyYSB2ZXIgbGEgQVBJIGRpc3BvbmlibGUnKTtcblxufSkoKS5jYXRjaCgoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKFwiW0JPVF0gRXJyb3IgZW4gQXV0by1GYXJtOlwiLCBlKTtcbiAgaWYgKHdpbmRvdy5fX3dwbGFjZUJvdCkge1xuICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5mYXJtUnVubmluZyA9IGZhbHNlO1xuICB9XG4gIGFsZXJ0KFwiQXV0by1GYXJtOiBlcnJvciBpbmVzcGVyYWRvLiBSZXZpc2EgY29uc29sYS5cIik7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7OztBQVVPLE1BQU0sTUFBTSxJQUFJLE1BQU0sUUFBUSxJQUFJLFlBQVksR0FBRyxDQUFDOzs7QUNUbEQsTUFBTSxnQkFBZ0I7QUFBQSxJQUMzQixTQUFTO0FBQUE7QUFBQSxJQUNULFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBQ1gsVUFBVTtBQUFBO0FBQUEsSUFDVixhQUFhO0FBQUE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBO0FBQUEsSUFDakIsa0JBQWtCO0FBQUE7QUFBQSxJQUNsQixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUE7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLGdCQUFnQixDQUFDLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxTQUFTO0FBQUE7QUFBQSxJQUVqRixRQUFRO0FBQUE7QUFBQSxJQUNSLFFBQVE7QUFBQTtBQUFBLElBQ1IsYUFBYTtBQUFBO0FBQUEsSUFDYixtQkFBbUI7QUFBQTtBQUFBLElBQ25CLFVBQVU7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxN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QUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLGVBQWU7QUFBQSxNQUNmLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLHFCQUFxQjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNWLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLHlCQUF5QjtBQUFBLE1BQ3pCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxJQUNoQjtBQUFBO0FBQUEsSUFHQSxNQUFNO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixPQUFPO0FBQUEsTUFDUCxnQkFBZ0I7QUFBQSxNQUNoQixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxZQUFZO0FBQUEsTUFDWixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixxQkFBcUI7QUFBQSxNQUNyQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixxQkFBcUI7QUFBQSxNQUNyQixnQkFBZ0I7QUFBQSxNQUNoQixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixZQUFZO0FBQUEsTUFDWixjQUFjO0FBQUEsTUFDZCxpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixvQkFBb0I7QUFBQSxJQUN0QjtBQUFBO0FBQUEsSUFHQSxRQUFRO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxJQUNuQjtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixvQkFBb0I7QUFBQSxNQUNwQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixvQkFBb0I7QUFBQSxNQUNwQixrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7OztBQzNQTyxNQUFNLEtBQUs7QUFBQTtBQUFBLElBRWhCLFVBQVU7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxJQUNYO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7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UixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxJQUNuQjtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixvQkFBb0I7QUFBQSxNQUNwQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixvQkFBb0I7QUFBQSxNQUNwQixrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7OztBQzNQTyxNQUFNLEtBQUs7QUFBQTtBQUFBLElBRWhCLFVBQVU7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxJQUNYO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLGVBQWU7QUFBQSxNQUNmLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLHFCQUFxQjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLHlCQUF5QjtBQUFBLE1BQ3pCLGtCQUFrQjtBQUFB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QUNQLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxJQUNYO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFB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S0FBSztBQUNoQixlQUFXLE1BQU0sVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVEzQixVQUFNLFNBQVMsV0FBVyxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFdkQsVUFBTSxRQUFRLFNBQVMsY0FBYyxPQUFPO0FBQzVDLFVBQU0sY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlScEIsV0FBTyxZQUFZLEtBQUs7QUFFeEIsVUFBTSxZQUFZLFNBQVMsY0FBYyxLQUFLO0FBQzlDLGNBQVUsWUFBWTtBQUd0QixVQUFNLFVBQVU7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxJQUNoQjtBQUVBLGNBQVUsWUFBWTtBQUFBO0FBQUE7QUFBQSxvQkFHWCxFQUFFLFlBQVksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkRBUXdCLEVBQUUsY0FBYyxDQUFDO0FBQUE7QUFBQTtBQUFBO0FB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QUFnQixLQUFLLHVDQUF1QztBQUFBLFFBQ3hFO0FBQ0EsWUFBSSxDQUFDLFVBQVUsZ0JBQWdCO0FBQzdCLG9CQUFVLGdCQUFnQixLQUFLLGtDQUErQjtBQUFBLFFBQ2hFO0FBQ0EsWUFBSSxDQUFDLFVBQVUsY0FBYztBQUMzQixvQkFBVSxnQkFBZ0IsS0FBSyxvQ0FBaUM7QUFBQSxRQUNsRTtBQUVBLGdCQUFRLE1BQU0sU0FBUztBQUN2QixlQUFPO0FBQUEsTUFDVDtBQUFBLE1BRUEsYUFBYTtBQUFBLE1BRWIsYUFBYSxNQUFNO0FBQ2pCLDRCQUFvQjtBQUNwQixjQUFNLEVBQUUsR0FBRyxjQUFjO0FBQ3pCLFdBQUcsYUFBYTtBQUNoQixZQUFJLGtEQUErQztBQUFBLE1BQ3JEO0FBQUEsTUFFQSxjQUFjLE1BQU07QUFDbEIsZUFBTztBQUFBLFVBQ0wsZ0JBQWdCLFVBQVU7QUFBQSxVQUMxQixZQUFZLFVBQVU7QUFBQSxVQUN0QixlQUFlLFVBQVU7QUFBQSxVQUN6QixpQkFBaUIsVUFBVTtBQUFBLFFBQzdCO0FBQUEsTUFDRjtBQUFBLE1BRUEsb0JBQW9CLE1BQU07QUFDeEIsa0JBQVUsYUFBYTtBQUN2QixrQkFBVSxnQkFBZ0I7QUFDMUIsa0JBQVUsa0JBQWtCO0FBQzVCLGtCQUFVLGFBQWE7QUFDdkIsWUFBSSw0QkFBNEI7QUFBQSxNQUNsQztBQUFBLE1BRUEsZUFBZSxDQUFDLGFBQWEsUUFBUTtBQUNuQyxZQUFJLG1CQUFtQixVQUFVLGtCQUFrQjtBQUNuRCxXQUFHLFVBQVUsNkJBQXNCLFVBQVUsSUFBSSxPQUFPO0FBQUEsTUFDMUQ7QUFBQSxJQUNGO0FBR0EsV0FBTyxpQkFBaUIsZ0JBQWdCLE1BQU07QUFDNUMsZ0JBQVUsVUFBVTtBQUNwQixVQUFJLE9BQU8sYUFBYTtBQUN0QixlQUFPLFlBQVksY0FBYztBQUFBLE1BQ25DO0FBQ0Esd0JBQWtCLFFBQVE7QUFDMUIsU0FBRyxRQUFRO0FBQUEsSUFDYixDQUFDO0FBRUQsUUFBSSw0Q0FBdUM7QUFDM0MsUUFBSSxvRUFBNkQ7QUFBQSxFQUVuRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU07QUFDaEIsWUFBUSxNQUFNLDZCQUE2QixDQUFDO0FBQzVDLFFBQUksT0FBTyxhQUFhO0FBQ3RCLGFBQU8sWUFBWSxjQUFjO0FBQUEsSUFDbkM7QUFDQSxVQUFNLDhDQUE4QztBQUFBLEVBQ3RELENBQUM7IiwKICAibmFtZXMiOiBbIl9hIiwgImxvYWRlZCIsICJjb25maWciLCAic2V0U3RhdHVzIiwgInVwZGF0ZVpvbmVEaXNwbGF5IiwgInQiLCAiY29vcmRzIiwgImdldFNlc3Npb24iLCAidCIsICJfYSIsICJfYiIsICJjZmciXQp9Cg==
