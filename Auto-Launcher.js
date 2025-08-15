/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T13:50:38.072Z */
(()=>{var i=(...a)=>console.log("[WPA-UI]",...a);function H(a=null){let t=document.createElement("div");a&&(t.id=a),t.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let r=t.attachShadow({mode:"open"});return document.body.appendChild(t),{host:t,root:r}}function _(a,t){let r=0,p=0,c=0,l=0;a.style.cursor="move",a.addEventListener("mousedown",n);function n(m){m.target.closest(".header-btn, .wplace-header-btn")||(m.preventDefault(),c=m.clientX,l=m.clientY,document.addEventListener("mouseup",f),document.addEventListener("mousemove",d))}function d(m){m.preventDefault(),r=c-m.clientX,p=l-m.clientY,c=m.clientX,l=m.clientY,t.style.top=t.offsetTop-p+"px",t.style.left=t.offsetLeft-r+"px"}function f(){document.removeEventListener("mouseup",f),document.removeEventListener("mousemove",d)}}var q={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm."},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var U={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm."},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var D={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm."},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var A={es:{name:"Espa\xF1ol",flag:"\u{1F1EA}\u{1F1F8}",code:"es"},en:{name:"English",flag:"\u{1F1FA}\u{1F1F8}",code:"en"},fr:{name:"Fran\xE7ais",flag:"\u{1F1EB}\u{1F1F7}",code:"fr"}},P={es:q,en:U,fr:D},L="es",B=P[L];function J(){let t=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return P[t]?t:"es"}function Q(){try{return localStorage.getItem("wplace-autobot-language")}catch(a){return console.warn("No se pudo acceder a localStorage:",a),null}}function Z(a){try{localStorage.setItem("wplace-autobot-language",a)}catch(t){console.warn("No se pudo guardar el idioma en localStorage:",t)}}function k(){let a=Q(),t=J(),r="es";return a&&P[a]?r=a:t&&P[t]&&(r=t),I(r),r}function I(a){if(!P[a]){console.warn(`Idioma '${a}' no disponible. Usando '${L}'`);return}L=a,B=P[a],Z(a),typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:a,translations:B}}))}function S(){return L}function N(a){return B[a]?B[a]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${a}'`),{})}k();var g={RAW_BASE:"https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main",REFRESH_INTERVAL:6e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000"}};function T(){return N("launcher")}var u={me:null,health:null,refreshTimer:null,selectedBot:null};function W({onSelectBot:a,onLaunch:t,onClose:r,updateUserInfo:p,updateHealthInfo:c}){i("\u{1F39B}\uFE0F Creando interfaz del Launcher");let l=document.getElementById("wpl-panel");l&&(l.remove(),i("\u{1F5D1}\uFE0F Panel existente removido"));let n=T(),{host:d,root:f}=H("wpl-panel"),m=document.createElement("style");m.textContent=`
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: ${g.THEME.primary};
      border: 1px solid ${g.THEME.accent};
      border-radius: 10px;
      color: ${g.THEME.text};
      font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial;
      z-index: 999999;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      overflow: hidden;
      animation: slideIn 0.3s ease-out;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: ${g.THEME.secondary};
      padding: 10px 12px;
      color: ${g.THEME.highlight};
      font-weight: 600;
      cursor: move;
      user-select: none;
    }
    
    .body {
      padding: 12px;
    }
    
    .row {
      display: flex;
      gap: 8px;
      margin: 8px 0;
    }
    
    .btn {
      flex: 1;
      padding: 9px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn.primary {
      background: ${g.THEME.accent};
      color: white;
    }
    
    .btn.primary:hover:not(:disabled) {
      background: ${g.THEME.highlight};
    }
    
    .btn.ghost {
      background: transparent;
      border: 1px solid ${g.THEME.accent};
      color: ${g.THEME.text};
    }
    
    .btn.ghost:hover:not(:disabled) {
      background: ${g.THEME.accent}22;
    }
    
    .btn.close {
      flex: 0 0 auto;
      padding: 6px 8px;
    }
    
    .card {
      background: ${g.THEME.secondary};
      padding: 10px;
      border-radius: 8px;
      margin-top: 10px;
    }
    
    .stat {
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
      font-size: 13px;
      opacity: 0.95;
    }
    
    .status {
      margin-top: 10px;
      padding: 8px;
      border-radius: 6px;
      text-align: center;
      font-size: 13px;
      background: rgba(255,255,255,0.08);
    }
    
    .selected {
      outline: 2px solid ${g.THEME.highlight};
    }
  `,f.appendChild(m);let s=document.createElement("div");s.className="panel",s.innerHTML=`
    <div class="header">
      <div>${n.title}</div>
      <button class="btn ghost close close-btn">\u2715</button>
    </div>
    <div class="body">
      <div class="row">
        <button class="btn primary farm-btn">${n.autoFarm}</button>
        <button class="btn ghost image-btn">${n.autoImage}</button>
      </div>
      <div class="card">
        <div class="stat">
          <span>${n.selection}</span>
          <span class="choice">\u2014</span>
        </div>
      </div>
      <div class="card user-card">
        <div class="stat">
          <span>${n.user}</span>
          <span class="user-name">-</span>
        </div>
        <div class="stat">
          <span>${n.charges}</span>
          <span class="user-charges">-</span>
        </div>
      </div>
      <div class="card health-card">
        <div class="stat">
          <span>${n.backend}</span>
          <span class="backend-status">${n.checking}</span>
        </div>
        <div class="stat">
          <span>${n.database}</span>
          <span class="database-status">-</span>
        </div>
        <div class="stat">
          <span>${n.uptime}</span>
          <span class="uptime">-</span>
        </div>
      </div>
      <div class="status status-text">${n.chooseBot}</div>
      <div class="row" style="margin-top: 12px;">
        <button class="btn primary launch-btn" disabled>${n.launch}</button>
        <button class="btn ghost cancel-btn">${n.close}</button>
      </div>
    </div>
  `,f.appendChild(s);let e={header:s.querySelector(".header"),farmBtn:s.querySelector(".farm-btn"),imageBtn:s.querySelector(".image-btn"),launchBtn:s.querySelector(".launch-btn"),cancelBtn:s.querySelector(".cancel-btn"),closeBtn:s.querySelector(".close-btn"),statusText:s.querySelector(".status-text"),choice:s.querySelector(".choice"),userName:s.querySelector(".user-name"),userCharges:s.querySelector(".user-charges"),backendStatus:s.querySelector(".backend-status"),databaseStatus:s.querySelector(".database-status"),uptime:s.querySelector(".uptime")};_(e.header,s);let h=null;function x(o){h=o,u.selectedBot=o,e.choice.textContent=o==="farm"?n.autoFarm:n.autoImage,e.launchBtn.disabled=!1,o==="farm"?(e.farmBtn.classList.add("primary"),e.farmBtn.classList.remove("ghost"),e.imageBtn.classList.add("ghost"),e.imageBtn.classList.remove("primary")):(e.imageBtn.classList.add("primary"),e.imageBtn.classList.remove("ghost"),e.farmBtn.classList.add("ghost"),e.farmBtn.classList.remove("primary")),e.statusText.textContent=n.readyToLaunch,a&&a(o)}e.farmBtn.addEventListener("click",()=>x("farm")),e.imageBtn.addEventListener("click",()=>x("image")),e.launchBtn.addEventListener("click",async()=>{if(h){e.launchBtn.disabled=!0,e.launchBtn.textContent=n.loading,e.statusText.textContent=n.downloading;try{t&&(await t(h),v())}catch(o){i("\u274C Error en launch:",o),alert(n.loadErrorMsg),e.launchBtn.disabled=!1,e.launchBtn.textContent=n.launch,e.statusText.textContent=n.loadError}}});function v(){window.removeEventListener("languageChanged",C),u.refreshTimer&&(window.clearInterval(u.refreshTimer),u.refreshTimer=null),d.remove(),i("\u{1F9F9} Launcher UI eliminado")}e.cancelBtn.addEventListener("click",v),e.closeBtn.addEventListener("click",v),document.addEventListener("keydown",o=>{o.key==="Escape"&&v()},{once:!0});let C=()=>{$()};window.addEventListener("languageChanged",C);function G(o){var w,y;if(!o){e.userName.textContent="-",e.userCharges.textContent="-";return}let E=o.name||o.username||"-",b=Math.floor(Number((y=(w=o.charges)==null?void 0:w.count)!=null?y:NaN));e.userName.textContent=E,e.userCharges.textContent=Number.isFinite(b)?String(b):"-"}function K(o){if(!o){e.backendStatus.textContent=n.offline,e.databaseStatus.textContent="-",e.uptime.textContent="-";return}let E=!!o.up,b=o.database,w=o.uptime||"-";e.backendStatus.textContent=E?n.online:n.offline,b==null?e.databaseStatus.textContent="-":e.databaseStatus.textContent=b?n.ok:n.error,e.uptime.textContent=typeof w=="number"?`${w}s`:w||"-"}function $(){let o=T(),E=s.querySelector(".header div:first-child");E&&(E.textContent=o.title),e.farmBtn&&(e.farmBtn.textContent=o.autoFarm),e.imageBtn&&(e.imageBtn.textContent=o.autoImage),e.launchBtn&&(e.launchBtn.textContent=o.launch),e.closeBtn&&(e.closeBtn.textContent=o.close);let b=s.querySelector(".card:first-of-type .stat span:first-child");b&&(b.textContent=o.selection);let w=s.querySelector(".user-card .stat:first-child span:first-child");w&&(w.textContent=o.user);let y=s.querySelector(".user-card .stat:last-child span:first-child");y&&(y.textContent=o.charges);let R=s.querySelector(".health-card .stat:first-child span:first-child");R&&(R.textContent=o.backend);let O=s.querySelector(".health-card .stat:nth-child(2) span:first-child");O&&(O.textContent=o.database);let M=s.querySelector(".health-card .stat:last-child span:first-child");M&&(M.textContent=o.uptime),e.statusText&&e.statusText.textContent===n.chooseBot&&(e.statusText.textContent=o.chooseBot),h&&e.choice&&(e.choice.textContent=h==="farm"?o.autoFarm:o.autoImage),Object.assign(n,o),i(`\u{1F30D} Textos del launcher actualizados al idioma: ${S()}`)}return i("\u2705 Launcher UI creado exitosamente"),{setUserInfo:G,setHealthInfo:K,cleanup:v,selectBot:x,updateTexts:$,getSelectedBot:()=>h}}async function F(){var a,t;i("\u{1F4E1} Obteniendo informaci\xF3n de sesi\xF3n...");try{let r=await fetch("https://backend.wplace.live/me",{credentials:"include"});if(!r.ok)throw new Error(`HTTP ${r.status}`);return u.me=await r.json(),i("\u2705 Informaci\xF3n de sesi\xF3n obtenida:",((a=u.me)==null?void 0:a.name)||((t=u.me)==null?void 0:t.username)||"Usuario"),u.me}catch(r){return i("\u274C Error obteniendo sesi\xF3n:",r.message),u.me=null,null}}async function z(){var a,t,r,p,c,l;i("\u{1F3E5} Verificando estado del backend...");try{let n=await fetch("https://backend.wplace.live/health",{method:"GET",credentials:"include"}),d=null;try{d=await n.json()}catch{d=null}n.ok&&d?(u.health={up:!!((a=d.up)==null||a),database:(p=(r=(t=d.database)==null?void 0:t.ok)!=null?r:d.database)!=null?p:void 0,uptime:(l=(c=d.uptime)!=null?c:d.uptimeHuman)!=null?l:typeof d.uptimeSeconds=="number"?`${d.uptimeSeconds}s`:void 0},i("\u2705 Estado del backend obtenido:",u.health)):(u.health={up:!1,database:!1,uptime:void 0},i("\u26A0\uFE0F Backend no responde correctamente"))}catch(n){i("\u274C Error verificando backend:",n.message),u.health={up:!1,database:!1,uptime:void 0}}return u.health}async function j(a,t){i(`\u{1F4E5} Descargando bot: ${a}`);try{let r=a==="farm"?`${t}/Auto-Farm.js`:`${t}/Auto-Image.js`;i(`\u{1F310} URL: ${r}`);let p=await fetch(r);if(!p.ok)throw new Error(`HTTP ${p.status}`);let c=await p.text();return i(`\u2705 Bot descargado (${c.length} chars), ejecutando...`),(0,eval)(c),i("\u{1F680} Bot ejecutado exitosamente"),!0}catch(r){throw i("\u274C Error descargando/ejecutando bot:",r.message),r}}function Y(a={}){let{onLanguageChange:t=null,position:r="top-right",showFlags:p=!0}=a,c=document.createElement("div");c.className="language-selector";let l=`
    .language-selector {
      position: fixed;
      ${X(r)}
      z-index: 999998;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
      user-select: none;
    }
    
    .language-selector-button {
      background: transparent;
      border: none;
      color: #eee;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s;
      width: 100%;
      text-align: left;
    }
    
    .language-selector-button:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .language-selector-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 6px;
      margin-top: 4px;
      display: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    
    .language-selector-dropdown.visible {
      display: block;
    }
    
    .language-option {
      background: transparent;
      border: none;
      color: #eee;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      text-align: left;
      transition: background 0.2s;
    }
    
    .language-option:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .language-option.active {
      background: rgba(119, 92, 227, 0.2);
      color: #775ce3;
    }
    
    .language-option:first-child {
      border-radius: 6px 6px 0 0;
    }
    
    .language-option:last-child {
      border-radius: 0 0 6px 6px;
    }
    
    .language-flag {
      font-size: 16px;
    }
    
    .language-name {
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .language-selector {
        position: fixed;
        top: 10px;
        right: 10px;
      }
    }
  `;if(!document.querySelector("#language-selector-styles")){let e=document.createElement("style");e.id="language-selector-styles",e.textContent=l,document.head.appendChild(e)}let n=!1,d=S();function f(){let e=A[d];c.innerHTML=`
      <button class="language-selector-button">
        ${p?`<span class="language-flag">${e.flag}</span>`:""}
        <span class="language-name">${e.name}</span>
        <span style="margin-left: auto; transform: ${n?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">\u25BC</span>
      </button>
      <div class="language-selector-dropdown ${n?"visible":""}">
        ${Object.entries(A).map(([h,x])=>`
          <button class="language-option ${h===d?"active":""}" data-lang="${h}">
            ${p?`<span class="language-flag">${x.flag}</span>`:""}
            <span class="language-name">${x.name}</span>
          </button>
        `).join("")}
      </div>
    `,m()}function m(){let e=c.querySelector(".language-selector-button"),h=c.querySelectorAll(".language-option");e.addEventListener("click",x=>{x.stopPropagation(),n=!n,f()}),h.forEach(x=>{x.addEventListener("click",v=>{v.stopPropagation();let C=x.dataset.lang;C!==d&&(d=C,I(C),t&&t(C)),n=!1,f()})}),document.addEventListener("click",()=>{n&&(n=!1,f())})}function s(e){e.detail.language!==d&&(d=e.detail.language,f())}return window.addEventListener("languageChanged",s),f(),{mount(e=document.body){e.appendChild(c)},unmount(){window.removeEventListener("languageChanged",s),c.parentNode&&c.parentNode.removeChild(c)},setPosition(e){c.style.cssText=X(e)},getElement(){return c},update(){d=S(),f()}}}function X(a){let t={"top-right":"top: 15px; right: 15px;","top-left":"top: 15px; left: 15px;","bottom-right":"bottom: 15px; right: 15px;","bottom-left":"bottom: 15px; left: 15px;","top-center":"top: 15px; left: 50%; transform: translateX(-50%);","bottom-center":"bottom: 15px; left: 50%; transform: translateX(-50%);"};return t[a]||t["top-right"]}async function V(){var a;if(i("\u{1F680} Iniciando WPlace Auto-Launcher (versi\xF3n modular)"),k(),(a=window.__wplaceBot)!=null&&a.launcherRunning){alert("Auto-Launcher ya est\xE1 ejecut\xE1ndose.");return}window.__wplaceBot={...window.__wplaceBot,launcherRunning:!0};try{let t=W({onSelectBot:l=>{i(`\u{1F3AF} Bot seleccionado: ${l}`)},onLaunch:async l=>{i(`\u{1F680} Lanzando bot: ${l}`),await j(l,g.RAW_BASE)},onClose:()=>{i("\u{1F44B} Cerrando launcher"),window.__wplaceBot.launcherRunning=!1}}),r=Y({position:"top-left",showFlags:!0,onLanguageChange:l=>{i(`\u{1F30D} Idioma cambiado a: ${l} desde el launcher`),t.updateTexts(),typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("launcherLanguageChanged",{detail:{language:l}}))}});r.mount(),i("\u{1F4CA} Cargando informaci\xF3n inicial...");let p=await z();t.setHealthInfo(p);let c=await F();t.setUserInfo(c),u.refreshTimer=window.setInterval(async()=>{i("\u{1F504} Actualizando informaci\xF3n...");try{let[l,n]=await Promise.all([z(),F()]);t.setHealthInfo(l),t.setUserInfo(n)}catch(l){i("\u274C Error en actualizaci\xF3n peri\xF3dica:",l)}},g.REFRESH_INTERVAL),window.addEventListener("beforeunload",()=>{t.cleanup(),r.unmount(),window.__wplaceBot.launcherRunning=!1}),i("\u2705 Auto-Launcher inicializado correctamente")}catch(t){throw i("\u274C Error inicializando Auto-Launcher:",t),window.__wplaceBot.launcherRunning=!1,t}}(()=>{"use strict";var a,t;if((a=window.__wplaceBot)!=null&&a.farmRunning||(t=window.__wplaceBot)!=null&&t.imageRunning){alert("Ya hay un bot ejecut\xE1ndose. Ci\xE9rralo antes de usar el launcher.");return}window.__wplaceBot||(window.__wplaceBot={}),V().catch(r=>{console.error("[BOT] Error en Auto-Launcher:",r),window.__wplaceBot&&(window.__wplaceBot.launcherRunning=!1),alert("Auto-Launcher: error inesperado. Revisa consola.")})})();})();
