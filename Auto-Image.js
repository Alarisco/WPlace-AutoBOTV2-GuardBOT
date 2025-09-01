/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-09-01T16:18:05.613Z */
(()=>{var Yt=Object.defineProperty;var X=(t,e)=>()=>(t&&(e=t(t=0)),e);var Qe=(t,e)=>{for(var r in e)Yt(t,r,{get:e[r],enumerable:!0})};var a,D=X(()=>{a=(...t)=>console.log("[WPA-UI]",...t)});var et,tt=X(()=>{et={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",userName:"Usuario",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",showOverlay:"Mostrar overlay",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando...",paintPattern:"\u{1F4D0} Patr\xF3n de pintado",patternLinearStart:"Lineal (Inicio)",patternLinearEnd:"Lineal (Final)",patternRandom:"Aleatorio",patternCenterOut:"Centro hacia afuera",patternCornersFirst:"Esquinas primero",patternSpiral:"Espiral",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",userInfo:"Informaci\xF3n del Usuario",imageProgress:"Progreso de la Imagen",availableColors:"Colores Disponibles",noImageLoaded:"No hay imagen cargada",cooldown:"Tiempo de espera",totalColors:"Total de Colores",colorPalette:"Paleta de Colores",showAllColors:"Mostrar Todos los Colores (incluyendo no disponibles)",selectAllColors:"Seleccionar Todos",unselectAllColors:"Deseleccionar Todos",noAvailable:"No disponible",colorSelected:"Color seleccionado",statsUpdated:"\u2705 Estad\xEDsticas actualizadas: {count} colores disponibles"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Inicializar Guard-BOT",selectArea:"Seleccionar \xC1rea",captureArea:"Capturar \xC1rea",startProtection:"Iniciar",stopProtection:"Detener",protectedPixels:"P\xEDxeles Protegidos",upperLeft:"Esquina Superior Izquierda",lowerRight:"Esquina Inferior Derecha",detectedChanges:"Cambios Detectados",repairedPixels:"P\xEDxeles Reparados",charges:"Cargas",waitingInit:"Esperando inicializaci\xF3n...",checkingColors:"\u{1F3A8} Verificando colores disponibles...",noColorsFound:"\u274C No se encontraron colores. Abre la paleta de colores en el sitio.",colorsFound:"\u2705 {count} colores disponibles encontrados",initSuccess:"\u2705 Guard-BOT inicializado correctamente",initError:"\u274C Error inicializando Guard-BOT",invalidCoords:"\u274C Coordenadas inv\xE1lidas",invalidArea:"\u274C El \xE1rea debe tener esquina superior izquierda menor que inferior derecha",areaTooLarge:"\u274C \xC1rea demasiado grande: {size} p\xEDxeles (m\xE1ximo: {max})",capturingArea:"\u{1F4F8} Capturando \xE1rea...",areaCaptured:"\u2705 \xC1rea capturada: {count} p\xEDxeles",captureError:"\u274C Error capturando \xE1rea: {error}",captureFirst:"\u274C Primero captura un \xE1rea",noChanges:"\u2705 \xC1rea - sin cambios detectados",changesDetected:"\u{1F6A8} {count} cambios detectados en el \xE1rea",repairing:"\u{1F6E0}\uFE0F Reparando {count} p\xEDxeles alterados...",repairedSuccess:"\u2705 Reparados {count} p\xEDxeles correctamente",repairError:"\u274C Error reparando p\xEDxeles: {error}",noCharges:"\u26A0\uFE0F Sin cargas suficientes para reparar cambios",checkingChanges:"\u{1F50D} Verificando cambios en \xE1rea...",errorChecking:"\u274C Error verificando cambios: {error}",guardActive:"\u{1F6E1}\uFE0F Guardi\xE1n activo - \xE1rea monitoreada",lastCheck:"\xDAltima verificaci\xF3n: {time}",nextCheck:"Pr\xF3xima verificaci\xF3n en: {time}s",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Guard-BOT iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",manualInitRequired:"\u{1F527} Inicio manual requerido",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",protectionStopped:"\u23F9\uFE0F Protecci\xF3n detenida",selectUpperLeft:"\u{1F3AF} Pinta un p\xEDxel en la esquina SUPERIOR IZQUIERDA del \xE1rea a monitorear",selectLowerRight:"\u{1F3AF} Ahora pinta un p\xEDxel en la esquina INFERIOR DERECHA del \xE1rea",waitingUpperLeft:"\u{1F446} Esperando selecci\xF3n de esquina superior izquierda...",waitingLowerRight:"\u{1F446} Esperando selecci\xF3n de esquina inferior derecha...",upperLeftCaptured:"\u2705 Esquina superior izquierda capturada: ({x}, {y})",lowerRightCaptured:"\u2705 Esquina inferior derecha capturada: ({x}, {y})",selectionTimeout:"\u274C Tiempo agotado para selecci\xF3n",selectionError:"\u274C Error en selecci\xF3n, int\xE9ntalo de nuevo",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",analysisTitle:"An\xE1lisis de Diferencias - JSON vs Canvas Actual",correctPixels:"P\xEDxeles Correctos",incorrectPixels:"P\xEDxeles Incorrectos",missingPixels:"P\xEDxeles Faltantes",showCorrect:"Mostrar Correctos",showIncorrect:"Mostrar Incorrectos",showMissing:"Mostrar Faltantes",autoRefresh:"Auto-refresco",zoomAdjusted:"Zoom ajustado autom\xE1ticamente a",autoRefreshEnabled:"Auto-refresco activado cada",autoRefreshDisabled:"Auto-refresco desactivado",autoRefreshIntervalUpdated:"Intervalo de auto-refresco actualizado a",visualizationUpdated:"Visualizaci\xF3n actualizada",configTitle:"Configuraci\xF3n del Guard",protectionPatterns:"Patrones de Protecci\xF3n",preferSpecificColor:"Priorizar color espec\xEDfico",excludeSpecificColors:"No reparar colores espec\xEDficos",loadManagement:"Gesti\xF3n de Cargas",minLoadsToWait:"M\xEDnimo de cargas:",pixelsPerBatch:"P\xEDxeles por lote",spendAllPixelsOnStart:"Gastar todos los p\xEDxeles al iniciar",waitTimes:"Tiempos de Espera",useRandomTimes:"Usar tiempos aleatorios entre lotes",minTime:"Tiempo m\xEDnimo (s)",maxTime:"Tiempo m\xE1ximo (s)"}}});var ot,it=X(()=>{ot={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",userName:"User",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",showOverlay:"Show overlay",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout, retrying...",protectionEnabled:"Protection enabled",protectionDisabled:"Protection disabled",paintPattern:"Paint pattern",patternLinearStart:"Linear (Start)",patternLinearEnd:"Linear (End)",patternRandom:"Random",patternCenterOut:"Center outward",patternCornersFirst:"Corners first",patternSpiral:"Spiral",solid:"Solid",stripes:"Stripes",checkerboard:"Checkerboard",gradient:"Gradient",dots:"Dots",waves:"Waves",spiral:"Spiral",mosaic:"Mosaic",bricks:"Bricks",zigzag:"Zigzag",protectingDrawing:"Protecting drawing...",changesDetected:"\u{1F6A8} {count} changes detected in drawing",repairing:"\u{1F527} Repairing {count} altered pixels...",repairCompleted:"\u2705 Repair completed: {count} pixels",noChargesForRepair:"\u26A1 No charges for repair, waiting...",protectionPriority:"\u{1F6E1}\uFE0F Protection priority activated",patternApplied:"Pattern applied",customPattern:"Custom pattern",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialize Guard-BOT",selectArea:"Select Area",captureArea:"Capture Area",startProtection:"Start Protection",stopProtection:"Stop Protection",upperLeft:"Upper Left Corner",lowerRight:"Lower Right Corner",protectedPixels:"Protected Pixels",detectedChanges:"Detected Changes",repairedPixels:"Repaired Pixels",charges:"Charges",waitingInit:"Waiting for initialization...",checkingColors:"\u{1F3A8} Checking available colors...",noColorsFound:"\u274C No colors found. Open the color palette on the site.",colorsFound:"\u2705 Found {count} available colors",initSuccess:"\u2705 Guard-BOT initialized successfully",initError:"\u274C Error initializing Guard-BOT",invalidCoords:"\u274C Invalid coordinates",invalidArea:"\u274C Area must have upper left corner less than lower right corner",areaTooLarge:"\u274C Area too large: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capturing protection area...",areaCaptured:"\u2705 Area captured: {count} pixels under protection",captureError:"\u274C Error capturing area: {error}",captureFirst:"\u274C First capture a protection area",protectionStarted:"\u{1F6E1}\uFE0F Protection started - monitoring area",protectionStopped:"\u23F9\uFE0F Protection stopped",noChanges:"\u2705 Protected area - no changes detected",changesDetected:"\u{1F6A8} {count} changes detected in protected area",repairing:"\u{1F6E0}\uFE0F Repairing {count} altered pixels...",repairedSuccess:"\u2705 Successfully repaired {count} pixels",repairError:"\u274C Error repairing pixels: {error}",noCharges:"\u26A0\uFE0F Insufficient charges to repair changes",checkingChanges:"\u{1F50D} Checking changes in protected area...",errorChecking:"\u274C Error checking changes: {error}",guardActive:"\u{1F6E1}\uFE0F Guardian active - area under protection",lastCheck:"Last check: {time}",nextCheck:"Next check in: {time}s",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Guard-BOT auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",manualInitRequired:"\u{1F527} Manual initialization required",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",selectUpperLeft:"\u{1F3AF} Paint a pixel at the UPPER LEFT corner of the area to protect",selectLowerRight:"\u{1F3AF} Now paint a pixel at the LOWER RIGHT corner of the area",waitingUpperLeft:"\u{1F446} Waiting for upper left corner selection...",waitingLowerRight:"\u{1F446} Waiting for lower right corner selection...",upperLeftCaptured:"\u2705 Upper left corner captured: ({x}, {y})",lowerRightCaptured:"\u2705 Lower right corner captured: ({x}, {y})",selectionTimeout:"\u274C Selection timeout",selectionError:"\u274C Selection error, please try again",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close",analysisTitle:"Difference Analysis - JSON vs Current Canvas",correctPixels:"Correct Pixels",incorrectPixels:"Incorrect Pixels",missingPixels:"Missing Pixels",showCorrect:"Show Correct",showIncorrect:"Show Incorrect",showMissing:"Show Missing",autoRefresh:"Auto-refresh",zoomAdjusted:"Zoom automatically adjusted to",autoRefreshEnabled:"Auto-refresh enabled every",autoRefreshDisabled:"Auto-refresh disabled",autoRefreshIntervalUpdated:"Auto-refresh interval updated to",visualizationUpdated:"Visualization updated",configTitle:"Guard Configuration",protectionPatterns:"Protection Patterns",preferSpecificColor:"Prioritize specific color",excludeSpecificColors:"Don't repair specific colors",loadManagement:"Load Management",minLoadsToWait:"Minimum loads to wait",pixelsPerBatch:"Pixels per batch",spendAllPixelsOnStart:"Spend all pixels on start",waitTimes:"Wait Times",useRandomTimes:"Use random times between batches",minTime:"Minimum time (s)",maxTime:"Maximum time (s)"}}});var at,nt=X(()=>{at={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",userName:"Usager",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",showOverlay:"Afficher l'overlay",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 D\xE9lai d\u2019attente du serveur, nouvelle tentative...",protectionEnabled:"Protection activ\xE9e",protectionDisabled:"Protection d\xE9sactiv\xE9e",paintPattern:"Motif de peinture",patternLinearStart:"Lin\xE9aire (D\xE9but)",patternLinearEnd:"Lin\xE9aire (Fin)",patternRandom:"Al\xE9atoire",patternCenterOut:"Centre vers l\u2019ext\xE9rieur",patternCornersFirst:"Coins d\u2019abord",patternSpiral:"Spirale",solid:"Plein",stripes:"Rayures",checkerboard:"Damier",gradient:"D\xE9grad\xE9",dots:"Points",waves:"Vagues",spiral:"Spirale",mosaic:"Mosa\xEFque",bricks:"Briques",zigzag:"Zigzag",protectingDrawing:"Protection du dessin...",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans le dessin",repairing:"\u{1F527} R\xE9paration de {count} pixels modifi\xE9s...",repairCompleted:"\u2705 R\xE9paration termin\xE9e : {count} pixels",noChargesForRepair:"\u26A1 Pas de frais pour la r\xE9paration, en attente...",protectionPriority:"\u{1F6E1}\uFE0F Priorit\xE9 \xE0 la protection activ\xE9e",patternApplied:"Motif appliqu\xE9",customPattern:"Motif personnalis\xE9",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialiser Guard-BOT",selectArea:"S\xE9lectionner Zone",captureArea:"Capturer Zone",startProtection:"D\xE9marrer Protection",stopProtection:"Arr\xEAter Protection",upperLeft:"Coin Sup\xE9rieur Gauche",lowerRight:"Coin Inf\xE9rieur Droit",protectedPixels:"Pixels Prot\xE9g\xE9s",detectedChanges:"Changements D\xE9tect\xE9s",repairedPixels:"Pixels R\xE9par\xE9s",charges:"Charges",waitingInit:"En attente d'initialisation...",checkingColors:"\u{1F3A8} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Aucune couleur trouv\xE9e. Ouvrez la palette de couleurs sur le site.",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",initSuccess:"\u2705 Guard-BOT initialis\xE9 avec succ\xE8s",initError:"\u274C Erreur lors de l'initialisation de Guard-BOT",invalidCoords:"\u274C Coordonn\xE9es invalides",invalidArea:"\u274C La zone doit avoir le coin sup\xE9rieur gauche inf\xE9rieur au coin inf\xE9rieur droit",areaTooLarge:"\u274C Zone trop grande: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capture de la zone de protection...",areaCaptured:"\u2705 Zone captur\xE9e: {count} pixels sous protection",captureError:"\u274C Erreur lors de la capture de zone: {error}",captureFirst:"\u274C Capturez d'abord une zone de protection",protectionStarted:"\u{1F6E1}\uFE0F Protection d\xE9marr\xE9e - surveillance de la zone",protectionStopped:"\u23F9\uFE0F Protection arr\xEAt\xE9e",noChanges:"\u2705 Zone prot\xE9g\xE9e - aucun changement d\xE9tect\xE9",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans la zone prot\xE9g\xE9e",repairing:"\u{1F6E0}\uFE0F R\xE9paration de {count} pixels alt\xE9r\xE9s...",repairedSuccess:"\u2705 {count} pixels r\xE9par\xE9s avec succ\xE8s",repairError:"\u274C Erreur lors de la r\xE9paration des pixels: {error}",noCharges:"\u26A0\uFE0F Charges insuffisantes pour r\xE9parer les changements",checkingChanges:"\u{1F50D} V\xE9rification des changements dans la zone prot\xE9g\xE9e...",errorChecking:"\u274C Erreur lors de la v\xE9rification des changements: {error}",guardActive:"\u{1F6E1}\uFE0F Gardien actif - zone sous protection",lastCheck:"Derni\xE8re v\xE9rification: {time}",nextCheck:"Prochaine v\xE9rification dans: {time}s",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Guard-BOT d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",manualInitRequired:"\u{1F527} Initialisation manuelle requise",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",selectUpperLeft:"\u{1F3AF} Peignez un pixel au coin SUP\xC9RIEUR GAUCHE de la zone \xE0 prot\xE9ger",selectLowerRight:"\u{1F3AF} Maintenant peignez un pixel au coin INF\xC9RIEUR DROIT de la zone",waitingUpperLeft:"\u{1F446} En attente de la s\xE9lection du coin sup\xE9rieur gauche...",waitingLowerRight:"\u{1F446} En attente de la s\xE9lection du coin inf\xE9rieur droit...",upperLeftCaptured:"\u2705 Coin sup\xE9rieur gauche captur\xE9: ({x}, {y})",lowerRightCaptured:"\u2705 Coin inf\xE9rieur droit captur\xE9: ({x}, {y})",selectionTimeout:"\u274C D\xE9lai de s\xE9lection d\xE9pass\xE9",selectionError:"\u274C Erreur de s\xE9lection, veuillez r\xE9essayer",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer",analysisTitle:"Analyse des Diff\xE9rences - JSON vs Canvas Actuel",correctPixels:"Pixels Corrects",incorrectPixels:"Pixels Incorrects",missingPixels:"Pixels Manquants",showCorrect:"Afficher Corrects",showIncorrect:"Afficher Incorrects",showMissing:"Afficher Manquants",autoRefresh:"Actualisation automatique",zoomAdjusted:"Zoom ajust\xE9 automatiquement \xE0",autoRefreshEnabled:"Actualisation automatique activ\xE9e toutes les",autoRefreshDisabled:"Actualisation automatique d\xE9sactiv\xE9e",autoRefreshIntervalUpdated:"Intervalle d'actualisation automatique mis \xE0 jour \xE0",visualizationUpdated:"Visualisation mise \xE0 jour",configTitle:"Configuration du Guard",protectionPatterns:"Mod\xE8les de Protection",preferSpecificColor:"Prioriser une couleur sp\xE9cifique",excludeSpecificColors:"Ne pas r\xE9parer les couleurs sp\xE9cifiques",loadManagement:"Gestion des Charges",minLoadsToWait:"Minimum de charges \xE0 attendre",pixelsPerBatch:"Pixels par lot",spendAllPixelsOnStart:"D\xE9penser tous les pixels au d\xE9marrage",waitTimes:"Temps d'Attente",useRandomTimes:"Utiliser des temps al\xE9atoires entre les lots",minTime:"Temps minimum (s)",maxTime:"Temps maximum (s)"}}});var rt,st=X(()=>{rt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",autoImage:"\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",autoGuard:"\u{1F6E1}\uFE0F \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",selection:"\u0412\u044B\u0431\u0440\u0430\u043D\u043E",user:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",charges:"\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",backend:"\u0411\u044D\u043A\u0435\u043D\u0434",database:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",uptime:"\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",launch:"\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",executing:"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",downloading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",chooseBot:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",readyToLaunch:"\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",loadError:"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",loadErrorMsg:"\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",checking:"\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",online:"\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",offline:"\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",ok:"\u{1F7E2} \u041E\u041A",error:"\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",unknown:"-",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},image:{title:"WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",uploadImage:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",resizeImage:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",startPainting:"\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",stopPainting:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",saveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",loadProgress:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",checkingColors:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",loadingImage:"\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",imageLoaded:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",imageError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPositionAlert:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",positionDetected:"\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",positionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",startPaintingMsg:"\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",paintingProgress:"\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",noCharges:"\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",paintingStopped:"\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",paintingComplete:"\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",paintingError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",missingRequirements:"\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",progress:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",userName:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",pixels:"\u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",estimatedTime:"\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",initMessage:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",resizeSuccess:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",paintingPaused:"\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",batchSize:"\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",nextBatchTime:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437",useAllCharges:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",showOverlay:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435",maxCharges:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",waitingForCharges:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",timeRemaining:"\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",cooldownWaiting:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",progressSaved:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",progressLoaded:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",progressLoadError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",progressSaveError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",confirmSaveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",saveProgressTitle:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",discardProgress:"\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",minimize:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",width:"\u0428\u0438\u0440\u0438\u043D\u0430",height:"\u0412\u044B\u0441\u043E\u0442\u0430",keepAspect:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",apply:"\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",overlayOn:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u041A\u041B",overlayOff:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u042B\u041A\u041B",passCompleted:"\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",waitingChargesRegen:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",waitingChargesCountdown:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",retryAttempt:"\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryError:"\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryFailed:"\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",networkError:"\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",serverError:"\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",timeoutError:"\u23F0 \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",protectionEnabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430",protectionDisabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",paintPattern:"\u0428\u0430\u0431\u043B\u043E\u043D \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",patternLinearStart:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043D\u0430\u0447\u0430\u043B\u043E)",patternLinearEnd:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043A\u043E\u043D\u0435\u0446)",patternRandom:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",patternCenterOut:"\u0418\u0437 \u0446\u0435\u043D\u0442\u0440\u0430 \u043D\u0430\u0440\u0443\u0436\u0443",patternCornersFirst:"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0433\u043B\u044B",patternSpiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",solid:"\u0421\u043F\u043B\u043E\u0448\u043D\u043E\u0439",stripes:"\u041F\u043E\u043B\u043E\u0441\u044B",checkerboard:"\u0428\u0430\u0445\u043C\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u043A\u0430",gradient:"\u0413\u0440\u0430\u0434\u0438\u0435\u043D\u0442",dots:"\u0422\u043E\u0447\u043A\u0438",waves:"\u0412\u043E\u043B\u043D\u044B",spiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",mosaic:"\u041C\u043E\u0437\u0430\u0438\u043A\u0430",bricks:"\u041A\u0438\u0440\u043F\u0438\u0447\u0438",zigzag:"\u0417\u0438\u0433\u0437\u0430\u0433",protectingDrawing:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0438\u0441\u0443\u043D\u043A\u0430...",changesDetected:"\u{1F6A8} \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {count}",repairing:"\u{1F527} \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairCompleted:"\u2705 \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",noChargesForRepair:"\u26A1 \u041A\u043E\u043C\u0438\u0441\u0441\u0438\u0439 \u0437\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435\u0442, \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435...",protectionPriority:"\u{1F6E1}\uFE0F \u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u044B \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D",patternApplied:"\u0428\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D",customPattern:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0448\u0430\u0431\u043B\u043E\u043D",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},farm:{title:"WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",stopped:"\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",calibrate:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",paintOnce:"\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",checkingStatus:"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",configuration:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",delay:"\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",minCharges:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",colorMode:"\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",random:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",fixed:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",range:"\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",fixedColor:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",advanced:"\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",tileX:"\u041F\u043B\u0438\u0442\u043A\u0430 X",tileY:"\u041F\u043B\u0438\u0442\u043A\u0430 Y",customPalette:"\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",paletteExample:"\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",capture:"\u0417\u0430\u0445\u0432\u0430\u0442",painted:"\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",retries:"\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",tile:"\u041F\u043B\u0438\u0442\u043A\u0430",configSaved:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",configLoaded:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",configReset:"\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",captureInstructions:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",backendOnline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",backendOffline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u0444\u043B\u0430\u0439\u043D",startingBot:"\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",stoppingBot:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",calibrating:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",alreadyRunning:"\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",imageRunningWarning:"\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C",selectPositionAlert:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",missingPosition:"\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",farmRadius:"\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",positionInfo:"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",farmingInRadius:"\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",selectEmptyArea:"\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",noPosition:"\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",currentZone:"\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},common:{yes:"\u0414\u0430",no:"\u041D\u0435\u0442",ok:"\u041E\u041A",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",load:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",edit:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",pause:"\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",resume:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",reset:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",help:"\u041F\u043E\u043C\u043E\u0449\u044C",about:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",language:"\u042F\u0437\u044B\u043A",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",error:"\u041E\u0448\u0438\u0431\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",info:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",languageChanged:"\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"},guard:{title:"WPlace \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Guard-BOT",selectArea:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",captureArea:"\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",startProtection:"\u041D\u0430\u0447\u0430\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",stopProtection:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",upperLeft:"\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u041B\u0435\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",lowerRight:"\u041D\u0438\u0436\u043D\u0438\u0439 \u041F\u0440\u0430\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",protectedPixels:"\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",detectedChanges:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0435 \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",repairedPixels:"\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",checkingColors:"\u{1F3A8} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u0426\u0432\u0435\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435.",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",initSuccess:"\u2705 Guard-BOT \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D",initError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 Guard-BOT",invalidCoords:"\u274C \u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B",invalidArea:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430",areaTooLarge:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F: {size} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 (\u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C: {max})",capturingArea:"\u{1F4F8} \u0417\u0430\u0445\u0432\u0430\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0437\u0430\u0449\u0438\u0442\u044B...",areaCaptured:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D\u0430: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",captureError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438: {error}",captureFirst:"\u274C \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u044B",protectionStarted:"\u{1F6E1}\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430 - \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",protectionStopped:"\u23F9\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",noChanges:"\u2705 \u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C - \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E",changesDetected:"\u{1F6A8} {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",repairing:"\u{1F6E0}\uFE0F \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairedSuccess:"\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",repairError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439: {error}",noCharges:"\u26A0\uFE0F \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439",checkingChanges:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438...",errorChecking:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {error}",guardActive:"\u{1F6E1}\uFE0F \u0421\u0442\u0440\u0430\u0436 \u0430\u043A\u0442\u0438\u0432\u0435\u043D - \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",lastCheck:"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: {time}",nextCheck:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u0440\u0435\u0437: {time}\u0441",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 Guard-BOT \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",selectUpperLeft:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0412\u0415\u0420\u0425\u041D\u0415\u041C \u041B\u0415\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B",selectLowerRight:"\u{1F3AF} \u0422\u0435\u043F\u0435\u0440\u044C \u043D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041D\u0418\u0416\u041D\u0415\u041C \u041F\u0420\u0410\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",waitingUpperLeft:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u043B\u0435\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",waitingLowerRight:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",upperLeftCaptured:"\u2705 \u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",lowerRightCaptured:"\u2705 \u041D\u0438\u0436\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",selectionTimeout:"\u274C \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430",selectionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",analysisTitle:"\u0410\u043D\u0430\u043B\u0438\u0437 \u0420\u0430\u0437\u043B\u0438\u0447\u0438\u0439 - JSON vs \u0422\u0435\u043A\u0443\u0449\u0438\u0439 Canvas",correctPixels:"\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",incorrectPixels:"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",missingPixels:"\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",showCorrect:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435",showIncorrect:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435",showMissing:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435",autoRefresh:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",zoomAdjusted:"\u041C\u0430\u0441\u0448\u0442\u0430\u0431 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u043D\u0430",autoRefreshEnabled:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043A\u0430\u0436\u0434\u044B\u0435",autoRefreshDisabled:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E",autoRefreshIntervalUpdated:"\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0430\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D \u0434\u043E",visualizationUpdated:"\u0412\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430",configTitle:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F Guard",protectionPatterns:"\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u0417\u0430\u0449\u0438\u0442\u044B",preferSpecificColor:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0446\u0432\u0435\u0442\u0430",excludeSpecificColors:"\u041D\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u0446\u0432\u0435\u0442\u0430",loadManagement:"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u041D\u0430\u0433\u0440\u0443\u0437\u043A\u043E\u0439",minLoadsToWait:"\u041C\u0438\u043D\u0438\u043C\u0443\u043C \u0437\u0430\u0433\u0440\u0443\u0437\u043E\u043A \u0434\u043B\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0430\u0440\u0442\u0438\u044E",spendAllPixelsOnStart:"\u041F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u0438 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435",waitTimes:"\u0412\u0440\u0435\u043C\u044F \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u044F",useRandomTimes:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u043C\u0435\u0436\u0434\u0443 \u043F\u0430\u0440\u0442\u0438\u044F\u043C\u0438",minTime:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F (\u0441)",maxTime:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F (\u0441)"}}});var lt,ct=X(()=>{lt={launcher:{title:"WPlace \u81EA\u52A8\u673A\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52A8\u519C\u573A",autoImage:"\u{1F3A8} \u81EA\u52A8\u7ED8\u56FE",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52A8\u5B88\u62A4",selection:"\u9009\u62E9",user:"\u7528\u6237",charges:"\u6B21\u6570",backend:"\u540E\u7AEF",database:"\u6570\u636E\u5E93",uptime:"\u8FD0\u884C\u65F6\u95F4",close:"\u5173\u95ED",launch:"\u542F\u52A8",loading:"\u52A0\u8F7D\u4E2D\u2026",executing:"\u6267\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F7D\u811A\u672C\u2026",chooseBot:"\u9009\u62E9\u4E00\u4E2A\u673A\u5668\u4EBA\u5E76\u70B9\u51FB\u542F\u52A8",readyToLaunch:"\u51C6\u5907\u542F\u52A8",loadError:"\u52A0\u8F7D\u9519\u8BEF",loadErrorMsg:"\u65E0\u6CD5\u52A0\u8F7D\u6240\u9009\u673A\u5668\u4EBA\u3002\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6216\u91CD\u8BD5\u3002",checking:"\u{1F504} \u68C0\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7EBF",offline:"\u{1F534} \u79BB\u7EBF",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u9519\u8BEF",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},image:{title:"WPlace \u81EA\u52A8\u7ED8\u56FE",initBot:"\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA",uploadImage:"\u4E0A\u4F20\u56FE\u7247",resizeImage:"\u8C03\u6574\u56FE\u7247\u5927\u5C0F",selectPosition:"\u9009\u62E9\u4F4D\u7F6E",startPainting:"\u5F00\u59CB\u7ED8\u5236",stopPainting:"\u505C\u6B62\u7ED8\u5236",saveProgress:"\u4FDD\u5B58\u8FDB\u5EA6",loadProgress:"\u52A0\u8F7D\u8FDB\u5EA6",checkingColors:"\u{1F50D} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u540E\u91CD\u8BD5\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F7D\u56FE\u7247...",imageLoaded:"\u2705 \u56FE\u7247\u5DF2\u52A0\u8F7D\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u4E2A",imageError:"\u274C \u56FE\u7247\u52A0\u8F7D\u5931\u8D25",selectPositionAlert:"\u8BF7\u5728\u4F60\u60F3\u5F00\u59CB\u7ED8\u5236\u7684\u5730\u65B9\u6D82\u7B2C\u4E00\u4E2A\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8BBE\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9009\u62E9\u8D85\u65F6",positionDetected:"\u{1F3AF} \u5DF2\u68C0\u6D4B\u5230\u4F4D\u7F6E\uFF0C\u5904\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u68C0\u6D4B\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",startPaintingMsg:"\u{1F3A8} \u5F00\u59CB\u7ED8\u5236...",paintingProgress:"\u{1F9F1} \u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6CA1\u6709\u6B21\u6570\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7ED8\u5236",paintingComplete:"\u2705 \u7ED8\u5236\u5B8C\u6210\uFF01\u5171\u7ED8\u5236 {count} \u4E2A\u50CF\u7D20\u3002",paintingError:"\u274C \u7ED8\u5236\u8FC7\u7A0B\u4E2D\u51FA\u9519",missingRequirements:"\u274C \u8BF7\u5148\u52A0\u8F7D\u56FE\u7247\u5E76\u9009\u62E9\u4F4D\u7F6E",progress:"\u8FDB\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6570",estimatedTime:"\u9884\u8BA1\u65F6\u95F4",initMessage:"\u70B9\u51FB\u201C\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA\u201D\u5F00\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u56FE\u7247\u5DF2\u8C03\u6574\u4E3A {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7ED8\u5236\u6682\u505C\u4E8E\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u65F6\u95F4",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6570",showOverlay:"\u663E\u793A\u8986\u76D6\u5C42",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6570",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed}",timeRemaining:"\u5269\u4F59\u65F6\u95F4",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u540E\u7EE7\u7EED...",progressSaved:"\u2705 \u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u4E3A {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F7D\u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7ED8\u5236",progressLoadError:"\u274C \u52A0\u8F7D\u8FDB\u5EA6\u5931\u8D25: {error}",progressSaveError:"\u274C \u4FDD\u5B58\u8FDB\u5EA6\u5931\u8D25: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u5F53\u524D\u8FDB\u5EA6\u5417\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u8FDB\u5EA6",discardProgress:"\u653E\u5F03",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BBD\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7EB5\u6A2A\u6BD4",apply:"\u5E94\u7528",overlayOn:"\u8986\u76D6\u5C42: \u5F00\u542F",overlayOff:"\u8986\u76D6\u5C42: \u5173\u95ED",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7ED8\u5236 {painted} \u50CF\u7D20 | \u8FDB\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6570\u6062\u590D: {current}/{needed} - \u65F6\u95F4: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed} - \u5269\u4F59: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8BD5 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5C1D\u8BD5\u51FA\u9519\uFF0C\u5C06\u5728 {delay} \u79D2\u540E\u91CD\u8BD5...",retryFailed:"\u274C \u8D85\u8FC7 {maxAttempts} \u6B21\u5C1D\u8BD5\u5931\u8D25\u3002\u7EE7\u7EED\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7F51\u7EDC\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",serverError:"\u{1F525} \u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",timeoutError:"\u23F0 \u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u6B63\u5728\u91CD\u8BD5...",protectionEnabled:"\u5DF2\u5F00\u542F\u4FDD\u62A4",protectionDisabled:"\u5DF2\u5173\u95ED\u4FDD\u62A4",paintPattern:"\u7ED8\u5236\u6A21\u5F0F",patternLinearStart:"\u7EBF\u6027\uFF08\u8D77\u70B9\uFF09",patternLinearEnd:"\u7EBF\u6027\uFF08\u7EC8\u70B9\uFF09",patternRandom:"\u968F\u673A",patternCenterOut:"\u4ECE\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5B9E\u5FC3",stripes:"\u6761\u7EB9",checkerboard:"\u68CB\u76D8\u683C",gradient:"\u6E10\u53D8",dots:"\u70B9\u72B6",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u9A6C\u8D5B\u514B",bricks:"\u7816\u5757",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u62A4\u56FE\u7A3F...",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u5904\u66F4\u6539",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u66F4\u6539\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u590D\u5B8C\u6210\uFF1A{count} \u4E2A\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u590D\u4E0D\u6D88\u8017\u70B9\u6570\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u542F\u7528\u4FDD\u62A4\u4F18\u5148",patternApplied:"\u5DF2\u5E94\u7528\u6A21\u5F0F",customPattern:"\u81EA\u5B9A\u4E49\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},farm:{title:"WPlace \u519C\u573A\u673A\u5668\u4EBA",start:"\u5F00\u59CB",stop:"\u505C\u6B62",stopped:"\u673A\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u51C6",paintOnce:"\u4E00\u6B21",checkingStatus:"\u68C0\u67E5\u72B6\u6001\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u8FDF (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6570",colorMode:"\u989C\u8272\u6A21\u5F0F",random:"\u968F\u673A",fixed:"\u56FA\u5B9A",range:"\u8303\u56F4",fixedColor:"\u56FA\u5B9A\u989C\u8272",advanced:"\u9AD8\u7EA7",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u4E49\u8C03\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u83B7",painted:"\u5DF2\u7ED8\u5236",charges:"\u6B21\u6570",retries:"\u91CD\u8BD5",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F7D",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8BF7\u624B\u52A8\u7ED8\u5236\u4E00\u4E2A\u50CF\u7D20\u4EE5\u6355\u83B7\u5750\u6807...",backendOnline:"\u540E\u7AEF\u5728\u7EBF",backendOffline:"\u540E\u7AEF\u79BB\u7EBF",startingBot:"\u6B63\u5728\u542F\u52A8\u673A\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u673A\u5668\u4EBA...",calibrating:"\u6821\u51C6\u4E2D...",alreadyRunning:"\u81EA\u52A8\u519C\u573A\u5DF2\u5728\u8FD0\u884C\u3002",imageRunningWarning:"\u81EA\u52A8\u7ED8\u56FE\u6B63\u5728\u8FD0\u884C\uFF0C\u8BF7\u5148\u5173\u95ED\u518D\u542F\u52A8\u81EA\u52A8\u519C\u573A\u3002",selectPosition:"\u9009\u62E9\u533A\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u56FE\u7684\u7A7A\u767D\u533A\u57DF\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u533A\u57DF\u8BBE\u7F6E\u6210\u529F\uFF01\u534A\u5F84: 500px",positionTimeout:"\u274C \u533A\u57DF\u9009\u62E9\u8D85\u65F6",missingPosition:"\u274C \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF08\u4F7F\u7528\u201C\u9009\u62E9\u533A\u57DF\u201D\u6309\u94AE\uFF09",farmRadius:"\u519C\u573A\u534A\u5F84",positionInfo:"\u5F53\u524D\u533A\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F84 {radius}px \u5728 ({x},{y}) \u519C\u573A",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8BF7\u9009\u62E9\u7A7A\u767D\u533A\u57DF\u4EE5\u907F\u514D\u51B2\u7A81",noPosition:"\u672A\u9009\u62E9\u533A\u57DF",currentZone:"\u533A\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF0C\u5728\u5730\u56FE\u4E0A\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},common:{yes:"\u662F",no:"\u5426",ok:"\u786E\u8BA4",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",save:"\u4FDD\u5B58",load:"\u52A0\u8F7D",delete:"\u5220\u9664",edit:"\u7F16\u8F91",start:"\u5F00\u59CB",stop:"\u505C\u6B62",pause:"\u6682\u505C",resume:"\u7EE7\u7EED",reset:"\u91CD\u7F6E",settings:"\u8BBE\u7F6E",help:"\u5E2E\u52A9",about:"\u5173\u4E8E",language:"\u8BED\u8A00",loading:"\u52A0\u8F7D\u4E2D...",error:"\u9519\u8BEF",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8BED\u8A00\u5DF2\u5207\u6362\u4E3A {language}"},guard:{title:"WPlace \u81EA\u52A8\u5B88\u62A4",initBot:"\u521D\u59CB\u5316\u5B88\u62A4\u673A\u5668\u4EBA",selectArea:"\u9009\u62E9\u533A\u57DF",captureArea:"\u6355\u83B7\u533A\u57DF",startProtection:"\u5F00\u59CB\u5B88\u62A4",stopProtection:"\u505C\u6B62\u5B88\u62A4",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u62A4\u50CF\u7D20",detectedChanges:"\u68C0\u6D4B\u5230\u7684\u53D8\u5316",repairedPixels:"\u4FEE\u590D\u7684\u50CF\u7D20",charges:"\u6B21\u6570",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u989C\u8272\uFF0C\u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",initSuccess:"\u2705 \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u5931\u8D25",invalidCoords:"\u274C \u5750\u6807\u65E0\u6548",invalidArea:"\u274C \u533A\u57DF\u65E0\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u987B\u5C0F\u4E8E\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u533A\u57DF\u8FC7\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u83B7\u5B88\u62A4\u533A\u57DF\u4E2D...",areaCaptured:"\u2705 \u533A\u57DF\u6355\u83B7\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u62A4",captureError:"\u274C \u6355\u83B7\u533A\u57DF\u51FA\u9519: {error}",captureFirst:"\u274C \u8BF7\u5148\u6355\u83B7\u4E00\u4E2A\u5B88\u62A4\u533A\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u62A4\u5DF2\u542F\u52A8 - \u533A\u57DF\u76D1\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u62A4\u5DF2\u505C\u6B62",noChanges:"\u2705 \u533A\u57DF\u5B89\u5168 - \u672A\u68C0\u6D4B\u5230\u53D8\u5316",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u4E2A\u53D8\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u590D {count} \u4E2A\u50CF\u7D20",repairError:"\u274C \u4FEE\u590D\u51FA\u9519: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4FEE\u590D",checkingChanges:"\u{1F50D} \u6B63\u5728\u68C0\u67E5\u533A\u57DF\u53D8\u5316...",errorChecking:"\u274C \u68C0\u67E5\u51FA\u9519: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u62A4\u4E2D - \u533A\u57DF\u53D7\u4FDD\u62A4",lastCheck:"\u4E0A\u6B21\u68C0\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u68C0\u67E5: {time} \u79D2\u540E",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u62A4\u533A\u57DF\u7684\u5DE6\u4E0A\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73B0\u5728\u5728\u53F3\u4E0B\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u83B7\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u83B7\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9009\u62E9\u8D85\u65F6",selectionError:"\u274C \u9009\u62E9\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED",analysisTitle:"\u5DEE\u5F02\u5206\u6790 - JSON vs \u5F53\u524D\u753B\u5E03",correctPixels:"\u6B63\u786E\u50CF\u7D20",incorrectPixels:"\u9519\u8BEF\u50CF\u7D20",missingPixels:"\u7F3A\u5931\u50CF\u7D20",showCorrect:"\u663E\u793A\u6B63\u786E",showIncorrect:"\u663E\u793A\u9519\u8BEF",showMissing:"\u663E\u793A\u7F3A\u5931",autoRefresh:"\u81EA\u52A8\u5237\u65B0",zoomAdjusted:"\u7F29\u653E\u81EA\u52A8\u8C03\u6574\u4E3A",autoRefreshEnabled:"\u81EA\u52A8\u5237\u65B0\u5DF2\u542F\u7528\uFF0C\u95F4\u9694",autoRefreshDisabled:"\u81EA\u52A8\u5237\u65B0\u5DF2\u7981\u7528",autoRefreshIntervalUpdated:"\u81EA\u52A8\u5237\u65B0\u95F4\u9694\u5DF2\u66F4\u65B0\u4E3A",visualizationUpdated:"\u53EF\u89C6\u5316\u5DF2\u66F4\u65B0",configTitle:"Guard\u914D\u7F6E",protectionPatterns:"\u4FDD\u62A4\u6A21\u5F0F",preferSpecificColor:"\u4F18\u5148\u7279\u5B9A\u989C\u8272",excludeSpecificColors:"\u4E0D\u4FEE\u590D\u7279\u5B9A\u989C\u8272",loadManagement:"\u8D1F\u8F7D\u7BA1\u7406",minLoadsToWait:"\u7B49\u5F85\u7684\u6700\u5C0F\u8D1F\u8F7D\u6570",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",spendAllPixelsOnStart:"\u542F\u52A8\u65F6\u6D88\u8017\u6240\u6709\u50CF\u7D20",waitTimes:"\u7B49\u5F85\u65F6\u95F4",useRandomTimes:"\u6279\u6B21\u95F4\u4F7F\u7528\u968F\u673A\u65F6\u95F4",minTime:"\u6700\u5C0F\u65F6\u95F4 (\u79D2)",maxTime:"\u6700\u5927\u65F6\u95F4 (\u79D2)"}}});var dt,ut=X(()=>{dt={launcher:{title:"WPlace \u81EA\u52D5\u6A5F\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52D5\u8FB2\u5834",autoImage:"\u{1F3A8} \u81EA\u52D5\u7E6A\u5716",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52D5\u5B88\u8B77",selection:"\u9078\u64C7",user:"\u7528\u6237",charges:"\u6B21\u6578",backend:"\u5F8C\u7AEF",database:"\u6578\u64DA\u5EAB",uptime:"\u904B\u884C\u6642\u9593",close:"\u95DC\u9589",launch:"\u5553\u52D5",loading:"\u52A0\u8F09\u4E2D\u2026",executing:"\u57F7\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F09\u8173\u672C\u2026",chooseBot:"\u9078\u64C7\u4E00\u500B\u6A5F\u5668\u4EBA\u4E26\u9EDE\u64CA\u5553\u52D5",readyToLaunch:"\u6E96\u5099\u5553\u52D5",loadError:"\u52A0\u8F09\u932F\u8AA4",loadErrorMsg:"\u7121\u6CD5\u52A0\u8F09\u6240\u9078\u6A5F\u5668\u4EBA\u3002\u8ACB\u6AA2\u67E5\u7DB2\u7D61\u9023\u63A5\u6216\u91CD\u8A66\u3002",checking:"\u{1F504} \u6AA2\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7DDA",offline:"\u{1F534} \u96E2\u7DDA",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u932F\u8AA4",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},image:{title:"WPlace \u81EA\u52D5\u7E6A\u5716",initBot:"\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA",uploadImage:"\u4E0A\u50B3\u5716\u7247",resizeImage:"\u8ABF\u6574\u5716\u7247\u5927\u5C0F",selectPosition:"\u9078\u64C7\u4F4D\u7F6E",startPainting:"\u958B\u59CB\u7E6A\u88FD",stopPainting:"\u505C\u6B62\u7E6A\u88FD",saveProgress:"\u4FDD\u5B58\u9032\u5EA6",loadProgress:"\u52A0\u8F09\u9032\u5EA6",checkingColors:"\u{1F50D} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u5F8C\u91CD\u8A66\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F09\u5716\u7247...",imageLoaded:"\u2705 \u5716\u7247\u5DF2\u52A0\u8F09\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u500B",imageError:"\u274C \u5716\u7247\u52A0\u8F09\u5931\u6557",selectPositionAlert:"\u8ACB\u5728\u4F60\u60F3\u958B\u59CB\u7E6A\u88FD\u7684\u5730\u65B9\u5857\u7B2C\u4E00\u500B\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8A2D\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9078\u64C7\u8D85\u6642",positionDetected:"\u{1F3AF} \u5DF2\u6AA2\u6E2C\u5230\u4F4D\u7F6E\uFF0C\u8655\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u6AA2\u6E2C\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66",startPaintingMsg:"\u{1F3A8} \u958B\u59CB\u7E6A\u88FD...",paintingProgress:"\u{1F9F1} \u9032\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6C92\u6709\u6B21\u6578\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7E6A\u88FD",paintingComplete:"\u2705 \u7E6A\u88FD\u5B8C\u6210\uFF01\u5171\u7E6A\u88FD {count} \u500B\u50CF\u7D20\u3002",paintingError:"\u274C \u7E6A\u88FD\u904E\u7A0B\u4E2D\u51FA\u932F",missingRequirements:"\u274C \u8ACB\u5148\u52A0\u8F09\u5716\u7247\u4E26\u9078\u64C7\u4F4D\u7F6E",progress:"\u9032\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6578",estimatedTime:"\u9810\u8A08\u6642\u9593",initMessage:"\u9EDE\u64CA\u201C\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA\u201D\u958B\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u5716\u7247\u5DF2\u8ABF\u6574\u70BA {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7E6A\u88FD\u66AB\u505C\u65BC\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u6642\u9593",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6578",showOverlay:"\u986F\u793A\u8986\u84CB\u5C64",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6578",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed}",timeRemaining:"\u5269\u9918\u6642\u9593",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u5F8C\u7E7C\u7E8C...",progressSaved:"\u2705 \u9032\u5EA6\u5DF2\u4FDD\u5B58\u70BA {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F09\u9032\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7E6A\u88FD",progressLoadError:"\u274C \u52A0\u8F09\u9032\u5EA6\u5931\u6557: {error}",progressSaveError:"\u274C \u4FDD\u5B58\u9032\u5EA6\u5931\u6557: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u7576\u524D\u9032\u5EA6\u55CE\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u9032\u5EA6",discardProgress:"\u653E\u68C4",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BEC\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7E31\u6A6B\u6BD4",apply:"\u61C9\u7528",overlayOn:"\u8986\u84CB\u5C64: \u958B\u5553",overlayOff:"\u8986\u84CB\u5C64: \u95DC\u9589",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7E6A\u88FD {painted} \u50CF\u7D20 | \u9032\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6578\u6062\u5FA9: {current}/{needed} - \u6642\u9593: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed} - \u5269\u9918: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8A66 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5617\u8A66\u51FA\u932F\uFF0C\u5C07\u5728 {delay} \u79D2\u5F8C\u91CD\u8A66...",retryFailed:"\u274C \u8D85\u904E {maxAttempts} \u6B21\u5617\u8A66\u5931\u6557\u3002\u7E7C\u7E8C\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7DB2\u7D61\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",serverError:"\u{1F525} \u670D\u52D9\u5668\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",timeoutError:"\u23F0 \u4F3A\u670D\u5668\u903E\u6642\uFF0C\u6B63\u5728\u91CD\u8A66...",protectionEnabled:"\u5DF2\u555F\u7528\u4FDD\u8B77",protectionDisabled:"\u5DF2\u505C\u7528\u4FDD\u8B77",paintPattern:"\u7E6A\u88FD\u6A21\u5F0F",patternLinearStart:"\u7DDA\u6027\uFF08\u8D77\u9EDE\uFF09",patternLinearEnd:"\u7DDA\u6027\uFF08\u7D42\u9EDE\uFF09",patternRandom:"\u96A8\u6A5F",patternCenterOut:"\u7531\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5BE6\u5FC3",stripes:"\u689D\u7D0B",checkerboard:"\u68CB\u76E4\u683C",gradient:"\u6F38\u5C64",dots:"\u9EDE\u72C0",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u99AC\u8CFD\u514B",bricks:"\u78DA\u584A",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u8B77\u7E6A\u5716...",changesDetected:"\u{1F6A8} \u5075\u6E2C\u5230 {count} \u8655\u8B8A\u66F4",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u8B8A\u66F4\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u5FA9\u5B8C\u6210\uFF1A{count} \u500B\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u5FA9\u4E0D\u6D88\u8017\u9EDE\u6578\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u555F\u7528\u4FDD\u8B77\u512A\u5148",patternApplied:"\u5DF2\u5957\u7528\u6A21\u5F0F",customPattern:"\u81EA\u8A02\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},farm:{title:"WPlace \u8FB2\u5834\u6A5F\u5668\u4EBA",start:"\u958B\u59CB",stop:"\u505C\u6B62",stopped:"\u6A5F\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u6E96",paintOnce:"\u4E00\u6B21",checkingStatus:"\u6AA2\u67E5\u72C0\u614B\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u9072 (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6578",colorMode:"\u984F\u8272\u6A21\u5F0F",random:"\u96A8\u6A5F",fixed:"\u56FA\u5B9A",range:"\u7BC4\u570D",fixedColor:"\u56FA\u5B9A\u984F\u8272",advanced:"\u9AD8\u7D1A",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u7FA9\u8ABF\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u7372",painted:"\u5DF2\u7E6A\u88FD",charges:"\u6B21\u6578",retries:"\u91CD\u8A66",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F09",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8ACB\u624B\u52D5\u7E6A\u88FD\u4E00\u500B\u50CF\u7D20\u4EE5\u6355\u7372\u5EA7\u6A19...",backendOnline:"\u5F8C\u7AEF\u5728\u7DDA",backendOffline:"\u5F8C\u7AEF\u96E2\u7DDA",startingBot:"\u6B63\u5728\u5553\u52D5\u6A5F\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u6A5F\u5668\u4EBA...",calibrating:"\u6821\u6E96\u4E2D...",alreadyRunning:"\u81EA\u52D5\u8FB2\u5834\u5DF2\u5728\u904B\u884C\u3002",imageRunningWarning:"\u81EA\u52D5\u7E6A\u5716\u6B63\u5728\u904B\u884C\uFF0C\u8ACB\u5148\u95DC\u9589\u518D\u5553\u52D5\u81EA\u52D5\u8FB2\u5834\u3002",selectPosition:"\u9078\u64C7\u5340\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u5716\u7684\u7A7A\u767D\u5340\u57DF\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u5340\u57DF\u8A2D\u7F6E\u6210\u529F\uFF01\u534A\u5F91: 500px",positionTimeout:"\u274C \u5340\u57DF\u9078\u64C7\u8D85\u6642",missingPosition:"\u274C \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF08\u4F7F\u7528\u201C\u9078\u64C7\u5340\u57DF\u201D\u6309\u9215\uFF09",farmRadius:"\u8FB2\u5834\u534A\u5F91",positionInfo:"\u7576\u524D\u5340\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F91 {radius}px \u5728 ({x},{y}) \u8FB2\u5834",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8ACB\u9078\u64C7\u7A7A\u767D\u5340\u57DF\u4EE5\u907F\u514D\u885D\u7A81",noPosition:"\u672A\u9078\u64C7\u5340\u57DF",currentZone:"\u5340\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF0C\u5728\u5730\u5716\u4E0A\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},common:{yes:"\u662F",no:"\u5426",ok:"\u78BA\u8A8D",cancel:"\u53D6\u6D88",close:"\u95DC\u9589",save:"\u4FDD\u5B58",load:"\u52A0\u8F09",delete:"\u522A\u9664",edit:"\u7DE8\u8F2F",start:"\u958B\u59CB",stop:"\u505C\u6B62",pause:"\u66AB\u505C",resume:"\u7E7C\u7E8C",reset:"\u91CD\u7F6E",settings:"\u8A2D\u7F6E",help:"\u5E6B\u52A9",about:"\u95DC\u65BC",language:"\u8A9E\u8A00",loading:"\u52A0\u8F09\u4E2D...",error:"\u932F\u8AA4",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8A9E\u8A00\u5DF2\u5207\u63DB\u70BA {language}"},guard:{title:"WPlace \u81EA\u52D5\u5B88\u8B77",initBot:"\u521D\u59CB\u5316\u5B88\u8B77\u6A5F\u5668\u4EBA",selectArea:"\u9078\u64C7\u5340\u57DF",captureArea:"\u6355\u7372\u5340\u57DF",startProtection:"\u958B\u59CB\u5B88\u8B77",stopProtection:"\u505C\u6B62\u5B88\u8B77",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u8B77\u50CF\u7D20",detectedChanges:"\u6AA2\u6E2C\u5230\u7684\u8B8A\u5316",repairedPixels:"\u4FEE\u5FA9\u7684\u50CF\u7D20",charges:"\u6B21\u6578",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u984F\u8272\uFF0C\u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",initSuccess:"\u2705 \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u5931\u6557",invalidCoords:"\u274C \u5EA7\u6A19\u7121\u6548",invalidArea:"\u274C \u5340\u57DF\u7121\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u9808\u5C0F\u65BC\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u5340\u57DF\u904E\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u7372\u5B88\u8B77\u5340\u57DF\u4E2D...",areaCaptured:"\u2705 \u5340\u57DF\u6355\u7372\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u8B77",captureError:"\u274C \u6355\u7372\u5340\u57DF\u51FA\u932F: {error}",captureFirst:"\u274C \u8ACB\u5148\u6355\u7372\u4E00\u500B\u5B88\u8B77\u5340\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u8B77\u5DF2\u5553\u52D5 - \u5340\u57DF\u76E3\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u8B77\u5DF2\u505C\u6B62",noChanges:"\u2705 \u5340\u57DF\u5B89\u5168 - \u672A\u6AA2\u6E2C\u5230\u8B8A\u5316",changesDetected:"\u{1F6A8} \u6AA2\u6E2C\u5230 {count} \u500B\u8B8A\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20",repairError:"\u274C \u4FEE\u5FA9\u51FA\u932F: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6578\u4E0D\u8DB3\uFF0C\u7121\u6CD5\u4FEE\u5FA9",checkingChanges:"\u{1F50D} \u6B63\u5728\u6AA2\u67E5\u5340\u57DF\u8B8A\u5316...",errorChecking:"\u274C \u6AA2\u67E5\u51FA\u932F: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u8B77\u4E2D - \u5340\u57DF\u53D7\u4FDD\u8B77",lastCheck:"\u4E0A\u6B21\u6AA2\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u6AA2\u67E5: {time} \u79D2\u5F8C",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u8B77\u5340\u57DF\u7684\u5DE6\u4E0A\u89D2\u5857\u4E00\u500B\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73FE\u5728\u5728\u53F3\u4E0B\u89D2\u5857\u4E00\u500B\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u7372\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u7372\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9078\u64C7\u8D85\u6642",selectionError:"\u274C \u9078\u64C7\u51FA\u932F\uFF0C\u8ACB\u91CD\u8A66",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589",analysisTitle:"\u5DEE\u7570\u5206\u6790 - JSON vs \u7576\u524D\u756B\u5E03",correctPixels:"\u6B63\u78BA\u50CF\u7D20",incorrectPixels:"\u932F\u8AA4\u50CF\u7D20",missingPixels:"\u7F3A\u5931\u50CF\u7D20",showCorrect:"\u986F\u793A\u6B63\u78BA",showIncorrect:"\u986F\u793A\u932F\u8AA4",showMissing:"\u986F\u793A\u7F3A\u5931",autoRefresh:"\u81EA\u52D5\u5237\u65B0",zoomAdjusted:"\u7E2E\u653E\u81EA\u52D5\u8ABF\u6574\u70BA",autoRefreshEnabled:"\u81EA\u52D5\u5237\u65B0\u5DF2\u555F\u7528\uFF0C\u9593\u9694",autoRefreshDisabled:"\u81EA\u52D5\u5237\u65B0\u5DF2\u7981\u7528",autoRefreshIntervalUpdated:"\u81EA\u52D5\u5237\u65B0\u9593\u9694\u5DF2\u66F4\u65B0\u70BA",visualizationUpdated:"\u8996\u89BA\u5316\u5DF2\u66F4\u65B0",configTitle:"Guard\u914D\u7F6E",protectionPatterns:"\u4FDD\u8B77\u6A21\u5F0F",preferSpecificColor:"\u512A\u5148\u7279\u5B9A\u984F\u8272",excludeSpecificColors:"\u4E0D\u4FEE\u5FA9\u7279\u5B9A\u984F\u8272",loadManagement:"\u8CA0\u8F09\u7BA1\u7406",minLoadsToWait:"\u7B49\u5F85\u7684\u6700\u5C0F\u8CA0\u8F09\u6578",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",spendAllPixelsOnStart:"\u555F\u52D5\u6642\u6D88\u8017\u6240\u6709\u50CF\u7D20",waitTimes:"\u7B49\u5F85\u6642\u9593",useRandomTimes:"\u6279\u6B21\u9593\u4F7F\u7528\u96A8\u6A5F\u6642\u9593",minTime:"\u6700\u5C0F\u6642\u9593 (\u79D2)",maxTime:"\u6700\u5927\u6642\u9593 (\u79D2)"}}});function qt(){let e=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return ae[e]?e:"es"}function Ut(){return null}function ze(){let t=Ut(),e=qt(),r="es";return t&&ae[t]?r=t:e&&ae[e]&&(r=e),Xt(r),r}function Xt(t){if(!ae[t]){console.warn(`Idioma '${t}' no disponible. Usando '${be}'`);return}be=t,se=ae[t],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:t,translations:se}}))}function gt(){return be}function A(t,e={}){let r=t.split("."),d=se;for(let n of r)if(d&&typeof d=="object"&&n in d)d=d[n];else return console.warn(`Clave de traducci\xF3n no encontrada: '${t}'`),t;return typeof d!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${t}'`),t):Gt(d,e)}function Gt(t,e){return!e||Object.keys(e).length===0?t:t.replace(/\{(\w+)\}/g,(r,d)=>e[d]!==void 0?e[d]:r)}function we(t){return se[t]?se[t]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${t}'`),{})}var ae,be,se,ye=X(()=>{tt();it();nt();st();ct();ut();ae={es:et,en:ot,fr:at,ru:rt,zhHans:lt,zhHant:dt},be="es",se=ae[be];ze()});var pt={};Qe(pt,{IMAGE_DEFAULTS:()=>J,TEXTS:()=>jt,getImageText:()=>Ht,getImageTexts:()=>_e,imageState:()=>o});function _e(){return we("image")}function Ht(t,e={}){let d=_e()[t]||t;return e&&Object.keys(e).length>0&&(d=d.replace(/\{(\w+)\}/g,(n,s)=>e[s]!==void 0?e[s]:n)),d}var J,jt,o,le=X(()=>{ye();J={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};jt={get es(){return console.warn("TEXTS.es est\xE1 deprecated. Usa getImageTexts() en su lugar."),_e()}},o={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:J.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:J.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:9999,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0,paintPattern:"linear_start"}});var We={};Qe(We,{PAINT_PATTERNS:()=>q,applyPaintPattern:()=>Ne,getPatternName:()=>Oe,sortPixelsByPattern:()=>wt});function Oe(t){return{[q.LINEAR_START]:"Lineal (Inicio)",[q.LINEAR_END]:"Lineal (Final)",[q.RANDOM]:"Aleatorio",[q.CENTER_OUT]:"Centro hacia afuera",[q.CORNERS_FIRST]:"Esquinas primero",[q.SPIRAL]:"Espiral"}[t]||t}function wt(t,e,r,d){if(!t||t.length===0)return t;a(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${Oe(e)} (${t.length} p\xEDxeles)`);let n=[...t];switch(e){case q.LINEAR_START:return bt(n);case q.LINEAR_END:return ro(n);case q.RANDOM:return so(n);case q.CENTER_OUT:return lo(n,r,d);case q.CORNERS_FIRST:return co(n,r,d);case q.SPIRAL:return uo(n,r,d);default:return a(`\u26A0\uFE0F Patr\xF3n desconocido: ${e}, usando linear_start`),bt(n)}}function bt(t){return t.sort((e,r)=>{let d=e.imageY!==void 0?e.imageY:e.y,n=r.imageY!==void 0?r.imageY:r.y,s=e.imageX!==void 0?e.imageX:e.x,u=r.imageX!==void 0?r.imageX:r.x;return d!==n?d-n:s-u})}function ro(t){return t.sort((e,r)=>{let d=e.imageY!==void 0?e.imageY:e.y,n=r.imageY!==void 0?r.imageY:r.y,s=e.imageX!==void 0?e.imageX:e.x,u=r.imageX!==void 0?r.imageX:r.x;return d!==n?n-d:u-s})}function so(t){for(let e=t.length-1;e>0;e--){let r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t}function lo(t,e,r){let d=e/2,n=r/2;return t.sort((s,u)=>{let i=s.imageX!==void 0?s.imageX:s.x,l=s.imageY!==void 0?s.imageY:s.y,c=u.imageX!==void 0?u.imageX:u.x,g=u.imageY!==void 0?u.imageY:u.y,m=Math.sqrt(Math.pow(i-d,2)+Math.pow(l-n,2)),h=Math.sqrt(Math.pow(c-d,2)+Math.pow(g-n,2));return m-h})}function co(t,e,r){let d=[{x:0,y:0},{x:e-1,y:0},{x:0,y:r-1},{x:e-1,y:r-1}];return t.sort((n,s)=>{let u=n.imageX!==void 0?n.imageX:n.x,i=n.imageY!==void 0?n.imageY:n.y,l=s.imageX!==void 0?s.imageX:s.x,c=s.imageY!==void 0?s.imageY:s.y,g=Math.min(...d.map(h=>Math.sqrt(Math.pow(u-h.x,2)+Math.pow(i-h.y,2)))),m=Math.min(...d.map(h=>Math.sqrt(Math.pow(l-h.x,2)+Math.pow(c-h.y,2))));return g-m})}function uo(t,e,r){let d=new Map,n=0,s=0,u=e-1,i=0,l=r-1;for(;s<=u&&i<=l;){for(let c=s;c<=u;c++)d.set(`${c},${i}`,n++);i++;for(let c=i;c<=l;c++)d.set(`${u},${c}`,n++);if(u--,i<=l){for(let c=u;c>=s;c--)d.set(`${c},${l}`,n++);l--}if(s<=u){for(let c=l;c>=i;c--)d.set(`${s},${c}`,n++);s++}}return t.sort((c,g)=>{let m=c.imageX!==void 0?c.imageX:c.x,h=c.imageY!==void 0?c.imageY:c.y,y=g.imageX!==void 0?g.imageX:g.x,x=g.imageY!==void 0?g.imageY:g.y,p=d.get(`${m},${h}`)||Number.MAX_SAFE_INTEGER,b=d.get(`${y},${x}`)||Number.MAX_SAFE_INTEGER;return p-b})}function Ne(t,e,r){if(!t||t.length===0)return t;let d=(r==null?void 0:r.width)||100,n=(r==null?void 0:r.height)||100,s=wt(t,e,d,n);return a(`\u2705 Patr\xF3n aplicado: ${Oe(e)} a ${s.length} p\xEDxeles`),s}var q,Se=X(()=>{D();q={LINEAR_START:"linear_start",LINEAR_END:"linear_end",RANDOM:"random",CENTER_OUT:"center_out",CORNERS_FIRST:"corners_first",SPIRAL:"spiral"}});D();le();D();D();var G=class t{static _rgbToLab(e,r,d){let n=w=>(w/=255,w<=.04045?w/12.92:Math.pow((w+.055)/1.055,2.4)),s=n(e),u=n(r),i=n(d),l=s*.4124+u*.3576+i*.1805,c=s*.2126+u*.7152+i*.0722,g=s*.0193+u*.1192+i*.9505;l/=.95047,c/=1,g/=1.08883;let m=w=>w>.008856?Math.cbrt(w):7.787*w+16/116,h=m(l),y=m(c),x=m(g),p=116*y-16,b=500*(h-y),f=200*(y-x);return[p,b,f]}static _lab(e,r,d){t._labCache||(t._labCache=new Map);let n=e<<16|r<<8|d,s=t._labCache.get(n);return s||(s=t._rgbToLab(e,r,d),t._labCache.set(n,s)),s}static findClosestPaletteColor(e,r,d,n,s={}){var m,h,y,x,p,b;if(!n||n.length===0)return null;let{useLegacyRgb:u=!1,chromaPenalty:i=0,whiteThreshold:l=240}=s;if(e>=l&&r>=l&&d>=l){let f=n.find(w=>{var C,S,T;let L=w.r||((C=w.rgb)==null?void 0:C.r)||0,E=w.g||((S=w.rgb)==null?void 0:S.g)||0,v=w.b||((T=w.rgb)==null?void 0:T.b)||0;return L>=l&&E>=l&&v>=l});if(f)return f}let c=null,g=1/0;if(u)for(let f of n){let w=f.r||((m=f.rgb)==null?void 0:m.r)||0,L=f.g||((h=f.rgb)==null?void 0:h.g)||0,E=f.b||((y=f.rgb)==null?void 0:y.b)||0,v=Math.sqrt(Math.pow(e-w,2)+Math.pow(r-L,2)+Math.pow(d-E,2));v<g&&(g=v,c=f)}else{let f=t._lab(e,r,d);for(let w of n){let L=w.r||((x=w.rgb)==null?void 0:x.r)||0,E=w.g||((p=w.rgb)==null?void 0:p.g)||0,v=w.b||((b=w.rgb)==null?void 0:b.b)||0,C=t._lab(L,E,v),S=Math.sqrt(Math.pow(f[0]-C[0],2)+Math.pow(f[1]-C[1],2)+Math.pow(f[2]-C[2],2));if(i>0){let T=Math.sqrt(f[1]*f[1]+f[2]*f[2]),I=Math.sqrt(C[1]*C[1]+C[2]*C[2]),z=Math.abs(T-I);S+=z*i}S<g&&(g=S,c=w)}}return c}static findClosestColor(e,r,d={}){return t.findClosestPaletteColor(e.r,e.g,e.b,r,d)}static clearCache(){t._labCache&&(t._labCache.clear(),a("Cach\xE9 de colores LAB limpiada"))}static getCacheStats(){return t._labCache?{size:t._labCache.size,memoryEstimate:t._labCache.size*32}:{size:0,memoryEstimate:0}}},Yo=G.findClosestColor.bind(G),qo=G.findClosestPaletteColor.bind(G);D();function ce(){a("\u{1F3A8} Detectando colores disponibles...");let t=document.querySelectorAll('[id^="color-"]'),e=[];for(let r of t){if(r.querySelector("svg"))continue;let d=r.id.replace("color-",""),n=parseInt(d);if(n===0)continue;let s=r.style.backgroundColor;if(s){let u=s.match(/\d+/g);if(u&&u.length>=3){let i={r:parseInt(u[0]),g:parseInt(u[1]),b:parseInt(u[2])};e.push({id:n,element:r,...i}),a(`Color detectado: id=${n}, rgb(${i.r},${i.g},${i.b})`)}}}return a(`\u2705 ${e.length} colores disponibles detectados`),e}var Pe=class{constructor(e){this.imageSrc=e,this.img=new window.Image,this.originalName=null,this.tileSize=1e3,this.drawMult=3,this.shreadSize=3,this.bitmap=null,this.imageWidth=0,this.imageHeight=0,this.totalPixels=0,this.requiredPixelCount=0,this.defacePixelCount=0,this.colorPalette={},this.allowedColorsSet=new Set,this.rgbToMeta=new Map,this.coords=[0,0,0,0],this.templateTiles={},this.templateTilesBuffers={},this.tilePrefixes=new Set,this.selectedColors=null,this.allSiteColors=[],this.initialAllowedColorsSet=null,this.allowedColors=[]}async load(){return new Promise((e,r)=>{this.img.onload=async()=>{try{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,a(`[BLUE MARBLE] Imagen cargada: ${this.imageWidth}\xD7${this.imageHeight}`),e()}catch(d){r(d)}},this.img.onerror=r,this.img.src=this.imageSrc})}initializeColorPalette(){a("[BLUE MARBLE] Inicializando paleta de colores...");let e=ce(),r=e.filter(n=>n.id!==void 0&&typeof n.r=="number"&&typeof n.g=="number"&&typeof n.b=="number");this.allowedColorsSet=new Set(r.map(n=>`${n.r},${n.g},${n.b}`));let d="222,250,206";return this.allowedColorsSet.add(d),this.rgbToMeta=new Map(r.map(n=>[`${n.r},${n.g},${n.b}`,{id:n.id,premium:!!n.premium,name:n.name||`Color ${n.id}`}])),this.rgbToMeta.set(d,{id:0,premium:!1,name:"Transparent"}),this.allSiteColors=r.map(n=>({r:n.r,g:n.g,b:n.b,id:n.id,name:n.name,premium:!!n.premium})),this.initialAllowedColorsSet=new Set(this.allowedColorsSet),this.allowedColors=[...this.allSiteColors],a(`[BLUE MARBLE] Paleta inicializada: ${this.allowedColorsSet.size} colores permitidos`),Array.from(e)}detectSiteColors(){let e=document.querySelectorAll('[id^="color-"]'),r=[];for(let d of e){let n=d.id.replace("color-",""),s=parseInt(n);if(d.querySelector("svg")||s===0)continue;let u=d.style.backgroundColor;if(u){let i=u.match(/\d+/g);if(i&&i.length>=3){let l=[parseInt(i[0]),parseInt(i[1]),parseInt(i[2])],c={id:s,element:d,rgb:l,name:d.title||d.getAttribute("aria-label")||`Color ${s}`,premium:d.classList.contains("premium")||d.querySelector(".premium")};r.push(c)}}}return a(`[BLUE MARBLE] ${r.length} colores detectados del sitio`),r}setCoords(e,r,d,n){this.coords=[e,r,d,n]}async analyzePixels(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");try{let r=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1,r.clearRect(0,0,this.imageWidth,this.imageHeight),r.drawImage(this.bitmap,0,0);let d=r.getImageData(0,0,this.imageWidth,this.imageHeight).data,n=0,s=0,u=new Map;for(let l=0;l<this.imageHeight;l++)for(let c=0;c<this.imageWidth;c++){let g=(l*this.imageWidth+c)*4,m=d[g],h=d[g+1],y=d[g+2];if(d[g+3]===0)continue;let p=`${m},${h},${y}`;m===222&&h===250&&y===206&&s++;let b=p,f=this.allowedColorsSet.has(p);if(!f&&this.allowedColors&&this.allowedColors.length>0){let w=G.findClosestPaletteColor(m,h,y,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});w&&(b=`${w.r},${w.g},${w.b}`,f=!0)}f&&(n++,u.set(b,(u.get(b)||0)+1))}this.requiredPixelCount=n,this.defacePixelCount=s;let i={};for(let[l,c]of u.entries())i[l]={count:c,enabled:!0};return this.colorPalette=i,a(`[BLUE MARBLE] An\xE1lisis: ${n.toLocaleString()} p\xEDxeles, ${u.size} colores`),{totalPixels:this.totalPixels,requiredPixels:n,defacePixels:s,uniqueColors:u.size,colorPalette:i}}catch{return this.requiredPixelCount=Math.max(0,this.totalPixels),this.defacePixelCount=0,{totalPixels:this.totalPixels,requiredPixels:this.totalPixels,defacePixels:0,uniqueColors:0,colorPalette:{}}}}async createTemplateTiles(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");let e={},r={},d=new OffscreenCanvas(this.tileSize,this.tileSize),n=d.getContext("2d",{willReadFrequently:!0});for(let s=this.coords[3];s<this.imageHeight+this.coords[3];){let u=Math.min(this.tileSize-s%this.tileSize,this.imageHeight-(s-this.coords[3]));for(let i=this.coords[2];i<this.imageWidth+this.coords[2];){let l=Math.min(this.tileSize-i%this.tileSize,this.imageWidth-(i-this.coords[2])),c=l*this.shreadSize,g=u*this.shreadSize;d.width=c,d.height=g,n.imageSmoothingEnabled=!1,n.clearRect(0,0,c,g),n.drawImage(this.bitmap,i-this.coords[2],s-this.coords[3],l,u,0,0,l*this.shreadSize,u*this.shreadSize);let m=n.getImageData(0,0,c,g);for(let p=0;p<g;p++)for(let b=0;b<c;b++){let f=(p*c+b)*4;if(m.data[f]===222&&m.data[f+1]===250&&m.data[f+2]===206)(b+p)%2===0?(m.data[f]=0,m.data[f+1]=0,m.data[f+2]=0):(m.data[f]=255,m.data[f+1]=255,m.data[f+2]=255),m.data[f+3]=32;else if(b%this.shreadSize!==1||p%this.shreadSize!==1)m.data[f+3]=0;else{let w=m.data[f],L=m.data[f+1],E=m.data[f+2];this.allowedColorsSet.has(`${w},${L},${E}`)||(m.data[f+3]=0)}}n.putImageData(m,0,0);let h=`${(this.coords[0]+Math.floor(i/1e3)).toString().padStart(4,"0")},${(this.coords[1]+Math.floor(s/1e3)).toString().padStart(4,"0")},${(i%1e3).toString().padStart(3,"0")},${(s%1e3).toString().padStart(3,"0")}`;e[h]=await createImageBitmap(d),this.tilePrefixes.add(h.split(",").slice(0,2).join(","));let x=await(await d.convertToBlob()).arrayBuffer();r[h]=x,i+=l}s+=u}return this.templateTiles=e,this.templateTilesBuffers=r,a(`[BLUE MARBLE] ${Object.keys(e).length} tiles creados`),{templateTiles:e,templateTilesBuffers:r}}generatePixelQueue(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");a(`[BLUE MARBLE DEBUG] allowedColorsSet size: ${this.allowedColorsSet?this.allowedColorsSet.size:"undefined"}`),a(`[BLUE MARBLE DEBUG] allowedColors length: ${this.allowedColors?this.allowedColors.length:"undefined"}`),this.allowedColorsSet&&this.allowedColorsSet.size>0&&a(`[BLUE MARBLE DEBUG] Primeros colores permitidos: ${Array.from(this.allowedColorsSet).slice(0,5).join(", ")}`);let e=[],r=this.coords[0]*1e3+(this.coords[2]||0),d=this.coords[1]*1e3+(this.coords[3]||0),s=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});s.imageSmoothingEnabled=!1,s.drawImage(this.bitmap,0,0);let u=s.getImageData(0,0,this.imageWidth,this.imageHeight).data,i=0,l=0,c=0,g=0,m=0,h=0;for(let y=0;y<this.imageHeight;y++)for(let x=0;x<this.imageWidth;x++){i++;let p=(y*this.imageWidth+x)*4,b=u[p],f=u[p+1],w=u[p+2],L=u[p+3];if(L===0){l++;continue}if(b===222&&f===250&&w===206){c++;continue}let E=`${b},${f},${w}`,v=E,C=b,S=f,T=w,I=this.allowedColorsSet.has(E);if(I)g++;else if(this.allowedColors&&this.allowedColors.length>0){let F=G.findClosestPaletteColor(b,f,w,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});F&&(C=F.r,S=F.g,T=F.b,v=`${C},${S},${T}`,I=!0,m++)}if(!I){h++;continue}let z=r+x,$=d+y,K=Math.floor(z/1e3),M=Math.floor($/1e3),_=z%1e3,B=$%1e3,j=this.rgbToMeta.get(v)||{id:0,name:"Unknown"};e.push({imageX:x,imageY:y,globalX:z,globalY:$,tileX:K,tileY:M,localX:_,localY:B,color:{r:C,g:S,b:T,id:j.id,name:j.name},originalColor:{r:C,g:S,b:T,alpha:L}})}return a("[BLUE MARBLE DEBUG] Estad\xEDsticas de procesamiento:"),a(`[BLUE MARBLE DEBUG] - Total p\xEDxeles procesados: ${i}`),a(`[BLUE MARBLE DEBUG] - P\xEDxeles transparentes: ${l}`),a(`[BLUE MARBLE DEBUG] - P\xEDxeles #deface: ${c}`),a(`[BLUE MARBLE DEBUG] - Coincidencias exactas: ${g}`),a(`[BLUE MARBLE DEBUG] - Coincidencias LAB: ${m}`),a(`[BLUE MARBLE DEBUG] - P\xEDxeles inv\xE1lidos: ${h}`),a(`[BLUE MARBLE DEBUG] - Cola final: ${e.length} p\xEDxeles`),a(`[BLUE MARBLE] Cola: ${e.length} p\xEDxeles`),e}async resize(e,r,d=!0){if(!this.img)throw new Error("Imagen no cargada. Llama a load() primero.");let n=this.img.width,s=this.img.height;if(d){let c=n/s;e/r>c?e=r*c:r=e/c}let u=document.createElement("canvas");u.width=e,u.height=r;let i=u.getContext("2d");i.imageSmoothingEnabled=!1,i.drawImage(this.img,0,0,e,r);let l=u.toDataURL();return this.img.src=l,this.imageSrc=l,await new Promise(c=>{this.img.onload=async()=>{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,c()}}),a(`[BLUE MARBLE] Imagen redimensionada: ${n}\xD7${s} \u2192 ${this.imageWidth}\xD7${this.imageHeight}`),{width:this.imageWidth,height:this.imageHeight}}getImageData(){return{width:this.imageWidth,height:this.imageHeight,totalPixels:this.totalPixels,requiredPixels:this.requiredPixelCount,defacePixels:this.defacePixelCount,colorPalette:this.colorPalette,coords:[...this.coords],originalName:this.originalName||"image.png",pixels:this.generatePixelQueue()}}generatePreview(e=200,r=200){if(!this.img)return null;let d=document.createElement("canvas"),n=d.getContext("2d"),{width:s,height:u}=this.img,i=s/u,l,c;return e/r>i?(c=r,l=r*i):(l=e,c=e/i),d.width=l,d.height=c,n.imageSmoothingEnabled=!1,n.drawImage(this.img,0,0,l,c),d.toDataURL()}getDimensions(){return{width:this.imageWidth,height:this.imageHeight}}setSelectedColors(e){this.selectedColors=e,e&&e.length>0?(this.allowedColorsSet=new Set(e.map(r=>r.id)),this.colorPalette={},e.forEach(r=>{this.colorPalette[r.id]=r.rgb}),a(`\u{1F3A8} [BLUE MARBLE] Paleta actualizada con ${e.length} colores seleccionados`),this.imageDataCache=null):a("\u{1F3A8} [BLUE MARBLE] Usando todos los colores disponibles")}};D();var Q=t=>new Promise(e=>setTimeout(e,t));D();var ee=null,De=0,Me=!1,de=null,mt=new Promise(t=>{de=t}),Vt=24e4,O=null,H=null,ve=null,Ee=null,W=null;function Ce(t){de&&(de(t),de=null),ee=t,De=Date.now()+Vt,a("\u2705 Turnstile token set successfully")}function ue(){return ee&&Date.now()<De}function ht(){ee=null,De=0,a("\u{1F5D1}\uFE0F Token invalidated, will force fresh generation")}async function ge(t=!1){if(ue()&&!t)return ee;if(t&&ht(),Me)return a("\u{1F504} Token generation already in progress, waiting..."),await Y(2e3),ue()?ee:null;Me=!0;try{a("\u{1F504} Token expired or missing, generating new one...");let e=await Jt();if(e&&e.length>20)return Ce(e),a("\u2705 Token captured and cached successfully"),e;a("\u26A0\uFE0F Invisible Turnstile failed, forcing browser automation...");let r=await no();return r&&r.length>20?(Ce(r),a("\u2705 Fallback token captured successfully"),r):(a("\u274C All token generation methods failed"),null)}finally{Me=!1}}async function Jt(){let t=Date.now();try{let e=ao();a("\u{1F511} Generating Turnstile token for sitekey:",e),typeof window!="undefined"&&window.navigator&&a("\u{1F9ED} UA:",window.navigator.userAgent,"Platform:",window.navigator.platform);let r=await Zt(e);if(r&&r.length>20){let d=Math.round(Date.now()-t);return a(`\u2705 Turnstile token generated successfully in ${d}ms`),r}else throw new Error("Invalid or empty token received")}catch(e){let r=Math.round(Date.now()-t);throw a(`\u274C Turnstile token generation failed after ${r}ms:`,e),e}}async function Zt(t){return eo(t,"paint")}async function Kt(){return window.turnstile?Promise.resolve():new Promise((t,e)=>{if(document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')){let d=()=>{window.turnstile?t():setTimeout(d,100)};return d()}let r=document.createElement("script");r.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",r.async=!0,r.defer=!0,r.onload=()=>{a("\u2705 Turnstile script loaded successfully"),t()},r.onerror=()=>{a("\u274C Failed to load Turnstile script"),e(new Error("Failed to load Turnstile"))},document.head.appendChild(r)})}function Qt(){return(!H||!document.body.contains(H))&&(H&&H.remove(),H=document.createElement("div"),H.style.cssText=`
      position: fixed !important;
      left: -9999px !important; /* keep off-screen for invisible mode */
      top: -9999px !important;
      width: 300px !important;
      height: 65px !important;
      pointer-events: none !important;
      opacity: 0 !important; /* do not use visibility:hidden to avoid engine quirks */
      z-index: -1 !important;
    `,H.setAttribute("aria-hidden","true"),H.id="turnstile-widget-container",document.body.appendChild(H)),H}function ft(){if(ve&&document.body.contains(ve))return ve;let t=document.createElement("div");t.id="turnstile-overlay-container",t.style.cssText=`
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
  `;let e=document.createElement("div");e.textContent="Cloudflare Turnstile \u2014 please complete the check if shown",e.style.cssText='font: 600 12px/1.3 "Segoe UI",sans-serif; margin-bottom: 8px; opacity: 0.9;';let r=document.createElement("div");r.id="turnstile-overlay-host",r.style.cssText="width: 100%; min-height: 70px;";let d=document.createElement("button");return d.textContent="Hide",d.style.cssText="position:absolute; top:6px; right:6px; font-size:11px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:2px 6px; cursor:pointer;",d.addEventListener("click",()=>t.remove()),t.appendChild(e),t.appendChild(r),t.appendChild(d),document.body.appendChild(t),ve=t,t}async function eo(t,e="paint"){var s,u;if(await Kt(),O&&Ee===t&&((s=window.turnstile)!=null&&s.execute))try{a("\u{1F504} Reusing existing Turnstile widget...");let i=await Promise.race([window.turnstile.execute(O,{action:e}),new Promise((l,c)=>setTimeout(()=>c(new Error("Execute timeout")),15e3))]);if(i&&i.length>20)return a("\u2705 Token generated via widget reuse"),i}catch(i){a("\u{1F504} Widget reuse failed, will create a fresh widget:",i.message)}let r=await to(t,e);if(r&&r.length>20)return r;a("\u{1F440} Falling back to interactive Turnstile (visible).");let d=3,n=[1e4,15e3,3e4];for(let i=1;i<=d;i++){let l=n[i-1];a(`\u{1F504} Intento ${i}/${d} de resoluci\xF3n autom\xE1tica del CAPTCHA (timeout: ${l/1e3}s)...`),i===2?a(`\u2139\uFE0F Primer intento fall\xF3. Reintentando autom\xE1ticamente (2/${d})...`):i===3&&a(`\u2139\uFE0F Segundo intento fall\xF3. \xDAltimo reintento autom\xE1tico (3/${d})...`);try{if(O&&((u=window.turnstile)!=null&&u.remove))try{window.turnstile.remove(O),O=null}catch{}let c=await io(t,e,i<d,l);if(c&&c.length>20)return a(`\u2705 CAPTCHA resuelto exitosamente en el intento ${i}`),c;i<d&&(a(`\u26A0\uFE0F Intento ${i} fall\xF3, reintentando en 2 segundos...`),await Y(2e3))}catch(c){a(`\u274C Error en intento ${i}:`,c.message),i<d&&await Y(2e3)}}return a("\u{1F6A8} Todos los intentos autom\xE1ticos fallaron, mostrando ventana manual..."),await oo(t,e)}async function to(t,e){return new Promise(r=>{var d;try{if(O&&((d=window.turnstile)!=null&&d.remove))try{window.turnstile.remove(O)}catch{}let n=Qt();n.innerHTML="";let s=window.turnstile.render(n,{sitekey:t,action:e,size:"invisible",retry:"auto","retry-interval":8e3,callback:u=>{a("\u2705 Invisible Turnstile callback"),r(u)},"error-callback":()=>r(null),"timeout-callback":()=>r(null)});if(O=s,Ee=t,!s)return r(null);Promise.race([window.turnstile.execute(s,{action:e}),new Promise((u,i)=>setTimeout(()=>i(new Error("Invisible execute timeout")),12e3))]).then(r).catch(()=>r(null))}catch(n){a("Invisible Turnstile failed:",n),r(null)}})}async function oo(t,e){return new Promise((r,d)=>{var n;try{if(O&&((n=window.turnstile)!=null&&n.remove))try{window.turnstile.remove(O)}catch{}let s=ft(),u=s.querySelector("#turnstile-overlay-host");u.innerHTML="";let i=setTimeout(()=>{a("\u23F0 Interactive Turnstile timed out"),r(null)},12e4),l=window.turnstile.render(u,{sitekey:t,action:e,size:"normal",retry:"auto","retry-interval":8e3,callback:c=>{clearTimeout(i);try{s.remove()}catch{}a("\u2705 Interactive Turnstile solved"),r(c)},"error-callback":c=>{a("\u{1F6A8} Interactive Turnstile error:",c)},"timeout-callback":()=>{a("\u23F0 Turnstile timeout callback (interactive)")},"expired-callback":()=>{a("\u26A0\uFE0F Interactive Turnstile token expired")}});if(O=l,Ee=t,!l){clearTimeout(i),r(null);return}}catch(s){a("\u274C Error creating interactive Turnstile widget:",s),d(s)}})}async function io(t,e,r=!0,d=3e4){return new Promise((n,s)=>{var u;try{if(O&&((u=window.turnstile)!=null&&u.remove))try{window.turnstile.remove(O)}catch{}let i=ft(),l=i.querySelector("#turnstile-overlay-host");l.innerHTML="";let g=setTimeout(()=>{a(`\u23F0 Interactive Turnstile timed out (${r?"auto-retry":"manual"})`);try{i.remove()}catch{}n(null)},r?d:12e4),m=window.turnstile.render(l,{sitekey:t,action:e,size:"normal",retry:"auto","retry-interval":r?3e3:8e3,callback:h=>{clearTimeout(g);try{i.remove()}catch{}a(`\u2705 Interactive Turnstile solved (${r?"auto-retry":"manual"})`),n(h)},"error-callback":h=>{if(a(`\u{1F6A8} Interactive Turnstile error (${r?"auto-retry":"manual"}):`,h),r){clearTimeout(g);try{i.remove()}catch{}n(null)}},"timeout-callback":()=>{if(a(`\u23F0 Turnstile timeout callback (${r?"auto-retry":"manual"})`),r){clearTimeout(g);try{i.remove()}catch{}n(null)}},"expired-callback":()=>{if(a(`\u26A0\uFE0F Interactive Turnstile token expired (${r?"auto-retry":"manual"})`),r){clearTimeout(g);try{i.remove()}catch{}n(null)}}});if(O=m,Ee=t,!m){clearTimeout(g);try{i.remove()}catch{}n(null);return}}catch(i){a(`\u274C Error creating interactive Turnstile widget (${r?"auto-retry":"manual"}):`,i),s(i)}})}function ao(t="0x4AAAAAABpqJe8FO0N84q0F"){var e;if(W)return W;try{let r=document.querySelector("[data-sitekey]");if(r){let s=r.getAttribute("data-sitekey");if(s&&s.length>10)return W=s,a("\u{1F50D} Sitekey detected from data attribute:",s),s}let d=document.querySelector(".cf-turnstile");if((e=d==null?void 0:d.dataset)!=null&&e.sitekey&&d.dataset.sitekey.length>10)return W=d.dataset.sitekey,a("\u{1F50D} Sitekey detected from turnstile element:",W),W;if(typeof window!="undefined"&&window.__TURNSTILE_SITEKEY&&window.__TURNSTILE_SITEKEY.length>10)return W=window.__TURNSTILE_SITEKEY,a("\u{1F50D} Sitekey detected from global variable:",W),W;let n=document.querySelectorAll("script");for(let s of n){let i=(s.textContent||s.innerHTML).match(/sitekey['":\s]+(['"0-9a-zA-Z_-]{20,})/i);if(i&&i[1]&&i[1].length>10)return W=i[1].replace(/['"]/g,""),a("\u{1F50D} Sitekey detected from script content:",W),W}}catch(r){a("Error detecting sitekey:",r)}return a("\u{1F50D} Using fallback sitekey:",t),W=t,t}function Y(t){return new Promise(e=>setTimeout(e,t))}function Z(t,e=200,r=1e4){return new Promise(d=>{let n=Date.now()+r,s=()=>{let u=document.querySelector(t);u?d(u):Date.now()<n?setTimeout(s,e):d(null)};s()})}async function no(){return new Promise((t,e)=>{(async()=>{try{a("\u{1F3AF} Starting automatic CAPTCHA solving process..."),ht(),mt=new Promise(s=>{de=s});let d=Y(3e4).then(()=>e(new Error("Auto-CAPTCHA timed out after 30 seconds."))),n=(async()=>{let s=await Z("button.btn.btn-primary.btn-lg",200,3e3);if(s||(s=await Z("button.btn-primary.sm\\:btn-xl",200,3e3)),s||(s=await Z("button.btn-primary",200,3e3)),!s){a("\u{1F3AF} No paint button found, clicking on canvas directly to trigger CAPTCHA...");let x=await Z("canvas",200,5e3);x&&(x.click(),await Y(1e3),s=await Z("button.btn.btn-primary.btn-lg, button.btn-primary.sm\\:btn-xl, button.btn-primary",200,5e3))}if(!s)throw new Error("Could not find any paint button after attempts.");a("\u{1F3AF} Found paint button, clicking..."),s.click(),await Y(500),a("\u{1F3AF} Selecting transparent color...");let u=await Z("button#color-0",200,5e3);if(u)u.click();else{a("\u26A0\uFE0F Could not find transparent color button, trying alternative selectors...");let x=document.querySelectorAll('button[id^="color-"]');x.length>0&&(x[0].click(),a("\u{1F3AF} Clicked first available color button"))}await Y(500),a("\u{1F3AF} Finding canvas element...");let i=await Z("canvas",200,5e3);if(!i)throw new Error("Could not find the canvas element.");i.setAttribute("tabindex","0"),i.focus();let l=i.getBoundingClientRect(),c=Math.round(l.left+l.width/2),g=Math.round(l.top+l.height/2);a("\u{1F3AF} Simulating canvas interaction..."),typeof window!="undefined"&&window.MouseEvent&&window.KeyboardEvent&&(i.dispatchEvent(new window.MouseEvent("mousemove",{clientX:c,clientY:g,bubbles:!0})),i.dispatchEvent(new window.MouseEvent("mousedown",{clientX:c,clientY:g,bubbles:!0})),await Y(50),i.dispatchEvent(new window.MouseEvent("mouseup",{clientX:c,clientY:g,bubbles:!0})),i.dispatchEvent(new window.KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),await Y(50),i.dispatchEvent(new window.KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0}))),await Y(1e3),a("\u{1F3AF} Waiting for CAPTCHA challenge..."),await Y(2e3),a("\u{1F3AF} Starting confirmation loop...");let m=Date.now();(async()=>{let x=0;for(;!ue()&&Date.now()-m<25e3;){x++;let p=await Z("button.btn.btn-primary.btn-lg",100,1e3);if(p||(p=await Z("button.btn.btn-primary.sm\\:btn-xl",100,1e3)),!p){let b=Array.from(document.querySelectorAll("button.btn-primary"));p=b.length?b[b.length-1]:null}p&&!p.disabled?(a(`\u{1F3AF} Clicking confirmation button (attempt ${x})...`),p.click()):a(`\u{1F3AF} No active confirm button found (attempt ${x})`),await Y(800)}})();let y=await mt;await Y(500),a("\u2705 Token successfully captured through browser automation"),t(y)})();await Promise.race([n,d])}catch(d){a("\u274C Auto-CAPTCHA process failed:",d),e(d)}})()})}window.__WPA_SET_TURNSTILE_TOKEN__=function(t){t&&typeof t=="string"&&t.length>20&&(a("\u2705 Turnstile Token Captured:",t),Ce(t))};(function(){if(window.__WPA_FETCH_HOOKED__)return;window.__WPA_FETCH_HOOKED__=!0;let t=window.fetch;window.fetch=async function(...e){let r=await t.apply(this,e),d=e[0]instanceof Request?e[0].url:e[0];if(typeof d=="string"&&d.includes("https://backend.wplace.live/s0/pixel/"))try{let n=JSON.parse(e[1].body);if(n.t){let s=n.t;(!ue()||ee!==s)&&(a("\u2705 Turnstile Token Captured:",s),window.postMessage({source:"turnstile-capture",token:s},"*"))}}catch{}return r},window.addEventListener("message",e=>{let{source:r,token:d}=e.data;r==="turnstile-capture"&&d&&(!ue()||ee!==d)&&Ce(d)})})();D();var Fe="https://backend.wplace.live";async function ne(){var t,e,r;try{let d=await fetch(`${Fe}/me`,{credentials:"include"}).then(i=>i.json()),n=d||null,s=(d==null?void 0:d.charges)||{},u={count:(t=s.count)!=null?t:0,max:(e=s.max)!=null?e:0,cooldownMs:(r=s.cooldownMs)!=null?r:3e4};return{success:!0,data:{user:n,charges:u.count,maxCharges:u.max,chargeRegen:u.cooldownMs}}}catch(d){return{success:!1,error:d.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function xt(t,e,r,d,n){try{let s=JSON.stringify({colors:d,coords:r,t:n});a(`[API] Sending batch to tile ${t},${e} with ${d.length} pixels, token: ${n?n.substring(0,50)+"...":"null"}`);let u=await fetch(`${Fe}/s0/pixel/${t}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:s});if(a(`[API] Response: ${u.status} ${u.statusText}`),u.status===403){try{await u.json()}catch{}console.error("\u274C 403 Forbidden. Turnstile token might be invalid or expired.");try{console.log("\u{1F504} Regenerating Turnstile token after 403...");let c=await ge(!0);if(!c)return{status:403,json:{error:"Could not generate new token"},success:!1,painted:0};let g=JSON.stringify({colors:d,coords:r,t:c});a(`[API] Retrying with fresh token: ${c.substring(0,50)}...`);let m=await fetch(`${Fe}/s0/pixel/${t}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:g});if(a(`[API] Retry response: ${m.status} ${m.statusText}`),m.status===403)return{status:403,json:{error:"Fresh token still expired or invalid after retry"},success:!1,painted:0};let h=null;try{let x=await m.text();x.trim()?h=JSON.parse(x):h={}}catch(x){a(`[API] Warning: Could not parse retry response JSON: ${x.message}`),h={}}let y=(h==null?void 0:h.painted)||0;return a(`[API] Retry result: ${y} pixels painted`),{status:m.status,json:h,success:m.ok,painted:y}}catch(c){return console.error("\u274C Token regeneration failed:",c),{status:403,json:{error:"Token regeneration failed: "+c.message},success:!1,painted:0}}}let i=null;try{let c=await u.text();c.trim()?i=JSON.parse(c):i={}}catch(c){a(`[API] Warning: Could not parse response JSON: ${c.message}`),i={}}let l=(i==null?void 0:i.painted)||0;return a(`[API] Success: ${l} pixels painted`),{status:u.status,json:i,success:u.ok,painted:l}}catch(s){return a(`[API] Network error: ${s.message}`),{status:0,json:{error:s.message},success:!1,painted:0}}}le();ye();Se();var te=null,pe=!1,me=null,he=null,re=null;var yt=3e4;function go(){te&&document.removeEventListener("visibilitychange",te),te=()=>{document.hidden?(a("\u{1F4F1} Pesta\xF1a oculta - pausando timers"),o.inCooldown&&(pe=!0)):(a("\u{1F4F1} Pesta\xF1a visible - reanudando timers"),pe&&o.inCooldown&&(po(),pe=!1))},document.addEventListener("visibilitychange",te)}function po(){if(!me||!he)return;let t=Date.now(),e=t-me,r=Math.max(0,he-e);o.nextBatchCooldown=Math.ceil(r/1e3),o.cooldownEndTime=t+r,a(`\u{1F504} Recalculando cooldown: ${Math.ceil(r/1e3)}s restantes`)}var Le=0,Pt=12e4;async function mo(){re&&window.clearInterval(re),go(),re=window.setInterval(async()=>{try{if(document.hidden)return;if(o.remainingPixels.length>0&&!o.running){let t=await ne();if(t.success&&t.data.charges>0){let e=Math.floor(t.data.charges),r=Date.now();r-Le>Pt&&(a(`\u{1F504} Monitoreo: ${e} cargas disponibles`),Le=r),o.currentCharges=t.data.charges,o.maxCharges=t.data.maxCharges,e>=o.pixelsPerBatch&&window.imageBot&&typeof window.imageBot.onStartPainting=="function"&&(a(`\u{1F680} Reanudando pintado autom\xE1ticamente con ${e} cargas`),window.imageBot.onStartPainting())}}}catch(t){let e=Date.now();e-Le>Pt&&(a(`\u26A0\uFE0F Error en monitoreo de cargas: ${t.message}`),Le=e)}},yt),a(`\u2705 Monitoreo de cargas iniciado (cada ${yt/1e3}s)`)}function qe(){re&&(window.clearInterval(re),re=null,a("\u23F9\uFE0F Monitoreo de cargas detenido")),te&&(document.removeEventListener("visibilitychange",te),te=null),me=null,he=null,pe=!1}var Ye=0,ho=3e4;async function Ct(t,e){if(o.stopFlag)return a("\u{1F6D1} Bot detenido, cancelando verificaci\xF3n de cargas"),!1;let r=await ne();if(r.success){let d=Math.floor(r.data.charges);if(o.currentCharges=r.data.charges,o.maxCharges=r.data.maxCharges,d<t){if(o.stopFlag)return a("\u{1F6D1} Bot detenido durante verificaci\xF3n de cargas"),!1;let n=Date.now();return n-Ye>ho&&(a(`\u23F3 Cargas insuficientes: ${d}/${t}. Esperando regeneraci\xF3n...`),Ye=n),await wo(t-d,e),o.stopFlag?(a("\u{1F6D1} Bot detenido durante cooldown, cancelando recursi\xF3n"),!1):await Ct(t,e)}return Ye=0,!0}return a(`\u26A0\uFE0F No se pudo verificar cargas, continuando con valor cached: ${o.currentCharges}`),o.currentCharges>=t}async function Et(t,e,r,d,n){let{width:s,height:u}=t,{x:i,y:l}=e;a(`Iniciando pintado: imagen(${s}x${u}) inicio LOCAL(${i},${l}) tile(${o.tileX},${o.tileY})`),a(`\u{1F3A8} Patr\xF3n: ${o.paintPattern}`),mo();try{a("\u{1F511} Generando token Turnstile al inicio del proceso..."),await ge()?a("\u2705 Token inicial generado exitosamente"):a("\u26A0\uFE0F No se pudo generar token inicial, continuando con flujo normal")}catch(c){a("\u26A0\uFE0F Error generando token inicial:",c.message)}if(!o.remainingPixels||o.remainingPixels.length===0||o.lastPosition.x===0&&o.lastPosition.y===0){a("Generando cola de p\xEDxeles..."),o.remainingPixels=yo(t,e,o.tileX,o.tileY),o.paintPattern&&o.paintPattern!=="linear_start"&&(a(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${o.paintPattern}`),o.remainingPixels=Ne(o.remainingPixels,o.paintPattern,t)),(o.lastPosition.x>0||o.lastPosition.y>0)&&(o.remainingPixels=o.remainingPixels.filter(c=>{let g=c.imageY*s+c.imageX,m=o.lastPosition.y*s+o.lastPosition.x;return g>=m})),a(`Cola generada: ${o.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),o.startPosition&&o.tileX!==void 0&&o.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}))}catch(c){a("\u26A0\uFE0F Error actualizando plan overlay:",c)}}try{for(;o.remainingPixels.length>0&&!o.stopFlag;){let c=Math.floor(o.currentCharges),g;if(a(`\u{1F50D} Estado del primer lote - isFirstBatch: ${o.isFirstBatch}, useAllChargesFirst: ${o.useAllChargesFirst}, availableCharges: ${c}`),o.isFirstBatch&&o.useAllChargesFirst&&c>0?(g=Math.min(c,o.remainingPixels.length),o.isFirstBatch=!1,a(`\u{1F680} Primera pasada: usando ${g} cargas de ${c} disponibles`)):(g=Math.min(o.pixelsPerBatch,o.remainingPixels.length),a(`\u2699\uFE0F Pasada normal: usando ${g} p\xEDxeles (configurado: ${o.pixelsPerBatch})`)),!await Ct(g,r)){a("\u26A0\uFE0F No se pudieron obtener suficientes cargas, pausando pintado");break}c=Math.floor(o.currentCharges);let h=o.remainingPixels.splice(0,g),y=h,x=0;a(`Verificando lote de ${h.length} p\xEDxeles...`),a(`Pintando lote de ${y.length} p\xEDxeles...`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch})}catch(b){a("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",b)}let p=await bo(y,r);if(p.success&&p.painted>0){if(o.paintedPixels+=p.painted+x,o.currentCharges=Math.max(0,o.currentCharges-p.painted),a(`Cargas despu\xE9s del lote: ${o.currentCharges.toFixed(1)} (consumidas: ${p.painted})`),o.currentCharges=Math.max(0,o.currentCharges-p.painted),a(`Cargas despu\xE9s del lote: ${o.currentCharges.toFixed(1)} (consumidas: ${p.painted})`),y.length>0){let L=y[y.length-1];o.lastPosition={x:L.imageX,y:L.imageY}}a(`Lote exitoso: ${p.painted}/${y.length} p\xEDxeles pintados. Total: ${o.paintedPixels}/${o.totalPixels}`);let b=Po(),f=(o.paintedPixels/o.totalPixels*100).toFixed(1),w=A("image.passCompleted",{painted:p.painted,percent:f,current:o.paintedPixels,total:o.totalPixels});r&&r(o.paintedPixels,o.totalPixels,w,b),await Q(2e3)}else p.shouldContinue?a("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(o.remainingPixels.unshift(...y),a("Lote fall\xF3: reintentando en 5 segundos..."),await Q(5e3));await Q(500)}if(o.stopFlag)a(`Pintado pausado en p\xEDxel imagen(${o.lastPosition.x},${o.lastPosition.y})`),d&&d(!1,o.paintedPixels);else{a(`Pintado completado: ${o.paintedPixels} p\xEDxeles pintados`),o.lastPosition={x:0,y:0},o.remainingPixels=[],qe();try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),a("\u2705 Plan overlay limpiado al completar pintado"))}catch(c){a("\u26A0\uFE0F Error limpiando plan overlay:",c)}d&&d(!0,o.paintedPixels)}}catch(c){a("Error en proceso de pintado:",c),qe(),n&&n(c)}}async function fo(t){var e;try{if(!t||t.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let r=new Map;for(let s of t){let u=`${s.tileX},${s.tileY}`;r.has(u)||r.set(u,{coords:[],colors:[],tx:s.tileX,ty:s.tileY});let i=r.get(u);i.coords.push(s.localX,s.localY),i.colors.push(s.color.id||s.color.value||1)}let d=await ge(),n=0;for(let{coords:s,colors:u,tx:i,ty:l}of r.values()){if(u.length===0)continue;let c=[];for(let h=0;h<s.length;h+=2){let y=(Number(s[h])%1e3+1e3)%1e3,x=(Number(s[h+1])%1e3+1e3)%1e3;Number.isFinite(y)&&Number.isFinite(x)&&c.push(y,x)}try{let h=999,y=0,x=999,p=0;for(let b=0;b<c.length;b+=2){let f=c[b],w=c[b+1];f<h&&(h=f),f>y&&(y=f),w<x&&(x=w),w>p&&(p=w)}a(`[IMG] Enviando tile ${i},${l}: ${u.length} px | x:[${h},${y}] y:[${x},${p}]`)}catch{}let g=await xt(i,l,c,u,d);if(g.status!==200)return{success:!1,painted:n,error:((e=g.json)==null?void 0:e.message)||`HTTP ${g.status}`,status:g.status};let m=g.painted||0;if(m===0&&u.length>0)return a(`\u26A0\uFE0F API devolvi\xF3 200 OK pero painted=0 para ${u.length} p\xEDxeles en tile ${i},${l}`),{success:!1,painted:n,error:`API devolvi\xF3 painted=0 para ${u.length} p\xEDxeles`,status:200,shouldRetry:!0};n+=m,a(`\u2705 Tile ${i},${l}: ${m}/${u.length} p\xEDxeles pintados exitosamente`)}return{success:!0,painted:n}}catch(r){return a("Error en paintPixelBatch:",r),{success:!1,painted:0,error:r.message}}}var vt=0,Ae=0,xo=6e4;async function bo(t,e){for(let s=1;s<=5;s++)try{let u=await fo(t);if(u.success)return o.retryCount=0,Ae=0,u;if(o.retryCount=s,s<5){let i=3e3*Math.pow(2,s-1),l=Math.round(i/1e3),c;if(u.status===0||u.status==="NetworkError"){Ae++;let m=Date.now();(m-vt>xo||Ae===1)&&(a(`\u{1F310} Error de red (${Ae} consecutivos). Reintento ${s}/5 en ${l}s`),vt=m),c=A("image.networkError")}else u.status>=500?(c=A("image.serverError"),a(`\u{1F527} Error del servidor ${u.status}. Reintento ${s}/5 en ${l}s`)):u.status===408?(c=A("image.timeoutError"),a(`\u23F1\uFE0F Timeout. Reintento ${s}/5 en ${l}s`)):(c=A("image.retryAttempt",{attempt:s,maxAttempts:5,delay:l}),a(`\u{1F504} Reintento ${s}/5 despu\xE9s de ${l}s. Error: ${u.error}`));e&&e(o.paintedPixels,o.totalPixels,c),await Q(i)}}catch(u){if(o.retryCount=s,s<5){let i=3e3*Math.pow(2,s-1),l=Math.round(i/1e3);(s===1||s%3===0)&&a(`\u274C Excepci\xF3n en intento ${s}:`,u.message);let c=A("image.retryError",{attempt:s,maxAttempts:5,delay:l});e&&e(o.paintedPixels,o.totalPixels,c),await Q(i)}}o.retryCount=5;let n=A("image.retryFailed",{maxAttempts:5});return e&&e(o.paintedPixels,o.totalPixels,n),a("\u{1F4A5} Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function wo(t,e){let d=J.CHARGE_REGEN_MS*t+5e3;if(o.stopFlag){a("\u{1F6D1} Bot detenido, cancelando cooldown");return}a(`Esperando ${Math.round(d/1e3)}s para obtener ${t} cargas`);let n=Date.now();if(me=n,he=d,o.inCooldown=!0,o.cooldownEndTime=n+d,o.nextBatchCooldown=Math.round(d/1e3),e){let s=Math.floor(d/6e4),u=Math.floor(d%6e4/1e3),i=s>0?`${s}m ${u}s`:`${u}s`,l=A("image.waitingChargesRegen",{current:Math.floor(o.currentCharges),needed:t,time:i});e(o.paintedPixels,o.totalPixels,l)}for(;;){let u=Date.now()-n,i=Math.max(0,d-u);if(o.stopFlag){a(`\u{1F6D1} Bot detenido durante cooldown con ${Math.ceil(i/1e3)}s restantes`);break}if(i<=0)break;let l=Math.ceil(i/1e3);o.nextBatchCooldown=l;let c=l%30===0||l<=30&&l%10===0||l<=5||u<2e3;if(e&&c){let g=Math.floor(l/60),m=l%60,h=g>0?`${g}m ${m}s`:`${m}s`,y=A("image.waitingChargesCountdown",{current:Math.floor(o.currentCharges),needed:t,time:h});e(o.paintedPixels,o.totalPixels,y)}await Q(Math.min(1e3,i))}o.inCooldown=!1,o.nextBatchCooldown=0,me=null,he=null,pe=!1,o.stopFlag||(o.currentCharges=Math.min(o.maxCharges||9999,o.currentCharges+d/J.CHARGE_REGEN_MS))}function yo(t,e,r,d){let{x:n,y:s}=e,u=[],i;if(t&&t.processor&&typeof t.processor.generatePixelQueue=="function")i=t.processor.generatePixelQueue();else if(t&&typeof t.generatePixelQueue=="function")i=t.generatePixelQueue();else if(t&&Array.isArray(t.pixels))i=t.pixels;else if(t&&typeof t.pixels=="function")i=t.pixels();else if(t&&t.pixels)i=t.pixels;else return a(`\u274C Error: No se pueden obtener p\xEDxeles de imageData. Tipo: ${typeof t}`,t),[];if(!Array.isArray(i))return a(`\u274C Error: pixels no es un array iterable. Tipo: ${typeof i}`,i),[];for(let l of i){if(!l)continue;let c=l.imageX!==void 0?l.imageX:l.x,g=l.imageY!==void 0?l.imageY:l.y,m=l.color!==void 0?l.color:l.targetColor;if(c===void 0||g===void 0){a("\u26A0\uFE0F P\xEDxel con coordenadas inv\xE1lidas:",l);continue}let h=n+c,y=s+g,x=Math.floor(h/1e3),p=Math.floor(y/1e3),b=r+x,f=d+p,w=(h%1e3+1e3)%1e3,L=(y%1e3+1e3)%1e3;u.push({imageX:c,imageY:g,localX:w,localY:L,tileX:b,tileY:f,color:m,originalColor:l.originalColor})}return a(`Cola de p\xEDxeles generada: ${u.length} p\xEDxeles para pintar`),u}function Po(){if(!o.remainingPixels||o.remainingPixels.length===0)return 0;let t=o.remainingPixels.length,e=o.pixelsPerBatch,r=J.CHARGE_REGEN_MS/1e3,d=Math.ceil(t/e),n=e*r,s=(d-1)*n,u=d*2;return Math.ceil(s+u)}function Ue(){o.stopFlag=!0,o.running=!1,qe(),a("\u{1F6D1} Deteniendo proceso de pintado...")}D();le();function vo(){return o.imageData?o.imageData.processor&&typeof o.imageData.processor.generatePixelQueue=="function"?o.imageData.processor.generatePixelQueue():o.imageData.fullPixelData&&Array.isArray(o.imageData.fullPixelData)&&o.imageData.fullPixelData.length>0?o.imageData.fullPixelData:o.imageData.pixels&&o.imageData.pixels.length>0?o.imageData.pixels:o.remainingPixels&&o.remainingPixels.length>0?(a("\u26A0\uFE0F Exportando usando remainingPixels (posible subconjunto del proyecto)"),o.remainingPixels):null:null}function Xe(t=null){try{if(!o.imageData||o.paintedPixels===0)throw new Error("No hay progreso para guardar");let e=null;try{let l=vo();l&&Array.isArray(l)&&(l.length>5e4?(a(`\u26A0\uFE0F Imagen muy grande (${l.length} p\xEDxeles), guardando solo p\xEDxeles restantes`),e=null):e=l)}catch(l){a("\u26A0\uFE0F Error obteniendo datos completos de p\xEDxeles, continuando sin ellos:",l),e=null}let r={version:"2.0",timestamp:Date.now(),imageData:{width:o.imageData.width,height:o.imageData.height,originalName:o.originalImageName,...e&&{fullPixelData:e}},progress:{paintedPixels:o.paintedPixels,totalPixels:o.totalPixels,lastPosition:{...o.lastPosition}},position:{startPosition:{...o.startPosition},tileX:o.tileX,tileY:o.tileY},config:{pixelsPerBatch:o.pixelsPerBatch,useAllChargesFirst:o.useAllChargesFirst,isFirstBatch:o.isFirstBatch,maxCharges:o.maxCharges,paintPattern:o.paintPattern},colors:o.availableColors.map(l=>({id:l.id,r:l.r,g:l.g,b:l.b})),remainingPixels:o.remainingPixels||[]},d;try{d=JSON.stringify(r,null,2)}catch{a("\u26A0\uFE0F Error serializando datos completos, intentando sin fullPixelData"),delete r.imageData.fullPixelData,d=JSON.stringify(r,null,2)}let n=new window.Blob([d],{type:"application/json"}),s=t||`wplace_progress_${o.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,u=window.URL.createObjectURL(n),i=document.createElement("a");return i.href=u,i.download=s,document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(u),a(`\u2705 Progreso guardado: ${s}`),{success:!0,filename:s}}catch(e){return a("\u274C Error guardando progreso:",e),{success:!1,error:e.message}}}async function Lt(t){return new Promise(e=>{try{let r=new window.FileReader;r.onload=d=>{try{let n=JSON.parse(d.target.result),u=["imageData","progress","position","colors"].filter(c=>!(c in n));if(u.length>0)throw new Error(`Campos requeridos faltantes: ${u.join(", ")}`);let i=n.version||"1.0";if(a(`\u{1F4C1} Cargando progreso versi\xF3n ${i}`),(!o.availableColors||o.availableColors.length===0)&&(o.availableColors=Array.isArray(n.colors)?n.colors:[]),o.availableColors.length>0&&Array.isArray(n.colors)){let c=n.colors.map(h=>h.id),g=o.availableColors.map(h=>h.id);c.filter(h=>g.includes(h)).length<c.length*.8&&a("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}o.imageData={...n.imageData,pixels:[]};let l=n.imageData.fullPixelData||n.fullPixelData;if(Array.isArray(l)&&l.length>0&&(o.imageData.fullPixelData=l,o.imageData.pixels=l,a(`\u2705 Cargados ${l.length} p\xEDxeles completos del proyecto`)),o.paintedPixels=n.progress.paintedPixels,o.totalPixels=n.progress.totalPixels,n.progress.lastPosition?o.lastPosition=n.progress.lastPosition:n.position.lastX!==void 0&&n.position.lastY!==void 0&&(o.lastPosition={x:n.position.lastX,y:n.position.lastY}),n.position.startPosition?o.startPosition=n.position.startPosition:n.position.startX!==void 0&&n.position.startY!==void 0&&(o.startPosition={x:n.position.startX,y:n.position.startY}),o.tileX=n.position.tileX,o.tileY=n.position.tileY,o.originalImageName=n.imageData.originalName,o.remainingPixels=n.remainingPixels||n.progress.remainingPixels||[],n.config&&(o.pixelsPerBatch=n.config.pixelsPerBatch||o.pixelsPerBatch,o.useAllChargesFirst=n.config.useAllChargesFirst!==void 0?n.config.useAllChargesFirst:o.useAllChargesFirst,o.isFirstBatch=o.useAllChargesFirst?!0:n.config.isFirstBatch!==void 0?n.config.isFirstBatch:!1,a(`\u{1F4C1} Progreso cargado - useAllChargesFirst: ${o.useAllChargesFirst}, isFirstBatch: ${o.isFirstBatch}`),o.maxCharges=n.config.maxCharges||o.maxCharges,i>="2.0"&&(o.paintPattern=n.config.paintPattern||"linear_start")),o.paintPattern&&o.paintPattern!=="linear_start"&&o.remainingPixels.length>0)try{Promise.resolve().then(()=>(Se(),We)).then(({applyPaintPattern:c})=>{o.remainingPixels=c(o.remainingPixels,o.paintPattern,o.imageData),a(`\u{1F3A8} Patr\xF3n de pintado aplicado: ${o.paintPattern}`)}).catch(c=>{a("\u26A0\uFE0F Error aplicando patr\xF3n de pintado:",c)})}catch(c){a("\u26A0\uFE0F Error cargando m\xF3dulo de patrones:",c)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),o.startPosition&&o.tileX!==void 0&&o.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y}),a(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${o.tileX},${o.tileY}) local(${o.startPosition.x},${o.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}),a(`\u2705 Plan overlay activado con ${o.remainingPixels.length} p\xEDxeles restantes`))}catch(c){a("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",c)}o.imageLoaded=!0,o.colorsChecked=!0,a(`\u2705 Progreso cargado (v${i}): ${o.paintedPixels}/${o.totalPixels} p\xEDxeles`),i>="2.0"&&a(`\u{1F3A8} Patr\xF3n: ${o.paintPattern}`),e({success:!0,data:n,painted:o.paintedPixels,total:o.totalPixels,canContinue:o.remainingPixels.length>0,version:i})}catch(n){a("\u274C Error parseando archivo de progreso:",n),e({success:!1,error:n.message})}},r.onerror=()=>{let d="Error leyendo archivo";a("\u274C",d),e({success:!1,error:d})},r.readAsText(t)}catch(r){a("\u274C Error cargando progreso:",r),e({success:!1,error:r.message})}})}function At(){o.paintedPixels=0,o.totalPixels=0,o.lastPosition={x:0,y:0},o.remainingPixels=[],o.imageData=null,o.startPosition=null,o.imageLoaded=!1,o.originalImageName=null,o.isFirstBatch=!0,o.nextBatchCooldown=0,o.drawnPixelsMap.clear(),o.lastProtectionCheck=0,a("\u{1F9F9} Progreso limpiado")}function St(){return o.imageLoaded&&o.paintedPixels>0&&o.remainingPixels&&o.remainingPixels.length>0}function Tt(){return{hasProgress:St(),painted:o.paintedPixels,total:o.totalPixels,remaining:o.remainingPixels?o.remainingPixels.length:0,percentage:o.totalPixels>0?o.paintedPixels/o.totalPixels*100:0,lastPosition:{...o.lastPosition},canContinue:St()}}D();function Te(t=null){let e=document.createElement("div");t&&(e.id=t),e.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let r=e.attachShadow({mode:"open"});return document.body.appendChild(e),{host:e,root:r}}function It(t,e){let r=0,d=0,n=0,s=0;t.style.cursor="move",t.addEventListener("mousedown",u);function u(c){c.target.closest(".header-btn, .wplace-header-btn")||(c.preventDefault(),n=c.clientX,s=c.clientY,document.addEventListener("mouseup",l),document.addEventListener("mousemove",i))}function i(c){c.preventDefault(),r=n-c.clientX,d=s-c.clientY,n=c.clientX,s=c.clientY,e.style.top=e.offsetTop-d+"px",e.style.left=e.offsetLeft-r+"px"}function l(){document.removeEventListener("mouseup",l),document.removeEventListener("mousemove",i)}}D();var Ge=1e5,He=new Set;function Ie(t){if(!t)return;He.add(t);let e=r=>{(r.target===t||t.contains(r.target))&&Co(t)};t.addEventListener("mousedown",e),t._bringToFrontHandler=e,t.style.zIndex||(t.style.zIndex=Ge++)}function ke(t){t&&(He.delete(t),t._bringToFrontHandler&&(t.removeEventListener("mousedown",t._bringToFrontHandler),delete t._bringToFrontHandler))}function Co(t){!t||!He.has(t)||(Ge++,t.style.zIndex=Ge)}var Be=class{constructor(e="Bot"){this.botName=e,this.isVisible=!1,this.logs=[],this.maxLogs=1e3,this.container=null,this.logContent=null,this.isResizing=!1,this.resizeHandle=null,this.originalConsole={},this.config={width:600,height:400,x:window.innerWidth-620,y:20,visible:!1},this.loadConfig(),this.createWindow(),this.setupLogInterception(),this.setupEventListeners()}loadConfig(){try{let e=localStorage.getItem(`wplace-log-window-${this.botName}`);e&&(this.config={...this.config,...JSON.parse(e)})}catch(e){a("Error cargando configuraci\xF3n de ventana de logs:",e)}}saveConfig(){try{localStorage.setItem(`wplace-log-window-${this.botName}`,JSON.stringify(this.config))}catch(e){a("Error guardando configuraci\xF3n de ventana de logs:",e)}}createWindow(){this.container=document.createElement("div"),this.container.className="wplace-log-window",this.container.style.cssText=`
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
    `;let r=document.createElement("div");r.textContent=`\u{1F4CB} Logs - ${this.botName}`,r.style.cssText=`
      font-weight: bold;
      font-size: 14px;
      color: #e2e8f0;
    `;let d=document.createElement("div");d.style.cssText=`
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
    `,n.addEventListener("mouseenter",()=>{n.style.background="rgba(34, 197, 94, 1)"}),n.addEventListener("mouseleave",()=>{n.style.background="rgba(34, 197, 94, 0.8)"}),n.addEventListener("click",()=>this.downloadLogs());let s=document.createElement("button");s.innerHTML="\u2715",s.title="Cerrar ventana",s.style.cssText=`
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
    `,s.addEventListener("mouseenter",()=>{s.style.background="rgba(239, 68, 68, 1)"}),s.addEventListener("mouseleave",()=>{s.style.background="rgba(239, 68, 68, 0.8)"}),s.addEventListener("click",()=>this.hide()),d.appendChild(n),d.appendChild(s),e.appendChild(r),e.appendChild(d),this.logContent=document.createElement("div"),this.logContent.className="log-window-content",this.logContent.style.cssText=`
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
    `,this.container.appendChild(e),this.container.appendChild(this.logContent),this.container.appendChild(this.resizeHandle),document.body.appendChild(this.container),Ie(this.container),this.setupDragging(e),this.setupResizing(),this.isVisible=this.config.visible}setupDragging(e){let r=!1,d={x:0,y:0};e.addEventListener("mousedown",u=>{u.target.tagName!=="BUTTON"&&(r=!0,d.x=u.clientX-this.container.offsetLeft,d.y=u.clientY-this.container.offsetTop,document.addEventListener("mousemove",n),document.addEventListener("mouseup",s),u.preventDefault())});let n=u=>{if(!r)return;let i=Math.max(0,Math.min(window.innerWidth-this.container.offsetWidth,u.clientX-d.x)),l=Math.max(0,Math.min(window.innerHeight-this.container.offsetHeight,u.clientY-d.y));this.container.style.left=i+"px",this.container.style.top=l+"px",this.config.x=i,this.config.y=l},s=()=>{r=!1,document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",s),this.saveConfig()}}setupResizing(){let e=!1,r,d,n,s;this.resizeHandle.addEventListener("mousedown",l=>{e=!0,r=l.clientX,d=l.clientY,n=parseInt(document.defaultView.getComputedStyle(this.container).width,10),s=parseInt(document.defaultView.getComputedStyle(this.container).height,10),document.addEventListener("mousemove",u),document.addEventListener("mouseup",i),l.preventDefault()});let u=l=>{if(!e)return;let c=Math.max(300,n+l.clientX-r),g=Math.max(200,s+l.clientY-d);this.container.style.width=c+"px",this.container.style.height=g+"px",this.config.width=c,this.config.height=g},i=()=>{e=!1,document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",i),this.saveConfig()}}setupLogInterception(){this.originalConsole={log:console.log,info:console.info,warn:console.warn,error:console.error,debug:console.debug},console.log=(...e)=>{this.originalConsole.log.apply(console,e),this.addLog("log",e)},console.info=(...e)=>{this.originalConsole.info.apply(console,e),this.addLog("info",e)},console.warn=(...e)=>{this.originalConsole.warn.apply(console,e),this.addLog("warn",e)},console.error=(...e)=>{this.originalConsole.error.apply(console,e),this.addLog("error",e)},console.debug=(...e)=>{this.originalConsole.debug.apply(console,e),this.addLog("debug",e)}}addLog(e,r){let d=new Date().toLocaleTimeString(),n=r.map(u=>typeof u=="object"?JSON.stringify(u,null,2):String(u)).join(" "),s={timestamp:d,type:e,message:n,raw:r};this.logs.push(s),this.logs.length>this.maxLogs&&this.logs.shift(),this.isVisible&&this.updateLogDisplay()}updateLogDisplay(){if(!this.logContent)return;let e=this.logs.map(r=>`<div style="color: ${this.getLogColor(r.type)}; margin-bottom: 2px;">[${r.timestamp}] ${r.message}</div>`).join("");this.logContent.innerHTML=e,this.logContent.scrollTop=this.logContent.scrollHeight}getLogColor(e){let r={log:"#e2e8f0",info:"#60a5fa",warn:"#fbbf24",error:"#f87171",debug:"#a78bfa"};return r[e]||r.log}downloadLogs(){let e=new Date,r=e.toISOString().split("T")[0],d=e.toTimeString().split(" ")[0].replace(/:/g,"-"),n=`log_${this.botName}_${r}_${d}.log`,s=this.logs.map(c=>`[${c.timestamp}] [${c.type.toUpperCase()}] ${c.message}`).join(`
`),u=new Blob([s],{type:"text/plain"}),i=URL.createObjectURL(u),l=document.createElement("a");l.href=i,l.download=n,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(i),a(`\u{1F4E5} Logs descargados como: ${n}`)}show(){this.container&&(this.container.style.display="flex",this.isVisible=!0,this.config.visible=!0,this.updateLogDisplay(),this.saveConfig())}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1,this.config.visible=!1,this.saveConfig())}toggle(){this.isVisible?this.hide():this.show()}clear(){this.logs=[],this.logContent&&(this.logContent.innerHTML="")}setupEventListeners(){window.addEventListener("resize",()=>{if(this.container){let e=window.innerWidth-this.container.offsetWidth,r=window.innerHeight-this.container.offsetHeight;this.config.x>e&&(this.config.x=Math.max(0,e),this.container.style.left=this.config.x+"px"),this.config.y>r&&(this.config.y=Math.max(0,r),this.container.style.top=this.config.y+"px"),this.saveConfig()}})}destroy(){this.originalConsole.log&&(console.log=this.originalConsole.log,console.info=this.originalConsole.info,console.warn=this.originalConsole.warn,console.error=this.originalConsole.error,console.debug=this.originalConsole.debug),this.container&&this.container.parentNode&&(ke(this.container),this.container.parentNode.removeChild(this.container)),this.container=null,this.logContent=null,this.logs=[]}};window.__wplaceLogWindows=window.__wplaceLogWindows||{};function je(t){return window.__wplaceLogWindows[t]||(window.__wplaceLogWindows[t]=new Be(t)),window.__wplaceLogWindows[t]}D();var oe={0:{id:1,name:"Black",rgb:{r:0,g:0,b:0}},1:{id:2,name:"Dark Gray",rgb:{r:60,g:60,b:60}},2:{id:3,name:"Gray",rgb:{r:120,g:120,b:120}},3:{id:4,name:"Light Gray",rgb:{r:210,g:210,b:210}},4:{id:5,name:"White",rgb:{r:255,g:255,b:255}},5:{id:6,name:"Deep Red",rgb:{r:96,g:0,b:24}},6:{id:7,name:"Red",rgb:{r:237,g:28,b:36}},7:{id:8,name:"Orange",rgb:{r:255,g:127,b:39}},8:{id:9,name:"Gold",rgb:{r:246,g:170,b:9}},9:{id:10,name:"Yellow",rgb:{r:249,g:221,b:59}},10:{id:11,name:"Light Yellow",rgb:{r:255,g:250,b:188}},11:{id:12,name:"Dark Green",rgb:{r:14,g:185,b:104}},12:{id:13,name:"Green",rgb:{r:19,g:230,b:123}},13:{id:14,name:"Light Green",rgb:{r:135,g:255,b:94}},14:{id:15,name:"Dark Teal",rgb:{r:12,g:129,b:110}},15:{id:16,name:"Teal",rgb:{r:16,g:174,b:166}},16:{id:17,name:"Light Teal",rgb:{r:19,g:225,b:190}},17:{id:20,name:"Cyan",rgb:{r:96,g:247,b:242}},18:{id:44,name:"Light Cyan",rgb:{r:187,g:250,b:242}},19:{id:18,name:"Dark Blue",rgb:{r:40,g:80,b:158}},20:{id:19,name:"Blue",rgb:{r:64,g:147,b:228}},21:{id:21,name:"Indigo",rgb:{r:107,g:80,b:246}},22:{id:22,name:"Light Indigo",rgb:{r:153,g:177,b:251}},23:{id:23,name:"Dark Purple",rgb:{r:120,g:12,b:153}},24:{id:24,name:"Purple",rgb:{r:170,g:56,b:185}},25:{id:25,name:"Light Purple",rgb:{r:224,g:159,b:249}},26:{id:26,name:"Dark Pink",rgb:{r:203,g:0,b:122}},27:{id:27,name:"Pink",rgb:{r:236,g:31,b:128}},28:{id:28,name:"Light Pink",rgb:{r:243,g:141,b:169}},29:{id:29,name:"Dark Brown",rgb:{r:104,g:70,b:52}},30:{id:30,name:"Brown",rgb:{r:149,g:104,b:42}},31:{id:31,name:"Beige",rgb:{r:248,g:178,b:119}},32:{id:52,name:"Light Beige",rgb:{r:255,g:197,b:165}},33:{id:32,name:"Medium Gray",rgb:{r:170,g:170,b:170}},34:{id:33,name:"Dark Red",rgb:{r:165,g:14,b:30}},35:{id:34,name:"Light Red",rgb:{r:250,g:128,b:114}},36:{id:35,name:"Dark Orange",rgb:{r:228,g:92,b:26}},37:{id:37,name:"Dark Goldenrod",rgb:{r:156,g:132,b:49}},38:{id:38,name:"Goldenrod",rgb:{r:197,g:173,b:49}},39:{id:39,name:"Light Goldenrod",rgb:{r:232,g:212,b:95}},40:{id:40,name:"Dark Olive",rgb:{r:74,g:107,b:58}},41:{id:41,name:"Olive",rgb:{r:90,g:148,b:74}},42:{id:42,name:"Light Olive",rgb:{r:132,g:197,b:115}},43:{id:43,name:"Dark Cyan",rgb:{r:15,g:121,b:159}},44:{id:45,name:"Light Blue",rgb:{r:125,g:199,b:255}},45:{id:46,name:"Dark Indigo",rgb:{r:77,g:49,b:184}},46:{id:47,name:"Dark Slate Blue",rgb:{r:74,g:66,b:132}},47:{id:48,name:"Slate Blue",rgb:{r:122,g:113,b:196}},48:{id:49,name:"Light Slate Blue",rgb:{r:181,g:174,b:241}},49:{id:53,name:"Dark Peach",rgb:{r:155,g:82,b:73}},50:{id:54,name:"Peach",rgb:{r:209,g:128,b:120}},51:{id:55,name:"Light Peach",rgb:{r:250,g:182,b:164}},52:{id:50,name:"Light Brown",rgb:{r:219,g:164,b:99}},53:{id:56,name:"Dark Tan",rgb:{r:123,g:99,b:82}},54:{id:57,name:"Tan",rgb:{r:156,g:132,b:107}},55:{id:36,name:"Light Tan",rgb:{r:214,g:181,b:148}},56:{id:51,name:"Dark Beige",rgb:{r:209,g:128,b:81}},57:{id:61,name:"Dark Stone",rgb:{r:109,g:100,b:63}},58:{id:62,name:"Stone",rgb:{r:148,g:140,b:107}},59:{id:63,name:"Light Stone",rgb:{r:205,g:197,b:158}},60:{id:58,name:"Dark Slate",rgb:{r:51,g:57,b:65}},61:{id:59,name:"Slate",rgb:{r:109,g:117,b:141}},62:{id:60,name:"Light Slate",rgb:{r:179,g:185,b:209}},63:{id:0,name:"Transparent",rgb:null}};function kt(){a("\u{1F4CA} Creando ventana de estad\xEDsticas de pintado");let{host:t,root:e}=Te(),r=document.createElement("style");r.textContent=`
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
  `,e.appendChild(r);let d=document.createElement("div");d.className="stats-container",d.innerHTML=`
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
  `,e.appendChild(d);let n={container:d,header:d.querySelector(".header"),refreshBtnHeader:d.querySelector(".refresh-btn-header"),closeBtn:d.querySelector(".close-btn"),userStats:d.querySelector(".user-stats"),imageStats:d.querySelector(".image-stats"),colorsStats:d.querySelector(".colors-stats"),refreshBtn:d.querySelector(".refresh-btn")};It(n.header,d);let s=!1,u=null;n.closeBtn.addEventListener("click",()=>{l()}),n.refreshBtnHeader.addEventListener("click",()=>{u&&u()}),n.refreshBtn.addEventListener("click",()=>{u&&u()});function i(){d.style.display="block",s=!0,a("\u{1F4CA} Ventana de estad\xEDsticas mostrada")}function l(){d.style.display="none",s=!1,a("\u{1F4CA} Ventana de estad\xEDsticas ocultada")}function c(){s?l():i()}function g(p){if(!p){n.userStats.innerHTML=`
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
      `),p.cooldown!==void 0&&p.cooldown>0){let f=Math.floor(p.cooldown/60),w=p.cooldown%60,L=f>0?`${f}m ${w}s`:`${w}s`;b+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Cooldown</div>
          <div class="stat-value">${L}</div>
        </div>
      `}n.userStats.innerHTML=b||`
      <div class="stat-item">
        <div class="stat-label">\u2139\uFE0F Informaci\xF3n no disponible</div>
      </div>
    `}function m(p){if(!p||!p.loaded){n.imageStats.innerHTML=`
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
    `;if(p.estimatedTime!==void 0&&p.estimatedTime>0){let w=Math.floor(p.estimatedTime/3600),L=Math.floor(p.estimatedTime%3600/60),E=w>0?`${w}h ${L}m`:`${L}m`;f+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Tiempo Estimado</div>
          <div class="stat-value">${E}</div>
        </div>
      `}p.originalName&&(f+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4C1} Archivo</div>
          <div class="stat-value">${p.originalName}</div>
        </div>
      `),n.imageStats.innerHTML=f}function h(p){if(!p||p.length===0){n.colorsStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u274C Abra la paleta de colores en el sitio</div>
        </div>
      `;return}let b=Object.values(oe).filter(E=>E.rgb!==null),f=new Set(p.map(E=>E.id)),w=`
      <div class="stat-item">
        <div class="stat-label">\u2705 Colores Disponibles</div>
        <div class="stat-value">${p.length}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">\u{1F4CA} Total de Colores</div>
        <div class="stat-value">${b.length}</div>
      </div>
      <div class="colors-grid">
    `;p.forEach(E=>{let v=oe[Object.keys(oe).find(I=>oe[I].id===E.id)],C=v?v.name:`Color ${E.id}`,T=`rgb(${(E.rgb||[0,0,0]).join(",")})`;w+=`
        <div class="color-swatch" style="background-color: ${T};" title="${C} (ID: ${E.id})">
          <div class="color-info">${C}</div>
        </div>
      `}),b.filter(E=>!f.has(E.id)).forEach(E=>{let C=`rgb(${[E.rgb.r,E.rgb.g,E.rgb.b].join(",")})`;w+=`
        <div class="color-swatch unavailable" style="background-color: ${C};" title="${E.name} (ID: ${E.id}) - No disponible">
          <div class="color-info">${E.name} (No disponible)</div>
        </div>
      `}),w+="</div>",n.colorsStats.innerHTML=w}function y(p){u=p}function x(){t.remove()}return a("\u2705 Ventana de estad\xEDsticas de pintado creada"),{show:i,hide:l,toggle:c,updateUserStats:g,updateImageStats:m,updateColorsStats:h,setRefreshCallback:y,destroy:x,isVisible:()=>s}}D();D();function Bt(t,e=[]){a("\u{1F3A8} Creando selector de paleta de colores");let r=document.createElement("div");r.className="wplace-section",r.id="color-palette-section",r.style.marginTop="15px",r.innerHTML=`
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
  `;let d=document.createElement("style");d.textContent=`
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
  `;let n=t.getRootNode&&t.getRootNode();n&&n.nodeType===11&&n.host?n.querySelector("#color-palette-styles")||(d.id="color-palette-styles",n.appendChild(d)):document.head.querySelector("#color-palette-styles")||(d.id="color-palette-styles",document.head.appendChild(d)),t.appendChild(r);let u={showAllToggle:r.querySelector("#showAllColorsToggle"),selectAllBtn:r.querySelector("#selectAllBtn"),unselectAllBtn:r.querySelector("#unselectAllBtn"),colorsContainer:r.querySelector("#colors-container")},i=new Set,l=!1,c=null;function g(){i.clear(),u.colorsContainer.querySelectorAll(".wplace-color-swatch.active").forEach(w=>{let L=parseInt(w.dataset.colorId);isNaN(L)||i.add(L)}),c&&c(Array.from(i))}function m(f,w=!1){u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(E=>{let v=E.classList.contains("unavailable"),C=parseInt(E.dataset.colorId);(!v||w)&&(v||(E.classList.toggle("active",f),f?i.add(C):i.delete(C)))}),g(),a(`\u{1F3A8} ${f?"Seleccionados":"Deseleccionados"} todos los colores disponibles`)}function h(f=!1){if(u.colorsContainer.innerHTML="",!e||e.length===0){u.colorsContainer.innerHTML='<div style="text-align: center; color: #888; padding: 20px;">Upload an image first to capture available colors</div>';return}let w=0,L=0,E=i.size>0,v=new Set;Object.values(oe).filter(T=>T.rgb!==null).forEach(T=>{let{id:I,name:z,rgb:$}=T,K=`${$.r},${$.g},${$.b}`;L++;let M=e.some(P=>P.r===$.r&&P.g===$.g&&P.b===$.b);if(!f&&!M)return;M&&w++;let _=document.createElement("div");_.className="wplace-color-item";let B=document.createElement("button");B.className=`wplace-color-swatch ${M?"":"unavailable"}`,B.title=`${z} (ID: ${I})${M?"":" (Unavailable)"}`,B.dataset.rgb=K,B.dataset.colorId=I,B.style.backgroundColor=`rgb(${$.r}, ${$.g}, ${$.b})`,M||(B.disabled=!0);let j=E?i.has(I):M;B.classList.toggle("active",j),j?v.add(I):v.delete(I);let F=document.createElement("span");F.className="wplace-color-item-name",F.textContent=z+(M?"":" (N/A)"),M||(F.style.color="#888",F.style.fontStyle="italic"),M&&B.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation();let k=B.classList.contains("active");B.classList.toggle("active",!k),k?i.delete(I):i.add(I),g(),a(`\u{1F3A8} Color ${z} (ID: ${I}) ${k?"deseleccionado":"seleccionado"}`)}),_.appendChild(B),_.appendChild(F),u.colorsContainer.appendChild(_)}),i=v,u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(T=>{let I=parseInt(T.dataset.colorId),z=i.has(I);T.classList.toggle("active",z)}),g()}u.showAllToggle.addEventListener("change",f=>{l=f.target.checked,h(l)}),u.selectAllBtn.addEventListener("click",()=>{m(!0,l)}),u.unselectAllBtn.addEventListener("click",()=>{m(!1,l)}),h(!1);function y(f){e=f||[],h(l)}function x(){return Array.from(i)}function p(f){i=new Set(f||[]),u.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(L=>{let E=parseInt(L.dataset.colorId),v=i.has(E);L.classList.toggle("active",v)}),c&&c(Array.from(i))}function b(f){c=f}return a("\u2705 Selector de paleta de colores creado"),{updateAvailableColors:y,getSelectedColors:x,setSelectedColors:p,onSelectionChange:b,element:r}}function Rt(){let t=null;function e(u){let i=document.createElement("div");i.style.cssText=`
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
      z-index: 9999;
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
        <div class="resize-preview-container" style="text-align: center; margin-bottom: 8px; height: 320px; overflow: auto; padding: 8px; background: #111; border: 1px solid #333; border-radius: 6px;">
          <img class="resize-preview" alt="Vista previa" style="image-rendering: pixelated; image-rendering: crisp-edges; display: block; margin: 0 auto;">
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
    `,document.body.appendChild(i),t={overlay:i,container:i,preview:i.querySelector(".resize-preview"),widthSlider:i.querySelector(".width-slider"),heightSlider:i.querySelector(".height-slider"),widthValue:i.querySelector(".width-value"),heightValue:i.querySelector(".height-value"),maintainAspect:i.querySelector(".maintain-aspect"),confirmBtn:i.querySelector(".confirm-resize"),cancelBtn:i.querySelector(".cancel-resize"),colorPaletteSelector:null,resizeWindow:i,resizeHeader:i.querySelector(".resize-header"),minimizeBtn:i.querySelector("#minimizeResizeBtn"),closeBtn:i.querySelector("#closeResizeBtn"),resizeContent:i.querySelector(".resize-content"),previewInfo:i.querySelector(".resize-preview-info")},d(i,t.resizeHeader);let l=!1;t.minimizeBtn.addEventListener("click",()=>{l=!l,l?(t.resizeContent.style.display="none",i.style.height="auto",i.style.resize="none",t.minimizeBtn.textContent="\u2795"):(t.resizeContent.style.display="block",i.style.resize="both",t.minimizeBtn.textContent="\u2796")}),t.closeBtn.addEventListener("click",()=>{n()}),Ie(i),a("\u2705 Elementos del di\xE1logo de redimensionamiento creados")}function r(u,i={}){if(!t){a("\u274C Error: Elementos de redimensionamiento no inicializados");return}let l=u.getDimensions(),c=l.width,g=l.height,m=c,h=g,y=c/g,x=()=>{try{let C=m,S=h,T=Math.max(100,(t.resizeWindow.clientWidth||450)-60),z=Math.max(1,Math.floor(Math.min(T/C,300/S))),$=document.createElement("canvas");$.width=C,$.height=S;let K=$.getContext("2d");K.imageSmoothingEnabled=!1;let M=u.img||u.canvas;M&&K.drawImage(M,0,0,C,S);let _=document.createElement("canvas");_.width=C*z,_.height=S*z;let B=_.getContext("2d");if(B.imageSmoothingEnabled=!1,B.drawImage($,0,0,_.width,_.height),t.preview.src=_.toDataURL(),t.preview.style.width=_.width+"px",t.preview.style.height=_.height+"px",t.previewInfo){let j=C*S;t.previewInfo.textContent=`${C}\xD7${S} px | Zoom ${z}x | Total: ${j.toLocaleString()} p\xEDxeles`}}catch(C){a("\u26A0\uFE0F Error generando vista previa:",C)}};if(t.widthSlider.value=c,t.heightSlider.value=g,t.widthValue.textContent=c,t.heightValue.textContent=g,!t.colorPaletteSelector){let C=t.container.querySelector(".resize-content")||t.container;t.colorPaletteSelector=Bt(C)}function p(){m=parseInt(t.widthSlider.value),t.widthValue.textContent=m,t.maintainAspect.checked&&(h=Math.round(m/y),t.heightSlider.value=h,t.heightValue.textContent=h),x()}function b(){h=parseInt(t.heightSlider.value),t.heightValue.textContent=h,t.maintainAspect.checked&&(m=Math.round(h*y),t.widthSlider.value=m,t.widthValue.textContent=m),x()}function f(){t.maintainAspect.checked&&(m=parseInt(t.widthSlider.value),h=Math.round(m/y),t.heightSlider.value=h,t.heightValue.textContent=h),x()}t.widthSlider.removeEventListener("input",p),t.heightSlider.removeEventListener("input",b),t.maintainAspect.removeEventListener("change",f),t.widthSlider.addEventListener("input",p),t.heightSlider.addEventListener("input",b),t.maintainAspect.addEventListener("change",f);function w(){var S,T;if(t.colorPaletteSelector&&t.colorPaletteSelector.getSelectedColors)return t.colorPaletteSelector.getSelectedColors();let C=(T=(S=t.colorPaletteSelector)==null?void 0:S.element)==null?void 0:T.querySelectorAll(".wplace-color-swatch.active");return C?Array.from(C).map(I=>parseInt(I.dataset.colorId)):[]}function L(C){!C||!t.colorPaletteSelector||t.colorPaletteSelector.updateAvailableColors&&t.colorPaletteSelector.updateAvailableColors(C)}function E(){let C=w();i.onConfirmResize&&i.onConfirmResize(u,m,h,C),n()}function v(){n()}if(t.confirmBtn.removeEventListener("click",E),t.cancelBtn.removeEventListener("click",v),t.confirmBtn.addEventListener("click",E),t.cancelBtn.addEventListener("click",v),i.getAvailableColors){let C=i.getAvailableColors();L(C)}i.onColorSelectionChange&&t.colorPaletteSelector&&t.colorPaletteSelector.onSelectionChange&&t.colorPaletteSelector.onSelectionChange(i.onColorSelectionChange),t.resizeWindow.style.display="flex",x(),a("\u{1F4CF} Di\xE1logo de redimensionamiento mostrado")}function d(u,i){let l=!1,c,g,m,h,y=0,x=0;i.addEventListener("mousedown",p),document.addEventListener("mousemove",b),document.addEventListener("mouseup",f);function p(w){m=w.clientX-y,h=w.clientY-x,w.target===i&&(l=!0)}function b(w){l&&(w.preventDefault(),c=w.clientX-m,g=w.clientY-h,y=c,x=g,u.style.left=c+"px",u.style.top=g+"px")}function f(){m=c,h=g,l=!1}}function n(){if(!t||!t.resizeWindow){a("\u274C Error: Elementos de redimensionamiento no encontrados");return}t.resizeWindow.style.display="none",ke(t.resizeWindow),a("\u{1F4CF} Di\xE1logo de redimensionamiento cerrado")}function s(u){e(u),a("\u2705 Ventana de redimensionamiento inicializada")}return{initialize:s,showResizeDialog:r,closeResizeDialog:n}}async function $t({texts:t,...e}){if(a("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let P=document.createElement("link");P.rel="stylesheet",P.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(P),a("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:r,root:d}=Te(),n=document.createElement("style");n.textContent=`
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
      z-index: 9998;
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
  `,d.appendChild(n);let s=document.createElement("div");s.className="container",s.innerHTML=`
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
  `,d.appendChild(s);let u=document.createElement("input");u.type="file",u.accept="image/png,image/jpeg",u.style.display="none",d.appendChild(u);let i=document.createElement("input");i.type="file",i.accept=".json",i.style.display="none",d.appendChild(i);let l={header:s.querySelector(".header"),configBtn:s.querySelector(".config-btn"),minimizeBtn:s.querySelector(".minimize-btn"),configPanel:s.querySelector(".config-panel"),pixelsPerBatch:s.querySelector(".pixels-per-batch"),useAllCharges:s.querySelector(".use-all-charges"),paintPattern:s.querySelector(".paint-pattern"),showOverlay:s.querySelector(".show-overlay"),batchValue:s.querySelector(".batch-value"),cooldownValue:s.querySelector(".cooldown-value"),initBtn:s.querySelector(".init-btn"),uploadBtn:s.querySelector(".upload-btn"),loadProgressBtn:s.querySelector(".load-progress-btn"),loadProgressBtnFlow:s.querySelector(".load-progress-btn-flow"),saveProgressBtn:s.querySelectorAll(".save-progress-btn"),resizeBtn:s.querySelector(".resize-btn"),selectPosBtn:s.querySelector(".select-pos-btn"),startBtn:s.querySelector(".start-btn"),startBtnUpload:s.querySelector(".start-btn-upload"),stopBtn:s.querySelector(".stop-btn"),stopBtnUpload:s.querySelector(".stop-btn-upload"),statsBtn:s.querySelector(".stats-btn"),logWindowBtn:s.querySelectorAll(".log-window-btn"),progressBar:s.querySelector(".progress-bar"),statsArea:s.querySelector(".stats-area"),status:s.querySelector(".status"),content:s.querySelector(".content")},c={minimized:!1,configVisible:!1},g={width:300,height:"auto",x:20,y:20};function m(){try{let P=localStorage.getItem("wplace-auto-image-window-config");P&&(g={...g,...JSON.parse(P)},y())}catch(P){console.warn("Error cargando configuraci\xF3n de ventana:",P)}}function h(){try{localStorage.setItem("wplace-auto-image-window-config",JSON.stringify(g))}catch(P){console.warn("Error guardando configuraci\xF3n de ventana:",P)}}function y(){s.style.width=typeof g.width=="number"?g.width+"px":g.width,typeof g.height=="number"&&(s.style.height=g.height+"px"),s.style.left=g.x+"px",s.style.top=g.y+"px"}m(),x(l.header,s);function x(P,k){let R=0,N=0,V=0,ie=0;P.style.cursor="move",P.addEventListener("mousedown",fe);function fe(U){U.target.closest(".header-btn, .wplace-header-btn")||(U.preventDefault(),V=U.clientX,ie=U.clientY,document.addEventListener("mouseup",Je),document.addEventListener("mousemove",xe))}function xe(U){U.preventDefault(),R=V-U.clientX,N=ie-U.clientY,V=U.clientX,ie=U.clientY;let Ft=k.offsetTop-N,Ot=k.offsetLeft-R,Nt=window.innerWidth-k.offsetWidth,Wt=window.innerHeight-k.offsetHeight,Ze=Math.max(0,Math.min(Nt,Ot)),Ke=Math.max(0,Math.min(Wt,Ft));k.style.top=Ke+"px",k.style.left=Ze+"px",g.x=Ze,g.y=Ke}function Je(){document.removeEventListener("mouseup",Je),document.removeEventListener("mousemove",xe),h()}}l.minimizeBtn.addEventListener("click",()=>{let P=s.querySelector(".content");P.style.display==="none"?(P.style.display="block",l.minimizeBtn.innerHTML="\u2796",s.style.height="auto",s.style.minHeight="auto"):(P.style.display="none",l.minimizeBtn.innerHTML="\u{1F53C}",s.style.height="auto",s.style.minHeight="auto")}),l.configBtn.addEventListener("click",()=>{c.configVisible=!c.configVisible,c.configVisible?(l.configPanel.classList.add("visible"),l.configBtn.innerHTML="\u274C"):(l.configPanel.classList.remove("visible"),l.configBtn.innerHTML="\u2699\uFE0F")}),l.pixelsPerBatch.addEventListener("change",()=>{let P=parseInt(l.pixelsPerBatch.value)||20;l.batchValue.textContent=P,e.onConfigChange&&e.onConfigChange({pixelsPerBatch:P})}),l.useAllCharges.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({useAllCharges:l.useAllCharges.checked})}),l.paintPattern.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({paintPattern:l.paintPattern.value})});function p(P){s.querySelectorAll("[data-state]").forEach(N=>{N.style.display="none"}),s.querySelectorAll(`[data-state*="${P}"]`).forEach(N=>{N.classList.contains("button-row"),N.style.display="flex"}),a(`\u{1F504} Estado cambiado a: ${P}`)}function b(){}l.initBtn.addEventListener("click",async()=>{l.initBtn.disabled=!0,e.onInitBot&&await e.onInitBot()&&void 0,l.initBtn.disabled=!1}),l.uploadBtn.addEventListener("click",()=>{u.click()}),u.addEventListener("change",async()=>{u.files.length>0&&e.onUploadImage&&await e.onUploadImage(u.files[0])&&(p("upload-image"),e.onResizeImage&&setTimeout(()=>{e.onResizeImage()},500))}),l.loadProgressBtn.addEventListener("click",()=>{i.click()}),i.addEventListener("change",async()=>{i.files.length>0&&e.onLoadProgress&&await e.onLoadProgress(i.files[0])&&p("load-progress")}),l.loadProgressBtnFlow.addEventListener("click",()=>{i.click()}),l.saveProgressBtn.forEach(P=>{P.addEventListener("click",()=>{e.onSaveProgress&&e.onSaveProgress()})}),l.resizeBtn.addEventListener("click",()=>{e.onResizeImage&&e.onResizeImage()});let f=async(P,k)=>{e.onSelectPosition&&(P.disabled=!0,await e.onSelectPosition()&&k&&(k.disabled=!1),P.disabled=!1)};l.selectPosBtn.addEventListener("click",()=>{f(l.selectPosBtn,l.startBtnUpload)}),l.showOverlay.addEventListener("change",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let P=l.showOverlay.checked;window.__WPA_PLAN_OVERLAY__.setEnabled(P)});let w=async(P,k)=>{e.onStartPainting&&(B(!0),await e.onStartPainting()||B(!1))},L=async(P,k)=>{e.onStopPainting&&await e.onStopPainting()&&B(!1)};l.startBtn.addEventListener("click",()=>{w(l.startBtn,l.stopBtn)}),l.stopBtn.addEventListener("click",()=>{L(l.startBtn,l.stopBtn)}),l.startBtnUpload.addEventListener("click",()=>{w(l.startBtnUpload,l.stopBtnUpload)}),l.stopBtnUpload.addEventListener("click",()=>{L(l.startBtnUpload,l.stopBtnUpload)});let E=null,v=null;l.logWindowBtn.forEach(P=>{P.addEventListener("click",()=>{E?E.toggle():(E=je("image"),E.show())})}),l.statsBtn.addEventListener("click",()=>{v?v.toggle():(v=kt(),v.setRefreshCallback(()=>{e.onRefreshStats&&e.onRefreshStats()}),v.show())});function C(P,k="default"){l.status.textContent=P,l.status.className=`status status-${k}`,l.status.style.animation="none",l.status.offsetWidth,l.status.style.animation="slideIn 0.3s ease-out"}function S(P,k,R=null){let N=k>0?P/k*100:0;l.progressBar.style.width=`${N}%`;let V=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${t.progress}</div>
        <div>${P}/${k} (${N.toFixed(1)}%)</div>
      </div>
    `;if(R&&(R.username&&(V+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} ${t.userName}</div>
            <div>${R.username}</div>
          </div>
        `),R.charges!==void 0&&(V+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${t.charges}</div>
            <div>${Math.floor(R.charges)}</div>
          </div>
        `),R.pixels!==void 0&&(V+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${t.pixels}</div>
            <div>${R.pixels.toLocaleString()}</div>
          </div>
        `),R.estimatedTime!==void 0&&R.estimatedTime>0)){let ie=Math.floor(R.estimatedTime/3600),fe=Math.floor(R.estimatedTime%3600/60),xe=ie>0?`${ie}h ${fe}m`:`${fe}m`;V+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${t.timeRemaining}</div>
            <div>${xe}</div>
          </div>
        `}l.statsArea.innerHTML=V}function T(P){if(P>0){let k=Math.floor(P/60),R=P%60,N=k>0?`${k}m ${R}s`:`${R}s`;l.cooldownValue.textContent=N}else l.cooldownValue.textContent="--"}function I(P){P&&P.includes("\u23F3")?(l.status.textContent=P,l.status.className="status status-info"):P&&C(P,"info")}function z(P){P?(l.initBtn.disabled=!0,l.initBtn.style.opacity="0.6",l.initBtn.innerHTML=`\u2705 <span>${t.initBot} - Completado</span>`):(l.initBtn.disabled=!1,l.initBtn.style.opacity="1",l.initBtn.innerHTML=`\u{1F916} <span>${t.initBot}</span>`)}function $(P){l.initBtn.style.display=P?"flex":"none"}function K(){p("initial"),s.querySelectorAll("button").forEach(k=>{k.disabled=!1})}function M(){E&&E.destroy(),v&&v.destroy(),r.remove()}function _(P){v&&v.isVisible()&&(P.userInfo&&v.updateUserStats(P.userInfo),P.imageInfo&&v.updateImageStats(P.imageInfo),P.availableColors&&v.updateColorsStats(P.availableColors))}function B(P){l.startBtn.disabled=P,l.startBtnUpload.disabled=P,l.stopBtn.disabled=!P,l.stopBtnUpload.disabled=!P,l.loadProgressBtn.disabled=P}function j(){Promise.resolve().then(()=>(le(),pt)).then(({imageState:P})=>{l.useAllCharges&&(l.useAllCharges.checked=P.useAllChargesFirst),l.paintPattern&&P.paintPattern&&(l.paintPattern.value=P.paintPattern),l.showOverlay&&P.showOverlay!==void 0&&(l.showOverlay.checked=P.showOverlay),a("\u2705 Interfaz actualizada con valores del estado cargado")}).catch(P=>{a("\u26A0\uFE0F Error actualizando interfaz desde estado:",P)})}let F=Rt();return F.initialize(d),a("\u2705 Interfaz de Auto-Image creada"),p("initial"),{setStatus:C,updateProgress:S,updateCooldownDisplay:T,updateCooldownMessage:I,setInitialized:z,setInitButtonVisible:$,enableButtonsAfterInit:b,setState:p,resetToInitialState:K,showResizeDialog:P=>{F.showResizeDialog(P,{getAvailableColors:e.getAvailableColors,onColorSelectionChange:e.onColorSelectionChange,onConfirmResize:e.onConfirmResize})},closeResizeDialog:()=>{F.closeResizeDialog()},updateStatsWindow:_,setPaintingState:B,updateUIFromState:j,destroy:M,generateGuardJSON:e.generateGuardJSON,elements:l}}D();function Ve(){function t(n,s,u={}){return new Promise(i=>{let l=document.createElement("div");l.className="modal-overlay",l.style.position="fixed",l.style.top="0",l.style.left="0",l.style.width="100%",l.style.height="100%",l.style.background="rgba(0,0,0,0.7)",l.style.zIndex="10001",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center";let c=document.createElement("div");c.style.background="#1a1a1a",c.style.border="2px solid #333",c.style.borderRadius="15px",c.style.padding="25px",c.style.color="#eee",c.style.minWidth="350px",c.style.maxWidth="400px",c.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",c.style.fontFamily="'Segoe UI', Roboto, sans-serif",c.innerHTML=`
        <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${s}</h3>
        <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4; white-space: pre-line;">${n}</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          ${u.confirm?`<button class="confirm-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${u.confirm}</button>`:""}
          ${u.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${u.save}</button>`:""}
          ${u.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${u.discard}</button>`:""}
          ${u.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${u.cancel}</button>`:""}
        </div>
      `,l.appendChild(c),document.body.appendChild(l);let g=c.querySelector(".confirm-btn"),m=c.querySelector(".save-btn"),h=c.querySelector(".discard-btn"),y=c.querySelector(".cancel-btn"),x=()=>{document.body.removeChild(l)};g&&g.addEventListener("click",()=>{x(),i("confirm")}),m&&m.addEventListener("click",()=>{x(),i("save")}),h&&h.addEventListener("click",()=>{x(),i("discard")}),y&&y.addEventListener("click",()=>{x(),i("cancel")}),l.addEventListener("click",b=>{b.target===l&&(x(),i("cancel"))});let p=b=>{b.key==="Escape"&&(x(),document.removeEventListener("keydown",p),i("cancel"))};document.addEventListener("keydown",p)})}function e(n){return new Promise(s=>{let u=n.remainingPixels?n.remainingPixels.length:0,i=n.imageData&&n.imageData.processor?n.imageData.processor:null,l=u;try{if((!l||l===0)&&i&&typeof i.generatePixelQueue=="function"){let x=i.generatePixelQueue();Array.isArray(x)&&(l=x.length)}}catch{}let c=n.imageData?n.imageData.width:0,g=n.imageData?n.imageData.height:0;if((!c||!g)&&i&&typeof i.getDimensions=="function")try{let x=i.getDimensions();x&&x.width&&x.height&&(c=x.width,g=x.height)}catch{}let m=typeof n.tileX=="number"?n.tileX:0,h=typeof n.tileY=="number"?n.tileY:0,y=`\xBFDeseas generar un archivo JSON compatible con Auto-Guard.js?

Este archivo contendr\xE1:
\u2022 \xC1rea de protecci\xF3n: ${c}x${g} p\xEDxeles
\u2022 Posici\xF3n: Tile (${m}, ${h})
\u2022 ${l||0} p\xEDxeles para proteger

El archivo se guardar\xE1 autom\xE1ticamente y podr\xE1s importarlo en Auto-Guard.js.`;t(y,"\u{1F6E1}\uFE0F Generar JSON para Auto-Guard",{confirm:"S\xED, generar JSON",cancel:"No, continuar sin generar"}).then(x=>{s(x==="confirm")}).catch(()=>{s(!1)})})}function r(n){return new Promise(s=>{try{let u=n&&n.protectionData&&n.protectionData.area,i=u?n.protectionData.area:null,l=i&&["x1","y1","x2","y2"].every(f=>Number.isFinite(i[f])),c=Array.isArray(n==null?void 0:n.originalPixels),g=Array.isArray(n==null?void 0:n.colors);if(!u||!l||!c||!g){a("\u274C Estructura inv\xE1lida para JSON del Guard. Abortando guardado.");try{d("Estructura inv\xE1lida del JSON del Guard. Vuelve a intentarlo tras seleccionar la posici\xF3n.","error")}catch{}return s({success:!1,error:"Invalid Guard JSON structure"})}let h=`wplace_GUARD_from_Image_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,y=JSON.stringify(n,null,2),x=new window.Blob([y],{type:"application/json"}),p=window.URL.createObjectURL(x),b=document.createElement("a");b.href=p,b.download=h,document.body.appendChild(b),b.click(),document.body.removeChild(b),window.URL.revokeObjectURL(p),a(`\u2705 JSON del Guard guardado: ${h}`),s({success:!0,filename:h})}catch(u){a(`\u274C Error guardando JSON del Guard: ${u.message}`),s({success:!1,error:u.message})}})}function d(n,s="info"){let u=document.createElement("div");switch(u.style.position="fixed",u.style.top="20px",u.style.right="20px",u.style.padding="15px 20px",u.style.borderRadius="8px",u.style.color="white",u.style.fontWeight="bold",u.style.zIndex="10002",u.style.maxWidth="300px",u.style.boxShadow="0 4px 12px rgba(0,0,0,0.3)",u.style.fontFamily="'Segoe UI', Roboto, sans-serif",u.style.fontSize="14px",s){case"success":u.style.background="#10b981";break;case"error":u.style.background="#ef4444";break;case"warning":u.style.background="#f59e0b";break;default:u.style.background="#3b82f6"}u.textContent=n,document.body.appendChild(u),setTimeout(()=>{document.body.contains(u)&&document.body.removeChild(u)},3e3)}return{showConfirmDialog:t,showGuardDialog:e,saveGuardJSON:r,showNotification:d}}function zt(t,e,r={}){return Ve().showConfirmDialog(t,e,r)}function _t(t){return Ve().showGuardDialog(t)}function Mt(t){return Ve().saveGuardJSON(t)}ye();function Re(t=!1){let e=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let n of e){let s=document.querySelector(n);if(s&&s.offsetParent!==null)return t&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por selector: ${n}`),!0}let r=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),d=0;for(let n of r)if(n.offsetParent!==null&&n.offsetWidth>10&&n.offsetHeight>10&&(d++,d>=5))return t&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por colores visibles: ${d}`),!0;return t&&console.log(`[WPA-UI] \u{1F50D} Paleta no detectada. Colores visibles: ${d}`),!1}function Eo(t=!1,e=!1){let r=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(r){let n=r.textContent.toLowerCase(),s=n.includes("paint")||n.includes("pintar"),u=r.querySelector('svg path[d*="240-120"]')||r.querySelector('svg path[d*="M15"]');if(s||u)return t&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por selector espec\xEDfico: "${n}"`),r.click(),e&&setTimeout(()=>{t&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),r.click()},500),!0}let d=document.querySelectorAll("button");for(let n of d){let s=n.textContent.toLowerCase();if((s.includes("paint")||s.includes("pintar"))&&n.offsetParent!==null&&!n.disabled)return t&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por texto: "${n.textContent.trim()}"`),n.click(),e&&setTimeout(()=>{t&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),n.click()},500),!0}return t&&console.log("[WPA-UI] \u274C Bot\xF3n Paint no encontrado"),!1}async function $e(t=3,e=!0){e&&console.log(`[WPA-UI] \u{1F916} Iniciando auto-click del bot\xF3n Paint (m\xE1ximo ${t} intentos)`);for(let r=1;r<=t;r++){if(e&&console.log(`[WPA-UI] \u{1F3AF} Intento ${r}/${t} - Buscando bot\xF3n Paint...`),Re())return e&&console.log("[WPA-UI] \u2705 Paleta ya est\xE1 abierta, auto-click completado"),!0;if(Eo(e,!1)){if(e&&console.log("[WPA-UI] \u{1F446} Clic en bot\xF3n Paint realizado (sin segundo clic)"),await new Promise(d=>setTimeout(d,1500)),Re())return e&&console.log(`[WPA-UI] \u2705 Paleta abierta exitosamente despu\xE9s del intento ${r}`),!0;e&&console.log(`[WPA-UI] \u26A0\uFE0F Paleta no detectada tras el clic en intento ${r}. Reintentar\xE1.`)}else e&&console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado para clic en intento ${r}`);r<t&&await new Promise(d=>setTimeout(d,1e3))}return e&&console.log(`[WPA-UI] \u274C Auto-click fall\xF3 despu\xE9s de ${t} intentos`),!1}(()=>{let e={enabled:!1,templates:[],templatesShouldBeDrawn:!0,tileSize:1e3,drawMult:3,pixelPlan:null,nextBatchCount:0,anchor:null,imageWidth:null,imageHeight:null,originalFetch:null,fetchedBlobQueue:new Map,isIntercepting:!1};function r(){}function d(){e.isIntercepting||(e.originalFetch=window.fetch,e.isIntercepting=!0,window.fetch=async function(...p){var E;let b=await e.originalFetch.apply(this,p),f=b.clone(),w=(p[0]instanceof Request?(E=p[0])==null?void 0:E.url:p[0])||"ignore";if((f.headers.get("content-type")||"").includes("image/")&&w.includes("/tiles/")&&!w.includes("openfreemap")&&!w.includes("maps"))try{let v=await f.blob(),C=await s(v,w);return new Response(C,{headers:f.headers,status:f.status,statusText:f.statusText})}catch(v){return console.error("[PLAN OVERLAY] Error processing tile:",v),b}return b})}function n(){!e.isIntercepting||!e.originalFetch||(window.fetch=e.originalFetch,e.isIntercepting=!1)}async function s(p,b){if(!e.enabled||!e.templatesShouldBeDrawn||!e.pixelPlan)return p;let f=b.split("/"),w=parseInt(f[f.length-1].replace(".png","")),L=parseInt(f[f.length-2]);if(isNaN(L)||isNaN(w))return console.warn("[PLAN OVERLAY] Could not extract tile coordinates from URL:",b),p;let E=u(L,w);if(E.length===0)return p;let v=e.tileSize*e.drawMult,C=await createImageBitmap(p),S=new OffscreenCanvas(v,v),T=S.getContext("2d");return T.imageSmoothingEnabled=!1,T.clearRect(0,0,v,v),T.drawImage(C,0,0,v,v),i(T,E,L,w),await S.convertToBlob({type:"image/png"})}function u(p,b){return!e.pixelPlan||!e.pixelPlan.pixels?[]:e.pixelPlan.pixels.filter(f=>{let w=Math.floor(f.globalX/3e3),L=Math.floor(f.globalY/3e3);return w===p&&L===b})}function i(p,b,f,w){let L=f*3e3,E=w*3e3;p.globalAlpha=.7;for(let v of b){let C=(v.globalX-L)*e.drawMult+1,S=(v.globalY-E)*e.drawMult+1;C>=0&&C<e.tileSize*e.drawMult&&S>=0&&S<e.tileSize*e.drawMult&&(p.fillStyle=`rgb(${v.r},${v.g},${v.b})`,p.fillRect(C,S,1,1))}if(e.nextBatchCount>0){p.globalAlpha=1;let v=b.slice(0,e.nextBatchCount);for(let C of v){let S=(C.globalX-L)*e.drawMult+1,T=(C.globalY-E)*e.drawMult+1;S>=0&&S<e.tileSize*e.drawMult&&T>=0&&T<e.tileSize*e.drawMult&&(p.fillStyle=`rgb(${C.r},${C.g},${C.b})`,p.fillRect(S,T,1,1))}}}function l(p){e.enabled=!!p,e.enabled?d():n()}function c(p,b={}){var w,L,E;if(!p||p.length===0){e.pixelPlan=null;return}let f=[];for(let v of p){let C,S;if(typeof v.tileX=="number"&&typeof v.localX=="number")C=v.tileX*3e3+v.localX,S=v.tileY*3e3+v.localY;else if(b.anchor&&typeof v.imageX=="number"){let T=b.anchor.tileX*3e3+(b.anchor.pxX||0),I=b.anchor.tileY*3e3+(b.anchor.pxY||0);C=T+v.imageX,S=I+v.imageY}else continue;f.push({globalX:C,globalY:S,r:((w=v.color)==null?void 0:w.r)||0,g:((L=v.color)==null?void 0:L.g)||0,b:((E=v.color)==null?void 0:E.b)||0})}e.pixelPlan={pixels:f},e.nextBatchCount=b.nextBatchCount||0,e.anchor=b.anchor||null,e.imageWidth=b.imageWidth||null,e.imageHeight=b.imageHeight||null,typeof b.enabled=="boolean"&&l(b.enabled)}function g(p){e.nextBatchCount=Math.max(0,Number(p||0))}function m(p){e.anchor=p}function h(){}function y(){}function x(){n(),e.pixelPlan=null,e.fetchedBlobQueue.clear()}window.__WPA_PLAN_OVERLAY__={injectStyles:r,setEnabled:l,setPlan:c,setPlanItemsFromTileList:c,setNextBatchCount:g,setAnchor:m,setAnchorCss:h,endSelectionMode:y,render:()=>{},cleanup:x,get state(){return e}}})();async function Dt(){console.log("[WPA-Image] \u{1F680} runImage() iniciado"),a("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),console.log("[WPA-Image] \u{1F30D} Inicializando sistema de idiomas"),ze(),console.log("[WPA-Image] \u2705 Sistema de idiomas inicializado"),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0},console.log("[WPA-Image] \u{1F527} Estado global actualizado");let t=null,e=window.fetch,r=()=>{let d=window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.state&&window.__WPA_PLAN_OVERLAY__.state.enabled;window.fetch!==e&&!d?(window.fetch=e,a("\u{1F504} Fetch original restaurado")):d&&a("\u{1F504} Fetch NO restaurado - overlay activo"),o.positionTimeoutId&&(clearTimeout(o.positionTimeoutId),o.positionTimeoutId=null),o.cleanupObserver&&(o.cleanupObserver(),o.cleanupObserver=null),o.selectingPosition=!1};try{let d={...J},n=we("image");if(o.language=gt(),!d.SITEKEY){let c=document.querySelector("*[data-sitekey]");c?(d.SITEKEY=c.getAttribute("data-sitekey"),a(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${d.SITEKEY.substring(0,20)}...`)):a("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function s(){return a("\u{1F916} Intentando auto-inicio..."),Re()?(a("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(a("\u{1F50D} Paleta no encontrada, iniciando auto-click del bot\xF3n Paint..."),await $e(3,!0)?(a("\u2705 Auto-click exitoso, paleta abierta"),!0):(a("\u274C Auto-click fall\xF3, requerir\xE1 inicio manual"),!1))}async function u(c=!1){a("\u{1F916} Inicializando Auto-Image..."),i.setStatus(A("image.checkingColors"),"info");let g=ce();if(g.length===0)return i.setStatus(A("image.noColorsFound"),"error"),!1;let m=await ne(),h=null;m.success&&m.data.user?(h={username:m.data.user.name||"An\xF3nimo",charges:m.data.charges,maxCharges:m.data.maxCharges,pixels:m.data.user.pixelsPainted||0},t=h,o.currentCharges=m.data.charges,o.maxCharges=m.data.maxCharges||9999,a(`\u{1F464} Usuario conectado: ${m.data.user.name||"An\xF3nimo"} - Cargas: ${h.charges}/${h.maxCharges} - P\xEDxeles: ${h.pixels}`)):a("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),o.availableColors=g,o.colorsChecked=!0,i.setStatus(A("image.colorsFound",{count:g.length}),"success"),i.updateProgress(0,0,h),c||a(`\u2705 ${g.length} colores disponibles detectados`),i.setInitialized(!0),i.enableButtonsAfterInit();try{}catch{}return!0}let i=await $t({texts:n,onConfigChange:c=>{c.pixelsPerBatch!==void 0&&(o.pixelsPerBatch=c.pixelsPerBatch),c.useAllCharges!==void 0&&(o.useAllChargesFirst=c.useAllCharges),c.paintPattern!==void 0&&(o.paintPattern=c.paintPattern,a(`\u{1F3A8} Patr\xF3n de pintado cambiado a: ${c.paintPattern}`),o.remainingPixels&&o.remainingPixels.length>0&&Promise.resolve().then(()=>(Se(),We)).then(({applyPaintPattern:g})=>{o.remainingPixels=g(o.remainingPixels,c.paintPattern,o.imageData);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}),a(`\u2705 Overlay actualizado con nuevo patr\xF3n: ${c.paintPattern}`))}catch(m){a("\u26A0\uFE0F Error actualizando overlay con nuevo patr\xF3n:",m)}}).catch(g=>{a("\u274C Error aplicando nuevo patr\xF3n:",g)})),a("Configuraci\xF3n actualizada:",c)},onInitBot:u,onUploadImage:async c=>{try{i.setStatus(A("image.loadingImage"),"info");let g=window.URL.createObjectURL(c),m=new Pe(g);m.originalName=c.name,await m.load();let h=m.initializeColorPalette();o.availableColors=h;let y=await m.analyzePixels();m.setCoords(0,0,0,0);let x=m.getImageData();o.imageData=x,o.imageData.processor=m,o.totalPixels=y.requiredPixels,o.paintedPixels=0,o.originalImageName=c.name,o.imageLoaded=!0,i.setStatus(A("image.imageLoaded",{count:y.requiredPixels}),"success"),i.updateProgress(0,y.requiredPixels,t),a(`\u2705 [BLUE MARBLE] Imagen cargada: ${x.width}x${x.height}, ${y.requiredPixels} p\xEDxeles v\xE1lidos`),a(`\u2705 [BLUE MARBLE] An\xE1lisis: ${y.uniqueColors} colores \xFAnicos, ${y.defacePixels} p\xEDxeles #deface`),window.URL.revokeObjectURL(g);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),a("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(p){a("\u26A0\uFE0F Error activando plan overlay:",p)}return!0}catch(g){return i.setStatus(A("image.imageError"),"error"),a("\u274C Error cargando imagen:",g),!1}},onSelectPosition:async()=>new Promise(c=>{i.setStatus(A("image.selectPositionAlert"),"info"),i.setStatus(A("image.waitingPosition"),"info"),o.selectingPosition=!0;let g=!1,m=()=>{window.fetch=async(x,p)=>{if(o.selectingPosition&&!g&&typeof x=="string"&&x.includes("/s0/pixel/")&&p&&p.method==="POST")try{a(`\u{1F3AF} Interceptando request de pintado: ${x}`);let b=await e(x,p);if(b.ok&&p.body){let f;try{f=JSON.parse(p.body)}catch(w){return a("Error parseando body del request:",w),b}if(f.coords&&Array.isArray(f.coords)&&f.coords.length>=2){let w=f.coords[0],L=f.coords[1],E=x.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(E&&!g){g=!0;let v=parseInt(E[1]),C=parseInt(E[2]);if(o.tileX=v,o.tileY=C,o.startPosition={x:w,y:L},o.selectingPosition=!1,o.imageData&&o.imageData.processor){let S=o.imageData.processor;S.setCoords(v,C,w,L);try{await S.createTemplateTiles(),a(`\u2705 [BLUE MARBLE] Template tiles creados para posici\xF3n tile(${v},${C}) pixel(${w},${L})`)}catch(I){a(`\u274C [BLUE MARBLE] Error creando template tiles: ${I.message}`)}let T=S.generatePixelQueue();o.remainingPixels=T,(!o.totalPixels||o.totalPixels===0)&&(o.totalPixels=T.length),a(`\u2705 Cola de p\xEDxeles generada: ${T.length} p\xEDxeles para overlay`)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setEnabled(!1),window.__WPA_PLAN_OVERLAY__.setPlan([],{}),window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:v,tileY:C,pxX:w,pxY:L}),o.remainingPixels&&o.remainingPixels.length>0?(window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{anchor:{tileX:v,tileY:C,pxX:w,pxY:L},imageWidth:o.imageData.width,imageHeight:o.imageData.height,enabled:!0}),a(`\u2705 Plan overlay reiniciado y anclado en tile(${v},${C}) local(${w},${L})`)):a("\u26A0\uFE0F No hay p\xEDxeles para mostrar en overlay"))}catch(S){a(`\u274C Error configurando overlay: ${S.message}`)}r(),i.setStatus(A("image.positionSet"),"success"),a(`\u2705 Posici\xF3n establecida: tile(${o.tileX},${o.tileY}) local(${w},${L})`),setTimeout(async()=>{try{if(a("\u{1F6E1}\uFE0F Mostrando di\xE1logo de Auto-Guard..."),await _t(o)){a("\u2705 Usuario acept\xF3 generar JSON para Auto-Guard");let T=null;if(typeof i.generateGuardJSON=="function")T=i.generateGuardJSON();else throw new Error("generateGuardJSON no est\xE1 disponible en la UI");await Mt(T)}else a("\u2139\uFE0F Usuario decidi\xF3 no generar JSON para Auto-Guard")}catch(S){a("\u274C Error mostrando di\xE1logo de Auto-Guard:",S)}},1e3),c(!0)}else a("\u26A0\uFE0F No se pudo extraer tile de la URL:",x)}}return b}catch(b){if(a("\u274C Error interceptando pixel:",b),!g)return r(),e(x,p)}return e(x,p)}},h=()=>{let x=document.querySelectorAll("canvas");if(x.length===0){a("\u26A0\uFE0F No se encontraron elementos canvas");return}a(`\u{1F4CA} Configurando observer para ${x.length} canvas`);let p=b=>{var w;if(!o.selectingPosition||g)return;let f=b.target;if(f&&f.tagName==="CANVAS"){a("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let E=(((w=document.querySelector("canvas"))==null?void 0:w.parentElement)||document.body).getBoundingClientRect(),v=b.clientX-E.left,C=b.clientY-E.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(v,C),a(`Plan overlay: ancla CSS establecida en (${v}, ${C})`))}catch(L){a("Plan Overlay: error calculando ancla CSS",L)}setTimeout(()=>{!g&&o.selectingPosition&&a("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",p),o.cleanupObserver=()=>{document.removeEventListener("click",p)}};m(),h();let y=setTimeout(()=>{o.selectingPosition&&!g&&(r(),o.cleanupObserver&&o.cleanupObserver(),i.setStatus(A("image.positionTimeout"),"error"),a("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),c(!1))},12e4);o.positionTimeoutId=y}),onStartPainting:async()=>{var c;if(a("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:o.imageLoaded,startPosition:o.startPosition,tileX:o.tileX,tileY:o.tileY,totalPixels:o.totalPixels,remainingPixels:((c=o.remainingPixels)==null?void 0:c.length)||0}),!o.imageLoaded||!o.startPosition)return i.setStatus(A("image.missingRequirements"),"error"),a(`\u274C Validaci\xF3n fallida: imageLoaded=${o.imageLoaded}, startPosition=${!!o.startPosition}`),!1;o.running=!0,o.stopFlag=!1,o.isFirstBatch=o.useAllChargesFirst,a(`\u{1F680} Iniciando pintado - isFirstBatch: ${o.isFirstBatch}, useAllChargesFirst: ${o.useAllChargesFirst}`),i.setStatus(A("image.startPaintingMsg"),"success");try{return await Et(o.imageData,o.startPosition,(g,m,h,y)=>{t&&(t.charges=Math.floor(o.currentCharges),y!==void 0&&(t.estimatedTime=y)),i.updateProgress(g,m,t),o.inCooldown&&o.nextBatchCooldown>0?i.updateCooldownDisplay(o.nextBatchCooldown):i.updateCooldownDisplay(0),h?h.includes("\u23F3")&&o.inCooldown?i.updateCooldownMessage(h):i.setStatus(h,"info"):i.setStatus(A("image.paintingProgress",{painted:g,total:m}),"info")},(g,m)=>{g?(i.setStatus(A("image.paintingComplete",{count:m}),"success"),At()):i.setStatus(A("image.paintingStopped"),"warning"),o.running=!1},g=>{i.setStatus(A("image.paintingError"),"error"),a("\u274C Error en proceso de pintado:",g),o.running=!1}),!0}catch(g){return i.setStatus(A("image.paintingError"),"error"),a("\u274C Error iniciando pintado:",g),o.running=!1,!1}},onStopPainting:async()=>{if(Tt().hasProgress){let g=await zt(A("image.confirmSaveProgress"),A("image.saveProgressTitle"),{save:A("image.saveProgress"),discard:A("image.discardProgress"),cancel:A("image.cancel")});if(g==="save"){let m=Xe();m.success?i.setStatus(A("image.progressSaved",{filename:m.filename}),"success"):i.setStatus(A("image.progressSaveError",{error:m.error}),"error")}else if(g==="cancel")return!1}return Ue(),i.setStatus(A("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let c=Xe();return c.success?i.setStatus(A("image.progressSaved",{filename:c.filename}),"success"):i.setStatus(A("image.progressSaveError",{error:c.error}),"error"),c.success},onLoadProgress:async c=>{try{let g=await Lt(c);return g.success?(i.setStatus(A("image.progressLoaded",{painted:g.painted,total:g.total}),"success"),i.updateProgress(g.painted,g.total,t),i.updateUIFromState(),a("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(i.setStatus(A("image.progressLoadError",{error:g.error}),"error"),!1)}catch(g){return i.setStatus(A("image.progressLoadError",{error:g.message}),"error"),!1}},onResizeImage:()=>{o.imageLoaded&&o.imageData&&o.imageData.processor&&i.showResizeDialog(o.imageData.processor)},onConfirmResize:async(c,g,m,h)=>{a(`\u{1F504} Redimensionando imagen de ${c.getDimensions().width}x${c.getDimensions().height} a ${g}x${m}`),a(`\u{1F3A8} Colores seleccionados: ${h?h.length:"todos"}`);try{if(await c.resize(g,m),h&&h.length>0){let x=o.availableColors.filter(p=>h.includes(p.id));c.setSelectedColors(x),a(`\u{1F3A8} Paleta actualizada con ${h.length} colores seleccionados`)}let y=await c.analyzePixels();o.imageData={processor:c,width:g,height:m,validPixelCount:y.requiredPixels,requiredPixels:y.requiredPixels,totalPixels:y.totalPixels},o.totalPixels=y.requiredPixels,o.paintedPixels=0,o.remainingPixels=[],o.lastPosition={x:0,y:0},i.updateProgress(0,y.requiredPixels,t),i.setStatus(A("image.resizeSuccess",{width:g,height:m}),"success"),a(`\u2705 Imagen redimensionada: ${y.requiredPixels} p\xEDxeles v\xE1lidos de ${y.totalPixels} totales`),setTimeout(()=>{i.setState("upload-image"),a("\u{1F504} Estado cambiado a: upload-image"),setTimeout(()=>{var p;let x=(p=i.elements)==null?void 0:p.selectPosBtn;if(a("\u{1F50D} Buscando bot\xF3n selector de posici\xF3n..."),x){a(`\u{1F4CD} Bot\xF3n encontrado - Disabled: ${x.disabled}, Visible: ${x.offsetParent!==null}, Display: ${window.getComputedStyle(x).display}`);let b=x.closest(".button-row");b&&a(`\u{1F4E6} Contenedor padre - Display: ${window.getComputedStyle(b).display}, Data-state: ${b.getAttribute("data-state")}`),!x.disabled&&x.offsetParent!==null&&window.getComputedStyle(x).display!=="none"?(a("\u{1F3AF} Activando autom\xE1ticamente el selector de posici\xF3n..."),x.click()):a("\u26A0\uFE0F No se pudo activar el selector de posici\xF3n autom\xE1ticamente - bot\xF3n no disponible")}else a("\u274C Bot\xF3n selector de posici\xF3n no encontrado - verificar referencia UI")},300)},700);try{if(window.__WPA_PLAN_OVERLAY__&&o.startPosition&&o.tileX!=null&&o.tileY!=null){await c.createTemplateTiles();let x=c.generatePixelQueue();o.remainingPixels=x,window.__WPA_PLAN_OVERLAY__.setPlan(x,{anchor:{tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y},imageWidth:g,imageHeight:m,enabled:!0}),a(`\u2705 Overlay actualizado con ${x.length} p\xEDxeles despu\xE9s del resize`)}}catch(x){a(`\u26A0\uFE0F Error actualizando overlay despu\xE9s del resize: ${x.message}`)}}catch(y){a(`\u274C Error redimensionando imagen: ${y.message}`),i.setStatus(A("image.imageError"),"error")}},onRefreshStats:async()=>{var c;a("\u{1F504} Actualizando estad\xEDsticas...");try{let g=await ne(),m=null;g.success&&g.data.user&&(m={username:g.data.user.name||"An\xF3nimo",charges:g.data.charges,maxCharges:g.data.maxCharges,pixels:g.data.user.pixelsPainted||0,cooldown:g.data.cooldown||0},t=m,o.currentCharges=g.data.charges,o.maxCharges=g.data.maxCharges||9999);let h=ce();h.length>0&&(o.availableColors=h,o.colorsChecked=!0);let y=null;o.imageLoaded&&(y={loaded:!0,totalPixels:o.totalPixels,paintedPixels:o.paintedPixels,estimatedTime:o.estimatedTime,originalName:o.originalImageName}),i.updateStatsWindow({userInfo:m,imageInfo:y,availableColors:h.length>0?h:o.availableColors}),i.updateProgress(o.paintedPixels,o.totalPixels,m),a(`\u2705 Estad\xEDsticas actualizadas: ${h.length>0?h.length:((c=o.availableColors)==null?void 0:c.length)||0} colores disponibles`)}catch(g){a("\u274C Error actualizando estad\xEDsticas:",g)}},getAvailableColors:()=>o.availableColors||[],onColorSelectionChange:c=>{a(`\u{1F3A8} Selecci\xF3n de colores cambiada: ${c.length} colores seleccionados`)},generateGuardJSON:()=>{if(!o.imageLoaded||!o.imageData||!o.startPosition||o.tileX==null||o.tileY==null)throw new Error("Datos insuficientes para generar JSON del Guard. Aseg\xFArate de haber cargado una imagen y seleccionado una posici\xF3n.");let c=o.imageData.processor;if(!c)throw new Error("Procesador de imagen no disponible.");let{width:g,height:m}=o.imageData,{x:h,y}=o.startPosition,{tileX:x,tileY:p}=o,b=x*1e3+h,f=p*1e3+y,w=b+g-1,L=f+m-1,E=c.generatePixelQueue(),v=[];E&&E.length>0&&E.forEach(S=>{let T=S.globalX||S.x||x*1e3+h+S.imageX,I=S.globalY||S.y||p*1e3+y+S.imageY,z=`${T},${I}`;v.push({key:z,x:T,y:I,color:{r:S.color.r,g:S.color.g,b:S.color.b}})});let C={version:"1.0",timestamp:Date.now(),protectionData:{area:{x1:b,y1:f,x2:w,y2:L},protectedPixels:v.length,splitInfo:null},progress:{totalRepaired:0,lastCheck:Date.now()},config:{maxProtectionSize:1e5,pixelsPerBatch:50,checkInterval:1e4},colors:o.availableColors.map(S=>({id:S.id,r:S.r,g:S.g,b:S.b})),originalPixels:v};return a(`\u2705 JSON del Guard generado: \xE1rea (${b},${f}) a (${w},${L}), ${v.length} p\xEDxeles de ${E.length} totales`),C}}),l=c=>{let{language:g}=c.detail;a(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${g}`),o.language=g};window.addEventListener("launcherLanguageChanged",l),window.addEventListener("languageChanged",l),window.addEventListener("beforeunload",()=>{r(),Ue(),i.destroy(),window.removeEventListener("launcherLanguageChanged",l),window.removeEventListener("languageChanged",l),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),a("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{i.setStatus(A("image.autoInitializing"),"info"),a("\u{1F916} Intentando auto-inicio..."),await s()?(i.setStatus(A("image.autoInitSuccess"),"success"),a("\u2705 Auto-inicio exitoso"),i.setInitButtonVisible(!1),await u(!0)&&a("\u{1F680} Bot auto-iniciado completamente")):(i.setStatus(A("image.autoInitFailed"),"warning"),a("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(c){a("\u274C Error en auto-inicio:",c),i.setStatus(A("image.manualInitRequired"),"warning")}},1e3)}catch(d){throw a("\u274C Error inicializando Auto-Image:",d),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),d}}(async()=>{"use strict";var t,e;console.log("[WPA-Image] \u{1F680} Entry point iniciado");try{console.log("[WPA-Image] \u{1F916} Iniciando auto-click del bot\xF3n Paint..."),await $e(3,!0),console.log("[WPA-Image] \u2705 Auto-click completado")}catch(r){console.log("[WPA-Image] \u26A0\uFE0F Error en auto-click del bot\xF3n Paint:",r)}if((t=window.__wplaceBot)!=null&&t.imageRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Image ya est\xE1 corriendo"),alert("Auto-Image ya est\xE1 corriendo.");return}if((e=window.__wplaceBot)!=null&&e.farmRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Farm est\xE1 ejecut\xE1ndose"),alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={},console.log("[WPA-Image] \u{1F527} Estado global inicializado")),window.__wplaceBot.imageRunning=!0,console.log("[WPA-Image] \u{1F3C3} Marcado como ejecut\xE1ndose"),console.log("[WPA-Image] \u{1F3AF} Llamando a runImage()"),Dt().catch(r=>{console.error("[BOT] Error en Auto-Image:",r),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
