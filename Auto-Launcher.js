/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T20:18:10.037Z */
(()=>{var i=(...n)=>console.log("[WPA-UI]",...n);function q(n=null){let t=document.createElement("div");n&&(t.id=n),t.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let r=t.attachShadow({mode:"open"});return document.body.appendChild(t),{host:t,root:r}}function U(n,t){let r=0,c=0,l=0,d=0;n.style.cursor="move",n.addEventListener("mousedown",o);function o(f){f.target.closest(".header-btn, .wplace-header-btn")||(f.preventDefault(),l=f.clientX,d=f.clientY,document.addEventListener("mouseup",x),document.addEventListener("mousemove",u))}function u(f){f.preventDefault(),r=l-f.clientX,c=d-f.clientY,l=f.clientX,d=f.clientY,t.style.top=t.offsetTop-c+"px",t.style.left=t.offsetLeft-r+"px"}function x(){document.removeEventListener("mouseup",x),document.removeEventListener("mousemove",u)}}var _={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",positionDetected:"\u{1F3AF} Posici\xF3n detectada, procesando...",positionError:"\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",batchSize:"Tama\xF1o del lote",nextBatchTime:"Siguiente lote en",useAllCharges:"Usar todas las cargas disponibles",maxCharges:"Cargas m\xE1ximas por lote",waitingForCharges:"\u23F3 Esperando cargas: {current}/{needed}",timeRemaining:"Tiempo restante",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar",passCompleted:"\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",waitingChargesCountdown:"\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}"},farm:{title:"WPlace Farm Bot",start:"Iniciar",stop:"Detener",stopped:"Bot detenido",calibrate:"Calibrar",paintOnce:"Una vez",checkingStatus:"Verificando estado...",configuration:"Configuraci\xF3n",delay:"Delay (ms)",pixelsPerBatch:"P\xEDxeles/lote",minCharges:"Cargas m\xEDn",colorMode:"Modo color",random:"Aleatorio",fixed:"Fijo",range:"Rango",fixedColor:"Color fijo",advanced:"Avanzado",tileX:"Tile X",tileY:"Tile Y",customPalette:"Paleta personalizada",paletteExample:"ej: #FF0000,#00FF00,#0000FF",capture:"Capturar",painted:"Pintados",charges:"Cargas",retries:"Fallos",tile:"Tile",configSaved:"Configuraci\xF3n guardada",configLoaded:"Configuraci\xF3n cargada",configReset:"Configuraci\xF3n reiniciada",captureInstructions:"Pinta un p\xEDxel manualmente para capturar coordenadas...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Iniciando bot...",stoppingBot:"Deteniendo bot...",calibrating:"Calibrando...",alreadyRunning:"Auto-Farm ya est\xE1 corriendo.",imageRunningWarning:"Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",selectPosition:"Seleccionar Zona",selectPositionAlert:"\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Zona establecida! Radio: 500px",positionTimeout:"\u274C Tiempo agotado para seleccionar zona",missingPosition:"\u274C Selecciona una zona primero usando 'Seleccionar Zona'",farmRadius:"Radio farm",positionInfo:"Zona actual",farmingInRadius:"\u{1F33E} Farming en radio {radius}px desde ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",noPosition:"Sin zona",currentZone:"Zona: ({x},{y})",autoSelectPosition:"\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"},common:{yes:"S\xED",no:"No",ok:"Aceptar",cancel:"Cancelar",close:"Cerrar",save:"Guardar",load:"Cargar",delete:"Eliminar",edit:"Editar",start:"Iniciar",stop:"Detener",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",settings:"Configuraci\xF3n",help:"Ayuda",about:"Acerca de",language:"Idioma",loading:"Cargando...",error:"Error",success:"\xC9xito",warning:"Advertencia",info:"Informaci\xF3n",languageChanged:"Idioma cambiado a {language}"}};var N={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selection",user:"User",charges:"Charges",backend:"Backend",database:"Database",uptime:"Uptime",close:"Close",launch:"Launch",loading:"Loading\u2026",executing:"Executing\u2026",downloading:"Downloading script\u2026",chooseBot:"Choose a bot and press Launch",readyToLaunch:"Ready to launch",loadError:"Load error",loadErrorMsg:"Could not load the selected bot. Check your connection or try again.",checking:"\u{1F504} Checking...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialize Auto-BOT",uploadImage:"Upload Image",resizeImage:"Resize Image",selectPosition:"Select Position",startPainting:"Start Painting",stopPainting:"Stop Painting",saveProgress:"Save Progress",loadProgress:"Load Progress",checkingColors:"\u{1F50D} Checking available colors...",noColorsFound:"\u274C Open the color palette on the site and try again!",colorsFound:"\u2705 Found {count} available colors",loadingImage:"\u{1F5BC}\uFE0F Loading image...",imageLoaded:"\u2705 Image loaded with {count} valid pixels",imageError:"\u274C Error loading image",selectPositionAlert:"Paint the first pixel at the location where you want the art to start!",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Position set successfully!",positionTimeout:"\u274C Timeout for position selection",positionDetected:"\u{1F3AF} Position detected, processing...",positionError:"\u274C Error detecting position, please try again",startPaintingMsg:"\u{1F3A8} Starting painting...",paintingProgress:"\u{1F9F1} Progress: {painted}/{total} pixels...",noCharges:"\u231B No charges. Waiting {time}...",paintingStopped:"\u23F9\uFE0F Painting stopped by user",paintingComplete:"\u2705 Painting completed! {count} pixels painted.",paintingError:"\u274C Error during painting",missingRequirements:"\u274C Load an image and select a position first",progress:"Progress",pixels:"Pixels",charges:"Charges",estimatedTime:"Estimated time",initMessage:"Click 'Initialize Auto-BOT' to begin",waitingInit:"Waiting for initialization...",resizeSuccess:"\u2705 Image resized to {width}x{height}",paintingPaused:"\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",pixelsPerBatch:"Pixels per batch",batchSize:"Batch size",nextBatchTime:"Next batch in",useAllCharges:"Use all available charges",maxCharges:"Max charges per batch",waitingForCharges:"\u23F3 Waiting for charges: {current}/{needed}",timeRemaining:"Time remaining",cooldownWaiting:"\u23F3 Waiting {time} to continue...",progressSaved:"\u2705 Progress saved as {filename}",progressLoaded:"\u2705 Progress loaded: {painted}/{total} pixels painted",progressLoadError:"\u274C Error loading progress: {error}",progressSaveError:"\u274C Error saving progress: {error}",confirmSaveProgress:"Do you want to save the current progress before stopping?",saveProgressTitle:"Save Progress",discardProgress:"Discard",cancel:"Cancel",minimize:"Minimize",width:"Width",height:"Height",keepAspect:"Keep aspect ratio",apply:"Apply",passCompleted:"\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",waitingChargesCountdown:"\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}"},farm:{title:"WPlace Farm Bot",start:"Start",stop:"Stop",stopped:"Bot stopped",calibrate:"Calibrate",paintOnce:"Once",checkingStatus:"Checking status...",configuration:"Configuration",delay:"Delay (ms)",pixelsPerBatch:"Pixels/batch",minCharges:"Min charges",colorMode:"Color mode",random:"Random",fixed:"Fixed",range:"Range",fixedColor:"Fixed color",advanced:"Advanced",tileX:"Tile X",tileY:"Tile Y",customPalette:"Custom palette",paletteExample:"e.g: #FF0000,#00FF00,#0000FF",capture:"Capture",painted:"Painted",charges:"Charges",retries:"Retries",tile:"Tile",configSaved:"Configuration saved",configLoaded:"Configuration loaded",configReset:"Configuration reset",captureInstructions:"Paint a pixel manually to capture coordinates...",backendOnline:"Backend Online",backendOffline:"Backend Offline",startingBot:"Starting bot...",stoppingBot:"Stopping bot...",calibrating:"Calibrating...",alreadyRunning:"Auto-Farm is already running.",imageRunningWarning:"Auto-Image is running. Close it before starting Auto-Farm.",selectPosition:"Select Area",selectPositionAlert:"\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",waitingPosition:"\u{1F446} Waiting for you to paint the reference pixel...",positionSet:"\u2705 Area set! Radius: 500px",positionTimeout:"\u274C Timeout for area selection",missingPosition:"\u274C Select an area first using 'Select Area'",farmRadius:"Farm radius",positionInfo:"Current area",farmingInRadius:"\u{1F33E} Farming in {radius}px radius from ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",noPosition:"No area",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"},common:{yes:"Yes",no:"No",ok:"OK",cancel:"Cancel",close:"Close",save:"Save",load:"Load",delete:"Delete",edit:"Edit",start:"Start",stop:"Stop",pause:"Pause",resume:"Resume",reset:"Reset",settings:"Settings",help:"Help",about:"About",language:"Language",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",languageChanged:"Language changed to {language}"}};var W={launcher:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"S\xE9lection",user:"Utilisateur",charges:"Charges",backend:"Backend",database:"Base de donn\xE9es",uptime:"Temps actif",close:"Fermer",launch:"Lancer",loading:"Chargement\u2026",executing:"Ex\xE9cution\u2026",downloading:"T\xE9l\xE9chargement du script\u2026",chooseBot:"Choisissez un bot et appuyez sur Lancer",readyToLaunch:"Pr\xEAt \xE0 lancer",loadError:"Erreur de chargement",loadErrorMsg:"Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",checking:"\u{1F504} V\xE9rification...",online:"\u{1F7E2} En ligne",offline:"\u{1F534} Hors ligne",ok:"\u{1F7E2} OK",error:"\u{1F534} Erreur",unknown:"-"},image:{title:"WPlace Auto-Image",initBot:"Initialiser Auto-BOT",uploadImage:"T\xE9l\xE9charger Image",resizeImage:"Redimensionner Image",selectPosition:"S\xE9lectionner Position",startPainting:"Commencer Peinture",stopPainting:"Arr\xEAter Peinture",saveProgress:"Sauvegarder Progr\xE8s",loadProgress:"Charger Progr\xE8s",checkingColors:"\u{1F50D} V\xE9rification des couleurs disponibles...",noColorsFound:"\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",colorsFound:"\u2705 {count} couleurs disponibles trouv\xE9es",loadingImage:"\u{1F5BC}\uFE0F Chargement de l'image...",imageLoaded:"\u2705 Image charg\xE9e avec {count} pixels valides",imageError:"\u274C Erreur lors du chargement de l'image",selectPositionAlert:"Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Position d\xE9finie avec succ\xE8s!",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",positionDetected:"\u{1F3AF} Position d\xE9tect\xE9e, traitement...",positionError:"\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",startPaintingMsg:"\u{1F3A8} D\xE9but de la peinture...",paintingProgress:"\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",noCharges:"\u231B Aucune charge. Attendre {time}...",paintingStopped:"\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",paintingComplete:"\u2705 Peinture termin\xE9e! {count} pixels peints.",paintingError:"\u274C Erreur pendant la peinture",missingRequirements:"\u274C Chargez une image et s\xE9lectionnez une position d'abord",progress:"Progr\xE8s",pixels:"Pixels",charges:"Charges",estimatedTime:"Temps estim\xE9",initMessage:"Cliquez sur 'Initialiser Auto-BOT' pour commencer",waitingInit:"En attente d'initialisation...",resizeSuccess:"\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",paintingPaused:"\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",pixelsPerBatch:"Pixels par lot",batchSize:"Taille du lot",nextBatchTime:"Prochain lot dans",useAllCharges:"Utiliser toutes les charges disponibles",maxCharges:"Charges max par lot",waitingForCharges:"\u23F3 En attente de charges: {current}/{needed}",timeRemaining:"Temps restant",cooldownWaiting:"\u23F3 Attendre {time} pour continuer...",progressSaved:"\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",progressLoaded:"\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",progressLoadError:"\u274C Erreur lors du chargement du progr\xE8s: {error}",progressSaveError:"\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",confirmSaveProgress:"Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",saveProgressTitle:"Sauvegarder Progr\xE8s",discardProgress:"Abandonner",cancel:"Annuler",minimize:"Minimiser",width:"Largeur",height:"Hauteur",keepAspect:"Garder les proportions",apply:"Appliquer",passCompleted:"\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",waitingChargesRegen:"\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",waitingChargesCountdown:"\u23F3 Attente des charges: {current}/{needed} - Restant: {time}"},farm:{title:"WPlace Farm Bot",start:"D\xE9marrer",stop:"Arr\xEAter",stopped:"Bot arr\xEAt\xE9",calibrate:"Calibrer",paintOnce:"Une fois",checkingStatus:"V\xE9rification du statut...",configuration:"Configuration",delay:"D\xE9lai (ms)",pixelsPerBatch:"Pixels/lot",minCharges:"Charges min",colorMode:"Mode couleur",random:"Al\xE9atoire",fixed:"Fixe",range:"Plage",fixedColor:"Couleur fixe",advanced:"Avanc\xE9",tileX:"Tuile X",tileY:"Tuile Y",customPalette:"Palette personnalis\xE9e",paletteExample:"ex: #FF0000,#00FF00,#0000FF",capture:"Capturer",painted:"Peints",charges:"Charges",retries:"\xC9checs",tile:"Tuile",configSaved:"Configuration sauvegard\xE9e",configLoaded:"Configuration charg\xE9e",configReset:"Configuration r\xE9initialis\xE9e",captureInstructions:"Peindre un pixel manuellement pour capturer les coordonn\xE9es...",backendOnline:"Backend En ligne",backendOffline:"Backend Hors ligne",startingBot:"D\xE9marrage du bot...",stoppingBot:"Arr\xEAt du bot...",calibrating:"Calibrage...",alreadyRunning:"Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",imageRunningWarning:"Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",selectPosition:"S\xE9lectionner Zone",selectPositionAlert:"\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",waitingPosition:"\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",positionSet:"\u2705 Zone d\xE9finie! Rayon: 500px",positionTimeout:"\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",missingPosition:"\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",farmRadius:"Rayon farm",positionInfo:"Zone actuelle",farmingInRadius:"\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",selectEmptyArea:"\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",noPosition:"Aucune zone",currentZone:"Zone: ({x},{y})",autoSelectPosition:"\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"},common:{yes:"Oui",no:"Non",ok:"OK",cancel:"Annuler",close:"Fermer",save:"Sauvegarder",load:"Charger",delete:"Supprimer",edit:"Modifier",start:"D\xE9marrer",stop:"Arr\xEAter",pause:"Pause",resume:"Reprendre",reset:"R\xE9initialiser",settings:"Param\xE8tres",help:"Aide",about:"\xC0 propos",language:"Langue",loading:"Chargement...",error:"Erreur",success:"Succ\xE8s",warning:"Avertissement",info:"Information",languageChanged:"Langue chang\xE9e en {language}"}};var k={es:{name:"Espa\xF1ol",flag:"\u{1F1EA}\u{1F1F8}",code:"es"},en:{name:"English",flag:"\u{1F1FA}\u{1F1F8}",code:"en"},fr:{name:"Fran\xE7ais",flag:"\u{1F1EB}\u{1F1F7}",code:"fr"}},y={es:_,en:N,fr:W},T="es",B=y[T];function J(){let t=(window.navigator.language||window.navigator.userLanguage||"es").split("-")[0].toLowerCase();return y[t]?t:"es"}function ee(){return null}function I(){let n=ee(),t=J(),r="es";return n&&y[n]?r=n:t&&y[t]&&(r=t),z(r),r}function z(n){if(!y[n]){console.warn(`Idioma '${n}' no disponible. Usando '${T}'`);return}T=n,B=y[n],typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("languageChanged",{detail:{language:n,translations:B}}))}function A(){return T}function h(n,t={}){let r=n.split("."),c=B;for(let l of r)if(c&&typeof c=="object"&&l in c)c=c[l];else return console.warn(`Clave de traducci\xF3n no encontrada: '${n}'`),n;return typeof c!="string"?(console.warn(`Clave de traducci\xF3n no es string: '${n}'`),n):te(c,t)}function te(n,t){return!t||Object.keys(t).length===0?n:n.replace(/\{(\w+)\}/g,(r,c)=>t[c]!==void 0?t[c]:r)}function j(n){return B[n]?B[n]:(console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${n}'`),{})}I();var m={RAW_BASE:"https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main",REFRESH_INTERVAL:6e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000"}};function R(){return j("launcher")}var p={me:null,health:null,refreshTimer:null,selectedBot:null};function Y({onSelectBot:n,onLaunch:t,onClose:r,updateUserInfo:c,updateHealthInfo:l}){i("\u{1F39B}\uFE0F Creando interfaz del Launcher");let d=document.getElementById("wpl-panel");d&&(d.remove(),i("\u{1F5D1}\uFE0F Panel existente removido"));let o=R(),{host:u,root:x}=q("wpl-panel"),f=document.createElement("style");f.textContent=`
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: ${m.THEME.primary};
      border: 1px solid ${m.THEME.accent};
      border-radius: 10px;
      color: ${m.THEME.text};
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
      background: ${m.THEME.secondary};
      padding: 10px 12px;
      color: ${m.THEME.highlight};
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
      background: ${m.THEME.accent};
      color: white;
    }
    
    .btn.primary:hover:not(:disabled) {
      background: ${m.THEME.highlight};
    }
    
    .btn.ghost {
      background: transparent;
      border: 1px solid ${m.THEME.accent};
      color: ${m.THEME.text};
    }
    
    .btn.ghost:hover:not(:disabled) {
      background: ${m.THEME.accent}22;
    }
    
    .btn.close {
      flex: 0 0 auto;
      padding: 6px 8px;
    }
    
    .card {
      background: ${m.THEME.secondary};
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
      outline: 2px solid ${m.THEME.highlight};
    }
  `,x.appendChild(f);let s=document.createElement("div");s.className="panel",s.innerHTML=`
    <div class="header">
      <div>${o.title}</div>
      <button class="btn ghost close close-btn">\u2715</button>
    </div>
    <div class="body">
      <div class="row">
        <button class="btn primary farm-btn">${o.autoFarm}</button>
        <button class="btn ghost image-btn">${o.autoImage}</button>
      </div>
      <div class="card">
        <div class="stat">
          <span>${o.selection}</span>
          <span class="choice">\u2014</span>
        </div>
      </div>
      <div class="card user-card">
        <div class="stat">
          <span>${o.user}</span>
          <span class="user-name">-</span>
        </div>
        <div class="stat">
          <span>${o.charges}</span>
          <span class="user-charges">-</span>
        </div>
      </div>
      <div class="card health-card">
        <div class="stat">
          <span>${o.backend}</span>
          <span class="backend-status">${o.checking}</span>
        </div>
        <div class="stat">
          <span>${o.database}</span>
          <span class="database-status">-</span>
        </div>
        <div class="stat">
          <span>${o.uptime}</span>
          <span class="uptime">-</span>
        </div>
      </div>
      <div class="status status-text">${o.chooseBot}</div>
      <div class="row" style="margin-top: 12px;">
        <button class="btn primary launch-btn" disabled>${o.launch}</button>
        <button class="btn ghost cancel-btn">${o.close}</button>
      </div>
    </div>
  `,x.appendChild(s);let e={header:s.querySelector(".header"),farmBtn:s.querySelector(".farm-btn"),imageBtn:s.querySelector(".image-btn"),launchBtn:s.querySelector(".launch-btn"),cancelBtn:s.querySelector(".cancel-btn"),closeBtn:s.querySelector(".close-btn"),statusText:s.querySelector(".status-text"),choice:s.querySelector(".choice"),userName:s.querySelector(".user-name"),userCharges:s.querySelector(".user-charges"),backendStatus:s.querySelector(".backend-status"),databaseStatus:s.querySelector(".database-status"),uptime:s.querySelector(".uptime")};U(e.header,s);let b=null;function C(a){b=a,p.selectedBot=a,e.choice.textContent=a==="farm"?h("launcher.autoFarm"):h("launcher.autoImage"),e.launchBtn.disabled=!1,a==="farm"?(e.farmBtn.classList.add("primary"),e.farmBtn.classList.remove("ghost"),e.imageBtn.classList.add("ghost"),e.imageBtn.classList.remove("primary")):(e.imageBtn.classList.add("primary"),e.imageBtn.classList.remove("ghost"),e.farmBtn.classList.add("ghost"),e.farmBtn.classList.remove("primary")),e.statusText.textContent=h("launcher.readyToLaunch"),n&&n(a)}e.farmBtn.addEventListener("click",()=>C("farm")),e.imageBtn.addEventListener("click",()=>C("image")),e.launchBtn.addEventListener("click",async()=>{if(b){e.launchBtn.disabled=!0,e.launchBtn.textContent=h("launcher.loading"),e.statusText.textContent=h("launcher.downloading");try{t&&(await t(b),P())}catch(a){i("\u274C Error en launch:",a),alert(h("launcher.loadErrorMsg")),e.launchBtn.disabled=!1,e.launchBtn.textContent=h("launcher.launch"),e.statusText.textContent=h("launcher.loadError")}}});function P(){window.removeEventListener("languageChanged",v),p.refreshTimer&&(window.clearInterval(p.refreshTimer),p.refreshTimer=null),u.remove(),i("\u{1F9F9} Launcher UI eliminado")}e.cancelBtn.addEventListener("click",P),e.closeBtn.addEventListener("click",P),document.addEventListener("keydown",a=>{a.key==="Escape"&&P()},{once:!0});let v=()=>{$()};window.addEventListener("languageChanged",v);function K(a){var E,L;if(!a){e.userName.textContent="-",e.userCharges.textContent="-";return}let S=a.name||a.username||"-",w=Math.floor(Number((L=(E=a.charges)==null?void 0:E.count)!=null?L:NaN));e.userName.textContent=S,e.userCharges.textContent=Number.isFinite(w)?String(w):"-"}function Q(a){if(!a){e.backendStatus.textContent=h("launcher.offline"),e.databaseStatus.textContent="-",e.uptime.textContent="-";return}let S=!!a.up,w=a.database,E=a.uptime||"-";e.backendStatus.textContent=S?h("launcher.online"):h("launcher.offline"),w==null?e.databaseStatus.textContent="-":e.databaseStatus.textContent=w?h("launcher.ok"):h("launcher.error"),e.uptime.textContent=typeof E=="number"?`${E}s`:E||"-"}function $(){let a=R(),S=s.querySelector(".header div:first-child");S&&(S.textContent=a.title),e.farmBtn&&(e.farmBtn.textContent=a.autoFarm),e.imageBtn&&(e.imageBtn.textContent=a.autoImage),e.launchBtn&&(e.launchBtn.textContent=a.launch),e.closeBtn&&(e.closeBtn.textContent=a.close);let w=s.querySelector(".card:first-of-type .stat span:first-child");w&&(w.textContent=a.selection);let E=s.querySelector(".user-card .stat:first-child span:first-child");E&&(E.textContent=a.user);let L=s.querySelector(".user-card .stat:last-child span:first-child");L&&(L.textContent=a.charges);let M=s.querySelector(".health-card .stat:first-child span:first-child");M&&(M.textContent=a.backend);let D=s.querySelector(".health-card .stat:nth-child(2) span:first-child");D&&(D.textContent=a.database);let H=s.querySelector(".health-card .stat:last-child span:first-child");if(H&&(H.textContent=a.uptime),e.statusText){let g=e.statusText.textContent;g===o.chooseBot||g===a.chooseBot?e.statusText.textContent=a.chooseBot:g===o.loading||g===a.loading?e.statusText.textContent=a.loading:g===o.downloading||g===a.downloading?e.statusText.textContent=a.downloading:g===o.readyToLaunch||g===a.readyToLaunch?e.statusText.textContent=a.readyToLaunch:(g===o.loadError||g===a.loadError)&&(e.statusText.textContent=a.loadError)}if(e.backendStatus){let g=e.backendStatus.textContent;g===o.online||g===a.online?e.backendStatus.textContent=a.online:g===o.offline||g===a.offline?e.backendStatus.textContent=a.offline:(g===o.checking||g===a.checking)&&(e.backendStatus.textContent=a.checking)}if(e.databaseStatus){let g=e.databaseStatus.textContent;g===o.ok||g===a.ok?e.databaseStatus.textContent=a.ok:(g===o.error||g===a.error)&&(e.databaseStatus.textContent=a.error)}b&&e.choice&&(e.choice.textContent=b==="farm"?a.autoFarm:a.autoImage),Object.assign(o,a),i(`\u{1F30D} Textos del launcher actualizados al idioma: ${A()}`)}return i("\u2705 Launcher UI creado exitosamente"),{setUserInfo:K,setHealthInfo:Q,cleanup:P,selectBot:C,updateTexts:$,getSelectedBot:()=>b}}async function F(){var n,t;i("\u{1F4E1} Obteniendo informaci\xF3n de sesi\xF3n...");try{let r=await fetch("https://backend.wplace.live/me",{credentials:"include"});if(!r.ok)throw new Error(`HTTP ${r.status}`);return p.me=await r.json(),i("\u2705 Informaci\xF3n de sesi\xF3n obtenida:",((n=p.me)==null?void 0:n.name)||((t=p.me)==null?void 0:t.username)||"Usuario"),p.me}catch(r){return i("\u274C Error obteniendo sesi\xF3n:",r.message),p.me=null,null}}async function O(){var n,t,r,c,l,d;i("\u{1F3E5} Verificando estado del backend...");try{let o=await fetch("https://backend.wplace.live/health",{method:"GET",credentials:"include"}),u=null;try{u=await o.json()}catch{u=null}o.ok&&u?(p.health={up:!!((n=u.up)==null||n),database:(c=(r=(t=u.database)==null?void 0:t.ok)!=null?r:u.database)!=null?c:void 0,uptime:(d=(l=u.uptime)!=null?l:u.uptimeHuman)!=null?d:typeof u.uptimeSeconds=="number"?`${u.uptimeSeconds}s`:void 0},i("\u2705 Estado del backend obtenido:",p.health)):(p.health={up:!1,database:!1,uptime:void 0},i("\u26A0\uFE0F Backend no responde correctamente"))}catch(o){i("\u274C Error verificando backend:",o.message),p.health={up:!1,database:!1,uptime:void 0}}return p.health}async function X(n,t){i(`\u{1F4E5} Descargando bot: ${n}`);try{let r=n==="farm"?`${t}/Auto-Farm.js`:`${t}/Auto-Image.js`;i(`\u{1F310} URL: ${r}`);let c=await fetch(r);if(!c.ok)throw new Error(`HTTP ${c.status}`);let l=await c.text();return i(`\u2705 Bot descargado (${l.length} chars), ejecutando...`),(0,eval)(l),i("\u{1F680} Bot ejecutado exitosamente"),!0}catch(r){throw i("\u274C Error descargando/ejecutando bot:",r.message),r}}function Z(n={}){let{onLanguageChange:t=null,position:r="top-right",showFlags:c=!0}=n,l=document.createElement("div");l.className="language-selector";let d=`
    .language-selector {
      position: fixed;
      ${V(r)}
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
  `;if(!document.querySelector("#language-selector-styles")){let e=document.createElement("style");e.id="language-selector-styles",e.textContent=d,document.head.appendChild(e)}let o=!1,u=A();function x(){let e=k[u];l.innerHTML=`
      <button class="language-selector-button">
        ${c?`<span class="language-flag">${e.flag}</span>`:""}
        <span class="language-name">${e.name}</span>
        <span style="margin-left: auto; transform: ${o?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">\u25BC</span>
      </button>
      <div class="language-selector-dropdown ${o?"visible":""}">
        ${Object.entries(k).map(([b,C])=>`
          <button class="language-option ${b===u?"active":""}" data-lang="${b}">
            ${c?`<span class="language-flag">${C.flag}</span>`:""}
            <span class="language-name">${C.name}</span>
          </button>
        `).join("")}
      </div>
    `,f()}function f(){let e=l.querySelector(".language-selector-button"),b=l.querySelectorAll(".language-option");e.addEventListener("click",C=>{C.stopPropagation(),o=!o,x()}),b.forEach(C=>{C.addEventListener("click",P=>{P.stopPropagation();let v=C.dataset.lang;v!==u&&(u=v,z(v),t&&t(v)),o=!1,x()})}),document.addEventListener("click",()=>{o&&(o=!1,x())})}function s(e){e.detail.language!==u&&(u=e.detail.language,x())}return window.addEventListener("languageChanged",s),x(),{mount(e=document.body){e.appendChild(l)},unmount(){window.removeEventListener("languageChanged",s),l.parentNode&&l.parentNode.removeChild(l)},setPosition(e){l.style.cssText=V(e)},getElement(){return l},update(){u=A(),x()}}}function V(n){let t={"top-right":"top: 15px; right: 15px;","top-left":"top: 15px; left: 15px;","bottom-right":"bottom: 15px; right: 15px;","bottom-left":"bottom: 15px; left: 15px;","top-center":"top: 15px; left: 50%; transform: translateX(-50%);","bottom-center":"bottom: 15px; left: 50%; transform: translateX(-50%);"};return t[n]||t["top-right"]}async function G(){var n;if(i("\u{1F680} Iniciando WPlace Auto-Launcher (versi\xF3n modular)"),I(),(n=window.__wplaceBot)!=null&&n.launcherRunning){alert("Auto-Launcher ya est\xE1 ejecut\xE1ndose.");return}window.__wplaceBot={...window.__wplaceBot,launcherRunning:!0};try{let t=null,r=Y({onSelectBot:d=>{i(`\u{1F3AF} Bot seleccionado: ${d}`),t&&(t.unmount(),t=null)},onLaunch:async d=>{i(`\u{1F680} Lanzando bot: ${d}`),await X(d,m.RAW_BASE)},onClose:()=>{i("\u{1F44B} Cerrando launcher"),t&&(t.unmount(),t=null),window.__wplaceBot.launcherRunning=!1}});t=Z({position:"top-left",showFlags:!0,onLanguageChange:d=>{i(`\u{1F30D} Idioma cambiado a: ${d} desde el launcher`),r.updateTexts(),typeof window!="undefined"&&window.CustomEvent&&window.dispatchEvent(new window.CustomEvent("launcherLanguageChanged",{detail:{language:d}}))}}),t.mount(),i("\u{1F4CA} Cargando informaci\xF3n inicial...");let c=await O();r.setHealthInfo(c);let l=await F();r.setUserInfo(l),p.refreshTimer=window.setInterval(async()=>{i("\u{1F504} Actualizando informaci\xF3n...");try{let[d,o]=await Promise.all([O(),F()]);r.setHealthInfo(d),r.setUserInfo(o)}catch(d){i("\u274C Error en actualizaci\xF3n peri\xF3dica:",d)}},m.REFRESH_INTERVAL),window.addEventListener("beforeunload",()=>{r.cleanup(),t&&t.unmount(),window.__wplaceBot.launcherRunning=!1}),i("\u2705 Auto-Launcher inicializado correctamente")}catch(t){throw i("\u274C Error inicializando Auto-Launcher:",t),window.__wplaceBot.launcherRunning=!1,t}}(()=>{"use strict";var n,t;if((n=window.__wplaceBot)!=null&&n.farmRunning||(t=window.__wplaceBot)!=null&&t.imageRunning){alert("Ya hay un bot ejecut\xE1ndose. Ci\xE9rralo antes de usar el launcher.");return}window.__wplaceBot||(window.__wplaceBot={}),G().catch(r=>{console.error("[BOT] Error en Auto-Launcher:",r),window.__wplaceBot&&(window.__wplaceBot.launcherRunning=!1),alert("Auto-Launcher: error inesperado. Revisa consola.")})})();})();
