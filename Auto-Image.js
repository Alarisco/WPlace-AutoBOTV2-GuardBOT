/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T11:38:49.012Z */
(()=>{var p=(...l)=>console.log("[WPA-UI]",...l);var S={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",COOLDOWN_DEFAULT:31e3,TRANSPARENCY_THRESHOLD:100,WHITE_THRESHOLD:250,LOG_INTERVAL:10,TILE_SIZE:3e3,PIXELS_PER_BATCH:20,CHARGE_REGEN_MS:3e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",warning:"#ffaa00"}},m={es:{title:"WPlace Auto-Image",initBot:"Iniciar Auto-BOT",uploadImage:"Subir Imagen",resizeImage:"Redimensionar Imagen",selectPosition:"Seleccionar Posici\xF3n",startPainting:"Iniciar Pintura",stopPainting:"Detener Pintura",saveProgress:"Guardar Progreso",loadProgress:"Cargar Progreso",checkingColors:"\u{1F50D} Verificando colores disponibles...",noColorsFound:"\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",colorsFound:"\u2705 {count} colores disponibles encontrados",loadingImage:"\u{1F5BC}\uFE0F Cargando imagen...",imageLoaded:"\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",imageError:"\u274C Error al cargar la imagen",selectPositionAlert:"\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",waitingPosition:"\u{1F446} Esperando que pintes el p\xEDxel de referencia...",positionSet:"\u2705 \xA1Posici\xF3n establecida con \xE9xito!",positionTimeout:"\u274C Tiempo agotado para seleccionar posici\xF3n",startPaintingMsg:"\u{1F3A8} Iniciando pintura...",paintingProgress:"\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",noCharges:"\u231B Sin cargas. Esperando {time}...",paintingStopped:"\u23F9\uFE0F Pintura detenida por el usuario",paintingComplete:"\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",paintingError:"\u274C Error durante la pintura",missingRequirements:"\u274C Carga una imagen y selecciona una posici\xF3n primero",progress:"Progreso",pixels:"P\xEDxeles",charges:"Cargas",estimatedTime:"Tiempo estimado",initMessage:"Haz clic en 'Iniciar Auto-BOT' para comenzar",waitingInit:"Esperando inicializaci\xF3n...",resizeSuccess:"\u2705 Imagen redimensionada a {width}x{height}",paintingPaused:"\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",pixelsPerBatch:"P\xEDxeles por lote",cooldownWaiting:"\u23F3 Esperando {time} para continuar...",progressSaved:"\u2705 Progreso guardado como {filename}",progressLoaded:"\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",progressLoadError:"\u274C Error al cargar progreso: {error}",progressSaveError:"\u274C Error al guardar progreso: {error}",confirmSaveProgress:"\xBFDeseas guardar el progreso actual antes de detener?",saveProgressTitle:"Guardar Progreso",discardProgress:"Descartar",cancel:"Cancelar",minimize:"Minimizar",width:"Ancho",height:"Alto",keepAspect:"Mantener proporci\xF3n",apply:"Aplicar"}},e={running:!1,imageLoaded:!1,processing:!1,totalPixels:0,paintedPixels:0,availableColors:[],currentCharges:0,cooldown:S.COOLDOWN_DEFAULT,imageData:null,stopFlag:!1,colorsChecked:!1,startPosition:null,selectingPosition:!1,region:null,minimized:!1,lastPosition:{x:0,y:0},estimatedTime:0,language:"es",tileX:null,tileY:null,pixelsPerBatch:S.PIXELS_PER_BATCH,inCooldown:!1,cooldownEndTime:0,remainingPixels:[],lastChargeUpdate:0,chargeDecimalPart:0,originalImageName:null};var L=class{constructor(s){this.imageSrc=s,this.img=new window.Image,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.previewCanvas=document.createElement("canvas"),this.previewCtx=this.previewCanvas.getContext("2d")}async load(){return new Promise((s,o)=>{this.img.onload=()=>{this.canvas.width=this.img.width,this.canvas.height=this.img.height,this.ctx.drawImage(this.img,0,0),s()},this.img.onerror=o,this.img.src=this.imageSrc})}getPixelData(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}resize(s,o){let a=document.createElement("canvas");return a.width=s,a.height=o,a.getContext("2d").drawImage(this.img,0,0,s,o),this.canvas.width=s,this.canvas.height=o,this.ctx.drawImage(a,0,0),this.getPixelData()}generatePreview(s,o){return this.previewCanvas.width=s,this.previewCanvas.height=o,this.previewCtx.imageSmoothingEnabled=!1,this.previewCtx.drawImage(this.img,0,0,s,o),this.previewCanvas.toDataURL()}getImageData(){let{width:s,height:o}=this.getDimensions(),a=this.getPixelData();return{width:s,height:o,pixels:a,originalName:this.originalName||"image.png"}}processImage(s,o){let{width:a,height:t}=this.getDimensions(),i=this.getPixelData(),n=[],r=0;for(let d=0;d<t;d++)for(let g=0;g<a;g++){let c=(d*a+g)*4,u=i[c],h=i[c+1],x=i[c+2],C=i[c+3];if(C<o.TRANSPARENCY_THRESHOLD||u>o.WHITE_THRESHOLD&&h>o.WHITE_THRESHOLD&&x>o.WHITE_THRESHOLD)continue;let k=this.findClosestColor({r:u,g:h,b:x},s);k&&(n.push({x:g,y:d,originalColor:{r:u,g:h,b:x,alpha:C},targetColor:k}),r++)}return{width:a,height:t,pixels:n,validPixelCount:r,originalName:this.originalName||"image.png"}}findClosestColor(s,o){if(!o||o.length===0)return null;let a=null,t=1/0;for(let i of o){let n=Math.sqrt(Math.pow(s.r-i.r,2)+Math.pow(s.g-i.g,2)+Math.pow(s.b-i.b,2));n<t&&(t=n,a=i)}return a}};function M(){p("\u{1F3A8} Detectando colores disponibles...");let l=document.querySelectorAll('[id^="color-"]'),s=[];for(let o of l){if(o.querySelector("svg"))continue;let a=o.id.replace("color-",""),t=parseInt(a);if(t===0||t===5)continue;let i=o.style.backgroundColor;if(i){let n=i.match(/\d+/g);if(n&&n.length>=3){let r={r:parseInt(n[0]),g:parseInt(n[1]),b:parseInt(n[2])};s.push({id:t,element:o,...r}),p(`Color detectado: id=${t}, rgb(${r.r},${r.g},${r.b})`)}}}return p(`\u2705 ${s.length} colores disponibles detectados`),s}var B=l=>new Promise(s=>setTimeout(s,l));var Y="https://backend.wplace.live";async function q(){var l,s,o;try{let a=await fetch(`${Y}/me`,{credentials:"include"}).then(r=>r.json()),t=a||null,i=(a==null?void 0:a.charges)||{},n={count:(l=i.count)!=null?l:0,max:(s=i.max)!=null?s:0,cooldownMs:(o=i.cooldownMs)!=null?o:3e4};return{success:!0,data:{user:t,charges:n.count,maxCharges:n.max,chargeRegen:n.cooldownMs}}}catch(a){return{success:!1,error:a.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function _(l,s,o,a,t){try{let i=JSON.stringify({colors:a,coords:o,t}),n=await fetch(`${Y}/s0/pixel/${l}/${s}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:i}),r=null;try{r=await n.json()}catch{r={}}return{status:n.status,json:r,success:n.ok,painted:(r==null?void 0:r.painted)||0}}catch(i){return{status:0,json:{error:i.message},success:!1,painted:0}}}var N=!1;async function Z(){if(!(N||window.turnstile))return new Promise((l,s)=>{let o=document.createElement("script");o.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",o.async=!0,o.defer=!0,o.onload=()=>{N=!0,l()},o.onerror=()=>s(new Error("No se pudo cargar Turnstile")),document.head.appendChild(o)})}async function ee(l,s="paint"){var o;if(await Z(),typeof((o=window.turnstile)==null?void 0:o.execute)=="function")try{let a=await window.turnstile.execute(l,{action:s});if(a&&a.length>20)return a}catch{}return await new Promise(a=>{let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),window.turnstile.render(t,{sitekey:l,callback:i=>{document.body.removeChild(t),a(i)}})})}async function X(l){return ee(l,"paint")}async function O(l,s,o,a,t){let{width:i,height:n}=l,{x:r,y:d}=s;p(`Iniciando pintado: imagen(${i}x${n}) inicio LOCAL(${r},${d}) tile(${e.tileX},${e.tileY})`),(!e.remainingPixels||e.remainingPixels.length===0||e.lastPosition.x===0&&e.lastPosition.y===0)&&(p("Generando cola de p\xEDxeles..."),e.remainingPixels=ae(l,s,e.tileX,e.tileY),(e.lastPosition.x>0||e.lastPosition.y>0)&&(e.remainingPixels=e.remainingPixels.filter(g=>{let c=g.imageY*i+g.imageX,u=e.lastPosition.y*i+e.lastPosition.x;return c>=u})),p(`Cola generada: ${e.remainingPixels.length} p\xEDxeles pendientes`));try{for(;e.remainingPixels.length>0&&!e.stopFlag;){let g=Math.floor(e.currentCharges),c=Math.min(e.pixelsPerBatch,e.remainingPixels.length);if(g<c){p(`Cargas insuficientes: ${g}/${c} necesarias`),await ie(c-g,o);continue}let u=e.remainingPixels.splice(0,c);p(`Pintando lote de ${u.length} p\xEDxeles...`);let h=await te(u);if(h.success&&h.painted>0){if(e.paintedPixels+=h.painted,u.length>0){let x=u[u.length-1];e.lastPosition={x:x.imageX,y:x.imageY}}p(`Lote exitoso: ${h.painted}/${u.length} p\xEDxeles pintados. Total: ${e.paintedPixels}/${e.totalPixels}`),o&&o(e.paintedPixels,e.totalPixels)}else e.remainingPixels.unshift(...u),p("Lote fall\xF3: reintentando en 5 segundos..."),await B(5e3);await B(500)}e.stopFlag?(p(`Pintado pausado en p\xEDxel imagen(${e.lastPosition.x},${e.lastPosition.y})`),a&&a(!1,e.paintedPixels)):(p(`Pintado completado: ${e.paintedPixels} p\xEDxeles pintados`),e.lastPosition={x:0,y:0},e.remainingPixels=[],a&&a(!0,e.paintedPixels))}catch(g){p("Error en proceso de pintado:",g),t&&t(g)}}async function te(l){var s;try{if(!l||l.length===0)return{success:!1,painted:0,error:"Lote vac\xEDo"};let o=[],a=[],t=null,i=null;for(let d of l)o.push(d.localX,d.localY),a.push(d.color.id||d.color.value||1),t===null&&(t=d.tileX,i=d.tileY);let n=await X(S.SITEKEY),r=await _(t,i,o,a,n);return r.status===200?{success:!0,painted:r.painted,response:r.json}:{success:!1,painted:0,error:((s=r.json)==null?void 0:s.message)||`HTTP ${r.status}`,status:r.status}}catch(o){return p("Error en paintPixelBatch:",o),{success:!1,painted:0,error:o.message}}}async function ie(l,s){let o=S.CHARGE_REGEN_MS*l,a=Math.min(o,6e4);p(`Esperando ${Math.round(a/1e3)}s para obtener ${l} cargas`),s&&s(e.paintedPixels,e.totalPixels,`Esperando cargas (${Math.round(a/1e3)}s)`),await B(a),e.currentCharges=Math.min(50,e.currentCharges+a/S.CHARGE_REGEN_MS)}function ae(l,s,o,a){let{pixels:t}=l,{x:i,y:n}=s,r=[];for(let d of t){let g=i+d.x,c=n+d.y;r.push({imageX:d.x,imageY:d.y,localX:g,localY:c,tileX:o,tileY:a,color:d.targetColor,originalColor:d.originalColor})}return p(`Cola de p\xEDxeles generada: ${r.length} p\xEDxeles para pintar`),r}function T(){e.stopFlag=!0,e.running=!1,p("\u{1F6D1} Deteniendo proceso de pintado...")}function z(l=null){try{if(!e.imageData||e.paintedPixels===0)throw new Error("No hay progreso para guardar");let s={version:"1.0",timestamp:Date.now(),imageData:{width:e.imageData.width,height:e.imageData.height,originalName:e.originalImageName},progress:{paintedPixels:e.paintedPixels,totalPixels:e.totalPixels,lastPosition:{...e.lastPosition}},position:{startPosition:{...e.startPosition},tileX:e.tileX,tileY:e.tileY},config:{pixelsPerBatch:e.pixelsPerBatch},colors:e.availableColors.map(r=>({id:r.id,r:r.r,g:r.g,b:r.b})),remainingPixels:e.remainingPixels||[]},o=JSON.stringify(s,null,2),a=new window.Blob([o],{type:"application/json"}),t=l||`wplace_progress_${e.originalImageName||"image"}_${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,i=window.URL.createObjectURL(a),n=document.createElement("a");return n.href=i,n.download=t,document.body.appendChild(n),n.click(),document.body.removeChild(n),window.URL.revokeObjectURL(i),p(`\u2705 Progreso guardado: ${t}`),{success:!0,filename:t}}catch(s){return p("\u274C Error guardando progreso:",s),{success:!1,error:s.message}}}async function H(l){return new Promise(s=>{try{let o=new window.FileReader;o.onload=a=>{try{let t=JSON.parse(a.target.result),n=["imageData","progress","position","colors"].filter(r=>!(r in t));if(n.length>0)throw new Error(`Campos requeridos faltantes: ${n.join(", ")}`);if(e.availableColors.length>0){let r=t.colors.map(c=>c.id),d=e.availableColors.map(c=>c.id);r.filter(c=>d.includes(c)).length<r.length*.8&&p("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales")}e.imageData={...t.imageData,pixels:[]},e.paintedPixels=t.progress.paintedPixels,e.totalPixels=t.progress.totalPixels,t.progress.lastPosition?e.lastPosition=t.progress.lastPosition:t.position.lastX!==void 0&&t.position.lastY!==void 0&&(e.lastPosition={x:t.position.lastX,y:t.position.lastY}),t.position.startPosition?e.startPosition=t.position.startPosition:t.position.startX!==void 0&&t.position.startY!==void 0&&(e.startPosition={x:t.position.startX,y:t.position.startY}),e.tileX=t.position.tileX,e.tileY=t.position.tileY,e.originalImageName=t.imageData.originalName,e.remainingPixels=t.remainingPixels||t.progress.remainingPixels||[],t.config&&(e.pixelsPerBatch=t.config.pixelsPerBatch||e.pixelsPerBatch),e.imageLoaded=!0,e.colorsChecked=!0,p(`\u2705 Progreso cargado: ${e.paintedPixels}/${e.totalPixels} p\xEDxeles`),s({success:!0,data:t,painted:e.paintedPixels,total:e.totalPixels,canContinue:e.remainingPixels.length>0})}catch(t){p("\u274C Error parseando archivo de progreso:",t),s({success:!1,error:t.message})}},o.onerror=()=>{let a="Error leyendo archivo";p("\u274C",a),s({success:!1,error:a})},o.readAsText(l)}catch(o){p("\u274C Error cargando progreso:",o),s({success:!1,error:o.message})}})}function j(){e.paintedPixels=0,e.totalPixels=0,e.lastPosition={x:0,y:0},e.remainingPixels=[],e.imageData=null,e.startPosition=null,e.imageLoaded=!1,e.originalImageName=null,p("\u{1F9F9} Progreso limpiado")}function F(){return e.imageLoaded&&e.paintedPixels>0&&e.remainingPixels&&e.remainingPixels.length>0}function U(){return{hasProgress:F(),painted:e.paintedPixels,total:e.totalPixels,remaining:e.remainingPixels?e.remainingPixels.length:0,percentage:e.totalPixels>0?e.paintedPixels/e.totalPixels*100:0,lastPosition:{...e.lastPosition},canContinue:F()}}function W(l=null){let s=document.createElement("div");l&&(s.id=l),s.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let o=s.attachShadow({mode:"open"});return document.body.appendChild(s),{host:s,root:o}}function G(l,s){let o=0,a=0,t=0,i=0;l.style.cursor="move",l.addEventListener("mousedown",n);function n(g){g.target.closest(".header-btn, .wplace-header-btn")||(g.preventDefault(),t=g.clientX,i=g.clientY,document.addEventListener("mouseup",d),document.addEventListener("mousemove",r))}function r(g){g.preventDefault(),o=t-g.clientX,a=i-g.clientY,t=g.clientX,i=g.clientY,s.style.top=s.offsetTop-a+"px",s.style.left=s.offsetLeft-o+"px"}function d(){document.removeEventListener("mouseup",d),document.removeEventListener("mousemove",r)}}async function V({texts:l,...s}){if(p("\u{1F3A8} Creando interfaz de Auto-Image"),!document.querySelector('link[href*="font-awesome"]')){let f=document.createElement("link");f.rel="stylesheet",f.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",document.head.appendChild(f),p("\u{1F4E6} FontAwesome a\xF1adido al document.head")}let{host:o,root:a}=W(),t=document.createElement("style");t.textContent=`
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
  `,a.appendChild(t);let i=document.createElement("div");i.className="container",i.innerHTML=`
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
  `,a.appendChild(i);let n=document.createElement("input");n.type="file",n.accept="image/png,image/jpeg",n.style.display="none",a.appendChild(n);let r=document.createElement("input");r.type="file",r.accept=".json",r.style.display="none",a.appendChild(r);let d=document.createElement("div");d.className="resize-overlay",a.appendChild(d);let g=document.createElement("div");g.className="resize-container",g.innerHTML=`
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
  `,a.appendChild(g);let c={header:i.querySelector(".header"),configBtn:i.querySelector(".config-btn"),minimizeBtn:i.querySelector(".minimize-btn"),configPanel:i.querySelector(".config-panel"),pixelsPerBatch:i.querySelector(".pixels-per-batch"),initBtn:i.querySelector(".init-btn"),uploadBtn:i.querySelector(".upload-btn"),loadProgressBtn:i.querySelector(".load-progress-btn"),resizeBtn:i.querySelector(".resize-btn"),selectPosBtn:i.querySelector(".select-pos-btn"),startBtn:i.querySelector(".start-btn"),stopBtn:i.querySelector(".stop-btn"),progressBar:i.querySelector(".progress-bar"),statsArea:i.querySelector(".stats-area"),status:i.querySelector(".status"),content:i.querySelector(".content")},u={overlay:d,container:g,widthSlider:g.querySelector(".width-slider"),heightSlider:g.querySelector(".height-slider"),widthValue:g.querySelector(".width-value"),heightValue:g.querySelector(".height-value"),keepAspect:g.querySelector(".keep-aspect"),preview:g.querySelector(".resize-preview"),confirmBtn:g.querySelector(".confirm-resize"),cancelBtn:g.querySelector(".cancel-resize")},h={minimized:!1,configVisible:!1};G(c.header,i),c.minimizeBtn.addEventListener("click",()=>{h.minimized=!h.minimized,h.minimized?(i.classList.add("minimized"),c.minimizeBtn.innerHTML="\u{1F53C}"):(i.classList.remove("minimized"),c.minimizeBtn.innerHTML="\u{1F53D}")}),c.configBtn.addEventListener("click",()=>{h.configVisible=!h.configVisible,h.configVisible?(c.configPanel.classList.add("visible"),c.configBtn.innerHTML="\u274C"):(c.configPanel.classList.remove("visible"),c.configBtn.innerHTML="\u2699\uFE0F")}),c.initBtn.addEventListener("click",async()=>{c.initBtn.disabled=!0,s.onInitBot&&await s.onInitBot()&&(c.uploadBtn.disabled=!1,c.loadProgressBtn.disabled=!1),c.initBtn.disabled=!1}),c.uploadBtn.addEventListener("click",()=>{n.click()}),n.addEventListener("change",async()=>{n.files.length>0&&s.onUploadImage&&await s.onUploadImage(n.files[0])&&(c.selectPosBtn.disabled=!1,c.resizeBtn.disabled=!1)}),c.loadProgressBtn.addEventListener("click",()=>{r.click()}),r.addEventListener("change",async()=>{r.files.length>0&&s.onLoadProgress&&await s.onLoadProgress(r.files[0])&&(c.selectPosBtn.disabled=!1,c.startBtn.disabled=!1,c.resizeBtn.disabled=!1)}),c.resizeBtn.addEventListener("click",()=>{s.onResizeImage&&s.onResizeImage()}),c.selectPosBtn.addEventListener("click",async()=>{s.onSelectPosition&&(c.selectPosBtn.disabled=!0,await s.onSelectPosition()&&(c.startBtn.disabled=!1),c.selectPosBtn.disabled=!1)}),c.startBtn.addEventListener("click",async()=>{s.onStartPainting&&(c.startBtn.disabled=!0,c.stopBtn.disabled=!1,await s.onStartPainting()||(c.startBtn.disabled=!1,c.stopBtn.disabled=!0))}),c.stopBtn.addEventListener("click",async()=>{s.onStopPainting&&await s.onStopPainting()&&(c.startBtn.disabled=!1,c.stopBtn.disabled=!0)});function x(f,w="default"){c.status.textContent=f,c.status.className=`status status-${w}`,c.status.style.animation="none",c.status.offsetWidth,c.status.style.animation="slideIn 0.3s ease-out"}function C(f){let{width:w,height:b}=f.getDimensions(),E=w/b;u.widthSlider.value=w,u.heightSlider.value=b,u.widthValue.textContent=w,u.heightValue.textContent=b,u.preview.src=f.img.src,u.overlay.style.display="block",u.container.style.display="block";let y=()=>{let P=parseInt(u.widthSlider.value),v=parseInt(u.heightSlider.value);u.widthValue.textContent=P,u.heightValue.textContent=v,u.preview.src=f.generatePreview(P,v)},D=()=>{if(u.keepAspect.checked){let P=parseInt(u.widthSlider.value),v=Math.round(P/E);u.heightSlider.value=v}y()},A=()=>{if(u.keepAspect.checked){let P=parseInt(u.heightSlider.value),v=Math.round(P*E);u.widthSlider.value=v}y()};u.widthSlider.addEventListener("input",D),u.heightSlider.addEventListener("input",A);let R=()=>{let P=parseInt(u.widthSlider.value),v=parseInt(u.heightSlider.value);s.onConfirmResize&&s.onConfirmResize(f,P,v),I()},$=()=>{I()};u.confirmBtn.addEventListener("click",R),u.cancelBtn.addEventListener("click",$),u.overlay.addEventListener("click",$),window.cleanupResizeDialog=()=>{u.widthSlider.removeEventListener("input",D),u.heightSlider.removeEventListener("input",A),u.confirmBtn.removeEventListener("click",R),u.cancelBtn.removeEventListener("click",$),u.overlay.removeEventListener("click",$)},y()}function I(){u.overlay.style.display="none",u.container.style.display="none",window.cleanupResizeDialog&&(window.cleanupResizeDialog(),delete window.cleanupResizeDialog)}function k(f,w,b=null){let E=w>0?f/w*100:0;c.progressBar.style.width=`${E}%`;let y=`
      <div class="stat-item">
        <div class="stat-label">\u{1F3A8} ${l.progress}</div>
        <div>${f}/${w} (${E.toFixed(1)}%)</div>
      </div>
    `;b&&(b.username&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F464} Usuario</div>
            <div>${b.username}</div>
          </div>
        `),b.charges!==void 0&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u26A1 ${l.charges}</div>
            <div>${Math.floor(b.charges)}</div>
          </div>
        `),b.pixels!==void 0&&(y+=`
          <div class="stat-item">
            <div class="stat-label">\u{1F533} ${l.pixels}</div>
            <div>${b.pixels.toLocaleString()}</div>
          </div>
        `)),c.statsArea.innerHTML=y}function Q(){o.remove()}return p("\u2705 Interfaz de Auto-Image creada"),{setStatus:x,updateProgress:k,showResizeDialog:C,closeResizeDialog:I,destroy:Q}}function J(l,s,o={}){return new Promise(a=>{let t=document.createElement("div");t.className="modal-overlay",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.background="rgba(0,0,0,0.7)",t.style.zIndex="10001",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center";let i=document.createElement("div");i.style.background="#1a1a1a",i.style.border="2px solid #333",i.style.borderRadius="15px",i.style.padding="25px",i.style.color="#eee",i.style.minWidth="350px",i.style.maxWidth="400px",i.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)",i.style.fontFamily="'Segoe UI', Roboto, sans-serif",i.innerHTML=`
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${s}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${l}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${o.save?`<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${o.save}</button>`:""}
        ${o.discard?`<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${o.discard}</button>`:""}
        ${o.cancel?`<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${o.cancel}</button>`:""}
      </div>
    `,t.appendChild(i),document.body.appendChild(t);let n=i.querySelector(".save-btn"),r=i.querySelector(".discard-btn"),d=i.querySelector(".cancel-btn"),g=()=>{document.body.removeChild(t)};n&&n.addEventListener("click",()=>{g(),a("save")}),r&&r.addEventListener("click",()=>{g(),a("discard")}),d&&d.addEventListener("click",()=>{g(),a("cancel")}),t.addEventListener("click",c=>{c.target===t&&(g(),a("cancel"))})})}async function K(){var s;if(p("\u{1F680} Iniciando WPlace Auto-Image (versi\xF3n modular)"),(s=window.__wplaceBot)!=null&&s.imageRunning){alert("Auto-Image ya est\xE1 ejecut\xE1ndose.");return}window.__wplaceBot={...window.__wplaceBot,imageRunning:!0};let l=null;try{let o={...S},a=ne();if(e.language=a,!o.SITEKEY){let i=document.querySelector("*[data-sitekey]");i?(o.SITEKEY=i.getAttribute("data-sitekey"),p(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${o.SITEKEY.substring(0,20)}...`)):p("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}let t=await V({texts:m[a],onInitBot:async()=>{p("\u{1F916} Inicializando Auto-Image..."),t.setStatus(m[a].checkingColors,"info");let i=M();if(i.length===0)return t.setStatus(m[a].noColorsFound,"error"),!1;let n=await q(),r=null;return n.success&&n.data.user?(r={username:n.data.user.name||"An\xF3nimo",charges:n.data.charges,maxCharges:n.data.maxCharges,pixels:n.data.user.pixelsPainted||0},l=r,e.currentCharges=n.data.charges,p(`\u{1F464} Usuario conectado: ${n.data.user.name||"An\xF3nimo"} - Cargas: ${r.charges}/${r.maxCharges} - P\xEDxeles: ${r.pixels}`)):p("\u26A0\uFE0F No se pudo obtener informaci\xF3n del usuario"),e.availableColors=i,e.colorsChecked=!0,t.setStatus(m[a].colorsFound.replace("{count}",i.length),"success"),t.updateProgress(0,0,r),p(`\u2705 ${i.length} colores disponibles detectados`),!0},onUploadImage:async i=>{try{t.setStatus(m[a].loadingImage,"info");let n=window.URL.createObjectURL(i),r=new L(n);r.originalName=i.name,await r.load();let d=r.processImage(e.availableColors,o);return e.imageData=d,e.imageData.processor=r,e.totalPixels=d.validPixelCount,e.paintedPixels=0,e.originalImageName=i.name,e.imageLoaded=!0,t.setStatus(m[a].imageLoaded.replace("{count}",d.validPixelCount),"success"),t.updateProgress(0,d.validPixelCount,l),p(`\u2705 Imagen cargada: ${d.width}x${d.height}, ${d.validPixelCount} p\xEDxeles v\xE1lidos`),window.URL.revokeObjectURL(n),!0}catch(n){return t.setStatus(m[a].imageError,"error"),p("\u274C Error cargando imagen:",n),!1}},onSelectPosition:async()=>new Promise(i=>{t.setStatus(m[a].selectPositionAlert,"info"),t.setStatus(m[a].waitingPosition,"info"),e.selectingPosition=!0;let n=window.fetch;window.fetch=async(r,d)=>{if(e.selectingPosition&&r.includes("/s0/paint"))try{let g=await n(r,d);if(g.ok&&d.body){let c=JSON.parse(d.body);if(c.coords&&c.coords.length>=2){let u=c.coords[0],h=c.coords[1],x=r.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);x&&(e.tileX=parseInt(x[1]),e.tileY=parseInt(x[2])),e.startPosition={x:u,y:h},e.selectingPosition=!1,window.fetch=n,t.setStatus(m[a].positionSet,"success"),p(`\u2705 Posici\xF3n establecida: tile(${e.tileX},${e.tileY}) local(${u},${h})`),i(!0)}}return g}catch(g){return p("Error interceptando pixel:",g),n(r,d)}return n(r,d)},setTimeout(()=>{e.selectingPosition&&(window.fetch=n,e.selectingPosition=!1,t.setStatus(m[a].positionTimeout,"error"),i(!1))},12e4)}),onStartPainting:async()=>{var i;if(p("\u{1F50D} Estado para iniciar pintura:",{imageLoaded:e.imageLoaded,startPosition:e.startPosition,tileX:e.tileX,tileY:e.tileY,totalPixels:e.totalPixels,remainingPixels:((i=e.remainingPixels)==null?void 0:i.length)||0}),!e.imageLoaded||!e.startPosition)return t.setStatus(m[a].missingRequirements,"error"),p(`\u274C Validaci\xF3n fallida: imageLoaded=${e.imageLoaded}, startPosition=${!!e.startPosition}`),!1;e.running=!0,e.stopFlag=!1,t.setStatus(m[a].startPaintingMsg,"success");try{return await O(e.imageData,e.startPosition,(n,r,d)=>{l&&(l.charges=Math.floor(e.currentCharges)),t.updateProgress(n,r,l),d?t.setStatus(d,"info"):t.setStatus(m[a].paintingProgress.replace("{painted}",n).replace("{total}",r),"info")},(n,r)=>{n?(t.setStatus(m[a].paintingComplete.replace("{count}",r),"success"),j()):t.setStatus(m[a].paintingStopped,"warning"),e.running=!1},n=>{t.setStatus(m[a].paintingError,"error"),p("\u274C Error en proceso de pintado:",n),e.running=!1}),!0}catch(n){return t.setStatus(m[a].paintingError,"error"),p("\u274C Error iniciando pintado:",n),e.running=!1,!1}},onStopPainting:async()=>{if(U().hasProgress){let n=await J(m[a].confirmSaveProgress,m[a].saveProgressTitle,{save:m[a].saveProgress,discard:m[a].discardProgress,cancel:m[a].cancel});if(n==="save"){let r=z();r.success?t.setStatus(m[a].progressSaved.replace("{filename}",r.filename),"success"):t.setStatus(m[a].progressSaveError.replace("{error}",r.error),"error")}else if(n==="cancel")return!1}return T(),t.setStatus(m[a].paintingStopped,"warning"),!0},onSaveProgress:async()=>{let i=z();return i.success?t.setStatus(m[a].progressSaved.replace("{filename}",i.filename),"success"):t.setStatus(m[a].progressSaveError.replace("{error}",i.error),"error"),i.success},onLoadProgress:async i=>{try{let n=await H(i);return n.success?(t.setStatus(m[a].progressLoaded.replace("{painted}",n.painted).replace("{total}",n.total),"success"),t.updateProgress(n.painted,n.total,l),p("\u2705 Progreso cargado - habilitando botones de inicio"),!0):(t.setStatus(m[a].progressLoadError.replace("{error}",n.error),"error"),!1)}catch(n){return t.setStatus(m[a].progressLoadError.replace("{error}",n.message),"error"),!1}},onResizeImage:()=>{e.imageLoaded&&e.imageData&&e.imageData.processor&&t.showResizeDialog(e.imageData.processor)},onConfirmResize:(i,n,r)=>{p(`\u{1F504} Redimensionando imagen de ${i.getDimensions().width}x${i.getDimensions().height} a ${n}x${r}`);try{i.resize(n,r);let d=i.processImage(e.availableColors,o);e.imageData=d,e.totalPixels=d.validPixelCount,e.paintedPixels=0,e.remainingPixels=[],e.lastPosition={x:0,y:0},t.updateProgress(0,d.validPixelCount,l),t.setStatus(m[a].resizeSuccess.replace("{width}",n).replace("{height}",r),"success"),p(`\u2705 Imagen redimensionada: ${d.validPixelCount} p\xEDxeles v\xE1lidos`)}catch(d){p(`\u274C Error redimensionando imagen: ${d.message}`),t.setStatus(m[a].imageError,"error")}}});window.addEventListener("beforeunload",()=>{T(),t.destroy(),window.__wplaceBot.imageRunning=!1}),p("\u2705 Auto-Image inicializado correctamente")}catch(o){throw p("\u274C Error inicializando Auto-Image:",o),window.__wplaceBot.imageRunning=!1,o}}function ne(){return(window.navigator.language||window.navigator.userLanguage||"es").startsWith("es"),"es"}(()=>{"use strict";var l;if((l=window.__wplaceBot)!=null&&l.running){alert("WPlace BOT ya est\xE1 corriendo.");return}window.__wplaceBot={running:!0},K().catch(s=>{console.error("[BOT] Error en Auto-Image:",s),window.__wplaceBot.running=!1,alert("Auto-Image: error inesperado. Revisa consola.")})})();})();
