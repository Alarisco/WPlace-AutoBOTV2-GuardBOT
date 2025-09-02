/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-09-02T15:58:36.969Z */
(()=>{var Yt=Object.defineProperty;var j=(t,e)=>()=>(t&&(e=t(t=0)),e);var tt=(t,e)=>{for(var a in e)Yt(t,a,{get:e[a],enumerable:!0})};var n,O=j(()=>{n=(...t)=>console.log("[WPA-UI]",...t)});var ot,it=j(()=>{ot={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",userName:"Usuario",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",showOverlay:"Mostrar overlay",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando...",paintPattern:"\u{1F4D0} Patr\xF3n de pintado",patternLinearStart:"Lineal (Inicio)",patternLinearEnd:"Lineal (Final)",patternRandom:"Aleatorio",patternCenterOut:"Centro hacia afuera",patternCornersFirst:"Esquinas primero",patternSpiral:"Espiral",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",userInfo:"Informaci\xF3n del Usuario",imageProgress:"Progreso de la Imagen",availableColors:"Colores Disponibles",noImageLoaded:"No hay imagen cargada",cooldown:"Tiempo de espera",totalColors:"Total de Colores",colorPalette:"Paleta de Colores",showAllColors:"Mostrar Todos los Colores (incluyendo no disponibles)",selectAllColors:"Seleccionar Todos",unselectAllColors:"Deseleccionar Todos",noAvailable:"No disponible",colorSelected:"Color seleccionado",statsUpdated:"\u2705 Estad\xEDsticas actualizadas: {count} colores disponibles"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Inicializar Guard-BOT",selectArea:"Seleccionar \xC1rea",captureArea:"Capturar \xC1rea",startProtection:"Iniciar",stopProtection:"Detener",protectedPixels:"P\xEDxeles Protegidos",upperLeft:"Esquina Superior Izquierda",lowerRight:"Esquina Inferior Derecha",detectedChanges:"Cambios Detectados",repairedPixels:"P\xEDxeles Reparados",charges:"Cargas",waitingInit:"Esperando inicializaci\xF3n...",checkingColors:"\u{1F3A8} Verificando colores disponibles...",noColorsFound:"\u274C No se encontraron colores. Abre la paleta de colores en el sitio.",colorsFound:"\u2705 {count} colores disponibles encontrados",initSuccess:"\u2705 Guard-BOT inicializado correctamente",initError:"\u274C Error inicializando Guard-BOT",invalidCoords:"\u274C Coordenadas inv\xE1lidas",invalidArea:"\u274C El \xE1rea debe tener esquina superior izquierda menor que inferior derecha",areaTooLarge:"\u274C \xC1rea demasiado grande: {size} p\xEDxeles (m\xE1ximo: {max})",capturingArea:"\u{1F4F8} Capturando \xE1rea...",areaCaptured:"\u2705 \xC1rea capturada: {count} p\xEDxeles",captureError:"\u274C Error capturando \xE1rea: {error}",captureFirst:"\u274C Primero captura un \xE1rea",noChanges:"\u2705 \xC1rea - sin cambios detectados",changesDetected:"\u{1F6A8} {count} cambios detectados en el \xE1rea",repairing:"\u{1F6E0}\uFE0F Reparando {count} p\xEDxeles alterados...",repairedSuccess:"\u2705 Reparados {count} p\xEDxeles correctamente",repairError:"\u274C Error reparando p\xEDxeles: {error}",noCharges:"\u26A0\uFE0F Sin cargas suficientes para reparar cambios",checkingChanges:"\u{1F50D} Verificando cambios en \xE1rea...",errorChecking:"\u274C Error verificando cambios: {error}",guardActive:"\u{1F6E1}\uFE0F Guardi\xE1n activo - \xE1rea monitoreada",lastCheck:"\xDAltima verificaci\xF3n: {time}",nextCheck:"Pr\xF3xima verificaci\xF3n en: {time}s",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Guard-BOT iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",manualInitRequired:"\u{1F527} Inicio manual requerido",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",protectionStopped:"\u23F9\uFE0F Protecci\xF3n detenida",selectUpperLeft:"\u{1F3AF} Pinta un p\xEDxel en la esquina SUPERIOR IZQUIERDA del \xE1rea a monitorear",selectLowerRight:"\u{1F3AF} Ahora pinta un p\xEDxel en la esquina INFERIOR DERECHA del \xE1rea",waitingUpperLeft:"\u{1F446} Esperando selecci\xF3n de esquina superior izquierda...",waitingLowerRight:"\u{1F446} Esperando selecci\xF3n de esquina inferior derecha...",upperLeftCaptured:"\u2705 Esquina superior izquierda capturada: ({x}, {y})",lowerRightCaptured:"\u2705 Esquina inferior derecha capturada: ({x}, {y})",selectionTimeout:"\u274C Tiempo agotado para selecci\xF3n",selectionError:"\u274C Error en selecci\xF3n, int\xE9ntalo de nuevo",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",analysisTitle:"An\xE1lisis de Diferencias - JSON vs Canvas Actual",correctPixels:"P\xEDxeles Correctos",incorrectPixels:"P\xEDxeles Incorrectos",missingPixels:"P\xEDxeles Faltantes",showCorrect:"Mostrar Correctos",showIncorrect:"Mostrar Incorrectos",showMissing:"Mostrar Faltantes",autoRefresh:"Auto-refresco",zoomAdjusted:"Zoom ajustado autom\xE1ticamente a",autoRefreshEnabled:"Auto-refresco activado cada",autoRefreshDisabled:"Auto-refresco desactivado",autoRefreshIntervalUpdated:"Intervalo de auto-refresco actualizado a",visualizationUpdated:"Visualizaci\xF3n actualizada",configTitle:"Configuraci\xF3n del Guard",protectionPatterns:"Patrones de Protecci\xF3n",preferSpecificColor:"Priorizar color espec\xEDfico",excludeSpecificColors:"No reparar colores espec\xEDficos",loadManagement:"Gesti\xF3n de Cargas",minLoadsToWait:"M\xEDnimo de cargas:",pixelsPerBatch:"P\xEDxeles por lote",spendAllPixelsOnStart:"Gastar todos los p\xEDxeles al iniciar",waitTimes:"Tiempos de Espera",useRandomTimes:"Usar tiempos aleatorios entre lotes",minTime:"Tiempo m\xEDnimo (s)",maxTime:"Tiempo m\xE1ximo (s)"}}});var at,nt=j(()=>{at={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",userName:"User",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",showOverlay:"Show overlay",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout, retrying...",protectionEnabled:"Protection enabled",protectionDisabled:"Protection disabled",paintPattern:"Paint pattern",patternLinearStart:"Linear (Start)",patternLinearEnd:"Linear (End)",patternRandom:"Random",patternCenterOut:"Center outward",patternCornersFirst:"Corners first",patternSpiral:"Spiral",solid:"Solid",stripes:"Stripes",checkerboard:"Checkerboard",gradient:"Gradient",dots:"Dots",waves:"Waves",spiral:"Spiral",mosaic:"Mosaic",bricks:"Bricks",zigzag:"Zigzag",protectingDrawing:"Protecting drawing...",changesDetected:"\u{1F6A8} {count} changes detected in drawing",repairing:"\u{1F527} Repairing {count} altered pixels...",repairCompleted:"\u2705 Repair completed: {count} pixels",noChargesForRepair:"\u26A1 No charges for repair, waiting...",protectionPriority:"\u{1F6E1}\uFE0F Protection priority activated",patternApplied:"Pattern applied",customPattern:"Custom pattern",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialize Guard-BOT",selectArea:"Select Area",captureArea:"Capture Area",startProtection:"Start Protection",stopProtection:"Stop Protection",upperLeft:"Upper Left Corner",lowerRight:"Lower Right Corner",protectedPixels:"Protected Pixels",detectedChanges:"Detected Changes",repairedPixels:"Repaired Pixels",charges:"Charges",waitingInit:"Waiting for initialization...",checkingColors:"\u{1F3A8} Checking available colors...",noColorsFound:"\u274C No colors found. Open the color palette on the site.",colorsFound:"\u2705 Found {count} available colors",initSuccess:"\u2705 Guard-BOT initialized successfully",initError:"\u274C Error initializing Guard-BOT",invalidCoords:"\u274C Invalid coordinates",invalidArea:"\u274C Area must have upper left corner less than lower right corner",areaTooLarge:"\u274C Area too large: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capturing protection area...",areaCaptured:"\u2705 Area captured: {count} pixels under protection",captureError:"\u274C Error capturing area: {error}",captureFirst:"\u274C First capture a protection area",protectionStarted:"\u{1F6E1}\uFE0F Protection started - monitoring area",protectionStopped:"\u23F9\uFE0F Protection stopped",noChanges:"\u2705 Protected area - no changes detected",changesDetected:"\u{1F6A8} {count} changes detected in protected area",repairing:"\u{1F6E0}\uFE0F Repairing {count} altered pixels...",repairedSuccess:"\u2705 Successfully repaired {count} pixels",repairError:"\u274C Error repairing pixels: {error}",noCharges:"\u26A0\uFE0F Insufficient charges to repair changes",checkingChanges:"\u{1F50D} Checking changes in protected area...",errorChecking:"\u274C Error checking changes: {error}",guardActive:"\u{1F6E1}\uFE0F Guardian active - area under protection",lastCheck:"Last check: {time}",nextCheck:"Next check in: {time}s",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Guard-BOT auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",manualInitRequired:"\u{1F527} Manual initialization required",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",selectUpperLeft:"\u{1F3AF} Paint a pixel at the UPPER LEFT corner of the area to protect",selectLowerRight:"\u{1F3AF} Now paint a pixel at the LOWER RIGHT corner of the area",waitingUpperLeft:"\u{1F446} Waiting for upper left corner selection...",waitingLowerRight:"\u{1F446} Waiting for lower right corner selection...",upperLeftCaptured:"\u2705 Upper left corner captured: ({x}, {y})",lowerRightCaptured:"\u2705 Lower right corner captured: ({x}, {y})",selectionTimeout:"\u274C Selection timeout",selectionError:"\u274C Selection error, please try again",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close",analysisTitle:"Difference Analysis - JSON vs Current Canvas",correctPixels:"Correct Pixels",incorrectPixels:"Incorrect Pixels",missingPixels:"Missing Pixels",showCorrect:"Show Correct",showIncorrect:"Show Incorrect",showMissing:"Show Missing",autoRefresh:"Auto-refresh",zoomAdjusted:"Zoom automatically adjusted to",autoRefreshEnabled:"Auto-refresh enabled every",autoRefreshDisabled:"Auto-refresh disabled",autoRefreshIntervalUpdated:"Auto-refresh interval updated to",visualizationUpdated:"Visualization updated",configTitle:"Guard Configuration",protectionPatterns:"Protection Patterns",preferSpecificColor:"Prioritize specific color",excludeSpecificColors:"Don't repair specific colors",loadManagement:"Load Management",minLoadsToWait:"Minimum loads to wait",pixelsPerBatch:"Pixels per batch",spendAllPixelsOnStart:"Spend all pixels on start",waitTimes:"Wait Times",useRandomTimes:"Use random times between batches",minTime:"Minimum time (s)",maxTime:"Maximum time (s)"}}});var rt,st=j(()=>{rt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",userName:"Usager",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",showOverlay:"Afficher l'overlay",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 D\xE9lai d\u2019attente du serveur, nouvelle tentative...",protectionEnabled:"Protection activ\xE9e",protectionDisabled:"Protection d\xE9sactiv\xE9e",paintPattern:"Motif de peinture",patternLinearStart:"Lin\xE9aire (D\xE9but)",patternLinearEnd:"Lin\xE9aire (Fin)",patternRandom:"Al\xE9atoire",patternCenterOut:"Centre vers l\u2019ext\xE9rieur",patternCornersFirst:"Coins d\u2019abord",patternSpiral:"Spirale",solid:"Plein",stripes:"Rayures",checkerboard:"Damier",gradient:"D\xE9grad\xE9",dots:"Points",waves:"Vagues",spiral:"Spirale",mosaic:"Mosa\xEFque",bricks:"Briques",zigzag:"Zigzag",protectingDrawing:"Protection du dessin...",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans le dessin",repairing:"\u{1F527} R\xE9paration de {count} pixels modifi\xE9s...",repairCompleted:"\u2705 R\xE9paration termin\xE9e : {count} pixels",noChargesForRepair:"\u26A1 Pas de frais pour la r\xE9paration, en attente...",protectionPriority:"\u{1F6E1}\uFE0F Priorit\xE9 \xE0 la protection activ\xE9e",patternApplied:"Motif appliqu\xE9",customPattern:"Motif personnalis\xE9",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialiser Guard-BOT",selectArea:"S\xE9lectionner Zone",captureArea:"Capturer Zone",startProtection:"D\xE9marrer Protection",stopProtection:"Arr\xEAter Protection",upperLeft:"Coin Sup\xE9rieur Gauche",lowerRight:"Coin Inf\xE9rieur Droit",protectedPixels:"Pixels Prot\xE9g\xE9s",detectedChanges:"Changements D\xE9tect\xE9s",repairedPixels:"Pixels R\xE9par\xE9s",charges:"Charges",waitingInit:"En attente d'initialisation...",checkingColors:"\u{1F3A8} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Aucune couleur trouv\xE9e. Ouvrez la palette de couleurs sur le site.",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",initSuccess:"\u2705 Guard-BOT initialis\xE9 avec succ\xE8s",initError:"\u274C Erreur lors de l'initialisation de Guard-BOT",invalidCoords:"\u274C Coordonn\xE9es invalides",invalidArea:"\u274C La zone doit avoir le coin sup\xE9rieur gauche inf\xE9rieur au coin inf\xE9rieur droit",areaTooLarge:"\u274C Zone trop grande: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capture de la zone de protection...",areaCaptured:"\u2705 Zone captur\xE9e: {count} pixels sous protection",captureError:"\u274C Erreur lors de la capture de zone: {error}",captureFirst:"\u274C Capturez d'abord une zone de protection",protectionStarted:"\u{1F6E1}\uFE0F Protection d\xE9marr\xE9e - surveillance de la zone",protectionStopped:"\u23F9\uFE0F Protection arr\xEAt\xE9e",noChanges:"\u2705 Zone prot\xE9g\xE9e - aucun changement d\xE9tect\xE9",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans la zone prot\xE9g\xE9e",repairing:"\u{1F6E0}\uFE0F R\xE9paration de {count} pixels alt\xE9r\xE9s...",repairedSuccess:"\u2705 {count} pixels r\xE9par\xE9s avec succ\xE8s",repairError:"\u274C Erreur lors de la r\xE9paration des pixels: {error}",noCharges:"\u26A0\uFE0F Charges insuffisantes pour r\xE9parer les changements",checkingChanges:"\u{1F50D} V\xE9rification des changements dans la zone prot\xE9g\xE9e...",errorChecking:"\u274C Erreur lors de la v\xE9rification des changements: {error}",guardActive:"\u{1F6E1}\uFE0F Gardien actif - zone sous protection",lastCheck:"Derni\xE8re v\xE9rification: {time}",nextCheck:"Prochaine v\xE9rification dans: {time}s",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Guard-BOT d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",manualInitRequired:"\u{1F527} Initialisation manuelle requise",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",selectUpperLeft:"\u{1F3AF} Peignez un pixel au coin SUP\xC9RIEUR GAUCHE de la zone \xE0 prot\xE9ger",selectLowerRight:"\u{1F3AF} Maintenant peignez un pixel au coin INF\xC9RIEUR DROIT de la zone",waitingUpperLeft:"\u{1F446} En attente de la s\xE9lection du coin sup\xE9rieur gauche...",waitingLowerRight:"\u{1F446} En attente de la s\xE9lection du coin inf\xE9rieur droit...",upperLeftCaptured:"\u2705 Coin sup\xE9rieur gauche captur\xE9: ({x}, {y})",lowerRightCaptured:"\u2705 Coin inf\xE9rieur droit captur\xE9: ({x}, {y})",selectionTimeout:"\u274C D\xE9lai de s\xE9lection d\xE9pass\xE9",selectionError:"\u274C Erreur de s\xE9lection, veuillez r\xE9essayer",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer",analysisTitle:"Analyse des Diff\xE9rences - JSON vs Canvas Actuel",correctPixels:"Pixels Corrects",incorrectPixels:"Pixels Incorrects",missingPixels:"Pixels Manquants",showCorrect:"Afficher Corrects",showIncorrect:"Afficher Incorrects",showMissing:"Afficher Manquants",autoRefresh:"Actualisation automatique",zoomAdjusted:"Zoom ajust\xE9 automatiquement \xE0",autoRefreshEnabled:"Actualisation automatique activ\xE9e toutes les",autoRefreshDisabled:"Actualisation automatique d\xE9sactiv\xE9e",autoRefreshIntervalUpdated:"Intervalle d'actualisation automatique mis \xE0 jour \xE0",visualizationUpdated:"Visualisation mise \xE0 jour",configTitle:"Configuration du Guard",protectionPatterns:"Mod\xE8les de Protection",preferSpecificColor:"Prioriser une couleur sp\xE9cifique",excludeSpecificColors:"Ne pas r\xE9parer les couleurs sp\xE9cifiques",loadManagement:"Gestion des Charges",minLoadsToWait:"Minimum de charges \xE0 attendre",pixelsPerBatch:"Pixels par lot",spendAllPixelsOnStart:"D\xE9penser tous les pixels au d\xE9marrage",waitTimes:"Temps d'Attente",useRandomTimes:"Utiliser des temps al\xE9atoires entre les lots",minTime:"Temps minimum (s)",maxTime:"Temps maximum (s)"}}});var lt,ct=j(()=>{lt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",autoImage:"\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",autoGuard:"\u{1F6E1}\uFE0F \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",selection:"\u0412\u044B\u0431\u0440\u0430\u043D\u043E",user:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",charges:"\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",backend:"\u0411\u044D\u043A\u0435\u043D\u0434",database:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",uptime:"\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",launch:"\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",executing:"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",downloading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",chooseBot:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",readyToLaunch:"\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",loadError:"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",loadErrorMsg:"\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",checking:"\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",online:"\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",offline:"\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",ok:"\u{1F7E2} \u041E\u041A",error:"\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",unknown:"-",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},image:{title:"WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",uploadImage:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",resizeImage:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",startPainting:"\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",stopPainting:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",saveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",loadProgress:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",checkingColors:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",loadingImage:"\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",imageLoaded:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",imageError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPositionAlert:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",positionDetected:"\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",positionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",startPaintingMsg:"\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",paintingProgress:"\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",noCharges:"\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",paintingStopped:"\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",paintingComplete:"\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",paintingError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",missingRequirements:"\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",progress:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",userName:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",pixels:"\u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",estimatedTime:"\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",initMessage:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",resizeSuccess:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",paintingPaused:"\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",batchSize:"\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",nextBatchTime:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437",useAllCharges:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",showOverlay:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435",maxCharges:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",waitingForCharges:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",timeRemaining:"\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",cooldownWaiting:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",progressSaved:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",progressLoaded:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",progressLoadError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",progressSaveError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",confirmSaveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",saveProgressTitle:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",discardProgress:"\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",minimize:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",width:"\u0428\u0438\u0440\u0438\u043D\u0430",height:"\u0412\u044B\u0441\u043E\u0442\u0430",keepAspect:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",apply:"\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",overlayOn:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u041A\u041B",overlayOff:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u042B\u041A\u041B",passCompleted:"\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",waitingChargesRegen:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",waitingChargesCountdown:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",retryAttempt:"\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryError:"\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryFailed:"\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",networkError:"\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",serverError:"\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",timeoutError:"\u23F0 \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",protectionEnabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430",protectionDisabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",paintPattern:"\u0428\u0430\u0431\u043B\u043E\u043D \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",patternLinearStart:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043D\u0430\u0447\u0430\u043B\u043E)",patternLinearEnd:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043A\u043E\u043D\u0435\u0446)",patternRandom:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",patternCenterOut:"\u0418\u0437 \u0446\u0435\u043D\u0442\u0440\u0430 \u043D\u0430\u0440\u0443\u0436\u0443",patternCornersFirst:"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0433\u043B\u044B",patternSpiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",solid:"\u0421\u043F\u043B\u043E\u0448\u043D\u043E\u0439",stripes:"\u041F\u043E\u043B\u043E\u0441\u044B",checkerboard:"\u0428\u0430\u0445\u043C\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u043A\u0430",gradient:"\u0413\u0440\u0430\u0434\u0438\u0435\u043D\u0442",dots:"\u0422\u043E\u0447\u043A\u0438",waves:"\u0412\u043E\u043B\u043D\u044B",spiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",mosaic:"\u041C\u043E\u0437\u0430\u0438\u043A\u0430",bricks:"\u041A\u0438\u0440\u043F\u0438\u0447\u0438",zigzag:"\u0417\u0438\u0433\u0437\u0430\u0433",protectingDrawing:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0438\u0441\u0443\u043D\u043A\u0430...",changesDetected:"\u{1F6A8} \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {count}",repairing:"\u{1F527} \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairCompleted:"\u2705 \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",noChargesForRepair:"\u26A1 \u041A\u043E\u043C\u0438\u0441\u0441\u0438\u0439 \u0437\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435\u0442, \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435...",protectionPriority:"\u{1F6E1}\uFE0F \u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u044B \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D",patternApplied:"\u0428\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D",customPattern:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0448\u0430\u0431\u043B\u043E\u043D",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},farm:{title:"WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",stopped:"\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",calibrate:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",paintOnce:"\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",checkingStatus:"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",configuration:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",delay:"\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",minCharges:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",colorMode:"\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",random:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",fixed:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",range:"\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",fixedColor:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",advanced:"\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",tileX:"\u041F\u043B\u0438\u0442\u043A\u0430 X",tileY:"\u041F\u043B\u0438\u0442\u043A\u0430 Y",customPalette:"\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",paletteExample:"\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",capture:"\u0417\u0430\u0445\u0432\u0430\u0442",painted:"\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",retries:"\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",tile:"\u041F\u043B\u0438\u0442\u043A\u0430",configSaved:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",configLoaded:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",configReset:"\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",captureInstructions:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",backendOnline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",backendOffline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u0444\u043B\u0430\u0439\u043D",startingBot:"\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",stoppingBot:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",calibrating:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",alreadyRunning:"\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",imageRunningWarning:"\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C",selectPositionAlert:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",missingPosition:"\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",farmRadius:"\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",positionInfo:"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",farmingInRadius:"\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",selectEmptyArea:"\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",noPosition:"\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",currentZone:"\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},common:{yes:"\u0414\u0430",no:"\u041D\u0435\u0442",ok:"\u041E\u041A",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",load:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",edit:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",pause:"\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",resume:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",reset:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",help:"\u041F\u043E\u043C\u043E\u0449\u044C",about:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",language:"\u042F\u0437\u044B\u043A",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",error:"\u041E\u0448\u0438\u0431\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",info:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",languageChanged:"\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"},guard:{title:"WPlace \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Guard-BOT",selectArea:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",captureArea:"\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",startProtection:"\u041D\u0430\u0447\u0430\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",stopProtection:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",upperLeft:"\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u041B\u0435\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",lowerRight:"\u041D\u0438\u0436\u043D\u0438\u0439 \u041F\u0440\u0430\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",protectedPixels:"\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",detectedChanges:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0435 \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",repairedPixels:"\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",checkingColors:"\u{1F3A8} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u0426\u0432\u0435\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435.",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",initSuccess:"\u2705 Guard-BOT \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D",initError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 Guard-BOT",invalidCoords:"\u274C \u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B",invalidArea:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430",areaTooLarge:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F: {size} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 (\u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C: {max})",capturingArea:"\u{1F4F8} \u0417\u0430\u0445\u0432\u0430\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0437\u0430\u0449\u0438\u0442\u044B...",areaCaptured:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D\u0430: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",captureError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438: {error}",captureFirst:"\u274C \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u044B",protectionStarted:"\u{1F6E1}\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430 - \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",protectionStopped:"\u23F9\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",noChanges:"\u2705 \u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C - \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E",changesDetected:"\u{1F6A8} {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",repairing:"\u{1F6E0}\uFE0F \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairedSuccess:"\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",repairError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439: {error}",noCharges:"\u26A0\uFE0F \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439",checkingChanges:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438...",errorChecking:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {error}",guardActive:"\u{1F6E1}\uFE0F \u0421\u0442\u0440\u0430\u0436 \u0430\u043A\u0442\u0438\u0432\u0435\u043D - \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",lastCheck:"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: {time}",nextCheck:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u0440\u0435\u0437: {time}\u0441",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 Guard-BOT \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",selectUpperLeft:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0412\u0415\u0420\u0425\u041D\u0415\u041C \u041B\u0415\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B",selectLowerRight:"\u{1F3AF} \u0422\u0435\u043F\u0435\u0440\u044C \u043D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041D\u0418\u0416\u041D\u0415\u041C \u041F\u0420\u0410\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",waitingUpperLeft:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u043B\u0435\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",waitingLowerRight:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",upperLeftCaptured:"\u2705 \u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",lowerRightCaptured:"\u2705 \u041D\u0438\u0436\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",selectionTimeout:"\u274C \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430",selectionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",analysisTitle:"\u0410\u043D\u0430\u043B\u0438\u0437 \u0420\u0430\u0437\u043B\u0438\u0447\u0438\u0439 - JSON vs \u0422\u0435\u043A\u0443\u0449\u0438\u0439 Canvas",correctPixels:"\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",incorrectPixels:"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",missingPixels:"\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",showCorrect:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435",showIncorrect:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435",showMissing:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435",autoRefresh:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",zoomAdjusted:"\u041C\u0430\u0441\u0448\u0442\u0430\u0431 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u043D\u0430",autoRefreshEnabled:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043A\u0430\u0436\u0434\u044B\u0435",autoRefreshDisabled:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E",autoRefreshIntervalUpdated:"\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0430\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D \u0434\u043E",visualizationUpdated:"\u0412\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430",configTitle:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F Guard",protectionPatterns:"\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u0417\u0430\u0449\u0438\u0442\u044B",preferSpecificColor:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0446\u0432\u0435\u0442\u0430",excludeSpecificColors:"\u041D\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u0446\u0432\u0435\u0442\u0430",loadManagement:"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u041D\u0430\u0433\u0440\u0443\u0437\u043A\u043E\u0439",minLoadsToWait:"\u041C\u0438\u043D\u0438\u043C\u0443\u043C \u0437\u0430\u0433\u0440\u0443\u0437\u043E\u043A \u0434\u043B\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0430\u0440\u0442\u0438\u044E",spendAllPixelsOnStart:"\u041F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u0438 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435",waitTimes:"\u0412\u0440\u0435\u043C\u044F \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u044F",useRandomTimes:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u043C\u0435\u0436\u0434\u0443 \u043F\u0430\u0440\u0442\u0438\u044F\u043C\u0438",minTime:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F (\u0441)",maxTime:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F (\u0441)"}}});var dt,ut=j(()=>{dt={launcher:{title:"WPlace \u81EA\u52A8\u673A\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52A8\u519C\u573A",autoImage:"\u{1F3A8} \u81EA\u52A8\u7ED8\u56FE",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52A8\u5B88\u62A4",selection:"\u9009\u62E9",user:"\u7528\u6237",charges:"\u6B21\u6570",backend:"\u540E\u7AEF",database:"\u6570\u636E\u5E93",uptime:"\u8FD0\u884C\u65F6\u95F4",close:"\u5173\u95ED",launch:"\u542F\u52A8",loading:"\u52A0\u8F7D\u4E2D\u2026",executing:"\u6267\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F7D\u811A\u672C\u2026",chooseBot:"\u9009\u62E9\u4E00\u4E2A\u673A\u5668\u4EBA\u5E76\u70B9\u51FB\u542F\u52A8",readyToLaunch:"\u51C6\u5907\u542F\u52A8",loadError:"\u52A0\u8F7D\u9519\u8BEF",loadErrorMsg:"\u65E0\u6CD5\u52A0\u8F7D\u6240\u9009\u673A\u5668\u4EBA\u3002\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6216\u91CD\u8BD5\u3002",checking:"\u{1F504} \u68C0\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7EBF",offline:"\u{1F534} \u79BB\u7EBF",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u9519\u8BEF",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},image:{title:"WPlace \u81EA\u52A8\u7ED8\u56FE",initBot:"\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA",uploadImage:"\u4E0A\u4F20\u56FE\u7247",resizeImage:"\u8C03\u6574\u56FE\u7247\u5927\u5C0F",selectPosition:"\u9009\u62E9\u4F4D\u7F6E",startPainting:"\u5F00\u59CB\u7ED8\u5236",stopPainting:"\u505C\u6B62\u7ED8\u5236",saveProgress:"\u4FDD\u5B58\u8FDB\u5EA6",loadProgress:"\u52A0\u8F7D\u8FDB\u5EA6",checkingColors:"\u{1F50D} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u540E\u91CD\u8BD5\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F7D\u56FE\u7247...",imageLoaded:"\u2705 \u56FE\u7247\u5DF2\u52A0\u8F7D\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u4E2A",imageError:"\u274C \u56FE\u7247\u52A0\u8F7D\u5931\u8D25",selectPositionAlert:"\u8BF7\u5728\u4F60\u60F3\u5F00\u59CB\u7ED8\u5236\u7684\u5730\u65B9\u6D82\u7B2C\u4E00\u4E2A\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8BBE\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9009\u62E9\u8D85\u65F6",positionDetected:"\u{1F3AF} \u5DF2\u68C0\u6D4B\u5230\u4F4D\u7F6E\uFF0C\u5904\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u68C0\u6D4B\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",startPaintingMsg:"\u{1F3A8} \u5F00\u59CB\u7ED8\u5236...",paintingProgress:"\u{1F9F1} \u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6CA1\u6709\u6B21\u6570\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7ED8\u5236",paintingComplete:"\u2705 \u7ED8\u5236\u5B8C\u6210\uFF01\u5171\u7ED8\u5236 {count} \u4E2A\u50CF\u7D20\u3002",paintingError:"\u274C \u7ED8\u5236\u8FC7\u7A0B\u4E2D\u51FA\u9519",missingRequirements:"\u274C \u8BF7\u5148\u52A0\u8F7D\u56FE\u7247\u5E76\u9009\u62E9\u4F4D\u7F6E",progress:"\u8FDB\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6570",estimatedTime:"\u9884\u8BA1\u65F6\u95F4",initMessage:"\u70B9\u51FB\u201C\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA\u201D\u5F00\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u56FE\u7247\u5DF2\u8C03\u6574\u4E3A {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7ED8\u5236\u6682\u505C\u4E8E\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u65F6\u95F4",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6570",showOverlay:"\u663E\u793A\u8986\u76D6\u5C42",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6570",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed}",timeRemaining:"\u5269\u4F59\u65F6\u95F4",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u540E\u7EE7\u7EED...",progressSaved:"\u2705 \u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u4E3A {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F7D\u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7ED8\u5236",progressLoadError:"\u274C \u52A0\u8F7D\u8FDB\u5EA6\u5931\u8D25: {error}",progressSaveError:"\u274C \u4FDD\u5B58\u8FDB\u5EA6\u5931\u8D25: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u5F53\u524D\u8FDB\u5EA6\u5417\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u8FDB\u5EA6",discardProgress:"\u653E\u5F03",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BBD\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7EB5\u6A2A\u6BD4",apply:"\u5E94\u7528",overlayOn:"\u8986\u76D6\u5C42: \u5F00\u542F",overlayOff:"\u8986\u76D6\u5C42: \u5173\u95ED",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7ED8\u5236 {painted} \u50CF\u7D20 | \u8FDB\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6570\u6062\u590D: {current}/{needed} - \u65F6\u95F4: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed} - \u5269\u4F59: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8BD5 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5C1D\u8BD5\u51FA\u9519\uFF0C\u5C06\u5728 {delay} \u79D2\u540E\u91CD\u8BD5...",retryFailed:"\u274C \u8D85\u8FC7 {maxAttempts} \u6B21\u5C1D\u8BD5\u5931\u8D25\u3002\u7EE7\u7EED\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7F51\u7EDC\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",serverError:"\u{1F525} \u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",timeoutError:"\u23F0 \u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u6B63\u5728\u91CD\u8BD5...",protectionEnabled:"\u5DF2\u5F00\u542F\u4FDD\u62A4",protectionDisabled:"\u5DF2\u5173\u95ED\u4FDD\u62A4",paintPattern:"\u7ED8\u5236\u6A21\u5F0F",patternLinearStart:"\u7EBF\u6027\uFF08\u8D77\u70B9\uFF09",patternLinearEnd:"\u7EBF\u6027\uFF08\u7EC8\u70B9\uFF09",patternRandom:"\u968F\u673A",patternCenterOut:"\u4ECE\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5B9E\u5FC3",stripes:"\u6761\u7EB9",checkerboard:"\u68CB\u76D8\u683C",gradient:"\u6E10\u53D8",dots:"\u70B9\u72B6",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u9A6C\u8D5B\u514B",bricks:"\u7816\u5757",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u62A4\u56FE\u7A3F...",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u5904\u66F4\u6539",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u66F4\u6539\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u590D\u5B8C\u6210\uFF1A{count} \u4E2A\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u590D\u4E0D\u6D88\u8017\u70B9\u6570\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u542F\u7528\u4FDD\u62A4\u4F18\u5148",patternApplied:"\u5DF2\u5E94\u7528\u6A21\u5F0F",customPattern:"\u81EA\u5B9A\u4E49\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},farm:{title:"WPlace \u519C\u573A\u673A\u5668\u4EBA",start:"\u5F00\u59CB",stop:"\u505C\u6B62",stopped:"\u673A\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u51C6",paintOnce:"\u4E00\u6B21",checkingStatus:"\u68C0\u67E5\u72B6\u6001\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u8FDF (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6570",colorMode:"\u989C\u8272\u6A21\u5F0F",random:"\u968F\u673A",fixed:"\u56FA\u5B9A",range:"\u8303\u56F4",fixedColor:"\u56FA\u5B9A\u989C\u8272",advanced:"\u9AD8\u7EA7",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u4E49\u8C03\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u83B7",painted:"\u5DF2\u7ED8\u5236",charges:"\u6B21\u6570",retries:"\u91CD\u8BD5",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F7D",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8BF7\u624B\u52A8\u7ED8\u5236\u4E00\u4E2A\u50CF\u7D20\u4EE5\u6355\u83B7\u5750\u6807...",backendOnline:"\u540E\u7AEF\u5728\u7EBF",backendOffline:"\u540E\u7AEF\u79BB\u7EBF",startingBot:"\u6B63\u5728\u542F\u52A8\u673A\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u673A\u5668\u4EBA...",calibrating:"\u6821\u51C6\u4E2D...",alreadyRunning:"\u81EA\u52A8\u519C\u573A\u5DF2\u5728\u8FD0\u884C\u3002",imageRunningWarning:"\u81EA\u52A8\u7ED8\u56FE\u6B63\u5728\u8FD0\u884C\uFF0C\u8BF7\u5148\u5173\u95ED\u518D\u542F\u52A8\u81EA\u52A8\u519C\u573A\u3002",selectPosition:"\u9009\u62E9\u533A\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u56FE\u7684\u7A7A\u767D\u533A\u57DF\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u533A\u57DF\u8BBE\u7F6E\u6210\u529F\uFF01\u534A\u5F84: 500px",positionTimeout:"\u274C \u533A\u57DF\u9009\u62E9\u8D85\u65F6",missingPosition:"\u274C \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF08\u4F7F\u7528\u201C\u9009\u62E9\u533A\u57DF\u201D\u6309\u94AE\uFF09",farmRadius:"\u519C\u573A\u534A\u5F84",positionInfo:"\u5F53\u524D\u533A\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F84 {radius}px \u5728 ({x},{y}) \u519C\u573A",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8BF7\u9009\u62E9\u7A7A\u767D\u533A\u57DF\u4EE5\u907F\u514D\u51B2\u7A81",noPosition:"\u672A\u9009\u62E9\u533A\u57DF",currentZone:"\u533A\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF0C\u5728\u5730\u56FE\u4E0A\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},common:{yes:"\u662F",no:"\u5426",ok:"\u786E\u8BA4",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",save:"\u4FDD\u5B58",load:"\u52A0\u8F7D",delete:"\u5220\u9664",edit:"\u7F16\u8F91",start:"\u5F00\u59CB",stop:"\u505C\u6B62",pause:"\u6682\u505C",resume:"\u7EE7\u7EED",reset:"\u91CD\u7F6E",settings:"\u8BBE\u7F6E",help:"\u5E2E\u52A9",about:"\u5173\u4E8E",language:"\u8BED\u8A00",loading:"\u52A0\u8F7D\u4E2D...",error:"\u9519\u8BEF",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8BED\u8A00\u5DF2\u5207\u6362\u4E3A {language}"},guard:{title:"WPlace \u81EA\u52A8\u5B88\u62A4",initBot:"\u521D\u59CB\u5316\u5B88\u62A4\u673A\u5668\u4EBA",selectArea:"\u9009\u62E9\u533A\u57DF",captureArea:"\u6355\u83B7\u533A\u57DF",startProtection:"\u5F00\u59CB\u5B88\u62A4",stopProtection:"\u505C\u6B62\u5B88\u62A4",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u62A4\u50CF\u7D20",detectedChanges:"\u68C0\u6D4B\u5230\u7684\u53D8\u5316",repairedPixels:"\u4FEE\u590D\u7684\u50CF\u7D20",charges:"\u6B21\u6570",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u989C\u8272\uFF0C\u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",initSuccess:"\u2705 \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u5931\u8D25",invalidCoords:"\u274C \u5750\u6807\u65E0\u6548",invalidArea:"\u274C \u533A\u57DF\u65E0\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u987B\u5C0F\u4E8E\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u533A\u57DF\u8FC7\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u83B7\u5B88\u62A4\u533A\u57DF\u4E2D...",areaCaptured:"\u2705 \u533A\u57DF\u6355\u83B7\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u62A4",captureError:"\u274C \u6355\u83B7\u533A\u57DF\u51FA\u9519: {error}",captureFirst:"\u274C \u8BF7\u5148\u6355\u83B7\u4E00\u4E2A\u5B88\u62A4\u533A\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u62A4\u5DF2\u542F\u52A8 - \u533A\u57DF\u76D1\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u62A4\u5DF2\u505C\u6B62",noChanges:"\u2705 \u533A\u57DF\u5B89\u5168 - \u672A\u68C0\u6D4B\u5230\u53D8\u5316",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u4E2A\u53D8\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u590D {count} \u4E2A\u50CF\u7D20",repairError:"\u274C \u4FEE\u590D\u51FA\u9519: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4FEE\u590D",checkingChanges:"\u{1F50D} \u6B63\u5728\u68C0\u67E5\u533A\u57DF\u53D8\u5316...",errorChecking:"\u274C \u68C0\u67E5\u51FA\u9519: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u62A4\u4E2D - \u533A\u57DF\u53D7\u4FDD\u62A4",lastCheck:"\u4E0A\u6B21\u68C0\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u68C0\u67E5: {time} \u79D2\u540E",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u62A4\u533A\u57DF\u7684\u5DE6\u4E0A\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73B0\u5728\u5728\u53F3\u4E0B\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u83B7\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u83B7\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9009\u62E9\u8D85\u65F6",selectionError:"\u274C \u9009\u62E9\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED",analysisTitle:"\u5DEE\u5F02\u5206\u6790 - JSON vs \u5F53\u524D\u753B\u5E03",correctPixels:"\u6B63\u786E\u50CF\u7D20",incorrectPixels:"\u9519\u8BEF\u50CF\u7D20",missingPixels:"\u7F3A\u5931\u50CF\u7D20",showCorrect:"\u663E\u793A\u6B63\u786E",showIncorrect:"\u663E\u793A\u9519\u8BEF",showMissing:"\u663E\u793A\u7F3A\u5931",autoRefresh:"\u81EA\u52A8\u5237\u65B0",zoomAdjusted:"\u7F29\u653E\u81EA\u52A8\u8C03\u6574\u4E3A",autoRefreshEnabled:"\u81EA\u52A8\u5237\u65B0\u5DF2\u542F\u7528\uFF0C\u95F4\u9694",autoRefreshDisabled:"\u81EA\u52A8\u5237\u65B0\u5DF2\u7981\u7528",autoRefreshIntervalUpdated:"\u81EA\u52A8\u5237\u65B0\u95F4\u9694\u5DF2\u66F4\u65B0\u4E3A",visualizationUpdated:"\u53EF\u89C6\u5316\u5DF2\u66F4\u65B0",configTitle:"Guard\u914D\u7F6E",protectionPatterns:"\u4FDD\u62A4\u6A21\u5F0F",preferSpecificColor:"\u4F18\u5148\u7279\u5B9A\u989C\u8272",excludeSpecificColors:"\u4E0D\u4FEE\u590D\u7279\u5B9A\u989C\u8272",loadManagement:"\u8D1F\u8F7D\u7BA1\u7406",minLoadsToWait:"\u7B49\u5F85\u7684\u6700\u5C0F\u8D1F\u8F7D\u6570",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",spendAllPixelsOnStart:"\u542F\u52A8\u65F6\u6D88\u8017\u6240\u6709\u50CF\u7D20",waitTimes:"\u7B49\u5F85\u65F6\u95F4",useRandomTimes:"\u6279\u6B21\u95F4\u4F7F\u7528\u968F\u673A\u65F6\u95F4",minTime:"\u6700\u5C0F\u65F6\u95F4 (\u79D2)",maxTime:"\u6700\u5927\u65F6\u95F4 (\u79D2)"}}});var gt,pt=j(()=>{gt={launcher:{title:"WPlace \u81EA\u52D5\u6A5F\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52D5\u8FB2\u5834",autoImage:"\u{1F3A8} \u81EA\u52D5\u7E6A\u5716",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52D5\u5B88\u8B77",selection:"\u9078\u64C7",user:"\u7528\u6237",charges:"\u6B21\u6578",backend:"\u5F8C\u7AEF",database:"\u6578\u64DA\u5EAB",uptime:"\u904B\u884C\u6642\u9593",close:"\u95DC\u9589",launch:"\u5553\u52D5",loading:"\u52A0\u8F09\u4E2D\u2026",executing:"\u57F7\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F09\u8173\u672C\u2026",chooseBot:"\u9078\u64C7\u4E00\u500B\u6A5F\u5668\u4EBA\u4E26\u9EDE\u64CA\u5553\u52D5",readyToLaunch:"\u6E96\u5099\u5553\u52D5",loadError:"\u52A0\u8F09\u932F\u8AA4",loadErrorMsg:"\u7121\u6CD5\u52A0\u8F09\u6240\u9078\u6A5F\u5668\u4EBA\u3002\u8ACB\u6AA2\u67E5\u7DB2\u7D61\u9023\u63A5\u6216\u91CD\u8A66\u3002",checking:"\u{1F504} \u6AA2\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7DDA",offline:"\u{1F534} \u96E2\u7DDA",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u932F\u8AA4",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},image:{title:"WPlace \u81EA\u52D5\u7E6A\u5716",initBot:"\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA",uploadImage:"\u4E0A\u50B3\u5716\u7247",resizeImage:"\u8ABF\u6574\u5716\u7247\u5927\u5C0F",selectPosition:"\u9078\u64C7\u4F4D\u7F6E",startPainting:"\u958B\u59CB\u7E6A\u88FD",stopPainting:"\u505C\u6B62\u7E6A\u88FD",saveProgress:"\u4FDD\u5B58\u9032\u5EA6",loadProgress:"\u52A0\u8F09\u9032\u5EA6",checkingColors:"\u{1F50D} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u5F8C\u91CD\u8A66\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F09\u5716\u7247...",imageLoaded:"\u2705 \u5716\u7247\u5DF2\u52A0\u8F09\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u500B",imageError:"\u274C \u5716\u7247\u52A0\u8F09\u5931\u6557",selectPositionAlert:"\u8ACB\u5728\u4F60\u60F3\u958B\u59CB\u7E6A\u88FD\u7684\u5730\u65B9\u5857\u7B2C\u4E00\u500B\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8A2D\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9078\u64C7\u8D85\u6642",positionDetected:"\u{1F3AF} \u5DF2\u6AA2\u6E2C\u5230\u4F4D\u7F6E\uFF0C\u8655\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u6AA2\u6E2C\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66",startPaintingMsg:"\u{1F3A8} \u958B\u59CB\u7E6A\u88FD...",paintingProgress:"\u{1F9F1} \u9032\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6C92\u6709\u6B21\u6578\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7E6A\u88FD",paintingComplete:"\u2705 \u7E6A\u88FD\u5B8C\u6210\uFF01\u5171\u7E6A\u88FD {count} \u500B\u50CF\u7D20\u3002",paintingError:"\u274C \u7E6A\u88FD\u904E\u7A0B\u4E2D\u51FA\u932F",missingRequirements:"\u274C \u8ACB\u5148\u52A0\u8F09\u5716\u7247\u4E26\u9078\u64C7\u4F4D\u7F6E",progress:"\u9032\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6578",estimatedTime:"\u9810\u8A08\u6642\u9593",initMessage:"\u9EDE\u64CA\u201C\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA\u201D\u958B\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u5716\u7247\u5DF2\u8ABF\u6574\u70BA {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7E6A\u88FD\u66AB\u505C\u65BC\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u6642\u9593",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6578",showOverlay:"\u986F\u793A\u8986\u84CB\u5C64",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6578",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed}",timeRemaining:"\u5269\u9918\u6642\u9593",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u5F8C\u7E7C\u7E8C...",progressSaved:"\u2705 \u9032\u5EA6\u5DF2\u4FDD\u5B58\u70BA {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F09\u9032\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7E6A\u88FD",progressLoadError:"\u274C \u52A0\u8F09\u9032\u5EA6\u5931\u6557: {error}",progressSaveError:"\u274C \u4FDD\u5B58\u9032\u5EA6\u5931\u6557: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u7576\u524D\u9032\u5EA6\u55CE\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u9032\u5EA6",discardProgress:"\u653E\u68C4",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BEC\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7E31\u6A6B\u6BD4",apply:"\u61C9\u7528",overlayOn:"\u8986\u84CB\u5C64: \u958B\u5553",overlayOff:"\u8986\u84CB\u5C64: \u95DC\u9589",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7E6A\u88FD {painted} \u50CF\u7D20 | \u9032\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6578\u6062\u5FA9: {current}/{needed} - \u6642\u9593: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed} - \u5269\u9918: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8A66 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5617\u8A66\u51FA\u932F\uFF0C\u5C07\u5728 {delay} \u79D2\u5F8C\u91CD\u8A66...",retryFailed:"\u274C \u8D85\u904E {maxAttempts} \u6B21\u5617\u8A66\u5931\u6557\u3002\u7E7C\u7E8C\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7DB2\u7D61\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",serverError:"\u{1F525} \u670D\u52D9\u5668\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",timeoutError:"\u23F0 \u4F3A\u670D\u5668\u903E\u6642\uFF0C\u6B63\u5728\u91CD\u8A66...",protectionEnabled:"\u5DF2\u555F\u7528\u4FDD\u8B77",protectionDisabled:"\u5DF2\u505C\u7528\u4FDD\u8B77",paintPattern:"\u7E6A\u88FD\u6A21\u5F0F",patternLinearStart:"\u7DDA\u6027\uFF08\u8D77\u9EDE\uFF09",patternLinearEnd:"\u7DDA\u6027\uFF08\u7D42\u9EDE\uFF09",patternRandom:"\u96A8\u6A5F",patternCenterOut:"\u7531\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5BE6\u5FC3",stripes:"\u689D\u7D0B",checkerboard:"\u68CB\u76E4\u683C",gradient:"\u6F38\u5C64",dots:"\u9EDE\u72C0",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u99AC\u8CFD\u514B",bricks:"\u78DA\u584A",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u8B77\u7E6A\u5716...",changesDetected:"\u{1F6A8} \u5075\u6E2C\u5230 {count} \u8655\u8B8A\u66F4",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u8B8A\u66F4\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u5FA9\u5B8C\u6210\uFF1A{count} \u500B\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u5FA9\u4E0D\u6D88\u8017\u9EDE\u6578\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u555F\u7528\u4FDD\u8B77\u512A\u5148",patternApplied:"\u5DF2\u5957\u7528\u6A21\u5F0F",customPattern:"\u81EA\u8A02\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},farm:{title:"WPlace \u8FB2\u5834\u6A5F\u5668\u4EBA",start:"\u958B\u59CB",stop:"\u505C\u6B62",stopped:"\u6A5F\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u6E96",paintOnce:"\u4E00\u6B21",checkingStatus:"\u6AA2\u67E5\u72C0\u614B\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u9072 (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6578",colorMode:"\u984F\u8272\u6A21\u5F0F",random:"\u96A8\u6A5F",fixed:"\u56FA\u5B9A",range:"\u7BC4\u570D",fixedColor:"\u56FA\u5B9A\u984F\u8272",advanced:"\u9AD8\u7D1A",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u7FA9\u8ABF\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u7372",painted:"\u5DF2\u7E6A\u88FD",charges:"\u6B21\u6578",retries:"\u91CD\u8A66",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F09",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8ACB\u624B\u52D5\u7E6A\u88FD\u4E00\u500B\u50CF\u7D20\u4EE5\u6355\u7372\u5EA7\u6A19...",backendOnline:"\u5F8C\u7AEF\u5728\u7DDA",backendOffline:"\u5F8C\u7AEF\u96E2\u7DDA",startingBot:"\u6B63\u5728\u5553\u52D5\u6A5F\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u6A5F\u5668\u4EBA...",calibrating:"\u6821\u6E96\u4E2D...",alreadyRunning:"\u81EA\u52D5\u8FB2\u5834\u5DF2\u5728\u904B\u884C\u3002",imageRunningWarning:"\u81EA\u52D5\u7E6A\u5716\u6B63\u5728\u904B\u884C\uFF0C\u8ACB\u5148\u95DC\u9589\u518D\u5553\u52D5\u81EA\u52D5\u8FB2\u5834\u3002",selectPosition:"\u9078\u64C7\u5340\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u5716\u7684\u7A7A\u767D\u5340\u57DF\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u5340\u57DF\u8A2D\u7F6E\u6210\u529F\uFF01\u534A\u5F91: 500px",positionTimeout:"\u274C \u5340\u57DF\u9078\u64C7\u8D85\u6642",missingPosition:"\u274C \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF08\u4F7F\u7528\u201C\u9078\u64C7\u5340\u57DF\u201D\u6309\u9215\uFF09",farmRadius:"\u8FB2\u5834\u534A\u5F91",positionInfo:"\u7576\u524D\u5340\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F91 {radius}px \u5728 ({x},{y}) \u8FB2\u5834",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8ACB\u9078\u64C7\u7A7A\u767D\u5340\u57DF\u4EE5\u907F\u514D\u885D\u7A81",noPosition:"\u672A\u9078\u64C7\u5340\u57DF",currentZone:"\u5340\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF0C\u5728\u5730\u5716\u4E0A\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},common:{yes:"\u662F",no:"\u5426",ok:"\u78BA\u8A8D",cancel:"\u53D6\u6D88",close:"\u95DC\u9589",save:"\u4FDD\u5B58",load:"\u52A0\u8F09",delete:"\u522A\u9664",edit:"\u7DE8\u8F2F",start:"\u958B\u59CB",stop:"\u505C\u6B62",pause:"\u66AB\u505C",resume:"\u7E7C\u7E8C",reset:"\u91CD\u7F6E",settings:"\u8A2D\u7F6E",help:"\u5E6B\u52A9",about:"\u95DC\u65BC",language:"\u8A9E\u8A00",loading:"\u52A0\u8F09\u4E2D...",error:"\u932F\u8AA4",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8A9E\u8A00\u5DF2\u5207\u63DB\u70BA {language}"},guard:{title:"WPlace \u81EA\u52D5\u5B88\u8B77",initBot:"\u521D\u59CB\u5316\u5B88\u8B77\u6A5F\u5668\u4EBA",selectArea:"\u9078\u64C7\u5340\u57DF",captureArea:"\u6355\u7372\u5340\u57DF",startProtection:"\u958B\u59CB\u5B88\u8B77",stopProtection:"\u505C\u6B62\u5B88\u8B77",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u8B77\u50CF\u7D20",detectedChanges:"\u6AA2\u6E2C\u5230\u7684\u8B8A\u5316",repairedPixels:"\u4FEE\u5FA9\u7684\u50CF\u7D20",charges:"\u6B21\u6578",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u984F\u8272\uFF0C\u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",initSuccess:"\u2705 \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u5931\u6557",invalidCoords:"\u274C \u5EA7\u6A19\u7121\u6548",invalidArea:"\u274C \u5340\u57DF\u7121\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u9808\u5C0F\u65BC\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u5340\u57DF\u904E\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u7372\u5B88\u8B77\u5340\u57DF\u4E2D...",areaCaptured:"\u2705 \u5340\u57DF\u6355\u7372\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u8B77",captureError:"\u274C \u6355\u7372\u5340\u57DF\u51FA\u932F: {error}",captureFirst:"\u274C \u8ACB\u5148\u6355\u7372\u4E00\u500B\u5B88\u8B77\u5340\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u8B77\u5DF2\u5553\u52D5 - \u5340\u57DF\u76E3\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u8B77\u5DF2\u505C\u6B62",noChanges:"\u2705 \u5340\u57DF\u5B89\u5168 - \u672A\u6AA2\u6E2C\u5230\u8B8A\u5316",changesDetected:"\u{1F6A8} \u6AA2\u6E2C\u5230 {count} \u500B\u8B8A\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20",repairError:"\u274C \u4FEE\u5FA9\u51FA\u932F: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6578\u4E0D\u8DB3\uFF0C\u7121\u6CD5\u4FEE\u5FA9",checkingChanges:"\u{1F50D} \u6B63\u5728\u6AA2\u67E5\u5340\u57DF\u8B8A\u5316...",errorChecking:"\u274C \u6AA2\u67E5\u51FA\u932F: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u8B77\u4E2D - \u5340\u57DF\u53D7\u4FDD\u8B77",lastCheck:"\u4E0A\u6B21\u6AA2\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u6AA2\u67E5: {time} \u79D2\u5F8C",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u8B77\u5340\u57DF\u7684\u5DE6\u4E0A\u89D2\u5857\u4E00\u500B\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73FE\u5728\u5728\u53F3\u4E0B\u89D2\u5857\u4E00\u500B\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u7372\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u7372\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9078\u64C7\u8D85\u6642",selectionError:"\u274C \u9078\u64C7\u51FA\u932F\uFF0C\u8ACB\u91CD\u8A66",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589",analysisTitle:"\u5DEE\u7570\u5206\u6790 - JSON vs \u7576\u524D\u756B\u5E03",correctPixels:"\u6B63\u78BA\u50CF\u7D20",incorrectPixels:"\u932F\u8AA4\u50CF\u7D20",missingPixels:"\u7F3A\u5931\u50CF\u7D20",showCorrect:"\u986F\u793A\u6B63\u78BA",showIncorrect:"\u986F\u793A\u932F\u8AA4",showMissing:"\u986F\u793A\u7F3A\u5931",autoRefresh:"\u81EA\u52D5\u5237\u65B0",zoomAdjusted:"\u7E2E\u653E\u81EA\u52D5\u8ABF\u6574\u70BA",autoRefreshEnabled:"\u81EA\u52D5\u5237\u65B0\u5DF2\u555F\u7528\uFF0C\u9593\u9694",autoRefreshDisabled:"\u81EA\u52D5\u5237\u65B0\u5DF2\u7981\u7528",autoRefreshIntervalUpdated:"\u81EA\u52D5\u5237\u65B0\u9593\u9694\u5DF2\u66F4\u65B0\u70BA",visualizationUpdated:"\u8996\u89BA\u5316\u5DF2\u66F4\u65B0",configTitle:"Guard\u914D\u7F6E",protectionPatterns:"\u4FDD\u8B77\u6A21\u5F0F",preferSpecificColor:"\u512A\u5148\u7279\u5B9A\u984F\u8272",excludeSpecificColors:"\u4E0D\u4FEE\u5FA9\u7279\u5B9A\u984F\u8272",loadManagement:"\u8CA0\u8F09\u7BA1\u7406",minLoadsToWait:"\u7B49\u5F85\u7684\u6700\u5C0F\u8CA0\u8F09\u6578",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",spendAllPixelsOnStart:"\u555F\u52D5\u6642\u6D88\u8017\u6240\u6709\u50CF\u7D20",waitTimes:"\u7B49\u5F85\u6642\u9593",useRandomTimes:"\u6279\u6B21\u9593\u4F7F\u7528\u96A8\u6A5F\u6642\u9593",minTime:"\u6700\u5C0F\u6642\u9593 (\u79D2)",maxTime:"\u6700\u5927\u6642\u9593 (\u79D2)"}}});function qt(){let e=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return se[e]?e:"es"}function Ut(){return null}function Fe(){let t=Ut(),e=qt(),a="es";return t&&se[t]?a=t:e&&se[e]&&(a=e),Xt(a),a}function Xt(t){if(!se[t]){console.warn(`Idioma '${t}' no disponible. Usando '${ve}'`);return}ve=t,de=se[t],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:t,translations:de}}))}function mt(){return ve}function T(t,e={}){let a=t.split("."),c=de;for(let r of a)if(c&&typeof c=="object"&&r in c)c=c[r];else return console.warn(`Clave de traducci\xF3n no encontrada: '${t}'`),t;return typeof c!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${t}'`),t):Gt(c,e)}function Gt(t,e){return!e||Object.keys(e).length===0?t:t.replace(/\{(\w+)\}/g,(a,c)=>e[c]!==void 0?e[c]:a)}function Pe(t){return de[t]?de[t]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${t}'`),{})}var se,ve,de,Ce=j(()=>{it();nt();st();ct();ut();pt();se={es:ot,en:at,fr:rt,ru:lt,zhHans:dt,zhHant:gt},ve="es",de=se[ve];Fe()});var ht={};tt(ht,{IMAGE_DEFAULTS:()=>Q,TEXTS:()=>jt,getImageText:()=>Ht,getImageTexts:()=>Me,imageState:()=>o});function Me(){return Pe("image")}function Ht(t,e={}){let c=Me()[t]||t;return e&&Object.keys(e).length>0&&(c=c.replace(/\{(\w+)\}/g,(r,s)=>e[s]!==void 0?e[s]:r)),c}var Q,jt,o,ue=j(()=>{Ce();Q={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};jt={get es(){return console.warn("TEXTS.es est\xE1 deprecated. Usa getImageTexts() en su lugar."),Me()}},o={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:Q.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:Q.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:9999,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0,paintPattern:"linear_start"}});var Ue={};tt(Ue,{PAINT_PATTERNS:()=>Y,applyPaintPattern:()=>qe,getPatternName:()=>Ye,sortPixelsByPattern:()=>vt});function Ye(t){return{[Y.LINEAR_START]:"Lineal (Inicio)",[Y.LINEAR_END]:"Lineal (Final)",[Y.RANDOM]:"Aleatorio",[Y.CENTER_OUT]:"Centro hacia afuera",[Y.CORNERS_FIRST]:"Esquinas primero",[Y.SPIRAL]:"Espiral"}[t]||t}function vt(t,e,a,c){if(!t||t.length===0)return t;n(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${Ye(e)} (${t.length} p\xEDxeles)`);let r=[...t];switch(e){case Y.LINEAR_START:return yt(r);case Y.LINEAR_END:return ro(r);case Y.RANDOM:return so(r);case Y.CENTER_OUT:return lo(r,a,c);case Y.CORNERS_FIRST:return co(r,a,c);case Y.SPIRAL:return uo(r,a,c);default:return n(`\u26A0\uFE0F Patr\xF3n desconocido: ${e}, usando linear_start`),yt(r)}}function yt(t){return t.sort((e,a)=>{let c=e.imageY!==void 0?e.imageY:e.y,r=a.imageY!==void 0?a.imageY:a.y,s=e.imageX!==void 0?e.imageX:e.x,u=a.imageX!==void 0?a.imageX:a.x;return c!==r?c-r:s-u})}function ro(t){return t.sort((e,a)=>{let c=e.imageY!==void 0?e.imageY:e.y,r=a.imageY!==void 0?a.imageY:a.y,s=e.imageX!==void 0?e.imageX:e.x,u=a.imageX!==void 0?a.imageX:a.x;return c!==r?r-c:u-s})}function so(t){for(let e=t.length-1;e>0;e--){let a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}function lo(t,e,a){let c=e/2,r=a/2;return t.sort((s,u)=>{let i=s.imageX!==void 0?s.imageX:s.x,l=s.imageY!==void 0?s.imageY:s.y,d=u.imageX!==void 0?u.imageX:u.x,g=u.imageY!==void 0?u.imageY:u.y,m=Math.sqrt(Math.pow(i-c,2)+Math.pow(l-r,2)),h=Math.sqrt(Math.pow(d-c,2)+Math.pow(g-r,2));return m-h})}function co(t,e,a){let c=[{x:0,y:0},{x:e-1,y:0},{x:0,y:a-1},{x:e-1,y:a-1}];return t.sort((r,s)=>{let u=r.imageX!==void 0?r.imageX:r.x,i=r.imageY!==void 0?r.imageY:r.y,l=s.imageX!==void 0?s.imageX:s.x,d=s.imageY!==void 0?s.imageY:s.y,g=Math.min(...c.map(h=>Math.sqrt(Math.pow(u-h.x,2)+Math.pow(i-h.y,2)))),m=Math.min(...c.map(h=>Math.sqrt(Math.pow(l-h.x,2)+Math.pow(d-h.y,2))));return g-m})}function uo(t,e,a){let c=new Map,r=0,s=0,u=e-1,i=0,l=a-1;for(;s<=u&&i<=l;){for(let d=s;d<=u;d++)c.set(`${d},${i}`,r++);i++;for(let d=i;d<=l;d++)c.set(`${u},${d}`,r++);if(u--,i<=l){for(let d=u;d>=s;d--)c.set(`${d},${l}`,r++);l--}if(s<=u){for(let d=l;d>=i;d--)c.set(`${s},${d}`,r++);s++}}return t.sort((d,g)=>{let m=d.imageX!==void 0?d.imageX:d.x,h=d.imageY!==void 0?d.imageY:d.y,y=g.imageX!==void 0?g.imageX:g.x,x=g.imageY!==void 0?g.imageY:g.y,p=c.get(`${m},${h}`)||Number.MAX_SAFE_INTEGER,b=c.get(`${y},${x}`)||Number.MAX_SAFE_INTEGER;return p-b})}function qe(t,e,a){if(!t||t.length===0)return t;let c=(a==null?void 0:a.width)||100,r=(a==null?void 0:a.height)||100,s=vt(t,e,c,r);return n(`\u2705 Patr\xF3n aplicado: ${Ye(e)} a ${s.length} p\xEDxeles`),s}var Y,Te=j(()=>{O();Y={LINEAR_START:"linear_start",LINEAR_END:"linear_end",RANDOM:"random",CENTER_OUT:"center_out",CORNERS_FIRST:"corners_first",SPIRAL:"spiral"}});O();ue();O();O();var V=class t{static _rgbToLab(e,a,c){let r=w=>(w/=255,w<=.04045?w/12.92:Math.pow((w+.055)/1.055,2.4)),s=r(e),u=r(a),i=r(c),l=s*.4124+u*.3576+i*.1805,d=s*.2126+u*.7152+i*.0722,g=s*.0193+u*.1192+i*.9505;l/=.95047,d/=1,g/=1.08883;let m=w=>w>.008856?Math.cbrt(w):7.787*w+16/116,h=m(l),y=m(d),x=m(g),p=116*y-16,b=500*(h-y),f=200*(y-x);return[p,b,f]}static _lab(e,a,c){t._labCache||(t._labCache=new Map);let r=e<<16|a<<8|c,s=t._labCache.get(r);return s||(s=t._rgbToLab(e,a,c),t._labCache.set(r,s)),s}static findClosestPaletteColor(e,a,c,r,s={}){var m,h,y,x,p,b;if(!r||r.length===0)return null;let{useLegacyRgb:u=!1,chromaPenalty:i=0,whiteThreshold:l=240}=s;if(e>=l&&a>=l&&c>=l){let f=r.find(w=>{var C,A,I;let S=w.r||((C=w.rgb)==null?void 0:C.r)||0,E=w.g||((A=w.rgb)==null?void 0:A.g)||0,P=w.b||((I=w.rgb)==null?void 0:I.b)||0;return S>=l&&E>=l&&P>=l});if(f)return f}let d=null,g=1/0;if(u)for(let f of r){let w=f.r||((m=f.rgb)==null?void 0:m.r)||0,S=f.g||((h=f.rgb)==null?void 0:h.g)||0,E=f.b||((y=f.rgb)==null?void 0:y.b)||0,P=Math.sqrt(Math.pow(e-w,2)+Math.pow(a-S,2)+Math.pow(c-E,2));P<g&&(g=P,d=f)}else{let f=t._lab(e,a,c);for(let w of r){let S=w.r||((x=w.rgb)==null?void 0:x.r)||0,E=w.g||((p=w.rgb)==null?void 0:p.g)||0,P=w.b||((b=w.rgb)==null?void 0:b.b)||0,C=t._lab(S,E,P),A=Math.sqrt(Math.pow(f[0]-C[0],2)+Math.pow(f[1]-C[1],2)+Math.pow(f[2]-C[2],2));if(i>0){let I=Math.sqrt(f[1]*f[1]+f[2]*f[2]),L=Math.sqrt(C[1]*C[1]+C[2]*C[2]),z=Math.abs(I-L);A+=z*i}A<g&&(g=A,d=w)}}return d}static findClosestColor(e,a,c={}){return t.findClosestPaletteColor(e.r,e.g,e.b,a,c)}static clearCache(){t._labCache&&(t._labCache.clear(),n("Cach\xE9 de colores LAB limpiada"))}static getCacheStats(){return t._labCache?{size:t._labCache.size,memoryEstimate:t._labCache.size*32}:{size:0,memoryEstimate:0}}},Wo=V.findClosestColor.bind(V),Yo=V.findClosestPaletteColor.bind(V);O();function ge(){n("\u{1F3A8} Detectando colores disponibles...");let t=document.querySelectorAll('[id^="color-"]'),e=[];for(let a of t){if(a.querySelector("svg"))continue;let c=a.id.replace("color-",""),r=parseInt(c);if(r===0)continue;let s=a.style.backgroundColor;if(s){let u=s.match(/\d+/g);if(u&&u.length>=3){let i={r:parseInt(u[0]),g:parseInt(u[1]),b:parseInt(u[2])};e.push({id:r,element:a,...i}),n(`Color detectado: id=${r}, rgb(${i.r},${i.g},${i.b})`)}}}return n(`\u2705 ${e.length} colores disponibles detectados`),e}var Se=class{constructor(e){this.imageSrc=e,this.img=new window.Image,this.originalName=null,this.tileSize=1e3,this.drawMult=3,this.shreadSize=3,this.bitmap=null,this.imageWidth=0,this.imageHeight=0,this.totalPixels=0,this.requiredPixelCount=0,this.defacePixelCount=0,this.colorPalette={},this.allowedColorsSet=new Set,this.rgbToMeta=new Map,this.coords=[0,0,0,0],this.templateTiles={},this.templateTilesBuffers={},this.tilePrefixes=new Set,this.selectedColors=null,this.allSiteColors=[],this.initialAllowedColorsSet=null,this.allowedColors=[]}async load(){return new Promise((e,a)=>{this.img.onload=async()=>{try{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,n(`[BLUE MARBLE] Imagen cargada: ${this.imageWidth}\xD7${this.imageHeight}`),e()}catch(c){a(c)}},this.img.onerror=a,this.img.src=this.imageSrc})}initializeColorPalette(){n("[BLUE MARBLE] Inicializando paleta de colores...");let e=ge(),a=e.filter(r=>r.id!==void 0&&typeof r.r=="number"&&typeof r.g=="number"&&typeof r.b=="number");this.allowedColorsSet=new Set(a.map(r=>`${r.r},${r.g},${r.b}`));let c="222,250,206";return this.allowedColorsSet.add(c),this.rgbToMeta=new Map(a.map(r=>[`${r.r},${r.g},${r.b}`,{id:r.id,premium:!!r.premium,name:r.name||`Color ${r.id}`}])),this.rgbToMeta.set(c,{id:0,premium:!1,name:"Transparent"}),this.allSiteColors=a.map(r=>({r:r.r,g:r.g,b:r.b,id:r.id,name:r.name,premium:!!r.premium})),this.initialAllowedColorsSet=new Set(this.allowedColorsSet),this.allowedColors=[...this.allSiteColors],n(`[BLUE MARBLE] Paleta inicializada: ${this.allowedColorsSet.size} colores permitidos`),Array.from(e)}detectSiteColors(){let e=document.querySelectorAll('[id^="color-"]'),a=[];for(let c of e){let r=c.id.replace("color-",""),s=parseInt(r);if(c.querySelector("svg")||s===0)continue;let u=c.style.backgroundColor;if(u){let i=u.match(/\d+/g);if(i&&i.length>=3){let l=[parseInt(i[0]),parseInt(i[1]),parseInt(i[2])],d={id:s,element:c,rgb:l,name:c.title||c.getAttribute("aria-label")||`Color ${s}`,premium:c.classList.contains("premium")||c.querySelector(".premium")};a.push(d)}}}return n(`[BLUE MARBLE] ${a.length} colores detectados del sitio`),a}setCoords(e,a,c,r){this.coords=[e,a,c,r]}async analyzePixels(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");try{let a=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});a.imageSmoothingEnabled=!1,a.clearRect(0,0,this.imageWidth,this.imageHeight),a.drawImage(this.bitmap,0,0);let c=a.getImageData(0,0,this.imageWidth,this.imageHeight).data,r=0,s=0,u=new Map;for(let l=0;l<this.imageHeight;l++)for(let d=0;d<this.imageWidth;d++){let g=(l*this.imageWidth+d)*4,m=c[g],h=c[g+1],y=c[g+2];if(c[g+3]===0)continue;let p=`${m},${h},${y}`;m===222&&h===250&&y===206&&s++;let b=p,f=this.allowedColorsSet.has(p);if(!f&&this.allowedColors&&this.allowedColors.length>0){let w=V.findClosestPaletteColor(m,h,y,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});w&&(b=`${w.r},${w.g},${w.b}`,f=!0)}f&&(r++,u.set(b,(u.get(b)||0)+1))}this.requiredPixelCount=r,this.defacePixelCount=s;let i={};for(let[l,d]of u.entries())i[l]={count:d,enabled:!0};return this.colorPalette=i,n(`[BLUE MARBLE] An\xE1lisis: ${r.toLocaleString()} p\xEDxeles, ${u.size} colores`),{totalPixels:this.totalPixels,requiredPixels:r,defacePixels:s,uniqueColors:u.size,colorPalette:i}}catch{return this.requiredPixelCount=Math.max(0,this.totalPixels),this.defacePixelCount=0,{totalPixels:this.totalPixels,requiredPixels:this.totalPixels,defacePixels:0,uniqueColors:0,colorPalette:{}}}}async createTemplateTiles(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");let e={},a={},c=new OffscreenCanvas(this.tileSize,this.tileSize),r=c.getContext("2d",{willReadFrequently:!0});for(let s=this.coords[3];s<this.imageHeight+this.coords[3];){let u=Math.min(this.tileSize-s%this.tileSize,this.imageHeight-(s-this.coords[3]));for(let i=this.coords[2];i<this.imageWidth+this.coords[2];){let l=Math.min(this.tileSize-i%this.tileSize,this.imageWidth-(i-this.coords[2])),d=l*this.shreadSize,g=u*this.shreadSize;c.width=d,c.height=g,r.imageSmoothingEnabled=!1,r.clearRect(0,0,d,g),r.drawImage(this.bitmap,i-this.coords[2],s-this.coords[3],l,u,0,0,l*this.shreadSize,u*this.shreadSize);let m=r.getImageData(0,0,d,g);for(let p=0;p<g;p++)for(let b=0;b<d;b++){let f=(p*d+b)*4;if(m.data[f]===222&&m.data[f+1]===250&&m.data[f+2]===206)(b+p)%2===0?(m.data[f]=0,m.data[f+1]=0,m.data[f+2]=0):(m.data[f]=255,m.data[f+1]=255,m.data[f+2]=255),m.data[f+3]=32;else if(b%this.shreadSize!==1||p%this.shreadSize!==1)m.data[f+3]=0;else{let w=m.data[f],S=m.data[f+1],E=m.data[f+2];this.allowedColorsSet.has(`${w},${S},${E}`)||(m.data[f+3]=0)}}r.putImageData(m,0,0);let h=`${(this.coords[0]+Math.floor(i/1e3)).toString().padStart(4,"0")},${(this.coords[1]+Math.floor(s/1e3)).toString().padStart(4,"0")},${(i%1e3).toString().padStart(3,"0")},${(s%1e3).toString().padStart(3,"0")}`;e[h]=await createImageBitmap(c),this.tilePrefixes.add(h.split(",").slice(0,2).join(","));let x=await(await c.convertToBlob()).arrayBuffer();a[h]=x,i+=l}s+=u}return this.templateTiles=e,this.templateTilesBuffers=a,n(`[BLUE MARBLE] ${Object.keys(e).length} tiles creados`),{templateTiles:e,templateTilesBuffers:a}}generatePixelQueue(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");n(`[BLUE MARBLE DEBUG] allowedColorsSet size: ${this.allowedColorsSet?this.allowedColorsSet.size:"undefined"}`),n(`[BLUE MARBLE DEBUG] allowedColors length: ${this.allowedColors?this.allowedColors.length:"undefined"}`),this.allowedColorsSet&&this.allowedColorsSet.size>0&&n(`[BLUE MARBLE DEBUG] Primeros colores permitidos: ${Array.from(this.allowedColorsSet).slice(0,5).join(", ")}`);let e=[],a=this.coords[0]*1e3+(this.coords[2]||0),c=this.coords[1]*1e3+(this.coords[3]||0),s=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});s.imageSmoothingEnabled=!1,s.drawImage(this.bitmap,0,0);let u=s.getImageData(0,0,this.imageWidth,this.imageHeight).data,i=0,l=0,d=0,g=0,m=0,h=0;for(let y=0;y<this.imageHeight;y++)for(let x=0;x<this.imageWidth;x++){i++;let p=(y*this.imageWidth+x)*4,b=u[p],f=u[p+1],w=u[p+2],S=u[p+3];if(S===0){l++;continue}if(b===222&&f===250&&w===206){d++;continue}let E=`${b},${f},${w}`,P=E,C=b,A=f,I=w,L=this.allowedColorsSet.has(E);if(L)g++;else if(this.allowedColors&&this.allowedColors.length>0){let _=V.findClosestPaletteColor(b,f,w,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});_&&(C=_.r,A=_.g,I=_.b,P=`${C},${A},${I}`,L=!0,m++)}if(!L){h++;continue}let z=a+x,B=c+y,q=Math.floor(z/1e3),F=Math.floor(B/1e3),G=z%1e3,$=B%1e3,Z=this.rgbToMeta.get(P)||{id:0,name:"Unknown"};e.push({imageX:x,imageY:y,globalX:z,globalY:B,tileX:q,tileY:F,localX:G,localY:$,color:{r:C,g:A,b:I,id:Z.id,name:Z.name},originalColor:{r:C,g:A,b:I,alpha:S}})}return n("[BLUE MARBLE DEBUG] Estad\xEDsticas de procesamiento:"),n(`[BLUE MARBLE DEBUG] - Total p\xEDxeles procesados: ${i}`),n(`[BLUE MARBLE DEBUG] - P\xEDxeles transparentes: ${l}`),n(`[BLUE MARBLE DEBUG] - P\xEDxeles #deface: ${d}`),n(`[BLUE MARBLE DEBUG] - Coincidencias exactas: ${g}`),n(`[BLUE MARBLE DEBUG] - Coincidencias LAB: ${m}`),n(`[BLUE MARBLE DEBUG] - P\xEDxeles inv\xE1lidos: ${h}`),n(`[BLUE MARBLE DEBUG] - Cola final: ${e.length} p\xEDxeles`),n(`[BLUE MARBLE] Cola: ${e.length} p\xEDxeles`),e}async resize(e,a,c=!0){if(!this.img)throw new Error("Imagen no cargada. Llama a load() primero.");let r=this.img.width,s=this.img.height;if(c){let d=r/s;e/a>d?e=a*d:a=e/d}let u=document.createElement("canvas");u.width=e,u.height=a;let i=u.getContext("2d");i.imageSmoothingEnabled=!1,i.drawImage(this.img,0,0,e,a);let l=u.toDataURL();return this.img.src=l,this.imageSrc=l,await new Promise(d=>{this.img.onload=async()=>{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,d()}}),n(`[BLUE MARBLE] Imagen redimensionada: ${r}\xD7${s} \u2192 ${this.imageWidth}\xD7${this.imageHeight}`),{width:this.imageWidth,height:this.imageHeight}}getImageData(){return{width:this.imageWidth,height:this.imageHeight,totalPixels:this.totalPixels,requiredPixels:this.requiredPixelCount,defacePixels:this.defacePixelCount,colorPalette:this.colorPalette,coords:[...this.coords],originalName:this.originalName||"image.png",pixels:this.generatePixelQueue()}}generatePreview(e=200,a=200){if(!this.img)return null;let c=document.createElement("canvas"),r=c.getContext("2d"),{width:s,height:u}=this.img,i=s/u,l,d;return e/a>i?(d=a,l=a*i):(l=e,d=e/i),c.width=l,c.height=d,r.imageSmoothingEnabled=!1,r.drawImage(this.img,0,0,l,d),c.toDataURL()}getDimensions(){return{width:this.imageWidth,height:this.imageHeight}}setSelectedColors(e){this.selectedColors=e,e&&e.length>0?(this.allowedColorsSet=new Set(e.map(a=>a.id)),this.colorPalette={},e.forEach(a=>{this.colorPalette[a.id]=a.rgb}),n(`\u{1F3A8} [BLUE MARBLE] Paleta actualizada con ${e.length} colores seleccionados`),this.imageDataCache=null):n("\u{1F3A8} [BLUE MARBLE] Usando todos los colores disponibles")}};O();var oe=t=>new Promise(e=>setTimeout(e,t));O();var ie=null,Ne=0,De=!1,pe=null,ft=new Promise(t=>{pe=t}),Vt=24e4,M=null,J=null,Ee=null,Ae=null,N=null;function Le(t){pe&&(pe(t),pe=null),ie=t,Ne=Date.now()+Vt,n("\u2705 Turnstile token set successfully")}function me(){return ie&&Date.now()<Ne}function xt(){ie=null,Ne=0,n("\u{1F5D1}\uFE0F Token invalidated, will force fresh generation")}async function he(t=!1){if(me()&&!t)return ie;if(t&&xt(),De)return n("\u{1F504} Token generation already in progress, waiting..."),await W(2e3),me()?ie:null;De=!0;try{n("\u{1F504} Token expired or missing, generating new one...");let e=await Jt();if(e&&e.length>20)return Le(e),n("\u2705 Token captured and cached successfully"),e;n("\u26A0\uFE0F Invisible Turnstile failed, forcing browser automation...");let a=await no();return a&&a.length>20?(Le(a),n("\u2705 Fallback token captured successfully"),a):(n("\u274C All token generation methods failed"),null)}finally{De=!1}}async function Jt(){let t=Date.now();try{let e=ao();n("\u{1F511} Generating Turnstile token for sitekey:",e),typeof window!="undefined"&&window.navigator&&n("\u{1F9ED} UA:",window.navigator.userAgent,"Platform:",window.navigator.platform);let a=await Zt(e);if(a&&a.length>20){let c=Math.round(Date.now()-t);return n(`\u2705 Turnstile token generated successfully in ${c}ms`),a}else throw new Error("Invalid or empty token received")}catch(e){let a=Math.round(Date.now()-t);throw n(`\u274C Turnstile token generation failed after ${a}ms:`,e),e}}async function Zt(t){return eo(t,"paint")}async function Kt(){return window.turnstile?Promise.resolve():new Promise((t,e)=>{if(document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')){let c=()=>{window.turnstile?t():setTimeout(c,100)};return c()}let a=document.createElement("script");a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",a.async=!0,a.defer=!0,a.onload=()=>{n("\u2705 Turnstile script loaded successfully"),t()},a.onerror=()=>{n("\u274C Failed to load Turnstile script"),e(new Error("Failed to load Turnstile"))},document.head.appendChild(a)})}function Qt(){return(!J||!document.body.contains(J))&&(J&&J.remove(),J=document.createElement("div"),J.style.cssText=`
      position: fixed !important;
      left: -9999px !important; /* keep off-screen for invisible mode */
      top: -9999px !important;
      width: 300px !important;
      height: 65px !important;
      pointer-events: none !important;
      opacity: 0 !important; /* do not use visibility:hidden to avoid engine quirks */
      z-index: -1 !important;
    `,J.setAttribute("aria-hidden","true"),J.id="turnstile-widget-container",document.body.appendChild(J)),J}function bt(){if(Ee&&document.body.contains(Ee))return Ee;let t=document.createElement("div");t.id="turnstile-overlay-container",t.style.cssText=`
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
  `;let e=document.createElement("div");e.textContent="Cloudflare Turnstile \u2014 please complete the check if shown",e.style.cssText='font: 600 12px/1.3 "Segoe UI",sans-serif; margin-bottom: 8px; opacity: 0.9;';let a=document.createElement("div");a.id="turnstile-overlay-host",a.style.cssText="width: 100%; min-height: 70px;";let c=document.createElement("button");return c.textContent="Hide",c.style.cssText="position:absolute; top:6px; right:6px; font-size:11px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:2px 6px; cursor:pointer;",c.addEventListener("click",()=>t.remove()),t.appendChild(e),t.appendChild(a),t.appendChild(c),document.body.appendChild(t),Ee=t,t}async function eo(t,e="paint"){var s,u;if(await Kt(),M&&Ae===t&&((s=window.turnstile)!=null&&s.execute))try{n("\u{1F504} Reusing existing Turnstile widget...");let i=await Promise.race([window.turnstile.execute(M,{action:e}),new Promise((l,d)=>setTimeout(()=>d(new Error("Execute timeout")),15e3))]);if(i&&i.length>20)return n("\u2705 Token generated via widget reuse"),i}catch(i){n("\u{1F504} Widget reuse failed, will create a fresh widget:",i.message)}let a=await to(t,e);if(a&&a.length>20)return a;n("\u{1F440} Falling back to interactive Turnstile (visible).");let c=3,r=[1e4,15e3,3e4];for(let i=1;i<=c;i++){let l=r[i-1];n(`\u{1F504} Intento ${i}/${c} de resoluci\xF3n autom\xE1tica del CAPTCHA (timeout: ${l/1e3}s)...`),i===2?n(`\u2139\uFE0F Primer intento fall\xF3. Reintentando autom\xE1ticamente (2/${c})...`):i===3&&n(`\u2139\uFE0F Segundo intento fall\xF3. \xDAltimo reintento autom\xE1tico (3/${c})...`);try{if(M&&((u=window.turnstile)!=null&&u.remove))try{window.turnstile.remove(M),M=null}catch{}let d=await io(t,e,i<c,l);if(d&&d.length>20)return n(`\u2705 CAPTCHA resuelto exitosamente en el intento ${i}`),d;i<c&&(n(`\u26A0\uFE0F Intento ${i} fall\xF3, reintentando en 2 segundos...`),await W(2e3))}catch(d){n(`\u274C Error en intento ${i}:`,d.message),i<c&&await W(2e3)}}return n("\u{1F6A8} Todos los intentos autom\xE1ticos fallaron, mostrando ventana manual..."),await oo(t,e)}async function to(t,e){return new Promise(a=>{var c;try{if(M&&((c=window.turnstile)!=null&&c.remove))try{window.turnstile.remove(M)}catch{}let r=Qt();r.innerHTML="";let s=window.turnstile.render(r,{sitekey:t,action:e,size:"invisible",retry:"auto","retry-interval":8e3,callback:u=>{n("\u2705 Invisible Turnstile callback"),a(u)},"error-callback":()=>a(null),"timeout-callback":()=>a(null)});if(M=s,Ae=t,!s)return a(null);Promise.race([window.turnstile.execute(s,{action:e}),new Promise((u,i)=>setTimeout(()=>i(new Error("Invisible execute timeout")),12e3))]).then(a).catch(()=>a(null))}catch(r){n("Invisible Turnstile failed:",r),a(null)}})}async function oo(t,e){return new Promise((a,c)=>{var r;try{if(M&&((r=window.turnstile)!=null&&r.remove))try{window.turnstile.remove(M)}catch{}let s=bt(),u=s.querySelector("#turnstile-overlay-host");u.innerHTML="";let i=setTimeout(()=>{n("\u23F0 Interactive Turnstile timed out"),a(null)},12e4),l=window.turnstile.render(u,{sitekey:t,action:e,size:"normal",retry:"auto","retry-interval":8e3,callback:d=>{clearTimeout(i);try{s.remove()}catch{}n("\u2705 Interactive Turnstile solved"),a(d)},"error-callback":d=>{n("\u{1F6A8} Interactive Turnstile error:",d)},"timeout-callback":()=>{n("\u23F0 Turnstile timeout callback (interactive)")},"expired-callback":()=>{n("\u26A0\uFE0F Interactive Turnstile token expired")}});if(M=l,Ae=t,!l){clearTimeout(i),a(null);return}}catch(s){n("\u274C Error creating interactive Turnstile widget:",s),c(s)}})}async function io(t,e,a=!0,c=3e4){return new Promise((r,s)=>{var u;try{if(M&&((u=window.turnstile)!=null&&u.remove))try{window.turnstile.remove(M)}catch{}let i=bt(),l=i.querySelector("#turnstile-overlay-host");l.innerHTML="";let g=setTimeout(()=>{n(`\u23F0 Interactive Turnstile timed out (${a?"auto-retry":"manual"})`);try{i.remove()}catch{}r(null)},a?c:12e4),m=window.turnstile.render(l,{sitekey:t,action:e,size:"normal",retry:"auto","retry-interval":a?3e3:8e3,callback:h=>{clearTimeout(g);try{i.remove()}catch{}n(`\u2705 Interactive Turnstile solved (${a?"auto-retry":"manual"})`),r(h)},"error-callback":h=>{if(n(`\u{1F6A8} Interactive Turnstile error (${a?"auto-retry":"manual"}):`,h),a){clearTimeout(g);try{i.remove()}catch{}r(null)}},"timeout-callback":()=>{if(n(`\u23F0 Turnstile timeout callback (${a?"auto-retry":"manual"})`),a){clearTimeout(g);try{i.remove()}catch{}r(null)}},"expired-callback":()=>{if(n(`\u26A0\uFE0F Interactive Turnstile token expired (${a?"auto-retry":"manual"})`),a){clearTimeout(g);try{i.remove()}catch{}r(null)}}});if(M=m,Ae=t,!m){clearTimeout(g);try{i.remove()}catch{}r(null);return}}catch(i){n(`\u274C Error creating interactive Turnstile widget (${a?"auto-retry":"manual"}):`,i),s(i)}})}function ao(t="0x4AAAAAABpqJe8FO0N84q0F"){var e;if(N)return N;try{let a=document.querySelector("[data-sitekey]");if(a){let s=a.getAttribute("data-sitekey");if(s&&s.length>10)return N=s,n("\u{1F50D} Sitekey detected from data attribute:",s),s}let c=document.querySelector(".cf-turnstile");if((e=c==null?void 0:c.dataset)!=null&&e.sitekey&&c.dataset.sitekey.length>10)return N=c.dataset.sitekey,n("\u{1F50D} Sitekey detected from turnstile element:",N),N;if(typeof window!="undefined"&&window.__TURNSTILE_SITEKEY&&window.__TURNSTILE_SITEKEY.length>10)return N=window.__TURNSTILE_SITEKEY,n("\u{1F50D} Sitekey detected from global variable:",N),N;let r=document.querySelectorAll("script");for(let s of r){let i=(s.textContent||s.innerHTML).match(/sitekey['":\s]+(['"0-9a-zA-Z_-]{20,})/i);if(i&&i[1]&&i[1].length>10)return N=i[1].replace(/['"]/g,""),n("\u{1F50D} Sitekey detected from script content:",N),N}}catch(a){n("Error detecting sitekey:",a)}return n("\u{1F50D} Using fallback sitekey:",t),N=t,t}function W(t){return new Promise(e=>setTimeout(e,t))}function ee(t,e=200,a=1e4){return new Promise(c=>{let r=Date.now()+a,s=()=>{let u=document.querySelector(t);u?c(u):Date.now()<r?setTimeout(s,e):c(null)};s()})}async function no(){return new Promise((t,e)=>{(async()=>{try{n("\u{1F3AF} Starting automatic CAPTCHA solving process..."),xt(),ft=new Promise(s=>{pe=s});let c=W(3e4).then(()=>e(new Error("Auto-CAPTCHA timed out after 30 seconds."))),r=(async()=>{let s=await ee("button.btn.btn-primary.btn-lg",200,3e3);if(s||(s=await ee("button.btn-primary.sm\\:btn-xl",200,3e3)),s||(s=await ee("button.btn-primary",200,3e3)),!s){n("\u{1F3AF} No paint button found, clicking on canvas directly to trigger CAPTCHA...");let x=await ee("canvas",200,5e3);x&&(x.click(),await W(1e3),s=await ee("button.btn.btn-primary.btn-lg, button.btn-primary.sm\\:btn-xl, button.btn-primary",200,5e3))}if(!s)throw new Error("Could not find any paint button after attempts.");n("\u{1F3AF} Found paint button, clicking..."),s.click(),await W(500),n("\u{1F3AF} Selecting transparent color...");let u=await ee("button#color-0",200,5e3);if(u)u.click();else{n("\u26A0\uFE0F Could not find transparent color button, trying alternative selectors...");let x=document.querySelectorAll('button[id^="color-"]');x.length>0&&(x[0].click(),n("\u{1F3AF} Clicked first available color button"))}await W(500),n("\u{1F3AF} Finding canvas element...");let i=await ee("canvas",200,5e3);if(!i)throw new Error("Could not find the canvas element.");i.setAttribute("tabindex","0"),i.focus();let l=i.getBoundingClientRect(),d=Math.round(l.left+l.width/2),g=Math.round(l.top+l.height/2);n("\u{1F3AF} Simulating canvas interaction..."),typeof window!="undefined"&&window.MouseEvent&&window.KeyboardEvent&&(i.dispatchEvent(new window.MouseEvent("mousemove",{clientX:d,clientY:g,bubbles:!0})),i.dispatchEvent(new window.MouseEvent("mousedown",{clientX:d,clientY:g,bubbles:!0})),await W(50),i.dispatchEvent(new window.MouseEvent("mouseup",{clientX:d,clientY:g,bubbles:!0})),i.dispatchEvent(new window.KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),await W(50),i.dispatchEvent(new window.KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0}))),await W(1e3),n("\u{1F3AF} Waiting for CAPTCHA challenge..."),await W(2e3),n("\u{1F3AF} Starting confirmation loop...");let m=Date.now();(async()=>{let x=0;for(;!me()&&Date.now()-m<25e3;){x++;let p=await ee("button.btn.btn-primary.btn-lg",100,1e3);if(p||(p=await ee("button.btn.btn-primary.sm\\:btn-xl",100,1e3)),!p){let b=Array.from(document.querySelectorAll("button.btn-primary"));p=b.length?b[b.length-1]:null}p&&!p.disabled?(n(`\u{1F3AF} Clicking confirmation button (attempt ${x})...`),p.click()):n(`\u{1F3AF} No active confirm button found (attempt ${x})`),await W(800)}})();let y=await ft;await W(500),n("\u2705 Token successfully captured through browser automation"),t(y)})();await Promise.race([r,c])}catch(c){n("\u274C Auto-CAPTCHA process failed:",c),e(c)}})()})}window.__WPA_SET_TURNSTILE_TOKEN__=function(t){t&&typeof t=="string"&&t.length>20&&(n("\u2705 Turnstile Token Captured:",t),Le(t))};(function(){if(window.__WPA_FETCH_HOOKED__)return;window.__WPA_FETCH_HOOKED__=!0;let t=window.fetch;window.fetch=async function(...e){let a=await t.apply(this,e),c=e[0]instanceof Request?e[0].url:e[0];if(typeof c=="string"&&c.includes("https://backend.wplace.live/s0/pixel/"))try{let r=JSON.parse(e[1].body);if(r.t){let s=r.t;(!me()||ie!==s)&&(n("\u2705 Turnstile Token Captured:",s),window.postMessage({source:"turnstile-capture",token:s},"*"))}}catch{}return a},window.addEventListener("message",e=>{let{source:a,token:c}=e.data;a==="turnstile-capture"&&c&&(!me()||ie!==c)&&Le(c)})})();O();var We="https://backend.wplace.live";async function le(){var t,e,a;try{let c=await fetch(`${We}/me`,{credentials:"include"}).then(i=>i.json()),r=c||null,s=(c==null?void 0:c.charges)||{},u={count:(t=s.count)!=null?t:0,max:(e=s.max)!=null?e:0,cooldownMs:(a=s.cooldownMs)!=null?a:3e4};return{success:!0,data:{user:r,charges:u.count,maxCharges:u.max,chargeRegen:u.cooldownMs}}}catch(c){return{success:!1,error:c.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function wt(t,e,a,c,r){try{let s=JSON.stringify({colors:c,coords:a,t:r});n(`[API] Sending batch to tile ${t},${e} with ${c.length} pixels, token: ${r?r.substring(0,50)+"...":"null"}`);let u=await fetch(`${We}/s0/pixel/${t}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:s});if(n(`[API] Response: ${u.status} ${u.statusText}`),u.status===403){try{await u.json()}catch{}console.error("\u274C 403 Forbidden. Turnstile token might be invalid or expired.");try{console.log("\u{1F504} Regenerating Turnstile token after 403...");let d=await he(!0);if(!d)return{status:403,json:{error:"Could not generate new token"},success:!1,painted:0};let g=JSON.stringify({colors:c,coords:a,t:d});n(`[API] Retrying with fresh token: ${d.substring(0,50)}...`);let m=await fetch(`${We}/s0/pixel/${t}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:g});if(n(`[API] Retry response: ${m.status} ${m.statusText}`),m.status===403)return{status:403,json:{error:"Fresh token still expired or invalid after retry"},success:!1,painted:0};let h=null;try{let x=await m.text();x.trim()?h=JSON.parse(x):h={}}catch(x){n(`[API] Warning: Could not parse retry response JSON: ${x.message}`),h={}}let y=(h==null?void 0:h.painted)||0;return n(`[API] Retry result: ${y} pixels painted`),{status:m.status,json:h,success:m.ok,painted:y}}catch(d){return console.error("\u274C Token regeneration failed:",d),{status:403,json:{error:"Token regeneration failed: "+d.message},success:!1,painted:0}}}let i=null;try{let d=await u.text();d.trim()?i=JSON.parse(d):i={}}catch(d){n(`[API] Warning: Could not parse response JSON: ${d.message}`),i={}}let l=(i==null?void 0:i.painted)||0;return n(`[API] Success: ${l} pixels painted`),{status:u.status,json:i,success:u.ok,painted:l}}catch(s){return n(`[API] Network error: ${s.message}`),{status:0,json:{error:s.message},success:!1,painted:0}}}ue();Ce();Te();var ae=null,fe=!1,xe=null,be=null,ce=null;var Pt=3e4;function go(){ae&&document.removeEventListener("visibilitychange",ae),ae=()=>{document.hidden?(n("\u{1F4F1} Pesta\xF1a oculta - pausando timers"),o.inCooldown&&(fe=!0)):(n("\u{1F4F1} Pesta\xF1a visible - reanudando timers"),fe&&o.inCooldown&&(po(),fe=!1))},document.addEventListener("visibilitychange",ae)}function po(){if(!xe||!be)return;let t=Date.now(),e=t-xe,a=Math.max(0,be-e);o.nextBatchCooldown=Math.ceil(a/1e3),o.cooldownEndTime=t+a,n(`\u{1F504} Recalculando cooldown: ${Math.ceil(a/1e3)}s restantes`)}var Ie=0,Ct=12e4;async function mo(){ce&&window.clearInterval(ce),go(),ce=window.setInterval(async()=>{try{if(document.hidden)return;if(o.remainingPixels.length>0&&!o.running){let t=await le();if(t.success&&t.data.charges>0){let e=Math.floor(t.data.charges),a=Date.now();a-Ie>Ct&&(n(`\u{1F504} Monitoreo: ${e} cargas disponibles`),Ie=a),o.currentCharges=t.data.charges,o.maxCharges=t.data.maxCharges,e>=o.pixelsPerBatch&&window.imageBot&&typeof window.imageBot.onStartPainting=="function"&&(n(`\u{1F680} Reanudando pintado autom\xE1ticamente con ${e} cargas`),window.imageBot.onStartPainting())}}}catch(t){let e=Date.now();e-Ie>Ct&&(n(`\u26A0\uFE0F Error en monitoreo de cargas: ${t.message}`),Ie=e)}},Pt),n(`\u2705 Monitoreo de cargas iniciado (cada ${Pt/1e3}s)`)}function Ge(){ce&&(window.clearInterval(ce),ce=null,n("\u23F9\uFE0F Monitoreo de cargas detenido")),ae&&(document.removeEventListener("visibilitychange",ae),ae=null),xe=null,be=null,fe=!1}var Xe=0,ho=3e4;async function Et(t,e){if(o.stopFlag)return n("\u{1F6D1} Bot detenido, cancelando verificaci\xF3n de cargas"),!1;let a=await le();if(a.success){let c=Math.floor(a.data.charges);if(o.currentCharges=a.data.charges,o.maxCharges=a.data.maxCharges,c<t){if(o.stopFlag)return n("\u{1F6D1} Bot detenido durante verificaci\xF3n de cargas"),!1;let r=Date.now();return r-Xe>ho&&(n(`\u23F3 Cargas insuficientes: ${c}/${t}. Esperando regeneraci\xF3n...`),Xe=r),await wo(t-c,e),o.stopFlag?(n("\u{1F6D1} Bot detenido durante cooldown, cancelando recursi\xF3n"),!1):await Et(t,e)}return Xe=0,!0}return n(`\u26A0\uFE0F No se pudo verificar cargas, continuando con valor cached: ${o.currentCharges}`),o.currentCharges>=t}async function Lt(t,e,a,c,r){let{width:s,height:u}=t,{x:i,y:l}=e;n(`Iniciando pintado: imagen(${s}x${u}) inicio LOCAL(${i},${l}) tile(${o.tileX},${o.tileY})`),n(`\u{1F3A8} Patr\xF3n: ${o.paintPattern}`),mo();try{n("\u{1F511} Generando token Turnstile al inicio del proceso..."),await he()?n("\u2705 Token inicial generado exitosamente"):n("\u26A0\uFE0F No se pudo generar token inicial, continuando con flujo normal")}catch(d){n("\u26A0\uFE0F Error generando token inicial:",d.message)}if(!o.remainingPixels||o.remainingPixels.length===0||o.lastPosition.x===0&&o.lastPosition.y===0){n("Generando cola de p\xEDxeles..."),o.remainingPixels=yo(t,e,o.tileX,o.tileY),o.paintPattern&&o.paintPattern!=="linear_start"&&(n(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${o.paintPattern}`),o.remainingPixels=qe(o.remainingPixels,o.paintPattern,t)),(o.lastPosition.x>0||o.lastPosition.y>0)&&(o.remainingPixels=o.remainingPixels.filter(d=>{let g=d.imageY*s+d.imageX,m=o.lastPosition.y*s+o.lastPosition.x;return g>=m})),n(`Cola generada: ${o.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),o.startPosition&&o.tileX!==void 0&&o.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}))}catch(d){n("\u26A0\uFE0F Error actualizando plan overlay:",d)}}try{for(;o.remainingPixels.length>0&&!o.stopFlag;){let d=Math.floor(o.currentCharges),g;if(n(`\u{1F50D} Estado del primer lote - isFirstBatch: ${o.isFirstBatch}, useAllChargesFirst: ${o.useAllChargesFirst}, availableCharges: ${d}`),o.isFirstBatch&&o.useAllChargesFirst&&d>0?(g=Math.min(d,o.remainingPixels.length),o.isFirstBatch=!1,n(`\u{1F680} Primera pasada: usando ${g} cargas de ${d} disponibles`)):(g=Math.min(o.pixelsPerBatch,o.remainingPixels.length),n(`\u2699\uFE0F Pasada normal: usando ${g} p\xEDxeles (configurado: ${o.pixelsPerBatch})`)),!await Et(g,a)){n("\u26A0\uFE0F No se pudieron obtener suficientes cargas, pausando pintado");break}d=Math.floor(o.currentCharges);let h=o.remainingPixels.splice(0,g),y=h,x=0;n(`Verificando lote de ${h.length} p\xEDxeles...`),n(`Pintando lote de ${y.length} p\xEDxeles...`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch})}catch(b){n("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",b)}let p=await bo(y,a);if(p.success&&p.painted>0){if(o.paintedPixels+=p.painted+x,o.currentCharges=Math.max(0,o.currentCharges-p.painted),n(`Cargas despu\xE9s del lote: ${o.currentCharges.toFixed(1)} (consumidas: ${p.painted})`),o.currentCharges=Math.max(0,o.currentCharges-p.painted),n(`Cargas despu\xE9s del lote: ${o.currentCharges.toFixed(1)} (consumidas: ${p.painted})`),y.length>0){let S=y[y.length-1];o.lastPosition={x:S.imageX,y:S.imageY}}n(`Lote exitoso: ${p.painted}/${y.length} p\xEDxeles pintados. Total: ${o.paintedPixels}/${o.totalPixels}`);let b=vo(),f=(o.paintedPixels/o.totalPixels*100).toFixed(1),w=T("image.passCompleted",{painted:p.painted,percent:f,current:o.paintedPixels,total:o.totalPixels});a&&a(o.paintedPixels,o.totalPixels,w,b),await oe(2e3)}else p.shouldContinue?n("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(o.remainingPixels.unshift(...y),n("Lote fall\xF3: reintentando en 5 segundos..."),await oe(5e3));await oe(500)}if(o.stopFlag)n(`Pintado pausado en p\xEDxel imagen(${o.lastPosition.x},${o.lastPosition.y})`),c&&c(!1,o.paintedPixels);else{n(`Pintado completado: ${o.paintedPixels} p\xEDxeles pintados`),o.lastPosition={x:0,y:0},o.remainingPixels=[],Ge();try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),n("\u2705 Plan overlay limpiado al completar pintado"))}catch(d){n("\u26A0\uFE0F Error limpiando plan overlay:",d)}c&&c(!0,o.paintedPixels)}}catch(d){n("Error en proceso de pintado:",d),Ge(),r&&r(d)}}async function fo(t){var e;try{if(!t||t.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let a=new Map;for(let s of t){let u=`${s.tileX},${s.tileY}`;a.has(u)||a.set(u,{coords:[],colors:[],tx:s.tileX,ty:s.tileY});let i=a.get(u);i.coords.push(s.localX,s.localY),i.colors.push(s.color.id||s.color.value||1)}let c=await he(),r=0;for(let{coords:s,colors:u,tx:i,ty:l}of a.values()){if(u.length===0)continue;let d=[];for(let h=0;h<s.length;h+=2){let y=(Number(s[h])%1e3+1e3)%1e3,x=(Number(s[h+1])%1e3+1e3)%1e3;Number.isFinite(y)&&Number.isFinite(x)&&d.push(y,x)}try{let h=999,y=0,x=999,p=0;for(let b=0;b<d.length;b+=2){let f=d[b],w=d[b+1];f<h&&(h=f),f>y&&(y=f),w<x&&(x=w),w>p&&(p=w)}n(`[IMG] Enviando tile ${i},${l}: ${u.length} px | x:[${h},${y}] y:[${x},${p}]`)}catch{}let g=await wt(i,l,d,u,c);if(g.status!==200)return{success:!1,painted:r,error:((e=g.json)==null?void 0:e.message)||`HTTP ${g.status}`,status:g.status};let m=g.painted||0;if(m===0&&u.length>0)return n(`\u26A0\uFE0F API devolvi\xF3 200 OK pero painted=0 para ${u.length} p\xEDxeles en tile ${i},${l}`),{success:!1,painted:r,error:`API devolvi\xF3 painted=0 para ${u.length} p\xEDxeles`,status:200,shouldRetry:!0};r+=m,n(`\u2705 Tile ${i},${l}: ${m}/${u.length} p\xEDxeles pintados exitosamente`)}return{success:!0,painted:r}}catch(a){return n("Error en paintPixelBatch:",a),{success:!1,painted:0,error:a.message}}}var St=0,ke=0,xo=6e4;async function bo(t,e){for(let s=1;s<=5;s++)try{let u=await fo(t);if(u.success)return o.retryCount=0,ke=0,u;if(o.retryCount=s,s<5){let i=3e3*Math.pow(2,s-1),l=Math.round(i/1e3),d;if(u.status===0||u.status==="NetworkError"){ke++;let m=Date.now();(m-St>xo||ke===1)&&(n(`\u{1F310} Error de red (${ke} consecutivos). Reintento ${s}/5 en ${l}s`),St=m),d=T("image.networkError")}else u.status>=500?(d=T("image.serverError"),n(`\u{1F527} Error del servidor ${u.status}. Reintento ${s}/5 en ${l}s`)):u.status===408?(d=T("image.timeoutError"),n(`\u23F1\uFE0F Timeout. Reintento ${s}/5 en ${l}s`)):(d=T("image.retryAttempt",{attempt:s,maxAttempts:5,delay:l}),n(`\u{1F504} Reintento ${s}/5 despu\xE9s de ${l}s. Error: ${u.error}`));e&&e(o.paintedPixels,o.totalPixels,d),await oe(i)}}catch(u){if(o.retryCount=s,s<5){let i=3e3*Math.pow(2,s-1),l=Math.round(i/1e3);(s===1||s%3===0)&&n(`\u274C Excepci\xF3n en intento ${s}:`,u.message);let d=T("image.retryError",{attempt:s,maxAttempts:5,delay:l});e&&e(o.paintedPixels,o.totalPixels,d),await oe(i)}}o.retryCount=5;let r=T("image.retryFailed",{maxAttempts:5});return e&&e(o.paintedPixels,o.totalPixels,r),n("\u{1F4A5} Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function wo(t,e){let c=Q.CHARGE_REGEN_MS*t+5e3;if(o.stopFlag){n("\u{1F6D1} Bot detenido, cancelando cooldown");return}n(`Esperando ${Math.round(c/1e3)}s para obtener ${t} cargas`);let r=Date.now();if(xe=r,be=c,o.inCooldown=!0,o.cooldownEndTime=r+c,o.nextBatchCooldown=Math.round(c/1e3),e){let s=Math.floor(c/6e4),u=Math.floor(c%6e4/1e3),i=s>0?`${s}m ${u}s`:`${u}s`,l=T("image.waitingChargesRegen",{current:Math.floor(o.currentCharges),needed:t,time:i});e(o.paintedPixels,o.totalPixels,l)}for(;;){let u=Date.now()-r,i=Math.max(0,c-u);if(o.stopFlag){n(`\u{1F6D1} Bot detenido durante cooldown con ${Math.ceil(i/1e3)}s restantes`);break}if(i<=0)break;let l=Math.ceil(i/1e3);o.nextBatchCooldown=l;let d=l%30===0||l<=30&&l%10===0||l<=5||u<2e3;if(e&&d){let g=Math.floor(l/60),m=l%60,h=g>0?`${g}m ${m}s`:`${m}s`,y=T("image.waitingChargesCountdown",{current:Math.floor(o.currentCharges),needed:t,time:h});e(o.paintedPixels,o.totalPixels,y)}await oe(Math.min(1e3,i))}o.inCooldown=!1,o.nextBatchCooldown=0,xe=null,be=null,fe=!1,o.stopFlag||(o.currentCharges=Math.min(o.maxCharges||9999,o.currentCharges+c/Q.CHARGE_REGEN_MS))}function yo(t,e,a,c){let{x:r,y:s}=e,u=[],i;if(t&&t.processor&&typeof t.processor.generatePixelQueue=="function")i=t.processor.generatePixelQueue();else if(t&&typeof t.generatePixelQueue=="function")i=t.generatePixelQueue();else if(t&&Array.isArray(t.pixels))i=t.pixels;else if(t&&typeof t.pixels=="function")i=t.pixels();else if(t&&t.pixels)i=t.pixels;else return n(`\u274C Error: No se pueden obtener p\xEDxeles de imageData. Tipo: ${typeof t}`,t),[];if(!Array.isArray(i))return n(`\u274C Error: pixels no es un array iterable. Tipo: ${typeof i}`,i),[];for(let l of i){if(!l)continue;let d=l.imageX!==void 0?l.imageX:l.x,g=l.imageY!==void 0?l.imageY:l.y,m=l.color!==void 0?l.color:l.targetColor;if(d===void 0||g===void 0){n("\u26A0\uFE0F P\xEDxel con coordenadas inv\xE1lidas:",l);continue}let h=r+d,y=s+g,x=Math.floor(h/1e3),p=Math.floor(y/1e3),b=a+x,f=c+p,w=(h%1e3+1e3)%1e3,S=(y%1e3+1e3)%1e3;u.push({imageX:d,imageY:g,localX:w,localY:S,tileX:b,tileY:f,color:m,originalColor:l.originalColor})}return n(`Cola de p\xEDxeles generada: ${u.length} p\xEDxeles para pintar`),u}function vo(){if(!o.remainingPixels||o.remainingPixels.length===0)return 0;let t=o.remainingPixels.length,e=o.pixelsPerBatch,a=Q.CHARGE_REGEN_MS/1e3,c=Math.ceil(t/e),r=e*a,s=(c-1)*r,u=c*2;return Math.ceil(s+u)}function He(){o.stopFlag=!0,o.running=!1,Ge(),n("\u{1F6D1} Deteniendo proceso de pintado...")}O();ue();function Po(){return o.imageData?o.imageData.processor&&typeof o.imageData.processor.generatePixelQueue=="function"?o.imageData.processor.generatePixelQueue():o.imageData.fullPixelData&&Array.isArray(o.imageData.fullPixelData)&&o.imageData.fullPixelData.length>0?o.imageData.fullPixelData:o.imageData.pixels&&o.imageData.pixels.length>0?o.imageData.pixels:o.remainingPixels&&o.remainingPixels.length>0?(n("\u26A0\uFE0F Exportando usando remainingPixels (posible subconjunto del proyecto)"),o.remainingPixels):null:null}function je(t=null){try{if(!o.imageData||o.paintedPixels===0)throw new Error("No hay progreso para guardar");let e=null;try{let l=Po();l&&Array.isArray(l)&&(l.length>5e4?(n(`\u26A0\uFE0F Imagen muy grande (${l.length} p\xEDxeles), guardando solo p\xEDxeles restantes`),e=null):e=l)}catch(l){n("\u26A0\uFE0F Error obteniendo datos completos de p\xEDxeles, continuando sin ellos:",l),e=null}let a={version:"2.0",timestamp:Date.now(),imageData:{width:o.imageData.width,height:o.imageData.height,originalName:o.originalImageName,...e&&{fullPixelData:e}},progress:{paintedPixels:o.paintedPixels,totalPixels:o.totalPixels,lastPosition:{...o.lastPosition}},position:{startPosition:{...o.startPosition},tileX:o.tileX,tileY:o.tileY},config:{pixelsPerBatch:o.pixelsPerBatch,useAllChargesFirst:o.useAllChargesFirst,isFirstBatch:o.isFirstBatch,maxCharges:o.maxCharges,paintPattern:o.paintPattern},colors:o.availableColors.map(l=>({id:l.id,r:l.r,g:l.g,b:l.b})),remainingPixels:o.remainingPixels||[]},c;try{c=JSON.stringify(a,null,2)}catch{n("\u26A0\uFE0F Error serializando datos completos, intentando sin fullPixelData"),delete a.imageData.fullPixelData,c=JSON.stringify(a,null,2)}let r=new window.Blob([c],{type:"application/json"}),s=t||`wplace_progress_${o.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,u=window.URL.createObjectURL(r),i=document.createElement("a");return i.href=u,i.download=s,document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(u),n(`\u2705 Progreso guardado: ${s}`),{success:!0,filename:s}}catch(e){return n("\u274C Error guardando progreso:",e),{success:!1,error:e.message}}}async function Tt(t){return new Promise(e=>{try{let a=new window.FileReader;a.onload=c=>{try{let r=JSON.parse(c.target.result),u=["imageData","progress","position","colors"].filter(d=>!(d in r));if(u.length>0)throw new Error(`Campos requeridos faltantes: ${u.join(", ")}`);let i=r.version||"1.0";if(n(`\u{1F4C1} Cargando progreso versi\xF3n ${i}`),(!o.availableColors||o.availableColors.length===0)&&(o.availableColors=Array.isArray(r.colors)?r.colors:[]),o.availableColors.length>0&&Array.isArray(r.colors)){let d=r.colors.map(h=>h.id),g=o.availableColors.map(h=>h.id);d.filter(h=>g.includes(h)).length<d.length*.8&&n("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}o.imageData={...r.imageData,pixels:[]};let l=r.imageData.fullPixelData||r.fullPixelData;if(Array.isArray(l)&&l.length>0&&(o.imageData.fullPixelData=l,o.imageData.pixels=l,n(`\u2705 Cargados ${l.length} p\xEDxeles completos del proyecto`)),o.paintedPixels=r.progress.paintedPixels,o.totalPixels=r.progress.totalPixels,r.progress.lastPosition?o.lastPosition=r.progress.lastPosition:r.position.lastX!==void 0&&r.position.lastY!==void 0&&(o.lastPosition={x:r.position.lastX,y:r.position.lastY}),r.position.startPosition?o.startPosition=r.position.startPosition:r.position.startX!==void 0&&r.position.startY!==void 0&&(o.startPosition={x:r.position.startX,y:r.position.startY}),o.tileX=r.position.tileX,o.tileY=r.position.tileY,o.originalImageName=r.imageData.originalName,o.remainingPixels=r.remainingPixels||r.progress.remainingPixels||[],r.config&&(o.pixelsPerBatch=r.config.pixelsPerBatch||o.pixelsPerBatch,o.useAllChargesFirst=r.config.useAllChargesFirst!==void 0?r.config.useAllChargesFirst:o.useAllChargesFirst,o.isFirstBatch=o.useAllChargesFirst?!0:r.config.isFirstBatch!==void 0?r.config.isFirstBatch:!1,n(`\u{1F4C1} Progreso cargado - useAllChargesFirst: ${o.useAllChargesFirst}, isFirstBatch: ${o.isFirstBatch}`),o.maxCharges=r.config.maxCharges||o.maxCharges,i>="2.0"&&(o.paintPattern=r.config.paintPattern||"linear_start")),o.paintPattern&&o.paintPattern!=="linear_start"&&o.remainingPixels.length>0)try{Promise.resolve().then(()=>(Te(),Ue)).then(({applyPaintPattern:d})=>{o.remainingPixels=d(o.remainingPixels,o.paintPattern,o.imageData),n(`\u{1F3A8} Patr\xF3n de pintado aplicado: ${o.paintPattern}`)}).catch(d=>{n("\u26A0\uFE0F Error aplicando patr\xF3n de pintado:",d)})}catch(d){n("\u26A0\uFE0F Error cargando m\xF3dulo de patrones:",d)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),o.startPosition&&o.tileX!==void 0&&o.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y}),n(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${o.tileX},${o.tileY}) local(${o.startPosition.x},${o.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}),n(`\u2705 Plan overlay activado con ${o.remainingPixels.length} p\xEDxeles restantes`))}catch(d){n("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",d)}o.imageLoaded=!0,o.colorsChecked=!0,n(`\u2705 Progreso cargado (v${i}): ${o.paintedPixels}/${o.totalPixels} p\xEDxeles`),i>="2.0"&&n(`\u{1F3A8} Patr\xF3n: ${o.paintPattern}`),e({success:!0,data:r,painted:o.paintedPixels,total:o.totalPixels,canContinue:o.remainingPixels.length>0,version:i})}catch(r){n("\u274C Error parseando archivo de progreso:",r),e({success:!1,error:r.message})}},a.onerror=()=>{let c="Error leyendo archivo";n("\u274C",c),e({success:!1,error:c})},a.readAsText(t)}catch(a){n("\u274C Error cargando progreso:",a),e({success:!1,error:a.message})}})}function It(){o.paintedPixels=0,o.totalPixels=0,o.lastPosition={x:0,y:0},o.remainingPixels=[],o.imageData=null,o.startPosition=null,o.imageLoaded=!1,o.originalImageName=null,o.isFirstBatch=!0,o.nextBatchCooldown=0,o.drawnPixelsMap.clear(),o.lastProtectionCheck=0,n("\u{1F9F9} Progreso limpiado")}function At(){return o.imageLoaded&&o.paintedPixels>0&&o.remainingPixels&&o.remainingPixels.length>0}function kt(){return{hasProgress:At(),painted:o.paintedPixels,total:o.totalPixels,remaining:o.remainingPixels?o.remainingPixels.length:0,percentage:o.totalPixels>0?o.paintedPixels/o.totalPixels*100:0,lastPosition:{...o.lastPosition},canContinue:At()}}O();function Be(t=null){let e=document.createElement("div");t&&(e.id=t),e.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 0; /* No forzar al frente; el window-manager ajustar\xE1 seg\xFAn corresponda */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let a=e.attachShadow({mode:"open"});return document.body.appendChild(e),{host:e,root:a}}O();var Re=1e5,Ve=new Set;function U(t){if(!t)return;Ve.add(t);let e=a=>{(a.target===t||t.contains(a.target))&&te(t)};if(t.addEventListener("mousedown",e),t._bringToFrontHandler=e,!t.style.zIndex){t.style.zIndex=Re++;let a=t.getRootNode&&t.getRootNode();a&&a.host&&a.host.style&&(a.host.style.zIndex=t.style.zIndex)}}function X(t){t&&(Ve.delete(t),t._bringToFrontHandler&&(t.removeEventListener("mousedown",t._bringToFrontHandler),delete t._bringToFrontHandler))}function te(t){if(!t||!Ve.has(t))return;Re++,t.style.zIndex=Re;let e=t.getRootNode&&t.getRootNode();e&&e.host&&e.host.style&&(e.host.style.zIndex=Re)}var $e=class{constructor(e="Bot"){this.botName=e,this.isVisible=!1,this.logs=[],this.maxLogs=1e3,this.container=null,this.logContent=null,this.isResizing=!1,this.resizeHandle=null,this.originalConsole={},this.config={width:600,height:400,x:window.innerWidth-620,y:20,visible:!1},this.loadConfig(),this.createWindow(),this.setupLogInterception(),this.setupEventListeners()}loadConfig(){try{let e=localStorage.getItem(`wplace-log-window-${this.botName}`);e&&(this.config={...this.config,...JSON.parse(e)})}catch(e){n("Error cargando configuraci\xF3n de ventana de logs:",e)}}saveConfig(){try{localStorage.setItem(`wplace-log-window-${this.botName}`,JSON.stringify(this.config))}catch(e){n("Error guardando configuraci\xF3n de ventana de logs:",e)}}createWindow(){this.container=document.createElement("div"),this.container.className="wplace-log-window",this.container.style.cssText=`
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
    `;let c=document.createElement("div");c.style.cssText=`
      display: flex;
      gap: 8px;
    `;let r=document.createElement("button");r.innerHTML="\u{1F4BE}",r.title="Descargar logs",r.style.cssText=`
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
    `,r.addEventListener("mouseenter",()=>{r.style.background="rgba(34, 197, 94, 1)"}),r.addEventListener("mouseleave",()=>{r.style.background="rgba(34, 197, 94, 0.8)"}),r.addEventListener("click",()=>this.downloadLogs());let s=document.createElement("button");s.innerHTML="\u2715",s.title="Cerrar ventana",s.style.cssText=`
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
    `,s.addEventListener("mouseenter",()=>{s.style.background="rgba(239, 68, 68, 1)"}),s.addEventListener("mouseleave",()=>{s.style.background="rgba(239, 68, 68, 0.8)"}),s.addEventListener("click",()=>this.hide()),c.appendChild(r),c.appendChild(s),e.appendChild(a),e.appendChild(c),this.logContent=document.createElement("div"),this.logContent.className="log-window-content",this.logContent.style.cssText=`
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
    `,this.container.appendChild(e),this.container.appendChild(this.logContent),this.container.appendChild(this.resizeHandle),document.body.appendChild(this.container),U(this.container),this.setupDragging(e),this.setupResizing(),this.isVisible=this.config.visible}setupDragging(e){let a=!1,c={x:0,y:0};e.addEventListener("mousedown",u=>{u.target.tagName!=="BUTTON"&&(a=!0,c.x=u.clientX-this.container.offsetLeft,c.y=u.clientY-this.container.offsetTop,document.addEventListener("mousemove",r),document.addEventListener("mouseup",s),u.preventDefault())});let r=u=>{if(!a)return;let i=Math.max(0,Math.min(window.innerWidth-this.container.offsetWidth,u.clientX-c.x)),l=Math.max(0,Math.min(window.innerHeight-this.container.offsetHeight,u.clientY-c.y));this.container.style.left=i+"px",this.container.style.top=l+"px",this.config.x=i,this.config.y=l},s=()=>{a=!1,document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",s),this.saveConfig()}}setupResizing(){let e=!1,a,c,r,s;this.resizeHandle.addEventListener("mousedown",l=>{e=!0,a=l.clientX,c=l.clientY,r=parseInt(document.defaultView.getComputedStyle(this.container).width,10),s=parseInt(document.defaultView.getComputedStyle(this.container).height,10),document.addEventListener("mousemove",u),document.addEventListener("mouseup",i),l.preventDefault()});let u=l=>{if(!e)return;let d=Math.max(300,r+l.clientX-a),g=Math.max(200,s+l.clientY-c);this.container.style.width=d+"px",this.container.style.height=g+"px",this.config.width=d,this.config.height=g},i=()=>{e=!1,document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",i),this.saveConfig()}}setupLogInterception(){this.originalConsole={log:console.log,info:console.info,warn:console.warn,error:console.error,debug:console.debug},console.log=(...e)=>{this.originalConsole.log.apply(console,e),this.addLog("log",e)},console.info=(...e)=>{this.originalConsole.info.apply(console,e),this.addLog("info",e)},console.warn=(...e)=>{this.originalConsole.warn.apply(console,e),this.addLog("warn",e)},console.error=(...e)=>{this.originalConsole.error.apply(console,e),this.addLog("error",e)},console.debug=(...e)=>{this.originalConsole.debug.apply(console,e),this.addLog("debug",e)}}addLog(e,a){let c=new Date().toLocaleTimeString(),r=a.map(u=>typeof u=="object"?JSON.stringify(u,null,2):String(u)).join(" "),s={timestamp:c,type:e,message:r,raw:a};this.logs.push(s),this.logs.length>this.maxLogs&&this.logs.shift(),this.isVisible&&this.updateLogDisplay()}updateLogDisplay(){if(!this.logContent)return;let e=this.logs.map(a=>`<div style="color: ${this.getLogColor(a.type)}; margin-bottom: 2px;">[${a.timestamp}] ${a.message}</div>`).join("");this.logContent.innerHTML=e,this.logContent.scrollTop=this.logContent.scrollHeight}getLogColor(e){let a={log:"#e2e8f0",info:"#60a5fa",warn:"#fbbf24",error:"#f87171",debug:"#a78bfa"};return a[e]||a.log}downloadLogs(){let e=new Date,a=e.toISOString().split("T")[0],c=e.toTimeString().split(" ")[0].replace(/:/g,"-"),r=`log_${this.botName}_${a}_${c}.log`,s=this.logs.map(d=>`[${d.timestamp}] [${d.type.toUpperCase()}] ${d.message}`).join(`
`),u=new Blob([s],{type:"text/plain"}),i=URL.createObjectURL(u),l=document.createElement("a");l.href=i,l.download=r,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(i),n(`\u{1F4E5} Logs descargados como: ${r}`)}show(){this.container&&(this.container.style.display="flex",te(this.container),this.isVisible=!0,this.config.visible=!0,this.updateLogDisplay(),this.saveConfig())}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1,this.config.visible=!1,this.saveConfig())}toggle(){this.isVisible?this.hide():this.show()}clear(){this.logs=[],this.logContent&&(this.logContent.innerHTML="")}setupEventListeners(){window.addEventListener("resize",()=>{if(this.container){let e=window.innerWidth-this.container.offsetWidth,a=window.innerHeight-this.container.offsetHeight;this.config.x>e&&(this.config.x=Math.max(0,e),this.container.style.left=this.config.x+"px"),this.config.y>a&&(this.config.y=Math.max(0,a),this.container.style.top=this.config.y+"px"),this.saveConfig()}})}destroy(){this.originalConsole.log&&(console.log=this.originalConsole.log,console.info=this.originalConsole.info,console.warn=this.originalConsole.warn,console.error=this.originalConsole.error,console.debug=this.originalConsole.debug),this.container&&this.container.parentNode&&(X(this.container),this.container.parentNode.removeChild(this.container)),this.container=null,this.logContent=null,this.logs=[]}};window.__wplaceLogWindows=window.__wplaceLogWindows||{};function Je(t){return window.__wplaceLogWindows[t]||(window.__wplaceLogWindows[t]=new $e(t)),window.__wplaceLogWindows[t]}O();var ne={0:{id:1,name:"Black",rgb:{r:0,g:0,b:0}},1:{id:2,name:"Dark Gray",rgb:{r:60,g:60,b:60}},2:{id:3,name:"Gray",rgb:{r:120,g:120,b:120}},3:{id:4,name:"Light Gray",rgb:{r:210,g:210,b:210}},4:{id:5,name:"White",rgb:{r:255,g:255,b:255}},5:{id:6,name:"Deep Red",rgb:{r:96,g:0,b:24}},6:{id:7,name:"Red",rgb:{r:237,g:28,b:36}},7:{id:8,name:"Orange",rgb:{r:255,g:127,b:39}},8:{id:9,name:"Gold",rgb:{r:246,g:170,b:9}},9:{id:10,name:"Yellow",rgb:{r:249,g:221,b:59}},10:{id:11,name:"Light Yellow",rgb:{r:255,g:250,b:188}},11:{id:12,name:"Dark Green",rgb:{r:14,g:185,b:104}},12:{id:13,name:"Green",rgb:{r:19,g:230,b:123}},13:{id:14,name:"Light Green",rgb:{r:135,g:255,b:94}},14:{id:15,name:"Dark Teal",rgb:{r:12,g:129,b:110}},15:{id:16,name:"Teal",rgb:{r:16,g:174,b:166}},16:{id:17,name:"Light Teal",rgb:{r:19,g:225,b:190}},17:{id:20,name:"Cyan",rgb:{r:96,g:247,b:242}},18:{id:44,name:"Light Cyan",rgb:{r:187,g:250,b:242}},19:{id:18,name:"Dark Blue",rgb:{r:40,g:80,b:158}},20:{id:19,name:"Blue",rgb:{r:64,g:147,b:228}},21:{id:21,name:"Indigo",rgb:{r:107,g:80,b:246}},22:{id:22,name:"Light Indigo",rgb:{r:153,g:177,b:251}},23:{id:23,name:"Dark Purple",rgb:{r:120,g:12,b:153}},24:{id:24,name:"Purple",rgb:{r:170,g:56,b:185}},25:{id:25,name:"Light Purple",rgb:{r:224,g:159,b:249}},26:{id:26,name:"Dark Pink",rgb:{r:203,g:0,b:122}},27:{id:27,name:"Pink",rgb:{r:236,g:31,b:128}},28:{id:28,name:"Light Pink",rgb:{r:243,g:141,b:169}},29:{id:29,name:"Dark Brown",rgb:{r:104,g:70,b:52}},30:{id:30,name:"Brown",rgb:{r:149,g:104,b:42}},31:{id:31,name:"Beige",rgb:{r:248,g:178,b:119}},32:{id:52,name:"Light Beige",rgb:{r:255,g:197,b:165}},33:{id:32,name:"Medium Gray",rgb:{r:170,g:170,b:170}},34:{id:33,name:"Dark Red",rgb:{r:165,g:14,b:30}},35:{id:34,name:"Light Red",rgb:{r:250,g:128,b:114}},36:{id:35,name:"Dark Orange",rgb:{r:228,g:92,b:26}},37:{id:37,name:"Dark Goldenrod",rgb:{r:156,g:132,b:49}},38:{id:38,name:"Goldenrod",rgb:{r:197,g:173,b:49}},39:{id:39,name:"Light Goldenrod",rgb:{r:232,g:212,b:95}},40:{id:40,name:"Dark Olive",rgb:{r:74,g:107,b:58}},41:{id:41,name:"Olive",rgb:{r:90,g:148,b:74}},42:{id:42,name:"Light Olive",rgb:{r:132,g:197,b:115}},43:{id:43,name:"Dark Cyan",rgb:{r:15,g:121,b:159}},44:{id:45,name:"Light Blue",rgb:{r:125,g:199,b:255}},45:{id:46,name:"Dark Indigo",rgb:{r:77,g:49,b:184}},46:{id:47,name:"Dark Slate Blue",rgb:{r:74,g:66,b:132}},47:{id:48,name:"Slate Blue",rgb:{r:122,g:113,b:196}},48:{id:49,name:"Light Slate Blue",rgb:{r:181,g:174,b:241}},49:{id:53,name:"Dark Peach",rgb:{r:155,g:82,b:73}},50:{id:54,name:"Peach",rgb:{r:209,g:128,b:120}},51:{id:55,name:"Light Peach",rgb:{r:250,g:182,b:164}},52:{id:50,name:"Light Brown",rgb:{r:219,g:164,b:99}},53:{id:56,name:"Dark Tan",rgb:{r:123,g:99,b:82}},54:{id:57,name:"Tan",rgb:{r:156,g:132,b:107}},55:{id:36,name:"Light Tan",rgb:{r:214,g:181,b:148}},56:{id:51,name:"Dark Beige",rgb:{r:209,g:128,b:81}},57:{id:61,name:"Dark Stone",rgb:{r:109,g:100,b:63}},58:{id:62,name:"Stone",rgb:{r:148,g:140,b:107}},59:{id:63,name:"Light Stone",rgb:{r:205,g:197,b:158}},60:{id:58,name:"Dark Slate",rgb:{r:51,g:57,b:65}},61:{id:59,name:"Slate",rgb:{r:109,g:117,b:141}},62:{id:60,name:"Light Slate",rgb:{r:179,g:185,b:209}},63:{id:0,name:"Transparent",rgb:null}};function Bt(){n("\u{1F4CA} Creando ventana de estad\xEDsticas de pintado");let{host:t,root:e}=Be(),a=document.createElement("style");a.textContent=`
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
  `,e.appendChild(a);let c=document.createElement("div");c.className="stats-container",c.innerHTML=`
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
  `,e.appendChild(c);let r={container:c,header:c.querySelector(".header"),refreshBtnHeader:c.querySelector(".refresh-btn-header"),closeBtn:c.querySelector(".close-btn"),userStats:c.querySelector(".user-stats"),imageStats:c.querySelector(".image-stats"),colorsStats:c.querySelector(".colors-stats"),refreshBtn:c.querySelector(".refresh-btn")};U(c);let s=!1,u=null;r.closeBtn.addEventListener("click",()=>{l()}),r.refreshBtnHeader.addEventListener("click",()=>{u&&u()}),r.refreshBtn.addEventListener("click",()=>{u&&u()});function i(){c.style.display="block",te(c),s=!0,n("\u{1F4CA} Ventana de estad\xEDsticas mostrada")}function l(){c.style.display="none",s=!1,n("\u{1F4CA} Ventana de estad\xEDsticas ocultada")}function d(){s?l():i()}function g(p){if(!p){r.userStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u274C No se pudo obtener informaci\xF3n del usuario</div>
        </div>
      `;return}let b="";if(p.username&&(b+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F464} Usuario</div>
          <div class="stat-value">${p.username}</div>
        </div>
      `),p.charges!==void 0&&(b+=`
        <div class="stat-item">
          <div class="stat-label">\u26A1 Cargas</div>
          <div class="stat-value">${Math.floor(p.charges)} / ${p.maxCharges||"N/A"}</div>
        </div>
      `),p.pixels!==void 0&&(b+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F533} P\xEDxeles Pintados</div>
          <div class="stat-value">${p.pixels.toLocaleString()}</div>
        </div>
      `),p.cooldown!==void 0&&p.cooldown>0){let f=Math.floor(p.cooldown/60),w=p.cooldown%60,S=f>0?`${f}m ${w}s`:`${w}s`;b+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Cooldown</div>
          <div class="stat-value">${S}</div>
        </div>
      `}r.userStats.innerHTML=b||`
      <div class="stat-item">
        <div class="stat-label">\u2139\uFE0F Informaci\xF3n no disponible</div>
      </div>
    `}function m(p){if(!p||!p.loaded){r.imageStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4F7} No hay imagen cargada</div>
        </div>
      `;return}let b=p.totalPixels>0?Math.round(p.paintedPixels/p.totalPixels*100):0,f=`
      <div class="stat-item">
        <div class="stat-label">\u{1F4CA} Progreso</div>
        <div class="stat-value">${b}%</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${b}%"></div>
      </div>
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} P\xEDxeles</div>
        <div class="stat-value">${p.paintedPixels}/${p.totalPixels}</div>
      </div>
    `;if(p.estimatedTime!==void 0&&p.estimatedTime>0){let w=Math.floor(p.estimatedTime/3600),S=Math.floor(p.estimatedTime%3600/60),E=w>0?`${w}h ${S}m`:`${S}m`;f+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Tiempo Estimado</div>
          <div class="stat-value">${E}</div>
        </div>
      `}p.originalName&&(f+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4C1} Archivo</div>
          <div class="stat-value">${p.originalName}</div>
        </div>
      `),r.imageStats.innerHTML=f}function h(p){if(!p||p.length===0){r.colorsStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u274C Abra la paleta de colores en el sitio</div>
        </div>
      `;return}let b=Object.values(ne).filter(E=>E.rgb!==null),f=new Set(p.map(E=>E.id)),w=`
      <div class="stat-item">
        <div class="stat-label">\u2705 Colores Disponibles</div>
        <div class="stat-value">${p.length}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">\u{1F4CA} Total de Colores</div>
        <div class="stat-value">${b.length}</div>
      </div>
      <div class="colors-grid">
    `;p.forEach(E=>{let P=ne[Object.keys(ne).find(L=>ne[L].id===E.id)],C=P?P.name:`Color ${E.id}`,I=`rgb(${(E.rgb||[0,0,0]).join(",")})`;w+=`
        <div class="color-swatch" style="background-color: ${I};" title="${C} (ID: ${E.id})">
          <div class="color-info">${C}</div>
        </div>
      `}),b.filter(E=>!f.has(E.id)).forEach(E=>{let C=`rgb(${[E.rgb.r,E.rgb.g,E.rgb.b].join(",")})`;w+=`
        <div class="color-swatch unavailable" style="background-color: ${C};" title="${E.name} (ID: ${E.id}) - No disponible">
          <div class="color-info">${E.name} (No disponible)</div>
        </div>
      `}),w+="</div>",r.colorsStats.innerHTML=w}function y(p){u=p}function x(){X(c),t.remove()}return n("\u2705 Ventana de estad\xEDsticas de pintado creada"),{show:i,hide:l,toggle:d,updateUserStats:g,updateImageStats:m,updateColorsStats:h,setRefreshCallback:y,destroy:x,isVisible:()=>s}}O();O();function Rt(t,e=[]){n("\u{1F3A8} Creando selector de paleta de colores");let a=document.createElement("div");a.className="wplace-section",a.id="color-palette-section",a.style.marginTop="15px",a.innerHTML=`
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
  `;let c=document.createElement("style");c.textContent=`
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
  `;let r=t.getRootNode&&t.getRootNode();r&&r.nodeType===11&&r.host?r.querySelector("#color-palette-styles")||(c.id="color-palette-styles",r.appendChild(c)):document.head.querySelector("#color-palette-styles")||(c.id="color-palette-styles",document.head.appendChild(c)),t.appendChild(a);let u={showAllToggle:a.querySelector("#showAllColorsToggle"),selectAllBtn:a.querySelector("#selectAllBtn"),unselectAllBtn:a.querySelector("#unselectAllBtn"),colorsContainer:a.querySelector("#colors-container")},i=new Set,l=!1,d=null;function g(){i.clear(),u.colorsContainer.querySelectorAll(".wplace-color-swatch.active").forEach(w=>{let S=parseInt(w.dataset.colorId);isNaN(S)||i.add(S)}),d&&d(Array.from(i))}function m(f,w=!1){u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(E=>{let P=E.classList.contains("unavailable"),C=parseInt(E.dataset.colorId);(!P||w)&&(P||(E.classList.toggle("active",f),f?i.add(C):i.delete(C)))}),g(),n(`\u{1F3A8} ${f?"Seleccionados":"Deseleccionados"} todos los colores disponibles`)}function h(f=!1){if(u.colorsContainer.innerHTML="",!e||e.length===0){u.colorsContainer.innerHTML='<div style="text-align: center; color: #888; padding: 20px;">Upload an image first to capture available colors</div>';return}let w=0,S=0,E=i.size>0,P=new Set;Object.values(ne).filter(I=>I.rgb!==null).forEach(I=>{let{id:L,name:z,rgb:B}=I,q=`${B.r},${B.g},${B.b}`;S++;let F=e.some(v=>v.r===B.r&&v.g===B.g&&v.b===B.b);if(!f&&!F)return;F&&w++;let G=document.createElement("div");G.className="wplace-color-item";let $=document.createElement("button");$.className=`wplace-color-swatch ${F?"":"unavailable"}`,$.title=`${z} (ID: ${L})${F?"":" (Unavailable)"}`,$.dataset.rgb=q,$.dataset.colorId=L,$.style.backgroundColor=`rgb(${B.r}, ${B.g}, ${B.b})`,F||($.disabled=!0);let Z=E?i.has(L):F;$.classList.toggle("active",Z),Z?P.add(L):P.delete(L);let _=document.createElement("span");_.className="wplace-color-item-name",_.textContent=z+(F?"":" (N/A)"),F||(_.style.color="#888",_.style.fontStyle="italic"),F&&$.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();let k=$.classList.contains("active");$.classList.toggle("active",!k),k?i.delete(L):i.add(L),g(),n(`\u{1F3A8} Color ${z} (ID: ${L}) ${k?"deseleccionado":"seleccionado"}`)}),G.appendChild($),G.appendChild(_),u.colorsContainer.appendChild(G)}),i=P,u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(I=>{let L=parseInt(I.dataset.colorId),z=i.has(L);I.classList.toggle("active",z)}),g()}u.showAllToggle.addEventListener("change",f=>{l=f.target.checked,h(l)}),u.selectAllBtn.addEventListener("click",()=>{m(!0,l)}),u.unselectAllBtn.addEventListener("click",()=>{m(!1,l)}),h(!1);function y(f){e=f||[],h(l)}function x(){return Array.from(i)}function p(f){i=new Set(f||[]),u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(S=>{let E=parseInt(S.dataset.colorId),P=i.has(E);S.classList.toggle("active",P)}),d&&d(Array.from(i))}function b(f){d=f}return n("\u2705 Selector de paleta de colores creado"),{updateAvailableColors:y,getSelectedColors:x,setSelectedColors:p,onSelectionChange:b,element:a}}function $t(){let t=null;function e(u){let i=document.createElement("div");i.style.cssText=`
      position: fixed;
      top: 50px;
      left: 50px;
      width: 450px;
      min-width: 350px;
      max-width: 600px;
      min-height: 400px;
      max-height: 80vh;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      color: #eee;
      font-family: 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      resize: both;
      overflow: auto;
      display: none;
      flex-direction: column;
    `,i.innerHTML=`
      <div style="padding: 12px 15px; background: #2d3748; color: #60a5fa; font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: move; flex-shrink: 0;" class="resize-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          \u{1F527} <span>Redimensionar Imagen</span>
        </div>
        <div style="display: flex; gap: 5px;">
          <button id="minimizeResizeBtn" style="background: none; border: none; color: #eee; cursor: pointer; opacity: 0.7; padding: 5px; transition: opacity 0.2s ease;">\u2796</button>
          <button id="closeResizeBtn" style="background: none; border: none; color: #eee; cursor: pointer; opacity: 0.7; padding: 5px; transition: opacity 0.2s ease;">\u2716\uFE0F</button>
        </div>
      </div>
      
      <div style="padding: 15px; flex: 1; overflow-y: auto;" class="resize-content">
        <div class="resize-preview-container" style="display: flex; align-items: center; justify-content: center; text-align: center; margin-bottom: 8px; height: 320px; overflow: hidden; padding: 8px; background: #111; border: 1px solid #333; border-radius: 6px;">
          <img class="resize-preview" alt="Vista previa" draggable="false" style="image-rendering: pixelated; image-rendering: crisp-edges; display: block; margin: 0 auto; width: 100%; height: 100%; object-fit: contain; -webkit-user-drag: none; user-select: none;">
        </div>
        <div class="resize-preview-info" style="font-size: 12px; color: #aaa; text-align: center; margin-bottom: 12px;"></div>
        
        <div class="resize-controls" style="display: flex; flex-direction: column; gap: 15px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #ffffff; font-size: 14px;">Ancho: <span class="width-value"></span>px</label>
            <input type="range" class="resize-slider width-slider" min="50" max="2000" step="1" style="width: 100%;">
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #ffffff; font-size: 14px;">Alto: <span class="height-value"></span>px</label>
            <input type="range" class="resize-slider height-slider" min="50" max="2000" step="1" style="width: 100%;">
          </div>
          
          <label style="color: #ffffff; font-size: 14px; display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" class="maintain-aspect" checked>
            Mantener proporci\xF3n
          </label>
        </div>
        
        <!-- Aqu\xED se insertar\xE1 el selector de paleta de colores -->
        
        <div class="resize-buttons" style="display: flex; gap: 10px; margin-top: 20px;">
          <button class="btn btn-primary confirm-resize" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">\u2705 Aplicar</button>
          <button class="btn btn-secondary cancel-resize" style="flex: 1; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">\u274C Cancelar</button>
        </div>
      </div>
      
      <!-- Indicador de redimensionamiento -->
      <div style="
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background: linear-gradient(-45deg, transparent 30%, #666 30%, #666 40%, transparent 40%, transparent 60%, #666 60%, #666 70%, transparent 70%);
        cursor: nw-resize;
        border-bottom-right-radius: 8px;
      "></div>
    `,document.body.appendChild(i),t={overlay:i,container:i,preview:i.querySelector(".resize-preview"),previewContainer:i.querySelector(".resize-preview-container"),widthSlider:i.querySelector(".width-slider"),heightSlider:i.querySelector(".height-slider"),widthValue:i.querySelector(".width-value"),heightValue:i.querySelector(".height-value"),maintainAspect:i.querySelector(".maintain-aspect"),confirmBtn:i.querySelector(".confirm-resize"),cancelBtn:i.querySelector(".cancel-resize"),colorPaletteSelector:null,resizeWindow:i,resizeHeader:i.querySelector(".resize-header"),minimizeBtn:i.querySelector("#minimizeResizeBtn"),closeBtn:i.querySelector("#closeResizeBtn"),resizeContent:i.querySelector(".resize-content"),previewInfo:i.querySelector(".resize-preview-info")},i.addEventListener("dragstart",d=>d.preventDefault()),t.preview&&t.preview.addEventListener("dragstart",d=>d.preventDefault()),c(i,t.resizeHeader);let l=!1;t.minimizeBtn.addEventListener("click",()=>{l=!l,l?(t.resizeContent.style.display="none",i.style.height="auto",i.style.resize="none",t.minimizeBtn.textContent="\u2795"):(t.resizeContent.style.display="block",i.style.resize="both",t.minimizeBtn.textContent="\u2796")}),t.closeBtn.addEventListener("click",()=>{r()}),U(i),n("\u2705 Elementos del di\xE1logo de redimensionamiento creados")}function a(u,i={}){if(!t){n("\u274C Error: Elementos de redimensionamiento no inicializados");return}let l=u.getDimensions(),d=l.width,g=l.height,m=d,h=g,y=d/g,x=()=>{try{let C=m,A=h,I=u.generatePreview(C,A);if(t.preview.src=I,t.previewInfo){let L=C*A;t.previewInfo.textContent=`${C}\xD7${A} px | Total: ${L.toLocaleString()} p\xEDxeles`}}catch(C){n("\u26A0\uFE0F Error generando vista previa:",C)}};if(t.widthSlider.value=d,t.heightSlider.value=g,t.widthValue.textContent=d,t.heightValue.textContent=g,!t.colorPaletteSelector){let C=t.container.querySelector(".resize-content")||t.container;t.colorPaletteSelector=Rt(C)}function p(){m=parseInt(t.widthSlider.value),t.widthValue.textContent=m,t.maintainAspect.checked&&(h=Math.round(m/y),t.heightSlider.value=h,t.heightValue.textContent=h),x()}function b(){h=parseInt(t.heightSlider.value),t.heightValue.textContent=h,t.maintainAspect.checked&&(m=Math.round(h*y),t.widthSlider.value=m,t.widthValue.textContent=m),x()}function f(){t.maintainAspect.checked&&(m=parseInt(t.widthSlider.value),h=Math.round(m/y),t.heightSlider.value=h,t.heightValue.textContent=h),x()}t.widthSlider.removeEventListener("input",p),t.heightSlider.removeEventListener("input",b),t.maintainAspect.removeEventListener("change",f),t.widthSlider.addEventListener("input",p),t.heightSlider.addEventListener("input",b),t.maintainAspect.addEventListener("change",f);function w(){var A,I;if(t.colorPaletteSelector&&t.colorPaletteSelector.getSelectedColors)return t.colorPaletteSelector.getSelectedColors();let C=(I=(A=t.colorPaletteSelector)==null?void 0:A.element)==null?void 0:I.querySelectorAll(".wplace-color-swatch.active");return C?Array.from(C).map(L=>parseInt(L.dataset.colorId)):[]}function S(C){!C||!t.colorPaletteSelector||t.colorPaletteSelector.updateAvailableColors&&t.colorPaletteSelector.updateAvailableColors(C)}function E(){let C=w();i.onConfirmResize&&i.onConfirmResize(u,m,h,C),r()}function P(){r()}if(t.confirmBtn.removeEventListener("click",E),t.cancelBtn.removeEventListener("click",P),t.confirmBtn.addEventListener("click",E),t.cancelBtn.addEventListener("click",P),i.getAvailableColors){let C=i.getAvailableColors();S(C)}if(i.onColorSelectionChange&&t.colorPaletteSelector&&t.colorPaletteSelector.onSelectionChange&&t.colorPaletteSelector.onSelectionChange(i.onColorSelectionChange),t.resizeWindow.style.display="flex",te(t.resizeWindow),t.previewResizeObserver)try{t.previewResizeObserver.disconnect()}catch{}window.ResizeObserver?(t.previewResizeObserver=new window.ResizeObserver(()=>x()),t.previewContainer&&t.previewResizeObserver.observe(t.previewContainer)):(t.onWindowResize=()=>x(),window.addEventListener("resize",t.onWindowResize,{passive:!0})),x(),n("\u{1F4CF} Di\xE1logo de redimensionamiento mostrado")}function c(u,i){let l=!1,d,g,m,h,y=0,x=0,p=S=>!!S.closest("button, input, select, textarea, a, label, .btn");i.addEventListener("mousedown",b),document.addEventListener("mousemove",f,{passive:!1}),document.addEventListener("mouseup",w);function b(S){!i.contains(S.target)||p(S.target)||(S.preventDefault(),m=S.clientX-y,h=S.clientY-x,l=!0,u.style.userSelect="none",document.body.style.userSelect="none")}function f(S){l&&(S.preventDefault(),d=S.clientX-m,g=S.clientY-h,y=d,x=g,u.style.left=d+"px",u.style.top=g+"px")}function w(){l=!1,u.style.userSelect="",document.body.style.userSelect=""}}function r(){if(!t||!t.resizeWindow){n("\u274C Error: Elementos de redimensionamiento no encontrados");return}if(t.resizeWindow.style.display="none",X(t.resizeWindow),t.previewResizeObserver){try{t.previewResizeObserver.disconnect()}catch{}t.previewResizeObserver=null}t.onWindowResize&&(window.removeEventListener("resize",t.onWindowResize),t.onWindowResize=null),n("\u{1F4CF} Di\xE1logo de redimensionamiento cerrado")}function s(u){e(u),n("\u2705 Ventana de redimensionamiento inicializada")}return{initialize:s,showResizeDialog:a,closeResizeDialog:r}}O();function Ze(){function t(r,s,u={}){return new Promise(i=>{let l=document.createElement("div");l.className="modal-overlay",l.style.position="fixed",l.style.top="0",l.style.left="0",l.style.width="100%",l.style.height="100%",l.style.background="rgba(0,0,0,0.7)",l.style.zIndex="10001",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center";let d=document.createElement("div");d.style.background="#1a1a1a",d.style.border="2px solid #333",d.style.borderRadius="15px",d.style.padding="25px",d.style.color="#eee",d.style.minWidth="350px",d.style.maxWidth="400px",d.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",d.style.fontFamily="'Segoe UI', Roboto, sans-serif",d.innerHTML=`
        <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${s}</h3>
        <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4; white-space: pre-line;">${r}</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          ${u.confirm?`<button class="confirm-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${u.confirm}</button>`:""}
          ${u.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${u.save}</button>`:""}
          ${u.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${u.discard}</button>`:""}
          ${u.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${u.cancel}</button>`:""}
        </div>
      `,l.appendChild(d),document.body.appendChild(l),U(l);let g=d.querySelector(".confirm-btn"),m=d.querySelector(".save-btn"),h=d.querySelector(".discard-btn"),y=d.querySelector(".cancel-btn"),x=()=>{X(l),document.body.removeChild(l)};g&&g.addEventListener("click",()=>{x(),i("confirm")}),m&&m.addEventListener("click",()=>{x(),i("save")}),h&&h.addEventListener("click",()=>{x(),i("discard")}),y&&y.addEventListener("click",()=>{x(),i("cancel")}),l.addEventListener("click",b=>{b.target===l&&(x(),i("cancel"))});let p=b=>{b.key==="Escape"&&(x(),document.removeEventListener("keydown",p),i("cancel"))};document.addEventListener("keydown",p)})}function e(r){return new Promise(s=>{let u=r.remainingPixels?r.remainingPixels.length:0,i=r.imageData&&r.imageData.processor?r.imageData.processor:null,l=u;try{if((!l||l===0)&&i&&typeof i.generatePixelQueue=="function"){let x=i.generatePixelQueue();Array.isArray(x)&&(l=x.length)}}catch{}let d=r.imageData?r.imageData.width:0,g=r.imageData?r.imageData.height:0;if((!d||!g)&&i&&typeof i.getDimensions=="function")try{let x=i.getDimensions();x&&x.width&&x.height&&(d=x.width,g=x.height)}catch{}let m=typeof r.tileX=="number"?r.tileX:0,h=typeof r.tileY=="number"?r.tileY:0,y=`\xBFDeseas generar un archivo JSON compatible con Auto-Guard.js?

Este archivo contendr\xE1:
\u2022 \xC1rea de protecci\xF3n: ${d}x${g} p\xEDxeles
\u2022 Posici\xF3n: Tile (${m}, ${h})
\u2022 ${l||0} p\xEDxeles para proteger

El archivo se guardar\xE1 autom\xE1ticamente y podr\xE1s importarlo en Auto-Guard.js.`;t(y,"\u{1F6E1}\uFE0F Generar JSON para Auto-Guard",{confirm:"S\xED, generar JSON",cancel:"No, continuar sin generar"}).then(x=>{s(x==="confirm")}).catch(()=>{s(!1)})})}function a(r){return new Promise(s=>{try{let u=r&&r.protectionData&&r.protectionData.area,i=u?r.protectionData.area:null,l=i&&["x1","y1","x2","y2"].every(f=>Number.isFinite(i[f])),d=Array.isArray(r==null?void 0:r.originalPixels),g=Array.isArray(r==null?void 0:r.colors);if(!u||!l||!d||!g){n("\u274C Estructura inv\xE1lida para JSON del Guard. Abortando guardado.");try{c("Estructura inv\xE1lida del JSON del Guard. Vuelve a intentarlo tras seleccionar la posici\xF3n.","error")}catch{}return s({success:!1,error:"Invalid Guard JSON structure"})}let h=`wplace_GUARD_from_Image_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,y=JSON.stringify(r,null,2),x=new window.Blob([y],{type:"application/json"}),p=window.URL.createObjectURL(x),b=document.createElement("a");b.href=p,b.download=h,document.body.appendChild(b),b.click(),document.body.removeChild(b),window.URL.revokeObjectURL(p),n(`\u2705 JSON del Guard guardado: ${h}`),s({success:!0,filename:h})}catch(u){n(`\u274C Error guardando JSON del Guard: ${u.message}`),s({success:!1,error:u.message})}})}function c(r,s="info"){let u=document.createElement("div");switch(u.style.position="fixed",u.style.top="20px",u.style.right="20px",u.style.padding="15px 20px",u.style.borderRadius="8px",u.style.color="white",u.style.fontWeight="bold",u.style.zIndex="10002",u.style.maxWidth="300px",u.style.boxShadow="0 4px 12px rgba(0,0,0,0.3)",u.style.fontFamily="'Segoe UI', Roboto, sans-serif",u.style.fontSize="14px",s){case"success":u.style.background="#10b981";break;case"error":u.style.background="#ef4444";break;case"warning":u.style.background="#f59e0b";break;default:u.style.background="#3b82f6"}u.textContent=r,document.body.appendChild(u),U(u),setTimeout(()=>{document.body.contains(u)&&(X(u),document.body.removeChild(u))},3e3)}return{showConfirmDialog:t,showGuardDialog:e,saveGuardJSON:a,showNotification:c}}function zt(t,e,a={}){return Ze().showConfirmDialog(t,e,a)}function _t(t){return Ze().showGuardDialog(t)}function ze(t){return Ze().saveGuardJSON(t)}async function Ot({texts:t,...e}){if(n("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let v=document.createElement("link");v.rel="stylesheet",v.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(v),n("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:a,root:c}=Be(),r=document.createElement("style");r.textContent=`
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
      min-width: 250px;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      font-family: 'Segoe UI', Roboto, sans-serif;
      color: #eee;
      animation: slideIn 0.4s ease-out;
      resize: both;
      overflow: auto;
      display: flex;
      flex-direction: column;
      min-height: 200px;
      max-height: 80vh;
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
      flex-shrink: 0;
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
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      display: block;
      position: relative;
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
          margin-bottom: 6px;
          font-size: 14px;
        }
        
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ef4444;
          transition: .3s;
          border-radius: 24px;
        }
        
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        
        input:checked + .toggle-slider {
          background-color: #10b981;
        }
        
        input:checked + .toggle-slider:before {
          transform: translateX(20px);
          background-color: white;
        }
    
    .config-input {
      width: 60px;
      padding: 4px;
      border: 1px solid #333;
      border-radius: 4px;
      background: #1a1a1a;
      color: #eee;
      text-align: center;
      font-size: 14px;
    }
    
    .config-input.paint-pattern {
      width: 140px;
      font-size: 15px;
      padding: 6px;
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
    
    .btn-half {
          width: calc(50% - 3px);
        }
    
    .btn-full {
      width: 100%;
    }
    
    .button-row {
          display: flex;
          gap: 6px;
          margin: 3px 0;
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
  `,c.appendChild(r);let s=document.createElement("div");s.className="container",s.innerHTML=`
    <div class="header">
      <div class="header-title">
        \u{1F5BC}\uFE0F
        <span>${t.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          \u2699\uFE0F
        </button>
        <button class="header-btn minimize-btn" title="${t.minimize}">
          \u2796
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${t.batchSize}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="9999" value="20">
        </div>
        <div class="config-item">
          <label>${t.useAllCharges}</label>
          <label class="toggle-switch">
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="config-item">
          <label>${t.showOverlay||"Mostrar overlay"}</label>
          <label class="toggle-switch">
            <input class="config-checkbox show-overlay" type="checkbox" checked>
            <span class="toggle-slider"></span>
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
            \u{1F3AF} ${t.batchSize}:
            <span class="batch-value">20</span>
          </div>
          <div class="config-label">
            \u23F1\uFE0F ${t.nextBatchTime}:
            <span class="cooldown-value">--</span>
          </div>
        </div>
      </div>
      
      <div class="controls">
        <!-- Flujo 1: Estado inicial - Subir Imagen/Cargar Progreso + Logs -->
        <div class="button-row" data-state="initial">
          <button class="btn btn-upload upload-btn btn-half">
            \u{1F4E4}
            <span>${t.uploadImage}</span>
          </button>
          <button class="btn btn-load load-progress-btn btn-half">
            \u{1F4C1}
            <span>${t.loadProgress}</span>
          </button>
        </div>
        <button class="btn btn-secondary log-window-btn btn-full" data-state="initial">
          \u{1F4CB}
          <span>${t.logWindow||"Logs"}</span>
        </button>
        <button class="btn btn-secondary guard-json-btn btn-full" data-state="initial">
          \u{1F6E1}\uFE0F
          <span>Guard JSON</span>
        </button>
        
        <!-- Flujo 2: Carga de progreso - Cargar Progreso + Iniciar/Detener + Guardar/Logs -->
        <div class="button-row" data-state="load-progress" style="display: none;">
          <button class="btn btn-load load-progress-btn-flow btn-half">
            \u{1F4C1}
            <span>${t.loadProgress}</span>
          </button>
          <button class="btn btn-secondary stats-btn btn-half">
            \u{1F4CA}
            <span>Estad\xEDsticas</span>
          </button>
        </div>
        <div class="button-row" data-state="load-progress" style="display: none;">
          <button class="btn btn-start start-btn btn-half">
            \u25B6\uFE0F
            <span>${t.startPainting}</span>
          </button>
          <button class="btn btn-stop stop-btn btn-half">
            \u23F9\uFE0F
            <span>${t.stopPainting}</span>
          </button>
        </div>
        <div class="button-row" data-state="load-progress" style="display: none;">
          <button class="btn btn-secondary save-progress-btn btn-half">
            \u{1F4BE}
            <span>Guardar progreso</span>
          </button>
          <button class="btn btn-secondary log-window-btn btn-half">
            \u{1F4CB}
            <span>${t.logWindow||"Logs"}</span>
          </button>
        </div>
        <div class="button-row" data-state="load-progress" style="display: none;">
          <button class="btn btn-secondary guard-json-btn btn-full">
            \u{1F6E1}\uFE0F
            <span>Guard JSON</span>
          </button>
        </div>
        
        <!-- Flujo 3: Subida de imagen - Redimensionar/Seleccionar + Iniciar/Detener + Guardar/Logs -->
        <div class="button-row" data-state="upload-image" style="display: none;">
          <button class="btn btn-primary resize-btn btn-half">
            \u{1F504}
            <span>${t.resizeImage}</span>
          </button>
          <button class="btn btn-select select-pos-btn btn-half">
            \u{1F3AF}
            <span>${t.selectPosition}</span>
          </button>
        </div>
        <div class="button-row" data-state="upload-image" style="display: none;">
          <button class="btn btn-start start-btn-upload btn-half">
            \u25B6\uFE0F
            <span>${t.startPainting}</span>
          </button>
          <button class="btn btn-stop stop-btn-upload btn-half">
            \u23F9\uFE0F
            <span>${t.stopPainting}</span>
          </button>
        </div>
        <div class="button-row" data-state="upload-image" style="display: none;">
          <button class="btn btn-secondary save-progress-btn btn-half">
            \u{1F4BE}
            <span>Guardar progreso</span>
          </button>
          <button class="btn btn-secondary log-window-btn btn-half">
            \u{1F4CB}
            <span>${t.logWindow||"Logs"}</span>
          </button>
        </div>
        <div class="button-row" data-state="upload-image" style="display: none;">
          <button class="btn btn-secondary guard-json-btn btn-full">
            \u{1F6E1}\uFE0F
            <span>Guard JSON</span>
          </button>
        </div>
        
        <!-- Bot\xF3n de inicializaci\xF3n oculto por defecto -->
        <button class="btn btn-primary init-btn btn-full" style="display: none;">
          \u{1F916}
          <span>${t.initBot}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label">\u2139\uFE0F ${t.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${t.waitingInit}
      </div>
      

    </div>
  `,c.appendChild(s);let u=document.createElement("input");u.type="file",u.accept="image/png,image/jpeg",u.style.display="none",c.appendChild(u);let i=document.createElement("input");i.type="file",i.accept=".json",i.style.display="none",c.appendChild(i);let l={header:s.querySelector(".header"),configBtn:s.querySelector(".config-btn"),minimizeBtn:s.querySelector(".minimize-btn"),configPanel:s.querySelector(".config-panel"),pixelsPerBatch:s.querySelector(".pixels-per-batch"),useAllCharges:s.querySelector(".use-all-charges"),paintPattern:s.querySelector(".paint-pattern"),showOverlay:s.querySelector(".show-overlay"),batchValue:s.querySelector(".batch-value"),cooldownValue:s.querySelector(".cooldown-value"),initBtn:s.querySelector(".init-btn"),uploadBtn:s.querySelector(".upload-btn"),loadProgressBtn:s.querySelector(".load-progress-btn"),loadProgressBtnFlow:s.querySelector(".load-progress-btn-flow"),saveProgressBtn:s.querySelectorAll(".save-progress-btn"),guardJsonBtn:s.querySelectorAll(".guard-json-btn"),resizeBtn:s.querySelector(".resize-btn"),selectPosBtn:s.querySelector(".select-pos-btn"),startBtn:s.querySelector(".start-btn"),startBtnUpload:s.querySelector(".start-btn-upload"),stopBtn:s.querySelector(".stop-btn"),stopBtnUpload:s.querySelector(".stop-btn-upload"),statsBtn:s.querySelector(".stats-btn"),logWindowBtn:s.querySelectorAll(".log-window-btn"),progressBar:s.querySelector(".progress-bar"),statsArea:s.querySelector(".stats-area"),status:s.querySelector(".status"),content:s.querySelector(".content")},d={minimized:!1,configVisible:!1},g={width:300,height:"auto",x:20,y:20};function m(){try{let v=localStorage.getItem("wplace-auto-image-window-config");v&&(g={...g,...JSON.parse(v)},y())}catch(v){console.warn("Error cargando configuraci\xF3n de ventana:",v)}}function h(){try{localStorage.setItem("wplace-auto-image-window-config",JSON.stringify(g))}catch(v){console.warn("Error guardando configuraci\xF3n de ventana:",v)}}function y(){s.style.width=typeof g.width=="number"?g.width+"px":g.width,typeof g.height=="number"&&(s.style.height=g.height+"px"),s.style.left=g.x+"px",s.style.top=g.y+"px"}m(),U(s),te(s),x(l.header,s);function x(v,k){let R=0,D=0,K=0,re=0;v.style.cursor="move",v.addEventListener("mousedown",we);function we(H){H.target.closest(".header-btn, .wplace-header-btn")||(H.preventDefault(),K=H.clientX,re=H.clientY,document.addEventListener("mouseup",Ke),document.addEventListener("mousemove",ye))}function ye(H){H.preventDefault(),R=K-H.clientX,D=re-H.clientY,K=H.clientX,re=H.clientY;let Mt=k.offsetTop-D,Dt=k.offsetLeft-R,Nt=window.innerWidth-k.offsetWidth,Wt=window.innerHeight-k.offsetHeight,Qe=Math.max(0,Math.min(Nt,Dt)),et=Math.max(0,Math.min(Wt,Mt));k.style.top=et+"px",k.style.left=Qe+"px",g.x=Qe,g.y=et}function Ke(){document.removeEventListener("mouseup",Ke),document.removeEventListener("mousemove",ye),h()}}l.minimizeBtn.addEventListener("click",()=>{let v=s.querySelector(".content");v.style.display==="none"?(v.style.display="block",l.minimizeBtn.innerHTML="\u2796",s.style.height="auto",s.style.minHeight="auto"):(v.style.display="none",l.minimizeBtn.innerHTML="\u{1F53C}",s.style.height="auto",s.style.minHeight="auto")}),l.configBtn.addEventListener("click",()=>{d.configVisible=!d.configVisible,d.configVisible?(l.configPanel.classList.add("visible"),l.configBtn.innerHTML="\u274C"):(l.configPanel.classList.remove("visible"),l.configBtn.innerHTML="\u2699\uFE0F")}),l.pixelsPerBatch.addEventListener("change",()=>{let v=parseInt(l.pixelsPerBatch.value)||20;l.batchValue.textContent=v,e.onConfigChange&&e.onConfigChange({pixelsPerBatch:v})}),l.useAllCharges.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({useAllCharges:l.useAllCharges.checked})}),l.paintPattern.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({paintPattern:l.paintPattern.value})});function p(v){s.querySelectorAll("[data-state]").forEach(D=>{D.style.display="none"}),s.querySelectorAll(`[data-state*="${v}"]`).forEach(D=>{D.classList.contains("button-row"),D.style.display="flex"}),n(`\u{1F504} Estado cambiado a: ${v}`)}function b(){}l.initBtn.addEventListener("click",async()=>{l.initBtn.disabled=!0,e.onInitBot&&await e.onInitBot()&&void 0,l.initBtn.disabled=!1}),l.uploadBtn.addEventListener("click",()=>{u.click()}),u.addEventListener("change",async()=>{u.files.length>0&&e.onUploadImage&&await e.onUploadImage(u.files[0])&&(p("upload-image"),e.onResizeImage&&setTimeout(()=>{e.onResizeImage()},500))}),l.loadProgressBtn.addEventListener("click",()=>{i.click()}),i.addEventListener("change",async()=>{i.files.length>0&&e.onLoadProgress&&await e.onLoadProgress(i.files[0])&&p("load-progress")}),l.loadProgressBtnFlow.addEventListener("click",()=>{i.click()}),l.saveProgressBtn.forEach(v=>{v.addEventListener("click",()=>{e.onSaveProgress&&e.onSaveProgress()})}),l.guardJsonBtn.forEach(v=>{v.addEventListener("click",async()=>{try{if(!e.generateGuardJSON){alert("No se puede generar el JSON del Guard en este momento.");return}n("\u{1F6E1}\uFE0F Generando Guard JSON...");let k=await e.generateGuardJSON();if(!k){alert("No hay datos disponibles para guardar.");return}await ze(k)}catch(k){console.error(k),alert("Error al generar o guardar el Guard JSON")}})}),l.resizeBtn.addEventListener("click",()=>{e.onResizeImage&&e.onResizeImage()});let f=async(v,k)=>{e.onSelectPosition&&(v.disabled=!0,await e.onSelectPosition()&&k&&(k.disabled=!1),v.disabled=!1)};l.selectPosBtn.addEventListener("click",()=>{f(l.selectPosBtn,l.startBtnUpload)}),l.showOverlay.addEventListener("change",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let v=l.showOverlay.checked;window.__WPA_PLAN_OVERLAY__.setEnabled(v)});let w=async(v,k)=>{e.onStartPainting&&($(!0),await e.onStartPainting()||$(!1))},S=async(v,k)=>{e.onStopPainting&&await e.onStopPainting()&&$(!1)};l.startBtn.addEventListener("click",()=>{w(l.startBtn,l.stopBtn)}),l.stopBtn.addEventListener("click",()=>{S(l.startBtn,l.stopBtn)}),l.startBtnUpload.addEventListener("click",()=>{w(l.startBtnUpload,l.stopBtnUpload)}),l.stopBtnUpload.addEventListener("click",()=>{S(l.startBtnUpload,l.stopBtnUpload)});let E=null,P=null;l.logWindowBtn.forEach(v=>{v.addEventListener("click",()=>{E?E.toggle():(E=Je("image"),E.show())})}),l.statsBtn.addEventListener("click",()=>{P?P.toggle():(P=Bt(),P.setRefreshCallback(()=>{e.onRefreshStats&&e.onRefreshStats()}),P.show())});function C(v,k="default"){l.status.textContent=v,l.status.className=`status status-${k}`,l.status.style.animation="none",l.status.offsetWidth,l.status.style.animation="slideIn 0.3s ease-out"}function A(v,k,R=null){let D=k>0?v/k*100:0;l.progressBar.style.width=`${D}%`;let K=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${t.progress}</div>
        <div>${v}/${k} (${D.toFixed(1)}%)</div>
      </div>
    `;if(R&&(R.username&&(K+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} ${t.userName}</div>
            <div>${R.username}</div>
          </div>
        `),R.charges!==void 0&&(K+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${t.charges}</div>
            <div>${Math.floor(R.charges)}</div>
          </div>
        `),R.pixels!==void 0&&(K+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${t.pixels}</div>
            <div>${R.pixels.toLocaleString()}</div>
          </div>
        `),R.estimatedTime!==void 0&&R.estimatedTime>0)){let re=Math.floor(R.estimatedTime/3600),we=Math.floor(R.estimatedTime%3600/60),ye=re>0?`${re}h ${we}m`:`${we}m`;K+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${t.timeRemaining}</div>
            <div>${ye}</div>
          </div>
        `}l.statsArea.innerHTML=K}function I(v){if(v>0){let k=Math.floor(v/60),R=v%60,D=k>0?`${k}m ${R}s`:`${R}s`;l.cooldownValue.textContent=D}else l.cooldownValue.textContent="--"}function L(v){v&&v.includes("\u23F3")?(l.status.textContent=v,l.status.className="status status-info"):v&&C(v,"info")}function z(v){v?(l.initBtn.disabled=!0,l.initBtn.style.opacity="0.6",l.initBtn.innerHTML=`\u2705 <span>${t.initBot} - Completado</span>`):(l.initBtn.disabled=!1,l.initBtn.style.opacity="1",l.initBtn.innerHTML=`\u{1F916} <span>${t.initBot}</span>`)}function B(v){l.initBtn.style.display=v?"flex":"none"}function q(){p("initial"),s.querySelectorAll("button").forEach(k=>{k.disabled=!1})}function F(){E&&E.destroy(),P&&P.destroy(),X(s),a.remove()}function G(v){P&&P.isVisible()&&(v.userInfo&&P.updateUserStats(v.userInfo),v.imageInfo&&P.updateImageStats(v.imageInfo),v.availableColors&&P.updateColorsStats(v.availableColors))}function $(v){l.startBtn.disabled=v,l.startBtnUpload.disabled=v,l.stopBtn.disabled=!v,l.stopBtnUpload.disabled=!v,l.loadProgressBtn.disabled=v}function Z(){Promise.resolve().then(()=>(ue(),ht)).then(({imageState:v})=>{l.useAllCharges&&(l.useAllCharges.checked=v.useAllChargesFirst),l.paintPattern&&v.paintPattern&&(l.paintPattern.value=v.paintPattern),l.showOverlay&&v.showOverlay!==void 0&&(l.showOverlay.checked=v.showOverlay),n("\u2705 Interfaz actualizada con valores del estado cargado")}).catch(v=>{n("\u26A0\uFE0F Error actualizando interfaz desde estado:",v)})}let _=$t();return _.initialize(c),n("\u2705 Interfaz de Auto-Image creada"),p("initial"),{setStatus:C,updateProgress:A,updateCooldownDisplay:I,updateCooldownMessage:L,setInitialized:z,setInitButtonVisible:B,enableButtonsAfterInit:b,setState:p,resetToInitialState:q,showResizeDialog:v=>{_.showResizeDialog(v,{getAvailableColors:e.getAvailableColors,onColorSelectionChange:e.onColorSelectionChange,onConfirmResize:e.onConfirmResize})},closeResizeDialog:()=>{_.closeResizeDialog()},updateStatsWindow:G,setPaintingState:$,updateUIFromState:Z,destroy:F,generateGuardJSON:e.generateGuardJSON,elements:l}}Ce();function _e(t=!1){let e=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let r of e){let s=document.querySelector(r);if(s&&s.offsetParent!==null)return t&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por selector: ${r}`),!0}let a=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),c=0;for(let r of a)if(r.offsetParent!==null&&r.offsetWidth>10&&r.offsetHeight>10&&(c++,c>=5))return t&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por colores visibles: ${c}`),!0;return t&&console.log(`[WPA-UI] \u{1F50D} Paleta no detectada. Colores visibles: ${c}`),!1}function Co(t=!1,e=!1){let a=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(a){let r=a.textContent.toLowerCase(),s=r.includes("paint")||r.includes("pintar"),u=a.querySelector('svg path[d*="240-120"]')||a.querySelector('svg path[d*="M15"]');if(s||u)return t&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por selector espec\xEDfico: "${r}"`),a.click(),e&&setTimeout(()=>{t&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),a.click()},500),!0}let c=document.querySelectorAll("button");for(let r of c){let s=r.textContent.toLowerCase();if((s.includes("paint")||s.includes("pintar"))&&r.offsetParent!==null&&!r.disabled)return t&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por texto: "${r.textContent.trim()}"`),r.click(),e&&setTimeout(()=>{t&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),r.click()},500),!0}return t&&console.log("[WPA-UI] \u274C Bot\xF3n Paint no encontrado"),!1}async function Oe(t=3,e=!0){e&&console.log(`[WPA-UI] \u{1F916} Iniciando auto-click del bot\xF3n Paint (m\xE1ximo ${t} intentos)`);for(let a=1;a<=t;a++){if(e&&console.log(`[WPA-UI] \u{1F3AF} Intento ${a}/${t} - Buscando bot\xF3n Paint...`),_e())return e&&console.log("[WPA-UI] \u2705 Paleta ya est\xE1 abierta, auto-click completado"),!0;if(Co(e,!1)){if(e&&console.log("[WPA-UI] \u{1F446} Clic en bot\xF3n Paint realizado (sin segundo clic)"),await new Promise(c=>setTimeout(c,1500)),_e())return e&&console.log(`[WPA-UI] \u2705 Paleta abierta exitosamente despu\xE9s del intento ${a}`),!0;e&&console.log(`[WPA-UI] \u26A0\uFE0F Paleta no detectada tras el clic en intento ${a}. Reintentar\xE1.`)}else e&&console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado para clic en intento ${a}`);a<t&&await new Promise(c=>setTimeout(c,1e3))}return e&&console.log(`[WPA-UI] \u274C Auto-click fall\xF3 despu\xE9s de ${t} intentos`),!1}(()=>{let e={enabled:!1,templates:[],templatesShouldBeDrawn:!0,tileSize:1e3,drawMult:3,pixelPlan:null,nextBatchCount:0,anchor:null,imageWidth:null,imageHeight:null,originalFetch:null,fetchedBlobQueue:new Map,isIntercepting:!1};function a(){}function c(){e.isIntercepting||(e.originalFetch=window.fetch,e.isIntercepting=!0,window.fetch=async function(...p){var E;let b=await e.originalFetch.apply(this,p),f=b.clone(),w=(p[0]instanceof Request?(E=p[0])==null?void 0:E.url:p[0])||"ignore";if((f.headers.get("content-type")||"").includes("image/")&&w.includes("/tiles/")&&!w.includes("openfreemap")&&!w.includes("maps"))try{let P=await f.blob(),C=await s(P,w);return new Response(C,{headers:f.headers,status:f.status,statusText:f.statusText})}catch(P){return console.error("[PLAN OVERLAY] Error processing tile:",P),b}return b})}function r(){!e.isIntercepting||!e.originalFetch||(window.fetch=e.originalFetch,e.isIntercepting=!1)}async function s(p,b){if(!e.enabled||!e.templatesShouldBeDrawn||!e.pixelPlan)return p;let f=b.split("/"),w=parseInt(f[f.length-1].replace(".png","")),S=parseInt(f[f.length-2]);if(isNaN(S)||isNaN(w))return console.warn("[PLAN OVERLAY] Could not extract tile coordinates from URL:",b),p;let E=u(S,w);if(E.length===0)return p;let P=e.tileSize*e.drawMult,C=await createImageBitmap(p),A=new OffscreenCanvas(P,P),I=A.getContext("2d");return I.imageSmoothingEnabled=!1,I.clearRect(0,0,P,P),I.drawImage(C,0,0,P,P),i(I,E,S,w),await A.convertToBlob({type:"image/png"})}function u(p,b){return!e.pixelPlan||!e.pixelPlan.pixels?[]:e.pixelPlan.pixels.filter(f=>{let w=Math.floor(f.globalX/3e3),S=Math.floor(f.globalY/3e3);return w===p&&S===b})}function i(p,b,f,w){let S=f*3e3,E=w*3e3;p.globalAlpha=.7;for(let P of b){let C=(P.globalX-S)*e.drawMult+1,A=(P.globalY-E)*e.drawMult+1;C>=0&&C<e.tileSize*e.drawMult&&A>=0&&A<e.tileSize*e.drawMult&&(p.fillStyle=`rgb(${P.r},${P.g},${P.b})`,p.fillRect(C,A,1,1))}if(e.nextBatchCount>0){p.globalAlpha=1;let P=b.slice(0,e.nextBatchCount);for(let C of P){let A=(C.globalX-S)*e.drawMult+1,I=(C.globalY-E)*e.drawMult+1;A>=0&&A<e.tileSize*e.drawMult&&I>=0&&I<e.tileSize*e.drawMult&&(p.fillStyle=`rgb(${C.r},${C.g},${C.b})`,p.fillRect(A,I,1,1))}}}function l(p){e.enabled=!!p,e.enabled?c():r()}function d(p,b={}){var w,S,E;if(!p||p.length===0){e.pixelPlan=null;return}let f=[];for(let P of p){let C,A;if(typeof P.tileX=="number"&&typeof P.localX=="number")C=P.tileX*3e3+P.localX,A=P.tileY*3e3+P.localY;else if(b.anchor&&typeof P.imageX=="number"){let I=b.anchor.tileX*3e3+(b.anchor.pxX||0),L=b.anchor.tileY*3e3+(b.anchor.pxY||0);C=I+P.imageX,A=L+P.imageY}else continue;f.push({globalX:C,globalY:A,r:((w=P.color)==null?void 0:w.r)||0,g:((S=P.color)==null?void 0:S.g)||0,b:((E=P.color)==null?void 0:E.b)||0})}e.pixelPlan={pixels:f},e.nextBatchCount=b.nextBatchCount||0,e.anchor=b.anchor||null,e.imageWidth=b.imageWidth||null,e.imageHeight=b.imageHeight||null,typeof b.enabled=="boolean"&&l(b.enabled)}function g(p){e.nextBatchCount=Math.max(0,Number(p||0))}function m(p){e.anchor=p}function h(){}function y(){}function x(){r(),e.pixelPlan=null,e.fetchedBlobQueue.clear()}window.__WPA_PLAN_OVERLAY__={injectStyles:a,setEnabled:l,setPlan:d,setPlanItemsFromTileList:d,setNextBatchCount:g,setAnchor:m,setAnchorCss:h,endSelectionMode:y,render:()=>{},cleanup:x,get state(){return e}}})();async function Ft(){console.log("[WPA-Image] \u{1F680} runImage() iniciado"),n("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),console.log("[WPA-Image] \u{1F30D} Inicializando sistema de idiomas"),Fe(),console.log("[WPA-Image] \u2705 Sistema de idiomas inicializado"),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0},console.log("[WPA-Image] \u{1F527} Estado global actualizado");let t=null,e=window.fetch,a=()=>{let c=window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.state&&window.__WPA_PLAN_OVERLAY__.state.enabled;window.fetch!==e&&!c?(window.fetch=e,n("\u{1F504} Fetch original restaurado")):c&&n("\u{1F504} Fetch NO restaurado - overlay activo"),o.positionTimeoutId&&(clearTimeout(o.positionTimeoutId),o.positionTimeoutId=null),o.cleanupObserver&&(o.cleanupObserver(),o.cleanupObserver=null),o.selectingPosition=!1};try{let c={...Q},r=Pe("image");if(o.language=mt(),!c.SITEKEY){let d=document.querySelector("*[data-sitekey]");d?(c.SITEKEY=d.getAttribute("data-sitekey"),n(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${c.SITEKEY.substring(0,20)}...`)):n("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function s(){return n("\u{1F916} Intentando auto-inicio..."),_e()?(n("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(n("\u{1F50D} Paleta no encontrada, iniciando auto-click del bot\xF3n Paint..."),await Oe(3,!0)?(n("\u2705 Auto-click exitoso, paleta abierta"),!0):(n("\u274C Auto-click fall\xF3, requerir\xE1 inicio manual"),!1))}async function u(d=!1){n("\u{1F916} Inicializando Auto-Image..."),i.setStatus(T("image.checkingColors"),"info");let g=ge();if(g.length===0)return i.setStatus(T("image.noColorsFound"),"error"),!1;let m=await le(),h=null;m.success&&m.data.user?(h={username:m.data.user.name||"An\xF3nimo",charges:m.data.charges,maxCharges:m.data.maxCharges,pixels:m.data.user.pixelsPainted||0},t=h,o.currentCharges=m.data.charges,o.maxCharges=m.data.maxCharges||9999,n(`\u{1F464} Usuario conectado: ${m.data.user.name||"An\xF3nimo"} - Cargas: ${h.charges}/${h.maxCharges} - P\xEDxeles: ${h.pixels}`)):n("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),o.availableColors=g,o.colorsChecked=!0,i.setStatus(T("image.colorsFound",{count:g.length}),"success"),i.updateProgress(0,0,h),d||n(`\u2705 ${g.length} colores disponibles detectados`),i.setInitialized(!0),i.enableButtonsAfterInit();try{}catch{}return!0}let i=await Ot({texts:r,onConfigChange:d=>{d.pixelsPerBatch!==void 0&&(o.pixelsPerBatch=d.pixelsPerBatch),d.useAllCharges!==void 0&&(o.useAllChargesFirst=d.useAllCharges),d.paintPattern!==void 0&&(o.paintPattern=d.paintPattern,n(`\u{1F3A8} Patr\xF3n de pintado cambiado a: ${d.paintPattern}`),o.remainingPixels&&o.remainingPixels.length>0&&Promise.resolve().then(()=>(Te(),Ue)).then(({applyPaintPattern:g})=>{o.remainingPixels=g(o.remainingPixels,d.paintPattern,o.imageData);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}),n(`\u2705 Overlay actualizado con nuevo patr\xF3n: ${d.paintPattern}`))}catch(m){n("\u26A0\uFE0F Error actualizando overlay con nuevo patr\xF3n:",m)}}).catch(g=>{n("\u274C Error aplicando nuevo patr\xF3n:",g)})),n("Configuraci\xF3n actualizada:",d)},onInitBot:u,onUploadImage:async d=>{try{i.setStatus(T("image.loadingImage"),"info");let g=window.URL.createObjectURL(d),m=new Se(g);m.originalName=d.name,await m.load();let h=m.initializeColorPalette();o.availableColors=h;let y=await m.analyzePixels();m.setCoords(0,0,0,0);let x=m.getImageData();o.imageData=x,o.imageData.processor=m,o.totalPixels=y.requiredPixels,o.paintedPixels=0,o.originalImageName=d.name,o.imageLoaded=!0,i.setStatus(T("image.imageLoaded",{count:y.requiredPixels}),"success"),i.updateProgress(0,y.requiredPixels,t),n(`\u2705 [BLUE MARBLE] Imagen cargada: ${x.width}x${x.height}, ${y.requiredPixels} p\xEDxeles v\xE1lidos`),n(`\u2705 [BLUE MARBLE] An\xE1lisis: ${y.uniqueColors} colores \xFAnicos, ${y.defacePixels} p\xEDxeles #deface`),window.URL.revokeObjectURL(g);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),n("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(p){n("\u26A0\uFE0F Error activando plan overlay:",p)}return!0}catch(g){return i.setStatus(T("image.imageError"),"error"),n("\u274C Error cargando imagen:",g),!1}},onSelectPosition:async()=>new Promise(d=>{i.setStatus(T("image.selectPositionAlert"),"info"),i.setStatus(T("image.waitingPosition"),"info"),o.selectingPosition=!0;let g=!1,m=()=>{window.fetch=async(x,p)=>{if(o.selectingPosition&&!g&&typeof x=="string"&&x.includes("/s0/pixel/")&&p&&p.method==="POST")try{n(`\u{1F3AF} Interceptando request de pintado: ${x}`);let b=await e(x,p);if(b.ok&&p.body){let f;try{f=JSON.parse(p.body)}catch(w){return n("Error parseando body del request:",w),b}if(f.coords&&Array.isArray(f.coords)&&f.coords.length>=2){let w=f.coords[0],S=f.coords[1],E=x.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(E&&!g){g=!0;let P=parseInt(E[1]),C=parseInt(E[2]);if(o.tileX=P,o.tileY=C,o.startPosition={x:w,y:S},o.selectingPosition=!1,o.imageData&&o.imageData.processor){let A=o.imageData.processor;A.setCoords(P,C,w,S);try{await A.createTemplateTiles(),n(`\u2705 [BLUE MARBLE] Template tiles creados para posici\xF3n tile(${P},${C}) pixel(${w},${S})`)}catch(L){n(`\u274C [BLUE MARBLE] Error creando template tiles: ${L.message}`)}let I=A.generatePixelQueue();o.remainingPixels=I,(!o.totalPixels||o.totalPixels===0)&&(o.totalPixels=I.length),n(`\u2705 Cola de p\xEDxeles generada: ${I.length} p\xEDxeles para overlay`)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setEnabled(!1),window.__WPA_PLAN_OVERLAY__.setPlan([],{}),window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:P,tileY:C,pxX:w,pxY:S}),o.remainingPixels&&o.remainingPixels.length>0?(window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{anchor:{tileX:P,tileY:C,pxX:w,pxY:S},imageWidth:o.imageData.width,imageHeight:o.imageData.height,enabled:!0}),n(`\u2705 Plan overlay reiniciado y anclado en tile(${P},${C}) local(${w},${S})`)):n("\u26A0\uFE0F No hay p\xEDxeles para mostrar en overlay"))}catch(A){n(`\u274C Error configurando overlay: ${A.message}`)}a(),i.setStatus(T("image.positionSet"),"success"),n(`\u2705 Posici\xF3n establecida: tile(${o.tileX},${o.tileY}) local(${w},${S})`),setTimeout(async()=>{try{if(n("\u{1F6E1}\uFE0F Mostrando di\xE1logo de Auto-Guard..."),await _t(o)){n("\u2705 Usuario acept\xF3 generar JSON para Auto-Guard");let I=null;if(typeof i.generateGuardJSON=="function")I=i.generateGuardJSON();else throw new Error("generateGuardJSON no est\xE1 disponible en la UI");await ze(I)}else n("\u2139\uFE0F Usuario decidi\xF3 no generar JSON para Auto-Guard")}catch(A){n("\u274C Error mostrando di\xE1logo de Auto-Guard:",A)}},1e3),d(!0)}else n("\u26A0\uFE0F No se pudo extraer tile de la URL:",x)}}return b}catch(b){if(n("\u274C Error interceptando pixel:",b),!g)return a(),e(x,p)}return e(x,p)}},h=()=>{let x=document.querySelectorAll("canvas");if(x.length===0){n("\u26A0\uFE0F No se encontraron elementos canvas");return}n(`\u{1F4CA} Configurando observer para ${x.length} canvas`);let p=b=>{var w;if(!o.selectingPosition||g)return;let f=b.target;if(f&&f.tagName==="CANVAS"){n("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let E=(((w=document.querySelector("canvas"))==null?void 0:w.parentElement)||document.body).getBoundingClientRect(),P=b.clientX-E.left,C=b.clientY-E.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(P,C),n(`Plan overlay: ancla CSS establecida en (${P}, ${C})`))}catch(S){n("Plan Overlay: error calculando ancla CSS",S)}setTimeout(()=>{!g&&o.selectingPosition&&n("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",p),o.cleanupObserver=()=>{document.removeEventListener("click",p)}};m(),h();let y=setTimeout(()=>{o.selectingPosition&&!g&&(a(),o.cleanupObserver&&o.cleanupObserver(),i.setStatus(T("image.positionTimeout"),"error"),n("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),d(!1))},12e4);o.positionTimeoutId=y}),onStartPainting:async()=>{var d;if(n("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:o.imageLoaded,startPosition:o.startPosition,tileX:o.tileX,tileY:o.tileY,totalPixels:o.totalPixels,remainingPixels:((d=o.remainingPixels)==null?void 0:d.length)||0}),!o.imageLoaded||!o.startPosition)return i.setStatus(T("image.missingRequirements"),"error"),n(`\u274C Validaci\xF3n fallida: imageLoaded=${o.imageLoaded}, startPosition=${!!o.startPosition}`),!1;o.running=!0,o.stopFlag=!1,o.isFirstBatch=o.useAllChargesFirst,n(`\u{1F680} Iniciando pintado - isFirstBatch: ${o.isFirstBatch}, useAllChargesFirst: ${o.useAllChargesFirst}`),i.setStatus(T("image.startPaintingMsg"),"success");try{return await Lt(o.imageData,o.startPosition,(g,m,h,y)=>{t&&(t.charges=Math.floor(o.currentCharges),y!==void 0&&(t.estimatedTime=y)),i.updateProgress(g,m,t),o.inCooldown&&o.nextBatchCooldown>0?i.updateCooldownDisplay(o.nextBatchCooldown):i.updateCooldownDisplay(0),h?h.includes("\u23F3")&&o.inCooldown?i.updateCooldownMessage(h):i.setStatus(h,"info"):i.setStatus(T("image.paintingProgress",{painted:g,total:m}),"info")},(g,m)=>{g?(i.setStatus(T("image.paintingComplete",{count:m}),"success"),It()):i.setStatus(T("image.paintingStopped"),"warning"),o.running=!1},g=>{i.setStatus(T("image.paintingError"),"error"),n("\u274C Error en proceso de pintado:",g),o.running=!1}),!0}catch(g){return i.setStatus(T("image.paintingError"),"error"),n("\u274C Error iniciando pintado:",g),o.running=!1,!1}},onStopPainting:async()=>{if(kt().hasProgress){let g=await zt(T("image.confirmSaveProgress"),T("image.saveProgressTitle"),{save:T("image.saveProgress"),discard:T("image.discardProgress"),cancel:T("image.cancel")});if(g==="save"){let m=je();m.success?i.setStatus(T("image.progressSaved",{filename:m.filename}),"success"):i.setStatus(T("image.progressSaveError",{error:m.error}),"error")}else if(g==="cancel")return!1}return He(),i.setStatus(T("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let d=je();return d.success?i.setStatus(T("image.progressSaved",{filename:d.filename}),"success"):i.setStatus(T("image.progressSaveError",{error:d.error}),"error"),d.success},onLoadProgress:async d=>{try{let g=await Tt(d);return g.success?(i.setStatus(T("image.progressLoaded",{painted:g.painted,total:g.total}),"success"),i.updateProgress(g.painted,g.total,t),i.updateUIFromState(),n("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(i.setStatus(T("image.progressLoadError",{error:g.error}),"error"),!1)}catch(g){return i.setStatus(T("image.progressLoadError",{error:g.message}),"error"),!1}},onResizeImage:()=>{o.imageLoaded&&o.imageData&&o.imageData.processor&&i.showResizeDialog(o.imageData.processor)},onConfirmResize:async(d,g,m,h)=>{n(`\u{1F504} Redimensionando imagen de ${d.getDimensions().width}x${d.getDimensions().height} a ${g}x${m}`),n(`\u{1F3A8} Colores seleccionados: ${h?h.length:"todos"}`);try{if(await d.resize(g,m),h&&h.length>0){let x=o.availableColors.filter(p=>h.includes(p.id));d.setSelectedColors(x),n(`\u{1F3A8} Paleta actualizada con ${h.length} colores seleccionados`)}let y=await d.analyzePixels();o.imageData={processor:d,width:g,height:m,validPixelCount:y.requiredPixels,requiredPixels:y.requiredPixels,totalPixels:y.totalPixels},o.totalPixels=y.requiredPixels,o.paintedPixels=0,o.remainingPixels=[],o.lastPosition={x:0,y:0},i.updateProgress(0,y.requiredPixels,t),i.setStatus(T("image.resizeSuccess",{width:g,height:m}),"success"),n(`\u2705 Imagen redimensionada: ${y.requiredPixels} p\xEDxeles v\xE1lidos de ${y.totalPixels} totales`),o.startPosition&&o.tileX!=null&&o.tileY!=null?n("\u{1F4CD} Manteniendo posici\xF3n previamente seleccionada tras el redimensionado"):n("\u2139\uFE0F No hay posici\xF3n previa establecida; podr\xE1s seleccionar una cuando lo desees");try{if(window.__WPA_PLAN_OVERLAY__&&o.startPosition&&o.tileX!=null&&o.tileY!=null){await d.createTemplateTiles();let x=d.generatePixelQueue();o.remainingPixels=x,window.__WPA_PLAN_OVERLAY__.setPlan(x,{anchor:{tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y},imageWidth:g,imageHeight:m,enabled:!0}),n(`\u2705 Overlay actualizado con ${x.length} p\xEDxeles despu\xE9s del resize`)}}catch(x){n(`\u26A0\uFE0F Error actualizando overlay despu\xE9s del resize: ${x.message}`)}}catch(y){n(`\u274C Error redimensionando imagen: ${y.message}`),i.setStatus(T("image.imageError"),"error")}},onRefreshStats:async()=>{var d;n("\u{1F504} Actualizando estad\xEDsticas...");try{let g=await le(),m=null;g.success&&g.data.user&&(m={username:g.data.user.name||"An\xF3nimo",charges:g.data.charges,maxCharges:g.data.maxCharges,pixels:g.data.user.pixelsPainted||0,cooldown:g.data.cooldown||0},t=m,o.currentCharges=g.data.charges,o.maxCharges=g.data.maxCharges||9999);let h=ge();h.length>0&&(o.availableColors=h,o.colorsChecked=!0);let y=null;o.imageLoaded&&(y={loaded:!0,totalPixels:o.totalPixels,paintedPixels:o.paintedPixels,estimatedTime:o.estimatedTime,originalName:o.originalImageName}),i.updateStatsWindow({userInfo:m,imageInfo:y,availableColors:h.length>0?h:o.availableColors}),i.updateProgress(o.paintedPixels,o.totalPixels,m),n(`\u2705 Estad\xEDsticas actualizadas: ${h.length>0?h.length:((d=o.availableColors)==null?void 0:d.length)||0} colores disponibles`)}catch(g){n("\u274C Error actualizando estad\xEDsticas:",g)}},getAvailableColors:()=>o.availableColors||[],onColorSelectionChange:d=>{n(`\u{1F3A8} Selecci\xF3n de colores cambiada: ${d.length} colores seleccionados`)},generateGuardJSON:()=>{if(!o.imageLoaded||!o.imageData||!o.startPosition||o.tileX==null||o.tileY==null)throw new Error("Datos insuficientes para generar JSON del Guard. Aseg\xFArate de haber cargado una imagen y seleccionado una posici\xF3n.");let d=o.imageData.processor;if(!d)throw new Error("Procesador de imagen no disponible.");let{width:g,height:m}=o.imageData,{x:h,y}=o.startPosition,{tileX:x,tileY:p}=o,b=x*1e3+h,f=p*1e3+y,w=b+g-1,S=f+m-1,E=d.generatePixelQueue(),P=[],C=L=>(L%1e3+1e3)%1e3,A=L=>{if(L&&typeof L.id!="undefined")return L.id;let B=(o.availableColors||[]).find(q=>q.r===L.r&&q.g===L.g&&q.b===L.b);return B?B.id:void 0};E&&E.length>0&&E.forEach(L=>{let z=typeof L.globalX=="number"?L.globalX:x*1e3+h+L.imageX,B=typeof L.globalY=="number"?L.globalY:p*1e3+y+L.imageY,q=`${z},${B}`,F=typeof L.tileX=="number"?L.tileX:Math.floor(z/1e3),G=typeof L.tileY=="number"?L.tileY:Math.floor(B/1e3),$=typeof L.localX=="number"?L.localX:C(z),Z=typeof L.localY=="number"?L.localY:C(B),_=L.color||L.targetColor||{},v=A(_);P.push({key:q,r:_.r,g:_.g,b:_.b,colorId:typeof v!="undefined"?v:null,globalX:z,globalY:B,localX:$,localY:Z,tileX:F,tileY:G})});let I={version:"1.0",timestamp:Date.now(),protectionData:{area:{x1:b,y1:f,x2:w,y2:S},protectedPixels:P.length,splitInfo:null},progress:{totalRepaired:0,lastCheck:Date.now()},config:{maxProtectionSize:1e5,pixelsPerBatch:50,checkInterval:1e4},colors:(o.availableColors||[]).map(L=>({id:L.id,r:L.r,g:L.g,b:L.b})),originalPixels:P};return n(`\u2705 JSON del Guard generado: \xE1rea (${b},${f}) a (${w},${S}), ${P.length} p\xEDxeles de ${(E==null?void 0:E.length)||0} totales`),I}}),l=d=>{let{language:g}=d.detail;n(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${g}`),o.language=g};window.addEventListener("launcherLanguageChanged",l),window.addEventListener("languageChanged",l),window.addEventListener("beforeunload",()=>{a(),He(),i.destroy(),window.removeEventListener("launcherLanguageChanged",l),window.removeEventListener("languageChanged",l),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),n("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{i.setStatus(T("image.autoInitializing"),"info"),n("\u{1F916} Intentando auto-inicio..."),await s()?(i.setStatus(T("image.autoInitSuccess"),"success"),n("\u2705 Auto-inicio exitoso"),i.setInitButtonVisible(!1),await u(!0)&&n("\u{1F680} Bot auto-iniciado completamente")):(i.setStatus(T("image.autoInitFailed"),"warning"),n("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(d){n("\u274C Error en auto-inicio:",d),i.setStatus(T("image.manualInitRequired"),"warning")}},1e3)}catch(c){throw n("\u274C Error inicializando Auto-Image:",c),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),c}}(async()=>{"use strict";var t,e;console.log("[WPA-Image] \u{1F680} Entry point iniciado");try{console.log("[WPA-Image] \u{1F916} Iniciando auto-click del bot\xF3n Paint..."),await Oe(3,!0),console.log("[WPA-Image] \u2705 Auto-click completado")}catch(a){console.log("[WPA-Image] \u26A0\uFE0F Error en auto-click del bot\xF3n Paint:",a)}if((t=window.__wplaceBot)!=null&&t.imageRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Image ya est\xE1 corriendo"),alert("Auto-Image ya est\xE1 corriendo.");return}if((e=window.__wplaceBot)!=null&&e.farmRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Farm est\xE1 ejecut\xE1ndose"),alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={},console.log("[WPA-Image] \u{1F527} Estado global inicializado")),window.__wplaceBot.imageRunning=!0,console.log("[WPA-Image] \u{1F3C3} Marcado como ejecut\xE1ndose"),console.log("[WPA-Image] \u{1F3AF} Llamando a runImage()"),Ft().catch(a=>{console.error("[BOT] Error en Auto-Image:",a),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
