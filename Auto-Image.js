/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T12:12:32.119Z */
(()=>{var d=(...l)=>console.log("[WPA-UI]",...l);var S={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}},m={es:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar"}},e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:S.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:S.PIXELS_PER_BATCH,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null};var L=class{constructor(s){this.imageSrc=s,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((s,a)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),s()},this.img.onerror=a,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(s,a){let n=document.createElement("canvas");return n.width=s,n.height=a,n.getContext("2d").drawImage(this.img,0,0,s,a),this.canvas.width=s,this.canvas.height=a,this.ctx.drawImage(n,0,0),this.getPixelData()}generatePreview(s,a){return this.previewCanvas.width=s,this.previewCanvas.height=a,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,s,a),this.previewCanvas.toDataURL()}getImageData(){let{width:s,height:a}=this.getDimensions(),n=this.getPixelData();return{width:s,height:a,pixels:n,originalName:this.originalName||"image.png"}}processImage(s,a){let{width:n,height:i}=this.getDimensions(),t=this.getPixelData(),o=[],r=0;for(let u=0;u<i;u++)for(let p=0;p<n;p++){let c=(u*n+p)*4,g=t[c],f=t[c+1],w=t[c+2],C=t[c+3];if(C<a.TRANSPARENCY_THRESHOLD||g>a.WHITE_THRESHOLD&&f>a.WHITE_THRESHOLD&&w>a.WHITE_THRESHOLD)continue;let k=this.findClosestColor({r:g,g:f,b:w},s);k&&(o.push({x:p,y:u,originalColor:{r:g,g:f,b:w,alpha:C},targetColor:k}),r++)}return{width:n,height:i,pixels:o,validPixelCount:r,originalName:this.originalName||"image.png"}}findClosestColor(s,a){if(!a||a.length===0)return null;let n=null,i=1/0;for(let t of a){let o=Math.sqrt(Math.pow(s.r-t.r,2)+Math.pow(s.g-t.g,2)+Math.pow(s.b-t.b,2));o<i&&(i=o,n=t)}return n}};function M(){d("\u{1F3A8} Detectando colores disponibles...");let l=document.querySelectorAll('[id^="color-"]'),s=[];for(let a of l){if(a.querySelector("svg"))continue;let n=a.id.replace("color-",""),i=parseInt(n);if(i===0||i===5)continue;let t=a.style.backgroundColor;if(t){let o=t.match(/\d+/g);if(o&&o.length>=3){let r={r:parseInt(o[0]),g:parseInt(o[1]),b:parseInt(o[2])};s.push({id:i,element:a,...r}),d(`Color detectado: id=${i}, rgb(${r.r},${r.g},${r.b})`)}}}return d(`\u2705 ${s.length} colores disponibles detectados`),s}var B=l=>new Promise(s=>setTimeout(s,l));var _="https://backend.wplace.live";async function Y(){var l,s,a;try{let n=await fetch(`${_}/me`,{credentials:"include"}).then(r=>r.json()),i=n||null,t=(n==null?void 0:n.charges)||{},o={count:(l=t.count)!=null?l:0,max:(s=t.max)!=null?s:0,cooldownMs:(a=t.cooldownMs)!=null?a:3e4};return{success:!0,data:{user:i,charges:o.count,maxCharges:o.max,chargeRegen:o.cooldownMs}}}catch(n){return{success:!1,error:n.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function q(l,s,a,n,i){try{let t=JSON.stringify({colors:n,coords:a,t:i}),o=await fetch(`${_}/s0/pixel/${l}/${s}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:t}),r=null;try{r=await o.json()}catch{r={}}return{status:o.status,json:r,success:o.ok,painted:(r==null?void 0:r.painted)||0}}catch(t){return{status:0,json:{error:t.message},success:!1,painted:0}}}var N=!1;async function Z(){if(!(N||window.turnstile))return new Promise((l,s)=>{let a=document.createElement("script");a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",a.async=!0,a.defer=!0,a.onload=()=>{N=!0,l()},a.onerror=()=>s(new Error("No se pudo cargar Turnstile")),document.head.appendChild(a)})}async function ee(l,s="paint"){var a;if(await Z(),typeof((a=window.turnstile)==null?void 0:a.execute)=="function")try{let n=await window.turnstile.execute(l,{action:s});if(n&&n.length>20)return n}catch{}return await new Promise(n=>{let i=document.createElement("div");i.style.position="fixed",i.style.left="-9999px",document.body.appendChild(i),window.turnstile.render(i,{sitekey:l,callback:t=>{document.body.removeChild(i),n(t)}})})}async function X(l){return ee(l,"paint")}async function O(l,s,a,n,i){let{width:t,height:o}=l,{x:r,y:u}=s;d(`Iniciando pintado: imagen(${t}x${o}) inicio LOCAL(${r},${u}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(d("Generando cola de p\xEDxeles..."),e.remainingPixels=ae(l,s,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(p=>{let c=p.imageY*t+p.imageX,g=e.lastPosition.y*t+e.lastPosition.x;return c>=g})),d(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let p=Math.floor(e.currentCharges),c=Math.min(e.pixelsPerBatch,e.remainingPixels.length);if(p<c){d(`Cargas insuficientes: ${p}/${c} necesarias`),await ie(c-p,a);continue}let g=e.remainingPixels.splice(0,c);d(`Pintando lote de ${g.length} p\xEDxeles...`);let f=await te(g);if(f.success&&f.painted>0){if(e.paintedPixels+=f.painted,g.length>0){let w=g[g.length-1];e.lastPosition={x:w.imageX,y:w.imageY}}d(`Lote exitoso: ${f.painted}/${g.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`),a&&a(e.paintedPixels,e.totalPixels)}else e.remainingPixels.unshift(...g),d("Lote fall\xF3: reintentando en 5 segundos..."),await B(5e3);await B(500)}e.stopFlag?(d(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),n&&n(!1,e.paintedPixels)):(d(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],n&&n(!0,e.paintedPixels))}catch(p){d("Error en proceso de pintado:",p),i&&i(p)}}async function te(l){var s;try{if(!l||l.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let a=[],n=[],i=null,t=null;for(let u of l)a.push(u.localX,u.localY),n.push(u.color.id||u.color.value||1),i===null&&(i=u.tileX,t=u.tileY);let o=await X(S.SITEKEY),r=await q(i,t,a,n,o);return r.status===200?{success:!0,painted:r.painted,response:r.json}:{success:!1,painted:0,error:((s=r.json)==null?void 0:s.message)||`HTTP ${r.status}`,status:r.status}}catch(a){return d("Error en paintPixelBatch:",a),{success:!1,painted:0,error:a.message}}}async function ie(l,s){let a=S.CHARGE_REGEN_MS*l,n=Math.min(a,6e4);d(`Esperando ${Math.round(n/1e3)}s para obtener ${l} cargas`),s&&s(e.paintedPixels,e.totalPixels,`Esperando cargas (${Math.round(n/1e3)}s)`),await B(n),e.currentCharges=Math.min(50,e.currentCharges+n/S.CHARGE_REGEN_MS)}function ae(l,s,a,n){let{pixels:i}=l,{x:t,y:o}=s,r=[];for(let u of i){let p=t+u.x,c=o+u.y;r.push({imageX:u.x,imageY:u.y,localX:p,localY:c,tileX:a,tileY:n,color:u.targetColor,originalColor:u.originalColor})}return d(`Cola de p\xEDxeles generada: ${r.length} p\xEDxeles para pintar`),r}function z(){e.stopFlag=!0,e.running=!1,d("\u{1F6D1} Deteniendo proceso de pintado...")}function T(l=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let s={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch},colors:e.availableColors.map(r=>({id:r.id,r:r.r,g:r.g,b:r.b})),remainingPixels:e.remainingPixels||[]},a=JSON.stringify(s,null,2),n=new window.Blob([a],{type:"application/json"}),i=l||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,t=window.URL.createObjectURL(n),o=document.createElement("a");return o.href=t,o.download=i,document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(t),d(`\u2705 Progreso guardado: ${i}`),{success:!0,filename:i}}catch(s){return d("\u274C Error guardando progreso:",s),{success:!1,error:s.message}}}async function H(l){return new Promise(s=>{try{let a=new window.FileReader;a.onload=n=>{try{let i=JSON.parse(n.target.result),o=["imageData","progress","position","colors"].filter(r=>!(r in i));if(o.length>0)throw new Error(`Campos requeridos faltantes: ${o.join(", ")}`);if(e.availableColors.length>0){let r=i.colors.map(c=>c.id),u=e.availableColors.map(c=>c.id);r.filter(c=>u.includes(c)).length<r.length*.8&&d("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...i.imageData,pixels:[]},e.paintedPixels=i.progress.paintedPixels,e.totalPixels=i.progress.totalPixels,i.progress.lastPosition?e.lastPosition=i.progress.lastPosition:i.position.lastX!==void 0&&i.position.lastY!==void 0&&(e.lastPosition={x:i.position.lastX,y:i.position.lastY}),i.position.startPosition?e.startPosition=i.position.startPosition:i.position.startX!==void 0&&i.position.startY!==void 0&&(e.startPosition={x:i.position.startX,y:i.position.startY}),e.tileX=i.position.tileX,e.tileY=i.position.tileY,e.originalImageName=i.imageData.originalName,e.remainingPixels=i.remainingPixels||i.progress.remainingPixels||[],i.config&&(e.pixelsPerBatch=i.config.pixelsPerBatch||e.pixelsPerBatch),e.imageLoaded=!0,e.colorsChecked=!0,d(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),s({success:!0,data:i,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(i){d("\u274C Error parseando archivo de progreso:",i),s({success:!1,error:i.message})}},a.onerror=()=>{let n="Error leyendo archivo";d("\u274C",n),s({success:!1,error:n})},a.readAsText(l)}catch(a){d("\u274C Error cargando progreso:",a),s({success:!1,error:a.message})}})}function j(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,d("\u{1F9F9} Progreso limpiado")}function F(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function U(){return{hasProgress:F(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:F()}}function W(l=null){let s=document.createElement("div");l&&(s.id=l),s.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let a=s.attachShadow({mode:"open"});return document.body.appendChild(s),{host:s,root:a}}function G(l,s){let a=0,n=0,i=0,t=0;l.style.cursor="move",l.addEventListener("mousedown",o);function o(p){p.target.closest(".header-btn, .wplace-header-btn")||(p.preventDefault(),i=p.clientX,t=p.clientY,document.addEventListener("mouseup",u),document.addEventListener("mousemove",r))}function r(p){p.preventDefault(),a=i-p.clientX,n=t-p.clientY,i=p.clientX,t=p.clientY,s.style.top=s.offsetTop-n+"px",s.style.left=s.offsetLeft-a+"px"}function u(){document.removeEventListener("mouseup",u),document.removeEventListener("mousemove",r)}}async function V({texts:l,...s}){if(d("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let h=document.createElement("link");h.rel="stylesheet",h.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(h),d("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:a,root:n}=W(),i=document.createElement("style");i.textContent=`
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
  `,n.appendChild(i);let t=document.createElement("div");t.className="container",t.innerHTML=`
    <div class="header">
      <div class="header-title">
        \u{1F5BC}\uFE0F
        <span>${l.title}</span>
      </div>
      <div class="header-controls">
        <button class="header-btn config-btn" title="Configuraci\xF3n">
          \u2699\uFE0F
        </button>
        <button class="header-btn minimize-btn" title="${l.minimize}">
          \u2796
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
          \u{1F916}
          <span>${l.initBot}</span>
        </button>
        <button class="btn btn-upload upload-btn" disabled>
          \u{1F4E4}
          <span>${l.uploadImage}</span>
        </button>
        <button class="btn btn-load load-progress-btn" disabled>
          \u{1F4C1}
          <span>${l.loadProgress}</span>
        </button>
        <button class="btn btn-primary resize-btn" disabled>
          \u{1F504}
          <span>${l.resizeImage}</span>
        </button>
        <button class="btn btn-select select-pos-btn" disabled>
          \u{1F3AF}
          <span>${l.selectPosition}</span>
        </button>
        <button class="btn btn-start start-btn" disabled>
          \u25B6\uFE0F
          <span>${l.startPainting}</span>
        </button>
        <button class="btn btn-stop stop-btn" disabled>
          \u23F9\uFE0F
          <span>${l.stopPainting}</span>
        </button>
      </div>
      
      <div class="progress">
        <div class="progress-bar"></div>
      </div>
      
      <div class="stats">
        <div class="stats-area">
          <div class="stat-item">
            <div class="stat-label">\u2139\uFE0F ${l.initMessage}</div>
          </div>
        </div>
      </div>
      
      <div class="status status-default">
        ${l.waitingInit}
      </div>
    </div>
  `,n.appendChild(t);let o=document.createElement("input");o.type="file",o.accept="image/png,image/jpeg",o.style.display="none",n.appendChild(o);let r=document.createElement("input");r.type="file",r.accept=".json",r.style.display="none",n.appendChild(r);let u=document.createElement("div");u.className="resize-overlay",n.appendChild(u);let p=document.createElement("div");p.className="resize-container",p.innerHTML=`
    <h3>${l.resizeImage}</h3>
    <div class="resize-controls">
      <label>
        ${l.width}: <span class="width-value">0</span>px
        <input type="range" class="resize-slider width-slider" min="10" max="500" value="100">
      </label>
      <label>
        ${l.height}: <span class="height-value">0</span>px
        <input type="range" class="resize-slider height-slider" min="10" max="500" value="100">
      </label>
      <label>
        <input type="checkbox" class="keep-aspect" checked>
        ${l.keepAspect}
      </label>
      <img class="resize-preview" src="" alt="Preview">
      <div class="resize-buttons">
        <button class="btn btn-primary confirm-resize">
          \u2705
          <span>${l.apply}</span>
        </button>
        <button class="btn btn-stop cancel-resize">
          \u274C
          <span>${l.cancel}</span>
        </button>
      </div>
    </div>
  `,n.appendChild(p);let c={header:t.querySelector(".header"),configBtn:t.querySelector(".config-btn"),minimizeBtn:t.querySelector(".minimize-btn"),configPanel:t.querySelector(".config-panel"),pixelsPerBatch:t.querySelector(".pixels-per-batch"),initBtn:t.querySelector(".init-btn"),uploadBtn:t.querySelector(".upload-btn"),loadProgressBtn:t.querySelector(".load-progress-btn"),resizeBtn:t.querySelector(".resize-btn"),selectPosBtn:t.querySelector(".select-pos-btn"),startBtn:t.querySelector(".start-btn"),stopBtn:t.querySelector(".stop-btn"),progressBar:t.querySelector(".progress-bar"),statsArea:t.querySelector(".stats-area"),status:t.querySelector(".status"),content:t.querySelector(".content")},g={overlay:u,container:p,widthSlider:p.querySelector(".width-slider"),heightSlider:p.querySelector(".height-slider"),widthValue:p.querySelector(".width-value"),heightValue:p.querySelector(".height-value"),keepAspect:p.querySelector(".keep-aspect"),preview:p.querySelector(".resize-preview"),confirmBtn:p.querySelector(".confirm-resize"),cancelBtn:p.querySelector(".cancel-resize")},f={minimized:!1,configVisible:!1};G(c.header,t),c.minimizeBtn.addEventListener("click",()=>{f.minimized=!f.minimized,f.minimized?(t.classList.add("minimized"),c.minimizeBtn.innerHTML="\u{1F53C}"):(t.classList.remove("minimized"),c.minimizeBtn.innerHTML="\u{1F53D}")}),c.configBtn.addEventListener("click",()=>{f.configVisible=!f.configVisible,f.configVisible?(c.configPanel.classList.add("visible"),c.configBtn.innerHTML="\u274C"):(c.configPanel.classList.remove("visible"),c.configBtn.innerHTML="\u2699\uFE0F")}),c.initBtn.addEventListener("click",async()=>{c.initBtn.disabled=!0,s.onInitBot&&await s.onInitBot()&&(c.uploadBtn.disabled=!1,c.loadProgressBtn.disabled=!1),c.initBtn.disabled=!1}),c.uploadBtn.addEventListener("click",()=>{o.click()}),o.addEventListener("change",async()=>{o.files.length>0&&s.onUploadImage&&await s.onUploadImage(o.files[0])&&(c.selectPosBtn.disabled=!1,c.resizeBtn.disabled=!1)}),c.loadProgressBtn.addEventListener("click",()=>{r.click()}),r.addEventListener("change",async()=>{r.files.length>0&&s.onLoadProgress&&await s.onLoadProgress(r.files[0])&&(c.selectPosBtn.disabled=!1,c.startBtn.disabled=!1,c.resizeBtn.disabled=!1)}),c.resizeBtn.addEventListener("click",()=>{s.onResizeImage&&s.onResizeImage()}),c.selectPosBtn.addEventListener("click",async()=>{s.onSelectPosition&&(c.selectPosBtn.disabled=!0,await s.onSelectPosition()&&(c.startBtn.disabled=!1),c.selectPosBtn.disabled=!1)}),c.startBtn.addEventListener("click",async()=>{s.onStartPainting&&(c.startBtn.disabled=!0,c.stopBtn.disabled=!1,await s.onStartPainting()||(c.startBtn.disabled=!1,c.stopBtn.disabled=!0))}),c.stopBtn.addEventListener("click",async()=>{s.onStopPainting&&await s.onStopPainting()&&(c.startBtn.disabled=!1,c.stopBtn.disabled=!0)});function w(h,b="default"){c.status.textContent=h,c.status.className=`status status-${b}`,c.status.style.animation="none",c.status.offsetWidth,c.status.style.animation="slideIn 0.3s ease-out"}function C(h){let{width:b,height:x}=h.getDimensions(),E=b/x;g.widthSlider.value=b,g.heightSlider.value=x,g.widthValue.textContent=b,g.heightValue.textContent=x,g.preview.src=h.img.src,g.overlay.style.display="block",g.container.style.display="block";let y=()=>{let P=parseInt(g.widthSlider.value),v=parseInt(g.heightSlider.value);g.widthValue.textContent=P,g.heightValue.textContent=v,g.preview.src=h.generatePreview(P,v)},D=()=>{if(g.keepAspect.checked){let P=parseInt(g.widthSlider.value),v=Math.round(P/E);g.heightSlider.value=v}y()},A=()=>{if(g.keepAspect.checked){let P=parseInt(g.heightSlider.value),v=Math.round(P*E);g.widthSlider.value=v}y()};g.widthSlider.addEventListener("input",D),g.heightSlider.addEventListener("input",A);let R=()=>{let P=parseInt(g.widthSlider.value),v=parseInt(g.heightSlider.value);s.onConfirmResize&&s.onConfirmResize(h,P,v),I()},$=()=>{I()};g.confirmBtn.addEventListener("click",R),g.cancelBtn.addEventListener("click",$),g.overlay.addEventListener("click",$),window.cleanupResizeDialog=()=>{g.widthSlider.removeEventListener("input",D),g.heightSlider.removeEventListener("input",A),g.confirmBtn.removeEventListener("click",R),g.cancelBtn.removeEventListener("click",$),g.overlay.removeEventListener("click",$)},y()}function I(){g.overlay.style.display="none",g.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function k(h,b,x=null){let E=b>0?h/b*100:0;c.progressBar.style.width=`${E}%`;let y=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${l.progress}</div>
        <div>${h}/${b} (${E.toFixed(1)}%)</div>
      </div>
    `;x&&(x.username&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${x.username}</div>
          </div>
        `),x.charges!==void 0&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${l.charges}</div>
            <div>${Math.floor(x.charges)}</div>
          </div>
        `),x.pixels!==void 0&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${l.pixels}</div>
            <div>${x.pixels.toLocaleString()}</div>
          </div>
        `)),c.statsArea.innerHTML=y}function Q(){a.remove()}return d("\u2705 Interfaz de Auto-Image creada"),{setStatus:w,updateProgress:k,showResizeDialog:C,closeResizeDialog:I,destroy:Q}}function J(l,s,a={}){return new Promise(n=>{let i=document.createElement("div");i.className="modal-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%",i.style.background="rgba(0,0,0,0.7)",i.style.zIndex="10001",i.style.display="flex",i.style.alignItems="center",i.style.justifyContent="center";let t=document.createElement("div");t.style.background="#1a1a1a",t.style.border="2px solid #333",t.style.borderRadius="15px",t.style.padding="25px",t.style.color="#eee",t.style.minWidth="350px",t.style.maxWidth="400px",t.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",t.style.fontFamily="'Segoe UI', Roboto, sans-serif",t.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${s}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${l}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${a.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${a.save}</button>`:""}
        ${a.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${a.discard}</button>`:""}
        ${a.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${a.cancel}</button>`:""}
      </div>
    `,i.appendChild(t),document.body.appendChild(i);let o=t.querySelector(".save-btn"),r=t.querySelector(".discard-btn"),u=t.querySelector(".cancel-btn"),p=()=>{document.body.removeChild(i)};o&&o.addEventListener("click",()=>{p(),n("save")}),r&&r.addEventListener("click",()=>{p(),n("discard")}),u&&u.addEventListener("click",()=>{p(),n("cancel")}),i.addEventListener("click",c=>{c.target===i&&(p(),n("cancel"))})})}async function K(){d("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let l=null;try{let s={...S},a=ne();if(e.language=a,!s.SITEKEY){let i=document.querySelector("*[data-sitekey]");i?(s.SITEKEY=i.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${s.SITEKEY.substring(0,20)}...`)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}let n=await V({texts:m[a],onInitBot:async()=>{d("\u{1F916} Inicializando Auto-Image..."),n.setStatus(m[a].checkingColors,"info");let i=M();if(i.length===0)return n.setStatus(m[a].noColorsFound,"error"),!1;let t=await Y(),o=null;return t.success&&t.data.user?(o={username:t.data.user.name||"An\xF3nimo",charges:t.data.charges,maxCharges:t.data.maxCharges,pixels:t.data.user.pixelsPainted||0},l=o,e.currentCharges=t.data.charges,d(`\u{1F464} Usuario conectado: ${t.data.user.name||"An\xF3nimo"} - Cargas: ${o.charges}/${o.maxCharges} - P\xEDxeles: ${o.pixels}`)):d("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=i,e.colorsChecked=!0,n.setStatus(m[a].colorsFound.replace("{count}",i.length),"success"),n.updateProgress(0,0,o),d(`\u2705 ${i.length} colores disponibles detectados`),!0},onUploadImage:async i=>{try{n.setStatus(m[a].loadingImage,"info");let t=window.URL.createObjectURL(i),o=new L(t);o.originalName=i.name,await o.load();let r=o.processImage(e.availableColors,s);return e.imageData=r,e.imageData.processor=o,e.totalPixels=r.validPixelCount,e.paintedPixels=0,e.originalImageName=i.name,e.imageLoaded=!0,n.setStatus(m[a].imageLoaded.replace("{count}",r.validPixelCount),"success"),n.updateProgress(0,r.validPixelCount,l),d(`\u2705 Imagen cargada: ${r.width}x${r.height}, ${r.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(t),!0}catch(t){return n.setStatus(m[a].imageError,"error"),d("\u274C Error cargando imagen:",t),!1}},onSelectPosition:async()=>new Promise(i=>{n.setStatus(m[a].selectPositionAlert,"info"),n.setStatus(m[a].waitingPosition,"info"),e.selectingPosition=!0;let t=window.fetch;window.fetch=async(o,r)=>{if(e.selectingPosition&&o.includes("/s0/paint"))try{let u=await t(o,r);if(u.ok&&r.body){let p=JSON.parse(r.body);if(p.coords&&p.coords.length>=2){let c=p.coords[0],g=p.coords[1],f=o.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);f&&(e.tileX=parseInt(f[1]),e.tileY=parseInt(f[2])),e.startPosition={x:c,y:g},e.selectingPosition=!1,window.fetch=t,n.setStatus(m[a].positionSet,"success"),d(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${c},${g})`),i(!0)}}return u}catch(u){return d("Error interceptando pixel:",u),t(o,r)}return t(o,r)},setTimeout(()=>{e.selectingPosition&&(window.fetch=t,e.selectingPosition=!1,n.setStatus(m[a].positionTimeout,"error"),i(!1))},12e4)}),onStartPainting:async()=>{var i;if(d("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((i=e.remainingPixels)==null?void 0:i.length)||0}),!e.imageLoaded||!e.startPosition)return n.setStatus(m[a].missingRequirements,"error"),d(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,n.setStatus(m[a].startPaintingMsg,"success");try{return await O(e.imageData,e.startPosition,(t,o,r)=>{l&&(l.charges=Math.floor(e.currentCharges)),n.updateProgress(t,o,l),r?n.setStatus(r,"info"):n.setStatus(m[a].paintingProgress.replace("{painted}",t).replace("{total}",o),"info")},(t,o)=>{t?(n.setStatus(m[a].paintingComplete.replace("{count}",o),"success"),j()):n.setStatus(m[a].paintingStopped,"warning"),e.running=!1},t=>{n.setStatus(m[a].paintingError,"error"),d("\u274C Error en proceso de pintado:",t),e.running=!1}),!0}catch(t){return n.setStatus(m[a].paintingError,"error"),d("\u274C Error iniciando pintado:",t),e.running=!1,!1}},onStopPainting:async()=>{if(U().hasProgress){let t=await J(m[a].confirmSaveProgress,m[a].saveProgressTitle,{save:m[a].saveProgress,discard:m[a].discardProgress,cancel:m[a].cancel});if(t==="save"){let o=T();o.success?n.setStatus(m[a].progressSaved.replace("{filename}",o.filename),"success"):n.setStatus(m[a].progressSaveError.replace("{error}",o.error),"error")}else if(t==="cancel")return!1}return z(),n.setStatus(m[a].paintingStopped,"warning"),!0},onSaveProgress:async()=>{let i=T();return i.success?n.setStatus(m[a].progressSaved.replace("{filename}",i.filename),"success"):n.setStatus(m[a].progressSaveError.replace("{error}",i.error),"error"),i.success},onLoadProgress:async i=>{try{let t=await H(i);return t.success?(n.setStatus(m[a].progressLoaded.replace("{painted}",t.painted).replace("{total}",t.total),"success"),n.updateProgress(t.painted,t.total,l),d("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(n.setStatus(m[a].progressLoadError.replace("{error}",t.error),"error"),!1)}catch(t){return n.setStatus(m[a].progressLoadError.replace("{error}",t.message),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&n.showResizeDialog(e.imageData.processor)},onConfirmResize:(i,t,o)=>{d(`\u{1F504} Redimensionando imagen de ${i.getDimensions().width}x${i.getDimensions().height} a ${t}x${o}`);try{i.resize(t,o);let r=i.processImage(e.availableColors,s);e.imageData=r,e.totalPixels=r.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},n.updateProgress(0,r.validPixelCount,l),n.setStatus(m[a].resizeSuccess.replace("{width}",t).replace("{height}",o),"success"),d(`\u2705 Imagen redimensionada: ${r.validPixelCount} p\xEDxeles v\xE1lidos`)}catch(r){d(`\u274C Error redimensionando imagen: ${r.message}`),n.setStatus(m[a].imageError,"error")}}});window.addEventListener("beforeunload",()=>{z(),n.destroy(),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1)}),d("\u2705 Auto-Image inicializado correctamente")}catch(s){throw d("\u274C Error inicializando Auto-Image:",s),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),s}}function ne(){return(window.navigator.language||window.navigator.userLanguage||"es").startsWith("es"),"es"}(()=>{"use strict";var l,s;if((l=window.__wplaceBot)!=null&&l.imageRunning){alert("Auto-Image ya est\xE1 corriendo.");return}if((s=window.__wplaceBot)!=null&&s.farmRunning){alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Image.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.imageRunning=!0,K().catch(a=>{console.error("[BOT] Error en Auto-Image:",a),window.__wplaceBot&&(window.__wplaceBot.imageRunning=!1),alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
