/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T20:18:10.037Z */
(()=>{var g=(...n)=>console.log("[WPA-UI]",...n);var X={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var U={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var j={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var B={es:X,en:U,fr:j},M="es",k=B[M];function de(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return B[a]?a:"es"}function ge(){return null}function q(){let n=ge(),a=de(),l="es";return n&&B[n]?l=n:a&&B[a]&&(l=a),ue(l),l}function ue(n){if(!B[n]){console.warn(`Idioma '${n}' no disponible. Usando '${M}'`);return}M=n,k=B[n],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:n,translations:k}}))}function W(){return M}function m(n,a={}){let l=n.split("."),s=k;for(let i of l)if(s&&typeof s=="object"&&i in s)s=s[i];else return console.warn(`Clave de traducci\xF3n no encontrada: '${n}'`),n;return typeof s!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${n}'`),n):pe(s,a)}function pe(n,a){return!a||Object.keys(a).length===0?n:n.replace(/\{(\w+)\}/g,(l,s)=>a[s]!==void 0?a[s]:l)}function Y(n){return k[n]?k[n]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${n}'`),{})}q();var S={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:S.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:S.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:50,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null};var O=class{constructor(a){this.imageSrc=a,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((a,l)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),a()},this.img.onerror=l,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(a,l){let s=document.createElement("canvas");return s.width=a,s.height=l,s.getContext("2d").drawImage(this.img,0,0,a,l),this.canvas.width=a,this.canvas.height=l,this.ctx.drawImage(s,0,0),this.getPixelData()}generatePreview(a,l){return this.previewCanvas.width=a,this.previewCanvas.height=l,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,a,l),this.previewCanvas.toDataURL()}getImageData(){let{width:a,height:l}=this.getDimensions(),s=this.getPixelData();return{width:a,height:l,pixels:s,originalName:this.originalName||"image.png"}}processImage(a,l){let{width:s,height:i}=this.getDimensions(),t=this.getPixelData(),u=[],r=0;for(let c=0;c<i;c++)for(let d=0;d<s;d++){let o=(c*s+d)*4,p=t[o],f=t[o+1],x=t[o+2],w=t[o+3];if(w<l.TRANSPARENCY_THRESHOLD||p>l.WHITE_THRESHOLD&&f>l.WHITE_THRESHOLD&&x>l.WHITE_THRESHOLD)continue;let v=this.findClosestColor({r:p,g:f,b:x},a);v&&(u.push({x:d,y:c,originalColor:{r:p,g:f,b:x,alpha:w},targetColor:v}),r++)}return{width:s,height:i,pixels:u,validPixelCount:r,originalName:this.originalName||"image.png"}}findClosestColor(a,l){if(!l||l.length===0)return null;let s=null,i=1/0;for(let t of l){let u=Math.sqrt(Math.pow(a.r-t.r,2)+Math.pow(a.g-t.g,2)+Math.pow(a.b-t.b,2));u<i&&(i=u,s=t)}return s}};function H(){g("\u{1F3A8} Detectando colores disponibles...");let n=document.querySelectorAll('[id^="color-"]'),a=[];for(let l of n){if(l.querySelector("svg"))continue;let s=l.id.replace("color-",""),i=parseInt(s);if(i===0||i===5)continue;let t=l.style.backgroundColor;if(t){let u=t.match(/\d+/g);if(u&&u.length>=3){let r={r:parseInt(u[0]),g:parseInt(u[1]),b:parseInt(u[2])};a.push({id:i,element:l,...r}),g(`Color detectado: id=${i}, rgb(${r.r},${r.g},${r.b})`)}}}return g(`\u2705 ${a.length} colores disponibles detectados`),a}var $=n=>new Promise(a=>setTimeout(a,n));var V="https://backend.wplace.live";async function G(){var n,a,l;try{let s=await fetch(`${V}/me`,{credentials:"include"}).then(r=>r.json()),i=s||null,t=(s==null?void 0:s.charges)||{},u={count:(n=t.count)!=null?n:0,max:(a=t.max)!=null?a:0,cooldownMs:(l=t.cooldownMs)!=null?l:3e4};return{success:!0,data:{user:i,charges:u.count,maxCharges:u.max,chargeRegen:u.cooldownMs}}}catch(s){return{success:!1,error:s.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function Z(n,a,l,s,i){try{let t=JSON.stringify({colors:s,coords:l,t:i}),u=await fetch(`${V}/s0/pixel/${n}/${a}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:t}),r=null;try{r=await u.json()}catch{r={}}return{status:u.status,json:r,success:u.ok,painted:(r==null?void 0:r.painted)||0}}catch(t){return{status:0,json:{error:t.message},success:!1,painted:0}}}var K=!1;async function me(){if(!(K||window.turnstile))return new Promise((n,a)=>{let l=document.createElement("script");l.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",l.async=!0,l.defer=!0,l.onload=()=>{K=!0,n()},l.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(l)})}async function he(n,a="paint"){var l;if(await me(),typeof((l=window.turnstile)==null?void 0:l.execute)=="function")try{let s=await window.turnstile.execute(n,{action:a});if(s&&s.length>20)return s}catch{}return await new Promise(s=>{let i=document.createElement("div");i.style.position="fixed",i.style.left="-9999px",document.body.appendChild(i),window.turnstile.render(i,{sitekey:n,callback:t=>{document.body.removeChild(i),s(t)}})})}async function J(n){return he(n,"paint")}async function Q(n,a,l,s,i){let{width:t,height:u}=n,{x:r,y:c}=a;g(`Iniciando pintado: imagen(${t}x${u}) inicio LOCAL(${r},${c}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(g("Generando cola de p\xEDxeles..."),e.remainingPixels=be(n,a,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(d=>{let o=d.imageY*t+d.imageX,p=e.lastPosition.y*t+e.lastPosition.x;return o>=p})),g(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let d=Math.floor(e.currentCharges),o;if(e.isFirstBatch&&e.useAllChargesFirst&&d>0?(o=Math.min(d,e.remainingPixels.length),e.isFirstBatch=!1,g(`Primera pasada: usando ${o} cargas de ${d} disponibles`)):o=Math.min(e.pixelsPerBatch,e.remainingPixels.length),d<o){g(`Cargas insuficientes: ${d}/${o} necesarias`),await xe(o-d,l),d=Math.floor(e.currentCharges),e.isFirstBatch||(o=Math.min(e.pixelsPerBatch,e.remainingPixels.length,d));continue}let p=e.remainingPixels.splice(0,o);g(`Pintando lote de ${p.length} p\xEDxeles...`);let f=await fe(p);if(f.success&&f.painted>0){if(e.paintedPixels+=f.painted,e.currentCharges=Math.max(0,e.currentCharges-f.painted),g(`Cargas despu\xE9s del lote: ${e.currentCharges.toFixed(1)} (consumidas: ${f.painted})`),p.length>0){let v=p[p.length-1];e.lastPosition={x:v.imageX,y:v.imageY}}g(`Lote exitoso: ${f.painted}/${p.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`);let x=Pe(),w=(e.paintedPixels/e.totalPixels*100).toFixed(1),P=m("image.passCompleted",{painted:f.painted,percent:w,current:e.paintedPixels,total:e.totalPixels});l&&l(e.paintedPixels,e.totalPixels,P,x),await $(2e3)}else e.remainingPixels.unshift(...p),g("Lote fall\xF3: reintentando en 5 segundos..."),await $(5e3);await $(500)}e.stopFlag?(g(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),s&&s(!1,e.paintedPixels)):(g(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],s&&s(!0,e.paintedPixels))}catch(d){g("Error en proceso de pintado:",d),i&&i(d)}}async function fe(n){var a;try{if(!n||n.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let l=[],s=[],i=null,t=null;for(let c of n)l.push(c.localX,c.localY),s.push(c.color.id||c.color.value||1),i===null&&(i=c.tileX,t=c.tileY);let u=await J(S.SITEKEY),r=await Z(i,t,l,s,u);return r.status===200?{success:!0,painted:r.painted,response:r.json}:{success:!1,painted:0,error:((a=r.json)==null?void 0:a.message)||`HTTP ${r.status}`,status:r.status}}catch(l){return g("Error en paintPixelBatch:",l),{success:!1,painted:0,error:l.message}}}async function xe(n,a){let s=S.CHARGE_REGEN_MS*n+5e3;if(g(`Esperando ${Math.round(s/1e3)}s para obtener ${n} cargas`),e.inCooldown=!0,e.cooldownEndTime=Date.now()+s,e.nextBatchCooldown=Math.round(s/1e3),a){let i=Math.floor(s/6e4),t=Math.floor(s%6e4/1e3),u=i>0?`${i}m ${t}s`:`${t}s`,r=m("image.waitingChargesRegen",{current:Math.floor(e.currentCharges),needed:n,time:u});a(e.paintedPixels,e.totalPixels,r)}for(let i=Math.round(s/1e3);i>0&&!e.stopFlag;i--){if(e.nextBatchCooldown=i,a&&(i%5===0||i<=10||i===Math.round(s/1e3))){let t=Math.floor(i/60),u=i%60,r=t>0?`${t}m ${u}s`:`${u}s`,c=m("image.waitingChargesCountdown",{current:Math.floor(e.currentCharges),needed:n,time:r});a(e.paintedPixels,e.totalPixels,c)}await $(1e3)}e.inCooldown=!1,e.nextBatchCooldown=0,e.currentCharges=Math.min(e.maxCharges||50,e.currentCharges+s/S.CHARGE_REGEN_MS)}function be(n,a,l,s){let{pixels:i}=n,{x:t,y:u}=a,r=[];for(let c of i){let d=t+c.x,o=u+c.y;r.push({imageX:c.x,imageY:c.y,localX:d,localY:o,tileX:l,tileY:s,color:c.targetColor,originalColor:c.originalColor})}return g(`Cola de p\xEDxeles generada: ${r.length} p\xEDxeles para pintar`),r}function Pe(){if(!e.remainingPixels||e.remainingPixels.length===0)return 0;let n=e.remainingPixels.length,a=e.pixelsPerBatch,l=S.CHARGE_REGEN_MS/1e3,s=Math.ceil(n/a),i=a*l,t=(s-1)*i,u=s*2;return Math.ceil(t+u)}function N(){e.stopFlag=!0,e.running=!1,g("\u{1F6D1} Deteniendo proceso de pintado...")}function _(n=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let a={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch,useAllChargesFirst:e.useAllChargesFirst,isFirstBatch:e.isFirstBatch,maxCharges:e.maxCharges},colors:e.availableColors.map(r=>({id:r.id,r:r.r,g:r.g,b:r.b})),remainingPixels:e.remainingPixels||[]},l=JSON.stringify(a,null,2),s=new window.Blob([l],{type:"application/json"}),i=n||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,t=window.URL.createObjectURL(s),u=document.createElement("a");return u.href=t,u.download=i,document.body.appendChild(u),u.click(),document.body.removeChild(u),window.URL.revokeObjectURL(t),g(`\u2705 Progreso guardado: ${i}`),{success:!0,filename:i}}catch(a){return g("\u274C Error guardando progreso:",a),{success:!1,error:a.message}}}async function te(n){return new Promise(a=>{try{let l=new window.FileReader;l.onload=s=>{try{let i=JSON.parse(s.target.result),u=["imageData","progress","position","colors"].filter(r=>!(r in i));if(u.length>0)throw new Error(`Campos requeridos faltantes: ${u.join(", ")}`);if(e.availableColors.length>0){let r=i.colors.map(o=>o.id),c=e.availableColors.map(o=>o.id);r.filter(o=>c.includes(o)).length<r.length*.8&&g("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...i.imageData,pixels:[]},e.paintedPixels=i.progress.paintedPixels,e.totalPixels=i.progress.totalPixels,i.progress.lastPosition?e.lastPosition=i.progress.lastPosition:i.position.lastX!==void 0&&i.position.lastY!==void 0&&(e.lastPosition={x:i.position.lastX,y:i.position.lastY}),i.position.startPosition?e.startPosition=i.position.startPosition:i.position.startX!==void 0&&i.position.startY!==void 0&&(e.startPosition={x:i.position.startX,y:i.position.startY}),e.tileX=i.position.tileX,e.tileY=i.position.tileY,e.originalImageName=i.imageData.originalName,e.remainingPixels=i.remainingPixels||i.progress.remainingPixels||[],i.config&&(e.pixelsPerBatch=i.config.pixelsPerBatch||e.pixelsPerBatch,e.useAllChargesFirst=i.config.useAllChargesFirst!==void 0?i.config.useAllChargesFirst:e.useAllChargesFirst,e.isFirstBatch=i.config.isFirstBatch!==void 0?i.config.isFirstBatch:!0,e.maxCharges=i.config.maxCharges||e.maxCharges),e.imageLoaded=!0,e.colorsChecked=!0,g(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),a({success:!0,data:i,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(i){g("\u274C Error parseando archivo de progreso:",i),a({success:!1,error:i.message})}},l.onerror=()=>{let s="Error leyendo archivo";g("\u274C",s),a({success:!1,error:s})},l.readAsText(n)}catch(l){g("\u274C Error cargando progreso:",l),a({success:!1,error:l.message})}})}function ae(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,e.isFirstBatch=!0,e.nextBatchCooldown=0,g("\u{1F9F9} Progreso limpiado")}function ee(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function ie(){return{hasProgress:ee(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:ee()}}function ne(n=null){let a=document.createElement("div");n&&(a.id=n),a.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let l=a.attachShadow({mode:"open"});return document.body.appendChild(a),{host:a,root:l}}function oe(n,a){let l=0,s=0,i=0,t=0;n.style.cursor="move",n.addEventListener("mousedown",u);function u(d){d.target.closest(".header-btn, .wplace-header-btn")||(d.preventDefault(),i=d.clientX,t=d.clientY,document.addEventListener("mouseup",c),document.addEventListener("mousemove",r))}function r(d){d.preventDefault(),l=i-d.clientX,s=t-d.clientY,i=d.clientX,t=d.clientY,a.style.top=a.offsetTop-s+"px",a.style.left=a.offsetLeft-l+"px"}function c(){document.removeEventListener("mouseup",c),document.removeEventListener("mousemove",r)}}async function re({texts:n,...a}){if(g("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let h=document.createElement("link");h.rel="stylesheet",h.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(h),g("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:l,root:s}=ne(),i=document.createElement("style");i.textContent=`
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
  `,s.appendChild(i);let t=document.createElement("div");t.className="container",t.innerHTML=`
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
  `,s.appendChild(t);let u=document.createElement("input");u.type="file",u.accept="image/png,image/jpeg",u.style.display="none",s.appendChild(u);let r=document.createElement("input");r.type="file",r.accept=".json",r.style.display="none",s.appendChild(r);let c=document.createElement("div");c.className="resize-overlay",s.appendChild(c);let d=document.createElement("div");d.className="resize-container",d.innerHTML=`
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
  `,s.appendChild(d);let o={header:t.querySelector(".header"),configBtn:t.querySelector(".config-btn"),minimizeBtn:t.querySelector(".minimize-btn"),configPanel:t.querySelector(".config-panel"),pixelsPerBatch:t.querySelector(".pixels-per-batch"),useAllCharges:t.querySelector(".use-all-charges"),batchValue:t.querySelector(".batch-value"),cooldownValue:t.querySelector(".cooldown-value"),initBtn:t.querySelector(".init-btn"),uploadBtn:t.querySelector(".upload-btn"),loadProgressBtn:t.querySelector(".load-progress-btn"),resizeBtn:t.querySelector(".resize-btn"),selectPosBtn:t.querySelector(".select-pos-btn"),startBtn:t.querySelector(".start-btn"),stopBtn:t.querySelector(".stop-btn"),progressBar:t.querySelector(".progress-bar"),statsArea:t.querySelector(".stats-area"),status:t.querySelector(".status"),content:t.querySelector(".content")},p={overlay:c,container:d,widthSlider:d.querySelector(".width-slider"),heightSlider:d.querySelector(".height-slider"),widthValue:d.querySelector(".width-value"),heightValue:d.querySelector(".height-value"),keepAspect:d.querySelector(".keep-aspect"),preview:d.querySelector(".resize-preview"),confirmBtn:d.querySelector(".confirm-resize"),cancelBtn:d.querySelector(".cancel-resize")},f={minimized:!1,configVisible:!1};oe(o.header,t),o.minimizeBtn.addEventListener("click",()=>{f.minimized=!f.minimized,f.minimized?(t.classList.add("minimized"),o.minimizeBtn.innerHTML="\u{1F53C}"):(t.classList.remove("minimized"),o.minimizeBtn.innerHTML="\u{1F53D}")}),o.configBtn.addEventListener("click",()=>{f.configVisible=!f.configVisible,f.configVisible?(o.configPanel.classList.add("visible"),o.configBtn.innerHTML="\u274C"):(o.configPanel.classList.remove("visible"),o.configBtn.innerHTML="\u2699\uFE0F")}),o.pixelsPerBatch.addEventListener("change",()=>{let h=parseInt(o.pixelsPerBatch.value)||20;o.batchValue.textContent=h,a.onConfigChange&&a.onConfigChange({pixelsPerBatch:h})}),o.useAllCharges.addEventListener("change",()=>{a.onConfigChange&&a.onConfigChange({useAllCharges:o.useAllCharges.checked})}),o.initBtn.addEventListener("click",async()=>{o.initBtn.disabled=!0,a.onInitBot&&await a.onInitBot()&&(o.uploadBtn.disabled=!1,o.loadProgressBtn.disabled=!1),o.initBtn.disabled=!1}),o.uploadBtn.addEventListener("click",()=>{u.click()}),u.addEventListener("change",async()=>{u.files.length>0&&a.onUploadImage&&await a.onUploadImage(u.files[0])&&(o.selectPosBtn.disabled=!1,o.resizeBtn.disabled=!1)}),o.loadProgressBtn.addEventListener("click",()=>{r.click()}),r.addEventListener("change",async()=>{r.files.length>0&&a.onLoadProgress&&await a.onLoadProgress(r.files[0])&&(o.selectPosBtn.disabled=!1,o.startBtn.disabled=!1,o.resizeBtn.disabled=!1)}),o.resizeBtn.addEventListener("click",()=>{a.onResizeImage&&a.onResizeImage()}),o.selectPosBtn.addEventListener("click",async()=>{a.onSelectPosition&&(o.selectPosBtn.disabled=!0,await a.onSelectPosition()&&(o.startBtn.disabled=!1),o.selectPosBtn.disabled=!1)}),o.startBtn.addEventListener("click",async()=>{a.onStartPainting&&(o.startBtn.disabled=!0,o.stopBtn.disabled=!1,await a.onStartPainting()||(o.startBtn.disabled=!1,o.stopBtn.disabled=!0))}),o.stopBtn.addEventListener("click",async()=>{a.onStopPainting&&await a.onStopPainting()&&(o.startBtn.disabled=!1,o.stopBtn.disabled=!0)});function x(h,C="default"){o.status.textContent=h,o.status.className=`status status-${C}`,o.status.style.animation="none",o.status.offsetWidth,o.status.style.animation="slideIn 0.3s ease-out"}function w(h){let{width:C,height:b}=h.getDimensions(),T=C/b;p.widthSlider.value=C,p.heightSlider.value=b,p.widthValue.textContent=C,p.heightValue.textContent=b,p.preview.src=h.img.src,p.overlay.style.display="block",p.container.style.display="block";let y=()=>{let E=parseInt(p.widthSlider.value),I=parseInt(p.heightSlider.value);p.widthValue.textContent=E,p.heightValue.textContent=I,p.preview.src=h.generatePreview(E,I)},L=()=>{if(p.keepAspect.checked){let E=parseInt(p.widthSlider.value),I=Math.round(E/T);p.heightSlider.value=I}y()},z=()=>{if(p.keepAspect.checked){let E=parseInt(p.heightSlider.value),I=Math.round(E*T);p.widthSlider.value=I}y()};p.widthSlider.addEventListener("input",L),p.heightSlider.addEventListener("input",z);let D=()=>{let E=parseInt(p.widthSlider.value),I=parseInt(p.heightSlider.value);a.onConfirmResize&&a.onConfirmResize(h,E,I),P()},F=()=>{P()};p.confirmBtn.addEventListener("click",D),p.cancelBtn.addEventListener("click",F),p.overlay.addEventListener("click",F),window.cleanupResizeDialog=()=>{p.widthSlider.removeEventListener("input",L),p.heightSlider.removeEventListener("input",z),p.confirmBtn.removeEventListener("click",D),p.cancelBtn.removeEventListener("click",F),p.overlay.removeEventListener("click",F)},y()}function P(){p.overlay.style.display="none",p.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function v(h,C,b=null){let T=C>0?h/C*100:0;o.progressBar.style.width=`${T}%`;let y=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${n.progress}</div>
        <div>${h}/${C} (${T.toFixed(1)}%)</div>
      </div>
    `;if(b&&(b.username&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${b.username}</div>
          </div>
        `),b.charges!==void 0&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${n.charges}</div>
            <div>${Math.floor(b.charges)}</div>
          </div>
        `),b.pixels!==void 0&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${n.pixels}</div>
            <div>${b.pixels.toLocaleString()}</div>
          </div>
        `),b.estimatedTime!==void 0&&b.estimatedTime>0)){let L=Math.floor(b.estimatedTime/3600),z=Math.floor(b.estimatedTime%3600/60),D=L>0?`${L}h ${z}m`:`${z}m`;y+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${n.timeRemaining}</div>
            <div>${D}</div>
          </div>
        `}o.statsArea.innerHTML=y}function R(h){if(h>0){let C=Math.floor(h/60),b=h%60,T=C>0?`${C}m ${b}s`:`${b}s`;o.cooldownValue.textContent=T}else o.cooldownValue.textContent="--"}function A(h){h&&h.includes("\u23F3")?(o.status.textContent=h,o.status.className="status status-info"):h&&x(h,"info")}function ce(){l.remove()}return g("\u2705 Interfaz de Auto-Image creada"),{setStatus:x,updateProgress:v,updateCooldownDisplay:R,updateCooldownMessage:A,showResizeDialog:w,closeResizeDialog:P,destroy:ce}}function se(n,a,l={}){return new Promise(s=>{let i=document.createElement("div");i.className="modal-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%",i.style.background="rgba(0,0,0,0.7)",i.style.zIndex="10001",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center";let t=document.createElement("div");t.style.background="#1a1a1a",t.style.border="2px solid #333",t.style.borderRadius="15px",t.style.padding="25px",t.style.color="#eee",t.style.minWidth="350px",t.style.maxWidth="400px",t.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",t.style.fontFamily="'Segoe UI', Roboto, sans-serif",t.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${a}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${n}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${l.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${l.save}</button>`:""}
        ${l.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${l.discard}</button>`:""}
        ${l.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${l.cancel}</button>`:""}
      </div>
    `,i.appendChild(t),document.body.appendChild(i);let u=t.querySelector(".save-btn"),r=t.querySelector(".discard-btn"),c=t.querySelector(".cancel-btn"),d=()=>{document.body.removeChild(i)};u&&u.addEventListener("click",()=>{d(),s("save")}),r&&r.addEventListener("click",()=>{d(),s("discard")}),c&&c.addEventListener("click",()=>{d(),s("cancel")}),i.addEventListener("click",o=>{o.target===i&&(d(),s("cancel"))})})}async function le(){g("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),q(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let n=null,a=window.fetch,l=()=>{window.fetch!==a&&(window.fetch=a,g("\u{1F504} Fetch original restaurado")),e.positionTimeoutId&&(clearTimeout(e.positionTimeoutId),e.positionTimeoutId=null),e.cleanupObserver&&(e.cleanupObserver(),e.cleanupObserver=null),e.selectingPosition=!1};try{let s={...S},i=Y("image");if(e.language=W(),!s.SITEKEY){let r=document.querySelector("*[data-sitekey]");r?(s.SITEKEY=r.getAttribute("data-sitekey"),g(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${s.SITEKEY.substring(0,20)}...`)):g("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}let t=await re({texts:i,onConfigChange:r=>{r.pixelsPerBatch!==void 0&&(e.pixelsPerBatch=r.pixelsPerBatch),r.useAllCharges!==void 0&&(e.useAllChargesFirst=r.useAllCharges),g("Configuraci\xF3n actualizada:",r)},onInitBot:async()=>{g("\u{1F916} Inicializando Auto-Image..."),t.setStatus(m("image.checkingColors"),"info");let r=H();if(r.length===0)return t.setStatus(m("image.noColorsFound"),"error"),!1;let c=await G(),d=null;return c.success&&c.data.user?(d={username:c.data.user.name||"An\xF3nimo",charges:c.data.charges,maxCharges:c.data.maxCharges,pixels:c.data.user.pixelsPainted||0},n=d,e.currentCharges=c.data.charges,e.maxCharges=c.data.maxCharges||50,g(`\u{1F464} Usuario conectado: ${c.data.user.name||"An\xF3nimo"} - Cargas: ${d.charges}/${d.maxCharges} - P\xEDxeles: ${d.pixels}`)):g("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=r,e.colorsChecked=!0,t.setStatus(m("image.colorsFound",{count:r.length}),"success"),t.updateProgress(0,0,d),g(`\u2705 ${r.length} colores disponibles detectados`),!0},onUploadImage:async r=>{try{t.setStatus(m("image.loadingImage"),"info");let c=window.URL.createObjectURL(r),d=new O(c);d.originalName=r.name,await d.load();let o=d.processImage(e.availableColors,s);return e.imageData=o,e.imageData.processor=d,e.totalPixels=o.validPixelCount,e.paintedPixels=0,e.originalImageName=r.name,e.imageLoaded=!0,t.setStatus(m("image.imageLoaded",{count:o.validPixelCount}),"success"),t.updateProgress(0,o.validPixelCount,n),g(`\u2705 Imagen cargada: ${o.width}x${o.height}, ${o.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(c),!0}catch(c){return t.setStatus(m("image.imageError"),"error"),g("\u274C Error cargando imagen:",c),!1}},onSelectPosition:async()=>new Promise(r=>{t.setStatus(m("image.selectPositionAlert"),"info"),t.setStatus(m("image.waitingPosition"),"info"),e.selectingPosition=!0;let c=!1,d=()=>{window.fetch=async(f,x)=>{if(e.selectingPosition&&!c&&typeof f=="string"&&f.includes("/s0/pixel/")&&x&&x.method==="POST")try{g(`\u{1F3AF} Interceptando request de pintado: ${f}`);let w=await a(f,x);if(w.ok&&x.body){let P;try{P=JSON.parse(x.body)}catch(v){return g("Error parseando body del request:",v),w}if(P.coords&&Array.isArray(P.coords)&&P.coords.length>=2){let v=P.coords[0],R=P.coords[1],A=f.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);A&&!c?(c=!0,e.tileX=parseInt(A[1]),e.tileY=parseInt(A[2]),e.startPosition={x:v,y:R},e.selectingPosition=!1,l(),t.setStatus(m("image.positionSet"),"success"),g(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${v},${R})`),r(!0)):g("\u26A0\uFE0F No se pudo extraer tile de la URL:",f)}}return w}catch(w){if(g("\u274C Error interceptando pixel:",w),!c)return l(),a(f,x)}return a(f,x)}},o=()=>{let f=document.querySelectorAll("canvas");if(f.length===0){g("\u26A0\uFE0F No se encontraron elementos canvas");return}g(`\u{1F4CA} Configurando observer para ${f.length} canvas`);let x=w=>{if(!e.selectingPosition||c)return;let P=w.target;P&&P.tagName==="CANVAS"&&(g("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n"),setTimeout(()=>{!c&&e.selectingPosition&&g("\u{1F50D} Buscando requests recientes de pintado...")},500))};document.addEventListener("click",x),e.cleanupObserver=()=>{document.removeEventListener("click",x)}};d(),o();let p=setTimeout(()=>{e.selectingPosition&&!c&&(l(),e.cleanupObserver&&e.cleanupObserver(),t.setStatus(m("image.positionTimeout"),"error"),g("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),r(!1))},12e4);e.positionTimeoutId=p}),onStartPainting:async()=>{var r;if(g("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((r=e.remainingPixels)==null?void 0:r.length)||0}),!e.imageLoaded||!e.startPosition)return t.setStatus(m("image.missingRequirements"),"error"),g(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,e.isFirstBatch=!0,t.setStatus(m("image.startPaintingMsg"),"success");try{return await Q(e.imageData,e.startPosition,(c,d,o,p)=>{n&&(n.charges=Math.floor(e.currentCharges),p!==void 0&&(n.estimatedTime=p)),t.updateProgress(c,d,n),e.inCooldown&&e.nextBatchCooldown>0?t.updateCooldownDisplay(e.nextBatchCooldown):t.updateCooldownDisplay(0),o?o.includes("\u23F3")&&e.inCooldown?t.updateCooldownMessage(o):t.setStatus(o,"info"):t.setStatus(m("image.paintingProgress",{painted:c,total:d}),"info")},(c,d)=>{c?(t.setStatus(m("image.paintingComplete",{count:d}),"success"),ae()):t.setStatus(m("image.paintingStopped"),"warning"),e.running=!1},c=>{t.setStatus(m("image.paintingError"),"error"),g("\u274C Error en proceso de pintado:",c),e.running=!1}),!0}catch(c){return t.setStatus(m("image.paintingError"),"error"),g("\u274C Error iniciando pintado:",c),e.running=!1,!1}},onStopPainting:async()=>{if(ie().hasProgress){let c=await se(m("image.confirmSaveProgress"),m("image.saveProgressTitle"),{save:m("image.saveProgress"),discard:m("image.discardProgress"),cancel:m("image.cancel")});if(c==="save"){let d=_();d.success?t.setStatus(m("image.progressSaved",{filename:d.filename}),"success"):t.setStatus(m("image.progressSaveError",{error:d.error}),"error")}else if(c==="cancel")return!1}return N(),t.setStatus(m("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let r=_();return r.success?t.setStatus(m("image.progressSaved",{filename:r.filename}),"success"):t.setStatus(m("image.progressSaveError",{error:r.error}),"error"),r.success},onLoadProgress:async r=>{try{let c=await te(r);return c.success?(t.setStatus(m("image.progressLoaded",{painted:c.painted,total:c.total}),"success"),t.updateProgress(c.painted,c.total,n),g("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(t.setStatus(m("image.progressLoadError",{error:c.error}),"error"),!1)}catch(c){return t.setStatus(m("image.progressLoadError",{error:c.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&t.showResizeDialog(e.imageData.processor)},onConfirmResize:(r,c,d)=>{g(`\u{1F504} Redimensionando imagen de ${r.getDimensions().width}x${r.getDimensions().height} a ${c}x${d}`);try{r.resize(c,d);let o=r.processImage(e.availableColors,s);e.imageData=o,e.totalPixels=o.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},t.updateProgress(0,o.validPixelCount,n),t.setStatus(m("image.resizeSuccess",{width:c,height:d}),"success"),g(`\u2705 Imagen redimensionada: ${o.validPixelCount} p\xEDxeles v\xE1lidos`)}catch(o){g(`\u274C Error redimensionando imagen: ${o.message}`),t.setStatus(m("image.imageError"),"error")}}}),u=r=>{let{language:c}=r.detail;g(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${c}`),e.language=c};window.addEventListener("launcherLanguageChanged",u),window.addEventListener("languageChanged",u),window.addEventListener("beforeunload",()=>{l(),N(),t.destroy(),window.removeEventListener("launcherLanguageChanged",u),window.removeEventListener("languageChanged",u),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),g("\u2705 Auto-Image inicializado correctamente")}catch(s){throw g("\u274C Error inicializando Auto-Image:",s),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),s}}(()=>{"use strict";var n,a;if((n=window.__wplaceBot)!=null&&n.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((a=window.__wplaceBot)!=null&&a.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,le().catch(l=>{console.error("[BOT] Error en Auto-Image:",l),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
