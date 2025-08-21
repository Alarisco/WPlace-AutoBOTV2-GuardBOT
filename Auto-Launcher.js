/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-21T06:28:30.591Z */
(() => {
  // src/core/logger.js
  var log = (...a) => console.log("[WPA-UI]", ...a);

  // src/core/ui-utils.js
  function createShadowRoot(hostId = null) {
    const host = document.createElement("div");
    if (hostId) {
      host.id = hostId;
    }
    host.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;
    const root = host.attachShadow({ mode: "open" });
    document.body.appendChild(host);
    return { host, root };
  }
  function makeDraggable(dragHandle, element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    dragHandle.style.cursor = "move";
    dragHandle.addEventListener("mousedown", dragMouseDown);
    function dragMouseDown(e) {
      if (e.target.closest(".header-btn, .wplace-header-btn")) return;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }
    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = element.offsetTop - pos2 + "px";
      element.style.left = element.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
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
  var AVAILABLE_LANGUAGES = {
    es: { name: "Espa\xF1ol", flag: "\u{1F1EA}\u{1F1F8}", code: "es" },
    en: { name: "English", flag: "\u{1F1FA}\u{1F1F8}", code: "en" },
    fr: { name: "Fran\xE7ais", flag: "\u{1F1EB}\u{1F1F7}", code: "fr" },
    ru: { name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", flag: "\u{1F1F7}\u{1F1FA}", code: "ru" },
    zhHans: { name: "\u7B80\u4F53\u4E2D\u6587", flag: "\u{1F1E8}\u{1F1F3}", code: "zh-Hans" },
    zhHant: { name: "\u7E41\u9AD4\u4E2D\u6587", flag: "\u{1F1E8}\u{1F1F3}", code: "zh-Hant" }
  };
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
  function getCurrentLanguage() {
    return currentLanguage;
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

  // src/launcher/config.js
  var LAUNCHER_CONFIG = {
    RAW_BASE: "https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main",
    REFRESH_INTERVAL: 6e4,
    // 1 minuto
    THEME: {
      primary: "#000000",
      secondary: "#111111",
      accent: "#222222",
      text: "#ffffff",
      highlight: "#775ce3",
      success: "#00ff00",
      error: "#ff0000"
    }
  };
  function getLauncherTexts() {
    return getSection("launcher");
  }
  var launcherState = {
    me: null,
    health: null,
    refreshTimer: null,
    selectedBot: null
  };

  // src/launcher/ui.js
  function createLauncherUI({
    onSelectBot,
    onLaunch,
    onClose,
    updateUserInfo,
    updateHealthInfo
  }) {
    log("\u{1F39B}\uFE0F Creando interfaz del Launcher");
    const existing = document.getElementById("wpl-panel");
    if (existing) {
      existing.remove();
      log("\u{1F5D1}\uFE0F Panel existente removido");
    }
    const texts = getLauncherTexts();
    const { host, root } = createShadowRoot("wpl-panel");
    const style = document.createElement("style");
    style.textContent = `
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: ${LAUNCHER_CONFIG.THEME.primary};
      border: 1px solid ${LAUNCHER_CONFIG.THEME.accent};
      border-radius: 10px;
      color: ${LAUNCHER_CONFIG.THEME.text};
      font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial;
      z-index: 999999;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      overflow: hidden;
      animation: slideIn 0.3s ease-out;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: ${LAUNCHER_CONFIG.THEME.secondary};
      padding: 10px 12px;
      color: ${LAUNCHER_CONFIG.THEME.highlight};
      font-weight: 600;
      cursor: move;
      user-select: none;
    }
    
    .body {
      padding: 12px;
    }
    
    .row {
      display: flex;
      gap: 8px;
      margin: 8px 0;
    }
    
    .btn {
      flex: 1;
      padding: 9px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn.primary {
      background: ${LAUNCHER_CONFIG.THEME.accent};
      color: white;
    }
    
    .btn.primary:hover:not(:disabled) {
      background: ${LAUNCHER_CONFIG.THEME.highlight};
    }
    
    .btn.ghost {
      background: transparent;
      border: 1px solid ${LAUNCHER_CONFIG.THEME.accent};
      color: ${LAUNCHER_CONFIG.THEME.text};
    }
    
    .btn.ghost:hover:not(:disabled) {
      background: ${LAUNCHER_CONFIG.THEME.accent}22;
    }
    
    .btn.close {
      flex: 0 0 auto;
      padding: 6px 8px;
    }
    
    .card {
      background: ${LAUNCHER_CONFIG.THEME.secondary};
      padding: 10px;
      border-radius: 8px;
      margin-top: 10px;
    }
    
    .stat {
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
      font-size: 13px;
      opacity: 0.95;
    }
    
    .status {
      margin-top: 10px;
      padding: 8px;
      border-radius: 6px;
      text-align: center;
      font-size: 13px;
      background: rgba(255,255,255,0.08);
    }
    
    .selected {
      outline: 2px solid ${LAUNCHER_CONFIG.THEME.highlight};
    }
  `;
    root.appendChild(style);
    const panel = document.createElement("div");
    panel.className = "panel";
    panel.innerHTML = `
    <div class="header">
      <div>${texts.title}</div>
      <button class="btn ghost close close-btn">\u2715</button>
    </div>
    <div class="body">
      <div class="row">
        <button class="btn primary farm-btn">${texts.autoFarm}</button>
        <button class="btn ghost image-btn">${texts.autoImage}</button>
      </div>
      <div class="row">
        <button class="btn ghost guard-btn">${texts.autoGuard}</button>
      </div>
      <div class="card">
        <div class="stat">
          <span>${texts.selection}</span>
          <span class="choice">\u2014</span>
        </div>
      </div>
      <div class="card user-card">
        <div class="stat">
          <span>${texts.user}</span>
          <span class="user-name">-</span>
        </div>
        <div class="stat">
          <span>${texts.charges}</span>
          <span class="user-charges">-</span>
        </div>
      </div>
      <div class="card health-card">
        <div class="stat">
          <span>${texts.backend}</span>
          <span class="backend-status">${texts.checking}</span>
        </div>
        <div class="stat">
          <span>${texts.database}</span>
          <span class="database-status">-</span>
        </div>
        <div class="stat">
          <span>${texts.uptime}</span>
          <span class="uptime">-</span>
        </div>
      </div>
      <div class="status status-text">${texts.chooseBot}</div>
      <div class="row" style="margin-top: 12px;">
        <button class="btn primary launch-btn" disabled>${texts.launch}</button>
        <button class="btn ghost cancel-btn">${texts.close}</button>
      </div>
    </div>
  `;
    root.appendChild(panel);
    const elements = {
      header: panel.querySelector(".header"),
      farmBtn: panel.querySelector(".farm-btn"),
      imageBtn: panel.querySelector(".image-btn"),
      guardBtn: panel.querySelector(".guard-btn"),
      launchBtn: panel.querySelector(".launch-btn"),
      cancelBtn: panel.querySelector(".cancel-btn"),
      closeBtn: panel.querySelector(".close-btn"),
      statusText: panel.querySelector(".status-text"),
      choice: panel.querySelector(".choice"),
      userName: panel.querySelector(".user-name"),
      userCharges: panel.querySelector(".user-charges"),
      backendStatus: panel.querySelector(".backend-status"),
      databaseStatus: panel.querySelector(".database-status"),
      uptime: panel.querySelector(".uptime")
    };
    makeDraggable(elements.header, panel);
    let selectedBot = null;
    function selectBot(botType) {
      selectedBot = botType;
      launcherState.selectedBot = botType;
      elements.choice.textContent = botType === "farm" ? t("launcher.autoFarm") : botType === "image" ? t("launcher.autoImage") : t("launcher.autoGuard");
      elements.launchBtn.disabled = false;
      elements.farmBtn.classList.remove("primary");
      elements.farmBtn.classList.add("ghost");
      elements.imageBtn.classList.remove("primary");
      elements.imageBtn.classList.add("ghost");
      elements.guardBtn.classList.remove("primary");
      elements.guardBtn.classList.add("ghost");
      if (botType === "farm") {
        elements.farmBtn.classList.add("primary");
        elements.farmBtn.classList.remove("ghost");
      } else if (botType === "image") {
        elements.imageBtn.classList.add("primary");
        elements.imageBtn.classList.remove("ghost");
      } else if (botType === "guard") {
        elements.guardBtn.classList.add("primary");
        elements.guardBtn.classList.remove("ghost");
      }
      elements.statusText.textContent = t("launcher.readyToLaunch");
      if (onSelectBot) {
        onSelectBot(botType);
      }
    }
    elements.farmBtn.addEventListener("click", () => selectBot("farm"));
    elements.imageBtn.addEventListener("click", () => selectBot("image"));
    elements.guardBtn.addEventListener("click", () => selectBot("guard"));
    elements.launchBtn.addEventListener("click", async () => {
      if (!selectedBot) return;
      elements.launchBtn.disabled = true;
      elements.launchBtn.textContent = t("launcher.loading");
      elements.statusText.textContent = t("launcher.downloading");
      try {
        if (onLaunch) {
          await onLaunch(selectedBot);
          cleanup();
        }
      } catch (error) {
        log("\u274C Error en launch:", error);
        alert(t("launcher.loadErrorMsg"));
        elements.launchBtn.disabled = false;
        elements.launchBtn.textContent = t("launcher.launch");
        elements.statusText.textContent = t("launcher.loadError");
      }
    });
    function cleanup() {
      window.removeEventListener("languageChanged", handleLanguageChange);
      if (launcherState.refreshTimer) {
        window.clearInterval(launcherState.refreshTimer);
        launcherState.refreshTimer = null;
      }
      host.remove();
      log("\u{1F9F9} Launcher UI eliminado");
    }
    elements.cancelBtn.addEventListener("click", cleanup);
    elements.closeBtn.addEventListener("click", cleanup);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        cleanup();
      }
    }, { once: true });
    const handleLanguageChange = () => {
      updateTexts();
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    function setUserInfo(userInfo) {
      var _a, _b;
      if (!userInfo) {
        elements.userName.textContent = "-";
        elements.userCharges.textContent = "-";
        return;
      }
      const name = userInfo.name || userInfo.username || "-";
      const charges = Math.floor(Number((_b = (_a = userInfo.charges) == null ? void 0 : _a.count) != null ? _b : NaN));
      elements.userName.textContent = name;
      elements.userCharges.textContent = Number.isFinite(charges) ? String(charges) : "-";
    }
    function setHealthInfo(healthInfo) {
      if (!healthInfo) {
        elements.backendStatus.textContent = t("launcher.offline");
        elements.databaseStatus.textContent = "-";
        elements.uptime.textContent = "-";
        return;
      }
      const up = Boolean(healthInfo.up);
      const db = healthInfo.database;
      const uptime = healthInfo.uptime || "-";
      elements.backendStatus.textContent = up ? t("launcher.online") : t("launcher.offline");
      if (db === void 0 || db === null) {
        elements.databaseStatus.textContent = "-";
      } else {
        elements.databaseStatus.textContent = db ? t("launcher.ok") : t("launcher.error");
      }
      elements.uptime.textContent = typeof uptime === "number" ? `${uptime}s` : uptime || "-";
    }
    function updateTexts() {
      const newTexts = getLauncherTexts();
      const titleElement = panel.querySelector(".header div:first-child");
      if (titleElement) {
        titleElement.textContent = newTexts.title;
      }
      if (elements.farmBtn) {
        elements.farmBtn.textContent = newTexts.autoFarm;
      }
      if (elements.imageBtn) {
        elements.imageBtn.textContent = newTexts.autoImage;
      }
      if (elements.guardBtn) {
        elements.guardBtn.textContent = newTexts.autoGuard;
      }
      if (elements.launchBtn) {
        elements.launchBtn.textContent = newTexts.launch;
      }
      if (elements.closeBtn) {
        elements.closeBtn.textContent = newTexts.close;
      }
      const selectionSpan = panel.querySelector(".card:first-of-type .stat span:first-child");
      if (selectionSpan) {
        selectionSpan.textContent = newTexts.selection;
      }
      const userSpan = panel.querySelector(".user-card .stat:first-child span:first-child");
      if (userSpan) {
        userSpan.textContent = newTexts.user;
      }
      const chargesSpan = panel.querySelector(".user-card .stat:last-child span:first-child");
      if (chargesSpan) {
        chargesSpan.textContent = newTexts.charges;
      }
      const backendSpan = panel.querySelector(".health-card .stat:first-child span:first-child");
      if (backendSpan) {
        backendSpan.textContent = newTexts.backend;
      }
      const databaseSpan = panel.querySelector(".health-card .stat:nth-child(2) span:first-child");
      if (databaseSpan) {
        databaseSpan.textContent = newTexts.database;
      }
      const uptimeSpan = panel.querySelector(".health-card .stat:last-child span:first-child");
      if (uptimeSpan) {
        uptimeSpan.textContent = newTexts.uptime;
      }
      if (elements.statusText) {
        const currentStatus = elements.statusText.textContent;
        if (currentStatus === texts.chooseBot || currentStatus === newTexts.chooseBot) {
          elements.statusText.textContent = newTexts.chooseBot;
        } else if (currentStatus === texts.loading || currentStatus === newTexts.loading) {
          elements.statusText.textContent = newTexts.loading;
        } else if (currentStatus === texts.downloading || currentStatus === newTexts.downloading) {
          elements.statusText.textContent = newTexts.downloading;
        } else if (currentStatus === texts.readyToLaunch || currentStatus === newTexts.readyToLaunch) {
          elements.statusText.textContent = newTexts.readyToLaunch;
        } else if (currentStatus === texts.loadError || currentStatus === newTexts.loadError) {
          elements.statusText.textContent = newTexts.loadError;
        }
      }
      if (elements.backendStatus) {
        const currentBackend = elements.backendStatus.textContent;
        if (currentBackend === texts.online || currentBackend === newTexts.online) {
          elements.backendStatus.textContent = newTexts.online;
        } else if (currentBackend === texts.offline || currentBackend === newTexts.offline) {
          elements.backendStatus.textContent = newTexts.offline;
        } else if (currentBackend === texts.checking || currentBackend === newTexts.checking) {
          elements.backendStatus.textContent = newTexts.checking;
        }
      }
      if (elements.databaseStatus) {
        const currentDb = elements.databaseStatus.textContent;
        if (currentDb === texts.ok || currentDb === newTexts.ok) {
          elements.databaseStatus.textContent = newTexts.ok;
        } else if (currentDb === texts.error || currentDb === newTexts.error) {
          elements.databaseStatus.textContent = newTexts.error;
        }
      }
      if (selectedBot && elements.choice) {
        elements.choice.textContent = selectedBot === "farm" ? newTexts.autoFarm : selectedBot === "image" ? newTexts.autoImage : newTexts.autoGuard;
      }
      Object.assign(texts, newTexts);
      log(`\u{1F30D} Textos del launcher actualizados al idioma: ${getCurrentLanguage()}`);
    }
    log("\u2705 Launcher UI creado exitosamente");
    return {
      setUserInfo,
      setHealthInfo,
      cleanup,
      selectBot,
      updateTexts,
      getSelectedBot: () => selectedBot
    };
  }

  // src/launcher/api.js
  async function getSession() {
    var _a, _b;
    log("\u{1F4E1} Obteniendo informaci\xF3n de sesi\xF3n...");
    try {
      const res = await fetch("https://backend.wplace.live/me", {
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      launcherState.me = await res.json();
      log("\u2705 Informaci\xF3n de sesi\xF3n obtenida:", ((_a = launcherState.me) == null ? void 0 : _a.name) || ((_b = launcherState.me) == null ? void 0 : _b.username) || "Usuario");
      return launcherState.me;
    } catch (error) {
      log("\u274C Error obteniendo sesi\xF3n:", error.message);
      launcherState.me = null;
      return null;
    }
  }
  async function checkBackendHealth() {
    var _a, _b, _c, _d, _e, _f;
    log("\u{1F3E5} Verificando estado del backend...");
    try {
      const res = await fetch("https://backend.wplace.live/health", {
        method: "GET",
        credentials: "include"
      });
      let json = null;
      try {
        json = await res.json();
      } catch {
        json = null;
      }
      if (res.ok && json) {
        launcherState.health = {
          up: Boolean((_a = json.up) != null ? _a : true),
          database: (_d = (_c = (_b = json.database) == null ? void 0 : _b.ok) != null ? _c : json.database) != null ? _d : void 0,
          uptime: (_f = (_e = json.uptime) != null ? _e : json.uptimeHuman) != null ? _f : typeof json.uptimeSeconds === "number" ? `${json.uptimeSeconds}s` : void 0
        };
        log("\u2705 Estado del backend obtenido:", launcherState.health);
      } else {
        launcherState.health = {
          up: false,
          database: false,
          uptime: void 0
        };
        log("\u26A0\uFE0F Backend no responde correctamente");
      }
    } catch (error) {
      log("\u274C Error verificando backend:", error.message);
      launcherState.health = {
        up: false,
        database: false,
        uptime: void 0
      };
    }
    return launcherState.health;
  }
  async function downloadAndExecuteBot(botType, rawBase) {
    log(`\u{1F4E5} Descargando bot: ${botType}`);
    try {
      const botFiles = {
        "farm": "Auto-Farm.js",
        "image": "Auto-Image.js",
        "guard": "Auto-Guard.js"
      };
      const fileName = botFiles[botType];
      if (!fileName) {
        throw new Error(`Tipo de bot desconocido: ${botType}`);
      }
      const url = `${rawBase}/${fileName}`;
      log(`\u{1F310} URL: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const code = await response.text();
      log(`\u2705 Bot descargado (${code.length} chars), ejecutando...`);
      (0, eval)(code);
      log("\u{1F680} Bot ejecutado exitosamente");
      return true;
    } catch (error) {
      log("\u274C Error descargando/ejecutando bot:", error.message);
      throw error;
    }
  }

  // src/core/language-selector.js
  function createLanguageSelector(options = {}) {
    const {
      onLanguageChange = null,
      position = "top-right",
      showFlags = true
    } = options;
    const container = document.createElement("div");
    container.className = "language-selector";
    const styles = `
    .language-selector {
      position: fixed;
      ${getPositionStyles(position)}
      z-index: 999998;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
      user-select: none;
    }
    
    .language-selector-button {
      background: transparent;
      border: none;
      color: #eee;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s;
      width: 100%;
      text-align: left;
    }
    
    .language-selector-button:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .language-selector-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 6px;
      margin-top: 4px;
      display: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    
    .language-selector-dropdown.visible {
      display: block;
    }
    
    .language-option {
      background: transparent;
      border: none;
      color: #eee;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      text-align: left;
      transition: background 0.2s;
    }
    
    .language-option:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .language-option.active {
      background: rgba(119, 92, 227, 0.2);
      color: #775ce3;
    }
    
    .language-option:first-child {
      border-radius: 6px 6px 0 0;
    }
    
    .language-option:last-child {
      border-radius: 0 0 6px 6px;
    }
    
    .language-flag {
      font-size: 16px;
    }
    
    .language-name {
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .language-selector {
        position: fixed;
        top: 10px;
        right: 10px;
      }
    }
  `;
    if (!document.querySelector("#language-selector-styles")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "language-selector-styles";
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
    let isOpen = false;
    let currentLang = getCurrentLanguage();
    function render() {
      const langInfo = AVAILABLE_LANGUAGES[currentLang];
      container.innerHTML = `
      <button class="language-selector-button">
        ${showFlags ? `<span class="language-flag">${langInfo.flag}</span>` : ""}
        <span class="language-name">${langInfo.name}</span>
        <span style="margin-left: auto; transform: ${isOpen ? "rotate(180deg)" : "rotate(0deg)"}; transition: transform 0.2s;">\u25BC</span>
      </button>
      <div class="language-selector-dropdown ${isOpen ? "visible" : ""}">
        ${Object.entries(AVAILABLE_LANGUAGES).map(([code, info]) => `
          <button class="language-option ${code === currentLang ? "active" : ""}" data-lang="${code}">
            ${showFlags ? `<span class="language-flag">${info.flag}</span>` : ""}
            <span class="language-name">${info.name}</span>
          </button>
        `).join("")}
      </div>
    `;
      setupEventListeners();
    }
    function setupEventListeners() {
      const button = container.querySelector(".language-selector-button");
      const options2 = container.querySelectorAll(".language-option");
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        render();
      });
      options2.forEach((option) => {
        option.addEventListener("click", (e) => {
          e.stopPropagation();
          const selectedLang = option.dataset.lang;
          if (selectedLang !== currentLang) {
            currentLang = selectedLang;
            setLanguage(selectedLang);
            if (onLanguageChange) {
              onLanguageChange(selectedLang);
            }
          }
          isOpen = false;
          render();
        });
      });
      document.addEventListener("click", () => {
        if (isOpen) {
          isOpen = false;
          render();
        }
      });
    }
    function handleLanguageChange(event) {
      if (event.detail.language !== currentLang) {
        currentLang = event.detail.language;
        render();
      }
    }
    window.addEventListener("languageChanged", handleLanguageChange);
    render();
    return {
      /**
       * Añade el selector al DOM
       * @param {HTMLElement} parent - Elemento padre (opcional, por defecto document.body)
       */
      mount(parent = document.body) {
        parent.appendChild(container);
      },
      /**
       * Remueve el selector del DOM
       */
      unmount() {
        window.removeEventListener("languageChanged", handleLanguageChange);
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      },
      /**
       * Actualiza la posición del selector
       * @param {string} newPosition - Nueva posición
       */
      setPosition(newPosition) {
        container.style.cssText = getPositionStyles(newPosition);
      },
      /**
       * Obtiene el elemento DOM del selector
       * @returns {HTMLElement} Elemento DOM
       */
      getElement() {
        return container;
      },
      /**
       * Fuerza una actualización del componente
       */
      update() {
        currentLang = getCurrentLanguage();
        render();
      }
    };
  }
  function getPositionStyles(position) {
    const positions = {
      "top-right": "top: 15px; right: 15px;",
      "top-left": "top: 15px; left: 15px;",
      "bottom-right": "bottom: 15px; right: 15px;",
      "bottom-left": "bottom: 15px; left: 15px;",
      "top-center": "top: 15px; left: 50%; transform: translateX(-50%);",
      "bottom-center": "bottom: 15px; left: 50%; transform: translateX(-50%);"
    };
    return positions[position] || positions["top-right"];
  }

  // src/launcher/index.js
  async function runLauncher() {
    var _a;
    log("\u{1F680} Iniciando WPlace Auto-Launcher (versi\xF3n modular)");
    initializeLanguage();
    if ((_a = window.__wplaceBot) == null ? void 0 : _a.launcherRunning) {
      alert("Auto-Launcher ya est\xE1 ejecut\xE1ndose.");
      return;
    }
    window.__wplaceBot = { ...window.__wplaceBot, launcherRunning: true };
    try {
      let languageSelector = null;
      const ui = createLauncherUI({
        onSelectBot: (botType) => {
          log(`\u{1F3AF} Bot seleccionado: ${botType}`);
          if (languageSelector) {
            languageSelector.unmount();
            languageSelector = null;
          }
        },
        onLaunch: async (botType) => {
          log(`\u{1F680} Lanzando bot: ${botType}`);
          await downloadAndExecuteBot(botType, LAUNCHER_CONFIG.RAW_BASE);
        },
        onClose: () => {
          log("\u{1F44B} Cerrando launcher");
          if (languageSelector) {
            languageSelector.unmount();
            languageSelector = null;
          }
          window.__wplaceBot.launcherRunning = false;
        }
      });
      languageSelector = createLanguageSelector({
        position: "top-left",
        // Esquina opuesta al launcher
        showFlags: true,
        onLanguageChange: (newLanguage) => {
          log(`\u{1F30D} Idioma cambiado a: ${newLanguage} desde el launcher`);
          ui.updateTexts();
          if (typeof window !== "undefined" && window.CustomEvent) {
            window.dispatchEvent(new window.CustomEvent("launcherLanguageChanged", {
              detail: { language: newLanguage }
            }));
          }
        }
      });
      languageSelector.mount();
      log("\u{1F4CA} Cargando informaci\xF3n inicial...");
      const health = await checkBackendHealth();
      ui.setHealthInfo(health);
      const user = await getSession();
      ui.setUserInfo(user);
      launcherState.refreshTimer = window.setInterval(async () => {
        log("\u{1F504} Actualizando informaci\xF3n...");
        try {
          const [newHealth, newUser] = await Promise.all([
            checkBackendHealth(),
            getSession()
          ]);
          ui.setHealthInfo(newHealth);
          ui.setUserInfo(newUser);
        } catch (error) {
          log("\u274C Error en actualizaci\xF3n peri\xF3dica:", error);
        }
      }, LAUNCHER_CONFIG.REFRESH_INTERVAL);
      window.addEventListener("beforeunload", () => {
        ui.cleanup();
        if (languageSelector) {
          languageSelector.unmount();
        }
        window.__wplaceBot.launcherRunning = false;
      });
      log("\u2705 Auto-Launcher inicializado correctamente");
    } catch (error) {
      log("\u274C Error inicializando Auto-Launcher:", error);
      window.__wplaceBot.launcherRunning = false;
      throw error;
    }
  }

  // src/entries/launcher.js
  (() => {
    "use strict";
    var _a, _b;
    if (((_a = window.__wplaceBot) == null ? void 0 : _a.farmRunning) || ((_b = window.__wplaceBot) == null ? void 0 : _b.imageRunning)) {
      alert("Ya hay un bot ejecut\xE1ndose. Ci\xE9rralo antes de usar el launcher.");
      return;
    }
    if (!window.__wplaceBot) {
      window.__wplaceBot = {};
    }
    runLauncher().catch((e) => {
      console.error("[BOT] Error en Auto-Launcher:", e);
      if (window.__wplaceBot) {
        window.__wplaceBot.launcherRunning = false;
      }
      alert("Auto-Launcher: error inesperado. Revisa consola.");
    });
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvbG9nZ2VyLmpzIiwgInNyYy9jb3JlL3VpLXV0aWxzLmpzIiwgInNyYy9sb2NhbGVzL2VzLmpzIiwgInNyYy9sb2NhbGVzL2VuLmpzIiwgInNyYy9sb2NhbGVzL2ZyLmpzIiwgInNyYy9sb2NhbGVzL3J1LmpzIiwgInNyYy9sb2NhbGVzL3poLUhhbnMuanMiLCAic3JjL2xvY2FsZXMvemgtSGFudC5qcyIsICJzcmMvbG9jYWxlcy9pbmRleC5qcyIsICJzcmMvbGF1bmNoZXIvY29uZmlnLmpzIiwgInNyYy9sYXVuY2hlci91aS5qcyIsICJzcmMvbGF1bmNoZXIvYXBpLmpzIiwgInNyYy9jb3JlL2xhbmd1YWdlLXNlbGVjdG9yLmpzIiwgInNyYy9sYXVuY2hlci9pbmRleC5qcyIsICJzcmMvZW50cmllcy9sYXVuY2hlci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHtcbiAgZGVidWdFbmFibGVkOiBmYWxzZSxcbiAgc2V0RGVidWcodikgeyB0aGlzLmRlYnVnRW5hYmxlZCA9ICEhdjsgfSxcbiAgZGVidWcoLi4uYSkgeyBpZiAodGhpcy5kZWJ1Z0VuYWJsZWQpIGNvbnNvbGUuZGVidWcoXCJbQk9UXVwiLCAuLi5hKTsgfSxcbiAgaW5mbyguLi5hKSAgeyBjb25zb2xlLmluZm8oXCJbQk9UXVwiLCAuLi5hKTsgfSxcbiAgd2FybiguLi5hKSAgeyBjb25zb2xlLndhcm4oXCJbQk9UXVwiLCAuLi5hKTsgfSxcbiAgZXJyb3IoLi4uYSkgeyBjb25zb2xlLmVycm9yKFwiW0JPVF1cIiwgLi4uYSk7IH1cbn07XG5cbi8vIEZhcm0tc3BlY2lmaWMgbG9nZ2VyXG5leHBvcnQgY29uc3QgbG9nID0gKC4uLmEpID0+IGNvbnNvbGUubG9nKCdbV1BBLVVJXScsIC4uLmEpO1xuXG4vLyBVdGlsaXR5IGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcbmV4cG9ydCBjb25zdCBjbGFtcCA9IChuLCBhLCBiKSA9PiBNYXRoLm1heChhLCBNYXRoLm1pbihiLCBuKSk7XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoYWRvd1Jvb3QoaG9zdElkID0gbnVsbCkge1xuICBjb25zdCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGlmIChob3N0SWQpIHtcbiAgICBob3N0LmlkID0gaG9zdElkO1xuICB9XG4gIGhvc3Quc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAxMHB4O1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIHotaW5kZXg6IDIxNDc0ODM2NDc7XG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gIGA7XG4gIFxuICBjb25zdCByb290ID0gaG9zdC5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaG9zdCk7XG4gIFxuICByZXR1cm4geyBob3N0LCByb290IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRHJhZ2dhYmxlKGRyYWdIYW5kbGUsIGVsZW1lbnQpIHtcbiAgbGV0IHBvczEgPSAwLCBwb3MyID0gMCwgcG9zMyA9IDAsIHBvczQgPSAwO1xuICBcbiAgZHJhZ0hhbmRsZS5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gIGRyYWdIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZHJhZ01vdXNlRG93bik7XG4gIFxuICBmdW5jdGlvbiBkcmFnTW91c2VEb3duKGUpIHtcbiAgICAvLyBFdml0YXIgYXJyYXN0cmEgc2kgZXMgdW4gYm90XHUwMEYzbiBkZSBsYSBjYWJlY2VyYVxuICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KCcuaGVhZGVyLWJ0biwgLndwbGFjZS1oZWFkZXItYnRuJykpIHJldHVybjtcbiAgICBcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBjbG9zZURyYWdFbGVtZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlbGVtZW50RHJhZyk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMSA9IHBvczMgLSBlLmNsaWVudFg7XG4gICAgcG9zMiA9IHBvczQgLSBlLmNsaWVudFk7XG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gcG9zMikgKyBcInB4XCI7XG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gKGVsZW1lbnQub2Zmc2V0TGVmdCAtIHBvczEpICsgXCJweFwiO1xuICB9XG4gIFxuICBmdW5jdGlvbiBjbG9zZURyYWdFbGVtZW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBjbG9zZURyYWdFbGVtZW50KTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlbGVtZW50RHJhZyk7XG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgZXMgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NlbGVjY2lcdTAwRjNuJyxcbiAgICB1c2VyOiAnVXN1YXJpbycsXG4gICAgY2hhcmdlczogJ0NhcmdhcycsXG4gICAgYmFja2VuZDogJ0JhY2tlbmQnLFxuICAgIGRhdGFiYXNlOiAnRGF0YWJhc2UnLFxuICAgIHVwdGltZTogJ1VwdGltZScsXG4gICAgY2xvc2U6ICdDZXJyYXInLFxuICAgIGxhdW5jaDogJ0xhbnphcicsXG4gICAgbG9hZGluZzogJ0NhcmdhbmRvXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFamVjdXRhbmRvXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ0Rlc2NhcmdhbmRvIHNjcmlwdFx1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnRWxpZ2UgdW4gYm90IHkgcHJlc2lvbmEgTGFuemFyJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnTGlzdG8gcGFyYSBsYW56YXInLFxuICAgIGxvYWRFcnJvcjogJ0Vycm9yIGFsIGNhcmdhcicsXG4gICAgbG9hZEVycm9yTXNnOiAnTm8gc2UgcHVkbyBjYXJnYXIgZWwgYm90IHNlbGVjY2lvbmFkby4gUmV2aXNhIHR1IGNvbmV4aVx1MDBGM24gbyBpbnRcdTAwRTludGFsbyBkZSBudWV2by4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFZlcmlmaWNhbmRvLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgT25saW5lJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IE9mZmxpbmUnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIE9LJyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBFcnJvcicsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaWNpYXIgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJTdWJpciBJbWFnZW5cIixcbiAgICByZXNpemVJbWFnZTogXCJSZWRpbWVuc2lvbmFyIEltYWdlblwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjY2lvbmFyIFBvc2ljaVx1MDBGM25cIixcbiAgICBzdGFydFBhaW50aW5nOiBcIkluaWNpYXIgUGludHVyYVwiLFxuICAgIHN0b3BQYWludGluZzogXCJEZXRlbmVyIFBpbnR1cmFcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiR3VhcmRhciBQcm9ncmVzb1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJDYXJnYXIgUHJvZ3Jlc29cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgVmVyaWZpY2FuZG8gY29sb3JlcyBkaXNwb25pYmxlcy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1MDBBMUFicmUgbGEgcGFsZXRhIGRlIGNvbG9yZXMgZW4gZWwgc2l0aW8gZSBpbnRcdTAwRTludGFsbyBkZSBudWV2byFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb2xvcmVzIGRpc3BvbmlibGVzIGVuY29udHJhZG9zXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBDYXJnYW5kbyBpbWFnZW4uLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgSW1hZ2VuIGNhcmdhZGEgY29uIHtjb3VudH0gcFx1MDBFRHhlbGVzIHZcdTAwRTFsaWRvc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGNhcmdhciBsYSBpbWFnZW5cIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1MDBBMVBpbnRhIGVsIHByaW1lciBwXHUwMEVEeGVsIGVuIGxhIHViaWNhY2lcdTAwRjNuIGRvbmRlIHF1aWVyZXMgcXVlIGNvbWllbmNlIGVsIGFydGUhXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBFc3BlcmFuZG8gcXVlIHBpbnRlcyBlbCBwXHUwMEVEeGVsIGRlIHJlZmVyZW5jaWEuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHUwMEExUG9zaWNpXHUwMEYzbiBlc3RhYmxlY2lkYSBjb24gXHUwMEU5eGl0byFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaW9uYXIgcG9zaWNpXHUwMEYzblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2ljaVx1MDBGM24gZGV0ZWN0YWRhLCBwcm9jZXNhbmRvLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZGV0ZWN0YW5kbyBwb3NpY2lcdTAwRjNuLCBpbnRcdTAwRTludGFsbyBkZSBudWV2b1wiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IEluaWNpYW5kbyBwaW50dXJhLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgUHJvZ3Jlc286IHtwYWludGVkfS97dG90YWx9IHBcdTAwRUR4ZWxlcy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgU2luIGNhcmdhcy4gRXNwZXJhbmRvIHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUGludHVyYSBkZXRlbmlkYSBwb3IgZWwgdXN1YXJpb1wiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1MDBBMVBpbnR1cmEgY29tcGxldGFkYSEge2NvdW50fSBwXHUwMEVEeGVsZXMgcGludGFkb3MuXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgRXJyb3IgZHVyYW50ZSBsYSBwaW50dXJhXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgQ2FyZ2EgdW5hIGltYWdlbiB5IHNlbGVjY2lvbmEgdW5hIHBvc2ljaVx1MDBGM24gcHJpbWVyb1wiLFxuICAgIHByb2dyZXNzOiBcIlByb2dyZXNvXCIsXG4gICAgdXNlck5hbWU6IFwiVXN1YXJpb1wiLFxuICAgIHBpeGVsczogXCJQXHUwMEVEeGVsZXNcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiVGllbXBvIGVzdGltYWRvXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiSGF6IGNsaWMgZW4gJ0luaWNpYXIgQXV0by1CT1QnIHBhcmEgY29tZW56YXJcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFc3BlcmFuZG8gaW5pY2lhbGl6YWNpXHUwMEYzbi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IEltYWdlbiByZWRpbWVuc2lvbmFkYSBhIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgUGludHVyYSBwYXVzYWRhIGVuIGxhIHBvc2ljaVx1MDBGM24gWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQXHUwMEVEeGVsZXMgcG9yIGxvdGVcIixcbiAgICBiYXRjaFNpemU6IFwiVGFtYVx1MDBGMW8gZGVsIGxvdGVcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlNpZ3VpZW50ZSBsb3RlIGVuXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVc2FyIHRvZGFzIGxhcyBjYXJnYXMgZGlzcG9uaWJsZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJNb3N0cmFyIG92ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIkNhcmdhcyBtXHUwMEUxeGltYXMgcG9yIGxvdGVcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgRXNwZXJhbmRvIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJUaWVtcG8gcmVzdGFudGVcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIEVzcGVyYW5kbyB7dGltZX0gcGFyYSBjb250aW51YXIuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBQcm9ncmVzbyBndWFyZGFkbyBjb21vIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3Jlc28gY2FyZ2Fkbzoge3BhaW50ZWR9L3t0b3RhbH0gcFx1MDBFRHhlbGVzIHBpbnRhZG9zXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGNhcmdhciBwcm9ncmVzbzoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBhbCBndWFyZGFyIHByb2dyZXNvOiB7ZXJyb3J9XCIsXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTAwQkZEZXNlYXMgZ3VhcmRhciBlbCBwcm9ncmVzbyBhY3R1YWwgYW50ZXMgZGUgZGV0ZW5lcj9cIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJHdWFyZGFyIFByb2dyZXNvXCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIkRlc2NhcnRhclwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxhclwiLFxuICAgIG1pbmltaXplOiBcIk1pbmltaXphclwiLFxuICAgIHdpZHRoOiBcIkFuY2hvXCIsXG4gICAgaGVpZ2h0OiBcIkFsdG9cIiwgXG4gICAga2VlcEFzcGVjdDogXCJNYW50ZW5lciBwcm9wb3JjaVx1MDBGM25cIixcbiAgICBhcHBseTogXCJBcGxpY2FyXCIsXG4gIG92ZXJsYXlPbjogXCJPdmVybGF5OiBPTlwiLFxuICBvdmVybGF5T2ZmOiBcIk92ZXJsYXk6IE9GRlwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFBhc2FkYSBjb21wbGV0YWRhOiB7cGFpbnRlZH0gcFx1MDBFRHhlbGVzIHBpbnRhZG9zIHwgUHJvZ3Jlc286IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIEVzcGVyYW5kbyByZWdlbmVyYWNpXHUwMEYzbiBkZSBjYXJnYXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFRpZW1wbzoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIEVzcGVyYW5kbyBjYXJnYXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFF1ZWRhbjoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pY2lhbGl6YW5kbyBhdXRvbVx1MDBFMXRpY2FtZW50ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGluaWNpYWRvIGF1dG9tXHUwMEUxdGljYW1lbnRlXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gaW5pY2lhciBhdXRvbVx1MDBFMXRpY2FtZW50ZS4gVXNhIGVsIGJvdFx1MDBGM24gbWFudWFsLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXRhIGRlIGNvbG9yZXMgZGV0ZWN0YWRhXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBCdXNjYW5kbyBwYWxldGEgZGUgY29sb3Jlcy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IEhhY2llbmRvIGNsaWMgZW4gZWwgYm90XHUwMEYzbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkb1wiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pY2lvIG1hbnVhbCByZXF1ZXJpZG9cIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFJlaW50ZW50byB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBlbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycm9yIGVuIGludGVudG8ge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIHJlaW50ZW50YW5kbyBlbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBGYWxsXHUwMEYzIGRlc3B1XHUwMEU5cyBkZSB7bWF4QXR0ZW1wdHN9IGludGVudG9zLiBDb250aW51YW5kbyBjb24gc2lndWllbnRlIGxvdGUuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIEVycm9yIGRlIHJlZC4gUmVpbnRlbnRhbmRvLi4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IEVycm9yIGRlbCBzZXJ2aWRvci4gUmVpbnRlbnRhbmRvLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBUaW1lb3V0IGRlbCBzZXJ2aWRvci4gUmVpbnRlbnRhbmRvLi4uXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAocG9yIGltcGxlbWVudGFyKVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEZhcm0gQm90XCIsXG4gICAgc3RhcnQ6IFwiSW5pY2lhclwiLFxuICAgIHN0b3A6IFwiRGV0ZW5lclwiLCBcbiAgICBzdG9wcGVkOiBcIkJvdCBkZXRlbmlkb1wiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJhclwiLFxuICAgIHBhaW50T25jZTogXCJVbmEgdmV6XCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiVmVyaWZpY2FuZG8gZXN0YWRvLi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJDb25maWd1cmFjaVx1MDBGM25cIixcbiAgICBkZWxheTogXCJEZWxheSAobXMpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUFx1MDBFRHhlbGVzL2xvdGVcIixcbiAgICBtaW5DaGFyZ2VzOiBcIkNhcmdhcyBtXHUwMEVEblwiLFxuICAgIGNvbG9yTW9kZTogXCJNb2RvIGNvbG9yXCIsXG4gICAgcmFuZG9tOiBcIkFsZWF0b3Jpb1wiLFxuICAgIGZpeGVkOiBcIkZpam9cIixcbiAgICByYW5nZTogXCJSYW5nb1wiLFxuICAgIGZpeGVkQ29sb3I6IFwiQ29sb3IgZmlqb1wiLFxuICAgIGFkdmFuY2VkOiBcIkF2YW56YWRvXCIsXG4gICAgdGlsZVg6IFwiVGlsZSBYXCIsXG4gICAgdGlsZVk6IFwiVGlsZSBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJQYWxldGEgcGVyc29uYWxpemFkYVwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcImVqOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiQ2FwdHVyYXJcIixcbiAgICBwYWludGVkOiBcIlBpbnRhZG9zXCIsXG4gICAgY2hhcmdlczogXCJDYXJnYXNcIixcbiAgICByZXRyaWVzOiBcIkZhbGxvc1wiLFxuICAgIHRpbGU6IFwiVGlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiBndWFyZGFkYVwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmFjaVx1MDBGM24gY2FyZ2FkYVwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiByZWluaWNpYWRhXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQaW50YSB1biBwXHUwMEVEeGVsIG1hbnVhbG1lbnRlIHBhcmEgY2FwdHVyYXIgY29vcmRlbmFkYXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgT25saW5lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBPZmZsaW5lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiSW5pY2lhbmRvIGJvdC4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIkRldGVuaWVuZG8gYm90Li4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiQ2FsaWJyYW5kby4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSB5YSBlc3RcdTAwRTEgY29ycmllbmRvLlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiQXV0by1JbWFnZSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UuIENpXHUwMEU5cnJhbG8gYW50ZXMgZGUgaW5pY2lhciBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWNjaW9uYXIgWm9uYVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gdW5hIHpvbmEgREVTUE9CTEFEQSBkZWwgbWFwYSBwYXJhIGVzdGFibGVjZXIgZWwgXHUwMEUxcmVhIGRlIGZhcm1pbmdcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBxdWUgcGludGVzIGVsIHBcdTAwRUR4ZWwgZGUgcmVmZXJlbmNpYS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTAwQTFab25hIGVzdGFibGVjaWRhISBSYWRpbzogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaW9uYXIgem9uYVwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgU2VsZWNjaW9uYSB1bmEgem9uYSBwcmltZXJvIHVzYW5kbyAnU2VsZWNjaW9uYXIgWm9uYSdcIixcbiAgICBmYXJtUmFkaXVzOiBcIlJhZGlvIGZhcm1cIixcbiAgICBwb3NpdGlvbkluZm86IFwiWm9uYSBhY3R1YWxcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIEZhcm1pbmcgZW4gcmFkaW8ge3JhZGl1c31weCBkZXNkZSAoe3h9LHt5fSlcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIElNUE9SVEFOVEU6IFNlbGVjY2lvbmEgdW5hIHpvbmEgREVTUE9CTEFEQSBwYXJhIGV2aXRhciBjb25mbGljdG9zXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJTaW4gem9uYVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmE6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU2VsZWNjaW9uYSB1bmEgem9uYSBwcmltZXJvLiBQaW50YSB1biBwXHUwMEVEeGVsIGVuIGVsIG1hcGEgcGFyYSBlc3RhYmxlY2VyIGxhIHpvbmEgZGUgZmFybWluZ1wiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiU1x1MDBFRFwiLFxuICAgIG5vOiBcIk5vXCIsXG4gICAgb2s6IFwiQWNlcHRhclwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxhclwiLFxuICAgIGNsb3NlOiBcIkNlcnJhclwiLFxuICAgIHNhdmU6IFwiR3VhcmRhclwiLFxuICAgIGxvYWQ6IFwiQ2FyZ2FyXCIsXG4gICAgZGVsZXRlOiBcIkVsaW1pbmFyXCIsXG4gICAgZWRpdDogXCJFZGl0YXJcIixcbiAgICBzdGFydDogXCJJbmljaWFyXCIsXG4gICAgc3RvcDogXCJEZXRlbmVyXCIsXG4gICAgcGF1c2U6IFwiUGF1c2FyXCIsXG4gICAgcmVzdW1lOiBcIlJlYW51ZGFyXCIsXG4gICAgcmVzZXQ6IFwiUmVpbmljaWFyXCIsXG4gICAgc2V0dGluZ3M6IFwiQ29uZmlndXJhY2lcdTAwRjNuXCIsXG4gICAgaGVscDogXCJBeXVkYVwiLFxuICAgIGFib3V0OiBcIkFjZXJjYSBkZVwiLFxuICAgIGxhbmd1YWdlOiBcIklkaW9tYVwiLFxuICAgIGxvYWRpbmc6IFwiQ2FyZ2FuZG8uLi5cIixcbiAgICBlcnJvcjogXCJFcnJvclwiLFxuICAgIHN1Y2Nlc3M6IFwiXHUwMEM5eGl0b1wiLFxuICAgIHdhcm5pbmc6IFwiQWR2ZXJ0ZW5jaWFcIixcbiAgICBpbmZvOiBcIkluZm9ybWFjaVx1MDBGM25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiSWRpb21hIGNhbWJpYWRvIGEge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gR3VhcmQgTW9kdWxlXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tR3VhcmRcIixcbiAgICBpbml0Qm90OiBcIkluaWNpYWxpemFyIEd1YXJkLUJPVFwiLFxuICAgIHNlbGVjdEFyZWE6IFwiU2VsZWNjaW9uYXIgXHUwMEMxcmVhXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyYXIgXHUwMEMxcmVhXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIkluaWNpYXIgUHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiRGV0ZW5lciBQcm90ZWNjaVx1MDBGM25cIixcbiAgICB1cHBlckxlZnQ6IFwiRXNxdWluYSBTdXBlcmlvciBJenF1aWVyZGFcIixcbiAgICBsb3dlclJpZ2h0OiBcIkVzcXVpbmEgSW5mZXJpb3IgRGVyZWNoYVwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQXHUwMEVEeGVsZXMgUHJvdGVnaWRvc1wiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJDYW1iaW9zIERldGVjdGFkb3NcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJQXHUwMEVEeGVsZXMgUmVwYXJhZG9zXCIsXG4gICAgY2hhcmdlczogXCJDYXJnYXNcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFc3BlcmFuZG8gaW5pY2lhbGl6YWNpXHUwMEYzbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBWZXJpZmljYW5kbyBjb2xvcmVzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgTm8gc2UgZW5jb250cmFyb24gY29sb3Jlcy4gQWJyZSBsYSBwYWxldGEgZGUgY29sb3JlcyBlbiBlbCBzaXRpby5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb2xvcmVzIGRpc3BvbmlibGVzIGVuY29udHJhZG9zXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBpbmljaWFsaXphZG8gY29ycmVjdGFtZW50ZVwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgRXJyb3IgaW5pY2lhbGl6YW5kbyBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBDb29yZGVuYWRhcyBpbnZcdTAwRTFsaWRhc1wiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBFbCBcdTAwRTFyZWEgZGViZSB0ZW5lciBlc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYSBtZW5vciBxdWUgaW5mZXJpb3IgZGVyZWNoYVwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHUwMEMxcmVhIGRlbWFzaWFkbyBncmFuZGU6IHtzaXplfSBwXHUwMEVEeGVsZXMgKG1cdTAwRTF4aW1vOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJhbmRvIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM24uLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDBDMXJlYSBjYXB0dXJhZGE6IHtjb3VudH0gcFx1MDBFRHhlbGVzIGJham8gcHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBjYXB0dXJhbmRvIFx1MDBFMXJlYToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgUHJpbWVybyBjYXB0dXJhIHVuIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjY2lcdTAwRjNuIGluaWNpYWRhIC0gbW9uaXRvcmVhbmRvIFx1MDBFMXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gZGV0ZW5pZGFcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFx1MDBDMXJlYSBwcm90ZWdpZGEgLSBzaW4gY2FtYmlvcyBkZXRlY3RhZG9zXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNhbWJpb3MgZGV0ZWN0YWRvcyBlbiBlbCBcdTAwRTFyZWEgcHJvdGVnaWRhXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSZXBhcmFuZG8ge2NvdW50fSBwXHUwMEVEeGVsZXMgYWx0ZXJhZG9zLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBSZXBhcmFkb3Mge2NvdW50fSBwXHUwMEVEeGVsZXMgY29ycmVjdGFtZW50ZVwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJvciByZXBhcmFuZG8gcFx1MDBFRHhlbGVzOiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBTaW4gY2FyZ2FzIHN1ZmljaWVudGVzIHBhcmEgcmVwYXJhciBjYW1iaW9zXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBWZXJpZmljYW5kbyBjYW1iaW9zIGVuIFx1MDBFMXJlYSBwcm90ZWdpZGEuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBFcnJvciB2ZXJpZmljYW5kbyBjYW1iaW9zOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIEd1YXJkaVx1MDBFMW4gYWN0aXZvIC0gXHUwMEUxcmVhIGJham8gcHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgbGFzdENoZWNrOiBcIlx1MDBEQWx0aW1hIHZlcmlmaWNhY2lcdTAwRjNuOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiUHJcdTAwRjN4aW1hIHZlcmlmaWNhY2lcdTAwRjNuIGVuOiB7dGltZX1zXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pY2lhbGl6YW5kbyBhdXRvbVx1MDBFMXRpY2FtZW50ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaWNpYWRvIGF1dG9tXHUwMEUxdGljYW1lbnRlXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gaW5pY2lhciBhdXRvbVx1MDBFMXRpY2FtZW50ZS4gVXNhIGVsIGJvdFx1MDBGM24gbWFudWFsLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pY2lvIG1hbnVhbCByZXF1ZXJpZG9cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFBhbGV0YSBkZSBjb2xvcmVzIGRldGVjdGFkYVwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgQnVzY2FuZG8gcGFsZXRhIGRlIGNvbG9yZXMuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBIYWNpZW5kbyBjbGljIGVuIGVsIGJvdFx1MDBGM24gUGFpbnQuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG9cIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gbGEgZXNxdWluYSBTVVBFUklPUiBJWlFVSUVSREEgZGVsIFx1MDBFMXJlYSBhIHByb3RlZ2VyXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgQWhvcmEgcGludGEgdW4gcFx1MDBFRHhlbCBlbiBsYSBlc3F1aW5hIElORkVSSU9SIERFUkVDSEEgZGVsIFx1MDBFMXJlYVwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBzZWxlY2NpXHUwMEYzbiBkZSBlc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYS4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBFc3BlcmFuZG8gc2VsZWNjaVx1MDBGM24gZGUgZXNxdWluYSBpbmZlcmlvciBkZXJlY2hhLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IEVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhIGNhcHR1cmFkYTogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgRXNxdWluYSBpbmZlcmlvciBkZXJlY2hhIGNhcHR1cmFkYTogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaVx1MDBGM25cIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZW4gc2VsZWNjaVx1MDBGM24sIGludFx1MDBFOW50YWxvIGRlIG51ZXZvXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgZW4gPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NlbGVjdGlvbicsXG4gICAgdXNlcjogJ1VzZXInLFxuICAgIGNoYXJnZXM6ICdDaGFyZ2VzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdEYXRhYmFzZScsXG4gICAgdXB0aW1lOiAnVXB0aW1lJyxcbiAgICBjbG9zZTogJ0Nsb3NlJyxcbiAgICBsYXVuY2g6ICdMYXVuY2gnLFxuICAgIGxvYWRpbmc6ICdMb2FkaW5nXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFeGVjdXRpbmdcdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnRG93bmxvYWRpbmcgc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdDaG9vc2UgYSBib3QgYW5kIHByZXNzIExhdW5jaCcsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1JlYWR5IHRvIGxhdW5jaCcsXG4gICAgbG9hZEVycm9yOiAnTG9hZCBlcnJvcicsXG4gICAgbG9hZEVycm9yTXNnOiAnQ291bGQgbm90IGxvYWQgdGhlIHNlbGVjdGVkIGJvdC4gQ2hlY2sgeW91ciBjb25uZWN0aW9uIG9yIHRyeSBhZ2Fpbi4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IENoZWNraW5nLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgT25saW5lJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IE9mZmxpbmUnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIE9LJyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBFcnJvcicsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpemUgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJVcGxvYWQgSW1hZ2VcIixcbiAgICByZXNpemVJbWFnZTogXCJSZXNpemUgSW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTZWxlY3QgUG9zaXRpb25cIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlN0YXJ0IFBhaW50aW5nXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlN0b3AgUGFpbnRpbmdcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiU2F2ZSBQcm9ncmVzc1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJMb2FkIFByb2dyZXNzXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIENoZWNraW5nIGF2YWlsYWJsZSBjb2xvcnMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBPcGVuIHRoZSBjb2xvciBwYWxldHRlIG9uIHRoZSBzaXRlIGFuZCB0cnkgYWdhaW4hXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IEZvdW5kIHtjb3VudH0gYXZhaWxhYmxlIGNvbG9yc1wiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgTG9hZGluZyBpbWFnZS4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBJbWFnZSBsb2FkZWQgd2l0aCB7Y291bnR9IHZhbGlkIHBpeGVsc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGxvYWRpbmcgaW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlBhaW50IHRoZSBmaXJzdCBwaXhlbCBhdCB0aGUgbG9jYXRpb24gd2hlcmUgeW91IHdhbnQgdGhlIGFydCB0byBzdGFydCFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHlvdSB0byBwYWludCB0aGUgcmVmZXJlbmNlIHBpeGVsLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFBvc2l0aW9uIHNldCBzdWNjZXNzZnVsbHkhXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaW1lb3V0IGZvciBwb3NpdGlvbiBzZWxlY3Rpb25cIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBQb3NpdGlvbiBkZXRlY3RlZCwgcHJvY2Vzc2luZy4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIEVycm9yIGRldGVjdGluZyBwb3NpdGlvbiwgcGxlYXNlIHRyeSBhZ2FpblwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IFN0YXJ0aW5nIHBhaW50aW5nLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgUHJvZ3Jlc3M6IHtwYWludGVkfS97dG90YWx9IHBpeGVscy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgTm8gY2hhcmdlcy4gV2FpdGluZyB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFBhaW50aW5nIHN0b3BwZWQgYnkgdXNlclwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFBhaW50aW5nIGNvbXBsZXRlZCEge2NvdW50fSBwaXhlbHMgcGFpbnRlZC5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJvciBkdXJpbmcgcGFpbnRpbmdcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBMb2FkIGFuIGltYWdlIGFuZCBzZWxlY3QgYSBwb3NpdGlvbiBmaXJzdFwiLFxuICAgIHByb2dyZXNzOiBcIlByb2dyZXNzXCIsXG4gICAgdXNlck5hbWU6IFwiVXNlclwiLFxuICAgIHBpeGVsczogXCJQaXhlbHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIkVzdGltYXRlZCB0aW1lXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiQ2xpY2sgJ0luaXRpYWxpemUgQXV0by1CT1QnIHRvIGJlZ2luXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiV2FpdGluZyBmb3IgaW5pdGlhbGl6YXRpb24uLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBJbWFnZSByZXNpemVkIHRvIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgUGFpbnRpbmcgcGF1c2VkIGF0IHBvc2l0aW9uIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzIHBlciBiYXRjaFwiLFxuICAgIGJhdGNoU2l6ZTogXCJCYXRjaCBzaXplXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJOZXh0IGJhdGNoIGluXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVc2UgYWxsIGF2YWlsYWJsZSBjaGFyZ2VzXCIsXG4gICAgc2hvd092ZXJsYXk6IFwiU2hvdyBvdmVybGF5XCIsXG4gICAgbWF4Q2hhcmdlczogXCJNYXggY2hhcmdlcyBwZXIgYmF0Y2hcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgV2FpdGluZyBmb3IgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJUaW1lIHJlbWFpbmluZ1wiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgV2FpdGluZyB7dGltZX0gdG8gY29udGludWUuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBQcm9ncmVzcyBzYXZlZCBhcyB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFByb2dyZXNzIGxvYWRlZDoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzIHBhaW50ZWRcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgRXJyb3IgbG9hZGluZyBwcm9ncmVzczoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBzYXZpbmcgcHJvZ3Jlc3M6IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIkRvIHlvdSB3YW50IHRvIHNhdmUgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgYmVmb3JlIHN0b3BwaW5nP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlNhdmUgUHJvZ3Jlc3NcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiRGlzY2FyZFwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxcIixcbiAgICBtaW5pbWl6ZTogXCJNaW5pbWl6ZVwiLFxuICAgIHdpZHRoOiBcIldpZHRoXCIsXG4gICAgaGVpZ2h0OiBcIkhlaWdodFwiLCBcbiAgICBrZWVwQXNwZWN0OiBcIktlZXAgYXNwZWN0IHJhdGlvXCIsXG4gICAgYXBwbHk6IFwiQXBwbHlcIixcbiAgb3ZlcmxheU9uOiBcIk92ZXJsYXk6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheTogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzcyBjb21wbGV0ZWQ6IHtwYWludGVkfSBwaXhlbHMgcGFpbnRlZCB8IFByb2dyZXNzOiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2UgcmVnZW5lcmF0aW9uOiB7Y3VycmVudH0ve25lZWRlZH0gLSBUaW1lOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgV2FpdGluZyBmb3IgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUmVtYWluaW5nOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBBdXRvLWluaXRpYWxpemluZy4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGF1dG8tc3RhcnRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgQ291bGQgbm90IGF1dG8tc3RhcnQuIFVzZSBtYW51YWwgYnV0dG9uLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggQ29sb3IgcGFsZXR0ZSBkZXRlY3RlZFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgU2VhcmNoaW5nIGZvciBjb2xvciBwYWxldHRlLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpY2tpbmcgUGFpbnQgYnV0dG9uLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgUGFpbnQgYnV0dG9uIG5vdCBmb3VuZFwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgTWFudWFsIGluaXRpYWxpemF0aW9uIHJlcXVpcmVkXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBSZXRyeSB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBpbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycm9yIGluIGF0dGVtcHQge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIHJldHJ5aW5nIGluIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIEZhaWxlZCBhZnRlciB7bWF4QXR0ZW1wdHN9IGF0dGVtcHRzLiBDb250aW51aW5nIHdpdGggbmV4dCBiYXRjaC4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgTmV0d29yayBlcnJvci4gUmV0cnlpbmcuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgU2VydmVyIGVycm9yLiBSZXRyeWluZy4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgU2VydmVyIHRpbWVvdXQuIFJldHJ5aW5nLi4uXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAodG8gYmUgaW1wbGVtZW50ZWQpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgRmFybSBCb3RcIixcbiAgICBzdGFydDogXCJTdGFydFwiLFxuICAgIHN0b3A6IFwiU3RvcFwiLFxuICAgIHN0b3BwZWQ6IFwiQm90IHN0b3BwZWRcIixcbiAgICBjYWxpYnJhdGU6IFwiQ2FsaWJyYXRlXCIsXG4gICAgcGFpbnRPbmNlOiBcIk9uY2VcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJDaGVja2luZyBzdGF0dXMuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYXRpb25cIixcbiAgICBkZWxheTogXCJEZWxheSAobXMpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzL2JhdGNoXCIsXG4gICAgbWluQ2hhcmdlczogXCJNaW4gY2hhcmdlc1wiLFxuICAgIGNvbG9yTW9kZTogXCJDb2xvciBtb2RlXCIsXG4gICAgcmFuZG9tOiBcIlJhbmRvbVwiLFxuICAgIGZpeGVkOiBcIkZpeGVkXCIsXG4gICAgcmFuZ2U6IFwiUmFuZ2VcIixcbiAgICBmaXhlZENvbG9yOiBcIkZpeGVkIGNvbG9yXCIsXG4gICAgYWR2YW5jZWQ6IFwiQWR2YW5jZWRcIixcbiAgICB0aWxlWDogXCJUaWxlIFhcIixcbiAgICB0aWxlWTogXCJUaWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIkN1c3RvbSBwYWxldHRlXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZS5nOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiQ2FwdHVyZVwiLFxuICAgIHBhaW50ZWQ6IFwiUGFpbnRlZFwiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIHJldHJpZXM6IFwiUmV0cmllc1wiLFxuICAgIHRpbGU6IFwiVGlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYXRpb24gc2F2ZWRcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiQ29uZmlndXJhdGlvbiBsb2FkZWRcIixcbiAgICBjb25maWdSZXNldDogXCJDb25maWd1cmF0aW9uIHJlc2V0XCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQYWludCBhIHBpeGVsIG1hbnVhbGx5IHRvIGNhcHR1cmUgY29vcmRpbmF0ZXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgT25saW5lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBPZmZsaW5lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiU3RhcnRpbmcgYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiU3RvcHBpbmcgYm90Li4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiQ2FsaWJyYXRpbmcuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJBdXRvLUZhcm0gaXMgYWxyZWFkeSBydW5uaW5nLlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiQXV0by1JbWFnZSBpcyBydW5uaW5nLiBDbG9zZSBpdCBiZWZvcmUgc3RhcnRpbmcgQXV0by1GYXJtLlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjdCBBcmVhXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGFpbnQgYSBwaXhlbCBpbiBhbiBFTVBUWSBhcmVhIG9mIHRoZSBtYXAgdG8gc2V0IHRoZSBmYXJtaW5nIHpvbmVcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHlvdSB0byBwYWludCB0aGUgcmVmZXJlbmNlIHBpeGVsLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IEFyZWEgc2V0ISBSYWRpdXM6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaW1lb3V0IGZvciBhcmVhIHNlbGVjdGlvblwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgU2VsZWN0IGFuIGFyZWEgZmlyc3QgdXNpbmcgJ1NlbGVjdCBBcmVhJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiRmFybSByYWRpdXNcIixcbiAgICBwb3NpdGlvbkluZm86IFwiQ3VycmVudCBhcmVhXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBGYXJtaW5nIGluIHtyYWRpdXN9cHggcmFkaXVzIGZyb20gKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBJTVBPUlRBTlQ6IFNlbGVjdCBhbiBFTVBUWSBhcmVhIHRvIGF2b2lkIGNvbmZsaWN0c1wiLFxuICAgIG5vUG9zaXRpb246IFwiTm8gYXJlYVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmU6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU2VsZWN0IGFuIGFyZWEgZmlyc3QuIFBhaW50IGEgcGl4ZWwgb24gdGhlIG1hcCB0byBzZXQgdGhlIGZhcm1pbmcgem9uZVwiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiWWVzXCIsXG4gICAgbm86IFwiTm9cIixcbiAgICBvazogXCJPS1wiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxcIixcbiAgICBjbG9zZTogXCJDbG9zZVwiLFxuICAgIHNhdmU6IFwiU2F2ZVwiLFxuICAgIGxvYWQ6IFwiTG9hZFwiLFxuICAgIGRlbGV0ZTogXCJEZWxldGVcIixcbiAgICBlZGl0OiBcIkVkaXRcIixcbiAgICBzdGFydDogXCJTdGFydFwiLFxuICAgIHN0b3A6IFwiU3RvcFwiLFxuICAgIHBhdXNlOiBcIlBhdXNlXCIsXG4gICAgcmVzdW1lOiBcIlJlc3VtZVwiLFxuICAgIHJlc2V0OiBcIlJlc2V0XCIsXG4gICAgc2V0dGluZ3M6IFwiU2V0dGluZ3NcIixcbiAgICBoZWxwOiBcIkhlbHBcIixcbiAgICBhYm91dDogXCJBYm91dFwiLFxuICAgIGxhbmd1YWdlOiBcIkxhbmd1YWdlXCIsXG4gICAgbG9hZGluZzogXCJMb2FkaW5nLi4uXCIsXG4gICAgZXJyb3I6IFwiRXJyb3JcIixcbiAgICBzdWNjZXNzOiBcIlN1Y2Nlc3NcIixcbiAgICB3YXJuaW5nOiBcIldhcm5pbmdcIixcbiAgICBpbmZvOiBcIkluZm9ybWF0aW9uXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIkxhbmd1YWdlIGNoYW5nZWQgdG8ge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gR3VhcmQgTW9kdWxlXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tR3VhcmRcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpemUgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTZWxlY3QgQXJlYVwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIkNhcHR1cmUgQXJlYVwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJTdGFydCBQcm90ZWN0aW9uXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiU3RvcCBQcm90ZWN0aW9uXCIsXG4gICAgdXBwZXJMZWZ0OiBcIlVwcGVyIExlZnQgQ29ybmVyXCIsXG4gICAgbG93ZXJSaWdodDogXCJMb3dlciBSaWdodCBDb3JuZXJcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiUHJvdGVjdGVkIFBpeGVsc1wiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJEZXRlY3RlZCBDaGFuZ2VzXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiUmVwYWlyZWQgUGl4ZWxzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiV2FpdGluZyBmb3IgaW5pdGlhbGl6YXRpb24uLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggQ2hlY2tpbmcgYXZhaWxhYmxlIGNvbG9ycy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIE5vIGNvbG9ycyBmb3VuZC4gT3BlbiB0aGUgY29sb3IgcGFsZXR0ZSBvbiB0aGUgc2l0ZS5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgRm91bmQge2NvdW50fSBhdmFpbGFibGUgY29sb3JzXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIEVycm9yIGluaXRpYWxpemluZyBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBJbnZhbGlkIGNvb3JkaW5hdGVzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIEFyZWEgbXVzdCBoYXZlIHVwcGVyIGxlZnQgY29ybmVyIGxlc3MgdGhhbiBsb3dlciByaWdodCBjb3JuZXJcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIEFyZWEgdG9vIGxhcmdlOiB7c2l6ZX0gcGl4ZWxzIChtYXhpbXVtOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJpbmcgcHJvdGVjdGlvbiBhcmVhLi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBBcmVhIGNhcHR1cmVkOiB7Y291bnR9IHBpeGVscyB1bmRlciBwcm90ZWN0aW9uXCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBjYXB0dXJpbmcgYXJlYToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgRmlyc3QgY2FwdHVyZSBhIHByb3RlY3Rpb24gYXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWN0aW9uIHN0YXJ0ZWQgLSBtb25pdG9yaW5nIGFyZWFcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUHJvdGVjdGlvbiBzdG9wcGVkXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBQcm90ZWN0ZWQgYXJlYSAtIG5vIGNoYW5nZXMgZGV0ZWN0ZWRcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2hhbmdlcyBkZXRlY3RlZCBpbiBwcm90ZWN0ZWQgYXJlYVwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgUmVwYWlyaW5nIHtjb3VudH0gYWx0ZXJlZCBwaXhlbHMuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFN1Y2Nlc3NmdWxseSByZXBhaXJlZCB7Y291bnR9IHBpeGVsc1wiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJvciByZXBhaXJpbmcgcGl4ZWxzOiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBJbnN1ZmZpY2llbnQgY2hhcmdlcyB0byByZXBhaXIgY2hhbmdlc1wiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgQ2hlY2tpbmcgY2hhbmdlcyBpbiBwcm90ZWN0ZWQgYXJlYS4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIEVycm9yIGNoZWNraW5nIGNoYW5nZXM6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR3VhcmRpYW4gYWN0aXZlIC0gYXJlYSB1bmRlciBwcm90ZWN0aW9uXCIsXG4gICAgbGFzdENoZWNrOiBcIkxhc3QgY2hlY2s6IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJOZXh0IGNoZWNrIGluOiB7dGltZX1zXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgQXV0by1pbml0aWFsaXppbmcuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBhdXRvLXN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIENvdWxkIG5vdCBhdXRvLXN0YXJ0LiBVc2UgbWFudWFsIGJ1dHRvbi5cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IE1hbnVhbCBpbml0aWFsaXphdGlvbiByZXF1aXJlZFwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggQ29sb3IgcGFsZXR0ZSBkZXRlY3RlZFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgU2VhcmNoaW5nIGZvciBjb2xvciBwYWxldHRlLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpY2tpbmcgUGFpbnQgYnV0dG9uLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgUGFpbnQgYnV0dG9uIG5vdCBmb3VuZFwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgUGFpbnQgYSBwaXhlbCBhdCB0aGUgVVBQRVIgTEVGVCBjb3JuZXIgb2YgdGhlIGFyZWEgdG8gcHJvdGVjdFwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIE5vdyBwYWludCBhIHBpeGVsIGF0IHRoZSBMT1dFUiBSSUdIVCBjb3JuZXIgb2YgdGhlIGFyZWFcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBXYWl0aW5nIGZvciB1cHBlciBsZWZ0IGNvcm5lciBzZWxlY3Rpb24uLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgbG93ZXIgcmlnaHQgY29ybmVyIHNlbGVjdGlvbi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBVcHBlciBsZWZ0IGNvcm5lciBjYXB0dXJlZDogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgTG93ZXIgcmlnaHQgY29ybmVyIGNhcHR1cmVkOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgU2VsZWN0aW9uIHRpbWVvdXRcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgU2VsZWN0aW9uIGVycm9yLCBwbGVhc2UgdHJ5IGFnYWluXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgZnIgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NcdTAwRTlsZWN0aW9uJyxcbiAgICB1c2VyOiAnVXRpbGlzYXRldXInLFxuICAgIGNoYXJnZXM6ICdDaGFyZ2VzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdCYXNlIGRlIGRvbm5cdTAwRTllcycsXG4gICAgdXB0aW1lOiAnVGVtcHMgYWN0aWYnLFxuICAgIGNsb3NlOiAnRmVybWVyJyxcbiAgICBsYXVuY2g6ICdMYW5jZXInLFxuICAgIGxvYWRpbmc6ICdDaGFyZ2VtZW50XHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFeFx1MDBFOWN1dGlvblx1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdUXHUwMEU5bFx1MDBFOWNoYXJnZW1lbnQgZHUgc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdDaG9pc2lzc2V6IHVuIGJvdCBldCBhcHB1eWV6IHN1ciBMYW5jZXInLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdQclx1MDBFQXQgXHUwMEUwIGxhbmNlcicsXG4gICAgbG9hZEVycm9yOiAnRXJyZXVyIGRlIGNoYXJnZW1lbnQnLFxuICAgIGxvYWRFcnJvck1zZzogJ0ltcG9zc2libGUgZGUgY2hhcmdlciBsZSBib3Qgc1x1MDBFOWxlY3Rpb25uXHUwMEU5LiBWXHUwMEU5cmlmaWV6IHZvdHJlIGNvbm5leGlvbiBvdSByXHUwMEU5ZXNzYXllei4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFZcdTAwRTlyaWZpY2F0aW9uLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgRW4gbGlnbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgSG9ycyBsaWduZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycmV1cicsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpc2VyIEF1dG8tQk9UXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiVFx1MDBFOWxcdTAwRTljaGFyZ2VyIEltYWdlXCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiUmVkaW1lbnNpb25uZXIgSW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTXHUwMEU5bGVjdGlvbm5lciBQb3NpdGlvblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiQ29tbWVuY2VyIFBlaW50dXJlXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIkFyclx1MDBFQXRlciBQZWludHVyZVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJTYXV2ZWdhcmRlciBQcm9nclx1MDBFOHNcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiQ2hhcmdlciBQcm9nclx1MDBFOHNcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgVlx1MDBFOXJpZmljYXRpb24gZGVzIGNvdWxldXJzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgT3V2cmV6IGxhIHBhbGV0dGUgZGUgY291bGV1cnMgc3VyIGxlIHNpdGUgZXQgclx1MDBFOWVzc2F5ZXohXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IHtjb3VudH0gY291bGV1cnMgZGlzcG9uaWJsZXMgdHJvdXZcdTAwRTllc1wiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgQ2hhcmdlbWVudCBkZSBsJ2ltYWdlLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IEltYWdlIGNoYXJnXHUwMEU5ZSBhdmVjIHtjb3VudH0gcGl4ZWxzIHZhbGlkZXNcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkdSBjaGFyZ2VtZW50IGRlIGwnaW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlBlaWduZXogbGUgcHJlbWllciBwaXhlbCBcdTAwRTAgbCdlbXBsYWNlbWVudCBvXHUwMEY5IHZvdXMgdm91bGV6IHF1ZSBsJ2FydCBjb21tZW5jZSFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVuIGF0dGVudGUgcXVlIHZvdXMgcGVpZ25pZXogbGUgcGl4ZWwgZGUgclx1MDBFOWZcdTAwRTlyZW5jZS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBQb3NpdGlvbiBkXHUwMEU5ZmluaWUgYXZlYyBzdWNjXHUwMEU4cyFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZFx1MDBFOXBhc3NcdTAwRTkgcG91ciBsYSBzXHUwMEU5bGVjdGlvbiBkZSBwb3NpdGlvblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2l0aW9uIGRcdTAwRTl0ZWN0XHUwMEU5ZSwgdHJhaXRlbWVudC4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBkXHUwMEU5dGVjdGFudCBsYSBwb3NpdGlvbiwgZXNzYXlleiBcdTAwRTAgbm91dmVhdVwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IERcdTAwRTlidXQgZGUgbGEgcGVpbnR1cmUuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9nclx1MDBFOHM6IHtwYWludGVkfS97dG90YWx9IHBpeGVscy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgQXVjdW5lIGNoYXJnZS4gQXR0ZW5kcmUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQZWludHVyZSBhcnJcdTAwRUF0XHUwMEU5ZSBwYXIgbCd1dGlsaXNhdGV1clwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFBlaW50dXJlIHRlcm1pblx1MDBFOWUhIHtjb3VudH0gcGl4ZWxzIHBlaW50cy5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJldXIgcGVuZGFudCBsYSBwZWludHVyZVwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIENoYXJnZXogdW5lIGltYWdlIGV0IHNcdTAwRTlsZWN0aW9ubmV6IHVuZSBwb3NpdGlvbiBkJ2Fib3JkXCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3JcdTAwRThzXCIsXG4gICAgdXNlck5hbWU6IFwiVXNhZ2VyXCIsXG4gICAgcGl4ZWxzOiBcIlBpeGVsc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiVGVtcHMgZXN0aW1cdTAwRTlcIixcbiAgICBpbml0TWVzc2FnZTogXCJDbGlxdWV6IHN1ciAnSW5pdGlhbGlzZXIgQXV0by1CT1QnIHBvdXIgY29tbWVuY2VyXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiRW4gYXR0ZW50ZSBkJ2luaXRpYWxpc2F0aW9uLi4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgSW1hZ2UgcmVkaW1lbnNpb25uXHUwMEU5ZSBcdTAwRTAge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQZWludHVyZSBtaXNlIGVuIHBhdXNlIFx1MDBFMCBsYSBwb3NpdGlvbiBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBpeGVscyBwYXIgbG90XCIsXG4gICAgYmF0Y2hTaXplOiBcIlRhaWxsZSBkdSBsb3RcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlByb2NoYWluIGxvdCBkYW5zXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVdGlsaXNlciB0b3V0ZXMgbGVzIGNoYXJnZXMgZGlzcG9uaWJsZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJBZmZpY2hlciBsJ292ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIkNoYXJnZXMgbWF4IHBhciBsb3RcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgRW4gYXR0ZW50ZSBkZSBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRlbXBzIHJlc3RhbnRcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIEF0dGVuZHJlIHt0aW1lfSBwb3VyIGNvbnRpbnVlci4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyXHUwMEU4cyBzYXV2ZWdhcmRcdTAwRTkgc291cyB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFByb2dyXHUwMEU4cyBjaGFyZ1x1MDBFOToge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzIHBlaW50c1wiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkdSBjaGFyZ2VtZW50IGR1IHByb2dyXHUwMEU4czoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlIGR1IHByb2dyXHUwMEU4czoge2Vycm9yfVwiLFxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiVm91bGV6LXZvdXMgc2F1dmVnYXJkZXIgbGUgcHJvZ3JcdTAwRThzIGFjdHVlbCBhdmFudCBkJ2Fyclx1MDBFQXRlcj9cIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJTYXV2ZWdhcmRlciBQcm9nclx1MDBFOHNcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiQWJhbmRvbm5lclwiLFxuICAgIGNhbmNlbDogXCJBbm51bGVyXCIsXG4gICAgbWluaW1pemU6IFwiTWluaW1pc2VyXCIsXG4gICAgd2lkdGg6IFwiTGFyZ2V1clwiLFxuICAgIGhlaWdodDogXCJIYXV0ZXVyXCIsIFxuICAgIGtlZXBBc3BlY3Q6IFwiR2FyZGVyIGxlcyBwcm9wb3J0aW9uc1wiLFxuICAgIGFwcGx5OiBcIkFwcGxpcXVlclwiLFxuICBvdmVybGF5T246IFwiT3ZlcmxheSA6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheSA6IE9GRlwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFBhc3NhZ2UgdGVybWluXHUwMEU5OiB7cGFpbnRlZH0gcGl4ZWxzIHBlaW50cyB8IFByb2dyXHUwMEU4czoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgQXR0ZW50ZSBkZSByXHUwMEU5Z1x1MDBFOW5cdTAwRTlyYXRpb24gZGVzIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFRlbXBzOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgQXR0ZW50ZSBkZXMgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUmVzdGFudDoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pdGlhbGlzYXRpb24gYXV0b21hdGlxdWUuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEJvdCBkXHUwMEU5bWFyclx1MDBFOSBhdXRvbWF0aXF1ZW1lbnRcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgSW1wb3NzaWJsZSBkZSBkXHUwMEU5bWFycmVyIGF1dG9tYXRpcXVlbWVudC4gVXRpbGlzZXogbGUgYm91dG9uIG1hbnVlbC5cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFBhbGV0dGUgZGUgY291bGV1cnMgZFx1MDBFOXRlY3RcdTAwRTllXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBSZWNoZXJjaGUgZGUgbGEgcGFsZXR0ZSBkZSBjb3VsZXVycy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IENsaWMgc3VyIGxlIGJvdXRvbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdXRvbiBQYWludCBpbnRyb3V2YWJsZVwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pdGlhbGlzYXRpb24gbWFudWVsbGUgcmVxdWlzZVwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgVGVudGF0aXZlIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGRhbnMge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBFcnJldXIgZGFucyB0ZW50YXRpdmUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIG5vdXZlbCBlc3NhaSBkYW5zIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1MDBDOWNoZWMgYXByXHUwMEU4cyB7bWF4QXR0ZW1wdHN9IHRlbnRhdGl2ZXMuIENvbnRpbnVhbnQgYXZlYyBsZSBsb3Qgc3VpdmFudC4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgRXJyZXVyIHJcdTAwRTlzZWF1LiBOb3V2ZWwgZXNzYWkuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgRXJyZXVyIHNlcnZldXIuIE5vdXZlbCBlc3NhaS4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgVGltZW91dCBzZXJ2ZXVyLiBOb3V2ZWwgZXNzYWkuLi5cIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBGYXJtIEJvdFwiLFxuICAgIHN0YXJ0OiBcIkRcdTAwRTltYXJyZXJcIixcbiAgICBzdG9wOiBcIkFyclx1MDBFQXRlclwiLFxuICAgIHN0b3BwZWQ6IFwiQm90IGFyclx1MDBFQXRcdTAwRTlcIixcbiAgICBjYWxpYnJhdGU6IFwiQ2FsaWJyZXJcIixcbiAgICBwYWludE9uY2U6IFwiVW5lIGZvaXNcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJWXHUwMEU5cmlmaWNhdGlvbiBkdSBzdGF0dXQuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYXRpb25cIixcbiAgICBkZWxheTogXCJEXHUwMEU5bGFpIChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMvbG90XCIsXG4gICAgbWluQ2hhcmdlczogXCJDaGFyZ2VzIG1pblwiLFxuICAgIGNvbG9yTW9kZTogXCJNb2RlIGNvdWxldXJcIixcbiAgICByYW5kb206IFwiQWxcdTAwRTlhdG9pcmVcIixcbiAgICBmaXhlZDogXCJGaXhlXCIsXG4gICAgcmFuZ2U6IFwiUGxhZ2VcIixcbiAgICBmaXhlZENvbG9yOiBcIkNvdWxldXIgZml4ZVwiLFxuICAgIGFkdmFuY2VkOiBcIkF2YW5jXHUwMEU5XCIsXG4gICAgdGlsZVg6IFwiVHVpbGUgWFwiLFxuICAgIHRpbGVZOiBcIlR1aWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlBhbGV0dGUgcGVyc29ubmFsaXNcdTAwRTllXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZXg6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJlclwiLFxuICAgIHBhaW50ZWQ6IFwiUGVpbnRzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgcmV0cmllczogXCJcdTAwQzljaGVjc1wiLFxuICAgIHRpbGU6IFwiVHVpbGVcIixcbiAgICBjb25maWdTYXZlZDogXCJDb25maWd1cmF0aW9uIHNhdXZlZ2FyZFx1MDBFOWVcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiQ29uZmlndXJhdGlvbiBjaGFyZ1x1MDBFOWVcIixcbiAgICBjb25maWdSZXNldDogXCJDb25maWd1cmF0aW9uIHJcdTAwRTlpbml0aWFsaXNcdTAwRTllXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQZWluZHJlIHVuIHBpeGVsIG1hbnVlbGxlbWVudCBwb3VyIGNhcHR1cmVyIGxlcyBjb29yZG9ublx1MDBFOWVzLi4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJCYWNrZW5kIEVuIGxpZ25lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBIb3JzIGxpZ25lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiRFx1MDBFOW1hcnJhZ2UgZHUgYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiQXJyXHUwMEVBdCBkdSBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhZ2UuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJBdXRvLUZhcm0gZXN0IGRcdTAwRTlqXHUwMEUwIGVuIGNvdXJzIGQnZXhcdTAwRTljdXRpb24uXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGVzdCBlbiBjb3VycyBkJ2V4XHUwMEU5Y3V0aW9uLiBGZXJtZXotbGUgYXZhbnQgZGUgZFx1MDBFOW1hcnJlciBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU1x1MDBFOWxlY3Rpb25uZXIgWm9uZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFBlaWduZXogdW4gcGl4ZWwgZGFucyB1bmUgem9uZSBWSURFIGRlIGxhIGNhcnRlIHBvdXIgZFx1MDBFOWZpbmlyIGxhIHpvbmUgZGUgZmFybWluZ1wiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBxdWUgdm91cyBwZWlnbmlleiBsZSBwaXhlbCBkZSByXHUwMEU5Zlx1MDBFOXJlbmNlLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFpvbmUgZFx1MDBFOWZpbmllISBSYXlvbjogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZFx1MDBFOXBhc3NcdTAwRTkgcG91ciBsYSBzXHUwMEU5bGVjdGlvbiBkZSB6b25lXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBkJ2Fib3JkIGVuIHV0aWxpc2FudCAnU1x1MDBFOWxlY3Rpb25uZXIgWm9uZSdcIixcbiAgICBmYXJtUmFkaXVzOiBcIlJheW9uIGZhcm1cIixcbiAgICBwb3NpdGlvbkluZm86IFwiWm9uZSBhY3R1ZWxsZVwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgRmFybWluZyBkYW5zIHVuIHJheW9uIGRlIHtyYWRpdXN9cHggZGVwdWlzICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgSU1QT1JUQU5UOiBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBWSURFIHBvdXIgXHUwMEU5dml0ZXIgbGVzIGNvbmZsaXRzXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJBdWN1bmUgem9uZVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmU6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU1x1MDBFOWxlY3Rpb25uZXogdW5lIHpvbmUgZCdhYm9yZC4gUGVpZ25leiB1biBwaXhlbCBzdXIgbGEgY2FydGUgcG91ciBkXHUwMEU5ZmluaXIgbGEgem9uZSBkZSBmYXJtaW5nXCJcbiAgfSxcblxuICAgIC8vIENvbW1vbi9TaGFyZWRcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIk91aVwiLFxuICAgIG5vOiBcIk5vblwiLFxuICAgIG9rOiBcIk9LXCIsXG4gICAgY2FuY2VsOiBcIkFubnVsZXJcIixcbiAgICBjbG9zZTogXCJGZXJtZXJcIixcbiAgICBzYXZlOiBcIlNhdXZlZ2FyZGVyXCIsXG4gICAgbG9hZDogXCJDaGFyZ2VyXCIsXG4gICAgZGVsZXRlOiBcIlN1cHByaW1lclwiLFxuICAgIGVkaXQ6IFwiTW9kaWZpZXJcIixcbiAgICBzdGFydDogXCJEXHUwMEU5bWFycmVyXCIsXG4gICAgc3RvcDogXCJBcnJcdTAwRUF0ZXJcIixcbiAgICBwYXVzZTogXCJQYXVzZVwiLFxuICAgIHJlc3VtZTogXCJSZXByZW5kcmVcIixcbiAgICByZXNldDogXCJSXHUwMEU5aW5pdGlhbGlzZXJcIixcbiAgICBzZXR0aW5nczogXCJQYXJhbVx1MDBFOHRyZXNcIixcbiAgICBoZWxwOiBcIkFpZGVcIixcbiAgICBhYm91dDogXCJcdTAwQzAgcHJvcG9zXCIsXG4gICAgbGFuZ3VhZ2U6IFwiTGFuZ3VlXCIsXG4gICAgbG9hZGluZzogXCJDaGFyZ2VtZW50Li4uXCIsXG4gICAgZXJyb3I6IFwiRXJyZXVyXCIsXG4gICAgc3VjY2VzczogXCJTdWNjXHUwMEU4c1wiLFxuICAgIHdhcm5pbmc6IFwiQXZlcnRpc3NlbWVudFwiLFxuICAgIGluZm86IFwiSW5mb3JtYXRpb25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiTGFuZ3VlIGNoYW5nXHUwMEU5ZSBlbiB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGlzZXIgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTXHUwMEU5bGVjdGlvbm5lciBab25lXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyZXIgWm9uZVwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJEXHUwMEU5bWFycmVyIFByb3RlY3Rpb25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJBcnJcdTAwRUF0ZXIgUHJvdGVjdGlvblwiLFxuICAgIHVwcGVyTGVmdDogXCJDb2luIFN1cFx1MDBFOXJpZXVyIEdhdWNoZVwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiQ29pbiBJbmZcdTAwRTlyaWV1ciBEcm9pdFwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQaXhlbHMgUHJvdFx1MDBFOWdcdTAwRTlzXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkNoYW5nZW1lbnRzIERcdTAwRTl0ZWN0XHUwMEU5c1wiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlBpeGVscyBSXHUwMEU5cGFyXHUwMEU5c1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVuIGF0dGVudGUgZCdpbml0aWFsaXNhdGlvbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBWXHUwMEU5cmlmaWNhdGlvbiBkZXMgY291bGV1cnMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBBdWN1bmUgY291bGV1ciB0cm91dlx1MDBFOWUuIE91dnJleiBsYSBwYWxldHRlIGRlIGNvdWxldXJzIHN1ciBsZSBzaXRlLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvdWxldXJzIGRpc3BvbmlibGVzIHRyb3V2XHUwMEU5ZXNcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaXRpYWxpc1x1MDBFOSBhdmVjIHN1Y2NcdTAwRThzXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsJ2luaXRpYWxpc2F0aW9uIGRlIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIENvb3Jkb25uXHUwMEU5ZXMgaW52YWxpZGVzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIExhIHpvbmUgZG9pdCBhdm9pciBsZSBjb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZSBpbmZcdTAwRTlyaWV1ciBhdSBjb2luIGluZlx1MDBFOXJpZXVyIGRyb2l0XCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBab25lIHRyb3AgZ3JhbmRlOiB7c2l6ZX0gcGl4ZWxzIChtYXhpbXVtOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJlIGRlIGxhIHpvbmUgZGUgcHJvdGVjdGlvbi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgWm9uZSBjYXB0dXJcdTAwRTllOiB7Y291bnR9IHBpeGVscyBzb3VzIHByb3RlY3Rpb25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGxhIGNhcHR1cmUgZGUgem9uZToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgQ2FwdHVyZXogZCdhYm9yZCB1bmUgem9uZSBkZSBwcm90ZWN0aW9uXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY3Rpb24gZFx1MDBFOW1hcnJcdTAwRTllIC0gc3VydmVpbGxhbmNlIGRlIGxhIHpvbmVcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUHJvdGVjdGlvbiBhcnJcdTAwRUF0XHUwMEU5ZVwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgWm9uZSBwcm90XHUwMEU5Z1x1MDBFOWUgLSBhdWN1biBjaGFuZ2VtZW50IGRcdTAwRTl0ZWN0XHUwMEU5XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNoYW5nZW1lbnRzIGRcdTAwRTl0ZWN0XHUwMEU5cyBkYW5zIGxhIHpvbmUgcHJvdFx1MDBFOWdcdTAwRTllXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSXHUwMEU5cGFyYXRpb24gZGUge2NvdW50fSBwaXhlbHMgYWx0XHUwMEU5clx1MDBFOXMuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IHtjb3VudH0gcGl4ZWxzIHJcdTAwRTlwYXJcdTAwRTlzIGF2ZWMgc3VjY1x1MDBFOHNcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgclx1MDBFOXBhcmF0aW9uIGRlcyBwaXhlbHM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIENoYXJnZXMgaW5zdWZmaXNhbnRlcyBwb3VyIHJcdTAwRTlwYXJlciBsZXMgY2hhbmdlbWVudHNcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFZcdTAwRTlyaWZpY2F0aW9uIGRlcyBjaGFuZ2VtZW50cyBkYW5zIGxhIHpvbmUgcHJvdFx1MDBFOWdcdTAwRTllLi4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgdlx1MDBFOXJpZmljYXRpb24gZGVzIGNoYW5nZW1lbnRzOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIEdhcmRpZW4gYWN0aWYgLSB6b25lIHNvdXMgcHJvdGVjdGlvblwiLFxuICAgIGxhc3RDaGVjazogXCJEZXJuaVx1MDBFOHJlIHZcdTAwRTlyaWZpY2F0aW9uOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiUHJvY2hhaW5lIHZcdTAwRTlyaWZpY2F0aW9uIGRhbnM6IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbml0aWFsaXNhdGlvbiBhdXRvbWF0aXF1ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGRcdTAwRTltYXJyXHUwMEU5IGF1dG9tYXRpcXVlbWVudFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBJbXBvc3NpYmxlIGRlIGRcdTAwRTltYXJyZXIgYXV0b21hdGlxdWVtZW50LiBVdGlsaXNleiBsZSBib3V0b24gbWFudWVsLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pdGlhbGlzYXRpb24gbWFudWVsbGUgcmVxdWlzZVwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXR0ZSBkZSBjb3VsZXVycyBkXHUwMEU5dGVjdFx1MDBFOWVcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFJlY2hlcmNoZSBkZSBsYSBwYWxldHRlIGRlIGNvdWxldXJzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpYyBzdXIgbGUgYm91dG9uIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm91dG9uIFBhaW50IGludHJvdXZhYmxlXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBQZWlnbmV6IHVuIHBpeGVsIGF1IGNvaW4gU1VQXHUwMEM5UklFVVIgR0FVQ0hFIGRlIGxhIHpvbmUgXHUwMEUwIHByb3RcdTAwRTlnZXJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBNYWludGVuYW50IHBlaWduZXogdW4gcGl4ZWwgYXUgY29pbiBJTkZcdTAwQzlSSUVVUiBEUk9JVCBkZSBsYSB6b25lXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBkZSBsYSBzXHUwMEU5bGVjdGlvbiBkdSBjb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZS4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIGRlIGxhIHNcdTAwRTlsZWN0aW9uIGR1IGNvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXQuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgQ29pbiBzdXBcdTAwRTlyaWV1ciBnYXVjaGUgY2FwdHVyXHUwMEU5OiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBDb2luIGluZlx1MDBFOXJpZXVyIGRyb2l0IGNhcHR1clx1MDBFOTogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZGUgc1x1MDBFOWxlY3Rpb24gZFx1MDBFOXBhc3NcdTAwRTlcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgRXJyZXVyIGRlIHNcdTAwRTlsZWN0aW9uLCB2ZXVpbGxleiByXHUwMEU5ZXNzYXllclwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHJ1ID0ge1xuICAvLyBMYXVuY2hlclxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIEF1dG9CT1QnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0MnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1JyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCcsXG4gICAgc2VsZWN0aW9uOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDNFJyxcbiAgICB1c2VyOiAnXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDJyxcbiAgICBjaGFyZ2VzOiAnXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGJyxcbiAgICBiYWNrZW5kOiAnXHUwNDExXHUwNDREXHUwNDNBXHUwNDM1XHUwNDNEXHUwNDM0JyxcbiAgICBkYXRhYmFzZTogJ1x1MDQxMVx1MDQzMFx1MDQzN1x1MDQzMCBcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0NDUnLFxuICAgIHVwdGltZTogJ1x1MDQxMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQ0RiBcdTA0NDBcdTA0MzBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0NEInLFxuICAgIGNsb3NlOiAnXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDJyxcbiAgICBsYXVuY2g6ICdcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMnLFxuICAgIGxvYWRpbmc6ICdcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAnLFxuICAgIGV4ZWN1dGluZzogJ1x1MDQxMlx1MDQ0Qlx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNScsXG4gICAgZG93bmxvYWRpbmc6ICdcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDNBXHUwNDQwXHUwNDM4XHUwNDNGXHUwNDQyXHUwNDMwLi4uJyxcbiAgICBjaG9vc2VCb3Q6ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwIFx1MDQzOCBcdTA0M0RcdTA0MzBcdTA0MzZcdTA0M0NcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHUwNDEzXHUwNDNFXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFIFx1MDQzQSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0NDMnLFxuICAgIGxvYWRFcnJvcjogJ1x1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzgnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1MDQxRFx1MDQzNVx1MDQzMlx1MDQzRVx1MDQzN1x1MDQzQ1x1MDQzRVx1MDQzNlx1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMC4gXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDRDXHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzRVx1MDQzNFx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0JcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQ0OVx1MDQzNSBcdTA0NDBcdTA0MzBcdTA0MzcuJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBcdTA0MUVcdTA0M0RcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0QnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgXHUwNDFFXHUwNDQ0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBcdTA0MUVcdTA0MUEnLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCcsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBpbml0Qm90OiBcIlx1MDQxOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICByZXNpemVJbWFnZTogXCJcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDNDXHUwNDM1XHUwNDQwIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0M0UgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGxvYWRQcm9ncmVzczogXCJcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0MyBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIgXHUwNDNEXHUwNDMwIFx1MDQ0MVx1MDQzMFx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzMCFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHUwNDFEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDNFIHtjb3VudH0gXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQ0MSB7Y291bnR9IFx1MDQzNFx1MDQzNVx1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEZcdTA0M0NcdTA0MzhcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDM4IFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQ0Mlx1MDQzRVx1MDQzQyBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzUsIFx1MDQzM1x1MDQzNFx1MDQzNSBcdTA0MzJcdTA0NEIgXHUwNDQ1XHUwNDNFXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDM1LCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDNEXHUwNDNFXHUwNDNBIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzOFx1MDQzRFx1MDQzMFx1MDQzQlx1MDQ0MVx1MDQ0RiFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRGLi4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTA0MUZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwIFx1MDQ0M1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQ1x1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDM4XCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHUwNDFGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzMCwgXHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0ZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzgsIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzVcdTA0NDlcdTA0MzUgXHUwNDQwXHUwNDMwXHUwNDM3XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDNFIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MToge3BhaW50ZWR9IFx1MDQzOFx1MDQzNyB7dG90YWx9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOS4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgXHUwNDFEXHUwNDM1XHUwNDQyIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMi4gXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHUwNDIwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0MzVcdTA0M0NcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBcdTA0MjBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDNFISB7Y291bnR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0UuXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDZcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzUgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgXHUwNDIxXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0M0UgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwXCIsXG4gICAgcHJvZ3Jlc3M6IFwiXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgdXNlck5hbWU6IFwiXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXCIsXG4gICAgcGl4ZWxzOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0VcdTA0MzZcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDMyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHUwNDFEXHUwNDMwXHUwNDM2XHUwNDNDXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDBBQlx1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBBdXRvLUJPVFx1MDBCQiwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzguLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBcdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzNFx1MDQzRSB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFx1MDQyMFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDNEXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzOCBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0MzIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XHUwNDM1XCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1MDQyMFx1MDQzMFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQ0MCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzBcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlx1MDQyMVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQ0RVx1MDQ0OVx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzQgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3XCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTA0MThcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDQxXHUwNDM1IFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0NEJcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTA0MUZcdTA0M0VcdTA0M0FcdTA0MzBcdTA0MzdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgbWF4Q2hhcmdlczogXCJcdTA0MUNcdTA0MzBcdTA0M0FcdTA0NDFcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNCLVx1MDQzMlx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzIgXHUwNDM3XHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJcdTA0MTJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzggXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUge3RpbWV9IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM1XHUwNDNEIFx1MDQzQVx1MDQzMFx1MDQzQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0Q6IHtwYWludGVkfSBcdTA0MzhcdTA0Mzcge3RvdGFsfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNFXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzggXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXHUwNDMwOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXHUwNDMwOiB7ZXJyb3J9XCIsXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQyXHUwNDM1XHUwNDNBXHUwNDQzXHUwNDQ5XHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzQgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDNFXHUwNDM5P1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiXHUwNDFEXHUwNDM1IFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQ0Rlx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBjYW5jZWw6IFwiXHUwNDFFXHUwNDQyXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgbWluaW1pemU6IFwiXHUwNDIxXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDQzXHUwNDQyXHUwNDRDXCIsXG4gICAgd2lkdGg6IFwiXHUwNDI4XHUwNDM4XHUwNDQwXHUwNDM4XHUwNDNEXHUwNDMwXCIsXG4gICAgaGVpZ2h0OiBcIlx1MDQxMlx1MDQ0Qlx1MDQ0MVx1MDQzRVx1MDQ0Mlx1MDQzMFwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MVx1MDQzRVx1MDQzRVx1MDQ0Mlx1MDQzRFx1MDQzRVx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0VcdTA0M0RcIixcbiAgICBhcHBseTogXCJcdTA0MUZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0NDZcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ4XHUwNDM1XHUwNDNEOiB7cGFpbnRlZH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRSB8IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MToge3BlcmNlbnR9JSAoe2N1cnJlbnR9IFx1MDQzOFx1MDQzNyB7dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDMwOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9IC0gXHUwNDEyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMjoge2N1cnJlbnR9IFx1MDQzOFx1MDQzNyB7bmVlZGVkfSAtIFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0Rjoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDMwXHUwNDRGIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHUwNDExXHUwNDNFXHUwNDQyIFx1MDQ0M1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0JcdTA0NDFcdTA0NEYgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDMyXHUwNDRCXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQS4gXHUwNDE4XHUwNDQxXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQ0MyBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDMwLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHUwNDI2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQzRVx1MDQzOFx1MDQ0MVx1MDQzQSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzkgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDRCLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHUwNDFEXHUwNDMwXHUwNDM2XHUwNDMwXHUwNDQyXHUwNDM4XHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzOCBcdTAwQUJQYWludFx1MDBCQi4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1MDQxQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzMCBcdTAwQUJQYWludFx1MDBCQiBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTA0MjJcdTA0NDBcdTA0MzVcdTA0MzFcdTA0NDNcdTA0MzVcdTA0NDJcdTA0NDFcdTA0NEYgXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzMCB7YXR0ZW1wdH0gXHUwNDM4XHUwNDM3IHttYXhBdHRlbXB0c30gXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3IHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzUge2F0dGVtcHR9IFx1MDQzOFx1MDQzNyB7bWF4QXR0ZW1wdHN9LCBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3IHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0NDFcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0NEYge21heEF0dGVtcHRzfSBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0VcdTA0M0EuIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzIgXHUwNDQxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDM1XHUwNDNDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzNS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzNVx1MDQ0Mlx1MDQzOC4gXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDMwLiBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBcdTA0MjJcdTA0MzBcdTA0MzlcdTA0M0NcdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDQxXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDMwLiBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAodG8gYmUgaW1wbGVtZW50ZWQpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQ1wiLFxuICAgIHN0YXJ0OiBcIlx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0b3A6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcHBlZDogXCJcdTA0MTFcdTA0M0VcdTA0NDIgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXCIsXG4gICAgY2FsaWJyYXRlOiBcIlx1MDQxQVx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHBhaW50T25jZTogXCJcdTA0MTVcdTA0MzRcdTA0MzhcdTA0M0RcdTA0M0VcdTA0NDBcdTA0MzBcdTA0MzdcdTA0M0VcdTA0MzJcdTA0M0VcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDQzXHUwNDQxXHUwNDMwLi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBkZWxheTogXCJcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzAgKFx1MDQzQ1x1MDQ0MSlcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDM3XHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiXHUwNDFDXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDNDXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFXHUwNDM1IFx1MDQzQVx1MDQzRVx1MDQzQi1cdTA0MzJcdTA0M0VcIixcbiAgICBjb2xvck1vZGU6IFwiXHUwNDIwXHUwNDM1XHUwNDM2XHUwNDM4XHUwNDNDIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIHJhbmRvbTogXCJcdTA0MjFcdTA0M0JcdTA0NDNcdTA0NDdcdTA0MzBcdTA0MzlcdTA0M0RcdTA0NEJcdTA0MzlcIixcbiAgICBmaXhlZDogXCJcdTA0MjRcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzlcIixcbiAgICByYW5nZTogXCJcdTA0MTRcdTA0MzhcdTA0MzBcdTA0M0ZcdTA0MzBcdTA0MzdcdTA0M0VcdTA0M0RcIixcbiAgICBmaXhlZENvbG9yOiBcIlx1MDQyNFx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcIixcbiAgICBhZHZhbmNlZDogXCJcdTA0MjBcdTA0MzBcdTA0NDFcdTA0NDhcdTA0MzhcdTA0NDBcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzVcIixcbiAgICB0aWxlWDogXCJcdTA0MUZcdTA0M0JcdTA0MzhcdTA0NDJcdTA0M0FcdTA0MzAgWFwiLFxuICAgIHRpbGVZOiBcIlx1MDQxRlx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQzQVx1MDQzMCBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTA0MjFcdTA0MzJcdTA0M0VcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXCIsXG4gICAgcGFpbnRlZDogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0MzBcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0VcIixcbiAgICBjaGFyZ2VzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHJldHJpZXM6IFwiXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzOFwiLFxuICAgIHRpbGU6IFwiXHUwNDFGXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDNBXHUwNDMwXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiXHUwNDFBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiXHUwNDIxXHUwNDMxXHUwNDQwXHUwNDNFXHUwNDQxIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOFwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzJcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0NDNcdTA0NEUgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzMCBcdTA0M0FcdTA0M0VcdTA0M0VcdTA0NDBcdTA0MzRcdTA0MzhcdTA0M0RcdTA0MzBcdTA0NDIuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIlx1MDQxMVx1MDQ0RFx1MDQzQVx1MDQ0RFx1MDQzRFx1MDQzNCBcdTA0MUVcdTA0M0RcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJcdTA0MTFcdTA0NERcdTA0M0FcdTA0NERcdTA0M0RcdTA0MzRcIixcbiAgICBzdGFydGluZ0JvdDogXCJcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0EgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLi4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDMwIFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMC4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIlx1MDQxQVx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIlx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0MgXHUwNDQzXHUwNDM2XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0UuIFx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzRVx1MDQzQyBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwLlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxRlx1MDQyM1x1MDQyMVx1MDQyMlx1MDQxRVx1MDQxOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDRCLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNFXHUwNDMxXHUwNDNFXHUwNDM3XHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzAuXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0Ri4uLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzMCEgXHUwNDIwXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDQzXHUwNDQxOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDXHUwNDMwXHUwNDQzXHUwNDQyIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQxIFx1MDQzRlx1MDQzRVx1MDQzQ1x1MDQzRVx1MDQ0OVx1MDQ0Q1x1MDQ0RSBcdTAwQUJcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDXHUwMEJCXCIsXG4gICAgZmFybVJhZGl1czogXCJcdTA0MjBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDEgXHUwNDQ0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1MDQyMlx1MDQzNVx1MDQzQVx1MDQ0M1x1MDQ0OVx1MDQzMFx1MDQ0RiBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIFx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQyBcdTA0MzIgXHUwNDQwXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDQzXHUwNDQxXHUwNDM1IHtyYWRpdXN9cHggXHUwNDNFXHUwNDQyICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgXHUwNDEyXHUwNDEwXHUwNDE2XHUwNDFEXHUwNDFFOiBcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDFGXHUwNDIzXHUwNDIxXHUwNDIyXHUwNDIzXHUwNDJFIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QywgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzOFx1MDQzN1x1MDQzMVx1MDQzNVx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDRcdTA0M0JcdTA0MzhcdTA0M0FcdTA0NDJcdTA0M0VcdTA0MzIuXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTA0MURcdTA0MzVcdTA0NDIgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgY3VycmVudFpvbmU6IFwiXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFx1MDQyMVx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMCBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDLiBcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzRFx1MDQzMCBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0MzUsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0M0VcdTA0MzFcdTA0M0VcdTA0MzdcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0NFx1MDQzMFx1MDQ0MFx1MDQzQ1x1MDQzMC5cIlxuICB9LFxuXG4gIC8vIENvbW1vbi9TaGFyZWRcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1MDQxNFx1MDQzMFwiLFxuICAgIG5vOiBcIlx1MDQxRFx1MDQzNVx1MDQ0MlwiLFxuICAgIG9rOiBcIlx1MDQxRVx1MDQxQVwiLFxuICAgIGNhbmNlbDogXCJcdTA0MUVcdTA0NDJcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBjbG9zZTogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NENcIixcbiAgICBzYXZlOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGxvYWQ6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgZGVsZXRlOiBcIlx1MDQyM1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGVkaXQ6IFwiXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc3RhcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcDogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBwYXVzZTogXCJcdTA0MUZcdTA0NDBcdTA0MzhcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICByZXN1bWU6IFwiXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgcmVzZXQ6IFwiXHUwNDIxXHUwNDMxXHUwNDQwXHUwNDNFXHUwNDQxXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc2V0dGluZ3M6IFwiXHUwNDFEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4XCIsXG4gICAgaGVscDogXCJcdTA0MUZcdTA0M0VcdTA0M0NcdTA0M0VcdTA0NDlcdTA0NENcIixcbiAgICBhYm91dDogXCJcdTA0MThcdTA0M0RcdTA0NDRcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBsYW5ndWFnZTogXCJcdTA0MkZcdTA0MzdcdTA0NEJcdTA0M0FcIixcbiAgICBsb2FkaW5nOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMC4uLlwiLFxuICAgIGVycm9yOiBcIlx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMFwiLFxuICAgIHN1Y2Nlc3M6IFwiXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ1XCIsXG4gICAgd2FybmluZzogXCJcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0NDNcdTA0M0ZcdTA0NDBcdTA0MzVcdTA0MzZcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBpbmZvOiBcIlx1MDQxOFx1MDQzRFx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdTA0MkZcdTA0MzdcdTA0NEJcdTA0M0EgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEIFx1MDQzRFx1MDQzMCB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMFwiLFxuICAgIGluaXRCb3Q6IFwiXHUwNDE4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIEd1YXJkLUJPVFwiLFxuICAgIHNlbGVjdEFyZWE6IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGNhcHR1cmVBcmVhOiBcIlx1MDQxN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0M1wiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NDNcIixcbiAgICB1cHBlckxlZnQ6IFwiXHUwNDEyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQxQlx1MDQzNVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0MjNcdTA0MzNcdTA0M0VcdTA0M0JcIixcbiAgICBsb3dlclJpZ2h0OiBcIlx1MDQxRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0MUZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDIzXHUwNDMzXHUwNDNFXHUwNDNCXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzhcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiXHUwNDFFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlx1MDQxMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzhcIixcbiAgICBjaGFyZ2VzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzguLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0MzAgXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQ0Qi4gXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0MyBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIgXHUwNDNEXHUwNDMwIFx1MDQ0MVx1MDQzMFx1MDQzOVx1MDQ0Mlx1MDQzNS5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHUwNDFEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDNFIHtjb3VudH0gXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOCBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBcdTA0MURcdTA0MzVcdTA0MzRcdTA0MzVcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzJcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNFXHUwNDQwXHUwNDM0XHUwNDM4XHUwNDNEXHUwNDMwXHUwNDQyXHUwNDRCXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0M0RcdTA0MzAgXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0JcdTA0MzVcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0Q1x1MDQ0OFx1MDQzNSBcdTA0M0RcdTA0MzhcdTA0MzZcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMFwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0MVx1MDQzQlx1MDQzOFx1MDQ0OFx1MDQzQVx1MDQzRVx1MDQzQyBcdTA0MzFcdTA0M0VcdTA0M0JcdTA0NENcdTA0NDhcdTA0MzBcdTA0NEY6IHtzaXplfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgKFx1MDQzQ1x1MDQzMFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQzQ1x1MDQ0M1x1MDQzQzoge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEIuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzA6IHtjb3VudH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRlx1MDQzRVx1MDQzNCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0M0VcdTA0MzlcIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzAgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4OiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdTA0MjFcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEJcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzMCAtIFx1MDQzQ1x1MDQzRVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQzRFx1MDQzMyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyAtIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0RcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNFXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDMyIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1MDQxMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSB7Y291bnR9IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFx1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzlcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0Mzk6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNVx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzlcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDMyIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzguLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDM4IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOToge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTA0MjFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0MzYgXHUwNDMwXHUwNDNBXHUwNDQyXHUwNDM4XHUwNDMyXHUwNDM1XHUwNDNEIC0gXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQzNCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0M0VcdTA0MzlcIixcbiAgICBsYXN0Q2hlY2s6IFwiXHUwNDFGXHUwNDNFXHUwNDQxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDNEXHUwNDRGXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMDoge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1MDQyMVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQ0RVx1MDQ0OVx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3OiB7dGltZX1cdTA0NDFcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTA0MURcdTA0MzUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzguIFx1MDQxOFx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0NDMgXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzMC5cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0RiBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzOSBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0NEIuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MURcdTA0MzBcdTA0MzZcdTA0MzBcdTA0NDJcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDM4IFx1MDBBQlBhaW50XHUwMEJCLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHUwNDFBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDMwIFx1MDBBQlBhaW50XHUwMEJCIFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxMlx1MDQxNVx1MDQyMFx1MDQyNVx1MDQxRFx1MDQxNVx1MDQxQyBcdTA0MUJcdTA0MTVcdTA0MTJcdTA0MUVcdTA0MUMgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDQzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDRCXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHUwNDIyXHUwNDM1XHUwNDNGXHUwNDM1XHUwNDQwXHUwNDRDIFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxRFx1MDQxOFx1MDQxNlx1MDQxRFx1MDQxNVx1MDQxQyBcdTA0MUZcdTA0MjBcdTA0MTBcdTA0MTJcdTA0MUVcdTA0MUMgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDQzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM1XHUwNDMzXHUwNDNFIFx1MDQzQlx1MDQzNVx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0MzAuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0RcdTA0MzhcdTA0MzZcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMC4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTA0MTJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDNCXHUwNDM1XHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQ0M1x1MDQzM1x1MDQzRVx1MDQzQiBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDdcdTA0MzVcdTA0M0Q6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRDogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQy1cdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwXCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAsIFx1MDQzRlx1MDQzRVx1MDQzNlx1MDQzMFx1MDQzQlx1MDQ0M1x1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMCwgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzMFwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHpoSGFucyA9IHtcbiAgLy8gXHU1NDJGXHU1MkE4XHU1NjY4XG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgXHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0EnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkUnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTgxRUFcdTUyQThcdTVCODhcdTYyQTQnLFxuICAgIHNlbGVjdGlvbjogJ1x1OTAwOVx1NjJFOScsXG4gICAgdXNlcjogJ1x1NzUyOFx1NjIzNycsXG4gICAgY2hhcmdlczogJ1x1NkIyMVx1NjU3MCcsXG4gICAgYmFja2VuZDogJ1x1NTQwRVx1N0FFRicsXG4gICAgZGF0YWJhc2U6ICdcdTY1NzBcdTYzNkVcdTVFOTMnLFxuICAgIHVwdGltZTogJ1x1OEZEMFx1ODg0Q1x1NjVGNlx1OTVGNCcsXG4gICAgY2xvc2U6ICdcdTUxNzNcdTk1RUQnLFxuICAgIGxhdW5jaDogJ1x1NTQyRlx1NTJBOCcsXG4gICAgbG9hZGluZzogJ1x1NTJBMFx1OEY3RFx1NEUyRFx1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1x1NkI2M1x1NTcyOFx1NEUwQlx1OEY3RFx1ODExQVx1NjcyQ1x1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnXHU5MDA5XHU2MkU5XHU0RTAwXHU0RTJBXHU2NzNBXHU1NjY4XHU0RUJBXHU1RTc2XHU3MEI5XHU1MUZCXHU1NDJGXHU1MkE4JyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHU1MUM2XHU1OTA3XHU1NDJGXHU1MkE4JyxcbiAgICBsb2FkRXJyb3I6ICdcdTUyQTBcdThGN0RcdTk1MTlcdThCRUYnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1NjVFMFx1NkNENVx1NTJBMFx1OEY3RFx1NjI0MFx1OTAwOVx1NjczQVx1NTY2OFx1NEVCQVx1MzAwMlx1OEJGN1x1NjhDMFx1NjdFNVx1N0Y1MVx1N0VEQ1x1OEZERVx1NjNBNVx1NjIxNlx1OTFDRFx1OEJENVx1MzAwMicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgXHU2OEMwXHU2N0U1XHU0RTJELi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgXHU1NzI4XHU3RUJGJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IFx1NzlCQlx1N0VCRicsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgXHU2QjYzXHU1RTM4JyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBcdTk1MTlcdThCRUYnLFxuICAgIHVua25vd246ICctJ1xuICB9LFxuXG4gIC8vIFx1N0VEOFx1NTZGRVx1NkEyMVx1NTc1N1xuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkVcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJBOFx1NjczQVx1NTY2OFx1NEVCQVwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1NEUwQVx1NEYyMFx1NTZGRVx1NzI0N1wiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1OEMwM1x1NjU3NFx1NTZGRVx1NzI0N1x1NTkyN1x1NUMwRlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTAwOVx1NjJFOVx1NEY0RFx1N0Y2RVwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2XCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1NTA1Q1x1NkI2Mlx1N0VEOFx1NTIzNlwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTRGRERcdTVCNThcdThGREJcdTVFQTZcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2XCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1NjhDMFx1NjdFNVx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1OEJGN1x1NTcyOFx1N0Y1MVx1N0FEOVx1NEUwQVx1NjI1M1x1NUYwMFx1OEMwM1x1ODI3Mlx1Njc3Rlx1NTQwRVx1OTFDRFx1OEJENVx1RkYwMVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTc5Q0RcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzJcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIFx1NkI2M1x1NTcyOFx1NTJBMFx1OEY3RFx1NTZGRVx1NzI0Ny4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTU2RkVcdTcyNDdcdTVERjJcdTUyQTBcdThGN0RcdUZGMENcdTY3MDlcdTY1NDhcdTUwQ0ZcdTdEMjAge2NvdW50fSBcdTRFMkFcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTU2RkVcdTcyNDdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1OEJGN1x1NTcyOFx1NEY2MFx1NjBGM1x1NUYwMFx1NTlDQlx1N0VEOFx1NTIzNlx1NzY4NFx1NTczMFx1NjVCOVx1NkQ4Mlx1N0IyQ1x1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1RkYwMVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU2RDgyXHU1M0MyXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NEY0RFx1N0Y2RVx1OEJCRVx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU5MDA5XHU2MkU5XHU4RDg1XHU2NUY2XCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHU1REYyXHU2OEMwXHU2RDRCXHU1MjMwXHU0RjREXHU3RjZFXHVGRjBDXHU1OTA0XHU3NDA2XHU0RTJELi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU2OEMwXHU2RDRCXHU1OTMxXHU4RDI1XHVGRjBDXHU4QkY3XHU5MUNEXHU4QkQ1XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2Li4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHU4RkRCXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIFx1NkNBMVx1NjcwOVx1NkIyMVx1NjU3MFx1MzAwMlx1N0I0OVx1NUY4NSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NzUyOFx1NjIzN1x1NURGMlx1NTA1Q1x1NkI2Mlx1N0VEOFx1NTIzNlwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1N0VEOFx1NTIzNlx1NUI4Q1x1NjIxMFx1RkYwMVx1NTE3MVx1N0VEOFx1NTIzNiB7Y291bnR9IFx1NEUyQVx1NTBDRlx1N0QyMFx1MzAwMlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIFx1N0VEOFx1NTIzNlx1OEZDN1x1N0EwQlx1NEUyRFx1NTFGQVx1OTUxOVwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1NTJBMFx1OEY3RFx1NTZGRVx1NzI0N1x1NUU3Nlx1OTAwOVx1NjJFOVx1NEY0RFx1N0Y2RVwiLFxuICAgIHByb2dyZXNzOiBcIlx1OEZEQlx1NUVBNlwiLFxuICAgIHVzZXJOYW1lOiBcIlx1NzUyOFx1NjIzN1wiLFxuICAgIHBpeGVsczogXCJcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3MFwiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiXHU5ODg0XHU4QkExXHU2NUY2XHU5NUY0XCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHU3MEI5XHU1MUZCXHUyMDFDXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBXHUyMDFEXHU1RjAwXHU1OUNCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgXHU1NkZFXHU3MjQ3XHU1REYyXHU4QzAzXHU2NTc0XHU0RTNBIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHU3RUQ4XHU1MjM2XHU2NjgyXHU1MDVDXHU0RThFXHU0RjREXHU3RjZFIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXHU2NTcwXCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1NjI3OVx1NkIyMVx1NTkyN1x1NUMwRlwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHU0RTBCXHU2QjIxXHU2Mjc5XHU2QjIxXHU2NUY2XHU5NUY0XCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTRGN0ZcdTc1MjhcdTYyNDBcdTY3MDlcdTUzRUZcdTc1MjhcdTZCMjFcdTY1NzBcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTY2M0VcdTc5M0FcdTg5ODZcdTc2RDZcdTVDNDJcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1NkJDRlx1NjI3OVx1NjcwMFx1NTkyN1x1NkIyMVx1NjU3MFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzA6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiXHU1MjY5XHU0RjU5XHU2NUY2XHU5NUY0XCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTdCNDlcdTVGODUge3RpbWV9IFx1NTQwRVx1N0VFN1x1N0VFRC4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1OEZEQlx1NUVBNlx1NURGMlx1NEZERFx1NUI1OFx1NEUzQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1NURGMlx1NTJBMFx1OEY3RFx1OEZEQlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwXHU1REYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1NTJBMFx1OEY3RFx1OEZEQlx1NUVBNlx1NTkzMVx1OEQyNToge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBcdTRGRERcdTVCNThcdThGREJcdTVFQTZcdTU5MzFcdThEMjU6IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1NTcyOFx1NTA1Q1x1NkI2Mlx1NEU0Qlx1NTI0RFx1ODk4MVx1NEZERFx1NUI1OFx1NUY1M1x1NTI0RFx1OEZEQlx1NUVBNlx1NTQxN1x1RkYxRlwiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTY1M0VcdTVGMDNcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgbWluaW1pemU6IFwiXHU2NzAwXHU1QzBGXHU1MzE2XCIsXG4gICAgd2lkdGg6IFwiXHU1QkJEXHU1RUE2XCIsXG4gICAgaGVpZ2h0OiBcIlx1OUFEOFx1NUVBNlwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHU0RkREXHU2MzAxXHU3RUI1XHU2QTJBXHU2QkQ0XCIsXG4gICAgYXBwbHk6IFwiXHU1RTk0XHU3NTI4XCIsXG4gICAgb3ZlcmxheU9uOiBcIlx1ODk4Nlx1NzZENlx1NUM0MjogXHU1RjAwXHU1NDJGXCIsXG4gICAgb3ZlcmxheU9mZjogXCJcdTg5ODZcdTc2RDZcdTVDNDI6IFx1NTE3M1x1OTVFRFwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1NjI3OVx1NkIyMVx1NUI4Q1x1NjIxMDogXHU1REYyXHU3RUQ4XHU1MjM2IHtwYWludGVkfSBcdTUwQ0ZcdTdEMjAgfCBcdThGREJcdTVFQTY6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3MFx1NjA2Mlx1NTkwRDoge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU2NUY2XHU5NUY0OiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTcwOiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTUyNjlcdTRGNTk6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NjVFMFx1NkNENVx1ODFFQVx1NTJBOFx1NTQyRlx1NTJBOFx1RkYwQ1x1OEJGN1x1NjI0Qlx1NTJBOFx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2OEMwXHU2RDRCXHU1MjMwXHU4QzAzXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThDMDNcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTcwQjlcdTUxRkJcdTdFRDhcdTUyMzZcdTYzMDlcdTk0QUUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFRDhcdTUyMzZcdTYzMDlcdTk0QUVcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHU5MUNEXHU4QkQ1IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9XHVGRjBDXHU3QjQ5XHU1Rjg1IHtkZWxheX0gXHU3OUQyLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHU3QjJDIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NUMxRFx1OEJENVx1NTFGQVx1OTUxOVx1RkYwQ1x1NUMwNlx1NTcyOCB7ZGVsYXl9IFx1NzlEMlx1NTQwRVx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBcdThEODVcdThGQzcge21heEF0dGVtcHRzfSBcdTZCMjFcdTVDMURcdThCRDVcdTU5MzFcdThEMjVcdTMwMDJcdTdFRTdcdTdFRURcdTRFMEJcdTRFMDBcdTYyNzkuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIFx1N0Y1MVx1N0VEQ1x1OTUxOVx1OEJFRlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTY3MERcdTUyQTFcdTU2NjhcdTk1MTlcdThCRUZcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThCRDUuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1NjcwRFx1NTJBMVx1NTY2OFx1OEQ4NVx1NjVGNlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiXG4gIH0sXG5cbiAgLy8gXHU1MTlDXHU1NzNBXHU2QTIxXHU1NzU3XHVGRjA4XHU1Rjg1XHU1QjlFXHU3M0IwXHVGRjA5XG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU1MTlDXHU1NzNBXHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgc3RhcnQ6IFwiXHU1RjAwXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBzdG9wcGVkOiBcIlx1NjczQVx1NTY2OFx1NEVCQVx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIGNhbGlicmF0ZTogXCJcdTY4MjFcdTUxQzZcIixcbiAgICBwYWludE9uY2U6IFwiXHU0RTAwXHU2QjIxXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiXHU2OEMwXHU2N0U1XHU3MkI2XHU2MDAxXHU0RTJELi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTkxNERcdTdGNkVcIixcbiAgICBkZWxheTogXCJcdTVFRjZcdThGREYgKFx1NkJFQlx1NzlEMilcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcIixcbiAgICBtaW5DaGFyZ2VzOiBcIlx1NjcwMFx1NUMxMVx1NkIyMVx1NjU3MFwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTk4OUNcdTgyNzJcdTZBMjFcdTVGMEZcIixcbiAgICByYW5kb206IFwiXHU5NjhGXHU2NzNBXCIsXG4gICAgZml4ZWQ6IFwiXHU1NkZBXHU1QjlBXCIsXG4gICAgcmFuZ2U6IFwiXHU4MzAzXHU1NkY0XCIsXG4gICAgZml4ZWRDb2xvcjogXCJcdTU2RkFcdTVCOUFcdTk4OUNcdTgyNzJcIixcbiAgICBhZHZhbmNlZDogXCJcdTlBRDhcdTdFQTdcIixcbiAgICB0aWxlWDogXCJcdTc0RTZcdTcyNDcgWFwiLFxuICAgIHRpbGVZOiBcIlx1NzRFNlx1NzI0NyBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTgxRUFcdTVCOUFcdTRFNDlcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTRGOEJcdTU5ODI6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTYzNTVcdTgzQjdcIixcbiAgICBwYWludGVkOiBcIlx1NURGMlx1N0VEOFx1NTIzNlwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgcmV0cmllczogXCJcdTkxQ0RcdThCRDVcIixcbiAgICB0aWxlOiBcIlx1NzRFNlx1NzI0N1wiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NEZERFx1NUI1OFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTUyQTBcdThGN0RcIixcbiAgICBjb25maWdSZXNldDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTkxQ0RcdTdGNkVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlx1OEJGN1x1NjI0Qlx1NTJBOFx1N0VEOFx1NTIzNlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1NEVFNVx1NjM1NVx1ODNCN1x1NTc1MFx1NjgwNy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHU1NDBFXHU3QUVGXHU1NzI4XHU3RUJGXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiXHU1NDBFXHU3QUVGXHU3OUJCXHU3RUJGXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1NDJGXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1MDVDXHU2QjYyXHU2NzNBXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHU2ODIxXHU1MUM2XHU0RTJELi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHU4MUVBXHU1MkE4XHU1MTlDXHU1NzNBXHU1REYyXHU1NzI4XHU4RkQwXHU4ODRDXHUzMDAyXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkVcdTZCNjNcdTU3MjhcdThGRDBcdTg4NENcdUZGMENcdThCRjdcdTUxNDhcdTUxNzNcdTk1RURcdTUxOERcdTU0MkZcdTUyQThcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0FcdTMwMDJcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTU3MzBcdTU2RkVcdTc2ODRcdTdBN0FcdTc2N0RcdTUzM0FcdTU3REZcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcdTRFRTVcdThCQkVcdTdGNkVcdTUxOUNcdTU3M0FcdTUzM0FcdTU3REZcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NkQ4Mlx1NTNDMlx1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdThCQkVcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcdTUzNEFcdTVGODQ6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTUzM0FcdTU3REZcdTkwMDlcdTYyRTlcdThEODVcdTY1RjZcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlx1RkYwOFx1NEY3Rlx1NzUyOFx1MjAxQ1x1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlx1MjAxRFx1NjMwOVx1OTRBRVx1RkYwOVwiLFxuICAgIGZhcm1SYWRpdXM6IFwiXHU1MTlDXHU1NzNBXHU1MzRBXHU1Rjg0XCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1NUY1M1x1NTI0RFx1NTMzQVx1NTdERlwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHU2QjYzXHU1NzI4XHU0RUU1XHU1MzRBXHU1Rjg0IHtyYWRpdXN9cHggXHU1NzI4ICh7eH0se3l9KSBcdTUxOUNcdTU3M0FcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIFx1OTFDRFx1ODk4MTogXHU4QkY3XHU5MDA5XHU2MkU5XHU3QTdBXHU3NjdEXHU1MzNBXHU1N0RGXHU0RUU1XHU5MDdGXHU1MTREXHU1MUIyXHU3QTgxXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTY3MkFcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTUzM0FcdTU3REY6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHU4QkY3XHU1MTQ4XHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHVGRjBDXHU1NzI4XHU1NzMwXHU1NkZFXHU0RTBBXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHU0RUU1XHU4QkJFXHU3RjZFXHU1MTlDXHU1NzNBXHU1MzNBXHU1N0RGXCJcbiAgfSxcblxuICAvLyBcdTUxNkNcdTUxNzFcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1NjYyRlwiLFxuICAgIG5vOiBcIlx1NTQyNlwiLFxuICAgIG9rOiBcIlx1Nzg2RVx1OEJBNFwiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBjbG9zZTogXCJcdTUxNzNcdTk1RURcIixcbiAgICBzYXZlOiBcIlx1NEZERFx1NUI1OFwiLFxuICAgIGxvYWQ6IFwiXHU1MkEwXHU4RjdEXCIsXG4gICAgZGVsZXRlOiBcIlx1NTIyMFx1OTY2NFwiLFxuICAgIGVkaXQ6IFwiXHU3RjE2XHU4RjkxXCIsXG4gICAgc3RhcnQ6IFwiXHU1RjAwXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBwYXVzZTogXCJcdTY2ODJcdTUwNUNcIixcbiAgICByZXN1bWU6IFwiXHU3RUU3XHU3RUVEXCIsXG4gICAgcmVzZXQ6IFwiXHU5MUNEXHU3RjZFXCIsXG4gICAgc2V0dGluZ3M6IFwiXHU4QkJFXHU3RjZFXCIsXG4gICAgaGVscDogXCJcdTVFMkVcdTUyQTlcIixcbiAgICBhYm91dDogXCJcdTUxNzNcdTRFOEVcIixcbiAgICBsYW5ndWFnZTogXCJcdThCRURcdThBMDBcIixcbiAgICBsb2FkaW5nOiBcIlx1NTJBMFx1OEY3RFx1NEUyRC4uLlwiLFxuICAgIGVycm9yOiBcIlx1OTUxOVx1OEJFRlwiLFxuICAgIHN1Y2Nlc3M6IFwiXHU2MjEwXHU1MjlGXCIsXG4gICAgd2FybmluZzogXCJcdThCNjZcdTU0NEFcIixcbiAgICBpbmZvOiBcIlx1NEZFMVx1NjA2RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdThCRURcdThBMDBcdTVERjJcdTUyMDdcdTYzNjJcdTRFM0Ege2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gXHU1Qjg4XHU2MkE0XHU2QTIxXHU1NzU3XG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJBOFx1NUI4OFx1NjJBNFwiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBjYXB0dXJlQXJlYTogXCJcdTYzNTVcdTgzQjdcdTUzM0FcdTU3REZcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHU1RjAwXHU1OUNCXHU1Qjg4XHU2MkE0XCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHU1MDVDXHU2QjYyXHU1Qjg4XHU2MkE0XCIsXG4gICAgdXBwZXJMZWZ0OiBcIlx1NURFNlx1NEUwQVx1ODlEMlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1NTNEN1x1NEZERFx1NjJBNFx1NTBDRlx1N0QyMFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTY4QzBcdTZENEJcdTUyMzBcdTc2ODRcdTUzRDhcdTUzMTZcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJcdTRGRUVcdTU5MERcdTc2ODRcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3MFwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTY4QzBcdTY3RTVcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTk4OUNcdTgyNzJcdUZGMENcdThCRjdcdTU3MjhcdTdGNTFcdTdBRDlcdTRFMEFcdTYyNTNcdTVGMDBcdThDMDNcdTgyNzJcdTY3N0ZcdTMwMDJcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3OUNEXHU1M0VGXHU3NTI4XHU5ODlDXHU4MjcyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NUI4OFx1NjJBNFx1NjczQVx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NjIxMFx1NTI5RlwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU1OTMxXHU4RDI1XCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgXHU1NzUwXHU2ODA3XHU2NUUwXHU2NTQ4XCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1NTMzQVx1NTdERlx1NjVFMFx1NjU0OFx1RkYwQ1x1NURFNlx1NEUwQVx1ODlEMlx1NUZDNVx1OTg3Qlx1NUMwRlx1NEU4RVx1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHU1MzNBXHU1N0RGXHU4RkM3XHU1OTI3OiB7c2l6ZX0gXHU1MENGXHU3RDIwIChcdTY3MDBcdTU5Mjc6IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IFx1NjM1NVx1ODNCN1x1NUI4OFx1NjJBNFx1NTMzQVx1NTdERlx1NEUyRC4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHU1MzNBXHU1N0RGXHU2MzU1XHU4M0I3XHU2MjEwXHU1MjlGOiB7Y291bnR9IFx1NTBDRlx1N0QyMFx1NTNEN1x1NEZERFx1NjJBNFwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHU2MzU1XHU4M0I3XHU1MzNBXHU1N0RGXHU1MUZBXHU5NTE5OiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdThCRjdcdTUxNDhcdTYzNTVcdTgzQjdcdTRFMDBcdTRFMkFcdTVCODhcdTYyQTRcdTUzM0FcdTU3REZcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU2MkE0XHU1REYyXHU1NDJGXHU1MkE4IC0gXHU1MzNBXHU1N0RGXHU3NkQxXHU2M0E3XHU0RTJEXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NUI4OFx1NjJBNFx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHU1MzNBXHU1N0RGXHU1Qjg5XHU1MTY4IC0gXHU2NzJBXHU2OEMwXHU2RDRCXHU1MjMwXHU1M0Q4XHU1MzE2XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTY4QzBcdTZENEJcdTUyMzAge2NvdW50fSBcdTRFMkFcdTUzRDhcdTUzMTZcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1NkI2M1x1NTcyOFx1NEZFRVx1NTkwRCB7Y291bnR9IFx1NEUyQVx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHU1REYyXHU2MjEwXHU1MjlGXHU0RkVFXHU1OTBEIHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIFx1NEZFRVx1NTkwRFx1NTFGQVx1OTUxOToge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHU2QjIxXHU2NTcwXHU0RTBEXHU4REIzXHVGRjBDXHU2NUUwXHU2Q0Q1XHU0RkVFXHU1OTBEXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY4QzBcdTY3RTVcdTUzM0FcdTU3REZcdTUzRDhcdTUzMTYuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTY4QzBcdTY3RTVcdTUxRkFcdTk1MTk6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU2MkE0XHU0RTJEIC0gXHU1MzNBXHU1N0RGXHU1M0Q3XHU0RkREXHU2MkE0XCIsXG4gICAgbGFzdENoZWNrOiBcIlx1NEUwQVx1NkIyMVx1NjhDMFx1NjdFNToge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1NEUwQlx1NkIyMVx1NjhDMFx1NjdFNToge3RpbWV9IFx1NzlEMlx1NTQwRVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NjVFMFx1NkNENVx1ODFFQVx1NTJBOFx1NTQyRlx1NTJBOFx1RkYwQ1x1OEJGN1x1NjI0Qlx1NTJBOFx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEMwM1x1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1NzBCOVx1NTFGQlx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRVwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU5NzAwXHU4OTgxXHU0RkREXHU2MkE0XHU1MzNBXHU1N0RGXHU3Njg0XHU1REU2XHU0RTBBXHU4OUQyXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHU3M0IwXHU1NzI4XHU1NzI4XHU1M0YzXHU0RTBCXHU4OUQyXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDA5XHU2MkU5XHU1REU2XHU0RTBBXHU4OUQyLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTAwOVx1NjJFOVx1NTNGM1x1NEUwQlx1ODlEMi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTgzQjdcdTVERTZcdTRFMEFcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1ODNCN1x1NTNGM1x1NEUwQlx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1OTAwOVx1NjJFOVx1OEQ4NVx1NjVGNlwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTkwMDlcdTYyRTlcdTUxRkFcdTk1MTlcdUZGMENcdThCRjdcdTkxQ0RcdThCRDVcIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCB6aEhhbnQgPSB7XG4gIC8vIFx1NTU1M1x1NTJENVx1NTY2OFxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIFx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQScsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgXHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0JyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2JyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgXHU4MUVBXHU1MkQ1XHU1Qjg4XHU4Qjc3JyxcbiAgICBzZWxlY3Rpb246ICdcdTkwNzhcdTY0QzcnLFxuICAgIHVzZXI6ICdcdTc1MjhcdTYyMzcnLFxuICAgIGNoYXJnZXM6ICdcdTZCMjFcdTY1NzgnLFxuICAgIGJhY2tlbmQ6ICdcdTVGOENcdTdBRUYnLFxuICAgIGRhdGFiYXNlOiAnXHU2NTc4XHU2NERBXHU1RUFCJyxcbiAgICB1cHRpbWU6ICdcdTkwNEJcdTg4NENcdTY2NDJcdTk1OTMnLFxuICAgIGNsb3NlOiAnXHU5NURDXHU5NTg5JyxcbiAgICBsYXVuY2g6ICdcdTU1NTNcdTUyRDUnLFxuICAgIGxvYWRpbmc6ICdcdTUyQTBcdThGMDlcdTRFMkRcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ1x1NTdGN1x1ODg0Q1x1NEUyRFx1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdcdTZCNjNcdTU3MjhcdTRFMEJcdThGMDlcdTgxNzNcdTY3MkNcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ1x1OTA3OFx1NjRDN1x1NEUwMFx1NTAwQlx1NkE1Rlx1NTY2OFx1NEVCQVx1NEUyNlx1OUVERVx1NjRDQVx1NTU1M1x1NTJENScsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1x1NkU5Nlx1NTA5OVx1NTU1M1x1NTJENScsXG4gICAgbG9hZEVycm9yOiAnXHU1MkEwXHU4RjA5XHU5MzJGXHU4QUE0JyxcbiAgICBsb2FkRXJyb3JNc2c6ICdcdTcxMjFcdTZDRDVcdTUyQTBcdThGMDlcdTYyNDBcdTkwNzhcdTZBNUZcdTU2NjhcdTRFQkFcdTMwMDJcdThBQ0JcdTZBQTJcdTY3RTVcdTdEQjJcdTdENjFcdTkwMjNcdTYzQTVcdTYyMTZcdTkxQ0RcdThBNjZcdTMwMDInLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFx1NkFBMlx1NjdFNVx1NEUyRC4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIFx1NTcyOFx1N0REQScsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBcdTk2RTJcdTdEREEnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIFx1NkI2M1x1NUUzOCcsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgXHU5MzJGXHU4QUE0JyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBcdTdFNkFcdTU3MTZcdTZBMjFcdTU4NEFcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2XCIsXG4gICAgaW5pdEJvdDogXCJcdTUyMURcdTU5Q0JcdTUzMTZcdTgxRUFcdTUyRDVcdTZBNUZcdTU2NjhcdTRFQkFcIixcbiAgICB1cGxvYWRJbWFnZTogXCJcdTRFMEFcdTUwQjNcdTU3MTZcdTcyNDdcIixcbiAgICByZXNpemVJbWFnZTogXCJcdThBQkZcdTY1NzRcdTU3MTZcdTcyNDdcdTU5MjdcdTVDMEZcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwNzhcdTY0QzdcdTRGNERcdTdGNkVcIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlx1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRFwiLFxuICAgIHN0b3BQYWludGluZzogXCJcdTUwNUNcdTZCNjJcdTdFNkFcdTg4RkRcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiXHU0RkREXHU1QjU4XHU5MDMyXHU1RUE2XCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIlx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBcdTZBQTJcdTY3RTVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdThBQ0JcdTU3MjhcdTdEQjJcdTdBRDlcdTRFMEFcdTYyNTNcdTk1OEJcdThBQkZcdTgyNzJcdTY3N0ZcdTVGOENcdTkxQ0RcdThBNjZcdUZGMDFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3QTJFXHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBcdTZCNjNcdTU3MjhcdTUyQTBcdThGMDlcdTU3MTZcdTcyNDcuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgXHU1NzE2XHU3MjQ3XHU1REYyXHU1MkEwXHU4RjA5XHVGRjBDXHU2NzA5XHU2NTQ4XHU1MENGXHU3RDIwIHtjb3VudH0gXHU1MDBCXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgXHU1NzE2XHU3MjQ3XHU1MkEwXHU4RjA5XHU1OTMxXHU2NTU3XCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdThBQ0JcdTU3MjhcdTRGNjBcdTYwRjNcdTk1OEJcdTU5Q0JcdTdFNkFcdTg4RkRcdTc2ODRcdTU3MzBcdTY1QjlcdTU4NTdcdTdCMkNcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdUZGMDFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NTg1N1x1NTNDM1x1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTRGNERcdTdGNkVcdThBMkRcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1NEY0RFx1N0Y2RVx1OTA3OFx1NjRDN1x1OEQ4NVx1NjY0MlwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFx1NURGMlx1NkFBMlx1NkUyQ1x1NTIzMFx1NEY0RFx1N0Y2RVx1RkYwQ1x1ODY1NVx1NzQwNlx1NEUyRC4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIFx1NEY0RFx1N0Y2RVx1NkFBMlx1NkUyQ1x1NTkzMVx1NjU1N1x1RkYwQ1x1OEFDQlx1OTFDRFx1OEE2NlwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IFx1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRC4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFx1OTAzMlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBcdTZDOTJcdTY3MDlcdTZCMjFcdTY1NzhcdTMwMDJcdTdCNDlcdTVGODUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTc1MjhcdTYyMzdcdTVERjJcdTUwNUNcdTZCNjJcdTdFNkFcdTg4RkRcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBcdTdFNkFcdTg4RkRcdTVCOENcdTYyMTBcdUZGMDFcdTUxNzFcdTdFNkFcdTg4RkQge2NvdW50fSBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTMwMDJcIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBcdTdFNkFcdTg4RkRcdTkwNEVcdTdBMEJcdTRFMkRcdTUxRkFcdTkzMkZcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTUyQTBcdThGMDlcdTU3MTZcdTcyNDdcdTRFMjZcdTkwNzhcdTY0QzdcdTRGNERcdTdGNkVcIixcbiAgICBwcm9ncmVzczogXCJcdTkwMzJcdTVFQTZcIixcbiAgICB1c2VyTmFtZTogXCJcdTc1MjhcdTYyMzdcIixcbiAgICBwaXhlbHM6IFwiXHU1MENGXHU3RDIwXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzhcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlx1OTgxMFx1OEEwOFx1NjY0Mlx1OTU5M1wiLFxuICAgIGluaXRNZXNzYWdlOiBcIlx1OUVERVx1NjRDQVx1MjAxQ1x1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQVx1MjAxRFx1OTU4Qlx1NTlDQlwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IFx1NTcxNlx1NzI0N1x1NURGMlx1OEFCRlx1NjU3NFx1NzBCQSB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFx1N0U2QVx1ODhGRFx1NjZBQlx1NTA1Q1x1NjVCQ1x1NEY0RFx1N0Y2RSBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1NkJDRlx1NjI3OVx1NTBDRlx1N0QyMFx1NjU3OFwiLFxuICAgIGJhdGNoU2l6ZTogXCJcdTYyNzlcdTZCMjFcdTU5MjdcdTVDMEZcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlx1NEUwQlx1NkIyMVx1NjI3OVx1NkIyMVx1NjY0Mlx1OTU5M1wiLFxuICAgIHVzZUFsbENoYXJnZXM6IFwiXHU0RjdGXHU3NTI4XHU2MjQwXHU2NzA5XHU1M0VGXHU3NTI4XHU2QjIxXHU2NTc4XCIsXG4gICAgc2hvd092ZXJsYXk6IFwiXHU5ODZGXHU3OTNBXHU4OTg2XHU4NENCXHU1QzY0XCIsXG4gICAgbWF4Q2hhcmdlczogXCJcdTZCQ0ZcdTYyNzlcdTY3MDBcdTU5MjdcdTZCMjFcdTY1NzhcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTc4OiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlx1NTI2OVx1OTkxOFx1NjY0Mlx1OTU5M1wiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1IHt0aW1lfSBcdTVGOENcdTdFN0NcdTdFOEMuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBcdTkwMzJcdTVFQTZcdTVERjJcdTRGRERcdTVCNThcdTcwQkEge2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBcdTVERjJcdTUyQTBcdThGMDlcdTkwMzJcdTVFQTY6IHtwYWludGVkfS97dG90YWx9IFx1NTBDRlx1N0QyMFx1NURGMlx1N0U2QVx1ODhGRFwiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBcdTUyQTBcdThGMDlcdTkwMzJcdTVFQTZcdTU5MzFcdTY1NTc6IHtlcnJvcn1cIixcbiAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgXHU0RkREXHU1QjU4XHU5MDMyXHU1RUE2XHU1OTMxXHU2NTU3OiB7ZXJyb3J9XCIsXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTU3MjhcdTUwNUNcdTZCNjJcdTRFNEJcdTUyNERcdTg5ODFcdTRGRERcdTVCNThcdTc1NzZcdTUyNERcdTkwMzJcdTVFQTZcdTU1Q0VcdUZGMUZcIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiXHU2NTNFXHU2OEM0XCIsXG4gICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgIG1pbmltaXplOiBcIlx1NjcwMFx1NUMwRlx1NTMxNlwiLFxuICAgIHdpZHRoOiBcIlx1NUJFQ1x1NUVBNlwiLFxuICAgIGhlaWdodDogXCJcdTlBRDhcdTVFQTZcIixcbiAgICBrZWVwQXNwZWN0OiBcIlx1NEZERFx1NjMwMVx1N0UzMVx1NkE2Qlx1NkJENFwiLFxuICAgIGFwcGx5OiBcIlx1NjFDOVx1NzUyOFwiLFxuICAgIG92ZXJsYXlPbjogXCJcdTg5ODZcdTg0Q0JcdTVDNjQ6IFx1OTU4Qlx1NTU1M1wiLFxuICAgIG92ZXJsYXlPZmY6IFwiXHU4OTg2XHU4NENCXHU1QzY0OiBcdTk1RENcdTk1ODlcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBcdTYyNzlcdTZCMjFcdTVCOENcdTYyMTA6IFx1NURGMlx1N0U2QVx1ODhGRCB7cGFpbnRlZH0gXHU1MENGXHU3RDIwIHwgXHU5MDMyXHU1RUE2OiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzhcdTYwNjJcdTVGQTk6IHtjdXJyZW50fS97bmVlZGVkfSAtIFx1NjY0Mlx1OTU5Mzoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3ODoge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU1MjY5XHU5OTE4OiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTZCNjNcdTU3MjhcdTgxRUFcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1NjIxMFx1NTI5RlwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTcxMjFcdTZDRDVcdTgxRUFcdTUyRDVcdTU1NTNcdTUyRDVcdUZGMENcdThBQ0JcdTYyNEJcdTUyRDVcdTY0Q0RcdTRGNUNcdTMwMDJcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1NURGMlx1NkFBMlx1NkUyQ1x1NTIzMFx1OEFCRlx1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2NDFDXHU3RDIyXHU4QUJGXHU4MjcyXHU2NzdGLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHU2QjYzXHU1NzI4XHU5RURFXHU2NENBXHU3RTZBXHU4OEZEXHU2MzA5XHU5MjE1Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU3RTZBXHU4OEZEXHU2MzA5XHU5MjE1XCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTZcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFx1OTFDRFx1OEE2NiB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfVx1RkYwQ1x1N0I0OVx1NUY4NSB7ZGVsYXl9IFx1NzlEMi4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IFx1N0IyQyB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBcdTZCMjFcdTU2MTdcdThBNjZcdTUxRkFcdTkzMkZcdUZGMENcdTVDMDdcdTU3Mjgge2RlbGF5fSBcdTc5RDJcdTVGOENcdTkxQ0RcdThBNjYuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHU4RDg1XHU5MDRFIHttYXhBdHRlbXB0c30gXHU2QjIxXHU1NjE3XHU4QTY2XHU1OTMxXHU2NTU3XHUzMDAyXHU3RTdDXHU3RThDXHU0RTBCXHU0RTAwXHU2Mjc5Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBcdTdEQjJcdTdENjFcdTkzMkZcdThBQTRcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgXHU2NzBEXHU1MkQ5XHU1NjY4XHU5MzJGXHU4QUE0XHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QTY2Li4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBcdTY3MERcdTUyRDlcdTU2NjhcdThEODVcdTY2NDJcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIlxuICB9LFxuXG4gIC8vIFx1OEZCMlx1NTgzNFx1NkEyMVx1NTg0QVx1RkYwOFx1NUY4NVx1NUJFNlx1NzNGRVx1RkYwOVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1OEZCMlx1NTgzNFx1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHN0YXJ0OiBcIlx1OTU4Qlx1NTlDQlwiLFxuICAgIHN0b3A6IFwiXHU1MDVDXHU2QjYyXCIsXG4gICAgc3RvcHBlZDogXCJcdTZBNUZcdTU2NjhcdTRFQkFcdTVERjJcdTUwNUNcdTZCNjJcIixcbiAgICBjYWxpYnJhdGU6IFwiXHU2ODIxXHU2RTk2XCIsXG4gICAgcGFpbnRPbmNlOiBcIlx1NEUwMFx1NkIyMVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlx1NkFBMlx1NjdFNVx1NzJDMFx1NjE0Qlx1NEUyRC4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiXHU5MTREXHU3RjZFXCIsXG4gICAgZGVsYXk6IFwiXHU1RUY2XHU5MDcyIChcdTZCRUJcdTc5RDIpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXCIsXG4gICAgbWluQ2hhcmdlczogXCJcdTY3MDBcdTVDMTFcdTZCMjFcdTY1NzhcIixcbiAgICBjb2xvck1vZGU6IFwiXHU5ODRGXHU4MjcyXHU2QTIxXHU1RjBGXCIsXG4gICAgcmFuZG9tOiBcIlx1OTZBOFx1NkE1RlwiLFxuICAgIGZpeGVkOiBcIlx1NTZGQVx1NUI5QVwiLFxuICAgIHJhbmdlOiBcIlx1N0JDNFx1NTcwRFwiLFxuICAgIGZpeGVkQ29sb3I6IFwiXHU1NkZBXHU1QjlBXHU5ODRGXHU4MjcyXCIsXG4gICAgYWR2YW5jZWQ6IFwiXHU5QUQ4XHU3RDFBXCIsXG4gICAgdGlsZVg6IFwiXHU3NEU2XHU3MjQ3IFhcIixcbiAgICB0aWxlWTogXCJcdTc0RTZcdTcyNDcgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiXHU4MUVBXHU1QjlBXHU3RkE5XHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiXHU0RjhCXHU1OTgyOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiXHU2MzU1XHU3MzcyXCIsXG4gICAgcGFpbnRlZDogXCJcdTVERjJcdTdFNkFcdTg4RkRcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIHJldHJpZXM6IFwiXHU5MUNEXHU4QTY2XCIsXG4gICAgdGlsZTogXCJcdTc0RTZcdTcyNDdcIixcbiAgICBjb25maWdTYXZlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTRGRERcdTVCNThcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU1MkEwXHU4RjA5XCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU5MUNEXHU3RjZFXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJcdThBQ0JcdTYyNEJcdTUyRDVcdTdFNkFcdTg4RkRcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTRFRTVcdTYzNTVcdTczNzJcdTVFQTdcdTZBMTkuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIlx1NUY4Q1x1N0FFRlx1NTcyOFx1N0REQVwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIlx1NUY4Q1x1N0FFRlx1OTZFMlx1N0REQVwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIlx1NkI2M1x1NTcyOFx1NTU1M1x1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQS4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIlx1NkI2M1x1NTcyOFx1NTA1Q1x1NkI2Mlx1NkE1Rlx1NTY2OFx1NEVCQS4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIlx1NjgyMVx1NkU5Nlx1NEUyRC4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIlx1ODFFQVx1NTJENVx1OEZCMlx1NTgzNFx1NURGMlx1NTcyOFx1OTA0Qlx1ODg0Q1x1MzAwMlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2XHU2QjYzXHU1NzI4XHU5MDRCXHU4ODRDXHVGRjBDXHU4QUNCXHU1MTQ4XHU5NURDXHU5NTg5XHU1MThEXHU1NTUzXHU1MkQ1XHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0XHUzMDAyXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU1NzMwXHU1NzE2XHU3Njg0XHU3QTdBXHU3NjdEXHU1MzQwXHU1N0RGXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXHU0RUU1XHU4QTJEXHU3RjZFXHU4RkIyXHU1ODM0XHU1MzQwXHU1N0RGXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTRGNjBcdTU4NTdcdTUzQzNcdTgwMDNcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU4QTJEXHU3RjZFXHU2MjEwXHU1MjlGXHVGRjAxXHU1MzRBXHU1RjkxOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU1MzQwXHU1N0RGXHU5MDc4XHU2NEM3XHU4RDg1XHU2NjQyXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcdUZGMDhcdTRGN0ZcdTc1MjhcdTIwMUNcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcdTIwMURcdTYzMDlcdTkyMTVcdUZGMDlcIixcbiAgICBmYXJtUmFkaXVzOiBcIlx1OEZCMlx1NTgzNFx1NTM0QVx1NUY5MVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJcdTc1NzZcdTUyNERcdTUzNDBcdTU3REZcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIFx1NkI2M1x1NTcyOFx1NEVFNVx1NTM0QVx1NUY5MSB7cmFkaXVzfXB4IFx1NTcyOCAoe3h9LHt5fSkgXHU4RkIyXHU1ODM0XCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBcdTkxQ0RcdTg5ODE6IFx1OEFDQlx1OTA3OFx1NjRDN1x1N0E3QVx1NzY3RFx1NTM0MFx1NTdERlx1NEVFNVx1OTA3Rlx1NTE0RFx1ODg1RFx1N0E4MVwiLFxuICAgIG5vUG9zaXRpb246IFwiXHU2NzJBXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgY3VycmVudFpvbmU6IFwiXHU1MzQwXHU1N0RGOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFx1OEFDQlx1NTE0OFx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1RkYwQ1x1NTcyOFx1NTczMFx1NTcxNlx1NEUwQVx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1NEVFNVx1OEEyRFx1N0Y2RVx1OEZCMlx1NTgzNFx1NTM0MFx1NTdERlwiXG4gIH0sXG5cbiAgLy8gXHU1MTZDXHU1MTcxXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJcdTY2MkZcIixcbiAgICBubzogXCJcdTU0MjZcIixcbiAgICBvazogXCJcdTc4QkFcdThBOERcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgY2xvc2U6IFwiXHU5NURDXHU5NTg5XCIsXG4gICAgc2F2ZTogXCJcdTRGRERcdTVCNThcIixcbiAgICBsb2FkOiBcIlx1NTJBMFx1OEYwOVwiLFxuICAgIGRlbGV0ZTogXCJcdTUyMkFcdTk2NjRcIixcbiAgICBlZGl0OiBcIlx1N0RFOFx1OEYyRlwiLFxuICAgIHN0YXJ0OiBcIlx1OTU4Qlx1NTlDQlwiLFxuICAgIHN0b3A6IFwiXHU1MDVDXHU2QjYyXCIsXG4gICAgcGF1c2U6IFwiXHU2NkFCXHU1MDVDXCIsXG4gICAgcmVzdW1lOiBcIlx1N0U3Q1x1N0U4Q1wiLFxuICAgIHJlc2V0OiBcIlx1OTFDRFx1N0Y2RVwiLFxuICAgIHNldHRpbmdzOiBcIlx1OEEyRFx1N0Y2RVwiLFxuICAgIGhlbHA6IFwiXHU1RTZCXHU1MkE5XCIsXG4gICAgYWJvdXQ6IFwiXHU5NURDXHU2NUJDXCIsXG4gICAgbGFuZ3VhZ2U6IFwiXHU4QTlFXHU4QTAwXCIsXG4gICAgbG9hZGluZzogXCJcdTUyQTBcdThGMDlcdTRFMkQuLi5cIixcbiAgICBlcnJvcjogXCJcdTkzMkZcdThBQTRcIixcbiAgICBzdWNjZXNzOiBcIlx1NjIxMFx1NTI5RlwiLFxuICAgIHdhcm5pbmc6IFwiXHU4QjY2XHU1NDRBXCIsXG4gICAgaW5mbzogXCJcdTRGRTFcdTYwNkZcIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiXHU4QTlFXHU4QTAwXHU1REYyXHU1MjA3XHU2M0RCXHU3MEJBIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIFx1NUI4OFx1OEI3N1x1NkEyMVx1NTg0QVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyRDVcdTVCODhcdThCNzdcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHNlbGVjdEFyZWE6IFwiXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiXHU2MzU1XHU3MzcyXHU1MzQwXHU1N0RGXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIlx1OTU4Qlx1NTlDQlx1NUI4OFx1OEI3N1wiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIlx1NTA1Q1x1NkI2Mlx1NUI4OFx1OEI3N1wiLFxuICAgIHVwcGVyTGVmdDogXCJcdTVERTZcdTRFMEFcdTg5RDJcIixcbiAgICBsb3dlclJpZ2h0OiBcIlx1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJcdTUzRDdcdTRGRERcdThCNzdcdTUwQ0ZcdTdEMjBcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiXHU2QUEyXHU2RTJDXHU1MjMwXHU3Njg0XHU4QjhBXHU1MzE2XCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiXHU0RkVFXHU1RkE5XHU3Njg0XHU1MENGXHU3RDIwXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzhcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTdCNDlcdTVGODVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggXHU2QUEyXHU2N0U1XHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU5ODRGXHU4MjcyXHVGRjBDXHU4QUNCXHU1NzI4XHU3REIyXHU3QUQ5XHU0RTBBXHU2MjUzXHU5NThCXHU4QUJGXHU4MjcyXHU2NzdGXHUzMDAyXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1NjI3RVx1NTIzMCB7Y291bnR9IFx1N0EyRVx1NTNFRlx1NzUyOFx1OTg0Rlx1ODI3MlwiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTVCODhcdThCNzdcdTZBNUZcdTU2NjhcdTRFQkFcdTUyMURcdTU5Q0JcdTUzMTZcdTYyMTBcdTUyOUZcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIFx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NTkzMVx1NjU1N1wiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIFx1NUVBN1x1NkExOVx1NzEyMVx1NjU0OFwiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBcdTUzNDBcdTU3REZcdTcxMjFcdTY1NDhcdUZGMENcdTVERTZcdTRFMEFcdTg5RDJcdTVGQzVcdTk4MDhcdTVDMEZcdTY1QkNcdTUzRjNcdTRFMEJcdTg5RDJcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFx1NTM0MFx1NTdERlx1OTA0RVx1NTkyNzoge3NpemV9IFx1NTBDRlx1N0QyMCAoXHU2NzAwXHU1OTI3OiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBcdTYzNTVcdTczNzJcdTVCODhcdThCNzdcdTUzNDBcdTU3REZcdTRFMkQuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1NTM0MFx1NTdERlx1NjM1NVx1NzM3Mlx1NjIxMFx1NTI5Rjoge2NvdW50fSBcdTUwQ0ZcdTdEMjBcdTUzRDdcdTRGRERcdThCNzdcIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIFx1NjM1NVx1NzM3Mlx1NTM0MFx1NTdERlx1NTFGQVx1OTMyRjoge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgXHU4QUNCXHU1MTQ4XHU2MzU1XHU3MzcyXHU0RTAwXHU1MDBCXHU1Qjg4XHU4Qjc3XHU1MzQwXHU1N0RGXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NUI4OFx1OEI3N1x1NURGMlx1NTU1M1x1NTJENSAtIFx1NTM0MFx1NTdERlx1NzZFM1x1NjNBN1x1NEUyRFwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTVCODhcdThCNzdcdTVERjJcdTUwNUNcdTZCNjJcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFx1NTM0MFx1NTdERlx1NUI4OVx1NTE2OCAtIFx1NjcyQVx1NkFBMlx1NkUyQ1x1NTIzMFx1OEI4QVx1NTMxNlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTggXHU2QUEyXHU2RTJDXHU1MjMwIHtjb3VudH0gXHU1MDBCXHU4QjhBXHU1MzE2XCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBcdTZCNjNcdTU3MjhcdTRGRUVcdTVGQTkge2NvdW50fSBcdTUwMEJcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NURGMlx1NjIxMFx1NTI5Rlx1NEZFRVx1NUZBOSB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBcdTRGRUVcdTVGQTlcdTUxRkFcdTkzMkY6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFx1NkIyMVx1NjU3OFx1NEUwRFx1OERCM1x1RkYwQ1x1NzEyMVx1NkNENVx1NEZFRVx1NUZBOVwiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2QUEyXHU2N0U1XHU1MzQwXHU1N0RGXHU4QjhBXHU1MzE2Li4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgXHU2QUEyXHU2N0U1XHU1MUZBXHU5MzJGOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NUI4OFx1OEI3N1x1NEUyRCAtIFx1NTM0MFx1NTdERlx1NTNEN1x1NEZERFx1OEI3N1wiLFxuICAgIGxhc3RDaGVjazogXCJcdTRFMEFcdTZCMjFcdTZBQTJcdTY3RTU6IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJcdTRFMEJcdTZCMjFcdTZBQTJcdTY3RTU6IHt0aW1lfSBcdTc5RDJcdTVGOENcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTZCNjNcdTU3MjhcdTgxRUFcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1NjIxMFx1NTI5RlwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTcxMjFcdTZDRDVcdTgxRUFcdTUyRDVcdTU1NTNcdTUyRDVcdUZGMENcdThBQ0JcdTYyNEJcdTUyRDVcdTY0Q0RcdTRGNUNcdTMwMDJcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThBQkZcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTlFREVcdTY0Q0FcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTVcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFx1NTcyOFx1OTcwMFx1ODk4MVx1NEZERFx1OEI3N1x1NTM0MFx1NTdERlx1NzY4NFx1NURFNlx1NEUwQVx1ODlEMlx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIFx1NzNGRVx1NTcyOFx1NTcyOFx1NTNGM1x1NEUwQlx1ODlEMlx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTA3OFx1NjRDN1x1NURFNlx1NEUwQVx1ODlEMi4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTkwNzhcdTY0QzdcdTUzRjNcdTRFMEJcdTg5RDIuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgXHU1REYyXHU2MzU1XHU3MzcyXHU1REU2XHU0RTBBXHU4OUQyOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTczNzJcdTUzRjNcdTRFMEJcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTkwNzhcdTY0QzdcdThEODVcdTY2NDJcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgXHU5MDc4XHU2NEM3XHU1MUZBXHU5MzJGXHVGRjBDXHU4QUNCXHU5MUNEXHU4QTY2XCJcbiAgfVxufTsiLCAiaW1wb3J0IHsgZXMgfSBmcm9tICcuL2VzLmpzJztcbmltcG9ydCB7IGVuIH0gZnJvbSAnLi9lbi5qcyc7XG5pbXBvcnQgeyBmciB9IGZyb20gJy4vZnIuanMnO1xuaW1wb3J0IHsgcnUgfSBmcm9tICcuL3J1LmpzJztcbmltcG9ydCB7IHpoSGFucyB9IGZyb20gJy4vemgtSGFucy5qcyc7XG5pbXBvcnQgeyB6aEhhbnQgfSBmcm9tICcuL3poLUhhbnQuanMnO1xuXG4vLyBJZGlvbWFzIGRpc3BvbmlibGVzXG5leHBvcnQgY29uc3QgQVZBSUxBQkxFX0xBTkdVQUdFUyA9IHtcbiAgZXM6IHsgbmFtZTogJ0VzcGFcdTAwRjFvbCcsIGZsYWc6ICdcdUQ4M0NcdURERUFcdUQ4M0NcdURERjgnLCBjb2RlOiAnZXMnIH0sXG4gIGVuOiB7IG5hbWU6ICdFbmdsaXNoJywgZmxhZzogJ1x1RDgzQ1x1RERGQVx1RDgzQ1x1RERGOCcsIGNvZGU6ICdlbicgfSxcbiAgZnI6IHsgbmFtZTogJ0ZyYW5cdTAwRTdhaXMnLCBmbGFnOiAnXHVEODNDXHVEREVCXHVEODNDXHVEREY3JywgY29kZTogJ2ZyJyB9LFxuICBydTogeyBuYW1lOiAnXHUwNDIwXHUwNDQzXHUwNDQxXHUwNDQxXHUwNDNBXHUwNDM4XHUwNDM5JywgZmxhZzogJ1x1RDgzQ1x1RERGN1x1RDgzQ1x1RERGQScsIGNvZGU6ICdydScgfSxcbiAgemhIYW5zOiB7IG5hbWU6ICdcdTdCODBcdTRGNTNcdTRFMkRcdTY1ODcnLCBmbGFnOiAnXHVEODNDXHVEREU4XHVEODNDXHVEREYzJywgY29kZTogJ3poLUhhbnMnIH0sXG4gIHpoSGFudDogeyBuYW1lOiAnXHU3RTQxXHU5QUQ0XHU0RTJEXHU2NTg3JywgZmxhZzogJ1x1RDgzQ1x1RERFOFx1RDgzQ1x1RERGMycsIGNvZGU6ICd6aC1IYW50JyB9XG59O1xuXG4vLyBUb2RhcyBsYXMgdHJhZHVjY2lvbmVzXG5jb25zdCB0cmFuc2xhdGlvbnMgPSB7XG4gIGVzLFxuICBlbixcbiAgZnIsXG4gIHJ1LFxuICB6aEhhbnMsXG4gIHpoSGFudFxufTtcblxuLy8gRXN0YWRvIGRlbCBpZGlvbWEgYWN0dWFsXG5sZXQgY3VycmVudExhbmd1YWdlID0gJ2VzJztcbmxldCBjdXJyZW50VHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zW2N1cnJlbnRMYW5ndWFnZV07XG5cbi8qKlxuICogRGV0ZWN0YSBlbCBpZGlvbWEgZGVsIG5hdmVnYWRvclxuICogQHJldHVybnMge3N0cmluZ30gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYSBkZXRlY3RhZG9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEJyb3dzZXJMYW5ndWFnZSgpIHtcbiAgY29uc3QgYnJvd3NlckxhbmcgPSB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckxhbmd1YWdlIHx8ICdlcyc7XG5cbiAgLy8gRXh0cmFlciBzb2xvIGVsIGNcdTAwRjNkaWdvIGRlbCBpZGlvbWEgKGVqOiAnZXMtRVMnIC0+ICdlcycpXG4gIGNvbnN0IGxhbmdDb2RlID0gYnJvd3Nlckxhbmcuc3BsaXQoJy0nKVswXS50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIFZlcmlmaWNhciBzaSB0ZW5lbW9zIHNvcG9ydGUgcGFyYSBlc3RlIGlkaW9tYVxuICBpZiAodHJhbnNsYXRpb25zW2xhbmdDb2RlXSkge1xuICAgIHJldHVybiBsYW5nQ29kZTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIGEgZXNwYVx1MDBGMW9sIHBvciBkZWZlY3RvXG4gIHJldHVybiAnZXMnO1xufVxuXG4vKipcbiAqIE9idGllbmUgZWwgaWRpb21hIGd1YXJkYWRvIChkZXNoYWJpbGl0YWRvIC0gbm8gdXNhciBsb2NhbFN0b3JhZ2UpXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTaWVtcHJlIHJldG9ybmEgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2F2ZWRMYW5ndWFnZSgpIHtcbiAgLy8gTm8gdXNhciBsb2NhbFN0b3JhZ2UgLSBzaWVtcHJlIHJldG9ybmFyIG51bGxcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogR3VhcmRhIGVsIGlkaW9tYSAoZGVzaGFiaWxpdGFkbyAtIG5vIHVzYXIgbG9jYWxTdG9yYWdlKVxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUxhbmd1YWdlKGxhbmdDb2RlKSB7XG4gIC8vIE5vIGd1YXJkYXIgZW4gbG9jYWxTdG9yYWdlIC0gZnVuY2lcdTAwRjNuIGRlc2hhYmlsaXRhZGFcbiAgcmV0dXJuO1xufVxuXG4vKipcbiAqIEluaWNpYWxpemEgZWwgc2lzdGVtYSBkZSBpZGlvbWFzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGluaWNpYWxpemFkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUxhbmd1YWdlKCkge1xuICAvLyBQcmlvcmlkYWQ6IGd1YXJkYWRvID4gbmF2ZWdhZG9yID4gZXNwYVx1MDBGMW9sXG4gIGNvbnN0IHNhdmVkTGFuZyA9IGdldFNhdmVkTGFuZ3VhZ2UoKTtcbiAgY29uc3QgYnJvd3NlckxhbmcgPSBkZXRlY3RCcm93c2VyTGFuZ3VhZ2UoKTtcblxuICBsZXQgc2VsZWN0ZWRMYW5nID0gJ2VzJzsgLy8gZmFsbGJhY2sgcG9yIGRlZmVjdG9cblxuICBpZiAoc2F2ZWRMYW5nICYmIHRyYW5zbGF0aW9uc1tzYXZlZExhbmddKSB7XG4gICAgc2VsZWN0ZWRMYW5nID0gc2F2ZWRMYW5nO1xuICB9IGVsc2UgaWYgKGJyb3dzZXJMYW5nICYmIHRyYW5zbGF0aW9uc1ticm93c2VyTGFuZ10pIHtcbiAgICBzZWxlY3RlZExhbmcgPSBicm93c2VyTGFuZztcbiAgfVxuXG4gIHNldExhbmd1YWdlKHNlbGVjdGVkTGFuZyk7XG4gIHJldHVybiBzZWxlY3RlZExhbmc7XG59XG5cbi8qKlxuICogQ2FtYmlhIGVsIGlkaW9tYSBhY3R1YWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nQ29kZSAtIENcdTAwRjNkaWdvIGRlbCBpZGlvbWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldExhbmd1YWdlKGxhbmdDb2RlKSB7XG4gIGlmICghdHJhbnNsYXRpb25zW2xhbmdDb2RlXSkge1xuICAgIGNvbnNvbGUud2FybihgSWRpb21hICcke2xhbmdDb2RlfScgbm8gZGlzcG9uaWJsZS4gVXNhbmRvICcke2N1cnJlbnRMYW5ndWFnZX0nYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3VycmVudExhbmd1YWdlID0gbGFuZ0NvZGU7XG4gIGN1cnJlbnRUcmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdO1xuICBzYXZlTGFuZ3VhZ2UobGFuZ0NvZGUpO1xuXG4gIC8vIEVtaXRpciBldmVudG8gcGVyc29uYWxpemFkbyBwYXJhIHF1ZSBsb3MgbVx1MDBGM2R1bG9zIHB1ZWRhbiByZWFjY2lvbmFyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuQ3VzdG9tRXZlbnQpIHtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93LkN1c3RvbUV2ZW50KCdsYW5ndWFnZUNoYW5nZWQnLCB7XG4gICAgICBkZXRhaWw6IHsgbGFuZ3VhZ2U6IGxhbmdDb2RlLCB0cmFuc2xhdGlvbnM6IGN1cnJlbnRUcmFuc2xhdGlvbnMgfVxuICAgIH0pKTtcbiAgfVxufVxuXG4vKipcbiAqIE9idGllbmUgZWwgaWRpb21hIGFjdHVhbFxuICogQHJldHVybnMge3N0cmluZ30gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYSBhY3R1YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRMYW5ndWFnZSgpIHtcbiAgcmV0dXJuIGN1cnJlbnRMYW5ndWFnZTtcbn1cblxuLyoqXG4gKiBPYnRpZW5lIGxhcyB0cmFkdWNjaW9uZXMgYWN0dWFsZXNcbiAqIEByZXR1cm5zIHtvYmplY3R9IE9iamV0byBjb24gdG9kYXMgbGFzIHRyYWR1Y2Npb25lcyBkZWwgaWRpb21hIGFjdHVhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFRyYW5zbGF0aW9ucygpIHtcbiAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGlvbnM7XG59XG5cbi8qKlxuICogT2J0aWVuZSB1biB0ZXh0byB0cmFkdWNpZG8gdXNhbmRvIG5vdGFjaVx1MDBGM24gZGUgcHVudG9cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBDbGF2ZSBkZWwgdGV4dG8gKGVqOiAnaW1hZ2UudGl0bGUnLCAnY29tbW9uLmNhbmNlbCcpXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zIC0gUGFyXHUwMEUxbWV0cm9zIHBhcmEgaW50ZXJwb2xhY2lcdTAwRjNuIChlajoge2NvdW50OiA1fSlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRleHRvIHRyYWR1Y2lkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gdChrZXksIHBhcmFtcyA9IHt9KSB7XG4gIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoJy4nKTtcbiAgbGV0IHZhbHVlID0gY3VycmVudFRyYW5zbGF0aW9ucztcblxuICAvLyBOYXZlZ2FyIHBvciBsYSBlc3RydWN0dXJhIGRlIG9iamV0b3NcbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBrIGluIHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlW2tdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oYENsYXZlIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlbmNvbnRyYWRhOiAnJHtrZXl9J2ApO1xuICAgICAgcmV0dXJuIGtleTsgLy8gUmV0b3JuYXIgbGEgY2xhdmUgY29tbyBmYWxsYmFja1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgY29uc29sZS53YXJuKGBDbGF2ZSBkZSB0cmFkdWNjaVx1MDBGM24gbm8gZXMgc3RyaW5nOiAnJHtrZXl9J2ApO1xuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGFyIHBhclx1MDBFMW1ldHJvc1xuICByZXR1cm4gaW50ZXJwb2xhdGUodmFsdWUsIHBhcmFtcyk7XG59XG5cbi8qKlxuICogSW50ZXJwb2xhIHBhclx1MDBFMW1ldHJvcyBlbiB1biBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gVGV4dG8gY29uIG1hcmNhZG9yZXMge2tleX1cbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBQYXJcdTAwRTFtZXRyb3MgYSBpbnRlcnBvbGFyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZXh0byBjb24gcGFyXHUwMEUxbWV0cm9zIGludGVycG9sYWRvc1xuICovXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZSh0ZXh0LCBwYXJhbXMpIHtcbiAgaWYgKCFwYXJhbXMgfHwgT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAobWF0Y2gsIGtleSkgPT4ge1xuICAgIHJldHVybiBwYXJhbXNba2V5XSAhPT0gdW5kZWZpbmVkID8gcGFyYW1zW2tleV0gOiBtYXRjaDtcbiAgfSk7XG59XG5cbi8qKlxuICogT2J0aWVuZSB0cmFkdWNjaW9uZXMgZGUgdW5hIHNlY2NpXHUwMEYzbiBlc3BlY1x1MDBFRGZpY2FcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uIC0gU2VjY2lcdTAwRjNuIChlajogJ2ltYWdlJywgJ2xhdW5jaGVyJywgJ2NvbW1vbicpXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBPYmpldG8gY29uIGxhcyB0cmFkdWNjaW9uZXMgZGUgbGEgc2VjY2lcdTAwRjNuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWN0aW9uKHNlY3Rpb24pIHtcbiAgaWYgKGN1cnJlbnRUcmFuc2xhdGlvbnNbc2VjdGlvbl0pIHtcbiAgICByZXR1cm4gY3VycmVudFRyYW5zbGF0aW9uc1tzZWN0aW9uXTtcbiAgfVxuXG4gIGNvbnNvbGUud2FybihgU2VjY2lcdTAwRjNuIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlbmNvbnRyYWRhOiAnJHtzZWN0aW9ufSdgKTtcbiAgcmV0dXJuIHt9O1xufVxuXG4vKipcbiAqIFZlcmlmaWNhIHNpIHVuIGlkaW9tYSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgc2kgZXN0XHUwMEUxIGRpc3BvbmlibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTGFuZ3VhZ2VBdmFpbGFibGUobGFuZ0NvZGUpIHtcbiAgcmV0dXJuICEhdHJhbnNsYXRpb25zW2xhbmdDb2RlXTtcbn1cblxuLy8gSW5pY2lhbGl6YXIgYXV0b21cdTAwRTF0aWNhbWVudGUgYWwgY2FyZ2FyIGVsIG1cdTAwRjNkdWxvXG5pbml0aWFsaXplTGFuZ3VhZ2UoKTtcbiIsICJpbXBvcnQgeyBnZXRTZWN0aW9uIH0gZnJvbSAnLi4vbG9jYWxlcy9pbmRleC5qcyc7XG5cbmV4cG9ydCBjb25zdCBMQVVOQ0hFUl9DT05GSUcgPSB7XG4gIFJBV19CQVNFOiAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0FsYXJpc2NvL1dQbGFjZS1BdXRvQk9UL3JlZnMvaGVhZHMvbWFpbicsXG4gIFJFRlJFU0hfSU5URVJWQUw6IDYwMDAwLCAvLyAxIG1pbnV0b1xuICBUSEVNRToge1xuICAgIHByaW1hcnk6ICcjMDAwMDAwJyxcbiAgICBzZWNvbmRhcnk6ICcjMTExMTExJyxcbiAgICBhY2NlbnQ6ICcjMjIyMjIyJyxcbiAgICB0ZXh0OiAnI2ZmZmZmZicsXG4gICAgaGlnaGxpZ2h0OiAnIzc3NWNlMycsXG4gICAgc3VjY2VzczogJyMwMGZmMDAnLFxuICAgIGVycm9yOiAnI2ZmMDAwMCdcbiAgfVxufTtcblxuLy8gRXN0YSBmdW5jaVx1MDBGM24gYWhvcmEgcmV0b3JuYSBsYXMgdHJhZHVjY2lvbmVzIGRpblx1MDBFMW1pY2FtZW50ZVxuZXhwb3J0IGZ1bmN0aW9uIGdldExhdW5jaGVyVGV4dHMoKSB7XG4gIHJldHVybiBnZXRTZWN0aW9uKCdsYXVuY2hlcicpO1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSBvYnRlbmVyIHRleHRvcyBjb24gcGFyXHUwMEUxbWV0cm9zXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF1bmNoZXJUZXh0KGtleSwgcGFyYW1zID0ge30pIHtcbiAgY29uc3QgdGV4dHMgPSBnZXRMYXVuY2hlclRleHRzKCk7XG4gIGxldCB0ZXh0ID0gdGV4dHNba2V5XSB8fCBrZXk7XG4gIFxuICAvLyBJbnRlcnBvbGFyIHBhclx1MDBFMW1ldHJvc1xuICBpZiAocGFyYW1zICYmIE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID4gMCkge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAobWF0Y2gsIHBhcmFtS2V5KSA9PiB7XG4gICAgICByZXR1cm4gcGFyYW1zW3BhcmFtS2V5XSAhPT0gdW5kZWZpbmVkID8gcGFyYW1zW3BhcmFtS2V5XSA6IG1hdGNoO1xuICAgIH0pO1xuICB9XG4gIFxuICByZXR1cm4gdGV4dDtcbn1cblxuLy8gTWFudGVuZXIgTEFVTkNIRVJfVEVYVFMgcG9yIGNvbXBhdGliaWxpZGFkIHBlcm8gbWFyY2FybG8gY29tbyBkZXByZWNhdGVkXG5leHBvcnQgY29uc3QgTEFVTkNIRVJfVEVYVFMgPSB7XG4gIGdldCBlcygpIHtcbiAgICBjb25zb2xlLndhcm4oJ0xBVU5DSEVSX1RFWFRTLmVzIGVzdFx1MDBFMSBkZXByZWNhdGVkLiBVc2EgZ2V0TGF1bmNoZXJUZXh0cygpIGVuIHN1IGx1Z2FyLicpO1xuICAgIHJldHVybiBnZXRMYXVuY2hlclRleHRzKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBsYXVuY2hlclN0YXRlID0ge1xuICBtZTogbnVsbCxcbiAgaGVhbHRoOiBudWxsLFxuICByZWZyZXNoVGltZXI6IG51bGwsXG4gIHNlbGVjdGVkQm90OiBudWxsXG59O1xuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlU2hhZG93Um9vdCwgbWFrZURyYWdnYWJsZSB9IGZyb20gXCIuLi9jb3JlL3VpLXV0aWxzLmpzXCI7XG5pbXBvcnQgeyBsYXVuY2hlclN0YXRlLCBMQVVOQ0hFUl9DT05GSUcsIGdldExhdW5jaGVyVGV4dHMgfSBmcm9tIFwiLi9jb25maWcuanNcIjtcbmltcG9ydCB7IGdldEN1cnJlbnRMYW5ndWFnZSwgdCB9IGZyb20gXCIuLi9sb2NhbGVzL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYXVuY2hlclVJKHsgXG4gIG9uU2VsZWN0Qm90LCBcbiAgb25MYXVuY2gsIFxuICBvbkNsb3NlLFxuICB1cGRhdGVVc2VySW5mbyxcbiAgdXBkYXRlSGVhbHRoSW5mbyBcbn0pIHtcbiAgbG9nKCdcdUQ4M0NcdURGOUJcdUZFMEYgQ3JlYW5kbyBpbnRlcmZheiBkZWwgTGF1bmNoZXInKTtcbiAgXG4gIC8vIFZlcmlmaWNhciBzaSB5YSBleGlzdGUgdW4gcGFuZWwgcGFyYSBldml0YXIgZHVwbGljYWRvc1xuICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cGwtcGFuZWwnKTtcbiAgaWYgKGV4aXN0aW5nKSB7XG4gICAgZXhpc3RpbmcucmVtb3ZlKCk7XG4gICAgbG9nKCdcdUQ4M0RcdURERDFcdUZFMEYgUGFuZWwgZXhpc3RlbnRlIHJlbW92aWRvJyk7XG4gIH1cbiAgXG4gIGNvbnN0IHRleHRzID0gZ2V0TGF1bmNoZXJUZXh0cygpO1xuICBjb25zdCB7IGhvc3QsIHJvb3QgfSA9IGNyZWF0ZVNoYWRvd1Jvb3QoJ3dwbC1wYW5lbCcpO1xuICBcbiAgLy8gQ3JlYXIgZXN0aWxvc1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnRleHRDb250ZW50ID0gYFxuICAgIEBrZXlmcmFtZXMgc2xpZGVJbiB7XG4gICAgICBmcm9tIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyBvcGFjaXR5OiAwOyB9XG4gICAgICB0byB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgb3BhY2l0eTogMTsgfVxuICAgIH1cbiAgICBcbiAgICAucGFuZWwge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgdG9wOiAyMHB4O1xuICAgICAgcmlnaHQ6IDIwcHg7XG4gICAgICB3aWR0aDogMzAwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAke0xBVU5DSEVSX0NPTkZJRy5USEVNRS5wcmltYXJ5fTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7TEFVTkNIRVJfQ09ORklHLlRIRU1FLmFjY2VudH07XG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgY29sb3I6ICR7TEFVTkNIRVJfQ09ORklHLlRIRU1FLnRleHR9O1xuICAgICAgZm9udC1mYW1pbHk6IHN5c3RlbS11aSwgJ1NlZ29lIFVJJywgUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsO1xuICAgICAgei1pbmRleDogOTk5OTk5O1xuICAgICAgYm94LXNoYWRvdzogMCA4cHggMjRweCByZ2JhKDAsMCwwLDAuNSk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgYW5pbWF0aW9uOiBzbGlkZUluIDAuM3MgZWFzZS1vdXQ7XG4gICAgfVxuICAgIFxuICAgIC5oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kOiAke0xBVU5DSEVSX0NPTkZJRy5USEVNRS5zZWNvbmRhcnl9O1xuICAgICAgcGFkZGluZzogMTBweCAxMnB4O1xuICAgICAgY29sb3I6ICR7TEFVTkNIRVJfQ09ORklHLlRIRU1FLmhpZ2hsaWdodH07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY3Vyc29yOiBtb3ZlO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC5ib2R5IHtcbiAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgfVxuICAgIFxuICAgIC5yb3cge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgbWFyZ2luOiA4cHggMDtcbiAgICB9XG4gICAgXG4gICAgLmJ0biB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgcGFkZGluZzogOXB4O1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgICBcbiAgICAuYnRuOmRpc2FibGVkIHtcbiAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgfVxuICAgIFxuICAgIC5idG4ucHJpbWFyeSB7XG4gICAgICBiYWNrZ3JvdW5kOiAke0xBVU5DSEVSX0NPTkZJRy5USEVNRS5hY2NlbnR9O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgICBcbiAgICAuYnRuLnByaW1hcnk6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgICAgYmFja2dyb3VuZDogJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUuaGlnaGxpZ2h0fTtcbiAgICB9XG4gICAgXG4gICAgLmJ0bi5naG9zdCB7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7TEFVTkNIRVJfQ09ORklHLlRIRU1FLmFjY2VudH07XG4gICAgICBjb2xvcjogJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUudGV4dH07XG4gICAgfVxuICAgIFxuICAgIC5idG4uZ2hvc3Q6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgICAgYmFja2dyb3VuZDogJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUuYWNjZW50fTIyO1xuICAgIH1cbiAgICBcbiAgICAuYnRuLmNsb3NlIHtcbiAgICAgIGZsZXg6IDAgMCBhdXRvO1xuICAgICAgcGFkZGluZzogNnB4IDhweDtcbiAgICB9XG4gICAgXG4gICAgLmNhcmQge1xuICAgICAgYmFja2dyb3VuZDogJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUuc2Vjb25kYXJ5fTtcbiAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIH1cbiAgICBcbiAgICAuc3RhdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgbWFyZ2luOiA0cHggMDtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIG9wYWNpdHk6IDAuOTU7XG4gICAgfVxuICAgIFxuICAgIC5zdGF0dXMge1xuICAgICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wOCk7XG4gICAgfVxuICAgIFxuICAgIC5zZWxlY3RlZCB7XG4gICAgICBvdXRsaW5lOiAycHggc29saWQgJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUuaGlnaGxpZ2h0fTtcbiAgICB9XG4gIGA7XG4gIHJvb3QuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICBcbiAgLy8gQ3JlYXIgcGFuZWwgcHJpbmNpcGFsXG4gIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBhbmVsLmNsYXNzTmFtZSA9ICdwYW5lbCc7XG4gIHBhbmVsLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICA8ZGl2PiR7dGV4dHMudGl0bGV9PC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGdob3N0IGNsb3NlIGNsb3NlLWJ0blwiPlx1MjcxNTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJib2R5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gcHJpbWFyeSBmYXJtLWJ0blwiPiR7dGV4dHMuYXV0b0Zhcm19PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gZ2hvc3QgaW1hZ2UtYnRuXCI+JHt0ZXh0cy5hdXRvSW1hZ2V9PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBnaG9zdCBndWFyZC1idG5cIj4ke3RleHRzLmF1dG9HdWFyZH08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cbiAgICAgICAgICA8c3Bhbj4ke3RleHRzLnNlbGVjdGlvbn08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaG9pY2VcIj5cdTIwMTQ8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZCB1c2VyLWNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cbiAgICAgICAgICA8c3Bhbj4ke3RleHRzLnVzZXJ9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidXNlci1uYW1lXCI+LTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XG4gICAgICAgICAgPHNwYW4+JHt0ZXh0cy5jaGFyZ2VzfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVzZXItY2hhcmdlc1wiPi08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBoZWFsdGgtY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxuICAgICAgICAgIDxzcGFuPiR7dGV4dHMuYmFja2VuZH08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWNrZW5kLXN0YXR1c1wiPiR7dGV4dHMuY2hlY2tpbmd9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cbiAgICAgICAgICA8c3Bhbj4ke3RleHRzLmRhdGFiYXNlfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFiYXNlLXN0YXR1c1wiPi08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxuICAgICAgICAgIDxzcGFuPiR7dGV4dHMudXB0aW1lfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVwdGltZVwiPi08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic3RhdHVzIHN0YXR1cy10ZXh0XCI+JHt0ZXh0cy5jaG9vc2VCb3R9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAxMnB4O1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHByaW1hcnkgbGF1bmNoLWJ0blwiIGRpc2FibGVkPiR7dGV4dHMubGF1bmNofTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGdob3N0IGNhbmNlbC1idG5cIj4ke3RleHRzLmNsb3NlfTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG4gIFxuICByb290LmFwcGVuZENoaWxkKHBhbmVsKTtcbiAgXG4gIC8vIFJlZmVyZW5jaWFzIGEgZWxlbWVudG9zXG4gIGNvbnN0IGVsZW1lbnRzID0ge1xuICAgIGhlYWRlcjogcGFuZWwucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLFxuICAgIGZhcm1CdG46IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5mYXJtLWJ0bicpLFxuICAgIGltYWdlQnRuOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UtYnRuJyksXG4gICAgZ3VhcmRCdG46IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5ndWFyZC1idG4nKSxcbiAgICBsYXVuY2hCdG46IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5sYXVuY2gtYnRuJyksXG4gICAgY2FuY2VsQnRuOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWJ0bicpLFxuICAgIGNsb3NlQnRuOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYnRuJyksXG4gICAgc3RhdHVzVGV4dDogcGFuZWwucXVlcnlTZWxlY3RvcignLnN0YXR1cy10ZXh0JyksXG4gICAgY2hvaWNlOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuY2hvaWNlJyksXG4gICAgdXNlck5hbWU6IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy51c2VyLW5hbWUnKSxcbiAgICB1c2VyQ2hhcmdlczogcGFuZWwucXVlcnlTZWxlY3RvcignLnVzZXItY2hhcmdlcycpLFxuICAgIGJhY2tlbmRTdGF0dXM6IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZW5kLXN0YXR1cycpLFxuICAgIGRhdGFiYXNlU3RhdHVzOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuZGF0YWJhc2Utc3RhdHVzJyksXG4gICAgdXB0aW1lOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcudXB0aW1lJylcbiAgfTtcbiAgXG4gIC8vIEhhY2VyIGRyYWdnYWJsZVxuICBtYWtlRHJhZ2dhYmxlKGVsZW1lbnRzLmhlYWRlciwgcGFuZWwpO1xuICBcbiAgLy8gRXN0YWRvIGludGVybm9cbiAgbGV0IHNlbGVjdGVkQm90ID0gbnVsbDtcbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIHNlbGVjY2lvbmFyIGJvdFxuICBmdW5jdGlvbiBzZWxlY3RCb3QoYm90VHlwZSkge1xuICAgIHNlbGVjdGVkQm90ID0gYm90VHlwZTtcbiAgICBsYXVuY2hlclN0YXRlLnNlbGVjdGVkQm90ID0gYm90VHlwZTtcbiAgICBcbiAgICBlbGVtZW50cy5jaG9pY2UudGV4dENvbnRlbnQgPSBib3RUeXBlID09PSAnZmFybScgPyB0KCdsYXVuY2hlci5hdXRvRmFybScpIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90VHlwZSA9PT0gJ2ltYWdlJyA/IHQoJ2xhdW5jaGVyLmF1dG9JbWFnZScpIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCgnbGF1bmNoZXIuYXV0b0d1YXJkJyk7XG4gICAgZWxlbWVudHMubGF1bmNoQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlc3RpbG9zIGRlIGJvdG9uZXNcbiAgICBlbGVtZW50cy5mYXJtQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3ByaW1hcnknKTtcbiAgICBlbGVtZW50cy5mYXJtQnRuLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7XG4gICAgZWxlbWVudHMuaW1hZ2VCdG4uY2xhc3NMaXN0LnJlbW92ZSgncHJpbWFyeScpO1xuICAgIGVsZW1lbnRzLmltYWdlQnRuLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7XG4gICAgZWxlbWVudHMuZ3VhcmRCdG4uY2xhc3NMaXN0LnJlbW92ZSgncHJpbWFyeScpO1xuICAgIGVsZW1lbnRzLmd1YXJkQnRuLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7XG4gICAgXG4gICAgaWYgKGJvdFR5cGUgPT09ICdmYXJtJykge1xuICAgICAgZWxlbWVudHMuZmFybUJ0bi5jbGFzc0xpc3QuYWRkKCdwcmltYXJ5Jyk7XG4gICAgICBlbGVtZW50cy5mYXJtQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2dob3N0Jyk7XG4gICAgfSBlbHNlIGlmIChib3RUeXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICBlbGVtZW50cy5pbWFnZUJ0bi5jbGFzc0xpc3QuYWRkKCdwcmltYXJ5Jyk7XG4gICAgICBlbGVtZW50cy5pbWFnZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdnaG9zdCcpO1xuICAgIH0gZWxzZSBpZiAoYm90VHlwZSA9PT0gJ2d1YXJkJykge1xuICAgICAgZWxlbWVudHMuZ3VhcmRCdG4uY2xhc3NMaXN0LmFkZCgncHJpbWFyeScpO1xuICAgICAgZWxlbWVudHMuZ3VhcmRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnZ2hvc3QnKTtcbiAgICB9XG4gICAgXG4gICAgZWxlbWVudHMuc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IHQoJ2xhdW5jaGVyLnJlYWR5VG9MYXVuY2gnKTtcbiAgICBcbiAgICBpZiAob25TZWxlY3RCb3QpIHtcbiAgICAgIG9uU2VsZWN0Qm90KGJvdFR5cGUpO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gIGVsZW1lbnRzLmZhcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzZWxlY3RCb3QoJ2Zhcm0nKSk7XG4gIGVsZW1lbnRzLmltYWdlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2VsZWN0Qm90KCdpbWFnZScpKTtcbiAgZWxlbWVudHMuZ3VhcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzZWxlY3RCb3QoJ2d1YXJkJykpO1xuICBcbiAgZWxlbWVudHMubGF1bmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRCb3QpIHJldHVybjtcbiAgICBcbiAgICBlbGVtZW50cy5sYXVuY2hCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGVsZW1lbnRzLmxhdW5jaEJ0bi50ZXh0Q29udGVudCA9IHQoJ2xhdW5jaGVyLmxvYWRpbmcnKTtcbiAgICBlbGVtZW50cy5zdGF0dXNUZXh0LnRleHRDb250ZW50ID0gdCgnbGF1bmNoZXIuZG93bmxvYWRpbmcnKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgaWYgKG9uTGF1bmNoKSB7XG4gICAgICAgIGF3YWl0IG9uTGF1bmNoKHNlbGVjdGVkQm90KTtcbiAgICAgICAgLy8gU2kgbGxlZ2Ftb3MgYXF1XHUwMEVELCBlbCBib3Qgc2UgZWplY3V0XHUwMEYzIGNvcnJlY3RhbWVudGVcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ1x1Mjc0QyBFcnJvciBlbiBsYXVuY2g6JywgZXJyb3IpO1xuICAgICAgYWxlcnQodCgnbGF1bmNoZXIubG9hZEVycm9yTXNnJykpO1xuICAgICAgZWxlbWVudHMubGF1bmNoQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBlbGVtZW50cy5sYXVuY2hCdG4udGV4dENvbnRlbnQgPSB0KCdsYXVuY2hlci5sYXVuY2gnKTtcbiAgICAgIGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQgPSB0KCdsYXVuY2hlci5sb2FkRXJyb3InKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgLy8gRnVuY2lcdTAwRjNuIGRlIGxpbXBpZXphXG4gIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhbmd1YWdlQ2hhbmdlKTtcbiAgICBpZiAobGF1bmNoZXJTdGF0ZS5yZWZyZXNoVGltZXIpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGxhdW5jaGVyU3RhdGUucmVmcmVzaFRpbWVyKTtcbiAgICAgIGxhdW5jaGVyU3RhdGUucmVmcmVzaFRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgaG9zdC5yZW1vdmUoKTtcbiAgICBsb2coJ1x1RDgzRVx1RERGOSBMYXVuY2hlciBVSSBlbGltaW5hZG8nKTtcbiAgfVxuICBcbiAgZWxlbWVudHMuY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYW51cCk7XG4gIGVsZW1lbnRzLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYW51cCk7XG4gIFxuICAvLyBDZXJyYXIgY29uIEVzY2FwZVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICBjbGVhbnVwKCk7XG4gICAgfVxuICB9LCB7IG9uY2U6IHRydWUgfSk7XG4gIFxuICAvLyBFc2N1Y2hhciBjYW1iaW9zIGRlIGlkaW9tYVxuICBjb25zdCBoYW5kbGVMYW5ndWFnZUNoYW5nZSA9ICgpID0+IHtcbiAgICB1cGRhdGVUZXh0cygpO1xuICB9O1xuICBcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhbmd1YWdlQ2hhbmdlKTtcbiAgXG4gIC8vIEZ1bmNpb25lcyBkZSBhY3R1YWxpemFjaVx1MDBGM24gZGUgVUlcbiAgZnVuY3Rpb24gc2V0VXNlckluZm8odXNlckluZm8pIHtcbiAgICBpZiAoIXVzZXJJbmZvKSB7XG4gICAgICBlbGVtZW50cy51c2VyTmFtZS50ZXh0Q29udGVudCA9ICctJztcbiAgICAgIGVsZW1lbnRzLnVzZXJDaGFyZ2VzLnRleHRDb250ZW50ID0gJy0nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBuYW1lID0gdXNlckluZm8ubmFtZSB8fCB1c2VySW5mby51c2VybmFtZSB8fCAnLSc7XG4gICAgY29uc3QgY2hhcmdlcyA9IE1hdGguZmxvb3IoTnVtYmVyKHVzZXJJbmZvLmNoYXJnZXM/LmNvdW50ID8/IE5hTikpO1xuICAgIFxuICAgIGVsZW1lbnRzLnVzZXJOYW1lLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBlbGVtZW50cy51c2VyQ2hhcmdlcy50ZXh0Q29udGVudCA9IE51bWJlci5pc0Zpbml0ZShjaGFyZ2VzKSA/IFN0cmluZyhjaGFyZ2VzKSA6ICctJztcbiAgfVxuICBcbiAgZnVuY3Rpb24gc2V0SGVhbHRoSW5mbyhoZWFsdGhJbmZvKSB7XG4gICAgaWYgKCFoZWFsdGhJbmZvKSB7XG4gICAgICBlbGVtZW50cy5iYWNrZW5kU3RhdHVzLnRleHRDb250ZW50ID0gdCgnbGF1bmNoZXIub2ZmbGluZScpO1xuICAgICAgZWxlbWVudHMuZGF0YWJhc2VTdGF0dXMudGV4dENvbnRlbnQgPSAnLSc7XG4gICAgICBlbGVtZW50cy51cHRpbWUudGV4dENvbnRlbnQgPSAnLSc7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHVwID0gQm9vbGVhbihoZWFsdGhJbmZvLnVwKTtcbiAgICBjb25zdCBkYiA9IGhlYWx0aEluZm8uZGF0YWJhc2U7XG4gICAgY29uc3QgdXB0aW1lID0gaGVhbHRoSW5mby51cHRpbWUgfHwgJy0nO1xuICAgIFxuICAgIGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQgPSB1cCA/IHQoJ2xhdW5jaGVyLm9ubGluZScpIDogdCgnbGF1bmNoZXIub2ZmbGluZScpO1xuICAgIFxuICAgIGlmIChkYiA9PT0gdW5kZWZpbmVkIHx8IGRiID09PSBudWxsKSB7XG4gICAgICBlbGVtZW50cy5kYXRhYmFzZVN0YXR1cy50ZXh0Q29udGVudCA9ICctJztcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudHMuZGF0YWJhc2VTdGF0dXMudGV4dENvbnRlbnQgPSBkYiA/IHQoJ2xhdW5jaGVyLm9rJykgOiB0KCdsYXVuY2hlci5lcnJvcicpO1xuICAgIH1cbiAgICBcbiAgICBlbGVtZW50cy51cHRpbWUudGV4dENvbnRlbnQgPSB0eXBlb2YgdXB0aW1lID09PSAnbnVtYmVyJyA/IGAke3VwdGltZX1zYCA6ICh1cHRpbWUgfHwgJy0nKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gdXBkYXRlVGV4dHMoKSB7XG4gICAgLy8gT2J0ZW5lciBudWV2YXMgdHJhZHVjY2lvbmVzXG4gICAgY29uc3QgbmV3VGV4dHMgPSBnZXRMYXVuY2hlclRleHRzKCk7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlbGVtZW50b3MgcHJpbmNpcGFsZXNcbiAgICBjb25zdCB0aXRsZUVsZW1lbnQgPSBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyIGRpdjpmaXJzdC1jaGlsZCcpO1xuICAgIGlmICh0aXRsZUVsZW1lbnQpIHtcbiAgICAgIHRpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IG5ld1RleHRzLnRpdGxlO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudHMuZmFybUJ0bikge1xuICAgICAgZWxlbWVudHMuZmFybUJ0bi50ZXh0Q29udGVudCA9IG5ld1RleHRzLmF1dG9GYXJtO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudHMuaW1hZ2VCdG4pIHtcbiAgICAgIGVsZW1lbnRzLmltYWdlQnRuLnRleHRDb250ZW50ID0gbmV3VGV4dHMuYXV0b0ltYWdlO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudHMuZ3VhcmRCdG4pIHtcbiAgICAgIGVsZW1lbnRzLmd1YXJkQnRuLnRleHRDb250ZW50ID0gbmV3VGV4dHMuYXV0b0d1YXJkO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudHMubGF1bmNoQnRuKSB7XG4gICAgICBlbGVtZW50cy5sYXVuY2hCdG4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5sYXVuY2g7XG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtZW50cy5jbG9zZUJ0bikge1xuICAgICAgZWxlbWVudHMuY2xvc2VCdG4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5jbG9zZTtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBsYWJlbHMgZGUgZXN0YWRcdTAwRURzdGljYXNcbiAgICBjb25zdCBzZWxlY3Rpb25TcGFuID0gcGFuZWwucXVlcnlTZWxlY3RvcignLmNhcmQ6Zmlyc3Qtb2YtdHlwZSAuc3RhdCBzcGFuOmZpcnN0LWNoaWxkJyk7XG4gICAgaWYgKHNlbGVjdGlvblNwYW4pIHtcbiAgICAgIHNlbGVjdGlvblNwYW4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5zZWxlY3Rpb247XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHVzZXJTcGFuID0gcGFuZWwucXVlcnlTZWxlY3RvcignLnVzZXItY2FyZCAuc3RhdDpmaXJzdC1jaGlsZCBzcGFuOmZpcnN0LWNoaWxkJyk7XG4gICAgaWYgKHVzZXJTcGFuKSB7XG4gICAgICB1c2VyU3Bhbi50ZXh0Q29udGVudCA9IG5ld1RleHRzLnVzZXI7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNoYXJnZXNTcGFuID0gcGFuZWwucXVlcnlTZWxlY3RvcignLnVzZXItY2FyZCAuc3RhdDpsYXN0LWNoaWxkIHNwYW46Zmlyc3QtY2hpbGQnKTtcbiAgICBpZiAoY2hhcmdlc1NwYW4pIHtcbiAgICAgIGNoYXJnZXNTcGFuLnRleHRDb250ZW50ID0gbmV3VGV4dHMuY2hhcmdlcztcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYmFja2VuZFNwYW4gPSBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuaGVhbHRoLWNhcmQgLnN0YXQ6Zmlyc3QtY2hpbGQgc3BhbjpmaXJzdC1jaGlsZCcpO1xuICAgIGlmIChiYWNrZW5kU3Bhbikge1xuICAgICAgYmFja2VuZFNwYW4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5iYWNrZW5kO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBkYXRhYmFzZVNwYW4gPSBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuaGVhbHRoLWNhcmQgLnN0YXQ6bnRoLWNoaWxkKDIpIHNwYW46Zmlyc3QtY2hpbGQnKTtcbiAgICBpZiAoZGF0YWJhc2VTcGFuKSB7XG4gICAgICBkYXRhYmFzZVNwYW4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5kYXRhYmFzZTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdXB0aW1lU3BhbiA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5oZWFsdGgtY2FyZCAuc3RhdDpsYXN0LWNoaWxkIHNwYW46Zmlyc3QtY2hpbGQnKTtcbiAgICBpZiAodXB0aW1lU3Bhbikge1xuICAgICAgdXB0aW1lU3Bhbi50ZXh0Q29udGVudCA9IG5ld1RleHRzLnVwdGltZTtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBzdGF0dXMgc2kgZXN0XHUwMEUxIGVuIG1lbnNhamUgcG9yIGRlZmVjdG9cbiAgICBpZiAoZWxlbWVudHMuc3RhdHVzVGV4dCkge1xuICAgICAgY29uc3QgY3VycmVudFN0YXR1cyA9IGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQ7XG4gICAgICBpZiAoY3VycmVudFN0YXR1cyA9PT0gdGV4dHMuY2hvb3NlQm90IHx8IGN1cnJlbnRTdGF0dXMgPT09IG5ld1RleHRzLmNob29zZUJvdCkge1xuICAgICAgICBlbGVtZW50cy5zdGF0dXNUZXh0LnRleHRDb250ZW50ID0gbmV3VGV4dHMuY2hvb3NlQm90O1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdHVzID09PSB0ZXh0cy5sb2FkaW5nIHx8IGN1cnJlbnRTdGF0dXMgPT09IG5ld1RleHRzLmxvYWRpbmcpIHtcbiAgICAgICAgZWxlbWVudHMuc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IG5ld1RleHRzLmxvYWRpbmc7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGF0dXMgPT09IHRleHRzLmRvd25sb2FkaW5nIHx8IGN1cnJlbnRTdGF0dXMgPT09IG5ld1RleHRzLmRvd25sb2FkaW5nKSB7XG4gICAgICAgIGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5kb3dubG9hZGluZztcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YXR1cyA9PT0gdGV4dHMucmVhZHlUb0xhdW5jaCB8fCBjdXJyZW50U3RhdHVzID09PSBuZXdUZXh0cy5yZWFkeVRvTGF1bmNoKSB7XG4gICAgICAgIGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5yZWFkeVRvTGF1bmNoO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdHVzID09PSB0ZXh0cy5sb2FkRXJyb3IgfHwgY3VycmVudFN0YXR1cyA9PT0gbmV3VGV4dHMubG9hZEVycm9yKSB7XG4gICAgICAgIGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5sb2FkRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgZXN0YWRvcyBkaW5cdTAwRTFtaWNvcyBkZSBzYWx1ZCBkZWwgYmFja2VuZFxuICAgIGlmIChlbGVtZW50cy5iYWNrZW5kU3RhdHVzKSB7XG4gICAgICBjb25zdCBjdXJyZW50QmFja2VuZCA9IGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQ7XG4gICAgICBpZiAoY3VycmVudEJhY2tlbmQgPT09IHRleHRzLm9ubGluZSB8fCBjdXJyZW50QmFja2VuZCA9PT0gbmV3VGV4dHMub25saW5lKSB7XG4gICAgICAgIGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5vbmxpbmU7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kID09PSB0ZXh0cy5vZmZsaW5lIHx8IGN1cnJlbnRCYWNrZW5kID09PSBuZXdUZXh0cy5vZmZsaW5lKSB7XG4gICAgICAgIGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5vZmZsaW5lO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZCA9PT0gdGV4dHMuY2hlY2tpbmcgfHwgY3VycmVudEJhY2tlbmQgPT09IG5ld1RleHRzLmNoZWNraW5nKSB7XG4gICAgICAgIGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5jaGVja2luZztcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGUgbGEgYmFzZSBkZSBkYXRvc1xuICAgIGlmIChlbGVtZW50cy5kYXRhYmFzZVN0YXR1cykge1xuICAgICAgY29uc3QgY3VycmVudERiID0gZWxlbWVudHMuZGF0YWJhc2VTdGF0dXMudGV4dENvbnRlbnQ7XG4gICAgICBpZiAoY3VycmVudERiID09PSB0ZXh0cy5vayB8fCBjdXJyZW50RGIgPT09IG5ld1RleHRzLm9rKSB7XG4gICAgICAgIGVsZW1lbnRzLmRhdGFiYXNlU3RhdHVzLnRleHRDb250ZW50ID0gbmV3VGV4dHMub2s7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnREYiA9PT0gdGV4dHMuZXJyb3IgfHwgY3VycmVudERiID09PSBuZXdUZXh0cy5lcnJvcikge1xuICAgICAgICBlbGVtZW50cy5kYXRhYmFzZVN0YXR1cy50ZXh0Q29udGVudCA9IG5ld1RleHRzLmVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGxhIHNlbGVjY2lcdTAwRjNuIGFjdHVhbCBzaSBoYXkgYWxndW5hXG4gICAgaWYgKHNlbGVjdGVkQm90ICYmIGVsZW1lbnRzLmNob2ljZSkge1xuICAgICAgZWxlbWVudHMuY2hvaWNlLnRleHRDb250ZW50ID0gc2VsZWN0ZWRCb3QgPT09ICdmYXJtJyA/IG5ld1RleHRzLmF1dG9GYXJtIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEJvdCA9PT0gJ2ltYWdlJyA/IG5ld1RleHRzLmF1dG9JbWFnZSA6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGV4dHMuYXV0b0d1YXJkO1xuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIHRleHRvcyBkZSByZWZlcmVuY2lhIGxvY2FsXG4gICAgT2JqZWN0LmFzc2lnbih0ZXh0cywgbmV3VGV4dHMpO1xuICAgIFxuICAgIGxvZyhgXHVEODNDXHVERjBEIFRleHRvcyBkZWwgbGF1bmNoZXIgYWN0dWFsaXphZG9zIGFsIGlkaW9tYTogJHtnZXRDdXJyZW50TGFuZ3VhZ2UoKX1gKTtcbiAgfVxuICBcbiAgbG9nKCdcdTI3MDUgTGF1bmNoZXIgVUkgY3JlYWRvIGV4aXRvc2FtZW50ZScpO1xuICBcbiAgcmV0dXJuIHtcbiAgICBzZXRVc2VySW5mbyxcbiAgICBzZXRIZWFsdGhJbmZvLFxuICAgIGNsZWFudXAsXG4gICAgc2VsZWN0Qm90LFxuICAgIHVwZGF0ZVRleHRzLFxuICAgIGdldFNlbGVjdGVkQm90OiAoKSA9PiBzZWxlY3RlZEJvdFxuICB9O1xufVxuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuaW1wb3J0IHsgbGF1bmNoZXJTdGF0ZSB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuXG4vLyBBUEkgY2FsbHMgcGFyYSBvYnRlbmVyIGluZm9ybWFjaVx1MDBGM24gZGVsIHVzdWFyaW8geSBlc3RhZG8gZGVsIGJhY2tlbmRcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXNzaW9uKCkge1xuICBsb2coJ1x1RDgzRFx1RENFMSBPYnRlbmllbmRvIGluZm9ybWFjaVx1MDBGM24gZGUgc2VzaVx1MDBGM24uLi4nKTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYmFja2VuZC53cGxhY2UubGl2ZS9tZScsIHsgXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnIFxuICAgIH0pO1xuICAgIFxuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICAgIH1cbiAgICBcbiAgICBsYXVuY2hlclN0YXRlLm1lID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICBsb2coJ1x1MjcwNSBJbmZvcm1hY2lcdTAwRjNuIGRlIHNlc2lcdTAwRjNuIG9idGVuaWRhOicsIGxhdW5jaGVyU3RhdGUubWU/Lm5hbWUgfHwgbGF1bmNoZXJTdGF0ZS5tZT8udXNlcm5hbWUgfHwgJ1VzdWFyaW8nKTtcbiAgICBcbiAgICByZXR1cm4gbGF1bmNoZXJTdGF0ZS5tZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBvYnRlbmllbmRvIHNlc2lcdTAwRjNuOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgIGxhdW5jaGVyU3RhdGUubWUgPSBudWxsO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0JhY2tlbmRIZWFsdGgoKSB7XG4gIGxvZygnXHVEODNDXHVERkU1IFZlcmlmaWNhbmRvIGVzdGFkbyBkZWwgYmFja2VuZC4uLicpO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9iYWNrZW5kLndwbGFjZS5saXZlL2hlYWx0aCcsIHsgXG4gICAgICBtZXRob2Q6ICdHRVQnLCBcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScgXG4gICAgfSk7XG4gICAgXG4gICAgbGV0IGpzb24gPSBudWxsO1xuICAgIHRyeSB7IFxuICAgICAganNvbiA9IGF3YWl0IHJlcy5qc29uKCk7IFxuICAgIH0gY2F0Y2ggeyBcbiAgICAgIGpzb24gPSBudWxsOyBcbiAgICB9XG4gICAgXG4gICAgaWYgKHJlcy5vayAmJiBqc29uKSB7XG4gICAgICBsYXVuY2hlclN0YXRlLmhlYWx0aCA9IHtcbiAgICAgICAgdXA6IEJvb2xlYW4oanNvbi51cCA/PyB0cnVlKSxcbiAgICAgICAgZGF0YWJhc2U6IGpzb24uZGF0YWJhc2U/Lm9rID8/IGpzb24uZGF0YWJhc2UgPz8gdW5kZWZpbmVkLFxuICAgICAgICB1cHRpbWU6IGpzb24udXB0aW1lID8/IGpzb24udXB0aW1lSHVtYW4gPz8gKHR5cGVvZiBqc29uLnVwdGltZVNlY29uZHMgPT09ICdudW1iZXInID8gYCR7anNvbi51cHRpbWVTZWNvbmRzfXNgIDogdW5kZWZpbmVkKVxuICAgICAgfTtcbiAgICAgIGxvZygnXHUyNzA1IEVzdGFkbyBkZWwgYmFja2VuZCBvYnRlbmlkbzonLCBsYXVuY2hlclN0YXRlLmhlYWx0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhdW5jaGVyU3RhdGUuaGVhbHRoID0geyBcbiAgICAgICAgdXA6IGZhbHNlLCBcbiAgICAgICAgZGF0YWJhc2U6IGZhbHNlLCBcbiAgICAgICAgdXB0aW1lOiB1bmRlZmluZWQgXG4gICAgICB9O1xuICAgICAgbG9nKCdcdTI2QTBcdUZFMEYgQmFja2VuZCBubyByZXNwb25kZSBjb3JyZWN0YW1lbnRlJyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNzRDIEVycm9yIHZlcmlmaWNhbmRvIGJhY2tlbmQ6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgbGF1bmNoZXJTdGF0ZS5oZWFsdGggPSB7IFxuICAgICAgdXA6IGZhbHNlLCBcbiAgICAgIGRhdGFiYXNlOiBmYWxzZSwgXG4gICAgICB1cHRpbWU6IHVuZGVmaW5lZCBcbiAgICB9O1xuICB9XG4gIFxuICByZXR1cm4gbGF1bmNoZXJTdGF0ZS5oZWFsdGg7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEFuZEV4ZWN1dGVCb3QoYm90VHlwZSwgcmF3QmFzZSkge1xuICBsb2coYFx1RDgzRFx1RENFNSBEZXNjYXJnYW5kbyBib3Q6ICR7Ym90VHlwZX1gKTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgYm90RmlsZXMgPSB7XG4gICAgICAnZmFybSc6ICdBdXRvLUZhcm0uanMnLFxuICAgICAgJ2ltYWdlJzogJ0F1dG8tSW1hZ2UuanMnLFxuICAgICAgJ2d1YXJkJzogJ0F1dG8tR3VhcmQuanMnXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBmaWxlTmFtZSA9IGJvdEZpbGVzW2JvdFR5cGVdO1xuICAgIGlmICghZmlsZU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGlwbyBkZSBib3QgZGVzY29ub2NpZG86ICR7Ym90VHlwZX1gKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdXJsID0gYCR7cmF3QmFzZX0vJHtmaWxlTmFtZX1gO1xuICAgIFxuICAgIGxvZyhgXHVEODNDXHVERjEwIFVSTDogJHt1cmx9YCk7XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY29kZSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICBsb2coYFx1MjcwNSBCb3QgZGVzY2FyZ2FkbyAoJHtjb2RlLmxlbmd0aH0gY2hhcnMpLCBlamVjdXRhbmRvLi4uYCk7XG4gICAgXG4gICAgLy8gRXZhbHVhciBlbCBjXHUwMEYzZGlnbyBkZWwgYm90XG4gICAgKDAsIGV2YWwpKGNvZGUpO1xuICAgIFxuICAgIGxvZygnXHVEODNEXHVERTgwIEJvdCBlamVjdXRhZG8gZXhpdG9zYW1lbnRlJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKCdcdTI3NEMgRXJyb3IgZGVzY2FyZ2FuZG8vZWplY3V0YW5kbyBib3Q6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBcbiAgQVZBSUxBQkxFX0xBTkdVQUdFUywgXG4gIGdldEN1cnJlbnRMYW5ndWFnZSwgXG4gIHNldExhbmd1YWdlIFxufSBmcm9tICcuLi9sb2NhbGVzL2luZGV4LmpzJztcblxuLyoqXG4gKiBDcmVhIHVuIHNlbGVjdG9yIGRlIGlkaW9tYVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcGNpb25lcyBkZSBjb25maWd1cmFjaVx1MDBGM25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMub25MYW5ndWFnZUNoYW5nZSAtIENhbGxiYWNrIGN1YW5kbyBjYW1iaWEgZWwgaWRpb21hXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wb3NpdGlvbiAtIFBvc2ljaVx1MDBGM24gZGVsIHNlbGVjdG9yICgndG9wLXJpZ2h0JywgJ3RvcC1sZWZ0JywgZXRjLilcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zaG93RmxhZ3MgLSBTaSBtb3N0cmFyIGJhbmRlcmFzIGRlIHBhXHUwMEVEc2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmpldG8gY29uIG1cdTAwRTl0b2RvcyBwYXJhIGNvbnRyb2xhciBlbCBzZWxlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFuZ3VhZ2VTZWxlY3RvcihvcHRpb25zID0ge30pIHtcbiAgY29uc3Qge1xuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UgPSBudWxsLFxuICAgIHBvc2l0aW9uID0gJ3RvcC1yaWdodCcsXG4gICAgc2hvd0ZsYWdzID0gdHJ1ZVxuICB9ID0gb3B0aW9ucztcblxuICAvLyBDcmVhciBjb250ZW5lZG9yXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2xhbmd1YWdlLXNlbGVjdG9yJztcbiAgXG4gIC8vIEVzdGlsb3MgQ1NTXG4gIGNvbnN0IHN0eWxlcyA9IGBcbiAgICAubGFuZ3VhZ2Utc2VsZWN0b3Ige1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgJHtnZXRQb3NpdGlvblN0eWxlcyhwb3NpdGlvbil9XG4gICAgICB6LWluZGV4OiA5OTk5OTg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjMpO1xuICAgICAgZm9udC1mYW1pbHk6IHN5c3RlbS11aSwgJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1zZWxlY3Rvci1idXR0b24ge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjb2xvcjogI2VlZTtcbiAgICAgIHBhZGRpbmc6IDZweCAxMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDZweDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycztcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG4gICAgXG4gICAgLmxhbmd1YWdlLXNlbGVjdG9yLWJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1zZWxlY3Rvci1kcm9wZG93biB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDEwMCU7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIG1hcmdpbi10b3A6IDRweDtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4zKTtcbiAgICB9XG4gICAgXG4gICAgLmxhbmd1YWdlLXNlbGVjdG9yLWRyb3Bkb3duLnZpc2libGUge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1vcHRpb24ge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjb2xvcjogI2VlZTtcbiAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycztcbiAgICB9XG4gICAgXG4gICAgLmxhbmd1YWdlLW9wdGlvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1vcHRpb24uYWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTE5LCA5MiwgMjI3LCAwLjIpO1xuICAgICAgY29sb3I6ICM3NzVjZTM7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1vcHRpb246Zmlyc3QtY2hpbGQge1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4IDZweCAwIDA7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1vcHRpb246bGFzdC1jaGlsZCB7XG4gICAgICBib3JkZXItcmFkaXVzOiAwIDAgNnB4IDZweDtcbiAgICB9XG4gICAgXG4gICAgLmxhbmd1YWdlLWZsYWcge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgIH1cbiAgICBcbiAgICAubGFuZ3VhZ2UtbmFtZSB7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cbiAgICBcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgIC5sYW5ndWFnZS1zZWxlY3RvciB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgdG9wOiAxMHB4O1xuICAgICAgICByaWdodDogMTBweDtcbiAgICAgIH1cbiAgICB9XG4gIGA7XG4gIFxuICAvLyBBXHUwMEYxYWRpciBlc3RpbG9zIGFsIGRvY3VtZW50b1xuICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsYW5ndWFnZS1zZWxlY3Rvci1zdHlsZXMnKSkge1xuICAgIGNvbnN0IHN0eWxlU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlU2hlZXQuaWQgPSAnbGFuZ3VhZ2Utc2VsZWN0b3Itc3R5bGVzJztcbiAgICBzdHlsZVNoZWV0LnRleHRDb250ZW50ID0gc3R5bGVzO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldCk7XG4gIH1cbiAgXG4gIC8vIEVzdGFkb1xuICBsZXQgaXNPcGVuID0gZmFsc2U7XG4gIGxldCBjdXJyZW50TGFuZyA9IGdldEN1cnJlbnRMYW5ndWFnZSgpO1xuICBcbiAgLy8gQ3JlYXIgZXN0cnVjdHVyYSBIVE1MXG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBjb25zdCBsYW5nSW5mbyA9IEFWQUlMQUJMRV9MQU5HVUFHRVNbY3VycmVudExhbmddO1xuICAgIFxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwibGFuZ3VhZ2Utc2VsZWN0b3ItYnV0dG9uXCI+XG4gICAgICAgICR7c2hvd0ZsYWdzID8gYDxzcGFuIGNsYXNzPVwibGFuZ3VhZ2UtZmxhZ1wiPiR7bGFuZ0luZm8uZmxhZ308L3NwYW4+YCA6ICcnfVxuICAgICAgICA8c3BhbiBjbGFzcz1cImxhbmd1YWdlLW5hbWVcIj4ke2xhbmdJbmZvLm5hbWV9PC9zcGFuPlxuICAgICAgICA8c3BhbiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiBhdXRvOyB0cmFuc2Zvcm06ICR7aXNPcGVuID8gJ3JvdGF0ZSgxODBkZWcpJyA6ICdyb3RhdGUoMGRlZyknfTsgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnM7XCI+XHUyNUJDPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwibGFuZ3VhZ2Utc2VsZWN0b3ItZHJvcGRvd24gJHtpc09wZW4gPyAndmlzaWJsZScgOiAnJ31cIj5cbiAgICAgICAgJHtPYmplY3QuZW50cmllcyhBVkFJTEFCTEVfTEFOR1VBR0VTKS5tYXAoKFtjb2RlLCBpbmZvXSkgPT4gYFxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJsYW5ndWFnZS1vcHRpb24gJHtjb2RlID09PSBjdXJyZW50TGFuZyA/ICdhY3RpdmUnIDogJyd9XCIgZGF0YS1sYW5nPVwiJHtjb2RlfVwiPlxuICAgICAgICAgICAgJHtzaG93RmxhZ3MgPyBgPHNwYW4gY2xhc3M9XCJsYW5ndWFnZS1mbGFnXCI+JHtpbmZvLmZsYWd9PC9zcGFuPmAgOiAnJ31cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFuZ3VhZ2UtbmFtZVwiPiR7aW5mby5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgYCkuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIFxuICAgIC8vIEFcdTAwRjFhZGlyIGV2ZW50IGxpc3RlbmVyc1xuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBcbiAgLy8gQ29uZmlndXJhciBldmVudCBsaXN0ZW5lcnNcbiAgZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBidXR0b24gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlLXNlbGVjdG9yLWJ1dHRvbicpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmxhbmd1YWdlLW9wdGlvbicpO1xuICAgIFxuICAgIC8vIFRvZ2dsZSBkcm9wZG93blxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaXNPcGVuID0gIWlzT3BlbjtcbiAgICAgIHJlbmRlcigpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIFNlbGVjY2lcdTAwRjNuIGRlIGlkaW9tYVxuICAgIG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMYW5nID0gb3B0aW9uLmRhdGFzZXQubGFuZztcbiAgICAgICAgXG4gICAgICAgIGlmIChzZWxlY3RlZExhbmcgIT09IGN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgY3VycmVudExhbmcgPSBzZWxlY3RlZExhbmc7XG4gICAgICAgICAgc2V0TGFuZ3VhZ2Uoc2VsZWN0ZWRMYW5nKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAob25MYW5ndWFnZUNoYW5nZSkge1xuICAgICAgICAgICAgb25MYW5ndWFnZUNoYW5nZShzZWxlY3RlZExhbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQ2VycmFyIGFsIGhhY2VyIGNsaWNrIGZ1ZXJhXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICByZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBcbiAgLy8gRXNjdWNoYXIgY2FtYmlvcyBkZSBpZGlvbWEgZGVzZGUgb3Ryb3MgY29tcG9uZW50ZXNcbiAgZnVuY3Rpb24gaGFuZGxlTGFuZ3VhZ2VDaGFuZ2UoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGV0YWlsLmxhbmd1YWdlICE9PSBjdXJyZW50TGFuZykge1xuICAgICAgY3VycmVudExhbmcgPSBldmVudC5kZXRhaWwubGFuZ3VhZ2U7XG4gICAgICByZW5kZXIoKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEFcdTAwRjFhZGlyIGxpc3RlbmVyIHBhcmEgY2FtYmlvcyBleHRlcm5vcyBkZSBpZGlvbWFcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhbmd1YWdlQ2hhbmdlKTtcbiAgXG4gIC8vIFJlbmRlcml6YXIgaW5pY2lhbG1lbnRlXG4gIHJlbmRlcigpO1xuICBcbiAgLy8gTVx1MDBFOXRvZG9zIHBcdTAwRkFibGljb3NcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBBXHUwMEYxYWRlIGVsIHNlbGVjdG9yIGFsIERPTVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudCAtIEVsZW1lbnRvIHBhZHJlIChvcGNpb25hbCwgcG9yIGRlZmVjdG8gZG9jdW1lbnQuYm9keSlcbiAgICAgKi9cbiAgICBtb3VudChwYXJlbnQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqIFJlbXVldmUgZWwgc2VsZWN0b3IgZGVsIERPTVxuICAgICAqL1xuICAgIHVubW91bnQoKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbGFuZ3VhZ2VDaGFuZ2VkJywgaGFuZGxlTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgaWYgKGNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiBBY3R1YWxpemEgbGEgcG9zaWNpXHUwMEYzbiBkZWwgc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UG9zaXRpb24gLSBOdWV2YSBwb3NpY2lcdTAwRjNuXG4gICAgICovXG4gICAgc2V0UG9zaXRpb24obmV3UG9zaXRpb24pIHtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gZ2V0UG9zaXRpb25TdHlsZXMobmV3UG9zaXRpb24pO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogT2J0aWVuZSBlbCBlbGVtZW50byBET00gZGVsIHNlbGVjdG9yXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fSBFbGVtZW50byBET01cbiAgICAgKi9cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqIEZ1ZXJ6YSB1bmEgYWN0dWFsaXphY2lcdTAwRjNuIGRlbCBjb21wb25lbnRlXG4gICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgY3VycmVudExhbmcgPSBnZXRDdXJyZW50TGFuZ3VhZ2UoKTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBPYnRpZW5lIGxvcyBlc3RpbG9zIENTUyBwYXJhIHBvc2ljaW9uYXIgZWwgc2VsZWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvbiAtIFBvc2ljaVx1MDBGM24gZGVzZWFkYVxuICogQHJldHVybnMge3N0cmluZ30gRXN0aWxvcyBDU1NcbiAqL1xuZnVuY3Rpb24gZ2V0UG9zaXRpb25TdHlsZXMocG9zaXRpb24pIHtcbiAgY29uc3QgcG9zaXRpb25zID0ge1xuICAgICd0b3AtcmlnaHQnOiAndG9wOiAxNXB4OyByaWdodDogMTVweDsnLFxuICAgICd0b3AtbGVmdCc6ICd0b3A6IDE1cHg7IGxlZnQ6IDE1cHg7JyxcbiAgICAnYm90dG9tLXJpZ2h0JzogJ2JvdHRvbTogMTVweDsgcmlnaHQ6IDE1cHg7JyxcbiAgICAnYm90dG9tLWxlZnQnOiAnYm90dG9tOiAxNXB4OyBsZWZ0OiAxNXB4OycsXG4gICAgJ3RvcC1jZW50ZXInOiAndG9wOiAxNXB4OyBsZWZ0OiA1MCU7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTsnLFxuICAgICdib3R0b20tY2VudGVyJzogJ2JvdHRvbTogMTVweDsgbGVmdDogNTAlOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7J1xuICB9O1xuICBcbiAgcmV0dXJuIHBvc2l0aW9uc1twb3NpdGlvbl0gfHwgcG9zaXRpb25zWyd0b3AtcmlnaHQnXTtcbn1cbiIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUxhdW5jaGVyVUkgfSBmcm9tIFwiLi91aS5qc1wiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvbiwgY2hlY2tCYWNrZW5kSGVhbHRoLCBkb3dubG9hZEFuZEV4ZWN1dGVCb3QgfSBmcm9tIFwiLi9hcGkuanNcIjtcbmltcG9ydCB7IGxhdW5jaGVyU3RhdGUsIExBVU5DSEVSX0NPTkZJRyB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUxhbmd1YWdlIH0gZnJvbSBcIi4uL2xvY2FsZXMvaW5kZXguanNcIjtcbmltcG9ydCB7IGNyZWF0ZUxhbmd1YWdlU2VsZWN0b3IgfSBmcm9tIFwiLi4vY29yZS9sYW5ndWFnZS1zZWxlY3Rvci5qc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuTGF1bmNoZXIoKSB7XG4gIGxvZygnXHVEODNEXHVERTgwIEluaWNpYW5kbyBXUGxhY2UgQXV0by1MYXVuY2hlciAodmVyc2lcdTAwRjNuIG1vZHVsYXIpJyk7XG4gIFxuICAvLyBJbmljaWFsaXphciBzaXN0ZW1hIGRlIGlkaW9tYXNcbiAgaW5pdGlhbGl6ZUxhbmd1YWdlKCk7XG4gIFxuICAvLyBWZXJpZmljYXIgc2kgeWEgZXN0XHUwMEUxIGVqZWN1dFx1MDBFMW5kb3NlXG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmxhdW5jaGVyUnVubmluZykge1xuICAgIGFsZXJ0KFwiQXV0by1MYXVuY2hlciB5YSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgLy8gSW5pY2lhbGl6YXIgbyBwcmVzZXJ2YXIgZWwgZXN0YWRvIGdsb2JhbFxuICB3aW5kb3cuX193cGxhY2VCb3QgPSB7IC4uLndpbmRvdy5fX3dwbGFjZUJvdCwgbGF1bmNoZXJSdW5uaW5nOiB0cnVlIH07XG4gIFxuICB0cnkge1xuICAgIC8vIFZhcmlhYmxlIHBhcmEgZWwgc2VsZWN0b3IgZGUgaWRpb21hXG4gICAgbGV0IGxhbmd1YWdlU2VsZWN0b3IgPSBudWxsO1xuICAgIFxuICAgIC8vIENyZWFyIGludGVyZmF6IGRlIHVzdWFyaW9cbiAgICBjb25zdCB1aSA9IGNyZWF0ZUxhdW5jaGVyVUkoe1xuICAgICAgb25TZWxlY3RCb3Q6IChib3RUeXBlKSA9PiB7XG4gICAgICAgIGxvZyhgXHVEODNDXHVERkFGIEJvdCBzZWxlY2Npb25hZG86ICR7Ym90VHlwZX1gKTtcbiAgICAgICAgLy8gT2N1bHRhciBlbCBzZWxlY3RvciBkZSBpZGlvbWEgY3VhbmRvIHNlIHNlbGVjY2lvbmEgdW4gYm90XG4gICAgICAgIGlmIChsYW5ndWFnZVNlbGVjdG9yKSB7XG4gICAgICAgICAgbGFuZ3VhZ2VTZWxlY3Rvci51bm1vdW50KCk7XG4gICAgICAgICAgbGFuZ3VhZ2VTZWxlY3RvciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcbiAgICAgIG9uTGF1bmNoOiBhc3luYyAoYm90VHlwZSkgPT4ge1xuICAgICAgICBsb2coYFx1RDgzRFx1REU4MCBMYW56YW5kbyBib3Q6ICR7Ym90VHlwZX1gKTtcbiAgICAgICAgYXdhaXQgZG93bmxvYWRBbmRFeGVjdXRlQm90KGJvdFR5cGUsIExBVU5DSEVSX0NPTkZJRy5SQVdfQkFTRSk7XG4gICAgICB9LFxuICAgICAgXG4gICAgICBvbkNsb3NlOiAoKSA9PiB7XG4gICAgICAgIGxvZygnXHVEODNEXHVEQzRCIENlcnJhbmRvIGxhdW5jaGVyJyk7XG4gICAgICAgIC8vIEFzZWd1cmFyIHF1ZSBlbCBzZWxlY3RvciBzZSBkZXNtb250ZSBhbCBjZXJyYXJcbiAgICAgICAgaWYgKGxhbmd1YWdlU2VsZWN0b3IpIHtcbiAgICAgICAgICBsYW5ndWFnZVNlbGVjdG9yLnVubW91bnQoKTtcbiAgICAgICAgICBsYW5ndWFnZVNlbGVjdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuX193cGxhY2VCb3QubGF1bmNoZXJSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQ3JlYXIgc2VsZWN0b3IgZGUgaWRpb21hIGRlc3B1XHUwMEU5cyBkZSBsYSBVSVxuICAgIGxhbmd1YWdlU2VsZWN0b3IgPSBjcmVhdGVMYW5ndWFnZVNlbGVjdG9yKHtcbiAgICAgIHBvc2l0aW9uOiAndG9wLWxlZnQnLCAvLyBFc3F1aW5hIG9wdWVzdGEgYWwgbGF1bmNoZXJcbiAgICAgIHNob3dGbGFnczogdHJ1ZSxcbiAgICAgIG9uTGFuZ3VhZ2VDaGFuZ2U6IChuZXdMYW5ndWFnZSkgPT4ge1xuICAgICAgICBsb2coYFx1RDgzQ1x1REYwRCBJZGlvbWEgY2FtYmlhZG8gYTogJHtuZXdMYW5ndWFnZX0gZGVzZGUgZWwgbGF1bmNoZXJgKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFjdHVhbGl6YXIgdGV4dG9zIGRlIGxhIFVJIGRlbCBsYXVuY2hlclxuICAgICAgICB1aS51cGRhdGVUZXh0cygpO1xuICAgICAgICBcbiAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBwZXJzb25hbGl6YWRvIHBhcmEgbm90aWZpY2FyIGEgb3Ryb3MgbVx1MDBGM2R1bG9zXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuQ3VzdG9tRXZlbnQpIHtcbiAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93LkN1c3RvbUV2ZW50KCdsYXVuY2hlckxhbmd1YWdlQ2hhbmdlZCcsIHtcbiAgICAgICAgICAgIGRldGFpbDogeyBsYW5ndWFnZTogbmV3TGFuZ3VhZ2UgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIE1vbnRhciBlbCBzZWxlY3RvclxuICAgIGxhbmd1YWdlU2VsZWN0b3IubW91bnQoKTtcbiAgICBcbiAgICAvLyBDYXJnYXIgaW5mb3JtYWNpXHUwMEYzbiBpbmljaWFsXG4gICAgbG9nKCdcdUQ4M0RcdURDQ0EgQ2FyZ2FuZG8gaW5mb3JtYWNpXHUwMEYzbiBpbmljaWFsLi4uJyk7XG4gICAgXG4gICAgLy8gQ2FyZ2FyIGVzdGFkbyBkZWwgYmFja2VuZFxuICAgIGNvbnN0IGhlYWx0aCA9IGF3YWl0IGNoZWNrQmFja2VuZEhlYWx0aCgpO1xuICAgIHVpLnNldEhlYWx0aEluZm8oaGVhbHRoKTtcbiAgICBcbiAgICAvLyBDYXJnYXIgaW5mb3JtYWNpXHUwMEYzbiBkZWwgdXN1YXJpb1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRTZXNzaW9uKCk7XG4gICAgdWkuc2V0VXNlckluZm8odXNlcik7XG4gICAgXG4gICAgLy8gQ29uZmlndXJhciByZWZyZXNjbyBwZXJpXHUwMEYzZGljb1xuICAgIGxhdW5jaGVyU3RhdGUucmVmcmVzaFRpbWVyID0gd2luZG93LnNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIGxvZygnXHVEODNEXHVERDA0IEFjdHVhbGl6YW5kbyBpbmZvcm1hY2lcdTAwRjNuLi4uJyk7XG4gICAgICBcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFtuZXdIZWFsdGgsIG5ld1VzZXJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgIGNoZWNrQmFja2VuZEhlYWx0aCgpLFxuICAgICAgICAgIGdldFNlc3Npb24oKVxuICAgICAgICBdKTtcbiAgICAgICAgXG4gICAgICAgIHVpLnNldEhlYWx0aEluZm8obmV3SGVhbHRoKTtcbiAgICAgICAgdWkuc2V0VXNlckluZm8obmV3VXNlcik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2coJ1x1Mjc0QyBFcnJvciBlbiBhY3R1YWxpemFjaVx1MDBGM24gcGVyaVx1MDBGM2RpY2E6JywgZXJyb3IpO1xuICAgICAgfVxuICAgIH0sIExBVU5DSEVSX0NPTkZJRy5SRUZSRVNIX0lOVEVSVkFMKTtcbiAgICBcbiAgICAvLyBDbGVhbnVwIGN1YW5kbyBzZSBjaWVycmUgbGEgcFx1MDBFMWdpbmFcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xuICAgICAgdWkuY2xlYW51cCgpO1xuICAgICAgaWYgKGxhbmd1YWdlU2VsZWN0b3IpIHtcbiAgICAgICAgbGFuZ3VhZ2VTZWxlY3Rvci51bm1vdW50KCk7XG4gICAgICB9XG4gICAgICB3aW5kb3cuX193cGxhY2VCb3QubGF1bmNoZXJSdW5uaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gICAgXG4gICAgbG9nKCdcdTI3MDUgQXV0by1MYXVuY2hlciBpbmljaWFsaXphZG8gY29ycmVjdGFtZW50ZScpO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNzRDIEVycm9yIGluaWNpYWxpemFuZG8gQXV0by1MYXVuY2hlcjonLCBlcnJvcik7XG4gICAgd2luZG93Ll9fd3BsYWNlQm90LmxhdW5jaGVyUnVubmluZyA9IGZhbHNlO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgcnVuTGF1bmNoZXIgfSBmcm9tIFwiLi4vbGF1bmNoZXIvaW5kZXguanNcIjtcblxuKCgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIFZlcmlmaWNhciBzaSBoYXkgYm90cyBlc3BlY1x1MDBFRGZpY29zIGVqZWN1dFx1MDBFMW5kb3NlLCBubyBlbCBsYXVuY2hlclxuICBpZiAod2luZG93Ll9fd3BsYWNlQm90Py5mYXJtUnVubmluZyB8fCB3aW5kb3cuX193cGxhY2VCb3Q/LmltYWdlUnVubmluZykge1xuICAgIGFsZXJ0KFwiWWEgaGF5IHVuIGJvdCBlamVjdXRcdTAwRTFuZG9zZS4gQ2lcdTAwRTlycmFsbyBhbnRlcyBkZSB1c2FyIGVsIGxhdW5jaGVyLlwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIC8vIEluaWNpYWxpemFyIGVsIGVzdGFkbyBnbG9iYWwgc2kgbm8gZXhpc3RlXG4gIGlmICghd2luZG93Ll9fd3BsYWNlQm90KSB7XG4gICAgd2luZG93Ll9fd3BsYWNlQm90ID0ge307XG4gIH1cbiAgXG4gIHJ1bkxhdW5jaGVyKCkuY2F0Y2goKGUpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKFwiW0JPVF0gRXJyb3IgZW4gQXV0by1MYXVuY2hlcjpcIiwgZSk7XG4gICAgLy8gTGltcGlhciBzb2xvIGVsIGVzdGFkbyBkZWwgbGF1bmNoZXIsIG5vIGRlIG90cm9zIGJvdHNcbiAgICBpZiAod2luZG93Ll9fd3BsYWNlQm90KSB7XG4gICAgICB3aW5kb3cuX193cGxhY2VCb3QubGF1bmNoZXJSdW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGFsZXJ0KFwiQXV0by1MYXVuY2hlcjogZXJyb3Ig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QUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2Is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TUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFB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UztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxFQUNGOzs7QUMzUE8sTUFBTSxLQUFLO0FBQUE7QUFBQSxJQUVoQixVQUFVO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsSUFDWDtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixxQkFBcUI7QUFBQSxNQUNyQixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQix5QkFBeUI7QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixvQkFBb0I7QUFBQSxNQUNwQixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsSUFDaEI7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FB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QUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztB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QUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdC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
