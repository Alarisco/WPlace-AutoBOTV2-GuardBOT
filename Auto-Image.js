/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T13:50:38.072Z */
(()=>{var g=(...n)=>console.log("[WPA-UI]",...n);var q={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm."},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var N={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm."},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var X={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm."},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var S={es:q,en:N,fr:X},z="es",I=S[z];function le(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return S[a]?a:"es"}function ce(){try{return localStorage.getItem("wplace-autobot-language")}catch(n){return console.warn("No se pudo acceder a localStorage:",n),null}}function de(n){try{localStorage.setItem("wplace-autobot-language",n)}catch(a){console.warn("No se pudo guardar el idioma en localStorage:",a)}}function D(){let n=ce(),a=le(),s="es";return n&&S[n]?s=n:a&&S[a]&&(s=a),ge(s),s}function ge(n){if(!S[n]){console.warn(`Idioma '${n}' no disponible. Usando '${z}'`);return}z=n,I=S[n],de(n),typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:n,translations:I}}))}function j(){return z}function m(n,a={}){let s=n.split("."),t=I;for(let r of s)if(t&&typeof t=="object"&&r in t)t=t[r];else return console.warn(`Clave de traducci\xF3n no encontrada: '${n}'`),n;return typeof t!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${n}'`),n):ue(t,a)}function ue(n,a){return!a||Object.keys(a).length===0?n:n.replace(/\{(\w+)\}/g,(s,t)=>a[t]!==void 0?a[t]:s)}function R(n){return I[n]?I[n]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${n}'`),{})}D();var C={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}};var e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:C.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:C.PIXELS_PER_BATCH,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null};var A=class{constructor(a){this.imageSrc=a,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((a,s)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),a()},this.img.onerror=s,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(a,s){let t=document.createElement("canvas");return t.width=a,t.height=s,t.getContext("2d").drawImage(this.img,0,0,a,s),this.canvas.width=a,this.canvas.height=s,this.ctx.drawImage(t,0,0),this.getPixelData()}generatePreview(a,s){return this.previewCanvas.width=a,this.previewCanvas.height=s,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,a,s),this.previewCanvas.toDataURL()}getImageData(){let{width:a,height:s}=this.getDimensions(),t=this.getPixelData();return{width:a,height:s,pixels:t,originalName:this.originalName||"image.png"}}processImage(a,s){let{width:t,height:r}=this.getDimensions(),i=this.getPixelData(),o=[],l=0;for(let d=0;d<r;d++)for(let u=0;u<t;u++){let c=(d*t+u)*4,p=i[c],h=i[c+1],x=i[c+2],L=i[c+3];if(L<s.TRANSPARENCY_THRESHOLD||p>s.WHITE_THRESHOLD&&h>s.WHITE_THRESHOLD&&x>s.WHITE_THRESHOLD)continue;let B=this.findClosestColor({r:p,g:h,b:x},a);B&&(o.push({x:u,y:d,originalColor:{r:p,g:h,b:x,alpha:L},targetColor:B}),l++)}return{width:t,height:r,pixels:o,validPixelCount:l,originalName:this.originalName||"image.png"}}findClosestColor(a,s){if(!s||s.length===0)return null;let t=null,r=1/0;for(let i of s){let o=Math.sqrt(Math.pow(a.r-i.r,2)+Math.pow(a.g-i.g,2)+Math.pow(a.b-i.b,2));o<r&&(r=o,t=i)}return t}};function U(){g("\u{1F3A8} Detectando colores disponibles...");let n=document.querySelectorAll('[id^="color-"]'),a=[];for(let s of n){if(s.querySelector("svg"))continue;let t=s.id.replace("color-",""),r=parseInt(t);if(r===0||r===5)continue;let i=s.style.backgroundColor;if(i){let o=i.match(/\d+/g);if(o&&o.length>=3){let l={r:parseInt(o[0]),g:parseInt(o[1]),b:parseInt(o[2])};a.push({id:r,element:s,...l}),g(`Color detectado: id=${r}, rgb(${l.r},${l.g},${l.b})`)}}}return g(`\u2705 ${a.length} colores disponibles detectados`),a}var $=n=>new Promise(a=>setTimeout(a,n));var H="https://backend.wplace.live";async function W(){var n,a,s;try{let t=await fetch(`${H}/me`,{credentials:"include"}).then(l=>l.json()),r=t||null,i=(t==null?void 0:t.charges)||{},o={count:(n=i.count)!=null?n:0,max:(a=i.max)!=null?a:0,cooldownMs:(s=i.cooldownMs)!=null?s:3e4};return{success:!0,data:{user:r,charges:o.count,maxCharges:o.max,chargeRegen:o.cooldownMs}}}catch(t){return{success:!1,error:t.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function V(n,a,s,t,r){try{let i=JSON.stringify({colors:t,coords:s,t:r}),o=await fetch(`${H}/s0/pixel/${n}/${a}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:i}),l=null;try{l=await o.json()}catch{l={}}return{status:o.status,json:l,success:o.ok,painted:(l==null?void 0:l.painted)||0}}catch(i){return{status:0,json:{error:i.message},success:!1,painted:0}}}var G=!1;async function pe(){if(!(G||window.turnstile))return new Promise((n,a)=>{let s=document.createElement("script");s.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",s.async=!0,s.defer=!0,s.onload=()=>{G=!0,n()},s.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(s)})}async function me(n,a="paint"){var s;if(await pe(),typeof((s=window.turnstile)==null?void 0:s.execute)=="function")try{let t=await window.turnstile.execute(n,{action:a});if(t&&t.length>20)return t}catch{}return await new Promise(t=>{let r=document.createElement("div");r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),window.turnstile.render(r,{sitekey:n,callback:i=>{document.body.removeChild(r),t(i)}})})}async function K(n){return me(n,"paint")}async function J(n,a,s,t,r){let{width:i,height:o}=n,{x:l,y:d}=a;g(`Iniciando pintado: imagen(${i}x${o}) inicio LOCAL(${l},${d}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(g("Generando cola de p\xEDxeles..."),e.remainingPixels=xe(n,a,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(u=>{let c=u.imageY*i+u.imageX,p=e.lastPosition.y*i+e.lastPosition.x;return c>=p})),g(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let u=Math.floor(e.currentCharges),c=Math.min(e.pixelsPerBatch,e.remainingPixels.length);if(u<c){g(`Cargas insuficientes: ${u}/${c} necesarias`),await he(c-u,s);continue}let p=e.remainingPixels.splice(0,c);g(`Pintando lote de ${p.length} p\xEDxeles...`);let h=await fe(p);if(h.success&&h.painted>0){if(e.paintedPixels+=h.painted,p.length>0){let x=p[p.length-1];e.lastPosition={x:x.imageX,y:x.imageY}}g(`Lote exitoso: ${h.painted}/${p.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`),s&&s(e.paintedPixels,e.totalPixels)}else e.remainingPixels.unshift(...p),g("Lote fall\xF3: reintentando en 5 segundos..."),await $(5e3);await $(500)}e.stopFlag?(g(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),t&&t(!1,e.paintedPixels)):(g(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],t&&t(!0,e.paintedPixels))}catch(u){g("Error en proceso de pintado:",u),r&&r(u)}}async function fe(n){var a;try{if(!n||n.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let s=[],t=[],r=null,i=null;for(let d of n)s.push(d.localX,d.localY),t.push(d.color.id||d.color.value||1),r===null&&(r=d.tileX,i=d.tileY);let o=await K(C.SITEKEY),l=await V(r,i,s,t,o);return l.status===200?{success:!0,painted:l.painted,response:l.json}:{success:!1,painted:0,error:((a=l.json)==null?void 0:a.message)||`HTTP ${l.status}`,status:l.status}}catch(s){return g("Error en paintPixelBatch:",s),{success:!1,painted:0,error:s.message}}}async function he(n,a){let s=C.CHARGE_REGEN_MS*n,t=Math.min(s,6e4);g(`Esperando ${Math.round(t/1e3)}s para obtener ${n} cargas`),a&&a(e.paintedPixels,e.totalPixels,`Esperando cargas (${Math.round(t/1e3)}s)`),await $(t),e.currentCharges=Math.min(50,e.currentCharges+t/C.CHARGE_REGEN_MS)}function xe(n,a,s,t){let{pixels:r}=n,{x:i,y:o}=a,l=[];for(let d of r){let u=i+d.x,c=o+d.y;l.push({imageX:d.x,imageY:d.y,localX:u,localY:c,tileX:s,tileY:t,color:d.targetColor,originalColor:d.originalColor})}return g(`Cola de p\xEDxeles generada: ${l.length} p\xEDxeles para pintar`),l}function F(){e.stopFlag=!0,e.running=!1,g("\u{1F6D1} Deteniendo proceso de pintado...")}function O(n=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let a={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch},colors:e.availableColors.map(l=>({id:l.id,r:l.r,g:l.g,b:l.b})),remainingPixels:e.remainingPixels||[]},s=JSON.stringify(a,null,2),t=new window.Blob([s],{type:"application/json"}),r=n||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,i=window.URL.createObjectURL(t),o=document.createElement("a");return o.href=i,o.download=r,document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(i),g(`\u2705 Progreso guardado: ${r}`),{success:!0,filename:r}}catch(a){return g("\u274C Error guardando progreso:",a),{success:!1,error:a.message}}}async function Z(n){return new Promise(a=>{try{let s=new window.FileReader;s.onload=t=>{try{let r=JSON.parse(t.target.result),o=["imageData","progress","position","colors"].filter(l=>!(l in r));if(o.length>0)throw new Error(`Campos requeridos faltantes: ${o.join(", ")}`);if(e.availableColors.length>0){let l=r.colors.map(c=>c.id),d=e.availableColors.map(c=>c.id);l.filter(c=>d.includes(c)).length<l.length*.8&&g("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...r.imageData,pixels:[]},e.paintedPixels=r.progress.paintedPixels,e.totalPixels=r.progress.totalPixels,r.progress.lastPosition?e.lastPosition=r.progress.lastPosition:r.position.lastX!==void 0&&r.position.lastY!==void 0&&(e.lastPosition={x:r.position.lastX,y:r.position.lastY}),r.position.startPosition?e.startPosition=r.position.startPosition:r.position.startX!==void 0&&r.position.startY!==void 0&&(e.startPosition={x:r.position.startX,y:r.position.startY}),e.tileX=r.position.tileX,e.tileY=r.position.tileY,e.originalImageName=r.imageData.originalName,e.remainingPixels=r.remainingPixels||r.progress.remainingPixels||[],r.config&&(e.pixelsPerBatch=r.config.pixelsPerBatch||e.pixelsPerBatch),e.imageLoaded=!0,e.colorsChecked=!0,g(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),a({success:!0,data:r,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(r){g("\u274C Error parseando archivo de progreso:",r),a({success:!1,error:r.message})}},s.onerror=()=>{let t="Error leyendo archivo";g("\u274C",t),a({success:!1,error:t})},s.readAsText(n)}catch(s){g("\u274C Error cargando progreso:",s),a({success:!1,error:s.message})}})}function ee(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,g("\u{1F9F9} Progreso limpiado")}function Q(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function te(){return{hasProgress:Q(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:Q()}}function ae(n=null){let a=document.createElement("div");n&&(a.id=n),a.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let s=a.attachShadow({mode:"open"});return document.body.appendChild(a),{host:a,root:s}}function ie(n,a){let s=0,t=0,r=0,i=0;n.style.cursor="move",n.addEventListener("mousedown",o);function o(u){u.target.closest(".header-btn, .wplace-header-btn")||(u.preventDefault(),r=u.clientX,i=u.clientY,document.addEventListener("mouseup",d),document.addEventListener("mousemove",l))}function l(u){u.preventDefault(),s=r-u.clientX,t=i-u.clientY,r=u.clientX,i=u.clientY,a.style.top=a.offsetTop-t+"px",a.style.left=a.offsetLeft-s+"px"}function d(){document.removeEventListener("mouseup",d),document.removeEventListener("mousemove",l)}}async function ne({texts:n,...a}){if(g("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let f=document.createElement("link");f.rel="stylesheet",f.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(f),g("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:s,root:t}=ae(),r=document.createElement("style");r.textContent=`
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
  `,t.appendChild(r);let i=document.createElement("div");i.className="container",i.innerHTML=`
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
          <label>${n.pixelsPerBatch}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="10">
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
  `,t.appendChild(i);let o=document.createElement("input");o.type="file",o.accept="image/png,image/jpeg",o.style.display="none",t.appendChild(o);let l=document.createElement("input");l.type="file",l.accept=".json",l.style.display="none",t.appendChild(l);let d=document.createElement("div");d.className="resize-overlay",t.appendChild(d);let u=document.createElement("div");u.className="resize-container",u.innerHTML=`
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
  `,t.appendChild(u);let c={header:i.querySelector(".header"),configBtn:i.querySelector(".config-btn"),minimizeBtn:i.querySelector(".minimize-btn"),configPanel:i.querySelector(".config-panel"),pixelsPerBatch:i.querySelector(".pixels-per-batch"),initBtn:i.querySelector(".init-btn"),uploadBtn:i.querySelector(".upload-btn"),loadProgressBtn:i.querySelector(".load-progress-btn"),resizeBtn:i.querySelector(".resize-btn"),selectPosBtn:i.querySelector(".select-pos-btn"),startBtn:i.querySelector(".start-btn"),stopBtn:i.querySelector(".stop-btn"),progressBar:i.querySelector(".progress-bar"),statsArea:i.querySelector(".stats-area"),status:i.querySelector(".status"),content:i.querySelector(".content")},p={overlay:d,container:u,widthSlider:u.querySelector(".width-slider"),heightSlider:u.querySelector(".height-slider"),widthValue:u.querySelector(".width-value"),heightValue:u.querySelector(".height-value"),keepAspect:u.querySelector(".keep-aspect"),preview:u.querySelector(".resize-preview"),confirmBtn:u.querySelector(".confirm-resize"),cancelBtn:u.querySelector(".cancel-resize")},h={minimized:!1,configVisible:!1};ie(c.header,i),c.minimizeBtn.addEventListener("click",()=>{h.minimized=!h.minimized,h.minimized?(i.classList.add("minimized"),c.minimizeBtn.innerHTML="\u{1F53C}"):(i.classList.remove("minimized"),c.minimizeBtn.innerHTML="\u{1F53D}")}),c.configBtn.addEventListener("click",()=>{h.configVisible=!h.configVisible,h.configVisible?(c.configPanel.classList.add("visible"),c.configBtn.innerHTML="\u274C"):(c.configPanel.classList.remove("visible"),c.configBtn.innerHTML="\u2699\uFE0F")}),c.initBtn.addEventListener("click",async()=>{c.initBtn.disabled=!0,a.onInitBot&&await a.onInitBot()&&(c.uploadBtn.disabled=!1,c.loadProgressBtn.disabled=!1),c.initBtn.disabled=!1}),c.uploadBtn.addEventListener("click",()=>{o.click()}),o.addEventListener("change",async()=>{o.files.length>0&&a.onUploadImage&&await a.onUploadImage(o.files[0])&&(c.selectPosBtn.disabled=!1,c.resizeBtn.disabled=!1)}),c.loadProgressBtn.addEventListener("click",()=>{l.click()}),l.addEventListener("change",async()=>{l.files.length>0&&a.onLoadProgress&&await a.onLoadProgress(l.files[0])&&(c.selectPosBtn.disabled=!1,c.startBtn.disabled=!1,c.resizeBtn.disabled=!1)}),c.resizeBtn.addEventListener("click",()=>{a.onResizeImage&&a.onResizeImage()}),c.selectPosBtn.addEventListener("click",async()=>{a.onSelectPosition&&(c.selectPosBtn.disabled=!0,await a.onSelectPosition()&&(c.startBtn.disabled=!1),c.selectPosBtn.disabled=!1)}),c.startBtn.addEventListener("click",async()=>{a.onStartPainting&&(c.startBtn.disabled=!0,c.stopBtn.disabled=!1,await a.onStartPainting()||(c.startBtn.disabled=!1,c.stopBtn.disabled=!0))}),c.stopBtn.addEventListener("click",async()=>{a.onStopPainting&&await a.onStopPainting()&&(c.startBtn.disabled=!1,c.stopBtn.disabled=!0)});function x(f,w="default"){c.status.textContent=f,c.status.className=`status status-${w}`,c.status.style.animation="none",c.status.offsetWidth,c.status.style.animation="slideIn 0.3s ease-out"}function L(f){let{width:w,height:b}=f.getDimensions(),E=w/b;p.widthSlider.value=w,p.heightSlider.value=b,p.widthValue.textContent=w,p.heightValue.textContent=b,p.preview.src=f.img.src,p.overlay.style.display="block",p.container.style.display="block";let P=()=>{let v=parseInt(p.widthSlider.value),y=parseInt(p.heightSlider.value);p.widthValue.textContent=v,p.heightValue.textContent=y,p.preview.src=f.generatePreview(v,y)},M=()=>{if(p.keepAspect.checked){let v=parseInt(p.widthSlider.value),y=Math.round(v/E);p.heightSlider.value=y}P()},Y=()=>{if(p.keepAspect.checked){let v=parseInt(p.heightSlider.value),y=Math.round(v*E);p.widthSlider.value=y}P()};p.widthSlider.addEventListener("input",M),p.heightSlider.addEventListener("input",Y);let _=()=>{let v=parseInt(p.widthSlider.value),y=parseInt(p.heightSlider.value);a.onConfirmResize&&a.onConfirmResize(f,v,y),k()},T=()=>{k()};p.confirmBtn.addEventListener("click",_),p.cancelBtn.addEventListener("click",T),p.overlay.addEventListener("click",T),window.cleanupResizeDialog=()=>{p.widthSlider.removeEventListener("input",M),p.heightSlider.removeEventListener("input",Y),p.confirmBtn.removeEventListener("click",_),p.cancelBtn.removeEventListener("click",T),p.overlay.removeEventListener("click",T)},P()}function k(){p.overlay.style.display="none",p.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function B(f,w,b=null){let E=w>0?f/w*100:0;c.progressBar.style.width=`${E}%`;let P=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${n.progress}</div>
        <div>${f}/${w} (${E.toFixed(1)}%)</div>
      </div>
    `;b&&(b.username&&(P+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${b.username}</div>
          </div>
        `),b.charges!==void 0&&(P+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${n.charges}</div>
            <div>${Math.floor(b.charges)}</div>
          </div>
        `),b.pixels!==void 0&&(P+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${n.pixels}</div>
            <div>${b.pixels.toLocaleString()}</div>
          </div>
        `)),c.statsArea.innerHTML=P}function se(){s.remove()}return g("\u2705 Interfaz de Auto-Image creada"),{setStatus:x,updateProgress:B,showResizeDialog:L,closeResizeDialog:k,destroy:se}}function oe(n,a,s={}){return new Promise(t=>{let r=document.createElement("div");r.className="modal-overlay",r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100%",r.style.height="100%",r.style.background="rgba(0,0,0,0.7)",r.style.zIndex="10001",r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="center";let i=document.createElement("div");i.style.background="#1a1a1a",i.style.border="2px solid #333",i.style.borderRadius="15px",i.style.padding="25px",i.style.color="#eee",i.style.minWidth="350px",i.style.maxWidth="400px",i.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",i.style.fontFamily="'Segoe UI', Roboto, sans-serif",i.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${a}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${n}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${s.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${s.save}</button>`:""}
        ${s.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${s.discard}</button>`:""}
        ${s.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${s.cancel}</button>`:""}
      </div>
    `,r.appendChild(i),document.body.appendChild(r);let o=i.querySelector(".save-btn"),l=i.querySelector(".discard-btn"),d=i.querySelector(".cancel-btn"),u=()=>{document.body.removeChild(r)};o&&o.addEventListener("click",()=>{u(),t("save")}),l&&l.addEventListener("click",()=>{u(),t("discard")}),d&&d.addEventListener("click",()=>{u(),t("cancel")}),r.addEventListener("click",c=>{c.target===r&&(u(),t("cancel"))})})}async function re(){g("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),D(),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let n=null;try{let a={...C},s=R("image");if(e.language=j(),!a.SITEKEY){let i=document.querySelector("*[data-sitekey]");i?(a.SITEKEY=i.getAttribute("data-sitekey"),g(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${a.SITEKEY.substring(0,20)}...`)):g("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}let t=await ne({texts:s,onInitBot:async()=>{g("\u{1F916} Inicializando Auto-Image..."),t.setStatus(m("image.checkingColors"),"info");let i=U();if(i.length===0)return t.setStatus(m("image.noColorsFound"),"error"),!1;let o=await W(),l=null;return o.success&&o.data.user?(l={username:o.data.user.name||"An\xF3nimo",charges:o.data.charges,maxCharges:o.data.maxCharges,pixels:o.data.user.pixelsPainted||0},n=l,e.currentCharges=o.data.charges,g(`\u{1F464} Usuario conectado: ${o.data.user.name||"An\xF3nimo"} - Cargas: ${l.charges}/${l.maxCharges} - P\xEDxeles: ${l.pixels}`)):g("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=i,e.colorsChecked=!0,t.setStatus(m("image.colorsFound",{count:i.length}),"success"),t.updateProgress(0,0,l),g(`\u2705 ${i.length} colores disponibles detectados`),!0},onUploadImage:async i=>{try{t.setStatus(m("image.loadingImage"),"info");let o=window.URL.createObjectURL(i),l=new A(o);l.originalName=i.name,await l.load();let d=l.processImage(e.availableColors,a);return e.imageData=d,e.imageData.processor=l,e.totalPixels=d.validPixelCount,e.paintedPixels=0,e.originalImageName=i.name,e.imageLoaded=!0,t.setStatus(m("image.imageLoaded",{count:d.validPixelCount}),"success"),t.updateProgress(0,d.validPixelCount,n),g(`\u2705 Imagen cargada: ${d.width}x${d.height}, ${d.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(o),!0}catch(o){return t.setStatus(m("image.imageError"),"error"),g("\u274C Error cargando imagen:",o),!1}},onSelectPosition:async()=>new Promise(i=>{t.setStatus(m("image.selectPositionAlert"),"info"),t.setStatus(m("image.waitingPosition"),"info"),e.selectingPosition=!0;let o=window.fetch;window.fetch=async(l,d)=>{if(e.selectingPosition&&l.includes("/s0/paint"))try{let u=await o(l,d);if(u.ok&&d.body){let c=JSON.parse(d.body);if(c.coords&&c.coords.length>=2){let p=c.coords[0],h=c.coords[1],x=l.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);x&&(e.tileX=parseInt(x[1]),e.tileY=parseInt(x[2])),e.startPosition={x:p,y:h},e.selectingPosition=!1,window.fetch=o,t.setStatus(m("image.positionSet"),"success"),g(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${p},${h})`),i(!0)}}return u}catch(u){return g("Error interceptando pixel:",u),o(l,d)}return o(l,d)},setTimeout(()=>{e.selectingPosition&&(window.fetch=o,e.selectingPosition=!1,t.setStatus(m("image.positionTimeout"),"error"),i(!1))},12e4)}),onStartPainting:async()=>{var i;if(g("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((i=e.remainingPixels)==null?void 0:i.length)||0}),!e.imageLoaded||!e.startPosition)return t.setStatus(m("image.missingRequirements"),"error"),g(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,t.setStatus(m("image.startPaintingMsg"),"success");try{return await J(e.imageData,e.startPosition,(o,l,d)=>{n&&(n.charges=Math.floor(e.currentCharges)),t.updateProgress(o,l,n),d?t.setStatus(d,"info"):t.setStatus(m("image.paintingProgress",{painted:o,total:l}),"info")},(o,l)=>{o?(t.setStatus(m("image.paintingComplete",{count:l}),"success"),ee()):t.setStatus(m("image.paintingStopped"),"warning"),e.running=!1},o=>{t.setStatus(m("image.paintingError"),"error"),g("\u274C Error en proceso de pintado:",o),e.running=!1}),!0}catch(o){return t.setStatus(m("image.paintingError"),"error"),g("\u274C Error iniciando pintado:",o),e.running=!1,!1}},onStopPainting:async()=>{if(te().hasProgress){let o=await oe(m("image.confirmSaveProgress"),m("image.saveProgressTitle"),{save:m("image.saveProgress"),discard:m("image.discardProgress"),cancel:m("image.cancel")});if(o==="save"){let l=O();l.success?t.setStatus(m("image.progressSaved",{filename:l.filename}),"success"):t.setStatus(m("image.progressSaveError",{error:l.error}),"error")}else if(o==="cancel")return!1}return F(),t.setStatus(m("image.paintingStopped"),"warning"),!0},onSaveProgress:async()=>{let i=O();return i.success?t.setStatus(m("image.progressSaved",{filename:i.filename}),"success"):t.setStatus(m("image.progressSaveError",{error:i.error}),"error"),i.success},onLoadProgress:async i=>{try{let o=await Z(i);return o.success?(t.setStatus(m("image.progressLoaded",{painted:o.painted,total:o.total}),"success"),t.updateProgress(o.painted,o.total,n),g("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(t.setStatus(m("image.progressLoadError",{error:o.error}),"error"),!1)}catch(o){return t.setStatus(m("image.progressLoadError",{error:o.message}),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&t.showResizeDialog(e.imageData.processor)},onConfirmResize:(i,o,l)=>{g(`\u{1F504} Redimensionando imagen de ${i.getDimensions().width}x${i.getDimensions().height} a ${o}x${l}`);try{i.resize(o,l);let d=i.processImage(e.availableColors,a);e.imageData=d,e.totalPixels=d.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},t.updateProgress(0,d.validPixelCount,n),t.setStatus(m("image.resizeSuccess",{width:o,height:l}),"success"),g(`\u2705 Imagen redimensionada: ${d.validPixelCount} p\xEDxeles v\xE1lidos`)}catch(d){g(`\u274C Error redimensionando imagen: ${d.message}`),t.setStatus(m("image.imageError"),"error")}}}),r=i=>{let{language:o}=i.detail;g(`\u{1F30D} Imagen: Detectado cambio de idioma desde launcher: ${o}`),e.language=o};window.addEventListener("launcherLanguageChanged",r),window.addEventListener("languageChanged",r),window.addEventListener("beforeunload",()=>{F(),t.destroy(),window.removeEventListener("launcherLanguageChanged",r),window.removeEventListener("languageChanged",r),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),g("\u2705 Auto-Image inicializado correctamente")}catch(a){throw g("\u274C Error inicializando Auto-Image:",a),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),a}}(()=>{"use strict";var n,a;if((n=window.__wplaceBot)!=null&&n.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((a=window.__wplaceBot)!=null&&a.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,re().catch(s=>{console.error("[BOT] Error en Auto-Image:",s),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
