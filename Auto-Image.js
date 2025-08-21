/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-21T06:28:30.591Z */
(() => {
  // src/core/logger.js
  var log = (...a) => console.log("[WPA-UI]", ...a);

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

  // src/image/config.js
  var IMAGE_DEFAULTS = {
    SITEKEY: "0x4AAAAAABpqJe8FO0N84q0F",
    COOLDOWN_DEFAULT: 31e3,
    TRANSPARENCY_THRESHOLD: 100,
    WHITE_THRESHOLD: 250,
    LOG_INTERVAL: 10,
    TILE_SIZE: 3e3,
    PIXELS_PER_BATCH: 20,
    CHARGE_REGEN_MS: 3e4,
    THEME: {
      primary: "#000000",
      secondary: "#111111",
      accent: "#222222",
      text: "#ffffff",
      highlight: "#775ce3",
      success: "#00ff00",
      error: "#ff0000",
      warning: "#ffaa00"
    }
  };
  var imageState = {
    running: false,
    imageLoaded: false,
    processing: false,
    totalPixels: 0,
    paintedPixels: 0,
    availableColors: [],
    currentCharges: 0,
    cooldown: IMAGE_DEFAULTS.COOLDOWN_DEFAULT,
    imageData: null,
    stopFlag: false,
    colorsChecked: false,
    startPosition: null,
    selectingPosition: false,
    positionTimeoutId: null,
    // Para manejar timeout de selección
    cleanupObserver: null,
    // Para limpiar observers
    region: null,
    minimized: false,
    lastPosition: { x: 0, y: 0 },
    estimatedTime: 0,
    language: "es",
    tileX: null,
    tileY: null,
    pixelsPerBatch: IMAGE_DEFAULTS.PIXELS_PER_BATCH,
    useAllChargesFirst: true,
    // Usar todas las cargas en la primera pasada
    isFirstBatch: true,
    // Controlar si es la primera pasada
    maxCharges: 50,
    // Cargas máximas del usuario
    nextBatchCooldown: 0,
    // Tiempo para el siguiente lote
    inCooldown: false,
    cooldownEndTime: 0,
    remainingPixels: [],
    lastChargeUpdate: 0,
    chargeDecimalPart: 0,
    originalImageName: null,
    retryCount: 0
    // Contador de reintentos para estadísticas
  };

  // src/image/processor.js
  function detectAvailableColors() {
    log("\u{1F3A8} Detectando colores disponibles...");
    const colorElements = document.querySelectorAll('[id^="color-"]');
    const colors = [];
    for (const element of colorElements) {
      if (element.querySelector("svg")) {
        continue;
      }
      const idStr = element.id.replace("color-", "");
      const id = parseInt(idStr);
      if (id === 0) {
        continue;
      }
      const backgroundStyle = element.style.backgroundColor;
      if (backgroundStyle) {
        const rgbMatch = backgroundStyle.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const rgb = {
            r: parseInt(rgbMatch[0]),
            g: parseInt(rgbMatch[1]),
            b: parseInt(rgbMatch[2])
          };
          colors.push({
            id,
            element,
            ...rgb
          });
          log(`Color detectado: id=${id}, rgb(${rgb.r},${rgb.g},${rgb.b})`);
        }
      }
    }
    log(`\u2705 ${colors.length} colores disponibles detectados`);
    return colors;
  }

  // src/image/blue-marble-processor.js
  var BlueMarblelImageProcessor = class {
    constructor(imageSrc) {
      this.imageSrc = imageSrc;
      this.img = new window.Image();
      this.originalName = null;
      this.tileSize = 1e3;
      this.drawMult = 3;
      this.shreadSize = 3;
      this.bitmap = null;
      this.imageWidth = 0;
      this.imageHeight = 0;
      this.totalPixels = 0;
      this.requiredPixelCount = 0;
      this.defacePixelCount = 0;
      this.colorPalette = {};
      this.allowedColorsSet = /* @__PURE__ */ new Set();
      this.rgbToMeta = /* @__PURE__ */ new Map();
      this.coords = [0, 0, 0, 0];
      this.templateTiles = {};
      this.templateTilesBuffers = {};
      this.tilePrefixes = /* @__PURE__ */ new Set();
    }
    async load() {
      return new Promise((resolve, reject) => {
        this.img.onload = async () => {
          try {
            this.bitmap = await createImageBitmap(this.img);
            this.imageWidth = this.bitmap.width;
            this.imageHeight = this.bitmap.height;
            this.totalPixels = this.imageWidth * this.imageHeight;
            log(`[BLUE MARBLE] Imagen cargada: ${this.imageWidth}\xD7${this.imageHeight} = ${this.totalPixels.toLocaleString()} p\xEDxeles`);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        this.img.onerror = reject;
        this.img.src = this.imageSrc;
      });
    }
    /**
     * Inicializa la paleta de colores desde WPlace (como Blue Marble)
     */
    initializeColorPalette() {
      log("[BLUE MARBLE] Inicializando paleta de colores...");
      const availableColors = this.detectSiteColors();
      const filteredColors = availableColors.filter((c) => c.name && c.name.toLowerCase() !== "transparent" && Array.isArray(c.rgb));
      this.allowedColorsSet = new Set(
        filteredColors.map((c) => `${c.rgb[0]},${c.rgb[1]},${c.rgb[2]}`)
      );
      const defaceKey = "222,250,206";
      this.allowedColorsSet.add(defaceKey);
      this.rgbToMeta = new Map(
        availableColors.filter((c) => Array.isArray(c.rgb)).map((c) => [
          `${c.rgb[0]},${c.rgb[1]},${c.rgb[2]}`,
          {
            id: c.id,
            premium: !!c.premium,
            name: c.name || `Color ${c.id}`
          }
        ])
      );
      try {
        const transparent = availableColors.find((c) => c.name && c.name.toLowerCase() === "transparent");
        if (transparent && Array.isArray(transparent.rgb)) {
          this.rgbToMeta.set(defaceKey, {
            id: transparent.id,
            premium: !!transparent.premium,
            name: transparent.name
          });
        }
      } catch (_error) {
      }
      log(`[BLUE MARBLE] Paleta inicializada: ${this.allowedColorsSet.size} colores permitidos`);
      return Array.from(availableColors);
    }
    /**
     * Detecta colores disponibles del sitio (versión mejorada de Blue Marble)
     */
    detectSiteColors() {
      const colorElements = document.querySelectorAll('[id^="color-"]');
      const colors = [];
      for (const element of colorElements) {
        const idStr = element.id.replace("color-", "");
        const id = parseInt(idStr);
        if (element.querySelector("svg")) {
          continue;
        }
        if (id === 0) {
          continue;
        }
        const backgroundStyle = element.style.backgroundColor;
        if (backgroundStyle) {
          const rgbMatch = backgroundStyle.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const rgb = [
              parseInt(rgbMatch[0]),
              parseInt(rgbMatch[1]),
              parseInt(rgbMatch[2])
            ];
            const colorInfo = {
              id,
              element,
              rgb,
              name: element.title || element.getAttribute("aria-label") || `Color ${id}`,
              premium: element.classList.contains("premium") || element.querySelector(".premium")
            };
            colors.push(colorInfo);
          }
        }
      }
      log(`[BLUE MARBLE] ${colors.length} colores detectados del sitio`);
      return colors;
    }
    /**
     * Establece las coordenadas de posición (como Blue Marble)
     */
    setCoords(tileX, tileY, pixelX, pixelY) {
      this.coords = [tileX, tileY, pixelX, pixelY];
      log(`[BLUE MARBLE] Coordenadas establecidas: tile(${tileX},${tileY}) pixel(${pixelX},${pixelY})`);
    }
    /**
     * Analiza píxeles de la imagen y cuenta requeridos vs #deface (como Blue Marble)
     */
    async analyzePixels() {
      if (!this.bitmap) {
        throw new Error("Imagen no cargada. Llama a load() primero.");
      }
      log("[BLUE MARBLE] Analizando p\xEDxeles de la imagen...");
      try {
        const inspectCanvas = new OffscreenCanvas(this.imageWidth, this.imageHeight);
        const inspectCtx = inspectCanvas.getContext("2d", { willReadFrequently: true });
        inspectCtx.imageSmoothingEnabled = false;
        inspectCtx.clearRect(0, 0, this.imageWidth, this.imageHeight);
        inspectCtx.drawImage(this.bitmap, 0, 0);
        const inspectData = inspectCtx.getImageData(0, 0, this.imageWidth, this.imageHeight).data;
        let required = 0;
        let deface = 0;
        const paletteMap = /* @__PURE__ */ new Map();
        for (let y = 0; y < this.imageHeight; y++) {
          for (let x = 0; x < this.imageWidth; x++) {
            const idx = (y * this.imageWidth + x) * 4;
            const r = inspectData[idx];
            const g = inspectData[idx + 1];
            const b = inspectData[idx + 2];
            const a = inspectData[idx + 3];
            if (a === 0) continue;
            const key = `${r},${g},${b}`;
            if (r === 222 && g === 250 && b === 206) {
              deface++;
            }
            let matchedKey = key;
            let isValidPixel = this.allowedColorsSet.has(key);
            if (!isValidPixel && this.allowedColorsSet.has("255,255,255")) {
              if (r >= 245 && g >= 245 && b >= 245) {
                matchedKey = "255,255,255";
                isValidPixel = true;
              }
            }
            if (!isValidPixel) continue;
            required++;
            paletteMap.set(matchedKey, (paletteMap.get(matchedKey) || 0) + 1);
          }
        }
        this.requiredPixelCount = required;
        this.defacePixelCount = deface;
        const paletteObj = {};
        for (const [key, count] of paletteMap.entries()) {
          paletteObj[key] = { count, enabled: true };
        }
        this.colorPalette = paletteObj;
        log(`[BLUE MARBLE] An\xE1lisis completado:`);
        log(`  - P\xEDxeles requeridos: ${required.toLocaleString()}`);
        log(`  - P\xEDxeles #deface: ${deface.toLocaleString()}`);
        log(`  - Colores \xFAnicos: ${paletteMap.size}`);
        return {
          totalPixels: this.totalPixels,
          requiredPixels: required,
          defacePixels: deface,
          uniqueColors: paletteMap.size,
          colorPalette: paletteObj
        };
      } catch (_err) {
        this.requiredPixelCount = Math.max(0, this.totalPixels);
        this.defacePixelCount = 0;
        log("[BLUE MARBLE] Fallback: usando total de p\xEDxeles como requeridos");
        return {
          totalPixels: this.totalPixels,
          requiredPixels: this.totalPixels,
          defacePixels: 0,
          uniqueColors: 0,
          colorPalette: {}
        };
      }
    }
    /**
     * Crea tiles de template (proceso principal de Blue Marble)
     */
    async createTemplateTiles() {
      if (!this.bitmap) {
        throw new Error("Imagen no cargada. Llama a load() primero.");
      }
      log("[BLUE MARBLE] Creando tiles de template...");
      const templateTiles = {};
      const templateTilesBuffers = {};
      const canvas = new OffscreenCanvas(this.tileSize, this.tileSize);
      const context = canvas.getContext("2d", { willReadFrequently: true });
      for (let pixelY = this.coords[3]; pixelY < this.imageHeight + this.coords[3]; ) {
        const drawSizeY = Math.min(
          this.tileSize - pixelY % this.tileSize,
          this.imageHeight - (pixelY - this.coords[3])
        );
        for (let pixelX = this.coords[2]; pixelX < this.imageWidth + this.coords[2]; ) {
          const drawSizeX = Math.min(
            this.tileSize - pixelX % this.tileSize,
            this.imageWidth - (pixelX - this.coords[2])
          );
          const canvasWidth = drawSizeX * this.shreadSize;
          const canvasHeight = drawSizeY * this.shreadSize;
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
          context.imageSmoothingEnabled = false;
          context.clearRect(0, 0, canvasWidth, canvasHeight);
          context.drawImage(
            this.bitmap,
            // Bitmap de imagen a dibujar
            pixelX - this.coords[2],
            // Coordenada X desde donde dibujar
            pixelY - this.coords[3],
            // Coordenada Y desde donde dibujar
            drawSizeX,
            // Ancho X a dibujar desde
            drawSizeY,
            // Alto Y a dibujar desde
            0,
            // Coordenada X donde dibujar
            0,
            // Coordenada Y donde dibujar
            drawSizeX * this.shreadSize,
            // Ancho X donde dibujar
            drawSizeY * this.shreadSize
            // Alto Y donde dibujar
          );
          const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
          for (let y = 0; y < canvasHeight; y++) {
            for (let x = 0; x < canvasWidth; x++) {
              const pixelIndex = (y * canvasWidth + x) * 4;
              if (imageData.data[pixelIndex] === 222 && imageData.data[pixelIndex + 1] === 250 && imageData.data[pixelIndex + 2] === 206) {
                if ((x + y) % 2 === 0) {
                  imageData.data[pixelIndex] = 0;
                  imageData.data[pixelIndex + 1] = 0;
                  imageData.data[pixelIndex + 2] = 0;
                } else {
                  imageData.data[pixelIndex] = 255;
                  imageData.data[pixelIndex + 1] = 255;
                  imageData.data[pixelIndex + 2] = 255;
                }
                imageData.data[pixelIndex + 3] = 32;
              } else if (x % this.shreadSize !== 1 || y % this.shreadSize !== 1) {
                imageData.data[pixelIndex + 3] = 0;
              } else {
                const r = imageData.data[pixelIndex];
                const g = imageData.data[pixelIndex + 1];
                const b = imageData.data[pixelIndex + 2];
                if (!this.allowedColorsSet.has(`${r},${g},${b}`)) {
                  imageData.data[pixelIndex + 3] = 0;
                }
              }
            }
          }
          context.putImageData(imageData, 0, 0);
          const templateTileName = `${(this.coords[0] + Math.floor(pixelX / 1e3)).toString().padStart(4, "0")},${(this.coords[1] + Math.floor(pixelY / 1e3)).toString().padStart(4, "0")},${(pixelX % 1e3).toString().padStart(3, "0")},${(pixelY % 1e3).toString().padStart(3, "0")}`;
          templateTiles[templateTileName] = await createImageBitmap(canvas);
          this.tilePrefixes.add(templateTileName.split(",").slice(0, 2).join(","));
          const canvasBlob = await canvas.convertToBlob();
          const canvasBuffer = await canvasBlob.arrayBuffer();
          templateTilesBuffers[templateTileName] = canvasBuffer;
          pixelX += drawSizeX;
        }
        pixelY += drawSizeY;
      }
      this.templateTiles = templateTiles;
      this.templateTilesBuffers = templateTilesBuffers;
      log(`[BLUE MARBLE] Tiles creados: ${Object.keys(templateTiles).length} tiles`);
      log(`[BLUE MARBLE] Prefijos registrados: ${this.tilePrefixes.size} tiles \xFAnicos`);
      return { templateTiles, templateTilesBuffers };
    }
    /**
     * Genera cola de píxeles para pintar (compatible con Auto-Image)
     */
    generatePixelQueue() {
      if (!this.bitmap) {
        throw new Error("Imagen no cargada. Llama a load() primero.");
      }
      log("[BLUE MARBLE] Generando cola de p\xEDxeles...");
      const queue = [];
      const baseX = this.coords[0] * 1e3 + (this.coords[2] || 0);
      const baseY = this.coords[1] * 1e3 + (this.coords[3] || 0);
      const readCanvas = new OffscreenCanvas(this.imageWidth, this.imageHeight);
      const readCtx = readCanvas.getContext("2d", { willReadFrequently: true });
      readCtx.imageSmoothingEnabled = false;
      readCtx.drawImage(this.bitmap, 0, 0);
      const pixelData = readCtx.getImageData(0, 0, this.imageWidth, this.imageHeight).data;
      for (let y = 0; y < this.imageHeight; y++) {
        for (let x = 0; x < this.imageWidth; x++) {
          const idx = (y * this.imageWidth + x) * 4;
          const r = pixelData[idx];
          const g = pixelData[idx + 1];
          const b = pixelData[idx + 2];
          const alpha = pixelData[idx + 3];
          if (alpha === 0) continue;
          if (r === 222 && g === 250 && b === 206) continue;
          const colorKey = `${r},${g},${b}`;
          if (!this.allowedColorsSet.has(colorKey)) continue;
          const globalX = baseX + x;
          const globalY = baseY + y;
          const tileX = Math.floor(globalX / 1e3);
          const tileY = Math.floor(globalY / 1e3);
          const localX = globalX % 1e3;
          const localY = globalY % 1e3;
          const colorMeta = this.rgbToMeta.get(colorKey) || { id: 0, name: "Unknown" };
          queue.push({
            // Coordenadas de imagen (relativas)
            imageX: x,
            imageY: y,
            // Coordenadas globales
            globalX,
            globalY,
            // Coordenadas de tile/local
            tileX,
            tileY,
            localX,
            localY,
            // Información de color
            color: {
              r,
              g,
              b,
              id: colorMeta.id,
              name: colorMeta.name
            },
            originalColor: { r, g, b, alpha }
          });
        }
      }
      log(`[BLUE MARBLE] Cola generada: ${queue.length} p\xEDxeles v\xE1lidos`);
      return queue;
    }
    /**
     * Redimensiona la imagen (preserva proporciones por defecto)
     */
    async resize(newWidth, newHeight, keepAspectRatio = true) {
      if (!this.img) {
        throw new Error("Imagen no cargada. Llama a load() primero.");
      }
      const originalWidth = this.img.width;
      const originalHeight = this.img.height;
      if (keepAspectRatio) {
        const aspectRatio = originalWidth / originalHeight;
        if (newWidth / newHeight > aspectRatio) {
          newWidth = newHeight * aspectRatio;
        } else {
          newHeight = newWidth / aspectRatio;
        }
      }
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = newWidth;
      tempCanvas.height = newHeight;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.imageSmoothingEnabled = false;
      tempCtx.drawImage(this.img, 0, 0, newWidth, newHeight);
      const newDataUrl = tempCanvas.toDataURL();
      this.img.src = newDataUrl;
      this.imageSrc = newDataUrl;
      await new Promise((resolve) => {
        this.img.onload = async () => {
          this.bitmap = await createImageBitmap(this.img);
          this.imageWidth = this.bitmap.width;
          this.imageHeight = this.bitmap.height;
          this.totalPixels = this.imageWidth * this.imageHeight;
          resolve();
        };
      });
      log(`[BLUE MARBLE] Imagen redimensionada: ${originalWidth}\xD7${originalHeight} \u2192 ${this.imageWidth}\xD7${this.imageHeight}`);
      return {
        width: this.imageWidth,
        height: this.imageHeight
      };
    }
    /**
     * Obtiene información completa de la imagen procesada
     */
    getImageData() {
      return {
        width: this.imageWidth,
        height: this.imageHeight,
        totalPixels: this.totalPixels,
        requiredPixels: this.requiredPixelCount,
        defacePixels: this.defacePixelCount,
        colorPalette: this.colorPalette,
        coords: [...this.coords],
        originalName: this.originalName || "image.png",
        // Para compatibilidad con Auto-Image actual
        pixels: this.generatePixelQueue()
      };
    }
    /**
     * Genera preview de la imagen
     */
    generatePreview(maxWidth = 200, maxHeight = 200) {
      if (!this.img) return null;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { width: origWidth, height: origHeight } = this.img;
      const aspectRatio = origWidth / origHeight;
      let newWidth, newHeight;
      if (maxWidth / maxHeight > aspectRatio) {
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
      } else {
        newWidth = maxWidth;
        newHeight = maxWidth / aspectRatio;
      }
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.img, 0, 0, newWidth, newHeight);
      return canvas.toDataURL();
    }
    getDimensions() {
      return {
        width: this.imageWidth,
        height: this.imageHeight
      };
    }
  };

  // src/core/timing.js
  var sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  function detectSiteKey(fallback = "") {
    var _a;
    try {
      const el = document.querySelector("[data-sitekey]");
      if (el) {
        const key = el.getAttribute("data-sitekey");
        if (key && key.length > 10) return key;
      }
      const cf = document.querySelector(".cf-turnstile");
      if (cf && ((_a = cf.dataset) == null ? void 0 : _a.sitekey) && cf.dataset.sitekey.length > 10) {
        return cf.dataset.sitekey;
      }
      if (typeof window !== "undefined" && window.__TURNSTILE_SITEKEY && window.__TURNSTILE_SITEKEY.length > 10) {
        return window.__TURNSTILE_SITEKEY;
      }
    } catch {
    }
    return fallback;
  }

  // src/image/painter.js
  async function processImage(imageData, startPosition, onProgress, onComplete, onError) {
    const { width, height } = imageData;
    const { x: localStartX, y: localStartY } = startPosition;
    log(`Iniciando pintado: imagen(${width}x${height}) inicio LOCAL(${localStartX},${localStartY}) tile(${imageState.tileX},${imageState.tileY})`);
    if (!imageState.remainingPixels || imageState.remainingPixels.length === 0 || imageState.lastPosition.x === 0 && imageState.lastPosition.y === 0) {
      log("Generando cola de p\xEDxeles...");
      imageState.remainingPixels = generatePixelQueue(imageData, startPosition, imageState.tileX, imageState.tileY);
      if (imageState.lastPosition.x > 0 || imageState.lastPosition.y > 0) {
        imageState.remainingPixels = imageState.remainingPixels.filter((pixel) => {
          const pixelIndex = pixel.imageY * width + pixel.imageX;
          const lastIndex = imageState.lastPosition.y * width + imageState.lastPosition.x;
          return pixelIndex >= lastIndex;
        });
      }
      log(`Cola generada: ${imageState.remainingPixels.length} p\xEDxeles pendientes`);
      try {
        if (window.__WPA_PLAN_OVERLAY__) {
          window.__WPA_PLAN_OVERLAY__.injectStyles();
          window.__WPA_PLAN_OVERLAY__.setEnabled(true);
          if (imageState.startPosition && imageState.tileX !== void 0 && imageState.tileY !== void 0) {
            window.__WPA_PLAN_OVERLAY__.setAnchor({
              tileX: imageState.tileX,
              tileY: imageState.tileY,
              pxX: imageState.startPosition.x,
              pxY: imageState.startPosition.y
            });
          }
          window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
            enabled: true,
            nextBatchCount: imageState.pixelsPerBatch
          });
          log(`\u2705 Plan overlay actualizado con ${imageState.remainingPixels.length} p\xEDxeles en cola`);
        }
      } catch (e) {
        log("\u26A0\uFE0F Error actualizando plan overlay:", e);
      }
    }
    try {
      while (imageState.remainingPixels.length > 0 && !imageState.stopFlag) {
        let availableCharges = Math.floor(imageState.currentCharges);
        let pixelsPerBatch;
        if (imageState.isFirstBatch && imageState.useAllChargesFirst && availableCharges > 0) {
          pixelsPerBatch = Math.min(availableCharges, imageState.remainingPixels.length);
          imageState.isFirstBatch = false;
          log(`Primera pasada: usando ${pixelsPerBatch} cargas de ${availableCharges} disponibles`);
        } else {
          pixelsPerBatch = Math.min(imageState.pixelsPerBatch, imageState.remainingPixels.length);
        }
        if (availableCharges < pixelsPerBatch) {
          log(`Cargas insuficientes: ${availableCharges}/${pixelsPerBatch} necesarias`);
          await waitForCooldown(pixelsPerBatch - availableCharges, onProgress);
          availableCharges = Math.floor(imageState.currentCharges);
          if (!imageState.isFirstBatch) {
            pixelsPerBatch = Math.min(imageState.pixelsPerBatch, imageState.remainingPixels.length, availableCharges);
          }
          continue;
        }
        const batch = imageState.remainingPixels.splice(0, pixelsPerBatch);
        log(`Pintando lote de ${batch.length} p\xEDxeles...`);
        try {
          if (window.__WPA_PLAN_OVERLAY__) {
            window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
              enabled: true,
              // Mantener habilitado
              nextBatchCount: imageState.pixelsPerBatch
            });
          }
        } catch (e) {
          log("\u26A0\uFE0F Error actualizando plan overlay durante pintado:", e);
        }
        const result = await paintPixelBatchWithRetry(batch, onProgress);
        if (result.success && result.painted > 0) {
          imageState.paintedPixels += result.painted;
          imageState.currentCharges = Math.max(0, imageState.currentCharges - result.painted);
          log(`Cargas despu\xE9s del lote: ${imageState.currentCharges.toFixed(1)} (consumidas: ${result.painted})`);
          if (batch.length > 0) {
            const lastPixel = batch[batch.length - 1];
            imageState.lastPosition = { x: lastPixel.imageX, y: lastPixel.imageY };
          }
          log(`Lote exitoso: ${result.painted}/${batch.length} p\xEDxeles pintados. Total: ${imageState.paintedPixels}/${imageState.totalPixels}`);
          const estimatedTime = calculateEstimatedTime();
          const progressPercent = (imageState.paintedPixels / imageState.totalPixels * 100).toFixed(1);
          const successMessage = t("image.passCompleted", {
            painted: result.painted,
            percent: progressPercent,
            current: imageState.paintedPixels,
            total: imageState.totalPixels
          });
          if (onProgress) {
            onProgress(imageState.paintedPixels, imageState.totalPixels, successMessage, estimatedTime);
          }
          await sleep(2e3);
        } else if (result.shouldContinue) {
          log(`Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote...`);
        } else {
          imageState.remainingPixels.unshift(...batch);
          log(`Lote fall\xF3: reintentando en 5 segundos...`);
          await sleep(5e3);
        }
        await sleep(500);
      }
      if (imageState.stopFlag) {
        log(`Pintado pausado en p\xEDxel imagen(${imageState.lastPosition.x},${imageState.lastPosition.y})`);
        if (onComplete) {
          onComplete(false, imageState.paintedPixels);
        }
      } else {
        log(`Pintado completado: ${imageState.paintedPixels} p\xEDxeles pintados`);
        imageState.lastPosition = { x: 0, y: 0 };
        imageState.remainingPixels = [];
        try {
          if (window.__WPA_PLAN_OVERLAY__) {
            window.__WPA_PLAN_OVERLAY__.setPlan([], {
              enabled: true,
              // Mantener habilitado pero sin píxeles
              nextBatchCount: 0
            });
            log("\u2705 Plan overlay limpiado al completar pintado");
          }
        } catch (e) {
          log("\u26A0\uFE0F Error limpiando plan overlay:", e);
        }
        if (onComplete) {
          onComplete(true, imageState.paintedPixels);
        }
      }
    } catch (error) {
      log("Error en proceso de pintado:", error);
      if (onError) {
        onError(error);
      }
    }
  }
  async function paintPixelBatch(batch) {
    var _a;
    try {
      if (!batch || batch.length === 0) {
        return { success: false, painted: 0, error: "Lote vac\xEDo" };
      }
      const byTile = /* @__PURE__ */ new Map();
      for (const p of batch) {
        const key = `${p.tileX},${p.tileY}`;
        if (!byTile.has(key)) byTile.set(key, { coords: [], colors: [], tx: p.tileX, ty: p.tileY });
        const bucket = byTile.get(key);
        bucket.coords.push(p.localX, p.localY);
        bucket.colors.push(p.color.id || p.color.value || 1);
      }
      const siteKey = detectSiteKey(IMAGE_DEFAULTS.SITEKEY);
      const token = await getTurnstileToken(siteKey);
      let totalPainted = 0;
      for (const { coords, colors, tx, ty } of byTile.values()) {
        if (colors.length === 0) continue;
        const sanitized = [];
        for (let i = 0; i < coords.length; i += 2) {
          const x = (Number(coords[i]) % 1e3 + 1e3) % 1e3;
          const y = (Number(coords[i + 1]) % 1e3 + 1e3) % 1e3;
          if (Number.isFinite(x) && Number.isFinite(y)) {
            sanitized.push(x, y);
          }
        }
        try {
          let minX = 999, maxX = 0, minY = 999, maxY = 0;
          for (let i = 0; i < sanitized.length; i += 2) {
            const x = sanitized[i], y = sanitized[i + 1];
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
          log(`[IMG] Enviando tile ${tx},${ty}: ${colors.length} px | x:[${minX},${maxX}] y:[${minY},${maxY}]`);
        } catch (e) {
        }
        const resp = await postPixelBatchImage(tx, ty, sanitized, colors, token);
        if (resp.status !== 200) {
          return {
            success: false,
            painted: totalPainted,
            error: ((_a = resp.json) == null ? void 0 : _a.message) || `HTTP ${resp.status}`,
            status: resp.status
          };
        }
        totalPainted += resp.painted || 0;
      }
      return { success: true, painted: totalPainted };
    } catch (error) {
      log("Error en paintPixelBatch:", error);
      return {
        success: false,
        painted: 0,
        error: error.message
      };
    }
  }
  async function paintPixelBatchWithRetry(batch, onProgress) {
    const maxAttempts = 5;
    const baseDelay = 3e3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const result = await paintPixelBatch(batch);
        if (result.success) {
          imageState.retryCount = 0;
          return result;
        }
        imageState.retryCount = attempt;
        if (attempt < maxAttempts) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          const delaySeconds = Math.round(delay / 1e3);
          let errorMessage;
          if (result.status === 0 || result.status === "NetworkError") {
            errorMessage = t("image.networkError");
          } else if (result.status >= 500) {
            errorMessage = t("image.serverError");
          } else if (result.status === 408) {
            errorMessage = t("image.timeoutError");
          } else {
            errorMessage = t("image.retryAttempt", {
              attempt,
              maxAttempts,
              delay: delaySeconds
            });
          }
          if (onProgress) {
            onProgress(imageState.paintedPixels, imageState.totalPixels, errorMessage);
          }
          log(`Reintento ${attempt}/${maxAttempts} despu\xE9s de ${delaySeconds}s. Error: ${result.error}`);
          await sleep(delay);
        }
      } catch (error) {
        log(`Error en intento ${attempt}:`, error);
        imageState.retryCount = attempt;
        if (attempt < maxAttempts) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          const delaySeconds = Math.round(delay / 1e3);
          const errorMessage = t("image.retryError", {
            attempt,
            maxAttempts,
            delay: delaySeconds
          });
          if (onProgress) {
            onProgress(imageState.paintedPixels, imageState.totalPixels, errorMessage);
          }
          await sleep(delay);
        }
      }
    }
    imageState.retryCount = maxAttempts;
    const failMessage = t("image.retryFailed", { maxAttempts });
    if (onProgress) {
      onProgress(imageState.paintedPixels, imageState.totalPixels, failMessage);
    }
    log(`Fall\xF3 despu\xE9s de ${maxAttempts} intentos, continuando con siguiente lote`);
    return {
      success: false,
      painted: 0,
      error: `Fall\xF3 despu\xE9s de ${maxAttempts} intentos`,
      shouldContinue: true
      // Indica que debe continuar con el siguiente lote
    };
  }
  async function waitForCooldown(chargesNeeded, onProgress) {
    const chargeTime = IMAGE_DEFAULTS.CHARGE_REGEN_MS * chargesNeeded;
    const waitTime = chargeTime + 5e3;
    log(`Esperando ${Math.round(waitTime / 1e3)}s para obtener ${chargesNeeded} cargas`);
    imageState.inCooldown = true;
    imageState.cooldownEndTime = Date.now() + waitTime;
    imageState.nextBatchCooldown = Math.round(waitTime / 1e3);
    if (onProgress) {
      const minutes = Math.floor(waitTime / 6e4);
      const seconds = Math.floor(waitTime % 6e4 / 1e3);
      const timeText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
      const message = t("image.waitingChargesRegen", {
        current: Math.floor(imageState.currentCharges),
        needed: chargesNeeded,
        time: timeText
      });
      onProgress(imageState.paintedPixels, imageState.totalPixels, message);
    }
    for (let i = Math.round(waitTime / 1e3); i > 0; i--) {
      if (imageState.stopFlag) break;
      imageState.nextBatchCooldown = i;
      if (onProgress && (i % 5 === 0 || i <= 10 || i === Math.round(waitTime / 1e3))) {
        const minutes = Math.floor(i / 60);
        const seconds = i % 60;
        const timeText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        const message = t("image.waitingChargesCountdown", {
          current: Math.floor(imageState.currentCharges),
          needed: chargesNeeded,
          time: timeText
        });
        onProgress(imageState.paintedPixels, imageState.totalPixels, message);
      }
      await sleep(1e3);
    }
    imageState.inCooldown = false;
    imageState.nextBatchCooldown = 0;
    imageState.currentCharges = Math.min(
      imageState.maxCharges || 50,
      // usar maxCharges del estado
      imageState.currentCharges + waitTime / IMAGE_DEFAULTS.CHARGE_REGEN_MS
    );
  }
  function generatePixelQueue(imageData, startPosition, baseTileX, baseTileY) {
    const { pixels } = imageData;
    const { x: localStartX, y: localStartY } = startPosition;
    const queue = [];
    if (!Array.isArray(pixels)) {
      log(`\u274C Error: pixels no es un array iterable. Tipo: ${typeof pixels}`, pixels);
      return [];
    }
    for (const pixelData of pixels) {
      if (!pixelData) continue;
      const pixelX = pixelData.imageX !== void 0 ? pixelData.imageX : pixelData.x;
      const pixelY = pixelData.imageY !== void 0 ? pixelData.imageY : pixelData.y;
      const pixelColor = pixelData.color !== void 0 ? pixelData.color : pixelData.targetColor;
      if (pixelX === void 0 || pixelY === void 0) {
        log(`\u26A0\uFE0F P\xEDxel con coordenadas inv\xE1lidas:`, pixelData);
        continue;
      }
      const globalX = localStartX + pixelX;
      const globalY = localStartY + pixelY;
      const tileOffsetX = Math.floor(globalX / 1e3);
      const tileOffsetY = Math.floor(globalY / 1e3);
      const tx = baseTileX + tileOffsetX;
      const ty = baseTileY + tileOffsetY;
      const localX = (globalX % 1e3 + 1e3) % 1e3;
      const localY = (globalY % 1e3 + 1e3) % 1e3;
      queue.push({
        imageX: pixelX,
        imageY: pixelY,
        localX,
        localY,
        tileX: tx,
        tileY: ty,
        color: pixelColor,
        originalColor: pixelData.originalColor
      });
    }
    log(`Cola de p\xEDxeles generada: ${queue.length} p\xEDxeles para pintar`);
    return queue;
  }
  function calculateEstimatedTime() {
    if (!imageState.remainingPixels || imageState.remainingPixels.length === 0) {
      return 0;
    }
    const remainingPixels = imageState.remainingPixels.length;
    const batchSize = imageState.pixelsPerBatch;
    const chargeRegenTime = IMAGE_DEFAULTS.CHARGE_REGEN_MS / 1e3;
    const batchesNeeded = Math.ceil(remainingPixels / batchSize);
    const waitTimeBetweenBatches = batchSize * chargeRegenTime;
    const totalWaitTime = (batchesNeeded - 1) * waitTimeBetweenBatches;
    const executionTime = batchesNeeded * 2;
    return Math.ceil(totalWaitTime + executionTime);
  }
  function stopPainting() {
    imageState.stopFlag = true;
    imageState.running = false;
    log("\u{1F6D1} Deteniendo proceso de pintado...");
  }

  // src/image/save-load.js
  function saveProgress(filename = null) {
    try {
      if (!imageState.imageData || imageState.paintedPixels === 0) {
        throw new Error("No hay progreso para guardar");
      }
      const progressData = {
        version: "1.0",
        timestamp: Date.now(),
        imageData: {
          width: imageState.imageData.width,
          height: imageState.imageData.height,
          originalName: imageState.originalImageName
        },
        progress: {
          paintedPixels: imageState.paintedPixels,
          totalPixels: imageState.totalPixels,
          lastPosition: { ...imageState.lastPosition }
        },
        position: {
          startPosition: { ...imageState.startPosition },
          tileX: imageState.tileX,
          tileY: imageState.tileY
        },
        config: {
          pixelsPerBatch: imageState.pixelsPerBatch,
          useAllChargesFirst: imageState.useAllChargesFirst,
          isFirstBatch: imageState.isFirstBatch,
          maxCharges: imageState.maxCharges
        },
        // Filtrar solo los datos serializables de los colores (sin elementos DOM)
        colors: imageState.availableColors.map((color) => ({
          id: color.id,
          r: color.r,
          g: color.g,
          b: color.b
        })),
        remainingPixels: imageState.remainingPixels || []
      };
      const dataStr = JSON.stringify(progressData, null, 2);
      const blob = new window.Blob([dataStr], { type: "application/json" });
      const finalFilename = filename || `wplace_progress_${imageState.originalImageName || "image"}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-")}.json`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = finalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      log(`\u2705 Progreso guardado: ${finalFilename}`);
      return { success: true, filename: finalFilename };
    } catch (error) {
      log("\u274C Error guardando progreso:", error);
      return { success: false, error: error.message };
    }
  }
  async function loadProgress(file) {
    return new Promise((resolve) => {
      try {
        const reader = new window.FileReader();
        reader.onload = (e) => {
          try {
            const progressData = JSON.parse(e.target.result);
            const requiredFields = ["imageData", "progress", "position", "colors"];
            const missingFields = requiredFields.filter((field) => !(field in progressData));
            if (missingFields.length > 0) {
              throw new Error(`Campos requeridos faltantes: ${missingFields.join(", ")}`);
            }
            if (imageState.availableColors.length > 0) {
              const savedColorIds = progressData.colors.map((c) => c.id);
              const currentColorIds = imageState.availableColors.map((c) => c.id);
              const commonColors = savedColorIds.filter((id) => currentColorIds.includes(id));
              if (commonColors.length < savedColorIds.length * 0.8) {
                log("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales");
              }
            }
            imageState.imageData = {
              ...progressData.imageData,
              pixels: []
              // Los píxeles se regenerarán si es necesario
            };
            imageState.paintedPixels = progressData.progress.paintedPixels;
            imageState.totalPixels = progressData.progress.totalPixels;
            if (progressData.progress.lastPosition) {
              imageState.lastPosition = progressData.progress.lastPosition;
            } else if (progressData.position.lastX !== void 0 && progressData.position.lastY !== void 0) {
              imageState.lastPosition = { x: progressData.position.lastX, y: progressData.position.lastY };
            }
            if (progressData.position.startPosition) {
              imageState.startPosition = progressData.position.startPosition;
            } else if (progressData.position.startX !== void 0 && progressData.position.startY !== void 0) {
              imageState.startPosition = { x: progressData.position.startX, y: progressData.position.startY };
            }
            imageState.tileX = progressData.position.tileX;
            imageState.tileY = progressData.position.tileY;
            imageState.originalImageName = progressData.imageData.originalName;
            imageState.remainingPixels = progressData.remainingPixels || progressData.progress.remainingPixels || [];
            try {
              if (window.__WPA_PLAN_OVERLAY__) {
                window.__WPA_PLAN_OVERLAY__.injectStyles();
                window.__WPA_PLAN_OVERLAY__.setEnabled(true);
                if (imageState.startPosition && imageState.tileX !== void 0 && imageState.tileY !== void 0) {
                  window.__WPA_PLAN_OVERLAY__.setAnchor({
                    tileX: imageState.tileX,
                    tileY: imageState.tileY,
                    pxX: imageState.startPosition.x,
                    pxY: imageState.startPosition.y
                  });
                  log(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${imageState.tileX},${imageState.tileY}) local(${imageState.startPosition.x},${imageState.startPosition.y})`);
                }
                window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
                  enabled: true,
                  nextBatchCount: imageState.pixelsPerBatch
                });
                log(`\u2705 Plan overlay activado con ${imageState.remainingPixels.length} p\xEDxeles restantes`);
              }
            } catch (e2) {
              log("\u26A0\uFE0F Error activando plan overlay al cargar progreso:", e2);
            }
            if (progressData.config) {
              imageState.pixelsPerBatch = progressData.config.pixelsPerBatch || imageState.pixelsPerBatch;
              imageState.useAllChargesFirst = progressData.config.useAllChargesFirst !== void 0 ? progressData.config.useAllChargesFirst : imageState.useAllChargesFirst;
              imageState.isFirstBatch = progressData.config.isFirstBatch !== void 0 ? progressData.config.isFirstBatch : true;
              imageState.maxCharges = progressData.config.maxCharges || imageState.maxCharges;
            }
            imageState.imageLoaded = true;
            imageState.colorsChecked = true;
            log(`\u2705 Progreso cargado: ${imageState.paintedPixels}/${imageState.totalPixels} p\xEDxeles`);
            resolve({
              success: true,
              data: progressData,
              painted: imageState.paintedPixels,
              total: imageState.totalPixels,
              canContinue: imageState.remainingPixels.length > 0
            });
          } catch (parseError) {
            log("\u274C Error parseando archivo de progreso:", parseError);
            resolve({ success: false, error: parseError.message });
          }
        };
        reader.onerror = () => {
          const error = "Error leyendo archivo";
          log("\u274C", error);
          resolve({ success: false, error });
        };
        reader.readAsText(file);
      } catch (error) {
        log("\u274C Error cargando progreso:", error);
        resolve({ success: false, error: error.message });
      }
    });
  }
  function clearProgress() {
    imageState.paintedPixels = 0;
    imageState.totalPixels = 0;
    imageState.lastPosition = { x: 0, y: 0 };
    imageState.remainingPixels = [];
    imageState.imageData = null;
    imageState.startPosition = null;
    imageState.imageLoaded = false;
    imageState.originalImageName = null;
    imageState.isFirstBatch = true;
    imageState.nextBatchCooldown = 0;
    log("\u{1F9F9} Progreso limpiado");
  }
  function hasProgress() {
    return imageState.imageLoaded && imageState.paintedPixels > 0 && imageState.remainingPixels && imageState.remainingPixels.length > 0;
  }
  function getProgressInfo() {
    return {
      hasProgress: hasProgress(),
      painted: imageState.paintedPixels,
      total: imageState.totalPixels,
      remaining: imageState.remainingPixels ? imageState.remainingPixels.length : 0,
      percentage: imageState.totalPixels > 0 ? imageState.paintedPixels / imageState.totalPixels * 100 : 0,
      lastPosition: { ...imageState.lastPosition },
      canContinue: hasProgress()
    };
  }

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

  // src/image/ui.js
  async function createImageUI({ texts, ...handlers }) {
    log("\u{1F3A8} Creando interfaz de Auto-Image");
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fontAwesome = document.createElement("link");
      fontAwesome.rel = "stylesheet";
      fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
      document.head.appendChild(fontAwesome);
      log("\u{1F4E6} FontAwesome a\xF1adido al document.head");
    }
    const { host, root } = createShadowRoot();
    const style = document.createElement("style");
    style.textContent = `
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
    }
    
    .container {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      z-index: 9998;
      font-family: 'Segoe UI', Roboto, sans-serif;
      color: #eee;
      animation: slideIn 0.4s ease-out;
      overflow: hidden;
    }
    
    .header {
      padding: 12px 15px;
      background: #2d3748;
      color: #60a5fa;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;
      user-select: none;
    }
    
    .header-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .header-controls {
      display: flex;
      gap: 10px;
    }
    
    .header-btn {
      background: none;
      border: none;
      color: #eee;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
      padding: 5px;
    }
    
    .header-btn:hover {
      opacity: 1;
    }
    
    .content {
      padding: 15px;
      display: block;
    }
    
    .controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 15px;
    }
    
    .config-panel {
      display: none;
      background: #2d3748;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 10px;
    }
    
    .config-panel.visible {
      display: block;
    }
    
    .config-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .config-input {
      width: 60px;
      padding: 4px;
      border: 1px solid #333;
      border-radius: 4px;
      background: #1a1a1a;
      color: #eee;
      text-align: center;
    }
    
    .config-checkbox {
      margin-right: 8px;
    }
    
    .main-config {
      background: #2d3748;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 10px;
      border: 1px solid #3a4553;
    }
    
    .config-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    
    .config-label {
      font-size: 13px;
      color: #cbd5e0;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .batch-value, .cooldown-value {
      font-weight: bold;
      color: #60a5fa;
    }
    
    .btn {
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
      font-size: 14px;
    }
    
    .btn:hover:not(:disabled) {
      transform: translateY(-2px);
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
    
    .btn-primary {
      background: #60a5fa;
      color: white;
    }
    
    .btn-upload {
      background: #2d3748;
      color: white;
      border: 1px dashed #eee;
    }
    
    .btn-load {
      background: #2196F3;
      color: white;
    }
    
    .btn-start {
      background: #10b981;
      color: white;
    }
    
    .btn-stop {
      background: #ef4444;
      color: white;
    }
    
    .btn-select {
      background: #f59e0b;
      color: black;
    }
    
    .progress {
      width: 100%;
      background: #2d3748;
      border-radius: 4px;
      margin: 10px 0;
      overflow: hidden;
      height: 10px;
    }
    
    .progress-bar {
      height: 100%;
      background: #60a5fa;
      transition: width 0.3s;
      width: 0%;
    }
    
    .stats {
      background: #2d3748;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 15px;
    }
    
    .stat-item {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 14px;
    }
    
    .stat-label {
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.8;
    }
    
    .status {
      padding: 8px;
      border-radius: 4px;
      text-align: center;
      font-size: 13px;
    }
    
    .status-default {
      background: rgba(255,255,255,0.1);
    }
    
    .status-success {
      background: rgba(0, 255, 0, 0.1);
      color: #10b981;
    }
    
    .status-error {
      background: rgba(255, 0, 0, 0.1);
      color: #ef4444;
    }
    
    .status-warning {
      background: rgba(255, 165, 0, 0.1);
      color: orange;
    }
    
    .status-info {
      background: rgba(0, 150, 255, 0.1);
      color: #60a5fa;
    }
    
    .minimized .content {
      display: none;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal {
      background: #1a1a1a;
      border: 2px solid #333;
      border-radius: 15px;
      padding: 25px;
      color: #eee;
      min-width: 350px;
      max-width: 400px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    .modal h3 {
      margin: 0 0 15px 0;
      text-align: center;
      font-size: 18px;
    }
    
    .modal p {
      margin: 0 0 20px 0;
      text-align: center;
      line-height: 1.4;
    }
    
    .modal-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    
    .modal-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      min-width: 100px;
    }
    
    .modal-btn-save {
      background: #10b981;
      color: white;
    }
    
    .modal-btn-discard {
      background: #ef4444;
      color: white;
    }
    
    .modal-btn-cancel {
      background: #2d3748;
      color: white;
    }
    
    .modal-btn:hover {
      transform: translateY(-2px);
    }
    
    /* Resize Dialog Styles */
    .resize-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 9999;
      display: none;
    }
    
    .resize-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1a1a1a;
      padding: 20px;
      border-radius: 8px;
      z-index: 10000;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
      max-width: 90%;
      max-height: 90%;
      overflow: auto;
      color: #ffffff;
      display: none;
    }
    
    .resize-container h3 {
      margin: 0 0 15px 0;
      color: #ffffff;
    }
    
    .resize-controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 15px;
    }
    
    .resize-controls label {
      color: #ffffff;
      font-size: 14px;
    }
    
    .resize-slider {
      width: 100%;
      margin: 5px 0;
    }
    
    .resize-preview {
      max-width: 100%;
      max-height: 300px;
      margin: 10px 0;
      border: 1px solid #333;
      display: block;
    }
    
    .resize-buttons {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
  `;
    root.appendChild(style);
    const container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `
    <div class="header">
      <div class="header-title">
        \u{1F5BC}\uFE0F
        <span>${texts.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          \u2699\uFE0F
        </button>
        <button class="header-btn minimize-btn" title="${texts.minimize}">
          \u2796
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${texts.batchSize}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="20">
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            ${texts.useAllCharges}
          </label>
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox show-overlay" type="checkbox" checked>
            ${texts.showOverlay || "Mostrar overlay"}
          </label>
        </div>
      </div>
      
      <!-- Configuraci\xF3n visible en la interfaz principal -->
      <div class="main-config">
        <div class="config-row">
          <div class="config-label">
            \u{1F3AF} ${texts.batchSize}:
            <span class="batch-value">20</span>
          </div>
          <div class="config-label">
            \u23F1\uFE0F ${texts.nextBatchTime}:
            <span class="cooldown-value">--</span>
          </div>
        </div>
      </div>
      
      <div class="controls">
        <button class="btn btn-primary init-btn">
          \u{1F916}
          <span>${texts.initBot}</span>
        </button>
        <button class="btn btn-upload upload-btn" disabled>
          \u{1F4E4}
          <span>${texts.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          \u{1F4C1}
          <span>${texts.loadProgress}</span>
        </button>
        <button class="btn btn-primary resize-btn" disabled>
          \u{1F504}
          <span>${texts.resizeImage}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          \u{1F3AF}
          <span>${texts.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          \u25B6\uFE0F
          <span>${texts.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          \u23F9\uFE0F
          <span>${texts.stopPainting}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label">\u2139\uFE0F ${texts.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${texts.waitingInit}
      </div>
    </div>
  `;
    root.appendChild(container);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png,image/jpeg";
    fileInput.style.display = "none";
    root.appendChild(fileInput);
    const progressFileInput = document.createElement("input");
    progressFileInput.type = "file";
    progressFileInput.accept = ".json";
    progressFileInput.style.display = "none";
    root.appendChild(progressFileInput);
    const resizeOverlay = document.createElement("div");
    resizeOverlay.className = "resize-overlay";
    root.appendChild(resizeOverlay);
    const resizeContainer = document.createElement("div");
    resizeContainer.className = "resize-container";
    resizeContainer.innerHTML = `
    <h3>${texts.resizeImage}</h3>
    <div class="resize-controls">
      <label>
        ${texts.width}: <span class="width-value">0</span>px
        <input type="range" class="resize-slider width-slider" min="10" max="500" value="100">
      </label>
      <label>
        ${texts.height}: <span class="height-value">0</span>px
        <input type="range" class="resize-slider height-slider" min="10" max="500" value="100">
      </label>
      <label>
        <input type="checkbox" class="keep-aspect" checked>
        ${texts.keepAspect}
      </label>
      <img class="resize-preview" src="" alt="Preview">
      <div class="resize-buttons">
        <button class="btn btn-primary confirm-resize">
          \u2705
          <span>${texts.apply}</span>
        </button>
        <button class="btn btn-stop cancel-resize">
          \u274C
          <span>${texts.cancel}</span>
        </button>
      </div>
    </div>
  `;
    root.appendChild(resizeContainer);
    const elements = {
      header: container.querySelector(".header"),
      configBtn: container.querySelector(".config-btn"),
      minimizeBtn: container.querySelector(".minimize-btn"),
      configPanel: container.querySelector(".config-panel"),
      pixelsPerBatch: container.querySelector(".pixels-per-batch"),
      useAllCharges: container.querySelector(".use-all-charges"),
      showOverlay: container.querySelector(".show-overlay"),
      batchValue: container.querySelector(".batch-value"),
      cooldownValue: container.querySelector(".cooldown-value"),
      initBtn: container.querySelector(".init-btn"),
      uploadBtn: container.querySelector(".upload-btn"),
      loadProgressBtn: container.querySelector(".load-progress-btn"),
      resizeBtn: container.querySelector(".resize-btn"),
      selectPosBtn: container.querySelector(".select-pos-btn"),
      startBtn: container.querySelector(".start-btn"),
      stopBtn: container.querySelector(".stop-btn"),
      progressBar: container.querySelector(".progress-bar"),
      statsArea: container.querySelector(".stats-area"),
      status: container.querySelector(".status"),
      content: container.querySelector(".content")
    };
    const resizeElements = {
      overlay: resizeOverlay,
      container: resizeContainer,
      widthSlider: resizeContainer.querySelector(".width-slider"),
      heightSlider: resizeContainer.querySelector(".height-slider"),
      widthValue: resizeContainer.querySelector(".width-value"),
      heightValue: resizeContainer.querySelector(".height-value"),
      keepAspect: resizeContainer.querySelector(".keep-aspect"),
      preview: resizeContainer.querySelector(".resize-preview"),
      confirmBtn: resizeContainer.querySelector(".confirm-resize"),
      cancelBtn: resizeContainer.querySelector(".cancel-resize")
    };
    let state = {
      minimized: false,
      configVisible: false
    };
    makeDraggable(elements.header, container);
    elements.minimizeBtn.addEventListener("click", () => {
      state.minimized = !state.minimized;
      if (state.minimized) {
        container.classList.add("minimized");
        elements.minimizeBtn.innerHTML = "\u{1F53C}";
      } else {
        container.classList.remove("minimized");
        elements.minimizeBtn.innerHTML = "\u{1F53D}";
      }
    });
    elements.configBtn.addEventListener("click", () => {
      state.configVisible = !state.configVisible;
      if (state.configVisible) {
        elements.configPanel.classList.add("visible");
        elements.configBtn.innerHTML = "\u274C";
      } else {
        elements.configPanel.classList.remove("visible");
        elements.configBtn.innerHTML = "\u2699\uFE0F";
      }
    });
    elements.pixelsPerBatch.addEventListener("change", () => {
      const value = parseInt(elements.pixelsPerBatch.value) || 20;
      elements.batchValue.textContent = value;
      if (handlers.onConfigChange) {
        handlers.onConfigChange({ pixelsPerBatch: value });
      }
    });
    elements.useAllCharges.addEventListener("change", () => {
      if (handlers.onConfigChange) {
        handlers.onConfigChange({ useAllCharges: elements.useAllCharges.checked });
      }
    });
    function enableButtonsAfterInit() {
      elements.uploadBtn.disabled = false;
      elements.loadProgressBtn.disabled = false;
    }
    elements.initBtn.addEventListener("click", async () => {
      elements.initBtn.disabled = true;
      if (handlers.onInitBot) {
        const success = await handlers.onInitBot();
        if (success) {
          enableButtonsAfterInit();
        }
      }
      elements.initBtn.disabled = false;
    });
    elements.uploadBtn.addEventListener("click", () => {
      fileInput.click();
    });
    fileInput.addEventListener("change", async () => {
      if (fileInput.files.length > 0 && handlers.onUploadImage) {
        const success = await handlers.onUploadImage(fileInput.files[0]);
        if (success) {
          elements.selectPosBtn.disabled = false;
          elements.resizeBtn.disabled = false;
        }
      }
    });
    elements.loadProgressBtn.addEventListener("click", () => {
      progressFileInput.click();
    });
    progressFileInput.addEventListener("change", async () => {
      if (progressFileInput.files.length > 0 && handlers.onLoadProgress) {
        const success = await handlers.onLoadProgress(progressFileInput.files[0]);
        if (success) {
          elements.selectPosBtn.disabled = false;
          elements.startBtn.disabled = false;
          elements.resizeBtn.disabled = false;
        }
      }
    });
    elements.resizeBtn.addEventListener("click", () => {
      if (handlers.onResizeImage) {
        handlers.onResizeImage();
      }
    });
    elements.selectPosBtn.addEventListener("click", async () => {
      if (handlers.onSelectPosition) {
        elements.selectPosBtn.disabled = true;
        const success = await handlers.onSelectPosition();
        if (success) {
          elements.startBtn.disabled = false;
        }
        elements.selectPosBtn.disabled = false;
      }
    });
    elements.showOverlay.addEventListener("change", () => {
      if (!window.__WPA_PLAN_OVERLAY__) return;
      window.__WPA_PLAN_OVERLAY__.injectStyles();
      const isEnabled = elements.showOverlay.checked;
      window.__WPA_PLAN_OVERLAY__.setEnabled(isEnabled);
    });
    elements.startBtn.addEventListener("click", async () => {
      if (handlers.onStartPainting) {
        elements.startBtn.disabled = true;
        elements.stopBtn.disabled = false;
        const success = await handlers.onStartPainting();
        if (!success) {
          elements.startBtn.disabled = false;
          elements.stopBtn.disabled = true;
        }
      }
    });
    elements.stopBtn.addEventListener("click", async () => {
      if (handlers.onStopPainting) {
        const shouldStop = await handlers.onStopPainting();
        if (shouldStop) {
          elements.startBtn.disabled = false;
          elements.stopBtn.disabled = true;
        }
      }
    });
    function setStatus(message, type = "default") {
      elements.status.textContent = message;
      elements.status.className = `status status-${type}`;
      elements.status.style.animation = "none";
      void elements.status.offsetWidth;
      elements.status.style.animation = "slideIn 0.3s ease-out";
    }
    function showResizeDialog(processor) {
      const { width, height } = processor.getDimensions();
      const aspectRatio = width / height;
      resizeElements.widthSlider.value = width;
      resizeElements.heightSlider.value = height;
      resizeElements.widthValue.textContent = width;
      resizeElements.heightValue.textContent = height;
      resizeElements.preview.src = processor.img.src;
      resizeElements.overlay.style.display = "block";
      resizeElements.container.style.display = "block";
      const updatePreview = () => {
        const newWidth = parseInt(resizeElements.widthSlider.value);
        const newHeight = parseInt(resizeElements.heightSlider.value);
        resizeElements.widthValue.textContent = newWidth;
        resizeElements.heightValue.textContent = newHeight;
        resizeElements.preview.src = processor.generatePreview(newWidth, newHeight);
      };
      const onWidthChange = () => {
        if (resizeElements.keepAspect.checked) {
          const newWidth = parseInt(resizeElements.widthSlider.value);
          const newHeight = Math.round(newWidth / aspectRatio);
          resizeElements.heightSlider.value = newHeight;
        }
        updatePreview();
      };
      const onHeightChange = () => {
        if (resizeElements.keepAspect.checked) {
          const newHeight = parseInt(resizeElements.heightSlider.value);
          const newWidth = Math.round(newHeight * aspectRatio);
          resizeElements.widthSlider.value = newWidth;
        }
        updatePreview();
      };
      resizeElements.widthSlider.addEventListener("input", onWidthChange);
      resizeElements.heightSlider.addEventListener("input", onHeightChange);
      const onConfirm = () => {
        const newWidth = parseInt(resizeElements.widthSlider.value);
        const newHeight = parseInt(resizeElements.heightSlider.value);
        if (handlers.onConfirmResize) {
          handlers.onConfirmResize(processor, newWidth, newHeight);
        }
        closeResizeDialog();
      };
      const onCancel = () => {
        closeResizeDialog();
      };
      resizeElements.confirmBtn.addEventListener("click", onConfirm);
      resizeElements.cancelBtn.addEventListener("click", onCancel);
      resizeElements.overlay.addEventListener("click", onCancel);
      window.cleanupResizeDialog = () => {
        resizeElements.widthSlider.removeEventListener("input", onWidthChange);
        resizeElements.heightSlider.removeEventListener("input", onHeightChange);
        resizeElements.confirmBtn.removeEventListener("click", onConfirm);
        resizeElements.cancelBtn.removeEventListener("click", onCancel);
        resizeElements.overlay.removeEventListener("click", onCancel);
      };
      updatePreview();
    }
    function closeResizeDialog() {
      resizeElements.overlay.style.display = "none";
      resizeElements.container.style.display = "none";
      if (window.cleanupResizeDialog) {
        window.cleanupResizeDialog();
        delete window.cleanupResizeDialog;
      }
    }
    function updateProgress(current, total, userInfo = null) {
      const percentage = total > 0 ? current / total * 100 : 0;
      elements.progressBar.style.width = `${percentage}%`;
      let statsHTML = `
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${texts.progress}</div>
        <div>${current}/${total} (${percentage.toFixed(1)}%)</div>
      </div>
    `;
      if (userInfo) {
        if (userInfo.username) {
          statsHTML += `
          <div class="stat-item">
            <div class="stat-label">\u{1F464} ${texts.userName}</div>
            <div>${userInfo.username}</div>
          </div>
        `;
        }
        if (userInfo.charges !== void 0) {
          statsHTML += `
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${texts.charges}</div>
            <div>${Math.floor(userInfo.charges)}</div>
          </div>
        `;
        }
        if (userInfo.pixels !== void 0) {
          statsHTML += `
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${texts.pixels}</div>
            <div>${userInfo.pixels.toLocaleString()}</div>
          </div>
        `;
        }
        if (userInfo.estimatedTime !== void 0 && userInfo.estimatedTime > 0) {
          const hours = Math.floor(userInfo.estimatedTime / 3600);
          const minutes = Math.floor(userInfo.estimatedTime % 3600 / 60);
          const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
          statsHTML += `
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${texts.timeRemaining}</div>
            <div>${timeStr}</div>
          </div>
        `;
        }
      }
      elements.statsArea.innerHTML = statsHTML;
    }
    function updateCooldownDisplay(seconds) {
      if (seconds > 0) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const timeStr = minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
        elements.cooldownValue.textContent = timeStr;
      } else {
        elements.cooldownValue.textContent = "--";
      }
    }
    function updateCooldownMessage(message) {
      if (message && message.includes("\u23F3")) {
        elements.status.textContent = message;
        elements.status.className = "status status-info";
      } else if (message) {
        setStatus(message, "info");
      }
    }
    function setInitialized(isInitialized) {
      if (isInitialized) {
        elements.initBtn.disabled = true;
        elements.initBtn.style.opacity = "0.6";
        elements.initBtn.innerHTML = `\u2705 <span>${texts.initBot} - Completado</span>`;
      } else {
        elements.initBtn.disabled = false;
        elements.initBtn.style.opacity = "1";
        elements.initBtn.innerHTML = `\u{1F916} <span>${texts.initBot}</span>`;
      }
    }
    function setInitButtonVisible(visible) {
      elements.initBtn.style.display = visible ? "flex" : "none";
    }
    function destroy() {
      host.remove();
    }
    log("\u2705 Interfaz de Auto-Image creada");
    return {
      setStatus,
      updateProgress,
      updateCooldownDisplay,
      updateCooldownMessage,
      setInitialized,
      setInitButtonVisible,
      enableButtonsAfterInit,
      showResizeDialog,
      closeResizeDialog,
      destroy
    };
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

  // src/image/plan-overlay-blue-marble.js
  (() => {
    const TILE_SIZE = 3e3;
    const state = {
      enabled: false,
      templates: [],
      // Plantillas estilo Blue Marble
      templatesShouldBeDrawn: true,
      tileSize: 1e3,
      // Tamaño de tile (como Blue Marble)
      drawMult: 3,
      // Multiplicador de dibujo
      // Plan de píxeles actual
      pixelPlan: null,
      nextBatchCount: 0,
      anchor: null,
      // { tileX, tileY, pxX, pxY }
      imageWidth: null,
      imageHeight: null,
      // Sistema de intercepción
      originalFetch: null,
      fetchedBlobQueue: /* @__PURE__ */ new Map(),
      isIntercepting: false
    };
    function injectStyles() {
      console.log("[PLAN OVERLAY] Blue Marble tile system initialized");
    }
    function startFetchInterception() {
      if (state.isIntercepting) return;
      state.originalFetch = window.fetch;
      state.isIntercepting = true;
      window.fetch = async function(...args) {
        var _a;
        const response = await state.originalFetch.apply(this, args);
        const cloned = response.clone();
        const endpointName = (args[0] instanceof Request ? (_a = args[0]) == null ? void 0 : _a.url : args[0]) || "ignore";
        const contentType = cloned.headers.get("content-type") || "";
        if (contentType.includes("image/") && endpointName.includes("/tiles/") && !endpointName.includes("openfreemap") && !endpointName.includes("maps")) {
          console.log("[PLAN OVERLAY] Intercepting tile request:", endpointName);
          try {
            const blob = await cloned.blob();
            const processedBlob = await drawPlanOnTile(blob, endpointName);
            return new Response(processedBlob, {
              headers: cloned.headers,
              status: cloned.status,
              statusText: cloned.statusText
            });
          } catch (error) {
            console.error("[PLAN OVERLAY] Error processing tile:", error);
            return response;
          }
        }
        return response;
      };
      console.log("[PLAN OVERLAY] Fetch interception started");
    }
    function stopFetchInterception() {
      if (!state.isIntercepting || !state.originalFetch) return;
      window.fetch = state.originalFetch;
      state.isIntercepting = false;
      console.log("[PLAN OVERLAY] Fetch interception stopped");
    }
    async function drawPlanOnTile(tileBlob, endpointUrl) {
      if (!state.enabled || !state.templatesShouldBeDrawn || !state.pixelPlan) {
        return tileBlob;
      }
      const urlParts = endpointUrl.split("/");
      const tileY = parseInt(urlParts[urlParts.length - 1].replace(".png", ""));
      const tileX = parseInt(urlParts[urlParts.length - 2]);
      if (isNaN(tileX) || isNaN(tileY)) {
        console.warn("[PLAN OVERLAY] Could not extract tile coordinates from URL:", endpointUrl);
        return tileBlob;
      }
      console.log(`[PLAN OVERLAY] Processing tile: ${tileX},${tileY}`);
      const tilePixels = getPixelsForTile(tileX, tileY);
      if (tilePixels.length === 0) {
        return tileBlob;
      }
      console.log(`[PLAN OVERLAY] Found ${tilePixels.length} pixels for tile ${tileX},${tileY}`);
      const drawSize = state.tileSize * state.drawMult;
      const tileBitmap = await createImageBitmap(tileBlob);
      const canvas = new OffscreenCanvas(drawSize, drawSize);
      const context = canvas.getContext("2d");
      context.imageSmoothingEnabled = false;
      context.clearRect(0, 0, drawSize, drawSize);
      context.drawImage(tileBitmap, 0, 0, drawSize, drawSize);
      drawPixelsOnTile(context, tilePixels, tileX, tileY);
      return await canvas.convertToBlob({ type: "image/png" });
    }
    function getPixelsForTile(tileX, tileY) {
      if (!state.pixelPlan || !state.pixelPlan.pixels) return [];
      return state.pixelPlan.pixels.filter((pixel) => {
        const pixelTileX = Math.floor(pixel.globalX / TILE_SIZE);
        const pixelTileY = Math.floor(pixel.globalY / TILE_SIZE);
        return pixelTileX === tileX && pixelTileY === tileY;
      });
    }
    function drawPixelsOnTile(context, pixels, tileX, tileY) {
      const tileStartX = tileX * TILE_SIZE;
      const tileStartY = tileY * TILE_SIZE;
      context.globalAlpha = 0.7;
      for (const pixel of pixels) {
        const localX = (pixel.globalX - tileStartX) * state.drawMult + 1;
        const localY = (pixel.globalY - tileStartY) * state.drawMult + 1;
        if (localX >= 0 && localX < state.tileSize * state.drawMult && localY >= 0 && localY < state.tileSize * state.drawMult) {
          context.fillStyle = `rgb(${pixel.r},${pixel.g},${pixel.b})`;
          context.fillRect(localX, localY, 1, 1);
        }
      }
      if (state.nextBatchCount > 0) {
        context.globalAlpha = 1;
        const batchPixels = pixels.slice(0, state.nextBatchCount);
        for (const pixel of batchPixels) {
          const localX = (pixel.globalX - tileStartX) * state.drawMult + 1;
          const localY = (pixel.globalY - tileStartY) * state.drawMult + 1;
          if (localX >= 0 && localX < state.tileSize * state.drawMult && localY >= 0 && localY < state.tileSize * state.drawMult) {
            context.fillStyle = `rgb(${pixel.r},${pixel.g},${pixel.b})`;
            context.fillRect(localX, localY, 1, 1);
          }
        }
      }
    }
    function setEnabled(enabled) {
      state.enabled = !!enabled;
      if (state.enabled) {
        startFetchInterception();
      } else {
        stopFetchInterception();
      }
      console.log(`[PLAN OVERLAY] setEnabled: ${state.enabled}`);
    }
    function setPlan(planItems, opts = {}) {
      var _a, _b, _c;
      if (!planItems || planItems.length === 0) {
        state.pixelPlan = null;
        console.log("[PLAN OVERLAY] Plan cleared");
        return;
      }
      const pixels = [];
      for (const item of planItems) {
        let globalX, globalY;
        if (typeof item.tileX === "number" && typeof item.localX === "number") {
          globalX = item.tileX * TILE_SIZE + item.localX;
          globalY = item.tileY * TILE_SIZE + item.localY;
        } else if (opts.anchor && typeof item.imageX === "number") {
          const baseX = opts.anchor.tileX * TILE_SIZE + (opts.anchor.pxX || 0);
          const baseY = opts.anchor.tileY * TILE_SIZE + (opts.anchor.pxY || 0);
          globalX = baseX + item.imageX;
          globalY = baseY + item.imageY;
        } else {
          continue;
        }
        pixels.push({
          globalX,
          globalY,
          r: ((_a = item.color) == null ? void 0 : _a.r) || 0,
          g: ((_b = item.color) == null ? void 0 : _b.g) || 0,
          b: ((_c = item.color) == null ? void 0 : _c.b) || 0
        });
      }
      state.pixelPlan = { pixels };
      state.nextBatchCount = opts.nextBatchCount || 0;
      state.anchor = opts.anchor || null;
      state.imageWidth = opts.imageWidth || null;
      state.imageHeight = opts.imageHeight || null;
      console.log(`[PLAN OVERLAY] Plan set: ${pixels.length} pixels`);
      if (typeof opts.enabled === "boolean") {
        setEnabled(opts.enabled);
      }
    }
    function setNextBatchCount(count) {
      state.nextBatchCount = Math.max(0, Number(count || 0));
      console.log(`[PLAN OVERLAY] Next batch count: ${state.nextBatchCount}`);
    }
    function setAnchor(anchor) {
      state.anchor = anchor;
      console.log("[PLAN OVERLAY] Anchor set:", anchor);
    }
    function setAnchorCss(x, y) {
      console.log("[PLAN OVERLAY] CSS anchor set (ignored in tile system):", { x, y });
    }
    function endSelectionMode() {
      console.log("[PLAN OVERLAY] Selection mode ended (ignored in tile system)");
    }
    function cleanup() {
      stopFetchInterception();
      state.pixelPlan = null;
      state.fetchedBlobQueue.clear();
      console.log("[PLAN OVERLAY] Cleanup completed");
    }
    window.__WPA_PLAN_OVERLAY__ = {
      injectStyles,
      setEnabled,
      setPlan,
      setPlanItemsFromTileList: setPlan,
      // Alias
      setNextBatchCount,
      setAnchor,
      setAnchorCss,
      endSelectionMode,
      render: () => {
      },
      // No-op en sistema de tiles
      cleanup,
      get state() {
        return state;
      }
    };
    console.log("[PLAN OVERLAY] Blue Marble tile system ready");
  })();

  // src/image/index.js
  async function runImage() {
    log("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)");
    initializeLanguage();
    window.__wplaceBot = { ...window.__wplaceBot, imageRunning: true };
    let currentUserInfo = null;
    let originalFetch = window.fetch;
    const restoreFetch = () => {
      if (window.fetch !== originalFetch) {
        window.fetch = originalFetch;
        log("\u{1F504} Fetch original restaurado");
      }
      if (imageState.positionTimeoutId) {
        clearTimeout(imageState.positionTimeoutId);
        imageState.positionTimeoutId = null;
      }
      if (imageState.cleanupObserver) {
        imageState.cleanupObserver();
        imageState.cleanupObserver = null;
      }
      imageState.selectingPosition = false;
    };
    try {
      const config = { ...IMAGE_DEFAULTS };
      const texts = getSection("image");
      imageState.language = getCurrentLanguage();
      if (!config.SITEKEY) {
        const siteKeyElement = document.querySelector("*[data-sitekey]");
        if (siteKeyElement) {
          config.SITEKEY = siteKeyElement.getAttribute("data-sitekey");
          log(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${config.SITEKEY.substring(0, 20)}...`);
        } else {
          log("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente");
        }
      }
      async function tryAutoInit() {
        log("\u{1F916} Intentando auto-inicio...");
        if (isPaletteOpen()) {
          log("\u{1F3A8} Paleta de colores ya est\xE1 abierta");
          return true;
        }
        log("\u{1F50D} Paleta no encontrada, iniciando auto-click del bot\xF3n Paint...");
        const success = await autoClickPaintButton(3, true);
        if (success) {
          log("\u2705 Auto-click exitoso, paleta abierta");
          return true;
        } else {
          log("\u274C Auto-click fall\xF3, requerir\xE1 inicio manual");
          return false;
        }
      }
      async function initializeBot(isAutoInit = false) {
        log("\u{1F916} Inicializando Auto-Image...");
        ui.setStatus(t("image.checkingColors"), "info");
        const colors = detectAvailableColors();
        if (colors.length === 0) {
          ui.setStatus(t("image.noColorsFound"), "error");
          return false;
        }
        const sessionInfo = await getSession();
        let userInfo = null;
        if (sessionInfo.success && sessionInfo.data.user) {
          userInfo = {
            username: sessionInfo.data.user.name || "An\xF3nimo",
            charges: sessionInfo.data.charges,
            maxCharges: sessionInfo.data.maxCharges,
            pixels: sessionInfo.data.user.pixelsPainted || 0
            // Usar pixelsPainted en lugar de pixels
          };
          currentUserInfo = userInfo;
          imageState.currentCharges = sessionInfo.data.charges;
          imageState.maxCharges = sessionInfo.data.maxCharges || 50;
          log(`\u{1F464} Usuario conectado: ${sessionInfo.data.user.name || "An\xF3nimo"} - Cargas: ${userInfo.charges}/${userInfo.maxCharges} - P\xEDxeles: ${userInfo.pixels}`);
        } else {
          log("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario");
        }
        imageState.availableColors = colors;
        imageState.colorsChecked = true;
        ui.setStatus(t("image.colorsFound", { count: colors.length }), "success");
        ui.updateProgress(0, 0, userInfo);
        if (!isAutoInit) {
          log(`\u2705 ${colors.length} colores disponibles detectados`);
        }
        ui.setInitialized(true);
        ui.enableButtonsAfterInit();
        try {
        } catch {
        }
        return true;
      }
      const ui = await createImageUI({
        texts,
        onConfigChange: (config2) => {
          if (config2.pixelsPerBatch !== void 0) {
            imageState.pixelsPerBatch = config2.pixelsPerBatch;
          }
          if (config2.useAllCharges !== void 0) {
            imageState.useAllChargesFirst = config2.useAllCharges;
          }
          log(`Configuraci\xF3n actualizada:`, config2);
        },
        onInitBot: initializeBot,
        onUploadImage: async (file) => {
          try {
            ui.setStatus(t("image.loadingImage"), "info");
            const imageUrl = window.URL.createObjectURL(file);
            const processor = new BlueMarblelImageProcessor(imageUrl);
            processor.originalName = file.name;
            await processor.load();
            const availableColors = processor.initializeColorPalette();
            imageState.availableColors = availableColors;
            const analysisResult = await processor.analyzePixels();
            processor.setCoords(0, 0, 0, 0);
            const processedData = processor.getImageData();
            imageState.imageData = processedData;
            imageState.imageData.processor = processor;
            imageState.totalPixels = analysisResult.requiredPixels;
            imageState.paintedPixels = 0;
            imageState.originalImageName = file.name;
            imageState.imageLoaded = true;
            ui.setStatus(t("image.imageLoaded", { count: analysisResult.requiredPixels }), "success");
            ui.updateProgress(0, analysisResult.requiredPixels, currentUserInfo);
            log(`\u2705 [BLUE MARBLE] Imagen cargada: ${processedData.width}x${processedData.height}, ${analysisResult.requiredPixels} p\xEDxeles v\xE1lidos`);
            log(`\u2705 [BLUE MARBLE] An\xE1lisis: ${analysisResult.uniqueColors} colores \xFAnicos, ${analysisResult.defacePixels} p\xEDxeles #deface`);
            window.URL.revokeObjectURL(imageUrl);
            try {
              if (window.__WPA_PLAN_OVERLAY__) {
                window.__WPA_PLAN_OVERLAY__.injectStyles();
                window.__WPA_PLAN_OVERLAY__.setEnabled(true);
                window.__WPA_PLAN_OVERLAY__.setPlan([], {
                  enabled: true,
                  nextBatchCount: 0
                });
                log("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen");
              }
            } catch (e) {
              log("\u26A0\uFE0F Error activando plan overlay:", e);
            }
            return true;
          } catch (error) {
            ui.setStatus(t("image.imageError"), "error");
            log("\u274C Error cargando imagen:", error);
            return false;
          }
        },
        onSelectPosition: async () => {
          return new Promise((resolve) => {
            ui.setStatus(t("image.selectPositionAlert"), "info");
            ui.setStatus(t("image.waitingPosition"), "info");
            imageState.selectingPosition = true;
            let positionCaptured = false;
            const setupFetchInterception = () => {
              window.fetch = async (url, options) => {
                if (imageState.selectingPosition && !positionCaptured && typeof url === "string" && url.includes("/s0/pixel/") && options && options.method === "POST") {
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
                        if (tileMatch && !positionCaptured) {
                          positionCaptured = true;
                          const tileX = parseInt(tileMatch[1]);
                          const tileY = parseInt(tileMatch[2]);
                          imageState.tileX = tileX;
                          imageState.tileY = tileY;
                          imageState.startPosition = { x: localX, y: localY };
                          imageState.selectingPosition = false;
                          if (imageState.imageData && imageState.imageData.processor) {
                            const processor = imageState.imageData.processor;
                            processor.setCoords(tileX, tileY, localX, localY);
                            try {
                              await processor.createTemplateTiles();
                              log(`\u2705 [BLUE MARBLE] Template tiles creados para posici\xF3n tile(${tileX},${tileY}) pixel(${localX},${localY})`);
                            } catch (error) {
                              log(`\u274C [BLUE MARBLE] Error creando template tiles: ${error.message}`);
                            }
                            const pixelQueue = processor.generatePixelQueue();
                            imageState.remainingPixels = pixelQueue;
                            imageState.totalPixels = pixelQueue.length;
                            log(`\u2705 Cola de p\xEDxeles generada: ${pixelQueue.length} p\xEDxeles para overlay`);
                          }
                          try {
                            if (window.__WPA_PLAN_OVERLAY__) {
                              window.__WPA_PLAN_OVERLAY__.injectStyles();
                              window.__WPA_PLAN_OVERLAY__.setEnabled(true);
                              window.__WPA_PLAN_OVERLAY__.setAnchor({
                                tileX,
                                tileY,
                                pxX: localX,
                                pxY: localY
                              });
                              if (imageState.remainingPixels && imageState.remainingPixels.length > 0) {
                                window.__WPA_PLAN_OVERLAY__.setPlan(imageState.remainingPixels, {
                                  anchor: { tileX, tileY, pxX: localX, pxY: localY },
                                  imageWidth: imageState.imageData.width,
                                  imageHeight: imageState.imageData.height,
                                  enabled: true
                                });
                                log(`\u2705 Plan overlay anclado en tile(${tileX},${tileY}) local(${localX},${localY})`);
                              } else {
                                log(`\u26A0\uFE0F No hay p\xEDxeles para mostrar en overlay`);
                              }
                            }
                          } catch (error) {
                            log(`\u274C Error configurando overlay: ${error.message}`);
                          }
                          restoreFetch();
                          ui.setStatus(t("image.positionSet"), "success");
                          log(`\u2705 Posici\xF3n establecida: tile(${imageState.tileX},${imageState.tileY}) local(${localX},${localY})`);
                          resolve(true);
                        } else {
                          log("\u26A0\uFE0F No se pudo extraer tile de la URL:", url);
                        }
                      }
                    }
                    return response;
                  } catch (error) {
                    log("\u274C Error interceptando pixel:", error);
                    if (!positionCaptured) {
                      restoreFetch();
                      return originalFetch(url, options);
                    }
                  }
                }
                return originalFetch(url, options);
              };
            };
            const setupCanvasObserver = () => {
              const canvasElements = document.querySelectorAll("canvas");
              if (canvasElements.length === 0) {
                log("\u26A0\uFE0F No se encontraron elementos canvas");
                return;
              }
              log(`\u{1F4CA} Configurando observer para ${canvasElements.length} canvas`);
              const clickHandler = (event) => {
                var _a;
                if (!imageState.selectingPosition || positionCaptured) return;
                const target = event.target;
                if (target && target.tagName === "CANVAS") {
                  log("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");
                  try {
                    const board = ((_a = document.querySelector("canvas")) == null ? void 0 : _a.parentElement) || document.body;
                    const rect = board.getBoundingClientRect();
                    const cssX = event.clientX - rect.left;
                    const cssY = event.clientY - rect.top;
                    if (window.__WPA_PLAN_OVERLAY__) {
                      window.__WPA_PLAN_OVERLAY__.setAnchorCss(cssX, cssY);
                      log(`Plan overlay: ancla CSS establecida en (${cssX}, ${cssY})`);
                    }
                  } catch (e) {
                    log("Plan Overlay: error calculando ancla CSS", e);
                  }
                  setTimeout(() => {
                    if (!positionCaptured && imageState.selectingPosition) {
                      log("\u{1F50D} Buscando requests recientes de pintado...");
                    }
                  }, 500);
                }
              };
              document.addEventListener("click", clickHandler);
              imageState.cleanupObserver = () => {
                document.removeEventListener("click", clickHandler);
              };
            };
            setupFetchInterception();
            setupCanvasObserver();
            const timeoutId = setTimeout(() => {
              if (imageState.selectingPosition && !positionCaptured) {
                restoreFetch();
                if (imageState.cleanupObserver) {
                  imageState.cleanupObserver();
                }
                ui.setStatus(t("image.positionTimeout"), "error");
                log("\u23F0 Timeout en selecci\xF3n de posici\xF3n");
                resolve(false);
              }
            }, 12e4);
            imageState.positionTimeoutId = timeoutId;
          });
        },
        onStartPainting: async () => {
          var _a;
          log(`\u{1F50D} Estado para iniciar pintura:`, {
            imageLoaded: imageState.imageLoaded,
            startPosition: imageState.startPosition,
            tileX: imageState.tileX,
            tileY: imageState.tileY,
            totalPixels: imageState.totalPixels,
            remainingPixels: ((_a = imageState.remainingPixels) == null ? void 0 : _a.length) || 0
          });
          if (!imageState.imageLoaded || !imageState.startPosition) {
            ui.setStatus(t("image.missingRequirements"), "error");
            log(`\u274C Validaci\xF3n fallida: imageLoaded=${imageState.imageLoaded}, startPosition=${!!imageState.startPosition}`);
            return false;
          }
          imageState.running = true;
          imageState.stopFlag = false;
          imageState.isFirstBatch = true;
          ui.setStatus(t("image.startPaintingMsg"), "success");
          try {
            await processImage(
              imageState.imageData,
              imageState.startPosition,
              // onProgress - ahora incluye tiempo estimado
              (painted, total, message, estimatedTime) => {
                if (currentUserInfo) {
                  currentUserInfo.charges = Math.floor(imageState.currentCharges);
                  if (estimatedTime !== void 0) {
                    currentUserInfo.estimatedTime = estimatedTime;
                  }
                }
                ui.updateProgress(painted, total, currentUserInfo);
                if (imageState.inCooldown && imageState.nextBatchCooldown > 0) {
                  ui.updateCooldownDisplay(imageState.nextBatchCooldown);
                } else {
                  ui.updateCooldownDisplay(0);
                }
                if (message) {
                  if (message.includes("\u23F3") && imageState.inCooldown) {
                    ui.updateCooldownMessage(message);
                  } else {
                    ui.setStatus(message, "info");
                  }
                } else {
                  ui.setStatus(t("image.paintingProgress", { painted, total }), "info");
                }
              },
              // onComplete
              (completed, pixelsPainted) => {
                if (completed) {
                  ui.setStatus(t("image.paintingComplete", { count: pixelsPainted }), "success");
                  clearProgress();
                } else {
                  ui.setStatus(t("image.paintingStopped"), "warning");
                }
                imageState.running = false;
              },
              // onError
              (error) => {
                ui.setStatus(t("image.paintingError"), "error");
                log("\u274C Error en proceso de pintado:", error);
                imageState.running = false;
              }
            );
            return true;
          } catch (error) {
            ui.setStatus(t("image.paintingError"), "error");
            log("\u274C Error iniciando pintado:", error);
            imageState.running = false;
            return false;
          }
        },
        onStopPainting: async () => {
          const progressInfo = getProgressInfo();
          if (progressInfo.hasProgress) {
            const shouldSave = await showConfirmDialog(
              t("image.confirmSaveProgress"),
              t("image.saveProgressTitle"),
              {
                save: t("image.saveProgress"),
                discard: t("image.discardProgress"),
                cancel: t("image.cancel")
              }
            );
            if (shouldSave === "save") {
              const result = saveProgress();
              if (result.success) {
                ui.setStatus(t("image.progressSaved", { filename: result.filename }), "success");
              } else {
                ui.setStatus(t("image.progressSaveError", { error: result.error }), "error");
              }
            } else if (shouldSave === "cancel") {
              return false;
            }
          }
          stopPainting();
          ui.setStatus(t("image.paintingStopped"), "warning");
          return true;
        },
        onSaveProgress: async () => {
          const result = saveProgress();
          if (result.success) {
            ui.setStatus(t("image.progressSaved", { filename: result.filename }), "success");
          } else {
            ui.setStatus(t("image.progressSaveError", { error: result.error }), "error");
          }
          return result.success;
        },
        onLoadProgress: async (file) => {
          try {
            const result = await loadProgress(file);
            if (result.success) {
              ui.setStatus(t("image.progressLoaded", { painted: result.painted, total: result.total }), "success");
              ui.updateProgress(result.painted, result.total, currentUserInfo);
              log("\u2705 Progreso cargado - habilitando botones de inicio");
              return true;
            } else {
              ui.setStatus(t("image.progressLoadError", { error: result.error }), "error");
              return false;
            }
          } catch (error) {
            ui.setStatus(t("image.progressLoadError", { error: error.message }), "error");
            return false;
          }
        },
        onResizeImage: () => {
          if (imageState.imageLoaded && imageState.imageData && imageState.imageData.processor) {
            ui.showResizeDialog(imageState.imageData.processor);
          }
        },
        onConfirmResize: async (processor, newWidth, newHeight) => {
          log(`\u{1F504} Redimensionando imagen de ${processor.getDimensions().width}x${processor.getDimensions().height} a ${newWidth}x${newHeight}`);
          try {
            await processor.resize(newWidth, newHeight);
            const analysisResult = await processor.analyzePixels();
            imageState.imageData = {
              processor,
              width: newWidth,
              height: newHeight,
              validPixelCount: analysisResult.validPixelCount,
              totalPixels: analysisResult.totalPixels,
              unknownPixels: analysisResult.unknownPixels
            };
            imageState.totalPixels = analysisResult.validPixelCount;
            imageState.paintedPixels = 0;
            imageState.remainingPixels = [];
            imageState.lastPosition = { x: 0, y: 0 };
            ui.updateProgress(0, analysisResult.validPixelCount, currentUserInfo);
            ui.setStatus(t("image.resizeSuccess", { width: newWidth, height: newHeight }), "success");
            log(`\u2705 Imagen redimensionada: ${analysisResult.validPixelCount} p\xEDxeles v\xE1lidos de ${analysisResult.totalPixels} totales`);
            try {
              if (window.__WPA_PLAN_OVERLAY__ && imageState.startPosition && imageState.tileX != null && imageState.tileY != null) {
                await processor.createTemplateTiles();
                const pixelQueue = processor.generatePixelQueue();
                imageState.remainingPixels = pixelQueue;
                imageState.totalPixels = pixelQueue.length;
                window.__WPA_PLAN_OVERLAY__.setPlan(pixelQueue, {
                  anchor: {
                    tileX: imageState.tileX,
                    tileY: imageState.tileY,
                    pxX: imageState.startPosition.x,
                    pxY: imageState.startPosition.y
                  },
                  imageWidth: newWidth,
                  imageHeight: newHeight,
                  enabled: true
                });
                log(`\u2705 Overlay actualizado con ${pixelQueue.length} p\xEDxeles despu\xE9s del resize`);
              }
            } catch (overlayError) {
              log(`\u26A0\uFE0F Error actualizando overlay despu\xE9s del resize: ${overlayError.message}`);
            }
          } catch (error) {
            log(`\u274C Error redimensionando imagen: ${error.message}`);
            ui.setStatus(t("image.imageError"), "error");
          }
        }
      });
      const handleLauncherLanguageChange = (event) => {
        const { language } = event.detail;
        log(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${language}`);
        imageState.language = language;
      };
      window.addEventListener("launcherLanguageChanged", handleLauncherLanguageChange);
      window.addEventListener("languageChanged", handleLauncherLanguageChange);
      window.addEventListener("beforeunload", () => {
        restoreFetch();
        stopPainting();
        ui.destroy();
        window.removeEventListener("launcherLanguageChanged", handleLauncherLanguageChange);
        window.removeEventListener("languageChanged", handleLauncherLanguageChange);
        if (window.__wplaceBot) {
          window.__wplaceBot.imageRunning = false;
        }
      });
      log("\u2705 Auto-Image inicializado correctamente");
      setTimeout(async () => {
        try {
          ui.setStatus(t("image.autoInitializing"), "info");
          log("\u{1F916} Intentando auto-inicio...");
          const autoInitSuccess = await tryAutoInit();
          if (autoInitSuccess) {
            ui.setStatus(t("image.autoInitSuccess"), "success");
            log("\u2705 Auto-inicio exitoso");
            ui.setInitButtonVisible(false);
            const initResult = await initializeBot(true);
            if (initResult) {
              log("\u{1F680} Bot auto-iniciado completamente");
            }
          } else {
            ui.setStatus(t("image.autoInitFailed"), "warning");
            log("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual");
          }
        } catch (error) {
          log("\u274C Error en auto-inicio:", error);
          ui.setStatus(t("image.manualInitRequired"), "warning");
        }
      }, 1e3);
    } catch (error) {
      log("\u274C Error inicializando Auto-Image:", error);
      if (window.__wplaceBot) {
        window.__wplaceBot.imageRunning = false;
      }
      throw error;
    }
  }

  // src/entries/image.js
  (async () => {
    "use strict";
    var _a, _b;
    try {
      console.log("[WPA-Image] \u{1F916} Iniciando auto-click del bot\xF3n Paint...");
      await autoClickPaintButton(3, true);
    } catch (error) {
      console.log("[WPA-Image] \u26A0\uFE0F Error en auto-click del bot\xF3n Paint:", error);
    }
    if ((_a = window.__wplaceBot) == null ? void 0 : _a.imageRunning) {
      alert("Auto-Image ya est\xE1 corriendo.");
      return;
    }
    if ((_b = window.__wplaceBot) == null ? void 0 : _b.farmRunning) {
      alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");
      return;
    }
    if (!window.__wplaceBot) {
      window.__wplaceBot = {};
    }
    window.__wplaceBot.imageRunning = true;
    runImage().catch((e) => {
      console.error("[BOT] Error en Auto-Image:", e);
      if (window.__wplaceBot) {
        window.__wplaceBot.imageRunning = false;
      }
      alert("Auto-Image: error inesperado. Revisa consola.");
    });
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvbG9nZ2VyLmpzIiwgInNyYy9sb2NhbGVzL2VzLmpzIiwgInNyYy9sb2NhbGVzL2VuLmpzIiwgInNyYy9sb2NhbGVzL2ZyLmpzIiwgInNyYy9sb2NhbGVzL3J1LmpzIiwgInNyYy9sb2NhbGVzL3poLUhhbnMuanMiLCAic3JjL2xvY2FsZXMvemgtSGFudC5qcyIsICJzcmMvbG9jYWxlcy9pbmRleC5qcyIsICJzcmMvaW1hZ2UvY29uZmlnLmpzIiwgInNyYy9pbWFnZS9wcm9jZXNzb3IuanMiLCAic3JjL2ltYWdlL2JsdWUtbWFyYmxlLXByb2Nlc3Nvci5qcyIsICJzcmMvY29yZS90aW1pbmcuanMiLCAic3JjL2NvcmUvd3BsYWNlLWFwaS5qcyIsICJzcmMvY29yZS90dXJuc3RpbGUuanMiLCAic3JjL2ltYWdlL3BhaW50ZXIuanMiLCAic3JjL2ltYWdlL3NhdmUtbG9hZC5qcyIsICJzcmMvY29yZS91aS11dGlscy5qcyIsICJzcmMvaW1hZ2UvdWkuanMiLCAic3JjL2NvcmUvZG9tLmpzIiwgInNyYy9pbWFnZS9wbGFuLW92ZXJsYXktYmx1ZS1tYXJibGUuanMiLCAic3JjL2ltYWdlL2luZGV4LmpzIiwgInNyYy9lbnRyaWVzL2ltYWdlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY29uc3QgbG9nZ2VyID0ge1xuICBkZWJ1Z0VuYWJsZWQ6IGZhbHNlLFxuICBzZXREZWJ1Zyh2KSB7IHRoaXMuZGVidWdFbmFibGVkID0gISF2OyB9LFxuICBkZWJ1ZyguLi5hKSB7IGlmICh0aGlzLmRlYnVnRW5hYmxlZCkgY29uc29sZS5kZWJ1ZyhcIltCT1RdXCIsIC4uLmEpOyB9LFxuICBpbmZvKC4uLmEpICB7IGNvbnNvbGUuaW5mbyhcIltCT1RdXCIsIC4uLmEpOyB9LFxuICB3YXJuKC4uLmEpICB7IGNvbnNvbGUud2FybihcIltCT1RdXCIsIC4uLmEpOyB9LFxuICBlcnJvciguLi5hKSB7IGNvbnNvbGUuZXJyb3IoXCJbQk9UXVwiLCAuLi5hKTsgfVxufTtcblxuLy8gRmFybS1zcGVjaWZpYyBsb2dnZXJcbmV4cG9ydCBjb25zdCBsb2cgPSAoLi4uYSkgPT4gY29uc29sZS5sb2coJ1tXUEEtVUldJywgLi4uYSk7XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5leHBvcnQgY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuZXhwb3J0IGNvbnN0IGNsYW1wID0gKG4sIGEsIGIpID0+IE1hdGgubWF4KGEsIE1hdGgubWluKGIsIG4pKTtcbiIsICJleHBvcnQgY29uc3QgZXMgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NlbGVjY2lcdTAwRjNuJyxcbiAgICB1c2VyOiAnVXN1YXJpbycsXG4gICAgY2hhcmdlczogJ0NhcmdhcycsXG4gICAgYmFja2VuZDogJ0JhY2tlbmQnLFxuICAgIGRhdGFiYXNlOiAnRGF0YWJhc2UnLFxuICAgIHVwdGltZTogJ1VwdGltZScsXG4gICAgY2xvc2U6ICdDZXJyYXInLFxuICAgIGxhdW5jaDogJ0xhbnphcicsXG4gICAgbG9hZGluZzogJ0NhcmdhbmRvXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFamVjdXRhbmRvXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ0Rlc2NhcmdhbmRvIHNjcmlwdFx1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnRWxpZ2UgdW4gYm90IHkgcHJlc2lvbmEgTGFuemFyJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnTGlzdG8gcGFyYSBsYW56YXInLFxuICAgIGxvYWRFcnJvcjogJ0Vycm9yIGFsIGNhcmdhcicsXG4gICAgbG9hZEVycm9yTXNnOiAnTm8gc2UgcHVkbyBjYXJnYXIgZWwgYm90IHNlbGVjY2lvbmFkby4gUmV2aXNhIHR1IGNvbmV4aVx1MDBGM24gbyBpbnRcdTAwRTludGFsbyBkZSBudWV2by4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFZlcmlmaWNhbmRvLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgT25saW5lJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IE9mZmxpbmUnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIE9LJyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBFcnJvcicsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaWNpYXIgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJTdWJpciBJbWFnZW5cIixcbiAgICByZXNpemVJbWFnZTogXCJSZWRpbWVuc2lvbmFyIEltYWdlblwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjY2lvbmFyIFBvc2ljaVx1MDBGM25cIixcbiAgICBzdGFydFBhaW50aW5nOiBcIkluaWNpYXIgUGludHVyYVwiLFxuICAgIHN0b3BQYWludGluZzogXCJEZXRlbmVyIFBpbnR1cmFcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiR3VhcmRhciBQcm9ncmVzb1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJDYXJnYXIgUHJvZ3Jlc29cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgVmVyaWZpY2FuZG8gY29sb3JlcyBkaXNwb25pYmxlcy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1MDBBMUFicmUgbGEgcGFsZXRhIGRlIGNvbG9yZXMgZW4gZWwgc2l0aW8gZSBpbnRcdTAwRTludGFsbyBkZSBudWV2byFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb2xvcmVzIGRpc3BvbmlibGVzIGVuY29udHJhZG9zXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBDYXJnYW5kbyBpbWFnZW4uLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgSW1hZ2VuIGNhcmdhZGEgY29uIHtjb3VudH0gcFx1MDBFRHhlbGVzIHZcdTAwRTFsaWRvc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGNhcmdhciBsYSBpbWFnZW5cIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1MDBBMVBpbnRhIGVsIHByaW1lciBwXHUwMEVEeGVsIGVuIGxhIHViaWNhY2lcdTAwRjNuIGRvbmRlIHF1aWVyZXMgcXVlIGNvbWllbmNlIGVsIGFydGUhXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBFc3BlcmFuZG8gcXVlIHBpbnRlcyBlbCBwXHUwMEVEeGVsIGRlIHJlZmVyZW5jaWEuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHUwMEExUG9zaWNpXHUwMEYzbiBlc3RhYmxlY2lkYSBjb24gXHUwMEU5eGl0byFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaW9uYXIgcG9zaWNpXHUwMEYzblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2ljaVx1MDBGM24gZGV0ZWN0YWRhLCBwcm9jZXNhbmRvLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZGV0ZWN0YW5kbyBwb3NpY2lcdTAwRjNuLCBpbnRcdTAwRTludGFsbyBkZSBudWV2b1wiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IEluaWNpYW5kbyBwaW50dXJhLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgUHJvZ3Jlc286IHtwYWludGVkfS97dG90YWx9IHBcdTAwRUR4ZWxlcy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgU2luIGNhcmdhcy4gRXNwZXJhbmRvIHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUGludHVyYSBkZXRlbmlkYSBwb3IgZWwgdXN1YXJpb1wiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1MDBBMVBpbnR1cmEgY29tcGxldGFkYSEge2NvdW50fSBwXHUwMEVEeGVsZXMgcGludGFkb3MuXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgRXJyb3IgZHVyYW50ZSBsYSBwaW50dXJhXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgQ2FyZ2EgdW5hIGltYWdlbiB5IHNlbGVjY2lvbmEgdW5hIHBvc2ljaVx1MDBGM24gcHJpbWVyb1wiLFxuICAgIHByb2dyZXNzOiBcIlByb2dyZXNvXCIsXG4gICAgdXNlck5hbWU6IFwiVXN1YXJpb1wiLFxuICAgIHBpeGVsczogXCJQXHUwMEVEeGVsZXNcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiVGllbXBvIGVzdGltYWRvXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiSGF6IGNsaWMgZW4gJ0luaWNpYXIgQXV0by1CT1QnIHBhcmEgY29tZW56YXJcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFc3BlcmFuZG8gaW5pY2lhbGl6YWNpXHUwMEYzbi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IEltYWdlbiByZWRpbWVuc2lvbmFkYSBhIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgUGludHVyYSBwYXVzYWRhIGVuIGxhIHBvc2ljaVx1MDBGM24gWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQXHUwMEVEeGVsZXMgcG9yIGxvdGVcIixcbiAgICBiYXRjaFNpemU6IFwiVGFtYVx1MDBGMW8gZGVsIGxvdGVcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlNpZ3VpZW50ZSBsb3RlIGVuXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVc2FyIHRvZGFzIGxhcyBjYXJnYXMgZGlzcG9uaWJsZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJNb3N0cmFyIG92ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIkNhcmdhcyBtXHUwMEUxeGltYXMgcG9yIGxvdGVcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgRXNwZXJhbmRvIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJUaWVtcG8gcmVzdGFudGVcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIEVzcGVyYW5kbyB7dGltZX0gcGFyYSBjb250aW51YXIuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBQcm9ncmVzbyBndWFyZGFkbyBjb21vIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3Jlc28gY2FyZ2Fkbzoge3BhaW50ZWR9L3t0b3RhbH0gcFx1MDBFRHhlbGVzIHBpbnRhZG9zXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGNhcmdhciBwcm9ncmVzbzoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBhbCBndWFyZGFyIHByb2dyZXNvOiB7ZXJyb3J9XCIsXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTAwQkZEZXNlYXMgZ3VhcmRhciBlbCBwcm9ncmVzbyBhY3R1YWwgYW50ZXMgZGUgZGV0ZW5lcj9cIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJHdWFyZGFyIFByb2dyZXNvXCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIkRlc2NhcnRhclwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxhclwiLFxuICAgIG1pbmltaXplOiBcIk1pbmltaXphclwiLFxuICAgIHdpZHRoOiBcIkFuY2hvXCIsXG4gICAgaGVpZ2h0OiBcIkFsdG9cIiwgXG4gICAga2VlcEFzcGVjdDogXCJNYW50ZW5lciBwcm9wb3JjaVx1MDBGM25cIixcbiAgICBhcHBseTogXCJBcGxpY2FyXCIsXG4gIG92ZXJsYXlPbjogXCJPdmVybGF5OiBPTlwiLFxuICBvdmVybGF5T2ZmOiBcIk92ZXJsYXk6IE9GRlwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFBhc2FkYSBjb21wbGV0YWRhOiB7cGFpbnRlZH0gcFx1MDBFRHhlbGVzIHBpbnRhZG9zIHwgUHJvZ3Jlc286IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIEVzcGVyYW5kbyByZWdlbmVyYWNpXHUwMEYzbiBkZSBjYXJnYXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFRpZW1wbzoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIEVzcGVyYW5kbyBjYXJnYXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFF1ZWRhbjoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pY2lhbGl6YW5kbyBhdXRvbVx1MDBFMXRpY2FtZW50ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGluaWNpYWRvIGF1dG9tXHUwMEUxdGljYW1lbnRlXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gaW5pY2lhciBhdXRvbVx1MDBFMXRpY2FtZW50ZS4gVXNhIGVsIGJvdFx1MDBGM24gbWFudWFsLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXRhIGRlIGNvbG9yZXMgZGV0ZWN0YWRhXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBCdXNjYW5kbyBwYWxldGEgZGUgY29sb3Jlcy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IEhhY2llbmRvIGNsaWMgZW4gZWwgYm90XHUwMEYzbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkb1wiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pY2lvIG1hbnVhbCByZXF1ZXJpZG9cIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFJlaW50ZW50byB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBlbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycm9yIGVuIGludGVudG8ge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIHJlaW50ZW50YW5kbyBlbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBGYWxsXHUwMEYzIGRlc3B1XHUwMEU5cyBkZSB7bWF4QXR0ZW1wdHN9IGludGVudG9zLiBDb250aW51YW5kbyBjb24gc2lndWllbnRlIGxvdGUuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIEVycm9yIGRlIHJlZC4gUmVpbnRlbnRhbmRvLi4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IEVycm9yIGRlbCBzZXJ2aWRvci4gUmVpbnRlbnRhbmRvLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBUaW1lb3V0IGRlbCBzZXJ2aWRvci4gUmVpbnRlbnRhbmRvLi4uXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAocG9yIGltcGxlbWVudGFyKVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEZhcm0gQm90XCIsXG4gICAgc3RhcnQ6IFwiSW5pY2lhclwiLFxuICAgIHN0b3A6IFwiRGV0ZW5lclwiLCBcbiAgICBzdG9wcGVkOiBcIkJvdCBkZXRlbmlkb1wiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJhclwiLFxuICAgIHBhaW50T25jZTogXCJVbmEgdmV6XCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiVmVyaWZpY2FuZG8gZXN0YWRvLi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJDb25maWd1cmFjaVx1MDBGM25cIixcbiAgICBkZWxheTogXCJEZWxheSAobXMpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUFx1MDBFRHhlbGVzL2xvdGVcIixcbiAgICBtaW5DaGFyZ2VzOiBcIkNhcmdhcyBtXHUwMEVEblwiLFxuICAgIGNvbG9yTW9kZTogXCJNb2RvIGNvbG9yXCIsXG4gICAgcmFuZG9tOiBcIkFsZWF0b3Jpb1wiLFxuICAgIGZpeGVkOiBcIkZpam9cIixcbiAgICByYW5nZTogXCJSYW5nb1wiLFxuICAgIGZpeGVkQ29sb3I6IFwiQ29sb3IgZmlqb1wiLFxuICAgIGFkdmFuY2VkOiBcIkF2YW56YWRvXCIsXG4gICAgdGlsZVg6IFwiVGlsZSBYXCIsXG4gICAgdGlsZVk6IFwiVGlsZSBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJQYWxldGEgcGVyc29uYWxpemFkYVwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcImVqOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiQ2FwdHVyYXJcIixcbiAgICBwYWludGVkOiBcIlBpbnRhZG9zXCIsXG4gICAgY2hhcmdlczogXCJDYXJnYXNcIixcbiAgICByZXRyaWVzOiBcIkZhbGxvc1wiLFxuICAgIHRpbGU6IFwiVGlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiBndWFyZGFkYVwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmFjaVx1MDBGM24gY2FyZ2FkYVwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiByZWluaWNpYWRhXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQaW50YSB1biBwXHUwMEVEeGVsIG1hbnVhbG1lbnRlIHBhcmEgY2FwdHVyYXIgY29vcmRlbmFkYXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgT25saW5lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBPZmZsaW5lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiSW5pY2lhbmRvIGJvdC4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIkRldGVuaWVuZG8gYm90Li4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiQ2FsaWJyYW5kby4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSB5YSBlc3RcdTAwRTEgY29ycmllbmRvLlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiQXV0by1JbWFnZSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UuIENpXHUwMEU5cnJhbG8gYW50ZXMgZGUgaW5pY2lhciBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWNjaW9uYXIgWm9uYVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gdW5hIHpvbmEgREVTUE9CTEFEQSBkZWwgbWFwYSBwYXJhIGVzdGFibGVjZXIgZWwgXHUwMEUxcmVhIGRlIGZhcm1pbmdcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBxdWUgcGludGVzIGVsIHBcdTAwRUR4ZWwgZGUgcmVmZXJlbmNpYS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTAwQTFab25hIGVzdGFibGVjaWRhISBSYWRpbzogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaW9uYXIgem9uYVwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgU2VsZWNjaW9uYSB1bmEgem9uYSBwcmltZXJvIHVzYW5kbyAnU2VsZWNjaW9uYXIgWm9uYSdcIixcbiAgICBmYXJtUmFkaXVzOiBcIlJhZGlvIGZhcm1cIixcbiAgICBwb3NpdGlvbkluZm86IFwiWm9uYSBhY3R1YWxcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIEZhcm1pbmcgZW4gcmFkaW8ge3JhZGl1c31weCBkZXNkZSAoe3h9LHt5fSlcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIElNUE9SVEFOVEU6IFNlbGVjY2lvbmEgdW5hIHpvbmEgREVTUE9CTEFEQSBwYXJhIGV2aXRhciBjb25mbGljdG9zXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJTaW4gem9uYVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmE6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU2VsZWNjaW9uYSB1bmEgem9uYSBwcmltZXJvLiBQaW50YSB1biBwXHUwMEVEeGVsIGVuIGVsIG1hcGEgcGFyYSBlc3RhYmxlY2VyIGxhIHpvbmEgZGUgZmFybWluZ1wiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiU1x1MDBFRFwiLFxuICAgIG5vOiBcIk5vXCIsXG4gICAgb2s6IFwiQWNlcHRhclwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxhclwiLFxuICAgIGNsb3NlOiBcIkNlcnJhclwiLFxuICAgIHNhdmU6IFwiR3VhcmRhclwiLFxuICAgIGxvYWQ6IFwiQ2FyZ2FyXCIsXG4gICAgZGVsZXRlOiBcIkVsaW1pbmFyXCIsXG4gICAgZWRpdDogXCJFZGl0YXJcIixcbiAgICBzdGFydDogXCJJbmljaWFyXCIsXG4gICAgc3RvcDogXCJEZXRlbmVyXCIsXG4gICAgcGF1c2U6IFwiUGF1c2FyXCIsXG4gICAgcmVzdW1lOiBcIlJlYW51ZGFyXCIsXG4gICAgcmVzZXQ6IFwiUmVpbmljaWFyXCIsXG4gICAgc2V0dGluZ3M6IFwiQ29uZmlndXJhY2lcdTAwRjNuXCIsXG4gICAgaGVscDogXCJBeXVkYVwiLFxuICAgIGFib3V0OiBcIkFjZXJjYSBkZVwiLFxuICAgIGxhbmd1YWdlOiBcIklkaW9tYVwiLFxuICAgIGxvYWRpbmc6IFwiQ2FyZ2FuZG8uLi5cIixcbiAgICBlcnJvcjogXCJFcnJvclwiLFxuICAgIHN1Y2Nlc3M6IFwiXHUwMEM5eGl0b1wiLFxuICAgIHdhcm5pbmc6IFwiQWR2ZXJ0ZW5jaWFcIixcbiAgICBpbmZvOiBcIkluZm9ybWFjaVx1MDBGM25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiSWRpb21hIGNhbWJpYWRvIGEge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gR3VhcmQgTW9kdWxlXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tR3VhcmRcIixcbiAgICBpbml0Qm90OiBcIkluaWNpYWxpemFyIEd1YXJkLUJPVFwiLFxuICAgIHNlbGVjdEFyZWE6IFwiU2VsZWNjaW9uYXIgXHUwMEMxcmVhXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyYXIgXHUwMEMxcmVhXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIkluaWNpYXIgUHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiRGV0ZW5lciBQcm90ZWNjaVx1MDBGM25cIixcbiAgICB1cHBlckxlZnQ6IFwiRXNxdWluYSBTdXBlcmlvciBJenF1aWVyZGFcIixcbiAgICBsb3dlclJpZ2h0OiBcIkVzcXVpbmEgSW5mZXJpb3IgRGVyZWNoYVwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQXHUwMEVEeGVsZXMgUHJvdGVnaWRvc1wiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJDYW1iaW9zIERldGVjdGFkb3NcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJQXHUwMEVEeGVsZXMgUmVwYXJhZG9zXCIsXG4gICAgY2hhcmdlczogXCJDYXJnYXNcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFc3BlcmFuZG8gaW5pY2lhbGl6YWNpXHUwMEYzbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBWZXJpZmljYW5kbyBjb2xvcmVzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgTm8gc2UgZW5jb250cmFyb24gY29sb3Jlcy4gQWJyZSBsYSBwYWxldGEgZGUgY29sb3JlcyBlbiBlbCBzaXRpby5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb2xvcmVzIGRpc3BvbmlibGVzIGVuY29udHJhZG9zXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBpbmljaWFsaXphZG8gY29ycmVjdGFtZW50ZVwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgRXJyb3IgaW5pY2lhbGl6YW5kbyBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBDb29yZGVuYWRhcyBpbnZcdTAwRTFsaWRhc1wiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBFbCBcdTAwRTFyZWEgZGViZSB0ZW5lciBlc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYSBtZW5vciBxdWUgaW5mZXJpb3IgZGVyZWNoYVwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHUwMEMxcmVhIGRlbWFzaWFkbyBncmFuZGU6IHtzaXplfSBwXHUwMEVEeGVsZXMgKG1cdTAwRTF4aW1vOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJhbmRvIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM24uLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDBDMXJlYSBjYXB0dXJhZGE6IHtjb3VudH0gcFx1MDBFRHhlbGVzIGJham8gcHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBjYXB0dXJhbmRvIFx1MDBFMXJlYToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgUHJpbWVybyBjYXB0dXJhIHVuIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjY2lcdTAwRjNuIGluaWNpYWRhIC0gbW9uaXRvcmVhbmRvIFx1MDBFMXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gZGV0ZW5pZGFcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFx1MDBDMXJlYSBwcm90ZWdpZGEgLSBzaW4gY2FtYmlvcyBkZXRlY3RhZG9zXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNhbWJpb3MgZGV0ZWN0YWRvcyBlbiBlbCBcdTAwRTFyZWEgcHJvdGVnaWRhXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSZXBhcmFuZG8ge2NvdW50fSBwXHUwMEVEeGVsZXMgYWx0ZXJhZG9zLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBSZXBhcmFkb3Mge2NvdW50fSBwXHUwMEVEeGVsZXMgY29ycmVjdGFtZW50ZVwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJvciByZXBhcmFuZG8gcFx1MDBFRHhlbGVzOiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBTaW4gY2FyZ2FzIHN1ZmljaWVudGVzIHBhcmEgcmVwYXJhciBjYW1iaW9zXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBWZXJpZmljYW5kbyBjYW1iaW9zIGVuIFx1MDBFMXJlYSBwcm90ZWdpZGEuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBFcnJvciB2ZXJpZmljYW5kbyBjYW1iaW9zOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIEd1YXJkaVx1MDBFMW4gYWN0aXZvIC0gXHUwMEUxcmVhIGJham8gcHJvdGVjY2lcdTAwRjNuXCIsXG4gICAgbGFzdENoZWNrOiBcIlx1MDBEQWx0aW1hIHZlcmlmaWNhY2lcdTAwRjNuOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiUHJcdTAwRjN4aW1hIHZlcmlmaWNhY2lcdTAwRjNuIGVuOiB7dGltZX1zXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pY2lhbGl6YW5kbyBhdXRvbVx1MDBFMXRpY2FtZW50ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaWNpYWRvIGF1dG9tXHUwMEUxdGljYW1lbnRlXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gaW5pY2lhciBhdXRvbVx1MDBFMXRpY2FtZW50ZS4gVXNhIGVsIGJvdFx1MDBGM24gbWFudWFsLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pY2lvIG1hbnVhbCByZXF1ZXJpZG9cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFBhbGV0YSBkZSBjb2xvcmVzIGRldGVjdGFkYVwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgQnVzY2FuZG8gcGFsZXRhIGRlIGNvbG9yZXMuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBIYWNpZW5kbyBjbGljIGVuIGVsIGJvdFx1MDBGM24gUGFpbnQuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBCb3RcdTAwRjNuIFBhaW50IG5vIGVuY29udHJhZG9cIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gbGEgZXNxdWluYSBTVVBFUklPUiBJWlFVSUVSREEgZGVsIFx1MDBFMXJlYSBhIHByb3RlZ2VyXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgQWhvcmEgcGludGEgdW4gcFx1MDBFRHhlbCBlbiBsYSBlc3F1aW5hIElORkVSSU9SIERFUkVDSEEgZGVsIFx1MDBFMXJlYVwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBzZWxlY2NpXHUwMEYzbiBkZSBlc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYS4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBFc3BlcmFuZG8gc2VsZWNjaVx1MDBGM24gZGUgZXNxdWluYSBpbmZlcmlvciBkZXJlY2hhLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IEVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhIGNhcHR1cmFkYTogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgRXNxdWluYSBpbmZlcmlvciBkZXJlY2hhIGNhcHR1cmFkYTogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaVx1MDBGM25cIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZW4gc2VsZWNjaVx1MDBGM24sIGludFx1MDBFOW50YWxvIGRlIG51ZXZvXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgZW4gPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NlbGVjdGlvbicsXG4gICAgdXNlcjogJ1VzZXInLFxuICAgIGNoYXJnZXM6ICdDaGFyZ2VzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdEYXRhYmFzZScsXG4gICAgdXB0aW1lOiAnVXB0aW1lJyxcbiAgICBjbG9zZTogJ0Nsb3NlJyxcbiAgICBsYXVuY2g6ICdMYXVuY2gnLFxuICAgIGxvYWRpbmc6ICdMb2FkaW5nXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFeGVjdXRpbmdcdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnRG93bmxvYWRpbmcgc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdDaG9vc2UgYSBib3QgYW5kIHByZXNzIExhdW5jaCcsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1JlYWR5IHRvIGxhdW5jaCcsXG4gICAgbG9hZEVycm9yOiAnTG9hZCBlcnJvcicsXG4gICAgbG9hZEVycm9yTXNnOiAnQ291bGQgbm90IGxvYWQgdGhlIHNlbGVjdGVkIGJvdC4gQ2hlY2sgeW91ciBjb25uZWN0aW9uIG9yIHRyeSBhZ2Fpbi4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IENoZWNraW5nLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgT25saW5lJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IE9mZmxpbmUnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIE9LJyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBFcnJvcicsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpemUgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJVcGxvYWQgSW1hZ2VcIixcbiAgICByZXNpemVJbWFnZTogXCJSZXNpemUgSW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTZWxlY3QgUG9zaXRpb25cIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlN0YXJ0IFBhaW50aW5nXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlN0b3AgUGFpbnRpbmdcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiU2F2ZSBQcm9ncmVzc1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJMb2FkIFByb2dyZXNzXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIENoZWNraW5nIGF2YWlsYWJsZSBjb2xvcnMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBPcGVuIHRoZSBjb2xvciBwYWxldHRlIG9uIHRoZSBzaXRlIGFuZCB0cnkgYWdhaW4hXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IEZvdW5kIHtjb3VudH0gYXZhaWxhYmxlIGNvbG9yc1wiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgTG9hZGluZyBpbWFnZS4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBJbWFnZSBsb2FkZWQgd2l0aCB7Y291bnR9IHZhbGlkIHBpeGVsc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGxvYWRpbmcgaW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlBhaW50IHRoZSBmaXJzdCBwaXhlbCBhdCB0aGUgbG9jYXRpb24gd2hlcmUgeW91IHdhbnQgdGhlIGFydCB0byBzdGFydCFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHlvdSB0byBwYWludCB0aGUgcmVmZXJlbmNlIHBpeGVsLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFBvc2l0aW9uIHNldCBzdWNjZXNzZnVsbHkhXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaW1lb3V0IGZvciBwb3NpdGlvbiBzZWxlY3Rpb25cIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBQb3NpdGlvbiBkZXRlY3RlZCwgcHJvY2Vzc2luZy4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIEVycm9yIGRldGVjdGluZyBwb3NpdGlvbiwgcGxlYXNlIHRyeSBhZ2FpblwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IFN0YXJ0aW5nIHBhaW50aW5nLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgUHJvZ3Jlc3M6IHtwYWludGVkfS97dG90YWx9IHBpeGVscy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgTm8gY2hhcmdlcy4gV2FpdGluZyB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFBhaW50aW5nIHN0b3BwZWQgYnkgdXNlclwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFBhaW50aW5nIGNvbXBsZXRlZCEge2NvdW50fSBwaXhlbHMgcGFpbnRlZC5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJvciBkdXJpbmcgcGFpbnRpbmdcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBMb2FkIGFuIGltYWdlIGFuZCBzZWxlY3QgYSBwb3NpdGlvbiBmaXJzdFwiLFxuICAgIHByb2dyZXNzOiBcIlByb2dyZXNzXCIsXG4gICAgdXNlck5hbWU6IFwiVXNlclwiLFxuICAgIHBpeGVsczogXCJQaXhlbHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIkVzdGltYXRlZCB0aW1lXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiQ2xpY2sgJ0luaXRpYWxpemUgQXV0by1CT1QnIHRvIGJlZ2luXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiV2FpdGluZyBmb3IgaW5pdGlhbGl6YXRpb24uLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBJbWFnZSByZXNpemVkIHRvIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgUGFpbnRpbmcgcGF1c2VkIGF0IHBvc2l0aW9uIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzIHBlciBiYXRjaFwiLFxuICAgIGJhdGNoU2l6ZTogXCJCYXRjaCBzaXplXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJOZXh0IGJhdGNoIGluXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVc2UgYWxsIGF2YWlsYWJsZSBjaGFyZ2VzXCIsXG4gICAgc2hvd092ZXJsYXk6IFwiU2hvdyBvdmVybGF5XCIsXG4gICAgbWF4Q2hhcmdlczogXCJNYXggY2hhcmdlcyBwZXIgYmF0Y2hcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgV2FpdGluZyBmb3IgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJUaW1lIHJlbWFpbmluZ1wiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgV2FpdGluZyB7dGltZX0gdG8gY29udGludWUuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBQcm9ncmVzcyBzYXZlZCBhcyB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFByb2dyZXNzIGxvYWRlZDoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzIHBhaW50ZWRcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgRXJyb3IgbG9hZGluZyBwcm9ncmVzczoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBzYXZpbmcgcHJvZ3Jlc3M6IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIkRvIHlvdSB3YW50IHRvIHNhdmUgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgYmVmb3JlIHN0b3BwaW5nP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlNhdmUgUHJvZ3Jlc3NcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiRGlzY2FyZFwiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxcIixcbiAgICBtaW5pbWl6ZTogXCJNaW5pbWl6ZVwiLFxuICAgIHdpZHRoOiBcIldpZHRoXCIsXG4gICAgaGVpZ2h0OiBcIkhlaWdodFwiLCBcbiAgICBrZWVwQXNwZWN0OiBcIktlZXAgYXNwZWN0IHJhdGlvXCIsXG4gICAgYXBwbHk6IFwiQXBwbHlcIixcbiAgb3ZlcmxheU9uOiBcIk92ZXJsYXk6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheTogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzcyBjb21wbGV0ZWQ6IHtwYWludGVkfSBwaXhlbHMgcGFpbnRlZCB8IFByb2dyZXNzOiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2UgcmVnZW5lcmF0aW9uOiB7Y3VycmVudH0ve25lZWRlZH0gLSBUaW1lOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgV2FpdGluZyBmb3IgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUmVtYWluaW5nOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBBdXRvLWluaXRpYWxpemluZy4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGF1dG8tc3RhcnRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgQ291bGQgbm90IGF1dG8tc3RhcnQuIFVzZSBtYW51YWwgYnV0dG9uLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggQ29sb3IgcGFsZXR0ZSBkZXRlY3RlZFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgU2VhcmNoaW5nIGZvciBjb2xvciBwYWxldHRlLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpY2tpbmcgUGFpbnQgYnV0dG9uLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgUGFpbnQgYnV0dG9uIG5vdCBmb3VuZFwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgTWFudWFsIGluaXRpYWxpemF0aW9uIHJlcXVpcmVkXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBSZXRyeSB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBpbiB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycm9yIGluIGF0dGVtcHQge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIHJldHJ5aW5nIGluIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIEZhaWxlZCBhZnRlciB7bWF4QXR0ZW1wdHN9IGF0dGVtcHRzLiBDb250aW51aW5nIHdpdGggbmV4dCBiYXRjaC4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgTmV0d29yayBlcnJvci4gUmV0cnlpbmcuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgU2VydmVyIGVycm9yLiBSZXRyeWluZy4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgU2VydmVyIHRpbWVvdXQuIFJldHJ5aW5nLi4uXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAodG8gYmUgaW1wbGVtZW50ZWQpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgRmFybSBCb3RcIixcbiAgICBzdGFydDogXCJTdGFydFwiLFxuICAgIHN0b3A6IFwiU3RvcFwiLFxuICAgIHN0b3BwZWQ6IFwiQm90IHN0b3BwZWRcIixcbiAgICBjYWxpYnJhdGU6IFwiQ2FsaWJyYXRlXCIsXG4gICAgcGFpbnRPbmNlOiBcIk9uY2VcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJDaGVja2luZyBzdGF0dXMuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYXRpb25cIixcbiAgICBkZWxheTogXCJEZWxheSAobXMpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzL2JhdGNoXCIsXG4gICAgbWluQ2hhcmdlczogXCJNaW4gY2hhcmdlc1wiLFxuICAgIGNvbG9yTW9kZTogXCJDb2xvciBtb2RlXCIsXG4gICAgcmFuZG9tOiBcIlJhbmRvbVwiLFxuICAgIGZpeGVkOiBcIkZpeGVkXCIsXG4gICAgcmFuZ2U6IFwiUmFuZ2VcIixcbiAgICBmaXhlZENvbG9yOiBcIkZpeGVkIGNvbG9yXCIsXG4gICAgYWR2YW5jZWQ6IFwiQWR2YW5jZWRcIixcbiAgICB0aWxlWDogXCJUaWxlIFhcIixcbiAgICB0aWxlWTogXCJUaWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIkN1c3RvbSBwYWxldHRlXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZS5nOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiQ2FwdHVyZVwiLFxuICAgIHBhaW50ZWQ6IFwiUGFpbnRlZFwiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIHJldHJpZXM6IFwiUmV0cmllc1wiLFxuICAgIHRpbGU6IFwiVGlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYXRpb24gc2F2ZWRcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiQ29uZmlndXJhdGlvbiBsb2FkZWRcIixcbiAgICBjb25maWdSZXNldDogXCJDb25maWd1cmF0aW9uIHJlc2V0XCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQYWludCBhIHBpeGVsIG1hbnVhbGx5IHRvIGNhcHR1cmUgY29vcmRpbmF0ZXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgT25saW5lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBPZmZsaW5lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiU3RhcnRpbmcgYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiU3RvcHBpbmcgYm90Li4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiQ2FsaWJyYXRpbmcuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJBdXRvLUZhcm0gaXMgYWxyZWFkeSBydW5uaW5nLlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiQXV0by1JbWFnZSBpcyBydW5uaW5nLiBDbG9zZSBpdCBiZWZvcmUgc3RhcnRpbmcgQXV0by1GYXJtLlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjdCBBcmVhXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGFpbnQgYSBwaXhlbCBpbiBhbiBFTVBUWSBhcmVhIG9mIHRoZSBtYXAgdG8gc2V0IHRoZSBmYXJtaW5nIHpvbmVcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHlvdSB0byBwYWludCB0aGUgcmVmZXJlbmNlIHBpeGVsLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IEFyZWEgc2V0ISBSYWRpdXM6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBUaW1lb3V0IGZvciBhcmVhIHNlbGVjdGlvblwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgU2VsZWN0IGFuIGFyZWEgZmlyc3QgdXNpbmcgJ1NlbGVjdCBBcmVhJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiRmFybSByYWRpdXNcIixcbiAgICBwb3NpdGlvbkluZm86IFwiQ3VycmVudCBhcmVhXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBGYXJtaW5nIGluIHtyYWRpdXN9cHggcmFkaXVzIGZyb20gKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBJTVBPUlRBTlQ6IFNlbGVjdCBhbiBFTVBUWSBhcmVhIHRvIGF2b2lkIGNvbmZsaWN0c1wiLFxuICAgIG5vUG9zaXRpb246IFwiTm8gYXJlYVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmU6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU2VsZWN0IGFuIGFyZWEgZmlyc3QuIFBhaW50IGEgcGl4ZWwgb24gdGhlIG1hcCB0byBzZXQgdGhlIGZhcm1pbmcgem9uZVwiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiWWVzXCIsXG4gICAgbm86IFwiTm9cIixcbiAgICBvazogXCJPS1wiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxcIixcbiAgICBjbG9zZTogXCJDbG9zZVwiLFxuICAgIHNhdmU6IFwiU2F2ZVwiLFxuICAgIGxvYWQ6IFwiTG9hZFwiLFxuICAgIGRlbGV0ZTogXCJEZWxldGVcIixcbiAgICBlZGl0OiBcIkVkaXRcIixcbiAgICBzdGFydDogXCJTdGFydFwiLFxuICAgIHN0b3A6IFwiU3RvcFwiLFxuICAgIHBhdXNlOiBcIlBhdXNlXCIsXG4gICAgcmVzdW1lOiBcIlJlc3VtZVwiLFxuICAgIHJlc2V0OiBcIlJlc2V0XCIsXG4gICAgc2V0dGluZ3M6IFwiU2V0dGluZ3NcIixcbiAgICBoZWxwOiBcIkhlbHBcIixcbiAgICBhYm91dDogXCJBYm91dFwiLFxuICAgIGxhbmd1YWdlOiBcIkxhbmd1YWdlXCIsXG4gICAgbG9hZGluZzogXCJMb2FkaW5nLi4uXCIsXG4gICAgZXJyb3I6IFwiRXJyb3JcIixcbiAgICBzdWNjZXNzOiBcIlN1Y2Nlc3NcIixcbiAgICB3YXJuaW5nOiBcIldhcm5pbmdcIixcbiAgICBpbmZvOiBcIkluZm9ybWF0aW9uXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIkxhbmd1YWdlIGNoYW5nZWQgdG8ge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gR3VhcmQgTW9kdWxlXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tR3VhcmRcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpemUgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTZWxlY3QgQXJlYVwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIkNhcHR1cmUgQXJlYVwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJTdGFydCBQcm90ZWN0aW9uXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiU3RvcCBQcm90ZWN0aW9uXCIsXG4gICAgdXBwZXJMZWZ0OiBcIlVwcGVyIExlZnQgQ29ybmVyXCIsXG4gICAgbG93ZXJSaWdodDogXCJMb3dlciBSaWdodCBDb3JuZXJcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiUHJvdGVjdGVkIFBpeGVsc1wiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJEZXRlY3RlZCBDaGFuZ2VzXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiUmVwYWlyZWQgUGl4ZWxzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiV2FpdGluZyBmb3IgaW5pdGlhbGl6YXRpb24uLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggQ2hlY2tpbmcgYXZhaWxhYmxlIGNvbG9ycy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIE5vIGNvbG9ycyBmb3VuZC4gT3BlbiB0aGUgY29sb3IgcGFsZXR0ZSBvbiB0aGUgc2l0ZS5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgRm91bmQge2NvdW50fSBhdmFpbGFibGUgY29sb3JzXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIEVycm9yIGluaXRpYWxpemluZyBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBJbnZhbGlkIGNvb3JkaW5hdGVzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIEFyZWEgbXVzdCBoYXZlIHVwcGVyIGxlZnQgY29ybmVyIGxlc3MgdGhhbiBsb3dlciByaWdodCBjb3JuZXJcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIEFyZWEgdG9vIGxhcmdlOiB7c2l6ZX0gcGl4ZWxzIChtYXhpbXVtOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJpbmcgcHJvdGVjdGlvbiBhcmVhLi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBBcmVhIGNhcHR1cmVkOiB7Y291bnR9IHBpeGVscyB1bmRlciBwcm90ZWN0aW9uXCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBjYXB0dXJpbmcgYXJlYToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgRmlyc3QgY2FwdHVyZSBhIHByb3RlY3Rpb24gYXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWN0aW9uIHN0YXJ0ZWQgLSBtb25pdG9yaW5nIGFyZWFcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUHJvdGVjdGlvbiBzdG9wcGVkXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBQcm90ZWN0ZWQgYXJlYSAtIG5vIGNoYW5nZXMgZGV0ZWN0ZWRcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2hhbmdlcyBkZXRlY3RlZCBpbiBwcm90ZWN0ZWQgYXJlYVwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgUmVwYWlyaW5nIHtjb3VudH0gYWx0ZXJlZCBwaXhlbHMuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFN1Y2Nlc3NmdWxseSByZXBhaXJlZCB7Y291bnR9IHBpeGVsc1wiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJvciByZXBhaXJpbmcgcGl4ZWxzOiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBJbnN1ZmZpY2llbnQgY2hhcmdlcyB0byByZXBhaXIgY2hhbmdlc1wiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgQ2hlY2tpbmcgY2hhbmdlcyBpbiBwcm90ZWN0ZWQgYXJlYS4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIEVycm9yIGNoZWNraW5nIGNoYW5nZXM6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR3VhcmRpYW4gYWN0aXZlIC0gYXJlYSB1bmRlciBwcm90ZWN0aW9uXCIsXG4gICAgbGFzdENoZWNrOiBcIkxhc3QgY2hlY2s6IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJOZXh0IGNoZWNrIGluOiB7dGltZX1zXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgQXV0by1pbml0aWFsaXppbmcuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBhdXRvLXN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIENvdWxkIG5vdCBhdXRvLXN0YXJ0LiBVc2UgbWFudWFsIGJ1dHRvbi5cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IE1hbnVhbCBpbml0aWFsaXphdGlvbiByZXF1aXJlZFwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggQ29sb3IgcGFsZXR0ZSBkZXRlY3RlZFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgU2VhcmNoaW5nIGZvciBjb2xvciBwYWxldHRlLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpY2tpbmcgUGFpbnQgYnV0dG9uLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgUGFpbnQgYnV0dG9uIG5vdCBmb3VuZFwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgUGFpbnQgYSBwaXhlbCBhdCB0aGUgVVBQRVIgTEVGVCBjb3JuZXIgb2YgdGhlIGFyZWEgdG8gcHJvdGVjdFwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIE5vdyBwYWludCBhIHBpeGVsIGF0IHRoZSBMT1dFUiBSSUdIVCBjb3JuZXIgb2YgdGhlIGFyZWFcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBXYWl0aW5nIGZvciB1cHBlciBsZWZ0IGNvcm5lciBzZWxlY3Rpb24uLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgbG93ZXIgcmlnaHQgY29ybmVyIHNlbGVjdGlvbi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBVcHBlciBsZWZ0IGNvcm5lciBjYXB0dXJlZDogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgTG93ZXIgcmlnaHQgY29ybmVyIGNhcHR1cmVkOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgU2VsZWN0aW9uIHRpbWVvdXRcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgU2VsZWN0aW9uIGVycm9yLCBwbGVhc2UgdHJ5IGFnYWluXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgZnIgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NcdTAwRTlsZWN0aW9uJyxcbiAgICB1c2VyOiAnVXRpbGlzYXRldXInLFxuICAgIGNoYXJnZXM6ICdDaGFyZ2VzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdCYXNlIGRlIGRvbm5cdTAwRTllcycsXG4gICAgdXB0aW1lOiAnVGVtcHMgYWN0aWYnLFxuICAgIGNsb3NlOiAnRmVybWVyJyxcbiAgICBsYXVuY2g6ICdMYW5jZXInLFxuICAgIGxvYWRpbmc6ICdDaGFyZ2VtZW50XHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFeFx1MDBFOWN1dGlvblx1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdUXHUwMEU5bFx1MDBFOWNoYXJnZW1lbnQgZHUgc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdDaG9pc2lzc2V6IHVuIGJvdCBldCBhcHB1eWV6IHN1ciBMYW5jZXInLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdQclx1MDBFQXQgXHUwMEUwIGxhbmNlcicsXG4gICAgbG9hZEVycm9yOiAnRXJyZXVyIGRlIGNoYXJnZW1lbnQnLFxuICAgIGxvYWRFcnJvck1zZzogJ0ltcG9zc2libGUgZGUgY2hhcmdlciBsZSBib3Qgc1x1MDBFOWxlY3Rpb25uXHUwMEU5LiBWXHUwMEU5cmlmaWV6IHZvdHJlIGNvbm5leGlvbiBvdSByXHUwMEU5ZXNzYXllei4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFZcdTAwRTlyaWZpY2F0aW9uLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgRW4gbGlnbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgSG9ycyBsaWduZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycmV1cicsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tSW1hZ2VcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpc2VyIEF1dG8tQk9UXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiVFx1MDBFOWxcdTAwRTljaGFyZ2VyIEltYWdlXCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiUmVkaW1lbnNpb25uZXIgSW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTXHUwMEU5bGVjdGlvbm5lciBQb3NpdGlvblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiQ29tbWVuY2VyIFBlaW50dXJlXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIkFyclx1MDBFQXRlciBQZWludHVyZVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJTYXV2ZWdhcmRlciBQcm9nclx1MDBFOHNcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiQ2hhcmdlciBQcm9nclx1MDBFOHNcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgVlx1MDBFOXJpZmljYXRpb24gZGVzIGNvdWxldXJzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgT3V2cmV6IGxhIHBhbGV0dGUgZGUgY291bGV1cnMgc3VyIGxlIHNpdGUgZXQgclx1MDBFOWVzc2F5ZXohXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IHtjb3VudH0gY291bGV1cnMgZGlzcG9uaWJsZXMgdHJvdXZcdTAwRTllc1wiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgQ2hhcmdlbWVudCBkZSBsJ2ltYWdlLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IEltYWdlIGNoYXJnXHUwMEU5ZSBhdmVjIHtjb3VudH0gcGl4ZWxzIHZhbGlkZXNcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkdSBjaGFyZ2VtZW50IGRlIGwnaW1hZ2VcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlBlaWduZXogbGUgcHJlbWllciBwaXhlbCBcdTAwRTAgbCdlbXBsYWNlbWVudCBvXHUwMEY5IHZvdXMgdm91bGV6IHF1ZSBsJ2FydCBjb21tZW5jZSFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVuIGF0dGVudGUgcXVlIHZvdXMgcGVpZ25pZXogbGUgcGl4ZWwgZGUgclx1MDBFOWZcdTAwRTlyZW5jZS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBQb3NpdGlvbiBkXHUwMEU5ZmluaWUgYXZlYyBzdWNjXHUwMEU4cyFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZFx1MDBFOXBhc3NcdTAwRTkgcG91ciBsYSBzXHUwMEU5bGVjdGlvbiBkZSBwb3NpdGlvblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2l0aW9uIGRcdTAwRTl0ZWN0XHUwMEU5ZSwgdHJhaXRlbWVudC4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBkXHUwMEU5dGVjdGFudCBsYSBwb3NpdGlvbiwgZXNzYXlleiBcdTAwRTAgbm91dmVhdVwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IERcdTAwRTlidXQgZGUgbGEgcGVpbnR1cmUuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9nclx1MDBFOHM6IHtwYWludGVkfS97dG90YWx9IHBpeGVscy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgQXVjdW5lIGNoYXJnZS4gQXR0ZW5kcmUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQZWludHVyZSBhcnJcdTAwRUF0XHUwMEU5ZSBwYXIgbCd1dGlsaXNhdGV1clwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFBlaW50dXJlIHRlcm1pblx1MDBFOWUhIHtjb3VudH0gcGl4ZWxzIHBlaW50cy5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJldXIgcGVuZGFudCBsYSBwZWludHVyZVwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIENoYXJnZXogdW5lIGltYWdlIGV0IHNcdTAwRTlsZWN0aW9ubmV6IHVuZSBwb3NpdGlvbiBkJ2Fib3JkXCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3JcdTAwRThzXCIsXG4gICAgdXNlck5hbWU6IFwiVXNhZ2VyXCIsXG4gICAgcGl4ZWxzOiBcIlBpeGVsc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiVGVtcHMgZXN0aW1cdTAwRTlcIixcbiAgICBpbml0TWVzc2FnZTogXCJDbGlxdWV6IHN1ciAnSW5pdGlhbGlzZXIgQXV0by1CT1QnIHBvdXIgY29tbWVuY2VyXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiRW4gYXR0ZW50ZSBkJ2luaXRpYWxpc2F0aW9uLi4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgSW1hZ2UgcmVkaW1lbnNpb25uXHUwMEU5ZSBcdTAwRTAge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQZWludHVyZSBtaXNlIGVuIHBhdXNlIFx1MDBFMCBsYSBwb3NpdGlvbiBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBpeGVscyBwYXIgbG90XCIsXG4gICAgYmF0Y2hTaXplOiBcIlRhaWxsZSBkdSBsb3RcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlByb2NoYWluIGxvdCBkYW5zXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVdGlsaXNlciB0b3V0ZXMgbGVzIGNoYXJnZXMgZGlzcG9uaWJsZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJBZmZpY2hlciBsJ292ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIkNoYXJnZXMgbWF4IHBhciBsb3RcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgRW4gYXR0ZW50ZSBkZSBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRlbXBzIHJlc3RhbnRcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIEF0dGVuZHJlIHt0aW1lfSBwb3VyIGNvbnRpbnVlci4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyXHUwMEU4cyBzYXV2ZWdhcmRcdTAwRTkgc291cyB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFByb2dyXHUwMEU4cyBjaGFyZ1x1MDBFOToge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzIHBlaW50c1wiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkdSBjaGFyZ2VtZW50IGR1IHByb2dyXHUwMEU4czoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlIGR1IHByb2dyXHUwMEU4czoge2Vycm9yfVwiLFxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiVm91bGV6LXZvdXMgc2F1dmVnYXJkZXIgbGUgcHJvZ3JcdTAwRThzIGFjdHVlbCBhdmFudCBkJ2Fyclx1MDBFQXRlcj9cIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJTYXV2ZWdhcmRlciBQcm9nclx1MDBFOHNcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiQWJhbmRvbm5lclwiLFxuICAgIGNhbmNlbDogXCJBbm51bGVyXCIsXG4gICAgbWluaW1pemU6IFwiTWluaW1pc2VyXCIsXG4gICAgd2lkdGg6IFwiTGFyZ2V1clwiLFxuICAgIGhlaWdodDogXCJIYXV0ZXVyXCIsIFxuICAgIGtlZXBBc3BlY3Q6IFwiR2FyZGVyIGxlcyBwcm9wb3J0aW9uc1wiLFxuICAgIGFwcGx5OiBcIkFwcGxpcXVlclwiLFxuICBvdmVybGF5T246IFwiT3ZlcmxheSA6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheSA6IE9GRlwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFBhc3NhZ2UgdGVybWluXHUwMEU5OiB7cGFpbnRlZH0gcGl4ZWxzIHBlaW50cyB8IFByb2dyXHUwMEU4czoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgQXR0ZW50ZSBkZSByXHUwMEU5Z1x1MDBFOW5cdTAwRTlyYXRpb24gZGVzIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfSAtIFRlbXBzOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgQXR0ZW50ZSBkZXMgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUmVzdGFudDoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgSW5pdGlhbGlzYXRpb24gYXV0b21hdGlxdWUuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEJvdCBkXHUwMEU5bWFyclx1MDBFOSBhdXRvbWF0aXF1ZW1lbnRcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgSW1wb3NzaWJsZSBkZSBkXHUwMEU5bWFycmVyIGF1dG9tYXRpcXVlbWVudC4gVXRpbGlzZXogbGUgYm91dG9uIG1hbnVlbC5cIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFBhbGV0dGUgZGUgY291bGV1cnMgZFx1MDBFOXRlY3RcdTAwRTllXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBSZWNoZXJjaGUgZGUgbGEgcGFsZXR0ZSBkZSBjb3VsZXVycy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IENsaWMgc3VyIGxlIGJvdXRvbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdXRvbiBQYWludCBpbnRyb3V2YWJsZVwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pdGlhbGlzYXRpb24gbWFudWVsbGUgcmVxdWlzZVwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgVGVudGF0aXZlIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGRhbnMge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBFcnJldXIgZGFucyB0ZW50YXRpdmUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30sIG5vdXZlbCBlc3NhaSBkYW5zIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1MDBDOWNoZWMgYXByXHUwMEU4cyB7bWF4QXR0ZW1wdHN9IHRlbnRhdGl2ZXMuIENvbnRpbnVhbnQgYXZlYyBsZSBsb3Qgc3VpdmFudC4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgRXJyZXVyIHJcdTAwRTlzZWF1LiBOb3V2ZWwgZXNzYWkuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgRXJyZXVyIHNlcnZldXIuIE5vdXZlbCBlc3NhaS4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgVGltZW91dCBzZXJ2ZXVyLiBOb3V2ZWwgZXNzYWkuLi5cIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBGYXJtIEJvdFwiLFxuICAgIHN0YXJ0OiBcIkRcdTAwRTltYXJyZXJcIixcbiAgICBzdG9wOiBcIkFyclx1MDBFQXRlclwiLFxuICAgIHN0b3BwZWQ6IFwiQm90IGFyclx1MDBFQXRcdTAwRTlcIixcbiAgICBjYWxpYnJhdGU6IFwiQ2FsaWJyZXJcIixcbiAgICBwYWludE9uY2U6IFwiVW5lIGZvaXNcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJWXHUwMEU5cmlmaWNhdGlvbiBkdSBzdGF0dXQuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYXRpb25cIixcbiAgICBkZWxheTogXCJEXHUwMEU5bGFpIChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMvbG90XCIsXG4gICAgbWluQ2hhcmdlczogXCJDaGFyZ2VzIG1pblwiLFxuICAgIGNvbG9yTW9kZTogXCJNb2RlIGNvdWxldXJcIixcbiAgICByYW5kb206IFwiQWxcdTAwRTlhdG9pcmVcIixcbiAgICBmaXhlZDogXCJGaXhlXCIsXG4gICAgcmFuZ2U6IFwiUGxhZ2VcIixcbiAgICBmaXhlZENvbG9yOiBcIkNvdWxldXIgZml4ZVwiLFxuICAgIGFkdmFuY2VkOiBcIkF2YW5jXHUwMEU5XCIsXG4gICAgdGlsZVg6IFwiVHVpbGUgWFwiLFxuICAgIHRpbGVZOiBcIlR1aWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlBhbGV0dGUgcGVyc29ubmFsaXNcdTAwRTllXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZXg6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJlclwiLFxuICAgIHBhaW50ZWQ6IFwiUGVpbnRzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgcmV0cmllczogXCJcdTAwQzljaGVjc1wiLFxuICAgIHRpbGU6IFwiVHVpbGVcIixcbiAgICBjb25maWdTYXZlZDogXCJDb25maWd1cmF0aW9uIHNhdXZlZ2FyZFx1MDBFOWVcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiQ29uZmlndXJhdGlvbiBjaGFyZ1x1MDBFOWVcIixcbiAgICBjb25maWdSZXNldDogXCJDb25maWd1cmF0aW9uIHJcdTAwRTlpbml0aWFsaXNcdTAwRTllXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQZWluZHJlIHVuIHBpeGVsIG1hbnVlbGxlbWVudCBwb3VyIGNhcHR1cmVyIGxlcyBjb29yZG9ublx1MDBFOWVzLi4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJCYWNrZW5kIEVuIGxpZ25lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBIb3JzIGxpZ25lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiRFx1MDBFOW1hcnJhZ2UgZHUgYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiQXJyXHUwMEVBdCBkdSBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhZ2UuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJBdXRvLUZhcm0gZXN0IGRcdTAwRTlqXHUwMEUwIGVuIGNvdXJzIGQnZXhcdTAwRTljdXRpb24uXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGVzdCBlbiBjb3VycyBkJ2V4XHUwMEU5Y3V0aW9uLiBGZXJtZXotbGUgYXZhbnQgZGUgZFx1MDBFOW1hcnJlciBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU1x1MDBFOWxlY3Rpb25uZXIgWm9uZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFBlaWduZXogdW4gcGl4ZWwgZGFucyB1bmUgem9uZSBWSURFIGRlIGxhIGNhcnRlIHBvdXIgZFx1MDBFOWZpbmlyIGxhIHpvbmUgZGUgZmFybWluZ1wiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBxdWUgdm91cyBwZWlnbmlleiBsZSBwaXhlbCBkZSByXHUwMEU5Zlx1MDBFOXJlbmNlLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFpvbmUgZFx1MDBFOWZpbmllISBSYXlvbjogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZFx1MDBFOXBhc3NcdTAwRTkgcG91ciBsYSBzXHUwMEU5bGVjdGlvbiBkZSB6b25lXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBkJ2Fib3JkIGVuIHV0aWxpc2FudCAnU1x1MDBFOWxlY3Rpb25uZXIgWm9uZSdcIixcbiAgICBmYXJtUmFkaXVzOiBcIlJheW9uIGZhcm1cIixcbiAgICBwb3NpdGlvbkluZm86IFwiWm9uZSBhY3R1ZWxsZVwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgRmFybWluZyBkYW5zIHVuIHJheW9uIGRlIHtyYWRpdXN9cHggZGVwdWlzICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgSU1QT1JUQU5UOiBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBWSURFIHBvdXIgXHUwMEU5dml0ZXIgbGVzIGNvbmZsaXRzXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJBdWN1bmUgem9uZVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmU6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU1x1MDBFOWxlY3Rpb25uZXogdW5lIHpvbmUgZCdhYm9yZC4gUGVpZ25leiB1biBwaXhlbCBzdXIgbGEgY2FydGUgcG91ciBkXHUwMEU5ZmluaXIgbGEgem9uZSBkZSBmYXJtaW5nXCJcbiAgfSxcblxuICAgIC8vIENvbW1vbi9TaGFyZWRcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIk91aVwiLFxuICAgIG5vOiBcIk5vblwiLFxuICAgIG9rOiBcIk9LXCIsXG4gICAgY2FuY2VsOiBcIkFubnVsZXJcIixcbiAgICBjbG9zZTogXCJGZXJtZXJcIixcbiAgICBzYXZlOiBcIlNhdXZlZ2FyZGVyXCIsXG4gICAgbG9hZDogXCJDaGFyZ2VyXCIsXG4gICAgZGVsZXRlOiBcIlN1cHByaW1lclwiLFxuICAgIGVkaXQ6IFwiTW9kaWZpZXJcIixcbiAgICBzdGFydDogXCJEXHUwMEU5bWFycmVyXCIsXG4gICAgc3RvcDogXCJBcnJcdTAwRUF0ZXJcIixcbiAgICBwYXVzZTogXCJQYXVzZVwiLFxuICAgIHJlc3VtZTogXCJSZXByZW5kcmVcIixcbiAgICByZXNldDogXCJSXHUwMEU5aW5pdGlhbGlzZXJcIixcbiAgICBzZXR0aW5nczogXCJQYXJhbVx1MDBFOHRyZXNcIixcbiAgICBoZWxwOiBcIkFpZGVcIixcbiAgICBhYm91dDogXCJcdTAwQzAgcHJvcG9zXCIsXG4gICAgbGFuZ3VhZ2U6IFwiTGFuZ3VlXCIsXG4gICAgbG9hZGluZzogXCJDaGFyZ2VtZW50Li4uXCIsXG4gICAgZXJyb3I6IFwiRXJyZXVyXCIsXG4gICAgc3VjY2VzczogXCJTdWNjXHUwMEU4c1wiLFxuICAgIHdhcm5pbmc6IFwiQXZlcnRpc3NlbWVudFwiLFxuICAgIGluZm86IFwiSW5mb3JtYXRpb25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiTGFuZ3VlIGNoYW5nXHUwMEU5ZSBlbiB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGlzZXIgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTXHUwMEU5bGVjdGlvbm5lciBab25lXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyZXIgWm9uZVwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJEXHUwMEU5bWFycmVyIFByb3RlY3Rpb25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJBcnJcdTAwRUF0ZXIgUHJvdGVjdGlvblwiLFxuICAgIHVwcGVyTGVmdDogXCJDb2luIFN1cFx1MDBFOXJpZXVyIEdhdWNoZVwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiQ29pbiBJbmZcdTAwRTlyaWV1ciBEcm9pdFwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQaXhlbHMgUHJvdFx1MDBFOWdcdTAwRTlzXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkNoYW5nZW1lbnRzIERcdTAwRTl0ZWN0XHUwMEU5c1wiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlBpeGVscyBSXHUwMEU5cGFyXHUwMEU5c1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVuIGF0dGVudGUgZCdpbml0aWFsaXNhdGlvbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBWXHUwMEU5cmlmaWNhdGlvbiBkZXMgY291bGV1cnMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBBdWN1bmUgY291bGV1ciB0cm91dlx1MDBFOWUuIE91dnJleiBsYSBwYWxldHRlIGRlIGNvdWxldXJzIHN1ciBsZSBzaXRlLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvdWxldXJzIGRpc3BvbmlibGVzIHRyb3V2XHUwMEU5ZXNcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaXRpYWxpc1x1MDBFOSBhdmVjIHN1Y2NcdTAwRThzXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsJ2luaXRpYWxpc2F0aW9uIGRlIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIENvb3Jkb25uXHUwMEU5ZXMgaW52YWxpZGVzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIExhIHpvbmUgZG9pdCBhdm9pciBsZSBjb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZSBpbmZcdTAwRTlyaWV1ciBhdSBjb2luIGluZlx1MDBFOXJpZXVyIGRyb2l0XCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBab25lIHRyb3AgZ3JhbmRlOiB7c2l6ZX0gcGl4ZWxzIChtYXhpbXVtOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJlIGRlIGxhIHpvbmUgZGUgcHJvdGVjdGlvbi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgWm9uZSBjYXB0dXJcdTAwRTllOiB7Y291bnR9IHBpeGVscyBzb3VzIHByb3RlY3Rpb25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGxhIGNhcHR1cmUgZGUgem9uZToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgQ2FwdHVyZXogZCdhYm9yZCB1bmUgem9uZSBkZSBwcm90ZWN0aW9uXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY3Rpb24gZFx1MDBFOW1hcnJcdTAwRTllIC0gc3VydmVpbGxhbmNlIGRlIGxhIHpvbmVcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUHJvdGVjdGlvbiBhcnJcdTAwRUF0XHUwMEU5ZVwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgWm9uZSBwcm90XHUwMEU5Z1x1MDBFOWUgLSBhdWN1biBjaGFuZ2VtZW50IGRcdTAwRTl0ZWN0XHUwMEU5XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNoYW5nZW1lbnRzIGRcdTAwRTl0ZWN0XHUwMEU5cyBkYW5zIGxhIHpvbmUgcHJvdFx1MDBFOWdcdTAwRTllXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSXHUwMEU5cGFyYXRpb24gZGUge2NvdW50fSBwaXhlbHMgYWx0XHUwMEU5clx1MDBFOXMuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IHtjb3VudH0gcGl4ZWxzIHJcdTAwRTlwYXJcdTAwRTlzIGF2ZWMgc3VjY1x1MDBFOHNcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgclx1MDBFOXBhcmF0aW9uIGRlcyBwaXhlbHM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIENoYXJnZXMgaW5zdWZmaXNhbnRlcyBwb3VyIHJcdTAwRTlwYXJlciBsZXMgY2hhbmdlbWVudHNcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFZcdTAwRTlyaWZpY2F0aW9uIGRlcyBjaGFuZ2VtZW50cyBkYW5zIGxhIHpvbmUgcHJvdFx1MDBFOWdcdTAwRTllLi4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgdlx1MDBFOXJpZmljYXRpb24gZGVzIGNoYW5nZW1lbnRzOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIEdhcmRpZW4gYWN0aWYgLSB6b25lIHNvdXMgcHJvdGVjdGlvblwiLFxuICAgIGxhc3RDaGVjazogXCJEZXJuaVx1MDBFOHJlIHZcdTAwRTlyaWZpY2F0aW9uOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiUHJvY2hhaW5lIHZcdTAwRTlyaWZpY2F0aW9uIGRhbnM6IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbml0aWFsaXNhdGlvbiBhdXRvbWF0aXF1ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGRcdTAwRTltYXJyXHUwMEU5IGF1dG9tYXRpcXVlbWVudFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBJbXBvc3NpYmxlIGRlIGRcdTAwRTltYXJyZXIgYXV0b21hdGlxdWVtZW50LiBVdGlsaXNleiBsZSBib3V0b24gbWFudWVsLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgSW5pdGlhbGlzYXRpb24gbWFudWVsbGUgcmVxdWlzZVwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXR0ZSBkZSBjb3VsZXVycyBkXHUwMEU5dGVjdFx1MDBFOWVcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFJlY2hlcmNoZSBkZSBsYSBwYWxldHRlIGRlIGNvdWxldXJzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpYyBzdXIgbGUgYm91dG9uIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm91dG9uIFBhaW50IGludHJvdXZhYmxlXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBQZWlnbmV6IHVuIHBpeGVsIGF1IGNvaW4gU1VQXHUwMEM5UklFVVIgR0FVQ0hFIGRlIGxhIHpvbmUgXHUwMEUwIHByb3RcdTAwRTlnZXJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBNYWludGVuYW50IHBlaWduZXogdW4gcGl4ZWwgYXUgY29pbiBJTkZcdTAwQzlSSUVVUiBEUk9JVCBkZSBsYSB6b25lXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBkZSBsYSBzXHUwMEU5bGVjdGlvbiBkdSBjb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZS4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIGRlIGxhIHNcdTAwRTlsZWN0aW9uIGR1IGNvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXQuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgQ29pbiBzdXBcdTAwRTlyaWV1ciBnYXVjaGUgY2FwdHVyXHUwMEU5OiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBDb2luIGluZlx1MDBFOXJpZXVyIGRyb2l0IGNhcHR1clx1MDBFOTogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZGUgc1x1MDBFOWxlY3Rpb24gZFx1MDBFOXBhc3NcdTAwRTlcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgRXJyZXVyIGRlIHNcdTAwRTlsZWN0aW9uLCB2ZXVpbGxleiByXHUwMEU5ZXNzYXllclwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHJ1ID0ge1xuICAvLyBMYXVuY2hlclxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIEF1dG9CT1QnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0MnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1JyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCcsXG4gICAgc2VsZWN0aW9uOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDNFJyxcbiAgICB1c2VyOiAnXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDJyxcbiAgICBjaGFyZ2VzOiAnXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGJyxcbiAgICBiYWNrZW5kOiAnXHUwNDExXHUwNDREXHUwNDNBXHUwNDM1XHUwNDNEXHUwNDM0JyxcbiAgICBkYXRhYmFzZTogJ1x1MDQxMVx1MDQzMFx1MDQzN1x1MDQzMCBcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0NDUnLFxuICAgIHVwdGltZTogJ1x1MDQxMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQ0RiBcdTA0NDBcdTA0MzBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0NEInLFxuICAgIGNsb3NlOiAnXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDJyxcbiAgICBsYXVuY2g6ICdcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMnLFxuICAgIGxvYWRpbmc6ICdcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAnLFxuICAgIGV4ZWN1dGluZzogJ1x1MDQxMlx1MDQ0Qlx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNScsXG4gICAgZG93bmxvYWRpbmc6ICdcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDNBXHUwNDQwXHUwNDM4XHUwNDNGXHUwNDQyXHUwNDMwLi4uJyxcbiAgICBjaG9vc2VCb3Q6ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwIFx1MDQzOCBcdTA0M0RcdTA0MzBcdTA0MzZcdTA0M0NcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHUwNDEzXHUwNDNFXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFIFx1MDQzQSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0NDMnLFxuICAgIGxvYWRFcnJvcjogJ1x1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzgnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1MDQxRFx1MDQzNVx1MDQzMlx1MDQzRVx1MDQzN1x1MDQzQ1x1MDQzRVx1MDQzNlx1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMC4gXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDRDXHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzRVx1MDQzNFx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0JcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQ0OVx1MDQzNSBcdTA0NDBcdTA0MzBcdTA0MzcuJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBcdTA0MUVcdTA0M0RcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0QnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgXHUwNDFFXHUwNDQ0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBcdTA0MUVcdTA0MUEnLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCcsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gSW1hZ2UgTW9kdWxlXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBpbml0Qm90OiBcIlx1MDQxOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICByZXNpemVJbWFnZTogXCJcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQwXHUwNDMwXHUwNDM3XHUwNDNDXHUwNDM1XHUwNDQwIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0M0UgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGxvYWRQcm9ncmVzczogXCJcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0MyBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIgXHUwNDNEXHUwNDMwIFx1MDQ0MVx1MDQzMFx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzggXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzMCFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHUwNDFEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDNFIHtjb3VudH0gXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQ0MSB7Y291bnR9IFx1MDQzNFx1MDQzNVx1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEZcdTA0M0NcdTA0MzhcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDM4IFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQ0Mlx1MDQzRVx1MDQzQyBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzUsIFx1MDQzM1x1MDQzNFx1MDQzNSBcdTA0MzJcdTA0NEIgXHUwNDQ1XHUwNDNFXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDM1LCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDNEXHUwNDNFXHUwNDNBIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzOFx1MDQzRFx1MDQzMFx1MDQzQlx1MDQ0MVx1MDQ0RiFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRGLi4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTA0MUZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwIFx1MDQ0M1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQ1x1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDM4XCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHUwNDFGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzMCwgXHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0ZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzgsIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzVcdTA0NDlcdTA0MzUgXHUwNDQwXHUwNDMwXHUwNDM3XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDNFIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MToge3BhaW50ZWR9IFx1MDQzOFx1MDQzNyB7dG90YWx9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOS4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgXHUwNDFEXHUwNDM1XHUwNDQyIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMi4gXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHUwNDIwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0MzVcdTA0M0NcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBcdTA0MjBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDNFISB7Y291bnR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0UuXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDZcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzUgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgXHUwNDIxXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0NcdTA0MzVcdTA0NDFcdTA0NDJcdTA0M0UgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwXCIsXG4gICAgcHJvZ3Jlc3M6IFwiXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgdXNlck5hbWU6IFwiXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXCIsXG4gICAgcGl4ZWxzOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0VcdTA0MzZcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDMyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHUwNDFEXHUwNDMwXHUwNDM2XHUwNDNDXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDBBQlx1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBBdXRvLUJPVFx1MDBCQiwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzguLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBcdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzNFx1MDQzRSB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFx1MDQyMFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDNEXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzOCBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0MzIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XHUwNDM1XCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1MDQyMFx1MDQzMFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQ0MCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzBcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlx1MDQyMVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQ0RVx1MDQ0OVx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzQgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3XCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTA0MThcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDQxXHUwNDM1IFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0NEJcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTA0MUZcdTA0M0VcdTA0M0FcdTA0MzBcdTA0MzdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgbWF4Q2hhcmdlczogXCJcdTA0MUNcdTA0MzBcdTA0M0FcdTA0NDFcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNCLVx1MDQzMlx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzIgXHUwNDM3XHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJcdTA0MTJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzggXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUge3RpbWV9IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM1XHUwNDNEIFx1MDQzQVx1MDQzMFx1MDQzQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0Q6IHtwYWludGVkfSBcdTA0MzhcdTA0Mzcge3RvdGFsfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNFXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzggXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXHUwNDMwOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXHUwNDMwOiB7ZXJyb3J9XCIsXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQyXHUwNDM1XHUwNDNBXHUwNDQzXHUwNDQ5XHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzQgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDNFXHUwNDM5P1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiXHUwNDFEXHUwNDM1IFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQ0Rlx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBjYW5jZWw6IFwiXHUwNDFFXHUwNDQyXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgbWluaW1pemU6IFwiXHUwNDIxXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDQzXHUwNDQyXHUwNDRDXCIsXG4gICAgd2lkdGg6IFwiXHUwNDI4XHUwNDM4XHUwNDQwXHUwNDM4XHUwNDNEXHUwNDMwXCIsXG4gICAgaGVpZ2h0OiBcIlx1MDQxMlx1MDQ0Qlx1MDQ0MVx1MDQzRVx1MDQ0Mlx1MDQzMFwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MVx1MDQzRVx1MDQzRVx1MDQ0Mlx1MDQzRFx1MDQzRVx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0VcdTA0M0RcIixcbiAgICBhcHBseTogXCJcdTA0MUZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0NDZcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ4XHUwNDM1XHUwNDNEOiB7cGFpbnRlZH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRSB8IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MToge3BlcmNlbnR9JSAoe2N1cnJlbnR9IFx1MDQzOFx1MDQzNyB7dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDMwOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9IC0gXHUwNDEyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMjoge2N1cnJlbnR9IFx1MDQzOFx1MDQzNyB7bmVlZGVkfSAtIFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0Rjoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDMwXHUwNDRGIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHUwNDExXHUwNDNFXHUwNDQyIFx1MDQ0M1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0JcdTA0NDFcdTA0NEYgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDMyXHUwNDRCXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQS4gXHUwNDE4XHUwNDQxXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQ0MyBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDMwLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHUwNDI2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQzRVx1MDQzOFx1MDQ0MVx1MDQzQSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzkgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDRCLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHUwNDFEXHUwNDMwXHUwNDM2XHUwNDMwXHUwNDQyXHUwNDM4XHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzOCBcdTAwQUJQYWludFx1MDBCQi4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1MDQxQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzMCBcdTAwQUJQYWludFx1MDBCQiBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTA0MjJcdTA0NDBcdTA0MzVcdTA0MzFcdTA0NDNcdTA0MzVcdTA0NDJcdTA0NDFcdTA0NEYgXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzMCB7YXR0ZW1wdH0gXHUwNDM4XHUwNDM3IHttYXhBdHRlbXB0c30gXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3IHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzUge2F0dGVtcHR9IFx1MDQzOFx1MDQzNyB7bWF4QXR0ZW1wdHN9LCBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3IHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0NDFcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0NEYge21heEF0dGVtcHRzfSBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0VcdTA0M0EuIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzIgXHUwNDQxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDM1XHUwNDNDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzNS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzNVx1MDQ0Mlx1MDQzOC4gXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDMwLiBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBcdTA0MjJcdTA0MzBcdTA0MzlcdTA0M0NcdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDQxXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDMwLiBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAodG8gYmUgaW1wbGVtZW50ZWQpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQ1wiLFxuICAgIHN0YXJ0OiBcIlx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0b3A6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcHBlZDogXCJcdTA0MTFcdTA0M0VcdTA0NDIgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXCIsXG4gICAgY2FsaWJyYXRlOiBcIlx1MDQxQVx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHBhaW50T25jZTogXCJcdTA0MTVcdTA0MzRcdTA0MzhcdTA0M0RcdTA0M0VcdTA0NDBcdTA0MzBcdTA0MzdcdTA0M0VcdTA0MzJcdTA0M0VcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDQzXHUwNDQxXHUwNDMwLi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBkZWxheTogXCJcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzAgKFx1MDQzQ1x1MDQ0MSlcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDM3XHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiXHUwNDFDXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDNDXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFXHUwNDM1IFx1MDQzQVx1MDQzRVx1MDQzQi1cdTA0MzJcdTA0M0VcIixcbiAgICBjb2xvck1vZGU6IFwiXHUwNDIwXHUwNDM1XHUwNDM2XHUwNDM4XHUwNDNDIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIHJhbmRvbTogXCJcdTA0MjFcdTA0M0JcdTA0NDNcdTA0NDdcdTA0MzBcdTA0MzlcdTA0M0RcdTA0NEJcdTA0MzlcIixcbiAgICBmaXhlZDogXCJcdTA0MjRcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzlcIixcbiAgICByYW5nZTogXCJcdTA0MTRcdTA0MzhcdTA0MzBcdTA0M0ZcdTA0MzBcdTA0MzdcdTA0M0VcdTA0M0RcIixcbiAgICBmaXhlZENvbG9yOiBcIlx1MDQyNFx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcIixcbiAgICBhZHZhbmNlZDogXCJcdTA0MjBcdTA0MzBcdTA0NDFcdTA0NDhcdTA0MzhcdTA0NDBcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzVcIixcbiAgICB0aWxlWDogXCJcdTA0MUZcdTA0M0JcdTA0MzhcdTA0NDJcdTA0M0FcdTA0MzAgWFwiLFxuICAgIHRpbGVZOiBcIlx1MDQxRlx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQzQVx1MDQzMCBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTA0MjFcdTA0MzJcdTA0M0VcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXCIsXG4gICAgcGFpbnRlZDogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0MzBcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0VcIixcbiAgICBjaGFyZ2VzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHJldHJpZXM6IFwiXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzOFwiLFxuICAgIHRpbGU6IFwiXHUwNDFGXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDNBXHUwNDMwXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiXHUwNDFBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiXHUwNDIxXHUwNDMxXHUwNDQwXHUwNDNFXHUwNDQxIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOFwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzJcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0NDNcdTA0NEUgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzMCBcdTA0M0FcdTA0M0VcdTA0M0VcdTA0NDBcdTA0MzRcdTA0MzhcdTA0M0RcdTA0MzBcdTA0NDIuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIlx1MDQxMVx1MDQ0RFx1MDQzQVx1MDQ0RFx1MDQzRFx1MDQzNCBcdTA0MUVcdTA0M0RcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJcdTA0MTFcdTA0NERcdTA0M0FcdTA0NERcdTA0M0RcdTA0MzRcIixcbiAgICBzdGFydGluZ0JvdDogXCJcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0EgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLi4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDMwIFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMC4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIlx1MDQxQVx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIlx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0MgXHUwNDQzXHUwNDM2XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0UuIFx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzRVx1MDQzQyBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwLlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxRlx1MDQyM1x1MDQyMVx1MDQyMlx1MDQxRVx1MDQxOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDRCLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNFXHUwNDMxXHUwNDNFXHUwNDM3XHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzAuXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0Ri4uLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzMCEgXHUwNDIwXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDQzXHUwNDQxOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDXHUwNDMwXHUwNDQzXHUwNDQyIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQxIFx1MDQzRlx1MDQzRVx1MDQzQ1x1MDQzRVx1MDQ0OVx1MDQ0Q1x1MDQ0RSBcdTAwQUJcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDXHUwMEJCXCIsXG4gICAgZmFybVJhZGl1czogXCJcdTA0MjBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDEgXHUwNDQ0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1MDQyMlx1MDQzNVx1MDQzQVx1MDQ0M1x1MDQ0OVx1MDQzMFx1MDQ0RiBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIFx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQyBcdTA0MzIgXHUwNDQwXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDQzXHUwNDQxXHUwNDM1IHtyYWRpdXN9cHggXHUwNDNFXHUwNDQyICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgXHUwNDEyXHUwNDEwXHUwNDE2XHUwNDFEXHUwNDFFOiBcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDFGXHUwNDIzXHUwNDIxXHUwNDIyXHUwNDIzXHUwNDJFIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QywgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzOFx1MDQzN1x1MDQzMVx1MDQzNVx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDRcdTA0M0JcdTA0MzhcdTA0M0FcdTA0NDJcdTA0M0VcdTA0MzIuXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTA0MURcdTA0MzVcdTA0NDIgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgY3VycmVudFpvbmU6IFwiXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFx1MDQyMVx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMCBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDLiBcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzRFx1MDQzMCBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0MzUsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0M0VcdTA0MzFcdTA0M0VcdTA0MzdcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0NFx1MDQzMFx1MDQ0MFx1MDQzQ1x1MDQzMC5cIlxuICB9LFxuXG4gIC8vIENvbW1vbi9TaGFyZWRcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1MDQxNFx1MDQzMFwiLFxuICAgIG5vOiBcIlx1MDQxRFx1MDQzNVx1MDQ0MlwiLFxuICAgIG9rOiBcIlx1MDQxRVx1MDQxQVwiLFxuICAgIGNhbmNlbDogXCJcdTA0MUVcdTA0NDJcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBjbG9zZTogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NENcIixcbiAgICBzYXZlOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGxvYWQ6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgZGVsZXRlOiBcIlx1MDQyM1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGVkaXQ6IFwiXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc3RhcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcDogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBwYXVzZTogXCJcdTA0MUZcdTA0NDBcdTA0MzhcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICByZXN1bWU6IFwiXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgcmVzZXQ6IFwiXHUwNDIxXHUwNDMxXHUwNDQwXHUwNDNFXHUwNDQxXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc2V0dGluZ3M6IFwiXHUwNDFEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4XCIsXG4gICAgaGVscDogXCJcdTA0MUZcdTA0M0VcdTA0M0NcdTA0M0VcdTA0NDlcdTA0NENcIixcbiAgICBhYm91dDogXCJcdTA0MThcdTA0M0RcdTA0NDRcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBsYW5ndWFnZTogXCJcdTA0MkZcdTA0MzdcdTA0NEJcdTA0M0FcIixcbiAgICBsb2FkaW5nOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMC4uLlwiLFxuICAgIGVycm9yOiBcIlx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMFwiLFxuICAgIHN1Y2Nlc3M6IFwiXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ1XCIsXG4gICAgd2FybmluZzogXCJcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0NDNcdTA0M0ZcdTA0NDBcdTA0MzVcdTA0MzZcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBpbmZvOiBcIlx1MDQxOFx1MDQzRFx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdTA0MkZcdTA0MzdcdTA0NEJcdTA0M0EgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEIFx1MDQzRFx1MDQzMCB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMFwiLFxuICAgIGluaXRCb3Q6IFwiXHUwNDE4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIEd1YXJkLUJPVFwiLFxuICAgIHNlbGVjdEFyZWE6IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGNhcHR1cmVBcmVhOiBcIlx1MDQxN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0M1wiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NDNcIixcbiAgICB1cHBlckxlZnQ6IFwiXHUwNDEyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQxQlx1MDQzNVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0MjNcdTA0MzNcdTA0M0VcdTA0M0JcIixcbiAgICBsb3dlclJpZ2h0OiBcIlx1MDQxRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0MUZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDIzXHUwNDMzXHUwNDNFXHUwNDNCXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzhcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiXHUwNDFFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlx1MDQxMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzhcIixcbiAgICBjaGFyZ2VzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzguLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0MzAgXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQ0Qi4gXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0MyBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIgXHUwNDNEXHUwNDMwIFx1MDQ0MVx1MDQzMFx1MDQzOVx1MDQ0Mlx1MDQzNS5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHUwNDFEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDNFIHtjb3VudH0gXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOCBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBcdTA0MURcdTA0MzVcdTA0MzRcdTA0MzVcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzJcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNFXHUwNDQwXHUwNDM0XHUwNDM4XHUwNDNEXHUwNDMwXHUwNDQyXHUwNDRCXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0M0RcdTA0MzAgXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0JcdTA0MzVcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQ0Q1x1MDQ0OFx1MDQzNSBcdTA0M0RcdTA0MzhcdTA0MzZcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMFwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0MVx1MDQzQlx1MDQzOFx1MDQ0OFx1MDQzQVx1MDQzRVx1MDQzQyBcdTA0MzFcdTA0M0VcdTA0M0JcdTA0NENcdTA0NDhcdTA0MzBcdTA0NEY6IHtzaXplfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgKFx1MDQzQ1x1MDQzMFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQzQ1x1MDQ0M1x1MDQzQzoge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEIuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzA6IHtjb3VudH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRlx1MDQzRVx1MDQzNCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0M0VcdTA0MzlcIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzAgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4OiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdTA0MjFcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEJcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzMCAtIFx1MDQzQ1x1MDQzRVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQzRFx1MDQzMyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyAtIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0RcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNFXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDMyIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1MDQxMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSB7Y291bnR9IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFx1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzlcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0Mzk6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNVx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzlcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDMyIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzguLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDM4IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOToge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTA0MjFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0MzYgXHUwNDMwXHUwNDNBXHUwNDQyXHUwNDM4XHUwNDMyXHUwNDM1XHUwNDNEIC0gXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQzNCBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0M0VcdTA0MzlcIixcbiAgICBsYXN0Q2hlY2s6IFwiXHUwNDFGXHUwNDNFXHUwNDQxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDNEXHUwNDRGXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMDoge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1MDQyMVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQ0RVx1MDQ0OVx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3OiB7dGltZX1cdTA0NDFcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTA0MURcdTA0MzUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzguIFx1MDQxOFx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0NDMgXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzMC5cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0RiBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzOSBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0NEIuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MURcdTA0MzBcdTA0MzZcdTA0MzBcdTA0NDJcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDM4IFx1MDBBQlBhaW50XHUwMEJCLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHUwNDFBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDMwIFx1MDBBQlBhaW50XHUwMEJCIFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxMlx1MDQxNVx1MDQyMFx1MDQyNVx1MDQxRFx1MDQxNVx1MDQxQyBcdTA0MUJcdTA0MTVcdTA0MTJcdTA0MUVcdTA0MUMgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDQzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDRCXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHUwNDIyXHUwNDM1XHUwNDNGXHUwNDM1XHUwNDQwXHUwNDRDIFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxRFx1MDQxOFx1MDQxNlx1MDQxRFx1MDQxNVx1MDQxQyBcdTA0MUZcdTA0MjBcdTA0MTBcdTA0MTJcdTA0MUVcdTA0MUMgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDQzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM1XHUwNDMzXHUwNDNFIFx1MDQzQlx1MDQzNVx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0MzAuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0RcdTA0MzhcdTA0MzZcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMC4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTA0MTJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDNCXHUwNDM1XHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQ0M1x1MDQzM1x1MDQzRVx1MDQzQiBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDdcdTA0MzVcdTA0M0Q6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRDogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQy1cdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwXCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAsIFx1MDQzRlx1MDQzRVx1MDQzNlx1MDQzMFx1MDQzQlx1MDQ0M1x1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMCwgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzMFwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHpoSGFucyA9IHtcbiAgLy8gXHU1NDJGXHU1MkE4XHU1NjY4XG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgXHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0EnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkUnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTgxRUFcdTUyQThcdTVCODhcdTYyQTQnLFxuICAgIHNlbGVjdGlvbjogJ1x1OTAwOVx1NjJFOScsXG4gICAgdXNlcjogJ1x1NzUyOFx1NjIzNycsXG4gICAgY2hhcmdlczogJ1x1NkIyMVx1NjU3MCcsXG4gICAgYmFja2VuZDogJ1x1NTQwRVx1N0FFRicsXG4gICAgZGF0YWJhc2U6ICdcdTY1NzBcdTYzNkVcdTVFOTMnLFxuICAgIHVwdGltZTogJ1x1OEZEMFx1ODg0Q1x1NjVGNlx1OTVGNCcsXG4gICAgY2xvc2U6ICdcdTUxNzNcdTk1RUQnLFxuICAgIGxhdW5jaDogJ1x1NTQyRlx1NTJBOCcsXG4gICAgbG9hZGluZzogJ1x1NTJBMFx1OEY3RFx1NEUyRFx1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1x1NkI2M1x1NTcyOFx1NEUwQlx1OEY3RFx1ODExQVx1NjcyQ1x1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnXHU5MDA5XHU2MkU5XHU0RTAwXHU0RTJBXHU2NzNBXHU1NjY4XHU0RUJBXHU1RTc2XHU3MEI5XHU1MUZCXHU1NDJGXHU1MkE4JyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHU1MUM2XHU1OTA3XHU1NDJGXHU1MkE4JyxcbiAgICBsb2FkRXJyb3I6ICdcdTUyQTBcdThGN0RcdTk1MTlcdThCRUYnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1NjVFMFx1NkNENVx1NTJBMFx1OEY3RFx1NjI0MFx1OTAwOVx1NjczQVx1NTY2OFx1NEVCQVx1MzAwMlx1OEJGN1x1NjhDMFx1NjdFNVx1N0Y1MVx1N0VEQ1x1OEZERVx1NjNBNVx1NjIxNlx1OTFDRFx1OEJENVx1MzAwMicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgXHU2OEMwXHU2N0U1XHU0RTJELi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgXHU1NzI4XHU3RUJGJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IFx1NzlCQlx1N0VCRicsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgXHU2QjYzXHU1RTM4JyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBcdTk1MTlcdThCRUYnLFxuICAgIHVua25vd246ICctJ1xuICB9LFxuXG4gIC8vIFx1N0VEOFx1NTZGRVx1NkEyMVx1NTc1N1xuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkVcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJBOFx1NjczQVx1NTY2OFx1NEVCQVwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1NEUwQVx1NEYyMFx1NTZGRVx1NzI0N1wiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1OEMwM1x1NjU3NFx1NTZGRVx1NzI0N1x1NTkyN1x1NUMwRlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTAwOVx1NjJFOVx1NEY0RFx1N0Y2RVwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2XCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1NTA1Q1x1NkI2Mlx1N0VEOFx1NTIzNlwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTRGRERcdTVCNThcdThGREJcdTVFQTZcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2XCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1NjhDMFx1NjdFNVx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1OEJGN1x1NTcyOFx1N0Y1MVx1N0FEOVx1NEUwQVx1NjI1M1x1NUYwMFx1OEMwM1x1ODI3Mlx1Njc3Rlx1NTQwRVx1OTFDRFx1OEJENVx1RkYwMVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTc5Q0RcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzJcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIFx1NkI2M1x1NTcyOFx1NTJBMFx1OEY3RFx1NTZGRVx1NzI0Ny4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTU2RkVcdTcyNDdcdTVERjJcdTUyQTBcdThGN0RcdUZGMENcdTY3MDlcdTY1NDhcdTUwQ0ZcdTdEMjAge2NvdW50fSBcdTRFMkFcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTU2RkVcdTcyNDdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1OEJGN1x1NTcyOFx1NEY2MFx1NjBGM1x1NUYwMFx1NTlDQlx1N0VEOFx1NTIzNlx1NzY4NFx1NTczMFx1NjVCOVx1NkQ4Mlx1N0IyQ1x1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1RkYwMVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU2RDgyXHU1M0MyXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NEY0RFx1N0Y2RVx1OEJCRVx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU5MDA5XHU2MkU5XHU4RDg1XHU2NUY2XCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHU1REYyXHU2OEMwXHU2RDRCXHU1MjMwXHU0RjREXHU3RjZFXHVGRjBDXHU1OTA0XHU3NDA2XHU0RTJELi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU2OEMwXHU2RDRCXHU1OTMxXHU4RDI1XHVGRjBDXHU4QkY3XHU5MUNEXHU4QkQ1XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2Li4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHU4RkRCXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIFx1NkNBMVx1NjcwOVx1NkIyMVx1NjU3MFx1MzAwMlx1N0I0OVx1NUY4NSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NzUyOFx1NjIzN1x1NURGMlx1NTA1Q1x1NkI2Mlx1N0VEOFx1NTIzNlwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1N0VEOFx1NTIzNlx1NUI4Q1x1NjIxMFx1RkYwMVx1NTE3MVx1N0VEOFx1NTIzNiB7Y291bnR9IFx1NEUyQVx1NTBDRlx1N0QyMFx1MzAwMlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIFx1N0VEOFx1NTIzNlx1OEZDN1x1N0EwQlx1NEUyRFx1NTFGQVx1OTUxOVwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1NTJBMFx1OEY3RFx1NTZGRVx1NzI0N1x1NUU3Nlx1OTAwOVx1NjJFOVx1NEY0RFx1N0Y2RVwiLFxuICAgIHByb2dyZXNzOiBcIlx1OEZEQlx1NUVBNlwiLFxuICAgIHVzZXJOYW1lOiBcIlx1NzUyOFx1NjIzN1wiLFxuICAgIHBpeGVsczogXCJcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3MFwiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiXHU5ODg0XHU4QkExXHU2NUY2XHU5NUY0XCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHU3MEI5XHU1MUZCXHUyMDFDXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBXHUyMDFEXHU1RjAwXHU1OUNCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgXHU1NkZFXHU3MjQ3XHU1REYyXHU4QzAzXHU2NTc0XHU0RTNBIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHU3RUQ4XHU1MjM2XHU2NjgyXHU1MDVDXHU0RThFXHU0RjREXHU3RjZFIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXHU2NTcwXCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1NjI3OVx1NkIyMVx1NTkyN1x1NUMwRlwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHU0RTBCXHU2QjIxXHU2Mjc5XHU2QjIxXHU2NUY2XHU5NUY0XCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTRGN0ZcdTc1MjhcdTYyNDBcdTY3MDlcdTUzRUZcdTc1MjhcdTZCMjFcdTY1NzBcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTY2M0VcdTc5M0FcdTg5ODZcdTc2RDZcdTVDNDJcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1NkJDRlx1NjI3OVx1NjcwMFx1NTkyN1x1NkIyMVx1NjU3MFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzA6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiXHU1MjY5XHU0RjU5XHU2NUY2XHU5NUY0XCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTdCNDlcdTVGODUge3RpbWV9IFx1NTQwRVx1N0VFN1x1N0VFRC4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1OEZEQlx1NUVBNlx1NURGMlx1NEZERFx1NUI1OFx1NEUzQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1NURGMlx1NTJBMFx1OEY3RFx1OEZEQlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwXHU1REYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1NTJBMFx1OEY3RFx1OEZEQlx1NUVBNlx1NTkzMVx1OEQyNToge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBcdTRGRERcdTVCNThcdThGREJcdTVFQTZcdTU5MzFcdThEMjU6IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1NTcyOFx1NTA1Q1x1NkI2Mlx1NEU0Qlx1NTI0RFx1ODk4MVx1NEZERFx1NUI1OFx1NUY1M1x1NTI0RFx1OEZEQlx1NUVBNlx1NTQxN1x1RkYxRlwiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTY1M0VcdTVGMDNcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgbWluaW1pemU6IFwiXHU2NzAwXHU1QzBGXHU1MzE2XCIsXG4gICAgd2lkdGg6IFwiXHU1QkJEXHU1RUE2XCIsXG4gICAgaGVpZ2h0OiBcIlx1OUFEOFx1NUVBNlwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHU0RkREXHU2MzAxXHU3RUI1XHU2QTJBXHU2QkQ0XCIsXG4gICAgYXBwbHk6IFwiXHU1RTk0XHU3NTI4XCIsXG4gICAgb3ZlcmxheU9uOiBcIlx1ODk4Nlx1NzZENlx1NUM0MjogXHU1RjAwXHU1NDJGXCIsXG4gICAgb3ZlcmxheU9mZjogXCJcdTg5ODZcdTc2RDZcdTVDNDI6IFx1NTE3M1x1OTVFRFwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1NjI3OVx1NkIyMVx1NUI4Q1x1NjIxMDogXHU1REYyXHU3RUQ4XHU1MjM2IHtwYWludGVkfSBcdTUwQ0ZcdTdEMjAgfCBcdThGREJcdTVFQTY6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3MFx1NjA2Mlx1NTkwRDoge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU2NUY2XHU5NUY0OiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTcwOiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTUyNjlcdTRGNTk6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NjVFMFx1NkNENVx1ODFFQVx1NTJBOFx1NTQyRlx1NTJBOFx1RkYwQ1x1OEJGN1x1NjI0Qlx1NTJBOFx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2OEMwXHU2RDRCXHU1MjMwXHU4QzAzXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThDMDNcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTcwQjlcdTUxRkJcdTdFRDhcdTUyMzZcdTYzMDlcdTk0QUUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFRDhcdTUyMzZcdTYzMDlcdTk0QUVcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHU5MUNEXHU4QkQ1IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9XHVGRjBDXHU3QjQ5XHU1Rjg1IHtkZWxheX0gXHU3OUQyLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHU3QjJDIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NUMxRFx1OEJENVx1NTFGQVx1OTUxOVx1RkYwQ1x1NUMwNlx1NTcyOCB7ZGVsYXl9IFx1NzlEMlx1NTQwRVx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBcdThEODVcdThGQzcge21heEF0dGVtcHRzfSBcdTZCMjFcdTVDMURcdThCRDVcdTU5MzFcdThEMjVcdTMwMDJcdTdFRTdcdTdFRURcdTRFMEJcdTRFMDBcdTYyNzkuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIFx1N0Y1MVx1N0VEQ1x1OTUxOVx1OEJFRlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTY3MERcdTUyQTFcdTU2NjhcdTk1MTlcdThCRUZcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThCRDUuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1NjcwRFx1NTJBMVx1NTY2OFx1OEQ4NVx1NjVGNlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiXG4gIH0sXG5cbiAgLy8gXHU1MTlDXHU1NzNBXHU2QTIxXHU1NzU3XHVGRjA4XHU1Rjg1XHU1QjlFXHU3M0IwXHVGRjA5XG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU1MTlDXHU1NzNBXHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgc3RhcnQ6IFwiXHU1RjAwXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBzdG9wcGVkOiBcIlx1NjczQVx1NTY2OFx1NEVCQVx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIGNhbGlicmF0ZTogXCJcdTY4MjFcdTUxQzZcIixcbiAgICBwYWludE9uY2U6IFwiXHU0RTAwXHU2QjIxXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiXHU2OEMwXHU2N0U1XHU3MkI2XHU2MDAxXHU0RTJELi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTkxNERcdTdGNkVcIixcbiAgICBkZWxheTogXCJcdTVFRjZcdThGREYgKFx1NkJFQlx1NzlEMilcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcIixcbiAgICBtaW5DaGFyZ2VzOiBcIlx1NjcwMFx1NUMxMVx1NkIyMVx1NjU3MFwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTk4OUNcdTgyNzJcdTZBMjFcdTVGMEZcIixcbiAgICByYW5kb206IFwiXHU5NjhGXHU2NzNBXCIsXG4gICAgZml4ZWQ6IFwiXHU1NkZBXHU1QjlBXCIsXG4gICAgcmFuZ2U6IFwiXHU4MzAzXHU1NkY0XCIsXG4gICAgZml4ZWRDb2xvcjogXCJcdTU2RkFcdTVCOUFcdTk4OUNcdTgyNzJcIixcbiAgICBhZHZhbmNlZDogXCJcdTlBRDhcdTdFQTdcIixcbiAgICB0aWxlWDogXCJcdTc0RTZcdTcyNDcgWFwiLFxuICAgIHRpbGVZOiBcIlx1NzRFNlx1NzI0NyBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTgxRUFcdTVCOUFcdTRFNDlcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTRGOEJcdTU5ODI6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTYzNTVcdTgzQjdcIixcbiAgICBwYWludGVkOiBcIlx1NURGMlx1N0VEOFx1NTIzNlwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgcmV0cmllczogXCJcdTkxQ0RcdThCRDVcIixcbiAgICB0aWxlOiBcIlx1NzRFNlx1NzI0N1wiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NEZERFx1NUI1OFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTUyQTBcdThGN0RcIixcbiAgICBjb25maWdSZXNldDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTkxQ0RcdTdGNkVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlx1OEJGN1x1NjI0Qlx1NTJBOFx1N0VEOFx1NTIzNlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1NEVFNVx1NjM1NVx1ODNCN1x1NTc1MFx1NjgwNy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHU1NDBFXHU3QUVGXHU1NzI4XHU3RUJGXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiXHU1NDBFXHU3QUVGXHU3OUJCXHU3RUJGXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1NDJGXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1MDVDXHU2QjYyXHU2NzNBXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHU2ODIxXHU1MUM2XHU0RTJELi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHU4MUVBXHU1MkE4XHU1MTlDXHU1NzNBXHU1REYyXHU1NzI4XHU4RkQwXHU4ODRDXHUzMDAyXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTgxRUFcdTUyQThcdTdFRDhcdTU2RkVcdTZCNjNcdTU3MjhcdThGRDBcdTg4NENcdUZGMENcdThCRjdcdTUxNDhcdTUxNzNcdTk1RURcdTUxOERcdTU0MkZcdTUyQThcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0FcdTMwMDJcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTU3MzBcdTU2RkVcdTc2ODRcdTdBN0FcdTc2N0RcdTUzM0FcdTU3REZcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcdTRFRTVcdThCQkVcdTdGNkVcdTUxOUNcdTU3M0FcdTUzM0FcdTU3REZcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NkQ4Mlx1NTNDMlx1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdThCQkVcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcdTUzNEFcdTVGODQ6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTUzM0FcdTU3REZcdTkwMDlcdTYyRTlcdThEODVcdTY1RjZcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlx1RkYwOFx1NEY3Rlx1NzUyOFx1MjAxQ1x1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlx1MjAxRFx1NjMwOVx1OTRBRVx1RkYwOVwiLFxuICAgIGZhcm1SYWRpdXM6IFwiXHU1MTlDXHU1NzNBXHU1MzRBXHU1Rjg0XCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1NUY1M1x1NTI0RFx1NTMzQVx1NTdERlwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHU2QjYzXHU1NzI4XHU0RUU1XHU1MzRBXHU1Rjg0IHtyYWRpdXN9cHggXHU1NzI4ICh7eH0se3l9KSBcdTUxOUNcdTU3M0FcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIFx1OTFDRFx1ODk4MTogXHU4QkY3XHU5MDA5XHU2MkU5XHU3QTdBXHU3NjdEXHU1MzNBXHU1N0RGXHU0RUU1XHU5MDdGXHU1MTREXHU1MUIyXHU3QTgxXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTY3MkFcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTUzM0FcdTU3REY6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHU4QkY3XHU1MTQ4XHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHVGRjBDXHU1NzI4XHU1NzMwXHU1NkZFXHU0RTBBXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHU0RUU1XHU4QkJFXHU3RjZFXHU1MTlDXHU1NzNBXHU1MzNBXHU1N0RGXCJcbiAgfSxcblxuICAvLyBcdTUxNkNcdTUxNzFcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1NjYyRlwiLFxuICAgIG5vOiBcIlx1NTQyNlwiLFxuICAgIG9rOiBcIlx1Nzg2RVx1OEJBNFwiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBjbG9zZTogXCJcdTUxNzNcdTk1RURcIixcbiAgICBzYXZlOiBcIlx1NEZERFx1NUI1OFwiLFxuICAgIGxvYWQ6IFwiXHU1MkEwXHU4RjdEXCIsXG4gICAgZGVsZXRlOiBcIlx1NTIyMFx1OTY2NFwiLFxuICAgIGVkaXQ6IFwiXHU3RjE2XHU4RjkxXCIsXG4gICAgc3RhcnQ6IFwiXHU1RjAwXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBwYXVzZTogXCJcdTY2ODJcdTUwNUNcIixcbiAgICByZXN1bWU6IFwiXHU3RUU3XHU3RUVEXCIsXG4gICAgcmVzZXQ6IFwiXHU5MUNEXHU3RjZFXCIsXG4gICAgc2V0dGluZ3M6IFwiXHU4QkJFXHU3RjZFXCIsXG4gICAgaGVscDogXCJcdTVFMkVcdTUyQTlcIixcbiAgICBhYm91dDogXCJcdTUxNzNcdTRFOEVcIixcbiAgICBsYW5ndWFnZTogXCJcdThCRURcdThBMDBcIixcbiAgICBsb2FkaW5nOiBcIlx1NTJBMFx1OEY3RFx1NEUyRC4uLlwiLFxuICAgIGVycm9yOiBcIlx1OTUxOVx1OEJFRlwiLFxuICAgIHN1Y2Nlc3M6IFwiXHU2MjEwXHU1MjlGXCIsXG4gICAgd2FybmluZzogXCJcdThCNjZcdTU0NEFcIixcbiAgICBpbmZvOiBcIlx1NEZFMVx1NjA2RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdThCRURcdThBMDBcdTVERjJcdTUyMDdcdTYzNjJcdTRFM0Ege2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gXHU1Qjg4XHU2MkE0XHU2QTIxXHU1NzU3XG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJBOFx1NUI4OFx1NjJBNFwiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBjYXB0dXJlQXJlYTogXCJcdTYzNTVcdTgzQjdcdTUzM0FcdTU3REZcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHU1RjAwXHU1OUNCXHU1Qjg4XHU2MkE0XCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHU1MDVDXHU2QjYyXHU1Qjg4XHU2MkE0XCIsXG4gICAgdXBwZXJMZWZ0OiBcIlx1NURFNlx1NEUwQVx1ODlEMlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1NTNEN1x1NEZERFx1NjJBNFx1NTBDRlx1N0QyMFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTY4QzBcdTZENEJcdTUyMzBcdTc2ODRcdTUzRDhcdTUzMTZcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJcdTRGRUVcdTU5MERcdTc2ODRcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3MFwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTY4QzBcdTY3RTVcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTk4OUNcdTgyNzJcdUZGMENcdThCRjdcdTU3MjhcdTdGNTFcdTdBRDlcdTRFMEFcdTYyNTNcdTVGMDBcdThDMDNcdTgyNzJcdTY3N0ZcdTMwMDJcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3OUNEXHU1M0VGXHU3NTI4XHU5ODlDXHU4MjcyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NUI4OFx1NjJBNFx1NjczQVx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NjIxMFx1NTI5RlwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU1OTMxXHU4RDI1XCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgXHU1NzUwXHU2ODA3XHU2NUUwXHU2NTQ4XCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1NTMzQVx1NTdERlx1NjVFMFx1NjU0OFx1RkYwQ1x1NURFNlx1NEUwQVx1ODlEMlx1NUZDNVx1OTg3Qlx1NUMwRlx1NEU4RVx1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHU1MzNBXHU1N0RGXHU4RkM3XHU1OTI3OiB7c2l6ZX0gXHU1MENGXHU3RDIwIChcdTY3MDBcdTU5Mjc6IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IFx1NjM1NVx1ODNCN1x1NUI4OFx1NjJBNFx1NTMzQVx1NTdERlx1NEUyRC4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHU1MzNBXHU1N0RGXHU2MzU1XHU4M0I3XHU2MjEwXHU1MjlGOiB7Y291bnR9IFx1NTBDRlx1N0QyMFx1NTNEN1x1NEZERFx1NjJBNFwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHU2MzU1XHU4M0I3XHU1MzNBXHU1N0RGXHU1MUZBXHU5NTE5OiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdThCRjdcdTUxNDhcdTYzNTVcdTgzQjdcdTRFMDBcdTRFMkFcdTVCODhcdTYyQTRcdTUzM0FcdTU3REZcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU2MkE0XHU1REYyXHU1NDJGXHU1MkE4IC0gXHU1MzNBXHU1N0RGXHU3NkQxXHU2M0E3XHU0RTJEXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NUI4OFx1NjJBNFx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHU1MzNBXHU1N0RGXHU1Qjg5XHU1MTY4IC0gXHU2NzJBXHU2OEMwXHU2RDRCXHU1MjMwXHU1M0Q4XHU1MzE2XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTY4QzBcdTZENEJcdTUyMzAge2NvdW50fSBcdTRFMkFcdTUzRDhcdTUzMTZcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1NkI2M1x1NTcyOFx1NEZFRVx1NTkwRCB7Y291bnR9IFx1NEUyQVx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHU1REYyXHU2MjEwXHU1MjlGXHU0RkVFXHU1OTBEIHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIFx1NEZFRVx1NTkwRFx1NTFGQVx1OTUxOToge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHU2QjIxXHU2NTcwXHU0RTBEXHU4REIzXHVGRjBDXHU2NUUwXHU2Q0Q1XHU0RkVFXHU1OTBEXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY4QzBcdTY3RTVcdTUzM0FcdTU3REZcdTUzRDhcdTUzMTYuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTY4QzBcdTY3RTVcdTUxRkFcdTk1MTk6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU2MkE0XHU0RTJEIC0gXHU1MzNBXHU1N0RGXHU1M0Q3XHU0RkREXHU2MkE0XCIsXG4gICAgbGFzdENoZWNrOiBcIlx1NEUwQVx1NkIyMVx1NjhDMFx1NjdFNToge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1NEUwQlx1NkIyMVx1NjhDMFx1NjdFNToge3RpbWV9IFx1NzlEMlx1NTQwRVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NjVFMFx1NkNENVx1ODFFQVx1NTJBOFx1NTQyRlx1NTJBOFx1RkYwQ1x1OEJGN1x1NjI0Qlx1NTJBOFx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEMwM1x1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1NzBCOVx1NTFGQlx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRVwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU5NzAwXHU4OTgxXHU0RkREXHU2MkE0XHU1MzNBXHU1N0RGXHU3Njg0XHU1REU2XHU0RTBBXHU4OUQyXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHU3M0IwXHU1NzI4XHU1NzI4XHU1M0YzXHU0RTBCXHU4OUQyXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDA5XHU2MkU5XHU1REU2XHU0RTBBXHU4OUQyLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTAwOVx1NjJFOVx1NTNGM1x1NEUwQlx1ODlEMi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTgzQjdcdTVERTZcdTRFMEFcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1ODNCN1x1NTNGM1x1NEUwQlx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1OTAwOVx1NjJFOVx1OEQ4NVx1NjVGNlwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTkwMDlcdTYyRTlcdTUxRkFcdTk1MTlcdUZGMENcdThCRjdcdTkxQ0RcdThCRDVcIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCB6aEhhbnQgPSB7XG4gIC8vIFx1NTU1M1x1NTJENVx1NTY2OFxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIFx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQScsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgXHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0JyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2JyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgXHU4MUVBXHU1MkQ1XHU1Qjg4XHU4Qjc3JyxcbiAgICBzZWxlY3Rpb246ICdcdTkwNzhcdTY0QzcnLFxuICAgIHVzZXI6ICdcdTc1MjhcdTYyMzcnLFxuICAgIGNoYXJnZXM6ICdcdTZCMjFcdTY1NzgnLFxuICAgIGJhY2tlbmQ6ICdcdTVGOENcdTdBRUYnLFxuICAgIGRhdGFiYXNlOiAnXHU2NTc4XHU2NERBXHU1RUFCJyxcbiAgICB1cHRpbWU6ICdcdTkwNEJcdTg4NENcdTY2NDJcdTk1OTMnLFxuICAgIGNsb3NlOiAnXHU5NURDXHU5NTg5JyxcbiAgICBsYXVuY2g6ICdcdTU1NTNcdTUyRDUnLFxuICAgIGxvYWRpbmc6ICdcdTUyQTBcdThGMDlcdTRFMkRcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ1x1NTdGN1x1ODg0Q1x1NEUyRFx1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdcdTZCNjNcdTU3MjhcdTRFMEJcdThGMDlcdTgxNzNcdTY3MkNcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ1x1OTA3OFx1NjRDN1x1NEUwMFx1NTAwQlx1NkE1Rlx1NTY2OFx1NEVCQVx1NEUyNlx1OUVERVx1NjRDQVx1NTU1M1x1NTJENScsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1x1NkU5Nlx1NTA5OVx1NTU1M1x1NTJENScsXG4gICAgbG9hZEVycm9yOiAnXHU1MkEwXHU4RjA5XHU5MzJGXHU4QUE0JyxcbiAgICBsb2FkRXJyb3JNc2c6ICdcdTcxMjFcdTZDRDVcdTUyQTBcdThGMDlcdTYyNDBcdTkwNzhcdTZBNUZcdTU2NjhcdTRFQkFcdTMwMDJcdThBQ0JcdTZBQTJcdTY3RTVcdTdEQjJcdTdENjFcdTkwMjNcdTYzQTVcdTYyMTZcdTkxQ0RcdThBNjZcdTMwMDInLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFx1NkFBMlx1NjdFNVx1NEUyRC4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIFx1NTcyOFx1N0REQScsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBcdTk2RTJcdTdEREEnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIFx1NkI2M1x1NUUzOCcsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgXHU5MzJGXHU4QUE0JyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBcdTdFNkFcdTU3MTZcdTZBMjFcdTU4NEFcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2XCIsXG4gICAgaW5pdEJvdDogXCJcdTUyMURcdTU5Q0JcdTUzMTZcdTgxRUFcdTUyRDVcdTZBNUZcdTU2NjhcdTRFQkFcIixcbiAgICB1cGxvYWRJbWFnZTogXCJcdTRFMEFcdTUwQjNcdTU3MTZcdTcyNDdcIixcbiAgICByZXNpemVJbWFnZTogXCJcdThBQkZcdTY1NzRcdTU3MTZcdTcyNDdcdTU5MjdcdTVDMEZcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwNzhcdTY0QzdcdTRGNERcdTdGNkVcIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlx1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRFwiLFxuICAgIHN0b3BQYWludGluZzogXCJcdTUwNUNcdTZCNjJcdTdFNkFcdTg4RkRcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiXHU0RkREXHU1QjU4XHU5MDMyXHU1RUE2XCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIlx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBcdTZBQTJcdTY3RTVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdThBQ0JcdTU3MjhcdTdEQjJcdTdBRDlcdTRFMEFcdTYyNTNcdTk1OEJcdThBQkZcdTgyNzJcdTY3N0ZcdTVGOENcdTkxQ0RcdThBNjZcdUZGMDFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3QTJFXHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBcdTZCNjNcdTU3MjhcdTUyQTBcdThGMDlcdTU3MTZcdTcyNDcuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgXHU1NzE2XHU3MjQ3XHU1REYyXHU1MkEwXHU4RjA5XHVGRjBDXHU2NzA5XHU2NTQ4XHU1MENGXHU3RDIwIHtjb3VudH0gXHU1MDBCXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgXHU1NzE2XHU3MjQ3XHU1MkEwXHU4RjA5XHU1OTMxXHU2NTU3XCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdThBQ0JcdTU3MjhcdTRGNjBcdTYwRjNcdTk1OEJcdTU5Q0JcdTdFNkFcdTg4RkRcdTc2ODRcdTU3MzBcdTY1QjlcdTU4NTdcdTdCMkNcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdUZGMDFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NTg1N1x1NTNDM1x1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTRGNERcdTdGNkVcdThBMkRcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1NEY0RFx1N0Y2RVx1OTA3OFx1NjRDN1x1OEQ4NVx1NjY0MlwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFx1NURGMlx1NkFBMlx1NkUyQ1x1NTIzMFx1NEY0RFx1N0Y2RVx1RkYwQ1x1ODY1NVx1NzQwNlx1NEUyRC4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIFx1NEY0RFx1N0Y2RVx1NkFBMlx1NkUyQ1x1NTkzMVx1NjU1N1x1RkYwQ1x1OEFDQlx1OTFDRFx1OEE2NlwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IFx1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRC4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFx1OTAzMlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBcdTZDOTJcdTY3MDlcdTZCMjFcdTY1NzhcdTMwMDJcdTdCNDlcdTVGODUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTc1MjhcdTYyMzdcdTVERjJcdTUwNUNcdTZCNjJcdTdFNkFcdTg4RkRcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBcdTdFNkFcdTg4RkRcdTVCOENcdTYyMTBcdUZGMDFcdTUxNzFcdTdFNkFcdTg4RkQge2NvdW50fSBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTMwMDJcIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBcdTdFNkFcdTg4RkRcdTkwNEVcdTdBMEJcdTRFMkRcdTUxRkFcdTkzMkZcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTUyQTBcdThGMDlcdTU3MTZcdTcyNDdcdTRFMjZcdTkwNzhcdTY0QzdcdTRGNERcdTdGNkVcIixcbiAgICBwcm9ncmVzczogXCJcdTkwMzJcdTVFQTZcIixcbiAgICB1c2VyTmFtZTogXCJcdTc1MjhcdTYyMzdcIixcbiAgICBwaXhlbHM6IFwiXHU1MENGXHU3RDIwXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzhcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlx1OTgxMFx1OEEwOFx1NjY0Mlx1OTU5M1wiLFxuICAgIGluaXRNZXNzYWdlOiBcIlx1OUVERVx1NjRDQVx1MjAxQ1x1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQVx1MjAxRFx1OTU4Qlx1NTlDQlwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IFx1NTcxNlx1NzI0N1x1NURGMlx1OEFCRlx1NjU3NFx1NzBCQSB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFx1N0U2QVx1ODhGRFx1NjZBQlx1NTA1Q1x1NjVCQ1x1NEY0RFx1N0Y2RSBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1NkJDRlx1NjI3OVx1NTBDRlx1N0QyMFx1NjU3OFwiLFxuICAgIGJhdGNoU2l6ZTogXCJcdTYyNzlcdTZCMjFcdTU5MjdcdTVDMEZcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlx1NEUwQlx1NkIyMVx1NjI3OVx1NkIyMVx1NjY0Mlx1OTU5M1wiLFxuICAgIHVzZUFsbENoYXJnZXM6IFwiXHU0RjdGXHU3NTI4XHU2MjQwXHU2NzA5XHU1M0VGXHU3NTI4XHU2QjIxXHU2NTc4XCIsXG4gICAgc2hvd092ZXJsYXk6IFwiXHU5ODZGXHU3OTNBXHU4OTg2XHU4NENCXHU1QzY0XCIsXG4gICAgbWF4Q2hhcmdlczogXCJcdTZCQ0ZcdTYyNzlcdTY3MDBcdTU5MjdcdTZCMjFcdTY1NzhcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTc4OiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlx1NTI2OVx1OTkxOFx1NjY0Mlx1OTU5M1wiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1IHt0aW1lfSBcdTVGOENcdTdFN0NcdTdFOEMuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBcdTkwMzJcdTVFQTZcdTVERjJcdTRGRERcdTVCNThcdTcwQkEge2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBcdTVERjJcdTUyQTBcdThGMDlcdTkwMzJcdTVFQTY6IHtwYWludGVkfS97dG90YWx9IFx1NTBDRlx1N0QyMFx1NURGMlx1N0U2QVx1ODhGRFwiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBcdTUyQTBcdThGMDlcdTkwMzJcdTVFQTZcdTU5MzFcdTY1NTc6IHtlcnJvcn1cIixcbiAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgXHU0RkREXHU1QjU4XHU5MDMyXHU1RUE2XHU1OTMxXHU2NTU3OiB7ZXJyb3J9XCIsXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTU3MjhcdTUwNUNcdTZCNjJcdTRFNEJcdTUyNERcdTg5ODFcdTRGRERcdTVCNThcdTc1NzZcdTUyNERcdTkwMzJcdTVFQTZcdTU1Q0VcdUZGMUZcIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiXHU2NTNFXHU2OEM0XCIsXG4gICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgIG1pbmltaXplOiBcIlx1NjcwMFx1NUMwRlx1NTMxNlwiLFxuICAgIHdpZHRoOiBcIlx1NUJFQ1x1NUVBNlwiLFxuICAgIGhlaWdodDogXCJcdTlBRDhcdTVFQTZcIixcbiAgICBrZWVwQXNwZWN0OiBcIlx1NEZERFx1NjMwMVx1N0UzMVx1NkE2Qlx1NkJENFwiLFxuICAgIGFwcGx5OiBcIlx1NjFDOVx1NzUyOFwiLFxuICAgIG92ZXJsYXlPbjogXCJcdTg5ODZcdTg0Q0JcdTVDNjQ6IFx1OTU4Qlx1NTU1M1wiLFxuICAgIG92ZXJsYXlPZmY6IFwiXHU4OTg2XHU4NENCXHU1QzY0OiBcdTk1RENcdTk1ODlcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBcdTYyNzlcdTZCMjFcdTVCOENcdTYyMTA6IFx1NURGMlx1N0U2QVx1ODhGRCB7cGFpbnRlZH0gXHU1MENGXHU3RDIwIHwgXHU5MDMyXHU1RUE2OiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzhcdTYwNjJcdTVGQTk6IHtjdXJyZW50fS97bmVlZGVkfSAtIFx1NjY0Mlx1OTU5Mzoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3ODoge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU1MjY5XHU5OTE4OiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTZCNjNcdTU3MjhcdTgxRUFcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1NjIxMFx1NTI5RlwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTcxMjFcdTZDRDVcdTgxRUFcdTUyRDVcdTU1NTNcdTUyRDVcdUZGMENcdThBQ0JcdTYyNEJcdTUyRDVcdTY0Q0RcdTRGNUNcdTMwMDJcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1NURGMlx1NkFBMlx1NkUyQ1x1NTIzMFx1OEFCRlx1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2NDFDXHU3RDIyXHU4QUJGXHU4MjcyXHU2NzdGLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHU2QjYzXHU1NzI4XHU5RURFXHU2NENBXHU3RTZBXHU4OEZEXHU2MzA5XHU5MjE1Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU3RTZBXHU4OEZEXHU2MzA5XHU5MjE1XCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTZcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFx1OTFDRFx1OEE2NiB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfVx1RkYwQ1x1N0I0OVx1NUY4NSB7ZGVsYXl9IFx1NzlEMi4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IFx1N0IyQyB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBcdTZCMjFcdTU2MTdcdThBNjZcdTUxRkFcdTkzMkZcdUZGMENcdTVDMDdcdTU3Mjgge2RlbGF5fSBcdTc5RDJcdTVGOENcdTkxQ0RcdThBNjYuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHU4RDg1XHU5MDRFIHttYXhBdHRlbXB0c30gXHU2QjIxXHU1NjE3XHU4QTY2XHU1OTMxXHU2NTU3XHUzMDAyXHU3RTdDXHU3RThDXHU0RTBCXHU0RTAwXHU2Mjc5Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBcdTdEQjJcdTdENjFcdTkzMkZcdThBQTRcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgXHU2NzBEXHU1MkQ5XHU1NjY4XHU5MzJGXHU4QUE0XHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QTY2Li4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBcdTY3MERcdTUyRDlcdTU2NjhcdThEODVcdTY2NDJcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIlxuICB9LFxuXG4gIC8vIFx1OEZCMlx1NTgzNFx1NkEyMVx1NTg0QVx1RkYwOFx1NUY4NVx1NUJFNlx1NzNGRVx1RkYwOVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1OEZCMlx1NTgzNFx1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHN0YXJ0OiBcIlx1OTU4Qlx1NTlDQlwiLFxuICAgIHN0b3A6IFwiXHU1MDVDXHU2QjYyXCIsXG4gICAgc3RvcHBlZDogXCJcdTZBNUZcdTU2NjhcdTRFQkFcdTVERjJcdTUwNUNcdTZCNjJcIixcbiAgICBjYWxpYnJhdGU6IFwiXHU2ODIxXHU2RTk2XCIsXG4gICAgcGFpbnRPbmNlOiBcIlx1NEUwMFx1NkIyMVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlx1NkFBMlx1NjdFNVx1NzJDMFx1NjE0Qlx1NEUyRC4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiXHU5MTREXHU3RjZFXCIsXG4gICAgZGVsYXk6IFwiXHU1RUY2XHU5MDcyIChcdTZCRUJcdTc5RDIpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXCIsXG4gICAgbWluQ2hhcmdlczogXCJcdTY3MDBcdTVDMTFcdTZCMjFcdTY1NzhcIixcbiAgICBjb2xvck1vZGU6IFwiXHU5ODRGXHU4MjcyXHU2QTIxXHU1RjBGXCIsXG4gICAgcmFuZG9tOiBcIlx1OTZBOFx1NkE1RlwiLFxuICAgIGZpeGVkOiBcIlx1NTZGQVx1NUI5QVwiLFxuICAgIHJhbmdlOiBcIlx1N0JDNFx1NTcwRFwiLFxuICAgIGZpeGVkQ29sb3I6IFwiXHU1NkZBXHU1QjlBXHU5ODRGXHU4MjcyXCIsXG4gICAgYWR2YW5jZWQ6IFwiXHU5QUQ4XHU3RDFBXCIsXG4gICAgdGlsZVg6IFwiXHU3NEU2XHU3MjQ3IFhcIixcbiAgICB0aWxlWTogXCJcdTc0RTZcdTcyNDcgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiXHU4MUVBXHU1QjlBXHU3RkE5XHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiXHU0RjhCXHU1OTgyOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiXHU2MzU1XHU3MzcyXCIsXG4gICAgcGFpbnRlZDogXCJcdTVERjJcdTdFNkFcdTg4RkRcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIHJldHJpZXM6IFwiXHU5MUNEXHU4QTY2XCIsXG4gICAgdGlsZTogXCJcdTc0RTZcdTcyNDdcIixcbiAgICBjb25maWdTYXZlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTRGRERcdTVCNThcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU1MkEwXHU4RjA5XCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU5MUNEXHU3RjZFXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJcdThBQ0JcdTYyNEJcdTUyRDVcdTdFNkFcdTg4RkRcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTRFRTVcdTYzNTVcdTczNzJcdTVFQTdcdTZBMTkuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIlx1NUY4Q1x1N0FFRlx1NTcyOFx1N0REQVwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIlx1NUY4Q1x1N0FFRlx1OTZFMlx1N0REQVwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIlx1NkI2M1x1NTcyOFx1NTU1M1x1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQS4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIlx1NkI2M1x1NTcyOFx1NTA1Q1x1NkI2Mlx1NkE1Rlx1NTY2OFx1NEVCQS4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIlx1NjgyMVx1NkU5Nlx1NEUyRC4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIlx1ODFFQVx1NTJENVx1OEZCMlx1NTgzNFx1NURGMlx1NTcyOFx1OTA0Qlx1ODg0Q1x1MzAwMlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiXHU4MUVBXHU1MkQ1XHU3RTZBXHU1NzE2XHU2QjYzXHU1NzI4XHU5MDRCXHU4ODRDXHVGRjBDXHU4QUNCXHU1MTQ4XHU5NURDXHU5NTg5XHU1MThEXHU1NTUzXHU1MkQ1XHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0XHUzMDAyXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU1NzMwXHU1NzE2XHU3Njg0XHU3QTdBXHU3NjdEXHU1MzQwXHU1N0RGXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXHU0RUU1XHU4QTJEXHU3RjZFXHU4RkIyXHU1ODM0XHU1MzQwXHU1N0RGXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTRGNjBcdTU4NTdcdTUzQzNcdTgwMDNcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU4QTJEXHU3RjZFXHU2MjEwXHU1MjlGXHVGRjAxXHU1MzRBXHU1RjkxOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU1MzQwXHU1N0RGXHU5MDc4XHU2NEM3XHU4RDg1XHU2NjQyXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcdUZGMDhcdTRGN0ZcdTc1MjhcdTIwMUNcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcdTIwMURcdTYzMDlcdTkyMTVcdUZGMDlcIixcbiAgICBmYXJtUmFkaXVzOiBcIlx1OEZCMlx1NTgzNFx1NTM0QVx1NUY5MVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJcdTc1NzZcdTUyNERcdTUzNDBcdTU3REZcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIFx1NkI2M1x1NTcyOFx1NEVFNVx1NTM0QVx1NUY5MSB7cmFkaXVzfXB4IFx1NTcyOCAoe3h9LHt5fSkgXHU4RkIyXHU1ODM0XCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBcdTkxQ0RcdTg5ODE6IFx1OEFDQlx1OTA3OFx1NjRDN1x1N0E3QVx1NzY3RFx1NTM0MFx1NTdERlx1NEVFNVx1OTA3Rlx1NTE0RFx1ODg1RFx1N0E4MVwiLFxuICAgIG5vUG9zaXRpb246IFwiXHU2NzJBXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgY3VycmVudFpvbmU6IFwiXHU1MzQwXHU1N0RGOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFx1OEFDQlx1NTE0OFx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1RkYwQ1x1NTcyOFx1NTczMFx1NTcxNlx1NEUwQVx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1NEVFNVx1OEEyRFx1N0Y2RVx1OEZCMlx1NTgzNFx1NTM0MFx1NTdERlwiXG4gIH0sXG5cbiAgLy8gXHU1MTZDXHU1MTcxXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJcdTY2MkZcIixcbiAgICBubzogXCJcdTU0MjZcIixcbiAgICBvazogXCJcdTc4QkFcdThBOERcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgY2xvc2U6IFwiXHU5NURDXHU5NTg5XCIsXG4gICAgc2F2ZTogXCJcdTRGRERcdTVCNThcIixcbiAgICBsb2FkOiBcIlx1NTJBMFx1OEYwOVwiLFxuICAgIGRlbGV0ZTogXCJcdTUyMkFcdTk2NjRcIixcbiAgICBlZGl0OiBcIlx1N0RFOFx1OEYyRlwiLFxuICAgIHN0YXJ0OiBcIlx1OTU4Qlx1NTlDQlwiLFxuICAgIHN0b3A6IFwiXHU1MDVDXHU2QjYyXCIsXG4gICAgcGF1c2U6IFwiXHU2NkFCXHU1MDVDXCIsXG4gICAgcmVzdW1lOiBcIlx1N0U3Q1x1N0U4Q1wiLFxuICAgIHJlc2V0OiBcIlx1OTFDRFx1N0Y2RVwiLFxuICAgIHNldHRpbmdzOiBcIlx1OEEyRFx1N0Y2RVwiLFxuICAgIGhlbHA6IFwiXHU1RTZCXHU1MkE5XCIsXG4gICAgYWJvdXQ6IFwiXHU5NURDXHU2NUJDXCIsXG4gICAgbGFuZ3VhZ2U6IFwiXHU4QTlFXHU4QTAwXCIsXG4gICAgbG9hZGluZzogXCJcdTUyQTBcdThGMDlcdTRFMkQuLi5cIixcbiAgICBlcnJvcjogXCJcdTkzMkZcdThBQTRcIixcbiAgICBzdWNjZXNzOiBcIlx1NjIxMFx1NTI5RlwiLFxuICAgIHdhcm5pbmc6IFwiXHU4QjY2XHU1NDRBXCIsXG4gICAgaW5mbzogXCJcdTRGRTFcdTYwNkZcIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiXHU4QTlFXHU4QTAwXHU1REYyXHU1MjA3XHU2M0RCXHU3MEJBIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIFx1NUI4OFx1OEI3N1x1NkEyMVx1NTg0QVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyRDVcdTVCODhcdThCNzdcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHNlbGVjdEFyZWE6IFwiXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiXHU2MzU1XHU3MzcyXHU1MzQwXHU1N0RGXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIlx1OTU4Qlx1NTlDQlx1NUI4OFx1OEI3N1wiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIlx1NTA1Q1x1NkI2Mlx1NUI4OFx1OEI3N1wiLFxuICAgIHVwcGVyTGVmdDogXCJcdTVERTZcdTRFMEFcdTg5RDJcIixcbiAgICBsb3dlclJpZ2h0OiBcIlx1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJcdTUzRDdcdTRGRERcdThCNzdcdTUwQ0ZcdTdEMjBcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiXHU2QUEyXHU2RTJDXHU1MjMwXHU3Njg0XHU4QjhBXHU1MzE2XCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiXHU0RkVFXHU1RkE5XHU3Njg0XHU1MENGXHU3RDIwXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzhcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTdCNDlcdTVGODVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggXHU2QUEyXHU2N0U1XHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU5ODRGXHU4MjcyXHVGRjBDXHU4QUNCXHU1NzI4XHU3REIyXHU3QUQ5XHU0RTBBXHU2MjUzXHU5NThCXHU4QUJGXHU4MjcyXHU2NzdGXHUzMDAyXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1NjI3RVx1NTIzMCB7Y291bnR9IFx1N0EyRVx1NTNFRlx1NzUyOFx1OTg0Rlx1ODI3MlwiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTVCODhcdThCNzdcdTZBNUZcdTU2NjhcdTRFQkFcdTUyMURcdTU5Q0JcdTUzMTZcdTYyMTBcdTUyOUZcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIFx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NTkzMVx1NjU1N1wiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIFx1NUVBN1x1NkExOVx1NzEyMVx1NjU0OFwiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBcdTUzNDBcdTU3REZcdTcxMjFcdTY1NDhcdUZGMENcdTVERTZcdTRFMEFcdTg5RDJcdTVGQzVcdTk4MDhcdTVDMEZcdTY1QkNcdTUzRjNcdTRFMEJcdTg5RDJcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFx1NTM0MFx1NTdERlx1OTA0RVx1NTkyNzoge3NpemV9IFx1NTBDRlx1N0QyMCAoXHU2NzAwXHU1OTI3OiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBcdTYzNTVcdTczNzJcdTVCODhcdThCNzdcdTUzNDBcdTU3REZcdTRFMkQuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1NTM0MFx1NTdERlx1NjM1NVx1NzM3Mlx1NjIxMFx1NTI5Rjoge2NvdW50fSBcdTUwQ0ZcdTdEMjBcdTUzRDdcdTRGRERcdThCNzdcIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIFx1NjM1NVx1NzM3Mlx1NTM0MFx1NTdERlx1NTFGQVx1OTMyRjoge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgXHU4QUNCXHU1MTQ4XHU2MzU1XHU3MzcyXHU0RTAwXHU1MDBCXHU1Qjg4XHU4Qjc3XHU1MzQwXHU1N0RGXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NUI4OFx1OEI3N1x1NURGMlx1NTU1M1x1NTJENSAtIFx1NTM0MFx1NTdERlx1NzZFM1x1NjNBN1x1NEUyRFwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTVCODhcdThCNzdcdTVERjJcdTUwNUNcdTZCNjJcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFx1NTM0MFx1NTdERlx1NUI4OVx1NTE2OCAtIFx1NjcyQVx1NkFBMlx1NkUyQ1x1NTIzMFx1OEI4QVx1NTMxNlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTggXHU2QUEyXHU2RTJDXHU1MjMwIHtjb3VudH0gXHU1MDBCXHU4QjhBXHU1MzE2XCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBcdTZCNjNcdTU3MjhcdTRGRUVcdTVGQTkge2NvdW50fSBcdTUwMEJcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NURGMlx1NjIxMFx1NTI5Rlx1NEZFRVx1NUZBOSB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBcdTRGRUVcdTVGQTlcdTUxRkFcdTkzMkY6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFx1NkIyMVx1NjU3OFx1NEUwRFx1OERCM1x1RkYwQ1x1NzEyMVx1NkNENVx1NEZFRVx1NUZBOVwiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2QUEyXHU2N0U1XHU1MzQwXHU1N0RGXHU4QjhBXHU1MzE2Li4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgXHU2QUEyXHU2N0U1XHU1MUZBXHU5MzJGOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NUI4OFx1OEI3N1x1NEUyRCAtIFx1NTM0MFx1NTdERlx1NTNEN1x1NEZERFx1OEI3N1wiLFxuICAgIGxhc3RDaGVjazogXCJcdTRFMEFcdTZCMjFcdTZBQTJcdTY3RTU6IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJcdTRFMEJcdTZCMjFcdTZBQTJcdTY3RTU6IHt0aW1lfSBcdTc5RDJcdTVGOENcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTZCNjNcdTU3MjhcdTgxRUFcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1NjIxMFx1NTI5RlwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTcxMjFcdTZDRDVcdTgxRUFcdTUyRDVcdTU1NTNcdTUyRDVcdUZGMENcdThBQ0JcdTYyNEJcdTUyRDVcdTY0Q0RcdTRGNUNcdTMwMDJcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThBQkZcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTlFREVcdTY0Q0FcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTVcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFx1NTcyOFx1OTcwMFx1ODk4MVx1NEZERFx1OEI3N1x1NTM0MFx1NTdERlx1NzY4NFx1NURFNlx1NEUwQVx1ODlEMlx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIFx1NzNGRVx1NTcyOFx1NTcyOFx1NTNGM1x1NEUwQlx1ODlEMlx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTA3OFx1NjRDN1x1NURFNlx1NEUwQVx1ODlEMi4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTkwNzhcdTY0QzdcdTUzRjNcdTRFMEJcdTg5RDIuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgXHU1REYyXHU2MzU1XHU3MzcyXHU1REU2XHU0RTBBXHU4OUQyOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTczNzJcdTUzRjNcdTRFMEJcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTkwNzhcdTY0QzdcdThEODVcdTY2NDJcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgXHU5MDc4XHU2NEM3XHU1MUZBXHU5MzJGXHVGRjBDXHU4QUNCXHU5MUNEXHU4QTY2XCJcbiAgfVxufTsiLCAiaW1wb3J0IHsgZXMgfSBmcm9tICcuL2VzLmpzJztcbmltcG9ydCB7IGVuIH0gZnJvbSAnLi9lbi5qcyc7XG5pbXBvcnQgeyBmciB9IGZyb20gJy4vZnIuanMnO1xuaW1wb3J0IHsgcnUgfSBmcm9tICcuL3J1LmpzJztcbmltcG9ydCB7IHpoSGFucyB9IGZyb20gJy4vemgtSGFucy5qcyc7XG5pbXBvcnQgeyB6aEhhbnQgfSBmcm9tICcuL3poLUhhbnQuanMnO1xuXG4vLyBJZGlvbWFzIGRpc3BvbmlibGVzXG5leHBvcnQgY29uc3QgQVZBSUxBQkxFX0xBTkdVQUdFUyA9IHtcbiAgZXM6IHsgbmFtZTogJ0VzcGFcdTAwRjFvbCcsIGZsYWc6ICdcdUQ4M0NcdURERUFcdUQ4M0NcdURERjgnLCBjb2RlOiAnZXMnIH0sXG4gIGVuOiB7IG5hbWU6ICdFbmdsaXNoJywgZmxhZzogJ1x1RDgzQ1x1RERGQVx1RDgzQ1x1RERGOCcsIGNvZGU6ICdlbicgfSxcbiAgZnI6IHsgbmFtZTogJ0ZyYW5cdTAwRTdhaXMnLCBmbGFnOiAnXHVEODNDXHVEREVCXHVEODNDXHVEREY3JywgY29kZTogJ2ZyJyB9LFxuICBydTogeyBuYW1lOiAnXHUwNDIwXHUwNDQzXHUwNDQxXHUwNDQxXHUwNDNBXHUwNDM4XHUwNDM5JywgZmxhZzogJ1x1RDgzQ1x1RERGN1x1RDgzQ1x1RERGQScsIGNvZGU6ICdydScgfSxcbiAgemhIYW5zOiB7IG5hbWU6ICdcdTdCODBcdTRGNTNcdTRFMkRcdTY1ODcnLCBmbGFnOiAnXHVEODNDXHVEREU4XHVEODNDXHVEREYzJywgY29kZTogJ3poLUhhbnMnIH0sXG4gIHpoSGFudDogeyBuYW1lOiAnXHU3RTQxXHU5QUQ0XHU0RTJEXHU2NTg3JywgZmxhZzogJ1x1RDgzQ1x1RERFOFx1RDgzQ1x1RERGMycsIGNvZGU6ICd6aC1IYW50JyB9XG59O1xuXG4vLyBUb2RhcyBsYXMgdHJhZHVjY2lvbmVzXG5jb25zdCB0cmFuc2xhdGlvbnMgPSB7XG4gIGVzLFxuICBlbixcbiAgZnIsXG4gIHJ1LFxuICB6aEhhbnMsXG4gIHpoSGFudFxufTtcblxuLy8gRXN0YWRvIGRlbCBpZGlvbWEgYWN0dWFsXG5sZXQgY3VycmVudExhbmd1YWdlID0gJ2VzJztcbmxldCBjdXJyZW50VHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zW2N1cnJlbnRMYW5ndWFnZV07XG5cbi8qKlxuICogRGV0ZWN0YSBlbCBpZGlvbWEgZGVsIG5hdmVnYWRvclxuICogQHJldHVybnMge3N0cmluZ30gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYSBkZXRlY3RhZG9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEJyb3dzZXJMYW5ndWFnZSgpIHtcbiAgY29uc3QgYnJvd3NlckxhbmcgPSB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckxhbmd1YWdlIHx8ICdlcyc7XG5cbiAgLy8gRXh0cmFlciBzb2xvIGVsIGNcdTAwRjNkaWdvIGRlbCBpZGlvbWEgKGVqOiAnZXMtRVMnIC0+ICdlcycpXG4gIGNvbnN0IGxhbmdDb2RlID0gYnJvd3Nlckxhbmcuc3BsaXQoJy0nKVswXS50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIFZlcmlmaWNhciBzaSB0ZW5lbW9zIHNvcG9ydGUgcGFyYSBlc3RlIGlkaW9tYVxuICBpZiAodHJhbnNsYXRpb25zW2xhbmdDb2RlXSkge1xuICAgIHJldHVybiBsYW5nQ29kZTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIGEgZXNwYVx1MDBGMW9sIHBvciBkZWZlY3RvXG4gIHJldHVybiAnZXMnO1xufVxuXG4vKipcbiAqIE9idGllbmUgZWwgaWRpb21hIGd1YXJkYWRvIChkZXNoYWJpbGl0YWRvIC0gbm8gdXNhciBsb2NhbFN0b3JhZ2UpXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTaWVtcHJlIHJldG9ybmEgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2F2ZWRMYW5ndWFnZSgpIHtcbiAgLy8gTm8gdXNhciBsb2NhbFN0b3JhZ2UgLSBzaWVtcHJlIHJldG9ybmFyIG51bGxcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogR3VhcmRhIGVsIGlkaW9tYSAoZGVzaGFiaWxpdGFkbyAtIG5vIHVzYXIgbG9jYWxTdG9yYWdlKVxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUxhbmd1YWdlKGxhbmdDb2RlKSB7XG4gIC8vIE5vIGd1YXJkYXIgZW4gbG9jYWxTdG9yYWdlIC0gZnVuY2lcdTAwRjNuIGRlc2hhYmlsaXRhZGFcbiAgcmV0dXJuO1xufVxuXG4vKipcbiAqIEluaWNpYWxpemEgZWwgc2lzdGVtYSBkZSBpZGlvbWFzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGluaWNpYWxpemFkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUxhbmd1YWdlKCkge1xuICAvLyBQcmlvcmlkYWQ6IGd1YXJkYWRvID4gbmF2ZWdhZG9yID4gZXNwYVx1MDBGMW9sXG4gIGNvbnN0IHNhdmVkTGFuZyA9IGdldFNhdmVkTGFuZ3VhZ2UoKTtcbiAgY29uc3QgYnJvd3NlckxhbmcgPSBkZXRlY3RCcm93c2VyTGFuZ3VhZ2UoKTtcblxuICBsZXQgc2VsZWN0ZWRMYW5nID0gJ2VzJzsgLy8gZmFsbGJhY2sgcG9yIGRlZmVjdG9cblxuICBpZiAoc2F2ZWRMYW5nICYmIHRyYW5zbGF0aW9uc1tzYXZlZExhbmddKSB7XG4gICAgc2VsZWN0ZWRMYW5nID0gc2F2ZWRMYW5nO1xuICB9IGVsc2UgaWYgKGJyb3dzZXJMYW5nICYmIHRyYW5zbGF0aW9uc1ticm93c2VyTGFuZ10pIHtcbiAgICBzZWxlY3RlZExhbmcgPSBicm93c2VyTGFuZztcbiAgfVxuXG4gIHNldExhbmd1YWdlKHNlbGVjdGVkTGFuZyk7XG4gIHJldHVybiBzZWxlY3RlZExhbmc7XG59XG5cbi8qKlxuICogQ2FtYmlhIGVsIGlkaW9tYSBhY3R1YWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nQ29kZSAtIENcdTAwRjNkaWdvIGRlbCBpZGlvbWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldExhbmd1YWdlKGxhbmdDb2RlKSB7XG4gIGlmICghdHJhbnNsYXRpb25zW2xhbmdDb2RlXSkge1xuICAgIGNvbnNvbGUud2FybihgSWRpb21hICcke2xhbmdDb2RlfScgbm8gZGlzcG9uaWJsZS4gVXNhbmRvICcke2N1cnJlbnRMYW5ndWFnZX0nYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3VycmVudExhbmd1YWdlID0gbGFuZ0NvZGU7XG4gIGN1cnJlbnRUcmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdO1xuICBzYXZlTGFuZ3VhZ2UobGFuZ0NvZGUpO1xuXG4gIC8vIEVtaXRpciBldmVudG8gcGVyc29uYWxpemFkbyBwYXJhIHF1ZSBsb3MgbVx1MDBGM2R1bG9zIHB1ZWRhbiByZWFjY2lvbmFyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuQ3VzdG9tRXZlbnQpIHtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93LkN1c3RvbUV2ZW50KCdsYW5ndWFnZUNoYW5nZWQnLCB7XG4gICAgICBkZXRhaWw6IHsgbGFuZ3VhZ2U6IGxhbmdDb2RlLCB0cmFuc2xhdGlvbnM6IGN1cnJlbnRUcmFuc2xhdGlvbnMgfVxuICAgIH0pKTtcbiAgfVxufVxuXG4vKipcbiAqIE9idGllbmUgZWwgaWRpb21hIGFjdHVhbFxuICogQHJldHVybnMge3N0cmluZ30gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYSBhY3R1YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRMYW5ndWFnZSgpIHtcbiAgcmV0dXJuIGN1cnJlbnRMYW5ndWFnZTtcbn1cblxuLyoqXG4gKiBPYnRpZW5lIGxhcyB0cmFkdWNjaW9uZXMgYWN0dWFsZXNcbiAqIEByZXR1cm5zIHtvYmplY3R9IE9iamV0byBjb24gdG9kYXMgbGFzIHRyYWR1Y2Npb25lcyBkZWwgaWRpb21hIGFjdHVhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFRyYW5zbGF0aW9ucygpIHtcbiAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGlvbnM7XG59XG5cbi8qKlxuICogT2J0aWVuZSB1biB0ZXh0byB0cmFkdWNpZG8gdXNhbmRvIG5vdGFjaVx1MDBGM24gZGUgcHVudG9cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBDbGF2ZSBkZWwgdGV4dG8gKGVqOiAnaW1hZ2UudGl0bGUnLCAnY29tbW9uLmNhbmNlbCcpXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zIC0gUGFyXHUwMEUxbWV0cm9zIHBhcmEgaW50ZXJwb2xhY2lcdTAwRjNuIChlajoge2NvdW50OiA1fSlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRleHRvIHRyYWR1Y2lkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gdChrZXksIHBhcmFtcyA9IHt9KSB7XG4gIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoJy4nKTtcbiAgbGV0IHZhbHVlID0gY3VycmVudFRyYW5zbGF0aW9ucztcblxuICAvLyBOYXZlZ2FyIHBvciBsYSBlc3RydWN0dXJhIGRlIG9iamV0b3NcbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBrIGluIHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlW2tdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oYENsYXZlIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlbmNvbnRyYWRhOiAnJHtrZXl9J2ApO1xuICAgICAgcmV0dXJuIGtleTsgLy8gUmV0b3JuYXIgbGEgY2xhdmUgY29tbyBmYWxsYmFja1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgY29uc29sZS53YXJuKGBDbGF2ZSBkZSB0cmFkdWNjaVx1MDBGM24gbm8gZXMgc3RyaW5nOiAnJHtrZXl9J2ApO1xuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGFyIHBhclx1MDBFMW1ldHJvc1xuICByZXR1cm4gaW50ZXJwb2xhdGUodmFsdWUsIHBhcmFtcyk7XG59XG5cbi8qKlxuICogSW50ZXJwb2xhIHBhclx1MDBFMW1ldHJvcyBlbiB1biBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gVGV4dG8gY29uIG1hcmNhZG9yZXMge2tleX1cbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBQYXJcdTAwRTFtZXRyb3MgYSBpbnRlcnBvbGFyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZXh0byBjb24gcGFyXHUwMEUxbWV0cm9zIGludGVycG9sYWRvc1xuICovXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZSh0ZXh0LCBwYXJhbXMpIHtcbiAgaWYgKCFwYXJhbXMgfHwgT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAobWF0Y2gsIGtleSkgPT4ge1xuICAgIHJldHVybiBwYXJhbXNba2V5XSAhPT0gdW5kZWZpbmVkID8gcGFyYW1zW2tleV0gOiBtYXRjaDtcbiAgfSk7XG59XG5cbi8qKlxuICogT2J0aWVuZSB0cmFkdWNjaW9uZXMgZGUgdW5hIHNlY2NpXHUwMEYzbiBlc3BlY1x1MDBFRGZpY2FcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uIC0gU2VjY2lcdTAwRjNuIChlajogJ2ltYWdlJywgJ2xhdW5jaGVyJywgJ2NvbW1vbicpXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBPYmpldG8gY29uIGxhcyB0cmFkdWNjaW9uZXMgZGUgbGEgc2VjY2lcdTAwRjNuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWN0aW9uKHNlY3Rpb24pIHtcbiAgaWYgKGN1cnJlbnRUcmFuc2xhdGlvbnNbc2VjdGlvbl0pIHtcbiAgICByZXR1cm4gY3VycmVudFRyYW5zbGF0aW9uc1tzZWN0aW9uXTtcbiAgfVxuXG4gIGNvbnNvbGUud2FybihgU2VjY2lcdTAwRjNuIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlbmNvbnRyYWRhOiAnJHtzZWN0aW9ufSdgKTtcbiAgcmV0dXJuIHt9O1xufVxuXG4vKipcbiAqIFZlcmlmaWNhIHNpIHVuIGlkaW9tYSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgc2kgZXN0XHUwMEUxIGRpc3BvbmlibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTGFuZ3VhZ2VBdmFpbGFibGUobGFuZ0NvZGUpIHtcbiAgcmV0dXJuICEhdHJhbnNsYXRpb25zW2xhbmdDb2RlXTtcbn1cblxuLy8gSW5pY2lhbGl6YXIgYXV0b21cdTAwRTF0aWNhbWVudGUgYWwgY2FyZ2FyIGVsIG1cdTAwRjNkdWxvXG5pbml0aWFsaXplTGFuZ3VhZ2UoKTtcbiIsICJpbXBvcnQgeyBnZXRTZWN0aW9uIH0gZnJvbSAnLi4vbG9jYWxlcy9pbmRleC5qcyc7XG5cbmV4cG9ydCBjb25zdCBJTUFHRV9ERUZBVUxUUyA9IHtcbiAgU0lURUtFWTogJzB4NEFBQUFBQUJwcUplOEZPME44NHEwRicsXG4gIENPT0xET1dOX0RFRkFVTFQ6IDMxMDAwLFxuICBUUkFOU1BBUkVOQ1lfVEhSRVNIT0xEOiAxMDAsXG4gIFdISVRFX1RIUkVTSE9MRDogMjUwLFxuICBMT0dfSU5URVJWQUw6IDEwLFxuICBUSUxFX1NJWkU6IDMwMDAsXG4gIFBJWEVMU19QRVJfQkFUQ0g6IDIwLFxuICBDSEFSR0VfUkVHRU5fTVM6IDMwMDAwLFxuICBUSEVNRToge1xuICAgIHByaW1hcnk6ICcjMDAwMDAwJyxcbiAgICBzZWNvbmRhcnk6ICcjMTExMTExJyxcbiAgICBhY2NlbnQ6ICcjMjIyMjIyJyxcbiAgICB0ZXh0OiAnI2ZmZmZmZicsXG4gICAgaGlnaGxpZ2h0OiAnIzc3NWNlMycsXG4gICAgc3VjY2VzczogJyMwMGZmMDAnLFxuICAgIGVycm9yOiAnI2ZmMDAwMCcsXG4gICAgd2FybmluZzogJyNmZmFhMDAnXG4gIH1cbn07XG5cbi8vIEVzdGEgZnVuY2lcdTAwRjNuIGFob3JhIHJldG9ybmEgbGFzIHRyYWR1Y2Npb25lcyBkaW5cdTAwRTFtaWNhbWVudGVcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZVRleHRzKCkge1xuICByZXR1cm4gZ2V0U2VjdGlvbignaW1hZ2UnKTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgb2J0ZW5lciB0ZXh0b3MgY29uIHBhclx1MDBFMW1ldHJvc1xuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlVGV4dChrZXksIHBhcmFtcyA9IHt9KSB7XG4gIGNvbnN0IHRleHRzID0gZ2V0SW1hZ2VUZXh0cygpO1xuICBsZXQgdGV4dCA9IHRleHRzW2tleV0gfHwga2V5O1xuICBcbiAgLy8gSW50ZXJwb2xhciBwYXJcdTAwRTFtZXRyb3NcbiAgaWYgKHBhcmFtcyAmJiBPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA+IDApIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHsoXFx3KylcXH0vZywgKG1hdGNoLCBwYXJhbUtleSkgPT4ge1xuICAgICAgcmV0dXJuIHBhcmFtc1twYXJhbUtleV0gIT09IHVuZGVmaW5lZCA/IHBhcmFtc1twYXJhbUtleV0gOiBtYXRjaDtcbiAgICB9KTtcbiAgfVxuICBcbiAgcmV0dXJuIHRleHQ7XG59XG5cbi8vIE1hbnRlbmVyIFRFWFRTIHBvciBjb21wYXRpYmlsaWRhZCBwZXJvIG1hcmNhcmxvIGNvbW8gZGVwcmVjYXRlZFxuZXhwb3J0IGNvbnN0IFRFWFRTID0ge1xuICBnZXQgZXMoKSB7XG4gICAgY29uc29sZS53YXJuKCdURVhUUy5lcyBlc3RcdTAwRTEgZGVwcmVjYXRlZC4gVXNhIGdldEltYWdlVGV4dHMoKSBlbiBzdSBsdWdhci4nKTtcbiAgICByZXR1cm4gZ2V0SW1hZ2VUZXh0cygpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW1hZ2VTdGF0ZSA9IHtcbiAgcnVubmluZzogZmFsc2UsXG4gIGltYWdlTG9hZGVkOiBmYWxzZSxcbiAgcHJvY2Vzc2luZzogZmFsc2UsXG4gIHRvdGFsUGl4ZWxzOiAwLFxuICBwYWludGVkUGl4ZWxzOiAwLFxuICBhdmFpbGFibGVDb2xvcnM6IFtdLFxuICBjdXJyZW50Q2hhcmdlczogMCxcbiAgY29vbGRvd246IElNQUdFX0RFRkFVTFRTLkNPT0xET1dOX0RFRkFVTFQsXG4gIGltYWdlRGF0YTogbnVsbCxcbiAgc3RvcEZsYWc6IGZhbHNlLFxuICBjb2xvcnNDaGVja2VkOiBmYWxzZSxcbiAgc3RhcnRQb3NpdGlvbjogbnVsbCxcbiAgc2VsZWN0aW5nUG9zaXRpb246IGZhbHNlLFxuICBwb3NpdGlvblRpbWVvdXRJZDogbnVsbCwgLy8gUGFyYSBtYW5lamFyIHRpbWVvdXQgZGUgc2VsZWNjaVx1MDBGM25cbiAgY2xlYW51cE9ic2VydmVyOiBudWxsLCAvLyBQYXJhIGxpbXBpYXIgb2JzZXJ2ZXJzXG4gIHJlZ2lvbjogbnVsbCxcbiAgbWluaW1pemVkOiBmYWxzZSxcbiAgbGFzdFBvc2l0aW9uOiB7IHg6IDAsIHk6IDAgfSxcbiAgZXN0aW1hdGVkVGltZTogMCxcbiAgbGFuZ3VhZ2U6ICdlcycsXG4gIHRpbGVYOiBudWxsLFxuICB0aWxlWTogbnVsbCxcbiAgcGl4ZWxzUGVyQmF0Y2g6IElNQUdFX0RFRkFVTFRTLlBJWEVMU19QRVJfQkFUQ0gsXG4gIHVzZUFsbENoYXJnZXNGaXJzdDogdHJ1ZSwgLy8gVXNhciB0b2RhcyBsYXMgY2FyZ2FzIGVuIGxhIHByaW1lcmEgcGFzYWRhXG4gIGlzRmlyc3RCYXRjaDogdHJ1ZSwgLy8gQ29udHJvbGFyIHNpIGVzIGxhIHByaW1lcmEgcGFzYWRhXG4gIG1heENoYXJnZXM6IDUwLCAvLyBDYXJnYXMgbVx1MDBFMXhpbWFzIGRlbCB1c3VhcmlvXG4gIG5leHRCYXRjaENvb2xkb3duOiAwLCAvLyBUaWVtcG8gcGFyYSBlbCBzaWd1aWVudGUgbG90ZVxuICBpbkNvb2xkb3duOiBmYWxzZSxcbiAgY29vbGRvd25FbmRUaW1lOiAwLFxuICByZW1haW5pbmdQaXhlbHM6IFtdLFxuICBsYXN0Q2hhcmdlVXBkYXRlOiAwLFxuICBjaGFyZ2VEZWNpbWFsUGFydDogMCxcbiAgb3JpZ2luYWxJbWFnZU5hbWU6IG51bGwsXG4gIHJldHJ5Q291bnQ6IDAgLy8gQ29udGFkb3IgZGUgcmVpbnRlbnRvcyBwYXJhIGVzdGFkXHUwMEVEc3RpY2FzXG59O1xuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuXG5leHBvcnQgY2xhc3MgSW1hZ2VQcm9jZXNzb3Ige1xuICBjb25zdHJ1Y3RvcihpbWFnZVNyYykge1xuICAgIHRoaXMuaW1hZ2VTcmMgPSBpbWFnZVNyYztcbiAgICB0aGlzLmltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7IHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZSB9KTtcbiAgICB0aGlzLnByZXZpZXdDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLnByZXZpZXdDdHggPSB0aGlzLnByZXZpZXdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuICBcbiAgYXN5bmMgbG9hZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5pbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuaW1nLndpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmltZy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgMCwgMCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH07XG4gICAgICB0aGlzLmltZy5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgdGhpcy5pbWcuc3JjID0gdGhpcy5pbWFnZVNyYztcbiAgICB9KTtcbiAgfVxuICBcbiAgZ2V0UGl4ZWxEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmN0eC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCkuZGF0YTtcbiAgfVxuICBcbiAgZ2V0RGltZW5zaW9ucygpIHtcbiAgICByZXR1cm4geyB3aWR0aDogdGhpcy5jYW52YXMud2lkdGgsIGhlaWdodDogdGhpcy5jYW52YXMuaGVpZ2h0IH07XG4gIH1cbiAgXG4gIHJlc2l6ZShuZXdXaWR0aCwgbmV3SGVpZ2h0KSB7XG4gICAgY29uc3QgdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRlbXBDYW52YXMud2lkdGggPSBuZXdXaWR0aDtcbiAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICBjb25zdCB0ZW1wQ3R4ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIFxuICAgIHRlbXBDdHguZHJhd0ltYWdlKHRoaXMuaW1nLCAwLCAwLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgICBcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IG5ld1dpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGVtcENhbnZhcywgMCwgMCk7XG4gICAgXG4gICAgcmV0dXJuIHRoaXMuZ2V0UGl4ZWxEYXRhKCk7XG4gIH1cbiAgXG4gIGdlbmVyYXRlUHJldmlldyhuZXdXaWR0aCwgbmV3SGVpZ2h0KSB7XG4gICAgdGhpcy5wcmV2aWV3Q2FudmFzLndpZHRoID0gbmV3V2lkdGg7XG4gICAgdGhpcy5wcmV2aWV3Q2FudmFzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICB0aGlzLnByZXZpZXdDdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aWV3Q3R4LmRyYXdJbWFnZSh0aGlzLmltZywgMCwgMCwgbmV3V2lkdGgsIG5ld0hlaWdodCk7XG4gICAgXG4gICAgcmV0dXJuIHRoaXMucHJldmlld0NhbnZhcy50b0RhdGFVUkwoKTtcbiAgfVxuICBcbiAgZ2V0SW1hZ2VEYXRhKCkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5nZXREaW1lbnNpb25zKCk7XG4gICAgY29uc3QgcGl4ZWxzID0gdGhpcy5nZXRQaXhlbERhdGEoKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBwaXhlbHMsXG4gICAgICBvcmlnaW5hbE5hbWU6IHRoaXMub3JpZ2luYWxOYW1lIHx8ICdpbWFnZS5wbmcnXG4gICAgfTtcbiAgfVxuICBcbiAgcHJvY2Vzc0ltYWdlKGF2YWlsYWJsZUNvbG9ycywgY29uZmlnKSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLmdldERpbWVuc2lvbnMoKTtcbiAgICBjb25zdCBwaXhlbHMgPSB0aGlzLmdldFBpeGVsRGF0YSgpO1xuICAgIGNvbnN0IHByb2Nlc3NlZFBpeGVscyA9IFtdO1xuICAgIGxldCB2YWxpZFBpeGVsQ291bnQgPSAwO1xuICAgIFxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICBjb25zdCBpZHggPSAoeSAqIHdpZHRoICsgeCkgKiA0O1xuICAgICAgICBjb25zdCByID0gcGl4ZWxzW2lkeF07XG4gICAgICAgIGNvbnN0IGcgPSBwaXhlbHNbaWR4ICsgMV07XG4gICAgICAgIGNvbnN0IGIgPSBwaXhlbHNbaWR4ICsgMl07XG4gICAgICAgIGNvbnN0IGFscGhhID0gcGl4ZWxzW2lkeCArIDNdO1xuICAgICAgICBcbiAgICAgICAgLy8gRmlsdHJhciBwXHUwMEVEeGVsZXMgdHJhbnNwYXJlbnRlc1xuICAgICAgICBpZiAoYWxwaGEgPCBjb25maWcuVFJBTlNQQVJFTkNZX1RIUkVTSE9MRCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBOb3RhOiBSZW1vdmlkbyBlbCBmaWx0cm8gYXV0b21cdTAwRTF0aWNvIGRlIHBcdTAwRUR4ZWxlcyBibGFuY29zXG4gICAgICAgIC8vIHBhcmEgcGVybWl0aXIgZWwgdXNvIGRlbCBjb2xvciBibGFuY28gKElEIDUpIGVuIGxhcyBpbVx1MDBFMWdlbmVzXG4gICAgICAgIFxuICAgICAgICAvLyBFbmNvbnRyYXIgZWwgY29sb3IgbVx1MDBFMXMgY2VyY2FubyBlbiBsYSBwYWxldGFcbiAgICAgICAgY29uc3QgY2xvc2VzdENvbG9yID0gdGhpcy5maW5kQ2xvc2VzdENvbG9yKHsgciwgZywgYiB9LCBhdmFpbGFibGVDb2xvcnMpO1xuICAgICAgICBpZiAoY2xvc2VzdENvbG9yKSB7XG4gICAgICAgICAgcHJvY2Vzc2VkUGl4ZWxzLnB1c2goe1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICBvcmlnaW5hbENvbG9yOiB7IHIsIGcsIGIsIGFscGhhIH0sXG4gICAgICAgICAgICB0YXJnZXRDb2xvcjogY2xvc2VzdENvbG9yXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRQaXhlbENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcGl4ZWxzOiBwcm9jZXNzZWRQaXhlbHMsXG4gICAgICB2YWxpZFBpeGVsQ291bnQsXG4gICAgICBvcmlnaW5hbE5hbWU6IHRoaXMub3JpZ2luYWxOYW1lIHx8ICdpbWFnZS5wbmcnXG4gICAgfTtcbiAgfVxuICBcbiAgZmluZENsb3Nlc3RDb2xvcihyZ2IsIHBhbGV0dGUpIHtcbiAgICBpZiAoIXBhbGV0dGUgfHwgcGFsZXR0ZS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgIFxuICAgIGxldCBjbG9zZXN0Q29sb3IgPSBudWxsO1xuICAgIGxldCBtaW5EaXN0YW5jZSA9IEluZmluaXR5O1xuICAgIFxuICAgIGZvciAoY29uc3QgY29sb3Igb2YgcGFsZXR0ZSkge1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoXG4gICAgICAgIE1hdGgucG93KHJnYi5yIC0gY29sb3IuciwgMikgK1xuICAgICAgICBNYXRoLnBvdyhyZ2IuZyAtIGNvbG9yLmcsIDIpICtcbiAgICAgICAgTWF0aC5wb3cocmdiLmIgLSBjb2xvci5iLCAyKVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgaWYgKGRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcbiAgICAgICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgY2xvc2VzdENvbG9yID0gY29sb3I7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBjbG9zZXN0Q29sb3I7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDbG9zZXN0Q29sb3IocmdiLCBwYWxldHRlKSB7XG4gIGlmICghcGFsZXR0ZSB8fCBwYWxldHRlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIFxuICBsZXQgY2xvc2VzdENvbG9yID0gbnVsbDtcbiAgbGV0IG1pbkRpc3RhbmNlID0gSW5maW5pdHk7XG4gIFxuICBmb3IgKGNvbnN0IGNvbG9yIG9mIHBhbGV0dGUpIHtcbiAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgIE1hdGgucG93KHJnYi5yIC0gY29sb3IuciwgMikgK1xuICAgICAgTWF0aC5wb3cocmdiLmcgLSBjb2xvci5nLCAyKSArXG4gICAgICBNYXRoLnBvdyhyZ2IuYiAtIGNvbG9yLmIsIDIpXG4gICAgKTtcbiAgICBcbiAgICBpZiAoZGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgIGNsb3Nlc3RDb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGNsb3Nlc3RDb2xvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUGl4ZWxRdWV1ZShpbWFnZURhdGEsIHN0YXJ0UG9zaXRpb24sIHRpbGVYLCB0aWxlWSkge1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIHBpeGVscyB9ID0gaW1hZ2VEYXRhO1xuICBjb25zdCB7IHg6IGxvY2FsU3RhcnRYLCB5OiBsb2NhbFN0YXJ0WSB9ID0gc3RhcnRQb3NpdGlvbjtcbiAgY29uc3QgcXVldWUgPSBbXTtcblxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICBjb25zdCBwaXhlbERhdGEgPSBwaXhlbHMuZmluZChwID0+IHAueCA9PT0geCAmJiBwLnkgPT09IHkpO1xuICAgICAgaWYgKCFwaXhlbERhdGEpIGNvbnRpbnVlO1xuICAgICAgXG4gICAgICBjb25zdCBnbG9iYWxYID0gbG9jYWxTdGFydFggKyB4O1xuICAgICAgY29uc3QgZ2xvYmFsWSA9IGxvY2FsU3RhcnRZICsgeTtcbiAgICAgIFxuICAgICAgcXVldWUucHVzaCh7XG4gICAgICAgIGltYWdlWDogeCxcbiAgICAgICAgaW1hZ2VZOiB5LFxuICAgICAgICBsb2NhbFg6IGdsb2JhbFgsXG4gICAgICAgIGxvY2FsWTogZ2xvYmFsWSxcbiAgICAgICAgdGlsZVg6IHRpbGVYLFxuICAgICAgICB0aWxlWTogdGlsZVksXG4gICAgICAgIGNvbG9yOiBwaXhlbERhdGEudGFyZ2V0Q29sb3IsXG4gICAgICAgIG9yaWdpbmFsQ29sb3I6IHBpeGVsRGF0YS5vcmlnaW5hbENvbG9yXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBsb2coYENvbGEgZGUgcFx1MDBFRHhlbGVzIGdlbmVyYWRhOiAke3F1ZXVlLmxlbmd0aH0gcFx1MDBFRHhlbGVzIHBhcmEgcGludGFyYCk7XG4gIHJldHVybiBxdWV1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEF2YWlsYWJsZUNvbG9ycygpIHtcbiAgbG9nKCdcdUQ4M0NcdURGQTggRGV0ZWN0YW5kbyBjb2xvcmVzIGRpc3BvbmlibGVzLi4uJyk7XG4gIFxuICAvLyBCdXNjYXIgZWxlbWVudG9zIGRlIGNvbG9yIHVzYW5kbyBlbCBzZWxlY3RvciBkZWwgb3JpZ2luYWxcbiAgY29uc3QgY29sb3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49XCJjb2xvci1cIl0nKTtcbiAgY29uc3QgY29sb3JzID0gW107XG4gIFxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29sb3JFbGVtZW50cykge1xuICAgIC8vIEZpbHRyYXIgZWxlbWVudG9zIHF1ZSB0aWVuZW4gU1ZHIChwcm9iYWJsZW1lbnRlIGljb25vcyBkZSBibG9xdWVvKVxuICAgIGlmIChlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgaWRTdHIgPSBlbGVtZW50LmlkLnJlcGxhY2UoJ2NvbG9yLScsICcnKTtcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KGlkU3RyKTtcbiAgICBcbiAgICAvLyBGaWx0cmFyIHNvbG8gZWwgY29sb3IgMCAobWFudGVuZXIgZWwgY29sb3IgYmxhbmNvIElEIDUgZGlzcG9uaWJsZSlcbiAgICBpZiAoaWQgPT09IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICAvLyBPYnRlbmVyIGNvbG9yIFJHQiBkZWwgc3R5bGVcbiAgICBjb25zdCBiYWNrZ3JvdW5kU3R5bGUgPSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcbiAgICBpZiAoYmFja2dyb3VuZFN0eWxlKSB7XG4gICAgICBjb25zdCByZ2JNYXRjaCA9IGJhY2tncm91bmRTdHlsZS5tYXRjaCgvXFxkKy9nKTtcbiAgICAgIGlmIChyZ2JNYXRjaCAmJiByZ2JNYXRjaC5sZW5ndGggPj0gMykge1xuICAgICAgICBjb25zdCByZ2IgPSB7XG4gICAgICAgICAgcjogcGFyc2VJbnQocmdiTWF0Y2hbMF0pLFxuICAgICAgICAgIGc6IHBhcnNlSW50KHJnYk1hdGNoWzFdKSxcbiAgICAgICAgICBiOiBwYXJzZUludChyZ2JNYXRjaFsyXSlcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGNvbG9ycy5wdXNoKHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgIC4uLnJnYlxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGxvZyhgQ29sb3IgZGV0ZWN0YWRvOiBpZD0ke2lkfSwgcmdiKCR7cmdiLnJ9LCR7cmdiLmd9LCR7cmdiLmJ9KWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgbG9nKGBcdTI3MDUgJHtjb2xvcnMubGVuZ3RofSBjb2xvcmVzIGRpc3BvbmlibGVzIGRldGVjdGFkb3NgKTtcbiAgcmV0dXJuIGNvbG9ycztcbn1cbiIsICIvLyA9PT0gW1Byb2Nlc2Fkb3IgZGUgaW1cdTAwRTFnZW5lcyBiYXNhZG8gZW4gQmx1ZSBNYXJibGVdID09PVxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2VyLmpzXCI7XG5cbi8qKlxuICogUHJvY2VzYWRvciBkZSBpbVx1MDBFMWdlbmVzIGNvbiBhcnF1aXRlY3R1cmEgQmx1ZSBNYXJibGVcbiAqIE1hbmVqYSBjaHVua2luZyBlbiB0aWxlcywgZmFjdG9yIGRlIGVzY2FsYWRvLCB5IHNpc3RlbWEgZGUgY29vcmRlbmFkYXMgY29tcGF0aWJsZVxuICovXG5leHBvcnQgY2xhc3MgQmx1ZU1hcmJsZWxJbWFnZVByb2Nlc3NvciB7XG4gIGNvbnN0cnVjdG9yKGltYWdlU3JjKSB7XG4gICAgdGhpcy5pbWFnZVNyYyA9IGltYWdlU3JjO1xuICAgIHRoaXMuaW1nID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgIHRoaXMub3JpZ2luYWxOYW1lID0gbnVsbDtcbiAgICBcbiAgICAvLyBDb25maWd1cmFjaVx1MDBGM24gQmx1ZSBNYXJibGVcbiAgICB0aGlzLnRpbGVTaXplID0gMTAwMDsgLy8gVGFtYVx1MDBGMW8gZGUgdGlsZSBlbiBwXHUwMEVEeGVsZXMgKGNvbW8gQmx1ZSBNYXJibGUpXG4gICAgdGhpcy5kcmF3TXVsdCA9IDM7IC8vIEZhY3RvciBkZSBlc2NhbGFkbyAoREVCRSBzZXIgaW1wYXIpXG4gICAgdGhpcy5zaHJlYWRTaXplID0gMzsgLy8gQWxpYXMgcGFyYSBkcmF3TXVsdCBwYXJhIGNvbXBhdGliaWxpZGFkXG4gICAgXG4gICAgLy8gRXN0YWRvIGRlbCBwcm9jZXNhbWllbnRvXG4gICAgdGhpcy5iaXRtYXAgPSBudWxsO1xuICAgIHRoaXMuaW1hZ2VXaWR0aCA9IDA7XG4gICAgdGhpcy5pbWFnZUhlaWdodCA9IDA7XG4gICAgdGhpcy50b3RhbFBpeGVscyA9IDA7XG4gICAgdGhpcy5yZXF1aXJlZFBpeGVsQ291bnQgPSAwO1xuICAgIHRoaXMuZGVmYWNlUGl4ZWxDb3VudCA9IDA7XG4gICAgdGhpcy5jb2xvclBhbGV0dGUgPSB7fTtcbiAgICB0aGlzLmFsbG93ZWRDb2xvcnNTZXQgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5yZ2JUb01ldGEgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5jb29yZHMgPSBbMCwgMCwgMCwgMF07IC8vIFt0aWxlWCwgdGlsZVksIHBpeGVsWCwgcGl4ZWxZXVxuICAgIHRoaXMudGVtcGxhdGVUaWxlcyA9IHt9O1xuICAgIHRoaXMudGVtcGxhdGVUaWxlc0J1ZmZlcnMgPSB7fTtcbiAgICB0aGlzLnRpbGVQcmVmaXhlcyA9IG5ldyBTZXQoKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaW1nLm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLmJpdG1hcCA9IGF3YWl0IGNyZWF0ZUltYWdlQml0bWFwKHRoaXMuaW1nKTtcbiAgICAgICAgICB0aGlzLmltYWdlV2lkdGggPSB0aGlzLmJpdG1hcC53aWR0aDtcbiAgICAgICAgICB0aGlzLmltYWdlSGVpZ2h0ID0gdGhpcy5iaXRtYXAuaGVpZ2h0O1xuICAgICAgICAgIHRoaXMudG90YWxQaXhlbHMgPSB0aGlzLmltYWdlV2lkdGggKiB0aGlzLmltYWdlSGVpZ2h0O1xuICAgICAgICAgIFxuICAgICAgICAgIGxvZyhgW0JMVUUgTUFSQkxFXSBJbWFnZW4gY2FyZ2FkYTogJHt0aGlzLmltYWdlV2lkdGh9XHUwMEQ3JHt0aGlzLmltYWdlSGVpZ2h0fSA9ICR7dGhpcy50b3RhbFBpeGVscy50b0xvY2FsZVN0cmluZygpfSBwXHUwMEVEeGVsZXNgKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRoaXMuaW1nLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICB0aGlzLmltZy5zcmMgPSB0aGlzLmltYWdlU3JjO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaWNpYWxpemEgbGEgcGFsZXRhIGRlIGNvbG9yZXMgZGVzZGUgV1BsYWNlIChjb21vIEJsdWUgTWFyYmxlKVxuICAgKi9cbiAgaW5pdGlhbGl6ZUNvbG9yUGFsZXR0ZSgpIHtcbiAgICBsb2coJ1tCTFVFIE1BUkJMRV0gSW5pY2lhbGl6YW5kbyBwYWxldGEgZGUgY29sb3Jlcy4uLicpO1xuICAgIFxuICAgIC8vIERldGVjdGFyIGNvbG9yZXMgZGlzcG9uaWJsZXMgZGVsIHNpdGlvIChtZWpvcmFkbylcbiAgICBjb25zdCBhdmFpbGFibGVDb2xvcnMgPSB0aGlzLmRldGVjdFNpdGVDb2xvcnMoKTtcbiAgICBcblxuICAgIFxuICAgIC8vIENvbnN0cnVpciBjb25qdW50byBkZSBjb2xvcmVzIHBlcm1pdGlkb3NcbiAgICBjb25zdCBmaWx0ZXJlZENvbG9ycyA9IGF2YWlsYWJsZUNvbG9yc1xuICAgICAgLmZpbHRlcihjID0+IGMubmFtZSAmJiBjLm5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ3RyYW5zcGFyZW50JyAmJiBBcnJheS5pc0FycmF5KGMucmdiKSk7XG4gICAgXG5cbiAgICBcbiAgICB0aGlzLmFsbG93ZWRDb2xvcnNTZXQgPSBuZXcgU2V0KFxuICAgICAgZmlsdGVyZWRDb2xvcnMubWFwKGMgPT4gYCR7Yy5yZ2JbMF19LCR7Yy5yZ2JbMV19LCR7Yy5yZ2JbMl19YClcbiAgICApO1xuICAgIFxuXG5cbiAgICAvLyBBc2VndXJhciBxdWUgI2RlZmFjZSAobWFyY2Fkb3IgZGUgdHJhbnNwYXJlbmNpYSkgc2UgdHJhdGUgY29tbyBwZXJtaXRpZG9cbiAgICBjb25zdCBkZWZhY2VLZXkgPSAnMjIyLDI1MCwyMDYnO1xuICAgIHRoaXMuYWxsb3dlZENvbG9yc1NldC5hZGQoZGVmYWNlS2V5KTtcblxuICAgIC8vIE1hcGVhciBSR0IgYSBtZXRhZGF0b3NcbiAgICB0aGlzLnJnYlRvTWV0YSA9IG5ldyBNYXAoXG4gICAgICBhdmFpbGFibGVDb2xvcnNcbiAgICAgICAgLmZpbHRlcihjID0+IEFycmF5LmlzQXJyYXkoYy5yZ2IpKVxuICAgICAgICAubWFwKGMgPT4gW1xuICAgICAgICAgIGAke2MucmdiWzBdfSwke2MucmdiWzFdfSwke2MucmdiWzJdfWAsIFxuICAgICAgICAgIHsgXG4gICAgICAgICAgICBpZDogYy5pZCwgXG4gICAgICAgICAgICBwcmVtaXVtOiAhIWMucHJlbWl1bSwgXG4gICAgICAgICAgICBuYW1lOiBjLm5hbWUgfHwgYENvbG9yICR7Yy5pZH1gIFxuICAgICAgICAgIH1cbiAgICAgICAgXSlcbiAgICApO1xuXG4gICAgLy8gTWFwZWFyICNkZWZhY2UgYSBUcmFuc3BhcmVudCBwYXJhIFVJXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRyYW5zcGFyZW50ID0gYXZhaWxhYmxlQ29sb3JzLmZpbmQoYyA9PiBjLm5hbWUgJiYgYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0cmFuc3BhcmVudCcpO1xuICAgICAgaWYgKHRyYW5zcGFyZW50ICYmIEFycmF5LmlzQXJyYXkodHJhbnNwYXJlbnQucmdiKSkge1xuICAgICAgICB0aGlzLnJnYlRvTWV0YS5zZXQoZGVmYWNlS2V5LCB7IFxuICAgICAgICAgIGlkOiB0cmFuc3BhcmVudC5pZCwgXG4gICAgICAgICAgcHJlbWl1bTogISF0cmFuc3BhcmVudC5wcmVtaXVtLCBcbiAgICAgICAgICBuYW1lOiB0cmFuc3BhcmVudC5uYW1lIFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgIC8vIElnbm9yYXIgZXJyb3JlcyBhbCBwcm9jZXNhciB0cmFuc3BhcmVuY2lhc1xuICAgIH1cblxuICAgIGxvZyhgW0JMVUUgTUFSQkxFXSBQYWxldGEgaW5pY2lhbGl6YWRhOiAke3RoaXMuYWxsb3dlZENvbG9yc1NldC5zaXplfSBjb2xvcmVzIHBlcm1pdGlkb3NgKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhdmFpbGFibGVDb2xvcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdGEgY29sb3JlcyBkaXNwb25pYmxlcyBkZWwgc2l0aW8gKHZlcnNpXHUwMEYzbiBtZWpvcmFkYSBkZSBCbHVlIE1hcmJsZSlcbiAgICovXG4gIGRldGVjdFNpdGVDb2xvcnMoKSB7XG4gICAgY29uc3QgY29sb3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49XCJjb2xvci1cIl0nKTtcbiAgICBjb25zdCBjb2xvcnMgPSBbXTtcbiAgICBcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29sb3JFbGVtZW50cykge1xuICAgICAgY29uc3QgaWRTdHIgPSBlbGVtZW50LmlkLnJlcGxhY2UoJ2NvbG9yLScsICcnKTtcbiAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQoaWRTdHIpO1xuICAgICAgXG4gICAgICAvLyBGaWx0cmFyIGVsZW1lbnRvcyBjb24gU1ZHIChwcm9iYWJsZW1lbnRlIGJsb3F1ZW9zKVxuICAgICAgaWYgKGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3ZnJykpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEZpbHRyYXIgc29sbyBlbCBjb2xvciAwIChtYW50ZW5lciBlbCBjb2xvciBibGFuY28gSUQgNSBkaXNwb25pYmxlKVxuICAgICAgaWYgKGlkID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBPYnRlbmVyIGNvbG9yIFJHQiBkZWwgc3R5bGVcbiAgICAgIGNvbnN0IGJhY2tncm91bmRTdHlsZSA9IGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuICAgICAgaWYgKGJhY2tncm91bmRTdHlsZSkge1xuICAgICAgICBjb25zdCByZ2JNYXRjaCA9IGJhY2tncm91bmRTdHlsZS5tYXRjaCgvXFxkKy9nKTtcbiAgICAgICAgaWYgKHJnYk1hdGNoICYmIHJnYk1hdGNoLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgY29uc3QgcmdiID0gW1xuICAgICAgICAgICAgcGFyc2VJbnQocmdiTWF0Y2hbMF0pLFxuICAgICAgICAgICAgcGFyc2VJbnQocmdiTWF0Y2hbMV0pLFxuICAgICAgICAgICAgcGFyc2VJbnQocmdiTWF0Y2hbMl0pXG4gICAgICAgICAgXTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBjb2xvckluZm8gPSB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICByZ2IsXG4gICAgICAgICAgICBuYW1lOiBlbGVtZW50LnRpdGxlIHx8IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgfHwgYENvbG9yICR7aWR9YCxcbiAgICAgICAgICAgIHByZW1pdW06IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmVtaXVtJykgfHwgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbWl1bScpXG4gICAgICAgICAgfTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb2xvcnMucHVzaChjb2xvckluZm8pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGxvZyhgW0JMVUUgTUFSQkxFXSAke2NvbG9ycy5sZW5ndGh9IGNvbG9yZXMgZGV0ZWN0YWRvcyBkZWwgc2l0aW9gKTtcbiAgICBcblxuICAgIFxuICAgIHJldHVybiBjb2xvcnM7XG4gIH1cblxuICAvKipcbiAgICogRXN0YWJsZWNlIGxhcyBjb29yZGVuYWRhcyBkZSBwb3NpY2lcdTAwRjNuIChjb21vIEJsdWUgTWFyYmxlKVxuICAgKi9cbiAgc2V0Q29vcmRzKHRpbGVYLCB0aWxlWSwgcGl4ZWxYLCBwaXhlbFkpIHtcbiAgICB0aGlzLmNvb3JkcyA9IFt0aWxlWCwgdGlsZVksIHBpeGVsWCwgcGl4ZWxZXTtcbiAgICBsb2coYFtCTFVFIE1BUkJMRV0gQ29vcmRlbmFkYXMgZXN0YWJsZWNpZGFzOiB0aWxlKCR7dGlsZVh9LCR7dGlsZVl9KSBwaXhlbCgke3BpeGVsWH0sJHtwaXhlbFl9KWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuYWxpemEgcFx1MDBFRHhlbGVzIGRlIGxhIGltYWdlbiB5IGN1ZW50YSByZXF1ZXJpZG9zIHZzICNkZWZhY2UgKGNvbW8gQmx1ZSBNYXJibGUpXG4gICAqL1xuICBhc3luYyBhbmFseXplUGl4ZWxzKCkge1xuICAgIGlmICghdGhpcy5iaXRtYXApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2VuIG5vIGNhcmdhZGEuIExsYW1hIGEgbG9hZCgpIHByaW1lcm8uJyk7XG4gICAgfVxuXG4gICAgbG9nKCdbQkxVRSBNQVJCTEVdIEFuYWxpemFuZG8gcFx1MDBFRHhlbGVzIGRlIGxhIGltYWdlbi4uLicpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIENyZWFyIGNhbnZhcyBkZSBpbnNwZWNjaVx1MDBGM24gYSBlc2NhbGEgMToxXG4gICAgICBjb25zdCBpbnNwZWN0Q2FudmFzID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh0aGlzLmltYWdlV2lkdGgsIHRoaXMuaW1hZ2VIZWlnaHQpO1xuICAgICAgY29uc3QgaW5zcGVjdEN0eCA9IGluc3BlY3RDYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7IHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZSB9KTtcbiAgICAgIGluc3BlY3RDdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICBpbnNwZWN0Q3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmltYWdlV2lkdGgsIHRoaXMuaW1hZ2VIZWlnaHQpO1xuICAgICAgaW5zcGVjdEN0eC5kcmF3SW1hZ2UodGhpcy5iaXRtYXAsIDAsIDApO1xuICAgICAgY29uc3QgaW5zcGVjdERhdGEgPSBpbnNwZWN0Q3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmltYWdlV2lkdGgsIHRoaXMuaW1hZ2VIZWlnaHQpLmRhdGE7XG5cbiAgICAgIGxldCByZXF1aXJlZCA9IDA7XG4gICAgICBsZXQgZGVmYWNlID0gMDtcbiAgICAgIGNvbnN0IHBhbGV0dGVNYXAgPSBuZXcgTWFwKCk7XG5cblxuXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaW1hZ2VIZWlnaHQ7IHkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuaW1hZ2VXaWR0aDsgeCsrKSB7XG4gICAgICAgICAgY29uc3QgaWR4ID0gKHkgKiB0aGlzLmltYWdlV2lkdGggKyB4KSAqIDQ7XG4gICAgICAgICAgY29uc3QgciA9IGluc3BlY3REYXRhW2lkeF07XG4gICAgICAgICAgY29uc3QgZyA9IGluc3BlY3REYXRhW2lkeCArIDFdO1xuICAgICAgICAgIGNvbnN0IGIgPSBpbnNwZWN0RGF0YVtpZHggKyAyXTtcbiAgICAgICAgICBjb25zdCBhID0gaW5zcGVjdERhdGFbaWR4ICsgM107XG5cbiAgICAgICAgICBpZiAoYSA9PT0gMCkgY29udGludWU7IC8vIElnbm9yYXIgcFx1MDBFRHhlbGVzIHRyYW5zcGFyZW50ZXNcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBrZXkgPSBgJHtyfSwke2d9LCR7Yn1gO1xuXG4gICAgICAgICAgLy8gQ29udGFyIHBcdTAwRUR4ZWxlcyAjZGVmYWNlIChtYXJjYWRvciBkZSB0cmFuc3BhcmVuY2lhKVxuICAgICAgICAgIGlmIChyID09PSAyMjIgJiYgZyA9PT0gMjUwICYmIGIgPT09IDIwNikge1xuICAgICAgICAgICAgZGVmYWNlKys7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRnVuY2lcdTAwRjNuIGRlIHRvbGVyYW5jaWEgcGFyYSBjb2xvcmVzIG11eSBwclx1MDBGM3hpbW9zIGFsIGJsYW5jb1xuICAgICAgICAgIGxldCBtYXRjaGVkS2V5ID0ga2V5O1xuICAgICAgICAgIGxldCBpc1ZhbGlkUGl4ZWwgPSB0aGlzLmFsbG93ZWRDb2xvcnNTZXQuaGFzKGtleSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gU2kgbm8gZXMgdW4gY29sb3IgZXhhY3RvLCB2ZXJpZmljYXIgc2kgZXMgbXV5IHByXHUwMEYzeGltbyBhbCBibGFuY29cbiAgICAgICAgICBpZiAoIWlzVmFsaWRQaXhlbCAmJiB0aGlzLmFsbG93ZWRDb2xvcnNTZXQuaGFzKCcyNTUsMjU1LDI1NScpKSB7XG4gICAgICAgICAgICAvLyBUb2xlcmFuY2lhIHBhcmEgcFx1MDBFRHhlbGVzIG11eSBwclx1MDBGM3hpbW9zIGFsIGJsYW5jbyAoZGlmZXJlbmNpYSBtXHUwMEUxeGltYSBkZSAxMCBlbiBjYWRhIGNhbmFsKVxuICAgICAgICAgICAgaWYgKHIgPj0gMjQ1ICYmIGcgPj0gMjQ1ICYmIGIgPj0gMjQ1KSB7XG4gICAgICAgICAgICAgIG1hdGNoZWRLZXkgPSAnMjU1LDI1NSwyNTUnO1xuICAgICAgICAgICAgICBpc1ZhbGlkUGl4ZWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFNvbG8gY29udGFyIGNvbG9yZXMgdlx1MDBFMWxpZG9zIChleGFjdG9zIG8gY29uIHRvbGVyYW5jaWEpXG4gICAgICAgICAgaWYgKCFpc1ZhbGlkUGl4ZWwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgcmVxdWlyZWQrKztcbiAgICAgICAgICBwYWxldHRlTWFwLnNldChtYXRjaGVkS2V5LCAocGFsZXR0ZU1hcC5nZXQobWF0Y2hlZEtleSkgfHwgMCkgKyAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJlcXVpcmVkUGl4ZWxDb3VudCA9IHJlcXVpcmVkO1xuICAgICAgdGhpcy5kZWZhY2VQaXhlbENvdW50ID0gZGVmYWNlO1xuXG4gICAgICAvLyBQZXJzaXN0aXIgcGFsZXRhIGNvbiB0b2RvcyBsb3MgY29sb3JlcyBoYWJpbGl0YWRvcyBwb3IgZGVmZWN0b1xuICAgICAgY29uc3QgcGFsZXR0ZU9iaiA9IHt9O1xuICAgICAgZm9yIChjb25zdCBba2V5LCBjb3VudF0gb2YgcGFsZXR0ZU1hcC5lbnRyaWVzKCkpIHtcbiAgICAgICAgcGFsZXR0ZU9ialtrZXldID0geyBjb3VudCwgZW5hYmxlZDogdHJ1ZSB9O1xuICAgICAgfVxuICAgICAgdGhpcy5jb2xvclBhbGV0dGUgPSBwYWxldHRlT2JqO1xuXG4gICAgICBsb2coYFtCTFVFIE1BUkJMRV0gQW5cdTAwRTFsaXNpcyBjb21wbGV0YWRvOmApO1xuICAgICAgbG9nKGAgIC0gUFx1MDBFRHhlbGVzIHJlcXVlcmlkb3M6ICR7cmVxdWlyZWQudG9Mb2NhbGVTdHJpbmcoKX1gKTtcbiAgICAgIGxvZyhgICAtIFBcdTAwRUR4ZWxlcyAjZGVmYWNlOiAke2RlZmFjZS50b0xvY2FsZVN0cmluZygpfWApO1xuICAgICAgbG9nKGAgIC0gQ29sb3JlcyBcdTAwRkFuaWNvczogJHtwYWxldHRlTWFwLnNpemV9YCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvdGFsUGl4ZWxzOiB0aGlzLnRvdGFsUGl4ZWxzLFxuICAgICAgICByZXF1aXJlZFBpeGVsczogcmVxdWlyZWQsXG4gICAgICAgIGRlZmFjZVBpeGVsczogZGVmYWNlLFxuICAgICAgICB1bmlxdWVDb2xvcnM6IHBhbGV0dGVNYXAuc2l6ZSxcbiAgICAgICAgY29sb3JQYWxldHRlOiBwYWxldHRlT2JqXG4gICAgICB9O1xuXG4gICAgfSBjYXRjaCAoX2Vycikge1xuICAgICAgLy8gRmFsbGJhY2sgc2kgT2Zmc2NyZWVuQ2FudmFzIG5vIGVzdFx1MDBFMSBkaXNwb25pYmxlXG4gICAgICB0aGlzLnJlcXVpcmVkUGl4ZWxDb3VudCA9IE1hdGgubWF4KDAsIHRoaXMudG90YWxQaXhlbHMpO1xuICAgICAgdGhpcy5kZWZhY2VQaXhlbENvdW50ID0gMDtcbiAgICAgIGxvZygnW0JMVUUgTUFSQkxFXSBGYWxsYmFjazogdXNhbmRvIHRvdGFsIGRlIHBcdTAwRUR4ZWxlcyBjb21vIHJlcXVlcmlkb3MnKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG90YWxQaXhlbHM6IHRoaXMudG90YWxQaXhlbHMsXG4gICAgICAgIHJlcXVpcmVkUGl4ZWxzOiB0aGlzLnRvdGFsUGl4ZWxzLFxuICAgICAgICBkZWZhY2VQaXhlbHM6IDAsXG4gICAgICAgIHVuaXF1ZUNvbG9yczogMCxcbiAgICAgICAgY29sb3JQYWxldHRlOiB7fVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYSB0aWxlcyBkZSB0ZW1wbGF0ZSAocHJvY2VzbyBwcmluY2lwYWwgZGUgQmx1ZSBNYXJibGUpXG4gICAqL1xuICBhc3luYyBjcmVhdGVUZW1wbGF0ZVRpbGVzKCkge1xuICAgIGlmICghdGhpcy5iaXRtYXApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2VuIG5vIGNhcmdhZGEuIExsYW1hIGEgbG9hZCgpIHByaW1lcm8uJyk7XG4gICAgfVxuXG4gICAgbG9nKCdbQkxVRSBNQVJCTEVdIENyZWFuZG8gdGlsZXMgZGUgdGVtcGxhdGUuLi4nKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlVGlsZXMgPSB7fTtcbiAgICBjb25zdCB0ZW1wbGF0ZVRpbGVzQnVmZmVycyA9IHt9O1xuICAgIFxuICAgIGNvbnN0IGNhbnZhcyA9IG5ldyBPZmZzY3JlZW5DYW52YXModGhpcy50aWxlU2l6ZSwgdGhpcy50aWxlU2l6ZSk7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHsgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlIH0pO1xuXG4gICAgLy8gUGFyYSBjYWRhIHRpbGUgWS4uLlxuICAgIGZvciAobGV0IHBpeGVsWSA9IHRoaXMuY29vcmRzWzNdOyBwaXhlbFkgPCB0aGlzLmltYWdlSGVpZ2h0ICsgdGhpcy5jb29yZHNbM107ICkge1xuICAgICAgXG4gICAgICAvLyBDYWxjdWxhciB0YW1hXHUwMEYxbyBkZSBkaWJ1am8gWVxuICAgICAgY29uc3QgZHJhd1NpemVZID0gTWF0aC5taW4oXG4gICAgICAgIHRoaXMudGlsZVNpemUgLSAocGl4ZWxZICUgdGhpcy50aWxlU2l6ZSksIFxuICAgICAgICB0aGlzLmltYWdlSGVpZ2h0IC0gKHBpeGVsWSAtIHRoaXMuY29vcmRzWzNdKVxuICAgICAgKTtcblxuICAgICAgLy8gUGFyYSBjYWRhIHRpbGUgWC4uLlxuICAgICAgZm9yIChsZXQgcGl4ZWxYID0gdGhpcy5jb29yZHNbMl07IHBpeGVsWCA8IHRoaXMuaW1hZ2VXaWR0aCArIHRoaXMuY29vcmRzWzJdOyApIHtcbiAgICAgICAgXG4gICAgICAgIC8vIENhbGN1bGFyIHRhbWFcdTAwRjFvIGRlIGRpYnVqbyBYXG4gICAgICAgIGNvbnN0IGRyYXdTaXplWCA9IE1hdGgubWluKFxuICAgICAgICAgIHRoaXMudGlsZVNpemUgLSAocGl4ZWxYICUgdGhpcy50aWxlU2l6ZSksIFxuICAgICAgICAgIHRoaXMuaW1hZ2VXaWR0aCAtIChwaXhlbFggLSB0aGlzLmNvb3Jkc1syXSlcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDYW1iaWFyIHRhbWFcdTAwRjFvIGRlbCBjYW52YXMgeSBsaW1waWFyXG4gICAgICAgIGNvbnN0IGNhbnZhc1dpZHRoID0gZHJhd1NpemVYICogdGhpcy5zaHJlYWRTaXplO1xuICAgICAgICBjb25zdCBjYW52YXNIZWlnaHQgPSBkcmF3U2l6ZVkgKiB0aGlzLnNocmVhZFNpemU7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhc1dpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xuXG4gICAgICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7IC8vIE5lYXJlc3QgbmVpZ2hib3JcblxuICAgICAgICAvLyBEaWJ1amFyIHNlZ21lbnRvIGRlIHRlbXBsYXRlIGVuIGVzdGUgc2VnbWVudG8gZGUgdGlsZVxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgdGhpcy5iaXRtYXAsIC8vIEJpdG1hcCBkZSBpbWFnZW4gYSBkaWJ1amFyXG4gICAgICAgICAgcGl4ZWxYIC0gdGhpcy5jb29yZHNbMl0sIC8vIENvb3JkZW5hZGEgWCBkZXNkZSBkb25kZSBkaWJ1amFyXG4gICAgICAgICAgcGl4ZWxZIC0gdGhpcy5jb29yZHNbM10sIC8vIENvb3JkZW5hZGEgWSBkZXNkZSBkb25kZSBkaWJ1amFyXG4gICAgICAgICAgZHJhd1NpemVYLCAvLyBBbmNobyBYIGEgZGlidWphciBkZXNkZVxuICAgICAgICAgIGRyYXdTaXplWSwgLy8gQWx0byBZIGEgZGlidWphciBkZXNkZVxuICAgICAgICAgIDAsIC8vIENvb3JkZW5hZGEgWCBkb25kZSBkaWJ1amFyXG4gICAgICAgICAgMCwgLy8gQ29vcmRlbmFkYSBZIGRvbmRlIGRpYnVqYXJcbiAgICAgICAgICBkcmF3U2l6ZVggKiB0aGlzLnNocmVhZFNpemUsIC8vIEFuY2hvIFggZG9uZGUgZGlidWphclxuICAgICAgICAgIGRyYXdTaXplWSAqIHRoaXMuc2hyZWFkU2l6ZSAvLyBBbHRvIFkgZG9uZGUgZGlidWphclxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpO1xuXG4gICAgICAgIC8vIFByb2Nlc2FyIHBcdTAwRUR4ZWxlcyAoY29tbyBCbHVlIE1hcmJsZSlcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjYW52YXNIZWlnaHQ7IHkrKykge1xuICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgY2FudmFzV2lkdGg7IHgrKykge1xuICAgICAgICAgICAgY29uc3QgcGl4ZWxJbmRleCA9ICh5ICogY2FudmFzV2lkdGggKyB4KSAqIDQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNpIGVsIHBcdTAwRUR4ZWwgZXMgI2RlZmFjZSwgZGlidWphciBwYXRyXHUwMEYzbiBkZSB0YWJsZXJvIGRlIGFqZWRyZXogdHJhbnNsXHUwMEZBY2lkb1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtwaXhlbEluZGV4XSA9PT0gMjIyICYmXG4gICAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsSW5kZXggKyAxXSA9PT0gMjUwICYmXG4gICAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsSW5kZXggKyAyXSA9PT0gMjA2XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgaWYgKCh4ICsgeSkgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxJbmRleF0gPSAwO1xuICAgICAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsSW5kZXggKyAxXSA9IDA7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxJbmRleCArIDJdID0gMDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtwaXhlbEluZGV4XSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtwaXhlbEluZGV4ICsgMV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxJbmRleCArIDJdID0gMjU1O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsSW5kZXggKyAzXSA9IDMyOyAvLyBIYWNlcmxvIHRyYW5zbFx1MDBGQWNpZG9cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeCAlIHRoaXMuc2hyZWFkU2l6ZSAhPT0gMSB8fCB5ICUgdGhpcy5zaHJlYWRTaXplICE9PSAxKSB7XG4gICAgICAgICAgICAgIC8vIFNvbG8gZGlidWphciBlbCBwXHUwMEVEeGVsIGNlbnRyYWxcbiAgICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxJbmRleCArIDNdID0gMDsgLy8gSGFjZXIgcFx1MDBFRHhlbCB0cmFuc3BhcmVudGVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFBcdTAwRUR4ZWwgY2VudHJhbDogbWFudGVuZXIgc29sbyBzaSBlc3RcdTAwRTEgZW4gbGEgcGFsZXRhIHBlcm1pdGlkYSBkZWwgc2l0aW9cbiAgICAgICAgICAgICAgY29uc3QgciA9IGltYWdlRGF0YS5kYXRhW3BpeGVsSW5kZXhdO1xuICAgICAgICAgICAgICBjb25zdCBnID0gaW1hZ2VEYXRhLmRhdGFbcGl4ZWxJbmRleCArIDFdO1xuICAgICAgICAgICAgICBjb25zdCBiID0gaW1hZ2VEYXRhLmRhdGFbcGl4ZWxJbmRleCArIDJdO1xuICAgICAgICAgICAgICBpZiAoIXRoaXMuYWxsb3dlZENvbG9yc1NldC5oYXMoYCR7cn0sJHtnfSwke2J9YCkpIHtcbiAgICAgICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtwaXhlbEluZGV4ICsgM10gPSAwOyAvLyBvY3VsdGFyIGNvbG9yZXMgbm8tcGFsZXRhXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuXG4gICAgICAgIC8vIENyZWFyIG5vbWJyZSBkZSB0aWxlIHRlbXBsYXRlIFwiMDAwMCwwMDAwLDAwMCwwMDBcIlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZVRpbGVOYW1lID0gYCR7KHRoaXMuY29vcmRzWzBdICsgTWF0aC5mbG9vcihwaXhlbFggLyAxMDAwKSlcbiAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIC5wYWRTdGFydCg0LCAnMCcpfSwkeyh0aGlzLmNvb3Jkc1sxXSArIE1hdGguZmxvb3IocGl4ZWxZIC8gMTAwMCkpXG4gICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAucGFkU3RhcnQoNCwgJzAnKX0sJHsocGl4ZWxYICUgMTAwMClcbiAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIC5wYWRTdGFydCgzLCAnMCcpfSwkeyhwaXhlbFkgJSAxMDAwKS50b1N0cmluZygpLnBhZFN0YXJ0KDMsICcwJyl9YDtcblxuICAgICAgICB0ZW1wbGF0ZVRpbGVzW3RlbXBsYXRlVGlsZU5hbWVdID0gYXdhaXQgY3JlYXRlSW1hZ2VCaXRtYXAoY2FudmFzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJlZ2lzdHJhciBwcmVmaWpvIGRlIHRpbGUgcGFyYSBiXHUwMEZBc3F1ZWRhIHJcdTAwRTFwaWRhXG4gICAgICAgIHRoaXMudGlsZVByZWZpeGVzLmFkZCh0ZW1wbGF0ZVRpbGVOYW1lLnNwbGl0KCcsJykuc2xpY2UoMCwgMikuam9pbignLCcpKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFsbWFjZW5hciBidWZmZXIgcGFyYSBzZXJpYWxpemFjaVx1MDBGM25cbiAgICAgICAgY29uc3QgY2FudmFzQmxvYiA9IGF3YWl0IGNhbnZhcy5jb252ZXJ0VG9CbG9iKCk7XG4gICAgICAgIGNvbnN0IGNhbnZhc0J1ZmZlciA9IGF3YWl0IGNhbnZhc0Jsb2IuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgdGVtcGxhdGVUaWxlc0J1ZmZlcnNbdGVtcGxhdGVUaWxlTmFtZV0gPSBjYW52YXNCdWZmZXI7XG5cbiAgICAgICAgcGl4ZWxYICs9IGRyYXdTaXplWDtcbiAgICAgIH1cblxuICAgICAgcGl4ZWxZICs9IGRyYXdTaXplWTtcbiAgICB9XG5cbiAgICB0aGlzLnRlbXBsYXRlVGlsZXMgPSB0ZW1wbGF0ZVRpbGVzO1xuICAgIHRoaXMudGVtcGxhdGVUaWxlc0J1ZmZlcnMgPSB0ZW1wbGF0ZVRpbGVzQnVmZmVycztcblxuICAgIGxvZyhgW0JMVUUgTUFSQkxFXSBUaWxlcyBjcmVhZG9zOiAke09iamVjdC5rZXlzKHRlbXBsYXRlVGlsZXMpLmxlbmd0aH0gdGlsZXNgKTtcbiAgICBsb2coYFtCTFVFIE1BUkJMRV0gUHJlZmlqb3MgcmVnaXN0cmFkb3M6ICR7dGhpcy50aWxlUHJlZml4ZXMuc2l6ZX0gdGlsZXMgXHUwMEZBbmljb3NgKTtcblxuICAgIHJldHVybiB7IHRlbXBsYXRlVGlsZXMsIHRlbXBsYXRlVGlsZXNCdWZmZXJzIH07XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhIGNvbGEgZGUgcFx1MDBFRHhlbGVzIHBhcmEgcGludGFyIChjb21wYXRpYmxlIGNvbiBBdXRvLUltYWdlKVxuICAgKi9cbiAgZ2VuZXJhdGVQaXhlbFF1ZXVlKCkge1xuICAgIGlmICghdGhpcy5iaXRtYXApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2VuIG5vIGNhcmdhZGEuIExsYW1hIGEgbG9hZCgpIHByaW1lcm8uJyk7XG4gICAgfVxuXG4gICAgbG9nKCdbQkxVRSBNQVJCTEVdIEdlbmVyYW5kbyBjb2xhIGRlIHBcdTAwRUR4ZWxlcy4uLicpO1xuXG4gICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICBjb25zdCBiYXNlWCA9IHRoaXMuY29vcmRzWzBdICogMTAwMCArICh0aGlzLmNvb3Jkc1syXSB8fCAwKTsgLy8gQ29vcmRlbmFkYSBnbG9iYWwgYmFzZSBYXG4gICAgY29uc3QgYmFzZVkgPSB0aGlzLmNvb3Jkc1sxXSAqIDEwMDAgKyAodGhpcy5jb29yZHNbM10gfHwgMCk7IC8vIENvb3JkZW5hZGEgZ2xvYmFsIGJhc2UgWVxuXG4gICAgLy8gVXNhciBjYW52YXMgMToxIHBhcmEgbGVlciBwXHUwMEVEeGVsZXMgZXhhY3Rvc1xuICAgIGNvbnN0IHJlYWRDYW52YXMgPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHRoaXMuaW1hZ2VXaWR0aCwgdGhpcy5pbWFnZUhlaWdodCk7XG4gICAgY29uc3QgcmVhZEN0eCA9IHJlYWRDYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7IHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZSB9KTtcbiAgICByZWFkQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIHJlYWRDdHguZHJhd0ltYWdlKHRoaXMuYml0bWFwLCAwLCAwKTtcbiAgICBjb25zdCBwaXhlbERhdGEgPSByZWFkQ3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmltYWdlV2lkdGgsIHRoaXMuaW1hZ2VIZWlnaHQpLmRhdGE7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaW1hZ2VIZWlnaHQ7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmltYWdlV2lkdGg7IHgrKykge1xuICAgICAgICBjb25zdCBpZHggPSAoeSAqIHRoaXMuaW1hZ2VXaWR0aCArIHgpICogNDtcbiAgICAgICAgY29uc3QgciA9IHBpeGVsRGF0YVtpZHhdO1xuICAgICAgICBjb25zdCBnID0gcGl4ZWxEYXRhW2lkeCArIDFdO1xuICAgICAgICBjb25zdCBiID0gcGl4ZWxEYXRhW2lkeCArIDJdO1xuICAgICAgICBjb25zdCBhbHBoYSA9IHBpeGVsRGF0YVtpZHggKyAzXTtcblxuICAgICAgICAvLyBGaWx0cmFyIHBcdTAwRUR4ZWxlcyB0cmFuc3BhcmVudGVzXG4gICAgICAgIGlmIChhbHBoYSA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgLy8gRmlsdHJhciBwXHUwMEVEeGVsZXMgI2RlZmFjZSAoc2UgcmVuZGVyaXphbiBjb21vIHRyYW5zcGFyZW50ZXMpXG4gICAgICAgIGlmIChyID09PSAyMjIgJiYgZyA9PT0gMjUwICYmIGIgPT09IDIwNikgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgY29sb3JLZXkgPSBgJHtyfSwke2d9LCR7Yn1gO1xuICAgICAgICBcbiAgICAgICAgLy8gU29sbyBpbmNsdWlyIGNvbG9yZXMgZGUgbGEgcGFsZXRhIGRlbCBzaXRpb1xuICAgICAgICBpZiAoIXRoaXMuYWxsb3dlZENvbG9yc1NldC5oYXMoY29sb3JLZXkpKSBjb250aW51ZTtcblxuICAgICAgICAvLyBDYWxjdWxhciBjb29yZGVuYWRhcyBnbG9iYWxlc1xuICAgICAgICBjb25zdCBnbG9iYWxYID0gYmFzZVggKyB4O1xuICAgICAgICBjb25zdCBnbG9iYWxZID0gYmFzZVkgKyB5O1xuXG4gICAgICAgIC8vIENhbGN1bGFyIGNvb3JkZW5hZGFzIGRlIHRpbGVcbiAgICAgICAgY29uc3QgdGlsZVggPSBNYXRoLmZsb29yKGdsb2JhbFggLyAxMDAwKTtcbiAgICAgICAgY29uc3QgdGlsZVkgPSBNYXRoLmZsb29yKGdsb2JhbFkgLyAxMDAwKTtcbiAgICAgICAgY29uc3QgbG9jYWxYID0gZ2xvYmFsWCAlIDEwMDA7XG4gICAgICAgIGNvbnN0IGxvY2FsWSA9IGdsb2JhbFkgJSAxMDAwO1xuXG4gICAgICAgIC8vIE9idGVuZXIgbWV0YWRhdG9zIGRlbCBjb2xvclxuICAgICAgICBjb25zdCBjb2xvck1ldGEgPSB0aGlzLnJnYlRvTWV0YS5nZXQoY29sb3JLZXkpIHx8IHsgaWQ6IDAsIG5hbWU6ICdVbmtub3duJyB9O1xuXG4gICAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICAgIC8vIENvb3JkZW5hZGFzIGRlIGltYWdlbiAocmVsYXRpdmFzKVxuICAgICAgICAgIGltYWdlWDogeCxcbiAgICAgICAgICBpbWFnZVk6IHksXG4gICAgICAgICAgLy8gQ29vcmRlbmFkYXMgZ2xvYmFsZXNcbiAgICAgICAgICBnbG9iYWxYOiBnbG9iYWxYLFxuICAgICAgICAgIGdsb2JhbFk6IGdsb2JhbFksXG4gICAgICAgICAgLy8gQ29vcmRlbmFkYXMgZGUgdGlsZS9sb2NhbFxuICAgICAgICAgIHRpbGVYOiB0aWxlWCxcbiAgICAgICAgICB0aWxlWTogdGlsZVksXG4gICAgICAgICAgbG9jYWxYOiBsb2NhbFgsXG4gICAgICAgICAgbG9jYWxZOiBsb2NhbFksXG4gICAgICAgICAgLy8gSW5mb3JtYWNpXHUwMEYzbiBkZSBjb2xvclxuICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICByOiByLFxuICAgICAgICAgICAgZzogZyxcbiAgICAgICAgICAgIGI6IGIsXG4gICAgICAgICAgICBpZDogY29sb3JNZXRhLmlkLFxuICAgICAgICAgICAgbmFtZTogY29sb3JNZXRhLm5hbWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yaWdpbmFsQ29sb3I6IHsgciwgZywgYiwgYWxwaGEgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsb2coYFtCTFVFIE1BUkJMRV0gQ29sYSBnZW5lcmFkYTogJHtxdWV1ZS5sZW5ndGh9IHBcdTAwRUR4ZWxlcyB2XHUwMEUxbGlkb3NgKTtcbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICAvKipcbiAgICogUmVkaW1lbnNpb25hIGxhIGltYWdlbiAocHJlc2VydmEgcHJvcG9yY2lvbmVzIHBvciBkZWZlY3RvKVxuICAgKi9cbiAgYXN5bmMgcmVzaXplKG5ld1dpZHRoLCBuZXdIZWlnaHQsIGtlZXBBc3BlY3RSYXRpbyA9IHRydWUpIHtcbiAgICBpZiAoIXRoaXMuaW1nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlbiBubyBjYXJnYWRhLiBMbGFtYSBhIGxvYWQoKSBwcmltZXJvLicpO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsV2lkdGggPSB0aGlzLmltZy53aWR0aDtcbiAgICBjb25zdCBvcmlnaW5hbEhlaWdodCA9IHRoaXMuaW1nLmhlaWdodDtcblxuICAgIGlmIChrZWVwQXNwZWN0UmF0aW8pIHtcbiAgICAgIGNvbnN0IGFzcGVjdFJhdGlvID0gb3JpZ2luYWxXaWR0aCAvIG9yaWdpbmFsSGVpZ2h0O1xuICAgICAgaWYgKG5ld1dpZHRoIC8gbmV3SGVpZ2h0ID4gYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgbmV3V2lkdGggPSBuZXdIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0hlaWdodCA9IG5ld1dpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXIgbnVldmEgaW1hZ2VuIHJlZGltZW5zaW9uYWRhXG4gICAgY29uc3QgdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRlbXBDYW52YXMud2lkdGggPSBuZXdXaWR0aDtcbiAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICBjb25zdCB0ZW1wQ3R4ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRlbXBDdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7IC8vIFBpeGVsIGFydFxuICAgIHRlbXBDdHguZHJhd0ltYWdlKHRoaXMuaW1nLCAwLCAwLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcblxuICAgIC8vIEFjdHVhbGl6YXIgaW1hZ2VuIHkgYml0bWFwXG4gICAgY29uc3QgbmV3RGF0YVVybCA9IHRlbXBDYW52YXMudG9EYXRhVVJMKCk7XG4gICAgdGhpcy5pbWcuc3JjID0gbmV3RGF0YVVybDtcbiAgICB0aGlzLmltYWdlU3JjID0gbmV3RGF0YVVybDtcblxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5pbWcub25sb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLmJpdG1hcCA9IGF3YWl0IGNyZWF0ZUltYWdlQml0bWFwKHRoaXMuaW1nKTtcbiAgICAgICAgdGhpcy5pbWFnZVdpZHRoID0gdGhpcy5iaXRtYXAud2lkdGg7XG4gICAgICAgIHRoaXMuaW1hZ2VIZWlnaHQgPSB0aGlzLmJpdG1hcC5oZWlnaHQ7XG4gICAgICAgIHRoaXMudG90YWxQaXhlbHMgPSB0aGlzLmltYWdlV2lkdGggKiB0aGlzLmltYWdlSGVpZ2h0O1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgbG9nKGBbQkxVRSBNQVJCTEVdIEltYWdlbiByZWRpbWVuc2lvbmFkYTogJHtvcmlnaW5hbFdpZHRofVx1MDBENyR7b3JpZ2luYWxIZWlnaHR9IFx1MjE5MiAke3RoaXMuaW1hZ2VXaWR0aH1cdTAwRDcke3RoaXMuaW1hZ2VIZWlnaHR9YCk7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiB0aGlzLmltYWdlV2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaW1hZ2VIZWlnaHRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE9idGllbmUgaW5mb3JtYWNpXHUwMEYzbiBjb21wbGV0YSBkZSBsYSBpbWFnZW4gcHJvY2VzYWRhXG4gICAqL1xuICBnZXRJbWFnZURhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiB0aGlzLmltYWdlV2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaW1hZ2VIZWlnaHQsXG4gICAgICB0b3RhbFBpeGVsczogdGhpcy50b3RhbFBpeGVscyxcbiAgICAgIHJlcXVpcmVkUGl4ZWxzOiB0aGlzLnJlcXVpcmVkUGl4ZWxDb3VudCxcbiAgICAgIGRlZmFjZVBpeGVsczogdGhpcy5kZWZhY2VQaXhlbENvdW50LFxuICAgICAgY29sb3JQYWxldHRlOiB0aGlzLmNvbG9yUGFsZXR0ZSxcbiAgICAgIGNvb3JkczogWy4uLnRoaXMuY29vcmRzXSxcbiAgICAgIG9yaWdpbmFsTmFtZTogdGhpcy5vcmlnaW5hbE5hbWUgfHwgJ2ltYWdlLnBuZycsXG4gICAgICAvLyBQYXJhIGNvbXBhdGliaWxpZGFkIGNvbiBBdXRvLUltYWdlIGFjdHVhbFxuICAgICAgcGl4ZWxzOiB0aGlzLmdlbmVyYXRlUGl4ZWxRdWV1ZSgpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmEgcHJldmlldyBkZSBsYSBpbWFnZW5cbiAgICovXG4gIGdlbmVyYXRlUHJldmlldyhtYXhXaWR0aCA9IDIwMCwgbWF4SGVpZ2h0ID0gMjAwKSB7XG4gICAgaWYgKCF0aGlzLmltZykgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGNvbnN0IHsgd2lkdGg6IG9yaWdXaWR0aCwgaGVpZ2h0OiBvcmlnSGVpZ2h0IH0gPSB0aGlzLmltZztcbiAgICBjb25zdCBhc3BlY3RSYXRpbyA9IG9yaWdXaWR0aCAvIG9yaWdIZWlnaHQ7XG5cbiAgICBsZXQgbmV3V2lkdGgsIG5ld0hlaWdodDtcbiAgICBpZiAobWF4V2lkdGggLyBtYXhIZWlnaHQgPiBhc3BlY3RSYXRpbykge1xuICAgICAgbmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgbmV3V2lkdGggPSBtYXhIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3V2lkdGggPSBtYXhXaWR0aDtcbiAgICAgIG5ld0hlaWdodCA9IG1heFdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgfVxuXG4gICAgY2FudmFzLndpZHRoID0gbmV3V2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgMCwgMCwgbmV3V2lkdGgsIG5ld0hlaWdodCk7XG5cbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgpO1xuICB9XG5cbiAgZ2V0RGltZW5zaW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMuaW1hZ2VXaWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5pbWFnZUhlaWdodFxuICAgIH07XG4gIH1cbn1cblxuLy8gTWFudGVuZXIgZXhwb3J0cyBkZSBmdW5jaW9uZXMgcGFyYSBjb21wYXRpYmlsaWRhZFxuZXhwb3J0IHsgZGV0ZWN0QXZhaWxhYmxlQ29sb3JzIH0gZnJvbSBcIi4vcHJvY2Vzc29yLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2xvc2VzdENvbG9yKHJnYiwgcGFsZXR0ZSkge1xuICBpZiAoIXBhbGV0dGUgfHwgcGFsZXR0ZS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICBcbiAgbGV0IGNsb3Nlc3RDb2xvciA9IG51bGw7XG4gIGxldCBtaW5EaXN0YW5jZSA9IEluZmluaXR5O1xuICBcbiAgZm9yIChjb25zdCBjb2xvciBvZiBwYWxldHRlKSB7XG4gICAgY29uc3QgY29sb3JSZ2IgPSBjb2xvci5yZ2IgfHwgY29sb3I7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoXG4gICAgICBNYXRoLnBvdyhyZ2IuciAtIGNvbG9yUmdiLnIsIDIpICtcbiAgICAgIE1hdGgucG93KHJnYi5nIC0gY29sb3JSZ2IuZywgMikgK1xuICAgICAgTWF0aC5wb3cocmdiLmIgLSBjb2xvclJnYi5iLCAyKVxuICAgICk7XG4gICAgXG4gICAgaWYgKGRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcbiAgICAgIG1pbkRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICBjbG9zZXN0Q29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBjbG9zZXN0Q29sb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBpeGVsUXVldWUoaW1hZ2VEYXRhLCBzdGFydFBvc2l0aW9uLCB0aWxlWCwgdGlsZVkpIHtcbiAgLy8gRXN0YSBmdW5jaVx1MDBGM24gYWhvcmEgZXMgbWFuZWphZGEgcG9yIEJsdWVNYXJibGVsSW1hZ2VQcm9jZXNzb3IuZ2VuZXJhdGVQaXhlbFF1ZXVlKClcbiAgLy8gTWFudGVuaWRhIHBhcmEgY29tcGF0aWJpbGlkYWRcbiAgY29uc3QgeyBwaXhlbHMgfSA9IGltYWdlRGF0YTtcbiAgY29uc3QgeyB4OiBsb2NhbFN0YXJ0WCwgeTogbG9jYWxTdGFydFkgfSA9IHN0YXJ0UG9zaXRpb247XG4gIGNvbnN0IHF1ZXVlID0gW107XG5cbiAgZm9yIChjb25zdCBwaXhlbERhdGEgb2YgcGl4ZWxzKSB7XG4gICAgaWYgKCFwaXhlbERhdGEpIGNvbnRpbnVlO1xuICAgIFxuICAgIGNvbnN0IGdsb2JhbFggPSBsb2NhbFN0YXJ0WCArIHBpeGVsRGF0YS5pbWFnZVg7XG4gICAgY29uc3QgZ2xvYmFsWSA9IGxvY2FsU3RhcnRZICsgcGl4ZWxEYXRhLmltYWdlWTtcbiAgICBcbiAgICBxdWV1ZS5wdXNoKHtcbiAgICAgIGltYWdlWDogcGl4ZWxEYXRhLmltYWdlWCxcbiAgICAgIGltYWdlWTogcGl4ZWxEYXRhLmltYWdlWSxcbiAgICAgIGxvY2FsWDogZ2xvYmFsWCxcbiAgICAgIGxvY2FsWTogZ2xvYmFsWSxcbiAgICAgIHRpbGVYOiB0aWxlWCxcbiAgICAgIHRpbGVZOiB0aWxlWSxcbiAgICAgIGNvbG9yOiBwaXhlbERhdGEuY29sb3IsXG4gICAgICBvcmlnaW5hbENvbG9yOiBwaXhlbERhdGEub3JpZ2luYWxDb2xvclxuICAgIH0pO1xuICB9XG5cbiAgbG9nKGBDb2xhIGRlIHBcdTAwRUR4ZWxlcyBnZW5lcmFkYSAoY29tcGF0aWJpbGlkYWQpOiAke3F1ZXVlLmxlbmd0aH0gcFx1MDBFRHhlbGVzYCk7XG4gIHJldHVybiBxdWV1ZTtcbn1cbiIsICJleHBvcnQgY29uc3Qgc2xlZXAgPSAobXMpID0+IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCBtcykpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmV0cnkoZm4sIHsgdHJpZXMgPSAzLCBiYXNlID0gNTAwIH0gPSB7fSkge1xuICBsZXQgbGFzdDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmllczsgaSsrKSB7XG4gICAgdHJ5IHsgcmV0dXJuIGF3YWl0IGZuKCk7IH1cbiAgICBjYXRjaCAoZSkgeyBsYXN0ID0gZTsgYXdhaXQgc2xlZXAoYmFzZSAqIDIgKiogaSk7IH1cbiAgfVxuICB0aHJvdyBsYXN0O1xufVxuXG5leHBvcnQgY29uc3QgcmFuZEludCA9IChuKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuKTtcblxuLy8gU2xlZXAgd2l0aCBjb3VudGRvd24gKGZyb20gZmFybSlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzbGVlcFdpdGhDb3VudGRvd24obXMsIG9uVXBkYXRlLCBzdGF0ZSkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjb25zdCBlbmRUaW1lID0gc3RhcnRUaW1lICsgbXM7XG4gIFxuICB3aGlsZSAoRGF0ZS5ub3coKSA8IGVuZFRpbWUgJiYgKCFzdGF0ZSB8fCBzdGF0ZS5ydW5uaW5nKSkge1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IGVuZFRpbWUgLSBEYXRlLm5vdygpO1xuICAgIFxuICAgIGlmIChvblVwZGF0ZSkge1xuICAgICAgb25VcGRhdGUocmVtYWluaW5nKTtcbiAgICB9XG4gICAgXG4gICAgYXdhaXQgc2xlZXAoTWF0aC5taW4oMTAwMCwgcmVtYWluaW5nKSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBmZXRjaFdpdGhUaW1lb3V0IH0gZnJvbSBcIi4vaHR0cC5qc1wiO1xuXG5jb25zdCBCQVNFID0gXCJodHRwczovL2JhY2tlbmQud3BsYWNlLmxpdmVcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlc3Npb24oKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWUgPSBhd2FpdCBmZXRjaChgJHtCQVNFfS9tZWAsIHsgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyB9KS50aGVuKHIgPT4gci5qc29uKCkpO1xuICAgIGNvbnN0IHVzZXIgPSBtZSB8fCBudWxsO1xuICAgIGNvbnN0IGMgPSBtZT8uY2hhcmdlcyB8fCB7fTtcbiAgICBjb25zdCBjaGFyZ2VzID0ge1xuICAgICAgY291bnQ6IGMuY291bnQgPz8gMCwgICAgICAgIC8vIE1hbnRlbmVyIHZhbG9yIGRlY2ltYWwgb3JpZ2luYWxcbiAgICAgIG1heDogYy5tYXggPz8gMCwgICAgICAgICAgICAvLyBNYW50ZW5lciB2YWxvciBvcmlnaW5hbCAocHVlZGUgdmFyaWFyIHBvciB1c3VhcmlvKVxuICAgICAgY29vbGRvd25NczogYy5jb29sZG93bk1zID8/IDMwMDAwXG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4geyBcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXIsIFxuICAgICAgICBjaGFyZ2VzOiBjaGFyZ2VzLmNvdW50LFxuICAgICAgICBtYXhDaGFyZ2VzOiBjaGFyZ2VzLm1heCxcbiAgICAgICAgY2hhcmdlUmVnZW46IGNoYXJnZXMuY29vbGRvd25Nc1xuICAgICAgfVxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IFxuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcjogbnVsbCwgXG4gICAgICAgIGNoYXJnZXM6IDAsXG4gICAgICAgIG1heENoYXJnZXM6IDAsXG4gICAgICAgIGNoYXJnZVJlZ2VuOiAzMDAwMFxuICAgICAgfVxuICAgIH07IFxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0hlYWx0aCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L2hlYWx0aGAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBoZWFsdGggPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5oZWFsdGgsXG4gICAgICAgIGxhc3RDaGVjazogRGF0ZS5ub3coKSxcbiAgICAgICAgc3RhdHVzOiAnb25saW5lJ1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YWJhc2U6IGZhbHNlLFxuICAgICAgICB1cDogZmFsc2UsXG4gICAgICAgIHVwdGltZTogJ04vQScsXG4gICAgICAgIGxhc3RDaGVjazogRGF0ZS5ub3coKSxcbiAgICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNcbiAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhYmFzZTogZmFsc2UsXG4gICAgICB1cDogZmFsc2UsXG4gICAgICB1cHRpbWU6ICdOL0EnLFxuICAgICAgbGFzdENoZWNrOiBEYXRlLm5vdygpLFxuICAgICAgc3RhdHVzOiAnb2ZmbGluZScsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZVxuICAgIH07XG4gIH1cbn1cblxuLy8gVW5pZmljYSBwb3N0IGRlIHBcdTAwRUR4ZWwgcG9yIGxvdGVzIChiYXRjaCBwb3IgdGlsZSkuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9zdFBpeGVsQmF0Y2goeyB0aWxlWCwgdGlsZVksIHBpeGVscywgdHVybnN0aWxlVG9rZW4gfSkge1xuICAvLyBwaXhlbHM6IFt7eCx5LGNvbG9yfSwgXHUyMDI2XSByZWxhdGl2b3MgYWwgdGlsZVxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBwaXhlbHMsIHRva2VuOiB0dXJuc3RpbGVUb2tlbiB9KTtcbiAgY29uc3QgciA9IGF3YWl0IGZldGNoV2l0aFRpbWVvdXQoYCR7QkFTRX0vczAvcGl4ZWwvJHt0aWxlWH0vJHt0aWxlWX1gLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIgfSxcbiAgICBib2R5LFxuICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIlxuICB9KTtcbiAgXG4gIC8vIEFsZ3VuYXMgcmVzcHVlc3RhcyBwdWVkZW4gbm8gdHJhZXIgSlNPTiBhdW5xdWUgc2VhbiAyMDAuXG4gIGlmIChyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgdHJ5IHsgcmV0dXJuIGF3YWl0IHIuanNvbigpOyB9IGNhdGNoIHsgcmV0dXJuIHsgb2s6IHRydWUgfTsgfVxuICB9XG4gIFxuICBsZXQgbXNnID0gYEhUVFAgJHtyLnN0YXR1c31gO1xuICB0cnkgeyBcbiAgICBjb25zdCBqID0gYXdhaXQgci5qc29uKCk7IFxuICAgIG1zZyA9IGo/Lm1lc3NhZ2UgfHwgbXNnOyBcbiAgfSBjYXRjaCB7XG4gICAgLy8gUmVzcG9uc2Ugbm90IEpTT05cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYHBhaW50IGZhaWxlZDogJHttc2d9YCk7XG59XG5cbi8vIFZlcnNpXHUwMEYzbiAnc2FmZScgcXVlIG5vIGFycm9qYSBleGNlcGNpb25lcyB5IHJldG9ybmEgc3RhdHVzL2pzb25cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0UGl4ZWxCYXRjaFNhZmUodGlsZVgsIHRpbGVZLCBwaXhlbHMsIHR1cm5zdGlsZVRva2VuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgcGl4ZWxzLCB0b2tlbjogdHVybnN0aWxlVG9rZW4gfSk7XG4gICAgY29uc3QgciA9IGF3YWl0IGZldGNoV2l0aFRpbWVvdXQoYCR7QkFTRX0vczAvcGl4ZWwvJHt0aWxlWH0vJHt0aWxlWX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiIH0sXG4gICAgICBib2R5LFxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiXG4gICAgfSk7XG4gIGxldCBqc29uID0ge307XG4gIC8vIElmIHJlc3BvbnNlIGlzIG5vdCBKU09OLCBpZ25vcmUgcGFyc2UgZXJyb3JcbiAgdHJ5IHsganNvbiA9IGF3YWl0IHIuanNvbigpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgICByZXR1cm4geyBzdGF0dXM6IHIuc3RhdHVzLCBqc29uLCBzdWNjZXNzOiByLm9rIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3RhdHVzOiAwLCBqc29uOiB7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHN1Y2Nlc3M6IGZhbHNlIH07XG4gIH1cbn1cblxuLy8gUG9zdCBwXHUwMEVEeGVsIHBhcmEgZmFybSAodmVyc2lcdTAwRjNuIGNvcnJlZ2lkYSBjb24gZm9ybWF0byBvcmlnaW5hbClcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0UGl4ZWwoY29vcmRzLCBjb2xvcnMsIHR1cm5zdGlsZVRva2VuLCB0aWxlWCwgdGlsZVkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBcbiAgICAgIGNvbG9yczogY29sb3JzLCBcbiAgICAgIGNvb3JkczogY29vcmRzLCBcbiAgICAgIHQ6IHR1cm5zdGlsZVRva2VuIFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgY29uc3QgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIDE1MDAwKTsgLy8gVGltZW91dCBkZSAxNSBzZWd1bmRvc1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnIH0sXG4gICAgICBib2R5OiBib2R5LFxuICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbFxuICAgIH0pO1xuXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIHJlc3BvbnNlRGF0YSA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXNwb25zZURhdGEgPSB7fTsgLy8gSWdub3JhciBlcnJvcmVzIGRlIEpTT04gcGFyc2VcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBqc29uOiByZXNwb25zZURhdGEsXG4gICAgICBzdWNjZXNzOiByZXNwb25zZS5va1xuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogMCxcbiAgICAgIGpzb246IHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgfVxufVxuXG4vLyBQb3N0IHBcdTAwRUR4ZWwgcGFyYSBBdXRvLUltYWdlIChmb3JtYXRvIG9yaWdpbmFsIGNvcnJlY3RvKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbEJhdGNoSW1hZ2UodGlsZVgsIHRpbGVZLCBjb29yZHMsIGNvbG9ycywgdHVybnN0aWxlVG9rZW4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBcbiAgICAgIGNvbG9yczogY29sb3JzLCBcbiAgICAgIGNvb3JkczogY29vcmRzLCBcbiAgICAgIHQ6IHR1cm5zdGlsZVRva2VuIFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFTRX0vczAvcGl4ZWwvJHt0aWxlWH0vJHt0aWxlWX1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JyB9LFxuICAgICAgYm9keTogYm9keVxuICAgIH0pO1xuXG4gICAgbGV0IHJlc3BvbnNlRGF0YSA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJlc3BvbnNlRGF0YSA9IHt9OyAvLyBJZ25vcmFyIGVycm9yZXMgZGUgSlNPTiBwYXJzZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGpzb246IHJlc3BvbnNlRGF0YSxcbiAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlLm9rLFxuICAgICAgcGFpbnRlZDogcmVzcG9uc2VEYXRhPy5wYWludGVkIHx8IDBcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IDAsXG4gICAgICBqc29uOiB7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIHBhaW50ZWQ6IDBcbiAgICB9O1xuICB9XG59XG4iLCAibGV0IGxvYWRlZCA9IGZhbHNlO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFR1cm5zdGlsZSgpIHtcbiAgaWYgKGxvYWRlZCB8fCB3aW5kb3cudHVybnN0aWxlKSByZXR1cm47XG4gIFxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzLnNyYyA9ICdodHRwczovL2NoYWxsZW5nZXMuY2xvdWRmbGFyZS5jb20vdHVybnN0aWxlL3YwL2FwaS5qcz9yZW5kZXI9ZXhwbGljaXQnO1xuICAgIHMuYXN5bmMgPSB0cnVlOyBcbiAgICBzLmRlZmVyID0gdHJ1ZTtcbiAgICBzLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfTtcbiAgICBzLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCdObyBzZSBwdWRvIGNhcmdhciBUdXJuc3RpbGUnKSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlVHVybnN0aWxlKHNpdGVLZXksIGFjdGlvbiA9IFwicGFpbnRcIikge1xuICBhd2FpdCBsb2FkVHVybnN0aWxlKCk7XG4gIFxuICBpZiAodHlwZW9mIHdpbmRvdy50dXJuc3RpbGU/LmV4ZWN1dGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB3aW5kb3cudHVybnN0aWxlLmV4ZWN1dGUoc2l0ZUtleSwgeyBhY3Rpb24gfSk7XG4gICAgICBpZiAodG9rZW4gJiYgdG9rZW4ubGVuZ3RoID4gMjApIHJldHVybiB0b2tlbjtcbiAgICB9IGNhdGNoIHsgXG4gICAgICAvKiBmYWxsYmFjayBhYmFqbyAqLyBcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEZhbGxiYWNrOiByZW5kZXIgb2N1bHRvXG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGhvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBob3N0LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJzsgXG4gICAgaG9zdC5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaG9zdCk7XG4gICAgd2luZG93LnR1cm5zdGlsZS5yZW5kZXIoaG9zdCwgeyBcbiAgICAgIHNpdGVrZXk6IHNpdGVLZXksIFxuICAgICAgY2FsbGJhY2s6ICh0KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaG9zdCk7XG4gICAgICAgIHJlc29sdmUodCk7XG4gICAgICB9IFxuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gVmVyc2lcdTAwRjNuIG9yaWdpbmFsIHBhcmEgY29tcGF0aWJpbGlkYWRcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUdXJuc3RpbGVUb2tlbihzaXRlS2V5KSB7XG4gIHJldHVybiBleGVjdXRlVHVybnN0aWxlKHNpdGVLZXksICdwYWludCcpO1xufVxuXG4vLyBEZXRlY3RhIGRpblx1MDBFMW1pY2FtZW50ZSBsYSBzaXRla2V5IGRlIFR1cm5zdGlsZSBkZWwgRE9NIG8gZGVsIGNvbnRleHRvIGdsb2JhbC5cbi8vIFByaW9yaWRhZDogW2RhdGEtc2l0ZWtleV0gPiAuY2YtdHVybnN0aWxlW2RhdGEtc2l0ZWtleV0gPiB3aW5kb3cuX19UVVJOU1RJTEVfU0lURUtFWSA+IGZhbGxiYWNrXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0U2l0ZUtleShmYWxsYmFjayA9ICcnKSB7XG4gIHRyeSB7XG4gICAgLy8gMSkgRWxlbWVudG8gY29uIGF0cmlidXRvIGRhdGEtc2l0ZWtleSAoY29tXHUwMEZBbiBlbiBpbnRlZ3JhY2lvbmVzIGV4cGxcdTAwRURjaXRhcylcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNpdGVrZXldJyk7XG4gICAgaWYgKGVsKSB7XG4gICAgICBjb25zdCBrZXkgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l0ZWtleScpO1xuICAgICAgaWYgKGtleSAmJiBrZXkubGVuZ3RoID4gMTApIHJldHVybiBrZXk7XG4gICAgfVxuICAgIC8vIDIpIFdpZGdldCBUdXJuc3RpbGUgaW5zZXJ0YWRvICguY2YtdHVybnN0aWxlKVxuICAgIGNvbnN0IGNmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNmLXR1cm5zdGlsZScpO1xuICAgIGlmIChjZiAmJiBjZi5kYXRhc2V0Py5zaXRla2V5ICYmIGNmLmRhdGFzZXQuc2l0ZWtleS5sZW5ndGggPiAxMCkge1xuICAgICAgcmV0dXJuIGNmLmRhdGFzZXQuc2l0ZWtleTtcbiAgICB9XG4gICAgLy8gMykgVmFyaWFibGUgZ2xvYmFsIG9wY2lvbmFsXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5fX1RVUk5TVElMRV9TSVRFS0VZICYmIHdpbmRvdy5fX1RVUk5TVElMRV9TSVRFS0VZLmxlbmd0aCA+IDEwKSB7XG4gICAgICByZXR1cm4gd2luZG93Ll9fVFVSTlNUSUxFX1NJVEVLRVk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxuICByZXR1cm4gZmFsbGJhY2s7XG59XG4iLCAiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2VyLmpzXCI7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gXCIuLi9jb3JlL3RpbWluZy5qc1wiO1xuaW1wb3J0IHsgcG9zdFBpeGVsQmF0Y2hJbWFnZSB9IGZyb20gXCIuLi9jb3JlL3dwbGFjZS1hcGkuanNcIjtcbmltcG9ydCB7IGdldFR1cm5zdGlsZVRva2VuLCBkZXRlY3RTaXRlS2V5IH0gZnJvbSBcIi4uL2NvcmUvdHVybnN0aWxlLmpzXCI7XG5pbXBvcnQgeyBpbWFnZVN0YXRlLCBJTUFHRV9ERUZBVUxUUyB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IHsgdCB9IGZyb20gXCIuLi9sb2NhbGVzL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzSW1hZ2UoaW1hZ2VEYXRhLCBzdGFydFBvc2l0aW9uLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlLCBvbkVycm9yKSB7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gaW1hZ2VEYXRhO1xuICBjb25zdCB7IHg6IGxvY2FsU3RhcnRYLCB5OiBsb2NhbFN0YXJ0WSB9ID0gc3RhcnRQb3NpdGlvbjtcbiAgXG4gIGxvZyhgSW5pY2lhbmRvIHBpbnRhZG86IGltYWdlbigke3dpZHRofXgke2hlaWdodH0pIGluaWNpbyBMT0NBTCgke2xvY2FsU3RhcnRYfSwke2xvY2FsU3RhcnRZfSkgdGlsZSgke2ltYWdlU3RhdGUudGlsZVh9LCR7aW1hZ2VTdGF0ZS50aWxlWX0pYCk7XG4gIFxuICAvLyBHZW5lcmFyIGNvbGEgZGUgcFx1MDBFRHhlbGVzIHNpIG5vIGV4aXN0ZVxuICBpZiAoIWltYWdlU3RhdGUucmVtYWluaW5nUGl4ZWxzIHx8IGltYWdlU3RhdGUucmVtYWluaW5nUGl4ZWxzLmxlbmd0aCA9PT0gMCB8fCAoaW1hZ2VTdGF0ZS5sYXN0UG9zaXRpb24ueCA9PT0gMCAmJiBpbWFnZVN0YXRlLmxhc3RQb3NpdGlvbi55ID09PSAwKSkge1xuICAgIGxvZygnR2VuZXJhbmRvIGNvbGEgZGUgcFx1MDBFRHhlbGVzLi4uJyk7XG4gICAgaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMgPSBnZW5lcmF0ZVBpeGVsUXVldWUoaW1hZ2VEYXRhLCBzdGFydFBvc2l0aW9uLCBpbWFnZVN0YXRlLnRpbGVYLCBpbWFnZVN0YXRlLnRpbGVZKTtcbiAgICBcbiAgICAvLyBTaSBoYXkgdW5hIHBvc2ljaVx1MDBGM24gZGUgY29udGludWFjaVx1MDBGM24sIGZpbHRyYXIgcFx1MDBFRHhlbGVzIHlhIHBpbnRhZG9zXG4gICAgaWYgKGltYWdlU3RhdGUubGFzdFBvc2l0aW9uLnggPiAwIHx8IGltYWdlU3RhdGUubGFzdFBvc2l0aW9uLnkgPiAwKSB7XG4gICAgICBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscyA9IGltYWdlU3RhdGUucmVtYWluaW5nUGl4ZWxzLmZpbHRlcihwaXhlbCA9PiB7XG4gICAgICAgIGNvbnN0IHBpeGVsSW5kZXggPSBwaXhlbC5pbWFnZVkgKiB3aWR0aCArIHBpeGVsLmltYWdlWDtcbiAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gaW1hZ2VTdGF0ZS5sYXN0UG9zaXRpb24ueSAqIHdpZHRoICsgaW1hZ2VTdGF0ZS5sYXN0UG9zaXRpb24ueDtcbiAgICAgICAgcmV0dXJuIHBpeGVsSW5kZXggPj0gbGFzdEluZGV4O1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGxvZyhgQ29sYSBnZW5lcmFkYTogJHtpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscy5sZW5ndGh9IHBcdTAwRUR4ZWxlcyBwZW5kaWVudGVzYCk7XG4gICAgLy8gQWN0dWFsaXphciBvdmVybGF5IGRlbCBwbGFuIGFsIChyZSlnZW5lcmFyIGxhIGNvbGFcbiAgICB0cnkge1xuICAgICAgaWYgKHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXykge1xuICAgICAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uaW5qZWN0U3R5bGVzKCk7XG4gICAgICAgIHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXy5zZXRFbmFibGVkKHRydWUpOyAvLyBBc2VndXJhciBxdWUgZXN0XHUwMEU5IGFjdGl2YWRvXG4gICAgICAgIFxuICAgICAgICAvLyBDb25maWd1cmFyIGFuY2xhIGNvbiBsYSBwb3NpY2lcdTAwRjNuIGRlIGluaWNpbyBzaSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICAgICAgICBpZiAoaW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uICYmIGltYWdlU3RhdGUudGlsZVggIT09IHVuZGVmaW5lZCAmJiBpbWFnZVN0YXRlLnRpbGVZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uc2V0QW5jaG9yKHtcbiAgICAgICAgICAgIHRpbGVYOiBpbWFnZVN0YXRlLnRpbGVYLFxuICAgICAgICAgICAgdGlsZVk6IGltYWdlU3RhdGUudGlsZVksXG4gICAgICAgICAgICBweFg6IGltYWdlU3RhdGUuc3RhcnRQb3NpdGlvbi54LFxuICAgICAgICAgICAgcHhZOiBpbWFnZVN0YXRlLnN0YXJ0UG9zaXRpb24ueVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uc2V0UGxhbihpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscywge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgbmV4dEJhdGNoQ291bnQ6IGltYWdlU3RhdGUucGl4ZWxzUGVyQmF0Y2hcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBsb2coYFx1MjcwNSBQbGFuIG92ZXJsYXkgYWN0dWFsaXphZG8gY29uICR7aW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMubGVuZ3RofSBwXHUwMEVEeGVsZXMgZW4gY29sYWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZygnXHUyNkEwXHVGRTBGIEVycm9yIGFjdHVhbGl6YW5kbyBwbGFuIG92ZXJsYXk6JywgZSk7XG4gICAgfVxuICB9XG4gIFxuICB0cnkge1xuICAgIHdoaWxlIChpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscy5sZW5ndGggPiAwICYmICFpbWFnZVN0YXRlLnN0b3BGbGFnKSB7XG4gICAgICAvLyBWZXJpZmljYXIgY2FyZ2FzIGRpc3BvbmlibGVzXG4gICAgICBsZXQgYXZhaWxhYmxlQ2hhcmdlcyA9IE1hdGguZmxvb3IoaW1hZ2VTdGF0ZS5jdXJyZW50Q2hhcmdlcyk7XG4gICAgICBcbiAgICAgIC8vIERldGVybWluYXIgdGFtYVx1MDBGMW8gZGVsIGxvdGUgYmFzYWRvIGVuIGNvbmZpZ3VyYWNpXHUwMEYzblxuICAgICAgbGV0IHBpeGVsc1BlckJhdGNoO1xuICAgICAgaWYgKGltYWdlU3RhdGUuaXNGaXJzdEJhdGNoICYmIGltYWdlU3RhdGUudXNlQWxsQ2hhcmdlc0ZpcnN0ICYmIGF2YWlsYWJsZUNoYXJnZXMgPiAwKSB7XG4gICAgICAgIC8vIFByaW1lcmEgcGFzYWRhOiB1c2FyIHRvZGFzIGxhcyBjYXJnYXMgZGlzcG9uaWJsZXNcbiAgICAgICAgcGl4ZWxzUGVyQmF0Y2ggPSBNYXRoLm1pbihhdmFpbGFibGVDaGFyZ2VzLCBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscy5sZW5ndGgpO1xuICAgICAgICBpbWFnZVN0YXRlLmlzRmlyc3RCYXRjaCA9IGZhbHNlOyAvLyBNYXJjYXIgcXVlIHlhIG5vIGVzIGxhIHByaW1lcmEgcGFzYWRhXG4gICAgICAgIGxvZyhgUHJpbWVyYSBwYXNhZGE6IHVzYW5kbyAke3BpeGVsc1BlckJhdGNofSBjYXJnYXMgZGUgJHthdmFpbGFibGVDaGFyZ2VzfSBkaXNwb25pYmxlc2ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUGFzYWRhcyBzaWd1aWVudGVzOiB1c2FyIGNvbmZpZ3VyYWNpXHUwMEYzbiBub3JtYWxcbiAgICAgICAgcGl4ZWxzUGVyQmF0Y2ggPSBNYXRoLm1pbihpbWFnZVN0YXRlLnBpeGVsc1BlckJhdGNoLCBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscy5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoYXZhaWxhYmxlQ2hhcmdlcyA8IHBpeGVsc1BlckJhdGNoKSB7XG4gICAgICAgIGxvZyhgQ2FyZ2FzIGluc3VmaWNpZW50ZXM6ICR7YXZhaWxhYmxlQ2hhcmdlc30vJHtwaXhlbHNQZXJCYXRjaH0gbmVjZXNhcmlhc2ApO1xuICAgICAgICBhd2FpdCB3YWl0Rm9yQ29vbGRvd24ocGl4ZWxzUGVyQmF0Y2ggLSBhdmFpbGFibGVDaGFyZ2VzLCBvblByb2dyZXNzKTtcbiAgICAgICAgLy8gVm9sdmVyIGEgdmVyaWZpY2FyIGNhcmdhcyBkZXNwdVx1MDBFOXMgZGVsIGNvb2xkb3duXG4gICAgICAgIGF2YWlsYWJsZUNoYXJnZXMgPSBNYXRoLmZsb29yKGltYWdlU3RhdGUuY3VycmVudENoYXJnZXMpO1xuICAgICAgICAvLyBSZWNhbGN1bGFyIGVsIHRhbWFcdTAwRjFvIGRlbCBsb3RlIHNpIGVzIG5lY2VzYXJpb1xuICAgICAgICBpZiAoIWltYWdlU3RhdGUuaXNGaXJzdEJhdGNoKSB7XG4gICAgICAgICAgcGl4ZWxzUGVyQmF0Y2ggPSBNYXRoLm1pbihpbWFnZVN0YXRlLnBpeGVsc1BlckJhdGNoLCBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscy5sZW5ndGgsIGF2YWlsYWJsZUNoYXJnZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgXG4gIC8vIFRvbWFyIGVsIHNpZ3VpZW50ZSBsb3RlIGRlIHBcdTAwRUR4ZWxlc1xuICAgICAgY29uc3QgYmF0Y2ggPSBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscy5zcGxpY2UoMCwgcGl4ZWxzUGVyQmF0Y2gpO1xuICAgICAgXG4gICAgICBsb2coYFBpbnRhbmRvIGxvdGUgZGUgJHtiYXRjaC5sZW5ndGh9IHBcdTAwRUR4ZWxlcy4uLmApO1xuICAgICAgXG4gICAgICAvLyBBY3R1YWxpemFyIG92ZXJsYXkgZGVsIHBsYW4gcGFyYSByZWZsZWphciBlbCBsb3RlIHNpZ3VpZW50ZSByZXNhbHRhZG9cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18pIHtcbiAgICAgICAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uc2V0UGxhbihpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscywge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy8gTWFudGVuZXIgaGFiaWxpdGFkb1xuICAgICAgICAgICAgbmV4dEJhdGNoQ291bnQ6IGltYWdlU3RhdGUucGl4ZWxzUGVyQmF0Y2hcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsb2coJ1x1MjZBMFx1RkUwRiBFcnJvciBhY3R1YWxpemFuZG8gcGxhbiBvdmVybGF5IGR1cmFudGUgcGludGFkbzonLCBlKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGludGFyIGVsIGxvdGUgY29uIHNpc3RlbWEgZGUgcmVpbnRlbnRvc1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcGFpbnRQaXhlbEJhdGNoV2l0aFJldHJ5KGJhdGNoLCBvblByb2dyZXNzKTtcbiAgICAgIFxuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzICYmIHJlc3VsdC5wYWludGVkID4gMCkge1xuICAgICAgICBpbWFnZVN0YXRlLnBhaW50ZWRQaXhlbHMgKz0gcmVzdWx0LnBhaW50ZWQ7XG4gICAgICAgIFxuICAgICAgICAvLyBBY3R1YWxpemFyIGNhcmdhcyBjb25zdW1pZGFzXG4gICAgICAgIGltYWdlU3RhdGUuY3VycmVudENoYXJnZXMgPSBNYXRoLm1heCgwLCBpbWFnZVN0YXRlLmN1cnJlbnRDaGFyZ2VzIC0gcmVzdWx0LnBhaW50ZWQpO1xuICAgICAgICBsb2coYENhcmdhcyBkZXNwdVx1MDBFOXMgZGVsIGxvdGU6ICR7aW1hZ2VTdGF0ZS5jdXJyZW50Q2hhcmdlcy50b0ZpeGVkKDEpfSAoY29uc3VtaWRhczogJHtyZXN1bHQucGFpbnRlZH0pYCk7XG4gICAgICAgIFxuICAgICAgICAvLyBBY3R1YWxpemFyIHBvc2ljaVx1MDBGM24gcGFyYSBjb250aW51YXIgZGVzZGUgYXF1XHUwMEVEIHNpIHNlIGludGVycnVtcGVcbiAgICAgICAgaWYgKGJhdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBsYXN0UGl4ZWwgPSBiYXRjaFtiYXRjaC5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpbWFnZVN0YXRlLmxhc3RQb3NpdGlvbiA9IHsgeDogbGFzdFBpeGVsLmltYWdlWCwgeTogbGFzdFBpeGVsLmltYWdlWSB9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsb2coYExvdGUgZXhpdG9zbzogJHtyZXN1bHQucGFpbnRlZH0vJHtiYXRjaC5sZW5ndGh9IHBcdTAwRUR4ZWxlcyBwaW50YWRvcy4gVG90YWw6ICR7aW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzfS8ke2ltYWdlU3RhdGUudG90YWxQaXhlbHN9YCk7XG4gICAgICAgIFxuICAgICAgICAvLyBDYWxjdWxhciB0aWVtcG8gZXN0aW1hZG9cbiAgICAgICAgY29uc3QgZXN0aW1hdGVkVGltZSA9IGNhbGN1bGF0ZUVzdGltYXRlZFRpbWUoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIE1vc3RyYXIgbWVuc2FqZSBkZSBjb25maXJtYWNpXHUwMEYzbiBkZSBwYXNhZGEgY29tcGxldGFkYVxuICAgICAgICBjb25zdCBwcm9ncmVzc1BlcmNlbnQgPSAoKGltYWdlU3RhdGUucGFpbnRlZFBpeGVscyAvIGltYWdlU3RhdGUudG90YWxQaXhlbHMpICogMTAwKS50b0ZpeGVkKDEpO1xuICAgICAgICBjb25zdCBzdWNjZXNzTWVzc2FnZSA9IHQoJ2ltYWdlLnBhc3NDb21wbGV0ZWQnLCB7XG4gICAgICAgICAgcGFpbnRlZDogcmVzdWx0LnBhaW50ZWQsXG4gICAgICAgICAgcGVyY2VudDogcHJvZ3Jlc3NQZXJjZW50LFxuICAgICAgICAgIGN1cnJlbnQ6IGltYWdlU3RhdGUucGFpbnRlZFBpeGVscyxcbiAgICAgICAgICB0b3RhbDogaW1hZ2VTdGF0ZS50b3RhbFBpeGVsc1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFjdHVhbGl6YXIgcHJvZ3Jlc28gY29uIG1lbnNhamUgZGUgXHUwMEU5eGl0b1xuICAgICAgICBpZiAob25Qcm9ncmVzcykge1xuICAgICAgICAgIG9uUHJvZ3Jlc3MoaW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzLCBpbWFnZVN0YXRlLnRvdGFsUGl4ZWxzLCBzdWNjZXNzTWVzc2FnZSwgZXN0aW1hdGVkVGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gIC8vIFBhdXNhIHBhcmEgcXVlIGVsIHVzdWFyaW8gdmVhIGVsIG1lbnNhamUgZGUgXHUwMEU5eGl0byBhbnRlcyBkZWwgY29vbGRvd25cbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwMCk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdC5zaG91bGRDb250aW51ZSkge1xuICAgICAgICAvLyBTaSBlbCBzaXN0ZW1hIGRlIHJlaW50ZW50b3MgZmFsbFx1MDBGMyBwZXJvIGRlYmUgY29udGludWFyXG4gICAgICAgIGxvZyhgTG90ZSBmYWxsXHUwMEYzIGRlc3B1XHUwMEU5cyBkZSB0b2RvcyBsb3MgcmVpbnRlbnRvcywgY29udGludWFuZG8gY29uIHNpZ3VpZW50ZSBsb3RlLi4uYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBFbiBjYXNvIGRlIGZhbGxvLCBkZXZvbHZlciBlbCBsb3RlIGEgbGEgY29sYVxuICAgICAgICBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscy51bnNoaWZ0KC4uLmJhdGNoKTtcbiAgICAgICAgbG9nKGBMb3RlIGZhbGxcdTAwRjM6IHJlaW50ZW50YW5kbyBlbiA1IHNlZ3VuZG9zLi4uYCk7XG4gICAgICAgIGF3YWl0IHNsZWVwKDUwMDApO1xuICAgICAgfVxuICAgICAgXG4gIC8vIFBhdXNhIGJyZXZlIGVudHJlIGxvdGVzXG4gICAgICBhd2FpdCBzbGVlcCg1MDApO1xuICAgIH1cbiAgICBcbiAgICBpZiAoaW1hZ2VTdGF0ZS5zdG9wRmxhZykge1xuICAgICAgbG9nKGBQaW50YWRvIHBhdXNhZG8gZW4gcFx1MDBFRHhlbCBpbWFnZW4oJHtpbWFnZVN0YXRlLmxhc3RQb3NpdGlvbi54fSwke2ltYWdlU3RhdGUubGFzdFBvc2l0aW9uLnl9KWApO1xuICAgICAgaWYgKG9uQ29tcGxldGUpIHtcbiAgICAgICAgb25Db21wbGV0ZShmYWxzZSwgaW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKGBQaW50YWRvIGNvbXBsZXRhZG86ICR7aW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzfSBwXHUwMEVEeGVsZXMgcGludGFkb3NgKTtcbiAgICAgIGltYWdlU3RhdGUubGFzdFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH07XG4gICAgICBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscyA9IFtdO1xuICAgICAgLy8gTGltcGlhciBvdmVybGF5IGRlbCBwbGFuIGFsIGNvbXBsZXRhclxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXykge1xuICAgICAgICAgIHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXy5zZXRQbGFuKFtdLCB7IFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy8gTWFudGVuZXIgaGFiaWxpdGFkbyBwZXJvIHNpbiBwXHUwMEVEeGVsZXNcbiAgICAgICAgICAgIG5leHRCYXRjaENvdW50OiAwIFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxvZygnXHUyNzA1IFBsYW4gb3ZlcmxheSBsaW1waWFkbyBhbCBjb21wbGV0YXIgcGludGFkbycpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIEVycm9yIGxpbXBpYW5kbyBwbGFuIG92ZXJsYXk6JywgZSk7XG4gICAgICB9XG4gICAgICBpZiAob25Db21wbGV0ZSkge1xuICAgICAgICBvbkNvbXBsZXRlKHRydWUsIGltYWdlU3RhdGUucGFpbnRlZFBpeGVscyk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnRXJyb3IgZW4gcHJvY2VzbyBkZSBwaW50YWRvOicsIGVycm9yKTtcbiAgICBpZiAob25FcnJvcikge1xuICAgICAgb25FcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYWludFBpeGVsQmF0Y2goYmF0Y2gpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIWJhdGNoIHx8IGJhdGNoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHBhaW50ZWQ6IDAsIGVycm9yOiAnTG90ZSB2YWNcdTAwRURvJyB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBBZ3J1cGFyIGVsIGxvdGUgcG9yIHRpbGUgY29tbyBoYWNlIHdwbGFjZXJcbiAgICBjb25zdCBieVRpbGUgPSBuZXcgTWFwKCk7IC8vIGtleTogYCR7dHh9LCR7dHl9YCAtPiB7IGNvb3JkczogW10sIGNvbG9yczogW10sIHR4LCB0eSB9XG4gICAgZm9yIChjb25zdCBwIG9mIGJhdGNoKSB7XG4gICAgICBjb25zdCBrZXkgPSBgJHtwLnRpbGVYfSwke3AudGlsZVl9YDtcbiAgICAgIGlmICghYnlUaWxlLmhhcyhrZXkpKSBieVRpbGUuc2V0KGtleSwgeyBjb29yZHM6IFtdLCBjb2xvcnM6IFtdLCB0eDogcC50aWxlWCwgdHk6IHAudGlsZVkgfSk7XG4gICAgICBjb25zdCBidWNrZXQgPSBieVRpbGUuZ2V0KGtleSk7XG4gICAgICBidWNrZXQuY29vcmRzLnB1c2gocC5sb2NhbFgsIHAubG9jYWxZKTtcbiAgICAgIGJ1Y2tldC5jb2xvcnMucHVzaChwLmNvbG9yLmlkIHx8IHAuY29sb3IudmFsdWUgfHwgMSk7XG4gICAgfVxuXG4gICAgLy8gT2J0ZW5lciB1biBcdTAwRkFuaWNvIHRva2VuIGRlIFR1cm5zdGlsZSBwYXJhIGVsIGNvbmp1bnRvXG4gICAgY29uc3Qgc2l0ZUtleSA9IGRldGVjdFNpdGVLZXkoSU1BR0VfREVGQVVMVFMuU0lURUtFWSk7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRUdXJuc3RpbGVUb2tlbihzaXRlS2V5KTtcblxuICAgIGxldCB0b3RhbFBhaW50ZWQgPSAwO1xuICAgIGZvciAoY29uc3QgeyBjb29yZHMsIGNvbG9ycywgdHgsIHR5IH0gb2YgYnlUaWxlLnZhbHVlcygpKSB7XG4gICAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG4gICAgICAvLyBTYW5lYWRvIGV4dHJhIGRlIGNvb3JkcyAoMC4uOTk5KSB5IGRlcHVyYWNpXHUwMEYzbiBkZSByYW5nb3NcbiAgICAgIGNvbnN0IHNhbml0aXplZCA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgY29uc3QgeCA9ICgoTnVtYmVyKGNvb3Jkc1tpXSkgJSAxMDAwKSArIDEwMDApICUgMTAwMDtcbiAgICAgICAgY29uc3QgeSA9ICgoTnVtYmVyKGNvb3Jkc1tpICsgMV0pICUgMTAwMCkgKyAxMDAwKSAlIDEwMDA7XG4gICAgICAgIC8vIEZpbHRyYXIgTmFOL3VuZGVmaW5lZFxuICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKHgpICYmIE51bWJlci5pc0Zpbml0ZSh5KSkge1xuICAgICAgICAgIHNhbml0aXplZC5wdXNoKHgsIHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBMb2cgZGUgZGlhZ25cdTAwRjNzdGljb1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IG1pblggPSA5OTksIG1heFggPSAwLCBtaW5ZID0gOTk5LCBtYXhZID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYW5pdGl6ZWQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICBjb25zdCB4ID0gc2FuaXRpemVkW2ldLCB5ID0gc2FuaXRpemVkW2kgKyAxXTtcbiAgICAgICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4OyBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgICAgIGlmICh5IDwgbWluWSkgbWluWSA9IHk7IGlmICh5ID4gbWF4WSkgbWF4WSA9IHk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nKGBbSU1HXSBFbnZpYW5kbyB0aWxlICR7dHh9LCR7dHl9OiAke2NvbG9ycy5sZW5ndGh9IHB4IHwgeDpbJHttaW5YfSwke21heFh9XSB5Olske21pbll9LCR7bWF4WX1dYCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIG5vb3AgKHNvbG8gZGlhZ25cdTAwRjNzdGljbylcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHBvc3RQaXhlbEJhdGNoSW1hZ2UodHgsIHR5LCBzYW5pdGl6ZWQsIGNvbG9ycywgdG9rZW4pO1xuICAgICAgaWYgKHJlc3Auc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBwYWludGVkOiB0b3RhbFBhaW50ZWQsXG4gICAgICAgICAgZXJyb3I6IHJlc3AuanNvbj8ubWVzc2FnZSB8fCBgSFRUUCAke3Jlc3Auc3RhdHVzfWAsXG4gICAgICAgICAgc3RhdHVzOiByZXNwLnN0YXR1c1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdG90YWxQYWludGVkICs9IHJlc3AucGFpbnRlZCB8fCAwO1xuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBhaW50ZWQ6IHRvdGFsUGFpbnRlZCB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnRXJyb3IgZW4gcGFpbnRQaXhlbEJhdGNoOicsIGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBwYWludGVkOiAwLFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2VcbiAgICB9O1xuICB9XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBkZSBwaW50YWRvIGNvbiBzaXN0ZW1hIGRlIHJlaW50ZW50b3MgKGFkYXB0YWRvIGRlbCBBdXRvLUZhcm0pXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGFpbnRQaXhlbEJhdGNoV2l0aFJldHJ5KGJhdGNoLCBvblByb2dyZXNzKSB7XG4gIGNvbnN0IG1heEF0dGVtcHRzID0gNTsgLy8gNSBpbnRlbnRvcyBjb21vIGVuIGVsIEZhcm1cbiAgY29uc3QgYmFzZURlbGF5ID0gMzAwMDsgLy8gRGVsYXkgYmFzZSBkZSAzIHNlZ3VuZG9zXG4gIFxuICBmb3IgKGxldCBhdHRlbXB0ID0gMTsgYXR0ZW1wdCA8PSBtYXhBdHRlbXB0czsgYXR0ZW1wdCsrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBhaW50UGl4ZWxCYXRjaChiYXRjaCk7XG4gICAgICBcbiAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICBpbWFnZVN0YXRlLnJldHJ5Q291bnQgPSAwOyAvLyBSZXNldCBlbiBcdTAwRTl4aXRvXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGltYWdlU3RhdGUucmV0cnlDb3VudCA9IGF0dGVtcHQ7XG4gICAgICBcbiAgICAgIGlmIChhdHRlbXB0IDwgbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgY29uc3QgZGVsYXkgPSBiYXNlRGVsYXkgKiBNYXRoLnBvdygyLCBhdHRlbXB0IC0gMSk7IC8vIEJhY2tvZmYgZXhwb25lbmNpYWxcbiAgICAgICAgY29uc3QgZGVsYXlTZWNvbmRzID0gTWF0aC5yb3VuZChkZWxheSAvIDEwMDApO1xuICAgICAgICBcbiAgICAgICAgLy8gRGV0ZXJtaW5hciB0aXBvIGRlIGVycm9yIHBhcmEgbWVuc2FqZSBlc3BlY1x1MDBFRGZpY29cbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IDAgfHwgcmVzdWx0LnN0YXR1cyA9PT0gJ05ldHdvcmtFcnJvcicpIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSB0KCdpbWFnZS5uZXR3b3JrRXJyb3InKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuc3RhdHVzID49IDUwMCkge1xuICAgICAgICAgIGVycm9yTWVzc2FnZSA9IHQoJ2ltYWdlLnNlcnZlckVycm9yJyk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnN0YXR1cyA9PT0gNDA4KSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gdCgnaW1hZ2UudGltZW91dEVycm9yJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gdCgnaW1hZ2UucmV0cnlBdHRlbXB0JywgeyBcbiAgICAgICAgICAgIGF0dGVtcHQsIFxuICAgICAgICAgICAgbWF4QXR0ZW1wdHMsIFxuICAgICAgICAgICAgZGVsYXk6IGRlbGF5U2Vjb25kcyBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBvblByb2dyZXNzKGltYWdlU3RhdGUucGFpbnRlZFBpeGVscywgaW1hZ2VTdGF0ZS50b3RhbFBpeGVscywgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbG9nKGBSZWludGVudG8gJHthdHRlbXB0fS8ke21heEF0dGVtcHRzfSBkZXNwdVx1MDBFOXMgZGUgJHtkZWxheVNlY29uZHN9cy4gRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xuICAgICAgICBhd2FpdCBzbGVlcChkZWxheSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKGBFcnJvciBlbiBpbnRlbnRvICR7YXR0ZW1wdH06YCwgZXJyb3IpO1xuICAgICAgaW1hZ2VTdGF0ZS5yZXRyeUNvdW50ID0gYXR0ZW1wdDtcbiAgICAgIFxuICAgICAgaWYgKGF0dGVtcHQgPCBtYXhBdHRlbXB0cykge1xuICAgICAgICBjb25zdCBkZWxheSA9IGJhc2VEZWxheSAqIE1hdGgucG93KDIsIGF0dGVtcHQgLSAxKTtcbiAgICAgICAgY29uc3QgZGVsYXlTZWNvbmRzID0gTWF0aC5yb3VuZChkZWxheSAvIDEwMDApO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdCgnaW1hZ2UucmV0cnlFcnJvcicsIHsgXG4gICAgICAgICAgYXR0ZW1wdCwgXG4gICAgICAgICAgbWF4QXR0ZW1wdHMsIFxuICAgICAgICAgIGRlbGF5OiBkZWxheVNlY29uZHMgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBvblByb2dyZXNzKGltYWdlU3RhdGUucGFpbnRlZFBpeGVscywgaW1hZ2VTdGF0ZS50b3RhbFBpeGVscywgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2xlZXAoZGVsYXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgaW1hZ2VTdGF0ZS5yZXRyeUNvdW50ID0gbWF4QXR0ZW1wdHM7XG4gIGNvbnN0IGZhaWxNZXNzYWdlID0gdCgnaW1hZ2UucmV0cnlGYWlsZWQnLCB7IG1heEF0dGVtcHRzIH0pO1xuICBcbiAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICBvblByb2dyZXNzKGltYWdlU3RhdGUucGFpbnRlZFBpeGVscywgaW1hZ2VTdGF0ZS50b3RhbFBpeGVscywgZmFpbE1lc3NhZ2UpO1xuICB9XG4gIFxuICBsb2coYEZhbGxcdTAwRjMgZGVzcHVcdTAwRTlzIGRlICR7bWF4QXR0ZW1wdHN9IGludGVudG9zLCBjb250aW51YW5kbyBjb24gc2lndWllbnRlIGxvdGVgKTtcbiAgXG4gIC8vIFJldG9ybmFyIHVuIHJlc3VsdGFkbyBkZSBmYWxsbyBxdWUgcGVybWl0YSBjb250aW51YXJcbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBwYWludGVkOiAwLFxuICAgIGVycm9yOiBgRmFsbFx1MDBGMyBkZXNwdVx1MDBFOXMgZGUgJHttYXhBdHRlbXB0c30gaW50ZW50b3NgLFxuICAgIHNob3VsZENvbnRpbnVlOiB0cnVlIC8vIEluZGljYSBxdWUgZGViZSBjb250aW51YXIgY29uIGVsIHNpZ3VpZW50ZSBsb3RlXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYWludFBpeGVsQmF0Y2hfT1JJR0lOQUwoYmF0Y2gpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIWJhdGNoIHx8IGJhdGNoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHBhaW50ZWQ6IDAsIGVycm9yOiAnTG90ZSB2YWNcdTAwRURvJyB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBDb252ZXJ0aXIgZWwgbG90ZSBhbCBmb3JtYXRvIGVzcGVyYWRvIHBvciBsYSBBUElcbiAgICBjb25zdCBjb29yZHMgPSBbXTtcbiAgICBjb25zdCBjb2xvcnMgPSBbXTtcbiAgICBsZXQgdGlsZVggPSBudWxsO1xuICAgIGxldCB0aWxlWSA9IG51bGw7XG4gICAgXG4gICAgZm9yIChjb25zdCBwaXhlbCBvZiBiYXRjaCkge1xuICAgICAgY29vcmRzLnB1c2gocGl4ZWwubG9jYWxYLCBwaXhlbC5sb2NhbFkpO1xuICAgICAgY29sb3JzLnB1c2gocGl4ZWwuY29sb3IuaWQgfHwgcGl4ZWwuY29sb3IudmFsdWUgfHwgMSk7XG4gICAgICBcbiAgICAgIC8vIFRvbWFyIHRpbGVYL3RpbGVZIGRlbCBwcmltZXIgcFx1MDBFRHhlbCAodG9kb3MgZGViZXJcdTAwRURhbiB0ZW5lciBlbCBtaXNtbyB0aWxlKVxuICAgICAgaWYgKHRpbGVYID09PSBudWxsKSB7XG4gICAgICAgIHRpbGVYID0gcGl4ZWwudGlsZVg7XG4gICAgICAgIHRpbGVZID0gcGl4ZWwudGlsZVk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIE9idGVuZXIgdG9rZW4gZGUgVHVybnN0aWxlXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRUdXJuc3RpbGVUb2tlbihJTUFHRV9ERUZBVUxUUy5TSVRFS0VZKTtcbiAgICBcbiAgICAvLyBFbnZpYXIgcFx1MDBFRHhlbGVzIHVzYW5kbyBlbCBmb3JtYXRvIGNvcnJlY3RvXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwb3N0UGl4ZWxCYXRjaEltYWdlKHRpbGVYLCB0aWxlWSwgY29vcmRzLCBjb2xvcnMsIHRva2VuKTtcbiAgICBcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIHBhaW50ZWQ6IHJlc3BvbnNlLnBhaW50ZWQsXG4gICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5qc29uXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgcGFpbnRlZDogMCxcbiAgICAgICAgZXJyb3I6IHJlc3BvbnNlLmpzb24/Lm1lc3NhZ2UgfHwgYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YCxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnRXJyb3IgZW4gcGFpbnRQaXhlbEJhdGNoOicsIGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBwYWludGVkOiAwLFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2VcbiAgICB9O1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHdhaXRGb3JDb29sZG93bihjaGFyZ2VzTmVlZGVkLCBvblByb2dyZXNzKSB7XG4gIGNvbnN0IGNoYXJnZVRpbWUgPSBJTUFHRV9ERUZBVUxUUy5DSEFSR0VfUkVHRU5fTVMgKiBjaGFyZ2VzTmVlZGVkO1xuICBjb25zdCB3YWl0VGltZSA9IGNoYXJnZVRpbWUgKyA1MDAwOyAvLyBUaWVtcG8gbmVjZXNhcmlvICsgNSBzZWd1bmRvcyBkZSBzZWd1cmlkYWRcbiAgXG4gIGxvZyhgRXNwZXJhbmRvICR7TWF0aC5yb3VuZCh3YWl0VGltZS8xMDAwKX1zIHBhcmEgb2J0ZW5lciAke2NoYXJnZXNOZWVkZWR9IGNhcmdhc2ApO1xuICBcbiAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGUgY29vbGRvd25cbiAgaW1hZ2VTdGF0ZS5pbkNvb2xkb3duID0gdHJ1ZTtcbiAgaW1hZ2VTdGF0ZS5jb29sZG93bkVuZFRpbWUgPSBEYXRlLm5vdygpICsgd2FpdFRpbWU7XG4gIGltYWdlU3RhdGUubmV4dEJhdGNoQ29vbGRvd24gPSBNYXRoLnJvdW5kKHdhaXRUaW1lIC8gMTAwMCk7XG4gIFxuICBpZiAob25Qcm9ncmVzcykge1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHdhaXRUaW1lIC8gNjAwMDApO1xuICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKCh3YWl0VGltZSAlIDYwMDAwKSAvIDEwMDApO1xuICAgIGNvbnN0IHRpbWVUZXh0ID0gbWludXRlcyA+IDAgPyBgJHttaW51dGVzfW0gJHtzZWNvbmRzfXNgIDogYCR7c2Vjb25kc31zYDtcbiAgICBjb25zdCBtZXNzYWdlID0gdCgnaW1hZ2Uud2FpdGluZ0NoYXJnZXNSZWdlbicsIHtcbiAgICAgIGN1cnJlbnQ6IE1hdGguZmxvb3IoaW1hZ2VTdGF0ZS5jdXJyZW50Q2hhcmdlcyksXG4gICAgICBuZWVkZWQ6IGNoYXJnZXNOZWVkZWQsXG4gICAgICB0aW1lOiB0aW1lVGV4dFxuICAgIH0pO1xuICAgIG9uUHJvZ3Jlc3MoaW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzLCBpbWFnZVN0YXRlLnRvdGFsUGl4ZWxzLCBtZXNzYWdlKTtcbiAgfVxuICBcbiAgLy8gQ29udGFyIGhhY2lhIGF0clx1MDBFMXNcbiAgZm9yIChsZXQgaSA9IE1hdGgucm91bmQod2FpdFRpbWUvMTAwMCk7IGkgPiAwOyBpLS0pIHtcbiAgICBpZiAoaW1hZ2VTdGF0ZS5zdG9wRmxhZykgYnJlYWs7XG4gICAgXG4gICAgaW1hZ2VTdGF0ZS5uZXh0QmF0Y2hDb29sZG93biA9IGk7XG4gICAgXG4gICAgLy8gU29sbyBhY3R1YWxpemFyIGVsIG1lbnNhamUgY2FkYSA1IHNlZ3VuZG9zIG8gZW4gbG9zIFx1MDBGQWx0aW1vcyAxMCBzZWd1bmRvcyBwYXJhIHJlZHVjaXIgcGFycGFkZW9cbiAgICBpZiAob25Qcm9ncmVzcyAmJiAoaSAlIDUgPT09IDAgfHwgaSA8PSAxMCB8fCBpID09PSBNYXRoLnJvdW5kKHdhaXRUaW1lLzEwMDApKSkge1xuICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoaSAvIDYwKTtcbiAgICAgIGNvbnN0IHNlY29uZHMgPSBpICUgNjA7XG4gICAgICBjb25zdCB0aW1lVGV4dCA9IG1pbnV0ZXMgPiAwID8gYCR7bWludXRlc31tICR7c2Vjb25kc31zYCA6IGAke3NlY29uZHN9c2A7XG4gICAgICBjb25zdCBtZXNzYWdlID0gdCgnaW1hZ2Uud2FpdGluZ0NoYXJnZXNDb3VudGRvd24nLCB7XG4gICAgICAgIGN1cnJlbnQ6IE1hdGguZmxvb3IoaW1hZ2VTdGF0ZS5jdXJyZW50Q2hhcmdlcyksXG4gICAgICAgIG5lZWRlZDogY2hhcmdlc05lZWRlZCxcbiAgICAgICAgdGltZTogdGltZVRleHRcbiAgICAgIH0pO1xuICAgICAgb25Qcm9ncmVzcyhpbWFnZVN0YXRlLnBhaW50ZWRQaXhlbHMsIGltYWdlU3RhdGUudG90YWxQaXhlbHMsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBcbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgfVxuICBcbiAgaW1hZ2VTdGF0ZS5pbkNvb2xkb3duID0gZmFsc2U7XG4gIGltYWdlU3RhdGUubmV4dEJhdGNoQ29vbGRvd24gPSAwO1xuICBcbiAgLy8gU2ltdWxhciByZWdlbmVyYWNpXHUwMEYzbiBkZSBjYXJnYXNcbiAgaW1hZ2VTdGF0ZS5jdXJyZW50Q2hhcmdlcyA9IE1hdGgubWluKFxuICAgIGltYWdlU3RhdGUubWF4Q2hhcmdlcyB8fCA1MCwgLy8gdXNhciBtYXhDaGFyZ2VzIGRlbCBlc3RhZG9cbiAgICBpbWFnZVN0YXRlLmN1cnJlbnRDaGFyZ2VzICsgKHdhaXRUaW1lIC8gSU1BR0VfREVGQVVMVFMuQ0hBUkdFX1JFR0VOX01TKVxuICApO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBpeGVsUXVldWUoaW1hZ2VEYXRhLCBzdGFydFBvc2l0aW9uLCBiYXNlVGlsZVgsIGJhc2VUaWxlWSkge1xuICBjb25zdCB7IHBpeGVscyB9ID0gaW1hZ2VEYXRhO1xuICBjb25zdCB7IHg6IGxvY2FsU3RhcnRYLCB5OiBsb2NhbFN0YXJ0WSB9ID0gc3RhcnRQb3NpdGlvbjtcbiAgY29uc3QgcXVldWUgPSBbXTtcblxuICAvLyBWZXJpZmljYXIgc2kgcGl4ZWxzIGVzIHVuIGFycmF5IGl0ZXJhYmxlXG4gIGlmICghQXJyYXkuaXNBcnJheShwaXhlbHMpKSB7XG4gICAgbG9nKGBcdTI3NEMgRXJyb3I6IHBpeGVscyBubyBlcyB1biBhcnJheSBpdGVyYWJsZS4gVGlwbzogJHt0eXBlb2YgcGl4ZWxzfWAsIHBpeGVscyk7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZm9yIChjb25zdCBwaXhlbERhdGEgb2YgcGl4ZWxzKSB7XG4gICAgaWYgKCFwaXhlbERhdGEpIGNvbnRpbnVlO1xuICAgIFxuICAgIC8vIE1hbmVqYXIgZGlmZXJlbnRlcyBmb3JtYXRvcyBkZSBwXHUwMEVEeGVsXG4gICAgLy8gRm9ybWF0byBCbHVlIE1hcmJsZTogaW1hZ2VYLCBpbWFnZVksIGNvbG9yXG4gICAgLy8gRm9ybWF0byBjbFx1MDBFMXNpY286IHgsIHksIHRhcmdldENvbG9yXG4gICAgY29uc3QgcGl4ZWxYID0gcGl4ZWxEYXRhLmltYWdlWCAhPT0gdW5kZWZpbmVkID8gcGl4ZWxEYXRhLmltYWdlWCA6IHBpeGVsRGF0YS54O1xuICAgIGNvbnN0IHBpeGVsWSA9IHBpeGVsRGF0YS5pbWFnZVkgIT09IHVuZGVmaW5lZCA/IHBpeGVsRGF0YS5pbWFnZVkgOiBwaXhlbERhdGEueTtcbiAgICBjb25zdCBwaXhlbENvbG9yID0gcGl4ZWxEYXRhLmNvbG9yICE9PSB1bmRlZmluZWQgPyBwaXhlbERhdGEuY29sb3IgOiBwaXhlbERhdGEudGFyZ2V0Q29sb3I7XG4gICAgXG4gICAgaWYgKHBpeGVsWCA9PT0gdW5kZWZpbmVkIHx8IHBpeGVsWSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsb2coYFx1MjZBMFx1RkUwRiBQXHUwMEVEeGVsIGNvbiBjb29yZGVuYWRhcyBpbnZcdTAwRTFsaWRhczpgLCBwaXhlbERhdGEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIC8vIGdsb2JhbCBkZW50cm8gZGVsIG1vc2FpY28gYmFzZSwgcHVlZGUgZXhjZWRlciAwLi45OTkgeSBjcnV6YXIgYSBvdHJvcyB0aWxlc1xuICAgIGNvbnN0IGdsb2JhbFggPSBsb2NhbFN0YXJ0WCArIHBpeGVsWDtcbiAgICBjb25zdCBnbG9iYWxZID0gbG9jYWxTdGFydFkgKyBwaXhlbFk7XG4gICAgY29uc3QgdGlsZU9mZnNldFggPSBNYXRoLmZsb29yKGdsb2JhbFggLyAxMDAwKTtcbiAgICBjb25zdCB0aWxlT2Zmc2V0WSA9IE1hdGguZmxvb3IoZ2xvYmFsWSAvIDEwMDApO1xuICAgIGNvbnN0IHR4ID0gYmFzZVRpbGVYICsgdGlsZU9mZnNldFg7XG4gICAgY29uc3QgdHkgPSBiYXNlVGlsZVkgKyB0aWxlT2Zmc2V0WTtcbiAgICBjb25zdCBsb2NhbFggPSAoKGdsb2JhbFggJSAxMDAwKSArIDEwMDApICUgMTAwMDsgLy8gYXNlZ3VyYXIgMC4uOTk5XG4gICAgY29uc3QgbG9jYWxZID0gKChnbG9iYWxZICUgMTAwMCkgKyAxMDAwKSAlIDEwMDA7XG4gICAgXG4gICAgcXVldWUucHVzaCh7XG4gICAgICBpbWFnZVg6IHBpeGVsWCxcbiAgICAgIGltYWdlWTogcGl4ZWxZLFxuICAgICAgbG9jYWxYLFxuICAgICAgbG9jYWxZLFxuICAgICAgdGlsZVg6IHR4LFxuICAgICAgdGlsZVk6IHR5LFxuICAgICAgY29sb3I6IHBpeGVsQ29sb3IsXG4gICAgICBvcmlnaW5hbENvbG9yOiBwaXhlbERhdGEub3JpZ2luYWxDb2xvclxuICAgIH0pO1xuICB9XG5cbiAgbG9nKGBDb2xhIGRlIHBcdTAwRUR4ZWxlcyBnZW5lcmFkYTogJHtxdWV1ZS5sZW5ndGh9IHBcdTAwRUR4ZWxlcyBwYXJhIHBpbnRhcmApO1xuICByZXR1cm4gcXVldWU7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUVzdGltYXRlZFRpbWUoKSB7XG4gIGlmICghaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMgfHwgaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgXG4gIGNvbnN0IHJlbWFpbmluZ1BpeGVscyA9IGltYWdlU3RhdGUucmVtYWluaW5nUGl4ZWxzLmxlbmd0aDtcbiAgY29uc3QgYmF0Y2hTaXplID0gaW1hZ2VTdGF0ZS5waXhlbHNQZXJCYXRjaDtcbiAgY29uc3QgY2hhcmdlUmVnZW5UaW1lID0gSU1BR0VfREVGQVVMVFMuQ0hBUkdFX1JFR0VOX01TIC8gMTAwMDsgLy8gZW4gc2VndW5kb3NcbiAgXG4gIC8vIENhbGN1bGFyIG5cdTAwRkFtZXJvIGRlIGxvdGVzIG5lY2VzYXJpb3NcbiAgY29uc3QgYmF0Y2hlc05lZWRlZCA9IE1hdGguY2VpbChyZW1haW5pbmdQaXhlbHMgLyBiYXRjaFNpemUpO1xuICBcbiAgLy8gVGllbXBvIGRlIGVzcGVyYSBlbnRyZSBsb3RlcyAoY2FkYSBwXHUwMEVEeGVsIG5lY2VzaXRhIDEgY2FyZ2EsIGNhZGEgY2FyZ2EgdGFyZGEgMzBzKVxuICBjb25zdCB3YWl0VGltZUJldHdlZW5CYXRjaGVzID0gYmF0Y2hTaXplICogY2hhcmdlUmVnZW5UaW1lO1xuICBcbiAgLy8gVGllbXBvIHRvdGFsIGVzdGltYWRvXG4gIGNvbnN0IHRvdGFsV2FpdFRpbWUgPSAoYmF0Y2hlc05lZWRlZCAtIDEpICogd2FpdFRpbWVCZXR3ZWVuQmF0Y2hlcztcbiAgY29uc3QgZXhlY3V0aW9uVGltZSA9IGJhdGNoZXNOZWVkZWQgKiAyOyAvLyB+MiBzZWd1bmRvcyBwb3IgbG90ZSBkZSBlamVjdWNpXHUwMEYzblxuICBcbiAgcmV0dXJuIE1hdGguY2VpbCh0b3RhbFdhaXRUaW1lICsgZXhlY3V0aW9uVGltZSk7XG59XG5cbmV4cG9ydCB7IGNhbGN1bGF0ZUVzdGltYXRlZFRpbWUgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQYWludGluZygpIHtcbiAgaW1hZ2VTdGF0ZS5zdG9wRmxhZyA9IHRydWU7XG4gIGltYWdlU3RhdGUucnVubmluZyA9IGZhbHNlO1xuICBsb2coJ1x1RDgzRFx1REVEMSBEZXRlbmllbmRvIHByb2Nlc28gZGUgcGludGFkby4uLicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF1c2VQYWludGluZygpIHtcbiAgaW1hZ2VTdGF0ZS5zdG9wRmxhZyA9IHRydWU7XG4gIGxvZygnXHUyM0Y4XHVGRTBGIFBhdXNhbmRvIHByb2Nlc28gZGUgcGludGFkby4uLicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdW1lUGFpbnRpbmcoKSB7XG4gIGltYWdlU3RhdGUuc3RvcEZsYWcgPSBmYWxzZTtcbiAgaW1hZ2VTdGF0ZS5ydW5uaW5nID0gdHJ1ZTtcbiAgbG9nKCdcdTI1QjZcdUZFMEYgUmVhbnVkYW5kbyBwcm9jZXNvIGRlIHBpbnRhZG8uLi4nKTtcbn1cbiIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IGltYWdlU3RhdGUgfSBmcm9tIFwiLi9jb25maWcuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9ncmVzcyhmaWxlbmFtZSA9IG51bGwpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIWltYWdlU3RhdGUuaW1hZ2VEYXRhIHx8IGltYWdlU3RhdGUucGFpbnRlZFBpeGVscyA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBoYXkgcHJvZ3Jlc28gcGFyYSBndWFyZGFyJyk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHByb2dyZXNzRGF0YSA9IHtcbiAgICAgIHZlcnNpb246IFwiMS4wXCIsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICBpbWFnZURhdGE6IHtcbiAgICAgICAgd2lkdGg6IGltYWdlU3RhdGUuaW1hZ2VEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGltYWdlU3RhdGUuaW1hZ2VEYXRhLmhlaWdodCxcbiAgICAgICAgb3JpZ2luYWxOYW1lOiBpbWFnZVN0YXRlLm9yaWdpbmFsSW1hZ2VOYW1lXG4gICAgICB9LFxuICAgICAgcHJvZ3Jlc3M6IHtcbiAgICAgICAgcGFpbnRlZFBpeGVsczogaW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzLFxuICAgICAgICB0b3RhbFBpeGVsczogaW1hZ2VTdGF0ZS50b3RhbFBpeGVscyxcbiAgICAgICAgbGFzdFBvc2l0aW9uOiB7IC4uLmltYWdlU3RhdGUubGFzdFBvc2l0aW9uIH1cbiAgICAgIH0sXG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICBzdGFydFBvc2l0aW9uOiB7IC4uLmltYWdlU3RhdGUuc3RhcnRQb3NpdGlvbiB9LFxuICAgICAgICB0aWxlWDogaW1hZ2VTdGF0ZS50aWxlWCxcbiAgICAgICAgdGlsZVk6IGltYWdlU3RhdGUudGlsZVlcbiAgICAgIH0sXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgcGl4ZWxzUGVyQmF0Y2g6IGltYWdlU3RhdGUucGl4ZWxzUGVyQmF0Y2gsXG4gICAgICAgIHVzZUFsbENoYXJnZXNGaXJzdDogaW1hZ2VTdGF0ZS51c2VBbGxDaGFyZ2VzRmlyc3QsXG4gICAgICAgIGlzRmlyc3RCYXRjaDogaW1hZ2VTdGF0ZS5pc0ZpcnN0QmF0Y2gsXG4gICAgICAgIG1heENoYXJnZXM6IGltYWdlU3RhdGUubWF4Q2hhcmdlc1xuICAgICAgfSxcbiAgICAgIC8vIEZpbHRyYXIgc29sbyBsb3MgZGF0b3Mgc2VyaWFsaXphYmxlcyBkZSBsb3MgY29sb3JlcyAoc2luIGVsZW1lbnRvcyBET00pXG4gICAgICBjb2xvcnM6IGltYWdlU3RhdGUuYXZhaWxhYmxlQ29sb3JzLm1hcChjb2xvciA9PiAoe1xuICAgICAgICBpZDogY29sb3IuaWQsXG4gICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgIGI6IGNvbG9yLmJcbiAgICAgIH0pKSxcbiAgICAgIHJlbWFpbmluZ1BpeGVsczogaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMgfHwgW11cbiAgICB9O1xuXG4gICAgLy8gUGVyc2lzdGVuY2lhIGRlbCBvdmVybGF5IGRlIGltYWdlbiBlbGltaW5hZGE7IGVsIG92ZXJsYXkgZGUgcGxhbiBzZSBpbmZpZXJlIGRlc2RlIHJlbWFpbmluZ1BpeGVsc1xuICAgIFxuICAgIGNvbnN0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShwcm9ncmVzc0RhdGEsIG51bGwsIDIpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW2RhdGFTdHJdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICBcbiAgICBjb25zdCBmaW5hbEZpbGVuYW1lID0gZmlsZW5hbWUgfHwgYHdwbGFjZV9wcm9ncmVzc18ke2ltYWdlU3RhdGUub3JpZ2luYWxJbWFnZU5hbWUgfHwgJ2ltYWdlJ31fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTkpLnJlcGxhY2UoLzovZywgJy0nKX0uanNvbmA7XG4gICAgXG4gICAgLy8gQ3JlYXIgeSBkaXNwYXJhciBkZXNjYXJnYVxuICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gdXJsO1xuICAgIGxpbmsuZG93bmxvYWQgPSBmaW5hbEZpbGVuYW1lO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICBcbiAgICBsb2coYFx1MjcwNSBQcm9ncmVzbyBndWFyZGFkbzogJHtmaW5hbEZpbGVuYW1lfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGZpbGVuYW1lOiBmaW5hbEZpbGVuYW1lIH07XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKCdcdTI3NEMgRXJyb3IgZ3VhcmRhbmRvIHByb2dyZXNvOicsIGVycm9yKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFByb2dyZXNzKGZpbGUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyB3aW5kb3cuRmlsZVJlYWRlcigpO1xuICAgICAgXG4gICAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBwcm9ncmVzc0RhdGEgPSBKU09OLnBhcnNlKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gVmFsaWRhciBlc3RydWN0dXJhIGRlbCBhcmNoaXZvXG4gICAgICAgICAgY29uc3QgcmVxdWlyZWRGaWVsZHMgPSBbJ2ltYWdlRGF0YScsICdwcm9ncmVzcycsICdwb3NpdGlvbicsICdjb2xvcnMnXTtcbiAgICAgICAgICBjb25zdCBtaXNzaW5nRmllbGRzID0gcmVxdWlyZWRGaWVsZHMuZmlsdGVyKGZpZWxkID0+ICEoZmllbGQgaW4gcHJvZ3Jlc3NEYXRhKSk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKG1pc3NpbmdGaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW1wb3MgcmVxdWVyaWRvcyBmYWx0YW50ZXM6ICR7bWlzc2luZ0ZpZWxkcy5qb2luKCcsICcpfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAvLyBWZXJpZmljYXIgY29tcGF0aWJpbGlkYWQgZGUgY29sb3Jlc1xuICAgICAgICAgIGlmIChpbWFnZVN0YXRlLmF2YWlsYWJsZUNvbG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzYXZlZENvbG9ySWRzID0gcHJvZ3Jlc3NEYXRhLmNvbG9ycy5tYXAoYyA9PiBjLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb2xvcklkcyA9IGltYWdlU3RhdGUuYXZhaWxhYmxlQ29sb3JzLm1hcChjID0+IGMuaWQpO1xuICAgICAgICAgICAgY29uc3QgY29tbW9uQ29sb3JzID0gc2F2ZWRDb2xvcklkcy5maWx0ZXIoaWQgPT4gY3VycmVudENvbG9ySWRzLmluY2x1ZGVzKGlkKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjb21tb25Db2xvcnMubGVuZ3RoIDwgc2F2ZWRDb2xvcklkcy5sZW5ndGggKiAwLjgpIHtcbiAgICAgICAgICAgICAgbG9nKCdcdTI2QTBcdUZFMEYgTG9zIGNvbG9yZXMgZ3VhcmRhZG9zIG5vIGNvaW5jaWRlbiBjb21wbGV0YW1lbnRlIGNvbiBsb3MgYWN0dWFsZXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gUmVzdGF1cmFyIGVzdGFkb1xuICAgICAgICAgIGltYWdlU3RhdGUuaW1hZ2VEYXRhID0ge1xuICAgICAgICAgICAgLi4ucHJvZ3Jlc3NEYXRhLmltYWdlRGF0YSxcbiAgICAgICAgICAgIHBpeGVsczogW10gLy8gTG9zIHBcdTAwRUR4ZWxlcyBzZSByZWdlbmVyYXJcdTAwRTFuIHNpIGVzIG5lY2VzYXJpb1xuICAgICAgICAgIH07XG4gICAgICAgICAgXG4gICAgICAgICAgaW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzID0gcHJvZ3Jlc3NEYXRhLnByb2dyZXNzLnBhaW50ZWRQaXhlbHM7XG4gICAgICAgICAgaW1hZ2VTdGF0ZS50b3RhbFBpeGVscyA9IHByb2dyZXNzRGF0YS5wcm9ncmVzcy50b3RhbFBpeGVscztcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBNYW5lamFyIHRhbnRvIGZvcm1hdG8gb3JpZ2luYWwgY29tbyBtb2R1bGFyIHBhcmEgcG9zaWNpb25lc1xuICAgICAgICAgIGlmIChwcm9ncmVzc0RhdGEucHJvZ3Jlc3MubGFzdFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAvLyBGb3JtYXRvIG1vZHVsYXJcbiAgICAgICAgICAgIGltYWdlU3RhdGUubGFzdFBvc2l0aW9uID0gcHJvZ3Jlc3NEYXRhLnByb2dyZXNzLmxhc3RQb3NpdGlvbjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2dyZXNzRGF0YS5wb3NpdGlvbi5sYXN0WCAhPT0gdW5kZWZpbmVkICYmIHByb2dyZXNzRGF0YS5wb3NpdGlvbi5sYXN0WSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBGb3JtYXRvIG9yaWdpbmFsXG4gICAgICAgICAgICBpbWFnZVN0YXRlLmxhc3RQb3NpdGlvbiA9IHsgeDogcHJvZ3Jlc3NEYXRhLnBvc2l0aW9uLmxhc3RYLCB5OiBwcm9ncmVzc0RhdGEucG9zaXRpb24ubGFzdFkgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gTWFuZWphciB0YW50byBmb3JtYXRvIG9yaWdpbmFsIGNvbW8gbW9kdWxhciBwYXJhIHN0YXJ0UG9zaXRpb25cbiAgICAgICAgICBpZiAocHJvZ3Jlc3NEYXRhLnBvc2l0aW9uLnN0YXJ0UG9zaXRpb24pIHtcbiAgICAgICAgICAgIC8vIEZvcm1hdG8gbW9kdWxhclxuICAgICAgICAgICAgaW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uID0gcHJvZ3Jlc3NEYXRhLnBvc2l0aW9uLnN0YXJ0UG9zaXRpb247XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9ncmVzc0RhdGEucG9zaXRpb24uc3RhcnRYICE9PSB1bmRlZmluZWQgJiYgcHJvZ3Jlc3NEYXRhLnBvc2l0aW9uLnN0YXJ0WSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBGb3JtYXRvIG9yaWdpbmFsXG4gICAgICAgICAgICBpbWFnZVN0YXRlLnN0YXJ0UG9zaXRpb24gPSB7IHg6IHByb2dyZXNzRGF0YS5wb3NpdGlvbi5zdGFydFgsIHk6IHByb2dyZXNzRGF0YS5wb3NpdGlvbi5zdGFydFkgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaW1hZ2VTdGF0ZS50aWxlWCA9IHByb2dyZXNzRGF0YS5wb3NpdGlvbi50aWxlWDtcbiAgICAgICAgICBpbWFnZVN0YXRlLnRpbGVZID0gcHJvZ3Jlc3NEYXRhLnBvc2l0aW9uLnRpbGVZO1xuICAgICAgICAgIGltYWdlU3RhdGUub3JpZ2luYWxJbWFnZU5hbWUgPSBwcm9ncmVzc0RhdGEuaW1hZ2VEYXRhLm9yaWdpbmFsTmFtZTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBNYW5lamFyIHJlbWFpbmluZ1BpeGVscyB0YW50byBlbiBwcm9ncmVzcyBjb21vIGVuIHJhXHUwMEVEelxuICAgICAgICAgIGltYWdlU3RhdGUucmVtYWluaW5nUGl4ZWxzID0gcHJvZ3Jlc3NEYXRhLnJlbWFpbmluZ1BpeGVscyB8fCBwcm9ncmVzc0RhdGEucHJvZ3Jlc3MucmVtYWluaW5nUGl4ZWxzIHx8IFtdO1xuXG4gICAgICAgICAgLy8gQWN0dWFsaXphciBvdmVybGF5IGRlbCBwbGFuIGNvbiBsb3MgcFx1MDBFRHhlbGVzIHJlc3RhbnRlcyAoc2kgbG9zIGhheSlcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXykge1xuICAgICAgICAgICAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uaW5qZWN0U3R5bGVzKCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXy5zZXRFbmFibGVkKHRydWUpOyAvLyBBY3RpdmFyIGF1dG9tXHUwMEUxdGljYW1lbnRlIGFsIGNhcmdhciBwcm9ncmVzb1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gQ29uZmlndXJhciBhbmNsYSBzaSB0ZW5lbW9zIHBvc2ljaVx1MDBGM24gZGUgaW5pY2lvXG4gICAgICAgICAgICAgIGlmIChpbWFnZVN0YXRlLnN0YXJ0UG9zaXRpb24gJiYgaW1hZ2VTdGF0ZS50aWxlWCAhPT0gdW5kZWZpbmVkICYmIGltYWdlU3RhdGUudGlsZVkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXy5zZXRBbmNob3Ioe1xuICAgICAgICAgICAgICAgICAgdGlsZVg6IGltYWdlU3RhdGUudGlsZVgsXG4gICAgICAgICAgICAgICAgICB0aWxlWTogaW1hZ2VTdGF0ZS50aWxlWSxcbiAgICAgICAgICAgICAgICAgIHB4WDogaW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICBweFk6IGltYWdlU3RhdGUuc3RhcnRQb3NpdGlvbi55XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbG9nKGBcdTI3MDUgUGxhbiBvdmVybGF5IGFuY2xhZG8gY29uIHBvc2ljaVx1MDBGM24gY2FyZ2FkYTogdGlsZSgke2ltYWdlU3RhdGUudGlsZVh9LCR7aW1hZ2VTdGF0ZS50aWxlWX0pIGxvY2FsKCR7aW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uLnh9LCR7aW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uLnl9KWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uc2V0UGxhbihpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscywge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbmV4dEJhdGNoQ291bnQ6IGltYWdlU3RhdGUucGl4ZWxzUGVyQmF0Y2hcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBsb2coYFx1MjcwNSBQbGFuIG92ZXJsYXkgYWN0aXZhZG8gY29uICR7aW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMubGVuZ3RofSBwXHUwMEVEeGVsZXMgcmVzdGFudGVzYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgbG9nKCdcdTI2QTBcdUZFMEYgRXJyb3IgYWN0aXZhbmRvIHBsYW4gb3ZlcmxheSBhbCBjYXJnYXIgcHJvZ3Jlc286JywgZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmIChwcm9ncmVzc0RhdGEuY29uZmlnKSB7XG4gICAgICAgICAgICBpbWFnZVN0YXRlLnBpeGVsc1BlckJhdGNoID0gcHJvZ3Jlc3NEYXRhLmNvbmZpZy5waXhlbHNQZXJCYXRjaCB8fCBpbWFnZVN0YXRlLnBpeGVsc1BlckJhdGNoO1xuICAgICAgICAgICAgaW1hZ2VTdGF0ZS51c2VBbGxDaGFyZ2VzRmlyc3QgPSBwcm9ncmVzc0RhdGEuY29uZmlnLnVzZUFsbENoYXJnZXNGaXJzdCAhPT0gdW5kZWZpbmVkID8gXG4gICAgICAgICAgICAgIHByb2dyZXNzRGF0YS5jb25maWcudXNlQWxsQ2hhcmdlc0ZpcnN0IDogaW1hZ2VTdGF0ZS51c2VBbGxDaGFyZ2VzRmlyc3Q7XG4gICAgICAgICAgICBpbWFnZVN0YXRlLmlzRmlyc3RCYXRjaCA9IHByb2dyZXNzRGF0YS5jb25maWcuaXNGaXJzdEJhdGNoICE9PSB1bmRlZmluZWQgPyBcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NEYXRhLmNvbmZpZy5pc0ZpcnN0QmF0Y2ggOiB0cnVlOyAvLyBQb3IgZGVmZWN0bywgY29udGludWFyIGNvbW8gbm8gcHJpbWVyYSBwYXNhZGFcbiAgICAgICAgICAgIGltYWdlU3RhdGUubWF4Q2hhcmdlcyA9IHByb2dyZXNzRGF0YS5jb25maWcubWF4Q2hhcmdlcyB8fCBpbWFnZVN0YXRlLm1heENoYXJnZXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIE1hcmNhciBjb21vIGltYWdlbiBjYXJnYWRhIHkgbGlzdG8gcGFyYSBjb250aW51YXJcbiAgICAgICAgICBpbWFnZVN0YXRlLmltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICBpbWFnZVN0YXRlLmNvbG9yc0NoZWNrZWQgPSB0cnVlO1xuXG4gICAgICAgICAgLy8gWWEgbm8gc2UgcmVzdGF1cmEgb3ZlcmxheSBkZSBpbWFnZW47IGVsIG92ZXJsYXkgZGUgcGxhbiBzZSBsbGVuYSBtXHUwMEUxcyBhYmFqb1xuICAgICAgICAgIFxuICAgICAgICAgIGxvZyhgXHUyNzA1IFByb2dyZXNvIGNhcmdhZG86ICR7aW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzfS8ke2ltYWdlU3RhdGUudG90YWxQaXhlbHN9IHBcdTAwRUR4ZWxlc2ApO1xuICAgICAgICAgIFxuICAgICAgICAgIHJlc29sdmUoeyBcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsIFxuICAgICAgICAgICAgZGF0YTogcHJvZ3Jlc3NEYXRhLFxuICAgICAgICAgICAgcGFpbnRlZDogaW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzLFxuICAgICAgICAgICAgdG90YWw6IGltYWdlU3RhdGUudG90YWxQaXhlbHMsXG4gICAgICAgICAgICBjYW5Db250aW51ZTogaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMubGVuZ3RoID4gMFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICB9IGNhdGNoIChwYXJzZUVycm9yKSB7XG4gICAgICAgICAgbG9nKCdcdTI3NEMgRXJyb3IgcGFyc2VhbmRvIGFyY2hpdm8gZGUgcHJvZ3Jlc286JywgcGFyc2VFcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogcGFyc2VFcnJvci5tZXNzYWdlIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgXG4gICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSAnRXJyb3IgbGV5ZW5kbyBhcmNoaXZvJztcbiAgICAgICAgbG9nKCdcdTI3NEMnLCBlcnJvcik7XG4gICAgICAgIHJlc29sdmUoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3IgfSk7XG4gICAgICB9O1xuICAgICAgXG4gICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcbiAgICAgIFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ1x1Mjc0QyBFcnJvciBjYXJnYW5kbyBwcm9ncmVzbzonLCBlcnJvcik7XG4gICAgICByZXNvbHZlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclByb2dyZXNzKCkge1xuICBpbWFnZVN0YXRlLnBhaW50ZWRQaXhlbHMgPSAwO1xuICBpbWFnZVN0YXRlLnRvdGFsUGl4ZWxzID0gMDtcbiAgaW1hZ2VTdGF0ZS5sYXN0UG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfTtcbiAgaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMgPSBbXTtcbiAgaW1hZ2VTdGF0ZS5pbWFnZURhdGEgPSBudWxsO1xuICBpbWFnZVN0YXRlLnN0YXJ0UG9zaXRpb24gPSBudWxsO1xuICBpbWFnZVN0YXRlLmltYWdlTG9hZGVkID0gZmFsc2U7XG4gIGltYWdlU3RhdGUub3JpZ2luYWxJbWFnZU5hbWUgPSBudWxsO1xuICBpbWFnZVN0YXRlLmlzRmlyc3RCYXRjaCA9IHRydWU7IC8vIFJlc2V0ZWFyIHBhcmEgbnVldmEgaW1hZ2VuXG4gIGltYWdlU3RhdGUubmV4dEJhdGNoQ29vbGRvd24gPSAwO1xuICBcbiAgbG9nKCdcdUQ4M0VcdURERjkgUHJvZ3Jlc28gbGltcGlhZG8nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1Byb2dyZXNzKCkge1xuICByZXR1cm4gaW1hZ2VTdGF0ZS5pbWFnZUxvYWRlZCAmJiBcbiAgICAgICAgIGltYWdlU3RhdGUucGFpbnRlZFBpeGVscyA+IDAgJiYgXG4gICAgICAgICBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscyAmJiBcbiAgICAgICAgIGltYWdlU3RhdGUucmVtYWluaW5nUGl4ZWxzLmxlbmd0aCA+IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9ncmVzc0luZm8oKSB7XG4gIHJldHVybiB7XG4gICAgaGFzUHJvZ3Jlc3M6IGhhc1Byb2dyZXNzKCksXG4gICAgcGFpbnRlZDogaW1hZ2VTdGF0ZS5wYWludGVkUGl4ZWxzLFxuICAgIHRvdGFsOiBpbWFnZVN0YXRlLnRvdGFsUGl4ZWxzLFxuICAgIHJlbWFpbmluZzogaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMgPyBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscy5sZW5ndGggOiAwLFxuICAgIHBlcmNlbnRhZ2U6IGltYWdlU3RhdGUudG90YWxQaXhlbHMgPiAwID8gKGltYWdlU3RhdGUucGFpbnRlZFBpeGVscyAvIGltYWdlU3RhdGUudG90YWxQaXhlbHMgKiAxMDApIDogMCxcbiAgICBsYXN0UG9zaXRpb246IHsgLi4uaW1hZ2VTdGF0ZS5sYXN0UG9zaXRpb24gfSxcbiAgICBjYW5Db250aW51ZTogaGFzUHJvZ3Jlc3MoKVxuICB9O1xufVxuIiwgImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkb3dSb290KGhvc3RJZCA9IG51bGwpIHtcbiAgY29uc3QgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBpZiAoaG9zdElkKSB7XG4gICAgaG9zdC5pZCA9IGhvc3RJZDtcbiAgfVxuICBob3N0LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMTBweDtcbiAgICByaWdodDogMTBweDtcbiAgICB6LWluZGV4OiAyMTQ3NDgzNjQ3O1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xuICBgO1xuICBcbiAgY29uc3Qgcm9vdCA9IGhvc3QuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhvc3QpO1xuICBcbiAgcmV0dXJuIHsgaG9zdCwgcm9vdCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZURyYWdnYWJsZShkcmFnSGFuZGxlLCBlbGVtZW50KSB7XG4gIGxldCBwb3MxID0gMCwgcG9zMiA9IDAsIHBvczMgPSAwLCBwb3M0ID0gMDtcbiAgXG4gIGRyYWdIYW5kbGUuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICBkcmFnSGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGRyYWdNb3VzZURvd24pO1xuICBcbiAgZnVuY3Rpb24gZHJhZ01vdXNlRG93bihlKSB7XG4gICAgLy8gRXZpdGFyIGFycmFzdHJhIHNpIGVzIHVuIGJvdFx1MDBGM24gZGUgbGEgY2FiZWNlcmFcbiAgICBpZiAoZS50YXJnZXQuY2xvc2VzdCgnLmhlYWRlci1idG4sIC53cGxhY2UtaGVhZGVyLWJ0bicpKSByZXR1cm47XG4gICAgXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgcG9zNCA9IGUuY2xpZW50WTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgY2xvc2VEcmFnRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZWxlbWVudERyYWcpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBlbGVtZW50RHJhZyhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvczEgPSBwb3MzIC0gZS5jbGllbnRYO1xuICAgIHBvczIgPSBwb3M0IC0gZS5jbGllbnRZO1xuICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgcG9zNCA9IGUuY2xpZW50WTtcbiAgICBlbGVtZW50LnN0eWxlLnRvcCA9IChlbGVtZW50Lm9mZnNldFRvcCAtIHBvczIpICsgXCJweFwiO1xuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IChlbGVtZW50Lm9mZnNldExlZnQgLSBwb3MxKSArIFwicHhcIjtcbiAgfVxuICBcbiAgZnVuY3Rpb24gY2xvc2VEcmFnRWxlbWVudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgY2xvc2VEcmFnRWxlbWVudCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZWxlbWVudERyYWcpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2VyLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVTaGFkb3dSb290LCBtYWtlRHJhZ2dhYmxlIH0gZnJvbSBcIi4uL2NvcmUvdWktdXRpbHMuanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUltYWdlVUkoeyB0ZXh0cywgLi4uaGFuZGxlcnMgfSkge1xuICBsb2coJ1x1RDgzQ1x1REZBOCBDcmVhbmRvIGludGVyZmF6IGRlIEF1dG8tSW1hZ2UnKTtcbiAgXG4gIC8vIEFncmVnYXIgRm9udEF3ZXNvbWUgYWwgZG9jdW1lbnQuaGVhZCBzaSBubyBleGlzdGVcbiAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW2hyZWYqPVwiZm9udC1hd2Vzb21lXCJdJykpIHtcbiAgICBjb25zdCBmb250QXdlc29tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBmb250QXdlc29tZS5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgZm9udEF3ZXNvbWUuaHJlZiA9ICdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNi40LjAvY3NzL2FsbC5taW4uY3NzJztcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGZvbnRBd2Vzb21lKTtcbiAgICBsb2coJ1x1RDgzRFx1RENFNiBGb250QXdlc29tZSBhXHUwMEYxYWRpZG8gYWwgZG9jdW1lbnQuaGVhZCcpO1xuICB9XG4gIFxuICAvLyBDcmVhciBzaGFkb3cgcm9vdCBwYXJhIGFpc2xhbWllbnRvIGRlIGVzdGlsb3NcbiAgY29uc3QgeyBob3N0LCByb290IH0gPSBjcmVhdGVTaGFkb3dSb290KCk7XG4gIFxuICAvLyBDcmVhciBlc3RpbG9zXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgQGtleWZyYW1lcyBzbGlkZUluIHtcbiAgICAgIGZyb20geyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IG9wYWNpdHk6IDA7IH1cbiAgICAgIHRvIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyBvcGFjaXR5OiAxOyB9XG4gICAgfVxuICAgIEBrZXlmcmFtZXMgcHVsc2Uge1xuICAgICAgMCUgeyBib3gtc2hhZG93OiAwIDAgMCAwIHJnYmEoMCwgMjU1LCAwLCAwLjcpOyB9XG4gICAgICA3MCUgeyBib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwKTsgfVxuICAgICAgMTAwJSB7IGJveC1zaGFkb3c6IDAgMCAwIDAgcmdiYSgwLCAyNTUsIDAsIDApOyB9XG4gICAgfVxuICAgIFxuICAgIC5jb250YWluZXIge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgdG9wOiAyMHB4O1xuICAgICAgcmlnaHQ6IDIwcHg7XG4gICAgICB3aWR0aDogMzAwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgICBib3gtc2hhZG93OiAwIDVweCAxNXB4IHJnYmEoMCwwLDAsMC41KTtcbiAgICAgIHotaW5kZXg6IDk5OTg7XG4gICAgICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmO1xuICAgICAgY29sb3I6ICNlZWU7XG4gICAgICBhbmltYXRpb246IHNsaWRlSW4gMC40cyBlYXNlLW91dDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuICAgIFxuICAgIC5oZWFkZXIge1xuICAgICAgcGFkZGluZzogMTJweCAxNXB4O1xuICAgICAgYmFja2dyb3VuZDogIzJkMzc0ODtcbiAgICAgIGNvbG9yOiAjNjBhNWZhO1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgY3Vyc29yOiBtb3ZlO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC5oZWFkZXItdGl0bGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICB9XG4gICAgXG4gICAgLmhlYWRlci1jb250cm9scyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAxMHB4O1xuICAgIH1cbiAgICBcbiAgICAuaGVhZGVyLWJ0biB7XG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgY29sb3I6ICNlZWU7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBvcGFjaXR5OiAwLjc7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnM7XG4gICAgICBwYWRkaW5nOiA1cHg7XG4gICAgfVxuICAgIFxuICAgIC5oZWFkZXItYnRuOmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIFxuICAgIC5jb250ZW50IHtcbiAgICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gICAgXG4gICAgLmNvbnRyb2xzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZ2FwOiAxMHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgICB9XG4gICAgXG4gICAgLmNvbmZpZy1wYW5lbCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgYmFja2dyb3VuZDogIzJkMzc0ODtcbiAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgIH1cbiAgICBcbiAgICAuY29uZmlnLXBhbmVsLnZpc2libGUge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICAgIFxuICAgIC5jb25maWctaXRlbSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gICAgXG4gICAgLmNvbmZpZy1pbnB1dCB7XG4gICAgICB3aWR0aDogNjBweDtcbiAgICAgIHBhZGRpbmc6IDRweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgY29sb3I6ICNlZWU7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIFxuICAgIC5jb25maWctY2hlY2tib3gge1xuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgfVxuICAgIFxuICAgIC5tYWluLWNvbmZpZyB7XG4gICAgICBiYWNrZ3JvdW5kOiAjMmQzNzQ4O1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjM2E0NTUzO1xuICAgIH1cbiAgICBcbiAgICAuY29uZmlnLXJvdyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTBweDtcbiAgICB9XG4gICAgXG4gICAgLmNvbmZpZy1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBjb2xvcjogI2NiZDVlMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgfVxuICAgIFxuICAgIC5iYXRjaC12YWx1ZSwgLmNvb2xkb3duLXZhbHVlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgY29sb3I6ICM2MGE1ZmE7XG4gICAgfVxuICAgIFxuICAgIC5idG4ge1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gICAgXG4gICAgLmJ0bjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gICAgfVxuICAgIFxuICAgIC5idG46ZGlzYWJsZWQge1xuICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICAgIHRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgICBcbiAgICAuYnRuLXByaW1hcnkge1xuICAgICAgYmFja2dyb3VuZDogIzYwYTVmYTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB9XG4gICAgXG4gICAgLmJ0bi11cGxvYWQge1xuICAgICAgYmFja2dyb3VuZDogIzJkMzc0ODtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlcjogMXB4IGRhc2hlZCAjZWVlO1xuICAgIH1cbiAgICBcbiAgICAuYnRuLWxvYWQge1xuICAgICAgYmFja2dyb3VuZDogIzIxOTZGMztcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB9XG4gICAgXG4gICAgLmJ0bi1zdGFydCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjMTBiOTgxO1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgICBcbiAgICAuYnRuLXN0b3Age1xuICAgICAgYmFja2dyb3VuZDogI2VmNDQ0NDtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB9XG4gICAgXG4gICAgLmJ0bi1zZWxlY3Qge1xuICAgICAgYmFja2dyb3VuZDogI2Y1OWUwYjtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICB9XG4gICAgXG4gICAgLnByb2dyZXNzIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogIzJkMzc0ODtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIG1hcmdpbjogMTBweCAwO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGhlaWdodDogMTBweDtcbiAgICB9XG4gICAgXG4gICAgLnByb2dyZXNzLWJhciB7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBiYWNrZ3JvdW5kOiAjNjBhNWZhO1xuICAgICAgdHJhbnNpdGlvbjogd2lkdGggMC4zcztcbiAgICAgIHdpZHRoOiAwJTtcbiAgICB9XG4gICAgXG4gICAgLnN0YXRzIHtcbiAgICAgIGJhY2tncm91bmQ6ICMyZDM3NDg7XG4gICAgICBwYWRkaW5nOiAxMnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgICB9XG4gICAgXG4gICAgLnN0YXQtaXRlbSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgcGFkZGluZzogNnB4IDA7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICAgIFxuICAgIC5zdGF0LWxhYmVsIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBvcGFjaXR5OiAwLjg7XG4gICAgfVxuICAgIFxuICAgIC5zdGF0dXMge1xuICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgIH1cbiAgICBcbiAgICAuc3RhdHVzLWRlZmF1bHQge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjEpO1xuICAgIH1cbiAgICBcbiAgICAuc3RhdHVzLXN1Y2Nlc3Mge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAyNTUsIDAsIDAuMSk7XG4gICAgICBjb2xvcjogIzEwYjk4MTtcbiAgICB9XG4gICAgXG4gICAgLnN0YXR1cy1lcnJvciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMCwgMCwgMC4xKTtcbiAgICAgIGNvbG9yOiAjZWY0NDQ0O1xuICAgIH1cbiAgICBcbiAgICAuc3RhdHVzLXdhcm5pbmcge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDE2NSwgMCwgMC4xKTtcbiAgICAgIGNvbG9yOiBvcmFuZ2U7XG4gICAgfVxuICAgIFxuICAgIC5zdGF0dXMtaW5mbyB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDE1MCwgMjU1LCAwLjEpO1xuICAgICAgY29sb3I6ICM2MGE1ZmE7XG4gICAgfVxuICAgIFxuICAgIC5taW5pbWl6ZWQgLmNvbnRlbnQge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgXG4gICAgLm1vZGFsLW92ZXJsYXkge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjcpO1xuICAgICAgei1pbmRleDogMTAwMDE7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIH1cbiAgICBcbiAgICAubW9kYWwge1xuICAgICAgYmFja2dyb3VuZDogIzFhMWExYTtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMzMzM7XG4gICAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgICAgcGFkZGluZzogMjVweDtcbiAgICAgIGNvbG9yOiAjZWVlO1xuICAgICAgbWluLXdpZHRoOiAzNTBweDtcbiAgICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgICBib3gtc2hhZG93OiAwIDEwcHggMzBweCByZ2JhKDAsMCwwLDAuNSk7XG4gICAgfVxuICAgIFxuICAgIC5tb2RhbCBoMyB7XG4gICAgICBtYXJnaW46IDAgMCAxNXB4IDA7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxuICAgIFxuICAgIC5tb2RhbCBwIHtcbiAgICAgIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgfVxuICAgIFxuICAgIC5tb2RhbC1idXR0b25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDEwcHg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG4gICAgXG4gICAgLm1vZGFsLWJ0biB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICAgICAgbWluLXdpZHRoOiAxMDBweDtcbiAgICB9XG4gICAgXG4gICAgLm1vZGFsLWJ0bi1zYXZlIHtcbiAgICAgIGJhY2tncm91bmQ6ICMxMGI5ODE7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuICAgIFxuICAgIC5tb2RhbC1idG4tZGlzY2FyZCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZWY0NDQ0O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgICBcbiAgICAubW9kYWwtYnRuLWNhbmNlbCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjMmQzNzQ4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgICBcbiAgICAubW9kYWwtYnRuOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgICB9XG4gICAgXG4gICAgLyogUmVzaXplIERpYWxvZyBTdHlsZXMgKi9cbiAgICAucmVzaXplLW92ZXJsYXkge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjcpO1xuICAgICAgei1pbmRleDogOTk5OTtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC5yZXNpemUtY29udGFpbmVyIHtcbiAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIHotaW5kZXg6IDEwMDAwO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDIwcHggcmdiYSgwLDAsMCwwLjUpO1xuICAgICAgbWF4LXdpZHRoOiA5MCU7XG4gICAgICBtYXgtaGVpZ2h0OiA5MCU7XG4gICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgXG4gICAgLnJlc2l6ZS1jb250YWluZXIgaDMge1xuICAgICAgbWFyZ2luOiAwIDAgMTVweCAwO1xuICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgfVxuICAgIFxuICAgIC5yZXNpemUtY29udHJvbHMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBnYXA6IDEwcHg7XG4gICAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgIH1cbiAgICBcbiAgICAucmVzaXplLWNvbnRyb2xzIGxhYmVsIHtcbiAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgICBcbiAgICAucmVzaXplLXNsaWRlciB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbjogNXB4IDA7XG4gICAgfVxuICAgIFxuICAgIC5yZXNpemUtcHJldmlldyB7XG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICBtYXgtaGVpZ2h0OiAzMDBweDtcbiAgICAgIG1hcmdpbjogMTBweCAwO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgICBcbiAgICAucmVzaXplLWJ1dHRvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMTBweDtcbiAgICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgfVxuICBgO1xuICByb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgXG4gIC8vIENyZWFyIGNvbnRlbmVkb3IgcHJpbmNpcGFsXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci10aXRsZVwiPlxuICAgICAgICBcdUQ4M0RcdUREQkNcdUZFMEZcbiAgICAgICAgPHNwYW4+JHt0ZXh0cy50aXRsZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItY29udHJvbHNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idG4gY29uZmlnLWJ0blwiIHRpdGxlPVwiQ29uZmlndXJhY2lcdTAwRjNuXCI+XG4gICAgICAgICAgXHUyNjk5XHVGRTBGXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ0biBtaW5pbWl6ZS1idG5cIiB0aXRsZT1cIiR7dGV4dHMubWluaW1pemV9XCI+XG4gICAgICAgICAgXHUyNzk2XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb25maWctcGFuZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbmZpZy1pdGVtXCI+XG4gICAgICAgICAgPGxhYmVsPiR7dGV4dHMuYmF0Y2hTaXplfTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbmZpZy1pbnB1dCBwaXhlbHMtcGVyLWJhdGNoXCIgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCI1MFwiIHZhbHVlPVwiMjBcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWctaXRlbVwiPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbmZpZy1jaGVja2JveCB1c2UtYWxsLWNoYXJnZXNcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPlxuICAgICAgICAgICAgJHt0ZXh0cy51c2VBbGxDaGFyZ2VzfVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnLWl0ZW1cIj5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb25maWctY2hlY2tib3ggc2hvdy1vdmVybGF5XCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD5cbiAgICAgICAgICAgICR7dGV4dHMuc2hvd092ZXJsYXkgfHwgJ01vc3RyYXIgb3ZlcmxheSd9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPCEtLSBDb25maWd1cmFjaVx1MDBGM24gdmlzaWJsZSBlbiBsYSBpbnRlcmZheiBwcmluY2lwYWwgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwibWFpbi1jb25maWdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbmZpZy1yb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnLWxhYmVsXCI+XG4gICAgICAgICAgICBcdUQ4M0NcdURGQUYgJHt0ZXh0cy5iYXRjaFNpemV9OlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXRjaC12YWx1ZVwiPjIwPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWctbGFiZWxcIj5cbiAgICAgICAgICAgIFx1MjNGMVx1RkUwRiAke3RleHRzLm5leHRCYXRjaFRpbWV9OlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb29sZG93bi12YWx1ZVwiPi0tPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBpbml0LWJ0blwiPlxuICAgICAgICAgIFx1RDgzRVx1REQxNlxuICAgICAgICAgIDxzcGFuPiR7dGV4dHMuaW5pdEJvdH08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi11cGxvYWQgdXBsb2FkLWJ0blwiIGRpc2FibGVkPlxuICAgICAgICAgIFx1RDgzRFx1RENFNFxuICAgICAgICAgIDxzcGFuPiR7dGV4dHMudXBsb2FkSW1hZ2V9PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbG9hZCBsb2FkLXByb2dyZXNzLWJ0blwiIGRpc2FibGVkPlxuICAgICAgICAgIFx1RDgzRFx1RENDMVxuICAgICAgICAgIDxzcGFuPiR7dGV4dHMubG9hZFByb2dyZXNzfTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgcmVzaXplLWJ0blwiIGRpc2FibGVkPlxuICAgICAgICAgIFx1RDgzRFx1REQwNFxuICAgICAgICAgIDxzcGFuPiR7dGV4dHMucmVzaXplSW1hZ2V9PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2VsZWN0IHNlbGVjdC1wb3MtYnRuXCIgZGlzYWJsZWQ+XG4gICAgICAgICAgXHVEODNDXHVERkFGXG4gICAgICAgICAgPHNwYW4+JHt0ZXh0cy5zZWxlY3RQb3NpdGlvbn08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdGFydCBzdGFydC1idG5cIiBkaXNhYmxlZD5cbiAgICAgICAgICBcdTI1QjZcdUZFMEZcbiAgICAgICAgICA8c3Bhbj4ke3RleHRzLnN0YXJ0UGFpbnRpbmd9PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3RvcCBzdG9wLWJ0blwiIGRpc2FibGVkPlxuICAgICAgICAgIFx1MjNGOVx1RkUwRlxuICAgICAgICAgIDxzcGFuPiR7dGV4dHMuc3RvcFBhaW50aW5nfTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzPVwic3RhdHNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRzLWFyZWFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1pdGVtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1sYWJlbFwiPlx1MjEzOVx1RkUwRiAke3RleHRzLmluaXRNZXNzYWdlfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzPVwic3RhdHVzIHN0YXR1cy1kZWZhdWx0XCI+XG4gICAgICAgICR7dGV4dHMud2FpdGluZ0luaXR9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcbiAgXG4gIHJvb3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgXG4gIC8vIElucHV0IG9jdWx0byBwYXJhIGFyY2hpdm9zXG4gIGNvbnN0IGZpbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGZpbGVJbnB1dC50eXBlID0gJ2ZpbGUnO1xuICBmaWxlSW5wdXQuYWNjZXB0ID0gJ2ltYWdlL3BuZyxpbWFnZS9qcGVnJztcbiAgZmlsZUlucHV0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJvb3QuYXBwZW5kQ2hpbGQoZmlsZUlucHV0KTtcbiAgXG4gIGNvbnN0IHByb2dyZXNzRmlsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgcHJvZ3Jlc3NGaWxlSW5wdXQudHlwZSA9ICdmaWxlJztcbiAgcHJvZ3Jlc3NGaWxlSW5wdXQuYWNjZXB0ID0gJy5qc29uJztcbiAgcHJvZ3Jlc3NGaWxlSW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcm9vdC5hcHBlbmRDaGlsZChwcm9ncmVzc0ZpbGVJbnB1dCk7XG4gIFxuICAvLyBNb2RhbCBkZSByZXNpemVcbiAgY29uc3QgcmVzaXplT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICByZXNpemVPdmVybGF5LmNsYXNzTmFtZSA9ICdyZXNpemUtb3ZlcmxheSc7XG4gIHJvb3QuYXBwZW5kQ2hpbGQocmVzaXplT3ZlcmxheSk7XG4gIFxuICBjb25zdCByZXNpemVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcmVzaXplQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdyZXNpemUtY29udGFpbmVyJztcbiAgcmVzaXplQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8aDM+JHt0ZXh0cy5yZXNpemVJbWFnZX08L2gzPlxuICAgIDxkaXYgY2xhc3M9XCJyZXNpemUtY29udHJvbHNcIj5cbiAgICAgIDxsYWJlbD5cbiAgICAgICAgJHt0ZXh0cy53aWR0aH06IDxzcGFuIGNsYXNzPVwid2lkdGgtdmFsdWVcIj4wPC9zcGFuPnB4XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBjbGFzcz1cInJlc2l6ZS1zbGlkZXIgd2lkdGgtc2xpZGVyXCIgbWluPVwiMTBcIiBtYXg9XCI1MDBcIiB2YWx1ZT1cIjEwMFwiPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxsYWJlbD5cbiAgICAgICAgJHt0ZXh0cy5oZWlnaHR9OiA8c3BhbiBjbGFzcz1cImhlaWdodC12YWx1ZVwiPjA8L3NwYW4+cHhcbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGNsYXNzPVwicmVzaXplLXNsaWRlciBoZWlnaHQtc2xpZGVyXCIgbWluPVwiMTBcIiBtYXg9XCI1MDBcIiB2YWx1ZT1cIjEwMFwiPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxsYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwia2VlcC1hc3BlY3RcIiBjaGVja2VkPlxuICAgICAgICAke3RleHRzLmtlZXBBc3BlY3R9XG4gICAgICA8L2xhYmVsPlxuICAgICAgPGltZyBjbGFzcz1cInJlc2l6ZS1wcmV2aWV3XCIgc3JjPVwiXCIgYWx0PVwiUHJldmlld1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInJlc2l6ZS1idXR0b25zXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgY29uZmlybS1yZXNpemVcIj5cbiAgICAgICAgICBcdTI3MDVcbiAgICAgICAgICA8c3Bhbj4ke3RleHRzLmFwcGx5fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN0b3AgY2FuY2VsLXJlc2l6ZVwiPlxuICAgICAgICAgIFx1Mjc0Q1xuICAgICAgICAgIDxzcGFuPiR7dGV4dHMuY2FuY2VsfTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcbiAgcm9vdC5hcHBlbmRDaGlsZChyZXNpemVDb250YWluZXIpO1xuICBcbiAgLy8gUmVmZXJlbmNpYXMgYSBlbGVtZW50b3NcbiAgY29uc3QgZWxlbWVudHMgPSB7XG4gICAgaGVhZGVyOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLFxuICAgIGNvbmZpZ0J0bjogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jb25maWctYnRuJyksXG4gICAgbWluaW1pemVCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubWluaW1pemUtYnRuJyksXG4gICAgY29uZmlnUGFuZWw6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY29uZmlnLXBhbmVsJyksXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucGl4ZWxzLXBlci1iYXRjaCcpLFxuICAgIHVzZUFsbENoYXJnZXM6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcudXNlLWFsbC1jaGFyZ2VzJyksXG4gICAgc2hvd092ZXJsYXk6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc2hvdy1vdmVybGF5JyksXG4gICAgYmF0Y2hWYWx1ZTogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5iYXRjaC12YWx1ZScpLFxuICAgIGNvb2xkb3duVmFsdWU6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY29vbGRvd24tdmFsdWUnKSxcbiAgICBpbml0QnRuOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmluaXQtYnRuJyksXG4gICAgdXBsb2FkQnRuOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnVwbG9hZC1idG4nKSxcbiAgICBsb2FkUHJvZ3Jlc3NCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubG9hZC1wcm9ncmVzcy1idG4nKSxcbiAgICByZXNpemVCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmVzaXplLWJ0bicpLFxuICAgIHNlbGVjdFBvc0J0bjogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtcG9zLWJ0bicpLFxuICAgIHN0YXJ0QnRuOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ0bicpLFxuICAgIHN0b3BCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3RvcC1idG4nKSxcbiAgICBwcm9ncmVzc0JhcjogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1iYXInKSxcbiAgICBzdGF0c0FyZWE6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3RhdHMtYXJlYScpLFxuICAgIHN0YXR1czogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKSxcbiAgICBjb250ZW50OiBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxuICB9O1xuICBcbiAgLy8gUmVmZXJlbmNpYXMgYSBlbGVtZW50b3MgZGVsIHJlc2l6ZSBkaWFsb2dcbiAgY29uc3QgcmVzaXplRWxlbWVudHMgPSB7XG4gICAgb3ZlcmxheTogcmVzaXplT3ZlcmxheSxcbiAgICBjb250YWluZXI6IHJlc2l6ZUNvbnRhaW5lcixcbiAgICB3aWR0aFNsaWRlcjogcmVzaXplQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy53aWR0aC1zbGlkZXInKSxcbiAgICBoZWlnaHRTbGlkZXI6IHJlc2l6ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaGVpZ2h0LXNsaWRlcicpLFxuICAgIHdpZHRoVmFsdWU6IHJlc2l6ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcud2lkdGgtdmFsdWUnKSxcbiAgICBoZWlnaHRWYWx1ZTogcmVzaXplQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5oZWlnaHQtdmFsdWUnKSxcbiAgICBrZWVwQXNwZWN0OiByZXNpemVDb250YWluZXIucXVlcnlTZWxlY3RvcignLmtlZXAtYXNwZWN0JyksXG4gICAgcHJldmlldzogcmVzaXplQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemUtcHJldmlldycpLFxuICAgIGNvbmZpcm1CdG46IHJlc2l6ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1yZXNpemUnKSxcbiAgICBjYW5jZWxCdG46IHJlc2l6ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLXJlc2l6ZScpXG4gIH07XG4gIFxuICAvLyBFc3RhZG8gZGUgbGEgVUlcbiAgbGV0IHN0YXRlID0ge1xuICAgIG1pbmltaXplZDogZmFsc2UsXG4gICAgY29uZmlnVmlzaWJsZTogZmFsc2VcbiAgfTtcbiAgXG4gIC8vIEhhY2VyIGRyYWdnYWJsZVxuICBtYWtlRHJhZ2dhYmxlKGVsZW1lbnRzLmhlYWRlciwgY29udGFpbmVyKTtcbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVyc1xuICBlbGVtZW50cy5taW5pbWl6ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzdGF0ZS5taW5pbWl6ZWQgPSAhc3RhdGUubWluaW1pemVkO1xuICAgIGlmIChzdGF0ZS5taW5pbWl6ZWQpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtaW5pbWl6ZWQnKTtcbiAgICAgIGVsZW1lbnRzLm1pbmltaXplQnRuLmlubmVySFRNTCA9ICdcdUQ4M0RcdUREM0MnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnbWluaW1pemVkJyk7XG4gICAgICBlbGVtZW50cy5taW5pbWl6ZUJ0bi5pbm5lckhUTUwgPSAnXHVEODNEXHVERDNEJztcbiAgICB9XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuY29uZmlnQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHN0YXRlLmNvbmZpZ1Zpc2libGUgPSAhc3RhdGUuY29uZmlnVmlzaWJsZTtcbiAgICBpZiAoc3RhdGUuY29uZmlnVmlzaWJsZSkge1xuICAgICAgZWxlbWVudHMuY29uZmlnUGFuZWwuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuICAgICAgZWxlbWVudHMuY29uZmlnQnRuLmlubmVySFRNTCA9ICdcdTI3NEMnO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50cy5jb25maWdQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG4gICAgICBlbGVtZW50cy5jb25maWdCdG4uaW5uZXJIVE1MID0gJ1x1MjY5OVx1RkUwRic7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVycyBwYXJhIGNvbmZpZ3VyYWNpXHUwMEYzblxuICBlbGVtZW50cy5waXhlbHNQZXJCYXRjaC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUludChlbGVtZW50cy5waXhlbHNQZXJCYXRjaC52YWx1ZSkgfHwgMjA7XG4gICAgZWxlbWVudHMuYmF0Y2hWYWx1ZS50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgY29uZmlndXJhY2lcdTAwRjNuIHNpIGhheSBoYW5kbGVyc1xuICAgIGlmIChoYW5kbGVycy5vbkNvbmZpZ0NoYW5nZSkge1xuICAgICAgaGFuZGxlcnMub25Db25maWdDaGFuZ2UoeyBwaXhlbHNQZXJCYXRjaDogdmFsdWUgfSk7XG4gICAgfVxuICB9KTtcbiAgXG4gIGVsZW1lbnRzLnVzZUFsbENoYXJnZXMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGlmIChoYW5kbGVycy5vbkNvbmZpZ0NoYW5nZSkge1xuICAgICAgaGFuZGxlcnMub25Db25maWdDaGFuZ2UoeyB1c2VBbGxDaGFyZ2VzOiBlbGVtZW50cy51c2VBbGxDaGFyZ2VzLmNoZWNrZWQgfSk7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGhhYmlsaXRhciBib3RvbmVzIGRlc3B1XHUwMEU5cyBkZSBpbmljaWFsaXphY2lcdTAwRjNuIGV4aXRvc2FcbiAgZnVuY3Rpb24gZW5hYmxlQnV0dG9uc0FmdGVySW5pdCgpIHtcbiAgICBlbGVtZW50cy51cGxvYWRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBlbGVtZW50cy5sb2FkUHJvZ3Jlc3NCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBcbiAgZWxlbWVudHMuaW5pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBlbGVtZW50cy5pbml0QnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBpZiAoaGFuZGxlcnMub25Jbml0Qm90KSB7XG4gICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgaGFuZGxlcnMub25Jbml0Qm90KCk7XG4gICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBlbmFibGVCdXR0b25zQWZ0ZXJJbml0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnRzLmluaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgfSk7XG4gIFxuICBlbGVtZW50cy51cGxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZmlsZUlucHV0LmNsaWNrKCk7XG4gIH0pO1xuICBcbiAgZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoZmlsZUlucHV0LmZpbGVzLmxlbmd0aCA+IDAgJiYgaGFuZGxlcnMub25VcGxvYWRJbWFnZSkge1xuICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IGhhbmRsZXJzLm9uVXBsb2FkSW1hZ2UoZmlsZUlucHV0LmZpbGVzWzBdKTtcbiAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgIGVsZW1lbnRzLnNlbGVjdFBvc0J0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBlbGVtZW50cy5yZXNpemVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBcbiAgZWxlbWVudHMubG9hZFByb2dyZXNzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHByb2dyZXNzRmlsZUlucHV0LmNsaWNrKCk7XG4gIH0pO1xuICBcbiAgcHJvZ3Jlc3NGaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChwcm9ncmVzc0ZpbGVJbnB1dC5maWxlcy5sZW5ndGggPiAwICYmIGhhbmRsZXJzLm9uTG9hZFByb2dyZXNzKSB7XG4gICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgaGFuZGxlcnMub25Mb2FkUHJvZ3Jlc3MocHJvZ3Jlc3NGaWxlSW5wdXQuZmlsZXNbMF0pO1xuICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgZWxlbWVudHMuc2VsZWN0UG9zQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIGVsZW1lbnRzLnN0YXJ0QnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIGVsZW1lbnRzLnJlc2l6ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIFxuICBlbGVtZW50cy5yZXNpemVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKGhhbmRsZXJzLm9uUmVzaXplSW1hZ2UpIHtcbiAgICAgIGhhbmRsZXJzLm9uUmVzaXplSW1hZ2UoKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuc2VsZWN0UG9zQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChoYW5kbGVycy5vblNlbGVjdFBvc2l0aW9uKSB7XG4gICAgICBlbGVtZW50cy5zZWxlY3RQb3NCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IGhhbmRsZXJzLm9uU2VsZWN0UG9zaXRpb24oKTtcbiAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgIGVsZW1lbnRzLnN0YXJ0QnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbGVtZW50cy5zZWxlY3RQb3NCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIENoZWNrYm94IG1vc3RyYXIgb3ZlcmxheVxuICBlbGVtZW50cy5zaG93T3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKCF3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18pIHJldHVybjtcbiAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uaW5qZWN0U3R5bGVzKCk7XG4gICAgY29uc3QgaXNFbmFibGVkID0gZWxlbWVudHMuc2hvd092ZXJsYXkuY2hlY2tlZDtcbiAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uc2V0RW5hYmxlZChpc0VuYWJsZWQpO1xuICB9KTtcbiAgXG4gIGVsZW1lbnRzLnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChoYW5kbGVycy5vblN0YXJ0UGFpbnRpbmcpIHtcbiAgICAgIGVsZW1lbnRzLnN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGVsZW1lbnRzLnN0b3BCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBoYW5kbGVycy5vblN0YXJ0UGFpbnRpbmcoKTtcbiAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICBlbGVtZW50cy5zdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBlbGVtZW50cy5zdG9wQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuc3RvcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoaGFuZGxlcnMub25TdG9wUGFpbnRpbmcpIHtcbiAgICAgIGNvbnN0IHNob3VsZFN0b3AgPSBhd2FpdCBoYW5kbGVycy5vblN0b3BQYWludGluZygpO1xuICAgICAgaWYgKHNob3VsZFN0b3ApIHtcbiAgICAgICAgZWxlbWVudHMuc3RhcnRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgZWxlbWVudHMuc3RvcEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIGFjdHVhbGl6YXIgZWwgZXN0YWRvXG4gIGZ1bmN0aW9uIHNldFN0YXR1cyhtZXNzYWdlLCB0eXBlID0gJ2RlZmF1bHQnKSB7XG4gICAgZWxlbWVudHMuc3RhdHVzLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICBlbGVtZW50cy5zdGF0dXMuY2xhc3NOYW1lID0gYHN0YXR1cyBzdGF0dXMtJHt0eXBlfWA7XG4gICAgZWxlbWVudHMuc3RhdHVzLnN0eWxlLmFuaW1hdGlvbiA9ICdub25lJztcbiAgICB2b2lkIGVsZW1lbnRzLnN0YXR1cy5vZmZzZXRXaWR0aDtcbiAgICBlbGVtZW50cy5zdGF0dXMuc3R5bGUuYW5pbWF0aW9uID0gJ3NsaWRlSW4gMC4zcyBlYXNlLW91dCc7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHNob3dSZXNpemVEaWFsb2cocHJvY2Vzc29yKSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBwcm9jZXNzb3IuZ2V0RGltZW5zaW9ucygpO1xuICAgIGNvbnN0IGFzcGVjdFJhdGlvID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgXG4gICAgLy8gSW5pY2lhbGl6YXIgdmFsb3Jlc1xuICAgIHJlc2l6ZUVsZW1lbnRzLndpZHRoU2xpZGVyLnZhbHVlID0gd2lkdGg7XG4gICAgcmVzaXplRWxlbWVudHMuaGVpZ2h0U2xpZGVyLnZhbHVlID0gaGVpZ2h0O1xuICAgIHJlc2l6ZUVsZW1lbnRzLndpZHRoVmFsdWUudGV4dENvbnRlbnQgPSB3aWR0aDtcbiAgICByZXNpemVFbGVtZW50cy5oZWlnaHRWYWx1ZS50ZXh0Q29udGVudCA9IGhlaWdodDtcbiAgICByZXNpemVFbGVtZW50cy5wcmV2aWV3LnNyYyA9IHByb2Nlc3Nvci5pbWcuc3JjO1xuICAgIFxuICAgIC8vIE1vc3RyYXIgbW9kYWxcbiAgICByZXNpemVFbGVtZW50cy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHJlc2l6ZUVsZW1lbnRzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBcbiAgICBjb25zdCB1cGRhdGVQcmV2aWV3ID0gKCkgPT4ge1xuICAgICAgY29uc3QgbmV3V2lkdGggPSBwYXJzZUludChyZXNpemVFbGVtZW50cy53aWR0aFNsaWRlci52YWx1ZSk7XG4gICAgICBjb25zdCBuZXdIZWlnaHQgPSBwYXJzZUludChyZXNpemVFbGVtZW50cy5oZWlnaHRTbGlkZXIudmFsdWUpO1xuICAgICAgXG4gICAgICByZXNpemVFbGVtZW50cy53aWR0aFZhbHVlLnRleHRDb250ZW50ID0gbmV3V2lkdGg7XG4gICAgICByZXNpemVFbGVtZW50cy5oZWlnaHRWYWx1ZS50ZXh0Q29udGVudCA9IG5ld0hlaWdodDtcbiAgICAgIFxuICAgICAgcmVzaXplRWxlbWVudHMucHJldmlldy5zcmMgPSBwcm9jZXNzb3IuZ2VuZXJhdGVQcmV2aWV3KG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xuICAgIH07XG4gICAgXG4gICAgLy8gRXZlbnQgbGlzdGVuZXJzIHBhcmEgc2xpZGVyc1xuICAgIGNvbnN0IG9uV2lkdGhDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZiAocmVzaXplRWxlbWVudHMua2VlcEFzcGVjdC5jaGVja2VkKSB7XG4gICAgICAgIGNvbnN0IG5ld1dpZHRoID0gcGFyc2VJbnQocmVzaXplRWxlbWVudHMud2lkdGhTbGlkZXIudmFsdWUpO1xuICAgICAgICBjb25zdCBuZXdIZWlnaHQgPSBNYXRoLnJvdW5kKG5ld1dpZHRoIC8gYXNwZWN0UmF0aW8pO1xuICAgICAgICByZXNpemVFbGVtZW50cy5oZWlnaHRTbGlkZXIudmFsdWUgPSBuZXdIZWlnaHQ7XG4gICAgICB9XG4gICAgICB1cGRhdGVQcmV2aWV3KCk7XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBvbkhlaWdodENoYW5nZSA9ICgpID0+IHtcbiAgICAgIGlmIChyZXNpemVFbGVtZW50cy5rZWVwQXNwZWN0LmNoZWNrZWQpIHtcbiAgICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gcGFyc2VJbnQocmVzaXplRWxlbWVudHMuaGVpZ2h0U2xpZGVyLnZhbHVlKTtcbiAgICAgICAgY29uc3QgbmV3V2lkdGggPSBNYXRoLnJvdW5kKG5ld0hlaWdodCAqIGFzcGVjdFJhdGlvKTtcbiAgICAgICAgcmVzaXplRWxlbWVudHMud2lkdGhTbGlkZXIudmFsdWUgPSBuZXdXaWR0aDtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZVByZXZpZXcoKTtcbiAgICB9O1xuICAgIFxuICAgIC8vIEFcdTAwRjFhZGlyIGV2ZW50IGxpc3RlbmVycyB0ZW1wb3JhbGVzXG4gICAgcmVzaXplRWxlbWVudHMud2lkdGhTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbldpZHRoQ2hhbmdlKTtcbiAgICByZXNpemVFbGVtZW50cy5oZWlnaHRTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkhlaWdodENoYW5nZSk7XG4gICAgXG4gICAgLy8gRXZlbnQgbGlzdGVuZXIgcGFyYSBjb25maXJtYXJcbiAgICBjb25zdCBvbkNvbmZpcm0gPSAoKSA9PiB7XG4gICAgICBjb25zdCBuZXdXaWR0aCA9IHBhcnNlSW50KHJlc2l6ZUVsZW1lbnRzLndpZHRoU2xpZGVyLnZhbHVlKTtcbiAgICAgIGNvbnN0IG5ld0hlaWdodCA9IHBhcnNlSW50KHJlc2l6ZUVsZW1lbnRzLmhlaWdodFNsaWRlci52YWx1ZSk7XG4gICAgICBcbiAgICAgIGlmIChoYW5kbGVycy5vbkNvbmZpcm1SZXNpemUpIHtcbiAgICAgICAgaGFuZGxlcnMub25Db25maXJtUmVzaXplKHByb2Nlc3NvciwgbmV3V2lkdGgsIG5ld0hlaWdodCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNsb3NlUmVzaXplRGlhbG9nKCk7XG4gICAgfTtcbiAgICBcbiAgICAvLyBFdmVudCBsaXN0ZW5lciBwYXJhIGNhbmNlbGFyXG4gICAgY29uc3Qgb25DYW5jZWwgPSAoKSA9PiB7XG4gICAgICBjbG9zZVJlc2l6ZURpYWxvZygpO1xuICAgIH07XG4gICAgXG4gICAgcmVzaXplRWxlbWVudHMuY29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ29uZmlybSk7XG4gICAgcmVzaXplRWxlbWVudHMuY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYW5jZWwpO1xuICAgIHJlc2l6ZUVsZW1lbnRzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbmNlbCk7XG4gICAgXG4gICAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgbGltcGlhciBsaXN0ZW5lcnNcbiAgICB3aW5kb3cuY2xlYW51cFJlc2l6ZURpYWxvZyA9ICgpID0+IHtcbiAgICAgIHJlc2l6ZUVsZW1lbnRzLndpZHRoU2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25XaWR0aENoYW5nZSk7XG4gICAgICByZXNpemVFbGVtZW50cy5oZWlnaHRTbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkhlaWdodENoYW5nZSk7XG4gICAgICByZXNpemVFbGVtZW50cy5jb25maXJtQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Db25maXJtKTtcbiAgICAgIHJlc2l6ZUVsZW1lbnRzLmNhbmNlbEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2FuY2VsKTtcbiAgICAgIHJlc2l6ZUVsZW1lbnRzLm92ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbmNlbCk7XG4gICAgfTtcbiAgICBcbiAgICAvLyBHZW5lcmFyIHByZXZpZXcgaW5pY2lhbFxuICAgIHVwZGF0ZVByZXZpZXcoKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gY2xvc2VSZXNpemVEaWFsb2coKSB7XG4gICAgcmVzaXplRWxlbWVudHMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJlc2l6ZUVsZW1lbnRzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIFxuICAgIC8vIExpbXBpYXIgZXZlbnQgbGlzdGVuZXJzXG4gICAgaWYgKHdpbmRvdy5jbGVhbnVwUmVzaXplRGlhbG9nKSB7XG4gICAgICB3aW5kb3cuY2xlYW51cFJlc2l6ZURpYWxvZygpO1xuICAgICAgZGVsZXRlIHdpbmRvdy5jbGVhbnVwUmVzaXplRGlhbG9nO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3MoY3VycmVudCwgdG90YWwsIHVzZXJJbmZvID0gbnVsbCkge1xuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSB0b3RhbCA+IDAgPyAoY3VycmVudCAvIHRvdGFsKSAqIDEwMCA6IDA7XG4gICAgZWxlbWVudHMucHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50YWdlfSVgO1xuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgc3RhdHNcbiAgICBsZXQgc3RhdHNIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cInN0YXQtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1sYWJlbFwiPlx1RDgzQ1x1REZBOCAke3RleHRzLnByb2dyZXNzfTwvZGl2PlxuICAgICAgICA8ZGl2PiR7Y3VycmVudH0vJHt0b3RhbH0gKCR7cGVyY2VudGFnZS50b0ZpeGVkKDEpfSUpPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIFxuICAgIC8vIEFncmVnYXIgaW5mb3JtYWNpXHUwMEYzbiBkZWwgdXN1YXJpbyBzaSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICAgIGlmICh1c2VySW5mbykge1xuICAgICAgLy8gTW9zdHJhciBub21icmUgZGUgdXN1YXJpb1xuICAgICAgaWYgKHVzZXJJbmZvLnVzZXJuYW1lKSB7XG4gICAgICAgIHN0YXRzSFRNTCArPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtaXRlbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtbGFiZWxcIj5cdUQ4M0RcdURDNjQgJHt0ZXh0cy51c2VyTmFtZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+JHt1c2VySW5mby51c2VybmFtZX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gTW9zdHJhciBjYXJnYXMgKG5cdTAwRkFtZXJvIGVudGVybylcbiAgICAgIGlmICh1c2VySW5mby5jaGFyZ2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhdHNIVE1MICs9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1pdGVtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1sYWJlbFwiPlx1MjZBMSAke3RleHRzLmNoYXJnZXN9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PiR7TWF0aC5mbG9vcih1c2VySW5mby5jaGFyZ2VzKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gTW9zdHJhciBwXHUwMEVEeGVsZXMgcGludGFkb3MgZGVsIHVzdWFyaW9cbiAgICAgIGlmICh1c2VySW5mby5waXhlbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdGF0c0hUTUwgKz0gYFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWl0ZW1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWxhYmVsXCI+XHVEODNEXHVERDMzICR7dGV4dHMucGl4ZWxzfTwvZGl2PlxuICAgICAgICAgICAgPGRpdj4ke3VzZXJJbmZvLnBpeGVscy50b0xvY2FsZVN0cmluZygpfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBNb3N0cmFyIHRpZW1wbyBlc3RpbWFkbyBzaSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICAgICAgaWYgKHVzZXJJbmZvLmVzdGltYXRlZFRpbWUgIT09IHVuZGVmaW5lZCAmJiB1c2VySW5mby5lc3RpbWF0ZWRUaW1lID4gMCkge1xuICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodXNlckluZm8uZXN0aW1hdGVkVGltZSAvIDM2MDApO1xuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodXNlckluZm8uZXN0aW1hdGVkVGltZSAlIDM2MDApIC8gNjApO1xuICAgICAgICBjb25zdCB0aW1lU3RyID0gaG91cnMgPiAwID8gYCR7aG91cnN9aCAke21pbnV0ZXN9bWAgOiBgJHttaW51dGVzfW1gO1xuICAgICAgICBcbiAgICAgICAgc3RhdHNIVE1MICs9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1pdGVtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1sYWJlbFwiPlx1MjNGMCAke3RleHRzLnRpbWVSZW1haW5pbmd9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PiR7dGltZVN0cn08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZWxlbWVudHMuc3RhdHNBcmVhLmlubmVySFRNTCA9IHN0YXRzSFRNTDtcbiAgfVxuICBcbiAgZnVuY3Rpb24gdXBkYXRlQ29vbGRvd25EaXNwbGF5KHNlY29uZHMpIHtcbiAgICBpZiAoc2Vjb25kcyA+IDApIHtcbiAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICBjb25zdCBzZWNzID0gc2Vjb25kcyAlIDYwO1xuICAgICAgY29uc3QgdGltZVN0ciA9IG1pbnV0ZXMgPiAwID8gYCR7bWludXRlc31tICR7c2Vjc31zYCA6IGAke3NlY3N9c2A7XG4gICAgICBlbGVtZW50cy5jb29sZG93blZhbHVlLnRleHRDb250ZW50ID0gdGltZVN0cjtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudHMuY29vbGRvd25WYWx1ZS50ZXh0Q29udGVudCA9ICctLSc7XG4gICAgfVxuICB9XG4gIFxuICAvLyBOdWV2YSBmdW5jaVx1MDBGM24gcGFyYSBhY3R1YWxpemFyIHNvbG8gZWwgbWVuc2FqZSBkZSBjb29sZG93biBzaW4gcGFycGFkZW9cbiAgZnVuY3Rpb24gdXBkYXRlQ29vbGRvd25NZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBpZiAobWVzc2FnZSAmJiBtZXNzYWdlLmluY2x1ZGVzKCdcdTIzRjMnKSkge1xuICAgICAgLy8gRXMgdW4gbWVuc2FqZSBkZSBjb29sZG93biwgYWN0dWFsaXphciBzb2xvIGVsIHRleHRvIHNpbiByZWNhcmdhciB0b2RvXG4gICAgICBlbGVtZW50cy5zdGF0dXMudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgZWxlbWVudHMuc3RhdHVzLmNsYXNzTmFtZSA9ICdzdGF0dXMgc3RhdHVzLWluZm8nO1xuICAgICAgLy8gTm8gaGFjZXIgYW5pbWFjaVx1MDBGM24gcGFyYSBldml0YXIgcGFycGFkZW9cbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIC8vIE1lbnNhamUgbm9ybWFsLCB1c2FyIHNldFN0YXR1cyBjb21wbGV0b1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UsICdpbmZvJyk7XG4gICAgfVxuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBjb250cm9sYXIgZWwgZXN0YWRvIGRlbCBib3RcdTAwRjNuIGRlIGluaWNpYWxpemFjaVx1MDBGM25cbiAgZnVuY3Rpb24gc2V0SW5pdGlhbGl6ZWQoaXNJbml0aWFsaXplZCkge1xuICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICBlbGVtZW50cy5pbml0QnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGVsZW1lbnRzLmluaXRCdG4uc3R5bGUub3BhY2l0eSA9ICcwLjYnO1xuICAgICAgZWxlbWVudHMuaW5pdEJ0bi5pbm5lckhUTUwgPSBgXHUyNzA1IDxzcGFuPiR7dGV4dHMuaW5pdEJvdH0gLSBDb21wbGV0YWRvPC9zcGFuPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRzLmluaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGVsZW1lbnRzLmluaXRCdG4uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgIGVsZW1lbnRzLmluaXRCdG4uaW5uZXJIVE1MID0gYFx1RDgzRVx1REQxNiA8c3Bhbj4ke3RleHRzLmluaXRCb3R9PC9zcGFuPmA7XG4gICAgfVxuICB9XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBvY3VsdGFyL21vc3RyYXIgZWwgYm90XHUwMEYzbiBkZSBpbmljaWFsaXphY2lcdTAwRjNuXG4gIGZ1bmN0aW9uIHNldEluaXRCdXR0b25WaXNpYmxlKHZpc2libGUpIHtcbiAgICBlbGVtZW50cy5pbml0QnRuLnN0eWxlLmRpc3BsYXkgPSB2aXNpYmxlID8gJ2ZsZXgnIDogJ25vbmUnO1xuICB9XG4gIFxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGhvc3QucmVtb3ZlKCk7XG4gIH1cbiAgXG4gIGxvZygnXHUyNzA1IEludGVyZmF6IGRlIEF1dG8tSW1hZ2UgY3JlYWRhJyk7XG4gIFxuICByZXR1cm4ge1xuICAgIHNldFN0YXR1cyxcbiAgICB1cGRhdGVQcm9ncmVzcyxcbiAgICB1cGRhdGVDb29sZG93bkRpc3BsYXksXG4gICAgdXBkYXRlQ29vbGRvd25NZXNzYWdlLFxuICAgIHNldEluaXRpYWxpemVkLFxuICAgIHNldEluaXRCdXR0b25WaXNpYmxlLFxuICAgIGVuYWJsZUJ1dHRvbnNBZnRlckluaXQsXG4gICAgc2hvd1Jlc2l6ZURpYWxvZyxcbiAgICBjbG9zZVJlc2l6ZURpYWxvZyxcbiAgICBkZXN0cm95XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93Q29uZmlybURpYWxvZyhtZXNzYWdlLCB0aXRsZSwgYnV0dG9ucyA9IHt9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBvdmVybGF5LmNsYXNzTmFtZSA9ICdtb2RhbC1vdmVybGF5JztcbiAgICBvdmVybGF5LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICBvdmVybGF5LnN0eWxlLnRvcCA9ICcwJztcbiAgICBvdmVybGF5LnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgb3ZlcmxheS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBvdmVybGF5LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBvdmVybGF5LnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgwLDAsMCwwLjcpJztcbiAgICBvdmVybGF5LnN0eWxlLnpJbmRleCA9ICcxMDAwMSc7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIG92ZXJsYXkuc3R5bGUuYWxpZ25JdGVtcyA9ICdjZW50ZXInO1xuICAgIG92ZXJsYXkuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcbiAgICBcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1vZGFsLnN0eWxlLmJhY2tncm91bmQgPSAnIzFhMWExYSc7XG4gICAgbW9kYWwuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCAjMzMzJztcbiAgICBtb2RhbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgbW9kYWwuc3R5bGUucGFkZGluZyA9ICcyNXB4JztcbiAgICBtb2RhbC5zdHlsZS5jb2xvciA9ICcjZWVlJztcbiAgICBtb2RhbC5zdHlsZS5taW5XaWR0aCA9ICczNTBweCc7XG4gICAgbW9kYWwuc3R5bGUubWF4V2lkdGggPSAnNDAwcHgnO1xuICAgIG1vZGFsLnN0eWxlLmJveFNoYWRvdyA9ICcwIDEwcHggMzBweCByZ2JhKDAsMCwwLDAuNSknO1xuICAgIG1vZGFsLnN0eWxlLmZvbnRGYW1pbHkgPSBcIidTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZlwiO1xuICAgIFxuICAgIG1vZGFsLmlubmVySFRNTCA9IGBcbiAgICAgIDxoMyBzdHlsZT1cIm1hcmdpbjogMCAwIDE1cHggMDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDE4cHg7XCI+JHt0aXRsZX08L2gzPlxuICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDAgMCAyMHB4IDA7IHRleHQtYWxpZ246IGNlbnRlcjsgbGluZS1oZWlnaHQ6IDEuNDtcIj4ke21lc3NhZ2V9PC9wPlxuICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMTBweDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XCI+XG4gICAgICAgICR7YnV0dG9ucy5zYXZlID8gYDxidXR0b24gY2xhc3M9XCJzYXZlLWJ0blwiIHN0eWxlPVwicGFkZGluZzogMTBweCAyMHB4OyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDhweDsgZm9udC1zaXplOiAxNHB4OyBmb250LXdlaWdodDogYm9sZDsgY3Vyc29yOiBwb2ludGVyOyBtaW4td2lkdGg6IDEwMHB4OyBiYWNrZ3JvdW5kOiAjMTBiOTgxOyBjb2xvcjogd2hpdGU7XCI+JHtidXR0b25zLnNhdmV9PC9idXR0b24+YCA6ICcnfVxuICAgICAgICAke2J1dHRvbnMuZGlzY2FyZCA/IGA8YnV0dG9uIGNsYXNzPVwiZGlzY2FyZC1idG5cIiBzdHlsZT1cInBhZGRpbmc6IDEwcHggMjBweDsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA4cHg7IGZvbnQtc2l6ZTogMTRweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGN1cnNvcjogcG9pbnRlcjsgbWluLXdpZHRoOiAxMDBweDsgYmFja2dyb3VuZDogI2VmNDQ0NDsgY29sb3I6IHdoaXRlO1wiPiR7YnV0dG9ucy5kaXNjYXJkfTwvYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgJHtidXR0b25zLmNhbmNlbCA/IGA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsLWJ0blwiIHN0eWxlPVwicGFkZGluZzogMTBweCAyMHB4OyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDhweDsgZm9udC1zaXplOiAxNHB4OyBmb250LXdlaWdodDogYm9sZDsgY3Vyc29yOiBwb2ludGVyOyBtaW4td2lkdGg6IDEwMHB4OyBiYWNrZ3JvdW5kOiAjMmQzNzQ4OyBjb2xvcjogd2hpdGU7XCI+JHtidXR0b25zLmNhbmNlbH08L2J1dHRvbj5gIDogJyd9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIFxuICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gICAgXG4gICAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gICAgY29uc3Qgc2F2ZUJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYXZlLWJ0bicpO1xuICAgIGNvbnN0IGRpc2NhcmRCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuZGlzY2FyZC1idG4nKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWJ0bicpO1xuICAgIFxuICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG92ZXJsYXkpO1xuICAgIH07XG4gICAgXG4gICAgaWYgKHNhdmVCdG4pIHtcbiAgICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgcmVzb2x2ZSgnc2F2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGlmIChkaXNjYXJkQnRuKSB7XG4gICAgICBkaXNjYXJkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIHJlc29sdmUoJ2Rpc2NhcmQnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoY2FuY2VsQnRuKSB7XG4gICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgcmVzb2x2ZSgnY2FuY2VsJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy8gQ2VycmFyIGNvbiBvdmVybGF5XG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IG92ZXJsYXkpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCdjYW5jZWwnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCAiZXhwb3J0IGNvbnN0ICQgPSAoc2VsLCByb290ID0gZG9jdW1lbnQpID0+IHJvb3QucXVlcnlTZWxlY3RvcihzZWwpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3R5bGUoY3NzKSB7XG4gIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHMudGV4dENvbnRlbnQgPSBjc3M7IGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7IHJldHVybiBzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW91bnRTaGFkb3coY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSkge1xuICBjb25zdCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaG9zdC5pZCA9IFwid3BsYWNlLWJvdC1yb290XCI7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChob3N0KTtcbiAgY29uc3Qgcm9vdCA9IGhvc3QuYXR0YWNoU2hhZG93ID8gaG9zdC5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KSA6IGhvc3Q7XG4gIHJldHVybiB7IGhvc3QsIHJvb3QgfTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgZGV0ZWN0YXIgc2kgbGEgcGFsZXRhIGRlIGNvbG9yZXMgZXN0XHUwMEUxIGFiaWVydGFcbmV4cG9ydCBmdW5jdGlvbiBpc1BhbGV0dGVPcGVuKGRlYnVnID0gZmFsc2UpIHtcbiAgLy8gQnVzY2FyIGVsZW1lbnRvcyBjb211bmVzIGRlIGxhIHBhbGV0YSBkZSBjb2xvcmVzIChtXHUwMEU5dG9kbyBvcmlnaW5hbClcbiAgY29uc3QgcGFsZXR0ZVNlbGVjdG9ycyA9IFtcbiAgICAnW2RhdGEtdGVzdGlkPVwiY29sb3ItcGlja2VyXCJdJyxcbiAgICAnLmNvbG9yLXBpY2tlcicsXG4gICAgJy5wYWxldHRlJyxcbiAgICAnW2NsYXNzKj1cImNvbG9yXCJdW2NsYXNzKj1cInBpY2tlclwiXScsXG4gICAgJ1tjbGFzcyo9XCJwYWxldHRlXCJdJ1xuICBdO1xuICBcbiAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBwYWxldHRlU2VsZWN0b3JzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQTggUGFsZXRhIGRldGVjdGFkYSBwb3Igc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEJ1c2NhciBwb3IgY29sb3JlcyBlbiB1biBncmlkIG8gbGlzdGEgKG1cdTAwRTl0b2RvIG9yaWdpbmFsKVxuICBjb25zdCBjb2xvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3N0eWxlKj1cImJhY2tncm91bmQtY29sb3JcIl0sIFtzdHlsZSo9XCJiYWNrZ3JvdW5kOlwiXSwgLmNvbG9yLCBbY2xhc3MqPVwiY29sb3JcIl0nKTtcbiAgbGV0IHZpc2libGVDb2xvcnMgPSAwO1xuICBmb3IgKGNvbnN0IGVsIG9mIGNvbG9yRWxlbWVudHMpIHtcbiAgICBpZiAoZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsICYmIGVsLm9mZnNldFdpZHRoID4gMTAgJiYgZWwub2Zmc2V0SGVpZ2h0ID4gMTApIHtcbiAgICAgIHZpc2libGVDb2xvcnMrKztcbiAgICAgIGlmICh2aXNpYmxlQ29sb3JzID49IDUpIHtcbiAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkE4IFBhbGV0YSBkZXRlY3RhZGEgcG9yIGNvbG9yZXMgdmlzaWJsZXM6ICR7dmlzaWJsZUNvbG9yc31gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIFNpIGhheSA1KyBlbGVtZW50b3MgZGUgY29sb3IgdmlzaWJsZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzRFx1REQwRCBQYWxldGEgbm8gZGV0ZWN0YWRhLiBDb2xvcmVzIHZpc2libGVzOiAke3Zpc2libGVDb2xvcnN9YCk7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgZW5jb250cmFyIHkgaGFjZXIgY2xpYyBlbiBlbCBib3RcdTAwRjNuIGRlIFBhaW50XG5leHBvcnQgZnVuY3Rpb24gZmluZEFuZENsaWNrUGFpbnRCdXR0b24oZGVidWcgPSBmYWxzZSwgZG91YmxlQ2xpY2sgPSBmYWxzZSkge1xuICAvLyBNXHUwMEU5dG9kbyAxOiBCXHUwMEZBc3F1ZWRhIGVzcGVjXHUwMEVEZmljYSBwb3IgY2xhc2VzIChtXHUwMEU5dG9kbyBvcmlnaW5hbCwgbVx1MDBFMXMgY29uZmlhYmxlKVxuICBjb25zdCBzcGVjaWZpY0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5idG4uYnRuLXByaW1hcnkuYnRuLWxnLCBidXR0b24uYnRuLmJ0bi1wcmltYXJ5LnNtXFxcXDpidG4teGwnKTtcbiAgXG4gIGlmIChzcGVjaWZpY0J1dHRvbikge1xuICAgIGNvbnN0IGJ1dHRvblRleHQgPSBzcGVjaWZpY0J1dHRvbi50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGhhc1BhaW50VGV4dCA9IGJ1dHRvblRleHQuaW5jbHVkZXMoJ3BhaW50JykgfHwgYnV0dG9uVGV4dC5pbmNsdWRlcygncGludGFyJyk7XG4gICAgY29uc3QgaGFzUGFpbnRJY29uID0gc3BlY2lmaWNCdXR0b24ucXVlcnlTZWxlY3Rvcignc3ZnIHBhdGhbZCo9XCIyNDAtMTIwXCJdJykgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpY0J1dHRvbi5xdWVyeVNlbGVjdG9yKCdzdmcgcGF0aFtkKj1cIk0xNVwiXScpO1xuICAgIFxuICAgIGlmIChoYXNQYWludFRleHQgfHwgaGFzUGFpbnRJY29uKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgQm90XHUwMEYzbiBQYWludCBlbmNvbnRyYWRvIHBvciBzZWxlY3RvciBlc3BlY1x1MDBFRGZpY286IFwiJHtidXR0b25UZXh0fVwiYCk7XG4gICAgICBzcGVjaWZpY0J1dHRvbi5jbGljaygpO1xuICAgICAgXG4gICAgICAvLyBTaSBzZSByZXF1aWVyZSBkb2JsZSBjbGljLCBoYWNlciBzZWd1bmRvIGNsaWMgZGVzcHVcdTAwRTlzIGRlIHVuIGRlbGF5XG4gICAgICBpZiAoZG91YmxlQ2xpY2spIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkFGIFNlZ3VuZG8gY2xpYyBlbiBib3RcdTAwRjNuIFBhaW50YCk7XG4gICAgICAgICAgc3BlY2lmaWNCdXR0b24uY2xpY2soKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gTVx1MDBFOXRvZG8gMjogQlx1MDBGQXNxdWVkYSBzaW1wbGUgcG9yIHRleHRvIChtXHUwMEU5dG9kbyBvcmlnaW5hbClcbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgY29uc3QgYnV0dG9uVGV4dCA9IGJ1dHRvbi50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICgoYnV0dG9uVGV4dC5pbmNsdWRlcygncGFpbnQnKSB8fCBidXR0b25UZXh0LmluY2x1ZGVzKCdwaW50YXInKSkgJiYgXG4gICAgICAgIGJ1dHRvbi5vZmZzZXRQYXJlbnQgIT09IG51bGwgJiZcbiAgICAgICAgIWJ1dHRvbi5kaXNhYmxlZCkge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkFGIEJvdFx1MDBGM24gUGFpbnQgZW5jb250cmFkbyBwb3IgdGV4dG86IFwiJHtidXR0b24udGV4dENvbnRlbnQudHJpbSgpfVwiYCk7XG4gICAgICBidXR0b24uY2xpY2soKTtcbiAgICAgIFxuICAgICAgLy8gU2kgc2UgcmVxdWllcmUgZG9ibGUgY2xpYywgaGFjZXIgc2VndW5kbyBjbGljIGRlc3B1XHUwMEU5cyBkZSB1biBkZWxheVxuICAgICAgaWYgKGRvdWJsZUNsaWNrKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBRiBTZWd1bmRvIGNsaWMgZW4gYm90XHUwMEYzbiBQYWludGApO1xuICAgICAgICAgIGJ1dHRvbi5jbGljaygpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIFxuICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3NEMgQm90XHUwMEYzbiBQYWludCBubyBlbmNvbnRyYWRvYCk7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gRnVuY2lcdTAwRjNuIHBhcmEgcmVhbGl6YXIgYXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludCBjb24gc2VjdWVuY2lhIGNvcnJlY3RhXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0b0NsaWNrUGFpbnRCdXR0b24obWF4QXR0ZW1wdHMgPSAzLCBkZWJ1ZyA9IHRydWUpIHtcbiAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNFXHVERDE2IEluaWNpYW5kbyBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50IChtXHUwMEUxeGltbyAke21heEF0dGVtcHRzfSBpbnRlbnRvcylgKTtcbiAgXG4gIGZvciAobGV0IGF0dGVtcHQgPSAxOyBhdHRlbXB0IDw9IG1heEF0dGVtcHRzOyBhdHRlbXB0KyspIHtcbiAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgSW50ZW50byAke2F0dGVtcHR9LyR7bWF4QXR0ZW1wdHN9IC0gQnVzY2FuZG8gYm90XHUwMEYzbiBQYWludC4uLmApO1xuICAgIFxuICAgIC8vIFZlcmlmaWNhciBzaSBsYSBwYWxldGEgeWEgZXN0XHUwMEUxIGFiaWVydGFcbiAgICBpZiAoaXNQYWxldHRlT3BlbigpKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3MDUgUGFsZXRhIHlhIGVzdFx1MDBFMSBhYmllcnRhLCBhdXRvLWNsaWNrIGNvbXBsZXRhZG9gKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBcbiAgICAvLyBDTElDIFx1MDBEQU5JQ086IFByZXNpb25hciBQYWludCB1bmEgc29sYSB2ZXogKHNvbG8gcGFyYSBtb3N0cmFyIHBhbGV0YS9kZXRlY3RhciBjb2xvcmVzKVxuICAgIGlmIChmaW5kQW5kQ2xpY2tQYWludEJ1dHRvbihkZWJ1ZywgZmFsc2UpKSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0RcdURDNDYgQ2xpYyBlbiBib3RcdTAwRjNuIFBhaW50IHJlYWxpemFkbyAoc2luIHNlZ3VuZG8gY2xpYylgKTtcbiAgICAgIFxuICAgICAgLy8gRXNwZXJhciB1biBwb2NvIHBhcmEgcXVlIGxhIFVJL3BhbGV0YSBhcGFyZXpjYSBlbiBwYW50YWxsYVxuICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDE1MDApKTtcbiAgICAgIFxuICAgICAgLy8gVmVyaWZpY2FyIHNpIGxhIHBhbGV0YSBzZSBhYnJpXHUwMEYzXG4gICAgICBpZiAoaXNQYWxldHRlT3BlbigpKSB7XG4gICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1MjcwNSBQYWxldGEgYWJpZXJ0YSBleGl0b3NhbWVudGUgZGVzcHVcdTAwRTlzIGRlbCBpbnRlbnRvICR7YXR0ZW1wdH1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI2QTBcdUZFMEYgUGFsZXRhIG5vIGRldGVjdGFkYSB0cmFzIGVsIGNsaWMgZW4gaW50ZW50byAke2F0dGVtcHR9LiBSZWludGVudGFyXHUwMEUxLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3NEMgQm90XHUwMEYzbiBQYWludCBubyBlbmNvbnRyYWRvIHBhcmEgY2xpYyBlbiBpbnRlbnRvICR7YXR0ZW1wdH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXNwZXJhciBhbnRlcyBkZWwgc2lndWllbnRlIGludGVudG9cbiAgICBpZiAoYXR0ZW1wdCA8IG1heEF0dGVtcHRzKSB7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICAgIH1cbiAgfVxuICBcbiAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHUyNzRDIEF1dG8tY2xpY2sgZmFsbFx1MDBGMyBkZXNwdVx1MDBFOXMgZGUgJHttYXhBdHRlbXB0c30gaW50ZW50b3NgKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwgIi8vID09PSBbU2lzdGVtYSBkZSBvdmVybGF5IGJhc2FkbyBlbiBCbHVlIE1hcmJsZSAtIEludGVyY2VwY2lcdTAwRjNuIGRlIHRpbGVzXSA9PT1cbigoKSA9PiB7XG4gIGNvbnN0IFRJTEVfU0laRSA9IDMwMDA7IC8vIFRhbWFcdTAwRjFvIGRlIHRpbGUgZW4gV1BsYWNlXG5cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgdGVtcGxhdGVzOiBbXSwgLy8gUGxhbnRpbGxhcyBlc3RpbG8gQmx1ZSBNYXJibGVcbiAgICB0ZW1wbGF0ZXNTaG91bGRCZURyYXduOiB0cnVlLFxuICAgIHRpbGVTaXplOiAxMDAwLCAvLyBUYW1hXHUwMEYxbyBkZSB0aWxlIChjb21vIEJsdWUgTWFyYmxlKVxuICAgIGRyYXdNdWx0OiAzLCAvLyBNdWx0aXBsaWNhZG9yIGRlIGRpYnVqb1xuICAgIC8vIFBsYW4gZGUgcFx1MDBFRHhlbGVzIGFjdHVhbFxuICAgIHBpeGVsUGxhbjogbnVsbCxcbiAgICBuZXh0QmF0Y2hDb3VudDogMCxcbiAgICBhbmNob3I6IG51bGwsIC8vIHsgdGlsZVgsIHRpbGVZLCBweFgsIHB4WSB9XG4gICAgaW1hZ2VXaWR0aDogbnVsbCxcbiAgICBpbWFnZUhlaWdodDogbnVsbCxcbiAgICAvLyBTaXN0ZW1hIGRlIGludGVyY2VwY2lcdTAwRjNuXG4gICAgb3JpZ2luYWxGZXRjaDogbnVsbCxcbiAgICBmZXRjaGVkQmxvYlF1ZXVlOiBuZXcgTWFwKCksXG4gICAgaXNJbnRlcmNlcHRpbmc6IGZhbHNlXG4gIH07XG5cbiAgZnVuY3Rpb24gaW5qZWN0U3R5bGVzKCkge1xuICAgIC8vIE5vIG5lY2VzaXRhbW9zIGVzdGlsb3MgQ1NTIGFkaWNpb25hbGVzIC0gQmx1ZSBNYXJibGUgdXNhIGVsIHNpc3RlbWEgZGUgdGlsZXMgbmF0aXZvXG4gICAgY29uc29sZS5sb2coJ1tQTEFOIE9WRVJMQVldIEJsdWUgTWFyYmxlIHRpbGUgc3lzdGVtIGluaXRpYWxpemVkJyk7XG4gIH1cblxuICAvLyA9PT0gU0lTVEVNQSBERSBJTlRFUkNFUENJXHUwMEQzTiBERSBGRVRDSCAoY29tbyBCbHVlIE1hcmJsZSkgPT09XG4gIGZ1bmN0aW9uIHN0YXJ0RmV0Y2hJbnRlcmNlcHRpb24oKSB7XG4gICAgaWYgKHN0YXRlLmlzSW50ZXJjZXB0aW5nKSByZXR1cm47XG5cbiAgICBzdGF0ZS5vcmlnaW5hbEZldGNoID0gd2luZG93LmZldGNoO1xuICAgIHN0YXRlLmlzSW50ZXJjZXB0aW5nID0gdHJ1ZTtcblxuICAgIHdpbmRvdy5mZXRjaCA9IGFzeW5jIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc3RhdGUub3JpZ2luYWxGZXRjaC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIGNvbnN0IGNsb25lZCA9IHJlc3BvbnNlLmNsb25lKCk7XG5cbiAgICAgIGNvbnN0IGVuZHBvaW50TmFtZSA9ICgoYXJnc1swXSBpbnN0YW5jZW9mIFJlcXVlc3QpID8gYXJnc1swXT8udXJsIDogYXJnc1swXSkgfHwgJ2lnbm9yZSc7XG4gICAgICBjb25zdCBjb250ZW50VHlwZSA9IGNsb25lZC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJyc7XG5cbiAgICAgIC8vIEludGVyY2VwdGFyIHNvbG8gdGlsZXMgZGUgaW1hZ2VuIChjb21vIEJsdWUgTWFyYmxlKVxuICAgICAgaWYgKGNvbnRlbnRUeXBlLmluY2x1ZGVzKCdpbWFnZS8nKSAmJiBcbiAgICAgICAgICBlbmRwb2ludE5hbWUuaW5jbHVkZXMoJy90aWxlcy8nKSAmJiBcbiAgICAgICAgICAhZW5kcG9pbnROYW1lLmluY2x1ZGVzKCdvcGVuZnJlZW1hcCcpICYmIFxuICAgICAgICAgICFlbmRwb2ludE5hbWUuaW5jbHVkZXMoJ21hcHMnKSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUExBTiBPVkVSTEFZXSBJbnRlcmNlcHRpbmcgdGlsZSByZXF1ZXN0OicsIGVuZHBvaW50TmFtZSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgY2xvbmVkLmJsb2IoKTtcbiAgICAgICAgICBjb25zdCBwcm9jZXNzZWRCbG9iID0gYXdhaXQgZHJhd1BsYW5PblRpbGUoYmxvYiwgZW5kcG9pbnROYW1lKTtcbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHByb2Nlc3NlZEJsb2IsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IGNsb25lZC5oZWFkZXJzLFxuICAgICAgICAgICAgc3RhdHVzOiBjbG9uZWQuc3RhdHVzLFxuICAgICAgICAgICAgc3RhdHVzVGV4dDogY2xvbmVkLnN0YXR1c1RleHRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbUExBTiBPVkVSTEFZXSBFcnJvciBwcm9jZXNzaW5nIHRpbGU6JywgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCdbUExBTiBPVkVSTEFZXSBGZXRjaCBpbnRlcmNlcHRpb24gc3RhcnRlZCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcEZldGNoSW50ZXJjZXB0aW9uKCkge1xuICAgIGlmICghc3RhdGUuaXNJbnRlcmNlcHRpbmcgfHwgIXN0YXRlLm9yaWdpbmFsRmV0Y2gpIHJldHVybjtcblxuICAgIHdpbmRvdy5mZXRjaCA9IHN0YXRlLm9yaWdpbmFsRmV0Y2g7XG4gICAgc3RhdGUuaXNJbnRlcmNlcHRpbmcgPSBmYWxzZTtcblxuICAgIGNvbnNvbGUubG9nKCdbUExBTiBPVkVSTEFZXSBGZXRjaCBpbnRlcmNlcHRpb24gc3RvcHBlZCcpO1xuICB9XG5cbiAgLy8gPT09IFBST0NFU0FNSUVOVE8gREUgVElMRVMgKGNvbW8gQmx1ZSBNYXJibGUpID09PVxuICBhc3luYyBmdW5jdGlvbiBkcmF3UGxhbk9uVGlsZSh0aWxlQmxvYiwgZW5kcG9pbnRVcmwpIHtcbiAgICBpZiAoIXN0YXRlLmVuYWJsZWQgfHwgIXN0YXRlLnRlbXBsYXRlc1Nob3VsZEJlRHJhd24gfHwgIXN0YXRlLnBpeGVsUGxhbikge1xuICAgICAgcmV0dXJuIHRpbGVCbG9iO1xuICAgIH1cblxuICAgIC8vIEV4dHJhZXIgY29vcmRlbmFkYXMgZGVsIHRpbGUgZGVzZGUgbGEgVVJMXG4gICAgLy8gRm9ybWF0bzogXCIuLi4vdGlsZXMvdGlsZVgvdGlsZVkvem9vbS5wbmdcIlxuICAgIGNvbnN0IHVybFBhcnRzID0gZW5kcG9pbnRVcmwuc3BsaXQoJy8nKTtcbiAgICBjb25zdCB0aWxlWSA9IHBhcnNlSW50KHVybFBhcnRzW3VybFBhcnRzLmxlbmd0aCAtIDFdLnJlcGxhY2UoJy5wbmcnLCAnJykpO1xuICAgIGNvbnN0IHRpbGVYID0gcGFyc2VJbnQodXJsUGFydHNbdXJsUGFydHMubGVuZ3RoIC0gMl0pO1xuXG4gICAgaWYgKGlzTmFOKHRpbGVYKSB8fCBpc05hTih0aWxlWSkpIHtcbiAgICAgIGNvbnNvbGUud2FybignW1BMQU4gT1ZFUkxBWV0gQ291bGQgbm90IGV4dHJhY3QgdGlsZSBjb29yZGluYXRlcyBmcm9tIFVSTDonLCBlbmRwb2ludFVybCk7XG4gICAgICByZXR1cm4gdGlsZUJsb2I7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coYFtQTEFOIE9WRVJMQVldIFByb2Nlc3NpbmcgdGlsZTogJHt0aWxlWH0sJHt0aWxlWX1gKTtcblxuICAgIC8vIFZlcmlmaWNhciBzaSBlc3RlIHRpbGUgY29udGllbmUgcFx1MDBFRHhlbGVzIGRlIG51ZXN0cm8gcGxhblxuICAgIGNvbnN0IHRpbGVQaXhlbHMgPSBnZXRQaXhlbHNGb3JUaWxlKHRpbGVYLCB0aWxlWSk7XG4gICAgaWYgKHRpbGVQaXhlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGlsZUJsb2I7IC8vIE5vIGhheSBwXHUwMEVEeGVsZXMgZW4gZXN0ZSB0aWxlXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coYFtQTEFOIE9WRVJMQVldIEZvdW5kICR7dGlsZVBpeGVscy5sZW5ndGh9IHBpeGVscyBmb3IgdGlsZSAke3RpbGVYfSwke3RpbGVZfWApO1xuXG4gICAgLy8gUHJvY2VzYXIgZWwgdGlsZSAoY29tbyBCbHVlIE1hcmJsZSlcbiAgICBjb25zdCBkcmF3U2l6ZSA9IHN0YXRlLnRpbGVTaXplICogc3RhdGUuZHJhd011bHQ7XG4gICAgY29uc3QgdGlsZUJpdG1hcCA9IGF3YWl0IGNyZWF0ZUltYWdlQml0bWFwKHRpbGVCbG9iKTtcbiAgICBcbiAgICBjb25zdCBjYW52YXMgPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKGRyYXdTaXplLCBkcmF3U2l6ZSk7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIFxuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgZHJhd1NpemUsIGRyYXdTaXplKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0aWxlQml0bWFwLCAwLCAwLCBkcmF3U2l6ZSwgZHJhd1NpemUpO1xuXG4gICAgLy8gRGlidWphciBwXHUwMEVEeGVsZXMgZGVsIHBsYW4gKGNvbW8gQmx1ZSBNYXJibGUgZGlidWphIHRlbXBsYXRlcylcbiAgICBkcmF3UGl4ZWxzT25UaWxlKGNvbnRleHQsIHRpbGVQaXhlbHMsIHRpbGVYLCB0aWxlWSk7XG5cbiAgICByZXR1cm4gYXdhaXQgY2FudmFzLmNvbnZlcnRUb0Jsb2IoeyB0eXBlOiAnaW1hZ2UvcG5nJyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBpeGVsc0ZvclRpbGUodGlsZVgsIHRpbGVZKSB7XG4gICAgaWYgKCFzdGF0ZS5waXhlbFBsYW4gfHwgIXN0YXRlLnBpeGVsUGxhbi5waXhlbHMpIHJldHVybiBbXTtcblxuICAgIHJldHVybiBzdGF0ZS5waXhlbFBsYW4ucGl4ZWxzLmZpbHRlcihwaXhlbCA9PiB7XG4gICAgICAvLyBDYWxjdWxhciBlbiBxdVx1MDBFOSB0aWxlIGVzdFx1MDBFMSBlc3RlIHBcdTAwRUR4ZWxcbiAgICAgIGNvbnN0IHBpeGVsVGlsZVggPSBNYXRoLmZsb29yKHBpeGVsLmdsb2JhbFggLyBUSUxFX1NJWkUpO1xuICAgICAgY29uc3QgcGl4ZWxUaWxlWSA9IE1hdGguZmxvb3IocGl4ZWwuZ2xvYmFsWSAvIFRJTEVfU0laRSk7XG4gICAgICByZXR1cm4gcGl4ZWxUaWxlWCA9PT0gdGlsZVggJiYgcGl4ZWxUaWxlWSA9PT0gdGlsZVk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3UGl4ZWxzT25UaWxlKGNvbnRleHQsIHBpeGVscywgdGlsZVgsIHRpbGVZKSB7XG4gICAgY29uc3QgdGlsZVN0YXJ0WCA9IHRpbGVYICogVElMRV9TSVpFO1xuICAgIGNvbnN0IHRpbGVTdGFydFkgPSB0aWxlWSAqIFRJTEVfU0laRTtcblxuICAgIC8vIENvbmZpZ3VyYXIgdHJhbnNwYXJlbmNpYSBkZWwgb3ZlcmxheVxuICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjc7XG5cbiAgICBmb3IgKGNvbnN0IHBpeGVsIG9mIHBpeGVscykge1xuICAgICAgLy8gQ29udmVydGlyIGNvb3JkZW5hZGFzIGdsb2JhbGVzIGEgY29vcmRlbmFkYXMgbG9jYWxlcyBkZWwgdGlsZVxuICAgICAgY29uc3QgbG9jYWxYID0gKHBpeGVsLmdsb2JhbFggLSB0aWxlU3RhcnRYKSAqIHN0YXRlLmRyYXdNdWx0ICsgMTsgLy8gKzEgcGFyYSBjZW50cmFyIGNvbW8gQmx1ZSBNYXJibGVcbiAgICAgIGNvbnN0IGxvY2FsWSA9IChwaXhlbC5nbG9iYWxZIC0gdGlsZVN0YXJ0WSkgKiBzdGF0ZS5kcmF3TXVsdCArIDE7XG5cbiAgICAgIC8vIFNvbG8gZGlidWphciBzaSBlc3RcdTAwRTEgZGVudHJvIGRlbCB0aWxlXG4gICAgICBpZiAobG9jYWxYID49IDAgJiYgbG9jYWxYIDwgc3RhdGUudGlsZVNpemUgKiBzdGF0ZS5kcmF3TXVsdCAmJiBcbiAgICAgICAgICBsb2NhbFkgPj0gMCAmJiBsb2NhbFkgPCBzdGF0ZS50aWxlU2l6ZSAqIHN0YXRlLmRyYXdNdWx0KSB7XG4gICAgICAgIFxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGByZ2IoJHtwaXhlbC5yfSwke3BpeGVsLmd9LCR7cGl4ZWwuYn0pYDtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChsb2NhbFgsIGxvY2FsWSwgMSwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVzYWx0YXIgcHJcdTAwRjN4aW1vIGJhdGNoIGNvbiBtYXlvciBvcGFjaWRhZFxuICAgIGlmIChzdGF0ZS5uZXh0QmF0Y2hDb3VudCA+IDApIHtcbiAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxLjA7XG4gICAgICBjb25zdCBiYXRjaFBpeGVscyA9IHBpeGVscy5zbGljZSgwLCBzdGF0ZS5uZXh0QmF0Y2hDb3VudCk7XG4gICAgICBcbiAgICAgIGZvciAoY29uc3QgcGl4ZWwgb2YgYmF0Y2hQaXhlbHMpIHtcbiAgICAgICAgY29uc3QgbG9jYWxYID0gKHBpeGVsLmdsb2JhbFggLSB0aWxlU3RhcnRYKSAqIHN0YXRlLmRyYXdNdWx0ICsgMTtcbiAgICAgICAgY29uc3QgbG9jYWxZID0gKHBpeGVsLmdsb2JhbFkgLSB0aWxlU3RhcnRZKSAqIHN0YXRlLmRyYXdNdWx0ICsgMTtcblxuICAgICAgICBpZiAobG9jYWxYID49IDAgJiYgbG9jYWxYIDwgc3RhdGUudGlsZVNpemUgKiBzdGF0ZS5kcmF3TXVsdCAmJiBcbiAgICAgICAgICAgIGxvY2FsWSA+PSAwICYmIGxvY2FsWSA8IHN0YXRlLnRpbGVTaXplICogc3RhdGUuZHJhd011bHQpIHtcbiAgICAgICAgICBcbiAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGByZ2IoJHtwaXhlbC5yfSwke3BpeGVsLmd9LCR7cGl4ZWwuYn0pYDtcbiAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KGxvY2FsWCwgbG9jYWxZLCAxLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vID09PSBBUEkgUFx1MDBEQUJMSUNBIChjb21wYXRpYmxlIGNvbiBsYSBhbnRlcmlvcikgPT09XG4gIGZ1bmN0aW9uIHNldEVuYWJsZWQoZW5hYmxlZCkge1xuICAgIHN0YXRlLmVuYWJsZWQgPSAhIWVuYWJsZWQ7XG4gICAgXG4gICAgaWYgKHN0YXRlLmVuYWJsZWQpIHtcbiAgICAgIHN0YXJ0RmV0Y2hJbnRlcmNlcHRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcEZldGNoSW50ZXJjZXB0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnNvbGUubG9nKGBbUExBTiBPVkVSTEFZXSBzZXRFbmFibGVkOiAke3N0YXRlLmVuYWJsZWR9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRQbGFuKHBsYW5JdGVtcywgb3B0cyA9IHt9KSB7XG4gICAgaWYgKCFwbGFuSXRlbXMgfHwgcGxhbkl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc3RhdGUucGl4ZWxQbGFuID0gbnVsbDtcbiAgICAgIGNvbnNvbGUubG9nKCdbUExBTiBPVkVSTEFZXSBQbGFuIGNsZWFyZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0aXIgZm9ybWF0byBBdXRvLUltYWdlIGEgZm9ybWF0byBpbnRlcm5vXG4gICAgY29uc3QgcGl4ZWxzID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHBsYW5JdGVtcykge1xuICAgICAgbGV0IGdsb2JhbFgsIGdsb2JhbFk7XG4gICAgICBcbiAgICAgIGlmICh0eXBlb2YgaXRlbS50aWxlWCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGl0ZW0ubG9jYWxYID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBGb3JtYXRvIHRpbGUvbG9jYWxcbiAgICAgICAgZ2xvYmFsWCA9IGl0ZW0udGlsZVggKiBUSUxFX1NJWkUgKyBpdGVtLmxvY2FsWDtcbiAgICAgICAgZ2xvYmFsWSA9IGl0ZW0udGlsZVkgKiBUSUxFX1NJWkUgKyBpdGVtLmxvY2FsWTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5hbmNob3IgJiYgdHlwZW9mIGl0ZW0uaW1hZ2VYID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBGb3JtYXRvIGltYWdlWC9ZIGNvbiBhbmNsYVxuICAgICAgICBjb25zdCBiYXNlWCA9IG9wdHMuYW5jaG9yLnRpbGVYICogVElMRV9TSVpFICsgKG9wdHMuYW5jaG9yLnB4WCB8fCAwKTtcbiAgICAgICAgY29uc3QgYmFzZVkgPSBvcHRzLmFuY2hvci50aWxlWSAqIFRJTEVfU0laRSArIChvcHRzLmFuY2hvci5weFkgfHwgMCk7XG4gICAgICAgIGdsb2JhbFggPSBiYXNlWCArIGl0ZW0uaW1hZ2VYO1xuICAgICAgICBnbG9iYWxZID0gYmFzZVkgKyBpdGVtLmltYWdlWTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwaXhlbHMucHVzaCh7XG4gICAgICAgIGdsb2JhbFg6IGdsb2JhbFgsXG4gICAgICAgIGdsb2JhbFk6IGdsb2JhbFksXG4gICAgICAgIHI6IGl0ZW0uY29sb3I/LnIgfHwgMCxcbiAgICAgICAgZzogaXRlbS5jb2xvcj8uZyB8fCAwLFxuICAgICAgICBiOiBpdGVtLmNvbG9yPy5iIHx8IDBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRlLnBpeGVsUGxhbiA9IHsgcGl4ZWxzIH07XG4gICAgc3RhdGUubmV4dEJhdGNoQ291bnQgPSBvcHRzLm5leHRCYXRjaENvdW50IHx8IDA7XG4gICAgc3RhdGUuYW5jaG9yID0gb3B0cy5hbmNob3IgfHwgbnVsbDtcbiAgICBzdGF0ZS5pbWFnZVdpZHRoID0gb3B0cy5pbWFnZVdpZHRoIHx8IG51bGw7XG4gICAgc3RhdGUuaW1hZ2VIZWlnaHQgPSBvcHRzLmltYWdlSGVpZ2h0IHx8IG51bGw7XG5cbiAgICBjb25zb2xlLmxvZyhgW1BMQU4gT1ZFUkxBWV0gUGxhbiBzZXQ6ICR7cGl4ZWxzLmxlbmd0aH0gcGl4ZWxzYCk7XG4gICAgXG4gICAgaWYgKHR5cGVvZiBvcHRzLmVuYWJsZWQgPT09ICdib29sZWFuJykge1xuICAgICAgc2V0RW5hYmxlZChvcHRzLmVuYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE5leHRCYXRjaENvdW50KGNvdW50KSB7XG4gICAgc3RhdGUubmV4dEJhdGNoQ291bnQgPSBNYXRoLm1heCgwLCBOdW1iZXIoY291bnQgfHwgMCkpO1xuICAgIGNvbnNvbGUubG9nKGBbUExBTiBPVkVSTEFZXSBOZXh0IGJhdGNoIGNvdW50OiAke3N0YXRlLm5leHRCYXRjaENvdW50fWApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yKGFuY2hvcikge1xuICAgIHN0YXRlLmFuY2hvciA9IGFuY2hvcjtcbiAgICBjb25zb2xlLmxvZygnW1BMQU4gT1ZFUkxBWV0gQW5jaG9yIHNldDonLCBhbmNob3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yQ3NzKHgsIHkpIHtcbiAgICAvLyBFbiBlbCBzaXN0ZW1hIGRlIHRpbGVzIG5vIG5lY2VzaXRhbW9zIGFuY2xhIENTUyAtIGVzIHNvbG8gcGFyYSBjb21wYXRpYmlsaWRhZFxuICAgIGNvbnNvbGUubG9nKCdbUExBTiBPVkVSTEFZXSBDU1MgYW5jaG9yIHNldCAoaWdub3JlZCBpbiB0aWxlIHN5c3RlbSk6JywgeyB4LCB5IH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5kU2VsZWN0aW9uTW9kZSgpIHtcbiAgICAvLyBFbiBlbCBzaXN0ZW1hIGRlIHRpbGVzIG5vIGhheSBtb2RvIHNlbGVjY2lcdTAwRjNuIC0gZXMgc29sbyBwYXJhIGNvbXBhdGliaWxpZGFkXG4gICAgY29uc29sZS5sb2coJ1tQTEFOIE9WRVJMQVldIFNlbGVjdGlvbiBtb2RlIGVuZGVkIChpZ25vcmVkIGluIHRpbGUgc3lzdGVtKScpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBzdG9wRmV0Y2hJbnRlcmNlcHRpb24oKTtcbiAgICBzdGF0ZS5waXhlbFBsYW4gPSBudWxsO1xuICAgIHN0YXRlLmZldGNoZWRCbG9iUXVldWUuY2xlYXIoKTtcbiAgICBjb25zb2xlLmxvZygnW1BMQU4gT1ZFUkxBWV0gQ2xlYW51cCBjb21wbGV0ZWQnKTtcbiAgfVxuXG4gIC8vID09PSBBUEkgR0xPQkFMIChjb21wYXRpYmxlIGNvbiBsYSBhbnRlcmlvcikgPT09XG4gIHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXyA9IHtcbiAgICBpbmplY3RTdHlsZXMsXG4gICAgc2V0RW5hYmxlZCxcbiAgICBzZXRQbGFuLFxuICAgIHNldFBsYW5JdGVtc0Zyb21UaWxlTGlzdDogc2V0UGxhbiwgLy8gQWxpYXNcbiAgICBzZXROZXh0QmF0Y2hDb3VudCxcbiAgICBzZXRBbmNob3IsXG4gICAgc2V0QW5jaG9yQ3NzLFxuICAgIGVuZFNlbGVjdGlvbk1vZGUsXG4gICAgcmVuZGVyOiAoKSA9PiB7fSwgLy8gTm8tb3AgZW4gc2lzdGVtYSBkZSB0aWxlc1xuICAgIGNsZWFudXAsXG4gICAgZ2V0IHN0YXRlKCkgeyByZXR1cm4gc3RhdGU7IH1cbiAgfTtcblxuICBjb25zb2xlLmxvZygnW1BMQU4gT1ZFUkxBWV0gQmx1ZSBNYXJibGUgdGlsZSBzeXN0ZW0gcmVhZHknKTtcbn0pKCk7XG4iLCAiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2VyLmpzXCI7XG5pbXBvcnQgeyBpbWFnZVN0YXRlLCBJTUFHRV9ERUZBVUxUUyB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IHsgQmx1ZU1hcmJsZWxJbWFnZVByb2Nlc3NvciwgZGV0ZWN0QXZhaWxhYmxlQ29sb3JzIH0gZnJvbSBcIi4vYmx1ZS1tYXJibGUtcHJvY2Vzc29yLmpzXCI7XG5pbXBvcnQgeyBwcm9jZXNzSW1hZ2UsIHN0b3BQYWludGluZyB9IGZyb20gXCIuL3BhaW50ZXIuanNcIjtcbmltcG9ydCB7IHNhdmVQcm9ncmVzcywgbG9hZFByb2dyZXNzLCBjbGVhclByb2dyZXNzLCBnZXRQcm9ncmVzc0luZm8gfSBmcm9tIFwiLi9zYXZlLWxvYWQuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUltYWdlVUksIHNob3dDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4vdWkuanNcIjtcbmltcG9ydCB7IGdldFNlc3Npb24gfSBmcm9tIFwiLi4vY29yZS93cGxhY2UtYXBpLmpzXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplTGFuZ3VhZ2UsIGdldFNlY3Rpb24sIHQsIGdldEN1cnJlbnRMYW5ndWFnZSB9IGZyb20gXCIuLi9sb2NhbGVzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBpc1BhbGV0dGVPcGVuLCBhdXRvQ2xpY2tQYWludEJ1dHRvbiB9IGZyb20gXCIuLi9jb3JlL2RvbS5qc1wiO1xuaW1wb3J0IFwiLi9wbGFuLW92ZXJsYXktYmx1ZS1tYXJibGUuanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkltYWdlKCkge1xuICBsb2coJ1x1RDgzRFx1REU4MCBJbmljaWFuZG8gV1BsYWNlIEF1dG8tSW1hZ2UgKHZlcnNpXHUwMEYzbiBtb2R1bGFyKScpO1xuICBcbiAgLy8gSW5pY2lhbGl6YXIgc2lzdGVtYSBkZSBpZGlvbWFzXG4gIGluaXRpYWxpemVMYW5ndWFnZSgpO1xuICBcbiAgLy8gQXNlZ3VyYXJzZSBxdWUgZWwgZXN0YWRvIGdsb2JhbCBleGlzdGVcbiAgd2luZG93Ll9fd3BsYWNlQm90ID0geyAuLi53aW5kb3cuX193cGxhY2VCb3QsIGltYWdlUnVubmluZzogdHJ1ZSB9O1xuXG4gIGxldCBjdXJyZW50VXNlckluZm8gPSBudWxsOyAvLyBWYXJpYWJsZSBnbG9iYWwgcGFyYSBpbmZvcm1hY2lcdTAwRjNuIGRlbCB1c3VhcmlvXG4gIGxldCBvcmlnaW5hbEZldGNoID0gd2luZG93LmZldGNoOyAvLyBHdWFyZGFyIGZldGNoIG9yaWdpbmFsIGdsb2JhbG1lbnRlXG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSByZXN0YXVyYXIgZmV0Y2ggb3JpZ2luYWwgZGUgZm9ybWEgc2VndXJhXG4gIGNvbnN0IHJlc3RvcmVGZXRjaCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmZldGNoICE9PSBvcmlnaW5hbEZldGNoKSB7XG4gICAgICB3aW5kb3cuZmV0Y2ggPSBvcmlnaW5hbEZldGNoO1xuICAgICAgbG9nKCdcdUQ4M0RcdUREMDQgRmV0Y2ggb3JpZ2luYWwgcmVzdGF1cmFkbycpO1xuICAgIH1cbiAgICBpZiAoaW1hZ2VTdGF0ZS5wb3NpdGlvblRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGltYWdlU3RhdGUucG9zaXRpb25UaW1lb3V0SWQpO1xuICAgICAgaW1hZ2VTdGF0ZS5wb3NpdGlvblRpbWVvdXRJZCA9IG51bGw7XG4gICAgfVxuICAgIGlmIChpbWFnZVN0YXRlLmNsZWFudXBPYnNlcnZlcikge1xuICAgICAgaW1hZ2VTdGF0ZS5jbGVhbnVwT2JzZXJ2ZXIoKTtcbiAgICAgIGltYWdlU3RhdGUuY2xlYW51cE9ic2VydmVyID0gbnVsbDtcbiAgICB9XG4gICAgaW1hZ2VTdGF0ZS5zZWxlY3RpbmdQb3NpdGlvbiA9IGZhbHNlO1xuICB9O1xuXG4gIHRyeSB7XG4gICAgLy8gSW5pY2lhbGl6YXIgY29uZmlndXJhY2lcdTAwRjNuXG4gICAgY29uc3QgY29uZmlnID0geyAuLi5JTUFHRV9ERUZBVUxUUyB9O1xuICAgIFxuICAgIC8vIE9idGVuZXIgdGV4dG9zIGVuIGVsIGlkaW9tYSBhY3R1YWxcbiAgICBjb25zdCB0ZXh0cyA9IGdldFNlY3Rpb24oJ2ltYWdlJyk7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGVsIGlkaW9tYVxuICAgIGltYWdlU3RhdGUubGFuZ3VhZ2UgPSBnZXRDdXJyZW50TGFuZ3VhZ2UoKTtcbiAgICBcbiAgICAvLyBWZXJpZmljYXIgc2l0ZWtleVxuICAgIGlmICghY29uZmlnLlNJVEVLRVkpIHtcbiAgICAgIGNvbnN0IHNpdGVLZXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltkYXRhLXNpdGVrZXldJyk7XG4gICAgICBpZiAoc2l0ZUtleUVsZW1lbnQpIHtcbiAgICAgICAgY29uZmlnLlNJVEVLRVkgPSBzaXRlS2V5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l0ZWtleScpO1xuICAgICAgICBsb2coYFx1RDgzRFx1RENERCBTaXRla2V5IGVuY29udHJhZGEgYXV0b21cdTAwRTF0aWNhbWVudGU6ICR7Y29uZmlnLlNJVEVLRVkuc3Vic3RyaW5nKDAsIDIwKX0uLi5gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gZW5jb250cmFyIGxhIHNpdGVrZXkgYXV0b21cdTAwRTF0aWNhbWVudGUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGdW5jaVx1MDBGM24gcGFyYSBhdXRvLWluaWNpbyBkZWwgYm90XG4gICAgYXN5bmMgZnVuY3Rpb24gdHJ5QXV0b0luaXQoKSB7XG4gICAgICBsb2coJ1x1RDgzRVx1REQxNiBJbnRlbnRhbmRvIGF1dG8taW5pY2lvLi4uJyk7XG4gICAgICBcbiAgICAgIC8vIFZlcmlmaWNhciBzaSBsYSBwYWxldGEgeWEgZXN0XHUwMEUxIGFiaWVydGFcbiAgICAgIGlmIChpc1BhbGV0dGVPcGVuKCkpIHtcbiAgICAgICAgbG9nKCdcdUQ4M0NcdURGQTggUGFsZXRhIGRlIGNvbG9yZXMgeWEgZXN0XHUwMEUxIGFiaWVydGEnKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGxvZygnXHVEODNEXHVERDBEIFBhbGV0YSBubyBlbmNvbnRyYWRhLCBpbmljaWFuZG8gYXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludC4uLicpO1xuICAgICAgXG4gICAgICAvLyBVc2FyIGxhIG51ZXZhIGZ1bmNpXHUwMEYzbiBkZSBhdXRvLWNsaWNrIHF1ZSBoYWNlIGRvYmxlIGNsaWMgYXV0b21cdTAwRTF0aWNhbWVudGVcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBhdXRvQ2xpY2tQYWludEJ1dHRvbigzLCB0cnVlKTtcbiAgICAgIFxuICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgbG9nKCdcdTI3MDUgQXV0by1jbGljayBleGl0b3NvLCBwYWxldGEgYWJpZXJ0YScpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZygnXHUyNzRDIEF1dG8tY2xpY2sgZmFsbFx1MDBGMywgcmVxdWVyaXJcdTAwRTEgaW5pY2lvIG1hbnVhbCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgaW5pY2lhbGl6YXIgZWwgYm90ICh1c2FkYSB0YW50byBwYXJhIGF1dG8taW5pY2lvIGNvbW8gaW5pY2lvIG1hbnVhbClcbiAgICBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplQm90KGlzQXV0b0luaXQgPSBmYWxzZSkge1xuICAgICAgbG9nKCdcdUQ4M0VcdUREMTYgSW5pY2lhbGl6YW5kbyBBdXRvLUltYWdlLi4uJyk7XG4gICAgICBcbiAgICAgIC8vIFZlcmlmaWNhciBjb2xvcmVzIGRpc3BvbmlibGVzXG4gICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UuY2hlY2tpbmdDb2xvcnMnKSwgJ2luZm8nKTtcbiAgICAgIGNvbnN0IGNvbG9ycyA9IGRldGVjdEF2YWlsYWJsZUNvbG9ycygpO1xuICAgICAgXG4gICAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2Uubm9Db2xvcnNGb3VuZCcpLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBPYnRlbmVyIGluZm9ybWFjaVx1MDBGM24gZGVsIHVzdWFyaW9cbiAgICAgIGNvbnN0IHNlc3Npb25JbmZvID0gYXdhaXQgZ2V0U2Vzc2lvbigpO1xuICAgICAgbGV0IHVzZXJJbmZvID0gbnVsbDtcbiAgICAgIGlmIChzZXNzaW9uSW5mby5zdWNjZXNzICYmIHNlc3Npb25JbmZvLmRhdGEudXNlcikge1xuICAgICAgICB1c2VySW5mbyA9IHtcbiAgICAgICAgICB1c2VybmFtZTogc2Vzc2lvbkluZm8uZGF0YS51c2VyLm5hbWUgfHwgJ0FuXHUwMEYzbmltbycsXG4gICAgICAgICAgY2hhcmdlczogc2Vzc2lvbkluZm8uZGF0YS5jaGFyZ2VzLFxuICAgICAgICAgIG1heENoYXJnZXM6IHNlc3Npb25JbmZvLmRhdGEubWF4Q2hhcmdlcyxcbiAgICAgICAgICBwaXhlbHM6IHNlc3Npb25JbmZvLmRhdGEudXNlci5waXhlbHNQYWludGVkIHx8IDAgIC8vIFVzYXIgcGl4ZWxzUGFpbnRlZCBlbiBsdWdhciBkZSBwaXhlbHNcbiAgICAgICAgfTtcbiAgICAgICAgY3VycmVudFVzZXJJbmZvID0gdXNlckluZm87IC8vIEFjdHVhbGl6YXIgdmFyaWFibGUgZ2xvYmFsXG4gICAgICAgIGltYWdlU3RhdGUuY3VycmVudENoYXJnZXMgPSBzZXNzaW9uSW5mby5kYXRhLmNoYXJnZXM7XG4gICAgICAgIGltYWdlU3RhdGUubWF4Q2hhcmdlcyA9IHNlc3Npb25JbmZvLmRhdGEubWF4Q2hhcmdlcyB8fCA1MDsgLy8gR3VhcmRhciBtYXhDaGFyZ2VzIGVuIHN0YXRlXG4gICAgICAgIGxvZyhgXHVEODNEXHVEQzY0IFVzdWFyaW8gY29uZWN0YWRvOiAke3Nlc3Npb25JbmZvLmRhdGEudXNlci5uYW1lIHx8ICdBblx1MDBGM25pbW8nfSAtIENhcmdhczogJHt1c2VySW5mby5jaGFyZ2VzfS8ke3VzZXJJbmZvLm1heENoYXJnZXN9IC0gUFx1MDBFRHhlbGVzOiAke3VzZXJJbmZvLnBpeGVsc31gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIE5vIHNlIHB1ZG8gb2J0ZW5lciBpbmZvcm1hY2lcdTAwRjNuIGRlbCB1c3VhcmlvJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGltYWdlU3RhdGUuYXZhaWxhYmxlQ29sb3JzID0gY29sb3JzO1xuICAgICAgaW1hZ2VTdGF0ZS5jb2xvcnNDaGVja2VkID0gdHJ1ZTtcbiAgICAgIFxuICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLmNvbG9yc0ZvdW5kJywgeyBjb3VudDogY29sb3JzLmxlbmd0aCB9KSwgJ3N1Y2Nlc3MnKTtcbiAgICAgIHVpLnVwZGF0ZVByb2dyZXNzKDAsIDAsIHVzZXJJbmZvKTtcbiAgICAgIFxuICAgICAgLy8gU29sbyBtb3N0cmFyIGxvZyB1bmEgdmV6IChldml0YXIgZHVwbGljYWRvIGVuIGF1dG8taW5pY2lvKVxuICAgICAgaWYgKCFpc0F1dG9Jbml0KSB7XG4gICAgICAgIGxvZyhgXHUyNzA1ICR7Y29sb3JzLmxlbmd0aH0gY29sb3JlcyBkaXNwb25pYmxlcyBkZXRlY3RhZG9zYCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIE1hcmNhciBjb21vIGluaWNpYWxpemFkbyBleGl0b3NhbWVudGUgcGFyYSBkZXNoYWJpbGl0YXIgZWwgYm90XHUwMEYzblxuICAgICAgdWkuc2V0SW5pdGlhbGl6ZWQodHJ1ZSk7XG4gICAgICBcbiAgICAgIC8vIEhhYmlsaXRhciBib3RvbmVzIGRlIHVwbG9hZCB5IGxvYWQgcHJvZ3Jlc3NcbiAgICAgIHVpLmVuYWJsZUJ1dHRvbnNBZnRlckluaXQoKTtcblxuICAgICAgLy8gSW5pY2lhbGl6YXIgcGxhbiBvdmVybGF5IHNpIHlhIGhheSBjb2xhIHByZXZpYSAocC5lai4gcmVhbnVkYWNpXHUwMEYzbilcbiAgICAgIHRyeSB7XG4gICAgLy8gUmVtb3ZlZCByZWZlcmVuY2VzIHRvIF9fV1BBX1BMQU5fT1ZFUkxBWV9fXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gbm9vcFxuICAgICAgfVxuICAgICAgXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBDcmVhciBpbnRlcmZheiBkZSB1c3VhcmlvXG4gICAgY29uc3QgdWkgPSBhd2FpdCBjcmVhdGVJbWFnZVVJKHtcbiAgICAgIHRleHRzLFxuICAgICAgXG4gICAgICBvbkNvbmZpZ0NoYW5nZTogKGNvbmZpZykgPT4ge1xuICAgICAgICAvLyBNYW5lamFyIGNhbWJpb3MgZGUgY29uZmlndXJhY2lcdTAwRjNuXG4gICAgICAgIGlmIChjb25maWcucGl4ZWxzUGVyQmF0Y2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGltYWdlU3RhdGUucGl4ZWxzUGVyQmF0Y2ggPSBjb25maWcucGl4ZWxzUGVyQmF0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy51c2VBbGxDaGFyZ2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpbWFnZVN0YXRlLnVzZUFsbENoYXJnZXNGaXJzdCA9IGNvbmZpZy51c2VBbGxDaGFyZ2VzO1xuICAgICAgICB9XG4gICAgICAgIGxvZyhgQ29uZmlndXJhY2lcdTAwRjNuIGFjdHVhbGl6YWRhOmAsIGNvbmZpZyk7XG4gICAgICB9LFxuICAgICAgXG4gICAgICBvbkluaXRCb3Q6IGluaXRpYWxpemVCb3QsXG4gICAgICBcbiAgICAgIG9uVXBsb2FkSW1hZ2U6IGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLmxvYWRpbmdJbWFnZScpLCAnaW5mbycpO1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGltYWdlVXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICAgICAgY29uc3QgcHJvY2Vzc29yID0gbmV3IEJsdWVNYXJibGVsSW1hZ2VQcm9jZXNzb3IoaW1hZ2VVcmwpO1xuICAgICAgICAgIHByb2Nlc3Nvci5vcmlnaW5hbE5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgXG4gICAgICAgICAgYXdhaXQgcHJvY2Vzc29yLmxvYWQoKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBJbmljaWFsaXphciBwYWxldGEgZGUgY29sb3JlcyBCbHVlIE1hcmJsZVxuICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZUNvbG9ycyA9IHByb2Nlc3Nvci5pbml0aWFsaXplQ29sb3JQYWxldHRlKCk7XG4gICAgICAgICAgaW1hZ2VTdGF0ZS5hdmFpbGFibGVDb2xvcnMgPSBhdmFpbGFibGVDb2xvcnM7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gQW5hbGl6YXIgcFx1MDBFRHhlbGVzIGRlIGxhIGltYWdlblxuICAgICAgICAgIGNvbnN0IGFuYWx5c2lzUmVzdWx0ID0gYXdhaXQgcHJvY2Vzc29yLmFuYWx5emVQaXhlbHMoKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBFc3RhYmxlY2VyIGNvb3JkZW5hZGFzIGJhc2UgKHNlIGFjdHVhbGl6YXJcdTAwRTFuIGFsIHNlbGVjY2lvbmFyIHBvc2ljaVx1MDBGM24pXG4gICAgICAgICAgcHJvY2Vzc29yLnNldENvb3JkcygwLCAwLCAwLCAwKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBPYnRlbmVyIGRhdG9zIGRlIGltYWdlbiBwcm9jZXNhZG9zXG4gICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRGF0YSA9IHByb2Nlc3Nvci5nZXRJbWFnZURhdGEoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpbWFnZVN0YXRlLmltYWdlRGF0YSA9IHByb2Nlc3NlZERhdGE7XG4gICAgICAgICAgaW1hZ2VTdGF0ZS5pbWFnZURhdGEucHJvY2Vzc29yID0gcHJvY2Vzc29yOyAvLyBHdWFyZGFyIHJlZmVyZW5jaWEgYWwgcHJvY2Vzc29yIHBhcmEgcmVzaXplXG4gICAgICAgICAgaW1hZ2VTdGF0ZS50b3RhbFBpeGVscyA9IGFuYWx5c2lzUmVzdWx0LnJlcXVpcmVkUGl4ZWxzO1xuICAgICAgICAgIGltYWdlU3RhdGUucGFpbnRlZFBpeGVscyA9IDA7XG4gICAgICAgICAgaW1hZ2VTdGF0ZS5vcmlnaW5hbEltYWdlTmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgICBpbWFnZVN0YXRlLmltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UuaW1hZ2VMb2FkZWQnLCB7IGNvdW50OiBhbmFseXNpc1Jlc3VsdC5yZXF1aXJlZFBpeGVscyB9KSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICB1aS51cGRhdGVQcm9ncmVzcygwLCBhbmFseXNpc1Jlc3VsdC5yZXF1aXJlZFBpeGVscywgY3VycmVudFVzZXJJbmZvKTtcbiAgICAgICAgICBcbiAgICAgICAgICBsb2coYFx1MjcwNSBbQkxVRSBNQVJCTEVdIEltYWdlbiBjYXJnYWRhOiAke3Byb2Nlc3NlZERhdGEud2lkdGh9eCR7cHJvY2Vzc2VkRGF0YS5oZWlnaHR9LCAke2FuYWx5c2lzUmVzdWx0LnJlcXVpcmVkUGl4ZWxzfSBwXHUwMEVEeGVsZXMgdlx1MDBFMWxpZG9zYCk7XG4gICAgICAgICAgbG9nKGBcdTI3MDUgW0JMVUUgTUFSQkxFXSBBblx1MDBFMWxpc2lzOiAke2FuYWx5c2lzUmVzdWx0LnVuaXF1ZUNvbG9yc30gY29sb3JlcyBcdTAwRkFuaWNvcywgJHthbmFseXNpc1Jlc3VsdC5kZWZhY2VQaXhlbHN9IHBcdTAwRUR4ZWxlcyAjZGVmYWNlYCk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gTGltcGlhciBVUkwgdGVtcG9yYWwgKGVsIG92ZXJsYXkgdXNhIHVuIGRhdGFVUkwgc2VwYXJhZG8pXG4gICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1hZ2VVcmwpO1xuXG4gICAgICAgICAgLy8gQWN0aXZhciBvdmVybGF5IGRlIHBsYW4gYXV0b21cdTAwRTF0aWNhbWVudGUgY3VhbmRvIHNlIGNhcmdhIGltYWdlblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAod2luZG93Ll9fV1BBX1BMQU5fT1ZFUkxBWV9fKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXy5pbmplY3RTdHlsZXMoKTtcbiAgICAgICAgICAgICAgd2luZG93Ll9fV1BBX1BMQU5fT1ZFUkxBWV9fLnNldEVuYWJsZWQodHJ1ZSk7IC8vIEFjdGl2YXIgYXV0b21cdTAwRTF0aWNhbWVudGVcbiAgICAgICAgICAgICAgLy8gQ29uZmlndXJhciBhbmNsYSBiYXNlIGNvbiBsYSBwb3NpY2lcdTAwRjNuIGRlbCB0aWxlIChzZXJcdTAwRTEgYWp1c3RhZGEgYWwgc2VsZWNjaW9uYXIgcG9zaWNpXHUwMEYzbilcbiAgICAgICAgICAgICAgd2luZG93Ll9fV1BBX1BMQU5fT1ZFUkxBWV9fLnNldFBsYW4oW10sIHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5leHRCYXRjaENvdW50OiAwXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBsb2coJ1x1MjcwNSBQbGFuIG92ZXJsYXkgYWN0aXZhZG8gYXV0b21cdTAwRTF0aWNhbWVudGUgYWwgY2FyZ2FyIGltYWdlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIEVycm9yIGFjdGl2YW5kbyBwbGFuIG92ZXJsYXk6JywgZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5pbWFnZUVycm9yJyksICdlcnJvcicpO1xuICAgICAgICAgIGxvZygnXHUyNzRDIEVycm9yIGNhcmdhbmRvIGltYWdlbjonLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXG4gICAgICBvblNlbGVjdFBvc2l0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5zZWxlY3RQb3NpdGlvbkFsZXJ0JyksICdpbmZvJyk7XG4gICAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLndhaXRpbmdQb3NpdGlvbicpLCAnaW5mbycpO1xuICAgICAgICAgIFxuICAgICAgICAgIGltYWdlU3RhdGUuc2VsZWN0aW5nUG9zaXRpb24gPSB0cnVlO1xuICAgICAgICAgIGxldCBwb3NpdGlvbkNhcHR1cmVkID0gZmFsc2U7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gTVx1MDBFOXRvZG8gMTogSW50ZXJjZXB0YXIgZmV0Y2ggKG1cdTAwRTl0b2RvIG9yaWdpbmFsIG1lam9yYWRvKVxuICAgICAgICAgIGNvbnN0IHNldHVwRmV0Y2hJbnRlcmNlcHRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuZmV0Y2ggPSBhc3luYyAodXJsLCBvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICAgIC8vIFNvbG8gaW50ZXJjZXB0YXIgcmVxdWVzdHMgZXNwZWNcdTAwRURmaWNvcyBkZSBwaW50YWRvIGN1YW5kbyBlc3RhbW9zIHNlbGVjY2lvbmFuZG8gcG9zaWNpXHUwMEYzblxuICAgICAgICAgICAgICBpZiAoaW1hZ2VTdGF0ZS5zZWxlY3RpbmdQb3NpdGlvbiAmJiBcbiAgICAgICAgICAgICAgICAgICFwb3NpdGlvbkNhcHR1cmVkICYmXG4gICAgICAgICAgICAgICAgICB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyAmJiBcbiAgICAgICAgICAgICAgICAgIHVybC5pbmNsdWRlcygnL3MwL3BpeGVsLycpICYmIFxuICAgICAgICAgICAgICAgICAgb3B0aW9ucyAmJiBcbiAgICAgICAgICAgICAgICAgIG9wdGlvbnMubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgbG9nKGBcdUQ4M0NcdURGQUYgSW50ZXJjZXB0YW5kbyByZXF1ZXN0IGRlIHBpbnRhZG86ICR7dXJsfWApO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rICYmIG9wdGlvbnMuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYm9keURhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgYm9keURhdGEgPSBKU09OLnBhcnNlKG9wdGlvbnMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHBhcnNlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2coJ0Vycm9yIHBhcnNlYW5kbyBib2R5IGRlbCByZXF1ZXN0OicsIHBhcnNlRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHlEYXRhLmNvb3JkcyAmJiBBcnJheS5pc0FycmF5KGJvZHlEYXRhLmNvb3JkcykgJiYgYm9keURhdGEuY29vcmRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYWxYID0gYm9keURhdGEuY29vcmRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsWSA9IGJvZHlEYXRhLmNvb3Jkc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWVyIHRpbGUgZGUgbGEgVVJMIGRlIGZvcm1hIG1cdTAwRTFzIHJvYnVzdGFcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWxlTWF0Y2ggPSB1cmwubWF0Y2goL1xcL3MwXFwvcGl4ZWxcXC8oLT9cXGQrKVxcLygtP1xcZCspLyk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHRpbGVNYXRjaCAmJiAhcG9zaXRpb25DYXB0dXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25DYXB0dXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWxlWCA9IHBhcnNlSW50KHRpbGVNYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWxlWSA9IHBhcnNlSW50KHRpbGVNYXRjaFsyXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEd1YXJkYXIgY29vcmRlbmFkYXMgdGlsZS9waXhlbFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdGF0ZS50aWxlWCA9IHRpbGVYO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdGF0ZS50aWxlWSA9IHRpbGVZO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uID0geyB4OiBsb2NhbFgsIHk6IGxvY2FsWSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdGF0ZS5zZWxlY3RpbmdQb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBY3R1YWxpemFyIGNvb3JkZW5hZGFzIGRlbCBwcm9jZXNhZG9yIEJsdWUgTWFyYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTdGF0ZS5pbWFnZURhdGEgJiYgaW1hZ2VTdGF0ZS5pbWFnZURhdGEucHJvY2Vzc29yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NvciA9IGltYWdlU3RhdGUuaW1hZ2VEYXRhLnByb2Nlc3NvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yLnNldENvb3Jkcyh0aWxlWCwgdGlsZVksIGxvY2FsWCwgbG9jYWxZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdlbmVyYXIgdGlsZXMgZGUgdGVtcGxhdGUgdW5hIHZleiBxdWUgdGVuZW1vcyBjb29yZGVuYWRhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb2Nlc3Nvci5jcmVhdGVUZW1wbGF0ZVRpbGVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nKGBcdTI3MDUgW0JMVUUgTUFSQkxFXSBUZW1wbGF0ZSB0aWxlcyBjcmVhZG9zIHBhcmEgcG9zaWNpXHUwMEYzbiB0aWxlKCR7dGlsZVh9LCR7dGlsZVl9KSBwaXhlbCgke2xvY2FsWH0sJHtsb2NhbFl9KWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhgXHUyNzRDIFtCTFVFIE1BUkJMRV0gRXJyb3IgY3JlYW5kbyB0ZW1wbGF0ZSB0aWxlczogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWdlbmVyYXIgY29sYSBkZSBwXHUwMEVEeGVsZXMgY29uIGNvb3JkZW5hZGFzIGFjdHVhbGl6YWRhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwaXhlbFF1ZXVlID0gcHJvY2Vzc29yLmdlbmVyYXRlUGl4ZWxRdWV1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVN0YXRlLnJlbWFpbmluZ1BpeGVscyA9IHBpeGVsUXVldWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlU3RhdGUudG90YWxQaXhlbHMgPSBwaXhlbFF1ZXVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhgXHUyNzA1IENvbGEgZGUgcFx1MDBFRHhlbGVzIGdlbmVyYWRhOiAke3BpeGVsUXVldWUubGVuZ3RofSBwXHUwMEVEeGVsZXMgcGFyYSBvdmVybGF5YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbmZpZ3VyYXIgb3ZlcmxheSBkZWwgcGxhbiBjb24gbGEgcG9zaWNpXHUwMEYzbiBzZWxlY2Npb25hZGFcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uaW5qZWN0U3R5bGVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9fV1BBX1BMQU5fT1ZFUkxBWV9fLnNldEVuYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29uZmlndXJhciBhbmNsYSBsXHUwMEYzZ2ljYSAodGlsZS9waXhlbCkgcGFyYSBwb3NpY2lvbmFtaWVudG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX19XUEFfUExBTl9PVkVSTEFZX18uc2V0QW5jaG9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVYOiB0aWxlWCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVZOiB0aWxlWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB4WDogbG9jYWxYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHhZOiBsb2NhbFlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2FyIGxhIGNvbGEgZGUgcFx1MDBFRHhlbGVzIHJlZ2VuZXJhZGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMgJiYgaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9fV1BBX1BMQU5fT1ZFUkxBWV9fLnNldFBsYW4oaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yOiB7IHRpbGVYOiB0aWxlWCwgdGlsZVk6IHRpbGVZLCBweFg6IGxvY2FsWCwgcHhZOiBsb2NhbFkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VXaWR0aDogaW1hZ2VTdGF0ZS5pbWFnZURhdGEud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0OiBpbWFnZVN0YXRlLmltYWdlRGF0YS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2coYFx1MjcwNSBQbGFuIG92ZXJsYXkgYW5jbGFkbyBlbiB0aWxlKCR7dGlsZVh9LCR7dGlsZVl9KSBsb2NhbCgke2xvY2FsWH0sJHtsb2NhbFl9KWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2coYFx1MjZBMFx1RkUwRiBObyBoYXkgcFx1MDBFRHhlbGVzIHBhcmEgbW9zdHJhciBlbiBvdmVybGF5YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsb2coYFx1Mjc0QyBFcnJvciBjb25maWd1cmFuZG8gb3ZlcmxheTogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0YXVyYXIgZmV0Y2ggb3JpZ2luYWwgaW5tZWRpYXRhbWVudGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RvcmVGZXRjaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UucG9zaXRpb25TZXQnKSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhgXHUyNzA1IFBvc2ljaVx1MDBGM24gZXN0YWJsZWNpZGE6IHRpbGUoJHtpbWFnZVN0YXRlLnRpbGVYfSwke2ltYWdlU3RhdGUudGlsZVl9KSBsb2NhbCgke2xvY2FsWH0sJHtsb2NhbFl9KWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coJ1x1MjZBMFx1RkUwRiBObyBzZSBwdWRvIGV4dHJhZXIgdGlsZSBkZSBsYSBVUkw6JywgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICBsb2coJ1x1Mjc0QyBFcnJvciBpbnRlcmNlcHRhbmRvIHBpeGVsOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgIC8vIEVuIGNhc28gZGUgZXJyb3IsIHJlc3RhdXJhciBmZXRjaCB5IGNvbnRpbnVhciBjb24gZWwgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgIGlmICghcG9zaXRpb25DYXB0dXJlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXN0b3JlRmV0Y2goKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIFBhcmEgdG9kb3MgbG9zIGRlbVx1MDBFMXMgcmVxdWVzdHMsIHVzYXIgZmV0Y2ggb3JpZ2luYWxcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBNXHUwMEU5dG9kbyAyOiBPYnNlcnZlciBkZSBjYW52YXMgcGFyYSBkZXRlY3RhciBjYW1iaW9zIHZpc3VhbGVzXG4gICAgICAgICAgY29uc3Qgc2V0dXBDYW52YXNPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnY2FudmFzJyk7XG4gICAgICAgICAgICBpZiAoY2FudmFzRWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIE5vIHNlIGVuY29udHJhcm9uIGVsZW1lbnRvcyBjYW52YXMnKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsb2coYFx1RDgzRFx1RENDQSBDb25maWd1cmFuZG8gb2JzZXJ2ZXIgcGFyYSAke2NhbnZhc0VsZW1lbnRzLmxlbmd0aH0gY2FudmFzYCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEVzY3VjaGFyIGV2ZW50b3MgZGUgY2xpY2sgZW4gZWwgZG9jdW1lbnRvIHBhcmEgZGV0ZWN0YXIgcGludGFkb1xuICAgICAgICAgICAgY29uc3QgY2xpY2tIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICghaW1hZ2VTdGF0ZS5zZWxlY3RpbmdQb3NpdGlvbiB8fCBwb3NpdGlvbkNhcHR1cmVkKSByZXR1cm47XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvLyBWZXJpZmljYXIgc2kgZWwgY2xpY2sgZnVlIGVuIHVuIGNhbnZhc1xuICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LnRhZ05hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICAgICAgbG9nKCdcdUQ4M0RcdUREQjFcdUZFMEYgQ2xpY2sgZGV0ZWN0YWRvIGVuIGNhbnZhcyBkdXJhbnRlIHNlbGVjY2lcdTAwRjNuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXIgY29vcmRlbmFkYXMgQ1NTIHJlbGF0aXZhcyBhbCBjb250ZW5lZG9yIGRlbCBib2FyZCBwYXJhIGFuY2xhIENTU1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpPy5wYXJlbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjc3NYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNzc1kgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICBpZiAod2luZG93Ll9fV1BBX1BMQU5fT1ZFUkxBWV9fKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXy5zZXRBbmNob3JDc3MoY3NzWCwgY3NzWSk7XG4gICAgICAgICAgICAgICAgICAgIGxvZyhgUGxhbiBvdmVybGF5OiBhbmNsYSBDU1MgZXN0YWJsZWNpZGEgZW4gKCR7Y3NzWH0sICR7Y3NzWX0pYCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgbG9nKCdQbGFuIE92ZXJsYXk6IGVycm9yIGNhbGN1bGFuZG8gYW5jbGEgQ1NTJywgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIERhciB0aWVtcG8gcGFyYSBxdWUgc2UgcHJvY2VzZSBlbCBwaW50YWRvXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoIXBvc2l0aW9uQ2FwdHVyZWQgJiYgaW1hZ2VTdGF0ZS5zZWxlY3RpbmdQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBsb2coJ1x1RDgzRFx1REQwRCBCdXNjYW5kbyByZXF1ZXN0cyByZWNpZW50ZXMgZGUgcGludGFkby4uLicpO1xuICAgICAgICAgICAgICAgICAgICAvLyBFbCBmZXRjaCBpbnRlcmNlcHRvciBtYW5lamFyXHUwMEUxIGxhIGNhcHR1cmFcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIExpbXBpYXIgb2JzZXJ2ZXIgYWwgZmluYWxpemFyXG4gICAgICAgICAgICBpbWFnZVN0YXRlLmNsZWFudXBPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIENvbmZpZ3VyYXIgYW1ib3MgbVx1MDBFOXRvZG9zXG4gICAgICAgICAgc2V0dXBGZXRjaEludGVyY2VwdGlvbigpO1xuICAgICAgICAgIHNldHVwQ2FudmFzT2JzZXJ2ZXIoKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBUaW1lb3V0IHBhcmEgc2VsZWNjaVx1MDBGM24gZGUgcG9zaWNpXHUwMEYzbiBjb24gY2xlYW51cCBtZWpvcmFkb1xuICAgICAgICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGltYWdlU3RhdGUuc2VsZWN0aW5nUG9zaXRpb24gJiYgIXBvc2l0aW9uQ2FwdHVyZWQpIHtcbiAgICAgICAgICAgICAgcmVzdG9yZUZldGNoKCk7XG4gICAgICAgICAgICAgIGlmIChpbWFnZVN0YXRlLmNsZWFudXBPYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIGltYWdlU3RhdGUuY2xlYW51cE9ic2VydmVyKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLnBvc2l0aW9uVGltZW91dCcpLCAnZXJyb3InKTtcbiAgICAgICAgICAgICAgbG9nKCdcdTIzRjAgVGltZW91dCBlbiBzZWxlY2NpXHUwMEYzbiBkZSBwb3NpY2lcdTAwRjNuJyk7XG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDEyMDAwMCk7IC8vIDIgbWludXRvc1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIEd1YXJkYXIgdGltZW91dCBwYXJhIHBvZGVyIGNhbmNlbGFybG9cbiAgICAgICAgICBpbWFnZVN0YXRlLnBvc2l0aW9uVGltZW91dElkID0gdGltZW91dElkO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBcbiAgICAgIG9uU3RhcnRQYWludGluZzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBEZWJ1ZzogdmVyaWZpY2FyIGVzdGFkbyBhbnRlcyBkZSB2YWxpZGFyXG4gICAgICAgIGxvZyhgXHVEODNEXHVERDBEIEVzdGFkbyBwYXJhIGluaWNpYXIgcGludHVyYTpgLCB7XG4gICAgICAgICAgaW1hZ2VMb2FkZWQ6IGltYWdlU3RhdGUuaW1hZ2VMb2FkZWQsXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbjogaW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uLFxuICAgICAgICAgIHRpbGVYOiBpbWFnZVN0YXRlLnRpbGVYLFxuICAgICAgICAgIHRpbGVZOiBpbWFnZVN0YXRlLnRpbGVZLFxuICAgICAgICAgIHRvdGFsUGl4ZWxzOiBpbWFnZVN0YXRlLnRvdGFsUGl4ZWxzLFxuICAgICAgICAgIHJlbWFpbmluZ1BpeGVsczogaW1hZ2VTdGF0ZS5yZW1haW5pbmdQaXhlbHM/Lmxlbmd0aCB8fCAwXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFpbWFnZVN0YXRlLmltYWdlTG9hZGVkIHx8ICFpbWFnZVN0YXRlLnN0YXJ0UG9zaXRpb24pIHtcbiAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UubWlzc2luZ1JlcXVpcmVtZW50cycpLCAnZXJyb3InKTtcbiAgICAgICAgICBsb2coYFx1Mjc0QyBWYWxpZGFjaVx1MDBGM24gZmFsbGlkYTogaW1hZ2VMb2FkZWQ9JHtpbWFnZVN0YXRlLmltYWdlTG9hZGVkfSwgc3RhcnRQb3NpdGlvbj0keyEhaW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9ufWApO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaW1hZ2VTdGF0ZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgaW1hZ2VTdGF0ZS5zdG9wRmxhZyA9IGZhbHNlO1xuICAgICAgICBpbWFnZVN0YXRlLmlzRmlyc3RCYXRjaCA9IHRydWU7IC8vIFJlc2V0ZWFyIGZsYWcgZGUgcHJpbWVyYSBwYXNhZGFcbiAgICAgICAgXG4gICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5zdGFydFBhaW50aW5nTXNnJyksICdzdWNjZXNzJyk7XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHByb2Nlc3NJbWFnZShcbiAgICAgICAgICAgIGltYWdlU3RhdGUuaW1hZ2VEYXRhLFxuICAgICAgICAgICAgaW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uLFxuICAgICAgICAgICAgLy8gb25Qcm9ncmVzcyAtIGFob3JhIGluY2x1eWUgdGllbXBvIGVzdGltYWRvXG4gICAgICAgICAgICAocGFpbnRlZCwgdG90YWwsIG1lc3NhZ2UsIGVzdGltYXRlZFRpbWUpID0+IHtcbiAgICAgICAgICAgICAgLy8gQWN0dWFsaXphciBjYXJnYXMgZW4gdXNlckluZm8gc2kgZXhpc3RlXG4gICAgICAgICAgICAgIGlmIChjdXJyZW50VXNlckluZm8pIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VXNlckluZm8uY2hhcmdlcyA9IE1hdGguZmxvb3IoaW1hZ2VTdGF0ZS5jdXJyZW50Q2hhcmdlcyk7XG4gICAgICAgICAgICAgICAgaWYgKGVzdGltYXRlZFRpbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFVzZXJJbmZvLmVzdGltYXRlZFRpbWUgPSBlc3RpbWF0ZWRUaW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgdWkudXBkYXRlUHJvZ3Jlc3MocGFpbnRlZCwgdG90YWwsIGN1cnJlbnRVc2VySW5mbyk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvLyBBY3R1YWxpemFyIGRpc3BsYXkgZGUgY29vbGRvd24gc2kgaGF5IGNvb2xkb3duIGFjdGl2b1xuICAgICAgICAgICAgICBpZiAoaW1hZ2VTdGF0ZS5pbkNvb2xkb3duICYmIGltYWdlU3RhdGUubmV4dEJhdGNoQ29vbGRvd24gPiAwKSB7XG4gICAgICAgICAgICAgICAgdWkudXBkYXRlQ29vbGRvd25EaXNwbGF5KGltYWdlU3RhdGUubmV4dEJhdGNoQ29vbGRvd24pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVpLnVwZGF0ZUNvb2xkb3duRGlzcGxheSgwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2FyIGZ1bmNpXHUwMEYzbiBvcHRpbWl6YWRhIHBhcmEgbWVuc2FqZXMgZGUgY29vbGRvd24gcGFyYSBldml0YXIgcGFycGFkZW9cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5pbmNsdWRlcygnXHUyM0YzJykgJiYgaW1hZ2VTdGF0ZS5pbkNvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgICB1aS51cGRhdGVDb29sZG93bk1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHVpLnNldFN0YXR1cyhtZXNzYWdlLCAnaW5mbycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UucGFpbnRpbmdQcm9ncmVzcycsIHsgcGFpbnRlZCwgdG90YWwgfSksICdpbmZvJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBvbkNvbXBsZXRlXG4gICAgICAgICAgICAoY29tcGxldGVkLCBwaXhlbHNQYWludGVkKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UucGFpbnRpbmdDb21wbGV0ZScsIHsgY291bnQ6IHBpeGVsc1BhaW50ZWQgfSksICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgY2xlYXJQcm9ncmVzcygpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5wYWludGluZ1N0b3BwZWQnKSwgJ3dhcm5pbmcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbWFnZVN0YXRlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBvbkVycm9yXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLnBhaW50aW5nRXJyb3InKSwgJ2Vycm9yJyk7XG4gICAgICAgICAgICAgIGxvZygnXHUyNzRDIEVycm9yIGVuIHByb2Nlc28gZGUgcGludGFkbzonLCBlcnJvcik7XG4gICAgICAgICAgICAgIGltYWdlU3RhdGUucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLnBhaW50aW5nRXJyb3InKSwgJ2Vycm9yJyk7XG4gICAgICAgICAgbG9nKCdcdTI3NEMgRXJyb3IgaW5pY2lhbmRvIHBpbnRhZG86JywgZXJyb3IpO1xuICAgICAgICAgIGltYWdlU3RhdGUucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFxuICAgICAgb25TdG9wUGFpbnRpbmc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NJbmZvID0gZ2V0UHJvZ3Jlc3NJbmZvKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAocHJvZ3Jlc3NJbmZvLmhhc1Byb2dyZXNzKSB7XG4gICAgICAgICAgY29uc3Qgc2hvdWxkU2F2ZSA9IGF3YWl0IHNob3dDb25maXJtRGlhbG9nKFxuICAgICAgICAgICAgdCgnaW1hZ2UuY29uZmlybVNhdmVQcm9ncmVzcycpLFxuICAgICAgICAgICAgdCgnaW1hZ2Uuc2F2ZVByb2dyZXNzVGl0bGUnKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2F2ZTogdCgnaW1hZ2Uuc2F2ZVByb2dyZXNzJyksXG4gICAgICAgICAgICAgIGRpc2NhcmQ6IHQoJ2ltYWdlLmRpc2NhcmRQcm9ncmVzcycpLFxuICAgICAgICAgICAgICBjYW5jZWw6IHQoJ2ltYWdlLmNhbmNlbCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoc2hvdWxkU2F2ZSA9PT0gJ3NhdmUnKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBzYXZlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UucHJvZ3Jlc3NTYXZlZCcsIHsgZmlsZW5hbWU6IHJlc3VsdC5maWxlbmFtZSB9KSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5wcm9ncmVzc1NhdmVFcnJvcicsIHsgZXJyb3I6IHJlc3VsdC5lcnJvciB9KSwgJ2Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChzaG91bGRTYXZlID09PSAnY2FuY2VsJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBObyBkZXRlbmVyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzdG9wUGFpbnRpbmcoKTtcbiAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLnBhaW50aW5nU3RvcHBlZCcpLCAnd2FybmluZycpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBcbiAgICAgIG9uU2F2ZVByb2dyZXNzOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNhdmVQcm9ncmVzcygpO1xuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UucHJvZ3Jlc3NTYXZlZCcsIHsgZmlsZW5hbWU6IHJlc3VsdC5maWxlbmFtZSB9KSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UucHJvZ3Jlc3NTYXZlRXJyb3InLCB7IGVycm9yOiByZXN1bHQuZXJyb3IgfSksICdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQuc3VjY2VzcztcbiAgICAgIH0sXG4gICAgICBcbiAgICAgIG9uTG9hZFByb2dyZXNzOiBhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGxvYWRQcm9ncmVzcyhmaWxlKTtcbiAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5wcm9ncmVzc0xvYWRlZCcsIHsgcGFpbnRlZDogcmVzdWx0LnBhaW50ZWQsIHRvdGFsOiByZXN1bHQudG90YWwgfSksICdzdWNjZXNzJyk7XG4gICAgICAgICAgICB1aS51cGRhdGVQcm9ncmVzcyhyZXN1bHQucGFpbnRlZCwgcmVzdWx0LnRvdGFsLCBjdXJyZW50VXNlckluZm8pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBIYWJpbGl0YXIgYm90b25lcyBkZXNwdVx1MDBFOXMgZGUgY2FyZ2FyIHByb2dyZXNvIGV4aXRvc2FtZW50ZVxuICAgICAgICAgICAgLy8gTm8gZXMgbmVjZXNhcmlvIHN1YmlyIGltYWdlbiBuaSBzZWxlY2Npb25hciBwb3NpY2lcdTAwRjNuIGRlIG51ZXZvXG4gICAgICAgICAgICBsb2coJ1x1MjcwNSBQcm9ncmVzbyBjYXJnYWRvIC0gaGFiaWxpdGFuZG8gYm90b25lcyBkZSBpbmljaW8nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5wcm9ncmVzc0xvYWRFcnJvcicsIHsgZXJyb3I6IHJlc3VsdC5lcnJvciB9KSwgJ2Vycm9yJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5wcm9ncmVzc0xvYWRFcnJvcicsIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSksICdlcnJvcicpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFxuICAgICAgb25SZXNpemVJbWFnZTogKCkgPT4ge1xuICAgICAgICBpZiAoaW1hZ2VTdGF0ZS5pbWFnZUxvYWRlZCAmJiBpbWFnZVN0YXRlLmltYWdlRGF0YSAmJiBpbWFnZVN0YXRlLmltYWdlRGF0YS5wcm9jZXNzb3IpIHtcbiAgICAgICAgICB1aS5zaG93UmVzaXplRGlhbG9nKGltYWdlU3RhdGUuaW1hZ2VEYXRhLnByb2Nlc3Nvcik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcbiAgICAgIG9uQ29uZmlybVJlc2l6ZTogYXN5bmMgKHByb2Nlc3NvciwgbmV3V2lkdGgsIG5ld0hlaWdodCkgPT4ge1xuICAgICAgICBsb2coYFx1RDgzRFx1REQwNCBSZWRpbWVuc2lvbmFuZG8gaW1hZ2VuIGRlICR7cHJvY2Vzc29yLmdldERpbWVuc2lvbnMoKS53aWR0aH14JHtwcm9jZXNzb3IuZ2V0RGltZW5zaW9ucygpLmhlaWdodH0gYSAke25ld1dpZHRofXgke25ld0hlaWdodH1gKTtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gUmVkaW1lbnNpb25hciBsYSBpbWFnZW4gdXNhbmRvIEJsdWUgTWFyYmxlXG4gICAgICAgICAgYXdhaXQgcHJvY2Vzc29yLnJlc2l6ZShuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBSZWFuYWxpemFyIGltYWdlbiBjb24gbnVldm8gdGFtYVx1MDBGMW8gdXNhbmRvIEJsdWUgTWFyYmxlXG4gICAgICAgICAgY29uc3QgYW5hbHlzaXNSZXN1bHQgPSBhd2FpdCBwcm9jZXNzb3IuYW5hbHl6ZVBpeGVscygpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIEFjdHVhbGl6YXIgaW1hZ2VTdGF0ZSBjb24gcmVzdWx0YWRvcyBkZSBCbHVlIE1hcmJsZVxuICAgICAgICAgIGltYWdlU3RhdGUuaW1hZ2VEYXRhID0ge1xuICAgICAgICAgICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IsXG4gICAgICAgICAgICB3aWR0aDogbmV3V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG5ld0hlaWdodCxcbiAgICAgICAgICAgIHZhbGlkUGl4ZWxDb3VudDogYW5hbHlzaXNSZXN1bHQudmFsaWRQaXhlbENvdW50LFxuICAgICAgICAgICAgdG90YWxQaXhlbHM6IGFuYWx5c2lzUmVzdWx0LnRvdGFsUGl4ZWxzLFxuICAgICAgICAgICAgdW5rbm93blBpeGVsczogYW5hbHlzaXNSZXN1bHQudW5rbm93blBpeGVsc1xuICAgICAgICAgIH07XG4gICAgICAgICAgXG4gICAgICAgICAgaW1hZ2VTdGF0ZS50b3RhbFBpeGVscyA9IGFuYWx5c2lzUmVzdWx0LnZhbGlkUGl4ZWxDb3VudDtcbiAgICAgICAgICBpbWFnZVN0YXRlLnBhaW50ZWRQaXhlbHMgPSAwO1xuICAgICAgICAgIGltYWdlU3RhdGUucmVtYWluaW5nUGl4ZWxzID0gW107IC8vIFJlc2V0ZWFyIGNvbGEgYWwgcmVkaW1lbnNpb25hclxuICAgICAgICAgIGltYWdlU3RhdGUubGFzdFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gQWN0dWFsaXphciBVSVxuICAgICAgICAgIHVpLnVwZGF0ZVByb2dyZXNzKDAsIGFuYWx5c2lzUmVzdWx0LnZhbGlkUGl4ZWxDb3VudCwgY3VycmVudFVzZXJJbmZvKTtcbiAgICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UucmVzaXplU3VjY2VzcycsIHsgd2lkdGg6IG5ld1dpZHRoLCBoZWlnaHQ6IG5ld0hlaWdodCB9KSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICBcbiAgICAgICAgICBsb2coYFx1MjcwNSBJbWFnZW4gcmVkaW1lbnNpb25hZGE6ICR7YW5hbHlzaXNSZXN1bHQudmFsaWRQaXhlbENvdW50fSBwXHUwMEVEeGVsZXMgdlx1MDBFMWxpZG9zIGRlICR7YW5hbHlzaXNSZXN1bHQudG90YWxQaXhlbHN9IHRvdGFsZXNgKTtcblxuICAgICAgICAgIC8vIEFjdHVhbGl6YXIgb3ZlcmxheSBzaSB5YSBoYXkgcG9zaWNpXHUwMEYzbiBzZWxlY2Npb25hZGFcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXyAmJiBpbWFnZVN0YXRlLnN0YXJ0UG9zaXRpb24gJiYgaW1hZ2VTdGF0ZS50aWxlWCAhPSBudWxsICYmIGltYWdlU3RhdGUudGlsZVkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAvLyBSZWdlbmVyYXIgdGVtcGxhdGUgdGlsZXMgY29uIG51ZXZvIHRhbWFcdTAwRjFvXG4gICAgICAgICAgICAgIGF3YWl0IHByb2Nlc3Nvci5jcmVhdGVUZW1wbGF0ZVRpbGVzKCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvLyBSZWdlbmVyYXIgY29sYSBkZSBwXHUwMEVEeGVsZXMgY29uIEJsdWUgTWFyYmxlXG4gICAgICAgICAgICAgIGNvbnN0IHBpeGVsUXVldWUgPSBwcm9jZXNzb3IuZ2VuZXJhdGVQaXhlbFF1ZXVlKCk7XG4gICAgICAgICAgICAgIGltYWdlU3RhdGUucmVtYWluaW5nUGl4ZWxzID0gcGl4ZWxRdWV1ZTtcbiAgICAgICAgICAgICAgaW1hZ2VTdGF0ZS50b3RhbFBpeGVscyA9IHBpeGVsUXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gQWN0dWFsaXphciBvdmVybGF5IGNvbiBudWV2YSBjb2xhXG4gICAgICAgICAgICAgIHdpbmRvdy5fX1dQQV9QTEFOX09WRVJMQVlfXy5zZXRQbGFuKHBpeGVsUXVldWUsIHtcbiAgICAgICAgICAgICAgICBhbmNob3I6IHsgXG4gICAgICAgICAgICAgICAgICB0aWxlWDogaW1hZ2VTdGF0ZS50aWxlWCwgXG4gICAgICAgICAgICAgICAgICB0aWxlWTogaW1hZ2VTdGF0ZS50aWxlWSwgXG4gICAgICAgICAgICAgICAgICBweFg6IGltYWdlU3RhdGUuc3RhcnRQb3NpdGlvbi54LCBcbiAgICAgICAgICAgICAgICAgIHB4WTogaW1hZ2VTdGF0ZS5zdGFydFBvc2l0aW9uLnkgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZVdpZHRoOiBuZXdXaWR0aCxcbiAgICAgICAgICAgICAgICBpbWFnZUhlaWdodDogbmV3SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBsb2coYFx1MjcwNSBPdmVybGF5IGFjdHVhbGl6YWRvIGNvbiAke3BpeGVsUXVldWUubGVuZ3RofSBwXHUwMEVEeGVsZXMgZGVzcHVcdTAwRTlzIGRlbCByZXNpemVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChvdmVybGF5RXJyb3IpIHtcbiAgICAgICAgICAgIGxvZyhgXHUyNkEwXHVGRTBGIEVycm9yIGFjdHVhbGl6YW5kbyBvdmVybGF5IGRlc3B1XHUwMEU5cyBkZWwgcmVzaXplOiAke292ZXJsYXlFcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBsb2coYFx1Mjc0QyBFcnJvciByZWRpbWVuc2lvbmFuZG8gaW1hZ2VuOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLmltYWdlRXJyb3InKSwgJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEVzY3VjaGFyIGNhbWJpb3MgZGUgaWRpb21hIGRlc2RlIGVsIGxhdW5jaGVyXG4gICAgY29uc3QgaGFuZGxlTGF1bmNoZXJMYW5ndWFnZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyBsYW5ndWFnZSB9ID0gZXZlbnQuZGV0YWlsO1xuICAgICAgbG9nKGBcdUQ4M0NcdURGMEQgSW1hZ2VuOiBEZXRlY3RhZG8gY2FtYmlvIGRlIGlkaW9tYSBkZXNkZSBsYXVuY2hlcjogJHtsYW5ndWFnZX1gKTtcbiAgICAgIFxuICAgICAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGVsIGlkaW9tYVxuICAgICAgaW1hZ2VTdGF0ZS5sYW5ndWFnZSA9IGxhbmd1YWdlO1xuICAgICAgXG4gICAgICAvLyBBcXVcdTAwRUQgc2UgcG9kclx1MDBFRGEgYVx1MDBGMWFkaXIgbFx1MDBGM2dpY2EgYWRpY2lvbmFsIHBhcmEgYWN0dWFsaXphciBsYSBVSVxuICAgICAgLy8gUG9yIGVqZW1wbG8sIGFjdHVhbGl6YXIgdGV4dG9zIGRpblx1MDBFMW1pY29zLCByZS1yZW5kZXJpemFyIGVsZW1lbnRvcywgZXRjLlxuICAgIH07XG4gICAgXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhdW5jaGVyTGFuZ3VhZ2VDaGFuZ2VkJywgaGFuZGxlTGF1bmNoZXJMYW5ndWFnZUNoYW5nZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhdW5jaGVyTGFuZ3VhZ2VDaGFuZ2UpO1xuXG4gICAgLy8gQ2xlYW51cCBhbCBjZXJyYXIgbGEgcFx1MDBFMWdpbmFcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xuICAgICAgLy8gUmVzdGF1cmFyIGZldGNoIG9yaWdpbmFsIHNpIGVzdFx1MDBFMSBpbnRlcmNlcHRhZG9cbiAgICAgIHJlc3RvcmVGZXRjaCgpO1xuICAgICAgXG4gICAgICBzdG9wUGFpbnRpbmcoKTtcbiAgICAgIHVpLmRlc3Ryb3koKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsYXVuY2hlckxhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhdW5jaGVyTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhdW5jaGVyTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgaWYgKHdpbmRvdy5fX3dwbGFjZUJvdCkge1xuICAgICAgICB3aW5kb3cuX193cGxhY2VCb3QuaW1hZ2VSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsb2coJ1x1MjcwNSBBdXRvLUltYWdlIGluaWNpYWxpemFkbyBjb3JyZWN0YW1lbnRlJyk7XG4gICAgXG4gICAgLy8gSW50ZW50YXIgYXV0by1pbmljaW8gZGVzcHVcdTAwRTlzIGRlIHF1ZSBsYSBVSSBlc3RcdTAwRTkgbGlzdGFcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5hdXRvSW5pdGlhbGl6aW5nJyksICdpbmZvJyk7XG4gICAgICAgIGxvZygnXHVEODNFXHVERDE2IEludGVudGFuZG8gYXV0by1pbmljaW8uLi4nKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGF1dG9Jbml0U3VjY2VzcyA9IGF3YWl0IHRyeUF1dG9Jbml0KCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoYXV0b0luaXRTdWNjZXNzKSB7XG4gICAgICAgICAgdWkuc2V0U3RhdHVzKHQoJ2ltYWdlLmF1dG9Jbml0U3VjY2VzcycpLCAnc3VjY2VzcycpO1xuICAgICAgICAgIGxvZygnXHUyNzA1IEF1dG8taW5pY2lvIGV4aXRvc28nKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBPY3VsdGFyIGVsIGJvdFx1MDBGM24gZGUgaW5pY2lhbGl6YWNpXHUwMEYzbiBtYW51YWxcbiAgICAgICAgICB1aS5zZXRJbml0QnV0dG9uVmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gRWplY3V0YXIgbGEgbFx1MDBGM2dpY2EgZGUgaW5pY2lhbGl6YWNpXHUwMEYzbiBkZWwgYm90XG4gICAgICAgICAgY29uc3QgaW5pdFJlc3VsdCA9IGF3YWl0IGluaXRpYWxpemVCb3QodHJ1ZSk7IC8vIHRydWUgPSBlcyBhdXRvLWluaWNpb1xuICAgICAgICAgIGlmIChpbml0UmVzdWx0KSB7XG4gICAgICAgICAgICBsb2coJ1x1RDgzRFx1REU4MCBCb3QgYXV0by1pbmljaWFkbyBjb21wbGV0YW1lbnRlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVpLnNldFN0YXR1cyh0KCdpbWFnZS5hdXRvSW5pdEZhaWxlZCcpLCAnd2FybmluZycpO1xuICAgICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIEF1dG8taW5pY2lvIGZhbGxcdTAwRjMsIHNlIHJlcXVpZXJlIGluaWNpbyBtYW51YWwnKTtcbiAgICAgICAgICAvLyBFbCBib3RcdTAwRjNuIGRlIGluaWNpbyBtYW51YWwgcGVybWFuZWNlIHZpc2libGVcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nKCdcdTI3NEMgRXJyb3IgZW4gYXV0by1pbmljaW86JywgZXJyb3IpO1xuICAgICAgICB1aS5zZXRTdGF0dXModCgnaW1hZ2UubWFudWFsSW5pdFJlcXVpcmVkJyksICd3YXJuaW5nJyk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7IC8vIEVzcGVyYXIgMSBzZWd1bmRvIHBhcmEgcXVlIGxhIFVJIGVzdFx1MDBFOSBjb21wbGV0YW1lbnRlIGNhcmdhZGFcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBpbmljaWFsaXphbmRvIEF1dG8tSW1hZ2U6JywgZXJyb3IpO1xuICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5pbWFnZVJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBydW5JbWFnZSB9IGZyb20gXCIuLi9pbWFnZS9pbmRleC5qc1wiO1xuaW1wb3J0IHsgYXV0b0NsaWNrUGFpbnRCdXR0b24gfSBmcm9tIFwiLi4vY29yZS9kb20uanNcIjtcblxuKGFzeW5jICgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIFxuICAvLyBBdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50IGFsIGluaWNpb1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKCdbV1BBLUltYWdlXSBcdUQ4M0VcdUREMTYgSW5pY2lhbmRvIGF1dG8tY2xpY2sgZGVsIGJvdFx1MDBGM24gUGFpbnQuLi4nKTtcbiAgICBhd2FpdCBhdXRvQ2xpY2tQYWludEJ1dHRvbigzLCB0cnVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygnW1dQQS1JbWFnZV0gXHUyNkEwXHVGRTBGIEVycm9yIGVuIGF1dG8tY2xpY2sgZGVsIGJvdFx1MDBGM24gUGFpbnQ6JywgZXJyb3IpO1xuICB9XG4gIFxuICAvLyBWZXJpZmljYXIgc2kgZWwgYm90IGRlIGltYWdlbiB5YSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2VcbiAgaWYgKHdpbmRvdy5fX3dwbGFjZUJvdD8uaW1hZ2VSdW5uaW5nKSB7XG4gICAgYWxlcnQoXCJBdXRvLUltYWdlIHlhIGVzdFx1MDBFMSBjb3JyaWVuZG8uXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgLy8gVmVyaWZpY2FyIHNpIGhheSBvdHJvcyBib3RzIGVqZWN1dFx1MDBFMW5kb3NlXG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmZhcm1SdW5uaW5nKSB7XG4gICAgYWxlcnQoXCJBdXRvLUZhcm0gZXN0XHUwMEUxIGVqZWN1dFx1MDBFMW5kb3NlLiBDaVx1MDBFOXJyYWxvIGFudGVzIGRlIGluaWNpYXIgQXV0by1JbWFnZS5cIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gSW5pY2lhbGl6YXIgZWwgZXN0YWRvIGdsb2JhbCBzaSBubyBleGlzdGVcbiAgaWYgKCF3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICB3aW5kb3cuX193cGxhY2VCb3QgPSB7fTtcbiAgfVxuICBcbiAgLy8gTWFyY2FyIHF1ZSBlbCBpbWFnZSBib3QgZXN0XHUwMEUxIGVqZWN1dFx1MDBFMW5kb3NlXG4gIHdpbmRvdy5fX3dwbGFjZUJvdC5pbWFnZVJ1bm5pbmcgPSB0cnVlO1xuICBcbiAgcnVuSW1hZ2UoKS5jYXRjaCgoZSkgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbQk9UXSBFcnJvciBlbiBBdXRvLUltYWdlOlwiLCBlKTtcbiAgICBpZiAod2luZG93Ll9fd3BsYWNlQm90KSB7XG4gICAgICB3aW5kb3cuX193cGxhY2VCb3QuaW1hZ2VSdW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGFsZXJ0KFwiQXV0by1JbWFnZTogZXJyb3IgaW5lc3BlcmFkby4gUmV2aXNhIGNvbnNvbGEuXCIpO1xuICB9KTtcbn0pKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7QUFVTyxNQUFNLE1BQU0sSUFBSSxN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QSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLElBQ25CO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLG9CQUFvQjtBQUFBLE1BQ3BCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLG9CQUFvQjtBQUFBLE1BQ3BCLGtCQUFrQjtBQUFBLE1BQ2xCLGdCQUFnQjtBQUFBLElBQ2xCO0FBQUEsRUFDRjs7O0FDM1BPLE1BQU0sS0FBSztBQUFBO0FBQUEsSUFFaEIsVUFBVTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLElBQ1g7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIscUJBQXFCO0FBQUEsTUFDckIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1YsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIseUJBQXlCO0FBQUEsTUFDekIsa0JBQWtCO0FBQUEsTUFDbEIsaUJB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VTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLElBQ1g7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUEsTUFD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QUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLElBQ1g7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFB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Q2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIscUJBQXFCO0FBQUEsTUFDckIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIseUJBQXlCO0FBQUEsTUFDekIsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztB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Q1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIscUJBQXFCO0FBQUEsTUFDckIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFB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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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
