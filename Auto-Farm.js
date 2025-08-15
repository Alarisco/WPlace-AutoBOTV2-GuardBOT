/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T10:32:02.801Z */
(()=>{var d=(...e)=>console.log("[WPA-UI]",...e);var b={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",TILE_X:1086,TILE_Y:1565,TILE_SIZE:3e3,DELAY_MS:15e3,MIN_CHARGES:10,CHARGE_REGEN_MS:3e4,PIXELS_PER_BATCH:20,COLOR_MIN:1,COLOR_MAX:32,COLOR_MODE:"random",COLOR_FIXED:1,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",running:"#00cc00"}},g={running:!1,painted:0,last:null,charges:{count:0,max:0,cooldownMs:3e4},user:null,panel:null,captureMode:!1,originalFetch:window.fetch,retryCount:0,inCooldown:!1,nextPaintTime:0,cooldownEndTime:0,health:null};function _(e){try{localStorage.setItem("WPA_UI_CFG",JSON.stringify(e))}catch{}}function k(e){try{let o=localStorage.getItem("WPA_UI_CFG");if(o){let a={...e,...JSON.parse(o)};return!Number.isFinite(a.TILE_X)||!Number.isFinite(a.TILE_Y)?(console.log("[WPA-UI]",`Configuraci\xF3n corrupta detectada: coordenadas (${a.TILE_X},${a.TILE_Y}) inv\xE1lidas`),O(),{...e}):a}}catch{}return{...e}}function O(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n del farm reseteada")}catch{}}function N(e,o){let a=e.TILE_X===o.TILE_X&&e.TILE_Y===o.TILE_Y,t=!localStorage.getItem("WPA_UI_CFG"),s=!Number.isFinite(e.TILE_X)||!Number.isFinite(e.TILE_Y),n=a||t||s;return console.log("[WPA-UI]",`Verificaci\xF3n calibraci\xF3n: defaults=${a}, noConfig=${t}, invalid=${s}, coords=(${e.TILE_X},${e.TILE_Y})`),n}var R="https://backend.wplace.live";async function X(){var e,o,a;try{let t=await fetch(`${R}/me`,{credentials:"include"}).then(c=>c.json()),s=t||null,n=(t==null?void 0:t.charges)||{},u={count:(e=n.count)!=null?e:0,max:(o=n.max)!=null?o:0,cooldownMs:(a=n.cooldownMs)!=null?a:3e4};return{success:!0,data:{user:s,charges:u.count,maxCharges:u.max,chargeRegen:u.cooldownMs}}}catch(t){return{success:!1,error:t.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function H(){try{let e=await fetch(`${R}/health`,{method:"GET",credentials:"include"});return e.ok?{...await e.json(),lastCheck:Date.now(),status:"online"}:{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"error",statusCode:e.status}}catch(e){return{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"offline",error:e.message}}}async function j(e,o,a){try{let t=await fetch(`${R}/s0/paint`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({coords:e,colors:o,t:a})}),s=await t.json().catch(()=>({}));return{status:t.status,json:s,success:t.ok}}catch(t){return{status:0,json:{error:t.message},success:!1}}}function U(e,o,a,t){var C,T,w,y,E,M,$,B,Y,D;let s=document.createElement("div");s.id="wplace-farm-ui",s.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let n=s.attachShadow({mode:"open"}),u=document.createElement("style");u.textContent=`
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
    }
    
    .wplace-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
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
    }
    
    .wplace-button:hover {
      background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
      transform: translateY(-1px);
    }
    
    .wplace-button:active {
      transform: translateY(0);
    }
    
    .wplace-button.start {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    }
    
    .wplace-button.start:hover {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
    }
    
    .wplace-button.stop {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    }
    
    .wplace-button.stop:hover {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
    }
    
    .wplace-button.calibrate {
      background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
    }
    
    .wplace-button.calibrate:hover {
      background: linear-gradient(135deg, #dd6b20 0%, #c05621 100%);
    }
    
    .wplace-status {
      background: rgba(0,0,0,0.3);
      border-radius: 6px;
      padding: 8px;
      margin: 8px 0;
      font-size: 12px;
      min-height: 20px;
      word-wrap: break-word;
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
      grid-template-columns: 1fr 1fr;
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
    }
    
    .wplace-color-dot {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      border: 1px solid rgba(255,255,255,0.3);
    }
  `,n.appendChild(u);let c=document.createElement("div");c.className="wplace-container";let i={minimized:!1,showAdvanced:!1};c.innerHTML=`
    <div class="wplace-header">
      <div class="wplace-title">
        \u{1F916} WPlace Farm Bot
      </div>
      <button class="wplace-minimize">\u2212</button>
    </div>
    
    <div class="wplace-content">
      <!-- Estado y controles principales -->
      <div class="wplace-section">
        <div class="wplace-status" id="status">\u{1F4A4} Bot detenido</div>
        
        <div class="wplace-stats">
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="painted-count">0</div>
            <div class="wplace-stat-label">Pintados</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="charges-count">0</div>
            <div class="wplace-stat-label">Cargas</div>
          </div>
        </div>
        
        <div class="wplace-buttons">
          <button class="wplace-button start" id="start-btn">\u25B6\uFE0F Iniciar</button>
          <button class="wplace-button stop" id="stop-btn" disabled>\u23F9\uFE0F Detener</button>
          <button class="wplace-button calibrate" id="calibrate-btn">\u{1F3AF} Calibrar</button>
        </div>
      </div>
      
      <!-- Configuraci\xF3n b\xE1sica -->
      <div class="wplace-section">
        <div class="wplace-section-title">\u2699\uFE0F Configuraci\xF3n</div>
        
        <div class="wplace-row">
          <span class="wplace-label">Tema:</span>
          <select class="wplace-select" id="theme-select">
            <option value="random">\u{1F3B2} Aleatorio</option>
            <option value="ukraine">\u{1F1FA}\u{1F1E6} Ucrania</option>
            <option value="spain">\u{1F1EA}\u{1F1F8} Espa\xF1a</option>
            <option value="catalonia">\u{1F3F4}\u{E0065}\u{E0073}\u{E0063}\u{E0074}\u{E007F} Catalu\xF1a</option>
            <option value="usa">\u{1F1FA}\u{1F1F8} USA</option>
            <option value="trans">\u{1F3F3}\uFE0F\u200D\u26A7\uFE0F Trans</option>
            <option value="rainbow">\u{1F308} Arco\xEDris</option>
            <option value="custom">\u{1F3A8} Personalizado</option>
          </select>
        </div>
        
        <div class="wplace-theme-preview" id="theme-preview"></div>
        
        <div class="wplace-row">
          <span class="wplace-label">Delay (ms):</span>
          <input type="number" class="wplace-input" id="delay-input" min="1000" max="300000" step="1000">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">P\xEDxeles/lote:</span>
          <input type="number" class="wplace-input" id="pixels-input" min="1" max="50">
        </div>
        
        <div class="wplace-row">
          <span class="wplace-label">Cargas m\xEDn:</span>
          <input type="number" class="wplace-input" id="min-charges-input" min="0" max="50" step="0.1">
        </div>
      </div>
      
      <!-- Configuraci\xF3n avanzada (colapsable) -->
      <div class="wplace-section">
        <div class="wplace-section-title" style="cursor: pointer;" id="advanced-toggle">
          \u{1F527} Avanzado <span id="advanced-arrow">\u25B6</span>
        </div>
        
        <div class="wplace-advanced" id="advanced-section" style="display: none;">
          <div class="wplace-row">
            <span class="wplace-label">Tile X:</span>
            <input type="number" class="wplace-input" id="tile-x-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">Tile Y:</span>
            <input type="number" class="wplace-input" id="tile-y-input">
          </div>
          
          <div class="wplace-row">
            <span class="wplace-label">Paleta personalizada:</span>
          </div>
          <div class="wplace-row">
            <input type="text" class="wplace-input" id="custom-palette-input" 
                   placeholder="ej: #FF0000,#00FF00,#0000FF" style="width: 100%;">
          </div>
          
          <div class="wplace-buttons">
            <button class="wplace-button" id="save-btn">\u{1F4BE} Guardar</button>
            <button class="wplace-button" id="load-btn">\u{1F4C1} Cargar</button>
            <button class="wplace-button" id="reset-btn">\u{1F504} Reset</button>
          </div>
        </div>
      </div>
    </div>
  `,n.appendChild(c),document.body.appendChild(s);let r={minimizeBtn:n.getElementById("minimize-btn")||n.querySelector(".wplace-minimize"),content:n.querySelector(".wplace-content"),status:n.getElementById("status"),paintedCount:n.getElementById("painted-count"),chargesCount:n.getElementById("charges-count"),startBtn:n.getElementById("start-btn"),stopBtn:n.getElementById("stop-btn"),calibrateBtn:n.getElementById("calibrate-btn"),themeSelect:n.getElementById("theme-select"),themePreview:n.getElementById("theme-preview"),delayInput:n.getElementById("delay-input"),pixelsInput:n.getElementById("pixels-input"),minChargesInput:n.getElementById("min-charges-input"),advancedToggle:n.getElementById("advanced-toggle"),advancedSection:n.getElementById("advanced-section"),advancedArrow:n.getElementById("advanced-arrow"),tileXInput:n.getElementById("tile-x-input"),tileYInput:n.getElementById("tile-y-input"),customPaletteInput:n.getElementById("custom-palette-input"),saveBtn:n.getElementById("save-btn"),loadBtn:n.getElementById("load-btn"),resetBtn:n.getElementById("reset-btn")};function p(){let m=r.themeSelect.value,h=r.themePreview;h.innerHTML="";let f=[];switch(m){case"ukraine":f=["#0057B7","#FFD700"];break;case"spain":f=["#AA151B","#F1BF00","#AA151B"];break;case"catalonia":f=["#FCDD09","#DA020E","#FCDD09","#DA020E"];break;case"usa":f=["#B22234","#FFFFFF","#3C3B6E"];break;case"trans":f=["#5BCEFA","#F5A9B8","#FFFFFF","#F5A9B8","#5BCEFA"];break;case"rainbow":f=["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#9400D3"];break;case"custom":let F=r.customPaletteInput.value;f=F?F.split(",").map(I=>I.trim()):["#CCCCCC"];break;default:f=["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF"]}f.forEach(F=>{let I=document.createElement("div");I.className="wplace-color-dot",I.style.backgroundColor=F,I.title=F,h.appendChild(I)})}function x(){r.themeSelect.value=e.THEME,r.delayInput.value=e.DELAY_MS,r.pixelsInput.value=e.PIXELS_PER_BATCH,r.minChargesInput.value=e.MIN_CHARGES,r.tileXInput.value=e.TILE_X||"",r.tileYInput.value=e.TILE_Y||"",r.customPaletteInput.value=e.CUSTOM_PALETTE.join(","),p()}function v(){if(e.THEME=r.themeSelect.value,e.DELAY_MS=parseInt(r.delayInput.value)||b.DELAY_MS,e.PIXELS_PER_BATCH=parseInt(r.pixelsInput.value)||b.PIXELS_PER_BATCH,e.MIN_CHARGES=parseFloat(r.minChargesInput.value)||b.MIN_CHARGES,e.TILE_X=parseInt(r.tileXInput.value)||e.TILE_X,e.TILE_Y=parseInt(r.tileYInput.value)||e.TILE_Y,e.THEME==="custom"){let m=r.customPaletteInput.value;e.CUSTOM_PALETTE=m?m.split(",").map(h=>h.trim()):b.CUSTOM_PALETTE}}(C=r.minimizeBtn)==null||C.addEventListener("click",()=>{i.minimized=!i.minimized,r.content.classList.toggle("minimized",i.minimized),r.minimizeBtn.textContent=i.minimized?"+":"\u2212"}),(T=r.startBtn)==null||T.addEventListener("click",()=>{v(),o(),r.startBtn.disabled=!0,r.stopBtn.disabled=!1}),(w=r.stopBtn)==null||w.addEventListener("click",()=>{a(),r.startBtn.disabled=!1,r.stopBtn.disabled=!0}),(y=r.calibrateBtn)==null||y.addEventListener("click",()=>{t()}),(E=r.themeSelect)==null||E.addEventListener("change",()=>{p(),v()}),(M=r.customPaletteInput)==null||M.addEventListener("input",()=>{r.themeSelect.value==="custom"&&(p(),v())}),($=r.advancedToggle)==null||$.addEventListener("click",()=>{i.showAdvanced=!i.showAdvanced,r.advancedSection.style.display=i.showAdvanced?"block":"none",r.advancedArrow.textContent=i.showAdvanced?"\u25BC":"\u25B6"}),["delayInput","pixelsInput","minChargesInput","tileXInput","tileYInput"].forEach(m=>{var h;(h=r[m])==null||h.addEventListener("change",v)}),(B=r.saveBtn)==null||B.addEventListener("click",()=>{v(),_(e),l("\u{1F4BE} Configuraci\xF3n guardada","success")}),(Y=r.loadBtn)==null||Y.addEventListener("click",()=>{let m=k(b);Object.assign(e,m),x(),l("\u{1F4C1} Configuraci\xF3n cargada","success")}),(D=r.resetBtn)==null||D.addEventListener("click",()=>{O(),Object.assign(e,b),x(),l("\u{1F504} Configuraci\xF3n reiniciada","success")});function l(m,h="status"){r.status&&(r.status.textContent=m,r.status.className=`wplace-status ${h}`,d(`Status: ${m}`))}function L(m,h){r.paintedCount&&(r.paintedCount.textContent=m||0),r.chargesCount&&(r.chargesCount.textContent=typeof h=="number"?h.toFixed(1):"0")}function S(){c.style.boxShadow="0 0 20px #48bb78",setTimeout(()=>{c.style.boxShadow="0 10px 25px rgba(0,0,0,0.3)"},200)}return x(),{setStatus:l,updateStats:L,flashEffect:S,destroy:()=>{document.body.removeChild(s)},updateConfig:x,getElement:()=>s}}async function z(e){try{d("\u{1F3AF} Iniciando auto-calibraci\xF3n del tile...");let o=new URLSearchParams(window.location.search),a=window.location.hash,t,s;if(o.has("x")&&o.has("y")&&(t=parseInt(o.get("x")),s=parseInt(o.get("y"))),!t&&!s&&a){let n=a.match(/#(-?\d+),(-?\d+)/);n&&(t=parseInt(n[1]),s=parseInt(n[2]))}if(!t&&!s){let n=document.querySelectorAll("[data-x], [data-y], .coordinates, .position");for(let u of n){let c=u.getAttribute("data-x")||u.getAttribute("x"),i=u.getAttribute("data-y")||u.getAttribute("y");if(c&&i){t=parseInt(c),s=parseInt(i);break}}}if(!t&&!s){let u=(document.body.textContent||"").match(/(?:tile|pos|position)?\s*[(\[]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);u&&(t=parseInt(u[1]),s=parseInt(u[2]))}return(!Number.isFinite(t)||!Number.isFinite(s))&&(t=0,s=0,d("\u26A0\uFE0F No se pudieron detectar coordenadas autom\xE1ticamente, usando (0,0)")),(Math.abs(t)>1e6||Math.abs(s)>1e6)&&(d("\u26A0\uFE0F Coordenadas detectadas parecen incorrectas, limitando a rango v\xE1lido"),t=Math.max(-1e6,Math.min(1e6,t)),s=Math.max(-1e6,Math.min(1e6,s))),e.TILE_X=t,e.TILE_Y=s,d(`\u2705 Tile calibrado autom\xE1ticamente: (${t}, ${s})`),_(e),{tileX:t,tileY:s,success:!0}}catch(o){return d("\u274C Error en auto-calibraci\xF3n:",o),{tileX:0,tileY:0,success:!1,error:o.message}}}var G=!1;async function Z(){if(!(G||window.turnstile))return new Promise((e,o)=>{let a=document.createElement("script");a.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",a.async=!0,a.defer=!0,a.onload=()=>{G=!0,e()},a.onerror=()=>o(new Error("No se pudo cargar Turnstile")),document.head.appendChild(a)})}async function Q(e,o="paint"){var a;if(await Z(),typeof((a=window.turnstile)==null?void 0:a.execute)=="function")try{let t=await window.turnstile.execute(e,{action:o});if(t&&t.length>20)return t}catch{}return await new Promise(t=>{let s=document.createElement("div");s.style.position="fixed",s.style.left="-9999px",document.body.appendChild(s),window.turnstile.render(s,{sitekey:e,callback:n=>{document.body.removeChild(s),t(n)}})})}async function W(e){return Q(e,"paint")}var P=e=>new Promise(o=>setTimeout(o,e));var q=e=>Math.floor(Math.random()*e);async function A(e,o){let t=Date.now()+e;for(;Date.now()<t;){let s=t-Date.now();o&&o(s),await P(Math.min(1e3,s))}}function ee(e){let o=Math.floor(e.TILE_SIZE*.05),a=e.TILE_SIZE-o*2;if(a<=0)return d("Error: \xE1rea segura inv\xE1lida, usando coordenadas b\xE1sicas"),[Math.floor(Math.random()*e.TILE_SIZE),Math.floor(Math.random()*e.TILE_SIZE)];let t=o+Math.floor(Math.random()*a),s=o+Math.floor(Math.random()*a);return Math.random()<.1&&d(`Coordenadas locales generadas: (${t},${s}) en \xE1rea segura [${o}-${o+a-1}]`),[t,s]}function J(e,o){let a=[];for(let t=0;t<e;t++)a.push(ee(o));return a}function V(e,o){let a=[];for(let t=0;t<e;t++)a.push(te(o));return a}function te(e){return e.COLOR_MODE==="fixed"?e.COLOR_FIXED:e.COLOR_MIN+q(e.COLOR_MAX-e.COLOR_MIN+1)}async function ae(e,o,a){try{let t=document.querySelectorAll("canvas");for(let s of t){let n=s.getContext("2d");if(n){let u=typeof a=="number"?`#${a.toString(16).padStart(6,"0")}`:a;n.fillStyle=u,n.fillRect(e,o,1,1),s.dispatchEvent(new Event("pixel-updated"))}}}catch(t){d("Error actualizando canvas:",t)}}async function ne(e,o){try{let a=`[data-tile="${e}-${o}"], .tile-${e}-${o}, [data-tile-x="${e}"][data-tile-y="${o}"]`,t=document.querySelector(a);t?(t.classList.add("tile-updating"),setTimeout(()=>{t.classList.remove("tile-updating"),t.classList.add("tile-updated"),setTimeout(()=>t.classList.remove("tile-updated"),1e3)},100),d(`Tile (${e},${o}) actualizado visualmente`)):(document.querySelectorAll("canvas").forEach(n=>{let u=n.getContext("2d");if(u){let c=u.getImageData(0,0,1,1);u.putImageData(c,0,0)}}),d(`Actualizaci\xF3n visual gen\xE9rica realizada para tile (${e},${o})`))}catch(a){d("Error en actualizaci\xF3n visual del tile:",a)}}async function oe(e,o,a,t,s){var L,S,C,T;if(!Number.isFinite(e.TILE_X)||!Number.isFinite(e.TILE_Y))return a(`\u{1F6AB} Coordenadas del tile inv\xE1lidas (${e.TILE_X},${e.TILE_Y}). Calibra primero`,"error"),d("Pintado cancelado: coordenadas del tile inv\xE1lidas"),!1;let n=Math.floor(o.charges.count);if(n<1)return a("\u{1F50B} Sin cargas disponibles. Esperando...","error"),!1;let u=Math.min(n,e.PIXELS_PER_BATCH,50),c=Math.max(1,u);c<e.PIXELS_PER_BATCH&&d(`Ajustando p\xEDxeles por cargas completas disponibles: ${c}/${e.PIXELS_PER_BATCH} (${n} cargas completas de ${o.charges.count.toFixed(2)} totales)`);let i=J(c,e),r=V(c,e),p=i[0],x=i[1];a(`\u{1F3A8} Pintando ${c} p\xEDxeles (${n} cargas completas) en tile(${e.TILE_X},${e.TILE_Y}) local(${p},${x})...`,"status");let v=await W(e.SITEKEY),l=await j(i,r,v);if(o.last={x:p,y:x,color:r[0],pixelCount:c,availableCharges:n,status:l.status,json:l.json},l.status===200&&l.json&&(l.json.painted>0||l.json.painted===c)){let w=l.json.painted||c;o.painted+=w,o.retryCount=0;for(let E=0;E<i.length;E+=2){let M=i[E],$=i[E+1],B=r[Math.floor(E/2)];await ae(M,$,B)}await ne(e.TILE_X,e.TILE_Y),await s(),a(`\u2705 Lote pintado: ${w}/${c} p\xEDxeles (${n} cargas usadas)`,"success"),t();let y=new CustomEvent("wplace-batch-painted",{detail:{firstX:p,firstY:x,pixelCount:w,totalPixels:c,colors:r,coords:i,tileX:e.TILE_X,tileY:e.TILE_Y,timestamp:Date.now()}});return window.dispatchEvent(y),!0}if(l.status===403)a("\u26A0\uFE0F 403 (token expirado o Cloudflare). Reintentar\xE1...","error");else if(l.status===401)a("\u{1F512} 401 (no autorizado). Verifica tu sesi\xF3n.","error");else if(l.status===429)a("\u23F3 429 (l\xEDmite de tasa). Esperando...","error");else if(l.status===408)a("\u23F0 Timeout del servidor. Coordenadas problem\xE1ticas o servidor sobrecargado","error");else if(l.status===0)a("\u{1F310} Error de red. Verificando conectividad...","error");else if(l.status===500)a("\u{1F525} 500 (error interno del servidor). Reintentar\xE1...","error");else if(l.status===502||l.status===503||l.status===504)a(`\u{1F6AB} ${l.status} (servidor no disponible). Reintentar\xE1...`,"error");else if(l.status===404)a(`\u{1F5FA}\uFE0F 404 (tile no encontrado). Verificando coordenadas tile(${e.TILE_X},${e.TILE_Y})`,"error");else try{let w=await checkBackendHealth(),y=w!=null&&w.up?"\u{1F7E2} Online":"\u{1F534} Offline";a(`\u274C Error ${l.status}: ${((L=l.json)==null?void 0:L.message)||((S=l.json)==null?void 0:S.error)||"Fallo al pintar"} (Backend: ${y})`,"error")}catch{a(`\u274C Error ${l.status}: ${((C=l.json)==null?void 0:C.message)||((T=l.json)==null?void 0:T.error)||"Fallo al pintar"} (Health check fall\xF3)`,"error")}return d(`Fallo en pintado: status=${l.status}, json=`,l.json,"coords=",i,"colors=",r),!1}async function re(e,o,a,t,s,n){for(let i=1;i<=5;i++)try{if(await oe(e,o,a,t,s))return o.retryCount=0,!0;if(o.retryCount=i,i<5){let p=3e3*Math.pow(2,i-1);a(`\u{1F504} Reintento ${i}/5 en ${p/1e3}s...`,"error"),await P(p)}}catch(r){if(d(`Error en intento ${i}:`,r),o.retryCount=i,i<5){let p=3e3*Math.pow(2,i-1);a(`\u{1F4A5} Error en intento ${i}/5, reintentando en ${p/1e3}s...`,"error"),await P(p)}}return o.retryCount=5,a("\u274C Fall\xF3 despu\xE9s de 5 intentos. Se requiere intervenci\xF3n manual.","error"),!1}async function K(e,o,a,t,s,n,u){for(d("\u{1F680} Loop iniciado"),o.running=!0;o.running;)try{if(await u(),o.charges.count<e.MIN_CHARGES){let i=Math.max(0,(e.MIN_CHARGES-o.charges.count)*e.CHARGE_REGEN_MS);a(`\u23F3 Esperando cargas: ${o.charges.count.toFixed(1)}/${e.MIN_CHARGES} (${Math.round(i/1e3)}s)`,"status"),await A(Math.min(i,e.DELAY_MS),r=>{let p=e.MIN_CHARGES-o.charges.count;a(`\u23F3 Esperando cargas: ${o.charges.count.toFixed(1)}/${e.MIN_CHARGES} (~${Math.round(r/1e3)}s)`,"status")});continue}if(!await re(e,o,a,t,s,n)){a("\u{1F634} Esperando antes del siguiente intento...","error"),await A(e.DELAY_MS*2,i=>{a(`\u{1F634} Cooldown extendido: ${Math.round(i/1e3)}s`,"error")});continue}o.running&&await A(e.DELAY_MS,i=>{a(`\u{1F4A4} Esperando ${Math.round(i/1e3)}s hasta siguiente pintada...`,"status")})}catch(c){d("Error cr\xEDtico en loop:",c),a(`\u{1F4A5} Error cr\xEDtico: ${c.message}`,"error"),o.running&&await A(e.DELAY_MS*3,i=>{a(`\u{1F6A8} Recuper\xE1ndose de error cr\xEDtico: ${Math.round(i/1e3)}s`,"error")})}d("\u23F9\uFE0F Loop detenido"),a("\u23F9\uFE0F Bot detenido","status")}(async function(){"use strict";var s;if((s=window.__wplaceBot)!=null&&s.running){alert("WPlace BOT ya est\xE1 corriendo.");return}window.__wplaceBot={running:!0},d("\u{1F680} Iniciando WPlace Farm Bot (versi\xF3n modular)");let e={...b,...k(b)};if(!e.SITEKEY){let n=document.querySelector("*[data-sitekey]");n?(e.SITEKEY=n.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${e.SITEKEY.substring(0,20)}...`),_(e)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function o(){try{let n=await X();return n.success&&n.data?(g.charges.count=n.data.charges||0,g.charges.max=n.data.maxCharges||50,g.charges.regen=n.data.chargeRegen||3e4,e.CHARGE_REGEN_MS=g.charges.regen,t.updateStats(g.painted,g.charges.count),!0):!1}catch(n){return d("Error actualizando estad\xEDsticas:",n),!1}}async function a(){try{return await H()}catch(n){return d("Error verificando health:",n),{up:!1,error:n.message}}}let t=U(e,async()=>{if(g.running){t.setStatus("\u26A0\uFE0F El bot ya est\xE1 ejecut\xE1ndose","error");return}if(N(e,b)){t.setStatus("\u{1F3AF} Calibrando autom\xE1ticamente...","status");let c=await z(e);if(c.success)t.setStatus(`\u2705 Calibrado: tile(${c.tileX},${c.tileY})`,"success"),t.updateConfig();else{t.setStatus("\u274C Error en calibraci\xF3n. Configura manualmente.","error");return}}if(t.setStatus("\u{1F50D} Verificando conectividad...","status"),!(await a()).up){t.setStatus("\u{1F534} Backend no disponible. Verifica tu conexi\xF3n.","error");return}if(t.setStatus("\u{1F504} Obteniendo informaci\xF3n de sesi\xF3n...","status"),!await o()){t.setStatus("\u274C Error obteniendo sesi\xF3n. Verifica tu login.","error");return}t.setStatus("\u{1F680} Iniciando bot...","status"),K(e,g,t.setStatus,t.flashEffect,o,a,o)},()=>{g.running=!1,window.__wplaceBot.running=!1,t.setStatus("\u23F9\uFE0F Deteniendo bot...","status")},async()=>{t.setStatus("\u{1F3AF} Calibrando posici\xF3n...","status");let n=await z(e);n.success?(t.setStatus(`\u2705 Calibrado: tile(${n.tileX},${n.tileY})`,"success"),t.updateConfig()):t.setStatus(`\u274C Error en calibraci\xF3n: ${n.error||"Desconocido"}`,"error")});await o(),window.addEventListener("wplace-batch-painted",n=>{d(`\u{1F3A8} Lote pintado: ${n.detail.pixelCount} p\xEDxeles en tile(${n.detail.tileX},${n.detail.tileY})`)}),window.addEventListener("beforeunload",()=>{g.running=!1,window.__wplaceBot.running=!1,t.destroy()}),d("\u2705 Farm Bot inicializado correctamente")})().catch(e=>{console.error("[BOT] Error en Auto-Farm:",e),window.__wplaceBot.running=!1,alert("Auto-Farm: error inesperado. Revisa consola.")});})();
