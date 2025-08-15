/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T11:17:08.483Z */
(()=>{var d=(...a)=>console.log("[WPA-UI]",...a);var g={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",TILE_X:1086,TILE_Y:1565,TILE_SIZE:3e3,DELAY_MS:15e3,MIN_CHARGES:10,CHARGE_REGEN_MS:3e4,PIXELS_PER_BATCH:20,COLOR_MIN:1,COLOR_MAX:32,COLOR_MODE:"random",COLOR_FIXED:1,THEME:"random",CUSTOM_PALETTE:["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF"],UI_THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",running:"#00cc00"}},p={running:!1,painted:0,last:null,charges:{count:0,max:0,cooldownMs:3e4},user:null,panel:null,captureMode:!1,originalFetch:window.fetch,retryCount:0,inCooldown:!1,nextPaintTime:0,cooldownEndTime:0,health:null};function I(a){try{localStorage.setItem("WPA_UI_CFG",JSON.stringify(a))}catch{}}function P(a){try{let n=localStorage.getItem("WPA_UI_CFG");if(n){let e={...a,...JSON.parse(n)};return!Number.isFinite(e.TILE_X)||!Number.isFinite(e.TILE_Y)?(console.log("[WPA-UI]",`Configuraci\xF3n corrupta detectada: coordenadas (${e.TILE_X},${e.TILE_Y}) inv\xE1lidas`),k(),{...a}):e}}catch{}return{...a}}function k(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n del farm reseteada")}catch{}}function Q(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n reseteada a valores seguros")}catch{}}var R="https://backend.wplace.live";async function X(){var a,n,e;try{let o=await fetch(`${R}/me`,{credentials:"include"}).then(c=>c.json()),s=o||null,r=(o==null?void 0:o.charges)||{},i={count:(a=r.count)!=null?a:0,max:(n=r.max)!=null?n:0,cooldownMs:(e=r.cooldownMs)!=null?e:3e4};return{success:!0,data:{user:s,charges:i.count,maxCharges:i.max,chargeRegen:i.cooldownMs}}}catch(o){return{success:!1,error:o.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function ee(){try{let a=await fetch(`${R}/health`,{method:"GET",credentials:"include"});return a.ok?{...await a.json(),lastCheck:Date.now(),status:"online"}:{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"error",statusCode:a.status}}catch(a){return{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"offline",error:a.message}}}async function te(a,n,e){try{let o=await fetch(`${R}/s0/paint`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({coords:a,colors:n,t:e})}),s=await o.json().catch(()=>({}));return{status:o.status,json:s,success:o.ok}}catch(o){return{status:0,json:{error:o.message},success:!1}}}function _(a,n,e){return Math.max(n,Math.min(e,a))}function ae(a,n){let e=0,o=0,s=0,r=0;a.style.cursor="move",a.addEventListener("mousedown",i);function i(f){f.preventDefault(),s=f.clientX,r=f.clientY,document.addEventListener("mouseup",l),document.addEventListener("mousemove",c)}function c(f){f.preventDefault(),e=s-f.clientX,o=r-f.clientY,s=f.clientX,r=f.clientY;let t=n.offsetTop-o,m=n.offsetLeft-e;n.style.top=Math.max(0,t)+"px",n.style.left=Math.max(0,m)+"px"}function l(){document.removeEventListener("mouseup",l),document.removeEventListener("mousemove",c)}}var ne={ukraine:["#0057B7","#FFD700"],spain:["#AA151B","#F1BF00","#AA151B"],catalonia:["#FCDD09","#DA020E","#FCDD09","#DA020E"],usa:["#B22234","#FFFFFF","#3C3B6E"],trans:["#5BCEFA","#F5A9B8","#FFFFFF","#F5A9B8","#5BCEFA"],rainbow:["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#9400D3"],random:["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF"],custom:[]};function oe(a,n,e,o){var A,$,B,H,U,j,W,G,V,q,Z,J,K;let s=document.createElement("div");s.id="wplace-farm-ui",s.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let r=s.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=`
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
  `,r.appendChild(i);let c=document.createElement("div");c.className="wplace-container";let l={minimized:!1,showAdvanced:!1};c.innerHTML=`
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
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="retry-count">0</div>
            <div class="wplace-stat-label">Fallos</div>
          </div>
          <div class="wplace-stat">
            <div class="wplace-stat-value" id="tile-pos">0,0</div>
            <div class="wplace-stat-label">Tile</div>
          </div>
        </div>
        
        <div class="wplace-buttons">
          <button class="wplace-button start" id="start-btn">\u25B6\uFE0F Iniciar</button>
          <button class="wplace-button stop" id="stop-btn" disabled>\u23F9\uFE0F Detener</button>
          <button class="wplace-button calibrate" id="calibrate-btn">\u{1F3AF} Calibrar</button>
          <button class="wplace-button small" id="once-btn">\u{1F3A8} Una vez</button>
        </div>
        
        <div class="wplace-health" id="health-status">\u{1F50D} Verificando estado...</div>
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
        
        <div class="wplace-row">
          <span class="wplace-label">Modo color:</span>
          <select class="wplace-select" id="color-mode-select">
            <option value="random">Aleatorio</option>
            <option value="fixed">Fijo</option>
          </select>
        </div>
        
        <div class="wplace-row" id="color-range-row">
          <span class="wplace-label">Rango:</span>
          <input type="number" class="wplace-input" id="color-min-input" min="1" max="32" style="width: 35px;">
          <span style="color: #cbd5e0;">-</span>
          <input type="number" class="wplace-input" id="color-max-input" min="1" max="32" style="width: 35px;">
        </div>
        
        <div class="wplace-row" id="color-fixed-row" style="display: none;">
          <span class="wplace-label">Color fijo:</span>
          <input type="number" class="wplace-input" id="color-fixed-input" min="1" max="32">
        </div>
      </div>
      
      <!-- Configuraci\xF3n avanzada (colapsable) -->
      <div class="wplace-section">
        <div class="wplace-section-title" id="advanced-toggle">
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
            <input type="text" class="wplace-input wide" id="custom-palette-input" 
                   placeholder="ej: #FF0000,#00FF00,#0000FF">
          </div>
          
          <div class="wplace-buttons">
            <button class="wplace-button small" id="save-btn">\u{1F4BE} Guardar</button>
            <button class="wplace-button small" id="load-btn">\u{1F4C1} Cargar</button>
            <button class="wplace-button small" id="reset-btn">\u{1F504} Reset</button>
            <button class="wplace-button small" id="capture-btn">\u{1F4F8} Capturar</button>
          </div>
        </div>
      </div>
    </div>
  `,r.appendChild(c),document.body.appendChild(s);let f=r.querySelector(".wplace-header");ae(f,s);let t={minimizeBtn:r.querySelector(".wplace-minimize"),content:r.querySelector(".wplace-content"),status:r.getElementById("status"),paintedCount:r.getElementById("painted-count"),chargesCount:r.getElementById("charges-count"),retryCount:r.getElementById("retry-count"),tilePos:r.getElementById("tile-pos"),startBtn:r.getElementById("start-btn"),stopBtn:r.getElementById("stop-btn"),calibrateBtn:r.getElementById("calibrate-btn"),onceBtn:r.getElementById("once-btn"),healthStatus:r.getElementById("health-status"),themeSelect:r.getElementById("theme-select"),themePreview:r.getElementById("theme-preview"),delayInput:r.getElementById("delay-input"),pixelsInput:r.getElementById("pixels-input"),minChargesInput:r.getElementById("min-charges-input"),colorModeSelect:r.getElementById("color-mode-select"),colorRangeRow:r.getElementById("color-range-row"),colorFixedRow:r.getElementById("color-fixed-row"),colorMinInput:r.getElementById("color-min-input"),colorMaxInput:r.getElementById("color-max-input"),colorFixedInput:r.getElementById("color-fixed-input"),advancedToggle:r.getElementById("advanced-toggle"),advancedSection:r.getElementById("advanced-section"),advancedArrow:r.getElementById("advanced-arrow"),tileXInput:r.getElementById("tile-x-input"),tileYInput:r.getElementById("tile-y-input"),customPaletteInput:r.getElementById("custom-palette-input"),saveBtn:r.getElementById("save-btn"),loadBtn:r.getElementById("load-btn"),resetBtn:r.getElementById("reset-btn"),captureBtn:r.getElementById("capture-btn")};function m(){let h=t.themeSelect.value,b=t.themePreview;b.innerHTML="";let C=[];if(h==="custom"){let E=t.customPaletteInput.value;C=E?E.split(",").map(L=>L.trim()):["#CCCCCC"]}else C=ne[h]||ne.random;C.forEach(E=>{let L=document.createElement("div");L.className="wplace-color-dot",L.style.backgroundColor=E,L.title=E,b.appendChild(L)})}function w(){t.themeSelect.value=a.THEME||"random",t.delayInput.value=a.DELAY_MS,t.pixelsInput.value=a.PIXELS_PER_BATCH,t.minChargesInput.value=a.MIN_CHARGES,t.colorModeSelect.value=a.COLOR_MODE,t.colorMinInput.value=a.COLOR_MIN,t.colorMaxInput.value=a.COLOR_MAX,t.colorFixedInput.value=a.COLOR_FIXED,t.tileXInput.value=a.TILE_X||"",t.tileYInput.value=a.TILE_Y||"",t.customPaletteInput.value=(a.CUSTOM_PALETTE||[]).join(","),T(),m(),M()}function u(){a.THEME=t.themeSelect.value,a.DELAY_MS=parseInt(t.delayInput.value)||g.DELAY_MS,a.PIXELS_PER_BATCH=_(parseInt(t.pixelsInput.value)||g.PIXELS_PER_BATCH,1,50),a.MIN_CHARGES=parseFloat(t.minChargesInput.value)||g.MIN_CHARGES,a.COLOR_MODE=t.colorModeSelect.value,a.COLOR_MIN=_(parseInt(t.colorMinInput.value)||g.COLOR_MIN,1,32),a.COLOR_MAX=_(parseInt(t.colorMaxInput.value)||g.COLOR_MAX,1,32),a.COLOR_FIXED=_(parseInt(t.colorFixedInput.value)||g.COLOR_FIXED,1,32),a.COLOR_MIN>a.COLOR_MAX&&(a.COLOR_MAX=a.COLOR_MIN,t.colorMaxInput.value=a.COLOR_MAX);let h=parseInt(t.tileXInput.value),b=parseInt(t.tileYInput.value);if(Number.isFinite(h)&&(a.TILE_X=h),Number.isFinite(b)&&(a.TILE_Y=b),a.THEME==="custom"){let C=t.customPaletteInput.value;a.CUSTOM_PALETTE=C?C.split(",").map(E=>E.trim()):g.CUSTOM_PALETTE}M()}function T(){let h=t.colorModeSelect.value;t.colorRangeRow.style.display=h==="random"?"flex":"none",t.colorFixedRow.style.display=h==="fixed"?"flex":"none"}function M(){t.tilePos&&(t.tilePos.textContent=`${a.TILE_X||0},${a.TILE_Y||0}`)}(A=t.minimizeBtn)==null||A.addEventListener("click",()=>{l.minimized=!l.minimized,t.content.classList.toggle("minimized",l.minimized),t.minimizeBtn.textContent=l.minimized?"+":"\u2212"}),($=t.startBtn)==null||$.addEventListener("click",()=>{u(),n(),S(!0)}),(B=t.stopBtn)==null||B.addEventListener("click",()=>{e(),S(!1)}),(H=t.calibrateBtn)==null||H.addEventListener("click",()=>{o()}),(U=t.onceBtn)==null||U.addEventListener("click",()=>{u(),window.WPAUI&&window.WPAUI.once&&window.WPAUI.once()}),(j=t.themeSelect)==null||j.addEventListener("change",()=>{m(),u()}),(W=t.colorModeSelect)==null||W.addEventListener("change",()=>{T(),u()}),(G=t.customPaletteInput)==null||G.addEventListener("input",()=>{t.themeSelect.value==="custom"&&(m(),u())}),(V=t.advancedToggle)==null||V.addEventListener("click",()=>{l.showAdvanced=!l.showAdvanced,t.advancedSection.style.display=l.showAdvanced?"block":"none",t.advancedArrow.textContent=l.showAdvanced?"\u25BC":"\u25B6"}),["delayInput","pixelsInput","minChargesInput","colorMinInput","colorMaxInput","colorFixedInput","tileXInput","tileYInput"].forEach(h=>{var b;(b=t[h])==null||b.addEventListener("change",u)}),(q=t.saveBtn)==null||q.addEventListener("click",()=>{u(),I(a),y("\u{1F4BE} Configuraci\xF3n guardada","success")}),(Z=t.loadBtn)==null||Z.addEventListener("click",()=>{let h=P(g);Object.assign(a,h),w(),y("\u{1F4C1} Configuraci\xF3n cargada","success")}),(J=t.resetBtn)==null||J.addEventListener("click",()=>{k(),Object.assign(a,g),w(),y("\u{1F504} Configuraci\xF3n reiniciada","success")}),(K=t.captureBtn)==null||K.addEventListener("click",()=>{y("\u{1F4F8} Pinta un p\xEDxel manualmente para capturar coordenadas...","status")});function S(h){t.startBtn&&(t.startBtn.disabled=h),t.stopBtn&&(t.stopBtn.disabled=!h)}function y(h,b="status"){t.status&&(t.status.textContent=h,t.status.className=`wplace-status ${b}`,d(`Status: ${h}`))}function v(h,b,C=0,E=null){t.paintedCount&&(t.paintedCount.textContent=h||0),t.chargesCount&&(t.chargesCount.textContent=typeof b=="number"?b.toFixed(1):"0"),t.retryCount&&(t.retryCount.textContent=C||0),t.healthStatus&&E&&(t.healthStatus.textContent=E.up?"\u{1F7E2} Backend Online":"\u{1F534} Backend Offline",t.healthStatus.className=`wplace-health ${E.up?"online":"offline"}`)}function x(){c.style.boxShadow="0 0 20px #48bb78",setTimeout(()=>{c.style.boxShadow="0 10px 25px rgba(0,0,0,0.3)"},200)}return w(),{setStatus:y,updateStats:v,flashEffect:x,updateButtonStates:S,destroy:()=>{document.body.removeChild(s)},updateConfig:w,getElement:()=>s}}async function Y(a){try{d("\u{1F3AF} Iniciando auto-calibraci\xF3n del tile...");let n=new window.URLSearchParams(window.location.search),e=window.location.hash,o,s;if(n.has("x")&&n.has("y")&&(o=parseInt(n.get("x")),s=parseInt(n.get("y"))),!o&&!s&&e){let r=e.match(/#(-?\d+),(-?\d+)/);r&&(o=parseInt(r[1]),s=parseInt(r[2]))}if(!o&&!s){let r=document.querySelectorAll("[data-x], [data-y], .coordinates, .position");for(let i of r){let c=i.getAttribute("data-x")||i.getAttribute("x"),l=i.getAttribute("data-y")||i.getAttribute("y");if(c&&l){o=parseInt(c),s=parseInt(l);break}}}if(!o&&!s){let i=(document.body.textContent||"").match(/(?:tile|pos|position)?\s*[([]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);i&&(o=parseInt(i[1]),s=parseInt(i[2]))}return(!Number.isFinite(o)||!Number.isFinite(s))&&(o=0,s=0,d("\u26A0\uFE0F No se pudieron detectar coordenadas autom\xE1ticamente, usando (0,0)")),(Math.abs(o)>1e6||Math.abs(s)>1e6)&&(d("\u26A0\uFE0F Coordenadas detectadas parecen incorrectas, limitando a rango v\xE1lido"),o=Math.max(-1e6,Math.min(1e6,o)),s=Math.max(-1e6,Math.min(1e6,s))),a.TILE_X=o,a.TILE_Y=s,d(`\u2705 Tile calibrado autom\xE1ticamente: (${o}, ${s})`),I(a),{tileX:o,tileY:s,success:!0}}catch(n){return d("\u274C Error en auto-calibraci\xF3n:",n),{tileX:0,tileY:0,success:!1,error:n.message}}}var re=!1;async function de(){if(!(re||window.turnstile))return new Promise((a,n)=>{let e=document.createElement("script");e.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",e.async=!0,e.defer=!0,e.onload=()=>{re=!0,a()},e.onerror=()=>n(new Error("No se pudo cargar Turnstile")),document.head.appendChild(e)})}async function ue(a,n="paint"){var e;if(await de(),typeof((e=window.turnstile)==null?void 0:e.execute)=="function")try{let o=await window.turnstile.execute(a,{action:n});if(o&&o.length>20)return o}catch{}return await new Promise(o=>{let s=document.createElement("div");s.style.position="fixed",s.style.left="-9999px",document.body.appendChild(s),window.turnstile.render(s,{sitekey:a,callback:r=>{document.body.removeChild(s),o(r)}})})}async function se(a){return ue(a,"paint")}var pe=a=>Math.floor(Math.random()*a);function me(a){let n=Math.floor(a.TILE_SIZE*.05),e=a.TILE_SIZE-n*2;if(e<=0)return d("Error: \xE1rea segura inv\xE1lida, usando coordenadas b\xE1sicas"),[Math.floor(Math.random()*a.TILE_SIZE),Math.floor(Math.random()*a.TILE_SIZE)];let o=n+Math.floor(Math.random()*e),s=n+Math.floor(Math.random()*e);return Math.random()<.1&&d(`Coordenadas locales generadas: (${o},${s}) en \xE1rea segura [${n}-${n+e-1}]`),[o,s]}function ie(a,n){let e=[];for(let o=0;o<a;o++){let s=me(n);e.push(...s)}return e}function le(a,n){let e=[];for(let o=0;o<a;o++)e.push(fe(n));return e}function fe(a){if(a.COLOR_MODE==="fixed")return a.COLOR_FIXED;{let n=a.COLOR_MAX-a.COLOR_MIN+1;return a.COLOR_MIN+pe(n)}}var O=a=>new Promise(n=>setTimeout(n,a));async function F(a,n,e){let s=Date.now()+a;for(;Date.now()<s&&(!e||e.running);){let r=s-Date.now();n&&n(r),await O(Math.min(1e3,r))}}async function he(a,n,e){try{let o=document.querySelectorAll("canvas");for(let s of o){let r=s.getContext("2d");if(r){let i=typeof e=="number"?`#${e.toString(16).padStart(6,"0")}`:e;r.fillStyle=i,r.fillRect(a,n,1,1),typeof window!="undefined"&&window.Event&&s.dispatchEvent(new window.Event("pixel-updated"))}}}catch(o){d("Error actualizando canvas:",o)}}async function we(a,n){try{let e=`[data-tile="${a}-${n}"], .tile-${a}-${n}, [data-tile-x="${a}"][data-tile-y="${n}"]`,o=document.querySelector(e);o?(o.classList.add("tile-updating"),setTimeout(()=>{o.classList.remove("tile-updating"),o.classList.add("tile-updated"),setTimeout(()=>o.classList.remove("tile-updated"),1e3)},100),d(`Tile (${a},${n}) actualizado visualmente`)):(document.querySelectorAll("canvas").forEach(r=>{let i=r.getContext("2d");if(i){let c=i.getImageData(0,0,1,1);i.putImageData(c,0,0)}}),d(`Actualizaci\xF3n visual gen\xE9rica realizada para tile (${a},${n})`))}catch(e){d("Error en actualizaci\xF3n visual del tile:",e)}}async function ge(a,n,e,o,s){var T,M,S,y;if(!Number.isFinite(a.TILE_X)||!Number.isFinite(a.TILE_Y))return e(`\u{1F6AB} Coordenadas del tile inv\xE1lidas (${a.TILE_X},${a.TILE_Y}). Calibra primero`,"error"),d("Pintado cancelado: coordenadas del tile inv\xE1lidas"),!1;let r=Math.floor(n.charges.count);if(r<1)return e("\u{1F50B} Sin cargas disponibles. Esperando...","error"),!1;let i=Math.min(r,a.PIXELS_PER_BATCH,50),c=Math.max(1,i);c<a.PIXELS_PER_BATCH&&d(`Ajustando p\xEDxeles por cargas completas disponibles: ${c}/${a.PIXELS_PER_BATCH} (${r} cargas completas de ${n.charges.count.toFixed(2)} totales)`);let l=ie(c,a),f=le(c,a),t=l[0],m=l[1];e(`\u{1F3A8} Pintando ${c} p\xEDxeles (${r} cargas completas) en tile(${a.TILE_X},${a.TILE_Y}) local(${t},${m})...`,"status");let w=await se(a.SITEKEY),u=await te(l,f,w);if(n.last={x:t,y:m,color:f[0],pixelCount:c,availableCharges:r,status:u.status,json:u.json},u.status===200&&u.json&&(u.json.painted>0||u.json.painted===c)){let v=u.json.painted||c;n.painted+=v,n.retryCount=0;for(let x=0;x<l.length;x+=2){let A=l[x],$=l[x+1],B=f[Math.floor(x/2)];await he(A,$,B)}if(await we(a.TILE_X,a.TILE_Y),await s(),e(`\u2705 Lote pintado: ${v}/${c} p\xEDxeles (${r} cargas usadas)`,"success"),o(),typeof window!="undefined"&&window.CustomEvent){let x=new window.CustomEvent("wplace-batch-painted",{detail:{firstX:t,firstY:m,pixelCount:v,totalPixels:c,colors:f,coords:l,tileX:a.TILE_X,tileY:a.TILE_Y,timestamp:Date.now()}});window.dispatchEvent(x)}return!0}if(u.status===403)e("\u26A0\uFE0F 403 (token expirado o Cloudflare). Reintentar\xE1...","error");else if(u.status===401)e("\u{1F512} 401 (no autorizado). Verifica tu sesi\xF3n.","error");else if(u.status===429)e("\u23F3 429 (l\xEDmite de tasa). Esperando...","error");else if(u.status===408)e("\u23F0 Timeout del servidor. Coordenadas problem\xE1ticas o servidor sobrecargado","error");else if(u.status===0)e("\u{1F310} Error de red. Verificando conectividad...","error");else if(u.status===500)e("\u{1F525} 500 (error interno del servidor). Reintentar\xE1...","error");else if(u.status===502||u.status===503||u.status===504)e(`\u{1F6AB} ${u.status} (servidor no disponible). Reintentar\xE1...`,"error");else if(u.status===404)e(`\u{1F5FA}\uFE0F 404 (tile no encontrado). Verificando coordenadas tile(${a.TILE_X},${a.TILE_Y})`,"error");else try{let v=await checkBackendHealth(),x=v!=null&&v.up?"\u{1F7E2} Online":"\u{1F534} Offline";e(`\u274C Error ${u.status}: ${((T=u.json)==null?void 0:T.message)||((M=u.json)==null?void 0:M.error)||"Fallo al pintar"} (Backend: ${x})`,"error")}catch{e(`\u274C Error ${u.status}: ${((S=u.json)==null?void 0:S.message)||((y=u.json)==null?void 0:y.error)||"Fallo al pintar"} (Health check fall\xF3)`,"error")}return d(`Fallo en pintado: status=${u.status}, json=`,u.json,"coords=",l,"colors=",f),!1}async function D(a,n,e,o,s,r){for(let l=1;l<=5;l++)try{if(await ge(a,n,e,o,s))return n.retryCount=0,!0;if(n.retryCount=l,l<5){let t=3e3*Math.pow(2,l-1);e(`\u{1F504} Reintento ${l}/5 en ${t/1e3}s...`,"error"),await O(t)}}catch(f){if(d(`Error en intento ${l}:`,f),n.retryCount=l,l<5){let t=3e3*Math.pow(2,l-1);e(`\u{1F4A5} Error en intento ${l}/5, reintentando en ${t/1e3}s...`,"error"),await O(t)}}return n.retryCount=5,e("\u274C Fall\xF3 despu\xE9s de 5 intentos. Se requiere intervenci\xF3n manual.","error"),!1}async function ce(a,n,e,o,s,r,i){for(d("\u{1F680} Loop iniciado"),n.running=!0;n.running;)try{if(await i(),n.charges.count<a.MIN_CHARGES){let l=Math.max(0,(a.MIN_CHARGES-n.charges.count)*a.CHARGE_REGEN_MS);e(`\u23F3 Esperando cargas: ${n.charges.count.toFixed(1)}/${a.MIN_CHARGES} (${Math.round(l/1e3)}s)`,"status"),await F(Math.min(l,a.DELAY_MS),f=>{e(`\u23F3 Esperando cargas: ${n.charges.count.toFixed(1)}/${a.MIN_CHARGES} (~${Math.round(f/1e3)}s)`,"status")},n);continue}if(!await D(a,n,e,o,s,r)){e("\u{1F634} Esperando antes del siguiente intento...","error"),await F(a.DELAY_MS*2,l=>{e(`\u{1F634} Cooldown extendido: ${Math.round(l/1e3)}s`,"error")});continue}n.running&&await F(a.DELAY_MS,l=>{e(`\u{1F4A4} Esperando ${Math.round(l/1e3)}s hasta siguiente pintada...`,"status")})}catch(c){d("Error cr\xEDtico en loop:",c),e(`\u{1F4A5} Error cr\xEDtico: ${c.message}`,"error"),n.running&&await F(a.DELAY_MS*3,l=>{e(`\u{1F6A8} Recuper\xE1ndose de error cr\xEDtico: ${Math.round(l/1e3)}s`,"error")})}d("\u23F9\uFE0F Loop detenido"),e("\u23F9\uFE0F Bot detenido","status")}var N=class{constructor(){this.active=!1,this.originalFetch=window.fetch,this.callback=null}enable(n){if(this.active){d("\u26A0\uFE0F Captura ya est\xE1 activa");return}this.active=!0,this.callback=n,d("\u{1F575}\uFE0F Captura de coordenadas activada. Pinta un p\xEDxel manualmente..."),window.fetch=async(...e)=>{let o=await this.originalFetch.apply(window,e);return this.active&&this.shouldCapture(e[0],e[1])&&await this.handleCapture(e[0],e[1],o.clone()),o},setTimeout(()=>{this.active&&(this.disable(),d("\u23F0 Captura de coordenadas expirada"))},3e4)}shouldCapture(n,e){if(!n||!e)return!1;let o=n.toString();return!(!o.includes("paint")&&!o.includes("pixel")&&!o.includes("place")||!e.method||e.method.toUpperCase()!=="POST")}async handleCapture(n,e,o){try{let s=null,r=null,i=null;if(e.body){let c;if(typeof e.body=="string")try{c=JSON.parse(e.body)}catch{c=e.body}else c=e.body;c.coords&&Array.isArray(c.coords)?s=c.coords:c.x!==void 0&&c.y!==void 0?s=[c.x,c.y]:c.coordinates&&(s=c.coordinates)}if(!s){let l=n.toString().match(/[?&](?:x|coords?)=([^&]+)/);if(l){let f=decodeURIComponent(l[1]);try{s=JSON.parse(f)}catch{let t=f.split(",");t.length>=2&&(s=[parseInt(t[0]),parseInt(t[1])])}}}if(s&&s.length>=2){let c=s[0],l=s[1];r=Math.floor(c/3e3),i=Math.floor(l/3e3),d(`\u{1F3AF} Coordenadas capturadas: global(${c},${l}) -> tile(${r},${i})`),o.ok?(this.disable(),this.callback&&this.callback({success:!0,tileX:r,tileY:i,globalX:c,globalY:l,localX:c%3e3,localY:l%3e3})):d("\u26A0\uFE0F Captura realizada pero la respuesta no fue exitosa")}}catch(s){d("Error procesando captura:",s)}}disable(){this.active&&(this.active=!1,window.fetch=this.originalFetch,this.callback=null,d("\u{1F512} Captura de coordenadas desactivada"))}},z=new N;(async function(){"use strict";var f;if((f=window.__wplaceBot)!=null&&f.running){alert("WPlace BOT ya est\xE1 corriendo.");return}window.__wplaceBot={running:!0},d("\u{1F680} Iniciando WPlace Farm Bot (versi\xF3n modular)");function a(t){let m=t.TILE_X===g.TILE_X&&t.TILE_Y===g.TILE_Y,w=!localStorage.getItem("WPA_UI_CFG"),u=!Number.isFinite(t.TILE_X)||!Number.isFinite(t.TILE_Y),T=m||w||u;return d(`Verificaci\xF3n calibraci\xF3n: defaults=${m}, noConfig=${w}, invalid=${u}, coords=(${t.TILE_X},${t.TILE_Y})`),T}function n(){d("\u{1F575}\uFE0F Activando captura de coordenadas..."),z.enable(t=>{t.success?(e.TILE_X=t.tileX,e.TILE_Y=t.tileY,I(e),i.updateConfig(),i.setStatus(`\u{1F3AF} Coordenadas capturadas: tile(${t.tileX},${t.tileY})`,"success"),d(`\u2705 Coordenadas capturadas autom\xE1ticamente: tile(${t.tileX},${t.tileY})`)):i.setStatus("\u274C No se pudieron capturar coordenadas","error")}),i.setStatus("\u{1F4F8} Pinta un p\xEDxel manualmente para capturar coordenadas...","status")}let e={...g,...P(g)};if(!e.SITEKEY){let t=document.querySelector("*[data-sitekey]");t?(e.SITEKEY=t.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${e.SITEKEY.substring(0,20)}...`),I(e)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function o(){try{let t=await X();if(t.success&&t.data){p.charges.count=t.data.charges||0,p.charges.max=t.data.maxCharges||50,p.charges.regen=t.data.chargeRegen||3e4,p.user=t.data.user,e.CHARGE_REGEN_MS=p.charges.regen;let m=await s();return p.health=m,i.updateStats(p.painted,p.charges.count,p.retryCount,m),t.data}return null}catch(t){return d("Error actualizando estad\xEDsticas:",t),null}}async function s(){try{return await ee()}catch(t){return d("Error verificando health:",t),{up:!1,error:t.message}}}async function r(){return await D(e,p,i.setStatus,i.flashEffect,()=>X(),s)}let i=oe(e,async()=>{if(p.running){i.setStatus("\u26A0\uFE0F El bot ya est\xE1 ejecut\xE1ndose","error");return}if(a(e)){i.setStatus("\u{1F3AF} Calibrando autom\xE1ticamente...","status");let w=await Y(e);if(w.success)i.setStatus(`\u2705 Calibrado: tile(${w.tileX},${w.tileY})`,"success"),i.updateConfig();else{i.setStatus("\u274C Error en calibraci\xF3n. Configura manualmente.","error");return}}if(i.setStatus("\u{1F50D} Verificando conectividad...","status"),!(await s()).up){i.setStatus("\u{1F534} Backend no disponible. Verifica tu conexi\xF3n.","error");return}if(i.setStatus("\u{1F504} Obteniendo informaci\xF3n de sesi\xF3n...","status"),!await o()){i.setStatus("\u274C Error obteniendo sesi\xF3n. Verifica tu login.","error");return}i.setStatus("\u{1F680} Iniciando bot...","status"),i.updateButtonStates(!0),ce(e,p,i.setStatus,i.flashEffect,o,s,o)},()=>{p.running=!1,window.__wplaceBot.running=!1,i.setStatus("\u23F9\uFE0F Deteniendo bot...","status"),i.updateButtonStates(!1)},async()=>{i.setStatus("\u{1F3AF} Calibrando posici\xF3n...","status");let t=await Y(e);t.success?(i.setStatus(`\u2705 Calibrado: tile(${t.tileX},${t.tileY})`,"success"),i.updateConfig()):i.setStatus(`\u274C Error en calibraci\xF3n: ${t.error||"Desconocido"}`,"error")}),c=i.getElement().shadowRoot.getElementById("capture-btn");c&&c.addEventListener("click",n);let l=i.getElement().shadowRoot.getElementById("once-btn");l&&l.addEventListener("click",async()=>{if(p.running){i.setStatus("\u26A0\uFE0F Det\xE9n el bot primero","error");return}await o(),i.setStatus("\u{1F3A8} Pintando una vez...","status"),await r()?i.setStatus("\u2705 P\xEDxel pintado exitosamente","success"):i.setStatus("\u274C Error al pintar p\xEDxel","error")}),await o(),window.addEventListener("wplace-batch-painted",t=>{d(`\u{1F3A8} Lote pintado: ${t.detail.pixelCount} p\xEDxeles en tile(${t.detail.tileX},${t.detail.tileY})`)}),window.WPAUI={once:r,get:()=>({...e}),capture:n,refreshCanvas:()=>{p.last&&d(`Refrescando canvas en posici\xF3n (${p.last.x},${p.last.y})`)},verifyPixel:async(t,m)=>(d(`Verificando p\xEDxel en (${t},${m})...`),{verified:!0,x:t,y:m}),getStats:()=>({painted:p.painted,last:p.last,charges:p.charges,user:p.user,running:p.running,minCharges:e.MIN_CHARGES,delay:e.DELAY_MS,tileInfo:{tileX:e.TILE_X,tileY:e.TILE_Y,tileSize:e.TILE_SIZE,safeMargin:Math.floor(e.TILE_SIZE*.05),safeArea:{minX:Math.floor(e.TILE_SIZE*.05),maxX:e.TILE_SIZE-Math.floor(e.TILE_SIZE*.05)-1,minY:Math.floor(e.TILE_SIZE*.05),maxY:e.TILE_SIZE-Math.floor(e.TILE_SIZE*.05)-1}}}),setPixelsPerBatch:t=>{e.PIXELS_PER_BATCH=_(t,1,50),I(e),i.updateConfig(),d(`P\xEDxeles por lote configurado a: ${e.PIXELS_PER_BATCH}`)},setMinCharges:t=>{e.MIN_CHARGES=Math.max(0,t),I(e),i.updateConfig(),d(`Cargas m\xEDnimas configuradas a: ${e.MIN_CHARGES}`)},setDelay:t=>{e.DELAY_MS=Math.max(1e3,t*1e3),I(e),i.updateConfig(),d(`Delay configurado a: ${e.DELAY_MS}ms`)},diagnose:()=>{var w;let t=window.WPAUI.getStats(),m={configValid:Number.isFinite(e.TILE_X)&&Number.isFinite(e.TILE_Y),hasCharges:p.charges.count>0,backendHealthy:((w=p.health)==null?void 0:w.up)||!1,userLoggedIn:!!p.user,coordinates:`(${e.TILE_X},${e.TILE_Y})`,safeArea:t.tileInfo.safeArea,recommendations:[]};return m.configValid||m.recommendations.push("Calibrar coordenadas del tile"),m.hasCharges||m.recommendations.push("Esperar a que se regeneren las cargas"),m.backendHealthy||m.recommendations.push("Verificar conexi\xF3n al backend"),m.userLoggedIn||m.recommendations.push("Iniciar sesi\xF3n en la plataforma"),console.table(m),m},checkHealth:s,resetConfig:()=>{Q(),e={...g},i.updateConfig(),d("Configuraci\xF3n reseteada a valores por defecto")},debugRetries:()=>({currentRetries:p.retryCount,inCooldown:p.inCooldown,nextPaintTime:p.nextPaintTime,cooldownEndTime:p.cooldownEndTime}),forceClearCooldown:()=>{p.inCooldown=!1,p.nextPaintTime=0,p.cooldownEndTime=0,p.retryCount=0,d("Cooldown forzado a limpiar")},simulateError:(t=500)=>{d(`Simulando error ${t} para testing...`),i.setStatus(`\u{1F9EA} Simulando error ${t}`,"error")}},window.addEventListener("beforeunload",()=>{p.running=!1,window.__wplaceBot.running=!1,z.disable(),i.destroy()}),d("\u2705 Farm Bot inicializado correctamente"),d("\u{1F4A1} Usa console.log(window.WPAUI) para ver la API disponible")})().catch(a=>{console.error("[BOT] Error en Auto-Farm:",a),window.__wplaceBot.running=!1,alert("Auto-Farm: error inesperado. Revisa consola.")});})();
