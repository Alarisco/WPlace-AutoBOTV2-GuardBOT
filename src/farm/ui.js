import { t } from "../locales/index.js";
import { COLOR_MAP, getColorName } from "./palette.js";
import { farmState } from "./config.js";
import { clamp } from "../core/utils.js";
import { log } from "../core/logger.js";
import { registerWindow } from "../core/window-manager.js";

export function createFarmUI(config, onStart, onStop) {
  const host = document.createElement('div');
  host.id = 'wplace-farm-ui';
  host.style.cssText = 'position: fixed; top: 12px; right: 12px; font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;';
  const root = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = `
    .panel{background:#1f2937;color:#e5e7eb;border:1px solid #374151;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.5);width:320px;overflow:hidden}
  .header{display:flex;justify-content:space-between;align-items:center;background:#111827;color:#93c5fd;padding:10px 12px;font-weight:600;cursor:move;user-select:none}
  .min-btn{background:transparent;border:1px solid #374151;color:#e5e7eb;border-radius:6px;width:26px;height:22px;line-height:20px;display:flex;align-items:center;justify-content:center;font-weight:700;cursor:pointer;transition:all .2s}
  .min-btn:hover{background:#1f2937}
  .body{padding:12px;max-height:1000px;transition:max-height .35s ease, opacity .25s ease, padding .25s ease}
  .body.collapsed{max-height:0;opacity:.0;overflow:hidden;padding:0}
    .row{display:flex;gap:8px;margin:8px 0}
    .btn{flex:1;padding:8px 10px;border:none;border-radius:8px;font-weight:700;cursor:pointer;transition:all .2s;font-size:13px}
    .btn.primary{background:#2563eb;color:#fff}
    .btn.ghost{background:transparent;border:1px solid #374151;color:#e5e7eb}
  .btn.ghost.danger{background:#ef4444;color:#fff;border-color:#ef4444}
    .btn.primary:disabled,.btn.ghost:disabled{opacity:.5;cursor:not-allowed}
    .card{background:#111827;padding:10px;border-radius:8px;margin-top:10px}
    .stat{display:flex;justify-content:space-between;margin:4px 0;font-size:12px;opacity:.95}
    .status{margin-top:10px;padding:8px;border-radius:6px;text-align:center;font-size:12px;background:rgba(255,255,255,.06)}
    .label{font-size:12px;color:#cbd5e1}
    select,input{background:#111827;border:1px solid #374151;color:#e5e7eb;border-radius:6px;padding:6px 8px;font-size:12px}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .colors{display:grid;grid-template-columns:repeat(8,1fr);gap:6px}
    .swatch{width:20px;height:20px;border:1px solid #374151;border-radius:4px;cursor:pointer}
  .active{outline:2px solid #93c5fd}
  /* Lista texto/valor para la configuración */
  .list{display:flex;flex-direction:column;gap:8px}
  .list-item{display:flex;align-items:center;justify-content:space-between;gap:8px}
  .list-item .label{font-size:12px;color:#cbd5e1}
  .list-item input{width:84px;text-align:center}
  /* Parpadeo naranja para botón Capturar */
  @keyframes wpa-blink-orange{0%,100%{background:transparent;border-color:#f59e0b;color:#fde68a}50%{background:#f59e0b33;border-color:#f59e0b;color:#fff}}
  .blink-orange{animation:wpa-blink-orange 1s infinite; border-width:2px !important}
  `;
  root.appendChild(style);

  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = `
    <div class="header"><span>${t('farm.title','🧑‍🌾 WPlace Farm')}</span><button id="minBtn" class="min-btn" title="${t('image.minimize','Minimizar')}">–</button></div>
    <div class="body">
      <div class="row">
        <button class="btn primary" id="startBtn">${t('farm.start','Iniciar')}</button>
        <button class="btn ghost" id="stopBtn" disabled>${t('farm.stop','Detener')}</button>
        <button class="btn ghost" id="logsBtn">${t('farm.logWindow','Logs')}</button>
      </div>

      <div class="card">
  <div class="stat"><span>${t('farm.stats.painted','Pintados')}</span><span id="painted">0</span></div>
  <div class="stat"><span>${t('farm.stats.charges','Cargas')}</span><span id="charges">0/0</span></div>
  <div class="stat"><span>${t('farm.stats.droplets','Gotas')}</span><span id="droplets">0</span></div>
  <div class="stat"><span>${t('farm.stats.user','Usuario')}</span><span id="username">-</span></div>
  <div class="stat"><span>${t('farm.stats.retries','Reintentos')}</span><span id="retries">0</span></div>
      </div>

      <div class="card" id="cfgCard">
        <div class="list">
          <div class="list-item">
            <span class="label">${t('farm.config.minCharges','Cargas mínimas')}</span>
            <input type="number" id="minCharges" min="0" max="100" value="${config.MIN_CHARGES ?? 10}" />
          </div>
          <div class="list-item">
            <span class="label">${t('farm.config.delay','Espera (seg)')}</span>
            <input type="number" id="delaySeconds" min="1" max="120" value="${Math.round((config.DELAY_MS||15000)/1000) || 15}" />
          </div>
          <div class="list-item">
            <span class="label">${t('farm.pixelsPerBatch','Píxeles por lote')}</span>
            <input type="number" id="pixelsPerBatch" min="1" max="50" value="${config.PIXELS_PER_BATCH ?? 20}" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <label class="label">${t('farm.colorMode','Modo de color')}</label>
          <select id="colorMode">
            <option value="fixed">${t('farm.color.fixed','Fijo')}</option>
            <option value="range">${t('farm.color.range','Rango')}</option>
            <option value="random">${t('farm.color.random','Aleatorio')}</option>
          </select>
        </div>
        <div id="fixedPicker" class="row" style="flex-direction:column">
          <div class="label" id="selectedColorLabel">${t('farm.color.selected','Color seleccionado')}: -</div>
          <div class="colors" id="colorGrid"></div>
        </div>
        <div id="rangePicker" class="grid2" style="display:none;">
          <div><label class="label">${t('farm.color.min','Mín')}</label><select id="colorMin"></select></div>
          <div><label class="label">${t('farm.color.max','Máx')}</label><select id="colorMax"></select></div>
        </div>
      </div>

      <div class="row">
  <button class="btn ghost" id="capture-btn">${t('farm.capture','Capturar zona')}</button>
  <button class="btn ghost" id="once-btn">${t('farm.once','Una vez')}</button>
        <button class="btn ghost" id="select-position-btn" style="display:none">${t('farm.selectPosition','Select')}</button>
      </div>
  <div class="row" id="posInfoRow" style="display:none"></div>

  <div class="card" id="purchaseCard">
        <div class="row" style="align-items:center; justify-content:space-between;">
          <span class="label" style="flex:1;">${t('farm.autobuy.title','Auto-compra (+5 cargas)')}</span>
          <label class="toggle-switch" style="position: relative; display: inline-block; width: 50px; height: 26px; margin-left: 10px;">
            <input type="checkbox" id="autoBuyCheckbox" style="opacity: 0; width: 0; height: 0;">
            <span class="toggle-slider" style="
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #ef4444;
              transition: all 0.3s ease;
              border-radius: 13px;
              border: 1px solid #dc2626;
            "></span>
            <span class="toggle-knob" style="
              position: absolute;
              height: 20px;
              width: 20px;
              left: 3px;
              top: 3px;
              background-color: white;
              transition: all 0.3s ease;
              border-radius: 50%;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            "></span>
          </label>
        </div>
        <div class="row" id="manualBuyRow" style="display:none; gap:8px; align-items:center;">
          <button class="btn primary" id="manualBuyBtn">${t('farm.buyCharges','Comprar +5 cargas')}</button>
        </div>
        <div class="row" style="font-size:12px; color:#9ca3af">${t('farm.autobuy.hint','Se activará automáticamente cuando tengas ≥ 500 gotas')}</div>
      </div>

  </div>
  <div class="status" id="status">${t('farm.ready','Listo')}</div>
  `;
  root.appendChild(panel);

  // Mapear elementos
  const els = {
    start: panel.querySelector('#startBtn'),
    stop: panel.querySelector('#stopBtn'),
    logsBtn: panel.querySelector('#logsBtn'),
    status: panel.querySelector('#status'),
    painted: panel.querySelector('#painted'),
  charges: panel.querySelector('#charges'),
  droplets: panel.querySelector('#droplets'),
  username: panel.querySelector('#username'),
  retries: panel.querySelector('#retries'),
    colorMode: panel.querySelector('#colorMode'),
    colorGrid: panel.querySelector('#colorGrid'),
    colorMin: panel.querySelector('#colorMin'),
    colorMax: panel.querySelector('#colorMax'),
    fixedPicker: panel.querySelector('#fixedPicker'),
    rangePicker: panel.querySelector('#rangePicker'),
    selectPositionBtn: panel.querySelector('#select-position-btn'),
    captureBtn: panel.querySelector('#capture-btn'),
  onceBtn: panel.querySelector('#once-btn'),
  posInfoValue: panel.querySelector('#posInfoValue'),
  minCharges: panel.querySelector('#minCharges'),
  delaySeconds: panel.querySelector('#delaySeconds'),
  pixelsPerBatch: panel.querySelector('#pixelsPerBatch'),
  selectedColorLabel: panel.querySelector('#selectedColorLabel'),
  autoBuyCheckbox: panel.querySelector('#autoBuyCheckbox'),
  manualBuyRow: panel.querySelector('#manualBuyRow'),
  manualBuyBtn: panel.querySelector('#manualBuyBtn')
  };

  // El botón select-position redirige al de captura para mantener compatibilidad
  els.selectPositionBtn.addEventListener('click', () => {
    els.captureBtn?.click();
  });

  // Rellenar selects de color
  function fillColorOptions(select) {
    select.innerHTML = '';
    Object.values(COLOR_MAP).forEach(entry => {
      // En selects de rango, omitimos Transparent (rgb null)
      if (!entry.rgb) return;
      const opt = document.createElement('option');
      opt.value = String(entry.id);
      opt.textContent = `${entry.id} - ${entry.name}`;
      select.appendChild(opt);
    });
  }
  fillColorOptions(els.colorMin);
  fillColorOptions(els.colorMax);

  function renderColorGrid(activeId) {
    els.colorGrid.innerHTML = '';
    Object.values(COLOR_MAP).forEach(entry => {
      const d = document.createElement('div');
      d.className = 'swatch' + (entry.id === activeId ? ' active' : '');
      if (entry.rgb) {
        d.style.background = `rgb(${entry.rgb.r},${entry.rgb.g},${entry.rgb.b})`;
      } else {
        // Mostrar patrón de ajedrez para Transparent
        d.style.backgroundImage = `linear-gradient(45deg, #bbb 25%, transparent 25%),
                                   linear-gradient(-45deg, #bbb 25%, transparent 25%),
                                   linear-gradient(45deg, transparent 75%, #bbb 75%),
                                   linear-gradient(-45deg, transparent 75%, #bbb 75%)`;
        d.style.backgroundSize = '8px 8px';
        d.style.backgroundPosition = '0 0, 0 4px, 4px -4px, -4px 0px';
      }
      d.title = `${entry.id} - ${entry.name}`;
      d.addEventListener('click', () => {
        config.COLOR_FIXED = entry.id;
        renderColorGrid(config.COLOR_FIXED);
        saveConfig();
        updateConfig();
        if (els.selectedColorLabel) {
          els.selectedColorLabel.textContent = `${t('farm.color.selected','Color seleccionado')}: ${getColorName(config.COLOR_FIXED)}`;
        }
      });
      els.colorGrid.appendChild(d);
    });
  }

  // Estado inicial
  els.colorMode.value = config.COLOR_MODE || 'random';
  els.colorMin.value = String(config.COLOR_MIN ?? 1);
  els.colorMax.value = String(config.COLOR_MAX ?? 32);
  renderColorGrid(config.COLOR_FIXED ?? 1);
  if (els.selectedColorLabel) {
    els.selectedColorLabel.textContent = `${t('farm.color.selected','Color seleccionado')}: ${getColorName(config.COLOR_FIXED ?? 1)}`;
  }
  togglePickers();
  // Aplicar estado inicial (botones y parpadeo de Capturar)
  try { updateConfig(); } catch {}

  els.colorMode.addEventListener('change', () => {
    config.COLOR_MODE = els.colorMode.value;
    togglePickers();
    saveConfig();
    updateConfig();
  });
  els.colorMin.addEventListener('change', () => {
    const v = clamp(parseInt(els.colorMin.value, 10), 1, 63);
    config.COLOR_MIN = v;
    if (config.COLOR_MAX < v) config.COLOR_MAX = v;
    els.colorMax.value = String(config.COLOR_MAX);
    saveConfig();
    updateConfig();
  });
  els.colorMax.addEventListener('change', () => {
    const v = clamp(parseInt(els.colorMax.value, 10), 1, 63);
    config.COLOR_MAX = v;
    if (config.COLOR_MIN > v) config.COLOR_MIN = v;
    els.colorMin.value = String(config.COLOR_MIN);
    saveConfig();
    updateConfig();
  });

  // Persistencia de configuración básica
  if (els.minCharges) {
    els.minCharges.addEventListener('change', () => {
      const v = clamp(parseInt(els.minCharges.value, 10) || 0, 0, 1000);
      config.MIN_CHARGES = v;
      saveConfig();
      updateConfig();
    });
  }
  if (els.delaySeconds) {
    els.delaySeconds.addEventListener('change', () => {
      const v = clamp(parseInt(els.delaySeconds.value, 10) || 1, 1, 3600);
      config.DELAY_MS = v * 1000;
      saveConfig();
      updateConfig();
    });
  }
  if (els.pixelsPerBatch) {
    els.pixelsPerBatch.addEventListener('change', () => {
      const v = clamp(parseInt(els.pixelsPerBatch.value, 10) || 1, 1, 50);
      config.PIXELS_PER_BATCH = v;
      saveConfig();
      updateConfig();
    });
  }

  function togglePickers() {
    const mode = els.colorMode.value;
    els.fixedPicker.style.display = mode === 'fixed' ? '' : 'none';
    els.rangePicker.style.display = mode === 'range' ? '' : 'none';
  }

  // Botones básicos
  els.start.addEventListener('click', async () => {
    // Aplicar estado de ejecución inmediatamente
    updateButtonStates(true);
    els.stop.classList.add('danger');
    try { if (onStart) await onStart(); } catch (e) { /* ignore */ }
  });
  els.stop.addEventListener('click', async () => {
    updateButtonStates(false);
    els.stop.classList.remove('danger');
    try { if (onStop) await onStop(); } catch (e) { /* ignore */ }
  });
  // sin botón de cierre
  if (els.autoBuyCheckbox) {
    const slider = els.autoBuyCheckbox.parentElement.querySelector('.toggle-slider');
    const knob = els.autoBuyCheckbox.parentElement.querySelector('.toggle-knob');
    const applyVisual = (checked) => {
      if (!slider || !knob) return;
      slider.style.backgroundColor = checked ? '#22c55e' : '#ef4444';
      slider.style.borderColor = checked ? '#16a34a' : '#dc2626';
      knob.style.left = checked ? '27px' : '3px';
    };
    // Estado inicial
    els.autoBuyCheckbox.checked = !!config.AUTO_BUY_ENABLED;
    applyVisual(els.autoBuyCheckbox.checked);
    els.autoBuyCheckbox.addEventListener('change', (e) => {
      const checked = !!e.target.checked;
      config.AUTO_BUY_ENABLED = checked;
      saveConfig();
      updateConfig();
      applyVisual(checked);
      if (els.manualBuyRow) els.manualBuyRow.style.display = checked ? 'none' : 'flex';
    });
    if (els.manualBuyRow) els.manualBuyRow.style.display = els.autoBuyCheckbox.checked ? 'none' : 'flex';
  }

  // Compra manual si autobuy está desactivado
  if (els.manualBuyBtn) {
    els.manualBuyBtn.addEventListener('click', async () => {
      try {
        els.manualBuyBtn.disabled = true;
        setStatus(t('farm.buying','Comprando...'), 'status');
        const { purchaseProduct } = await import('../core/wplace-api.js');
        const res = await purchaseProduct(70, 1);
        if (res.success) {
          // Notificación visual + instrucción de refrescar
          if (api.notify) api.notify(t('farm.buyOk','Compra realizada. Actualiza sesión.'), 'success');
          setStatus(t('farm.buyOk','Compra realizada. Actualiza sesión.'), 'success');
          // Restar 500 droplets inmediatamente en UI, hasta que refresque sesión
          try {
            if (Number.isFinite(farmState.droplets)) {
              farmState.droplets = Math.max(0, (farmState.droplets || 0) - 500);
              updateStats(farmState.painted, farmState.charges.count, farmState.retryCount);
            }
          } catch {}
        } else {
          if (api.notify) api.notify(t('farm.buyFail','No se pudo comprar'), 'error');
          setStatus(t('farm.buyFail','No se pudo comprar'), 'error');
        }
      } catch (err) {
        if (api.notify) api.notify(t('farm.buyFail','No se pudo comprar'), 'error');
        setStatus(t('farm.buyFail','No se pudo comprar'), 'error');
      } finally {
        els.manualBuyBtn.disabled = false;
      }
    });
  }

  document.body.appendChild(host);

  // Registrar ventana para gestión de z-index/bring-to-front
  try { registerWindow(host); } catch {}

  // Hacer draggable la ventana usando el header
  const headerEl = panel.querySelector('.header');
  const bodyEl = panel.querySelector('.body');
  let dragging = false; let offX = 0; let offY = 0;
  headerEl.addEventListener('mousedown', (e) => {
    // Evitar arrastre al clicar el botón minimizar
    const target = e.target;
    if (target && (target.id === 'minBtn' || target.closest('#minBtn'))) return;
    dragging = true;
    const rect = host.getBoundingClientRect();
    offX = e.clientX - rect.left;
    offY = e.clientY - rect.top;
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const nx = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, e.clientX - offX));
    const ny = Math.max(0, Math.min(window.innerHeight - 40, e.clientY - offY));
    host.style.left = nx + 'px';
    host.style.top = ny + 'px';
    host.style.right = 'auto'; // al mover, desanclar de derecha
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  // Minimizar con animación suave
  const minBtn = panel.querySelector('#minBtn');
  let collapsed = false;
  if (minBtn && bodyEl) {
    // Gestionar display al final de la animación para cerrar completamente
    bodyEl.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'max-height') {
        if (collapsed) {
          bodyEl.style.display = 'none';
        }
      }
    });
    minBtn.addEventListener('click', () => {
      collapsed = !collapsed;
      if (!collapsed) {
        bodyEl.style.display = 'block';
  // Forzar reflow para que la transición se aplique al remover la clase
  void bodyEl.offsetHeight;
      }
      bodyEl.classList.toggle('collapsed', collapsed);
      minBtn.textContent = collapsed ? '+' : '–';
    });
  }

  // Botón de logs
  if (els.logsBtn) {
    let logWindowInstance = null;
    els.logsBtn.addEventListener('click', async () => {
      try {
        const { createLogWindow } = await import('../log_window/index.js');
        logWindowInstance = logWindowInstance || createLogWindow('Auto-Farm');
        logWindowInstance.toggle();
      } catch (e) {
        log('No se pudo abrir la ventana de logs:', e);
        notify('No se pudo abrir Logs', 'error');
      }
    });
  }

  // API
  function setStatus(text, kind = 'status') {
    els.status.textContent = text;
    els.status.style.background = kind === 'error' ? 'rgba(245, 101, 101, 0.2)'
      : kind === 'success' ? 'rgba(72, 187, 120, 0.2)'
      : 'rgba(66, 153, 225, 0.2)';
  }

  function updateStats(painted, charges, retries) {
    els.painted.textContent = String(painted ?? 0);
    const cc = Math.floor(charges ?? 0);
    const mx = farmState.charges?.max ?? 0;
    els.charges.textContent = `${cc}/${mx}`;
    els.retries.textContent = String(retries ?? 0);
    // Mostrar droplets y usuario
    const droplets = farmState?.droplets ?? farmState?.user?.droplets ?? null;
    if (droplets != null && els.droplets) {
      els.droplets.textContent = String(droplets);
    }
    if (farmState?.user && els.username) {
      els.username.textContent = farmState.user.name || farmState.user.username || '-';
    }
  }

  function isPositionSelected() {
    return !!config.POSITION_SELECTED && Number.isFinite(config.BASE_X) && Number.isFinite(config.BASE_Y) && Number.isFinite(config.TILE_X) && Number.isFinite(config.TILE_Y);
  }

  function updateButtonStates(running) {
    const needCapture = !isPositionSelected();
    els.start.disabled = !!running || needCapture;
    els.stop.disabled = !running;
    if (els.onceBtn) {
      els.onceBtn.disabled = !!running || needCapture;
    }
    // Visual del botón detener en rojo cuando está corriendo
    if (running) {
      els.stop.classList.add('danger');
    } else {
      els.stop.classList.remove('danger');
    }
  }

  function flashEffect(ms = 150) {
    panel.style.outline = '2px solid #93c5fd';
    setTimeout(() => panel.style.outline = '', ms);
  }

  // Notificaciones estilo Material (top-center)
  function notify(message, type = 'info', timeout = 3000) {
    // Contenedor global
    let c = document.getElementById('wplace-toast-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'wplace-toast-container';
      c.style.cssText = `
        position: fixed;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        gap: 8px;
        pointer-events: none;
      `;
      document.body.appendChild(c);
    }

    const bg = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    const el = document.createElement('div');
    el.className = 'wplace-toast';
    el.textContent = message;
    el.style.cssText = `
      min-width: 240px;
      max-width: 80vw;
      margin: 0 auto;
      background: ${bg};
      color: white;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      padding: 10px 14px;
      font-weight: 600;
      letter-spacing: .2px;
      transform: translateY(-10px) scale(0.98);
      opacity: 0;
      transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), opacity .25s ease;
      pointer-events: auto;
    `;
    c.appendChild(el);

    // Animar entrada
  const raf = (cb) => (typeof window !== 'undefined' && window.requestAnimationFrame ? window.requestAnimationFrame(cb) : setTimeout(cb, 16));
  raf(() => {
      el.style.transform = 'translateY(0) scale(1)';
      el.style.opacity = '1';
  });

    const remove = () => {
      el.style.transform = 'translateY(-10px) scale(0.98)';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 250);
    };

    // Cierre automático
    if (timeout > 0) setTimeout(remove, timeout);

    // Clic para cerrar
    el.addEventListener('click', remove);
    return { close: remove };
  }

  function saveConfig() { try { localStorage.setItem('wplace_farm_cfg', JSON.stringify(config)); } catch {} }
  function updateConfig() {
    // Refrescar estado de posición seleccionada en la UI
    const selected = isPositionSelected();
    if (selected && els.posInfoValue) {
      els.posInfoValue.textContent = `tile(${config.TILE_X},${config.TILE_Y}) base(${config.BASE_X},${config.BASE_Y})`;
      if (els.captureBtn) {
        els.captureBtn.textContent = t('farm.recapture');
      }
    } else {
      if (els.posInfoValue) els.posInfoValue.textContent = '-';
  if (els.captureBtn) els.captureBtn.textContent = t('farm.capture','Capturar zona');
    }
    // Start deshabilitado hasta capturar; Capturar parpadea si falta selección
    updateButtonStates(false);
    if (els.captureBtn) {
      if (!selected) {
        els.captureBtn.classList.add('blink-orange');
      } else {
        els.captureBtn.classList.remove('blink-orange');
      }
    }
  }
  function getElement() { return host; }
  function destroy() { host.remove(); }

  function updateTexts() {
    // Actualización mínima de textos
    const headerSpan = panel.querySelector('.header span');
    if (headerSpan) headerSpan.textContent = t('farm.title','🧑‍🌾 WPlace Farm');
    
    panel.querySelector('#startBtn').textContent = t('farm.start','Iniciar');
    panel.querySelector('#stopBtn').textContent = t('farm.stop','Detener');
    panel.querySelector('#capture-btn').textContent = t('farm.capture','Capturar zona');
    panel.querySelector('#once-btn').textContent = t('farm.once','Una vez');
    
    const selectBtn = panel.querySelector('#select-position-btn');
    if (selectBtn) selectBtn.textContent = t('farm.selectPosition','Select');
    
    const lb = panel.querySelector('#logsBtn'); if (lb) lb.textContent = t('farm.logWindow','Logs');
    // Visual del toggle se actualiza por applyVisual al cambiar
    if (els.selectedColorLabel) els.selectedColorLabel.textContent = `${t('farm.color.selected','Color seleccionado')}: ${getColorName(config.COLOR_FIXED ?? 1)}`;
  }

  const api = { setStatus, updateStats, updateButtonStates, flashEffect, getElement, destroy, updateConfig, updateTexts, notify };
  window.__wplaceBot = window.__wplaceBot || {};
  window.__wplaceBot.ui = api;
  return api;
}

// Compatibilidad
export async function autoCalibrateTile() { return { success: false, error: 'not-implemented' }; }
export function mountFarmUI() { log('Farm UI mount placeholder'); }
