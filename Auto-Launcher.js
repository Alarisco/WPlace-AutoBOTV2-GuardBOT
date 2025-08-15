/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-15T12:12:32.119Z */
(()=>{var a=(...o)=>console.log("[WPA-UI]",...o);function k(o=null){let e=document.createElement("div");o&&(e.id=o),e.style.cssText=`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;let r=e.attachShadow({mode:"open"});return document.body.appendChild(e),{host:e,root:r}}function S(o,e){let r=0,m=0,s=0,h=0;o.style.cursor="move",o.addEventListener("mousedown",n);function n(p){p.target.closest(".header-btn, .wplace-header-btn")||(p.preventDefault(),s=p.clientX,h=p.clientY,document.addEventListener("mouseup",b),document.addEventListener("mousemove",u))}function u(p){p.preventDefault(),r=s-p.clientX,m=h-p.clientY,s=p.clientX,h=p.clientY,e.style.top=e.offsetTop-m+"px",e.style.left=e.offsetLeft-r+"px"}function b(){document.removeEventListener("mouseup",b),document.removeEventListener("mousemove",u)}}var d={RAW_BASE:"https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main",REFRESH_INTERVAL:6e4,THEME:{primary:"#000000",secondary:"#111111",accent:"#222222",text:"#ffffff",highlight:"#775ce3",success:"#00ff00",error:"#ff0000"}},C={es:{title:"WPlace AutoBOT",autoFarm:"\u{1F33E} Auto-Farm",autoImage:"\u{1F3A8} Auto-Image",selection:"Selecci\xF3n",user:"Usuario",charges:"Cargas",backend:"Backend",database:"Database",uptime:"Uptime",close:"Cerrar",launch:"Lanzar",loading:"Cargando\u2026",executing:"Ejecutando\u2026",downloading:"Descargando script\u2026",chooseBot:"Elige un bot y presiona Lanzar",readyToLaunch:"Listo para lanzar",loadError:"Error al cargar",loadErrorMsg:"No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",checking:"\u{1F504} Verificando...",online:"\u{1F7E2} Online",offline:"\u{1F534} Offline",ok:"\u{1F7E2} OK",error:"\u{1F534} Error",unknown:"-"}},i={me:null,health:null,refreshTimer:null,selectedBot:null};function T({onSelectBot:o,onLaunch:e,onClose:r,updateUserInfo:m,updateHealthInfo:s}){a("\u{1F39B}\uFE0F Creando interfaz del Launcher");let h=document.getElementById("wpl-panel");h&&(h.remove(),a("\u{1F5D1}\uFE0F Panel existente removido"));let n=C.es,{host:u,root:b}=k("wpl-panel"),p=document.createElement("style");p.textContent=`
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
  `,b.appendChild(l);let t={header:l.querySelector(".header"),farmBtn:l.querySelector(".farm-btn"),imageBtn:l.querySelector(".image-btn"),launchBtn:l.querySelector(".launch-btn"),cancelBtn:l.querySelector(".cancel-btn"),closeBtn:l.querySelector(".close-btn"),statusText:l.querySelector(".status-text"),choice:l.querySelector(".choice"),userName:l.querySelector(".user-name"),userCharges:l.querySelector(".user-charges"),backendStatus:l.querySelector(".backend-status"),databaseStatus:l.querySelector(".database-status"),uptime:l.querySelector(".uptime")};S(t.header,l);let w=null;function E(c){w=c,i.selectedBot=c,t.choice.textContent=c==="farm"?n.autoFarm:n.autoImage,t.launchBtn.disabled=!1,c==="farm"?(t.farmBtn.classList.add("primary"),t.farmBtn.classList.remove("ghost"),t.imageBtn.classList.add("ghost"),t.imageBtn.classList.remove("primary")):(t.imageBtn.classList.add("primary"),t.imageBtn.classList.remove("ghost"),t.farmBtn.classList.add("ghost"),t.farmBtn.classList.remove("primary")),t.statusText.textContent=n.readyToLaunch,o&&o(c)}t.farmBtn.addEventListener("click",()=>E("farm")),t.imageBtn.addEventListener("click",()=>E("image")),t.launchBtn.addEventListener("click",async()=>{if(w){t.launchBtn.disabled=!0,t.launchBtn.textContent=n.loading,t.statusText.textContent=n.downloading;try{e&&(await e(w),x())}catch(c){a("\u274C Error en launch:",c),alert(n.loadErrorMsg),t.launchBtn.disabled=!1,t.launchBtn.textContent=n.launch,t.statusText.textContent=n.loadError}}});function x(){i.refreshTimer&&(window.clearInterval(i.refreshTimer),i.refreshTimer=null),u.remove(),a("\u{1F9F9} Launcher UI eliminado")}t.cancelBtn.addEventListener("click",x),t.closeBtn.addEventListener("click",x),document.addEventListener("keydown",c=>{c.key==="Escape"&&x()},{once:!0});function H(c){var g,L;if(!c){t.userName.textContent="-",t.userCharges.textContent="-";return}let v=c.name||c.username||"-",f=Math.floor(Number((L=(g=c.charges)==null?void 0:g.count)!=null?L:NaN));t.userName.textContent=v,t.userCharges.textContent=Number.isFinite(f)?String(f):"-"}function A(c){if(!c){t.backendStatus.textContent=n.offline,t.databaseStatus.textContent="-",t.uptime.textContent="-";return}let v=!!c.up,f=c.database,g=c.uptime||"-";t.backendStatus.textContent=v?n.online:n.offline,f==null?t.databaseStatus.textContent="-":t.databaseStatus.textContent=f?n.ok:n.error,t.uptime.textContent=typeof g=="number"?`${g}s`:g||"-"}return a("\u2705 Launcher UI creado exitosamente"),{setUserInfo:H,setHealthInfo:A,cleanup:x,selectBot:E,getSelectedBot:()=>w}}async function y(){var o,e;a("\u{1F4E1} Obteniendo informaci\xF3n de sesi\xF3n...");try{let r=await fetch("https://backend.wplace.live/me",{credentials:"include"});if(!r.ok)throw new Error(`HTTP ${r.status}`);return i.me=await r.json(),a("\u2705 Informaci\xF3n de sesi\xF3n obtenida:",((o=i.me)==null?void 0:o.name)||((e=i.me)==null?void 0:e.username)||"Usuario"),i.me}catch(r){return a("\u274C Error obteniendo sesi\xF3n:",r.message),i.me=null,null}}async function B(){var o,e,r,m,s,h;a("\u{1F3E5} Verificando estado del backend...");try{let n=await fetch("https://backend.wplace.live/health",{method:"GET",credentials:"include"}),u=null;try{u=await n.json()}catch{u=null}n.ok&&u?(i.health={up:!!((o=u.up)==null||o),database:(m=(r=(e=u.database)==null?void 0:e.ok)!=null?r:u.database)!=null?m:void 0,uptime:(h=(s=u.uptime)!=null?s:u.uptimeHuman)!=null?h:typeof u.uptimeSeconds=="number"?`${u.uptimeSeconds}s`:void 0},a("\u2705 Estado del backend obtenido:",i.health)):(i.health={up:!1,database:!1,uptime:void 0},a("\u26A0\uFE0F Backend no responde correctamente"))}catch(n){a("\u274C Error verificando backend:",n.message),i.health={up:!1,database:!1,uptime:void 0}}return i.health}async function $(o,e){a(`\u{1F4E5} Descargando bot: ${o}`);try{let r=o==="farm"?`${e}/Auto-Farm.js`:`${e}/Auto-Image.js`;a(`\u{1F310} URL: ${r}`);let m=await fetch(r);if(!m.ok)throw new Error(`HTTP ${m.status}`);let s=await m.text();return a(`\u2705 Bot descargado (${s.length} chars), ejecutando...`),(0,eval)(s),a("\u{1F680} Bot ejecutado exitosamente"),!0}catch(r){throw a("\u274C Error descargando/ejecutando bot:",r.message),r}}async function _(){var o;if(a("\u{1F680} Iniciando WPlace Auto-Launcher (versi\xF3n modular)"),(o=window.__wplaceBot)!=null&&o.launcherRunning){alert("Auto-Launcher ya est\xE1 ejecut\xE1ndose.");return}window.__wplaceBot={...window.__wplaceBot,launcherRunning:!0};try{let e=T({onSelectBot:s=>{a(`\u{1F3AF} Bot seleccionado: ${s}`)},onLaunch:async s=>{a(`\u{1F680} Lanzando bot: ${s}`),await $(s,d.RAW_BASE)},onClose:()=>{a("\u{1F44B} Cerrando launcher"),window.__wplaceBot.launcherRunning=!1}});a("\u{1F4CA} Cargando informaci\xF3n inicial...");let r=await B();e.setHealthInfo(r);let m=await y();e.setUserInfo(m),i.refreshTimer=window.setInterval(async()=>{a("\u{1F504} Actualizando informaci\xF3n...");try{let[s,h]=await Promise.all([B(),y()]);e.setHealthInfo(s),e.setUserInfo(h)}catch(s){a("\u274C Error en actualizaci\xF3n peri\xF3dica:",s)}},d.REFRESH_INTERVAL),window.addEventListener("beforeunload",()=>{e.cleanup(),window.__wplaceBot.launcherRunning=!1}),a("\u2705 Auto-Launcher inicializado correctamente")}catch(e){throw a("\u274C Error inicializando Auto-Launcher:",e),window.__wplaceBot.launcherRunning=!1,e}}(()=>{"use strict";var o,e;if((o=window.__wplaceBot)!=null&&o.farmRunning||(e=window.__wplaceBot)!=null&&e.imageRunning){alert("Ya hay un bot ejecut\xE1ndose. Ci\xE9rralo antes de usar el launcher.");return}window.__wplaceBot||(window.__wplaceBot={}),_().catch(r=>{console.error("[BOT] Error en Auto-Launcher:",r),window.__wplaceBot&&(window.__wplaceBot.launcherRunning=!1),alert("Auto-Launcher: error inesperado. Revisa consola.")})})();})();
