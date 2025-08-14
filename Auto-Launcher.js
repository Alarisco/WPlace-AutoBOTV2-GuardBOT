(() => {
  // WPlace AutoBOT - Lanzador ligero (panel cohesivo con UI de los bots)
  const CONFIG = {
    RAW_BASE: 'https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main',
    THEME: {
      primary: '#000000',
      secondary: '#111111',
      accent: '#222222',
      text: '#ffffff',
      highlight: '#775ce3',
      success: '#00ff00',
      error: '#ff0000'
    }
  };

  // Estado simple para stats
  const state = {
    me: null,
    health: null,
    refreshTimer: null
  };

  // Evitar panel duplicado
  const existing = document.getElementById('wpl-panel');
  if (existing) existing.remove();

  // --------- Helpers de UI para stats ---------
  function setMeUI() {
    const userEl = document.getElementById('wpl-user');
    const chargesEl = document.getElementById('wpl-charges');
    if (!userEl || !chargesEl) return;
    const name = state.me?.name || state.me?.username || '-';
    const count = Math.floor(Number(state.me?.charges?.count ?? NaN));
    userEl.textContent = name;
    chargesEl.textContent = Number.isFinite(count) ? String(count) : '-';
  }

  function setHealthUI() {
    const bEl = document.getElementById('wpl-backend-status');
    const dEl = document.getElementById('wpl-database-status');
    const uEl = document.getElementById('wpl-uptime');
    if (!bEl || !dEl || !uEl) return;

    const up = !!state.health?.up;
    const db = state.health?.database;
    const uptime = state.health?.uptime || state.health?.uptimeSeconds || '-';

    bEl.textContent = up ? '🟢 Online' : '🔴 Offline';
    if (db === undefined || db === null) {
      dEl.textContent = '-';
    } else {
      dEl.textContent = db ? '🟢 OK' : '🔴 Error';
    }
    uEl.textContent = typeof uptime === 'number' ? `${uptime}s` : (uptime || '-');
  }

  // --------- Consultas ---------
  async function getSession() {
    try {
      const res = await fetch('https://backend.wplace.live/me', { credentials: 'include' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.me = await res.json();
    } catch (_) {
      state.me = null;
    }
    setMeUI();
    return state.me;
  }

  async function checkBackendHealth() {
    try {
      const res = await fetch('https://backend.wplace.live/health', { method: 'GET', credentials: 'include' });
      let json = null;
      try { json = await res.json(); } catch (_) { json = null; }
      if (res.ok && json) {
        // Intentar normalizar distintos formatos
        state.health = {
          up: Boolean(json.up ?? true),
          database: json.database?.ok ?? json.database ?? undefined,
          uptime: json.uptime ?? json.uptimeHuman ?? (typeof json.uptimeSeconds === 'number' ? `${json.uptimeSeconds}s` : undefined)
        };
      } else {
        state.health = { up: false, database: false, uptime: undefined };
      }
    } catch (_) {
      state.health = { up: false, database: false, uptime: undefined };
    }
    setHealthUI();
    return state.health;
  }

  function createUI() {
    // Estilos coherentes con Auto-Farm
    const css = `
      @keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
      .wpa-panel{position:fixed;top:20px;right:20px;width:300px;background:${CONFIG.THEME.primary};border:1px solid ${CONFIG.THEME.accent};border-radius:10px;color:${CONFIG.THEME.text};font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;z-index:999999;box-shadow:0 8px 24px rgba(0,0,0,.5);overflow:hidden;animation:slideIn .3s}
      .wpa-head{display:flex;justify-content:space-between;align-items:center;background:${CONFIG.THEME.secondary};padding:10px 12px;color:${CONFIG.THEME.highlight};font-weight:600;cursor:move}
      .wpa-body{padding:12px}
      .wpa-row{display:flex;gap:8px;margin:8px 0}
      .wpa-btn{flex:1;padding:9px;border:none;border-radius:8px;font-weight:700;cursor:pointer;transition:all .2s}
      .wpa-btn.primary{background:${CONFIG.THEME.accent};color:#fff}
      .wpa-btn.primary:hover{background:${CONFIG.THEME.highlight}}
      .wpa-btn.ghost{background:transparent;border:1px solid ${CONFIG.THEME.accent};color:${CONFIG.THEME.text}}
      .wpa-btn.ghost:hover{background:${CONFIG.THEME.accent}22}
      .wpa-card{background:${CONFIG.THEME.secondary};padding:10px;border-radius:8px;margin-top:10px}
      .wpa-stat{display:flex;justify-content:space-between;margin:4px 0;font-size:13px;opacity:.95}
      .wpa-status{margin-top:10px;padding:8px;border-radius:6px;text-align:center;font-size:13px;background:rgba(255,255,255,.08)}
      .wpl-selected{outline:2px solid ${CONFIG.THEME.highlight}}
    `;
    const style = document.createElement('style');
    style.textContent = css; document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.className = 'wpa-panel';
    panel.id = 'wpl-panel';
    panel.innerHTML = `
      <div class="wpa-head">
        <div>WPlace AutoBOT</div>
        <button id="wpl-close" class="wpa-btn ghost" style="flex:0 0 auto;padding:6px 8px">✕</button>
      </div>
      <div class="wpa-body">
        <div class="wpa-row">
          <button id="btn-farm" class="wpa-btn primary">🌾 Auto-Farm</button>
          <button id="btn-image" class="wpa-btn ghost">🎨 Auto-Image</button>
        </div>
        <div class="wpa-card">
          <div class="wpa-stat"><span>Selección</span><span id="wpl-choice">—</span></div>
        </div>
        <div class="wpa-card" id="wpl-me">
          <div class="wpa-stat"><span>Usuario</span><span id="wpl-user">-</span></div>
          <div class="wpa-stat"><span>Cargas</span><span id="wpl-charges">-</span></div>
        </div>
        <div class="wpa-card" id="wpl-health">
          <div class="wpa-stat"><span>Backend</span><span id="wpl-backend-status">🔄 Verificando...</span></div>
          <div class="wpa-stat"><span>Database</span><span id="wpl-database-status">-</span></div>
          <div class="wpa-stat"><span>Uptime</span><span id="wpl-uptime">-</span></div>
        </div>
        <div id="wpl-status" class="wpa-status">Elige un bot y presiona Lanzar</div>
        <div class="wpa-row" style="margin-top:12px">
          <button id="wpl-launch" class="wpa-btn primary" disabled>Lanzar</button>
          <button id="wpl-cancel" class="wpa-btn ghost">Cerrar</button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // Drag simple del panel (similar a bots)
    (function dragHeader(headerEl, panelEl){
      let dragging=false, sx=0, sy=0, ox=0, oy=0;
      headerEl.addEventListener('mousedown',(e)=>{ dragging=true; sx=e.clientX; sy=e.clientY; const r=panelEl.getBoundingClientRect(); ox=r.left; oy=r.top; e.preventDefault();});
      document.addEventListener('mouseup',()=> dragging=false);
      document.addEventListener('mousemove',(e)=>{ if(!dragging) return; const nx=ox+(e.clientX-sx); const ny=oy+(e.clientY-sy); panelEl.style.left=`${nx}px`; panelEl.style.top=`${ny}px`; panelEl.style.right='auto'; });
    })(panel.querySelector('.wpa-head'), panel);

    let selected = null;
    const btnFarm = panel.querySelector('#btn-farm');
    const btnImage = panel.querySelector('#btn-image');
    const btnLaunch = panel.querySelector('#wpl-launch');
    const btnCancel = panel.querySelector('#wpl-cancel');
    const btnClose = panel.querySelector('#wpl-close');
    const status = panel.querySelector('#wpl-status');
    const choice = panel.querySelector('#wpl-choice');

    function select(bot) {
      selected = bot;
      choice.textContent = bot === 'farm' ? 'Auto-Farm' : 'Auto-Image';
      btnLaunch.disabled = false;
      // Toggle estilos coherentes
      if (bot === 'farm') {
        btnFarm.classList.add('primary'); btnFarm.classList.remove('ghost');
        btnImage.classList.add('ghost'); btnImage.classList.remove('primary');
      } else {
        btnImage.classList.add('primary'); btnImage.classList.remove('ghost');
        btnFarm.classList.add('ghost'); btnFarm.classList.remove('primary');
      }
      status.textContent = 'Listo para lanzar';
    }

    btnFarm.addEventListener('click', () => select('farm'));
    btnImage.addEventListener('click', () => select('image'));

    const cleanup = () => {
      if (state.refreshTimer) {
        clearInterval(state.refreshTimer);
        state.refreshTimer = null;
      }
      panel.remove();
    };
    btnCancel.addEventListener('click', cleanup);
    btnClose.addEventListener('click', cleanup);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cleanup(); }, { once: true });

    btnLaunch.addEventListener('click', async () => {
      if (!selected) return;
      btnLaunch.disabled = true;
      btnLaunch.textContent = 'Cargando…';
      status.textContent = 'Descargando script…';
      try {
        const url = selected === 'farm' ? `${CONFIG.RAW_BASE}/Auto-Farm.js` : `${CONFIG.RAW_BASE}/Auto-Image.js`;
        const code = await fetch(url).then(r => r.text());
        status.textContent = 'Ejecutando…';
        (0, eval)(code);
        cleanup();
      } catch (e) {
        alert('No se pudo cargar el bot seleccionado. Revisa tu conexión o inténtalo de nuevo.');
        btnLaunch.disabled = false;
        btnLaunch.textContent = 'Lanzar';
        status.textContent = 'Error al cargar';
      }
    });

    // Cargar stats iniciales y refresco periódico
    checkBackendHealth();
    getSession();
    state.refreshTimer = setInterval(() => {
      checkBackendHealth();
      getSession();
    }, 60000);
  }

  createUI();
})();
