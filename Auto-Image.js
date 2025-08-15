/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T10:32:02.801Z */
(()=>{var d=(...c)=>console.log("[WPA-UI]",...c);var P={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}},g={es:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar"}},e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:P.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:P.PIXELS_PER_BATCH,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null};var v=class{constructor(o){this.imageSrc=o,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((o,n)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),o()},this.img.onerror=n,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(o,n){let s=document.createElement("canvas");return s.width=o,s.height=n,s.getContext("2d").drawImage(this.img,0,0,o,n),this.canvas.width=o,this.canvas.height=n,this.ctx.drawImage(s,0,0),this.getPixelData()}generatePreview(o,n){return this.previewCanvas.width=o,this.previewCanvas.height=n,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,o,n),this.previewCanvas.toDataURL()}getImageData(){let{width:o,height:n}=this.getDimensions(),s=this.getPixelData();return{width:o,height:n,pixels:s,originalName:this.originalName||"image.png"}}processImage(o,n){let{width:s,height:t}=this.getDimensions(),a=this.getPixelData(),i=[],l=0;for(let r=0;r<t;r++)for(let p=0;p<s;p++){let u=(r*s+p)*4,f=a[u],h=a[u+1],m=a[u+2],x=a[u+3];if(x<n.TRANSPARENCY_THRESHOLD||f>n.WHITE_THRESHOLD&&h>n.WHITE_THRESHOLD&&m>n.WHITE_THRESHOLD)continue;let w=this.findClosestColor({r:f,g:h,b:m},o);w&&(i.push({x:p,y:r,originalColor:{r:f,g:h,b:m,alpha:x},targetColor:w}),l++)}return{width:s,height:t,pixels:i,validPixelCount:l,originalName:this.originalName||"image.png"}}findClosestColor(o,n){if(!n||n.length===0)return null;let s=null,t=1/0;for(let a of n){let i=Math.sqrt(Math.pow(o.r-a.r,2)+Math.pow(o.g-a.g,2)+Math.pow(o.b-a.b,2));i<t&&(t=i,s=a)}return s}};function I(){d("\u{1F3A8} Detectando colores disponibles...");let c=document.querySelectorAll('[id^="color-"]'),o=[];for(let n of c){if(n.querySelector("svg"))continue;let s=n.id.replace("color-",""),t=parseInt(s);if(t===0||t===5)continue;let a=n.style.backgroundColor;if(a){let i=a.match(/\d+/g);if(i&&i.length>=3){let l={r:parseInt(i[0]),g:parseInt(i[1]),b:parseInt(i[2])};o.push({id:t,element:n,...l}),d(`Color detectado: id=${t}, rgb(${l.r},${l.g},${l.b})`)}}}return d(`\u2705 ${o.length} colores disponibles detectados`),o}var S=c=>new Promise(o=>setTimeout(o,c));var T="https://backend.wplace.live";async function $(){var c,o,n;try{let s=await fetch(`${T}/me`,{credentials:"include"}).then(l=>l.json()),t=s||null,a=(s==null?void 0:s.charges)||{},i={count:(c=a.count)!=null?c:0,max:(o=a.max)!=null?o:0,cooldownMs:(n=a.cooldownMs)!=null?n:3e4};return{success:!0,data:{user:t,charges:i.count,maxCharges:i.max,chargeRegen:i.cooldownMs}}}catch(s){return{success:!1,error:s.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function L(c,o,n,s,t){try{let a=JSON.stringify({colors:s,coords:n,t}),i=await fetch(`${T}/s0/pixel/${c}/${o}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:a}),l=null;try{l=await i.json()}catch{l={}}return{status:i.status,json:l,success:i.ok,painted:(l==null?void 0:l.painted)||0}}catch(a){return{status:0,json:{error:a.message},success:!1,painted:0}}}var k=!1;async function O(){if(!(k||window.turnstile))return new Promise((c,o)=>{let n=document.createElement("script");n.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",n.async=!0,n.defer=!0,n.onload=()=>{k=!0,c()},n.onerror=()=>o(new Error("No se pudo cargar Turnstile")),document.head.appendChild(n)})}async function j(c,o="paint"){var n;if(await O(),typeof((n=window.turnstile)==null?void 0:n.execute)=="function")try{let s=await window.turnstile.execute(c,{action:o});if(s&&s.length>20)return s}catch{}return await new Promise(s=>{let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),window.turnstile.render(t,{sitekey:c,callback:a=>{document.body.removeChild(t),s(a)}})})}async function B(c){return j(c,"paint")}async function D(c,o,n,s,t){let{width:a,height:i}=c,{x:l,y:r}=o;d(`Iniciando pintado: imagen(${a}x${i}) inicio LOCAL(${l},${r}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(d("Generando cola de p\xEDxeles..."),e.remainingPixels=U(c,o,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(p=>{let u=p.imageY*a+p.imageX,f=e.lastPosition.y*a+e.lastPosition.x;return u>=f})),d(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let p=Math.floor(e.currentCharges),u=Math.min(e.pixelsPerBatch,e.remainingPixels.length);if(p<u){d(`Cargas insuficientes: ${p}/${u} necesarias`),await H(u-p,n);continue}let f=e.remainingPixels.splice(0,u);d(`Pintando lote de ${f.length} p\xEDxeles...`);let h=await F(f);if(h.success&&h.painted>0){if(e.paintedPixels+=h.painted,f.length>0){let m=f[f.length-1];e.lastPosition={x:m.imageX,y:m.imageY}}d(`Lote exitoso: ${h.painted}/${f.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`),n&&n(e.paintedPixels,e.totalPixels)}else e.remainingPixels.unshift(...f),d("Lote fall\xF3: reintentando en 5 segundos..."),await S(5e3);await S(500)}e.stopFlag?(d(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),s&&s(!1,e.paintedPixels)):(d(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],s&&s(!0,e.paintedPixels))}catch(p){d("Error en proceso de pintado:",p),t&&t(p)}}async function F(c){var o;try{if(!c||c.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let n=[],s=[],t=null,a=null;for(let r of c)n.push(r.localX,r.localY),s.push(r.color.id||r.color.value||1),t===null&&(t=r.tileX,a=r.tileY);let i=await B(P.SITEKEY),l=await L(t,a,n,s,i);return l.status===200?{success:!0,painted:l.painted,response:l.json}:{success:!1,painted:0,error:((o=l.json)==null?void 0:o.message)||`HTTP ${l.status}`,status:l.status}}catch(n){return d("Error en paintPixelBatch:",n),{success:!1,painted:0,error:n.message}}}async function H(c,o){let n=P.CHARGE_REGEN_MS*c,s=Math.min(n,6e4);d(`Esperando ${Math.round(s/1e3)}s para obtener ${c} cargas`),o&&o(e.paintedPixels,e.totalPixels,`Esperando cargas (${Math.round(s/1e3)}s)`),await S(s),e.currentCharges=Math.min(50,e.currentCharges+s/P.CHARGE_REGEN_MS)}function U(c,o,n,s){let{pixels:t}=c,{x:a,y:i}=o,l=[];for(let r of t){let p=a+r.x,u=i+r.y;l.push({imageX:r.x,imageY:r.y,localX:p,localY:u,tileX:n,tileY:s,color:r.targetColor,originalColor:r.originalColor})}return d(`Cola de p\xEDxeles generada: ${l.length} p\xEDxeles para pintar`),l}function E(){e.stopFlag=!0,e.running=!1,d("\u{1F6D1} Deteniendo proceso de pintado...")}function C(c=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let o={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch},colors:e.availableColors.map(l=>({id:l.id,r:l.r,g:l.g,b:l.b})),remainingPixels:e.remainingPixels||[]},n=JSON.stringify(o,null,2),s=new window.Blob([n],{type:"application/json"}),t=c||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,a=window.URL.createObjectURL(s),i=document.createElement("a");return i.href=a,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(a),d(`\u2705 Progreso guardado: ${t}`),{success:!0,filename:t}}catch(o){return d("\u274C Error guardando progreso:",o),{success:!1,error:o.message}}}async function M(c){return new Promise(o=>{try{let n=new window.FileReader;n.onload=s=>{try{let t=JSON.parse(s.target.result),i=["imageData","progress","position","colors"].filter(l=>!(l in t));if(i.length>0)throw new Error(`Campos requeridos faltantes: ${i.join(", ")}`);if(e.availableColors.length>0){let l=t.colors.map(u=>u.id),r=e.availableColors.map(u=>u.id);l.filter(u=>r.includes(u)).length<l.length*.8&&d("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...t.imageData,pixels:[]},e.paintedPixels=t.progress.paintedPixels,e.totalPixels=t.progress.totalPixels,t.progress.lastPosition?e.lastPosition=t.progress.lastPosition:t.position.lastX!==void 0&&t.position.lastY!==void 0&&(e.lastPosition={x:t.position.lastX,y:t.position.lastY}),t.position.startPosition?e.startPosition=t.position.startPosition:t.position.startX!==void 0&&t.position.startY!==void 0&&(e.startPosition={x:t.position.startX,y:t.position.startY}),e.tileX=t.position.tileX,e.tileY=t.position.tileY,e.originalImageName=t.imageData.originalName,e.remainingPixels=t.remainingPixels||t.progress.remainingPixels||[],t.config&&(e.pixelsPerBatch=t.config.pixelsPerBatch||e.pixelsPerBatch),e.imageLoaded=!0,e.colorsChecked=!0,d(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),o({success:!0,data:t,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(t){d("\u274C Error parseando archivo de progreso:",t),o({success:!1,error:t.message})}},n.onerror=()=>{let s="Error leyendo archivo";d("\u274C",s),o({success:!1,error:s})},n.readAsText(c)}catch(n){d("\u274C Error cargando progreso:",n),o({success:!1,error:n.message})}})}function R(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,d("\u{1F9F9} Progreso limpiado")}function A(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function Y(){return{hasProgress:A(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:A()}}function z(c=null){let o=document.createElement("div");c&&(o.id=c),o.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let n=o.attachShadow({mode:"open"});return document.body.appendChild(o),{host:o,root:n}}function _(c,o){let n=0,s=0,t=0,a=0;c.style.cursor="move",c.addEventListener("mousedown",i);function i(p){p.target.closest(".header-btn, .wplace-header-btn")||(p.preventDefault(),t=p.clientX,a=p.clientY,document.addEventListener("mouseup",r),document.addEventListener("mousemove",l))}function l(p){p.preventDefault(),n=t-p.clientX,s=a-p.clientY,t=p.clientX,a=p.clientY,o.style.top=o.offsetTop-s+"px",o.style.left=o.offsetLeft-n+"px"}function r(){document.removeEventListener("mouseup",r),document.removeEventListener("mousemove",l)}}async function X({texts:c,...o}){if(d("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let m=document.createElement("link");m.rel="stylesheet",m.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(m),d("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:n,root:s}=z(),t=document.createElement("style");t.textContent=`
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
  `,s.appendChild(t);let a=document.createElement("div");a.className="container",a.innerHTML=`
    <div class="header">
      <div class="header-title">
        <i class="fas fa-image"></i>
        <span>${c.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          <i class="fas fa-cog"></i>
        </button>
        <button class="header-btn minimize-btn" title="${c.minimize}">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${c.pixelsPerBatch}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="10">
        </div>
      </div>
      
      <div class="controls">
        <button class="btn btn-primary init-btn">
          <i class="fas fa-robot"></i>
          <span>${c.initBot}</span>
        </button>
        <button class="btn btn-upload upload-btn" disabled>
          <i class="fas fa-upload"></i>
          <span>${c.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          <i class="fas fa-file-import"></i>
          <span>${c.loadProgress}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          <i class="fas fa-crosshairs"></i>
          <span>${c.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          <i class="fas fa-play"></i>
          <span>${c.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          <i class="fas fa-stop"></i>
          <span>${c.stopPainting}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-info-circle"></i> ${c.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${c.waitingInit}
      </div>
    </div>
  `,s.appendChild(a);let i=document.createElement("input");i.type="file",i.accept="image/png,image/jpeg",i.style.display="none",s.appendChild(i);let l=document.createElement("input");l.type="file",l.accept=".json",l.style.display="none",s.appendChild(l);let r={header:a.querySelector(".header"),configBtn:a.querySelector(".config-btn"),minimizeBtn:a.querySelector(".minimize-btn"),configPanel:a.querySelector(".config-panel"),pixelsPerBatch:a.querySelector(".pixels-per-batch"),initBtn:a.querySelector(".init-btn"),uploadBtn:a.querySelector(".upload-btn"),loadProgressBtn:a.querySelector(".load-progress-btn"),selectPosBtn:a.querySelector(".select-pos-btn"),startBtn:a.querySelector(".start-btn"),stopBtn:a.querySelector(".stop-btn"),progressBar:a.querySelector(".progress-bar"),statsArea:a.querySelector(".stats-area"),status:a.querySelector(".status"),content:a.querySelector(".content")},p={minimized:!1,configVisible:!1};_(r.header,a),r.minimizeBtn.addEventListener("click",()=>{p.minimized=!p.minimized,p.minimized?(a.classList.add("minimized"),r.minimizeBtn.innerHTML='<i class="fas fa-expand"></i>'):(a.classList.remove("minimized"),r.minimizeBtn.innerHTML='<i class="fas fa-minus"></i>')}),r.configBtn.addEventListener("click",()=>{p.configVisible=!p.configVisible,p.configVisible?(r.configPanel.classList.add("visible"),r.configBtn.innerHTML='<i class="fas fa-times"></i>'):(r.configPanel.classList.remove("visible"),r.configBtn.innerHTML='<i class="fas fa-cog"></i>')}),r.initBtn.addEventListener("click",async()=>{r.initBtn.disabled=!0,o.onInitBot&&await o.onInitBot()&&(r.uploadBtn.disabled=!1,r.loadProgressBtn.disabled=!1),r.initBtn.disabled=!1}),r.uploadBtn.addEventListener("click",()=>{i.click()}),i.addEventListener("change",async()=>{i.files.length>0&&o.onUploadImage&&await o.onUploadImage(i.files[0])&&(r.selectPosBtn.disabled=!1)}),r.loadProgressBtn.addEventListener("click",()=>{l.click()}),l.addEventListener("change",async()=>{l.files.length>0&&o.onLoadProgress&&await o.onLoadProgress(l.files[0])&&(r.selectPosBtn.disabled=!1,r.startBtn.disabled=!1)}),r.selectPosBtn.addEventListener("click",async()=>{o.onSelectPosition&&(r.selectPosBtn.disabled=!0,await o.onSelectPosition()&&(r.startBtn.disabled=!1),r.selectPosBtn.disabled=!1)}),r.startBtn.addEventListener("click",async()=>{o.onStartPainting&&(r.startBtn.disabled=!0,r.stopBtn.disabled=!1,await o.onStartPainting()||(r.startBtn.disabled=!1,r.stopBtn.disabled=!0))}),r.stopBtn.addEventListener("click",async()=>{o.onStopPainting&&await o.onStopPainting()&&(r.startBtn.disabled=!1,r.stopBtn.disabled=!0)});function u(m,x="default"){r.status.textContent=m,r.status.className=`status status-${x}`,r.status.style.animation="none",r.status.offsetWidth,r.status.style.animation="slideIn 0.3s ease-out"}function f(m,x,b=null){let w=x>0?m/x*100:0;r.progressBar.style.width=`${w}%`;let y=`
      <div class="stat-item">
        <div class="stat-label"><i class="fas fa-palette"></i> ${c.progress}</div>
        <div>${m}/${x} (${w.toFixed(1)}%)</div>
      </div>
    `;b&&(b.username&&(y+=`
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-user"></i> Usuario</div>
            <div>${b.username}</div>
          </div>
        `),b.charges!==void 0&&(y+=`
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-bolt"></i> ${c.charges}</div>
            <div>${Math.floor(b.charges)}</div>
          </div>
        `),b.pixels!==void 0&&(y+=`
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-cube"></i> ${c.pixels}</div>
            <div>${b.pixels.toLocaleString()}</div>
          </div>
        `)),r.statsArea.innerHTML=y}function h(){n.remove()}return d("\u2705 Interfaz de Auto-Image creada"),{setStatus:u,updateProgress:f,destroy:h}}function N(c,o,n={}){return new Promise(s=>{let t=document.createElement("div");t.className="modal-overlay",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.background="rgba(0,0,0,0.7)",t.style.zIndex="10001",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center";let a=document.createElement("div");a.style.background="#1a1a1a",a.style.border="2px solid #333",a.style.borderRadius="15px",a.style.padding="25px",a.style.color="#eee",a.style.minWidth="350px",a.style.maxWidth="400px",a.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",a.style.fontFamily="'Segoe UI', Roboto, sans-serif",a.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${o}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${c}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${n.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${n.save}</button>`:""}
        ${n.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${n.discard}</button>`:""}
        ${n.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${n.cancel}</button>`:""}
      </div>
    `,t.appendChild(a),document.body.appendChild(t);let i=a.querySelector(".save-btn"),l=a.querySelector(".discard-btn"),r=a.querySelector(".cancel-btn"),p=()=>{document.body.removeChild(t)};i&&i.addEventListener("click",()=>{p(),s("save")}),l&&l.addEventListener("click",()=>{p(),s("discard")}),r&&r.addEventListener("click",()=>{p(),s("cancel")}),t.addEventListener("click",u=>{u.target===t&&(p(),s("cancel"))})})}async function q(){var o;if(d("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),(o=window.__wplaceBot)!=null&&o.imageRunning){alert("Auto-Image ya est\xE1 ejecut\xE1ndose.");return}window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let c=null;try{let n={...P},s=W();if(e.language=s,!n.SITEKEY){let a=document.querySelector("*[data-sitekey]");a?(n.SITEKEY=a.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${n.SITEKEY.substring(0,20)}...`)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}let t=await X({texts:g[s],onInitBot:async()=>{d("\u{1F916} Inicializando Auto-Image..."),t.setStatus(g[s].checkingColors,"info");let a=I();if(a.length===0)return t.setStatus(g[s].noColorsFound,"error"),!1;let i=await $(),l=null;return i.success&&i.data.user?(l={username:i.data.user.name||"An\xF3nimo",charges:i.data.charges,maxCharges:i.data.maxCharges,pixels:i.data.user.pixelsPainted||0},c=l,e.currentCharges=i.data.charges,d(`\u{1F464} Usuario conectado: ${i.data.user.name||"An\xF3nimo"} - Cargas: ${l.charges}/${l.maxCharges} - P\xEDxeles: ${l.pixels}`)):d("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=a,e.colorsChecked=!0,t.setStatus(g[s].colorsFound.replace("{count}",a.length),"success"),t.updateProgress(0,0,l),d(`\u2705 ${a.length} colores disponibles detectados`),!0},onUploadImage:async a=>{try{t.setStatus(g[s].loadingImage,"info");let i=window.URL.createObjectURL(a),l=new v(i);l.originalName=a.name,await l.load();let r=l.processImage(e.availableColors,n);return e.imageData=r,e.totalPixels=r.validPixelCount,e.paintedPixels=0,e.originalImageName=a.name,e.imageLoaded=!0,t.setStatus(g[s].imageLoaded.replace("{count}",r.validPixelCount),"success"),t.updateProgress(0,r.validPixelCount,c),d(`\u2705 Imagen cargada: ${r.width}x${r.height}, ${r.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(i),!0}catch(i){return t.setStatus(g[s].imageError,"error"),d("\u274C Error cargando imagen:",i),!1}},onSelectPosition:async()=>new Promise(a=>{t.setStatus(g[s].selectPositionAlert,"info"),t.setStatus(g[s].waitingPosition,"info"),e.selectingPosition=!0;let i=window.fetch;window.fetch=async(l,r)=>{if(e.selectingPosition&&l.includes("/s0/paint"))try{let p=await i(l,r);if(p.ok&&r.body){let u=JSON.parse(r.body);if(u.coords&&u.coords.length>=2){let f=u.coords[0],h=u.coords[1],m=l.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);m&&(e.tileX=parseInt(m[1]),e.tileY=parseInt(m[2])),e.startPosition={x:f,y:h},e.selectingPosition=!1,window.fetch=i,t.setStatus(g[s].positionSet,"success"),d(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${f},${h})`),a(!0)}}return p}catch(p){return d("Error interceptando pixel:",p),i(l,r)}return i(l,r)},setTimeout(()=>{e.selectingPosition&&(window.fetch=i,e.selectingPosition=!1,t.setStatus(g[s].positionTimeout,"error"),a(!1))},12e4)}),onStartPainting:async()=>{var a;if(d("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((a=e.remainingPixels)==null?void 0:a.length)||0}),!e.imageLoaded||!e.startPosition)return t.setStatus(g[s].missingRequirements,"error"),d(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,t.setStatus(g[s].startPaintingMsg,"success");try{return await D(e.imageData,e.startPosition,(i,l,r)=>{c&&(c.charges=Math.floor(e.currentCharges)),t.updateProgress(i,l,c),r?t.setStatus(r,"info"):t.setStatus(g[s].paintingProgress.replace("{painted}",i).replace("{total}",l),"info")},(i,l)=>{i?(t.setStatus(g[s].paintingComplete.replace("{count}",l),"success"),R()):t.setStatus(g[s].paintingStopped,"warning"),e.running=!1},i=>{t.setStatus(g[s].paintingError,"error"),d("\u274C Error en proceso de pintado:",i),e.running=!1}),!0}catch(i){return t.setStatus(g[s].paintingError,"error"),d("\u274C Error iniciando pintado:",i),e.running=!1,!1}},onStopPainting:async()=>{if(Y().hasProgress){let i=await N(g[s].confirmSaveProgress,g[s].saveProgressTitle,{save:g[s].saveProgress,discard:g[s].discardProgress,cancel:g[s].cancel});if(i==="save"){let l=C();l.success?t.setStatus(g[s].progressSaved.replace("{filename}",l.filename),"success"):t.setStatus(g[s].progressSaveError.replace("{error}",l.error),"error")}else if(i==="cancel")return!1}return E(),t.setStatus(g[s].paintingStopped,"warning"),!0},onSaveProgress:async()=>{let a=C();return a.success?t.setStatus(g[s].progressSaved.replace("{filename}",a.filename),"success"):t.setStatus(g[s].progressSaveError.replace("{error}",a.error),"error"),a.success},onLoadProgress:async a=>{try{let i=await M(a);return i.success?(t.setStatus(g[s].progressLoaded.replace("{painted}",i.painted).replace("{total}",i.total),"success"),t.updateProgress(i.painted,i.total,c),d("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(t.setStatus(g[s].progressLoadError.replace("{error}",i.error),"error"),!1)}catch(i){return t.setStatus(g[s].progressLoadError.replace("{error}",i.message),"error"),!1}}});window.addEventListener("beforeunload",()=>{E(),t.destroy(),window.__wplaceBot.imageRunning=!1}),d("\u2705 Auto-Image inicializado correctamente")}catch(n){throw d("\u274C Error inicializando Auto-Image:",n),window.__wplaceBot.imageRunning=!1,n}}function W(){return(window.navigator.language||window.navigator.userLanguage||"es").startsWith("es"),"es"}(()=>{"use strict";var c;if((c=window.__wplaceBot)!=null&&c.running){alert("WPlace BOT ya est\xE1 corriendo.");return}window.__wplaceBot={running:!0},q().catch(o=>{console.error("[BOT] Error en Auto-Image:",o),window.__wplaceBot.running=!1,alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
