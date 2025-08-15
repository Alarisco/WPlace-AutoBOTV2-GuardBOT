/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T11:30:57.325Z */
(()=>{var d=(...a)=>console.log("[WPA-UI]",...a);var g={SITEKEY:"0x4AAAAAABpqJe8FO0N84q0F",TILE_X:1086,TILE_Y:1565,TILE_SIZE:3e3,DELAY_MS:15e3,MIN_CHARGES:10,CHARGE_REGEN_MS:3e4,PIXELS_PER_BATCH:20,COLOR_MIN:1,COLOR_MAX:32,COLOR_MODE:"random",COLOR_FIXED:1,CUSTOM_PALETTE:["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF"],UI_THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000",running:"#00cc00"}},u={running:!1,painted:0,last:null,charges:{count:0,max:0,cooldownMs:3e4},user:null,panel:null,captureMode:!1,originalFetch:window.fetch,retryCount:0,inCooldown:!1,nextPaintTime:0,cooldownEndTime:0,health:null};function I(a){try{localStorage.setItem("WPA_UI_CFG",JSON.stringify(a))}catch{}}function A(a){try{let n=localStorage.getItem("WPA_UI_CFG");if(n){let e={...a,...JSON.parse(n)};return!Number.isFinite(e.TILE_X)||!Number.isFinite(e.TILE_Y)?(console.log("[WPA-UI]",`Configuraci\xF3n corrupta detectada: coordenadas (${e.TILE_X},${e.TILE_Y}) inv\xE1lidas`),O(),{...a}):e}}catch{}return{...a}}function O(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n del farm reseteada")}catch{}}function q(){try{localStorage.removeItem("WPA_UI_CFG"),console.log("[WPA-UI]","Configuraci\xF3n reseteada a valores seguros")}catch{}}var P="https://backend.wplace.live";async function R(){var a,n,e;try{let r=await fetch(`${P}/me`,{credentials:"include"}).then(c=>c.json()),s=r||null,o=(r==null?void 0:r.charges)||{},i={count:(a=o.count)!=null?a:0,max:(n=o.max)!=null?n:0,cooldownMs:(e=o.cooldownMs)!=null?e:3e4};return{success:!0,data:{user:s,charges:i.count,maxCharges:i.max,chargeRegen:i.cooldownMs}}}catch(r){return{success:!1,error:r.message,data:{user:null,charges:0,maxCharges:0,chargeRegen:3e4}}}}async function Z(){try{let a=await fetch(`${P}/health`,{method:"GET",credentials:"include"});return a.ok?{...await a.json(),lastCheck:Date.now(),status:"online"}:{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"error",statusCode:a.status}}catch(a){return{database:!1,up:!1,uptime:"N/A",lastCheck:Date.now(),status:"offline",error:a.message}}}async function J(a,n,e,r,s){try{let o=JSON.stringify({colors:n,coords:a,t:e}),i=new AbortController,c=setTimeout(()=>i.abort(),15e3),l=await fetch(`${P}/s0/pixel/${r}/${s}`,{method:"POST",credentials:"include",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:o,signal:i.signal});clearTimeout(c);let p=null;try{let t=await l.text();t&&(p=JSON.parse(t))}catch{p={}}return{status:l.status,json:p,success:l.ok}}catch(o){return{status:0,json:{error:o.message},success:!1}}}function C(a,n,e){return Math.max(n,Math.min(e,a))}function K(a,n){let e=0,r=0,s=0,o=0;a.style.cursor="move",a.addEventListener("mousedown",i);function i(p){p.preventDefault(),s=p.clientX,o=p.clientY,document.addEventListener("mouseup",l),document.addEventListener("mousemove",c)}function c(p){p.preventDefault(),e=s-p.clientX,r=o-p.clientY,s=p.clientX,o=p.clientY;let t=n.offsetTop-r,f=n.offsetLeft-e;n.style.top=Math.max(0,t)+"px",n.style.left=Math.max(0,f)+"px"}function l(){document.removeEventListener("mouseup",l),document.removeEventListener("mousemove",c)}}function Q(a,n,e,r){var b,S,M,$,D,z,H,U,j,W,G,V;let s=document.createElement("div");s.id="wplace-farm-ui",s.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let o=s.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=`
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
  `,o.appendChild(i);let c=document.createElement("div");c.className="wplace-container";let l={minimized:!1,showAdvanced:!1};c.innerHTML=`
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
  `,o.appendChild(c),document.body.appendChild(s);let p=o.querySelector(".wplace-header");K(p,s);let t={minimizeBtn:o.querySelector(".wplace-minimize"),content:o.querySelector(".wplace-content"),status:o.getElementById("status"),paintedCount:o.getElementById("painted-count"),chargesCount:o.getElementById("charges-count"),retryCount:o.getElementById("retry-count"),tilePos:o.getElementById("tile-pos"),startBtn:o.getElementById("start-btn"),stopBtn:o.getElementById("stop-btn"),calibrateBtn:o.getElementById("calibrate-btn"),onceBtn:o.getElementById("once-btn"),healthStatus:o.getElementById("health-status"),delayInput:o.getElementById("delay-input"),pixelsInput:o.getElementById("pixels-input"),minChargesInput:o.getElementById("min-charges-input"),colorModeSelect:o.getElementById("color-mode-select"),colorRangeRow:o.getElementById("color-range-row"),colorFixedRow:o.getElementById("color-fixed-row"),colorMinInput:o.getElementById("color-min-input"),colorMaxInput:o.getElementById("color-max-input"),colorFixedInput:o.getElementById("color-fixed-input"),advancedToggle:o.getElementById("advanced-toggle"),advancedSection:o.getElementById("advanced-section"),advancedArrow:o.getElementById("advanced-arrow"),tileXInput:o.getElementById("tile-x-input"),tileYInput:o.getElementById("tile-y-input"),customPaletteInput:o.getElementById("custom-palette-input"),saveBtn:o.getElementById("save-btn"),loadBtn:o.getElementById("load-btn"),resetBtn:o.getElementById("reset-btn"),captureBtn:o.getElementById("capture-btn")};function f(){t.delayInput.value=a.DELAY_MS,t.pixelsInput.value=a.PIXELS_PER_BATCH,t.minChargesInput.value=a.MIN_CHARGES,t.colorModeSelect.value=a.COLOR_MODE,t.colorMinInput.value=a.COLOR_MIN,t.colorMaxInput.value=a.COLOR_MAX,t.colorFixedInput.value=a.COLOR_FIXED,t.tileXInput.value=a.TILE_X||"",t.tileYInput.value=a.TILE_Y||"",t.customPaletteInput.value=(a.CUSTOM_PALETTE||[]).join(","),m(),v()}function h(){a.DELAY_MS=parseInt(t.delayInput.value)||g.DELAY_MS,a.PIXELS_PER_BATCH=C(parseInt(t.pixelsInput.value)||g.PIXELS_PER_BATCH,1,50),a.MIN_CHARGES=parseFloat(t.minChargesInput.value)||g.MIN_CHARGES,a.COLOR_MODE=t.colorModeSelect.value,a.COLOR_MIN=C(parseInt(t.colorMinInput.value)||g.COLOR_MIN,1,32),a.COLOR_MAX=C(parseInt(t.colorMaxInput.value)||g.COLOR_MAX,1,32),a.COLOR_FIXED=C(parseInt(t.colorFixedInput.value)||g.COLOR_FIXED,1,32),a.COLOR_MIN>a.COLOR_MAX&&(a.COLOR_MAX=a.COLOR_MIN,t.colorMaxInput.value=a.COLOR_MAX);let w=parseInt(t.tileXInput.value),x=parseInt(t.tileYInput.value);Number.isFinite(w)&&(a.TILE_X=w),Number.isFinite(x)&&(a.TILE_Y=x),v()}function m(){let w=t.colorModeSelect.value;t.colorRangeRow.style.display=w==="random"?"flex":"none",t.colorFixedRow.style.display=w==="fixed"?"flex":"none"}function v(){t.tilePos&&(t.tilePos.textContent=`${a.TILE_X||0},${a.TILE_Y||0}`)}(b=t.minimizeBtn)==null||b.addEventListener("click",()=>{l.minimized=!l.minimized,t.content.classList.toggle("minimized",l.minimized),t.minimizeBtn.textContent=l.minimized?"+":"\u2212"}),(S=t.startBtn)==null||S.addEventListener("click",()=>{h(),n(),_(!0)}),(M=t.stopBtn)==null||M.addEventListener("click",()=>{e(),_(!1)}),($=t.calibrateBtn)==null||$.addEventListener("click",()=>{r()}),(D=t.onceBtn)==null||D.addEventListener("click",()=>{h(),window.WPAUI&&window.WPAUI.once&&window.WPAUI.once()}),(z=t.colorModeSelect)==null||z.addEventListener("change",()=>{m(),h()}),(H=t.customPaletteInput)==null||H.addEventListener("input",()=>{h()}),(U=t.advancedToggle)==null||U.addEventListener("click",()=>{l.showAdvanced=!l.showAdvanced,t.advancedSection.style.display=l.showAdvanced?"block":"none",t.advancedArrow.textContent=l.showAdvanced?"\u25BC":"\u25B6"}),["delayInput","pixelsInput","minChargesInput","colorMinInput","colorMaxInput","colorFixedInput","tileXInput","tileYInput"].forEach(w=>{var x;(x=t[w])==null||x.addEventListener("change",h)}),(j=t.saveBtn)==null||j.addEventListener("click",()=>{h(),I(a),y("\u{1F4BE} Configuraci\xF3n guardada","success")}),(W=t.loadBtn)==null||W.addEventListener("click",()=>{let w=A(g);Object.assign(a,w),f(),y("\u{1F4C1} Configuraci\xF3n cargada","success")}),(G=t.resetBtn)==null||G.addEventListener("click",()=>{O(),Object.assign(a,g),f(),y("\u{1F504} Configuraci\xF3n reiniciada","success")}),(V=t.captureBtn)==null||V.addEventListener("click",()=>{y("\u{1F4F8} Pinta un p\xEDxel manualmente para capturar coordenadas...","status")});function _(w){t.startBtn&&(t.startBtn.disabled=w),t.stopBtn&&(t.stopBtn.disabled=!w)}function y(w,x="status"){t.status&&(t.status.textContent=w,t.status.className=`wplace-status ${x}`,d(`Status: ${w}`))}function L(w,x,re=0,B=null){t.paintedCount&&(t.paintedCount.textContent=w||0),t.chargesCount&&(t.chargesCount.textContent=typeof x=="number"?x.toFixed(1):"0"),t.retryCount&&(t.retryCount.textContent=re||0),t.healthStatus&&B&&(t.healthStatus.textContent=B.up?"\u{1F7E2} Backend Online":"\u{1F534} Backend Offline",t.healthStatus.className=`wplace-health ${B.up?"online":"offline"}`)}function E(){c.style.boxShadow="0 0 20px #48bb78",setTimeout(()=>{c.style.boxShadow="0 10px 25px rgba(0,0,0,0.3)"},200)}return f(),{setStatus:y,updateStats:L,flashEffect:E,updateButtonStates:_,destroy:()=>{document.body.removeChild(s)},updateConfig:f,getElement:()=>s}}async function k(a){try{d("\u{1F3AF} Iniciando auto-calibraci\xF3n del tile...");let n=new window.URLSearchParams(window.location.search),e=window.location.hash,r,s;if(n.has("x")&&n.has("y")&&(r=parseInt(n.get("x")),s=parseInt(n.get("y"))),!r&&!s&&e){let o=e.match(/#(-?\d+),(-?\d+)/);o&&(r=parseInt(o[1]),s=parseInt(o[2]))}if(!r&&!s){let o=document.querySelectorAll("[data-x], [data-y], .coordinates, .position");for(let i of o){let c=i.getAttribute("data-x")||i.getAttribute("x"),l=i.getAttribute("data-y")||i.getAttribute("y");if(c&&l){r=parseInt(c),s=parseInt(l);break}}}if(!r&&!s){let i=(document.body.textContent||"").match(/(?:tile|pos|position)?\s*[([]?\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*[)\]]?/i);i&&(r=parseInt(i[1]),s=parseInt(i[2]))}return(!Number.isFinite(r)||!Number.isFinite(s))&&(r=0,s=0,d("\u26A0\uFE0F No se pudieron detectar coordenadas autom\xE1ticamente, usando (0,0)")),(Math.abs(r)>1e6||Math.abs(s)>1e6)&&(d("\u26A0\uFE0F Coordenadas detectadas parecen incorrectas, limitando a rango v\xE1lido"),r=Math.max(-1e6,Math.min(1e6,r)),s=Math.max(-1e6,Math.min(1e6,s))),a.TILE_X=r,a.TILE_Y=s,d(`\u2705 Tile calibrado autom\xE1ticamente: (${r}, ${s})`),I(a),{tileX:r,tileY:s,success:!0}}catch(n){return d("\u274C Error en auto-calibraci\xF3n:",n),{tileX:0,tileY:0,success:!1,error:n.message}}}var ee=!1;async function se(){if(!(ee||window.turnstile))return new Promise((a,n)=>{let e=document.createElement("script");e.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",e.async=!0,e.defer=!0,e.onload=()=>{ee=!0,a()},e.onerror=()=>n(new Error("No se pudo cargar Turnstile")),document.head.appendChild(e)})}async function ie(a,n="paint"){var e;if(await se(),typeof((e=window.turnstile)==null?void 0:e.execute)=="function")try{let r=await window.turnstile.execute(a,{action:n});if(r&&r.length>20)return r}catch{}return await new Promise(r=>{let s=document.createElement("div");s.style.position="fixed",s.style.left="-9999px",document.body.appendChild(s),window.turnstile.render(s,{sitekey:a,callback:o=>{document.body.removeChild(s),r(o)}})})}async function te(a){return ie(a,"paint")}var le=a=>Math.floor(Math.random()*a);function ce(a){let n=Math.floor(a.TILE_SIZE*.05),e=a.TILE_SIZE-n*2;if(e<=0)return d("Error: \xE1rea segura inv\xE1lida, usando coordenadas b\xE1sicas"),[Math.floor(Math.random()*a.TILE_SIZE),Math.floor(Math.random()*a.TILE_SIZE)];let r=n+Math.floor(Math.random()*e),s=n+Math.floor(Math.random()*e);return Math.random()<.1&&d(`Coordenadas locales generadas: (${r},${s}) en \xE1rea segura [${n}-${n+e-1}]`),[r,s]}function ae(a,n){let e=[];for(let r=0;r<a;r++){let s=ce(n);e.push(...s)}return e}function ne(a,n){let e=[];for(let r=0;r<a;r++)e.push(de(n));return e}function de(a){if(a.COLOR_MODE==="fixed")return a.COLOR_FIXED;{let n=a.COLOR_MAX-a.COLOR_MIN+1;return a.COLOR_MIN+le(n)}}var F=a=>new Promise(n=>setTimeout(n,a));async function T(a,n,e){let s=Date.now()+a;for(;Date.now()<s&&(!e||e.running);){let o=s-Date.now();n&&n(o),await F(Math.min(1e3,o))}}async function ue(a,n,e){try{let r=document.querySelectorAll("canvas");for(let s of r){let o=s.getContext("2d");if(o){let i=typeof e=="number"?`#${e.toString(16).padStart(6,"0")}`:e;o.fillStyle=i,o.fillRect(a,n,1,1),typeof window!="undefined"&&window.Event&&s.dispatchEvent(new window.Event("pixel-updated"))}}}catch(r){d("Error actualizando canvas:",r)}}async function pe(a,n){try{let e=`[data-tile="${a}-${n}"], .tile-${a}-${n}, [data-tile-x="${a}"][data-tile-y="${n}"]`,r=document.querySelector(e);r?(r.classList.add("tile-updating"),setTimeout(()=>{r.classList.remove("tile-updating"),r.classList.add("tile-updated"),setTimeout(()=>r.classList.remove("tile-updated"),1e3)},100),d(`Tile (${a},${n}) actualizado visualmente`)):(document.querySelectorAll("canvas").forEach(o=>{let i=o.getContext("2d");if(i){let c=i.getImageData(0,0,1,1);i.putImageData(c,0,0)}}),d(`Actualizaci\xF3n visual gen\xE9rica realizada para tile (${a},${n})`))}catch(e){d("Error en actualizaci\xF3n visual del tile:",e)}}async function me(a,n,e,r,s){var v,_,y,L;if(!Number.isFinite(a.TILE_X)||!Number.isFinite(a.TILE_Y))return e(`\u{1F6AB} Coordenadas del tile inv\xE1lidas (${a.TILE_X},${a.TILE_Y}). Calibra primero`,"error"),d("Pintado cancelado: coordenadas del tile inv\xE1lidas"),!1;let o=Math.floor(n.charges.count);if(o<1)return e("\u{1F50B} Sin cargas disponibles. Esperando...","error"),!1;let i=Math.min(o,a.PIXELS_PER_BATCH,50),c=Math.max(1,i);c<a.PIXELS_PER_BATCH&&d(`Ajustando p\xEDxeles por cargas completas disponibles: ${c}/${a.PIXELS_PER_BATCH} (${o} cargas completas de ${n.charges.count.toFixed(2)} totales)`);let l=ae(c,a),p=ne(c,a),t=l[0],f=l[1];e(`\u{1F3A8} Pintando ${c} p\xEDxeles (${o} cargas completas) en tile(${a.TILE_X},${a.TILE_Y}) local(${t},${f})...`,"status");let h=await te(a.SITEKEY),m=await J(l,p,h,a.TILE_X,a.TILE_Y);if(n.last={x:t,y:f,color:p[0],pixelCount:c,availableCharges:o,status:m.status,json:m.json},m.status===200&&m.json&&(m.json.painted>0||m.json.painted===c)){let E=m.json.painted||c;n.painted+=E,n.retryCount=0;for(let b=0;b<l.length;b+=2){let S=l[b],M=l[b+1],$=p[Math.floor(b/2)];await ue(S,M,$)}if(await pe(a.TILE_X,a.TILE_Y),await s(),e(`\u2705 Lote pintado: ${E}/${c} p\xEDxeles (${o} cargas usadas)`,"success"),r(),typeof window!="undefined"&&window.CustomEvent){let b=new window.CustomEvent("wplace-batch-painted",{detail:{firstX:t,firstY:f,pixelCount:E,totalPixels:c,colors:p,coords:l,tileX:a.TILE_X,tileY:a.TILE_Y,timestamp:Date.now()}});window.dispatchEvent(b)}return!0}if(m.status===403)e("\u26A0\uFE0F 403 (token expirado o Cloudflare). Reintentar\xE1...","error");else if(m.status===401)e("\u{1F512} 401 (no autorizado). Verifica tu sesi\xF3n.","error");else if(m.status===429)e("\u23F3 429 (l\xEDmite de tasa). Esperando...","error");else if(m.status===408)e("\u23F0 Timeout del servidor. Coordenadas problem\xE1ticas o servidor sobrecargado","error");else if(m.status===0)e("\u{1F310} Error de red. Verificando conectividad...","error");else if(m.status===500)e("\u{1F525} 500 (error interno del servidor). Reintentar\xE1...","error");else if(m.status===502||m.status===503||m.status===504)e(`\u{1F6AB} ${m.status} (servidor no disponible). Reintentar\xE1...`,"error");else if(m.status===404)e(`\u{1F5FA}\uFE0F 404 (tile no encontrado). Verificando coordenadas tile(${a.TILE_X},${a.TILE_Y})`,"error");else try{let E=await checkBackendHealth(),b=E!=null&&E.up?"\u{1F7E2} Online":"\u{1F534} Offline";e(`\u274C Error ${m.status}: ${((v=m.json)==null?void 0:v.message)||((_=m.json)==null?void 0:_.error)||"Fallo al pintar"} (Backend: ${b})`,"error")}catch{e(`\u274C Error ${m.status}: ${((y=m.json)==null?void 0:y.message)||((L=m.json)==null?void 0:L.error)||"Fallo al pintar"} (Health check fall\xF3)`,"error")}return d(`Fallo en pintado: status=${m.status}, json=`,m.json,"coords=",l,"colors=",p),!1}async function X(a,n,e,r,s,o){for(let l=1;l<=5;l++)try{if(await me(a,n,e,r,s))return n.retryCount=0,!0;if(n.retryCount=l,l<5){let t=3e3*Math.pow(2,l-1);e(`\u{1F504} Reintento ${l}/5 en ${t/1e3}s...`,"error"),await F(t)}}catch(p){if(d(`Error en intento ${l}:`,p),n.retryCount=l,l<5){let t=3e3*Math.pow(2,l-1);e(`\u{1F4A5} Error en intento ${l}/5, reintentando en ${t/1e3}s...`,"error"),await F(t)}}return n.retryCount=5,e("\u274C Fall\xF3 despu\xE9s de 5 intentos. Se requiere intervenci\xF3n manual.","error"),!1}async function oe(a,n,e,r,s,o,i){for(d("\u{1F680} Loop iniciado"),n.running=!0;n.running;)try{if(await i(),n.charges.count<a.MIN_CHARGES){let l=Math.max(0,(a.MIN_CHARGES-n.charges.count)*a.CHARGE_REGEN_MS);e(`\u23F3 Esperando cargas: ${n.charges.count.toFixed(1)}/${a.MIN_CHARGES} (${Math.round(l/1e3)}s)`,"status"),await T(Math.min(l,a.DELAY_MS),p=>{e(`\u23F3 Esperando cargas: ${n.charges.count.toFixed(1)}/${a.MIN_CHARGES} (~${Math.round(p/1e3)}s)`,"status")},n);continue}if(!await X(a,n,e,r,s,o)){e("\u{1F634} Esperando antes del siguiente intento...","error"),await T(a.DELAY_MS*2,l=>{e(`\u{1F634} Cooldown extendido: ${Math.round(l/1e3)}s`,"error")});continue}n.running&&await T(a.DELAY_MS,l=>{e(`\u{1F4A4} Esperando ${Math.round(l/1e3)}s hasta siguiente pintada...`,"status")})}catch(c){d("Error cr\xEDtico en loop:",c),e(`\u{1F4A5} Error cr\xEDtico: ${c.message}`,"error"),n.running&&await T(a.DELAY_MS*3,l=>{e(`\u{1F6A8} Recuper\xE1ndose de error cr\xEDtico: ${Math.round(l/1e3)}s`,"error")})}d("\u23F9\uFE0F Loop detenido"),e("\u23F9\uFE0F Bot detenido","status")}var Y=class{constructor(){this.active=!1,this.originalFetch=window.fetch,this.callback=null}enable(n){if(this.active){d("\u26A0\uFE0F Captura ya est\xE1 activa");return}this.active=!0,this.callback=n,d("\u{1F575}\uFE0F Captura de coordenadas activada. Pinta un p\xEDxel manualmente..."),window.fetch=async(...e)=>{let r=await this.originalFetch.apply(window,e);return this.active&&this.shouldCapture(e[0],e[1])&&await this.handleCapture(e[0],e[1],r.clone()),r},setTimeout(()=>{this.active&&(this.disable(),d("\u23F0 Captura de coordenadas expirada"))},3e4)}shouldCapture(n,e){if(!n||!e)return!1;let r=n.toString();return!(!r.includes("paint")&&!r.includes("pixel")&&!r.includes("place")||!e.method||e.method.toUpperCase()!=="POST")}async handleCapture(n,e,r){try{let s=null,o=null,i=null;if(e.body){let c;if(typeof e.body=="string")try{c=JSON.parse(e.body)}catch{c=e.body}else c=e.body;c.coords&&Array.isArray(c.coords)?s=c.coords:c.x!==void 0&&c.y!==void 0?s=[c.x,c.y]:c.coordinates&&(s=c.coordinates)}if(!s){let l=n.toString().match(/[?&](?:x|coords?)=([^&]+)/);if(l){let p=decodeURIComponent(l[1]);try{s=JSON.parse(p)}catch{let t=p.split(",");t.length>=2&&(s=[parseInt(t[0]),parseInt(t[1])])}}}if(s&&s.length>=2){let c=s[0],l=s[1];o=Math.floor(c/3e3),i=Math.floor(l/3e3),d(`\u{1F3AF} Coordenadas capturadas: global(${c},${l}) -> tile(${o},${i})`),r.ok?(this.disable(),this.callback&&this.callback({success:!0,tileX:o,tileY:i,globalX:c,globalY:l,localX:c%3e3,localY:l%3e3})):d("\u26A0\uFE0F Captura realizada pero la respuesta no fue exitosa")}}catch(s){d("Error procesando captura:",s)}}disable(){this.active&&(this.active=!1,window.fetch=this.originalFetch,this.callback=null,d("\u{1F512} Captura de coordenadas desactivada"))}},N=new Y;(async function(){"use strict";var p;if((p=window.__wplaceBot)!=null&&p.running){alert("WPlace BOT ya est\xE1 corriendo.");return}window.__wplaceBot={running:!0},d("\u{1F680} Iniciando WPlace Farm Bot (versi\xF3n modular)");function a(t){let f=t.TILE_X===g.TILE_X&&t.TILE_Y===g.TILE_Y,h=!localStorage.getItem("WPA_UI_CFG"),m=!Number.isFinite(t.TILE_X)||!Number.isFinite(t.TILE_Y),v=f||h||m;return d(`Verificaci\xF3n calibraci\xF3n: defaults=${f}, noConfig=${h}, invalid=${m}, coords=(${t.TILE_X},${t.TILE_Y})`),v}function n(){d("\u{1F575}\uFE0F Activando captura de coordenadas..."),N.enable(t=>{t.success?(e.TILE_X=t.tileX,e.TILE_Y=t.tileY,I(e),i.updateConfig(),i.setStatus(`\u{1F3AF} Coordenadas capturadas: tile(${t.tileX},${t.tileY})`,"success"),d(`\u2705 Coordenadas capturadas autom\xE1ticamente: tile(${t.tileX},${t.tileY})`)):i.setStatus("\u274C No se pudieron capturar coordenadas","error")}),i.setStatus("\u{1F4F8} Pinta un p\xEDxel manualmente para capturar coordenadas...","status")}let e={...g,...A(g)};if(!e.SITEKEY){let t=document.querySelector("*[data-sitekey]");t?(e.SITEKEY=t.getAttribute("data-sitekey"),d(`\u{1F4DD} Sitekey encontrada autom\xE1ticamente: ${e.SITEKEY.substring(0,20)}...`),I(e)):d("\u26A0\uFE0F No se pudo encontrar la sitekey autom\xE1ticamente")}async function r(){try{let t=await R();if(t.success&&t.data){u.charges.count=t.data.charges||0,u.charges.max=t.data.maxCharges||50,u.charges.regen=t.data.chargeRegen||3e4,u.user=t.data.user,e.CHARGE_REGEN_MS=u.charges.regen;let f=await s();return u.health=f,i.updateStats(u.painted,u.charges.count,u.retryCount,f),t.data}return null}catch(t){return d("Error actualizando estad\xEDsticas:",t),null}}async function s(){try{return await Z()}catch(t){return d("Error verificando health:",t),{up:!1,error:t.message}}}async function o(){return await X(e,u,i.setStatus,i.flashEffect,()=>R(),s)}let i=Q(e,async()=>{if(u.running){i.setStatus("\u26A0\uFE0F El bot ya est\xE1 ejecut\xE1ndose","error");return}if(a(e)){i.setStatus("\u{1F3AF} Calibrando autom\xE1ticamente...","status");let h=await k(e);if(h.success)i.setStatus(`\u2705 Calibrado: tile(${h.tileX},${h.tileY})`,"success"),i.updateConfig();else{i.setStatus("\u274C Error en calibraci\xF3n. Configura manualmente.","error");return}}if(i.setStatus("\u{1F50D} Verificando conectividad...","status"),!(await s()).up){i.setStatus("\u{1F534} Backend no disponible. Verifica tu conexi\xF3n.","error");return}if(i.setStatus("\u{1F504} Obteniendo informaci\xF3n de sesi\xF3n...","status"),!await r()){i.setStatus("\u274C Error obteniendo sesi\xF3n. Verifica tu login.","error");return}i.setStatus("\u{1F680} Iniciando bot...","status"),i.updateButtonStates(!0),oe(e,u,i.setStatus,i.flashEffect,r,s,r)},()=>{u.running=!1,window.__wplaceBot.running=!1,i.setStatus("\u23F9\uFE0F Deteniendo bot...","status"),i.updateButtonStates(!1)},async()=>{i.setStatus("\u{1F3AF} Calibrando posici\xF3n...","status");let t=await k(e);t.success?(i.setStatus(`\u2705 Calibrado: tile(${t.tileX},${t.tileY})`,"success"),i.updateConfig()):i.setStatus(`\u274C Error en calibraci\xF3n: ${t.error||"Desconocido"}`,"error")}),c=i.getElement().shadowRoot.getElementById("capture-btn");c&&c.addEventListener("click",n);let l=i.getElement().shadowRoot.getElementById("once-btn");l&&l.addEventListener("click",async()=>{if(u.running){i.setStatus("\u26A0\uFE0F Det\xE9n el bot primero","error");return}await r(),i.setStatus("\u{1F3A8} Pintando una vez...","status"),await o()?i.setStatus("\u2705 P\xEDxel pintado exitosamente","success"):i.setStatus("\u274C Error al pintar p\xEDxel","error")}),await r(),window.addEventListener("wplace-batch-painted",t=>{d(`\u{1F3A8} Lote pintado: ${t.detail.pixelCount} p\xEDxeles en tile(${t.detail.tileX},${t.detail.tileY})`)}),window.WPAUI={once:o,get:()=>({...e}),capture:n,refreshCanvas:()=>{u.last&&d(`Refrescando canvas en posici\xF3n (${u.last.x},${u.last.y})`)},verifyPixel:async(t,f)=>(d(`Verificando p\xEDxel en (${t},${f})...`),{verified:!0,x:t,y:f}),getStats:()=>({painted:u.painted,last:u.last,charges:u.charges,user:u.user,running:u.running,minCharges:e.MIN_CHARGES,delay:e.DELAY_MS,tileInfo:{tileX:e.TILE_X,tileY:e.TILE_Y,tileSize:e.TILE_SIZE,safeMargin:Math.floor(e.TILE_SIZE*.05),safeArea:{minX:Math.floor(e.TILE_SIZE*.05),maxX:e.TILE_SIZE-Math.floor(e.TILE_SIZE*.05)-1,minY:Math.floor(e.TILE_SIZE*.05),maxY:e.TILE_SIZE-Math.floor(e.TILE_SIZE*.05)-1}}}),setPixelsPerBatch:t=>{e.PIXELS_PER_BATCH=C(t,1,50),I(e),i.updateConfig(),d(`P\xEDxeles por lote configurado a: ${e.PIXELS_PER_BATCH}`)},setMinCharges:t=>{e.MIN_CHARGES=Math.max(0,t),I(e),i.updateConfig(),d(`Cargas m\xEDnimas configuradas a: ${e.MIN_CHARGES}`)},setDelay:t=>{e.DELAY_MS=Math.max(1e3,t*1e3),I(e),i.updateConfig(),d(`Delay configurado a: ${e.DELAY_MS}ms`)},diagnose:()=>{var h;let t=window.WPAUI.getStats(),f={configValid:Number.isFinite(e.TILE_X)&&Number.isFinite(e.TILE_Y),hasCharges:u.charges.count>0,backendHealthy:((h=u.health)==null?void 0:h.up)||!1,userLoggedIn:!!u.user,coordinates:`(${e.TILE_X},${e.TILE_Y})`,safeArea:t.tileInfo.safeArea,recommendations:[]};return f.configValid||f.recommendations.push("Calibrar coordenadas del tile"),f.hasCharges||f.recommendations.push("Esperar a que se regeneren las cargas"),f.backendHealthy||f.recommendations.push("Verificar conexi\xF3n al backend"),f.userLoggedIn||f.recommendations.push("Iniciar sesi\xF3n en la plataforma"),console.table(f),f},checkHealth:s,resetConfig:()=>{q(),e={...g},i.updateConfig(),d("Configuraci\xF3n reseteada a valores por defecto")},debugRetries:()=>({currentRetries:u.retryCount,inCooldown:u.inCooldown,nextPaintTime:u.nextPaintTime,cooldownEndTime:u.cooldownEndTime}),forceClearCooldown:()=>{u.inCooldown=!1,u.nextPaintTime=0,u.cooldownEndTime=0,u.retryCount=0,d("Cooldown forzado a limpiar")},simulateError:(t=500)=>{d(`Simulando error ${t} para testing...`),i.setStatus(`\u{1F9EA} Simulando error ${t}`,"error")}},window.addEventListener("beforeunload",()=>{u.running=!1,window.__wplaceBot.running=!1,N.disable(),i.destroy()}),d("\u2705 Farm Bot inicializado correctamente"),d("\u{1F4A1} Usa console.log(window.WPAUI) para ver la API disponible")})().catch(a=>{console.error("[BOT] Error en Auto-Farm:",a),window.__wplaceBot.running=!1,alert("Auto-Farm: error inesperado. Revisa consola.")});})();
