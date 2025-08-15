/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T11:59:13.261Z */
(()=>{var u=(...t)=>console.log("[WPA-UI]",...t);var g={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",TILE_X:1086,TILE_Y:1565,TILE_SIZE:3e3,DELAY_MS:15e3,MIN_CHARGES:10,CHARGE_REGEN_MS:3e4,PIXELS_PER_BATCH:20,COLOR_MIN:1,COLOR_MAX:32,COLOR_MODE:"random",COLOR_FIXED:1,CUSTOM_PALETTE:["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF"],UI_THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",running:"#00cc00"}},m={running:!1,painted:0,last:null,charges:{count:0,max:0,cooldownMs:3e4},user:null,panel:null,captureMode:!1,originalFetch:window.fetch,retryCount:0,inCooldown:!1,nextPaintTime:0,cooldownEndTime:0,health:null};function I(t){try{localStorage.setItem("WPA_UI_CFG",JSON.stringify(t))}catch{}}function A(t){try{let a=localStorage.getItem("WPA_UI_CFG");if(a){let e={...t,...JSON.parse(a)};return!Number.isFinite(e.TILE_X)||!Number.isFinite(e.TILE_Y)?(console.log("[WPA-UI]",`Configuraci\xF3n corrupta detectada: coordenadas (${e.TILE_X},${e.TILE_Y}) inv\xE1lidas`),R(),{...t}):e}}catch{}return{...t}}function R(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n del farm reseteada")}catch{}}function q(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n reseteada a valores seguros")}catch{}}var O="https://backend.wplace.live";async function P(){var t,a,e;try{let r=await fetch(`${O}/me`,{credentials:"include"}).then(d=>d.json()),s=r||null,n=(r==null?void 0:r.charges)||{},i={count:(t=n.count)!=null?t:0,max:(a=n.max)!=null?a:0,cooldownMs:(e=n.cooldownMs)!=null?e:3e4};return{success:!0,data:{user:s,charges:i.count,maxCharges:i.max,chargeRegen:i.cooldownMs}}}catch(r){return{success:!1,error:r.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function Z(){try{let t=await fetch(`${O}/health`,{method:"GET",credentials:"include"});return t.ok?{...await t.json(),lastCheck:Date.now(),status:"online"}:{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"error",statusCode:t.status}}catch(t){return{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"offline",error:t.message}}}async function J(t,a,e,r,s){try{let n=JSON.stringify({colors:a,coords:t,t:e}),i=new AbortController,d=setTimeout(()=>i.abort(),15e3),c=await fetch(`${O}/s0/pixel/${r}/${s}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:n,signal:i.signal});clearTimeout(d);let f=null;try{let o=await c.text();o&&(f=JSON.parse(o))}catch{f={}}return{status:c.status,json:f,success:c.ok}}catch(n){return{status:0,json:{error:n.message},success:!1}}}function _(t,a,e){return Math.max(a,Math.min(e,t))}function K(t,a){let e=0,r=0,s=0,n=0;t.style.cursor="move",t.addEventListener("mousedown",i);function i(f){f.preventDefault(),s=f.clientX,n=f.clientY,document.addEventListener("mouseup",c),document.addEventListener("mousemove",d)}function d(f){f.preventDefault(),e=s-f.clientX,r=n-f.clientY,s=f.clientX,n=f.clientY;let o=a.offsetTop-r,l=a.offsetLeft-e;a.style.top=Math.max(0,o)+"px",a.style.left=Math.max(0,l)+"px"}function c(){document.removeEventListener("mouseup",c),document.removeEventListener("mousemove",d)}}function Q(t,a,e,r){var b,S,M,$,D,z,H,U,j,W,G,V;let s=document.createElement("div");s.id="wplace-farm-ui",s.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let n=s.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=`
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
  `,n.appendChild(i);let d=document.createElement("div");d.className="wplace-container";let c={minimized:!1,showAdvanced:!1};d.innerHTML=`
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
  `,n.appendChild(d),document.body.appendChild(s);let f=n.querySelector(".wplace-header");K(f,s);let o={minimizeBtn:n.querySelector(".wplace-minimize"),content:n.querySelector(".wplace-content"),status:n.getElementById("status"),paintedCount:n.getElementById("painted-count"),chargesCount:n.getElementById("charges-count"),retryCount:n.getElementById("retry-count"),tilePos:n.getElementById("tile-pos"),startBtn:n.getElementById("start-btn"),stopBtn:n.getElementById("stop-btn"),calibrateBtn:n.getElementById("calibrate-btn"),onceBtn:n.getElementById("once-btn"),healthStatus:n.getElementById("health-status"),delayInput:n.getElementById("delay-input"),pixelsInput:n.getElementById("pixels-input"),minChargesInput:n.getElementById("min-charges-input"),colorModeSelect:n.getElementById("color-mode-select"),colorRangeRow:n.getElementById("color-range-row"),colorFixedRow:n.getElementById("color-fixed-row"),colorMinInput:n.getElementById("color-min-input"),colorMaxInput:n.getElementById("color-max-input"),colorFixedInput:n.getElementById("color-fixed-input"),advancedToggle:n.getElementById("advanced-toggle"),advancedSection:n.getElementById("advanced-section"),advancedArrow:n.getElementById("advanced-arrow"),tileXInput:n.getElementById("tile-x-input"),tileYInput:n.getElementById("tile-y-input"),customPaletteInput:n.getElementById("custom-palette-input"),saveBtn:n.getElementById("save-btn"),loadBtn:n.getElementById("load-btn"),resetBtn:n.getElementById("reset-btn"),captureBtn:n.getElementById("capture-btn")};function l(){o.delayInput.value=t.DELAY_MS,o.pixelsInput.value=t.PIXELS_PER_BATCH,o.minChargesInput.value=t.MIN_CHARGES,o.colorModeSelect.value=t.COLOR_MODE,o.colorMinInput.value=t.COLOR_MIN,o.colorMaxInput.value=t.COLOR_MAX,o.colorFixedInput.value=t.COLOR_FIXED,o.tileXInput.value=t.TILE_X||"",o.tileYInput.value=t.TILE_Y||"",o.customPaletteInput.value=(t.CUSTOM_PALETTE||[]).join(","),p(),y()}function h(){t.DELAY_MS=parseInt(o.delayInput.value)||g.DELAY_MS,t.PIXELS_PER_BATCH=_(parseInt(o.pixelsInput.value)||g.PIXELS_PER_BATCH,1,50),t.MIN_CHARGES=parseFloat(o.minChargesInput.value)||g.MIN_CHARGES,t.COLOR_MODE=o.colorModeSelect.value,t.COLOR_MIN=_(parseInt(o.colorMinInput.value)||g.COLOR_MIN,1,32),t.COLOR_MAX=_(parseInt(o.colorMaxInput.value)||g.COLOR_MAX,1,32),t.COLOR_FIXED=_(parseInt(o.colorFixedInput.value)||g.COLOR_FIXED,1,32),t.COLOR_MIN>t.COLOR_MAX&&(t.COLOR_MAX=t.COLOR_MIN,o.colorMaxInput.value=t.COLOR_MAX);let w=parseInt(o.tileXInput.value),x=parseInt(o.tileYInput.value);Number.isFinite(w)&&(t.TILE_X=w),Number.isFinite(x)&&(t.TILE_Y=x),y()}function p(){let w=o.colorModeSelect.value;o.colorRangeRow.style.display=w==="random"?"flex":"none",o.colorFixedRow.style.display=w==="fixed"?"flex":"none"}function y(){o.tilePos&&(o.tilePos.textContent=`${t.TILE_X||0},${t.TILE_Y||0}`)}(b=o.minimizeBtn)==null||b.addEventListener("click",()=>{c.minimized=!c.minimized,o.content.classList.toggle("minimized",c.minimized),o.minimizeBtn.textContent=c.minimized?"+":"\u2212"}),(S=o.startBtn)==null||S.addEventListener("click",()=>{h(),a(),v(!0)}),(M=o.stopBtn)==null||M.addEventListener("click",()=>{e(),v(!1)}),($=o.calibrateBtn)==null||$.addEventListener("click",()=>{r()}),(D=o.onceBtn)==null||D.addEventListener("click",()=>{h(),window.WPAUI&&window.WPAUI.once&&window.WPAUI.once()}),(z=o.colorModeSelect)==null||z.addEventListener("change",()=>{p(),h()}),(H=o.customPaletteInput)==null||H.addEventListener("input",()=>{h()}),(U=o.advancedToggle)==null||U.addEventListener("click",()=>{c.showAdvanced=!c.showAdvanced,o.advancedSection.style.display=c.showAdvanced?"block":"none",o.advancedArrow.textContent=c.showAdvanced?"\u25BC":"\u25B6"}),["delayInput","pixelsInput","minChargesInput","colorMinInput","colorMaxInput","colorFixedInput","tileXInput","tileYInput"].forEach(w=>{var x;(x=o[w])==null||x.addEventListener("change",h)}),(j=o.saveBtn)==null||j.addEventListener("click",()=>{h(),I(t),C("\u{1F4BE} Configuraci\xF3n guardada","success")}),(W=o.loadBtn)==null||W.addEventListener("click",()=>{let w=A(g);Object.assign(t,w),l(),C("\u{1F4C1} Configuraci\xF3n cargada","success")}),(G=o.resetBtn)==null||G.addEventListener("click",()=>{R(),Object.assign(t,g),l(),C("\u{1F504} Configuraci\xF3n reiniciada","success")}),(V=o.captureBtn)==null||V.addEventListener("click",()=>{C("\u{1F4F8} Pinta un p\xEDxel manualmente para capturar coordenadas...","status")});function v(w){o.startBtn&&(o.startBtn.disabled=w),o.stopBtn&&(o.stopBtn.disabled=!w)}function C(w,x="status"){o.status&&(o.status.textContent=w,o.status.className=`wplace-status ${x}`,u(`Status: ${w}`))}function L(w,x,re=0,F=null){o.paintedCount&&(o.paintedCount.textContent=w||0),o.chargesCount&&(o.chargesCount.textContent=typeof x=="number"?x.toFixed(1):"0"),o.retryCount&&(o.retryCount.textContent=re||0),o.healthStatus&&F&&(o.healthStatus.textContent=F.up?"\u{1F7E2} Backend Online":"\u{1F534} Backend Offline",o.healthStatus.className=`wplace-health ${F.up?"online":"offline"}`)}function E(){d.style.boxShadow="0 0 20px #48bb78",setTimeout(()=>{d.style.boxShadow="0 10px 25px rgba(0,0,0,0.3)"},200)}return l(),{setStatus:C,updateStats:L,flashEffect:E,updateButtonStates:v,destroy:()=>{document.body.removeChild(s)},updateConfig:l,getElement:()=>s}}async function k(t){try{u("\u{1F3AF} Iniciando auto-calibraci\xF3n del tile...");let a=new window.URLSearchParams(window.location.search),e=window.location.hash,r,s;if(a.has("x")&&a.has("y")&&(r=parseInt(a.get("x")),s=parseInt(a.get("y"))),!r&&!s&&e){let n=e.match(/#(-?\d+),(-?\d+)/);n&&(r=parseInt(n[1]),s=parseInt(n[2]))}if(!r&&!s){let n=document.querySelectorAll("[data-x], [data-y], .coordinates, .position");for(let i of n){let d=i.getAttribute("data-x")||i.getAttribute("x"),c=i.getAttribute("data-y")||i.getAttribute("y");if(d&&c){r=parseInt(d),s=parseInt(c);break}}}if(!r&&!s){let i=(document.body.textContent||"").match(/(?:tile|pos|position)?\s*[([]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);i&&(r=parseInt(i[1]),s=parseInt(i[2]))}return(!Number.isFinite(r)||!Number.isFinite(s))&&(r=0,s=0,u("\u26A0\uFE0F No se pudieron detectar coordenadas autom\xE1ticamente, usando (0,0)")),(Math.abs(r)>1e6||Math.abs(s)>1e6)&&(u("\u26A0\uFE0F Coordenadas detectadas parecen incorrectas, limitando a rango v\xE1lido"),r=Math.max(-1e6,Math.min(1e6,r)),s=Math.max(-1e6,Math.min(1e6,s))),t.TILE_X=r,t.TILE_Y=s,u(`\u2705 Tile calibrado autom\xE1ticamente: (${r}, ${s})`),I(t),{tileX:r,tileY:s,success:!0}}catch(a){return u("\u274C Error en auto-calibraci\xF3n:",a),{tileX:0,tileY:0,success:!1,error:a.message}}}var ee=!1;async function se(){if(!(ee||window.turnstile))return new Promise((t,a)=>{let e=document.createElement("script");e.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",e.async=!0,e.defer=!0,e.onload=()=>{ee=!0,t()},e.onerror=()=>a(new Error("No se pudo cargar Turnstile")),document.head.appendChild(e)})}async function ie(t,a="paint"){var e;if(await se(),typeof((e=window.turnstile)==null?void 0:e.execute)=="function")try{let r=await window.turnstile.execute(t,{action:a});if(r&&r.length>20)return r}catch{}return await new Promise(r=>{let s=document.createElement("div");s.style.position="fixed",s.style.left="-9999px",document.body.appendChild(s),window.turnstile.render(s,{sitekey:t,callback:n=>{document.body.removeChild(s),r(n)}})})}async function te(t){return ie(t,"paint")}var le=t=>Math.floor(Math.random()*t);function ce(t){let a=Math.floor(t.TILE_SIZE*.05),e=t.TILE_SIZE-a*2;if(e<=0)return u("Error: \xE1rea segura inv\xE1lida, usando coordenadas b\xE1sicas"),[Math.floor(Math.random()*t.TILE_SIZE),Math.floor(Math.random()*t.TILE_SIZE)];let r=a+Math.floor(Math.random()*e),s=a+Math.floor(Math.random()*e);return Math.random()<.1&&u(`Coordenadas locales generadas: (${r},${s}) en \xE1rea segura [${a}-${a+e-1}]`),[r,s]}function ae(t,a){let e=[];for(let r=0;r<t;r++){let s=ce(a);e.push(...s)}return e}function ne(t,a){let e=[];for(let r=0;r<t;r++)e.push(de(a));return e}function de(t){if(t.COLOR_MODE==="fixed")return t.COLOR_FIXED;{let a=t.COLOR_MAX-t.COLOR_MIN+1;return t.COLOR_MIN+le(a)}}var B=t=>new Promise(a=>setTimeout(a,t));async function T(t,a,e){let s=Date.now()+t;for(;Date.now()<s&&(!e||e.running);){let n=s-Date.now();a&&a(n),await B(Math.min(1e3,n))}}async function ue(t,a,e){try{let r=document.querySelectorAll("canvas");for(let s of r){let n=s.getContext("2d");if(n){let i=typeof e=="number"?`#${e.toString(16).padStart(6,"0")}`:e;n.fillStyle=i,n.fillRect(t,a,1,1),typeof window!="undefined"&&window.Event&&s.dispatchEvent(new window.Event("pixel-updated"))}}}catch(r){u("Error actualizando canvas:",r)}}async function pe(t,a){try{let e=`[data-tile="${t}-${a}"], .tile-${t}-${a}, [data-tile-x="${t}"][data-tile-y="${a}"]`,r=document.querySelector(e);r?(r.classList.add("tile-updating"),setTimeout(()=>{r.classList.remove("tile-updating"),r.classList.add("tile-updated"),setTimeout(()=>r.classList.remove("tile-updated"),1e3)},100),u(`Tile (${t},${a}) actualizado visualmente`)):(document.querySelectorAll("canvas").forEach(n=>{let i=n.getContext("2d");if(i){let d=i.getImageData(0,0,1,1);i.putImageData(d,0,0)}}),u(`Actualizaci\xF3n visual gen\xE9rica realizada para tile (${t},${a})`))}catch(e){u("Error en actualizaci\xF3n visual del tile:",e)}}async function me(t,a,e,r,s){var y,v,C,L;if(!Number.isFinite(t.TILE_X)||!Number.isFinite(t.TILE_Y))return e(`\u{1F6AB} Coordenadas del tile inv\xE1lidas (${t.TILE_X},${t.TILE_Y}). Calibra primero`,"error"),u("Pintado cancelado: coordenadas del tile inv\xE1lidas"),!1;let n=Math.floor(a.charges.count);if(n<1)return e("\u{1F50B} Sin cargas disponibles. Esperando...","error"),!1;let i=Math.min(n,t.PIXELS_PER_BATCH,50),d=Math.max(1,i);d<t.PIXELS_PER_BATCH&&u(`Ajustando p\xEDxeles por cargas completas disponibles: ${d}/${t.PIXELS_PER_BATCH} (${n} cargas completas de ${a.charges.count.toFixed(2)} totales)`);let c=ae(d,t),f=ne(d,t),o=c[0],l=c[1];e(`\u{1F3A8} Pintando ${d} p\xEDxeles (${n} cargas completas) en tile(${t.TILE_X},${t.TILE_Y}) local(${o},${l})...`,"status");let h=await te(t.SITEKEY),p=await J(c,f,h,t.TILE_X,t.TILE_Y);if(a.last={x:o,y:l,color:f[0],pixelCount:d,availableCharges:n,status:p.status,json:p.json},p.status===200&&p.json&&(p.json.painted>0||p.json.painted===d)){let E=p.json.painted||d;a.painted+=E,a.retryCount=0;for(let b=0;b<c.length;b+=2){let S=c[b],M=c[b+1],$=f[Math.floor(b/2)];await ue(S,M,$)}if(await pe(t.TILE_X,t.TILE_Y),await s(),e(`\u2705 Lote pintado: ${E}/${d} p\xEDxeles (${n} cargas usadas)`,"success"),r(),typeof window!="undefined"&&window.CustomEvent){let b=new window.CustomEvent("wplace-batch-painted",{detail:{firstX:o,firstY:l,pixelCount:E,totalPixels:d,colors:f,coords:c,tileX:t.TILE_X,tileY:t.TILE_Y,timestamp:Date.now()}});window.dispatchEvent(b)}return!0}if(p.status===403)e("\u26A0\uFE0F 403 (token expirado o Cloudflare). Reintentar\xE1...","error");else if(p.status===401)e("\u{1F512} 401 (no autorizado). Verifica tu sesi\xF3n.","error");else if(p.status===429)e("\u23F3 429 (l\xEDmite de tasa). Esperando...","error");else if(p.status===408)e("\u23F0 Timeout del servidor. Coordenadas problem\xE1ticas o servidor sobrecargado","error");else if(p.status===0)e("\u{1F310} Error de red. Verificando conectividad...","error");else if(p.status===500)e("\u{1F525} 500 (error interno del servidor). Reintentar\xE1...","error");else if(p.status===502||p.status===503||p.status===504)e(`\u{1F6AB} ${p.status} (servidor no disponible). Reintentar\xE1...`,"error");else if(p.status===404)e(`\u{1F5FA}\uFE0F 404 (tile no encontrado). Verificando coordenadas tile(${t.TILE_X},${t.TILE_Y})`,"error");else try{let E=await checkBackendHealth(),b=E!=null&&E.up?"\u{1F7E2} Online":"\u{1F534} Offline";e(`\u274C Error ${p.status}: ${((y=p.json)==null?void 0:y.message)||((v=p.json)==null?void 0:v.error)||"Fallo al pintar"} (Backend: ${b})`,"error")}catch{e(`\u274C Error ${p.status}: ${((C=p.json)==null?void 0:C.message)||((L=p.json)==null?void 0:L.error)||"Fallo al pintar"} (Health check fall\xF3)`,"error")}return u(`Fallo en pintado: status=${p.status}, json=`,p.json,"coords=",c,"colors=",f),!1}async function X(t,a,e,r,s,n){for(let c=1;c<=5;c++)try{if(await me(t,a,e,r,s))return a.retryCount=0,!0;if(a.retryCount=c,c<5){let o=3e3*Math.pow(2,c-1);e(`\u{1F504} Reintento ${c}/5 en ${o/1e3}s...`,"error"),await B(o)}}catch(f){if(u(`Error en intento ${c}:`,f),a.retryCount=c,c<5){let o=3e3*Math.pow(2,c-1);e(`\u{1F4A5} Error en intento ${c}/5, reintentando en ${o/1e3}s...`,"error"),await B(o)}}return a.retryCount=5,e("\u274C Fall\xF3 despu\xE9s de 5 intentos. Se requiere intervenci\xF3n manual.","error"),!1}async function oe(t,a,e,r,s,n,i){for(u("\u{1F680} Loop iniciado"),a.running=!0;a.running;)try{if(await i(),a.charges.count<t.MIN_CHARGES){let c=Math.max(0,(t.MIN_CHARGES-a.charges.count)*t.CHARGE_REGEN_MS);e(`\u23F3 Esperando cargas: ${a.charges.count.toFixed(1)}/${t.MIN_CHARGES} (${Math.round(c/1e3)}s)`,"status"),await T(Math.min(c,t.DELAY_MS),f=>{e(`\u23F3 Esperando cargas: ${a.charges.count.toFixed(1)}/${t.MIN_CHARGES} (~${Math.round(f/1e3)}s)`,"status")},a);continue}if(!await X(t,a,e,r,s,n)){e("\u{1F634} Esperando antes del siguiente intento...","error"),await T(t.DELAY_MS*2,c=>{e(`\u{1F634} Cooldown extendido: ${Math.round(c/1e3)}s`,"error")});continue}a.running&&await T(t.DELAY_MS,c=>{e(`\u{1F4A4} Esperando ${Math.round(c/1e3)}s hasta siguiente pintada...`,"status")})}catch(d){u("Error cr\xEDtico en loop:",d),e(`\u{1F4A5} Error cr\xEDtico: ${d.message}`,"error"),a.running&&await T(t.DELAY_MS*3,c=>{e(`\u{1F6A8} Recuper\xE1ndose de error cr\xEDtico: ${Math.round(c/1e3)}s`,"error")})}u("\u23F9\uFE0F Loop detenido"),e("\u23F9\uFE0F Bot detenido","status")}var Y=class{constructor(){this.active=!1,this.originalFetch=window.fetch,this.callback=null}enable(a){if(this.active){u("\u26A0\uFE0F Captura ya est\xE1 activa");return}this.active=!0,this.callback=a,u("\u{1F575}\uFE0F Captura de coordenadas activada. Pinta un p\xEDxel manualmente..."),window.fetch=async(...e)=>{let r=await this.originalFetch.apply(window,e);return this.active&&this.shouldCapture(e[0],e[1])&&await this.handleCapture(e[0],e[1],r.clone()),r},setTimeout(()=>{this.active&&(this.disable(),u("\u23F0 Captura de coordenadas expirada"))},3e4)}shouldCapture(a,e){if(!a||!e)return!1;let r=a.toString();return!(!r.includes("paint")&&!r.includes("pixel")&&!r.includes("place")||!e.method||e.method.toUpperCase()!=="POST")}async handleCapture(a,e,r){try{let s=null,n=null,i=null;if(e.body){let d;if(typeof e.body=="string")try{d=JSON.parse(e.body)}catch{d=e.body}else d=e.body;d.coords&&Array.isArray(d.coords)?s=d.coords:d.x!==void 0&&d.y!==void 0?s=[d.x,d.y]:d.coordinates&&(s=d.coordinates)}if(!s){let c=a.toString().match(/[?&](?:x|coords?)=([^&]+)/);if(c){let f=decodeURIComponent(c[1]);try{s=JSON.parse(f)}catch{let o=f.split(",");o.length>=2&&(s=[parseInt(o[0]),parseInt(o[1])])}}}if(s&&s.length>=2){let d=s[0],c=s[1];n=Math.floor(d/3e3),i=Math.floor(c/3e3),u(`\u{1F3AF} Coordenadas capturadas: global(${d},${c}) -> tile(${n},${i})`),r.ok?(this.disable(),this.callback&&this.callback({success:!0,tileX:n,tileY:i,globalX:d,globalY:c,localX:d%3e3,localY:c%3e3})):u("\u26A0\uFE0F Captura realizada pero la respuesta no fue exitosa")}}catch(s){u("Error procesando captura:",s)}}disable(){this.active&&(this.active=!1,window.fetch=this.originalFetch,this.callback=null,u("\u{1F512} Captura de coordenadas desactivada"))}},N=new Y;(async function(){"use strict";var f,o;if((f=window.__wplaceBot)!=null&&f.farmRunning){alert("Auto-Farm ya est\xE1 corriendo.");return}if((o=window.__wplaceBot)!=null&&o.imageRunning){alert("Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.");return}window.__wplaceBot||(window.__wplaceBot={}),window.__wplaceBot.farmRunning=!0,u("\u{1F680} Iniciando WPlace Farm Bot (versi\xF3n modular)");function t(l){let h=l.TILE_X===g.TILE_X&&l.TILE_Y===g.TILE_Y,p=!localStorage.getItem("WPA_UI_CFG"),y=!Number.isFinite(l.TILE_X)||!Number.isFinite(l.TILE_Y),v=h||p||y;return u(`Verificaci\xF3n calibraci\xF3n: defaults=${h}, noConfig=${p}, invalid=${y}, coords=(${l.TILE_X},${l.TILE_Y})`),v}function a(){u("\u{1F575}\uFE0F Activando captura de coordenadas..."),N.enable(l=>{l.success?(e.TILE_X=l.tileX,e.TILE_Y=l.tileY,I(e),i.updateConfig(),i.setStatus(`\u{1F3AF} Coordenadas capturadas: tile(${l.tileX},${l.tileY})`,"success"),u(`\u2705 Coordenadas capturadas autom\xE1ticamente: tile(${l.tileX},${l.tileY})`)):i.setStatus("\u274C No se pudieron capturar coordenadas","error")}),i.setStatus("\u{1F4F8} Pinta un p\xEDxel manualmente para capturar coordenadas...","status")}let e={...g,...A(g)};if(!e.SITEKEY){let l=document.querySelector("*[data-sitekey]");l?(e.SITEKEY=l.getAttribute("data-sitekey"),u(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${e.SITEKEY.substring(0,20)}...`),I(e)):u("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function r(){try{let l=await P();if(l.success&&l.data){m.charges.count=l.data.charges||0,m.charges.max=l.data.maxCharges||50,m.charges.regen=l.data.chargeRegen||3e4,m.user=l.data.user,e.CHARGE_REGEN_MS=m.charges.regen;let h=await s();return m.health=h,i.updateStats(m.painted,m.charges.count,m.retryCount,h),l.data}return null}catch(l){return u("Error actualizando estad\xEDsticas:",l),null}}async function s(){try{return await Z()}catch(l){return u("Error verificando health:",l),{up:!1,error:l.message}}}async function n(){return await X(e,m,i.setStatus,i.flashEffect,()=>P(),s)}let i=Q(e,async()=>{if(m.running){i.setStatus("\u26A0\uFE0F El bot ya est\xE1 ejecut\xE1ndose","error");return}if(t(e)){i.setStatus("\u{1F3AF} Calibrando autom\xE1ticamente...","status");let p=await k(e);if(p.success)i.setStatus(`\u2705 Calibrado: tile(${p.tileX},${p.tileY})`,"success"),i.updateConfig();else{i.setStatus("\u274C Error en calibraci\xF3n. Configura manualmente.","error");return}}if(i.setStatus("\u{1F50D} Verificando conectividad...","status"),!(await s()).up){i.setStatus("\u{1F534} Backend no disponible. Verifica tu conexi\xF3n.","error");return}if(i.setStatus("\u{1F504} Obteniendo informaci\xF3n de sesi\xF3n...","status"),!await r()){i.setStatus("\u274C Error obteniendo sesi\xF3n. Verifica tu login.","error");return}i.setStatus("\u{1F680} Iniciando bot...","status"),i.updateButtonStates(!0),oe(e,m,i.setStatus,i.flashEffect,r,s,r)},()=>{m.running=!1,window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),i.setStatus("\u23F9\uFE0F Deteniendo bot...","status"),i.updateButtonStates(!1)},async()=>{i.setStatus("\u{1F3AF} Calibrando posici\xF3n...","status");let l=await k(e);l.success?(i.setStatus(`\u2705 Calibrado: tile(${l.tileX},${l.tileY})`,"success"),i.updateConfig()):i.setStatus(`\u274C Error en calibraci\xF3n: ${l.error||"Desconocido"}`,"error")}),d=i.getElement().shadowRoot.getElementById("capture-btn");d&&d.addEventListener("click",a);let c=i.getElement().shadowRoot.getElementById("once-btn");c&&c.addEventListener("click",async()=>{if(m.running){i.setStatus("\u26A0\uFE0F Det\xE9n el bot primero","error");return}await r(),i.setStatus("\u{1F3A8} Pintando una vez...","status"),await n()?i.setStatus("\u2705 P\xEDxel pintado exitosamente","success"):i.setStatus("\u274C Error al pintar p\xEDxel","error")}),await r(),window.addEventListener("wplace-batch-painted",l=>{u(`\u{1F3A8} Lote pintado: ${l.detail.pixelCount} p\xEDxeles en tile(${l.detail.tileX},${l.detail.tileY})`)}),window.WPAUI={once:n,get:()=>({...e}),capture:a,refreshCanvas:()=>{m.last&&u(`Refrescando canvas en posici\xF3n (${m.last.x},${m.last.y})`)},verifyPixel:async(l,h)=>(u(`Verificando p\xEDxel en (${l},${h})...`),{verified:!0,x:l,y:h}),getStats:()=>({painted:m.painted,last:m.last,charges:m.charges,user:m.user,running:m.running,minCharges:e.MIN_CHARGES,delay:e.DELAY_MS,tileInfo:{tileX:e.TILE_X,tileY:e.TILE_Y,tileSize:e.TILE_SIZE,safeMargin:Math.floor(e.TILE_SIZE*.05),safeArea:{minX:Math.floor(e.TILE_SIZE*.05),maxX:e.TILE_SIZE-Math.floor(e.TILE_SIZE*.05)-1,minY:Math.floor(e.TILE_SIZE*.05),maxY:e.TILE_SIZE-Math.floor(e.TILE_SIZE*.05)-1}}}),setPixelsPerBatch:l=>{e.PIXELS_PER_BATCH=_(l,1,50),I(e),i.updateConfig(),u(`P\xEDxeles por lote configurado a: ${e.PIXELS_PER_BATCH}`)},setMinCharges:l=>{e.MIN_CHARGES=Math.max(0,l),I(e),i.updateConfig(),u(`Cargas m\xEDnimas configuradas a: ${e.MIN_CHARGES}`)},setDelay:l=>{e.DELAY_MS=Math.max(1e3,l*1e3),I(e),i.updateConfig(),u(`Delay configurado a: ${e.DELAY_MS}ms`)},diagnose:()=>{var p;let l=window.WPAUI.getStats(),h={configValid:Number.isFinite(e.TILE_X)&&Number.isFinite(e.TILE_Y),hasCharges:m.charges.count>0,backendHealthy:((p=m.health)==null?void 0:p.up)||!1,userLoggedIn:!!m.user,coordinates:`(${e.TILE_X},${e.TILE_Y})`,safeArea:l.tileInfo.safeArea,recommendations:[]};return h.configValid||h.recommendations.push("Calibrar coordenadas del tile"),h.hasCharges||h.recommendations.push("Esperar a que se regeneren las cargas"),h.backendHealthy||h.recommendations.push("Verificar conexi\xF3n al backend"),h.userLoggedIn||h.recommendations.push("Iniciar sesi\xF3n en la plataforma"),console.table(h),h},checkHealth:s,resetConfig:()=>{q(),e={...g},i.updateConfig(),u("Configuraci\xF3n reseteada a valores por defecto")},debugRetries:()=>({currentRetries:m.retryCount,inCooldown:m.inCooldown,nextPaintTime:m.nextPaintTime,cooldownEndTime:m.cooldownEndTime}),forceClearCooldown:()=>{m.inCooldown=!1,m.nextPaintTime=0,m.cooldownEndTime=0,m.retryCount=0,u("Cooldown forzado a limpiar")},simulateError:(l=500)=>{u(`Simulando error ${l} para testing...`),i.setStatus(`\u{1F9EA} Simulando error ${l}`,"error")}},window.addEventListener("beforeunload",()=>{m.running=!1,window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),N.disable(),i.destroy()}),u("\u2705 Farm Bot inicializado correctamente"),u("\u{1F4A1} Usa console.log(window.WPAUI) para ver la API disponible")})().catch(t=>{console.error("[BOT] Error en Auto-Farm:",t),window.__wplaceBot&&(window.__wplaceBot.farmRunning=!1),alert("Auto-Farm: error inesperado. Revisa consola.")});})();
