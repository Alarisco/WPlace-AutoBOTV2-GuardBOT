/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-17T16:48:22.693Z */
(()=>{var d=(...o)=>console.log("[WPA-UI]",...o);var Z={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando..."},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var G={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout. Retrying..."},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var K={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 Timeout serveur. Nouvel essai..."},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var D={es:Z,en:G,fr:K},X="es",M=D[X];function ye(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return D[a]?a:"es"}function ve(){return null}function V(){let o=ve(),a=ye(),c="es";return o&&D[o]?c=o:a&&D[a]&&(c=a),we(c),c}function we(o){if(!D[o]){console.warn(`Idioma '${o}' no disponible. Usando '${X}'`);return}X=o,M=D[o],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:o,translations:M}}))}function J(){return X}function y(o,a={}){let c=o.split("."),t=M;for(let i of c)if(t&&typeof t=="object"&&i in t)t=t[i];else return console.warn(`Clave de traducci\xF3n no encontrada: '${o}'`),o;return typeof t!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${o}'`),o):Ce(t,a)}function Ce(o,a){return!a||Object.keys(a).length===0?o:o.replace(/\{(\w+)\}/g,(c,t)=>a[t]!==void 0?a[t]:c)}function W(o){return M[o]?M[o]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${o}'`),{})}V();var z={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:z.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:z.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:50,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0};var q=class{constructor(a){this.imageSrc=a,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((a,c)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),a()},this.img.onerror=c,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(a,c){let t=document.createElement("canvas");return t.width=a,t.height=c,t.getContext("2d").drawImage(this.img,0,0,a,c),this.canvas.width=a,this.canvas.height=c,this.ctx.drawImage(t,0,0),this.getPixelData()}generatePreview(a,c){return this.previewCanvas.width=a,this.previewCanvas.height=c,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,a,c),this.previewCanvas.toDataURL()}getImageData(){let{width:a,height:c}=this.getDimensions(),t=this.getPixelData();return{width:a,height:c,pixels:t,originalName:this.originalName||"image.png"}}processImage(a,c){let{width:t,height:i}=this.getDimensions(),s=this.getPixelData(),m=[],r=0;for(let b=0;b<i;b++)for(let l=0;l<t;l++){let n=(b*t+l)*4,g=s[n],x=s[n+1],S=s[n+2],E=s[n+3];if(E<c.TRANSPARENCY_THRESHOLD||g>c.WHITE_THRESHOLD&&x>c.WHITE_THRESHOLD&&S>c.WHITE_THRESHOLD)continue;let A=this.findClosestColor({r:g,g:x,b:S},a);A&&(m.push({x:l,y:b,originalColor:{r:g,g:x,b:S,alpha:E},targetColor:A}),r++)}return{width:t,height:i,pixels:m,validPixelCount:r,originalName:this.originalName||"image.png"}}findClosestColor(a,c){if(!c||c.length===0)return null;let t=null,i=1/0;for(let s of c){let m=Math.sqrt(Math.pow(a.r-s.r,2)+Math.pow(a.g-s.g,2)+Math.pow(a.b-s.b,2));m<i&&(i=m,t=s)}return t}};function Q(){d("\u{1F3A8} Detectando colores disponibles...");let o=document.querySelectorAll('[id^="color-"]'),a=[];for(let c of o){if(c.querySelector("svg"))continue;let t=c.id.replace("color-",""),i=parseInt(t);if(i===0||i===5)continue;let s=c.style.backgroundColor;if(s){let m=s.match(/\d+/g);if(m&&m.length>=3){let r={r:parseInt(m[0]),g:parseInt(m[1]),b:parseInt(m[2])};a.push({id:i,element:c,...r}),d(`Color detectado: id=${i}, rgb(${r.r},${r.g},${r.b})`)}}}return d(`\u2705 ${a.length} colores disponibles detectados`),a}var N=o=>new Promise(a=>setTimeout(a,o));var ee="https://backend.wplace.live";async function te(){var o,a,c;try{let t=await fetch(`${ee}/me`,{credentials:"include"}).then(r=>r.json()),i=t||null,s=(t==null?void 0:t.charges)||{},m={count:(o=s.count)!=null?o:0,max:(a=s.max)!=null?a:0,cooldownMs:(c=s.cooldownMs)!=null?c:3e4};return{success:!0,data:{user:i,charges:m.count,maxCharges:m.max,chargeRegen:m.cooldownMs}}}catch(t){return{success:!1,error:t.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function ne(o,a,c,t,i){try{let s=JSON.stringify({colors:t,coords:c,t:i}),m=await fetch(`${ee}/s0/pixel/${o}/${a}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:s}),r=null;try{r=await m.json()}catch{r={}}return{status:m.status,json:r,success:m.ok,painted:(r==null?void 0:r.painted)||0}}catch(s){return{status:0,json:{error:s.message},success:!1,painted:0}}}var ae=!1;async function Ee(){if(!(ae||window.turnstile))return new Promise((o,a)=>{let c=document.createElement("script");c.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",c.async=!0,c.defer=!0,c.onload=()=>{ae=!0,o()},c.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(c)})}async function Ae(o,a="paint"){var c;if(await Ee(),typeof((c=window.turnstile)==null?void 0:c.execute)=="function")try{let t=await window.turnstile.execute(o,{action:a});if(t&&t.length>20)return t}catch{}return await new Promise(t=>{let i=document.createElement("div");i.style.position="fixed",i.style.left="-9999px",document.body.appendChild(i),window.turnstile.render(i,{sitekey:o,callback:s=>{document.body.removeChild(i),t(s)}})})}async function oe(o){return Ae(o,"paint")}async function ie(o,a,c,t,i){let{width:s,height:m}=o,{x:r,y:b}=a;if(d(`Iniciando pintado: imagen(${s}x${m}) inicio LOCAL(${r},${b}) tile(${e.tileX},${e.tileY})`),!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0){d("Generando cola de p\xEDxeles..."),e.remainingPixels=Ie(o,a,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(l=>{let n=l.imageY*s+l.imageX,g=e.lastPosition.y*s+e.lastPosition.x;return n>=g})),d(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),e.startPosition&&e.tileX!==void 0&&e.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch}),d(`\u2705 Plan overlay actualizado con ${e.remainingPixels.length} p\xEDxeles en cola`))}catch(l){d("\u26A0\uFE0F Error actualizando plan overlay:",l)}}try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let l=Math.floor(e.currentCharges),n;if(e.isFirstBatch&&e.useAllChargesFirst&&l>0?(n=Math.min(l,e.remainingPixels.length),e.isFirstBatch=!1,d(`Primera pasada: usando ${n} cargas de ${l} disponibles`)):n=Math.min(e.pixelsPerBatch,e.remainingPixels.length),l<n){d(`Cargas insuficientes: ${l}/${n} necesarias`),await _e(n-l,c),l=Math.floor(e.currentCharges),e.isFirstBatch||(n=Math.min(e.pixelsPerBatch,e.remainingPixels.length,l));continue}let g=e.remainingPixels.splice(0,n);d(`Pintando lote de ${g.length} p\xEDxeles...`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch})}catch(S){d("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",S)}let x=await Le(g,c);if(x.success&&x.painted>0){if(e.paintedPixels+=x.painted,e.currentCharges=Math.max(0,e.currentCharges-x.painted),d(`Cargas despu\xE9s del lote: ${e.currentCharges.toFixed(1)} (consumidas: ${x.painted})`),g.length>0){let A=g[g.length-1];e.lastPosition={x:A.imageX,y:A.imageY}}d(`Lote exitoso: ${x.painted}/${g.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`);let S=Be(),E=(e.paintedPixels/e.totalPixels*100).toFixed(1),L=y("image.passCompleted",{painted:x.painted,percent:E,current:e.paintedPixels,total:e.totalPixels});c&&c(e.paintedPixels,e.totalPixels,L,S),await N(2e3)}else x.shouldContinue?d("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(e.remainingPixels.unshift(...g),d("Lote fall\xF3: reintentando en 5 segundos..."),await N(5e3));await N(500)}if(e.stopFlag)d(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),t&&t(!1,e.paintedPixels);else{d(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[];try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),d("\u2705 Plan overlay limpiado al completar pintado"))}catch(l){d("\u26A0\uFE0F Error limpiando plan overlay:",l)}t&&t(!0,e.paintedPixels)}}catch(l){d("Error en proceso de pintado:",l),i&&i(l)}}async function Se(o){var a;try{if(!o||o.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let c=[],t=[],i=null,s=null;for(let b of o)c.push(b.localX,b.localY),t.push(b.color.id||b.color.value||1),i===null&&(i=b.tileX,s=b.tileY);let m=await oe(z.SITEKEY),r=await ne(i,s,c,t,m);return r.status===200?{success:!0,painted:r.painted,response:r.json}:{success:!1,painted:0,error:((a=r.json)==null?void 0:a.message)||`HTTP ${r.status}`,status:r.status}}catch(c){return d("Error en paintPixelBatch:",c),{success:!1,painted:0,error:c.message}}}async function Le(o,a){for(let s=1;s<=5;s++)try{let m=await Se(o);if(m.success)return e.retryCount=0,m;if(e.retryCount=s,s<5){let r=3e3*Math.pow(2,s-1),b=Math.round(r/1e3),l;m.status===0||m.status==="NetworkError"?l=y("image.networkError"):m.status>=500?l=y("image.serverError"):m.status===408?l=y("image.timeoutError"):l=y("image.retryAttempt",{attempt:s,maxAttempts:5,delay:b}),a&&a(e.paintedPixels,e.totalPixels,l),d(`Reintento ${s}/5 despu\xE9s de ${b}s. Error: ${m.error}`),await N(r)}}catch(m){if(d(`Error en intento ${s}:`,m),e.retryCount=s,s<5){let r=3e3*Math.pow(2,s-1),b=Math.round(r/1e3),l=y("image.retryError",{attempt:s,maxAttempts:5,delay:b});a&&a(e.paintedPixels,e.totalPixels,l),await N(r)}}e.retryCount=5;let i=y("image.retryFailed",{maxAttempts:5});return a&&a(e.paintedPixels,e.totalPixels,i),d("Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function _e(o,a){let t=z.CHARGE_REGEN_MS*o+5e3;if(d(`Esperando ${Math.round(t/1e3)}s para obtener ${o} cargas`),e.inCooldown=!0,e.cooldownEndTime=Date.now()+t,e.nextBatchCooldown=Math.round(t/1e3),a){let i=Math.floor(t/6e4),s=Math.floor(t%6e4/1e3),m=i>0?`${i}m ${s}s`:`${s}s`,r=y("image.waitingChargesRegen",{current:Math.floor(e.currentCharges),needed:o,time:m});a(e.paintedPixels,e.totalPixels,r)}for(let i=Math.round(t/1e3);i>0&&!e.stopFlag;i--){if(e.nextBatchCooldown=i,a&&(i%5===0||i<=10||i===Math.round(t/1e3))){let s=Math.floor(i/60),m=i%60,r=s>0?`${s}m ${m}s`:`${m}s`,b=y("image.waitingChargesCountdown",{current:Math.floor(e.currentCharges),needed:o,time:r});a(e.paintedPixels,e.totalPixels,b)}await N(1e3)}e.inCooldown=!1,e.nextBatchCooldown=0,e.currentCharges=Math.min(e.maxCharges||50,e.currentCharges+t/z.CHARGE_REGEN_MS)}function Ie(o,a,c,t){let{pixels:i}=o,{x:s,y:m}=a,r=[];for(let b of i){let l=s+b.x,n=m+b.y;r.push({imageX:b.x,imageY:b.y,localX:l,localY:n,tileX:c,tileY:t,color:b.targetColor,originalColor:b.originalColor})}return d(`Cola de p\xEDxeles generada: ${r.length} p\xEDxeles para pintar`),r}function Be(){if(!e.remainingPixels||e.remainingPixels.length===0)return 0;let o=e.remainingPixels.length,a=e.pixelsPerBatch,c=z.CHARGE_REGEN_MS/1e3,t=Math.ceil(o/a),i=a*c,s=(t-1)*i,m=t*2;return Math.ceil(s+m)}function H(){e.stopFlag=!0,e.running=!1,d("\u{1F6D1} Deteniendo proceso de pintado...")}function j(o=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let a={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch,useAllChargesFirst:e.useAllChargesFirst,isFirstBatch:e.isFirstBatch,maxCharges:e.maxCharges},colors:e.availableColors.map(r=>({id:r.id,r:r.r,g:r.g,b:r.b})),remainingPixels:e.remainingPixels||[]},c=JSON.stringify(a,null,2),t=new window.Blob([c],{type:"application/json"}),i=o||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,s=window.URL.createObjectURL(t),m=document.createElement("a");return m.href=s,m.download=i,document.body.appendChild(m),m.click(),document.body.removeChild(m),window.URL.revokeObjectURL(s),d(`\u2705 Progreso guardado: ${i}`),{success:!0,filename:i}}catch(a){return d("\u274C Error guardando progreso:",a),{success:!1,error:a.message}}}async function se(o){return new Promise(a=>{try{let c=new window.FileReader;c.onload=t=>{try{let i=JSON.parse(t.target.result),m=["imageData","progress","position","colors"].filter(r=>!(r in i));if(m.length>0)throw new Error(`Campos requeridos faltantes: ${m.join(", ")}`);if(e.availableColors.length>0){let r=i.colors.map(n=>n.id),b=e.availableColors.map(n=>n.id);r.filter(n=>b.includes(n)).length<r.length*.8&&d("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...i.imageData,pixels:[]},e.paintedPixels=i.progress.paintedPixels,e.totalPixels=i.progress.totalPixels,i.progress.lastPosition?e.lastPosition=i.progress.lastPosition:i.position.lastX!==void 0&&i.position.lastY!==void 0&&(e.lastPosition={x:i.position.lastX,y:i.position.lastY}),i.position.startPosition?e.startPosition=i.position.startPosition:i.position.startX!==void 0&&i.position.startY!==void 0&&(e.startPosition={x:i.position.startX,y:i.position.startY}),e.tileX=i.position.tileX,e.tileY=i.position.tileY,e.originalImageName=i.imageData.originalName,e.remainingPixels=i.remainingPixels||i.progress.remainingPixels||[];try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),e.startPosition&&e.tileX!==void 0&&e.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y}),d(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${e.tileX},${e.tileY}) local(${e.startPosition.x},${e.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch}),d(`\u2705 Plan overlay activado con ${e.remainingPixels.length} p\xEDxeles restantes`))}catch(r){d("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",r)}i.config&&(e.pixelsPerBatch=i.config.pixelsPerBatch||e.pixelsPerBatch,e.useAllChargesFirst=i.config.useAllChargesFirst!==void 0?i.config.useAllChargesFirst:e.useAllChargesFirst,e.isFirstBatch=i.config.isFirstBatch!==void 0?i.config.isFirstBatch:!0,e.maxCharges=i.config.maxCharges||e.maxCharges),e.imageLoaded=!0,e.colorsChecked=!0,d(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),a({success:!0,data:i,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(i){d("\u274C Error parseando archivo de progreso:",i),a({success:!1,error:i.message})}},c.onerror=()=>{let t="Error leyendo archivo";d("\u274C",t),a({success:!1,error:t})},c.readAsText(o)}catch(c){d("\u274C Error cargando progreso:",c),a({success:!1,error:c.message})}})}function le(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,e.isFirstBatch=!0,e.nextBatchCooldown=0,d("\u{1F9F9} Progreso limpiado")}function re(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function ce(){return{hasProgress:re(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:re()}}function de(o=null){let a=document.createElement("div");o&&(a.id=o),a.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let c=a.attachShadow({mode:"open"});return document.body.appendChild(a),{host:a,root:c}}function ue(o,a){let c=0,t=0,i=0,s=0;o.style.cursor="move",o.addEventListener("mousedown",m);function m(l){l.target.closest(".header-btn, .wplace-header-btn")||(l.preventDefault(),i=l.clientX,s=l.clientY,document.addEventListener("mouseup",b),document.addEventListener("mousemove",r))}function r(l){l.preventDefault(),c=i-l.clientX,t=s-l.clientY,i=l.clientX,s=l.clientY,a.style.top=a.offsetTop-t+"px",a.style.left=a.offsetLeft-c+"px"}function b(){document.removeEventListener("mouseup",b),document.removeEventListener("mousemove",r)}}async function ge({texts:o,...a}){if(d("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let u=document.createElement("link");u.rel="stylesheet",u.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(u),d("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:c,root:t}=de(),i=document.createElement("style");i.textContent=`
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
  `,t.appendChild(s);let m=document.createElement("input");m.type="file",m.accept="image/png,image/jpeg",m.style.display="none",t.appendChild(m);let r=document.createElement("input");r.type="file",r.accept=".json",r.style.display="none",t.appendChild(r);let b=document.createElement("div");b.className="resize-overlay",t.appendChild(b);let l=document.createElement("div");l.className="resize-container",l.innerHTML=`
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
  `,t.appendChild(l);let n={header:s.querySelector(".header"),configBtn:s.querySelector(".config-btn"),minimizeBtn:s.querySelector(".minimize-btn"),configPanel:s.querySelector(".config-panel"),pixelsPerBatch:s.querySelector(".pixels-per-batch"),useAllCharges:s.querySelector(".use-all-charges"),batchValue:s.querySelector(".batch-value"),cooldownValue:s.querySelector(".cooldown-value"),initBtn:s.querySelector(".init-btn"),uploadBtn:s.querySelector(".upload-btn"),loadProgressBtn:s.querySelector(".load-progress-btn"),resizeBtn:s.querySelector(".resize-btn"),selectPosBtn:s.querySelector(".select-pos-btn"),startBtn:s.querySelector(".start-btn"),stopBtn:s.querySelector(".stop-btn"),planOverlayToggleBtn:s.querySelector(".plan-overlay-toggle-btn"),progressBar:s.querySelector(".progress-bar"),statsArea:s.querySelector(".stats-area"),status:s.querySelector(".status"),content:s.querySelector(".content")},g={overlay:b,container:l,widthSlider:l.querySelector(".width-slider"),heightSlider:l.querySelector(".height-slider"),widthValue:l.querySelector(".width-value"),heightValue:l.querySelector(".height-value"),keepAspect:l.querySelector(".keep-aspect"),preview:l.querySelector(".resize-preview"),confirmBtn:l.querySelector(".confirm-resize"),cancelBtn:l.querySelector(".cancel-resize")},x={minimized:!1,configVisible:!1};ue(n.header,s),n.minimizeBtn.addEventListener("click",()=>{x.minimized=!x.minimized,x.minimized?(s.classList.add("minimized"),n.minimizeBtn.innerHTML="\u{1F53C}"):(s.classList.remove("minimized"),n.minimizeBtn.innerHTML="\u{1F53D}")}),n.configBtn.addEventListener("click",()=>{x.configVisible=!x.configVisible,x.configVisible?(n.configPanel.classList.add("visible"),n.configBtn.innerHTML="\u274C"):(n.configPanel.classList.remove("visible"),n.configBtn.innerHTML="\u2699\uFE0F")}),n.pixelsPerBatch.addEventListener("change",()=>{let u=parseInt(n.pixelsPerBatch.value)||20;n.batchValue.textContent=u,a.onConfigChange&&a.onConfigChange({pixelsPerBatch:u})}),n.useAllCharges.addEventListener("change",()=>{a.onConfigChange&&a.onConfigChange({useAllCharges:n.useAllCharges.checked})});function S(){if(!window.__WPA_PLAN_OVERLAY__||!n.planOverlayToggleBtn)return;let P=window.__WPA_PLAN_OVERLAY__.state.enabled?o.overlayOn||"Overlay: ON":o.overlayOff||"Overlay: OFF";n.planOverlayToggleBtn.querySelector("span").textContent=P}function E(){n.uploadBtn.disabled=!1,n.loadProgressBtn.disabled=!1,n.planOverlayToggleBtn.disabled=!1,S()}n.initBtn.addEventListener("click",async()=>{n.initBtn.disabled=!0,a.onInitBot&&await a.onInitBot()&&E(),n.initBtn.disabled=!1}),n.uploadBtn.addEventListener("click",()=>{m.click()}),m.addEventListener("change",async()=>{m.files.length>0&&a.onUploadImage&&await a.onUploadImage(m.files[0])&&(n.selectPosBtn.disabled=!1,n.resizeBtn.disabled=!1)}),n.loadProgressBtn.addEventListener("click",()=>{r.click()}),r.addEventListener("change",async()=>{r.files.length>0&&a.onLoadProgress&&await a.onLoadProgress(r.files[0])&&(n.selectPosBtn.disabled=!1,n.startBtn.disabled=!1,n.resizeBtn.disabled=!1)}),n.resizeBtn.addEventListener("click",()=>{a.onResizeImage&&a.onResizeImage()}),n.selectPosBtn.addEventListener("click",async()=>{a.onSelectPosition&&(n.selectPosBtn.disabled=!0,await a.onSelectPosition()&&(n.startBtn.disabled=!1),n.selectPosBtn.disabled=!1)}),n.planOverlayToggleBtn.addEventListener("click",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let u=!window.__WPA_PLAN_OVERLAY__.state.enabled;window.__WPA_PLAN_OVERLAY__.setEnabled(u),S()}),n.startBtn.addEventListener("click",async()=>{a.onStartPainting&&(n.startBtn.disabled=!0,n.stopBtn.disabled=!1,await a.onStartPainting()||(n.startBtn.disabled=!1,n.stopBtn.disabled=!0))}),n.stopBtn.addEventListener("click",async()=>{a.onStopPainting&&await a.onStopPainting()&&(n.startBtn.disabled=!1,n.stopBtn.disabled=!0)});function L(u,P="default"){n.status.textContent=u,n.status.className=`status status-${P}`,n.status.style.animation="none",n.status.offsetWidth,n.status.style.animation="slideIn 0.3s ease-out"}function A(u){let{width:P,height:h}=u.getDimensions(),v=P/h;g.widthSlider.value=P,g.heightSlider.value=h,g.widthValue.textContent=P,g.heightValue.textContent=h,g.preview.src=u.img.src,g.overlay.style.display="block",g.container.style.display="block";let w=()=>{let O=parseInt(g.widthSlider.value),k=parseInt(g.heightSlider.value);g.widthValue.textContent=O,g.heightValue.textContent=k,g.preview.src=u.generatePreview(O,k)},_=()=>{if(g.keepAspect.checked){let O=parseInt(g.widthSlider.value),k=Math.round(O/v);g.heightSlider.value=k}w()},B=()=>{if(g.keepAspect.checked){let O=parseInt(g.heightSlider.value),k=Math.round(O*v);g.widthSlider.value=k}w()};g.widthSlider.addEventListener("input",_),g.heightSlider.addEventListener("input",B);let C=()=>{let O=parseInt(g.widthSlider.value),k=parseInt(g.heightSlider.value);a.onConfirmResize&&a.onConfirmResize(u,O,k),T()},F=()=>{T()};g.confirmBtn.addEventListener("click",C),g.cancelBtn.addEventListener("click",F),g.overlay.addEventListener("click",F),window.cleanupResizeDialog=()=>{g.widthSlider.removeEventListener("input",_),g.heightSlider.removeEventListener("input",B),g.confirmBtn.removeEventListener("click",C),g.cancelBtn.removeEventListener("click",F),g.overlay.removeEventListener("click",F)},w()}function T(){g.overlay.style.display="none",g.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function I(u,P,h=null){let v=P>0?u/P*100:0;n.progressBar.style.width=`${v}%`;let w=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${o.progress}</div>
        <div>${u}/${P} (${v.toFixed(1)}%)</div>
      </div>
    `;if(h&&(h.username&&(w+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${h.username}</div>
          </div>
        `),h.charges!==void 0&&(w+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${o.charges}</div>
            <div>${Math.floor(h.charges)}</div>
          </div>
        `),h.pixels!==void 0&&(w+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${o.pixels}</div>
            <div>${h.pixels.toLocaleString()}</div>
          </div>
        `),h.estimatedTime!==void 0&&h.estimatedTime>0)){let _=Math.floor(h.estimatedTime/3600),B=Math.floor(h.estimatedTime%3600/60),C=_>0?`${_}h ${B}m`:`${B}m`;w+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${o.timeRemaining}</div>
            <div>${C}</div>
          </div>
        `}n.statsArea.innerHTML=w}function Y(u){if(u>0){let P=Math.floor(u/60),h=u%60,v=P>0?`${P}m ${h}s`:`${h}s`;n.cooldownValue.textContent=v}else n.cooldownValue.textContent="--"}function $(u){u&&u.includes("\u23F3")?(n.status.textContent=u,n.status.className="status status-info"):u&&L(u,"info")}function R(u){u?(n.initBtn.disabled=!0,n.initBtn.style.opacity="0.6",n.initBtn.innerHTML=`\u2705 <span>${o.initBot} - Completado</span>`):(n.initBtn.disabled=!1,n.initBtn.style.opacity="1",n.initBtn.innerHTML=`\u{1F916} <span>${o.initBot}</span>`)}function p(u){n.initBtn.style.display=u?"flex":"none"}function f(){c.remove()}return d("\u2705 Interfaz de Auto-Image creada"),{setStatus:L,updateProgress:I,updateCooldownDisplay:Y,updateCooldownMessage:$,setInitialized:R,setInitButtonVisible:p,enableButtonsAfterInit:E,updateOverlayButtonState:S,showResizeDialog:A,closeResizeDialog:T,destroy:f}}function pe(o,a,c={}){return new Promise(t=>{let i=document.createElement("div");i.className="modal-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%",i.style.background="rgba(0,0,0,0.7)",i.style.zIndex="10001",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center";let s=document.createElement("div");s.style.background="#1a1a1a",s.style.border="2px solid #333",s.style.borderRadius="15px",s.style.padding="25px",s.style.color="#eee",s.style.minWidth="350px",s.style.maxWidth="400px",s.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",s.style.fontFamily="'Segoe UI', Roboto, sans-serif",s.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${a}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${o}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${c.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${c.save}</button>`:""}
        ${c.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${c.discard}</button>`:""}
        ${c.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${c.cancel}</button>`:""}
      </div>
    `,i.appendChild(s),document.body.appendChild(i);let m=s.querySelector(".save-btn"),r=s.querySelector(".discard-btn"),b=s.querySelector(".cancel-btn"),l=()=>{document.body.removeChild(i)};m&&m.addEventListener("click",()=>{l(),t("save")}),r&&r.addEventListener("click",()=>{l(),t("discard")}),b&&b.addEventListener("click",()=>{l(),t("cancel")}),i.addEventListener("click",n=>{n.target===i&&(l(),t("cancel"))})})}function U(){let o=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let t of o){let i=document.querySelector(t);if(i&&i.offsetParent!==null)return!0}let a=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),c=0;for(let t of a)if(t.offsetParent!==null&&t.offsetWidth>10&&t.offsetHeight>10&&(c++,c>=5))return!0;return!1}function me(){let o=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(o){let t=o.textContent.toLowerCase().includes("paint"),i=o.querySelector('svg path[d*="240-120"]');if(t||i)return o.click(),!0}let a=document.querySelectorAll("button");for(let c of a)if(c.textContent.toLowerCase().includes("paint")&&c.offsetParent!==null&&!c.disabled)return c.click(),!0;return!1}(()=>{let o="wpa-plan-overlay-style",a="wpa-plan-overlay",t={enabled:!1,boardLayer:null,mainCanvas:null,transformHost:null,canvas:null,ctx:null,items:[],minX:0,minY:0,maxX:-1,maxY:-1,nextBatchCount:0,imageWidth:null,imageHeight:null,observer:null,anchor:null,cssAnchorX:0,cssAnchorY:0};function i(){if(document.getElementById(o))return;let p=document.createElement("style");p.id=o,p.textContent=`
      .${a} {
        position: absolute !important;
        pointer-events: none !important;
        image-rendering: pixelated !important;
        z-index: 2147483646 !important;
        transform-origin: top left !important;
        opacity: 0.8 !important;
      }
    `,document.head.appendChild(p),console.log("[PLAN OVERLAY] Styles injected")}function s(){console.log("[PLAN OVERLAY] Searching for MapLibre GL transformed layer...");let p=[".maplibregl-map",".maplibregl-canvas-container",".mapboxgl-map",".mapboxgl-canvas-container"];for(let h of p){let v=document.querySelectorAll(h);for(let w of v){let _=window.getComputedStyle(w);if(console.log(`[PLAN OVERLAY] Checking MapLibre container: ${h}`,w,"transform:",_.transform),_.transform&&_.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre container:",w),w;if(w.parentElement){let B=window.getComputedStyle(w.parentElement);if(B.transform&&B.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre parent:",w.parentElement),w.parentElement}for(let B of w.children){let C=window.getComputedStyle(B);if(C.transform&&C.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre child:",B),B}}}let f=document.querySelectorAll("canvas");console.log("[PLAN OVERLAY] Found canvases:",f.length);for(let h of f){console.log("[PLAN OVERLAY] Checking canvas:",h,"rect:",h.getBoundingClientRect());let v=h.parentElement;for(;v&&v!==document.body;){let w=window.getComputedStyle(v);if(console.log("[PLAN OVERLAY] Checking parent:",v.tagName,v.className,v.id,"transform:",w.transform),w.transform&&w.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed ancestor:",v,"transform:",w.transform),v;v=v.parentElement}}let u=document.querySelector(".maplibregl-map")||document.querySelector(".maplibregl-canvas-container")||document.querySelector(".mapboxgl-map")||document.querySelector(".mapboxgl-canvas-container");if(u)return console.log("[PLAN OVERLAY] Using MapLibre container without transform:",u),u;let P=document.querySelector("canvas");if(P&&P.parentElement){let h=P.parentElement;return console.log("[PLAN OVERLAY] Using canvas parent as final fallback:",h),h}return console.log("[PLAN OVERLAY] Using document.body as absolute final fallback"),document.body}function m(){let p=document.querySelector(".maplibregl-map")||document.querySelector(".mapboxgl-map"),f=document.querySelector("div#map canvas.maplibregl-canvas")||document.querySelector("canvas.maplibregl-canvas")||document.querySelector("canvas");f&&t.mainCanvas!==f&&(t.mainCanvas=f);let u=p||t.mainCanvas&&t.mainCanvas.parentElement||s();return u&&t.boardLayer!==u&&(t.boardLayer=u,console.log("[PLAN OVERLAY] Board layer updated (mainCanvas.parentElement):",u)),t.boardLayer||document.body}function r(p){if(!p)return null;let f=p.querySelector(".maplibregl-canvas-container")||p.querySelector(".mapboxgl-canvas-container")||p.querySelector(".maplibregl-transform")||p.querySelector(".mapboxgl-transform"),u=[];f&&u.push(f);let P=p.querySelectorAll("*");for(let h of P)try{let v=window.getComputedStyle(h);v&&v.transform&&v.transform!=="none"&&u.push(h)}catch(v){}if(u.length===0){let h=window.getComputedStyle(p);return h.transform&&h.transform!=="none"?p:null}return u[u.length-1]}function b(p="init"){var u;if(!t.canvas)return;let f=t.transformHost||r(t.boardLayer);if(f){t.transformHost=f;let P=((u=f.style)==null?void 0:u.transform)||window.getComputedStyle(f).transform;if(P&&P!=="none"){t.canvas.style.transform=P,console.log("[PLAN OVERLAY] Transform copied from host:",P,`(${p})`);return}}t.canvas.style.transform="none"}function l(){if(t.canvas&&t.canvas.isConnected)return t.canvas;let p=m(),f=document.createElement("canvas");f.id="bm-canvas",f.className=`maplibregl-canvas ${a}`,f.style.position="absolute",f.style.pointerEvents="none",f.style.imageRendering="pixelated",f.style.transformOrigin="top left",f.style.zIndex="2147483646",f.hidden=!t.enabled,t.canvas=f,t.ctx=f.getContext("2d",{willReadFrequently:!1}),p.appendChild(f),t.transformHost=r(t.boardLayer),b("ensureOverlayCanvas");try{let u=t.mainCanvas||document.querySelector("div#map canvas.maplibregl-canvas")||document.querySelector("canvas.maplibregl-canvas")||document.querySelector("canvas");if(u){t.mainCanvas=u;let P=window.devicePixelRatio||1,h=Math.max(1,u.clientWidth),v=Math.max(1,u.clientHeight);t.canvas.width=h*P,t.canvas.height=v*P,t.canvas.style.width=`${h}px`,t.canvas.style.height=`${v}px`}}catch(u){console.log("[PLAN OVERLAY] Error syncing DPR size:",u)}return console.log("[PLAN OVERLAY] Canvas created and added to transformed layer:",p),console.log("[PLAN OVERLAY] Canvas element:",f),console.log("[PLAN OVERLAY] Host element rect:",p.getBoundingClientRect()),t.observer||(t.observer=new window.MutationObserver(u=>{var P;(P=t.canvas)!=null&&P.isConnected||(console.log("[PLAN OVERLAY] Canvas disconnected, re-attaching..."),m().appendChild(t.canvas),x());for(let h of u)h.type==="attributes"&&h.target===t.transformHost&&h.attributeName==="style"&&b("mutation")}),t.observer.observe(document.body,{childList:!0,subtree:!0}),t.transformHost&&t.observer.observe(t.transformHost,{attributes:!0,attributeFilter:["style"]})),f}function n(){let p=Number.POSITIVE_INFINITY,f=Number.POSITIVE_INFINITY,u=Number.NEGATIVE_INFINITY,P=Number.NEGATIVE_INFINITY;for(let h of t.items)h.globalX<p&&(p=h.globalX),h.globalY<f&&(f=h.globalY),h.globalX>u&&(u=h.globalX),h.globalY>P&&(P=h.globalY);isFinite(p)||(p=f=0,u=P=-1),t.minX=p,t.minY=f,t.maxX=u,t.maxY=P}function g(){if(!t.canvas)return;let p=2,f=2;if(t.anchor&&t.imageWidth&&t.imageHeight)p=Math.max(1,t.imageWidth|0),f=Math.max(1,t.imageHeight|0);else if(t.anchor){let u=t.anchor.tileX*3e3+(t.anchor.pxX||0),P=t.anchor.tileY*3e3+(t.anchor.pxY||0);p=Math.max(1,t.maxX-u+1|0),f=Math.max(1,t.maxY-P+1|0)}else p=Math.max(1,t.maxX-t.minX+1|0),f=Math.max(1,t.maxY-t.minY+1|0);t.canvas.width=Math.max(2,p),t.canvas.height=Math.max(2,f),t.canvas.style.width=`${Math.max(2,p)}px`,t.canvas.style.height=`${Math.max(2,f)}px`}function x(){if(!t.canvas||!t.anchor)return;let p=t.anchor.tileX*3e3+(t.anchor.pxX||0),f=t.anchor.tileY*3e3+(t.anchor.pxY||0);if(t.cssAnchorX||t.cssAnchorY)t.canvas.parentElement!==document.body&&document.body.appendChild(t.canvas),t.canvas.style.position="fixed",t.canvas.style.left=`${t.cssAnchorX}px`,t.canvas.style.top=`${t.cssAnchorY}px`,t.canvas.style.transform="none";else{let P=m();t.canvas.parentElement!==P&&P.appendChild(t.canvas),t.canvas.style.position="absolute",t.canvas.style.left=`${p}px`,t.canvas.style.top=`${f}px`,t.transformHost=r(t.boardLayer),b("applyOverlayPosition")}console.log("[PLAN OVERLAY] Positioned at anchor (global coords):",{left:p,top:f})}function S(){t.ctx&&t.ctx.clearRect(0,0,t.canvas.width,t.canvas.height)}function E(){l(),n(),g(),x();let{ctx:p,items:f,canvas:u}=t;if(S(),console.log(`[PLAN OVERLAY] Rendering ${f.length} items in ${u.width}x${u.height} canvas (anchored)`),f.length===0)return;let P=t.anchor.tileX*3e3+(t.anchor.pxX||0),h=t.anchor.tileY*3e3+(t.anchor.pxY||0);p.globalAlpha=.7;for(let v of f){let w=v.globalX-P|0,_=v.globalY-h|0;w<0||_<0||(p.fillStyle=`rgb(${v.r|0},${v.g|0},${v.b|0})`,p.fillRect(w,_,1,1))}if(t.nextBatchCount>0){let v=Math.min(t.nextBatchCount,f.length);p.globalAlpha=1;for(let w=0;w<v;w++){let _=f[w],B=_.globalX-P|0,C=_.globalY-h|0;B<0||C<0||(p.fillStyle=`rgb(${_.r|0},${_.g|0},${_.b|0})`,p.fillRect(B,C,1,1))}}}function L(p){t.enabled=!!p,l(),t.canvas.hidden=!t.enabled,console.log(`[PLAN OVERLAY] setEnabled: ${t.enabled}, canvas hidden: ${t.canvas.hidden}`),t.enabled&&t.items.length>0&&E()}function A(p){t.nextBatchCount=Math.max(0,Number(p||0)|0),t.enabled&&E()}function T(p,f){var P,h,v,w,_,B;let u=[];for(let C of p||[]){let F=0,O=0;if(typeof C.tileX=="number"&&typeof C.tileY=="number"&&typeof C.localX=="number"&&typeof C.localY=="number")F=C.tileX*3e3+C.localX,O=C.tileY*3e3+C.localY;else if(f&&typeof C.imageX=="number"&&typeof C.imageY=="number"){let be=f.tileX*3e3+(f.pxX||0),Pe=f.tileY*3e3+(f.pxY||0);F=be+C.imageX,O=Pe+C.imageY}else continue;let k=(h=(P=C.color)==null?void 0:P.r)!=null?h:0,he=(w=(v=C.color)==null?void 0:v.g)!=null?w:0,xe=(B=(_=C.color)==null?void 0:_.b)!=null?B:0;u.push({globalX:F|0,globalY:O|0,r:k,g:he,b:xe})}return console.log(`[PLAN OVERLAY] Normalized ${u.length} items, sample coords:`,u.slice(0,3).map(C=>`(${C.globalX}, ${C.globalY})`)),u}function I(p,f={}){let u=T(p,f.anchor);t.items=u,console.log(`[PLAN OVERLAY] setPlan: ${(p==null?void 0:p.length)||0} items -> ${u.length} normalized items`),typeof f.nextBatchCount=="number"&&(t.nextBatchCount=Math.max(0,f.nextBatchCount|0)),typeof f.imageWidth=="number"&&typeof f.imageHeight=="number"?(t.imageWidth=Math.max(1,f.imageWidth|0),t.imageHeight=Math.max(1,f.imageHeight|0),console.log("[PLAN OVERLAY] Image dimensions set for overlay:",t.imageWidth,"x",t.imageHeight)):(t.imageWidth=null,t.imageHeight=null),typeof f.enabled=="boolean"&&L(f.enabled),t.enabled&&E()}function Y(){t.observer&&(t.observer.disconnect(),t.observer=null),t.canvas&&t.canvas.parentNode&&t.canvas.parentNode.removeChild(t.canvas)}function $(p){if(!p)return;t.anchor={tileX:p.tileX|0,tileY:p.tileY|0,pxX:(p.pxX||0)|0,pxY:(p.pxY||0)|0},console.log("[PLAN OVERLAY] Anchor set:",t.anchor);let f=t.anchor.tileX*3e3+t.anchor.pxX,u=t.anchor.tileY*3e3+t.anchor.pxY;console.log("[PLAN OVERLAY] Anchor global coords:",{x:f,y:u}),l(),E()}function R(p,f){t.cssAnchorX=Math.round(Number(p)||0),t.cssAnchorY=Math.round(Number(f)||0),console.log("[PLAN OVERLAY] CSS anchor set:",{x:t.cssAnchorX,y:t.cssAnchorY}),t.enabled&&x()}window.__WPA_PLAN_OVERLAY__={injectStyles:i,setEnabled:L,setPlan:I,setPlanItemsFromTileList:I,setNextBatchCount:A,setAnchor:$,setAnchorCss:R,render:E,cleanup:Y,get state(){return t}}})();async function fe(){d("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),V(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let o=null,a=window.fetch,c=()=>{window.fetch!==a&&(window.fetch=a,d("\u{1F504} Fetch original restaurado")),e.positionTimeoutId&&(clearTimeout(e.positionTimeoutId),e.positionTimeoutId=null),e.cleanupObserver&&(e.cleanupObserver(),e.cleanupObserver=null),e.selectingPosition=!1};try{let t={...z},i=W("image");if(e.language=J(),!t.SITEKEY){let l=document.querySelector("*[data-sitekey]");l?(t.SITEKEY=l.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${t.SITEKEY.substring(0,20)}...`)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function s(){return d("\u{1F916} Intentando auto-inicio..."),U()?(d("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(d("\u{1F50D} Paleta no encontrada, buscando bot\xF3n Paint..."),me()?(d("\u{1F446} Bot\xF3n Paint encontrado y presionado"),await N(2e3),U()?(d("\u2705 Paleta abierta exitosamente"),!0):(d("\u274C La paleta no se abri\xF3 despu\xE9s de hacer clic"),!1)):(d("\u274C Bot\xF3n Paint no encontrado"),!1))}async function m(l=!1){d("\u{1F916} Inicializando Auto-Image..."),r.setStatus(y("image.checkingColors"),"info");let n=Q();if(n.length===0)return r.setStatus(y("image.noColorsFound"),"error"),!1;let g=await te(),x=null;g.success&&g.data.user?(x={username:g.data.user.name||"An\xF3nimo",charges:g.data.charges,maxCharges:g.data.maxCharges,pixels:g.data.user.pixelsPainted||0},o=x,e.currentCharges=g.data.charges,e.maxCharges=g.data.maxCharges||50,d(`\u{1F464} Usuario conectado: ${g.data.user.name||"An\xF3nimo"} - Cargas: ${x.charges}/${x.maxCharges} - P\xEDxeles: ${x.pixels}`)):d("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=n,e.colorsChecked=!0,r.setStatus(y("image.colorsFound",{count:n.length}),"success"),r.updateProgress(0,0,x),l||d(`\u2705 ${n.length} colores disponibles detectados`),r.setInitialized(!0),r.enableButtonsAfterInit(),r.updateOverlayButtonState();try{}catch{}return!0}let r=await ge({texts:i,onConfigChange:l=>{l.pixelsPerBatch!==void 0&&(e.pixelsPerBatch=l.pixelsPerBatch),l.useAllCharges!==void 0&&(e.useAllChargesFirst=l.useAllCharges),d("Configuraci\xF3n actualizada:",l)},onInitBot:m,onUploadImage:async l=>{try{r.setStatus(y("image.loadingImage"),"info");let n=window.URL.createObjectURL(l),g=new q(n);g.originalName=l.name,await g.load();let x=g.processImage(e.availableColors,t);e.imageData=x,e.imageData.processor=g,e.totalPixels=x.validPixelCount,e.paintedPixels=0,e.originalImageName=l.name,e.imageLoaded=!0,r.setStatus(y("image.imageLoaded",{count:x.validPixelCount}),"success"),r.updateProgress(0,x.validPixelCount,o),d(`\u2705 Imagen cargada: ${x.width}x${x.height}, ${x.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(n);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),d("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(S){d("\u26A0\uFE0F Error activando plan overlay:",S)}return!0}catch(n){return r.setStatus(y("image.imageError"),"error"),d("\u274C Error cargando imagen:",n),!1}},onSelectPosition:async()=>new Promise(l=>{r.setStatus(y("image.selectPositionAlert"),"info"),r.setStatus(y("image.waitingPosition"),"info"),e.selectingPosition=!0;let n=!1,g=()=>{window.fetch=async(E,L)=>{if(e.selectingPosition&&!n&&typeof E=="string"&&E.includes("/s0/pixel/")&&L&&L.method==="POST")try{d(`\u{1F3AF} Interceptando request de pintado: ${E}`);let A=await a(E,L);if(A.ok&&L.body){let T;try{T=JSON.parse(L.body)}catch(I){return d("Error parseando body del request:",I),A}if(T.coords&&Array.isArray(T.coords)&&T.coords.length>=2){let I=T.coords[0],Y=T.coords[1],$=E.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if($&&!n){n=!0,e.tileX=parseInt($[1]),e.tileY=parseInt($[2]),e.startPosition={x:I,y:Y},e.selectingPosition=!1;try{if(window.__WPA_PLAN_OVERLAY__){if(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:I,pxY:Y}),e.imageData&&e.imageData.pixels){let R=[];for(let p of e.imageData.pixels){let f=I+p.x,u=Y+p.y;R.push({imageX:p.x,imageY:p.y,localX:f,localY:u,tileX:e.tileX,tileY:e.tileY,color:p.targetColor,originalColor:p.originalColor})}e.remainingPixels=R,e.totalPixels=R.length,window.__WPA_PLAN_OVERLAY__.setPlan(R,{enabled:!0,nextBatchCount:e.pixelsPerBatch,imageWidth:e.imageData.width,imageHeight:e.imageData.height,anchor:{tileX:e.tileX,tileY:e.tileY,pxX:I,pxY:Y}}),d(`\u2705 Cola de p\xEDxeles generada: ${R.length} p\xEDxeles para overlay`)}d(`\u2705 Plan overlay anclado en tile(${e.tileX},${e.tileY}) local(${I},${Y})`)}}catch(R){d("Plan Overlay: error configurando ancla",R)}c(),r.setStatus(y("image.positionSet"),"success"),d(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${I},${Y})`),l(!0)}else d("\u26A0\uFE0F No se pudo extraer tile de la URL:",E)}}return A}catch(A){if(d("\u274C Error interceptando pixel:",A),!n)return c(),a(E,L)}return a(E,L)}},x=()=>{let E=document.querySelectorAll("canvas");if(E.length===0){d("\u26A0\uFE0F No se encontraron elementos canvas");return}d(`\u{1F4CA} Configurando observer para ${E.length} canvas`);let L=A=>{var I;if(!e.selectingPosition||n)return;let T=A.target;if(T&&T.tagName==="CANVAS"){d("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let $=(((I=document.querySelector("canvas"))==null?void 0:I.parentElement)||document.body).getBoundingClientRect(),R=A.clientX-$.left,p=A.clientY-$.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(R,p),d(`Plan overlay: ancla CSS establecida en (${R}, ${p})`))}catch(Y){d("Plan Overlay: error calculando ancla CSS",Y)}setTimeout(()=>{!n&&e.selectingPosition&&d("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",L),e.cleanupObserver=()=>{document.removeEventListener("click",L)}};g(),x();let S=setTimeout(()=>{e.selectingPosition&&!n&&(c(),e.cleanupObserver&&e.cleanupObserver(),r.setStatus(y("image.positionTimeout"),"error"),d("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),l(!1))},12e4);e.positionTimeoutId=S}),onStartPainting:async()=>{var l;if(d("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((l=e.remainingPixels)==null?void 0:l.length)||0}),!e.imageLoaded||!e.startPosition)return r.setStatus(y("image.missingRequirements"),"error"),d(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,e.isFirstBatch=!0,r.setStatus(y("image.startPaintingMsg"),"success");try{return await ie(e.imageData,e.startPosition,(n,g,x,S)=>{o&&(o.charges=Math.floor(e.currentCharges),S!==void 0&&(o.estimatedTime=S)),r.updateProgress(n,g,o),e.inCooldown&&e.nextBatchCooldown>0?r.updateCooldownDisplay(e.nextBatchCooldown):r.updateCooldownDisplay(0),x?x.includes("\u23F3")&&e.inCooldown?r.updateCooldownMessage(x):r.setStatus(x,"info"):r.setStatus(y("image.paintingProgress",{painted:n,total:g}),"info")},(n,g)=>{n?(r.setStatus(y("image.paintingComplete",{count:g}),"success"),le()):r.setStatus(y("image.paintingStopped"),"warning"),e.running=!1},n=>{r.setStatus(y("image.paintingError"),"error"),d("\u274C Error en proceso de pintado:",n),e.running=!1}),!0}catch(n){return r.setStatus(y("image.paintingError"),"error"),d("\u274C Error iniciando pintado:",n),e.running=!1,!1}},onStopPainting:async()=>{if(ce().hasProgress){let n=await pe(y("image.confirmSaveProgress"),y("image.saveProgressTitle"),{save:y("image.saveProgress"),discard:y("image.discardProgress"),cancel:y("image.cancel")});if(n==="save"){let g=j();g.success?r.setStatus(y("image.progressSaved",{filename:g.filename}),"success"):r.setStatus(y("image.progressSaveError",{error:g.error}),"error")}else if(n==="cancel")return!1}return H(),r.setStatus(y("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let l=j();return l.success?r.setStatus(y("image.progressSaved",{filename:l.filename}),"success"):r.setStatus(y("image.progressSaveError",{error:l.error}),"error"),l.success},onLoadProgress:async l=>{try{let n=await se(l);return n.success?(r.setStatus(y("image.progressLoaded",{painted:n.painted,total:n.total}),"success"),r.updateProgress(n.painted,n.total,o),d("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(r.setStatus(y("image.progressLoadError",{error:n.error}),"error"),!1)}catch(n){return r.setStatus(y("image.progressLoadError",{error:n.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&r.showResizeDialog(e.imageData.processor)},onConfirmResize:(l,n,g)=>{d(`\u{1F504} Redimensionando imagen de ${l.getDimensions().width}x${l.getDimensions().height} a ${n}x${g}`);try{l.resize(n,g);let x=l.processImage(e.availableColors,t);e.imageData=x,e.totalPixels=x.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},r.updateProgress(0,x.validPixelCount,o),r.setStatus(y("image.resizeSuccess",{width:n,height:g}),"success"),d(`\u2705 Imagen redimensionada: ${x.validPixelCount} p\xEDxeles v\xE1lidos`);try{if(window.__WPA_PLAN_OVERLAY__&&e.startPosition&&e.tileX!=null&&e.tileY!=null){let S=e.startPosition.x,E=e.startPosition.y,L=[];for(let A of x.pixels){let T=S+A.x,I=E+A.y;L.push({imageX:A.x,imageY:A.y,localX:T,localY:I,tileX:e.tileX,tileY:e.tileY,color:A.targetColor,originalColor:A.originalColor})}e.remainingPixels=L,e.totalPixels=L.length,window.__WPA_PLAN_OVERLAY__.setPlan(L,{enabled:!0,nextBatchCount:e.pixelsPerBatch,imageWidth:x.width,imageHeight:x.height,anchor:{tileX:e.tileX,tileY:e.tileY,pxX:S,pxY:E}})}}catch(S){d("\u26A0\uFE0F Error actualizando overlay tras redimensionar:",S)}}catch(x){d(`\u274C Error redimensionando imagen: ${x.message}`),r.setStatus(y("image.imageError"),"error")}}}),b=l=>{let{language:n}=l.detail;d(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${n}`),e.language=n};window.addEventListener("launcherLanguageChanged",b),window.addEventListener("languageChanged",b),window.addEventListener("beforeunload",()=>{c(),H(),r.destroy(),window.removeEventListener("launcherLanguageChanged",b),window.removeEventListener("languageChanged",b),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),d("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{r.setStatus(y("image.autoInitializing"),"info"),d("\u{1F916} Intentando auto-inicio..."),await s()?(r.setStatus(y("image.autoInitSuccess"),"success"),d("\u2705 Auto-inicio exitoso"),r.setInitButtonVisible(!1),await m(!0)&&d("\u{1F680} Bot auto-iniciado completamente")):(r.setStatus(y("image.autoInitFailed"),"warning"),d("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(l){d("\u274C Error en auto-inicio:",l),r.setStatus(y("image.manualInitRequired"),"warning")}},1e3)}catch(t){throw d("\u274C Error inicializando Auto-Image:",t),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),t}}(()=>{"use strict";var o,a;if((o=window.__wplaceBot)!=null&&o.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((a=window.__wplaceBot)!=null&&a.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,fe().catch(c=>{console.error("[BOT] Error en Auto-Image:",c),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
