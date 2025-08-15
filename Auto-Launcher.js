/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T11:30:57.325Z */
(()=>{var a=(...o)=>console.log("[WPA-UI]",...o);function k(o=null){let t=document.createElement("div");o&&(t.id=o),t.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let r=t.attachShadow({mode:"open"});return document.body.appendChild(t),{host:t,root:r}}function S(o,t){let r=0,m=0,s=0,h=0;o.style.cursor="move",o.addEventListener("mousedown",n);function n(p){p.target.closest(".header-btn, .wplace-header-btn")||(p.preventDefault(),s=p.clientX,h=p.clientY,document.addEventListener("mouseup",b),document.addEventListener("mousemove",u))}function u(p){p.preventDefault(),r=s-p.clientX,m=h-p.clientY,s=p.clientX,h=p.clientY,t.style.top=t.offsetTop-m+"px",t.style.left=t.offsetLeft-r+"px"}function b(){document.removeEventListener("mouseup",b),document.removeEventListener("mousemove",u)}}var d={RAW_BASE:"https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main",REFRESH_INTERVAL:6e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000"}},C={es:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"}},i={me:null,health:null,refreshTimer:null,selectedBot:null};function T({onSelectBot:o,onLaunch:t,onClose:r,updateUserInfo:m,updateHealthInfo:s}){a("\u{1F39B}\uFE0F Creando interfaz del Launcher");let h=document.getElementById("wpl-panel");h&&(h.remove(),a("\u{1F5D1}\uFE0F Panel existente removido"));let n=C.es,{host:u,root:b}=k("wpl-panel"),p=document.createElement("style");p.textContent=`
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: ${d.THEME.primary};
      border: 1px solid ${d.THEME.accent};
      border-radius: 10px;
      color: ${d.THEME.text};
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
      background: ${d.THEME.secondary};
      padding: 10px 12px;
      color: ${d.THEME.highlight};
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
      background: ${d.THEME.accent};
      color: white;
    }
    
    .btn.primary:hover:not(:disabled) {
      background: ${d.THEME.highlight};
    }
    
    .btn.ghost {
      background: transparent;
      border: 1px solid ${d.THEME.accent};
      color: ${d.THEME.text};
    }
    
    .btn.ghost:hover:not(:disabled) {
      background: ${d.THEME.accent}22;
    }
    
    .btn.close {
      flex: 0 0 auto;
      padding: 6px 8px;
    }
    
    .card {
      background: ${d.THEME.secondary};
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
      outline: 2px solid ${d.THEME.highlight};
    }
  `,b.appendChild(p);let l=document.createElement("div");l.className="panel",l.innerHTML=`
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
  `,b.appendChild(l);let e={header:l.querySelector(".header"),farmBtn:l.querySelector(".farm-btn"),imageBtn:l.querySelector(".image-btn"),launchBtn:l.querySelector(".launch-btn"),cancelBtn:l.querySelector(".cancel-btn"),closeBtn:l.querySelector(".close-btn"),statusText:l.querySelector(".status-text"),choice:l.querySelector(".choice"),userName:l.querySelector(".user-name"),userCharges:l.querySelector(".user-charges"),backendStatus:l.querySelector(".backend-status"),databaseStatus:l.querySelector(".database-status"),uptime:l.querySelector(".uptime")};S(e.header,l);let E=null;function w(c){E=c,i.selectedBot=c,e.choice.textContent=c==="farm"?n.autoFarm:n.autoImage,e.launchBtn.disabled=!1,c==="farm"?(e.farmBtn.classList.add("primary"),e.farmBtn.classList.remove("ghost"),e.imageBtn.classList.add("ghost"),e.imageBtn.classList.remove("primary")):(e.imageBtn.classList.add("primary"),e.imageBtn.classList.remove("ghost"),e.farmBtn.classList.add("ghost"),e.farmBtn.classList.remove("primary")),e.statusText.textContent=n.readyToLaunch,o&&o(c)}e.farmBtn.addEventListener("click",()=>w("farm")),e.imageBtn.addEventListener("click",()=>w("image")),e.launchBtn.addEventListener("click",async()=>{if(E){e.launchBtn.disabled=!0,e.launchBtn.textContent=n.loading,e.statusText.textContent=n.downloading;try{t&&(await t(E),x())}catch(c){a("\u274C Error en launch:",c),alert(n.loadErrorMsg),e.launchBtn.disabled=!1,e.launchBtn.textContent=n.launch,e.statusText.textContent=n.loadError}}});function x(){i.refreshTimer&&(window.clearInterval(i.refreshTimer),i.refreshTimer=null),u.remove(),a("\u{1F9F9} Launcher UI eliminado")}e.cancelBtn.addEventListener("click",x),e.closeBtn.addEventListener("click",x),document.addEventListener("keydown",c=>{c.key==="Escape"&&x()},{once:!0});function A(c){var g,L;if(!c){e.userName.textContent="-",e.userCharges.textContent="-";return}let v=c.name||c.username||"-",f=Math.floor(Number((L=(g=c.charges)==null?void 0:g.count)!=null?L:NaN));e.userName.textContent=v,e.userCharges.textContent=Number.isFinite(f)?String(f):"-"}function _(c){if(!c){e.backendStatus.textContent=n.offline,e.databaseStatus.textContent="-",e.uptime.textContent="-";return}let v=!!c.up,f=c.database,g=c.uptime||"-";e.backendStatus.textContent=v?n.online:n.offline,f==null?e.databaseStatus.textContent="-":e.databaseStatus.textContent=f?n.ok:n.error,e.uptime.textContent=typeof g=="number"?`${g}s`:g||"-"}return a("\u2705 Launcher UI creado exitosamente"),{setUserInfo:A,setHealthInfo:_,cleanup:x,selectBot:w,getSelectedBot:()=>E}}async function y(){var o,t;a("\u{1F4E1} Obteniendo informaci\xF3n de sesi\xF3n...");try{let r=await fetch("https://backend.wplace.live/me",{credentials:"include"});if(!r.ok)throw new Error(`HTTP ${r.status}`);return i.me=await r.json(),a("\u2705 Informaci\xF3n de sesi\xF3n obtenida:",((o=i.me)==null?void 0:o.name)||((t=i.me)==null?void 0:t.username)||"Usuario"),i.me}catch(r){return a("\u274C Error obteniendo sesi\xF3n:",r.message),i.me=null,null}}async function B(){var o,t,r,m,s,h;a("\u{1F3E5} Verificando estado del backend...");try{let n=await fetch("https://backend.wplace.live/health",{method:"GET",credentials:"include"}),u=null;try{u=await n.json()}catch{u=null}n.ok&&u?(i.health={up:!!((o=u.up)==null||o),database:(m=(r=(t=u.database)==null?void 0:t.ok)!=null?r:u.database)!=null?m:void 0,uptime:(h=(s=u.uptime)!=null?s:u.uptimeHuman)!=null?h:typeof u.uptimeSeconds=="number"?`${u.uptimeSeconds}s`:void 0},a("\u2705 Estado del backend obtenido:",i.health)):(i.health={up:!1,database:!1,uptime:void 0},a("\u26A0\uFE0F Backend no responde correctamente"))}catch(n){a("\u274C Error verificando backend:",n.message),i.health={up:!1,database:!1,uptime:void 0}}return i.health}async function $(o,t){a(`\u{1F4E5} Descargando bot: ${o}`);try{let r=o==="farm"?`${t}/Auto-Farm.js`:`${t}/Auto-Image.js`;a(`\u{1F310} URL: ${r}`);let m=await fetch(r);if(!m.ok)throw new Error(`HTTP ${m.status}`);let s=await m.text();return a(`\u2705 Bot descargado (${s.length} chars), ejecutando...`),(0,eval)(s),a("\u{1F680} Bot ejecutado exitosamente"),!0}catch(r){throw a("\u274C Error descargando/ejecutando bot:",r.message),r}}async function H(){var o;if(a("\u{1F680} Iniciando WPlace Auto-Launcher (versi\xF3n modular)"),(o=window.__wplaceBot)!=null&&o.launcherRunning){alert("Auto-Launcher ya est\xE1 ejecut\xE1ndose.");return}window.__wplaceBot={...window.__wplaceBot,launcherRunning:!0};try{let t=T({onSelectBot:s=>{a(`\u{1F3AF} Bot seleccionado: ${s}`)},onLaunch:async s=>{a(`\u{1F680} Lanzando bot: ${s}`),await $(s,d.RAW_BASE)},onClose:()=>{a("\u{1F44B} Cerrando launcher"),window.__wplaceBot.launcherRunning=!1}});a("\u{1F4CA} Cargando informaci\xF3n inicial...");let r=await B();t.setHealthInfo(r);let m=await y();t.setUserInfo(m),i.refreshTimer=window.setInterval(async()=>{a("\u{1F504} Actualizando informaci\xF3n...");try{let[s,h]=await Promise.all([B(),y()]);t.setHealthInfo(s),t.setUserInfo(h)}catch(s){a("\u274C Error en actualizaci\xF3n peri\xF3dica:",s)}},d.REFRESH_INTERVAL),window.addEventListener("beforeunload",()=>{t.cleanup(),window.__wplaceBot.launcherRunning=!1}),a("\u2705 Auto-Launcher inicializado correctamente")}catch(t){throw a("\u274C Error inicializando Auto-Launcher:",t),window.__wplaceBot.launcherRunning=!1,t}}(()=>{"use strict";var o;if((o=window.__wplaceBot)!=null&&o.running){alert("WPlace BOT ya est\xE1 corriendo.");return}window.__wplaceBot={running:!0},H().catch(t=>{console.error("[BOT] Error en Auto-Launcher:",t),window.__wplaceBot.running=!1,alert("Auto-Launcher: error inesperado. Revisa consola.")})})();})();
