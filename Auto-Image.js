/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-24T11:05:55.455Z */
(()=>{var yt=Object.defineProperty;var D=(o,e)=>()=>(o&&(e=o(o=0)),e);var Ue=(o,e)=>{for(var a in e)yt(o,a,{get:e[a],enumerable:!0})};var s,R=D(()=>{s=(...o)=>console.log("[WPA-UI]",...o)});var Ge,He=D(()=>{Ge={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",exportGuard:"Exportar a Guard",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",userName:"Usuario",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",showOverlay:"Mostrar overlay",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",guardExportSuccess:"\u2705 Exportado para Auto-Guard: {filename}",guardExportError:"\u274C Error exportando para Guard: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando...",protectionEnabled:"\u{1F6E1}\uFE0F Protecci\xF3n habilitada",protectionDisabled:"\u{1F6E1}\uFE0F Protecci\xF3n deshabilitada",paintPattern:"\u{1F4D0} Patr\xF3n de pintado",patternLinearStart:"Lineal (Inicio)",patternLinearEnd:"Lineal (Final)",patternRandom:"Aleatorio",patternCenterOut:"Centro hacia afuera",patternCornersFirst:"Esquinas primero",patternSpiral:"Espiral",protectingDrawing:"\u{1F6E1}\uFE0F Protegiendo dibujo...",changesDetected:"\u{1F6A8} {count} cambios detectados en el dibujo",repairing:"\u{1F527} Reparando {count} p\xEDxeles alterados...",repairCompleted:"\u2705 Reparaci\xF3n completada: {count} p\xEDxeles",noChargesForRepair:"\u26A1 Sin cargas para reparar, esperando...",protectionPriority:"\u{1F6E1}\uFE0F Prioridad de protecci\xF3n activada",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar",paintingStats:"Estad\xEDsticas de Pintado",userInfo:"Informaci\xF3n del Usuario",imageProgress:"Progreso de la Imagen",availableColors:"Colores Disponibles",refreshStats:"Actualizar Estad\xEDsticas",noImageLoaded:"No hay imagen cargada",cooldown:"Tiempo de espera",totalColors:"Total de Colores",colorPalette:"Paleta de Colores",showAllColors:"Mostrar Todos los Colores (incluyendo no disponibles)",selectAllColors:"Seleccionar Todos",unselectAllColors:"Deseleccionar Todos",noAvailable:"No disponible",colorSelected:"Color seleccionado",statsUpdated:"\u2705 Estad\xEDsticas actualizadas: {count} colores disponibles"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Inicializar Guard-BOT",selectArea:"Seleccionar \xC1rea",captureArea:"Capturar \xC1rea",startProtection:"Iniciar Protecci\xF3n",stopProtection:"Detener Protecci\xF3n",upperLeft:"Esquina Superior Izquierda",lowerRight:"Esquina Inferior Derecha",protectedPixels:"P\xEDxeles Protegidos",detectedChanges:"Cambios Detectados",repairedPixels:"P\xEDxeles Reparados",charges:"Cargas",waitingInit:"Esperando inicializaci\xF3n...",checkingColors:"\u{1F3A8} Verificando colores disponibles...",noColorsFound:"\u274C No se encontraron colores. Abre la paleta de colores en el sitio.",colorsFound:"\u2705 {count} colores disponibles encontrados",initSuccess:"\u2705 Guard-BOT inicializado correctamente",initError:"\u274C Error inicializando Guard-BOT",invalidCoords:"\u274C Coordenadas inv\xE1lidas",invalidArea:"\u274C El \xE1rea debe tener esquina superior izquierda menor que inferior derecha",areaTooLarge:"\u274C \xC1rea demasiado grande: {size} p\xEDxeles (m\xE1ximo: {max})",capturingArea:"\u{1F4F8} Capturando \xE1rea de protecci\xF3n...",areaCaptured:"\u2705 \xC1rea capturada: {count} p\xEDxeles bajo protecci\xF3n",captureError:"\u274C Error capturando \xE1rea: {error}",captureFirst:"\u274C Primero captura un \xE1rea de protecci\xF3n",protectionStarted:"\u{1F6E1}\uFE0F Protecci\xF3n iniciada - monitoreando \xE1rea",protectionStopped:"\u23F9\uFE0F Protecci\xF3n detenida",noChanges:"\u2705 \xC1rea protegida - sin cambios detectados",changesDetected:"\u{1F6A8} {count} cambios detectados en el \xE1rea protegida",repairing:"\u{1F6E0}\uFE0F Reparando {count} p\xEDxeles alterados...",repairedSuccess:"\u2705 Reparados {count} p\xEDxeles correctamente",repairError:"\u274C Error reparando p\xEDxeles: {error}",noCharges:"\u26A0\uFE0F Sin cargas suficientes para reparar cambios",checkingChanges:"\u{1F50D} Verificando cambios en \xE1rea protegida...",errorChecking:"\u274C Error verificando cambios: {error}",guardActive:"\u{1F6E1}\uFE0F Guardi\xE1n activo - \xE1rea bajo protecci\xF3n",lastCheck:"\xDAltima verificaci\xF3n: {time}",nextCheck:"Pr\xF3xima verificaci\xF3n en: {time}s",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Guard-BOT iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",manualInitRequired:"\u{1F527} Inicio manual requerido",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",selectUpperLeft:"\u{1F3AF} Pinta un p\xEDxel en la esquina SUPERIOR IZQUIERDA del \xE1rea a proteger",selectLowerRight:"\u{1F3AF} Ahora pinta un p\xEDxel en la esquina INFERIOR DERECHA del \xE1rea",waitingUpperLeft:"\u{1F446} Esperando selecci\xF3n de esquina superior izquierda...",waitingLowerRight:"\u{1F446} Esperando selecci\xF3n de esquina inferior derecha...",upperLeftCaptured:"\u2705 Esquina superior izquierda capturada: ({x}, {y})",lowerRightCaptured:"\u2705 Esquina inferior derecha capturada: ({x}, {y})",selectionTimeout:"\u274C Tiempo agotado para selecci\xF3n",selectionError:"\u274C Error en selecci\xF3n, int\xE9ntalo de nuevo",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Descargar Logs",clearLogs:"Limpiar Logs",closeLogs:"Cerrar"}}});var je,Ve=D(()=>{je={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",userName:"User",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",showOverlay:"Show overlay",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",exportGuard:"Export to Guard",progressSaveError:"\u274C Error saving progress: {error}",guardExportSuccess:"\u2705 Exported for Auto-Guard: {filename}",guardExportError:"\u274C Error exporting for Guard: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout, retrying...",protectionEnabled:"Protection enabled",protectionDisabled:"Protection disabled",paintPattern:"Paint pattern",patternLinearStart:"Linear (Start)",patternLinearEnd:"Linear (End)",patternRandom:"Random",patternCenterOut:"Center outward",patternCornersFirst:"Corners first",patternSpiral:"Spiral",solid:"Solid",stripes:"Stripes",checkerboard:"Checkerboard",gradient:"Gradient",dots:"Dots",waves:"Waves",spiral:"Spiral",mosaic:"Mosaic",bricks:"Bricks",zigzag:"Zigzag",protectingDrawing:"Protecting drawing...",changesDetected:"\u{1F6A8} {count} changes detected in drawing",repairing:"\u{1F527} Repairing {count} altered pixels...",repairCompleted:"\u2705 Repair completed: {count} pixels",noChargesForRepair:"\u26A1 No charges for repair, waiting...",protectionPriority:"\u{1F6E1}\uFE0F Protection priority activated",patternApplied:"Pattern applied",customPattern:"Custom pattern",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialize Guard-BOT",selectArea:"Select Area",captureArea:"Capture Area",startProtection:"Start Protection",stopProtection:"Stop Protection",upperLeft:"Upper Left Corner",lowerRight:"Lower Right Corner",protectedPixels:"Protected Pixels",detectedChanges:"Detected Changes",repairedPixels:"Repaired Pixels",charges:"Charges",waitingInit:"Waiting for initialization...",checkingColors:"\u{1F3A8} Checking available colors...",noColorsFound:"\u274C No colors found. Open the color palette on the site.",colorsFound:"\u2705 Found {count} available colors",initSuccess:"\u2705 Guard-BOT initialized successfully",initError:"\u274C Error initializing Guard-BOT",invalidCoords:"\u274C Invalid coordinates",invalidArea:"\u274C Area must have upper left corner less than lower right corner",areaTooLarge:"\u274C Area too large: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capturing protection area...",areaCaptured:"\u2705 Area captured: {count} pixels under protection",captureError:"\u274C Error capturing area: {error}",captureFirst:"\u274C First capture a protection area",protectionStarted:"\u{1F6E1}\uFE0F Protection started - monitoring area",protectionStopped:"\u23F9\uFE0F Protection stopped",noChanges:"\u2705 Protected area - no changes detected",changesDetected:"\u{1F6A8} {count} changes detected in protected area",repairing:"\u{1F6E0}\uFE0F Repairing {count} altered pixels...",repairedSuccess:"\u2705 Successfully repaired {count} pixels",repairError:"\u274C Error repairing pixels: {error}",noCharges:"\u26A0\uFE0F Insufficient charges to repair changes",checkingChanges:"\u{1F50D} Checking changes in protected area...",errorChecking:"\u274C Error checking changes: {error}",guardActive:"\u{1F6E1}\uFE0F Guardian active - area under protection",lastCheck:"Last check: {time}",nextCheck:"Next check in: {time}s",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Guard-BOT auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",manualInitRequired:"\u{1F527} Manual initialization required",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",selectUpperLeft:"\u{1F3AF} Paint a pixel at the UPPER LEFT corner of the area to protect",selectLowerRight:"\u{1F3AF} Now paint a pixel at the LOWER RIGHT corner of the area",waitingUpperLeft:"\u{1F446} Waiting for upper left corner selection...",waitingLowerRight:"\u{1F446} Waiting for lower right corner selection...",upperLeftCaptured:"\u2705 Upper left corner captured: ({x}, {y})",lowerRightCaptured:"\u2705 Lower right corner captured: ({x}, {y})",selectionTimeout:"\u274C Selection timeout",selectionError:"\u274C Selection error, please try again",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"Download Logs",clearLogs:"Clear Logs",closeLogs:"Close"}}});var Ze,Ke=D(()=>{Ze={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",autoGuard:"\u{1F6E1}\uFE0F Auto-Guard",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",userName:"Usager",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",showOverlay:"Afficher l'overlay",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",exportGuard:"Exporter vers Guard",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",guardExportSuccess:"\u2705 Export\xE9 pour Auto-Guard : {filename}",guardExportError:"\u274C Erreur lors de l'export pour Guard : {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 D\xE9lai d\u2019attente du serveur, nouvelle tentative...",protectionEnabled:"Protection activ\xE9e",protectionDisabled:"Protection d\xE9sactiv\xE9e",paintPattern:"Motif de peinture",patternLinearStart:"Lin\xE9aire (D\xE9but)",patternLinearEnd:"Lin\xE9aire (Fin)",patternRandom:"Al\xE9atoire",patternCenterOut:"Centre vers l\u2019ext\xE9rieur",patternCornersFirst:"Coins d\u2019abord",patternSpiral:"Spirale",solid:"Plein",stripes:"Rayures",checkerboard:"Damier",gradient:"D\xE9grad\xE9",dots:"Points",waves:"Vagues",spiral:"Spirale",mosaic:"Mosa\xEFque",bricks:"Briques",zigzag:"Zigzag",protectingDrawing:"Protection du dessin...",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans le dessin",repairing:"\u{1F527} R\xE9paration de {count} pixels modifi\xE9s...",repairCompleted:"\u2705 R\xE9paration termin\xE9e : {count} pixels",noChargesForRepair:"\u26A1 Pas de frais pour la r\xE9paration, en attente...",protectionPriority:"\u{1F6E1}\uFE0F Priorit\xE9 \xE0 la protection activ\xE9e",patternApplied:"Motif appliqu\xE9",customPattern:"Motif personnalis\xE9",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"},guard:{title:"WPlace Auto-Guard",initBot:"Initialiser Guard-BOT",selectArea:"S\xE9lectionner Zone",captureArea:"Capturer Zone",startProtection:"D\xE9marrer Protection",stopProtection:"Arr\xEAter Protection",upperLeft:"Coin Sup\xE9rieur Gauche",lowerRight:"Coin Inf\xE9rieur Droit",protectedPixels:"Pixels Prot\xE9g\xE9s",detectedChanges:"Changements D\xE9tect\xE9s",repairedPixels:"Pixels R\xE9par\xE9s",charges:"Charges",waitingInit:"En attente d'initialisation...",checkingColors:"\u{1F3A8} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Aucune couleur trouv\xE9e. Ouvrez la palette de couleurs sur le site.",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",initSuccess:"\u2705 Guard-BOT initialis\xE9 avec succ\xE8s",initError:"\u274C Erreur lors de l'initialisation de Guard-BOT",invalidCoords:"\u274C Coordonn\xE9es invalides",invalidArea:"\u274C La zone doit avoir le coin sup\xE9rieur gauche inf\xE9rieur au coin inf\xE9rieur droit",areaTooLarge:"\u274C Zone trop grande: {size} pixels (maximum: {max})",capturingArea:"\u{1F4F8} Capture de la zone de protection...",areaCaptured:"\u2705 Zone captur\xE9e: {count} pixels sous protection",captureError:"\u274C Erreur lors de la capture de zone: {error}",captureFirst:"\u274C Capturez d'abord une zone de protection",protectionStarted:"\u{1F6E1}\uFE0F Protection d\xE9marr\xE9e - surveillance de la zone",protectionStopped:"\u23F9\uFE0F Protection arr\xEAt\xE9e",noChanges:"\u2705 Zone prot\xE9g\xE9e - aucun changement d\xE9tect\xE9",changesDetected:"\u{1F6A8} {count} changements d\xE9tect\xE9s dans la zone prot\xE9g\xE9e",repairing:"\u{1F6E0}\uFE0F R\xE9paration de {count} pixels alt\xE9r\xE9s...",repairedSuccess:"\u2705 {count} pixels r\xE9par\xE9s avec succ\xE8s",repairError:"\u274C Erreur lors de la r\xE9paration des pixels: {error}",noCharges:"\u26A0\uFE0F Charges insuffisantes pour r\xE9parer les changements",checkingChanges:"\u{1F50D} V\xE9rification des changements dans la zone prot\xE9g\xE9e...",errorChecking:"\u274C Erreur lors de la v\xE9rification des changements: {error}",guardActive:"\u{1F6E1}\uFE0F Gardien actif - zone sous protection",lastCheck:"Derni\xE8re v\xE9rification: {time}",nextCheck:"Prochaine v\xE9rification dans: {time}s",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Guard-BOT d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",manualInitRequired:"\u{1F527} Initialisation manuelle requise",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",selectUpperLeft:"\u{1F3AF} Peignez un pixel au coin SUP\xC9RIEUR GAUCHE de la zone \xE0 prot\xE9ger",selectLowerRight:"\u{1F3AF} Maintenant peignez un pixel au coin INF\xC9RIEUR DROIT de la zone",waitingUpperLeft:"\u{1F446} En attente de la s\xE9lection du coin sup\xE9rieur gauche...",waitingLowerRight:"\u{1F446} En attente de la s\xE9lection du coin inf\xE9rieur droit...",upperLeftCaptured:"\u2705 Coin sup\xE9rieur gauche captur\xE9: ({x}, {y})",lowerRightCaptured:"\u2705 Coin inf\xE9rieur droit captur\xE9: ({x}, {y})",selectionTimeout:"\u274C D\xE9lai de s\xE9lection d\xE9pass\xE9",selectionError:"\u274C Erreur de s\xE9lection, veuillez r\xE9essayer",logWindow:"Logs",logWindowTitle:"Logs - {botName}",downloadLogs:"T\xE9l\xE9charger Logs",clearLogs:"Effacer Logs",closeLogs:"Fermer"}}});var Je,Qe=D(()=>{Je={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",autoImage:"\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",autoGuard:"\u{1F6E1}\uFE0F \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",selection:"\u0412\u044B\u0431\u0440\u0430\u043D\u043E",user:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",charges:"\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",backend:"\u0411\u044D\u043A\u0435\u043D\u0434",database:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",uptime:"\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",launch:"\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",executing:"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",downloading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",chooseBot:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",readyToLaunch:"\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",loadError:"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",loadErrorMsg:"\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",checking:"\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",online:"\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",offline:"\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",ok:"\u{1F7E2} \u041E\u041A",error:"\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",unknown:"-",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},image:{title:"WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",uploadImage:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",resizeImage:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",startPainting:"\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",stopPainting:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",saveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",loadProgress:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",checkingColors:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",loadingImage:"\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",imageLoaded:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",imageError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPositionAlert:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",positionDetected:"\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",positionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",startPaintingMsg:"\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",paintingProgress:"\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",noCharges:"\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",paintingStopped:"\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",paintingComplete:"\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",paintingError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",missingRequirements:"\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",progress:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",userName:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",pixels:"\u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",estimatedTime:"\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",initMessage:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",resizeSuccess:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",paintingPaused:"\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",batchSize:"\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",nextBatchTime:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437",useAllCharges:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",showOverlay:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435",maxCharges:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",waitingForCharges:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",timeRemaining:"\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",cooldownWaiting:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",progressSaved:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",progressLoaded:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",progressLoadError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",exportGuard:"\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 Guard",progressSaveError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",guardExportSuccess:"\u2705 \u042D\u043A\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0434\u043B\u044F Auto-Guard: {filename}",guardExportError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0430 \u0434\u043B\u044F Guard: {error}",confirmSaveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",saveProgressTitle:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",discardProgress:"\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",minimize:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",width:"\u0428\u0438\u0440\u0438\u043D\u0430",height:"\u0412\u044B\u0441\u043E\u0442\u0430",keepAspect:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",apply:"\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",overlayOn:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u041A\u041B",overlayOff:"\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: \u0412\u042B\u041A\u041B",passCompleted:"\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",waitingChargesRegen:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",waitingChargesCountdown:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",retryAttempt:"\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryError:"\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryFailed:"\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",networkError:"\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",serverError:"\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",timeoutError:"\u23F0 \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",protectionEnabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430",protectionDisabled:"\u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",paintPattern:"\u0428\u0430\u0431\u043B\u043E\u043D \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",patternLinearStart:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043D\u0430\u0447\u0430\u043B\u043E)",patternLinearEnd:"\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 (\u043A\u043E\u043D\u0435\u0446)",patternRandom:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",patternCenterOut:"\u0418\u0437 \u0446\u0435\u043D\u0442\u0440\u0430 \u043D\u0430\u0440\u0443\u0436\u0443",patternCornersFirst:"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0433\u043B\u044B",patternSpiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",solid:"\u0421\u043F\u043B\u043E\u0448\u043D\u043E\u0439",stripes:"\u041F\u043E\u043B\u043E\u0441\u044B",checkerboard:"\u0428\u0430\u0445\u043C\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u043A\u0430",gradient:"\u0413\u0440\u0430\u0434\u0438\u0435\u043D\u0442",dots:"\u0422\u043E\u0447\u043A\u0438",waves:"\u0412\u043E\u043B\u043D\u044B",spiral:"\u0421\u043F\u0438\u0440\u0430\u043B\u044C",mosaic:"\u041C\u043E\u0437\u0430\u0438\u043A\u0430",bricks:"\u041A\u0438\u0440\u043F\u0438\u0447\u0438",zigzag:"\u0417\u0438\u0433\u0437\u0430\u0433",protectingDrawing:"\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0438\u0441\u0443\u043D\u043A\u0430...",changesDetected:"\u{1F6A8} \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {count}",repairing:"\u{1F527} \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairCompleted:"\u2705 \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",noChargesForRepair:"\u26A1 \u041A\u043E\u043C\u0438\u0441\u0441\u0438\u0439 \u0437\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435\u0442, \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435...",protectionPriority:"\u{1F6E1}\uFE0F \u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u044B \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D",patternApplied:"\u0428\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D",customPattern:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0448\u0430\u0431\u043B\u043E\u043D",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},farm:{title:"WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",stopped:"\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",calibrate:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",paintOnce:"\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",checkingStatus:"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",configuration:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",delay:"\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",minCharges:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",colorMode:"\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",random:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",fixed:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",range:"\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",fixedColor:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",advanced:"\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",tileX:"\u041F\u043B\u0438\u0442\u043A\u0430 X",tileY:"\u041F\u043B\u0438\u0442\u043A\u0430 Y",customPalette:"\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",paletteExample:"\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",capture:"\u0417\u0430\u0445\u0432\u0430\u0442",painted:"\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",retries:"\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",tile:"\u041F\u043B\u0438\u0442\u043A\u0430",configSaved:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",configLoaded:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",configReset:"\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",captureInstructions:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",backendOnline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",backendOffline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u0444\u043B\u0430\u0439\u043D",startingBot:"\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",stoppingBot:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",calibrating:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",alreadyRunning:"\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",imageRunningWarning:"\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C",selectPositionAlert:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",missingPosition:"\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",farmRadius:"\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",positionInfo:"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",farmingInRadius:"\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",selectEmptyArea:"\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",noPosition:"\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",currentZone:"\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"},common:{yes:"\u0414\u0430",no:"\u041D\u0435\u0442",ok:"\u041E\u041A",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",load:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",edit:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",pause:"\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",resume:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",reset:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",help:"\u041F\u043E\u043C\u043E\u0449\u044C",about:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",language:"\u042F\u0437\u044B\u043A",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",error:"\u041E\u0448\u0438\u0431\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",info:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",languageChanged:"\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"},guard:{title:"WPlace \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Guard-BOT",selectArea:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",captureArea:"\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",startProtection:"\u041D\u0430\u0447\u0430\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",stopProtection:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",upperLeft:"\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u041B\u0435\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",lowerRight:"\u041D\u0438\u0436\u043D\u0438\u0439 \u041F\u0440\u0430\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",protectedPixels:"\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",detectedChanges:"\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0435 \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",repairedPixels:"\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",checkingColors:"\u{1F3A8} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u0426\u0432\u0435\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435.",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",initSuccess:"\u2705 Guard-BOT \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D",initError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 Guard-BOT",invalidCoords:"\u274C \u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B",invalidArea:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430",areaTooLarge:"\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F: {size} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 (\u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C: {max})",capturingArea:"\u{1F4F8} \u0417\u0430\u0445\u0432\u0430\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0437\u0430\u0449\u0438\u0442\u044B...",areaCaptured:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D\u0430: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",captureError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438: {error}",captureFirst:"\u274C \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u044B",protectionStarted:"\u{1F6E1}\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430 - \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",protectionStopped:"\u23F9\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",noChanges:"\u2705 \u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C - \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E",changesDetected:"\u{1F6A8} {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",repairing:"\u{1F6E0}\uFE0F \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",repairedSuccess:"\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",repairError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439: {error}",noCharges:"\u26A0\uFE0F \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439",checkingChanges:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438...",errorChecking:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {error}",guardActive:"\u{1F6E1}\uFE0F \u0421\u0442\u0440\u0430\u0436 \u0430\u043A\u0442\u0438\u0432\u0435\u043D - \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",lastCheck:"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: {time}",nextCheck:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u0440\u0435\u0437: {time}\u0441",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 Guard-BOT \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",selectUpperLeft:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0412\u0415\u0420\u0425\u041D\u0415\u041C \u041B\u0415\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B",selectLowerRight:"\u{1F3AF} \u0422\u0435\u043F\u0435\u0440\u044C \u043D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041D\u0418\u0416\u041D\u0415\u041C \u041F\u0420\u0410\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",waitingUpperLeft:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u043B\u0435\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",waitingLowerRight:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",upperLeftCaptured:"\u2705 \u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",lowerRightCaptured:"\u2705 \u041D\u0438\u0436\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",selectionTimeout:"\u274C \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430",selectionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430",logWindow:"Logs",logWindowTitle:"\u041B\u043E\u0433\u0438 - {botName}",downloadLogs:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u041B\u043E\u0433\u0438",clearLogs:"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u041B\u043E\u0433\u0438",closeLogs:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"}}});var et,tt=D(()=>{et={launcher:{title:"WPlace \u81EA\u52A8\u673A\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52A8\u519C\u573A",autoImage:"\u{1F3A8} \u81EA\u52A8\u7ED8\u56FE",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52A8\u5B88\u62A4",selection:"\u9009\u62E9",user:"\u7528\u6237",charges:"\u6B21\u6570",backend:"\u540E\u7AEF",database:"\u6570\u636E\u5E93",uptime:"\u8FD0\u884C\u65F6\u95F4",close:"\u5173\u95ED",launch:"\u542F\u52A8",loading:"\u52A0\u8F7D\u4E2D\u2026",executing:"\u6267\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F7D\u811A\u672C\u2026",chooseBot:"\u9009\u62E9\u4E00\u4E2A\u673A\u5668\u4EBA\u5E76\u70B9\u51FB\u542F\u52A8",readyToLaunch:"\u51C6\u5907\u542F\u52A8",loadError:"\u52A0\u8F7D\u9519\u8BEF",loadErrorMsg:"\u65E0\u6CD5\u52A0\u8F7D\u6240\u9009\u673A\u5668\u4EBA\u3002\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6216\u91CD\u8BD5\u3002",checking:"\u{1F504} \u68C0\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7EBF",offline:"\u{1F534} \u79BB\u7EBF",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u9519\u8BEF",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},image:{title:"WPlace \u81EA\u52A8\u7ED8\u56FE",initBot:"\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA",uploadImage:"\u4E0A\u4F20\u56FE\u7247",resizeImage:"\u8C03\u6574\u56FE\u7247\u5927\u5C0F",selectPosition:"\u9009\u62E9\u4F4D\u7F6E",startPainting:"\u5F00\u59CB\u7ED8\u5236",stopPainting:"\u505C\u6B62\u7ED8\u5236",saveProgress:"\u4FDD\u5B58\u8FDB\u5EA6",loadProgress:"\u52A0\u8F7D\u8FDB\u5EA6",checkingColors:"\u{1F50D} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u540E\u91CD\u8BD5\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F7D\u56FE\u7247...",imageLoaded:"\u2705 \u56FE\u7247\u5DF2\u52A0\u8F7D\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u4E2A",imageError:"\u274C \u56FE\u7247\u52A0\u8F7D\u5931\u8D25",selectPositionAlert:"\u8BF7\u5728\u4F60\u60F3\u5F00\u59CB\u7ED8\u5236\u7684\u5730\u65B9\u6D82\u7B2C\u4E00\u4E2A\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8BBE\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9009\u62E9\u8D85\u65F6",positionDetected:"\u{1F3AF} \u5DF2\u68C0\u6D4B\u5230\u4F4D\u7F6E\uFF0C\u5904\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u68C0\u6D4B\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",startPaintingMsg:"\u{1F3A8} \u5F00\u59CB\u7ED8\u5236...",paintingProgress:"\u{1F9F1} \u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6CA1\u6709\u6B21\u6570\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7ED8\u5236",paintingComplete:"\u2705 \u7ED8\u5236\u5B8C\u6210\uFF01\u5171\u7ED8\u5236 {count} \u4E2A\u50CF\u7D20\u3002",paintingError:"\u274C \u7ED8\u5236\u8FC7\u7A0B\u4E2D\u51FA\u9519",missingRequirements:"\u274C \u8BF7\u5148\u52A0\u8F7D\u56FE\u7247\u5E76\u9009\u62E9\u4F4D\u7F6E",progress:"\u8FDB\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6570",estimatedTime:"\u9884\u8BA1\u65F6\u95F4",initMessage:"\u70B9\u51FB\u201C\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA\u201D\u5F00\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u56FE\u7247\u5DF2\u8C03\u6574\u4E3A {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7ED8\u5236\u6682\u505C\u4E8E\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6570",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u65F6\u95F4",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6570",showOverlay:"\u663E\u793A\u8986\u76D6\u5C42",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6570",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed}",timeRemaining:"\u5269\u4F59\u65F6\u95F4",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u540E\u7EE7\u7EED...",progressSaved:"\u2705 \u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u4E3A {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F7D\u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7ED8\u5236",progressLoadError:"\u274C \u52A0\u8F7D\u8FDB\u5EA6\u5931\u8D25: {error}",exportGuard:"\u5BFC\u51FA\u5230 Guard",progressSaveError:"\u274C \u4FDD\u5B58\u8FDB\u5EA6\u5931\u8D25: {error}",guardExportSuccess:"\u2705 \u5DF2\u5BFC\u51FA\u5230 Auto-Guard: {filename}",guardExportError:"\u274C \u5BFC\u51FA\u5230 Guard \u65F6\u51FA\u9519: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u5F53\u524D\u8FDB\u5EA6\u5417\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u8FDB\u5EA6",discardProgress:"\u653E\u5F03",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BBD\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7EB5\u6A2A\u6BD4",apply:"\u5E94\u7528",overlayOn:"\u8986\u76D6\u5C42: \u5F00\u542F",overlayOff:"\u8986\u76D6\u5C42: \u5173\u95ED",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7ED8\u5236 {painted} \u50CF\u7D20 | \u8FDB\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6570\u6062\u590D: {current}/{needed} - \u65F6\u95F4: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed} - \u5269\u4F59: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8BD5 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5C1D\u8BD5\u51FA\u9519\uFF0C\u5C06\u5728 {delay} \u79D2\u540E\u91CD\u8BD5...",retryFailed:"\u274C \u8D85\u8FC7 {maxAttempts} \u6B21\u5C1D\u8BD5\u5931\u8D25\u3002\u7EE7\u7EED\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7F51\u7EDC\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",serverError:"\u{1F525} \u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",timeoutError:"\u23F0 \u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u6B63\u5728\u91CD\u8BD5...",protectionEnabled:"\u5DF2\u5F00\u542F\u4FDD\u62A4",protectionDisabled:"\u5DF2\u5173\u95ED\u4FDD\u62A4",paintPattern:"\u7ED8\u5236\u6A21\u5F0F",patternLinearStart:"\u7EBF\u6027\uFF08\u8D77\u70B9\uFF09",patternLinearEnd:"\u7EBF\u6027\uFF08\u7EC8\u70B9\uFF09",patternRandom:"\u968F\u673A",patternCenterOut:"\u4ECE\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5B9E\u5FC3",stripes:"\u6761\u7EB9",checkerboard:"\u68CB\u76D8\u683C",gradient:"\u6E10\u53D8",dots:"\u70B9\u72B6",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u9A6C\u8D5B\u514B",bricks:"\u7816\u5757",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u62A4\u56FE\u7A3F...",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u5904\u66F4\u6539",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u66F4\u6539\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u590D\u5B8C\u6210\uFF1A{count} \u4E2A\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u590D\u4E0D\u6D88\u8017\u70B9\u6570\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u542F\u7528\u4FDD\u62A4\u4F18\u5148",patternApplied:"\u5DF2\u5E94\u7528\u6A21\u5F0F",customPattern:"\u81EA\u5B9A\u4E49\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},farm:{title:"WPlace \u519C\u573A\u673A\u5668\u4EBA",start:"\u5F00\u59CB",stop:"\u505C\u6B62",stopped:"\u673A\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u51C6",paintOnce:"\u4E00\u6B21",checkingStatus:"\u68C0\u67E5\u72B6\u6001\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u8FDF (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6570",colorMode:"\u989C\u8272\u6A21\u5F0F",random:"\u968F\u673A",fixed:"\u56FA\u5B9A",range:"\u8303\u56F4",fixedColor:"\u56FA\u5B9A\u989C\u8272",advanced:"\u9AD8\u7EA7",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u4E49\u8C03\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u83B7",painted:"\u5DF2\u7ED8\u5236",charges:"\u6B21\u6570",retries:"\u91CD\u8BD5",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F7D",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8BF7\u624B\u52A8\u7ED8\u5236\u4E00\u4E2A\u50CF\u7D20\u4EE5\u6355\u83B7\u5750\u6807...",backendOnline:"\u540E\u7AEF\u5728\u7EBF",backendOffline:"\u540E\u7AEF\u79BB\u7EBF",startingBot:"\u6B63\u5728\u542F\u52A8\u673A\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u673A\u5668\u4EBA...",calibrating:"\u6821\u51C6\u4E2D...",alreadyRunning:"\u81EA\u52A8\u519C\u573A\u5DF2\u5728\u8FD0\u884C\u3002",imageRunningWarning:"\u81EA\u52A8\u7ED8\u56FE\u6B63\u5728\u8FD0\u884C\uFF0C\u8BF7\u5148\u5173\u95ED\u518D\u542F\u52A8\u81EA\u52A8\u519C\u573A\u3002",selectPosition:"\u9009\u62E9\u533A\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u56FE\u7684\u7A7A\u767D\u533A\u57DF\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",positionSet:"\u2705 \u533A\u57DF\u8BBE\u7F6E\u6210\u529F\uFF01\u534A\u5F84: 500px",positionTimeout:"\u274C \u533A\u57DF\u9009\u62E9\u8D85\u65F6",missingPosition:"\u274C \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF08\u4F7F\u7528\u201C\u9009\u62E9\u533A\u57DF\u201D\u6309\u94AE\uFF09",farmRadius:"\u519C\u573A\u534A\u5F84",positionInfo:"\u5F53\u524D\u533A\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F84 {radius}px \u5728 ({x},{y}) \u519C\u573A",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8BF7\u9009\u62E9\u7A7A\u767D\u533A\u57DF\u4EE5\u907F\u514D\u51B2\u7A81",noPosition:"\u672A\u9009\u62E9\u533A\u57DF",currentZone:"\u533A\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF0C\u5728\u5730\u56FE\u4E0A\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"},common:{yes:"\u662F",no:"\u5426",ok:"\u786E\u8BA4",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",save:"\u4FDD\u5B58",load:"\u52A0\u8F7D",delete:"\u5220\u9664",edit:"\u7F16\u8F91",start:"\u5F00\u59CB",stop:"\u505C\u6B62",pause:"\u6682\u505C",resume:"\u7EE7\u7EED",reset:"\u91CD\u7F6E",settings:"\u8BBE\u7F6E",help:"\u5E2E\u52A9",about:"\u5173\u4E8E",language:"\u8BED\u8A00",loading:"\u52A0\u8F7D\u4E2D...",error:"\u9519\u8BEF",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8BED\u8A00\u5DF2\u5207\u6362\u4E3A {language}"},guard:{title:"WPlace \u81EA\u52A8\u5B88\u62A4",initBot:"\u521D\u59CB\u5316\u5B88\u62A4\u673A\u5668\u4EBA",selectArea:"\u9009\u62E9\u533A\u57DF",captureArea:"\u6355\u83B7\u533A\u57DF",startProtection:"\u5F00\u59CB\u5B88\u62A4",stopProtection:"\u505C\u6B62\u5B88\u62A4",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u62A4\u50CF\u7D20",detectedChanges:"\u68C0\u6D4B\u5230\u7684\u53D8\u5316",repairedPixels:"\u4FEE\u590D\u7684\u50CF\u7D20",charges:"\u6B21\u6570",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u989C\u8272\uFF0C\u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",initSuccess:"\u2705 \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u5931\u8D25",invalidCoords:"\u274C \u5750\u6807\u65E0\u6548",invalidArea:"\u274C \u533A\u57DF\u65E0\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u987B\u5C0F\u4E8E\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u533A\u57DF\u8FC7\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u83B7\u5B88\u62A4\u533A\u57DF\u4E2D...",areaCaptured:"\u2705 \u533A\u57DF\u6355\u83B7\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u62A4",captureError:"\u274C \u6355\u83B7\u533A\u57DF\u51FA\u9519: {error}",captureFirst:"\u274C \u8BF7\u5148\u6355\u83B7\u4E00\u4E2A\u5B88\u62A4\u533A\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u62A4\u5DF2\u542F\u52A8 - \u533A\u57DF\u76D1\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u62A4\u5DF2\u505C\u6B62",noChanges:"\u2705 \u533A\u57DF\u5B89\u5168 - \u672A\u68C0\u6D4B\u5230\u53D8\u5316",changesDetected:"\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u4E2A\u53D8\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u590D {count} \u4E2A\u50CF\u7D20",repairError:"\u274C \u4FEE\u590D\u51FA\u9519: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4FEE\u590D",checkingChanges:"\u{1F50D} \u6B63\u5728\u68C0\u67E5\u533A\u57DF\u53D8\u5316...",errorChecking:"\u274C \u68C0\u67E5\u51FA\u9519: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u62A4\u4E2D - \u533A\u57DF\u53D7\u4FDD\u62A4",lastCheck:"\u4E0A\u6B21\u68C0\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u68C0\u67E5: {time} \u79D2\u540E",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u62A4\u533A\u57DF\u7684\u5DE6\u4E0A\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73B0\u5728\u5728\u53F3\u4E0B\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9009\u62E9\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u83B7\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u83B7\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9009\u62E9\u8D85\u65F6",selectionError:"\u274C \u9009\u62E9\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u5FD7\u7A97\u53E3",downloadLogs:"\u4E0B\u8F7D\u65E5\u5FD7",clearLogs:"\u6E05\u9664\u65E5\u5FD7",closeLogs:"\u5173\u95ED"}}});var at,it=D(()=>{at={launcher:{title:"WPlace \u81EA\u52D5\u6A5F\u5668\u4EBA",autoFarm:"\u{1F33E} \u81EA\u52D5\u8FB2\u5834",autoImage:"\u{1F3A8} \u81EA\u52D5\u7E6A\u5716",autoGuard:"\u{1F6E1}\uFE0F \u81EA\u52D5\u5B88\u8B77",selection:"\u9078\u64C7",user:"\u7528\u6237",charges:"\u6B21\u6578",backend:"\u5F8C\u7AEF",database:"\u6578\u64DA\u5EAB",uptime:"\u904B\u884C\u6642\u9593",close:"\u95DC\u9589",launch:"\u5553\u52D5",loading:"\u52A0\u8F09\u4E2D\u2026",executing:"\u57F7\u884C\u4E2D\u2026",downloading:"\u6B63\u5728\u4E0B\u8F09\u8173\u672C\u2026",chooseBot:"\u9078\u64C7\u4E00\u500B\u6A5F\u5668\u4EBA\u4E26\u9EDE\u64CA\u5553\u52D5",readyToLaunch:"\u6E96\u5099\u5553\u52D5",loadError:"\u52A0\u8F09\u932F\u8AA4",loadErrorMsg:"\u7121\u6CD5\u52A0\u8F09\u6240\u9078\u6A5F\u5668\u4EBA\u3002\u8ACB\u6AA2\u67E5\u7DB2\u7D61\u9023\u63A5\u6216\u91CD\u8A66\u3002",checking:"\u{1F504} \u6AA2\u67E5\u4E2D...",online:"\u{1F7E2} \u5728\u7DDA",offline:"\u{1F534} \u96E2\u7DDA",ok:"\u{1F7E2} \u6B63\u5E38",error:"\u{1F534} \u932F\u8AA4",unknown:"-",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},image:{title:"WPlace \u81EA\u52D5\u7E6A\u5716",initBot:"\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA",uploadImage:"\u4E0A\u50B3\u5716\u7247",resizeImage:"\u8ABF\u6574\u5716\u7247\u5927\u5C0F",selectPosition:"\u9078\u64C7\u4F4D\u7F6E",startPainting:"\u958B\u59CB\u7E6A\u88FD",stopPainting:"\u505C\u6B62\u7E6A\u88FD",saveProgress:"\u4FDD\u5B58\u9032\u5EA6",loadProgress:"\u52A0\u8F09\u9032\u5EA6",checkingColors:"\u{1F50D} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u5F8C\u91CD\u8A66\uFF01",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",loadingImage:"\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F09\u5716\u7247...",imageLoaded:"\u2705 \u5716\u7247\u5DF2\u52A0\u8F09\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u500B",imageError:"\u274C \u5716\u7247\u52A0\u8F09\u5931\u6557",selectPositionAlert:"\u8ACB\u5728\u4F60\u60F3\u958B\u59CB\u7E6A\u88FD\u7684\u5730\u65B9\u5857\u7B2C\u4E00\u500B\u50CF\u7D20\uFF01",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u4F4D\u7F6E\u8A2D\u7F6E\u6210\u529F\uFF01",positionTimeout:"\u274C \u4F4D\u7F6E\u9078\u64C7\u8D85\u6642",positionDetected:"\u{1F3AF} \u5DF2\u6AA2\u6E2C\u5230\u4F4D\u7F6E\uFF0C\u8655\u7406\u4E2D...",positionError:"\u274C \u4F4D\u7F6E\u6AA2\u6E2C\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66",startPaintingMsg:"\u{1F3A8} \u958B\u59CB\u7E6A\u88FD...",paintingProgress:"\u{1F9F1} \u9032\u5EA6: {painted}/{total} \u50CF\u7D20...",noCharges:"\u231B \u6C92\u6709\u6B21\u6578\u3002\u7B49\u5F85 {time}...",paintingStopped:"\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7E6A\u88FD",paintingComplete:"\u2705 \u7E6A\u88FD\u5B8C\u6210\uFF01\u5171\u7E6A\u88FD {count} \u500B\u50CF\u7D20\u3002",paintingError:"\u274C \u7E6A\u88FD\u904E\u7A0B\u4E2D\u51FA\u932F",missingRequirements:"\u274C \u8ACB\u5148\u52A0\u8F09\u5716\u7247\u4E26\u9078\u64C7\u4F4D\u7F6E",progress:"\u9032\u5EA6",userName:"\u7528\u6237",pixels:"\u50CF\u7D20",charges:"\u6B21\u6578",estimatedTime:"\u9810\u8A08\u6642\u9593",initMessage:"\u9EDE\u64CA\u201C\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA\u201D\u958B\u59CB",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",resizeSuccess:"\u2705 \u5716\u7247\u5DF2\u8ABF\u6574\u70BA {width}x{height}",paintingPaused:"\u23F8\uFE0F \u7E6A\u88FD\u66AB\u505C\u65BC\u4F4D\u7F6E X: {x}, Y: {y}",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20\u6578",batchSize:"\u6279\u6B21\u5927\u5C0F",nextBatchTime:"\u4E0B\u6B21\u6279\u6B21\u6642\u9593",useAllCharges:"\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6578",showOverlay:"\u986F\u793A\u8986\u84CB\u5C64",maxCharges:"\u6BCF\u6279\u6700\u5927\u6B21\u6578",waitingForCharges:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed}",timeRemaining:"\u5269\u9918\u6642\u9593",cooldownWaiting:"\u23F3 \u7B49\u5F85 {time} \u5F8C\u7E7C\u7E8C...",progressSaved:"\u2705 \u9032\u5EA6\u5DF2\u4FDD\u5B58\u70BA {filename}",progressLoaded:"\u2705 \u5DF2\u52A0\u8F09\u9032\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7E6A\u88FD",progressLoadError:"\u274C \u52A0\u8F09\u9032\u5EA6\u5931\u6557: {error}",exportGuard:"\u532F\u51FA\u5230 Guard",progressSaveError:"\u274C \u4FDD\u5B58\u9032\u5EA6\u5931\u6557: {error}",guardExportSuccess:"\u2705 \u5DF2\u532F\u51FA\u5230 Auto-Guard: {filename}",guardExportError:"\u274C \u532F\u51FA\u5230 Guard \u6642\u51FA\u932F: {error}",confirmSaveProgress:"\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u7576\u524D\u9032\u5EA6\u55CE\uFF1F",saveProgressTitle:"\u4FDD\u5B58\u9032\u5EA6",discardProgress:"\u653E\u68C4",cancel:"\u53D6\u6D88",minimize:"\u6700\u5C0F\u5316",width:"\u5BEC\u5EA6",height:"\u9AD8\u5EA6",keepAspect:"\u4FDD\u6301\u7E31\u6A6B\u6BD4",apply:"\u61C9\u7528",overlayOn:"\u8986\u84CB\u5C64: \u958B\u5553",overlayOff:"\u8986\u84CB\u5C64: \u95DC\u9589",passCompleted:"\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7E6A\u88FD {painted} \u50CF\u7D20 | \u9032\u5EA6: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 \u7B49\u5F85\u6B21\u6578\u6062\u5FA9: {current}/{needed} - \u6642\u9593: {time}",waitingChargesCountdown:"\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed} - \u5269\u9918: {time}",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",retryAttempt:"\u{1F504} \u91CD\u8A66 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",retryError:"\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5617\u8A66\u51FA\u932F\uFF0C\u5C07\u5728 {delay} \u79D2\u5F8C\u91CD\u8A66...",retryFailed:"\u274C \u8D85\u904E {maxAttempts} \u6B21\u5617\u8A66\u5931\u6557\u3002\u7E7C\u7E8C\u4E0B\u4E00\u6279...",networkError:"\u{1F310} \u7DB2\u7D61\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",serverError:"\u{1F525} \u670D\u52D9\u5668\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",timeoutError:"\u23F0 \u4F3A\u670D\u5668\u903E\u6642\uFF0C\u6B63\u5728\u91CD\u8A66...",protectionEnabled:"\u5DF2\u555F\u7528\u4FDD\u8B77",protectionDisabled:"\u5DF2\u505C\u7528\u4FDD\u8B77",paintPattern:"\u7E6A\u88FD\u6A21\u5F0F",patternLinearStart:"\u7DDA\u6027\uFF08\u8D77\u9EDE\uFF09",patternLinearEnd:"\u7DDA\u6027\uFF08\u7D42\u9EDE\uFF09",patternRandom:"\u96A8\u6A5F",patternCenterOut:"\u7531\u4E2D\u5FC3\u5411\u5916",patternCornersFirst:"\u5148\u89D2\u843D",patternSpiral:"\u87BA\u65CB",solid:"\u5BE6\u5FC3",stripes:"\u689D\u7D0B",checkerboard:"\u68CB\u76E4\u683C",gradient:"\u6F38\u5C64",dots:"\u9EDE\u72C0",waves:"\u6CE2\u6D6A",spiral:"\u87BA\u65CB",mosaic:"\u99AC\u8CFD\u514B",bricks:"\u78DA\u584A",zigzag:"\u4E4B\u5B57\u5F62",protectingDrawing:"\u6B63\u5728\u4FDD\u8B77\u7E6A\u5716...",changesDetected:"\u{1F6A8} \u5075\u6E2C\u5230 {count} \u8655\u8B8A\u66F4",repairing:"\u{1F527} \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u8B8A\u66F4\u7684\u50CF\u7D20...",repairCompleted:"\u2705 \u4FEE\u5FA9\u5B8C\u6210\uFF1A{count} \u500B\u50CF\u7D20",noChargesForRepair:"\u26A1 \u4FEE\u5FA9\u4E0D\u6D88\u8017\u9EDE\u6578\uFF0C\u7B49\u5F85\u4E2D...",protectionPriority:"\u{1F6E1}\uFE0F \u5DF2\u555F\u7528\u4FDD\u8B77\u512A\u5148",patternApplied:"\u5DF2\u5957\u7528\u6A21\u5F0F",customPattern:"\u81EA\u8A02\u6A21\u5F0F",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},farm:{title:"WPlace \u8FB2\u5834\u6A5F\u5668\u4EBA",start:"\u958B\u59CB",stop:"\u505C\u6B62",stopped:"\u6A5F\u5668\u4EBA\u5DF2\u505C\u6B62",calibrate:"\u6821\u6E96",paintOnce:"\u4E00\u6B21",checkingStatus:"\u6AA2\u67E5\u72C0\u614B\u4E2D...",configuration:"\u914D\u7F6E",delay:"\u5EF6\u9072 (\u6BEB\u79D2)",pixelsPerBatch:"\u6BCF\u6279\u50CF\u7D20",minCharges:"\u6700\u5C11\u6B21\u6578",colorMode:"\u984F\u8272\u6A21\u5F0F",random:"\u96A8\u6A5F",fixed:"\u56FA\u5B9A",range:"\u7BC4\u570D",fixedColor:"\u56FA\u5B9A\u984F\u8272",advanced:"\u9AD8\u7D1A",tileX:"\u74E6\u7247 X",tileY:"\u74E6\u7247 Y",customPalette:"\u81EA\u5B9A\u7FA9\u8ABF\u8272\u677F",paletteExample:"\u4F8B\u5982: #FF0000,#00FF00,#0000FF",capture:"\u6355\u7372",painted:"\u5DF2\u7E6A\u88FD",charges:"\u6B21\u6578",retries:"\u91CD\u8A66",tile:"\u74E6\u7247",configSaved:"\u914D\u7F6E\u5DF2\u4FDD\u5B58",configLoaded:"\u914D\u7F6E\u5DF2\u52A0\u8F09",configReset:"\u914D\u7F6E\u5DF2\u91CD\u7F6E",captureInstructions:"\u8ACB\u624B\u52D5\u7E6A\u88FD\u4E00\u500B\u50CF\u7D20\u4EE5\u6355\u7372\u5EA7\u6A19...",backendOnline:"\u5F8C\u7AEF\u5728\u7DDA",backendOffline:"\u5F8C\u7AEF\u96E2\u7DDA",startingBot:"\u6B63\u5728\u5553\u52D5\u6A5F\u5668\u4EBA...",stoppingBot:"\u6B63\u5728\u505C\u6B62\u6A5F\u5668\u4EBA...",calibrating:"\u6821\u6E96\u4E2D...",alreadyRunning:"\u81EA\u52D5\u8FB2\u5834\u5DF2\u5728\u904B\u884C\u3002",imageRunningWarning:"\u81EA\u52D5\u7E6A\u5716\u6B63\u5728\u904B\u884C\uFF0C\u8ACB\u5148\u95DC\u9589\u518D\u5553\u52D5\u81EA\u52D5\u8FB2\u5834\u3002",selectPosition:"\u9078\u64C7\u5340\u57DF",selectPositionAlert:"\u{1F3AF} \u5728\u5730\u5716\u7684\u7A7A\u767D\u5340\u57DF\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",waitingPosition:"\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",positionSet:"\u2705 \u5340\u57DF\u8A2D\u7F6E\u6210\u529F\uFF01\u534A\u5F91: 500px",positionTimeout:"\u274C \u5340\u57DF\u9078\u64C7\u8D85\u6642",missingPosition:"\u274C \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF08\u4F7F\u7528\u201C\u9078\u64C7\u5340\u57DF\u201D\u6309\u9215\uFF09",farmRadius:"\u8FB2\u5834\u534A\u5F91",positionInfo:"\u7576\u524D\u5340\u57DF",farmingInRadius:"\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F91 {radius}px \u5728 ({x},{y}) \u8FB2\u5834",selectEmptyArea:"\u26A0\uFE0F \u91CD\u8981: \u8ACB\u9078\u64C7\u7A7A\u767D\u5340\u57DF\u4EE5\u907F\u514D\u885D\u7A81",noPosition:"\u672A\u9078\u64C7\u5340\u57DF",currentZone:"\u5340\u57DF: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF0C\u5728\u5730\u5716\u4E0A\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"},common:{yes:"\u662F",no:"\u5426",ok:"\u78BA\u8A8D",cancel:"\u53D6\u6D88",close:"\u95DC\u9589",save:"\u4FDD\u5B58",load:"\u52A0\u8F09",delete:"\u522A\u9664",edit:"\u7DE8\u8F2F",start:"\u958B\u59CB",stop:"\u505C\u6B62",pause:"\u66AB\u505C",resume:"\u7E7C\u7E8C",reset:"\u91CD\u7F6E",settings:"\u8A2D\u7F6E",help:"\u5E6B\u52A9",about:"\u95DC\u65BC",language:"\u8A9E\u8A00",loading:"\u52A0\u8F09\u4E2D...",error:"\u932F\u8AA4",success:"\u6210\u529F",warning:"\u8B66\u544A",info:"\u4FE1\u606F",languageChanged:"\u8A9E\u8A00\u5DF2\u5207\u63DB\u70BA {language}"},guard:{title:"WPlace \u81EA\u52D5\u5B88\u8B77",initBot:"\u521D\u59CB\u5316\u5B88\u8B77\u6A5F\u5668\u4EBA",selectArea:"\u9078\u64C7\u5340\u57DF",captureArea:"\u6355\u7372\u5340\u57DF",startProtection:"\u958B\u59CB\u5B88\u8B77",stopProtection:"\u505C\u6B62\u5B88\u8B77",upperLeft:"\u5DE6\u4E0A\u89D2",lowerRight:"\u53F3\u4E0B\u89D2",protectedPixels:"\u53D7\u4FDD\u8B77\u50CF\u7D20",detectedChanges:"\u6AA2\u6E2C\u5230\u7684\u8B8A\u5316",repairedPixels:"\u4FEE\u5FA9\u7684\u50CF\u7D20",charges:"\u6B21\u6578",waitingInit:"\u7B49\u5F85\u521D\u59CB\u5316...",checkingColors:"\u{1F3A8} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",noColorsFound:"\u274C \u672A\u627E\u5230\u984F\u8272\uFF0C\u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u3002",colorsFound:"\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",initSuccess:"\u2705 \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",initError:"\u274C \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u5931\u6557",invalidCoords:"\u274C \u5EA7\u6A19\u7121\u6548",invalidArea:"\u274C \u5340\u57DF\u7121\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u9808\u5C0F\u65BC\u53F3\u4E0B\u89D2",areaTooLarge:"\u274C \u5340\u57DF\u904E\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",capturingArea:"\u{1F4F8} \u6355\u7372\u5B88\u8B77\u5340\u57DF\u4E2D...",areaCaptured:"\u2705 \u5340\u57DF\u6355\u7372\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u8B77",captureError:"\u274C \u6355\u7372\u5340\u57DF\u51FA\u932F: {error}",captureFirst:"\u274C \u8ACB\u5148\u6355\u7372\u4E00\u500B\u5B88\u8B77\u5340\u57DF",protectionStarted:"\u{1F6E1}\uFE0F \u5B88\u8B77\u5DF2\u5553\u52D5 - \u5340\u57DF\u76E3\u63A7\u4E2D",protectionStopped:"\u23F9\uFE0F \u5B88\u8B77\u5DF2\u505C\u6B62",noChanges:"\u2705 \u5340\u57DF\u5B89\u5168 - \u672A\u6AA2\u6E2C\u5230\u8B8A\u5316",changesDetected:"\u{1F6A8} \u6AA2\u6E2C\u5230 {count} \u500B\u8B8A\u5316",repairing:"\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20...",repairedSuccess:"\u2705 \u5DF2\u6210\u529F\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20",repairError:"\u274C \u4FEE\u5FA9\u51FA\u932F: {error}",noCharges:"\u26A0\uFE0F \u6B21\u6578\u4E0D\u8DB3\uFF0C\u7121\u6CD5\u4FEE\u5FA9",checkingChanges:"\u{1F50D} \u6B63\u5728\u6AA2\u67E5\u5340\u57DF\u8B8A\u5316...",errorChecking:"\u274C \u6AA2\u67E5\u51FA\u932F: {error}",guardActive:"\u{1F6E1}\uFE0F \u5B88\u8B77\u4E2D - \u5340\u57DF\u53D7\u4FDD\u8B77",lastCheck:"\u4E0A\u6B21\u6AA2\u67E5: {time}",nextCheck:"\u4E0B\u6B21\u6AA2\u67E5: {time} \u79D2\u5F8C",autoInitializing:"\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",autoInitSuccess:"\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",autoInitFailed:"\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",manualInitRequired:"\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",paletteDetected:"\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",paletteNotFound:"\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",clickingPaintButton:"\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",paintButtonNotFound:"\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",selectUpperLeft:"\u{1F3AF} \u5728\u9700\u8981\u4FDD\u8B77\u5340\u57DF\u7684\u5DE6\u4E0A\u89D2\u5857\u4E00\u500B\u50CF\u7D20",selectLowerRight:"\u{1F3AF} \u73FE\u5728\u5728\u53F3\u4E0B\u89D2\u5857\u4E00\u500B\u50CF\u7D20",waitingUpperLeft:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u5DE6\u4E0A\u89D2...",waitingLowerRight:"\u{1F446} \u7B49\u5F85\u9078\u64C7\u53F3\u4E0B\u89D2...",upperLeftCaptured:"\u2705 \u5DF2\u6355\u7372\u5DE6\u4E0A\u89D2: ({x}, {y})",lowerRightCaptured:"\u2705 \u5DF2\u6355\u7372\u53F3\u4E0B\u89D2: ({x}, {y})",selectionTimeout:"\u274C \u9078\u64C7\u8D85\u6642",selectionError:"\u274C \u9078\u64C7\u51FA\u932F\uFF0C\u8ACB\u91CD\u8A66",logWindow:"\u{1F4CB} Logs",logWindowTitle:"\u65E5\u8A8C\u8996\u7A97",downloadLogs:"\u4E0B\u8F09\u65E5\u8A8C",clearLogs:"\u6E05\u9664\u65E5\u8A8C",closeLogs:"\u95DC\u9589"}}});function vt(){let e=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return ee[e]?e:"es"}function Ct(){return null}function ke(){let o=Ct(),e=vt(),a="es";return o&&ee[o]?a=o:e&&ee[e]&&(a=e),Et(a),a}function Et(o){if(!ee[o]){console.warn(`Idioma '${o}' no disponible. Usando '${pe}'`);return}pe=o,ne=ee[o],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:o,translations:ne}}))}function ot(){return pe}function S(o,e={}){let a=o.split("."),r=ne;for(let i of a)if(r&&typeof r=="object"&&i in r)r=r[i];else return console.warn(`Clave de traducci\xF3n no encontrada: '${o}'`),o;return typeof r!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${o}'`),o):Lt(r,e)}function Lt(o,e){return!e||Object.keys(e).length===0?o:o.replace(/\{(\w+)\}/g,(a,r)=>e[r]!==void 0?e[r]:a)}function Te(o){return ne[o]?ne[o]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${o}'`),{})}var ee,pe,ne,me=D(()=>{He();Ve();Ke();Qe();tt();it();ee={es:Ge,en:je,fr:Ze,ru:Je,zhHans:et,zhHant:at},pe="es",ne=ee[pe];ke()});var j,t,re=D(()=>{me();j={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}},t={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:j.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:j.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:9999,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0,protectionEnabled:!0,smartVerification:!0,paintPattern:"linear_start",drawnPixelsMap:new Map,lastProtectionCheck:0}});var Fe={};Ue(Fe,{PAINT_PATTERNS:()=>F,applyPaintPattern:()=>ze,getPatternName:()=>_e,sortPixelsByPattern:()=>dt});function _e(o){return{[F.LINEAR_START]:"Lineal (Inicio)",[F.LINEAR_END]:"Lineal (Final)",[F.RANDOM]:"Aleatorio",[F.CENTER_OUT]:"Centro hacia afuera",[F.CORNERS_FIRST]:"Esquinas primero",[F.SPIRAL]:"Espiral"}[o]||o}function dt(o,e,a,r){if(!o||o.length===0)return o;s(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${_e(e)} (${o.length} p\xEDxeles)`);let i=[...o];switch(e){case F.LINEAR_START:return ct(i);case F.LINEAR_END:return Xt(i);case F.RANDOM:return qt(i);case F.CENTER_OUT:return Ut(i,a,r);case F.CORNERS_FIRST:return Gt(i,a,r);case F.SPIRAL:return Ht(i,a,r);default:return s(`\u26A0\uFE0F Patr\xF3n desconocido: ${e}, usando linear_start`),ct(i)}}function ct(o){return o.sort((e,a)=>{let r=e.imageY!==void 0?e.imageY:e.y,i=a.imageY!==void 0?a.imageY:a.y,n=e.imageX!==void 0?e.imageX:e.x,g=a.imageX!==void 0?a.imageX:a.x;return r!==i?r-i:n-g})}function Xt(o){return o.sort((e,a)=>{let r=e.imageY!==void 0?e.imageY:e.y,i=a.imageY!==void 0?a.imageY:a.y,n=e.imageX!==void 0?e.imageX:e.x,g=a.imageX!==void 0?a.imageX:a.x;return r!==i?i-r:g-n})}function qt(o){for(let e=o.length-1;e>0;e--){let a=Math.floor(Math.random()*(e+1));[o[e],o[a]]=[o[a],o[e]]}return o}function Ut(o,e,a){let r=e/2,i=a/2;return o.sort((n,g)=>{let c=n.imageX!==void 0?n.imageX:n.x,p=n.imageY!==void 0?n.imageY:n.y,l=g.imageX!==void 0?g.imageX:g.x,d=g.imageY!==void 0?g.imageY:g.y,u=Math.sqrt(Math.pow(c-r,2)+Math.pow(p-i,2)),m=Math.sqrt(Math.pow(l-r,2)+Math.pow(d-i,2));return u-m})}function Gt(o,e,a){let r=[{x:0,y:0},{x:e-1,y:0},{x:0,y:a-1},{x:e-1,y:a-1}];return o.sort((i,n)=>{let g=i.imageX!==void 0?i.imageX:i.x,c=i.imageY!==void 0?i.imageY:i.y,p=n.imageX!==void 0?n.imageX:n.x,l=n.imageY!==void 0?n.imageY:n.y,d=Math.min(...r.map(m=>Math.sqrt(Math.pow(g-m.x,2)+Math.pow(c-m.y,2)))),u=Math.min(...r.map(m=>Math.sqrt(Math.pow(p-m.x,2)+Math.pow(l-m.y,2))));return d-u})}function Ht(o,e,a){let r=new Map,i=0,n=0,g=e-1,c=0,p=a-1;for(;n<=g&&c<=p;){for(let l=n;l<=g;l++)r.set(`${l},${c}`,i++);c++;for(let l=c;l<=p;l++)r.set(`${g},${l}`,i++);if(g--,c<=p){for(let l=g;l>=n;l--)r.set(`${l},${p}`,i++);p--}if(n<=g){for(let l=p;l>=c;l--)r.set(`${n},${l}`,i++);n++}}return o.sort((l,d)=>{let u=l.imageX!==void 0?l.imageX:l.x,m=l.imageY!==void 0?l.imageY:l.y,b=d.imageX!==void 0?d.imageX:d.x,P=d.imageY!==void 0?d.imageY:d.y,h=r.get(`${u},${m}`)||Number.MAX_SAFE_INTEGER,x=r.get(`${b},${P}`)||Number.MAX_SAFE_INTEGER;return h-x})}function ze(o,e,a){if(!o||o.length===0)return o;let r=(a==null?void 0:a.width)||100,i=(a==null?void 0:a.height)||100,n=dt(o,e,r,i);return s(`\u2705 Patr\xF3n aplicado: ${_e(e)} a ${n.length} p\xEDxeles`),n}var F,we=D(()=>{R();F={LINEAR_START:"linear_start",LINEAR_END:"linear_end",RANDOM:"random",CENTER_OUT:"center_out",CORNERS_FIRST:"corners_first",SPIRAL:"spiral"}});var ht={};Ue(ht,{clearProgress:()=>Ye,exportForGuard:()=>oa,getProgressInfo:()=>We,hasProgress:()=>Oe,loadProgress:()=>De,saveProgress:()=>ye});function ia(){return t.imageData?t.imageData.processor&&typeof t.imageData.processor.generatePixelQueue=="function"?t.imageData.processor.generatePixelQueue():t.imageData.pixels?t.imageData.pixels:null:null}function oa(o=null){try{if(!t.imageData||t.drawnPixelsMap.size===0)throw new Error("No hay p\xEDxeles dibujados para exportar a Guard");let e=Array.from(t.drawnPixelsMap.values()),a=Number.MAX_SAFE_INTEGER,r=Number.MIN_SAFE_INTEGER,i=Number.MAX_SAFE_INTEGER,n=Number.MIN_SAFE_INTEGER;for(let m of e){let b=m.tileX*1e3+m.localX,P=m.tileY*1e3+m.localY;a=Math.min(a,b),r=Math.max(r,b),i=Math.min(i,P),n=Math.max(n,P)}let g={version:"2.0-guard",timestamp:Date.now(),source:"Auto-Image",originalProject:{name:t.originalImageName,totalPixels:t.totalPixels,paintedPixels:t.paintedPixels},protectionArea:{x1:a,y1:i,x2:r+1,y2:n+1,width:r-a+1,height:n-i+1,pixelCount:e.length},originalPixels:e.map(m=>{let b=m.tileX*1e3+m.localX,P=m.tileY*1e3+m.localY;return{key:`${b},${P}`,globalX:b,globalY:P,localX:m.localX,localY:m.localY,tileX:m.tileX,tileY:m.tileY,colorId:m.color.id,r:m.color.r||255,g:m.color.g||255,b:m.color.b||255,paintedAt:m.paintedAt||Date.now()}}),colors:t.availableColors.map(m=>({id:m.id,r:m.r,g:m.g,b:m.b})),guardConfig:{pixelsPerBatch:10,minChargesToWait:20,checkInterval:1e4}},c=JSON.stringify(g,null,2),p=new window.Blob([c],{type:"application/json"}),l=o||`wplace_guard_${t.originalImageName||"drawing"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,d=window.URL.createObjectURL(p),u=document.createElement("a");return u.href=d,u.download=l,document.body.appendChild(u),u.click(),document.body.removeChild(u),window.URL.revokeObjectURL(d),s(`\u2705 Datos exportados para Auto-Guard: ${l}`),s(`\u{1F4CA} \xC1rea de protecci\xF3n: (${a},${i}) a (${r},${n}) - ${e.length} p\xEDxeles`),{success:!0,filename:l,pixelCount:e.length}}catch(e){return s("\u274C Error exportando para Guard:",e),{success:!1,error:e.message}}}function ye(o=null){try{if(!t.imageData||t.paintedPixels===0)throw new Error("No hay progreso para guardar");let e={version:"2.0",timestamp:Date.now(),imageData:{width:t.imageData.width,height:t.imageData.height,originalName:t.originalImageName,fullPixelData:ia()},progress:{paintedPixels:t.paintedPixels,totalPixels:t.totalPixels,lastPosition:{...t.lastPosition}},position:{startPosition:{...t.startPosition},tileX:t.tileX,tileY:t.tileY},config:{pixelsPerBatch:t.pixelsPerBatch,useAllChargesFirst:t.useAllChargesFirst,isFirstBatch:t.isFirstBatch,maxCharges:t.maxCharges,protectionEnabled:t.protectionEnabled,paintPattern:t.paintPattern},colors:t.availableColors.map(c=>({id:c.id,r:c.r,g:c.g,b:c.b})),remainingPixels:t.remainingPixels||[],drawnPixels:Array.from(t.drawnPixelsMap.values()),protection:{enabled:t.protectionEnabled,lastCheck:t.lastProtectionCheck}},a=JSON.stringify(e,null,2),r=new window.Blob([a],{type:"application/json"}),i=o||`wplace_progress_${t.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,n=window.URL.createObjectURL(r),g=document.createElement("a");return g.href=n,g.download=i,document.body.appendChild(g),g.click(),document.body.removeChild(g),window.URL.revokeObjectURL(n),s(`\u2705 Progreso guardado: ${i}`),{success:!0,filename:i}}catch(e){return s("\u274C Error guardando progreso:",e),{success:!1,error:e.message}}}async function De(o){return new Promise(e=>{try{let a=new window.FileReader;a.onload=r=>{try{let i=JSON.parse(r.target.result),g=["imageData","progress","position","colors"].filter(p=>!(p in i));if(g.length>0)throw new Error(`Campos requeridos faltantes: ${g.join(", ")}`);let c=i.version||"1.0";if(s(`\u{1F4C1} Cargando progreso versi\xF3n ${c}`),t.availableColors.length>0){let p=i.colors.map(u=>u.id),l=t.availableColors.map(u=>u.id);p.filter(u=>l.includes(u)).length<p.length*.8&&s("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}if(t.imageData={...i.imageData,pixels:[]},t.paintedPixels=i.progress.paintedPixels,t.totalPixels=i.progress.totalPixels,i.progress.lastPosition?t.lastPosition=i.progress.lastPosition:i.position.lastX!==void 0&&i.position.lastY!==void 0&&(t.lastPosition={x:i.position.lastX,y:i.position.lastY}),i.position.startPosition?t.startPosition=i.position.startPosition:i.position.startX!==void 0&&i.position.startY!==void 0&&(t.startPosition={x:i.position.startX,y:i.position.startY}),t.tileX=i.position.tileX,t.tileY=i.position.tileY,t.originalImageName=i.imageData.originalName,t.remainingPixels=i.remainingPixels||i.progress.remainingPixels||[],i.config&&(t.pixelsPerBatch=i.config.pixelsPerBatch||t.pixelsPerBatch,t.useAllChargesFirst=i.config.useAllChargesFirst!==void 0?i.config.useAllChargesFirst:t.useAllChargesFirst,t.isFirstBatch=t.useAllChargesFirst?!0:i.config.isFirstBatch!==void 0?i.config.isFirstBatch:!1,s(`\u{1F4C1} Progreso cargado - useAllChargesFirst: ${t.useAllChargesFirst}, isFirstBatch: ${t.isFirstBatch}`),t.maxCharges=i.config.maxCharges||t.maxCharges,c>="2.0"&&(t.protectionEnabled=i.config.protectionEnabled!==void 0?i.config.protectionEnabled:!0,t.paintPattern=i.config.paintPattern||"linear_start")),c>="2.0"&&i.drawnPixels){t.drawnPixelsMap.clear();for(let p of i.drawnPixels){let l=`${p.imageX},${p.imageY}`;t.drawnPixelsMap.set(l,p)}s(`\u2705 Cargados ${i.drawnPixels.length} p\xEDxeles dibujados para protecci\xF3n`),i.protection&&(t.protectionEnabled=i.protection.enabled!==void 0?i.protection.enabled:!0,t.lastProtectionCheck=i.protection.lastCheck||0)}else t.drawnPixelsMap.clear(),s("\u{1F4C1} Archivo v1.0 detectado, protecci\xF3n se activar\xE1 al continuar pintado");if(t.paintPattern&&t.paintPattern!=="linear_start"&&t.remainingPixels.length>0)try{Promise.resolve().then(()=>(we(),Fe)).then(({applyPaintPattern:p})=>{t.remainingPixels=p(t.remainingPixels,t.paintPattern,t.imageData),s(`\u{1F3A8} Patr\xF3n de pintado aplicado: ${t.paintPattern}`)}).catch(p=>{s("\u26A0\uFE0F Error aplicando patr\xF3n de pintado:",p)})}catch(p){s("\u26A0\uFE0F Error cargando m\xF3dulo de patrones:",p)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),t.startPosition&&t.tileX!==void 0&&t.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:t.tileX,tileY:t.tileY,pxX:t.startPosition.x,pxY:t.startPosition.y}),s(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${t.tileX},${t.tileY}) local(${t.startPosition.x},${t.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch}),s(`\u2705 Plan overlay activado con ${t.remainingPixels.length} p\xEDxeles restantes`))}catch(p){s("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",p)}t.imageLoaded=!0,t.colorsChecked=!0,s(`\u2705 Progreso cargado (v${c}): ${t.paintedPixels}/${t.totalPixels} p\xEDxeles`),c>="2.0"&&s(`\u{1F6E1}\uFE0F Protecci\xF3n: ${t.protectionEnabled?"habilitada":"deshabilitada"}, Patr\xF3n: ${t.paintPattern}`),e({success:!0,data:i,painted:t.paintedPixels,total:t.totalPixels,canContinue:t.remainingPixels.length>0,version:c})}catch(i){s("\u274C Error parseando archivo de progreso:",i),e({success:!1,error:i.message})}},a.onerror=()=>{let r="Error leyendo archivo";s("\u274C",r),e({success:!1,error:r})},a.readAsText(o)}catch(a){s("\u274C Error cargando progreso:",a),e({success:!1,error:a.message})}})}function Ye(){t.paintedPixels=0,t.totalPixels=0,t.lastPosition={x:0,y:0},t.remainingPixels=[],t.imageData=null,t.startPosition=null,t.imageLoaded=!1,t.originalImageName=null,t.isFirstBatch=!0,t.nextBatchCooldown=0,t.drawnPixelsMap.clear(),t.lastProtectionCheck=0,s("\u{1F9F9} Progreso limpiado")}function Oe(){return t.imageLoaded&&t.paintedPixels>0&&t.remainingPixels&&t.remainingPixels.length>0}function We(){return{hasProgress:Oe(),painted:t.paintedPixels,total:t.totalPixels,remaining:t.remainingPixels?t.remainingPixels.length:0,percentage:t.totalPixels>0?t.paintedPixels/t.totalPixels*100:0,lastPosition:{...t.lastPosition},canContinue:Oe()}}var Xe=D(()=>{R();re()});R();re();R();R();var W=class o{static _rgbToLab(e,a,r){let i=w=>(w/=255,w<=.04045?w/12.92:Math.pow((w+.055)/1.055,2.4)),n=i(e),g=i(a),c=i(r),p=n*.4124+g*.3576+c*.1805,l=n*.2126+g*.7152+c*.0722,d=n*.0193+g*.1192+c*.9505;p/=.95047,l/=1,d/=1.08883;let u=w=>w>.008856?Math.cbrt(w):7.787*w+16/116,m=u(p),b=u(l),P=u(d),h=116*b-16,x=500*(m-b),f=200*(b-P);return[h,x,f]}static _lab(e,a,r){o._labCache||(o._labCache=new Map);let i=e<<16|a<<8|r,n=o._labCache.get(i);return n||(n=o._rgbToLab(e,a,r),o._labCache.set(i,n)),n}static findClosestPaletteColor(e,a,r,i,n={}){var u,m,b,P,h,x;if(!i||i.length===0)return null;let{useLegacyRgb:g=!1,chromaPenalty:c=0,whiteThreshold:p=240}=n;if(e>=p&&a>=p&&r>=p){let f=i.find(w=>{var E,A,k;let y=w.r||((E=w.rgb)==null?void 0:E.r)||0,v=w.g||((A=w.rgb)==null?void 0:A.g)||0,C=w.b||((k=w.rgb)==null?void 0:k.b)||0;return y>=p&&v>=p&&C>=p});if(f)return f}let l=null,d=1/0;if(g)for(let f of i){let w=f.r||((u=f.rgb)==null?void 0:u.r)||0,y=f.g||((m=f.rgb)==null?void 0:m.g)||0,v=f.b||((b=f.rgb)==null?void 0:b.b)||0,C=Math.sqrt(Math.pow(e-w,2)+Math.pow(a-y,2)+Math.pow(r-v,2));C<d&&(d=C,l=f)}else{let f=o._lab(e,a,r);for(let w of i){let y=w.r||((P=w.rgb)==null?void 0:P.r)||0,v=w.g||((h=w.rgb)==null?void 0:h.g)||0,C=w.b||((x=w.rgb)==null?void 0:x.b)||0,E=o._lab(y,v,C),A=Math.sqrt(Math.pow(f[0]-E[0],2)+Math.pow(f[1]-E[1],2)+Math.pow(f[2]-E[2],2));if(c>0){let k=Math.sqrt(f[1]*f[1]+f[2]*f[2]),I=Math.sqrt(E[1]*E[1]+E[2]*E[2]),H=Math.abs(k-I);A+=H*c}A<d&&(d=A,l=w)}}return l}static findClosestColor(e,a,r={}){return o.findClosestPaletteColor(e.r,e.g,e.b,a,r)}static clearCache(){o._labCache&&(o._labCache.clear(),s("Cach\xE9 de colores LAB limpiada"))}static getCacheStats(){return o._labCache?{size:o._labCache.size,memoryEstimate:o._labCache.size*32}:{size:0,memoryEstimate:0}}},Ea=W.findClosestColor.bind(W),La=W.findClosestPaletteColor.bind(W);R();function se(){s("\u{1F3A8} Detectando colores disponibles...");let o=document.querySelectorAll('[id^="color-"]'),e=[];for(let a of o){if(a.querySelector("svg"))continue;let r=a.id.replace("color-",""),i=parseInt(r);if(i===0)continue;let n=a.style.backgroundColor;if(n){let g=n.match(/\d+/g);if(g&&g.length>=3){let c={r:parseInt(g[0]),g:parseInt(g[1]),b:parseInt(g[2])};e.push({id:i,element:a,...c}),s(`Color detectado: id=${i}, rgb(${c.r},${c.g},${c.b})`)}}}return s(`\u2705 ${e.length} colores disponibles detectados`),e}var he=class{constructor(e){this.imageSrc=e,this.img=new window.Image,this.originalName=null,this.tileSize=1e3,this.drawMult=3,this.shreadSize=3,this.bitmap=null,this.imageWidth=0,this.imageHeight=0,this.totalPixels=0,this.requiredPixelCount=0,this.defacePixelCount=0,this.colorPalette={},this.allowedColorsSet=new Set,this.rgbToMeta=new Map,this.coords=[0,0,0,0],this.templateTiles={},this.templateTilesBuffers={},this.tilePrefixes=new Set,this.selectedColors=null}async load(){return new Promise((e,a)=>{this.img.onload=async()=>{try{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,s(`[BLUE MARBLE] Imagen cargada: ${this.imageWidth}\xD7${this.imageHeight}`),e()}catch(r){a(r)}},this.img.onerror=a,this.img.src=this.imageSrc})}initializeColorPalette(){s("[BLUE MARBLE] Inicializando paleta de colores...");let e=se(),a=e.filter(i=>i.id!==void 0&&typeof i.r=="number"&&typeof i.g=="number"&&typeof i.b=="number");this.allowedColorsSet=new Set(a.map(i=>`${i.r},${i.g},${i.b}`));let r="222,250,206";return this.allowedColorsSet.add(r),this.rgbToMeta=new Map(a.map(i=>[`${i.r},${i.g},${i.b}`,{id:i.id,premium:!!i.premium,name:i.name||`Color ${i.id}`}])),this.rgbToMeta.set(r,{id:0,premium:!1,name:"Transparent"}),s(`[BLUE MARBLE] Paleta inicializada: ${this.allowedColorsSet.size} colores permitidos`),Array.from(e)}detectSiteColors(){let e=document.querySelectorAll('[id^="color-"]'),a=[];for(let r of e){let i=r.id.replace("color-",""),n=parseInt(i);if(r.querySelector("svg")||n===0)continue;let g=r.style.backgroundColor;if(g){let c=g.match(/\d+/g);if(c&&c.length>=3){let p=[parseInt(c[0]),parseInt(c[1]),parseInt(c[2])],l={id:n,element:r,rgb:p,name:r.title||r.getAttribute("aria-label")||`Color ${n}`,premium:r.classList.contains("premium")||r.querySelector(".premium")};a.push(l)}}}return s(`[BLUE MARBLE] ${a.length} colores detectados del sitio`),a}setCoords(e,a,r,i){this.coords=[e,a,r,i]}async analyzePixels(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");try{let a=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});a.imageSmoothingEnabled=!1,a.clearRect(0,0,this.imageWidth,this.imageHeight),a.drawImage(this.bitmap,0,0);let r=a.getImageData(0,0,this.imageWidth,this.imageHeight).data,i=0,n=0,g=new Map;for(let p=0;p<this.imageHeight;p++)for(let l=0;l<this.imageWidth;l++){let d=(p*this.imageWidth+l)*4,u=r[d],m=r[d+1],b=r[d+2];if(r[d+3]===0)continue;let h=`${u},${m},${b}`;u===222&&m===250&&b===206&&n++;let x=h,f=this.allowedColorsSet.has(h);if(!f&&this.allowedColors&&this.allowedColors.length>0){let w=W.findClosestPaletteColor(u,m,b,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});w&&(x=`${w.r},${w.g},${w.b}`,f=!0)}f&&(i++,g.set(x,(g.get(x)||0)+1))}this.requiredPixelCount=i,this.defacePixelCount=n;let c={};for(let[p,l]of g.entries())c[p]={count:l,enabled:!0};return this.colorPalette=c,s(`[BLUE MARBLE] An\xE1lisis: ${i.toLocaleString()} p\xEDxeles, ${g.size} colores`),{totalPixels:this.totalPixels,requiredPixels:i,defacePixels:n,uniqueColors:g.size,colorPalette:c}}catch{return this.requiredPixelCount=Math.max(0,this.totalPixels),this.defacePixelCount=0,{totalPixels:this.totalPixels,requiredPixels:this.totalPixels,defacePixels:0,uniqueColors:0,colorPalette:{}}}}async createTemplateTiles(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");let e={},a={},r=new OffscreenCanvas(this.tileSize,this.tileSize),i=r.getContext("2d",{willReadFrequently:!0});for(let n=this.coords[3];n<this.imageHeight+this.coords[3];){let g=Math.min(this.tileSize-n%this.tileSize,this.imageHeight-(n-this.coords[3]));for(let c=this.coords[2];c<this.imageWidth+this.coords[2];){let p=Math.min(this.tileSize-c%this.tileSize,this.imageWidth-(c-this.coords[2])),l=p*this.shreadSize,d=g*this.shreadSize;r.width=l,r.height=d,i.imageSmoothingEnabled=!1,i.clearRect(0,0,l,d),i.drawImage(this.bitmap,c-this.coords[2],n-this.coords[3],p,g,0,0,p*this.shreadSize,g*this.shreadSize);let u=i.getImageData(0,0,l,d);for(let h=0;h<d;h++)for(let x=0;x<l;x++){let f=(h*l+x)*4;if(u.data[f]===222&&u.data[f+1]===250&&u.data[f+2]===206)(x+h)%2===0?(u.data[f]=0,u.data[f+1]=0,u.data[f+2]=0):(u.data[f]=255,u.data[f+1]=255,u.data[f+2]=255),u.data[f+3]=32;else if(x%this.shreadSize!==1||h%this.shreadSize!==1)u.data[f+3]=0;else{let w=u.data[f],y=u.data[f+1],v=u.data[f+2];this.allowedColorsSet.has(`${w},${y},${v}`)||(u.data[f+3]=0)}}i.putImageData(u,0,0);let m=`${(this.coords[0]+Math.floor(c/1e3)).toString().padStart(4,"0")},${(this.coords[1]+Math.floor(n/1e3)).toString().padStart(4,"0")},${(c%1e3).toString().padStart(3,"0")},${(n%1e3).toString().padStart(3,"0")}`;e[m]=await createImageBitmap(r),this.tilePrefixes.add(m.split(",").slice(0,2).join(","));let P=await(await r.convertToBlob()).arrayBuffer();a[m]=P,c+=p}n+=g}return this.templateTiles=e,this.templateTilesBuffers=a,s(`[BLUE MARBLE] ${Object.keys(e).length} tiles creados`),{templateTiles:e,templateTilesBuffers:a}}generatePixelQueue(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");let e=[],a=this.coords[0]*1e3+(this.coords[2]||0),r=this.coords[1]*1e3+(this.coords[3]||0),n=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});n.imageSmoothingEnabled=!1,n.drawImage(this.bitmap,0,0);let g=n.getImageData(0,0,this.imageWidth,this.imageHeight).data;for(let c=0;c<this.imageHeight;c++)for(let p=0;p<this.imageWidth;p++){let l=(c*this.imageWidth+p)*4,d=g[l],u=g[l+1],m=g[l+2],b=g[l+3];if(b===0||d===222&&u===250&&m===206)continue;let P=`${d},${u},${m}`,h=P,x=d,f=u,w=m,y=this.allowedColorsSet.has(P);if(!y&&this.allowedColors&&this.allowedColors.length>0){let B=W.findClosestPaletteColor(d,u,m,this.allowedColors,{useLegacyRgb:!1,whiteThreshold:240});B&&(x=B.r,f=B.g,w=B.b,h=`${x},${f},${w}`,y=!0)}if(!y)continue;let v=a+p,C=r+c,E=Math.floor(v/1e3),A=Math.floor(C/1e3),k=v%1e3,I=C%1e3,H=this.rgbToMeta.get(h)||{id:0,name:"Unknown"};e.push({imageX:p,imageY:c,globalX:v,globalY:C,tileX:E,tileY:A,localX:k,localY:I,color:{r:x,g:f,b:w,id:H.id,name:H.name},originalColor:{r:x,g:f,b:w,alpha:b}})}return s(`[BLUE MARBLE] Cola: ${e.length} p\xEDxeles`),e}async resize(e,a,r=!0){if(!this.img)throw new Error("Imagen no cargada. Llama a load() primero.");let i=this.img.width,n=this.img.height;if(r){let l=i/n;e/a>l?e=a*l:a=e/l}let g=document.createElement("canvas");g.width=e,g.height=a;let c=g.getContext("2d");c.imageSmoothingEnabled=!1,c.drawImage(this.img,0,0,e,a);let p=g.toDataURL();return this.img.src=p,this.imageSrc=p,await new Promise(l=>{this.img.onload=async()=>{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,l()}}),s(`[BLUE MARBLE] Imagen redimensionada: ${i}\xD7${n} \u2192 ${this.imageWidth}\xD7${this.imageHeight}`),{width:this.imageWidth,height:this.imageHeight}}getImageData(){return{width:this.imageWidth,height:this.imageHeight,totalPixels:this.totalPixels,requiredPixels:this.requiredPixelCount,defacePixels:this.defacePixelCount,colorPalette:this.colorPalette,coords:[...this.coords],originalName:this.originalName||"image.png",pixels:this.generatePixelQueue()}}generatePreview(e=200,a=200){if(!this.img)return null;let r=document.createElement("canvas"),i=r.getContext("2d"),{width:n,height:g}=this.img,c=n/g,p,l;return e/a>c?(l=a,p=a*c):(p=e,l=e/c),r.width=p,r.height=l,i.imageSmoothingEnabled=!1,i.drawImage(this.img,0,0,p,l),r.toDataURL()}getDimensions(){return{width:this.imageWidth,height:this.imageHeight}}setSelectedColors(e){this.selectedColors=e,e&&e.length>0?(this.allowedColorsSet=new Set(e.map(a=>a.id)),this.colorPalette={},e.forEach(a=>{this.colorPalette[a.id]=a.rgb}),s(`\u{1F3A8} [BLUE MARBLE] Paleta actualizada con ${e.length} colores seleccionados`),this.imageDataCache=null):s("\u{1F3A8} [BLUE MARBLE] Usando todos los colores disponibles")}};R();var U=o=>new Promise(e=>setTimeout(e,o));R();var Z=null,Ie=0,$e=!1,le=null,nt=new Promise(o=>{le=o}),St=24e4,V=null,X=null,fe=null,Be=null,z=null;function xe(o){le&&(le(o),le=null),Z=o,Ie=Date.now()+St,s("\u2705 Turnstile token set successfully")}function ce(){return Z&&Date.now()<Ie}function rt(){Z=null,Ie=0,s("\u{1F5D1}\uFE0F Token invalidated, will force fresh generation")}async function K(o=!1){if(ce()&&!o)return Z;if(o&&rt(),$e)return s("\u{1F504} Token generation already in progress, waiting..."),await Y(2e3),ce()?Z:null;$e=!0;try{s("\u{1F504} Token expired or missing, generating new one...");let e=await At();if(e&&e.length>20)return xe(e),s("\u2705 Token captured and cached successfully"),e;s("\u26A0\uFE0F Invisible Turnstile failed, forcing browser automation...");let a=await Ft();return a&&a.length>20?(xe(a),s("\u2705 Fallback token captured successfully"),a):(s("\u274C All token generation methods failed"),null)}finally{$e=!1}}async function At(){let o=Date.now();try{let e=zt();s("\u{1F511} Generating Turnstile token for sitekey:",e),typeof window!="undefined"&&window.navigator&&s("\u{1F9ED} UA:",window.navigator.userAgent,"Platform:",window.navigator.platform);let a=await kt(e);if(a&&a.length>20){let r=Math.round(Date.now()-o);return s(`\u2705 Turnstile token generated successfully in ${r}ms`),a}else throw new Error("Invalid or empty token received")}catch(e){let a=Math.round(Date.now()-o);throw s(`\u274C Turnstile token generation failed after ${a}ms:`,e),e}}async function kt(o){return Bt(o,"paint")}async function Tt(){return window.turnstile?Promise.resolve():new Promise((o,e)=>{if(document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')){let r=()=>{window.turnstile?o():setTimeout(r,100)};return r()}let a=document.createElement("script");a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",a.async=!0,a.defer=!0,a.onload=()=>{s("\u2705 Turnstile script loaded successfully"),o()},a.onerror=()=>{s("\u274C Failed to load Turnstile script"),e(new Error("Failed to load Turnstile"))},document.head.appendChild(a)})}function $t(){return(!X||!document.body.contains(X))&&(X&&X.remove(),X=document.createElement("div"),X.style.cssText=`
      position: fixed !important;
      left: -9999px !important; /* keep off-screen for invisible mode */
      top: -9999px !important;
      width: 300px !important;
      height: 65px !important;
      pointer-events: none !important;
      opacity: 0 !important; /* do not use visibility:hidden to avoid engine quirks */
      z-index: -1 !important;
    `,X.setAttribute("aria-hidden","true"),X.id="turnstile-widget-container",document.body.appendChild(X)),X}function It(){if(fe&&document.body.contains(fe))return fe;let o=document.createElement("div");o.id="turnstile-overlay-container",o.style.cssText=`
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
  `;let e=document.createElement("div");e.textContent="Cloudflare Turnstile \u2014 please complete the check if shown",e.style.cssText='font: 600 12px/1.3 "Segoe UI",sans-serif; margin-bottom: 8px; opacity: 0.9;';let a=document.createElement("div");a.id="turnstile-overlay-host",a.style.cssText="width: 100%; min-height: 70px;";let r=document.createElement("button");return r.textContent="Hide",r.style.cssText="position:absolute; top:6px; right:6px; font-size:11px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:2px 6px; cursor:pointer;",r.addEventListener("click",()=>o.remove()),o.appendChild(e),o.appendChild(a),o.appendChild(r),document.body.appendChild(o),fe=o,o}async function Bt(o,e="paint"){var r;if(await Tt(),V&&Be===o&&((r=window.turnstile)!=null&&r.execute))try{s("\u{1F504} Reusing existing Turnstile widget...");let i=await Promise.race([window.turnstile.execute(V,{action:e}),new Promise((n,g)=>setTimeout(()=>g(new Error("Execute timeout")),15e3))]);if(i&&i.length>20)return s("\u2705 Token generated via widget reuse"),i}catch(i){s("\u{1F504} Widget reuse failed, will create a fresh widget:",i.message)}let a=await Rt(o,e);return a&&a.length>20?a:(s("\u{1F440} Falling back to interactive Turnstile (visible)."),await _t(o,e))}async function Rt(o,e){return new Promise(a=>{var r;try{if(V&&((r=window.turnstile)!=null&&r.remove))try{window.turnstile.remove(V)}catch{}let i=$t();i.innerHTML="";let n=window.turnstile.render(i,{sitekey:o,action:e,size:"invisible",retry:"auto","retry-interval":8e3,callback:g=>{s("\u2705 Invisible Turnstile callback"),a(g)},"error-callback":()=>a(null),"timeout-callback":()=>a(null)});if(V=n,Be=o,!n)return a(null);Promise.race([window.turnstile.execute(n,{action:e}),new Promise((g,c)=>setTimeout(()=>c(new Error("Invisible execute timeout")),12e3))]).then(a).catch(()=>a(null))}catch(i){s("Invisible Turnstile failed:",i),a(null)}})}async function _t(o,e){return new Promise((a,r)=>{var i;try{if(V&&((i=window.turnstile)!=null&&i.remove))try{window.turnstile.remove(V)}catch{}let n=It(),g=n.querySelector("#turnstile-overlay-host");g.innerHTML="";let c=setTimeout(()=>{s("\u23F0 Interactive Turnstile timed out"),a(null)},12e4),p=window.turnstile.render(g,{sitekey:o,action:e,size:"normal",retry:"auto","retry-interval":8e3,callback:l=>{clearTimeout(c);try{n.remove()}catch{}s("\u2705 Interactive Turnstile solved"),a(l)},"error-callback":l=>{s("\u{1F6A8} Interactive Turnstile error:",l)},"timeout-callback":()=>{s("\u23F0 Turnstile timeout callback (interactive)")},"expired-callback":()=>{s("\u26A0\uFE0F Interactive Turnstile token expired")}});if(V=p,Be=o,!p){clearTimeout(c),a(null);return}}catch(n){s("\u274C Error creating interactive Turnstile widget:",n),r(n)}})}function zt(o="0x4AAAAAABpqJe8FO0N84q0F"){var e;if(z)return z;try{let a=document.querySelector("[data-sitekey]");if(a){let n=a.getAttribute("data-sitekey");if(n&&n.length>10)return z=n,s("\u{1F50D} Sitekey detected from data attribute:",n),n}let r=document.querySelector(".cf-turnstile");if((e=r==null?void 0:r.dataset)!=null&&e.sitekey&&r.dataset.sitekey.length>10)return z=r.dataset.sitekey,s("\u{1F50D} Sitekey detected from turnstile element:",z),z;if(typeof window!="undefined"&&window.__TURNSTILE_SITEKEY&&window.__TURNSTILE_SITEKEY.length>10)return z=window.__TURNSTILE_SITEKEY,s("\u{1F50D} Sitekey detected from global variable:",z),z;let i=document.querySelectorAll("script");for(let n of i){let c=(n.textContent||n.innerHTML).match(/sitekey['":\s]+(['"0-9a-zA-Z_-]{20,})/i);if(c&&c[1]&&c[1].length>10)return z=c[1].replace(/['"]/g,""),s("\u{1F50D} Sitekey detected from script content:",z),z}}catch(a){s("Error detecting sitekey:",a)}return s("\u{1F50D} Using fallback sitekey:",o),z=o,o}function Y(o){return new Promise(e=>setTimeout(e,o))}function G(o,e=200,a=1e4){return new Promise(r=>{let i=Date.now()+a,n=()=>{let g=document.querySelector(o);g?r(g):Date.now()<i?setTimeout(n,e):r(null)};n()})}async function Ft(){return new Promise((o,e)=>{(async()=>{try{s("\u{1F3AF} Starting automatic CAPTCHA solving process..."),rt(),nt=new Promise(n=>{le=n});let r=Y(3e4).then(()=>e(new Error("Auto-CAPTCHA timed out after 30 seconds."))),i=(async()=>{let n=await G("button.btn.btn-primary.btn-lg",200,3e3);if(n||(n=await G("button.btn-primary.sm\\:btn-xl",200,3e3)),n||(n=await G("button.btn-primary",200,3e3)),!n){s("\u{1F3AF} No paint button found, clicking on canvas directly to trigger CAPTCHA...");let P=await G("canvas",200,5e3);P&&(P.click(),await Y(1e3),n=await G("button.btn.btn-primary.btn-lg, button.btn-primary.sm\\:btn-xl, button.btn-primary",200,5e3))}if(!n)throw new Error("Could not find any paint button after attempts.");s("\u{1F3AF} Found paint button, clicking..."),n.click(),await Y(500),s("\u{1F3AF} Selecting transparent color...");let g=await G("button#color-0",200,5e3);if(g)g.click();else{s("\u26A0\uFE0F Could not find transparent color button, trying alternative selectors...");let P=document.querySelectorAll('button[id^="color-"]');P.length>0&&(P[0].click(),s("\u{1F3AF} Clicked first available color button"))}await Y(500),s("\u{1F3AF} Finding canvas element...");let c=await G("canvas",200,5e3);if(!c)throw new Error("Could not find the canvas element.");c.setAttribute("tabindex","0"),c.focus();let p=c.getBoundingClientRect(),l=Math.round(p.left+p.width/2),d=Math.round(p.top+p.height/2);s("\u{1F3AF} Simulating canvas interaction..."),typeof window!="undefined"&&window.MouseEvent&&window.KeyboardEvent&&(c.dispatchEvent(new window.MouseEvent("mousemove",{clientX:l,clientY:d,bubbles:!0})),c.dispatchEvent(new window.MouseEvent("mousedown",{clientX:l,clientY:d,bubbles:!0})),await Y(50),c.dispatchEvent(new window.MouseEvent("mouseup",{clientX:l,clientY:d,bubbles:!0})),c.dispatchEvent(new window.KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),await Y(50),c.dispatchEvent(new window.KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0}))),await Y(1e3),s("\u{1F3AF} Waiting for CAPTCHA challenge..."),await Y(2e3),s("\u{1F3AF} Starting confirmation loop...");let u=Date.now();(async()=>{let P=0;for(;!ce()&&Date.now()-u<25e3;){P++;let h=await G("button.btn.btn-primary.btn-lg",100,1e3);if(h||(h=await G("button.btn.btn-primary.sm\\:btn-xl",100,1e3)),!h){let x=Array.from(document.querySelectorAll("button.btn-primary"));h=x.length?x[x.length-1]:null}h&&!h.disabled?(s(`\u{1F3AF} Clicking confirmation button (attempt ${P})...`),h.click()):s(`\u{1F3AF} No active confirm button found (attempt ${P})`),await Y(800)}})();let b=await nt;await Y(500),s("\u2705 Token successfully captured through browser automation"),o(b)})();await Promise.race([i,r])}catch(r){s("\u274C Auto-CAPTCHA process failed:",r),e(r)}})()})}window.__WPA_SET_TURNSTILE_TOKEN__=function(o){o&&typeof o=="string"&&o.length>20&&(s("\u2705 Turnstile Token Captured:",o),xe(o))};(function(){if(window.__WPA_FETCH_HOOKED__)return;window.__WPA_FETCH_HOOKED__=!0;let o=window.fetch;window.fetch=async function(...e){let a=await o.apply(this,e),r=e[0]instanceof Request?e[0].url:e[0];if(typeof r=="string"&&r.includes("https://backend.wplace.live/s0/pixel/"))try{let i=JSON.parse(e[1].body);if(i.t){let n=i.t;(!ce()||Z!==n)&&(s("\u2705 Turnstile Token Captured:",n),window.postMessage({source:"turnstile-capture",token:n},"*"))}}catch{}return a},window.addEventListener("message",e=>{let{source:a,token:r}=e.data;a==="turnstile-capture"&&r&&(!ce()||Z!==r)&&xe(r)})})();R();var Re="https://backend.wplace.live";async function te(){var o,e,a;try{let r=await fetch(`${Re}/me`,{credentials:"include"}).then(c=>c.json()),i=r||null,n=(r==null?void 0:r.charges)||{},g={count:(o=n.count)!=null?o:0,max:(e=n.max)!=null?e:0,cooldownMs:(a=n.cooldownMs)!=null?a:3e4};return{success:!0,data:{user:i,charges:g.count,maxCharges:g.max,chargeRegen:g.cooldownMs}}}catch(r){return{success:!1,error:r.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function be(o,e,a,r,i){try{let n=JSON.stringify({colors:r,coords:a,t:i});s(`[API] Sending batch to tile ${o},${e} with ${r.length} pixels, token: ${i?i.substring(0,50)+"...":"null"}`);let g=await fetch(`${Re}/s0/pixel/${o}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:n});if(s(`[API] Response: ${g.status} ${g.statusText}`),g.status===403){try{await g.json()}catch{}console.error("\u274C 403 Forbidden. Turnstile token might be invalid or expired.");try{console.log("\u{1F504} Regenerating Turnstile token after 403...");let l=await K(!0);if(!l)return{status:403,json:{error:"Could not generate new token"},success:!1,painted:0};let d=JSON.stringify({colors:r,coords:a,t:l});s(`[API] Retrying with fresh token: ${l.substring(0,50)}...`);let u=await fetch(`${Re}/s0/pixel/${o}/${e}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:d});if(s(`[API] Retry response: ${u.status} ${u.statusText}`),u.status===403)return{status:403,json:{error:"Fresh token still expired or invalid after retry"},success:!1,painted:0};let m=null;try{let P=await u.text();P.trim()?m=JSON.parse(P):m={}}catch(P){s(`[API] Warning: Could not parse retry response JSON: ${P.message}`),m={}}let b=(m==null?void 0:m.painted)||0;return s(`[API] Retry result: ${b} pixels painted`),{status:u.status,json:m,success:u.ok,painted:b}}catch(l){return console.error("\u274C Token regeneration failed:",l),{status:403,json:{error:"Token regeneration failed: "+l.message},success:!1,painted:0}}}let c=null;try{let l=await g.text();l.trim()?c=JSON.parse(l):c={}}catch(l){s(`[API] Warning: Could not parse response JSON: ${l.message}`),c={}}let p=(c==null?void 0:c.painted)||0;return s(`[API] Success: ${p} pixels painted`),{status:g.status,json:c,success:g.ok,painted:p}}catch(n){return s(`[API] Network error: ${n.message}`),{status:0,json:{error:n.message},success:!1,painted:0}}}re();me();R();re();var{Image:Mt,URL:st}=window;async function Nt(o,e){try{let a=`https://backend.wplace.live/files/s0/tiles/${o}/${e}.png`,r=await fetch(a);if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.blob()}catch(a){return s(`Error obteniendo tile ${o},${e}:`,a),null}}async function Ot(o){if(!o||o.length===0)return[];s(`\u{1F50D} Verificando ${o.length} p\xEDxeles pintados para detectar cambios`);let e=[],a=new Map;for(let r of o){let i=`${r.tileX},${r.tileY}`;a.has(i)||a.set(i,[]),a.get(i).push(r)}for(let[r,i]of a){let[n,g]=r.split(",").map(Number);try{let c=await Nt(n,g);if(!c){s(`\u26A0\uFE0F No se pudo obtener tile ${n},${g} para verificaci\xF3n de protecci\xF3n`);continue}let p=new Mt,l=document.createElement("canvas"),d=l.getContext("2d");await new Promise((b,P)=>{p.onload=b,p.onerror=P,p.src=st.createObjectURL(c)}),l.width=p.width,l.height=p.height,d.drawImage(p,0,0);let m=d.getImageData(0,0,l.width,l.height).data;for(let b of i){let{localX:P,localY:h}=b;if(P>=0&&P<l.width&&h>=0&&h<l.height){let x=(h*l.width+P)*4,f=m[x],w=m[x+1],y=m[x+2];if(m[x+3]>0){let C=b.color;f===C.r&&w===C.g&&y===C.b||(e.push({imageX:b.imageX,imageY:b.imageY,localX:b.localX,localY:b.localY,tileX:b.tileX,tileY:b.tileY,originalColor:b.color,currentRGB:{r:f,g:w,b:y},paintedAt:b.paintedAt||Date.now()}),s(`\u{1F6A8} P\xEDxel alterado detectado: (${P},${h}) en tile (${n},${g}) - Original: RGB(${C.r},${C.g},${C.b}) vs Actual: RGB(${f},${w},${y})`))}}}st.revokeObjectURL(p.src)}catch(c){s(`\u274C Error analizando tile ${n},${g} para protecci\xF3n:`,c)}}return e.length>0?s(`\u{1F6A8} Detectados ${e.length} p\xEDxeles alterados que necesitan restauraci\xF3n a sus colores originales`):s("\u2705 Todos los p\xEDxeles pintados mantienen sus colores originales"),e}async function Dt(o,e){if(!o||o.length===0)return{success:!0,repaired:0};let a=Math.floor(t.currentCharges);if(a===0)return s("\u26A0\uFE0F Sin cargas disponibles para reparar, esperando recarga..."),e&&e(t.paintedPixels,t.totalPixels,"\u26A1 Sin cargas para reparar p\xEDxeles alterados, esperando..."),{success:!1,repaired:0,reason:"no_charges"};let r=Math.min(o.length,a),i=o.slice(0,r);s(`\u{1F6E0}\uFE0F Reparando ${i.length} p\xEDxeles alterados (cargas: ${a})`),e&&e(t.paintedPixels,t.totalPixels,`\u{1F6E1}\uFE0F Protegiendo dibujo: reparando ${i.length} p\xEDxeles alterados...`);let n=new Map;for(let p of i){let l=`${p.tileX},${p.tileY}`;n.has(l)||n.set(l,[]),n.get(l).push(p)}let g=0;for(let[p,l]of n){let[d,u]=p.split(",").map(Number);try{let m=[],b=[];for(let h of l)m.push(h.localX,h.localY),b.push(h.originalColor.id);let P=await Yt(d,u,m,b);P.success&&P.painted>0?(g+=P.painted,t.currentCharges=Math.max(0,t.currentCharges-P.painted),s(`\u2705 Reparados ${P.painted} p\xEDxeles en tile (${d},${u})`)):s(`\u274C Error reparando tile (${d},${u}):`,P.error)}catch(m){s(`\u274C Error reparando tile (${d},${u}):`,m)}n.size>1&&await U(300)}let c=Math.floor(t.currentCharges);return s(`\u{1F6E1}\uFE0F Protecci\xF3n completada: ${g} p\xEDxeles reparados, ${c} cargas restantes`),e&&g>0&&e(t.paintedPixels,t.totalPixels,`\u2705 Dibujo protegido: ${g} p\xEDxeles reparados`),{success:g>0,repaired:g,remainingCharges:c}}async function Yt(o,e,a,r){var i;try{let n=await K(),g=[];for(let p=0;p<a.length;p+=2){let l=(Number(a[p])%1e3+1e3)%1e3,d=(Number(a[p+1])%1e3+1e3)%1e3;Number.isFinite(l)&&Number.isFinite(d)&&g.push(l,d)}let c=await be(o,e,g,r,n);return{success:c.status===200,painted:c.painted||0,status:c.status,error:c.status===200?null:((i=c.json)==null?void 0:i.message)||"Error desconocido"}}catch(n){return{success:!1,painted:0,error:n.message}}}function Wt(){return Array.from(t.drawnPixelsMap.values())}async function lt(o){let e=Wt();if(e.length===0)return{needsProtection:!1,canContinue:!0};o&&o(t.paintedPixels,t.totalPixels,"\u{1F50D} Verificando integridad del dibujo...");let a=await Ot(e);if(a.length===0)return{needsProtection:!1,canContinue:!0};s(`\u{1F6A8} Se detectaron ${a.length} p\xEDxeles alterados de ${e.length} p\xEDxeles pintados`);let r=await Dt(a,o);return r.success?{needsProtection:!0,canContinue:!0,reason:"protection_completed",repairedCount:r.repaired,remainingCharges:r.remainingCharges}:r.reason==="no_charges"?{needsProtection:!0,canContinue:!1,reason:"no_charges_for_protection",changesCount:a.length}:{needsProtection:!0,canContinue:!0,reason:"protection_failed",changesCount:a.length}}we();var ae=null;var gt=1e4;async function jt(){ae&&window.clearInterval(ae),ae=window.setInterval(async()=>{try{if(t.remainingPixels.length>0&&!t.running){let o=await te();if(o.success&&o.data.charges>0){let e=Math.floor(o.data.charges);s(`\u{1F504} Cargas detectadas: ${e}. Continuando pintado autom\xE1ticamente...`),t.currentCharges=o.data.charges,t.maxCharges=o.data.maxCharges,window.imageBot&&typeof window.imageBot.onStartPainting=="function"&&window.imageBot.onStartPainting()}}}catch(o){s(`Error en monitoreo de cargas: ${o.message}`)}},gt),s(`\u2705 Monitoreo de cargas iniciado (cada ${gt/1e3}s)`)}function Me(){ae&&(window.clearInterval(ae),ae=null,s("\u23F9\uFE0F Monitoreo de cargas detenido"))}async function ut(o,e){let a=await te();if(a.success){let r=Math.floor(a.data.charges);return t.currentCharges=a.data.charges,t.maxCharges=a.data.maxCharges,r<o?(s(`\u23F3 Cargas insuficientes: ${r}/${o}. Esperando...`),await mt(o-r,e),await ut(o,e)):!0}return s(`\u26A0\uFE0F No se pudo verificar cargas, continuando con valor cached: ${t.currentCharges}`),t.currentCharges>=o}async function Vt(o,e){try{let a=`https://backend.wplace.live/files/s0/tiles/${o}/${e}.png`,r=await fetch(a);if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.blob()}catch(a){return s(`Error obteniendo tile para verificaci\xF3n ${o},${e}:`,a),null}}async function Zt(o,e=null){let a=e||o.length,r=[...o],i=[],n=0,g=0,c=3;for(s(`\u{1F50D} Iniciando verificaci\xF3n inteligente para lote de ${a} p\xEDxeles`);i.length<a&&r.length>0&&g<c;){g++,s(`\u{1F504} Iteraci\xF3n ${g}: verificando ${r.length} p\xEDxeles`);let p=await Pe(r),l=p.filteredBatch,d=p.skippedCount;if(i.push(...l),n+=d,s(`\u2705 Iteraci\xF3n ${g}: ${l.length} p\xEDxeles v\xE1lidos, ${d} omitidos`),i.length>=a){i=i.slice(0,a);break}let u=a-i.length;if(u>0&&t.remainingPixels.length>0){let m=t.remainingPixels.splice(0,u);r=m,s(`\u{1F504} Necesitamos ${u} p\xEDxeles m\xE1s, tomando ${m.length} adicionales`)}else break}return s(`\u{1F3AF} Verificaci\xF3n completada: ${i.length}/${a} p\xEDxeles v\xE1lidos, ${n} omitidos en ${g} iteraciones`),{filteredBatch:i,skippedCount:n,iterations:g}}async function Pe(o){let e=new Map;for(let n of o){let g=`${n.tileX},${n.tileY}`;e.has(g)||e.set(g,[]),e.get(g).push(n)}let a=[],r=[],i=0;for(let[n,g]of e){let[c,p]=n.split(",").map(Number);try{let l=await Vt(c,p);if(!l){a.push(...g);continue}let d=new window.Image,u=document.createElement("canvas"),m=u.getContext("2d"),b=null;try{b=window.URL.createObjectURL(l),await new Promise((P,h)=>{d.onload=()=>{try{u.width=d.width,u.height=d.height,m.drawImage(d,0,0);let x=m.getImageData(0,0,u.width,u.height);for(let f of g)if(f.localX>=0&&f.localX<u.width&&f.localY>=0&&f.localY<u.height){let w=(f.localY*u.width+f.localX)*4,y=x.data[w],v=x.data[w+1],C=x.data[w+2],E=f.color;y===E.r&&v===E.g&&C===E.b?(i++,r.push(f),s(`\u{1F4A1} P\xEDxel ya correcto: (${f.localX},${f.localY}) en tile (${c},${p}) - RGB actual EXACTO`)):(s(`\u{1F3AF} P\xEDxel necesita pintura: (${f.localX},${f.localY}) en tile (${c},${p}) - RGB actual != objetivo`),a.push(f))}else s(`\u26A0\uFE0F P\xEDxel fuera del tile: (${f.localX},${f.localY}) en tile (${c},${p}) de tama\xF1o ${u.width}x${u.height}`),a.push(f);P()}catch(x){h(x)}},d.onerror=x=>{s(`Error cargando imagen del tile ${n}:`,x),a.push(...g),P()},d.src=b})}finally{b&&window.URL.revokeObjectURL(b),u.width=0,u.height=0}}catch(l){s(`Error verificando tile ${n}:`,l),a.push(...g)}}return{filteredBatch:a,skippedCount:i,skippedPixels:r}}async function Kt(o,e){s(`\u{1F50E} Revalidaci\xF3n final del lote (objetivo: ${e})`);let{filteredBatch:a,skippedCount:r}=await Pe(o),i=[...a],n=r;if(i.length<e&&t.remainingPixels.length>0){let g=Math.min(e-i.length,t.remainingPixels.length),c=t.remainingPixels.splice(0,g),p=await Pe(c);i.push(...p.filteredBatch),n+=p.skippedCount,s(`\u{1F501} Relleno final: +${p.filteredBatch.length} v\xE1lidos, ${p.skippedCount} omitidos`)}return s(`\u2705 Revalidaci\xF3n final completada: ${i.length}/${e} para pintar`),{finalBatch:i,skippedAdded:n}}async function Jt(o){try{if(!t.remainingPixels||t.remainingPixels.length===0||t.__prevalidated)return;s(`\u{1F9EE} Prevalidando ${t.remainingPixels.length} p\xEDxeles antes de la primera pasada (coincidencia EXACTA)`);let{filteredBatch:e,skippedCount:a,skippedPixels:r}=await Pe(t.remainingPixels);if(a>0){t.paintedPixels+=a;for(let i of r){let n=`${i.imageX},${i.imageY}`;t.drawnPixelsMap.set(n,{imageX:i.imageX,imageY:i.imageY,localX:i.localX,localY:i.localY,tileX:i.tileX,tileY:i.tileY,color:i.color,paintedAt:Date.now(),skipped:!0})}t.remainingPixels=e,s(`\u2705 Prevalidaci\xF3n: ${a} p\xEDxeles ya correctos, ${e.length} pendientes`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch})}catch(i){s("\u26A0\uFE0F Error actualizando overlay tras prevalidaci\xF3n:",i)}if(o){let i=Math.round(t.paintedPixels/t.totalPixels*100);o(t.paintedPixels,t.totalPixels,`\u{1F4A1} ${a} p\xEDxeles ya correctos antes de iniciar - Progreso: ${i}%`)}}else s("\u2139\uFE0F Prevalidaci\xF3n: ning\xFAn p\xEDxel ya correcto");t.__prevalidated=!0}catch(e){s("\u26A0\uFE0F Error durante prevalidaci\xF3n inicial:",e)}}async function pt(o,e,a,r,i){let{width:n,height:g}=o,{x:c,y:p}=e;s(`Iniciando pintado: imagen(${n}x${g}) inicio LOCAL(${c},${p}) tile(${t.tileX},${t.tileY})`),s(`\u{1F6E1}\uFE0F Protecci\xF3n: ${t.protectionEnabled?"habilitada":"deshabilitada"}, Patr\xF3n: ${t.paintPattern}`),jt();try{s("\u{1F511} Generando token Turnstile al inicio del proceso..."),await K()?s("\u2705 Token inicial generado exitosamente"):s("\u26A0\uFE0F No se pudo generar token inicial, continuando con flujo normal")}catch(l){s("\u26A0\uFE0F Error generando token inicial:",l.message)}if(!t.remainingPixels||t.remainingPixels.length===0||t.lastPosition.x===0&&t.lastPosition.y===0){s("Generando cola de p\xEDxeles..."),t.remainingPixels=ta(o,e,t.tileX,t.tileY),t.paintPattern&&t.paintPattern!=="linear_start"&&(s(`\u{1F3A8} Aplicando patr\xF3n de pintado: ${t.paintPattern}`),t.remainingPixels=ze(t.remainingPixels,t.paintPattern,o)),(t.lastPosition.x>0||t.lastPosition.y>0)&&(t.remainingPixels=t.remainingPixels.filter(l=>{let d=l.imageY*n+l.imageX,u=t.lastPosition.y*n+t.lastPosition.x;return d>=u})),t.__prevalidated=!1,s(`Cola generada: ${t.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),t.startPosition&&t.tileX!==void 0&&t.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:t.tileX,tileY:t.tileY,pxX:t.startPosition.x,pxY:t.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch}))}catch(l){s("\u26A0\uFE0F Error actualizando plan overlay:",l)}}await Jt(a);try{for(;t.remainingPixels.length>0&&!t.stopFlag;){if(t.protectionEnabled&&t.paintedPixels>0)try{let x=await lt(a);if(x.canContinue)x.needsProtection&&(x.reason==="protection_completed"?(s(`\u{1F6E1}\uFE0F Protecci\xF3n completada: ${x.repairedCount} p\xEDxeles reparados`),t.currentCharges=x.remainingCharges||t.currentCharges):x.reason==="protection_failed"&&s(`\u26A0\uFE0F Protecci\xF3n fall\xF3, continuando con advertencia (${x.changesCount} cambios no reparados)`));else if(x.reason==="no_charges_for_protection"){s(`\u{1F6E1}\uFE0F No hay cargas suficientes para proteger ${x.changesCount} p\xEDxeles alterados, esperando...`),a&&a(t.paintedPixels,t.totalPixels,`\u{1F6E1}\uFE0F Protegiendo dibujo: esperando cargas para reparar ${x.changesCount} p\xEDxeles alterados...`),await mt(Math.min(x.changesCount,20),a);continue}}catch(x){s("\u274C Error en protecci\xF3n:",x)}let l=Math.floor(t.currentCharges),d;if(s(`\u{1F50D} Estado del primer lote - isFirstBatch: ${t.isFirstBatch}, useAllChargesFirst: ${t.useAllChargesFirst}, availableCharges: ${l}`),t.isFirstBatch&&t.useAllChargesFirst&&l>0?(d=Math.min(l,t.remainingPixels.length),t.isFirstBatch=!1,s(`\u{1F680} Primera pasada: usando ${d} cargas de ${l} disponibles`)):(d=Math.min(t.pixelsPerBatch,t.remainingPixels.length),s(`\u2699\uFE0F Pasada normal: usando ${d} p\xEDxeles (configurado: ${t.pixelsPerBatch})`)),!await ut(d,a)){s("\u26A0\uFE0F No se pudieron obtener suficientes cargas, pausando pintado");break}l=Math.floor(t.currentCharges);let m=t.remainingPixels.splice(0,d),b=m,P=0;if(s(`Verificando lote de ${m.length} p\xEDxeles...`),t.smartVerification){let x=await Zt(m,d);if(b=x.filteredBatch,P=x.skippedCount,b.length===0){if(s("\u{1F4A1} Todos los p\xEDxeles del lote ya ten\xEDan el color correcto. Continuando al siguiente lote."),t.paintedPixels+=P,a){let f=Math.round(t.paintedPixels/t.totalPixels*100);a(t.paintedPixels,t.totalPixels,`\u{1F4A1} ${P} p\xEDxeles ya correctos - Progreso: ${f}%`)}continue}s(`\u{1F3AF} Lote inteligente completado: ${b.length} p\xEDxeles para pintar (${P} omitidos, ${x.iterations} iteraciones)`)}else s(`Pintando lote de ${b.length} p\xEDxeles...`);try{let x=b.length,{finalBatch:f,skippedAdded:w}=await Kt(b,d);if(w>0&&(P+=w,s(`\u{1F50E} Revalidaci\xF3n final: ${x} -> ${f.length} p\xEDxeles; ${w} omitidos adicionales`)),b=f,b.length===0){if(s("\u{1F4A1} Todos los p\xEDxeles del lote quedaron correctos tras la revalidaci\xF3n final. Continuando..."),t.paintedPixels+=P,a){let y=Math.round(t.paintedPixels/t.totalPixels*100);a(t.paintedPixels,t.totalPixels,`\u{1F4A1} ${P} p\xEDxeles ya correctos - Progreso: ${y}%`)}continue}}catch(x){s("\u26A0\uFE0F Error en revalidaci\xF3n final del lote:",x)}try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch})}catch(x){s("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",x)}let h=await ea(b,a);if(h.success&&h.painted>0){if(t.paintedPixels+=h.painted+P,t.protectionEnabled){for(let y of b.slice(0,h.painted)){let v=`${y.imageX},${y.imageY}`;t.drawnPixelsMap.set(v,{imageX:y.imageX,imageY:y.imageY,localX:y.localX,localY:y.localY,tileX:y.tileX,tileY:y.tileY,color:y.color,paintedAt:Date.now()})}if(t.smartVerification&&P>0){let y=m.filter(v=>!b.some(C=>C.imageX===v.imageX&&C.imageY===v.imageY));for(let v of y){let C=`${v.imageX},${v.imageY}`;t.drawnPixelsMap.set(C,{imageX:v.imageX,imageY:v.imageY,localX:v.localX,localY:v.localY,tileX:v.tileX,tileY:v.tileY,color:v.color,paintedAt:Date.now(),skipped:!0})}}}if(t.currentCharges=Math.max(0,t.currentCharges-h.painted),s(`Cargas despu\xE9s del lote: ${t.currentCharges.toFixed(1)} (consumidas: ${h.painted})`),t.currentCharges=Math.max(0,t.currentCharges-h.painted),s(`Cargas despu\xE9s del lote: ${t.currentCharges.toFixed(1)} (consumidas: ${h.painted})`),b.length>0){let y=b[b.length-1];t.lastPosition={x:y.imageX,y:y.imageY}}s(`Lote exitoso: ${h.painted}/${b.length} p\xEDxeles pintados. Total: ${t.paintedPixels}/${t.totalPixels}`);let x=aa(),f=(t.paintedPixels/t.totalPixels*100).toFixed(1),w=S("image.passCompleted",{painted:h.painted,percent:f,current:t.paintedPixels,total:t.totalPixels});a&&a(t.paintedPixels,t.totalPixels,w,x),await U(2e3)}else h.shouldContinue?s("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(t.remainingPixels.unshift(...b),s("Lote fall\xF3: reintentando en 5 segundos..."),await U(5e3));await U(500)}if(t.stopFlag)s(`Pintado pausado en p\xEDxel imagen(${t.lastPosition.x},${t.lastPosition.y})`),r&&r(!1,t.paintedPixels);else{s(`Pintado completado: ${t.paintedPixels} p\xEDxeles pintados`),t.lastPosition={x:0,y:0},t.remainingPixels=[],Me();try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),s("\u2705 Plan overlay limpiado al completar pintado"))}catch(l){s("\u26A0\uFE0F Error limpiando plan overlay:",l)}r&&r(!0,t.paintedPixels)}}catch(l){s("Error en proceso de pintado:",l),Me(),i&&i(l)}}async function Qt(o){var e;try{if(!o||o.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let a=new Map;for(let n of o){let g=`${n.tileX},${n.tileY}`;a.has(g)||a.set(g,{coords:[],colors:[],tx:n.tileX,ty:n.tileY});let c=a.get(g);c.coords.push(n.localX,n.localY),c.colors.push(n.color.id||n.color.value||1)}let r=await K(),i=0;for(let{coords:n,colors:g,tx:c,ty:p}of a.values()){if(g.length===0)continue;let l=[];for(let m=0;m<n.length;m+=2){let b=(Number(n[m])%1e3+1e3)%1e3,P=(Number(n[m+1])%1e3+1e3)%1e3;Number.isFinite(b)&&Number.isFinite(P)&&l.push(b,P)}try{let m=999,b=0,P=999,h=0;for(let x=0;x<l.length;x+=2){let f=l[x],w=l[x+1];f<m&&(m=f),f>b&&(b=f),w<P&&(P=w),w>h&&(h=w)}s(`[IMG] Enviando tile ${c},${p}: ${g.length} px | x:[${m},${b}] y:[${P},${h}]`)}catch{}let d=await be(c,p,l,g,r);if(d.status!==200)return{success:!1,painted:i,error:((e=d.json)==null?void 0:e.message)||`HTTP ${d.status}`,status:d.status};let u=d.painted||0;if(u===0&&g.length>0)return s(`\u26A0\uFE0F API devolvi\xF3 200 OK pero painted=0 para ${g.length} p\xEDxeles en tile ${c},${p}`),{success:!1,painted:i,error:`API devolvi\xF3 painted=0 para ${g.length} p\xEDxeles`,status:200,shouldRetry:!0};i+=u,s(`\u2705 Tile ${c},${p}: ${u}/${g.length} p\xEDxeles pintados exitosamente`)}return{success:!0,painted:i}}catch(a){return s("Error en paintPixelBatch:",a),{success:!1,painted:0,error:a.message}}}async function ea(o,e){for(let n=1;n<=5;n++)try{let g=await Qt(o);if(g.success)return t.retryCount=0,g;if(t.retryCount=n,n<5){let c=3e3*Math.pow(2,n-1),p=Math.round(c/1e3),l;g.status===0||g.status==="NetworkError"?l=S("image.networkError"):g.status>=500?l=S("image.serverError"):g.status===408?l=S("image.timeoutError"):l=S("image.retryAttempt",{attempt:n,maxAttempts:5,delay:p}),e&&e(t.paintedPixels,t.totalPixels,l),s(`Reintento ${n}/5 despu\xE9s de ${p}s. Error: ${g.error}`),await U(c)}}catch(g){if(s(`Error en intento ${n}:`,g),t.retryCount=n,n<5){let c=3e3*Math.pow(2,n-1),p=Math.round(c/1e3),l=S("image.retryError",{attempt:n,maxAttempts:5,delay:p});e&&e(t.paintedPixels,t.totalPixels,l),await U(c)}}t.retryCount=5;let i=S("image.retryFailed",{maxAttempts:5});return e&&e(t.paintedPixels,t.totalPixels,i),s("Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function mt(o,e){let r=j.CHARGE_REGEN_MS*o+5e3;if(s(`Esperando ${Math.round(r/1e3)}s para obtener ${o} cargas`),t.inCooldown=!0,t.cooldownEndTime=Date.now()+r,t.nextBatchCooldown=Math.round(r/1e3),e){let i=Math.floor(r/6e4),n=Math.floor(r%6e4/1e3),g=i>0?`${i}m ${n}s`:`${n}s`,c=S("image.waitingChargesRegen",{current:Math.floor(t.currentCharges),needed:o,time:g});e(t.paintedPixels,t.totalPixels,c)}for(let i=Math.round(r/1e3);i>0&&!t.stopFlag;i--){if(t.nextBatchCooldown=i,e&&(i%5===0||i<=10||i===Math.round(r/1e3))){let n=Math.floor(i/60),g=i%60,c=n>0?`${n}m ${g}s`:`${g}s`,p=S("image.waitingChargesCountdown",{current:Math.floor(t.currentCharges),needed:o,time:c});e(t.paintedPixels,t.totalPixels,p)}await U(1e3)}t.inCooldown=!1,t.nextBatchCooldown=0,t.currentCharges=Math.min(t.maxCharges||9999,t.currentCharges+r/j.CHARGE_REGEN_MS)}function ta(o,e,a,r){let{pixels:i}=o,{x:n,y:g}=e,c=[];if(!Array.isArray(i))return s(`\u274C Error: pixels no es un array iterable. Tipo: ${typeof i}`,i),[];for(let p of i){if(!p)continue;let l=p.imageX!==void 0?p.imageX:p.x,d=p.imageY!==void 0?p.imageY:p.y,u=p.color!==void 0?p.color:p.targetColor;if(l===void 0||d===void 0){s("\u26A0\uFE0F P\xEDxel con coordenadas inv\xE1lidas:",p);continue}let m=n+l,b=g+d,P=Math.floor(m/1e3),h=Math.floor(b/1e3),x=a+P,f=r+h,w=(m%1e3+1e3)%1e3,y=(b%1e3+1e3)%1e3;c.push({imageX:l,imageY:d,localX:w,localY:y,tileX:x,tileY:f,color:u,originalColor:p.originalColor})}return s(`Cola de p\xEDxeles generada: ${c.length} p\xEDxeles para pintar`),c}function aa(){if(!t.remainingPixels||t.remainingPixels.length===0)return 0;let o=t.remainingPixels.length,e=t.pixelsPerBatch,a=j.CHARGE_REGEN_MS/1e3,r=Math.ceil(o/e),i=e*a,n=(r-1)*i,g=r*2;return Math.ceil(n+g)}function Ne(){t.stopFlag=!0,t.running=!1,Me(),s("\u{1F6D1} Deteniendo proceso de pintado...")}Xe();R();function ve(o=null){let e=document.createElement("div");o&&(e.id=o),e.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let a=e.attachShadow({mode:"open"});return document.body.appendChild(e),{host:e,root:a}}function Ce(o,e){let a=0,r=0,i=0,n=0;o.style.cursor="move",o.addEventListener("mousedown",g);function g(l){l.target.closest(".header-btn, .wplace-header-btn")||(l.preventDefault(),i=l.clientX,n=l.clientY,document.addEventListener("mouseup",p),document.addEventListener("mousemove",c))}function c(l){l.preventDefault(),a=i-l.clientX,r=n-l.clientY,i=l.clientX,n=l.clientY,e.style.top=e.offsetTop-r+"px",e.style.left=e.offsetLeft-a+"px"}function p(){document.removeEventListener("mouseup",p),document.removeEventListener("mousemove",c)}}R();var Ee=class{constructor(e="Bot"){this.botName=e,this.isVisible=!1,this.logs=[],this.maxLogs=1e3,this.container=null,this.logContent=null,this.isResizing=!1,this.resizeHandle=null,this.originalConsole={},this.config={width:600,height:400,x:window.innerWidth-620,y:20,visible:!1},this.loadConfig(),this.createWindow(),this.setupLogInterception(),this.setupEventListeners()}loadConfig(){try{let e=localStorage.getItem(`wplace-log-window-${this.botName}`);e&&(this.config={...this.config,...JSON.parse(e)})}catch(e){s("Error cargando configuraci\xF3n de ventana de logs:",e)}}saveConfig(){try{localStorage.setItem(`wplace-log-window-${this.botName}`,JSON.stringify(this.config))}catch(e){s("Error guardando configuraci\xF3n de ventana de logs:",e)}}createWindow(){this.container=document.createElement("div"),this.container.className="wplace-log-window",this.container.style.cssText=`
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
    `;let r=document.createElement("div");r.style.cssText=`
      display: flex;
      gap: 8px;
    `;let i=document.createElement("button");i.innerHTML="\u{1F4BE}",i.title="Descargar logs",i.style.cssText=`
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
    `,i.addEventListener("mouseenter",()=>{i.style.background="rgba(34, 197, 94, 1)"}),i.addEventListener("mouseleave",()=>{i.style.background="rgba(34, 197, 94, 0.8)"}),i.addEventListener("click",()=>this.downloadLogs());let n=document.createElement("button");n.innerHTML="\u2715",n.title="Cerrar ventana",n.style.cssText=`
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
    `,n.addEventListener("mouseenter",()=>{n.style.background="rgba(239, 68, 68, 1)"}),n.addEventListener("mouseleave",()=>{n.style.background="rgba(239, 68, 68, 0.8)"}),n.addEventListener("click",()=>this.hide()),r.appendChild(i),r.appendChild(n),e.appendChild(a),e.appendChild(r),this.logContent=document.createElement("div"),this.logContent.className="log-window-content",this.logContent.style.cssText=`
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
    `,this.container.appendChild(e),this.container.appendChild(this.logContent),this.container.appendChild(this.resizeHandle),document.body.appendChild(this.container),this.setupDragging(e),this.setupResizing(),this.isVisible=this.config.visible}setupDragging(e){let a=!1,r={x:0,y:0};e.addEventListener("mousedown",g=>{g.target.tagName!=="BUTTON"&&(a=!0,r.x=g.clientX-this.container.offsetLeft,r.y=g.clientY-this.container.offsetTop,document.addEventListener("mousemove",i),document.addEventListener("mouseup",n),g.preventDefault())});let i=g=>{if(!a)return;let c=Math.max(0,Math.min(window.innerWidth-this.container.offsetWidth,g.clientX-r.x)),p=Math.max(0,Math.min(window.innerHeight-this.container.offsetHeight,g.clientY-r.y));this.container.style.left=c+"px",this.container.style.top=p+"px",this.config.x=c,this.config.y=p},n=()=>{a=!1,document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",n),this.saveConfig()}}setupResizing(){let e=!1,a,r,i,n;this.resizeHandle.addEventListener("mousedown",p=>{e=!0,a=p.clientX,r=p.clientY,i=parseInt(document.defaultView.getComputedStyle(this.container).width,10),n=parseInt(document.defaultView.getComputedStyle(this.container).height,10),document.addEventListener("mousemove",g),document.addEventListener("mouseup",c),p.preventDefault()});let g=p=>{if(!e)return;let l=Math.max(300,i+p.clientX-a),d=Math.max(200,n+p.clientY-r);this.container.style.width=l+"px",this.container.style.height=d+"px",this.config.width=l,this.config.height=d},c=()=>{e=!1,document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",c),this.saveConfig()}}setupLogInterception(){this.originalConsole={log:console.log,info:console.info,warn:console.warn,error:console.error,debug:console.debug},console.log=(...e)=>{this.originalConsole.log.apply(console,e),this.addLog("log",e)},console.info=(...e)=>{this.originalConsole.info.apply(console,e),this.addLog("info",e)},console.warn=(...e)=>{this.originalConsole.warn.apply(console,e),this.addLog("warn",e)},console.error=(...e)=>{this.originalConsole.error.apply(console,e),this.addLog("error",e)},console.debug=(...e)=>{this.originalConsole.debug.apply(console,e),this.addLog("debug",e)}}addLog(e,a){let r=new Date().toLocaleTimeString(),i=a.map(g=>typeof g=="object"?JSON.stringify(g,null,2):String(g)).join(" "),n={timestamp:r,type:e,message:i,raw:a};this.logs.push(n),this.logs.length>this.maxLogs&&this.logs.shift(),this.isVisible&&this.updateLogDisplay()}updateLogDisplay(){if(!this.logContent)return;let e=this.logs.map(a=>`<div style="color: ${this.getLogColor(a.type)}; margin-bottom: 2px;">[${a.timestamp}] ${a.message}</div>`).join("");this.logContent.innerHTML=e,this.logContent.scrollTop=this.logContent.scrollHeight}getLogColor(e){let a={log:"#e2e8f0",info:"#60a5fa",warn:"#fbbf24",error:"#f87171",debug:"#a78bfa"};return a[e]||a.log}downloadLogs(){let e=new Date,a=e.toISOString().split("T")[0],r=e.toTimeString().split(" ")[0].replace(/:/g,"-"),i=`log_${this.botName}_${a}_${r}.log`,n=this.logs.map(l=>`[${l.timestamp}] [${l.type.toUpperCase()}] ${l.message}`).join(`
`),g=new Blob([n],{type:"text/plain"}),c=URL.createObjectURL(g),p=document.createElement("a");p.href=c,p.download=i,document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(c),s(`\u{1F4E5} Logs descargados como: ${i}`)}show(){this.container&&(this.container.style.display="flex",this.isVisible=!0,this.config.visible=!0,this.updateLogDisplay(),this.saveConfig())}hide(){this.container&&(this.container.style.display="none",this.isVisible=!1,this.config.visible=!1,this.saveConfig())}toggle(){this.isVisible?this.hide():this.show()}clear(){this.logs=[],this.logContent&&(this.logContent.innerHTML="")}setupEventListeners(){window.addEventListener("resize",()=>{if(this.container){let e=window.innerWidth-this.container.offsetWidth,a=window.innerHeight-this.container.offsetHeight;this.config.x>e&&(this.config.x=Math.max(0,e),this.container.style.left=this.config.x+"px"),this.config.y>a&&(this.config.y=Math.max(0,a),this.container.style.top=this.config.y+"px"),this.saveConfig()}})}destroy(){this.originalConsole.log&&(console.log=this.originalConsole.log,console.info=this.originalConsole.info,console.warn=this.originalConsole.warn,console.error=this.originalConsole.error,console.debug=this.originalConsole.debug),this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container=null,this.logContent=null,this.logs=[]}};window.__wplaceLogWindows=window.__wplaceLogWindows||{};function qe(o){return window.__wplaceLogWindows[o]||(window.__wplaceLogWindows[o]=new Ee(o)),window.__wplaceLogWindows[o]}R();var J={0:{id:1,name:"Black",rgb:{r:0,g:0,b:0}},1:{id:2,name:"Dark Gray",rgb:{r:60,g:60,b:60}},2:{id:3,name:"Gray",rgb:{r:120,g:120,b:120}},3:{id:4,name:"Light Gray",rgb:{r:210,g:210,b:210}},4:{id:5,name:"White",rgb:{r:255,g:255,b:255}},5:{id:6,name:"Deep Red",rgb:{r:96,g:0,b:24}},6:{id:7,name:"Red",rgb:{r:237,g:28,b:36}},7:{id:8,name:"Orange",rgb:{r:255,g:127,b:39}},8:{id:9,name:"Gold",rgb:{r:246,g:170,b:9}},9:{id:10,name:"Yellow",rgb:{r:249,g:221,b:59}},10:{id:11,name:"Light Yellow",rgb:{r:255,g:250,b:188}},11:{id:12,name:"Dark Green",rgb:{r:14,g:185,b:104}},12:{id:13,name:"Green",rgb:{r:19,g:230,b:123}},13:{id:14,name:"Light Green",rgb:{r:135,g:255,b:94}},14:{id:15,name:"Dark Teal",rgb:{r:12,g:129,b:110}},15:{id:16,name:"Teal",rgb:{r:16,g:174,b:166}},16:{id:17,name:"Light Teal",rgb:{r:19,g:225,b:190}},17:{id:20,name:"Cyan",rgb:{r:96,g:247,b:242}},18:{id:44,name:"Light Cyan",rgb:{r:187,g:250,b:242}},19:{id:18,name:"Dark Blue",rgb:{r:40,g:80,b:158}},20:{id:19,name:"Blue",rgb:{r:64,g:147,b:228}},21:{id:21,name:"Indigo",rgb:{r:107,g:80,b:246}},22:{id:22,name:"Light Indigo",rgb:{r:153,g:177,b:251}},23:{id:23,name:"Dark Purple",rgb:{r:120,g:12,b:153}},24:{id:24,name:"Purple",rgb:{r:170,g:56,b:185}},25:{id:25,name:"Light Purple",rgb:{r:224,g:159,b:249}},26:{id:26,name:"Dark Pink",rgb:{r:203,g:0,b:122}},27:{id:27,name:"Pink",rgb:{r:236,g:31,b:128}},28:{id:28,name:"Light Pink",rgb:{r:243,g:141,b:169}},29:{id:29,name:"Dark Brown",rgb:{r:104,g:70,b:52}},30:{id:30,name:"Brown",rgb:{r:149,g:104,b:42}},31:{id:31,name:"Beige",rgb:{r:248,g:178,b:119}},32:{id:52,name:"Light Beige",rgb:{r:255,g:197,b:165}},33:{id:32,name:"Medium Gray",rgb:{r:170,g:170,b:170}},34:{id:33,name:"Dark Red",rgb:{r:165,g:14,b:30}},35:{id:34,name:"Light Red",rgb:{r:250,g:128,b:114}},36:{id:35,name:"Dark Orange",rgb:{r:228,g:92,b:26}},37:{id:37,name:"Dark Goldenrod",rgb:{r:156,g:132,b:49}},38:{id:38,name:"Goldenrod",rgb:{r:197,g:173,b:49}},39:{id:39,name:"Light Goldenrod",rgb:{r:232,g:212,b:95}},40:{id:40,name:"Dark Olive",rgb:{r:74,g:107,b:58}},41:{id:41,name:"Olive",rgb:{r:90,g:148,b:74}},42:{id:42,name:"Light Olive",rgb:{r:132,g:197,b:115}},43:{id:43,name:"Dark Cyan",rgb:{r:15,g:121,b:159}},44:{id:45,name:"Light Blue",rgb:{r:125,g:199,b:255}},45:{id:46,name:"Dark Indigo",rgb:{r:77,g:49,b:184}},46:{id:47,name:"Dark Slate Blue",rgb:{r:74,g:66,b:132}},47:{id:48,name:"Slate Blue",rgb:{r:122,g:113,b:196}},48:{id:49,name:"Light Slate Blue",rgb:{r:181,g:174,b:241}},49:{id:53,name:"Dark Peach",rgb:{r:155,g:82,b:73}},50:{id:54,name:"Peach",rgb:{r:209,g:128,b:120}},51:{id:55,name:"Light Peach",rgb:{r:250,g:182,b:164}},52:{id:50,name:"Light Brown",rgb:{r:219,g:164,b:99}},53:{id:56,name:"Dark Tan",rgb:{r:123,g:99,b:82}},54:{id:57,name:"Tan",rgb:{r:156,g:132,b:107}},55:{id:36,name:"Light Tan",rgb:{r:214,g:181,b:148}},56:{id:51,name:"Dark Beige",rgb:{r:209,g:128,b:81}},57:{id:61,name:"Dark Stone",rgb:{r:109,g:100,b:63}},58:{id:62,name:"Stone",rgb:{r:148,g:140,b:107}},59:{id:63,name:"Light Stone",rgb:{r:205,g:197,b:158}},60:{id:58,name:"Dark Slate",rgb:{r:51,g:57,b:65}},61:{id:59,name:"Slate",rgb:{r:109,g:117,b:141}},62:{id:60,name:"Light Slate",rgb:{r:179,g:185,b:209}},63:{id:0,name:"Transparent",rgb:null}};function ft(){s("\u{1F4CA} Creando ventana de estad\xEDsticas de pintado");let{host:o,root:e}=ve(),a=document.createElement("style");a.textContent=`
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
  `,e.appendChild(a);let r=document.createElement("div");r.className="stats-container",r.innerHTML=`
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
  `,e.appendChild(r);let i={container:r,header:r.querySelector(".header"),refreshBtnHeader:r.querySelector(".refresh-btn-header"),closeBtn:r.querySelector(".close-btn"),userStats:r.querySelector(".user-stats"),imageStats:r.querySelector(".image-stats"),colorsStats:r.querySelector(".colors-stats"),refreshBtn:r.querySelector(".refresh-btn")};Ce(i.header,r);let n=!1,g=null;i.closeBtn.addEventListener("click",()=>{p()}),i.refreshBtnHeader.addEventListener("click",()=>{g&&g()}),i.refreshBtn.addEventListener("click",()=>{g&&g()});function c(){r.style.display="block",n=!0,s("\u{1F4CA} Ventana de estad\xEDsticas mostrada")}function p(){r.style.display="none",n=!1,s("\u{1F4CA} Ventana de estad\xEDsticas ocultada")}function l(){n?p():c()}function d(h){if(!h){i.userStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u274C No se pudo obtener informaci\xF3n del usuario</div>
        </div>
      `;return}let x="";if(h.username&&(x+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F464} Usuario</div>
          <div class="stat-value">${h.username}</div>
        </div>
      `),h.charges!==void 0&&(x+=`
        <div class="stat-item">
          <div class="stat-label">\u26A1 Cargas</div>
          <div class="stat-value">${Math.floor(h.charges)} / ${h.maxCharges||"N/A"}</div>
        </div>
      `),h.pixels!==void 0&&(x+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F533} P\xEDxeles Pintados</div>
          <div class="stat-value">${h.pixels.toLocaleString()}</div>
        </div>
      `),h.cooldown!==void 0&&h.cooldown>0){let f=Math.floor(h.cooldown/60),w=h.cooldown%60,y=f>0?`${f}m ${w}s`:`${w}s`;x+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Cooldown</div>
          <div class="stat-value">${y}</div>
        </div>
      `}i.userStats.innerHTML=x||`
      <div class="stat-item">
        <div class="stat-label">\u2139\uFE0F Informaci\xF3n no disponible</div>
      </div>
    `}function u(h){if(!h||!h.loaded){i.imageStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4F7} No hay imagen cargada</div>
        </div>
      `;return}let x=h.totalPixels>0?Math.round(h.paintedPixels/h.totalPixels*100):0,f=`
      <div class="stat-item">
        <div class="stat-label">\u{1F4CA} Progreso</div>
        <div class="stat-value">${x}%</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${x}%"></div>
      </div>
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} P\xEDxeles</div>
        <div class="stat-value">${h.paintedPixels}/${h.totalPixels}</div>
      </div>
    `;if(h.estimatedTime!==void 0&&h.estimatedTime>0){let w=Math.floor(h.estimatedTime/3600),y=Math.floor(h.estimatedTime%3600/60),v=w>0?`${w}h ${y}m`:`${y}m`;f+=`
        <div class="stat-item">
          <div class="stat-label">\u23F0 Tiempo Estimado</div>
          <div class="stat-value">${v}</div>
        </div>
      `}h.originalName&&(f+=`
        <div class="stat-item">
          <div class="stat-label">\u{1F4C1} Archivo</div>
          <div class="stat-value">${h.originalName}</div>
        </div>
      `),i.imageStats.innerHTML=f}function m(h){if(!h||h.length===0){i.colorsStats.innerHTML=`
        <div class="stat-item">
          <div class="stat-label">\u274C Abra la paleta de colores en el sitio</div>
        </div>
      `;return}let x=Object.values(J).filter(v=>v.rgb!==null),f=new Set(h.map(v=>v.id)),w=`
      <div class="stat-item">
        <div class="stat-label">\u2705 Colores Disponibles</div>
        <div class="stat-value">${h.length}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">\u{1F4CA} Total de Colores</div>
        <div class="stat-value">${x.length}</div>
      </div>
      <div class="colors-grid">
    `;h.forEach(v=>{let C=J[Object.keys(J).find(I=>J[I].id===v.id)],E=C?C.name:`Color ${v.id}`,k=`rgb(${(v.rgb||[0,0,0]).join(",")})`;w+=`
        <div class="color-swatch" style="background-color: ${k};" title="${E} (ID: ${v.id})">
          <div class="color-info">${E}</div>
        </div>
      `}),x.filter(v=>!f.has(v.id)).forEach(v=>{let E=`rgb(${[v.rgb.r,v.rgb.g,v.rgb.b].join(",")})`;w+=`
        <div class="color-swatch unavailable" style="background-color: ${E};" title="${v.name} (ID: ${v.id}) - No disponible">
          <div class="color-info">${v.name} (No disponible)</div>
        </div>
      `}),w+="</div>",i.colorsStats.innerHTML=w}function b(h){g=h}function P(){o.remove()}return s("\u2705 Ventana de estad\xEDsticas de pintado creada"),{show:c,hide:p,toggle:l,updateUserStats:d,updateImageStats:u,updateColorsStats:m,setRefreshCallback:b,destroy:P,isVisible:()=>n}}R();function xt(o,e=[]){s("\u{1F3A8} Creando selector de paleta de colores");let a=document.createElement("div");a.className="wplace-section",a.id="color-palette-section",a.style.marginTop="15px",a.innerHTML=`
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
  `;let r=document.createElement("style");r.textContent=`
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
  `;let i=o.getRootNode&&o.getRootNode();i&&i.nodeType===11&&i.host?i.querySelector("#color-palette-styles")||(r.id="color-palette-styles",i.appendChild(r)):document.head.querySelector("#color-palette-styles")||(r.id="color-palette-styles",document.head.appendChild(r)),o.appendChild(a);let g={showAllToggle:a.querySelector("#showAllColorsToggle"),selectAllBtn:a.querySelector("#selectAllBtn"),unselectAllBtn:a.querySelector("#unselectAllBtn"),colorsContainer:a.querySelector("#colors-container")},c=new Set,p=!1,l=null;function d(){c.clear(),g.colorsContainer.querySelectorAll(".wplace-color-swatch.active").forEach(w=>{let y=parseInt(w.dataset.colorId);isNaN(y)||c.add(y)}),l&&l(Array.from(c))}function u(f,w=!1){g.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(v=>{let C=v.classList.contains("unavailable"),E=parseInt(v.dataset.colorId);(!C||w)&&(C||(v.classList.toggle("active",f),f?c.add(E):c.delete(E)))}),d(),s(`\u{1F3A8} ${f?"Seleccionados":"Deseleccionados"} todos los colores disponibles`)}function m(f=!1){if(g.colorsContainer.innerHTML="",!e||e.length===0){g.colorsContainer.innerHTML='<div style="text-align: center; color: #888; padding: 20px;">Upload an image first to capture available colors</div>';return}let w=0,y=0;Object.values(J).filter(E=>E.rgb!==null).forEach(E=>{let{id:A,name:k,rgb:I}=E,H=`${I.r},${I.g},${I.b}`;y++;let B=e.some(T=>T.r===I.r&&T.g===I.g&&T.b===I.b);if(!f&&!B)return;B&&w++;let Q=document.createElement("div");Q.className="wplace-color-item";let _=document.createElement("button");_.className=`wplace-color-swatch ${B?"":"unavailable"}`,_.title=`${k} (ID: ${A})${B?"":" (Unavailable)"}`,_.dataset.rgb=H,_.dataset.colorId=A,_.style.backgroundColor=`rgb(${I.r}, ${I.g}, ${I.b})`,B||(_.disabled=!0);let de=c.size===0?B:c.has(A);_.classList.toggle("active",de),de?c.add(A):c.delete(A);let L=document.createElement("span");L.className="wplace-color-item-name",L.textContent=k+(B?"":" (N/A)"),B||(L.style.color="#888",L.style.fontStyle="italic"),B&&_.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let $=_.classList.contains("active");_.classList.toggle("active",!$),$?c.delete(A):c.add(A),d(),s(`\u{1F3A8} Color ${k} (ID: ${A}) ${$?"deseleccionado":"seleccionado"}`)}),Q.appendChild(_),Q.appendChild(L),g.colorsContainer.appendChild(Q)}),g.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(E=>{let A=parseInt(E.dataset.colorId),k=c.has(A);E.classList.toggle("active",k)}),d()}g.showAllToggle.addEventListener("change",f=>{p=f.target.checked,m(p)}),g.selectAllBtn.addEventListener("click",()=>{u(!0,p)}),g.unselectAllBtn.addEventListener("click",()=>{u(!1,p)}),m(!1);function b(f){e=f||[],m(p)}function P(){return Array.from(c)}function h(f){c=new Set(f||[]),g.colorsContainer.querySelectorAll(".wplace-color-swatch").forEach(y=>{let v=parseInt(y.dataset.colorId),C=c.has(v);y.classList.toggle("active",C)}),l&&l(Array.from(c))}function x(f){l=f}return s("\u2705 Selector de paleta de colores creado"),{updateAvailableColors:b,getSelectedColors:P,setSelectedColors:h,onSelectionChange:x,element:a}}async function bt({texts:o,...e}){if(s("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let L=document.createElement("link");L.rel="stylesheet",L.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(L),s("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:a,root:r}=ve(),i=document.createElement("style");i.textContent=`
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
  `,r.appendChild(i);let n=document.createElement("div");n.className="container",n.innerHTML=`
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
          <label>
            <input class="config-checkbox protection-enabled" type="checkbox" checked>
            \u{1F6E1}\uFE0F Protecci\xF3n del dibujo
          </label>
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox smart-verification" type="checkbox" checked>
            \u{1F4A1} Verificaci\xF3n inteligente
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
        <button class="btn btn-secondary log-window-btn" data-state="initial,load-progress,upload-image">
          \u{1F4CB}
          <span>${o.logWindow||"Logs"}</span>
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
        <button class="btn btn-load export-guard-btn" data-state="load-progress" style="background: #8b5cf6; display: none;">
          \u{1F6E1}\uFE0F
          <span>Exportar para Guard</span>
        </button>
        
        <!-- Flujo de subida de imagen -->
        <button class="btn btn-load export-guard-btn-upload" data-state="upload-image" style="background: #8b5cf6; display: none;">
          \u{1F6E1}\uFE0F
          <span>Exportar para Guard</span>
        </button>
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
    </div>
  `,r.appendChild(n);let g=document.createElement("input");g.type="file",g.accept="image/png,image/jpeg",g.style.display="none",r.appendChild(g);let c=document.createElement("input");c.type="file",c.accept=".json",c.style.display="none",r.appendChild(c);let p=document.createElement("div");p.className="resize-overlay",r.appendChild(p);let l=document.createElement("div");l.className="resize-container",l.innerHTML=`
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
  `,r.appendChild(l);let d={header:n.querySelector(".header"),configBtn:n.querySelector(".config-btn"),minimizeBtn:n.querySelector(".minimize-btn"),configPanel:n.querySelector(".config-panel"),pixelsPerBatch:n.querySelector(".pixels-per-batch"),useAllCharges:n.querySelector(".use-all-charges"),protectionEnabled:n.querySelector(".protection-enabled"),smartVerification:n.querySelector(".smart-verification"),paintPattern:n.querySelector(".paint-pattern"),showOverlay:n.querySelector(".show-overlay"),batchValue:n.querySelector(".batch-value"),cooldownValue:n.querySelector(".cooldown-value"),initBtn:n.querySelector(".init-btn"),uploadBtn:n.querySelector(".upload-btn"),loadProgressBtn:n.querySelector(".load-progress-btn"),loadProgressBtnFlow:n.querySelector(".load-progress-btn-flow"),exportGuardBtn:n.querySelector(".export-guard-btn"),exportGuardBtnUpload:n.querySelector(".export-guard-btn-upload"),resizeBtn:n.querySelector(".resize-btn"),selectPosBtn:n.querySelector(".select-pos-btn"),startBtn:n.querySelector(".start-btn"),startBtnUpload:n.querySelector(".start-btn-upload"),stopBtn:n.querySelector(".stop-btn"),stopBtnUpload:n.querySelector(".stop-btn-upload"),statsBtn:n.querySelector(".stats-btn"),logWindowBtn:n.querySelector(".log-window-btn"),progressBar:n.querySelector(".progress-bar"),statsArea:n.querySelector(".stats-area"),status:n.querySelector(".status"),content:n.querySelector(".content")},u={overlay:p,container:l,widthSlider:l.querySelector(".width-slider"),heightSlider:l.querySelector(".height-slider"),widthValue:l.querySelector(".width-value"),heightValue:l.querySelector(".height-value"),keepAspect:l.querySelector(".keep-aspect"),preview:l.querySelector(".resize-preview"),confirmBtn:l.querySelector(".confirm-resize"),cancelBtn:l.querySelector(".cancel-resize")},m={minimized:!1,configVisible:!1};Ce(d.header,n),d.minimizeBtn.addEventListener("click",()=>{m.minimized=!m.minimized,m.minimized?(n.classList.add("minimized"),d.minimizeBtn.innerHTML="\u{1F53C}"):(n.classList.remove("minimized"),d.minimizeBtn.innerHTML="\u{1F53D}")}),d.configBtn.addEventListener("click",()=>{m.configVisible=!m.configVisible,m.configVisible?(d.configPanel.classList.add("visible"),d.configBtn.innerHTML="\u274C"):(d.configPanel.classList.remove("visible"),d.configBtn.innerHTML="\u2699\uFE0F")}),d.pixelsPerBatch.addEventListener("change",()=>{let L=parseInt(d.pixelsPerBatch.value)||20;d.batchValue.textContent=L,e.onConfigChange&&e.onConfigChange({pixelsPerBatch:L})}),d.useAllCharges.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({useAllCharges:d.useAllCharges.checked})}),d.protectionEnabled.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({protectionEnabled:d.protectionEnabled.checked})}),d.smartVerification.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({smartVerification:d.smartVerification.checked})}),d.paintPattern.addEventListener("change",()=>{e.onConfigChange&&e.onConfigChange({paintPattern:d.paintPattern.value})});function b(L){n.querySelectorAll("[data-state]").forEach(N=>{N.style.display="none"}),n.querySelectorAll(`[data-state*="${L}"]`).forEach(N=>{N.style.display="flex"}),s(`\u{1F504} Estado cambiado a: ${L}`)}function P(){}d.initBtn.addEventListener("click",async()=>{d.initBtn.disabled=!0,e.onInitBot&&await e.onInitBot()&&void 0,d.initBtn.disabled=!1}),d.uploadBtn.addEventListener("click",()=>{g.click()}),g.addEventListener("change",async()=>{g.files.length>0&&e.onUploadImage&&await e.onUploadImage(g.files[0])&&b("upload-image")}),d.loadProgressBtn.addEventListener("click",()=>{c.click()}),c.addEventListener("change",async()=>{c.files.length>0&&e.onLoadProgress&&await e.onLoadProgress(c.files[0])&&b("load-progress")}),d.loadProgressBtnFlow.addEventListener("click",()=>{c.click()}),d.resizeBtn.addEventListener("click",()=>{e.onResizeImage&&e.onResizeImage()}),d.exportGuardBtn.addEventListener("click",()=>{e.onExportGuard&&e.onExportGuard()}),d.exportGuardBtnUpload.addEventListener("click",()=>{e.onExportGuard&&e.onExportGuard()});let h=async(L,T)=>{e.onSelectPosition&&(L.disabled=!0,await e.onSelectPosition()&&T&&(T.disabled=!1),L.disabled=!1)};d.selectPosBtn.addEventListener("click",()=>{h(d.selectPosBtn,d.startBtnUpload)}),d.showOverlay.addEventListener("change",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let L=d.showOverlay.checked;window.__WPA_PLAN_OVERLAY__.setEnabled(L)});let x=async(L,T)=>{e.onStartPainting&&(L.disabled=!0,T.disabled=!1,await e.onStartPainting()||(L.disabled=!1,T.disabled=!0))},f=async(L,T)=>{e.onStopPainting&&await e.onStopPainting()&&(L.disabled=!1,T.disabled=!0)};d.startBtn.addEventListener("click",()=>{x(d.startBtn,d.stopBtn)}),d.stopBtn.addEventListener("click",()=>{f(d.startBtn,d.stopBtn)}),d.startBtnUpload.addEventListener("click",()=>{x(d.startBtnUpload,d.stopBtnUpload)}),d.stopBtnUpload.addEventListener("click",()=>{f(d.startBtnUpload,d.stopBtnUpload)});let w=null,y=null;d.logWindowBtn.addEventListener("click",()=>{w?w.toggle():(w=qe("image"),w.show())}),d.statsBtn.addEventListener("click",()=>{y?y.toggle():(y=ft(),y.setRefreshCallback(()=>{e.onRefreshStats&&e.onRefreshStats()}),y.show())});function v(L,T="default"){d.status.textContent=L,d.status.className=`status status-${T}`,d.status.style.animation="none",d.status.offsetWidth,d.status.style.animation="slideIn 0.3s ease-out"}function C(L){let{width:T,height:$}=L.getDimensions(),N=T/$;if(u.widthSlider.value=T,u.heightSlider.value=$,u.widthValue.textContent=T,u.heightValue.textContent=$,u.preview.src=L.img.src,u.colorPaletteSelector){let M=e.getAvailableColors?e.getAvailableColors():[];u.colorPaletteSelector.updateAvailableColors(M)}else{let M=e.getAvailableColors?e.getAvailableColors():[];u.colorPaletteSelector=xt(u.container.querySelector(".resize-buttons").parentNode,M),u.colorPaletteSelector.onSelectionChange(Ae=>{e.onColorSelectionChange&&e.onColorSelectionChange(Ae)});let O=u.container.querySelector(".resize-buttons");O.parentNode.insertBefore(u.colorPaletteSelector.element,O)}u.overlay.style.display="block",u.container.style.display="block";let q=()=>{let M=parseInt(u.widthSlider.value),O=parseInt(u.heightSlider.value);u.widthValue.textContent=M,u.heightValue.textContent=O,u.preview.src=L.generatePreview(M,O)},ie=()=>{if(u.keepAspect.checked){let M=parseInt(u.widthSlider.value),O=Math.round(M/N);u.heightSlider.value=O}q()},oe=()=>{if(u.keepAspect.checked){let M=parseInt(u.heightSlider.value),O=Math.round(M*N);u.widthSlider.value=O}q()};u.widthSlider.addEventListener("input",ie),u.heightSlider.addEventListener("input",oe);let ge=()=>{let M=parseInt(u.widthSlider.value),O=parseInt(u.heightSlider.value),Ae=u.colorPaletteSelector.getSelectedColors();e.onConfirmResize&&e.onConfirmResize(L,M,O,Ae),E()},ue=()=>{E()};u.confirmBtn.addEventListener("click",ge),u.cancelBtn.addEventListener("click",ue),u.overlay.addEventListener("click",ue),window.cleanupResizeDialog=()=>{u.widthSlider.removeEventListener("input",ie),u.heightSlider.removeEventListener("input",oe),u.confirmBtn.removeEventListener("click",ge),u.cancelBtn.removeEventListener("click",ue),u.overlay.removeEventListener("click",ue)},q()}function E(){u.overlay.style.display="none",u.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function A(L,T,$=null){let N=T>0?L/T*100:0;d.progressBar.style.width=`${N}%`;let q=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${o.progress}</div>
        <div>${L}/${T} (${N.toFixed(1)}%)</div>
      </div>
    `;if($&&($.username&&(q+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} ${o.userName}</div>
            <div>${$.username}</div>
          </div>
        `),$.charges!==void 0&&(q+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${o.charges}</div>
            <div>${Math.floor($.charges)}</div>
          </div>
        `),$.pixels!==void 0&&(q+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${o.pixels}</div>
            <div>${$.pixels.toLocaleString()}</div>
          </div>
        `),$.estimatedTime!==void 0&&$.estimatedTime>0)){let ie=Math.floor($.estimatedTime/3600),oe=Math.floor($.estimatedTime%3600/60),ge=ie>0?`${ie}h ${oe}m`:`${oe}m`;q+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${o.timeRemaining}</div>
            <div>${ge}</div>
          </div>
        `}d.statsArea.innerHTML=q}function k(L){if(L>0){let T=Math.floor(L/60),$=L%60,N=T>0?`${T}m ${$}s`:`${$}s`;d.cooldownValue.textContent=N}else d.cooldownValue.textContent="--"}function I(L){L&&L.includes("\u23F3")?(d.status.textContent=L,d.status.className="status status-info"):L&&v(L,"info")}function H(L){L?(d.initBtn.disabled=!0,d.initBtn.style.opacity="0.6",d.initBtn.innerHTML=`\u2705 <span>${o.initBot} - Completado</span>`):(d.initBtn.disabled=!1,d.initBtn.style.opacity="1",d.initBtn.innerHTML=`\u{1F916} <span>${o.initBot}</span>`)}function B(L){d.initBtn.style.display=L?"flex":"none"}function Q(){b("initial"),n.querySelectorAll("button").forEach(T=>{T.disabled=!1})}function _(){w&&w.destroy(),y&&y.destroy(),a.remove()}function de(L){y&&y.isVisible()&&(L.userInfo&&y.updateUserStats(L.userInfo),L.imageInfo&&y.updateImageStats(L.imageInfo),L.availableColors&&y.updateColorsStats(L.availableColors))}return s("\u2705 Interfaz de Auto-Image creada"),b("initial"),{setStatus:v,updateProgress:A,updateCooldownDisplay:k,updateCooldownMessage:I,setInitialized:H,setInitButtonVisible:B,enableButtonsAfterInit:P,setState:b,resetToInitialState:Q,showResizeDialog:C,closeResizeDialog:E,updateStatsWindow:de,destroy:_}}function wt(o,e,a={}){return new Promise(r=>{let i=document.createElement("div");i.className="modal-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%",i.style.background="rgba(0,0,0,0.7)",i.style.zIndex="10001",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center";let n=document.createElement("div");n.style.background="#1a1a1a",n.style.border="2px solid #333",n.style.borderRadius="15px",n.style.padding="25px",n.style.color="#eee",n.style.minWidth="350px",n.style.maxWidth="400px",n.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",n.style.fontFamily="'Segoe UI', Roboto, sans-serif",n.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${e}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${o}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${a.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${a.save}</button>`:""}
        ${a.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${a.discard}</button>`:""}
        ${a.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${a.cancel}</button>`:""}
      </div>
    `,i.appendChild(n),document.body.appendChild(i);let g=n.querySelector(".save-btn"),c=n.querySelector(".discard-btn"),p=n.querySelector(".cancel-btn"),l=()=>{document.body.removeChild(i)};g&&g.addEventListener("click",()=>{l(),r("save")}),c&&c.addEventListener("click",()=>{l(),r("discard")}),p&&p.addEventListener("click",()=>{l(),r("cancel")}),i.addEventListener("click",d=>{d.target===i&&(l(),r("cancel"))})})}me();function Le(o=!1){let e=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let i of e){let n=document.querySelector(i);if(n&&n.offsetParent!==null)return o&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por selector: ${i}`),!0}let a=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),r=0;for(let i of a)if(i.offsetParent!==null&&i.offsetWidth>10&&i.offsetHeight>10&&(r++,r>=5))return o&&console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por colores visibles: ${r}`),!0;return o&&console.log(`[WPA-UI] \u{1F50D} Paleta no detectada. Colores visibles: ${r}`),!1}function na(o=!1,e=!1){let a=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(a){let i=a.textContent.toLowerCase(),n=i.includes("paint")||i.includes("pintar"),g=a.querySelector('svg path[d*="240-120"]')||a.querySelector('svg path[d*="M15"]');if(n||g)return o&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por selector espec\xEDfico: "${i}"`),a.click(),e&&setTimeout(()=>{o&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),a.click()},500),!0}let r=document.querySelectorAll("button");for(let i of r){let n=i.textContent.toLowerCase();if((n.includes("paint")||n.includes("pintar"))&&i.offsetParent!==null&&!i.disabled)return o&&console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por texto: "${i.textContent.trim()}"`),i.click(),e&&setTimeout(()=>{o&&console.log("[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint"),i.click()},500),!0}return o&&console.log("[WPA-UI] \u274C Bot\xF3n Paint no encontrado"),!1}async function Se(o=3,e=!0){e&&console.log(`[WPA-UI] \u{1F916} Iniciando auto-click del bot\xF3n Paint (m\xE1ximo ${o} intentos)`);for(let a=1;a<=o;a++){if(e&&console.log(`[WPA-UI] \u{1F3AF} Intento ${a}/${o} - Buscando bot\xF3n Paint...`),Le())return e&&console.log("[WPA-UI] \u2705 Paleta ya est\xE1 abierta, auto-click completado"),!0;if(na(e,!1)){if(e&&console.log("[WPA-UI] \u{1F446} Clic en bot\xF3n Paint realizado (sin segundo clic)"),await new Promise(r=>setTimeout(r,1500)),Le())return e&&console.log(`[WPA-UI] \u2705 Paleta abierta exitosamente despu\xE9s del intento ${a}`),!0;e&&console.log(`[WPA-UI] \u26A0\uFE0F Paleta no detectada tras el clic en intento ${a}. Reintentar\xE1.`)}else e&&console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado para clic en intento ${a}`);a<o&&await new Promise(r=>setTimeout(r,1e3))}return e&&console.log(`[WPA-UI] \u274C Auto-click fall\xF3 despu\xE9s de ${o} intentos`),!1}(()=>{let e={enabled:!1,templates:[],templatesShouldBeDrawn:!0,tileSize:1e3,drawMult:3,pixelPlan:null,nextBatchCount:0,anchor:null,imageWidth:null,imageHeight:null,originalFetch:null,fetchedBlobQueue:new Map,isIntercepting:!1};function a(){}function r(){e.isIntercepting||(e.originalFetch=window.fetch,e.isIntercepting=!0,window.fetch=async function(...h){var v;let x=await e.originalFetch.apply(this,h),f=x.clone(),w=(h[0]instanceof Request?(v=h[0])==null?void 0:v.url:h[0])||"ignore";if((f.headers.get("content-type")||"").includes("image/")&&w.includes("/tiles/")&&!w.includes("openfreemap")&&!w.includes("maps"))try{let C=await f.blob(),E=await n(C,w);return new Response(E,{headers:f.headers,status:f.status,statusText:f.statusText})}catch(C){return console.error("[PLAN OVERLAY] Error processing tile:",C),x}return x})}function i(){!e.isIntercepting||!e.originalFetch||(window.fetch=e.originalFetch,e.isIntercepting=!1)}async function n(h,x){if(!e.enabled||!e.templatesShouldBeDrawn||!e.pixelPlan)return h;let f=x.split("/"),w=parseInt(f[f.length-1].replace(".png","")),y=parseInt(f[f.length-2]);if(isNaN(y)||isNaN(w))return console.warn("[PLAN OVERLAY] Could not extract tile coordinates from URL:",x),h;let v=g(y,w);if(v.length===0)return h;let C=e.tileSize*e.drawMult,E=await createImageBitmap(h),A=new OffscreenCanvas(C,C),k=A.getContext("2d");return k.imageSmoothingEnabled=!1,k.clearRect(0,0,C,C),k.drawImage(E,0,0,C,C),c(k,v,y,w),await A.convertToBlob({type:"image/png"})}function g(h,x){return!e.pixelPlan||!e.pixelPlan.pixels?[]:e.pixelPlan.pixels.filter(f=>{let w=Math.floor(f.globalX/3e3),y=Math.floor(f.globalY/3e3);return w===h&&y===x})}function c(h,x,f,w){let y=f*3e3,v=w*3e3;h.globalAlpha=.7;for(let C of x){let E=(C.globalX-y)*e.drawMult+1,A=(C.globalY-v)*e.drawMult+1;E>=0&&E<e.tileSize*e.drawMult&&A>=0&&A<e.tileSize*e.drawMult&&(h.fillStyle=`rgb(${C.r},${C.g},${C.b})`,h.fillRect(E,A,1,1))}if(e.nextBatchCount>0){h.globalAlpha=1;let C=x.slice(0,e.nextBatchCount);for(let E of C){let A=(E.globalX-y)*e.drawMult+1,k=(E.globalY-v)*e.drawMult+1;A>=0&&A<e.tileSize*e.drawMult&&k>=0&&k<e.tileSize*e.drawMult&&(h.fillStyle=`rgb(${E.r},${E.g},${E.b})`,h.fillRect(A,k,1,1))}}}function p(h){e.enabled=!!h,e.enabled?r():i()}function l(h,x={}){var w,y,v;if(!h||h.length===0){e.pixelPlan=null;return}let f=[];for(let C of h){let E,A;if(typeof C.tileX=="number"&&typeof C.localX=="number")E=C.tileX*3e3+C.localX,A=C.tileY*3e3+C.localY;else if(x.anchor&&typeof C.imageX=="number"){let k=x.anchor.tileX*3e3+(x.anchor.pxX||0),I=x.anchor.tileY*3e3+(x.anchor.pxY||0);E=k+C.imageX,A=I+C.imageY}else continue;f.push({globalX:E,globalY:A,r:((w=C.color)==null?void 0:w.r)||0,g:((y=C.color)==null?void 0:y.g)||0,b:((v=C.color)==null?void 0:v.b)||0})}e.pixelPlan={pixels:f},e.nextBatchCount=x.nextBatchCount||0,e.anchor=x.anchor||null,e.imageWidth=x.imageWidth||null,e.imageHeight=x.imageHeight||null,typeof x.enabled=="boolean"&&p(x.enabled)}function d(h){e.nextBatchCount=Math.max(0,Number(h||0))}function u(h){e.anchor=h}function m(){}function b(){}function P(){i(),e.pixelPlan=null,e.fetchedBlobQueue.clear()}window.__WPA_PLAN_OVERLAY__={injectStyles:a,setEnabled:p,setPlan:l,setPlanItemsFromTileList:l,setNextBatchCount:d,setAnchor:u,setAnchorCss:m,endSelectionMode:b,render:()=>{},cleanup:P,get state(){return e}}})();async function Pt(){console.log("[WPA-Image] \u{1F680} runImage() iniciado"),s("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),console.log("[WPA-Image] \u{1F30D} Inicializando sistema de idiomas"),ke(),console.log("[WPA-Image] \u2705 Sistema de idiomas inicializado"),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0},console.log("[WPA-Image] \u{1F527} Estado global actualizado");let o=null,e=window.fetch,a=()=>{let r=window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.state&&window.__WPA_PLAN_OVERLAY__.state.enabled;window.fetch!==e&&!r?(window.fetch=e,s("\u{1F504} Fetch original restaurado")):r&&s("\u{1F504} Fetch NO restaurado - overlay activo"),t.positionTimeoutId&&(clearTimeout(t.positionTimeoutId),t.positionTimeoutId=null),t.cleanupObserver&&(t.cleanupObserver(),t.cleanupObserver=null),t.selectingPosition=!1};try{let r={...j},i=Te("image");if(t.language=ot(),!r.SITEKEY){let l=document.querySelector("*[data-sitekey]");l?(r.SITEKEY=l.getAttribute("data-sitekey"),s(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${r.SITEKEY.substring(0,20)}...`)):s("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function n(){return s("\u{1F916} Intentando auto-inicio..."),Le()?(s("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(s("\u{1F50D} Paleta no encontrada, iniciando auto-click del bot\xF3n Paint..."),await Se(3,!0)?(s("\u2705 Auto-click exitoso, paleta abierta"),!0):(s("\u274C Auto-click fall\xF3, requerir\xE1 inicio manual"),!1))}async function g(l=!1){s("\u{1F916} Inicializando Auto-Image..."),c.setStatus(S("image.checkingColors"),"info");let d=se();if(d.length===0)return c.setStatus(S("image.noColorsFound"),"error"),!1;let u=await te(),m=null;u.success&&u.data.user?(m={username:u.data.user.name||"An\xF3nimo",charges:u.data.charges,maxCharges:u.data.maxCharges,pixels:u.data.user.pixelsPainted||0},o=m,t.currentCharges=u.data.charges,t.maxCharges=u.data.maxCharges||9999,s(`\u{1F464} Usuario conectado: ${u.data.user.name||"An\xF3nimo"} - Cargas: ${m.charges}/${m.maxCharges} - P\xEDxeles: ${m.pixels}`)):s("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),t.availableColors=d,t.colorsChecked=!0,c.setStatus(S("image.colorsFound",{count:d.length}),"success"),c.updateProgress(0,0,m),l||s(`\u2705 ${d.length} colores disponibles detectados`),c.setInitialized(!0),c.enableButtonsAfterInit();try{}catch{}return!0}let c=await bt({texts:i,onConfigChange:l=>{l.pixelsPerBatch!==void 0&&(t.pixelsPerBatch=l.pixelsPerBatch),l.useAllCharges!==void 0&&(t.useAllChargesFirst=l.useAllCharges),l.protectionEnabled!==void 0&&(t.protectionEnabled=l.protectionEnabled,s(`\u{1F6E1}\uFE0F Protecci\xF3n del dibujo: ${l.protectionEnabled?"habilitada":"deshabilitada"}`)),l.smartVerification!==void 0&&(t.smartVerification=l.smartVerification,s(`\u{1F4A1} Verificaci\xF3n inteligente: ${l.smartVerification?"habilitada":"deshabilitada"}`)),l.paintPattern!==void 0&&(t.paintPattern=l.paintPattern,s(`\u{1F3A8} Patr\xF3n de pintado cambiado a: ${l.paintPattern}`),t.remainingPixels&&t.remainingPixels.length>0&&Promise.resolve().then(()=>(we(),Fe)).then(({applyPaintPattern:d})=>{t.remainingPixels=d(t.remainingPixels,l.paintPattern,t.imageData);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{enabled:!0,nextBatchCount:t.pixelsPerBatch}),s(`\u2705 Overlay actualizado con nuevo patr\xF3n: ${l.paintPattern}`))}catch(u){s("\u26A0\uFE0F Error actualizando overlay con nuevo patr\xF3n:",u)}}).catch(d=>{s("\u274C Error aplicando nuevo patr\xF3n:",d)})),s("Configuraci\xF3n actualizada:",l)},onInitBot:g,onUploadImage:async l=>{try{c.setStatus(S("image.loadingImage"),"info");let d=window.URL.createObjectURL(l),u=new he(d);u.originalName=l.name,await u.load();let m=u.initializeColorPalette();t.availableColors=m;let b=await u.analyzePixels();u.setCoords(0,0,0,0);let P=u.getImageData();t.imageData=P,t.imageData.processor=u,t.totalPixels=b.requiredPixels,t.paintedPixels=0,t.originalImageName=l.name,t.imageLoaded=!0,c.setStatus(S("image.imageLoaded",{count:b.requiredPixels}),"success"),c.updateProgress(0,b.requiredPixels,o),s(`\u2705 [BLUE MARBLE] Imagen cargada: ${P.width}x${P.height}, ${b.requiredPixels} p\xEDxeles v\xE1lidos`),s(`\u2705 [BLUE MARBLE] An\xE1lisis: ${b.uniqueColors} colores \xFAnicos, ${b.defacePixels} p\xEDxeles #deface`),window.URL.revokeObjectURL(d);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),s("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(h){s("\u26A0\uFE0F Error activando plan overlay:",h)}return!0}catch(d){return c.setStatus(S("image.imageError"),"error"),s("\u274C Error cargando imagen:",d),!1}},onSelectPosition:async()=>new Promise(l=>{c.setStatus(S("image.selectPositionAlert"),"info"),c.setStatus(S("image.waitingPosition"),"info"),t.selectingPosition=!0;let d=!1,u=()=>{window.fetch=async(P,h)=>{if(t.selectingPosition&&!d&&typeof P=="string"&&P.includes("/s0/pixel/")&&h&&h.method==="POST")try{s(`\u{1F3AF} Interceptando request de pintado: ${P}`);let x=await e(P,h);if(x.ok&&h.body){let f;try{f=JSON.parse(h.body)}catch(w){return s("Error parseando body del request:",w),x}if(f.coords&&Array.isArray(f.coords)&&f.coords.length>=2){let w=f.coords[0],y=f.coords[1],v=P.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(v&&!d){d=!0;let C=parseInt(v[1]),E=parseInt(v[2]);if(t.tileX=C,t.tileY=E,t.startPosition={x:w,y},t.selectingPosition=!1,t.imageData&&t.imageData.processor){let A=t.imageData.processor;A.setCoords(C,E,w,y);try{await A.createTemplateTiles(),s(`\u2705 [BLUE MARBLE] Template tiles creados para posici\xF3n tile(${C},${E}) pixel(${w},${y})`)}catch(I){s(`\u274C [BLUE MARBLE] Error creando template tiles: ${I.message}`)}let k=A.generatePixelQueue();t.remainingPixels=k,t.totalPixels=k.length,s(`\u2705 Cola de p\xEDxeles generada: ${k.length} p\xEDxeles para overlay`)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setEnabled(!1),window.__WPA_PLAN_OVERLAY__.setPlan([],{}),window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:C,tileY:E,pxX:w,pxY:y}),t.remainingPixels&&t.remainingPixels.length>0?(window.__WPA_PLAN_OVERLAY__.setPlan(t.remainingPixels,{anchor:{tileX:C,tileY:E,pxX:w,pxY:y},imageWidth:t.imageData.width,imageHeight:t.imageData.height,enabled:!0}),s(`\u2705 Plan overlay reiniciado y anclado en tile(${C},${E}) local(${w},${y})`)):s("\u26A0\uFE0F No hay p\xEDxeles para mostrar en overlay"))}catch(A){s(`\u274C Error configurando overlay: ${A.message}`)}a(),c.setStatus(S("image.positionSet"),"success"),s(`\u2705 Posici\xF3n establecida: tile(${t.tileX},${t.tileY}) local(${w},${y})`),l(!0)}else s("\u26A0\uFE0F No se pudo extraer tile de la URL:",P)}}return x}catch(x){if(s("\u274C Error interceptando pixel:",x),!d)return a(),e(P,h)}return e(P,h)}},m=()=>{let P=document.querySelectorAll("canvas");if(P.length===0){s("\u26A0\uFE0F No se encontraron elementos canvas");return}s(`\u{1F4CA} Configurando observer para ${P.length} canvas`);let h=x=>{var w;if(!t.selectingPosition||d)return;let f=x.target;if(f&&f.tagName==="CANVAS"){s("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let v=(((w=document.querySelector("canvas"))==null?void 0:w.parentElement)||document.body).getBoundingClientRect(),C=x.clientX-v.left,E=x.clientY-v.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(C,E),s(`Plan overlay: ancla CSS establecida en (${C}, ${E})`))}catch(y){s("Plan Overlay: error calculando ancla CSS",y)}setTimeout(()=>{!d&&t.selectingPosition&&s("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",h),t.cleanupObserver=()=>{document.removeEventListener("click",h)}};u(),m();let b=setTimeout(()=>{t.selectingPosition&&!d&&(a(),t.cleanupObserver&&t.cleanupObserver(),c.setStatus(S("image.positionTimeout"),"error"),s("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),l(!1))},12e4);t.positionTimeoutId=b}),onStartPainting:async()=>{var l;if(s("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:t.imageLoaded,startPosition:t.startPosition,tileX:t.tileX,tileY:t.tileY,totalPixels:t.totalPixels,remainingPixels:((l=t.remainingPixels)==null?void 0:l.length)||0}),!t.imageLoaded||!t.startPosition)return c.setStatus(S("image.missingRequirements"),"error"),s(`\u274C Validaci\xF3n fallida: imageLoaded=${t.imageLoaded}, startPosition=${!!t.startPosition}`),!1;t.running=!0,t.stopFlag=!1,t.isFirstBatch=t.useAllChargesFirst,s(`\u{1F680} Iniciando pintado - isFirstBatch: ${t.isFirstBatch}, useAllChargesFirst: ${t.useAllChargesFirst}`),c.setStatus(S("image.startPaintingMsg"),"success");try{return await pt(t.imageData,t.startPosition,(d,u,m,b)=>{o&&(o.charges=Math.floor(t.currentCharges),b!==void 0&&(o.estimatedTime=b)),c.updateProgress(d,u,o),t.inCooldown&&t.nextBatchCooldown>0?c.updateCooldownDisplay(t.nextBatchCooldown):c.updateCooldownDisplay(0),m?m.includes("\u23F3")&&t.inCooldown?c.updateCooldownMessage(m):c.setStatus(m,"info"):c.setStatus(S("image.paintingProgress",{painted:d,total:u}),"info")},(d,u)=>{d?(c.setStatus(S("image.paintingComplete",{count:u}),"success"),Ye()):c.setStatus(S("image.paintingStopped"),"warning"),t.running=!1},d=>{c.setStatus(S("image.paintingError"),"error"),s("\u274C Error en proceso de pintado:",d),t.running=!1}),!0}catch(d){return c.setStatus(S("image.paintingError"),"error"),s("\u274C Error iniciando pintado:",d),t.running=!1,!1}},onStopPainting:async()=>{if(We().hasProgress){let d=await wt(S("image.confirmSaveProgress"),S("image.saveProgressTitle"),{save:S("image.saveProgress"),discard:S("image.discardProgress"),cancel:S("image.cancel")});if(d==="save"){let u=ye();u.success?c.setStatus(S("image.progressSaved",{filename:u.filename}),"success"):c.setStatus(S("image.progressSaveError",{error:u.error}),"error")}else if(d==="cancel")return!1}return Ne(),c.setStatus(S("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let l=ye();return l.success?c.setStatus(S("image.progressSaved",{filename:l.filename}),"success"):c.setStatus(S("image.progressSaveError",{error:l.error}),"error"),l.success},onLoadProgress:async l=>{try{let d=await De(l);return d.success?(c.setStatus(S("image.progressLoaded",{painted:d.painted,total:d.total}),"success"),c.updateProgress(d.painted,d.total,o),s("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(c.setStatus(S("image.progressLoadError",{error:d.error}),"error"),!1)}catch(d){return c.setStatus(S("image.progressLoadError",{error:d.message}),"error"),!1}},onExportGuard:async()=>{try{let{exportForGuard:l}=await Promise.resolve().then(()=>(Xe(),ht)),d=l();return d.success?(c.setStatus(S("image.guardExportSuccess",{filename:d.filename}),"success"),s(`\u2705 Exportado para Auto-Guard: ${d.filename}`)):c.setStatus(S("image.guardExportError",{error:d.error}),"error"),d.success}catch(l){return c.setStatus(S("image.guardExportError",{error:l.message}),"error"),s(`\u274C Error exportando para Guard: ${l.message}`),!1}},onResizeImage:()=>{t.imageLoaded&&t.imageData&&t.imageData.processor&&c.showResizeDialog(t.imageData.processor)},onConfirmResize:async(l,d,u,m)=>{s(`\u{1F504} Redimensionando imagen de ${l.getDimensions().width}x${l.getDimensions().height} a ${d}x${u}`),s(`\u{1F3A8} Colores seleccionados: ${m?m.length:"todos"}`);try{if(await l.resize(d,u),m&&m.length>0){let P=t.availableColors.filter(h=>m.includes(h.id));l.setSelectedColors(P),s(`\u{1F3A8} Paleta actualizada con ${m.length} colores seleccionados`)}let b=await l.analyzePixels();t.imageData={processor:l,width:d,height:u,validPixelCount:b.validPixelCount,totalPixels:b.totalPixels,unknownPixels:b.unknownPixels},t.totalPixels=b.validPixelCount,t.paintedPixels=0,t.remainingPixels=[],t.lastPosition={x:0,y:0},c.updateProgress(0,b.validPixelCount,o),c.setStatus(S("image.resizeSuccess",{width:d,height:u}),"success"),s(`\u2705 Imagen redimensionada: ${b.validPixelCount} p\xEDxeles v\xE1lidos de ${b.totalPixels} totales`);try{if(window.__WPA_PLAN_OVERLAY__&&t.startPosition&&t.tileX!=null&&t.tileY!=null){await l.createTemplateTiles();let P=l.generatePixelQueue();t.remainingPixels=P,t.totalPixels=P.length,window.__WPA_PLAN_OVERLAY__.setPlan(P,{anchor:{tileX:t.tileX,tileY:t.tileY,pxX:t.startPosition.x,pxY:t.startPosition.y},imageWidth:d,imageHeight:u,enabled:!0}),s(`\u2705 Overlay actualizado con ${P.length} p\xEDxeles despu\xE9s del resize`)}}catch(P){s(`\u26A0\uFE0F Error actualizando overlay despu\xE9s del resize: ${P.message}`)}}catch(b){s(`\u274C Error redimensionando imagen: ${b.message}`),c.setStatus(S("image.imageError"),"error")}},onRefreshStats:async()=>{var l;s("\u{1F504} Actualizando estad\xEDsticas...");try{let d=await te(),u=null;d.success&&d.data.user&&(u={username:d.data.user.name||"An\xF3nimo",charges:d.data.charges,maxCharges:d.data.maxCharges,pixels:d.data.user.pixelsPainted||0,cooldown:d.data.cooldown||0},o=u,t.currentCharges=d.data.charges,t.maxCharges=d.data.maxCharges||9999);let m=se();m.length>0&&(t.availableColors=m,t.colorsChecked=!0);let b=null;t.imageLoaded&&(b={loaded:!0,totalPixels:t.totalPixels,paintedPixels:t.paintedPixels,estimatedTime:t.estimatedTime,originalName:t.originalImageName}),c.updateStatsWindow({userInfo:u,imageInfo:b,availableColors:m.length>0?m:t.availableColors}),c.updateProgress(t.paintedPixels,t.totalPixels,u),s(`\u2705 Estad\xEDsticas actualizadas: ${m.length>0?m.length:((l=t.availableColors)==null?void 0:l.length)||0} colores disponibles`)}catch(d){s("\u274C Error actualizando estad\xEDsticas:",d)}},getAvailableColors:()=>t.availableColors||[],onColorSelectionChange:l=>{s(`\u{1F3A8} Selecci\xF3n de colores cambiada: ${l.length} colores seleccionados`)}}),p=l=>{let{language:d}=l.detail;s(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${d}`),t.language=d};window.addEventListener("launcherLanguageChanged",p),window.addEventListener("languageChanged",p),window.addEventListener("beforeunload",()=>{a(),Ne(),c.destroy(),window.removeEventListener("launcherLanguageChanged",p),window.removeEventListener("languageChanged",p),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),s("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{c.setStatus(S("image.autoInitializing"),"info"),s("\u{1F916} Intentando auto-inicio..."),await n()?(c.setStatus(S("image.autoInitSuccess"),"success"),s("\u2705 Auto-inicio exitoso"),c.setInitButtonVisible(!1),await g(!0)&&s("\u{1F680} Bot auto-iniciado completamente")):(c.setStatus(S("image.autoInitFailed"),"warning"),s("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(l){s("\u274C Error en auto-inicio:",l),c.setStatus(S("image.manualInitRequired"),"warning")}},1e3)}catch(r){throw s("\u274C Error inicializando Auto-Image:",r),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),r}}(async()=>{"use strict";var o,e;console.log("[WPA-Image] \u{1F680} Entry point iniciado");try{console.log("[WPA-Image] \u{1F916} Iniciando auto-click del bot\xF3n Paint..."),await Se(3,!0),console.log("[WPA-Image] \u2705 Auto-click completado")}catch(a){console.log("[WPA-Image] \u26A0\uFE0F Error en auto-click del bot\xF3n Paint:",a)}if((o=window.__wplaceBot)!=null&&o.imageRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Image ya est\xE1 corriendo"),alert("Auto-Image ya est\xE1 corriendo.");return}if((e=window.__wplaceBot)!=null&&e.farmRunning){console.log("[WPA-Image] \u26A0\uFE0F Auto-Farm est\xE1 ejecut\xE1ndose"),alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={},console.log("[WPA-Image] \u{1F527} Estado global inicializado")),window.__wplaceBot.imageRunning=!0,console.log("[WPA-Image] \u{1F3C3} Marcado como ejecut\xE1ndose"),console.log("[WPA-Image] \u{1F3AF} Llamando a runImage()"),Pt().catch(a=>{console.error("[BOT] Error en Auto-Image:",a),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
