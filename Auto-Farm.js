/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-17T16:12:14.212Z */
(()=>{var u=(...e)=>console.log("[WPA-UI]",...e);var b={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",TILE_X:1086,TILE_Y:1565,TILE_SIZE:3e3,DELAY_MS:15e3,MIN_CHARGES:10,CHARGE_REGEN_MS:3e4,PIXELS_PER_BATCH:20,COLOR_MIN:1,COLOR_MAX:32,COLOR_MODE:"random",COLOR_FIXED:1,CUSTOM_PALETTE:["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF"],BASE_X:null,BASE_Y:null,FARM_RADIUS:500,POSITION_SELECTED:!1,UI_THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",running:"#00cc00"}},f={running:!1,painted:0,last:null,charges:{count:0,max:0,cooldownMs:3e4},user:null,panel:null,captureMode:!1,selectingPosition:!1,originalFetch:window.fetch,retryCount:0,inCooldown:!1,nextPaintTime:0,cooldownEndTime:0,health:null};function H(e){return{...e}}function pe(){console.log("[WPA-UI]","Configuraci\xF3n del farm reseteada (localStorage deshabilitado)")}function me(){console.log("[WPA-UI]","Configuraci\xF3n reseteada a valores seguros (localStorage deshabilitado)")}var W="https://backend.wplace.live";async function j(){var e,n,t;try{let r=await fetch(`${W}/me`,{credentials:"include"}).then(p=>p.json()),s=r||null,o=(r==null?void 0:r.charges)||{},i={count:(e=o.count)!=null?e:0,max:(n=o.max)!=null?n:0,cooldownMs:(t=o.cooldownMs)!=null?t:3e4};return{success:!0,data:{user:s,charges:i.count,maxCharges:i.max,chargeRegen:i.cooldownMs}}}catch(r){return{success:!1,error:r.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function ge(){try{let e=await fetch(`${W}/health`,{method:"GET",credentials:"include"});return e.ok?{...await e.json(),lastCheck:Date.now(),status:"online"}:{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"error",statusCode:e.status}}catch(e){return{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"offline",error:e.message}}}async function fe(e,n,t,r,s){try{let o=JSON.stringify({colors:n,coords:e,t}),i=new AbortController,p=setTimeout(()=>i.abort(),15e3),d=await fetch(`${W}/s0/pixel/${r}/${s}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:o,signal:i.signal});clearTimeout(p);let g=null;try{let a=await d.text();a&&(g=JSON.parse(a))}catch{g={}}return{status:d.status,json:g,success:d.ok}}catch(o){return{status:0,json:{error:o.message},success:!1}}}function $(e,n,t){return Math.max(n,Math.min(t,e))}function he(e,n){let t=0,r=0,s=0,o=0;e.style.cursor="move",e.addEventListener("mousedown",i);function i(g){g.preventDefault(),s=g.clientX,o=g.clientY,document.addEventListener("mouseup",d),document.addEventListener("mousemove",p)}function p(g){g.preventDefault(),t=s-g.clientX,r=o-g.clientY,s=g.clientX,o=g.clientY;let a=n.offsetTop-r,c=n.offsetLeft-t;n.style.top=Math.max(0,a)+"px",n.style.left=Math.max(0,c)+"px"}function d(){document.removeEventListener("mouseup",d),document.removeEventListener("mousemove",p)}}var xe={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",autoInitializing:"\u{1F916} Inicializando autom\xE1ticamente...",autoInitSuccess:"\u2705 Bot iniciado autom\xE1ticamente",autoInitFailed:"\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",paletteDetected:"\u{1F3A8} Paleta de colores detectada",paletteNotFound:"\u{1F50D} Buscando paleta de colores...",clickingPaintButton:"\u{1F446} Haciendo clic en el bot\xF3n Paint...",paintButtonNotFound:"\u274C Bot\xF3n Paint no encontrado",manualInitRequired:"\u{1F527} Inicio manual requerido",retryAttempt:"\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",retryError:"\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",retryFailed:"\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",networkError:"\u{1F310} Error de red. Reintentando...",serverError:"\u{1F525} Error del servidor. Reintentando...",timeoutError:"\u23F0 Timeout del servidor. Reintentando..."},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var we={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",overlayOn:"Overlay: ON",overlayOff:"Overlay: OFF",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",autoInitializing:"\u{1F916} Auto-initializing...",autoInitSuccess:"\u2705 Bot auto-started successfully",autoInitFailed:"\u26A0\uFE0F Could not auto-start. Use manual button.",paletteDetected:"\u{1F3A8} Color palette detected",paletteNotFound:"\u{1F50D} Searching for color palette...",clickingPaintButton:"\u{1F446} Clicking Paint button...",paintButtonNotFound:"\u274C Paint button not found",manualInitRequired:"\u{1F527} Manual initialization required",retryAttempt:"\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",retryError:"\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",retryFailed:"\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",networkError:"\u{1F310} Network error. Retrying...",serverError:"\u{1F525} Server error. Retrying...",timeoutError:"\u23F0 Server timeout. Retrying..."},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var Ee={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",overlayOn:"Overlay : ON",overlayOff:"Overlay : OFF",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",autoInitializing:"\u{1F916} Initialisation automatique...",autoInitSuccess:"\u2705 Bot d\xE9marr\xE9 automatiquement",autoInitFailed:"\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",paletteDetected:"\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",paletteNotFound:"\u{1F50D} Recherche de la palette de couleurs...",clickingPaintButton:"\u{1F446} Clic sur le bouton Paint...",paintButtonNotFound:"\u274C Bouton Paint introuvable",manualInitRequired:"\u{1F527} Initialisation manuelle requise",retryAttempt:"\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",retryError:"\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",retryFailed:"\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",networkError:"\u{1F310} Erreur r\xE9seau. Nouvel essai...",serverError:"\u{1F525} Erreur serveur. Nouvel essai...",timeoutError:"\u23F0 Timeout serveur. Nouvel essai..."},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var O={es:xe,en:we,fr:Ee},Z="es",G=O[Z];function Pe(){let n=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return O[n]?n:"es"}function Te(){return null}function V(){let e=Te(),n=Pe(),t="es";return e&&O[e]?t=e:n&&O[n]&&(t=n),Ae(t),t}function Ae(e){if(!O[e]){console.warn(`Idioma '${e}' no disponible. Usando '${Z}'`);return}Z=e,G=O[e],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:e,translations:G}}))}function l(e,n={}){let t=e.split("."),r=G;for(let s of t)if(r&&typeof r=="object"&&s in r)r=r[s];else return console.warn(`Clave de traducci\xF3n no encontrada: '${e}'`),e;return typeof r!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${e}'`),e):Le(r,n)}function Le(e,n){return!n||Object.keys(n).length===0?e:e.replace(/\{(\w+)\}/g,(t,r)=>n[r]!==void 0?n[r]:t)}V();function be(e,n,t,r){var X,Y,te,ae,ne,oe,re,ie,se,le,ce,de,ue;let s=document.createElement("div");s.id="wplace-farm-ui",s.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let o=s.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=`
    .wplace-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: 2px solid #4a5568;
      border-radius: 12px;
      padding: 16px;
      min-width: 320px;
      max-width: 400px;
      color: white;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      font-size: 14px;
      backdrop-filter: blur(10px);
      position: relative;
    }
    
    .wplace-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      cursor: move;
    }
    
    .wplace-title {
      font-weight: bold;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .wplace-minimize {
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .wplace-minimize:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .wplace-content {
      display: block;
    }
    
    .wplace-content.minimized {
      display: none;
    }
    
    .wplace-section {
      margin-bottom: 12px;
    }
    
    .wplace-section-title {
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 13px;
      color: #e2e8f0;
      cursor: pointer;
      user-select: none;
    }
    
    .wplace-row {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      gap: 8px;
    }
    
    .wplace-label {
      flex: 1;
      font-size: 12px;
      color: #cbd5e0;
    }
    
    .wplace-input {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      width: 80px;
    }
    
    .wplace-input:focus {
      outline: none;
      border-color: #90cdf4;
      background: rgba(255,255,255,0.15);
    }
    
    .wplace-input.wide {
      width: 100%;
    }
    
    .wplace-select {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      width: 100px;
    }
    
    .wplace-button {
      background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
      border: none;
      border-radius: 6px;
      color: white;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      margin: 2px;
      transition: all 0.2s;
      min-width: 60px;
    }
    
    .wplace-button:hover {
      background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
      transform: translateY(-1px);
    }
    
    .wplace-button:active {
      transform: translateY(0);
    }
    
    .wplace-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    
    .wplace-button.start {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    }
    
    .wplace-button.start:hover:not(:disabled) {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
    }
    
    .wplace-button.stop {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    }
    
    .wplace-button.stop:hover:not(:disabled) {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
    }
    
    .wplace-button.calibrate {
      background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
    }
    
    .wplace-button.calibrate:hover {
      background: linear-gradient(135deg, #dd6b20 0%, #c05621 100%);
    }
    
    .wplace-button.small {
      padding: 4px 8px;
      font-size: 11px;
      min-width: 40px;
    }
    
    .wplace-status {
      background: rgba(0,0,0,0.3);
      border-radius: 6px;
      padding: 8px;
      margin: 8px 0;
      font-size: 12px;
      min-height: 20px;
      word-wrap: break-word;
      transition: all 0.3s ease;
    }
    
    .wplace-status.success {
      background: rgba(72, 187, 120, 0.2);
      border-left: 3px solid #48bb78;
    }
    
    .wplace-status.error {
      background: rgba(245, 101, 101, 0.2);
      border-left: 3px solid #f56565;
    }
    
    .wplace-status.status {
      background: rgba(66, 153, 225, 0.2);
      border-left: 3px solid #4299e1;
    }
    
    .wplace-stats {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    
    .wplace-stat {
      background: rgba(0,0,0,0.2);
      border-radius: 4px;
      padding: 6px;
      text-align: center;
    }
    
    .wplace-stat-value {
      font-weight: bold;
      font-size: 14px;
    }
    
    .wplace-stat-label {
      font-size: 10px;
      color: #a0aec0;
      margin-top: 2px;
    }
    
    .wplace-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 8px;
    }
    
    .wplace-advanced {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    
    .wplace-theme-preview {
      display: flex;
      gap: 2px;
      flex-wrap: wrap;
      margin-top: 4px;
      min-height: 16px;
    }
    
    .wplace-color-dot {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    .wplace-health {
      font-size: 10px;
      color: #a0aec0;
      margin-top: 4px;
      text-align: center;
    }
    
    .wplace-health.online {
      color: #48bb78;
    }
    
    .wplace-health.offline {
      color: #f56565;
    }
    
    .wplace-zone-info {
      background: rgba(0,0,0,0.2);
      border-radius: 6px;
      padding: 8px;
      margin: 8px 0;
      font-size: 11px;
    }
    
    .wplace-zone-text {
      color: #e2e8f0;
      margin-bottom: 4px;
    }
    
    .wplace-zone-warning {
      color: #ffd700;
      font-size: 10px;
      font-style: italic;
    }
    
    #zone-display {
      font-weight: bold;
      color: #90cdf4;
    }
  `,o.appendChild(i);let p=document.createElement("div");p.className="wplace-container";let d={minimized:!1,showAdvanced:!1};p.innerHTML=`
    <div class="wplace-header">
      <div class="wplace-title">
        \u{1F916} ${l("farm.title")}
      </div>
      <button class="wplace-minimize">\u2212</button>
    </div>
    
    <div class="wplace-content">
      <!-- Estado y controles principales -->
      <div class="wplace-section">
        <div class="wplace-status" id="status">\u{1F4A4} ${l("farm.stopped")}</div>
        
        <div class="wplace-stats">
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="painted-count">0</div>
            <div class="wplace-stat-label">${l("farm.painted")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="charges-count">0</div>
            <div class="wplace-stat-label">${l("farm.charges")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="retry-count">0</div>
            <div class="wplace-stat-label">${l("farm.retries")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="tile-pos">0,0</div>
            <div class="wplace-stat-label">${l("farm.tile")}</div>
          </div>
        </div>
        
        <div class="wplace-buttons">
          <button class="wplace-button start" id="start-btn">\u25B6\uFE0F ${l("farm.start")}</button>
          <button class="wplace-button stop" id="stop-btn" disabled>\u23F9\uFE0F ${l("farm.stop")}</button>
          <button class="wplace-button calibrate" id="calibrate-btn">\u{1F3AF} ${l("farm.calibrate")}</button>
          <button class="wplace-button small" id="select-position-btn">\u{1F30D} ${l("farm.selectPosition")}</button>
          <button class="wplace-button small" id="once-btn">\u{1F3A8} ${l("farm.paintOnce")}</button>
        </div>
        
        <!-- Informaci\xF3n de la zona seleccionada -->
        <div class="wplace-zone-info" id="zone-info">
          <div class="wplace-zone-text">\u{1F4CD} ${l("farm.positionInfo")}: <span id="zone-display">${l("farm.noPosition")}</span></div>
          <div class="wplace-zone-warning">\u26A0\uFE0F ${l("farm.selectEmptyArea")}</div>
        </div>
        
        <div class="wplace-health" id="health-status">\u{1F50D} ${l("farm.checkingStatus")}</div>
      </div>
      
      <!-- Configuraci\xF3n b\xE1sica -->
      <div class="wplace-section">
        <div class="wplace-section-title">\u2699\uFE0F ${l("farm.configuration")}</div>
        
        <div class="wplace-row">
          <span class="wplace-label">${l("farm.delay")}:</span>
          <input type="number" class="wplace-input" id="delay-input" min="1000" max="300000" step="1000">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${l("farm.pixelsPerBatch")}:</span>
          <input type="number" class="wplace-input" id="pixels-input" min="1" max="50">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${l("farm.minCharges")}:</span>
          <input type="number" class="wplace-input" id="min-charges-input" min="0" max="50" step="0.1">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${l("farm.colorMode")}:</span>
          <select class="wplace-select" id="color-mode-select">
            <option value="random">${l("farm.random")}</option>
            <option value="fixed">${l("farm.fixed")}</option>
          </select>
        </div>
        
        <div class="wplace-row" id="color-range-row">
          <span class="wplace-label">${l("farm.range")}:</span>
          <input type="number" class="wplace-input" id="color-min-input" min="1" max="32" style="width: 35px;">
          <span style="color: #cbd5e0;">-</span>
          <input type="number" class="wplace-input" id="color-max-input" min="1" max="32" style="width: 35px;">
        </div>
        
        <div class="wplace-row" id="color-fixed-row" style="display: none;">
          <span class="wplace-label">${l("farm.fixedColor")}:</span>
          <input type="number" class="wplace-input" id="color-fixed-input" min="1" max="32">
        </div>
      </div>
      
      <!-- Configuraci\xF3n avanzada (colapsable) -->
      <div class="wplace-section">
        <div class="wplace-section-title" id="advanced-toggle">
          \u{1F527} ${l("farm.advanced")} <span id="advanced-arrow">\u25B6</span>
        </div>
        
        <div class="wplace-advanced" id="advanced-section" style="display: none;">
          <div class="wplace-row">
            <span class="wplace-label">${l("farm.tileX")}:</span>
            <input type="number" class="wplace-input" id="tile-x-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">${l("farm.tileY")}:</span>
            <input type="number" class="wplace-input" id="tile-y-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">${l("farm.customPalette")}:</span>
          </div>
          <div class="wplace-row">
            <input type="text" class="wplace-input wide" id="custom-palette-input" 
                   placeholder="${l("farm.paletteExample")}">
          </div>
          
          <div class="wplace-buttons">
            <button class="wplace-button small" id="save-btn">\u{1F4BE} ${l("common.save")}</button>
            <button class="wplace-button small" id="load-btn">\u{1F4C1} ${l("common.load")}</button>
            <button class="wplace-button small" id="reset-btn">\u{1F504} ${l("common.reset")}</button>
            <button class="wplace-button small" id="capture-btn">\u{1F4F8} ${l("farm.capture")}</button>
          </div>
        </div>
      </div>
    </div>
  `,o.appendChild(p),document.body.appendChild(s);let g=o.querySelector(".wplace-header");he(g,s);let a={minimizeBtn:o.querySelector(".wplace-minimize"),content:o.querySelector(".wplace-content"),status:o.getElementById("status"),paintedCount:o.getElementById("painted-count"),chargesCount:o.getElementById("charges-count"),retryCount:o.getElementById("retry-count"),tilePos:o.getElementById("tile-pos"),startBtn:o.getElementById("start-btn"),stopBtn:o.getElementById("stop-btn"),calibrateBtn:o.getElementById("calibrate-btn"),selectPositionBtn:o.getElementById("select-position-btn"),onceBtn:o.getElementById("once-btn"),zoneInfo:o.getElementById("zone-info"),zoneDisplay:o.getElementById("zone-display"),healthStatus:o.getElementById("health-status"),delayInput:o.getElementById("delay-input"),pixelsInput:o.getElementById("pixels-input"),minChargesInput:o.getElementById("min-charges-input"),colorModeSelect:o.getElementById("color-mode-select"),colorRangeRow:o.getElementById("color-range-row"),colorFixedRow:o.getElementById("color-fixed-row"),colorMinInput:o.getElementById("color-min-input"),colorMaxInput:o.getElementById("color-max-input"),colorFixedInput:o.getElementById("color-fixed-input"),advancedToggle:o.getElementById("advanced-toggle"),advancedSection:o.getElementById("advanced-section"),advancedArrow:o.getElementById("advanced-arrow"),tileXInput:o.getElementById("tile-x-input"),tileYInput:o.getElementById("tile-y-input"),customPaletteInput:o.getElementById("custom-palette-input"),saveBtn:o.getElementById("save-btn"),loadBtn:o.getElementById("load-btn"),resetBtn:o.getElementById("reset-btn"),captureBtn:o.getElementById("capture-btn")};function c(){var m;a.delayInput.value=e.DELAY_MS,a.pixelsInput.value=e.PIXELS_PER_BATCH,a.minChargesInput.value=e.MIN_CHARGES,a.colorModeSelect.value=e.COLOR_MODE,a.colorMinInput.value=e.COLOR_MIN,a.colorMaxInput.value=e.COLOR_MAX,a.colorFixedInput.value=e.COLOR_FIXED,a.tileXInput.value=e.TILE_X||"",a.tileYInput.value=e.TILE_Y||"",a.customPaletteInput.value=(e.CUSTOM_PALETTE||[]).join(","),E(),x(),y(),C(((m=f)==null?void 0:m.running)||!1)}function h(){e.DELAY_MS=parseInt(a.delayInput.value)||b.DELAY_MS,e.PIXELS_PER_BATCH=$(parseInt(a.pixelsInput.value)||b.PIXELS_PER_BATCH,1,50),e.MIN_CHARGES=parseFloat(a.minChargesInput.value)||b.MIN_CHARGES,e.COLOR_MODE=a.colorModeSelect.value,e.COLOR_MIN=$(parseInt(a.colorMinInput.value)||b.COLOR_MIN,1,32),e.COLOR_MAX=$(parseInt(a.colorMaxInput.value)||b.COLOR_MAX,1,32),e.COLOR_FIXED=$(parseInt(a.colorFixedInput.value)||b.COLOR_FIXED,1,32),e.COLOR_MIN>e.COLOR_MAX&&(e.COLOR_MAX=e.COLOR_MIN,a.colorMaxInput.value=e.COLOR_MAX);let m=parseInt(a.tileXInput.value),w=parseInt(a.tileYInput.value);Number.isFinite(m)&&(e.TILE_X=m),Number.isFinite(w)&&(e.TILE_Y=w),x(),y()}function E(){let m=a.colorModeSelect.value;a.colorRangeRow.style.display=m==="random"?"flex":"none",a.colorFixedRow.style.display=m==="fixed"?"flex":"none"}function x(){a.tilePos&&(a.tilePos.textContent=`${e.TILE_X||0},${e.TILE_Y||0}`)}function y(){var m;a.zoneDisplay&&(e.POSITION_SELECTED&&e.BASE_X!==null&&e.BASE_Y!==null?(a.zoneDisplay.textContent=l("farm.currentZone",{x:e.BASE_X,y:e.BASE_Y}),a.zoneDisplay.style.color="#48bb78"):(a.zoneDisplay.textContent=l("farm.noPosition"),a.zoneDisplay.style.color="#f56565")),C(((m=f)==null?void 0:m.running)||!1)}(X=a.minimizeBtn)==null||X.addEventListener("click",()=>{d.minimized=!d.minimized,a.content.classList.toggle("minimized",d.minimized),a.minimizeBtn.textContent=d.minimized?"+":"\u2212"}),(Y=a.startBtn)==null||Y.addEventListener("click",()=>{h(),n(),C(!0)}),(te=a.stopBtn)==null||te.addEventListener("click",()=>{t(),C(!1)}),(ae=a.calibrateBtn)==null||ae.addEventListener("click",()=>{r()}),(ne=a.onceBtn)==null||ne.addEventListener("click",()=>{h(),window.WPAUI&&window.WPAUI.once&&window.WPAUI.once()}),(oe=a.selectPositionBtn)==null||oe.addEventListener("click",()=>{q(e,S,y)}),(re=a.colorModeSelect)==null||re.addEventListener("change",()=>{E(),h()}),(ie=a.customPaletteInput)==null||ie.addEventListener("input",()=>{h()}),(se=a.advancedToggle)==null||se.addEventListener("click",()=>{d.showAdvanced=!d.showAdvanced,a.advancedSection.style.display=d.showAdvanced?"block":"none",a.advancedArrow.textContent=d.showAdvanced?"\u25BC":"\u25B6"}),["delayInput","pixelsInput","minChargesInput","colorMinInput","colorMaxInput","colorFixedInput","tileXInput","tileYInput"].forEach(m=>{var w;(w=a[m])==null||w.addEventListener("change",h)}),(le=a.saveBtn)==null||le.addEventListener("click",()=>{h(),S(`\u{1F4BE} ${l("farm.configSaved")}`,"success")}),(ce=a.loadBtn)==null||ce.addEventListener("click",()=>{let m=H(b);Object.assign(e,m),c(),S(`\u{1F4C1} ${l("farm.configLoaded")}`,"success")}),(de=a.resetBtn)==null||de.addEventListener("click",()=>{pe(),Object.assign(e,b),c(),S(`\u{1F504} ${l("farm.configReset")}`,"success")}),(ue=a.captureBtn)==null||ue.addEventListener("click",()=>{S(`\u{1F4F8} ${l("farm.captureInstructions")}`,"status")});function C(m){if(a.startBtn){let w=!e.POSITION_SELECTED||e.BASE_X===null||e.BASE_Y===null;a.startBtn.disabled=m||w,w?(a.startBtn.textContent=`\u{1F6AB} ${l("farm.selectPosition")} \u26A0\uFE0F`,a.startBtn.title=l("farm.missingPosition")):(a.startBtn.textContent=`\u25B6\uFE0F ${l("farm.start")}`,a.startBtn.title="")}a.stopBtn&&(a.stopBtn.disabled=!m)}function S(m,w="status"){a.status&&(a.status.textContent=m,a.status.className=`wplace-status ${w}`,u(`Status: ${m}`))}function D(m,w,F=0,T=null){a.paintedCount&&(a.paintedCount.textContent=m||0),a.chargesCount&&(a.chargesCount.textContent=typeof w=="number"?w.toFixed(1):"0"),a.retryCount&&(a.retryCount.textContent=F||0),a.healthStatus&&T&&(a.healthStatus.textContent=T.up?`\u{1F7E2} ${l("farm.backendOnline")}`:`\u{1F534} ${l("farm.backendOffline")}`,a.healthStatus.className=`wplace-health ${T.up?"online":"offline"}`)}function P(){p.style.boxShadow="0 0 20px #48bb78",setTimeout(()=>{p.style.boxShadow="0 10px 25px rgba(0,0,0,0.3)"},200)}c();function I(){var z;let m=o.querySelector(".wplace-title");m&&(m.innerHTML=`\u{1F916} ${l("farm.title")}`),a.startBtn&&(a.startBtn.innerHTML=`\u25B6\uFE0F ${l("farm.start")}`),a.stopBtn&&(a.stopBtn.innerHTML=`\u23F9\uFE0F ${l("farm.stop")}`),a.calibrateBtn&&(a.calibrateBtn.innerHTML=`\u{1F3AF} ${l("farm.calibrate")}`),a.selectPositionBtn&&(a.selectPositionBtn.innerHTML=`\u{1F30D} ${l("farm.selectPosition")}`),a.onceBtn&&(a.onceBtn.innerHTML=`\u{1F3A8} ${l("farm.paintOnce")}`);let w=o.querySelector("#painted-count").parentElement.querySelector(".wplace-stat-label"),F=o.querySelector("#charges-count").parentElement.querySelector(".wplace-stat-label"),T=o.querySelector("#retry-count").parentElement.querySelector(".wplace-stat-label"),L=o.querySelector("#tile-pos").parentElement.querySelector(".wplace-stat-label");w&&(w.textContent=l("farm.painted")),F&&(F.textContent=l("farm.charges")),T&&(T.textContent=l("farm.retries")),L&&(L.textContent=l("farm.tile"));let B=o.querySelector(".wplace-section-title");B&&(B.innerHTML=`\u2699\uFE0F ${l("farm.configuration")}`);let v=o.getElementById("advanced-toggle");if(v){let A=v.querySelector("#advanced-arrow"),N=A?A.textContent:"\u25B6";v.innerHTML=`\u{1F527} ${l("farm.advanced")} <span id="advanced-arrow">${N}</span>`}let _=a.colorModeSelect;if(_){let A=_.querySelector('option[value="random"]'),N=_.querySelector('option[value="fixed"]');A&&(A.textContent=l("farm.random")),N&&(N.textContent=l("farm.fixed"))}a.customPaletteInput&&(a.customPaletteInput.placeholder=l("farm.paletteExample")),a.saveBtn&&(a.saveBtn.innerHTML=`\u{1F4BE} ${l("common.save")}`),a.loadBtn&&(a.loadBtn.innerHTML=`\u{1F4C1} ${l("common.load")}`),a.resetBtn&&(a.resetBtn.innerHTML=`\u{1F504} ${l("common.reset")}`),a.captureBtn&&(a.captureBtn.innerHTML=`\u{1F4F8} ${l("farm.capture")}`),y(),C(((z=f)==null?void 0:z.running)||!1);let M=a.healthStatus;M&&M.textContent.includes("\u{1F50D}")&&(M.textContent=`\u{1F50D} ${l("farm.checkingStatus")}`);let R=a.status;R&&R.textContent.includes("\u{1F4A4}")&&(R.textContent=`\u{1F4A4} ${l("farm.stopped")}`)}async function q(m,w,F){return new Promise(T=>{w(l("farm.selectPositionAlert"),"info"),m.selectingPosition=!0;let L=window.fetch;window.fetch=async(B,v)=>{if(m.selectingPosition&&B.includes("/s0/pixel/"))try{let _=await L(B,v);if(_.ok&&v&&v.body){let M=JSON.parse(v.body);if(M.coords&&M.coords.length>=2){let R=M.coords[0],z=M.coords[1],A=B.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);A&&(m.TILE_X=parseInt(A[1]),m.TILE_Y=parseInt(A[2])),m.BASE_X=R,m.BASE_Y=z,m.POSITION_SELECTED=!0,m.selectingPosition=!1,window.fetch=L,F(),x(),w(l("farm.positionSet"),"success"),u(`\u2705 Zona de farming establecida: tile(${m.TILE_X},${m.TILE_Y}) base(${R},${z}) radio(${m.FARM_RADIUS}px)`),T(!0)}}return _}catch(_){return u("Error interceptando pixel:",_),L(B,v)}return L(B,v)},setTimeout(()=>{m.selectingPosition&&(window.fetch=L,m.selectingPosition=!1,w(l("farm.positionTimeout"),"error"),T(!1))},12e4)})}return window.addEventListener("languageChanged",I),{setStatus:S,updateStats:D,flashEffect:P,updateButtonStates:C,updateTexts:I,destroy:()=>{window.removeEventListener("languageChanged",I),document.body.removeChild(s)},updateConfig:c,getElement:()=>s}}async function K(e){try{u("\u{1F3AF} Iniciando auto-calibraci\xF3n del tile...");let n=new window.URLSearchParams(window.location.search),t=window.location.hash,r,s;if(n.has("x")&&n.has("y")&&(r=parseInt(n.get("x")),s=parseInt(n.get("y"))),!r&&!s&&t){let o=t.match(/#(-?\d+),(-?\d+)/);o&&(r=parseInt(o[1]),s=parseInt(o[2]))}if(!r&&!s){let o=document.querySelectorAll("[data-x], [data-y], .coordinates, .position");for(let i of o){let p=i.getAttribute("data-x")||i.getAttribute("x"),d=i.getAttribute("data-y")||i.getAttribute("y");if(p&&d){r=parseInt(p),s=parseInt(d);break}}}if(!r&&!s){let i=(document.body.textContent||"").match(/(?:tile|pos|position)?\s*[([]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);i&&(r=parseInt(i[1]),s=parseInt(i[2]))}return(!Number.isFinite(r)||!Number.isFinite(s))&&(r=0,s=0,u("\u26A0\uFE0F No se pudieron detectar coordenadas autom\xE1ticamente, usando (0,0)")),(Math.abs(r)>1e6||Math.abs(s)>1e6)&&(u("\u26A0\uFE0F Coordenadas detectadas parecen incorrectas, limitando a rango v\xE1lido"),r=Math.max(-1e6,Math.min(1e6,r)),s=Math.max(-1e6,Math.min(1e6,s))),e.TILE_X=r,e.TILE_Y=s,u(`\u2705 Tile calibrado autom\xE1ticamente: (${r}, ${s})`),{tileX:r,tileY:s,success:!0}}catch(n){return u("\u274C Error en auto-calibraci\xF3n:",n),{tileX:0,tileY:0,success:!1,error:n.message}}}var Ie=!1;async function _e(){if(!(Ie||window.turnstile))return new Promise((e,n)=>{let t=document.createElement("script");t.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",t.async=!0,t.defer=!0,t.onload=()=>{Ie=!0,e()},t.onerror=()=>n(new Error("No se pudo cargar Turnstile")),document.head.appendChild(t)})}async function Me(e,n="paint"){var t;if(await _e(),typeof((t=window.turnstile)==null?void 0:t.execute)=="function")try{let r=await window.turnstile.execute(e,{action:n});if(r&&r.length>20)return r}catch{}return await new Promise(r=>{let s=document.createElement("div");s.style.position="fixed",s.style.left="-9999px",document.body.appendChild(s),window.turnstile.render(s,{sitekey:e,callback:o=>{document.body.removeChild(s),r(o)}})})}async function ve(e){return Me(e,"paint")}var $e=e=>Math.floor(Math.random()*e);function Fe(e){if(!e.POSITION_SELECTED||e.BASE_X===null||e.BASE_Y===null){u("\u26A0\uFE0F No se ha seleccionado una posici\xF3n base. Usando coordenadas aleatorias fallback.");let d=Math.floor(e.TILE_SIZE*.05),g=e.TILE_SIZE-d*2;if(g<=0)return[Math.floor(Math.random()*e.TILE_SIZE),Math.floor(Math.random()*e.TILE_SIZE)];let a=d+Math.floor(Math.random()*g),c=d+Math.floor(Math.random()*g);return[a,c]}let n=e.FARM_RADIUS,t=Math.random()*2*Math.PI,r=Math.random()*n,s=Math.round(r*Math.cos(t)),o=Math.round(r*Math.sin(t)),i=e.BASE_X+s,p=e.BASE_Y+o;return i=Math.max(0,Math.min(e.TILE_SIZE-1,i)),p=Math.max(0,Math.min(e.TILE_SIZE-1,p)),Math.random()<.1&&u(`\u{1F3AF} Coordenadas en radio: base(${e.BASE_X},${e.BASE_Y}) radio(${n}) offset(${s},${o}) final(${i},${p})`),[i,p]}function ye(e,n){let t=[];for(let r=0;r<e;r++){let s=Fe(n);t.push(...s)}return t}function Ce(e,n){let t=[];for(let r=0;r<e;r++)t.push(Re(n));return t}function Re(e){if(e.COLOR_MODE==="fixed")return e.COLOR_FIXED;{let n=e.COLOR_MAX-e.COLOR_MIN+1;return e.COLOR_MIN+$e(n)}}var U=e=>new Promise(n=>setTimeout(n,e));async function k(e,n,t){let s=Date.now()+e;for(;Date.now()<s&&(!t||t.running);){let o=s-Date.now();n&&n(o),await U(Math.min(1e3,o))}}async function Oe(e,n,t){try{let r=document.querySelectorAll("canvas");for(let s of r){let o=s.getContext("2d");if(o){let i=typeof t=="number"?`#${t.toString(16).padStart(6,"0")}`:t;o.fillStyle=i,o.fillRect(e,n,1,1),typeof window!="undefined"&&window.Event&&s.dispatchEvent(new window.Event("pixel-updated"))}}}catch(r){u("Error actualizando canvas:",r)}}async function ze(e,n){try{let t=`[data-tile="${e}-${n}"], .tile-${e}-${n}, [data-tile-x="${e}"][data-tile-y="${n}"]`,r=document.querySelector(t);r?(r.classList.add("tile-updating"),setTimeout(()=>{r.classList.remove("tile-updating"),r.classList.add("tile-updated"),setTimeout(()=>r.classList.remove("tile-updated"),1e3)},100),u(`Tile (${e},${n}) actualizado visualmente`)):(document.querySelectorAll("canvas").forEach(o=>{let i=o.getContext("2d");if(i){let p=i.getImageData(0,0,1,1);i.putImageData(p,0,0)}}),u(`Actualizaci\xF3n visual gen\xE9rica realizada para tile (${e},${n})`))}catch(t){u("Error en actualizaci\xF3n visual del tile:",t)}}async function ke(e,n,t,r,s,o){var y,C,S,D;if(!e.POSITION_SELECTED||e.BASE_X===null||e.BASE_Y===null)return t("\u{1F3AF} Selecciona una zona primero usando 'Seleccionar Zona'","error"),u("Pintado cancelado: no se ha seleccionado una posici\xF3n base"),!1;if(!Number.isFinite(e.TILE_X)||!Number.isFinite(e.TILE_Y))return t(`\u{1F6AB} Coordenadas del tile inv\xE1lidas (${e.TILE_X},${e.TILE_Y}). Calibra primero`,"error"),u("Pintado cancelado: coordenadas del tile inv\xE1lidas"),!1;let i=Math.floor(n.charges.count);if(i<1)return t("\u{1F50B} Sin cargas disponibles. Esperando...","error"),!1;let p=Math.min(i,e.PIXELS_PER_BATCH,50),d=Math.max(1,p);d<e.PIXELS_PER_BATCH&&u(`Ajustando p\xEDxeles por cargas completas disponibles: ${d}/${e.PIXELS_PER_BATCH} (${i} cargas completas de ${n.charges.count.toFixed(2)} totales)`);let g=ye(d,e),a=Ce(d,e),c=g[0],h=g[1];t(`\uFFFD Farming ${d} p\xEDxeles en radio ${e.FARM_RADIUS}px desde (${e.BASE_X},${e.BASE_Y}) tile(${e.TILE_X},${e.TILE_Y})...`,"status");let E=await ve(e.SITEKEY),x=await fe(g,a,E,e.TILE_X,e.TILE_Y);if(n.last={x:c,y:h,color:a[0],pixelCount:d,availableCharges:i,status:x.status,json:x.json},x.status===200&&x.json&&(x.json.painted>0||x.json.painted===d)){let P=x.json.painted||d;n.painted+=P,n.retryCount=0;for(let I=0;I<g.length;I+=2){let q=g[I],X=g[I+1],Y=a[Math.floor(I/2)];await Oe(q,X,Y)}if(await ze(e.TILE_X,e.TILE_Y),await s(),t(`\u2705 Lote pintado: ${P}/${d} p\xEDxeles en zona (${e.BASE_X},${e.BASE_Y}) radio ${e.FARM_RADIUS}px`,"success"),r(),typeof window!="undefined"&&window.CustomEvent){let I=new window.CustomEvent("wplace-batch-painted",{detail:{firstX:c,firstY:h,pixelCount:P,totalPixels:d,colors:a,coords:g,tileX:e.TILE_X,tileY:e.TILE_Y,baseX:e.BASE_X,baseY:e.BASE_Y,radius:e.FARM_RADIUS,timestamp:Date.now()}});window.dispatchEvent(I)}return!0}if(x.status===403)t("\u26A0\uFE0F 403 (token expirado o Cloudflare). Reintentar\xE1...","error");else if(x.status===401)t("\u{1F512} 401 (no autorizado). Verifica tu sesi\xF3n.","error");else if(x.status===429)t("\u23F3 429 (l\xEDmite de tasa). Esperando...","error");else if(x.status===408)t("\u23F0 Timeout del servidor. Coordenadas problem\xE1ticas o servidor sobrecargado","error");else if(x.status===0)t("\u{1F310} Error de red. Verificando conectividad...","error");else if(x.status===500)t("\u{1F525} 500 (error interno del servidor). Reintentar\xE1...","error");else if(x.status===502||x.status===503||x.status===504)t(`\u{1F6AB} ${x.status} (servidor no disponible). Reintentar\xE1...`,"error");else if(x.status===404)t(`\u{1F5FA}\uFE0F 404 (tile no encontrado). Verificando coordenadas tile(${e.TILE_X},${e.TILE_Y})`,"error");else try{let P=await o(),I=P!=null&&P.up?"\u{1F7E2} Online":"\u{1F534} Offline";t(`\u274C Error ${x.status}: ${((y=x.json)==null?void 0:y.message)||((C=x.json)==null?void 0:C.error)||"Fallo al pintar"} (Backend: ${I})`,"error")}catch{t(`\u274C Error ${x.status}: ${((S=x.json)==null?void 0:S.message)||((D=x.json)==null?void 0:D.error)||"Fallo al pintar"} (Health check fall\xF3)`,"error")}return u(`Fallo en pintado: status=${x.status}, json=`,x.json,"coords=",g,"colors=",a),!1}async function J(e,n,t,r,s,o){for(let d=1;d<=5;d++)try{if(await ke(e,n,t,r,s,o))return n.retryCount=0,!0;if(n.retryCount=d,d<5){let a=3e3*Math.pow(2,d-1);t(`\u{1F504} Reintento ${d}/5 en ${a/1e3}s...`,"error"),await U(a)}}catch(g){if(u(`Error en intento ${d}:`,g),n.retryCount=d,d<5){let a=3e3*Math.pow(2,d-1);t(`\u{1F4A5} Error en intento ${d}/5, reintentando en ${a/1e3}s...`,"error"),await U(a)}}return n.retryCount=5,t("\u274C Fall\xF3 despu\xE9s de 5 intentos. Se requiere intervenci\xF3n manual.","error"),!1}async function Se(e,n,t,r,s,o,i){for(u("\u{1F680} Loop iniciado"),n.running=!0;n.running;)try{if(await i(),n.charges.count<e.MIN_CHARGES){let d=Math.max(0,(e.MIN_CHARGES-n.charges.count)*e.CHARGE_REGEN_MS);t(`\u23F3 Esperando cargas: ${n.charges.count.toFixed(1)}/${e.MIN_CHARGES} (${Math.round(d/1e3)}s)`,"status"),await k(Math.min(d,e.DELAY_MS),g=>{t(`\u23F3 Esperando cargas: ${n.charges.count.toFixed(1)}/${e.MIN_CHARGES} (~${Math.round(g/1e3)}s)`,"status")},n);continue}if(!await J(e,n,t,r,s,o)){t("\u{1F634} Esperando antes del siguiente intento...","error"),await k(e.DELAY_MS*2,d=>{t(`\u{1F634} Cooldown extendido: ${Math.round(d/1e3)}s`,"error")});continue}n.running&&await k(e.DELAY_MS,d=>{t(`\u{1F4A4} Esperando ${Math.round(d/1e3)}s hasta siguiente pintada...`,"status")})}catch(p){u("Error cr\xEDtico en loop:",p),t(`\u{1F4A5} Error cr\xEDtico: ${p.message}`,"error"),n.running&&await k(e.DELAY_MS*3,d=>{t(`\u{1F6A8} Recuper\xE1ndose de error cr\xEDtico: ${Math.round(d/1e3)}s`,"error")})}u("\u23F9\uFE0F Loop detenido"),t("\u23F9\uFE0F Bot detenido","status")}var Q=class{constructor(){this.active=!1,this.originalFetch=window.fetch,this.callback=null}enable(n){if(this.active){u("\u26A0\uFE0F Captura ya est\xE1 activa");return}this.active=!0,this.callback=n,u("\u{1F575}\uFE0F Captura de coordenadas activada. Pinta un p\xEDxel manualmente..."),window.fetch=async(...t)=>{let r=await this.originalFetch.apply(window,t);return this.active&&this.shouldCapture(t[0],t[1])&&await this.handleCapture(t[0],t[1],r.clone()),r},setTimeout(()=>{this.active&&(this.disable(),u("\u23F0 Captura de coordenadas expirada"))},3e4)}shouldCapture(n,t){if(!n||!t)return!1;let r=n.toString();return!(!r.includes("paint")&&!r.includes("pixel")&&!r.includes("place")||!t.method||t.method.toUpperCase()!=="POST")}async handleCapture(n,t,r){try{let s=null,o=null,i=null;if(t.body){let p;if(typeof t.body=="string")try{p=JSON.parse(t.body)}catch{p=t.body}else p=t.body;p.coords&&Array.isArray(p.coords)?s=p.coords:p.x!==void 0&&p.y!==void 0?s=[p.x,p.y]:p.coordinates&&(s=p.coordinates)}if(!s){let d=n.toString().match(/[?&](?:x|coords?)=([^&]+)/);if(d){let g=decodeURIComponent(d[1]);try{s=JSON.parse(g)}catch{let a=g.split(",");a.length>=2&&(s=[parseInt(a[0]),parseInt(a[1])])}}}if(s&&s.length>=2){let p=s[0],d=s[1];o=Math.floor(p/3e3),i=Math.floor(d/3e3),u(`\u{1F3AF} Coordenadas capturadas: global(${p},${d}) -> tile(${o},${i})`),r.ok?(this.disable(),this.callback&&this.callback({success:!0,tileX:o,tileY:i,globalX:p,globalY:d,localX:p%3e3,localY:d%3e3})):u("\u26A0\uFE0F Captura realizada pero la respuesta no fue exitosa")}}catch(s){u("Error procesando captura:",s)}}disable(){this.active&&(this.active=!1,window.fetch=this.originalFetch,this.callback=null,u("\u{1F512} Captura de coordenadas desactivada"))}},ee=new Q;(async function(){"use strict";var g,a;if(await V(),(g=window.__wplaceBot)!=null&&g.farmRunning){alert(l("farm.alreadyRunning","Auto-Farm ya est\xE1 corriendo."));return}if((a=window.__wplaceBot)!=null&&a.imageRunning){alert(l("farm.imageRunningWarning","Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm."));return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.farmRunning=!0,window.addEventListener("languageChanged",()=>{var c,h;(h=(c=window.__wplaceBot)==null?void 0:c.ui)!=null&&h.updateTexts&&window.__wplaceBot.ui.updateTexts()}),u("\u{1F680} Iniciando WPlace Farm Bot (versi\xF3n modular)");function e(c){let h=c.TILE_X===b.TILE_X&&c.TILE_Y===b.TILE_Y,E=!0,x=!Number.isFinite(c.TILE_X)||!Number.isFinite(c.TILE_Y),y=h||E||x;return u(`Verificaci\xF3n calibraci\xF3n: defaults=${h}, noConfig=${E}, invalid=${x}, coords=(${c.TILE_X},${c.TILE_Y})`),y}function n(){u("\u{1F575}\uFE0F Activando captura de coordenadas..."),ee.enable(c=>{c.success?(t.TILE_X=c.tileX,t.TILE_Y=c.tileY,i.updateConfig(),i.setStatus(`\u{1F3AF} Coordenadas capturadas: tile(${c.tileX},${c.tileY})`,"success"),u(`\u2705 Coordenadas capturadas autom\xE1ticamente: tile(${c.tileX},${c.tileY})`)):i.setStatus(`\u274C ${l("common.error","No se pudieron capturar coordenadas")}`,"error")}),i.setStatus(`\u{1F4F8} ${l("farm.captureInstructions")}`,"status")}let t={...b,...H(b)};if(!t.SITEKEY){let c=document.querySelector("*[data-sitekey]");c?(t.SITEKEY=c.getAttribute("data-sitekey"),u(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${t.SITEKEY.substring(0,20)}...`),void 0):u("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function r(){try{let c=await j();if(c.success&&c.data){f.charges.count=c.data.charges||0,f.charges.max=c.data.maxCharges||50,f.charges.regen=c.data.chargeRegen||3e4,f.user=c.data.user,t.CHARGE_REGEN_MS=f.charges.regen;let h=await s();return f.health=h,i.updateStats(f.painted,f.charges.count,f.retryCount,h),c.data}return null}catch(c){return u("Error actualizando estad\xEDsticas:",c),null}}async function s(){try{return await ge()}catch(c){return u("Error verificando health:",c),{up:!1,error:c.message}}}async function o(){return await J(t,f,i.setStatus,i.flashEffect,()=>j(),s)}let i=be(t,async()=>{if(f.running){i.setStatus("\u26A0\uFE0F El bot ya est\xE1 ejecut\xE1ndose","error");return}if(!t.POSITION_SELECTED||t.BASE_X===null||t.BASE_Y===null){i.setStatus(l("farm.autoSelectPosition"),"info");let E=i.getElement().shadowRoot.getElementById("select-position-btn");E&&E.click();return}if(e(t)){i.setStatus("\u{1F3AF} Calibrando autom\xE1ticamente...","status");let E=await K(t);if(E.success)i.setStatus(`\u2705 Calibrado: tile(${E.tileX},${E.tileY})`,"success"),i.updateConfig();else{i.setStatus("\u274C Error en calibraci\xF3n. Configura manualmente.","error");return}}if(i.setStatus("\u{1F50D} Verificando conectividad...","status"),!(await s()).up){i.setStatus("\u{1F534} Backend no disponible. Verifica tu conexi\xF3n.","error");return}if(i.setStatus("\u{1F504} Obteniendo informaci\xF3n de sesi\xF3n...","status"),!await r()){i.setStatus("\u274C Error obteniendo sesi\xF3n. Verifica tu login.","error");return}i.setStatus("\u{1F680} Iniciando bot...","status"),i.updateButtonStates(!0),Se(t,f,i.setStatus,i.flashEffect,r,s,r)},()=>{f.running=!1,window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),i.setStatus("\u23F9\uFE0F Deteniendo bot...","status"),i.updateButtonStates(!1)},async()=>{i.setStatus("\u{1F3AF} Calibrando posici\xF3n...","status");let c=await K(t);c.success?(i.setStatus(`\u2705 Calibrado: tile(${c.tileX},${c.tileY})`,"success"),i.updateConfig()):i.setStatus(`\u274C Error en calibraci\xF3n: ${c.error||"Desconocido"}`,"error")}),p=i.getElement().shadowRoot.getElementById("capture-btn");p&&p.addEventListener("click",n);let d=i.getElement().shadowRoot.getElementById("once-btn");d&&d.addEventListener("click",async()=>{if(f.running){i.setStatus("\u26A0\uFE0F Det\xE9n el bot primero","error");return}await r(),i.setStatus("\u{1F3A8} Pintando una vez...","status"),await o()?i.setStatus("\u2705 P\xEDxel pintado exitosamente","success"):i.setStatus("\u274C Error al pintar p\xEDxel","error")}),await r(),window.addEventListener("wplace-batch-painted",c=>{u(`\u{1F3A8} Lote pintado: ${c.detail.pixelCount} p\xEDxeles en tile(${c.detail.tileX},${c.detail.tileY})`)}),window.WPAUI={once:o,get:()=>({...t}),capture:n,refreshCanvas:()=>{f.last&&u(`Refrescando canvas en posici\xF3n (${f.last.x},${f.last.y})`)},verifyPixel:async(c,h)=>(u(`Verificando p\xEDxel en (${c},${h})...`),{verified:!0,x:c,y:h}),getStats:()=>({painted:f.painted,last:f.last,charges:f.charges,user:f.user,running:f.running,minCharges:t.MIN_CHARGES,delay:t.DELAY_MS,tileInfo:{tileX:t.TILE_X,tileY:t.TILE_Y,tileSize:t.TILE_SIZE,safeMargin:Math.floor(t.TILE_SIZE*.05),safeArea:{minX:Math.floor(t.TILE_SIZE*.05),maxX:t.TILE_SIZE-Math.floor(t.TILE_SIZE*.05)-1,minY:Math.floor(t.TILE_SIZE*.05),maxY:t.TILE_SIZE-Math.floor(t.TILE_SIZE*.05)-1}}}),setPixelsPerBatch:c=>{t.PIXELS_PER_BATCH=$(c,1,50),i.updateConfig(),u(`P\xEDxeles por lote configurado a: ${t.PIXELS_PER_BATCH}`)},setMinCharges:c=>{t.MIN_CHARGES=Math.max(0,c),i.updateConfig(),u(`Cargas m\xEDnimas configuradas a: ${t.MIN_CHARGES}`)},setDelay:c=>{t.DELAY_MS=Math.max(1e3,c*1e3),i.updateConfig(),u(`Delay configurado a: ${t.DELAY_MS}ms`)},diagnose:()=>{var E;let c=window.WPAUI.getStats(),h={configValid:Number.isFinite(t.TILE_X)&&Number.isFinite(t.TILE_Y),hasCharges:f.charges.count>0,backendHealthy:((E=f.health)==null?void 0:E.up)||!1,userLoggedIn:!!f.user,coordinates:`(${t.TILE_X},${t.TILE_Y})`,safeArea:c.tileInfo.safeArea,recommendations:[]};return h.configValid||h.recommendations.push("Calibrar coordenadas del tile"),h.hasCharges||h.recommendations.push("Esperar a que se regeneren las cargas"),h.backendHealthy||h.recommendations.push("Verificar conexi\xF3n al backend"),h.userLoggedIn||h.recommendations.push("Iniciar sesi\xF3n en la plataforma"),console.table(h),h},checkHealth:s,resetConfig:()=>{me(),t={...b},i.updateConfig(),u("Configuraci\xF3n reseteada a valores por defecto")},debugRetries:()=>({currentRetries:f.retryCount,inCooldown:f.inCooldown,nextPaintTime:f.nextPaintTime,cooldownEndTime:f.cooldownEndTime}),forceClearCooldown:()=>{f.inCooldown=!1,f.nextPaintTime=0,f.cooldownEndTime=0,f.retryCount=0,u("Cooldown forzado a limpiar")},simulateError:(c=500)=>{u(`Simulando error ${c} para testing...`),i.setStatus(`\u{1F9EA} Simulando error ${c}`,"error")}},window.addEventListener("beforeunload",()=>{f.running=!1,window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),ee.disable(),i.destroy()}),u("\u2705 Farm Bot inicializado correctamente"),u("\u{1F4A1} Usa console.log(window.WPAUI) para ver la API disponible")})().catch(e=>{console.error("[BOT] Error en Auto-Farm:",e),window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),alert("Auto-Farm: error inesperado. Revisa consola.")});})();
