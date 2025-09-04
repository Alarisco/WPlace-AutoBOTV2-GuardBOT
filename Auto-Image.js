/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-09-04T17:53:04.567Z */
(()=>{var oo=Object.defineProperty;var j=(t,e)=>()=>(t&&(e=t(t=0)),e);var ct=(t,e)=>{for(var i in e)oo(t,i,{get:e[i],enumerable:!0})};var s,M=j(()=>{s=(...t)=>console.log("[WPA-UI]",...t)});var dt,ut=j(()=>{dt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",userName:"Usuario",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",showOverlay:"Mostrar overlay",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando...",paintPattern:"\u{1F4D0} Patr\xF3n de pintado",patternLinearStart:"Lineal (Inicio)",patternLinearEnd:"Lineal (Final)",patternRandom:"Aleatorio",patternCenterOut:"Centro hacia afuera",patternCornersFirst:"Esquinas primero",patternSpiral:"Espiral",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",userInfo:"Informaci\xF3n del Usuario",imageProgress:"Progreso de la Imagen",availableColors:"Colores Disponibles",noImageLoaded:"No hay imagen cargada",cooldown:"Tiempo de espera",totalColors:"Total de Colores",colorPalette:"Paleta de Colores",showAllColors:"Mostrar Todos los Colores (incluyendo no disponibles)",selectAllColors:"Seleccionar Todos",unselectAllColors:"Deseleccionar Todos",noAvailable:"No disponible",colorSelected:"Color seleccionado",statsUpdated:"\u2705 Estad\xEDsticas actualizadas: {count} colores disponibles"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",position:"Posici\xF3n",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida!",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",ready:"Listo",once:"Una vez",recapture:"Re-capturar",stats:{painted:"Pintados",charges:"Cargas",droplets:"Gotas",user:"Usuario",retries:"Reintentos"},config:{minCharges:"Cargas m\xEDnimas",delay:"Espera (seg)",pixelsPerBatch:"P\xEDxeles por lote"},color:{fixed:"Fijo",range:"Rango",random:"Aleatorio",selected:"Color seleccionado",min:"M\xEDn",max:"M\xE1x"},autobuy:{title:"Auto-compra (+5 cargas)",hint:"Se activar\xE1 autom\xE1ticamente cuando tengas \u2265 500 gotas"},buyCharges:"Comprar +5 cargas",buying:"Comprando...",buyOk:"Compra realizada. Actualiza sesi\xF3n.",buyFail:"No se pudo comprar"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Inicializar Guard-BOT",selectArea:"Seleccionar \xC1rea",save:"Guardar",captureArea:"Capturar \xC1rea",startProtection:"Iniciar",stopProtection:"Detener",protectedPixels:"P\xEDxeles Protegidos",upperLeft:"Esquina Superior Izquierda",lowerRight:"Esquina Inferior Derecha",detectedChanges:"Cambios Detectados",repairedPixels:"P\xEDxeles Reparados",charges:"Cargas",waitingInit:"Esperando inicializaci\xF3n...",checkingColors:"\u{1F3A8} Verificando colores disponibles...",noColorsFound:"\u274C No se encontraron colores. Abre la paleta de colores en el sitio.",colorsFound:"\u2705 {count} colores disponibles encontrados",initSuccess:"\u2705 Guard-BOT inicializado correctamente",initError:"\u274C Error inicializando Guard-BOT",invalidCoords:"\u274C Coordenadas inv\xE1lidas",invalidArea:"\u274C El \xE1rea debe tener esquina superior izquierda menor que inferior derecha",areaTooLarge:"\u274C \xC1rea demasiado grande: {size} p\xEDxeles (m\xE1ximo: {max})",capturingArea:"\u{1F4F8} Capturando \xE1rea...",areaCaptured:"\u2705 \xC1rea capturada: {count} p\xEDxeles",captureError:"\u274C Error capturando \xE1rea: {error}",captureFirst:"\u274C Primero captura un \xE1rea",noChanges:"\u2705 \xC1rea - sin cambios detectados",changesDetected:"\u{1F6A8} {count} cambios detectados en el \xE1rea",repairing:"\u{1F6E0}\uFE0F Reparando {count} p\xEDxeles alterados...",repairedSuccess:"\u2705 Reparados {count} p\xEDxeles correctamente",repairError:"\u274C Error reparando p\xEDxeles: {error}",noCharges:"\u26A0\uFE0F Sin cargas suficientes para reparar cambios",checkingChanges:"\u{1F50D} Verificando cambios en \xE1rea...",errorChecking:"\u274C Error verificando cambios: {error}",guardActive:"\u{1F6E1}\uFE0F Guardi\xE1n activo - \xE1rea monitoreada",lastCheck:"\xDAltima verificaci\xF3n: {time}",nextCheck:"Pr\xF3xima verificaci\xF3n en: {time}s",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Guard-BOT iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",manualInitRequired:"\u{1F527} Inicio manual requerido",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",protectionStopped:"\u23F9\uFE0F Protecci\xF3n detenida",selectUpperLeft:"\u{1F3AF} Pinta un p\xEDxel en la esquina SUPERIOR IZQUIERDA del \xE1rea a monitorear",selectLowerRight:"\u{1F3AF} Ahora pinta un p\xEDxel en la esquina INFERIOR DERECHA del \xE1rea",waitingUpperLeft:"\u{1F446} Esperando selecci\xF3n de esquina superior izquierda...",waitingLowerRight:"\u{1F446} Esperando selecci\xF3n de esquina inferior derecha...",upperLeftCaptured:"\u2705 Esquina superior izquierda capturada: ({x}, {y})",lowerRightCaptured:"\u2705 Esquina inferior derecha capturada: ({x}, {y})",selectionTimeout:"\u274C Tiempo agotado para selecci\xF3n",selectionError:"\u274C Error en selecci\xF3n, int\xE9ntalo de nuevo",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",analysisTitle:"An\xE1lisis de Diferencias - JSON vs Canvas Actual",correctPixels:"P\xEDxeles Correctos",incorrectPixels:"P\xEDxeles Incorrectos",missingPixels:"P\xEDxeles Faltantes",showCorrect:"Mostrar Correctos",showIncorrect:"Mostrar Incorrectos",showMissing:"Mostrar Faltantes",autoRefresh:"Auto-refresco",zoomAdjusted:"Zoom ajustado autom\xE1ticamente a",autoRefreshEnabled:"Auto-refresco activado cada",autoRefreshDisabled:"Auto-refresco desactivado",autoRefreshIntervalUpdated:"Intervalo de auto-refresco actualizado a",visualizationUpdated:"Visualizaci\xF3n actualizada",configTitle:"Configuraci\xF3n del Guard",protectionPatterns:"Patrones de Protecci\xF3n",preferSpecificColor:"Priorizar color espec\xEDfico",excludeSpecificColors:"No reparar colores espec\xEDficos",loadManagement:"Gesti\xF3n de Cargas",minLoadsToWait:"M\xEDnimo de cargas:",pixelsPerBatch:"P\xEDxeles por lote",spendAllPixelsOnStart:"Gastar todos los p\xEDxeles al iniciar",waitTimes:"Tiempos de Espera",useRandomTimes:"Usar tiempos aleatorios entre lotes",minTime:"Tiempo m\xEDnimo (s)",maxTime:"Tiempo m\xE1ximo (s)"}}});var gt,pt=j(()=>{gt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",userName:"User",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",showOverlay:"Show overlay",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout, retrying...",protectionEnabled:"Protection enabled",protectionDisabled:"Protection disabled",paintPattern:"Paint pattern",patternLinearStart:"Linear (Start)",patternLinearEnd:"Linear (End)",patternRandom:"Random",patternCenterOut:"Center outward",patternCornersFirst:"Corners first",patternSpiral:"Spiral",solid:"Solid",stripes:"Stripes",checkerboard:"Checkerboard",gradient:"Gradient",dots:"Dots",waves:"Waves",spiral:"Spiral",mosaic:"Mosaic",bricks:"Bricks",zigzag:"Zigzag",protectingDrawing:"Protecting drawing...",changesDetected:"\u{1F6A8} {count} changes detected in drawing",repairing:"\u{1F527} Repairing {count} altered pixels...",repairCompleted:"\u2705 Repair completed: {count} pixels",noChargesForRepair:"\u26A1 No charges for repair, waiting...",protectionPriority:"\u{1F6E1}\uFE0F Protection priority activated",patternApplied:"Pattern applied",customPattern:"Custom pattern",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialize Guard-BOT",selectArea:"Select Area",captureArea:"Capture Area",startProtection:"Start Protection",stopProtection:"Stop Protection",upperLeft:"Upper Left Corner",lowerRight:"Lower Right Corner",protectedPixels:"Protected Pixels",detectedChanges:"Detected Changes",repairedPixels:"Repaired Pixels",charges:"Charges",waitingInit:"Waiting for initialization...",checkingColors:"\u{1F3A8} Checking available colors...",noColorsFound:"\u274C No colors found. Open the color palette on the site.",colorsFound:"\u2705 Found {count} available colors",initSuccess:"\u2705 Guard-BOT initialized successfully",initError:"\u274C Error initializing Guard-BOT",invalidCoords:"\u274C Invalid coordinates",invalidArea:"\u274C Area must have upper left corner less than lower right corner",areaTooLarge:"\u274C Area too large: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capturing protection area...",areaCaptured:"\u2705 Area captured: {count} pixels under protection",captureError:"\u274C Error capturing area: {error}",captureFirst:"\u274C First capture a protection area",protectionStarted:"\u{1F6E1}\uFE0F Protection started - monitoring area",protectionStopped:"\u23F9\uFE0F Protection stopped",noChanges:"\u2705 Protected area - no changes detected",changesDetected:"\u{1F6A8} {count} changes detected in protected area",repairing:"\u{1F6E0}\uFE0F Repairing {count} altered pixels...",repairedSuccess:"\u2705 Successfully repaired {count} pixels",repairError:"\u274C Error repairing pixels: {error}",noCharges:"\u26A0\uFE0F Insufficient charges to repair changes",checkingChanges:"\u{1F50D} Checking changes in protected area...",errorChecking:"\u274C Error checking changes: {error}",guardActive:"\u{1F6E1}\uFE0F Guardian active - area under protection",lastCheck:"Last check: {time}",nextCheck:"Next check in: {time}s",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Guard-BOT auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",manualInitRequired:"\u{1F527} Manual initialization required",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",selectUpperLeft:"\u{1F3AF} Paint a pixel at the UPPER LEFT corner of the area to protect",selectLowerRight:"\u{1F3AF} Now paint a pixel at the LOWER RIGHT corner of the area",waitingUpperLeft:"\u{1F446} Waiting for upper left corner selection...",waitingLowerRight:"\u{1F446} Waiting for lower right corner selection...",upperLeftCaptured:"\u2705 Upper left corner captured: ({x}, {y})",lowerRightCaptured:"\u2705 Lower right corner captured: ({x}, {y})",selectionTimeout:"\u274C Selection timeout",selectionError:"\u274C Selection error, please try again",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close",analysisTitle:"Difference Analysis - JSON vs Current Canvas",correctPixels:"Correct Pixels",incorrectPixels:"Incorrect Pixels",missingPixels:"Missing Pixels",showCorrect:"Show Correct",showIncorrect:"Show Incorrect",showMissing:"Show Missing",autoRefresh:"Auto-refresh",zoomAdjusted:"Zoom automatically adjusted to",autoRefreshEnabled:"Auto-refresh enabled every",autoRefreshDisabled:"Auto-refresh disabled",autoRefreshIntervalUpdated:"Auto-refresh interval updated to",visualizationUpdated:"Visualization updated",configTitle:"Guard Configuration",protectionPatterns:"Protection Patterns",preferSpecificColor:"Prioritize specific color",excludeSpecificColors:"Don't repair specific colors",loadManagement:"Load Management",minLoadsToWait:"Minimum loads to wait",pixelsPerBatch:"Pixels per batch",spendAllPixelsOnStart:"Spend all pixels on start",waitTimes:"Wait Times",useRandomTimes:"Use random times between batches",minTime:"Minimum time (s)",maxTime:"Maximum time (s)"}}});var mt,ht=j(()=>{mt={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",userName:"Usager",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",showOverlay:"Afficher l'overlay",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 D\xE9lai d\u2019attente du serveur, nouvelle tentative...",protectionEnabled:"Protection activ\xE9e",protectionDisabled:"Protection d\xE9sactiv\xE9e",paintPattern:"Motif de peinture",patternLinearStart:"Lin\xE9aire (D\xE9but)",patternLinearEnd:"Lin\xE9aire (Fin)",patternRandom:"Al\xE9atoire",patternCenterOut:"Centre vers l\u2019ext\xE9rieur",patternCornersFirst:"Coins d\u2019abord",patternSpiral:"Spirale",solid:"Plein",stripes:"Rayures",checkerboard:"Damier",gradient:"D\xE9grad\xE9",dots:"Points",waves:"Vagues",spiral:"Spirale",mosaic:"Mosa\xEFque",bricks:"Briques",zigzag:"Zigzag",protectingDrawing:"Protection du dessin...",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans le dessin",repairing:"\u{1F527} R\xE9paration de {count} pixels modifi\xE9s...",repairCompleted:"\u2705 R\xE9paration termin\xE9e : {count} pixels",noChargesForRepair:"\u26A1 Pas de frais pour la r\xE9paration, en attente...",protectionPriority:"\u{1F6E1}\uFE0F Priorit\xE9 \xE0 la protection activ\xE9e",patternApplied:"Motif appliqu\xE9",customPattern:"Motif personnalis\xE9",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialiser Guard-BOT",selectArea:"S\xE9lectionner Zone",captureArea:"Capturer Zone",startProtection:"D\xE9marrer Protection",stopProtection:"Arr\xEAter Protection",upperLeft:"Coin Sup\xE9rieur Gauche",lowerRight:"Coin Inf\xE9rieur Droit",protectedPixels:"Pixels Prot\xE9g\xE9s",detectedChanges:"Changements D\xE9tect\xE9s",repairedPixels:"Pixels R\xE9par\xE9s",charges:"Charges",waitingInit:"En attente d'initialisation...",checkingColors:"\u{1F3A8} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Aucune couleur trouv\xE9e. Ouvrez la palette de couleurs sur le site.",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",initSuccess:"\u2705 Guard-BOT initialis\xE9 avec succ\xE8s",initError:"\u274C Erreur lors de l'initialisation de Guard-BOT",invalidCoords:"\u274C Coordonn\xE9es invalides",invalidArea:"\u274C La zone doit avoir le coin sup\xE9rieur gauche inf\xE9rieur au coin inf\xE9rieur droit",areaTooLarge:"\u274C Zone trop grande: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capture de la zone de protection...",areaCaptured:"\u2705 Zone captur\xE9e: {count} pixels sous protection",captureError:"\u274C Erreur lors de la capture de zone: {error}",captureFirst:"\u274C Capturez d'abord une zone de protection",protectionStarted:"\u{1F6E1}\uFE0F Protection d\xE9marr\xE9e - surveillance de la zone",protectionStopped:"\u23F9\uFE0F Protection arr\xEAt\xE9e",noChanges:"\u2705 Zone prot\xE9g\xE9e - aucun changement d\xE9tect\xE9",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans la zone prot\xE9g\xE9e",repairing:"\u{1F6E0}\uFE0F R\xE9paration de {count} pixels alt\xE9r\xE9s...",repairedSuccess:"\u2705 {count} pixels r\xE9par\xE9s avec succ\xE8s",repairError:"\u274C Erreur lors de la r\xE9paration des pixels: {error}",noCharges:"\u26A0\uFE0F Charges insuffisantes pour r\xE9parer les changements",checkingChanges:"\u{1F50D} V\xE9rification des changements dans la zone prot\xE9g\xE9e...",errorChecking:"\u274C Erreur lors de la v\xE9rification des changements: {error}",guardActive:"\u{1F6E1}\uFE0F Gardien actif - zone sous protection",lastCheck:"Derni\xE8re v\xE9rification: {time}",nextCheck:"Prochaine v\xE9rification dans: {time}s",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Guard-BOT d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",manualInitRequired:"\u{1F527} Initialisation manuelle requise",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",selectUpperLeft:"\u{1F3AF} Peignez un pixel au coin SUP\xC9RIEUR GAUCHE de la zone \xE0 prot\xE9ger",selectLowerRight:"\u{1F3AF} Maintenant peignez un pixel au coin INF\xC9RIEUR DROIT de la zone",waitingUpperLeft:"\u{1F446} En attente de la s\xE9lection du coin sup\xE9rieur gauche...",waitingLowerRight:"\u{1F446} En attente de la s\xE9lection du coin inf\xE9rieur droit...",upperLeftCaptured:"\u2705 Coin sup\xE9rieur gauche captur\xE9: ({x}, {y})",lowerRightCaptured:"\u2705 Coin inf\xE9rieur droit captur\xE9: ({x}, {y})",selectionTimeout:"\u274C D\xE9lai de s\xE9lection d\xE9pass\xE9",selectionError:"\u274C Erreur de s\xE9lection, veuillez r\xE9essayer",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer",analysisTitle:"Analyse des Diff\xE9rences - JSON vs Canvas Actuel",correctPixels:"Pixels Corrects",incorrectPixels:"Pixels Incorrects",missingPixels:"Pixels Manquants",showCorrect:"Afficher Corrects",showIncorrect:"Afficher Incorrects",showMissing:"Afficher Manquants",autoRefresh:"Actualisation automatique",zoomAdjusted:"Zoom ajust\xE9 automatiquement \xE0",autoRefreshEnabled:"Actualisation automatique activ\xE9e toutes les",autoRefreshDisabled:"Actualisation automatique d\xE9sactiv\xE9e",autoRefreshIntervalUpdated:"Intervalle d'actualisation automatique mis \xE0 jour \xE0",visualizationUpdated:"Visualisation mise \xE0 jour",configTitle:"Configuration du Guard",protectionPatterns:"Mod\xE8les de Protection",preferSpecificColor:"Prioriser une couleur sp\xE9cifique",excludeSpecificColors:"Ne pas r\xE9parer les couleurs sp\xE9cifiques",loadManagement:"Gestion des Charges",minLoadsToWait:"Minimum de charges \xE0 attendre",pixelsPerBatch:"Pixels par lot",spendAllPixelsOnStart:"D\xE9penser tous les pixels au d\xE9marrage",waitTimes:"Temps d'Attente",useRandomTimes:"Utiliser des temps al\xE9atoires entre les lots",minTime:"Temps minimum (s)",maxTime:"Temps maximum (s)"}}});var ft,wt=j(()=>{ft={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",autoImage:"\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",autoGuard:"\u{1F6E1}\uFE0F \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",selection:"\u0412\u044B\u0431\u0440\u0430\u043D\u043E",user:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",charges:"\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",backend:"\u0411\u044D\u043A\u0435\u043D\u0434",database:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",uptime:"\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",launch:"\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",executing:"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",downloading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",chooseBot:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",readyToLaunch:"\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",loadError:"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",loadErrorMsg:"\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",checking:"\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",online:"\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",offline:"\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",ok:"\u{1F7E2} \u041E\u041A",error:"\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",unknown:"-",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},image:{title:"WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",uploadImage:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",resizeImage:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",startPainting:"\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",stopPainting:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",saveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",loadProgress:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",checkingColors:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",loadingImage:"\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",imageLoaded:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",imageError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPositionAlert:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",positionDetected:"\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",positionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",startPaintingMsg:"\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",paintingProgress:"\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",noCharges:"\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",paintingStopped:"\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",paintingComplete:"\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",paintingError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",missingRequirements:"\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",progress:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",userName:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",pixels:"\u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",estimatedTime:"\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",initMessage:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",resizeSuccess:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",paintingPaused:"\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",batchSize:"\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",nextBatchTime:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437",useAllCharges:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",showOverlay:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435",maxCharges:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",waitingForCharges:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",timeRemaining:"\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",cooldownWaiting:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",progressSaved:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",progressLoaded:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",progressLoadError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",progressSaveError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",confirmSaveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",saveProgressTitle:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",discardProgress:"\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",minimize:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",width:"\u0428\u0438\u0440\u0438\u043D\u0430",height:"\u0412\u044B\u0441\u043E\u0442\u0430",keepAspect:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",apply:"\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",overlayOn:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u041A\u041B",overlayOff:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u042B\u041A\u041B",passCompleted:"\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",waitingChargesRegen:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",waitingChargesCountdown:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",retryAttempt:"\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryError:"\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryFailed:"\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",networkError:"\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",serverError:"\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",timeoutError:"\u23F0 \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",protectionEnabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430",protectionDisabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",paintPattern:"\u0428\u0430\u0431\u043B\u043E\u043D \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",patternLinearStart:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043D\u0430\u0447\u0430\u043B\u043E)",patternLinearEnd:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043A\u043E\u043D\u0435\u0446)",patternRandom:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",patternCenterOut:"\u0418\u0437 \u0446\u0435\u043D\u0442\u0440\u0430 \u043D\u0430\u0440\u0443\u0436\u0443",patternCornersFirst:"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0433\u043B\u044B",patternSpiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",solid:"\u0421\u043F\u043B\u043E\u0448\u043D\u043E\u0439",stripes:"\u041F\u043E\u043B\u043E\u0441\u044B",checkerboard:"\u0428\u0430\u0445\u043C\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u043A\u0430",gradient:"\u0413\u0440\u0430\u0434\u0438\u0435\u043D\u0442",dots:"\u0422\u043E\u0447\u043A\u0438",waves:"\u0412\u043E\u043B\u043D\u044B",spiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",mosaic:"\u041C\u043E\u0437\u0430\u0438\u043A\u0430",bricks:"\u041A\u0438\u0440\u043F\u0438\u0447\u0438",zigzag:"\u0417\u0438\u0433\u0437\u0430\u0433",protectingDrawing:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0438\u0441\u0443\u043D\u043A\u0430...",changesDetected:"\u{1F6A8} \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {count}",repairing:"\u{1F527} \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairCompleted:"\u2705 \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",noChargesForRepair:"\u26A1 \u041A\u043E\u043C\u0438\u0441\u0441\u0438\u0439 \u0437\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435\u0442, \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435...",protectionPriority:"\u{1F6E1}\uFE0F \u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u044B \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D",patternApplied:"\u0428\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D",customPattern:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0448\u0430\u0431\u043B\u043E\u043D",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},farm:{title:"WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",stopped:"\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",calibrate:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",paintOnce:"\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",checkingStatus:"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",configuration:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",delay:"\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",minCharges:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",colorMode:"\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",random:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",fixed:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",range:"\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",fixedColor:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",advanced:"\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",tileX:"\u041F\u043B\u0438\u0442\u043A\u0430 X",tileY:"\u041F\u043B\u0438\u0442\u043A\u0430 Y",customPalette:"\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",paletteExample:"\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",capture:"\u0417\u0430\u0445\u0432\u0430\u0442",painted:"\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",retries:"\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",tile:"\u041F\u043B\u0438\u0442\u043A\u0430",configSaved:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",configLoaded:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",configReset:"\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",captureInstructions:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",backendOnline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",backendOffline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u0444\u043B\u0430\u0439\u043D",startingBot:"\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",stoppingBot:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",calibrating:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",alreadyRunning:"\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",imageRunningWarning:"\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C",selectPositionAlert:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",missingPosition:"\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",farmRadius:"\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",positionInfo:"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",farmingInRadius:"\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",selectEmptyArea:"\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",noPosition:"\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",currentZone:"\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},common:{yes:"\u0414\u0430",no:"\u041D\u0435\u0442",ok:"\u041E\u041A",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",load:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",edit:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",pause:"\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",resume:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",reset:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",help:"\u041F\u043E\u043C\u043E\u0449\u044C",about:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",language:"\u042F\u0437\u044B\u043A",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",error:"\u041E\u0448\u0438\u0431\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",info:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",languageChanged:"\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"},guard:{title:"WPlace \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Guard-BOT",selectArea:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",captureArea:"\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",startProtection:"\u041D\u0430\u0447\u0430\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",stopProtection:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",upperLeft:"\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u041B\u0435\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",lowerRight:"\u041D\u0438\u0436\u043D\u0438\u0439 \u041F\u0440\u0430\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",protectedPixels:"\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",detectedChanges:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0435 \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",repairedPixels:"\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",checkingColors:"\u{1F3A8} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u0426\u0432\u0435\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435.",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",initSuccess:"\u2705 Guard-BOT \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D",initError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 Guard-BOT",invalidCoords:"\u274C \u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B",invalidArea:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430",areaTooLarge:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F: {size} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 (\u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C: {max})",capturingArea:"\u{1F4F8} \u0417\u0430\u0445\u0432\u0430\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0437\u0430\u0449\u0438\u0442\u044B...",areaCaptured:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D\u0430: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",captureError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438: {error}",captureFirst:"\u274C \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u044B",protectionStarted:"\u{1F6E1}\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430 - \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",protectionStopped:"\u23F9\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",noChanges:"\u2705 \u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C - \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E",changesDetected:"\u{1F6A8} {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",repairing:"\u{1F6E0}\uFE0F \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairedSuccess:"\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",repairError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439: {error}",noCharges:"\u26A0\uFE0F \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439",checkingChanges:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438...",errorChecking:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {error}",guardActive:"\u{1F6E1}\uFE0F \u0421\u0442\u0440\u0430\u0436 \u0430\u043A\u0442\u0438\u0432\u0435\u043D - \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",lastCheck:"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: {time}",nextCheck:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u0440\u0435\u0437: {time}\u0441",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 Guard-BOT \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",selectUpperLeft:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0412\u0415\u0420\u0425\u041D\u0415\u041C \u041B\u0415\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B",selectLowerRight:"\u{1F3AF} \u0422\u0435\u043F\u0435\u0440\u044C \u043D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041D\u0418\u0416\u041D\u0415\u041C \u041F\u0420\u0410\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",waitingUpperLeft:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u043B\u0435\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",waitingLowerRight:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",upperLeftCaptured:"\u2705 \u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",lowerRightCaptured:"\u2705 \u041D\u0438\u0436\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",selectionTimeout:"\u274C \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430",selectionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",analysisTitle:"\u0410\u043D\u0430\u043B\u0438\u0437 \u0420\u0430\u0437\u043B\u0438\u0447\u0438\u0439 - JSON vs \u0422\u0435\u043A\u0443\u0449\u0438\u0439 Canvas",correctPixels:"\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",incorrectPixels:"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",missingPixels:"\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",showCorrect:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435",showIncorrect:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435",showMissing:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435",autoRefresh:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",zoomAdjusted:"\u041C\u0430\u0441\u0448\u0442\u0430\u0431 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u043D\u0430",autoRefreshEnabled:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043A\u0430\u0436\u0434\u044B\u0435",autoRefreshDisabled:"\u0410\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E",autoRefreshIntervalUpdated:"\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0430\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D \u0434\u043E",visualizationUpdated:"\u0412\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430",configTitle:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F Guard",protectionPatterns:"\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u0417\u0430\u0449\u0438\u0442\u044B",preferSpecificColor:"\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0446\u0432\u0435\u0442\u0430",excludeSpecificColors:"\u041D\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u0446\u0432\u0435\u0442\u0430",loadManagement:"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u041D\u0430\u0433\u0440\u0443\u0437\u043A\u043E\u0439",minLoadsToWait:"\u041C\u0438\u043D\u0438\u043C\u0443\u043C \u0437\u0430\u0433\u0440\u0443\u0437\u043E\u043A \u0434\u043B\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0430\u0440\u0442\u0438\u044E",spendAllPixelsOnStart:"\u041F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u0438 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435",waitTimes:"\u0412\u0440\u0435\u043C\u044F \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u044F",useRandomTimes:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u043C\u0435\u0436\u0434\u0443 \u043F\u0430\u0440\u0442\u0438\u044F\u043C\u0438",minTime:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F (\u0441)",maxTime:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F (\u0441)"}}});var bt,xt=j(()=>{bt={launcher:{title:"WPlace \u81EA\u52A8\u673A\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52A8\u519C\u573A",autoImage:"\u{1F3A8} \u81EA\u52A8\u7ED8\u56FE",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52A8\u5B88\u62A4",selection:"\u9009\u62E9",user:"\u7528\u6237",charges:"\u6B21\u6570",backend:"\u540E\u7AEF",database:"\u6570\u636E\u5E93",uptime:"\u8FD0\u884C\u65F6\u95F4",close:"\u5173\u95ED",launch:"\u542F\u52A8",loading:"\u52A0\u8F7D\u4E2D\u2026",executing:"\u6267\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F7D\u811A\u672C\u2026",chooseBot:"\u9009\u62E9\u4E00\u4E2A\u673A\u5668\u4EBA\u5E76\u70B9\u51FB\u542F\u52A8",readyToLaunch:"\u51C6\u5907\u542F\u52A8",loadError:"\u52A0\u8F7D\u9519\u8BEF",loadErrorMsg:"\u65E0\u6CD5\u52A0\u8F7D\u6240\u9009\u673A\u5668\u4EBA\u3002\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6216\u91CD\u8BD5\u3002",checking:"\u{1F504} \u68C0\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7EBF",offline:"\u{1F534} \u79BB\u7EBF",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u9519\u8BEF",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},image:{title:"WPlace \u81EA\u52A8\u7ED8\u56FE",initBot:"\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA",uploadImage:"\u4E0A\u4F20\u56FE\u7247",resizeImage:"\u8C03\u6574\u56FE\u7247\u5927\u5C0F",selectPosition:"\u9009\u62E9\u4F4D\u7F6E",startPainting:"\u5F00\u59CB\u7ED8\u5236",stopPainting:"\u505C\u6B62\u7ED8\u5236",saveProgress:"\u4FDD\u5B58\u8FDB\u5EA6",loadProgress:"\u52A0\u8F7D\u8FDB\u5EA6",checkingColors:"\u{1F50D} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u540E\u91CD\u8BD5\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F7D\u56FE\u7247...",imageLoaded:"\u2705 \u56FE\u7247\u5DF2\u52A0\u8F7D\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u4E2A",imageError:"\u274C \u56FE\u7247\u52A0\u8F7D\u5931\u8D25",selectPositionAlert:"\u8BF7\u5728\u4F60\u60F3\u5F00\u59CB\u7ED8\u5236\u7684\u5730\u65B9\u6D82\u7B2C\u4E00\u4E2A\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8BBE\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9009\u62E9\u8D85\u65F6",positionDetected:"\u{1F3AF} \u5DF2\u68C0\u6D4B\u5230\u4F4D\u7F6E\uFF0C\u5904\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u68C0\u6D4B\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",startPaintingMsg:"\u{1F3A8} \u5F00\u59CB\u7ED8\u5236...",paintingProgress:"\u{1F9F1} \u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6CA1\u6709\u6B21\u6570\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7ED8\u5236",paintingComplete:"\u2705 \u7ED8\u5236\u5B8C\u6210\uFF01\u5171\u7ED8\u5236 {count} \u4E2A\u50CF\u7D20\u3002",paintingError:"\u274C \u7ED8\u5236\u8FC7\u7A0B\u4E2D\u51FA\u9519",missingRequirements:"\u274C \u8BF7\u5148\u52A0\u8F7D\u56FE\u7247\u5E76\u9009\u62E9\u4F4D\u7F6E",progress:"\u8FDB\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6570",estimatedTime:"\u9884\u8BA1\u65F6\u95F4",initMessage:"\u70B9\u51FB\u201C\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA\u201D\u5F00\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u56FE\u7247\u5DF2\u8C03\u6574\u4E3A {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7ED8\u5236\u6682\u505C\u4E8E\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u65F6\u95F4",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6570",showOverlay:"\u663E\u793A\u8986\u76D6\u5C42",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6570",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed}",timeRemaining:"\u5269\u4F59\u65F6\u95F4",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u540E\u7EE7\u7EED...",progressSaved:"\u2705 \u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u4E3A {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F7D\u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7ED8\u5236",progressLoadError:"\u274C \u52A0\u8F7D\u8FDB\u5EA6\u5931\u8D25: {error}",progressSaveError:"\u274C \u4FDD\u5B58\u8FDB\u5EA6\u5931\u8D25: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u5F53\u524D\u8FDB\u5EA6\u5417\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u8FDB\u5EA6",discardProgress:"\u653E\u5F03",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BBD\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7EB5\u6A2A\u6BD4",apply:"\u5E94\u7528",overlayOn:"\u8986\u76D6\u5C42: \u5F00\u542F",overlayOff:"\u8986\u76D6\u5C42: \u5173\u95ED",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7ED8\u5236 {painted} \u50CF\u7D20 | \u8FDB\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6570\u6062\u590D: {current}/{needed} - \u65F6\u95F4: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed} - \u5269\u4F59: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8BD5 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5C1D\u8BD5\u51FA\u9519\uFF0C\u5C06\u5728 {delay} \u79D2\u540E\u91CD\u8BD5...",retryFailed:"\u274C \u8D85\u8FC7 {maxAttempts} \u6B21\u5C1D\u8BD5\u5931\u8D25\u3002\u7EE7\u7EED\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7F51\u7EDC\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",serverError:"\u{1F525} \u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",timeoutError:"\u23F0 \u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u6B63\u5728\u91CD\u8BD5...",protectionEnabled:"\u5DF2\u5F00\u542F\u4FDD\u62A4",protectionDisabled:"\u5DF2\u5173\u95ED\u4FDD\u62A4",paintPattern:"\u7ED8\u5236\u6A21\u5F0F",patternLinearStart:"\u7EBF\u6027\uFF08\u8D77\u70B9\uFF09",patternLinearEnd:"\u7EBF\u6027\uFF08\u7EC8\u70B9\uFF09",patternRandom:"\u968F\u673A",patternCenterOut:"\u4ECE\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5B9E\u5FC3",stripes:"\u6761\u7EB9",checkerboard:"\u68CB\u76D8\u683C",gradient:"\u6E10\u53D8",dots:"\u70B9\u72B6",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u9A6C\u8D5B\u514B",bricks:"\u7816\u5757",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u62A4\u56FE\u7A3F...",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u5904\u66F4\u6539",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u66F4\u6539\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u590D\u5B8C\u6210\uFF1A{count} \u4E2A\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u590D\u4E0D\u6D88\u8017\u70B9\u6570\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u542F\u7528\u4FDD\u62A4\u4F18\u5148",patternApplied:"\u5DF2\u5E94\u7528\u6A21\u5F0F",customPattern:"\u81EA\u5B9A\u4E49\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},farm:{title:"WPlace \u519C\u573A\u673A\u5668\u4EBA",start:"\u5F00\u59CB",stop:"\u505C\u6B62",stopped:"\u673A\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u51C6",paintOnce:"\u4E00\u6B21",checkingStatus:"\u68C0\u67E5\u72B6\u6001\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u8FDF (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6570",colorMode:"\u989C\u8272\u6A21\u5F0F",random:"\u968F\u673A",fixed:"\u56FA\u5B9A",range:"\u8303\u56F4",fixedColor:"\u56FA\u5B9A\u989C\u8272",advanced:"\u9AD8\u7EA7",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u4E49\u8C03\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u83B7",painted:"\u5DF2\u7ED8\u5236",charges:"\u6B21\u6570",retries:"\u91CD\u8BD5",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F7D",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8BF7\u624B\u52A8\u7ED8\u5236\u4E00\u4E2A\u50CF\u7D20\u4EE5\u6355\u83B7\u5750\u6807...",backendOnline:"\u540E\u7AEF\u5728\u7EBF",backendOffline:"\u540E\u7AEF\u79BB\u7EBF",startingBot:"\u6B63\u5728\u542F\u52A8\u673A\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u673A\u5668\u4EBA...",calibrating:"\u6821\u51C6\u4E2D...",alreadyRunning:"\u81EA\u52A8\u519C\u573A\u5DF2\u5728\u8FD0\u884C\u3002",imageRunningWarning:"\u81EA\u52A8\u7ED8\u56FE\u6B63\u5728\u8FD0\u884C\uFF0C\u8BF7\u5148\u5173\u95ED\u518D\u542F\u52A8\u81EA\u52A8\u519C\u573A\u3002",selectPosition:"\u9009\u62E9\u533A\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u56FE\u7684\u7A7A\u767D\u533A\u57DF\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u533A\u57DF\u8BBE\u7F6E\u6210\u529F\uFF01\u534A\u5F84: 500px",positionTimeout:"\u274C \u533A\u57DF\u9009\u62E9\u8D85\u65F6",missingPosition:"\u274C \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF08\u4F7F\u7528\u201C\u9009\u62E9\u533A\u57DF\u201D\u6309\u94AE\uFF09",farmRadius:"\u519C\u573A\u534A\u5F84",positionInfo:"\u5F53\u524D\u533A\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F84 {radius}px \u5728 ({x},{y}) \u519C\u573A",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8BF7\u9009\u62E9\u7A7A\u767D\u533A\u57DF\u4EE5\u907F\u514D\u51B2\u7A81",noPosition:"\u672A\u9009\u62E9\u533A\u57DF",currentZone:"\u533A\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF0C\u5728\u5730\u56FE\u4E0A\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},common:{yes:"\u662F",no:"\u5426",ok:"\u786E\u8BA4",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",save:"\u4FDD\u5B58",load:"\u52A0\u8F7D",delete:"\u5220\u9664",edit:"\u7F16\u8F91",start:"\u5F00\u59CB",stop:"\u505C\u6B62",pause:"\u6682\u505C",resume:"\u7EE7\u7EED",reset:"\u91CD\u7F6E",settings:"\u8BBE\u7F6E",help:"\u5E2E\u52A9",about:"\u5173\u4E8E",language:"\u8BED\u8A00",loading:"\u52A0\u8F7D\u4E2D...",error:"\u9519\u8BEF",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8BED\u8A00\u5DF2\u5207\u6362\u4E3A {language}"},guard:{title:"WPlace \u81EA\u52A8\u5B88\u62A4",initBot:"\u521D\u59CB\u5316\u5B88\u62A4\u673A\u5668\u4EBA",selectArea:"\u9009\u62E9\u533A\u57DF",captureArea:"\u6355\u83B7\u533A\u57DF",startProtection:"\u5F00\u59CB\u5B88\u62A4",stopProtection:"\u505C\u6B62\u5B88\u62A4",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u62A4\u50CF\u7D20",detectedChanges:"\u68C0\u6D4B\u5230\u7684\u53D8\u5316",repairedPixels:"\u4FEE\u590D\u7684\u50CF\u7D20",charges:"\u6B21\u6570",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u989C\u8272\uFF0C\u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",initSuccess:"\u2705 \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u5931\u8D25",invalidCoords:"\u274C \u5750\u6807\u65E0\u6548",invalidArea:"\u274C \u533A\u57DF\u65E0\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u987B\u5C0F\u4E8E\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u533A\u57DF\u8FC7\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u83B7\u5B88\u62A4\u533A\u57DF\u4E2D...",areaCaptured:"\u2705 \u533A\u57DF\u6355\u83B7\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u62A4",captureError:"\u274C \u6355\u83B7\u533A\u57DF\u51FA\u9519: {error}",captureFirst:"\u274C \u8BF7\u5148\u6355\u83B7\u4E00\u4E2A\u5B88\u62A4\u533A\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u62A4\u5DF2\u542F\u52A8 - \u533A\u57DF\u76D1\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u62A4\u5DF2\u505C\u6B62",noChanges:"\u2705 \u533A\u57DF\u5B89\u5168 - \u672A\u68C0\u6D4B\u5230\u53D8\u5316",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u4E2A\u53D8\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u590D {count} \u4E2A\u50CF\u7D20",repairError:"\u274C \u4FEE\u590D\u51FA\u9519: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4FEE\u590D",checkingChanges:"\u{1F50D} \u6B63\u5728\u68C0\u67E5\u533A\u57DF\u53D8\u5316...",errorChecking:"\u274C \u68C0\u67E5\u51FA\u9519: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u62A4\u4E2D - \u533A\u57DF\u53D7\u4FDD\u62A4",lastCheck:"\u4E0A\u6B21\u68C0\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u68C0\u67E5: {time} \u79D2\u540E",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u62A4\u533A\u57DF\u7684\u5DE6\u4E0A\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73B0\u5728\u5728\u53F3\u4E0B\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u83B7\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u83B7\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9009\u62E9\u8D85\u65F6",selectionError:"\u274C \u9009\u62E9\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED",analysisTitle:"\u5DEE\u5F02\u5206\u6790 - JSON vs \u5F53\u524D\u753B\u5E03",correctPixels:"\u6B63\u786E\u50CF\u7D20",incorrectPixels:"\u9519\u8BEF\u50CF\u7D20",missingPixels:"\u7F3A\u5931\u50CF\u7D20",showCorrect:"\u663E\u793A\u6B63\u786E",showIncorrect:"\u663E\u793A\u9519\u8BEF",showMissing:"\u663E\u793A\u7F3A\u5931",autoRefresh:"\u81EA\u52A8\u5237\u65B0",zoomAdjusted:"\u7F29\u653E\u81EA\u52A8\u8C03\u6574\u4E3A",autoRefreshEnabled:"\u81EA\u52A8\u5237\u65B0\u5DF2\u542F\u7528\uFF0C\u95F4\u9694",autoRefreshDisabled:"\u81EA\u52A8\u5237\u65B0\u5DF2\u7981\u7528",autoRefreshIntervalUpdated:"\u81EA\u52A8\u5237\u65B0\u95F4\u9694\u5DF2\u66F4\u65B0\u4E3A",visualizationUpdated:"\u53EF\u89C6\u5316\u5DF2\u66F4\u65B0",configTitle:"Guard\u914D\u7F6E",protectionPatterns:"\u4FDD\u62A4\u6A21\u5F0F",preferSpecificColor:"\u4F18\u5148\u7279\u5B9A\u989C\u8272",excludeSpecificColors:"\u4E0D\u4FEE\u590D\u7279\u5B9A\u989C\u8272",loadManagement:"\u8D1F\u8F7D\u7BA1\u7406",minLoadsToWait:"\u7B49\u5F85\u7684\u6700\u5C0F\u8D1F\u8F7D\u6570",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",spendAllPixelsOnStart:"\u542F\u52A8\u65F6\u6D88\u8017\u6240\u6709\u50CF\u7D20",waitTimes:"\u7B49\u5F85\u65F6\u95F4",useRandomTimes:"\u6279\u6B21\u95F4\u4F7F\u7528\u968F\u673A\u65F6\u95F4",minTime:"\u6700\u5C0F\u65F6\u95F4 (\u79D2)",maxTime:"\u6700\u5927\u65F6\u95F4 (\u79D2)"}}});var yt,Pt=j(()=>{yt={launcher:{title:"WPlace \u81EA\u52D5\u6A5F\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52D5\u8FB2\u5834",autoImage:"\u{1F3A8} \u81EA\u52D5\u7E6A\u5716",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52D5\u5B88\u8B77",selection:"\u9078\u64C7",user:"\u7528\u6237",charges:"\u6B21\u6578",backend:"\u5F8C\u7AEF",database:"\u6578\u64DA\u5EAB",uptime:"\u904B\u884C\u6642\u9593",close:"\u95DC\u9589",launch:"\u5553\u52D5",loading:"\u52A0\u8F09\u4E2D\u2026",executing:"\u57F7\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F09\u8173\u672C\u2026",chooseBot:"\u9078\u64C7\u4E00\u500B\u6A5F\u5668\u4EBA\u4E26\u9EDE\u64CA\u5553\u52D5",readyToLaunch:"\u6E96\u5099\u5553\u52D5",loadError:"\u52A0\u8F09\u932F\u8AA4",loadErrorMsg:"\u7121\u6CD5\u52A0\u8F09\u6240\u9078\u6A5F\u5668\u4EBA\u3002\u8ACB\u6AA2\u67E5\u7DB2\u7D61\u9023\u63A5\u6216\u91CD\u8A66\u3002",checking:"\u{1F504} \u6AA2\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7DDA",offline:"\u{1F534} \u96E2\u7DDA",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u932F\u8AA4",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},image:{title:"WPlace \u81EA\u52D5\u7E6A\u5716",initBot:"\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA",uploadImage:"\u4E0A\u50B3\u5716\u7247",resizeImage:"\u8ABF\u6574\u5716\u7247\u5927\u5C0F",selectPosition:"\u9078\u64C7\u4F4D\u7F6E",startPainting:"\u958B\u59CB\u7E6A\u88FD",stopPainting:"\u505C\u6B62\u7E6A\u88FD",saveProgress:"\u4FDD\u5B58\u9032\u5EA6",loadProgress:"\u52A0\u8F09\u9032\u5EA6",checkingColors:"\u{1F50D} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u5F8C\u91CD\u8A66\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F09\u5716\u7247...",imageLoaded:"\u2705 \u5716\u7247\u5DF2\u52A0\u8F09\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u500B",imageError:"\u274C \u5716\u7247\u52A0\u8F09\u5931\u6557",selectPositionAlert:"\u8ACB\u5728\u4F60\u60F3\u958B\u59CB\u7E6A\u88FD\u7684\u5730\u65B9\u5857\u7B2C\u4E00\u500B\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8A2D\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9078\u64C7\u8D85\u6642",positionDetected:"\u{1F3AF} \u5DF2\u6AA2\u6E2C\u5230\u4F4D\u7F6E\uFF0C\u8655\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u6AA2\u6E2C\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66",startPaintingMsg:"\u{1F3A8} \u958B\u59CB\u7E6A\u88FD...",paintingProgress:"\u{1F9F1} \u9032\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6C92\u6709\u6B21\u6578\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7E6A\u88FD",paintingComplete:"\u2705 \u7E6A\u88FD\u5B8C\u6210\uFF01\u5171\u7E6A\u88FD {count} \u500B\u50CF\u7D20\u3002",paintingError:"\u274C \u7E6A\u88FD\u904E\u7A0B\u4E2D\u51FA\u932F",missingRequirements:"\u274C \u8ACB\u5148\u52A0\u8F09\u5716\u7247\u4E26\u9078\u64C7\u4F4D\u7F6E",progress:"\u9032\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6578",estimatedTime:"\u9810\u8A08\u6642\u9593",initMessage:"\u9EDE\u64CA\u201C\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA\u201D\u958B\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u5716\u7247\u5DF2\u8ABF\u6574\u70BA {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7E6A\u88FD\u66AB\u505C\u65BC\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u6642\u9593",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6578",showOverlay:"\u986F\u793A\u8986\u84CB\u5C64",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6578",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed}",timeRemaining:"\u5269\u9918\u6642\u9593",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u5F8C\u7E7C\u7E8C...",progressSaved:"\u2705 \u9032\u5EA6\u5DF2\u4FDD\u5B58\u70BA {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F09\u9032\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7E6A\u88FD",progressLoadError:"\u274C \u52A0\u8F09\u9032\u5EA6\u5931\u6557: {error}",progressSaveError:"\u274C \u4FDD\u5B58\u9032\u5EA6\u5931\u6557: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u7576\u524D\u9032\u5EA6\u55CE\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u9032\u5EA6",discardProgress:"\u653E\u68C4",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BEC\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7E31\u6A6B\u6BD4",apply:"\u61C9\u7528",overlayOn:"\u8986\u84CB\u5C64: \u958B\u5553",overlayOff:"\u8986\u84CB\u5C64: \u95DC\u9589",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7E6A\u88FD {painted} \u50CF\u7D20 | \u9032\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6578\u6062\u5FA9: {current}/{needed} - \u6642\u9593: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed} - \u5269\u9918: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8A66 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5617\u8A66\u51FA\u932F\uFF0C\u5C07\u5728 {delay} \u79D2\u5F8C\u91CD\u8A66...",retryFailed:"\u274C \u8D85\u904E {maxAttempts} \u6B21\u5617\u8A66\u5931\u6557\u3002\u7E7C\u7E8C\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7DB2\u7D61\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",serverError:"\u{1F525} \u670D\u52D9\u5668\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",timeoutError:"\u23F0 \u4F3A\u670D\u5668\u903E\u6642\uFF0C\u6B63\u5728\u91CD\u8A66...",protectionEnabled:"\u5DF2\u555F\u7528\u4FDD\u8B77",protectionDisabled:"\u5DF2\u505C\u7528\u4FDD\u8B77",paintPattern:"\u7E6A\u88FD\u6A21\u5F0F",patternLinearStart:"\u7DDA\u6027\uFF08\u8D77\u9EDE\uFF09",patternLinearEnd:"\u7DDA\u6027\uFF08\u7D42\u9EDE\uFF09",patternRandom:"\u96A8\u6A5F",patternCenterOut:"\u7531\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5BE6\u5FC3",stripes:"\u689D\u7D0B",checkerboard:"\u68CB\u76E4\u683C",gradient:"\u6F38\u5C64",dots:"\u9EDE\u72C0",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u99AC\u8CFD\u514B",bricks:"\u78DA\u584A",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u8B77\u7E6A\u5716...",changesDetected:"\u{1F6A8} \u5075\u6E2C\u5230 {count} \u8655\u8B8A\u66F4",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u8B8A\u66F4\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u5FA9\u5B8C\u6210\uFF1A{count} \u500B\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u5FA9\u4E0D\u6D88\u8017\u9EDE\u6578\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u555F\u7528\u4FDD\u8B77\u512A\u5148",patternApplied:"\u5DF2\u5957\u7528\u6A21\u5F0F",customPattern:"\u81EA\u8A02\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},farm:{title:"WPlace \u8FB2\u5834\u6A5F\u5668\u4EBA",start:"\u958B\u59CB",stop:"\u505C\u6B62",stopped:"\u6A5F\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u6E96",paintOnce:"\u4E00\u6B21",checkingStatus:"\u6AA2\u67E5\u72C0\u614B\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u9072 (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6578",colorMode:"\u984F\u8272\u6A21\u5F0F",random:"\u96A8\u6A5F",fixed:"\u56FA\u5B9A",range:"\u7BC4\u570D",fixedColor:"\u56FA\u5B9A\u984F\u8272",advanced:"\u9AD8\u7D1A",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u7FA9\u8ABF\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u7372",painted:"\u5DF2\u7E6A\u88FD",charges:"\u6B21\u6578",retries:"\u91CD\u8A66",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F09",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8ACB\u624B\u52D5\u7E6A\u88FD\u4E00\u500B\u50CF\u7D20\u4EE5\u6355\u7372\u5EA7\u6A19...",backendOnline:"\u5F8C\u7AEF\u5728\u7DDA",backendOffline:"\u5F8C\u7AEF\u96E2\u7DDA",startingBot:"\u6B63\u5728\u5553\u52D5\u6A5F\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u6A5F\u5668\u4EBA...",calibrating:"\u6821\u6E96\u4E2D...",alreadyRunning:"\u81EA\u52D5\u8FB2\u5834\u5DF2\u5728\u904B\u884C\u3002",imageRunningWarning:"\u81EA\u52D5\u7E6A\u5716\u6B63\u5728\u904B\u884C\uFF0C\u8ACB\u5148\u95DC\u9589\u518D\u5553\u52D5\u81EA\u52D5\u8FB2\u5834\u3002",selectPosition:"\u9078\u64C7\u5340\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u5716\u7684\u7A7A\u767D\u5340\u57DF\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u5340\u57DF\u8A2D\u7F6E\u6210\u529F\uFF01\u534A\u5F91: 500px",positionTimeout:"\u274C \u5340\u57DF\u9078\u64C7\u8D85\u6642",missingPosition:"\u274C \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF08\u4F7F\u7528\u201C\u9078\u64C7\u5340\u57DF\u201D\u6309\u9215\uFF09",farmRadius:"\u8FB2\u5834\u534A\u5F91",positionInfo:"\u7576\u524D\u5340\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F91 {radius}px \u5728 ({x},{y}) \u8FB2\u5834",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8ACB\u9078\u64C7\u7A7A\u767D\u5340\u57DF\u4EE5\u907F\u514D\u885D\u7A81",noPosition:"\u672A\u9078\u64C7\u5340\u57DF",currentZone:"\u5340\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF0C\u5728\u5730\u5716\u4E0A\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},common:{yes:"\u662F",no:"\u5426",ok:"\u78BA\u8A8D",cancel:"\u53D6\u6D88",close:"\u95DC\u9589",save:"\u4FDD\u5B58",load:"\u52A0\u8F09",delete:"\u522A\u9664",edit:"\u7DE8\u8F2F",start:"\u958B\u59CB",stop:"\u505C\u6B62",pause:"\u66AB\u505C",resume:"\u7E7C\u7E8C",reset:"\u91CD\u7F6E",settings:"\u8A2D\u7F6E",help:"\u5E6B\u52A9",about:"\u95DC\u65BC",language:"\u8A9E\u8A00",loading:"\u52A0\u8F09\u4E2D...",error:"\u932F\u8AA4",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8A9E\u8A00\u5DF2\u5207\u63DB\u70BA {language}"},guard:{title:"WPlace \u81EA\u52D5\u5B88\u8B77",initBot:"\u521D\u59CB\u5316\u5B88\u8B77\u6A5F\u5668\u4EBA",selectArea:"\u9078\u64C7\u5340\u57DF",captureArea:"\u6355\u7372\u5340\u57DF",startProtection:"\u958B\u59CB\u5B88\u8B77",stopProtection:"\u505C\u6B62\u5B88\u8B77",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u8B77\u50CF\u7D20",detectedChanges:"\u6AA2\u6E2C\u5230\u7684\u8B8A\u5316",repairedPixels:"\u4FEE\u5FA9\u7684\u50CF\u7D20",charges:"\u6B21\u6578",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u984F\u8272\uFF0C\u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",initSuccess:"\u2705 \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u5931\u6557",invalidCoords:"\u274C \u5EA7\u6A19\u7121\u6548",invalidArea:"\u274C \u5340\u57DF\u7121\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u9808\u5C0F\u65BC\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u5340\u57DF\u904E\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u7372\u5B88\u8B77\u5340\u57DF\u4E2D...",areaCaptured:"\u2705 \u5340\u57DF\u6355\u7372\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u8B77",captureError:"\u274C \u6355\u7372\u5340\u57DF\u51FA\u932F: {error}",captureFirst:"\u274C \u8ACB\u5148\u6355\u7372\u4E00\u500B\u5B88\u8B77\u5340\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u8B77\u5DF2\u5553\u52D5 - \u5340\u57DF\u76E3\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u8B77\u5DF2\u505C\u6B62",noChanges:"\u2705 \u5340\u57DF\u5B89\u5168 - \u672A\u6AA2\u6E2C\u5230\u8B8A\u5316",changesDetected:"\u{1F6A8} \u6AA2\u6E2C\u5230 {count} \u500B\u8B8A\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20",repairError:"\u274C \u4FEE\u5FA9\u51FA\u932F: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6578\u4E0D\u8DB3\uFF0C\u7121\u6CD5\u4FEE\u5FA9",checkingChanges:"\u{1F50D} \u6B63\u5728\u6AA2\u67E5\u5340\u57DF\u8B8A\u5316...",errorChecking:"\u274C \u6AA2\u67E5\u51FA\u932F: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u8B77\u4E2D - \u5340\u57DF\u53D7\u4FDD\u8B77",lastCheck:"\u4E0A\u6B21\u6AA2\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u6AA2\u67E5: {time} \u79D2\u5F8C",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u8B77\u5340\u57DF\u7684\u5DE6\u4E0A\u89D2\u5857\u4E00\u500B\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73FE\u5728\u5728\u53F3\u4E0B\u89D2\u5857\u4E00\u500B\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u7372\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u7372\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9078\u64C7\u8D85\u6642",selectionError:"\u274C \u9078\u64C7\u51FA\u932F\uFF0C\u8ACB\u91CD\u8A66",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589",analysisTitle:"\u5DEE\u7570\u5206\u6790 - JSON vs \u7576\u524D\u756B\u5E03",correctPixels:"\u6B63\u78BA\u50CF\u7D20",incorrectPixels:"\u932F\u8AA4\u50CF\u7D20",missingPixels:"\u7F3A\u5931\u50CF\u7D20",showCorrect:"\u986F\u793A\u6B63\u78BA",showIncorrect:"\u986F\u793A\u932F\u8AA4",showMissing:"\u986F\u793A\u7F3A\u5931",autoRefresh:"\u81EA\u52D5\u5237\u65B0",zoomAdjusted:"\u7E2E\u653E\u81EA\u52D5\u8ABF\u6574\u70BA",autoRefreshEnabled:"\u81EA\u52D5\u5237\u65B0\u5DF2\u555F\u7528\uFF0C\u9593\u9694",autoRefreshDisabled:"\u81EA\u52D5\u5237\u65B0\u5DF2\u7981\u7528",autoRefreshIntervalUpdated:"\u81EA\u52D5\u5237\u65B0\u9593\u9694\u5DF2\u66F4\u65B0\u70BA",visualizationUpdated:"\u8996\u89BA\u5316\u5DF2\u66F4\u65B0",configTitle:"Guard\u914D\u7F6E",protectionPatterns:"\u4FDD\u8B77\u6A21\u5F0F",preferSpecificColor:"\u512A\u5148\u7279\u5B9A\u984F\u8272",excludeSpecificColors:"\u4E0D\u4FEE\u5FA9\u7279\u5B9A\u984F\u8272",loadManagement:"\u8CA0\u8F09\u7BA1\u7406",minLoadsToWait:"\u7B49\u5F85\u7684\u6700\u5C0F\u8CA0\u8F09\u6578",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",spendAllPixelsOnStart:"\u555F\u52D5\u6642\u6D88\u8017\u6240\u6709\u50CF\u7D20",waitTimes:"\u7B49\u5F85\u6642\u9593",useRandomTimes:"\u6279\u6B21\u9593\u4F7F\u7528\u96A8\u6A5F\u6642\u9593",minTime:"\u6700\u5C0F\u6642\u9593 (\u79D2)",maxTime:"\u6700\u5927\u6642\u9593 (\u79D2)"}}});function io(){let e=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return le[e]?e:"es"}function no(){return null}function Ue(){let t=no(),e=io(),i="es";return t&&le[t]?i=t:e&&le[e]&&(i=e),ao(i),i}function ao(t){if(!le[t]){console.warn(`Idioma '${t}' no disponible. Usando '${Se}'`);return}Se=t,pe=le[t],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:t,translations:pe}}))}function vt(){return Se}function T(t,e={}){let i=t.split("."),l=pe;for(let a of i)if(l&&typeof l=="object"&&a in l)l=l[a];else return console.warn(`Clave de traducci\xF3n no encontrada: '${t}'`),t;return typeof l!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${t}'`),t):ro(l,e)}function ro(t,e){return!e||Object.keys(e).length===0?t:t.replace(/\{(\w+)\}/g,(i,l)=>e[l]!==void 0?e[l]:i)}function Le(t){return pe[t]?pe[t]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${t}'`),{})}var le,Se,pe,Ae=j(()=>{ut();pt();ht();wt();xt();Pt();le={es:dt,en:gt,fr:mt,ru:ft,zhHans:bt,zhHant:yt},Se="es",pe=le[Se];Ue()});var Ct={};ct(Ct,{IMAGE_DEFAULTS:()=>Q,TEXTS:()=>lo,getImageText:()=>so,getImageTexts:()=>Ye,imageState:()=>o});function Ye(){return Le("image")}function so(t,e={}){let l=Ye()[t]||t;return e&&Object.keys(e).length>0&&(l=l.replace(/\{(\w+)\}/g,(a,r)=>e[r]!==void 0?e[r]:a)),l}var Q,lo,o,me=j(()=>{Ae();Q={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};lo={get es(){return console.warn("TEXTS.es est\xE1 deprecated. Usa getImageTexts() en su lugar."),Ye()}},o={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:Q.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:Q.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:9999,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0,paintPattern:"linear_start"}});var Ze={};ct(Ze,{PAINT_PATTERNS:()=>U,applyPaintPattern:()=>Je,getPatternName:()=>Ve,sortPixelsByPattern:()=>At});function Ve(t){return{[U.LINEAR_START]:"Lineal (Inicio)",[U.LINEAR_END]:"Lineal (Final)",[U.RANDOM]:"Aleatorio",[U.CENTER_OUT]:"Centro hacia afuera",[U.CORNERS_FIRST]:"Esquinas primero",[U.SPIRAL]:"Espiral"}[t]||t}function At(t,e,i,l){if(!t||t.length===0)return t;s(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${Ve(e)} (${t.length} p\xEDxeles)`);let a=[...t];switch(e){case U.LINEAR_START:return Lt(a);case U.LINEAR_END:return Po(a);case U.RANDOM:return vo(a);case U.CENTER_OUT:return Co(a,i,l);case U.CORNERS_FIRST:return Eo(a,i,l);case U.SPIRAL:return So(a,i,l);default:return s(`\u26A0\uFE0F Patr\xF3n desconocido: ${e}, usando linear_start`),Lt(a)}}function Lt(t){return t.sort((e,i)=>{let l=e.imageY!==void 0?e.imageY:e.y,a=i.imageY!==void 0?i.imageY:i.y,r=e.imageX!==void 0?e.imageX:e.x,d=i.imageX!==void 0?i.imageX:i.x;return l!==a?l-a:r-d})}function Po(t){return t.sort((e,i)=>{let l=e.imageY!==void 0?e.imageY:e.y,a=i.imageY!==void 0?i.imageY:i.y,r=e.imageX!==void 0?e.imageX:e.x,d=i.imageX!==void 0?i.imageX:i.x;return l!==a?a-l:d-r})}function vo(t){for(let e=t.length-1;e>0;e--){let i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}function Co(t,e,i){let l=e/2,a=i/2;return t.sort((r,d)=>{let c=r.imageX!==void 0?r.imageX:r.x,n=r.imageY!==void 0?r.imageY:r.y,u=d.imageX!==void 0?d.imageX:d.x,g=d.imageY!==void 0?d.imageY:d.y,p=Math.sqrt(Math.pow(c-l,2)+Math.pow(n-a,2)),h=Math.sqrt(Math.pow(u-l,2)+Math.pow(g-a,2));return p-h})}function Eo(t,e,i){let l=[{x:0,y:0},{x:e-1,y:0},{x:0,y:i-1},{x:e-1,y:i-1}];return t.sort((a,r)=>{let d=a.imageX!==void 0?a.imageX:a.x,c=a.imageY!==void 0?a.imageY:a.y,n=r.imageX!==void 0?r.imageX:r.x,u=r.imageY!==void 0?r.imageY:r.y,g=Math.min(...l.map(h=>Math.sqrt(Math.pow(d-h.x,2)+Math.pow(c-h.y,2)))),p=Math.min(...l.map(h=>Math.sqrt(Math.pow(n-h.x,2)+Math.pow(u-h.y,2))));return g-p})}function So(t,e,i){let l=new Map,a=0,r=0,d=e-1,c=0,n=i-1;for(;r<=d&&c<=n;){for(let u=r;u<=d;u++)l.set(`${u},${c}`,a++);c++;for(let u=c;u<=n;u++)l.set(`${d},${u}`,a++);if(d--,c<=n){for(let u=d;u>=r;u--)l.set(`${u},${n}`,a++);n--}if(r<=d){for(let u=n;u>=c;u--)l.set(`${r},${u}`,a++);r++}}return t.sort((u,g)=>{let p=u.imageX!==void 0?u.imageX:u.x,h=u.imageY!==void 0?u.imageY:u.y,x=g.imageX!==void 0?g.imageX:g.x,w=g.imageY!==void 0?g.imageY:g.y,m=l.get(`${p},${h}`)||Number.MAX_SAFE_INTEGER,b=l.get(`${x},${w}`)||Number.MAX_SAFE_INTEGER;return m-b})}function Je(t,e,i){if(!t||t.length===0)return t;let l=(i==null?void 0:i.width)||100,a=(i==null?void 0:i.height)||100,r=At(t,e,l,a);return s(`\u2705 Patr\xF3n aplicado: ${Ve(e)} a ${r.length} p\xEDxeles`),r}var U,Re=j(()=>{M();U={LINEAR_START:"linear_start",LINEAR_END:"linear_end",RANDOM:"random",CENTER_OUT:"center_out",CORNERS_FIRST:"corners_first",SPIRAL:"spiral"}});M();me();M();M();var V=class t{static _rgbToLab(e,i,l){let a=y=>(y/=255,y<=.04045?y/12.92:Math.pow((y+.055)/1.055,2.4)),r=a(e),d=a(i),c=a(l),n=r*.4124+d*.3576+c*.1805,u=r*.2126+d*.7152+c*.0722,g=r*.0193+d*.1192+c*.9505;n/=.95047,u/=1,g/=1.08883;let p=y=>y>.008856?Math.cbrt(y):7.787*y+16/116,h=p(n),x=p(u),w=p(g),m=116*x-16,b=500*(h-x),f=200*(x-w);return[m,b,f]}static _lab(e,i,l){t._labCache||(t._labCache=new Map);let a=e<<16|i<<8|l,r=t._labCache.get(a);return r||(r=t._rgbToLab(e,i,l),t._labCache.set(a,r)),r}static findClosestPaletteColor(e,i,l,a,r={}){var p,h,x,w,m,b;if(!a||a.length===0)return null;let{useLegacyRgb:d=!1,chromaPenalty:c=0,whiteThreshold:n=240}=r;if(e>=n&&i>=n&&l>=n){let f=a.find(y=>{var C,L,A;let E=y.r||((C=y.rgb)==null?void 0:C.r)||0,S=y.g||((L=y.rgb)==null?void 0:L.g)||0,v=y.b||((A=y.rgb)==null?void 0:A.b)||0;return E>=n&&S>=n&&v>=n});if(f)return f}let u=null,g=1/0;if(d)for(let f of a){let y=f.r||((p=f.rgb)==null?void 0:p.r)||0,E=f.g||((h=f.rgb)==null?void 0:h.g)||0,S=f.b||((x=f.rgb)==null?void 0:x.b)||0,v=Math.sqrt(Math.pow(e-y,2)+Math.pow(i-E,2)+Math.pow(l-S,2));v<g&&(g=v,u=f)}else{let f=t._lab(e,i,l);for(let y of a){let E=y.r||((w=y.rgb)==null?void 0:w.r)||0,S=y.g||((m=y.rgb)==null?void 0:m.g)||0,v=y.b||((b=y.rgb)==null?void 0:b.b)||0,C=t._lab(E,S,v),L=Math.sqrt(Math.pow(f[0]-C[0],2)+Math.pow(f[1]-C[1],2)+Math.pow(f[2]-C[2],2));if(c>0){let A=Math.sqrt(f[1]*f[1]+f[2]*f[2]),_=Math.sqrt(C[1]*C[1]+C[2]*C[2]),I=Math.abs(A-_);L+=I*c}L<g&&(g=L,u=y)}}return u}static findClosestColor(e,i,l={}){return t.findClosestPaletteColor(e.r,e.g,e.b,i,l)}static clearCache(){t._labCache&&(t._labCache.clear(),s("Cach\xE9 de colores LAB limpiada"))}static getCacheStats(){return t._labCache?{size:t._labCache.size,memoryEstimate:t._labCache.size*32}:{size:0,memoryEstimate:0}}},si=V.findClosestColor.bind(V),li=V.findClosestPaletteColor.bind(V);M();function he(){s("\u{1F3A8} Detectando colores disponibles...");let t=document.querySelectorAll('[id^="color-"]'),e=[];for(let i of t){if(i.querySelector("svg"))continue;let l=i.id.replace("color-",""),a=parseInt(l);if(a===0)continue;let r=i.style.backgroundColor;if(r){let d=r.match(/\d+/g);if(d&&d.length>=3){let c={r:parseInt(d[0]),g:parseInt(d[1]),b:parseInt(d[2])};e.push({id:a,element:i,...c}),s(`Color detectado: id=${a}, rgb(${c.r},${c.g},${c.b})`)}}}return s(`\u2705 ${e.length} colores disponibles detectados`),e}var Te=class{constructor(e){this.imageSrc=e,this.img=new window.Image,this.originalName=null,this.tileSize=1e3,this.drawMult=3,this.shreadSize=3,this.bitmap=null,this.imageWidth=0,this.imageHeight=0,this.totalPixels=0,this.requiredPixelCount=0,this.defacePixelCount=0,this.colorPalette={},this.allowedColorsSet=new Set,this.rgbToMeta=new Map,this.coords=[0,0,0,0],this.templateTiles={},this.templateTilesBuffers={},this.tilePrefixes=new Set,this.selectedColors=null,this.allSiteColors=[],this.initialAllowedColorsSet=null,this.allowedColors=[]}async load(){return new Promise((e,i)=>{this.img.onload=async()=>{try{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,s(`[BLUE MARBLE] Imagen cargada: ${this.imageWidth}\xD7${this.imageHeight}`),e()}catch(l){i(l)}},this.img.onerror=i,this.img.src=this.imageSrc})}initializeColorPalette(){s("[BLUE MARBLE] Inicializando paleta de colores...");let e=he(),i=e.filter(a=>a.id!==void 0&&typeof a.r=="number"&&typeof a.g=="number"&&typeof a.b=="number");this.allowedColorsSet=new Set(i.map(a=>`${a.r},${a.g},${a.b}`));let l="222,250,206";return this.allowedColorsSet.add(l),this.rgbToMeta=new Map(i.map(a=>[`${a.r},${a.g},${a.b}`,{id:a.id,premium:!!a.premium,name:a.name||`Color ${a.id}`}])),this.rgbToMeta.set(l,{id:0,premium:!1,name:"Transparent"}),this.allSiteColors=i.map(a=>({r:a.r,g:a.g,b:a.b,id:a.id,name:a.name,premium:!!a.premium})),this.initialAllowedColorsSet=new Set(this.allowedColorsSet),this.allowedColors=[...this.allSiteColors],s(`[BLUE MARBLE] Paleta inicializada: ${this.allowedColorsSet.size} colores permitidos`),Array.from(e)}detectSiteColors(){let e=document.querySelectorAll('[id^="color-"]'),i=[];for(let l of e){let a=l.id.replace("color-",""),r=parseInt(a);if(l.querySelector("svg")||r===0)continue;let d=l.style.backgroundColor;if(d){let c=d.match(/\d+/g);if(c&&c.length>=3){let n=[parseInt(c[0]),parseInt(c[1]),parseInt(c[2])],u={id:r,element:l,rgb:n,name:l.title||l.getAttribute("aria-label")||`Color ${r}`,premium:l.classList.contains("premium")||l.querySelector(".premium")};i.push(u)}}}return s(`[BLUE MARBLE] ${i.length} colores detectados del sitio`),i}setCoords(e,i,l,a){this.coords=[e,i,l,a]}async analyzePixels(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");try{let i=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});i.imageSmoothingEnabled=!1,i.clearRect(0,0,this.imageWidth,this.imageHeight),i.drawImage(this.bitmap,0,0);let l=i.getImageData(0,0,this.imageWidth,this.imageHeight).data,a=0,r=0,d=new Map;for(let n=0;n<this.imageHeight;n++)for(let u=0;u<this.imageWidth;u++){let g=(n*this.imageWidth+u)*4,p=l[g],h=l[g+1],x=l[g+2];if(l[g+3]===0)continue;let m=`${p},${h},${x}`;p===222&&h===250&&x===206&&r++;let b=m,f=this.allowedColorsSet.has(m);if(!f&&this.allowedColors&&this.allowedColors.length>0){let y=V.findClosestPaletteColor(p,h,x,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});y&&(b=`${y.r},${y.g},${y.b}`,f=!0)}f&&(a++,d.set(b,(d.get(b)||0)+1))}this.requiredPixelCount=a,this.defacePixelCount=r;let c={};for(let[n,u]of d.entries())c[n]={count:u,enabled:!0};return this.colorPalette=c,s(`[BLUE MARBLE] An\xE1lisis: ${a.toLocaleString()} p\xEDxeles, ${d.size} colores`),{totalPixels:this.totalPixels,requiredPixels:a,defacePixels:r,uniqueColors:d.size,colorPalette:c}}catch{return this.requiredPixelCount=Math.max(0,this.totalPixels),this.defacePixelCount=0,{totalPixels:this.totalPixels,requiredPixels:this.totalPixels,defacePixels:0,uniqueColors:0,colorPalette:{}}}}async createTemplateTiles(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");let e={},i={},l=new OffscreenCanvas(this.tileSize,this.tileSize),a=l.getContext("2d",{willReadFrequently:!0});for(let r=this.coords[3];r<this.imageHeight+this.coords[3];){let d=Math.min(this.tileSize-r%this.tileSize,this.imageHeight-(r-this.coords[3]));for(let c=this.coords[2];c<this.imageWidth+this.coords[2];){let n=Math.min(this.tileSize-c%this.tileSize,this.imageWidth-(c-this.coords[2])),u=n*this.shreadSize,g=d*this.shreadSize;l.width=u,l.height=g,a.imageSmoothingEnabled=!1,a.clearRect(0,0,u,g),a.drawImage(this.bitmap,c-this.coords[2],r-this.coords[3],n,d,0,0,n*this.shreadSize,d*this.shreadSize);let p=a.getImageData(0,0,u,g);for(let m=0;m<g;m++)for(let b=0;b<u;b++){let f=(m*u+b)*4;if(p.data[f]===222&&p.data[f+1]===250&&p.data[f+2]===206)(b+m)%2===0?(p.data[f]=0,p.data[f+1]=0,p.data[f+2]=0):(p.data[f]=255,p.data[f+1]=255,p.data[f+2]=255),p.data[f+3]=32;else if(b%this.shreadSize!==1||m%this.shreadSize!==1)p.data[f+3]=0;else{let y=p.data[f],E=p.data[f+1],S=p.data[f+2];this.allowedColorsSet.has(`${y},${E},${S}`)||(p.data[f+3]=0)}}a.putImageData(p,0,0);let h=`${(this.coords[0]+Math.floor(c/1e3)).toString().padStart(4,"0")},${(this.coords[1]+Math.floor(r/1e3)).toString().padStart(4,"0")},${(c%1e3).toString().padStart(3,"0")},${(r%1e3).toString().padStart(3,"0")}`;e[h]=await createImageBitmap(l),this.tilePrefixes.add(h.split(",").slice(0,2).join(","));let w=await(await l.convertToBlob()).arrayBuffer();i[h]=w,c+=n}r+=d}return this.templateTiles=e,this.templateTilesBuffers=i,s(`[BLUE MARBLE] ${Object.keys(e).length} tiles creados`),{templateTiles:e,templateTilesBuffers:i}}generatePixelQueue(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");s(`[BLUE MARBLE DEBUG] allowedColorsSet size: ${this.allowedColorsSet?this.allowedColorsSet.size:"undefined"}`),s(`[BLUE MARBLE DEBUG] allowedColors length: ${this.allowedColors?this.allowedColors.length:"undefined"}`),this.allowedColorsSet&&this.allowedColorsSet.size>0&&s(`[BLUE MARBLE DEBUG] Primeros colores permitidos: ${Array.from(this.allowedColorsSet).slice(0,5).join(", ")}`);let e=[],i=this.coords[0]*1e3+(this.coords[2]||0),l=this.coords[1]*1e3+(this.coords[3]||0),r=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1,r.drawImage(this.bitmap,0,0);let d=r.getImageData(0,0,this.imageWidth,this.imageHeight).data,c=0,n=0,u=0,g=0,p=0,h=0;for(let x=0;x<this.imageHeight;x++)for(let w=0;w<this.imageWidth;w++){c++;let m=(x*this.imageWidth+w)*4,b=d[m],f=d[m+1],y=d[m+2],E=d[m+3];if(E===0){n++;continue}if(b===222&&f===250&&y===206){u++;continue}let S=`${b},${f},${y}`,v=S,C=b,L=f,A=y,_=this.allowedColorsSet.has(S);if(_)g++;else if(this.allowedColors&&this.allowedColors.length>0){let N=V.findClosestPaletteColor(b,f,y,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});N&&(C=N.r,L=N.g,A=N.b,v=`${C},${L},${A}`,_=!0,p++)}if(!_){h++;continue}let I=i+w,R=l+x,O=Math.floor(I/1e3),z=Math.floor(R/1e3),G=I%1e3,$=R%1e3,Z=this.rgbToMeta.get(v)||{id:0,name:"Unknown"};e.push({imageX:w,imageY:x,globalX:I,globalY:R,tileX:O,tileY:z,localX:G,localY:$,color:{r:C,g:L,b:A,id:Z.id,name:Z.name},originalColor:{r:C,g:L,b:A,alpha:E}})}return s("[BLUE MARBLE DEBUG] Estad\xEDsticas de procesamiento:"),s(`[BLUE MARBLE DEBUG] - Total p\xEDxeles procesados: ${c}`),s(`[BLUE MARBLE DEBUG] - P\xEDxeles transparentes: ${n}`),s(`[BLUE MARBLE DEBUG] - P\xEDxeles #deface: ${u}`),s(`[BLUE MARBLE DEBUG] - Coincidencias exactas: ${g}`),s(`[BLUE MARBLE DEBUG] - Coincidencias LAB: ${p}`),s(`[BLUE MARBLE DEBUG] - P\xEDxeles inv\xE1lidos: ${h}`),s(`[BLUE MARBLE DEBUG] - Cola final: ${e.length} p\xEDxeles`),s(`[BLUE MARBLE] Cola: ${e.length} p\xEDxeles`),e}async resize(e,i,l=!0){if(!this.img)throw new Error("Imagen no cargada. Llama a load() primero.");let a=this.img.width,r=this.img.height;if(l){let u=a/r;e/i>u?e=i*u:i=e/u}let d=document.createElement("canvas");d.width=e,d.height=i;let c=d.getContext("2d");c.imageSmoothingEnabled=!1,c.drawImage(this.img,0,0,e,i);let n=d.toDataURL();return this.img.src=n,this.imageSrc=n,await new Promise(u=>{this.img.onload=async()=>{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,u()}}),s(`[BLUE MARBLE] Imagen redimensionada: ${a}\xD7${r} \u2192 ${this.imageWidth}\xD7${this.imageHeight}`),{width:this.imageWidth,height:this.imageHeight}}getImageData(){return{width:this.imageWidth,height:this.imageHeight,totalPixels:this.totalPixels,requiredPixels:this.requiredPixelCount,defacePixels:this.defacePixelCount,colorPalette:this.colorPalette,coords:[...this.coords],originalName:this.originalName||"image.png",pixels:this.generatePixelQueue()}}generatePreview(e=200,i=200){if(!this.img)return null;let l=document.createElement("canvas"),a=l.getContext("2d"),{width:r,height:d}=this.img,c=r/d,n,u;return e/i>c?(u=i,n=i*c):(n=e,u=e/c),l.width=n,l.height=u,a.imageSmoothingEnabled=!1,a.drawImage(this.img,0,0,n,u),l.toDataURL()}getDimensions(){return{width:this.imageWidth,height:this.imageHeight}}setSelectedColors(e){this.selectedColors=e,e&&e.length>0?(this.allowedColorsSet=new Set(e.map(i=>i.id)),this.colorPalette={},e.forEach(i=>{this.colorPalette[i.id]=i.rgb}),s(`\u{1F3A8} [BLUE MARBLE] Paleta actualizada con ${e.length} colores seleccionados`),this.imageDataCache=null):s("\u{1F3A8} [BLUE MARBLE] Usando todos los colores disponibles")}};M();var ie=t=>new Promise(e=>setTimeout(e,t));async function qe(t,{timeout:e=1e4,...i}={}){let l=new AbortController,a=setTimeout(()=>l.abort("timeout"),e);try{return await fetch(t,{signal:l.signal,...i})}finally{clearTimeout(a)}}M();var ne=null,Ge=0,Xe=!1,we=null,Et=new Promise(t=>{we=t}),co=24e4,Y=null,J=null,Ie=null,He=null,D=null;function _e(t){we&&(we(t),we=null),ne=t,Ge=Date.now()+co,s("\u2705 Turnstile token set successfully")}function be(){return ne&&Date.now()<Ge}function ce(){ne=null,Ge=0,s("\u{1F5D1}\uFE0F Token invalidated, will force fresh generation")}async function de(t=!1){if(be()&&!t)return ne;if(t&&ce(),Xe)return s("\u{1F504} Token generation already in progress, waiting..."),await W(2e3),be()?ne:null;Xe=!0;try{s("\u{1F504} Token expired or missing, generating new one...");let e=await uo();if(e&&e.length>20)return _e(e),s("\u2705 Token captured and cached successfully"),e;s("\u26A0\uFE0F Invisible Turnstile failed, forcing browser automation...");let i=await yo();return i&&i.length>20?(_e(i),s("\u2705 Fallback token captured successfully"),i):(s("\u274C All token generation methods failed"),null)}finally{Xe=!1}}async function uo(){let t=Date.now();try{let e=xo();s("\u{1F511} Generating Turnstile token for sitekey:",e),typeof window!="undefined"&&window.navigator&&s("\u{1F9ED} UA:",window.navigator.userAgent,"Platform:",window.navigator.platform);let i=await go(e);if(i&&i.length>20){let l=Math.round(Date.now()-t);return s(`\u2705 Turnstile token generated successfully in ${l}ms`),i}else throw new Error("Invalid or empty token received")}catch(e){let i=Math.round(Date.now()-t);throw s(`\u274C Turnstile token generation failed after ${i}ms:`,e),e}}async function go(t){return fo(t,"paint")}async function po(){return window.turnstile?Promise.resolve():new Promise((t,e)=>{if(document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')){let l=()=>{window.turnstile?t():setTimeout(l,100)};return l()}let i=document.createElement("script");i.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",i.async=!0,i.defer=!0,i.onload=()=>{s("\u2705 Turnstile script loaded successfully"),t()},i.onerror=()=>{s("\u274C Failed to load Turnstile script"),e(new Error("Failed to load Turnstile"))},document.head.appendChild(i)})}function mo(){return(!J||!document.body.contains(J))&&(J&&J.remove(),J=document.createElement("div"),J.style.cssText=`
      position: fixed !important;
      left: -9999px !important; /* keep off-screen for invisible mode */
      top: -9999px !important;
      width: 300px !important;
      height: 65px !important;
      pointer-events: none !important;
      opacity: 0 !important; /* do not use visibility:hidden to avoid engine quirks */
      z-index: -1 !important;
    `,J.setAttribute("aria-hidden","true"),J.id="turnstile-widget-container",document.body.appendChild(J)),J}function ho(){if(Ie&&document.body.contains(Ie))return Ie;let t=document.createElement("div");t.id="turnstile-overlay-container",t.style.cssText=`
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
  `;let e=document.createElement("div");e.textContent="Cloudflare Turnstile \u2014 please complete the check if shown",e.style.cssText='font: 600 12px/1.3 "Segoe UI",sans-serif; margin-bottom: 8px; opacity: 0.9;';let i=document.createElement("div");i.id="turnstile-overlay-host",i.style.cssText="width: 100%; min-height: 70px;";let l=document.createElement("button");return l.textContent="Hide",l.style.cssText="position:absolute; top:6px; right:6px; font-size:11px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:2px 6px; cursor:pointer;",l.addEventListener("click",()=>t.remove()),t.appendChild(e),t.appendChild(i),t.appendChild(l),document.body.appendChild(t),Ie=t,t}async function fo(t,e="paint"){var c,n;if(await po(),Y&&He===t&&((c=window.turnstile)!=null&&c.execute))try{s("\u{1F504} Reusing existing Turnstile widget...");let u=await Promise.race([window.turnstile.execute(Y,{action:e}),new Promise((g,p)=>setTimeout(()=>p(new Error("Execute timeout")),15e3))]);if(u&&u.length>20)return s("\u2705 Token generated via widget reuse"),u}catch(u){s("\u{1F504} Widget reuse failed, will create a fresh widget:",u.message)}let i=await wo(t,e);if(i&&i.length>20)return i;s("\u{1F440} Falling back to interactive Turnstile (visible).");try{je("\u{1F504} Resolviendo CAPTCHA...","info")}catch{}let l=3e4,a=3e4,r=1,d=!1;for(;;){let u=r===1?l:a;s(`\u{1F504} Intento ${r} de resoluci\xF3n del CAPTCHA (timeout: ${u/1e3}s)...`),r>1&&!d?(fe(`\u{1F504} CAPTCHA: Reintentando autom\xE1ticamente cada 30 segundos (intento ${r})`,"info"),d=!0):r>2&&fe(`\u{1F504} CAPTCHA: Intento ${r} - Continuando autom\xE1ticamente`,"info");try{if(Y&&((n=window.turnstile)!=null&&n.remove))try{window.turnstile.remove(Y),Y=null}catch{}let g=await bo(t,e,!0,u);if(g&&g.length>20)return s(`\u2705 CAPTCHA resuelto exitosamente en el intento ${r}`),r>1&&fe("\u2705 CAPTCHA resuelto exitosamente","success"),g;s(`\u26A0\uFE0F Intento ${r} fall\xF3, reintentando en 30 segundos...`),r>1&&fe(`\u26A0\uFE0F Intento ${r} fall\xF3, reintentando en 30 segundos...`,"info"),await W(3e4)}catch(g){s(`\u274C Error en intento ${r}:`,g.message),r>1&&fe(`\u274C Error en intento ${r}, reintentando en 30 segundos`,"error"),await W(3e4)}r++}}async function wo(t,e){return new Promise(i=>{var l;try{if(Y&&((l=window.turnstile)!=null&&l.remove))try{window.turnstile.remove(Y)}catch{}let a=mo();a.innerHTML="";let r=window.turnstile.render(a,{sitekey:t,action:e,size:"invisible",retry:"auto","retry-interval":8e3,callback:d=>{s("\u2705 Invisible Turnstile callback"),i(d)},"error-callback":()=>i(null),"timeout-callback":()=>i(null)});if(Y=r,He=t,!r)return i(null);Promise.race([window.turnstile.execute(r,{action:e}),new Promise((d,c)=>setTimeout(()=>c(new Error("Invisible execute timeout")),12e3))]).then(i).catch(()=>i(null))}catch(a){s("Invisible Turnstile failed:",a),i(null)}})}async function bo(t,e,i=!0,l=3e4){return new Promise((a,r)=>{var d;try{if(Y&&((d=window.turnstile)!=null&&d.remove))try{window.turnstile.remove(Y)}catch{}let c=ho(),n=c.querySelector("#turnstile-overlay-host");n.innerHTML="";let g=setTimeout(()=>{s(`\u23F0 Interactive Turnstile timed out (${i?"auto-retry":"manual"})`);try{c.remove()}catch{}a(null)},i?l:12e4),p=window.turnstile.render(n,{sitekey:t,action:e,size:"normal",retry:"auto","retry-interval":i?3e3:8e3,callback:h=>{clearTimeout(g);try{c.remove()}catch{}s(`\u2705 Interactive Turnstile solved (${i?"auto-retry":"manual"})`),a(h)},"error-callback":h=>{if(s(`\u{1F6A8} Interactive Turnstile error (${i?"auto-retry":"manual"}):`,h),i){clearTimeout(g);try{c.remove()}catch{}a(null)}},"timeout-callback":()=>{if(s(`\u23F0 Turnstile timeout callback (${i?"auto-retry":"manual"})`),i){clearTimeout(g);try{c.remove()}catch{}a(null)}},"expired-callback":()=>{if(s(`\u26A0\uFE0F Interactive Turnstile token expired (${i?"auto-retry":"manual"})`),i){clearTimeout(g);try{c.remove()}catch{}a(null)}}});if(Y=p,He=t,!p){clearTimeout(g);try{c.remove()}catch{}a(null);return}}catch(c){s(`\u274C Error creating interactive Turnstile widget (${i?"auto-retry":"manual"}):`,c),r(c)}})}function xo(t="0x4AAAAAABpqJe8FO0N84q0F"){var e;if(D)return D;try{let i=document.querySelector("[data-sitekey]");if(i){let r=i.getAttribute("data-sitekey");if(r&&r.length>10)return D=r,s("\u{1F50D} Sitekey detected from data attribute:",r),r}let l=document.querySelector(".cf-turnstile");if((e=l==null?void 0:l.dataset)!=null&&e.sitekey&&l.dataset.sitekey.length>10)return D=l.dataset.sitekey,s("\u{1F50D} Sitekey detected from turnstile element:",D),D;if(typeof window!="undefined"&&window.__TURNSTILE_SITEKEY&&window.__TURNSTILE_SITEKEY.length>10)return D=window.__TURNSTILE_SITEKEY,s("\u{1F50D} Sitekey detected from global variable:",D),D;let a=document.querySelectorAll("script");for(let r of a){let c=(r.textContent||r.innerHTML).match(/sitekey['":\s]+(['"0-9a-zA-Z_-]{20,})/i);if(c&&c[1]&&c[1].length>10)return D=c[1].replace(/['"]/g,""),s("\u{1F50D} Sitekey detected from script content:",D),D}}catch(i){s("Error detecting sitekey:",i)}return s("\u{1F50D} Using fallback sitekey:",t),D=t,t}function W(t){return new Promise(e=>setTimeout(e,t))}function fe(t,e="info"){je(t,e)}function je(t,e="info",i=3e3){let l=document.getElementById("wplace-toast-container");l||(l=document.createElement("div"),l.id="wplace-toast-container",l.style.cssText=`
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    `,document.body.appendChild(l));let a=e==="success"?"#10b981":e==="error"?"#ef4444":"#3b82f6",r=document.createElement("div");r.className="wplace-toast",r.textContent=t,r.style.cssText=`
    min-width: 240px;
    max-width: 80vw;
    margin: 0 auto;
    background: ${a};
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
  `,l.appendChild(r),(n=>typeof window!="undefined"&&window.requestAnimationFrame?window.requestAnimationFrame(n):setTimeout(n,16))(()=>{r.style.transform="translateY(0) scale(1)",r.style.opacity="1"});let c=()=>{r.style.transform="translateY(-10px) scale(0.98)",r.style.opacity="0",setTimeout(()=>r.remove(),250)};i>0&&setTimeout(c,i),r.addEventListener("click",c)}function ee(t,e=200,i=1e4){return new Promise(l=>{let a=Date.now()+i,r=()=>{let d=document.querySelector(t);d?l(d):Date.now()<a?setTimeout(r,e):l(null)};r()})}async function yo(){return new Promise((t,e)=>{(async()=>{try{s("\u{1F3AF} Starting automatic CAPTCHA solving process...");try{je("Intentando resolver... Tiempo de espera maximo 30 s","info")}catch{}ce(),Et=new Promise(r=>{we=r});let l=W(3e4).then(()=>e(new Error("Auto-CAPTCHA timed out after 30 seconds."))),a=(async()=>{let r=await ee("button.btn.btn-primary.btn-lg",200,3e3);if(r||(r=await ee("button.btn-primary.sm\\:btn-xl",200,3e3)),r||(r=await ee("button.btn-primary",200,3e3)),!r){s("\u{1F3AF} No paint button found, clicking on canvas directly to trigger CAPTCHA...");let w=await ee("canvas",200,5e3);w&&(w.click(),await W(1e3),r=await ee("button.btn.btn-primary.btn-lg, button.btn-primary.sm\\:btn-xl, button.btn-primary",200,5e3))}if(!r)throw new Error("Could not find any paint button after attempts.");s("\u{1F3AF} Found paint button, clicking..."),r.click(),await W(500),s("\u{1F3AF} Selecting transparent color...");let d=await ee("button#color-0",200,5e3);if(d)d.click();else{s("\u26A0\uFE0F Could not find transparent color button, trying alternative selectors...");let w=document.querySelectorAll('button[id^="color-"]');w.length>0&&(w[0].click(),s("\u{1F3AF} Clicked first available color button"))}await W(500),s("\u{1F3AF} Finding canvas element...");let c=await ee("canvas",200,5e3);if(!c)throw new Error("Could not find the canvas element.");c.setAttribute("tabindex","0"),c.focus();let n=c.getBoundingClientRect(),u=Math.round(n.left+n.width/2),g=Math.round(n.top+n.height/2);s("\u{1F3AF} Simulating canvas interaction..."),typeof window!="undefined"&&window.MouseEvent&&window.KeyboardEvent&&(c.dispatchEvent(new window.MouseEvent("mousemove",{clientX:u,clientY:g,bubbles:!0})),c.dispatchEvent(new window.MouseEvent("mousedown",{clientX:u,clientY:g,bubbles:!0})),await W(50),c.dispatchEvent(new window.MouseEvent("mouseup",{clientX:u,clientY:g,bubbles:!0})),c.dispatchEvent(new window.KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),await W(50),c.dispatchEvent(new window.KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0}))),await W(1e3),s("\u{1F3AF} Waiting for CAPTCHA challenge..."),await W(2e3),s("\u{1F3AF} Starting confirmation loop...");let p=Date.now();(async()=>{let w=0;for(;!be()&&Date.now()-p<25e3;){w++;let m=await ee("button.btn.btn-primary.btn-lg",100,1e3);if(m||(m=await ee("button.btn.btn-primary.sm\\:btn-xl",100,1e3)),!m){let b=Array.from(document.querySelectorAll("button.btn-primary"));m=b.length?b[b.length-1]:null}m&&!m.disabled?(s(`\u{1F3AF} Clicking confirmation button (attempt ${w})...`),m.click()):s(`\u{1F3AF} No active confirm button found (attempt ${w})`),await W(800)}})();let x=await Et;await W(500),s("\u2705 Token successfully captured through browser automation"),t(x)})();await Promise.race([a,l])}catch(l){s("\u274C Auto-CAPTCHA process failed:",l),e(l)}})()})}window.__WPA_SET_TURNSTILE_TOKEN__=function(t){t&&typeof t=="string"&&t.length>20&&(s("\u2705 Turnstile Token Captured:",t),_e(t))};(function(){if(window.__WPA_FETCH_HOOKED__)return;window.__WPA_FETCH_HOOKED__=!0;let t=window.fetch;window.fetch=async function(...e){let i=await t.apply(this,e),l=e[0]instanceof Request?e[0].url:e[0];if(typeof l=="string"&&l.includes("https://backend.wplace.live/s0/pixel/"))try{let a=JSON.parse(e[1].body);if(a.t){let r=a.t;(!be()||ne!==r)&&(s("\u2705 Turnstile Token Captured:",r),window.postMessage({source:"turnstile-capture",token:r},"*"))}}catch{}return i},window.addEventListener("message",e=>{let{source:i,token:l}=e.data;i==="turnstile-capture"&&l&&(!be()||ne!==l)&&_e(l)})})();M();var ke="https://backend.wplace.live";async function ue(){var t,e,i,l;try{let a=await fetch(`${ke}/me`,{credentials:"include"}).then(u=>u.json()),r=a||null,d=(a==null?void 0:a.charges)||{},c=(t=a==null?void 0:a.droplets)!=null?t:0,n={count:(e=d.count)!=null?e:0,max:(i=d.max)!=null?i:0,cooldownMs:(l=d.cooldownMs)!=null?l:3e4};return{success:!0,data:{user:r,charges:n.count,maxCharges:n.max,chargeRegen:n.cooldownMs,droplets:c}}}catch(a){return{success:!1,error:a.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4,droplets:0}}}}async function St(t,e,i,l,a){try{let r=JSON.stringify({colors:l,coords:i,t:a});s(`[API] Sending batch to tile ${t},${e} with ${l.length} pixels, token: ${a?a.substring(0,50)+"...":"null"}`);let d=await fetch(`${ke}/s0/pixel/${t}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:r});if(s(`[API] Response: ${d.status} ${d.statusText}`),d.status===403){try{await d.json()}catch{}console.error("\u274C 403 Forbidden. Turnstile token might be invalid or expired.");try{console.log("\u{1F504} Regenerating Turnstile token after 403...");let u=await de(!0);if(!u)return{status:403,json:{error:"Could not generate new token"},success:!1,painted:0};let g=JSON.stringify({colors:l,coords:i,t:u});s(`[API] Retrying with fresh token: ${u.substring(0,50)}...`);let p=await fetch(`${ke}/s0/pixel/${t}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:g});if(s(`[API] Retry response: ${p.status} ${p.statusText}`),p.status===403)return{status:403,json:{error:"Fresh token still expired or invalid after retry"},success:!1,painted:0};let h=null;try{let w=await p.text();w.trim()?h=JSON.parse(w):h={}}catch(w){s(`[API] Warning: Could not parse retry response JSON: ${w.message}`),h={}}let x=(h==null?void 0:h.painted)||0;if(s(`[API] Retry result: ${x} pixels painted`),p.ok)try{ce()}catch{}return{status:p.status,json:h,success:p.ok,painted:x}}catch(u){return console.error("\u274C Token regeneration failed:",u),{status:403,json:{error:"Token regeneration failed: "+u.message},success:!1,painted:0}}}if(d.status>=500&&d.status<=504)try{let u=await de(!0),g=JSON.stringify({colors:l,coords:i,t:u});s(`[API] Retrying after ${d.status} with fresh token: ${u.substring(0,50)}...`);let p=await fetch(`${ke}/s0/pixel/${t}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:g}),h=null;try{let w=await p.text();h=w&&w.trim()?JSON.parse(w):{}}catch{h={}}let x=(h==null?void 0:h.painted)||0;if(s(`[API] Retry after ${d.status}: ${x} pixels painted`),p.ok)try{ce()}catch{}return{status:p.status,json:h,success:p.ok,painted:x}}catch{}let c=null;try{let u=await d.text();u.trim()?c=JSON.parse(u):c={}}catch(u){s(`[API] Warning: Could not parse response JSON: ${u.message}`),c={}}let n=(c==null?void 0:c.painted)||0;if(s(`[API] Success: ${n} pixels painted`),d.ok)try{ce()}catch{}return{status:d.status,json:c,success:d.ok,painted:n}}catch(r){return s(`[API] Network error: ${r.message}`),{status:0,json:{error:r.message},success:!1,painted:0}}}me();Ae();Re();var ae=null,xe=!1,ye=null,Pe=null,ge=null;var Tt=3e4;function Lo(){ae&&document.removeEventListener("visibilitychange",ae),ae=()=>{document.hidden?(s("\u{1F4F1} Pesta\xF1a oculta - pausando timers"),o.inCooldown&&(xe=!0)):(s("\u{1F4F1} Pesta\xF1a visible - reanudando timers"),xe&&o.inCooldown&&(Ao(),xe=!1))},document.addEventListener("visibilitychange",ae)}function Ao(){if(!ye||!Pe)return;let t=Date.now(),e=t-ye,i=Math.max(0,Pe-e);o.nextBatchCooldown=Math.ceil(i/1e3),o.cooldownEndTime=t+i,s(`\u{1F504} Recalculando cooldown: ${Math.ceil(i/1e3)}s restantes`)}var Be=0,It=12e4;async function To(){ge&&window.clearInterval(ge),Lo(),ge=window.setInterval(async()=>{try{if(document.hidden)return;if(o.remainingPixels.length>0&&!o.running){let t=await ue();if(t.success&&t.data.charges>0){let e=Math.floor(t.data.charges),i=Date.now();i-Be>It&&(s(`\u{1F504} Monitoreo: ${e} cargas disponibles`),Be=i),o.currentCharges=t.data.charges,o.maxCharges=t.data.maxCharges,e>=o.pixelsPerBatch&&window.imageBot&&typeof window.imageBot.onStartPainting=="function"&&(s(`\u{1F680} Reanudando pintado autom\xE1ticamente con ${e} cargas`),window.imageBot.onStartPainting())}}}catch(t){let e=Date.now();e-Be>It&&(s(`\u26A0\uFE0F Error en monitoreo de cargas: ${t.message}`),Be=e)}},Tt),s(`\u2705 Monitoreo de cargas iniciado (cada ${Tt/1e3}s)`)}function Qe(){ge&&(window.clearInterval(ge),ge=null,s("\u23F9\uFE0F Monitoreo de cargas detenido")),ae&&(document.removeEventListener("visibilitychange",ae),ae=null),ye=null,Pe=null,xe=!1}var Ke=0,Io=3e4;async function kt(t,e){if(o.stopFlag)return s("\u{1F6D1} Bot detenido, cancelando verificaci\xF3n de cargas"),!1;let i=await ue();if(i.success){let l=Math.floor(i.data.charges);if(o.currentCharges=i.data.charges,o.maxCharges=i.data.maxCharges,l<t){if(o.stopFlag)return s("\u{1F6D1} Bot detenido durante verificaci\xF3n de cargas"),!1;let a=Date.now();return a-Ke>Io&&(s(`\u23F3 Cargas insuficientes: ${l}/${t}. Esperando regeneraci\xF3n...`),Ke=a),await Bo(t-l,e),o.stopFlag?(s("\u{1F6D1} Bot detenido durante cooldown, cancelando recursi\xF3n"),!1):await kt(t,e)}return Ke=0,!0}return s(`\u26A0\uFE0F No se pudo verificar cargas, continuando con valor cached: ${o.currentCharges}`),o.currentCharges>=t}async function Rt(t,e,i,l,a){let{width:r,height:d}=t,{x:c,y:n}=e;s(`Iniciando pintado: imagen(${r}x${d}) inicio LOCAL(${c},${n}) tile(${o.tileX},${o.tileY})`),s(`\u{1F3A8} Patr\xF3n: ${o.paintPattern}`),To();try{s("\u{1F511} Generando token Turnstile al inicio del proceso..."),await de()?s("\u2705 Token inicial generado exitosamente"):s("\u26A0\uFE0F No se pudo generar token inicial, continuando con flujo normal")}catch(u){s("\u26A0\uFE0F Error generando token inicial:",u.message)}if(!o.remainingPixels||o.remainingPixels.length===0||o.lastPosition.x===0&&o.lastPosition.y===0){s("Generando cola de p\xEDxeles..."),o.remainingPixels=$o(t,e,o.tileX,o.tileY),o.paintPattern&&o.paintPattern!=="linear_start"&&(s(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${o.paintPattern}`),o.remainingPixels=Je(o.remainingPixels,o.paintPattern,t)),(o.lastPosition.x>0||o.lastPosition.y>0)&&(o.remainingPixels=o.remainingPixels.filter(u=>{let g=u.imageY*r+u.imageX,p=o.lastPosition.y*r+o.lastPosition.x;return g>=p})),s(`Cola generada: ${o.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),o.startPosition&&o.tileX!==void 0&&o.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}))}catch(u){s("\u26A0\uFE0F Error actualizando plan overlay:",u)}}try{for(;o.remainingPixels.length>0&&!o.stopFlag;){let u=Math.floor(o.currentCharges),g;if(s(`\u{1F50D} Estado del primer lote - isFirstBatch: ${o.isFirstBatch}, useAllChargesFirst: ${o.useAllChargesFirst}, availableCharges: ${u}`),o.isFirstBatch&&o.useAllChargesFirst&&u>0?(g=Math.min(u,o.remainingPixels.length),o.isFirstBatch=!1,s(`\u{1F680} Primera pasada: usando ${g} cargas de ${u} disponibles`)):(g=Math.min(o.pixelsPerBatch,o.remainingPixels.length),s(`\u2699\uFE0F Pasada normal: usando ${g} p\xEDxeles (configurado: ${o.pixelsPerBatch})`)),!await kt(g,i)){s("\u26A0\uFE0F No se pudieron obtener suficientes cargas, pausando pintado");break}u=Math.floor(o.currentCharges);let h=o.remainingPixels.splice(0,g),x=h,w=0;s(`Verificando lote de ${h.length} p\xEDxeles...`),s(`Pintando lote de ${x.length} p\xEDxeles...`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch})}catch(b){s("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",b)}let m=await Ro(x,i);if(m.success&&m.painted>0){if(o.paintedPixels+=m.painted+w,o.currentCharges=Math.max(0,o.currentCharges-m.painted),s(`Cargas despu\xE9s del lote: ${o.currentCharges.toFixed(1)} (consumidas: ${m.painted})`),o.currentCharges=Math.max(0,o.currentCharges-m.painted),s(`Cargas despu\xE9s del lote: ${o.currentCharges.toFixed(1)} (consumidas: ${m.painted})`),x.length>0){let E=x[x.length-1];o.lastPosition={x:E.imageX,y:E.imageY}}s(`Lote exitoso: ${m.painted}/${x.length} p\xEDxeles pintados. Total: ${o.paintedPixels}/${o.totalPixels}`);let b=zo(),f=(o.paintedPixels/o.totalPixels*100).toFixed(1),y=T("image.passCompleted",{painted:m.painted,percent:f,current:o.paintedPixels,total:o.totalPixels});i&&i(o.paintedPixels,o.totalPixels,y,b),await ie(2e3)}else m.shouldContinue?s("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(o.remainingPixels.unshift(...x),s("Lote fall\xF3: reintentando en 5 segundos..."),await ie(5e3));await ie(500)}if(o.stopFlag)s(`Pintado pausado en p\xEDxel imagen(${o.lastPosition.x},${o.lastPosition.y})`),l&&l(!1,o.paintedPixels);else{s(`Pintado completado: ${o.paintedPixels} p\xEDxeles pintados`),o.lastPosition={x:0,y:0},o.remainingPixels=[],Qe();try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),s("\u2705 Plan overlay limpiado al completar pintado"))}catch(u){s("\u26A0\uFE0F Error limpiando plan overlay:",u)}l&&l(!0,o.paintedPixels)}}catch(u){s("Error en proceso de pintado:",u),Qe(),a&&a(u)}}async function _o(t){var e;try{if(!t||t.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let i=new Map;for(let r of t){let d=`${r.tileX},${r.tileY}`;i.has(d)||i.set(d,{coords:[],colors:[],tx:r.tileX,ty:r.tileY});let c=i.get(d);c.coords.push(r.localX,r.localY),c.colors.push(r.color.id||r.color.value||1)}let l=await de(),a=0;for(let{coords:r,colors:d,tx:c,ty:n}of i.values()){if(d.length===0)continue;let u=[];for(let h=0;h<r.length;h+=2){let x=(Number(r[h])%1e3+1e3)%1e3,w=(Number(r[h+1])%1e3+1e3)%1e3;Number.isFinite(x)&&Number.isFinite(w)&&u.push(x,w)}try{let h=999,x=0,w=999,m=0;for(let b=0;b<u.length;b+=2){let f=u[b],y=u[b+1];f<h&&(h=f),f>x&&(x=f),y<w&&(w=y),y>m&&(m=y)}s(`[IMG] Enviando tile ${c},${n}: ${d.length} px | x:[${h},${x}] y:[${w},${m}]`)}catch{}let g=await St(c,n,u,d,l);if(g.status!==200)return{success:!1,painted:a,error:((e=g.json)==null?void 0:e.message)||`HTTP ${g.status}`,status:g.status};let p=g.painted||0;if(p===0&&d.length>0)return s(`\u26A0\uFE0F API devolvi\xF3 200 OK pero painted=0 para ${d.length} p\xEDxeles en tile ${c},${n}`),{success:!1,painted:a,error:`API devolvi\xF3 painted=0 para ${d.length} p\xEDxeles`,status:200,shouldRetry:!0};a+=p,s(`\u2705 Tile ${c},${n}: ${p}/${d.length} p\xEDxeles pintados exitosamente`)}return{success:!0,painted:a}}catch(i){return s("Error en paintPixelBatch:",i),{success:!1,painted:0,error:i.message}}}var _t=0,$e=0,ko=6e4;async function Ro(t,e){for(let r=1;r<=5;r++)try{let d=await _o(t);if(d.success)return o.retryCount=0,$e=0,d;if(o.retryCount=r,r<5){let c=3e3*Math.pow(2,r-1),n=Math.round(c/1e3),u;if(d.status===0||d.status==="NetworkError"){$e++;let p=Date.now();(p-_t>ko||$e===1)&&(s(`\u{1F310} Error de red (${$e} consecutivos). Reintento ${r}/5 en ${n}s`),_t=p),u=T("image.networkError")}else d.status>=500?(u=T("image.serverError"),s(`\u{1F527} Error del servidor ${d.status}. Reintento ${r}/5 en ${n}s`)):d.status===408?(u=T("image.timeoutError"),s(`\u23F1\uFE0F Timeout. Reintento ${r}/5 en ${n}s`)):(u=T("image.retryAttempt",{attempt:r,maxAttempts:5,delay:n}),s(`\u{1F504} Reintento ${r}/5 despu\xE9s de ${n}s. Error: ${d.error}`));e&&e(o.paintedPixels,o.totalPixels,u),await ie(c)}}catch(d){if(o.retryCount=r,r<5){let c=3e3*Math.pow(2,r-1),n=Math.round(c/1e3);(r===1||r%3===0)&&s(`\u274C Excepci\xF3n en intento ${r}:`,d.message);let u=T("image.retryError",{attempt:r,maxAttempts:5,delay:n});e&&e(o.paintedPixels,o.totalPixels,u),await ie(c)}}o.retryCount=5;let a=T("image.retryFailed",{maxAttempts:5});return e&&e(o.paintedPixels,o.totalPixels,a),s("\u{1F4A5} Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function Bo(t,e){let l=Q.CHARGE_REGEN_MS*t+5e3;if(o.stopFlag){s("\u{1F6D1} Bot detenido, cancelando cooldown");return}s(`Esperando ${Math.round(l/1e3)}s para obtener ${t} cargas`);let a=Date.now();if(ye=a,Pe=l,o.inCooldown=!0,o.cooldownEndTime=a+l,o.nextBatchCooldown=Math.round(l/1e3),e){let r=Math.floor(l/6e4),d=Math.floor(l%6e4/1e3),c=r>0?`${r}m ${d}s`:`${d}s`,n=T("image.waitingChargesRegen",{current:Math.floor(o.currentCharges),needed:t,time:c});e(o.paintedPixels,o.totalPixels,n)}for(;;){let d=Date.now()-a,c=Math.max(0,l-d);if(o.stopFlag){s(`\u{1F6D1} Bot detenido durante cooldown con ${Math.ceil(c/1e3)}s restantes`);break}if(c<=0)break;let n=Math.ceil(c/1e3);o.nextBatchCooldown=n;let u=n%30===0||n<=30&&n%10===0||n<=5||d<2e3;if(e&&u){let g=Math.floor(n/60),p=n%60,h=g>0?`${g}m ${p}s`:`${p}s`,x=T("image.waitingChargesCountdown",{current:Math.floor(o.currentCharges),needed:t,time:h});e(o.paintedPixels,o.totalPixels,x)}await ie(Math.min(1e3,c))}o.inCooldown=!1,o.nextBatchCooldown=0,ye=null,Pe=null,xe=!1,o.stopFlag||(o.currentCharges=Math.min(o.maxCharges||9999,o.currentCharges+l/Q.CHARGE_REGEN_MS))}function $o(t,e,i,l){let{x:a,y:r}=e,d=[],c;if(t&&t.processor&&typeof t.processor.generatePixelQueue=="function")c=t.processor.generatePixelQueue();else if(t&&typeof t.generatePixelQueue=="function")c=t.generatePixelQueue();else if(t&&Array.isArray(t.pixels))c=t.pixels;else if(t&&typeof t.pixels=="function")c=t.pixels();else if(t&&t.pixels)c=t.pixels;else return s(`\u274C Error: No se pueden obtener p\xEDxeles de imageData. Tipo: ${typeof t}`,t),[];if(!Array.isArray(c))return s(`\u274C Error: pixels no es un array iterable. Tipo: ${typeof c}`,c),[];for(let n of c){if(!n)continue;let u=n.imageX!==void 0?n.imageX:n.x,g=n.imageY!==void 0?n.imageY:n.y,p=n.color!==void 0?n.color:n.targetColor;if(u===void 0||g===void 0){s("\u26A0\uFE0F P\xEDxel con coordenadas inv\xE1lidas:",n);continue}let h=a+u,x=r+g,w=Math.floor(h/1e3),m=Math.floor(x/1e3),b=i+w,f=l+m,y=(h%1e3+1e3)%1e3,E=(x%1e3+1e3)%1e3;d.push({imageX:u,imageY:g,localX:y,localY:E,tileX:b,tileY:f,color:p,originalColor:n.originalColor})}return s(`Cola de p\xEDxeles generada: ${d.length} p\xEDxeles para pintar`),d}function zo(){if(!o.remainingPixels||o.remainingPixels.length===0)return 0;let t=o.remainingPixels.length,e=o.pixelsPerBatch,i=Q.CHARGE_REGEN_MS/1e3,l=Math.ceil(t/e),a=e*i,r=(l-1)*a,d=l*2;return Math.ceil(r+d)}function et(){o.stopFlag=!0,o.running=!1,Qe(),s("\u{1F6D1} Deteniendo proceso de pintado...")}M();me();function Mo(){return o.imageData?o.imageData.processor&&typeof o.imageData.processor.generatePixelQueue=="function"?o.imageData.processor.generatePixelQueue():o.imageData.fullPixelData&&Array.isArray(o.imageData.fullPixelData)&&o.imageData.fullPixelData.length>0?o.imageData.fullPixelData:o.imageData.pixels&&o.imageData.pixels.length>0?o.imageData.pixels:o.remainingPixels&&o.remainingPixels.length>0?(s("\u26A0\uFE0F Exportando usando remainingPixels (posible subconjunto del proyecto)"),o.remainingPixels):null:null}function tt(t=null){try{if(!o.imageData||o.paintedPixels===0)throw new Error("No hay progreso para guardar");let e=null;try{let n=Mo();n&&Array.isArray(n)&&(n.length>5e4?(s(`\u26A0\uFE0F Imagen muy grande (${n.length} p\xEDxeles), guardando solo p\xEDxeles restantes`),e=null):e=n)}catch(n){s("\u26A0\uFE0F Error obteniendo datos completos de p\xEDxeles, continuando sin ellos:",n),e=null}let i={version:"2.0",timestamp:Date.now(),imageData:{width:o.imageData.width,height:o.imageData.height,originalName:o.originalImageName,...e&&{fullPixelData:e}},progress:{paintedPixels:o.paintedPixels,totalPixels:o.totalPixels,lastPosition:{...o.lastPosition}},position:{startPosition:{...o.startPosition},tileX:o.tileX,tileY:o.tileY},config:{pixelsPerBatch:o.pixelsPerBatch,useAllChargesFirst:o.useAllChargesFirst,isFirstBatch:o.isFirstBatch,maxCharges:o.maxCharges,paintPattern:o.paintPattern},colors:o.availableColors.map(n=>({id:n.id,r:n.r,g:n.g,b:n.b})),remainingPixels:o.remainingPixels||[]},l;try{l=JSON.stringify(i,null,2)}catch{s("\u26A0\uFE0F Error serializando datos completos, intentando sin fullPixelData"),delete i.imageData.fullPixelData,l=JSON.stringify(i,null,2)}let a=new window.Blob([l],{type:"application/json"}),r=t||`wplace_progress_${o.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,d=window.URL.createObjectURL(a),c=document.createElement("a");return c.href=d,c.download=r,document.body.appendChild(c),c.click(),document.body.removeChild(c),window.URL.revokeObjectURL(d),s(`\u2705 Progreso guardado: ${r}`),{success:!0,filename:r}}catch(e){return s("\u274C Error guardando progreso:",e),{success:!1,error:e.message}}}async function $t(t){return new Promise(e=>{try{let i=new window.FileReader;i.onload=l=>{try{let a=JSON.parse(l.target.result),d=["imageData","progress","position","colors"].filter(u=>!(u in a));if(d.length>0)throw new Error(`Campos requeridos faltantes: ${d.join(", ")}`);let c=a.version||"1.0";if(s(`\u{1F4C1} Cargando progreso versi\xF3n ${c}`),(!o.availableColors||o.availableColors.length===0)&&(o.availableColors=Array.isArray(a.colors)?a.colors:[]),o.availableColors.length>0&&Array.isArray(a.colors)){let u=a.colors.map(h=>h.id),g=o.availableColors.map(h=>h.id);u.filter(h=>g.includes(h)).length<u.length*.8&&s("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}o.imageData={...a.imageData,pixels:[]};let n=a.imageData.fullPixelData||a.fullPixelData;if(Array.isArray(n)&&n.length>0&&(o.imageData.fullPixelData=n,o.imageData.pixels=n,s(`\u2705 Cargados ${n.length} p\xEDxeles completos del proyecto`)),o.paintedPixels=a.progress.paintedPixels,o.totalPixels=a.progress.totalPixels,a.progress.lastPosition?o.lastPosition=a.progress.lastPosition:a.position.lastX!==void 0&&a.position.lastY!==void 0&&(o.lastPosition={x:a.position.lastX,y:a.position.lastY}),a.position.startPosition?o.startPosition=a.position.startPosition:a.position.startX!==void 0&&a.position.startY!==void 0&&(o.startPosition={x:a.position.startX,y:a.position.startY}),o.tileX=a.position.tileX,o.tileY=a.position.tileY,o.originalImageName=a.imageData.originalName,o.remainingPixels=a.remainingPixels||a.progress.remainingPixels||[],a.config&&(o.pixelsPerBatch=a.config.pixelsPerBatch||o.pixelsPerBatch,o.useAllChargesFirst=a.config.useAllChargesFirst!==void 0?a.config.useAllChargesFirst:o.useAllChargesFirst,o.isFirstBatch=o.useAllChargesFirst?!0:a.config.isFirstBatch!==void 0?a.config.isFirstBatch:!1,s(`\u{1F4C1} Progreso cargado - useAllChargesFirst: ${o.useAllChargesFirst}, isFirstBatch: ${o.isFirstBatch}`),o.maxCharges=a.config.maxCharges||o.maxCharges,c>="2.0"&&(o.paintPattern=a.config.paintPattern||"linear_start")),o.paintPattern&&o.paintPattern!=="linear_start"&&o.remainingPixels.length>0)try{Promise.resolve().then(()=>(Re(),Ze)).then(({applyPaintPattern:u})=>{o.remainingPixels=u(o.remainingPixels,o.paintPattern,o.imageData),s(`\u{1F3A8} Patr\xF3n de pintado aplicado: ${o.paintPattern}`)}).catch(u=>{s("\u26A0\uFE0F Error aplicando patr\xF3n de pintado:",u)})}catch(u){s("\u26A0\uFE0F Error cargando m\xF3dulo de patrones:",u)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),o.startPosition&&o.tileX!==void 0&&o.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y}),s(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${o.tileX},${o.tileY}) local(${o.startPosition.x},${o.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}),s(`\u2705 Plan overlay activado con ${o.remainingPixels.length} p\xEDxeles restantes`))}catch(u){s("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",u)}o.imageLoaded=!0,o.colorsChecked=!0,s(`\u2705 Progreso cargado (v${c}): ${o.paintedPixels}/${o.totalPixels} p\xEDxeles`),c>="2.0"&&s(`\u{1F3A8} Patr\xF3n: ${o.paintPattern}`),e({success:!0,data:a,painted:o.paintedPixels,total:o.totalPixels,canContinue:o.remainingPixels.length>0,version:c})}catch(a){s("\u274C Error parseando archivo de progreso:",a),e({success:!1,error:a.message})}},i.onerror=()=>{let l="Error leyendo archivo";s("\u274C",l),e({success:!1,error:l})},i.readAsText(t)}catch(i){s("\u274C Error cargando progreso:",i),e({success:!1,error:i.message})}})}function zt(){o.paintedPixels=0,o.totalPixels=0,o.lastPosition={x:0,y:0},o.remainingPixels=[],o.imageData=null,o.startPosition=null,o.imageLoaded=!1,o.originalImageName=null,o.isFirstBatch=!0,o.nextBatchCooldown=0,o.drawnPixelsMap.clear(),o.lastProtectionCheck=0,s("\u{1F9F9} Progreso limpiado")}function Bt(){return o.imageLoaded&&o.paintedPixels>0&&o.remainingPixels&&o.remainingPixels.length>0}function Mt(){return{hasProgress:Bt(),painted:o.paintedPixels,total:o.totalPixels,remaining:o.remainingPixels?o.remainingPixels.length:0,percentage:o.totalPixels>0?o.paintedPixels/o.totalPixels*100:0,lastPosition:{...o.lastPosition},canContinue:Bt()}}M();function ze(t=null){let e=document.createElement("div");t&&(e.id=t),e.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 0; /* No forzar al frente; el window-manager ajustar\xE1 seg\xFAn corresponda */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let i=e.attachShadow({mode:"open"});return document.body.appendChild(e),{host:e,root:i}}M();var Me=1e5,ot=new Set;function q(t){if(!t)return;ot.add(t);let e=i=>{(i.target===t||t.contains(i.target))&&te(t)};if(t.addEventListener("mousedown",e),t._bringToFrontHandler=e,!t.style.zIndex){t.style.zIndex=Me++;let i=t.getRootNode&&t.getRootNode();i&&i.host&&i.host.style&&(i.host.style.zIndex=t.style.zIndex)}}function X(t){t&&(ot.delete(t),t._bringToFrontHandler&&(t.removeEventListener("mousedown",t._bringToFrontHandler),delete t._bringToFrontHandler))}function te(t){if(!t||!ot.has(t))return;Me++,t.style.zIndex=Me;let e=t.getRootNode&&t.getRootNode();e&&e.host&&e.host.style&&(e.host.style.zIndex=Me)}var Ne=class{constructor(e="Bot"){this.botName=e,this.isVisible=!1,this.logs=[],this.maxLogs=1e3,this.container=null,this.logContent=null,this.isResizing=!1,this.resizeHandle=null,this.originalConsole={},this.config={width:600,height:400,x:window.innerWidth-620,y:20,visible:!1},this.loadConfig(),this.createWindow(),this.setupLogInterception(),this.setupEventListeners()}loadConfig(){try{let e=localStorage.getItem(`wplace-log-window-${this.botName}`);e&&(this.config={...this.config,...JSON.parse(e)})}catch(e){s("Error cargando configuraci\xF3n de ventana de logs:",e)}}saveConfig(){try{localStorage.setItem(`wplace-log-window-${this.botName}`,JSON.stringify(this.config))}catch(e){s("Error guardando configuraci\xF3n de ventana de logs:",e)}}createWindow(){this.container=document.createElement("div"),this.container.className="wplace-log-window",this.container.style.cssText=`
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
    `;let i=document.createElement("div");i.textContent=`\u{1F4CB} Logs - ${this.botName}`,i.style.cssText=`
      font-weight: bold;
      font-size: 14px;
      color: #e2e8f0;
    `;let l=document.createElement("div");l.style.cssText=`
      display: flex;
      gap: 8px;
    `;let a=document.createElement("button");a.innerHTML="\u{1F4BE}",a.title="Descargar logs",a.style.cssText=`
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
    `,a.addEventListener("mouseenter",()=>{a.style.background="rgba(34, 197, 94, 1)"}),a.addEventListener("mouseleave",()=>{a.style.background="rgba(34, 197, 94, 0.8)"}),a.addEventListener("click",()=>this.downloadLogs());let r=document.createElement("button");r.innerHTML="\u2715",r.title="Cerrar ventana",r.style.cssText=`
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
    `,r.addEventListener("mouseenter",()=>{r.style.background="rgba(239, 68, 68, 1)"}),r.addEventListener("mouseleave",()=>{r.style.background="rgba(239, 68, 68, 0.8)"}),r.addEventListener("click",()=>this.hide()),l.appendChild(a),l.appendChild(r),e.appendChild(i),e.appendChild(l),this.logContent=document.createElement("div"),this.logContent.className="log-window-content",this.logContent.style.cssText=`
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
    `,this.container.appendChild(e),this.container.appendChild(this.logContent),this.container.appendChild(this.resizeHandle),document.body.appendChild(this.container),q(this.container),this.setupDragging(e),this.setupResizing(),this.isVisible=this.config.visible}setupDragging(e){let i=!1,l={x:0,y:0};e.addEventListener("mousedown",d=>{d.target.tagName!=="BUTTON"&&(i=!0,l.x=d.clientX-this.container.offsetLeft,l.y=d.clientY-this.container.offsetTop,document.addEventListener("mousemove",a),document.addEventListener("mouseup",r),d.preventDefault())});let a=d=>{if(!i)return;let c=Math.max(0,Math.min(window.innerWidth-this.container.offsetWidth,d.clientX-l.x)),n=Math.max(0,Math.min(window.innerHeight-this.container.offsetHeight,d.clientY-l.y));this.container.style.left=c+"px",this.container.style.top=n+"px",this.config.x=c,this.config.y=n},r=()=>{i=!1,document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",r),this.saveConfig()}}setupResizing(){let e=!1,i,l,a,r;this.resizeHandle.addEventListener("mousedown",n=>{e=!0,i=n.clientX,l=n.clientY,a=parseInt(document.defaultView.getComputedStyle(this.container).width,10),r=parseInt(document.defaultView.getComputedStyle(this.container).height,10),document.addEventListener("mousemove",d),document.addEventListener("mouseup",c),n.preventDefault()});let d=n=>{if(!e)return;let u=Math.max(300,a+n.clientX-i),g=Math.max(200,r+n.clientY-l);this.container.style.width=u+"px",this.container.style.height=g+"px",this.config.width=u,this.config.height=g},c=()=>{e=!1,document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",c),this.saveConfig()}}setupLogInterception(){this.originalConsole={log:console.log,info:console.info,warn:console.warn,error:console.error,debug:console.debug},console.log=(...e)=>{this.originalConsole.log.apply(console,e),this.addLog("log",e)},console.info=(...e)=>{this.originalConsole.info.apply(console,e),this.addLog("info",e)},console.warn=(...e)=>{this.originalConsole.warn.apply(console,e),this.addLog("warn",e)},console.error=(...e)=>{this.originalConsole.error.apply(console,e),this.addLog("error",e)},console.debug=(...e)=>{this.originalConsole.debug.apply(console,e),this.addLog("debug",e)}}addLog(e,i){let l=new Date().toLocaleTimeString(),a=i.map(d=>typeof d=="object"?JSON.stringify(d,null,2):String(d)).join(" "),r={timestamp:l,type:e,message:a,raw:i};this.logs.push(r),this.logs.length>this.maxLogs&&this.logs.shift(),this.isVisible&&this.updateLogDisplay()}updateLogDisplay(){if(!this.logContent)return;let e=this.logs.map(i=>`<div style="color: ${this.getLogColor(i.type)}; margin-bottom: 2px;">[${i.timestamp}] ${i.message}</div>`).join("");this.logContent.innerHTML=e,this.logContent.scrollTop=this.logContent.scrollHeight}getLogColor(e){let i={log:"#e2e8f0",info:"#60a5fa",warn:"#fbbf24",error:"#f87171",debug:"#a78bfa"};return i[e]||i.log}downloadLogs(){let e=new Date,i=e.toISOString().split("T")[0],l=e.toTimeString().split(" ")[0].replace(/:/g,"-"),a=`log_${this.botName}_${i}_${l}.log`,r=this.logs.map(u=>`[${u.timestamp}] [${u.type.toUpperCase()}] ${u.message}`).join(`
`),d=new Blob([r],{type:"text/plain"}),c=URL.createObjectURL(d),n=document.createElement("a");n.href=c,n.download=a,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(c),s(`\u{1F4E5} Logs descargados como: ${a}`)}show(){this.container&&(this.container.style.display="flex",te(this.container),this.isVisible=!0,this.config.visible=!0,this.updateLogDisplay(),this.saveConfig())}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1,this.config.visible=!1,this.saveConfig())}toggle(){this.isVisible?this.hide():this.show()}clear(){this.logs=[],this.logContent&&(this.logContent.innerHTML="")}setupEventListeners(){window.addEventListener("resize",()=>{if(this.container){let e=window.innerWidth-this.container.offsetWidth,i=window.innerHeight-this.container.offsetHeight;this.config.x>e&&(this.config.x=Math.max(0,e),this.container.style.left=this.config.x+"px"),this.config.y>i&&(this.config.y=Math.max(0,i),this.container.style.top=this.config.y+"px"),this.saveConfig()}})}destroy(){this.originalConsole.log&&(console.log=this.originalConsole.log,console.info=this.originalConsole.info,console.warn=this.originalConsole.warn,console.error=this.originalConsole.error,console.debug=this.originalConsole.debug),this.container&&this.container.parentNode&&(X(this.container),this.container.parentNode.removeChild(this.container)),this.container=null,this.logContent=null,this.logs=[]}};window.__wplaceLogWindows=window.__wplaceLogWindows||{};function it(t){return window.__wplaceLogWindows[t]||(window.__wplaceLogWindows[t]=new Ne(t)),window.__wplaceLogWindows[t]}M();var re={0:{id:1,name:"Black",rgb:{r:0,g:0,b:0}},1:{id:2,name:"Dark Gray",rgb:{r:60,g:60,b:60}},2:{id:3,name:"Gray",rgb:{r:120,g:120,b:120}},3:{id:4,name:"Light Gray",rgb:{r:210,g:210,b:210}},4:{id:5,name:"White",rgb:{r:255,g:255,b:255}},5:{id:6,name:"Deep Red",rgb:{r:96,g:0,b:24}},6:{id:7,name:"Red",rgb:{r:237,g:28,b:36}},7:{id:8,name:"Orange",rgb:{r:255,g:127,b:39}},8:{id:9,name:"Gold",rgb:{r:246,g:170,b:9}},9:{id:10,name:"Yellow",rgb:{r:249,g:221,b:59}},10:{id:11,name:"Light Yellow",rgb:{r:255,g:250,b:188}},11:{id:12,name:"Dark Green",rgb:{r:14,g:185,b:104}},12:{id:13,name:"Green",rgb:{r:19,g:230,b:123}},13:{id:14,name:"Light Green",rgb:{r:135,g:255,b:94}},14:{id:15,name:"Dark Teal",rgb:{r:12,g:129,b:110}},15:{id:16,name:"Teal",rgb:{r:16,g:174,b:166}},16:{id:17,name:"Light Teal",rgb:{r:19,g:225,b:190}},17:{id:20,name:"Cyan",rgb:{r:96,g:247,b:242}},18:{id:44,name:"Light Cyan",rgb:{r:187,g:250,b:242}},19:{id:18,name:"Dark Blue",rgb:{r:40,g:80,b:158}},20:{id:19,name:"Blue",rgb:{r:64,g:147,b:228}},21:{id:21,name:"Indigo",rgb:{r:107,g:80,b:246}},22:{id:22,name:"Light Indigo",rgb:{r:153,g:177,b:251}},23:{id:23,name:"Dark Purple",rgb:{r:120,g:12,b:153}},24:{id:24,name:"Purple",rgb:{r:170,g:56,b:185}},25:{id:25,name:"Light Purple",rgb:{r:224,g:159,b:249}},26:{id:26,name:"Dark Pink",rgb:{r:203,g:0,b:122}},27:{id:27,name:"Pink",rgb:{r:236,g:31,b:128}},28:{id:28,name:"Light Pink",rgb:{r:243,g:141,b:169}},29:{id:29,name:"Dark Brown",rgb:{r:104,g:70,b:52}},30:{id:30,name:"Brown",rgb:{r:149,g:104,b:42}},31:{id:31,name:"Beige",rgb:{r:248,g:178,b:119}},32:{id:52,name:"Light Beige",rgb:{r:255,g:197,b:165}},33:{id:32,name:"Medium Gray",rgb:{r:170,g:170,b:170}},34:{id:33,name:"Dark Red",rgb:{r:165,g:14,b:30}},35:{id:34,name:"Light Red",rgb:{r:250,g:128,b:114}},36:{id:35,name:"Dark Orange",rgb:{r:228,g:92,b:26}},37:{id:37,name:"Dark Goldenrod",rgb:{r:156,g:132,b:49}},38:{id:38,name:"Goldenrod",rgb:{r:197,g:173,b:49}},39:{id:39,name:"Light Goldenrod",rgb:{r:232,g:212,b:95}},40:{id:40,name:"Dark Olive",rgb:{r:74,g:107,b:58}},41:{id:41,name:"Olive",rgb:{r:90,g:148,b:74}},42:{id:42,name:"Light Olive",rgb:{r:132,g:197,b:115}},43:{id:43,name:"Dark Cyan",rgb:{r:15,g:121,b:159}},44:{id:45,name:"Light Blue",rgb:{r:125,g:199,b:255}},45:{id:46,name:"Dark Indigo",rgb:{r:77,g:49,b:184}},46:{id:47,name:"Dark Slate Blue",rgb:{r:74,g:66,b:132}},47:{id:48,name:"Slate Blue",rgb:{r:122,g:113,b:196}},48:{id:49,name:"Light Slate Blue",rgb:{r:181,g:174,b:241}},49:{id:53,name:"Dark Peach",rgb:{r:155,g:82,b:73}},50:{id:54,name:"Peach",rgb:{r:209,g:128,b:120}},51:{id:55,name:"Light Peach",rgb:{r:250,g:182,b:164}},52:{id:50,name:"Light Brown",rgb:{r:219,g:164,b:99}},53:{id:56,name:"Dark Tan",rgb:{r:123,g:99,b:82}},54:{id:57,name:"Tan",rgb:{r:156,g:132,b:107}},55:{id:36,name:"Light Tan",rgb:{r:214,g:181,b:148}},56:{id:51,name:"Dark Beige",rgb:{r:209,g:128,b:81}},57:{id:61,name:"Dark Stone",rgb:{r:109,g:100,b:63}},58:{id:62,name:"Stone",rgb:{r:148,g:140,b:107}},59:{id:63,name:"Light Stone",rgb:{r:205,g:197,b:158}},60:{id:58,name:"Dark Slate",rgb:{r:51,g:57,b:65}},61:{id:59,name:"Slate",rgb:{r:109,g:117,b:141}},62:{id:60,name:"Light Slate",rgb:{r:179,g:185,b:209}},63:{id:0,name:"Transparent",rgb:null}};function Nt(){s("\u{1F4CA} Creando ventana de estad\xEDsticas de pintado");let{host:t,root:e}=ze(),i=document.createElement("style");i.textContent=`
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
  `,e.appendChild(i);let l=document.createElement("div");l.className="stats-container",l.innerHTML=`
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
  `,e.appendChild(l);let a={container:l,header:l.querySelector(".header"),refreshBtnHeader:l.querySelector(".refresh-btn-header"),closeBtn:l.querySelector(".close-btn"),userStats:l.querySelector(".user-stats"),imageStats:l.querySelector(".image-stats"),colorsStats:l.querySelector(".colors-stats"),refreshBtn:l.querySelector(".refresh-btn")};q(l);let r=!1,d=null;a.closeBtn.addEventListener("click",()=>{n()}),a.refreshBtnHeader.addEventListener("click",()=>{d&&d()}),a.refreshBtn.addEventListener("click",()=>{d&&d()});function c(){l.style.display="block",te(l),r=!0,s("\u{1F4CA} Ventana de estad\xEDsticas mostrada")}function n(){l.style.display="none",r=!1,s("\u{1F4CA} Ventana de estad\xEDsticas ocultada")}function u(){r?n():c()}function g(m){if(!m){a.userStats.innerHTML=`
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
      `),m.cooldown!==void 0&&m.cooldown>0){let f=Math.floor(m.cooldown/60),y=m.cooldown%60,E=f>0?`${f}m ${y}s`:`${y}s`;b+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Cooldown</div>
          <div class="stat-value">${E}</div>
        </div>
      `}a.userStats.innerHTML=b||`
      <div class="stat-item">
        <div class="stat-label">\u2139\uFE0F Informaci\xF3n no disponible</div>
      </div>
    `}function p(m){if(!m||!m.loaded){a.imageStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4F7} No hay imagen cargada</div>
        </div>
      `;return}let b=m.totalPixels>0?Math.round(m.paintedPixels/m.totalPixels*100):0,f=`
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
    `;if(m.estimatedTime!==void 0&&m.estimatedTime>0){let y=Math.floor(m.estimatedTime/3600),E=Math.floor(m.estimatedTime%3600/60),S=y>0?`${y}h ${E}m`:`${E}m`;f+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Tiempo Estimado</div>
          <div class="stat-value">${S}</div>
        </div>
      `}m.originalName&&(f+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4C1} Archivo</div>
          <div class="stat-value">${m.originalName}</div>
        </div>
      `),a.imageStats.innerHTML=f}function h(m){if(!m||m.length===0){a.colorsStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u274C Abra la paleta de colores en el sitio</div>
        </div>
      `;return}let b=Object.values(re).filter(S=>S.rgb!==null),f=new Set(m.map(S=>S.id)),y=`
      <div class="stat-item">
        <div class="stat-label">\u2705 Colores Disponibles</div>
        <div class="stat-value">${m.length}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">\u{1F4CA} Total de Colores</div>
        <div class="stat-value">${b.length}</div>
      </div>
      <div class="colors-grid">
    `;m.forEach(S=>{let v=re[Object.keys(re).find(_=>re[_].id===S.id)],C=v?v.name:`Color ${S.id}`,A=`rgb(${(S.rgb||[0,0,0]).join(",")})`;y+=`
        <div class="color-swatch" style="background-color: ${A};" title="${C} (ID: ${S.id})">
          <div class="color-info">${C}</div>
        </div>
      `}),b.filter(S=>!f.has(S.id)).forEach(S=>{let C=`rgb(${[S.rgb.r,S.rgb.g,S.rgb.b].join(",")})`;y+=`
        <div class="color-swatch unavailable" style="background-color: ${C};" title="${S.name} (ID: ${S.id}) - No disponible">
          <div class="color-info">${S.name} (No disponible)</div>
        </div>
      `}),y+="</div>",a.colorsStats.innerHTML=y}function x(m){d=m}function w(){X(l),t.remove()}return s("\u2705 Ventana de estad\xEDsticas de pintado creada"),{show:c,hide:n,toggle:u,updateUserStats:g,updateImageStats:p,updateColorsStats:h,setRefreshCallback:x,destroy:w,isVisible:()=>r}}M();M();function Ot(t,e=[]){s("\u{1F3A8} Creando selector de paleta de colores");let i=document.createElement("div");i.className="wplace-section",i.id="color-palette-section",i.style.marginTop="15px",i.innerHTML=`
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
  `;let l=document.createElement("style");l.textContent=`
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
  `;let a=t.getRootNode&&t.getRootNode();a&&a.nodeType===11&&a.host?a.querySelector("#color-palette-styles")||(l.id="color-palette-styles",a.appendChild(l)):document.head.querySelector("#color-palette-styles")||(l.id="color-palette-styles",document.head.appendChild(l)),t.appendChild(i);let d={showAllToggle:i.querySelector("#showAllColorsToggle"),selectAllBtn:i.querySelector("#selectAllBtn"),unselectAllBtn:i.querySelector("#unselectAllBtn"),colorsContainer:i.querySelector("#colors-container")},c=new Set,n=!1,u=null;function g(){c.clear(),d.colorsContainer.querySelectorAll(".wplace-color-swatch.active").forEach(y=>{let E=parseInt(y.dataset.colorId);isNaN(E)||c.add(E)}),u&&u(Array.from(c))}function p(f,y=!1){d.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(S=>{let v=S.classList.contains("unavailable"),C=parseInt(S.dataset.colorId);(!v||y)&&(v||(S.classList.toggle("active",f),f?c.add(C):c.delete(C)))}),g(),s(`\u{1F3A8} ${f?"Seleccionados":"Deseleccionados"} todos los colores disponibles`)}function h(f=!1){if(d.colorsContainer.innerHTML="",!e||e.length===0){d.colorsContainer.innerHTML='<div style="text-align: center; color: #888; padding: 20px;">Upload an image first to capture available colors</div>';return}let y=0,E=0,S=c.size>0,v=new Set;Object.values(re).filter(A=>A.rgb!==null).forEach(A=>{let{id:_,name:I,rgb:R}=A,O=`${R.r},${R.g},${R.b}`;E++;let z=e.some(P=>P.r===R.r&&P.g===R.g&&P.b===R.b);if(!f&&!z)return;z&&y++;let G=document.createElement("div");G.className="wplace-color-item";let $=document.createElement("button");$.className=`wplace-color-swatch ${z?"":"unavailable"}`,$.title=`${I} (ID: ${_})${z?"":" (Unavailable)"}`,$.dataset.rgb=O,$.dataset.colorId=_,$.style.backgroundColor=`rgb(${R.r}, ${R.g}, ${R.b})`,z||($.disabled=!0);let Z=S?c.has(_):z;$.classList.toggle("active",Z),Z?v.add(_):v.delete(_);let N=document.createElement("span");N.className="wplace-color-item-name",N.textContent=I+(z?"":" (N/A)"),z||(N.style.color="#888",N.style.fontStyle="italic"),z&&$.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation();let k=$.classList.contains("active");$.classList.toggle("active",!k),k?c.delete(_):c.add(_),g(),s(`\u{1F3A8} Color ${I} (ID: ${_}) ${k?"deseleccionado":"seleccionado"}`)}),G.appendChild($),G.appendChild(N),d.colorsContainer.appendChild(G)}),c=v,d.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(A=>{let _=parseInt(A.dataset.colorId),I=c.has(_);A.classList.toggle("active",I)}),g()}d.showAllToggle.addEventListener("change",f=>{n=f.target.checked,h(n)}),d.selectAllBtn.addEventListener("click",()=>{p(!0,n)}),d.unselectAllBtn.addEventListener("click",()=>{p(!1,n)}),h(!1);function x(f){e=f||[],h(n)}function w(){return Array.from(c)}function m(f){c=new Set(f||[]),d.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(E=>{let S=parseInt(E.dataset.colorId),v=c.has(S);E.classList.toggle("active",v)}),u&&u(Array.from(c))}function b(f){u=f}return s("\u2705 Selector de paleta de colores creado"),{updateAvailableColors:x,getSelectedColors:w,setSelectedColors:m,onSelectionChange:b,element:i}}function Ft(){let t=null;function e(d){let c=document.createElement("div");c.style.cssText=`
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
    `,c.innerHTML=`
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
    `,document.body.appendChild(c),t={overlay:c,container:c,preview:c.querySelector(".resize-preview"),previewContainer:c.querySelector(".resize-preview-container"),widthSlider:c.querySelector(".width-slider"),heightSlider:c.querySelector(".height-slider"),widthValue:c.querySelector(".width-value"),heightValue:c.querySelector(".height-value"),maintainAspect:c.querySelector(".maintain-aspect"),confirmBtn:c.querySelector(".confirm-resize"),cancelBtn:c.querySelector(".cancel-resize"),colorPaletteSelector:null,resizeWindow:c,resizeHeader:c.querySelector(".resize-header"),minimizeBtn:c.querySelector("#minimizeResizeBtn"),closeBtn:c.querySelector("#closeResizeBtn"),resizeContent:c.querySelector(".resize-content"),previewInfo:c.querySelector(".resize-preview-info")},c.addEventListener("dragstart",u=>u.preventDefault()),t.preview&&t.preview.addEventListener("dragstart",u=>u.preventDefault()),l(c,t.resizeHeader);let n=!1;t.minimizeBtn.addEventListener("click",()=>{n=!n,n?(t.resizeContent.style.display="none",c.style.height="auto",c.style.resize="none",t.minimizeBtn.textContent="\u2795"):(t.resizeContent.style.display="block",c.style.resize="both",t.minimizeBtn.textContent="\u2796")}),t.closeBtn.addEventListener("click",()=>{a()}),q(c),s("\u2705 Elementos del di\xE1logo de redimensionamiento creados")}function i(d,c={}){if(!t){s("\u274C Error: Elementos de redimensionamiento no inicializados");return}let n=d.getDimensions(),u=n.width,g=n.height,p=u,h=g,x=u/g,w=()=>{try{let C=p,L=h,A=d.generatePreview(C,L);if(t.preview.src=A,t.previewInfo){let _=C*L;t.previewInfo.textContent=`${C}\xD7${L} px | Total: ${_.toLocaleString()} p\xEDxeles`}}catch(C){s("\u26A0\uFE0F Error generando vista previa:",C)}};if(t.widthSlider.value=u,t.heightSlider.value=g,t.widthValue.textContent=u,t.heightValue.textContent=g,!t.colorPaletteSelector){let C=t.container.querySelector(".resize-content")||t.container;t.colorPaletteSelector=Ot(C)}function m(){p=parseInt(t.widthSlider.value),t.widthValue.textContent=p,t.maintainAspect.checked&&(h=Math.round(p/x),t.heightSlider.value=h,t.heightValue.textContent=h),w()}function b(){h=parseInt(t.heightSlider.value),t.heightValue.textContent=h,t.maintainAspect.checked&&(p=Math.round(h*x),t.widthSlider.value=p,t.widthValue.textContent=p),w()}function f(){t.maintainAspect.checked&&(p=parseInt(t.widthSlider.value),h=Math.round(p/x),t.heightSlider.value=h,t.heightValue.textContent=h),w()}t.widthSlider.removeEventListener("input",m),t.heightSlider.removeEventListener("input",b),t.maintainAspect.removeEventListener("change",f),t.widthSlider.addEventListener("input",m),t.heightSlider.addEventListener("input",b),t.maintainAspect.addEventListener("change",f);function y(){var L,A;if(t.colorPaletteSelector&&t.colorPaletteSelector.getSelectedColors)return t.colorPaletteSelector.getSelectedColors();let C=(A=(L=t.colorPaletteSelector)==null?void 0:L.element)==null?void 0:A.querySelectorAll(".wplace-color-swatch.active");return C?Array.from(C).map(_=>parseInt(_.dataset.colorId)):[]}function E(C){!C||!t.colorPaletteSelector||t.colorPaletteSelector.updateAvailableColors&&t.colorPaletteSelector.updateAvailableColors(C)}function S(){let C=y();c.onConfirmResize&&c.onConfirmResize(d,p,h,C),a()}function v(){a()}if(t.confirmBtn.removeEventListener("click",S),t.cancelBtn.removeEventListener("click",v),t.confirmBtn.addEventListener("click",S),t.cancelBtn.addEventListener("click",v),c.getAvailableColors){let C=c.getAvailableColors();E(C)}if(c.onColorSelectionChange&&t.colorPaletteSelector&&t.colorPaletteSelector.onSelectionChange&&t.colorPaletteSelector.onSelectionChange(c.onColorSelectionChange),t.resizeWindow.style.display="flex",te(t.resizeWindow),t.previewResizeObserver)try{t.previewResizeObserver.disconnect()}catch{}window.ResizeObserver?(t.previewResizeObserver=new window.ResizeObserver(()=>w()),t.previewContainer&&t.previewResizeObserver.observe(t.previewContainer)):(t.onWindowResize=()=>w(),window.addEventListener("resize",t.onWindowResize,{passive:!0})),w(),s("\u{1F4CF} Di\xE1logo de redimensionamiento mostrado")}function l(d,c){let n=!1,u,g,p,h,x=0,w=0,m=E=>!!E.closest("button, input, select, textarea, a, label, .btn");c.addEventListener("mousedown",b),document.addEventListener("mousemove",f,{passive:!1}),document.addEventListener("mouseup",y);function b(E){!c.contains(E.target)||m(E.target)||(E.preventDefault(),p=E.clientX-x,h=E.clientY-w,n=!0,d.style.userSelect="none",document.body.style.userSelect="none")}function f(E){n&&(E.preventDefault(),u=E.clientX-p,g=E.clientY-h,x=u,w=g,d.style.left=u+"px",d.style.top=g+"px")}function y(){n=!1,d.style.userSelect="",document.body.style.userSelect=""}}function a(){if(!t||!t.resizeWindow){s("\u274C Error: Elementos de redimensionamiento no encontrados");return}if(t.resizeWindow.style.display="none",X(t.resizeWindow),t.previewResizeObserver){try{t.previewResizeObserver.disconnect()}catch{}t.previewResizeObserver=null}t.onWindowResize&&(window.removeEventListener("resize",t.onWindowResize),t.onWindowResize=null),s("\u{1F4CF} Di\xE1logo de redimensionamiento cerrado")}function r(d){e(d),s("\u2705 Ventana de redimensionamiento inicializada")}return{initialize:r,showResizeDialog:i,closeResizeDialog:a}}M();function nt(){function t(a,r,d={}){return new Promise(c=>{let n=document.createElement("div");n.className="modal-overlay",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.background="rgba(0,0,0,0.7)",n.style.zIndex="10001",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center";let u=document.createElement("div");u.style.background="#1a1a1a",u.style.border="2px solid #333",u.style.borderRadius="15px",u.style.padding="25px",u.style.color="#eee",u.style.minWidth="350px",u.style.maxWidth="400px",u.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",u.style.fontFamily="'Segoe UI', Roboto, sans-serif",u.innerHTML=`
        <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${r}</h3>
        <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4; white-space: pre-line;">${a}</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          ${d.confirm?`<button class="confirm-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${d.confirm}</button>`:""}
          ${d.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${d.save}</button>`:""}
          ${d.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${d.discard}</button>`:""}
          ${d.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${d.cancel}</button>`:""}
        </div>
      `,n.appendChild(u),document.body.appendChild(n),q(n);let g=u.querySelector(".confirm-btn"),p=u.querySelector(".save-btn"),h=u.querySelector(".discard-btn"),x=u.querySelector(".cancel-btn"),w=()=>{X(n),document.body.removeChild(n)};g&&g.addEventListener("click",()=>{w(),c("confirm")}),p&&p.addEventListener("click",()=>{w(),c("save")}),h&&h.addEventListener("click",()=>{w(),c("discard")}),x&&x.addEventListener("click",()=>{w(),c("cancel")}),n.addEventListener("click",b=>{b.target===n&&(w(),c("cancel"))});let m=b=>{b.key==="Escape"&&(w(),document.removeEventListener("keydown",m),c("cancel"))};document.addEventListener("keydown",m)})}function e(a){return new Promise(r=>{let d=a.remainingPixels?a.remainingPixels.length:0,c=a.imageData&&a.imageData.processor?a.imageData.processor:null,n=d;try{if((!n||n===0)&&c&&typeof c.generatePixelQueue=="function"){let w=c.generatePixelQueue();Array.isArray(w)&&(n=w.length)}}catch{}let u=a.imageData?a.imageData.width:0,g=a.imageData?a.imageData.height:0;if((!u||!g)&&c&&typeof c.getDimensions=="function")try{let w=c.getDimensions();w&&w.width&&w.height&&(u=w.width,g=w.height)}catch{}let p=typeof a.tileX=="number"?a.tileX:0,h=typeof a.tileY=="number"?a.tileY:0,x=`\xBFDeseas generar un archivo JSON compatible con Auto-Guard.js?

Este archivo contendr\xE1:
\u2022 \xC1rea de protecci\xF3n: ${u}x${g} p\xEDxeles
\u2022 Posici\xF3n: Tile (${p}, ${h})
\u2022 ${n||0} p\xEDxeles para proteger

El archivo se guardar\xE1 autom\xE1ticamente y podr\xE1s importarlo en Auto-Guard.js.`;t(x,"\u{1F6E1}\uFE0F Generar JSON para Auto-Guard",{confirm:"S\xED, generar JSON",cancel:"No, continuar sin generar"}).then(w=>{r(w==="confirm")}).catch(()=>{r(!1)})})}function i(a){return new Promise(r=>{try{let d=a&&a.protectionData&&a.protectionData.area,c=d?a.protectionData.area:null,n=c&&["x1","y1","x2","y2"].every(f=>Number.isFinite(c[f])),u=Array.isArray(a==null?void 0:a.originalPixels),g=Array.isArray(a==null?void 0:a.colors);if(!d||!n||!u||!g){s("\u274C Estructura inv\xE1lida para JSON del Guard. Abortando guardado.");try{l("Estructura inv\xE1lida del JSON del Guard. Vuelve a intentarlo tras seleccionar la posici\xF3n.","error")}catch{}return r({success:!1,error:"Invalid Guard JSON structure"})}let h=`wplace_GUARD_from_Image_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,x=JSON.stringify(a,null,2),w=new window.Blob([x],{type:"application/json"}),m=window.URL.createObjectURL(w),b=document.createElement("a");b.href=m,b.download=h,document.body.appendChild(b),b.click(),document.body.removeChild(b),window.URL.revokeObjectURL(m),s(`\u2705 JSON del Guard guardado: ${h}`),r({success:!0,filename:h})}catch(d){s(`\u274C Error guardando JSON del Guard: ${d.message}`),r({success:!1,error:d.message})}})}function l(a,r="info"){let d=document.createElement("div");switch(d.style.position="fixed",d.style.top="20px",d.style.right="20px",d.style.padding="15px 20px",d.style.borderRadius="8px",d.style.color="white",d.style.fontWeight="bold",d.style.zIndex="10002",d.style.maxWidth="300px",d.style.boxShadow="0 4px 12px rgba(0,0,0,0.3)",d.style.fontFamily="'Segoe UI', Roboto, sans-serif",d.style.fontSize="14px",r){case"success":d.style.background="#10b981";break;case"error":d.style.background="#ef4444";break;case"warning":d.style.background="#f59e0b";break;default:d.style.background="#3b82f6"}d.textContent=a,document.body.appendChild(d),q(d),setTimeout(()=>{document.body.contains(d)&&(X(d),document.body.removeChild(d))},3e3)}return{showConfirmDialog:t,showGuardDialog:e,saveGuardJSON:i,showNotification:l}}function Dt(t,e,i={}){return nt().showConfirmDialog(t,e,i)}function Wt(t){return nt().showGuardDialog(t)}function Oe(t){return nt().saveGuardJSON(t)}async function Ut({texts:t,...e}){if(s("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let P=document.createElement("link");P.rel="stylesheet",P.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(P),s("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:i,root:l}=ze(),a=document.createElement("style");a.textContent=`
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
    /* Estilo reforzado cuando la pintura est\xE1 activa */
    .btn-stop-running {
      background: #ef4444 !important;
      color: #fff !important;
      box-shadow: 0 0 0 2px rgba(239,68,68,0.35);
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
  `,l.appendChild(a);let r=document.createElement("div");r.className="container",r.innerHTML=`
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
  `,l.appendChild(r);let d=document.createElement("input");d.type="file",d.accept="image/png,image/jpeg",d.style.display="none",l.appendChild(d);let c=document.createElement("input");c.type="file",c.accept=".json",c.style.display="none",l.appendChild(c);let n={header:r.querySelector(".header"),configBtn:r.querySelector(".config-btn"),minimizeBtn:r.querySelector(".minimize-btn"),configPanel:r.querySelector(".config-panel"),pixelsPerBatch:r.querySelector(".pixels-per-batch"),useAllCharges:r.querySelector(".use-all-charges"),paintPattern:r.querySelector(".paint-pattern"),showOverlay:r.querySelector(".show-overlay"),batchValue:r.querySelector(".batch-value"),cooldownValue:r.querySelector(".cooldown-value"),initBtn:r.querySelector(".init-btn"),uploadBtn:r.querySelector(".upload-btn"),loadProgressBtn:r.querySelector(".load-progress-btn"),loadProgressBtnFlow:r.querySelector(".load-progress-btn-flow"),saveProgressBtn:r.querySelectorAll(".save-progress-btn"),guardJsonBtn:r.querySelectorAll(".guard-json-btn"),resizeBtn:r.querySelector(".resize-btn"),selectPosBtn:r.querySelector(".select-pos-btn"),startBtn:r.querySelector(".start-btn"),startBtnUpload:r.querySelector(".start-btn-upload"),stopBtn:r.querySelector(".stop-btn"),stopBtnUpload:r.querySelector(".stop-btn-upload"),statsBtn:r.querySelector(".stats-btn"),logWindowBtn:r.querySelectorAll(".log-window-btn"),progressBar:r.querySelector(".progress-bar"),statsArea:r.querySelector(".stats-area"),status:r.querySelector(".status"),content:r.querySelector(".content")},u={minimized:!1,configVisible:!1},g={width:300,height:"auto",x:20,y:20};function p(){try{let P=localStorage.getItem("wplace-auto-image-window-config");P&&(g={...g,...JSON.parse(P)},x())}catch(P){console.warn("Error cargando configuraci\xF3n de ventana:",P)}}function h(){try{localStorage.setItem("wplace-auto-image-window-config",JSON.stringify(g))}catch(P){console.warn("Error guardando configuraci\xF3n de ventana:",P)}}function x(){r.style.width=typeof g.width=="number"?g.width+"px":g.width,typeof g.height=="number"&&(r.style.height=g.height+"px"),r.style.left=g.x+"px",r.style.top=g.y+"px"}p(),q(r),te(r),w(n.header,r);function w(P,k){let B=0,F=0,K=0,se=0;P.style.cursor="move",P.addEventListener("mousedown",Ce);function Ce(H){H.target.closest(".header-btn, .wplace-header-btn")||(H.preventDefault(),K=H.clientX,se=H.clientY,document.addEventListener("mouseup",rt),document.addEventListener("mousemove",Ee))}function Ee(H){H.preventDefault(),B=K-H.clientX,F=se-H.clientY,K=H.clientX,se=H.clientY;let Kt=k.offsetTop-F,Qt=k.offsetLeft-B,eo=window.innerWidth-k.offsetWidth,to=window.innerHeight-k.offsetHeight,st=Math.max(0,Math.min(eo,Qt)),lt=Math.max(0,Math.min(to,Kt));k.style.top=lt+"px",k.style.left=st+"px",g.x=st,g.y=lt}function rt(){document.removeEventListener("mouseup",rt),document.removeEventListener("mousemove",Ee),h()}}n.minimizeBtn.addEventListener("click",()=>{let P=r.querySelector(".content");P.style.display==="none"?(P.style.display="block",n.minimizeBtn.innerHTML="\u2796",r.style.height="auto",r.style.minHeight="auto"):(P.style.display="none",n.minimizeBtn.innerHTML="\u{1F53C}",r.style.height="auto",r.style.minHeight="auto")}),n.configBtn.addEventListener("click",()=>{u.configVisible=!u.configVisible,u.configVisible?(n.configPanel.classList.add("visible"),n.configBtn.innerHTML="\u274C"):(n.configPanel.classList.remove("visible"),n.configBtn.innerHTML="\u2699\uFE0F")}),n.pixelsPerBatch.addEventListener("change",()=>{let P=parseInt(n.pixelsPerBatch.value)||20;n.batchValue.textContent=P,e.onConfigChange&&e.onConfigChange({pixelsPerBatch:P})}),n.useAllCharges.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({useAllCharges:n.useAllCharges.checked})}),n.paintPattern.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({paintPattern:n.paintPattern.value})});function m(P){r.querySelectorAll("[data-state]").forEach(F=>{F.style.display="none"}),r.querySelectorAll(`[data-state*="${P}"]`).forEach(F=>{F.classList.contains("button-row"),F.style.display="flex"}),s(`\u{1F504} Estado cambiado a: ${P}`)}function b(){}n.initBtn.addEventListener("click",async()=>{n.initBtn.disabled=!0,e.onInitBot&&await e.onInitBot()&&void 0,n.initBtn.disabled=!1}),n.uploadBtn.addEventListener("click",()=>{d.click()}),d.addEventListener("change",async()=>{d.files.length>0&&e.onUploadImage&&await e.onUploadImage(d.files[0])&&(m("upload-image"),e.onResizeImage&&setTimeout(()=>{e.onResizeImage()},500))}),n.loadProgressBtn.addEventListener("click",()=>{c.click()}),c.addEventListener("change",async()=>{c.files.length>0&&e.onLoadProgress&&await e.onLoadProgress(c.files[0])&&m("load-progress")}),n.loadProgressBtnFlow.addEventListener("click",()=>{c.click()}),n.saveProgressBtn.forEach(P=>{P.addEventListener("click",()=>{e.onSaveProgress&&e.onSaveProgress()})}),n.guardJsonBtn.forEach(P=>{P.addEventListener("click",async()=>{try{if(!e.generateGuardJSON){alert("No se puede generar el JSON del Guard en este momento.");return}s("\u{1F6E1}\uFE0F Generando Guard JSON...");let k=await e.generateGuardJSON();if(!k){alert("No hay datos disponibles para guardar.");return}await Oe(k)}catch(k){console.error(k),alert("Error al generar o guardar el Guard JSON")}})}),n.resizeBtn.addEventListener("click",()=>{e.onResizeImage&&e.onResizeImage()});let f=async(P,k)=>{e.onSelectPosition&&(P.disabled=!0,await e.onSelectPosition()&&k&&(k.disabled=!1),P.disabled=!1)};n.selectPosBtn.addEventListener("click",()=>{f(n.selectPosBtn,n.startBtnUpload)}),n.showOverlay.addEventListener("change",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let P=n.showOverlay.checked;window.__WPA_PLAN_OVERLAY__.setEnabled(P)});let y=async(P,k)=>{e.onStartPainting&&($(!0),await e.onStartPainting()||$(!1))},E=async(P,k)=>{e.onStopPainting&&await e.onStopPainting()&&$(!1)};n.startBtn.addEventListener("click",()=>{y(n.startBtn,n.stopBtn)}),n.stopBtn.addEventListener("click",()=>{E(n.startBtn,n.stopBtn)}),n.startBtnUpload.addEventListener("click",()=>{y(n.startBtnUpload,n.stopBtnUpload)}),n.stopBtnUpload.addEventListener("click",()=>{E(n.startBtnUpload,n.stopBtnUpload)});let S=null,v=null;n.logWindowBtn.forEach(P=>{P.addEventListener("click",()=>{S?S.toggle():(S=it("image"),S.show())})}),n.statsBtn.addEventListener("click",()=>{v?v.toggle():(v=Nt(),v.setRefreshCallback(()=>{e.onRefreshStats&&e.onRefreshStats()}),v.show())});function C(P,k="default"){n.status.textContent=P,n.status.className=`status status-${k}`,n.status.style.animation="none",n.status.offsetWidth,n.status.style.animation="slideIn 0.3s ease-out"}function L(P,k,B=null){let F=k>0?P/k*100:0;n.progressBar.style.width=`${F}%`;let K=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${t.progress}</div>
        <div>${P}/${k} (${F.toFixed(1)}%)</div>
      </div>
    `;if(B&&(B.username&&(K+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} ${t.userName}</div>
            <div>${B.username}</div>
          </div>
        `),B.charges!==void 0&&(K+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${t.charges}</div>
            <div>${Math.floor(B.charges)}</div>
          </div>
        `),B.pixels!==void 0&&(K+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${t.pixels}</div>
            <div>${B.pixels.toLocaleString()}</div>
          </div>
        `),B.estimatedTime!==void 0&&B.estimatedTime>0)){let se=Math.floor(B.estimatedTime/3600),Ce=Math.floor(B.estimatedTime%3600/60),Ee=se>0?`${se}h ${Ce}m`:`${Ce}m`;K+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${t.timeRemaining}</div>
            <div>${Ee}</div>
          </div>
        `}n.statsArea.innerHTML=K}function A(P){if(P>0){let k=Math.floor(P/60),B=P%60,F=k>0?`${k}m ${B}s`:`${B}s`;n.cooldownValue.textContent=F}else n.cooldownValue.textContent="--"}function _(P){P&&P.includes("\u23F3")?(n.status.textContent=P,n.status.className="status status-info"):P&&C(P,"info")}function I(P){P?(n.initBtn.disabled=!0,n.initBtn.style.opacity="0.6",n.initBtn.innerHTML=`\u2705 <span>${t.initBot} - Completado</span>`):(n.initBtn.disabled=!1,n.initBtn.style.opacity="1",n.initBtn.innerHTML=`\u{1F916} <span>${t.initBot}</span>`)}function R(P){n.initBtn.style.display=P?"flex":"none"}function O(){m("initial"),r.querySelectorAll("button").forEach(k=>{k.disabled=!1})}function z(){S&&S.destroy(),v&&v.destroy(),X(r),i.remove()}function G(P){v&&v.isVisible()&&(P.userInfo&&v.updateUserStats(P.userInfo),P.imageInfo&&v.updateImageStats(P.imageInfo),P.availableColors&&v.updateColorsStats(P.availableColors))}function $(P){n.startBtn.disabled=P,n.startBtnUpload.disabled=P,n.stopBtn.disabled=!P,n.stopBtnUpload.disabled=!P,P?(n.stopBtn.classList.add("btn-stop-running"),n.stopBtnUpload.classList.add("btn-stop-running")):(n.stopBtn.classList.remove("btn-stop-running"),n.stopBtnUpload.classList.remove("btn-stop-running")),n.loadProgressBtn.disabled=P}function Z(){Promise.resolve().then(()=>(me(),Ct)).then(({imageState:P})=>{n.useAllCharges&&(n.useAllCharges.checked=P.useAllChargesFirst),n.paintPattern&&P.paintPattern&&(n.paintPattern.value=P.paintPattern),n.showOverlay&&P.showOverlay!==void 0&&(n.showOverlay.checked=P.showOverlay),s("\u2705 Interfaz actualizada con valores del estado cargado")}).catch(P=>{s("\u26A0\uFE0F Error actualizando interfaz desde estado:",P)})}let N=Ft();return N.initialize(l),s("\u2705 Interfaz de Auto-Image creada"),m("initial"),{setStatus:C,updateProgress:L,updateCooldownDisplay:A,updateCooldownMessage:_,setInitialized:I,setInitButtonVisible:R,enableButtonsAfterInit:b,setState:m,resetToInitialState:O,showResizeDialog:P=>{N.showResizeDialog(P,{getAvailableColors:e.getAvailableColors,onColorSelectionChange:e.onColorSelectionChange,onConfirmResize:e.onConfirmResize})},closeResizeDialog:()=>{N.closeResizeDialog()},updateStatsWindow:G,setPaintingState:$,updateUIFromState:Z,destroy:z,generateGuardJSON:e.generateGuardJSON,elements:n}}Ae();function Fe(t=!1){let e=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let a of e){let r=document.querySelector(a);if(r&&r.offsetParent!==null)return t&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por selector: ${a}`),!0}let i=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),l=0;for(let a of i)if(a.offsetParent!==null&&a.offsetWidth>10&&a.offsetHeight>10&&(l++,l>=5))return t&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por colores visibles: ${l}`),!0;return t&&console.log(`[WPA-UI] \u{1F50D} Paleta no detectada. Colores visibles: ${l}`),!1}function No(t=!1,e=!1){let i=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(i){let a=i.textContent.toLowerCase(),r=a.includes("paint")||a.includes("pintar"),d=i.querySelector('svg path[d*="240-120"]')||i.querySelector('svg path[d*="M15"]');if(r||d)return t&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por selector espec\xEDfico: "${a}"`),i.click(),e&&setTimeout(()=>{t&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),i.click()},500),!0}let l=document.querySelectorAll("button");for(let a of l){let r=a.textContent.toLowerCase();if((r.includes("paint")||r.includes("pintar"))&&a.offsetParent!==null&&!a.disabled)return t&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por texto: "${a.textContent.trim()}"`),a.click(),e&&setTimeout(()=>{t&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),a.click()},500),!0}return t&&console.log("[WPA-UI] \u274C Bot\xF3n Paint no encontrado"),!1}async function De(t=3,e=!0){e&&console.log(`[WPA-UI] \u{1F916} Iniciando auto-click del bot\xF3n Paint (m\xE1ximo ${t} intentos)`);for(let i=1;i<=t;i++){if(e&&console.log(`[WPA-UI] \u{1F3AF} Intento ${i}/${t} - Buscando bot\xF3n Paint...`),Fe())return e&&console.log("[WPA-UI] \u2705 Paleta ya est\xE1 abierta, auto-click completado"),!0;if(No(e,!1)){if(e&&console.log("[WPA-UI] \u{1F446} Clic en bot\xF3n Paint realizado (sin segundo clic)"),await new Promise(l=>setTimeout(l,1500)),Fe())return e&&console.log(`[WPA-UI] \u2705 Paleta abierta exitosamente despu\xE9s del intento ${i}`),!0;e&&console.log(`[WPA-UI] \u26A0\uFE0F Paleta no detectada tras el clic en intento ${i}. Reintentar\xE1.`)}else e&&console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado para clic en intento ${i}`);i<t&&await new Promise(l=>setTimeout(l,1e3))}return e&&console.log(`[WPA-UI] \u274C Auto-click fall\xF3 despu\xE9s de ${t} intentos`),!1}(()=>{let e={enabled:!1,templates:[],templatesShouldBeDrawn:!0,tileSize:1e3,drawMult:3,pixelPlan:null,nextBatchCount:0,anchor:null,imageWidth:null,imageHeight:null,originalFetch:null,fetchedBlobQueue:new Map,isIntercepting:!1};function i(){}function l(){e.isIntercepting||(e.originalFetch=window.fetch,e.isIntercepting=!0,window.fetch=async function(...m){var S;let b=await e.originalFetch.apply(this,m),f=b.clone(),y=(m[0]instanceof Request?(S=m[0])==null?void 0:S.url:m[0])||"ignore";if((f.headers.get("content-type")||"").includes("image/")&&y.includes("/tiles/")&&!y.includes("openfreemap")&&!y.includes("maps"))try{let v=await f.blob(),C=await r(v,y);return new Response(C,{headers:f.headers,status:f.status,statusText:f.statusText})}catch(v){return console.error("[PLAN OVERLAY] Error processing tile:",v),b}return b})}function a(){!e.isIntercepting||!e.originalFetch||(window.fetch=e.originalFetch,e.isIntercepting=!1)}async function r(m,b){if(!e.enabled||!e.templatesShouldBeDrawn||!e.pixelPlan)return m;let f=b.split("/"),y=parseInt(f[f.length-1].replace(".png","")),E=parseInt(f[f.length-2]);if(isNaN(E)||isNaN(y))return console.warn("[PLAN OVERLAY] Could not extract tile coordinates from URL:",b),m;let S=d(E,y);if(S.length===0)return m;let v=e.tileSize*e.drawMult,C=await createImageBitmap(m),L=new OffscreenCanvas(v,v),A=L.getContext("2d");return A.imageSmoothingEnabled=!1,A.clearRect(0,0,v,v),A.drawImage(C,0,0,v,v),c(A,S,E,y),await L.convertToBlob({type:"image/png"})}function d(m,b){return!e.pixelPlan||!e.pixelPlan.pixels?[]:e.pixelPlan.pixels.filter(f=>{let y=Math.floor(f.globalX/3e3),E=Math.floor(f.globalY/3e3);return y===m&&E===b})}function c(m,b,f,y){let E=f*3e3,S=y*3e3;m.globalAlpha=.7;for(let v of b){let C=(v.globalX-E)*e.drawMult+1,L=(v.globalY-S)*e.drawMult+1;C>=0&&C<e.tileSize*e.drawMult&&L>=0&&L<e.tileSize*e.drawMult&&(m.fillStyle=`rgb(${v.r},${v.g},${v.b})`,m.fillRect(C,L,1,1))}if(e.nextBatchCount>0){m.globalAlpha=1;let v=b.slice(0,e.nextBatchCount);for(let C of v){let L=(C.globalX-E)*e.drawMult+1,A=(C.globalY-S)*e.drawMult+1;L>=0&&L<e.tileSize*e.drawMult&&A>=0&&A<e.tileSize*e.drawMult&&(m.fillStyle=`rgb(${C.r},${C.g},${C.b})`,m.fillRect(L,A,1,1))}}}function n(m){e.enabled=!!m,e.enabled?l():a()}function u(m,b={}){var y,E,S;if(!m||m.length===0){e.pixelPlan=null;return}let f=[];for(let v of m){let C,L;if(typeof v.tileX=="number"&&typeof v.localX=="number")C=v.tileX*3e3+v.localX,L=v.tileY*3e3+v.localY;else if(b.anchor&&typeof v.imageX=="number"){let A=b.anchor.tileX*3e3+(b.anchor.pxX||0),_=b.anchor.tileY*3e3+(b.anchor.pxY||0);C=A+v.imageX,L=_+v.imageY}else continue;f.push({globalX:C,globalY:L,r:((y=v.color)==null?void 0:y.r)||0,g:((E=v.color)==null?void 0:E.g)||0,b:((S=v.color)==null?void 0:S.b)||0})}e.pixelPlan={pixels:f},e.nextBatchCount=b.nextBatchCount||0,e.anchor=b.anchor||null,e.imageWidth=b.imageWidth||null,e.imageHeight=b.imageHeight||null,typeof b.enabled=="boolean"&&n(b.enabled)}function g(m){e.nextBatchCount=Math.max(0,Number(m||0))}function p(m){e.anchor=m}function h(){}function x(){}function w(){a(),e.pixelPlan=null,e.fetchedBlobQueue.clear()}window.__WPA_PLAN_OVERLAY__={injectStyles:i,setEnabled:n,setPlan:u,setPlanItemsFromTileList:u,setNextBatchCount:g,setAnchor:p,setAnchorCss:h,endSelectionMode:x,render:()=>{},cleanup:w,get state(){return e}}})();var Yt=Object.freeze({ENABLED:!0,BASE_URL:"https://metricswplaceapi.alarisco.xyz",API_KEY:"wplace_2c8e4b2b1e0a4f7cb9d3a76f4a1c0b6f",PUBLIC_SALT:"wplace_public_salt_2024",VARIANT:"auto-guard",TIMEOUT_MS:1e4,RETRIES:1,PING_INTERVAL_MS:12e4});function Oo(){var t;try{if(typeof window=="undefined"||!globalThis.URLSearchParams)return{};let e=new globalThis.URLSearchParams(((t=globalThis.location)==null?void 0:t.search)||""),i=e.get("metricsEnabled"),l=e.get("metricsUrl"),a=e.get("metricsKey"),r=e.get("metricsSalt"),d=e.get("metricsVariant"),c=e.get("metricsTimeoutMs"),n=e.get("metricsRetries"),u=e.get("metricsPingMs"),g={};return i!=null&&(g.ENABLED=i==="true"||i==="1"),l&&(g.BASE_URL=l),a&&(g.API_KEY=a),r&&(g.PUBLIC_SALT=r),d&&(g.VARIANT=d),c&&!Number.isNaN(Number(c))&&(g.TIMEOUT_MS=Number(c)),n&&!Number.isNaN(Number(n))&&(g.RETRIES=Number(n)),u&&!Number.isNaN(Number(u))&&(g.PING_INTERVAL_MS=Number(u)),g}catch{return{}}}function Fo(){var i;let t=typeof window!="undefined"&&(window.__WPLACE_METRICS__||((i=window.__WPLACE_CONFIG__)==null?void 0:i.metrics))||{},e={};return typeof t.ENABLED=="boolean"&&(e.ENABLED=t.ENABLED),typeof t.BASE_URL=="string"&&(e.BASE_URL=t.BASE_URL),typeof t.API_KEY=="string"&&(e.API_KEY=t.API_KEY),typeof t.PUBLIC_SALT=="string"&&(e.PUBLIC_SALT=t.PUBLIC_SALT),typeof t.VARIANT=="string"&&(e.VARIANT=t.VARIANT),Number.isFinite(t.TIMEOUT_MS)&&(e.TIMEOUT_MS=t.TIMEOUT_MS),Number.isFinite(t.RETRIES)&&(e.RETRIES=t.RETRIES),Number.isFinite(t.PING_INTERVAL_MS)&&(e.PING_INTERVAL_MS=t.PING_INTERVAL_MS),e}function Do(t){let e={...t};return typeof e.BASE_URL=="string"&&(e.BASE_URL=e.BASE_URL.replace(/\/$/,"")),["auto-guard","auto-farm","auto-image","launcher"].includes(e.VARIANT)||(e.VARIANT=Yt.VARIANT),e}var at=null;function oe(t={}){let e={...Yt,...Fo(),...Oo(),...t};return at=Do(e),at}async function Wo(t){let e=globalThis.TextEncoder,i=globalThis.crypto;if(!e||!(i!=null&&i.subtle))throw new Error("WebCrypto no disponible");let l=new e,a=await i.subtle.digest("SHA-256",l.encode(t));return Array.from(new Uint8Array(a)).map(r=>r.toString(16).padStart(2,"0")).join("")}async function qt(t,e){let i=at||oe(),l=typeof e=="string"?e:i.PUBLIC_SALT;return!l||!t?null:Wo(String(l)+String(t))}function Xt(){var t,e,i;try{if(typeof window=="undefined")return null;if((t=window.__WPLACE_METRICS__)!=null&&t.anonId)return String(window.__WPLACE_METRICS__.anonId);let l="wplace_metrics_aid",a=null;try{a=localStorage.getItem(l)}catch{}if(a&&typeof a=="string")return a;let r=new Uint8Array(16);(i=(e=globalThis.crypto||{}).getRandomValues)==null||i.call(e,r);let d=Array.from(r).map(c=>c.toString(16).padStart(2,"0")).join("");try{localStorage.setItem(l,d)}catch{}return window.__WPLACE_METRICS__||(window.__WPLACE_METRICS__={}),window.__WPLACE_METRICS__.anonId=d,d}catch{return null}}M();async function Uo(t,e,{timeout:i,apiKey:l}){let a={"Content-Type":"application/json"};return l&&(a["X-API-Key"]=l),await qe(t,{method:"POST",headers:a,body:JSON.stringify(e),timeout:i})}function Gt(t){return t.text().then(e=>{try{return e?JSON.parse(e):{}}catch{return{}}})}async function Yo(t,e){let i=oe(e);if(!i.ENABLED)return{ok:!1,skipped:!0};let l=`${i.BASE_URL}/v1/events`,a=0,r=null;for(;a<=i.RETRIES;)try{let d=await Uo(l,t,{timeout:i.TIMEOUT_MS,apiKey:i.API_KEY});if(!d.ok){let n=await Gt(d);return{ok:!1,status:d.status,data:n}}let c=await Gt(d);try{let n=t==null?void 0:t.event_type,u=t==null?void 0:t.bot_variant;n==="session_start"&&s(`[METRICS] session_start (${u})`)}catch{}return{ok:!0,data:c}}catch(d){if(r=d,a++,a>i.RETRIES)break;await new Promise(c=>setTimeout(c,300*a))}return{ok:!1,error:(r==null?void 0:r.message)||String(r)}}async function ve({botVariant:t,eventType:e,pixelDelta:i,timestamp:l,metadata:a}={},r){let d=oe(r);if(!d.ENABLED)return{ok:!1,skipped:!0};let c={};c.bot_variant=t||d.VARIANT,c.event_type=e,typeof i=="number"&&(c.pixel_delta=i),l&&(c.timestamp=l),a&&typeof a=="object"&&(c.event_metadata=a);let n=Xt();if(n){let u=await qt(n);u&&(c.user_hash=await u)}return Yo(c,r)}async function Ht({botVariant:t,metadata:e}={},i){return ve({botVariant:t,eventType:"session_start",metadata:e},i)}async function We({botVariant:t,metadata:e}={},i){return ve({botVariant:t,eventType:"session_ping",metadata:e},i)}async function jt({botVariant:t,metadata:e}={},i){return ve({botVariant:t,eventType:"session_end",metadata:e},i)}async function Vt(t,{botVariant:e,metadata:i}={},l){let a={message:t,...i||{}};return ve({botVariant:e,eventType:"error",metadata:a},l)}async function Jt(t,{botVariant:e,metadata:i}={},l){return!Number.isFinite(t)||t<=0?{ok:!1,skipped:!0}:ve({botVariant:e,eventType:"pixel_painted",pixelDelta:Math.trunc(t),metadata:i},l)}async function Zt(){console.log("[WPA-Image] \u{1F680} runImage() iniciado"),s("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),console.log("[WPA-Image] \u{1F30D} Inicializando sistema de idiomas"),Ue(),console.log("[WPA-Image] \u2705 Sistema de idiomas inicializado"),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0},console.log("[WPA-Image] \u{1F527} Estado global actualizado");let t=null,e=window.fetch,i=()=>{let l=window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.state&&window.__WPA_PLAN_OVERLAY__.state.enabled;window.fetch!==e&&!l?(window.fetch=e,s("\u{1F504} Fetch original restaurado")):l&&s("\u{1F504} Fetch NO restaurado - overlay activo"),o.positionTimeoutId&&(clearTimeout(o.positionTimeoutId),o.positionTimeoutId=null),o.cleanupObserver&&(o.cleanupObserver(),o.cleanupObserver=null),o.selectingPosition=!1};try{try{let g=oe({VARIANT:"auto-image"});if(g.ENABLED){window.__wplaceMetrics||(window.__wplaceMetrics={}),s(`[METRICS] enabled \u2192 ${g.BASE_URL}`),window.__wplaceMetrics.imageSessionActive=!0,Ht({botVariant:"auto-image"});let p=Math.max(6e4,g.PING_INTERVAL_MS||3e5);window.__wplaceMetrics.imagePingInterval=window.setInterval(()=>We({botVariant:"auto-image"}),p)}}catch{}let l={...Q},a=Le("image");if(o.language=vt(),!l.SITEKEY){let g=document.querySelector("*[data-sitekey]");g?(l.SITEKEY=g.getAttribute("data-sitekey"),s(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${l.SITEKEY.substring(0,20)}...`)):s("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function r(){return s("\u{1F916} Intentando auto-inicio..."),Fe()?(s("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(s("\u{1F50D} Paleta no encontrada, iniciando auto-click del bot\xF3n Paint..."),await De(3,!0)?(s("\u2705 Auto-click exitoso, paleta abierta"),!0):(s("\u274C Auto-click fall\xF3, requerir\xE1 inicio manual"),!1))}async function d(g=!1){s("\u{1F916} Inicializando Auto-Image..."),n.setStatus(T("image.checkingColors"),"info");let p=he();if(p.length===0)return n.setStatus(T("image.noColorsFound"),"error"),!1;let h=await ue(),x=null;h.success&&h.data.user?(x={username:h.data.user.name||"An\xF3nimo",charges:h.data.charges,maxCharges:h.data.maxCharges,pixels:h.data.user.pixelsPainted||0},t=x,o.currentCharges=h.data.charges,o.maxCharges=h.data.maxCharges||9999,s(`\u{1F464} Usuario conectado: ${h.data.user.name||"An\xF3nimo"} - Cargas: ${x.charges}/${x.maxCharges} - P\xEDxeles: ${x.pixels}`)):s("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),o.availableColors=p,o.colorsChecked=!0,n.setStatus(T("image.colorsFound",{count:p.length}),"success"),n.updateProgress(0,0,x),g||s(`\u2705 ${p.length} colores disponibles detectados`),n.setInitialized(!0),n.enableButtonsAfterInit();try{}catch{}return!0}let c=0,n=await Ut({texts:a,onConfigChange:g=>{g.pixelsPerBatch!==void 0&&(o.pixelsPerBatch=g.pixelsPerBatch),g.useAllCharges!==void 0&&(o.useAllChargesFirst=g.useAllCharges),g.paintPattern!==void 0&&(o.paintPattern=g.paintPattern,s(`\u{1F3A8} Patr\xF3n de pintado cambiado a: ${g.paintPattern}`),o.remainingPixels&&o.remainingPixels.length>0&&Promise.resolve().then(()=>(Re(),Ze)).then(({applyPaintPattern:p})=>{o.remainingPixels=p(o.remainingPixels,g.paintPattern,o.imageData);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{enabled:!0,nextBatchCount:o.pixelsPerBatch}),s(`\u2705 Overlay actualizado con nuevo patr\xF3n: ${g.paintPattern}`))}catch(h){s("\u26A0\uFE0F Error actualizando overlay con nuevo patr\xF3n:",h)}}).catch(p=>{s("\u274C Error aplicando nuevo patr\xF3n:",p)})),s("Configuraci\xF3n actualizada:",g)},onInitBot:d,onUploadImage:async g=>{try{n.setStatus(T("image.loadingImage"),"info");let p=window.URL.createObjectURL(g),h=new Te(p);h.originalName=g.name,await h.load();let x=h.initializeColorPalette();o.availableColors=x;let w=await h.analyzePixels();h.setCoords(0,0,0,0);let m=h.getImageData();o.imageData=m,o.imageData.processor=h,o.totalPixels=w.requiredPixels,o.paintedPixels=0,o.originalImageName=g.name,o.imageLoaded=!0,n.setStatus(T("image.imageLoaded",{count:w.requiredPixels}),"success"),n.updateProgress(0,w.requiredPixels,t),s(`\u2705 [BLUE MARBLE] Imagen cargada: ${m.width}x${m.height}, ${w.requiredPixels} p\xEDxeles v\xE1lidos`),s(`\u2705 [BLUE MARBLE] An\xE1lisis: ${w.uniqueColors} colores \xFAnicos, ${w.defacePixels} p\xEDxeles #deface`),window.URL.revokeObjectURL(p);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),s("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(b){s("\u26A0\uFE0F Error activando plan overlay:",b)}return!0}catch(p){return n.setStatus(T("image.imageError"),"error"),s("\u274C Error cargando imagen:",p),!1}},onSelectPosition:async()=>new Promise(g=>{n.setStatus(T("image.selectPositionAlert"),"info"),n.setStatus(T("image.waitingPosition"),"info"),o.selectingPosition=!0;let p=!1,h=()=>{window.fetch=async(m,b)=>{if(o.selectingPosition&&!p&&typeof m=="string"&&m.includes("/s0/pixel/")&&b&&b.method==="POST")try{s(`\u{1F3AF} Interceptando request de pintado: ${m}`);let f=await e(m,b);if(f.ok&&b.body){let y;try{y=JSON.parse(b.body)}catch(E){return s("Error parseando body del request:",E),f}if(y.coords&&Array.isArray(y.coords)&&y.coords.length>=2){let E=y.coords[0],S=y.coords[1],v=m.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(v&&!p){p=!0;let C=parseInt(v[1]),L=parseInt(v[2]);if(o.tileX=C,o.tileY=L,o.startPosition={x:E,y:S},o.selectingPosition=!1,o.imageData&&o.imageData.processor){let A=o.imageData.processor;A.setCoords(C,L,E,S);try{await A.createTemplateTiles(),s(`\u2705 [BLUE MARBLE] Template tiles creados para posici\xF3n tile(${C},${L}) pixel(${E},${S})`)}catch(I){s(`\u274C [BLUE MARBLE] Error creando template tiles: ${I.message}`)}let _=A.generatePixelQueue();o.remainingPixels=_,(!o.totalPixels||o.totalPixels===0)&&(o.totalPixels=_.length),s(`\u2705 Cola de p\xEDxeles generada: ${_.length} p\xEDxeles para overlay`)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setEnabled(!1),window.__WPA_PLAN_OVERLAY__.setPlan([],{}),window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:C,tileY:L,pxX:E,pxY:S}),o.remainingPixels&&o.remainingPixels.length>0?(window.__WPA_PLAN_OVERLAY__.setPlan(o.remainingPixels,{anchor:{tileX:C,tileY:L,pxX:E,pxY:S},imageWidth:o.imageData.width,imageHeight:o.imageData.height,enabled:!0}),s(`\u2705 Plan overlay reiniciado y anclado en tile(${C},${L}) local(${E},${S})`)):s("\u26A0\uFE0F No hay p\xEDxeles para mostrar en overlay"))}catch(A){s(`\u274C Error configurando overlay: ${A.message}`)}i(),n.setStatus(T("image.positionSet"),"success"),s(`\u2705 Posici\xF3n establecida: tile(${o.tileX},${o.tileY}) local(${E},${S})`),setTimeout(async()=>{try{if(s("\u{1F6E1}\uFE0F Mostrando di\xE1logo de Auto-Guard..."),await Wt(o)){s("\u2705 Usuario acept\xF3 generar JSON para Auto-Guard");let _=null;if(typeof n.generateGuardJSON=="function")_=n.generateGuardJSON();else throw new Error("generateGuardJSON no est\xE1 disponible en la UI");await Oe(_)}else s("\u2139\uFE0F Usuario decidi\xF3 no generar JSON para Auto-Guard")}catch(A){s("\u274C Error mostrando di\xE1logo de Auto-Guard:",A)}},1e3),g(!0)}else s("\u26A0\uFE0F No se pudo extraer tile de la URL:",m)}}return f}catch(f){if(s("\u274C Error interceptando pixel:",f),!p)return i(),e(m,b)}return e(m,b)}},x=()=>{let m=document.querySelectorAll("canvas");if(m.length===0){s("\u26A0\uFE0F No se encontraron elementos canvas");return}s(`\u{1F4CA} Configurando observer para ${m.length} canvas`);let b=f=>{var E;if(!o.selectingPosition||p)return;let y=f.target;if(y&&y.tagName==="CANVAS"){s("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let v=(((E=document.querySelector("canvas"))==null?void 0:E.parentElement)||document.body).getBoundingClientRect(),C=f.clientX-v.left,L=f.clientY-v.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(C,L),s(`Plan overlay: ancla CSS establecida en (${C}, ${L})`))}catch(S){s("Plan Overlay: error calculando ancla CSS",S)}setTimeout(()=>{!p&&o.selectingPosition&&s("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",b),o.cleanupObserver=()=>{document.removeEventListener("click",b)}};h(),x();let w=setTimeout(()=>{o.selectingPosition&&!p&&(i(),o.cleanupObserver&&o.cleanupObserver(),n.setStatus(T("image.positionTimeout"),"error"),s("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),g(!1))},12e4);o.positionTimeoutId=w}),onStartPainting:async()=>{var g;if(s("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:o.imageLoaded,startPosition:o.startPosition,tileX:o.tileX,tileY:o.tileY,totalPixels:o.totalPixels,remainingPixels:((g=o.remainingPixels)==null?void 0:g.length)||0}),!o.imageLoaded||!o.startPosition)return n.setStatus(T("image.missingRequirements"),"error"),s(`\u274C Validaci\xF3n fallida: imageLoaded=${o.imageLoaded}, startPosition=${!!o.startPosition}`),!1;o.running=!0,o.stopFlag=!1,o.isFirstBatch=o.useAllChargesFirst,s(`\u{1F680} Iniciando pintado - isFirstBatch: ${o.isFirstBatch}, useAllChargesFirst: ${o.useAllChargesFirst}`),n.setStatus(T("image.startPaintingMsg"),"success");try{return await Rt(o.imageData,o.startPosition,(p,h,x,w)=>{t&&(t.charges=Math.floor(o.currentCharges),w!==void 0&&(t.estimatedTime=w)),n.updateProgress(p,h,t);try{let m=Math.max(0,Math.trunc(p)-Math.trunc(c));m>0&&(Jt(m,{botVariant:"auto-image"}),c=Math.trunc(p))}catch{}o.inCooldown&&o.nextBatchCooldown>0?n.updateCooldownDisplay(o.nextBatchCooldown):n.updateCooldownDisplay(0),x?x.includes("\u23F3")&&o.inCooldown?n.updateCooldownMessage(x):n.setStatus(x,"info"):n.setStatus(T("image.paintingProgress",{painted:p,total:h}),"info")},(p,h)=>{p?(n.setStatus(T("image.paintingComplete",{count:h}),"success"),zt()):n.setStatus(T("image.paintingStopped"),"warning"),o.running=!1,c=0},p=>{n.setStatus(T("image.paintingError"),"error"),s("\u274C Error en proceso de pintado:",p);try{Vt(String((p==null?void 0:p.message)||p),{botVariant:"auto-image"})}catch{}o.running=!1}),!0}catch(p){return n.setStatus(T("image.paintingError"),"error"),s("\u274C Error iniciando pintado:",p),o.running=!1,!1}},onStopPainting:async()=>{if(Mt().hasProgress){let p=await Dt(T("image.confirmSaveProgress"),T("image.saveProgressTitle"),{save:T("image.saveProgress"),discard:T("image.discardProgress"),cancel:T("image.cancel")});if(p==="save"){let h=tt();h.success?n.setStatus(T("image.progressSaved",{filename:h.filename}),"success"):n.setStatus(T("image.progressSaveError",{error:h.error}),"error")}else if(p==="cancel")return!1}return et(),n.setStatus(T("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let g=tt();return g.success?n.setStatus(T("image.progressSaved",{filename:g.filename}),"success"):n.setStatus(T("image.progressSaveError",{error:g.error}),"error"),g.success},onLoadProgress:async g=>{try{let p=await $t(g);return p.success?(n.setStatus(T("image.progressLoaded",{painted:p.painted,total:p.total}),"success"),n.updateProgress(p.painted,p.total,t),n.updateUIFromState(),s("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(n.setStatus(T("image.progressLoadError",{error:p.error}),"error"),!1)}catch(p){return n.setStatus(T("image.progressLoadError",{error:p.message}),"error"),!1}},onResizeImage:()=>{o.imageLoaded&&o.imageData&&o.imageData.processor&&n.showResizeDialog(o.imageData.processor)},onConfirmResize:async(g,p,h,x)=>{s(`\u{1F504} Redimensionando imagen de ${g.getDimensions().width}x${g.getDimensions().height} a ${p}x${h}`),s(`\u{1F3A8} Colores seleccionados: ${x?x.length:"todos"}`);try{if(await g.resize(p,h),x&&x.length>0){let m=o.availableColors.filter(b=>x.includes(b.id));g.setSelectedColors(m),s(`\u{1F3A8} Paleta actualizada con ${x.length} colores seleccionados`)}let w=await g.analyzePixels();o.imageData={processor:g,width:p,height:h,validPixelCount:w.requiredPixels,requiredPixels:w.requiredPixels,totalPixels:w.totalPixels},o.totalPixels=w.requiredPixels,o.paintedPixels=0,o.remainingPixels=[],o.lastPosition={x:0,y:0},n.updateProgress(0,w.requiredPixels,t),n.setStatus(T("image.resizeSuccess",{width:p,height:h}),"success"),s(`\u2705 Imagen redimensionada: ${w.requiredPixels} p\xEDxeles v\xE1lidos de ${w.totalPixels} totales`),o.startPosition&&o.tileX!=null&&o.tileY!=null?s("\u{1F4CD} Manteniendo posici\xF3n previamente seleccionada tras el redimensionado"):s("\u2139\uFE0F No hay posici\xF3n previa establecida; podr\xE1s seleccionar una cuando lo desees");try{if(window.__WPA_PLAN_OVERLAY__&&o.startPosition&&o.tileX!=null&&o.tileY!=null){await g.createTemplateTiles();let m=g.generatePixelQueue();o.remainingPixels=m,window.__WPA_PLAN_OVERLAY__.setPlan(m,{anchor:{tileX:o.tileX,tileY:o.tileY,pxX:o.startPosition.x,pxY:o.startPosition.y},imageWidth:p,imageHeight:h,enabled:!0}),s(`\u2705 Overlay actualizado con ${m.length} p\xEDxeles despu\xE9s del resize`)}}catch(m){s(`\u26A0\uFE0F Error actualizando overlay despu\xE9s del resize: ${m.message}`)}}catch(w){s(`\u274C Error redimensionando imagen: ${w.message}`),n.setStatus(T("image.imageError"),"error")}},onRefreshStats:async()=>{var g;s("\u{1F504} Actualizando estad\xEDsticas...");try{let p=await ue(),h=null;p.success&&p.data.user&&(h={username:p.data.user.name||"An\xF3nimo",charges:p.data.charges,maxCharges:p.data.maxCharges,pixels:p.data.user.pixelsPainted||0,cooldown:p.data.cooldown||0},t=h,o.currentCharges=p.data.charges,o.maxCharges=p.data.maxCharges||9999);let x=he();x.length>0&&(o.availableColors=x,o.colorsChecked=!0);let w=null;o.imageLoaded&&(w={loaded:!0,totalPixels:o.totalPixels,paintedPixels:o.paintedPixels,estimatedTime:o.estimatedTime,originalName:o.originalImageName}),n.updateStatsWindow({userInfo:h,imageInfo:w,availableColors:x.length>0?x:o.availableColors}),n.updateProgress(o.paintedPixels,o.totalPixels,h),s(`\u2705 Estad\xEDsticas actualizadas: ${x.length>0?x.length:((g=o.availableColors)==null?void 0:g.length)||0} colores disponibles`)}catch(p){s("\u274C Error actualizando estad\xEDsticas:",p)}},getAvailableColors:()=>o.availableColors||[],onColorSelectionChange:g=>{s(`\u{1F3A8} Selecci\xF3n de colores cambiada: ${g.length} colores seleccionados`)},generateGuardJSON:()=>{if(!o.imageLoaded||!o.imageData||!o.startPosition||o.tileX==null||o.tileY==null)throw new Error("Datos insuficientes para generar JSON del Guard. Aseg\xFArate de haber cargado una imagen y seleccionado una posici\xF3n.");let g=o.imageData.processor;if(!g)throw new Error("Procesador de imagen no disponible.");let{width:p,height:h}=o.imageData,{x,y:w}=o.startPosition,{tileX:m,tileY:b}=o,f=m*1e3+x,y=b*1e3+w,E=f+p-1,S=y+h-1,v=g.generatePixelQueue(),C=[],L=I=>(I%1e3+1e3)%1e3,A=I=>{if(I&&typeof I.id!="undefined")return I.id;let O=(o.availableColors||[]).find(z=>z.r===I.r&&z.g===I.g&&z.b===I.b);return O?O.id:void 0};v&&v.length>0&&v.forEach(I=>{let R=typeof I.globalX=="number"?I.globalX:m*1e3+x+I.imageX,O=typeof I.globalY=="number"?I.globalY:b*1e3+w+I.imageY,z=`${R},${O}`,G=typeof I.tileX=="number"?I.tileX:Math.floor(R/1e3),$=typeof I.tileY=="number"?I.tileY:Math.floor(O/1e3),Z=typeof I.localX=="number"?I.localX:L(R),N=typeof I.localY=="number"?I.localY:L(O),P=I.color||I.targetColor||{},k=A(P);C.push({key:z,r:P.r,g:P.g,b:P.b,colorId:typeof k!="undefined"?k:null,globalX:R,globalY:O,localX:Z,localY:N,tileX:G,tileY:$})});let _={version:"1.0",timestamp:Date.now(),protectionData:{area:{x1:f,y1:y,x2:E,y2:S},protectedPixels:C.length,splitInfo:null},progress:{totalRepaired:0,lastCheck:Date.now()},config:{maxProtectionSize:1e5,pixelsPerBatch:50,checkInterval:1e4},colors:(o.availableColors||[]).map(I=>({id:I.id,r:I.r,g:I.g,b:I.b})),originalPixels:C};return s(`\u2705 JSON del Guard generado: \xE1rea (${f},${y}) a (${E},${S}), ${C.length} p\xEDxeles de ${(v==null?void 0:v.length)||0} totales`),_}}),u=g=>{let{language:p}=g.detail;s(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${p}`),o.language=p};window.addEventListener("launcherLanguageChanged",u),window.addEventListener("languageChanged",u),window.addEventListener("beforeunload",()=>{var g,p,h,x;i(),et(),n.destroy(),window.removeEventListener("launcherLanguageChanged",u),window.removeEventListener("languageChanged",u),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1);try{oe().ENABLED&&((g=window.__wplaceMetrics)!=null&&g.imageSessionActive)&&(jt({botVariant:"auto-image"}),window.__wplaceMetrics.imageSessionActive=!1),(p=window.__wplaceMetrics)!=null&&p.imagePingInterval&&(window.clearInterval(window.__wplaceMetrics.imagePingInterval),window.__wplaceMetrics.imagePingInterval=null),(h=window.__wplaceMetrics)!=null&&h.imageVisibilityHandler&&(document.removeEventListener("visibilitychange",window.__wplaceMetrics.imageVisibilityHandler),delete window.__wplaceMetrics.imageVisibilityHandler),(x=window.__wplaceMetrics)!=null&&x.imageFocusHandler&&(window.removeEventListener("focus",window.__wplaceMetrics.imageFocusHandler),delete window.__wplaceMetrics.imageFocusHandler)}catch{}}),s("\u2705 Auto-Image inicializado correctamente");try{if(oe().ENABLED){let p=()=>{if(!document.hidden)try{We({botVariant:"auto-image",metadata:{reason:"visibility"}})}catch{}},h=()=>{try{We({botVariant:"auto-image",metadata:{reason:"focus"}})}catch{}};document.addEventListener("visibilitychange",p),window.addEventListener("focus",h),window.__wplaceMetrics=window.__wplaceMetrics||{},window.__wplaceMetrics.imageVisibilityHandler=p,window.__wplaceMetrics.imageFocusHandler=h}}catch{}setTimeout(async()=>{try{n.setStatus(T("image.autoInitializing"),"info"),s("\u{1F916} Intentando auto-inicio..."),await r()?(n.setStatus(T("image.autoInitSuccess"),"success"),s("\u2705 Auto-inicio exitoso"),n.setInitButtonVisible(!1),await d(!0)&&s("\u{1F680} Bot auto-iniciado completamente")):(n.setStatus(T("image.autoInitFailed"),"warning"),s("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(g){s("\u274C Error en auto-inicio:",g),n.setStatus(T("image.manualInitRequired"),"warning")}},1e3)}catch(l){throw s("\u274C Error inicializando Auto-Image:",l),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),l}}(async()=>{"use strict";var t,e;console.log("[WPA-Image] \u{1F680} Entry point iniciado");try{console.log("[WPA-Image] \u{1F916} Iniciando auto-click del bot\xF3n Paint..."),await De(3,!0),console.log("[WPA-Image] \u2705 Auto-click completado")}catch(i){console.log("[WPA-Image] \u26A0\uFE0F Error en auto-click del bot\xF3n Paint:",i)}if((t=window.__wplaceBot)!=null&&t.imageRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Image ya est\xE1 corriendo"),alert("Auto-Image ya est\xE1 corriendo.");return}if((e=window.__wplaceBot)!=null&&e.farmRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Farm est\xE1 ejecut\xE1ndose"),alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={},console.log("[WPA-Image] \u{1F527} Estado global inicializado")),window.__wplaceBot.imageRunning=!0,console.log("[WPA-Image] \u{1F3C3} Marcado como ejecut\xE1ndose"),console.log("[WPA-Image] \u{1F3AF} Llamando a runImage()"),Zt().catch(i=>{console.error("[BOT] Error en Auto-Image:",i),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
