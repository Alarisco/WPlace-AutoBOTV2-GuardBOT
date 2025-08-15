/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T14:31:06.740Z */
(()=>{var p=(...e)=>console.log("[WPA-UI]",...e);var x={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",TILE_X:1086,TILE_Y:1565,TILE_SIZE:3e3,DELAY_MS:15e3,MIN_CHARGES:10,CHARGE_REGEN_MS:3e4,PIXELS_PER_BATCH:20,COLOR_MIN:1,COLOR_MAX:32,COLOR_MODE:"random",COLOR_FIXED:1,CUSTOM_PALETTE:["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF"],UI_THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",running:"#00cc00"}},g={running:!1,painted:0,last:null,charges:{count:0,max:0,cooldownMs:3e4},user:null,panel:null,captureMode:!1,originalFetch:window.fetch,retryCount:0,inCooldown:!1,nextPaintTime:0,cooldownEndTime:0,health:null};function C(e){try{localStorage.setItem("WPA_UI_CFG",JSON.stringify(e))}catch{}}function R(e){try{let a=localStorage.getItem("WPA_UI_CFG");if(a){let t={...e,...JSON.parse(a)};return!Number.isFinite(t.TILE_X)||!Number.isFinite(t.TILE_Y)?(console.log("[WPA-UI]",`Configuraci\xF3n corrupta detectada: coordenadas (${t.TILE_X},${t.TILE_Y}) inv\xE1lidas`),H(),{...e}):t}}catch{}return{...e}}function H(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n del farm reseteada")}catch{}}function de(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n reseteada a valores seguros")}catch{}}var W="https://backend.wplace.live";async function U(){var e,a,t;try{let r=await fetch(`${W}/me`,{credentials:"include"}).then(u=>u.json()),i=r||null,o=(r==null?void 0:r.charges)||{},s={count:(e=o.count)!=null?e:0,max:(a=o.max)!=null?a:0,cooldownMs:(t=o.cooldownMs)!=null?t:3e4};return{success:!0,data:{user:i,charges:s.count,maxCharges:s.max,chargeRegen:s.cooldownMs}}}catch(r){return{success:!1,error:r.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function ue(){try{let e=await fetch(`${W}/health`,{method:"GET",credentials:"include"});return e.ok?{...await e.json(),lastCheck:Date.now(),status:"online"}:{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"error",statusCode:e.status}}catch(e){return{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"offline",error:e.message}}}async function pe(e,a,t,r,i){try{let o=JSON.stringify({colors:a,coords:e,t}),s=new AbortController,u=setTimeout(()=>s.abort(),15e3),d=await fetch(`${W}/s0/pixel/${r}/${i}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:o,signal:s.signal});clearTimeout(u);let f=null;try{let n=await d.text();n&&(f=JSON.parse(n))}catch{f={}}return{status:d.status,json:f,success:d.ok}}catch(o){return{status:0,json:{error:o.message},success:!1}}}function L(e,a,t){return Math.max(a,Math.min(t,e))}function me(e,a){let t=0,r=0,i=0,o=0;e.style.cursor="move",e.addEventListener("mousedown",s);function s(f){f.preventDefault(),i=f.clientX,o=f.clientY,document.addEventListener("mouseup",d),document.addEventListener("mousemove",u)}function u(f){f.preventDefault(),t=i-f.clientX,r=o-f.clientY,i=f.clientX,o=f.clientY;let n=a.offsetTop-r,l=a.offsetLeft-t;a.style.top=Math.max(0,n)+"px",a.style.left=Math.max(0,l)+"px"}function d(){document.removeEventListener("mouseup",d),document.removeEventListener("mousemove",u)}}var ge={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm."},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var fe={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm."},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var he={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm."},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var P={es:ge,en:fe,fr:he},j="es",q=P[j];function Ie(){let a=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return P[a]?a:"es"}function ye(){try{return localStorage.getItem("wplace-autobot-language")}catch(e){return console.warn("No se pudo acceder a localStorage:",e),null}}function Se(e){try{localStorage.setItem("wplace-autobot-language",e)}catch(a){console.warn("No se pudo guardar el idioma en localStorage:",a)}}function G(){let e=ye(),a=Ie(),t="es";return e&&P[e]?t=e:a&&P[a]&&(t=a),Le(t),t}function Le(e){if(!P[e]){console.warn(`Idioma '${e}' no disponible. Usando '${j}'`);return}j=e,q=P[e],Se(e),typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:e,translations:q}}))}function c(e,a={}){let t=e.split("."),r=q;for(let i of t)if(r&&typeof r=="object"&&i in r)r=r[i];else return console.warn(`Clave de traducci\xF3n no encontrada: '${e}'`),e;return typeof r!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${e}'`),e):Te(r,a)}function Te(e,a){return!a||Object.keys(a).length===0?e:e.replace(/\{(\w+)\}/g,(t,r)=>a[r]!==void 0?a[r]:t)}G();function we(e,a,t,r){var M,B,F,Q,ee,te,ae,ne,oe,re,ie,se;let i=document.createElement("div");i.id="wplace-farm-ui",i.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let o=i.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=`
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
  `,o.appendChild(s);let u=document.createElement("div");u.className="wplace-container";let d={minimized:!1,showAdvanced:!1};u.innerHTML=`
    <div class="wplace-header">
      <div class="wplace-title">
        \u{1F916} ${c("farm.title")}
      </div>
      <button class="wplace-minimize">\u2212</button>
    </div>
    
    <div class="wplace-content">
      <!-- Estado y controles principales -->
      <div class="wplace-section">
        <div class="wplace-status" id="status">\u{1F4A4} ${c("farm.stopped")}</div>
        
        <div class="wplace-stats">
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="painted-count">0</div>
            <div class="wplace-stat-label">${c("farm.painted")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="charges-count">0</div>
            <div class="wplace-stat-label">${c("farm.charges")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="retry-count">0</div>
            <div class="wplace-stat-label">${c("farm.retries")}</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="tile-pos">0,0</div>
            <div class="wplace-stat-label">${c("farm.tile")}</div>
          </div>
        </div>
        
        <div class="wplace-buttons">
          <button class="wplace-button start" id="start-btn">\u25B6\uFE0F ${c("farm.start")}</button>
          <button class="wplace-button stop" id="stop-btn" disabled>\u23F9\uFE0F ${c("farm.stop")}</button>
          <button class="wplace-button calibrate" id="calibrate-btn">\u{1F3AF} ${c("farm.calibrate")}</button>
          <button class="wplace-button small" id="once-btn">\u{1F3A8} ${c("farm.paintOnce")}</button>
        </div>
        
        <div class="wplace-health" id="health-status">\u{1F50D} ${c("farm.checkingStatus")}</div>
      </div>
      
      <!-- Configuraci\xF3n b\xE1sica -->
      <div class="wplace-section">
        <div class="wplace-section-title">\u2699\uFE0F ${c("farm.configuration")}</div>
        
        <div class="wplace-row">
          <span class="wplace-label">${c("farm.delay")}:</span>
          <input type="number" class="wplace-input" id="delay-input" min="1000" max="300000" step="1000">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${c("farm.pixelsPerBatch")}:</span>
          <input type="number" class="wplace-input" id="pixels-input" min="1" max="50">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${c("farm.minCharges")}:</span>
          <input type="number" class="wplace-input" id="min-charges-input" min="0" max="50" step="0.1">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">${c("farm.colorMode")}:</span>
          <select class="wplace-select" id="color-mode-select">
            <option value="random">${c("farm.random")}</option>
            <option value="fixed">${c("farm.fixed")}</option>
          </select>
        </div>
        
        <div class="wplace-row" id="color-range-row">
          <span class="wplace-label">${c("farm.range")}:</span>
          <input type="number" class="wplace-input" id="color-min-input" min="1" max="32" style="width: 35px;">
          <span style="color: #cbd5e0;">-</span>
          <input type="number" class="wplace-input" id="color-max-input" min="1" max="32" style="width: 35px;">
        </div>
        
        <div class="wplace-row" id="color-fixed-row" style="display: none;">
          <span class="wplace-label">${c("farm.fixedColor")}:</span>
          <input type="number" class="wplace-input" id="color-fixed-input" min="1" max="32">
        </div>
      </div>
      
      <!-- Configuraci\xF3n avanzada (colapsable) -->
      <div class="wplace-section">
        <div class="wplace-section-title" id="advanced-toggle">
          \u{1F527} ${c("farm.advanced")} <span id="advanced-arrow">\u25B6</span>
        </div>
        
        <div class="wplace-advanced" id="advanced-section" style="display: none;">
          <div class="wplace-row">
            <span class="wplace-label">${c("farm.tileX")}:</span>
            <input type="number" class="wplace-input" id="tile-x-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">${c("farm.tileY")}:</span>
            <input type="number" class="wplace-input" id="tile-y-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">${c("farm.customPalette")}:</span>
          </div>
          <div class="wplace-row">
            <input type="text" class="wplace-input wide" id="custom-palette-input" 
                   placeholder="${c("farm.paletteExample")}">
          </div>
          
          <div class="wplace-buttons">
            <button class="wplace-button small" id="save-btn">\u{1F4BE} ${c("common.save")}</button>
            <button class="wplace-button small" id="load-btn">\u{1F4C1} ${c("common.load")}</button>
            <button class="wplace-button small" id="reset-btn">\u{1F504} ${c("common.reset")}</button>
            <button class="wplace-button small" id="capture-btn">\u{1F4F8} ${c("farm.capture")}</button>
          </div>
        </div>
      </div>
    </div>
  `,o.appendChild(u),document.body.appendChild(i);let f=o.querySelector(".wplace-header");me(f,i);let n={minimizeBtn:o.querySelector(".wplace-minimize"),content:o.querySelector(".wplace-content"),status:o.getElementById("status"),paintedCount:o.getElementById("painted-count"),chargesCount:o.getElementById("charges-count"),retryCount:o.getElementById("retry-count"),tilePos:o.getElementById("tile-pos"),startBtn:o.getElementById("start-btn"),stopBtn:o.getElementById("stop-btn"),calibrateBtn:o.getElementById("calibrate-btn"),onceBtn:o.getElementById("once-btn"),healthStatus:o.getElementById("health-status"),delayInput:o.getElementById("delay-input"),pixelsInput:o.getElementById("pixels-input"),minChargesInput:o.getElementById("min-charges-input"),colorModeSelect:o.getElementById("color-mode-select"),colorRangeRow:o.getElementById("color-range-row"),colorFixedRow:o.getElementById("color-fixed-row"),colorMinInput:o.getElementById("color-min-input"),colorMaxInput:o.getElementById("color-max-input"),colorFixedInput:o.getElementById("color-fixed-input"),advancedToggle:o.getElementById("advanced-toggle"),advancedSection:o.getElementById("advanced-section"),advancedArrow:o.getElementById("advanced-arrow"),tileXInput:o.getElementById("tile-x-input"),tileYInput:o.getElementById("tile-y-input"),customPaletteInput:o.getElementById("custom-palette-input"),saveBtn:o.getElementById("save-btn"),loadBtn:o.getElementById("load-btn"),resetBtn:o.getElementById("reset-btn"),captureBtn:o.getElementById("capture-btn")};function l(){n.delayInput.value=e.DELAY_MS,n.pixelsInput.value=e.PIXELS_PER_BATCH,n.minChargesInput.value=e.MIN_CHARGES,n.colorModeSelect.value=e.COLOR_MODE,n.colorMinInput.value=e.COLOR_MIN,n.colorMaxInput.value=e.COLOR_MAX,n.colorFixedInput.value=e.COLOR_FIXED,n.tileXInput.value=e.TILE_X||"",n.tileYInput.value=e.TILE_Y||"",n.customPaletteInput.value=(e.CUSTOM_PALETTE||[]).join(","),m(),I()}function h(){e.DELAY_MS=parseInt(n.delayInput.value)||x.DELAY_MS,e.PIXELS_PER_BATCH=L(parseInt(n.pixelsInput.value)||x.PIXELS_PER_BATCH,1,50),e.MIN_CHARGES=parseFloat(n.minChargesInput.value)||x.MIN_CHARGES,e.COLOR_MODE=n.colorModeSelect.value,e.COLOR_MIN=L(parseInt(n.colorMinInput.value)||x.COLOR_MIN,1,32),e.COLOR_MAX=L(parseInt(n.colorMaxInput.value)||x.COLOR_MAX,1,32),e.COLOR_FIXED=L(parseInt(n.colorFixedInput.value)||x.COLOR_FIXED,1,32),e.COLOR_MIN>e.COLOR_MAX&&(e.COLOR_MAX=e.COLOR_MIN,n.colorMaxInput.value=e.COLOR_MAX);let w=parseInt(n.tileXInput.value),E=parseInt(n.tileYInput.value);Number.isFinite(w)&&(e.TILE_X=w),Number.isFinite(E)&&(e.TILE_Y=E),I()}function m(){let w=n.colorModeSelect.value;n.colorRangeRow.style.display=w==="random"?"flex":"none",n.colorFixedRow.style.display=w==="fixed"?"flex":"none"}function I(){n.tilePos&&(n.tilePos.textContent=`${e.TILE_X||0},${e.TILE_Y||0}`)}(M=n.minimizeBtn)==null||M.addEventListener("click",()=>{d.minimized=!d.minimized,n.content.classList.toggle("minimized",d.minimized),n.minimizeBtn.textContent=d.minimized?"+":"\u2212"}),(B=n.startBtn)==null||B.addEventListener("click",()=>{h(),a(),y(!0)}),(F=n.stopBtn)==null||F.addEventListener("click",()=>{t(),y(!1)}),(Q=n.calibrateBtn)==null||Q.addEventListener("click",()=>{r()}),(ee=n.onceBtn)==null||ee.addEventListener("click",()=>{h(),window.WPAUI&&window.WPAUI.once&&window.WPAUI.once()}),(te=n.colorModeSelect)==null||te.addEventListener("change",()=>{m(),h()}),(ae=n.customPaletteInput)==null||ae.addEventListener("input",()=>{h()}),(ne=n.advancedToggle)==null||ne.addEventListener("click",()=>{d.showAdvanced=!d.showAdvanced,n.advancedSection.style.display=d.showAdvanced?"block":"none",n.advancedArrow.textContent=d.showAdvanced?"\u25BC":"\u25B6"}),["delayInput","pixelsInput","minChargesInput","colorMinInput","colorMaxInput","colorFixedInput","tileXInput","tileYInput"].forEach(w=>{var E;(E=n[w])==null||E.addEventListener("change",h)}),(oe=n.saveBtn)==null||oe.addEventListener("click",()=>{h(),C(e),S(`\u{1F4BE} ${c("farm.configSaved")}`,"success")}),(re=n.loadBtn)==null||re.addEventListener("click",()=>{let w=R(x);Object.assign(e,w),l(),S(`\u{1F4C1} ${c("farm.configLoaded")}`,"success")}),(ie=n.resetBtn)==null||ie.addEventListener("click",()=>{H(),Object.assign(e,x),l(),S(`\u{1F504} ${c("farm.configReset")}`,"success")}),(se=n.captureBtn)==null||se.addEventListener("click",()=>{S(`\u{1F4F8} ${c("farm.captureInstructions")}`,"status")});function y(w){n.startBtn&&(n.startBtn.disabled=w),n.stopBtn&&(n.stopBtn.disabled=!w)}function S(w,E="status"){n.status&&(n.status.textContent=w,n.status.className=`wplace-status ${E}`,p(`Status: ${w}`))}function _(w,E,O=0,T=null){n.paintedCount&&(n.paintedCount.textContent=w||0),n.chargesCount&&(n.chargesCount.textContent=typeof E=="number"?E.toFixed(1):"0"),n.retryCount&&(n.retryCount.textContent=O||0),n.healthStatus&&T&&(n.healthStatus.textContent=T.up?`\u{1F7E2} ${c("farm.backendOnline")}`:`\u{1F534} ${c("farm.backendOffline")}`,n.healthStatus.className=`wplace-health ${T.up?"online":"offline"}`)}function v(){u.style.boxShadow="0 0 20px #48bb78",setTimeout(()=>{u.style.boxShadow="0 10px 25px rgba(0,0,0,0.3)"},200)}l();function b(){let w=o.querySelector(".wplace-title");w&&(w.innerHTML=`\u{1F916} ${c("farm.title")}`),n.startBtn&&(n.startBtn.innerHTML=`\u25B6\uFE0F ${c("farm.start")}`),n.stopBtn&&(n.stopBtn.innerHTML=`\u23F9\uFE0F ${c("farm.stop")}`),n.calibrateBtn&&(n.calibrateBtn.innerHTML=`\u{1F3AF} ${c("farm.calibrate")}`),n.onceBtn&&(n.onceBtn.innerHTML=`\u{1F3A8} ${c("farm.paintOnce")}`);let E=o.querySelector("#painted-count").parentElement.querySelector(".wplace-stat-label"),O=o.querySelector("#charges-count").parentElement.querySelector(".wplace-stat-label"),T=o.querySelector("#retry-count").parentElement.querySelector(".wplace-stat-label"),le=o.querySelector("#tile-pos").parentElement.querySelector(".wplace-stat-label");E&&(E.textContent=c("farm.painted")),O&&(O.textContent=c("farm.charges")),T&&(T.textContent=c("farm.retries")),le&&(le.textContent=c("farm.tile"));let ce=o.querySelector(".wplace-section-title");ce&&(ce.innerHTML=`\u2699\uFE0F ${c("farm.configuration")}`);let X=o.getElementById("advanced-toggle");if(X){let $=X.querySelector("#advanced-arrow"),k=$?$.textContent:"\u25B6";X.innerHTML=`\u{1F527} ${c("farm.advanced")} <span id="advanced-arrow">${k}</span>`}let Y=n.colorModeSelect;if(Y){let $=Y.querySelector('option[value="random"]'),k=Y.querySelector('option[value="fixed"]');$&&($.textContent=c("farm.random")),k&&(k.textContent=c("farm.fixed"))}n.customPaletteInput&&(n.customPaletteInput.placeholder=c("farm.paletteExample")),n.saveBtn&&(n.saveBtn.innerHTML=`\u{1F4BE} ${c("common.save")}`),n.loadBtn&&(n.loadBtn.innerHTML=`\u{1F4C1} ${c("common.load")}`),n.resetBtn&&(n.resetBtn.innerHTML=`\u{1F504} ${c("common.reset")}`),n.captureBtn&&(n.captureBtn.innerHTML=`\u{1F4F8} ${c("farm.capture")}`);let D=n.healthStatus;D&&D.textContent.includes("\u{1F50D}")&&(D.textContent=`\u{1F50D} ${c("farm.checkingStatus")}`);let N=n.status;N&&N.textContent.includes("\u{1F4A4}")&&(N.textContent=`\u{1F4A4} ${c("farm.stopped")}`)}return window.addEventListener("languageChanged",b),{setStatus:S,updateStats:_,flashEffect:v,updateButtonStates:y,updateTexts:b,destroy:()=>{window.removeEventListener("languageChanged",b),document.body.removeChild(i)},updateConfig:l,getElement:()=>i}}async function V(e){try{p("\u{1F3AF} Iniciando auto-calibraci\xF3n del tile...");let a=new window.URLSearchParams(window.location.search),t=window.location.hash,r,i;if(a.has("x")&&a.has("y")&&(r=parseInt(a.get("x")),i=parseInt(a.get("y"))),!r&&!i&&t){let o=t.match(/#(-?\d+),(-?\d+)/);o&&(r=parseInt(o[1]),i=parseInt(o[2]))}if(!r&&!i){let o=document.querySelectorAll("[data-x], [data-y], .coordinates, .position");for(let s of o){let u=s.getAttribute("data-x")||s.getAttribute("x"),d=s.getAttribute("data-y")||s.getAttribute("y");if(u&&d){r=parseInt(u),i=parseInt(d);break}}}if(!r&&!i){let s=(document.body.textContent||"").match(/(?:tile|pos|position)?\s*[([]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);s&&(r=parseInt(s[1]),i=parseInt(s[2]))}return(!Number.isFinite(r)||!Number.isFinite(i))&&(r=0,i=0,p("\u26A0\uFE0F No se pudieron detectar coordenadas autom\xE1ticamente, usando (0,0)")),(Math.abs(r)>1e6||Math.abs(i)>1e6)&&(p("\u26A0\uFE0F Coordenadas detectadas parecen incorrectas, limitando a rango v\xE1lido"),r=Math.max(-1e6,Math.min(1e6,r)),i=Math.max(-1e6,Math.min(1e6,i))),e.TILE_X=r,e.TILE_Y=i,p(`\u2705 Tile calibrado autom\xE1ticamente: (${r}, ${i})`),C(e),{tileX:r,tileY:i,success:!0}}catch(a){return p("\u274C Error en auto-calibraci\xF3n:",a),{tileX:0,tileY:0,success:!1,error:a.message}}}var xe=!1;async function Pe(){if(!(xe||window.turnstile))return new Promise((e,a)=>{let t=document.createElement("script");t.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",t.async=!0,t.defer=!0,t.onload=()=>{xe=!0,e()},t.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(t)})}async function $e(e,a="paint"){var t;if(await Pe(),typeof((t=window.turnstile)==null?void 0:t.execute)=="function")try{let r=await window.turnstile.execute(e,{action:a});if(r&&r.length>20)return r}catch{}return await new Promise(r=>{let i=document.createElement("div");i.style.position="fixed",i.style.left="-9999px",document.body.appendChild(i),window.turnstile.render(i,{sitekey:e,callback:o=>{document.body.removeChild(i),r(o)}})})}async function be(e){return $e(e,"paint")}var Ae=e=>Math.floor(Math.random()*e);function _e(e){let a=Math.floor(e.TILE_SIZE*.05),t=e.TILE_SIZE-a*2;if(t<=0)return p("Error: \xE1rea segura inv\xE1lida, usando coordenadas b\xE1sicas"),[Math.floor(Math.random()*e.TILE_SIZE),Math.floor(Math.random()*e.TILE_SIZE)];let r=a+Math.floor(Math.random()*t),i=a+Math.floor(Math.random()*t);return Math.random()<.1&&p(`Coordenadas locales generadas: (${r},${i}) en \xE1rea segura [${a}-${a+t-1}]`),[r,i]}function Ee(e,a){let t=[];for(let r=0;r<e;r++){let i=_e(a);t.push(...i)}return t}function ve(e,a){let t=[];for(let r=0;r<e;r++)t.push(Me(a));return t}function Me(e){if(e.COLOR_MODE==="fixed")return e.COLOR_FIXED;{let a=e.COLOR_MAX-e.COLOR_MIN+1;return e.COLOR_MIN+Ae(a)}}var z=e=>new Promise(a=>setTimeout(a,e));async function A(e,a,t){let i=Date.now()+e;for(;Date.now()<i&&(!t||t.running);){let o=i-Date.now();a&&a(o),await z(Math.min(1e3,o))}}async function Be(e,a,t){try{let r=document.querySelectorAll("canvas");for(let i of r){let o=i.getContext("2d");if(o){let s=typeof t=="number"?`#${t.toString(16).padStart(6,"0")}`:t;o.fillStyle=s,o.fillRect(e,a,1,1),typeof window!="undefined"&&window.Event&&i.dispatchEvent(new window.Event("pixel-updated"))}}}catch(r){p("Error actualizando canvas:",r)}}async function Fe(e,a){try{let t=`[data-tile="${e}-${a}"], .tile-${e}-${a}, [data-tile-x="${e}"][data-tile-y="${a}"]`,r=document.querySelector(t);r?(r.classList.add("tile-updating"),setTimeout(()=>{r.classList.remove("tile-updating"),r.classList.add("tile-updated"),setTimeout(()=>r.classList.remove("tile-updated"),1e3)},100),p(`Tile (${e},${a}) actualizado visualmente`)):(document.querySelectorAll("canvas").forEach(o=>{let s=o.getContext("2d");if(s){let u=s.getImageData(0,0,1,1);s.putImageData(u,0,0)}}),p(`Actualizaci\xF3n visual gen\xE9rica realizada para tile (${e},${a})`))}catch(t){p("Error en actualizaci\xF3n visual del tile:",t)}}async function Oe(e,a,t,r,i){var I,y,S,_;if(!Number.isFinite(e.TILE_X)||!Number.isFinite(e.TILE_Y))return t(`\u{1F6AB} Coordenadas del tile inv\xE1lidas (${e.TILE_X},${e.TILE_Y}). Calibra primero`,"error"),p("Pintado cancelado: coordenadas del tile inv\xE1lidas"),!1;let o=Math.floor(a.charges.count);if(o<1)return t("\u{1F50B} Sin cargas disponibles. Esperando...","error"),!1;let s=Math.min(o,e.PIXELS_PER_BATCH,50),u=Math.max(1,s);u<e.PIXELS_PER_BATCH&&p(`Ajustando p\xEDxeles por cargas completas disponibles: ${u}/${e.PIXELS_PER_BATCH} (${o} cargas completas de ${a.charges.count.toFixed(2)} totales)`);let d=Ee(u,e),f=ve(u,e),n=d[0],l=d[1];t(`\u{1F3A8} Pintando ${u} p\xEDxeles (${o} cargas completas) en tile(${e.TILE_X},${e.TILE_Y}) local(${n},${l})...`,"status");let h=await be(e.SITEKEY),m=await pe(d,f,h,e.TILE_X,e.TILE_Y);if(a.last={x:n,y:l,color:f[0],pixelCount:u,availableCharges:o,status:m.status,json:m.json},m.status===200&&m.json&&(m.json.painted>0||m.json.painted===u)){let v=m.json.painted||u;a.painted+=v,a.retryCount=0;for(let b=0;b<d.length;b+=2){let M=d[b],B=d[b+1],F=f[Math.floor(b/2)];await Be(M,B,F)}if(await Fe(e.TILE_X,e.TILE_Y),await i(),t(`\u2705 Lote pintado: ${v}/${u} p\xEDxeles (${o} cargas usadas)`,"success"),r(),typeof window!="undefined"&&window.CustomEvent){let b=new window.CustomEvent("wplace-batch-painted",{detail:{firstX:n,firstY:l,pixelCount:v,totalPixels:u,colors:f,coords:d,tileX:e.TILE_X,tileY:e.TILE_Y,timestamp:Date.now()}});window.dispatchEvent(b)}return!0}if(m.status===403)t("\u26A0\uFE0F 403 (token expirado o Cloudflare). Reintentar\xE1...","error");else if(m.status===401)t("\u{1F512} 401 (no autorizado). Verifica tu sesi\xF3n.","error");else if(m.status===429)t("\u23F3 429 (l\xEDmite de tasa). Esperando...","error");else if(m.status===408)t("\u23F0 Timeout del servidor. Coordenadas problem\xE1ticas o servidor sobrecargado","error");else if(m.status===0)t("\u{1F310} Error de red. Verificando conectividad...","error");else if(m.status===500)t("\u{1F525} 500 (error interno del servidor). Reintentar\xE1...","error");else if(m.status===502||m.status===503||m.status===504)t(`\u{1F6AB} ${m.status} (servidor no disponible). Reintentar\xE1...`,"error");else if(m.status===404)t(`\u{1F5FA}\uFE0F 404 (tile no encontrado). Verificando coordenadas tile(${e.TILE_X},${e.TILE_Y})`,"error");else try{let v=await checkBackendHealth(),b=v!=null&&v.up?"\u{1F7E2} Online":"\u{1F534} Offline";t(`\u274C Error ${m.status}: ${((I=m.json)==null?void 0:I.message)||((y=m.json)==null?void 0:y.error)||"Fallo al pintar"} (Backend: ${b})`,"error")}catch{t(`\u274C Error ${m.status}: ${((S=m.json)==null?void 0:S.message)||((_=m.json)==null?void 0:_.error)||"Fallo al pintar"} (Health check fall\xF3)`,"error")}return p(`Fallo en pintado: status=${m.status}, json=`,m.json,"coords=",d,"colors=",f),!1}async function Z(e,a,t,r,i,o){for(let d=1;d<=5;d++)try{if(await Oe(e,a,t,r,i))return a.retryCount=0,!0;if(a.retryCount=d,d<5){let n=3e3*Math.pow(2,d-1);t(`\u{1F504} Reintento ${d}/5 en ${n/1e3}s...`,"error"),await z(n)}}catch(f){if(p(`Error en intento ${d}:`,f),a.retryCount=d,d<5){let n=3e3*Math.pow(2,d-1);t(`\u{1F4A5} Error en intento ${d}/5, reintentando en ${n/1e3}s...`,"error"),await z(n)}}return a.retryCount=5,t("\u274C Fall\xF3 despu\xE9s de 5 intentos. Se requiere intervenci\xF3n manual.","error"),!1}async function Ce(e,a,t,r,i,o,s){for(p("\u{1F680} Loop iniciado"),a.running=!0;a.running;)try{if(await s(),a.charges.count<e.MIN_CHARGES){let d=Math.max(0,(e.MIN_CHARGES-a.charges.count)*e.CHARGE_REGEN_MS);t(`\u23F3 Esperando cargas: ${a.charges.count.toFixed(1)}/${e.MIN_CHARGES} (${Math.round(d/1e3)}s)`,"status"),await A(Math.min(d,e.DELAY_MS),f=>{t(`\u23F3 Esperando cargas: ${a.charges.count.toFixed(1)}/${e.MIN_CHARGES} (~${Math.round(f/1e3)}s)`,"status")},a);continue}if(!await Z(e,a,t,r,i,o)){t("\u{1F634} Esperando antes del siguiente intento...","error"),await A(e.DELAY_MS*2,d=>{t(`\u{1F634} Cooldown extendido: ${Math.round(d/1e3)}s`,"error")});continue}a.running&&await A(e.DELAY_MS,d=>{t(`\u{1F4A4} Esperando ${Math.round(d/1e3)}s hasta siguiente pintada...`,"status")})}catch(u){p("Error cr\xEDtico en loop:",u),t(`\u{1F4A5} Error cr\xEDtico: ${u.message}`,"error"),a.running&&await A(e.DELAY_MS*3,d=>{t(`\u{1F6A8} Recuper\xE1ndose de error cr\xEDtico: ${Math.round(d/1e3)}s`,"error")})}p("\u23F9\uFE0F Loop detenido"),t("\u23F9\uFE0F Bot detenido","status")}var J=class{constructor(){this.active=!1,this.originalFetch=window.fetch,this.callback=null}enable(a){if(this.active){p("\u26A0\uFE0F Captura ya est\xE1 activa");return}this.active=!0,this.callback=a,p("\u{1F575}\uFE0F Captura de coordenadas activada. Pinta un p\xEDxel manualmente..."),window.fetch=async(...t)=>{let r=await this.originalFetch.apply(window,t);return this.active&&this.shouldCapture(t[0],t[1])&&await this.handleCapture(t[0],t[1],r.clone()),r},setTimeout(()=>{this.active&&(this.disable(),p("\u23F0 Captura de coordenadas expirada"))},3e4)}shouldCapture(a,t){if(!a||!t)return!1;let r=a.toString();return!(!r.includes("paint")&&!r.includes("pixel")&&!r.includes("place")||!t.method||t.method.toUpperCase()!=="POST")}async handleCapture(a,t,r){try{let i=null,o=null,s=null;if(t.body){let u;if(typeof t.body=="string")try{u=JSON.parse(t.body)}catch{u=t.body}else u=t.body;u.coords&&Array.isArray(u.coords)?i=u.coords:u.x!==void 0&&u.y!==void 0?i=[u.x,u.y]:u.coordinates&&(i=u.coordinates)}if(!i){let d=a.toString().match(/[?&](?:x|coords?)=([^&]+)/);if(d){let f=decodeURIComponent(d[1]);try{i=JSON.parse(f)}catch{let n=f.split(",");n.length>=2&&(i=[parseInt(n[0]),parseInt(n[1])])}}}if(i&&i.length>=2){let u=i[0],d=i[1];o=Math.floor(u/3e3),s=Math.floor(d/3e3),p(`\u{1F3AF} Coordenadas capturadas: global(${u},${d}) -> tile(${o},${s})`),r.ok?(this.disable(),this.callback&&this.callback({success:!0,tileX:o,tileY:s,globalX:u,globalY:d,localX:u%3e3,localY:d%3e3})):p("\u26A0\uFE0F Captura realizada pero la respuesta no fue exitosa")}}catch(i){p("Error procesando captura:",i)}}disable(){this.active&&(this.active=!1,window.fetch=this.originalFetch,this.callback=null,p("\u{1F512} Captura de coordenadas desactivada"))}},K=new J;(async function(){"use strict";var f,n;if(await G(),(f=window.__wplaceBot)!=null&&f.farmRunning){alert(c("farm.alreadyRunning","Auto-Farm ya est\xE1 corriendo."));return}if((n=window.__wplaceBot)!=null&&n.imageRunning){alert(c("farm.imageRunningWarning","Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm."));return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.farmRunning=!0,window.addEventListener("languageChanged",()=>{var l,h;(h=(l=window.__wplaceBot)==null?void 0:l.ui)!=null&&h.updateTexts&&window.__wplaceBot.ui.updateTexts()}),p("\u{1F680} Iniciando WPlace Farm Bot (versi\xF3n modular)");function e(l){let h=l.TILE_X===x.TILE_X&&l.TILE_Y===x.TILE_Y,m=!localStorage.getItem("WPA_UI_CFG"),I=!Number.isFinite(l.TILE_X)||!Number.isFinite(l.TILE_Y),y=h||m||I;return p(`Verificaci\xF3n calibraci\xF3n: defaults=${h}, noConfig=${m}, invalid=${I}, coords=(${l.TILE_X},${l.TILE_Y})`),y}function a(){p("\u{1F575}\uFE0F Activando captura de coordenadas..."),K.enable(l=>{l.success?(t.TILE_X=l.tileX,t.TILE_Y=l.tileY,C(t),s.updateConfig(),s.setStatus(`\u{1F3AF} Coordenadas capturadas: tile(${l.tileX},${l.tileY})`,"success"),p(`\u2705 Coordenadas capturadas autom\xE1ticamente: tile(${l.tileX},${l.tileY})`)):s.setStatus(`\u274C ${c("common.error","No se pudieron capturar coordenadas")}`,"error")}),s.setStatus(`\u{1F4F8} ${c("farm.captureInstructions")}`,"status")}let t={...x,...R(x)};if(!t.SITEKEY){let l=document.querySelector("*[data-sitekey]");l?(t.SITEKEY=l.getAttribute("data-sitekey"),p(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${t.SITEKEY.substring(0,20)}...`),C(t)):p("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function r(){try{let l=await U();if(l.success&&l.data){g.charges.count=l.data.charges||0,g.charges.max=l.data.maxCharges||50,g.charges.regen=l.data.chargeRegen||3e4,g.user=l.data.user,t.CHARGE_REGEN_MS=g.charges.regen;let h=await i();return g.health=h,s.updateStats(g.painted,g.charges.count,g.retryCount,h),l.data}return null}catch(l){return p("Error actualizando estad\xEDsticas:",l),null}}async function i(){try{return await ue()}catch(l){return p("Error verificando health:",l),{up:!1,error:l.message}}}async function o(){return await Z(t,g,s.setStatus,s.flashEffect,()=>U(),i)}let s=we(t,async()=>{if(g.running){s.setStatus("\u26A0\uFE0F El bot ya est\xE1 ejecut\xE1ndose","error");return}if(e(t)){s.setStatus("\u{1F3AF} Calibrando autom\xE1ticamente...","status");let m=await V(t);if(m.success)s.setStatus(`\u2705 Calibrado: tile(${m.tileX},${m.tileY})`,"success"),s.updateConfig();else{s.setStatus("\u274C Error en calibraci\xF3n. Configura manualmente.","error");return}}if(s.setStatus("\u{1F50D} Verificando conectividad...","status"),!(await i()).up){s.setStatus("\u{1F534} Backend no disponible. Verifica tu conexi\xF3n.","error");return}if(s.setStatus("\u{1F504} Obteniendo informaci\xF3n de sesi\xF3n...","status"),!await r()){s.setStatus("\u274C Error obteniendo sesi\xF3n. Verifica tu login.","error");return}s.setStatus("\u{1F680} Iniciando bot...","status"),s.updateButtonStates(!0),Ce(t,g,s.setStatus,s.flashEffect,r,i,r)},()=>{g.running=!1,window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),s.setStatus("\u23F9\uFE0F Deteniendo bot...","status"),s.updateButtonStates(!1)},async()=>{s.setStatus("\u{1F3AF} Calibrando posici\xF3n...","status");let l=await V(t);l.success?(s.setStatus(`\u2705 Calibrado: tile(${l.tileX},${l.tileY})`,"success"),s.updateConfig()):s.setStatus(`\u274C Error en calibraci\xF3n: ${l.error||"Desconocido"}`,"error")}),u=s.getElement().shadowRoot.getElementById("capture-btn");u&&u.addEventListener("click",a);let d=s.getElement().shadowRoot.getElementById("once-btn");d&&d.addEventListener("click",async()=>{if(g.running){s.setStatus("\u26A0\uFE0F Det\xE9n el bot primero","error");return}await r(),s.setStatus("\u{1F3A8} Pintando una vez...","status"),await o()?s.setStatus("\u2705 P\xEDxel pintado exitosamente","success"):s.setStatus("\u274C Error al pintar p\xEDxel","error")}),await r(),window.addEventListener("wplace-batch-painted",l=>{p(`\u{1F3A8} Lote pintado: ${l.detail.pixelCount} p\xEDxeles en tile(${l.detail.tileX},${l.detail.tileY})`)}),window.WPAUI={once:o,get:()=>({...t}),capture:a,refreshCanvas:()=>{g.last&&p(`Refrescando canvas en posici\xF3n (${g.last.x},${g.last.y})`)},verifyPixel:async(l,h)=>(p(`Verificando p\xEDxel en (${l},${h})...`),{verified:!0,x:l,y:h}),getStats:()=>({painted:g.painted,last:g.last,charges:g.charges,user:g.user,running:g.running,minCharges:t.MIN_CHARGES,delay:t.DELAY_MS,tileInfo:{tileX:t.TILE_X,tileY:t.TILE_Y,tileSize:t.TILE_SIZE,safeMargin:Math.floor(t.TILE_SIZE*.05),safeArea:{minX:Math.floor(t.TILE_SIZE*.05),maxX:t.TILE_SIZE-Math.floor(t.TILE_SIZE*.05)-1,minY:Math.floor(t.TILE_SIZE*.05),maxY:t.TILE_SIZE-Math.floor(t.TILE_SIZE*.05)-1}}}),setPixelsPerBatch:l=>{t.PIXELS_PER_BATCH=L(l,1,50),C(t),s.updateConfig(),p(`P\xEDxeles por lote configurado a: ${t.PIXELS_PER_BATCH}`)},setMinCharges:l=>{t.MIN_CHARGES=Math.max(0,l),C(t),s.updateConfig(),p(`Cargas m\xEDnimas configuradas a: ${t.MIN_CHARGES}`)},setDelay:l=>{t.DELAY_MS=Math.max(1e3,l*1e3),C(t),s.updateConfig(),p(`Delay configurado a: ${t.DELAY_MS}ms`)},diagnose:()=>{var m;let l=window.WPAUI.getStats(),h={configValid:Number.isFinite(t.TILE_X)&&Number.isFinite(t.TILE_Y),hasCharges:g.charges.count>0,backendHealthy:((m=g.health)==null?void 0:m.up)||!1,userLoggedIn:!!g.user,coordinates:`(${t.TILE_X},${t.TILE_Y})`,safeArea:l.tileInfo.safeArea,recommendations:[]};return h.configValid||h.recommendations.push("Calibrar coordenadas del tile"),h.hasCharges||h.recommendations.push("Esperar a que se regeneren las cargas"),h.backendHealthy||h.recommendations.push("Verificar conexi\xF3n al backend"),h.userLoggedIn||h.recommendations.push("Iniciar sesi\xF3n en la plataforma"),console.table(h),h},checkHealth:i,resetConfig:()=>{de(),t={...x},s.updateConfig(),p("Configuraci\xF3n reseteada a valores por defecto")},debugRetries:()=>({currentRetries:g.retryCount,inCooldown:g.inCooldown,nextPaintTime:g.nextPaintTime,cooldownEndTime:g.cooldownEndTime}),forceClearCooldown:()=>{g.inCooldown=!1,g.nextPaintTime=0,g.cooldownEndTime=0,g.retryCount=0,p("Cooldown forzado a limpiar")},simulateError:(l=500)=>{p(`Simulando error ${l} para testing...`),s.setStatus(`\u{1F9EA} Simulando error ${l}`,"error")}},window.addEventListener("beforeunload",()=>{g.running=!1,window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),K.disable(),s.destroy()}),p("\u2705 Farm Bot inicializado correctamente"),p("\u{1F4A1} Usa console.log(window.WPAUI) para ver la API disponible")})().catch(e=>{console.error("[BOT] Error en Auto-Farm:",e),window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),alert("Auto-Farm: error inesperado. Revisa consola.")});})();
