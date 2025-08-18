/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-18T09:42:04.351Z */
(()=>{var l=(...s)=>console.log("[WPA-UI]",...s);var Z={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",userName:"Usuario",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",showOverlay:"Mostrar overlay",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando..."},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var G={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",userName:"User",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",showOverlay:"Show overlay",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout. Retrying..."},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var K={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",userName:"Usager",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",showOverlay:"Afficher l'overlay",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 Timeout serveur. Nouvel essai..."},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var Q={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",autoImage:"\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",selection:"\u0412\u044B\u0431\u0440\u0430\u043D\u043E",user:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",charges:"\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",backend:"\u0411\u044D\u043A\u0435\u043D\u0434",database:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",uptime:"\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",launch:"\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",executing:"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",downloading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",chooseBot:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",readyToLaunch:"\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",loadError:"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",loadErrorMsg:"\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",checking:"\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",online:"\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",offline:"\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",ok:"\u{1F7E2} \u041E\u041A",error:"\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",unknown:"-"},image:{title:"WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",initBot:"\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",uploadImage:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",resizeImage:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",startPainting:"\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",stopPainting:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",saveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",loadProgress:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",checkingColors:"\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",noColorsFound:"\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",colorsFound:"\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",loadingImage:"\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",imageLoaded:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",imageError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",selectPositionAlert:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",positionDetected:"\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",positionError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",startPaintingMsg:"\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",paintingProgress:"\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",noCharges:"\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",paintingStopped:"\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",paintingComplete:"\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",paintingError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",missingRequirements:"\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",progress:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",userName:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",pixels:"\u041F\u0438\u043A\u0441\u0435\u043B\u0438",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",estimatedTime:"\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",initMessage:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",waitingInit:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",resizeSuccess:"\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",paintingPaused:"\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",batchSize:"\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",nextBatchTime:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437",useAllCharges:"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",showOverlay:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435",maxCharges:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",waitingForCharges:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",timeRemaining:"\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",cooldownWaiting:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",progressSaved:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",progressLoaded:"\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",progressLoadError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",progressSaveError:"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",confirmSaveProgress:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",saveProgressTitle:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",discardProgress:"\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",minimize:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",width:"\u0428\u0438\u0440\u0438\u043D\u0430",height:"\u0412\u044B\u0441\u043E\u0442\u0430",keepAspect:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",apply:"\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",passCompleted:"\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",waitingChargesRegen:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",waitingChargesCountdown:"\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",autoInitializing:"\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",autoInitSuccess:"\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",autoInitFailed:"\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",paletteDetected:"\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",paletteNotFound:"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",clickingPaintButton:"\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",paintButtonNotFound:"\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",manualInitRequired:"\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",retryAttempt:"\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryError:"\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",retryFailed:"\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",networkError:"\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",serverError:"\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",timeoutError:"\u23F0 \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430..."},farm:{title:"WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",stopped:"\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",calibrate:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",paintOnce:"\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",checkingStatus:"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",configuration:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",delay:"\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",pixelsPerBatch:"\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",minCharges:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",colorMode:"\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",random:"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",fixed:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",range:"\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",fixedColor:"\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",advanced:"\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",tileX:"\u041F\u043B\u0438\u0442\u043A\u0430 X",tileY:"\u041F\u043B\u0438\u0442\u043A\u0430 Y",customPalette:"\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",paletteExample:"\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",capture:"\u0417\u0430\u0445\u0432\u0430\u0442",painted:"\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",charges:"\u0417\u0430\u0440\u044F\u0434\u044B",retries:"\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",tile:"\u041F\u043B\u0438\u0442\u043A\u0430",configSaved:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",configLoaded:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",configReset:"\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",captureInstructions:"\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",backendOnline:"\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",backendOffline:"\u0411\u044D\u043A\u044D\u043D\u0434",startingBot:"\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",stoppingBot:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",calibrating:"\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",alreadyRunning:"\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",imageRunningWarning:"\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",selectPosition:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C",selectPositionAlert:"\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",waitingPosition:"\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",positionSet:"\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",positionTimeout:"\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",missingPosition:"\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",farmRadius:"\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",positionInfo:"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",farmingInRadius:"\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",selectEmptyArea:"\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",noPosition:"\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",currentZone:"\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",autoSelectPosition:"\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430."},common:{yes:"\u0414\u0430",no:"\u041D\u0435\u0442",ok:"\u041E\u041A",cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",load:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",delete:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",edit:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",start:"\u041D\u0430\u0447\u0430\u0442\u044C",stop:"\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",pause:"\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",resume:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",reset:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",help:"\u041F\u043E\u043C\u043E\u0449\u044C",about:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",language:"\u042F\u0437\u044B\u043A",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",error:"\u041E\u0448\u0438\u0431\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",info:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",languageChanged:"\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"}};var k={es:Z,en:G,fr:K,ru:Q},N="es",M=k[N];function fe(){let t=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return k[t]?t:"es"}function xe(){return null}function X(){let s=xe(),t=fe(),d="es";return s&&k[s]?d=s:t&&k[t]&&(d=t),Pe(d),d}function Pe(s){if(!k[s]){console.warn(`Idioma '${s}' no disponible. Usando '${N}'`);return}N=s,M=k[s],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:s,translations:M}}))}function J(){return N}function b(s,t={}){let d=s.split("."),a=M;for(let o of d)if(a&&typeof a=="object"&&o in a)a=a[o];else return console.warn(`Clave de traducci\xF3n no encontrada: '${s}'`),s;return typeof a!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${s}'`),s):be(a,t)}function be(s,t){return!t||Object.keys(t).length===0?s:s.replace(/\{(\w+)\}/g,(d,a)=>t[a]!==void 0?t[a]:d)}function W(s){return M[s]?M[s]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${s}'`),{})}X();var _={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:_.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:_.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:50,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0};function V(){l("\u{1F3A8} Detectando colores disponibles...");let s=document.querySelectorAll('[id^="color-"]'),t=[];for(let d of s){if(d.querySelector("svg"))continue;let a=d.id.replace("color-",""),o=parseInt(a);if(o===0||o===5)continue;let c=d.style.backgroundColor;if(c){let g=c.match(/\d+/g);if(g&&g.length>=3){let n={r:parseInt(g[0]),g:parseInt(g[1]),b:parseInt(g[2])};t.push({id:o,element:d,...n}),l(`Color detectado: id=${o}, rgb(${n.r},${n.g},${n.b})`)}}}return l(`\u2705 ${t.length} colores disponibles detectados`),t}var q=class{constructor(t){this.imageSrc=t,this.img=new window.Image,this.originalName=null,this.tileSize=1e3,this.drawMult=3,this.shreadSize=3,this.bitmap=null,this.imageWidth=0,this.imageHeight=0,this.totalPixels=0,this.requiredPixelCount=0,this.defacePixelCount=0,this.colorPalette={},this.allowedColorsSet=new Set,this.rgbToMeta=new Map,this.coords=[0,0,0,0],this.templateTiles={},this.templateTilesBuffers={},this.tilePrefixes=new Set}async load(){return new Promise((t,d)=>{this.img.onload=async()=>{try{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,l(`[BLUE MARBLE] Imagen cargada: ${this.imageWidth}\xD7${this.imageHeight} = ${this.totalPixels.toLocaleString()} p\xEDxeles`),t()}catch(a){d(a)}},this.img.onerror=d,this.img.src=this.imageSrc})}initializeColorPalette(){l("[BLUE MARBLE] Inicializando paleta de colores...");let t=this.detectSiteColors();this.allowedColorsSet=new Set(t.filter(a=>a.name&&a.name.toLowerCase()!=="transparent"&&Array.isArray(a.rgb)).map(a=>`${a.rgb[0]},${a.rgb[1]},${a.rgb[2]}`));let d="222,250,206";this.allowedColorsSet.add(d),this.rgbToMeta=new Map(t.filter(a=>Array.isArray(a.rgb)).map(a=>[`${a.rgb[0]},${a.rgb[1]},${a.rgb[2]}`,{id:a.id,premium:!!a.premium,name:a.name||`Color ${a.id}`}]));try{let a=t.find(o=>o.name&&o.name.toLowerCase()==="transparent");a&&Array.isArray(a.rgb)&&this.rgbToMeta.set(d,{id:a.id,premium:!!a.premium,name:a.name})}catch{}return l(`[BLUE MARBLE] Paleta inicializada: ${this.allowedColorsSet.size} colores permitidos`),Array.from(t)}detectSiteColors(){let t=document.querySelectorAll('[id^="color-"]'),d=[];for(let a of t){if(a.querySelector("svg"))continue;let o=a.id.replace("color-",""),c=parseInt(o),g=a.style.backgroundColor;if(g){let n=g.match(/\d+/g);if(n&&n.length>=3){let p=[parseInt(n[0]),parseInt(n[1]),parseInt(n[2])];d.push({id:c,element:a,rgb:p,name:a.title||a.getAttribute("aria-label")||`Color ${c}`,premium:a.classList.contains("premium")||a.querySelector(".premium")})}}}return l(`[BLUE MARBLE] ${d.length} colores detectados del sitio`),d}setCoords(t,d,a,o){this.coords=[t,d,a,o],l(`[BLUE MARBLE] Coordenadas establecidas: tile(${t},${d}) pixel(${a},${o})`)}async analyzePixels(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");l("[BLUE MARBLE] Analizando p\xEDxeles de la imagen...");try{let d=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});d.imageSmoothingEnabled=!1,d.clearRect(0,0,this.imageWidth,this.imageHeight),d.drawImage(this.bitmap,0,0);let a=d.getImageData(0,0,this.imageWidth,this.imageHeight).data,o=0,c=0,g=new Map;for(let p=0;p<this.imageHeight;p++)for(let r=0;r<this.imageWidth;r++){let i=(p*this.imageWidth+r)*4,u=a[i],f=a[i+1],v=a[i+2];if(a[i+3]===0)continue;let m=`${u},${f},${v}`;u===222&&f===250&&v===206&&c++,this.allowedColorsSet.has(m)&&(o++,g.set(m,(g.get(m)||0)+1))}this.requiredPixelCount=o,this.defacePixelCount=c;let n={};for(let[p,r]of g.entries())n[p]={count:r,enabled:!0};return this.colorPalette=n,l("[BLUE MARBLE] An\xE1lisis completado:"),l(`  - P\xEDxeles requeridos: ${o.toLocaleString()}`),l(`  - P\xEDxeles #deface: ${c.toLocaleString()}`),l(`  - Colores \xFAnicos: ${g.size}`),{totalPixels:this.totalPixels,requiredPixels:o,defacePixels:c,uniqueColors:g.size,colorPalette:n}}catch{return this.requiredPixelCount=Math.max(0,this.totalPixels),this.defacePixelCount=0,l("[BLUE MARBLE] Fallback: usando total de p\xEDxeles como requeridos"),{totalPixels:this.totalPixels,requiredPixels:this.totalPixels,defacePixels:0,uniqueColors:0,colorPalette:{}}}}async createTemplateTiles(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");l("[BLUE MARBLE] Creando tiles de template...");let t={},d={},a=new OffscreenCanvas(this.tileSize,this.tileSize),o=a.getContext("2d",{willReadFrequently:!0});for(let c=this.coords[3];c<this.imageHeight+this.coords[3];){let g=Math.min(this.tileSize-c%this.tileSize,this.imageHeight-(c-this.coords[3]));for(let n=this.coords[2];n<this.imageWidth+this.coords[2];){let p=Math.min(this.tileSize-n%this.tileSize,this.imageWidth-(n-this.coords[2])),r=p*this.shreadSize,i=g*this.shreadSize;a.width=r,a.height=i,o.imageSmoothingEnabled=!1,o.clearRect(0,0,r,i),o.drawImage(this.bitmap,n-this.coords[2],c-this.coords[3],p,g,0,0,p*this.shreadSize,g*this.shreadSize);let u=o.getImageData(0,0,r,i);for(let m=0;m<i;m++)for(let x=0;x<r;x++){let P=(m*r+x)*4;if(u.data[P]===222&&u.data[P+1]===250&&u.data[P+2]===206)(x+m)%2===0?(u.data[P]=0,u.data[P+1]=0,u.data[P+2]=0):(u.data[P]=255,u.data[P+1]=255,u.data[P+2]=255),u.data[P+3]=32;else if(x%this.shreadSize!==1||m%this.shreadSize!==1)u.data[P+3]=0;else{let y=u.data[P],C=u.data[P+1],L=u.data[P+2];this.allowedColorsSet.has(`${y},${C},${L}`)||(u.data[P+3]=0)}}o.putImageData(u,0,0);let f=`${(this.coords[0]+Math.floor(n/1e3)).toString().padStart(4,"0")},${(this.coords[1]+Math.floor(c/1e3)).toString().padStart(4,"0")},${(n%1e3).toString().padStart(3,"0")},${(c%1e3).toString().padStart(3,"0")}`;t[f]=await createImageBitmap(a),this.tilePrefixes.add(f.split(",").slice(0,2).join(","));let S=await(await a.convertToBlob()).arrayBuffer();d[f]=S,n+=p}c+=g}return this.templateTiles=t,this.templateTilesBuffers=d,l(`[BLUE MARBLE] Tiles creados: ${Object.keys(t).length} tiles`),l(`[BLUE MARBLE] Prefijos registrados: ${this.tilePrefixes.size} tiles \xFAnicos`),{templateTiles:t,templateTilesBuffers:d}}generatePixelQueue(){if(!this.bitmap)throw new Error("Imagen no cargada. Llama a load() primero.");l("[BLUE MARBLE] Generando cola de p\xEDxeles...");let t=[],d=this.coords[0]*1e3+(this.coords[2]||0),a=this.coords[1]*1e3+(this.coords[3]||0),c=new OffscreenCanvas(this.imageWidth,this.imageHeight).getContext("2d",{willReadFrequently:!0});c.imageSmoothingEnabled=!1,c.drawImage(this.bitmap,0,0);let g=c.getImageData(0,0,this.imageWidth,this.imageHeight).data;for(let n=0;n<this.imageHeight;n++)for(let p=0;p<this.imageWidth;p++){let r=(n*this.imageWidth+p)*4,i=g[r],u=g[r+1],f=g[r+2],v=g[r+3];if(v===0||i===222&&u===250&&f===206)continue;let S=`${i},${u},${f}`;if(!this.allowedColorsSet.has(S))continue;let m=d+p,x=a+n,P=Math.floor(m/1e3),y=Math.floor(x/1e3),C=m%1e3,L=x%1e3,w=this.rgbToMeta.get(S)||{id:0,name:"Unknown"};t.push({imageX:p,imageY:n,globalX:m,globalY:x,tileX:P,tileY:y,localX:C,localY:L,color:{r:i,g:u,b:f,id:w.id,name:w.name},originalColor:{r:i,g:u,b:f,alpha:v}})}return l(`[BLUE MARBLE] Cola generada: ${t.length} p\xEDxeles v\xE1lidos`),t}async resize(t,d,a=!0){if(!this.img)throw new Error("Imagen no cargada. Llama a load() primero.");let o=this.img.width,c=this.img.height;if(a){let r=o/c;t/d>r?t=d*r:d=t/r}let g=document.createElement("canvas");g.width=t,g.height=d;let n=g.getContext("2d");n.imageSmoothingEnabled=!1,n.drawImage(this.img,0,0,t,d);let p=g.toDataURL();return this.img.src=p,this.imageSrc=p,await new Promise(r=>{this.img.onload=async()=>{this.bitmap=await createImageBitmap(this.img),this.imageWidth=this.bitmap.width,this.imageHeight=this.bitmap.height,this.totalPixels=this.imageWidth*this.imageHeight,r()}}),l(`[BLUE MARBLE] Imagen redimensionada: ${o}\xD7${c} \u2192 ${this.imageWidth}\xD7${this.imageHeight}`),{width:this.imageWidth,height:this.imageHeight}}getImageData(){return{width:this.imageWidth,height:this.imageHeight,totalPixels:this.totalPixels,requiredPixels:this.requiredPixelCount,defacePixels:this.defacePixelCount,colorPalette:this.colorPalette,coords:[...this.coords],originalName:this.originalName||"image.png",pixels:this.generatePixelQueue()}}generatePreview(t=200,d=200){if(!this.img)return null;let a=document.createElement("canvas"),o=a.getContext("2d"),{width:c,height:g}=this.img,n=c/g,p,r;return t/d>n?(r=d,p=d*n):(p=t,r=t/n),a.width=p,a.height=r,o.imageSmoothingEnabled=!1,o.drawImage(this.img,0,0,p,r),a.toDataURL()}getDimensions(){return{width:this.imageWidth,height:this.imageHeight}}};var T=s=>new Promise(t=>setTimeout(t,s));var ee="https://backend.wplace.live";async function te(){var s,t,d;try{let a=await fetch(`${ee}/me`,{credentials:"include"}).then(n=>n.json()),o=a||null,c=(a==null?void 0:a.charges)||{},g={count:(s=c.count)!=null?s:0,max:(t=c.max)!=null?t:0,cooldownMs:(d=c.cooldownMs)!=null?d:3e4};return{success:!0,data:{user:o,charges:g.count,maxCharges:g.max,chargeRegen:g.cooldownMs}}}catch(a){return{success:!1,error:a.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function ae(s,t,d,a,o){try{let c=JSON.stringify({colors:a,coords:d,t:o}),g=await fetch(`${ee}/s0/pixel/${s}/${t}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:c}),n=null;try{n=await g.json()}catch{n={}}return{status:g.status,json:n,success:g.ok,painted:(n==null?void 0:n.painted)||0}}catch(c){return{status:0,json:{error:c.message},success:!1,painted:0}}}var ie=!1;async function we(){if(!(ie||window.turnstile))return new Promise((s,t)=>{let d=document.createElement("script");d.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",d.async=!0,d.defer=!0,d.onload=()=>{ie=!0,s()},d.onerror=()=>t(new Error("No se pudo cargar Turnstile")),document.head.appendChild(d)})}async function ye(s,t="paint"){var d;if(await we(),typeof((d=window.turnstile)==null?void 0:d.execute)=="function")try{let a=await window.turnstile.execute(s,{action:t});if(a&&a.length>20)return a}catch{}return await new Promise(a=>{let o=document.createElement("div");o.style.position="fixed",o.style.left="-9999px",document.body.appendChild(o),window.turnstile.render(o,{sitekey:s,callback:c=>{document.body.removeChild(o),a(c)}})})}async function ne(s){return ye(s,"paint")}async function oe(s,t,d,a,o){let{width:c,height:g}=s,{x:n,y:p}=t;if(l(`Iniciando pintado: imagen(${c}x${g}) inicio LOCAL(${n},${p}) tile(${e.tileX},${e.tileY})`),!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0){l("Generando cola de p\xEDxeles..."),e.remainingPixels=Se(s,t,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(r=>{let i=r.imageY*c+r.imageX,u=e.lastPosition.y*c+e.lastPosition.x;return i>=u})),l(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),e.startPosition&&e.tileX!==void 0&&e.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch}),l(`\u2705 Plan overlay actualizado con ${e.remainingPixels.length} p\xEDxeles en cola`))}catch(r){l("\u26A0\uFE0F Error actualizando plan overlay:",r)}}try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let r=Math.floor(e.currentCharges),i;if(e.isFirstBatch&&e.useAllChargesFirst&&r>0?(i=Math.min(r,e.remainingPixels.length),e.isFirstBatch=!1,l(`Primera pasada: usando ${i} cargas de ${r} disponibles`)):i=Math.min(e.pixelsPerBatch,e.remainingPixels.length),r<i){l(`Cargas insuficientes: ${r}/${i} necesarias`),await Ee(i-r,d),r=Math.floor(e.currentCharges),e.isFirstBatch||(i=Math.min(e.pixelsPerBatch,e.remainingPixels.length,r));continue}let u=e.remainingPixels.splice(0,i);l(`Pintando lote de ${u.length} p\xEDxeles...`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch})}catch(v){l("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",v)}let f=await Ce(u,d);if(f.success&&f.painted>0){if(e.paintedPixels+=f.painted,e.currentCharges=Math.max(0,e.currentCharges-f.painted),l(`Cargas despu\xE9s del lote: ${e.currentCharges.toFixed(1)} (consumidas: ${f.painted})`),u.length>0){let x=u[u.length-1];e.lastPosition={x:x.imageX,y:x.imageY}}l(`Lote exitoso: ${f.painted}/${u.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`);let v=Ae(),S=(e.paintedPixels/e.totalPixels*100).toFixed(1),m=b("image.passCompleted",{painted:f.painted,percent:S,current:e.paintedPixels,total:e.totalPixels});d&&d(e.paintedPixels,e.totalPixels,m,v),await T(2e3)}else f.shouldContinue?l("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(e.remainingPixels.unshift(...u),l("Lote fall\xF3: reintentando en 5 segundos..."),await T(5e3));await T(500)}if(e.stopFlag)l(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),a&&a(!1,e.paintedPixels);else{l(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[];try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),l("\u2705 Plan overlay limpiado al completar pintado"))}catch(r){l("\u26A0\uFE0F Error limpiando plan overlay:",r)}a&&a(!0,e.paintedPixels)}}catch(r){l("Error en proceso de pintado:",r),o&&o(r)}}async function ve(s){var t;try{if(!s||s.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let d=[],a=[],o=null,c=null;for(let p of s)d.push(p.localX,p.localY),a.push(p.color.id||p.color.value||1),o===null&&(o=p.tileX,c=p.tileY);let g=await ne(_.SITEKEY),n=await ae(o,c,d,a,g);return n.status===200?{success:!0,painted:n.painted,response:n.json}:{success:!1,painted:0,error:((t=n.json)==null?void 0:t.message)||`HTTP ${n.status}`,status:n.status}}catch(d){return l("Error en paintPixelBatch:",d),{success:!1,painted:0,error:d.message}}}async function Ce(s,t){for(let c=1;c<=5;c++)try{let g=await ve(s);if(g.success)return e.retryCount=0,g;if(e.retryCount=c,c<5){let n=3e3*Math.pow(2,c-1),p=Math.round(n/1e3),r;g.status===0||g.status==="NetworkError"?r=b("image.networkError"):g.status>=500?r=b("image.serverError"):g.status===408?r=b("image.timeoutError"):r=b("image.retryAttempt",{attempt:c,maxAttempts:5,delay:p}),t&&t(e.paintedPixels,e.totalPixels,r),l(`Reintento ${c}/5 despu\xE9s de ${p}s. Error: ${g.error}`),await T(n)}}catch(g){if(l(`Error en intento ${c}:`,g),e.retryCount=c,c<5){let n=3e3*Math.pow(2,c-1),p=Math.round(n/1e3),r=b("image.retryError",{attempt:c,maxAttempts:5,delay:p});t&&t(e.paintedPixels,e.totalPixels,r),await T(n)}}e.retryCount=5;let o=b("image.retryFailed",{maxAttempts:5});return t&&t(e.paintedPixels,e.totalPixels,o),l("Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function Ee(s,t){let a=_.CHARGE_REGEN_MS*s+5e3;if(l(`Esperando ${Math.round(a/1e3)}s para obtener ${s} cargas`),e.inCooldown=!0,e.cooldownEndTime=Date.now()+a,e.nextBatchCooldown=Math.round(a/1e3),t){let o=Math.floor(a/6e4),c=Math.floor(a%6e4/1e3),g=o>0?`${o}m ${c}s`:`${c}s`,n=b("image.waitingChargesRegen",{current:Math.floor(e.currentCharges),needed:s,time:g});t(e.paintedPixels,e.totalPixels,n)}for(let o=Math.round(a/1e3);o>0&&!e.stopFlag;o--){if(e.nextBatchCooldown=o,t&&(o%5===0||o<=10||o===Math.round(a/1e3))){let c=Math.floor(o/60),g=o%60,n=c>0?`${c}m ${g}s`:`${g}s`,p=b("image.waitingChargesCountdown",{current:Math.floor(e.currentCharges),needed:s,time:n});t(e.paintedPixels,e.totalPixels,p)}await T(1e3)}e.inCooldown=!1,e.nextBatchCooldown=0,e.currentCharges=Math.min(e.maxCharges||50,e.currentCharges+a/_.CHARGE_REGEN_MS)}function Se(s,t,d,a){let{pixels:o}=s,{x:c,y:g}=t,n=[];for(let p of o){let r=c+p.x,i=g+p.y;n.push({imageX:p.x,imageY:p.y,localX:r,localY:i,tileX:d,tileY:a,color:p.targetColor,originalColor:p.originalColor})}return l(`Cola de p\xEDxeles generada: ${n.length} p\xEDxeles para pintar`),n}function Ae(){if(!e.remainingPixels||e.remainingPixels.length===0)return 0;let s=e.remainingPixels.length,t=e.pixelsPerBatch,d=_.CHARGE_REGEN_MS/1e3,a=Math.ceil(s/t),o=t*d,c=(a-1)*o,g=a*2;return Math.ceil(c+g)}function U(){e.stopFlag=!0,e.running=!1,l("\u{1F6D1} Deteniendo proceso de pintado...")}function H(s=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let t={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch,useAllChargesFirst:e.useAllChargesFirst,isFirstBatch:e.isFirstBatch,maxCharges:e.maxCharges},colors:e.availableColors.map(n=>({id:n.id,r:n.r,g:n.g,b:n.b})),remainingPixels:e.remainingPixels||[]},d=JSON.stringify(t,null,2),a=new window.Blob([d],{type:"application/json"}),o=s||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,c=window.URL.createObjectURL(a),g=document.createElement("a");return g.href=c,g.download=o,document.body.appendChild(g),g.click(),document.body.removeChild(g),window.URL.revokeObjectURL(c),l(`\u2705 Progreso guardado: ${o}`),{success:!0,filename:o}}catch(t){return l("\u274C Error guardando progreso:",t),{success:!1,error:t.message}}}async function se(s){return new Promise(t=>{try{let d=new window.FileReader;d.onload=a=>{try{let o=JSON.parse(a.target.result),g=["imageData","progress","position","colors"].filter(n=>!(n in o));if(g.length>0)throw new Error(`Campos requeridos faltantes: ${g.join(", ")}`);if(e.availableColors.length>0){let n=o.colors.map(i=>i.id),p=e.availableColors.map(i=>i.id);n.filter(i=>p.includes(i)).length<n.length*.8&&l("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...o.imageData,pixels:[]},e.paintedPixels=o.progress.paintedPixels,e.totalPixels=o.progress.totalPixels,o.progress.lastPosition?e.lastPosition=o.progress.lastPosition:o.position.lastX!==void 0&&o.position.lastY!==void 0&&(e.lastPosition={x:o.position.lastX,y:o.position.lastY}),o.position.startPosition?e.startPosition=o.position.startPosition:o.position.startX!==void 0&&o.position.startY!==void 0&&(e.startPosition={x:o.position.startX,y:o.position.startY}),e.tileX=o.position.tileX,e.tileY=o.position.tileY,e.originalImageName=o.imageData.originalName,e.remainingPixels=o.remainingPixels||o.progress.remainingPixels||[];try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),e.startPosition&&e.tileX!==void 0&&e.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y}),l(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${e.tileX},${e.tileY}) local(${e.startPosition.x},${e.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch}),l(`\u2705 Plan overlay activado con ${e.remainingPixels.length} p\xEDxeles restantes`))}catch(n){l("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",n)}o.config&&(e.pixelsPerBatch=o.config.pixelsPerBatch||e.pixelsPerBatch,e.useAllChargesFirst=o.config.useAllChargesFirst!==void 0?o.config.useAllChargesFirst:e.useAllChargesFirst,e.isFirstBatch=o.config.isFirstBatch!==void 0?o.config.isFirstBatch:!0,e.maxCharges=o.config.maxCharges||e.maxCharges),e.imageLoaded=!0,e.colorsChecked=!0,l(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),t({success:!0,data:o,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(o){l("\u274C Error parseando archivo de progreso:",o),t({success:!1,error:o.message})}},d.onerror=()=>{let a="Error leyendo archivo";l("\u274C",a),t({success:!1,error:a})},d.readAsText(s)}catch(d){l("\u274C Error cargando progreso:",d),t({success:!1,error:d.message})}})}function le(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,e.isFirstBatch=!0,e.nextBatchCooldown=0,l("\u{1F9F9} Progreso limpiado")}function re(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function ce(){return{hasProgress:re(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:re()}}function de(s=null){let t=document.createElement("div");s&&(t.id=s),t.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let d=t.attachShadow({mode:"open"});return document.body.appendChild(t),{host:t,root:d}}function ue(s,t){let d=0,a=0,o=0,c=0;s.style.cursor="move",s.addEventListener("mousedown",g);function g(r){r.target.closest(".header-btn, .wplace-header-btn")||(r.preventDefault(),o=r.clientX,c=r.clientY,document.addEventListener("mouseup",p),document.addEventListener("mousemove",n))}function n(r){r.preventDefault(),d=o-r.clientX,a=c-r.clientY,o=r.clientX,c=r.clientY,t.style.top=t.offsetTop-a+"px",t.style.left=t.offsetLeft-d+"px"}function p(){document.removeEventListener("mouseup",p),document.removeEventListener("mousemove",n)}}async function ge({texts:s,...t}){if(l("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let h=document.createElement("link");h.rel="stylesheet",h.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(h),l("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:d,root:a}=de(),o=document.createElement("style");o.textContent=`
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
  `,a.appendChild(o);let c=document.createElement("div");c.className="container",c.innerHTML=`
    <div class="header">
      <div class="header-title">
        \u{1F5BC}\uFE0F
        <span>${s.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          \u2699\uFE0F
        </button>
        <button class="header-btn minimize-btn" title="${s.minimize}">
          \u2796
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${s.batchSize}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="20">
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            ${s.useAllCharges}
          </label>
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox show-overlay" type="checkbox" checked>
            ${s.showOverlay||"Mostrar overlay"}
          </label>
        </div>
      </div>
      
      <!-- Configuraci\xF3n visible en la interfaz principal -->
      <div class="main-config">
        <div class="config-row">
          <div class="config-label">
            \u{1F3AF} ${s.batchSize}:
            <span class="batch-value">20</span>
          </div>
          <div class="config-label">
            \u23F1\uFE0F ${s.nextBatchTime}:
            <span class="cooldown-value">--</span>
          </div>
        </div>
      </div>
      
      <div class="controls">
        <button class="btn btn-primary init-btn">
          \u{1F916}
          <span>${s.initBot}</span>
        </button>
        <button class="btn btn-upload upload-btn" disabled>
          \u{1F4E4}
          <span>${s.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          \u{1F4C1}
          <span>${s.loadProgress}</span>
        </button>
        <button class="btn btn-primary resize-btn" disabled>
          \u{1F504}
          <span>${s.resizeImage}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          \u{1F3AF}
          <span>${s.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          \u25B6\uFE0F
          <span>${s.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          \u23F9\uFE0F
          <span>${s.stopPainting}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label">\u2139\uFE0F ${s.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${s.waitingInit}
      </div>
    </div>
  `,a.appendChild(c);let g=document.createElement("input");g.type="file",g.accept="image/png,image/jpeg",g.style.display="none",a.appendChild(g);let n=document.createElement("input");n.type="file",n.accept=".json",n.style.display="none",a.appendChild(n);let p=document.createElement("div");p.className="resize-overlay",a.appendChild(p);let r=document.createElement("div");r.className="resize-container",r.innerHTML=`
    <h3>${s.resizeImage}</h3>
    <div class="resize-controls">
      <label>
        ${s.width}: <span class="width-value">0</span>px
        <input type="range" class="resize-slider width-slider" min="10" max="500" value="100">
      </label>
      <label>
        ${s.height}: <span class="height-value">0</span>px
        <input type="range" class="resize-slider height-slider" min="10" max="500" value="100">
      </label>
      <label>
        <input type="checkbox" class="keep-aspect" checked>
        ${s.keepAspect}
      </label>
      <img class="resize-preview" src="" alt="Preview">
      <div class="resize-buttons">
        <button class="btn btn-primary confirm-resize">
          \u2705
          <span>${s.apply}</span>
        </button>
        <button class="btn btn-stop cancel-resize">
          \u274C
          <span>${s.cancel}</span>
        </button>
      </div>
    </div>
  `,a.appendChild(r);let i={header:c.querySelector(".header"),configBtn:c.querySelector(".config-btn"),minimizeBtn:c.querySelector(".minimize-btn"),configPanel:c.querySelector(".config-panel"),pixelsPerBatch:c.querySelector(".pixels-per-batch"),useAllCharges:c.querySelector(".use-all-charges"),showOverlay:c.querySelector(".show-overlay"),batchValue:c.querySelector(".batch-value"),cooldownValue:c.querySelector(".cooldown-value"),initBtn:c.querySelector(".init-btn"),uploadBtn:c.querySelector(".upload-btn"),loadProgressBtn:c.querySelector(".load-progress-btn"),resizeBtn:c.querySelector(".resize-btn"),selectPosBtn:c.querySelector(".select-pos-btn"),startBtn:c.querySelector(".start-btn"),stopBtn:c.querySelector(".stop-btn"),progressBar:c.querySelector(".progress-bar"),statsArea:c.querySelector(".stats-area"),status:c.querySelector(".status"),content:c.querySelector(".content")},u={overlay:p,container:r,widthSlider:r.querySelector(".width-slider"),heightSlider:r.querySelector(".height-slider"),widthValue:r.querySelector(".width-value"),heightValue:r.querySelector(".height-value"),keepAspect:r.querySelector(".keep-aspect"),preview:r.querySelector(".resize-preview"),confirmBtn:r.querySelector(".confirm-resize"),cancelBtn:r.querySelector(".cancel-resize")},f={minimized:!1,configVisible:!1};ue(i.header,c),i.minimizeBtn.addEventListener("click",()=>{f.minimized=!f.minimized,f.minimized?(c.classList.add("minimized"),i.minimizeBtn.innerHTML="\u{1F53C}"):(c.classList.remove("minimized"),i.minimizeBtn.innerHTML="\u{1F53D}")}),i.configBtn.addEventListener("click",()=>{f.configVisible=!f.configVisible,f.configVisible?(i.configPanel.classList.add("visible"),i.configBtn.innerHTML="\u274C"):(i.configPanel.classList.remove("visible"),i.configBtn.innerHTML="\u2699\uFE0F")}),i.pixelsPerBatch.addEventListener("change",()=>{let h=parseInt(i.pixelsPerBatch.value)||20;i.batchValue.textContent=h,t.onConfigChange&&t.onConfigChange({pixelsPerBatch:h})}),i.useAllCharges.addEventListener("change",()=>{t.onConfigChange&&t.onConfigChange({useAllCharges:i.useAllCharges.checked})});function v(){i.uploadBtn.disabled=!1,i.loadProgressBtn.disabled=!1}i.initBtn.addEventListener("click",async()=>{i.initBtn.disabled=!0,t.onInitBot&&await t.onInitBot()&&v(),i.initBtn.disabled=!1}),i.uploadBtn.addEventListener("click",()=>{g.click()}),g.addEventListener("change",async()=>{g.files.length>0&&t.onUploadImage&&await t.onUploadImage(g.files[0])&&(i.selectPosBtn.disabled=!1,i.resizeBtn.disabled=!1)}),i.loadProgressBtn.addEventListener("click",()=>{n.click()}),n.addEventListener("change",async()=>{n.files.length>0&&t.onLoadProgress&&await t.onLoadProgress(n.files[0])&&(i.selectPosBtn.disabled=!1,i.startBtn.disabled=!1,i.resizeBtn.disabled=!1)}),i.resizeBtn.addEventListener("click",()=>{t.onResizeImage&&t.onResizeImage()}),i.selectPosBtn.addEventListener("click",async()=>{t.onSelectPosition&&(i.selectPosBtn.disabled=!0,await t.onSelectPosition()&&(i.startBtn.disabled=!1),i.selectPosBtn.disabled=!1)}),i.showOverlay.addEventListener("change",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let h=i.showOverlay.checked;window.__WPA_PLAN_OVERLAY__.setEnabled(h)}),i.startBtn.addEventListener("click",async()=>{t.onStartPainting&&(i.startBtn.disabled=!0,i.stopBtn.disabled=!1,await t.onStartPainting()||(i.startBtn.disabled=!1,i.stopBtn.disabled=!0))}),i.stopBtn.addEventListener("click",async()=>{t.onStopPainting&&await t.onStopPainting()&&(i.startBtn.disabled=!1,i.stopBtn.disabled=!0)});function S(h,A="default"){i.status.textContent=h,i.status.className=`status status-${A}`,i.status.style.animation="none",i.status.offsetWidth,i.status.style.animation="slideIn 0.3s ease-out"}function m(h){let{width:A,height:B}=h.getDimensions(),z=A/B;u.widthSlider.value=A,u.heightSlider.value=B,u.widthValue.textContent=A,u.heightValue.textContent=B,u.preview.src=h.img.src,u.overlay.style.display="block",u.container.style.display="block";let I=()=>{let R=parseInt(u.widthSlider.value),$=parseInt(u.heightSlider.value);u.widthValue.textContent=R,u.heightValue.textContent=$,u.preview.src=h.generatePreview(R,$)},O=()=>{if(u.keepAspect.checked){let R=parseInt(u.widthSlider.value),$=Math.round(R/z);u.heightSlider.value=$}I()},F=()=>{if(u.keepAspect.checked){let R=parseInt(u.heightSlider.value),$=Math.round(R*z);u.widthSlider.value=$}I()};u.widthSlider.addEventListener("input",O),u.heightSlider.addEventListener("input",F);let Y=()=>{let R=parseInt(u.widthSlider.value),$=parseInt(u.heightSlider.value);t.onConfirmResize&&t.onConfirmResize(h,R,$),x()},D=()=>{x()};u.confirmBtn.addEventListener("click",Y),u.cancelBtn.addEventListener("click",D),u.overlay.addEventListener("click",D),window.cleanupResizeDialog=()=>{u.widthSlider.removeEventListener("input",O),u.heightSlider.removeEventListener("input",F),u.confirmBtn.removeEventListener("click",Y),u.cancelBtn.removeEventListener("click",D),u.overlay.removeEventListener("click",D)},I()}function x(){u.overlay.style.display="none",u.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function P(h,A,B=null){let z=A>0?h/A*100:0;i.progressBar.style.width=`${z}%`;let I=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${s.progress}</div>
        <div>${h}/${A} (${z.toFixed(1)}%)</div>
      </div>
    `;if(B&&(B.username&&(I+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} ${s.userName}</div>
            <div>${B.username}</div>
          </div>
        `),B.charges!==void 0&&(I+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${s.charges}</div>
            <div>${Math.floor(B.charges)}</div>
          </div>
        `),B.pixels!==void 0&&(I+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${s.pixels}</div>
            <div>${B.pixels.toLocaleString()}</div>
          </div>
        `),B.estimatedTime!==void 0&&B.estimatedTime>0)){let O=Math.floor(B.estimatedTime/3600),F=Math.floor(B.estimatedTime%3600/60),Y=O>0?`${O}h ${F}m`:`${F}m`;I+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${s.timeRemaining}</div>
            <div>${Y}</div>
          </div>
        `}i.statsArea.innerHTML=I}function y(h){if(h>0){let A=Math.floor(h/60),B=h%60,z=A>0?`${A}m ${B}s`:`${B}s`;i.cooldownValue.textContent=z}else i.cooldownValue.textContent="--"}function C(h){h&&h.includes("\u23F3")?(i.status.textContent=h,i.status.className="status status-info"):h&&S(h,"info")}function L(h){h?(i.initBtn.disabled=!0,i.initBtn.style.opacity="0.6",i.initBtn.innerHTML=`\u2705 <span>${s.initBot} - Completado</span>`):(i.initBtn.disabled=!1,i.initBtn.style.opacity="1",i.initBtn.innerHTML=`\u{1F916} <span>${s.initBot}</span>`)}function w(h){i.initBtn.style.display=h?"flex":"none"}function E(){d.remove()}return l("\u2705 Interfaz de Auto-Image creada"),{setStatus:S,updateProgress:P,updateCooldownDisplay:y,updateCooldownMessage:C,setInitialized:L,setInitButtonVisible:w,enableButtonsAfterInit:v,showResizeDialog:m,closeResizeDialog:x,destroy:E}}function pe(s,t,d={}){return new Promise(a=>{let o=document.createElement("div");o.className="modal-overlay",o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.height="100%",o.style.background="rgba(0,0,0,0.7)",o.style.zIndex="10001",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center";let c=document.createElement("div");c.style.background="#1a1a1a",c.style.border="2px solid #333",c.style.borderRadius="15px",c.style.padding="25px",c.style.color="#eee",c.style.minWidth="350px",c.style.maxWidth="400px",c.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",c.style.fontFamily="'Segoe UI', Roboto, sans-serif",c.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${t}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${s}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${d.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${d.save}</button>`:""}
        ${d.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${d.discard}</button>`:""}
        ${d.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${d.cancel}</button>`:""}
      </div>
    `,o.appendChild(c),document.body.appendChild(o);let g=c.querySelector(".save-btn"),n=c.querySelector(".discard-btn"),p=c.querySelector(".cancel-btn"),r=()=>{document.body.removeChild(o)};g&&g.addEventListener("click",()=>{r(),a("save")}),n&&n.addEventListener("click",()=>{r(),a("discard")}),p&&p.addEventListener("click",()=>{r(),a("cancel")}),o.addEventListener("click",i=>{i.target===o&&(r(),a("cancel"))})})}function j(){let s=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let a of s){let o=document.querySelector(a);if(o&&o.offsetParent!==null)return!0}let t=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),d=0;for(let a of t)if(a.offsetParent!==null&&a.offsetWidth>10&&a.offsetHeight>10&&(d++,d>=5))return!0;return!1}function me(){let s=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(s){let a=s.textContent.toLowerCase().includes("paint"),o=s.querySelector('svg path[d*="240-120"]');if(a||o)return s.click(),!0}let t=document.querySelectorAll("button");for(let d of t)if(d.textContent.toLowerCase().includes("paint")&&d.offsetParent!==null&&!d.disabled)return d.click(),!0;return!1}(()=>{let t={enabled:!1,templates:[],templatesShouldBeDrawn:!0,tileSize:1e3,drawMult:3,pixelPlan:null,nextBatchCount:0,anchor:null,imageWidth:null,imageHeight:null,originalFetch:null,fetchedBlobQueue:new Map,isIntercepting:!1};function d(){console.log("[PLAN OVERLAY] Blue Marble tile system initialized")}function a(){t.isIntercepting||(t.originalFetch=window.fetch,t.isIntercepting=!0,window.fetch=async function(...m){var L;let x=await t.originalFetch.apply(this,m),P=x.clone(),y=(m[0]instanceof Request?(L=m[0])==null?void 0:L.url:m[0])||"ignore";if((P.headers.get("content-type")||"").includes("image/")&&y.includes("/tiles/")&&!y.includes("openfreemap")&&!y.includes("maps")){console.log("[PLAN OVERLAY] Intercepting tile request:",y);try{let w=await P.blob(),E=await c(w,y);return new Response(E,{headers:P.headers,status:P.status,statusText:P.statusText})}catch(w){return console.error("[PLAN OVERLAY] Error processing tile:",w),x}}return x},console.log("[PLAN OVERLAY] Fetch interception started"))}function o(){!t.isIntercepting||!t.originalFetch||(window.fetch=t.originalFetch,t.isIntercepting=!1,console.log("[PLAN OVERLAY] Fetch interception stopped"))}async function c(m,x){if(!t.enabled||!t.templatesShouldBeDrawn||!t.pixelPlan)return m;let P=x.split("/"),y=parseInt(P[P.length-1].replace(".png","")),C=parseInt(P[P.length-2]);if(isNaN(C)||isNaN(y))return console.warn("[PLAN OVERLAY] Could not extract tile coordinates from URL:",x),m;console.log(`[PLAN OVERLAY] Processing tile: ${C},${y}`);let L=g(C,y);if(L.length===0)return m;console.log(`[PLAN OVERLAY] Found ${L.length} pixels for tile ${C},${y}`);let w=t.tileSize*t.drawMult,E=await createImageBitmap(m),h=new OffscreenCanvas(w,w),A=h.getContext("2d");return A.imageSmoothingEnabled=!1,A.clearRect(0,0,w,w),A.drawImage(E,0,0,w,w),n(A,L,C,y),await h.convertToBlob({type:"image/png"})}function g(m,x){return!t.pixelPlan||!t.pixelPlan.pixels?[]:t.pixelPlan.pixels.filter(P=>{let y=Math.floor(P.globalX/3e3),C=Math.floor(P.globalY/3e3);return y===m&&C===x})}function n(m,x,P,y){let C=P*3e3,L=y*3e3;m.globalAlpha=.7;for(let w of x){let E=(w.globalX-C)*t.drawMult+1,h=(w.globalY-L)*t.drawMult+1;E>=0&&E<t.tileSize*t.drawMult&&h>=0&&h<t.tileSize*t.drawMult&&(m.fillStyle=`rgb(${w.r},${w.g},${w.b})`,m.fillRect(E,h,1,1))}if(t.nextBatchCount>0){m.globalAlpha=1;let w=x.slice(0,t.nextBatchCount);for(let E of w){let h=(E.globalX-C)*t.drawMult+1,A=(E.globalY-L)*t.drawMult+1;h>=0&&h<t.tileSize*t.drawMult&&A>=0&&A<t.tileSize*t.drawMult&&(m.fillStyle=`rgb(${E.r},${E.g},${E.b})`,m.fillRect(h,A,1,1))}}}function p(m){t.enabled=!!m,t.enabled?a():o(),console.log(`[PLAN OVERLAY] setEnabled: ${t.enabled}`)}function r(m,x={}){var y,C,L;if(!m||m.length===0){t.pixelPlan=null,console.log("[PLAN OVERLAY] Plan cleared");return}let P=[];for(let w of m){let E,h;if(typeof w.tileX=="number"&&typeof w.localX=="number")E=w.tileX*3e3+w.localX,h=w.tileY*3e3+w.localY;else if(x.anchor&&typeof w.imageX=="number"){let A=x.anchor.tileX*3e3+(x.anchor.pxX||0),B=x.anchor.tileY*3e3+(x.anchor.pxY||0);E=A+w.imageX,h=B+w.imageY}else continue;P.push({globalX:E,globalY:h,r:((y=w.color)==null?void 0:y.r)||0,g:((C=w.color)==null?void 0:C.g)||0,b:((L=w.color)==null?void 0:L.b)||0})}t.pixelPlan={pixels:P},t.nextBatchCount=x.nextBatchCount||0,t.anchor=x.anchor||null,t.imageWidth=x.imageWidth||null,t.imageHeight=x.imageHeight||null,console.log(`[PLAN OVERLAY] Plan set: ${P.length} pixels`),typeof x.enabled=="boolean"&&p(x.enabled)}function i(m){t.nextBatchCount=Math.max(0,Number(m||0)),console.log(`[PLAN OVERLAY] Next batch count: ${t.nextBatchCount}`)}function u(m){t.anchor=m,console.log("[PLAN OVERLAY] Anchor set:",m)}function f(m,x){console.log("[PLAN OVERLAY] CSS anchor set (ignored in tile system):",{x:m,y:x})}function v(){console.log("[PLAN OVERLAY] Selection mode ended (ignored in tile system)")}function S(){o(),t.pixelPlan=null,t.fetchedBlobQueue.clear(),console.log("[PLAN OVERLAY] Cleanup completed")}window.__WPA_PLAN_OVERLAY__={injectStyles:d,setEnabled:p,setPlan:r,setPlanItemsFromTileList:r,setNextBatchCount:i,setAnchor:u,setAnchorCss:f,endSelectionMode:v,render:()=>{},cleanup:S,get state(){return t}},console.log("[PLAN OVERLAY] Blue Marble tile system ready")})();async function he(){l("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),X(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let s=null,t=window.fetch,d=()=>{window.fetch!==t&&(window.fetch=t,l("\u{1F504} Fetch original restaurado")),e.positionTimeoutId&&(clearTimeout(e.positionTimeoutId),e.positionTimeoutId=null),e.cleanupObserver&&(e.cleanupObserver(),e.cleanupObserver=null),e.selectingPosition=!1};try{let a={..._},o=W("image");if(e.language=J(),!a.SITEKEY){let r=document.querySelector("*[data-sitekey]");r?(a.SITEKEY=r.getAttribute("data-sitekey"),l(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${a.SITEKEY.substring(0,20)}...`)):l("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function c(){return l("\u{1F916} Intentando auto-inicio..."),j()?(l("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(l("\u{1F50D} Paleta no encontrada, buscando bot\xF3n Paint..."),me()?(l("\u{1F446} Bot\xF3n Paint encontrado y presionado"),await T(2e3),j()?(l("\u2705 Paleta abierta exitosamente"),!0):(l("\u274C La paleta no se abri\xF3 despu\xE9s de hacer clic"),!1)):(l("\u274C Bot\xF3n Paint no encontrado"),!1))}async function g(r=!1){l("\u{1F916} Inicializando Auto-Image..."),n.setStatus(b("image.checkingColors"),"info");let i=V();if(i.length===0)return n.setStatus(b("image.noColorsFound"),"error"),!1;let u=await te(),f=null;u.success&&u.data.user?(f={username:u.data.user.name||"An\xF3nimo",charges:u.data.charges,maxCharges:u.data.maxCharges,pixels:u.data.user.pixelsPainted||0},s=f,e.currentCharges=u.data.charges,e.maxCharges=u.data.maxCharges||50,l(`\u{1F464} Usuario conectado: ${u.data.user.name||"An\xF3nimo"} - Cargas: ${f.charges}/${f.maxCharges} - P\xEDxeles: ${f.pixels}`)):l("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=i,e.colorsChecked=!0,n.setStatus(b("image.colorsFound",{count:i.length}),"success"),n.updateProgress(0,0,f),r||l(`\u2705 ${i.length} colores disponibles detectados`),n.setInitialized(!0),n.enableButtonsAfterInit();try{}catch{}return!0}let n=await ge({texts:o,onConfigChange:r=>{r.pixelsPerBatch!==void 0&&(e.pixelsPerBatch=r.pixelsPerBatch),r.useAllCharges!==void 0&&(e.useAllChargesFirst=r.useAllCharges),l("Configuraci\xF3n actualizada:",r)},onInitBot:g,onUploadImage:async r=>{try{n.setStatus(b("image.loadingImage"),"info");let i=window.URL.createObjectURL(r),u=new q(i);u.originalName=r.name,await u.load();let f=u.initializeColorPalette();e.availableColors=f;let v=await u.analyzePixels();u.setCoords(0,0,0,0);let S=u.getImageData();e.imageData=S,e.imageData.processor=u,e.totalPixels=v.requiredPixels,e.paintedPixels=0,e.originalImageName=r.name,e.imageLoaded=!0,n.setStatus(b("image.imageLoaded",{count:v.requiredPixels}),"success"),n.updateProgress(0,v.requiredPixels,s),l(`\u2705 [BLUE MARBLE] Imagen cargada: ${S.width}x${S.height}, ${v.requiredPixels} p\xEDxeles v\xE1lidos`),l(`\u2705 [BLUE MARBLE] An\xE1lisis: ${v.uniqueColors} colores \xFAnicos, ${v.defacePixels} p\xEDxeles #deface`),window.URL.revokeObjectURL(i);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),l("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(m){l("\u26A0\uFE0F Error activando plan overlay:",m)}return!0}catch(i){return n.setStatus(b("image.imageError"),"error"),l("\u274C Error cargando imagen:",i),!1}},onSelectPosition:async()=>new Promise(r=>{n.setStatus(b("image.selectPositionAlert"),"info"),n.setStatus(b("image.waitingPosition"),"info"),e.selectingPosition=!0;let i=!1,u=()=>{window.fetch=async(S,m)=>{if(e.selectingPosition&&!i&&typeof S=="string"&&S.includes("/s0/pixel/")&&m&&m.method==="POST")try{l(`\u{1F3AF} Interceptando request de pintado: ${S}`);let x=await t(S,m);if(x.ok&&m.body){let P;try{P=JSON.parse(m.body)}catch(y){return l("Error parseando body del request:",y),x}if(P.coords&&Array.isArray(P.coords)&&P.coords.length>=2){let y=P.coords[0],C=P.coords[1],L=S.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(L&&!i){i=!0;let w=parseInt(L[1]),E=parseInt(L[2]);if(e.tileX=w,e.tileY=E,e.startPosition={x:y,y:C},e.selectingPosition=!1,e.imageData&&e.imageData.processor){let h=e.imageData.processor;h.setCoords(w,E,y,C);try{await h.createTemplateTiles(),l(`\u2705 [BLUE MARBLE] Template tiles creados para posici\xF3n tile(${w},${E}) pixel(${y},${C})`)}catch(B){l(`\u274C [BLUE MARBLE] Error creando template tiles: ${B.message}`)}let A=h.generatePixelQueue();e.remainingPixels=A,e.totalPixels=A.length,l(`\u2705 Cola de p\xEDxeles generada: ${A.length} p\xEDxeles para overlay`)}try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:w,tileY:E,pxX:y,pxY:C}),e.remainingPixels&&e.remainingPixels.length>0?(window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{anchor:{tileX:w,tileY:E,pxX:y,pxY:C},imageWidth:e.imageData.width,imageHeight:e.imageData.height,enabled:!0}),l(`\u2705 Plan overlay anclado en tile(${w},${E}) local(${y},${C})`)):l("\u26A0\uFE0F No hay p\xEDxeles para mostrar en overlay"))}catch(h){l(`\u274C Error configurando overlay: ${h.message}`)}d(),n.setStatus(b("image.positionSet"),"success"),l(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${y},${C})`),r(!0)}else l("\u26A0\uFE0F No se pudo extraer tile de la URL:",S)}}return x}catch(x){if(l("\u274C Error interceptando pixel:",x),!i)return d(),t(S,m)}return t(S,m)}},f=()=>{let S=document.querySelectorAll("canvas");if(S.length===0){l("\u26A0\uFE0F No se encontraron elementos canvas");return}l(`\u{1F4CA} Configurando observer para ${S.length} canvas`);let m=x=>{var y;if(!e.selectingPosition||i)return;let P=x.target;if(P&&P.tagName==="CANVAS"){l("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let L=(((y=document.querySelector("canvas"))==null?void 0:y.parentElement)||document.body).getBoundingClientRect(),w=x.clientX-L.left,E=x.clientY-L.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(w,E),l(`Plan overlay: ancla CSS establecida en (${w}, ${E})`))}catch(C){l("Plan Overlay: error calculando ancla CSS",C)}setTimeout(()=>{!i&&e.selectingPosition&&l("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",m),e.cleanupObserver=()=>{document.removeEventListener("click",m)}};u(),f();let v=setTimeout(()=>{e.selectingPosition&&!i&&(d(),e.cleanupObserver&&e.cleanupObserver(),n.setStatus(b("image.positionTimeout"),"error"),l("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),r(!1))},12e4);e.positionTimeoutId=v}),onStartPainting:async()=>{var r;if(l("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((r=e.remainingPixels)==null?void 0:r.length)||0}),!e.imageLoaded||!e.startPosition)return n.setStatus(b("image.missingRequirements"),"error"),l(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,e.isFirstBatch=!0,n.setStatus(b("image.startPaintingMsg"),"success");try{return await oe(e.imageData,e.startPosition,(i,u,f,v)=>{s&&(s.charges=Math.floor(e.currentCharges),v!==void 0&&(s.estimatedTime=v)),n.updateProgress(i,u,s),e.inCooldown&&e.nextBatchCooldown>0?n.updateCooldownDisplay(e.nextBatchCooldown):n.updateCooldownDisplay(0),f?f.includes("\u23F3")&&e.inCooldown?n.updateCooldownMessage(f):n.setStatus(f,"info"):n.setStatus(b("image.paintingProgress",{painted:i,total:u}),"info")},(i,u)=>{i?(n.setStatus(b("image.paintingComplete",{count:u}),"success"),le()):n.setStatus(b("image.paintingStopped"),"warning"),e.running=!1},i=>{n.setStatus(b("image.paintingError"),"error"),l("\u274C Error en proceso de pintado:",i),e.running=!1}),!0}catch(i){return n.setStatus(b("image.paintingError"),"error"),l("\u274C Error iniciando pintado:",i),e.running=!1,!1}},onStopPainting:async()=>{if(ce().hasProgress){let i=await pe(b("image.confirmSaveProgress"),b("image.saveProgressTitle"),{save:b("image.saveProgress"),discard:b("image.discardProgress"),cancel:b("image.cancel")});if(i==="save"){let u=H();u.success?n.setStatus(b("image.progressSaved",{filename:u.filename}),"success"):n.setStatus(b("image.progressSaveError",{error:u.error}),"error")}else if(i==="cancel")return!1}return U(),n.setStatus(b("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let r=H();return r.success?n.setStatus(b("image.progressSaved",{filename:r.filename}),"success"):n.setStatus(b("image.progressSaveError",{error:r.error}),"error"),r.success},onLoadProgress:async r=>{try{let i=await se(r);return i.success?(n.setStatus(b("image.progressLoaded",{painted:i.painted,total:i.total}),"success"),n.updateProgress(i.painted,i.total,s),l("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(n.setStatus(b("image.progressLoadError",{error:i.error}),"error"),!1)}catch(i){return n.setStatus(b("image.progressLoadError",{error:i.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&n.showResizeDialog(e.imageData.processor)},onConfirmResize:async(r,i,u)=>{l(`\u{1F504} Redimensionando imagen de ${r.getDimensions().width}x${r.getDimensions().height} a ${i}x${u}`);try{await r.resize(i,u);let f=await r.analyzePixels();e.imageData={processor:r,width:i,height:u,validPixelCount:f.validPixelCount,totalPixels:f.totalPixels,unknownPixels:f.unknownPixels},e.totalPixels=f.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},n.updateProgress(0,f.validPixelCount,s),n.setStatus(b("image.resizeSuccess",{width:i,height:u}),"success"),l(`\u2705 Imagen redimensionada: ${f.validPixelCount} p\xEDxeles v\xE1lidos de ${f.totalPixels} totales`);try{if(window.__WPA_PLAN_OVERLAY__&&e.startPosition&&e.tileX!=null&&e.tileY!=null){await r.createTemplateTiles();let v=r.generatePixelQueue();e.remainingPixels=v,e.totalPixels=v.length,window.__WPA_PLAN_OVERLAY__.setPlan(v,{anchor:{tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y},imageWidth:i,imageHeight:u,enabled:!0}),l(`\u2705 Overlay actualizado con ${v.length} p\xEDxeles despu\xE9s del resize`)}}catch(v){l(`\u26A0\uFE0F Error actualizando overlay despu\xE9s del resize: ${v.message}`)}}catch(f){l(`\u274C Error redimensionando imagen: ${f.message}`),n.setStatus(b("image.imageError"),"error")}}}),p=r=>{let{language:i}=r.detail;l(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${i}`),e.language=i};window.addEventListener("launcherLanguageChanged",p),window.addEventListener("languageChanged",p),window.addEventListener("beforeunload",()=>{d(),U(),n.destroy(),window.removeEventListener("launcherLanguageChanged",p),window.removeEventListener("languageChanged",p),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),l("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{n.setStatus(b("image.autoInitializing"),"info"),l("\u{1F916} Intentando auto-inicio..."),await c()?(n.setStatus(b("image.autoInitSuccess"),"success"),l("\u2705 Auto-inicio exitoso"),n.setInitButtonVisible(!1),await g(!0)&&l("\u{1F680} Bot auto-iniciado completamente")):(n.setStatus(b("image.autoInitFailed"),"warning"),l("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(r){l("\u274C Error en auto-inicio:",r),n.setStatus(b("image.manualInitRequired"),"warning")}},1e3)}catch(a){throw l("\u274C Error inicializando Auto-Image:",a),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),a}}(()=>{"use strict";var s,t;if((s=window.__wplaceBot)!=null&&s.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((t=window.__wplaceBot)!=null&&t.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,he().catch(d=>{console.error("[BOT] Error en Auto-Image:",d),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
