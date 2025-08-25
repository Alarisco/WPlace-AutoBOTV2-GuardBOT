/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-25T19:29:27.740Z */
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

  // src/launcher/ui.js
  function createLauncherUI({
    onSelectBot,
    onLaunch
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
        <button class="btn ghost log-window-btn">${texts.logWindow}</button>
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
      logWindowBtn: panel.querySelector(".log-window-btn"),
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
    let logWindow = null;
    elements.logWindowBtn.addEventListener("click", () => {
      if (!logWindow) {
        logWindow = createLogWindow("launcher");
        logWindow.show();
      } else {
        logWindow.toggle();
      }
    });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvbG9nZ2VyLmpzIiwgInNyYy9jb3JlL3VpLXV0aWxzLmpzIiwgInNyYy9sb2NhbGVzL2VzLmpzIiwgInNyYy9sb2NhbGVzL2VuLmpzIiwgInNyYy9sb2NhbGVzL2ZyLmpzIiwgInNyYy9sb2NhbGVzL3J1LmpzIiwgInNyYy9sb2NhbGVzL3poLUhhbnMuanMiLCAic3JjL2xvY2FsZXMvemgtSGFudC5qcyIsICJzcmMvbG9jYWxlcy9pbmRleC5qcyIsICJzcmMvbGF1bmNoZXIvY29uZmlnLmpzIiwgInNyYy9sb2dfd2luZG93L2xvZy13aW5kb3cuanMiLCAic3JjL2xhdW5jaGVyL3VpLmpzIiwgInNyYy9sYXVuY2hlci9hcGkuanMiLCAic3JjL2NvcmUvbGFuZ3VhZ2Utc2VsZWN0b3IuanMiLCAic3JjL2xhdW5jaGVyL2luZGV4LmpzIiwgInNyYy9lbnRyaWVzL2xhdW5jaGVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY29uc3QgbG9nZ2VyID0ge1xuICBkZWJ1Z0VuYWJsZWQ6IGZhbHNlLFxuICBzZXREZWJ1Zyh2KSB7IHRoaXMuZGVidWdFbmFibGVkID0gISF2OyB9LFxuICBkZWJ1ZyguLi5hKSB7IGlmICh0aGlzLmRlYnVnRW5hYmxlZCkgY29uc29sZS5kZWJ1ZyhcIltCT1RdXCIsIC4uLmEpOyB9LFxuICBpbmZvKC4uLmEpICB7IGNvbnNvbGUuaW5mbyhcIltCT1RdXCIsIC4uLmEpOyB9LFxuICB3YXJuKC4uLmEpICB7IGNvbnNvbGUud2FybihcIltCT1RdXCIsIC4uLmEpOyB9LFxuICBlcnJvciguLi5hKSB7IGNvbnNvbGUuZXJyb3IoXCJbQk9UXVwiLCAuLi5hKTsgfVxufTtcblxuLy8gRmFybS1zcGVjaWZpYyBsb2dnZXJcbmV4cG9ydCBjb25zdCBsb2cgPSAoLi4uYSkgPT4gY29uc29sZS5sb2coJ1tXUEEtVUldJywgLi4uYSk7XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5leHBvcnQgY29uc3Qgbm9vcCA9ICgpID0+IHsgLyogRnVuY2lcdTAwRjNuIHZhY1x1MDBFRGEgaW50ZW5jaW9uYWwgKi8gfTtcbmV4cG9ydCBjb25zdCBjbGFtcCA9IChuLCBhLCBiKSA9PiBNYXRoLm1heChhLCBNYXRoLm1pbihiLCBuKSk7XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoYWRvd1Jvb3QoaG9zdElkID0gbnVsbCkge1xuICBjb25zdCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGlmIChob3N0SWQpIHtcbiAgICBob3N0LmlkID0gaG9zdElkO1xuICB9XG4gIGhvc3Quc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAxMHB4O1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIHotaW5kZXg6IDIxNDc0ODM2NDc7XG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gIGA7XG4gIFxuICBjb25zdCByb290ID0gaG9zdC5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaG9zdCk7XG4gIFxuICByZXR1cm4geyBob3N0LCByb290IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRHJhZ2dhYmxlKGRyYWdIYW5kbGUsIGVsZW1lbnQpIHtcbiAgbGV0IHBvczEgPSAwLCBwb3MyID0gMCwgcG9zMyA9IDAsIHBvczQgPSAwO1xuICBcbiAgZHJhZ0hhbmRsZS5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gIGRyYWdIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZHJhZ01vdXNlRG93bik7XG4gIFxuICBmdW5jdGlvbiBkcmFnTW91c2VEb3duKGUpIHtcbiAgICAvLyBFdml0YXIgYXJyYXN0cmEgc2kgZXMgdW4gYm90XHUwMEYzbiBkZSBsYSBjYWJlY2VyYVxuICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KCcuaGVhZGVyLWJ0biwgLndwbGFjZS1oZWFkZXItYnRuJykpIHJldHVybjtcbiAgICBcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBjbG9zZURyYWdFbGVtZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlbGVtZW50RHJhZyk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zMSA9IHBvczMgLSBlLmNsaWVudFg7XG4gICAgcG9zMiA9IHBvczQgLSBlLmNsaWVudFk7XG4gICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gcG9zMikgKyBcInB4XCI7XG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gKGVsZW1lbnQub2Zmc2V0TGVmdCAtIHBvczEpICsgXCJweFwiO1xuICB9XG4gIFxuICBmdW5jdGlvbiBjbG9zZURyYWdFbGVtZW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBjbG9zZURyYWdFbGVtZW50KTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlbGVtZW50RHJhZyk7XG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgZXMgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgQXV0by1GYXJtJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggQXV0by1JbWFnZScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIEF1dG8tR3VhcmQnLFxuICAgIHNlbGVjdGlvbjogJ1NlbGVjY2lcdTAwRjNuJyxcbiAgICB1c2VyOiAnVXN1YXJpbycsXG4gICAgY2hhcmdlczogJ0NhcmdhcycsXG4gICAgYmFja2VuZDogJ0JhY2tlbmQnLFxuICAgIGRhdGFiYXNlOiAnRGF0YWJhc2UnLFxuICAgIHVwdGltZTogJ1VwdGltZScsXG4gICAgY2xvc2U6ICdDZXJyYXInLFxuICAgIGxhdW5jaDogJ0xhbnphcicsXG4gICAgbG9hZGluZzogJ0NhcmdhbmRvXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdFamVjdXRhbmRvXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ0Rlc2NhcmdhbmRvIHNjcmlwdFx1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnRWxpZ2UgdW4gYm90IHkgcHJlc2lvbmEgTGFuemFyJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnTGlzdG8gcGFyYSBsYW56YXInLFxuICAgIGxvYWRFcnJvcjogJ0Vycm9yIGFsIGNhcmdhcicsXG4gICAgbG9hZEVycm9yTXNnOiAnTm8gc2UgcHVkbyBjYXJnYXIgZWwgYm90IHNlbGVjY2lvbmFkby4gUmV2aXNhIHR1IGNvbmV4aVx1MDBGM24gbyBpbnRcdTAwRTludGFsbyBkZSBudWV2by4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFZlcmlmaWNhbmRvLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgT25saW5lJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IE9mZmxpbmUnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIE9LJyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBFcnJvcicsXG4gICAgdW5rbm93bjogJy0nLFxuICAgIGxvZ1dpbmRvdzogJ0xvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnTG9ncyAtIHtib3ROYW1lfScsXG4gICAgZG93bmxvYWRMb2dzOiAnRGVzY2FyZ2FyIExvZ3MnLFxuICAgIGNsZWFyTG9nczogJ0xpbXBpYXIgTG9ncycsXG4gICAgY2xvc2VMb2dzOiAnQ2VycmFyJ1xuICB9LFxuXG4gIC8vIEltYWdlIE1vZHVsZVxuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBBdXRvLUltYWdlXCIsXG4gICAgaW5pdEJvdDogXCJJbmljaWFyIEF1dG8tQk9UXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiU3ViaXIgSW1hZ2VuXCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiUmVkaW1lbnNpb25hciBJbWFnZW5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTZWxlY2Npb25hciBQb3NpY2lcdTAwRjNuXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJJbmljaWFyIFBpbnR1cmFcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiRGV0ZW5lciBQaW50dXJhXCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIkd1YXJkYXIgUHJvZ3Jlc29cIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiQ2FyZ2FyIFByb2dyZXNvXCIsXG5cbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgVmVyaWZpY2FuZG8gY29sb3JlcyBkaXNwb25pYmxlcy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1MDBBMUFicmUgbGEgcGFsZXRhIGRlIGNvbG9yZXMgZW4gZWwgc2l0aW8gZSBpbnRcdTAwRTludGFsbyBkZSBudWV2byFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb2xvcmVzIGRpc3BvbmlibGVzIGVuY29udHJhZG9zXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBDYXJnYW5kbyBpbWFnZW4uLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgSW1hZ2VuIGNhcmdhZGEgY29uIHtjb3VudH0gcFx1MDBFRHhlbGVzIHZcdTAwRTFsaWRvc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGNhcmdhciBsYSBpbWFnZW5cIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1MDBBMVBpbnRhIGVsIHByaW1lciBwXHUwMEVEeGVsIGVuIGxhIHViaWNhY2lcdTAwRjNuIGRvbmRlIHF1aWVyZXMgcXVlIGNvbWllbmNlIGVsIGFydGUhXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBFc3BlcmFuZG8gcXVlIHBpbnRlcyBlbCBwXHUwMEVEeGVsIGRlIHJlZmVyZW5jaWEuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHUwMEExUG9zaWNpXHUwMEYzbiBlc3RhYmxlY2lkYSBjb24gXHUwMEU5eGl0byFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaW9uYXIgcG9zaWNpXHUwMEYzblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2ljaVx1MDBGM24gZGV0ZWN0YWRhLCBwcm9jZXNhbmRvLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZGV0ZWN0YW5kbyBwb3NpY2lcdTAwRjNuLCBpbnRcdTAwRTludGFsbyBkZSBudWV2b1wiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IEluaWNpYW5kbyBwaW50dXJhLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgUHJvZ3Jlc286IHtwYWludGVkfS97dG90YWx9IHBcdTAwRUR4ZWxlcy4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgU2luIGNhcmdhcy4gRXNwZXJhbmRvIHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUGludHVyYSBkZXRlbmlkYSBwb3IgZWwgdXN1YXJpb1wiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1MDBBMVBpbnR1cmEgY29tcGxldGFkYSEge2NvdW50fSBwXHUwMEVEeGVsZXMgcGludGFkb3MuXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgRXJyb3IgZHVyYW50ZSBsYSBwaW50dXJhXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgQ2FyZ2EgdW5hIGltYWdlbiB5IHNlbGVjY2lvbmEgdW5hIHBvc2ljaVx1MDBGM24gcHJpbWVyb1wiLFxuICAgIHByb2dyZXNzOiBcIlByb2dyZXNvXCIsXG4gICAgdXNlck5hbWU6IFwiVXN1YXJpb1wiLFxuICAgIHBpeGVsczogXCJQXHUwMEVEeGVsZXNcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiVGllbXBvIGVzdGltYWRvXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiSGF6IGNsaWMgZW4gJ0luaWNpYXIgQXV0by1CT1QnIHBhcmEgY29tZW56YXJcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFc3BlcmFuZG8gaW5pY2lhbGl6YWNpXHUwMEYzbi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IEltYWdlbiByZWRpbWVuc2lvbmFkYSBhIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgUGludHVyYSBwYXVzYWRhIGVuIGxhIHBvc2ljaVx1MDBGM24gWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQXHUwMEVEeGVsZXMgcG9yIGxvdGVcIixcbiAgICBiYXRjaFNpemU6IFwiVGFtYVx1MDBGMW8gZGVsIGxvdGVcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlNpZ3VpZW50ZSBsb3RlIGVuXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJVc2FyIHRvZGFzIGxhcyBjYXJnYXMgZGlzcG9uaWJsZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJNb3N0cmFyIG92ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIkNhcmdhcyBtXHUwMEUxeGltYXMgcG9yIGxvdGVcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgRXNwZXJhbmRvIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJUaWVtcG8gcmVzdGFudGVcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIEVzcGVyYW5kbyB7dGltZX0gcGFyYSBjb250aW51YXIuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBQcm9ncmVzbyBndWFyZGFkbyBjb21vIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3Jlc28gY2FyZ2Fkbzoge3BhaW50ZWR9L3t0b3RhbH0gcFx1MDBFRHhlbGVzIHBpbnRhZG9zXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGNhcmdhciBwcm9ncmVzbzoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBhbCBndWFyZGFyIHByb2dyZXNvOiB7ZXJyb3J9XCIsXG5cbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1MDBCRkRlc2VhcyBndWFyZGFyIGVsIHByb2dyZXNvIGFjdHVhbCBhbnRlcyBkZSBkZXRlbmVyP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIkd1YXJkYXIgUHJvZ3Jlc29cIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiRGVzY2FydGFyXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbGFyXCIsXG4gICAgbWluaW1pemU6IFwiTWluaW1pemFyXCIsXG4gICAgd2lkdGg6IFwiQW5jaG9cIixcbiAgICBoZWlnaHQ6IFwiQWx0b1wiLCBcbiAgICBrZWVwQXNwZWN0OiBcIk1hbnRlbmVyIHByb3BvcmNpXHUwMEYzblwiLFxuICAgIGFwcGx5OiBcIkFwbGljYXJcIixcbiAgb3ZlcmxheU9uOiBcIk92ZXJsYXk6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheTogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzYWRhIGNvbXBsZXRhZGE6IHtwYWludGVkfSBwXHUwMEVEeGVsZXMgcGludGFkb3MgfCBQcm9ncmVzbzoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgRXNwZXJhbmRvIHJlZ2VuZXJhY2lcdTAwRjNuIGRlIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gVGllbXBvOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgRXNwZXJhbmRvIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUXVlZGFuOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbmljaWFsaXphbmRvIGF1dG9tXHUwMEUxdGljYW1lbnRlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBCb3QgaW5pY2lhZG8gYXV0b21cdTAwRTF0aWNhbWVudGVcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgTm8gc2UgcHVkbyBpbmljaWFyIGF1dG9tXHUwMEUxdGljYW1lbnRlLiBVc2EgZWwgYm90XHUwMEYzbiBtYW51YWwuXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBQYWxldGEgZGUgY29sb3JlcyBkZXRlY3RhZGFcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIEJ1c2NhbmRvIHBhbGV0YSBkZSBjb2xvcmVzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgSGFjaWVuZG8gY2xpYyBlbiBlbCBib3RcdTAwRjNuIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm90XHUwMEYzbiBQYWludCBubyBlbmNvbnRyYWRvXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbmljaW8gbWFudWFsIHJlcXVlcmlkb1wiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgUmVpbnRlbnRvIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGVuIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgRXJyb3IgZW4gaW50ZW50byB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgcmVpbnRlbnRhbmRvIGVuIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIEZhbGxcdTAwRjMgZGVzcHVcdTAwRTlzIGRlIHttYXhBdHRlbXB0c30gaW50ZW50b3MuIENvbnRpbnVhbmRvIGNvbiBzaWd1aWVudGUgbG90ZS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgRXJyb3IgZGUgcmVkLiBSZWludGVudGFuZG8uLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgRXJyb3IgZGVsIHNlcnZpZG9yLiBSZWludGVudGFuZG8uLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFRpbWVvdXQgZGVsIHNlcnZpZG9yLiBSZWludGVudGFuZG8uLi5cIixcbiAgICAvLyBOdWV2b3MgdGV4dG9zIHYyLjBcbiAgICBwcm90ZWN0aW9uRW5hYmxlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjY2lcdTAwRjNuIGhhYmlsaXRhZGFcIixcbiAgICBwcm90ZWN0aW9uRGlzYWJsZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY2NpXHUwMEYzbiBkZXNoYWJpbGl0YWRhXCIsIFxuICAgIHBhaW50UGF0dGVybjogXCJcdUQ4M0RcdURDRDAgUGF0clx1MDBGM24gZGUgcGludGFkb1wiLFxuICAgIHBhdHRlcm5MaW5lYXJTdGFydDogXCJMaW5lYWwgKEluaWNpbylcIixcbiAgICBwYXR0ZXJuTGluZWFyRW5kOiBcIkxpbmVhbCAoRmluYWwpXCIsXG4gICAgcGF0dGVyblJhbmRvbTogXCJBbGVhdG9yaW9cIixcbiAgICBwYXR0ZXJuQ2VudGVyT3V0OiBcIkNlbnRybyBoYWNpYSBhZnVlcmFcIixcbiAgICBwYXR0ZXJuQ29ybmVyc0ZpcnN0OiBcIkVzcXVpbmFzIHByaW1lcm9cIixcbiAgICBwYXR0ZXJuU3BpcmFsOiBcIkVzcGlyYWxcIixcbiAgICBwcm90ZWN0aW5nRHJhd2luZzogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVnaWVuZG8gZGlidWpvLi4uXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNhbWJpb3MgZGV0ZWN0YWRvcyBlbiBlbCBkaWJ1am9cIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERDI3IFJlcGFyYW5kbyB7Y291bnR9IHBcdTAwRUR4ZWxlcyBhbHRlcmFkb3MuLi5cIixcbiAgICByZXBhaXJDb21wbGV0ZWQ6IFwiXHUyNzA1IFJlcGFyYWNpXHUwMEYzbiBjb21wbGV0YWRhOiB7Y291bnR9IHBcdTAwRUR4ZWxlc1wiLFxuICAgIG5vQ2hhcmdlc0ZvclJlcGFpcjogXCJcdTI2QTEgU2luIGNhcmdhcyBwYXJhIHJlcGFyYXIsIGVzcGVyYW5kby4uLlwiLFxuICAgIHByb3RlY3Rpb25Qcmlvcml0eTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJpb3JpZGFkIGRlIHByb3RlY2NpXHUwMEYzbiBhY3RpdmFkYVwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJEZXNjYXJnYXIgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJMaW1waWFyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiQ2VycmFyXCIsXG4gICAgLy8gTnVldmFzIGZ1bmNpb25hbGlkYWRlc1xuICAgIHBhaW50aW5nU3RhdHM6IFwiRXN0YWRcdTAwRURzdGljYXMgZGUgUGludGFkb1wiLFxuICAgIHVzZXJJbmZvOiBcIkluZm9ybWFjaVx1MDBGM24gZGVsIFVzdWFyaW9cIixcbiAgICBpbWFnZVByb2dyZXNzOiBcIlByb2dyZXNvIGRlIGxhIEltYWdlblwiLFxuICAgIGF2YWlsYWJsZUNvbG9yczogXCJDb2xvcmVzIERpc3BvbmlibGVzXCIsXG4gICAgcmVmcmVzaFN0YXRzOiBcIkFjdHVhbGl6YXIgRXN0YWRcdTAwRURzdGljYXNcIixcbiAgICBub0ltYWdlTG9hZGVkOiBcIk5vIGhheSBpbWFnZW4gY2FyZ2FkYVwiLFxuICAgIGNvb2xkb3duOiBcIlRpZW1wbyBkZSBlc3BlcmFcIixcbiAgICB0b3RhbENvbG9yczogXCJUb3RhbCBkZSBDb2xvcmVzXCIsXG4gICAgY29sb3JQYWxldHRlOiBcIlBhbGV0YSBkZSBDb2xvcmVzXCIsXG4gICAgc2hvd0FsbENvbG9yczogXCJNb3N0cmFyIFRvZG9zIGxvcyBDb2xvcmVzIChpbmNsdXllbmRvIG5vIGRpc3BvbmlibGVzKVwiLFxuICAgIHNlbGVjdEFsbENvbG9yczogXCJTZWxlY2Npb25hciBUb2Rvc1wiLFxuICAgIHVuc2VsZWN0QWxsQ29sb3JzOiBcIkRlc2VsZWNjaW9uYXIgVG9kb3NcIixcbiAgICBub0F2YWlsYWJsZTogXCJObyBkaXNwb25pYmxlXCIsXG4gICAgY29sb3JTZWxlY3RlZDogXCJDb2xvciBzZWxlY2Npb25hZG9cIixcbiAgICBzdGF0c1VwZGF0ZWQ6IFwiXHUyNzA1IEVzdGFkXHUwMEVEc3RpY2FzIGFjdHVhbGl6YWRhczoge2NvdW50fSBjb2xvcmVzIGRpc3BvbmlibGVzXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAocG9yIGltcGxlbWVudGFyKVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEZhcm0gQm90XCIsXG4gICAgc3RhcnQ6IFwiSW5pY2lhclwiLFxuICAgIHN0b3A6IFwiRGV0ZW5lclwiLCBcbiAgICBzdG9wcGVkOiBcIkJvdCBkZXRlbmlkb1wiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJhclwiLFxuICAgIHBhaW50T25jZTogXCJVbmEgdmV6XCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiVmVyaWZpY2FuZG8gZXN0YWRvLi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJDb25maWd1cmFjaVx1MDBGM25cIixcbiAgICBkZWxheTogXCJEZWxheSAobXMpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUFx1MDBFRHhlbGVzL2xvdGVcIixcbiAgICBtaW5DaGFyZ2VzOiBcIkNhcmdhcyBtXHUwMEVEblwiLFxuICAgIGNvbG9yTW9kZTogXCJNb2RvIGNvbG9yXCIsXG4gICAgcmFuZG9tOiBcIkFsZWF0b3Jpb1wiLFxuICAgIGZpeGVkOiBcIkZpam9cIixcbiAgICByYW5nZTogXCJSYW5nb1wiLFxuICAgIGZpeGVkQ29sb3I6IFwiQ29sb3IgZmlqb1wiLFxuICAgIGFkdmFuY2VkOiBcIkF2YW56YWRvXCIsXG4gICAgdGlsZVg6IFwiVGlsZSBYXCIsXG4gICAgdGlsZVk6IFwiVGlsZSBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJQYWxldGEgcGVyc29uYWxpemFkYVwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcImVqOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiQ2FwdHVyYXJcIixcbiAgICBwYWludGVkOiBcIlBpbnRhZG9zXCIsXG4gICAgY2hhcmdlczogXCJDYXJnYXNcIixcbiAgICByZXRyaWVzOiBcIkZhbGxvc1wiLFxuICAgIHRpbGU6IFwiVGlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiBndWFyZGFkYVwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmFjaVx1MDBGM24gY2FyZ2FkYVwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiByZWluaWNpYWRhXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQaW50YSB1biBwXHUwMEVEeGVsIG1hbnVhbG1lbnRlIHBhcmEgY2FwdHVyYXIgY29vcmRlbmFkYXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgT25saW5lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBPZmZsaW5lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiSW5pY2lhbmRvIGJvdC4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIkRldGVuaWVuZG8gYm90Li4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiQ2FsaWJyYW5kby4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSB5YSBlc3RcdTAwRTEgY29ycmllbmRvLlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiQXV0by1JbWFnZSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UuIENpXHUwMEU5cnJhbG8gYW50ZXMgZGUgaW5pY2lhciBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWNjaW9uYXIgWm9uYVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gdW5hIHpvbmEgREVTUE9CTEFEQSBkZWwgbWFwYSBwYXJhIGVzdGFibGVjZXIgZWwgXHUwMEUxcmVhIGRlIGZhcm1pbmdcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBxdWUgcGludGVzIGVsIHBcdTAwRUR4ZWwgZGUgcmVmZXJlbmNpYS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTAwQTFab25hIGVzdGFibGVjaWRhISBSYWRpbzogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpZW1wbyBhZ290YWRvIHBhcmEgc2VsZWNjaW9uYXIgem9uYVwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgU2VsZWNjaW9uYSB1bmEgem9uYSBwcmltZXJvIHVzYW5kbyAnU2VsZWNjaW9uYXIgWm9uYSdcIixcbiAgICBmYXJtUmFkaXVzOiBcIlJhZGlvIGZhcm1cIixcbiAgICBwb3NpdGlvbkluZm86IFwiWm9uYSBhY3R1YWxcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIEZhcm1pbmcgZW4gcmFkaW8ge3JhZGl1c31weCBkZXNkZSAoe3h9LHt5fSlcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIElNUE9SVEFOVEU6IFNlbGVjY2lvbmEgdW5hIHpvbmEgREVTUE9CTEFEQSBwYXJhIGV2aXRhciBjb25mbGljdG9zXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJTaW4gem9uYVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmE6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU2VsZWNjaW9uYSB1bmEgem9uYSBwcmltZXJvLiBQaW50YSB1biBwXHUwMEVEeGVsIGVuIGVsIG1hcGEgcGFyYSBlc3RhYmxlY2VyIGxhIHpvbmEgZGUgZmFybWluZ1wiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJEZXNjYXJnYXIgTG9nc1wiLFxuICAgIGNsZWFyTG9nczogXCJMaW1waWFyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiQ2VycmFyXCJcbiAgfSxcblxuICAvLyBDb21tb24vU2hhcmVkXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJTXHUwMEVEXCIsXG4gICAgbm86IFwiTm9cIixcbiAgICBvazogXCJBY2VwdGFyXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbGFyXCIsXG4gICAgY2xvc2U6IFwiQ2VycmFyXCIsXG4gICAgc2F2ZTogXCJHdWFyZGFyXCIsXG4gICAgbG9hZDogXCJDYXJnYXJcIixcbiAgICBkZWxldGU6IFwiRWxpbWluYXJcIixcbiAgICBlZGl0OiBcIkVkaXRhclwiLFxuICAgIHN0YXJ0OiBcIkluaWNpYXJcIixcbiAgICBzdG9wOiBcIkRldGVuZXJcIixcbiAgICBwYXVzZTogXCJQYXVzYXJcIixcbiAgICByZXN1bWU6IFwiUmVhbnVkYXJcIixcbiAgICByZXNldDogXCJSZWluaWNpYXJcIixcbiAgICBzZXR0aW5nczogXCJDb25maWd1cmFjaVx1MDBGM25cIixcbiAgICBoZWxwOiBcIkF5dWRhXCIsXG4gICAgYWJvdXQ6IFwiQWNlcmNhIGRlXCIsXG4gICAgbGFuZ3VhZ2U6IFwiSWRpb21hXCIsXG4gICAgbG9hZGluZzogXCJDYXJnYW5kby4uLlwiLFxuICAgIGVycm9yOiBcIkVycm9yXCIsXG4gICAgc3VjY2VzczogXCJcdTAwQzl4aXRvXCIsXG4gICAgd2FybmluZzogXCJBZHZlcnRlbmNpYVwiLFxuICAgIGluZm86IFwiSW5mb3JtYWNpXHUwMEYzblwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJJZGlvbWEgY2FtYmlhZG8gYSB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pY2lhbGl6YXIgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTZWxlY2Npb25hciBcdTAwQzFyZWFcIixcbiAgICBjYXB0dXJlQXJlYTogXCJDYXB0dXJhciBcdTAwQzFyZWFcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiSW5pY2lhciBQcm90ZWNjaVx1MDBGM25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJEZXRlbmVyIFByb3RlY2NpXHUwMEYzblwiLFxuICAgIHVwcGVyTGVmdDogXCJFc3F1aW5hIFN1cGVyaW9yIEl6cXVpZXJkYVwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiRXNxdWluYSBJbmZlcmlvciBEZXJlY2hhXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlBcdTAwRUR4ZWxlcyBQcm90ZWdpZG9zXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkNhbWJpb3MgRGV0ZWN0YWRvc1wiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlBcdTAwRUR4ZWxlcyBSZXBhcmFkb3NcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVzcGVyYW5kbyBpbmljaWFsaXphY2lcdTAwRjNuLi4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFZlcmlmaWNhbmRvIGNvbG9yZXMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBObyBzZSBlbmNvbnRyYXJvbiBjb2xvcmVzLiBBYnJlIGxhIHBhbGV0YSBkZSBjb2xvcmVzIGVuIGVsIHNpdGlvLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvbG9yZXMgZGlzcG9uaWJsZXMgZW5jb250cmFkb3NcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaWNpYWxpemFkbyBjb3JyZWN0YW1lbnRlXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBFcnJvciBpbmljaWFsaXphbmRvIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIENvb3JkZW5hZGFzIGludlx1MDBFMWxpZGFzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIEVsIFx1MDBFMXJlYSBkZWJlIHRlbmVyIGVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhIG1lbm9yIHF1ZSBpbmZlcmlvciBkZXJlY2hhXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTAwQzFyZWEgZGVtYXNpYWRvIGdyYW5kZToge3NpemV9IHBcdTAwRUR4ZWxlcyAobVx1MDBFMXhpbW86IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmFuZG8gXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzbi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHUwMEMxcmVhIGNhcHR1cmFkYToge2NvdW50fSBwXHUwMEVEeGVsZXMgYmFqbyBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGNhcHR1cmFuZG8gXHUwMEUxcmVhOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBQcmltZXJvIGNhcHR1cmEgdW4gXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzblwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gaW5pY2lhZGEgLSBtb25pdG9yZWFuZG8gXHUwMEUxcmVhXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFByb3RlY2NpXHUwMEYzbiBkZXRlbmlkYVwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHUwMEMxcmVhIHByb3RlZ2lkYSAtIHNpbiBjYW1iaW9zIGRldGVjdGFkb3NcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2FtYmlvcyBkZXRlY3RhZG9zIGVuIGVsIFx1MDBFMXJlYSBwcm90ZWdpZGFcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFJlcGFyYW5kbyB7Y291bnR9IHBcdTAwRUR4ZWxlcyBhbHRlcmFkb3MuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFJlcGFyYWRvcyB7Y291bnR9IHBcdTAwRUR4ZWxlcyBjb3JyZWN0YW1lbnRlXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIEVycm9yIHJlcGFyYW5kbyBwXHUwMEVEeGVsZXM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFNpbiBjYXJnYXMgc3VmaWNpZW50ZXMgcGFyYSByZXBhcmFyIGNhbWJpb3NcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFZlcmlmaWNhbmRvIGNhbWJpb3MgZW4gXHUwMEUxcmVhIHByb3RlZ2lkYS4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIEVycm9yIHZlcmlmaWNhbmRvIGNhbWJpb3M6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR3VhcmRpXHUwMEUxbiBhY3Rpdm8gLSBcdTAwRTFyZWEgYmFqbyBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBsYXN0Q2hlY2s6IFwiXHUwMERBbHRpbWEgdmVyaWZpY2FjaVx1MDBGM246IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJQclx1MDBGM3hpbWEgdmVyaWZpY2FjaVx1MDBGM24gZW46IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbmljaWFsaXphbmRvIGF1dG9tXHUwMEUxdGljYW1lbnRlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgaW5pY2lhZG8gYXV0b21cdTAwRTF0aWNhbWVudGVcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgTm8gc2UgcHVkbyBpbmljaWFyIGF1dG9tXHUwMEUxdGljYW1lbnRlLiBVc2EgZWwgYm90XHUwMEYzbiBtYW51YWwuXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbmljaW8gbWFudWFsIHJlcXVlcmlkb1wiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXRhIGRlIGNvbG9yZXMgZGV0ZWN0YWRhXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBCdXNjYW5kbyBwYWxldGEgZGUgY29sb3Jlcy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IEhhY2llbmRvIGNsaWMgZW4gZWwgYm90XHUwMEYzbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkb1wiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgUGludGEgdW4gcFx1MDBFRHhlbCBlbiBsYSBlc3F1aW5hIFNVUEVSSU9SIElaUVVJRVJEQSBkZWwgXHUwMEUxcmVhIGEgcHJvdGVnZXJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBBaG9yYSBwaW50YSB1biBwXHUwMEVEeGVsIGVuIGxhIGVzcXVpbmEgSU5GRVJJT1IgREVSRUNIQSBkZWwgXHUwMEUxcmVhXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgRXNwZXJhbmRvIHNlbGVjY2lcdTAwRjNuIGRlIGVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBzZWxlY2NpXHUwMEYzbiBkZSBlc3F1aW5hIGluZmVyaW9yIGRlcmVjaGEuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgRXNxdWluYSBzdXBlcmlvciBpenF1aWVyZGEgY2FwdHVyYWRhOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBFc3F1aW5hIGluZmVyaW9yIGRlcmVjaGEgY2FwdHVyYWRhOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2NpXHUwMEYzblwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJvciBlbiBzZWxlY2NpXHUwMEYzbiwgaW50XHUwMEU5bnRhbG8gZGUgbnVldm9cIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIkxvZ3MgLSB7Ym90TmFtZX1cIixcbiAgICBkb3dubG9hZExvZ3M6IFwiRGVzY2FyZ2FyIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiTGltcGlhciBMb2dzXCIsXG4gICAgY2xvc2VMb2dzOiBcIkNlcnJhclwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IGVuID0ge1xuICAvLyBMYXVuY2hlclxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIEF1dG9CT1QnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIEF1dG8tRmFybScsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IEF1dG8tSW1hZ2UnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBBdXRvLUd1YXJkJyxcbiAgICBzZWxlY3Rpb246ICdTZWxlY3Rpb24nLFxuICAgIHVzZXI6ICdVc2VyJyxcbiAgICBjaGFyZ2VzOiAnQ2hhcmdlcycsXG4gICAgYmFja2VuZDogJ0JhY2tlbmQnLFxuICAgIGRhdGFiYXNlOiAnRGF0YWJhc2UnLFxuICAgIHVwdGltZTogJ1VwdGltZScsXG4gICAgY2xvc2U6ICdDbG9zZScsXG4gICAgbGF1bmNoOiAnTGF1bmNoJyxcbiAgICBsb2FkaW5nOiAnTG9hZGluZ1x1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnRXhlY3V0aW5nXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ0Rvd25sb2FkaW5nIHNjcmlwdFx1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnQ2hvb3NlIGEgYm90IGFuZCBwcmVzcyBMYXVuY2gnLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdSZWFkeSB0byBsYXVuY2gnLFxuICAgIGxvYWRFcnJvcjogJ0xvYWQgZXJyb3InLFxuICAgIGxvYWRFcnJvck1zZzogJ0NvdWxkIG5vdCBsb2FkIHRoZSBzZWxlY3RlZCBib3QuIENoZWNrIHlvdXIgY29ubmVjdGlvbiBvciB0cnkgYWdhaW4uJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBDaGVja2luZy4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIE9ubGluZScsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBPZmZsaW5lJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBPSycsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgRXJyb3InLFxuICAgIHVua25vd246ICctJyxcbiAgICBsb2dXaW5kb3c6ICdMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ0xvZ3MgLSB7Ym90TmFtZX0nLFxuICAgIGRvd25sb2FkTG9nczogJ0Rvd25sb2FkIExvZ3MnLFxuICAgIGNsZWFyTG9nczogJ0NsZWFyIExvZ3MnLFxuICAgIGNsb3NlTG9nczogJ0Nsb3NlJ1xuICB9LFxuXG4gIC8vIEltYWdlIE1vZHVsZVxuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBBdXRvLUltYWdlXCIsXG4gICAgaW5pdEJvdDogXCJJbml0aWFsaXplIEF1dG8tQk9UXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiVXBsb2FkIEltYWdlXCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiUmVzaXplIEltYWdlXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWN0IFBvc2l0aW9uXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJTdGFydCBQYWludGluZ1wiLFxuICAgIHN0b3BQYWludGluZzogXCJTdG9wIFBhaW50aW5nXCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlNhdmUgUHJvZ3Jlc3NcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiTG9hZCBQcm9ncmVzc1wiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBDaGVja2luZyBhdmFpbGFibGUgY29sb3JzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgT3BlbiB0aGUgY29sb3IgcGFsZXR0ZSBvbiB0aGUgc2l0ZSBhbmQgdHJ5IGFnYWluIVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBGb3VuZCB7Y291bnR9IGF2YWlsYWJsZSBjb2xvcnNcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIExvYWRpbmcgaW1hZ2UuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgSW1hZ2UgbG9hZGVkIHdpdGgge2NvdW50fSB2YWxpZCBwaXhlbHNcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBsb2FkaW5nIGltYWdlXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJQYWludCB0aGUgZmlyc3QgcGl4ZWwgYXQgdGhlIGxvY2F0aW9uIHdoZXJlIHlvdSB3YW50IHRoZSBhcnQgdG8gc3RhcnQhXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBXYWl0aW5nIGZvciB5b3UgdG8gcGFpbnQgdGhlIHJlZmVyZW5jZSBwaXhlbC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBQb3NpdGlvbiBzZXQgc3VjY2Vzc2Z1bGx5IVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgVGltZW91dCBmb3IgcG9zaXRpb24gc2VsZWN0aW9uXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgUG9zaXRpb24gZGV0ZWN0ZWQsIHByb2Nlc3NpbmcuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJvciBkZXRlY3RpbmcgcG9zaXRpb24sIHBsZWFzZSB0cnkgYWdhaW5cIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBTdGFydGluZyBwYWludGluZy4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFByb2dyZXNzOiB7cGFpbnRlZH0ve3RvdGFsfSBwaXhlbHMuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIE5vIGNoYXJnZXMuIFdhaXRpbmcge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQYWludGluZyBzdG9wcGVkIGJ5IHVzZXJcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBQYWludGluZyBjb21wbGV0ZWQhIHtjb3VudH0gcGl4ZWxzIHBhaW50ZWQuXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgRXJyb3IgZHVyaW5nIHBhaW50aW5nXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgTG9hZCBhbiBpbWFnZSBhbmQgc2VsZWN0IGEgcG9zaXRpb24gZmlyc3RcIixcbiAgICBwcm9ncmVzczogXCJQcm9ncmVzc1wiLFxuICAgIHVzZXJOYW1lOiBcIlVzZXJcIixcbiAgICBwaXhlbHM6IFwiUGl4ZWxzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJFc3RpbWF0ZWQgdGltZVwiLFxuICAgIGluaXRNZXNzYWdlOiBcIkNsaWNrICdJbml0aWFsaXplIEF1dG8tQk9UJyB0byBiZWdpblwiLFxuICAgIHdhaXRpbmdJbml0OiBcIldhaXRpbmcgZm9yIGluaXRpYWxpemF0aW9uLi4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgSW1hZ2UgcmVzaXplZCB0byB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFBhaW50aW5nIHBhdXNlZCBhdCBwb3NpdGlvbiBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBpeGVscyBwZXIgYmF0Y2hcIixcbiAgICBiYXRjaFNpemU6IFwiQmF0Y2ggc2l6ZVwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiTmV4dCBiYXRjaCBpblwiLFxuICAgIHVzZUFsbENoYXJnZXM6IFwiVXNlIGFsbCBhdmFpbGFibGUgY2hhcmdlc1wiLFxuICAgIHNob3dPdmVybGF5OiBcIlNob3cgb3ZlcmxheVwiLFxuICAgIG1heENoYXJnZXM6IFwiTWF4IGNoYXJnZXMgcGVyIGJhdGNoXCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIFdhaXRpbmcgZm9yIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiVGltZSByZW1haW5pbmdcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIFdhaXRpbmcge3RpbWV9IHRvIGNvbnRpbnVlLi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgUHJvZ3Jlc3Mgc2F2ZWQgYXMge2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBQcm9ncmVzcyBsb2FkZWQ6IHtwYWludGVkfS97dG90YWx9IHBpeGVscyBwYWludGVkXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIEVycm9yIGxvYWRpbmcgcHJvZ3Jlc3M6IHtlcnJvcn1cIixcblxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBzYXZpbmcgcHJvZ3Jlc3M6IHtlcnJvcn1cIixcblxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiRG8geW91IHdhbnQgdG8gc2F2ZSB0aGUgY3VycmVudCBwcm9ncmVzcyBiZWZvcmUgc3RvcHBpbmc/XCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiU2F2ZSBQcm9ncmVzc1wiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJEaXNjYXJkXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbFwiLFxuICAgIG1pbmltaXplOiBcIk1pbmltaXplXCIsXG4gICAgd2lkdGg6IFwiV2lkdGhcIixcbiAgICBoZWlnaHQ6IFwiSGVpZ2h0XCIsIFxuICAgIGtlZXBBc3BlY3Q6IFwiS2VlcCBhc3BlY3QgcmF0aW9cIixcbiAgICBhcHBseTogXCJBcHBseVwiLFxuICBvdmVybGF5T246IFwiT3ZlcmxheTogT05cIixcbiAgb3ZlcmxheU9mZjogXCJPdmVybGF5OiBPRkZcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBQYXNzIGNvbXBsZXRlZDoge3BhaW50ZWR9IHBpeGVscyBwYWludGVkIHwgUHJvZ3Jlc3M6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFdhaXRpbmcgZm9yIGNoYXJnZSByZWdlbmVyYXRpb246IHtjdXJyZW50fS97bmVlZGVkfSAtIFRpbWU6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBSZW1haW5pbmc6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEF1dG8taW5pdGlhbGl6aW5nLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBCb3QgYXV0by1zdGFydGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBDb3VsZCBub3QgYXV0by1zdGFydC4gVXNlIG1hbnVhbCBidXR0b24uXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBDb2xvciBwYWxldHRlIGRldGVjdGVkXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBTZWFyY2hpbmcgZm9yIGNvbG9yIHBhbGV0dGUuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGlja2luZyBQYWludCBidXR0b24uLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBQYWludCBidXR0b24gbm90IGZvdW5kXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBNYW51YWwgaW5pdGlhbGl6YXRpb24gcmVxdWlyZWRcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFJldHJ5IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGluIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgRXJyb3IgaW4gYXR0ZW1wdCB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgcmV0cnlpbmcgaW4ge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgRmFpbGVkIGFmdGVyIHttYXhBdHRlbXB0c30gYXR0ZW1wdHMuIENvbnRpbnVpbmcgd2l0aCBuZXh0IGJhdGNoLi4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBOZXR3b3JrIGVycm9yLiBSZXRyeWluZy4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBTZXJ2ZXIgZXJyb3IuIFJldHJ5aW5nLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBTZXJ2ZXIgdGltZW91dCwgcmV0cnlpbmcuLi5cIixcbiAgICAvLyB2Mi4wIC0gUHJvdGVjdGlvbiBhbmQgUGF0dGVybnNcbiAgICBwcm90ZWN0aW9uRW5hYmxlZDogXCJQcm90ZWN0aW9uIGVuYWJsZWRcIixcbiAgICBwcm90ZWN0aW9uRGlzYWJsZWQ6IFwiUHJvdGVjdGlvbiBkaXNhYmxlZFwiLFxuICAgIHBhaW50UGF0dGVybjogXCJQYWludCBwYXR0ZXJuXCIsXG4gICAgcGF0dGVybkxpbmVhclN0YXJ0OiBcIkxpbmVhciAoU3RhcnQpXCIsXG4gICAgcGF0dGVybkxpbmVhckVuZDogXCJMaW5lYXIgKEVuZClcIixcbiAgICBwYXR0ZXJuUmFuZG9tOiBcIlJhbmRvbVwiLFxuICAgIHBhdHRlcm5DZW50ZXJPdXQ6IFwiQ2VudGVyIG91dHdhcmRcIixcbiAgICBwYXR0ZXJuQ29ybmVyc0ZpcnN0OiBcIkNvcm5lcnMgZmlyc3RcIixcbiAgICBwYXR0ZXJuU3BpcmFsOiBcIlNwaXJhbFwiLFxuICAgIHNvbGlkOiBcIlNvbGlkXCIsXG4gICAgc3RyaXBlczogXCJTdHJpcGVzXCIsXG4gICAgY2hlY2tlcmJvYXJkOiBcIkNoZWNrZXJib2FyZFwiLFxuICAgIGdyYWRpZW50OiBcIkdyYWRpZW50XCIsXG4gICAgZG90czogXCJEb3RzXCIsXG4gICAgd2F2ZXM6IFwiV2F2ZXNcIixcbiAgICBzcGlyYWw6IFwiU3BpcmFsXCIsXG4gICAgbW9zYWljOiBcIk1vc2FpY1wiLFxuICAgIGJyaWNrczogXCJCcmlja3NcIixcbiAgICB6aWd6YWc6IFwiWmlnemFnXCIsXG4gICAgcHJvdGVjdGluZ0RyYXdpbmc6IFwiUHJvdGVjdGluZyBkcmF3aW5nLi4uXCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCB7Y291bnR9IGNoYW5nZXMgZGV0ZWN0ZWQgaW4gZHJhd2luZ1wiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdUREMjcgUmVwYWlyaW5nIHtjb3VudH0gYWx0ZXJlZCBwaXhlbHMuLi5cIixcbiAgICByZXBhaXJDb21wbGV0ZWQ6IFwiXHUyNzA1IFJlcGFpciBjb21wbGV0ZWQ6IHtjb3VudH0gcGl4ZWxzXCIsXG4gICAgbm9DaGFyZ2VzRm9yUmVwYWlyOiBcIlx1MjZBMSBObyBjaGFyZ2VzIGZvciByZXBhaXIsIHdhaXRpbmcuLi5cIixcbiAgICBwcm90ZWN0aW9uUHJpb3JpdHk6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY3Rpb24gcHJpb3JpdHkgYWN0aXZhdGVkXCIsXG4gICAgcGF0dGVybkFwcGxpZWQ6IFwiUGF0dGVybiBhcHBsaWVkXCIsXG4gICAgY3VzdG9tUGF0dGVybjogXCJDdXN0b20gcGF0dGVyblwiLFxuICAgIGxvZ1dpbmRvdzogXCJMb2dzXCIsXG4gICAgbG9nV2luZG93VGl0bGU6IFwiTG9ncyAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJEb3dubG9hZCBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkNsZWFyIExvZ3NcIixcbiAgICBjbG9zZUxvZ3M6IFwiQ2xvc2VcIlxuICB9LFxuXG4gIC8vIEZhcm0gbW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBGYXJtIEJvdFwiLFxuICAgIHN0YXJ0OiBcIlN0YXJ0XCIsXG4gICAgc3RvcDogXCJTdG9wXCIsXG4gICAgc3RvcHBlZDogXCJCb3Qgc3RvcHBlZFwiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJhdGVcIixcbiAgICBwYWludE9uY2U6IFwiT25jZVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIkNoZWNraW5nIHN0YXR1cy4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiQ29uZmlndXJhdGlvblwiLFxuICAgIGRlbGF5OiBcIkRlbGF5IChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMvYmF0Y2hcIixcbiAgICBtaW5DaGFyZ2VzOiBcIk1pbiBjaGFyZ2VzXCIsXG4gICAgY29sb3JNb2RlOiBcIkNvbG9yIG1vZGVcIixcbiAgICByYW5kb206IFwiUmFuZG9tXCIsXG4gICAgZml4ZWQ6IFwiRml4ZWRcIixcbiAgICByYW5nZTogXCJSYW5nZVwiLFxuICAgIGZpeGVkQ29sb3I6IFwiRml4ZWQgY29sb3JcIixcbiAgICBhZHZhbmNlZDogXCJBZHZhbmNlZFwiLFxuICAgIHRpbGVYOiBcIlRpbGUgWFwiLFxuICAgIHRpbGVZOiBcIlRpbGUgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiQ3VzdG9tIHBhbGV0dGVcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJlLmc6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJlXCIsXG4gICAgcGFpbnRlZDogXCJQYWludGVkXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgcmV0cmllczogXCJSZXRyaWVzXCIsXG4gICAgdGlsZTogXCJUaWxlXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiQ29uZmlndXJhdGlvbiBzYXZlZFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmF0aW9uIGxvYWRlZFwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYXRpb24gcmVzZXRcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBhaW50IGEgcGl4ZWwgbWFudWFsbHkgdG8gY2FwdHVyZSBjb29yZGluYXRlcy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiQmFja2VuZCBPbmxpbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIE9mZmxpbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJTdGFydGluZyBib3QuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJTdG9wcGluZyBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhdGluZy4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSBpcyBhbHJlYWR5IHJ1bm5pbmcuXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGlzIHJ1bm5pbmcuIENsb3NlIGl0IGJlZm9yZSBzdGFydGluZyBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWN0IEFyZWFcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBQYWludCBhIHBpeGVsIGluIGFuIEVNUFRZIGFyZWEgb2YgdGhlIG1hcCB0byBzZXQgdGhlIGZhcm1pbmcgem9uZVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgeW91IHRvIHBhaW50IHRoZSByZWZlcmVuY2UgcGl4ZWwuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgQXJlYSBzZXQhIFJhZGl1czogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpbWVvdXQgZm9yIGFyZWEgc2VsZWN0aW9uXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTZWxlY3QgYW4gYXJlYSBmaXJzdCB1c2luZyAnU2VsZWN0IEFyZWEnXCIsXG4gICAgZmFybVJhZGl1czogXCJGYXJtIHJhZGl1c1wiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJDdXJyZW50IGFyZWFcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIEZhcm1pbmcgaW4ge3JhZGl1c31weCByYWRpdXMgZnJvbSAoe3h9LHt5fSlcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIElNUE9SVEFOVDogU2VsZWN0IGFuIEVNUFRZIGFyZWEgdG8gYXZvaWQgY29uZmxpY3RzXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJObyBhcmVhXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uZTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTZWxlY3QgYW4gYXJlYSBmaXJzdC4gUGFpbnQgYSBwaXhlbCBvbiB0aGUgbWFwIHRvIHNldCB0aGUgZmFybWluZyB6b25lXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIkRvd25sb2FkIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiQ2xlYXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJDbG9zZVwiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiWWVzXCIsXG4gICAgbm86IFwiTm9cIixcbiAgICBvazogXCJPS1wiLFxuICAgIGNhbmNlbDogXCJDYW5jZWxcIixcbiAgICBjbG9zZTogXCJDbG9zZVwiLFxuICAgIHNhdmU6IFwiU2F2ZVwiLFxuICAgIGxvYWQ6IFwiTG9hZFwiLFxuICAgIGRlbGV0ZTogXCJEZWxldGVcIixcbiAgICBlZGl0OiBcIkVkaXRcIixcbiAgICBzdGFydDogXCJTdGFydFwiLFxuICAgIHN0b3A6IFwiU3RvcFwiLFxuICAgIHBhdXNlOiBcIlBhdXNlXCIsXG4gICAgcmVzdW1lOiBcIlJlc3VtZVwiLFxuICAgIHJlc2V0OiBcIlJlc2V0XCIsXG4gICAgc2V0dGluZ3M6IFwiU2V0dGluZ3NcIixcbiAgICBoZWxwOiBcIkhlbHBcIixcbiAgICBhYm91dDogXCJBYm91dFwiLFxuICAgIGxhbmd1YWdlOiBcIkxhbmd1YWdlXCIsXG4gICAgbG9hZGluZzogXCJMb2FkaW5nLi4uXCIsXG4gICAgZXJyb3I6IFwiRXJyb3JcIixcbiAgICBzdWNjZXNzOiBcIlN1Y2Nlc3NcIixcbiAgICB3YXJuaW5nOiBcIldhcm5pbmdcIixcbiAgICBpbmZvOiBcIkluZm9ybWF0aW9uXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIkxhbmd1YWdlIGNoYW5nZWQgdG8ge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gR3VhcmQgTW9kdWxlXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEF1dG8tR3VhcmRcIixcbiAgICBpbml0Qm90OiBcIkluaXRpYWxpemUgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTZWxlY3QgQXJlYVwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIkNhcHR1cmUgQXJlYVwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJTdGFydCBQcm90ZWN0aW9uXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiU3RvcCBQcm90ZWN0aW9uXCIsXG4gICAgdXBwZXJMZWZ0OiBcIlVwcGVyIExlZnQgQ29ybmVyXCIsXG4gICAgbG93ZXJSaWdodDogXCJMb3dlciBSaWdodCBDb3JuZXJcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiUHJvdGVjdGVkIFBpeGVsc1wiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJEZXRlY3RlZCBDaGFuZ2VzXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiUmVwYWlyZWQgUGl4ZWxzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiV2FpdGluZyBmb3IgaW5pdGlhbGl6YXRpb24uLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggQ2hlY2tpbmcgYXZhaWxhYmxlIGNvbG9ycy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIE5vIGNvbG9ycyBmb3VuZC4gT3BlbiB0aGUgY29sb3IgcGFsZXR0ZSBvbiB0aGUgc2l0ZS5cIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgRm91bmQge2NvdW50fSBhdmFpbGFibGUgY29sb3JzXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIEVycm9yIGluaXRpYWxpemluZyBHdWFyZC1CT1RcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBJbnZhbGlkIGNvb3JkaW5hdGVzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIEFyZWEgbXVzdCBoYXZlIHVwcGVyIGxlZnQgY29ybmVyIGxlc3MgdGhhbiBsb3dlciByaWdodCBjb3JuZXJcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIEFyZWEgdG9vIGxhcmdlOiB7c2l6ZX0gcGl4ZWxzIChtYXhpbXVtOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBDYXB0dXJpbmcgcHJvdGVjdGlvbiBhcmVhLi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBBcmVhIGNhcHR1cmVkOiB7Y291bnR9IHBpeGVscyB1bmRlciBwcm90ZWN0aW9uXCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBFcnJvciBjYXB0dXJpbmcgYXJlYToge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgRmlyc3QgY2FwdHVyZSBhIHByb3RlY3Rpb24gYXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWN0aW9uIHN0YXJ0ZWQgLSBtb25pdG9yaW5nIGFyZWFcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUHJvdGVjdGlvbiBzdG9wcGVkXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBQcm90ZWN0ZWQgYXJlYSAtIG5vIGNoYW5nZXMgZGV0ZWN0ZWRcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2hhbmdlcyBkZXRlY3RlZCBpbiBwcm90ZWN0ZWQgYXJlYVwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgUmVwYWlyaW5nIHtjb3VudH0gYWx0ZXJlZCBwaXhlbHMuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFN1Y2Nlc3NmdWxseSByZXBhaXJlZCB7Y291bnR9IHBpeGVsc1wiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJvciByZXBhaXJpbmcgcGl4ZWxzOiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBJbnN1ZmZpY2llbnQgY2hhcmdlcyB0byByZXBhaXIgY2hhbmdlc1wiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgQ2hlY2tpbmcgY2hhbmdlcyBpbiBwcm90ZWN0ZWQgYXJlYS4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIEVycm9yIGNoZWNraW5nIGNoYW5nZXM6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR3VhcmRpYW4gYWN0aXZlIC0gYXJlYSB1bmRlciBwcm90ZWN0aW9uXCIsXG4gICAgbGFzdENoZWNrOiBcIkxhc3QgY2hlY2s6IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJOZXh0IGNoZWNrIGluOiB7dGltZX1zXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgQXV0by1pbml0aWFsaXppbmcuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBhdXRvLXN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIENvdWxkIG5vdCBhdXRvLXN0YXJ0LiBVc2UgbWFudWFsIGJ1dHRvbi5cIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IE1hbnVhbCBpbml0aWFsaXphdGlvbiByZXF1aXJlZFwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggQ29sb3IgcGFsZXR0ZSBkZXRlY3RlZFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgU2VhcmNoaW5nIGZvciBjb2xvciBwYWxldHRlLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpY2tpbmcgUGFpbnQgYnV0dG9uLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgUGFpbnQgYnV0dG9uIG5vdCBmb3VuZFwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgUGFpbnQgYSBwaXhlbCBhdCB0aGUgVVBQRVIgTEVGVCBjb3JuZXIgb2YgdGhlIGFyZWEgdG8gcHJvdGVjdFwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIE5vdyBwYWludCBhIHBpeGVsIGF0IHRoZSBMT1dFUiBSSUdIVCBjb3JuZXIgb2YgdGhlIGFyZWFcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBXYWl0aW5nIGZvciB1cHBlciBsZWZ0IGNvcm5lciBzZWxlY3Rpb24uLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgbG93ZXIgcmlnaHQgY29ybmVyIHNlbGVjdGlvbi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBVcHBlciBsZWZ0IGNvcm5lciBjYXB0dXJlZDogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgTG93ZXIgcmlnaHQgY29ybmVyIGNhcHR1cmVkOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgU2VsZWN0aW9uIHRpbWVvdXRcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgU2VsZWN0aW9uIGVycm9yLCBwbGVhc2UgdHJ5IGFnYWluXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIkRvd25sb2FkIExvZ3NcIixcbiAgICBjbGVhckxvZ3M6IFwiQ2xlYXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJDbG9zZVwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IGZyID0ge1xuICAvLyBMYXVuY2hlclxuICBsYXVuY2hlcjoge1xuICAgIHRpdGxlOiAnV1BsYWNlIEF1dG9CT1QnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIEF1dG8tRmFybScsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IEF1dG8tSW1hZ2UnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBBdXRvLUd1YXJkJyxcbiAgICBzZWxlY3Rpb246ICdTXHUwMEU5bGVjdGlvbicsXG4gICAgdXNlcjogJ1V0aWxpc2F0ZXVyJyxcbiAgICBjaGFyZ2VzOiAnQ2hhcmdlcycsXG4gICAgYmFja2VuZDogJ0JhY2tlbmQnLFxuICAgIGRhdGFiYXNlOiAnQmFzZSBkZSBkb25uXHUwMEU5ZXMnLFxuICAgIHVwdGltZTogJ1RlbXBzIGFjdGlmJyxcbiAgICBjbG9zZTogJ0Zlcm1lcicsXG4gICAgbGF1bmNoOiAnTGFuY2VyJyxcbiAgICBsb2FkaW5nOiAnQ2hhcmdlbWVudFx1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnRXhcdTAwRTljdXRpb25cdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnVFx1MDBFOWxcdTAwRTljaGFyZ2VtZW50IGR1IHNjcmlwdFx1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnQ2hvaXNpc3NleiB1biBib3QgZXQgYXBwdXlleiBzdXIgTGFuY2VyJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnUHJcdTAwRUF0IFx1MDBFMCBsYW5jZXInLFxuICAgIGxvYWRFcnJvcjogJ0VycmV1ciBkZSBjaGFyZ2VtZW50JyxcbiAgICBsb2FkRXJyb3JNc2c6ICdJbXBvc3NpYmxlIGRlIGNoYXJnZXIgbGUgYm90IHNcdTAwRTlsZWN0aW9ublx1MDBFOS4gVlx1MDBFOXJpZmlleiB2b3RyZSBjb25uZXhpb24gb3Ugclx1MDBFOWVzc2F5ZXouJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBWXHUwMEU5cmlmaWNhdGlvbi4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIEVuIGxpZ25lJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IEhvcnMgbGlnbmUnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIE9LJyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBFcnJldXInLFxuICAgIHVua25vd246ICctJyxcbiAgICBsb2dXaW5kb3c6ICdMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ0xvZ3MgLSB7Ym90TmFtZX0nLFxuICAgIGRvd25sb2FkTG9nczogJ1RcdTAwRTlsXHUwMEU5Y2hhcmdlciBMb2dzJyxcbiAgICBjbGVhckxvZ3M6ICdFZmZhY2VyIExvZ3MnLFxuICAgIGNsb3NlTG9nczogJ0Zlcm1lcidcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGlzZXIgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJUXHUwMEU5bFx1MDBFOWNoYXJnZXIgSW1hZ2VcIixcbiAgICByZXNpemVJbWFnZTogXCJSZWRpbWVuc2lvbm5lciBJbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNcdTAwRTlsZWN0aW9ubmVyIFBvc2l0aW9uXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJDb21tZW5jZXIgUGVpbnR1cmVcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiQXJyXHUwMEVBdGVyIFBlaW50dXJlXCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlNhdXZlZ2FyZGVyIFByb2dyXHUwMEU4c1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJDaGFyZ2VyIFByb2dyXHUwMEU4c1wiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBWXHUwMEU5cmlmaWNhdGlvbiBkZXMgY291bGV1cnMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBPdXZyZXogbGEgcGFsZXR0ZSBkZSBjb3VsZXVycyBzdXIgbGUgc2l0ZSBldCByXHUwMEU5ZXNzYXlleiFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb3VsZXVycyBkaXNwb25pYmxlcyB0cm91dlx1MDBFOWVzXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBDaGFyZ2VtZW50IGRlIGwnaW1hZ2UuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgSW1hZ2UgY2hhcmdcdTAwRTllIGF2ZWMge2NvdW50fSBwaXhlbHMgdmFsaWRlc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGUgbCdpbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiUGVpZ25leiBsZSBwcmVtaWVyIHBpeGVsIFx1MDBFMCBsJ2VtcGxhY2VtZW50IG9cdTAwRjkgdm91cyB2b3VsZXogcXVlIGwnYXJ0IGNvbW1lbmNlIVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBxdWUgdm91cyBwZWlnbmlleiBsZSBwaXhlbCBkZSByXHUwMEU5Zlx1MDBFOXJlbmNlLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFBvc2l0aW9uIGRcdTAwRTlmaW5pZSBhdmVjIHN1Y2NcdTAwRThzIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkXHUwMEU5cGFzc1x1MDBFOSBwb3VyIGxhIHNcdTAwRTlsZWN0aW9uIGRlIHBvc2l0aW9uXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgUG9zaXRpb24gZFx1MDBFOXRlY3RcdTAwRTllLCB0cmFpdGVtZW50Li4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyZXVyIGRcdTAwRTl0ZWN0YW50IGxhIHBvc2l0aW9uLCBlc3NheWV6IFx1MDBFMCBub3V2ZWF1XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggRFx1MDBFOWJ1dCBkZSBsYSBwZWludHVyZS4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFByb2dyXHUwMEU4czoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBBdWN1bmUgY2hhcmdlLiBBdHRlbmRyZSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFBlaW50dXJlIGFyclx1MDBFQXRcdTAwRTllIHBhciBsJ3V0aWxpc2F0ZXVyXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgUGVpbnR1cmUgdGVybWluXHUwMEU5ZSEge2NvdW50fSBwaXhlbHMgcGVpbnRzLlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBwZW5kYW50IGxhIHBlaW50dXJlXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgQ2hhcmdleiB1bmUgaW1hZ2UgZXQgc1x1MDBFOWxlY3Rpb25uZXogdW5lIHBvc2l0aW9uIGQnYWJvcmRcIixcbiAgICBwcm9ncmVzczogXCJQcm9nclx1MDBFOHNcIixcbiAgICB1c2VyTmFtZTogXCJVc2FnZXJcIixcbiAgICBwaXhlbHM6IFwiUGl4ZWxzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJUZW1wcyBlc3RpbVx1MDBFOVwiLFxuICAgIGluaXRNZXNzYWdlOiBcIkNsaXF1ZXogc3VyICdJbml0aWFsaXNlciBBdXRvLUJPVCcgcG91ciBjb21tZW5jZXJcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFbiBhdHRlbnRlIGQnaW5pdGlhbGlzYXRpb24uLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBJbWFnZSByZWRpbWVuc2lvbm5cdTAwRTllIFx1MDBFMCB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFBlaW50dXJlIG1pc2UgZW4gcGF1c2UgXHUwMEUwIGxhIHBvc2l0aW9uIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzIHBhciBsb3RcIixcbiAgICBiYXRjaFNpemU6IFwiVGFpbGxlIGR1IGxvdFwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiUHJvY2hhaW4gbG90IGRhbnNcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlV0aWxpc2VyIHRvdXRlcyBsZXMgY2hhcmdlcyBkaXNwb25pYmxlc1wiLFxuICAgIHNob3dPdmVybGF5OiBcIkFmZmljaGVyIGwnb3ZlcmxheVwiLFxuICAgIG1heENoYXJnZXM6IFwiQ2hhcmdlcyBtYXggcGFyIGxvdFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBFbiBhdHRlbnRlIGRlIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiVGVtcHMgcmVzdGFudFwiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgQXR0ZW5kcmUge3RpbWV9IHBvdXIgY29udGludWVyLi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgUHJvZ3JcdTAwRThzIHNhdXZlZ2FyZFx1MDBFOSBzb3VzIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3JcdTAwRThzIGNoYXJnXHUwMEU5OiB7cGFpbnRlZH0ve3RvdGFsfSBwaXhlbHMgcGVpbnRzXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZHUgcHJvZ3JcdTAwRThzOiB7ZXJyb3J9XCIsXG4gXG4gICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlIGR1IHByb2dyXHUwMEU4czoge2Vycm9yfVwiLFxuXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJWb3VsZXotdm91cyBzYXV2ZWdhcmRlciBsZSBwcm9nclx1MDBFOHMgYWN0dWVsIGF2YW50IGQnYXJyXHUwMEVBdGVyP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlNhdXZlZ2FyZGVyIFByb2dyXHUwMEU4c1wiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJBYmFuZG9ubmVyXCIsXG4gICAgY2FuY2VsOiBcIkFubnVsZXJcIixcbiAgICBtaW5pbWl6ZTogXCJNaW5pbWlzZXJcIixcbiAgICB3aWR0aDogXCJMYXJnZXVyXCIsXG4gICAgaGVpZ2h0OiBcIkhhdXRldXJcIiwgXG4gICAga2VlcEFzcGVjdDogXCJHYXJkZXIgbGVzIHByb3BvcnRpb25zXCIsXG4gICAgYXBwbHk6IFwiQXBwbGlxdWVyXCIsXG4gIG92ZXJsYXlPbjogXCJPdmVybGF5IDogT05cIixcbiAgb3ZlcmxheU9mZjogXCJPdmVybGF5IDogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzc2FnZSB0ZXJtaW5cdTAwRTk6IHtwYWludGVkfSBwaXhlbHMgcGVpbnRzIHwgUHJvZ3JcdTAwRThzOiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBBdHRlbnRlIGRlIHJcdTAwRTlnXHUwMEU5blx1MDBFOXJhdGlvbiBkZXMgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gVGVtcHM6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBBdHRlbnRlIGRlcyBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBSZXN0YW50OiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbml0aWFsaXNhdGlvbiBhdXRvbWF0aXF1ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGRcdTAwRTltYXJyXHUwMEU5IGF1dG9tYXRpcXVlbWVudFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBJbXBvc3NpYmxlIGRlIGRcdTAwRTltYXJyZXIgYXV0b21hdGlxdWVtZW50LiBVdGlsaXNleiBsZSBib3V0b24gbWFudWVsLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXR0ZSBkZSBjb3VsZXVycyBkXHUwMEU5dGVjdFx1MDBFOWVcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFJlY2hlcmNoZSBkZSBsYSBwYWxldHRlIGRlIGNvdWxldXJzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpYyBzdXIgbGUgYm91dG9uIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm91dG9uIFBhaW50IGludHJvdXZhYmxlXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbml0aWFsaXNhdGlvbiBtYW51ZWxsZSByZXF1aXNlXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBUZW50YXRpdmUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gZGFucyB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycmV1ciBkYW5zIHRlbnRhdGl2ZSB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgbm91dmVsIGVzc2FpIGRhbnMge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHUwMEM5Y2hlYyBhcHJcdTAwRThzIHttYXhBdHRlbXB0c30gdGVudGF0aXZlcy4gQ29udGludWFudCBhdmVjIGxlIGxvdCBzdWl2YW50Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBFcnJldXIgclx1MDBFOXNlYXUuIE5vdXZlbCBlc3NhaS4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBFcnJldXIgc2VydmV1ci4gTm91dmVsIGVzc2FpLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBEXHUwMEU5bGFpIGRcdTIwMTlhdHRlbnRlIGR1IHNlcnZldXIsIG5vdXZlbGxlIHRlbnRhdGl2ZS4uLlwiLFxuICAgIC8vIHYyLjAgLSBQcm90ZWN0aW9uIGV0IG1vdGlmc1xuICAgIHByb3RlY3Rpb25FbmFibGVkOiBcIlByb3RlY3Rpb24gYWN0aXZcdTAwRTllXCIsXG4gICAgcHJvdGVjdGlvbkRpc2FibGVkOiBcIlByb3RlY3Rpb24gZFx1MDBFOXNhY3Rpdlx1MDBFOWVcIixcbiAgICBwYWludFBhdHRlcm46IFwiTW90aWYgZGUgcGVpbnR1cmVcIixcbiAgICBwYXR0ZXJuTGluZWFyU3RhcnQ6IFwiTGluXHUwMEU5YWlyZSAoRFx1MDBFOWJ1dClcIixcbiAgICBwYXR0ZXJuTGluZWFyRW5kOiBcIkxpblx1MDBFOWFpcmUgKEZpbilcIixcbiAgICBwYXR0ZXJuUmFuZG9tOiBcIkFsXHUwMEU5YXRvaXJlXCIsXG4gICAgcGF0dGVybkNlbnRlck91dDogXCJDZW50cmUgdmVycyBsXHUyMDE5ZXh0XHUwMEU5cmlldXJcIixcbiAgICBwYXR0ZXJuQ29ybmVyc0ZpcnN0OiBcIkNvaW5zIGRcdTIwMTlhYm9yZFwiLFxuICAgIHBhdHRlcm5TcGlyYWw6IFwiU3BpcmFsZVwiLFxuICAgIHNvbGlkOiBcIlBsZWluXCIsXG4gICAgc3RyaXBlczogXCJSYXl1cmVzXCIsXG4gICAgY2hlY2tlcmJvYXJkOiBcIkRhbWllclwiLFxuICAgIGdyYWRpZW50OiBcIkRcdTAwRTlncmFkXHUwMEU5XCIsXG4gICAgZG90czogXCJQb2ludHNcIixcbiAgICB3YXZlczogXCJWYWd1ZXNcIixcbiAgICBzcGlyYWw6IFwiU3BpcmFsZVwiLFxuICAgIG1vc2FpYzogXCJNb3NhXHUwMEVGcXVlXCIsXG4gICAgYnJpY2tzOiBcIkJyaXF1ZXNcIixcbiAgICB6aWd6YWc6IFwiWmlnemFnXCIsXG4gICAgcHJvdGVjdGluZ0RyYXdpbmc6IFwiUHJvdGVjdGlvbiBkdSBkZXNzaW4uLi5cIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2hhbmdlbWVudHMgZFx1MDBFOXRlY3RcdTAwRTlzIGRhbnMgbGUgZGVzc2luXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REQyNyBSXHUwMEU5cGFyYXRpb24gZGUge2NvdW50fSBwaXhlbHMgbW9kaWZpXHUwMEU5cy4uLlwiLFxuICAgIHJlcGFpckNvbXBsZXRlZDogXCJcdTI3MDUgUlx1MDBFOXBhcmF0aW9uIHRlcm1pblx1MDBFOWUgOiB7Y291bnR9IHBpeGVsc1wiLFxuICAgIG5vQ2hhcmdlc0ZvclJlcGFpcjogXCJcdTI2QTEgUGFzIGRlIGZyYWlzIHBvdXIgbGEgclx1MDBFOXBhcmF0aW9uLCBlbiBhdHRlbnRlLi4uXCIsXG4gICAgcHJvdGVjdGlvblByaW9yaXR5OiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcmlvcml0XHUwMEU5IFx1MDBFMCBsYSBwcm90ZWN0aW9uIGFjdGl2XHUwMEU5ZVwiLFxuICAgIHBhdHRlcm5BcHBsaWVkOiBcIk1vdGlmIGFwcGxpcXVcdTAwRTlcIixcbiAgICBjdXN0b21QYXR0ZXJuOiBcIk1vdGlmIHBlcnNvbm5hbGlzXHUwMEU5XCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIlRcdTAwRTlsXHUwMEU5Y2hhcmdlciBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkVmZmFjZXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJGZXJtZXJcIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBGYXJtIEJvdFwiLFxuICAgIHN0YXJ0OiBcIkRcdTAwRTltYXJyZXJcIixcbiAgICBzdG9wOiBcIkFyclx1MDBFQXRlclwiLFxuICAgIHN0b3BwZWQ6IFwiQm90IGFyclx1MDBFQXRcdTAwRTlcIixcbiAgICBjYWxpYnJhdGU6IFwiQ2FsaWJyZXJcIixcbiAgICBwYWludE9uY2U6IFwiVW5lIGZvaXNcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJWXHUwMEU5cmlmaWNhdGlvbiBkdSBzdGF0dXQuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYXRpb25cIixcbiAgICBkZWxheTogXCJEXHUwMEU5bGFpIChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMvbG90XCIsXG4gICAgbWluQ2hhcmdlczogXCJDaGFyZ2VzIG1pblwiLFxuICAgIGNvbG9yTW9kZTogXCJNb2RlIGNvdWxldXJcIixcbiAgICByYW5kb206IFwiQWxcdTAwRTlhdG9pcmVcIixcbiAgICBmaXhlZDogXCJGaXhlXCIsXG4gICAgcmFuZ2U6IFwiUGxhZ2VcIixcbiAgICBmaXhlZENvbG9yOiBcIkNvdWxldXIgZml4ZVwiLFxuICAgIGFkdmFuY2VkOiBcIkF2YW5jXHUwMEU5XCIsXG4gICAgdGlsZVg6IFwiVHVpbGUgWFwiLFxuICAgIHRpbGVZOiBcIlR1aWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlBhbGV0dGUgcGVyc29ubmFsaXNcdTAwRTllXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZXg6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJlclwiLFxuICAgIHBhaW50ZWQ6IFwiUGVpbnRzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgcmV0cmllczogXCJcdTAwQzljaGVjc1wiLFxuICAgIHRpbGU6IFwiVHVpbGVcIixcbiAgICBjb25maWdTYXZlZDogXCJDb25maWd1cmF0aW9uIHNhdXZlZ2FyZFx1MDBFOWVcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiQ29uZmlndXJhdGlvbiBjaGFyZ1x1MDBFOWVcIixcbiAgICBjb25maWdSZXNldDogXCJDb25maWd1cmF0aW9uIHJcdTAwRTlpbml0aWFsaXNcdTAwRTllXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJQZWluZHJlIHVuIHBpeGVsIG1hbnVlbGxlbWVudCBwb3VyIGNhcHR1cmVyIGxlcyBjb29yZG9ublx1MDBFOWVzLi4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJCYWNrZW5kIEVuIGxpZ25lXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiQmFja2VuZCBIb3JzIGxpZ25lXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiRFx1MDBFOW1hcnJhZ2UgZHUgYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiQXJyXHUwMEVBdCBkdSBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhZ2UuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJBdXRvLUZhcm0gZXN0IGRcdTAwRTlqXHUwMEUwIGVuIGNvdXJzIGQnZXhcdTAwRTljdXRpb24uXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGVzdCBlbiBjb3VycyBkJ2V4XHUwMEU5Y3V0aW9uLiBGZXJtZXotbGUgYXZhbnQgZGUgZFx1MDBFOW1hcnJlciBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU1x1MDBFOWxlY3Rpb25uZXIgWm9uZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFBlaWduZXogdW4gcGl4ZWwgZGFucyB1bmUgem9uZSBWSURFIGRlIGxhIGNhcnRlIHBvdXIgZFx1MDBFOWZpbmlyIGxhIHpvbmUgZGUgZmFybWluZ1wiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBxdWUgdm91cyBwZWlnbmlleiBsZSBwaXhlbCBkZSByXHUwMEU5Zlx1MDBFOXJlbmNlLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFpvbmUgZFx1MDBFOWZpbmllISBSYXlvbjogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIERcdTAwRTlsYWkgZFx1MDBFOXBhc3NcdTAwRTkgcG91ciBsYSBzXHUwMEU5bGVjdGlvbiBkZSB6b25lXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBkJ2Fib3JkIGVuIHV0aWxpc2FudCAnU1x1MDBFOWxlY3Rpb25uZXIgWm9uZSdcIixcbiAgICBmYXJtUmFkaXVzOiBcIlJheW9uIGZhcm1cIixcbiAgICBwb3NpdGlvbkluZm86IFwiWm9uZSBhY3R1ZWxsZVwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgRmFybWluZyBkYW5zIHVuIHJheW9uIGRlIHtyYWRpdXN9cHggZGVwdWlzICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgSU1QT1JUQU5UOiBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBWSURFIHBvdXIgXHUwMEU5dml0ZXIgbGVzIGNvbmZsaXRzXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJBdWN1bmUgem9uZVwiLFxuICAgIGN1cnJlbnRab25lOiBcIlpvbmU6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgU1x1MDBFOWxlY3Rpb25uZXogdW5lIHpvbmUgZCdhYm9yZC4gUGVpZ25leiB1biBwaXhlbCBzdXIgbGEgY2FydGUgcG91ciBkXHUwMEU5ZmluaXIgbGEgem9uZSBkZSBmYXJtaW5nXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIlRcdTAwRTlsXHUwMEU5Y2hhcmdlciBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkVmZmFjZXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJGZXJtZXJcIlxuICB9LFxuXG4gICAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiT3VpXCIsXG4gICAgbm86IFwiTm9uXCIsXG4gICAgb2s6IFwiT0tcIixcbiAgICBjYW5jZWw6IFwiQW5udWxlclwiLFxuICAgIGNsb3NlOiBcIkZlcm1lclwiLFxuICAgIHNhdmU6IFwiU2F1dmVnYXJkZXJcIixcbiAgICBsb2FkOiBcIkNoYXJnZXJcIixcbiAgICBkZWxldGU6IFwiU3VwcHJpbWVyXCIsXG4gICAgZWRpdDogXCJNb2RpZmllclwiLFxuICAgIHN0YXJ0OiBcIkRcdTAwRTltYXJyZXJcIixcbiAgICBzdG9wOiBcIkFyclx1MDBFQXRlclwiLFxuICAgIHBhdXNlOiBcIlBhdXNlXCIsXG4gICAgcmVzdW1lOiBcIlJlcHJlbmRyZVwiLFxuICAgIHJlc2V0OiBcIlJcdTAwRTlpbml0aWFsaXNlclwiLFxuICAgIHNldHRpbmdzOiBcIlBhcmFtXHUwMEU4dHJlc1wiLFxuICAgIGhlbHA6IFwiQWlkZVwiLFxuICAgIGFib3V0OiBcIlx1MDBDMCBwcm9wb3NcIixcbiAgICBsYW5ndWFnZTogXCJMYW5ndWVcIixcbiAgICBsb2FkaW5nOiBcIkNoYXJnZW1lbnQuLi5cIixcbiAgICBlcnJvcjogXCJFcnJldXJcIixcbiAgICBzdWNjZXNzOiBcIlN1Y2NcdTAwRThzXCIsXG4gICAgd2FybmluZzogXCJBdmVydGlzc2VtZW50XCIsXG4gICAgaW5mbzogXCJJbmZvcm1hdGlvblwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJMYW5ndWUgY2hhbmdcdTAwRTllIGVuIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIEd1YXJkIE1vZHVsZVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBBdXRvLUd1YXJkXCIsXG4gICAgaW5pdEJvdDogXCJJbml0aWFsaXNlciBHdWFyZC1CT1RcIixcbiAgICBzZWxlY3RBcmVhOiBcIlNcdTAwRTlsZWN0aW9ubmVyIFpvbmVcIixcbiAgICBjYXB0dXJlQXJlYTogXCJDYXB0dXJlciBab25lXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIkRcdTAwRTltYXJyZXIgUHJvdGVjdGlvblwiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIkFyclx1MDBFQXRlciBQcm90ZWN0aW9uXCIsXG4gICAgdXBwZXJMZWZ0OiBcIkNvaW4gU3VwXHUwMEU5cmlldXIgR2F1Y2hlXCIsXG4gICAgbG93ZXJSaWdodDogXCJDb2luIEluZlx1MDBFOXJpZXVyIERyb2l0XCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlBpeGVscyBQcm90XHUwMEU5Z1x1MDBFOXNcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiQ2hhbmdlbWVudHMgRFx1MDBFOXRlY3RcdTAwRTlzXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiUGl4ZWxzIFJcdTAwRTlwYXJcdTAwRTlzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiRW4gYXR0ZW50ZSBkJ2luaXRpYWxpc2F0aW9uLi4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFZcdTAwRTlyaWZpY2F0aW9uIGRlcyBjb3VsZXVycyBkaXNwb25pYmxlcy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIEF1Y3VuZSBjb3VsZXVyIHRyb3V2XHUwMEU5ZS4gT3V2cmV6IGxhIHBhbGV0dGUgZGUgY291bGV1cnMgc3VyIGxlIHNpdGUuXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IHtjb3VudH0gY291bGV1cnMgZGlzcG9uaWJsZXMgdHJvdXZcdTAwRTllc1wiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgaW5pdGlhbGlzXHUwMEU5IGF2ZWMgc3VjY1x1MDBFOHNcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGwnaW5pdGlhbGlzYXRpb24gZGUgR3VhcmQtQk9UXCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgQ29vcmRvbm5cdTAwRTllcyBpbnZhbGlkZXNcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgTGEgem9uZSBkb2l0IGF2b2lyIGxlIGNvaW4gc3VwXHUwMEU5cmlldXIgZ2F1Y2hlIGluZlx1MDBFOXJpZXVyIGF1IGNvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXRcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFpvbmUgdHJvcCBncmFuZGU6IHtzaXplfSBwaXhlbHMgKG1heGltdW06IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmUgZGUgbGEgem9uZSBkZSBwcm90ZWN0aW9uLi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBab25lIGNhcHR1clx1MDBFOWU6IHtjb3VudH0gcGl4ZWxzIHNvdXMgcHJvdGVjdGlvblwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgY2FwdHVyZSBkZSB6b25lOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBDYXB0dXJleiBkJ2Fib3JkIHVuZSB6b25lIGRlIHByb3RlY3Rpb25cIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjdGlvbiBkXHUwMEU5bWFyclx1MDBFOWUgLSBzdXJ2ZWlsbGFuY2UgZGUgbGEgem9uZVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWN0aW9uIGFyclx1MDBFQXRcdTAwRTllXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBab25lIHByb3RcdTAwRTlnXHUwMEU5ZSAtIGF1Y3VuIGNoYW5nZW1lbnQgZFx1MDBFOXRlY3RcdTAwRTlcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2hhbmdlbWVudHMgZFx1MDBFOXRlY3RcdTAwRTlzIGRhbnMgbGEgem9uZSBwcm90XHUwMEU5Z1x1MDBFOWVcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFJcdTAwRTlwYXJhdGlvbiBkZSB7Y291bnR9IHBpeGVscyBhbHRcdTAwRTlyXHUwMEU5cy4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUge2NvdW50fSBwaXhlbHMgclx1MDBFOXBhclx1MDBFOXMgYXZlYyBzdWNjXHUwMEU4c1wiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSByXHUwMEU5cGFyYXRpb24gZGVzIHBpeGVsczoge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgQ2hhcmdlcyBpbnN1ZmZpc2FudGVzIHBvdXIgclx1MDBFOXBhcmVyIGxlcyBjaGFuZ2VtZW50c1wiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgVlx1MDBFOXJpZmljYXRpb24gZGVzIGNoYW5nZW1lbnRzIGRhbnMgbGEgem9uZSBwcm90XHUwMEU5Z1x1MDBFOWUuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSB2XHUwMEU5cmlmaWNhdGlvbiBkZXMgY2hhbmdlbWVudHM6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR2FyZGllbiBhY3RpZiAtIHpvbmUgc291cyBwcm90ZWN0aW9uXCIsXG4gICAgbGFzdENoZWNrOiBcIkRlcm5pXHUwMEU4cmUgdlx1MDBFOXJpZmljYXRpb246IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJQcm9jaGFpbmUgdlx1MDBFOXJpZmljYXRpb24gZGFuczoge3RpbWV9c1wiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEluaXRpYWxpc2F0aW9uIGF1dG9tYXRpcXVlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgZFx1MDBFOW1hcnJcdTAwRTkgYXV0b21hdGlxdWVtZW50XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIEltcG9zc2libGUgZGUgZFx1MDBFOW1hcnJlciBhdXRvbWF0aXF1ZW1lbnQuIFV0aWxpc2V6IGxlIGJvdXRvbiBtYW51ZWwuXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbml0aWFsaXNhdGlvbiBtYW51ZWxsZSByZXF1aXNlXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBQYWxldHRlIGRlIGNvdWxldXJzIGRcdTAwRTl0ZWN0XHUwMEU5ZVwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgUmVjaGVyY2hlIGRlIGxhIHBhbGV0dGUgZGUgY291bGV1cnMuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGljIHN1ciBsZSBib3V0b24gUGFpbnQuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBCb3V0b24gUGFpbnQgaW50cm91dmFibGVcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFBlaWduZXogdW4gcGl4ZWwgYXUgY29pbiBTVVBcdTAwQzlSSUVVUiBHQVVDSEUgZGUgbGEgem9uZSBcdTAwRTAgcHJvdFx1MDBFOWdlclwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIE1haW50ZW5hbnQgcGVpZ25leiB1biBwaXhlbCBhdSBjb2luIElORlx1MDBDOVJJRVVSIERST0lUIGRlIGxhIHpvbmVcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIGRlIGxhIHNcdTAwRTlsZWN0aW9uIGR1IGNvaW4gc3VwXHUwMEU5cmlldXIgZ2F1Y2hlLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IEVuIGF0dGVudGUgZGUgbGEgc1x1MDBFOWxlY3Rpb24gZHUgY29pbiBpbmZcdTAwRTlyaWV1ciBkcm9pdC4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBDb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZSBjYXB0dXJcdTAwRTk6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IENvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXQgY2FwdHVyXHUwMEU5OiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkZSBzXHUwMEU5bGVjdGlvbiBkXHUwMEU5cGFzc1x1MDBFOVwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJldXIgZGUgc1x1MDBFOWxlY3Rpb24sIHZldWlsbGV6IHJcdTAwRTllc3NheWVyXCIsXG4gICAgbG9nV2luZG93OiBcIkxvZ3NcIixcbiAgICBsb2dXaW5kb3dUaXRsZTogXCJMb2dzIC0ge2JvdE5hbWV9XCIsXG4gICAgZG93bmxvYWRMb2dzOiBcIlRcdTAwRTlsXHUwMEU5Y2hhcmdlciBMb2dzXCIsXG4gICAgY2xlYXJMb2dzOiBcIkVmZmFjZXIgTG9nc1wiLFxuICAgIGNsb3NlTG9nczogXCJGZXJtZXJcIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCBydSA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDJyxcbiAgICBhdXRvSW1hZ2U6ICdcdUQ4M0NcdURGQTggXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAnLFxuICAgIHNlbGVjdGlvbjogJ1x1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzRScsXG4gICAgdXNlcjogJ1x1MDQxRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0QycsXG4gICAgY2hhcmdlczogJ1x1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RicsXG4gICAgYmFja2VuZDogJ1x1MDQxMVx1MDQ0RFx1MDQzQVx1MDQzNVx1MDQzRFx1MDQzNCcsXG4gICAgZGF0YWJhc2U6ICdcdTA0MTFcdTA0MzBcdTA0MzdcdTA0MzAgXHUwNDM0XHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRCXHUwNDQ1JyxcbiAgICB1cHRpbWU6ICdcdTA0MTJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0NEYgXHUwNDQwXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDRCJyxcbiAgICBjbG9zZTogJ1x1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0QycsXG4gICAgbGF1bmNoOiAnXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDJyxcbiAgICBsb2FkaW5nOiAnXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDMwJyxcbiAgICBleGVjdXRpbmc6ICdcdTA0MTJcdTA0NEJcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUnLFxuICAgIGRvd25sb2FkaW5nOiAnXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzQVx1MDQ0MFx1MDQzOFx1MDQzRlx1MDQ0Mlx1MDQzMC4uLicsXG4gICAgY2hvb3NlQm90OiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMCBcdTA0MzggXHUwNDNEXHUwNDMwXHUwNDM2XHUwNDNDXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QycsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1x1MDQxM1x1MDQzRVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRSBcdTA0M0EgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDQzJyxcbiAgICBsb2FkRXJyb3I6ICdcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDM4JyxcbiAgICBsb2FkRXJyb3JNc2c6ICdcdTA0MURcdTA0MzVcdTA0MzJcdTA0M0VcdTA0MzdcdTA0M0NcdTA0M0VcdTA0MzZcdTA0M0RcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0MzAuIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0Q1x1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0M0VcdTA0MzRcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzVcdTA0NDlcdTA0MzUgXHUwNDQwXHUwNDMwXHUwNDM3LicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwLi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgXHUwNDFFXHUwNDNEXHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IFx1MDQxRVx1MDQ0NFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRCcsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgXHUwNDFFXHUwNDFBJyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAnLFxuICAgIHVua25vd246ICctJyxcbiAgICBsb2dXaW5kb3c6ICdMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOCAtIHtib3ROYW1lfScsXG4gICAgZG93bmxvYWRMb2dzOiAnXHUwNDIxXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOCcsXG4gICAgY2xlYXJMb2dzOiAnXHUwNDFFXHUwNDQ3XHUwNDM4XHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOCcsXG4gICAgY2xvc2VMb2dzOiAnXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDJ1xuICB9LFxuXG4gIC8vIEltYWdlIE1vZHVsZVxuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgaW5pdEJvdDogXCJcdTA0MThcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQ0MCBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEZcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNDXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDNFIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMFwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0b3BQYWludGluZzogXCJcdTA0MUVcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0Mlx1MDQzQVx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0NDMgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyIFx1MDQzRFx1MDQzMCBcdTA0NDFcdTA0MzBcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDM4IFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0NDFcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzAhXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1MDQxRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzRSB7Y291bnR9IFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIFx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMCBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0NDEge2NvdW50fSBcdTA0MzRcdTA0MzVcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzJcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0NEJcdTA0M0NcdTA0MzggXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRGXHUwNDNDXHUwNDM4XCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzOCBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEZcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzMiBcdTA0NDJcdTA0M0VcdTA0M0MgXHUwNDNDXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDM1LCBcdTA0MzNcdTA0MzRcdTA0MzUgXHUwNDMyXHUwNDRCIFx1MDQ0NVx1MDQzRVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQzNSwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzRFx1MDQzRVx1MDQzQSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzhcdTA0M0RcdTA0MzBcdTA0M0JcdTA0NDFcdTA0NEYhXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0Ri4uLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHUwNDFGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzMCBcdTA0NDNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UhXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTA0MjJcdTA0MzBcdTA0MzlcdTA0M0NcdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzOFwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFx1MDQxRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzAsIFx1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDM4LCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDM1XHUwNDQ5XHUwNDM1IFx1MDQ0MFx1MDQzMFx1MDQzN1wiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IFx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzRSBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDE6IHtwYWludGVkfSBcdTA0MzhcdTA0Mzcge3RvdGFsfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIFx1MDQxRFx1MDQzNVx1MDQ0MiBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzIuIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1MDQyMFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDNDXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgXHUwNDIwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzRSEge2NvdW50fSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNFLlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ2XHUwNDM1XHUwNDQxXHUwNDQxXHUwNDM1IFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIFx1MDQyMVx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQzMlx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOCBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNDXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDNFIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMFwiLFxuICAgIHByb2dyZXNzOiBcIlx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIHVzZXJOYW1lOiBcIlx1MDQxRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1wiLFxuICAgIHBpeGVsczogXCJcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzhcIixcbiAgICBjaGFyZ2VzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiXHUwNDFGXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNFXHUwNDM2XHUwNDM4XHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFXHUwNDM1IFx1MDQzMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQ0RlwiLFxuICAgIGluaXRNZXNzYWdlOiBcIlx1MDQxRFx1MDQzMFx1MDQzNlx1MDQzQ1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTAwQUJcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMgQXV0by1CT1RcdTAwQkIsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4Li4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0MzRcdTA0M0Uge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBcdTA0MjBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzRFx1MDQzMCBcdTA0M0ZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzggWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDMyIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzNVwiLFxuICAgIGJhdGNoU2l6ZTogXCJcdTA0MjBcdTA0MzBcdTA0MzdcdTA0M0NcdTA0MzVcdTA0NDAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XHUwNDMwXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJcdTA0MjFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0NDNcdTA0NEVcdTA0NDlcdTA0MzhcdTA0MzkgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0IFx1MDQ0N1x1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzN1wiLFxuICAgIHVzZUFsbENoYXJnZXM6IFwiXHUwNDE4XHUwNDQxXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQ0MVx1MDQzNSBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgc2hvd092ZXJsYXk6IFwiXHUwNDFGXHUwNDNFXHUwNDNBXHUwNDMwXHUwNDM3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzRFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIG1heENoYXJnZXM6IFwiXHUwNDFDXHUwNDMwXHUwNDNBXHUwNDQxXHUwNDM4XHUwNDNDXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFXHUwNDM1IFx1MDQzQVx1MDQzRVx1MDQzQi1cdTA0MzJcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyIFx1MDQzN1x1MDQzMCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMjoge2N1cnJlbnR9IFx1MDQzOFx1MDQzNyB7bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiXHUwNDEyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4IFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0Q1wiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IHt0aW1lfSBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzRCBcdTA0M0FcdTA0MzBcdTA0M0Ege2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEOiB7cGFpbnRlZH0gXHUwNDM4XHUwNDM3IHt0b3RhbH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRVwiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDM4IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVx1MDQzMDoge2Vycm9yfVwiLFxuXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXHUwNDMwOiB7ZXJyb3J9XCIsXG5cbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDJcdTA0MzVcdTA0M0FcdTA0NDNcdTA0NDlcdTA0MzhcdTA0MzkgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNCBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0FcdTA0M0VcdTA0Mzk/XCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTA0MURcdTA0MzUgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDRGXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGNhbmNlbDogXCJcdTA0MUVcdTA0NDJcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBtaW5pbWl6ZTogXCJcdTA0MjFcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0RcdTA0NDNcdTA0NDJcdTA0NENcIixcbiAgICB3aWR0aDogXCJcdTA0MjhcdTA0MzhcdTA0NDBcdTA0MzhcdTA0M0RcdTA0MzBcIixcbiAgICBoZWlnaHQ6IFwiXHUwNDEyXHUwNDRCXHUwNDQxXHUwNDNFXHUwNDQyXHUwNDMwXCIsXG4gICAga2VlcEFzcGVjdDogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQxXHUwNDNFXHUwNDNFXHUwNDQyXHUwNDNEXHUwNDNFXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRVx1MDQzRFwiLFxuICAgIGFwcGx5OiBcIlx1MDQxRlx1MDQ0MFx1MDQzOFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIG92ZXJsYXlPbjogXCJcdTA0MURcdTA0MzBcdTA0M0JcdTA0M0VcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzU6IFx1MDQxMlx1MDQxQVx1MDQxQlwiLFxuICAgIG92ZXJsYXlPZmY6IFwiXHUwNDFEXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1OiBcdTA0MTJcdTA0MkJcdTA0MUFcdTA0MUJcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0NDZcdTA0MzVcdTA0NDFcdTA0NDEgXHUwNDM3XHUwNDMwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ4XHUwNDM1XHUwNDNEOiB7cGFpbnRlZH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRSB8IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MToge3BlcmNlbnR9JSAoe2N1cnJlbnR9IFx1MDQzOFx1MDQzNyB7dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDMwOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9IC0gXHUwNDEyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMjoge2N1cnJlbnR9IFx1MDQzOFx1MDQzNyB7bmVlZGVkfSAtIFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0Rjoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDMwXHUwNDRGIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHUwNDExXHUwNDNFXHUwNDQyIFx1MDQ0M1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0JcdTA0NDFcdTA0NEYgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDMyXHUwNDRCXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQS4gXHUwNDE4XHUwNDQxXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQ0MyBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDMwLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHUwNDI2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQzRVx1MDQzOFx1MDQ0MVx1MDQzQSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzkgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDRCLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHUwNDFEXHUwNDMwXHUwNDM2XHUwNDMwXHUwNDQyXHUwNDM4XHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzOCBcdTAwQUJQYWludFx1MDBCQi4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1MDQxQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzMCBcdTAwQUJQYWludFx1MDBCQiBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTA0MjJcdTA0NDBcdTA0MzVcdTA0MzFcdTA0NDNcdTA0MzVcdTA0NDJcdTA0NDFcdTA0NEYgXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzMCB7YXR0ZW1wdH0gXHUwNDM4XHUwNDM3IHttYXhBdHRlbXB0c30gXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3IHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzUge2F0dGVtcHR9IFx1MDQzOFx1MDQzNyB7bWF4QXR0ZW1wdHN9LCBcdTA0M0ZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQ3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM3IHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0NDFcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0NEYge21heEF0dGVtcHRzfSBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0VcdTA0M0EuIFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzIgXHUwNDQxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDM1XHUwNDNDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzNS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzNVx1MDQ0Mlx1MDQzOC4gXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDM1XHUwNDQwXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDMwLiBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBcdTA0MjJcdTA0MzBcdTA0MzlcdTA0M0MtXHUwNDMwXHUwNDQzXHUwNDQyIFx1MDQ0MVx1MDQzNVx1MDQ0MFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzMCwgXHUwNDNGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIC8vIHYyLjAgLSBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDM4IFx1MDQ0OFx1MDQzMFx1MDQzMVx1MDQzQlx1MDQzRVx1MDQzRFx1MDQ0QlxuICAgIHByb3RlY3Rpb25FbmFibGVkOiBcIlx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCBcdTA0MzJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBwcm90ZWN0aW9uRGlzYWJsZWQ6IFwiXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHBhaW50UGF0dGVybjogXCJcdTA0MjhcdTA0MzBcdTA0MzFcdTA0M0JcdTA0M0VcdTA0M0QgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgcGF0dGVybkxpbmVhclN0YXJ0OiBcIlx1MDQxQlx1MDQzOFx1MDQzRFx1MDQzNVx1MDQzOVx1MDQzRFx1MDQ0Qlx1MDQzOSAoXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDNFKVwiLFxuICAgIHBhdHRlcm5MaW5lYXJFbmQ6IFwiXHUwNDFCXHUwNDM4XHUwNDNEXHUwNDM1XHUwNDM5XHUwNDNEXHUwNDRCXHUwNDM5IChcdTA0M0FcdTA0M0VcdTA0M0RcdTA0MzVcdTA0NDYpXCIsXG4gICAgcGF0dGVyblJhbmRvbTogXCJcdTA0MjFcdTA0M0JcdTA0NDNcdTA0NDdcdTA0MzBcdTA0MzlcdTA0M0RcdTA0NEJcdTA0MzlcIixcbiAgICBwYXR0ZXJuQ2VudGVyT3V0OiBcIlx1MDQxOFx1MDQzNyBcdTA0NDZcdTA0MzVcdTA0M0RcdTA0NDJcdTA0NDBcdTA0MzAgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDQzXCIsXG4gICAgcGF0dGVybkNvcm5lcnNGaXJzdDogXCJcdTA0MjFcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzAgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDRCXCIsXG4gICAgcGF0dGVyblNwaXJhbDogXCJcdTA0MjFcdTA0M0ZcdTA0MzhcdTA0NDBcdTA0MzBcdTA0M0JcdTA0NENcIixcbiAgICBzb2xpZDogXCJcdTA0MjFcdTA0M0ZcdTA0M0JcdTA0M0VcdTA0NDhcdTA0M0RcdTA0M0VcdTA0MzlcIixcbiAgICBzdHJpcGVzOiBcIlx1MDQxRlx1MDQzRVx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QlwiLFxuICAgIGNoZWNrZXJib2FyZDogXCJcdTA0MjhcdTA0MzBcdTA0NDVcdTA0M0NcdTA0MzBcdTA0NDJcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDNBXHUwNDMwXCIsXG4gICAgZ3JhZGllbnQ6IFwiXHUwNDEzXHUwNDQwXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDM1XHUwNDNEXHUwNDQyXCIsXG4gICAgZG90czogXCJcdTA0MjJcdTA0M0VcdTA0NDdcdTA0M0FcdTA0MzhcIixcbiAgICB3YXZlczogXCJcdTA0MTJcdTA0M0VcdTA0M0JcdTA0M0RcdTA0NEJcIixcbiAgICBzcGlyYWw6IFwiXHUwNDIxXHUwNDNGXHUwNDM4XHUwNDQwXHUwNDMwXHUwNDNCXHUwNDRDXCIsXG4gICAgbW9zYWljOiBcIlx1MDQxQ1x1MDQzRVx1MDQzN1x1MDQzMFx1MDQzOFx1MDQzQVx1MDQzMFwiLFxuICAgIGJyaWNrczogXCJcdTA0MUFcdTA0MzhcdTA0NDBcdTA0M0ZcdTA0MzhcdTA0NDdcdTA0MzhcIixcbiAgICB6aWd6YWc6IFwiXHUwNDE3XHUwNDM4XHUwNDMzXHUwNDM3XHUwNDMwXHUwNDMzXCIsXG4gICAgcHJvdGVjdGluZ0RyYXdpbmc6IFwiXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzRFx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTggXHUwNDFFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOToge2NvdW50fVwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdUREMjcgXHUwNDEyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IHtjb3VudH0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDUxXHUwNDNEXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOS4uLlwiLFxuICAgIHJlcGFpckNvbXBsZXRlZDogXCJcdTI3MDUgXHUwNDEyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzRToge2NvdW50fSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzlcIixcbiAgICBub0NoYXJnZXNGb3JSZXBhaXI6IFwiXHUyNkExIFx1MDQxQVx1MDQzRVx1MDQzQ1x1MDQzOFx1MDQ0MVx1MDQ0MVx1MDQzOFx1MDQzOSBcdTA0MzdcdTA0MzAgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRFx1MDQzNVx1MDQ0MiwgXHUwNDNFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1Li4uXCIsXG4gICAgcHJvdGVjdGlvblByaW9yaXR5OiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTA0MUZcdTA0NDBcdTA0MzhcdTA0M0VcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzVcdTA0NDIgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDRCIFx1MDQzMFx1MDQzQVx1MDQ0Mlx1MDQzOFx1MDQzMlx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFwiLFxuICAgIHBhdHRlcm5BcHBsaWVkOiBcIlx1MDQyOFx1MDQzMFx1MDQzMVx1MDQzQlx1MDQzRVx1MDQzRCBcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NTFcdTA0M0RcIixcbiAgICBjdXN0b21QYXR0ZXJuOiBcIlx1MDQxRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQ0MVx1MDQzQVx1MDQzOFx1MDQzOSBcdTA0NDhcdTA0MzBcdTA0MzFcdTA0M0JcdTA0M0VcdTA0M0RcIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIlx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOCAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJcdTA0MjFcdTA0M0FcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4XCIsXG4gICAgY2xlYXJMb2dzOiBcIlx1MDQxRVx1MDQ0N1x1MDQzOFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzhcIixcbiAgICBjbG9zZUxvZ3M6IFwiXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDXCJcbiAgfSxcblxuICAvLyBGYXJtIE1vZHVsZSAodG8gYmUgaW1wbGVtZW50ZWQpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQ1wiLFxuICAgIHN0YXJ0OiBcIlx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0b3A6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcHBlZDogXCJcdTA0MTFcdTA0M0VcdTA0NDIgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXCIsXG4gICAgY2FsaWJyYXRlOiBcIlx1MDQxQVx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHBhaW50T25jZTogXCJcdTA0MTVcdTA0MzRcdTA0MzhcdTA0M0RcdTA0M0VcdTA0NDBcdTA0MzBcdTA0MzdcdTA0M0VcdTA0MzJcdTA0M0VcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDQzXHUwNDQxXHUwNDMwLi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBkZWxheTogXCJcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzAgKFx1MDQzQ1x1MDQ0MSlcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTA0MUZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDM3XHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiXHUwNDFDXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDNDXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFXHUwNDM1IFx1MDQzQVx1MDQzRVx1MDQzQi1cdTA0MzJcdTA0M0VcIixcbiAgICBjb2xvck1vZGU6IFwiXHUwNDIwXHUwNDM1XHUwNDM2XHUwNDM4XHUwNDNDIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlwiLFxuICAgIHJhbmRvbTogXCJcdTA0MjFcdTA0M0JcdTA0NDNcdTA0NDdcdTA0MzBcdTA0MzlcdTA0M0RcdTA0NEJcdTA0MzlcIixcbiAgICBmaXhlZDogXCJcdTA0MjRcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzlcIixcbiAgICByYW5nZTogXCJcdTA0MTRcdTA0MzhcdTA0MzBcdTA0M0ZcdTA0MzBcdTA0MzdcdTA0M0VcdTA0M0RcIixcbiAgICBmaXhlZENvbG9yOiBcIlx1MDQyNFx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcIixcbiAgICBhZHZhbmNlZDogXCJcdTA0MjBcdTA0MzBcdTA0NDFcdTA0NDhcdTA0MzhcdTA0NDBcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzVcIixcbiAgICB0aWxlWDogXCJcdTA0MUZcdTA0M0JcdTA0MzhcdTA0NDJcdTA0M0FcdTA0MzAgWFwiLFxuICAgIHRpbGVZOiBcIlx1MDQxRlx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQzQVx1MDQzMCBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTA0MjFcdTA0MzJcdTA0M0VcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXCIsXG4gICAgcGFpbnRlZDogXCJcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0MzBcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0VcIixcbiAgICBjaGFyZ2VzOiBcIlx1MDQxN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHJldHJpZXM6IFwiXHUwNDFGXHUwNDNFXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzOFwiLFxuICAgIHRpbGU6IFwiXHUwNDFGXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDNBXHUwNDMwXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiXHUwNDFBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGIFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiXHUwNDIxXHUwNDMxXHUwNDQwXHUwNDNFXHUwNDQxIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOFwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzJcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0NDNcdTA0NEUgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzMCBcdTA0M0FcdTA0M0VcdTA0M0VcdTA0NDBcdTA0MzRcdTA0MzhcdTA0M0RcdTA0MzBcdTA0NDIuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIlx1MDQxMVx1MDQ0RFx1MDQzQVx1MDQ0RFx1MDQzRFx1MDQzNCBcdTA0MUVcdTA0M0RcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0RcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJcdTA0MTFcdTA0NERcdTA0M0FcdTA0NERcdTA0M0RcdTA0MzQgXHUwNDFFXHUwNDQ0XHUwNDNCXHUwNDMwXHUwNDM5XHUwNDNEXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBIFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMC4uLlwiLFxuXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDMwIFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMC4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIlx1MDQxQVx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzQVx1MDQzMC4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIlx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0MgXHUwNDQzXHUwNDM2XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0UuIFx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzRVx1MDQzQyBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwLlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDMyIFx1MDQxRlx1MDQyM1x1MDQyMVx1MDQyMlx1MDQxRVx1MDQxOSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDNBXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDRCLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNFXHUwNDMxXHUwNDNFXHUwNDM3XHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzAuXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0Ri4uLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzMCEgXHUwNDIwXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDQzXHUwNDQxOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDXHUwNDMwXHUwNDQzXHUwNDQyIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQxIFx1MDQzRlx1MDQzRVx1MDQzQ1x1MDQzRVx1MDQ0OVx1MDQ0Q1x1MDQ0RSBcdTAwQUJcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDXHUwMEJCXCIsXG4gICAgZmFybVJhZGl1czogXCJcdTA0MjBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDEgXHUwNDQ0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1MDQyMlx1MDQzNVx1MDQzQVx1MDQ0M1x1MDQ0OVx1MDQzMFx1MDQ0RiBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIFx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQyBcdTA0MzIgXHUwNDQwXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDQzXHUwNDQxXHUwNDM1IHtyYWRpdXN9cHggXHUwNDNFXHUwNDQyICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgXHUwNDEyXHUwNDEwXHUwNDE2XHUwNDFEXHUwNDFFOiBcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDFGXHUwNDIzXHUwNDIxXHUwNDIyXHUwNDIzXHUwNDJFIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QywgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzOFx1MDQzN1x1MDQzMVx1MDQzNVx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDRcdTA0M0JcdTA0MzhcdTA0M0FcdTA0NDJcdTA0M0VcdTA0MzIuXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTA0MURcdTA0MzVcdTA0NDIgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgY3VycmVudFpvbmU6IFwiXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFx1MDQyMVx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMCBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDLiBcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzRFx1MDQzMCBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0MzUsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0M0VcdTA0MzFcdTA0M0VcdTA0MzdcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0NFx1MDQzMFx1MDQ0MFx1MDQzQ1x1MDQzMC5cIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIlx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOCAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJcdTA0MjFcdTA0M0FcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4XCIsXG4gICAgY2xlYXJMb2dzOiBcIlx1MDQxRVx1MDQ0N1x1MDQzOFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzhcIixcbiAgICBjbG9zZUxvZ3M6IFwiXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDXCJcbiAgfSxcblxuICAvLyBDb21tb24vU2hhcmVkXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJcdTA0MTRcdTA0MzBcIixcbiAgICBubzogXCJcdTA0MURcdTA0MzVcdTA0NDJcIixcbiAgICBvazogXCJcdTA0MUVcdTA0MUFcIixcbiAgICBjYW5jZWw6IFwiXHUwNDFFXHUwNDQyXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgY2xvc2U6IFwiXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDXCIsXG4gICAgc2F2ZTogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBsb2FkOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGRlbGV0ZTogXCJcdTA0MjNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBlZGl0OiBcIlx1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0YXJ0OiBcIlx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0b3A6IFwiXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgcGF1c2U6IFwiXHUwNDFGXHUwNDQwXHUwNDM4XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgcmVzdW1lOiBcIlx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHJlc2V0OiBcIlx1MDQyMVx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQ0MVx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHNldHRpbmdzOiBcIlx1MDQxRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQzQVx1MDQzOFwiLFxuICAgIGhlbHA6IFwiXHUwNDFGXHUwNDNFXHUwNDNDXHUwNDNFXHUwNDQ5XHUwNDRDXCIsXG4gICAgYWJvdXQ6IFwiXHUwNDE4XHUwNDNEXHUwNDQ0XHUwNDNFXHUwNDQwXHUwNDNDXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgbGFuZ3VhZ2U6IFwiXHUwNDJGXHUwNDM3XHUwNDRCXHUwNDNBXCIsXG4gICAgbG9hZGluZzogXCJcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAuLi5cIixcbiAgICBlcnJvcjogXCJcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzBcIixcbiAgICBzdWNjZXNzOiBcIlx1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0NVwiLFxuICAgIHdhcm5pbmc6IFwiXHUwNDFGXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDNGXHUwNDQwXHUwNDM1XHUwNDM2XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1XCIsXG4gICAgaW5mbzogXCJcdTA0MThcdTA0M0RcdTA0NDRcdTA0M0VcdTA0NDBcdTA0M0NcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiXHUwNDJGXHUwNDM3XHUwNDRCXHUwNDNBIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRCBcdTA0M0RcdTA0MzAge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gR3VhcmQgTW9kdWxlXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzBcIixcbiAgICBpbml0Qm90OiBcIlx1MDQxOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBHdWFyZC1CT1RcIixcbiAgICBzZWxlY3RBcmVhOiBcIlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcIixcbiAgICBjYXB0dXJlQXJlYTogXCJcdTA0MTdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIlx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NDNcIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJcdTA0MUVcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDQzXCIsXG4gICAgdXBwZXJMZWZ0OiBcIlx1MDQxMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0MUJcdTA0MzVcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDIzXHUwNDMzXHUwNDNFXHUwNDNCXCIsXG4gICAgbG93ZXJSaWdodDogXCJcdTA0MURcdTA0MzhcdTA0MzZcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDFGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQyM1x1MDQzM1x1MDQzRVx1MDQzQlwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM4XCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIlx1MDQxRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEZcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJcdTA0MTJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM4XCIsXG4gICAgY2hhcmdlczogXCJcdTA0MTdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0NEJcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4Li4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHUwNDI2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDMwIFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0NEIuIFx1MDQxRVx1MDQ0Mlx1MDQzQVx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0NDMgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyIFx1MDQzRFx1MDQzMCBcdTA0NDFcdTA0MzBcdTA0MzlcdTA0NDJcdTA0MzUuXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1MDQxRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzRSB7Y291bnR9IFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIFx1MDQ0M1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzggR3VhcmQtQk9UXCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgXHUwNDFEXHUwNDM1XHUwNDM0XHUwNDM1XHUwNDM5XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzQVx1MDQzRVx1MDQzRVx1MDQ0MFx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzMFx1MDQ0Mlx1MDQ0QlwiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDNEXHUwNDMwIFx1MDQzOFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDNCXHUwNDM1XHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQ0M1x1MDQzM1x1MDQzRVx1MDQzQiBcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NENcdTA0NDhcdTA0MzUgXHUwNDNEXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDM1XHUwNDMzXHUwNDNFIFx1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0MzBcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDFcdTA0M0JcdTA0MzhcdTA0NDhcdTA0M0FcdTA0M0VcdTA0M0MgXHUwNDMxXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDQ4XHUwNDMwXHUwNDRGOiB7c2l6ZX0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IChcdTA0M0NcdTA0MzBcdTA0M0FcdTA0NDFcdTA0MzhcdTA0M0NcdTA0NDNcdTA0M0M6IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IFx1MDQxN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0MiBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDRCLi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDMwOiB7Y291bnR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0M0ZcdTA0M0VcdTA0MzQgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDNFXHUwNDM5XCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzODoge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgXHUwNDIxXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDRCXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDlcdTA0MzVcdTA0M0RcdTA0MzAgLSBcdTA0M0NcdTA0M0VcdTA0M0RcdTA0MzhcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzhcdTA0M0RcdTA0MzMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzMCBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgLSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDNEXHUwNDM1IFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzRVwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzMiBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzkgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBcdTA0MTJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUge2NvdW50fSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5Li4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFIHtjb3VudH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5XCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5OiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBcdTA0MURcdTA0MzVcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0M0VcdTA0NDdcdTA0M0RcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzJcdTA0M0VcdTA0NDFcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5XCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzMiBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzkgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4Li4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzOCBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0Mzk6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHUwNDIxXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDM2IFx1MDQzMFx1MDQzQVx1MDQ0Mlx1MDQzOFx1MDQzMlx1MDQzNVx1MDQzRCAtIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0M0VcdTA0MzQgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDNFXHUwNDM5XCIsXG4gICAgbGFzdENoZWNrOiBcIlx1MDQxRlx1MDQzRVx1MDQ0MVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQzRFx1MDQ0Rlx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzA6IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJcdTA0MjFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0NDNcdTA0NEVcdTA0NDlcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQ0N1x1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNzoge3RpbWV9XHUwNDQxXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDMwXHUwNDRGIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRCBcdTA0MzBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzhcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHUwNDFEXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QyBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4LiBcdTA0MThcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDQzIFx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0MzAuXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTA0MjJcdTA0NDBcdTA0MzVcdTA0MzFcdTA0NDNcdTA0MzVcdTA0NDJcdTA0NDFcdTA0NEYgXHUwNDQwXHUwNDQzXHUwNDQ3XHUwNDNEXHUwNDMwXHUwNDRGIFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHUwNDI2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1MDQxRlx1MDQzRVx1MDQzOFx1MDQ0MVx1MDQzQSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzkgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDRCLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHUwNDFEXHUwNDMwXHUwNDM2XHUwNDMwXHUwNDQyXHUwNDM4XHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzOCBcdTAwQUJQYWludFx1MDBCQi4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1MDQxQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQzMCBcdTAwQUJQYWludFx1MDBCQiBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzMiBcdTA0MTJcdTA0MTVcdTA0MjBcdTA0MjVcdTA0MURcdTA0MTVcdTA0MUMgXHUwNDFCXHUwNDE1XHUwNDEyXHUwNDFFXHUwNDFDIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQ0MyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0QlwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIFx1MDQyMlx1MDQzNVx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQ0QyBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzMiBcdTA0MURcdTA0MThcdTA0MTZcdTA0MURcdTA0MTVcdTA0MUMgXHUwNDFGXHUwNDIwXHUwNDEwXHUwNDEyXHUwNDFFXHUwNDFDIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQ0MyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0JcdTA0MzVcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDMwLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzAgXHUwNDNEXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDM1XHUwNDMzXHUwNDNFIFx1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0MzAuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgXHUwNDEyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzQlx1MDQzNVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0NDNcdTA0MzNcdTA0M0VcdTA0M0IgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDNEOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBcdTA0MURcdTA0MzhcdTA0MzZcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQ0M1x1MDQzM1x1MDQzRVx1MDQzQiBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDdcdTA0MzVcdTA0M0Q6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTA0MjJcdTA0MzBcdTA0MzlcdTA0M0MtXHUwNDMwXHUwNDQzXHUwNDQyIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMFwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwLCBcdTA0M0ZcdTA0M0VcdTA0MzZcdTA0MzBcdTA0M0JcdTA0NDNcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzAsIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0NDFcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzBcIixcbiAgICBsb2dXaW5kb3c6IFwiTG9nc1wiLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiBcIlx1MDQxQlx1MDQzRVx1MDQzM1x1MDQzOCAtIHtib3ROYW1lfVwiLFxuICAgIGRvd25sb2FkTG9nczogXCJcdTA0MjFcdTA0M0FcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDFCXHUwNDNFXHUwNDMzXHUwNDM4XCIsXG4gICAgY2xlYXJMb2dzOiBcIlx1MDQxRVx1MDQ0N1x1MDQzOFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MUJcdTA0M0VcdTA0MzNcdTA0MzhcIixcbiAgICBjbG9zZUxvZ3M6IFwiXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgemhIYW5zID0ge1xuICAvLyBcdTU0MkZcdTUyQThcdTU2NjhcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBcdTgxRUFcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkEnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIFx1ODFFQVx1NTJBOFx1NTE5Q1x1NTczQScsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IFx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIFx1ODFFQVx1NTJBOFx1NUI4OFx1NjJBNCcsXG4gICAgc2VsZWN0aW9uOiAnXHU5MDA5XHU2MkU5JyxcbiAgICB1c2VyOiAnXHU3NTI4XHU2MjM3JyxcbiAgICBjaGFyZ2VzOiAnXHU2QjIxXHU2NTcwJyxcbiAgICBiYWNrZW5kOiAnXHU1NDBFXHU3QUVGJyxcbiAgICBkYXRhYmFzZTogJ1x1NjU3MFx1NjM2RVx1NUU5MycsXG4gICAgdXB0aW1lOiAnXHU4RkQwXHU4ODRDXHU2NUY2XHU5NUY0JyxcbiAgICBjbG9zZTogJ1x1NTE3M1x1OTVFRCcsXG4gICAgbGF1bmNoOiAnXHU1NDJGXHU1MkE4JyxcbiAgICBsb2FkaW5nOiAnXHU1MkEwXHU4RjdEXHU0RTJEXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnXHU2QjYzXHU1NzI4XHU0RTBCXHU4RjdEXHU4MTFBXHU2NzJDXHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdcdTkwMDlcdTYyRTlcdTRFMDBcdTRFMkFcdTY3M0FcdTU2NjhcdTRFQkFcdTVFNzZcdTcwQjlcdTUxRkJcdTU0MkZcdTUyQTgnLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdcdTUxQzZcdTU5MDdcdTU0MkZcdTUyQTgnLFxuICAgIGxvYWRFcnJvcjogJ1x1NTJBMFx1OEY3RFx1OTUxOVx1OEJFRicsXG4gICAgbG9hZEVycm9yTXNnOiAnXHU2NUUwXHU2Q0Q1XHU1MkEwXHU4RjdEXHU2MjQwXHU5MDA5XHU2NzNBXHU1NjY4XHU0RUJBXHUzMDAyXHU4QkY3XHU2OEMwXHU2N0U1XHU3RjUxXHU3RURDXHU4RkRFXHU2M0E1XHU2MjE2XHU5MUNEXHU4QkQ1XHUzMDAyJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBcdTY4QzBcdTY3RTVcdTRFMkQuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBcdTU3MjhcdTdFQkYnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgXHU3OUJCXHU3RUJGJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBcdTZCNjNcdTVFMzgnLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IFx1OTUxOVx1OEJFRicsXG4gICAgdW5rbm93bjogJy0nLFxuICAgIGxvZ1dpbmRvdzogJ1x1RDgzRFx1RENDQiBMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1NjVFNVx1NUZEN1x1N0E5N1x1NTNFMycsXG4gICAgZG93bmxvYWRMb2dzOiAnXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3JyxcbiAgICBjbGVhckxvZ3M6ICdcdTZFMDVcdTk2NjRcdTY1RTVcdTVGRDcnLFxuICAgIGNsb3NlTG9nczogJ1x1NTE3M1x1OTVFRCdcbiAgfSxcblxuICAvLyBcdTdFRDhcdTU2RkVcdTZBMjFcdTU3NTdcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4MUVBXHU1MkE4XHU3RUQ4XHU1NkZFXCIsXG4gICAgaW5pdEJvdDogXCJcdTUyMURcdTU5Q0JcdTUzMTZcdTgxRUFcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkFcIixcbiAgICB1cGxvYWRJbWFnZTogXCJcdTRFMEFcdTRGMjBcdTU2RkVcdTcyNDdcIixcbiAgICByZXNpemVJbWFnZTogXCJcdThDMDNcdTY1NzRcdTU2RkVcdTcyNDdcdTU5MjdcdTVDMEZcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwMDlcdTYyRTlcdTRGNERcdTdGNkVcIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlx1NUYwMFx1NTlDQlx1N0VEOFx1NTIzNlwiLFxuICAgIHN0b3BQYWludGluZzogXCJcdTUwNUNcdTZCNjJcdTdFRDhcdTUyMzZcIixcbiAgICBzYXZlUHJvZ3Jlc3M6IFwiXHU0RkREXHU1QjU4XHU4RkRCXHU1RUE2XCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIlx1NTJBMFx1OEY3RFx1OEZEQlx1NUVBNlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBcdTY4QzBcdTY3RTVcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdThCRjdcdTU3MjhcdTdGNTFcdTdBRDlcdTRFMEFcdTYyNTNcdTVGMDBcdThDMDNcdTgyNzJcdTY3N0ZcdTU0MEVcdTkxQ0RcdThCRDVcdUZGMDFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3OUNEXHU1M0VGXHU3NTI4XHU5ODlDXHU4MjcyXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBcdTZCNjNcdTU3MjhcdTUyQTBcdThGN0RcdTU2RkVcdTcyNDcuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgXHU1NkZFXHU3MjQ3XHU1REYyXHU1MkEwXHU4RjdEXHVGRjBDXHU2NzA5XHU2NTQ4XHU1MENGXHU3RDIwIHtjb3VudH0gXHU0RTJBXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgXHU1NkZFXHU3MjQ3XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdThCRjdcdTU3MjhcdTRGNjBcdTYwRjNcdTVGMDBcdTU5Q0JcdTdFRDhcdTUyMzZcdTc2ODRcdTU3MzBcdTY1QjlcdTZEODJcdTdCMkNcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcdUZGMDFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NkQ4Mlx1NTNDMlx1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTRGNERcdTdGNkVcdThCQkVcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1NEY0RFx1N0Y2RVx1OTAwOVx1NjJFOVx1OEQ4NVx1NjVGNlwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFx1NURGMlx1NjhDMFx1NkQ0Qlx1NTIzMFx1NEY0RFx1N0Y2RVx1RkYwQ1x1NTkwNFx1NzQwNlx1NEUyRC4uLlwiLFxuICAgIHBvc2l0aW9uRXJyb3I6IFwiXHUyNzRDIFx1NEY0RFx1N0Y2RVx1NjhDMFx1NkQ0Qlx1NTkzMVx1OEQyNVx1RkYwQ1x1OEJGN1x1OTFDRFx1OEJENVwiLFxuICAgIHN0YXJ0UGFpbnRpbmdNc2c6IFwiXHVEODNDXHVERkE4IFx1NUYwMFx1NTlDQlx1N0VEOFx1NTIzNi4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFx1OEZEQlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBcdTZDQTFcdTY3MDlcdTZCMjFcdTY1NzBcdTMwMDJcdTdCNDlcdTVGODUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTc1MjhcdTYyMzdcdTVERjJcdTUwNUNcdTZCNjJcdTdFRDhcdTUyMzZcIixcbiAgICBwYWludGluZ0NvbXBsZXRlOiBcIlx1MjcwNSBcdTdFRDhcdTUyMzZcdTVCOENcdTYyMTBcdUZGMDFcdTUxNzFcdTdFRDhcdTUyMzYge2NvdW50fSBcdTRFMkFcdTUwQ0ZcdTdEMjBcdTMwMDJcIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBcdTdFRDhcdTUyMzZcdThGQzdcdTdBMEJcdTRFMkRcdTUxRkFcdTk1MTlcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBcdThCRjdcdTUxNDhcdTUyQTBcdThGN0RcdTU2RkVcdTcyNDdcdTVFNzZcdTkwMDlcdTYyRTlcdTRGNERcdTdGNkVcIixcbiAgICBwcm9ncmVzczogXCJcdThGREJcdTVFQTZcIixcbiAgICB1c2VyTmFtZTogXCJcdTc1MjhcdTYyMzdcIixcbiAgICBwaXhlbHM6IFwiXHU1MENGXHU3RDIwXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzBcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlx1OTg4NFx1OEJBMVx1NjVGNlx1OTVGNFwiLFxuICAgIGluaXRNZXNzYWdlOiBcIlx1NzBCOVx1NTFGQlx1MjAxQ1x1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJBOFx1NjczQVx1NTY2OFx1NEVCQVx1MjAxRFx1NUYwMFx1NTlDQlwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IFx1NTZGRVx1NzI0N1x1NURGMlx1OEMwM1x1NjU3NFx1NEUzQSB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFx1N0VEOFx1NTIzNlx1NjY4Mlx1NTA1Q1x1NEU4RVx1NEY0RFx1N0Y2RSBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1NkJDRlx1NjI3OVx1NTBDRlx1N0QyMFx1NjU3MFwiLFxuICAgIGJhdGNoU2l6ZTogXCJcdTYyNzlcdTZCMjFcdTU5MjdcdTVDMEZcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIlx1NEUwQlx1NkIyMVx1NjI3OVx1NkIyMVx1NjVGNlx1OTVGNFwiLFxuICAgIHVzZUFsbENoYXJnZXM6IFwiXHU0RjdGXHU3NTI4XHU2MjQwXHU2NzA5XHU1M0VGXHU3NTI4XHU2QjIxXHU2NTcwXCIsXG4gICAgc2hvd092ZXJsYXk6IFwiXHU2NjNFXHU3OTNBXHU4OTg2XHU3NkQ2XHU1QzQyXCIsXG4gICAgbWF4Q2hhcmdlczogXCJcdTZCQ0ZcdTYyNzlcdTY3MDBcdTU5MjdcdTZCMjFcdTY1NzBcIixcbiAgICB3YWl0aW5nRm9yQ2hhcmdlczogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTcwOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlx1NTI2OVx1NEY1OVx1NjVGNlx1OTVGNFwiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1IHt0aW1lfSBcdTU0MEVcdTdFRTdcdTdFRUQuLi5cIixcbiAgICBwcm9ncmVzc1NhdmVkOiBcIlx1MjcwNSBcdThGREJcdTVFQTZcdTVERjJcdTRGRERcdTVCNThcdTRFM0Ege2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBcdTVERjJcdTUyQTBcdThGN0RcdThGREJcdTVFQTY6IHtwYWludGVkfS97dG90YWx9IFx1NTBDRlx1N0QyMFx1NURGMlx1N0VEOFx1NTIzNlwiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBcdTUyQTBcdThGN0RcdThGREJcdTVFQTZcdTU5MzFcdThEMjU6IHtlcnJvcn1cIixcbiBcbiAgICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIFx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlx1NTkzMVx1OEQyNToge2Vycm9yfVwiLFxuXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJcdTU3MjhcdTUwNUNcdTZCNjJcdTRFNEJcdTUyNERcdTg5ODFcdTRGRERcdTVCNThcdTVGNTNcdTUyNERcdThGREJcdTVFQTZcdTU0MTdcdUZGMUZcIixcbiAgICBzYXZlUHJvZ3Jlc3NUaXRsZTogXCJcdTRGRERcdTVCNThcdThGREJcdTVFQTZcIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiXHU2NTNFXHU1RjAzXCIsXG4gICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgIG1pbmltaXplOiBcIlx1NjcwMFx1NUMwRlx1NTMxNlwiLFxuICAgIHdpZHRoOiBcIlx1NUJCRFx1NUVBNlwiLFxuICAgIGhlaWdodDogXCJcdTlBRDhcdTVFQTZcIixcbiAgICBrZWVwQXNwZWN0OiBcIlx1NEZERFx1NjMwMVx1N0VCNVx1NkEyQVx1NkJENFwiLFxuICAgIGFwcGx5OiBcIlx1NUU5NFx1NzUyOFwiLFxuICAgIG92ZXJsYXlPbjogXCJcdTg5ODZcdTc2RDZcdTVDNDI6IFx1NUYwMFx1NTQyRlwiLFxuICAgIG92ZXJsYXlPZmY6IFwiXHU4OTg2XHU3NkQ2XHU1QzQyOiBcdTUxNzNcdTk1RURcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBcdTYyNzlcdTZCMjFcdTVCOENcdTYyMTA6IFx1NURGMlx1N0VEOFx1NTIzNiB7cGFpbnRlZH0gXHU1MENGXHU3RDIwIHwgXHU4RkRCXHU1RUE2OiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzBcdTYwNjJcdTU5MEQ6IHtjdXJyZW50fS97bmVlZGVkfSAtIFx1NjVGNlx1OTVGNDoge3RpbWV9XCIsXG4gICAgd2FpdGluZ0NoYXJnZXNDb3VudGRvd246IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3MDoge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU1MjY5XHU0RjU5OiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTZCNjNcdTU3MjhcdTgxRUFcdTUyQThcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1ODFFQVx1NTJBOFx1NTQyRlx1NTJBOFx1NjIxMFx1NTI5RlwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTY1RTBcdTZDRDVcdTgxRUFcdTUyQThcdTU0MkZcdTUyQThcdUZGMENcdThCRjdcdTYyNEJcdTUyQThcdTY0Q0RcdTRGNUNcdTMwMDJcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1NURGMlx1NjhDMFx1NkQ0Qlx1NTIzMFx1OEMwM1x1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2NDFDXHU3RDIyXHU4QzAzXHU4MjcyXHU2NzdGLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHU2QjYzXHU1NzI4XHU3MEI5XHU1MUZCXHU3RUQ4XHU1MjM2XHU2MzA5XHU5NEFFLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU3RUQ4XHU1MjM2XHU2MzA5XHU5NEFFXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyQThcdTUyMURcdTU5Q0JcdTUzMTZcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFx1OTFDRFx1OEJENSB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfVx1RkYwQ1x1N0I0OVx1NUY4NSB7ZGVsYXl9IFx1NzlEMi4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IFx1N0IyQyB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSBcdTZCMjFcdTVDMURcdThCRDVcdTUxRkFcdTk1MTlcdUZGMENcdTVDMDZcdTU3Mjgge2RlbGF5fSBcdTc5RDJcdTU0MEVcdTkxQ0RcdThCRDUuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHU4RDg1XHU4RkM3IHttYXhBdHRlbXB0c30gXHU2QjIxXHU1QzFEXHU4QkQ1XHU1OTMxXHU4RDI1XHUzMDAyXHU3RUU3XHU3RUVEXHU0RTBCXHU0RTAwXHU2Mjc5Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBcdTdGNTFcdTdFRENcdTk1MTlcdThCRUZcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThCRDUuLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgXHU2NzBEXHU1MkExXHU1NjY4XHU5NTE5XHU4QkVGXHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QkQ1Li4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBcdTY3MERcdTUyQTFcdTU2NjhcdThEODVcdTY1RjZcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThCRDUuLi5cIixcbiAgICAvLyB2Mi4wIC0gXHU0RkREXHU2MkE0XHU0RTBFXHU3RUQ4XHU1MjM2XHU2QTIxXHU1RjBGXG4gICAgcHJvdGVjdGlvbkVuYWJsZWQ6IFwiXHU1REYyXHU1RjAwXHU1NDJGXHU0RkREXHU2MkE0XCIsXG4gICAgcHJvdGVjdGlvbkRpc2FibGVkOiBcIlx1NURGMlx1NTE3M1x1OTVFRFx1NEZERFx1NjJBNFwiLFxuICAgIHBhaW50UGF0dGVybjogXCJcdTdFRDhcdTUyMzZcdTZBMjFcdTVGMEZcIixcbiAgICBwYXR0ZXJuTGluZWFyU3RhcnQ6IFwiXHU3RUJGXHU2MDI3XHVGRjA4XHU4RDc3XHU3MEI5XHVGRjA5XCIsXG4gICAgcGF0dGVybkxpbmVhckVuZDogXCJcdTdFQkZcdTYwMjdcdUZGMDhcdTdFQzhcdTcwQjlcdUZGMDlcIixcbiAgICBwYXR0ZXJuUmFuZG9tOiBcIlx1OTY4Rlx1NjczQVwiLFxuICAgIHBhdHRlcm5DZW50ZXJPdXQ6IFwiXHU0RUNFXHU0RTJEXHU1RkMzXHU1NDExXHU1OTE2XCIsXG4gICAgcGF0dGVybkNvcm5lcnNGaXJzdDogXCJcdTUxNDhcdTg5RDJcdTg0M0RcIixcbiAgICBwYXR0ZXJuU3BpcmFsOiBcIlx1ODdCQVx1NjVDQlwiLFxuICAgIHNvbGlkOiBcIlx1NUI5RVx1NUZDM1wiLFxuICAgIHN0cmlwZXM6IFwiXHU2NzYxXHU3RUI5XCIsXG4gICAgY2hlY2tlcmJvYXJkOiBcIlx1NjhDQlx1NzZEOFx1NjgzQ1wiLFxuICAgIGdyYWRpZW50OiBcIlx1NkUxMFx1NTNEOFwiLFxuICAgIGRvdHM6IFwiXHU3MEI5XHU3MkI2XCIsXG4gICAgd2F2ZXM6IFwiXHU2Q0UyXHU2RDZBXCIsXG4gICAgc3BpcmFsOiBcIlx1ODdCQVx1NjVDQlwiLFxuICAgIG1vc2FpYzogXCJcdTlBNkNcdThENUJcdTUxNEJcIixcbiAgICBicmlja3M6IFwiXHU3ODE2XHU1NzU3XCIsXG4gICAgemlnemFnOiBcIlx1NEU0Qlx1NUI1N1x1NUY2MlwiLFxuICAgIHByb3RlY3RpbmdEcmF3aW5nOiBcIlx1NkI2M1x1NTcyOFx1NEZERFx1NjJBNFx1NTZGRVx1N0EzRi4uLlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTggXHU2OEMwXHU2RDRCXHU1MjMwIHtjb3VudH0gXHU1OTA0XHU2NkY0XHU2NTM5XCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REQyNyBcdTZCNjNcdTU3MjhcdTRGRUVcdTU5MEQge2NvdW50fSBcdTRFMkFcdTY2RjRcdTY1MzlcdTc2ODRcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICByZXBhaXJDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1NEZFRVx1NTkwRFx1NUI4Q1x1NjIxMFx1RkYxQXtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgbm9DaGFyZ2VzRm9yUmVwYWlyOiBcIlx1MjZBMSBcdTRGRUVcdTU5MERcdTRFMERcdTZEODhcdTgwMTdcdTcwQjlcdTY1NzBcdUZGMENcdTdCNDlcdTVGODVcdTRFMkQuLi5cIixcbiAgICBwcm90ZWN0aW9uUHJpb3JpdHk6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NURGMlx1NTQyRlx1NzUyOFx1NEZERFx1NjJBNFx1NEYxOFx1NTE0OFwiLFxuICAgIHBhdHRlcm5BcHBsaWVkOiBcIlx1NURGMlx1NUU5NFx1NzUyOFx1NkEyMVx1NUYwRlwiLFxuICAgIGN1c3RvbVBhdHRlcm46IFwiXHU4MUVBXHU1QjlBXHU0RTQ5XHU2QTIxXHU1RjBGXCIsXG4gICAgbG9nV2luZG93OiAnXHVEODNEXHVEQ0NCIExvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHU2NUU1XHU1RkQ3XHU3QTk3XHU1M0UzJyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTRFMEJcdThGN0RcdTY1RTVcdTVGRDcnLFxuICAgIGNsZWFyTG9nczogJ1x1NkUwNVx1OTY2NFx1NjVFNVx1NUZENycsXG4gICAgY2xvc2VMb2dzOiAnXHU1MTczXHU5NUVEJ1xuICB9LFxuXG4gIC8vIFx1NTE5Q1x1NTczQVx1NkEyMVx1NTc1N1x1RkYwOFx1NUY4NVx1NUI5RVx1NzNCMFx1RkYwOVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1NTE5Q1x1NTczQVx1NjczQVx1NTY2OFx1NEVCQVwiLFxuICAgIHN0YXJ0OiBcIlx1NUYwMFx1NTlDQlwiLFxuICAgIHN0b3A6IFwiXHU1MDVDXHU2QjYyXCIsXG4gICAgc3RvcHBlZDogXCJcdTY3M0FcdTU2NjhcdTRFQkFcdTVERjJcdTUwNUNcdTZCNjJcIixcbiAgICBjYWxpYnJhdGU6IFwiXHU2ODIxXHU1MUM2XCIsXG4gICAgcGFpbnRPbmNlOiBcIlx1NEUwMFx1NkIyMVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlx1NjhDMFx1NjdFNVx1NzJCNlx1NjAwMVx1NEUyRC4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiXHU5MTREXHU3RjZFXCIsXG4gICAgZGVsYXk6IFwiXHU1RUY2XHU4RkRGIChcdTZCRUJcdTc5RDIpXCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXCIsXG4gICAgbWluQ2hhcmdlczogXCJcdTY3MDBcdTVDMTFcdTZCMjFcdTY1NzBcIixcbiAgICBjb2xvck1vZGU6IFwiXHU5ODlDXHU4MjcyXHU2QTIxXHU1RjBGXCIsXG4gICAgcmFuZG9tOiBcIlx1OTY4Rlx1NjczQVwiLFxuICAgIGZpeGVkOiBcIlx1NTZGQVx1NUI5QVwiLFxuICAgIHJhbmdlOiBcIlx1ODMwM1x1NTZGNFwiLFxuICAgIGZpeGVkQ29sb3I6IFwiXHU1NkZBXHU1QjlBXHU5ODlDXHU4MjcyXCIsXG4gICAgYWR2YW5jZWQ6IFwiXHU5QUQ4XHU3RUE3XCIsXG4gICAgdGlsZVg6IFwiXHU3NEU2XHU3MjQ3IFhcIixcbiAgICB0aWxlWTogXCJcdTc0RTZcdTcyNDcgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiXHU4MUVBXHU1QjlBXHU0RTQ5XHU4QzAzXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiXHU0RjhCXHU1OTgyOiAjRkYwMDAwLCMwMEZGMDAsIzAwMDBGRlwiLFxuICAgIGNhcHR1cmU6IFwiXHU2MzU1XHU4M0I3XCIsXG4gICAgcGFpbnRlZDogXCJcdTVERjJcdTdFRDhcdTUyMzZcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3MFwiLFxuICAgIHJldHJpZXM6IFwiXHU5MUNEXHU4QkQ1XCIsXG4gICAgdGlsZTogXCJcdTc0RTZcdTcyNDdcIixcbiAgICBjb25maWdTYXZlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTRGRERcdTVCNThcIixcbiAgICBjb25maWdMb2FkZWQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU1MkEwXHU4RjdEXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU5MUNEXHU3RjZFXCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJcdThCRjdcdTYyNEJcdTUyQThcdTdFRDhcdTUyMzZcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcdTRFRTVcdTYzNTVcdTgzQjdcdTU3NTBcdTY4MDcuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIlx1NTQwRVx1N0FFRlx1NTcyOFx1N0VCRlwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIlx1NTQwRVx1N0FFRlx1NzlCQlx1N0VCRlwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIlx1NkI2M1x1NTcyOFx1NTQyRlx1NTJBOFx1NjczQVx1NTY2OFx1NEVCQS4uLlwiLFxuICAgIHN0b3BwaW5nQm90OiBcIlx1NkI2M1x1NTcyOFx1NTA1Q1x1NkI2Mlx1NjczQVx1NTY2OFx1NEVCQS4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIlx1NjgyMVx1NTFDNlx1NEUyRC4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIlx1ODFFQVx1NTJBOFx1NTE5Q1x1NTczQVx1NURGMlx1NTcyOFx1OEZEMFx1ODg0Q1x1MzAwMlwiLFxuICAgIGltYWdlUnVubmluZ1dhcm5pbmc6IFwiXHU4MUVBXHU1MkE4XHU3RUQ4XHU1NkZFXHU2QjYzXHU1NzI4XHU4RkQwXHU4ODRDXHVGRjBDXHU4QkY3XHU1MTQ4XHU1MTczXHU5NUVEXHU1MThEXHU1NDJGXHU1MkE4XHU4MUVBXHU1MkE4XHU1MTlDXHU1NzNBXHUzMDAyXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU1NzMwXHU1NkZFXHU3Njg0XHU3QTdBXHU3NjdEXHU1MzNBXHU1N0RGXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHU0RUU1XHU4QkJFXHU3RjZFXHU1MTlDXHU1NzNBXHU1MzNBXHU1N0RGXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTRGNjBcdTZEODJcdTUzQzJcdTgwMDNcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHU1MzNBXHU1N0RGXHU4QkJFXHU3RjZFXHU2MjEwXHU1MjlGXHVGRjAxXHU1MzRBXHU1Rjg0OiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU1MzNBXHU1N0RGXHU5MDA5XHU2MkU5XHU4RDg1XHU2NUY2XCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBcdThCRjdcdTUxNDhcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcdUZGMDhcdTRGN0ZcdTc1MjhcdTIwMUNcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcdTIwMURcdTYzMDlcdTk0QUVcdUZGMDlcIixcbiAgICBmYXJtUmFkaXVzOiBcIlx1NTE5Q1x1NTczQVx1NTM0QVx1NUY4NFwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJcdTVGNTNcdTUyNERcdTUzM0FcdTU3REZcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIFx1NkI2M1x1NTcyOFx1NEVFNVx1NTM0QVx1NUY4NCB7cmFkaXVzfXB4IFx1NTcyOCAoe3h9LHt5fSkgXHU1MTlDXHU1NzNBXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBcdTkxQ0RcdTg5ODE6IFx1OEJGN1x1OTAwOVx1NjJFOVx1N0E3QVx1NzY3RFx1NTMzQVx1NTdERlx1NEVFNVx1OTA3Rlx1NTE0RFx1NTFCMlx1N0E4MVwiLFxuICAgIG5vUG9zaXRpb246IFwiXHU2NzJBXHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXCIsXG4gICAgY3VycmVudFpvbmU6IFwiXHU1MzNBXHU1N0RGOiAoe3h9LHt5fSlcIixcbiAgICBhdXRvU2VsZWN0UG9zaXRpb246IFwiXHVEODNDXHVERkFGIFx1OEJGN1x1NTE0OFx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlx1RkYwQ1x1NTcyOFx1NTczMFx1NTZGRVx1NEUwQVx1NkQ4Mlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1NEVFNVx1OEJCRVx1N0Y2RVx1NTE5Q1x1NTczQVx1NTMzQVx1NTdERlwiLFxuICAgIGxvZ1dpbmRvdzogJ1x1RDgzRFx1RENDQiBMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1NjVFNVx1NUZEN1x1N0E5N1x1NTNFMycsXG4gICAgZG93bmxvYWRMb2dzOiAnXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3JyxcbiAgICBjbGVhckxvZ3M6ICdcdTZFMDVcdTk2NjRcdTY1RTVcdTVGRDcnLFxuICAgIGNsb3NlTG9nczogJ1x1NTE3M1x1OTVFRCdcbiAgfSxcblxuICAvLyBcdTUxNkNcdTUxNzFcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1NjYyRlwiLFxuICAgIG5vOiBcIlx1NTQyNlwiLFxuICAgIG9rOiBcIlx1Nzg2RVx1OEJBNFwiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBjbG9zZTogXCJcdTUxNzNcdTk1RURcIixcbiAgICBzYXZlOiBcIlx1NEZERFx1NUI1OFwiLFxuICAgIGxvYWQ6IFwiXHU1MkEwXHU4RjdEXCIsXG4gICAgZGVsZXRlOiBcIlx1NTIyMFx1OTY2NFwiLFxuICAgIGVkaXQ6IFwiXHU3RjE2XHU4RjkxXCIsXG4gICAgc3RhcnQ6IFwiXHU1RjAwXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBwYXVzZTogXCJcdTY2ODJcdTUwNUNcIixcbiAgICByZXN1bWU6IFwiXHU3RUU3XHU3RUVEXCIsXG4gICAgcmVzZXQ6IFwiXHU5MUNEXHU3RjZFXCIsXG4gICAgc2V0dGluZ3M6IFwiXHU4QkJFXHU3RjZFXCIsXG4gICAgaGVscDogXCJcdTVFMkVcdTUyQTlcIixcbiAgICBhYm91dDogXCJcdTUxNzNcdTRFOEVcIixcbiAgICBsYW5ndWFnZTogXCJcdThCRURcdThBMDBcIixcbiAgICBsb2FkaW5nOiBcIlx1NTJBMFx1OEY3RFx1NEUyRC4uLlwiLFxuICAgIGVycm9yOiBcIlx1OTUxOVx1OEJFRlwiLFxuICAgIHN1Y2Nlc3M6IFwiXHU2MjEwXHU1MjlGXCIsXG4gICAgd2FybmluZzogXCJcdThCNjZcdTU0NEFcIixcbiAgICBpbmZvOiBcIlx1NEZFMVx1NjA2RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdThCRURcdThBMDBcdTVERjJcdTUyMDdcdTYzNjJcdTRFM0Ege2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gXHU1Qjg4XHU2MkE0XHU2QTIxXHU1NzU3XG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJBOFx1NUI4OFx1NjJBNFwiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcIixcbiAgICBjYXB0dXJlQXJlYTogXCJcdTYzNTVcdTgzQjdcdTUzM0FcdTU3REZcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHU1RjAwXHU1OUNCXHU1Qjg4XHU2MkE0XCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHU1MDVDXHU2QjYyXHU1Qjg4XHU2MkE0XCIsXG4gICAgdXBwZXJMZWZ0OiBcIlx1NURFNlx1NEUwQVx1ODlEMlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1NTNEN1x1NEZERFx1NjJBNFx1NTBDRlx1N0QyMFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTY4QzBcdTZENEJcdTUyMzBcdTc2ODRcdTUzRDhcdTUzMTZcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJcdTRGRUVcdTU5MERcdTc2ODRcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3MFwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTY4QzBcdTY3RTVcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTk4OUNcdTgyNzJcdUZGMENcdThCRjdcdTU3MjhcdTdGNTFcdTdBRDlcdTRFMEFcdTYyNTNcdTVGMDBcdThDMDNcdTgyNzJcdTY3N0ZcdTMwMDJcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3OUNEXHU1M0VGXHU3NTI4XHU5ODlDXHU4MjcyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NUI4OFx1NjJBNFx1NjczQVx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NjIxMFx1NTI5RlwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU1OTMxXHU4RDI1XCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgXHU1NzUwXHU2ODA3XHU2NUUwXHU2NTQ4XCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1NTMzQVx1NTdERlx1NjVFMFx1NjU0OFx1RkYwQ1x1NURFNlx1NEUwQVx1ODlEMlx1NUZDNVx1OTg3Qlx1NUMwRlx1NEU4RVx1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHU1MzNBXHU1N0RGXHU4RkM3XHU1OTI3OiB7c2l6ZX0gXHU1MENGXHU3RDIwIChcdTY3MDBcdTU5Mjc6IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IFx1NjM1NVx1ODNCN1x1NUI4OFx1NjJBNFx1NTMzQVx1NTdERlx1NEUyRC4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHU1MzNBXHU1N0RGXHU2MzU1XHU4M0I3XHU2MjEwXHU1MjlGOiB7Y291bnR9IFx1NTBDRlx1N0QyMFx1NTNEN1x1NEZERFx1NjJBNFwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHU2MzU1XHU4M0I3XHU1MzNBXHU1N0RGXHU1MUZBXHU5NTE5OiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdThCRjdcdTUxNDhcdTYzNTVcdTgzQjdcdTRFMDBcdTRFMkFcdTVCODhcdTYyQTRcdTUzM0FcdTU3REZcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU2MkE0XHU1REYyXHU1NDJGXHU1MkE4IC0gXHU1MzNBXHU1N0RGXHU3NkQxXHU2M0E3XHU0RTJEXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NUI4OFx1NjJBNFx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHU1MzNBXHU1N0RGXHU1Qjg5XHU1MTY4IC0gXHU2NzJBXHU2OEMwXHU2RDRCXHU1MjMwXHU1M0Q4XHU1MzE2XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTY4QzBcdTZENEJcdTUyMzAge2NvdW50fSBcdTRFMkFcdTUzRDhcdTUzMTZcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1NkI2M1x1NTcyOFx1NEZFRVx1NTkwRCB7Y291bnR9IFx1NEUyQVx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHU1REYyXHU2MjEwXHU1MjlGXHU0RkVFXHU1OTBEIHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIFx1NEZFRVx1NTkwRFx1NTFGQVx1OTUxOToge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHU2QjIxXHU2NTcwXHU0RTBEXHU4REIzXHVGRjBDXHU2NUUwXHU2Q0Q1XHU0RkVFXHU1OTBEXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY4QzBcdTY3RTVcdTUzM0FcdTU3REZcdTUzRDhcdTUzMTYuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTY4QzBcdTY3RTVcdTUxRkFcdTk1MTk6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU2MkE0XHU0RTJEIC0gXHU1MzNBXHU1N0RGXHU1M0Q3XHU0RkREXHU2MkE0XCIsXG4gICAgbGFzdENoZWNrOiBcIlx1NEUwQVx1NkIyMVx1NjhDMFx1NjdFNToge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1NEUwQlx1NkIyMVx1NjhDMFx1NjdFNToge3RpbWV9IFx1NzlEMlx1NTQwRVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJBOFx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NjVFMFx1NkNENVx1ODFFQVx1NTJBOFx1NTQyRlx1NTJBOFx1RkYwQ1x1OEJGN1x1NjI0Qlx1NTJBOFx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEMwM1x1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1NzBCOVx1NTFGQlx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRVwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU5NzAwXHU4OTgxXHU0RkREXHU2MkE0XHU1MzNBXHU1N0RGXHU3Njg0XHU1REU2XHU0RTBBXHU4OUQyXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHU3M0IwXHU1NzI4XHU1NzI4XHU1M0YzXHU0RTBCXHU4OUQyXHU2RDgyXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDA5XHU2MkU5XHU1REU2XHU0RTBBXHU4OUQyLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTAwOVx1NjJFOVx1NTNGM1x1NEUwQlx1ODlEMi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTgzQjdcdTVERTZcdTRFMEFcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1ODNCN1x1NTNGM1x1NEUwQlx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1OTAwOVx1NjJFOVx1OEQ4NVx1NjVGNlwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTkwMDlcdTYyRTlcdTUxRkFcdTk1MTlcdUZGMENcdThCRjdcdTkxQ0RcdThCRDVcIixcbiAgICBsb2dXaW5kb3c6ICdcdUQ4M0RcdURDQ0IgTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTY1RTVcdTVGRDdcdTdBOTdcdTUzRTMnLFxuICAgIGRvd25sb2FkTG9nczogJ1x1NEUwQlx1OEY3RFx1NjVFNVx1NUZENycsXG4gICAgY2xlYXJMb2dzOiAnXHU2RTA1XHU5NjY0XHU2NUU1XHU1RkQ3JyxcbiAgICBjbG9zZUxvZ3M6ICdcdTUxNzNcdTk1RUQnXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHpoSGFudCA9IHtcbiAgLy8gXHU1NTUzXHU1MkQ1XHU1NjY4XG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgXHU4MUVBXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBcdTgxRUFcdTUyRDVcdThGQjJcdTU4MzQnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTYnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTgxRUFcdTUyRDVcdTVCODhcdThCNzcnLFxuICAgIHNlbGVjdGlvbjogJ1x1OTA3OFx1NjRDNycsXG4gICAgdXNlcjogJ1x1NzUyOFx1NjIzNycsXG4gICAgY2hhcmdlczogJ1x1NkIyMVx1NjU3OCcsXG4gICAgYmFja2VuZDogJ1x1NUY4Q1x1N0FFRicsXG4gICAgZGF0YWJhc2U6ICdcdTY1NzhcdTY0REFcdTVFQUInLFxuICAgIHVwdGltZTogJ1x1OTA0Qlx1ODg0Q1x1NjY0Mlx1OTU5MycsXG4gICAgY2xvc2U6ICdcdTk1RENcdTk1ODknLFxuICAgIGxhdW5jaDogJ1x1NTU1M1x1NTJENScsXG4gICAgbG9hZGluZzogJ1x1NTJBMFx1OEYwOVx1NEUyRFx1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnXHU1N0Y3XHU4ODRDXHU0RTJEXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1x1NkI2M1x1NTcyOFx1NEUwQlx1OEYwOVx1ODE3M1x1NjcyQ1x1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnXHU5MDc4XHU2NEM3XHU0RTAwXHU1MDBCXHU2QTVGXHU1NjY4XHU0RUJBXHU0RTI2XHU5RURFXHU2NENBXHU1NTUzXHU1MkQ1JyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHU2RTk2XHU1MDk5XHU1NTUzXHU1MkQ1JyxcbiAgICBsb2FkRXJyb3I6ICdcdTUyQTBcdThGMDlcdTkzMkZcdThBQTQnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1NzEyMVx1NkNENVx1NTJBMFx1OEYwOVx1NjI0MFx1OTA3OFx1NkE1Rlx1NTY2OFx1NEVCQVx1MzAwMlx1OEFDQlx1NkFBMlx1NjdFNVx1N0RCMlx1N0Q2MVx1OTAyM1x1NjNBNVx1NjIxNlx1OTFDRFx1OEE2Nlx1MzAwMicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgXHU2QUEyXHU2N0U1XHU0RTJELi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgXHU1NzI4XHU3RERBJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IFx1OTZFMlx1N0REQScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgXHU2QjYzXHU1RTM4JyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBcdTkzMkZcdThBQTQnLFxuICAgIHVua25vd246ICctJyxcbiAgICBsb2dXaW5kb3c6ICdcdUQ4M0RcdURDQ0IgTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTY1RTVcdThBOENcdTg5OTZcdTdBOTcnLFxuICAgIGRvd25sb2FkTG9nczogJ1x1NEUwQlx1OEYwOVx1NjVFNVx1OEE4QycsXG4gICAgY2xlYXJMb2dzOiAnXHU2RTA1XHU5NjY0XHU2NUU1XHU4QThDJyxcbiAgICBjbG9zZUxvZ3M6ICdcdTk1RENcdTk1ODknXG4gIH0sXG5cbiAgLy8gXHU3RTZBXHU1NzE2XHU2QTIxXHU1ODRBXG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJENVx1N0U2QVx1NTcxNlwiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiXHU0RTBBXHU1MEIzXHU1NzE2XHU3MjQ3XCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiXHU4QUJGXHU2NTc0XHU1NzE2XHU3MjQ3XHU1OTI3XHU1QzBGXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHU5MDc4XHU2NEM3XHU0RjREXHU3RjZFXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJcdTk1OEJcdTU5Q0JcdTdFNkFcdTg4RkRcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiXHU1MDVDXHU2QjYyXHU3RTZBXHU4OEZEXCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlx1NEZERFx1NUI1OFx1OTAzMlx1NUVBNlwiLFxuICAgIGxvYWRQcm9ncmVzczogXCJcdTUyQTBcdThGMDlcdTkwMzJcdTVFQTZcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgXHU2QUEyXHU2N0U1XHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHU4QUNCXHU1NzI4XHU3REIyXHU3QUQ5XHU0RTBBXHU2MjUzXHU5NThCXHU4QUJGXHU4MjcyXHU2NzdGXHU1RjhDXHU5MUNEXHU4QTY2XHVGRjAxXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1NjI3RVx1NTIzMCB7Y291bnR9IFx1N0EyRVx1NTNFRlx1NzUyOFx1OTg0Rlx1ODI3MlwiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgXHU2QjYzXHU1NzI4XHU1MkEwXHU4RjA5XHU1NzE2XHU3MjQ3Li4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IFx1NTcxNlx1NzI0N1x1NURGMlx1NTJBMFx1OEYwOVx1RkYwQ1x1NjcwOVx1NjU0OFx1NTBDRlx1N0QyMCB7Y291bnR9IFx1NTAwQlwiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIFx1NTcxNlx1NzI0N1x1NTJBMFx1OEYwOVx1NTkzMVx1NjU1N1wiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHU4QUNCXHU1NzI4XHU0RjYwXHU2MEYzXHU5NThCXHU1OUNCXHU3RTZBXHU4OEZEXHU3Njg0XHU1NzMwXHU2NUI5XHU1ODU3XHU3QjJDXHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXHVGRjAxXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTRGNjBcdTU4NTdcdTUzQzNcdTgwMDNcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHU0RjREXHU3RjZFXHU4QTJEXHU3RjZFXHU2MjEwXHU1MjlGXHVGRjAxXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTRGNERcdTdGNkVcdTkwNzhcdTY0QzdcdThEODVcdTY2NDJcIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBcdTVERjJcdTZBQTJcdTZFMkNcdTUyMzBcdTRGNERcdTdGNkVcdUZGMENcdTg2NTVcdTc0MDZcdTRFMkQuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTRGNERcdTdGNkVcdTZBQTJcdTZFMkNcdTU5MzFcdTY1NTdcdUZGMENcdThBQ0JcdTkxQ0RcdThBNjZcIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBcdTk1OEJcdTU5Q0JcdTdFNkFcdTg4RkQuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBcdTkwMzJcdTVFQTY6IHtwYWludGVkfS97dG90YWx9IFx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgXHU2QzkyXHU2NzA5XHU2QjIxXHU2NTc4XHUzMDAyXHU3QjQ5XHU1Rjg1IHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHU3NTI4XHU2MjM3XHU1REYyXHU1MDVDXHU2QjYyXHU3RTZBXHU4OEZEXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgXHU3RTZBXHU4OEZEXHU1QjhDXHU2MjEwXHVGRjAxXHU1MTcxXHU3RTZBXHU4OEZEIHtjb3VudH0gXHU1MDBCXHU1MENGXHU3RDIwXHUzMDAyXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgXHU3RTZBXHU4OEZEXHU5MDRFXHU3QTBCXHU0RTJEXHU1MUZBXHU5MzJGXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgXHU4QUNCXHU1MTQ4XHU1MkEwXHU4RjA5XHU1NzE2XHU3MjQ3XHU0RTI2XHU5MDc4XHU2NEM3XHU0RjREXHU3RjZFXCIsXG4gICAgcHJvZ3Jlc3M6IFwiXHU5MDMyXHU1RUE2XCIsXG4gICAgdXNlck5hbWU6IFwiXHU3NTI4XHU2MjM3XCIsXG4gICAgcGl4ZWxzOiBcIlx1NTBDRlx1N0QyMFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTc4XCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJcdTk4MTBcdThBMDhcdTY2NDJcdTk1OTNcIixcbiAgICBpbml0TWVzc2FnZTogXCJcdTlFREVcdTY0Q0FcdTIwMUNcdTUyMURcdTU5Q0JcdTUzMTZcdTgxRUFcdTUyRDVcdTZBNUZcdTU2NjhcdTRFQkFcdTIwMURcdTk1OEJcdTU5Q0JcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTdCNDlcdTVGODVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBcdTU3MTZcdTcyNDdcdTVERjJcdThBQkZcdTY1NzRcdTcwQkEge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBcdTdFNkFcdTg4RkRcdTY2QUJcdTUwNUNcdTY1QkNcdTRGNERcdTdGNkUgWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcdTY1NzhcIixcbiAgICBiYXRjaFNpemU6IFwiXHU2Mjc5XHU2QjIxXHU1OTI3XHU1QzBGXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJcdTRFMEJcdTZCMjFcdTYyNzlcdTZCMjFcdTY2NDJcdTk1OTNcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlx1NEY3Rlx1NzUyOFx1NjI0MFx1NjcwOVx1NTNFRlx1NzUyOFx1NkIyMVx1NjU3OFwiLFxuICAgIHNob3dPdmVybGF5OiBcIlx1OTg2Rlx1NzkzQVx1ODk4Nlx1ODRDQlx1NUM2NFwiLFxuICAgIG1heENoYXJnZXM6IFwiXHU2QkNGXHU2Mjc5XHU2NzAwXHU1OTI3XHU2QjIxXHU2NTc4XCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3ODoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJcdTUyNjlcdTk5MThcdTY2NDJcdTk1OTNcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIFx1N0I0OVx1NUY4NSB7dGltZX0gXHU1RjhDXHU3RTdDXHU3RThDLi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgXHU5MDMyXHU1RUE2XHU1REYyXHU0RkREXHU1QjU4XHU3MEJBIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgXHU1REYyXHU1MkEwXHU4RjA5XHU5MDMyXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjBcdTVERjJcdTdFNkFcdTg4RkRcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgXHU1MkEwXHU4RjA5XHU5MDMyXHU1RUE2XHU1OTMxXHU2NTU3OiB7ZXJyb3J9XCIsXG4gXG4gICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcdTU5MzFcdTY1NTc6IHtlcnJvcn1cIixcblxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiXHU1NzI4XHU1MDVDXHU2QjYyXHU0RTRCXHU1MjREXHU4OTgxXHU0RkREXHU1QjU4XHU3NTc2XHU1MjREXHU5MDMyXHU1RUE2XHU1NUNFXHVGRjFGXCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiXHU0RkREXHU1QjU4XHU5MDMyXHU1RUE2XCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIlx1NjUzRVx1NjhDNFwiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBtaW5pbWl6ZTogXCJcdTY3MDBcdTVDMEZcdTUzMTZcIixcbiAgICB3aWR0aDogXCJcdTVCRUNcdTVFQTZcIixcbiAgICBoZWlnaHQ6IFwiXHU5QUQ4XHU1RUE2XCIsXG4gICAga2VlcEFzcGVjdDogXCJcdTRGRERcdTYzMDFcdTdFMzFcdTZBNkJcdTZCRDRcIixcbiAgICBhcHBseTogXCJcdTYxQzlcdTc1MjhcIixcbiAgICBvdmVybGF5T246IFwiXHU4OTg2XHU4NENCXHU1QzY0OiBcdTk1OEJcdTU1NTNcIixcbiAgICBvdmVybGF5T2ZmOiBcIlx1ODk4Nlx1ODRDQlx1NUM2NDogXHU5NURDXHU5NTg5XCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgXHU2Mjc5XHU2QjIxXHU1QjhDXHU2MjEwOiBcdTVERjJcdTdFNkFcdTg4RkQge3BhaW50ZWR9IFx1NTBDRlx1N0QyMCB8IFx1OTAzMlx1NUVBNjoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTc4XHU2MDYyXHU1RkE5OiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTY2NDJcdTk1OTM6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1Nzg6IHtjdXJyZW50fS97bmVlZGVkfSAtIFx1NTI2OVx1OTkxODoge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHU2QjYzXHU1NzI4XHU4MUVBXHU1MkQ1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTgxRUFcdTUyRDVcdTU1NTNcdTUyRDVcdTYyMTBcdTUyOUZcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHU3MTIxXHU2Q0Q1XHU4MUVBXHU1MkQ1XHU1NTUzXHU1MkQ1XHVGRjBDXHU4QUNCXHU2MjRCXHU1MkQ1XHU2NENEXHU0RjVDXHUzMDAyXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTZBQTJcdTZFMkNcdTUyMzBcdThBQkZcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEFCRlx1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1OUVERVx1NjRDQVx1N0U2QVx1ODhGRFx1NjMwOVx1OTIxNS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0U2QVx1ODhGRFx1NjMwOVx1OTIxNVwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkQ1XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBcdTkxQ0RcdThBNjYge2F0dGVtcHR9L3ttYXhBdHRlbXB0c31cdUZGMENcdTdCNDlcdTVGODUge2RlbGF5fSBcdTc5RDIuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBcdTdCMkMge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gXHU2QjIxXHU1NjE3XHU4QTY2XHU1MUZBXHU5MzJGXHVGRjBDXHU1QzA3XHU1NzI4IHtkZWxheX0gXHU3OUQyXHU1RjhDXHU5MUNEXHU4QTY2Li4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1OEQ4NVx1OTA0RSB7bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NTYxN1x1OEE2Nlx1NTkzMVx1NjU1N1x1MzAwMlx1N0U3Q1x1N0U4Q1x1NEUwQlx1NEUwMFx1NjI3OS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgXHU3REIyXHU3RDYxXHU5MzJGXHU4QUE0XHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QTY2Li4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IFx1NjcwRFx1NTJEOVx1NTY2OFx1OTMyRlx1OEFBNFx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEE2Ni4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgXHU0RjNBXHU2NzBEXHU1NjY4XHU5MDNFXHU2NjQyXHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QTY2Li4uXCIsXG4gICAgLy8gdjIuMCAtIFx1NEZERFx1OEI3N1x1ODIwN1x1N0U2QVx1ODhGRFx1NkEyMVx1NUYwRlxuICAgIHByb3RlY3Rpb25FbmFibGVkOiBcIlx1NURGMlx1NTU1Rlx1NzUyOFx1NEZERFx1OEI3N1wiLFxuICAgIHByb3RlY3Rpb25EaXNhYmxlZDogXCJcdTVERjJcdTUwNUNcdTc1MjhcdTRGRERcdThCNzdcIixcbiAgICBwYWludFBhdHRlcm46IFwiXHU3RTZBXHU4OEZEXHU2QTIxXHU1RjBGXCIsXG4gICAgcGF0dGVybkxpbmVhclN0YXJ0OiBcIlx1N0REQVx1NjAyN1x1RkYwOFx1OEQ3N1x1OUVERVx1RkYwOVwiLFxuICAgIHBhdHRlcm5MaW5lYXJFbmQ6IFwiXHU3RERBXHU2MDI3XHVGRjA4XHU3RDQyXHU5RURFXHVGRjA5XCIsXG4gICAgcGF0dGVyblJhbmRvbTogXCJcdTk2QThcdTZBNUZcIixcbiAgICBwYXR0ZXJuQ2VudGVyT3V0OiBcIlx1NzUzMVx1NEUyRFx1NUZDM1x1NTQxMVx1NTkxNlwiLFxuICAgIHBhdHRlcm5Db3JuZXJzRmlyc3Q6IFwiXHU1MTQ4XHU4OUQyXHU4NDNEXCIsXG4gICAgcGF0dGVyblNwaXJhbDogXCJcdTg3QkFcdTY1Q0JcIixcbiAgICBzb2xpZDogXCJcdTVCRTZcdTVGQzNcIixcbiAgICBzdHJpcGVzOiBcIlx1Njg5RFx1N0QwQlwiLFxuICAgIGNoZWNrZXJib2FyZDogXCJcdTY4Q0JcdTc2RTRcdTY4M0NcIixcbiAgICBncmFkaWVudDogXCJcdTZGMzhcdTVDNjRcIixcbiAgICBkb3RzOiBcIlx1OUVERVx1NzJDMFwiLFxuICAgIHdhdmVzOiBcIlx1NkNFMlx1NkQ2QVwiLFxuICAgIHNwaXJhbDogXCJcdTg3QkFcdTY1Q0JcIixcbiAgICBtb3NhaWM6IFwiXHU5OUFDXHU4Q0ZEXHU1MTRCXCIsXG4gICAgYnJpY2tzOiBcIlx1NzhEQVx1NTg0QVwiLFxuICAgIHppZ3phZzogXCJcdTRFNEJcdTVCNTdcdTVGNjJcIixcbiAgICBwcm90ZWN0aW5nRHJhd2luZzogXCJcdTZCNjNcdTU3MjhcdTRGRERcdThCNzdcdTdFNkFcdTU3MTYuLi5cIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IFx1NTA3NVx1NkUyQ1x1NTIzMCB7Y291bnR9IFx1ODY1NVx1OEI4QVx1NjZGNFwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdUREMjcgXHU2QjYzXHU1NzI4XHU0RkVFXHU1RkE5IHtjb3VudH0gXHU1MDBCXHU4QjhBXHU2NkY0XHU3Njg0XHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcmVwYWlyQ29tcGxldGVkOiBcIlx1MjcwNSBcdTRGRUVcdTVGQTlcdTVCOENcdTYyMTBcdUZGMUF7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIG5vQ2hhcmdlc0ZvclJlcGFpcjogXCJcdTI2QTEgXHU0RkVFXHU1RkE5XHU0RTBEXHU2RDg4XHU4MDE3XHU5RURFXHU2NTc4XHVGRjBDXHU3QjQ5XHU1Rjg1XHU0RTJELi4uXCIsXG4gICAgcHJvdGVjdGlvblByaW9yaXR5OiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVERjJcdTU1NUZcdTc1MjhcdTRGRERcdThCNzdcdTUxMkFcdTUxNDhcIixcbiAgICBwYXR0ZXJuQXBwbGllZDogXCJcdTVERjJcdTU5NTdcdTc1MjhcdTZBMjFcdTVGMEZcIixcbiAgICBjdXN0b21QYXR0ZXJuOiBcIlx1ODFFQVx1OEEwMlx1NkEyMVx1NUYwRlwiLFxuICAgIGxvZ1dpbmRvdzogJ1x1RDgzRFx1RENDQiBMb2dzJyxcbiAgICBsb2dXaW5kb3dUaXRsZTogJ1x1NjVFNVx1OEE4Q1x1ODk5Nlx1N0E5NycsXG4gICAgZG93bmxvYWRMb2dzOiAnXHU0RTBCXHU4RjA5XHU2NUU1XHU4QThDJyxcbiAgICBjbGVhckxvZ3M6ICdcdTZFMDVcdTk2NjRcdTY1RTVcdThBOEMnLFxuICAgIGNsb3NlTG9nczogJ1x1OTVEQ1x1OTU4OSdcbiAgfSxcblxuICAvLyBcdThGQjJcdTU4MzRcdTZBMjFcdTU4NEFcdUZGMDhcdTVGODVcdTVCRTZcdTczRkVcdUZGMDlcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdThGQjJcdTU4MzRcdTZBNUZcdTU2NjhcdTRFQkFcIixcbiAgICBzdGFydDogXCJcdTk1OEJcdTU5Q0JcIixcbiAgICBzdG9wOiBcIlx1NTA1Q1x1NkI2MlwiLFxuICAgIHN0b3BwZWQ6IFwiXHU2QTVGXHU1NjY4XHU0RUJBXHU1REYyXHU1MDVDXHU2QjYyXCIsXG4gICAgY2FsaWJyYXRlOiBcIlx1NjgyMVx1NkU5NlwiLFxuICAgIHBhaW50T25jZTogXCJcdTRFMDBcdTZCMjFcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJcdTZBQTJcdTY3RTVcdTcyQzBcdTYxNEJcdTRFMkQuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIlx1OTE0RFx1N0Y2RVwiLFxuICAgIGRlbGF5OiBcIlx1NUVGNlx1OTA3MiAoXHU2QkVCXHU3OUQyKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1NkJDRlx1NjI3OVx1NTBDRlx1N0QyMFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiXHU2NzAwXHU1QzExXHU2QjIxXHU2NTc4XCIsXG4gICAgY29sb3JNb2RlOiBcIlx1OTg0Rlx1ODI3Mlx1NkEyMVx1NUYwRlwiLFxuICAgIHJhbmRvbTogXCJcdTk2QThcdTZBNUZcIixcbiAgICBmaXhlZDogXCJcdTU2RkFcdTVCOUFcIixcbiAgICByYW5nZTogXCJcdTdCQzRcdTU3MERcIixcbiAgICBmaXhlZENvbG9yOiBcIlx1NTZGQVx1NUI5QVx1OTg0Rlx1ODI3MlwiLFxuICAgIGFkdmFuY2VkOiBcIlx1OUFEOFx1N0QxQVwiLFxuICAgIHRpbGVYOiBcIlx1NzRFNlx1NzI0NyBYXCIsXG4gICAgdGlsZVk6IFwiXHU3NEU2XHU3MjQ3IFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlx1ODFFQVx1NUI5QVx1N0ZBOVx1OEFCRlx1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcIlx1NEY4Qlx1NTk4MjogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIlx1NjM1NVx1NzM3MlwiLFxuICAgIHBhaW50ZWQ6IFwiXHU1REYyXHU3RTZBXHU4OEZEXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzhcIixcbiAgICByZXRyaWVzOiBcIlx1OTFDRFx1OEE2NlwiLFxuICAgIHRpbGU6IFwiXHU3NEU2XHU3MjQ3XCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU0RkREXHU1QjU4XCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NTJBMFx1OEYwOVwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1OTFDRFx1N0Y2RVwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiXHU4QUNCXHU2MjRCXHU1MkQ1XHU3RTZBXHU4OEZEXHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXHU0RUU1XHU2MzU1XHU3MzcyXHU1RUE3XHU2QTE5Li4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJcdTVGOENcdTdBRUZcdTU3MjhcdTdEREFcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJcdTVGOENcdTdBRUZcdTk2RTJcdTdEREFcIixcbiAgICBzdGFydGluZ0JvdDogXCJcdTZCNjNcdTU3MjhcdTU1NTNcdTUyRDVcdTZBNUZcdTU2NjhcdTRFQkEuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJcdTZCNjNcdTU3MjhcdTUwNUNcdTZCNjJcdTZBNUZcdTU2NjhcdTRFQkEuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJcdTY4MjFcdTZFOTZcdTRFMkQuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJcdTgxRUFcdTUyRDVcdThGQjJcdTU4MzRcdTVERjJcdTU3MjhcdTkwNEJcdTg4NENcdTMwMDJcIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIlx1ODFFQVx1NTJENVx1N0U2QVx1NTcxNlx1NkI2M1x1NTcyOFx1OTA0Qlx1ODg0Q1x1RkYwQ1x1OEFDQlx1NTE0OFx1OTVEQ1x1OTU4OVx1NTE4RFx1NTU1M1x1NTJENVx1ODFFQVx1NTJENVx1OEZCMlx1NTgzNFx1MzAwMlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFx1NTcyOFx1NTczMFx1NTcxNlx1NzY4NFx1N0E3QVx1NzY3RFx1NTM0MFx1NTdERlx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1NEVFNVx1OEEyRFx1N0Y2RVx1OEZCMlx1NTgzNFx1NTM0MFx1NTdERlwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU1ODU3XHU1M0MzXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NTM0MFx1NTdERlx1OEEyRFx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVx1NTM0QVx1NUY5MTogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1NTM0MFx1NTdERlx1OTA3OFx1NjRDN1x1OEQ4NVx1NjY0MlwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgXHU4QUNCXHU1MTQ4XHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXHVGRjA4XHU0RjdGXHU3NTI4XHUyMDFDXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXHUyMDFEXHU2MzA5XHU5MjE1XHVGRjA5XCIsXG4gICAgZmFybVJhZGl1czogXCJcdThGQjJcdTU4MzRcdTUzNEFcdTVGOTFcIixcbiAgICBwb3NpdGlvbkluZm86IFwiXHU3NTc2XHU1MjREXHU1MzQwXHU1N0RGXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBcdTZCNjNcdTU3MjhcdTRFRTVcdTUzNEFcdTVGOTEge3JhZGl1c31weCBcdTU3MjggKHt4fSx7eX0pIFx1OEZCMlx1NTgzNFwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgXHU5MUNEXHU4OTgxOiBcdThBQ0JcdTkwNzhcdTY0QzdcdTdBN0FcdTc2N0RcdTUzNDBcdTU3REZcdTRFRTVcdTkwN0ZcdTUxNERcdTg4NURcdTdBODFcIixcbiAgICBub1Bvc2l0aW9uOiBcIlx1NjcyQVx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlwiLFxuICAgIGN1cnJlbnRab25lOiBcIlx1NTM0MFx1NTdERjogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBcdThBQ0JcdTUxNDhcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcdUZGMENcdTU3MjhcdTU3MzBcdTU3MTZcdTRFMEFcdTU4NTdcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTRFRTVcdThBMkRcdTdGNkVcdThGQjJcdTU4MzRcdTUzNDBcdTU3REZcIixcbiAgICBsb2dXaW5kb3c6ICdcdUQ4M0RcdURDQ0IgTG9ncycsXG4gICAgbG9nV2luZG93VGl0bGU6ICdcdTY1RTVcdThBOENcdTg5OTZcdTdBOTcnLFxuICAgIGRvd25sb2FkTG9nczogJ1x1NEUwQlx1OEYwOVx1NjVFNVx1OEE4QycsXG4gICAgY2xlYXJMb2dzOiAnXHU2RTA1XHU5NjY0XHU2NUU1XHU4QThDJyxcbiAgICBjbG9zZUxvZ3M6ICdcdTk1RENcdTk1ODknXG4gIH0sXG5cbiAgLy8gXHU1MTZDXHU1MTcxXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJcdTY2MkZcIixcbiAgICBubzogXCJcdTU0MjZcIixcbiAgICBvazogXCJcdTc4QkFcdThBOERcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgY2xvc2U6IFwiXHU5NURDXHU5NTg5XCIsXG4gICAgc2F2ZTogXCJcdTRGRERcdTVCNThcIixcbiAgICBsb2FkOiBcIlx1NTJBMFx1OEYwOVwiLFxuICAgIGRlbGV0ZTogXCJcdTUyMkFcdTk2NjRcIixcbiAgICBlZGl0OiBcIlx1N0RFOFx1OEYyRlwiLFxuICAgIHN0YXJ0OiBcIlx1OTU4Qlx1NTlDQlwiLFxuICAgIHN0b3A6IFwiXHU1MDVDXHU2QjYyXCIsXG4gICAgcGF1c2U6IFwiXHU2NkFCXHU1MDVDXCIsXG4gICAgcmVzdW1lOiBcIlx1N0U3Q1x1N0U4Q1wiLFxuICAgIHJlc2V0OiBcIlx1OTFDRFx1N0Y2RVwiLFxuICAgIHNldHRpbmdzOiBcIlx1OEEyRFx1N0Y2RVwiLFxuICAgIGhlbHA6IFwiXHU1RTZCXHU1MkE5XCIsXG4gICAgYWJvdXQ6IFwiXHU5NURDXHU2NUJDXCIsXG4gICAgbGFuZ3VhZ2U6IFwiXHU4QTlFXHU4QTAwXCIsXG4gICAgbG9hZGluZzogXCJcdTUyQTBcdThGMDlcdTRFMkQuLi5cIixcbiAgICBlcnJvcjogXCJcdTkzMkZcdThBQTRcIixcbiAgICBzdWNjZXNzOiBcIlx1NjIxMFx1NTI5RlwiLFxuICAgIHdhcm5pbmc6IFwiXHU4QjY2XHU1NDRBXCIsXG4gICAgaW5mbzogXCJcdTRGRTFcdTYwNkZcIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiXHU4QTlFXHU4QTAwXHU1REYyXHU1MjA3XHU2M0RCXHU3MEJBIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIFx1NUI4OFx1OEI3N1x1NkEyMVx1NTg0QVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyRDVcdTVCODhcdThCNzdcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHNlbGVjdEFyZWE6IFwiXHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiXHU2MzU1XHU3MzcyXHU1MzQwXHU1N0RGXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIlx1OTU4Qlx1NTlDQlx1NUI4OFx1OEI3N1wiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIlx1NTA1Q1x1NkI2Mlx1NUI4OFx1OEI3N1wiLFxuICAgIHVwcGVyTGVmdDogXCJcdTVERTZcdTRFMEFcdTg5RDJcIixcbiAgICBsb3dlclJpZ2h0OiBcIlx1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJcdTUzRDdcdTRGRERcdThCNzdcdTUwQ0ZcdTdEMjBcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiXHU2QUEyXHU2RTJDXHU1MjMwXHU3Njg0XHU4QjhBXHU1MzE2XCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiXHU0RkVFXHU1RkE5XHU3Njg0XHU1MENGXHU3RDIwXCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzhcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTdCNDlcdTVGODVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0NcdURGQTggXHU2QUEyXHU2N0U1XHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU5ODRGXHU4MjcyXHVGRjBDXHU4QUNCXHU1NzI4XHU3REIyXHU3QUQ5XHU0RTBBXHU2MjUzXHU5NThCXHU4QUJGXHU4MjcyXHU2NzdGXHUzMDAyXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1NjI3RVx1NTIzMCB7Y291bnR9IFx1N0EyRVx1NTNFRlx1NzUyOFx1OTg0Rlx1ODI3MlwiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTVCODhcdThCNzdcdTZBNUZcdTU2NjhcdTRFQkFcdTUyMURcdTU5Q0JcdTUzMTZcdTYyMTBcdTUyOUZcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIFx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NTkzMVx1NjU1N1wiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIFx1NUVBN1x1NkExOVx1NzEyMVx1NjU0OFwiLFxuICAgIGludmFsaWRBcmVhOiBcIlx1Mjc0QyBcdTUzNDBcdTU3REZcdTcxMjFcdTY1NDhcdUZGMENcdTVERTZcdTRFMEFcdTg5RDJcdTVGQzVcdTk4MDhcdTVDMEZcdTY1QkNcdTUzRjNcdTRFMEJcdTg5RDJcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFx1NTM0MFx1NTdERlx1OTA0RVx1NTkyNzoge3NpemV9IFx1NTBDRlx1N0QyMCAoXHU2NzAwXHU1OTI3OiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBcdTYzNTVcdTczNzJcdTVCODhcdThCNzdcdTUzNDBcdTU3REZcdTRFMkQuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IFx1NTM0MFx1NTdERlx1NjM1NVx1NzM3Mlx1NjIxMFx1NTI5Rjoge2NvdW50fSBcdTUwQ0ZcdTdEMjBcdTUzRDdcdTRGRERcdThCNzdcIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIFx1NjM1NVx1NzM3Mlx1NTM0MFx1NTdERlx1NTFGQVx1OTMyRjoge2Vycm9yfVwiLFxuICAgIGNhcHR1cmVGaXJzdDogXCJcdTI3NEMgXHU4QUNCXHU1MTQ4XHU2MzU1XHU3MzcyXHU0RTAwXHU1MDBCXHU1Qjg4XHU4Qjc3XHU1MzQwXHU1N0RGXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NUI4OFx1OEI3N1x1NURGMlx1NTU1M1x1NTJENSAtIFx1NTM0MFx1NTdERlx1NzZFM1x1NjNBN1x1NEUyRFwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTVCODhcdThCNzdcdTVERjJcdTUwNUNcdTZCNjJcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFx1NTM0MFx1NTdERlx1NUI4OVx1NTE2OCAtIFx1NjcyQVx1NkFBMlx1NkUyQ1x1NTIzMFx1OEI4QVx1NTMxNlwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTggXHU2QUEyXHU2RTJDXHU1MjMwIHtjb3VudH0gXHU1MDBCXHU4QjhBXHU1MzE2XCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBcdTZCNjNcdTU3MjhcdTRGRUVcdTVGQTkge2NvdW50fSBcdTUwMEJcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NURGMlx1NjIxMFx1NTI5Rlx1NEZFRVx1NUZBOSB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBcdTRGRUVcdTVGQTlcdTUxRkFcdTkzMkY6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFx1NkIyMVx1NjU3OFx1NEUwRFx1OERCM1x1RkYwQ1x1NzEyMVx1NkNENVx1NEZFRVx1NUZBOVwiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2QUEyXHU2N0U1XHU1MzQwXHU1N0RGXHU4QjhBXHU1MzE2Li4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgXHU2QUEyXHU2N0U1XHU1MUZBXHU5MzJGOiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1NUI4OFx1OEI3N1x1NEUyRCAtIFx1NTM0MFx1NTdERlx1NTNEN1x1NEZERFx1OEI3N1wiLFxuICAgIGxhc3RDaGVjazogXCJcdTRFMEFcdTZCMjFcdTZBQTJcdTY3RTU6IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJcdTRFMEJcdTZCMjFcdTZBQTJcdTY3RTU6IHt0aW1lfSBcdTc5RDJcdTVGOENcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTZCNjNcdTU3MjhcdTgxRUFcdTUyRDVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1NjIxMFx1NTI5RlwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBcdTcxMjFcdTZDRDVcdTgxRUFcdTUyRDVcdTU1NTNcdTUyRDVcdUZGMENcdThBQ0JcdTYyNEJcdTUyRDVcdTY0Q0RcdTRGNUNcdTMwMDJcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThBQkZcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTlFREVcdTY0Q0FcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTVcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFx1NTcyOFx1OTcwMFx1ODk4MVx1NEZERFx1OEI3N1x1NTM0MFx1NTdERlx1NzY4NFx1NURFNlx1NEUwQVx1ODlEMlx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIFx1NzNGRVx1NTcyOFx1NTcyOFx1NTNGM1x1NEUwQlx1ODlEMlx1NTg1N1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTA3OFx1NjRDN1x1NURFNlx1NEUwQVx1ODlEMi4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTkwNzhcdTY0QzdcdTUzRjNcdTRFMEJcdTg5RDIuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgXHU1REYyXHU2MzU1XHU3MzcyXHU1REU2XHU0RTBBXHU4OUQyOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTczNzJcdTUzRjNcdTRFMEJcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTkwNzhcdTY0QzdcdThEODVcdTY2NDJcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgXHU5MDc4XHU2NEM3XHU1MUZBXHU5MzJGXHVGRjBDXHU4QUNCXHU5MUNEXHU4QTY2XCIsXG4gICAgbG9nV2luZG93OiAnXHVEODNEXHVEQ0NCIExvZ3MnLFxuICAgIGxvZ1dpbmRvd1RpdGxlOiAnXHU2NUU1XHU4QThDXHU4OTk2XHU3QTk3JyxcbiAgICBkb3dubG9hZExvZ3M6ICdcdTRFMEJcdThGMDlcdTY1RTVcdThBOEMnLFxuICAgIGNsZWFyTG9nczogJ1x1NkUwNVx1OTY2NFx1NjVFNVx1OEE4QycsXG4gICAgY2xvc2VMb2dzOiAnXHU5NURDXHU5NTg5J1xuICB9XG59OyIsICJpbXBvcnQgeyBlcyB9IGZyb20gJy4vZXMuanMnO1xuaW1wb3J0IHsgZW4gfSBmcm9tICcuL2VuLmpzJztcbmltcG9ydCB7IGZyIH0gZnJvbSAnLi9mci5qcyc7XG5pbXBvcnQgeyBydSB9IGZyb20gJy4vcnUuanMnO1xuaW1wb3J0IHsgemhIYW5zIH0gZnJvbSAnLi96aC1IYW5zLmpzJztcbmltcG9ydCB7IHpoSGFudCB9IGZyb20gJy4vemgtSGFudC5qcyc7XG5cbi8vIElkaW9tYXMgZGlzcG9uaWJsZXNcbmV4cG9ydCBjb25zdCBBVkFJTEFCTEVfTEFOR1VBR0VTID0ge1xuICBlczogeyBuYW1lOiAnRXNwYVx1MDBGMW9sJywgZmxhZzogJ1x1RDgzQ1x1RERFQVx1RDgzQ1x1RERGOCcsIGNvZGU6ICdlcycgfSxcbiAgZW46IHsgbmFtZTogJ0VuZ2xpc2gnLCBmbGFnOiAnXHVEODNDXHVEREZBXHVEODNDXHVEREY4JywgY29kZTogJ2VuJyB9LFxuICBmcjogeyBuYW1lOiAnRnJhblx1MDBFN2FpcycsIGZsYWc6ICdcdUQ4M0NcdURERUJcdUQ4M0NcdURERjcnLCBjb2RlOiAnZnInIH0sXG4gIHJ1OiB7IG5hbWU6ICdcdTA0MjBcdTA0NDNcdTA0NDFcdTA0NDFcdTA0M0FcdTA0MzhcdTA0MzknLCBmbGFnOiAnXHVEODNDXHVEREY3XHVEODNDXHVEREZBJywgY29kZTogJ3J1JyB9LFxuICB6aEhhbnM6IHsgbmFtZTogJ1x1N0I4MFx1NEY1M1x1NEUyRFx1NjU4NycsIGZsYWc6ICdcdUQ4M0NcdURERThcdUQ4M0NcdURERjMnLCBjb2RlOiAnemgtSGFucycgfSxcbiAgemhIYW50OiB7IG5hbWU6ICdcdTdFNDFcdTlBRDRcdTRFMkRcdTY1ODcnLCBmbGFnOiAnXHVEODNDXHVEREU4XHVEODNDXHVEREYzJywgY29kZTogJ3poLUhhbnQnIH1cbn07XG5cbi8vIFRvZGFzIGxhcyB0cmFkdWNjaW9uZXNcbmNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgZXMsXG4gIGVuLFxuICBmcixcbiAgcnUsXG4gIHpoSGFucyxcbiAgemhIYW50XG59O1xuXG4vLyBFc3RhZG8gZGVsIGlkaW9tYSBhY3R1YWxcbmxldCBjdXJyZW50TGFuZ3VhZ2UgPSAnZXMnO1xubGV0IGN1cnJlbnRUcmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnNbY3VycmVudExhbmd1YWdlXTtcblxuLyoqXG4gKiBEZXRlY3RhIGVsIGlkaW9tYSBkZWwgbmF2ZWdhZG9yXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGRldGVjdGFkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0QnJvd3Nlckxhbmd1YWdlKCkge1xuICBjb25zdCBicm93c2VyTGFuZyA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgfHwgJ2VzJztcblxuICAvLyBFeHRyYWVyIHNvbG8gZWwgY1x1MDBGM2RpZ28gZGVsIGlkaW9tYSAoZWo6ICdlcy1FUycgLT4gJ2VzJylcbiAgY29uc3QgbGFuZ0NvZGUgPSBicm93c2VyTGFuZy5zcGxpdCgnLScpWzBdLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gVmVyaWZpY2FyIHNpIHRlbmVtb3Mgc29wb3J0ZSBwYXJhIGVzdGUgaWRpb21hXG4gIGlmICh0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdKSB7XG4gICAgcmV0dXJuIGxhbmdDb2RlO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgYSBlc3BhXHUwMEYxb2wgcG9yIGRlZmVjdG9cbiAgcmV0dXJuICdlcyc7XG59XG5cbi8qKlxuICogT2J0aWVuZSBlbCBpZGlvbWEgZ3VhcmRhZG8gKGRlc2hhYmlsaXRhZG8gLSBubyB1c2FyIGxvY2FsU3RvcmFnZSlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFNpZW1wcmUgcmV0b3JuYSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTYXZlZExhbmd1YWdlKCkge1xuICAvLyBObyB1c2FyIGxvY2FsU3RvcmFnZSAtIHNpZW1wcmUgcmV0b3JuYXIgbnVsbFxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBHdWFyZGEgZWwgaWRpb21hIChkZXNoYWJpbGl0YWRvIC0gbm8gdXNhciBsb2NhbFN0b3JhZ2UpXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ0NvZGUgLSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYXZlTGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgLy8gTm8gZ3VhcmRhciBlbiBsb2NhbFN0b3JhZ2UgLSBmdW5jaVx1MDBGM24gZGVzaGFiaWxpdGFkYVxuICByZXR1cm47XG59XG5cbi8qKlxuICogSW5pY2lhbGl6YSBlbCBzaXN0ZW1hIGRlIGlkaW9tYXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENcdTAwRjNkaWdvIGRlbCBpZGlvbWEgaW5pY2lhbGl6YWRvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplTGFuZ3VhZ2UoKSB7XG4gIC8vIFByaW9yaWRhZDogZ3VhcmRhZG8gPiBuYXZlZ2Fkb3IgPiBlc3BhXHUwMEYxb2xcbiAgY29uc3Qgc2F2ZWRMYW5nID0gZ2V0U2F2ZWRMYW5ndWFnZSgpO1xuICBjb25zdCBicm93c2VyTGFuZyA9IGRldGVjdEJyb3dzZXJMYW5ndWFnZSgpO1xuXG4gIGxldCBzZWxlY3RlZExhbmcgPSAnZXMnOyAvLyBmYWxsYmFjayBwb3IgZGVmZWN0b1xuXG4gIGlmIChzYXZlZExhbmcgJiYgdHJhbnNsYXRpb25zW3NhdmVkTGFuZ10pIHtcbiAgICBzZWxlY3RlZExhbmcgPSBzYXZlZExhbmc7XG4gIH0gZWxzZSBpZiAoYnJvd3NlckxhbmcgJiYgdHJhbnNsYXRpb25zW2Jyb3dzZXJMYW5nXSkge1xuICAgIHNlbGVjdGVkTGFuZyA9IGJyb3dzZXJMYW5nO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2Uoc2VsZWN0ZWRMYW5nKTtcbiAgcmV0dXJuIHNlbGVjdGVkTGFuZztcbn1cblxuLyoqXG4gKiBDYW1iaWEgZWwgaWRpb21hIGFjdHVhbFxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgaWYgKCF0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdKSB7XG4gICAgY29uc29sZS53YXJuKGBJZGlvbWEgJyR7bGFuZ0NvZGV9JyBubyBkaXNwb25pYmxlLiBVc2FuZG8gJyR7Y3VycmVudExhbmd1YWdlfSdgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjdXJyZW50TGFuZ3VhZ2UgPSBsYW5nQ29kZTtcbiAgY3VycmVudFRyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9uc1tsYW5nQ29kZV07XG4gIHNhdmVMYW5ndWFnZShsYW5nQ29kZSk7XG5cbiAgLy8gRW1pdGlyIGV2ZW50byBwZXJzb25hbGl6YWRvIHBhcmEgcXVlIGxvcyBtXHUwMEYzZHVsb3MgcHVlZGFuIHJlYWNjaW9uYXJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5DdXN0b21FdmVudCkge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ2xhbmd1YWdlQ2hhbmdlZCcsIHtcbiAgICAgIGRldGFpbDogeyBsYW5ndWFnZTogbGFuZ0NvZGUsIHRyYW5zbGF0aW9uczogY3VycmVudFRyYW5zbGF0aW9ucyB9XG4gICAgfSkpO1xuICB9XG59XG5cbi8qKlxuICogT2J0aWVuZSBlbCBpZGlvbWEgYWN0dWFsXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGFjdHVhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudExhbmd1YWdlKCkge1xuICByZXR1cm4gY3VycmVudExhbmd1YWdlO1xufVxuXG4vKipcbiAqIE9idGllbmUgbGFzIHRyYWR1Y2Npb25lcyBhY3R1YWxlc1xuICogQHJldHVybnMge29iamVjdH0gT2JqZXRvIGNvbiB0b2RhcyBsYXMgdHJhZHVjY2lvbmVzIGRlbCBpZGlvbWEgYWN0dWFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VHJhbnNsYXRpb25zKCkge1xuICByZXR1cm4gY3VycmVudFRyYW5zbGF0aW9ucztcbn1cblxuLyoqXG4gKiBPYnRpZW5lIHVuIHRleHRvIHRyYWR1Y2lkbyB1c2FuZG8gbm90YWNpXHUwMEYzbiBkZSBwdW50b1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIENsYXZlIGRlbCB0ZXh0byAoZWo6ICdpbWFnZS50aXRsZScsICdjb21tb24uY2FuY2VsJylcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBQYXJcdTAwRTFtZXRyb3MgcGFyYSBpbnRlcnBvbGFjaVx1MDBGM24gKGVqOiB7Y291bnQ6IDV9KVxuICogQHJldHVybnMge3N0cmluZ30gVGV4dG8gdHJhZHVjaWRvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0KGtleSwgcGFyYW1zID0ge30pIHtcbiAgY29uc3Qga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICBsZXQgdmFsdWUgPSBjdXJyZW50VHJhbnNsYXRpb25zO1xuXG4gIC8vIE5hdmVnYXIgcG9yIGxhIGVzdHJ1Y3R1cmEgZGUgb2JqZXRvc1xuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIGsgaW4gdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWVba107XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihgQ2xhdmUgZGUgdHJhZHVjY2lcdTAwRjNuIG5vIGVuY29udHJhZGE6ICcke2tleX0nYCk7XG4gICAgICByZXR1cm4ga2V5OyAvLyBSZXRvcm5hciBsYSBjbGF2ZSBjb21vIGZhbGxiYWNrXG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICBjb25zb2xlLndhcm4oYENsYXZlIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlcyBzdHJpbmc6ICcke2tleX0nYCk7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIC8vIEludGVycG9sYXIgcGFyXHUwMEUxbWV0cm9zXG4gIHJldHVybiBpbnRlcnBvbGF0ZSh2YWx1ZSwgcGFyYW1zKTtcbn1cblxuLyoqXG4gKiBJbnRlcnBvbGEgcGFyXHUwMEUxbWV0cm9zIGVuIHVuIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBUZXh0byBjb24gbWFyY2Fkb3JlcyB7a2V5fVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAtIFBhclx1MDBFMW1ldHJvcyBhIGludGVycG9sYXJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRleHRvIGNvbiBwYXJcdTAwRTFtZXRyb3MgaW50ZXJwb2xhZG9zXG4gKi9cbmZ1bmN0aW9uIGludGVycG9sYXRlKHRleHQsIHBhcmFtcykge1xuICBpZiAoIXBhcmFtcyB8fCBPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csIChtYXRjaCwga2V5KSA9PiB7XG4gICAgcmV0dXJuIHBhcmFtc1trZXldICE9PSB1bmRlZmluZWQgPyBwYXJhbXNba2V5XSA6IG1hdGNoO1xuICB9KTtcbn1cblxuLyoqXG4gKiBPYnRpZW5lIHRyYWR1Y2Npb25lcyBkZSB1bmEgc2VjY2lcdTAwRjNuIGVzcGVjXHUwMEVEZmljYVxuICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBTZWNjaVx1MDBGM24gKGVqOiAnaW1hZ2UnLCAnbGF1bmNoZXInLCAnY29tbW9uJylcbiAqIEByZXR1cm5zIHtvYmplY3R9IE9iamV0byBjb24gbGFzIHRyYWR1Y2Npb25lcyBkZSBsYSBzZWNjaVx1MDBGM25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlY3Rpb24oc2VjdGlvbikge1xuICBpZiAoY3VycmVudFRyYW5zbGF0aW9uc1tzZWN0aW9uXSkge1xuICAgIHJldHVybiBjdXJyZW50VHJhbnNsYXRpb25zW3NlY3Rpb25dO1xuICB9XG5cbiAgY29uc29sZS53YXJuKGBTZWNjaVx1MDBGM24gZGUgdHJhZHVjY2lcdTAwRjNuIG5vIGVuY29udHJhZGE6ICcke3NlY3Rpb259J2ApO1xuICByZXR1cm4ge307XG59XG5cbi8qKlxuICogVmVyaWZpY2Egc2kgdW4gaWRpb21hIGVzdFx1MDBFMSBkaXNwb25pYmxlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ0NvZGUgLSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBzaSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMYW5ndWFnZUF2YWlsYWJsZShsYW5nQ29kZSkge1xuICByZXR1cm4gISF0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdO1xufVxuXG4vLyBJbmljaWFsaXphciBhdXRvbVx1MDBFMXRpY2FtZW50ZSBhbCBjYXJnYXIgZWwgbVx1MDBGM2R1bG9cbmluaXRpYWxpemVMYW5ndWFnZSgpO1xuIiwgImltcG9ydCB7IGdldFNlY3Rpb24gfSBmcm9tICcuLi9sb2NhbGVzL2luZGV4LmpzJztcblxuZXhwb3J0IGNvbnN0IExBVU5DSEVSX0NPTkZJRyA9IHtcbiAgUkFXX0JBU0U6ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vQWxhcmlzY28vV1BsYWNlLUF1dG9CT1QvcmVmcy9oZWFkcy9tYWluJyxcbiAgUkVGUkVTSF9JTlRFUlZBTDogNjAwMDAsIC8vIDEgbWludXRvXG4gIFRIRU1FOiB7XG4gICAgcHJpbWFyeTogJyMwMDAwMDAnLFxuICAgIHNlY29uZGFyeTogJyMxMTExMTEnLFxuICAgIGFjY2VudDogJyMyMjIyMjInLFxuICAgIHRleHQ6ICcjZmZmZmZmJyxcbiAgICBoaWdobGlnaHQ6ICcjNzc1Y2UzJyxcbiAgICBzdWNjZXNzOiAnIzAwZmYwMCcsXG4gICAgZXJyb3I6ICcjZmYwMDAwJ1xuICB9XG59O1xuXG4vLyBFc3RhIGZ1bmNpXHUwMEYzbiBhaG9yYSByZXRvcm5hIGxhcyB0cmFkdWNjaW9uZXMgZGluXHUwMEUxbWljYW1lbnRlXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF1bmNoZXJUZXh0cygpIHtcbiAgcmV0dXJuIGdldFNlY3Rpb24oJ2xhdW5jaGVyJyk7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIG9idGVuZXIgdGV4dG9zIGNvbiBwYXJcdTAwRTFtZXRyb3NcbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXVuY2hlclRleHQoa2V5LCBwYXJhbXMgPSB7fSkge1xuICBjb25zdCB0ZXh0cyA9IGdldExhdW5jaGVyVGV4dHMoKTtcbiAgbGV0IHRleHQgPSB0ZXh0c1trZXldIHx8IGtleTtcbiAgXG4gIC8vIEludGVycG9sYXIgcGFyXHUwMEUxbWV0cm9zXG4gIGlmIChwYXJhbXMgJiYgT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPiAwKSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csIChtYXRjaCwgcGFyYW1LZXkpID0+IHtcbiAgICAgIHJldHVybiBwYXJhbXNbcGFyYW1LZXldICE9PSB1bmRlZmluZWQgPyBwYXJhbXNbcGFyYW1LZXldIDogbWF0Y2g7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHJldHVybiB0ZXh0O1xufVxuXG4vLyBNYW50ZW5lciBMQVVOQ0hFUl9URVhUUyBwb3IgY29tcGF0aWJpbGlkYWQgcGVybyBtYXJjYXJsbyBjb21vIGRlcHJlY2F0ZWRcbmV4cG9ydCBjb25zdCBMQVVOQ0hFUl9URVhUUyA9IHtcbiAgZ2V0IGVzKCkge1xuICAgIGNvbnNvbGUud2FybignTEFVTkNIRVJfVEVYVFMuZXMgZXN0XHUwMEUxIGRlcHJlY2F0ZWQuIFVzYSBnZXRMYXVuY2hlclRleHRzKCkgZW4gc3UgbHVnYXIuJyk7XG4gICAgcmV0dXJuIGdldExhdW5jaGVyVGV4dHMoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGxhdW5jaGVyU3RhdGUgPSB7XG4gIG1lOiBudWxsLFxuICBoZWFsdGg6IG51bGwsXG4gIHJlZnJlc2hUaW1lcjogbnVsbCxcbiAgc2VsZWN0ZWRCb3Q6IG51bGxcbn07XG4iLCAiaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vY29yZS9sb2dnZXIuanMnO1xuXG4vKiBnbG9iYWwgQmxvYiwgVVJMICovXG5cbi8qKlxuICogVmVudGFuYSBkZSBsb2dzIHVuaWZpY2FkYSBwYXJhIHRvZG9zIGxvcyBib3RzXG4gKiBDYXJhY3Rlclx1MDBFRHN0aWNhczpcbiAqIC0gTXVlc3RyYSBsb2dzIGVuIHRpZW1wbyByZWFsXG4gKiAtIFJlZGltZW5zaW9uYWJsZSBtZWRpYW50ZSBhcnJhc3RyZVxuICogLSBDb250cm9sZXMgcGFyYSBjZXJyYXIgeSBkZXNjYXJnYXIgbG9nc1xuICogLSBQZXJzaXN0ZW5jaWEgZGVsIGVzdGFkbyBlbnRyZSBzZXNpb25lc1xuICogLSBJbnRlZ3JhY2lcdTAwRjNuIGNvbiB0b2RvcyBsb3MgYm90c1xuICovXG5cbmNsYXNzIExvZ1dpbmRvdyB7XG4gIGNvbnN0cnVjdG9yKGJvdE5hbWUgPSAnQm90Jykge1xuICAgIHRoaXMuYm90TmFtZSA9IGJvdE5hbWU7XG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmxvZ3MgPSBbXTtcbiAgICB0aGlzLm1heExvZ3MgPSAxMDAwOyAvLyBMXHUwMEVEbWl0ZSBkZSBsb2dzIHBhcmEgZXZpdGFyIHByb2JsZW1hcyBkZSBtZW1vcmlhXG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMubG9nQ29udGVudCA9IG51bGw7XG4gICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZXNpemVIYW5kbGUgPSBudWxsO1xuICAgIHRoaXMub3JpZ2luYWxDb25zb2xlID0ge307XG4gICAgXG4gICAgLy8gQ29uZmlndXJhY2lcdTAwRjNuIHBvciBkZWZlY3RvXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICB3aWR0aDogNjAwLFxuICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICB4OiB3aW5kb3cuaW5uZXJXaWR0aCAtIDYyMCxcbiAgICAgIHk6IDIwLFxuICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICB9O1xuICAgIFxuICAgIHRoaXMubG9hZENvbmZpZygpO1xuICAgIHRoaXMuY3JlYXRlV2luZG93KCk7XG4gICAgdGhpcy5zZXR1cExvZ0ludGVyY2VwdGlvbigpO1xuICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcmdhIGxhIGNvbmZpZ3VyYWNpXHUwMEYzbiBndWFyZGFkYSBkZWwgbG9jYWxTdG9yYWdlXG4gICAqL1xuICBsb2FkQ29uZmlnKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGB3cGxhY2UtbG9nLXdpbmRvdy0ke3RoaXMuYm90TmFtZX1gKTtcbiAgICAgIGlmIChzYXZlZCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgLi4udGhpcy5jb25maWcsIC4uLkpTT04ucGFyc2Uoc2F2ZWQpIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnRXJyb3IgY2FyZ2FuZG8gY29uZmlndXJhY2lcdTAwRjNuIGRlIHZlbnRhbmEgZGUgbG9nczonLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEd1YXJkYSBsYSBjb25maWd1cmFjaVx1MDBGM24gYWN0dWFsIGVuIGxvY2FsU3RvcmFnZVxuICAgKi9cbiAgc2F2ZUNvbmZpZygpIHtcbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHdwbGFjZS1sb2ctd2luZG93LSR7dGhpcy5ib3ROYW1lfWAsIEpTT04uc3RyaW5naWZ5KHRoaXMuY29uZmlnKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnRXJyb3IgZ3VhcmRhbmRvIGNvbmZpZ3VyYWNpXHUwMEYzbiBkZSB2ZW50YW5hIGRlIGxvZ3M6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhIGxhIGVzdHJ1Y3R1cmEgSFRNTCBkZSBsYSB2ZW50YW5hXG4gICAqL1xuICBjcmVhdGVXaW5kb3coKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUgPSAnd3BsYWNlLWxvZy13aW5kb3cnO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICBsZWZ0OiAke3RoaXMuY29uZmlnLnh9cHg7XG4gICAgICB0b3A6ICR7dGhpcy5jb25maWcueX1weDtcbiAgICAgIHdpZHRoOiAke3RoaXMuY29uZmlnLndpZHRofXB4O1xuICAgICAgaGVpZ2h0OiAke3RoaXMuY29uZmlnLmhlaWdodH1weDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC45KTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIHotaW5kZXg6IDEwMDAwMTtcbiAgICAgIGRpc3BsYXk6ICR7dGhpcy5jb25maWcudmlzaWJsZSA/ICdmbGV4JyA6ICdub25lJ307XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpO1xuICAgICAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gICAgICBmb250LWZhbWlseTogJ0NvbnNvbGFzJywgJ01vbmFjbycsICdDb3VyaWVyIE5ldycsIG1vbm9zcGFjZTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgcmVzaXplOiBub25lO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBgO1xuXG4gICAgLy8gSGVhZGVyIGNvbiB0XHUwMEVEdHVsbyB5IGNvbnRyb2xlc1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlYWRlci5jbGFzc05hbWUgPSAnbG9nLXdpbmRvdy1oZWFkZXInO1xuICAgIGhlYWRlci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDdweCA3cHggMCAwO1xuICAgIGA7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gYFx1RDgzRFx1RENDQiBMb2dzIC0gJHt0aGlzLmJvdE5hbWV9YDtcbiAgICB0aXRsZS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogI2UyZThmMDtcbiAgICBgO1xuXG4gICAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250cm9scy5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogOHB4O1xuICAgIGA7XG5cbiAgICAvLyBCb3RcdTAwRjNuIGRlIGRlc2NhcmdhXG4gICAgY29uc3QgZG93bmxvYWRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkb3dubG9hZEJ0bi5pbm5lckhUTUwgPSAnXHVEODNEXHVEQ0JFJztcbiAgICBkb3dubG9hZEJ0bi50aXRsZSA9ICdEZXNjYXJnYXIgbG9ncyc7XG4gICAgZG93bmxvYWRCdG4uc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMzQsIDE5NywgOTQsIDAuOCk7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XG4gICAgYDtcbiAgICBkb3dubG9hZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgZG93bmxvYWRCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDM0LCAxOTcsIDk0LCAxKSc7XG4gICAgfSk7XG4gICAgZG93bmxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGRvd25sb2FkQnRuLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgzNCwgMTk3LCA5NCwgMC44KSc7XG4gICAgfSk7XG4gICAgZG93bmxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmRvd25sb2FkTG9ncygpKTtcblxuICAgIC8vIEJvdFx1MDBGM24gZGUgY2VycmFyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnXHUyNzE1JztcbiAgICBjbG9zZUJ0bi50aXRsZSA9ICdDZXJyYXIgdmVudGFuYSc7XG4gICAgY2xvc2VCdG4uc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjM5LCA2OCwgNjgsIDAuOCk7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XG4gICAgYDtcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgY2xvc2VCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDIzOSwgNjgsIDY4LCAxKSc7XG4gICAgfSk7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGNsb3NlQnRuLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyMzksIDY4LCA2OCwgMC44KSc7XG4gICAgfSk7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG5cbiAgICBjb250cm9scy5hcHBlbmRDaGlsZChkb3dubG9hZEJ0bik7XG4gICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNvbnRyb2xzKTtcblxuICAgIC8vIENvbnRlbmlkbyBkZSBsb2dzXG4gICAgdGhpcy5sb2dDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5sb2dDb250ZW50LmNsYXNzTmFtZSA9ICdsb2ctd2luZG93LWNvbnRlbnQnO1xuICAgIHRoaXMubG9nQ29udGVudC5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgZmxleDogMTtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgICBgO1xuXG4gICAgLy8gSGFuZGxlIGRlIHJlZGltZW5zaW9uYW1pZW50b1xuICAgIHRoaXMucmVzaXplSGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZXNpemVIYW5kbGUuY2xhc3NOYW1lID0gJ2xvZy13aW5kb3ctcmVzaXplLWhhbmRsZSc7XG4gICAgdGhpcy5yZXNpemVIYW5kbGUuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICBjdXJzb3I6IHNlLXJlc2l6ZTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgtNDVkZWcsIHRyYW5zcGFyZW50IDMwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjMpIDMwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjMpIDcwJSwgdHJhbnNwYXJlbnQgNzAlKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAgMCA4cHggMDtcbiAgICBgO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxvZ0NvbnRlbnQpO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVzaXplSGFuZGxlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgIC8vIENvbmZpZ3VyYXIgYXJyYXN0cmUgZGUgdmVudGFuYVxuICAgIHRoaXMuc2V0dXBEcmFnZ2luZyhoZWFkZXIpO1xuICAgIC8vIENvbmZpZ3VyYXIgcmVkaW1lbnNpb25hbWllbnRvXG4gICAgdGhpcy5zZXR1cFJlc2l6aW5nKCk7XG5cbiAgICB0aGlzLmlzVmlzaWJsZSA9IHRoaXMuY29uZmlnLnZpc2libGU7XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJhIGVsIGFycmFzdHJlIGRlIGxhIHZlbnRhbmFcbiAgICovXG4gIHNldHVwRHJhZ2dpbmcoaGVhZGVyKSB7XG4gICAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBsZXQgZHJhZ09mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuXG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0JVVFRPTicpIHJldHVybjtcbiAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgZHJhZ09mZnNldC54ID0gZS5jbGllbnRYIC0gdGhpcy5jb250YWluZXIub2Zmc2V0TGVmdDtcbiAgICAgIGRyYWdPZmZzZXQueSA9IGUuY2xpZW50WSAtIHRoaXMuY29udGFpbmVyLm9mZnNldFRvcDtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZURyYWcpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BEcmFnKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZURyYWcgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFpc0RyYWdnaW5nKSByZXR1cm47XG4gICAgICBjb25zdCBuZXdYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4od2luZG93LmlubmVyV2lkdGggLSB0aGlzLmNvbnRhaW5lci5vZmZzZXRXaWR0aCwgZS5jbGllbnRYIC0gZHJhZ09mZnNldC54KSk7XG4gICAgICBjb25zdCBuZXdZID0gTWF0aC5tYXgoMCwgTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0LCBlLmNsaWVudFkgLSBkcmFnT2Zmc2V0LnkpKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBuZXdYICsgJ3B4JztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IG5ld1kgKyAncHgnO1xuICAgICAgdGhpcy5jb25maWcueCA9IG5ld1g7XG4gICAgICB0aGlzLmNvbmZpZy55ID0gbmV3WTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RvcERyYWcgPSAoKSA9PiB7XG4gICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVEcmFnKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRHJhZyk7XG4gICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyYSBlbCByZWRpbWVuc2lvbmFtaWVudG8gZGUgbGEgdmVudGFuYVxuICAgKi9cbiAgc2V0dXBSZXNpemluZygpIHtcbiAgICBsZXQgaXNSZXNpemluZyA9IGZhbHNlO1xuICAgIGxldCBzdGFydFgsIHN0YXJ0WSwgc3RhcnRXaWR0aCwgc3RhcnRIZWlnaHQ7XG5cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICAgaXNSZXNpemluZyA9IHRydWU7XG4gICAgICBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgICBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgICBzdGFydFdpZHRoID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRhaW5lcikud2lkdGgsIDEwKTtcbiAgICAgIHN0YXJ0SGVpZ2h0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRhaW5lcikuaGVpZ2h0LCAxMCk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVSZXNpemUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BSZXNpemUpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKGUpID0+IHtcbiAgICAgIGlmICghaXNSZXNpemluZykgcmV0dXJuO1xuICAgICAgY29uc3QgbmV3V2lkdGggPSBNYXRoLm1heCgzMDAsIHN0YXJ0V2lkdGggKyBlLmNsaWVudFggLSBzdGFydFgpO1xuICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gTWF0aC5tYXgoMjAwLCBzdGFydEhlaWdodCArIGUuY2xpZW50WSAtIHN0YXJ0WSk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IG5ld1dpZHRoICsgJ3B4JztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArICdweCc7XG4gICAgICB0aGlzLmNvbmZpZy53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgdGhpcy5jb25maWcuaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgIH07XG5cbiAgICBjb25zdCBzdG9wUmVzaXplID0gKCkgPT4ge1xuICAgICAgaXNSZXNpemluZyA9IGZhbHNlO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlUmVzaXplKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wUmVzaXplKTtcbiAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJhIGxhIGludGVyY2VwdGFjaVx1MDBGM24gZGUgbG9ncyBkZSBjb25zb2xhXG4gICAqL1xuICBzZXR1cExvZ0ludGVyY2VwdGlvbigpIHtcbiAgICAvLyBHdWFyZGFyIHJlZmVyZW5jaWFzIG9yaWdpbmFsZXNcbiAgICB0aGlzLm9yaWdpbmFsQ29uc29sZSA9IHtcbiAgICAgIGxvZzogY29uc29sZS5sb2csXG4gICAgICBpbmZvOiBjb25zb2xlLmluZm8sXG4gICAgICB3YXJuOiBjb25zb2xlLndhcm4sXG4gICAgICBlcnJvcjogY29uc29sZS5lcnJvcixcbiAgICAgIGRlYnVnOiBjb25zb2xlLmRlYnVnXG4gICAgfTtcblxuICAgIC8vIEludGVyY2VwdGFyIGNvbnNvbGUubG9nXG4gICAgY29uc29sZS5sb2cgPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgdGhpcy5hZGRMb2coJ2xvZycsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvLyBJbnRlcmNlcHRhciBjb25zb2xlLmluZm9cbiAgICBjb25zb2xlLmluZm8gPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAgIHRoaXMuYWRkTG9nKCdpbmZvJywgYXJncyk7XG4gICAgfTtcblxuICAgIC8vIEludGVyY2VwdGFyIGNvbnNvbGUud2FyblxuICAgIGNvbnNvbGUud2FybiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgdGhpcy5hZGRMb2coJ3dhcm4nLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgLy8gSW50ZXJjZXB0YXIgY29uc29sZS5lcnJvclxuICAgIGNvbnNvbGUuZXJyb3IgPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICB0aGlzLmFkZExvZygnZXJyb3InLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgLy8gSW50ZXJjZXB0YXIgY29uc29sZS5kZWJ1Z1xuICAgIGNvbnNvbGUuZGVidWcgPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICB0aGlzLmFkZExvZygnZGVidWcnLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFcdTAwRjFhZGUgdW4gbG9nIGEgbGEgdmVudGFuYVxuICAgKi9cbiAgYWRkTG9nKHR5cGUsIGFyZ3MpIHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBhcmdzLm1hcChhcmcgPT4gXG4gICAgICB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGFyZywgbnVsbCwgMikgOiBTdHJpbmcoYXJnKVxuICAgICkuam9pbignICcpO1xuXG4gICAgY29uc3QgbG9nRW50cnkgPSB7XG4gICAgICB0aW1lc3RhbXAsXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHJhdzogYXJnc1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ3MucHVzaChsb2dFbnRyeSk7XG5cbiAgICAvLyBMaW1pdGFyIG5cdTAwRkFtZXJvIGRlIGxvZ3NcbiAgICBpZiAodGhpcy5sb2dzLmxlbmd0aCA+IHRoaXMubWF4TG9ncykge1xuICAgICAgdGhpcy5sb2dzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgLy8gQWN0dWFsaXphciBVSSBzaSBlc3RcdTAwRTEgdmlzaWJsZVxuICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgdGhpcy51cGRhdGVMb2dEaXNwbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGl6YSBsYSB2aXN1YWxpemFjaVx1MDBGM24gZGUgbG9nc1xuICAgKi9cbiAgdXBkYXRlTG9nRGlzcGxheSgpIHtcbiAgICBpZiAoIXRoaXMubG9nQ29udGVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbG9nSHRtbCA9IHRoaXMubG9ncy5tYXAoZW50cnkgPT4ge1xuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmdldExvZ0NvbG9yKGVudHJ5LnR5cGUpO1xuICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7Y29sb3J9OyBtYXJnaW4tYm90dG9tOiAycHg7XCI+WyR7ZW50cnkudGltZXN0YW1wfV0gJHtlbnRyeS5tZXNzYWdlfTwvZGl2PmA7XG4gICAgfSkuam9pbignJyk7XG5cbiAgICB0aGlzLmxvZ0NvbnRlbnQuaW5uZXJIVE1MID0gbG9nSHRtbDtcbiAgICBcbiAgICAvLyBBdXRvLXNjcm9sbCBhbCBmaW5hbFxuICAgIHRoaXMubG9nQ29udGVudC5zY3JvbGxUb3AgPSB0aGlzLmxvZ0NvbnRlbnQuc2Nyb2xsSGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIE9idGllbmUgZWwgY29sb3IgcGFyYSBjYWRhIHRpcG8gZGUgbG9nXG4gICAqL1xuICBnZXRMb2dDb2xvcih0eXBlKSB7XG4gICAgY29uc3QgY29sb3JzID0ge1xuICAgICAgbG9nOiAnI2UyZThmMCcsXG4gICAgICBpbmZvOiAnIzYwYTVmYScsXG4gICAgICB3YXJuOiAnI2ZiYmYyNCcsXG4gICAgICBlcnJvcjogJyNmODcxNzEnLFxuICAgICAgZGVidWc6ICcjYTc4YmZhJ1xuICAgIH07XG4gICAgcmV0dXJuIGNvbG9yc1t0eXBlXSB8fCBjb2xvcnMubG9nO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NhcmdhIGxvcyBsb2dzIGNvbW8gYXJjaGl2b1xuICAgKi9cbiAgZG93bmxvYWRMb2dzKCkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgY29uc3QgdGltZVN0ciA9IG5vdy50b1RpbWVTdHJpbmcoKS5zcGxpdCgnICcpWzBdLnJlcGxhY2UoLzovZywgJy0nKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGBsb2dfJHt0aGlzLmJvdE5hbWV9XyR7ZGF0ZVN0cn1fJHt0aW1lU3RyfS5sb2dgO1xuXG4gICAgY29uc3QgbG9nVGV4dCA9IHRoaXMubG9ncy5tYXAoZW50cnkgPT4gXG4gICAgICBgWyR7ZW50cnkudGltZXN0YW1wfV0gWyR7ZW50cnkudHlwZS50b1VwcGVyQ2FzZSgpfV0gJHtlbnRyeS5tZXNzYWdlfWBcbiAgICApLmpvaW4oJ1xcbicpO1xuXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtsb2dUZXh0XSwgeyB0eXBlOiAndGV4dC9wbGFpbicgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG5cbiAgICBsb2coYFx1RDgzRFx1RENFNSBMb2dzIGRlc2NhcmdhZG9zIGNvbW86ICR7ZmlsZW5hbWV9YCk7XG4gIH1cblxuICAvKipcbiAgICogTXVlc3RyYSBsYSB2ZW50YW5hIGRlIGxvZ3NcbiAgICovXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgdGhpcy5jb25maWcudmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLnVwZGF0ZUxvZ0Rpc3BsYXkoKTtcbiAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPY3VsdGEgbGEgdmVudGFuYSBkZSBsb2dzXG4gICAqL1xuICBoaWRlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLmNvbmZpZy52aXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWx0ZXJuYSBsYSB2aXNpYmlsaWRhZCBkZSBsYSB2ZW50YW5hXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpbXBpYSB0b2RvcyBsb3MgbG9nc1xuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5sb2dzID0gW107XG4gICAgaWYgKHRoaXMubG9nQ29udGVudCkge1xuICAgICAgdGhpcy5sb2dDb250ZW50LmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmEgbG9zIGV2ZW50IGxpc3RlbmVycyBnbG9iYWxlc1xuICAgKi9cbiAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBBanVzdGFyIHBvc2ljaVx1MDBGM24gYWwgcmVkaW1lbnNpb25hciB2ZW50YW5hXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBtYXhYID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLmNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgbWF4WSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuY29udGFpbmVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy54ID4gbWF4WCkge1xuICAgICAgICAgIHRoaXMuY29uZmlnLnggPSBNYXRoLm1heCgwLCBtYXhYKTtcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gdGhpcy5jb25maWcueCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy55ID4gbWF4WSkge1xuICAgICAgICAgIHRoaXMuY29uZmlnLnkgPSBNYXRoLm1heCgwLCBtYXhZKTtcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0aGlzLmNvbmZpZy55ICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJ1eWUgbGEgdmVudGFuYSB5IHJlc3RhdXJhIGNvbnNvbGUgb3JpZ2luYWxcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gUmVzdGF1cmFyIGNvbnNvbGUgb3JpZ2luYWxcbiAgICBpZiAodGhpcy5vcmlnaW5hbENvbnNvbGUubG9nKSB7XG4gICAgICBjb25zb2xlLmxvZyA9IHRoaXMub3JpZ2luYWxDb25zb2xlLmxvZztcbiAgICAgIGNvbnNvbGUuaW5mbyA9IHRoaXMub3JpZ2luYWxDb25zb2xlLmluZm87XG4gICAgICBjb25zb2xlLndhcm4gPSB0aGlzLm9yaWdpbmFsQ29uc29sZS53YXJuO1xuICAgICAgY29uc29sZS5lcnJvciA9IHRoaXMub3JpZ2luYWxDb25zb2xlLmVycm9yO1xuICAgICAgY29uc29sZS5kZWJ1ZyA9IHRoaXMub3JpZ2luYWxDb25zb2xlLmRlYnVnO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZXIgdmVudGFuYSBkZWwgRE9NXG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLmxvZ0NvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMubG9ncyA9IFtdO1xuICB9XG59XG5cbi8vIEluc3RhbmNpYSBnbG9iYWwgcGFyYSBnZXN0aW9uYXIgdmVudGFuYXMgZGUgbG9nc1xud2luZG93Ll9fd3BsYWNlTG9nV2luZG93cyA9IHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3MgfHwge307XG5cbi8qKlxuICogQ3JlYSBvIG9idGllbmUgdW5hIHZlbnRhbmEgZGUgbG9ncyBwYXJhIHVuIGJvdCBlc3BlY1x1MDBFRGZpY29cbiAqIEBwYXJhbSB7c3RyaW5nfSBib3ROYW1lIC0gTm9tYnJlIGRlbCBib3RcbiAqIEByZXR1cm5zIHtMb2dXaW5kb3d9IC0gSW5zdGFuY2lhIGRlIGxhIHZlbnRhbmEgZGUgbG9nc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9nV2luZG93KGJvdE5hbWUpIHtcbiAgaWYgKCF3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzW2JvdE5hbWVdKSB7XG4gICAgd2luZG93Ll9fd3BsYWNlTG9nV2luZG93c1tib3ROYW1lXSA9IG5ldyBMb2dXaW5kb3coYm90TmFtZSk7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3NbYm90TmFtZV07XG59XG5cbi8qKlxuICogT2J0aWVuZSBsYSB2ZW50YW5hIGRlIGxvZ3MgZGUgdW4gYm90IGVzcGVjXHUwMEVEZmljb1xuICogQHBhcmFtIHtzdHJpbmd9IGJvdE5hbWUgLSBOb21icmUgZGVsIGJvdFxuICogQHJldHVybnMge0xvZ1dpbmRvd3xudWxsfSAtIEluc3RhbmNpYSBkZSBsYSB2ZW50YW5hIGRlIGxvZ3MgbyBudWxsIHNpIG5vIGV4aXN0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9nV2luZG93KGJvdE5hbWUpIHtcbiAgcmV0dXJuIHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3NbYm90TmFtZV0gfHwgbnVsbDtcbn1cblxuLyoqXG4gKiBEZXN0cnV5ZSBsYSB2ZW50YW5hIGRlIGxvZ3MgZGUgdW4gYm90IGVzcGVjXHUwMEVEZmljb1xuICogQHBhcmFtIHtzdHJpbmd9IGJvdE5hbWUgLSBOb21icmUgZGVsIGJvdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUxvZ1dpbmRvdyhib3ROYW1lKSB7XG4gIGlmICh3aW5kb3cuX193cGxhY2VMb2dXaW5kb3dzW2JvdE5hbWVdKSB7XG4gICAgd2luZG93Ll9fd3BsYWNlTG9nV2luZG93c1tib3ROYW1lXS5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3NbYm90TmFtZV07XG4gIH1cbn1cblxuLyoqXG4gKiBEZXN0cnV5ZSB0b2RhcyBsYXMgdmVudGFuYXMgZGUgbG9nc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUFsbExvZ1dpbmRvd3MoKSB7XG4gIE9iamVjdC5rZXlzKHdpbmRvdy5fX3dwbGFjZUxvZ1dpbmRvd3MpLmZvckVhY2goYm90TmFtZSA9PiB7XG4gICAgZGVzdHJveUxvZ1dpbmRvdyhib3ROYW1lKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IExvZ1dpbmRvdyB9OyIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IGNyZWF0ZVNoYWRvd1Jvb3QsIG1ha2VEcmFnZ2FibGUgfSBmcm9tIFwiLi4vY29yZS91aS11dGlscy5qc1wiO1xuaW1wb3J0IHsgbGF1bmNoZXJTdGF0ZSwgTEFVTkNIRVJfQ09ORklHLCBnZXRMYXVuY2hlclRleHRzIH0gZnJvbSBcIi4vY29uZmlnLmpzXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50TGFuZ3VhZ2UsIHQgfSBmcm9tIFwiLi4vbG9jYWxlcy9pbmRleC5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlTG9nV2luZG93IH0gZnJvbSBcIi4uL2xvZ193aW5kb3cvaW5kZXguanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhdW5jaGVyVUkoeyBcbiAgb25TZWxlY3RCb3QsIFxuICBvbkxhdW5jaFxufSkge1xuICBsb2coJ1x1RDgzQ1x1REY5Qlx1RkUwRiBDcmVhbmRvIGludGVyZmF6IGRlbCBMYXVuY2hlcicpO1xuICBcbiAgLy8gVmVyaWZpY2FyIHNpIHlhIGV4aXN0ZSB1biBwYW5lbCBwYXJhIGV2aXRhciBkdXBsaWNhZG9zXG4gIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dwbC1wYW5lbCcpO1xuICBpZiAoZXhpc3RpbmcpIHtcbiAgICBleGlzdGluZy5yZW1vdmUoKTtcbiAgICBsb2coJ1x1RDgzRFx1REREMVx1RkUwRiBQYW5lbCBleGlzdGVudGUgcmVtb3ZpZG8nKTtcbiAgfVxuICBcbiAgY29uc3QgdGV4dHMgPSBnZXRMYXVuY2hlclRleHRzKCk7XG4gIGNvbnN0IHsgaG9zdCwgcm9vdCB9ID0gY3JlYXRlU2hhZG93Um9vdCgnd3BsLXBhbmVsJyk7XG4gIFxuICAvLyBDcmVhciBlc3RpbG9zXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgQGtleWZyYW1lcyBzbGlkZUluIHtcbiAgICAgIGZyb20geyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IG9wYWNpdHk6IDA7IH1cbiAgICAgIHRvIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyBvcGFjaXR5OiAxOyB9XG4gICAgfVxuICAgIFxuICAgIC5wYW5lbCB7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICB0b3A6IDIwcHg7XG4gICAgICByaWdodDogMjBweDtcbiAgICAgIHdpZHRoOiAzMDBweDtcbiAgICAgIGJhY2tncm91bmQ6ICR7TEFVTkNIRVJfQ09ORklHLlRIRU1FLnByaW1hcnl9O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUuYWNjZW50fTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBjb2xvcjogJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUudGV4dH07XG4gICAgICBmb250LWZhbWlseTogc3lzdGVtLXVpLCAnU2Vnb2UgVUknLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWw7XG4gICAgICB6LWluZGV4OiA5OTk5OTk7XG4gICAgICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwwLDAsMC41KTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBhbmltYXRpb246IHNsaWRlSW4gMC4zcyBlYXNlLW91dDtcbiAgICB9XG4gICAgXG4gICAgLmhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGJhY2tncm91bmQ6ICR7TEFVTkNIRVJfQ09ORklHLlRIRU1FLnNlY29uZGFyeX07XG4gICAgICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gICAgICBjb2xvcjogJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUuaGlnaGxpZ2h0fTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICB9XG4gICAgXG4gICAgLmJvZHkge1xuICAgICAgcGFkZGluZzogMTJweDtcbiAgICB9XG4gICAgXG4gICAgLnJvdyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBtYXJnaW46IDhweCAwO1xuICAgIH1cbiAgICBcbiAgICAuYnRuIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBwYWRkaW5nOiA5cHg7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICAgIFxuICAgIC5idG46ZGlzYWJsZWQge1xuICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICB9XG4gICAgXG4gICAgLmJ0bi5wcmltYXJ5IHtcbiAgICAgIGJhY2tncm91bmQ6ICR7TEFVTkNIRVJfQ09ORklHLlRIRU1FLmFjY2VudH07XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuICAgIFxuICAgIC5idG4ucHJpbWFyeTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgICBiYWNrZ3JvdW5kOiAke0xBVU5DSEVSX0NPTkZJRy5USEVNRS5oaWdobGlnaHR9O1xuICAgIH1cbiAgICBcbiAgICAuYnRuLmdob3N0IHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHtMQVVOQ0hFUl9DT05GSUcuVEhFTUUuYWNjZW50fTtcbiAgICAgIGNvbG9yOiAke0xBVU5DSEVSX0NPTkZJRy5USEVNRS50ZXh0fTtcbiAgICB9XG4gICAgXG4gICAgLmJ0bi5naG9zdDpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgICBiYWNrZ3JvdW5kOiAke0xBVU5DSEVSX0NPTkZJRy5USEVNRS5hY2NlbnR9MjI7XG4gICAgfVxuICAgIFxuICAgIC5idG4uY2xvc2Uge1xuICAgICAgZmxleDogMCAwIGF1dG87XG4gICAgICBwYWRkaW5nOiA2cHggOHB4O1xuICAgIH1cbiAgICBcbiAgICAuY2FyZCB7XG4gICAgICBiYWNrZ3JvdW5kOiAke0xBVU5DSEVSX0NPTkZJRy5USEVNRS5zZWNvbmRhcnl9O1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgfVxuICAgIFxuICAgIC5zdGF0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBtYXJnaW46IDRweCAwO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgb3BhY2l0eTogMC45NTtcbiAgICB9XG4gICAgXG4gICAgLnN0YXR1cyB7XG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjA4KTtcbiAgICB9XG4gICAgXG4gICAgLnNlbGVjdGVkIHtcbiAgICAgIG91dGxpbmU6IDJweCBzb2xpZCAke0xBVU5DSEVSX0NPTkZJRy5USEVNRS5oaWdobGlnaHR9O1xuICAgIH1cbiAgYDtcbiAgcm9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIFxuICAvLyBDcmVhciBwYW5lbCBwcmluY2lwYWxcbiAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcGFuZWwuY2xhc3NOYW1lID0gJ3BhbmVsJztcbiAgcGFuZWwuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgIDxkaXY+JHt0ZXh0cy50aXRsZX08L2Rpdj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gZ2hvc3QgY2xvc2UgY2xvc2UtYnRuXCI+XHUyNzE1PC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImJvZHlcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBwcmltYXJ5IGZhcm0tYnRuXCI+JHt0ZXh0cy5hdXRvRmFybX08L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBnaG9zdCBpbWFnZS1idG5cIj4ke3RleHRzLmF1dG9JbWFnZX08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGdob3N0IGd1YXJkLWJ0blwiPiR7dGV4dHMuYXV0b0d1YXJkfTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGdob3N0IGxvZy13aW5kb3ctYnRuXCI+JHt0ZXh0cy5sb2dXaW5kb3d9PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XG4gICAgICAgICAgPHNwYW4+JHt0ZXh0cy5zZWxlY3Rpb259PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hvaWNlXCI+XHUyMDE0PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQgdXNlci1jYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XG4gICAgICAgICAgPHNwYW4+JHt0ZXh0cy51c2VyfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVzZXItbmFtZVwiPi08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxuICAgICAgICAgIDxzcGFuPiR7dGV4dHMuY2hhcmdlc308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1c2VyLWNoYXJnZXNcIj4tPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQgaGVhbHRoLWNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cbiAgICAgICAgICA8c3Bhbj4ke3RleHRzLmJhY2tlbmR9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFja2VuZC1zdGF0dXNcIj4ke3RleHRzLmNoZWNraW5nfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XG4gICAgICAgICAgPHNwYW4+JHt0ZXh0cy5kYXRhYmFzZX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhYmFzZS1zdGF0dXNcIj4tPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cbiAgICAgICAgICA8c3Bhbj4ke3RleHRzLnVwdGltZX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cHRpbWVcIj4tPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInN0YXR1cyBzdGF0dXMtdGV4dFwiPiR7dGV4dHMuY2hvb3NlQm90fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwibWFyZ2luLXRvcDogMTJweDtcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBwcmltYXJ5IGxhdW5jaC1idG5cIiBkaXNhYmxlZD4ke3RleHRzLmxhdW5jaH08L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBnaG9zdCBjYW5jZWwtYnRuXCI+JHt0ZXh0cy5jbG9zZX08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgO1xuICBcbiAgcm9vdC5hcHBlbmRDaGlsZChwYW5lbCk7XG4gIFxuICAvLyBSZWZlcmVuY2lhcyBhIGVsZW1lbnRvc1xuICBjb25zdCBlbGVtZW50cyA9IHtcbiAgICBoZWFkZXI6IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKSxcbiAgICBmYXJtQnRuOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuZmFybS1idG4nKSxcbiAgICBpbWFnZUJ0bjogcGFuZWwucXVlcnlTZWxlY3RvcignLmltYWdlLWJ0bicpLFxuICAgIGd1YXJkQnRuOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuZ3VhcmQtYnRuJyksXG4gICAgbG9nV2luZG93QnRuOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcubG9nLXdpbmRvdy1idG4nKSxcbiAgICBsYXVuY2hCdG46IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5sYXVuY2gtYnRuJyksXG4gICAgY2FuY2VsQnRuOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWJ0bicpLFxuICAgIGNsb3NlQnRuOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYnRuJyksXG4gICAgc3RhdHVzVGV4dDogcGFuZWwucXVlcnlTZWxlY3RvcignLnN0YXR1cy10ZXh0JyksXG4gICAgY2hvaWNlOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuY2hvaWNlJyksXG4gICAgdXNlck5hbWU6IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy51c2VyLW5hbWUnKSxcbiAgICB1c2VyQ2hhcmdlczogcGFuZWwucXVlcnlTZWxlY3RvcignLnVzZXItY2hhcmdlcycpLFxuICAgIGJhY2tlbmRTdGF0dXM6IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZW5kLXN0YXR1cycpLFxuICAgIGRhdGFiYXNlU3RhdHVzOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuZGF0YWJhc2Utc3RhdHVzJyksXG4gICAgdXB0aW1lOiBwYW5lbC5xdWVyeVNlbGVjdG9yKCcudXB0aW1lJylcbiAgfTtcbiAgXG4gIC8vIEhhY2VyIGRyYWdnYWJsZVxuICBtYWtlRHJhZ2dhYmxlKGVsZW1lbnRzLmhlYWRlciwgcGFuZWwpO1xuICBcbiAgLy8gRXN0YWRvIGludGVybm9cbiAgbGV0IHNlbGVjdGVkQm90ID0gbnVsbDtcbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIHNlbGVjY2lvbmFyIGJvdFxuICBmdW5jdGlvbiBzZWxlY3RCb3QoYm90VHlwZSkge1xuICAgIHNlbGVjdGVkQm90ID0gYm90VHlwZTtcbiAgICBsYXVuY2hlclN0YXRlLnNlbGVjdGVkQm90ID0gYm90VHlwZTtcbiAgICBcbiAgICBlbGVtZW50cy5jaG9pY2UudGV4dENvbnRlbnQgPSBib3RUeXBlID09PSAnZmFybScgPyB0KCdsYXVuY2hlci5hdXRvRmFybScpIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90VHlwZSA9PT0gJ2ltYWdlJyA/IHQoJ2xhdW5jaGVyLmF1dG9JbWFnZScpIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCgnbGF1bmNoZXIuYXV0b0d1YXJkJyk7XG4gICAgZWxlbWVudHMubGF1bmNoQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlc3RpbG9zIGRlIGJvdG9uZXNcbiAgICBlbGVtZW50cy5mYXJtQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3ByaW1hcnknKTtcbiAgICBlbGVtZW50cy5mYXJtQnRuLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7XG4gICAgZWxlbWVudHMuaW1hZ2VCdG4uY2xhc3NMaXN0LnJlbW92ZSgncHJpbWFyeScpO1xuICAgIGVsZW1lbnRzLmltYWdlQnRuLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7XG4gICAgZWxlbWVudHMuZ3VhcmRCdG4uY2xhc3NMaXN0LnJlbW92ZSgncHJpbWFyeScpO1xuICAgIGVsZW1lbnRzLmd1YXJkQnRuLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7XG4gICAgXG4gICAgaWYgKGJvdFR5cGUgPT09ICdmYXJtJykge1xuICAgICAgZWxlbWVudHMuZmFybUJ0bi5jbGFzc0xpc3QuYWRkKCdwcmltYXJ5Jyk7XG4gICAgICBlbGVtZW50cy5mYXJtQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2dob3N0Jyk7XG4gICAgfSBlbHNlIGlmIChib3RUeXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICBlbGVtZW50cy5pbWFnZUJ0bi5jbGFzc0xpc3QuYWRkKCdwcmltYXJ5Jyk7XG4gICAgICBlbGVtZW50cy5pbWFnZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdnaG9zdCcpO1xuICAgIH0gZWxzZSBpZiAoYm90VHlwZSA9PT0gJ2d1YXJkJykge1xuICAgICAgZWxlbWVudHMuZ3VhcmRCdG4uY2xhc3NMaXN0LmFkZCgncHJpbWFyeScpO1xuICAgICAgZWxlbWVudHMuZ3VhcmRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnZ2hvc3QnKTtcbiAgICB9XG4gICAgXG4gICAgZWxlbWVudHMuc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IHQoJ2xhdW5jaGVyLnJlYWR5VG9MYXVuY2gnKTtcbiAgICBcbiAgICBpZiAob25TZWxlY3RCb3QpIHtcbiAgICAgIG9uU2VsZWN0Qm90KGJvdFR5cGUpO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gIGVsZW1lbnRzLmZhcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzZWxlY3RCb3QoJ2Zhcm0nKSk7XG4gIGVsZW1lbnRzLmltYWdlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2VsZWN0Qm90KCdpbWFnZScpKTtcbiAgZWxlbWVudHMuZ3VhcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzZWxlY3RCb3QoJ2d1YXJkJykpO1xuICBcbiAgLy8gVmFyaWFibGUgcGFyYSBtYW50ZW5lciByZWZlcmVuY2lhIGEgbGEgdmVudGFuYSBkZSBsb2dzXG4gIGxldCBsb2dXaW5kb3cgPSBudWxsO1xuICBlbGVtZW50cy5sb2dXaW5kb3dCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKCFsb2dXaW5kb3cpIHtcbiAgICAgIGxvZ1dpbmRvdyA9IGNyZWF0ZUxvZ1dpbmRvdygnbGF1bmNoZXInKTtcbiAgICAgIGxvZ1dpbmRvdy5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ1dpbmRvdy50b2dnbGUoKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgZWxlbWVudHMubGF1bmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRCb3QpIHJldHVybjtcbiAgICBcbiAgICBlbGVtZW50cy5sYXVuY2hCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGVsZW1lbnRzLmxhdW5jaEJ0bi50ZXh0Q29udGVudCA9IHQoJ2xhdW5jaGVyLmxvYWRpbmcnKTtcbiAgICBlbGVtZW50cy5zdGF0dXNUZXh0LnRleHRDb250ZW50ID0gdCgnbGF1bmNoZXIuZG93bmxvYWRpbmcnKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgaWYgKG9uTGF1bmNoKSB7XG4gICAgICAgIGF3YWl0IG9uTGF1bmNoKHNlbGVjdGVkQm90KTtcbiAgICAgICAgLy8gU2kgbGxlZ2Ftb3MgYXF1XHUwMEVELCBlbCBib3Qgc2UgZWplY3V0XHUwMEYzIGNvcnJlY3RhbWVudGVcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ1x1Mjc0QyBFcnJvciBlbiBsYXVuY2g6JywgZXJyb3IpO1xuICAgICAgYWxlcnQodCgnbGF1bmNoZXIubG9hZEVycm9yTXNnJykpO1xuICAgICAgZWxlbWVudHMubGF1bmNoQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBlbGVtZW50cy5sYXVuY2hCdG4udGV4dENvbnRlbnQgPSB0KCdsYXVuY2hlci5sYXVuY2gnKTtcbiAgICAgIGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQgPSB0KCdsYXVuY2hlci5sb2FkRXJyb3InKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgLy8gRnVuY2lcdTAwRjNuIGRlIGxpbXBpZXphXG4gIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhbmd1YWdlQ2hhbmdlKTtcbiAgICBpZiAobGF1bmNoZXJTdGF0ZS5yZWZyZXNoVGltZXIpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGxhdW5jaGVyU3RhdGUucmVmcmVzaFRpbWVyKTtcbiAgICAgIGxhdW5jaGVyU3RhdGUucmVmcmVzaFRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgaG9zdC5yZW1vdmUoKTtcbiAgICBsb2coJ1x1RDgzRVx1RERGOSBMYXVuY2hlciBVSSBlbGltaW5hZG8nKTtcbiAgfVxuICBcbiAgZWxlbWVudHMuY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYW51cCk7XG4gIGVsZW1lbnRzLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYW51cCk7XG4gIFxuICAvLyBDZXJyYXIgY29uIEVzY2FwZVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICBjbGVhbnVwKCk7XG4gICAgfVxuICB9LCB7IG9uY2U6IHRydWUgfSk7XG4gIFxuICAvLyBFc2N1Y2hhciBjYW1iaW9zIGRlIGlkaW9tYVxuICBjb25zdCBoYW5kbGVMYW5ndWFnZUNoYW5nZSA9ICgpID0+IHtcbiAgICB1cGRhdGVUZXh0cygpO1xuICB9O1xuICBcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhbmd1YWdlQ2hhbmdlKTtcbiAgXG4gIC8vIEZ1bmNpb25lcyBkZSBhY3R1YWxpemFjaVx1MDBGM24gZGUgVUlcbiAgZnVuY3Rpb24gc2V0VXNlckluZm8odXNlckluZm8pIHtcbiAgICBpZiAoIXVzZXJJbmZvKSB7XG4gICAgICBlbGVtZW50cy51c2VyTmFtZS50ZXh0Q29udGVudCA9ICctJztcbiAgICAgIGVsZW1lbnRzLnVzZXJDaGFyZ2VzLnRleHRDb250ZW50ID0gJy0nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBuYW1lID0gdXNlckluZm8ubmFtZSB8fCB1c2VySW5mby51c2VybmFtZSB8fCAnLSc7XG4gICAgY29uc3QgY2hhcmdlcyA9IE1hdGguZmxvb3IoTnVtYmVyKHVzZXJJbmZvLmNoYXJnZXM/LmNvdW50ID8/IE5hTikpO1xuICAgIFxuICAgIGVsZW1lbnRzLnVzZXJOYW1lLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBlbGVtZW50cy51c2VyQ2hhcmdlcy50ZXh0Q29udGVudCA9IE51bWJlci5pc0Zpbml0ZShjaGFyZ2VzKSA/IFN0cmluZyhjaGFyZ2VzKSA6ICctJztcbiAgfVxuICBcbiAgZnVuY3Rpb24gc2V0SGVhbHRoSW5mbyhoZWFsdGhJbmZvKSB7XG4gICAgaWYgKCFoZWFsdGhJbmZvKSB7XG4gICAgICBlbGVtZW50cy5iYWNrZW5kU3RhdHVzLnRleHRDb250ZW50ID0gdCgnbGF1bmNoZXIub2ZmbGluZScpO1xuICAgICAgZWxlbWVudHMuZGF0YWJhc2VTdGF0dXMudGV4dENvbnRlbnQgPSAnLSc7XG4gICAgICBlbGVtZW50cy51cHRpbWUudGV4dENvbnRlbnQgPSAnLSc7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHVwID0gQm9vbGVhbihoZWFsdGhJbmZvLnVwKTtcbiAgICBjb25zdCBkYiA9IGhlYWx0aEluZm8uZGF0YWJhc2U7XG4gICAgY29uc3QgdXB0aW1lID0gaGVhbHRoSW5mby51cHRpbWUgfHwgJy0nO1xuICAgIFxuICAgIGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQgPSB1cCA/IHQoJ2xhdW5jaGVyLm9ubGluZScpIDogdCgnbGF1bmNoZXIub2ZmbGluZScpO1xuICAgIFxuICAgIGlmIChkYiA9PT0gdW5kZWZpbmVkIHx8IGRiID09PSBudWxsKSB7XG4gICAgICBlbGVtZW50cy5kYXRhYmFzZVN0YXR1cy50ZXh0Q29udGVudCA9ICctJztcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudHMuZGF0YWJhc2VTdGF0dXMudGV4dENvbnRlbnQgPSBkYiA/IHQoJ2xhdW5jaGVyLm9rJykgOiB0KCdsYXVuY2hlci5lcnJvcicpO1xuICAgIH1cbiAgICBcbiAgICBlbGVtZW50cy51cHRpbWUudGV4dENvbnRlbnQgPSB0eXBlb2YgdXB0aW1lID09PSAnbnVtYmVyJyA/IGAke3VwdGltZX1zYCA6ICh1cHRpbWUgfHwgJy0nKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gdXBkYXRlVGV4dHMoKSB7XG4gICAgLy8gT2J0ZW5lciBudWV2YXMgdHJhZHVjY2lvbmVzXG4gICAgY29uc3QgbmV3VGV4dHMgPSBnZXRMYXVuY2hlclRleHRzKCk7XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlbGVtZW50b3MgcHJpbmNpcGFsZXNcbiAgICBjb25zdCB0aXRsZUVsZW1lbnQgPSBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyIGRpdjpmaXJzdC1jaGlsZCcpO1xuICAgIGlmICh0aXRsZUVsZW1lbnQpIHtcbiAgICAgIHRpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IG5ld1RleHRzLnRpdGxlO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudHMuZmFybUJ0bikge1xuICAgICAgZWxlbWVudHMuZmFybUJ0bi50ZXh0Q29udGVudCA9IG5ld1RleHRzLmF1dG9GYXJtO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudHMuaW1hZ2VCdG4pIHtcbiAgICAgIGVsZW1lbnRzLmltYWdlQnRuLnRleHRDb250ZW50ID0gbmV3VGV4dHMuYXV0b0ltYWdlO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudHMuZ3VhcmRCdG4pIHtcbiAgICAgIGVsZW1lbnRzLmd1YXJkQnRuLnRleHRDb250ZW50ID0gbmV3VGV4dHMuYXV0b0d1YXJkO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbWVudHMubGF1bmNoQnRuKSB7XG4gICAgICBlbGVtZW50cy5sYXVuY2hCdG4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5sYXVuY2g7XG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtZW50cy5jbG9zZUJ0bikge1xuICAgICAgZWxlbWVudHMuY2xvc2VCdG4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5jbG9zZTtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBsYWJlbHMgZGUgZXN0YWRcdTAwRURzdGljYXNcbiAgICBjb25zdCBzZWxlY3Rpb25TcGFuID0gcGFuZWwucXVlcnlTZWxlY3RvcignLmNhcmQ6Zmlyc3Qtb2YtdHlwZSAuc3RhdCBzcGFuOmZpcnN0LWNoaWxkJyk7XG4gICAgaWYgKHNlbGVjdGlvblNwYW4pIHtcbiAgICAgIHNlbGVjdGlvblNwYW4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5zZWxlY3Rpb247XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHVzZXJTcGFuID0gcGFuZWwucXVlcnlTZWxlY3RvcignLnVzZXItY2FyZCAuc3RhdDpmaXJzdC1jaGlsZCBzcGFuOmZpcnN0LWNoaWxkJyk7XG4gICAgaWYgKHVzZXJTcGFuKSB7XG4gICAgICB1c2VyU3Bhbi50ZXh0Q29udGVudCA9IG5ld1RleHRzLnVzZXI7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNoYXJnZXNTcGFuID0gcGFuZWwucXVlcnlTZWxlY3RvcignLnVzZXItY2FyZCAuc3RhdDpsYXN0LWNoaWxkIHNwYW46Zmlyc3QtY2hpbGQnKTtcbiAgICBpZiAoY2hhcmdlc1NwYW4pIHtcbiAgICAgIGNoYXJnZXNTcGFuLnRleHRDb250ZW50ID0gbmV3VGV4dHMuY2hhcmdlcztcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYmFja2VuZFNwYW4gPSBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuaGVhbHRoLWNhcmQgLnN0YXQ6Zmlyc3QtY2hpbGQgc3BhbjpmaXJzdC1jaGlsZCcpO1xuICAgIGlmIChiYWNrZW5kU3Bhbikge1xuICAgICAgYmFja2VuZFNwYW4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5iYWNrZW5kO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBkYXRhYmFzZVNwYW4gPSBwYW5lbC5xdWVyeVNlbGVjdG9yKCcuaGVhbHRoLWNhcmQgLnN0YXQ6bnRoLWNoaWxkKDIpIHNwYW46Zmlyc3QtY2hpbGQnKTtcbiAgICBpZiAoZGF0YWJhc2VTcGFuKSB7XG4gICAgICBkYXRhYmFzZVNwYW4udGV4dENvbnRlbnQgPSBuZXdUZXh0cy5kYXRhYmFzZTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdXB0aW1lU3BhbiA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5oZWFsdGgtY2FyZCAuc3RhdDpsYXN0LWNoaWxkIHNwYW46Zmlyc3QtY2hpbGQnKTtcbiAgICBpZiAodXB0aW1lU3Bhbikge1xuICAgICAgdXB0aW1lU3Bhbi50ZXh0Q29udGVudCA9IG5ld1RleHRzLnVwdGltZTtcbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBzdGF0dXMgc2kgZXN0XHUwMEUxIGVuIG1lbnNhamUgcG9yIGRlZmVjdG9cbiAgICBpZiAoZWxlbWVudHMuc3RhdHVzVGV4dCkge1xuICAgICAgY29uc3QgY3VycmVudFN0YXR1cyA9IGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQ7XG4gICAgICBpZiAoY3VycmVudFN0YXR1cyA9PT0gdGV4dHMuY2hvb3NlQm90IHx8IGN1cnJlbnRTdGF0dXMgPT09IG5ld1RleHRzLmNob29zZUJvdCkge1xuICAgICAgICBlbGVtZW50cy5zdGF0dXNUZXh0LnRleHRDb250ZW50ID0gbmV3VGV4dHMuY2hvb3NlQm90O1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdHVzID09PSB0ZXh0cy5sb2FkaW5nIHx8IGN1cnJlbnRTdGF0dXMgPT09IG5ld1RleHRzLmxvYWRpbmcpIHtcbiAgICAgICAgZWxlbWVudHMuc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IG5ld1RleHRzLmxvYWRpbmc7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGF0dXMgPT09IHRleHRzLmRvd25sb2FkaW5nIHx8IGN1cnJlbnRTdGF0dXMgPT09IG5ld1RleHRzLmRvd25sb2FkaW5nKSB7XG4gICAgICAgIGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5kb3dubG9hZGluZztcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YXR1cyA9PT0gdGV4dHMucmVhZHlUb0xhdW5jaCB8fCBjdXJyZW50U3RhdHVzID09PSBuZXdUZXh0cy5yZWFkeVRvTGF1bmNoKSB7XG4gICAgICAgIGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5yZWFkeVRvTGF1bmNoO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdHVzID09PSB0ZXh0cy5sb2FkRXJyb3IgfHwgY3VycmVudFN0YXR1cyA9PT0gbmV3VGV4dHMubG9hZEVycm9yKSB7XG4gICAgICAgIGVsZW1lbnRzLnN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5sb2FkRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEFjdHVhbGl6YXIgZXN0YWRvcyBkaW5cdTAwRTFtaWNvcyBkZSBzYWx1ZCBkZWwgYmFja2VuZFxuICAgIGlmIChlbGVtZW50cy5iYWNrZW5kU3RhdHVzKSB7XG4gICAgICBjb25zdCBjdXJyZW50QmFja2VuZCA9IGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQ7XG4gICAgICBpZiAoY3VycmVudEJhY2tlbmQgPT09IHRleHRzLm9ubGluZSB8fCBjdXJyZW50QmFja2VuZCA9PT0gbmV3VGV4dHMub25saW5lKSB7XG4gICAgICAgIGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5vbmxpbmU7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kID09PSB0ZXh0cy5vZmZsaW5lIHx8IGN1cnJlbnRCYWNrZW5kID09PSBuZXdUZXh0cy5vZmZsaW5lKSB7XG4gICAgICAgIGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5vZmZsaW5lO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZCA9PT0gdGV4dHMuY2hlY2tpbmcgfHwgY3VycmVudEJhY2tlbmQgPT09IG5ld1RleHRzLmNoZWNraW5nKSB7XG4gICAgICAgIGVsZW1lbnRzLmJhY2tlbmRTdGF0dXMudGV4dENvbnRlbnQgPSBuZXdUZXh0cy5jaGVja2luZztcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQWN0dWFsaXphciBlc3RhZG8gZGUgbGEgYmFzZSBkZSBkYXRvc1xuICAgIGlmIChlbGVtZW50cy5kYXRhYmFzZVN0YXR1cykge1xuICAgICAgY29uc3QgY3VycmVudERiID0gZWxlbWVudHMuZGF0YWJhc2VTdGF0dXMudGV4dENvbnRlbnQ7XG4gICAgICBpZiAoY3VycmVudERiID09PSB0ZXh0cy5vayB8fCBjdXJyZW50RGIgPT09IG5ld1RleHRzLm9rKSB7XG4gICAgICAgIGVsZW1lbnRzLmRhdGFiYXNlU3RhdHVzLnRleHRDb250ZW50ID0gbmV3VGV4dHMub2s7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnREYiA9PT0gdGV4dHMuZXJyb3IgfHwgY3VycmVudERiID09PSBuZXdUZXh0cy5lcnJvcikge1xuICAgICAgICBlbGVtZW50cy5kYXRhYmFzZVN0YXR1cy50ZXh0Q29udGVudCA9IG5ld1RleHRzLmVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIGxhIHNlbGVjY2lcdTAwRjNuIGFjdHVhbCBzaSBoYXkgYWxndW5hXG4gICAgaWYgKHNlbGVjdGVkQm90ICYmIGVsZW1lbnRzLmNob2ljZSkge1xuICAgICAgZWxlbWVudHMuY2hvaWNlLnRleHRDb250ZW50ID0gc2VsZWN0ZWRCb3QgPT09ICdmYXJtJyA/IG5ld1RleHRzLmF1dG9GYXJtIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEJvdCA9PT0gJ2ltYWdlJyA/IG5ld1RleHRzLmF1dG9JbWFnZSA6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGV4dHMuYXV0b0d1YXJkO1xuICAgIH1cbiAgICBcbiAgICAvLyBBY3R1YWxpemFyIHRleHRvcyBkZSByZWZlcmVuY2lhIGxvY2FsXG4gICAgT2JqZWN0LmFzc2lnbih0ZXh0cywgbmV3VGV4dHMpO1xuICAgIFxuICAgIGxvZyhgXHVEODNDXHVERjBEIFRleHRvcyBkZWwgbGF1bmNoZXIgYWN0dWFsaXphZG9zIGFsIGlkaW9tYTogJHtnZXRDdXJyZW50TGFuZ3VhZ2UoKX1gKTtcbiAgfVxuICBcbiAgbG9nKCdcdTI3MDUgTGF1bmNoZXIgVUkgY3JlYWRvIGV4aXRvc2FtZW50ZScpO1xuICBcbiAgcmV0dXJuIHtcbiAgICBzZXRVc2VySW5mbyxcbiAgICBzZXRIZWFsdGhJbmZvLFxuICAgIGNsZWFudXAsXG4gICAgc2VsZWN0Qm90LFxuICAgIHVwZGF0ZVRleHRzLFxuICAgIGdldFNlbGVjdGVkQm90OiAoKSA9PiBzZWxlY3RlZEJvdFxuICB9O1xufVxuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9jb3JlL2xvZ2dlci5qc1wiO1xuaW1wb3J0IHsgbGF1bmNoZXJTdGF0ZSB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuXG4vLyBBUEkgY2FsbHMgcGFyYSBvYnRlbmVyIGluZm9ybWFjaVx1MDBGM24gZGVsIHVzdWFyaW8geSBlc3RhZG8gZGVsIGJhY2tlbmRcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXNzaW9uKCkge1xuICBsb2coJ1x1RDgzRFx1RENFMSBPYnRlbmllbmRvIGluZm9ybWFjaVx1MDBGM24gZGUgc2VzaVx1MDBGM24uLi4nKTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYmFja2VuZC53cGxhY2UubGl2ZS9tZScsIHsgXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnIFxuICAgIH0pO1xuICAgIFxuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICAgIH1cbiAgICBcbiAgICBsYXVuY2hlclN0YXRlLm1lID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICBsb2coJ1x1MjcwNSBJbmZvcm1hY2lcdTAwRjNuIGRlIHNlc2lcdTAwRjNuIG9idGVuaWRhOicsIGxhdW5jaGVyU3RhdGUubWU/Lm5hbWUgfHwgbGF1bmNoZXJTdGF0ZS5tZT8udXNlcm5hbWUgfHwgJ1VzdWFyaW8nKTtcbiAgICBcbiAgICByZXR1cm4gbGF1bmNoZXJTdGF0ZS5tZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBvYnRlbmllbmRvIHNlc2lcdTAwRjNuOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgIGxhdW5jaGVyU3RhdGUubWUgPSBudWxsO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0JhY2tlbmRIZWFsdGgoKSB7XG4gIGxvZygnXHVEODNDXHVERkU1IFZlcmlmaWNhbmRvIGVzdGFkbyBkZWwgYmFja2VuZC4uLicpO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9iYWNrZW5kLndwbGFjZS5saXZlL2hlYWx0aCcsIHsgXG4gICAgICBtZXRob2Q6ICdHRVQnLCBcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScgXG4gICAgfSk7XG4gICAgXG4gICAgbGV0IGpzb24gPSBudWxsO1xuICAgIHRyeSB7IFxuICAgICAganNvbiA9IGF3YWl0IHJlcy5qc29uKCk7IFxuICAgIH0gY2F0Y2ggeyBcbiAgICAgIGpzb24gPSBudWxsOyBcbiAgICB9XG4gICAgXG4gICAgaWYgKHJlcy5vayAmJiBqc29uKSB7XG4gICAgICBsYXVuY2hlclN0YXRlLmhlYWx0aCA9IHtcbiAgICAgICAgdXA6IEJvb2xlYW4oanNvbi51cCA/PyB0cnVlKSxcbiAgICAgICAgZGF0YWJhc2U6IGpzb24uZGF0YWJhc2U/Lm9rID8/IGpzb24uZGF0YWJhc2UgPz8gdW5kZWZpbmVkLFxuICAgICAgICB1cHRpbWU6IGpzb24udXB0aW1lID8/IGpzb24udXB0aW1lSHVtYW4gPz8gKHR5cGVvZiBqc29uLnVwdGltZVNlY29uZHMgPT09ICdudW1iZXInID8gYCR7anNvbi51cHRpbWVTZWNvbmRzfXNgIDogdW5kZWZpbmVkKVxuICAgICAgfTtcbiAgICAgIGxvZygnXHUyNzA1IEVzdGFkbyBkZWwgYmFja2VuZCBvYnRlbmlkbzonLCBsYXVuY2hlclN0YXRlLmhlYWx0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhdW5jaGVyU3RhdGUuaGVhbHRoID0geyBcbiAgICAgICAgdXA6IGZhbHNlLCBcbiAgICAgICAgZGF0YWJhc2U6IGZhbHNlLCBcbiAgICAgICAgdXB0aW1lOiB1bmRlZmluZWQgXG4gICAgICB9O1xuICAgICAgbG9nKCdcdTI2QTBcdUZFMEYgQmFja2VuZCBubyByZXNwb25kZSBjb3JyZWN0YW1lbnRlJyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNzRDIEVycm9yIHZlcmlmaWNhbmRvIGJhY2tlbmQ6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgbGF1bmNoZXJTdGF0ZS5oZWFsdGggPSB7IFxuICAgICAgdXA6IGZhbHNlLCBcbiAgICAgIGRhdGFiYXNlOiBmYWxzZSwgXG4gICAgICB1cHRpbWU6IHVuZGVmaW5lZCBcbiAgICB9O1xuICB9XG4gIFxuICByZXR1cm4gbGF1bmNoZXJTdGF0ZS5oZWFsdGg7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEFuZEV4ZWN1dGVCb3QoYm90VHlwZSwgcmF3QmFzZSkge1xuICBsb2coYFx1RDgzRFx1RENFNSBEZXNjYXJnYW5kbyBib3Q6ICR7Ym90VHlwZX1gKTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgYm90RmlsZXMgPSB7XG4gICAgICAnZmFybSc6ICdBdXRvLUZhcm0uanMnLFxuICAgICAgJ2ltYWdlJzogJ0F1dG8tSW1hZ2UuanMnLFxuICAgICAgJ2d1YXJkJzogJ0F1dG8tR3VhcmQuanMnXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBmaWxlTmFtZSA9IGJvdEZpbGVzW2JvdFR5cGVdO1xuICAgIGlmICghZmlsZU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGlwbyBkZSBib3QgZGVzY29ub2NpZG86ICR7Ym90VHlwZX1gKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdXJsID0gYCR7cmF3QmFzZX0vJHtmaWxlTmFtZX1gO1xuICAgIFxuICAgIGxvZyhgXHVEODNDXHVERjEwIFVSTDogJHt1cmx9YCk7XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY29kZSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICBsb2coYFx1MjcwNSBCb3QgZGVzY2FyZ2FkbyAoJHtjb2RlLmxlbmd0aH0gY2hhcnMpLCBlamVjdXRhbmRvLi4uYCk7XG4gICAgXG4gICAgLy8gRXZhbHVhciBlbCBjXHUwMEYzZGlnbyBkZWwgYm90XG4gICAgKDAsIGV2YWwpKGNvZGUpO1xuICAgIFxuICAgIGxvZygnXHVEODNEXHVERTgwIEJvdCBlamVjdXRhZG8gZXhpdG9zYW1lbnRlJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKCdcdTI3NEMgRXJyb3IgZGVzY2FyZ2FuZG8vZWplY3V0YW5kbyBib3Q6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBcbiAgQVZBSUxBQkxFX0xBTkdVQUdFUywgXG4gIGdldEN1cnJlbnRMYW5ndWFnZSwgXG4gIHNldExhbmd1YWdlIFxufSBmcm9tICcuLi9sb2NhbGVzL2luZGV4LmpzJztcblxuLyoqXG4gKiBDcmVhIHVuIHNlbGVjdG9yIGRlIGlkaW9tYVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcGNpb25lcyBkZSBjb25maWd1cmFjaVx1MDBGM25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMub25MYW5ndWFnZUNoYW5nZSAtIENhbGxiYWNrIGN1YW5kbyBjYW1iaWEgZWwgaWRpb21hXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wb3NpdGlvbiAtIFBvc2ljaVx1MDBGM24gZGVsIHNlbGVjdG9yICgndG9wLXJpZ2h0JywgJ3RvcC1sZWZ0JywgZXRjLilcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zaG93RmxhZ3MgLSBTaSBtb3N0cmFyIGJhbmRlcmFzIGRlIHBhXHUwMEVEc2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmpldG8gY29uIG1cdTAwRTl0b2RvcyBwYXJhIGNvbnRyb2xhciBlbCBzZWxlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFuZ3VhZ2VTZWxlY3RvcihvcHRpb25zID0ge30pIHtcbiAgY29uc3Qge1xuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UgPSBudWxsLFxuICAgIHBvc2l0aW9uID0gJ3RvcC1yaWdodCcsXG4gICAgc2hvd0ZsYWdzID0gdHJ1ZVxuICB9ID0gb3B0aW9ucztcblxuICAvLyBDcmVhciBjb250ZW5lZG9yXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2xhbmd1YWdlLXNlbGVjdG9yJztcbiAgXG4gIC8vIEVzdGlsb3MgQ1NTXG4gIGNvbnN0IHN0eWxlcyA9IGBcbiAgICAubGFuZ3VhZ2Utc2VsZWN0b3Ige1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgJHtnZXRQb3NpdGlvblN0eWxlcyhwb3NpdGlvbil9XG4gICAgICB6LWluZGV4OiA5OTk5OTg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjMpO1xuICAgICAgZm9udC1mYW1pbHk6IHN5c3RlbS11aSwgJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1zZWxlY3Rvci1idXR0b24ge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjb2xvcjogI2VlZTtcbiAgICAgIHBhZGRpbmc6IDZweCAxMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDZweDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycztcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG4gICAgXG4gICAgLmxhbmd1YWdlLXNlbGVjdG9yLWJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1zZWxlY3Rvci1kcm9wZG93biB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDEwMCU7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIG1hcmdpbi10b3A6IDRweDtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4zKTtcbiAgICB9XG4gICAgXG4gICAgLmxhbmd1YWdlLXNlbGVjdG9yLWRyb3Bkb3duLnZpc2libGUge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1vcHRpb24ge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjb2xvcjogI2VlZTtcbiAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycztcbiAgICB9XG4gICAgXG4gICAgLmxhbmd1YWdlLW9wdGlvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1vcHRpb24uYWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTE5LCA5MiwgMjI3LCAwLjIpO1xuICAgICAgY29sb3I6ICM3NzVjZTM7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1vcHRpb246Zmlyc3QtY2hpbGQge1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4IDZweCAwIDA7XG4gICAgfVxuICAgIFxuICAgIC5sYW5ndWFnZS1vcHRpb246bGFzdC1jaGlsZCB7XG4gICAgICBib3JkZXItcmFkaXVzOiAwIDAgNnB4IDZweDtcbiAgICB9XG4gICAgXG4gICAgLmxhbmd1YWdlLWZsYWcge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgIH1cbiAgICBcbiAgICAubGFuZ3VhZ2UtbmFtZSB7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cbiAgICBcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgIC5sYW5ndWFnZS1zZWxlY3RvciB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgdG9wOiAxMHB4O1xuICAgICAgICByaWdodDogMTBweDtcbiAgICAgIH1cbiAgICB9XG4gIGA7XG4gIFxuICAvLyBBXHUwMEYxYWRpciBlc3RpbG9zIGFsIGRvY3VtZW50b1xuICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsYW5ndWFnZS1zZWxlY3Rvci1zdHlsZXMnKSkge1xuICAgIGNvbnN0IHN0eWxlU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlU2hlZXQuaWQgPSAnbGFuZ3VhZ2Utc2VsZWN0b3Itc3R5bGVzJztcbiAgICBzdHlsZVNoZWV0LnRleHRDb250ZW50ID0gc3R5bGVzO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldCk7XG4gIH1cbiAgXG4gIC8vIEVzdGFkb1xuICBsZXQgaXNPcGVuID0gZmFsc2U7XG4gIGxldCBjdXJyZW50TGFuZyA9IGdldEN1cnJlbnRMYW5ndWFnZSgpO1xuICBcbiAgLy8gQ3JlYXIgZXN0cnVjdHVyYSBIVE1MXG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBjb25zdCBsYW5nSW5mbyA9IEFWQUlMQUJMRV9MQU5HVUFHRVNbY3VycmVudExhbmddO1xuICAgIFxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwibGFuZ3VhZ2Utc2VsZWN0b3ItYnV0dG9uXCI+XG4gICAgICAgICR7c2hvd0ZsYWdzID8gYDxzcGFuIGNsYXNzPVwibGFuZ3VhZ2UtZmxhZ1wiPiR7bGFuZ0luZm8uZmxhZ308L3NwYW4+YCA6ICcnfVxuICAgICAgICA8c3BhbiBjbGFzcz1cImxhbmd1YWdlLW5hbWVcIj4ke2xhbmdJbmZvLm5hbWV9PC9zcGFuPlxuICAgICAgICA8c3BhbiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiBhdXRvOyB0cmFuc2Zvcm06ICR7aXNPcGVuID8gJ3JvdGF0ZSgxODBkZWcpJyA6ICdyb3RhdGUoMGRlZyknfTsgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnM7XCI+XHUyNUJDPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwibGFuZ3VhZ2Utc2VsZWN0b3ItZHJvcGRvd24gJHtpc09wZW4gPyAndmlzaWJsZScgOiAnJ31cIj5cbiAgICAgICAgJHtPYmplY3QuZW50cmllcyhBVkFJTEFCTEVfTEFOR1VBR0VTKS5tYXAoKFtjb2RlLCBpbmZvXSkgPT4gYFxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJsYW5ndWFnZS1vcHRpb24gJHtjb2RlID09PSBjdXJyZW50TGFuZyA/ICdhY3RpdmUnIDogJyd9XCIgZGF0YS1sYW5nPVwiJHtjb2RlfVwiPlxuICAgICAgICAgICAgJHtzaG93RmxhZ3MgPyBgPHNwYW4gY2xhc3M9XCJsYW5ndWFnZS1mbGFnXCI+JHtpbmZvLmZsYWd9PC9zcGFuPmAgOiAnJ31cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFuZ3VhZ2UtbmFtZVwiPiR7aW5mby5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgYCkuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIFxuICAgIC8vIEFcdTAwRjFhZGlyIGV2ZW50IGxpc3RlbmVyc1xuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBcbiAgLy8gQ29uZmlndXJhciBldmVudCBsaXN0ZW5lcnNcbiAgZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBidXR0b24gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlLXNlbGVjdG9yLWJ1dHRvbicpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmxhbmd1YWdlLW9wdGlvbicpO1xuICAgIFxuICAgIC8vIFRvZ2dsZSBkcm9wZG93blxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaXNPcGVuID0gIWlzT3BlbjtcbiAgICAgIHJlbmRlcigpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIFNlbGVjY2lcdTAwRjNuIGRlIGlkaW9tYVxuICAgIG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMYW5nID0gb3B0aW9uLmRhdGFzZXQubGFuZztcbiAgICAgICAgXG4gICAgICAgIGlmIChzZWxlY3RlZExhbmcgIT09IGN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgY3VycmVudExhbmcgPSBzZWxlY3RlZExhbmc7XG4gICAgICAgICAgc2V0TGFuZ3VhZ2Uoc2VsZWN0ZWRMYW5nKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAob25MYW5ndWFnZUNoYW5nZSkge1xuICAgICAgICAgICAgb25MYW5ndWFnZUNoYW5nZShzZWxlY3RlZExhbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQ2VycmFyIGFsIGhhY2VyIGNsaWNrIGZ1ZXJhXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICByZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBcbiAgLy8gRXNjdWNoYXIgY2FtYmlvcyBkZSBpZGlvbWEgZGVzZGUgb3Ryb3MgY29tcG9uZW50ZXNcbiAgZnVuY3Rpb24gaGFuZGxlTGFuZ3VhZ2VDaGFuZ2UoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGV0YWlsLmxhbmd1YWdlICE9PSBjdXJyZW50TGFuZykge1xuICAgICAgY3VycmVudExhbmcgPSBldmVudC5kZXRhaWwubGFuZ3VhZ2U7XG4gICAgICByZW5kZXIoKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEFcdTAwRjFhZGlyIGxpc3RlbmVyIHBhcmEgY2FtYmlvcyBleHRlcm5vcyBkZSBpZGlvbWFcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhbmd1YWdlQ2hhbmdlZCcsIGhhbmRsZUxhbmd1YWdlQ2hhbmdlKTtcbiAgXG4gIC8vIFJlbmRlcml6YXIgaW5pY2lhbG1lbnRlXG4gIHJlbmRlcigpO1xuICBcbiAgLy8gTVx1MDBFOXRvZG9zIHBcdTAwRkFibGljb3NcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBBXHUwMEYxYWRlIGVsIHNlbGVjdG9yIGFsIERPTVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudCAtIEVsZW1lbnRvIHBhZHJlIChvcGNpb25hbCwgcG9yIGRlZmVjdG8gZG9jdW1lbnQuYm9keSlcbiAgICAgKi9cbiAgICBtb3VudChwYXJlbnQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqIFJlbXVldmUgZWwgc2VsZWN0b3IgZGVsIERPTVxuICAgICAqL1xuICAgIHVubW91bnQoKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbGFuZ3VhZ2VDaGFuZ2VkJywgaGFuZGxlTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgaWYgKGNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiBBY3R1YWxpemEgbGEgcG9zaWNpXHUwMEYzbiBkZWwgc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UG9zaXRpb24gLSBOdWV2YSBwb3NpY2lcdTAwRjNuXG4gICAgICovXG4gICAgc2V0UG9zaXRpb24obmV3UG9zaXRpb24pIHtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gZ2V0UG9zaXRpb25TdHlsZXMobmV3UG9zaXRpb24pO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogT2J0aWVuZSBlbCBlbGVtZW50byBET00gZGVsIHNlbGVjdG9yXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fSBFbGVtZW50byBET01cbiAgICAgKi9cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqIEZ1ZXJ6YSB1bmEgYWN0dWFsaXphY2lcdTAwRjNuIGRlbCBjb21wb25lbnRlXG4gICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgY3VycmVudExhbmcgPSBnZXRDdXJyZW50TGFuZ3VhZ2UoKTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBPYnRpZW5lIGxvcyBlc3RpbG9zIENTUyBwYXJhIHBvc2ljaW9uYXIgZWwgc2VsZWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvbiAtIFBvc2ljaVx1MDBGM24gZGVzZWFkYVxuICogQHJldHVybnMge3N0cmluZ30gRXN0aWxvcyBDU1NcbiAqL1xuZnVuY3Rpb24gZ2V0UG9zaXRpb25TdHlsZXMocG9zaXRpb24pIHtcbiAgY29uc3QgcG9zaXRpb25zID0ge1xuICAgICd0b3AtcmlnaHQnOiAndG9wOiAxNXB4OyByaWdodDogMTVweDsnLFxuICAgICd0b3AtbGVmdCc6ICd0b3A6IDE1cHg7IGxlZnQ6IDE1cHg7JyxcbiAgICAnYm90dG9tLXJpZ2h0JzogJ2JvdHRvbTogMTVweDsgcmlnaHQ6IDE1cHg7JyxcbiAgICAnYm90dG9tLWxlZnQnOiAnYm90dG9tOiAxNXB4OyBsZWZ0OiAxNXB4OycsXG4gICAgJ3RvcC1jZW50ZXInOiAndG9wOiAxNXB4OyBsZWZ0OiA1MCU7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTsnLFxuICAgICdib3R0b20tY2VudGVyJzogJ2JvdHRvbTogMTVweDsgbGVmdDogNTAlOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7J1xuICB9O1xuICBcbiAgcmV0dXJuIHBvc2l0aW9uc1twb3NpdGlvbl0gfHwgcG9zaXRpb25zWyd0b3AtcmlnaHQnXTtcbn1cbiIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUxhdW5jaGVyVUkgfSBmcm9tIFwiLi91aS5qc1wiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvbiwgY2hlY2tCYWNrZW5kSGVhbHRoLCBkb3dubG9hZEFuZEV4ZWN1dGVCb3QgfSBmcm9tIFwiLi9hcGkuanNcIjtcbmltcG9ydCB7IGxhdW5jaGVyU3RhdGUsIExBVU5DSEVSX0NPTkZJRyB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUxhbmd1YWdlIH0gZnJvbSBcIi4uL2xvY2FsZXMvaW5kZXguanNcIjtcbmltcG9ydCB7IGNyZWF0ZUxhbmd1YWdlU2VsZWN0b3IgfSBmcm9tIFwiLi4vY29yZS9sYW5ndWFnZS1zZWxlY3Rvci5qc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuTGF1bmNoZXIoKSB7XG4gIGxvZygnXHVEODNEXHVERTgwIEluaWNpYW5kbyBXUGxhY2UgQXV0by1MYXVuY2hlciAodmVyc2lcdTAwRjNuIG1vZHVsYXIpJyk7XG4gIFxuICAvLyBJbmljaWFsaXphciBzaXN0ZW1hIGRlIGlkaW9tYXNcbiAgaW5pdGlhbGl6ZUxhbmd1YWdlKCk7XG4gIFxuICAvLyBWZXJpZmljYXIgc2kgeWEgZXN0XHUwMEUxIGVqZWN1dFx1MDBFMW5kb3NlXG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmxhdW5jaGVyUnVubmluZykge1xuICAgIGFsZXJ0KFwiQXV0by1MYXVuY2hlciB5YSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgLy8gSW5pY2lhbGl6YXIgbyBwcmVzZXJ2YXIgZWwgZXN0YWRvIGdsb2JhbFxuICB3aW5kb3cuX193cGxhY2VCb3QgPSB7IC4uLndpbmRvdy5fX3dwbGFjZUJvdCwgbGF1bmNoZXJSdW5uaW5nOiB0cnVlIH07XG4gIFxuICB0cnkge1xuICAgIC8vIFZhcmlhYmxlIHBhcmEgZWwgc2VsZWN0b3IgZGUgaWRpb21hXG4gICAgbGV0IGxhbmd1YWdlU2VsZWN0b3IgPSBudWxsO1xuICAgIFxuICAgIC8vIENyZWFyIGludGVyZmF6IGRlIHVzdWFyaW9cbiAgICBjb25zdCB1aSA9IGNyZWF0ZUxhdW5jaGVyVUkoe1xuICAgICAgb25TZWxlY3RCb3Q6IChib3RUeXBlKSA9PiB7XG4gICAgICAgIGxvZyhgXHVEODNDXHVERkFGIEJvdCBzZWxlY2Npb25hZG86ICR7Ym90VHlwZX1gKTtcbiAgICAgICAgLy8gT2N1bHRhciBlbCBzZWxlY3RvciBkZSBpZGlvbWEgY3VhbmRvIHNlIHNlbGVjY2lvbmEgdW4gYm90XG4gICAgICAgIGlmIChsYW5ndWFnZVNlbGVjdG9yKSB7XG4gICAgICAgICAgbGFuZ3VhZ2VTZWxlY3Rvci51bm1vdW50KCk7XG4gICAgICAgICAgbGFuZ3VhZ2VTZWxlY3RvciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcbiAgICAgIG9uTGF1bmNoOiBhc3luYyAoYm90VHlwZSkgPT4ge1xuICAgICAgICBsb2coYFx1RDgzRFx1REU4MCBMYW56YW5kbyBib3Q6ICR7Ym90VHlwZX1gKTtcbiAgICAgICAgYXdhaXQgZG93bmxvYWRBbmRFeGVjdXRlQm90KGJvdFR5cGUsIExBVU5DSEVSX0NPTkZJRy5SQVdfQkFTRSk7XG4gICAgICB9LFxuICAgICAgXG4gICAgICBvbkNsb3NlOiAoKSA9PiB7XG4gICAgICAgIGxvZygnXHVEODNEXHVEQzRCIENlcnJhbmRvIGxhdW5jaGVyJyk7XG4gICAgICAgIC8vIEFzZWd1cmFyIHF1ZSBlbCBzZWxlY3RvciBzZSBkZXNtb250ZSBhbCBjZXJyYXJcbiAgICAgICAgaWYgKGxhbmd1YWdlU2VsZWN0b3IpIHtcbiAgICAgICAgICBsYW5ndWFnZVNlbGVjdG9yLnVubW91bnQoKTtcbiAgICAgICAgICBsYW5ndWFnZVNlbGVjdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuX193cGxhY2VCb3QubGF1bmNoZXJSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQ3JlYXIgc2VsZWN0b3IgZGUgaWRpb21hIGRlc3B1XHUwMEU5cyBkZSBsYSBVSVxuICAgIGxhbmd1YWdlU2VsZWN0b3IgPSBjcmVhdGVMYW5ndWFnZVNlbGVjdG9yKHtcbiAgICAgIHBvc2l0aW9uOiAndG9wLWxlZnQnLCAvLyBFc3F1aW5hIG9wdWVzdGEgYWwgbGF1bmNoZXJcbiAgICAgIHNob3dGbGFnczogdHJ1ZSxcbiAgICAgIG9uTGFuZ3VhZ2VDaGFuZ2U6IChuZXdMYW5ndWFnZSkgPT4ge1xuICAgICAgICBsb2coYFx1RDgzQ1x1REYwRCBJZGlvbWEgY2FtYmlhZG8gYTogJHtuZXdMYW5ndWFnZX0gZGVzZGUgZWwgbGF1bmNoZXJgKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFjdHVhbGl6YXIgdGV4dG9zIGRlIGxhIFVJIGRlbCBsYXVuY2hlclxuICAgICAgICB1aS51cGRhdGVUZXh0cygpO1xuICAgICAgICBcbiAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBwZXJzb25hbGl6YWRvIHBhcmEgbm90aWZpY2FyIGEgb3Ryb3MgbVx1MDBGM2R1bG9zXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuQ3VzdG9tRXZlbnQpIHtcbiAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgd2luZG93LkN1c3RvbUV2ZW50KCdsYXVuY2hlckxhbmd1YWdlQ2hhbmdlZCcsIHtcbiAgICAgICAgICAgIGRldGFpbDogeyBsYW5ndWFnZTogbmV3TGFuZ3VhZ2UgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIE1vbnRhciBlbCBzZWxlY3RvclxuICAgIGxhbmd1YWdlU2VsZWN0b3IubW91bnQoKTtcbiAgICBcbiAgICAvLyBDYXJnYXIgaW5mb3JtYWNpXHUwMEYzbiBpbmljaWFsXG4gICAgbG9nKCdcdUQ4M0RcdURDQ0EgQ2FyZ2FuZG8gaW5mb3JtYWNpXHUwMEYzbiBpbmljaWFsLi4uJyk7XG4gICAgXG4gICAgLy8gQ2FyZ2FyIGVzdGFkbyBkZWwgYmFja2VuZFxuICAgIGNvbnN0IGhlYWx0aCA9IGF3YWl0IGNoZWNrQmFja2VuZEhlYWx0aCgpO1xuICAgIHVpLnNldEhlYWx0aEluZm8oaGVhbHRoKTtcbiAgICBcbiAgICAvLyBDYXJnYXIgaW5mb3JtYWNpXHUwMEYzbiBkZWwgdXN1YXJpb1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRTZXNzaW9uKCk7XG4gICAgdWkuc2V0VXNlckluZm8odXNlcik7XG4gICAgXG4gICAgLy8gQ29uZmlndXJhciByZWZyZXNjbyBwZXJpXHUwMEYzZGljb1xuICAgIGxhdW5jaGVyU3RhdGUucmVmcmVzaFRpbWVyID0gd2luZG93LnNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIGxvZygnXHVEODNEXHVERDA0IEFjdHVhbGl6YW5kbyBpbmZvcm1hY2lcdTAwRjNuLi4uJyk7XG4gICAgICBcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFtuZXdIZWFsdGgsIG5ld1VzZXJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgIGNoZWNrQmFja2VuZEhlYWx0aCgpLFxuICAgICAgICAgIGdldFNlc3Npb24oKVxuICAgICAgICBdKTtcbiAgICAgICAgXG4gICAgICAgIHVpLnNldEhlYWx0aEluZm8obmV3SGVhbHRoKTtcbiAgICAgICAgdWkuc2V0VXNlckluZm8obmV3VXNlcik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2coJ1x1Mjc0QyBFcnJvciBlbiBhY3R1YWxpemFjaVx1MDBGM24gcGVyaVx1MDBGM2RpY2E6JywgZXJyb3IpO1xuICAgICAgfVxuICAgIH0sIExBVU5DSEVSX0NPTkZJRy5SRUZSRVNIX0lOVEVSVkFMKTtcbiAgICBcbiAgICAvLyBDbGVhbnVwIGN1YW5kbyBzZSBjaWVycmUgbGEgcFx1MDBFMWdpbmFcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xuICAgICAgdWkuY2xlYW51cCgpO1xuICAgICAgaWYgKGxhbmd1YWdlU2VsZWN0b3IpIHtcbiAgICAgICAgbGFuZ3VhZ2VTZWxlY3Rvci51bm1vdW50KCk7XG4gICAgICB9XG4gICAgICB3aW5kb3cuX193cGxhY2VCb3QubGF1bmNoZXJSdW5uaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gICAgXG4gICAgbG9nKCdcdTI3MDUgQXV0by1MYXVuY2hlciBpbmljaWFsaXphZG8gY29ycmVjdGFtZW50ZScpO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNzRDIEVycm9yIGluaWNpYWxpemFuZG8gQXV0by1MYXVuY2hlcjonLCBlcnJvcik7XG4gICAgd2luZG93Ll9fd3BsYWNlQm90LmxhdW5jaGVyUnVubmluZyA9IGZhbHNlO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgcnVuTGF1bmNoZXIgfSBmcm9tIFwiLi4vbGF1bmNoZXIvaW5kZXguanNcIjtcblxuKCgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIC8vIFZlcmlmaWNhciBzaSBoYXkgYm90cyBlc3BlY1x1MDBFRGZpY29zIGVqZWN1dFx1MDBFMW5kb3NlLCBubyBlbCBsYXVuY2hlclxuICBpZiAod2luZG93Ll9fd3BsYWNlQm90Py5mYXJtUnVubmluZyB8fCB3aW5kb3cuX193cGxhY2VCb3Q/LmltYWdlUnVubmluZykge1xuICAgIGFsZXJ0KFwiWWEgaGF5IHVuIGJvdCBlamVjdXRcdTAwRTFuZG9zZS4gQ2lcdTAwRTlycmFsbyBhbnRlcyBkZSB1c2FyIGVsIGxhdW5jaGVyLlwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIC8vIEluaWNpYWxpemFyIGVsIGVzdGFkbyBnbG9iYWwgc2kgbm8gZXhpc3RlXG4gIGlmICghd2luZG93Ll9fd3BsYWNlQm90KSB7XG4gICAgd2luZG93Ll9fd3BsYWNlQm90ID0ge307XG4gIH1cbiAgXG4gIHJ1bkxhdW5jaGVyKCkuY2F0Y2goKGUpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKFwiW0JPVF0gRXJyb3IgZW4gQXV0by1MYXVuY2hlcjpcIiwgZSk7XG4gICAgLy8gTGltcGlhciBzb2xvIGVsIGVzdGFkbyBkZWwgbGF1bmNoZXIsIG5vIGRlIG90cm9zIGJvdHNcbiAgICBpZiAod2luZG93Ll9fd3BsYWNlQm90KSB7XG4gICAgICB3aW5kb3cuX193cGxhY2VCb3QubGF1bmNoZXJSdW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGFsZXJ0KFwiQXV0by1MYXVuY2hlcjogZXJyb3IgaW5lc3BlcmFkby4gUmV2aXNhIGNvbnNvbGEuXCIpO1xuICB9KTtcbn0pKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7QUFVTyxNQUFNLE1BQU0sSUFBSSxNQUFNLFFBQVEsSUFBSSxZQUFZLEdBQUcsQ0FBQzs7O0FDVmxELFdBQVMsaUJBQWlCLFNBQVMsTUFBTTtBQUM5QyxVQUFNLE9BQU8sU0FBUyxjQUFjLEtBQUs7QUFDekMsUUFBSSxRQUFRO0FBQ1YsV0FBSyxLQUFLO0FBQUEsSUFDWjtBQUNBLFNBQUssTUFBTSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUXJCLFVBQU0sT0FBTyxLQUFLLGFBQWEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQyxhQUFTLEtBQUssWUFBWSxJQUFJO0FBRTlCLFdBQU8sRUFBRSxNQUFNLEtBQUs7QUFBQSxFQUN0QjtBQUVPLFdBQVMsY0FBYyxZQUFZLFNBQVM7QUFDakQsUUFBSSxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPO0FBRXpDLGVBQVcsTUFBTSxTQUFTO0FBQzFCLGVBQVcsaUJBQWlCLGFBQWEsYUFBYTtBQUV0RCxhQUFTLGNBQWMsR0FBRztBQUV4QixVQUFJLEVBQUUsT0FBTyxRQUFRLGlDQUFpQyxFQUFHO0FBRXpELFFBQUUsZUFBZTtBQUNqQixhQUFPLEVBQUU7QUFDVCxhQUFPLEVBQUU7QUFDVCxlQUFTLGlCQUFpQixXQUFXLGdCQUFnQjtBQUNyRCxlQUFTLGlCQUFpQixhQUFhLFdBQVc7QUFBQSxJQUNwRDtBQUVBLGFBQVMsWUFBWSxHQUFHO0FBQ3RCLFFBQUUsZUFBZTtBQUNqQixhQUFPLE9BQU8sRUFBRTtBQUNoQixhQUFPLE9BQU8sRUFBRTtBQUNoQixhQUFPLEVBQUU7QUFDVCxhQUFPLEVBQUU7QUFDVCxjQUFRLE1BQU0sTUFBTyxRQUFRLFlBQVksT0FBUTtBQUNqRCxjQUFRLE1BQU0sT0FBUSxRQUFRLGFBQWEsT0FBUTtBQUFBLElBQ3JEO0FBRUEsYUFBUyxtQkFBbUI7QUFDMUIsZUFBUyxvQkFBb0IsV0FBVyxnQkFBZ0I7QUFDeEQsZUFBUyxvQkFBb0IsYUFBYSxXQUFXO0FBQUEsSUFDdkQ7QUFBQSxFQUNGOzs7QUNsRE8sTUFBTSxLQUFLO0FBQUE7QUFBQSxJQUVoQixVQUFVO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsSUFDYjtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFFZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUVuQixxQkFBcUI7QUFBQSxNQUNyQixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDVixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQix5QkFBeUI7QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixvQkFBb0I7QUFBQSxNQUNwQixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUE7QUFBQSxNQUVkLG1CQUFtQjtBQUFBLE1BQ25CLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLG9CQUFvQjtBQUFBLE1BQ3BCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLHFCQUFxQjtBQUFBLE1BQ3JCLGVBQWU7QUFBQSxNQUNmLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLG9CQUFvQjtBQUFBLE1BQ3BCLG9CQUFvQjtBQUFBLE1BQ3BCLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQTtBQUFBLE1BRVgsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsbUJBQW1CO0FBQUEsTUFDbkIsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLElBQ2hCO0FBQUE7QUFBQSxJQUdBLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLHFCQUFxQjtBQUFBLE1BQ3JCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLHFCQUFxQjtBQUFBLE1BQ3JCLGdCQUFnQjtBQUFBLE1BQ2hCLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLG9CQUFvQjtBQUFBLE1BQ3BCLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLFFBQVE7QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLElBQUk7QUFBQSxNQUNKLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLElBQ25CO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLG9CQUFvQjtBQUFBLE1BQ3BCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLG9CQUFvQjtBQUFBLE1BQ3BCLGtCQUFrQjtBQUFBLE1BQ2xCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjs7O0FDalRPLE1BQU0sS0FBSztBQUFBO0FBQUEsSUFFaEIsVUFBVTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUEsTUFFbkIsbUJBQW1CO0FBQUEsTUFFbkIscUJBQXFCO0FBQUEsTUFDckIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1YsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFD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TixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxJQUNuQjtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixvQkFBb0I7QUFBQSxNQUNwQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixvQkFBb0I7QUFBQSxNQUNwQixrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7OztBQzdTTyxNQUFNLEtBQUs7QUFBQTtBQUFBLElBRWhCLFVBQVU7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLGVBQWU7QUFBQSxNQUNmLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBLE1BRWxCLG1CQUFtQjtBQUFBLE1BRXBCLHFCQUFxQjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNWLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLHlCQUF5QjtBQUFBLE1BQ3pCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUFBLE1BRWQsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2Qsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFB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QUFvQjtBQUFBLE1BQ3BCLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLHFCQUFxQjtBQUFBLE1BQ3JCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGFBQWE7QUFBQSxNQUViLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLHFCQUFxQjtBQUFBLE1BQ3JCLGdCQUFnQjtBQUFBLE1BQ2hCLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1B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LE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUEsTUFFbEIsbUJBQW1CO0FBQUEsTUFFcEIscUJBQXFCO0FBQUEsTUFDckIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osZUFBZTtBQUFBLE1BQ2YscUJBQXFCO0FBQUEsTUFDckIseUJBQXlCO0FBQUEsTUFDekIsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBO0FBQUEsTUFFZCxtQkFBbUI7QUFBQSxNQUNuQixvQkFBb0I7QUFBQSxNQUNwQixjQUFjO0FBQUEsTUFDZCxvQkFBb0I7QUFBQSxNQUNwQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixxQkFBcUI7QUFBQSxNQUNyQixlQUFlO0FBQUEsTUFDZixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixvQkFBb0I7QUFBQSxNQUNwQixvQkFBb0I7QUFBQSxNQUNwQixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsSUFDYjtBQUFBO0FBQUEsSUFHQSxNQUFNO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixPQUFPO0FBQUEsTUFDUCxnQkFBZ0I7QUFBQSxNQUNoQixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxZQUFZO0FBQUEsTUFDWixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixxQkFBcUI7QUFBQSxNQUNyQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixxQkFBcUI7QUFBQSxNQUNyQixnQkFBZ0I7QUFBQSxNQUNoQixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixZQUFZO0FBQUEsTUFDWixjQUFjO0FBQUEsTUFDZCxpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixvQkFBb0I7QUFBQSxNQUNwQixXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsSUFDYjtBQUFBO0FBQUEsSUFHQSxRQUFRO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxJQUNuQjtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixvQkFBb0I7QUFBQSxNQUNwQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixvQkFBb0I7QUFBQSxNQUNwQixrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7OztBQzdTTyxNQUFNLFNBQVM7QUFBQTtBQUFBLElBRXBCLFVBQVU7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLGVBQWU7QUFBQSxNQUNmLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBLE1BRWxCLG1CQUFtQjtBQUFBLE1BRXBCLHFCQUFxQjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLGVBQWU7QUFBQSxNQUNmLHFCQUFxQjtBQUFBLE1BQ3JCLHlCQUF5QjtBQUFBLE1BQ3pCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUFBLE1BRWQsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2Qsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BQ2Ysa0JBQWtCO0FBQUEsTUFDbEIscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGOzs7QUNyU08sTUFBTSxzQkFBc0I7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
