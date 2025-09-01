/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-09-01T22:30:13.791Z */
(()=>{var jt=Object.defineProperty;var Z=(o,e)=>()=>(o&&(e=o(o=0)),e);var ct=(o,e)=>{for(var a in e)jt(o,a,{get:e[a],enumerable:!0})};var i,W=Z(()=>{i=(...o)=>console.log("[WPA-UI]",...o)});var dt,ut=Z(()=>{dt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",userName:"Usuario",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",showOverlay:"Mostrar overlay",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando...",paintPattern:"\u{1F4D0} Patr\xF3n de pintado",patternLinearStart:"Lineal (Inicio)",patternLinearEnd:"Lineal (Final)",patternRandom:"Aleatorio",patternCenterOut:"Centro hacia afuera",patternCornersFirst:"Esquinas primero",patternSpiral:"Espiral",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",userInfo:"Informaci\xF3n del Usuario",imageProgress:"Progreso de la Imagen",availableColors:"Colores Disponibles",noImageLoaded:"No hay imagen cargada",cooldown:"Tiempo de espera",totalColors:"Total de Colores",colorPalette:"Paleta de Colores",showAllColors:"Mostrar Todos los Colores (incluyendo no disponibles)",selectAllColors:"Seleccionar Todos",unselectAllColors:"Deseleccionar Todos",noAvailable:"No disponible",colorSelected:"Color seleccionado",statsUpdated:"\u2705 Estad\xEDsticas actualizadas: {count} colores disponibles"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Inicializar Guard-BOT",selectArea:"Seleccionar \xC1rea",captureArea:"Capturar \xC1rea",startProtection:"Iniciar",stopProtection:"Detener",protectedPixels:"P\xEDxeles Protegidos",upperLeft:"Esquina Superior Izquierda",lowerRight:"Esquina Inferior Derecha",detectedChanges:"Cambios Detectados",repairedPixels:"P\xEDxeles Reparados",charges:"Cargas",waitingInit:"Esperando inicializaci\xF3n...",checkingColors:"\u{1F3A8} Verificando colores disponibles...",noColorsFound:"\u274C No se encontraron colores. Abre la paleta de colores en el sitio.",colorsFound:"\u2705 {count} colores disponibles encontrados",initSuccess:"\u2705 Guard-BOT inicializado correctamente",initError:"\u274C Error inicializando Guard-BOT",invalidCoords:"\u274C Coordenadas inv\xE1lidas",invalidArea:"\u274C El \xE1rea debe tener esquina superior izquierda menor que inferior derecha",areaTooLarge:"\u274C \xC1rea demasiado grande: {size} p\xEDxeles (m\xE1ximo: {max})",capturingArea:"\u{1F4F8} Capturando \xE1rea...",areaCaptured:"\u2705 \xC1rea capturada: {count} p\xEDxeles",captureError:"\u274C Error capturando \xE1rea: {error}",captureFirst:"\u274C Primero captura un \xE1rea",noChanges:"\u2705 \xC1rea - sin cambios detectados",changesDetected:"\u{1F6A8} {count} cambios detectados en el \xE1rea",repairing:"\u{1F6E0}\uFE0F Reparando {count} p\xEDxeles alterados...",repairedSuccess:"\u2705 Reparados {count} p\xEDxeles correctamente",repairError:"\u274C Error reparando p\xEDxeles: {error}",noCharges:"\u26A0\uFE0F Sin cargas suficientes para reparar cambios",checkingChanges:"\u{1F50D} Verificando cambios en \xE1rea...",errorChecking:"\u274C Error verificando cambios: {error}",guardActive:"\u{1F6E1}\uFE0F Guardi\xE1n activo - \xE1rea monitoreada",lastCheck:"\xDAltima verificaci\xF3n: {time}",nextCheck:"Pr\xF3xima verificaci\xF3n en: {time}s",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Guard-BOT iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",manualInitRequired:"\u{1F527} Inicio manual requerido",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",protectionStopped:"\u23F9\uFE0F Protecci\xF3n detenida",selectUpperLeft:"\u{1F3AF} Pinta un p\xEDxel en la esquina SUPERIOR IZQUIERDA del \xE1rea a monitorear",selectLowerRight:"\u{1F3AF} Ahora pinta un p\xEDxel en la esquina INFERIOR DERECHA del \xE1rea",waitingUpperLeft:"\u{1F446} Esperando selecci\xF3n de esquina superior izquierda...",waitingLowerRight:"\u{1F446} Esperando selecci\xF3n de esquina inferior derecha...",upperLeftCaptured:"\u2705 Esquina superior izquierda capturada: ({x}, {y})",lowerRightCaptured:"\u2705 Esquina inferior derecha capturada: ({x}, {y})",selectionTimeout:"\u274C Tiempo agotado para selecci\xF3n",selectionError:"\u274C Error en selecci\xF3n, int\xE9ntalo de nuevo",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",analysisTitle:"An\xE1lisis de Diferencias - JSON vs Canvas Actual",correctPixels:"P\xEDxeles Correctos",incorrectPixels:"P\xEDxeles Incorrectos",missingPixels:"P\xEDxeles Faltantes",showCorrect:"Mostrar Correctos",showIncorrect:"Mostrar Incorrectos",showMissing:"Mostrar Faltantes",autoRefresh:"Auto-refresco",zoomAdjusted:"Zoom ajustado autom\xE1ticamente a",autoRefreshEnabled:"Auto-refresco activado cada",autoRefreshDisabled:"Auto-refresco desactivado",autoRefreshIntervalUpdated:"Intervalo de auto-refresco actualizado a",visualizationUpdated:"Visualizaci\xF3n actualizada",configTitle:"Configuraci\xF3n del Guard",protectionPatterns:"Patrones de Protecci\xF3n",preferSpecificColor:"Priorizar color espec\xEDfico",excludeSpecificColors:"No reparar colores espec\xEDficos",loadManagement:"Gesti\xF3n de Cargas",minLoadsToWait:"M\xEDnimo de cargas:",pixelsPerBatch:"P\xEDxeles por lote",spendAllPixelsOnStart:"Gastar todos los p\xEDxeles al iniciar",waitTimes:"Tiempos de Espera",useRandomTimes:"Usar tiempos aleatorios entre lotes",minTime:"Tiempo m\xEDnimo (s)",maxTime:"Tiempo m\xE1ximo (s)"}}});var gt,pt=Z(()=>{gt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",userName:"User",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",showOverlay:"Show overlay",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout, retrying...",protectionEnabled:"Protection enabled",protectionDisabled:"Protection disabled",paintPattern:"Paint pattern",patternLinearStart:"Linear (Start)",patternLinearEnd:"Linear (End)",patternRandom:"Random",patternCenterOut:"Center outward",patternCornersFirst:"Corners first",patternSpiral:"Spiral",solid:"Solid",stripes:"Stripes",checkerboard:"Checkerboard",gradient:"Gradient",dots:"Dots",waves:"Waves",spiral:"Spiral",mosaic:"Mosaic",bricks:"Bricks",zigzag:"Zigzag",protectingDrawing:"Protecting drawing...",changesDetected:"\u{1F6A8} {count} changes detected in drawing",repairing:"\u{1F527} Repairing {count} altered pixels...",repairCompleted:"\u2705 Repair completed: {count} pixels",noChargesForRepair:"\u26A1 No charges for repair, waiting...",protectionPriority:"\u{1F6E1}\uFE0F Protection priority activated",patternApplied:"Pattern applied",customPattern:"Custom pattern",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialize Guard-BOT",selectArea:"Select Area",captureArea:"Capture Area",startProtection:"Start Protection",stopProtection:"Stop Protection",upperLeft:"Upper Left Corner",lowerRight:"Lower Right Corner",protectedPixels:"Protected Pixels",detectedChanges:"Detected Changes",repairedPixels:"Repaired Pixels",charges:"Charges",waitingInit:"Waiting for initialization...",checkingColors:"\u{1F3A8} Checking available colors...",noColorsFound:"\u274C No colors found. Open the color palette on the site.",colorsFound:"\u2705 Found {count} available colors",initSuccess:"\u2705 Guard-BOT initialized successfully",initError:"\u274C Error initializing Guard-BOT",invalidCoords:"\u274C Invalid coordinates",invalidArea:"\u274C Area must have upper left corner less than lower right corner",areaTooLarge:"\u274C Area too large: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capturing protection area...",areaCaptured:"\u2705 Area captured: {count} pixels under protection",captureError:"\u274C Error capturing area: {error}",captureFirst:"\u274C First capture a protection area",protectionStarted:"\u{1F6E1}\uFE0F Protection started - monitoring area",protectionStopped:"\u23F9\uFE0F Protection stopped",noChanges:"\u2705 Protected area - no changes detected",changesDetected:"\u{1F6A8} {count} changes detected in protected area",repairing:"\u{1F6E0}\uFE0F Repairing {count} altered pixels...",repairedSuccess:"\u2705 Successfully repaired {count} pixels",repairError:"\u274C Error repairing pixels: {error}",noCharges:"\u26A0\uFE0F Insufficient charges to repair changes",checkingChanges:"\u{1F50D} Checking changes in protected area...",errorChecking:"\u274C Error checking changes: {error}",guardActive:"\u{1F6E1}\uFE0F Guardian active - area under protection",lastCheck:"Last check: {time}",nextCheck:"Next check in: {time}s",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Guard-BOT auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",manualInitRequired:"\u{1F527} Manual initialization required",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",selectUpperLeft:"\u{1F3AF} Paint a pixel at the UPPER LEFT corner of the area to protect",selectLowerRight:"\u{1F3AF} Now paint a pixel at the LOWER RIGHT corner of the area",waitingUpperLeft:"\u{1F446} Waiting for upper left corner selection...",waitingLowerRight:"\u{1F446} Waiting for lower right corner selection...",upperLeftCaptured:"\u2705 Upper left corner captured: ({x}, {y})",lowerRightCaptured:"\u2705 Lower right corner captured: ({x}, {y})",selectionTimeout:"\u274C Selection timeout",selectionError:"\u274C Selection error, please try again",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close",analysisTitle:"Difference Analysis - JSON vs Current Canvas",correctPixels:"Correct Pixels",incorrectPixels:"Incorrect Pixels",missingPixels:"Missing Pixels",showCorrect:"Show Correct",showIncorrect:"Show Incorrect",showMissing:"Show Missing",autoRefresh:"Auto-refresh",zoomAdjusted:"Zoom automatically adjusted to",autoRefreshEnabled:"Auto-refresh enabled every",autoRefreshDisabled:"Auto-refresh disabled",autoRefreshIntervalUpdated:"Auto-refresh interval updated to",visualizationUpdated:"Visualization updated",configTitle:"Guard Configuration",protectionPatterns:"Protection Patterns",preferSpecificColor:"Prioritize specific color",excludeSpecificColors:"Don't repair specific colors",loadManagement:"Load Management",minLoadsToWait:"Minimum loads to wait",pixelsPerBatch:"Pixels per batch",spendAllPixelsOnStart:"Spend all pixels on start",waitTimes:"Wait Times",useRandomTimes:"Use random times between batches",minTime:"Minimum time (s)",maxTime:"Maximum time (s)"}}});var mt,ht=Z(()=>{mt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",userName:"Usager",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",showOverlay:"Afficher l'overlay",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 D\xE9lai d\u2019attente du serveur, nouvelle tentative...",protectionEnabled:"Protection activ\xE9e",protectionDisabled:"Protection d\xE9sactiv\xE9e",paintPattern:"Motif de peinture",patternLinearStart:"Lin\xE9aire (D\xE9but)",patternLinearEnd:"Lin\xE9aire (Fin)",patternRandom:"Al\xE9atoire",patternCenterOut:"Centre vers l\u2019ext\xE9rieur",patternCornersFirst:"Coins d\u2019abord",patternSpiral:"Spirale",solid:"Plein",stripes:"Rayures",checkerboard:"Damier",gradient:"D\xE9grad\xE9",dots:"Points",waves:"Vagues",spiral:"Spirale",mosaic:"Mosa\xEFque",bricks:"Briques",zigzag:"Zigzag",protectingDrawing:"Protection du dessin...",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans le dessin",repairing:"\u{1F527} R\xE9paration de {count} pixels modifi\xE9s...",repairCompleted:"\u2705 R\xE9paration termin\xE9e : {count} pixels",noChargesForRepair:"\u26A1 Pas de frais pour la r\xE9paration, en attente...",protectionPriority:"\u{1F6E1}\uFE0F Priorit\xE9 \xE0 la protection activ\xE9e",patternApplied:"Motif appliqu\xE9",customPattern:"Motif personnalis\xE9",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialiser Guard-BOT",selectArea:"S\xE9lectionner Zone",captureArea:"Capturer Zone",startProtection:"D\xE9marrer Protection",stopProtection:"Arr\xEAter Protection",upperLeft:"Coin Sup\xE9rieur Gauche",lowerRight:"Coin Inf\xE9rieur Droit",protectedPixels:"Pixels Prot\xE9g\xE9s",detectedChanges:"Changements D\xE9tect\xE9s",repairedPixels:"Pixels R\xE9par\xE9s",charges:"Charges",waitingInit:"En attente d'initialisation...",checkingColors:"\u{1F3A8} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Aucune couleur trouv\xE9e. Ouvrez la palette de couleurs sur le site.",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",initSuccess:"\u2705 Guard-BOT initialis\xE9 avec succ\xE8s",initError:"\u274C Erreur lors de l'initialisation de Guard-BOT",invalidCoords:"\u274C Coordonn\xE9es invalides",invalidArea:"\u274C La zone doit avoir le coin sup\xE9rieur gauche inf\xE9rieur au coin inf\xE9rieur droit",areaTooLarge:"\u274C Zone trop grande: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capture de la zone de protection...",areaCaptured:"\u2705 Zone captur\xE9e: {count} pixels sous protection",captureError:"\u274C Erreur lors de la capture de zone: {error}",captureFirst:"\u274C Capturez d'abord une zone de protection",protectionStarted:"\u{1F6E1}\uFE0F Protection d\xE9marr\xE9e - surveillance de la zone",protectionStopped:"\u23F9\uFE0F Protection arr\xEAt\xE9e",noChanges:"\u2705 Zone prot\xE9g\xE9e - aucun changement d\xE9tect\xE9",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans la zone prot\xE9g\xE9e",repairing:"\u{1F6E0}\uFE0F R\xE9paration de {count} pixels alt\xE9r\xE9s...",repairedSuccess:"\u2705 {count} pixels r\xE9par\xE9s avec succ\xE8s",repairError:"\u274C Erreur lors de la r\xE9paration des pixels: {error}",noCharges:"\u26A0\uFE0F Charges insuffisantes pour r\xE9parer les changements",checkingChanges:"\u{1F50D} V\xE9rification des changements dans la zone prot\xE9g\xE9e...",errorChecking:"\u274C Erreur lors de la v\xE9rification des changements: {error}",guardActive:"\u{1F6E1}\uFE0F Gardien actif - zone sous protection",lastCheck:"Derni\xE8re v\xE9rification: {time}",nextCheck:"Prochaine v\xE9rification dans: {time}s",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Guard-BOT d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",manualInitRequired:"\u{1F527} Initialisation manuelle requise",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",selectUpperLeft:"\u{1F3AF} Peignez un pixel au coin SUP\xC9RIEUR GAUCHE de la zone \xE0 prot\xE9ger",selectLowerRight:"\u{1F3AF} Maintenant peignez un pixel au coin INF\xC9RIEUR DROIT de la zone",waitingUpperLeft:"\u{1F446} En attente de la s\xE9lection du coin sup\xE9rieur gauche...",waitingLowerRight:"\u{1F446} En attente de la s\xE9lection du coin inf\xE9rieur droit...",upperLeftCaptured:"\u2705 Coin sup\xE9rieur gauche captur\xE9: ({x}, {y})",lowerRightCaptured:"\u2705 Coin inf\xE9rieur droit captur\xE9: ({x}, {y})",selectionTimeout:"\u274C D\xE9lai de s\xE9lection d\xE9pass\xE9",selectionError:"\u274C Erreur de s\xE9lection, veuillez r\xE9essayer",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer",analysisTitle:"Analyse des Diff\xE9rences - JSON vs Canvas Actuel",correctPixels:"Pixels Corrects",incorrectPixels:"Pixels Incorrects",missingPixels:"Pixels Manquants",showCorrect:"Afficher Corrects",showIncorrect:"Afficher Incorrects",showMissing:"Afficher Manquants",autoRefresh:"Actualisation automatique",zoomAdjusted:"Zoom ajust\xE9 automatiquement \xE0",autoRefreshEnabled:"Actualisation automatique activ\xE9e toutes les",autoRefreshDisabled:"Actualisation automatique d\xE9sactiv\xE9e",autoRefreshIntervalUpdated:"Intervalle d'actualisation automatique mis \xE0 jour \xE0",visualizationUpdated:"Visualisation mise \xE0 jour",configTitle:"Configuration du Guard",protectionPatterns:"Mod\xE8les de Protection",preferSpecificColor:"Prioriser une couleur sp\xE9cifique",excludeSpecificColors:"Ne pas r\xE9parer les couleurs sp\xE9cifiques",loadManagement:"Gestion des Charges",minLoadsToWait:"Minimum de charges \xE0 attendre",pixelsPerBatch:"Pixels par lot",spendAllPixelsOnStart:"D\xE9penser tous les pixels au d\xE9marrage",waitTimes:"Temps d'Attente",useRandomTimes:"Utiliser des temps al\xE9atoires entre les lots",minTime:"Temps minimum (s)",maxTime:"Temps maximum (s)"}}});var ft,xt=Z(()=>{ft={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",autoImage:"\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",autoGuard:"\u{1F6E1}\uFE0F \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",selection:"\u0412\u044B\u0431\u0440\u0430\u043D\u043E",user:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",charges:"\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",backend:"\u0411\u044D\u043A\u0435\u043D\u0434",database:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",uptime:"\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",launch:"\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",executing:"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",downloading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",chooseBot:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",readyToLaunch:"\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",loadError:"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",loadErrorMsg:"\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",checking:"\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",online:"\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",offline:"\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",ok:"\u{1F7E2} \u041E\u041A",error:"\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",unknown:"-",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},image:{title:"WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",uploadImage:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",resizeImage:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",startPainting:"\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",stopPainting:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",saveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",loadProgress:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",checkingColors:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",loadingImage:"\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",imageLoaded:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",imageError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPositionAlert:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",positionDetected:"\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",positionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",startPaintingMsg:"\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",paintingProgress:"\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",noCharges:"\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",paintingStopped:"\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",paintingComplete:"\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",paintingError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",missingRequirements:"\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",progress:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",userName:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",pixels:"\u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",estimatedTime:"\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",initMessage:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",resizeSuccess:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",paintingPaused:"\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",batchSize:"\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",nextBatchTime:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437",useAllCharges:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",showOverlay:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435",maxCharges:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",waitingForCharges:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",timeRemaining:"\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",cooldownWaiting:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",progressSaved:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",progressLoaded:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",progressLoadError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",progressSaveError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",confirmSaveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",saveProgressTitle:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",discardProgress:"\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",minimize:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",width:"\u0428\u0438\u0440\u0438\u043D\u0430",height:"\u0412\u044B\u0441\u043E\u0442\u0430",keepAspect:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",apply:"\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",overlayOn:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u041A\u041B",overlayOff:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u042B\u041A\u041B",passCompleted:"\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",waitingChargesRegen:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",waitingChargesCountdown:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",retryAttempt:"\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryError:"\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryFailed:"\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",networkError:"\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",serverError:"\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",timeoutError:"\u23F0 \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",protectionEnabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430",protectionDisabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",paintPattern:"\u0428\u0430\u0431\u043B\u043E\u043D \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",patternLinearStart:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043D\u0430\u0447\u0430\u043B\u043E)",patternLinearEnd:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043A\u043E\u043D\u0435\u0446)",patternRandom:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",patternCenterOut:"\u0418\u0437 \u0446\u0435\u043D\u0442\u0440\u0430 \u043D\u0430\u0440\u0443\u0436\u0443",patternCornersFirst:"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0433\u043B\u044B",patternSpiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",solid:"\u0421\u043F\u043B\u043E\u0448\u043D\u043E\u0439",stripes:"\u041F\u043E\u043B\u043E\u0441\u044B",checkerboard:"\u0428\u0430\u0445\u043C\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u043A\u0430",gradient:"\u0413\u0440\u0430\u0434\u0438\u0435\u043D\u0442",dots:"\u0422\u043E\u0447\u043A\u0438",waves:"\u0412\u043E\u043B\u043D\u044B",spiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",mosaic:"\u041C\u043E\u0437\u0430\u0438\u043A\u0430",bricks:"\u041A\u0438\u0440\u043F\u0438\u0447\u0438",zigzag:"\u0417\u0438\u0433\u0437\u0430\u0433",protectingDrawing:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0438\u0441\u0443\u043D\u043A\u0430...",changesDetected:"\u{1F6A8} \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {count}",repairing:"\u{1F527} \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairCompleted:"\u2705 \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",noChargesForRepair:"\u26A1 \u041A\u043E\u043C\u0438\u0441\u0441\u0438\u0439 \u0437\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435\u0442, \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435...",protectionPriority:"\u{1F6E1}\uFE0F \u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u044B \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D",patternApplied:"\u0428\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D",customPattern:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0448\u0430\u0431\u043B\u043E\u043D",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},farm:{title:"WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",stopped:"\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",calibrate:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",paintOnce:"\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",checkingStatus:"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",configuration:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",delay:"\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",minCharges:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",colorMode:"\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",random:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",fixed:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",range:"\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",fixedColor:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",advanced:"\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",tileX:"\u041F\u043B\u0438\u0442\u043A\u0430 X",tileY:"\u041F\u043B\u0438\u0442\u043A\u0430 Y",customPalette:"\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",paletteExample:"\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",capture:"\u0417\u0430\u0445\u0432\u0430\u0442",painted:"\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",retries:"\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",tile:"\u041F\u043B\u0438\u0442\u043A\u0430",configSaved:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",configLoaded:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",configReset:"\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",captureInstructions:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",backendOnline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",backendOffline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u0444\u043B\u0430\u0439\u043D",startingBot:"\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",stoppingBot:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",calibrating:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",alreadyRunning:"\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",imageRunningWarning:"\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C",selectPositionAlert:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",missingPosition:"\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",farmRadius:"\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",positionInfo:"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",farmingInRadius:"\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",selectEmptyArea:"\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",noPosition:"\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",currentZone:"\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},common:{yes:"\u0414\u0430",no:"\u041D\u0435\u0442",ok:"\u041E\u041A",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",load:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",edit:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",pause:"\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",resume:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",reset:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",help:"\u041F\u043E\u043C\u043E\u0449\u044C",about:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",language:"\u042F\u0437\u044B\u043A",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",error:"\u041E\u0448\u0438\u0431\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",info:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",languageChanged:"\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"},guard:{title:"WPlace \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Guard-BOT",selectArea:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",captureArea:"\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",startProtection:"\u041D\u0430\u0447\u0430\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",stopProtection:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",upperLeft:"\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u041B\u0435\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",lowerRight:"\u041D\u0438\u0436\u043D\u0438\u0439 \u041F\u0440\u0430\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",protectedPixels:"\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",detectedChanges:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0435 \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",repairedPixels:"\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",checkingColors:"\u{1F3A8} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u0426\u0432\u0435\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435.",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",initSuccess:"\u2705 Guard-BOT \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D",initError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 Guard-BOT",invalidCoords:"\u274C \u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B",invalidArea:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430",areaTooLarge:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F: {size} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 (\u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C: {max})",capturingArea:"\u{1F4F8} \u0417\u0430\u0445\u0432\u0430\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0437\u0430\u0449\u0438\u0442\u044B...",areaCaptured:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D\u0430: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",captureError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438: {error}",captureFirst:"\u274C \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u044B",protectionStarted:"\u{1F6E1}\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430 - \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",protectionStopped:"\u23F9\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",noChanges:"\u2705 \u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C - \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E",changesDetected:"\u{1F6A8} {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",repairing:"\u{1F6E0}\uFE0F \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairedSuccess:"\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",repairError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439: {error}",noCharges:"\u26A0\uFE0F \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439",checkingChanges:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438...",errorChecking:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {error}",guardActive:"\u{1F6E1}\uFE0F \u0421\u0442\u0440\u0430\u0436 \u0430\u043A\u0442\u0438\u0432\u0435\u043D - \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",lastCheck:"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: {time}",nextCheck:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u0440\u0435\u0437: {time}\u0441",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 Guard-BOT \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",selectUpperLeft:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0412\u0415\u0420\u0425\u041D\u0415\u041C \u041B\u0415\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B",selectLowerRight:"\u{1F3AF} \u0422\u0435\u043F\u0435\u0440\u044C \u043D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041D\u0418\u0416\u041D\u0415\u041C \u041F\u0420\u0410\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",waitingUpperLeft:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u043B\u0435\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",waitingLowerRight:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",upperLeftCaptured:"\u2705 \u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",lowerRightCaptured:"\u2705 \u041D\u0438\u0436\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",selectionTimeout:"\u274C \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430",selectionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",analysisTitle:"\u0410\u043D\u0430\u043B\u0438\u0437 \u0420\u0430\u0437\u043B\u0438\u0447\u0438\u0439 - JSON vs \u0422\u0435\u043A\u0443\u0449\u0438\u0439 Canvas",correctPixels:"\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",incorrectPixels:"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",missingPixels:"\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",showCorrect:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435",showIncorrect:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435",showMissing:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435",autoRefresh:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",zoomAdjusted:"\u041C\u0430\u0441\u0448\u0442\u0430\u0431 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u043D\u0430",autoRefreshEnabled:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043A\u0430\u0436\u0434\u044B\u0435",autoRefreshDisabled:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E",autoRefreshIntervalUpdated:"\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0430\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D \u0434\u043E",visualizationUpdated:"\u0412\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430",configTitle:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F Guard",protectionPatterns:"\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u0417\u0430\u0449\u0438\u0442\u044B",preferSpecificColor:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0446\u0432\u0435\u0442\u0430",excludeSpecificColors:"\u041D\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u0446\u0432\u0435\u0442\u0430",loadManagement:"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u041D\u0430\u0433\u0440\u0443\u0437\u043A\u043E\u0439",minLoadsToWait:"\u041C\u0438\u043D\u0438\u043C\u0443\u043C \u0437\u0430\u0433\u0440\u0443\u0437\u043E\u043A \u0434\u043B\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0430\u0440\u0442\u0438\u044E",spendAllPixelsOnStart:"\u041F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u0438 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435",waitTimes:"\u0412\u0440\u0435\u043C\u044F \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u044F",useRandomTimes:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u043C\u0435\u0436\u0434\u0443 \u043F\u0430\u0440\u0442\u0438\u044F\u043C\u0438",minTime:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F (\u0441)",maxTime:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F (\u0441)"}}});var wt,bt=Z(()=>{wt={launcher:{title:"WPlace \u81EA\u52A8\u673A\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52A8\u519C\u573A",autoImage:"\u{1F3A8} \u81EA\u52A8\u7ED8\u56FE",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52A8\u5B88\u62A4",selection:"\u9009\u62E9",user:"\u7528\u6237",charges:"\u6B21\u6570",backend:"\u540E\u7AEF",database:"\u6570\u636E\u5E93",uptime:"\u8FD0\u884C\u65F6\u95F4",close:"\u5173\u95ED",launch:"\u542F\u52A8",loading:"\u52A0\u8F7D\u4E2D\u2026",executing:"\u6267\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F7D\u811A\u672C\u2026",chooseBot:"\u9009\u62E9\u4E00\u4E2A\u673A\u5668\u4EBA\u5E76\u70B9\u51FB\u542F\u52A8",readyToLaunch:"\u51C6\u5907\u542F\u52A8",loadError:"\u52A0\u8F7D\u9519\u8BEF",loadErrorMsg:"\u65E0\u6CD5\u52A0\u8F7D\u6240\u9009\u673A\u5668\u4EBA\u3002\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6216\u91CD\u8BD5\u3002",checking:"\u{1F504} \u68C0\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7EBF",offline:"\u{1F534} \u79BB\u7EBF",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u9519\u8BEF",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},image:{title:"WPlace \u81EA\u52A8\u7ED8\u56FE",initBot:"\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA",uploadImage:"\u4E0A\u4F20\u56FE\u7247",resizeImage:"\u8C03\u6574\u56FE\u7247\u5927\u5C0F",selectPosition:"\u9009\u62E9\u4F4D\u7F6E",startPainting:"\u5F00\u59CB\u7ED8\u5236",stopPainting:"\u505C\u6B62\u7ED8\u5236",saveProgress:"\u4FDD\u5B58\u8FDB\u5EA6",loadProgress:"\u52A0\u8F7D\u8FDB\u5EA6",checkingColors:"\u{1F50D} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u540E\u91CD\u8BD5\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F7D\u56FE\u7247...",imageLoaded:"\u2705 \u56FE\u7247\u5DF2\u52A0\u8F7D\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u4E2A",imageError:"\u274C \u56FE\u7247\u52A0\u8F7D\u5931\u8D25",selectPositionAlert:"\u8BF7\u5728\u4F60\u60F3\u5F00\u59CB\u7ED8\u5236\u7684\u5730\u65B9\u6D82\u7B2C\u4E00\u4E2A\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8BBE\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9009\u62E9\u8D85\u65F6",positionDetected:"\u{1F3AF} \u5DF2\u68C0\u6D4B\u5230\u4F4D\u7F6E\uFF0C\u5904\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u68C0\u6D4B\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",startPaintingMsg:"\u{1F3A8} \u5F00\u59CB\u7ED8\u5236...",paintingProgress:"\u{1F9F1} \u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6CA1\u6709\u6B21\u6570\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7ED8\u5236",paintingComplete:"\u2705 \u7ED8\u5236\u5B8C\u6210\uFF01\u5171\u7ED8\u5236 {count} \u4E2A\u50CF\u7D20\u3002",paintingError:"\u274C \u7ED8\u5236\u8FC7\u7A0B\u4E2D\u51FA\u9519",missingRequirements:"\u274C \u8BF7\u5148\u52A0\u8F7D\u56FE\u7247\u5E76\u9009\u62E9\u4F4D\u7F6E",progress:"\u8FDB\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6570",estimatedTime:"\u9884\u8BA1\u65F6\u95F4",initMessage:"\u70B9\u51FB\u201C\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA\u201D\u5F00\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u56FE\u7247\u5DF2\u8C03\u6574\u4E3A {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7ED8\u5236\u6682\u505C\u4E8E\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u65F6\u95F4",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6570",showOverlay:"\u663E\u793A\u8986\u76D6\u5C42",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6570",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed}",timeRemaining:"\u5269\u4F59\u65F6\u95F4",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u540E\u7EE7\u7EED...",progressSaved:"\u2705 \u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u4E3A {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F7D\u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7ED8\u5236",progressLoadError:"\u274C \u52A0\u8F7D\u8FDB\u5EA6\u5931\u8D25: {error}",progressSaveError:"\u274C \u4FDD\u5B58\u8FDB\u5EA6\u5931\u8D25: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u5F53\u524D\u8FDB\u5EA6\u5417\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u8FDB\u5EA6",discardProgress:"\u653E\u5F03",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BBD\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7EB5\u6A2A\u6BD4",apply:"\u5E94\u7528",overlayOn:"\u8986\u76D6\u5C42: \u5F00\u542F",overlayOff:"\u8986\u76D6\u5C42: \u5173\u95ED",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7ED8\u5236 {painted} \u50CF\u7D20 | \u8FDB\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6570\u6062\u590D: {current}/{needed} - \u65F6\u95F4: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed} - \u5269\u4F59: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8BD5 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5C1D\u8BD5\u51FA\u9519\uFF0C\u5C06\u5728 {delay} \u79D2\u540E\u91CD\u8BD5...",retryFailed:"\u274C \u8D85\u8FC7 {maxAttempts} \u6B21\u5C1D\u8BD5\u5931\u8D25\u3002\u7EE7\u7EED\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7F51\u7EDC\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",serverError:"\u{1F525} \u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",timeoutError:"\u23F0 \u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u6B63\u5728\u91CD\u8BD5...",protectionEnabled:"\u5DF2\u5F00\u542F\u4FDD\u62A4",protectionDisabled:"\u5DF2\u5173\u95ED\u4FDD\u62A4",paintPattern:"\u7ED8\u5236\u6A21\u5F0F",patternLinearStart:"\u7EBF\u6027\uFF08\u8D77\u70B9\uFF09",patternLinearEnd:"\u7EBF\u6027\uFF08\u7EC8\u70B9\uFF09",patternRandom:"\u968F\u673A",patternCenterOut:"\u4ECE\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5B9E\u5FC3",stripes:"\u6761\u7EB9",checkerboard:"\u68CB\u76D8\u683C",gradient:"\u6E10\u53D8",dots:"\u70B9\u72B6",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u9A6C\u8D5B\u514B",bricks:"\u7816\u5757",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u62A4\u56FE\u7A3F...",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u5904\u66F4\u6539",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u66F4\u6539\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u590D\u5B8C\u6210\uFF1A{count} \u4E2A\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u590D\u4E0D\u6D88\u8017\u70B9\u6570\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u542F\u7528\u4FDD\u62A4\u4F18\u5148",patternApplied:"\u5DF2\u5E94\u7528\u6A21\u5F0F",customPattern:"\u81EA\u5B9A\u4E49\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},farm:{title:"WPlace \u519C\u573A\u673A\u5668\u4EBA",start:"\u5F00\u59CB",stop:"\u505C\u6B62",stopped:"\u673A\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u51C6",paintOnce:"\u4E00\u6B21",checkingStatus:"\u68C0\u67E5\u72B6\u6001\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u8FDF (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6570",colorMode:"\u989C\u8272\u6A21\u5F0F",random:"\u968F\u673A",fixed:"\u56FA\u5B9A",range:"\u8303\u56F4",fixedColor:"\u56FA\u5B9A\u989C\u8272",advanced:"\u9AD8\u7EA7",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u4E49\u8C03\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u83B7",painted:"\u5DF2\u7ED8\u5236",charges:"\u6B21\u6570",retries:"\u91CD\u8BD5",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F7D",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8BF7\u624B\u52A8\u7ED8\u5236\u4E00\u4E2A\u50CF\u7D20\u4EE5\u6355\u83B7\u5750\u6807...",backendOnline:"\u540E\u7AEF\u5728\u7EBF",backendOffline:"\u540E\u7AEF\u79BB\u7EBF",startingBot:"\u6B63\u5728\u542F\u52A8\u673A\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u673A\u5668\u4EBA...",calibrating:"\u6821\u51C6\u4E2D...",alreadyRunning:"\u81EA\u52A8\u519C\u573A\u5DF2\u5728\u8FD0\u884C\u3002",imageRunningWarning:"\u81EA\u52A8\u7ED8\u56FE\u6B63\u5728\u8FD0\u884C\uFF0C\u8BF7\u5148\u5173\u95ED\u518D\u542F\u52A8\u81EA\u52A8\u519C\u573A\u3002",selectPosition:"\u9009\u62E9\u533A\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u56FE\u7684\u7A7A\u767D\u533A\u57DF\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u533A\u57DF\u8BBE\u7F6E\u6210\u529F\uFF01\u534A\u5F84: 500px",positionTimeout:"\u274C \u533A\u57DF\u9009\u62E9\u8D85\u65F6",missingPosition:"\u274C \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF08\u4F7F\u7528\u201C\u9009\u62E9\u533A\u57DF\u201D\u6309\u94AE\uFF09",farmRadius:"\u519C\u573A\u534A\u5F84",positionInfo:"\u5F53\u524D\u533A\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F84 {radius}px \u5728 ({x},{y}) \u519C\u573A",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8BF7\u9009\u62E9\u7A7A\u767D\u533A\u57DF\u4EE5\u907F\u514D\u51B2\u7A81",noPosition:"\u672A\u9009\u62E9\u533A\u57DF",currentZone:"\u533A\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF0C\u5728\u5730\u56FE\u4E0A\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},common:{yes:"\u662F",no:"\u5426",ok:"\u786E\u8BA4",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",save:"\u4FDD\u5B58",load:"\u52A0\u8F7D",delete:"\u5220\u9664",edit:"\u7F16\u8F91",start:"\u5F00\u59CB",stop:"\u505C\u6B62",pause:"\u6682\u505C",resume:"\u7EE7\u7EED",reset:"\u91CD\u7F6E",settings:"\u8BBE\u7F6E",help:"\u5E2E\u52A9",about:"\u5173\u4E8E",language:"\u8BED\u8A00",loading:"\u52A0\u8F7D\u4E2D...",error:"\u9519\u8BEF",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8BED\u8A00\u5DF2\u5207\u6362\u4E3A {language}"},guard:{title:"WPlace \u81EA\u52A8\u5B88\u62A4",initBot:"\u521D\u59CB\u5316\u5B88\u62A4\u673A\u5668\u4EBA",selectArea:"\u9009\u62E9\u533A\u57DF",captureArea:"\u6355\u83B7\u533A\u57DF",startProtection:"\u5F00\u59CB\u5B88\u62A4",stopProtection:"\u505C\u6B62\u5B88\u62A4",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u62A4\u50CF\u7D20",detectedChanges:"\u68C0\u6D4B\u5230\u7684\u53D8\u5316",repairedPixels:"\u4FEE\u590D\u7684\u50CF\u7D20",charges:"\u6B21\u6570",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u989C\u8272\uFF0C\u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",initSuccess:"\u2705 \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u5931\u8D25",invalidCoords:"\u274C \u5750\u6807\u65E0\u6548",invalidArea:"\u274C \u533A\u57DF\u65E0\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u987B\u5C0F\u4E8E\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u533A\u57DF\u8FC7\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u83B7\u5B88\u62A4\u533A\u57DF\u4E2D...",areaCaptured:"\u2705 \u533A\u57DF\u6355\u83B7\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u62A4",captureError:"\u274C \u6355\u83B7\u533A\u57DF\u51FA\u9519: {error}",captureFirst:"\u274C \u8BF7\u5148\u6355\u83B7\u4E00\u4E2A\u5B88\u62A4\u533A\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u62A4\u5DF2\u542F\u52A8 - \u533A\u57DF\u76D1\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u62A4\u5DF2\u505C\u6B62",noChanges:"\u2705 \u533A\u57DF\u5B89\u5168 - \u672A\u68C0\u6D4B\u5230\u53D8\u5316",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u4E2A\u53D8\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u590D {count} \u4E2A\u50CF\u7D20",repairError:"\u274C \u4FEE\u590D\u51FA\u9519: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4FEE\u590D",checkingChanges:"\u{1F50D} \u6B63\u5728\u68C0\u67E5\u533A\u57DF\u53D8\u5316...",errorChecking:"\u274C \u68C0\u67E5\u51FA\u9519: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u62A4\u4E2D - \u533A\u57DF\u53D7\u4FDD\u62A4",lastCheck:"\u4E0A\u6B21\u68C0\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u68C0\u67E5: {time} \u79D2\u540E",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u62A4\u533A\u57DF\u7684\u5DE6\u4E0A\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73B0\u5728\u5728\u53F3\u4E0B\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u83B7\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u83B7\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9009\u62E9\u8D85\u65F6",selectionError:"\u274C \u9009\u62E9\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED",analysisTitle:"\u5DEE\u5F02\u5206\u6790 - JSON vs \u5F53\u524D\u753B\u5E03",correctPixels:"\u6B63\u786E\u50CF\u7D20",incorrectPixels:"\u9519\u8BEF\u50CF\u7D20",missingPixels:"\u7F3A\u5931\u50CF\u7D20",showCorrect:"\u663E\u793A\u6B63\u786E",showIncorrect:"\u663E\u793A\u9519\u8BEF",showMissing:"\u663E\u793A\u7F3A\u5931",autoRefresh:"\u81EA\u52A8\u5237\u65B0",zoomAdjusted:"\u7F29\u653E\u81EA\u52A8\u8C03\u6574\u4E3A",autoRefreshEnabled:"\u81EA\u52A8\u5237\u65B0\u5DF2\u542F\u7528\uFF0C\u95F4\u9694",autoRefreshDisabled:"\u81EA\u52A8\u5237\u65B0\u5DF2\u7981\u7528",autoRefreshIntervalUpdated:"\u81EA\u52A8\u5237\u65B0\u95F4\u9694\u5DF2\u66F4\u65B0\u4E3A",visualizationUpdated:"\u53EF\u89C6\u5316\u5DF2\u66F4\u65B0",configTitle:"Guard\u914D\u7F6E",protectionPatterns:"\u4FDD\u62A4\u6A21\u5F0F",preferSpecificColor:"\u4F18\u5148\u7279\u5B9A\u989C\u8272",excludeSpecificColors:"\u4E0D\u4FEE\u590D\u7279\u5B9A\u989C\u8272",loadManagement:"\u8D1F\u8F7D\u7BA1\u7406",minLoadsToWait:"\u7B49\u5F85\u7684\u6700\u5C0F\u8D1F\u8F7D\u6570",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",spendAllPixelsOnStart:"\u542F\u52A8\u65F6\u6D88\u8017\u6240\u6709\u50CF\u7D20",waitTimes:"\u7B49\u5F85\u65F6\u95F4",useRandomTimes:"\u6279\u6B21\u95F4\u4F7F\u7528\u968F\u673A\u65F6\u95F4",minTime:"\u6700\u5C0F\u65F6\u95F4 (\u79D2)",maxTime:"\u6700\u5927\u65F6\u95F4 (\u79D2)"}}});var Pt,yt=Z(()=>{Pt={launcher:{title:"WPlace \u81EA\u52D5\u6A5F\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52D5\u8FB2\u5834",autoImage:"\u{1F3A8} \u81EA\u52D5\u7E6A\u5716",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52D5\u5B88\u8B77",selection:"\u9078\u64C7",user:"\u7528\u6237",charges:"\u6B21\u6578",backend:"\u5F8C\u7AEF",database:"\u6578\u64DA\u5EAB",uptime:"\u904B\u884C\u6642\u9593",close:"\u95DC\u9589",launch:"\u5553\u52D5",loading:"\u52A0\u8F09\u4E2D\u2026",executing:"\u57F7\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F09\u8173\u672C\u2026",chooseBot:"\u9078\u64C7\u4E00\u500B\u6A5F\u5668\u4EBA\u4E26\u9EDE\u64CA\u5553\u52D5",readyToLaunch:"\u6E96\u5099\u5553\u52D5",loadError:"\u52A0\u8F09\u932F\u8AA4",loadErrorMsg:"\u7121\u6CD5\u52A0\u8F09\u6240\u9078\u6A5F\u5668\u4EBA\u3002\u8ACB\u6AA2\u67E5\u7DB2\u7D61\u9023\u63A5\u6216\u91CD\u8A66\u3002",checking:"\u{1F504} \u6AA2\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7DDA",offline:"\u{1F534} \u96E2\u7DDA",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u932F\u8AA4",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},image:{title:"WPlace \u81EA\u52D5\u7E6A\u5716",initBot:"\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA",uploadImage:"\u4E0A\u50B3\u5716\u7247",resizeImage:"\u8ABF\u6574\u5716\u7247\u5927\u5C0F",selectPosition:"\u9078\u64C7\u4F4D\u7F6E",startPainting:"\u958B\u59CB\u7E6A\u88FD",stopPainting:"\u505C\u6B62\u7E6A\u88FD",saveProgress:"\u4FDD\u5B58\u9032\u5EA6",loadProgress:"\u52A0\u8F09\u9032\u5EA6",checkingColors:"\u{1F50D} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u5F8C\u91CD\u8A66\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F09\u5716\u7247...",imageLoaded:"\u2705 \u5716\u7247\u5DF2\u52A0\u8F09\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u500B",imageError:"\u274C \u5716\u7247\u52A0\u8F09\u5931\u6557",selectPositionAlert:"\u8ACB\u5728\u4F60\u60F3\u958B\u59CB\u7E6A\u88FD\u7684\u5730\u65B9\u5857\u7B2C\u4E00\u500B\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8A2D\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9078\u64C7\u8D85\u6642",positionDetected:"\u{1F3AF} \u5DF2\u6AA2\u6E2C\u5230\u4F4D\u7F6E\uFF0C\u8655\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u6AA2\u6E2C\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66",startPaintingMsg:"\u{1F3A8} \u958B\u59CB\u7E6A\u88FD...",paintingProgress:"\u{1F9F1} \u9032\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6C92\u6709\u6B21\u6578\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7E6A\u88FD",paintingComplete:"\u2705 \u7E6A\u88FD\u5B8C\u6210\uFF01\u5171\u7E6A\u88FD {count} \u500B\u50CF\u7D20\u3002",paintingError:"\u274C \u7E6A\u88FD\u904E\u7A0B\u4E2D\u51FA\u932F",missingRequirements:"\u274C \u8ACB\u5148\u52A0\u8F09\u5716\u7247\u4E26\u9078\u64C7\u4F4D\u7F6E",progress:"\u9032\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6578",estimatedTime:"\u9810\u8A08\u6642\u9593",initMessage:"\u9EDE\u64CA\u201C\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA\u201D\u958B\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u5716\u7247\u5DF2\u8ABF\u6574\u70BA {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7E6A\u88FD\u66AB\u505C\u65BC\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u6642\u9593",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6578",showOverlay:"\u986F\u793A\u8986\u84CB\u5C64",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6578",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed}",timeRemaining:"\u5269\u9918\u6642\u9593",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u5F8C\u7E7C\u7E8C...",progressSaved:"\u2705 \u9032\u5EA6\u5DF2\u4FDD\u5B58\u70BA {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F09\u9032\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7E6A\u88FD",progressLoadError:"\u274C \u52A0\u8F09\u9032\u5EA6\u5931\u6557: {error}",progressSaveError:"\u274C \u4FDD\u5B58\u9032\u5EA6\u5931\u6557: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u7576\u524D\u9032\u5EA6\u55CE\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u9032\u5EA6",discardProgress:"\u653E\u68C4",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BEC\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7E31\u6A6B\u6BD4",apply:"\u61C9\u7528",overlayOn:"\u8986\u84CB\u5C64: \u958B\u5553",overlayOff:"\u8986\u84CB\u5C64: \u95DC\u9589",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7E6A\u88FD {painted} \u50CF\u7D20 | \u9032\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6578\u6062\u5FA9: {current}/{needed} - \u6642\u9593: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed} - \u5269\u9918: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8A66 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5617\u8A66\u51FA\u932F\uFF0C\u5C07\u5728 {delay} \u79D2\u5F8C\u91CD\u8A66...",retryFailed:"\u274C \u8D85\u904E {maxAttempts} \u6B21\u5617\u8A66\u5931\u6557\u3002\u7E7C\u7E8C\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7DB2\u7D61\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",serverError:"\u{1F525} \u670D\u52D9\u5668\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",timeoutError:"\u23F0 \u4F3A\u670D\u5668\u903E\u6642\uFF0C\u6B63\u5728\u91CD\u8A66...",protectionEnabled:"\u5DF2\u555F\u7528\u4FDD\u8B77",protectionDisabled:"\u5DF2\u505C\u7528\u4FDD\u8B77",paintPattern:"\u7E6A\u88FD\u6A21\u5F0F",patternLinearStart:"\u7DDA\u6027\uFF08\u8D77\u9EDE\uFF09",patternLinearEnd:"\u7DDA\u6027\uFF08\u7D42\u9EDE\uFF09",patternRandom:"\u96A8\u6A5F",patternCenterOut:"\u7531\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5BE6\u5FC3",stripes:"\u689D\u7D0B",checkerboard:"\u68CB\u76E4\u683C",gradient:"\u6F38\u5C64",dots:"\u9EDE\u72C0",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u99AC\u8CFD\u514B",bricks:"\u78DA\u584A",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u8B77\u7E6A\u5716...",changesDetected:"\u{1F6A8} \u5075\u6E2C\u5230 {count} \u8655\u8B8A\u66F4",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u8B8A\u66F4\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u5FA9\u5B8C\u6210\uFF1A{count} \u500B\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u5FA9\u4E0D\u6D88\u8017\u9EDE\u6578\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u555F\u7528\u4FDD\u8B77\u512A\u5148",patternApplied:"\u5DF2\u5957\u7528\u6A21\u5F0F",customPattern:"\u81EA\u8A02\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},farm:{title:"WPlace \u8FB2\u5834\u6A5F\u5668\u4EBA",start:"\u958B\u59CB",stop:"\u505C\u6B62",stopped:"\u6A5F\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u6E96",paintOnce:"\u4E00\u6B21",checkingStatus:"\u6AA2\u67E5\u72C0\u614B\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u9072 (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6578",colorMode:"\u984F\u8272\u6A21\u5F0F",random:"\u96A8\u6A5F",fixed:"\u56FA\u5B9A",range:"\u7BC4\u570D",fixedColor:"\u56FA\u5B9A\u984F\u8272",advanced:"\u9AD8\u7D1A",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u7FA9\u8ABF\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u7372",painted:"\u5DF2\u7E6A\u88FD",charges:"\u6B21\u6578",retries:"\u91CD\u8A66",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F09",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8ACB\u624B\u52D5\u7E6A\u88FD\u4E00\u500B\u50CF\u7D20\u4EE5\u6355\u7372\u5EA7\u6A19...",backendOnline:"\u5F8C\u7AEF\u5728\u7DDA",backendOffline:"\u5F8C\u7AEF\u96E2\u7DDA",startingBot:"\u6B63\u5728\u5553\u52D5\u6A5F\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u6A5F\u5668\u4EBA...",calibrating:"\u6821\u6E96\u4E2D...",alreadyRunning:"\u81EA\u52D5\u8FB2\u5834\u5DF2\u5728\u904B\u884C\u3002",imageRunningWarning:"\u81EA\u52D5\u7E6A\u5716\u6B63\u5728\u904B\u884C\uFF0C\u8ACB\u5148\u95DC\u9589\u518D\u5553\u52D5\u81EA\u52D5\u8FB2\u5834\u3002",selectPosition:"\u9078\u64C7\u5340\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u5716\u7684\u7A7A\u767D\u5340\u57DF\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u5340\u57DF\u8A2D\u7F6E\u6210\u529F\uFF01\u534A\u5F91: 500px",positionTimeout:"\u274C \u5340\u57DF\u9078\u64C7\u8D85\u6642",missingPosition:"\u274C \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF08\u4F7F\u7528\u201C\u9078\u64C7\u5340\u57DF\u201D\u6309\u9215\uFF09",farmRadius:"\u8FB2\u5834\u534A\u5F91",positionInfo:"\u7576\u524D\u5340\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F91 {radius}px \u5728 ({x},{y}) \u8FB2\u5834",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8ACB\u9078\u64C7\u7A7A\u767D\u5340\u57DF\u4EE5\u907F\u514D\u885D\u7A81",noPosition:"\u672A\u9078\u64C7\u5340\u57DF",currentZone:"\u5340\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF0C\u5728\u5730\u5716\u4E0A\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},common:{yes:"\u662F",no:"\u5426",ok:"\u78BA\u8A8D",cancel:"\u53D6\u6D88",close:"\u95DC\u9589",save:"\u4FDD\u5B58",load:"\u52A0\u8F09",delete:"\u522A\u9664",edit:"\u7DE8\u8F2F",start:"\u958B\u59CB",stop:"\u505C\u6B62",pause:"\u66AB\u505C",resume:"\u7E7C\u7E8C",reset:"\u91CD\u7F6E",settings:"\u8A2D\u7F6E",help:"\u5E6B\u52A9",about:"\u95DC\u65BC",language:"\u8A9E\u8A00",loading:"\u52A0\u8F09\u4E2D...",error:"\u932F\u8AA4",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8A9E\u8A00\u5DF2\u5207\u63DB\u70BA {language}"},guard:{title:"WPlace \u81EA\u52D5\u5B88\u8B77",initBot:"\u521D\u59CB\u5316\u5B88\u8B77\u6A5F\u5668\u4EBA",selectArea:"\u9078\u64C7\u5340\u57DF",captureArea:"\u6355\u7372\u5340\u57DF",startProtection:"\u958B\u59CB\u5B88\u8B77",stopProtection:"\u505C\u6B62\u5B88\u8B77",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u8B77\u50CF\u7D20",detectedChanges:"\u6AA2\u6E2C\u5230\u7684\u8B8A\u5316",repairedPixels:"\u4FEE\u5FA9\u7684\u50CF\u7D20",charges:"\u6B21\u6578",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u984F\u8272\uFF0C\u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",initSuccess:"\u2705 \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u5931\u6557",invalidCoords:"\u274C \u5EA7\u6A19\u7121\u6548",invalidArea:"\u274C \u5340\u57DF\u7121\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u9808\u5C0F\u65BC\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u5340\u57DF\u904E\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u7372\u5B88\u8B77\u5340\u57DF\u4E2D...",areaCaptured:"\u2705 \u5340\u57DF\u6355\u7372\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u8B77",captureError:"\u274C \u6355\u7372\u5340\u57DF\u51FA\u932F: {error}",captureFirst:"\u274C \u8ACB\u5148\u6355\u7372\u4E00\u500B\u5B88\u8B77\u5340\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u8B77\u5DF2\u5553\u52D5 - \u5340\u57DF\u76E3\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u8B77\u5DF2\u505C\u6B62",noChanges:"\u2705 \u5340\u57DF\u5B89\u5168 - \u672A\u6AA2\u6E2C\u5230\u8B8A\u5316",changesDetected:"\u{1F6A8} \u6AA2\u6E2C\u5230 {count} \u500B\u8B8A\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20",repairError:"\u274C \u4FEE\u5FA9\u51FA\u932F: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6578\u4E0D\u8DB3\uFF0C\u7121\u6CD5\u4FEE\u5FA9",checkingChanges:"\u{1F50D} \u6B63\u5728\u6AA2\u67E5\u5340\u57DF\u8B8A\u5316...",errorChecking:"\u274C \u6AA2\u67E5\u51FA\u932F: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u8B77\u4E2D - \u5340\u57DF\u53D7\u4FDD\u8B77",lastCheck:"\u4E0A\u6B21\u6AA2\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u6AA2\u67E5: {time} \u79D2\u5F8C",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u8B77\u5340\u57DF\u7684\u5DE6\u4E0A\u89D2\u5857\u4E00\u500B\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73FE\u5728\u5728\u53F3\u4E0B\u89D2\u5857\u4E00\u500B\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u7372\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u7372\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9078\u64C7\u8D85\u6642",selectionError:"\u274C \u9078\u64C7\u51FA\u932F\uFF0C\u8ACB\u91CD\u8A66",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589",analysisTitle:"\u5DEE\u7570\u5206\u6790 - JSON vs \u7576\u524D\u756B\u5E03",correctPixels:"\u6B63\u78BA\u50CF\u7D20",incorrectPixels:"\u932F\u8AA4\u50CF\u7D20",missingPixels:"\u7F3A\u5931\u50CF\u7D20",showCorrect:"\u986F\u793A\u6B63\u78BA",showIncorrect:"\u986F\u793A\u932F\u8AA4",showMissing:"\u986F\u793A\u7F3A\u5931",autoRefresh:"\u81EA\u52D5\u5237\u65B0",zoomAdjusted:"\u7E2E\u653E\u81EA\u52D5\u8ABF\u6574\u70BA",autoRefreshEnabled:"\u81EA\u52D5\u5237\u65B0\u5DF2\u555F\u7528\uFF0C\u9593\u9694",autoRefreshDisabled:"\u81EA\u52D5\u5237\u65B0\u5DF2\u7981\u7528",autoRefreshIntervalUpdated:"\u81EA\u52D5\u5237\u65B0\u9593\u9694\u5DF2\u66F4\u65B0\u70BA",visualizationUpdated:"\u8996\u89BA\u5316\u5DF2\u66F4\u65B0",configTitle:"Guard\u914D\u7F6E",protectionPatterns:"\u4FDD\u8B77\u6A21\u5F0F",preferSpecificColor:"\u512A\u5148\u7279\u5B9A\u984F\u8272",excludeSpecificColors:"\u4E0D\u4FEE\u5FA9\u7279\u5B9A\u984F\u8272",loadManagement:"\u8CA0\u8F09\u7BA1\u7406",minLoadsToWait:"\u7B49\u5F85\u7684\u6700\u5C0F\u8CA0\u8F09\u6578",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",spendAllPixelsOnStart:"\u555F\u52D5\u6642\u6D88\u8017\u6240\u6709\u50CF\u7D20",waitTimes:"\u7B49\u5F85\u6642\u9593",useRandomTimes:"\u6279\u6B21\u9593\u4F7F\u7528\u96A8\u6A5F\u6642\u9593",minTime:"\u6700\u5C0F\u6642\u9593 (\u79D2)",maxTime:"\u6700\u5927\u6642\u9593 (\u79D2)"}}});function Gt(){let e=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return ce[e]?e:"es"}function Vt(){return null}function We(){let o=Vt(),e=Gt(),a="es";return o&&ce[o]?a=o:e&&ce[e]&&(a=e),Zt(a),a}function Zt(o){if(!ce[o]){console.warn(`Idioma '${o}' no disponible. Usando '${Ee}'`);return}Ee=o,xe=ce[o],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:o,translations:xe}}))}function vt(){return Ee}function E(o,e={}){let a=o.split("."),s=xe;for(let n of a)if(s&&typeof s=="object"&&n in s)s=s[n];else return console.warn(`Clave de traducci\xF3n no encontrada: '${o}'`),o;return typeof s!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${o}'`),o):Jt(s,e)}function Jt(o,e){return!e||Object.keys(e).length===0?o:o.replace(/\{(\w+)\}/g,(a,s)=>e[s]!==void 0?e[s]:a)}function Ye(o){return xe[o]?xe[o]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${o}'`),{})}var ce,Ee,xe,Ae=Z(()=>{ut();pt();ht();xt();bt();yt();ce={es:dt,en:gt,fr:mt,ru:ft,zhHans:wt,zhHant:Pt},Ee="es",xe=ce[Ee];We()});var oe,t,Te=Z(()=>{Ae();oe={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}},t={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:oe.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:oe.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:9999,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0,paintPattern:"linear_start"}});var Ge={};ct(Ge,{PAINT_PATTERNS:()=>G,applyPaintPattern:()=>je,getPatternName:()=>He,sortPixelsByPattern:()=>Tt});function He(o){return{[G.LINEAR_START]:"Lineal (Inicio)",[G.LINEAR_END]:"Lineal (Final)",[G.RANDOM]:"Aleatorio",[G.CENTER_OUT]:"Centro hacia afuera",[G.CORNERS_FIRST]:"Esquinas primero",[G.SPIRAL]:"Espiral"}[o]||o}function Tt(o,e,a,s){if(!o||o.length===0)return o;i(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${He(e)} (${o.length} p\xEDxeles)`);let n=[...o];switch(e){case G.LINEAR_START:return At(n);case G.LINEAR_END:return co(n);case G.RANDOM:return uo(n);case G.CENTER_OUT:return go(n,a,s);case G.CORNERS_FIRST:return po(n,a,s);case G.SPIRAL:return mo(n,a,s);default:return i(`\u26A0\uFE0F Patr\xF3n desconocido: ${e}, usando linear_start`),At(n)}}function At(o){return o.sort((e,a)=>{let s=e.imageY!==void 0?e.imageY:e.y,n=a.imageY!==void 0?a.imageY:a.y,r=e.imageX!==void 0?e.imageX:e.x,u=a.imageX!==void 0?a.imageX:a.x;return s!==n?s-n:r-u})}function co(o){return o.sort((e,a)=>{let s=e.imageY!==void 0?e.imageY:e.y,n=a.imageY!==void 0?a.imageY:a.y,r=e.imageX!==void 0?e.imageX:e.x,u=a.imageX!==void 0?a.imageX:a.x;return s!==n?n-s:u-r})}function uo(o){for(let e=o.length-1;e>0;e--){let a=Math.floor(Math.random()*(e+1));[o[e],o[a]]=[o[a],o[e]]}return o}function go(o,e,a){let s=e/2,n=a/2;return o.sort((r,u)=>{let l=r.imageX!==void 0?r.imageX:r.x,g=r.imageY!==void 0?r.imageY:r.y,c=u.imageX!==void 0?u.imageX:u.x,d=u.imageY!==void 0?u.imageY:u.y,p=Math.sqrt(Math.pow(l-s,2)+Math.pow(g-n,2)),f=Math.sqrt(Math.pow(c-s,2)+Math.pow(d-n,2));return p-f})}function po(o,e,a){let s=[{x:0,y:0},{x:e-1,y:0},{x:0,y:a-1},{x:e-1,y:a-1}];return o.sort((n,r)=>{let u=n.imageX!==void 0?n.imageX:n.x,l=n.imageY!==void 0?n.imageY:n.y,g=r.imageX!==void 0?r.imageX:r.x,c=r.imageY!==void 0?r.imageY:r.y,d=Math.min(...s.map(f=>Math.sqrt(Math.pow(u-f.x,2)+Math.pow(l-f.y,2)))),p=Math.min(...s.map(f=>Math.sqrt(Math.pow(g-f.x,2)+Math.pow(c-f.y,2))));return d-p})}function mo(o,e,a){let s=new Map,n=0,r=0,u=e-1,l=0,g=a-1;for(;r<=u&&l<=g;){for(let c=r;c<=u;c++)s.set(`${c},${l}`,n++);l++;for(let c=l;c<=g;c++)s.set(`${u},${c}`,n++);if(u--,l<=g){for(let c=u;c>=r;c--)s.set(`${c},${g}`,n++);g--}if(r<=u){for(let c=g;c>=l;c--)s.set(`${r},${c}`,n++);r++}}return o.sort((c,d)=>{let p=c.imageX!==void 0?c.imageX:c.x,f=c.imageY!==void 0?c.imageY:c.y,w=d.imageX!==void 0?d.imageX:d.x,y=d.imageY!==void 0?d.imageY:d.y,m=s.get(`${p},${f}`)||Number.MAX_SAFE_INTEGER,b=s.get(`${w},${y}`)||Number.MAX_SAFE_INTEGER;return m-b})}function je(o,e,a){if(!o||o.length===0)return o;let s=(a==null?void 0:a.width)||100,n=(a==null?void 0:a.height)||100,r=Tt(o,e,s,n);return i(`\u2705 Patr\xF3n aplicado: ${He(e)} a ${r.length} p\xEDxeles`),r}var G,$e=Z(()=>{W();G={LINEAR_START:"linear_start",LINEAR_END:"linear_end",RANDOM:"random",CENTER_OUT:"center_out",CORNERS_FIRST:"corners_first",SPIRAL:"spiral"}});var pe={};ct(pe,{clearLocalStorage:()=>Ao,clearProgress:()=>ot,getProgressInfo:()=>at,hasProgress:()=>Ke,loadFromLocalStorage:()=>Eo,loadProgress:()=>tt,saveProgress:()=>Fe,saveToLocalStorage:()=>et,startAutoSave:()=>To,stopAutoSave:()=>Io});function Lo(){return t.imageData?t.imageData.processor&&typeof t.imageData.processor.generatePixelQueue=="function"?t.imageData.processor.generatePixelQueue():t.imageData.fullPixelData&&Array.isArray(t.imageData.fullPixelData)&&t.imageData.fullPixelData.length>0?t.imageData.fullPixelData:t.imageData.pixels&&t.imageData.pixels.length>0?t.imageData.pixels:t.remainingPixels&&t.remainingPixels.length>0?(i("\u26A0\uFE0F Exportando usando remainingPixels (posible subconjunto del proyecto)"),t.remainingPixels):null:null}function _t(){if(!t.imageData)return null;let o=null;try{let e=Lo();e&&Array.isArray(e)&&(e.length>1e4?(i("\u26A0\uFE0F Datos de p\xEDxeles muy grandes, limitando para localStorage"),o=e.slice(0,1e4)):o=e)}catch(e){i("\u26A0\uFE0F Error obteniendo datos de p\xEDxeles:",e.message)}return{timestamp:Date.now(),version:"2.0",imageData:{originalName:t.originalImageName,...o&&{fullPixelData:o}},progress:{paintedPixels:t.paintedPixels,totalPixels:t.totalPixels,lastPosition:{...t.lastPosition}},position:{startPosition:{...t.startPosition},tileX:t.tileX,tileY:t.tileY},config:{pixelsPerBatch:t.pixelsPerBatch,useAllChargesFirst:t.useAllChargesFirst,isFirstBatch:t.isFirstBatch,maxCharges:t.maxCharges,paintPattern:t.paintPattern},colors:t.availableColors.map(e=>({id:e.id,r:e.r,g:e.g,b:e.b})),remainingPixels:t.remainingPixels||[]}}function et(){try{let o=_t();return o?(localStorage.setItem(Qe,JSON.stringify(o)),i("\u{1F4BE} Progreso guardado autom\xE1ticamente en localStorage"),!0):(i("\u26A0\uFE0F No hay datos para guardar en localStorage"),!1)}catch(o){return i("\u274C Error guardando en localStorage:",o.message),!1}}function Eo(){var o,e,a,s,n,r,u;try{let l=localStorage.getItem(Qe);if(!l)return i("\u{1F4C2} No hay progreso guardado en localStorage"),null;let g=JSON.parse(l),d=["imageData","progress","position","colors"].filter(p=>!(p in g));return d.length>0?(i(`\u274C Datos inv\xE1lidos en localStorage. Faltan: ${d.join(", ")}`),null):(Object.assign(t,{imageData:g.imageData,paintedPixels:g.progress.paintedPixels||0,totalPixels:g.progress.totalPixels||0,lastPosition:g.progress.lastPosition||{x:0,y:0},startPosition:g.position.startPosition||{x:0,y:0},tileX:g.position.tileX||0,tileY:g.position.tileY||0,availableColors:g.colors||[],remainingPixels:g.remainingPixels||[],pixelsPerBatch:((o=g.config)==null?void 0:o.pixelsPerBatch)||5,useAllChargesFirst:(a=(e=g.config)==null?void 0:e.useAllChargesFirst)!=null?a:!0,isFirstBatch:(n=(s=g.config)==null?void 0:s.isFirstBatch)!=null?n:!1,maxCharges:((r=g.config)==null?void 0:r.maxCharges)||3,paintPattern:((u=g.config)==null?void 0:u.paintPattern)||"default"}),i(`\u2705 Progreso cargado desde localStorage: ${t.paintedPixels}/${t.totalPixels} p\xEDxeles`),g)}catch(l){return i("\u274C Error cargando desde localStorage:",l.message),null}}function Ao(){try{return localStorage.removeItem(Qe),i("\u{1F5D1}\uFE0F Progreso eliminado de localStorage"),!0}catch(o){return i("\u274C Error limpiando localStorage:",o.message),!1}}function To(o=2){ge&&clearInterval(ge),ge=setInterval(()=>{t.imageData&&t.paintedPixels>0&&et()},o*60*1e3),i(`\u{1F504} Auto-guardado iniciado cada ${o} minutos`)}function Io(){ge&&(clearInterval(ge),ge=null,i("\u23F9\uFE0F Auto-guardado detenido"))}function Fe(o=null){try{if(!t.imageData||t.paintedPixels===0)throw new Error("No hay progreso para guardar");let e=_t();if(!e)throw new Error("No se pudieron crear los datos de progreso");et();let a=JSON.stringify(e,null,2),s=new window.Blob([a],{type:"application/json"}),n=o||`wplace_progress_${t.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,r=window.URL.createObjectURL(s),u=document.createElement("a");return u.href=r,u.download=n,document.body.appendChild(u),u.click(),document.body.removeChild(u),window.URL.revokeObjectURL(r),i(`\u2705 Progreso guardado: ${n}`),{success:!0,filename:n}}catch(e){return i("\u274C Error guardando progreso:",e),{success:!1,error:e.message}}}async function tt(o){return new Promise(e=>{try{let a=new window.FileReader;a.onload=s=>{try{let n=JSON.parse(s.target.result),u=["imageData","progress","position","colors"].filter(c=>!(c in n));if(u.length>0)throw new Error(`Campos requeridos faltantes: ${u.join(", ")}`);let l=n.version||"1.0";if(i(`\u{1F4C1} Cargando progreso versi\xF3n ${l}`),(!t.availableColors||t.availableColors.length===0)&&(t.availableColors=Array.isArray(n.colors)?n.colors:[]),t.availableColors.length>0&&Array.isArray(n.colors)){let c=n.colors.map(f=>f.id),d=t.availableColors.map(f=>f.id);c.filter(f=>d.includes(f)).length<c.length*.8&&i("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}t.imageData={...n.imageData,pixels:[]};let g=n.imageData.fullPixelData||n.fullPixelData;if(Array.isArray(g)&&g.length>0&&(t.imageData.fullPixelData=g,t.imageData.pixels=g,i(`\u2705 Cargados ${g.length} p\xEDxeles completos del proyecto`)),t.paintedPixels=n.progress.paintedPixels,t.totalPixels=n.progress.totalPixels,n.progress.lastPosition?t.lastPosition=n.progress.lastPosition:n.position.lastX!==void 0&&n.position.lastY!==void 0&&(t.lastPosition={x:n.position.lastX,y:n.position.lastY}),n.position.startPosition?t.startPosition=n.position.startPosition:n.position.startX!==void 0&&n.position.startY!==void 0&&(t.startPosition={x:n.position.startX,y:n.position.startY}),t.tileX=n.position.tileX,t.tileY=n.position.tileY,t.originalImageName=n.imageData.originalName,t.remainingPixels=n.remainingPixels||n.progress.remainingPixels||[],n.config&&(t.pixelsPerBatch=n.config.pixelsPerBatch||t.pixelsPerBatch,t.useAllChargesFirst=n.config.useAllChargesFirst!==void 0?n.config.useAllChargesFirst:t.useAllChargesFirst,t.isFirstBatch=t.useAllChargesFirst?!0:n.config.isFirstBatch!==void 0?n.config.isFirstBatch:!1,i(`\u{1F4C1} Progreso cargado - useAllChargesFirst: ${t.useAllChargesFirst}, isFirstBatch: ${t.isFirstBatch}`),t.maxCharges=n.config.maxCharges||t.maxCharges,l>="2.0"&&(t.paintPattern=n.config.paintPattern||"linear_start")),t.paintPattern&&t.paintPattern!=="linear_start"&&t.remainingPixels.length>0)try{Promise.resolve().then(()=>($e(),Ge)).then(({applyPaintPattern:c})=>{t.remainingPixels=c(t.remainingPixels,t.paintPattern,t.imageData),i(`\u{1F3A8} Patr\xF3n de pintado aplicado: ${t.paintPattern}`)}).catch(c=>{i("\u26A0\uFE0F Error aplicando patr\xF3n de pintado:",c)})}catch(c){i("\u26A0\uFE0F Error cargando m\xF3dulo de patrones:",c)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),t.startPosition&&t.tileX!==void 0&&t.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:t.tileX,tileY:t.tileY,pxX:t.startPosition.x,pxY:t.startPosition.y}),i(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${t.tileX},${t.tileY}) local(${t.startPosition.x},${t.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch}),i(`\u2705 Plan overlay activado con ${t.remainingPixels.length} p\xEDxeles restantes`))}catch(c){i("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",c)}t.imageLoaded=!0,t.colorsChecked=!0,i(`\u2705 Progreso cargado (v${l}): ${t.paintedPixels}/${t.totalPixels} p\xEDxeles`),l>="2.0"&&i(`\u{1F3A8} Patr\xF3n: ${t.paintPattern}`),e({success:!0,data:n,painted:t.paintedPixels,total:t.totalPixels,canContinue:t.remainingPixels.length>0,version:l})}catch(n){i("\u274C Error parseando archivo de progreso:",n),e({success:!1,error:n.message})}},a.onerror=()=>{let s="Error leyendo archivo";i("\u274C",s),e({success:!1,error:s})},a.readAsText(o)}catch(a){i("\u274C Error cargando progreso:",a),e({success:!1,error:a.message})}})}function ot(){t.paintedPixels=0,t.totalPixels=0,t.lastPosition={x:0,y:0},t.remainingPixels=[],t.imageData=null,t.startPosition=null,t.imageLoaded=!1,t.originalImageName=null,t.isFirstBatch=!0,t.nextBatchCooldown=0,t.drawnPixelsMap.clear(),t.lastProtectionCheck=0,i("\u{1F9F9} Progreso limpiado")}function Ke(){return t.imageLoaded&&t.paintedPixels>0&&t.remainingPixels&&t.remainingPixels.length>0}function at(){return{hasProgress:Ke(),painted:t.paintedPixels,total:t.totalPixels,remaining:t.remainingPixels?t.remainingPixels.length:0,percentage:t.totalPixels>0?t.paintedPixels/t.totalPixels*100:0,lastPosition:{...t.lastPosition},canContinue:Ke()}}var Qe,ge,se=Z(()=>{W();Te();Qe="wplace-auto-image-progress",ge=null});W();Te();W();W();var J=class o{static _rgbToLab(e,a,s){let n=x=>(x/=255,x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4)),r=n(e),u=n(a),l=n(s),g=r*.4124+u*.3576+l*.1805,c=r*.2126+u*.7152+l*.0722,d=r*.0193+u*.1192+l*.9505;g/=.95047,c/=1,d/=1.08883;let p=x=>x>.008856?Math.cbrt(x):7.787*x+16/116,f=p(g),w=p(c),y=p(d),m=116*w-16,b=500*(f-w),h=200*(w-y);return[m,b,h]}static _lab(e,a,s){o._labCache||(o._labCache=new Map);let n=e<<16|a<<8|s,r=o._labCache.get(n);return r||(r=o._rgbToLab(e,a,s),o._labCache.set(n,r)),r}static findClosestPaletteColor(e,a,s,n,r={}){var p,f,w,y,m,b;if(!n||n.length===0)return null;let{useLegacyRgb:u=!1,chromaPenalty:l=0,whiteThreshold:g=240}=r;if(e>=g&&a>=g&&s>=g){let h=n.find(x=>{var L,I,k;let S=x.r||((L=x.rgb)==null?void 0:L.r)||0,v=x.g||((I=x.rgb)==null?void 0:I.g)||0,C=x.b||((k=x.rgb)==null?void 0:k.b)||0;return S>=g&&v>=g&&C>=g});if(h)return h}let c=null,d=1/0;if(u)for(let h of n){let x=h.r||((p=h.rgb)==null?void 0:p.r)||0,S=h.g||((f=h.rgb)==null?void 0:f.g)||0,v=h.b||((w=h.rgb)==null?void 0:w.b)||0,C=Math.sqrt(Math.pow(e-x,2)+Math.pow(a-S,2)+Math.pow(s-v,2));C<d&&(d=C,c=h)}else{let h=o._lab(e,a,s);for(let x of n){let S=x.r||((y=x.rgb)==null?void 0:y.r)||0,v=x.g||((m=x.rgb)==null?void 0:m.g)||0,C=x.b||((b=x.rgb)==null?void 0:b.b)||0,L=o._lab(S,v,C),I=Math.sqrt(Math.pow(h[0]-L[0],2)+Math.pow(h[1]-L[1],2)+Math.pow(h[2]-L[2],2));if(l>0){let k=Math.sqrt(h[1]*h[1]+h[2]*h[2]),B=Math.sqrt(L[1]*L[1]+L[2]*L[2]),_=Math.abs(k-B);I+=_*l}I<d&&(d=I,c=x)}}return c}static findClosestColor(e,a,s={}){return o.findClosestPaletteColor(e.r,e.g,e.b,a,s)}static clearCache(){o._labCache&&(o._labCache.clear(),i("Cach\xE9 de colores LAB limpiada"))}static getCacheStats(){return o._labCache?{size:o._labCache.size,memoryEstimate:o._labCache.size*32}:{size:0,memoryEstimate:0}}},Zo=J.findClosestColor.bind(J),Jo=J.findClosestPaletteColor.bind(J);W();function we(){i("\u{1F3A8} Detectando colores disponibles...");let o=document.querySelectorAll('[id^="color-"]'),e=[];for(let a of o){if(a.querySelector("svg"))continue;let s=a.id.replace("color-",""),n=parseInt(s);if(n===0)continue;let r=a.style.backgroundColor;if(r){let u=r.match(/\d+/g);if(u&&u.length>=3){let l={r:parseInt(u[0]),g:parseInt(u[1]),b:parseInt(u[2])};e.push({id:n,element:a,...l}),i(`Color detectado: id=${n}, rgb(${l.r},${l.g},${l.b})`)}}}return i(`\u2705 ${e.length} colores disponibles detectados`),e}var Ie=class{constructor(e){this.imageSrc=e,this.img=new window.Image,this.originalName=null,this.tileSize=1e3,this.drawMult=3,this.shreadSize=3,this.bitmap=null,this.imageWidth=0,this.imageHeight=0,this.totalPixels=0,this.requiredPixelCount=0,this.defacePixelCount=0,this.colorPalette={},this.allowedColorsSet=new Set,this.rgbToMeta=new Map,this.coords=[0,0,0,0],this.templateTiles={},this.templateTilesBuffers={},this.tilePrefixes=new Set,this.selectedColors=null,this.allSiteColors=[],this.initialAllowedColorsSet=null,this.allowedColors=[]}async load(){return new Promise((e,a)=>{this.img.onload=async()=>{try{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,i(`[BLUE MARBLE] Imagen cargada: ${this.imageWidth}\xD7${this.imageHeight}`),e()}catch(s){a(s)}},this.img.onerror=a,this.img.src=this.imageSrc})}initializeColorPalette(){i("[BLUE MARBLE] Inicializando paleta de colores...");let e=we(),a=e.filter(n=>n.id!==void 0&&typeof n.r=="number"&&typeof n.g=="number"&&typeof n.b=="number");this.allowedColorsSet=new Set(a.map(n=>`${n.r},${n.g},${n.b}`));let s="222,250,206";return this.allowedColorsSet.add(s),this.rgbToMeta=new Map(a.map(n=>[`${n.r},${n.g},${n.b}`,{id:n.id,premium:!!n.premium,name:n.name||`Color ${n.id}`}])),this.rgbToMeta.set(s,{id:0,premium:!1,name:"Transparent"}),this.allSiteColors=a.map(n=>({r:n.r,g:n.g,b:n.b,id:n.id,name:n.name,premium:!!n.premium})),this.initialAllowedColorsSet=new Set(this.allowedColorsSet),this.allowedColors=[...this.allSiteColors],i(`[BLUE MARBLE] Paleta inicializada: ${this.allowedColorsSet.size} colores permitidos`),Array.from(e)}detectSiteColors(){let e=document.querySelectorAll('[id^="color-"]'),a=[];for(let s of e){let n=s.id.replace("color-",""),r=parseInt(n);if(s.querySelector("svg")||r===0)continue;let u=s.style.backgroundColor;if(u){let l=u.match(/\d+/g);if(l&&l.length>=3){let g=[parseInt(l[0]),parseInt(l[1]),parseInt(l[2])],c={id:r,element:s,rgb:g,name:s.title||s.getAttribute("aria-label")||`Color ${r}`,premium:s.classList.contains("premium")||s.querySelector(".premium")};a.push(c)}}}return i(`[BLUE MARBLE] ${a.length} colores detectados del sitio`),a}setCoords(e,a,s,n){this.coords=[e,a,s,n]}async analyzePixels(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");try{let a=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});a.imageSmoothingEnabled=!1,a.clearRect(0,0,this.imageWidth,this.imageHeight),a.drawImage(this.bitmap,0,0);let s=a.getImageData(0,0,this.imageWidth,this.imageHeight).data,n=0,r=0,u=new Map;for(let g=0;g<this.imageHeight;g++)for(let c=0;c<this.imageWidth;c++){let d=(g*this.imageWidth+c)*4,p=s[d],f=s[d+1],w=s[d+2];if(s[d+3]===0)continue;let m=`${p},${f},${w}`;p===222&&f===250&&w===206&&r++;let b=m,h=this.allowedColorsSet.has(m);if(!h&&this.allowedColors&&this.allowedColors.length>0){let x=J.findClosestPaletteColor(p,f,w,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});x&&(b=`${x.r},${x.g},${x.b}`,h=!0)}h&&(n++,u.set(b,(u.get(b)||0)+1))}this.requiredPixelCount=n,this.defacePixelCount=r;let l={};for(let[g,c]of u.entries())l[g]={count:c,enabled:!0};return this.colorPalette=l,i(`[BLUE MARBLE] An\xE1lisis: ${n.toLocaleString()} p\xEDxeles, ${u.size} colores`),{totalPixels:this.totalPixels,requiredPixels:n,defacePixels:r,uniqueColors:u.size,colorPalette:l}}catch{return this.requiredPixelCount=Math.max(0,this.totalPixels),this.defacePixelCount=0,{totalPixels:this.totalPixels,requiredPixels:this.totalPixels,defacePixels:0,uniqueColors:0,colorPalette:{}}}}async createTemplateTiles(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");let e={},a={},s=new OffscreenCanvas(this.tileSize,this.tileSize),n=s.getContext("2d",{willReadFrequently:!0});for(let r=this.coords[3];r<this.imageHeight+this.coords[3];){let u=Math.min(this.tileSize-r%this.tileSize,this.imageHeight-(r-this.coords[3]));for(let l=this.coords[2];l<this.imageWidth+this.coords[2];){let g=Math.min(this.tileSize-l%this.tileSize,this.imageWidth-(l-this.coords[2])),c=g*this.shreadSize,d=u*this.shreadSize;s.width=c,s.height=d,n.imageSmoothingEnabled=!1,n.clearRect(0,0,c,d),n.drawImage(this.bitmap,l-this.coords[2],r-this.coords[3],g,u,0,0,g*this.shreadSize,u*this.shreadSize);let p=n.getImageData(0,0,c,d);for(let m=0;m<d;m++)for(let b=0;b<c;b++){let h=(m*c+b)*4;if(p.data[h]===222&&p.data[h+1]===250&&p.data[h+2]===206)(b+m)%2===0?(p.data[h]=0,p.data[h+1]=0,p.data[h+2]=0):(p.data[h]=255,p.data[h+1]=255,p.data[h+2]=255),p.data[h+3]=32;else if(b%this.shreadSize!==1||m%this.shreadSize!==1)p.data[h+3]=0;else{let x=p.data[h],S=p.data[h+1],v=p.data[h+2];this.allowedColorsSet.has(`${x},${S},${v}`)||(p.data[h+3]=0)}}n.putImageData(p,0,0);let f=`${(this.coords[0]+Math.floor(l/1e3)).toString().padStart(4,"0")},${(this.coords[1]+Math.floor(r/1e3)).toString().padStart(4,"0")},${(l%1e3).toString().padStart(3,"0")},${(r%1e3).toString().padStart(3,"0")}`;e[f]=await createImageBitmap(s),this.tilePrefixes.add(f.split(",").slice(0,2).join(","));let y=await(await s.convertToBlob()).arrayBuffer();a[f]=y,l+=g}r+=u}return this.templateTiles=e,this.templateTilesBuffers=a,i(`[BLUE MARBLE] ${Object.keys(e).length} tiles creados`),{templateTiles:e,templateTilesBuffers:a}}generatePixelQueue(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");i(`[BLUE MARBLE DEBUG] allowedColorsSet size: ${this.allowedColorsSet?this.allowedColorsSet.size:"undefined"}`),i(`[BLUE MARBLE DEBUG] allowedColors length: ${this.allowedColors?this.allowedColors.length:"undefined"}`),this.allowedColorsSet&&this.allowedColorsSet.size>0&&i(`[BLUE MARBLE DEBUG] Primeros colores permitidos: ${Array.from(this.allowedColorsSet).slice(0,5).join(", ")}`);let e=[],a=this.coords[0]*1e3+(this.coords[2]||0),s=this.coords[1]*1e3+(this.coords[3]||0),r=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1,r.drawImage(this.bitmap,0,0);let u=r.getImageData(0,0,this.imageWidth,this.imageHeight).data,l=0,g=0,c=0,d=0,p=0,f=0;for(let w=0;w<this.imageHeight;w++)for(let y=0;y<this.imageWidth;y++){l++;let m=(w*this.imageWidth+y)*4,b=u[m],h=u[m+1],x=u[m+2],S=u[m+3];if(S===0){g++;continue}if(b===222&&h===250&&x===206){c++;continue}let v=`${b},${h},${x}`,C=v,L=b,I=h,k=x,B=this.allowedColorsSet.has(v);if(B)d++;else if(this.allowedColors&&this.allowedColors.length>0){let V=J.findClosestPaletteColor(b,h,x,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});V&&(L=V.r,I=V.g,k=V.b,C=`${L},${I},${k}`,B=!0,p++)}if(!B){f++;continue}let _=a+y,M=s+w,me=Math.floor(_/1e3),D=Math.floor(M/1e3),ee=_%1e3,O=M%1e3,ae=this.rgbToMeta.get(C)||{id:0,name:"Unknown"};e.push({imageX:y,imageY:w,globalX:_,globalY:M,tileX:me,tileY:D,localX:ee,localY:O,color:{r:L,g:I,b:k,id:ae.id,name:ae.name},originalColor:{r:L,g:I,b:k,alpha:S}})}return i("[BLUE MARBLE DEBUG] Estad\xEDsticas de procesamiento:"),i(`[BLUE MARBLE DEBUG] - Total p\xEDxeles procesados: ${l}`),i(`[BLUE MARBLE DEBUG] - P\xEDxeles transparentes: ${g}`),i(`[BLUE MARBLE DEBUG] - P\xEDxeles #deface: ${c}`),i(`[BLUE MARBLE DEBUG] - Coincidencias exactas: ${d}`),i(`[BLUE MARBLE DEBUG] - Coincidencias LAB: ${p}`),i(`[BLUE MARBLE DEBUG] - P\xEDxeles inv\xE1lidos: ${f}`),i(`[BLUE MARBLE DEBUG] - Cola final: ${e.length} p\xEDxeles`),i(`[BLUE MARBLE] Cola: ${e.length} p\xEDxeles`),e}async resize(e,a,s=!0){if(!this.img)throw new Error("Imagen no cargada. Llama a load() primero.");let n=this.img.width,r=this.img.height;if(s){let c=n/r;e/a>c?e=a*c:a=e/c}let u=document.createElement("canvas");u.width=e,u.height=a;let l=u.getContext("2d");l.imageSmoothingEnabled=!1,l.drawImage(this.img,0,0,e,a);let g=u.toDataURL();return this.img.src=g,this.imageSrc=g,await new Promise(c=>{this.img.onload=async()=>{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,c()}}),i(`[BLUE MARBLE] Imagen redimensionada: ${n}\xD7${r} \u2192 ${this.imageWidth}\xD7${this.imageHeight}`),{width:this.imageWidth,height:this.imageHeight}}getImageData(){return{width:this.imageWidth,height:this.imageHeight,totalPixels:this.totalPixels,requiredPixels:this.requiredPixelCount,defacePixels:this.defacePixelCount,colorPalette:this.colorPalette,coords:[...this.coords],originalName:this.originalName||"image.png",pixels:this.generatePixelQueue()}}generatePreview(e=200,a=200){if(!this.img)return null;let s=document.createElement("canvas"),n=s.getContext("2d"),{width:r,height:u}=this.img,l=r/u,g,c;return e/a>l?(c=a,g=a*l):(g=e,c=e/l),s.width=g,s.height=c,n.imageSmoothingEnabled=!1,n.drawImage(this.img,0,0,g,c),s.toDataURL()}getDimensions(){return{width:this.imageWidth,height:this.imageHeight}}setSelectedColors(e){this.selectedColors=e,e&&e.length>0?(this.allowedColorsSet=new Set(e.map(a=>a.id)),this.colorPalette={},e.forEach(a=>{this.colorPalette[a.id]=a.rgb}),i(`\u{1F3A8} [BLUE MARBLE] Paleta actualizada con ${e.length} colores seleccionados`),this.imageDataCache=null):i("\u{1F3A8} [BLUE MARBLE] Usando todos los colores disponibles")}};W();var ie=o=>new Promise(e=>setTimeout(e,o));W();var ne=null,Ue=0,qe=!1,be=null,Ct=new Promise(o=>{be=o}),Kt=24e4,Y=null,K=null,ke=null,Re=null,H=null;function Be(o){be&&(be(o),be=null),ne=o,Ue=Date.now()+Kt,i("\u2705 Turnstile token set successfully")}function Pe(){return ne&&Date.now()<Ue}function St(){ne=null,Ue=0,i("\u{1F5D1}\uFE0F Token invalidated, will force fresh generation")}async function ye(o=!1){if(Pe()&&!o)return ne;if(o&&St(),qe)return i("\u{1F504} Token generation already in progress, waiting..."),await j(2e3),Pe()?ne:null;qe=!0;try{i("\u{1F504} Token expired or missing, generating new one...");let e=await Qt();if(e&&e.length>20)return Be(e),i("\u2705 Token captured and cached successfully"),e;i("\u26A0\uFE0F Invisible Turnstile failed, forcing browser automation...");let a=await lo();return a&&a.length>20?(Be(a),i("\u2705 Fallback token captured successfully"),a):(i("\u274C All token generation methods failed"),null)}finally{qe=!1}}async function Qt(){let o=Date.now();try{let e=so();i("\u{1F511} Generating Turnstile token for sitekey:",e),typeof window!="undefined"&&window.navigator&&i("\u{1F9ED} UA:",window.navigator.userAgent,"Platform:",window.navigator.platform);let a=await eo(e);if(a&&a.length>20){let s=Math.round(Date.now()-o);return i(`\u2705 Turnstile token generated successfully in ${s}ms`),a}else throw new Error("Invalid or empty token received")}catch(e){let a=Math.round(Date.now()-o);throw i(`\u274C Turnstile token generation failed after ${a}ms:`,e),e}}async function eo(o){return ao(o,"paint")}async function to(){return window.turnstile?Promise.resolve():new Promise((o,e)=>{if(document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')){let s=()=>{window.turnstile?o():setTimeout(s,100)};return s()}let a=document.createElement("script");a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",a.async=!0,a.defer=!0,a.onload=()=>{i("\u2705 Turnstile script loaded successfully"),o()},a.onerror=()=>{i("\u274C Failed to load Turnstile script"),e(new Error("Failed to load Turnstile"))},document.head.appendChild(a)})}function oo(){return(!K||!document.body.contains(K))&&(K&&K.remove(),K=document.createElement("div"),K.style.cssText=`
      position: fixed !important;
      left: -9999px !important; /* keep off-screen for invisible mode */
      top: -9999px !important;
      width: 300px !important;
      height: 65px !important;
      pointer-events: none !important;
      opacity: 0 !important; /* do not use visibility:hidden to avoid engine quirks */
      z-index: -1 !important;
    `,K.setAttribute("aria-hidden","true"),K.id="turnstile-widget-container",document.body.appendChild(K)),K}function Lt(){if(ke&&document.body.contains(ke))return ke;let o=document.createElement("div");o.id="turnstile-overlay-container",o.style.cssText=`
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
  `;let e=document.createElement("div");e.textContent="Cloudflare Turnstile \u2014 please complete the check if shown",e.style.cssText='font: 600 12px/1.3 "Segoe UI",sans-serif; margin-bottom: 8px; opacity: 0.9;';let a=document.createElement("div");a.id="turnstile-overlay-host",a.style.cssText="width: 100%; min-height: 70px;";let s=document.createElement("button");return s.textContent="Hide",s.style.cssText="position:absolute; top:6px; right:6px; font-size:11px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:2px 6px; cursor:pointer;",s.addEventListener("click",()=>o.remove()),o.appendChild(e),o.appendChild(a),o.appendChild(s),document.body.appendChild(o),ke=o,o}async function ao(o,e="paint"){var r,u;if(await to(),Y&&Re===o&&((r=window.turnstile)!=null&&r.execute))try{i("\u{1F504} Reusing existing Turnstile widget...");let l=await Promise.race([window.turnstile.execute(Y,{action:e}),new Promise((g,c)=>setTimeout(()=>c(new Error("Execute timeout")),15e3))]);if(l&&l.length>20)return i("\u2705 Token generated via widget reuse"),l}catch(l){i("\u{1F504} Widget reuse failed, will create a fresh widget:",l.message)}let a=await io(o,e);if(a&&a.length>20)return a;i("\u{1F440} Falling back to interactive Turnstile (visible).");let s=3,n=[1e4,15e3,3e4];for(let l=1;l<=s;l++){let g=n[l-1];i(`\u{1F504} Intento ${l}/${s} de resoluci\xF3n autom\xE1tica del CAPTCHA (timeout: ${g/1e3}s)...`),l===2?i(`\u2139\uFE0F Primer intento fall\xF3. Reintentando autom\xE1ticamente (2/${s})...`):l===3&&i(`\u2139\uFE0F Segundo intento fall\xF3. \xDAltimo reintento autom\xE1tico (3/${s})...`);try{if(Y&&((u=window.turnstile)!=null&&u.remove))try{window.turnstile.remove(Y),Y=null}catch{}let c=await ro(o,e,l<s,g);if(c&&c.length>20)return i(`\u2705 CAPTCHA resuelto exitosamente en el intento ${l}`),c;l<s&&(i(`\u26A0\uFE0F Intento ${l} fall\xF3, reintentando en 2 segundos...`),await j(2e3))}catch(c){i(`\u274C Error en intento ${l}:`,c.message),l<s&&await j(2e3)}}return i("\u{1F6A8} Todos los intentos autom\xE1ticos fallaron, mostrando ventana manual..."),await no(o,e)}async function io(o,e){return new Promise(a=>{var s;try{if(Y&&((s=window.turnstile)!=null&&s.remove))try{window.turnstile.remove(Y)}catch{}let n=oo();n.innerHTML="";let r=window.turnstile.render(n,{sitekey:o,action:e,size:"invisible",retry:"auto","retry-interval":8e3,callback:u=>{i("\u2705 Invisible Turnstile callback"),a(u)},"error-callback":()=>a(null),"timeout-callback":()=>a(null)});if(Y=r,Re=o,!r)return a(null);Promise.race([window.turnstile.execute(r,{action:e}),new Promise((u,l)=>setTimeout(()=>l(new Error("Invisible execute timeout")),12e3))]).then(a).catch(()=>a(null))}catch(n){i("Invisible Turnstile failed:",n),a(null)}})}async function no(o,e){return new Promise((a,s)=>{var n;try{if(Y&&((n=window.turnstile)!=null&&n.remove))try{window.turnstile.remove(Y)}catch{}let r=Lt(),u=r.querySelector("#turnstile-overlay-host");u.innerHTML="";let l=setTimeout(()=>{i("\u23F0 Interactive Turnstile timed out"),a(null)},12e4),g=window.turnstile.render(u,{sitekey:o,action:e,size:"normal",retry:"auto","retry-interval":8e3,callback:c=>{clearTimeout(l);try{r.remove()}catch{}i("\u2705 Interactive Turnstile solved"),a(c)},"error-callback":c=>{i("\u{1F6A8} Interactive Turnstile error:",c)},"timeout-callback":()=>{i("\u23F0 Turnstile timeout callback (interactive)")},"expired-callback":()=>{i("\u26A0\uFE0F Interactive Turnstile token expired")}});if(Y=g,Re=o,!g){clearTimeout(l),a(null);return}}catch(r){i("\u274C Error creating interactive Turnstile widget:",r),s(r)}})}async function ro(o,e,a=!0,s=3e4){return new Promise((n,r)=>{var u;try{if(Y&&((u=window.turnstile)!=null&&u.remove))try{window.turnstile.remove(Y)}catch{}let l=Lt(),g=l.querySelector("#turnstile-overlay-host");g.innerHTML="";let d=setTimeout(()=>{i(`\u23F0 Interactive Turnstile timed out (${a?"auto-retry":"manual"})`);try{l.remove()}catch{}n(null)},a?s:12e4),p=window.turnstile.render(g,{sitekey:o,action:e,size:"normal",retry:"auto","retry-interval":a?3e3:8e3,callback:f=>{clearTimeout(d);try{l.remove()}catch{}i(`\u2705 Interactive Turnstile solved (${a?"auto-retry":"manual"})`),n(f)},"error-callback":f=>{if(i(`\u{1F6A8} Interactive Turnstile error (${a?"auto-retry":"manual"}):`,f),a){clearTimeout(d);try{l.remove()}catch{}n(null)}},"timeout-callback":()=>{if(i(`\u23F0 Turnstile timeout callback (${a?"auto-retry":"manual"})`),a){clearTimeout(d);try{l.remove()}catch{}n(null)}},"expired-callback":()=>{if(i(`\u26A0\uFE0F Interactive Turnstile token expired (${a?"auto-retry":"manual"})`),a){clearTimeout(d);try{l.remove()}catch{}n(null)}}});if(Y=p,Re=o,!p){clearTimeout(d);try{l.remove()}catch{}n(null);return}}catch(l){i(`\u274C Error creating interactive Turnstile widget (${a?"auto-retry":"manual"}):`,l),r(l)}})}function so(o="0x4AAAAAABpqJe8FO0N84q0F"){var e;if(H)return H;try{let a=document.querySelector("[data-sitekey]");if(a){let r=a.getAttribute("data-sitekey");if(r&&r.length>10)return H=r,i("\u{1F50D} Sitekey detected from data attribute:",r),r}let s=document.querySelector(".cf-turnstile");if((e=s==null?void 0:s.dataset)!=null&&e.sitekey&&s.dataset.sitekey.length>10)return H=s.dataset.sitekey,i("\u{1F50D} Sitekey detected from turnstile element:",H),H;if(typeof window!="undefined"&&window.__TURNSTILE_SITEKEY&&window.__TURNSTILE_SITEKEY.length>10)return H=window.__TURNSTILE_SITEKEY,i("\u{1F50D} Sitekey detected from global variable:",H),H;let n=document.querySelectorAll("script");for(let r of n){let l=(r.textContent||r.innerHTML).match(/sitekey['":\s]+(['"0-9a-zA-Z_-]{20,})/i);if(l&&l[1]&&l[1].length>10)return H=l[1].replace(/['"]/g,""),i("\u{1F50D} Sitekey detected from script content:",H),H}}catch(a){i("Error detecting sitekey:",a)}return i("\u{1F50D} Using fallback sitekey:",o),H=o,o}function j(o){return new Promise(e=>setTimeout(e,o))}function Q(o,e=200,a=1e4){return new Promise(s=>{let n=Date.now()+a,r=()=>{let u=document.querySelector(o);u?s(u):Date.now()<n?setTimeout(r,e):s(null)};r()})}async function lo(){return new Promise((o,e)=>{(async()=>{try{i("\u{1F3AF} Starting automatic CAPTCHA solving process..."),St(),Ct=new Promise(r=>{be=r});let s=j(3e4).then(()=>e(new Error("Auto-CAPTCHA timed out after 30 seconds."))),n=(async()=>{let r=await Q("button.btn.btn-primary.btn-lg",200,3e3);if(r||(r=await Q("button.btn-primary.sm\\:btn-xl",200,3e3)),r||(r=await Q("button.btn-primary",200,3e3)),!r){i("\u{1F3AF} No paint button found, clicking on canvas directly to trigger CAPTCHA...");let y=await Q("canvas",200,5e3);y&&(y.click(),await j(1e3),r=await Q("button.btn.btn-primary.btn-lg, button.btn-primary.sm\\:btn-xl, button.btn-primary",200,5e3))}if(!r)throw new Error("Could not find any paint button after attempts.");i("\u{1F3AF} Found paint button, clicking..."),r.click(),await j(500),i("\u{1F3AF} Selecting transparent color...");let u=await Q("button#color-0",200,5e3);if(u)u.click();else{i("\u26A0\uFE0F Could not find transparent color button, trying alternative selectors...");let y=document.querySelectorAll('button[id^="color-"]');y.length>0&&(y[0].click(),i("\u{1F3AF} Clicked first available color button"))}await j(500),i("\u{1F3AF} Finding canvas element...");let l=await Q("canvas",200,5e3);if(!l)throw new Error("Could not find the canvas element.");l.setAttribute("tabindex","0"),l.focus();let g=l.getBoundingClientRect(),c=Math.round(g.left+g.width/2),d=Math.round(g.top+g.height/2);i("\u{1F3AF} Simulating canvas interaction..."),typeof window!="undefined"&&window.MouseEvent&&window.KeyboardEvent&&(l.dispatchEvent(new window.MouseEvent("mousemove",{clientX:c,clientY:d,bubbles:!0})),l.dispatchEvent(new window.MouseEvent("mousedown",{clientX:c,clientY:d,bubbles:!0})),await j(50),l.dispatchEvent(new window.MouseEvent("mouseup",{clientX:c,clientY:d,bubbles:!0})),l.dispatchEvent(new window.KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),await j(50),l.dispatchEvent(new window.KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0}))),await j(1e3),i("\u{1F3AF} Waiting for CAPTCHA challenge..."),await j(2e3),i("\u{1F3AF} Starting confirmation loop...");let p=Date.now();(async()=>{let y=0;for(;!Pe()&&Date.now()-p<25e3;){y++;let m=await Q("button.btn.btn-primary.btn-lg",100,1e3);if(m||(m=await Q("button.btn.btn-primary.sm\\:btn-xl",100,1e3)),!m){let b=Array.from(document.querySelectorAll("button.btn-primary"));m=b.length?b[b.length-1]:null}m&&!m.disabled?(i(`\u{1F3AF} Clicking confirmation button (attempt ${y})...`),m.click()):i(`\u{1F3AF} No active confirm button found (attempt ${y})`),await j(800)}})();let w=await Ct;await j(500),i("\u2705 Token successfully captured through browser automation"),o(w)})();await Promise.race([n,s])}catch(s){i("\u274C Auto-CAPTCHA process failed:",s),e(s)}})()})}window.__WPA_SET_TURNSTILE_TOKEN__=function(o){o&&typeof o=="string"&&o.length>20&&(i("\u2705 Turnstile Token Captured:",o),Be(o))};(function(){if(window.__WPA_FETCH_HOOKED__)return;window.__WPA_FETCH_HOOKED__=!0;let o=window.fetch;window.fetch=async function(...e){let a=await o.apply(this,e),s=e[0]instanceof Request?e[0].url:e[0];if(typeof s=="string"&&s.includes("https://backend.wplace.live/s0/pixel/"))try{let n=JSON.parse(e[1].body);if(n.t){let r=n.t;(!Pe()||ne!==r)&&(i("\u2705 Turnstile Token Captured:",r),window.postMessage({source:"turnstile-capture",token:r},"*"))}}catch{}return a},window.addEventListener("message",e=>{let{source:a,token:s}=e.data;a==="turnstile-capture"&&s&&(!Pe()||ne!==s)&&Be(s)})})();W();var Xe="https://backend.wplace.live";async function de(){var o,e,a;try{let s=await fetch(`${Xe}/me`,{credentials:"include"}).then(l=>l.json()),n=s||null,r=(s==null?void 0:s.charges)||{},u={count:(o=r.count)!=null?o:0,max:(e=r.max)!=null?e:0,cooldownMs:(a=r.cooldownMs)!=null?a:3e4};return{success:!0,data:{user:n,charges:u.count,maxCharges:u.max,chargeRegen:u.cooldownMs}}}catch(s){return{success:!1,error:s.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function Et(o,e,a,s,n){try{let r=JSON.stringify({colors:s,coords:a,t:n});i(`[API] Sending batch to tile ${o},${e} with ${s.length} pixels, token: ${n?n.substring(0,50)+"...":"null"}`);let u=await fetch(`${Xe}/s0/pixel/${o}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:r});if(i(`[API] Response: ${u.status} ${u.statusText}`),u.status===403){try{await u.json()}catch{}console.error("\u274C 403 Forbidden. Turnstile token might be invalid or expired.");try{console.log("\u{1F504} Regenerating Turnstile token after 403...");let c=await ye(!0);if(!c)return{status:403,json:{error:"Could not generate new token"},success:!1,painted:0};let d=JSON.stringify({colors:s,coords:a,t:c});i(`[API] Retrying with fresh token: ${c.substring(0,50)}...`);let p=await fetch(`${Xe}/s0/pixel/${o}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:d});if(i(`[API] Retry response: ${p.status} ${p.statusText}`),p.status===403)return{status:403,json:{error:"Fresh token still expired or invalid after retry"},success:!1,painted:0};let f=null;try{let y=await p.text();y.trim()?f=JSON.parse(y):f={}}catch(y){i(`[API] Warning: Could not parse retry response JSON: ${y.message}`),f={}}let w=(f==null?void 0:f.painted)||0;return i(`[API] Retry result: ${w} pixels painted`),{status:p.status,json:f,success:p.ok,painted:w}}catch(c){return console.error("\u274C Token regeneration failed:",c),{status:403,json:{error:"Token regeneration failed: "+c.message},success:!1,painted:0}}}let l=null;try{let c=await u.text();c.trim()?l=JSON.parse(c):l={}}catch(c){i(`[API] Warning: Could not parse response JSON: ${c.message}`),l={}}let g=(l==null?void 0:l.painted)||0;return i(`[API] Success: ${g} pixels painted`),{status:u.status,json:l,success:u.ok,painted:g}}catch(r){return i(`[API] Network error: ${r.message}`),{status:0,json:{error:r.message},success:!1,painted:0}}}Te();Ae();$e();var re=null,ve=!1,Ce=null,Se=null,ue=null;var It=3e4;function ho(){re&&document.removeEventListener("visibilitychange",re),re=()=>{document.hidden?(i("\u{1F4F1} Pesta\xF1a oculta - pausando timers"),t.inCooldown&&(ve=!0)):(i("\u{1F4F1} Pesta\xF1a visible - reanudando timers"),ve&&t.inCooldown&&(fo(),ve=!1))},document.addEventListener("visibilitychange",re)}function fo(){if(!Ce||!Se)return;let o=Date.now(),e=o-Ce,a=Math.max(0,Se-e);t.nextBatchCooldown=Math.ceil(a/1e3),t.cooldownEndTime=o+a,i(`\u{1F504} Recalculando cooldown: ${Math.ceil(a/1e3)}s restantes`)}var _e=0,kt=12e4;async function xo(){ue&&window.clearInterval(ue),ho(),ue=window.setInterval(async()=>{try{if(document.hidden)return;if(t.remainingPixels.length>0&&!t.running){let o=await de();if(o.success&&o.data.charges>0){let e=Math.floor(o.data.charges),a=Date.now();a-_e>kt&&(i(`\u{1F504} Monitoreo: ${e} cargas disponibles`),_e=a),t.currentCharges=o.data.charges,t.maxCharges=o.data.maxCharges,e>=t.pixelsPerBatch&&window.imageBot&&typeof window.imageBot.onStartPainting=="function"&&(i(`\u{1F680} Reanudando pintado autom\xE1ticamente con ${e} cargas`),window.imageBot.onStartPainting())}}}catch(o){let e=Date.now();e-_e>kt&&(i(`\u26A0\uFE0F Error en monitoreo de cargas: ${o.message}`),_e=e)}},It),i(`\u2705 Monitoreo de cargas iniciado (cada ${It/1e3}s)`)}function Ze(){ue&&(window.clearInterval(ue),ue=null,i("\u23F9\uFE0F Monitoreo de cargas detenido")),re&&(document.removeEventListener("visibilitychange",re),re=null),Ce=null,Se=null,ve=!1}var Ve=0,wo=3e4;async function Rt(o,e){if(t.stopFlag)return i("\u{1F6D1} Bot detenido, cancelando verificaci\xF3n de cargas"),!1;let a=await de();if(a.success){let s=Math.floor(a.data.charges);if(t.currentCharges=a.data.charges,t.maxCharges=a.data.maxCharges,s<o){if(t.stopFlag)return i("\u{1F6D1} Bot detenido durante verificaci\xF3n de cargas"),!1;let n=Date.now();return n-Ve>wo&&(i(`\u23F3 Cargas insuficientes: ${s}/${o}. Esperando regeneraci\xF3n...`),Ve=n),await vo(o-s,e),t.stopFlag?(i("\u{1F6D1} Bot detenido durante cooldown, cancelando recursi\xF3n"),!1):await Rt(o,e)}return Ve=0,!0}return i(`\u26A0\uFE0F No se pudo verificar cargas, continuando con valor cached: ${t.currentCharges}`),t.currentCharges>=o}async function $t(o,e,a,s,n){let{width:r,height:u}=o,{x:l,y:g}=e;i(`Iniciando pintado: imagen(${r}x${u}) inicio LOCAL(${l},${g}) tile(${t.tileX},${t.tileY})`),i(`\u{1F3A8} Patr\xF3n: ${t.paintPattern}`),xo();try{i("\u{1F511} Generando token Turnstile al inicio del proceso..."),await ye()?i("\u2705 Token inicial generado exitosamente"):i("\u26A0\uFE0F No se pudo generar token inicial, continuando con flujo normal")}catch(c){i("\u26A0\uFE0F Error generando token inicial:",c.message)}if(!t.remainingPixels||t.remainingPixels.length===0||t.lastPosition.x===0&&t.lastPosition.y===0){i("Generando cola de p\xEDxeles..."),t.remainingPixels=Co(o,e,t.tileX,t.tileY),t.paintPattern&&t.paintPattern!=="linear_start"&&(i(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${t.paintPattern}`),t.remainingPixels=je(t.remainingPixels,t.paintPattern,o)),(t.lastPosition.x>0||t.lastPosition.y>0)&&(t.remainingPixels=t.remainingPixels.filter(c=>{let d=c.imageY*r+c.imageX,p=t.lastPosition.y*r+t.lastPosition.x;return d>=p})),i(`Cola generada: ${t.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),t.startPosition&&t.tileX!==void 0&&t.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:t.tileX,tileY:t.tileY,pxX:t.startPosition.x,pxY:t.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch}))}catch(c){i("\u26A0\uFE0F Error actualizando plan overlay:",c)}}try{for(;t.remainingPixels.length>0&&!t.stopFlag;){let c=Math.floor(t.currentCharges),d;if(i(`\u{1F50D} Estado del primer lote - isFirstBatch: ${t.isFirstBatch}, useAllChargesFirst: ${t.useAllChargesFirst}, availableCharges: ${c}`),t.isFirstBatch&&t.useAllChargesFirst&&c>0?(d=Math.min(c,t.remainingPixels.length),t.isFirstBatch=!1,i(`\u{1F680} Primera pasada: usando ${d} cargas de ${c} disponibles`)):(d=Math.min(t.pixelsPerBatch,t.remainingPixels.length),i(`\u2699\uFE0F Pasada normal: usando ${d} p\xEDxeles (configurado: ${t.pixelsPerBatch})`)),!await Rt(d,a)){i("\u26A0\uFE0F No se pudieron obtener suficientes cargas, pausando pintado");break}c=Math.floor(t.currentCharges);let f=t.remainingPixels.splice(0,d),w=f,y=0;i(`Verificando lote de ${f.length} p\xEDxeles...`),i(`Pintando lote de ${w.length} p\xEDxeles...`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch})}catch(b){i("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",b)}let m=await yo(w,a);if(m.success&&m.painted>0){if(t.paintedPixels+=m.painted+y,t.currentCharges=Math.max(0,t.currentCharges-m.painted),i(`Cargas despu\xE9s del lote: ${t.currentCharges.toFixed(1)} (consumidas: ${m.painted})`),t.currentCharges=Math.max(0,t.currentCharges-m.painted),i(`Cargas despu\xE9s del lote: ${t.currentCharges.toFixed(1)} (consumidas: ${m.painted})`),w.length>0){let S=w[w.length-1];t.lastPosition={x:S.imageX,y:S.imageY}}i(`Lote exitoso: ${m.painted}/${w.length} p\xEDxeles pintados. Total: ${t.paintedPixels}/${t.totalPixels}`);let b=So(),h=(t.paintedPixels/t.totalPixels*100).toFixed(1),x=E("image.passCompleted",{painted:m.painted,percent:h,current:t.paintedPixels,total:t.totalPixels});a&&a(t.paintedPixels,t.totalPixels,x,b),await ie(2e3)}else m.shouldContinue?i("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(t.remainingPixels.unshift(...w),i("Lote fall\xF3: reintentando en 5 segundos..."),await ie(5e3));await ie(500)}if(t.stopFlag)i(`Pintado pausado en p\xEDxel imagen(${t.lastPosition.x},${t.lastPosition.y})`),s&&s(!1,t.paintedPixels);else{i(`Pintado completado: ${t.paintedPixels} p\xEDxeles pintados`),t.lastPosition={x:0,y:0},t.remainingPixels=[],Ze();try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),i("\u2705 Plan overlay limpiado al completar pintado"))}catch(c){i("\u26A0\uFE0F Error limpiando plan overlay:",c)}s&&s(!0,t.paintedPixels)}}catch(c){i("Error en proceso de pintado:",c),Ze(),n&&n(c)}}async function bo(o){var e;try{if(!o||o.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let a=new Map;for(let r of o){let u=`${r.tileX},${r.tileY}`;a.has(u)||a.set(u,{coords:[],colors:[],tx:r.tileX,ty:r.tileY});let l=a.get(u);l.coords.push(r.localX,r.localY),l.colors.push(r.color.id||r.color.value||1)}let s=await ye(),n=0;for(let{coords:r,colors:u,tx:l,ty:g}of a.values()){if(u.length===0)continue;let c=[];for(let f=0;f<r.length;f+=2){let w=(Number(r[f])%1e3+1e3)%1e3,y=(Number(r[f+1])%1e3+1e3)%1e3;Number.isFinite(w)&&Number.isFinite(y)&&c.push(w,y)}try{let f=999,w=0,y=999,m=0;for(let b=0;b<c.length;b+=2){let h=c[b],x=c[b+1];h<f&&(f=h),h>w&&(w=h),x<y&&(y=x),x>m&&(m=x)}i(`[IMG] Enviando tile ${l},${g}: ${u.length} px | x:[${f},${w}] y:[${y},${m}]`)}catch{}let d=await Et(l,g,c,u,s);if(d.status!==200)return{success:!1,painted:n,error:((e=d.json)==null?void 0:e.message)||`HTTP ${d.status}`,status:d.status};let p=d.painted||0;if(p===0&&u.length>0)return i(`\u26A0\uFE0F API devolvi\xF3 200 OK pero painted=0 para ${u.length} p\xEDxeles en tile ${l},${g}`),{success:!1,painted:n,error:`API devolvi\xF3 painted=0 para ${u.length} p\xEDxeles`,status:200,shouldRetry:!0};n+=p,i(`\u2705 Tile ${l},${g}: ${p}/${u.length} p\xEDxeles pintados exitosamente`)}return{success:!0,painted:n}}catch(a){return i("Error en paintPixelBatch:",a),{success:!1,painted:0,error:a.message}}}var Bt=0,ze=0,Po=6e4;async function yo(o,e){for(let r=1;r<=5;r++)try{let u=await bo(o);if(u.success)return t.retryCount=0,ze=0,u;if(t.retryCount=r,r<5){let l=3e3*Math.pow(2,r-1),g=Math.round(l/1e3),c;if(u.status===0||u.status==="NetworkError"){ze++;let p=Date.now();(p-Bt>Po||ze===1)&&(i(`\u{1F310} Error de red (${ze} consecutivos). Reintento ${r}/5 en ${g}s`),Bt=p),c=E("image.networkError")}else u.status>=500?(c=E("image.serverError"),i(`\u{1F527} Error del servidor ${u.status}. Reintento ${r}/5 en ${g}s`)):u.status===408?(c=E("image.timeoutError"),i(`\u23F1\uFE0F Timeout. Reintento ${r}/5 en ${g}s`)):(c=E("image.retryAttempt",{attempt:r,maxAttempts:5,delay:g}),i(`\u{1F504} Reintento ${r}/5 despu\xE9s de ${g}s. Error: ${u.error}`));e&&e(t.paintedPixels,t.totalPixels,c),await ie(l)}}catch(u){if(t.retryCount=r,r<5){let l=3e3*Math.pow(2,r-1),g=Math.round(l/1e3);(r===1||r%3===0)&&i(`\u274C Excepci\xF3n en intento ${r}:`,u.message);let c=E("image.retryError",{attempt:r,maxAttempts:5,delay:g});e&&e(t.paintedPixels,t.totalPixels,c),await ie(l)}}t.retryCount=5;let n=E("image.retryFailed",{maxAttempts:5});return e&&e(t.paintedPixels,t.totalPixels,n),i("\u{1F4A5} Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function vo(o,e){let s=oe.CHARGE_REGEN_MS*o+5e3;if(t.stopFlag){i("\u{1F6D1} Bot detenido, cancelando cooldown");return}i(`Esperando ${Math.round(s/1e3)}s para obtener ${o} cargas`);let n=Date.now();if(Ce=n,Se=s,t.inCooldown=!0,t.cooldownEndTime=n+s,t.nextBatchCooldown=Math.round(s/1e3),e){let r=Math.floor(s/6e4),u=Math.floor(s%6e4/1e3),l=r>0?`${r}m ${u}s`:`${u}s`,g=E("image.waitingChargesRegen",{current:Math.floor(t.currentCharges),needed:o,time:l});e(t.paintedPixels,t.totalPixels,g)}for(;;){let u=Date.now()-n,l=Math.max(0,s-u);if(t.stopFlag){i(`\u{1F6D1} Bot detenido durante cooldown con ${Math.ceil(l/1e3)}s restantes`);break}if(l<=0)break;let g=Math.ceil(l/1e3);t.nextBatchCooldown=g;let c=g%30===0||g<=30&&g%10===0||g<=5||u<2e3;if(e&&c){let d=Math.floor(g/60),p=g%60,f=d>0?`${d}m ${p}s`:`${p}s`,w=E("image.waitingChargesCountdown",{current:Math.floor(t.currentCharges),needed:o,time:f});e(t.paintedPixels,t.totalPixels,w)}await ie(Math.min(1e3,l))}t.inCooldown=!1,t.nextBatchCooldown=0,Ce=null,Se=null,ve=!1,t.stopFlag||(t.currentCharges=Math.min(t.maxCharges||9999,t.currentCharges+s/oe.CHARGE_REGEN_MS))}function Co(o,e,a,s){let{x:n,y:r}=e,u=[],l;if(o&&o.processor&&typeof o.processor.generatePixelQueue=="function")l=o.processor.generatePixelQueue();else if(o&&typeof o.generatePixelQueue=="function")l=o.generatePixelQueue();else if(o&&Array.isArray(o.pixels))l=o.pixels;else if(o&&typeof o.pixels=="function")l=o.pixels();else if(o&&o.pixels)l=o.pixels;else return i(`\u274C Error: No se pueden obtener p\xEDxeles de imageData. Tipo: ${typeof o}`,o),[];if(!Array.isArray(l))return i(`\u274C Error: pixels no es un array iterable. Tipo: ${typeof l}`,l),[];for(let g of l){if(!g)continue;let c=g.imageX!==void 0?g.imageX:g.x,d=g.imageY!==void 0?g.imageY:g.y,p=g.color!==void 0?g.color:g.targetColor;if(c===void 0||d===void 0){i("\u26A0\uFE0F P\xEDxel con coordenadas inv\xE1lidas:",g);continue}let f=n+c,w=r+d,y=Math.floor(f/1e3),m=Math.floor(w/1e3),b=a+y,h=s+m,x=(f%1e3+1e3)%1e3,S=(w%1e3+1e3)%1e3;u.push({imageX:c,imageY:d,localX:x,localY:S,tileX:b,tileY:h,color:p,originalColor:g.originalColor})}return i(`Cola de p\xEDxeles generada: ${u.length} p\xEDxeles para pintar`),u}function So(){if(!t.remainingPixels||t.remainingPixels.length===0)return 0;let o=t.remainingPixels.length,e=t.pixelsPerBatch,a=oe.CHARGE_REGEN_MS/1e3,s=Math.ceil(o/e),n=e*a,r=(s-1)*n,u=s*2;return Math.ceil(r+u)}function Je(){t.stopFlag=!0,t.running=!1,Ze(),i("\u{1F6D1} Deteniendo proceso de pintado...")}se();W();function Me(o=null){let e=document.createElement("div");o&&(e.id=o),e.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let a=e.attachShadow({mode:"open"});return document.body.appendChild(e),{host:e,root:a}}function zt(o,e){let a=0,s=0,n=0,r=0;o.style.cursor="move",o.addEventListener("mousedown",u);function u(c){c.target.closest(".header-btn, .wplace-header-btn")||(c.preventDefault(),n=c.clientX,r=c.clientY,document.addEventListener("mouseup",g),document.addEventListener("mousemove",l))}function l(c){c.preventDefault(),a=n-c.clientX,s=r-c.clientY,n=c.clientX,r=c.clientY,e.style.top=e.offsetTop-s+"px",e.style.left=e.offsetLeft-a+"px"}function g(){document.removeEventListener("mouseup",g),document.removeEventListener("mousemove",l)}}W();var it=1e5,nt=new Set;function Ft(o){if(!o)return;nt.add(o);let e=a=>{(a.target===o||o.contains(a.target))&&ko(o)};o.addEventListener("mousedown",e),o._bringToFrontHandler=e,o.style.zIndex||(o.style.zIndex=it++)}function Mt(o){o&&(nt.delete(o),o._bringToFrontHandler&&(o.removeEventListener("mousedown",o._bringToFrontHandler),delete o._bringToFrontHandler))}function ko(o){!o||!nt.has(o)||(it++,o.style.zIndex=it)}var De=class{constructor(e="Bot"){this.botName=e,this.isVisible=!1,this.logs=[],this.maxLogs=1e3,this.container=null,this.logContent=null,this.isResizing=!1,this.resizeHandle=null,this.originalConsole={},this.config={width:600,height:400,x:window.innerWidth-620,y:20,visible:!1},this.loadConfig(),this.createWindow(),this.setupLogInterception(),this.setupEventListeners()}loadConfig(){try{let e=localStorage.getItem(`wplace-log-window-${this.botName}`);e&&(this.config={...this.config,...JSON.parse(e)})}catch(e){i("Error cargando configuraci\xF3n de ventana de logs:",e)}}saveConfig(){try{localStorage.setItem(`wplace-log-window-${this.botName}`,JSON.stringify(this.config))}catch(e){i("Error guardando configuraci\xF3n de ventana de logs:",e)}}createWindow(){this.container=document.createElement("div"),this.container.className="wplace-log-window",this.container.style.cssText=`
      position: fixed;
      left: ${this.config.x}px;
      top: ${this.config.y}px;
      width: ${this.config.width}px;
      height: ${this.config.height}px;
      background: rgba(0, 0, 0, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      z-index: 100001;
      display: ${this.config.visible?"flex":"none"};
      flex-direction: column;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      color: #fff;
      resize: none;
      overflow: hidden;
    `;let e=document.createElement("div");e.className="log-window-header",e.style.cssText=`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      cursor: move;
      user-select: none;
      border-radius: 7px 7px 0 0;
    `;let a=document.createElement("div");a.textContent=`\u{1F4CB} Logs - ${this.botName}`,a.style.cssText=`
      font-weight: bold;
      font-size: 14px;
      color: #e2e8f0;
    `;let s=document.createElement("div");s.style.cssText=`
      display: flex;
      gap: 8px;
    `;let n=document.createElement("button");n.innerHTML="\u{1F4BE}",n.title="Descargar logs",n.style.cssText=`
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
    `,n.addEventListener("mouseenter",()=>{n.style.background="rgba(34, 197, 94, 1)"}),n.addEventListener("mouseleave",()=>{n.style.background="rgba(34, 197, 94, 0.8)"}),n.addEventListener("click",()=>this.downloadLogs());let r=document.createElement("button");r.innerHTML="\u2715",r.title="Cerrar ventana",r.style.cssText=`
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
    `,r.addEventListener("mouseenter",()=>{r.style.background="rgba(239, 68, 68, 1)"}),r.addEventListener("mouseleave",()=>{r.style.background="rgba(239, 68, 68, 0.8)"}),r.addEventListener("click",()=>this.hide()),s.appendChild(n),s.appendChild(r),e.appendChild(a),e.appendChild(s),this.logContent=document.createElement("div"),this.logContent.className="log-window-content",this.logContent.style.cssText=`
      flex: 1;
      padding: 8px;
      overflow-y: auto;
      font-size: 12px;
      line-height: 1.4;
      white-space: pre-wrap;
      word-break: break-word;
    `,this.resizeHandle=document.createElement("div"),this.resizeHandle.className="log-window-resize-handle",this.resizeHandle.style.cssText=`
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
      background: linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%);
      border-radius: 0 0 8px 0;
    `,this.container.appendChild(e),this.container.appendChild(this.logContent),this.container.appendChild(this.resizeHandle),document.body.appendChild(this.container),Ft(this.container),this.setupDragging(e),this.setupResizing(),this.isVisible=this.config.visible}setupDragging(e){let a=!1,s={x:0,y:0};e.addEventListener("mousedown",u=>{u.target.tagName!=="BUTTON"&&(a=!0,s.x=u.clientX-this.container.offsetLeft,s.y=u.clientY-this.container.offsetTop,document.addEventListener("mousemove",n),document.addEventListener("mouseup",r),u.preventDefault())});let n=u=>{if(!a)return;let l=Math.max(0,Math.min(window.innerWidth-this.container.offsetWidth,u.clientX-s.x)),g=Math.max(0,Math.min(window.innerHeight-this.container.offsetHeight,u.clientY-s.y));this.container.style.left=l+"px",this.container.style.top=g+"px",this.config.x=l,this.config.y=g},r=()=>{a=!1,document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",r),this.saveConfig()}}setupResizing(){let e=!1,a,s,n,r;this.resizeHandle.addEventListener("mousedown",g=>{e=!0,a=g.clientX,s=g.clientY,n=parseInt(document.defaultView.getComputedStyle(this.container).width,10),r=parseInt(document.defaultView.getComputedStyle(this.container).height,10),document.addEventListener("mousemove",u),document.addEventListener("mouseup",l),g.preventDefault()});let u=g=>{if(!e)return;let c=Math.max(300,n+g.clientX-a),d=Math.max(200,r+g.clientY-s);this.container.style.width=c+"px",this.container.style.height=d+"px",this.config.width=c,this.config.height=d},l=()=>{e=!1,document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",l),this.saveConfig()}}setupLogInterception(){this.originalConsole={log:console.log,info:console.info,warn:console.warn,error:console.error,debug:console.debug},console.log=(...e)=>{this.originalConsole.log.apply(console,e),this.addLog("log",e)},console.info=(...e)=>{this.originalConsole.info.apply(console,e),this.addLog("info",e)},console.warn=(...e)=>{this.originalConsole.warn.apply(console,e),this.addLog("warn",e)},console.error=(...e)=>{this.originalConsole.error.apply(console,e),this.addLog("error",e)},console.debug=(...e)=>{this.originalConsole.debug.apply(console,e),this.addLog("debug",e)}}addLog(e,a){let s=new Date().toLocaleTimeString(),n=a.map(u=>typeof u=="object"?JSON.stringify(u,null,2):String(u)).join(" "),r={timestamp:s,type:e,message:n,raw:a};this.logs.push(r),this.logs.length>this.maxLogs&&this.logs.shift(),this.isVisible&&this.updateLogDisplay()}updateLogDisplay(){if(!this.logContent)return;let e=this.logs.map(a=>`<div style="color: ${this.getLogColor(a.type)}; margin-bottom: 2px;">[${a.timestamp}] ${a.message}</div>`).join("");this.logContent.innerHTML=e,this.logContent.scrollTop=this.logContent.scrollHeight}getLogColor(e){let a={log:"#e2e8f0",info:"#60a5fa",warn:"#fbbf24",error:"#f87171",debug:"#a78bfa"};return a[e]||a.log}downloadLogs(){let e=new Date,a=e.toISOString().split("T")[0],s=e.toTimeString().split(" ")[0].replace(/:/g,"-"),n=`log_${this.botName}_${a}_${s}.log`,r=this.logs.map(c=>`[${c.timestamp}] [${c.type.toUpperCase()}] ${c.message}`).join(`
`),u=new Blob([r],{type:"text/plain"}),l=URL.createObjectURL(u),g=document.createElement("a");g.href=l,g.download=n,document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(l),i(`\u{1F4E5} Logs descargados como: ${n}`)}show(){this.container&&(this.container.style.display="flex",this.isVisible=!0,this.config.visible=!0,this.updateLogDisplay(),this.saveConfig())}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1,this.config.visible=!1,this.saveConfig())}toggle(){this.isVisible?this.hide():this.show()}clear(){this.logs=[],this.logContent&&(this.logContent.innerHTML="")}setupEventListeners(){window.addEventListener("resize",()=>{if(this.container){let e=window.innerWidth-this.container.offsetWidth,a=window.innerHeight-this.container.offsetHeight;this.config.x>e&&(this.config.x=Math.max(0,e),this.container.style.left=this.config.x+"px"),this.config.y>a&&(this.config.y=Math.max(0,a),this.container.style.top=this.config.y+"px"),this.saveConfig()}})}destroy(){this.originalConsole.log&&(console.log=this.originalConsole.log,console.info=this.originalConsole.info,console.warn=this.originalConsole.warn,console.error=this.originalConsole.error,console.debug=this.originalConsole.debug),this.container&&this.container.parentNode&&(Mt(this.container),this.container.parentNode.removeChild(this.container)),this.container=null,this.logContent=null,this.logs=[]}};window.__wplaceLogWindows=window.__wplaceLogWindows||{};function rt(o){return window.__wplaceLogWindows[o]||(window.__wplaceLogWindows[o]=new De(o)),window.__wplaceLogWindows[o]}W();var le={0:{id:1,name:"Black",rgb:{r:0,g:0,b:0}},1:{id:2,name:"Dark Gray",rgb:{r:60,g:60,b:60}},2:{id:3,name:"Gray",rgb:{r:120,g:120,b:120}},3:{id:4,name:"Light Gray",rgb:{r:210,g:210,b:210}},4:{id:5,name:"White",rgb:{r:255,g:255,b:255}},5:{id:6,name:"Deep Red",rgb:{r:96,g:0,b:24}},6:{id:7,name:"Red",rgb:{r:237,g:28,b:36}},7:{id:8,name:"Orange",rgb:{r:255,g:127,b:39}},8:{id:9,name:"Gold",rgb:{r:246,g:170,b:9}},9:{id:10,name:"Yellow",rgb:{r:249,g:221,b:59}},10:{id:11,name:"Light Yellow",rgb:{r:255,g:250,b:188}},11:{id:12,name:"Dark Green",rgb:{r:14,g:185,b:104}},12:{id:13,name:"Green",rgb:{r:19,g:230,b:123}},13:{id:14,name:"Light Green",rgb:{r:135,g:255,b:94}},14:{id:15,name:"Dark Teal",rgb:{r:12,g:129,b:110}},15:{id:16,name:"Teal",rgb:{r:16,g:174,b:166}},16:{id:17,name:"Light Teal",rgb:{r:19,g:225,b:190}},17:{id:20,name:"Cyan",rgb:{r:96,g:247,b:242}},18:{id:44,name:"Light Cyan",rgb:{r:187,g:250,b:242}},19:{id:18,name:"Dark Blue",rgb:{r:40,g:80,b:158}},20:{id:19,name:"Blue",rgb:{r:64,g:147,b:228}},21:{id:21,name:"Indigo",rgb:{r:107,g:80,b:246}},22:{id:22,name:"Light Indigo",rgb:{r:153,g:177,b:251}},23:{id:23,name:"Dark Purple",rgb:{r:120,g:12,b:153}},24:{id:24,name:"Purple",rgb:{r:170,g:56,b:185}},25:{id:25,name:"Light Purple",rgb:{r:224,g:159,b:249}},26:{id:26,name:"Dark Pink",rgb:{r:203,g:0,b:122}},27:{id:27,name:"Pink",rgb:{r:236,g:31,b:128}},28:{id:28,name:"Light Pink",rgb:{r:243,g:141,b:169}},29:{id:29,name:"Dark Brown",rgb:{r:104,g:70,b:52}},30:{id:30,name:"Brown",rgb:{r:149,g:104,b:42}},31:{id:31,name:"Beige",rgb:{r:248,g:178,b:119}},32:{id:52,name:"Light Beige",rgb:{r:255,g:197,b:165}},33:{id:32,name:"Medium Gray",rgb:{r:170,g:170,b:170}},34:{id:33,name:"Dark Red",rgb:{r:165,g:14,b:30}},35:{id:34,name:"Light Red",rgb:{r:250,g:128,b:114}},36:{id:35,name:"Dark Orange",rgb:{r:228,g:92,b:26}},37:{id:37,name:"Dark Goldenrod",rgb:{r:156,g:132,b:49}},38:{id:38,name:"Goldenrod",rgb:{r:197,g:173,b:49}},39:{id:39,name:"Light Goldenrod",rgb:{r:232,g:212,b:95}},40:{id:40,name:"Dark Olive",rgb:{r:74,g:107,b:58}},41:{id:41,name:"Olive",rgb:{r:90,g:148,b:74}},42:{id:42,name:"Light Olive",rgb:{r:132,g:197,b:115}},43:{id:43,name:"Dark Cyan",rgb:{r:15,g:121,b:159}},44:{id:45,name:"Light Blue",rgb:{r:125,g:199,b:255}},45:{id:46,name:"Dark Indigo",rgb:{r:77,g:49,b:184}},46:{id:47,name:"Dark Slate Blue",rgb:{r:74,g:66,b:132}},47:{id:48,name:"Slate Blue",rgb:{r:122,g:113,b:196}},48:{id:49,name:"Light Slate Blue",rgb:{r:181,g:174,b:241}},49:{id:53,name:"Dark Peach",rgb:{r:155,g:82,b:73}},50:{id:54,name:"Peach",rgb:{r:209,g:128,b:120}},51:{id:55,name:"Light Peach",rgb:{r:250,g:182,b:164}},52:{id:50,name:"Light Brown",rgb:{r:219,g:164,b:99}},53:{id:56,name:"Dark Tan",rgb:{r:123,g:99,b:82}},54:{id:57,name:"Tan",rgb:{r:156,g:132,b:107}},55:{id:36,name:"Light Tan",rgb:{r:214,g:181,b:148}},56:{id:51,name:"Dark Beige",rgb:{r:209,g:128,b:81}},57:{id:61,name:"Dark Stone",rgb:{r:109,g:100,b:63}},58:{id:62,name:"Stone",rgb:{r:148,g:140,b:107}},59:{id:63,name:"Light Stone",rgb:{r:205,g:197,b:158}},60:{id:58,name:"Dark Slate",rgb:{r:51,g:57,b:65}},61:{id:59,name:"Slate",rgb:{r:109,g:117,b:141}},62:{id:60,name:"Light Slate",rgb:{r:179,g:185,b:209}},63:{id:0,name:"Transparent",rgb:null}};function Dt(){i("\u{1F4CA} Creando ventana de estad\xEDsticas de pintado");let{host:o,root:e}=Me(),a=document.createElement("style");a.textContent=`
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .stats-container {
      position: fixed;
      top: 60px;
      right: 20px;
      width: 380px;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      z-index: 9997;
      font-family: 'Segoe UI', Roboto, sans-serif;
      color: #eee;
      animation: slideIn 0.4s ease-out;
      overflow: hidden;
      display: none;
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
      max-height: 70vh;
      overflow-y: auto;
    }
    
    .stats-section {
      background: #2d3748;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 15px;
      border: 1px solid #3a4553;
    }
    
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #60a5fa;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      font-size: 14px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .stat-item:last-child {
      border-bottom: none;
    }
    
    .stat-label {
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.8;
    }
    
    .stat-value {
      font-weight: 600;
      color: #60a5fa;
    }
    
    .colors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
      gap: 6px;
      margin-top: 10px;
    }
    
    .color-swatch {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      border: 2px solid #333;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
      position: relative;
      transition: all 0.2s;
      cursor: pointer;
    }
    
    .color-swatch:hover {
      transform: scale(1.1);
      border-color: #60a5fa;
    }
    
    .color-swatch.unavailable {
      opacity: 0.4;
      border-color: #666;
    }
    
    .color-info {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      background: #000;
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 1000;
    }
    
    .color-swatch:hover .color-info {
      opacity: 1;
    }
    
    .refresh-btn {
      background: #60a5fa;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .refresh-btn:hover {
      background: #4facfe;
      transform: translateY(-2px);
    }
    
    .refresh-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
    
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #333;
      border-radius: 4px;
      overflow: hidden;
      margin: 8px 0;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #60a5fa, #4facfe);
      transition: width 0.3s;
      width: 0%;
    }
  `,e.appendChild(a);let s=document.createElement("div");s.className="stats-container",s.innerHTML=`
    <div class="header">
      <div class="header-title">
        \u{1F4CA}
        <span>Painting Stats</span>
      </div>
      <div class="header-controls">
        <button class="header-btn refresh-btn-header" title="Actualizar estad\xEDsticas">
          \u{1F504}
        </button>
        <button class="header-btn close-btn" title="Cerrar">
          \u2715
        </button>
      </div>
    </div>
    <div class="content">
      <div class="stats-section">
        <div class="section-title">
          \u{1F464} Informaci\xF3n del Usuario
        </div>
        <div class="user-stats">
          <div class="stat-item">
            <div class="stat-label">Cargando estad\xEDsticas...</div>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <div class="section-title">
          \u{1F3A8} Progreso de la Imagen
        </div>
        <div class="image-stats">
          <div class="stat-item">
            <div class="stat-label">No hay imagen cargada</div>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <div class="section-title">
          \u{1F3A8} Colores Disponibles
          <button class="refresh-btn" style="margin-left: auto;">
            \u{1F504} Actualizar
          </button>
        </div>
        <div class="colors-stats">
          <div class="stat-item">
            <div class="stat-label">Abra la paleta de colores en el sitio</div>
          </div>
        </div>
      </div>
    </div>
  `,e.appendChild(s);let n={container:s,header:s.querySelector(".header"),refreshBtnHeader:s.querySelector(".refresh-btn-header"),closeBtn:s.querySelector(".close-btn"),userStats:s.querySelector(".user-stats"),imageStats:s.querySelector(".image-stats"),colorsStats:s.querySelector(".colors-stats"),refreshBtn:s.querySelector(".refresh-btn")};zt(n.header,s);let r=!1,u=null;n.closeBtn.addEventListener("click",()=>{g()}),n.refreshBtnHeader.addEventListener("click",()=>{u&&u()}),n.refreshBtn.addEventListener("click",()=>{u&&u()});function l(){s.style.display="block",r=!0,i("\u{1F4CA} Ventana de estad\xEDsticas mostrada")}function g(){s.style.display="none",r=!1,i("\u{1F4CA} Ventana de estad\xEDsticas ocultada")}function c(){r?g():l()}function d(m){if(!m){n.userStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u274C No se pudo obtener informaci\xF3n del usuario</div>
        </div>
      `;return}let b="";if(m.username&&(b+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F464} Usuario</div>
          <div class="stat-value">${m.username}</div>
        </div>
      `),m.charges!==void 0&&(b+=`
        <div class="stat-item">
          <div class="stat-label">\u26A1 Cargas</div>
          <div class="stat-value">${Math.floor(m.charges)} / ${m.maxCharges||"N/A"}</div>
        </div>
      `),m.pixels!==void 0&&(b+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F533} P\xEDxeles Pintados</div>
          <div class="stat-value">${m.pixels.toLocaleString()}</div>
        </div>
      `),m.cooldown!==void 0&&m.cooldown>0){let h=Math.floor(m.cooldown/60),x=m.cooldown%60,S=h>0?`${h}m ${x}s`:`${x}s`;b+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Cooldown</div>
          <div class="stat-value">${S}</div>
        </div>
      `}n.userStats.innerHTML=b||`
      <div class="stat-item">
        <div class="stat-label">\u2139\uFE0F Informaci\xF3n no disponible</div>
      </div>
    `}function p(m){if(!m||!m.loaded){n.imageStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4F7} No hay imagen cargada</div>
        </div>
      `;return}let b=m.totalPixels>0?Math.round(m.paintedPixels/m.totalPixels*100):0,h=`
      <div class="stat-item">
        <div class="stat-label">\u{1F4CA} Progreso</div>
        <div class="stat-value">${b}%</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${b}%"></div>
      </div>
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} P\xEDxeles</div>
        <div class="stat-value">${m.paintedPixels}/${m.totalPixels}</div>
      </div>
    `;if(m.estimatedTime!==void 0&&m.estimatedTime>0){let x=Math.floor(m.estimatedTime/3600),S=Math.floor(m.estimatedTime%3600/60),v=x>0?`${x}h ${S}m`:`${S}m`;h+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Tiempo Estimado</div>
          <div class="stat-value">${v}</div>
        </div>
      `}m.originalName&&(h+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4C1} Archivo</div>
          <div class="stat-value">${m.originalName}</div>
        </div>
      `),n.imageStats.innerHTML=h}function f(m){if(!m||m.length===0){n.colorsStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u274C Abra la paleta de colores en el sitio</div>
        </div>
      `;return}let b=Object.values(le).filter(v=>v.rgb!==null),h=new Set(m.map(v=>v.id)),x=`
      <div class="stat-item">
        <div class="stat-label">\u2705 Colores Disponibles</div>
        <div class="stat-value">${m.length}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">\u{1F4CA} Total de Colores</div>
        <div class="stat-value">${b.length}</div>
      </div>
      <div class="colors-grid">
    `;m.forEach(v=>{let C=le[Object.keys(le).find(B=>le[B].id===v.id)],L=C?C.name:`Color ${v.id}`,k=`rgb(${(v.rgb||[0,0,0]).join(",")})`;x+=`
        <div class="color-swatch" style="background-color: ${k};" title="${L} (ID: ${v.id})">
          <div class="color-info">${L}</div>
        </div>
      `}),b.filter(v=>!h.has(v.id)).forEach(v=>{let L=`rgb(${[v.rgb.r,v.rgb.g,v.rgb.b].join(",")})`;x+=`
        <div class="color-swatch unavailable" style="background-color: ${L};" title="${v.name} (ID: ${v.id}) - No disponible">
          <div class="color-info">${v.name} (No disponible)</div>
        </div>
      `}),x+="</div>",n.colorsStats.innerHTML=x}function w(m){u=m}function y(){o.remove()}return i("\u2705 Ventana de estad\xEDsticas de pintado creada"),{show:l,hide:g,toggle:c,updateUserStats:d,updateImageStats:p,updateColorsStats:f,setRefreshCallback:w,destroy:y,isVisible:()=>r}}W();function Ot(o,e=[]){i("\u{1F3A8} Creando selector de paleta de colores");let a=document.createElement("div");a.className="wplace-section",a.id="color-palette-section",a.style.marginTop="15px",a.innerHTML=`
    <div class="wplace-section-title">
      <i class="fas fa-palette"></i>&nbsp;Color Palette
    </div>
    <div class="wplace-controls">
      <div class="wplace-row single">
        <label style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
          <input type="checkbox" id="showAllColorsToggle" style="cursor: pointer;">
          <span>Show All Colors (including unavailable)</span>
        </label>
      </div>
      <div class="wplace-row">
        <button id="selectAllBtn" class="wplace-btn">Select All</button>
        <button id="unselectAllBtn" class="wplace-btn">Unselect All</button>
      </div>
      <div id="colors-container" class="wplace-color-grid"></div>
    </div>
  `;let s=document.createElement("style");s.textContent=`
    .wplace-section {
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 15px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    
    .wplace-section-title {
      font-size: 14px;
      font-weight: 600;
      color: #60a5fa;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
    }
    
    .wplace-controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .wplace-row {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    .wplace-row.single {
      justify-content: flex-start;
    }
    
    .wplace-btn {
      background: #60a5fa;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.2s;
    }
    
    .wplace-btn:hover {
      background: #4facfe;
      transform: translateY(-1px);
    }
    
    .wplace-color-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
      padding: 12px;
      max-height: 300px;
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .wplace-color-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    
    .wplace-color-item-name {
      font-size: 9px;
      color: #ccc;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      line-height: 1.2;
    }
    
    .wplace-color-swatch {
      width: 32px;
      height: 32px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      margin: 0 auto;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .wplace-color-swatch.unavailable {
      border-color: #666;
      border-style: dashed;
      cursor: not-allowed;
      opacity: 0.4;
      filter: grayscale(70%);
    }
    
    .wplace-color-swatch:hover:not(.unavailable) {
      transform: scale(1.05);
      border-color: #60a5fa;
      box-shadow: 0 0 8px rgba(96, 165, 250, 0.3);
      z-index: 1;
    }
    
    .wplace-color-swatch:not(.active):not(.unavailable) {
      opacity: 0.5;
      filter: grayscale(60%);
    }
    
    .wplace-color-swatch.unavailable:not(.active) {
      opacity: 0.3;
      filter: grayscale(80%);
    }
    
    .wplace-color-swatch.active {
      border-color: #10b981;
      opacity: 1;
      filter: none;
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.4);
    }
    
    .wplace-color-swatch.active::after {
      content: '\u2713';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-shadow: 
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000,
        0 0 3px rgba(0,0,0,0.8);
      z-index: 2;
    }
    
    .wplace-color-item.unavailable .wplace-color-item-name {
      color: #888;
      font-style: italic;
    }
  `;let n=o.getRootNode&&o.getRootNode();n&&n.nodeType===11&&n.host?n.querySelector("#color-palette-styles")||(s.id="color-palette-styles",n.appendChild(s)):document.head.querySelector("#color-palette-styles")||(s.id="color-palette-styles",document.head.appendChild(s)),o.appendChild(a);let u={showAllToggle:a.querySelector("#showAllColorsToggle"),selectAllBtn:a.querySelector("#selectAllBtn"),unselectAllBtn:a.querySelector("#unselectAllBtn"),colorsContainer:a.querySelector("#colors-container")},l=new Set,g=!1,c=null;function d(){l.clear(),u.colorsContainer.querySelectorAll(".wplace-color-swatch.active").forEach(x=>{let S=parseInt(x.dataset.colorId);isNaN(S)||l.add(S)}),c&&c(Array.from(l))}function p(h,x=!1){u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(v=>{let C=v.classList.contains("unavailable"),L=parseInt(v.dataset.colorId);(!C||x)&&(C||(v.classList.toggle("active",h),h?l.add(L):l.delete(L)))}),d(),i(`\u{1F3A8} ${h?"Seleccionados":"Deseleccionados"} todos los colores disponibles`)}function f(h=!1){if(u.colorsContainer.innerHTML="",!e||e.length===0){u.colorsContainer.innerHTML='<div style="text-align: center; color: #888; padding: 20px;">Upload an image first to capture available colors</div>';return}let x=0,S=0,v=l.size>0,C=new Set;Object.values(le).filter(k=>k.rgb!==null).forEach(k=>{let{id:B,name:_,rgb:M}=k,me=`${M.r},${M.g},${M.b}`;S++;let D=e.some(te=>te.r===M.r&&te.g===M.g&&te.b===M.b);if(!h&&!D)return;D&&x++;let ee=document.createElement("div");ee.className="wplace-color-item";let O=document.createElement("button");O.className=`wplace-color-swatch ${D?"":"unavailable"}`,O.title=`${_} (ID: ${B})${D?"":" (Unavailable)"}`,O.dataset.rgb=me,O.dataset.colorId=B,O.style.backgroundColor=`rgb(${M.r}, ${M.g}, ${M.b})`,D||(O.disabled=!0);let ae=v?l.has(B):D;O.classList.toggle("active",ae),ae?C.add(B):C.delete(B);let V=document.createElement("span");V.className="wplace-color-item-name",V.textContent=_+(D?"":" (N/A)"),D||(V.style.color="#888",V.style.fontStyle="italic"),D&&O.addEventListener("click",te=>{te.preventDefault(),te.stopPropagation();let he=O.classList.contains("active");O.classList.toggle("active",!he),he?l.delete(B):l.add(B),d(),i(`\u{1F3A8} Color ${_} (ID: ${B}) ${he?"deseleccionado":"seleccionado"}`)}),ee.appendChild(O),ee.appendChild(V),u.colorsContainer.appendChild(ee)}),l=C,u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(k=>{let B=parseInt(k.dataset.colorId),_=l.has(B);k.classList.toggle("active",_)}),d()}u.showAllToggle.addEventListener("change",h=>{g=h.target.checked,f(g)}),u.selectAllBtn.addEventListener("click",()=>{p(!0,g)}),u.unselectAllBtn.addEventListener("click",()=>{p(!1,g)}),f(!1);function w(h){e=h||[],f(g)}function y(){return Array.from(l)}function m(h){l=new Set(h||[]),u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(S=>{let v=parseInt(S.dataset.colorId),C=l.has(v);S.classList.toggle("active",C)}),c&&c(Array.from(l))}function b(h){c=h}return i("\u2705 Selector de paleta de colores creado"),{updateAvailableColors:w,getSelectedColors:y,setSelectedColors:m,onSelectionChange:b,element:a}}async function Nt({texts:o,...e}){if(i("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let P=document.createElement("link");P.rel="stylesheet",P.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(P),i("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:a,root:s}=Me(),n=document.createElement("style");n.textContent=`
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
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 90vh;
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
    
    .config-input[type="text"], 
    .config-input select {
      width: 120px;
      text-align: left;
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
    
    .btn-secondary {
      background: #6b7280;
      color: white;
    }

    .btn-tertiary {
      background: #374151;
      color: #d1d5db;
      font-size: 12px;
    }

    .btn-tertiary:hover {
      background: #4b5563;
    }

    .btn-danger {
      background: #dc2626;
      color: white;
      font-size: 12px;
    }

    .btn-danger:hover {
      background: #b91c1c;
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
    
    /* Resize handle */
    .resize-handle {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
      background: linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%);
      border-radius: 0 0 8px 0;
      z-index: 10;
    }
    
    /* Media queries para responsividad */
    @media (max-width: 768px) {
      .container {
        width: calc(100vw - 20px);
        max-width: 350px;
        left: 10px !important;
        right: 10px;
        top: 10px !important;
        font-size: 14px;
      }
      
      .header {
        padding: 10px 12px;
        font-size: 14px;
      }
      
      .content {
        padding: 12px;
      }
      
      .btn {
        padding: 8px;
        font-size: 13px;
      }
      
      .config-item {
        font-size: 13px;
      }
      
      .stat-item {
        font-size: 13px;
      }
    }
    
    @media (max-width: 480px) {
      .container {
        width: calc(100vw - 10px);
        left: 5px !important;
        right: 5px;
        top: 5px !important;
        font-size: 13px;
      }
      
      .header {
        padding: 8px 10px;
        font-size: 13px;
      }
      
      .content {
        padding: 10px;
      }
      
      .btn {
        padding: 6px;
        font-size: 12px;
        gap: 4px;
      }
      
      .config-item {
        font-size: 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
      
      .stat-item {
        font-size: 12px;
        flex-direction: column;
        align-items: flex-start;
      }
      
      .config-input {
        width: 100%;
        max-width: 120px;
      }
    }
    
    @media (max-height: 600px) {
      .container {
        max-height: calc(100vh - 20px);
        overflow-y: auto;
      }
      
      .stats {
        margin-bottom: 10px;
      }
    }
  `,s.appendChild(n);let r=document.createElement("div");r.className="container",r.innerHTML=`
    <div class="header">
      <div class="header-title">
        \u{1F5BC}\uFE0F
        <span>${o.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          \u2699\uFE0F
        </button>
        <button class="header-btn minimize-btn" title="${o.minimize}">
          \u2796
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${o.batchSize}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="9999" value="20">
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            ${o.useAllCharges}
          </label>
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox show-overlay" type="checkbox" checked>
            ${o.showOverlay||"Mostrar overlay"}
          </label>
        </div>

        <div class="config-item">
          <label>\u{1F4D0} Patr\xF3n de pintado:</label>
          <select class="config-input paint-pattern">
            <option value="linear_start">Lineal (Inicio)</option>
            <option value="linear_end">Lineal (Final)</option>
            <option value="random">Aleatorio</option>
            <option value="center_out">Centro hacia afuera</option>
            <option value="corners_first">Esquinas primero</option>
            <option value="spiral">Espiral</option>
          </select>
        </div>
      </div>
      
      <!-- Configuraci\xF3n visible en la interfaz principal -->
      <div class="main-config">
        <div class="config-row">
          <div class="config-label">
            \u{1F3AF} ${o.batchSize}:
            <span class="batch-value">20</span>
          </div>
          <div class="config-label">
            \u23F1\uFE0F ${o.nextBatchTime}:
            <span class="cooldown-value">--</span>
          </div>
        </div>
      </div>
      
      <div class="controls">
        <!-- Estado inicial: Solo 3 botones principales -->
        <button class="btn btn-upload upload-btn" data-state="initial">
          \u{1F4E4}
          <span>${o.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" data-state="initial">
          \u{1F4C1}
          <span>${o.loadProgress}</span>
        </button>
        <button class="btn btn-secondary stats-btn" data-state="initial">
          \u{1F4CA}
          <span>Estad\xEDsticas</span>
        </button>
        
        <!-- Flujo de carga de progreso -->
        <button class="btn btn-load load-progress-btn-flow" data-state="load-progress" style="display: none;">
          \u{1F4C1}
          <span>${o.loadProgress}</span>
        </button>
        <button class="btn btn-start start-btn" data-state="load-progress" style="display: none;">
          \u25B6\uFE0F
          <span>${o.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" data-state="load-progress" style="display: none;">
          \u23F9\uFE0F
          <span>${o.stopPainting}</span>
        </button>

        
        <!-- Flujo de subida de imagen -->
        <button class="btn btn-primary resize-btn" data-state="upload-image" style="display: none;">
          \u{1F504}
          <span>${o.resizeImage}</span>
        </button>
        <button class="btn btn-select select-pos-btn" data-state="upload-image" style="display: none;">
          \u{1F3AF}
          <span>${o.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn-upload" data-state="upload-image" style="display: none;">
          \u25B6\uFE0F
          <span>${o.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn-upload" data-state="upload-image" style="display: none;">
          \u23F9\uFE0F
          <span>${o.stopPainting}</span>
        </button>
        
        <!-- Bot\xF3n de inicializaci\xF3n oculto por defecto -->
        <button class="btn btn-primary init-btn" style="display: none;">
          \u{1F916}
          <span>${o.initBot}</span>
        </button>
        
        <!-- Botones movidos al final: Guardar progreso y Logs -->
        <button class="btn btn-secondary save-progress-btn" data-state="load-progress,upload-image" style="display: none;">
          \u{1F4BE}
          <span>Guardar progreso</span>
        </button>
        <button class="btn btn-tertiary load-storage-btn" data-state="initial,load-progress,upload-image">
          \u{1F4C2}
          <span>Cargar desde navegador</span>
        </button>
        <button class="btn btn-danger clear-storage-btn" data-state="initial,load-progress,upload-image">
          \u{1F5D1}\uFE0F
          <span>Borrar del navegador</span>
        </button>
        <button class="btn btn-secondary log-window-btn" data-state="initial,load-progress,upload-image">
          \u{1F4CB}
          <span>${o.logWindow||"Logs"}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label">\u2139\uFE0F ${o.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${o.waitingInit}
      </div>
      
      <!-- Handle de redimensionamiento -->
      <div class="resize-handle"></div>
    </div>
  `,s.appendChild(r);let u=document.createElement("input");u.type="file",u.accept="image/png,image/jpeg",u.style.display="none",s.appendChild(u);let l=document.createElement("input");l.type="file",l.accept=".json",l.style.display="none",s.appendChild(l);let g=document.createElement("div");g.className="resize-overlay",s.appendChild(g);let c=document.createElement("div");c.className="resize-container",c.innerHTML=`
    <h3>${o.resizeImage}</h3>
    <div class="resize-controls">
      <label>
        ${o.width}: <span class="width-value">0</span>px
        <input type="range" class="resize-slider width-slider" min="10" max="500" value="100">
      </label>
      <label>
        ${o.height}: <span class="height-value">0</span>px
        <input type="range" class="resize-slider height-slider" min="10" max="500" value="100">
      </label>
      <label>
        <input type="checkbox" class="keep-aspect" checked>
        ${o.keepAspect}
      </label>
      <img class="resize-preview" src="" alt="Preview">
      <div class="resize-buttons">
        <button class="btn btn-primary confirm-resize">
          \u2705
          <span>${o.apply}</span>
        </button>
        <button class="btn btn-stop cancel-resize">
          \u274C
          <span>${o.cancel}</span>
        </button>
      </div>
    </div>
  `,s.appendChild(c);let d={header:r.querySelector(".header"),configBtn:r.querySelector(".config-btn"),minimizeBtn:r.querySelector(".minimize-btn"),configPanel:r.querySelector(".config-panel"),pixelsPerBatch:r.querySelector(".pixels-per-batch"),useAllCharges:r.querySelector(".use-all-charges"),paintPattern:r.querySelector(".paint-pattern"),showOverlay:r.querySelector(".show-overlay"),batchValue:r.querySelector(".batch-value"),cooldownValue:r.querySelector(".cooldown-value"),initBtn:r.querySelector(".init-btn"),uploadBtn:r.querySelector(".upload-btn"),loadProgressBtn:r.querySelector(".load-progress-btn"),loadProgressBtnFlow:r.querySelector(".load-progress-btn-flow"),saveProgressBtn:r.querySelector(".save-progress-btn"),loadStorageBtn:r.querySelector(".load-storage-btn"),clearStorageBtn:r.querySelector(".clear-storage-btn"),resizeBtn:r.querySelector(".resize-btn"),selectPosBtn:r.querySelector(".select-pos-btn"),startBtn:r.querySelector(".start-btn"),startBtnUpload:r.querySelector(".start-btn-upload"),stopBtn:r.querySelector(".stop-btn"),stopBtnUpload:r.querySelector(".stop-btn-upload"),statsBtn:r.querySelector(".stats-btn"),logWindowBtn:r.querySelector(".log-window-btn"),progressBar:r.querySelector(".progress-bar"),statsArea:r.querySelector(".stats-area"),status:r.querySelector(".status"),content:r.querySelector(".content"),resizeHandle:r.querySelector(".resize-handle")},p={overlay:g,container:c,widthSlider:c.querySelector(".width-slider"),heightSlider:c.querySelector(".height-slider"),widthValue:c.querySelector(".width-value"),heightValue:c.querySelector(".height-value"),keepAspect:c.querySelector(".keep-aspect"),preview:c.querySelector(".resize-preview"),confirmBtn:c.querySelector(".confirm-resize"),cancelBtn:c.querySelector(".cancel-resize")},f={minimized:!1,configVisible:!1},w={width:300,height:"auto",x:20,y:20};function y(){try{let P=localStorage.getItem("wplace-auto-image-window-config");P&&(w={...w,...JSON.parse(P)},b())}catch(P){console.warn("Error cargando configuraci\xF3n de ventana:",P)}}function m(){try{localStorage.setItem("wplace-auto-image-window-config",JSON.stringify(w))}catch(P){console.warn("Error guardando configuraci\xF3n de ventana:",P)}}function b(){r.style.width=typeof w.width=="number"?w.width+"px":w.width,typeof w.height=="number"&&(r.style.height=w.height+"px"),r.style.left=w.x+"px",r.style.top=w.y+"px"}function h(){let P=!1,A,T,R,F;d.resizeHandle.addEventListener("mousedown",z=>{P=!0,A=z.clientX,T=z.clientY,R=parseInt(document.defaultView.getComputedStyle(r).width,10),F=parseInt(document.defaultView.getComputedStyle(r).height,10),document.addEventListener("mousemove",N),document.addEventListener("mouseup",q),z.preventDefault()});let N=z=>{if(!P)return;let U=Math.max(250,R+z.clientX-A),$=Math.max(200,F+z.clientY-T);r.style.width=U+"px",r.style.height=$+"px",w.width=U,w.height=$,x(U)},q=()=>{P=!1,document.removeEventListener("mousemove",N),document.removeEventListener("mouseup",q),m()}}function x(P){let T=Math.max(.8,Math.min(1.2,P/300)),R=Math.round(14*T);r.style.fontSize=R+"px",r.querySelectorAll(".btn").forEach(z=>{let U=Math.round(10*T);z.style.padding=U+"px"});let N=r.querySelector(".header");if(N){let z=Math.round(12*T);N.style.padding=z+"px "+Math.round(15*T)+"px"}let q=r.querySelector(".content");if(q){let z=Math.round(15*T);q.style.padding=z+"px"}}y(),h(),S(d.header,r);function S(P,A){let T=0,R=0,F=0,N=0;P.style.cursor="move",P.addEventListener("mousedown",q);function q($){$.target.closest(".header-btn, .wplace-header-btn")||($.preventDefault(),F=$.clientX,N=$.clientY,document.addEventListener("mouseup",U),document.addEventListener("mousemove",z))}function z($){$.preventDefault(),T=F-$.clientX,R=N-$.clientY,F=$.clientX,N=$.clientY;let X=A.offsetTop-R,fe=A.offsetLeft-T,Xt=window.innerWidth-A.offsetWidth,Ht=window.innerHeight-A.offsetHeight,st=Math.max(0,Math.min(Xt,fe)),lt=Math.max(0,Math.min(Ht,X));A.style.top=lt+"px",A.style.left=st+"px",w.x=st,w.y=lt}function U(){document.removeEventListener("mouseup",U),document.removeEventListener("mousemove",z),m()}}d.minimizeBtn.addEventListener("click",()=>{f.minimized=!f.minimized,f.minimized?(r.classList.add("minimized"),d.minimizeBtn.innerHTML="\u{1F53C}"):(r.classList.remove("minimized"),d.minimizeBtn.innerHTML="\u{1F53D}")}),d.configBtn.addEventListener("click",()=>{f.configVisible=!f.configVisible,f.configVisible?(d.configPanel.classList.add("visible"),d.configBtn.innerHTML="\u274C"):(d.configPanel.classList.remove("visible"),d.configBtn.innerHTML="\u2699\uFE0F")}),d.pixelsPerBatch.addEventListener("change",()=>{let P=parseInt(d.pixelsPerBatch.value)||20;d.batchValue.textContent=P,e.onConfigChange&&e.onConfigChange({pixelsPerBatch:P})}),d.useAllCharges.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({useAllCharges:d.useAllCharges.checked})}),d.paintPattern.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({paintPattern:d.paintPattern.value})});function v(P){r.querySelectorAll("[data-state]").forEach(R=>{R.style.display="none"}),r.querySelectorAll(`[data-state*="${P}"]`).forEach(R=>{R.style.display="flex"}),i(`\u{1F504} Estado cambiado a: ${P}`)}function C(){}d.initBtn.addEventListener("click",async()=>{d.initBtn.disabled=!0,e.onInitBot&&await e.onInitBot()&&void 0,d.initBtn.disabled=!1}),d.uploadBtn.addEventListener("click",()=>{u.click()}),u.addEventListener("change",async()=>{u.files.length>0&&e.onUploadImage&&await e.onUploadImage(u.files[0])&&v("upload-image")}),d.loadProgressBtn.addEventListener("click",()=>{l.click()}),l.addEventListener("change",async()=>{l.files.length>0&&e.onLoadProgress&&await e.onLoadProgress(l.files[0])&&v("load-progress")}),d.loadProgressBtnFlow.addEventListener("click",()=>{l.click()}),d.saveProgressBtn.addEventListener("click",()=>{e.onSaveProgress&&e.onSaveProgress()}),d.loadStorageBtn.addEventListener("click",async()=>{try{let{loadFromLocalStorage:P,startAutoSave:A}=await Promise.resolve().then(()=>(se(),pe)),T=P();T?(i("\u2705 Progreso cargado desde navegador"),A(2),v("load-progress"),e.onLoadFromStorage&&e.onLoadFromStorage(T)):i("\u26A0\uFE0F No hay progreso guardado en el navegador")}catch(P){i("\u274C Error cargando desde navegador:",P)}}),d.clearStorageBtn.addEventListener("click",async()=>{try{if(window.confirm("\xBFEst\xE1s seguro de que quieres borrar el progreso guardado en el navegador? Esta acci\xF3n no se puede deshacer.")){let{clearLocalStorage:P,stopAutoSave:A}=await Promise.resolve().then(()=>(se(),pe));P()?(i("\u2705 Progreso eliminado del navegador"),A(),v("initial")):i("\u274C Error eliminando progreso del navegador")}}catch(P){i("\u274C Error eliminando progreso:",P)}}),d.resizeBtn.addEventListener("click",()=>{e.onResizeImage&&e.onResizeImage()});let L=async(P,A)=>{e.onSelectPosition&&(P.disabled=!0,await e.onSelectPosition()&&A&&(A.disabled=!1),P.disabled=!1)};d.selectPosBtn.addEventListener("click",()=>{L(d.selectPosBtn,d.startBtnUpload)}),d.showOverlay.addEventListener("change",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let P=d.showOverlay.checked;window.__WPA_PLAN_OVERLAY__.setEnabled(P)});let I=async(P,A)=>{if(e.onStartPainting){Le(!0);try{let{startAutoSave:R}=await Promise.resolve().then(()=>(se(),pe));R(2),i("\u{1F504} Auto-guardado iniciado")}catch(R){i("\u26A0\uFE0F Error iniciando auto-guardado:",R)}await e.onStartPainting()||Le(!1)}},k=async(P,A)=>{if(e.onStopPainting&&await e.onStopPainting()){Le(!1);try{let{stopAutoSave:R,saveToLocalStorage:F}=await Promise.resolve().then(()=>(se(),pe));R(),F(),i("\u23F9\uFE0F Auto-guardado detenido y progreso guardado")}catch(R){i("\u26A0\uFE0F Error deteniendo auto-guardado:",R)}}};d.startBtn.addEventListener("click",()=>{I(d.startBtn,d.stopBtn)}),d.stopBtn.addEventListener("click",()=>{k(d.startBtn,d.stopBtn)}),d.startBtnUpload.addEventListener("click",()=>{I(d.startBtnUpload,d.stopBtnUpload)}),d.stopBtnUpload.addEventListener("click",()=>{k(d.startBtnUpload,d.stopBtnUpload)});let B=null,_=null;d.logWindowBtn.addEventListener("click",()=>{B?B.toggle():(B=rt("image"),B.show())}),d.statsBtn.addEventListener("click",()=>{_?_.toggle():(_=Dt(),_.setRefreshCallback(()=>{e.onRefreshStats&&e.onRefreshStats()}),_.show())});function M(P,A="default"){d.status.textContent=P,d.status.className=`status status-${A}`,d.status.style.animation="none",d.status.offsetWidth,d.status.style.animation="slideIn 0.3s ease-out"}function me(P){let{width:A,height:T}=P.getDimensions(),R=A/T;if(p.widthSlider.value=A,p.heightSlider.value=T,p.widthValue.textContent=A,p.heightValue.textContent=T,p.preview.src=P.img.src,p.colorPaletteSelector){let $=e.getAvailableColors?e.getAvailableColors():[];p.colorPaletteSelector.updateAvailableColors($)}else{let $=e.getAvailableColors?e.getAvailableColors():[];p.colorPaletteSelector=Ot(p.container.querySelector(".resize-buttons").parentNode,$),p.colorPaletteSelector.onSelectionChange(fe=>{e.onColorSelectionChange&&e.onColorSelectionChange(fe)});let X=p.container.querySelector(".resize-buttons");X.parentNode.insertBefore(p.colorPaletteSelector.element,X)}p.overlay.style.display="block",p.container.style.display="block";let F=()=>{let $=parseInt(p.widthSlider.value),X=parseInt(p.heightSlider.value);p.widthValue.textContent=$,p.heightValue.textContent=X,p.preview.src=P.generatePreview($,X)},N=()=>{if(p.keepAspect.checked){let $=parseInt(p.widthSlider.value),X=Math.round($/R);p.heightSlider.value=X}F()},q=()=>{if(p.keepAspect.checked){let $=parseInt(p.heightSlider.value),X=Math.round($*R);p.widthSlider.value=X}F()};p.widthSlider.addEventListener("input",N),p.heightSlider.addEventListener("input",q);let z=()=>{let $=parseInt(p.widthSlider.value),X=parseInt(p.heightSlider.value),fe=p.colorPaletteSelector.getSelectedColors();e.onConfirmResize&&e.onConfirmResize(P,$,X,fe),D()},U=()=>{D()};p.confirmBtn.addEventListener("click",z),p.cancelBtn.addEventListener("click",U),p.overlay.addEventListener("click",U),window.cleanupResizeDialog=()=>{p.widthSlider.removeEventListener("input",N),p.heightSlider.removeEventListener("input",q),p.confirmBtn.removeEventListener("click",z),p.cancelBtn.removeEventListener("click",U),p.overlay.removeEventListener("click",U)},F()}function D(){p.overlay.style.display="none",p.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function ee(P,A,T=null){let R=A>0?P/A*100:0;d.progressBar.style.width=`${R}%`;let F=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${o.progress}</div>
        <div>${P}/${A} (${R.toFixed(1)}%)</div>
      </div>
    `;if(T&&(T.username&&(F+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} ${o.userName}</div>
            <div>${T.username}</div>
          </div>
        `),T.charges!==void 0&&(F+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${o.charges}</div>
            <div>${Math.floor(T.charges)}</div>
          </div>
        `),T.pixels!==void 0&&(F+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${o.pixels}</div>
            <div>${T.pixels.toLocaleString()}</div>
          </div>
        `),T.estimatedTime!==void 0&&T.estimatedTime>0)){let N=Math.floor(T.estimatedTime/3600),q=Math.floor(T.estimatedTime%3600/60),z=N>0?`${N}h ${q}m`:`${q}m`;F+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${o.timeRemaining}</div>
            <div>${z}</div>
          </div>
        `}d.statsArea.innerHTML=F}function O(P){if(P>0){let A=Math.floor(P/60),T=P%60,R=A>0?`${A}m ${T}s`:`${T}s`;d.cooldownValue.textContent=R}else d.cooldownValue.textContent="--"}function ae(P){P&&P.includes("\u23F3")?(d.status.textContent=P,d.status.className="status status-info"):P&&M(P,"info")}function V(P){P?(d.initBtn.disabled=!0,d.initBtn.style.opacity="0.6",d.initBtn.innerHTML=`\u2705 <span>${o.initBot} - Completado</span>`):(d.initBtn.disabled=!1,d.initBtn.style.opacity="1",d.initBtn.innerHTML=`\u{1F916} <span>${o.initBot}</span>`)}function te(P){d.initBtn.style.display=P?"flex":"none"}function he(){v("initial"),r.querySelectorAll("button").forEach(A=>{A.disabled=!1})}function qt(){B&&B.destroy(),_&&_.destroy(),a.remove()}function Ut(P){_&&_.isVisible()&&(P.userInfo&&_.updateUserStats(P.userInfo),P.imageInfo&&_.updateImageStats(P.imageInfo),P.availableColors&&_.updateColorsStats(P.availableColors))}function Le(P){d.startBtn.disabled=P,d.startBtnUpload.disabled=P,d.stopBtn.disabled=!P,d.stopBtnUpload.disabled=!P,d.loadProgressBtn.disabled=P}return i("\u2705 Interfaz de Auto-Image creada"),v("initial"),setTimeout(async()=>{try{let{loadFromLocalStorage:P}=await Promise.resolve().then(()=>(se(),pe)),A=P();A&&(i("\u{1F4C2} Progreso encontrado en localStorage, cargando autom\xE1ticamente..."),v("load-progress"),e.onLoadFromStorage&&e.onLoadFromStorage(A))}catch(P){i("\u26A0\uFE0F Error verificando localStorage:",P)}},1e3),{setStatus:M,updateProgress:ee,updateCooldownDisplay:O,updateCooldownMessage:ae,setInitialized:V,setInitButtonVisible:te,enableButtonsAfterInit:C,setState:v,resetToInitialState:he,showResizeDialog:me,closeResizeDialog:D,updateStatsWindow:Ut,setPaintingState:Le,destroy:qt}}function Wt(o,e,a={}){return new Promise(s=>{let n=document.createElement("div");n.className="modal-overlay",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.background="rgba(0,0,0,0.7)",n.style.zIndex="10001",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center";let r=document.createElement("div");r.style.background="#1a1a1a",r.style.border="2px solid #333",r.style.borderRadius="15px",r.style.padding="25px",r.style.color="#eee",r.style.minWidth="350px",r.style.maxWidth="400px",r.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",r.style.fontFamily="'Segoe UI', Roboto, sans-serif",r.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${e}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${o}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${a.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${a.save}</button>`:""}
        ${a.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${a.discard}</button>`:""}
        ${a.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${a.cancel}</button>`:""}
      </div>
    `,n.appendChild(r),document.body.appendChild(n);let u=r.querySelector(".save-btn"),l=r.querySelector(".discard-btn"),g=r.querySelector(".cancel-btn"),c=()=>{document.body.removeChild(n)};u&&u.addEventListener("click",()=>{c(),s("save")}),l&&l.addEventListener("click",()=>{c(),s("discard")}),g&&g.addEventListener("click",()=>{c(),s("cancel")}),n.addEventListener("click",d=>{d.target===n&&(c(),s("cancel"))})})}Ae();function Oe(o=!1){let e=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let n of e){let r=document.querySelector(n);if(r&&r.offsetParent!==null)return o&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por selector: ${n}`),!0}let a=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),s=0;for(let n of a)if(n.offsetParent!==null&&n.offsetWidth>10&&n.offsetHeight>10&&(s++,s>=5))return o&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por colores visibles: ${s}`),!0;return o&&console.log(`[WPA-UI] \u{1F50D} Paleta no detectada. Colores visibles: ${s}`),!1}function Bo(o=!1,e=!1){let a=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(a){let n=a.textContent.toLowerCase(),r=n.includes("paint")||n.includes("pintar"),u=a.querySelector('svg path[d*="240-120"]')||a.querySelector('svg path[d*="M15"]');if(r||u)return o&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por selector espec\xEDfico: "${n}"`),a.click(),e&&setTimeout(()=>{o&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),a.click()},500),!0}let s=document.querySelectorAll("button");for(let n of s){let r=n.textContent.toLowerCase();if((r.includes("paint")||r.includes("pintar"))&&n.offsetParent!==null&&!n.disabled)return o&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por texto: "${n.textContent.trim()}"`),n.click(),e&&setTimeout(()=>{o&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),n.click()},500),!0}return o&&console.log("[WPA-UI] \u274C Bot\xF3n Paint no encontrado"),!1}async function Ne(o=3,e=!0){e&&console.log(`[WPA-UI] \u{1F916} Iniciando auto-click del bot\xF3n Paint (m\xE1ximo ${o} intentos)`);for(let a=1;a<=o;a++){if(e&&console.log(`[WPA-UI] \u{1F3AF} Intento ${a}/${o} - Buscando bot\xF3n Paint...`),Oe())return e&&console.log("[WPA-UI] \u2705 Paleta ya est\xE1 abierta, auto-click completado"),!0;if(Bo(e,!1)){if(e&&console.log("[WPA-UI] \u{1F446} Clic en bot\xF3n Paint realizado (sin segundo clic)"),await new Promise(s=>setTimeout(s,1500)),Oe())return e&&console.log(`[WPA-UI] \u2705 Paleta abierta exitosamente despu\xE9s del intento ${a}`),!0;e&&console.log(`[WPA-UI] \u26A0\uFE0F Paleta no detectada tras el clic en intento ${a}. Reintentar\xE1.`)}else e&&console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado para clic en intento ${a}`);a<o&&await new Promise(s=>setTimeout(s,1e3))}return e&&console.log(`[WPA-UI] \u274C Auto-click fall\xF3 despu\xE9s de ${o} intentos`),!1}(()=>{let e={enabled:!1,templates:[],templatesShouldBeDrawn:!0,tileSize:1e3,drawMult:3,pixelPlan:null,nextBatchCount:0,anchor:null,imageWidth:null,imageHeight:null,originalFetch:null,fetchedBlobQueue:new Map,isIntercepting:!1};function a(){}function s(){e.isIntercepting||(e.originalFetch=window.fetch,e.isIntercepting=!0,window.fetch=async function(...m){var v;let b=await e.originalFetch.apply(this,m),h=b.clone(),x=(m[0]instanceof Request?(v=m[0])==null?void 0:v.url:m[0])||"ignore";if((h.headers.get("content-type")||"").includes("image/")&&x.includes("/tiles/")&&!x.includes("openfreemap")&&!x.includes("maps"))try{let C=await h.blob(),L=await r(C,x);return new Response(L,{headers:h.headers,status:h.status,statusText:h.statusText})}catch(C){return console.error("[PLAN OVERLAY] Error processing tile:",C),b}return b})}function n(){!e.isIntercepting||!e.originalFetch||(window.fetch=e.originalFetch,e.isIntercepting=!1)}async function r(m,b){if(!e.enabled||!e.templatesShouldBeDrawn||!e.pixelPlan)return m;let h=b.split("/"),x=parseInt(h[h.length-1].replace(".png","")),S=parseInt(h[h.length-2]);if(isNaN(S)||isNaN(x))return console.warn("[PLAN OVERLAY] Could not extract tile coordinates from URL:",b),m;let v=u(S,x);if(v.length===0)return m;let C=e.tileSize*e.drawMult,L=await createImageBitmap(m),I=new OffscreenCanvas(C,C),k=I.getContext("2d");return k.imageSmoothingEnabled=!1,k.clearRect(0,0,C,C),k.drawImage(L,0,0,C,C),l(k,v,S,x),await I.convertToBlob({type:"image/png"})}function u(m,b){return!e.pixelPlan||!e.pixelPlan.pixels?[]:e.pixelPlan.pixels.filter(h=>{let x=Math.floor(h.globalX/3e3),S=Math.floor(h.globalY/3e3);return x===m&&S===b})}function l(m,b,h,x){let S=h*3e3,v=x*3e3;m.globalAlpha=.7;for(let C of b){let L=(C.globalX-S)*e.drawMult+1,I=(C.globalY-v)*e.drawMult+1;L>=0&&L<e.tileSize*e.drawMult&&I>=0&&I<e.tileSize*e.drawMult&&(m.fillStyle=`rgb(${C.r},${C.g},${C.b})`,m.fillRect(L,I,1,1))}if(e.nextBatchCount>0){m.globalAlpha=1;let C=b.slice(0,e.nextBatchCount);for(let L of C){let I=(L.globalX-S)*e.drawMult+1,k=(L.globalY-v)*e.drawMult+1;I>=0&&I<e.tileSize*e.drawMult&&k>=0&&k<e.tileSize*e.drawMult&&(m.fillStyle=`rgb(${L.r},${L.g},${L.b})`,m.fillRect(I,k,1,1))}}}function g(m){e.enabled=!!m,e.enabled?s():n()}function c(m,b={}){var x,S,v;if(!m||m.length===0){e.pixelPlan=null;return}let h=[];for(let C of m){let L,I;if(typeof C.tileX=="number"&&typeof C.localX=="number")L=C.tileX*3e3+C.localX,I=C.tileY*3e3+C.localY;else if(b.anchor&&typeof C.imageX=="number"){let k=b.anchor.tileX*3e3+(b.anchor.pxX||0),B=b.anchor.tileY*3e3+(b.anchor.pxY||0);L=k+C.imageX,I=B+C.imageY}else continue;h.push({globalX:L,globalY:I,r:((x=C.color)==null?void 0:x.r)||0,g:((S=C.color)==null?void 0:S.g)||0,b:((v=C.color)==null?void 0:v.b)||0})}e.pixelPlan={pixels:h},e.nextBatchCount=b.nextBatchCount||0,e.anchor=b.anchor||null,e.imageWidth=b.imageWidth||null,e.imageHeight=b.imageHeight||null,typeof b.enabled=="boolean"&&g(b.enabled)}function d(m){e.nextBatchCount=Math.max(0,Number(m||0))}function p(m){e.anchor=m}function f(){}function w(){}function y(){n(),e.pixelPlan=null,e.fetchedBlobQueue.clear()}window.__WPA_PLAN_OVERLAY__={injectStyles:a,setEnabled:g,setPlan:c,setPlanItemsFromTileList:c,setNextBatchCount:d,setAnchor:p,setAnchorCss:f,endSelectionMode:w,render:()=>{},cleanup:y,get state(){return e}}})();async function Yt(){console.log("[WPA-Image] \u{1F680} runImage() iniciado"),i("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),console.log("[WPA-Image] \u{1F30D} Inicializando sistema de idiomas"),We(),console.log("[WPA-Image] \u2705 Sistema de idiomas inicializado"),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0},console.log("[WPA-Image] \u{1F527} Estado global actualizado");let o=null,e=window.fetch,a=()=>{let s=window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.state&&window.__WPA_PLAN_OVERLAY__.state.enabled;window.fetch!==e&&!s?(window.fetch=e,i("\u{1F504} Fetch original restaurado")):s&&i("\u{1F504} Fetch NO restaurado - overlay activo"),t.positionTimeoutId&&(clearTimeout(t.positionTimeoutId),t.positionTimeoutId=null),t.cleanupObserver&&(t.cleanupObserver(),t.cleanupObserver=null),t.selectingPosition=!1};try{let s={...oe},n=Ye("image");if(t.language=vt(),!s.SITEKEY){let c=document.querySelector("*[data-sitekey]");c?(s.SITEKEY=c.getAttribute("data-sitekey"),i(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${s.SITEKEY.substring(0,20)}...`)):i("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function r(){return i("\u{1F916} Intentando auto-inicio..."),Oe()?(i("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(i("\u{1F50D} Paleta no encontrada, iniciando auto-click del bot\xF3n Paint..."),await Ne(3,!0)?(i("\u2705 Auto-click exitoso, paleta abierta"),!0):(i("\u274C Auto-click fall\xF3, requerir\xE1 inicio manual"),!1))}async function u(c=!1){i("\u{1F916} Inicializando Auto-Image..."),l.setStatus(E("image.checkingColors"),"info");let d=we();if(d.length===0)return l.setStatus(E("image.noColorsFound"),"error"),!1;let p=await de(),f=null;p.success&&p.data.user?(f={username:p.data.user.name||"An\xF3nimo",charges:p.data.charges,maxCharges:p.data.maxCharges,pixels:p.data.user.pixelsPainted||0},o=f,t.currentCharges=p.data.charges,t.maxCharges=p.data.maxCharges||9999,i(`\u{1F464} Usuario conectado: ${p.data.user.name||"An\xF3nimo"} - Cargas: ${f.charges}/${f.maxCharges} - P\xEDxeles: ${f.pixels}`)):i("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),t.availableColors=d,t.colorsChecked=!0,l.setStatus(E("image.colorsFound",{count:d.length}),"success"),l.updateProgress(0,0,f),c||i(`\u2705 ${d.length} colores disponibles detectados`),l.setInitialized(!0),l.enableButtonsAfterInit();try{}catch{}return!0}let l=await Nt({texts:n,onConfigChange:c=>{c.pixelsPerBatch!==void 0&&(t.pixelsPerBatch=c.pixelsPerBatch),c.useAllCharges!==void 0&&(t.useAllChargesFirst=c.useAllCharges),c.paintPattern!==void 0&&(t.paintPattern=c.paintPattern,i(`\u{1F3A8} Patr\xF3n de pintado cambiado a: ${c.paintPattern}`),t.remainingPixels&&t.remainingPixels.length>0&&Promise.resolve().then(()=>($e(),Ge)).then(({applyPaintPattern:d})=>{t.remainingPixels=d(t.remainingPixels,c.paintPattern,t.imageData);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch}),i(`\u2705 Overlay actualizado con nuevo patr\xF3n: ${c.paintPattern}`))}catch(p){i("\u26A0\uFE0F Error actualizando overlay con nuevo patr\xF3n:",p)}}).catch(d=>{i("\u274C Error aplicando nuevo patr\xF3n:",d)})),i("Configuraci\xF3n actualizada:",c)},onInitBot:u,onUploadImage:async c=>{try{l.setStatus(E("image.loadingImage"),"info");let d=window.URL.createObjectURL(c),p=new Ie(d);p.originalName=c.name,await p.load();let f=p.initializeColorPalette();t.availableColors=f;let w=await p.analyzePixels();p.setCoords(0,0,0,0);let y=p.getImageData();t.imageData=y,t.imageData.processor=p,t.totalPixels=w.requiredPixels,t.paintedPixels=0,t.originalImageName=c.name,t.imageLoaded=!0,l.setStatus(E("image.imageLoaded",{count:w.requiredPixels}),"success"),l.updateProgress(0,w.requiredPixels,o),i(`\u2705 [BLUE MARBLE] Imagen cargada: ${y.width}x${y.height}, ${w.requiredPixels} p\xEDxeles v\xE1lidos`),i(`\u2705 [BLUE MARBLE] An\xE1lisis: ${w.uniqueColors} colores \xFAnicos, ${w.defacePixels} p\xEDxeles #deface`),window.URL.revokeObjectURL(d);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),i("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(m){i("\u26A0\uFE0F Error activando plan overlay:",m)}return!0}catch(d){return l.setStatus(E("image.imageError"),"error"),i("\u274C Error cargando imagen:",d),!1}},onSelectPosition:async()=>new Promise(c=>{l.setStatus(E("image.selectPositionAlert"),"info"),l.setStatus(E("image.waitingPosition"),"info"),t.selectingPosition=!0;let d=!1,p=()=>{window.fetch=async(y,m)=>{if(t.selectingPosition&&!d&&typeof y=="string"&&y.includes("/s0/pixel/")&&m&&m.method==="POST")try{i(`\u{1F3AF} Interceptando request de pintado: ${y}`);let b=await e(y,m);if(b.ok&&m.body){let h;try{h=JSON.parse(m.body)}catch(x){return i("Error parseando body del request:",x),b}if(h.coords&&Array.isArray(h.coords)&&h.coords.length>=2){let x=h.coords[0],S=h.coords[1],v=y.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(v&&!d){d=!0;let C=parseInt(v[1]),L=parseInt(v[2]);if(t.tileX=C,t.tileY=L,t.startPosition={x,y:S},t.selectingPosition=!1,t.imageData&&t.imageData.processor){let I=t.imageData.processor;I.setCoords(C,L,x,S);try{await I.createTemplateTiles(),i(`\u2705 [BLUE MARBLE] Template tiles creados para posici\xF3n tile(${C},${L}) pixel(${x},${S})`)}catch(B){i(`\u274C [BLUE MARBLE] Error creando template tiles: ${B.message}`)}let k=I.generatePixelQueue();t.remainingPixels=k,(!t.totalPixels||t.totalPixels===0)&&(t.totalPixels=k.length),i(`\u2705 Cola de p\xEDxeles generada: ${k.length} p\xEDxeles para overlay`)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setEnabled(!1),window.__WPA_PLAN_OVERLAY__.setPlan([],{}),window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:C,tileY:L,pxX:x,pxY:S}),t.remainingPixels&&t.remainingPixels.length>0?(window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{anchor:{tileX:C,tileY:L,pxX:x,pxY:S},imageWidth:t.imageData.width,imageHeight:t.imageData.height,enabled:!0}),i(`\u2705 Plan overlay reiniciado y anclado en tile(${C},${L}) local(${x},${S})`)):i("\u26A0\uFE0F No hay p\xEDxeles para mostrar en overlay"))}catch(I){i(`\u274C Error configurando overlay: ${I.message}`)}a(),l.setStatus(E("image.positionSet"),"success"),i(`\u2705 Posici\xF3n establecida: tile(${t.tileX},${t.tileY}) local(${x},${S})`),c(!0)}else i("\u26A0\uFE0F No se pudo extraer tile de la URL:",y)}}return b}catch(b){if(i("\u274C Error interceptando pixel:",b),!d)return a(),e(y,m)}return e(y,m)}},f=()=>{let y=document.querySelectorAll("canvas");if(y.length===0){i("\u26A0\uFE0F No se encontraron elementos canvas");return}i(`\u{1F4CA} Configurando observer para ${y.length} canvas`);let m=b=>{var x;if(!t.selectingPosition||d)return;let h=b.target;if(h&&h.tagName==="CANVAS"){i("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let v=(((x=document.querySelector("canvas"))==null?void 0:x.parentElement)||document.body).getBoundingClientRect(),C=b.clientX-v.left,L=b.clientY-v.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(C,L),i(`Plan overlay: ancla CSS establecida en (${C}, ${L})`))}catch(S){i("Plan Overlay: error calculando ancla CSS",S)}setTimeout(()=>{!d&&t.selectingPosition&&i("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",m),t.cleanupObserver=()=>{document.removeEventListener("click",m)}};p(),f();let w=setTimeout(()=>{t.selectingPosition&&!d&&(a(),t.cleanupObserver&&t.cleanupObserver(),l.setStatus(E("image.positionTimeout"),"error"),i("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),c(!1))},12e4);t.positionTimeoutId=w}),onStartPainting:async()=>{var c;if(i("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:t.imageLoaded,startPosition:t.startPosition,tileX:t.tileX,tileY:t.tileY,totalPixels:t.totalPixels,remainingPixels:((c=t.remainingPixels)==null?void 0:c.length)||0}),!t.imageLoaded||!t.startPosition)return l.setStatus(E("image.missingRequirements"),"error"),i(`\u274C Validaci\xF3n fallida: imageLoaded=${t.imageLoaded}, startPosition=${!!t.startPosition}`),!1;t.running=!0,t.stopFlag=!1,t.isFirstBatch=t.useAllChargesFirst,i(`\u{1F680} Iniciando pintado - isFirstBatch: ${t.isFirstBatch}, useAllChargesFirst: ${t.useAllChargesFirst}`),l.setStatus(E("image.startPaintingMsg"),"success");try{return await $t(t.imageData,t.startPosition,(d,p,f,w)=>{o&&(o.charges=Math.floor(t.currentCharges),w!==void 0&&(o.estimatedTime=w)),l.updateProgress(d,p,o),t.inCooldown&&t.nextBatchCooldown>0?l.updateCooldownDisplay(t.nextBatchCooldown):l.updateCooldownDisplay(0),f?f.includes("\u23F3")&&t.inCooldown?l.updateCooldownMessage(f):l.setStatus(f,"info"):l.setStatus(E("image.paintingProgress",{painted:d,total:p}),"info")},(d,p)=>{d?(l.setStatus(E("image.paintingComplete",{count:p}),"success"),ot()):l.setStatus(E("image.paintingStopped"),"warning"),t.running=!1},d=>{l.setStatus(E("image.paintingError"),"error"),i("\u274C Error en proceso de pintado:",d),t.running=!1}),!0}catch(d){return l.setStatus(E("image.paintingError"),"error"),i("\u274C Error iniciando pintado:",d),t.running=!1,!1}},onStopPainting:async()=>{if(at().hasProgress){let d=await Wt(E("image.confirmSaveProgress"),E("image.saveProgressTitle"),{save:E("image.saveProgress"),discard:E("image.discardProgress"),cancel:E("image.cancel")});if(d==="save"){let p=Fe();p.success?l.setStatus(E("image.progressSaved",{filename:p.filename}),"success"):l.setStatus(E("image.progressSaveError",{error:p.error}),"error")}else if(d==="cancel")return!1}return Je(),l.setStatus(E("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let c=Fe();return c.success?l.setStatus(E("image.progressSaved",{filename:c.filename}),"success"):l.setStatus(E("image.progressSaveError",{error:c.error}),"error"),c.success},onLoadProgress:async c=>{try{let d=await tt(c);return d.success?(l.setStatus(E("image.progressLoaded",{painted:d.painted,total:d.total}),"success"),l.updateProgress(d.painted,d.total,o),i("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(l.setStatus(E("image.progressLoadError",{error:d.error}),"error"),!1)}catch(d){return l.setStatus(E("image.progressLoadError",{error:d.message}),"error"),!1}},onResizeImage:()=>{t.imageLoaded&&t.imageData&&t.imageData.processor&&l.showResizeDialog(t.imageData.processor)},onConfirmResize:async(c,d,p,f)=>{i(`\u{1F504} Redimensionando imagen de ${c.getDimensions().width}x${c.getDimensions().height} a ${d}x${p}`),i(`\u{1F3A8} Colores seleccionados: ${f?f.length:"todos"}`);try{if(await c.resize(d,p),f&&f.length>0){let y=t.availableColors.filter(m=>f.includes(m.id));c.setSelectedColors(y),i(`\u{1F3A8} Paleta actualizada con ${f.length} colores seleccionados`)}let w=await c.analyzePixels();t.imageData={processor:c,width:d,height:p,validPixelCount:w.requiredPixels,requiredPixels:w.requiredPixels,totalPixels:w.totalPixels},t.totalPixels=w.requiredPixels,t.paintedPixels=0,t.remainingPixels=[],t.lastPosition={x:0,y:0},l.updateProgress(0,w.requiredPixels,o),l.setStatus(E("image.resizeSuccess",{width:d,height:p}),"success"),i(`\u2705 Imagen redimensionada: ${w.requiredPixels} p\xEDxeles v\xE1lidos de ${w.totalPixels} totales`);try{if(window.__WPA_PLAN_OVERLAY__&&t.startPosition&&t.tileX!=null&&t.tileY!=null){await c.createTemplateTiles();let y=c.generatePixelQueue();t.remainingPixels=y,window.__WPA_PLAN_OVERLAY__.setPlan(y,{anchor:{tileX:t.tileX,tileY:t.tileY,pxX:t.startPosition.x,pxY:t.startPosition.y},imageWidth:d,imageHeight:p,enabled:!0}),i(`\u2705 Overlay actualizado con ${y.length} p\xEDxeles despu\xE9s del resize`)}}catch(y){i(`\u26A0\uFE0F Error actualizando overlay despu\xE9s del resize: ${y.message}`)}}catch(w){i(`\u274C Error redimensionando imagen: ${w.message}`),l.setStatus(E("image.imageError"),"error")}},onRefreshStats:async()=>{var c;i("\u{1F504} Actualizando estad\xEDsticas...");try{let d=await de(),p=null;d.success&&d.data.user&&(p={username:d.data.user.name||"An\xF3nimo",charges:d.data.charges,maxCharges:d.data.maxCharges,pixels:d.data.user.pixelsPainted||0,cooldown:d.data.cooldown||0},o=p,t.currentCharges=d.data.charges,t.maxCharges=d.data.maxCharges||9999);let f=we();f.length>0&&(t.availableColors=f,t.colorsChecked=!0);let w=null;t.imageLoaded&&(w={loaded:!0,totalPixels:t.totalPixels,paintedPixels:t.paintedPixels,estimatedTime:t.estimatedTime,originalName:t.originalImageName}),l.updateStatsWindow({userInfo:p,imageInfo:w,availableColors:f.length>0?f:t.availableColors}),l.updateProgress(t.paintedPixels,t.totalPixels,p),i(`\u2705 Estad\xEDsticas actualizadas: ${f.length>0?f.length:((c=t.availableColors)==null?void 0:c.length)||0} colores disponibles`)}catch(d){i("\u274C Error actualizando estad\xEDsticas:",d)}},getAvailableColors:()=>t.availableColors||[],onColorSelectionChange:c=>{i(`\u{1F3A8} Selecci\xF3n de colores cambiada: ${c.length} colores seleccionados`)}}),g=c=>{let{language:d}=c.detail;i(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${d}`),t.language=d};window.addEventListener("launcherLanguageChanged",g),window.addEventListener("languageChanged",g),window.addEventListener("beforeunload",()=>{a(),Je(),l.destroy(),window.removeEventListener("launcherLanguageChanged",g),window.removeEventListener("languageChanged",g),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),i("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{l.setStatus(E("image.autoInitializing"),"info"),i("\u{1F916} Intentando auto-inicio..."),await r()?(l.setStatus(E("image.autoInitSuccess"),"success"),i("\u2705 Auto-inicio exitoso"),l.setInitButtonVisible(!1),await u(!0)&&i("\u{1F680} Bot auto-iniciado completamente")):(l.setStatus(E("image.autoInitFailed"),"warning"),i("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(c){i("\u274C Error en auto-inicio:",c),l.setStatus(E("image.manualInitRequired"),"warning")}},1e3)}catch(s){throw i("\u274C Error inicializando Auto-Image:",s),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),s}}(async()=>{"use strict";var o,e;console.log("[WPA-Image] \u{1F680} Entry point iniciado");try{console.log("[WPA-Image] \u{1F916} Iniciando auto-click del bot\xF3n Paint..."),await Ne(3,!0),console.log("[WPA-Image] \u2705 Auto-click completado")}catch(a){console.log("[WPA-Image] \u26A0\uFE0F Error en auto-click del bot\xF3n Paint:",a)}if((o=window.__wplaceBot)!=null&&o.imageRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Image ya est\xE1 corriendo"),alert("Auto-Image ya est\xE1 corriendo.");return}if((e=window.__wplaceBot)!=null&&e.farmRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Farm est\xE1 ejecut\xE1ndose"),alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={},console.log("[WPA-Image] \u{1F527} Estado global inicializado")),window.__wplaceBot.imageRunning=!0,console.log("[WPA-Image] \u{1F3C3} Marcado como ejecut\xE1ndose"),console.log("[WPA-Image] \u{1F3AF} Llamando a runImage()"),Yt().catch(a=>{console.error("[BOT] Error en Auto-Image:",a),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
