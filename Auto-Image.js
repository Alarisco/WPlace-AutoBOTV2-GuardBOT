/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-17T16:12:14.212Z */
(()=>{var d=(...o)=>console.log("[WPA-UI]",...o);var Z={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando..."},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var G={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout. Retrying..."},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var K={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 Timeout serveur. Nouvel essai..."},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var D={es:Z,en:G,fr:K},X="es",M=D[X];function be(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return D[a]?a:"es"}function Pe(){return null}function V(){let o=Pe(),a=be(),l="es";return o&&D[o]?l=o:a&&D[a]&&(l=a),ye(l),l}function ye(o){if(!D[o]){console.warn(`Idioma '${o}' no disponible. Usando '${X}'`);return}X=o,M=D[o],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:o,translations:M}}))}function J(){return X}function b(o,a={}){let l=o.split("."),t=M;for(let i of l)if(t&&typeof t=="object"&&i in t)t=t[i];else return console.warn(`Clave de traducci\xF3n no encontrada: '${o}'`),o;return typeof t!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${o}'`),o):ve(t,a)}function ve(o,a){return!a||Object.keys(a).length===0?o:o.replace(/\{(\w+)\}/g,(l,t)=>a[t]!==void 0?a[t]:l)}function W(o){return M[o]?M[o]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${o}'`),{})}V();var z={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:z.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:z.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:50,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0};var q=class{constructor(a){this.imageSrc=a,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((a,l)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),a()},this.img.onerror=l,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(a,l){let t=document.createElement("canvas");return t.width=a,t.height=l,t.getContext("2d").drawImage(this.img,0,0,a,l),this.canvas.width=a,this.canvas.height=l,this.ctx.drawImage(t,0,0),this.getPixelData()}generatePreview(a,l){return this.previewCanvas.width=a,this.previewCanvas.height=l,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,a,l),this.previewCanvas.toDataURL()}getImageData(){let{width:a,height:l}=this.getDimensions(),t=this.getPixelData();return{width:a,height:l,pixels:t,originalName:this.originalName||"image.png"}}processImage(a,l){let{width:t,height:i}=this.getDimensions(),s=this.getPixelData(),g=[],r=0;for(let P=0;P<i;P++)for(let c=0;c<t;c++){let n=(P*t+c)*4,u=s[n],h=s[n+1],S=s[n+2],L=s[n+3];if(L<l.TRANSPARENCY_THRESHOLD||u>l.WHITE_THRESHOLD&&h>l.WHITE_THRESHOLD&&S>l.WHITE_THRESHOLD)continue;let I=this.findClosestColor({r:u,g:h,b:S},a);I&&(g.push({x:c,y:P,originalColor:{r:u,g:h,b:S,alpha:L},targetColor:I}),r++)}return{width:t,height:i,pixels:g,validPixelCount:r,originalName:this.originalName||"image.png"}}findClosestColor(a,l){if(!l||l.length===0)return null;let t=null,i=1/0;for(let s of l){let g=Math.sqrt(Math.pow(a.r-s.r,2)+Math.pow(a.g-s.g,2)+Math.pow(a.b-s.b,2));g<i&&(i=g,t=s)}return t}};function Q(){d("\u{1F3A8} Detectando colores disponibles...");let o=document.querySelectorAll('[id^="color-"]'),a=[];for(let l of o){if(l.querySelector("svg"))continue;let t=l.id.replace("color-",""),i=parseInt(t);if(i===0||i===5)continue;let s=l.style.backgroundColor;if(s){let g=s.match(/\d+/g);if(g&&g.length>=3){let r={r:parseInt(g[0]),g:parseInt(g[1]),b:parseInt(g[2])};a.push({id:i,element:l,...r}),d(`Color detectado: id=${i}, rgb(${r.r},${r.g},${r.b})`)}}}return d(`\u2705 ${a.length} colores disponibles detectados`),a}var $=o=>new Promise(a=>setTimeout(a,o));var ee="https://backend.wplace.live";async function te(){var o,a,l;try{let t=await fetch(`${ee}/me`,{credentials:"include"}).then(r=>r.json()),i=t||null,s=(t==null?void 0:t.charges)||{},g={count:(o=s.count)!=null?o:0,max:(a=s.max)!=null?a:0,cooldownMs:(l=s.cooldownMs)!=null?l:3e4};return{success:!0,data:{user:i,charges:g.count,maxCharges:g.max,chargeRegen:g.cooldownMs}}}catch(t){return{success:!1,error:t.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function ne(o,a,l,t,i){try{let s=JSON.stringify({colors:t,coords:l,t:i}),g=await fetch(`${ee}/s0/pixel/${o}/${a}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:s}),r=null;try{r=await g.json()}catch{r={}}return{status:g.status,json:r,success:g.ok,painted:(r==null?void 0:r.painted)||0}}catch(s){return{status:0,json:{error:s.message},success:!1,painted:0}}}var ae=!1;async function we(){if(!(ae||window.turnstile))return new Promise((o,a)=>{let l=document.createElement("script");l.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",l.async=!0,l.defer=!0,l.onload=()=>{ae=!0,o()},l.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(l)})}async function Ce(o,a="paint"){var l;if(await we(),typeof((l=window.turnstile)==null?void 0:l.execute)=="function")try{let t=await window.turnstile.execute(o,{action:a});if(t&&t.length>20)return t}catch{}return await new Promise(t=>{let i=document.createElement("div");i.style.position="fixed",i.style.left="-9999px",document.body.appendChild(i),window.turnstile.render(i,{sitekey:o,callback:s=>{document.body.removeChild(i),t(s)}})})}async function oe(o){return Ce(o,"paint")}async function ie(o,a,l,t,i){let{width:s,height:g}=o,{x:r,y:P}=a;if(d(`Iniciando pintado: imagen(${s}x${g}) inicio LOCAL(${r},${P}) tile(${e.tileX},${e.tileY})`),!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0){d("Generando cola de p\xEDxeles..."),e.remainingPixels=Le(o,a,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(c=>{let n=c.imageY*s+c.imageX,u=e.lastPosition.y*s+e.lastPosition.x;return n>=u})),d(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),e.startPosition&&e.tileX!==void 0&&e.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch}),d(`\u2705 Plan overlay actualizado con ${e.remainingPixels.length} p\xEDxeles en cola`))}catch(c){d("\u26A0\uFE0F Error actualizando plan overlay:",c)}}try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let c=Math.floor(e.currentCharges),n;if(e.isFirstBatch&&e.useAllChargesFirst&&c>0?(n=Math.min(c,e.remainingPixels.length),e.isFirstBatch=!1,d(`Primera pasada: usando ${n} cargas de ${c} disponibles`)):n=Math.min(e.pixelsPerBatch,e.remainingPixels.length),c<n){d(`Cargas insuficientes: ${c}/${n} necesarias`),await Se(n-c,l),c=Math.floor(e.currentCharges),e.isFirstBatch||(n=Math.min(e.pixelsPerBatch,e.remainingPixels.length,c));continue}let u=e.remainingPixels.splice(0,n);d(`Pintando lote de ${u.length} p\xEDxeles...`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch})}catch(S){d("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",S)}let h=await Ae(u,l);if(h.success&&h.painted>0){if(e.paintedPixels+=h.painted,e.currentCharges=Math.max(0,e.currentCharges-h.painted),d(`Cargas despu\xE9s del lote: ${e.currentCharges.toFixed(1)} (consumidas: ${h.painted})`),u.length>0){let I=u[u.length-1];e.lastPosition={x:I.imageX,y:I.imageY}}d(`Lote exitoso: ${h.painted}/${u.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`);let S=Ie(),L=(e.paintedPixels/e.totalPixels*100).toFixed(1),_=b("image.passCompleted",{painted:h.painted,percent:L,current:e.paintedPixels,total:e.totalPixels});l&&l(e.paintedPixels,e.totalPixels,_,S),await $(2e3)}else h.shouldContinue?d("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(e.remainingPixels.unshift(...u),d("Lote fall\xF3: reintentando en 5 segundos..."),await $(5e3));await $(500)}if(e.stopFlag)d(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),t&&t(!1,e.paintedPixels);else{d(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[];try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),d("\u2705 Plan overlay limpiado al completar pintado"))}catch(c){d("\u26A0\uFE0F Error limpiando plan overlay:",c)}t&&t(!0,e.paintedPixels)}}catch(c){d("Error en proceso de pintado:",c),i&&i(c)}}async function Ee(o){var a;try{if(!o||o.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let l=[],t=[],i=null,s=null;for(let P of o)l.push(P.localX,P.localY),t.push(P.color.id||P.color.value||1),i===null&&(i=P.tileX,s=P.tileY);let g=await oe(z.SITEKEY),r=await ne(i,s,l,t,g);return r.status===200?{success:!0,painted:r.painted,response:r.json}:{success:!1,painted:0,error:((a=r.json)==null?void 0:a.message)||`HTTP ${r.status}`,status:r.status}}catch(l){return d("Error en paintPixelBatch:",l),{success:!1,painted:0,error:l.message}}}async function Ae(o,a){for(let s=1;s<=5;s++)try{let g=await Ee(o);if(g.success)return e.retryCount=0,g;if(e.retryCount=s,s<5){let r=3e3*Math.pow(2,s-1),P=Math.round(r/1e3),c;g.status===0||g.status==="NetworkError"?c=b("image.networkError"):g.status>=500?c=b("image.serverError"):g.status===408?c=b("image.timeoutError"):c=b("image.retryAttempt",{attempt:s,maxAttempts:5,delay:P}),a&&a(e.paintedPixels,e.totalPixels,c),d(`Reintento ${s}/5 despu\xE9s de ${P}s. Error: ${g.error}`),await $(r)}}catch(g){if(d(`Error en intento ${s}:`,g),e.retryCount=s,s<5){let r=3e3*Math.pow(2,s-1),P=Math.round(r/1e3),c=b("image.retryError",{attempt:s,maxAttempts:5,delay:P});a&&a(e.paintedPixels,e.totalPixels,c),await $(r)}}e.retryCount=5;let i=b("image.retryFailed",{maxAttempts:5});return a&&a(e.paintedPixels,e.totalPixels,i),d("Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function Se(o,a){let t=z.CHARGE_REGEN_MS*o+5e3;if(d(`Esperando ${Math.round(t/1e3)}s para obtener ${o} cargas`),e.inCooldown=!0,e.cooldownEndTime=Date.now()+t,e.nextBatchCooldown=Math.round(t/1e3),a){let i=Math.floor(t/6e4),s=Math.floor(t%6e4/1e3),g=i>0?`${i}m ${s}s`:`${s}s`,r=b("image.waitingChargesRegen",{current:Math.floor(e.currentCharges),needed:o,time:g});a(e.paintedPixels,e.totalPixels,r)}for(let i=Math.round(t/1e3);i>0&&!e.stopFlag;i--){if(e.nextBatchCooldown=i,a&&(i%5===0||i<=10||i===Math.round(t/1e3))){let s=Math.floor(i/60),g=i%60,r=s>0?`${s}m ${g}s`:`${g}s`,P=b("image.waitingChargesCountdown",{current:Math.floor(e.currentCharges),needed:o,time:r});a(e.paintedPixels,e.totalPixels,P)}await $(1e3)}e.inCooldown=!1,e.nextBatchCooldown=0,e.currentCharges=Math.min(e.maxCharges||50,e.currentCharges+t/z.CHARGE_REGEN_MS)}function Le(o,a,l,t){let{pixels:i}=o,{x:s,y:g}=a,r=[];for(let P of i){let c=s+P.x,n=g+P.y;r.push({imageX:P.x,imageY:P.y,localX:c,localY:n,tileX:l,tileY:t,color:P.targetColor,originalColor:P.originalColor})}return d(`Cola de p\xEDxeles generada: ${r.length} p\xEDxeles para pintar`),r}function Ie(){if(!e.remainingPixels||e.remainingPixels.length===0)return 0;let o=e.remainingPixels.length,a=e.pixelsPerBatch,l=z.CHARGE_REGEN_MS/1e3,t=Math.ceil(o/a),i=a*l,s=(t-1)*i,g=t*2;return Math.ceil(s+g)}function j(){e.stopFlag=!0,e.running=!1,d("\u{1F6D1} Deteniendo proceso de pintado...")}function U(o=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let a={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch,useAllChargesFirst:e.useAllChargesFirst,isFirstBatch:e.isFirstBatch,maxCharges:e.maxCharges},colors:e.availableColors.map(r=>({id:r.id,r:r.r,g:r.g,b:r.b})),remainingPixels:e.remainingPixels||[]},l=JSON.stringify(a,null,2),t=new window.Blob([l],{type:"application/json"}),i=o||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,s=window.URL.createObjectURL(t),g=document.createElement("a");return g.href=s,g.download=i,document.body.appendChild(g),g.click(),document.body.removeChild(g),window.URL.revokeObjectURL(s),d(`\u2705 Progreso guardado: ${i}`),{success:!0,filename:i}}catch(a){return d("\u274C Error guardando progreso:",a),{success:!1,error:a.message}}}async function se(o){return new Promise(a=>{try{let l=new window.FileReader;l.onload=t=>{try{let i=JSON.parse(t.target.result),g=["imageData","progress","position","colors"].filter(r=>!(r in i));if(g.length>0)throw new Error(`Campos requeridos faltantes: ${g.join(", ")}`);if(e.availableColors.length>0){let r=i.colors.map(n=>n.id),P=e.availableColors.map(n=>n.id);r.filter(n=>P.includes(n)).length<r.length*.8&&d("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...i.imageData,pixels:[]},e.paintedPixels=i.progress.paintedPixels,e.totalPixels=i.progress.totalPixels,i.progress.lastPosition?e.lastPosition=i.progress.lastPosition:i.position.lastX!==void 0&&i.position.lastY!==void 0&&(e.lastPosition={x:i.position.lastX,y:i.position.lastY}),i.position.startPosition?e.startPosition=i.position.startPosition:i.position.startX!==void 0&&i.position.startY!==void 0&&(e.startPosition={x:i.position.startX,y:i.position.startY}),e.tileX=i.position.tileX,e.tileY=i.position.tileY,e.originalImageName=i.imageData.originalName,e.remainingPixels=i.remainingPixels||i.progress.remainingPixels||[];try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),e.startPosition&&e.tileX!==void 0&&e.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y}),d(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${e.tileX},${e.tileY}) local(${e.startPosition.x},${e.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch}),d(`\u2705 Plan overlay activado con ${e.remainingPixels.length} p\xEDxeles restantes`))}catch(r){d("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",r)}i.config&&(e.pixelsPerBatch=i.config.pixelsPerBatch||e.pixelsPerBatch,e.useAllChargesFirst=i.config.useAllChargesFirst!==void 0?i.config.useAllChargesFirst:e.useAllChargesFirst,e.isFirstBatch=i.config.isFirstBatch!==void 0?i.config.isFirstBatch:!0,e.maxCharges=i.config.maxCharges||e.maxCharges),e.imageLoaded=!0,e.colorsChecked=!0,d(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),a({success:!0,data:i,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(i){d("\u274C Error parseando archivo de progreso:",i),a({success:!1,error:i.message})}},l.onerror=()=>{let t="Error leyendo archivo";d("\u274C",t),a({success:!1,error:t})},l.readAsText(o)}catch(l){d("\u274C Error cargando progreso:",l),a({success:!1,error:l.message})}})}function le(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,e.isFirstBatch=!0,e.nextBatchCooldown=0,d("\u{1F9F9} Progreso limpiado")}function re(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function ce(){return{hasProgress:re(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:re()}}function de(o=null){let a=document.createElement("div");o&&(a.id=o),a.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let l=a.attachShadow({mode:"open"});return document.body.appendChild(a),{host:a,root:l}}function ue(o,a){let l=0,t=0,i=0,s=0;o.style.cursor="move",o.addEventListener("mousedown",g);function g(c){c.target.closest(".header-btn, .wplace-header-btn")||(c.preventDefault(),i=c.clientX,s=c.clientY,document.addEventListener("mouseup",P),document.addEventListener("mousemove",r))}function r(c){c.preventDefault(),l=i-c.clientX,t=s-c.clientY,i=c.clientX,s=c.clientY,a.style.top=a.offsetTop-t+"px",a.style.left=a.offsetLeft-l+"px"}function P(){document.removeEventListener("mouseup",P),document.removeEventListener("mousemove",r)}}async function ge({texts:o,...a}){if(d("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let p=document.createElement("link");p.rel="stylesheet",p.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(p),d("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:l,root:t}=de(),i=document.createElement("style");i.textContent=`
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
  `,t.appendChild(i);let s=document.createElement("div");s.className="container",s.innerHTML=`
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
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="20">
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            ${o.useAllCharges}
          </label>
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
        <button class="btn btn-primary init-btn">
          \u{1F916}
          <span>${o.initBot}</span>
        </button>
          <button class="btn btn-primary plan-overlay-toggle-btn" disabled>
            \uFE0F
            <span>${o.overlayOff||"Overlay: OFF"}</span>
          </button>
        <button class="btn btn-upload upload-btn" disabled>
          \u{1F4E4}
          <span>${o.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          \u{1F4C1}
          <span>${o.loadProgress}</span>
        </button>
        <button class="btn btn-primary resize-btn" disabled>
          \u{1F504}
          <span>${o.resizeImage}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          \u{1F3AF}
          <span>${o.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          \u25B6\uFE0F
          <span>${o.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          \u23F9\uFE0F
          <span>${o.stopPainting}</span>
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
  `,t.appendChild(s);let g=document.createElement("input");g.type="file",g.accept="image/png,image/jpeg",g.style.display="none",t.appendChild(g);let r=document.createElement("input");r.type="file",r.accept=".json",r.style.display="none",t.appendChild(r);let P=document.createElement("div");P.className="resize-overlay",t.appendChild(P);let c=document.createElement("div");c.className="resize-container",c.innerHTML=`
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
  `,t.appendChild(c);let n={header:s.querySelector(".header"),configBtn:s.querySelector(".config-btn"),minimizeBtn:s.querySelector(".minimize-btn"),configPanel:s.querySelector(".config-panel"),pixelsPerBatch:s.querySelector(".pixels-per-batch"),useAllCharges:s.querySelector(".use-all-charges"),batchValue:s.querySelector(".batch-value"),cooldownValue:s.querySelector(".cooldown-value"),initBtn:s.querySelector(".init-btn"),uploadBtn:s.querySelector(".upload-btn"),loadProgressBtn:s.querySelector(".load-progress-btn"),resizeBtn:s.querySelector(".resize-btn"),selectPosBtn:s.querySelector(".select-pos-btn"),startBtn:s.querySelector(".start-btn"),stopBtn:s.querySelector(".stop-btn"),planOverlayToggleBtn:s.querySelector(".plan-overlay-toggle-btn"),progressBar:s.querySelector(".progress-bar"),statsArea:s.querySelector(".stats-area"),status:s.querySelector(".status"),content:s.querySelector(".content")},u={overlay:P,container:c,widthSlider:c.querySelector(".width-slider"),heightSlider:c.querySelector(".height-slider"),widthValue:c.querySelector(".width-value"),heightValue:c.querySelector(".height-value"),keepAspect:c.querySelector(".keep-aspect"),preview:c.querySelector(".resize-preview"),confirmBtn:c.querySelector(".confirm-resize"),cancelBtn:c.querySelector(".cancel-resize")},h={minimized:!1,configVisible:!1};ue(n.header,s),n.minimizeBtn.addEventListener("click",()=>{h.minimized=!h.minimized,h.minimized?(s.classList.add("minimized"),n.minimizeBtn.innerHTML="\u{1F53C}"):(s.classList.remove("minimized"),n.minimizeBtn.innerHTML="\u{1F53D}")}),n.configBtn.addEventListener("click",()=>{h.configVisible=!h.configVisible,h.configVisible?(n.configPanel.classList.add("visible"),n.configBtn.innerHTML="\u274C"):(n.configPanel.classList.remove("visible"),n.configBtn.innerHTML="\u2699\uFE0F")}),n.pixelsPerBatch.addEventListener("change",()=>{let p=parseInt(n.pixelsPerBatch.value)||20;n.batchValue.textContent=p,a.onConfigChange&&a.onConfigChange({pixelsPerBatch:p})}),n.useAllCharges.addEventListener("change",()=>{a.onConfigChange&&a.onConfigChange({useAllCharges:n.useAllCharges.checked})});function S(){if(!window.__WPA_PLAN_OVERLAY__||!n.planOverlayToggleBtn)return;let y=window.__WPA_PLAN_OVERLAY__.state.enabled?o.overlayOn||"Overlay: ON":o.overlayOff||"Overlay: OFF";n.planOverlayToggleBtn.querySelector("span").textContent=y}function L(){n.uploadBtn.disabled=!1,n.loadProgressBtn.disabled=!1,n.planOverlayToggleBtn.disabled=!1,S()}n.initBtn.addEventListener("click",async()=>{n.initBtn.disabled=!0,a.onInitBot&&await a.onInitBot()&&L(),n.initBtn.disabled=!1}),n.uploadBtn.addEventListener("click",()=>{g.click()}),g.addEventListener("change",async()=>{g.files.length>0&&a.onUploadImage&&await a.onUploadImage(g.files[0])&&(n.selectPosBtn.disabled=!1,n.resizeBtn.disabled=!1)}),n.loadProgressBtn.addEventListener("click",()=>{r.click()}),r.addEventListener("change",async()=>{r.files.length>0&&a.onLoadProgress&&await a.onLoadProgress(r.files[0])&&(n.selectPosBtn.disabled=!1,n.startBtn.disabled=!1,n.resizeBtn.disabled=!1)}),n.resizeBtn.addEventListener("click",()=>{a.onResizeImage&&a.onResizeImage()}),n.selectPosBtn.addEventListener("click",async()=>{a.onSelectPosition&&(n.selectPosBtn.disabled=!0,await a.onSelectPosition()&&(n.startBtn.disabled=!1),n.selectPosBtn.disabled=!1)}),n.planOverlayToggleBtn.addEventListener("click",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let p=!window.__WPA_PLAN_OVERLAY__.state.enabled;window.__WPA_PLAN_OVERLAY__.setEnabled(p),S()}),n.startBtn.addEventListener("click",async()=>{a.onStartPainting&&(n.startBtn.disabled=!0,n.stopBtn.disabled=!1,await a.onStartPainting()||(n.startBtn.disabled=!1,n.stopBtn.disabled=!0))}),n.stopBtn.addEventListener("click",async()=>{a.onStopPainting&&await a.onStopPainting()&&(n.startBtn.disabled=!1,n.stopBtn.disabled=!0)});function _(p,y="default"){n.status.textContent=p,n.status.className=`status status-${y}`,n.status.style.animation="none",n.status.offsetWidth,n.status.style.animation="slideIn 0.3s ease-out"}function I(p){let{width:y,height:v}=p.getDimensions(),E=y/v;u.widthSlider.value=y,u.heightSlider.value=v,u.widthValue.textContent=y,u.heightValue.textContent=v,u.preview.src=p.img.src,u.overlay.style.display="block",u.container.style.display="block";let A=()=>{let Y=parseInt(u.widthSlider.value),O=parseInt(u.heightSlider.value);u.widthValue.textContent=Y,u.heightValue.textContent=O,u.preview.src=p.generatePreview(Y,O)},w=()=>{if(u.keepAspect.checked){let Y=parseInt(u.widthSlider.value),O=Math.round(Y/E);u.heightSlider.value=O}A()},k=()=>{if(u.keepAspect.checked){let Y=parseInt(u.heightSlider.value),O=Math.round(Y*E);u.widthSlider.value=O}A()};u.widthSlider.addEventListener("input",w),u.heightSlider.addEventListener("input",k);let N=()=>{let Y=parseInt(u.widthSlider.value),O=parseInt(u.heightSlider.value);a.onConfirmResize&&a.onConfirmResize(p,Y,O),B()},F=()=>{B()};u.confirmBtn.addEventListener("click",N),u.cancelBtn.addEventListener("click",F),u.overlay.addEventListener("click",F),window.cleanupResizeDialog=()=>{u.widthSlider.removeEventListener("input",w),u.heightSlider.removeEventListener("input",k),u.confirmBtn.removeEventListener("click",N),u.cancelBtn.removeEventListener("click",F),u.overlay.removeEventListener("click",F)},A()}function B(){u.overlay.style.display="none",u.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function T(p,y,v=null){let E=y>0?p/y*100:0;n.progressBar.style.width=`${E}%`;let A=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${o.progress}</div>
        <div>${p}/${y} (${E.toFixed(1)}%)</div>
      </div>
    `;if(v&&(v.username&&(A+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${v.username}</div>
          </div>
        `),v.charges!==void 0&&(A+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${o.charges}</div>
            <div>${Math.floor(v.charges)}</div>
          </div>
        `),v.pixels!==void 0&&(A+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${o.pixels}</div>
            <div>${v.pixels.toLocaleString()}</div>
          </div>
        `),v.estimatedTime!==void 0&&v.estimatedTime>0)){let w=Math.floor(v.estimatedTime/3600),k=Math.floor(v.estimatedTime%3600/60),N=w>0?`${w}h ${k}m`:`${k}m`;A+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${o.timeRemaining}</div>
            <div>${N}</div>
          </div>
        `}n.statsArea.innerHTML=A}function R(p){if(p>0){let y=Math.floor(p/60),v=p%60,E=y>0?`${y}m ${v}s`:`${v}s`;n.cooldownValue.textContent=E}else n.cooldownValue.textContent="--"}function f(p){p&&p.includes("\u23F3")?(n.status.textContent=p,n.status.className="status status-info"):p&&_(p,"info")}function m(p){p?(n.initBtn.disabled=!0,n.initBtn.style.opacity="0.6",n.initBtn.innerHTML=`\u2705 <span>${o.initBot} - Completado</span>`):(n.initBtn.disabled=!1,n.initBtn.style.opacity="1",n.initBtn.innerHTML=`\u{1F916} <span>${o.initBot}</span>`)}function x(p){n.initBtn.style.display=p?"flex":"none"}function C(){l.remove()}return d("\u2705 Interfaz de Auto-Image creada"),{setStatus:_,updateProgress:T,updateCooldownDisplay:R,updateCooldownMessage:f,setInitialized:m,setInitButtonVisible:x,enableButtonsAfterInit:L,updateOverlayButtonState:S,showResizeDialog:I,closeResizeDialog:B,destroy:C}}function pe(o,a,l={}){return new Promise(t=>{let i=document.createElement("div");i.className="modal-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%",i.style.background="rgba(0,0,0,0.7)",i.style.zIndex="10001",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center";let s=document.createElement("div");s.style.background="#1a1a1a",s.style.border="2px solid #333",s.style.borderRadius="15px",s.style.padding="25px",s.style.color="#eee",s.style.minWidth="350px",s.style.maxWidth="400px",s.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",s.style.fontFamily="'Segoe UI', Roboto, sans-serif",s.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${a}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${o}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${l.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${l.save}</button>`:""}
        ${l.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${l.discard}</button>`:""}
        ${l.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${l.cancel}</button>`:""}
      </div>
    `,i.appendChild(s),document.body.appendChild(i);let g=s.querySelector(".save-btn"),r=s.querySelector(".discard-btn"),P=s.querySelector(".cancel-btn"),c=()=>{document.body.removeChild(i)};g&&g.addEventListener("click",()=>{c(),t("save")}),r&&r.addEventListener("click",()=>{c(),t("discard")}),P&&P.addEventListener("click",()=>{c(),t("cancel")}),i.addEventListener("click",n=>{n.target===i&&(c(),t("cancel"))})})}function H(){let o=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let t of o){let i=document.querySelector(t);if(i&&i.offsetParent!==null)return!0}let a=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),l=0;for(let t of a)if(t.offsetParent!==null&&t.offsetWidth>10&&t.offsetHeight>10&&(l++,l>=5))return!0;return!1}function me(){let o=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(o){let t=o.textContent.toLowerCase().includes("paint"),i=o.querySelector('svg path[d*="240-120"]');if(t||i)return o.click(),!0}let a=document.querySelectorAll("button");for(let l of a)if(l.textContent.toLowerCase().includes("paint")&&l.offsetParent!==null&&!l.disabled)return l.click(),!0;return!1}(()=>{let o="wpa-plan-overlay-style",a="wpa-plan-overlay",t={enabled:!1,boardLayer:null,mainCanvas:null,canvas:null,ctx:null,items:[],minX:0,minY:0,maxX:-1,maxY:-1,nextBatchCount:0,observer:null,anchor:null,cssAnchorX:0,cssAnchorY:0};function i(){if(document.getElementById(o))return;let f=document.createElement("style");f.id=o,f.textContent=`
      .${a} {
        position: absolute !important;
        pointer-events: none !important;
        image-rendering: pixelated !important;
        z-index: 2147483646 !important;
        transform-origin: top left !important;
        opacity: 0.8 !important;
      }
    `,document.head.appendChild(f),console.log("[PLAN OVERLAY] Styles injected")}function s(){console.log("[PLAN OVERLAY] Searching for MapLibre GL transformed layer...");let f=[".maplibregl-map",".maplibregl-canvas-container",".mapboxgl-map",".mapboxgl-canvas-container"];for(let p of f){let y=document.querySelectorAll(p);for(let v of y){let E=window.getComputedStyle(v);if(console.log(`[PLAN OVERLAY] Checking MapLibre container: ${p}`,v,"transform:",E.transform),E.transform&&E.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre container:",v),v;if(v.parentElement){let A=window.getComputedStyle(v.parentElement);if(A.transform&&A.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre parent:",v.parentElement),v.parentElement}for(let A of v.children){let w=window.getComputedStyle(A);if(w.transform&&w.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre child:",A),A}}}let m=document.querySelectorAll("canvas");console.log("[PLAN OVERLAY] Found canvases:",m.length);for(let p of m){console.log("[PLAN OVERLAY] Checking canvas:",p,"rect:",p.getBoundingClientRect());let y=p.parentElement;for(;y&&y!==document.body;){let v=window.getComputedStyle(y);if(console.log("[PLAN OVERLAY] Checking parent:",y.tagName,y.className,y.id,"transform:",v.transform),v.transform&&v.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed ancestor:",y,"transform:",v.transform),y;y=y.parentElement}}let x=document.querySelector(".maplibregl-map")||document.querySelector(".maplibregl-canvas-container")||document.querySelector(".mapboxgl-map")||document.querySelector(".mapboxgl-canvas-container");if(x)return console.log("[PLAN OVERLAY] Using MapLibre container without transform:",x),x;let C=document.querySelector("canvas");if(C&&C.parentElement){let p=C.parentElement;return console.log("[PLAN OVERLAY] Using canvas parent as final fallback:",p),p}return console.log("[PLAN OVERLAY] Using document.body as absolute final fallback"),document.body}function g(){let f=document.querySelector(".maplibregl-map")||document.querySelector(".mapboxgl-map"),m=document.querySelector("div#map canvas.maplibregl-canvas")||document.querySelector("canvas.maplibregl-canvas")||document.querySelector("canvas");m&&t.mainCanvas!==m&&(t.mainCanvas=m);let x=f||t.mainCanvas&&t.mainCanvas.parentElement||s();return x&&t.boardLayer!==x&&(t.boardLayer=x,console.log("[PLAN OVERLAY] Board layer updated (mainCanvas.parentElement):",x)),t.boardLayer||document.body}function r(){if(t.canvas&&t.canvas.isConnected)return t.canvas;let f=g(),m=document.createElement("canvas");m.id="bm-canvas",m.className=`maplibregl-canvas ${a}`,m.style.position="absolute",m.style.pointerEvents="none",m.style.imageRendering="pixelated",m.style.transformOrigin="top left",m.style.zIndex="2147483646",m.hidden=!t.enabled,t.canvas=m,t.ctx=m.getContext("2d",{willReadFrequently:!1}),f.appendChild(m);try{let x=t.mainCanvas||document.querySelector("div#map canvas.maplibregl-canvas")||document.querySelector("canvas.maplibregl-canvas")||document.querySelector("canvas");if(x){t.mainCanvas=x;let C=window.devicePixelRatio||1,p=Math.max(1,x.clientWidth),y=Math.max(1,x.clientHeight);t.canvas.width=p*C,t.canvas.height=y*C,t.canvas.style.width=`${p}px`,t.canvas.style.height=`${y}px`}}catch(x){console.log("[PLAN OVERLAY] Error syncing DPR size:",x)}return console.log("[PLAN OVERLAY] Canvas created and added to transformed layer:",f),console.log("[PLAN OVERLAY] Canvas element:",m),console.log("[PLAN OVERLAY] Host element rect:",f.getBoundingClientRect()),t.observer||(t.observer=new window.MutationObserver(()=>{var x;(x=t.canvas)!=null&&x.isConnected||(console.log("[PLAN OVERLAY] Canvas disconnected, re-attaching..."),g().appendChild(t.canvas),n())}),t.observer.observe(document.body,{childList:!0,subtree:!0})),m}function P(){let f=Number.POSITIVE_INFINITY,m=Number.POSITIVE_INFINITY,x=Number.NEGATIVE_INFINITY,C=Number.NEGATIVE_INFINITY;for(let p of t.items)p.globalX<f&&(f=p.globalX),p.globalY<m&&(m=p.globalY),p.globalX>x&&(x=p.globalX),p.globalY>C&&(C=p.globalY);isFinite(f)||(f=m=0,x=C=-1),t.minX=f,t.minY=m,t.maxX=x,t.maxY=C}function c(){if(!t.canvas)return;let f=2,m=2;if(t.anchor){let x=t.anchor.tileX*3e3+(t.anchor.pxX||0),C=t.anchor.tileY*3e3+(t.anchor.pxY||0);f=Math.max(1,t.maxX-x+1|0),m=Math.max(1,t.maxY-C+1|0)}else f=Math.max(1,t.maxX-t.minX+1|0),m=Math.max(1,t.maxY-t.minY+1|0);t.canvas.width=Math.max(2,f),t.canvas.height=Math.max(2,m),t.canvas.style.width=`${Math.max(2,f)}px`,t.canvas.style.height=`${Math.max(2,m)}px`}function n(){if(!t.canvas||!t.anchor)return;let f=t.anchor.tileX*3e3+(t.anchor.pxX||0),m=t.anchor.tileY*3e3+(t.anchor.pxY||0),x=t.cssAnchorX||t.cssAnchorY?t.cssAnchorX:null,C=t.cssAnchorX||t.cssAnchorY?t.cssAnchorY:null,p=x!=null?x:f,y=C!=null?C:m;t.canvas.style.left=`${p}px`,t.canvas.style.top=`${y}px`,t.canvas.style.transform="none",console.log("[PLAN OVERLAY] Positioned at anchor (global coords):",{left:f,top:m})}function u(){t.ctx&&t.ctx.clearRect(0,0,t.canvas.width,t.canvas.height)}function h(){r(),P(),c(),n();let{ctx:f,items:m,canvas:x}=t;if(u(),console.log(`[PLAN OVERLAY] Rendering ${m.length} items in ${x.width}x${x.height} canvas (anchored)`),m.length===0)return;let C=t.anchor.tileX*3e3+(t.anchor.pxX||0),p=t.anchor.tileY*3e3+(t.anchor.pxY||0);f.globalAlpha=.7;for(let y of m){let v=y.globalX-C|0,E=y.globalY-p|0;v<0||E<0||(f.fillStyle=`rgb(${y.r|0},${y.g|0},${y.b|0})`,f.fillRect(v,E,1,1))}if(t.nextBatchCount>0){let y=Math.min(t.nextBatchCount,m.length);f.globalAlpha=1;for(let v=0;v<y;v++){let E=m[v],A=E.globalX-C|0,w=E.globalY-p|0;A<0||w<0||(f.fillStyle=`rgb(${E.r|0},${E.g|0},${E.b|0})`,f.fillRect(A,w,1,1))}}}function S(f){t.enabled=!!f,r(),t.canvas.hidden=!t.enabled,console.log(`[PLAN OVERLAY] setEnabled: ${t.enabled}, canvas hidden: ${t.canvas.hidden}`),t.enabled&&t.items.length>0&&h()}function L(f){t.nextBatchCount=Math.max(0,Number(f||0)|0),t.enabled&&h()}function _(f,m){var C,p,y,v,E,A;let x=[];for(let w of f||[]){let k=0,N=0;if(typeof w.tileX=="number"&&typeof w.tileY=="number"&&typeof w.localX=="number"&&typeof w.localY=="number")k=w.tileX*3e3+w.localX,N=w.tileY*3e3+w.localY;else if(m&&typeof w.imageX=="number"&&typeof w.imageY=="number"){let he=m.tileX*3e3+(m.pxX||0),xe=m.tileY*3e3+(m.pxY||0);k=he+w.imageX,N=xe+w.imageY}else continue;let F=(p=(C=w.color)==null?void 0:C.r)!=null?p:0,Y=(v=(y=w.color)==null?void 0:y.g)!=null?v:0,O=(A=(E=w.color)==null?void 0:E.b)!=null?A:0;x.push({globalX:k|0,globalY:N|0,r:F,g:Y,b:O})}return console.log(`[PLAN OVERLAY] Normalized ${x.length} items, sample coords:`,x.slice(0,3).map(w=>`(${w.globalX}, ${w.globalY})`)),x}function I(f,m={}){let x=_(f,m.anchor);t.items=x,console.log(`[PLAN OVERLAY] setPlan: ${(f==null?void 0:f.length)||0} items -> ${x.length} normalized items`),typeof m.nextBatchCount=="number"&&(t.nextBatchCount=Math.max(0,m.nextBatchCount|0)),typeof m.enabled=="boolean"&&S(m.enabled),t.enabled&&h()}function B(){t.observer&&(t.observer.disconnect(),t.observer=null),t.canvas&&t.canvas.parentNode&&t.canvas.parentNode.removeChild(t.canvas)}function T(f){if(!f)return;t.anchor={tileX:f.tileX|0,tileY:f.tileY|0,pxX:(f.pxX||0)|0,pxY:(f.pxY||0)|0},console.log("[PLAN OVERLAY] Anchor set:",t.anchor);let m=t.anchor.tileX*3e3+t.anchor.pxX,x=t.anchor.tileY*3e3+t.anchor.pxY;console.log("[PLAN OVERLAY] Anchor global coords:",{x:m,y:x}),r(),h()}function R(f,m){t.cssAnchorX=Math.round(Number(f)||0),t.cssAnchorY=Math.round(Number(m)||0),console.log("[PLAN OVERLAY] CSS anchor set:",{x:t.cssAnchorX,y:t.cssAnchorY}),t.enabled&&n()}window.__WPA_PLAN_OVERLAY__={injectStyles:i,setEnabled:S,setPlan:I,setPlanItemsFromTileList:I,setNextBatchCount:L,setAnchor:T,setAnchorCss:R,render:h,cleanup:B,get state(){return t}}})();async function fe(){d("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),V(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let o=null,a=window.fetch,l=()=>{window.fetch!==a&&(window.fetch=a,d("\u{1F504} Fetch original restaurado")),e.positionTimeoutId&&(clearTimeout(e.positionTimeoutId),e.positionTimeoutId=null),e.cleanupObserver&&(e.cleanupObserver(),e.cleanupObserver=null),e.selectingPosition=!1};try{let t={...z},i=W("image");if(e.language=J(),!t.SITEKEY){let c=document.querySelector("*[data-sitekey]");c?(t.SITEKEY=c.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${t.SITEKEY.substring(0,20)}...`)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function s(){return d("\u{1F916} Intentando auto-inicio..."),H()?(d("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(d("\u{1F50D} Paleta no encontrada, buscando bot\xF3n Paint..."),me()?(d("\u{1F446} Bot\xF3n Paint encontrado y presionado"),await $(2e3),H()?(d("\u2705 Paleta abierta exitosamente"),!0):(d("\u274C La paleta no se abri\xF3 despu\xE9s de hacer clic"),!1)):(d("\u274C Bot\xF3n Paint no encontrado"),!1))}async function g(c=!1){d("\u{1F916} Inicializando Auto-Image..."),r.setStatus(b("image.checkingColors"),"info");let n=Q();if(n.length===0)return r.setStatus(b("image.noColorsFound"),"error"),!1;let u=await te(),h=null;u.success&&u.data.user?(h={username:u.data.user.name||"An\xF3nimo",charges:u.data.charges,maxCharges:u.data.maxCharges,pixels:u.data.user.pixelsPainted||0},o=h,e.currentCharges=u.data.charges,e.maxCharges=u.data.maxCharges||50,d(`\u{1F464} Usuario conectado: ${u.data.user.name||"An\xF3nimo"} - Cargas: ${h.charges}/${h.maxCharges} - P\xEDxeles: ${h.pixels}`)):d("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=n,e.colorsChecked=!0,r.setStatus(b("image.colorsFound",{count:n.length}),"success"),r.updateProgress(0,0,h),c||d(`\u2705 ${n.length} colores disponibles detectados`),r.setInitialized(!0),r.enableButtonsAfterInit(),r.updateOverlayButtonState();try{}catch{}return!0}let r=await ge({texts:i,onConfigChange:c=>{c.pixelsPerBatch!==void 0&&(e.pixelsPerBatch=c.pixelsPerBatch),c.useAllCharges!==void 0&&(e.useAllChargesFirst=c.useAllCharges),d("Configuraci\xF3n actualizada:",c)},onInitBot:g,onUploadImage:async c=>{try{r.setStatus(b("image.loadingImage"),"info");let n=window.URL.createObjectURL(c),u=new q(n);u.originalName=c.name,await u.load();let h=u.processImage(e.availableColors,t);e.imageData=h,e.imageData.processor=u,e.totalPixels=h.validPixelCount,e.paintedPixels=0,e.originalImageName=c.name,e.imageLoaded=!0,r.setStatus(b("image.imageLoaded",{count:h.validPixelCount}),"success"),r.updateProgress(0,h.validPixelCount,o),d(`\u2705 Imagen cargada: ${h.width}x${h.height}, ${h.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(n);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),d("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(S){d("\u26A0\uFE0F Error activando plan overlay:",S)}return!0}catch(n){return r.setStatus(b("image.imageError"),"error"),d("\u274C Error cargando imagen:",n),!1}},onSelectPosition:async()=>new Promise(c=>{r.setStatus(b("image.selectPositionAlert"),"info"),r.setStatus(b("image.waitingPosition"),"info"),e.selectingPosition=!0;let n=!1,u=()=>{window.fetch=async(L,_)=>{if(e.selectingPosition&&!n&&typeof L=="string"&&L.includes("/s0/pixel/")&&_&&_.method==="POST")try{d(`\u{1F3AF} Interceptando request de pintado: ${L}`);let I=await a(L,_);if(I.ok&&_.body){let B;try{B=JSON.parse(_.body)}catch(T){return d("Error parseando body del request:",T),I}if(B.coords&&Array.isArray(B.coords)&&B.coords.length>=2){let T=B.coords[0],R=B.coords[1],f=L.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(f&&!n){n=!0,e.tileX=parseInt(f[1]),e.tileY=parseInt(f[2]),e.startPosition={x:T,y:R},e.selectingPosition=!1;try{if(window.__WPA_PLAN_OVERLAY__){if(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:T,pxY:R}),e.imageData&&e.imageData.pixels){let m=[];for(let x of e.imageData.pixels){let C=T+x.x,p=R+x.y;m.push({imageX:x.x,imageY:x.y,localX:C,localY:p,tileX:e.tileX,tileY:e.tileY,color:x.targetColor,originalColor:x.originalColor})}e.remainingPixels=m,e.totalPixels=m.length,window.__WPA_PLAN_OVERLAY__.setPlan(m,{enabled:!0,nextBatchCount:e.pixelsPerBatch,anchor:{tileX:e.tileX,tileY:e.tileY,pxX:T,pxY:R}}),d(`\u2705 Cola de p\xEDxeles generada: ${m.length} p\xEDxeles para overlay`)}d(`\u2705 Plan overlay anclado en tile(${e.tileX},${e.tileY}) local(${T},${R})`)}}catch(m){d("Plan Overlay: error configurando ancla",m)}l(),r.setStatus(b("image.positionSet"),"success"),d(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${T},${R})`),c(!0)}else d("\u26A0\uFE0F No se pudo extraer tile de la URL:",L)}}return I}catch(I){if(d("\u274C Error interceptando pixel:",I),!n)return l(),a(L,_)}return a(L,_)}},h=()=>{let L=document.querySelectorAll("canvas");if(L.length===0){d("\u26A0\uFE0F No se encontraron elementos canvas");return}d(`\u{1F4CA} Configurando observer para ${L.length} canvas`);let _=I=>{var T;if(!e.selectingPosition||n)return;let B=I.target;if(B&&B.tagName==="CANVAS"){d("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let f=(((T=document.querySelector("canvas"))==null?void 0:T.parentElement)||document.body).getBoundingClientRect(),m=I.clientX-f.left,x=I.clientY-f.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(m,x),d(`Plan overlay: ancla CSS establecida en (${m}, ${x})`))}catch(R){d("Plan Overlay: error calculando ancla CSS",R)}setTimeout(()=>{!n&&e.selectingPosition&&d("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",_),e.cleanupObserver=()=>{document.removeEventListener("click",_)}};u(),h();let S=setTimeout(()=>{e.selectingPosition&&!n&&(l(),e.cleanupObserver&&e.cleanupObserver(),r.setStatus(b("image.positionTimeout"),"error"),d("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),c(!1))},12e4);e.positionTimeoutId=S}),onStartPainting:async()=>{var c;if(d("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((c=e.remainingPixels)==null?void 0:c.length)||0}),!e.imageLoaded||!e.startPosition)return r.setStatus(b("image.missingRequirements"),"error"),d(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,e.isFirstBatch=!0,r.setStatus(b("image.startPaintingMsg"),"success");try{return await ie(e.imageData,e.startPosition,(n,u,h,S)=>{o&&(o.charges=Math.floor(e.currentCharges),S!==void 0&&(o.estimatedTime=S)),r.updateProgress(n,u,o),e.inCooldown&&e.nextBatchCooldown>0?r.updateCooldownDisplay(e.nextBatchCooldown):r.updateCooldownDisplay(0),h?h.includes("\u23F3")&&e.inCooldown?r.updateCooldownMessage(h):r.setStatus(h,"info"):r.setStatus(b("image.paintingProgress",{painted:n,total:u}),"info")},(n,u)=>{n?(r.setStatus(b("image.paintingComplete",{count:u}),"success"),le()):r.setStatus(b("image.paintingStopped"),"warning"),e.running=!1},n=>{r.setStatus(b("image.paintingError"),"error"),d("\u274C Error en proceso de pintado:",n),e.running=!1}),!0}catch(n){return r.setStatus(b("image.paintingError"),"error"),d("\u274C Error iniciando pintado:",n),e.running=!1,!1}},onStopPainting:async()=>{if(ce().hasProgress){let n=await pe(b("image.confirmSaveProgress"),b("image.saveProgressTitle"),{save:b("image.saveProgress"),discard:b("image.discardProgress"),cancel:b("image.cancel")});if(n==="save"){let u=U();u.success?r.setStatus(b("image.progressSaved",{filename:u.filename}),"success"):r.setStatus(b("image.progressSaveError",{error:u.error}),"error")}else if(n==="cancel")return!1}return j(),r.setStatus(b("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let c=U();return c.success?r.setStatus(b("image.progressSaved",{filename:c.filename}),"success"):r.setStatus(b("image.progressSaveError",{error:c.error}),"error"),c.success},onLoadProgress:async c=>{try{let n=await se(c);return n.success?(r.setStatus(b("image.progressLoaded",{painted:n.painted,total:n.total}),"success"),r.updateProgress(n.painted,n.total,o),d("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(r.setStatus(b("image.progressLoadError",{error:n.error}),"error"),!1)}catch(n){return r.setStatus(b("image.progressLoadError",{error:n.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&r.showResizeDialog(e.imageData.processor)},onConfirmResize:(c,n,u)=>{d(`\u{1F504} Redimensionando imagen de ${c.getDimensions().width}x${c.getDimensions().height} a ${n}x${u}`);try{c.resize(n,u);let h=c.processImage(e.availableColors,t);e.imageData=h,e.totalPixels=h.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},r.updateProgress(0,h.validPixelCount,o),r.setStatus(b("image.resizeSuccess",{width:n,height:u}),"success"),d(`\u2705 Imagen redimensionada: ${h.validPixelCount} p\xEDxeles v\xE1lidos`)}catch(h){d(`\u274C Error redimensionando imagen: ${h.message}`),r.setStatus(b("image.imageError"),"error")}}}),P=c=>{let{language:n}=c.detail;d(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${n}`),e.language=n};window.addEventListener("launcherLanguageChanged",P),window.addEventListener("languageChanged",P),window.addEventListener("beforeunload",()=>{l(),j(),r.destroy(),window.removeEventListener("launcherLanguageChanged",P),window.removeEventListener("languageChanged",P),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),d("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{r.setStatus(b("image.autoInitializing"),"info"),d("\u{1F916} Intentando auto-inicio..."),await s()?(r.setStatus(b("image.autoInitSuccess"),"success"),d("\u2705 Auto-inicio exitoso"),r.setInitButtonVisible(!1),await g(!0)&&d("\u{1F680} Bot auto-iniciado completamente")):(r.setStatus(b("image.autoInitFailed"),"warning"),d("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(c){d("\u274C Error en auto-inicio:",c),r.setStatus(b("image.manualInitRequired"),"warning")}},1e3)}catch(t){throw d("\u274C Error inicializando Auto-Image:",t),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),t}}(()=>{"use strict";var o,a;if((o=window.__wplaceBot)!=null&&o.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((a=window.__wplaceBot)!=null&&a.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,fe().catch(l=>{console.error("[BOT] Error en Auto-Image:",l),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
