/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-16T08:50:26.977Z */
(()=>{var u=(...o)=>console.log("[WPA-UI]",...o);var H={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando..."},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var G={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout. Retrying..."},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var Z={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 Timeout serveur. Nouvel essai..."},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var z={es:H,en:G,fr:Z},Y="es",F=z[Y];function fe(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return z[a]?a:"es"}function he(){return null}function W(){let o=he(),a=fe(),n="es";return o&&z[o]?n=o:a&&z[a]&&(n=a),xe(n),n}function xe(o){if(!z[o]){console.warn(`Idioma '${o}' no disponible. Usando '${Y}'`);return}Y=o,F=z[o],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:o,translations:F}}))}function K(){return Y}function f(o,a={}){let n=o.split("."),c=F;for(let d of n)if(c&&typeof c=="object"&&d in c)c=c[d];else return console.warn(`Clave de traducci\xF3n no encontrada: '${o}'`),o;return typeof c!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${o}'`),o):be(c,a)}function be(o,a){return!a||Object.keys(a).length===0?o:o.replace(/\{(\w+)\}/g,(n,c)=>a[c]!==void 0?a[c]:n)}function X(o){return F[o]?F[o]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${o}'`),{})}W();var A={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:A.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:A.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:50,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0};var q=class{constructor(a){this.imageSrc=a,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((a,n)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),a()},this.img.onerror=n,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(a,n){let c=document.createElement("canvas");return c.width=a,c.height=n,c.getContext("2d").drawImage(this.img,0,0,a,n),this.canvas.width=a,this.canvas.height=n,this.ctx.drawImage(c,0,0),this.getPixelData()}generatePreview(a,n){return this.previewCanvas.width=a,this.previewCanvas.height=n,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,a,n),this.previewCanvas.toDataURL()}getImageData(){let{width:a,height:n}=this.getDimensions(),c=this.getPixelData();return{width:a,height:n,pixels:c,originalName:this.originalName||"image.png"}}processImage(a,n){let{width:c,height:d}=this.getDimensions(),s=this.getPixelData(),l=[],r=0;for(let m=0;m<d;m++)for(let i=0;i<c;i++){let t=(m*c+i)*4,g=s[t],p=s[t+1],w=s[t+2],x=s[t+3];if(x<n.TRANSPARENCY_THRESHOLD||g>n.WHITE_THRESHOLD&&p>n.WHITE_THRESHOLD&&w>n.WHITE_THRESHOLD)continue;let b=this.findClosestColor({r:g,g:p,b:w},a);b&&(l.push({x:i,y:m,originalColor:{r:g,g:p,b:w,alpha:x},targetColor:b}),r++)}return{width:c,height:d,pixels:l,validPixelCount:r,originalName:this.originalName||"image.png"}}findClosestColor(a,n){if(!n||n.length===0)return null;let c=null,d=1/0;for(let s of n){let l=Math.sqrt(Math.pow(a.r-s.r,2)+Math.pow(a.g-s.g,2)+Math.pow(a.b-s.b,2));l<d&&(d=l,c=s)}return c}};function J(){u("\u{1F3A8} Detectando colores disponibles...");let o=document.querySelectorAll('[id^="color-"]'),a=[];for(let n of o){if(n.querySelector("svg"))continue;let c=n.id.replace("color-",""),d=parseInt(c);if(d===0||d===5)continue;let s=n.style.backgroundColor;if(s){let l=s.match(/\d+/g);if(l&&l.length>=3){let r={r:parseInt(l[0]),g:parseInt(l[1]),b:parseInt(l[2])};a.push({id:d,element:n,...r}),u(`Color detectado: id=${d}, rgb(${r.r},${r.g},${r.b})`)}}}return u(`\u2705 ${a.length} colores disponibles detectados`),a}var I=o=>new Promise(a=>setTimeout(a,o));var Q="https://backend.wplace.live";async function ee(){var o,a,n;try{let c=await fetch(`${Q}/me`,{credentials:"include"}).then(r=>r.json()),d=c||null,s=(c==null?void 0:c.charges)||{},l={count:(o=s.count)!=null?o:0,max:(a=s.max)!=null?a:0,cooldownMs:(n=s.cooldownMs)!=null?n:3e4};return{success:!0,data:{user:d,charges:l.count,maxCharges:l.max,chargeRegen:l.cooldownMs}}}catch(c){return{success:!1,error:c.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function te(o,a,n,c,d){try{let s=JSON.stringify({colors:c,coords:n,t:d}),l=await fetch(`${Q}/s0/pixel/${o}/${a}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:s}),r=null;try{r=await l.json()}catch{r={}}return{status:l.status,json:r,success:l.ok,painted:(r==null?void 0:r.painted)||0}}catch(s){return{status:0,json:{error:s.message},success:!1,painted:0}}}var ne=!1;async function we(){if(!(ne||window.turnstile))return new Promise((o,a)=>{let n=document.createElement("script");n.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",n.async=!0,n.defer=!0,n.onload=()=>{ne=!0,o()},n.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(n)})}async function ye(o,a="paint"){var n;if(await we(),typeof((n=window.turnstile)==null?void 0:n.execute)=="function")try{let c=await window.turnstile.execute(o,{action:a});if(c&&c.length>20)return c}catch{}return await new Promise(c=>{let d=document.createElement("div");d.style.position="fixed",d.style.left="-9999px",document.body.appendChild(d),window.turnstile.render(d,{sitekey:o,callback:s=>{document.body.removeChild(d),c(s)}})})}async function ae(o){return ye(o,"paint")}async function ie(o,a,n,c,d){let{width:s,height:l}=o,{x:r,y:m}=a;u(`Iniciando pintado: imagen(${s}x${l}) inicio LOCAL(${r},${m}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(u("Generando cola de p\xEDxeles..."),e.remainingPixels=Se(o,a,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(i=>{let t=i.imageY*s+i.imageX,g=e.lastPosition.y*s+e.lastPosition.x;return t>=g})),u(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let i=Math.floor(e.currentCharges),t;if(e.isFirstBatch&&e.useAllChargesFirst&&i>0?(t=Math.min(i,e.remainingPixels.length),e.isFirstBatch=!1,u(`Primera pasada: usando ${t} cargas de ${i} disponibles`)):t=Math.min(e.pixelsPerBatch,e.remainingPixels.length),i<t){u(`Cargas insuficientes: ${i}/${t} necesarias`),await Ce(t-i,n),i=Math.floor(e.currentCharges),e.isFirstBatch||(t=Math.min(e.pixelsPerBatch,e.remainingPixels.length,i));continue}let g=e.remainingPixels.splice(0,t);u(`Pintando lote de ${g.length} p\xEDxeles...`);let p=await ve(g,n);if(p.success&&p.painted>0){if(e.paintedPixels+=p.painted,e.currentCharges=Math.max(0,e.currentCharges-p.painted),u(`Cargas despu\xE9s del lote: ${e.currentCharges.toFixed(1)} (consumidas: ${p.painted})`),g.length>0){let b=g[g.length-1];e.lastPosition={x:b.imageX,y:b.imageY}}u(`Lote exitoso: ${p.painted}/${g.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`);let w=Ee(),x=(e.paintedPixels/e.totalPixels*100).toFixed(1),P=f("image.passCompleted",{painted:p.painted,percent:x,current:e.paintedPixels,total:e.totalPixels});n&&n(e.paintedPixels,e.totalPixels,P,w),await I(2e3)}else p.shouldContinue?u("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(e.remainingPixels.unshift(...g),u("Lote fall\xF3: reintentando en 5 segundos..."),await I(5e3));await I(500)}e.stopFlag?(u(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),c&&c(!1,e.paintedPixels)):(u(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],c&&c(!0,e.paintedPixels))}catch(i){u("Error en proceso de pintado:",i),d&&d(i)}}async function Pe(o){var a;try{if(!o||o.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let n=[],c=[],d=null,s=null;for(let m of o)n.push(m.localX,m.localY),c.push(m.color.id||m.color.value||1),d===null&&(d=m.tileX,s=m.tileY);let l=await ae(A.SITEKEY),r=await te(d,s,n,c,l);return r.status===200?{success:!0,painted:r.painted,response:r.json}:{success:!1,painted:0,error:((a=r.json)==null?void 0:a.message)||`HTTP ${r.status}`,status:r.status}}catch(n){return u("Error en paintPixelBatch:",n),{success:!1,painted:0,error:n.message}}}async function ve(o,a){for(let s=1;s<=5;s++)try{let l=await Pe(o);if(l.success)return e.retryCount=0,l;if(e.retryCount=s,s<5){let r=3e3*Math.pow(2,s-1),m=Math.round(r/1e3),i;l.status===0||l.status==="NetworkError"?i=f("image.networkError"):l.status>=500?i=f("image.serverError"):l.status===408?i=f("image.timeoutError"):i=f("image.retryAttempt",{attempt:s,maxAttempts:5,delay:m}),a&&a(e.paintedPixels,e.totalPixels,i),u(`Reintento ${s}/5 despu\xE9s de ${m}s. Error: ${l.error}`),await I(r)}}catch(l){if(u(`Error en intento ${s}:`,l),e.retryCount=s,s<5){let r=3e3*Math.pow(2,s-1),m=Math.round(r/1e3),i=f("image.retryError",{attempt:s,maxAttempts:5,delay:m});a&&a(e.paintedPixels,e.totalPixels,i),await I(r)}}e.retryCount=5;let d=f("image.retryFailed",{maxAttempts:5});return a&&a(e.paintedPixels,e.totalPixels,d),u("Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function Ce(o,a){let c=A.CHARGE_REGEN_MS*o+5e3;if(u(`Esperando ${Math.round(c/1e3)}s para obtener ${o} cargas`),e.inCooldown=!0,e.cooldownEndTime=Date.now()+c,e.nextBatchCooldown=Math.round(c/1e3),a){let d=Math.floor(c/6e4),s=Math.floor(c%6e4/1e3),l=d>0?`${d}m ${s}s`:`${s}s`,r=f("image.waitingChargesRegen",{current:Math.floor(e.currentCharges),needed:o,time:l});a(e.paintedPixels,e.totalPixels,r)}for(let d=Math.round(c/1e3);d>0&&!e.stopFlag;d--){if(e.nextBatchCooldown=d,a&&(d%5===0||d<=10||d===Math.round(c/1e3))){let s=Math.floor(d/60),l=d%60,r=s>0?`${s}m ${l}s`:`${l}s`,m=f("image.waitingChargesCountdown",{current:Math.floor(e.currentCharges),needed:o,time:r});a(e.paintedPixels,e.totalPixels,m)}await I(1e3)}e.inCooldown=!1,e.nextBatchCooldown=0,e.currentCharges=Math.min(e.maxCharges||50,e.currentCharges+c/A.CHARGE_REGEN_MS)}function Se(o,a,n,c){let{pixels:d}=o,{x:s,y:l}=a,r=[];for(let m of d){let i=s+m.x,t=l+m.y;r.push({imageX:m.x,imageY:m.y,localX:i,localY:t,tileX:n,tileY:c,color:m.targetColor,originalColor:m.originalColor})}return u(`Cola de p\xEDxeles generada: ${r.length} p\xEDxeles para pintar`),r}function Ee(){if(!e.remainingPixels||e.remainingPixels.length===0)return 0;let o=e.remainingPixels.length,a=e.pixelsPerBatch,n=A.CHARGE_REGEN_MS/1e3,c=Math.ceil(o/a),d=a*n,s=(c-1)*d,l=c*2;return Math.ceil(s+l)}function V(){e.stopFlag=!0,e.running=!1,u("\u{1F6D1} Deteniendo proceso de pintado...")}function j(o=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let a={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch,useAllChargesFirst:e.useAllChargesFirst,isFirstBatch:e.isFirstBatch,maxCharges:e.maxCharges},colors:e.availableColors.map(r=>({id:r.id,r:r.r,g:r.g,b:r.b})),remainingPixels:e.remainingPixels||[]};try{if(window.__WPA_OVERLAY__&&window.__WPA_OVERLAY__.state){let r=window.__WPA_OVERLAY__.state;a.overlay={enabled:!!r.enabled,src:typeof r.src=="string"&&r.src.length<2e6?r.src:null,cssX:r.cssX,cssY:r.cssY,tileX:r.tileX,tileY:r.tileY,pxX:r.pxX,pxY:r.pxY}}}catch(r){u("Overlay: no se pudo serializar estado",r)}let n=JSON.stringify(a,null,2),c=new window.Blob([n],{type:"application/json"}),d=o||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,s=window.URL.createObjectURL(c),l=document.createElement("a");return l.href=s,l.download=d,document.body.appendChild(l),l.click(),document.body.removeChild(l),window.URL.revokeObjectURL(s),u(`\u2705 Progreso guardado: ${d}`),{success:!0,filename:d}}catch(a){return u("\u274C Error guardando progreso:",a),{success:!1,error:a.message}}}async function re(o){return new Promise(a=>{try{let n=new window.FileReader;n.onload=c=>{var d,s;try{let l=JSON.parse(c.target.result),m=["imageData","progress","position","colors"].filter(i=>!(i in l));if(m.length>0)throw new Error(`Campos requeridos faltantes: ${m.join(", ")}`);if(e.availableColors.length>0){let i=l.colors.map(p=>p.id),t=e.availableColors.map(p=>p.id);i.filter(p=>t.includes(p)).length<i.length*.8&&u("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...l.imageData,pixels:[]},e.paintedPixels=l.progress.paintedPixels,e.totalPixels=l.progress.totalPixels,l.progress.lastPosition?e.lastPosition=l.progress.lastPosition:l.position.lastX!==void 0&&l.position.lastY!==void 0&&(e.lastPosition={x:l.position.lastX,y:l.position.lastY}),l.position.startPosition?e.startPosition=l.position.startPosition:l.position.startX!==void 0&&l.position.startY!==void 0&&(e.startPosition={x:l.position.startX,y:l.position.startY}),e.tileX=l.position.tileX,e.tileY=l.position.tileY,e.originalImageName=l.imageData.originalName,e.remainingPixels=l.remainingPixels||l.progress.remainingPixels||[],l.config&&(e.pixelsPerBatch=l.config.pixelsPerBatch||e.pixelsPerBatch,e.useAllChargesFirst=l.config.useAllChargesFirst!==void 0?l.config.useAllChargesFirst:e.useAllChargesFirst,e.isFirstBatch=l.config.isFirstBatch!==void 0?l.config.isFirstBatch:!0,e.maxCharges=l.config.maxCharges||e.maxCharges),e.imageLoaded=!0,e.colorsChecked=!0;try{l.overlay&&window.__WPA_OVERLAY__&&(window.__WPA_OVERLAY__.injectOverlayStyles(),l.overlay.src&&window.__WPA_OVERLAY__.setOverlayImageSrc(l.overlay.src),window.__WPA_OVERLAY__.setAnchorCss((d=l.overlay.cssX)!=null?d:0,(s=l.overlay.cssY)!=null?s:0),window.__WPA_OVERLAY__.setLogicalCoords(l.overlay),window.__WPA_OVERLAY__.setOverlayEnabled(!!l.overlay.enabled))}catch(i){u("Overlay: no se pudo restaurar estado",i)}u(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),a({success:!0,data:l,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(l){u("\u274C Error parseando archivo de progreso:",l),a({success:!1,error:l.message})}},n.onerror=()=>{let c="Error leyendo archivo";u("\u274C",c),a({success:!1,error:c})},n.readAsText(o)}catch(n){u("\u274C Error cargando progreso:",n),a({success:!1,error:n.message})}})}function se(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,e.isFirstBatch=!0,e.nextBatchCooldown=0,u("\u{1F9F9} Progreso limpiado")}function oe(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function le(){return{hasProgress:oe(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:oe()}}function ce(o=null){let a=document.createElement("div");o&&(a.id=o),a.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let n=a.attachShadow({mode:"open"});return document.body.appendChild(a),{host:a,root:n}}function de(o,a){let n=0,c=0,d=0,s=0;o.style.cursor="move",o.addEventListener("mousedown",l);function l(i){i.target.closest(".header-btn, .wplace-header-btn")||(i.preventDefault(),d=i.clientX,s=i.clientY,document.addEventListener("mouseup",m),document.addEventListener("mousemove",r))}function r(i){i.preventDefault(),n=d-i.clientX,c=s-i.clientY,d=i.clientX,s=i.clientY,a.style.top=a.offsetTop-c+"px",a.style.left=a.offsetLeft-n+"px"}function m(){document.removeEventListener("mouseup",m),document.removeEventListener("mousemove",r)}}async function ue({texts:o,...a}){if(u("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let h=document.createElement("link");h.rel="stylesheet",h.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(h),u("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:n,root:c}=ce(),d=document.createElement("style");d.textContent=`
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
  `,c.appendChild(d);let s=document.createElement("div");s.className="container",s.innerHTML=`
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
        <button class="btn btn-primary overlay-toggle-btn" disabled>
          \u{1F5BC}\uFE0F
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
  `,c.appendChild(s);let l=document.createElement("input");l.type="file",l.accept="image/png,image/jpeg",l.style.display="none",c.appendChild(l);let r=document.createElement("input");r.type="file",r.accept=".json",r.style.display="none",c.appendChild(r);let m=document.createElement("div");m.className="resize-overlay",c.appendChild(m);let i=document.createElement("div");i.className="resize-container",i.innerHTML=`
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
  `,c.appendChild(i);let t={header:s.querySelector(".header"),configBtn:s.querySelector(".config-btn"),minimizeBtn:s.querySelector(".minimize-btn"),configPanel:s.querySelector(".config-panel"),pixelsPerBatch:s.querySelector(".pixels-per-batch"),useAllCharges:s.querySelector(".use-all-charges"),batchValue:s.querySelector(".batch-value"),cooldownValue:s.querySelector(".cooldown-value"),initBtn:s.querySelector(".init-btn"),uploadBtn:s.querySelector(".upload-btn"),loadProgressBtn:s.querySelector(".load-progress-btn"),resizeBtn:s.querySelector(".resize-btn"),selectPosBtn:s.querySelector(".select-pos-btn"),startBtn:s.querySelector(".start-btn"),stopBtn:s.querySelector(".stop-btn"),overlayToggleBtn:s.querySelector(".overlay-toggle-btn"),progressBar:s.querySelector(".progress-bar"),statsArea:s.querySelector(".stats-area"),status:s.querySelector(".status"),content:s.querySelector(".content")},g={overlay:m,container:i,widthSlider:i.querySelector(".width-slider"),heightSlider:i.querySelector(".height-slider"),widthValue:i.querySelector(".width-value"),heightValue:i.querySelector(".height-value"),keepAspect:i.querySelector(".keep-aspect"),preview:i.querySelector(".resize-preview"),confirmBtn:i.querySelector(".confirm-resize"),cancelBtn:i.querySelector(".cancel-resize")},p={minimized:!1,configVisible:!1};de(t.header,s),t.minimizeBtn.addEventListener("click",()=>{p.minimized=!p.minimized,p.minimized?(s.classList.add("minimized"),t.minimizeBtn.innerHTML="\u{1F53C}"):(s.classList.remove("minimized"),t.minimizeBtn.innerHTML="\u{1F53D}")}),t.configBtn.addEventListener("click",()=>{p.configVisible=!p.configVisible,p.configVisible?(t.configPanel.classList.add("visible"),t.configBtn.innerHTML="\u274C"):(t.configPanel.classList.remove("visible"),t.configBtn.innerHTML="\u2699\uFE0F")}),t.pixelsPerBatch.addEventListener("change",()=>{let h=parseInt(t.pixelsPerBatch.value)||20;t.batchValue.textContent=h,a.onConfigChange&&a.onConfigChange({pixelsPerBatch:h})}),t.useAllCharges.addEventListener("change",()=>{a.onConfigChange&&a.onConfigChange({useAllCharges:t.useAllCharges.checked})});function w(){t.uploadBtn.disabled=!1,t.loadProgressBtn.disabled=!1,t.overlayToggleBtn.disabled=!1}t.initBtn.addEventListener("click",async()=>{t.initBtn.disabled=!0,a.onInitBot&&await a.onInitBot()&&w(),t.initBtn.disabled=!1}),t.uploadBtn.addEventListener("click",()=>{l.click()}),l.addEventListener("change",async()=>{l.files.length>0&&a.onUploadImage&&await a.onUploadImage(l.files[0])&&(t.selectPosBtn.disabled=!1,t.resizeBtn.disabled=!1)}),t.loadProgressBtn.addEventListener("click",()=>{r.click()}),r.addEventListener("change",async()=>{r.files.length>0&&a.onLoadProgress&&await a.onLoadProgress(r.files[0])&&(t.selectPosBtn.disabled=!1,t.startBtn.disabled=!1,t.resizeBtn.disabled=!1)}),t.resizeBtn.addEventListener("click",()=>{a.onResizeImage&&a.onResizeImage()}),t.selectPosBtn.addEventListener("click",async()=>{a.onSelectPosition&&(t.selectPosBtn.disabled=!0,await a.onSelectPosition()&&(t.startBtn.disabled=!1),t.selectPosBtn.disabled=!1)}),t.overlayToggleBtn.addEventListener("click",()=>{if(!window.__WPA_OVERLAY__)return;let h=!window.__WPA_OVERLAY__.state.enabled;window.__WPA_OVERLAY__.setOverlayEnabled(h);let v=h?o.overlayOn||"Overlay: ON":o.overlayOff||"Overlay: OFF";t.overlayToggleBtn.querySelector("span").textContent=v}),t.startBtn.addEventListener("click",async()=>{a.onStartPainting&&(t.startBtn.disabled=!0,t.stopBtn.disabled=!1,await a.onStartPainting()||(t.startBtn.disabled=!1,t.stopBtn.disabled=!0))}),t.stopBtn.addEventListener("click",async()=>{a.onStopPainting&&await a.onStopPainting()&&(t.startBtn.disabled=!1,t.stopBtn.disabled=!0)});function x(h,v="default"){t.status.textContent=h,t.status.className=`status status-${v}`,t.status.style.animation="none",t.status.offsetWidth,t.status.style.animation="slideIn 0.3s ease-out"}function P(h){let{width:v,height:y}=h.getDimensions(),k=v/y;g.widthSlider.value=v,g.heightSlider.value=y,g.widthValue.textContent=v,g.heightValue.textContent=y,g.preview.src=h.img.src,g.overlay.style.display="block",g.container.style.display="block";let E=()=>{let T=parseInt(g.widthSlider.value),_=parseInt(g.heightSlider.value);g.widthValue.textContent=T,g.heightValue.textContent=_,g.preview.src=h.generatePreview(T,_)},O=()=>{if(g.keepAspect.checked){let T=parseInt(g.widthSlider.value),_=Math.round(T/k);g.heightSlider.value=_}E()},$=()=>{if(g.keepAspect.checked){let T=parseInt(g.heightSlider.value),_=Math.round(T*k);g.widthSlider.value=_}E()};g.widthSlider.addEventListener("input",O),g.heightSlider.addEventListener("input",$);let D=()=>{let T=parseInt(g.widthSlider.value),_=parseInt(g.heightSlider.value);a.onConfirmResize&&a.onConfirmResize(h,T,_),b()},M=()=>{b()};g.confirmBtn.addEventListener("click",D),g.cancelBtn.addEventListener("click",M),g.overlay.addEventListener("click",M),window.cleanupResizeDialog=()=>{g.widthSlider.removeEventListener("input",O),g.heightSlider.removeEventListener("input",$),g.confirmBtn.removeEventListener("click",D),g.cancelBtn.removeEventListener("click",M),g.overlay.removeEventListener("click",M)},E()}function b(){g.overlay.style.display="none",g.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function C(h,v,y=null){let k=v>0?h/v*100:0;t.progressBar.style.width=`${k}%`;let E=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${o.progress}</div>
        <div>${h}/${v} (${k.toFixed(1)}%)</div>
      </div>
    `;if(y&&(y.username&&(E+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${y.username}</div>
          </div>
        `),y.charges!==void 0&&(E+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${o.charges}</div>
            <div>${Math.floor(y.charges)}</div>
          </div>
        `),y.pixels!==void 0&&(E+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${o.pixels}</div>
            <div>${y.pixels.toLocaleString()}</div>
          </div>
        `),y.estimatedTime!==void 0&&y.estimatedTime>0)){let O=Math.floor(y.estimatedTime/3600),$=Math.floor(y.estimatedTime%3600/60),D=O>0?`${O}h ${$}m`:`${$}m`;E+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${o.timeRemaining}</div>
            <div>${D}</div>
          </div>
        `}t.statsArea.innerHTML=E}function S(h){if(h>0){let v=Math.floor(h/60),y=h%60,k=v>0?`${v}m ${y}s`:`${y}s`;t.cooldownValue.textContent=k}else t.cooldownValue.textContent="--"}function B(h){h&&h.includes("\u23F3")?(t.status.textContent=h,t.status.className="status status-info"):h&&x(h,"info")}function L(h){h?(t.initBtn.disabled=!0,t.initBtn.style.opacity="0.6",t.initBtn.innerHTML=`\u2705 <span>${o.initBot} - Completado</span>`):(t.initBtn.disabled=!1,t.initBtn.style.opacity="1",t.initBtn.innerHTML=`\u{1F916} <span>${o.initBot}</span>`)}function R(h){t.initBtn.style.display=h?"flex":"none"}function N(){n.remove()}return u("\u2705 Interfaz de Auto-Image creada"),{setStatus:x,updateProgress:C,updateCooldownDisplay:S,updateCooldownMessage:B,setInitialized:L,setInitButtonVisible:R,enableButtonsAfterInit:w,showResizeDialog:P,closeResizeDialog:b,destroy:N}}function ge(o,a,n={}){return new Promise(c=>{let d=document.createElement("div");d.className="modal-overlay",d.style.position="fixed",d.style.top="0",d.style.left="0",d.style.width="100%",d.style.height="100%",d.style.background="rgba(0,0,0,0.7)",d.style.zIndex="10001",d.style.display="flex",d.style.alignItems="center",d.style.justifyContent="center";let s=document.createElement("div");s.style.background="#1a1a1a",s.style.border="2px solid #333",s.style.borderRadius="15px",s.style.padding="25px",s.style.color="#eee",s.style.minWidth="350px",s.style.maxWidth="400px",s.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",s.style.fontFamily="'Segoe UI', Roboto, sans-serif",s.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${a}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${o}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${n.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${n.save}</button>`:""}
        ${n.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${n.discard}</button>`:""}
        ${n.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${n.cancel}</button>`:""}
      </div>
    `,d.appendChild(s),document.body.appendChild(d);let l=s.querySelector(".save-btn"),r=s.querySelector(".discard-btn"),m=s.querySelector(".cancel-btn"),i=()=>{document.body.removeChild(d)};l&&l.addEventListener("click",()=>{i(),c("save")}),r&&r.addEventListener("click",()=>{i(),c("discard")}),m&&m.addEventListener("click",()=>{i(),c("cancel")}),d.addEventListener("click",t=>{t.target===d&&(i(),c("cancel"))})})}function U(){let o=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let c of o){let d=document.querySelector(c);if(d&&d.offsetParent!==null)return!0}let a=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),n=0;for(let c of a)if(c.offsetParent!==null&&c.offsetWidth>10&&c.offsetHeight>10&&(n++,n>=5))return!0;return!1}function pe(){let o=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(o){let c=o.textContent.toLowerCase().includes("paint"),d=o.querySelector('svg path[d*="240-120"]');if(c||d)return o.click(),!0}let a=document.querySelectorAll("button");for(let n of a)if(n.textContent.toLowerCase().includes("paint")&&n.offsetParent!==null&&!n.disabled)return n.click(),!0;return!1}(()=>{let o="wpa-overlay",a="wpa-overlay-style",n={enabled:!1,src:null,cssX:0,cssY:0,tileX:0,tileY:0,pxX:0,pxY:0,node:null,board:null,observer:null};function c(){if(document.getElementById(a))return;let i=document.createElement("style");i.id=a,i.textContent=`
      .${o} {
        position: absolute !important;
        pointer-events: none !important; /* no intercepta clics */
        image-rendering: pixelated !important;
        opacity: 0.65;                 /* opacidad visible, ajustable */
        z-index: 2147483646;           /* muy alto, pero deja pasar eventos */
        transform-origin: top left;    /* estabilidad en zoom */
        will-change: transform, left, top;
      }
    `,document.head.appendChild(i)}function d(){var t;return[(t=document.querySelector("canvas"))==null?void 0:t.parentElement,document.querySelector('div[id*="board"],div[class*="board"]'),document.querySelector('div[class*="canvas"],div[id*="canvas"]')].filter(Boolean)[0]||document.body}function s(){if(n.node&&n.node.isConnected)return n.node;n.board=d();let i=document.createElement("img");return i.className=o,i.hidden=!n.enabled,n.node=i,n.board.appendChild(i),!n.observer&&window.MutationObserver&&(n.observer=new window.MutationObserver(()=>{var t;(t=n.node)!=null&&t.isConnected||(n.board=d(),n.board.appendChild(n.node),r())}),n.observer.observe(document.body,{childList:!0,subtree:!0})),i}function l(i){n.src=i;let t=s();t.src=i}function r(){if(!n.node)return;let i=n.node;i.style.left=`${Math.round(n.cssX)}px`,i.style.top=`${Math.round(n.cssY)}px`}function m(i){n.enabled=typeof i=="boolean"?i:!n.enabled,s(),n.node.hidden=!n.enabled}window.__WPA_OVERLAY__={injectOverlayStyles:c,setOverlayImageSrc:l,applyOverlayPosition:r,setOverlayEnabled:m,setAnchorCss(i,t){n.cssX=i,n.cssY=t,r()},setLogicalCoords({tileX:i,tileY:t,pxX:g,pxY:p}){n.tileX=i!=null?i:n.tileX,n.tileY=t!=null?t:n.tileY,n.pxX=g!=null?g:n.pxX,n.pxY=p!=null?p:n.pxY},get state(){return n}}})();async function me(){u("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),W(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let o=null,a=window.fetch,n=()=>{window.fetch!==a&&(window.fetch=a,u("\u{1F504} Fetch original restaurado")),e.positionTimeoutId&&(clearTimeout(e.positionTimeoutId),e.positionTimeoutId=null),e.cleanupObserver&&(e.cleanupObserver(),e.cleanupObserver=null),e.selectingPosition=!1};try{let c={...A},d=X("image");if(e.language=K(),!c.SITEKEY){let i=document.querySelector("*[data-sitekey]");i?(c.SITEKEY=i.getAttribute("data-sitekey"),u(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${c.SITEKEY.substring(0,20)}...`)):u("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function s(){return u("\u{1F916} Intentando auto-inicio..."),U()?(u("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(u("\u{1F50D} Paleta no encontrada, buscando bot\xF3n Paint..."),pe()?(u("\u{1F446} Bot\xF3n Paint encontrado y presionado"),await I(2e3),U()?(u("\u2705 Paleta abierta exitosamente"),!0):(u("\u274C La paleta no se abri\xF3 despu\xE9s de hacer clic"),!1)):(u("\u274C Bot\xF3n Paint no encontrado"),!1))}async function l(i=!1){u("\u{1F916} Inicializando Auto-Image..."),r.setStatus(f("image.checkingColors"),"info");let t=J();if(t.length===0)return r.setStatus(f("image.noColorsFound"),"error"),!1;let g=await ee(),p=null;return g.success&&g.data.user?(p={username:g.data.user.name||"An\xF3nimo",charges:g.data.charges,maxCharges:g.data.maxCharges,pixels:g.data.user.pixelsPainted||0},o=p,e.currentCharges=g.data.charges,e.maxCharges=g.data.maxCharges||50,u(`\u{1F464} Usuario conectado: ${g.data.user.name||"An\xF3nimo"} - Cargas: ${p.charges}/${p.maxCharges} - P\xEDxeles: ${p.pixels}`)):u("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=t,e.colorsChecked=!0,r.setStatus(f("image.colorsFound",{count:t.length}),"success"),r.updateProgress(0,0,p),i||u(`\u2705 ${t.length} colores disponibles detectados`),r.setInitialized(!0),r.enableButtonsAfterInit(),!0}let r=await ue({texts:d,onConfigChange:i=>{i.pixelsPerBatch!==void 0&&(e.pixelsPerBatch=i.pixelsPerBatch),i.useAllCharges!==void 0&&(e.useAllChargesFirst=i.useAllCharges),u("Configuraci\xF3n actualizada:",i)},onInitBot:l,onUploadImage:async i=>{try{r.setStatus(f("image.loadingImage"),"info");let t=window.URL.createObjectURL(i),g=new q(t);g.originalName=i.name,await g.load();try{let w=g.getDimensions(),x=g.generatePreview(w.width,w.height);window.__WPA_OVERLAY__&&(window.__WPA_OVERLAY__.injectOverlayStyles(),window.__WPA_OVERLAY__.setOverlayImageSrc(x))}catch(w){u("Overlay: no se pudo preparar la imagen de plantilla",w)}let p=g.processImage(e.availableColors,c);return e.imageData=p,e.imageData.processor=g,e.totalPixels=p.validPixelCount,e.paintedPixels=0,e.originalImageName=i.name,e.imageLoaded=!0,r.setStatus(f("image.imageLoaded",{count:p.validPixelCount}),"success"),r.updateProgress(0,p.validPixelCount,o),u(`\u2705 Imagen cargada: ${p.width}x${p.height}, ${p.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(t),!0}catch(t){return r.setStatus(f("image.imageError"),"error"),u("\u274C Error cargando imagen:",t),!1}},onSelectPosition:async()=>new Promise(i=>{r.setStatus(f("image.selectPositionAlert"),"info"),r.setStatus(f("image.waitingPosition"),"info"),e.selectingPosition=!0;let t=!1,g=()=>{window.fetch=async(x,P)=>{if(e.selectingPosition&&!t&&typeof x=="string"&&x.includes("/s0/pixel/")&&P&&P.method==="POST")try{u(`\u{1F3AF} Interceptando request de pintado: ${x}`);let b=await a(x,P);if(b.ok&&P.body){let C;try{C=JSON.parse(P.body)}catch(S){return u("Error parseando body del request:",S),b}if(C.coords&&Array.isArray(C.coords)&&C.coords.length>=2){let S=C.coords[0],B=C.coords[1],L=x.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(L&&!t){t=!0,e.tileX=parseInt(L[1]),e.tileY=parseInt(L[2]),e.startPosition={x:S,y:B},e.selectingPosition=!1;try{window.__WPA_OVERLAY__&&(window.__WPA_OVERLAY__.setLogicalCoords({tileX:e.tileX,tileY:e.tileY,pxX:S,pxY:B}),window.__WPA_OVERLAY__.applyOverlayPosition())}catch(R){u("Overlay: error actualizando coords l\xF3gicas",R)}n(),r.setStatus(f("image.positionSet"),"success"),u(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${S},${B})`),i(!0)}else u("\u26A0\uFE0F No se pudo extraer tile de la URL:",x)}}return b}catch(b){if(u("\u274C Error interceptando pixel:",b),!t)return n(),a(x,P)}return a(x,P)}},p=()=>{let x=document.querySelectorAll("canvas");if(x.length===0){u("\u26A0\uFE0F No se encontraron elementos canvas");return}u(`\u{1F4CA} Configurando observer para ${x.length} canvas`);let P=b=>{var S;if(!e.selectingPosition||t)return;let C=b.target;if(C&&C.tagName==="CANVAS"){u("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let L=(window.__WPA_OVERLAY__&&window.__WPA_OVERLAY__.state.board||((S=document.querySelector("canvas"))==null?void 0:S.parentElement)||document.body).getBoundingClientRect(),R=b.clientX-L.left,N=b.clientY-L.top;window.__WPA_OVERLAY__&&(window.__WPA_OVERLAY__.setAnchorCss(R,N),window.__WPA_OVERLAY__.applyOverlayPosition())}catch(B){u("Overlay: error calculando ancla CSS",B)}setTimeout(()=>{!t&&e.selectingPosition&&u("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",P),e.cleanupObserver=()=>{document.removeEventListener("click",P)}};g(),p();let w=setTimeout(()=>{e.selectingPosition&&!t&&(n(),e.cleanupObserver&&e.cleanupObserver(),r.setStatus(f("image.positionTimeout"),"error"),u("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),i(!1))},12e4);e.positionTimeoutId=w}),onStartPainting:async()=>{var i;if(u("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((i=e.remainingPixels)==null?void 0:i.length)||0}),!e.imageLoaded||!e.startPosition)return r.setStatus(f("image.missingRequirements"),"error"),u(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,e.isFirstBatch=!0,r.setStatus(f("image.startPaintingMsg"),"success");try{return await ie(e.imageData,e.startPosition,(t,g,p,w)=>{o&&(o.charges=Math.floor(e.currentCharges),w!==void 0&&(o.estimatedTime=w)),r.updateProgress(t,g,o),e.inCooldown&&e.nextBatchCooldown>0?r.updateCooldownDisplay(e.nextBatchCooldown):r.updateCooldownDisplay(0),p?p.includes("\u23F3")&&e.inCooldown?r.updateCooldownMessage(p):r.setStatus(p,"info"):r.setStatus(f("image.paintingProgress",{painted:t,total:g}),"info")},(t,g)=>{t?(r.setStatus(f("image.paintingComplete",{count:g}),"success"),se()):r.setStatus(f("image.paintingStopped"),"warning"),e.running=!1},t=>{r.setStatus(f("image.paintingError"),"error"),u("\u274C Error en proceso de pintado:",t),e.running=!1}),!0}catch(t){return r.setStatus(f("image.paintingError"),"error"),u("\u274C Error iniciando pintado:",t),e.running=!1,!1}},onStopPainting:async()=>{if(le().hasProgress){let t=await ge(f("image.confirmSaveProgress"),f("image.saveProgressTitle"),{save:f("image.saveProgress"),discard:f("image.discardProgress"),cancel:f("image.cancel")});if(t==="save"){let g=j();g.success?r.setStatus(f("image.progressSaved",{filename:g.filename}),"success"):r.setStatus(f("image.progressSaveError",{error:g.error}),"error")}else if(t==="cancel")return!1}return V(),r.setStatus(f("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let i=j();return i.success?r.setStatus(f("image.progressSaved",{filename:i.filename}),"success"):r.setStatus(f("image.progressSaveError",{error:i.error}),"error"),i.success},onLoadProgress:async i=>{try{let t=await re(i);return t.success?(r.setStatus(f("image.progressLoaded",{painted:t.painted,total:t.total}),"success"),r.updateProgress(t.painted,t.total,o),u("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(r.setStatus(f("image.progressLoadError",{error:t.error}),"error"),!1)}catch(t){return r.setStatus(f("image.progressLoadError",{error:t.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&r.showResizeDialog(e.imageData.processor)},onConfirmResize:(i,t,g)=>{u(`\u{1F504} Redimensionando imagen de ${i.getDimensions().width}x${i.getDimensions().height} a ${t}x${g}`);try{i.resize(t,g);let p=i.processImage(e.availableColors,c);e.imageData=p,e.totalPixels=p.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},r.updateProgress(0,p.validPixelCount,o),r.setStatus(f("image.resizeSuccess",{width:t,height:g}),"success"),u(`\u2705 Imagen redimensionada: ${p.validPixelCount} p\xEDxeles v\xE1lidos`)}catch(p){u(`\u274C Error redimensionando imagen: ${p.message}`),r.setStatus(f("image.imageError"),"error")}}}),m=i=>{let{language:t}=i.detail;u(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${t}`),e.language=t};window.addEventListener("launcherLanguageChanged",m),window.addEventListener("languageChanged",m),window.addEventListener("beforeunload",()=>{n(),V(),r.destroy(),window.removeEventListener("launcherLanguageChanged",m),window.removeEventListener("languageChanged",m),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),u("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{r.setStatus(f("image.autoInitializing"),"info"),u("\u{1F916} Intentando auto-inicio..."),await s()?(r.setStatus(f("image.autoInitSuccess"),"success"),u("\u2705 Auto-inicio exitoso"),r.setInitButtonVisible(!1),await l(!0)&&u("\u{1F680} Bot auto-iniciado completamente")):(r.setStatus(f("image.autoInitFailed"),"warning"),u("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(i){u("\u274C Error en auto-inicio:",i),r.setStatus(f("image.manualInitRequired"),"warning")}},1e3)}catch(c){throw u("\u274C Error inicializando Auto-Image:",c),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),c}}(()=>{"use strict";var o,a;if((o=window.__wplaceBot)!=null&&o.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((a=window.__wplaceBot)!=null&&a.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,me().catch(n=>{console.error("[BOT] Error en Auto-Image:",n),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
