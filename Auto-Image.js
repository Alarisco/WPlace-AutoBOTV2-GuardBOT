/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T09:16:59.339Z */
(()=>{var d=(...l)=>console.log("[WPA-UI]",...l);var b={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}},g={es:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar"}},e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:b.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:b.PIXELS_PER_BATCH,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null};var y=class{constructor(s){this.imageSrc=s,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((s,t)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),s()},this.img.onerror=t,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(s,t){let n=document.createElement("canvas");return n.width=s,n.height=t,n.getContext("2d").drawImage(this.img,0,0,s,t),this.canvas.width=s,this.canvas.height=t,this.ctx.drawImage(n,0,0),this.getPixelData()}generatePreview(s,t){return this.previewCanvas.width=s,this.previewCanvas.height=t,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,s,t),this.previewCanvas.toDataURL()}getImageData(){let{width:s,height:t}=this.getDimensions(),n=this.getPixelData();return{width:s,height:t,pixels:n,originalName:this.originalName||"image.png"}}processImage(s,t){let{width:n,height:a}=this.getDimensions(),o=this.getPixelData(),r=[],c=0;for(let p=0;p<a;p++)for(let i=0;i<n;i++){let u=(p*n+i)*4,m=o[u],f=o[u+1],x=o[u+2],h=o[u+3];if(h<t.TRANSPARENCY_THRESHOLD||m>t.WHITE_THRESHOLD&&f>t.WHITE_THRESHOLD&&x>t.WHITE_THRESHOLD)continue;let w=this.findClosestColor({r:m,g:f,b:x},s);w&&(r.push({x:i,y:p,originalColor:{r:m,g:f,b:x,alpha:h},targetColor:w}),c++)}return{width:n,height:a,pixels:r,validPixelCount:c,originalName:this.originalName||"image.png"}}findClosestColor(s,t){if(!t||t.length===0)return null;let n=null,a=1/0;for(let o of t){let r=Math.sqrt(Math.pow(s.r-o.r,2)+Math.pow(s.g-o.g,2)+Math.pow(s.b-o.b,2));r<a&&(a=r,n=o)}return n}};function C(){let l=[],s=document.querySelectorAll(".color-option, .palette-color, [data-color]");for(let t of s){let n=t.getAttribute("data-color")||t.style.backgroundColor||window.getComputedStyle(t).backgroundColor;if(n){let a=N(n);a&&l.push({id:t.getAttribute("data-id")||l.length,element:t,...a})}}return l}function N(l){if(l.startsWith("#")){let s=l.slice(1);if(s.length===6)return{r:parseInt(s.slice(0,2),16),g:parseInt(s.slice(2,4),16),b:parseInt(s.slice(4,6),16)}}if(l.startsWith("rgb")){let s=l.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);if(s)return{r:parseInt(s[1]),g:parseInt(s[2]),b:parseInt(s[3])}}return null}var v=l=>new Promise(s=>setTimeout(s,l));var q="https://backend.wplace.live";async function I(l,s,t){try{let n=await fetch(`${q}/s0/paint`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({coords:l,colors:s,t})}),a=await n.json().catch(()=>({}));return{status:n.status,json:a,success:n.ok}}catch(n){return{status:0,json:{error:n.message},success:!1}}}var T=!1;async function O(){if(!(T||window.turnstile))return new Promise((l,s)=>{let t=document.createElement("script");t.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",t.async=!0,t.defer=!0,t.onload=()=>{T=!0,l()},t.onerror=()=>s(new Error("No se pudo cargar Turnstile")),document.head.appendChild(t)})}async function j(l,s="paint"){var t;if(await O(),typeof((t=window.turnstile)==null?void 0:t.execute)=="function")try{let n=await window.turnstile.execute(l,{action:s});if(n&&n.length>20)return n}catch{}return await new Promise(n=>{let a=document.createElement("div");a.style.position="fixed",a.style.left="-9999px",document.body.appendChild(a),window.turnstile.render(a,{sitekey:l,callback:o=>{document.body.removeChild(a),n(o)}})})}async function k(l){return j(l,"paint")}async function L(l,s,t,n,a){let{width:o,height:r}=l,{x:c,y:p}=s;d(`Iniciando pintado: imagen(${o}x${r}) inicio LOCAL(${c},${p}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(d("Generando cola de p\xEDxeles..."),e.remainingPixels=H(l,s,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(i=>{let u=i.imageY*o+i.imageX,m=e.lastPosition.y*o+e.lastPosition.x;return u>=m})),d(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let i=Math.floor(e.currentCharges),u=Math.min(e.pixelsPerBatch,e.remainingPixels.length);if(i<u){d(`Cargas insuficientes: ${i}/${u} necesarias`),await F(u-i,t);continue}let m=e.remainingPixels.splice(0,u);d(`Pintando lote de ${m.length} p\xEDxeles...`);let f=await X(m);if(f.success&&f.painted>0){if(e.paintedPixels+=f.painted,m.length>0){let x=m[m.length-1];e.lastPosition={x:x.imageX,y:x.imageY}}d(`Lote exitoso: ${f.painted}/${m.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`),t&&t(e.paintedPixels,e.totalPixels)}else e.remainingPixels.unshift(...m),d("Lote fall\xF3: reintentando en 5 segundos..."),await v(5e3);await v(500)}e.stopFlag?(d(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),n&&n(!1,e.paintedPixels)):(d(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],n&&n(!0,e.paintedPixels))}catch(i){d("Error en proceso de pintado:",i),a&&a(i)}}async function X(l){var s;try{if(!l||l.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let t=[],n=[];for(let r of l)t.push(r.localX,r.localY),n.push(r.color.id||r.color.value||1);let a=await k(b.SITEKEY),o=await I(t,n,a);return o.status===200&&o.json?{success:!0,painted:o.json.painted||l.length,response:o.json}:{success:!1,painted:0,error:((s=o.json)==null?void 0:s.message)||`HTTP ${o.status}`,status:o.status}}catch(t){return d("Error en paintPixelBatch:",t),{success:!1,painted:0,error:t.message}}}async function F(l,s){let t=b.CHARGE_REGEN_MS*l,n=Math.min(t,6e4);d(`Esperando ${Math.round(n/1e3)}s para obtener ${l} cargas`),s&&s(e.paintedPixels,e.totalPixels,`Esperando cargas (${Math.round(n/1e3)}s)`),await v(n),e.currentCharges=Math.min(50,e.currentCharges+n/b.CHARGE_REGEN_MS)}function H(l,s,t,n){let{pixels:a}=l,{x:o,y:r}=s,c=[];for(let p of a){let i=o+p.x,u=r+p.y;c.push({imageX:p.x,imageY:p.y,localX:i,localY:u,tileX:t,tileY:n,color:p.targetColor,originalColor:p.originalColor})}return d(`Cola de p\xEDxeles generada: ${c.length} p\xEDxeles para pintar`),c}function S(){e.stopFlag=!0,e.running=!1,d("\u{1F6D1} Deteniendo proceso de pintado...")}function E(l=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let s={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch},colors:e.availableColors,remainingPixels:e.remainingPixels||[]},t=JSON.stringify(s,null,2),n=new window.Blob([t],{type:"application/json"}),a=l||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,o=window.URL.createObjectURL(n),r=document.createElement("a");return r.href=o,r.download=a,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(o),d(`\u2705 Progreso guardado: ${a}`),{success:!0,filename:a}}catch(s){return d("\u274C Error guardando progreso:",s),{success:!1,error:s.message}}}async function $(l){return new Promise(s=>{try{let t=new window.FileReader;t.onload=n=>{try{let a=JSON.parse(n.target.result),r=["imageData","progress","position","colors"].filter(c=>!(c in a));if(r.length>0)throw new Error(`Campos requeridos faltantes: ${r.join(", ")}`);if(e.availableColors.length>0){let c=a.colors.map(u=>u.id),p=e.availableColors.map(u=>u.id);c.filter(u=>p.includes(u)).length<c.length*.8&&d("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...a.imageData,pixels:[]},e.paintedPixels=a.progress.paintedPixels,e.totalPixels=a.progress.totalPixels,e.lastPosition=a.progress.lastPosition,e.startPosition=a.position.startPosition,e.tileX=a.position.tileX,e.tileY=a.position.tileY,e.originalImageName=a.imageData.originalName,e.remainingPixels=a.remainingPixels||[],a.config&&(e.pixelsPerBatch=a.config.pixelsPerBatch||e.pixelsPerBatch),e.imageLoaded=!0,e.colorsChecked=!0,d(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),s({success:!0,data:a,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(a){d("\u274C Error parseando archivo de progreso:",a),s({success:!1,error:a.message})}},t.onerror=()=>{let n="Error leyendo archivo";d("\u274C",n),s({success:!1,error:n})},t.readAsText(l)}catch(t){d("\u274C Error cargando progreso:",t),s({success:!1,error:t.message})}})}function D(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,d("\u{1F9F9} Progreso limpiado")}function B(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function A(){return{hasProgress:B(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:B()}}function R(l=null){let s=document.createElement("div");l&&(s.id=l),s.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let t=s.attachShadow({mode:"open"});return document.body.appendChild(s),{host:s,root:t}}function M(l,s){let t=0,n=0,a=0,o=0;l.style.cursor="move",l.addEventListener("mousedown",r);function r(i){i.target.closest(".header-btn, .wplace-header-btn")||(i.preventDefault(),a=i.clientX,o=i.clientY,document.addEventListener("mouseup",p),document.addEventListener("mousemove",c))}function c(i){i.preventDefault(),t=a-i.clientX,n=o-i.clientY,a=i.clientX,o=i.clientY,s.style.top=s.offsetTop-n+"px",s.style.left=s.offsetLeft-t+"px"}function p(){document.removeEventListener("mouseup",p),document.removeEventListener("mousemove",c)}}async function z({texts:l,...s}){d("\u{1F3A8} Creando interfaz de Auto-Image");let{host:t,root:n}=R(),a=document.createElement("link");a.rel="stylesheet",a.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",n.appendChild(a);let o=document.createElement("style");o.textContent=`
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
  `,n.appendChild(o);let r=document.createElement("div");r.className="container",r.innerHTML=`
    <div class="header">
      <div class="header-title">
        <i class="fas fa-image"></i>
        <span>${l.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          <i class="fas fa-cog"></i>
        </button>
        <button class="header-btn minimize-btn" title="${l.minimize}">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="content">
      <div class="config-panel">
        <div class="config-item">
          <label>${l.pixelsPerBatch}:</label>
          <input class="config-input pixels-per-batch" type="number" min="1" max="50" value="10">
        </div>
      </div>
      
      <div class="controls">
        <button class="btn btn-primary init-btn">
          <i class="fas fa-robot"></i>
          <span>${l.initBot}</span>
        </button>
        <button class="btn btn-upload upload-btn" disabled>
          <i class="fas fa-upload"></i>
          <span>${l.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          <i class="fas fa-file-import"></i>
          <span>${l.loadProgress}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          <i class="fas fa-crosshairs"></i>
          <span>${l.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          <i class="fas fa-play"></i>
          <span>${l.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          <i class="fas fa-stop"></i>
          <span>${l.stopPainting}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label"><i class="fas fa-info-circle"></i> ${l.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${l.waitingInit}
      </div>
    </div>
  `,n.appendChild(r);let c=document.createElement("input");c.type="file",c.accept="image/png,image/jpeg",c.style.display="none",n.appendChild(c);let p=document.createElement("input");p.type="file",p.accept=".json",p.style.display="none",n.appendChild(p);let i={header:r.querySelector(".header"),configBtn:r.querySelector(".config-btn"),minimizeBtn:r.querySelector(".minimize-btn"),configPanel:r.querySelector(".config-panel"),pixelsPerBatch:r.querySelector(".pixels-per-batch"),initBtn:r.querySelector(".init-btn"),uploadBtn:r.querySelector(".upload-btn"),loadProgressBtn:r.querySelector(".load-progress-btn"),selectPosBtn:r.querySelector(".select-pos-btn"),startBtn:r.querySelector(".start-btn"),stopBtn:r.querySelector(".stop-btn"),progressBar:r.querySelector(".progress-bar"),statsArea:r.querySelector(".stats-area"),status:r.querySelector(".status"),content:r.querySelector(".content")},u={minimized:!1,configVisible:!1};M(i.header,r),i.minimizeBtn.addEventListener("click",()=>{u.minimized=!u.minimized,u.minimized?(r.classList.add("minimized"),i.minimizeBtn.innerHTML='<i class="fas fa-expand"></i>'):(r.classList.remove("minimized"),i.minimizeBtn.innerHTML='<i class="fas fa-minus"></i>')}),i.configBtn.addEventListener("click",()=>{u.configVisible=!u.configVisible,u.configVisible?(i.configPanel.classList.add("visible"),i.configBtn.innerHTML='<i class="fas fa-times"></i>'):(i.configPanel.classList.remove("visible"),i.configBtn.innerHTML='<i class="fas fa-cog"></i>')}),i.initBtn.addEventListener("click",async()=>{i.initBtn.disabled=!0,s.onInitBot&&await s.onInitBot()&&(i.uploadBtn.disabled=!1,i.loadProgressBtn.disabled=!1),i.initBtn.disabled=!1}),i.uploadBtn.addEventListener("click",()=>{c.click()}),c.addEventListener("change",async()=>{c.files.length>0&&s.onUploadImage&&await s.onUploadImage(c.files[0])&&(i.selectPosBtn.disabled=!1)}),i.loadProgressBtn.addEventListener("click",()=>{p.click()}),p.addEventListener("change",async()=>{p.files.length>0&&s.onLoadProgress&&await s.onLoadProgress(p.files[0])&&(i.selectPosBtn.disabled=!1,i.startBtn.disabled=!1)}),i.selectPosBtn.addEventListener("click",async()=>{s.onSelectPosition&&(i.selectPosBtn.disabled=!0,await s.onSelectPosition()&&(i.startBtn.disabled=!1),i.selectPosBtn.disabled=!1)}),i.startBtn.addEventListener("click",async()=>{s.onStartPainting&&(i.startBtn.disabled=!0,i.stopBtn.disabled=!1,await s.onStartPainting()||(i.startBtn.disabled=!1,i.stopBtn.disabled=!0))}),i.stopBtn.addEventListener("click",async()=>{s.onStopPainting&&await s.onStopPainting()&&(i.startBtn.disabled=!1,i.stopBtn.disabled=!0)});function m(h,P="default"){i.status.textContent=h,i.status.className=`status status-${P}`,i.status.style.animation="none",i.status.offsetWidth,i.status.style.animation="slideIn 0.3s ease-out"}function f(h,P){let w=P>0?h/P*100:0;i.progressBar.style.width=`${w}%`,i.statsArea.innerHTML=`
      <div class="stat-item">
        <div class="stat-label"><i class="fas fa-palette"></i> ${l.progress}</div>
        <div>${h}/${P} (${w.toFixed(1)}%)</div>
      </div>
    `}function x(){t.remove()}return d("\u2705 Interfaz de Auto-Image creada"),{setStatus:m,updateProgress:f,destroy:x}}function _(l,s,t={}){return new Promise(n=>{let a=document.createElement("div");a.className="modal-overlay",a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.width="100%",a.style.height="100%",a.style.background="rgba(0,0,0,0.7)",a.style.zIndex="10001",a.style.display="flex",a.style.alignItems="center",a.style.justifyContent="center";let o=document.createElement("div");o.style.background="#1a1a1a",o.style.border="2px solid #333",o.style.borderRadius="15px",o.style.padding="25px",o.style.color="#eee",o.style.minWidth="350px",o.style.maxWidth="400px",o.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",o.style.fontFamily="'Segoe UI', Roboto, sans-serif",o.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${s}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${l}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${t.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${t.save}</button>`:""}
        ${t.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${t.discard}</button>`:""}
        ${t.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${t.cancel}</button>`:""}
      </div>
    `,a.appendChild(o),document.body.appendChild(a);let r=o.querySelector(".save-btn"),c=o.querySelector(".discard-btn"),p=o.querySelector(".cancel-btn"),i=()=>{document.body.removeChild(a)};r&&r.addEventListener("click",()=>{i(),n("save")}),c&&c.addEventListener("click",()=>{i(),n("discard")}),p&&p.addEventListener("click",()=>{i(),n("cancel")}),a.addEventListener("click",u=>{u.target===a&&(i(),n("cancel"))})})}async function Y(){var l;if(d("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),(l=window.__wplaceBot)!=null&&l.imageRunning){alert("Auto-Image ya est\xE1 ejecut\xE1ndose.");return}window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};try{let s={...b},t=U();if(e.language=t,!s.SITEKEY){let a=document.querySelector("*[data-sitekey]");a?(s.SITEKEY=a.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${s.SITEKEY.substring(0,20)}...`)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}let n=await z({texts:g[t],onInitBot:async()=>{d("\u{1F916} Inicializando Auto-Image..."),n.setStatus(g[t].checkingColors,"info");let a=C();return a.length===0?(n.setStatus(g[t].noColorsFound,"error"),!1):(e.availableColors=a,e.colorsChecked=!0,n.setStatus(g[t].colorsFound.replace("{count}",a.length),"success"),d(`\u2705 ${a.length} colores disponibles detectados`),!0)},onUploadImage:async a=>{try{n.setStatus(g[t].loadingImage,"info");let o=window.URL.createObjectURL(a),r=new y(o);r.originalName=a.name,await r.load();let c=r.processImage(e.availableColors,s);return e.imageData=c,e.totalPixels=c.validPixelCount,e.paintedPixels=0,e.originalImageName=a.name,e.imageLoaded=!0,n.setStatus(g[t].imageLoaded.replace("{count}",c.validPixelCount),"success"),n.updateProgress(0,c.validPixelCount),d(`\u2705 Imagen cargada: ${c.width}x${c.height}, ${c.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(o),!0}catch(o){return n.setStatus(g[t].imageError,"error"),d("\u274C Error cargando imagen:",o),!1}},onSelectPosition:async()=>new Promise(a=>{n.setStatus(g[t].selectPositionAlert,"info"),n.setStatus(g[t].waitingPosition,"info"),e.selectingPosition=!0;let o=window.fetch;window.fetch=async(r,c)=>{if(e.selectingPosition&&r.includes("/s0/paint"))try{let p=await o(r,c);if(p.ok&&c.body){let i=JSON.parse(c.body);if(i.coords&&i.coords.length>=2){let u=i.coords[0],m=i.coords[1],f=r.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);f&&(e.tileX=parseInt(f[1]),e.tileY=parseInt(f[2])),e.startPosition={x:u,y:m},e.selectingPosition=!1,window.fetch=o,n.setStatus(g[t].positionSet,"success"),d(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${u},${m})`),a(!0)}}return p}catch(p){return d("Error interceptando pixel:",p),o(r,c)}return o(r,c)},setTimeout(()=>{e.selectingPosition&&(window.fetch=o,e.selectingPosition=!1,n.setStatus(g[t].positionTimeout,"error"),a(!1))},12e4)}),onStartPainting:async()=>{if(!e.imageLoaded||!e.startPosition)return n.setStatus(g[t].missingRequirements,"error"),!1;e.running=!0,e.stopFlag=!1,n.setStatus(g[t].startPaintingMsg,"success");try{return await L(e.imageData,e.startPosition,(a,o,r)=>{n.updateProgress(a,o),r?n.setStatus(r,"info"):n.setStatus(g[t].paintingProgress.replace("{painted}",a).replace("{total}",o),"info")},(a,o)=>{a?(n.setStatus(g[t].paintingComplete.replace("{count}",o),"success"),D()):n.setStatus(g[t].paintingStopped,"warning"),e.running=!1},a=>{n.setStatus(g[t].paintingError,"error"),d("\u274C Error en proceso de pintado:",a),e.running=!1}),!0}catch(a){return n.setStatus(g[t].paintingError,"error"),d("\u274C Error iniciando pintado:",a),e.running=!1,!1}},onStopPainting:async()=>{if(A().hasProgress){let o=await _(g[t].confirmSaveProgress,g[t].saveProgressTitle,{save:g[t].saveProgress,discard:g[t].discardProgress,cancel:g[t].cancel});if(o==="save"){let r=E();r.success?n.setStatus(g[t].progressSaved.replace("{filename}",r.filename),"success"):n.setStatus(g[t].progressSaveError.replace("{error}",r.error),"error")}else if(o==="cancel")return!1}return S(),n.setStatus(g[t].paintingStopped,"warning"),!0},onSaveProgress:async()=>{let a=E();return a.success?n.setStatus(g[t].progressSaved.replace("{filename}",a.filename),"success"):n.setStatus(g[t].progressSaveError.replace("{error}",a.error),"error"),a.success},onLoadProgress:async a=>{try{let o=await $(a);return o.success?(n.setStatus(g[t].progressLoaded.replace("{painted}",o.painted).replace("{total}",o.total),"success"),n.updateProgress(o.painted,o.total),!0):(n.setStatus(g[t].progressLoadError.replace("{error}",o.error),"error"),!1)}catch(o){return n.setStatus(g[t].progressLoadError.replace("{error}",o.message),"error"),!1}}});window.addEventListener("beforeunload",()=>{S(),n.destroy(),window.__wplaceBot.imageRunning=!1}),d("\u2705 Auto-Image inicializado correctamente")}catch(s){throw d("\u274C Error inicializando Auto-Image:",s),window.__wplaceBot.imageRunning=!1,s}}function U(){return(navigator.language||navigator.userLanguage||"es").startsWith("es"),"es"}(()=>{"use strict";var l;if((l=window.__wplaceBot)!=null&&l.running){alert("WPlace BOT ya est\xE1 corriendo.");return}window.__wplaceBot={running:!0},Y().catch(s=>{console.error("[BOT] Error en Auto-Image:",s),window.__wplaceBot.running=!1,alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
