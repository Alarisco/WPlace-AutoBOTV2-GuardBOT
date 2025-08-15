/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T19:54:33.591Z */
(()=>{var g=(...i)=>console.log("[WPA-UI]",...i);var X={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var U={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var j={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var T={es:X,en:U,fr:j},R="es",k=T[R];function ce(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return T[a]?a:"es"}function de(){return null}function q(){let i=de(),a=ce(),r="es";return i&&T[i]?r=i:a&&T[a]&&(r=a),ge(r),r}function ge(i){if(!T[i]){console.warn(`Idioma '${i}' no disponible. Usando '${R}'`);return}R=i,k=T[i],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:i,translations:k}}))}function H(){return R}function m(i,a={}){let r=i.split("."),l=k;for(let n of r)if(l&&typeof l=="object"&&n in l)l=l[n];else return console.warn(`Clave de traducci\xF3n no encontrada: '${i}'`),i;return typeof l!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${i}'`),i):ue(l,a)}function ue(i,a){return!a||Object.keys(a).length===0?i:i.replace(/\{(\w+)\}/g,(r,l)=>a[l]!==void 0?a[l]:r)}function Y(i){return k[i]?k[i]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${i}'`),{})}q();var S={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:S.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,positionTimeoutId:null,cleanupObserver:null,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:S.PIXELS_PER_BATCH,useAllChargesFirst:!0,isFirstBatch:!0,maxCharges:50,nextBatchCooldown:0,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null};var M=class{constructor(a){this.imageSrc=a,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((a,r)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),a()},this.img.onerror=r,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(a,r){let l=document.createElement("canvas");return l.width=a,l.height=r,l.getContext("2d").drawImage(this.img,0,0,a,r),this.canvas.width=a,this.canvas.height=r,this.ctx.drawImage(l,0,0),this.getPixelData()}generatePreview(a,r){return this.previewCanvas.width=a,this.previewCanvas.height=r,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,a,r),this.previewCanvas.toDataURL()}getImageData(){let{width:a,height:r}=this.getDimensions(),l=this.getPixelData();return{width:a,height:r,pixels:l,originalName:this.originalName||"image.png"}}processImage(a,r){let{width:l,height:n}=this.getDimensions(),t=this.getPixelData(),u=[],s=0;for(let c=0;c<n;c++)for(let d=0;d<l;d++){let o=(c*l+d)*4,p=t[o],h=t[o+1],x=t[o+2],P=t[o+3];if(P<r.TRANSPARENCY_THRESHOLD||p>r.WHITE_THRESHOLD&&h>r.WHITE_THRESHOLD&&x>r.WHITE_THRESHOLD)continue;let y=this.findClosestColor({r:p,g:h,b:x},a);y&&(u.push({x:d,y:c,originalColor:{r:p,g:h,b:x,alpha:P},targetColor:y}),s++)}return{width:l,height:n,pixels:u,validPixelCount:s,originalName:this.originalName||"image.png"}}findClosestColor(a,r){if(!r||r.length===0)return null;let l=null,n=1/0;for(let t of r){let u=Math.sqrt(Math.pow(a.r-t.r,2)+Math.pow(a.g-t.g,2)+Math.pow(a.b-t.b,2));u<n&&(n=u,l=t)}return l}};function W(){g("\u{1F3A8} Detectando colores disponibles...");let i=document.querySelectorAll('[id^="color-"]'),a=[];for(let r of i){if(r.querySelector("svg"))continue;let l=r.id.replace("color-",""),n=parseInt(l);if(n===0||n===5)continue;let t=r.style.backgroundColor;if(t){let u=t.match(/\d+/g);if(u&&u.length>=3){let s={r:parseInt(u[0]),g:parseInt(u[1]),b:parseInt(u[2])};a.push({id:n,element:r,...s}),g(`Color detectado: id=${n}, rgb(${s.r},${s.g},${s.b})`)}}}return g(`\u2705 ${a.length} colores disponibles detectados`),a}var O=i=>new Promise(a=>setTimeout(a,i));var V="https://backend.wplace.live";async function G(){var i,a,r;try{let l=await fetch(`${V}/me`,{credentials:"include"}).then(s=>s.json()),n=l||null,t=(l==null?void 0:l.charges)||{},u={count:(i=t.count)!=null?i:0,max:(a=t.max)!=null?a:0,cooldownMs:(r=t.cooldownMs)!=null?r:3e4};return{success:!0,data:{user:n,charges:u.count,maxCharges:u.max,chargeRegen:u.cooldownMs}}}catch(l){return{success:!1,error:l.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function Z(i,a,r,l,n){try{let t=JSON.stringify({colors:l,coords:r,t:n}),u=await fetch(`${V}/s0/pixel/${i}/${a}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:t}),s=null;try{s=await u.json()}catch{s={}}return{status:u.status,json:s,success:u.ok,painted:(s==null?void 0:s.painted)||0}}catch(t){return{status:0,json:{error:t.message},success:!1,painted:0}}}var K=!1;async function pe(){if(!(K||window.turnstile))return new Promise((i,a)=>{let r=document.createElement("script");r.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",r.async=!0,r.defer=!0,r.onload=()=>{K=!0,i()},r.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(r)})}async function me(i,a="paint"){var r;if(await pe(),typeof((r=window.turnstile)==null?void 0:r.execute)=="function")try{let l=await window.turnstile.execute(i,{action:a});if(l&&l.length>20)return l}catch{}return await new Promise(l=>{let n=document.createElement("div");n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),window.turnstile.render(n,{sitekey:i,callback:t=>{document.body.removeChild(n),l(t)}})})}async function J(i){return me(i,"paint")}async function Q(i,a,r,l,n){let{width:t,height:u}=i,{x:s,y:c}=a;g(`Iniciando pintado: imagen(${t}x${u}) inicio LOCAL(${s},${c}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(g("Generando cola de p\xEDxeles..."),e.remainingPixels=xe(i,a,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(d=>{let o=d.imageY*t+d.imageX,p=e.lastPosition.y*t+e.lastPosition.x;return o>=p})),g(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let d=Math.floor(e.currentCharges),o;if(e.isFirstBatch&&e.useAllChargesFirst&&d>0?(o=Math.min(d,e.remainingPixels.length),e.isFirstBatch=!1,g(`Primera pasada: usando ${o} cargas de ${d} disponibles`)):o=Math.min(e.pixelsPerBatch,e.remainingPixels.length),d<o){g(`Cargas insuficientes: ${d}/${o} necesarias`),await fe(o-d,r),d=Math.floor(e.currentCharges),e.isFirstBatch||(o=Math.min(e.pixelsPerBatch,e.remainingPixels.length,d));continue}let p=e.remainingPixels.splice(0,o);g(`Pintando lote de ${p.length} p\xEDxeles...`);let h=await he(p);if(h.success&&h.painted>0){if(e.paintedPixels+=h.painted,e.currentCharges=Math.max(0,e.currentCharges-h.painted),g(`Cargas despu\xE9s del lote: ${e.currentCharges.toFixed(1)} (consumidas: ${h.painted})`),p.length>0){let P=p[p.length-1];e.lastPosition={x:P.imageX,y:P.imageY}}g(`Lote exitoso: ${h.painted}/${p.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`);let x=be();r&&r(e.paintedPixels,e.totalPixels,null,x)}else e.remainingPixels.unshift(...p),g("Lote fall\xF3: reintentando en 5 segundos..."),await O(5e3);await O(500)}e.stopFlag?(g(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),l&&l(!1,e.paintedPixels)):(g(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],l&&l(!0,e.paintedPixels))}catch(d){g("Error en proceso de pintado:",d),n&&n(d)}}async function he(i){var a;try{if(!i||i.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let r=[],l=[],n=null,t=null;for(let c of i)r.push(c.localX,c.localY),l.push(c.color.id||c.color.value||1),n===null&&(n=c.tileX,t=c.tileY);let u=await J(S.SITEKEY),s=await Z(n,t,r,l,u);return s.status===200?{success:!0,painted:s.painted,response:s.json}:{success:!1,painted:0,error:((a=s.json)==null?void 0:a.message)||`HTTP ${s.status}`,status:s.status}}catch(r){return g("Error en paintPixelBatch:",r),{success:!1,painted:0,error:r.message}}}async function fe(i,a){let l=S.CHARGE_REGEN_MS*i+5e3;if(g(`Esperando ${Math.round(l/1e3)}s para obtener ${i} cargas`),e.inCooldown=!0,e.cooldownEndTime=Date.now()+l,e.nextBatchCooldown=Math.round(l/1e3),a){let n=`\u23F3 Esperando cargas: ${Math.floor(e.currentCharges)}/${i} (${Math.round(l/1e3)}s)`;a(e.paintedPixels,e.totalPixels,n)}for(let n=Math.round(l/1e3);n>0&&!e.stopFlag;n--){if(e.nextBatchCooldown=n,a){let t=`\u23F3 Esperando cargas: ${Math.floor(e.currentCharges)}/${i} (${n}s)`;a(e.paintedPixels,e.totalPixels,t)}await O(1e3)}e.inCooldown=!1,e.nextBatchCooldown=0,e.currentCharges=Math.min(e.maxCharges||50,e.currentCharges+l/S.CHARGE_REGEN_MS)}function xe(i,a,r,l){let{pixels:n}=i,{x:t,y:u}=a,s=[];for(let c of n){let d=t+c.x,o=u+c.y;s.push({imageX:c.x,imageY:c.y,localX:d,localY:o,tileX:r,tileY:l,color:c.targetColor,originalColor:c.originalColor})}return g(`Cola de p\xEDxeles generada: ${s.length} p\xEDxeles para pintar`),s}function be(){if(!e.remainingPixels||e.remainingPixels.length===0)return 0;let i=e.remainingPixels.length,a=e.pixelsPerBatch,r=S.CHARGE_REGEN_MS/1e3,l=Math.ceil(i/a),n=a*r,t=(l-1)*n,u=l*2;return Math.ceil(t+u)}function N(){e.stopFlag=!0,e.running=!1,g("\u{1F6D1} Deteniendo proceso de pintado...")}function _(i=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let a={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch,useAllChargesFirst:e.useAllChargesFirst,isFirstBatch:e.isFirstBatch,maxCharges:e.maxCharges},colors:e.availableColors.map(s=>({id:s.id,r:s.r,g:s.g,b:s.b})),remainingPixels:e.remainingPixels||[]},r=JSON.stringify(a,null,2),l=new window.Blob([r],{type:"application/json"}),n=i||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,t=window.URL.createObjectURL(l),u=document.createElement("a");return u.href=t,u.download=n,document.body.appendChild(u),u.click(),document.body.removeChild(u),window.URL.revokeObjectURL(t),g(`\u2705 Progreso guardado: ${n}`),{success:!0,filename:n}}catch(a){return g("\u274C Error guardando progreso:",a),{success:!1,error:a.message}}}async function te(i){return new Promise(a=>{try{let r=new window.FileReader;r.onload=l=>{try{let n=JSON.parse(l.target.result),u=["imageData","progress","position","colors"].filter(s=>!(s in n));if(u.length>0)throw new Error(`Campos requeridos faltantes: ${u.join(", ")}`);if(e.availableColors.length>0){let s=n.colors.map(o=>o.id),c=e.availableColors.map(o=>o.id);s.filter(o=>c.includes(o)).length<s.length*.8&&g("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...n.imageData,pixels:[]},e.paintedPixels=n.progress.paintedPixels,e.totalPixels=n.progress.totalPixels,n.progress.lastPosition?e.lastPosition=n.progress.lastPosition:n.position.lastX!==void 0&&n.position.lastY!==void 0&&(e.lastPosition={x:n.position.lastX,y:n.position.lastY}),n.position.startPosition?e.startPosition=n.position.startPosition:n.position.startX!==void 0&&n.position.startY!==void 0&&(e.startPosition={x:n.position.startX,y:n.position.startY}),e.tileX=n.position.tileX,e.tileY=n.position.tileY,e.originalImageName=n.imageData.originalName,e.remainingPixels=n.remainingPixels||n.progress.remainingPixels||[],n.config&&(e.pixelsPerBatch=n.config.pixelsPerBatch||e.pixelsPerBatch,e.useAllChargesFirst=n.config.useAllChargesFirst!==void 0?n.config.useAllChargesFirst:e.useAllChargesFirst,e.isFirstBatch=n.config.isFirstBatch!==void 0?n.config.isFirstBatch:!0,e.maxCharges=n.config.maxCharges||e.maxCharges),e.imageLoaded=!0,e.colorsChecked=!0,g(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),a({success:!0,data:n,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(n){g("\u274C Error parseando archivo de progreso:",n),a({success:!1,error:n.message})}},r.onerror=()=>{let l="Error leyendo archivo";g("\u274C",l),a({success:!1,error:l})},r.readAsText(i)}catch(r){g("\u274C Error cargando progreso:",r),a({success:!1,error:r.message})}})}function ae(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,e.isFirstBatch=!0,e.nextBatchCooldown=0,g("\u{1F9F9} Progreso limpiado")}function ee(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function ie(){return{hasProgress:ee(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:ee()}}function ne(i=null){let a=document.createElement("div");i&&(a.id=i),a.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let r=a.attachShadow({mode:"open"});return document.body.appendChild(a),{host:a,root:r}}function oe(i,a){let r=0,l=0,n=0,t=0;i.style.cursor="move",i.addEventListener("mousedown",u);function u(d){d.target.closest(".header-btn, .wplace-header-btn")||(d.preventDefault(),n=d.clientX,t=d.clientY,document.addEventListener("mouseup",c),document.addEventListener("mousemove",s))}function s(d){d.preventDefault(),r=n-d.clientX,l=t-d.clientY,n=d.clientX,t=d.clientY,a.style.top=a.offsetTop-l+"px",a.style.left=a.offsetLeft-r+"px"}function c(){document.removeEventListener("mouseup",c),document.removeEventListener("mousemove",s)}}async function re({texts:i,...a}){if(g("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let f=document.createElement("link");f.rel="stylesheet",f.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(f),g("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:r,root:l}=ne(),n=document.createElement("style");n.textContent=`
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
  `,l.appendChild(n);let t=document.createElement("div");t.className="container",t.innerHTML=`
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
  `,l.appendChild(t);let u=document.createElement("input");u.type="file",u.accept="image/png,image/jpeg",u.style.display="none",l.appendChild(u);let s=document.createElement("input");s.type="file",s.accept=".json",s.style.display="none",l.appendChild(s);let c=document.createElement("div");c.className="resize-overlay",l.appendChild(c);let d=document.createElement("div");d.className="resize-container",d.innerHTML=`
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
  `,l.appendChild(d);let o={header:t.querySelector(".header"),configBtn:t.querySelector(".config-btn"),minimizeBtn:t.querySelector(".minimize-btn"),configPanel:t.querySelector(".config-panel"),pixelsPerBatch:t.querySelector(".pixels-per-batch"),useAllCharges:t.querySelector(".use-all-charges"),batchValue:t.querySelector(".batch-value"),cooldownValue:t.querySelector(".cooldown-value"),initBtn:t.querySelector(".init-btn"),uploadBtn:t.querySelector(".upload-btn"),loadProgressBtn:t.querySelector(".load-progress-btn"),resizeBtn:t.querySelector(".resize-btn"),selectPosBtn:t.querySelector(".select-pos-btn"),startBtn:t.querySelector(".start-btn"),stopBtn:t.querySelector(".stop-btn"),progressBar:t.querySelector(".progress-bar"),statsArea:t.querySelector(".stats-area"),status:t.querySelector(".status"),content:t.querySelector(".content")},p={overlay:c,container:d,widthSlider:d.querySelector(".width-slider"),heightSlider:d.querySelector(".height-slider"),widthValue:d.querySelector(".width-value"),heightValue:d.querySelector(".height-value"),keepAspect:d.querySelector(".keep-aspect"),preview:d.querySelector(".resize-preview"),confirmBtn:d.querySelector(".confirm-resize"),cancelBtn:d.querySelector(".cancel-resize")},h={minimized:!1,configVisible:!1};oe(o.header,t),o.minimizeBtn.addEventListener("click",()=>{h.minimized=!h.minimized,h.minimized?(t.classList.add("minimized"),o.minimizeBtn.innerHTML="\u{1F53C}"):(t.classList.remove("minimized"),o.minimizeBtn.innerHTML="\u{1F53D}")}),o.configBtn.addEventListener("click",()=>{h.configVisible=!h.configVisible,h.configVisible?(o.configPanel.classList.add("visible"),o.configBtn.innerHTML="\u274C"):(o.configPanel.classList.remove("visible"),o.configBtn.innerHTML="\u2699\uFE0F")}),o.pixelsPerBatch.addEventListener("change",()=>{let f=parseInt(o.pixelsPerBatch.value)||20;o.batchValue.textContent=f,a.onConfigChange&&a.onConfigChange({pixelsPerBatch:f})}),o.useAllCharges.addEventListener("change",()=>{a.onConfigChange&&a.onConfigChange({useAllCharges:o.useAllCharges.checked})}),o.initBtn.addEventListener("click",async()=>{o.initBtn.disabled=!0,a.onInitBot&&await a.onInitBot()&&(o.uploadBtn.disabled=!1,o.loadProgressBtn.disabled=!1),o.initBtn.disabled=!1}),o.uploadBtn.addEventListener("click",()=>{u.click()}),u.addEventListener("change",async()=>{u.files.length>0&&a.onUploadImage&&await a.onUploadImage(u.files[0])&&(o.selectPosBtn.disabled=!1,o.resizeBtn.disabled=!1)}),o.loadProgressBtn.addEventListener("click",()=>{s.click()}),s.addEventListener("change",async()=>{s.files.length>0&&a.onLoadProgress&&await a.onLoadProgress(s.files[0])&&(o.selectPosBtn.disabled=!1,o.startBtn.disabled=!1,o.resizeBtn.disabled=!1)}),o.resizeBtn.addEventListener("click",()=>{a.onResizeImage&&a.onResizeImage()}),o.selectPosBtn.addEventListener("click",async()=>{a.onSelectPosition&&(o.selectPosBtn.disabled=!0,await a.onSelectPosition()&&(o.startBtn.disabled=!1),o.selectPosBtn.disabled=!1)}),o.startBtn.addEventListener("click",async()=>{a.onStartPainting&&(o.startBtn.disabled=!0,o.stopBtn.disabled=!1,await a.onStartPainting()||(o.startBtn.disabled=!1,o.stopBtn.disabled=!0))}),o.stopBtn.addEventListener("click",async()=>{a.onStopPainting&&await a.onStopPainting()&&(o.startBtn.disabled=!1,o.stopBtn.disabled=!0)});function x(f,v="default"){o.status.textContent=f,o.status.className=`status status-${v}`,o.status.style.animation="none",o.status.offsetWidth,o.status.style.animation="slideIn 0.3s ease-out"}function P(f){let{width:v,height:b}=f.getDimensions(),B=v/b;p.widthSlider.value=v,p.heightSlider.value=b,p.widthValue.textContent=v,p.heightValue.textContent=b,p.preview.src=f.img.src,p.overlay.style.display="block",p.container.style.display="block";let C=()=>{let E=parseInt(p.widthSlider.value),I=parseInt(p.heightSlider.value);p.widthValue.textContent=E,p.heightValue.textContent=I,p.preview.src=f.generatePreview(E,I)},L=()=>{if(p.keepAspect.checked){let E=parseInt(p.widthSlider.value),I=Math.round(E/B);p.heightSlider.value=I}C()},z=()=>{if(p.keepAspect.checked){let E=parseInt(p.heightSlider.value),I=Math.round(E*B);p.widthSlider.value=I}C()};p.widthSlider.addEventListener("input",L),p.heightSlider.addEventListener("input",z);let D=()=>{let E=parseInt(p.widthSlider.value),I=parseInt(p.heightSlider.value);a.onConfirmResize&&a.onConfirmResize(f,E,I),w()},F=()=>{w()};p.confirmBtn.addEventListener("click",D),p.cancelBtn.addEventListener("click",F),p.overlay.addEventListener("click",F),window.cleanupResizeDialog=()=>{p.widthSlider.removeEventListener("input",L),p.heightSlider.removeEventListener("input",z),p.confirmBtn.removeEventListener("click",D),p.cancelBtn.removeEventListener("click",F),p.overlay.removeEventListener("click",F)},C()}function w(){p.overlay.style.display="none",p.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function y(f,v,b=null){let B=v>0?f/v*100:0;o.progressBar.style.width=`${B}%`;let C=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${i.progress}</div>
        <div>${f}/${v} (${B.toFixed(1)}%)</div>
      </div>
    `;if(b&&(b.username&&(C+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${b.username}</div>
          </div>
        `),b.charges!==void 0&&(C+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${i.charges}</div>
            <div>${Math.floor(b.charges)}</div>
          </div>
        `),b.pixels!==void 0&&(C+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${i.pixels}</div>
            <div>${b.pixels.toLocaleString()}</div>
          </div>
        `),b.estimatedTime!==void 0&&b.estimatedTime>0)){let L=Math.floor(b.estimatedTime/3600),z=Math.floor(b.estimatedTime%3600/60),D=L>0?`${L}h ${z}m`:`${z}m`;C+=`
          <div class="stat-item">
            <div class="stat-label">\u23F0 ${i.timeRemaining}</div>
            <div>${D}</div>
          </div>
        `}o.statsArea.innerHTML=C}function $(f){if(f>0){let v=Math.floor(f/60),b=f%60,B=v>0?`${v}m ${b}s`:`${b}s`;o.cooldownValue.textContent=B}else o.cooldownValue.textContent="--"}function A(){r.remove()}return g("\u2705 Interfaz de Auto-Image creada"),{setStatus:x,updateProgress:y,updateCooldownDisplay:$,showResizeDialog:P,closeResizeDialog:w,destroy:A}}function se(i,a,r={}){return new Promise(l=>{let n=document.createElement("div");n.className="modal-overlay",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.background="rgba(0,0,0,0.7)",n.style.zIndex="10001",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center";let t=document.createElement("div");t.style.background="#1a1a1a",t.style.border="2px solid #333",t.style.borderRadius="15px",t.style.padding="25px",t.style.color="#eee",t.style.minWidth="350px",t.style.maxWidth="400px",t.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",t.style.fontFamily="'Segoe UI', Roboto, sans-serif",t.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${a}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${i}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${r.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${r.save}</button>`:""}
        ${r.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${r.discard}</button>`:""}
        ${r.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${r.cancel}</button>`:""}
      </div>
    `,n.appendChild(t),document.body.appendChild(n);let u=t.querySelector(".save-btn"),s=t.querySelector(".discard-btn"),c=t.querySelector(".cancel-btn"),d=()=>{document.body.removeChild(n)};u&&u.addEventListener("click",()=>{d(),l("save")}),s&&s.addEventListener("click",()=>{d(),l("discard")}),c&&c.addEventListener("click",()=>{d(),l("cancel")}),n.addEventListener("click",o=>{o.target===n&&(d(),l("cancel"))})})}async function le(){g("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),q(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let i=null,a=window.fetch,r=()=>{window.fetch!==a&&(window.fetch=a,g("\u{1F504} Fetch original restaurado")),e.positionTimeoutId&&(clearTimeout(e.positionTimeoutId),e.positionTimeoutId=null),e.cleanupObserver&&(e.cleanupObserver(),e.cleanupObserver=null),e.selectingPosition=!1};try{let l={...S},n=Y("image");if(e.language=H(),!l.SITEKEY){let s=document.querySelector("*[data-sitekey]");s?(l.SITEKEY=s.getAttribute("data-sitekey"),g(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${l.SITEKEY.substring(0,20)}...`)):g("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}let t=await re({texts:n,onConfigChange:s=>{s.pixelsPerBatch!==void 0&&(e.pixelsPerBatch=s.pixelsPerBatch),s.useAllCharges!==void 0&&(e.useAllChargesFirst=s.useAllCharges),g("Configuraci\xF3n actualizada:",s)},onInitBot:async()=>{g("\u{1F916} Inicializando Auto-Image..."),t.setStatus(m("image.checkingColors"),"info");let s=W();if(s.length===0)return t.setStatus(m("image.noColorsFound"),"error"),!1;let c=await G(),d=null;return c.success&&c.data.user?(d={username:c.data.user.name||"An\xF3nimo",charges:c.data.charges,maxCharges:c.data.maxCharges,pixels:c.data.user.pixelsPainted||0},i=d,e.currentCharges=c.data.charges,e.maxCharges=c.data.maxCharges||50,g(`\u{1F464} Usuario conectado: ${c.data.user.name||"An\xF3nimo"} - Cargas: ${d.charges}/${d.maxCharges} - P\xEDxeles: ${d.pixels}`)):g("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=s,e.colorsChecked=!0,t.setStatus(m("image.colorsFound",{count:s.length}),"success"),t.updateProgress(0,0,d),g(`\u2705 ${s.length} colores disponibles detectados`),!0},onUploadImage:async s=>{try{t.setStatus(m("image.loadingImage"),"info");let c=window.URL.createObjectURL(s),d=new M(c);d.originalName=s.name,await d.load();let o=d.processImage(e.availableColors,l);return e.imageData=o,e.imageData.processor=d,e.totalPixels=o.validPixelCount,e.paintedPixels=0,e.originalImageName=s.name,e.imageLoaded=!0,t.setStatus(m("image.imageLoaded",{count:o.validPixelCount}),"success"),t.updateProgress(0,o.validPixelCount,i),g(`\u2705 Imagen cargada: ${o.width}x${o.height}, ${o.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(c),!0}catch(c){return t.setStatus(m("image.imageError"),"error"),g("\u274C Error cargando imagen:",c),!1}},onSelectPosition:async()=>new Promise(s=>{t.setStatus(m("image.selectPositionAlert"),"info"),t.setStatus(m("image.waitingPosition"),"info"),e.selectingPosition=!0;let c=!1,d=()=>{window.fetch=async(h,x)=>{if(e.selectingPosition&&!c&&typeof h=="string"&&h.includes("/s0/pixel/")&&x&&x.method==="POST")try{g(`\u{1F3AF} Interceptando request de pintado: ${h}`);let P=await a(h,x);if(P.ok&&x.body){let w;try{w=JSON.parse(x.body)}catch(y){return g("Error parseando body del request:",y),P}if(w.coords&&Array.isArray(w.coords)&&w.coords.length>=2){let y=w.coords[0],$=w.coords[1],A=h.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);A&&!c?(c=!0,e.tileX=parseInt(A[1]),e.tileY=parseInt(A[2]),e.startPosition={x:y,y:$},e.selectingPosition=!1,r(),t.setStatus(m("image.positionSet"),"success"),g(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${y},${$})`),s(!0)):g("\u26A0\uFE0F No se pudo extraer tile de la URL:",h)}}return P}catch(P){if(g("\u274C Error interceptando pixel:",P),!c)return r(),a(h,x)}return a(h,x)}},o=()=>{let h=document.querySelectorAll("canvas");if(h.length===0){g("\u26A0\uFE0F No se encontraron elementos canvas");return}g(`\u{1F4CA} Configurando observer para ${h.length} canvas`);let x=P=>{if(!e.selectingPosition||c)return;let w=P.target;w&&w.tagName==="CANVAS"&&(g("\u{1F5B1}\uFE0F Click detectado en canvas durante selecci\xF3n"),setTimeout(()=>{!c&&e.selectingPosition&&g("\u{1F50D} Buscando requests recientes de pintado...")},500))};document.addEventListener("click",x),e.cleanupObserver=()=>{document.removeEventListener("click",x)}};d(),o();let p=setTimeout(()=>{e.selectingPosition&&!c&&(r(),e.cleanupObserver&&e.cleanupObserver(),t.setStatus(m("image.positionTimeout"),"error"),g("\u23F0 Timeout en selecci\xF3n de posici\xF3n"),s(!1))},12e4);e.positionTimeoutId=p}),onStartPainting:async()=>{var s;if(g("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((s=e.remainingPixels)==null?void 0:s.length)||0}),!e.imageLoaded||!e.startPosition)return t.setStatus(m("image.missingRequirements"),"error"),g(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,e.isFirstBatch=!0,t.setStatus(m("image.startPaintingMsg"),"success");try{return await Q(e.imageData,e.startPosition,(c,d,o,p)=>{i&&(i.charges=Math.floor(e.currentCharges),p!==void 0&&(i.estimatedTime=p)),t.updateProgress(c,d,i),e.inCooldown&&e.nextBatchCooldown>0?t.updateCooldownDisplay(e.nextBatchCooldown):t.updateCooldownDisplay(0),o?t.setStatus(o,"info"):t.setStatus(m("image.paintingProgress",{painted:c,total:d}),"info")},(c,d)=>{c?(t.setStatus(m("image.paintingComplete",{count:d}),"success"),ae()):t.setStatus(m("image.paintingStopped"),"warning"),e.running=!1},c=>{t.setStatus(m("image.paintingError"),"error"),g("\u274C Error en proceso de pintado:",c),e.running=!1}),!0}catch(c){return t.setStatus(m("image.paintingError"),"error"),g("\u274C Error iniciando pintado:",c),e.running=!1,!1}},onStopPainting:async()=>{if(ie().hasProgress){let c=await se(m("image.confirmSaveProgress"),m("image.saveProgressTitle"),{save:m("image.saveProgress"),discard:m("image.discardProgress"),cancel:m("image.cancel")});if(c==="save"){let d=_();d.success?t.setStatus(m("image.progressSaved",{filename:d.filename}),"success"):t.setStatus(m("image.progressSaveError",{error:d.error}),"error")}else if(c==="cancel")return!1}return N(),t.setStatus(m("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let s=_();return s.success?t.setStatus(m("image.progressSaved",{filename:s.filename}),"success"):t.setStatus(m("image.progressSaveError",{error:s.error}),"error"),s.success},onLoadProgress:async s=>{try{let c=await te(s);return c.success?(t.setStatus(m("image.progressLoaded",{painted:c.painted,total:c.total}),"success"),t.updateProgress(c.painted,c.total,i),g("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(t.setStatus(m("image.progressLoadError",{error:c.error}),"error"),!1)}catch(c){return t.setStatus(m("image.progressLoadError",{error:c.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&t.showResizeDialog(e.imageData.processor)},onConfirmResize:(s,c,d)=>{g(`\u{1F504} Redimensionando imagen de ${s.getDimensions().width}x${s.getDimensions().height} a ${c}x${d}`);try{s.resize(c,d);let o=s.processImage(e.availableColors,l);e.imageData=o,e.totalPixels=o.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},t.updateProgress(0,o.validPixelCount,i),t.setStatus(m("image.resizeSuccess",{width:c,height:d}),"success"),g(`\u2705 Imagen redimensionada: ${o.validPixelCount} p\xEDxeles v\xE1lidos`)}catch(o){g(`\u274C Error redimensionando imagen: ${o.message}`),t.setStatus(m("image.imageError"),"error")}}}),u=s=>{let{language:c}=s.detail;g(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${c}`),e.language=c};window.addEventListener("launcherLanguageChanged",u),window.addEventListener("languageChanged",u),window.addEventListener("beforeunload",()=>{r(),N(),t.destroy(),window.removeEventListener("launcherLanguageChanged",u),window.removeEventListener("languageChanged",u),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),g("\u2705 Auto-Image inicializado correctamente")}catch(l){throw g("\u274C Error inicializando Auto-Image:",l),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),l}}(()=>{"use strict";var i,a;if((i=window.__wplaceBot)!=null&&i.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((a=window.__wplaceBot)!=null&&a.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,le().catch(r=>{console.error("[BOT] Error en Auto-Image:",r),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
