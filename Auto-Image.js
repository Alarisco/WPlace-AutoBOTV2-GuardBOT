/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-17T16:34:05.925Z */
(()=>{var d=(...i)=>console.log("[WPA-UI]",...i);var Z={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando..."},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var G={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout. Retrying..."},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var K={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 Timeout serveur. Nouvel essai..."},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var D={es:Z,en:G,fr:K},X="es",M=D[X];function be(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return D[a]?a:"es"}function Pe(){return null}function q(){let i=Pe(),a=be(),l="es";return i&&D[i]?l=i:a&&D[a]&&(l=a),ye(l),l}function ye(i){if(!D[i]){console.warn(`Idioma '${i}' no disponible. Usando '${X}'`);return}X=i,M=D[i],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:i,translations:M}}))}function J(){return X}function b(i,a={}){let l=i.split("."),t=M;for(let o of l)if(t&&typeof t=="object"&&o in t)t=t[o];else return console.warn(`Clave de traducci\xF3n no encontrada: '${i}'`),i;return typeof t!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${i}'`),i):ve(t,a)}function ve(i,a){return!a||Object.keys(a).length===0?i:i.replace(/\{(\w+)\}/g,(l,t)=>a[t]!==void 0?a[t]:l)}function W(i){return M[i]?M[i]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${i}'`),{})}q();var $={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:$.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:$.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:50,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null,retryCount:0};var V=class{constructor(a){this.imageSrc=a,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((a,l)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),a()},this.img.onerror=l,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(a,l){let t=document.createElement("canvas");return t.width=a,t.height=l,t.getContext("2d").drawImage(this.img,0,0,a,l),this.canvas.width=a,this.canvas.height=l,this.ctx.drawImage(t,0,0),this.getPixelData()}generatePreview(a,l){return this.previewCanvas.width=a,this.previewCanvas.height=l,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,a,l),this.previewCanvas.toDataURL()}getImageData(){let{width:a,height:l}=this.getDimensions(),t=this.getPixelData();return{width:a,height:l,pixels:t,originalName:this.originalName||"image.png"}}processImage(a,l){let{width:t,height:o}=this.getDimensions(),s=this.getPixelData(),p=[],r=0;for(let P=0;P<o;P++)for(let c=0;c<t;c++){let n=(P*t+c)*4,u=s[n],h=s[n+1],A=s[n+2],S=s[n+3];if(S<l.TRANSPARENCY_THRESHOLD||u>l.WHITE_THRESHOLD&&h>l.WHITE_THRESHOLD&&A>l.WHITE_THRESHOLD)continue;let C=this.findClosestColor({r:u,g:h,b:A},a);C&&(p.push({x:c,y:P,originalColor:{r:u,g:h,b:A,alpha:S},targetColor:C}),r++)}return{width:t,height:o,pixels:p,validPixelCount:r,originalName:this.originalName||"image.png"}}findClosestColor(a,l){if(!l||l.length===0)return null;let t=null,o=1/0;for(let s of l){let p=Math.sqrt(Math.pow(a.r-s.r,2)+Math.pow(a.g-s.g,2)+Math.pow(a.b-s.b,2));p<o&&(o=p,t=s)}return t}};function Q(){d("\u{1F3A8} Detectando colores disponibles...");let i=document.querySelectorAll('[id^="color-"]'),a=[];for(let l of i){if(l.querySelector("svg"))continue;let t=l.id.replace("color-",""),o=parseInt(t);if(o===0||o===5)continue;let s=l.style.backgroundColor;if(s){let p=s.match(/\d+/g);if(p&&p.length>=3){let r={r:parseInt(p[0]),g:parseInt(p[1]),b:parseInt(p[2])};a.push({id:o,element:l,...r}),d(`Color detectado: id=${o}, rgb(${r.r},${r.g},${r.b})`)}}}return d(`\u2705 ${a.length} colores disponibles detectados`),a}var z=i=>new Promise(a=>setTimeout(a,i));var ee="https://backend.wplace.live";async function te(){var i,a,l;try{let t=await fetch(`${ee}/me`,{credentials:"include"}).then(r=>r.json()),o=t||null,s=(t==null?void 0:t.charges)||{},p={count:(i=s.count)!=null?i:0,max:(a=s.max)!=null?a:0,cooldownMs:(l=s.cooldownMs)!=null?l:3e4};return{success:!0,data:{user:o,charges:p.count,maxCharges:p.max,chargeRegen:p.cooldownMs}}}catch(t){return{success:!1,error:t.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function ne(i,a,l,t,o){try{let s=JSON.stringify({colors:t,coords:l,t:o}),p=await fetch(`${ee}/s0/pixel/${i}/${a}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:s}),r=null;try{r=await p.json()}catch{r={}}return{status:p.status,json:r,success:p.ok,painted:(r==null?void 0:r.painted)||0}}catch(s){return{status:0,json:{error:s.message},success:!1,painted:0}}}var ae=!1;async function we(){if(!(ae||window.turnstile))return new Promise((i,a)=>{let l=document.createElement("script");l.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",l.async=!0,l.defer=!0,l.onload=()=>{ae=!0,i()},l.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(l)})}async function Ce(i,a="paint"){var l;if(await we(),typeof((l=window.turnstile)==null?void 0:l.execute)=="function")try{let t=await window.turnstile.execute(i,{action:a});if(t&&t.length>20)return t}catch{}return await new Promise(t=>{let o=document.createElement("div");o.style.position="fixed",o.style.left="-9999px",document.body.appendChild(o),window.turnstile.render(o,{sitekey:i,callback:s=>{document.body.removeChild(o),t(s)}})})}async function ie(i){return Ce(i,"paint")}async function oe(i,a,l,t,o){let{width:s,height:p}=i,{x:r,y:P}=a;if(d(`Iniciando pintado: imagen(${s}x${p}) inicio LOCAL(${r},${P}) tile(${e.tileX},${e.tileY})`),!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0){d("Generando cola de p\xEDxeles..."),e.remainingPixels=Le(i,a,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(c=>{let n=c.imageY*s+c.imageX,u=e.lastPosition.y*s+e.lastPosition.x;return n>=u})),d(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),e.startPosition&&e.tileX!==void 0&&e.tileY!==void 0&&window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y}),window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch}),d(`\u2705 Plan overlay actualizado con ${e.remainingPixels.length} p\xEDxeles en cola`))}catch(c){d("\u26A0\uFE0F Error actualizando plan overlay:",c)}}try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let c=Math.floor(e.currentCharges),n;if(e.isFirstBatch&&e.useAllChargesFirst&&c>0?(n=Math.min(c,e.remainingPixels.length),e.isFirstBatch=!1,d(`Primera pasada: usando ${n} cargas de ${c} disponibles`)):n=Math.min(e.pixelsPerBatch,e.remainingPixels.length),c<n){d(`Cargas insuficientes: ${c}/${n} necesarias`),await Se(n-c,l),c=Math.floor(e.currentCharges),e.isFirstBatch||(n=Math.min(e.pixelsPerBatch,e.remainingPixels.length,c));continue}let u=e.remainingPixels.splice(0,n);d(`Pintando lote de ${u.length} p\xEDxeles...`);try{window.__WPA_PLAN_OVERLAY__&&window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch})}catch(A){d("\u26A0\uFE0F Error actualizando plan overlay durante pintado:",A)}let h=await Ae(u,l);if(h.success&&h.painted>0){if(e.paintedPixels+=h.painted,e.currentCharges=Math.max(0,e.currentCharges-h.painted),d(`Cargas despu\xE9s del lote: ${e.currentCharges.toFixed(1)} (consumidas: ${h.painted})`),u.length>0){let C=u[u.length-1];e.lastPosition={x:C.imageX,y:C.imageY}}d(`Lote exitoso: ${h.painted}/${u.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`);let A=_e(),S=(e.paintedPixels/e.totalPixels*100).toFixed(1),L=b("image.passCompleted",{painted:h.painted,percent:S,current:e.paintedPixels,total:e.totalPixels});l&&l(e.paintedPixels,e.totalPixels,L,A),await z(2e3)}else h.shouldContinue?d("Lote fall\xF3 despu\xE9s de todos los reintentos, continuando con siguiente lote..."):(e.remainingPixels.unshift(...u),d("Lote fall\xF3: reintentando en 5 segundos..."),await z(5e3));await z(500)}if(e.stopFlag)d(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),t&&t(!1,e.paintedPixels);else{d(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[];try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),d("\u2705 Plan overlay limpiado al completar pintado"))}catch(c){d("\u26A0\uFE0F Error limpiando plan overlay:",c)}t&&t(!0,e.paintedPixels)}}catch(c){d("Error en proceso de pintado:",c),o&&o(c)}}async function Ee(i){var a;try{if(!i||i.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let l=[],t=[],o=null,s=null;for(let P of i)l.push(P.localX,P.localY),t.push(P.color.id||P.color.value||1),o===null&&(o=P.tileX,s=P.tileY);let p=await ie($.SITEKEY),r=await ne(o,s,l,t,p);return r.status===200?{success:!0,painted:r.painted,response:r.json}:{success:!1,painted:0,error:((a=r.json)==null?void 0:a.message)||`HTTP ${r.status}`,status:r.status}}catch(l){return d("Error en paintPixelBatch:",l),{success:!1,painted:0,error:l.message}}}async function Ae(i,a){for(let s=1;s<=5;s++)try{let p=await Ee(i);if(p.success)return e.retryCount=0,p;if(e.retryCount=s,s<5){let r=3e3*Math.pow(2,s-1),P=Math.round(r/1e3),c;p.status===0||p.status==="NetworkError"?c=b("image.networkError"):p.status>=500?c=b("image.serverError"):p.status===408?c=b("image.timeoutError"):c=b("image.retryAttempt",{attempt:s,maxAttempts:5,delay:P}),a&&a(e.paintedPixels,e.totalPixels,c),d(`Reintento ${s}/5 despu\xE9s de ${P}s. Error: ${p.error}`),await z(r)}}catch(p){if(d(`Error en intento ${s}:`,p),e.retryCount=s,s<5){let r=3e3*Math.pow(2,s-1),P=Math.round(r/1e3),c=b("image.retryError",{attempt:s,maxAttempts:5,delay:P});a&&a(e.paintedPixels,e.totalPixels,c),await z(r)}}e.retryCount=5;let o=b("image.retryFailed",{maxAttempts:5});return a&&a(e.paintedPixels,e.totalPixels,o),d("Fall\xF3 despu\xE9s de 5 intentos, continuando con siguiente lote"),{success:!1,painted:0,error:"Fall\xF3 despu\xE9s de 5 intentos",shouldContinue:!0}}async function Se(i,a){let t=$.CHARGE_REGEN_MS*i+5e3;if(d(`Esperando ${Math.round(t/1e3)}s para obtener ${i} cargas`),e.inCooldown=!0,e.cooldownEndTime=Date.now()+t,e.nextBatchCooldown=Math.round(t/1e3),a){let o=Math.floor(t/6e4),s=Math.floor(t%6e4/1e3),p=o>0?`${o}m ${s}s`:`${s}s`,r=b("image.waitingChargesRegen",{current:Math.floor(e.currentCharges),needed:i,time:p});a(e.paintedPixels,e.totalPixels,r)}for(let o=Math.round(t/1e3);o>0&&!e.stopFlag;o--){if(e.nextBatchCooldown=o,a&&(o%5===0||o<=10||o===Math.round(t/1e3))){let s=Math.floor(o/60),p=o%60,r=s>0?`${s}m ${p}s`:`${p}s`,P=b("image.waitingChargesCountdown",{current:Math.floor(e.currentCharges),needed:i,time:r});a(e.paintedPixels,e.totalPixels,P)}await z(1e3)}e.inCooldown=!1,e.nextBatchCooldown=0,e.currentCharges=Math.min(e.maxCharges||50,e.currentCharges+t/$.CHARGE_REGEN_MS)}function Le(i,a,l,t){let{pixels:o}=i,{x:s,y:p}=a,r=[];for(let P of o){let c=s+P.x,n=p+P.y;r.push({imageX:P.x,imageY:P.y,localX:c,localY:n,tileX:l,tileY:t,color:P.targetColor,originalColor:P.originalColor})}return d(`Cola de p\xEDxeles generada: ${r.length} p\xEDxeles para pintar`),r}function _e(){if(!e.remainingPixels||e.remainingPixels.length===0)return 0;let i=e.remainingPixels.length,a=e.pixelsPerBatch,l=$.CHARGE_REGEN_MS/1e3,t=Math.ceil(i/a),o=a*l,s=(t-1)*o,p=t*2;return Math.ceil(s+p)}function H(){e.stopFlag=!0,e.running=!1,d("\u{1F6D1} Deteniendo proceso de pintado...")}function j(i=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let a={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch,useAllChargesFirst:e.useAllChargesFirst,isFirstBatch:e.isFirstBatch,maxCharges:e.maxCharges},colors:e.availableColors.map(r=>({id:r.id,r:r.r,g:r.g,b:r.b})),remainingPixels:e.remainingPixels||[]},l=JSON.stringify(a,null,2),t=new window.Blob([l],{type:"application/json"}),o=i||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,s=window.URL.createObjectURL(t),p=document.createElement("a");return p.href=s,p.download=o,document.body.appendChild(p),p.click(),document.body.removeChild(p),window.URL.revokeObjectURL(s),d(`\u2705 Progreso guardado: ${o}`),{success:!0,filename:o}}catch(a){return d("\u274C Error guardando progreso:",a),{success:!1,error:a.message}}}async function se(i){return new Promise(a=>{try{let l=new window.FileReader;l.onload=t=>{try{let o=JSON.parse(t.target.result),p=["imageData","progress","position","colors"].filter(r=>!(r in o));if(p.length>0)throw new Error(`Campos requeridos faltantes: ${p.join(", ")}`);if(e.availableColors.length>0){let r=o.colors.map(n=>n.id),P=e.availableColors.map(n=>n.id);r.filter(n=>P.includes(n)).length<r.length*.8&&d("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...o.imageData,pixels:[]},e.paintedPixels=o.progress.paintedPixels,e.totalPixels=o.progress.totalPixels,o.progress.lastPosition?e.lastPosition=o.progress.lastPosition:o.position.lastX!==void 0&&o.position.lastY!==void 0&&(e.lastPosition={x:o.position.lastX,y:o.position.lastY}),o.position.startPosition?e.startPosition=o.position.startPosition:o.position.startX!==void 0&&o.position.startY!==void 0&&(e.startPosition={x:o.position.startX,y:o.position.startY}),e.tileX=o.position.tileX,e.tileY=o.position.tileY,e.originalImageName=o.imageData.originalName,e.remainingPixels=o.remainingPixels||o.progress.remainingPixels||[];try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),e.startPosition&&e.tileX!==void 0&&e.tileY!==void 0&&(window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:e.startPosition.x,pxY:e.startPosition.y}),d(`\u2705 Plan overlay anclado con posici\xF3n cargada: tile(${e.tileX},${e.tileY}) local(${e.startPosition.x},${e.startPosition.y})`)),window.__WPA_PLAN_OVERLAY__.setPlan(e.remainingPixels,{enabled:!0,nextBatchCount:e.pixelsPerBatch}),d(`\u2705 Plan overlay activado con ${e.remainingPixels.length} p\xEDxeles restantes`))}catch(r){d("\u26A0\uFE0F Error activando plan overlay al cargar progreso:",r)}o.config&&(e.pixelsPerBatch=o.config.pixelsPerBatch||e.pixelsPerBatch,e.useAllChargesFirst=o.config.useAllChargesFirst!==void 0?o.config.useAllChargesFirst:e.useAllChargesFirst,e.isFirstBatch=o.config.isFirstBatch!==void 0?o.config.isFirstBatch:!0,e.maxCharges=o.config.maxCharges||e.maxCharges),e.imageLoaded=!0,e.colorsChecked=!0,d(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),a({success:!0,data:o,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(o){d("\u274C Error parseando archivo de progreso:",o),a({success:!1,error:o.message})}},l.onerror=()=>{let t="Error leyendo archivo";d("\u274C",t),a({success:!1,error:t})},l.readAsText(i)}catch(l){d("\u274C Error cargando progreso:",l),a({success:!1,error:l.message})}})}function le(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,e.isFirstBatch=!0,e.nextBatchCooldown=0,d("\u{1F9F9} Progreso limpiado")}function re(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function ce(){return{hasProgress:re(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:re()}}function de(i=null){let a=document.createElement("div");i&&(a.id=i),a.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let l=a.attachShadow({mode:"open"});return document.body.appendChild(a),{host:a,root:l}}function ue(i,a){let l=0,t=0,o=0,s=0;i.style.cursor="move",i.addEventListener("mousedown",p);function p(c){c.target.closest(".header-btn, .wplace-header-btn")||(c.preventDefault(),o=c.clientX,s=c.clientY,document.addEventListener("mouseup",P),document.addEventListener("mousemove",r))}function r(c){c.preventDefault(),l=o-c.clientX,t=s-c.clientY,o=c.clientX,s=c.clientY,a.style.top=a.offsetTop-t+"px",a.style.left=a.offsetLeft-l+"px"}function P(){document.removeEventListener("mouseup",P),document.removeEventListener("mousemove",r)}}async function ge({texts:i,...a}){if(d("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let m=document.createElement("link");m.rel="stylesheet",m.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(m),d("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:l,root:t}=de(),o=document.createElement("style");o.textContent=`
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
  `,t.appendChild(o);let s=document.createElement("div");s.className="container",s.innerHTML=`
    <div class="header">
      <div class="header-title">
        \u{1F5BC}\uFE0F
        <span>${i.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          \u2699\uFE0F
        </button>
        <button class="header-btn minimize-btn" title="${i.minimize}">
          \u2796
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${i.batchSize}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="20">
        </div>
        <div class="config-item">
          <label>
            <input class="config-checkbox use-all-charges" type="checkbox" checked>
            ${i.useAllCharges}
          </label>
        </div>
      </div>
      
      <!-- Configuraci\xF3n visible en la interfaz principal -->
      <div class="main-config">
        <div class="config-row">
          <div class="config-label">
            \u{1F3AF} ${i.batchSize}:
            <span class="batch-value">20</span>
          </div>
          <div class="config-label">
            \u23F1\uFE0F ${i.nextBatchTime}:
            <span class="cooldown-value">--</span>
          </div>
        </div>
      </div>
      
      <div class="controls">
        <button class="btn btn-primary init-btn">
          \u{1F916}
          <span>${i.initBot}</span>
        </button>
          <button class="btn btn-primary plan-overlay-toggle-btn" disabled>
            \uFE0F
            <span>${i.overlayOff||"Overlay: OFF"}</span>
          </button>
        <button class="btn btn-upload upload-btn" disabled>
          \u{1F4E4}
          <span>${i.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          \u{1F4C1}
          <span>${i.loadProgress}</span>
        </button>
        <button class="btn btn-primary resize-btn" disabled>
          \u{1F504}
          <span>${i.resizeImage}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          \u{1F3AF}
          <span>${i.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          \u25B6\uFE0F
          <span>${i.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          \u23F9\uFE0F
          <span>${i.stopPainting}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label">\u2139\uFE0F ${i.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${i.waitingInit}
      </div>
    </div>
  `,t.appendChild(s);let p=document.createElement("input");p.type="file",p.accept="image/png,image/jpeg",p.style.display="none",t.appendChild(p);let r=document.createElement("input");r.type="file",r.accept=".json",r.style.display="none",t.appendChild(r);let P=document.createElement("div");P.className="resize-overlay",t.appendChild(P);let c=document.createElement("div");c.className="resize-container",c.innerHTML=`
    <h3>${i.resizeImage}</h3>
    <div class="resize-controls">
      <label>
        ${i.width}: <span class="width-value">0</span>px
        <input type="range" class="resize-slider width-slider" min="10" max="500" value="100">
      </label>
      <label>
        ${i.height}: <span class="height-value">0</span>px
        <input type="range" class="resize-slider height-slider" min="10" max="500" value="100">
      </label>
      <label>
        <input type="checkbox" class="keep-aspect" checked>
        ${i.keepAspect}
      </label>
      <img class="resize-preview" src="" alt="Preview">
      <div class="resize-buttons">
        <button class="btn btn-primary confirm-resize">
          \u2705
          <span>${i.apply}</span>
        </button>
        <button class="btn btn-stop cancel-resize">
          \u274C
          <span>${i.cancel}</span>
        </button>
      </div>
    </div>
  `,t.appendChild(c);let n={header:s.querySelector(".header"),configBtn:s.querySelector(".config-btn"),minimizeBtn:s.querySelector(".minimize-btn"),configPanel:s.querySelector(".config-panel"),pixelsPerBatch:s.querySelector(".pixels-per-batch"),useAllCharges:s.querySelector(".use-all-charges"),batchValue:s.querySelector(".batch-value"),cooldownValue:s.querySelector(".cooldown-value"),initBtn:s.querySelector(".init-btn"),uploadBtn:s.querySelector(".upload-btn"),loadProgressBtn:s.querySelector(".load-progress-btn"),resizeBtn:s.querySelector(".resize-btn"),selectPosBtn:s.querySelector(".select-pos-btn"),startBtn:s.querySelector(".start-btn"),stopBtn:s.querySelector(".stop-btn"),planOverlayToggleBtn:s.querySelector(".plan-overlay-toggle-btn"),progressBar:s.querySelector(".progress-bar"),statsArea:s.querySelector(".stats-area"),status:s.querySelector(".status"),content:s.querySelector(".content")},u={overlay:P,container:c,widthSlider:c.querySelector(".width-slider"),heightSlider:c.querySelector(".height-slider"),widthValue:c.querySelector(".width-value"),heightValue:c.querySelector(".height-value"),keepAspect:c.querySelector(".keep-aspect"),preview:c.querySelector(".resize-preview"),confirmBtn:c.querySelector(".confirm-resize"),cancelBtn:c.querySelector(".cancel-resize")},h={minimized:!1,configVisible:!1};ue(n.header,s),n.minimizeBtn.addEventListener("click",()=>{h.minimized=!h.minimized,h.minimized?(s.classList.add("minimized"),n.minimizeBtn.innerHTML="\u{1F53C}"):(s.classList.remove("minimized"),n.minimizeBtn.innerHTML="\u{1F53D}")}),n.configBtn.addEventListener("click",()=>{h.configVisible=!h.configVisible,h.configVisible?(n.configPanel.classList.add("visible"),n.configBtn.innerHTML="\u274C"):(n.configPanel.classList.remove("visible"),n.configBtn.innerHTML="\u2699\uFE0F")}),n.pixelsPerBatch.addEventListener("change",()=>{let m=parseInt(n.pixelsPerBatch.value)||20;n.batchValue.textContent=m,a.onConfigChange&&a.onConfigChange({pixelsPerBatch:m})}),n.useAllCharges.addEventListener("change",()=>{a.onConfigChange&&a.onConfigChange({useAllCharges:n.useAllCharges.checked})});function A(){if(!window.__WPA_PLAN_OVERLAY__||!n.planOverlayToggleBtn)return;let v=window.__WPA_PLAN_OVERLAY__.state.enabled?i.overlayOn||"Overlay: ON":i.overlayOff||"Overlay: OFF";n.planOverlayToggleBtn.querySelector("span").textContent=v}function S(){n.uploadBtn.disabled=!1,n.loadProgressBtn.disabled=!1,n.planOverlayToggleBtn.disabled=!1,A()}n.initBtn.addEventListener("click",async()=>{n.initBtn.disabled=!0,a.onInitBot&&await a.onInitBot()&&S(),n.initBtn.disabled=!1}),n.uploadBtn.addEventListener("click",()=>{p.click()}),p.addEventListener("change",async()=>{p.files.length>0&&a.onUploadImage&&await a.onUploadImage(p.files[0])&&(n.selectPosBtn.disabled=!1,n.resizeBtn.disabled=!1)}),n.loadProgressBtn.addEventListener("click",()=>{r.click()}),r.addEventListener("change",async()=>{r.files.length>0&&a.onLoadProgress&&await a.onLoadProgress(r.files[0])&&(n.selectPosBtn.disabled=!1,n.startBtn.disabled=!1,n.resizeBtn.disabled=!1)}),n.resizeBtn.addEventListener("click",()=>{a.onResizeImage&&a.onResizeImage()}),n.selectPosBtn.addEventListener("click",async()=>{a.onSelectPosition&&(n.selectPosBtn.disabled=!0,await a.onSelectPosition()&&(n.startBtn.disabled=!1),n.selectPosBtn.disabled=!1)}),n.planOverlayToggleBtn.addEventListener("click",()=>{if(!window.__WPA_PLAN_OVERLAY__)return;window.__WPA_PLAN_OVERLAY__.injectStyles();let m=!window.__WPA_PLAN_OVERLAY__.state.enabled;window.__WPA_PLAN_OVERLAY__.setEnabled(m),A()}),n.startBtn.addEventListener("click",async()=>{a.onStartPainting&&(n.startBtn.disabled=!0,n.stopBtn.disabled=!1,await a.onStartPainting()||(n.startBtn.disabled=!1,n.stopBtn.disabled=!0))}),n.stopBtn.addEventListener("click",async()=>{a.onStopPainting&&await a.onStopPainting()&&(n.startBtn.disabled=!1,n.stopBtn.disabled=!0)});function L(m,v="default"){n.status.textContent=m,n.status.className=`status status-${v}`,n.status.style.animation="none",n.status.offsetWidth,n.status.style.animation="slideIn 0.3s ease-out"}function C(m){let{width:v,height:y}=m.getDimensions(),_=v/y;u.widthSlider.value=v,u.heightSlider.value=y,u.widthValue.textContent=v,u.heightValue.textContent=y,u.preview.src=m.img.src,u.overlay.style.display="block",u.container.style.display="block";let I=()=>{let Y=parseInt(u.widthSlider.value),O=parseInt(u.heightSlider.value);u.widthValue.textContent=Y,u.heightValue.textContent=O,u.preview.src=m.generatePreview(Y,O)},w=()=>{if(u.keepAspect.checked){let Y=parseInt(u.widthSlider.value),O=Math.round(Y/_);u.heightSlider.value=O}I()},k=()=>{if(u.keepAspect.checked){let Y=parseInt(u.heightSlider.value),O=Math.round(Y*_);u.widthSlider.value=O}I()};u.widthSlider.addEventListener("input",w),u.heightSlider.addEventListener("input",k);let N=()=>{let Y=parseInt(u.widthSlider.value),O=parseInt(u.heightSlider.value);a.onConfirmResize&&a.onConfirmResize(m,Y,O),B()},F=()=>{B()};u.confirmBtn.addEventListener("click",N),u.cancelBtn.addEventListener("click",F),u.overlay.addEventListener("click",F),window.cleanupResizeDialog=()=>{u.widthSlider.removeEventListener("input",w),u.heightSlider.removeEventListener("input",k),u.confirmBtn.removeEventListener("click",N),u.cancelBtn.removeEventListener("click",F),u.overlay.removeEventListener("click",F)},I()}function B(){u.overlay.style.display="none",u.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function T(m,v,y=null){let _=v>0?m/v*100:0;n.progressBar.style.width=`${_}%`;let I=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${i.progress}</div>
        <div>${m}/${v} (${_.toFixed(1)}%)</div>
      </div>
    `;if(y&&(y.username&&(I+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${y.username}</div>
          </div>
        `),y.charges!==void 0&&(I+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${i.charges}</div>
            <div>${Math.floor(y.charges)}</div>
          </div>
        `),y.pixels!==void 0&&(I+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${i.pixels}</div>
            <div>${y.pixels.toLocaleString()}</div>
          </div>
        `),y.estimatedTime!==void 0&&y.estimatedTime>0)){let w=Math.floor(y.estimatedTime/3600),k=Math.floor(y.estimatedTime%3600/60),N=w>0?`${w}h ${k}m`:`${k}m`;I+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${i.timeRemaining}</div>
            <div>${N}</div>
          </div>
        `}n.statsArea.innerHTML=I}function R(m){if(m>0){let v=Math.floor(m/60),y=m%60,_=v>0?`${v}m ${y}s`:`${y}s`;n.cooldownValue.textContent=_}else n.cooldownValue.textContent="--"}function f(m){m&&m.includes("\u23F3")?(n.status.textContent=m,n.status.className="status status-info"):m&&L(m,"info")}function g(m){m?(n.initBtn.disabled=!0,n.initBtn.style.opacity="0.6",n.initBtn.innerHTML=`\u2705 <span>${i.initBot} - Completado</span>`):(n.initBtn.disabled=!1,n.initBtn.style.opacity="1",n.initBtn.innerHTML=`\u{1F916} <span>${i.initBot}</span>`)}function x(m){n.initBtn.style.display=m?"flex":"none"}function E(){l.remove()}return d("\u2705 Interfaz de Auto-Image creada"),{setStatus:L,updateProgress:T,updateCooldownDisplay:R,updateCooldownMessage:f,setInitialized:g,setInitButtonVisible:x,enableButtonsAfterInit:S,updateOverlayButtonState:A,showResizeDialog:C,closeResizeDialog:B,destroy:E}}function pe(i,a,l={}){return new Promise(t=>{let o=document.createElement("div");o.className="modal-overlay",o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.height="100%",o.style.background="rgba(0,0,0,0.7)",o.style.zIndex="10001",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center";let s=document.createElement("div");s.style.background="#1a1a1a",s.style.border="2px solid #333",s.style.borderRadius="15px",s.style.padding="25px",s.style.color="#eee",s.style.minWidth="350px",s.style.maxWidth="400px",s.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",s.style.fontFamily="'Segoe UI', Roboto, sans-serif",s.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${a}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${i}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${l.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${l.save}</button>`:""}
        ${l.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${l.discard}</button>`:""}
        ${l.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${l.cancel}</button>`:""}
      </div>
    `,o.appendChild(s),document.body.appendChild(o);let p=s.querySelector(".save-btn"),r=s.querySelector(".discard-btn"),P=s.querySelector(".cancel-btn"),c=()=>{document.body.removeChild(o)};p&&p.addEventListener("click",()=>{c(),t("save")}),r&&r.addEventListener("click",()=>{c(),t("discard")}),P&&P.addEventListener("click",()=>{c(),t("cancel")}),o.addEventListener("click",n=>{n.target===o&&(c(),t("cancel"))})})}function U(){let i=['[data-testid="color-picker"]',".color-picker",".palette",'[class*="color"][class*="picker"]','[class*="palette"]'];for(let t of i){let o=document.querySelector(t);if(o&&o.offsetParent!==null)return!0}let a=document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]'),l=0;for(let t of a)if(t.offsetParent!==null&&t.offsetWidth>10&&t.offsetHeight>10&&(l++,l>=5))return!0;return!1}function me(){let i=document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");if(i){let t=i.textContent.toLowerCase().includes("paint"),o=i.querySelector('svg path[d*="240-120"]');if(t||o)return i.click(),!0}let a=document.querySelectorAll("button");for(let l of a)if(l.textContent.toLowerCase().includes("paint")&&l.offsetParent!==null&&!l.disabled)return l.click(),!0;return!1}(()=>{let i="wpa-plan-overlay-style",a="wpa-plan-overlay",t={enabled:!1,boardLayer:null,mainCanvas:null,canvas:null,ctx:null,items:[],minX:0,minY:0,maxX:-1,maxY:-1,nextBatchCount:0,imageWidth:null,imageHeight:null,observer:null,anchor:null,cssAnchorX:0,cssAnchorY:0};function o(){if(document.getElementById(i))return;let f=document.createElement("style");f.id=i,f.textContent=`
      .${a} {
        position: absolute !important;
        pointer-events: none !important;
        image-rendering: pixelated !important;
        z-index: 2147483646 !important;
        transform-origin: top left !important;
        opacity: 0.8 !important;
      }
    `,document.head.appendChild(f),console.log("[PLAN OVERLAY] Styles injected")}function s(){console.log("[PLAN OVERLAY] Searching for MapLibre GL transformed layer...");let f=[".maplibregl-map",".maplibregl-canvas-container",".mapboxgl-map",".mapboxgl-canvas-container"];for(let m of f){let v=document.querySelectorAll(m);for(let y of v){let _=window.getComputedStyle(y);if(console.log(`[PLAN OVERLAY] Checking MapLibre container: ${m}`,y,"transform:",_.transform),_.transform&&_.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre container:",y),y;if(y.parentElement){let I=window.getComputedStyle(y.parentElement);if(I.transform&&I.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre parent:",y.parentElement),y.parentElement}for(let I of y.children){let w=window.getComputedStyle(I);if(w.transform&&w.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed MapLibre child:",I),I}}}let g=document.querySelectorAll("canvas");console.log("[PLAN OVERLAY] Found canvases:",g.length);for(let m of g){console.log("[PLAN OVERLAY] Checking canvas:",m,"rect:",m.getBoundingClientRect());let v=m.parentElement;for(;v&&v!==document.body;){let y=window.getComputedStyle(v);if(console.log("[PLAN OVERLAY] Checking parent:",v.tagName,v.className,v.id,"transform:",y.transform),y.transform&&y.transform!=="none")return console.log("[PLAN OVERLAY] \u2705 Found transformed ancestor:",v,"transform:",y.transform),v;v=v.parentElement}}let x=document.querySelector(".maplibregl-map")||document.querySelector(".maplibregl-canvas-container")||document.querySelector(".mapboxgl-map")||document.querySelector(".mapboxgl-canvas-container");if(x)return console.log("[PLAN OVERLAY] Using MapLibre container without transform:",x),x;let E=document.querySelector("canvas");if(E&&E.parentElement){let m=E.parentElement;return console.log("[PLAN OVERLAY] Using canvas parent as final fallback:",m),m}return console.log("[PLAN OVERLAY] Using document.body as absolute final fallback"),document.body}function p(){let f=document.querySelector(".maplibregl-map")||document.querySelector(".mapboxgl-map"),g=document.querySelector("div#map canvas.maplibregl-canvas")||document.querySelector("canvas.maplibregl-canvas")||document.querySelector("canvas");g&&t.mainCanvas!==g&&(t.mainCanvas=g);let x=f||t.mainCanvas&&t.mainCanvas.parentElement||s();return x&&t.boardLayer!==x&&(t.boardLayer=x,console.log("[PLAN OVERLAY] Board layer updated (mainCanvas.parentElement):",x)),t.boardLayer||document.body}function r(){if(t.canvas&&t.canvas.isConnected)return t.canvas;let f=p(),g=document.createElement("canvas");g.id="bm-canvas",g.className=`maplibregl-canvas ${a}`,g.style.position="absolute",g.style.pointerEvents="none",g.style.imageRendering="pixelated",g.style.transformOrigin="top left",g.style.zIndex="2147483646",g.hidden=!t.enabled,t.canvas=g,t.ctx=g.getContext("2d",{willReadFrequently:!1}),f.appendChild(g);try{let x=t.mainCanvas||document.querySelector("div#map canvas.maplibregl-canvas")||document.querySelector("canvas.maplibregl-canvas")||document.querySelector("canvas");if(x){t.mainCanvas=x;let E=window.devicePixelRatio||1,m=Math.max(1,x.clientWidth),v=Math.max(1,x.clientHeight);t.canvas.width=m*E,t.canvas.height=v*E,t.canvas.style.width=`${m}px`,t.canvas.style.height=`${v}px`}}catch(x){console.log("[PLAN OVERLAY] Error syncing DPR size:",x)}return console.log("[PLAN OVERLAY] Canvas created and added to transformed layer:",f),console.log("[PLAN OVERLAY] Canvas element:",g),console.log("[PLAN OVERLAY] Host element rect:",f.getBoundingClientRect()),t.observer||(t.observer=new window.MutationObserver(()=>{var x;(x=t.canvas)!=null&&x.isConnected||(console.log("[PLAN OVERLAY] Canvas disconnected, re-attaching..."),p().appendChild(t.canvas),n())}),t.observer.observe(document.body,{childList:!0,subtree:!0})),g}function P(){let f=Number.POSITIVE_INFINITY,g=Number.POSITIVE_INFINITY,x=Number.NEGATIVE_INFINITY,E=Number.NEGATIVE_INFINITY;for(let m of t.items)m.globalX<f&&(f=m.globalX),m.globalY<g&&(g=m.globalY),m.globalX>x&&(x=m.globalX),m.globalY>E&&(E=m.globalY);isFinite(f)||(f=g=0,x=E=-1),t.minX=f,t.minY=g,t.maxX=x,t.maxY=E}function c(){if(!t.canvas)return;let f=2,g=2;if(t.anchor&&t.imageWidth&&t.imageHeight)f=Math.max(1,t.imageWidth|0),g=Math.max(1,t.imageHeight|0);else if(t.anchor){let x=t.anchor.tileX*3e3+(t.anchor.pxX||0),E=t.anchor.tileY*3e3+(t.anchor.pxY||0);f=Math.max(1,t.maxX-x+1|0),g=Math.max(1,t.maxY-E+1|0)}else f=Math.max(1,t.maxX-t.minX+1|0),g=Math.max(1,t.maxY-t.minY+1|0);t.canvas.width=Math.max(2,f),t.canvas.height=Math.max(2,g),t.canvas.style.width=`${Math.max(2,f)}px`,t.canvas.style.height=`${Math.max(2,g)}px`}function n(){if(!t.canvas||!t.anchor)return;let f=t.anchor.tileX*3e3+(t.anchor.pxX||0),g=t.anchor.tileY*3e3+(t.anchor.pxY||0);if(t.cssAnchorX||t.cssAnchorY)t.canvas.parentElement!==document.body&&document.body.appendChild(t.canvas),t.canvas.style.position="fixed",t.canvas.style.left=`${t.cssAnchorX}px`,t.canvas.style.top=`${t.cssAnchorY}px`,t.canvas.style.transform="none";else{let E=p();t.canvas.parentElement!==E&&E.appendChild(t.canvas),t.canvas.style.position="absolute",t.canvas.style.left=`${f}px`,t.canvas.style.top=`${g}px`,t.canvas.style.transform="none"}console.log("[PLAN OVERLAY] Positioned at anchor (global coords):",{left:f,top:g})}function u(){t.ctx&&t.ctx.clearRect(0,0,t.canvas.width,t.canvas.height)}function h(){r(),P(),c(),n();let{ctx:f,items:g,canvas:x}=t;if(u(),console.log(`[PLAN OVERLAY] Rendering ${g.length} items in ${x.width}x${x.height} canvas (anchored)`),g.length===0)return;let E=t.anchor.tileX*3e3+(t.anchor.pxX||0),m=t.anchor.tileY*3e3+(t.anchor.pxY||0);f.globalAlpha=.7;for(let v of g){let y=v.globalX-E|0,_=v.globalY-m|0;y<0||_<0||(f.fillStyle=`rgb(${v.r|0},${v.g|0},${v.b|0})`,f.fillRect(y,_,1,1))}if(t.nextBatchCount>0){let v=Math.min(t.nextBatchCount,g.length);f.globalAlpha=1;for(let y=0;y<v;y++){let _=g[y],I=_.globalX-E|0,w=_.globalY-m|0;I<0||w<0||(f.fillStyle=`rgb(${_.r|0},${_.g|0},${_.b|0})`,f.fillRect(I,w,1,1))}}}function A(f){t.enabled=!!f,r(),t.canvas.hidden=!t.enabled,console.log(`[PLAN OVERLAY] setEnabled: ${t.enabled}, canvas hidden: ${t.canvas.hidden}`),t.enabled&&t.items.length>0&&h()}function S(f){t.nextBatchCount=Math.max(0,Number(f||0)|0),t.enabled&&h()}function L(f,g){var E,m,v,y,_,I;let x=[];for(let w of f||[]){let k=0,N=0;if(typeof w.tileX=="number"&&typeof w.tileY=="number"&&typeof w.localX=="number"&&typeof w.localY=="number")k=w.tileX*3e3+w.localX,N=w.tileY*3e3+w.localY;else if(g&&typeof w.imageX=="number"&&typeof w.imageY=="number"){let he=g.tileX*3e3+(g.pxX||0),xe=g.tileY*3e3+(g.pxY||0);k=he+w.imageX,N=xe+w.imageY}else continue;let F=(m=(E=w.color)==null?void 0:E.r)!=null?m:0,Y=(y=(v=w.color)==null?void 0:v.g)!=null?y:0,O=(I=(_=w.color)==null?void 0:_.b)!=null?I:0;x.push({globalX:k|0,globalY:N|0,r:F,g:Y,b:O})}return console.log(`[PLAN OVERLAY] Normalized ${x.length} items, sample coords:`,x.slice(0,3).map(w=>`(${w.globalX}, ${w.globalY})`)),x}function C(f,g={}){let x=L(f,g.anchor);t.items=x,console.log(`[PLAN OVERLAY] setPlan: ${(f==null?void 0:f.length)||0} items -> ${x.length} normalized items`),typeof g.nextBatchCount=="number"&&(t.nextBatchCount=Math.max(0,g.nextBatchCount|0)),typeof g.imageWidth=="number"&&typeof g.imageHeight=="number"?(t.imageWidth=Math.max(1,g.imageWidth|0),t.imageHeight=Math.max(1,g.imageHeight|0),console.log("[PLAN OVERLAY] Image dimensions set for overlay:",t.imageWidth,"x",t.imageHeight)):(t.imageWidth=null,t.imageHeight=null),typeof g.enabled=="boolean"&&A(g.enabled),t.enabled&&h()}function B(){t.observer&&(t.observer.disconnect(),t.observer=null),t.canvas&&t.canvas.parentNode&&t.canvas.parentNode.removeChild(t.canvas)}function T(f){if(!f)return;t.anchor={tileX:f.tileX|0,tileY:f.tileY|0,pxX:(f.pxX||0)|0,pxY:(f.pxY||0)|0},console.log("[PLAN OVERLAY] Anchor set:",t.anchor);let g=t.anchor.tileX*3e3+t.anchor.pxX,x=t.anchor.tileY*3e3+t.anchor.pxY;console.log("[PLAN OVERLAY] Anchor global coords:",{x:g,y:x}),r(),h()}function R(f,g){t.cssAnchorX=Math.round(Number(f)||0),t.cssAnchorY=Math.round(Number(g)||0),console.log("[PLAN OVERLAY] CSS anchor set:",{x:t.cssAnchorX,y:t.cssAnchorY}),t.enabled&&n()}window.__WPA_PLAN_OVERLAY__={injectStyles:o,setEnabled:A,setPlan:C,setPlanItemsFromTileList:C,setNextBatchCount:S,setAnchor:T,setAnchorCss:R,render:h,cleanup:B,get state(){return t}}})();async function fe(){d("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),q(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let i=null,a=window.fetch,l=()=>{window.fetch!==a&&(window.fetch=a,d("\u{1F504} Fetch original restaurado")),e.positionTimeoutId&&(clearTimeout(e.positionTimeoutId),e.positionTimeoutId=null),e.cleanupObserver&&(e.cleanupObserver(),e.cleanupObserver=null),e.selectingPosition=!1};try{let t={...$},o=W("image");if(e.language=J(),!t.SITEKEY){let c=document.querySelector("*[data-sitekey]");c?(t.SITEKEY=c.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${t.SITEKEY.substring(0,20)}...`)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function s(){return d("\u{1F916} Intentando auto-inicio..."),U()?(d("\u{1F3A8} Paleta de colores ya est\xE1 abierta"),!0):(d("\u{1F50D} Paleta no encontrada, buscando bot\xF3n Paint..."),me()?(d("\u{1F446} Bot\xF3n Paint encontrado y presionado"),await z(2e3),U()?(d("\u2705 Paleta abierta exitosamente"),!0):(d("\u274C La paleta no se abri\xF3 despu\xE9s de hacer clic"),!1)):(d("\u274C Bot\xF3n Paint no encontrado"),!1))}async function p(c=!1){d("\u{1F916} Inicializando Auto-Image..."),r.setStatus(b("image.checkingColors"),"info");let n=Q();if(n.length===0)return r.setStatus(b("image.noColorsFound"),"error"),!1;let u=await te(),h=null;u.success&&u.data.user?(h={username:u.data.user.name||"An\xF3nimo",charges:u.data.charges,maxCharges:u.data.maxCharges,pixels:u.data.user.pixelsPainted||0},i=h,e.currentCharges=u.data.charges,e.maxCharges=u.data.maxCharges||50,d(`\u{1F464} Usuario conectado: ${u.data.user.name||"An\xF3nimo"} - Cargas: ${h.charges}/${h.maxCharges} - P\xEDxeles: ${h.pixels}`)):d("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=n,e.colorsChecked=!0,r.setStatus(b("image.colorsFound",{count:n.length}),"success"),r.updateProgress(0,0,h),c||d(`\u2705 ${n.length} colores disponibles detectados`),r.setInitialized(!0),r.enableButtonsAfterInit(),r.updateOverlayButtonState();try{}catch{}return!0}let r=await ge({texts:o,onConfigChange:c=>{c.pixelsPerBatch!==void 0&&(e.pixelsPerBatch=c.pixelsPerBatch),c.useAllCharges!==void 0&&(e.useAllChargesFirst=c.useAllCharges),d("Configuraci\xF3n actualizada:",c)},onInitBot:p,onUploadImage:async c=>{try{r.setStatus(b("image.loadingImage"),"info");let n=window.URL.createObjectURL(c),u=new V(n);u.originalName=c.name,await u.load();let h=u.processImage(e.availableColors,t);e.imageData=h,e.imageData.processor=u,e.totalPixels=h.validPixelCount,e.paintedPixels=0,e.originalImageName=c.name,e.imageLoaded=!0,r.setStatus(b("image.imageLoaded",{count:h.validPixelCount}),"success"),r.updateProgress(0,h.validPixelCount,i),d(`\u2705 Imagen cargada: ${h.width}x${h.height}, ${h.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(n);try{window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setPlan([],{enabled:!0,nextBatchCount:0}),d("\u2705 Plan overlay activado autom\xE1ticamente al cargar imagen"))}catch(A){d("\u26A0\uFE0F Error activando plan overlay:",A)}return!0}catch(n){return r.setStatus(b("image.imageError"),"error"),d("\u274C Error cargando imagen:",n),!1}},onSelectPosition:async()=>new Promise(c=>{r.setStatus(b("image.selectPositionAlert"),"info"),r.setStatus(b("image.waitingPosition"),"info"),e.selectingPosition=!0;let n=!1,u=()=>{window.fetch=async(S,L)=>{if(e.selectingPosition&&!n&&typeof S=="string"&&S.includes("/s0/pixel/")&&L&&L.method==="POST")try{d(`\u{1F3AF} Interceptando request de pintado: ${S}`);let C=await a(S,L);if(C.ok&&L.body){let B;try{B=JSON.parse(L.body)}catch(T){return d("Error parseando body del request:",T),C}if(B.coords&&Array.isArray(B.coords)&&B.coords.length>=2){let T=B.coords[0],R=B.coords[1],f=S.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);if(f&&!n){n=!0,e.tileX=parseInt(f[1]),e.tileY=parseInt(f[2]),e.startPosition={x:T,y:R},e.selectingPosition=!1;try{if(window.__WPA_PLAN_OVERLAY__){if(window.__WPA_PLAN_OVERLAY__.injectStyles(),window.__WPA_PLAN_OVERLAY__.setEnabled(!0),window.__WPA_PLAN_OVERLAY__.setAnchor({tileX:e.tileX,tileY:e.tileY,pxX:T,pxY:R}),e.imageData&&e.imageData.pixels){let g=[];for(let x of e.imageData.pixels){let E=T+x.x,m=R+x.y;g.push({imageX:x.x,imageY:x.y,localX:E,localY:m,tileX:e.tileX,tileY:e.tileY,color:x.targetColor,originalColor:x.originalColor})}e.remainingPixels=g,e.totalPixels=g.length,window.__WPA_PLAN_OVERLAY__.setPlan(g,{enabled:!0,nextBatchCount:e.pixelsPerBatch,imageWidth:e.imageData.width,imageHeight:e.imageData.height,anchor:{tileX:e.tileX,tileY:e.tileY,pxX:T,pxY:R}}),d(`\u2705 Cola de p\xEDxeles generada: ${g.length} p\xEDxeles para overlay`)}d(`\u2705 Plan overlay anclado en tile(${e.tileX},${e.tileY}) local(${T},${R})`)}}catch(g){d("Plan Overlay: error configurando ancla",g)}l(),r.setStatus(b("image.positionSet"),"success"),d(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${T},${R})`),c(!0)}else d("\u26A0\uFE0F No se pudo extraer tile de la URL:",S)}}return C}catch(C){if(d("\u274C Error interceptando pixel:",C),!n)return l(),a(S,L)}return a(S,L)}},h=()=>{let S=document.querySelectorAll("canvas");if(S.length===0){d("\u26A0\uFE0F No se encontraron elementos canvas");return}d(`\u{1F4CA} Configurando observer para ${S.length} canvas`);let L=C=>{var T;if(!e.selectingPosition||n)return;let B=C.target;if(B&&B.tagName==="CANVAS"){d("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n");try{let f=(((T=document.querySelector("canvas"))==null?void 0:T.parentElement)||document.body).getBoundingClientRect(),g=C.clientX-f.left,x=C.clientY-f.top;window.__WPA_PLAN_OVERLAY__&&(window.__WPA_PLAN_OVERLAY__.setAnchorCss(g,x),d(`Plan overlay: ancla CSS establecida en (${g}, ${x})`))}catch(R){d("Plan Overlay: error calculando ancla CSS",R)}setTimeout(()=>{!n&&e.selectingPosition&&d("\u{1F50D} Buscando requests recientes de pintado...")},500)}};document.addEventListener("click",L),e.cleanupObserver=()=>{document.removeEventListener("click",L)}};u(),h();let A=setTimeout(()=>{e.selectingPosition&&!n&&(l(),e.cleanupObserver&&e.cleanupObserver(),r.setStatus(b("image.positionTimeout"),"error"),d("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),c(!1))},12e4);e.positionTimeoutId=A}),onStartPainting:async()=>{var c;if(d("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((c=e.remainingPixels)==null?void 0:c.length)||0}),!e.imageLoaded||!e.startPosition)return r.setStatus(b("image.missingRequirements"),"error"),d(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,e.isFirstBatch=!0,r.setStatus(b("image.startPaintingMsg"),"success");try{return await oe(e.imageData,e.startPosition,(n,u,h,A)=>{i&&(i.charges=Math.floor(e.currentCharges),A!==void 0&&(i.estimatedTime=A)),r.updateProgress(n,u,i),e.inCooldown&&e.nextBatchCooldown>0?r.updateCooldownDisplay(e.nextBatchCooldown):r.updateCooldownDisplay(0),h?h.includes("\u23F3")&&e.inCooldown?r.updateCooldownMessage(h):r.setStatus(h,"info"):r.setStatus(b("image.paintingProgress",{painted:n,total:u}),"info")},(n,u)=>{n?(r.setStatus(b("image.paintingComplete",{count:u}),"success"),le()):r.setStatus(b("image.paintingStopped"),"warning"),e.running=!1},n=>{r.setStatus(b("image.paintingError"),"error"),d("\u274C Error en proceso de pintado:",n),e.running=!1}),!0}catch(n){return r.setStatus(b("image.paintingError"),"error"),d("\u274C Error iniciando pintado:",n),e.running=!1,!1}},onStopPainting:async()=>{if(ce().hasProgress){let n=await pe(b("image.confirmSaveProgress"),b("image.saveProgressTitle"),{save:b("image.saveProgress"),discard:b("image.discardProgress"),cancel:b("image.cancel")});if(n==="save"){let u=j();u.success?r.setStatus(b("image.progressSaved",{filename:u.filename}),"success"):r.setStatus(b("image.progressSaveError",{error:u.error}),"error")}else if(n==="cancel")return!1}return H(),r.setStatus(b("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let c=j();return c.success?r.setStatus(b("image.progressSaved",{filename:c.filename}),"success"):r.setStatus(b("image.progressSaveError",{error:c.error}),"error"),c.success},onLoadProgress:async c=>{try{let n=await se(c);return n.success?(r.setStatus(b("image.progressLoaded",{painted:n.painted,total:n.total}),"success"),r.updateProgress(n.painted,n.total,i),d("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(r.setStatus(b("image.progressLoadError",{error:n.error}),"error"),!1)}catch(n){return r.setStatus(b("image.progressLoadError",{error:n.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&r.showResizeDialog(e.imageData.processor)},onConfirmResize:(c,n,u)=>{d(`\u{1F504} Redimensionando imagen de ${c.getDimensions().width}x${c.getDimensions().height} a ${n}x${u}`);try{c.resize(n,u);let h=c.processImage(e.availableColors,t);e.imageData=h,e.totalPixels=h.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},r.updateProgress(0,h.validPixelCount,i),r.setStatus(b("image.resizeSuccess",{width:n,height:u}),"success"),d(`\u2705 Imagen redimensionada: ${h.validPixelCount} p\xEDxeles v\xE1lidos`);try{if(window.__WPA_PLAN_OVERLAY__&&e.startPosition&&e.tileX!=null&&e.tileY!=null){let A=e.startPosition.x,S=e.startPosition.y,L=[];for(let C of h.pixels){let B=A+C.x,T=S+C.y;L.push({imageX:C.x,imageY:C.y,localX:B,localY:T,tileX:e.tileX,tileY:e.tileY,color:C.targetColor,originalColor:C.originalColor})}e.remainingPixels=L,e.totalPixels=L.length,window.__WPA_PLAN_OVERLAY__.setPlan(L,{enabled:!0,nextBatchCount:e.pixelsPerBatch,imageWidth:h.width,imageHeight:h.height,anchor:{tileX:e.tileX,tileY:e.tileY,pxX:A,pxY:S}})}}catch(A){d("\u26A0\uFE0F Error actualizando overlay tras redimensionar:",A)}}catch(h){d(`\u274C Error redimensionando imagen: ${h.message}`),r.setStatus(b("image.imageError"),"error")}}}),P=c=>{let{language:n}=c.detail;d(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${n}`),e.language=n};window.addEventListener("launcherLanguageChanged",P),window.addEventListener("languageChanged",P),window.addEventListener("beforeunload",()=>{l(),H(),r.destroy(),window.removeEventListener("launcherLanguageChanged",P),window.removeEventListener("languageChanged",P),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),d("\u2705 Auto-Image inicializado correctamente"),setTimeout(async()=>{try{r.setStatus(b("image.autoInitializing"),"info"),d("\u{1F916} Intentando auto-inicio..."),await s()?(r.setStatus(b("image.autoInitSuccess"),"success"),d("\u2705 Auto-inicio exitoso"),r.setInitButtonVisible(!1),await p(!0)&&d("\u{1F680} Bot auto-iniciado completamente")):(r.setStatus(b("image.autoInitFailed"),"warning"),d("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual"))}catch(c){d("\u274C Error en auto-inicio:",c),r.setStatus(b("image.manualInitRequired"),"warning")}},1e3)}catch(t){throw d("\u274C Error inicializando Auto-Image:",t),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),t}}(()=>{"use strict";var i,a;if((i=window.__wplaceBot)!=null&&i.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((a=window.__wplaceBot)!=null&&a.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,fe().catch(l=>{console.error("[BOT] Error en Auto-Image:",l),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
