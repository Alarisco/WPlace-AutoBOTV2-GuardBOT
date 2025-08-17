/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-17T09:48:12.743Z */
(()=>{var d=(...n)=>console.log("[WPA-UI]",...n);var H={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando..."},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var j={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout. Retrying..."},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var V={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 Timeout serveur. Nouvel essai..."},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var G={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",autoImage:"\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",selection:"\u0412\u044B\u0431\u0440\u0430\u043D\u043E",user:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",charges:"\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",backend:"\u0411\u044D\u043A\u0435\u043D\u0434",database:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",uptime:"\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",launch:"\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",executing:"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",downloading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",chooseBot:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",readyToLaunch:"\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",loadError:"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",loadErrorMsg:"\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",checking:"\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",online:"\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",offline:"\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",ok:"\u{1F7E2} \u041E\u041A",error:"\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",unknown:"-"},image:{title:"WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",uploadImage:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",resizeImage:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",startPainting:"\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",stopPainting:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",saveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",loadProgress:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",checkingColors:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",loadingImage:"\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",imageLoaded:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",imageError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPositionAlert:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",positionDetected:"\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",positionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",startPaintingMsg:"\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",paintingProgress:"\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",noCharges:"\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",paintingStopped:"\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",paintingComplete:"\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",paintingError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",missingRequirements:"\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",progress:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",pixels:"\u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",estimatedTime:"\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",initMessage:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",resizeSuccess:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",paintingPaused:"\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",batchSize:"\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",nextBatchTime:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437: ",useAllCharges:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",maxCharges:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",waitingForCharges:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",timeRemaining:"\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",cooldownWaiting:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",progressSaved:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",progressLoaded:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",progressLoadError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",progressSaveError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",confirmSaveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",saveProgressTitle:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",discardProgress:"\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",minimize:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",width:"\u0428\u0438\u0440\u0438\u043D\u0430",height:"\u0412\u044B\u0441\u043E\u0442\u0430",keepAspect:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",apply:"\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",passCompleted:"\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",waitingChargesRegen:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",waitingChargesCountdown:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",retryAttempt:"\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryError:"\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryFailed:"\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",networkError:"\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",serverError:"\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",timeoutError:"\u23F0 \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430..."},farm:{title:"WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",stopped:"\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",calibrate:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",paintOnce:"\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",checkingStatus:"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",configuration:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",delay:"\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",minCharges:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",colorMode:"\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",random:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",fixed:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",range:"\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",fixedColor:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",advanced:"\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",tileX:"\u041F\u043B\u0438\u0442\u043A\u0430 X",tileY:"\u041F\u043B\u0438\u0442\u043A\u0430 Y",customPalette:"\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",paletteExample:"\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",capture:"\u0417\u0430\u0445\u0432\u0430\u0442",painted:"\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",retries:"\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",tile:"\u041F\u043B\u0438\u0442\u043A\u0430",configSaved:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",configLoaded:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",configReset:"\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",captureInstructions:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",backendOnline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",backendOffline:"\u0411\u044D\u043A\u044D\u043D\u0434",startingBot:"\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",stoppingBot:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",calibrating:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",alreadyRunning:"\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",imageRunningWarning:"\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C",selectPositionAlert:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",missingPosition:"\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",farmRadius:"\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",positionInfo:"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",farmingInRadius:"\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",selectEmptyArea:"\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",noPosition:"\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",currentZone:"\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430."},common:{yes:"\u0414\u0430",no:"\u041D\u0435\u0442",ok:"\u041E\u041A",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",load:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",edit:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",pause:"\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",resume:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",reset:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",help:"\u041F\u043E\u043C\u043E\u0449\u044C",about:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",language:"\u042F\u0437\u044B\u043A",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",error:"\u041E\u0448\u0438\u0431\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",info:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",languageChanged:"\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"}};var L={es:H,en:j,fr:V,ru:G},q="es",$=L[q];function he(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return L[a]?a:"es"}function xe(){return null}function Y(){let n=xe(),a=he(),r="es";return n&&L[n]?r=n:a&&L[a]&&(r=a),be(r),r}function be(n){if(!L[n]){console.warn(`Idioma '${n}' no disponible. Usando '${q}'`);return}q=n,$=L[n],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:n,translations:$}}))}function Z(){return q}function m(n,a={}){let r=n.split("."),s=$;for(let i of r)if(s&&typeof s=="object"&&i in s)s=s[i];else return console.warn(`Clave de traducci\xF3n no encontrada: '${n}'`),n;return typeof s!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${n}'`),n):Pe(s,a)}function Pe(n,a){return!a||Object.keys(a).length===0?n:n.replace(/\{(\w+)\}/g,(r,s)=>a[s]!==void 0?a[s]:r)}function _(n){return $[n]?$[n]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${n}'`),{})}Y();var E={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:E.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:E.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:50,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0};var N=class{constructor(a){this.imageSrc=a,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((a,r)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),a()},this.img.onerror=r,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(a,r){let s=document.createElement("canvas");return s.width=a,s.height=r,s.getContext("2d").drawImage(this.img,0,0,a,r),this.canvas.width=a,this.canvas.height=r,this.ctx.drawImage(s,0,0),this.getPixelData()}generatePreview(a,r){return this.previewCanvas.width=a,this.previewCanvas.height=r,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,a,r),this.previewCanvas.toDataURL()}getImageData(){let{width:a,height:r}=this.getDimensions(),s=this.getPixelData();return{width:a,height:r,pixels:s,originalName:this.originalName||"image.png"}}processImage(a,r){let{width:s,height:i}=this.getDimensions(),l=this.getPixelData(),g=[],o=0;for(let f=0;f<i;f++)for(let c=0;c<s;c++){let t=(f*s+c)*4,u=l[t],p=l[t+1],y=l[t+2],x=l[t+3];if(x<r.TRANSPARENCY_THRESHOLD||u>r.WHITE_THRESHOLD&&p>r.WHITE_THRESHOLD&&y>r.WHITE_THRESHOLD)continue;let P=this.findClosestColor({r:u,g:p,b:y},a);P&&(g.push({x:c,y:f,originalColor:{r:u,g:p,b:y,alpha:x},targetColor:P}),o++)}return{width:s,height:i,pixels:g,validPixelCount:o,originalName:this.originalName||"image.png"}}findClosestColor(a,r){if(!r||r.length===0)return null;let s=null,i=1/0;for(let l of r){let g=Math.sqrt(Math.pow(a.r-l.r,2)+Math.pow(a.g-l.g,2)+Math.pow(a.b-l.b,2));g<i&&(i=g,s=l)}return s}};function K(){d("\u{1F3A8} Detectando colores disponibles...");let n=document.querySelectorAll('[id^="color-"]'),a=[];for(let r of n){if(r.querySelector("svg"))continue;let s=r.id.replace("color-",""),i=parseInt(s);if(i===0||i===5)continue;let l=r.style.backgroundColor;if(l){let g=l.match(/\d+/g);if(g&&g.length>=3){let o={r:parseInt(g[0]),g:parseInt(g[1]),b:parseInt(g[2])};a.push({id:i,element:r,...o}),d(`Color detectado: id=${i}, rgb(${o.r},${o.g},${o.b})`)}}}return d(`\u2705 ${a.length} colores disponibles detectados`),a}var I=n=>new Promise(a=>setTimeout(a,n));var J="https://backend.wplace.live";async function Q(){var n,a,r;try{let s=await fetch(`${J}/me`,{credentials:"include"}).then(o=>o.json()),i=s||null,l=(s==null?void 0:s.charges)||{},g={count:(n=l.count)!=null?n:0,max:(a=l.max)!=null?a:0,cooldownMs:(r=l.cooldownMs)!=null?r:3e4};return{success:!0,data:{user:i,charges:g.count,maxCharges:g.max,chargeRegen:g.cooldownMs}}}catch(s){return{success:!1,error:s.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function ee(n,a,r,s,i){try{let l=JSON.stringify({colors:s,coords:r,t:i}),g=await fetch(`${J}/s0/pixel/${n}/${a}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:l}),o=null;try{o=await g.json()}catch{o={}}return{status:g.status,json:o,success:g.ok,painted:(o==null?void 0:o.painted)||0}}catch(l){return{status:0,json:{error:l.message},success:!1,painted:0}}}var te=!1;async function we(){if(!(te||window.turnstile))return new Promise((n,a)=>{let r=document.createElement("script");r.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",r.async=!0,r.defer=!0,r.onload=()=>{te=!0,n()},r.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(r)})}async function ye(n,a="paint"){var r;if(await we(),typeof((r=window.turnstile)==null?void 0:r.execute)=="function")try{let s=await window.turnstile.execute(n,{action:a});if(s&&s.length>20)return s}catch{}return await new Promise(s=>{let i=document.createElement("div");i.style.position="fixed",i.style.left="-9999px",document.body.appendChild(i),window.turnstile.render(i,{sitekey:n,callback:l=>{document.body.removeChild(i),s(l)}})})}async function ae(n){return ye(n,"paint")}async function ne(n,a,r,s,i){let{width:l,height:g}=n,{x:o,y:f}=a;d(`Iniciando pintado: imagen(${l}x${g}) inicio LOCAL(${o},${f}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(d("Generando cola de p\xEDxeles..."),e.remainingPixels=Ee(n,a,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(c=>{let t=c.imageY*l+c.imageX,u=e.lastPosition.y*l+e.lastPosition.x;return t>=u})),d(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let c=Math.floor(e.currentCharges),t;if(e.isFirstBatch&&e.useAllChargesFirst&&c>0?(t=Math.min(c,e.remainingPixels.length),e.isFirstBatch=!1,d(`Primera pasada: usando ${t} cargas de ${c} disponibles`)):t=Math.min(e.pixelsPerBatch,e.remainingPixels.length),c<t){d(`Cargas insuficientes: ${c}/${t} necesarias`),await Se(t-c,r),c=Math.floor(e.currentCharges),e.isFirstBatch||(t=Math.min(e.pixelsPerBatch,e.remainingPixels.length,c));continue}let u=e.remainingPixels.splice(0,t);d(`Pintando lote de ${u.length} p\xEDxeles...`);let p=await Ce(u,r);if(p.success&&p.painted>0){if(e.paintedPixels+=p.painted,e.currentCharges=Math.max(0,e.currentCharges-p.painted),d(`Cargas despu\xE9s del lote: ${e.currentCharges.toFixed(1)} (consumidas: ${p.painted})`),u.length>0){let P=u[u.length-1];e.lastPosition={x:P.imageX,y:P.imageY}}d(`Lote exitoso: ${p.painted}/${u.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`);let y=Ie(),x=(e.paintedPixels/e.totalPixels*100).toFixed(1),w=m("image.passCompleted",{painted:p.painted,percent:x,current:e.paintedPixels,total:e.totalPixels});r&&r(e.paintedPixels,e.totalPixels,w,y),await I(2e3)}else p.shouldContinue?d("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(e.remainingPixels.unshift(...u),d("Lote fall\xF3: reintentando en 5 segundos..."),await I(5e3));await I(500)}e.stopFlag?(d(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),s&&s(!1,e.paintedPixels)):(d(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],s&&s(!0,e.paintedPixels))}catch(c){d("Error en proceso de pintado:",c),i&&i(c)}}async function ve(n){var a;try{if(!n||n.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let r=[],s=[],i=null,l=null;for(let f of n)r.push(f.localX,f.localY),s.push(f.color.id||f.color.value||1),i===null&&(i=f.tileX,l=f.tileY);let g=await ae(E.SITEKEY),o=await ee(i,l,r,s,g);return o.status===200?{success:!0,painted:o.painted,response:o.json}:{success:!1,painted:0,error:((a=o.json)==null?void 0:a.message)||`HTTP ${o.status}`,status:o.status}}catch(r){return d("Error en paintPixelBatch:",r),{success:!1,painted:0,error:r.message}}}async function Ce(n,a){for(let l=1;l<=5;l++)try{let g=await ve(n);if(g.success)return e.retryCount=0,g;if(e.retryCount=l,l<5){let o=3e3*Math.pow(2,l-1),f=Math.round(o/1e3),c;g.status===0||g.status==="NetworkError"?c=m("image.networkError"):g.status>=500?c=m("image.serverError"):g.status===408?c=m("image.timeoutError"):c=m("image.retryAttempt",{attempt:l,maxAttempts:5,delay:f}),a&&a(e.paintedPixels,e.totalPixels,c),d(`Reintento ${l}/5 despu\xE9s de ${f}s. Error: ${g.error}`),await I(o)}}catch(g){if(d(`Error en intento ${l}:`,g),e.retryCount=l,l<5){let o=3e3*Math.pow(2,l-1),f=Math.round(o/1e3),c=m("image.retryError",{attempt:l,maxAttempts:5,delay:f});a&&a(e.paintedPixels,e.totalPixels,c),await I(o)}}e.retryCount=5;let i=m("image.retryFailed",{maxAttempts:5});return a&&a(e.paintedPixels,e.totalPixels,i),d("Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function Se(n,a){let s=E.CHARGE_REGEN_MS*n+5e3;if(d(`Esperando ${Math.round(s/1e3)}s para obtener ${n} cargas`),e.inCooldown=!0,e.cooldownEndTime=Date.now()+s,e.nextBatchCooldown=Math.round(s/1e3),a){let i=Math.floor(s/6e4),l=Math.floor(s%6e4/1e3),g=i>0?`${i}m ${l}s`:`${l}s`,o=m("image.waitingChargesRegen",{current:Math.floor(e.currentCharges),needed:n,time:g});a(e.paintedPixels,e.totalPixels,o)}for(let i=Math.round(s/1e3);i>0&&!e.stopFlag;i--){if(e.nextBatchCooldown=i,a&&(i%5===0||i<=10||i===Math.round(s/1e3))){let l=Math.floor(i/60),g=i%60,o=l>0?`${l}m ${g}s`:`${g}s`,f=m("image.waitingChargesCountdown",{current:Math.floor(e.currentCharges),needed:n,time:o});a(e.paintedPixels,e.totalPixels,f)}await I(1e3)}e.inCooldown=!1,e.nextBatchCooldown=0,e.currentCharges=Math.min(e.maxCharges||50,e.currentCharges+s/E.CHARGE_REGEN_MS)}function Ee(n,a,r,s){let{pixels:i}=n,{x:l,y:g}=a,o=[];for(let f of i){let c=l+f.x,t=g+f.y;o.push({imageX:f.x,imageY:f.y,localX:c,localY:t,tileX:r,tileY:s,color:f.targetColor,originalColor:f.originalColor})}return d(`Cola de p\xEDxeles generada: ${o.length} p\xEDxeles para pintar`),o}function Ie(){if(!e.remainingPixels||e.remainingPixels.length===0)return 0;let n=e.remainingPixels.length,a=e.pixelsPerBatch,r=E.CHARGE_REGEN_MS/1e3,s=Math.ceil(n/a),i=a*r,l=(s-1)*i,g=s*2;return Math.ceil(l+g)}function X(){e.stopFlag=!0,e.running=!1,d("\u{1F6D1} Deteniendo proceso de pintado...")}function W(n=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let a={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch,useAllChargesFirst:e.useAllChargesFirst,isFirstBatch:e.isFirstBatch,maxCharges:e.maxCharges},colors:e.availableColors.map(o=>({id:o.id,r:o.r,g:o.g,b:o.b})),remainingPixels:e.remainingPixels||[]},r=JSON.stringify(a,null,2),s=new window.Blob([r],{type:"application/json"}),i=n||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,l=window.URL.createObjectURL(s),g=document.createElement("a");return g.href=l,g.download=i,document.body.appendChild(g),g.click(),document.body.removeChild(g),window.URL.revokeObjectURL(l),d(`\u2705 Progreso guardado: ${i}`),{success:!0,filename:i}}catch(a){return d("\u274C Error guardando progreso:",a),{success:!1,error:a.message}}}async function oe(n){return new Promise(a=>{try{let r=new window.FileReader;r.onload=s=>{try{let i=JSON.parse(s.target.result),g=["imageData","progress","position","colors"].filter(o=>!(o in i));if(g.length>0)throw new Error(`Campos requeridos faltantes: ${g.join(", ")}`);if(e.availableColors.length>0){let o=i.colors.map(t=>t.id),f=e.availableColors.map(t=>t.id);o.filter(t=>f.includes(t)).length<o.length*.8&&d("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...i.imageData,pixels:[]},e.paintedPixels=i.progress.paintedPixels,e.totalPixels=i.progress.totalPixels,i.progress.lastPosition?e.lastPosition=i.progress.lastPosition:i.position.lastX!==void 0&&i.position.lastY!==void 0&&(e.lastPosition={x:i.position.lastX,y:i.position.lastY}),i.position.startPosition?e.startPosition=i.position.startPosition:i.position.startX!==void 0&&i.position.startY!==void 0&&(e.startPosition={x:i.position.startX,y:i.position.startY}),e.tileX=i.position.tileX,e.tileY=i.position.tileY,e.originalImageName=i.imageData.originalName,e.remainingPixels=i.remainingPixels||i.progress.remainingPixels||[],i.config&&(e.pixelsPerBatch=i.config.pixelsPerBatch||e.pixelsPerBatch,e.useAllChargesFirst=i.config.useAllChargesFirst!==void 0?i.config.useAllChargesFirst:e.useAllChargesFirst,e.isFirstBatch=i.config.isFirstBatch!==void 0?i.config.isFirstBatch:!0,e.maxCharges=i.config.maxCharges||e.maxCharges),e.imageLoaded=!0,e.colorsChecked=!0,d(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),a({success:!0,data:i,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(i){d("\u274C Error parseando archivo de progreso:",i),a({success:!1,error:i.message})}},r.onerror=()=>{let s="Error leyendo archivo";d("\u274C",s),a({success:!1,error:s})},r.readAsText(n)}catch(r){d("\u274C Error cargando progreso:",r),a({success:!1,error:r.message})}})}function re(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,e.isFirstBatch=!0,e.nextBatchCooldown=0,d("\u{1F9F9} Progreso limpiado")}function ie(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function se(){return{hasProgress:ie(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:ie()}}function le(n=null){let a=document.createElement("div");n&&(a.id=n),a.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let r=a.attachShadow({mode:"open"});return document.body.appendChild(a),{host:a,root:r}}function ce(n,a){let r=0,s=0,i=0,l=0;n.style.cursor="move",n.addEventListener("mousedown",g);function g(c){c.target.closest(".header-btn, .wplace-header-btn")||(c.preventDefault(),i=c.clientX,l=c.clientY,document.addEventListener("mouseup",f),document.addEventListener("mousemove",o))}function o(c){c.preventDefault(),r=i-c.clientX,s=l-c.clientY,i=c.clientX,l=c.clientY,a.style.top=a.offsetTop-s+"px",a.style.left=a.offsetLeft-r+"px"}function f(){document.removeEventListener("mouseup",f),document.removeEventListener("mousemove",o)}}async function de({texts:n,...a}){if(d("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let h=document.createElement("link");h.rel="stylesheet",h.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(h),d("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:r,root:s}=le(),i=document.createElement("style");i.textContent=`
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
  `,s.appendChild(i);let l=document.createElement("div");l.className="container",l.innerHTML=`
    <div class="header">
      <div class="header-title">
        \u{1F5BC}\uFE0F
        <span>${n.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          \u2699\uFE0F
        </button>
        <button class="header-btn minimize-btn" title="${n.minimize}">
          \u2796
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${n.batchSize}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="20">
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            ${n.useAllCharges}
          </label>
        </div>
      </div>
      
      <!-- Configuraci\xF3n visible en la interfaz principal -->
      <div class="main-config">
        <div class="config-row">
          <div class="config-label">
            \u{1F3AF} ${n.batchSize}:
            <span class="batch-value">20</span>
          </div>
          <div class="config-label">
            \u23F1\uFE0F ${n.nextBatchTime}:
            <span class="cooldown-value">--</span>
          </div>
        </div>
      </div>
      
      <div class="controls">
        <button class="btn btn-primary init-btn">
          \u{1F916}
          <span>${n.initBot}</span>
        </button>
        <button class="btn btn-upload upload-btn" disabled>
          \u{1F4E4}
          <span>${n.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          \u{1F4C1}
          <span>${n.loadProgress}</span>
        </button>
        <button class="btn btn-primary resize-btn" disabled>
          \u{1F504}
          <span>${n.resizeImage}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          \u{1F3AF}
          <span>${n.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          \u25B6\uFE0F
          <span>${n.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          \u23F9\uFE0F
          <span>${n.stopPainting}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label">\u2139\uFE0F ${n.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${n.waitingInit}
      </div>
    </div>
  `,s.appendChild(l);let g=document.createElement("input");g.type="file",g.accept="image/png,image/jpeg",g.style.display="none",s.appendChild(g);let o=document.createElement("input");o.type="file",o.accept=".json",o.style.display="none",s.appendChild(o);let f=document.createElement("div");f.className="resize-overlay",s.appendChild(f);let c=document.createElement("div");c.className="resize-container",c.innerHTML=`
    <h3>${n.resizeImage}</h3>
    <div class="resize-controls">
      <label>
        ${n.width}: <span class="width-value">0</span>px
        <input type="range" class="resize-slider width-slider" min="10" max="500" value="100">
      </label>
      <label>
        ${n.height}: <span class="height-value">0</span>px
        <input type="range" class="resize-slider height-slider" min="10" max="500" value="100">
      </label>
      <label>
        <input type="checkbox" class="keep-aspect" checked>
        ${n.keepAspect}
      </label>
      <img class="resize-preview" src="" alt="Preview">
      <div class="resize-buttons">
        <button class="btn btn-primary confirm-resize">
          \u2705
          <span>${n.apply}</span>
        </button>
        <button class="btn btn-stop cancel-resize">
          \u274C
          <span>${n.cancel}</span>
        </button>
      </div>
    </div>
  `,s.appendChild(c);let t={header:l.querySelector(".header"),configBtn:l.querySelector(".config-btn"),minimizeBtn:l.querySelector(".minimize-btn"),configPanel:l.querySelector(".config-panel"),pixelsPerBatch:l.querySelector(".pixels-per-batch"),useAllCharges:l.querySelector(".use-all-charges"),batchValue:l.querySelector(".batch-value"),cooldownValue:l.querySelector(".cooldown-value"),initBtn:l.querySelector(".init-btn"),uploadBtn:l.querySelector(".upload-btn"),loadProgressBtn:l.querySelector(".load-progress-btn"),resizeBtn:l.querySelector(".resize-btn"),selectPosBtn:l.querySelector(".select-pos-btn"),startBtn:l.querySelector(".start-btn"),stopBtn:l.querySelector(".stop-btn"),progressBar:l.querySelector(".progress-bar"),statsArea:l.querySelector(".stats-area"),status:l.querySelector(".status"),content:l.querySelector(".content")},u={overlay:f,container:c,widthSlider:c.querySelector(".width-slider"),heightSlider:c.querySelector(".height-slider"),widthValue:c.querySelector(".width-value"),heightValue:c.querySelector(".height-value"),keepAspect:c.querySelector(".keep-aspect"),preview:c.querySelector(".resize-preview"),confirmBtn:c.querySelector(".confirm-resize"),cancelBtn:c.querySelector(".cancel-resize")},p={minimized:!1,configVisible:!1};ce(t.header,l),t.minimizeBtn.addEventListener("click",()=>{p.minimized=!p.minimized,p.minimized?(l.classList.add("minimized"),t.minimizeBtn.innerHTML="\u{1F53C}"):(l.classList.remove("minimized"),t.minimizeBtn.innerHTML="\u{1F53D}")}),t.configBtn.addEventListener("click",()=>{p.configVisible=!p.configVisible,p.configVisible?(t.configPanel.classList.add("visible"),t.configBtn.innerHTML="\u274C"):(t.configPanel.classList.remove("visible"),t.configBtn.innerHTML="\u2699\uFE0F")}),t.pixelsPerBatch.addEventListener("change",()=>{let h=parseInt(t.pixelsPerBatch.value)||20;t.batchValue.textContent=h,a.onConfigChange&&a.onConfigChange({pixelsPerBatch:h})}),t.useAllCharges.addEventListener("change",()=>{a.onConfigChange&&a.onConfigChange({useAllCharges:t.useAllCharges.checked})});function y(){t.uploadBtn.disabled=!1,t.loadProgressBtn.disabled=!1}t.initBtn.addEventListener("click",async()=>{t.initBtn.disabled=!0,a.onInitBot&&await a.onInitBot()&&y(),t.initBtn.disabled=!1}),t.uploadBtn.addEventListener("click",()=>{g.click()}),g.addEventListener("change",async()=>{g.files.length>0&&a.onUploadImage&&await a.onUploadImage(g.files[0])&&(t.selectPosBtn.disabled=!1,t.resizeBtn.disabled=!1)}),t.loadProgressBtn.addEventListener("click",()=>{o.click()}),o.addEventListener("change",async()=>{o.files.length>0&&a.onLoadProgress&&await a.onLoadProgress(o.files[0])&&(t.selectPosBtn.disabled=!1,t.startBtn.disabled=!1,t.resizeBtn.disabled=!1)}),t.resizeBtn.addEventListener("click",()=>{a.onResizeImage&&a.onResizeImage()}),t.selectPosBtn.addEventListener("click",async()=>{a.onSelectPosition&&(t.selectPosBtn.disabled=!0,await a.onSelectPosition()&&(t.startBtn.disabled=!1),t.selectPosBtn.disabled=!1)}),t.startBtn.addEventListener("click",async()=>{a.onStartPainting&&(t.startBtn.disabled=!0,t.stopBtn.disabled=!1,await a.onStartPainting()||(t.startBtn.disabled=!1,t.stopBtn.disabled=!0))}),t.stopBtn.addEventListener("click",async()=>{a.onStopPainting&&await a.onStopPainting()&&(t.startBtn.disabled=!1,t.stopBtn.disabled=!0)});function x(h,v="default"){t.status.textContent=h,t.status.className=`status status-${v}`,t.status.style.animation="none",t.status.offsetWidth,t.status.style.animation="slideIn 0.3s ease-out"}function w(h){let{width:v,height:b}=h.getDimensions(),T=v/b;u.widthSlider.value=v,u.heightSlider.value=b,u.widthValue.textContent=v,u.heightValue.textContent=b,u.preview.src=h.img.src,u.overlay.style.display="block",u.container.style.display="block";let S=()=>{let B=parseInt(u.widthSlider.value),A=parseInt(u.heightSlider.value);u.widthValue.textContent=B,u.heightValue.textContent=A,u.preview.src=h.generatePreview(B,A)},F=()=>{if(u.keepAspect.checked){let B=parseInt(u.widthSlider.value),A=Math.round(B/T);u.heightSlider.value=A}S()},R=()=>{if(u.keepAspect.checked){let B=parseInt(u.heightSlider.value),A=Math.round(B*T);u.widthSlider.value=A}S()};u.widthSlider.addEventListener("input",F),u.heightSlider.addEventListener("input",R);let M=()=>{let B=parseInt(u.widthSlider.value),A=parseInt(u.heightSlider.value);a.onConfirmResize&&a.onConfirmResize(h,B,A),P()},O=()=>{P()};u.confirmBtn.addEventListener("click",M),u.cancelBtn.addEventListener("click",O),u.overlay.addEventListener("click",O),window.cleanupResizeDialog=()=>{u.widthSlider.removeEventListener("input",F),u.heightSlider.removeEventListener("input",R),u.confirmBtn.removeEventListener("click",M),u.cancelBtn.removeEventListener("click",O),u.overlay.removeEventListener("click",O)},S()}function P(){u.overlay.style.display="none",u.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function C(h,v,b=null){let T=v>0?h/v*100:0;t.progressBar.style.width=`${T}%`;let S=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${n.progress}</div>
        <div>${h}/${v} (${T.toFixed(1)}%)</div>
      </div>
    `;if(b&&(b.username&&(S+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${b.username}</div>
          </div>
        `),b.charges!==void 0&&(S+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${n.charges}</div>
            <div>${Math.floor(b.charges)}</div>
          </div>
        `),b.pixels!==void 0&&(S+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${n.pixels}</div>
            <div>${b.pixels.toLocaleString()}</div>
          </div>
        `),b.estimatedTime!==void 0&&b.estimatedTime>0)){let F=Math.floor(b.estimatedTime/3600),R=Math.floor(b.estimatedTime%3600/60),M=F>0?`${F}h ${R}m`:`${R}m`;S+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${n.timeRemaining}</div>
            <div>${M}</div>
          </div>
        `}t.statsArea.innerHTML=S}function k(h){if(h>0){let v=Math.floor(h/60),b=h%60,T=v>0?`${v}m ${b}s`:`${b}s`;t.cooldownValue.textContent=T}else t.cooldownValue.textContent="--"}function D(h){h&&h.includes("\u23F3")?(t.status.textContent=h,t.status.className="status status-info"):h&&x(h,"info")}function z(h){h?(t.initBtn.disabled=!0,t.initBtn.style.opacity="0.6",t.initBtn.innerHTML=`\u2705 <span>${n.initBot} - Completado</span>`):(t.initBtn.disabled=!1,t.initBtn.style.opacity="1",t.initBtn.innerHTML=`\u{1F916} <span>${n.initBot}</span>`)}function me(h){t.initBtn.style.display=h?"flex":"none"}function fe(){r.remove()}return d("\u2705 Interfaz de Auto-Image creada"),{setStatus:x,updateProgress:C,updateCooldownDisplay:k,updateCooldownMessage:D,setInitialized:z,setInitButtonVisible:me,enableButtonsAfterInit:y,showResizeDialog:w,closeResizeDialog:P,destroy:fe}}function ue(n,a,r={}){return new Promise(s=>{let i=document.createElement("div");i.className="modal-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%",i.style.background="rgba(0,0,0,0.7)",i.style.zIndex="10001",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center";let l=document.createElement("div");l.style.background="#1a1a1a",l.style.border="2px solid #333",l.style.borderRadius="15px",l.style.padding="25px",l.style.color="#eee",l.style.minWidth="350px",l.style.maxWidth="400px",l.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",l.style.fontFamily="'Segoe UI', Roboto, sans-serif",l.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${a}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${n}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${r.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${r.save}</button>`:""}
        ${r.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${r.discard}</button>`:""}
        ${r.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${r.cancel}</button>`:""}
      </div>
    `,i.appendChild(l),document.body.appendChild(i);let g=l.querySelector(".save-btn"),o=l.querySelector(".discard-btn"),f=l.querySelector(".cancel-btn"),c=()=>{document.body.removeChild(i)};g&&g.addEventListener("click",()=>{c(),s("save")}),o&&o.addEventListener("click",()=>{c(),s("discard")}),f&&f.addEventListener("click",()=>{c(),s("cancel")}),i.addEventListener("click",t=>{t.target===i&&(c(),s("cancel"))})})}function U(){let n=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let s of n){let i=document.querySelector(s);if(i&&i.offsetParent!==null)return!0}let a=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),r=0;for(let s of a)if(s.offsetParent!==null&&s.offsetWidth>10&&s.offsetHeight>10&&(r++,r>=5))return!0;return!1}function ge(){let n=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(n){let s=n.textContent.toLowerCase().includes("paint"),i=n.querySelector('svg path[d*="240-120"]');if(s||i)return n.click(),!0}let a=document.querySelectorAll("button");for(let r of a)if(r.textContent.toLowerCase().includes("paint")&&r.offsetParent!==null&&!r.disabled)return r.click(),!0;return!1}async function pe(){d("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),Y(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let n=null,a=window.fetch,r=()=>{window.fetch!==a&&(window.fetch=a,d("\u{1F504} Fetch original restaurado")),e.positionTimeoutId&&(clearTimeout(e.positionTimeoutId),e.positionTimeoutId=null),e.cleanupObserver&&(e.cleanupObserver(),e.cleanupObserver=null),e.selectingPosition=!1};try{let s={...E},i=_("image");if(e.language=Z(),!s.SITEKEY){let c=document.querySelector("*[data-sitekey]");c?(s.SITEKEY=c.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${s.SITEKEY.substring(0,20)}...`)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function l(){return d("\u{1F916} Intentando auto-inicio..."),U()?(d("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(d("\u{1F50D} Paleta no encontrada, buscando bot\xF3n Paint..."),ge()?(d("\u{1F446} Bot\xF3n Paint encontrado y presionado"),await I(2e3),U()?(d("\u2705 Paleta abierta exitosamente"),!0):(d("\u274C La paleta no se abri\xF3 despu\xE9s de hacer clic"),!1)):(d("\u274C Bot\xF3n Paint no encontrado"),!1))}async function g(c=!1){d("\u{1F916} Inicializando Auto-Image..."),o.setStatus(m("image.checkingColors"),"info");let t=K();if(t.length===0)return o.setStatus(m("image.noColorsFound"),"error"),!1;let u=await Q(),p=null;return u.success&&u.data.user?(p={username:u.data.user.name||"An\xF3nimo",charges:u.data.charges,maxCharges:u.data.maxCharges,pixels:u.data.user.pixelsPainted||0},n=p,e.currentCharges=u.data.charges,e.maxCharges=u.data.maxCharges||50,d(`\u{1F464} Usuario conectado: ${u.data.user.name||"An\xF3nimo"} - Cargas: ${p.charges}/${p.maxCharges} - P\xEDxeles: ${p.pixels}`)):d("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=t,e.colorsChecked=!0,o.setStatus(m("image.colorsFound",{count:t.length}),"success"),o.updateProgress(0,0,p),c||d(`\u2705 ${t.length} colores disponibles detectados`),o.setInitialized(!0),o.enableButtonsAfterInit(),!0}let o=await de({texts:i,onConfigChange:c=>{c.pixelsPerBatch!==void 0&&(e.pixelsPerBatch=c.pixelsPerBatch),c.useAllCharges!==void 0&&(e.useAllChargesFirst=c.useAllCharges),d("Configuraci\xF3n actualizada:",c)},onInitBot:g,onUploadImage:async c=>{try{o.setStatus(m("image.loadingImage"),"info");let t=window.URL.createObjectURL(c),u=new N(t);u.originalName=c.name,await u.load();let p=u.processImage(e.availableColors,s);return e.imageData=p,e.imageData.processor=u,e.totalPixels=p.validPixelCount,e.paintedPixels=0,e.originalImageName=c.name,e.imageLoaded=!0,o.setStatus(m("image.imageLoaded",{count:p.validPixelCount}),"success"),o.updateProgress(0,p.validPixelCount,n),d(`\u2705 Imagen cargada: ${p.width}x${p.height}, ${p.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(t),!0}catch(t){return o.setStatus(m("image.imageError"),"error"),d("\u274C Error cargando imagen:",t),!1}},onSelectPosition:async()=>new Promise(c=>{o.setStatus(m("image.selectPositionAlert"),"info"),o.setStatus(m("image.waitingPosition"),"info"),e.selectingPosition=!0;let t=!1,u=()=>{window.fetch=async(x,w)=>{if(e.selectingPosition&&!t&&typeof x=="string"&&x.includes("/s0/pixel/")&&w&&w.method==="POST")try{d(`\u{1F3AF} Interceptando request de pintado: ${x}`);let P=await a(x,w);if(P.ok&&w.body){let C;try{C=JSON.parse(w.body)}catch(k){return d("Error parseando body del request:",k),P}if(C.coords&&Array.isArray(C.coords)&&C.coords.length>=2){let k=C.coords[0],D=C.coords[1],z=x.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);z&&!t?(t=!0,e.tileX=parseInt(z[1]),e.tileY=parseInt(z[2]),e.startPosition={x:k,y:D},e.selectingPosition=!1,r(),o.setStatus(m("image.positionSet"),"success"),d(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${k},${D})`),c(!0)):d("\u26A0\uFE0F No se pudo extraer tile de la URL:",x)}}return P}catch(P){if(d("\u274C Error interceptando pixel:",P),!t)return r(),a(x,w)}return a(x,w)}},p=()=>{let x=document.querySelectorAll("canvas");if(x.length===0){d("\u26A0\uFE0F No se encontraron elementos canvas");return}d(`\u{1F4CA} Configurando observer para ${x.length} canvas`);let w=P=>{if(!e.selectingPosition||t)return;let C=P.target;C&&C.tagName==="CANVAS"&&(d("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n"),setTimeout(()=>{!t&&e.selectingPosition&&d("\u{1F50D} Buscando requests recientes de pintado...")},500))};document.addEventListener("click",w),e.cleanupObserver=()=>{document.removeEventListener("click",w)}};u(),p();let y=setTimeout(()=>{e.selectingPosition&&!t&&(r(),e.cleanupObserver&&e.cleanupObserver(),o.setStatus(m("image.positionTimeout"),"error"),d("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),c(!1))},12e4);e.positionTimeoutId=y}),onStartPainting:async()=>{var c;if(d("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((c=e.remainingPixels)==null?void 0:c.length)||0}),!e.imageLoaded||!e.startPosition)return o.setStatus(m("image.missingRequirements"),"error"),d(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,e.isFirstBatch=!0,o.setStatus(m("image.startPaintingMsg"),"success");try{return await ne(e.imageData,e.startPosition,(t,u,p,y)=>{n&&(n.charges=Math.floor(e.currentCharges),y!==void 0&&(n.estimatedTime=y)),o.updateProgress(t,u,n),e.inCooldown&&e.nextBatchCooldown>0?o.updateCooldownDisplay(e.nextBatchCooldown):o.updateCooldownDisplay(0),p?p.includes("\u23F3")&&e.inCooldown?o.updateCooldownMessage(p):o.setStatus(p,"info"):o.setStatus(m("image.paintingProgress",{painted:t,total:u}),"info")},(t,u)=>{t?(o.setStatus(m("image.paintingComplete",{count:u}),"success"),re()):o.setStatus(m("image.paintingStopped"),"warning"),e.running=!1},t=>{o.setStatus(m("image.paintingError"),"error"),d("\u274C Error en proceso de pintado:",t),e.running=!1}),!0}catch(t){return o.setStatus(m("image.paintingError"),"error"),d("\u274C Error iniciando pintado:",t),e.running=!1,!1}},onStopPainting:async()=>{if(se().hasProgress){let t=await ue(m("image.confirmSaveProgress"),m("image.saveProgressTitle"),{save:m("image.saveProgress"),discard:m("image.discardProgress"),cancel:m("image.cancel")});if(t==="save"){let u=W();u.success?o.setStatus(m("image.progressSaved",{filename:u.filename}),"success"):o.setStatus(m("image.progressSaveError",{error:u.error}),"error")}else if(t==="cancel")return!1}return X(),o.setStatus(m("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let c=W();return c.success?o.setStatus(m("image.progressSaved",{filename:c.filename}),"success"):o.setStatus(m("image.progressSaveError",{error:c.error}),"error"),c.success},onLoadProgress:async c=>{try{let t=await oe(c);return t.success?(o.setStatus(m("image.progressLoaded",{painted:t.painted,total:t.total}),"success"),o.updateProgress(t.painted,t.total,n),d("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(o.setStatus(m("image.progressLoadError",{error:t.error}),"error"),!1)}catch(t){return o.setStatus(m("image.progressLoadError",{error:t.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&o.showResizeDialog(e.imageData.processor)},onConfirmResize:(c,t,u)=>{d(`\u{1F504} Redimensionando imagen de ${c.getDimensions().width}x${c.getDimensions().height} a ${t}x${u}`);try{c.resize(t,u);let p=c.processImage(e.availableColors,s);e.imageData=p,e.totalPixels=p.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},o.updateProgress(0,p.validPixelCount,n),o.setStatus(m("image.resizeSuccess",{width:t,height:u}),"success"),d(`\u2705 Imagen redimensionada: ${p.validPixelCount} p\xEDxeles v\xE1lidos`)}catch(p){d(`\u274C Error redimensionando imagen: ${p.message}`),o.setStatus(m("image.imageError"),"error")}}}),f=c=>{let{language:t}=c.detail;d(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${t}`),e.language=t};window.addEventListener("launcherLanguageChanged",f),window.addEventListener("languageChanged",f),window.addEventListener("beforeunload",()=>{r(),X(),o.destroy(),window.removeEventListener("launcherLanguageChanged",f),window.removeEventListener("languageChanged",f),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),d("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{o.setStatus(m("image.autoInitializing"),"info"),d("\u{1F916} Intentando auto-inicio..."),await l()?(o.setStatus(m("image.autoInitSuccess"),"success"),d("\u2705 Auto-inicio exitoso"),o.setInitButtonVisible(!1),await g(!0)&&d("\u{1F680} Bot auto-iniciado completamente")):(o.setStatus(m("image.autoInitFailed"),"warning"),d("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(c){d("\u274C Error en auto-inicio:",c),o.setStatus(m("image.manualInitRequired"),"warning")}},1e3)}catch(s){throw d("\u274C Error inicializando Auto-Image:",s),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),s}}(()=>{"use strict";var n,a;if((n=window.__wplaceBot)!=null&&n.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((a=window.__wplaceBot)!=null&&a.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,pe().catch(r=>{console.error("[BOT] Error en Auto-Image:",r),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
