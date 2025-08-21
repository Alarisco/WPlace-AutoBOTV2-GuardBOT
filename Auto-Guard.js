/* WPlace AutoBOT — uso bajo tu responsabilidad. Compilado 2025-08-21T06:28:30.591Z */
(() => {
  // src/core/logger.js
  var log = (...a) => console.log("[WPA-UI]", ...a);

  // src/core/wplace-api.js
  var BASE = "https://backend.wplace.live";
  async function getSession() {
    var _a, _b, _c;
    try {
      const me = await fetch(`${BASE}/me`, { credentials: "include" }).then((r) => r.json());
      const user = me || null;
      const c = (me == null ? void 0 : me.charges) || {};
      const charges = {
        count: (_a = c.count) != null ? _a : 0,
        // Mantener valor decimal original
        max: (_b = c.max) != null ? _b : 0,
        // Mantener valor original (puede variar por usuario)
        cooldownMs: (_c = c.cooldownMs) != null ? _c : 3e4
      };
      return {
        success: true,
        data: {
          user,
          charges: charges.count,
          maxCharges: charges.max,
          chargeRegen: charges.cooldownMs
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: {
          user: null,
          charges: 0,
          maxCharges: 0,
          chargeRegen: 3e4
        }
      };
    }
  }
  async function postPixelBatchImage(tileX, tileY, coords, colors, turnstileToken) {
    try {
      const body = JSON.stringify({
        colors,
        coords,
        t: turnstileToken
      });
      const response = await fetch(`${BASE}/s0/pixel/${tileX}/${tileY}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body
      });
      let responseData = null;
      try {
        responseData = await response.json();
      } catch {
        responseData = {};
      }
      return {
        status: response.status,
        json: responseData,
        success: response.ok,
        painted: (responseData == null ? void 0 : responseData.painted) || 0
      };
    } catch (error) {
      return {
        status: 0,
        json: { error: error.message },
        success: false,
        painted: 0
      };
    }
  }

  // src/guard/config.js
  var GUARD_DEFAULTS = {
    SITEKEY: "0x4AAAAAABpqJe8FO0N84q0F",
    COOLDOWN_DEFAULT: 31e3,
    TILE_SIZE: 3e3,
    CHECK_INTERVAL: 1e4,
    // Revisar cada 10 segundos
    MAX_PROTECTION_SIZE: Infinity,
    // Sin límite de píxeles protegidos
    PIXELS_PER_BATCH: 10,
    // Menos que Image para ser más sutil
    MIN_CHARGES_TO_WAIT: 20,
    // Cargas mínimas a esperar antes de continuar
    BACKEND_URL: "https://backend.wplace.live"
  };
  var guardState = {
    running: false,
    initialized: false,
    protectionArea: null,
    // { x1, y1, x2, y2, tileX, tileY }
    originalPixels: /* @__PURE__ */ new Map(),
    // Map de "x,y" -> {r, g, b, colorId}
    changes: /* @__PURE__ */ new Map(),
    // Map de "x,y" -> {timestamp, originalColor, currentColor}
    currentCharges: 0,
    maxCharges: 50,
    lastCheck: 0,
    checkInterval: null,
    availableColors: [],
    colorsChecked: false,
    ui: null,
    totalRepaired: 0,
    // Configuración editable
    pixelsPerBatch: GUARD_DEFAULTS.PIXELS_PER_BATCH,
    minChargesToWait: GUARD_DEFAULTS.MIN_CHARGES_TO_WAIT
  };

  // src/core/turnstile.js
  var loaded = false;
  async function loadTurnstile() {
    if (loaded || window.turnstile) return;
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.onload = () => {
        loaded = true;
        resolve();
      };
      s.onerror = () => reject(new Error("No se pudo cargar Turnstile"));
      document.head.appendChild(s);
    });
  }
  async function executeTurnstile(siteKey, action = "paint") {
    var _a;
    await loadTurnstile();
    if (typeof ((_a = window.turnstile) == null ? void 0 : _a.execute) === "function") {
      try {
        const token = await window.turnstile.execute(siteKey, { action });
        if (token && token.length > 20) return token;
      } catch {
      }
    }
    return await new Promise((resolve) => {
      const host = document.createElement("div");
      host.style.position = "fixed";
      host.style.left = "-9999px";
      document.body.appendChild(host);
      window.turnstile.render(host, {
        sitekey: siteKey,
        callback: (t2) => {
          document.body.removeChild(host);
          resolve(t2);
        }
      });
    });
  }
  async function getTurnstileToken(siteKey) {
    return executeTurnstile(siteKey, "paint");
  }

  // src/core/timing.js
  var sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // src/guard/processor.js
  var { Image, URL } = window;
  async function getTileImage(tileX, tileY) {
    try {
      const url = `${GUARD_DEFAULTS.BACKEND_URL}/files/s0/tiles/${tileX}/${tileY}.png`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      log(`Error obteniendo tile ${tileX},${tileY}:`, error);
      return null;
    }
  }
  function detectAvailableColors() {
    log("\u{1F3A8} Detectando colores disponibles...");
    const colorElements = document.querySelectorAll('[id^="color-"]');
    const colors = [];
    for (const element of colorElements) {
      if (element.querySelector("svg")) continue;
      const colorId = parseInt(element.id.replace("color-", ""));
      if (colorId === 0 || colorId === 5) continue;
      const bgColor = element.style.backgroundColor;
      if (bgColor) {
        const rgbMatch = bgColor.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          colors.push({
            id: colorId,
            r: parseInt(rgbMatch[0]),
            g: parseInt(rgbMatch[1]),
            b: parseInt(rgbMatch[2]),
            element
          });
        }
      }
    }
    log(`\u2705 ${colors.length} colores detectados`);
    return colors;
  }
  function findClosestColor(r, g, b, availableColors) {
    let minDistance = Infinity;
    let closestColor = null;
    for (const color of availableColors) {
      const distance = Math.sqrt(
        Math.pow(r - color.r, 2) + Math.pow(g - color.g, 2) + Math.pow(b - color.b, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = color;
      }
    }
    return closestColor;
  }
  async function analyzeAreaPixels(area) {
    const { x1, y1, x2, y2 } = area;
    const width = x2 - x1;
    const height = y2 - y1;
    log(`\u{1F50D} Analizando \xE1rea ${width}x${height} desde (${x1},${y1}) hasta (${x2},${y2})`);
    const pixelMap = /* @__PURE__ */ new Map();
    const startTileX = Math.floor(x1 / GUARD_DEFAULTS.TILE_SIZE);
    const startTileY = Math.floor(y1 / GUARD_DEFAULTS.TILE_SIZE);
    const endTileX = Math.floor(x2 / GUARD_DEFAULTS.TILE_SIZE);
    const endTileY = Math.floor(y2 / GUARD_DEFAULTS.TILE_SIZE);
    for (let tileY = startTileY; tileY <= endTileY; tileY++) {
      for (let tileX = startTileX; tileX <= endTileX; tileX++) {
        try {
          const tileBlob = await getTileImage(tileX, tileY);
          if (!tileBlob) {
            log(`\u26A0\uFE0F No se pudo obtener tile ${tileX},${tileY}, continuando...`);
            continue;
          }
          const img = new Image();
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = URL.createObjectURL(tileBlob);
          });
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const tileStartX = tileX * GUARD_DEFAULTS.TILE_SIZE;
          const tileStartY = tileY * GUARD_DEFAULTS.TILE_SIZE;
          const tileEndX = tileStartX + GUARD_DEFAULTS.TILE_SIZE;
          const tileEndY = tileStartY + GUARD_DEFAULTS.TILE_SIZE;
          const analyzeStartX = Math.max(x1, tileStartX);
          const analyzeStartY = Math.max(y1, tileStartY);
          const analyzeEndX = Math.min(x2, tileEndX);
          const analyzeEndY = Math.min(y2, tileEndY);
          for (let globalY = analyzeStartY; globalY < analyzeEndY; globalY++) {
            for (let globalX = analyzeStartX; globalX < analyzeEndX; globalX++) {
              const localX = globalX - tileStartX;
              const localY = globalY - tileStartY;
              if (localX >= 0 && localX < GUARD_DEFAULTS.TILE_SIZE && localY >= 0 && localY < GUARD_DEFAULTS.TILE_SIZE) {
                if (localX < canvas.width && localY < canvas.height) {
                  const pixelIndex = (localY * canvas.width + localX) * 4;
                  const r = data[pixelIndex];
                  const g = data[pixelIndex + 1];
                  const b = data[pixelIndex + 2];
                  const a = data[pixelIndex + 3];
                  if (a > 0) {
                    const closestColor = findClosestColor(r, g, b, guardState.availableColors);
                    if (closestColor) {
                      pixelMap.set(`${globalX},${globalY}`, {
                        r,
                        g,
                        b,
                        colorId: closestColor.id,
                        globalX,
                        globalY,
                        localX,
                        localY,
                        tileX,
                        tileY
                      });
                    }
                  }
                }
              }
            }
          }
          URL.revokeObjectURL(img.src);
        } catch (error) {
          log(`\u274C Error analizando tile ${tileX},${tileY}:`, error);
        }
      }
    }
    log(`\u2705 An\xE1lisis completado: ${pixelMap.size} p\xEDxeles protegidos`);
    if (pixelMap.size === 0) {
      log(`\u26A0\uFE0F No se encontraron p\xEDxeles existentes, creando \xE1rea virtual para protecci\xF3n`);
      for (let globalY = y1; globalY < y2; globalY++) {
        for (let globalX = x1; globalX < x2; globalX++) {
          const tileX = Math.floor(globalX / GUARD_DEFAULTS.TILE_SIZE);
          const tileY = Math.floor(globalY / GUARD_DEFAULTS.TILE_SIZE);
          const localX = globalX - tileX * GUARD_DEFAULTS.TILE_SIZE;
          const localY = globalY - tileY * GUARD_DEFAULTS.TILE_SIZE;
          pixelMap.set(`${globalX},${globalY}`, {
            r: 255,
            g: 255,
            b: 255,
            // Blanco por defecto
            colorId: 1,
            // ID del color blanco
            globalX,
            globalY,
            localX,
            localY,
            tileX,
            tileY
          });
        }
      }
      log(`\u2705 \xC1rea virtual creada: ${pixelMap.size} p\xEDxeles para proteger`);
    }
    return pixelMap;
  }
  async function checkForChanges() {
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      return;
    }
    try {
      const currentPixels = await analyzeAreaPixels(guardState.protectionArea);
      const changes = /* @__PURE__ */ new Map();
      let changedCount = 0;
      for (const [key, originalPixel] of guardState.originalPixels) {
        const currentPixel = currentPixels.get(key);
        if (!currentPixel) {
          changes.set(key, {
            timestamp: Date.now(),
            type: "deleted",
            original: originalPixel,
            current: null
          });
          changedCount++;
        } else if (currentPixel.colorId !== originalPixel.colorId) {
          changes.set(key, {
            timestamp: Date.now(),
            type: "changed",
            original: originalPixel,
            current: currentPixel
          });
          changedCount++;
        }
      }
      if (changedCount > 0) {
        log(`\u{1F6A8} Detectados ${changedCount} cambios en el \xE1rea protegida`);
        guardState.changes = changes;
        if (guardState.ui) {
          guardState.ui.updateStatus(`\u{1F6A8} ${changedCount} cambios detectados`, "warning");
          guardState.ui.updateProgress(changes.size, guardState.originalPixels.size);
        }
        if (guardState.running) {
          await repairChanges(changes);
        }
      } else {
        guardState.lastCheck = Date.now();
        if (guardState.ui) {
          guardState.ui.updateStatus("\u2705 \xC1rea protegida - sin cambios", "success");
        }
      }
    } catch (error) {
      log(`\u274C Error verificando cambios:`, error);
      if (guardState.ui) {
        guardState.ui.updateStatus(`\u274C Error verificando: ${error.message}`, "error");
      }
    }
  }
  async function repairChanges(changes) {
    if (changes.size === 0) {
      return;
    }
    const changesArray = Array.from(changes.values());
    const availableCharges = Math.floor(guardState.currentCharges);
    if (availableCharges === 0) {
      log(`\u26A0\uFE0F Sin cargas disponibles, esperando recarga...`);
      if (guardState.ui) {
        guardState.ui.updateStatus("\u26A1 Esperando cargas para reparar...", "warning");
      }
      return;
    }
    const shouldRepairAll = availableCharges < guardState.minChargesToWait;
    const maxRepairs = shouldRepairAll ? availableCharges : Math.min(changesArray.length, guardState.pixelsPerBatch);
    log(`\u{1F6E0}\uFE0F Cargas: ${availableCharges}, M\xEDnimo: ${guardState.minChargesToWait}, Reparando: ${maxRepairs} p\xEDxeles`);
    if (guardState.ui) {
      const repairMode = shouldRepairAll ? " (gastando todas las cargas)" : "";
      guardState.ui.updateStatus(`\u{1F6E0}\uFE0F Reparando ${maxRepairs} p\xEDxeles${repairMode}...`, "info");
    }
    const pixelsToRepair = changesArray.slice(0, maxRepairs);
    const changesByTile = /* @__PURE__ */ new Map();
    for (const change of pixelsToRepair) {
      const original = change.original;
      const tileKey = `${original.tileX},${original.tileY}`;
      if (!changesByTile.has(tileKey)) {
        changesByTile.set(tileKey, []);
      }
      changesByTile.get(tileKey).push({
        localX: original.localX,
        localY: original.localY,
        colorId: original.colorId,
        globalX: original.globalX,
        globalY: original.globalY
      });
    }
    let totalRepaired = 0;
    for (const [tileKey, tileChanges] of changesByTile) {
      const [tileX, tileY] = tileKey.split(",").map(Number);
      try {
        const coords = [];
        const colors = [];
        for (const change of tileChanges) {
          coords.push(change.localX, change.localY);
          colors.push(change.colorId);
        }
        const result = await paintPixelBatch(tileX, tileY, coords, colors);
        if (result.success && result.painted > 0) {
          totalRepaired += result.painted;
          guardState.currentCharges = Math.max(0, guardState.currentCharges - result.painted);
          guardState.totalRepaired += result.painted;
          for (let i = 0; i < result.painted && i < tileChanges.length; i++) {
            const change = tileChanges[i];
            const key = `${change.globalX},${change.globalY}`;
            guardState.changes.delete(key);
          }
          log(`\u2705 Reparados ${result.painted} p\xEDxeles en tile (${tileX},${tileY})`);
        } else {
          log(`\u274C Error reparando tile (${tileX},${tileY}):`, result.error);
        }
      } catch (error) {
        log(`\u274C Error reparando tile (${tileX},${tileY}):`, error);
      }
      if (changesByTile.size > 1) {
        await sleep(500);
      }
    }
    const remainingCharges = Math.floor(guardState.currentCharges);
    const remainingChanges = guardState.changes.size;
    log(`\u{1F6E0}\uFE0F Reparaci\xF3n completada: ${totalRepaired} p\xEDxeles reparados, ${remainingCharges} cargas restantes`);
    if (guardState.ui) {
      if (remainingChanges > 0 && remainingCharges < guardState.minChargesToWait) {
        guardState.ui.updateStatus(`\u23F3 Esperando ${guardState.minChargesToWait} cargas para continuar (${remainingCharges} actuales)`, "warning");
      } else {
        guardState.ui.updateStatus(`\u2705 Reparados ${totalRepaired} p\xEDxeles correctamente`, "success");
      }
      guardState.ui.updateStats({
        charges: remainingCharges,
        repaired: guardState.totalRepaired,
        pending: remainingChanges
      });
    }
  }
  async function paintPixelBatch(tileX, tileY, coords, colors) {
    var _a;
    try {
      const token = await getTurnstileToken(GUARD_DEFAULTS.SITEKEY);
      const response = await postPixelBatchImage(
        tileX,
        tileY,
        coords,
        colors,
        token
      );
      return {
        success: response.success,
        painted: response.painted,
        status: response.status,
        error: response.success ? null : ((_a = response.json) == null ? void 0 : _a.message) || "Error desconocido"
      };
    } catch (error) {
      return {
        success: false,
        painted: 0,
        error: error.message
      };
    }
  }

  // src/guard/ui.js
  function createGuardUI(texts) {
    const container = document.createElement("div");
    container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    color: #eee;
    font-family: 'Segoe UI', Roboto, sans-serif;
    z-index: 9999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  `;
    container.innerHTML = `
    <div style="padding: 12px 15px; background: #2d3748; color: #60a5fa; font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: move;" class="guard-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        \u{1F6E1}\uFE0F <span>${texts.title}</span>
      </div>
      <button id="closeBtn" style="background: none; border: none; color: #eee; cursor: pointer; opacity: 0.7; padding: 5px;">\u274C</button>
    </div>
    
    <div style="padding: 15px;">
      <!-- Estado de inicializaci\xF3n -->
      <div id="initSection">
        <button id="initBtn" style="width: 100%; padding: 10px; background: #60a5fa; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 10px;">
          \u{1F916} ${texts.initBot}
        </button>
      </div>
      
      <!-- Selecci\xF3n de \xE1rea -->
      <div id="areaSection" style="display: none;">
        <!-- Botones de \xE1rea - en dos columnas -->
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <button id="selectAreaBtn" style="flex: 1; padding: 10px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            \u{1F3AF} ${texts.selectArea}
          </button>
          <button id="loadAreaBtn" style="flex: 1; padding: 10px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            \u{1F4C1} Cargar Archivo
          </button>
        </div>
        
        <!-- Coordenadas capturadas (solo lectura) -->
        <div style="margin-bottom: 15px;">
          <div style="display: flex; gap: 10px; margin-bottom: 8px;">
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">${texts.upperLeft}:</label>
              <div style="display: flex; gap: 5px;">
                <input id="x1Input" type="number" placeholder="X1" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
                <input id="y1Input" type="number" placeholder="Y1" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
              </div>
            </div>
          </div>
          
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 1;">
              <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">${texts.lowerRight}:</label>
              <div style="display: flex; gap: 5px;">
                <input id="x2Input" type="number" placeholder="X2" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
                <input id="y2Input" type="number" placeholder="Y2" readonly style="flex: 1; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
              </div>
            </div>
          </div>
        </div>
        
        <button id="startBtn" style="width: 100%; padding: 10px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 10px;" disabled>
          \u25B6\uFE0F ${texts.startProtection}
        </button>
        
        <button id="stopBtn" style="width: 100%; padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;" disabled>
          \u23F9\uFE0F ${texts.stopProtection}
        </button>
      </div>
      
      <!-- Estad\xEDsticas -->
      <div id="statsSection" style="background: #2d3748; padding: 10px; border-radius: 6px; margin-top: 10px;">
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>\u{1F4CA} ${texts.protectedPixels}: </span><span id="protectedCount">0</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>\u{1F6A8} ${texts.detectedChanges}: </span><span id="changesCount">0</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 5px;">
          <span>\u26A1 ${texts.charges}: </span><span id="chargesCount">0</span>
        </div>
        <div style="font-size: 13px;">
          <span>\u{1F6E0}\uFE0F ${texts.repairedPixels}: </span><span id="repairedCount">0</span>
        </div>
      </div>
      
      <!-- Controles de configuraci\xF3n -->
      <div id="configSection" style="background: #2d3748; padding: 10px; border-radius: 6px; margin-top: 10px;">
        <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #cbd5e0;">\u2699\uFE0F Configuraci\xF3n</h4>
        
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">P\xEDxeles por lote:</label>
            <input id="pixelsPerBatchInput" type="number" min="1" max="50" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
          </div>
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 12px; color: #cbd5e0;">Cargas m\xEDnimas:</label>
            <input id="minChargesInput" type="number" min="1" max="100" style="width: 100%; padding: 5px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db; font-size: 13px;">
          </div>
        </div>
        
        <!-- Controles de save/load -->
        <div style="display: flex; gap: 10px;">
          <button id="saveBtn" style="width: 100%; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px;">
            \u{1F4BE} Guardar Protecci\xF3n
          </button>
        </div>
      </div>
      
      <!-- Estado -->
      <div id="statusBar" style="background: #2d3748; padding: 8px; border-radius: 4px; text-align: center; font-size: 13px; margin-top: 10px;">
        \u23F3 ${texts.waitingInit}
      </div>
    </div>
  `;
    document.body.appendChild(container);
    const areaFileInput = document.createElement("input");
    areaFileInput.type = "file";
    areaFileInput.accept = ".json";
    areaFileInput.style.display = "none";
    document.body.appendChild(areaFileInput);
    makeDraggable(container);
    const elements = {
      initBtn: container.querySelector("#initBtn"),
      selectAreaBtn: container.querySelector("#selectAreaBtn"),
      loadAreaBtn: container.querySelector("#loadAreaBtn"),
      x1Input: container.querySelector("#x1Input"),
      y1Input: container.querySelector("#y1Input"),
      x2Input: container.querySelector("#x2Input"),
      y2Input: container.querySelector("#y2Input"),
      startBtn: container.querySelector("#startBtn"),
      stopBtn: container.querySelector("#stopBtn"),
      closeBtn: container.querySelector("#closeBtn"),
      initSection: container.querySelector("#initSection"),
      areaSection: container.querySelector("#areaSection"),
      protectedCount: container.querySelector("#protectedCount"),
      changesCount: container.querySelector("#changesCount"),
      chargesCount: container.querySelector("#chargesCount"),
      repairedCount: container.querySelector("#repairedCount"),
      statusBar: container.querySelector("#statusBar"),
      areaFileInput,
      pixelsPerBatchInput: container.querySelector("#pixelsPerBatchInput"),
      minChargesInput: container.querySelector("#minChargesInput"),
      saveBtn: container.querySelector("#saveBtn")
    };
    const ui = {
      elements,
      updateStatus: (message, type = "info") => {
        elements.statusBar.textContent = message;
        const colors = {
          info: "#60a5fa",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444"
        };
        elements.statusBar.style.color = colors[type] || colors.info;
      },
      updateProgress: (current, total) => {
        elements.changesCount.textContent = current;
        elements.protectedCount.textContent = total;
      },
      updateStats: (stats) => {
        if (stats.charges !== void 0) elements.chargesCount.textContent = stats.charges;
        if (stats.repaired !== void 0) elements.repairedCount.textContent = stats.repaired;
        if (stats.pending !== void 0) elements.changesCount.textContent = stats.pending;
      },
      showAreaSection: () => {
        elements.initSection.style.display = "none";
        elements.areaSection.style.display = "block";
      },
      setInitButtonVisible: (visible) => {
        elements.initSection.style.display = visible ? "block" : "none";
      },
      setInitialized: (initialized) => {
        elements.initBtn.disabled = initialized;
        if (initialized) {
          elements.initBtn.style.opacity = "0.5";
          elements.initBtn.style.cursor = "not-allowed";
        }
      },
      enableStartBtn: () => {
        elements.startBtn.disabled = false;
      },
      setRunningState: (running) => {
        elements.startBtn.disabled = running;
        elements.stopBtn.disabled = !running;
        elements.selectAreaBtn.disabled = running;
      },
      updateCoordinates: (coords) => {
        if (coords.x1 !== void 0) elements.x1Input.value = coords.x1;
        if (coords.y1 !== void 0) elements.y1Input.value = coords.y1;
        if (coords.x2 !== void 0) elements.x2Input.value = coords.x2;
        if (coords.y2 !== void 0) elements.y2Input.value = coords.y2;
      },
      destroy: () => {
        container.remove();
        areaFileInput.remove();
      }
    };
    return ui;
  }
  function showConfirmDialog(message, title, buttons = {}) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "rgba(0,0,0,0.7)";
      overlay.style.zIndex = "10001";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      const modal = document.createElement("div");
      modal.style.background = "#1a1a1a";
      modal.style.border = "2px solid #333";
      modal.style.borderRadius = "15px";
      modal.style.padding = "25px";
      modal.style.color = "#eee";
      modal.style.minWidth = "350px";
      modal.style.maxWidth = "400px";
      modal.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
      modal.style.fontFamily = "'Segoe UI', Roboto, sans-serif";
      modal.innerHTML = `
      <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${title}</h3>
      <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4;">${message}</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        ${buttons.save ? `<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${buttons.save}</button>` : ""}
        ${buttons.discard ? `<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${buttons.discard}</button>` : ""}
        ${buttons.cancel ? `<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${buttons.cancel}</button>` : ""}
      </div>
    `;
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      const saveBtn = modal.querySelector(".save-btn");
      const discardBtn = modal.querySelector(".discard-btn");
      const cancelBtn = modal.querySelector(".cancel-btn");
      const cleanup = () => {
        document.body.removeChild(overlay);
      };
      if (saveBtn) {
        saveBtn.addEventListener("click", () => {
          cleanup();
          resolve("save");
        });
      }
      if (discardBtn) {
        discardBtn.addEventListener("click", () => {
          cleanup();
          resolve("discard");
        });
      }
      if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
          cleanup();
          resolve("cancel");
        });
      }
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          cleanup();
          resolve("cancel");
        }
      });
    });
  }
  function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    const header = element.querySelector(".guard-header");
    header.addEventListener("mousedown", (e) => {
      if (e.target.id === "closeBtn") return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(window.getComputedStyle(element).left, 10);
      startTop = parseInt(window.getComputedStyle(element).top, 10);
      element.style.cursor = "grabbing";
    });
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      element.style.left = `${startLeft + deltaX}px`;
      element.style.top = `${startTop + deltaY}px`;
      element.style.right = "auto";
    });
    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        element.style.cursor = "default";
      }
    });
  }

  // src/guard/save-load.js
  function splitProtectionArea(area, splitCount) {
    const { x1, y1, x2, y2 } = area;
    const width = x2 - x1;
    const height = y2 - y1;
    const areas = [];
    if (splitCount <= 1) {
      return [area];
    }
    const divideHorizontally = width >= height;
    if (divideHorizontally) {
      const segmentWidth = Math.floor(width / splitCount);
      for (let i = 0; i < splitCount; i++) {
        const startX = x1 + i * segmentWidth;
        const endX = i === splitCount - 1 ? x2 : startX + segmentWidth;
        areas.push({
          x1: startX,
          y1,
          x2: endX,
          y2
        });
      }
    } else {
      const segmentHeight = Math.floor(height / splitCount);
      for (let i = 0; i < splitCount; i++) {
        const startY = y1 + i * segmentHeight;
        const endY = i === splitCount - 1 ? y2 : startY + segmentHeight;
        areas.push({
          x1,
          y1: startY,
          x2,
          y2: endY
        });
      }
    }
    return areas;
  }
  function getPixelsInArea(area, pixelsMap) {
    const pixels = [];
    const { x1, y1, x2, y2 } = area;
    for (const [key, value] of pixelsMap.entries()) {
      const [x, y] = key.split(",").map(Number);
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        pixels.push({ key, ...value });
      }
    }
    return pixels;
  }
  function saveProgress(filename = null, splitCount = null) {
    try {
      if (!guardState.protectionArea || !guardState.originalPixels.size) {
        throw new Error("No hay progreso para guardar");
      }
      const areas = splitCount && splitCount > 1 ? splitProtectionArea(guardState.protectionArea, splitCount) : [guardState.protectionArea];
      const results = [];
      for (let i = 0; i < areas.length; i++) {
        const area = areas[i];
        const areaPixels = getPixelsInArea(area, guardState.originalPixels);
        const progressData = {
          version: "1.0",
          timestamp: Date.now(),
          protectionData: {
            area: { ...area },
            protectedPixels: areaPixels.length,
            splitInfo: splitCount > 1 ? {
              total: splitCount,
              current: i + 1,
              originalArea: { ...guardState.protectionArea }
            } : null
          },
          progress: {
            totalRepaired: guardState.totalRepaired,
            lastCheck: guardState.lastCheck
          },
          config: {
            maxProtectionSize: 1e5,
            pixelsPerBatch: 10,
            checkInterval: 1e4
          },
          // Filtrar solo los datos serializables de los colores (sin elementos DOM)
          colors: guardState.availableColors.map((color) => ({
            id: color.id,
            r: color.r,
            g: color.g,
            b: color.b
          })),
          // Convertir Map a array para serialización - solo píxeles del área
          originalPixels: areaPixels
        };
        const dataStr = JSON.stringify(progressData, null, 2);
        const blob = new window.Blob([dataStr], { type: "application/json" });
        const suffix = splitCount > 1 ? `_parte${i + 1}de${splitCount}` : "";
        const finalFilename = filename || `wplace_GUARD_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-")}${suffix}.json`;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = finalFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        results.push({ success: true, filename: finalFilename });
        log(`\u2705 Progreso guardado: ${finalFilename}`);
      }
      return {
        success: true,
        filename: results.length === 1 ? results[0].filename : `${results.length} archivos`,
        files: results
      };
    } catch (error) {
      log("\u274C Error guardando progreso:", error);
      return { success: false, error: error.message };
    }
  }
  async function loadProgress(file) {
    return new Promise((resolve) => {
      try {
        const reader = new window.FileReader();
        reader.onload = async (e) => {
          try {
            const progressData = JSON.parse(e.target.result);
            const requiredFields = ["protectionData", "originalPixels", "colors"];
            const missingFields = requiredFields.filter((field) => !(field in progressData));
            if (missingFields.length > 0) {
              throw new Error(`Campos requeridos faltantes: ${missingFields.join(", ")}`);
            }
            if (guardState.availableColors.length > 0) {
              const savedColorIds = progressData.colors.map((c) => c.id);
              const currentColorIds = guardState.availableColors.map((c) => c.id);
              const commonColors = savedColorIds.filter((id) => currentColorIds.includes(id));
              if (commonColors.length < savedColorIds.length * 0.8) {
                log("\u26A0\uFE0F Los colores guardados no coinciden completamente con los actuales");
              }
            }
            if (progressData.protectionData) {
              guardState.protectionArea = progressData.protectionData.area;
            } else if (progressData.protectionArea) {
              guardState.protectionArea = progressData.protectionArea;
            }
            guardState.originalPixels = /* @__PURE__ */ new Map();
            for (const pixelData of progressData.originalPixels) {
              const { key, ...pixelInfo } = pixelData;
              guardState.originalPixels.set(key, pixelInfo);
            }
            if (progressData.progress) {
              guardState.totalRepaired = progressData.progress.totalRepaired || 0;
              guardState.lastCheck = progressData.progress.lastCheck || 0;
            } else if (progressData.statistics) {
              guardState.totalRepaired = progressData.statistics.totalRepaired || 0;
              guardState.lastCheck = progressData.statistics.lastCheck || 0;
            }
            guardState.changes.clear();
            if (guardState.ui) {
              guardState.ui.updateCoordinates({
                x1: guardState.protectionArea.x1,
                y1: guardState.protectionArea.y1,
                x2: guardState.protectionArea.x2,
                y2: guardState.protectionArea.y2
              });
              guardState.ui.updateProgress(0, guardState.originalPixels.size);
              guardState.ui.updateStats({
                repaired: guardState.totalRepaired
              });
              guardState.ui.enableStartBtn();
            }
            log(`\u2705 Progreso cargado: ${guardState.originalPixels.size} p\xEDxeles protegidos`);
            resolve({
              success: true,
              data: progressData,
              protectedPixels: guardState.originalPixels.size,
              area: guardState.protectionArea
            });
          } catch (parseError) {
            log("\u274C Error parseando archivo de progreso:", parseError);
            resolve({ success: false, error: parseError.message });
          }
        };
        reader.onerror = () => {
          const error = "Error leyendo archivo";
          log("\u274C", error);
          resolve({ success: false, error });
        };
        reader.readAsText(file);
      } catch (error) {
        log("\u274C Error cargando progreso:", error);
        resolve({ success: false, error: error.message });
      }
    });
  }
  function hasProgress() {
    return guardState.protectionArea && guardState.originalPixels.size > 0;
  }

  // src/locales/es.js
  var es = {
    // Launcher
    launcher: {
      title: "WPlace AutoBOT",
      autoFarm: "\u{1F33E} Auto-Farm",
      autoImage: "\u{1F3A8} Auto-Image",
      autoGuard: "\u{1F6E1}\uFE0F Auto-Guard",
      selection: "Selecci\xF3n",
      user: "Usuario",
      charges: "Cargas",
      backend: "Backend",
      database: "Database",
      uptime: "Uptime",
      close: "Cerrar",
      launch: "Lanzar",
      loading: "Cargando\u2026",
      executing: "Ejecutando\u2026",
      downloading: "Descargando script\u2026",
      chooseBot: "Elige un bot y presiona Lanzar",
      readyToLaunch: "Listo para lanzar",
      loadError: "Error al cargar",
      loadErrorMsg: "No se pudo cargar el bot seleccionado. Revisa tu conexi\xF3n o int\xE9ntalo de nuevo.",
      checking: "\u{1F504} Verificando...",
      online: "\u{1F7E2} Online",
      offline: "\u{1F534} Offline",
      ok: "\u{1F7E2} OK",
      error: "\u{1F534} Error",
      unknown: "-"
    },
    // Image Module
    image: {
      title: "WPlace Auto-Image",
      initBot: "Iniciar Auto-BOT",
      uploadImage: "Subir Imagen",
      resizeImage: "Redimensionar Imagen",
      selectPosition: "Seleccionar Posici\xF3n",
      startPainting: "Iniciar Pintura",
      stopPainting: "Detener Pintura",
      saveProgress: "Guardar Progreso",
      loadProgress: "Cargar Progreso",
      checkingColors: "\u{1F50D} Verificando colores disponibles...",
      noColorsFound: "\u274C \xA1Abre la paleta de colores en el sitio e int\xE9ntalo de nuevo!",
      colorsFound: "\u2705 {count} colores disponibles encontrados",
      loadingImage: "\u{1F5BC}\uFE0F Cargando imagen...",
      imageLoaded: "\u2705 Imagen cargada con {count} p\xEDxeles v\xE1lidos",
      imageError: "\u274C Error al cargar la imagen",
      selectPositionAlert: "\xA1Pinta el primer p\xEDxel en la ubicaci\xF3n donde quieres que comience el arte!",
      waitingPosition: "\u{1F446} Esperando que pintes el p\xEDxel de referencia...",
      positionSet: "\u2705 \xA1Posici\xF3n establecida con \xE9xito!",
      positionTimeout: "\u274C Tiempo agotado para seleccionar posici\xF3n",
      positionDetected: "\u{1F3AF} Posici\xF3n detectada, procesando...",
      positionError: "\u274C Error detectando posici\xF3n, int\xE9ntalo de nuevo",
      startPaintingMsg: "\u{1F3A8} Iniciando pintura...",
      paintingProgress: "\u{1F9F1} Progreso: {painted}/{total} p\xEDxeles...",
      noCharges: "\u231B Sin cargas. Esperando {time}...",
      paintingStopped: "\u23F9\uFE0F Pintura detenida por el usuario",
      paintingComplete: "\u2705 \xA1Pintura completada! {count} p\xEDxeles pintados.",
      paintingError: "\u274C Error durante la pintura",
      missingRequirements: "\u274C Carga una imagen y selecciona una posici\xF3n primero",
      progress: "Progreso",
      userName: "Usuario",
      pixels: "P\xEDxeles",
      charges: "Cargas",
      estimatedTime: "Tiempo estimado",
      initMessage: "Haz clic en 'Iniciar Auto-BOT' para comenzar",
      waitingInit: "Esperando inicializaci\xF3n...",
      resizeSuccess: "\u2705 Imagen redimensionada a {width}x{height}",
      paintingPaused: "\u23F8\uFE0F Pintura pausada en la posici\xF3n X: {x}, Y: {y}",
      pixelsPerBatch: "P\xEDxeles por lote",
      batchSize: "Tama\xF1o del lote",
      nextBatchTime: "Siguiente lote en",
      useAllCharges: "Usar todas las cargas disponibles",
      showOverlay: "Mostrar overlay",
      maxCharges: "Cargas m\xE1ximas por lote",
      waitingForCharges: "\u23F3 Esperando cargas: {current}/{needed}",
      timeRemaining: "Tiempo restante",
      cooldownWaiting: "\u23F3 Esperando {time} para continuar...",
      progressSaved: "\u2705 Progreso guardado como {filename}",
      progressLoaded: "\u2705 Progreso cargado: {painted}/{total} p\xEDxeles pintados",
      progressLoadError: "\u274C Error al cargar progreso: {error}",
      progressSaveError: "\u274C Error al guardar progreso: {error}",
      confirmSaveProgress: "\xBFDeseas guardar el progreso actual antes de detener?",
      saveProgressTitle: "Guardar Progreso",
      discardProgress: "Descartar",
      cancel: "Cancelar",
      minimize: "Minimizar",
      width: "Ancho",
      height: "Alto",
      keepAspect: "Mantener proporci\xF3n",
      apply: "Aplicar",
      overlayOn: "Overlay: ON",
      overlayOff: "Overlay: OFF",
      passCompleted: "\u2705 Pasada completada: {painted} p\xEDxeles pintados | Progreso: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 Esperando regeneraci\xF3n de cargas: {current}/{needed} - Tiempo: {time}",
      waitingChargesCountdown: "\u23F3 Esperando cargas: {current}/{needed} - Quedan: {time}",
      autoInitializing: "\u{1F916} Inicializando autom\xE1ticamente...",
      autoInitSuccess: "\u2705 Bot iniciado autom\xE1ticamente",
      autoInitFailed: "\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",
      paletteDetected: "\u{1F3A8} Paleta de colores detectada",
      paletteNotFound: "\u{1F50D} Buscando paleta de colores...",
      clickingPaintButton: "\u{1F446} Haciendo clic en el bot\xF3n Paint...",
      paintButtonNotFound: "\u274C Bot\xF3n Paint no encontrado",
      manualInitRequired: "\u{1F527} Inicio manual requerido",
      retryAttempt: "\u{1F504} Reintento {attempt}/{maxAttempts} en {delay}s...",
      retryError: "\u{1F4A5} Error en intento {attempt}/{maxAttempts}, reintentando en {delay}s...",
      retryFailed: "\u274C Fall\xF3 despu\xE9s de {maxAttempts} intentos. Continuando con siguiente lote...",
      networkError: "\u{1F310} Error de red. Reintentando...",
      serverError: "\u{1F525} Error del servidor. Reintentando...",
      timeoutError: "\u23F0 Timeout del servidor. Reintentando..."
    },
    // Farm Module (por implementar)
    farm: {
      title: "WPlace Farm Bot",
      start: "Iniciar",
      stop: "Detener",
      stopped: "Bot detenido",
      calibrate: "Calibrar",
      paintOnce: "Una vez",
      checkingStatus: "Verificando estado...",
      configuration: "Configuraci\xF3n",
      delay: "Delay (ms)",
      pixelsPerBatch: "P\xEDxeles/lote",
      minCharges: "Cargas m\xEDn",
      colorMode: "Modo color",
      random: "Aleatorio",
      fixed: "Fijo",
      range: "Rango",
      fixedColor: "Color fijo",
      advanced: "Avanzado",
      tileX: "Tile X",
      tileY: "Tile Y",
      customPalette: "Paleta personalizada",
      paletteExample: "ej: #FF0000,#00FF00,#0000FF",
      capture: "Capturar",
      painted: "Pintados",
      charges: "Cargas",
      retries: "Fallos",
      tile: "Tile",
      configSaved: "Configuraci\xF3n guardada",
      configLoaded: "Configuraci\xF3n cargada",
      configReset: "Configuraci\xF3n reiniciada",
      captureInstructions: "Pinta un p\xEDxel manualmente para capturar coordenadas...",
      backendOnline: "Backend Online",
      backendOffline: "Backend Offline",
      startingBot: "Iniciando bot...",
      stoppingBot: "Deteniendo bot...",
      calibrating: "Calibrando...",
      alreadyRunning: "Auto-Farm ya est\xE1 corriendo.",
      imageRunningWarning: "Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Farm.",
      selectPosition: "Seleccionar Zona",
      selectPositionAlert: "\u{1F3AF} Pinta un p\xEDxel en una zona DESPOBLADA del mapa para establecer el \xE1rea de farming",
      waitingPosition: "\u{1F446} Esperando que pintes el p\xEDxel de referencia...",
      positionSet: "\u2705 \xA1Zona establecida! Radio: 500px",
      positionTimeout: "\u274C Tiempo agotado para seleccionar zona",
      missingPosition: "\u274C Selecciona una zona primero usando 'Seleccionar Zona'",
      farmRadius: "Radio farm",
      positionInfo: "Zona actual",
      farmingInRadius: "\u{1F33E} Farming en radio {radius}px desde ({x},{y})",
      selectEmptyArea: "\u26A0\uFE0F IMPORTANTE: Selecciona una zona DESPOBLADA para evitar conflictos",
      noPosition: "Sin zona",
      currentZone: "Zona: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} Selecciona una zona primero. Pinta un p\xEDxel en el mapa para establecer la zona de farming"
    },
    // Common/Shared
    common: {
      yes: "S\xED",
      no: "No",
      ok: "Aceptar",
      cancel: "Cancelar",
      close: "Cerrar",
      save: "Guardar",
      load: "Cargar",
      delete: "Eliminar",
      edit: "Editar",
      start: "Iniciar",
      stop: "Detener",
      pause: "Pausar",
      resume: "Reanudar",
      reset: "Reiniciar",
      settings: "Configuraci\xF3n",
      help: "Ayuda",
      about: "Acerca de",
      language: "Idioma",
      loading: "Cargando...",
      error: "Error",
      success: "\xC9xito",
      warning: "Advertencia",
      info: "Informaci\xF3n",
      languageChanged: "Idioma cambiado a {language}"
    },
    // Guard Module
    guard: {
      title: "WPlace Auto-Guard",
      initBot: "Inicializar Guard-BOT",
      selectArea: "Seleccionar \xC1rea",
      captureArea: "Capturar \xC1rea",
      startProtection: "Iniciar Protecci\xF3n",
      stopProtection: "Detener Protecci\xF3n",
      upperLeft: "Esquina Superior Izquierda",
      lowerRight: "Esquina Inferior Derecha",
      protectedPixels: "P\xEDxeles Protegidos",
      detectedChanges: "Cambios Detectados",
      repairedPixels: "P\xEDxeles Reparados",
      charges: "Cargas",
      waitingInit: "Esperando inicializaci\xF3n...",
      checkingColors: "\u{1F3A8} Verificando colores disponibles...",
      noColorsFound: "\u274C No se encontraron colores. Abre la paleta de colores en el sitio.",
      colorsFound: "\u2705 {count} colores disponibles encontrados",
      initSuccess: "\u2705 Guard-BOT inicializado correctamente",
      initError: "\u274C Error inicializando Guard-BOT",
      invalidCoords: "\u274C Coordenadas inv\xE1lidas",
      invalidArea: "\u274C El \xE1rea debe tener esquina superior izquierda menor que inferior derecha",
      areaTooLarge: "\u274C \xC1rea demasiado grande: {size} p\xEDxeles (m\xE1ximo: {max})",
      capturingArea: "\u{1F4F8} Capturando \xE1rea de protecci\xF3n...",
      areaCaptured: "\u2705 \xC1rea capturada: {count} p\xEDxeles bajo protecci\xF3n",
      captureError: "\u274C Error capturando \xE1rea: {error}",
      captureFirst: "\u274C Primero captura un \xE1rea de protecci\xF3n",
      protectionStarted: "\u{1F6E1}\uFE0F Protecci\xF3n iniciada - monitoreando \xE1rea",
      protectionStopped: "\u23F9\uFE0F Protecci\xF3n detenida",
      noChanges: "\u2705 \xC1rea protegida - sin cambios detectados",
      changesDetected: "\u{1F6A8} {count} cambios detectados en el \xE1rea protegida",
      repairing: "\u{1F6E0}\uFE0F Reparando {count} p\xEDxeles alterados...",
      repairedSuccess: "\u2705 Reparados {count} p\xEDxeles correctamente",
      repairError: "\u274C Error reparando p\xEDxeles: {error}",
      noCharges: "\u26A0\uFE0F Sin cargas suficientes para reparar cambios",
      checkingChanges: "\u{1F50D} Verificando cambios en \xE1rea protegida...",
      errorChecking: "\u274C Error verificando cambios: {error}",
      guardActive: "\u{1F6E1}\uFE0F Guardi\xE1n activo - \xE1rea bajo protecci\xF3n",
      lastCheck: "\xDAltima verificaci\xF3n: {time}",
      nextCheck: "Pr\xF3xima verificaci\xF3n en: {time}s",
      autoInitializing: "\u{1F916} Inicializando autom\xE1ticamente...",
      autoInitSuccess: "\u2705 Guard-BOT iniciado autom\xE1ticamente",
      autoInitFailed: "\u26A0\uFE0F No se pudo iniciar autom\xE1ticamente. Usa el bot\xF3n manual.",
      manualInitRequired: "\u{1F527} Inicio manual requerido",
      paletteDetected: "\u{1F3A8} Paleta de colores detectada",
      paletteNotFound: "\u{1F50D} Buscando paleta de colores...",
      clickingPaintButton: "\u{1F446} Haciendo clic en el bot\xF3n Paint...",
      paintButtonNotFound: "\u274C Bot\xF3n Paint no encontrado",
      selectUpperLeft: "\u{1F3AF} Pinta un p\xEDxel en la esquina SUPERIOR IZQUIERDA del \xE1rea a proteger",
      selectLowerRight: "\u{1F3AF} Ahora pinta un p\xEDxel en la esquina INFERIOR DERECHA del \xE1rea",
      waitingUpperLeft: "\u{1F446} Esperando selecci\xF3n de esquina superior izquierda...",
      waitingLowerRight: "\u{1F446} Esperando selecci\xF3n de esquina inferior derecha...",
      upperLeftCaptured: "\u2705 Esquina superior izquierda capturada: ({x}, {y})",
      lowerRightCaptured: "\u2705 Esquina inferior derecha capturada: ({x}, {y})",
      selectionTimeout: "\u274C Tiempo agotado para selecci\xF3n",
      selectionError: "\u274C Error en selecci\xF3n, int\xE9ntalo de nuevo"
    }
  };

  // src/locales/en.js
  var en = {
    // Launcher
    launcher: {
      title: "WPlace AutoBOT",
      autoFarm: "\u{1F33E} Auto-Farm",
      autoImage: "\u{1F3A8} Auto-Image",
      autoGuard: "\u{1F6E1}\uFE0F Auto-Guard",
      selection: "Selection",
      user: "User",
      charges: "Charges",
      backend: "Backend",
      database: "Database",
      uptime: "Uptime",
      close: "Close",
      launch: "Launch",
      loading: "Loading\u2026",
      executing: "Executing\u2026",
      downloading: "Downloading script\u2026",
      chooseBot: "Choose a bot and press Launch",
      readyToLaunch: "Ready to launch",
      loadError: "Load error",
      loadErrorMsg: "Could not load the selected bot. Check your connection or try again.",
      checking: "\u{1F504} Checking...",
      online: "\u{1F7E2} Online",
      offline: "\u{1F534} Offline",
      ok: "\u{1F7E2} OK",
      error: "\u{1F534} Error",
      unknown: "-"
    },
    // Image Module
    image: {
      title: "WPlace Auto-Image",
      initBot: "Initialize Auto-BOT",
      uploadImage: "Upload Image",
      resizeImage: "Resize Image",
      selectPosition: "Select Position",
      startPainting: "Start Painting",
      stopPainting: "Stop Painting",
      saveProgress: "Save Progress",
      loadProgress: "Load Progress",
      checkingColors: "\u{1F50D} Checking available colors...",
      noColorsFound: "\u274C Open the color palette on the site and try again!",
      colorsFound: "\u2705 Found {count} available colors",
      loadingImage: "\u{1F5BC}\uFE0F Loading image...",
      imageLoaded: "\u2705 Image loaded with {count} valid pixels",
      imageError: "\u274C Error loading image",
      selectPositionAlert: "Paint the first pixel at the location where you want the art to start!",
      waitingPosition: "\u{1F446} Waiting for you to paint the reference pixel...",
      positionSet: "\u2705 Position set successfully!",
      positionTimeout: "\u274C Timeout for position selection",
      positionDetected: "\u{1F3AF} Position detected, processing...",
      positionError: "\u274C Error detecting position, please try again",
      startPaintingMsg: "\u{1F3A8} Starting painting...",
      paintingProgress: "\u{1F9F1} Progress: {painted}/{total} pixels...",
      noCharges: "\u231B No charges. Waiting {time}...",
      paintingStopped: "\u23F9\uFE0F Painting stopped by user",
      paintingComplete: "\u2705 Painting completed! {count} pixels painted.",
      paintingError: "\u274C Error during painting",
      missingRequirements: "\u274C Load an image and select a position first",
      progress: "Progress",
      userName: "User",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Estimated time",
      initMessage: "Click 'Initialize Auto-BOT' to begin",
      waitingInit: "Waiting for initialization...",
      resizeSuccess: "\u2705 Image resized to {width}x{height}",
      paintingPaused: "\u23F8\uFE0F Painting paused at position X: {x}, Y: {y}",
      pixelsPerBatch: "Pixels per batch",
      batchSize: "Batch size",
      nextBatchTime: "Next batch in",
      useAllCharges: "Use all available charges",
      showOverlay: "Show overlay",
      maxCharges: "Max charges per batch",
      waitingForCharges: "\u23F3 Waiting for charges: {current}/{needed}",
      timeRemaining: "Time remaining",
      cooldownWaiting: "\u23F3 Waiting {time} to continue...",
      progressSaved: "\u2705 Progress saved as {filename}",
      progressLoaded: "\u2705 Progress loaded: {painted}/{total} pixels painted",
      progressLoadError: "\u274C Error loading progress: {error}",
      progressSaveError: "\u274C Error saving progress: {error}",
      confirmSaveProgress: "Do you want to save the current progress before stopping?",
      saveProgressTitle: "Save Progress",
      discardProgress: "Discard",
      cancel: "Cancel",
      minimize: "Minimize",
      width: "Width",
      height: "Height",
      keepAspect: "Keep aspect ratio",
      apply: "Apply",
      overlayOn: "Overlay: ON",
      overlayOff: "Overlay: OFF",
      passCompleted: "\u2705 Pass completed: {painted} pixels painted | Progress: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 Waiting for charge regeneration: {current}/{needed} - Time: {time}",
      waitingChargesCountdown: "\u23F3 Waiting for charges: {current}/{needed} - Remaining: {time}",
      autoInitializing: "\u{1F916} Auto-initializing...",
      autoInitSuccess: "\u2705 Bot auto-started successfully",
      autoInitFailed: "\u26A0\uFE0F Could not auto-start. Use manual button.",
      paletteDetected: "\u{1F3A8} Color palette detected",
      paletteNotFound: "\u{1F50D} Searching for color palette...",
      clickingPaintButton: "\u{1F446} Clicking Paint button...",
      paintButtonNotFound: "\u274C Paint button not found",
      manualInitRequired: "\u{1F527} Manual initialization required",
      retryAttempt: "\u{1F504} Retry {attempt}/{maxAttempts} in {delay}s...",
      retryError: "\u{1F4A5} Error in attempt {attempt}/{maxAttempts}, retrying in {delay}s...",
      retryFailed: "\u274C Failed after {maxAttempts} attempts. Continuing with next batch...",
      networkError: "\u{1F310} Network error. Retrying...",
      serverError: "\u{1F525} Server error. Retrying...",
      timeoutError: "\u23F0 Server timeout. Retrying..."
    },
    // Farm Module (to be implemented)
    farm: {
      title: "WPlace Farm Bot",
      start: "Start",
      stop: "Stop",
      stopped: "Bot stopped",
      calibrate: "Calibrate",
      paintOnce: "Once",
      checkingStatus: "Checking status...",
      configuration: "Configuration",
      delay: "Delay (ms)",
      pixelsPerBatch: "Pixels/batch",
      minCharges: "Min charges",
      colorMode: "Color mode",
      random: "Random",
      fixed: "Fixed",
      range: "Range",
      fixedColor: "Fixed color",
      advanced: "Advanced",
      tileX: "Tile X",
      tileY: "Tile Y",
      customPalette: "Custom palette",
      paletteExample: "e.g: #FF0000,#00FF00,#0000FF",
      capture: "Capture",
      painted: "Painted",
      charges: "Charges",
      retries: "Retries",
      tile: "Tile",
      configSaved: "Configuration saved",
      configLoaded: "Configuration loaded",
      configReset: "Configuration reset",
      captureInstructions: "Paint a pixel manually to capture coordinates...",
      backendOnline: "Backend Online",
      backendOffline: "Backend Offline",
      startingBot: "Starting bot...",
      stoppingBot: "Stopping bot...",
      calibrating: "Calibrating...",
      alreadyRunning: "Auto-Farm is already running.",
      imageRunningWarning: "Auto-Image is running. Close it before starting Auto-Farm.",
      selectPosition: "Select Area",
      selectPositionAlert: "\u{1F3AF} Paint a pixel in an EMPTY area of the map to set the farming zone",
      waitingPosition: "\u{1F446} Waiting for you to paint the reference pixel...",
      positionSet: "\u2705 Area set! Radius: 500px",
      positionTimeout: "\u274C Timeout for area selection",
      missingPosition: "\u274C Select an area first using 'Select Area'",
      farmRadius: "Farm radius",
      positionInfo: "Current area",
      farmingInRadius: "\u{1F33E} Farming in {radius}px radius from ({x},{y})",
      selectEmptyArea: "\u26A0\uFE0F IMPORTANT: Select an EMPTY area to avoid conflicts",
      noPosition: "No area",
      currentZone: "Zone: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} Select an area first. Paint a pixel on the map to set the farming zone"
    },
    // Common/Shared
    common: {
      yes: "Yes",
      no: "No",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      save: "Save",
      load: "Load",
      delete: "Delete",
      edit: "Edit",
      start: "Start",
      stop: "Stop",
      pause: "Pause",
      resume: "Resume",
      reset: "Reset",
      settings: "Settings",
      help: "Help",
      about: "About",
      language: "Language",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information",
      languageChanged: "Language changed to {language}"
    },
    // Guard Module
    guard: {
      title: "WPlace Auto-Guard",
      initBot: "Initialize Guard-BOT",
      selectArea: "Select Area",
      captureArea: "Capture Area",
      startProtection: "Start Protection",
      stopProtection: "Stop Protection",
      upperLeft: "Upper Left Corner",
      lowerRight: "Lower Right Corner",
      protectedPixels: "Protected Pixels",
      detectedChanges: "Detected Changes",
      repairedPixels: "Repaired Pixels",
      charges: "Charges",
      waitingInit: "Waiting for initialization...",
      checkingColors: "\u{1F3A8} Checking available colors...",
      noColorsFound: "\u274C No colors found. Open the color palette on the site.",
      colorsFound: "\u2705 Found {count} available colors",
      initSuccess: "\u2705 Guard-BOT initialized successfully",
      initError: "\u274C Error initializing Guard-BOT",
      invalidCoords: "\u274C Invalid coordinates",
      invalidArea: "\u274C Area must have upper left corner less than lower right corner",
      areaTooLarge: "\u274C Area too large: {size} pixels (maximum: {max})",
      capturingArea: "\u{1F4F8} Capturing protection area...",
      areaCaptured: "\u2705 Area captured: {count} pixels under protection",
      captureError: "\u274C Error capturing area: {error}",
      captureFirst: "\u274C First capture a protection area",
      protectionStarted: "\u{1F6E1}\uFE0F Protection started - monitoring area",
      protectionStopped: "\u23F9\uFE0F Protection stopped",
      noChanges: "\u2705 Protected area - no changes detected",
      changesDetected: "\u{1F6A8} {count} changes detected in protected area",
      repairing: "\u{1F6E0}\uFE0F Repairing {count} altered pixels...",
      repairedSuccess: "\u2705 Successfully repaired {count} pixels",
      repairError: "\u274C Error repairing pixels: {error}",
      noCharges: "\u26A0\uFE0F Insufficient charges to repair changes",
      checkingChanges: "\u{1F50D} Checking changes in protected area...",
      errorChecking: "\u274C Error checking changes: {error}",
      guardActive: "\u{1F6E1}\uFE0F Guardian active - area under protection",
      lastCheck: "Last check: {time}",
      nextCheck: "Next check in: {time}s",
      autoInitializing: "\u{1F916} Auto-initializing...",
      autoInitSuccess: "\u2705 Guard-BOT auto-started successfully",
      autoInitFailed: "\u26A0\uFE0F Could not auto-start. Use manual button.",
      manualInitRequired: "\u{1F527} Manual initialization required",
      paletteDetected: "\u{1F3A8} Color palette detected",
      paletteNotFound: "\u{1F50D} Searching for color palette...",
      clickingPaintButton: "\u{1F446} Clicking Paint button...",
      paintButtonNotFound: "\u274C Paint button not found",
      selectUpperLeft: "\u{1F3AF} Paint a pixel at the UPPER LEFT corner of the area to protect",
      selectLowerRight: "\u{1F3AF} Now paint a pixel at the LOWER RIGHT corner of the area",
      waitingUpperLeft: "\u{1F446} Waiting for upper left corner selection...",
      waitingLowerRight: "\u{1F446} Waiting for lower right corner selection...",
      upperLeftCaptured: "\u2705 Upper left corner captured: ({x}, {y})",
      lowerRightCaptured: "\u2705 Lower right corner captured: ({x}, {y})",
      selectionTimeout: "\u274C Selection timeout",
      selectionError: "\u274C Selection error, please try again"
    }
  };

  // src/locales/fr.js
  var fr = {
    // Launcher
    launcher: {
      title: "WPlace AutoBOT",
      autoFarm: "\u{1F33E} Auto-Farm",
      autoImage: "\u{1F3A8} Auto-Image",
      autoGuard: "\u{1F6E1}\uFE0F Auto-Guard",
      selection: "S\xE9lection",
      user: "Utilisateur",
      charges: "Charges",
      backend: "Backend",
      database: "Base de donn\xE9es",
      uptime: "Temps actif",
      close: "Fermer",
      launch: "Lancer",
      loading: "Chargement\u2026",
      executing: "Ex\xE9cution\u2026",
      downloading: "T\xE9l\xE9chargement du script\u2026",
      chooseBot: "Choisissez un bot et appuyez sur Lancer",
      readyToLaunch: "Pr\xEAt \xE0 lancer",
      loadError: "Erreur de chargement",
      loadErrorMsg: "Impossible de charger le bot s\xE9lectionn\xE9. V\xE9rifiez votre connexion ou r\xE9essayez.",
      checking: "\u{1F504} V\xE9rification...",
      online: "\u{1F7E2} En ligne",
      offline: "\u{1F534} Hors ligne",
      ok: "\u{1F7E2} OK",
      error: "\u{1F534} Erreur",
      unknown: "-"
    },
    // Image Module
    image: {
      title: "WPlace Auto-Image",
      initBot: "Initialiser Auto-BOT",
      uploadImage: "T\xE9l\xE9charger Image",
      resizeImage: "Redimensionner Image",
      selectPosition: "S\xE9lectionner Position",
      startPainting: "Commencer Peinture",
      stopPainting: "Arr\xEAter Peinture",
      saveProgress: "Sauvegarder Progr\xE8s",
      loadProgress: "Charger Progr\xE8s",
      checkingColors: "\u{1F50D} V\xE9rification des couleurs disponibles...",
      noColorsFound: "\u274C Ouvrez la palette de couleurs sur le site et r\xE9essayez!",
      colorsFound: "\u2705 {count} couleurs disponibles trouv\xE9es",
      loadingImage: "\u{1F5BC}\uFE0F Chargement de l'image...",
      imageLoaded: "\u2705 Image charg\xE9e avec {count} pixels valides",
      imageError: "\u274C Erreur lors du chargement de l'image",
      selectPositionAlert: "Peignez le premier pixel \xE0 l'emplacement o\xF9 vous voulez que l'art commence!",
      waitingPosition: "\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",
      positionSet: "\u2705 Position d\xE9finie avec succ\xE8s!",
      positionTimeout: "\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de position",
      positionDetected: "\u{1F3AF} Position d\xE9tect\xE9e, traitement...",
      positionError: "\u274C Erreur d\xE9tectant la position, essayez \xE0 nouveau",
      startPaintingMsg: "\u{1F3A8} D\xE9but de la peinture...",
      paintingProgress: "\u{1F9F1} Progr\xE8s: {painted}/{total} pixels...",
      noCharges: "\u231B Aucune charge. Attendre {time}...",
      paintingStopped: "\u23F9\uFE0F Peinture arr\xEAt\xE9e par l'utilisateur",
      paintingComplete: "\u2705 Peinture termin\xE9e! {count} pixels peints.",
      paintingError: "\u274C Erreur pendant la peinture",
      missingRequirements: "\u274C Chargez une image et s\xE9lectionnez une position d'abord",
      progress: "Progr\xE8s",
      userName: "Usager",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Temps estim\xE9",
      initMessage: "Cliquez sur 'Initialiser Auto-BOT' pour commencer",
      waitingInit: "En attente d'initialisation...",
      resizeSuccess: "\u2705 Image redimensionn\xE9e \xE0 {width}x{height}",
      paintingPaused: "\u23F8\uFE0F Peinture mise en pause \xE0 la position X: {x}, Y: {y}",
      pixelsPerBatch: "Pixels par lot",
      batchSize: "Taille du lot",
      nextBatchTime: "Prochain lot dans",
      useAllCharges: "Utiliser toutes les charges disponibles",
      showOverlay: "Afficher l'overlay",
      maxCharges: "Charges max par lot",
      waitingForCharges: "\u23F3 En attente de charges: {current}/{needed}",
      timeRemaining: "Temps restant",
      cooldownWaiting: "\u23F3 Attendre {time} pour continuer...",
      progressSaved: "\u2705 Progr\xE8s sauvegard\xE9 sous {filename}",
      progressLoaded: "\u2705 Progr\xE8s charg\xE9: {painted}/{total} pixels peints",
      progressLoadError: "\u274C Erreur lors du chargement du progr\xE8s: {error}",
      progressSaveError: "\u274C Erreur lors de la sauvegarde du progr\xE8s: {error}",
      confirmSaveProgress: "Voulez-vous sauvegarder le progr\xE8s actuel avant d'arr\xEAter?",
      saveProgressTitle: "Sauvegarder Progr\xE8s",
      discardProgress: "Abandonner",
      cancel: "Annuler",
      minimize: "Minimiser",
      width: "Largeur",
      height: "Hauteur",
      keepAspect: "Garder les proportions",
      apply: "Appliquer",
      overlayOn: "Overlay : ON",
      overlayOff: "Overlay : OFF",
      passCompleted: "\u2705 Passage termin\xE9: {painted} pixels peints | Progr\xE8s: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 Attente de r\xE9g\xE9n\xE9ration des charges: {current}/{needed} - Temps: {time}",
      waitingChargesCountdown: "\u23F3 Attente des charges: {current}/{needed} - Restant: {time}",
      autoInitializing: "\u{1F916} Initialisation automatique...",
      autoInitSuccess: "\u2705 Bot d\xE9marr\xE9 automatiquement",
      autoInitFailed: "\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",
      paletteDetected: "\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",
      paletteNotFound: "\u{1F50D} Recherche de la palette de couleurs...",
      clickingPaintButton: "\u{1F446} Clic sur le bouton Paint...",
      paintButtonNotFound: "\u274C Bouton Paint introuvable",
      manualInitRequired: "\u{1F527} Initialisation manuelle requise",
      retryAttempt: "\u{1F504} Tentative {attempt}/{maxAttempts} dans {delay}s...",
      retryError: "\u{1F4A5} Erreur dans tentative {attempt}/{maxAttempts}, nouvel essai dans {delay}s...",
      retryFailed: "\u274C \xC9chec apr\xE8s {maxAttempts} tentatives. Continuant avec le lot suivant...",
      networkError: "\u{1F310} Erreur r\xE9seau. Nouvel essai...",
      serverError: "\u{1F525} Erreur serveur. Nouvel essai...",
      timeoutError: "\u23F0 Timeout serveur. Nouvel essai..."
    },
    // Farm Module (to be implemented)
    farm: {
      title: "WPlace Farm Bot",
      start: "D\xE9marrer",
      stop: "Arr\xEAter",
      stopped: "Bot arr\xEAt\xE9",
      calibrate: "Calibrer",
      paintOnce: "Une fois",
      checkingStatus: "V\xE9rification du statut...",
      configuration: "Configuration",
      delay: "D\xE9lai (ms)",
      pixelsPerBatch: "Pixels/lot",
      minCharges: "Charges min",
      colorMode: "Mode couleur",
      random: "Al\xE9atoire",
      fixed: "Fixe",
      range: "Plage",
      fixedColor: "Couleur fixe",
      advanced: "Avanc\xE9",
      tileX: "Tuile X",
      tileY: "Tuile Y",
      customPalette: "Palette personnalis\xE9e",
      paletteExample: "ex: #FF0000,#00FF00,#0000FF",
      capture: "Capturer",
      painted: "Peints",
      charges: "Charges",
      retries: "\xC9checs",
      tile: "Tuile",
      configSaved: "Configuration sauvegard\xE9e",
      configLoaded: "Configuration charg\xE9e",
      configReset: "Configuration r\xE9initialis\xE9e",
      captureInstructions: "Peindre un pixel manuellement pour capturer les coordonn\xE9es...",
      backendOnline: "Backend En ligne",
      backendOffline: "Backend Hors ligne",
      startingBot: "D\xE9marrage du bot...",
      stoppingBot: "Arr\xEAt du bot...",
      calibrating: "Calibrage...",
      alreadyRunning: "Auto-Farm est d\xE9j\xE0 en cours d'ex\xE9cution.",
      imageRunningWarning: "Auto-Image est en cours d'ex\xE9cution. Fermez-le avant de d\xE9marrer Auto-Farm.",
      selectPosition: "S\xE9lectionner Zone",
      selectPositionAlert: "\u{1F3AF} Peignez un pixel dans une zone VIDE de la carte pour d\xE9finir la zone de farming",
      waitingPosition: "\u{1F446} En attente que vous peigniez le pixel de r\xE9f\xE9rence...",
      positionSet: "\u2705 Zone d\xE9finie! Rayon: 500px",
      positionTimeout: "\u274C D\xE9lai d\xE9pass\xE9 pour la s\xE9lection de zone",
      missingPosition: "\u274C S\xE9lectionnez une zone d'abord en utilisant 'S\xE9lectionner Zone'",
      farmRadius: "Rayon farm",
      positionInfo: "Zone actuelle",
      farmingInRadius: "\u{1F33E} Farming dans un rayon de {radius}px depuis ({x},{y})",
      selectEmptyArea: "\u26A0\uFE0F IMPORTANT: S\xE9lectionnez une zone VIDE pour \xE9viter les conflits",
      noPosition: "Aucune zone",
      currentZone: "Zone: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} S\xE9lectionnez une zone d'abord. Peignez un pixel sur la carte pour d\xE9finir la zone de farming"
    },
    // Common/Shared
    common: {
      yes: "Oui",
      no: "Non",
      ok: "OK",
      cancel: "Annuler",
      close: "Fermer",
      save: "Sauvegarder",
      load: "Charger",
      delete: "Supprimer",
      edit: "Modifier",
      start: "D\xE9marrer",
      stop: "Arr\xEAter",
      pause: "Pause",
      resume: "Reprendre",
      reset: "R\xE9initialiser",
      settings: "Param\xE8tres",
      help: "Aide",
      about: "\xC0 propos",
      language: "Langue",
      loading: "Chargement...",
      error: "Erreur",
      success: "Succ\xE8s",
      warning: "Avertissement",
      info: "Information",
      languageChanged: "Langue chang\xE9e en {language}"
    },
    // Guard Module
    guard: {
      title: "WPlace Auto-Guard",
      initBot: "Initialiser Guard-BOT",
      selectArea: "S\xE9lectionner Zone",
      captureArea: "Capturer Zone",
      startProtection: "D\xE9marrer Protection",
      stopProtection: "Arr\xEAter Protection",
      upperLeft: "Coin Sup\xE9rieur Gauche",
      lowerRight: "Coin Inf\xE9rieur Droit",
      protectedPixels: "Pixels Prot\xE9g\xE9s",
      detectedChanges: "Changements D\xE9tect\xE9s",
      repairedPixels: "Pixels R\xE9par\xE9s",
      charges: "Charges",
      waitingInit: "En attente d'initialisation...",
      checkingColors: "\u{1F3A8} V\xE9rification des couleurs disponibles...",
      noColorsFound: "\u274C Aucune couleur trouv\xE9e. Ouvrez la palette de couleurs sur le site.",
      colorsFound: "\u2705 {count} couleurs disponibles trouv\xE9es",
      initSuccess: "\u2705 Guard-BOT initialis\xE9 avec succ\xE8s",
      initError: "\u274C Erreur lors de l'initialisation de Guard-BOT",
      invalidCoords: "\u274C Coordonn\xE9es invalides",
      invalidArea: "\u274C La zone doit avoir le coin sup\xE9rieur gauche inf\xE9rieur au coin inf\xE9rieur droit",
      areaTooLarge: "\u274C Zone trop grande: {size} pixels (maximum: {max})",
      capturingArea: "\u{1F4F8} Capture de la zone de protection...",
      areaCaptured: "\u2705 Zone captur\xE9e: {count} pixels sous protection",
      captureError: "\u274C Erreur lors de la capture de zone: {error}",
      captureFirst: "\u274C Capturez d'abord une zone de protection",
      protectionStarted: "\u{1F6E1}\uFE0F Protection d\xE9marr\xE9e - surveillance de la zone",
      protectionStopped: "\u23F9\uFE0F Protection arr\xEAt\xE9e",
      noChanges: "\u2705 Zone prot\xE9g\xE9e - aucun changement d\xE9tect\xE9",
      changesDetected: "\u{1F6A8} {count} changements d\xE9tect\xE9s dans la zone prot\xE9g\xE9e",
      repairing: "\u{1F6E0}\uFE0F R\xE9paration de {count} pixels alt\xE9r\xE9s...",
      repairedSuccess: "\u2705 {count} pixels r\xE9par\xE9s avec succ\xE8s",
      repairError: "\u274C Erreur lors de la r\xE9paration des pixels: {error}",
      noCharges: "\u26A0\uFE0F Charges insuffisantes pour r\xE9parer les changements",
      checkingChanges: "\u{1F50D} V\xE9rification des changements dans la zone prot\xE9g\xE9e...",
      errorChecking: "\u274C Erreur lors de la v\xE9rification des changements: {error}",
      guardActive: "\u{1F6E1}\uFE0F Gardien actif - zone sous protection",
      lastCheck: "Derni\xE8re v\xE9rification: {time}",
      nextCheck: "Prochaine v\xE9rification dans: {time}s",
      autoInitializing: "\u{1F916} Initialisation automatique...",
      autoInitSuccess: "\u2705 Guard-BOT d\xE9marr\xE9 automatiquement",
      autoInitFailed: "\u26A0\uFE0F Impossible de d\xE9marrer automatiquement. Utilisez le bouton manuel.",
      manualInitRequired: "\u{1F527} Initialisation manuelle requise",
      paletteDetected: "\u{1F3A8} Palette de couleurs d\xE9tect\xE9e",
      paletteNotFound: "\u{1F50D} Recherche de la palette de couleurs...",
      clickingPaintButton: "\u{1F446} Clic sur le bouton Paint...",
      paintButtonNotFound: "\u274C Bouton Paint introuvable",
      selectUpperLeft: "\u{1F3AF} Peignez un pixel au coin SUP\xC9RIEUR GAUCHE de la zone \xE0 prot\xE9ger",
      selectLowerRight: "\u{1F3AF} Maintenant peignez un pixel au coin INF\xC9RIEUR DROIT de la zone",
      waitingUpperLeft: "\u{1F446} En attente de la s\xE9lection du coin sup\xE9rieur gauche...",
      waitingLowerRight: "\u{1F446} En attente de la s\xE9lection du coin inf\xE9rieur droit...",
      upperLeftCaptured: "\u2705 Coin sup\xE9rieur gauche captur\xE9: ({x}, {y})",
      lowerRightCaptured: "\u2705 Coin inf\xE9rieur droit captur\xE9: ({x}, {y})",
      selectionTimeout: "\u274C D\xE9lai de s\xE9lection d\xE9pass\xE9",
      selectionError: "\u274C Erreur de s\xE9lection, veuillez r\xE9essayer"
    }
  };

  // src/locales/ru.js
  var ru = {
    // Launcher
    launcher: {
      title: "WPlace AutoBOT",
      autoFarm: "\u{1F33E} \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",
      autoImage: "\u{1F3A8} \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
      autoGuard: "\u{1F6E1}\uFE0F \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",
      selection: "\u0412\u044B\u0431\u0440\u0430\u043D\u043E",
      user: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
      charges: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
      backend: "\u0411\u044D\u043A\u0435\u043D\u0434",
      database: "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",
      uptime: "\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",
      close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
      launch: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
      loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
      executing: "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",
      downloading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u0430...",
      chooseBot: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
      readyToLaunch: "\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0443",
      loadError: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438",
      loadErrorMsg: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",
      checking: "\u{1F504} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",
      online: "\u{1F7E2} \u041E\u043D\u043B\u0430\u0439\u043D",
      offline: "\u{1F534} \u041E\u0444\u043B\u0430\u0439\u043D",
      ok: "\u{1F7E2} \u041E\u041A",
      error: "\u{1F534} \u041E\u0448\u0438\u0431\u043A\u0430",
      unknown: "-"
    },
    // Image Module
    image: {
      title: "WPlace \u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
      initBot: "\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Auto-BOT",
      uploadImage: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
      resizeImage: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
      selectPosition: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",
      startPainting: "\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C",
      stopPainting: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435",
      saveProgress: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      loadProgress: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      checkingColors: "\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",
      noColorsFound: "\u274C \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430!",
      colorsFound: "\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",
      loadingImage: "\u{1F5BC}\uFE0F \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...",
      imageLoaded: "\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0441 {count} \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u043C\u0438",
      imageError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
      selectPositionAlert: "\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435, \u0433\u0434\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0441\u044F!",
      waitingPosition: "\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",
      positionSet: "\u2705 \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E!",
      positionTimeout: "\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438",
      positionDetected: "\u{1F3AF} \u041F\u043E\u0437\u0438\u0446\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u0430, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430...",
      positionError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437",
      startPaintingMsg: "\u{1F3A8} \u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F...",
      paintingProgress: "\u{1F9F1} \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",
      noCharges: "\u231B \u041D\u0435\u0442 \u0437\u0430\u0440\u044F\u0434\u043E\u0432. \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time}...",
      paintingStopped: "\u23F9\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",
      paintingComplete: "\u2705 \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E! {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E.",
      paintingError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F",
      missingRequirements: "\u274C \u0421\u043F\u0435\u0440\u0432\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u0447\u0430\u043B\u0430",
      progress: "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      userName: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
      pixels: "\u041F\u0438\u043A\u0441\u0435\u043B\u0438",
      charges: "\u0417\u0430\u0440\u044F\u0434\u044B",
      estimatedTime: "\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",
      initMessage: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C Auto-BOT\xBB, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C",
      waitingInit: "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",
      resizeSuccess: "\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E {width}x{height}",
      paintingPaused: "\u23F8\uFE0F \u0420\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 X: {x}, Y: {y}",
      pixelsPerBatch: "\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0432 \u043F\u0440\u043E\u0445\u043E\u0434\u0435",
      batchSize: "\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u0445\u043E\u0434\u0430",
      nextBatchTime: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u043E\u0445\u043E\u0434 \u0447\u0435\u0440\u0435\u0437",
      useAllCharges: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u0430\u0440\u044F\u0434\u044B",
      showOverlay: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
      maxCharges: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",
      waitingForCharges: "\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed}",
      timeRemaining: "\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",
      cooldownWaiting: "\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F...",
      progressSaved: "\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A {filename}",
      progressLoaded: "\u2705 \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: {painted} \u0438\u0437 {total} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E",
      progressLoadError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",
      progressSaveError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430: {error}",
      confirmSaveProgress: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043F\u0435\u0440\u0435\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439?",
      saveProgressTitle: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      discardProgress: "\u041D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441",
      cancel: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
      minimize: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
      width: "\u0428\u0438\u0440\u0438\u043D\u0430",
      height: "\u0412\u044B\u0441\u043E\u0442\u0430",
      keepAspect: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D",
      apply: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
      passCompleted: "\u2705 \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D: {painted} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E | \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: {percent}% ({current} \u0438\u0437 {total})",
      waitingChargesRegen: "\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u044F\u0434\u0430: {current} \u0438\u0437 {needed} - \u0412\u0440\u0435\u043C\u044F: {time}",
      waitingChargesCountdown: "\u23F3 \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0440\u044F\u0434\u043E\u0432: {current} \u0438\u0437 {needed} - \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: {time}",
      autoInitializing: "\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",
      autoInitSuccess: "\u2705 \u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
      autoInitFailed: "\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0443\u0441\u043A. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
      paletteDetected: "\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",
      paletteNotFound: "\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",
      clickingPaintButton: "\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",
      paintButtonNotFound: "\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
      manualInitRequired: "\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",
      retryAttempt: "\u{1F504} \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 {attempt} \u0438\u0437 {maxAttempts} \u0447\u0435\u0440\u0435\u0437 {delay}s...",
      retryError: "\u{1F4A5} \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 {attempt} \u0438\u0437 {maxAttempts}, \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 {delay}s...",
      retryFailed: "\u274C \u041F\u0440\u043E\u0432\u0430\u043B\u0435\u043D\u043E \u0441\u043F\u0443\u0441\u0442\u044F {maxAttempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043F\u0440\u043E\u0445\u043E\u0434\u0435...",
      networkError: "\u{1F310} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",
      serverError: "\u{1F525} \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430...",
      timeoutError: "\u23F0 \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430..."
    },
    // Farm Module (to be implemented)
    farm: {
      title: "WPlace \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C",
      start: "\u041D\u0430\u0447\u0430\u0442\u044C",
      stop: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
      stopped: "\u0411\u043E\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",
      calibrate: "\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u0430\u0442\u044C",
      paintOnce: "\u0415\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E",
      checkingStatus: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430...",
      configuration: "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",
      delay: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u043C\u0441)",
      pixelsPerBatch: "\u041F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u0437\u0430 \u043F\u0440\u043E\u0445\u043E\u0434",
      minCharges: "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E",
      colorMode: "\u0420\u0435\u0436\u0438\u043C \u0446\u0432\u0435\u0442\u043E\u0432",
      random: "\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439",
      fixed: "\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439",
      range: "\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      fixedColor: "\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",
      advanced: "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435",
      tileX: "\u041F\u043B\u0438\u0442\u043A\u0430 X",
      tileY: "\u041F\u043B\u0438\u0442\u043A\u0430 Y",
      customPalette: "\u0421\u0432\u043E\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430",
      paletteExample: "\u043F\u0440\u0438\u043C\u0435\u0440: #FF0000,#00FF00,#0000FF",
      capture: "\u0417\u0430\u0445\u0432\u0430\u0442",
      painted: "\u0417\u0430\u043A\u0440\u0430\u0448\u0435\u043D\u043E",
      charges: "\u0417\u0430\u0440\u044F\u0434\u044B",
      retries: "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438",
      tile: "\u041F\u043B\u0438\u0442\u043A\u0430",
      configSaved: "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",
      configLoaded: "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",
      configReset: "\u0421\u0431\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",
      captureInstructions: "\u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0434\u043B\u044F \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442...",
      backendOnline: "\u0411\u044D\u043A\u044D\u043D\u0434 \u041E\u043D\u043B\u0430\u0439\u043D",
      backendOffline: "\u0411\u044D\u043A\u044D\u043D\u0434",
      startingBot: "\u0417\u0430\u043F\u0443\u0441\u043A \u0431\u043E\u0442\u0430...",
      stoppingBot: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0431\u043E\u0442\u0430...",
      calibrating: "\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430...",
      alreadyRunning: "\u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D",
      imageRunningWarning: "\u0410\u0432\u0442\u043E-\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0410\u0432\u0442\u043E-\u0424\u0430\u0440\u043C\u0430.",
      selectPosition: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
      selectPositionAlert: "\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041F\u0423\u0421\u0422\u041E\u0419 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u0430\u0440\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430.",
      waitingPosition: "\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u044F....",
      positionSet: "\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430! \u0420\u0430\u0434\u0438\u0443\u0441: 500px",
      positionTimeout: "\u274C \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      missingPosition: "\u274C \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C\xBB",
      farmRadius: "\u0420\u0430\u0434\u0438\u0443\u0441 \u0444\u0430\u0440\u043C\u0430",
      positionInfo: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",
      farmingInRadius: "\u{1F33E} \u0424\u0430\u0440\u043C \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 {radius}px \u043E\u0442 ({x},{y})",
      selectEmptyArea: "\u26A0\uFE0F \u0412\u0410\u0416\u041D\u041E: \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0423\u0421\u0422\u0423\u042E \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432.",
      noPosition: "\u041D\u0435\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      currentZone: "\u041E\u0431\u043B\u0430\u0441\u0442\u044C: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C. \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0444\u0430\u0440\u043C\u0430."
    },
    // Common/Shared
    common: {
      yes: "\u0414\u0430",
      no: "\u041D\u0435\u0442",
      ok: "\u041E\u041A",
      cancel: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
      close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
      save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
      load: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",
      delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
      edit: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
      start: "\u041D\u0430\u0447\u0430\u0442\u044C",
      stop: "\u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C",
      pause: "\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
      resume: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
      reset: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",
      settings: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
      help: "\u041F\u043E\u043C\u043E\u0449\u044C",
      about: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
      language: "\u042F\u0437\u044B\u043A",
      loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",
      error: "\u041E\u0448\u0438\u0431\u043A\u0430",
      success: "\u0423\u0441\u043F\u0435\u0445",
      warning: "\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",
      info: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
      languageChanged: "\u042F\u0437\u044B\u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 {language}"
    },
    // Guard Module
    guard: {
      title: "WPlace \u0410\u0432\u0442\u043E-\u0417\u0430\u0449\u0438\u0442\u0430",
      initBot: "\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C Guard-BOT",
      selectArea: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",
      captureArea: "\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u041E\u0431\u043B\u0430\u0441\u0442\u044C",
      startProtection: "\u041D\u0430\u0447\u0430\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",
      stopProtection: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0417\u0430\u0449\u0438\u0442\u0443",
      upperLeft: "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u041B\u0435\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",
      lowerRight: "\u041D\u0438\u0436\u043D\u0438\u0439 \u041F\u0440\u0430\u0432\u044B\u0439 \u0423\u0433\u043E\u043B",
      protectedPixels: "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",
      detectedChanges: "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0435 \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
      repairedPixels: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u041F\u0438\u043A\u0441\u0435\u043B\u0438",
      charges: "\u0417\u0430\u0440\u044F\u0434\u044B",
      waitingInit: "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438...",
      checkingColors: "\u{1F3A8} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432...",
      noColorsFound: "\u274C \u0426\u0432\u0435\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0446\u0432\u0435\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435.",
      colorsFound: "\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0446\u0432\u0435\u0442\u043E\u0432",
      initSuccess: "\u2705 Guard-BOT \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D",
      initError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 Guard-BOT",
      invalidCoords: "\u274C \u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B",
      invalidArea: "\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430",
      areaTooLarge: "\u274C \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F: {size} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 (\u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C: {max})",
      capturingArea: "\u{1F4F8} \u0417\u0430\u0445\u0432\u0430\u0442 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0437\u0430\u0449\u0438\u0442\u044B...",
      areaCaptured: "\u2705 \u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D\u0430: {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",
      captureError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438: {error}",
      captureFirst: "\u274C \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u044B",
      protectionStarted: "\u{1F6E1}\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430 - \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      protectionStopped: "\u23F9\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",
      noChanges: "\u2705 \u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C - \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E",
      changesDetected: "\u{1F6A8} {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      repairing: "\u{1F6E0}\uFE0F \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 {count} \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439...",
      repairedSuccess: "\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E {count} \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439",
      repairError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439: {error}",
      noCharges: "\u26A0\uFE0F \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0440\u044F\u0434\u043E\u0432 \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439",
      checkingChanges: "\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0432 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438...",
      errorChecking: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439: {error}",
      guardActive: "\u{1F6E1}\uFE0F \u0421\u0442\u0440\u0430\u0436 \u0430\u043A\u0442\u0438\u0432\u0435\u043D - \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043F\u043E\u0434 \u0437\u0430\u0449\u0438\u0442\u043E\u0439",
      lastCheck: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: {time}",
      nextCheck: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u0440\u0435\u0437: {time}\u0441",
      autoInitializing: "\u{1F916} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F...",
      autoInitSuccess: "\u2705 Guard-BOT \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
      autoInitFailed: "\u26A0\uFE0F \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
      manualInitRequired: "\u{1F527} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0443\u0447\u043D\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",
      paletteDetected: "\u{1F3A8} \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430",
      paletteNotFound: "\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043F\u0430\u043B\u0438\u0442\u0440\u044B...",
      clickingPaintButton: "\u{1F446} \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \xABPaint\xBB...",
      paintButtonNotFound: "\u274C \u041A\u043D\u043E\u043F\u043A\u0430 \xABPaint\xBB \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
      selectUpperLeft: "\u{1F3AF} \u041D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u0412\u0415\u0420\u0425\u041D\u0415\u041C \u041B\u0415\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B",
      selectLowerRight: "\u{1F3AF} \u0422\u0435\u043F\u0435\u0440\u044C \u043D\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u0432 \u041D\u0418\u0416\u041D\u0415\u041C \u041F\u0420\u0410\u0412\u041E\u041C \u0443\u0433\u043B\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
      waitingUpperLeft: "\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u043B\u0435\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",
      waitingLowerRight: "\u{1F446} \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u0443\u0433\u043B\u0430...",
      upperLeftCaptured: "\u2705 \u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",
      lowerRightCaptured: "\u2705 \u041D\u0438\u0436\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439 \u0443\u0433\u043E\u043B \u0437\u0430\u0445\u0432\u0430\u0447\u0435\u043D: ({x}, {y})",
      selectionTimeout: "\u274C \u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u0432\u044B\u0431\u043E\u0440\u0430",
      selectionError: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0431\u043E\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430"
    }
  };

  // src/locales/zh-Hans.js
  var zhHans = {
    // 启动器
    launcher: {
      title: "WPlace \u81EA\u52A8\u673A\u5668\u4EBA",
      autoFarm: "\u{1F33E} \u81EA\u52A8\u519C\u573A",
      autoImage: "\u{1F3A8} \u81EA\u52A8\u7ED8\u56FE",
      autoGuard: "\u{1F6E1}\uFE0F \u81EA\u52A8\u5B88\u62A4",
      selection: "\u9009\u62E9",
      user: "\u7528\u6237",
      charges: "\u6B21\u6570",
      backend: "\u540E\u7AEF",
      database: "\u6570\u636E\u5E93",
      uptime: "\u8FD0\u884C\u65F6\u95F4",
      close: "\u5173\u95ED",
      launch: "\u542F\u52A8",
      loading: "\u52A0\u8F7D\u4E2D\u2026",
      executing: "\u6267\u884C\u4E2D\u2026",
      downloading: "\u6B63\u5728\u4E0B\u8F7D\u811A\u672C\u2026",
      chooseBot: "\u9009\u62E9\u4E00\u4E2A\u673A\u5668\u4EBA\u5E76\u70B9\u51FB\u542F\u52A8",
      readyToLaunch: "\u51C6\u5907\u542F\u52A8",
      loadError: "\u52A0\u8F7D\u9519\u8BEF",
      loadErrorMsg: "\u65E0\u6CD5\u52A0\u8F7D\u6240\u9009\u673A\u5668\u4EBA\u3002\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6216\u91CD\u8BD5\u3002",
      checking: "\u{1F504} \u68C0\u67E5\u4E2D...",
      online: "\u{1F7E2} \u5728\u7EBF",
      offline: "\u{1F534} \u79BB\u7EBF",
      ok: "\u{1F7E2} \u6B63\u5E38",
      error: "\u{1F534} \u9519\u8BEF",
      unknown: "-"
    },
    // 绘图模块
    image: {
      title: "WPlace \u81EA\u52A8\u7ED8\u56FE",
      initBot: "\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA",
      uploadImage: "\u4E0A\u4F20\u56FE\u7247",
      resizeImage: "\u8C03\u6574\u56FE\u7247\u5927\u5C0F",
      selectPosition: "\u9009\u62E9\u4F4D\u7F6E",
      startPainting: "\u5F00\u59CB\u7ED8\u5236",
      stopPainting: "\u505C\u6B62\u7ED8\u5236",
      saveProgress: "\u4FDD\u5B58\u8FDB\u5EA6",
      loadProgress: "\u52A0\u8F7D\u8FDB\u5EA6",
      checkingColors: "\u{1F50D} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",
      noColorsFound: "\u274C \u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u540E\u91CD\u8BD5\uFF01",
      colorsFound: "\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",
      loadingImage: "\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F7D\u56FE\u7247...",
      imageLoaded: "\u2705 \u56FE\u7247\u5DF2\u52A0\u8F7D\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u4E2A",
      imageError: "\u274C \u56FE\u7247\u52A0\u8F7D\u5931\u8D25",
      selectPositionAlert: "\u8BF7\u5728\u4F60\u60F3\u5F00\u59CB\u7ED8\u5236\u7684\u5730\u65B9\u6D82\u7B2C\u4E00\u4E2A\u50CF\u7D20\uFF01",
      waitingPosition: "\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",
      positionSet: "\u2705 \u4F4D\u7F6E\u8BBE\u7F6E\u6210\u529F\uFF01",
      positionTimeout: "\u274C \u4F4D\u7F6E\u9009\u62E9\u8D85\u65F6",
      positionDetected: "\u{1F3AF} \u5DF2\u68C0\u6D4B\u5230\u4F4D\u7F6E\uFF0C\u5904\u7406\u4E2D...",
      positionError: "\u274C \u4F4D\u7F6E\u68C0\u6D4B\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
      startPaintingMsg: "\u{1F3A8} \u5F00\u59CB\u7ED8\u5236...",
      paintingProgress: "\u{1F9F1} \u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20...",
      noCharges: "\u231B \u6CA1\u6709\u6B21\u6570\u3002\u7B49\u5F85 {time}...",
      paintingStopped: "\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7ED8\u5236",
      paintingComplete: "\u2705 \u7ED8\u5236\u5B8C\u6210\uFF01\u5171\u7ED8\u5236 {count} \u4E2A\u50CF\u7D20\u3002",
      paintingError: "\u274C \u7ED8\u5236\u8FC7\u7A0B\u4E2D\u51FA\u9519",
      missingRequirements: "\u274C \u8BF7\u5148\u52A0\u8F7D\u56FE\u7247\u5E76\u9009\u62E9\u4F4D\u7F6E",
      progress: "\u8FDB\u5EA6",
      userName: "\u7528\u6237",
      pixels: "\u50CF\u7D20",
      charges: "\u6B21\u6570",
      estimatedTime: "\u9884\u8BA1\u65F6\u95F4",
      initMessage: "\u70B9\u51FB\u201C\u521D\u59CB\u5316\u81EA\u52A8\u673A\u5668\u4EBA\u201D\u5F00\u59CB",
      waitingInit: "\u7B49\u5F85\u521D\u59CB\u5316...",
      resizeSuccess: "\u2705 \u56FE\u7247\u5DF2\u8C03\u6574\u4E3A {width}x{height}",
      paintingPaused: "\u23F8\uFE0F \u7ED8\u5236\u6682\u505C\u4E8E\u4F4D\u7F6E X: {x}, Y: {y}",
      pixelsPerBatch: "\u6BCF\u6279\u50CF\u7D20\u6570",
      batchSize: "\u6279\u6B21\u5927\u5C0F",
      nextBatchTime: "\u4E0B\u6B21\u6279\u6B21\u65F6\u95F4",
      useAllCharges: "\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6570",
      showOverlay: "\u663E\u793A\u8986\u76D6\u5C42",
      maxCharges: "\u6BCF\u6279\u6700\u5927\u6B21\u6570",
      waitingForCharges: "\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed}",
      timeRemaining: "\u5269\u4F59\u65F6\u95F4",
      cooldownWaiting: "\u23F3 \u7B49\u5F85 {time} \u540E\u7EE7\u7EED...",
      progressSaved: "\u2705 \u8FDB\u5EA6\u5DF2\u4FDD\u5B58\u4E3A {filename}",
      progressLoaded: "\u2705 \u5DF2\u52A0\u8F7D\u8FDB\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7ED8\u5236",
      progressLoadError: "\u274C \u52A0\u8F7D\u8FDB\u5EA6\u5931\u8D25: {error}",
      progressSaveError: "\u274C \u4FDD\u5B58\u8FDB\u5EA6\u5931\u8D25: {error}",
      confirmSaveProgress: "\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u5F53\u524D\u8FDB\u5EA6\u5417\uFF1F",
      saveProgressTitle: "\u4FDD\u5B58\u8FDB\u5EA6",
      discardProgress: "\u653E\u5F03",
      cancel: "\u53D6\u6D88",
      minimize: "\u6700\u5C0F\u5316",
      width: "\u5BBD\u5EA6",
      height: "\u9AD8\u5EA6",
      keepAspect: "\u4FDD\u6301\u7EB5\u6A2A\u6BD4",
      apply: "\u5E94\u7528",
      overlayOn: "\u8986\u76D6\u5C42: \u5F00\u542F",
      overlayOff: "\u8986\u76D6\u5C42: \u5173\u95ED",
      passCompleted: "\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7ED8\u5236 {painted} \u50CF\u7D20 | \u8FDB\u5EA6: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 \u7B49\u5F85\u6B21\u6570\u6062\u590D: {current}/{needed} - \u65F6\u95F4: {time}",
      waitingChargesCountdown: "\u23F3 \u7B49\u5F85\u6B21\u6570: {current}/{needed} - \u5269\u4F59: {time}",
      autoInitializing: "\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",
      autoInitSuccess: "\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",
      autoInitFailed: "\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",
      paletteDetected: "\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",
      paletteNotFound: "\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",
      clickingPaintButton: "\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",
      paintButtonNotFound: "\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",
      manualInitRequired: "\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",
      retryAttempt: "\u{1F504} \u91CD\u8BD5 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",
      retryError: "\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5C1D\u8BD5\u51FA\u9519\uFF0C\u5C06\u5728 {delay} \u79D2\u540E\u91CD\u8BD5...",
      retryFailed: "\u274C \u8D85\u8FC7 {maxAttempts} \u6B21\u5C1D\u8BD5\u5931\u8D25\u3002\u7EE7\u7EED\u4E0B\u4E00\u6279...",
      networkError: "\u{1F310} \u7F51\u7EDC\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",
      serverError: "\u{1F525} \u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u6B63\u5728\u91CD\u8BD5...",
      timeoutError: "\u23F0 \u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u6B63\u5728\u91CD\u8BD5..."
    },
    // 农场模块（待实现）
    farm: {
      title: "WPlace \u519C\u573A\u673A\u5668\u4EBA",
      start: "\u5F00\u59CB",
      stop: "\u505C\u6B62",
      stopped: "\u673A\u5668\u4EBA\u5DF2\u505C\u6B62",
      calibrate: "\u6821\u51C6",
      paintOnce: "\u4E00\u6B21",
      checkingStatus: "\u68C0\u67E5\u72B6\u6001\u4E2D...",
      configuration: "\u914D\u7F6E",
      delay: "\u5EF6\u8FDF (\u6BEB\u79D2)",
      pixelsPerBatch: "\u6BCF\u6279\u50CF\u7D20",
      minCharges: "\u6700\u5C11\u6B21\u6570",
      colorMode: "\u989C\u8272\u6A21\u5F0F",
      random: "\u968F\u673A",
      fixed: "\u56FA\u5B9A",
      range: "\u8303\u56F4",
      fixedColor: "\u56FA\u5B9A\u989C\u8272",
      advanced: "\u9AD8\u7EA7",
      tileX: "\u74E6\u7247 X",
      tileY: "\u74E6\u7247 Y",
      customPalette: "\u81EA\u5B9A\u4E49\u8C03\u8272\u677F",
      paletteExample: "\u4F8B\u5982: #FF0000,#00FF00,#0000FF",
      capture: "\u6355\u83B7",
      painted: "\u5DF2\u7ED8\u5236",
      charges: "\u6B21\u6570",
      retries: "\u91CD\u8BD5",
      tile: "\u74E6\u7247",
      configSaved: "\u914D\u7F6E\u5DF2\u4FDD\u5B58",
      configLoaded: "\u914D\u7F6E\u5DF2\u52A0\u8F7D",
      configReset: "\u914D\u7F6E\u5DF2\u91CD\u7F6E",
      captureInstructions: "\u8BF7\u624B\u52A8\u7ED8\u5236\u4E00\u4E2A\u50CF\u7D20\u4EE5\u6355\u83B7\u5750\u6807...",
      backendOnline: "\u540E\u7AEF\u5728\u7EBF",
      backendOffline: "\u540E\u7AEF\u79BB\u7EBF",
      startingBot: "\u6B63\u5728\u542F\u52A8\u673A\u5668\u4EBA...",
      stoppingBot: "\u6B63\u5728\u505C\u6B62\u673A\u5668\u4EBA...",
      calibrating: "\u6821\u51C6\u4E2D...",
      alreadyRunning: "\u81EA\u52A8\u519C\u573A\u5DF2\u5728\u8FD0\u884C\u3002",
      imageRunningWarning: "\u81EA\u52A8\u7ED8\u56FE\u6B63\u5728\u8FD0\u884C\uFF0C\u8BF7\u5148\u5173\u95ED\u518D\u542F\u52A8\u81EA\u52A8\u519C\u573A\u3002",
      selectPosition: "\u9009\u62E9\u533A\u57DF",
      selectPositionAlert: "\u{1F3AF} \u5728\u5730\u56FE\u7684\u7A7A\u767D\u533A\u57DF\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF",
      waitingPosition: "\u{1F446} \u7B49\u5F85\u4F60\u6D82\u53C2\u8003\u50CF\u7D20...",
      positionSet: "\u2705 \u533A\u57DF\u8BBE\u7F6E\u6210\u529F\uFF01\u534A\u5F84: 500px",
      positionTimeout: "\u274C \u533A\u57DF\u9009\u62E9\u8D85\u65F6",
      missingPosition: "\u274C \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF08\u4F7F\u7528\u201C\u9009\u62E9\u533A\u57DF\u201D\u6309\u94AE\uFF09",
      farmRadius: "\u519C\u573A\u534A\u5F84",
      positionInfo: "\u5F53\u524D\u533A\u57DF",
      farmingInRadius: "\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F84 {radius}px \u5728 ({x},{y}) \u519C\u573A",
      selectEmptyArea: "\u26A0\uFE0F \u91CD\u8981: \u8BF7\u9009\u62E9\u7A7A\u767D\u533A\u57DF\u4EE5\u907F\u514D\u51B2\u7A81",
      noPosition: "\u672A\u9009\u62E9\u533A\u57DF",
      currentZone: "\u533A\u57DF: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} \u8BF7\u5148\u9009\u62E9\u533A\u57DF\uFF0C\u5728\u5730\u56FE\u4E0A\u6D82\u4E00\u4E2A\u50CF\u7D20\u4EE5\u8BBE\u7F6E\u519C\u573A\u533A\u57DF"
    },
    // 公共
    common: {
      yes: "\u662F",
      no: "\u5426",
      ok: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88",
      close: "\u5173\u95ED",
      save: "\u4FDD\u5B58",
      load: "\u52A0\u8F7D",
      delete: "\u5220\u9664",
      edit: "\u7F16\u8F91",
      start: "\u5F00\u59CB",
      stop: "\u505C\u6B62",
      pause: "\u6682\u505C",
      resume: "\u7EE7\u7EED",
      reset: "\u91CD\u7F6E",
      settings: "\u8BBE\u7F6E",
      help: "\u5E2E\u52A9",
      about: "\u5173\u4E8E",
      language: "\u8BED\u8A00",
      loading: "\u52A0\u8F7D\u4E2D...",
      error: "\u9519\u8BEF",
      success: "\u6210\u529F",
      warning: "\u8B66\u544A",
      info: "\u4FE1\u606F",
      languageChanged: "\u8BED\u8A00\u5DF2\u5207\u6362\u4E3A {language}"
    },
    // 守护模块
    guard: {
      title: "WPlace \u81EA\u52A8\u5B88\u62A4",
      initBot: "\u521D\u59CB\u5316\u5B88\u62A4\u673A\u5668\u4EBA",
      selectArea: "\u9009\u62E9\u533A\u57DF",
      captureArea: "\u6355\u83B7\u533A\u57DF",
      startProtection: "\u5F00\u59CB\u5B88\u62A4",
      stopProtection: "\u505C\u6B62\u5B88\u62A4",
      upperLeft: "\u5DE6\u4E0A\u89D2",
      lowerRight: "\u53F3\u4E0B\u89D2",
      protectedPixels: "\u53D7\u4FDD\u62A4\u50CF\u7D20",
      detectedChanges: "\u68C0\u6D4B\u5230\u7684\u53D8\u5316",
      repairedPixels: "\u4FEE\u590D\u7684\u50CF\u7D20",
      charges: "\u6B21\u6570",
      waitingInit: "\u7B49\u5F85\u521D\u59CB\u5316...",
      checkingColors: "\u{1F3A8} \u68C0\u67E5\u53EF\u7528\u989C\u8272...",
      noColorsFound: "\u274C \u672A\u627E\u5230\u989C\u8272\uFF0C\u8BF7\u5728\u7F51\u7AD9\u4E0A\u6253\u5F00\u8C03\u8272\u677F\u3002",
      colorsFound: "\u2705 \u627E\u5230 {count} \u79CD\u53EF\u7528\u989C\u8272",
      initSuccess: "\u2705 \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",
      initError: "\u274C \u5B88\u62A4\u673A\u5668\u4EBA\u521D\u59CB\u5316\u5931\u8D25",
      invalidCoords: "\u274C \u5750\u6807\u65E0\u6548",
      invalidArea: "\u274C \u533A\u57DF\u65E0\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u987B\u5C0F\u4E8E\u53F3\u4E0B\u89D2",
      areaTooLarge: "\u274C \u533A\u57DF\u8FC7\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",
      capturingArea: "\u{1F4F8} \u6355\u83B7\u5B88\u62A4\u533A\u57DF\u4E2D...",
      areaCaptured: "\u2705 \u533A\u57DF\u6355\u83B7\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u62A4",
      captureError: "\u274C \u6355\u83B7\u533A\u57DF\u51FA\u9519: {error}",
      captureFirst: "\u274C \u8BF7\u5148\u6355\u83B7\u4E00\u4E2A\u5B88\u62A4\u533A\u57DF",
      protectionStarted: "\u{1F6E1}\uFE0F \u5B88\u62A4\u5DF2\u542F\u52A8 - \u533A\u57DF\u76D1\u63A7\u4E2D",
      protectionStopped: "\u23F9\uFE0F \u5B88\u62A4\u5DF2\u505C\u6B62",
      noChanges: "\u2705 \u533A\u57DF\u5B89\u5168 - \u672A\u68C0\u6D4B\u5230\u53D8\u5316",
      changesDetected: "\u{1F6A8} \u68C0\u6D4B\u5230 {count} \u4E2A\u53D8\u5316",
      repairing: "\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u590D {count} \u4E2A\u50CF\u7D20...",
      repairedSuccess: "\u2705 \u5DF2\u6210\u529F\u4FEE\u590D {count} \u4E2A\u50CF\u7D20",
      repairError: "\u274C \u4FEE\u590D\u51FA\u9519: {error}",
      noCharges: "\u26A0\uFE0F \u6B21\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4FEE\u590D",
      checkingChanges: "\u{1F50D} \u6B63\u5728\u68C0\u67E5\u533A\u57DF\u53D8\u5316...",
      errorChecking: "\u274C \u68C0\u67E5\u51FA\u9519: {error}",
      guardActive: "\u{1F6E1}\uFE0F \u5B88\u62A4\u4E2D - \u533A\u57DF\u53D7\u4FDD\u62A4",
      lastCheck: "\u4E0A\u6B21\u68C0\u67E5: {time}",
      nextCheck: "\u4E0B\u6B21\u68C0\u67E5: {time} \u79D2\u540E",
      autoInitializing: "\u{1F916} \u6B63\u5728\u81EA\u52A8\u521D\u59CB\u5316...",
      autoInitSuccess: "\u2705 \u81EA\u52A8\u542F\u52A8\u6210\u529F",
      autoInitFailed: "\u26A0\uFE0F \u65E0\u6CD5\u81EA\u52A8\u542F\u52A8\uFF0C\u8BF7\u624B\u52A8\u64CD\u4F5C\u3002",
      manualInitRequired: "\u{1F527} \u9700\u8981\u624B\u52A8\u521D\u59CB\u5316",
      paletteDetected: "\u{1F3A8} \u5DF2\u68C0\u6D4B\u5230\u8C03\u8272\u677F",
      paletteNotFound: "\u{1F50D} \u6B63\u5728\u641C\u7D22\u8C03\u8272\u677F...",
      clickingPaintButton: "\u{1F446} \u6B63\u5728\u70B9\u51FB\u7ED8\u5236\u6309\u94AE...",
      paintButtonNotFound: "\u274C \u672A\u627E\u5230\u7ED8\u5236\u6309\u94AE",
      selectUpperLeft: "\u{1F3AF} \u5728\u9700\u8981\u4FDD\u62A4\u533A\u57DF\u7684\u5DE6\u4E0A\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",
      selectLowerRight: "\u{1F3AF} \u73B0\u5728\u5728\u53F3\u4E0B\u89D2\u6D82\u4E00\u4E2A\u50CF\u7D20",
      waitingUpperLeft: "\u{1F446} \u7B49\u5F85\u9009\u62E9\u5DE6\u4E0A\u89D2...",
      waitingLowerRight: "\u{1F446} \u7B49\u5F85\u9009\u62E9\u53F3\u4E0B\u89D2...",
      upperLeftCaptured: "\u2705 \u5DF2\u6355\u83B7\u5DE6\u4E0A\u89D2: ({x}, {y})",
      lowerRightCaptured: "\u2705 \u5DF2\u6355\u83B7\u53F3\u4E0B\u89D2: ({x}, {y})",
      selectionTimeout: "\u274C \u9009\u62E9\u8D85\u65F6",
      selectionError: "\u274C \u9009\u62E9\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5"
    }
  };

  // src/locales/zh-Hant.js
  var zhHant = {
    // 啓動器
    launcher: {
      title: "WPlace \u81EA\u52D5\u6A5F\u5668\u4EBA",
      autoFarm: "\u{1F33E} \u81EA\u52D5\u8FB2\u5834",
      autoImage: "\u{1F3A8} \u81EA\u52D5\u7E6A\u5716",
      autoGuard: "\u{1F6E1}\uFE0F \u81EA\u52D5\u5B88\u8B77",
      selection: "\u9078\u64C7",
      user: "\u7528\u6237",
      charges: "\u6B21\u6578",
      backend: "\u5F8C\u7AEF",
      database: "\u6578\u64DA\u5EAB",
      uptime: "\u904B\u884C\u6642\u9593",
      close: "\u95DC\u9589",
      launch: "\u5553\u52D5",
      loading: "\u52A0\u8F09\u4E2D\u2026",
      executing: "\u57F7\u884C\u4E2D\u2026",
      downloading: "\u6B63\u5728\u4E0B\u8F09\u8173\u672C\u2026",
      chooseBot: "\u9078\u64C7\u4E00\u500B\u6A5F\u5668\u4EBA\u4E26\u9EDE\u64CA\u5553\u52D5",
      readyToLaunch: "\u6E96\u5099\u5553\u52D5",
      loadError: "\u52A0\u8F09\u932F\u8AA4",
      loadErrorMsg: "\u7121\u6CD5\u52A0\u8F09\u6240\u9078\u6A5F\u5668\u4EBA\u3002\u8ACB\u6AA2\u67E5\u7DB2\u7D61\u9023\u63A5\u6216\u91CD\u8A66\u3002",
      checking: "\u{1F504} \u6AA2\u67E5\u4E2D...",
      online: "\u{1F7E2} \u5728\u7DDA",
      offline: "\u{1F534} \u96E2\u7DDA",
      ok: "\u{1F7E2} \u6B63\u5E38",
      error: "\u{1F534} \u932F\u8AA4",
      unknown: "-"
    },
    // 繪圖模塊
    image: {
      title: "WPlace \u81EA\u52D5\u7E6A\u5716",
      initBot: "\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA",
      uploadImage: "\u4E0A\u50B3\u5716\u7247",
      resizeImage: "\u8ABF\u6574\u5716\u7247\u5927\u5C0F",
      selectPosition: "\u9078\u64C7\u4F4D\u7F6E",
      startPainting: "\u958B\u59CB\u7E6A\u88FD",
      stopPainting: "\u505C\u6B62\u7E6A\u88FD",
      saveProgress: "\u4FDD\u5B58\u9032\u5EA6",
      loadProgress: "\u52A0\u8F09\u9032\u5EA6",
      checkingColors: "\u{1F50D} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",
      noColorsFound: "\u274C \u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u5F8C\u91CD\u8A66\uFF01",
      colorsFound: "\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",
      loadingImage: "\u{1F5BC}\uFE0F \u6B63\u5728\u52A0\u8F09\u5716\u7247...",
      imageLoaded: "\u2705 \u5716\u7247\u5DF2\u52A0\u8F09\uFF0C\u6709\u6548\u50CF\u7D20 {count} \u500B",
      imageError: "\u274C \u5716\u7247\u52A0\u8F09\u5931\u6557",
      selectPositionAlert: "\u8ACB\u5728\u4F60\u60F3\u958B\u59CB\u7E6A\u88FD\u7684\u5730\u65B9\u5857\u7B2C\u4E00\u500B\u50CF\u7D20\uFF01",
      waitingPosition: "\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",
      positionSet: "\u2705 \u4F4D\u7F6E\u8A2D\u7F6E\u6210\u529F\uFF01",
      positionTimeout: "\u274C \u4F4D\u7F6E\u9078\u64C7\u8D85\u6642",
      positionDetected: "\u{1F3AF} \u5DF2\u6AA2\u6E2C\u5230\u4F4D\u7F6E\uFF0C\u8655\u7406\u4E2D...",
      positionError: "\u274C \u4F4D\u7F6E\u6AA2\u6E2C\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66",
      startPaintingMsg: "\u{1F3A8} \u958B\u59CB\u7E6A\u88FD...",
      paintingProgress: "\u{1F9F1} \u9032\u5EA6: {painted}/{total} \u50CF\u7D20...",
      noCharges: "\u231B \u6C92\u6709\u6B21\u6578\u3002\u7B49\u5F85 {time}...",
      paintingStopped: "\u23F9\uFE0F \u7528\u6237\u5DF2\u505C\u6B62\u7E6A\u88FD",
      paintingComplete: "\u2705 \u7E6A\u88FD\u5B8C\u6210\uFF01\u5171\u7E6A\u88FD {count} \u500B\u50CF\u7D20\u3002",
      paintingError: "\u274C \u7E6A\u88FD\u904E\u7A0B\u4E2D\u51FA\u932F",
      missingRequirements: "\u274C \u8ACB\u5148\u52A0\u8F09\u5716\u7247\u4E26\u9078\u64C7\u4F4D\u7F6E",
      progress: "\u9032\u5EA6",
      userName: "\u7528\u6237",
      pixels: "\u50CF\u7D20",
      charges: "\u6B21\u6578",
      estimatedTime: "\u9810\u8A08\u6642\u9593",
      initMessage: "\u9EDE\u64CA\u201C\u521D\u59CB\u5316\u81EA\u52D5\u6A5F\u5668\u4EBA\u201D\u958B\u59CB",
      waitingInit: "\u7B49\u5F85\u521D\u59CB\u5316...",
      resizeSuccess: "\u2705 \u5716\u7247\u5DF2\u8ABF\u6574\u70BA {width}x{height}",
      paintingPaused: "\u23F8\uFE0F \u7E6A\u88FD\u66AB\u505C\u65BC\u4F4D\u7F6E X: {x}, Y: {y}",
      pixelsPerBatch: "\u6BCF\u6279\u50CF\u7D20\u6578",
      batchSize: "\u6279\u6B21\u5927\u5C0F",
      nextBatchTime: "\u4E0B\u6B21\u6279\u6B21\u6642\u9593",
      useAllCharges: "\u4F7F\u7528\u6240\u6709\u53EF\u7528\u6B21\u6578",
      showOverlay: "\u986F\u793A\u8986\u84CB\u5C64",
      maxCharges: "\u6BCF\u6279\u6700\u5927\u6B21\u6578",
      waitingForCharges: "\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed}",
      timeRemaining: "\u5269\u9918\u6642\u9593",
      cooldownWaiting: "\u23F3 \u7B49\u5F85 {time} \u5F8C\u7E7C\u7E8C...",
      progressSaved: "\u2705 \u9032\u5EA6\u5DF2\u4FDD\u5B58\u70BA {filename}",
      progressLoaded: "\u2705 \u5DF2\u52A0\u8F09\u9032\u5EA6: {painted}/{total} \u50CF\u7D20\u5DF2\u7E6A\u88FD",
      progressLoadError: "\u274C \u52A0\u8F09\u9032\u5EA6\u5931\u6557: {error}",
      progressSaveError: "\u274C \u4FDD\u5B58\u9032\u5EA6\u5931\u6557: {error}",
      confirmSaveProgress: "\u5728\u505C\u6B62\u4E4B\u524D\u8981\u4FDD\u5B58\u7576\u524D\u9032\u5EA6\u55CE\uFF1F",
      saveProgressTitle: "\u4FDD\u5B58\u9032\u5EA6",
      discardProgress: "\u653E\u68C4",
      cancel: "\u53D6\u6D88",
      minimize: "\u6700\u5C0F\u5316",
      width: "\u5BEC\u5EA6",
      height: "\u9AD8\u5EA6",
      keepAspect: "\u4FDD\u6301\u7E31\u6A6B\u6BD4",
      apply: "\u61C9\u7528",
      overlayOn: "\u8986\u84CB\u5C64: \u958B\u5553",
      overlayOff: "\u8986\u84CB\u5C64: \u95DC\u9589",
      passCompleted: "\u2705 \u6279\u6B21\u5B8C\u6210: \u5DF2\u7E6A\u88FD {painted} \u50CF\u7D20 | \u9032\u5EA6: {percent}% ({current}/{total})",
      waitingChargesRegen: "\u23F3 \u7B49\u5F85\u6B21\u6578\u6062\u5FA9: {current}/{needed} - \u6642\u9593: {time}",
      waitingChargesCountdown: "\u23F3 \u7B49\u5F85\u6B21\u6578: {current}/{needed} - \u5269\u9918: {time}",
      autoInitializing: "\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",
      autoInitSuccess: "\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",
      autoInitFailed: "\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",
      paletteDetected: "\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",
      paletteNotFound: "\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",
      clickingPaintButton: "\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",
      paintButtonNotFound: "\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",
      manualInitRequired: "\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",
      retryAttempt: "\u{1F504} \u91CD\u8A66 {attempt}/{maxAttempts}\uFF0C\u7B49\u5F85 {delay} \u79D2...",
      retryError: "\u{1F4A5} \u7B2C {attempt}/{maxAttempts} \u6B21\u5617\u8A66\u51FA\u932F\uFF0C\u5C07\u5728 {delay} \u79D2\u5F8C\u91CD\u8A66...",
      retryFailed: "\u274C \u8D85\u904E {maxAttempts} \u6B21\u5617\u8A66\u5931\u6557\u3002\u7E7C\u7E8C\u4E0B\u4E00\u6279...",
      networkError: "\u{1F310} \u7DB2\u7D61\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",
      serverError: "\u{1F525} \u670D\u52D9\u5668\u932F\u8AA4\uFF0C\u6B63\u5728\u91CD\u8A66...",
      timeoutError: "\u23F0 \u670D\u52D9\u5668\u8D85\u6642\uFF0C\u6B63\u5728\u91CD\u8A66..."
    },
    // 農場模塊（待實現）
    farm: {
      title: "WPlace \u8FB2\u5834\u6A5F\u5668\u4EBA",
      start: "\u958B\u59CB",
      stop: "\u505C\u6B62",
      stopped: "\u6A5F\u5668\u4EBA\u5DF2\u505C\u6B62",
      calibrate: "\u6821\u6E96",
      paintOnce: "\u4E00\u6B21",
      checkingStatus: "\u6AA2\u67E5\u72C0\u614B\u4E2D...",
      configuration: "\u914D\u7F6E",
      delay: "\u5EF6\u9072 (\u6BEB\u79D2)",
      pixelsPerBatch: "\u6BCF\u6279\u50CF\u7D20",
      minCharges: "\u6700\u5C11\u6B21\u6578",
      colorMode: "\u984F\u8272\u6A21\u5F0F",
      random: "\u96A8\u6A5F",
      fixed: "\u56FA\u5B9A",
      range: "\u7BC4\u570D",
      fixedColor: "\u56FA\u5B9A\u984F\u8272",
      advanced: "\u9AD8\u7D1A",
      tileX: "\u74E6\u7247 X",
      tileY: "\u74E6\u7247 Y",
      customPalette: "\u81EA\u5B9A\u7FA9\u8ABF\u8272\u677F",
      paletteExample: "\u4F8B\u5982: #FF0000,#00FF00,#0000FF",
      capture: "\u6355\u7372",
      painted: "\u5DF2\u7E6A\u88FD",
      charges: "\u6B21\u6578",
      retries: "\u91CD\u8A66",
      tile: "\u74E6\u7247",
      configSaved: "\u914D\u7F6E\u5DF2\u4FDD\u5B58",
      configLoaded: "\u914D\u7F6E\u5DF2\u52A0\u8F09",
      configReset: "\u914D\u7F6E\u5DF2\u91CD\u7F6E",
      captureInstructions: "\u8ACB\u624B\u52D5\u7E6A\u88FD\u4E00\u500B\u50CF\u7D20\u4EE5\u6355\u7372\u5EA7\u6A19...",
      backendOnline: "\u5F8C\u7AEF\u5728\u7DDA",
      backendOffline: "\u5F8C\u7AEF\u96E2\u7DDA",
      startingBot: "\u6B63\u5728\u5553\u52D5\u6A5F\u5668\u4EBA...",
      stoppingBot: "\u6B63\u5728\u505C\u6B62\u6A5F\u5668\u4EBA...",
      calibrating: "\u6821\u6E96\u4E2D...",
      alreadyRunning: "\u81EA\u52D5\u8FB2\u5834\u5DF2\u5728\u904B\u884C\u3002",
      imageRunningWarning: "\u81EA\u52D5\u7E6A\u5716\u6B63\u5728\u904B\u884C\uFF0C\u8ACB\u5148\u95DC\u9589\u518D\u5553\u52D5\u81EA\u52D5\u8FB2\u5834\u3002",
      selectPosition: "\u9078\u64C7\u5340\u57DF",
      selectPositionAlert: "\u{1F3AF} \u5728\u5730\u5716\u7684\u7A7A\u767D\u5340\u57DF\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF",
      waitingPosition: "\u{1F446} \u7B49\u5F85\u4F60\u5857\u53C3\u8003\u50CF\u7D20...",
      positionSet: "\u2705 \u5340\u57DF\u8A2D\u7F6E\u6210\u529F\uFF01\u534A\u5F91: 500px",
      positionTimeout: "\u274C \u5340\u57DF\u9078\u64C7\u8D85\u6642",
      missingPosition: "\u274C \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF08\u4F7F\u7528\u201C\u9078\u64C7\u5340\u57DF\u201D\u6309\u9215\uFF09",
      farmRadius: "\u8FB2\u5834\u534A\u5F91",
      positionInfo: "\u7576\u524D\u5340\u57DF",
      farmingInRadius: "\u{1F33E} \u6B63\u5728\u4EE5\u534A\u5F91 {radius}px \u5728 ({x},{y}) \u8FB2\u5834",
      selectEmptyArea: "\u26A0\uFE0F \u91CD\u8981: \u8ACB\u9078\u64C7\u7A7A\u767D\u5340\u57DF\u4EE5\u907F\u514D\u885D\u7A81",
      noPosition: "\u672A\u9078\u64C7\u5340\u57DF",
      currentZone: "\u5340\u57DF: ({x},{y})",
      autoSelectPosition: "\u{1F3AF} \u8ACB\u5148\u9078\u64C7\u5340\u57DF\uFF0C\u5728\u5730\u5716\u4E0A\u5857\u4E00\u500B\u50CF\u7D20\u4EE5\u8A2D\u7F6E\u8FB2\u5834\u5340\u57DF"
    },
    // 公共
    common: {
      yes: "\u662F",
      no: "\u5426",
      ok: "\u78BA\u8A8D",
      cancel: "\u53D6\u6D88",
      close: "\u95DC\u9589",
      save: "\u4FDD\u5B58",
      load: "\u52A0\u8F09",
      delete: "\u522A\u9664",
      edit: "\u7DE8\u8F2F",
      start: "\u958B\u59CB",
      stop: "\u505C\u6B62",
      pause: "\u66AB\u505C",
      resume: "\u7E7C\u7E8C",
      reset: "\u91CD\u7F6E",
      settings: "\u8A2D\u7F6E",
      help: "\u5E6B\u52A9",
      about: "\u95DC\u65BC",
      language: "\u8A9E\u8A00",
      loading: "\u52A0\u8F09\u4E2D...",
      error: "\u932F\u8AA4",
      success: "\u6210\u529F",
      warning: "\u8B66\u544A",
      info: "\u4FE1\u606F",
      languageChanged: "\u8A9E\u8A00\u5DF2\u5207\u63DB\u70BA {language}"
    },
    // 守護模塊
    guard: {
      title: "WPlace \u81EA\u52D5\u5B88\u8B77",
      initBot: "\u521D\u59CB\u5316\u5B88\u8B77\u6A5F\u5668\u4EBA",
      selectArea: "\u9078\u64C7\u5340\u57DF",
      captureArea: "\u6355\u7372\u5340\u57DF",
      startProtection: "\u958B\u59CB\u5B88\u8B77",
      stopProtection: "\u505C\u6B62\u5B88\u8B77",
      upperLeft: "\u5DE6\u4E0A\u89D2",
      lowerRight: "\u53F3\u4E0B\u89D2",
      protectedPixels: "\u53D7\u4FDD\u8B77\u50CF\u7D20",
      detectedChanges: "\u6AA2\u6E2C\u5230\u7684\u8B8A\u5316",
      repairedPixels: "\u4FEE\u5FA9\u7684\u50CF\u7D20",
      charges: "\u6B21\u6578",
      waitingInit: "\u7B49\u5F85\u521D\u59CB\u5316...",
      checkingColors: "\u{1F3A8} \u6AA2\u67E5\u53EF\u7528\u984F\u8272...",
      noColorsFound: "\u274C \u672A\u627E\u5230\u984F\u8272\uFF0C\u8ACB\u5728\u7DB2\u7AD9\u4E0A\u6253\u958B\u8ABF\u8272\u677F\u3002",
      colorsFound: "\u2705 \u627E\u5230 {count} \u7A2E\u53EF\u7528\u984F\u8272",
      initSuccess: "\u2705 \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u6210\u529F",
      initError: "\u274C \u5B88\u8B77\u6A5F\u5668\u4EBA\u521D\u59CB\u5316\u5931\u6557",
      invalidCoords: "\u274C \u5EA7\u6A19\u7121\u6548",
      invalidArea: "\u274C \u5340\u57DF\u7121\u6548\uFF0C\u5DE6\u4E0A\u89D2\u5FC5\u9808\u5C0F\u65BC\u53F3\u4E0B\u89D2",
      areaTooLarge: "\u274C \u5340\u57DF\u904E\u5927: {size} \u50CF\u7D20 (\u6700\u5927: {max})",
      capturingArea: "\u{1F4F8} \u6355\u7372\u5B88\u8B77\u5340\u57DF\u4E2D...",
      areaCaptured: "\u2705 \u5340\u57DF\u6355\u7372\u6210\u529F: {count} \u50CF\u7D20\u53D7\u4FDD\u8B77",
      captureError: "\u274C \u6355\u7372\u5340\u57DF\u51FA\u932F: {error}",
      captureFirst: "\u274C \u8ACB\u5148\u6355\u7372\u4E00\u500B\u5B88\u8B77\u5340\u57DF",
      protectionStarted: "\u{1F6E1}\uFE0F \u5B88\u8B77\u5DF2\u5553\u52D5 - \u5340\u57DF\u76E3\u63A7\u4E2D",
      protectionStopped: "\u23F9\uFE0F \u5B88\u8B77\u5DF2\u505C\u6B62",
      noChanges: "\u2705 \u5340\u57DF\u5B89\u5168 - \u672A\u6AA2\u6E2C\u5230\u8B8A\u5316",
      changesDetected: "\u{1F6A8} \u6AA2\u6E2C\u5230 {count} \u500B\u8B8A\u5316",
      repairing: "\u{1F6E0}\uFE0F \u6B63\u5728\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20...",
      repairedSuccess: "\u2705 \u5DF2\u6210\u529F\u4FEE\u5FA9 {count} \u500B\u50CF\u7D20",
      repairError: "\u274C \u4FEE\u5FA9\u51FA\u932F: {error}",
      noCharges: "\u26A0\uFE0F \u6B21\u6578\u4E0D\u8DB3\uFF0C\u7121\u6CD5\u4FEE\u5FA9",
      checkingChanges: "\u{1F50D} \u6B63\u5728\u6AA2\u67E5\u5340\u57DF\u8B8A\u5316...",
      errorChecking: "\u274C \u6AA2\u67E5\u51FA\u932F: {error}",
      guardActive: "\u{1F6E1}\uFE0F \u5B88\u8B77\u4E2D - \u5340\u57DF\u53D7\u4FDD\u8B77",
      lastCheck: "\u4E0A\u6B21\u6AA2\u67E5: {time}",
      nextCheck: "\u4E0B\u6B21\u6AA2\u67E5: {time} \u79D2\u5F8C",
      autoInitializing: "\u{1F916} \u6B63\u5728\u81EA\u52D5\u521D\u59CB\u5316...",
      autoInitSuccess: "\u2705 \u81EA\u52D5\u5553\u52D5\u6210\u529F",
      autoInitFailed: "\u26A0\uFE0F \u7121\u6CD5\u81EA\u52D5\u5553\u52D5\uFF0C\u8ACB\u624B\u52D5\u64CD\u4F5C\u3002",
      manualInitRequired: "\u{1F527} \u9700\u8981\u624B\u52D5\u521D\u59CB\u5316",
      paletteDetected: "\u{1F3A8} \u5DF2\u6AA2\u6E2C\u5230\u8ABF\u8272\u677F",
      paletteNotFound: "\u{1F50D} \u6B63\u5728\u641C\u7D22\u8ABF\u8272\u677F...",
      clickingPaintButton: "\u{1F446} \u6B63\u5728\u9EDE\u64CA\u7E6A\u88FD\u6309\u9215...",
      paintButtonNotFound: "\u274C \u672A\u627E\u5230\u7E6A\u88FD\u6309\u9215",
      selectUpperLeft: "\u{1F3AF} \u5728\u9700\u8981\u4FDD\u8B77\u5340\u57DF\u7684\u5DE6\u4E0A\u89D2\u5857\u4E00\u500B\u50CF\u7D20",
      selectLowerRight: "\u{1F3AF} \u73FE\u5728\u5728\u53F3\u4E0B\u89D2\u5857\u4E00\u500B\u50CF\u7D20",
      waitingUpperLeft: "\u{1F446} \u7B49\u5F85\u9078\u64C7\u5DE6\u4E0A\u89D2...",
      waitingLowerRight: "\u{1F446} \u7B49\u5F85\u9078\u64C7\u53F3\u4E0B\u89D2...",
      upperLeftCaptured: "\u2705 \u5DF2\u6355\u7372\u5DE6\u4E0A\u89D2: ({x}, {y})",
      lowerRightCaptured: "\u2705 \u5DF2\u6355\u7372\u53F3\u4E0B\u89D2: ({x}, {y})",
      selectionTimeout: "\u274C \u9078\u64C7\u8D85\u6642",
      selectionError: "\u274C \u9078\u64C7\u51FA\u932F\uFF0C\u8ACB\u91CD\u8A66"
    }
  };

  // src/locales/index.js
  var translations = {
    es,
    en,
    fr,
    ru,
    zhHans,
    zhHant
  };
  var currentLanguage = "es";
  var currentTranslations = translations[currentLanguage];
  function detectBrowserLanguage() {
    const browserLang = window.navigator.language || window.navigator.userLanguage || "es";
    const langCode = browserLang.split("-")[0].toLowerCase();
    if (translations[langCode]) {
      return langCode;
    }
    return "es";
  }
  function getSavedLanguage() {
    return null;
  }
  function saveLanguage(langCode) {
    return;
  }
  function initializeLanguage() {
    const savedLang = getSavedLanguage();
    const browserLang = detectBrowserLanguage();
    let selectedLang = "es";
    if (savedLang && translations[savedLang]) {
      selectedLang = savedLang;
    } else if (browserLang && translations[browserLang]) {
      selectedLang = browserLang;
    }
    setLanguage(selectedLang);
    return selectedLang;
  }
  function setLanguage(langCode) {
    if (!translations[langCode]) {
      console.warn(`Idioma '${langCode}' no disponible. Usando '${currentLanguage}'`);
      return;
    }
    currentLanguage = langCode;
    currentTranslations = translations[langCode];
    saveLanguage(langCode);
    if (typeof window !== "undefined" && window.CustomEvent) {
      window.dispatchEvent(new window.CustomEvent("languageChanged", {
        detail: { language: langCode, translations: currentTranslations }
      }));
    }
  }
  function t(key, params = {}) {
    const keys = key.split(".");
    let value = currentTranslations;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Clave de traducci\xF3n no encontrada: '${key}'`);
        return key;
      }
    }
    if (typeof value !== "string") {
      console.warn(`Clave de traducci\xF3n no es string: '${key}'`);
      return key;
    }
    return interpolate(value, params);
  }
  function interpolate(text, params) {
    if (!params || Object.keys(params).length === 0) {
      return text;
    }
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== void 0 ? params[key] : match;
    });
  }
  function getSection(section) {
    if (currentTranslations[section]) {
      return currentTranslations[section];
    }
    console.warn(`Secci\xF3n de traducci\xF3n no encontrada: '${section}'`);
    return {};
  }
  initializeLanguage();

  // src/core/dom.js
  function isPaletteOpen(debug = false) {
    const paletteSelectors = [
      '[data-testid="color-picker"]',
      ".color-picker",
      ".palette",
      '[class*="color"][class*="picker"]',
      '[class*="palette"]'
    ];
    for (const selector of paletteSelectors) {
      const element = document.querySelector(selector);
      if (element && element.offsetParent !== null) {
        if (debug) console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por selector: ${selector}`);
        return true;
      }
    }
    const colorElements = document.querySelectorAll('[style*="background-color"], [style*="background:"], .color, [class*="color"]');
    let visibleColors = 0;
    for (const el of colorElements) {
      if (el.offsetParent !== null && el.offsetWidth > 10 && el.offsetHeight > 10) {
        visibleColors++;
        if (visibleColors >= 5) {
          if (debug) console.log(`[WPA-UI] \u{1F3A8} Paleta detectada por colores visibles: ${visibleColors}`);
          return true;
        }
      }
    }
    if (debug) console.log(`[WPA-UI] \u{1F50D} Paleta no detectada. Colores visibles: ${visibleColors}`);
    return false;
  }
  function findAndClickPaintButton(debug = false, doubleClick = false) {
    const specificButton = document.querySelector("button.btn.btn-primary.btn-lg, button.btn.btn-primary.sm\\:btn-xl");
    if (specificButton) {
      const buttonText = specificButton.textContent.toLowerCase();
      const hasPaintText = buttonText.includes("paint") || buttonText.includes("pintar");
      const hasPaintIcon = specificButton.querySelector('svg path[d*="240-120"]') || specificButton.querySelector('svg path[d*="M15"]');
      if (hasPaintText || hasPaintIcon) {
        if (debug) console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por selector espec\xEDfico: "${buttonText}"`);
        specificButton.click();
        if (doubleClick) {
          setTimeout(() => {
            if (debug) console.log(`[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint`);
            specificButton.click();
          }, 500);
        }
        return true;
      }
    }
    const buttons = document.querySelectorAll("button");
    for (const button of buttons) {
      const buttonText = button.textContent.toLowerCase();
      if ((buttonText.includes("paint") || buttonText.includes("pintar")) && button.offsetParent !== null && !button.disabled) {
        if (debug) console.log(`[WPA-UI] \u{1F3AF} Bot\xF3n Paint encontrado por texto: "${button.textContent.trim()}"`);
        button.click();
        if (doubleClick) {
          setTimeout(() => {
            if (debug) console.log(`[WPA-UI] \u{1F3AF} Segundo clic en bot\xF3n Paint`);
            button.click();
          }, 500);
        }
        return true;
      }
    }
    if (debug) console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado`);
    return false;
  }
  async function autoClickPaintButton(maxAttempts = 3, debug = true) {
    if (debug) console.log(`[WPA-UI] \u{1F916} Iniciando auto-click del bot\xF3n Paint (m\xE1ximo ${maxAttempts} intentos)`);
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (debug) console.log(`[WPA-UI] \u{1F3AF} Intento ${attempt}/${maxAttempts} - Buscando bot\xF3n Paint...`);
      if (isPaletteOpen()) {
        if (debug) console.log(`[WPA-UI] \u2705 Paleta ya est\xE1 abierta, auto-click completado`);
        return true;
      }
      if (findAndClickPaintButton(debug, false)) {
        if (debug) console.log(`[WPA-UI] \u{1F446} Clic en bot\xF3n Paint realizado (sin segundo clic)`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (isPaletteOpen()) {
          if (debug) console.log(`[WPA-UI] \u2705 Paleta abierta exitosamente despu\xE9s del intento ${attempt}`);
          return true;
        } else {
          if (debug) console.log(`[WPA-UI] \u26A0\uFE0F Paleta no detectada tras el clic en intento ${attempt}. Reintentar\xE1.`);
        }
      } else {
        if (debug) console.log(`[WPA-UI] \u274C Bot\xF3n Paint no encontrado para clic en intento ${attempt}`);
      }
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      }
    }
    if (debug) console.log(`[WPA-UI] \u274C Auto-click fall\xF3 despu\xE9s de ${maxAttempts} intentos`);
    return false;
  }

  // src/guard/index.js
  var { setInterval, clearInterval } = window;
  async function runGuard() {
    log("\u{1F6E1}\uFE0F Iniciando WPlace Auto-Guard");
    initializeLanguage();
    if (!checkExistingBots()) {
      return;
    }
    window.__wplaceBot = {
      ...window.__wplaceBot,
      guardRunning: true
    };
    try {
      const texts = getSection("guard");
      guardState.ui = createGuardUI(texts);
      setupEventListeners();
      async function tryAutoInit() {
        log("\u{1F916} Intentando auto-inicio del Guard...");
        guardState.ui.updateStatus(t("guard.paletteNotFound"), "info");
        if (isPaletteOpen()) {
          log("\u{1F3A8} Paleta parece abierta. Validando colores...");
          const colorsNow = detectAvailableColors();
          if (colorsNow.length > 0) {
            guardState.ui.updateStatus(t("guard.paletteDetected"), "success");
            return true;
          }
          log('\u26A0\uFE0F Paleta "abierta" pero sin colores detectados. Intentando presionar Paint...');
        }
        log("\u{1F50D} Buscando bot\xF3n Paint...");
        guardState.ui.updateStatus(t("guard.clickingPaintButton"), "info");
        if (findAndClickPaintButton()) {
          log("\u{1F446} Bot\xF3n Paint encontrado y presionado");
          await sleep(3e3);
          const colorsAfter = detectAvailableColors();
          if (colorsAfter.length > 0) {
            log("\u2705 Colores detectados tras presionar Paint");
            guardState.ui.updateStatus(t("guard.paletteDetected"), "success");
            return true;
          }
          if (isPaletteOpen()) {
            log("\u2705 Paleta abierta, pero sin colores accesibles a\xFAn");
          } else {
            log("\u274C La paleta no se abri\xF3 despu\xE9s de hacer clic");
          }
        } else {
          log("\u274C Bot\xF3n Paint no encontrado");
        }
        guardState.ui.updateStatus(t("guard.autoInitFailed"), "warning");
        return false;
      }
      setTimeout(async () => {
        try {
          guardState.ui.updateStatus(t("guard.autoInitializing"), "info");
          log("\u{1F916} Intentando auto-inicio...");
          const autoInitSuccess = await tryAutoInit();
          if (autoInitSuccess) {
            guardState.ui.updateStatus(t("guard.autoInitSuccess"), "success");
            log("\u2705 Auto-inicio exitoso");
            guardState.ui.setInitButtonVisible(false);
            const initResult = await initializeGuard(true);
            if (initResult) {
              log("\u{1F680} Guard-BOT auto-iniciado completamente");
            }
          } else {
            guardState.ui.updateStatus(t("guard.autoInitFailed"), "warning");
            log("\u26A0\uFE0F Auto-inicio fall\xF3, se requiere inicio manual");
            guardState.ui.setInitButtonVisible(true);
          }
        } catch (error) {
          log("\u274C Error en auto-inicio:", error);
          guardState.ui.updateStatus(t("guard.manualInitRequired"), "warning");
        }
      }, 1e3);
      window.addEventListener("beforeunload", () => {
        stopGuard();
        if (window.__wplaceBot) {
          window.__wplaceBot.guardRunning = false;
        }
      });
      log("\u2705 Auto-Guard cargado correctamente");
    } catch (error) {
      log("\u274C Error inicializando Auto-Guard:", error);
      if (window.__wplaceBot) {
        window.__wplaceBot.guardRunning = false;
      }
      throw error;
    }
  }
  function checkExistingBots() {
    var _a, _b;
    if ((_a = window.__wplaceBot) == null ? void 0 : _a.imageRunning) {
      alert("Auto-Image est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Guard.");
      return false;
    }
    if ((_b = window.__wplaceBot) == null ? void 0 : _b.farmRunning) {
      alert("Auto-Farm est\xE1 ejecut\xE1ndose. Ci\xE9rralo antes de iniciar Auto-Guard.");
      return false;
    }
    return true;
  }
  function setupEventListeners() {
    const { elements } = guardState.ui;
    elements.closeBtn.addEventListener("click", () => {
      stopGuard();
      guardState.ui.destroy();
      if (window.__wplaceBot) {
        window.__wplaceBot.guardRunning = false;
      }
    });
    elements.initBtn.addEventListener("click", () => initializeGuard());
    elements.selectAreaBtn.addEventListener("click", selectAreaStepByStep);
    elements.loadAreaBtn.addEventListener("click", () => {
      elements.areaFileInput.click();
    });
    elements.areaFileInput.addEventListener("change", async () => {
      if (elements.areaFileInput.files.length > 0) {
        const result = await loadProgress(elements.areaFileInput.files[0]);
        if (result.success) {
          guardState.ui.updateStatus(`\u2705 Protecci\xF3n cargada: ${result.protectedPixels} p\xEDxeles protegidos`, "success");
          log(`\u2705 \xC1rea de protecci\xF3n cargada desde archivo`);
        } else {
          guardState.ui.updateStatus(`\u274C Error al cargar protecci\xF3n: ${result.error}`, "error");
          log(`\u274C Error cargando archivo: ${result.error}`);
        }
      }
    });
    elements.startBtn.addEventListener("click", startGuard);
    elements.stopBtn.addEventListener("click", async () => {
      guardState.running = false;
      guardState.loopId = null;
      guardState.ui.setRunningState(false);
      guardState.ui.updateStatus("\u23F9\uFE0F Protecci\xF3n detenida", "warning");
      if (guardState.checkInterval) {
        clearInterval(guardState.checkInterval);
        guardState.checkInterval = null;
      }
    });
    elements.saveBtn.addEventListener("click", async () => {
      if (!hasProgress()) {
        guardState.ui.updateStatus("\u274C No hay \xE1rea protegida para guardar", "error");
        return;
      }
      const splitConfirm = await showConfirmDialog(
        '\xBFDeseas dividir el \xE1rea protegida en partes para m\xFAltiples usuarios?<br><br><label for="splitCountInput">N\xFAmero de partes (1 = sin dividir):</label><br><input type="number" id="splitCountInput" min="1" max="20" value="1" style="margin: 5px 0; padding: 5px; width: 100px; background: #374151; border: 1px solid #4b5563; border-radius: 4px; color: #d1d5db;">',
        "Opciones de Guardado",
        {
          save: "Guardar",
          cancel: "Cancelar"
        }
      );
      if (splitConfirm === "save") {
        const splitInput = document.querySelector("#splitCountInput");
        const splitCount = parseInt(splitInput == null ? void 0 : splitInput.value) || 1;
        const result = await saveProgress(null, splitCount);
        if (result.success) {
          guardState.ui.updateStatus(`\u2705 Protecci\xF3n guardada${splitCount > 1 ? ` (dividida en ${splitCount} partes)` : ""}`, "success");
        } else {
          guardState.ui.updateStatus(`\u274C Error al guardar: ${result.error}`, "error");
        }
      }
    });
    elements.pixelsPerBatchInput.addEventListener("change", (e) => {
      guardState.pixelsPerBatch = Math.max(1, Math.min(50, parseInt(e.target.value) || 10));
      e.target.value = guardState.pixelsPerBatch;
    });
    elements.minChargesInput.addEventListener("change", (e) => {
      guardState.minChargesToWait = Math.max(1, Math.min(100, parseInt(e.target.value) || 20));
      e.target.value = guardState.minChargesToWait;
    });
    elements.pixelsPerBatchInput.value = guardState.pixelsPerBatch;
    elements.minChargesInput.value = guardState.minChargesToWait;
  }
  async function initializeGuard(isAutoInit = false) {
    var _a;
    try {
      guardState.ui.updateStatus(t("guard.checkingColors"), "info");
      let colors = detectAvailableColors();
      if (colors.length === 0) {
        log("\u26A0\uFE0F 0 colores detectados. Intentando abrir paleta (fallback)...");
        guardState.ui.updateStatus(t("guard.clickingPaintButton"), "info");
        if (findAndClickPaintButton()) {
          await sleep(2500);
          colors = detectAvailableColors();
        }
      }
      if (colors.length === 0) {
        guardState.ui.updateStatus(t("guard.noColorsFound"), "error");
        return false;
      }
      guardState.availableColors = colors;
      guardState.colorsChecked = true;
      const session = await getSession();
      if (session.success) {
        guardState.currentCharges = session.data.charges;
        guardState.maxCharges = session.data.maxCharges;
        guardState.ui.updateStats({ charges: Math.floor(guardState.currentCharges) });
        log(`\u{1F464} Usuario: ${((_a = session.data.user) == null ? void 0 : _a.name) || "An\xF3nimo"} - Cargas: ${guardState.currentCharges}`);
      }
      guardState.initialized = true;
      guardState.ui.updateStatus(t("guard.colorsFound", { count: colors.length }), "success");
      guardState.ui.showAreaSection();
      if (!isAutoInit) {
        log(`\u2705 ${colors.length} colores disponibles detectados`);
      }
      guardState.ui.setInitialized(true);
      return true;
    } catch (error) {
      log("\u274C Error inicializando:", error);
      guardState.ui.updateStatus(t("guard.initError"), "error");
      return false;
    }
  }
  var originalFetch = window.fetch;
  async function selectAreaStepByStep() {
    log("\u{1F3AF} Iniciando selecci\xF3n paso a paso del \xE1rea");
    let upperLeftCorner = null;
    let lowerRightCorner = null;
    let selectionPhase = "upperLeft";
    let positionCaptured = false;
    const restoreFetch = () => {
      if (window.fetch !== originalFetch) {
        window.fetch = originalFetch;
        log("\u{1F504} Fetch original restaurado");
      }
    };
    const setupFetchInterception = () => {
      window.fetch = async (url, options) => {
        if (!positionCaptured && typeof url === "string" && url.includes("/s0/pixel/") && options && options.method === "POST") {
          try {
            log(`\u{1F3AF} Interceptando request de pintado: ${url}`);
            const response = await originalFetch(url, options);
            if (response.ok && options.body) {
              let bodyData;
              try {
                bodyData = JSON.parse(options.body);
              } catch (parseError) {
                log("Error parseando body del request:", parseError);
                return response;
              }
              if (bodyData.coords && Array.isArray(bodyData.coords) && bodyData.coords.length >= 2) {
                const localX = bodyData.coords[0];
                const localY = bodyData.coords[1];
                const tileMatch = url.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);
                if (tileMatch) {
                  const tileX = parseInt(tileMatch[1]);
                  const tileY = parseInt(tileMatch[2]);
                  const globalX = tileX * 3e3 + localX;
                  const globalY = tileY * 3e3 + localY;
                  if (selectionPhase === "upperLeft") {
                    upperLeftCorner = { x: globalX, y: globalY };
                    guardState.ui.updateCoordinates({ x1: globalX, y1: globalY });
                    guardState.ui.updateStatus(t("guard.upperLeftCaptured", { x: globalX, y: globalY }), "success");
                    log(`\u2705 Esquina superior izquierda capturada: (${globalX}, ${globalY})`);
                    selectionPhase = "lowerRight";
                    setTimeout(() => {
                      if (selectionPhase === "lowerRight") {
                        guardState.ui.updateStatus(t("guard.selectLowerRight"), "info");
                      }
                    }, 1500);
                  } else if (selectionPhase === "lowerRight") {
                    lowerRightCorner = { x: globalX, y: globalY };
                    guardState.ui.updateCoordinates({ x2: globalX, y2: globalY });
                    guardState.ui.updateStatus(t("guard.lowerRightCaptured", { x: globalX, y: globalY }), "success");
                    log(`\u2705 Esquina inferior derecha capturada: (${globalX}, ${globalY})`);
                    positionCaptured = true;
                    restoreFetch();
                    if (upperLeftCorner.x >= lowerRightCorner.x || upperLeftCorner.y >= lowerRightCorner.y) {
                      guardState.ui.updateStatus(t("guard.invalidArea"), "error");
                      return response;
                    }
                    setTimeout(async () => {
                      await captureAreaFromCoordinates(upperLeftCorner, lowerRightCorner);
                    }, 1e3);
                  }
                }
              }
            }
            return response;
          } catch (error) {
            log("\u274C Error interceptando pixel:", error);
            restoreFetch();
            return originalFetch(url, options);
          }
        }
        return originalFetch(url, options);
      };
    };
    setupFetchInterception();
    guardState.ui.updateStatus(t("guard.selectUpperLeft"), "info");
    setTimeout(() => {
      if (!positionCaptured) {
        restoreFetch();
        guardState.ui.updateStatus(t("guard.selectionTimeout"), "error");
        log("\u23F0 Timeout en selecci\xF3n de \xE1rea");
      }
    }, 12e4);
  }
  async function captureAreaFromCoordinates(upperLeft, lowerRight) {
    try {
      const area = {
        x1: upperLeft.x,
        y1: upperLeft.y,
        x2: lowerRight.x,
        y2: lowerRight.y
      };
      guardState.ui.updateStatus(t("guard.capturingArea"), "info");
      const pixelMap = await analyzeAreaPixels(area);
      guardState.protectionArea = area;
      guardState.originalPixels = pixelMap;
      guardState.changes.clear();
      guardState.ui.updateProgress(0, pixelMap.size);
      guardState.ui.updateStatus(t("guard.areaCaptured", { count: pixelMap.size }), "success");
      guardState.ui.enableStartBtn();
      log(`\u2705 \xC1rea capturada: ${pixelMap.size} p\xEDxeles protegidos`);
    } catch (error) {
      log("\u274C Error capturando \xE1rea:", error);
      guardState.ui.updateStatus(t("guard.captureError", { error: error.message }), "error");
    }
  }
  async function startGuard() {
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      guardState.ui.updateStatus(t("guard.captureFirst"), "error");
      return;
    }
    guardState.running = true;
    guardState.ui.setRunningState(true);
    guardState.ui.updateStatus(t("guard.protectionStarted"), "success");
    log("\u{1F6E1}\uFE0F Iniciando protecci\xF3n del \xE1rea");
    guardState.checkInterval = setInterval(checkForChanges, GUARD_DEFAULTS.CHECK_INTERVAL);
    await checkForChanges();
  }
  function stopGuard() {
    guardState.running = false;
    if (guardState.checkInterval) {
      clearInterval(guardState.checkInterval);
      guardState.checkInterval = null;
    }
    if (guardState.ui) {
      guardState.ui.setRunningState(false);
      guardState.ui.updateStatus(t("guard.protectionStopped"), "warning");
    }
    log("\u23F9\uFE0F Protecci\xF3n detenida");
  }

  // src/entries/guard.js
  (async function() {
    var _a;
    try {
      console.log("[WPA-Guard] \u{1F916} Iniciando auto-click del bot\xF3n Paint...");
      await autoClickPaintButton(3, true);
    } catch (error) {
      console.log("[WPA-Guard] \u26A0\uFE0F Error en auto-click del bot\xF3n Paint:", error);
    }
    if ((_a = window.__wplaceBot) == null ? void 0 : _a.guardRunning) {
      alert("Auto-Guard ya est\xE1 corriendo.");
    } else {
      runGuard().catch((error) => {
        console.error("[WPA-GUARD] Error en Auto-Guard:", error);
        if (window.__wplaceBot) {
          window.__wplaceBot.guardRunning = false;
        }
        alert("Auto-Guard: error inesperado. Revisa consola.");
      });
    }
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NvcmUvbG9nZ2VyLmpzIiwgInNyYy9jb3JlL3dwbGFjZS1hcGkuanMiLCAic3JjL2d1YXJkL2NvbmZpZy5qcyIsICJzcmMvY29yZS90dXJuc3RpbGUuanMiLCAic3JjL2NvcmUvdGltaW5nLmpzIiwgInNyYy9ndWFyZC9wcm9jZXNzb3IuanMiLCAic3JjL2d1YXJkL3VpLmpzIiwgInNyYy9ndWFyZC9zYXZlLWxvYWQuanMiLCAic3JjL2xvY2FsZXMvZXMuanMiLCAic3JjL2xvY2FsZXMvZW4uanMiLCAic3JjL2xvY2FsZXMvZnIuanMiLCAic3JjL2xvY2FsZXMvcnUuanMiLCAic3JjL2xvY2FsZXMvemgtSGFucy5qcyIsICJzcmMvbG9jYWxlcy96aC1IYW50LmpzIiwgInNyYy9sb2NhbGVzL2luZGV4LmpzIiwgInNyYy9jb3JlL2RvbS5qcyIsICJzcmMvZ3VhcmQvaW5kZXguanMiLCAic3JjL2VudHJpZXMvZ3VhcmQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBjb25zdCBsb2dnZXIgPSB7XG4gIGRlYnVnRW5hYmxlZDogZmFsc2UsXG4gIHNldERlYnVnKHYpIHsgdGhpcy5kZWJ1Z0VuYWJsZWQgPSAhIXY7IH0sXG4gIGRlYnVnKC4uLmEpIHsgaWYgKHRoaXMuZGVidWdFbmFibGVkKSBjb25zb2xlLmRlYnVnKFwiW0JPVF1cIiwgLi4uYSk7IH0sXG4gIGluZm8oLi4uYSkgIHsgY29uc29sZS5pbmZvKFwiW0JPVF1cIiwgLi4uYSk7IH0sXG4gIHdhcm4oLi4uYSkgIHsgY29uc29sZS53YXJuKFwiW0JPVF1cIiwgLi4uYSk7IH0sXG4gIGVycm9yKC4uLmEpIHsgY29uc29sZS5lcnJvcihcIltCT1RdXCIsIC4uLmEpOyB9XG59O1xuXG4vLyBGYXJtLXNwZWNpZmljIGxvZ2dlclxuZXhwb3J0IGNvbnN0IGxvZyA9ICguLi5hKSA9PiBjb25zb2xlLmxvZygnW1dQQS1VSV0nLCAuLi5hKTtcblxuLy8gVXRpbGl0eSBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBub29wID0gKCkgPT4ge307XG5leHBvcnQgY29uc3QgY2xhbXAgPSAobiwgYSwgYikgPT4gTWF0aC5tYXgoYSwgTWF0aC5taW4oYiwgbikpO1xuIiwgImltcG9ydCB7IGZldGNoV2l0aFRpbWVvdXQgfSBmcm9tIFwiLi9odHRwLmpzXCI7XG5cbmNvbnN0IEJBU0UgPSBcImh0dHBzOi8vYmFja2VuZC53cGxhY2UubGl2ZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBtZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L21lYCwgeyBjcmVkZW50aWFsczogJ2luY2x1ZGUnIH0pLnRoZW4ociA9PiByLmpzb24oKSk7XG4gICAgY29uc3QgdXNlciA9IG1lIHx8IG51bGw7XG4gICAgY29uc3QgYyA9IG1lPy5jaGFyZ2VzIHx8IHt9O1xuICAgIGNvbnN0IGNoYXJnZXMgPSB7XG4gICAgICBjb3VudDogYy5jb3VudCA/PyAwLCAgICAgICAgLy8gTWFudGVuZXIgdmFsb3IgZGVjaW1hbCBvcmlnaW5hbFxuICAgICAgbWF4OiBjLm1heCA/PyAwLCAgICAgICAgICAgIC8vIE1hbnRlbmVyIHZhbG9yIG9yaWdpbmFsIChwdWVkZSB2YXJpYXIgcG9yIHVzdWFyaW8pXG4gICAgICBjb29sZG93bk1zOiBjLmNvb2xkb3duTXMgPz8gMzAwMDBcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlciwgXG4gICAgICAgIGNoYXJnZXM6IGNoYXJnZXMuY291bnQsXG4gICAgICAgIG1heENoYXJnZXM6IGNoYXJnZXMubWF4LFxuICAgICAgICBjaGFyZ2VSZWdlbjogY2hhcmdlcy5jb29sZG93bk1zXG4gICAgICB9XG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgXG4gICAgcmV0dXJuIHsgXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlLFxuICAgICAgZGF0YToge1xuICAgICAgICB1c2VyOiBudWxsLCBcbiAgICAgICAgY2hhcmdlczogMCxcbiAgICAgICAgbWF4Q2hhcmdlczogMCxcbiAgICAgICAgY2hhcmdlUmVnZW46IDMwMDAwXG4gICAgICB9XG4gICAgfTsgXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrSGVhbHRoKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QkFTRX0vaGVhbHRoYCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KTtcbiAgICBcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IGhlYWx0aCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmhlYWx0aCxcbiAgICAgICAgbGFzdENoZWNrOiBEYXRlLm5vdygpLFxuICAgICAgICBzdGF0dXM6ICdvbmxpbmUnXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhYmFzZTogZmFsc2UsXG4gICAgICAgIHVwOiBmYWxzZSxcbiAgICAgICAgdXB0aW1lOiAnTi9BJyxcbiAgICAgICAgbGFzdENoZWNrOiBEYXRlLm5vdygpLFxuICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFiYXNlOiBmYWxzZSxcbiAgICAgIHVwOiBmYWxzZSxcbiAgICAgIHVwdGltZTogJ04vQScsXG4gICAgICBsYXN0Q2hlY2s6IERhdGUubm93KCksXG4gICAgICBzdGF0dXM6ICdvZmZsaW5lJyxcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlXG4gICAgfTtcbiAgfVxufVxuXG4vLyBVbmlmaWNhIHBvc3QgZGUgcFx1MDBFRHhlbCBwb3IgbG90ZXMgKGJhdGNoIHBvciB0aWxlKS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0UGl4ZWxCYXRjaCh7IHRpbGVYLCB0aWxlWSwgcGl4ZWxzLCB0dXJuc3RpbGVUb2tlbiB9KSB7XG4gIC8vIHBpeGVsczogW3t4LHksY29sb3J9LCBcdTIwMjZdIHJlbGF0aXZvcyBhbCB0aWxlXG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IHBpeGVscywgdG9rZW46IHR1cm5zdGlsZVRva2VuIH0pO1xuICBjb25zdCByID0gYXdhaXQgZmV0Y2hXaXRoVGltZW91dChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIiB9LFxuICAgIGJvZHksXG4gICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiXG4gIH0pO1xuICBcbiAgLy8gQWxndW5hcyByZXNwdWVzdGFzIHB1ZWRlbiBubyB0cmFlciBKU09OIGF1bnF1ZSBzZWFuIDIwMC5cbiAgaWYgKHIuc3RhdHVzID09PSAyMDApIHtcbiAgICB0cnkgeyByZXR1cm4gYXdhaXQgci5qc29uKCk7IH0gY2F0Y2ggeyByZXR1cm4geyBvazogdHJ1ZSB9OyB9XG4gIH1cbiAgXG4gIGxldCBtc2cgPSBgSFRUUCAke3Iuc3RhdHVzfWA7XG4gIHRyeSB7IFxuICAgIGNvbnN0IGogPSBhd2FpdCByLmpzb24oKTsgXG4gICAgbXNnID0gaj8ubWVzc2FnZSB8fCBtc2c7IFxuICB9IGNhdGNoIHtcbiAgICAvLyBSZXNwb25zZSBub3QgSlNPTlxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgcGFpbnQgZmFpbGVkOiAke21zZ31gKTtcbn1cblxuLy8gVmVyc2lcdTAwRjNuICdzYWZlJyBxdWUgbm8gYXJyb2phIGV4Y2VwY2lvbmVzIHkgcmV0b3JuYSBzdGF0dXMvanNvblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbEJhdGNoU2FmZSh0aWxlWCwgdGlsZVksIHBpeGVscywgdHVybnN0aWxlVG9rZW4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBwaXhlbHMsIHRva2VuOiB0dXJuc3RpbGVUb2tlbiB9KTtcbiAgICBjb25zdCByID0gYXdhaXQgZmV0Y2hXaXRoVGltZW91dChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIgfSxcbiAgICAgIGJvZHksXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCJcbiAgICB9KTtcbiAgbGV0IGpzb24gPSB7fTtcbiAgLy8gSWYgcmVzcG9uc2UgaXMgbm90IEpTT04sIGlnbm9yZSBwYXJzZSBlcnJvclxuICB0cnkgeyBqc29uID0gYXdhaXQgci5qc29uKCk7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICAgIHJldHVybiB7IHN0YXR1czogci5zdGF0dXMsIGpzb24sIHN1Y2Nlc3M6IHIub2sgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdGF0dXM6IDAsIGpzb246IHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgc3VjY2VzczogZmFsc2UgfTtcbiAgfVxufVxuXG4vLyBQb3N0IHBcdTAwRUR4ZWwgcGFyYSBmYXJtICh2ZXJzaVx1MDBGM24gY29ycmVnaWRhIGNvbiBmb3JtYXRvIG9yaWdpbmFsKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3RQaXhlbChjb29yZHMsIGNvbG9ycywgdHVybnN0aWxlVG9rZW4sIHRpbGVYLCB0aWxlWSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgY29sb3JzOiBjb2xvcnMsIFxuICAgICAgY29vcmRzOiBjb29yZHMsIFxuICAgICAgdDogdHVybnN0aWxlVG9rZW4gXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgMTUwMDApOyAvLyBUaW1lb3V0IGRlIDE1IHNlZ3VuZG9zXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0V9L3MwL3BpeGVsLyR7dGlsZVh9LyR7dGlsZVl9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcgfSxcbiAgICAgIGJvZHk6IGJvZHksXG4gICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsXG4gICAgfSk7XG5cbiAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcblxuICAgIGxldCByZXNwb25zZURhdGEgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIHJlc3BvbnNlRGF0YSA9IHt9OyAvLyBJZ25vcmFyIGVycm9yZXMgZGUgSlNPTiBwYXJzZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGpzb246IHJlc3BvbnNlRGF0YSxcbiAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlLm9rXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiAwLFxuICAgICAganNvbjogeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LFxuICAgICAgc3VjY2VzczogZmFsc2VcbiAgICB9O1xuICB9XG59XG5cbi8vIFBvc3QgcFx1MDBFRHhlbCBwYXJhIEF1dG8tSW1hZ2UgKGZvcm1hdG8gb3JpZ2luYWwgY29ycmVjdG8pXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9zdFBpeGVsQmF0Y2hJbWFnZSh0aWxlWCwgdGlsZVksIGNvb3JkcywgY29sb3JzLCB0dXJuc3RpbGVUb2tlbikge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgY29sb3JzOiBjb2xvcnMsIFxuICAgICAgY29vcmRzOiBjb29yZHMsIFxuICAgICAgdDogdHVybnN0aWxlVG9rZW4gXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQVNFfS9zMC9waXhlbC8ke3RpbGVYfS8ke3RpbGVZfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnIH0sXG4gICAgICBib2R5OiBib2R5XG4gICAgfSk7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmVzcG9uc2VEYXRhID0ge307IC8vIElnbm9yYXIgZXJyb3JlcyBkZSBKU09OIHBhcnNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAganNvbjogcmVzcG9uc2VEYXRhLFxuICAgICAgc3VjY2VzczogcmVzcG9uc2Uub2ssXG4gICAgICBwYWludGVkOiByZXNwb25zZURhdGE/LnBhaW50ZWQgfHwgMFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogMCxcbiAgICAgIGpzb246IHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgcGFpbnRlZDogMFxuICAgIH07XG4gIH1cbn1cbiIsICIvLyBDb25maWd1cmFjaVx1MDBGM24gcGFyYSBBdXRvLUd1YXJkXG5leHBvcnQgY29uc3QgR1VBUkRfREVGQVVMVFMgPSB7XG4gIFNJVEVLRVk6IFwiMHg0QUFBQUFBQnBxSmU4Rk8wTjg0cTBGXCIsXG4gIENPT0xET1dOX0RFRkFVTFQ6IDMxMDAwLFxuICBUSUxFX1NJWkU6IDMwMDAsXG4gIENIRUNLX0lOVEVSVkFMOiAxMDAwMCwgLy8gUmV2aXNhciBjYWRhIDEwIHNlZ3VuZG9zXG4gIE1BWF9QUk9URUNUSU9OX1NJWkU6IEluZmluaXR5LCAvLyBTaW4gbFx1MDBFRG1pdGUgZGUgcFx1MDBFRHhlbGVzIHByb3RlZ2lkb3NcbiAgUElYRUxTX1BFUl9CQVRDSDogMTAsIC8vIE1lbm9zIHF1ZSBJbWFnZSBwYXJhIHNlciBtXHUwMEUxcyBzdXRpbFxuICBNSU5fQ0hBUkdFU19UT19XQUlUOiAyMCwgLy8gQ2FyZ2FzIG1cdTAwRURuaW1hcyBhIGVzcGVyYXIgYW50ZXMgZGUgY29udGludWFyXG4gIEJBQ0tFTkRfVVJMOiBcImh0dHBzOi8vYmFja2VuZC53cGxhY2UubGl2ZVwiXG59O1xuXG4vLyBFc3RhZG8gZ2xvYmFsIGRlbCBHdWFyZFxuZXhwb3J0IGNvbnN0IGd1YXJkU3RhdGUgPSB7XG4gIHJ1bm5pbmc6IGZhbHNlLFxuICBpbml0aWFsaXplZDogZmFsc2UsXG4gIHByb3RlY3Rpb25BcmVhOiBudWxsLCAvLyB7IHgxLCB5MSwgeDIsIHkyLCB0aWxlWCwgdGlsZVkgfVxuICBvcmlnaW5hbFBpeGVsczogbmV3IE1hcCgpLCAvLyBNYXAgZGUgXCJ4LHlcIiAtPiB7ciwgZywgYiwgY29sb3JJZH1cbiAgY2hhbmdlczogbmV3IE1hcCgpLCAvLyBNYXAgZGUgXCJ4LHlcIiAtPiB7dGltZXN0YW1wLCBvcmlnaW5hbENvbG9yLCBjdXJyZW50Q29sb3J9XG4gIGN1cnJlbnRDaGFyZ2VzOiAwLFxuICBtYXhDaGFyZ2VzOiA1MCxcbiAgbGFzdENoZWNrOiAwLFxuICBjaGVja0ludGVydmFsOiBudWxsLFxuICBhdmFpbGFibGVDb2xvcnM6IFtdLFxuICBjb2xvcnNDaGVja2VkOiBmYWxzZSxcbiAgdWk6IG51bGwsXG4gIHRvdGFsUmVwYWlyZWQ6IDAsXG4gIC8vIENvbmZpZ3VyYWNpXHUwMEYzbiBlZGl0YWJsZVxuICBwaXhlbHNQZXJCYXRjaDogR1VBUkRfREVGQVVMVFMuUElYRUxTX1BFUl9CQVRDSCxcbiAgbWluQ2hhcmdlc1RvV2FpdDogR1VBUkRfREVGQVVMVFMuTUlOX0NIQVJHRVNfVE9fV0FJVFxufTtcbiIsICJsZXQgbG9hZGVkID0gZmFsc2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkVHVybnN0aWxlKCkge1xuICBpZiAobG9hZGVkIHx8IHdpbmRvdy50dXJuc3RpbGUpIHJldHVybjtcbiAgXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHMuc3JjID0gJ2h0dHBzOi8vY2hhbGxlbmdlcy5jbG91ZGZsYXJlLmNvbS90dXJuc3RpbGUvdjAvYXBpLmpzP3JlbmRlcj1leHBsaWNpdCc7XG4gICAgcy5hc3luYyA9IHRydWU7IFxuICAgIHMuZGVmZXIgPSB0cnVlO1xuICAgIHMub25sb2FkID0gKCkgPT4ge1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9O1xuICAgIHMub25lcnJvciA9ICgpID0+IHJlamVjdChuZXcgRXJyb3IoJ05vIHNlIHB1ZG8gY2FyZ2FyIFR1cm5zdGlsZScpKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVUdXJuc3RpbGUoc2l0ZUtleSwgYWN0aW9uID0gXCJwYWludFwiKSB7XG4gIGF3YWl0IGxvYWRUdXJuc3RpbGUoKTtcbiAgXG4gIGlmICh0eXBlb2Ygd2luZG93LnR1cm5zdGlsZT8uZXhlY3V0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHdpbmRvdy50dXJuc3RpbGUuZXhlY3V0ZShzaXRlS2V5LCB7IGFjdGlvbiB9KTtcbiAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi5sZW5ndGggPiAyMCkgcmV0dXJuIHRva2VuO1xuICAgIH0gY2F0Y2ggeyBcbiAgICAgIC8qIGZhbGxiYWNrIGFiYWpvICovIFxuICAgIH1cbiAgfVxuICBcbiAgLy8gRmFsbGJhY2s6IHJlbmRlciBvY3VsdG9cbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhvc3Quc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnOyBcbiAgICBob3N0LnN0eWxlLmxlZnQgPSAnLTk5OTlweCc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChob3N0KTtcbiAgICB3aW5kb3cudHVybnN0aWxlLnJlbmRlcihob3N0LCB7IFxuICAgICAgc2l0ZWtleTogc2l0ZUtleSwgXG4gICAgICBjYWxsYmFjazogKHQpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChob3N0KTtcbiAgICAgICAgcmVzb2x2ZSh0KTtcbiAgICAgIH0gXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBWZXJzaVx1MDBGM24gb3JpZ2luYWwgcGFyYSBjb21wYXRpYmlsaWRhZFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFR1cm5zdGlsZVRva2VuKHNpdGVLZXkpIHtcbiAgcmV0dXJuIGV4ZWN1dGVUdXJuc3RpbGUoc2l0ZUtleSwgJ3BhaW50Jyk7XG59XG5cbi8vIERldGVjdGEgZGluXHUwMEUxbWljYW1lbnRlIGxhIHNpdGVrZXkgZGUgVHVybnN0aWxlIGRlbCBET00gbyBkZWwgY29udGV4dG8gZ2xvYmFsLlxuLy8gUHJpb3JpZGFkOiBbZGF0YS1zaXRla2V5XSA+IC5jZi10dXJuc3RpbGVbZGF0YS1zaXRla2V5XSA+IHdpbmRvdy5fX1RVUk5TVElMRV9TSVRFS0VZID4gZmFsbGJhY2tcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RTaXRlS2V5KGZhbGxiYWNrID0gJycpIHtcbiAgdHJ5IHtcbiAgICAvLyAxKSBFbGVtZW50byBjb24gYXRyaWJ1dG8gZGF0YS1zaXRla2V5IChjb21cdTAwRkFuIGVuIGludGVncmFjaW9uZXMgZXhwbFx1MDBFRGNpdGFzKVxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2l0ZWtleV0nKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGNvbnN0IGtleSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXRla2V5Jyk7XG4gICAgICBpZiAoa2V5ICYmIGtleS5sZW5ndGggPiAxMCkgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgLy8gMikgV2lkZ2V0IFR1cm5zdGlsZSBpbnNlcnRhZG8gKC5jZi10dXJuc3RpbGUpXG4gICAgY29uc3QgY2YgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2YtdHVybnN0aWxlJyk7XG4gICAgaWYgKGNmICYmIGNmLmRhdGFzZXQ/LnNpdGVrZXkgJiYgY2YuZGF0YXNldC5zaXRla2V5Lmxlbmd0aCA+IDEwKSB7XG4gICAgICByZXR1cm4gY2YuZGF0YXNldC5zaXRla2V5O1xuICAgIH1cbiAgICAvLyAzKSBWYXJpYWJsZSBnbG9iYWwgb3BjaW9uYWxcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Ll9fVFVSTlNUSUxFX1NJVEVLRVkgJiYgd2luZG93Ll9fVFVSTlNUSUxFX1NJVEVLRVkubGVuZ3RoID4gMTApIHtcbiAgICAgIHJldHVybiB3aW5kb3cuX19UVVJOU1RJTEVfU0lURUtFWTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG4gIHJldHVybiBmYWxsYmFjaztcbn1cbiIsICJleHBvcnQgY29uc3Qgc2xlZXAgPSAobXMpID0+IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCBtcykpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmV0cnkoZm4sIHsgdHJpZXMgPSAzLCBiYXNlID0gNTAwIH0gPSB7fSkge1xuICBsZXQgbGFzdDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmllczsgaSsrKSB7XG4gICAgdHJ5IHsgcmV0dXJuIGF3YWl0IGZuKCk7IH1cbiAgICBjYXRjaCAoZSkgeyBsYXN0ID0gZTsgYXdhaXQgc2xlZXAoYmFzZSAqIDIgKiogaSk7IH1cbiAgfVxuICB0aHJvdyBsYXN0O1xufVxuXG5leHBvcnQgY29uc3QgcmFuZEludCA9IChuKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuKTtcblxuLy8gU2xlZXAgd2l0aCBjb3VudGRvd24gKGZyb20gZmFybSlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzbGVlcFdpdGhDb3VudGRvd24obXMsIG9uVXBkYXRlLCBzdGF0ZSkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjb25zdCBlbmRUaW1lID0gc3RhcnRUaW1lICsgbXM7XG4gIFxuICB3aGlsZSAoRGF0ZS5ub3coKSA8IGVuZFRpbWUgJiYgKCFzdGF0ZSB8fCBzdGF0ZS5ydW5uaW5nKSkge1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IGVuZFRpbWUgLSBEYXRlLm5vdygpO1xuICAgIFxuICAgIGlmIChvblVwZGF0ZSkge1xuICAgICAgb25VcGRhdGUocmVtYWluaW5nKTtcbiAgICB9XG4gICAgXG4gICAgYXdhaXQgc2xlZXAoTWF0aC5taW4oMTAwMCwgcmVtYWluaW5nKSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IHBvc3RQaXhlbEJhdGNoSW1hZ2UgfSBmcm9tIFwiLi4vY29yZS93cGxhY2UtYXBpLmpzXCI7XG5pbXBvcnQgeyBnZXRUdXJuc3RpbGVUb2tlbiB9IGZyb20gXCIuLi9jb3JlL3R1cm5zdGlsZS5qc1wiO1xuaW1wb3J0IHsgZ3VhcmRTdGF0ZSwgR1VBUkRfREVGQVVMVFMgfSBmcm9tIFwiLi9jb25maWcuanNcIjtcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSBcIi4uL2NvcmUvdGltaW5nLmpzXCI7XG5cbi8vIEdsb2JhbHMgZGVsIG5hdmVnYWRvclxuY29uc3QgeyBJbWFnZSwgVVJMIH0gPSB3aW5kb3c7XG5cbi8vIE9idGVuZXIgaW1hZ2VuIGRlIHRpbGUgZGVzZGUgbGEgQVBJXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VGlsZUltYWdlKHRpbGVYLCB0aWxlWSkge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGAke0dVQVJEX0RFRkFVTFRTLkJBQ0tFTkRfVVJMfS9maWxlcy9zMC90aWxlcy8ke3RpbGVYfS8ke3RpbGVZfS5wbmdgO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKGBFcnJvciBvYnRlbmllbmRvIHRpbGUgJHt0aWxlWH0sJHt0aWxlWX06YCwgZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIERldGVjdGFyIGNvbG9yZXMgZGlzcG9uaWJsZXMgZGVsIHNpdGlvXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0QXZhaWxhYmxlQ29sb3JzKCkge1xuICBsb2coXCJcdUQ4M0NcdURGQTggRGV0ZWN0YW5kbyBjb2xvcmVzIGRpc3BvbmlibGVzLi4uXCIpO1xuICBjb25zdCBjb2xvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2lkXj1cImNvbG9yLVwiXScpO1xuICBjb25zdCBjb2xvcnMgPSBbXTtcblxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29sb3JFbGVtZW50cykge1xuICAgIGlmIChlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzdmdcIikpIGNvbnRpbnVlO1xuICAgIFxuICAgIGNvbnN0IGNvbG9ySWQgPSBwYXJzZUludChlbGVtZW50LmlkLnJlcGxhY2UoXCJjb2xvci1cIiwgXCJcIikpO1xuICAgIGlmIChjb2xvcklkID09PSAwIHx8IGNvbG9ySWQgPT09IDUpIGNvbnRpbnVlOyAvLyBFdml0YXIgY29sb3JlcyBlc3BlY2lhbGVzXG4gICAgXG4gICAgY29uc3QgYmdDb2xvciA9IGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuICAgIGlmIChiZ0NvbG9yKSB7XG4gICAgICBjb25zdCByZ2JNYXRjaCA9IGJnQ29sb3IubWF0Y2goL1xcZCsvZyk7XG4gICAgICBpZiAocmdiTWF0Y2ggJiYgcmdiTWF0Y2gubGVuZ3RoID49IDMpIHtcbiAgICAgICAgY29sb3JzLnB1c2goe1xuICAgICAgICAgIGlkOiBjb2xvcklkLFxuICAgICAgICAgIHI6IHBhcnNlSW50KHJnYk1hdGNoWzBdKSxcbiAgICAgICAgICBnOiBwYXJzZUludChyZ2JNYXRjaFsxXSksXG4gICAgICAgICAgYjogcGFyc2VJbnQocmdiTWF0Y2hbMl0pLFxuICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9nKGBcdTI3MDUgJHtjb2xvcnMubGVuZ3RofSBjb2xvcmVzIGRldGVjdGFkb3NgKTtcbiAgcmV0dXJuIGNvbG9ycztcbn1cblxuLy8gRW5jb250cmFyIGVsIGNvbG9yIG1cdTAwRTFzIGNlcmNhbm8gZGlzcG9uaWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDbG9zZXN0Q29sb3IociwgZywgYiwgYXZhaWxhYmxlQ29sb3JzKSB7XG4gIGxldCBtaW5EaXN0YW5jZSA9IEluZmluaXR5O1xuICBsZXQgY2xvc2VzdENvbG9yID0gbnVsbDtcblxuICBmb3IgKGNvbnN0IGNvbG9yIG9mIGF2YWlsYWJsZUNvbG9ycykge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3cociAtIGNvbG9yLnIsIDIpICtcbiAgICAgIE1hdGgucG93KGcgLSBjb2xvci5nLCAyKSArXG4gICAgICBNYXRoLnBvdyhiIC0gY29sb3IuYiwgMilcbiAgICApO1xuXG4gICAgaWYgKGRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcbiAgICAgIG1pbkRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICBjbG9zZXN0Q29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2xvc2VzdENvbG9yO1xufVxuXG4vLyBBbmFsaXphciBwXHUwMEVEeGVsZXMgZGUgdW4gXHUwMEUxcmVhIGVzcGVjXHUwMEVEZmljYVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFuYWx5emVBcmVhUGl4ZWxzKGFyZWEpIHtcbiAgY29uc3QgeyB4MSwgeTEsIHgyLCB5MiB9ID0gYXJlYTtcbiAgY29uc3Qgd2lkdGggPSB4MiAtIHgxO1xuICBjb25zdCBoZWlnaHQgPSB5MiAtIHkxO1xuXG4gIGxvZyhgXHVEODNEXHVERDBEIEFuYWxpemFuZG8gXHUwMEUxcmVhICR7d2lkdGh9eCR7aGVpZ2h0fSBkZXNkZSAoJHt4MX0sJHt5MX0pIGhhc3RhICgke3gyfSwke3kyfSlgKTtcbiAgXG4gIGNvbnN0IHBpeGVsTWFwID0gbmV3IE1hcCgpO1xuICBcbiAgLy8gT2J0ZW5lciB0aWxlcyBcdTAwRkFuaWNvcyBxdWUgY3VicmVuIGVsIFx1MDBFMXJlYVxuICBjb25zdCBzdGFydFRpbGVYID0gTWF0aC5mbG9vcih4MSAvIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRSk7XG4gIGNvbnN0IHN0YXJ0VGlsZVkgPSBNYXRoLmZsb29yKHkxIC8gR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFKTtcbiAgY29uc3QgZW5kVGlsZVggPSBNYXRoLmZsb29yKHgyIC8gR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFKTtcbiAgY29uc3QgZW5kVGlsZVkgPSBNYXRoLmZsb29yKHkyIC8gR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFKTtcbiAgXG4gIC8vIFBhcmEgc2ltcGxpZmljYXIsIGFuYWxpemFyIHRpbGUgcG9yIHRpbGVcbiAgZm9yIChsZXQgdGlsZVkgPSBzdGFydFRpbGVZOyB0aWxlWSA8PSBlbmRUaWxlWTsgdGlsZVkrKykge1xuICAgIGZvciAobGV0IHRpbGVYID0gc3RhcnRUaWxlWDsgdGlsZVggPD0gZW5kVGlsZVg7IHRpbGVYKyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRpbGVCbG9iID0gYXdhaXQgZ2V0VGlsZUltYWdlKHRpbGVYLCB0aWxlWSk7XG4gICAgICAgIGlmICghdGlsZUJsb2IpIHtcbiAgICAgICAgICBsb2coYFx1MjZBMFx1RkUwRiBObyBzZSBwdWRvIG9idGVuZXIgdGlsZSAke3RpbGVYfSwke3RpbGVZfSwgY29udGludWFuZG8uLi5gKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWFyIGNhbnZhcyBwYXJhIGFuYWxpemFyIGxhIGltYWdlblxuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGltZy5vbmxvYWQgPSByZXNvbHZlO1xuICAgICAgICAgIGltZy5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICAgIGltZy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHRpbGVCbG9iKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG5cbiAgICAgICAgLy8gQW5hbGl6YXIgcFx1MDBFRHhlbGVzIGVuIGVsIFx1MDBFMXJlYSBlc3BlY2lmaWNhZGEgZGUgZXN0ZSB0aWxlXG4gICAgICAgIGNvbnN0IHRpbGVTdGFydFggPSB0aWxlWCAqIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRTtcbiAgICAgICAgY29uc3QgdGlsZVN0YXJ0WSA9IHRpbGVZICogR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFO1xuICAgICAgICBjb25zdCB0aWxlRW5kWCA9IHRpbGVTdGFydFggKyBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkU7XG4gICAgICAgIGNvbnN0IHRpbGVFbmRZID0gdGlsZVN0YXJ0WSArIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRTtcbiAgICAgICAgXG4gICAgICAgIC8vIENhbGN1bGFyIGludGVyc2VjY2lcdTAwRjNuIGRlbCBcdTAwRTFyZWEgY29uIGVzdGUgdGlsZVxuICAgICAgICBjb25zdCBhbmFseXplU3RhcnRYID0gTWF0aC5tYXgoeDEsIHRpbGVTdGFydFgpO1xuICAgICAgICBjb25zdCBhbmFseXplU3RhcnRZID0gTWF0aC5tYXgoeTEsIHRpbGVTdGFydFkpO1xuICAgICAgICBjb25zdCBhbmFseXplRW5kWCA9IE1hdGgubWluKHgyLCB0aWxlRW5kWCk7XG4gICAgICAgIGNvbnN0IGFuYWx5emVFbmRZID0gTWF0aC5taW4oeTIsIHRpbGVFbmRZKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGdsb2JhbFkgPSBhbmFseXplU3RhcnRZOyBnbG9iYWxZIDwgYW5hbHl6ZUVuZFk7IGdsb2JhbFkrKykge1xuICAgICAgICAgIGZvciAobGV0IGdsb2JhbFggPSBhbmFseXplU3RhcnRYOyBnbG9iYWxYIDwgYW5hbHl6ZUVuZFg7IGdsb2JhbFgrKykge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxYID0gZ2xvYmFsWCAtIHRpbGVTdGFydFg7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFkgPSBnbG9iYWxZIC0gdGlsZVN0YXJ0WTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVmVyaWZpY2FyIHF1ZSBlc3RhbW9zIGRlbnRybyBkZSBsb3MgbFx1MDBFRG1pdGVzIGRlbCB0aWxlXG4gICAgICAgICAgICBpZiAobG9jYWxYID49IDAgJiYgbG9jYWxYIDwgR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFICYmIFxuICAgICAgICAgICAgICAgIGxvY2FsWSA+PSAwICYmIGxvY2FsWSA8IEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRSkge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gTGFzIGNvb3JkZW5hZGFzIGRlIGxhIGltYWdlbiBzb24gMToxIGNvbiBsYXMgY29vcmRlbmFkYXMgZGVsIHRpbGVcbiAgICAgICAgICAgICAgaWYgKGxvY2FsWCA8IGNhbnZhcy53aWR0aCAmJiBsb2NhbFkgPCBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGl4ZWxJbmRleCA9IChsb2NhbFkgKiBjYW52YXMud2lkdGggKyBsb2NhbFgpICogNDtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gZGF0YVtwaXhlbEluZGV4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBnID0gZGF0YVtwaXhlbEluZGV4ICsgMV07XG4gICAgICAgICAgICAgICAgY29uc3QgYiA9IGRhdGFbcGl4ZWxJbmRleCArIDJdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBkYXRhW3BpeGVsSW5kZXggKyAzXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoYSA+IDApIHsgLy8gUFx1MDBFRHhlbCB2aXNpYmxlXG4gICAgICAgICAgICAgICAgICBjb25zdCBjbG9zZXN0Q29sb3IgPSBmaW5kQ2xvc2VzdENvbG9yKHIsIGcsIGIsIGd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0Q29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxNYXAuc2V0KGAke2dsb2JhbFh9LCR7Z2xvYmFsWX1gLCB7XG4gICAgICAgICAgICAgICAgICAgICAgciwgZywgYixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcklkOiBjbG9zZXN0Q29sb3IuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsWCxcbiAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxZLFxuICAgICAgICAgICAgICAgICAgICAgIGxvY2FsWCxcbiAgICAgICAgICAgICAgICAgICAgICBsb2NhbFksXG4gICAgICAgICAgICAgICAgICAgICAgdGlsZVgsXG4gICAgICAgICAgICAgICAgICAgICAgdGlsZVlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChpbWcuc3JjKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZyhgXHUyNzRDIEVycm9yIGFuYWxpemFuZG8gdGlsZSAke3RpbGVYfSwke3RpbGVZfTpgLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9nKGBcdTI3MDUgQW5cdTAwRTFsaXNpcyBjb21wbGV0YWRvOiAke3BpeGVsTWFwLnNpemV9IHBcdTAwRUR4ZWxlcyBwcm90ZWdpZG9zYCk7XG4gIFxuICAvLyBTaSBubyBlbmNvbnRyYW1vcyBwXHUwMEVEeGVsZXMsIGNyZWFyIHBcdTAwRUR4ZWxlcyBcInZpcnR1YWxlc1wiIHBhcmEgZWwgXHUwMEUxcmVhIHNlbGVjY2lvbmFkYVxuICBpZiAocGl4ZWxNYXAuc2l6ZSA9PT0gMCkge1xuICAgIGxvZyhgXHUyNkEwXHVGRTBGIE5vIHNlIGVuY29udHJhcm9uIHBcdTAwRUR4ZWxlcyBleGlzdGVudGVzLCBjcmVhbmRvIFx1MDBFMXJlYSB2aXJ0dWFsIHBhcmEgcHJvdGVjY2lcdTAwRjNuYCk7XG4gICAgXG4gICAgLy8gQ3JlYXIgZW50cmFkYXMgdmlydHVhbGVzIHBhcmEgY2FkYSBwXHUwMEVEeGVsIGRlbCBcdTAwRTFyZWFcbiAgICBmb3IgKGxldCBnbG9iYWxZID0geTE7IGdsb2JhbFkgPCB5MjsgZ2xvYmFsWSsrKSB7XG4gICAgICBmb3IgKGxldCBnbG9iYWxYID0geDE7IGdsb2JhbFggPCB4MjsgZ2xvYmFsWCsrKSB7XG4gICAgICAgIGNvbnN0IHRpbGVYID0gTWF0aC5mbG9vcihnbG9iYWxYIC8gR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFKTtcbiAgICAgICAgY29uc3QgdGlsZVkgPSBNYXRoLmZsb29yKGdsb2JhbFkgLyBHVUFSRF9ERUZBVUxUUy5USUxFX1NJWkUpO1xuICAgICAgICBjb25zdCBsb2NhbFggPSBnbG9iYWxYIC0gKHRpbGVYICogR1VBUkRfREVGQVVMVFMuVElMRV9TSVpFKTtcbiAgICAgICAgY29uc3QgbG9jYWxZID0gZ2xvYmFsWSAtICh0aWxlWSAqIEdVQVJEX0RFRkFVTFRTLlRJTEVfU0laRSk7XG4gICAgICAgIFxuICAgICAgICAvLyBVc2FyIGNvbG9yIGJsYW5jbyBwb3IgZGVmZWN0byAoSUQgMSkgcGFyYSBwXHUwMEVEeGVsZXMgdmFjXHUwMEVEb3NcbiAgICAgICAgcGl4ZWxNYXAuc2V0KGAke2dsb2JhbFh9LCR7Z2xvYmFsWX1gLCB7XG4gICAgICAgICAgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSwgLy8gQmxhbmNvIHBvciBkZWZlY3RvXG4gICAgICAgICAgY29sb3JJZDogMSwgLy8gSUQgZGVsIGNvbG9yIGJsYW5jb1xuICAgICAgICAgIGdsb2JhbFgsXG4gICAgICAgICAgZ2xvYmFsWSxcbiAgICAgICAgICBsb2NhbFgsXG4gICAgICAgICAgbG9jYWxZLFxuICAgICAgICAgIHRpbGVYLFxuICAgICAgICAgIHRpbGVZXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsb2coYFx1MjcwNSBcdTAwQzFyZWEgdmlydHVhbCBjcmVhZGE6ICR7cGl4ZWxNYXAuc2l6ZX0gcFx1MDBFRHhlbGVzIHBhcmEgcHJvdGVnZXJgKTtcbiAgfVxuICBcbiAgcmV0dXJuIHBpeGVsTWFwO1xufVxuXG4vLyBEZXRlY3RhciBjYW1iaW9zIGVuIGVsIFx1MDBFMXJlYSBwcm90ZWdpZGFcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0ZvckNoYW5nZXMoKSB7XG4gIGlmICghZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSB8fCAhZ3VhcmRTdGF0ZS5vcmlnaW5hbFBpeGVscy5zaXplKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjdXJyZW50UGl4ZWxzID0gYXdhaXQgYW5hbHl6ZUFyZWFQaXhlbHMoZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSk7XG4gICAgY29uc3QgY2hhbmdlcyA9IG5ldyBNYXAoKTtcbiAgICBsZXQgY2hhbmdlZENvdW50ID0gMDtcblxuICAgIC8vIENvbXBhcmFyIHBcdTAwRUR4ZWxlcyBvcmlnaW5hbGVzIHZzIGFjdHVhbGVzXG4gICAgZm9yIChjb25zdCBba2V5LCBvcmlnaW5hbFBpeGVsXSBvZiBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzKSB7XG4gICAgICBjb25zdCBjdXJyZW50UGl4ZWwgPSBjdXJyZW50UGl4ZWxzLmdldChrZXkpO1xuICAgICAgXG4gICAgICBpZiAoIWN1cnJlbnRQaXhlbCkge1xuICAgICAgICAvLyBQXHUwMEVEeGVsIGZ1ZSBib3JyYWRvXG4gICAgICAgIGNoYW5nZXMuc2V0KGtleSwge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0eXBlOiAnZGVsZXRlZCcsXG4gICAgICAgICAgb3JpZ2luYWw6IG9yaWdpbmFsUGl4ZWwsXG4gICAgICAgICAgY3VycmVudDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgY2hhbmdlZENvdW50Kys7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQaXhlbC5jb2xvcklkICE9PSBvcmlnaW5hbFBpeGVsLmNvbG9ySWQpIHtcbiAgICAgICAgLy8gUFx1MDBFRHhlbCBjYW1iaVx1MDBGMyBkZSBjb2xvclxuICAgICAgICBjaGFuZ2VzLnNldChrZXksIHtcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgdHlwZTogJ2NoYW5nZWQnLFxuICAgICAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbFBpeGVsLFxuICAgICAgICAgIGN1cnJlbnQ6IGN1cnJlbnRQaXhlbFxuICAgICAgICB9KTtcbiAgICAgICAgY2hhbmdlZENvdW50Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWRDb3VudCA+IDApIHtcbiAgICAgIGxvZyhgXHVEODNEXHVERUE4IERldGVjdGFkb3MgJHtjaGFuZ2VkQ291bnR9IGNhbWJpb3MgZW4gZWwgXHUwMEUxcmVhIHByb3RlZ2lkYWApO1xuICAgICAgZ3VhcmRTdGF0ZS5jaGFuZ2VzID0gY2hhbmdlcztcbiAgICAgIFxuICAgICAgLy8gQWN0dWFsaXphciBVSVxuICAgICAgaWYgKGd1YXJkU3RhdGUudWkpIHtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoYFx1RDgzRFx1REVBOCAke2NoYW5nZWRDb3VudH0gY2FtYmlvcyBkZXRlY3RhZG9zYCwgJ3dhcm5pbmcnKTtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVQcm9ncmVzcyhjaGFuZ2VzLnNpemUsIGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEluaWNpYXIgcmVwYXJhY2lcdTAwRjNuIGF1dG9tXHUwMEUxdGljYSBzaSBlc3RcdTAwRTEgaGFiaWxpdGFkYVxuICAgICAgaWYgKGd1YXJkU3RhdGUucnVubmluZykge1xuICAgICAgICBhd2FpdCByZXBhaXJDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBY3R1YWxpemFyIHRpbWVzdGFtcCBkZSBcdTAwRkFsdGltYSB2ZXJpZmljYWNpXHUwMEYzblxuICAgICAgZ3VhcmRTdGF0ZS5sYXN0Q2hlY2sgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKGd1YXJkU3RhdGUudWkpIHtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoJ1x1MjcwNSBcdTAwQzFyZWEgcHJvdGVnaWRhIC0gc2luIGNhbWJpb3MnLCAnc3VjY2VzcycpO1xuICAgICAgfVxuICAgIH1cblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZyhgXHUyNzRDIEVycm9yIHZlcmlmaWNhbmRvIGNhbWJpb3M6YCwgZXJyb3IpO1xuICAgIGlmIChndWFyZFN0YXRlLnVpKSB7XG4gICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHUyNzRDIEVycm9yIHZlcmlmaWNhbmRvOiAke2Vycm9yLm1lc3NhZ2V9YCwgJ2Vycm9yJyk7XG4gICAgfVxuICB9XG59XG5cbi8vIFJlcGFyYXIgbG9zIGNhbWJpb3MgZGV0ZWN0YWRvcyAtIGFob3JhIGNvbiBnZXN0aVx1MDBGM24gZGUgY2FyZ2FzIG1cdTAwRURuaW1hc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcGFpckNoYW5nZXMoY2hhbmdlcykge1xuICBpZiAoY2hhbmdlcy5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY2hhbmdlc0FycmF5ID0gQXJyYXkuZnJvbShjaGFuZ2VzLnZhbHVlcygpKTtcbiAgY29uc3QgYXZhaWxhYmxlQ2hhcmdlcyA9IE1hdGguZmxvb3IoZ3VhcmRTdGF0ZS5jdXJyZW50Q2hhcmdlcyk7XG4gIFxuICAvLyBTaSBubyBoYXkgY2FyZ2FzIHN1ZmljaWVudGVzIHBhcmEgcmVwYXJhciBuaSB1biBwXHUwMEVEeGVsLCBlc3BlcmFyXG4gIGlmIChhdmFpbGFibGVDaGFyZ2VzID09PSAwKSB7XG4gICAgbG9nKGBcdTI2QTBcdUZFMEYgU2luIGNhcmdhcyBkaXNwb25pYmxlcywgZXNwZXJhbmRvIHJlY2FyZ2EuLi5gKTtcbiAgICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoJ1x1MjZBMSBFc3BlcmFuZG8gY2FyZ2FzIHBhcmEgcmVwYXJhci4uLicsICd3YXJuaW5nJyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFNpIGhheSBkYVx1MDBGMW9zIHBlcm8gbWVub3MgY2FyZ2FzIHF1ZSBlbCBtXHUwMEVEbmltbyBjb25maWd1cmFkbywgZ2FzdGFyIHRvZGFzIGxhcyBkaXNwb25pYmxlc1xuICBjb25zdCBzaG91bGRSZXBhaXJBbGwgPSBhdmFpbGFibGVDaGFyZ2VzIDwgZ3VhcmRTdGF0ZS5taW5DaGFyZ2VzVG9XYWl0O1xuICBjb25zdCBtYXhSZXBhaXJzID0gc2hvdWxkUmVwYWlyQWxsIFxuICAgID8gYXZhaWxhYmxlQ2hhcmdlcyAgLy8gR2FzdGFyIHRvZGFzIGxhcyBjYXJnYXMgZGlzcG9uaWJsZXNcbiAgICA6IE1hdGgubWluKGNoYW5nZXNBcnJheS5sZW5ndGgsIGd1YXJkU3RhdGUucGl4ZWxzUGVyQmF0Y2gpOyAvLyBVc2FyIGxvdGUgbm9ybWFsXG4gIFxuICBsb2coYFx1RDgzRFx1REVFMFx1RkUwRiBDYXJnYXM6ICR7YXZhaWxhYmxlQ2hhcmdlc30sIE1cdTAwRURuaW1vOiAke2d1YXJkU3RhdGUubWluQ2hhcmdlc1RvV2FpdH0sIFJlcGFyYW5kbzogJHttYXhSZXBhaXJzfSBwXHUwMEVEeGVsZXNgKTtcbiAgXG4gIGlmIChndWFyZFN0YXRlLnVpKSB7XG4gICAgY29uc3QgcmVwYWlyTW9kZSA9IHNob3VsZFJlcGFpckFsbCA/IFwiIChnYXN0YW5kbyB0b2RhcyBsYXMgY2FyZ2FzKVwiIDogXCJcIjtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHVEODNEXHVERUUwXHVGRTBGIFJlcGFyYW5kbyAke21heFJlcGFpcnN9IHBcdTAwRUR4ZWxlcyR7cmVwYWlyTW9kZX0uLi5gLCAnaW5mbycpO1xuICB9XG4gIFxuICAvLyBQcm9jZXNhciBwXHUwMEVEeGVsZXMgZW4gbG90ZXMgbVx1MDBFMXMgcGVxdWVcdTAwRjFvcyBwYXJhIG1lam9yIHJlbmRpbWllbnRvXG4gIGNvbnN0IHBpeGVsc1RvUmVwYWlyID0gY2hhbmdlc0FycmF5LnNsaWNlKDAsIG1heFJlcGFpcnMpO1xuICBcbiAgLy8gQWdydXBhciBjYW1iaW9zIHBvciB0aWxlIHBhcmEgZWZpY2llbmNpYVxuICBjb25zdCBjaGFuZ2VzQnlUaWxlID0gbmV3IE1hcCgpO1xuICBcbiAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgcGl4ZWxzVG9SZXBhaXIpIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IGNoYW5nZS5vcmlnaW5hbDtcbiAgICBjb25zdCB0aWxlS2V5ID0gYCR7b3JpZ2luYWwudGlsZVh9LCR7b3JpZ2luYWwudGlsZVl9YDtcbiAgICBcbiAgICBpZiAoIWNoYW5nZXNCeVRpbGUuaGFzKHRpbGVLZXkpKSB7XG4gICAgICBjaGFuZ2VzQnlUaWxlLnNldCh0aWxlS2V5LCBbXSk7XG4gICAgfVxuICAgIFxuICAgIGNoYW5nZXNCeVRpbGUuZ2V0KHRpbGVLZXkpLnB1c2goe1xuICAgICAgbG9jYWxYOiBvcmlnaW5hbC5sb2NhbFgsXG4gICAgICBsb2NhbFk6IG9yaWdpbmFsLmxvY2FsWSxcbiAgICAgIGNvbG9ySWQ6IG9yaWdpbmFsLmNvbG9ySWQsXG4gICAgICBnbG9iYWxYOiBvcmlnaW5hbC5nbG9iYWxYLFxuICAgICAgZ2xvYmFsWTogb3JpZ2luYWwuZ2xvYmFsWVxuICAgIH0pO1xuICB9XG4gIFxuICBsZXQgdG90YWxSZXBhaXJlZCA9IDA7XG4gIFxuICAvLyBSZXBhcmFyIHBvciBsb3RlcyBkZSB0aWxlXG4gIGZvciAoY29uc3QgW3RpbGVLZXksIHRpbGVDaGFuZ2VzXSBvZiBjaGFuZ2VzQnlUaWxlKSB7XG4gICAgY29uc3QgW3RpbGVYLCB0aWxlWV0gPSB0aWxlS2V5LnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgY29uc3QgY29sb3JzID0gW107XG4gICAgICBcbiAgICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIHRpbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvb3Jkcy5wdXNoKGNoYW5nZS5sb2NhbFgsIGNoYW5nZS5sb2NhbFkpO1xuICAgICAgICBjb2xvcnMucHVzaChjaGFuZ2UuY29sb3JJZCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBhaW50UGl4ZWxCYXRjaCh0aWxlWCwgdGlsZVksIGNvb3JkcywgY29sb3JzKTtcbiAgICAgIFxuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzICYmIHJlc3VsdC5wYWludGVkID4gMCkge1xuICAgICAgICB0b3RhbFJlcGFpcmVkICs9IHJlc3VsdC5wYWludGVkO1xuICAgICAgICBndWFyZFN0YXRlLmN1cnJlbnRDaGFyZ2VzID0gTWF0aC5tYXgoMCwgZ3VhcmRTdGF0ZS5jdXJyZW50Q2hhcmdlcyAtIHJlc3VsdC5wYWludGVkKTtcbiAgICAgICAgZ3VhcmRTdGF0ZS50b3RhbFJlcGFpcmVkICs9IHJlc3VsdC5wYWludGVkO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVtb3ZlciBjYW1iaW9zIHJlcGFyYWRvcyBleGl0b3NhbWVudGVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQucGFpbnRlZCAmJiBpIDwgdGlsZUNoYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjaGFuZ2UgPSB0aWxlQ2hhbmdlc1tpXTtcbiAgICAgICAgICBjb25zdCBrZXkgPSBgJHtjaGFuZ2UuZ2xvYmFsWH0sJHtjaGFuZ2UuZ2xvYmFsWX1gO1xuICAgICAgICAgIGd1YXJkU3RhdGUuY2hhbmdlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbG9nKGBcdTI3MDUgUmVwYXJhZG9zICR7cmVzdWx0LnBhaW50ZWR9IHBcdTAwRUR4ZWxlcyBlbiB0aWxlICgke3RpbGVYfSwke3RpbGVZfSlgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZyhgXHUyNzRDIEVycm9yIHJlcGFyYW5kbyB0aWxlICgke3RpbGVYfSwke3RpbGVZfSk6YCwgcmVzdWx0LmVycm9yKTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coYFx1Mjc0QyBFcnJvciByZXBhcmFuZG8gdGlsZSAoJHt0aWxlWH0sJHt0aWxlWX0pOmAsIGVycm9yKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUGF1c2EgZW50cmUgdGlsZXMgcGFyYSBldml0YXIgcmF0ZSBsaW1pdGluZ1xuICAgIGlmIChjaGFuZ2VzQnlUaWxlLnNpemUgPiAxKSB7XG4gICAgICBhd2FpdCBzbGVlcCg1MDApO1xuICAgIH1cbiAgfVxuICBcbiAgY29uc3QgcmVtYWluaW5nQ2hhcmdlcyA9IE1hdGguZmxvb3IoZ3VhcmRTdGF0ZS5jdXJyZW50Q2hhcmdlcyk7XG4gIGNvbnN0IHJlbWFpbmluZ0NoYW5nZXMgPSBndWFyZFN0YXRlLmNoYW5nZXMuc2l6ZTtcbiAgXG4gIGxvZyhgXHVEODNEXHVERUUwXHVGRTBGIFJlcGFyYWNpXHUwMEYzbiBjb21wbGV0YWRhOiAke3RvdGFsUmVwYWlyZWR9IHBcdTAwRUR4ZWxlcyByZXBhcmFkb3MsICR7cmVtYWluaW5nQ2hhcmdlc30gY2FyZ2FzIHJlc3RhbnRlc2ApO1xuICBcbiAgaWYgKGd1YXJkU3RhdGUudWkpIHtcbiAgICBpZiAocmVtYWluaW5nQ2hhbmdlcyA+IDAgJiYgcmVtYWluaW5nQ2hhcmdlcyA8IGd1YXJkU3RhdGUubWluQ2hhcmdlc1RvV2FpdCkge1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoYFx1MjNGMyBFc3BlcmFuZG8gJHtndWFyZFN0YXRlLm1pbkNoYXJnZXNUb1dhaXR9IGNhcmdhcyBwYXJhIGNvbnRpbnVhciAoJHtyZW1haW5pbmdDaGFyZ2VzfSBhY3R1YWxlcylgLCAnd2FybmluZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHUyNzA1IFJlcGFyYWRvcyAke3RvdGFsUmVwYWlyZWR9IHBcdTAwRUR4ZWxlcyBjb3JyZWN0YW1lbnRlYCwgJ3N1Y2Nlc3MnKTtcbiAgICB9XG4gICAgXG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0cyh7XG4gICAgICBjaGFyZ2VzOiByZW1haW5pbmdDaGFyZ2VzLFxuICAgICAgcmVwYWlyZWQ6IGd1YXJkU3RhdGUudG90YWxSZXBhaXJlZCxcbiAgICAgIHBlbmRpbmc6IHJlbWFpbmluZ0NoYW5nZXNcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBQaW50YXIgbVx1MDBGQWx0aXBsZXMgcFx1MDBFRHhlbGVzIGVuIHVuIHNvbG8gdGlsZVxuYXN5bmMgZnVuY3Rpb24gcGFpbnRQaXhlbEJhdGNoKHRpbGVYLCB0aWxlWSwgY29vcmRzLCBjb2xvcnMpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFR1cm5zdGlsZVRva2VuKEdVQVJEX0RFRkFVTFRTLlNJVEVLRVkpO1xuICAgIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcG9zdFBpeGVsQmF0Y2hJbWFnZShcbiAgICAgIHRpbGVYLCBcbiAgICAgIHRpbGVZLCBcbiAgICAgIGNvb3JkcywgXG4gICAgICBjb2xvcnMsIFxuICAgICAgdG9rZW5cbiAgICApO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiByZXNwb25zZS5zdWNjZXNzLFxuICAgICAgcGFpbnRlZDogcmVzcG9uc2UucGFpbnRlZCxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgZXJyb3I6IHJlc3BvbnNlLnN1Y2Nlc3MgPyBudWxsIDogKHJlc3BvbnNlLmpzb24/Lm1lc3NhZ2UgfHwgJ0Vycm9yIGRlc2Nvbm9jaWRvJylcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIHBhaW50ZWQ6IDAsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZVxuICAgIH07XG4gIH1cbn1cblxuLy8gUGludGFyIHVuIHBcdTAwRUR4ZWwgaW5kaXZpZHVhbFxuXG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUd1YXJkVUkodGV4dHMpIHtcbiAgLy8gQ3JlYXIgY29udGVuZWRvciBwcmluY2lwYWxcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDIwcHg7XG4gICAgcmlnaHQ6IDIwcHg7XG4gICAgd2lkdGg6IDM1MHB4O1xuICAgIGJhY2tncm91bmQ6ICMxYTFhMWE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgY29sb3I6ICNlZWU7XG4gICAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZjtcbiAgICB6LWluZGV4OiA5OTk5O1xuICAgIGJveC1zaGFkb3c6IDAgNXB4IDE1cHggcmdiYSgwLDAsMCwwLjUpO1xuICBgO1xuXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDEycHggMTVweDsgYmFja2dyb3VuZDogIzJkMzc0ODsgY29sb3I6ICM2MGE1ZmE7IGZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDYwMDsgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBhbGlnbi1pdGVtczogY2VudGVyOyBjdXJzb3I6IG1vdmU7XCIgY2xhc3M9XCJndWFyZC1oZWFkZXJcIj5cbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDhweDtcIj5cbiAgICAgICAgXHVEODNEXHVERUUxXHVGRTBGIDxzcGFuPiR7dGV4dHMudGl0bGV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGlkPVwiY2xvc2VCdG5cIiBzdHlsZT1cImJhY2tncm91bmQ6IG5vbmU7IGJvcmRlcjogbm9uZTsgY29sb3I6ICNlZWU7IGN1cnNvcjogcG9pbnRlcjsgb3BhY2l0eTogMC43OyBwYWRkaW5nOiA1cHg7XCI+XHUyNzRDPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDE1cHg7XCI+XG4gICAgICA8IS0tIEVzdGFkbyBkZSBpbmljaWFsaXphY2lcdTAwRjNuIC0tPlxuICAgICAgPGRpdiBpZD1cImluaXRTZWN0aW9uXCI+XG4gICAgICAgIDxidXR0b24gaWQ9XCJpbml0QnRuXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgcGFkZGluZzogMTBweDsgYmFja2dyb3VuZDogIzYwYTVmYTsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC13ZWlnaHQ6IDYwMDsgY3Vyc29yOiBwb2ludGVyOyBtYXJnaW4tYm90dG9tOiAxMHB4O1wiPlxuICAgICAgICAgIFx1RDgzRVx1REQxNiAke3RleHRzLmluaXRCb3R9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDwhLS0gU2VsZWNjaVx1MDBGM24gZGUgXHUwMEUxcmVhIC0tPlxuICAgICAgPGRpdiBpZD1cImFyZWFTZWN0aW9uXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPlxuICAgICAgICA8IS0tIEJvdG9uZXMgZGUgXHUwMEUxcmVhIC0gZW4gZG9zIGNvbHVtbmFzIC0tPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxuICAgICAgICAgIDxidXR0b24gaWQ9XCJzZWxlY3RBcmVhQnRuXCIgc3R5bGU9XCJmbGV4OiAxOyBwYWRkaW5nOiAxMHB4OyBiYWNrZ3JvdW5kOiAjOGI1Y2Y2OyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogNnB4OyBmb250LXdlaWdodDogNjAwOyBjdXJzb3I6IHBvaW50ZXI7XCI+XG4gICAgICAgICAgICBcdUQ4M0NcdURGQUYgJHt0ZXh0cy5zZWxlY3RBcmVhfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gaWQ9XCJsb2FkQXJlYUJ0blwiIHN0eWxlPVwiZmxleDogMTsgcGFkZGluZzogMTBweDsgYmFja2dyb3VuZDogI2Y1OWUwYjsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC13ZWlnaHQ6IDYwMDsgY3Vyc29yOiBwb2ludGVyO1wiPlxuICAgICAgICAgICAgXHVEODNEXHVEQ0MxIENhcmdhciBBcmNoaXZvXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPCEtLSBDb29yZGVuYWRhcyBjYXB0dXJhZGFzIChzb2xvIGxlY3R1cmEpIC0tPlxuICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTVweDtcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiA4cHg7XCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleDogMTtcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDVweDsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogI2NiZDVlMDtcIj4ke3RleHRzLnVwcGVyTGVmdH06PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogNXB4O1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIngxSW5wdXRcIiB0eXBlPVwibnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJYMVwiIHJlYWRvbmx5IHN0eWxlPVwiZmxleDogMTsgcGFkZGluZzogNXB4OyBiYWNrZ3JvdW5kOiAjMzc0MTUxOyBib3JkZXI6IDFweCBzb2xpZCAjNGI1NTYzOyBib3JkZXItcmFkaXVzOiA0cHg7IGNvbG9yOiAjZDFkNWRiOyBmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwieTFJbnB1dFwiIHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIlkxXCIgcmVhZG9ubHkgc3R5bGU9XCJmbGV4OiAxOyBwYWRkaW5nOiA1cHg7IGJhY2tncm91bmQ6ICMzNzQxNTE7IGJvcmRlcjogMXB4IHNvbGlkICM0YjU1NjM7IGJvcmRlci1yYWRpdXM6IDRweDsgY29sb3I6ICNkMWQ1ZGI7IGZvbnQtc2l6ZTogMTNweDtcIj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDE7XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tYm90dG9tOiA1cHg7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICNjYmQ1ZTA7XCI+JHt0ZXh0cy5sb3dlclJpZ2h0fTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiA1cHg7XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwieDJJbnB1dFwiIHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIlgyXCIgcmVhZG9ubHkgc3R5bGU9XCJmbGV4OiAxOyBwYWRkaW5nOiA1cHg7IGJhY2tncm91bmQ6ICMzNzQxNTE7IGJvcmRlcjogMXB4IHNvbGlkICM0YjU1NjM7IGJvcmRlci1yYWRpdXM6IDRweDsgY29sb3I6ICNkMWQ1ZGI7IGZvbnQtc2l6ZTogMTNweDtcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ5MklucHV0XCIgdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiWTJcIiByZWFkb25seSBzdHlsZT1cImZsZXg6IDE7IHBhZGRpbmc6IDVweDsgYmFja2dyb3VuZDogIzM3NDE1MTsgYm9yZGVyOiAxcHggc29saWQgIzRiNTU2MzsgYm9yZGVyLXJhZGl1czogNHB4OyBjb2xvcjogI2QxZDVkYjsgZm9udC1zaXplOiAxM3B4O1wiPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxidXR0b24gaWQ9XCJzdGFydEJ0blwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IHBhZGRpbmc6IDEwcHg7IGJhY2tncm91bmQ6ICMxMGI5ODE7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA2cHg7IGZvbnQtd2VpZ2h0OiA2MDA7IGN1cnNvcjogcG9pbnRlcjsgbWFyZ2luLWJvdHRvbTogMTBweDtcIiBkaXNhYmxlZD5cbiAgICAgICAgICBcdTI1QjZcdUZFMEYgJHt0ZXh0cy5zdGFydFByb3RlY3Rpb259XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPGJ1dHRvbiBpZD1cInN0b3BCdG5cIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBwYWRkaW5nOiAxMHB4OyBiYWNrZ3JvdW5kOiAjZWY0NDQ0OyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogNnB4OyBmb250LXdlaWdodDogNjAwOyBjdXJzb3I6IHBvaW50ZXI7XCIgZGlzYWJsZWQ+XG4gICAgICAgICAgXHUyM0Y5XHVGRTBGICR7dGV4dHMuc3RvcFByb3RlY3Rpb259XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDwhLS0gRXN0YWRcdTAwRURzdGljYXMgLS0+XG4gICAgICA8ZGl2IGlkPVwic3RhdHNTZWN0aW9uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjMmQzNzQ4OyBwYWRkaW5nOiAxMHB4OyBib3JkZXItcmFkaXVzOiA2cHg7IG1hcmdpbi10b3A6IDEwcHg7XCI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDEzcHg7IG1hcmdpbi1ib3R0b206IDVweDtcIj5cbiAgICAgICAgICA8c3Bhbj5cdUQ4M0RcdURDQ0EgJHt0ZXh0cy5wcm90ZWN0ZWRQaXhlbHN9OiA8L3NwYW4+PHNwYW4gaWQ9XCJwcm90ZWN0ZWRDb3VudFwiPjA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxM3B4OyBtYXJnaW4tYm90dG9tOiA1cHg7XCI+XG4gICAgICAgICAgPHNwYW4+XHVEODNEXHVERUE4ICR7dGV4dHMuZGV0ZWN0ZWRDaGFuZ2VzfTogPC9zcGFuPjxzcGFuIGlkPVwiY2hhbmdlc0NvdW50XCI+MDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDEzcHg7IG1hcmdpbi1ib3R0b206IDVweDtcIj5cbiAgICAgICAgICA8c3Bhbj5cdTI2QTEgJHt0ZXh0cy5jaGFyZ2VzfTogPC9zcGFuPjxzcGFuIGlkPVwiY2hhcmdlc0NvdW50XCI+MDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgPHNwYW4+XHVEODNEXHVERUUwXHVGRTBGICR7dGV4dHMucmVwYWlyZWRQaXhlbHN9OiA8L3NwYW4+PHNwYW4gaWQ9XCJyZXBhaXJlZENvdW50XCI+MDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPCEtLSBDb250cm9sZXMgZGUgY29uZmlndXJhY2lcdTAwRjNuIC0tPlxuICAgICAgPGRpdiBpZD1cImNvbmZpZ1NlY3Rpb25cIiBzdHlsZT1cImJhY2tncm91bmQ6ICMyZDM3NDg7IHBhZGRpbmc6IDEwcHg7IGJvcmRlci1yYWRpdXM6IDZweDsgbWFyZ2luLXRvcDogMTBweDtcIj5cbiAgICAgICAgPGg0IHN0eWxlPVwibWFyZ2luOiAwIDAgMTBweCAwOyBmb250LXNpemU6IDE0cHg7IGNvbG9yOiAjY2JkNWUwO1wiPlx1MjY5OVx1RkUwRiBDb25maWd1cmFjaVx1MDBGM248L2g0PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMTBweDsgbWFyZ2luLWJvdHRvbTogMTBweDtcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleDogMTtcIj5cbiAgICAgICAgICAgIDxsYWJlbCBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tYm90dG9tOiA1cHg7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICNjYmQ1ZTA7XCI+UFx1MDBFRHhlbGVzIHBvciBsb3RlOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJwaXhlbHNQZXJCYXRjaElucHV0XCIgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCI1MFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IHBhZGRpbmc6IDVweDsgYmFja2dyb3VuZDogIzM3NDE1MTsgYm9yZGVyOiAxcHggc29saWQgIzRiNTU2MzsgYm9yZGVyLXJhZGl1czogNHB4OyBjb2xvcjogI2QxZDVkYjsgZm9udC1zaXplOiAxM3B4O1wiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJmbGV4OiAxO1wiPlxuICAgICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7IG1hcmdpbi1ib3R0b206IDVweDsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogI2NiZDVlMDtcIj5DYXJnYXMgbVx1MDBFRG5pbWFzOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtaW5DaGFyZ2VzSW5wdXRcIiB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIjEwMFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IHBhZGRpbmc6IDVweDsgYmFja2dyb3VuZDogIzM3NDE1MTsgYm9yZGVyOiAxcHggc29saWQgIzRiNTU2MzsgYm9yZGVyLXJhZGl1czogNHB4OyBjb2xvcjogI2QxZDVkYjsgZm9udC1zaXplOiAxM3B4O1wiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDwhLS0gQ29udHJvbGVzIGRlIHNhdmUvbG9hZCAtLT5cbiAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMTBweDtcIj5cbiAgICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZUJ0blwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IHBhZGRpbmc6IDhweDsgYmFja2dyb3VuZDogIzEwYjk4MTsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC13ZWlnaHQ6IDYwMDsgY3Vyc29yOiBwb2ludGVyOyBmb250LXNpemU6IDEzcHg7XCI+XG4gICAgICAgICAgICBcdUQ4M0RcdURDQkUgR3VhcmRhciBQcm90ZWNjaVx1MDBGM25cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPCEtLSBFc3RhZG8gLS0+XG4gICAgICA8ZGl2IGlkPVwic3RhdHVzQmFyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjMmQzNzQ4OyBwYWRkaW5nOiA4cHg7IGJvcmRlci1yYWRpdXM6IDRweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDEzcHg7IG1hcmdpbi10b3A6IDEwcHg7XCI+XG4gICAgICAgIFx1MjNGMyAke3RleHRzLndhaXRpbmdJbml0fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gIC8vIElucHV0IG9jdWx0byBwYXJhIGFyY2hpdm9zIGRlIFx1MDBFMXJlYVxuICBjb25zdCBhcmVhRmlsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgYXJlYUZpbGVJbnB1dC50eXBlID0gJ2ZpbGUnO1xuICBhcmVhRmlsZUlucHV0LmFjY2VwdCA9ICcuanNvbic7XG4gIGFyZWFGaWxlSW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcmVhRmlsZUlucHV0KTtcblxuICAvLyBIYWNlciBhcnJhc3RyYWJsZVxuICBtYWtlRHJhZ2dhYmxlKGNvbnRhaW5lcik7XG5cbiAgLy8gRWxlbWVudG9zXG4gIGNvbnN0IGVsZW1lbnRzID0ge1xuICAgIGluaXRCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjaW5pdEJ0bicpLFxuICAgIHNlbGVjdEFyZWFCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0QXJlYUJ0bicpLFxuICAgIGxvYWRBcmVhQnRuOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2xvYWRBcmVhQnRuJyksXG4gICAgeDFJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyN4MUlucHV0JyksXG4gICAgeTFJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyN5MUlucHV0JyksXG4gICAgeDJJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyN4MklucHV0JyksXG4gICAgeTJJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyN5MklucHV0JyksXG4gICAgc3RhcnRCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjc3RhcnRCdG4nKSxcbiAgICBzdG9wQnRuOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI3N0b3BCdG4nKSxcbiAgICBjbG9zZUJ0bjogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZUJ0bicpLFxuICAgIGluaXRTZWN0aW9uOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2luaXRTZWN0aW9uJyksXG4gICAgYXJlYVNlY3Rpb246IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjYXJlYVNlY3Rpb24nKSxcbiAgICBwcm90ZWN0ZWRDb3VudDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNwcm90ZWN0ZWRDb3VudCcpLFxuICAgIGNoYW5nZXNDb3VudDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2VzQ291bnQnKSxcbiAgICBjaGFyZ2VzQ291bnQ6IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjY2hhcmdlc0NvdW50JyksXG4gICAgcmVwYWlyZWRDb3VudDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNyZXBhaXJlZENvdW50JyksXG4gICAgc3RhdHVzQmFyOiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI3N0YXR1c0JhcicpLFxuICAgIGFyZWFGaWxlSW5wdXQ6IGFyZWFGaWxlSW5wdXQsXG4gICAgcGl4ZWxzUGVyQmF0Y2hJbnB1dDogY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNwaXhlbHNQZXJCYXRjaElucHV0JyksXG4gICAgbWluQ2hhcmdlc0lucHV0OiBjb250YWluZXIucXVlcnlTZWxlY3RvcignI21pbkNoYXJnZXNJbnB1dCcpLFxuICAgIHNhdmVCdG46IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjc2F2ZUJ0bicpXG4gIH07XG5cbiAgLy8gQVBJIGRlIGxhIFVJXG4gIGNvbnN0IHVpID0ge1xuICAgIGVsZW1lbnRzLFxuICAgIFxuICAgIHVwZGF0ZVN0YXR1czogKG1lc3NhZ2UsIHR5cGUgPSAnaW5mbycpID0+IHtcbiAgICAgIGVsZW1lbnRzLnN0YXR1c0Jhci50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICBjb25zdCBjb2xvcnMgPSB7XG4gICAgICAgIGluZm86ICcjNjBhNWZhJyxcbiAgICAgICAgc3VjY2VzczogJyMxMGI5ODEnLFxuICAgICAgICB3YXJuaW5nOiAnI2Y1OWUwYicsXG4gICAgICAgIGVycm9yOiAnI2VmNDQ0NCdcbiAgICAgIH07XG4gICAgICBlbGVtZW50cy5zdGF0dXNCYXIuc3R5bGUuY29sb3IgPSBjb2xvcnNbdHlwZV0gfHwgY29sb3JzLmluZm87XG4gICAgfSxcblxuICAgIHVwZGF0ZVByb2dyZXNzOiAoY3VycmVudCwgdG90YWwpID0+IHtcbiAgICAgIGVsZW1lbnRzLmNoYW5nZXNDb3VudC50ZXh0Q29udGVudCA9IGN1cnJlbnQ7XG4gICAgICBlbGVtZW50cy5wcm90ZWN0ZWRDb3VudC50ZXh0Q29udGVudCA9IHRvdGFsO1xuICAgIH0sXG5cbiAgICB1cGRhdGVTdGF0czogKHN0YXRzKSA9PiB7XG4gICAgICBpZiAoc3RhdHMuY2hhcmdlcyAhPT0gdW5kZWZpbmVkKSBlbGVtZW50cy5jaGFyZ2VzQ291bnQudGV4dENvbnRlbnQgPSBzdGF0cy5jaGFyZ2VzO1xuICAgICAgaWYgKHN0YXRzLnJlcGFpcmVkICE9PSB1bmRlZmluZWQpIGVsZW1lbnRzLnJlcGFpcmVkQ291bnQudGV4dENvbnRlbnQgPSBzdGF0cy5yZXBhaXJlZDtcbiAgICAgIGlmIChzdGF0cy5wZW5kaW5nICE9PSB1bmRlZmluZWQpIGVsZW1lbnRzLmNoYW5nZXNDb3VudC50ZXh0Q29udGVudCA9IHN0YXRzLnBlbmRpbmc7XG4gICAgfSxcblxuICAgIHNob3dBcmVhU2VjdGlvbjogKCkgPT4ge1xuICAgICAgZWxlbWVudHMuaW5pdFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGVsZW1lbnRzLmFyZWFTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0sXG5cbiAgICBzZXRJbml0QnV0dG9uVmlzaWJsZTogKHZpc2libGUpID0+IHtcbiAgICAgIGVsZW1lbnRzLmluaXRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSB2aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICB9LFxuXG4gICAgc2V0SW5pdGlhbGl6ZWQ6IChpbml0aWFsaXplZCkgPT4ge1xuICAgICAgZWxlbWVudHMuaW5pdEJ0bi5kaXNhYmxlZCA9IGluaXRpYWxpemVkO1xuICAgICAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgICAgIGVsZW1lbnRzLmluaXRCdG4uc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xuICAgICAgICBlbGVtZW50cy5pbml0QnRuLnN0eWxlLmN1cnNvciA9ICdub3QtYWxsb3dlZCc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGVuYWJsZVN0YXJ0QnRuOiAoKSA9PiB7XG4gICAgICBlbGVtZW50cy5zdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzZXRSdW5uaW5nU3RhdGU6IChydW5uaW5nKSA9PiB7XG4gICAgICBlbGVtZW50cy5zdGFydEJ0bi5kaXNhYmxlZCA9IHJ1bm5pbmc7XG4gICAgICBlbGVtZW50cy5zdG9wQnRuLmRpc2FibGVkID0gIXJ1bm5pbmc7XG4gICAgICBlbGVtZW50cy5zZWxlY3RBcmVhQnRuLmRpc2FibGVkID0gcnVubmluZztcbiAgICB9LFxuXG4gICAgdXBkYXRlQ29vcmRpbmF0ZXM6IChjb29yZHMpID0+IHtcbiAgICAgIGlmIChjb29yZHMueDEgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMueDFJbnB1dC52YWx1ZSA9IGNvb3Jkcy54MTtcbiAgICAgIGlmIChjb29yZHMueTEgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMueTFJbnB1dC52YWx1ZSA9IGNvb3Jkcy55MTtcbiAgICAgIGlmIChjb29yZHMueDIgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMueDJJbnB1dC52YWx1ZSA9IGNvb3Jkcy54MjtcbiAgICAgIGlmIChjb29yZHMueTIgIT09IHVuZGVmaW5lZCkgZWxlbWVudHMueTJJbnB1dC52YWx1ZSA9IGNvb3Jkcy55MjtcbiAgICB9LFxuXG4gICAgZGVzdHJveTogKCkgPT4ge1xuICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgYXJlYUZpbGVJbnB1dC5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm1EaWFsb2cobWVzc2FnZSwgdGl0bGUsIGJ1dHRvbnMgPSB7fSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3ZlcmxheS5jbGFzc05hbWUgPSAnbW9kYWwtb3ZlcmxheSc7XG4gICAgb3ZlcmxheS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgb3ZlcmxheS5zdHlsZS50b3AgPSAnMCc7XG4gICAgb3ZlcmxheS5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgIG92ZXJsYXkuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgb3ZlcmxheS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgb3ZlcmxheS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMCwwLDAsMC43KSc7XG4gICAgb3ZlcmxheS5zdHlsZS56SW5kZXggPSAnMTAwMDEnO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBvdmVybGF5LnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgICBvdmVybGF5LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtb2RhbC5zdHlsZS5iYWNrZ3JvdW5kID0gJyMxYTFhMWEnO1xuICAgIG1vZGFsLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgIzMzMyc7XG4gICAgbW9kYWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIG1vZGFsLnN0eWxlLnBhZGRpbmcgPSAnMjVweCc7XG4gICAgbW9kYWwuc3R5bGUuY29sb3IgPSAnI2VlZSc7XG4gICAgbW9kYWwuc3R5bGUubWluV2lkdGggPSAnMzUwcHgnO1xuICAgIG1vZGFsLnN0eWxlLm1heFdpZHRoID0gJzQwMHB4JztcbiAgICBtb2RhbC5zdHlsZS5ib3hTaGFkb3cgPSAnMCAxMHB4IDMwcHggcmdiYSgwLDAsMCwwLjUpJztcbiAgICBtb2RhbC5zdHlsZS5mb250RmFtaWx5ID0gXCInU2Vnb2UgVUknLCBSb2JvdG8sIHNhbnMtc2VyaWZcIjtcbiAgICBcbiAgICBtb2RhbC5pbm5lckhUTUwgPSBgXG4gICAgICA8aDMgc3R5bGU9XCJtYXJnaW46IDAgMCAxNXB4IDA7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udC1zaXplOiAxOHB4O1wiPiR7dGl0bGV9PC9oMz5cbiAgICAgIDxwIHN0eWxlPVwibWFyZ2luOiAwIDAgMjBweCAwOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiAxLjQ7XCI+JHttZXNzYWdlfTwvcD5cbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBnYXA6IDEwcHg7IGp1c3RpZnktY29udGVudDogY2VudGVyO1wiPlxuICAgICAgICAke2J1dHRvbnMuc2F2ZSA/IGA8YnV0dG9uIGNsYXNzPVwic2F2ZS1idG5cIiBzdHlsZT1cInBhZGRpbmc6IDEwcHggMjBweDsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA4cHg7IGZvbnQtc2l6ZTogMTRweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGN1cnNvcjogcG9pbnRlcjsgbWluLXdpZHRoOiAxMDBweDsgYmFja2dyb3VuZDogIzEwYjk4MTsgY29sb3I6IHdoaXRlO1wiPiR7YnV0dG9ucy5zYXZlfTwvYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgJHtidXR0b25zLmRpc2NhcmQgPyBgPGJ1dHRvbiBjbGFzcz1cImRpc2NhcmQtYnRuXCIgc3R5bGU9XCJwYWRkaW5nOiAxMHB4IDIwcHg7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogOHB4OyBmb250LXNpemU6IDE0cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBjdXJzb3I6IHBvaW50ZXI7IG1pbi13aWR0aDogMTAwcHg7IGJhY2tncm91bmQ6ICNlZjQ0NDQ7IGNvbG9yOiB3aGl0ZTtcIj4ke2J1dHRvbnMuZGlzY2FyZH08L2J1dHRvbj5gIDogJyd9XG4gICAgICAgICR7YnV0dG9ucy5jYW5jZWwgPyBgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbC1idG5cIiBzdHlsZT1cInBhZGRpbmc6IDEwcHggMjBweDsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA4cHg7IGZvbnQtc2l6ZTogMTRweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGN1cnNvcjogcG9pbnRlcjsgbWluLXdpZHRoOiAxMDBweDsgYmFja2dyb3VuZDogIzJkMzc0ODsgY29sb3I6IHdoaXRlO1wiPiR7YnV0dG9ucy5jYW5jZWx9PC9idXR0b24+YCA6ICcnfVxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICBcbiAgICBvdmVybGF5LmFwcGVuZENoaWxkKG1vZGFsKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICAgIFxuICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAgIGNvbnN0IHNhdmVCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2F2ZS1idG4nKTtcbiAgICBjb25zdCBkaXNjYXJkQnRuID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmRpc2NhcmQtYnRuJyk7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNhbmNlbC1idG4nKTtcbiAgICBcbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvdmVybGF5KTtcbiAgICB9O1xuICAgIFxuICAgIGlmIChzYXZlQnRuKSB7XG4gICAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIHJlc29sdmUoJ3NhdmUnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZGlzY2FyZEJ0bikge1xuICAgICAgZGlzY2FyZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCdkaXNjYXJkJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGNhbmNlbEJ0bikge1xuICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIHJlc29sdmUoJ2NhbmNlbCcpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIENlcnJhciBjb24gb3ZlcmxheVxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBvdmVybGF5KSB7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgcmVzb2x2ZSgnY2FuY2VsJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYWtlRHJhZ2dhYmxlKGVsZW1lbnQpIHtcbiAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgbGV0IHN0YXJ0WCwgc3RhcnRZLCBzdGFydExlZnQsIHN0YXJ0VG9wO1xuXG4gIGNvbnN0IGhlYWRlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmd1YXJkLWhlYWRlcicpO1xuICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdjbG9zZUJ0bicpIHJldHVybjtcbiAgICBcbiAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgIHN0YXJ0TGVmdCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmxlZnQsIDEwKTtcbiAgICBzdGFydFRvcCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnRvcCwgMTApO1xuICAgIFxuICAgIGVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICBpZiAoIWlzRHJhZ2dpbmcpIHJldHVybjtcbiAgICBcbiAgICBjb25zdCBkZWx0YVggPSBlLmNsaWVudFggLSBzdGFydFg7XG4gICAgY29uc3QgZGVsdGFZID0gZS5jbGllbnRZIC0gc3RhcnRZO1xuICAgIFxuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGAke3N0YXJ0TGVmdCArIGRlbHRhWH1weGA7XG4gICAgZWxlbWVudC5zdHlsZS50b3AgPSBgJHtzdGFydFRvcCArIGRlbHRhWX1weGA7XG4gICAgZWxlbWVudC5zdHlsZS5yaWdodCA9ICdhdXRvJztcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfVxuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBndWFyZFN0YXRlIH0gZnJvbSAnLi9jb25maWcuanMnO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vY29yZS9sb2dnZXIuanMnO1xuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSBkaXZpZGlyIGVsIFx1MDBFMXJlYSBkZSBwcm90ZWNjaVx1MDBGM24gZW4gbVx1MDBGQWx0aXBsZXMgcGFydGVzXG5mdW5jdGlvbiBzcGxpdFByb3RlY3Rpb25BcmVhKGFyZWEsIHNwbGl0Q291bnQpIHtcbiAgY29uc3QgeyB4MSwgeTEsIHgyLCB5MiB9ID0gYXJlYTtcbiAgY29uc3Qgd2lkdGggPSB4MiAtIHgxO1xuICBjb25zdCBoZWlnaHQgPSB5MiAtIHkxO1xuICBjb25zdCBhcmVhcyA9IFtdO1xuICBcbiAgaWYgKHNwbGl0Q291bnQgPD0gMSkge1xuICAgIHJldHVybiBbYXJlYV07XG4gIH1cbiAgXG4gIC8vIERldGVybWluYXIgc2kgZGl2aWRpciBob3Jpem9udGFsIG8gdmVydGljYWxtZW50ZSBiYXNhZG8gZW4gbGFzIGRpbWVuc2lvbmVzXG4gIGNvbnN0IGRpdmlkZUhvcml6b250YWxseSA9IHdpZHRoID49IGhlaWdodDtcbiAgXG4gIGlmIChkaXZpZGVIb3Jpem9udGFsbHkpIHtcbiAgICBjb25zdCBzZWdtZW50V2lkdGggPSBNYXRoLmZsb29yKHdpZHRoIC8gc3BsaXRDb3VudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHN0YXJ0WCA9IHgxICsgKGkgKiBzZWdtZW50V2lkdGgpO1xuICAgICAgY29uc3QgZW5kWCA9IGkgPT09IHNwbGl0Q291bnQgLSAxID8geDIgOiBzdGFydFggKyBzZWdtZW50V2lkdGg7XG4gICAgICBhcmVhcy5wdXNoKHtcbiAgICAgICAgeDE6IHN0YXJ0WCxcbiAgICAgICAgeTE6IHkxLFxuICAgICAgICB4MjogZW5kWCxcbiAgICAgICAgeTI6IHkyXG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2VnbWVudEhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gc3BsaXRDb3VudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHN0YXJ0WSA9IHkxICsgKGkgKiBzZWdtZW50SGVpZ2h0KTtcbiAgICAgIGNvbnN0IGVuZFkgPSBpID09PSBzcGxpdENvdW50IC0gMSA/IHkyIDogc3RhcnRZICsgc2VnbWVudEhlaWdodDtcbiAgICAgIGFyZWFzLnB1c2goe1xuICAgICAgICB4MTogeDEsXG4gICAgICAgIHkxOiBzdGFydFksXG4gICAgICAgIHgyOiB4MixcbiAgICAgICAgeTI6IGVuZFlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGFyZWFzO1xufVxuXG4vLyBGdW5jaVx1MDBGM24gcGFyYSBvYnRlbmVyIHBcdTAwRUR4ZWxlcyBkZW50cm8gZGUgdW4gXHUwMEUxcmVhIGVzcGVjXHUwMEVEZmljYVxuZnVuY3Rpb24gZ2V0UGl4ZWxzSW5BcmVhKGFyZWEsIHBpeGVsc01hcCkge1xuICBjb25zdCBwaXhlbHMgPSBbXTtcbiAgY29uc3QgeyB4MSwgeTEsIHgyLCB5MiB9ID0gYXJlYTtcbiAgXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHBpeGVsc01hcC5lbnRyaWVzKCkpIHtcbiAgICBjb25zdCBbeCwgeV0gPSBrZXkuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICBpZiAoeCA+PSB4MSAmJiB4IDw9IHgyICYmIHkgPj0geTEgJiYgeSA8PSB5Mikge1xuICAgICAgcGl4ZWxzLnB1c2goeyBrZXksIC4uLnZhbHVlIH0pO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIHBpeGVscztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9ncmVzcyhmaWxlbmFtZSA9IG51bGwsIHNwbGl0Q291bnQgPSBudWxsKSB7XG4gIHRyeSB7XG4gICAgaWYgKCFndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhIHx8ICFndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLnNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaGF5IHByb2dyZXNvIHBhcmEgZ3VhcmRhcicpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBhcmVhcyA9IHNwbGl0Q291bnQgJiYgc3BsaXRDb3VudCA+IDEgPyBcbiAgICAgIHNwbGl0UHJvdGVjdGlvbkFyZWEoZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSwgc3BsaXRDb3VudCkgOiBcbiAgICAgIFtndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhXTtcbiAgICBcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmVhcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYXJlYSA9IGFyZWFzW2ldO1xuICAgICAgY29uc3QgYXJlYVBpeGVscyA9IGdldFBpeGVsc0luQXJlYShhcmVhLCBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzKTtcbiAgICAgIFxuICAgICAgY29uc3QgcHJvZ3Jlc3NEYXRhID0ge1xuICAgICAgICB2ZXJzaW9uOiBcIjEuMFwiLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHByb3RlY3Rpb25EYXRhOiB7XG4gICAgICAgICAgYXJlYTogeyAuLi5hcmVhIH0sXG4gICAgICAgICAgcHJvdGVjdGVkUGl4ZWxzOiBhcmVhUGl4ZWxzLmxlbmd0aCxcbiAgICAgICAgICBzcGxpdEluZm86IHNwbGl0Q291bnQgPiAxID8geyBcbiAgICAgICAgICAgIHRvdGFsOiBzcGxpdENvdW50LCBcbiAgICAgICAgICAgIGN1cnJlbnQ6IGkgKyAxLFxuICAgICAgICAgICAgb3JpZ2luYWxBcmVhOiB7IC4uLmd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEgfVxuICAgICAgICAgIH0gOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIHByb2dyZXNzOiB7XG4gICAgICAgICAgdG90YWxSZXBhaXJlZDogZ3VhcmRTdGF0ZS50b3RhbFJlcGFpcmVkLFxuICAgICAgICAgIGxhc3RDaGVjazogZ3VhcmRTdGF0ZS5sYXN0Q2hlY2tcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgbWF4UHJvdGVjdGlvblNpemU6IDEwMDAwMCxcbiAgICAgICAgICBwaXhlbHNQZXJCYXRjaDogMTAsXG4gICAgICAgICAgY2hlY2tJbnRlcnZhbDogMTAwMDBcbiAgICAgICAgfSxcbiAgICAgICAgLy8gRmlsdHJhciBzb2xvIGxvcyBkYXRvcyBzZXJpYWxpemFibGVzIGRlIGxvcyBjb2xvcmVzIChzaW4gZWxlbWVudG9zIERPTSlcbiAgICAgICAgY29sb3JzOiBndWFyZFN0YXRlLmF2YWlsYWJsZUNvbG9ycy5tYXAoY29sb3IgPT4gKHtcbiAgICAgICAgICBpZDogY29sb3IuaWQsXG4gICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgIGI6IGNvbG9yLmJcbiAgICAgICAgfSkpLFxuICAgICAgICAvLyBDb252ZXJ0aXIgTWFwIGEgYXJyYXkgcGFyYSBzZXJpYWxpemFjaVx1MDBGM24gLSBzb2xvIHBcdTAwRUR4ZWxlcyBkZWwgXHUwMEUxcmVhXG4gICAgICAgIG9yaWdpbmFsUGl4ZWxzOiBhcmVhUGl4ZWxzXG4gICAgICB9O1xuICAgICAgXG4gICAgICBjb25zdCBkYXRhU3RyID0gSlNPTi5zdHJpbmdpZnkocHJvZ3Jlc3NEYXRhLCBudWxsLCAyKTtcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW2RhdGFTdHJdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgIFxuICAgICAgY29uc3Qgc3VmZml4ID0gc3BsaXRDb3VudCA+IDEgPyBgX3BhcnRlJHtpICsgMX1kZSR7c3BsaXRDb3VudH1gIDogJyc7XG4gICAgICBjb25zdCBmaW5hbEZpbGVuYW1lID0gZmlsZW5hbWUgfHwgXG4gICAgICAgIGB3cGxhY2VfR1VBUkRfJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTkpLnJlcGxhY2UoLzovZywgJy0nKX0ke3N1ZmZpeH0uanNvbmA7XG4gICAgICBcbiAgICAgIC8vIENyZWFyIHkgZGlzcGFyYXIgZGVzY2FyZ2FcbiAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBmaW5hbEZpbGVuYW1lO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgXG4gICAgICByZXN1bHRzLnB1c2goeyBzdWNjZXNzOiB0cnVlLCBmaWxlbmFtZTogZmluYWxGaWxlbmFtZSB9KTtcbiAgICAgIGxvZyhgXHUyNzA1IFByb2dyZXNvIGd1YXJkYWRvOiAke2ZpbmFsRmlsZW5hbWV9YCk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogdHJ1ZSwgXG4gICAgICBmaWxlbmFtZTogcmVzdWx0cy5sZW5ndGggPT09IDEgPyByZXN1bHRzWzBdLmZpbGVuYW1lIDogYCR7cmVzdWx0cy5sZW5ndGh9IGFyY2hpdm9zYCxcbiAgICAgIGZpbGVzOiByZXN1bHRzXG4gICAgfTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBndWFyZGFuZG8gcHJvZ3Jlc286JywgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkUHJvZ3Jlc3MoZmlsZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IHdpbmRvdy5GaWxlUmVhZGVyKCk7XG4gICAgICBcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHByb2dyZXNzRGF0YSA9IEpTT04ucGFyc2UoZS50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBWYWxpZGFyIGVzdHJ1Y3R1cmEgZGVsIGFyY2hpdm9cbiAgICAgICAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IFsncHJvdGVjdGlvbkRhdGEnLCAnb3JpZ2luYWxQaXhlbHMnLCAnY29sb3JzJ107XG4gICAgICAgICAgY29uc3QgbWlzc2luZ0ZpZWxkcyA9IHJlcXVpcmVkRmllbGRzLmZpbHRlcihmaWVsZCA9PiAhKGZpZWxkIGluIHByb2dyZXNzRGF0YSkpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChtaXNzaW5nRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FtcG9zIHJlcXVlcmlkb3MgZmFsdGFudGVzOiAke21pc3NpbmdGaWVsZHMuam9pbignLCAnKX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gVmVyaWZpY2FyIGNvbXBhdGliaWxpZGFkIGRlIGNvbG9yZXNcbiAgICAgICAgICBpZiAoZ3VhcmRTdGF0ZS5hdmFpbGFibGVDb2xvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgc2F2ZWRDb2xvcklkcyA9IHByb2dyZXNzRGF0YS5jb2xvcnMubWFwKGMgPT4gYy5pZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q29sb3JJZHMgPSBndWFyZFN0YXRlLmF2YWlsYWJsZUNvbG9ycy5tYXAoYyA9PiBjLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1vbkNvbG9ycyA9IHNhdmVkQ29sb3JJZHMuZmlsdGVyKGlkID0+IGN1cnJlbnRDb2xvcklkcy5pbmNsdWRlcyhpZCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29tbW9uQ29sb3JzLmxlbmd0aCA8IHNhdmVkQ29sb3JJZHMubGVuZ3RoICogMC44KSB7XG4gICAgICAgICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIExvcyBjb2xvcmVzIGd1YXJkYWRvcyBubyBjb2luY2lkZW4gY29tcGxldGFtZW50ZSBjb24gbG9zIGFjdHVhbGVzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIFJlc3RhdXJhciBlc3RhZG9cbiAgICAgICAgICBpZiAocHJvZ3Jlc3NEYXRhLnByb3RlY3Rpb25EYXRhKSB7XG4gICAgICAgICAgICBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhID0gcHJvZ3Jlc3NEYXRhLnByb3RlY3Rpb25EYXRhLmFyZWE7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9ncmVzc0RhdGEucHJvdGVjdGlvbkFyZWEpIHtcbiAgICAgICAgICAgIC8vIENvbXBhdGliaWxpZGFkIGNvbiBmb3JtYXRvIGFudGVyaW9yXG4gICAgICAgICAgICBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhID0gcHJvZ3Jlc3NEYXRhLnByb3RlY3Rpb25BcmVhO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAvLyBDb252ZXJ0aXIgYXJyYXkgZGUgcFx1MDBFRHhlbGVzIGRlIHZ1ZWx0YSBhIE1hcFxuICAgICAgICAgIGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgZm9yIChjb25zdCBwaXhlbERhdGEgb2YgcHJvZ3Jlc3NEYXRhLm9yaWdpbmFsUGl4ZWxzKSB7XG4gICAgICAgICAgICBjb25zdCB7IGtleSwgLi4ucGl4ZWxJbmZvIH0gPSBwaXhlbERhdGE7XG4gICAgICAgICAgICBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLnNldChrZXksIHBpeGVsSW5mbyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIFJlc3RhdXJhciBlc3RhZFx1MDBFRHN0aWNhcyBzaSBlc3RcdTAwRTFuIGRpc3BvbmlibGVzXG4gICAgICAgICAgaWYgKHByb2dyZXNzRGF0YS5wcm9ncmVzcykge1xuICAgICAgICAgICAgZ3VhcmRTdGF0ZS50b3RhbFJlcGFpcmVkID0gcHJvZ3Jlc3NEYXRhLnByb2dyZXNzLnRvdGFsUmVwYWlyZWQgfHwgMDtcbiAgICAgICAgICAgIGd1YXJkU3RhdGUubGFzdENoZWNrID0gcHJvZ3Jlc3NEYXRhLnByb2dyZXNzLmxhc3RDaGVjayB8fCAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3NEYXRhLnN0YXRpc3RpY3MpIHtcbiAgICAgICAgICAgIC8vIENvbXBhdGliaWxpZGFkIGNvbiBmb3JtYXRvIGFudGVyaW9yXG4gICAgICAgICAgICBndWFyZFN0YXRlLnRvdGFsUmVwYWlyZWQgPSBwcm9ncmVzc0RhdGEuc3RhdGlzdGljcy50b3RhbFJlcGFpcmVkIHx8IDA7XG4gICAgICAgICAgICBndWFyZFN0YXRlLmxhc3RDaGVjayA9IHByb2dyZXNzRGF0YS5zdGF0aXN0aWNzLmxhc3RDaGVjayB8fCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAvLyBMaW1waWFyIGNhbWJpb3MgcHJldmlvc1xuICAgICAgICAgIGd1YXJkU3RhdGUuY2hhbmdlcy5jbGVhcigpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIEFjdHVhbGl6YXIgVUkgY29uIGxvcyBkYXRvcyBjYXJnYWRvc1xuICAgICAgICAgIGlmIChndWFyZFN0YXRlLnVpKSB7XG4gICAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZUNvb3JkaW5hdGVzKHtcbiAgICAgICAgICAgICAgeDE6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueDEsXG4gICAgICAgICAgICAgIHkxOiBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLnkxLFxuICAgICAgICAgICAgICB4MjogZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYS54MixcbiAgICAgICAgICAgICAgeTI6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueTJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVByb2dyZXNzKDAsIGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSk7XG4gICAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXRzKHtcbiAgICAgICAgICAgICAgcmVwYWlyZWQ6IGd1YXJkU3RhdGUudG90YWxSZXBhaXJlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGd1YXJkU3RhdGUudWkuZW5hYmxlU3RhcnRCdG4oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgbG9nKGBcdTI3MDUgUHJvZ3Jlc28gY2FyZ2FkbzogJHtndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLnNpemV9IHBcdTAwRUR4ZWxlcyBwcm90ZWdpZG9zYCk7XG4gICAgICAgICAgXG4gICAgICAgICAgcmVzb2x2ZSh7IFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSwgXG4gICAgICAgICAgICBkYXRhOiBwcm9ncmVzc0RhdGEsXG4gICAgICAgICAgICBwcm90ZWN0ZWRQaXhlbHM6IGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSxcbiAgICAgICAgICAgIGFyZWE6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWFcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgICAgIGxvZygnXHUyNzRDIEVycm9yIHBhcnNlYW5kbyBhcmNoaXZvIGRlIHByb2dyZXNvOicsIHBhcnNlRXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IHBhcnNlRXJyb3IubWVzc2FnZSB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIFxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gJ0Vycm9yIGxleWVuZG8gYXJjaGl2byc7XG4gICAgICAgIGxvZygnXHUyNzRDJywgZXJyb3IpO1xuICAgICAgICByZXNvbHZlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yIH0pO1xuICAgICAgfTtcbiAgICAgIFxuICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgICBcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCdcdTI3NEMgRXJyb3IgY2FyZ2FuZG8gcHJvZ3Jlc286JywgZXJyb3IpO1xuICAgICAgcmVzb2x2ZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJQcm9ncmVzcygpIHtcbiAgZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSA9IG51bGw7XG4gIGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuY2xlYXIoKTtcbiAgZ3VhcmRTdGF0ZS5jaGFuZ2VzLmNsZWFyKCk7XG4gIGd1YXJkU3RhdGUudG90YWxSZXBhaXJlZCA9IDA7XG4gIGd1YXJkU3RhdGUubGFzdENoZWNrID0gMDtcbiAgXG4gIGlmIChndWFyZFN0YXRlLnVpKSB7XG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVDb29yZGluYXRlcyh7IHgxOiAnJywgeTE6ICcnLCB4MjogJycsIHkyOiAnJyB9KTtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVByb2dyZXNzKDAsIDApO1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHMoeyByZXBhaXJlZDogMCB9KTtcbiAgfVxuICBcbiAgbG9nKCdcdUQ4M0VcdURERjkgUHJvZ3Jlc28gbGltcGlhZG8nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1Byb2dyZXNzKCkge1xuICByZXR1cm4gZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSAmJiBcbiAgICAgICAgIGd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSA+IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9ncmVzc0luZm8oKSB7XG4gIHJldHVybiB7XG4gICAgaGFzUHJvZ3Jlc3M6IGhhc1Byb2dyZXNzKCksXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBndWFyZFN0YXRlLm9yaWdpbmFsUGl4ZWxzLnNpemUsXG4gICAgdG90YWxSZXBhaXJlZDogZ3VhcmRTdGF0ZS50b3RhbFJlcGFpcmVkLFxuICAgIGFyZWE6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEgPyB7XG4gICAgICB3aWR0aDogZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYS54MiAtIGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueDEsXG4gICAgICBoZWlnaHQ6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueTIgLSBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLnkxLFxuICAgICAgeDE6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueDEsXG4gICAgICB5MTogZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYS55MSxcbiAgICAgIHgyOiBndWFyZFN0YXRlLnByb3RlY3Rpb25BcmVhLngyLFxuICAgICAgeTI6IGd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEueTJcbiAgICB9IDogbnVsbFxuICB9O1xufVxuXG4vLyBBbGlhcyBwYXJhIGNvbXBhdGliaWxpZGFkXG5leHBvcnQgY29uc3Qgc2F2ZUd1YXJkRGF0YSA9IHNhdmVQcm9ncmVzcztcbmV4cG9ydCBjb25zdCBsb2FkR3VhcmREYXRhID0gbG9hZFByb2dyZXNzO1xuZXhwb3J0IGNvbnN0IGNsZWFyR3VhcmREYXRhID0gY2xlYXJQcm9ncmVzcztcbmV4cG9ydCBjb25zdCBoYXNHdWFyZERhdGEgPSBoYXNQcm9ncmVzcztcbmV4cG9ydCBjb25zdCBnZXRHdWFyZERhdGFJbmZvID0gZ2V0UHJvZ3Jlc3NJbmZvO1xuIiwgImV4cG9ydCBjb25zdCBlcyA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU2VsZWNjaVx1MDBGM24nLFxuICAgIHVzZXI6ICdVc3VhcmlvJyxcbiAgICBjaGFyZ2VzOiAnQ2FyZ2FzJyxcbiAgICBiYWNrZW5kOiAnQmFja2VuZCcsXG4gICAgZGF0YWJhc2U6ICdEYXRhYmFzZScsXG4gICAgdXB0aW1lOiAnVXB0aW1lJyxcbiAgICBjbG9zZTogJ0NlcnJhcicsXG4gICAgbGF1bmNoOiAnTGFuemFyJyxcbiAgICBsb2FkaW5nOiAnQ2FyZ2FuZG9cdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0VqZWN1dGFuZG9cdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnRGVzY2FyZ2FuZG8gc2NyaXB0XHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdFbGlnZSB1biBib3QgeSBwcmVzaW9uYSBMYW56YXInLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdMaXN0byBwYXJhIGxhbnphcicsXG4gICAgbG9hZEVycm9yOiAnRXJyb3IgYWwgY2FyZ2FyJyxcbiAgICBsb2FkRXJyb3JNc2c6ICdObyBzZSBwdWRvIGNhcmdhciBlbCBib3Qgc2VsZWNjaW9uYWRvLiBSZXZpc2EgdHUgY29uZXhpXHUwMEYzbiBvIGludFx1MDBFOW50YWxvIGRlIG51ZXZvLicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgVmVyaWZpY2FuZG8uLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBPbmxpbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgT2ZmbGluZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycm9yJyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pY2lhciBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlN1YmlyIEltYWdlblwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlJlZGltZW5zaW9uYXIgSW1hZ2VuXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWNjaW9uYXIgUG9zaWNpXHUwMEYzblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiSW5pY2lhciBQaW50dXJhXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIkRldGVuZXIgUGludHVyYVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJHdWFyZGFyIFByb2dyZXNvXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIkNhcmdhciBQcm9ncmVzb1wiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBWZXJpZmljYW5kbyBjb2xvcmVzIGRpc3BvbmlibGVzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHUwMEExQWJyZSBsYSBwYWxldGEgZGUgY29sb3JlcyBlbiBlbCBzaXRpbyBlIGludFx1MDBFOW50YWxvIGRlIG51ZXZvIVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvbG9yZXMgZGlzcG9uaWJsZXMgZW5jb250cmFkb3NcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIENhcmdhbmRvIGltYWdlbi4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBJbWFnZW4gY2FyZ2FkYSBjb24ge2NvdW50fSBwXHUwMEVEeGVsZXMgdlx1MDBFMWxpZG9zXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgRXJyb3IgYWwgY2FyZ2FyIGxhIGltYWdlblwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHUwMEExUGludGEgZWwgcHJpbWVyIHBcdTAwRUR4ZWwgZW4gbGEgdWJpY2FjaVx1MDBGM24gZG9uZGUgcXVpZXJlcyBxdWUgY29taWVuY2UgZWwgYXJ0ZSFcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBxdWUgcGludGVzIGVsIHBcdTAwRUR4ZWwgZGUgcmVmZXJlbmNpYS4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTAwQTFQb3NpY2lcdTAwRjNuIGVzdGFibGVjaWRhIGNvbiBcdTAwRTl4aXRvIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2Npb25hciBwb3NpY2lcdTAwRjNuXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgUG9zaWNpXHUwMEYzbiBkZXRlY3RhZGEsIHByb2Nlc2FuZG8uLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJvciBkZXRlY3RhbmRvIHBvc2ljaVx1MDBGM24sIGludFx1MDBFOW50YWxvIGRlIG51ZXZvXCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggSW5pY2lhbmRvIHBpbnR1cmEuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9ncmVzbzoge3BhaW50ZWR9L3t0b3RhbH0gcFx1MDBFRHhlbGVzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBTaW4gY2FyZ2FzLiBFc3BlcmFuZG8ge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQaW50dXJhIGRldGVuaWRhIHBvciBlbCB1c3VhcmlvXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgXHUwMEExUGludHVyYSBjb21wbGV0YWRhISB7Y291bnR9IHBcdTAwRUR4ZWxlcyBwaW50YWRvcy5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBFcnJvciBkdXJhbnRlIGxhIHBpbnR1cmFcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBDYXJnYSB1bmEgaW1hZ2VuIHkgc2VsZWNjaW9uYSB1bmEgcG9zaWNpXHUwMEYzbiBwcmltZXJvXCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3Jlc29cIixcbiAgICB1c2VyTmFtZTogXCJVc3VhcmlvXCIsXG4gICAgcGl4ZWxzOiBcIlBcdTAwRUR4ZWxlc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2FyZ2FzXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJUaWVtcG8gZXN0aW1hZG9cIixcbiAgICBpbml0TWVzc2FnZTogXCJIYXogY2xpYyBlbiAnSW5pY2lhciBBdXRvLUJPVCcgcGFyYSBjb21lbnphclwiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVzcGVyYW5kbyBpbmljaWFsaXphY2lcdTAwRjNuLi4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgSW1hZ2VuIHJlZGltZW5zaW9uYWRhIGEge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQaW50dXJhIHBhdXNhZGEgZW4gbGEgcG9zaWNpXHUwMEYzbiBYOiB7eH0sIFk6IHt5fVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBcdTAwRUR4ZWxlcyBwb3IgbG90ZVwiLFxuICAgIGJhdGNoU2l6ZTogXCJUYW1hXHUwMEYxbyBkZWwgbG90ZVwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiU2lndWllbnRlIGxvdGUgZW5cIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlVzYXIgdG9kYXMgbGFzIGNhcmdhcyBkaXNwb25pYmxlc1wiLFxuICAgIHNob3dPdmVybGF5OiBcIk1vc3RyYXIgb3ZlcmxheVwiLFxuICAgIG1heENoYXJnZXM6IFwiQ2FyZ2FzIG1cdTAwRTF4aW1hcyBwb3IgbG90ZVwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBFc3BlcmFuZG8gY2FyZ2FzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRpZW1wbyByZXN0YW50ZVwiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgRXNwZXJhbmRvIHt0aW1lfSBwYXJhIGNvbnRpbnVhci4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyZXNvIGd1YXJkYWRvIGNvbW8ge2ZpbGVuYW1lfVwiLFxuICAgIHByb2dyZXNzTG9hZGVkOiBcIlx1MjcwNSBQcm9ncmVzbyBjYXJnYWRvOiB7cGFpbnRlZH0ve3RvdGFsfSBwXHUwMEVEeGVsZXMgcGludGFkb3NcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgRXJyb3IgYWwgY2FyZ2FyIHByb2dyZXNvOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGFsIGd1YXJkYXIgcHJvZ3Jlc286IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1MDBCRkRlc2VhcyBndWFyZGFyIGVsIHByb2dyZXNvIGFjdHVhbCBhbnRlcyBkZSBkZXRlbmVyP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIkd1YXJkYXIgUHJvZ3Jlc29cIixcbiAgICBkaXNjYXJkUHJvZ3Jlc3M6IFwiRGVzY2FydGFyXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbGFyXCIsXG4gICAgbWluaW1pemU6IFwiTWluaW1pemFyXCIsXG4gICAgd2lkdGg6IFwiQW5jaG9cIixcbiAgICBoZWlnaHQ6IFwiQWx0b1wiLCBcbiAgICBrZWVwQXNwZWN0OiBcIk1hbnRlbmVyIHByb3BvcmNpXHUwMEYzblwiLFxuICAgIGFwcGx5OiBcIkFwbGljYXJcIixcbiAgb3ZlcmxheU9uOiBcIk92ZXJsYXk6IE9OXCIsXG4gIG92ZXJsYXlPZmY6IFwiT3ZlcmxheTogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzYWRhIGNvbXBsZXRhZGE6IHtwYWludGVkfSBwXHUwMEVEeGVsZXMgcGludGFkb3MgfCBQcm9ncmVzbzoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgRXNwZXJhbmRvIHJlZ2VuZXJhY2lcdTAwRjNuIGRlIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gVGllbXBvOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgRXNwZXJhbmRvIGNhcmdhczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gUXVlZGFuOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbmljaWFsaXphbmRvIGF1dG9tXHUwMEUxdGljYW1lbnRlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBCb3QgaW5pY2lhZG8gYXV0b21cdTAwRTF0aWNhbWVudGVcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgTm8gc2UgcHVkbyBpbmljaWFyIGF1dG9tXHUwMEUxdGljYW1lbnRlLiBVc2EgZWwgYm90XHUwMEYzbiBtYW51YWwuXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBQYWxldGEgZGUgY29sb3JlcyBkZXRlY3RhZGFcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIEJ1c2NhbmRvIHBhbGV0YSBkZSBjb2xvcmVzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgSGFjaWVuZG8gY2xpYyBlbiBlbCBib3RcdTAwRjNuIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm90XHUwMEYzbiBQYWludCBubyBlbmNvbnRyYWRvXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbmljaW8gbWFudWFsIHJlcXVlcmlkb1wiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgUmVpbnRlbnRvIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGVuIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgRXJyb3IgZW4gaW50ZW50byB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgcmVpbnRlbnRhbmRvIGVuIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIEZhbGxcdTAwRjMgZGVzcHVcdTAwRTlzIGRlIHttYXhBdHRlbXB0c30gaW50ZW50b3MuIENvbnRpbnVhbmRvIGNvbiBzaWd1aWVudGUgbG90ZS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgRXJyb3IgZGUgcmVkLiBSZWludGVudGFuZG8uLi5cIixcbiAgICBzZXJ2ZXJFcnJvcjogXCJcdUQ4M0RcdUREMjUgRXJyb3IgZGVsIHNlcnZpZG9yLiBSZWludGVudGFuZG8uLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFRpbWVvdXQgZGVsIHNlcnZpZG9yLiBSZWludGVudGFuZG8uLi5cIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlIChwb3IgaW1wbGVtZW50YXIpXG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgRmFybSBCb3RcIixcbiAgICBzdGFydDogXCJJbmljaWFyXCIsXG4gICAgc3RvcDogXCJEZXRlbmVyXCIsIFxuICAgIHN0b3BwZWQ6IFwiQm90IGRldGVuaWRvXCIsXG4gICAgY2FsaWJyYXRlOiBcIkNhbGlicmFyXCIsXG4gICAgcGFpbnRPbmNlOiBcIlVuYSB2ZXpcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJWZXJpZmljYW5kbyBlc3RhZG8uLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIkNvbmZpZ3VyYWNpXHUwMEYzblwiLFxuICAgIGRlbGF5OiBcIkRlbGF5IChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQXHUwMEVEeGVsZXMvbG90ZVwiLFxuICAgIG1pbkNoYXJnZXM6IFwiQ2FyZ2FzIG1cdTAwRURuXCIsXG4gICAgY29sb3JNb2RlOiBcIk1vZG8gY29sb3JcIixcbiAgICByYW5kb206IFwiQWxlYXRvcmlvXCIsXG4gICAgZml4ZWQ6IFwiRmlqb1wiLFxuICAgIHJhbmdlOiBcIlJhbmdvXCIsXG4gICAgZml4ZWRDb2xvcjogXCJDb2xvciBmaWpvXCIsXG4gICAgYWR2YW5jZWQ6IFwiQXZhbnphZG9cIixcbiAgICB0aWxlWDogXCJUaWxlIFhcIixcbiAgICB0aWxlWTogXCJUaWxlIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlBhbGV0YSBwZXJzb25hbGl6YWRhXCIsXG4gICAgcGFsZXR0ZUV4YW1wbGU6IFwiZWo6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJhclwiLFxuICAgIHBhaW50ZWQ6IFwiUGludGFkb3NcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIHJldHJpZXM6IFwiRmFsbG9zXCIsXG4gICAgdGlsZTogXCJUaWxlXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiQ29uZmlndXJhY2lcdTAwRjNuIGd1YXJkYWRhXCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIkNvbmZpZ3VyYWNpXHUwMEYzbiBjYXJnYWRhXCIsXG4gICAgY29uZmlnUmVzZXQ6IFwiQ29uZmlndXJhY2lcdTAwRjNuIHJlaW5pY2lhZGFcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBpbnRhIHVuIHBcdTAwRUR4ZWwgbWFudWFsbWVudGUgcGFyYSBjYXB0dXJhciBjb29yZGVuYWRhcy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiQmFja2VuZCBPbmxpbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIE9mZmxpbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJJbmljaWFuZG8gYm90Li4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiRGV0ZW5pZW5kbyBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhbmRvLi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiQXV0by1GYXJtIHlhIGVzdFx1MDBFMSBjb3JyaWVuZG8uXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGVzdFx1MDBFMSBlamVjdXRcdTAwRTFuZG9zZS4gQ2lcdTAwRTlycmFsbyBhbnRlcyBkZSBpbmljaWFyIEF1dG8tRmFybS5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTZWxlY2Npb25hciBab25hXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGludGEgdW4gcFx1MDBFRHhlbCBlbiB1bmEgem9uYSBERVNQT0JMQURBIGRlbCBtYXBhIHBhcmEgZXN0YWJsZWNlciBlbCBcdTAwRTFyZWEgZGUgZmFybWluZ1wiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRXNwZXJhbmRvIHF1ZSBwaW50ZXMgZWwgcFx1MDBFRHhlbCBkZSByZWZlcmVuY2lhLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1MDBBMVpvbmEgZXN0YWJsZWNpZGEhIFJhZGlvOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2Npb25hciB6b25hXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTZWxlY2Npb25hIHVuYSB6b25hIHByaW1lcm8gdXNhbmRvICdTZWxlY2Npb25hciBab25hJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiUmFkaW8gZmFybVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJab25hIGFjdHVhbFwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgRmFybWluZyBlbiByYWRpbyB7cmFkaXVzfXB4IGRlc2RlICh7eH0se3l9KVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgSU1QT1JUQU5URTogU2VsZWNjaW9uYSB1bmEgem9uYSBERVNQT0JMQURBIHBhcmEgZXZpdGFyIGNvbmZsaWN0b3NcIixcbiAgICBub1Bvc2l0aW9uOiBcIlNpbiB6b25hXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uYTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTZWxlY2Npb25hIHVuYSB6b25hIHByaW1lcm8uIFBpbnRhIHVuIHBcdTAwRUR4ZWwgZW4gZWwgbWFwYSBwYXJhIGVzdGFibGVjZXIgbGEgem9uYSBkZSBmYXJtaW5nXCJcbiAgfSxcblxuICAvLyBDb21tb24vU2hhcmVkXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJTXHUwMEVEXCIsXG4gICAgbm86IFwiTm9cIixcbiAgICBvazogXCJBY2VwdGFyXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbGFyXCIsXG4gICAgY2xvc2U6IFwiQ2VycmFyXCIsXG4gICAgc2F2ZTogXCJHdWFyZGFyXCIsXG4gICAgbG9hZDogXCJDYXJnYXJcIixcbiAgICBkZWxldGU6IFwiRWxpbWluYXJcIixcbiAgICBlZGl0OiBcIkVkaXRhclwiLFxuICAgIHN0YXJ0OiBcIkluaWNpYXJcIixcbiAgICBzdG9wOiBcIkRldGVuZXJcIixcbiAgICBwYXVzZTogXCJQYXVzYXJcIixcbiAgICByZXN1bWU6IFwiUmVhbnVkYXJcIixcbiAgICByZXNldDogXCJSZWluaWNpYXJcIixcbiAgICBzZXR0aW5nczogXCJDb25maWd1cmFjaVx1MDBGM25cIixcbiAgICBoZWxwOiBcIkF5dWRhXCIsXG4gICAgYWJvdXQ6IFwiQWNlcmNhIGRlXCIsXG4gICAgbGFuZ3VhZ2U6IFwiSWRpb21hXCIsXG4gICAgbG9hZGluZzogXCJDYXJnYW5kby4uLlwiLFxuICAgIGVycm9yOiBcIkVycm9yXCIsXG4gICAgc3VjY2VzczogXCJcdTAwQzl4aXRvXCIsXG4gICAgd2FybmluZzogXCJBZHZlcnRlbmNpYVwiLFxuICAgIGluZm86IFwiSW5mb3JtYWNpXHUwMEYzblwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJJZGlvbWEgY2FtYmlhZG8gYSB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pY2lhbGl6YXIgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJTZWxlY2Npb25hciBcdTAwQzFyZWFcIixcbiAgICBjYXB0dXJlQXJlYTogXCJDYXB0dXJhciBcdTAwQzFyZWFcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiSW5pY2lhciBQcm90ZWNjaVx1MDBGM25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJEZXRlbmVyIFByb3RlY2NpXHUwMEYzblwiLFxuICAgIHVwcGVyTGVmdDogXCJFc3F1aW5hIFN1cGVyaW9yIEl6cXVpZXJkYVwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiRXNxdWluYSBJbmZlcmlvciBEZXJlY2hhXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlBcdTAwRUR4ZWxlcyBQcm90ZWdpZG9zXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkNhbWJpb3MgRGV0ZWN0YWRvc1wiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlBcdTAwRUR4ZWxlcyBSZXBhcmFkb3NcIixcbiAgICBjaGFyZ2VzOiBcIkNhcmdhc1wiLFxuICAgIHdhaXRpbmdJbml0OiBcIkVzcGVyYW5kbyBpbmljaWFsaXphY2lcdTAwRjNuLi4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFZlcmlmaWNhbmRvIGNvbG9yZXMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBObyBzZSBlbmNvbnRyYXJvbiBjb2xvcmVzLiBBYnJlIGxhIHBhbGV0YSBkZSBjb2xvcmVzIGVuIGVsIHNpdGlvLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSB7Y291bnR9IGNvbG9yZXMgZGlzcG9uaWJsZXMgZW5jb250cmFkb3NcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaWNpYWxpemFkbyBjb3JyZWN0YW1lbnRlXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBFcnJvciBpbmljaWFsaXphbmRvIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIENvb3JkZW5hZGFzIGludlx1MDBFMWxpZGFzXCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIEVsIFx1MDBFMXJlYSBkZWJlIHRlbmVyIGVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhIG1lbm9yIHF1ZSBpbmZlcmlvciBkZXJlY2hhXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTAwQzFyZWEgZGVtYXNpYWRvIGdyYW5kZToge3NpemV9IHBcdTAwRUR4ZWxlcyAobVx1MDBFMXhpbW86IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmFuZG8gXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzbi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHUwMEMxcmVhIGNhcHR1cmFkYToge2NvdW50fSBwXHUwMEVEeGVsZXMgYmFqbyBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGNhcHR1cmFuZG8gXHUwMEUxcmVhOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBQcmltZXJvIGNhcHR1cmEgdW4gXHUwMEUxcmVhIGRlIHByb3RlY2NpXHUwMEYzblwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gaW5pY2lhZGEgLSBtb25pdG9yZWFuZG8gXHUwMEUxcmVhXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFByb3RlY2NpXHUwMEYzbiBkZXRlbmlkYVwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHUwMEMxcmVhIHByb3RlZ2lkYSAtIHNpbiBjYW1iaW9zIGRldGVjdGFkb3NcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2FtYmlvcyBkZXRlY3RhZG9zIGVuIGVsIFx1MDBFMXJlYSBwcm90ZWdpZGFcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFJlcGFyYW5kbyB7Y291bnR9IHBcdTAwRUR4ZWxlcyBhbHRlcmFkb3MuLi5cIixcbiAgICByZXBhaXJlZFN1Y2Nlc3M6IFwiXHUyNzA1IFJlcGFyYWRvcyB7Y291bnR9IHBcdTAwRUR4ZWxlcyBjb3JyZWN0YW1lbnRlXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIEVycm9yIHJlcGFyYW5kbyBwXHUwMEVEeGVsZXM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIFNpbiBjYXJnYXMgc3VmaWNpZW50ZXMgcGFyYSByZXBhcmFyIGNhbWJpb3NcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFZlcmlmaWNhbmRvIGNhbWJpb3MgZW4gXHUwMEUxcmVhIHByb3RlZ2lkYS4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIEVycm9yIHZlcmlmaWNhbmRvIGNhbWJpb3M6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR3VhcmRpXHUwMEUxbiBhY3Rpdm8gLSBcdTAwRTFyZWEgYmFqbyBwcm90ZWNjaVx1MDBGM25cIixcbiAgICBsYXN0Q2hlY2s6IFwiXHUwMERBbHRpbWEgdmVyaWZpY2FjaVx1MDBGM246IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJQclx1MDBGM3hpbWEgdmVyaWZpY2FjaVx1MDBGM24gZW46IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbmljaWFsaXphbmRvIGF1dG9tXHUwMEUxdGljYW1lbnRlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgaW5pY2lhZG8gYXV0b21cdTAwRTF0aWNhbWVudGVcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgTm8gc2UgcHVkbyBpbmljaWFyIGF1dG9tXHUwMEUxdGljYW1lbnRlLiBVc2EgZWwgYm90XHUwMEYzbiBtYW51YWwuXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbmljaW8gbWFudWFsIHJlcXVlcmlkb1wiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXRhIGRlIGNvbG9yZXMgZGV0ZWN0YWRhXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBCdXNjYW5kbyBwYWxldGEgZGUgY29sb3Jlcy4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IEhhY2llbmRvIGNsaWMgZW4gZWwgYm90XHUwMEYzbiBQYWludC4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkb1wiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgUGludGEgdW4gcFx1MDBFRHhlbCBlbiBsYSBlc3F1aW5hIFNVUEVSSU9SIElaUVVJRVJEQSBkZWwgXHUwMEUxcmVhIGEgcHJvdGVnZXJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBBaG9yYSBwaW50YSB1biBwXHUwMEVEeGVsIGVuIGxhIGVzcXVpbmEgSU5GRVJJT1IgREVSRUNIQSBkZWwgXHUwMEUxcmVhXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgRXNwZXJhbmRvIHNlbGVjY2lcdTAwRjNuIGRlIGVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IEVzcGVyYW5kbyBzZWxlY2NpXHUwMEYzbiBkZSBlc3F1aW5hIGluZmVyaW9yIGRlcmVjaGEuLi5cIixcbiAgICB1cHBlckxlZnRDYXB0dXJlZDogXCJcdTI3MDUgRXNxdWluYSBzdXBlcmlvciBpenF1aWVyZGEgY2FwdHVyYWRhOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBFc3F1aW5hIGluZmVyaW9yIGRlcmVjaGEgY2FwdHVyYWRhOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgVGllbXBvIGFnb3RhZG8gcGFyYSBzZWxlY2NpXHUwMEYzblwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJvciBlbiBzZWxlY2NpXHUwMEYzbiwgaW50XHUwMEU5bnRhbG8gZGUgbnVldm9cIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCBlbiA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU2VsZWN0aW9uJyxcbiAgICB1c2VyOiAnVXNlcicsXG4gICAgY2hhcmdlczogJ0NoYXJnZXMnLFxuICAgIGJhY2tlbmQ6ICdCYWNrZW5kJyxcbiAgICBkYXRhYmFzZTogJ0RhdGFiYXNlJyxcbiAgICB1cHRpbWU6ICdVcHRpbWUnLFxuICAgIGNsb3NlOiAnQ2xvc2UnLFxuICAgIGxhdW5jaDogJ0xhdW5jaCcsXG4gICAgbG9hZGluZzogJ0xvYWRpbmdcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0V4ZWN1dGluZ1x1MjAyNicsXG4gICAgZG93bmxvYWRpbmc6ICdEb3dubG9hZGluZyBzY3JpcHRcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ0Nob29zZSBhIGJvdCBhbmQgcHJlc3MgTGF1bmNoJyxcbiAgICByZWFkeVRvTGF1bmNoOiAnUmVhZHkgdG8gbGF1bmNoJyxcbiAgICBsb2FkRXJyb3I6ICdMb2FkIGVycm9yJyxcbiAgICBsb2FkRXJyb3JNc2c6ICdDb3VsZCBub3QgbG9hZCB0aGUgc2VsZWN0ZWQgYm90LiBDaGVjayB5b3VyIGNvbm5lY3Rpb24gb3IgdHJ5IGFnYWluLicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgQ2hlY2tpbmcuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBPbmxpbmUnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgT2ZmbGluZScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgT0snLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IEVycm9yJyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGl6ZSBBdXRvLUJPVFwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlVwbG9hZCBJbWFnZVwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlJlc2l6ZSBJbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNlbGVjdCBQb3NpdGlvblwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiU3RhcnQgUGFpbnRpbmdcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiU3RvcCBQYWludGluZ1wiLFxuICAgIHNhdmVQcm9ncmVzczogXCJTYXZlIFByb2dyZXNzXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIkxvYWQgUHJvZ3Jlc3NcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgQ2hlY2tpbmcgYXZhaWxhYmxlIGNvbG9ycy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIE9wZW4gdGhlIGNvbG9yIHBhbGV0dGUgb24gdGhlIHNpdGUgYW5kIHRyeSBhZ2FpbiFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgRm91bmQge2NvdW50fSBhdmFpbGFibGUgY29sb3JzXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBMb2FkaW5nIGltYWdlLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IEltYWdlIGxvYWRlZCB3aXRoIHtjb3VudH0gdmFsaWQgcGl4ZWxzXCIsXG4gICAgaW1hZ2VFcnJvcjogXCJcdTI3NEMgRXJyb3IgbG9hZGluZyBpbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiUGFpbnQgdGhlIGZpcnN0IHBpeGVsIGF0IHRoZSBsb2NhdGlvbiB3aGVyZSB5b3Ugd2FudCB0aGUgYXJ0IHRvIHN0YXJ0IVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgeW91IHRvIHBhaW50IHRoZSByZWZlcmVuY2UgcGl4ZWwuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgUG9zaXRpb24gc2V0IHN1Y2Nlc3NmdWxseSFcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpbWVvdXQgZm9yIHBvc2l0aW9uIHNlbGVjdGlvblwiLFxuICAgIHBvc2l0aW9uRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkFGIFBvc2l0aW9uIGRldGVjdGVkLCBwcm9jZXNzaW5nLi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyb3IgZGV0ZWN0aW5nIHBvc2l0aW9uLCBwbGVhc2UgdHJ5IGFnYWluXCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggU3RhcnRpbmcgcGFpbnRpbmcuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBQcm9ncmVzczoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBObyBjaGFyZ2VzLiBXYWl0aW5nIHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgUGFpbnRpbmcgc3RvcHBlZCBieSB1c2VyXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgUGFpbnRpbmcgY29tcGxldGVkISB7Y291bnR9IHBpeGVscyBwYWludGVkLlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIEVycm9yIGR1cmluZyBwYWludGluZ1wiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIExvYWQgYW4gaW1hZ2UgYW5kIHNlbGVjdCBhIHBvc2l0aW9uIGZpcnN0XCIsXG4gICAgcHJvZ3Jlc3M6IFwiUHJvZ3Jlc3NcIixcbiAgICB1c2VyTmFtZTogXCJVc2VyXCIsXG4gICAgcGl4ZWxzOiBcIlBpeGVsc1wiLFxuICAgIGNoYXJnZXM6IFwiQ2hhcmdlc1wiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiRXN0aW1hdGVkIHRpbWVcIixcbiAgICBpbml0TWVzc2FnZTogXCJDbGljayAnSW5pdGlhbGl6ZSBBdXRvLUJPVCcgdG8gYmVnaW5cIixcbiAgICB3YWl0aW5nSW5pdDogXCJXYWl0aW5nIGZvciBpbml0aWFsaXphdGlvbi4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IEltYWdlIHJlc2l6ZWQgdG8ge3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBQYWludGluZyBwYXVzZWQgYXQgcG9zaXRpb24gWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMgcGVyIGJhdGNoXCIsXG4gICAgYmF0Y2hTaXplOiBcIkJhdGNoIHNpemVcIixcbiAgICBuZXh0QmF0Y2hUaW1lOiBcIk5leHQgYmF0Y2ggaW5cIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlVzZSBhbGwgYXZhaWxhYmxlIGNoYXJnZXNcIixcbiAgICBzaG93T3ZlcmxheTogXCJTaG93IG92ZXJsYXlcIixcbiAgICBtYXhDaGFyZ2VzOiBcIk1heCBjaGFyZ2VzIHBlciBiYXRjaFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlRpbWUgcmVtYWluaW5nXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBXYWl0aW5nIHt0aW1lfSB0byBjb250aW51ZS4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFByb2dyZXNzIHNhdmVkIGFzIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3Jlc3MgbG9hZGVkOiB7cGFpbnRlZH0ve3RvdGFsfSBwaXhlbHMgcGFpbnRlZFwiLFxuICAgIHByb2dyZXNzTG9hZEVycm9yOiBcIlx1Mjc0QyBFcnJvciBsb2FkaW5nIHByb2dyZXNzOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycm9yIHNhdmluZyBwcm9ncmVzczoge2Vycm9yfVwiLFxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiRG8geW91IHdhbnQgdG8gc2F2ZSB0aGUgY3VycmVudCBwcm9ncmVzcyBiZWZvcmUgc3RvcHBpbmc/XCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiU2F2ZSBQcm9ncmVzc1wiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJEaXNjYXJkXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbFwiLFxuICAgIG1pbmltaXplOiBcIk1pbmltaXplXCIsXG4gICAgd2lkdGg6IFwiV2lkdGhcIixcbiAgICBoZWlnaHQ6IFwiSGVpZ2h0XCIsIFxuICAgIGtlZXBBc3BlY3Q6IFwiS2VlcCBhc3BlY3QgcmF0aW9cIixcbiAgICBhcHBseTogXCJBcHBseVwiLFxuICBvdmVybGF5T246IFwiT3ZlcmxheTogT05cIixcbiAgb3ZlcmxheU9mZjogXCJPdmVybGF5OiBPRkZcIixcbiAgICBwYXNzQ29tcGxldGVkOiBcIlx1MjcwNSBQYXNzIGNvbXBsZXRlZDoge3BhaW50ZWR9IHBpeGVscyBwYWludGVkIHwgUHJvZ3Jlc3M6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFdhaXRpbmcgZm9yIGNoYXJnZSByZWdlbmVyYXRpb246IHtjdXJyZW50fS97bmVlZGVkfSAtIFRpbWU6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBXYWl0aW5nIGZvciBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBSZW1haW5pbmc6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEF1dG8taW5pdGlhbGl6aW5nLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBCb3QgYXV0by1zdGFydGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBDb3VsZCBub3QgYXV0by1zdGFydC4gVXNlIG1hbnVhbCBidXR0b24uXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBDb2xvciBwYWxldHRlIGRldGVjdGVkXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBTZWFyY2hpbmcgZm9yIGNvbG9yIHBhbGV0dGUuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGlja2luZyBQYWludCBidXR0b24uLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBQYWludCBidXR0b24gbm90IGZvdW5kXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBNYW51YWwgaW5pdGlhbGl6YXRpb24gcmVxdWlyZWRcIixcbiAgICByZXRyeUF0dGVtcHQ6IFwiXHVEODNEXHVERDA0IFJldHJ5IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IGluIHtkZWxheX1zLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgRXJyb3IgaW4gYXR0ZW1wdCB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgcmV0cnlpbmcgaW4ge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgRmFpbGVkIGFmdGVyIHttYXhBdHRlbXB0c30gYXR0ZW1wdHMuIENvbnRpbnVpbmcgd2l0aCBuZXh0IGJhdGNoLi4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBOZXR3b3JrIGVycm9yLiBSZXRyeWluZy4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBTZXJ2ZXIgZXJyb3IuIFJldHJ5aW5nLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBTZXJ2ZXIgdGltZW91dC4gUmV0cnlpbmcuLi5cIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBGYXJtIEJvdFwiLFxuICAgIHN0YXJ0OiBcIlN0YXJ0XCIsXG4gICAgc3RvcDogXCJTdG9wXCIsXG4gICAgc3RvcHBlZDogXCJCb3Qgc3RvcHBlZFwiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJhdGVcIixcbiAgICBwYWludE9uY2U6IFwiT25jZVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIkNoZWNraW5nIHN0YXR1cy4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiQ29uZmlndXJhdGlvblwiLFxuICAgIGRlbGF5OiBcIkRlbGF5IChtcylcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJQaXhlbHMvYmF0Y2hcIixcbiAgICBtaW5DaGFyZ2VzOiBcIk1pbiBjaGFyZ2VzXCIsXG4gICAgY29sb3JNb2RlOiBcIkNvbG9yIG1vZGVcIixcbiAgICByYW5kb206IFwiUmFuZG9tXCIsXG4gICAgZml4ZWQ6IFwiRml4ZWRcIixcbiAgICByYW5nZTogXCJSYW5nZVwiLFxuICAgIGZpeGVkQ29sb3I6IFwiRml4ZWQgY29sb3JcIixcbiAgICBhZHZhbmNlZDogXCJBZHZhbmNlZFwiLFxuICAgIHRpbGVYOiBcIlRpbGUgWFwiLFxuICAgIHRpbGVZOiBcIlRpbGUgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiQ3VzdG9tIHBhbGV0dGVcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJlLmc6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJDYXB0dXJlXCIsXG4gICAgcGFpbnRlZDogXCJQYWludGVkXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgcmV0cmllczogXCJSZXRyaWVzXCIsXG4gICAgdGlsZTogXCJUaWxlXCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiQ29uZmlndXJhdGlvbiBzYXZlZFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmF0aW9uIGxvYWRlZFwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYXRpb24gcmVzZXRcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBhaW50IGEgcGl4ZWwgbWFudWFsbHkgdG8gY2FwdHVyZSBjb29yZGluYXRlcy4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiQmFja2VuZCBPbmxpbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIE9mZmxpbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJTdGFydGluZyBib3QuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJTdG9wcGluZyBib3QuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJDYWxpYnJhdGluZy4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSBpcyBhbHJlYWR5IHJ1bm5pbmcuXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJBdXRvLUltYWdlIGlzIHJ1bm5pbmcuIENsb3NlIGl0IGJlZm9yZSBzdGFydGluZyBBdXRvLUZhcm0uXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiU2VsZWN0IEFyZWFcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBQYWludCBhIHBpeGVsIGluIGFuIEVNUFRZIGFyZWEgb2YgdGhlIG1hcCB0byBzZXQgdGhlIGZhcm1pbmcgem9uZVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgV2FpdGluZyBmb3IgeW91IHRvIHBhaW50IHRoZSByZWZlcmVuY2UgcGl4ZWwuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgQXJlYSBzZXQhIFJhZGl1czogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFRpbWVvdXQgZm9yIGFyZWEgc2VsZWN0aW9uXCIsXG4gICAgbWlzc2luZ1Bvc2l0aW9uOiBcIlx1Mjc0QyBTZWxlY3QgYW4gYXJlYSBmaXJzdCB1c2luZyAnU2VsZWN0IEFyZWEnXCIsXG4gICAgZmFybVJhZGl1czogXCJGYXJtIHJhZGl1c1wiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJDdXJyZW50IGFyZWFcIixcbiAgICBmYXJtaW5nSW5SYWRpdXM6IFwiXHVEODNDXHVERjNFIEZhcm1pbmcgaW4ge3JhZGl1c31weCByYWRpdXMgZnJvbSAoe3h9LHt5fSlcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIElNUE9SVEFOVDogU2VsZWN0IGFuIEVNUFRZIGFyZWEgdG8gYXZvaWQgY29uZmxpY3RzXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJObyBhcmVhXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uZTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTZWxlY3QgYW4gYXJlYSBmaXJzdC4gUGFpbnQgYSBwaXhlbCBvbiB0aGUgbWFwIHRvIHNldCB0aGUgZmFybWluZyB6b25lXCJcbiAgfSxcblxuICAvLyBDb21tb24vU2hhcmVkXG4gIGNvbW1vbjoge1xuICAgIHllczogXCJZZXNcIixcbiAgICBubzogXCJOb1wiLFxuICAgIG9rOiBcIk9LXCIsXG4gICAgY2FuY2VsOiBcIkNhbmNlbFwiLFxuICAgIGNsb3NlOiBcIkNsb3NlXCIsXG4gICAgc2F2ZTogXCJTYXZlXCIsXG4gICAgbG9hZDogXCJMb2FkXCIsXG4gICAgZGVsZXRlOiBcIkRlbGV0ZVwiLFxuICAgIGVkaXQ6IFwiRWRpdFwiLFxuICAgIHN0YXJ0OiBcIlN0YXJ0XCIsXG4gICAgc3RvcDogXCJTdG9wXCIsXG4gICAgcGF1c2U6IFwiUGF1c2VcIixcbiAgICByZXN1bWU6IFwiUmVzdW1lXCIsXG4gICAgcmVzZXQ6IFwiUmVzZXRcIixcbiAgICBzZXR0aW5nczogXCJTZXR0aW5nc1wiLFxuICAgIGhlbHA6IFwiSGVscFwiLFxuICAgIGFib3V0OiBcIkFib3V0XCIsXG4gICAgbGFuZ3VhZ2U6IFwiTGFuZ3VhZ2VcIixcbiAgICBsb2FkaW5nOiBcIkxvYWRpbmcuLi5cIixcbiAgICBlcnJvcjogXCJFcnJvclwiLFxuICAgIHN1Y2Nlc3M6IFwiU3VjY2Vzc1wiLFxuICAgIHdhcm5pbmc6IFwiV2FybmluZ1wiLFxuICAgIGluZm86IFwiSW5mb3JtYXRpb25cIixcbiAgICBsYW5ndWFnZUNoYW5nZWQ6IFwiTGFuZ3VhZ2UgY2hhbmdlZCB0byB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBHdWFyZCBNb2R1bGVcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1HdWFyZFwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGl6ZSBHdWFyZC1CT1RcIixcbiAgICBzZWxlY3RBcmVhOiBcIlNlbGVjdCBBcmVhXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiQ2FwdHVyZSBBcmVhXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIlN0YXJ0IFByb3RlY3Rpb25cIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJTdG9wIFByb3RlY3Rpb25cIixcbiAgICB1cHBlckxlZnQ6IFwiVXBwZXIgTGVmdCBDb3JuZXJcIixcbiAgICBsb3dlclJpZ2h0OiBcIkxvd2VyIFJpZ2h0IENvcm5lclwiLFxuICAgIHByb3RlY3RlZFBpeGVsczogXCJQcm90ZWN0ZWQgUGl4ZWxzXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIkRldGVjdGVkIENoYW5nZXNcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJSZXBhaXJlZCBQaXhlbHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICB3YWl0aW5nSW5pdDogXCJXYWl0aW5nIGZvciBpbml0aWFsaXphdGlvbi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBDaGVja2luZyBhdmFpbGFibGUgY29sb3JzLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgTm8gY29sb3JzIGZvdW5kLiBPcGVuIHRoZSBjb2xvciBwYWxldHRlIG9uIHRoZSBzaXRlLlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBGb3VuZCB7Y291bnR9IGF2YWlsYWJsZSBjb2xvcnNcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgRXJyb3IgaW5pdGlhbGl6aW5nIEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIEludmFsaWQgY29vcmRpbmF0ZXNcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgQXJlYSBtdXN0IGhhdmUgdXBwZXIgbGVmdCBjb3JuZXIgbGVzcyB0aGFuIGxvd2VyIHJpZ2h0IGNvcm5lclwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgQXJlYSB0b28gbGFyZ2U6IHtzaXplfSBwaXhlbHMgKG1heGltdW06IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmluZyBwcm90ZWN0aW9uIGFyZWEuLi5cIixcbiAgICBhcmVhQ2FwdHVyZWQ6IFwiXHUyNzA1IEFyZWEgY2FwdHVyZWQ6IHtjb3VudH0gcGl4ZWxzIHVuZGVyIHByb3RlY3Rpb25cIixcbiAgICBjYXB0dXJlRXJyb3I6IFwiXHUyNzRDIEVycm9yIGNhcHR1cmluZyBhcmVhOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBGaXJzdCBjYXB0dXJlIGEgcHJvdGVjdGlvbiBhcmVhXCIsXG4gICAgcHJvdGVjdGlvblN0YXJ0ZWQ6IFwiXHVEODNEXHVERUUxXHVGRTBGIFByb3RlY3Rpb24gc3RhcnRlZCAtIG1vbml0b3JpbmcgYXJlYVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWN0aW9uIHN0b3BwZWRcIixcbiAgICBub0NoYW5nZXM6IFwiXHUyNzA1IFByb3RlY3RlZCBhcmVhIC0gbm8gY2hhbmdlcyBkZXRlY3RlZFwiLFxuICAgIGNoYW5nZXNEZXRlY3RlZDogXCJcdUQ4M0RcdURFQTgge2NvdW50fSBjaGFuZ2VzIGRldGVjdGVkIGluIHByb3RlY3RlZCBhcmVhXCIsXG4gICAgcmVwYWlyaW5nOiBcIlx1RDgzRFx1REVFMFx1RkUwRiBSZXBhaXJpbmcge2NvdW50fSBhbHRlcmVkIHBpeGVscy4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgU3VjY2Vzc2Z1bGx5IHJlcGFpcmVkIHtjb3VudH0gcGl4ZWxzXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIEVycm9yIHJlcGFpcmluZyBwaXhlbHM6IHtlcnJvcn1cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyNkEwXHVGRTBGIEluc3VmZmljaWVudCBjaGFyZ2VzIHRvIHJlcGFpciBjaGFuZ2VzXCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBDaGVja2luZyBjaGFuZ2VzIGluIHByb3RlY3RlZCBhcmVhLi4uXCIsXG4gICAgZXJyb3JDaGVja2luZzogXCJcdTI3NEMgRXJyb3IgY2hlY2tpbmcgY2hhbmdlczoge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBHdWFyZGlhbiBhY3RpdmUgLSBhcmVhIHVuZGVyIHByb3RlY3Rpb25cIixcbiAgICBsYXN0Q2hlY2s6IFwiTGFzdCBjaGVjazoge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIk5leHQgY2hlY2sgaW46IHt0aW1lfXNcIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBBdXRvLWluaXRpYWxpemluZy4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgR3VhcmQtQk9UIGF1dG8tc3RhcnRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgQ291bGQgbm90IGF1dG8tc3RhcnQuIFVzZSBtYW51YWwgYnV0dG9uLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgTWFudWFsIGluaXRpYWxpemF0aW9uIHJlcXVpcmVkXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBDb2xvciBwYWxldHRlIGRldGVjdGVkXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBTZWFyY2hpbmcgZm9yIGNvbG9yIHBhbGV0dGUuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGlja2luZyBQYWludCBidXR0b24uLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBQYWludCBidXR0b24gbm90IGZvdW5kXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBQYWludCBhIHBpeGVsIGF0IHRoZSBVUFBFUiBMRUZUIGNvcm5lciBvZiB0aGUgYXJlYSB0byBwcm90ZWN0XCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgTm93IHBhaW50IGEgcGl4ZWwgYXQgdGhlIExPV0VSIFJJR0hUIGNvcm5lciBvZiB0aGUgYXJlYVwiLFxuICAgIHdhaXRpbmdVcHBlckxlZnQ6IFwiXHVEODNEXHVEQzQ2IFdhaXRpbmcgZm9yIHVwcGVyIGxlZnQgY29ybmVyIHNlbGVjdGlvbi4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBXYWl0aW5nIGZvciBsb3dlciByaWdodCBjb3JuZXIgc2VsZWN0aW9uLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFVwcGVyIGxlZnQgY29ybmVyIGNhcHR1cmVkOiAoe3h9LCB7eX0pXCIsXG4gICAgbG93ZXJSaWdodENhcHR1cmVkOiBcIlx1MjcwNSBMb3dlciByaWdodCBjb3JuZXIgY2FwdHVyZWQ6ICh7eH0sIHt5fSlcIixcbiAgICBzZWxlY3Rpb25UaW1lb3V0OiBcIlx1Mjc0QyBTZWxlY3Rpb24gdGltZW91dFwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBTZWxlY3Rpb24gZXJyb3IsIHBsZWFzZSB0cnkgYWdhaW5cIlxuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCBmciA9IHtcbiAgLy8gTGF1bmNoZXJcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBBdXRvQk9UJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBBdXRvLUZhcm0nLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBBdXRvLUltYWdlJyxcbiAgICBhdXRvR3VhcmQ6ICdcdUQ4M0RcdURFRTFcdUZFMEYgQXV0by1HdWFyZCcsXG4gICAgc2VsZWN0aW9uOiAnU1x1MDBFOWxlY3Rpb24nLFxuICAgIHVzZXI6ICdVdGlsaXNhdGV1cicsXG4gICAgY2hhcmdlczogJ0NoYXJnZXMnLFxuICAgIGJhY2tlbmQ6ICdCYWNrZW5kJyxcbiAgICBkYXRhYmFzZTogJ0Jhc2UgZGUgZG9ublx1MDBFOWVzJyxcbiAgICB1cHRpbWU6ICdUZW1wcyBhY3RpZicsXG4gICAgY2xvc2U6ICdGZXJtZXInLFxuICAgIGxhdW5jaDogJ0xhbmNlcicsXG4gICAgbG9hZGluZzogJ0NoYXJnZW1lbnRcdTIwMjYnLFxuICAgIGV4ZWN1dGluZzogJ0V4XHUwMEU5Y3V0aW9uXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1RcdTAwRTlsXHUwMEU5Y2hhcmdlbWVudCBkdSBzY3JpcHRcdTIwMjYnLFxuICAgIGNob29zZUJvdDogJ0Nob2lzaXNzZXogdW4gYm90IGV0IGFwcHV5ZXogc3VyIExhbmNlcicsXG4gICAgcmVhZHlUb0xhdW5jaDogJ1ByXHUwMEVBdCBcdTAwRTAgbGFuY2VyJyxcbiAgICBsb2FkRXJyb3I6ICdFcnJldXIgZGUgY2hhcmdlbWVudCcsXG4gICAgbG9hZEVycm9yTXNnOiAnSW1wb3NzaWJsZSBkZSBjaGFyZ2VyIGxlIGJvdCBzXHUwMEU5bGVjdGlvbm5cdTAwRTkuIFZcdTAwRTlyaWZpZXogdm90cmUgY29ubmV4aW9uIG91IHJcdTAwRTllc3NheWV6LicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgVlx1MDBFOXJpZmljYXRpb24uLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBFbiBsaWduZScsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBIb3JzIGxpZ25lJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBPSycsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgRXJyZXVyJyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgQXV0by1JbWFnZVwiLFxuICAgIGluaXRCb3Q6IFwiSW5pdGlhbGlzZXIgQXV0by1CT1RcIixcbiAgICB1cGxvYWRJbWFnZTogXCJUXHUwMEU5bFx1MDBFOWNoYXJnZXIgSW1hZ2VcIixcbiAgICByZXNpemVJbWFnZTogXCJSZWRpbWVuc2lvbm5lciBJbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlNcdTAwRTlsZWN0aW9ubmVyIFBvc2l0aW9uXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJDb21tZW5jZXIgUGVpbnR1cmVcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiQXJyXHUwMEVBdGVyIFBlaW50dXJlXCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlNhdXZlZ2FyZGVyIFByb2dyXHUwMEU4c1wiLFxuICAgIGxvYWRQcm9ncmVzczogXCJDaGFyZ2VyIFByb2dyXHUwMEU4c1wiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzRFx1REQwRCBWXHUwMEU5cmlmaWNhdGlvbiBkZXMgY291bGV1cnMgZGlzcG9uaWJsZXMuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBPdXZyZXogbGEgcGFsZXR0ZSBkZSBjb3VsZXVycyBzdXIgbGUgc2l0ZSBldCByXHUwMEU5ZXNzYXlleiFcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUge2NvdW50fSBjb3VsZXVycyBkaXNwb25pYmxlcyB0cm91dlx1MDBFOWVzXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBDaGFyZ2VtZW50IGRlIGwnaW1hZ2UuLi5cIixcbiAgICBpbWFnZUxvYWRlZDogXCJcdTI3MDUgSW1hZ2UgY2hhcmdcdTAwRTllIGF2ZWMge2NvdW50fSBwaXhlbHMgdmFsaWRlc1wiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGUgbCdpbWFnZVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiUGVpZ25leiBsZSBwcmVtaWVyIHBpeGVsIFx1MDBFMCBsJ2VtcGxhY2VtZW50IG9cdTAwRjkgdm91cyB2b3VsZXogcXVlIGwnYXJ0IGNvbW1lbmNlIVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgRW4gYXR0ZW50ZSBxdWUgdm91cyBwZWlnbmlleiBsZSBwaXhlbCBkZSByXHUwMEU5Zlx1MDBFOXJlbmNlLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFBvc2l0aW9uIGRcdTAwRTlmaW5pZSBhdmVjIHN1Y2NcdTAwRThzIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkXHUwMEU5cGFzc1x1MDBFOSBwb3VyIGxhIHNcdTAwRTlsZWN0aW9uIGRlIHBvc2l0aW9uXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgUG9zaXRpb24gZFx1MDBFOXRlY3RcdTAwRTllLCB0cmFpdGVtZW50Li4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgRXJyZXVyIGRcdTAwRTl0ZWN0YW50IGxhIHBvc2l0aW9uLCBlc3NheWV6IFx1MDBFMCBub3V2ZWF1XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggRFx1MDBFOWJ1dCBkZSBsYSBwZWludHVyZS4uLlwiLFxuICAgIHBhaW50aW5nUHJvZ3Jlc3M6IFwiXHVEODNFXHVEREYxIFByb2dyXHUwMEU4czoge3BhaW50ZWR9L3t0b3RhbH0gcGl4ZWxzLi4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBBdWN1bmUgY2hhcmdlLiBBdHRlbmRyZSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFBlaW50dXJlIGFyclx1MDBFQXRcdTAwRTllIHBhciBsJ3V0aWxpc2F0ZXVyXCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgUGVpbnR1cmUgdGVybWluXHUwMEU5ZSEge2NvdW50fSBwaXhlbHMgcGVpbnRzLlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBwZW5kYW50IGxhIHBlaW50dXJlXCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgQ2hhcmdleiB1bmUgaW1hZ2UgZXQgc1x1MDBFOWxlY3Rpb25uZXogdW5lIHBvc2l0aW9uIGQnYWJvcmRcIixcbiAgICBwcm9ncmVzczogXCJQcm9nclx1MDBFOHNcIixcbiAgICB1c2VyTmFtZTogXCJVc2FnZXJcIixcbiAgICBwaXhlbHM6IFwiUGl4ZWxzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJUZW1wcyBlc3RpbVx1MDBFOVwiLFxuICAgIGluaXRNZXNzYWdlOiBcIkNsaXF1ZXogc3VyICdJbml0aWFsaXNlciBBdXRvLUJPVCcgcG91ciBjb21tZW5jZXJcIixcbiAgICB3YWl0aW5nSW5pdDogXCJFbiBhdHRlbnRlIGQnaW5pdGlhbGlzYXRpb24uLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBJbWFnZSByZWRpbWVuc2lvbm5cdTAwRTllIFx1MDBFMCB7d2lkdGh9eHtoZWlnaHR9XCIsXG4gICAgcGFpbnRpbmdQYXVzZWQ6IFwiXHUyM0Y4XHVGRTBGIFBlaW50dXJlIG1pc2UgZW4gcGF1c2UgXHUwMEUwIGxhIHBvc2l0aW9uIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiUGl4ZWxzIHBhciBsb3RcIixcbiAgICBiYXRjaFNpemU6IFwiVGFpbGxlIGR1IGxvdFwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiUHJvY2hhaW4gbG90IGRhbnNcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlV0aWxpc2VyIHRvdXRlcyBsZXMgY2hhcmdlcyBkaXNwb25pYmxlc1wiLFxuICAgIHNob3dPdmVybGF5OiBcIkFmZmljaGVyIGwnb3ZlcmxheVwiLFxuICAgIG1heENoYXJnZXM6IFwiQ2hhcmdlcyBtYXggcGFyIGxvdFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBFbiBhdHRlbnRlIGRlIGNoYXJnZXM6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiVGVtcHMgcmVzdGFudFwiLFxuICAgIGNvb2xkb3duV2FpdGluZzogXCJcdTIzRjMgQXR0ZW5kcmUge3RpbWV9IHBvdXIgY29udGludWVyLi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgUHJvZ3JcdTAwRThzIHNhdXZlZ2FyZFx1MDBFOSBzb3VzIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgUHJvZ3JcdTAwRThzIGNoYXJnXHUwMEU5OiB7cGFpbnRlZH0ve3RvdGFsfSBwaXhlbHMgcGVpbnRzXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZHUgcHJvZ3JcdTAwRThzOiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUgZHUgcHJvZ3JcdTAwRThzOiB7ZXJyb3J9XCIsXG4gICAgY29uZmlybVNhdmVQcm9ncmVzczogXCJWb3VsZXotdm91cyBzYXV2ZWdhcmRlciBsZSBwcm9nclx1MDBFOHMgYWN0dWVsIGF2YW50IGQnYXJyXHUwMEVBdGVyP1wiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlNhdXZlZ2FyZGVyIFByb2dyXHUwMEU4c1wiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJBYmFuZG9ubmVyXCIsXG4gICAgY2FuY2VsOiBcIkFubnVsZXJcIixcbiAgICBtaW5pbWl6ZTogXCJNaW5pbWlzZXJcIixcbiAgICB3aWR0aDogXCJMYXJnZXVyXCIsXG4gICAgaGVpZ2h0OiBcIkhhdXRldXJcIiwgXG4gICAga2VlcEFzcGVjdDogXCJHYXJkZXIgbGVzIHByb3BvcnRpb25zXCIsXG4gICAgYXBwbHk6IFwiQXBwbGlxdWVyXCIsXG4gIG92ZXJsYXlPbjogXCJPdmVybGF5IDogT05cIixcbiAgb3ZlcmxheU9mZjogXCJPdmVybGF5IDogT0ZGXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgUGFzc2FnZSB0ZXJtaW5cdTAwRTk6IHtwYWludGVkfSBwaXhlbHMgcGVpbnRzIHwgUHJvZ3JcdTAwRThzOiB7cGVyY2VudH0lICh7Y3VycmVudH0ve3RvdGFsfSlcIixcbiAgICB3YWl0aW5nQ2hhcmdlc1JlZ2VuOiBcIlx1MjNGMyBBdHRlbnRlIGRlIHJcdTAwRTlnXHUwMEU5blx1MDBFOXJhdGlvbiBkZXMgY2hhcmdlczoge2N1cnJlbnR9L3tuZWVkZWR9IC0gVGVtcHM6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBBdHRlbnRlIGRlcyBjaGFyZ2VzOiB7Y3VycmVudH0ve25lZWRlZH0gLSBSZXN0YW50OiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBJbml0aWFsaXNhdGlvbiBhdXRvbWF0aXF1ZS4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgQm90IGRcdTAwRTltYXJyXHUwMEU5IGF1dG9tYXRpcXVlbWVudFwiLFxuICAgIGF1dG9Jbml0RmFpbGVkOiBcIlx1MjZBMFx1RkUwRiBJbXBvc3NpYmxlIGRlIGRcdTAwRTltYXJyZXIgYXV0b21hdGlxdWVtZW50LiBVdGlsaXNleiBsZSBib3V0b24gbWFudWVsLlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggUGFsZXR0ZSBkZSBjb3VsZXVycyBkXHUwMEU5dGVjdFx1MDBFOWVcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFJlY2hlcmNoZSBkZSBsYSBwYWxldHRlIGRlIGNvdWxldXJzLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgQ2xpYyBzdXIgbGUgYm91dG9uIFBhaW50Li4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgQm91dG9uIFBhaW50IGludHJvdXZhYmxlXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbml0aWFsaXNhdGlvbiBtYW51ZWxsZSByZXF1aXNlXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBUZW50YXRpdmUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gZGFucyB7ZGVsYXl9cy4uLlwiLFxuICAgIHJldHJ5RXJyb3I6IFwiXHVEODNEXHVEQ0E1IEVycmV1ciBkYW5zIHRlbnRhdGl2ZSB7YXR0ZW1wdH0ve21heEF0dGVtcHRzfSwgbm91dmVsIGVzc2FpIGRhbnMge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHUwMEM5Y2hlYyBhcHJcdTAwRThzIHttYXhBdHRlbXB0c30gdGVudGF0aXZlcy4gQ29udGludWFudCBhdmVjIGxlIGxvdCBzdWl2YW50Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBFcnJldXIgclx1MDBFOXNlYXUuIE5vdXZlbCBlc3NhaS4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBFcnJldXIgc2VydmV1ci4gTm91dmVsIGVzc2FpLi4uXCIsXG4gICAgdGltZW91dEVycm9yOiBcIlx1MjNGMCBUaW1lb3V0IHNlcnZldXIuIE5vdXZlbCBlc3NhaS4uLlwiXG4gIH0sXG5cbiAgLy8gRmFybSBNb2R1bGUgKHRvIGJlIGltcGxlbWVudGVkKVxuICBmYXJtOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIEZhcm0gQm90XCIsXG4gICAgc3RhcnQ6IFwiRFx1MDBFOW1hcnJlclwiLFxuICAgIHN0b3A6IFwiQXJyXHUwMEVBdGVyXCIsXG4gICAgc3RvcHBlZDogXCJCb3QgYXJyXHUwMEVBdFx1MDBFOVwiLFxuICAgIGNhbGlicmF0ZTogXCJDYWxpYnJlclwiLFxuICAgIHBhaW50T25jZTogXCJVbmUgZm9pc1wiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlZcdTAwRTlyaWZpY2F0aW9uIGR1IHN0YXR1dC4uLlwiLFxuICAgIGNvbmZpZ3VyYXRpb246IFwiQ29uZmlndXJhdGlvblwiLFxuICAgIGRlbGF5OiBcIkRcdTAwRTlsYWkgKG1zKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlBpeGVscy9sb3RcIixcbiAgICBtaW5DaGFyZ2VzOiBcIkNoYXJnZXMgbWluXCIsXG4gICAgY29sb3JNb2RlOiBcIk1vZGUgY291bGV1clwiLFxuICAgIHJhbmRvbTogXCJBbFx1MDBFOWF0b2lyZVwiLFxuICAgIGZpeGVkOiBcIkZpeGVcIixcbiAgICByYW5nZTogXCJQbGFnZVwiLFxuICAgIGZpeGVkQ29sb3I6IFwiQ291bGV1ciBmaXhlXCIsXG4gICAgYWR2YW5jZWQ6IFwiQXZhbmNcdTAwRTlcIixcbiAgICB0aWxlWDogXCJUdWlsZSBYXCIsXG4gICAgdGlsZVk6IFwiVHVpbGUgWVwiLFxuICAgIGN1c3RvbVBhbGV0dGU6IFwiUGFsZXR0ZSBwZXJzb25uYWxpc1x1MDBFOWVcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJleDogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIkNhcHR1cmVyXCIsXG4gICAgcGFpbnRlZDogXCJQZWludHNcIixcbiAgICBjaGFyZ2VzOiBcIkNoYXJnZXNcIixcbiAgICByZXRyaWVzOiBcIlx1MDBDOWNoZWNzXCIsXG4gICAgdGlsZTogXCJUdWlsZVwiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIkNvbmZpZ3VyYXRpb24gc2F1dmVnYXJkXHUwMEU5ZVwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJDb25maWd1cmF0aW9uIGNoYXJnXHUwMEU5ZVwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIkNvbmZpZ3VyYXRpb24gclx1MDBFOWluaXRpYWxpc1x1MDBFOWVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlBlaW5kcmUgdW4gcGl4ZWwgbWFudWVsbGVtZW50IHBvdXIgY2FwdHVyZXIgbGVzIGNvb3Jkb25uXHUwMEU5ZXMuLi5cIixcbiAgICBiYWNrZW5kT25saW5lOiBcIkJhY2tlbmQgRW4gbGlnbmVcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJCYWNrZW5kIEhvcnMgbGlnbmVcIixcbiAgICBzdGFydGluZ0JvdDogXCJEXHUwMEU5bWFycmFnZSBkdSBib3QuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJBcnJcdTAwRUF0IGR1IGJvdC4uLlwiLFxuICAgIGNhbGlicmF0aW5nOiBcIkNhbGlicmFnZS4uLlwiLFxuICAgIGFscmVhZHlSdW5uaW5nOiBcIkF1dG8tRmFybSBlc3QgZFx1MDBFOWpcdTAwRTAgZW4gY291cnMgZCdleFx1MDBFOWN1dGlvbi5cIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIkF1dG8tSW1hZ2UgZXN0IGVuIGNvdXJzIGQnZXhcdTAwRTljdXRpb24uIEZlcm1lei1sZSBhdmFudCBkZSBkXHUwMEU5bWFycmVyIEF1dG8tRmFybS5cIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJTXHUwMEU5bGVjdGlvbm5lciBab25lXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgUGVpZ25leiB1biBwaXhlbCBkYW5zIHVuZSB6b25lIFZJREUgZGUgbGEgY2FydGUgcG91ciBkXHUwMEU5ZmluaXIgbGEgem9uZSBkZSBmYXJtaW5nXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIHF1ZSB2b3VzIHBlaWduaWV6IGxlIHBpeGVsIGRlIHJcdTAwRTlmXHUwMEU5cmVuY2UuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgWm9uZSBkXHUwMEU5ZmluaWUhIFJheW9uOiA1MDBweFwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkXHUwMEU5cGFzc1x1MDBFOSBwb3VyIGxhIHNcdTAwRTlsZWN0aW9uIGRlIHpvbmVcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFNcdTAwRTlsZWN0aW9ubmV6IHVuZSB6b25lIGQnYWJvcmQgZW4gdXRpbGlzYW50ICdTXHUwMEU5bGVjdGlvbm5lciBab25lJ1wiLFxuICAgIGZhcm1SYWRpdXM6IFwiUmF5b24gZmFybVwiLFxuICAgIHBvc2l0aW9uSW5mbzogXCJab25lIGFjdHVlbGxlXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBGYXJtaW5nIGRhbnMgdW4gcmF5b24gZGUge3JhZGl1c31weCBkZXB1aXMgKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBJTVBPUlRBTlQ6IFNcdTAwRTlsZWN0aW9ubmV6IHVuZSB6b25lIFZJREUgcG91ciBcdTAwRTl2aXRlciBsZXMgY29uZmxpdHNcIixcbiAgICBub1Bvc2l0aW9uOiBcIkF1Y3VuZSB6b25lXCIsXG4gICAgY3VycmVudFpvbmU6IFwiWm9uZTogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBTXHUwMEU5bGVjdGlvbm5leiB1bmUgem9uZSBkJ2Fib3JkLiBQZWlnbmV6IHVuIHBpeGVsIHN1ciBsYSBjYXJ0ZSBwb3VyIGRcdTAwRTlmaW5pciBsYSB6b25lIGRlIGZhcm1pbmdcIlxuICB9LFxuXG4gICAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiT3VpXCIsXG4gICAgbm86IFwiTm9uXCIsXG4gICAgb2s6IFwiT0tcIixcbiAgICBjYW5jZWw6IFwiQW5udWxlclwiLFxuICAgIGNsb3NlOiBcIkZlcm1lclwiLFxuICAgIHNhdmU6IFwiU2F1dmVnYXJkZXJcIixcbiAgICBsb2FkOiBcIkNoYXJnZXJcIixcbiAgICBkZWxldGU6IFwiU3VwcHJpbWVyXCIsXG4gICAgZWRpdDogXCJNb2RpZmllclwiLFxuICAgIHN0YXJ0OiBcIkRcdTAwRTltYXJyZXJcIixcbiAgICBzdG9wOiBcIkFyclx1MDBFQXRlclwiLFxuICAgIHBhdXNlOiBcIlBhdXNlXCIsXG4gICAgcmVzdW1lOiBcIlJlcHJlbmRyZVwiLFxuICAgIHJlc2V0OiBcIlJcdTAwRTlpbml0aWFsaXNlclwiLFxuICAgIHNldHRpbmdzOiBcIlBhcmFtXHUwMEU4dHJlc1wiLFxuICAgIGhlbHA6IFwiQWlkZVwiLFxuICAgIGFib3V0OiBcIlx1MDBDMCBwcm9wb3NcIixcbiAgICBsYW5ndWFnZTogXCJMYW5ndWVcIixcbiAgICBsb2FkaW5nOiBcIkNoYXJnZW1lbnQuLi5cIixcbiAgICBlcnJvcjogXCJFcnJldXJcIixcbiAgICBzdWNjZXNzOiBcIlN1Y2NcdTAwRThzXCIsXG4gICAgd2FybmluZzogXCJBdmVydGlzc2VtZW50XCIsXG4gICAgaW5mbzogXCJJbmZvcm1hdGlvblwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJMYW5ndWUgY2hhbmdcdTAwRTllIGVuIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIEd1YXJkIE1vZHVsZVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBBdXRvLUd1YXJkXCIsXG4gICAgaW5pdEJvdDogXCJJbml0aWFsaXNlciBHdWFyZC1CT1RcIixcbiAgICBzZWxlY3RBcmVhOiBcIlNcdTAwRTlsZWN0aW9ubmVyIFpvbmVcIixcbiAgICBjYXB0dXJlQXJlYTogXCJDYXB0dXJlciBab25lXCIsXG4gICAgc3RhcnRQcm90ZWN0aW9uOiBcIkRcdTAwRTltYXJyZXIgUHJvdGVjdGlvblwiLFxuICAgIHN0b3BQcm90ZWN0aW9uOiBcIkFyclx1MDBFQXRlciBQcm90ZWN0aW9uXCIsXG4gICAgdXBwZXJMZWZ0OiBcIkNvaW4gU3VwXHUwMEU5cmlldXIgR2F1Y2hlXCIsXG4gICAgbG93ZXJSaWdodDogXCJDb2luIEluZlx1MDBFOXJpZXVyIERyb2l0XCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlBpeGVscyBQcm90XHUwMEU5Z1x1MDBFOXNcIixcbiAgICBkZXRlY3RlZENoYW5nZXM6IFwiQ2hhbmdlbWVudHMgRFx1MDBFOXRlY3RcdTAwRTlzXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiUGl4ZWxzIFJcdTAwRTlwYXJcdTAwRTlzXCIsXG4gICAgY2hhcmdlczogXCJDaGFyZ2VzXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiRW4gYXR0ZW50ZSBkJ2luaXRpYWxpc2F0aW9uLi4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFZcdTAwRTlyaWZpY2F0aW9uIGRlcyBjb3VsZXVycyBkaXNwb25pYmxlcy4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIEF1Y3VuZSBjb3VsZXVyIHRyb3V2XHUwMEU5ZS4gT3V2cmV6IGxhIHBhbGV0dGUgZGUgY291bGV1cnMgc3VyIGxlIHNpdGUuXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IHtjb3VudH0gY291bGV1cnMgZGlzcG9uaWJsZXMgdHJvdXZcdTAwRTllc1wiLFxuICAgIGluaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgaW5pdGlhbGlzXHUwMEU5IGF2ZWMgc3VjY1x1MDBFOHNcIixcbiAgICBpbml0RXJyb3I6IFwiXHUyNzRDIEVycmV1ciBsb3JzIGRlIGwnaW5pdGlhbGlzYXRpb24gZGUgR3VhcmQtQk9UXCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgQ29vcmRvbm5cdTAwRTllcyBpbnZhbGlkZXNcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgTGEgem9uZSBkb2l0IGF2b2lyIGxlIGNvaW4gc3VwXHUwMEU5cmlldXIgZ2F1Y2hlIGluZlx1MDBFOXJpZXVyIGF1IGNvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXRcIixcbiAgICBhcmVhVG9vTGFyZ2U6IFwiXHUyNzRDIFpvbmUgdHJvcCBncmFuZGU6IHtzaXplfSBwaXhlbHMgKG1heGltdW06IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IENhcHR1cmUgZGUgbGEgem9uZSBkZSBwcm90ZWN0aW9uLi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBab25lIGNhcHR1clx1MDBFOWU6IHtjb3VudH0gcGl4ZWxzIHNvdXMgcHJvdGVjdGlvblwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgRXJyZXVyIGxvcnMgZGUgbGEgY2FwdHVyZSBkZSB6b25lOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBDYXB0dXJleiBkJ2Fib3JkIHVuZSB6b25lIGRlIHByb3RlY3Rpb25cIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgUHJvdGVjdGlvbiBkXHUwMEU5bWFyclx1MDBFOWUgLSBzdXJ2ZWlsbGFuY2UgZGUgbGEgem9uZVwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBQcm90ZWN0aW9uIGFyclx1MDBFQXRcdTAwRTllXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBab25lIHByb3RcdTAwRTlnXHUwMEU5ZSAtIGF1Y3VuIGNoYW5nZW1lbnQgZFx1MDBFOXRlY3RcdTAwRTlcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gY2hhbmdlbWVudHMgZFx1MDBFOXRlY3RcdTAwRTlzIGRhbnMgbGEgem9uZSBwcm90XHUwMEU5Z1x1MDBFOWVcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFJcdTAwRTlwYXJhdGlvbiBkZSB7Y291bnR9IHBpeGVscyBhbHRcdTAwRTlyXHUwMEU5cy4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUge2NvdW50fSBwaXhlbHMgclx1MDBFOXBhclx1MDBFOXMgYXZlYyBzdWNjXHUwMEU4c1wiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSByXHUwMEU5cGFyYXRpb24gZGVzIHBpeGVsczoge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgQ2hhcmdlcyBpbnN1ZmZpc2FudGVzIHBvdXIgclx1MDBFOXBhcmVyIGxlcyBjaGFuZ2VtZW50c1wiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgVlx1MDBFOXJpZmljYXRpb24gZGVzIGNoYW5nZW1lbnRzIGRhbnMgbGEgem9uZSBwcm90XHUwMEU5Z1x1MDBFOWUuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBFcnJldXIgbG9ycyBkZSBsYSB2XHUwMEU5cmlmaWNhdGlvbiBkZXMgY2hhbmdlbWVudHM6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgR2FyZGllbiBhY3RpZiAtIHpvbmUgc291cyBwcm90ZWN0aW9uXCIsXG4gICAgbGFzdENoZWNrOiBcIkRlcm5pXHUwMEU4cmUgdlx1MDBFOXJpZmljYXRpb246IHt0aW1lfVwiLFxuICAgIG5leHRDaGVjazogXCJQcm9jaGFpbmUgdlx1MDBFOXJpZmljYXRpb24gZGFuczoge3RpbWV9c1wiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IEluaXRpYWxpc2F0aW9uIGF1dG9tYXRpcXVlLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBHdWFyZC1CT1QgZFx1MDBFOW1hcnJcdTAwRTkgYXV0b21hdGlxdWVtZW50XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIEltcG9zc2libGUgZGUgZFx1MDBFOW1hcnJlciBhdXRvbWF0aXF1ZW1lbnQuIFV0aWxpc2V6IGxlIGJvdXRvbiBtYW51ZWwuXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBJbml0aWFsaXNhdGlvbiBtYW51ZWxsZSByZXF1aXNlXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBQYWxldHRlIGRlIGNvdWxldXJzIGRcdTAwRTl0ZWN0XHUwMEU5ZVwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgUmVjaGVyY2hlIGRlIGxhIHBhbGV0dGUgZGUgY291bGV1cnMuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBDbGljIHN1ciBsZSBib3V0b24gUGFpbnQuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBCb3V0b24gUGFpbnQgaW50cm91dmFibGVcIixcbiAgICBzZWxlY3RVcHBlckxlZnQ6IFwiXHVEODNDXHVERkFGIFBlaWduZXogdW4gcGl4ZWwgYXUgY29pbiBTVVBcdTAwQzlSSUVVUiBHQVVDSEUgZGUgbGEgem9uZSBcdTAwRTAgcHJvdFx1MDBFOWdlclwiLFxuICAgIHNlbGVjdExvd2VyUmlnaHQ6IFwiXHVEODNDXHVERkFGIE1haW50ZW5hbnQgcGVpZ25leiB1biBwaXhlbCBhdSBjb2luIElORlx1MDBDOVJJRVVSIERST0lUIGRlIGxhIHpvbmVcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBFbiBhdHRlbnRlIGRlIGxhIHNcdTAwRTlsZWN0aW9uIGR1IGNvaW4gc3VwXHUwMEU5cmlldXIgZ2F1Y2hlLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IEVuIGF0dGVudGUgZGUgbGEgc1x1MDBFOWxlY3Rpb24gZHUgY29pbiBpbmZcdTAwRTlyaWV1ciBkcm9pdC4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBDb2luIHN1cFx1MDBFOXJpZXVyIGdhdWNoZSBjYXB0dXJcdTAwRTk6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IENvaW4gaW5mXHUwMEU5cmlldXIgZHJvaXQgY2FwdHVyXHUwMEU5OiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgRFx1MDBFOWxhaSBkZSBzXHUwMEU5bGVjdGlvbiBkXHUwMEU5cGFzc1x1MDBFOVwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBFcnJldXIgZGUgc1x1MDBFOWxlY3Rpb24sIHZldWlsbGV6IHJcdTAwRTllc3NheWVyXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgcnUgPSB7XG4gIC8vIExhdW5jaGVyXG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgQXV0b0JPVCcsXG4gICAgYXV0b0Zhcm06ICdcdUQ4M0NcdURGM0UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQycsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MThcdTA0MzdcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwJyxcbiAgICBzZWxlY3Rpb246ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0M0RcdTA0M0UnLFxuICAgIHVzZXI6ICdcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NEMnLFxuICAgIGNoYXJnZXM6ICdcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYnLFxuICAgIGJhY2tlbmQ6ICdcdTA0MTFcdTA0NERcdTA0M0FcdTA0MzVcdTA0M0RcdTA0MzQnLFxuICAgIGRhdGFiYXNlOiAnXHUwNDExXHUwNDMwXHUwNDM3XHUwNDMwIFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NScsXG4gICAgdXB0aW1lOiAnXHUwNDEyXHUwNDQwXHUwNDM1XHUwNDNDXHUwNDRGIFx1MDQ0MFx1MDQzMFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQ0QicsXG4gICAgY2xvc2U6ICdcdTA0MTdcdTA0MzBcdTA0M0FcdTA0NDBcdTA0NEJcdTA0NDJcdTA0NEMnLFxuICAgIGxhdW5jaDogJ1x1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQ0QycsXG4gICAgbG9hZGluZzogJ1x1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMCcsXG4gICAgZXhlY3V0aW5nOiAnXHUwNDEyXHUwNDRCXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1JyxcbiAgICBkb3dubG9hZGluZzogJ1x1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzMCBcdTA0NDFcdTA0M0FcdTA0NDBcdTA0MzhcdTA0M0ZcdTA0NDJcdTA0MzAuLi4nLFxuICAgIGNob29zZUJvdDogJ1x1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0MzAgXHUwNDM4IFx1MDQzRFx1MDQzMFx1MDQzNlx1MDQzQ1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MTdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0NEMnLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdcdTA0MTNcdTA0M0VcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0UgXHUwNDNBIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQ0MycsXG4gICAgbG9hZEVycm9yOiAnXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzOCcsXG4gICAgbG9hZEVycm9yTXNnOiAnXHUwNDFEXHUwNDM1XHUwNDMyXHUwNDNFXHUwNDM3XHUwNDNDXHUwNDNFXHUwNDM2XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLiBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NENcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDNFXHUwNDM0XHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzQlx1MDQzOCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDM1XHUwNDQ5XHUwNDM1IFx1MDQ0MFx1MDQzMFx1MDQzNy4nLFxuICAgIGNoZWNraW5nOiAnXHVEODNEXHVERDA0IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMC4uLicsXG4gICAgb25saW5lOiAnXHVEODNEXHVERkUyIFx1MDQxRVx1MDQzRFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRCcsXG4gICAgb2ZmbGluZTogJ1x1RDgzRFx1REQzNCBcdTA0MUVcdTA0NDRcdTA0M0JcdTA0MzBcdTA0MzlcdTA0M0QnLFxuICAgIG9rOiAnXHVEODNEXHVERkUyIFx1MDQxRVx1MDQxQScsXG4gICAgZXJyb3I6ICdcdUQ4M0RcdUREMzQgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwJyxcbiAgICB1bmtub3duOiAnLSdcbiAgfSxcblxuICAvLyBJbWFnZSBNb2R1bGVcbiAgaW1hZ2U6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIGluaXRCb3Q6IFwiXHUwNDE4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIEF1dG8tQk9UXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzBcdTA0MzdcdTA0M0NcdTA0MzVcdTA0NDAgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzRSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzBcIixcbiAgICBzdGFydFBhaW50aW5nOiBcIlx1MDQxRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxXCIsXG4gICAgbG9hZFByb2dyZXNzOiBcIlx1MDQxN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRlx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0NDZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDQzIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMiBcdTA0M0RcdTA0MzAgXHUwNDQxXHUwNDMwXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzOCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDMwIVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTA0MURcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgbG9hZGluZ0ltYWdlOiBcIlx1RDgzRFx1RERCQ1x1RkUwRiBcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzAgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IFx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDQxIHtjb3VudH0gXHUwNDM0XHUwNDM1XHUwNDM5XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRDXHUwNDNEXHUwNDRCXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0Rlx1MDQzQ1x1MDQzOFwiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQwXHUwNDQyXHUwNDNFXHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDQyXHUwNDNFXHUwNDNDIFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzNSwgXHUwNDMzXHUwNDM0XHUwNDM1IFx1MDQzMlx1MDQ0QiBcdTA0NDVcdTA0M0VcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0M0RcdTA0M0VcdTA0M0EgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDM4XHUwNDNEXHUwNDMwXHUwNDNCXHUwNDQxXHUwNDRGIVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEYuLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzAgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDXHUwNDMwXHUwNDQzXHUwNDQyIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0ZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzhcIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBcdTA0MUZcdTA0M0VcdTA0MzdcdTA0MzhcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDMwLCBcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRlx1MDQzRVx1MDQzN1x1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzOCwgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQ0OVx1MDQzNSBcdTA0NDBcdTA0MzBcdTA0MzdcIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0M0UgXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxOiB7cGFpbnRlZH0gXHUwNDM4XHUwNDM3IHt0b3RhbH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5Li4uXCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjMxQiBcdTA0MURcdTA0MzVcdTA0NDIgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyLiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUge3RpbWV9Li4uXCIsXG4gICAgcGFpbnRpbmdTdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTA0MjBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzQ1wiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1MDQyMFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDhcdTA0MzVcdTA0M0RcdTA0M0UhIHtjb3VudH0gXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRS5cIixcbiAgICBwYWludGluZ0Vycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0Nlx1MDQzNVx1MDQ0MVx1MDQ0MVx1MDQzNSBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NEZcIixcbiAgICBtaXNzaW5nUmVxdWlyZW1lbnRzOiBcIlx1Mjc0QyBcdTA0MjFcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzggXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzRSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0MzBcIixcbiAgICBwcm9ncmVzczogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcIixcbiAgICB1c2VyTmFtZTogXCJcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0NENcIixcbiAgICBwaXhlbHM6IFwiXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM4XCIsXG4gICAgY2hhcmdlczogXCJcdTA0MTdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0NEJcIixcbiAgICBlc3RpbWF0ZWRUaW1lOiBcIlx1MDQxRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0MzJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0NEZcIixcbiAgICBpbml0TWVzc2FnZTogXCJcdTA0MURcdTA0MzBcdTA0MzZcdTA0M0NcdTA0MzhcdTA0NDJcdTA0MzUgXHUwMEFCXHUwNDE3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIEF1dG8tQk9UXHUwMEJCLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOC4uLlwiLFxuICAgIHJlc2l6ZVN1Y2Nlc3M6IFwiXHUyNzA1IFx1MDQxOFx1MDQzN1x1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDM0XHUwNDNFIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHUwNDIwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0M0RcdTA0MzAgXHUwNDNGXHUwNDNFXHUwNDM3XHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDM4IFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHUwNDFGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDM5IFx1MDQzMiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzRcdTA0MzVcIixcbiAgICBiYXRjaFNpemU6IFwiXHUwNDIwXHUwNDMwXHUwNDM3XHUwNDNDXHUwNDM1XHUwNDQwIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNFx1MDQzMFwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHUwNDIxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0NVx1MDQzRVx1MDQzNCBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlx1MDQxOFx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0NDFcdTA0MzUgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQ0QlwiLFxuICAgIHNob3dPdmVybGF5OiBcIlx1MDQxRlx1MDQzRVx1MDQzQVx1MDQzMFx1MDQzN1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0RcdTA0MzBcdTA0M0JcdTA0M0VcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzVcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1MDQxQ1x1MDQzMFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQzQ1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0ItXHUwNDMyXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMiBcdTA0MzdcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0M0VcdTA0MzI6IHtjdXJyZW50fSBcdTA0MzhcdTA0Mzcge25lZWRlZH1cIixcbiAgICB0aW1lUmVtYWluaW5nOiBcIlx1MDQxMlx1MDQ0MFx1MDQzNVx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOCBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NENcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSB7dGltZX0gXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Ri4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0NDFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0QgXHUwNDNBXHUwNDMwXHUwNDNBIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRDoge3BhaW50ZWR9IFx1MDQzOFx1MDQzNyB7dG90YWx9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0M0VcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzOCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzA6IHtlcnJvcn1cIixcbiAgICBwcm9ncmVzc1NhdmVFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQ0MVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzVcdTA0NDFcdTA0NDFcdTA0MzA6IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1MDQyMVx1MDQzRVx1MDQ0NVx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NDJcdTA0MzVcdTA0M0FcdTA0NDNcdTA0NDlcdTA0MzhcdTA0MzkgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxIFx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNCBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0FcdTA0M0VcdTA0Mzk/XCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTA0MURcdTA0MzUgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDRGXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzNVx1MDQ0MVx1MDQ0MVwiLFxuICAgIGNhbmNlbDogXCJcdTA0MUVcdTA0NDJcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBtaW5pbWl6ZTogXCJcdTA0MjFcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0RcdTA0NDNcdTA0NDJcdTA0NENcIixcbiAgICB3aWR0aDogXCJcdTA0MjhcdTA0MzhcdTA0NDBcdTA0MzhcdTA0M0RcdTA0MzBcIixcbiAgICBoZWlnaHQ6IFwiXHUwNDEyXHUwNDRCXHUwNDQxXHUwNDNFXHUwNDQyXHUwNDMwXCIsXG4gICAga2VlcEFzcGVjdDogXCJcdTA0MjFcdTA0M0VcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQxXHUwNDNFXHUwNDNFXHUwNDQyXHUwNDNEXHUwNDNFXHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRVx1MDQzRFwiLFxuICAgIGFwcGx5OiBcIlx1MDQxRlx1MDQ0MFx1MDQzOFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQ0Nlx1MDQzNVx1MDQ0MVx1MDQ0MSBcdTA0MzdcdTA0MzBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDhcdTA0MzVcdTA0M0Q6IHtwYWludGVkfSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNFIHwgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDQwXHUwNDM1XHUwNDQxXHUwNDQxOiB7cGVyY2VudH0lICh7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHt0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0NDBcdTA0NEZcdTA0MzRcdTA0MzA6IHtjdXJyZW50fSBcdTA0MzhcdTA0Mzcge25lZWRlZH0gLSBcdTA0MTJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0NEY6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDMyOiB7Y3VycmVudH0gXHUwNDM4XHUwNDM3IHtuZWVkZWR9IC0gXHUwNDIyXHUwNDQwXHUwNDM1XHUwNDMxXHUwNDQzXHUwNDM1XHUwNDQyXHUwNDQxXHUwNDRGOiB7dGltZX1cIixcbiAgICBhdXRvSW5pdGlhbGl6aW5nOiBcIlx1RDgzRVx1REQxNiBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGLi4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTA0MTFcdTA0M0VcdTA0NDIgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0MVx1MDQ0RiBcdTA0MzBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0M0NcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzhcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHUwNDFEXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QyBcdTA0MzJcdTA0NEJcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBLiBcdTA0MThcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDQzIFx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0MzAuXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTA0MjZcdTA0MzJcdTA0MzVcdTA0NDJcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzRVx1MDQzOSBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0NEIuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTA0MURcdTA0MzBcdTA0MzZcdTA0MzBcdTA0NDJcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDM4IFx1MDBBQlBhaW50XHUwMEJCLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHUwNDFBXHUwNDNEXHUwNDNFXHUwNDNGXHUwNDNBXHUwNDMwIFx1MDBBQlBhaW50XHUwMEJCIFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1MDQyMlx1MDQ0MFx1MDQzNVx1MDQzMVx1MDQ0M1x1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0RiBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwIHthdHRlbXB0fSBcdTA0MzhcdTA0Mzcge21heEF0dGVtcHRzfSBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzcge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyIFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzQVx1MDQzNSB7YXR0ZW1wdH0gXHUwNDM4XHUwNDM3IHttYXhBdHRlbXB0c30sIFx1MDQzRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzcge2RlbGF5fXMuLi5cIixcbiAgICByZXRyeUZhaWxlZDogXCJcdTI3NEMgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQ0MVx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQ0RiB7bWF4QXR0ZW1wdHN9IFx1MDQzRlx1MDQzRVx1MDQzRlx1MDQ0Qlx1MDQ0Mlx1MDQzRVx1MDQzQS4gXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDM0XHUwNDNFXHUwNDNCXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMiBcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0NDNcdTA0NEVcdTA0NDlcdTA0MzVcdTA0M0MgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XHUwNDM1Li4uXCIsXG4gICAgbmV0d29ya0Vycm9yOiBcIlx1RDgzQ1x1REYxMCBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDQxXHUwNDM1XHUwNDQyXHUwNDM4LiBcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0MzAuIFx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1MDQyMlx1MDQzMFx1MDQzOVx1MDQzQ1x1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0NDFcdTA0MzVcdTA0NDBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0MzAuIFx1MDQxRlx1MDQzRVx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NEJcdTA0NDJcdTA0M0FcdTA0MzAuLi5cIlxuICB9LFxuXG4gIC8vIEZhcm0gTW9kdWxlICh0byBiZSBpbXBsZW1lbnRlZClcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDXCIsXG4gICAgc3RhcnQ6IFwiXHUwNDFEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc3RvcDogXCJcdTA0MUVcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wcGVkOiBcIlx1MDQxMVx1MDQzRVx1MDQ0MiBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcIixcbiAgICBjYWxpYnJhdGU6IFwiXHUwNDFBXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDMxXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgcGFpbnRPbmNlOiBcIlx1MDQxNVx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzRVx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzRVx1MDQzMlx1MDQzRVwiLFxuICAgIGNoZWNraW5nU3RhdHVzOiBcIlx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0NDNcdTA0NDFcdTA0MzAuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIlx1MDQxQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGRlbGF5OiBcIlx1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMCAoXHUwNDNDXHUwNDQxKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSBcdTA0MzdcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM0XCIsXG4gICAgbWluQ2hhcmdlczogXCJcdTA0MUNcdTA0MzhcdTA0M0RcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNCLVx1MDQzMlx1MDQzRVwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTA0MjBcdTA0MzVcdTA0MzZcdTA0MzhcdTA0M0MgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgcmFuZG9tOiBcIlx1MDQyMVx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQzMFx1MDQzOVx1MDQzRFx1MDQ0Qlx1MDQzOVwiLFxuICAgIGZpeGVkOiBcIlx1MDQyNFx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOVwiLFxuICAgIHJhbmdlOiBcIlx1MDQxNFx1MDQzOFx1MDQzMFx1MDQzRlx1MDQzMFx1MDQzN1x1MDQzRVx1MDQzRFwiLFxuICAgIGZpeGVkQ29sb3I6IFwiXHUwNDI0XHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0MlwiLFxuICAgIGFkdmFuY2VkOiBcIlx1MDQyMFx1MDQzMFx1MDQ0MVx1MDQ0OFx1MDQzOFx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNVwiLFxuICAgIHRpbGVYOiBcIlx1MDQxRlx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQzQVx1MDQzMCBYXCIsXG4gICAgdGlsZVk6IFwiXHUwNDFGXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDNBXHUwNDMwIFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlx1MDQyMVx1MDQzMlx1MDQzRVx1MDQ0RiBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0MzBcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTA0M0ZcdTA0NDBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDA6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTA0MTdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcIixcbiAgICBwYWludGVkOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQzMFx1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzRVwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgcmV0cmllczogXCJcdTA0MUZcdTA0M0VcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNGXHUwNDNFXHUwNDNGXHUwNDRCXHUwNDQyXHUwNDNBXHUwNDM4XCIsXG4gICAgdGlsZTogXCJcdTA0MUZcdTA0M0JcdTA0MzhcdTA0NDJcdTA0M0FcdTA0MzBcIixcbiAgICBjb25maWdTYXZlZDogXCJcdTA0MUFcdTA0M0VcdTA0M0RcdTA0NDRcdTA0MzhcdTA0MzNcdTA0NDNcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDQxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIlx1MDQxQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0MzBcIixcbiAgICBjb25maWdSZXNldDogXCJcdTA0MjFcdTA0MzFcdTA0NDBcdTA0M0VcdTA0NDEgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4XCIsXG4gICAgY2FwdHVyZUluc3RydWN0aW9uczogXCJcdTA0MURcdTA0MzBcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRDIFx1MDQzMlx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQ0M1x1MDQ0RSBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDMwIFx1MDQzQVx1MDQzRVx1MDQzRVx1MDQ0MFx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzMFx1MDQ0Mi4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHUwNDExXHUwNDREXHUwNDNBXHUwNDREXHUwNDNEXHUwNDM0IFx1MDQxRVx1MDQzRFx1MDQzQlx1MDQzMFx1MDQzOVx1MDQzRFwiLFxuICAgIGJhY2tlbmRPZmZsaW5lOiBcIlx1MDQxMVx1MDQ0RFx1MDQzQVx1MDQ0RFx1MDQzRFx1MDQzNFwiLFxuICAgIHN0YXJ0aW5nQm90OiBcIlx1MDQxN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQSBcdTA0MzFcdTA0M0VcdTA0NDJcdTA0MzAuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJcdTA0MUVcdTA0NDFcdTA0NDJcdTA0MzBcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0FcdTA0MzAgXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDMwLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHUwNDFBXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDMxXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHUwNDEwXHUwNDMyXHUwNDQyXHUwNDNFLVx1MDQyNFx1MDQzMFx1MDQ0MFx1MDQzQyBcdTA0NDNcdTA0MzZcdTA0MzUgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQzRFx1MDQzRS4gXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzQgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDNFXHUwNDNDIFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRS1cdTA0MjRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzAuXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDRDXCIsXG4gICAgc2VsZWN0UG9zaXRpb25BbGVydDogXCJcdUQ4M0NcdURGQUYgXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDFGXHUwNDIzXHUwNDIxXHUwNDIyXHUwNDFFXHUwNDE5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0M0FcdTA0MzBcdTA0NDBcdTA0NDJcdTA0NEIsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0M0VcdTA0MzFcdTA0M0VcdTA0MzdcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQ0NFx1MDQzMFx1MDQ0MFx1MDQzQ1x1MDQzMC5cIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRVx1MDQzNlx1MDQzOFx1MDQzNFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDBcdTA0NDJcdTA0M0VcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDNGXHUwNDM4XHUwNDNBXHUwNDQxXHUwNDM1XHUwNDNCXHUwNDRGLi4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwISBcdTA0MjBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDE6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTA0MjJcdTA0MzBcdTA0MzlcdTA0M0NcdTA0MzBcdTA0NDNcdTA0NDIgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0QyBcdTA0NDEgXHUwNDNGXHUwNDNFXHUwNDNDXHUwNDNFXHUwNDQ5XHUwNDRDXHUwNDRFIFx1MDBBQlx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NENcdTAwQkJcIixcbiAgICBmYXJtUmFkaXVzOiBcIlx1MDQyMFx1MDQzMFx1MDQzNFx1MDQzOFx1MDQ0M1x1MDQ0MSBcdTA0NDRcdTA0MzBcdTA0NDBcdTA0M0NcdTA0MzBcIixcbiAgICBwb3NpdGlvbkluZm86IFwiXHUwNDIyXHUwNDM1XHUwNDNBXHUwNDQzXHUwNDQ5XHUwNDMwXHUwNDRGIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHUwNDI0XHUwNDMwXHUwNDQwXHUwNDNDIFx1MDQzMiBcdTA0NDBcdTA0MzBcdTA0MzRcdTA0MzhcdTA0NDNcdTA0NDFcdTA0MzUge3JhZGl1c31weCBcdTA0M0VcdTA0NDIgKHt4fSx7eX0pXCIsXG4gICAgc2VsZWN0RW1wdHlBcmVhOiBcIlx1MjZBMFx1RkUwRiBcdTA0MTJcdTA0MTBcdTA0MTZcdTA0MURcdTA0MUU6IFx1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MUZcdTA0MjNcdTA0MjFcdTA0MjJcdTA0MjNcdTA0MkUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDM4XHUwNDM3XHUwNDMxXHUwNDM1XHUwNDM2XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzQlx1MDQzOFx1MDQzQVx1MDQ0Mlx1MDQzRVx1MDQzMi5cIixcbiAgICBub1Bvc2l0aW9uOiBcIlx1MDQxRFx1MDQzNVx1MDQ0MiBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEM6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHUwNDIxXHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDMwXHUwNDNCXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMuIFx1MDQxRFx1MDQzMFx1MDQ0MFx1MDQzOFx1MDQ0MVx1MDQ0M1x1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0NEMgXHUwNDNEXHUwNDMwIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzNSwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzRVx1MDQzMVx1MDQzRVx1MDQzN1x1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQ0XHUwNDMwXHUwNDQwXHUwNDNDXHUwNDMwLlwiXG4gIH0sXG5cbiAgLy8gQ29tbW9uL1NoYXJlZFxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiXHUwNDE0XHUwNDMwXCIsXG4gICAgbm86IFwiXHUwNDFEXHUwNDM1XHUwNDQyXCIsXG4gICAgb2s6IFwiXHUwNDFFXHUwNDFBXCIsXG4gICAgY2FuY2VsOiBcIlx1MDQxRVx1MDQ0Mlx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIGNsb3NlOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQ0MFx1MDQ0Qlx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHNhdmU6IFwiXHUwNDIxXHUwNDNFXHUwNDQ1XHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgbG9hZDogXCJcdTA0MTdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBkZWxldGU6IFwiXHUwNDIzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDXCIsXG4gICAgZWRpdDogXCJcdTA0MThcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzdGFydDogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NENcIixcbiAgICBzdG9wOiBcIlx1MDQxN1x1MDQzMFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHBhdXNlOiBcIlx1MDQxRlx1MDQ0MFx1MDQzOFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHJlc3VtZTogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzRcdTA0M0VcdTA0M0JcdTA0MzZcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICByZXNldDogXCJcdTA0MjFcdTA0MzFcdTA0NDBcdTA0M0VcdTA0NDFcdTA0MzhcdTA0NDJcdTA0NENcIixcbiAgICBzZXR0aW5nczogXCJcdTA0MURcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzlcdTA0M0FcdTA0MzhcIixcbiAgICBoZWxwOiBcIlx1MDQxRlx1MDQzRVx1MDQzQ1x1MDQzRVx1MDQ0OVx1MDQ0Q1wiLFxuICAgIGFib3V0OiBcIlx1MDQxOFx1MDQzRFx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RlwiLFxuICAgIGxhbmd1YWdlOiBcIlx1MDQyRlx1MDQzN1x1MDQ0Qlx1MDQzQVwiLFxuICAgIGxvYWRpbmc6IFwiXHUwNDE3XHUwNDMwXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDM3XHUwNDNBXHUwNDMwLi4uXCIsXG4gICAgZXJyb3I6IFwiXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwXCIsXG4gICAgc3VjY2VzczogXCJcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDVcIixcbiAgICB3YXJuaW5nOiBcIlx1MDQxRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQ0M1x1MDQzRlx1MDQ0MFx1MDQzNVx1MDQzNlx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNVwiLFxuICAgIGluZm86IFwiXHUwNDE4XHUwNDNEXHUwNDQ0XHUwNDNFXHUwNDQwXHUwNDNDXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIlx1MDQyRlx1MDQzN1x1MDQ0Qlx1MDQzQSBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0QgXHUwNDNEXHUwNDMwIHtsYW5ndWFnZX1cIlxuICB9LFxuXG4gIC8vIEd1YXJkIE1vZHVsZVxuICBndWFyZDoge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0UtXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDMwXCIsXG4gICAgaW5pdEJvdDogXCJcdTA0MThcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgR3VhcmQtQk9UXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTA0MTJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDXCIsXG4gICAgY2FwdHVyZUFyZWE6IFwiXHUwNDE3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0Q1wiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDQzXCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQxN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0M1wiLFxuICAgIHVwcGVyTGVmdDogXCJcdTA0MTJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzhcdTA0MzkgXHUwNDFCXHUwNDM1XHUwNDMyXHUwNDRCXHUwNDM5IFx1MDQyM1x1MDQzM1x1MDQzRVx1MDQzQlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHUwNDFEXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQxRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0MjNcdTA0MzNcdTA0M0VcdTA0M0JcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiXHUwNDE3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTA0MUVcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDE4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXCIsXG4gICAgcmVwYWlyZWRQaXhlbHM6IFwiXHUwNDEyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQxRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzOFwiLFxuICAgIGNoYXJnZXM6IFwiXHUwNDE3XHUwNDMwXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDRCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzOFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQzOFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOC4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1MDQyNlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzMCBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDRCLiBcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDQwXHUwNDQzIFx1MDQ0Nlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMiBcdTA0M0RcdTA0MzAgXHUwNDQxXHUwNDMwXHUwNDM5XHUwNDQyXHUwNDM1LlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTA0MURcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0M0Uge2NvdW50fSBcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBcdTA0NDNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDM4XHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDM3XHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4IEd1YXJkLUJPVFwiLFxuICAgIGludmFsaWRDb29yZHM6IFwiXHUyNzRDIFx1MDQxRFx1MDQzNVx1MDQzNFx1MDQzNVx1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0VcdTA0NDBcdTA0MzRcdTA0MzhcdTA0M0RcdTA0MzBcdTA0NDJcdTA0NEJcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzNFx1MDQzRVx1MDQzQlx1MDQzNlx1MDQzRFx1MDQzMCBcdTA0MzhcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDQ1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzQlx1MDQzNVx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0NDNcdTA0MzNcdTA0M0VcdTA0M0IgXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDRDXHUwNDQ4XHUwNDM1IFx1MDQzRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDMwXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTA0MUVcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDQxXHUwNDNCXHUwNDM4XHUwNDQ4XHUwNDNBXHUwNDNFXHUwNDNDIFx1MDQzMVx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQ0OFx1MDQzMFx1MDQ0Rjoge3NpemV9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOSAoXHUwNDNDXHUwNDMwXHUwNDNBXHUwNDQxXHUwNDM4XHUwNDNDXHUwNDQzXHUwNDNDOiB7bWF4fSlcIixcbiAgICBjYXB0dXJpbmdBcmVhOiBcIlx1RDgzRFx1RENGOCBcdTA0MTdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDIgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0Qi4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHUwNDFFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzMDoge2NvdW50fSBcdTA0M0ZcdTA0MzhcdTA0M0FcdTA0NDFcdTA0MzVcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDNGXHUwNDNFXHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQzOVwiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0Mzg6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIFx1MDQyMVx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0NDVcdTA0MzJcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQ0QlwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDMwIC0gXHUwNDNDXHUwNDNFXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDNEXHUwNDMzIFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHByb3RlY3Rpb25TdG9wcGVkOiBcIlx1MjNGOVx1RkUwRiBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0MzAgXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBcdTA0MTdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDlcdTA0MzVcdTA0M0RcdTA0M0RcdTA0MzBcdTA0NEYgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDRDIC0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRFx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0MzBcdTA0NDBcdTA0NDNcdTA0MzZcdTA0MzVcdTA0M0RcdTA0M0VcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IHtjb3VudH0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzMFx1MDQ0MFx1MDQ0M1x1MDQzNlx1MDQzNVx1MDQzRFx1MDQzRSBcdTA0MzIgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDNFXHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgXHUwNDEyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IHtjb3VudH0gXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOS4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQzMlx1MDQzRVx1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRSB7Y291bnR9IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOVwiLFxuICAgIHJlcGFpckVycm9yOiBcIlx1Mjc0QyBcdTA0MUVcdTA0NDhcdTA0MzhcdTA0MzFcdTA0M0FcdTA0MzAgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQzNVx1MDQzOToge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHUwNDFEXHUwNDM1XHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDQyXHUwNDNFXHUwNDQ3XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzMiBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDMyXHUwNDNFXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOVwiLFxuICAgIGNoZWNraW5nQ2hhbmdlczogXCJcdUQ4M0RcdUREMEQgXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwIFx1MDQzOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0MzIgXHUwNDM3XHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQ5XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDNFXHUwNDM5IFx1MDQzRVx1MDQzMVx1MDQzQlx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOC4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIFx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM5OiB7ZXJyb3J9XCIsXG4gICAgZ3VhcmRBY3RpdmU6IFwiXHVEODNEXHVERUUxXHVGRTBGIFx1MDQyMVx1MDQ0Mlx1MDQ0MFx1MDQzMFx1MDQzNiBcdTA0MzBcdTA0M0FcdTA0NDJcdTA0MzhcdTA0MzJcdTA0MzVcdTA0M0QgLSBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDM0IFx1MDQzN1x1MDQzMFx1MDQ0OVx1MDQzOFx1MDQ0Mlx1MDQzRVx1MDQzOVwiLFxuICAgIGxhc3RDaGVjazogXCJcdTA0MUZcdTA0M0VcdTA0NDFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0M0RcdTA0NEZcdTA0NEYgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNBXHUwNDMwOiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiXHUwNDIxXHUwNDNCXHUwNDM1XHUwNDM0XHUwNDQzXHUwNDRFXHUwNDQ5XHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzc6IHt0aW1lfVx1MDQ0MVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1MDQxMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzMFx1MDQ0RiBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEYuLi5cIixcbiAgICBhdXRvSW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IEd1YXJkLUJPVCBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDlcdTA0MzVcdTA0M0QgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDM4XCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOC4gXHUwNDE4XHUwNDQxXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzRFx1MDQzRVx1MDQzRlx1MDQzQVx1MDQ0MyBcdTA0NDBcdTA0NDNcdTA0NDdcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDMwLlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHUwNDIyXHUwNDQwXHUwNDM1XHUwNDMxXHUwNDQzXHUwNDM1XHUwNDQyXHUwNDQxXHUwNDRGIFx1MDQ0MFx1MDQ0M1x1MDQ0N1x1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0MzhcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzBcdTA0NDZcdTA0MzhcdTA0NEZcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1MDQyNlx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0RiBcdTA0M0ZcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NDBcdTA0MzAgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDQzXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDMwXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTA0MUZcdTA0M0VcdTA0MzhcdTA0NDFcdTA0M0EgXHUwNDQ2XHUwNDMyXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDM5IFx1MDQzRlx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0MFx1MDQ0Qi4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1MDQxRFx1MDQzMFx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQzNSBcdTA0M0FcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzggXHUwMEFCUGFpbnRcdTAwQkIuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTA0MUFcdTA0M0RcdTA0M0VcdTA0M0ZcdTA0M0FcdTA0MzAgXHUwMEFCUGFpbnRcdTAwQkIgXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzMFwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHUwNDFEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDEyXHUwNDE1XHUwNDIwXHUwNDI1XHUwNDFEXHUwNDE1XHUwNDFDIFx1MDQxQlx1MDQxNVx1MDQxMlx1MDQxRVx1MDQxQyBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0NDMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzdcdTA0MzBcdTA0NDlcdTA0MzhcdTA0NDJcdTA0NEJcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBcdTA0MjJcdTA0MzVcdTA0M0ZcdTA0MzVcdTA0NDBcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDQwXHUwNDM4XHUwNDQxXHUwNDQzXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzOFx1MDQzQVx1MDQ0MVx1MDQzNVx1MDQzQlx1MDQ0QyBcdTA0MzIgXHUwNDFEXHUwNDE4XHUwNDE2XHUwNDFEXHUwNDE1XHUwNDFDIFx1MDQxRlx1MDQyMFx1MDQxMFx1MDQxMlx1MDQxRVx1MDQxQyBcdTA0NDNcdTA0MzNcdTA0M0JcdTA0NDMgXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDM4XCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHUwNDFFXHUwNDM2XHUwNDM4XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NDVcdTA0M0RcdTA0MzVcdTA0MzNcdTA0M0UgXHUwNDNCXHUwNDM1XHUwNDMyXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzM1x1MDQzQlx1MDQzMC4uLlwiLFxuICAgIHdhaXRpbmdMb3dlclJpZ2h0OiBcIlx1RDgzRFx1REM0NiBcdTA0MUVcdTA0MzZcdTA0MzhcdTA0MzRcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRFx1MDQzOFx1MDQzNlx1MDQzRFx1MDQzNVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDQzXHUwNDMzXHUwNDNCXHUwNDMwLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1MDQxMlx1MDQzNVx1MDQ0MFx1MDQ0NVx1MDQzRFx1MDQzOFx1MDQzOSBcdTA0M0JcdTA0MzVcdTA0MzJcdTA0NEJcdTA0MzkgXHUwNDQzXHUwNDMzXHUwNDNFXHUwNDNCIFx1MDQzN1x1MDQzMFx1MDQ0NVx1MDQzMlx1MDQzMFx1MDQ0N1x1MDQzNVx1MDQzRDogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgXHUwNDFEXHUwNDM4XHUwNDM2XHUwNDNEXHUwNDM4XHUwNDM5IFx1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQ0Qlx1MDQzOSBcdTA0NDNcdTA0MzNcdTA0M0VcdTA0M0IgXHUwNDM3XHUwNDMwXHUwNDQ1XHUwNDMyXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDNEOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgXHUwNDIyXHUwNDMwXHUwNDM5XHUwNDNDLVx1MDQzMFx1MDQ0M1x1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0M0VcdTA0NDBcdTA0MzBcIixcbiAgICBzZWxlY3Rpb25FcnJvcjogXCJcdTI3NEMgXHUwNDFFXHUwNDQ4XHUwNDM4XHUwNDMxXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQ0Qlx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzMCwgXHUwNDNGXHUwNDNFXHUwNDM2XHUwNDMwXHUwNDNCXHUwNDQzXHUwNDM5XHUwNDQxXHUwNDQyXHUwNDMwLCBcdTA0M0ZcdTA0M0VcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0NDNcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDMwXCJcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgemhIYW5zID0ge1xuICAvLyBcdTU0MkZcdTUyQThcdTU2NjhcbiAgbGF1bmNoZXI6IHtcbiAgICB0aXRsZTogJ1dQbGFjZSBcdTgxRUFcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkEnLFxuICAgIGF1dG9GYXJtOiAnXHVEODNDXHVERjNFIFx1ODFFQVx1NTJBOFx1NTE5Q1x1NTczQScsXG4gICAgYXV0b0ltYWdlOiAnXHVEODNDXHVERkE4IFx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRScsXG4gICAgYXV0b0d1YXJkOiAnXHVEODNEXHVERUUxXHVGRTBGIFx1ODFFQVx1NTJBOFx1NUI4OFx1NjJBNCcsXG4gICAgc2VsZWN0aW9uOiAnXHU5MDA5XHU2MkU5JyxcbiAgICB1c2VyOiAnXHU3NTI4XHU2MjM3JyxcbiAgICBjaGFyZ2VzOiAnXHU2QjIxXHU2NTcwJyxcbiAgICBiYWNrZW5kOiAnXHU1NDBFXHU3QUVGJyxcbiAgICBkYXRhYmFzZTogJ1x1NjU3MFx1NjM2RVx1NUU5MycsXG4gICAgdXB0aW1lOiAnXHU4RkQwXHU4ODRDXHU2NUY2XHU5NUY0JyxcbiAgICBjbG9zZTogJ1x1NTE3M1x1OTVFRCcsXG4gICAgbGF1bmNoOiAnXHU1NDJGXHU1MkE4JyxcbiAgICBsb2FkaW5nOiAnXHU1MkEwXHU4RjdEXHU0RTJEXHUyMDI2JyxcbiAgICBleGVjdXRpbmc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgIGRvd25sb2FkaW5nOiAnXHU2QjYzXHU1NzI4XHU0RTBCXHU4RjdEXHU4MTFBXHU2NzJDXHUyMDI2JyxcbiAgICBjaG9vc2VCb3Q6ICdcdTkwMDlcdTYyRTlcdTRFMDBcdTRFMkFcdTY3M0FcdTU2NjhcdTRFQkFcdTVFNzZcdTcwQjlcdTUxRkJcdTU0MkZcdTUyQTgnLFxuICAgIHJlYWR5VG9MYXVuY2g6ICdcdTUxQzZcdTU5MDdcdTU0MkZcdTUyQTgnLFxuICAgIGxvYWRFcnJvcjogJ1x1NTJBMFx1OEY3RFx1OTUxOVx1OEJFRicsXG4gICAgbG9hZEVycm9yTXNnOiAnXHU2NUUwXHU2Q0Q1XHU1MkEwXHU4RjdEXHU2MjQwXHU5MDA5XHU2NzNBXHU1NjY4XHU0RUJBXHUzMDAyXHU4QkY3XHU2OEMwXHU2N0U1XHU3RjUxXHU3RURDXHU4RkRFXHU2M0E1XHU2MjE2XHU5MUNEXHU4QkQ1XHUzMDAyJyxcbiAgICBjaGVja2luZzogJ1x1RDgzRFx1REQwNCBcdTY4QzBcdTY3RTVcdTRFMkQuLi4nLFxuICAgIG9ubGluZTogJ1x1RDgzRFx1REZFMiBcdTU3MjhcdTdFQkYnLFxuICAgIG9mZmxpbmU6ICdcdUQ4M0RcdUREMzQgXHU3OUJCXHU3RUJGJyxcbiAgICBvazogJ1x1RDgzRFx1REZFMiBcdTZCNjNcdTVFMzgnLFxuICAgIGVycm9yOiAnXHVEODNEXHVERDM0IFx1OTUxOVx1OEJFRicsXG4gICAgdW5rbm93bjogJy0nXG4gIH0sXG5cbiAgLy8gXHU3RUQ4XHU1NkZFXHU2QTIxXHU1NzU3XG4gIGltYWdlOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRVwiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkE4XHU2NzNBXHU1NjY4XHU0RUJBXCIsXG4gICAgdXBsb2FkSW1hZ2U6IFwiXHU0RTBBXHU0RjIwXHU1NkZFXHU3MjQ3XCIsXG4gICAgcmVzaXplSW1hZ2U6IFwiXHU4QzAzXHU2NTc0XHU1NkZFXHU3MjQ3XHU1OTI3XHU1QzBGXCIsXG4gICAgc2VsZWN0UG9zaXRpb246IFwiXHU5MDA5XHU2MkU5XHU0RjREXHU3RjZFXCIsXG4gICAgc3RhcnRQYWludGluZzogXCJcdTVGMDBcdTU5Q0JcdTdFRDhcdTUyMzZcIixcbiAgICBzdG9wUGFpbnRpbmc6IFwiXHU1MDVDXHU2QjYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgc2F2ZVByb2dyZXNzOiBcIlx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlwiLFxuICAgIGxvYWRQcm9ncmVzczogXCJcdTUyQTBcdThGN0RcdThGREJcdTVFQTZcIixcbiAgICBjaGVja2luZ0NvbG9yczogXCJcdUQ4M0RcdUREMEQgXHU2OEMwXHU2N0U1XHU1M0VGXHU3NTI4XHU5ODlDXHU4MjcyLi4uXCIsXG4gICAgbm9Db2xvcnNGb3VuZDogXCJcdTI3NEMgXHU4QkY3XHU1NzI4XHU3RjUxXHU3QUQ5XHU0RTBBXHU2MjUzXHU1RjAwXHU4QzAzXHU4MjcyXHU2NzdGXHU1NDBFXHU5MUNEXHU4QkQ1XHVGRjAxXCIsXG4gICAgY29sb3JzRm91bmQ6IFwiXHUyNzA1IFx1NjI3RVx1NTIzMCB7Y291bnR9IFx1NzlDRFx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3MlwiLFxuICAgIGxvYWRpbmdJbWFnZTogXCJcdUQ4M0RcdUREQkNcdUZFMEYgXHU2QjYzXHU1NzI4XHU1MkEwXHU4RjdEXHU1NkZFXHU3MjQ3Li4uXCIsXG4gICAgaW1hZ2VMb2FkZWQ6IFwiXHUyNzA1IFx1NTZGRVx1NzI0N1x1NURGMlx1NTJBMFx1OEY3RFx1RkYwQ1x1NjcwOVx1NjU0OFx1NTBDRlx1N0QyMCB7Y291bnR9IFx1NEUyQVwiLFxuICAgIGltYWdlRXJyb3I6IFwiXHUyNzRDIFx1NTZGRVx1NzI0N1x1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHU4QkY3XHU1NzI4XHU0RjYwXHU2MEYzXHU1RjAwXHU1OUNCXHU3RUQ4XHU1MjM2XHU3Njg0XHU1NzMwXHU2NUI5XHU2RDgyXHU3QjJDXHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHVGRjAxXCIsXG4gICAgd2FpdGluZ1Bvc2l0aW9uOiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTRGNjBcdTZEODJcdTUzQzJcdTgwMDNcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBwb3NpdGlvblNldDogXCJcdTI3MDUgXHU0RjREXHU3RjZFXHU4QkJFXHU3RjZFXHU2MjEwXHU1MjlGXHVGRjAxXCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTRGNERcdTdGNkVcdTkwMDlcdTYyRTlcdThEODVcdTY1RjZcIixcbiAgICBwb3NpdGlvbkRldGVjdGVkOiBcIlx1RDgzQ1x1REZBRiBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdTRGNERcdTdGNkVcdUZGMENcdTU5MDRcdTc0MDZcdTRFMkQuLi5cIixcbiAgICBwb3NpdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTRGNERcdTdGNkVcdTY4QzBcdTZENEJcdTU5MzFcdThEMjVcdUZGMENcdThCRjdcdTkxQ0RcdThCRDVcIixcbiAgICBzdGFydFBhaW50aW5nTXNnOiBcIlx1RDgzQ1x1REZBOCBcdTVGMDBcdTU5Q0JcdTdFRDhcdTUyMzYuLi5cIixcbiAgICBwYWludGluZ1Byb2dyZXNzOiBcIlx1RDgzRVx1RERGMSBcdThGREJcdTVFQTY6IHtwYWludGVkfS97dG90YWx9IFx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTIzMUIgXHU2Q0ExXHU2NzA5XHU2QjIxXHU2NTcwXHUzMDAyXHU3QjQ5XHU1Rjg1IHt0aW1lfS4uLlwiLFxuICAgIHBhaW50aW5nU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHU3NTI4XHU2MjM3XHU1REYyXHU1MDVDXHU2QjYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgcGFpbnRpbmdDb21wbGV0ZTogXCJcdTI3MDUgXHU3RUQ4XHU1MjM2XHU1QjhDXHU2MjEwXHVGRjAxXHU1MTcxXHU3RUQ4XHU1MjM2IHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwXHUzMDAyXCIsXG4gICAgcGFpbnRpbmdFcnJvcjogXCJcdTI3NEMgXHU3RUQ4XHU1MjM2XHU4RkM3XHU3QTBCXHU0RTJEXHU1MUZBXHU5NTE5XCIsXG4gICAgbWlzc2luZ1JlcXVpcmVtZW50czogXCJcdTI3NEMgXHU4QkY3XHU1MTQ4XHU1MkEwXHU4RjdEXHU1NkZFXHU3MjQ3XHU1RTc2XHU5MDA5XHU2MkU5XHU0RjREXHU3RjZFXCIsXG4gICAgcHJvZ3Jlc3M6IFwiXHU4RkRCXHU1RUE2XCIsXG4gICAgdXNlck5hbWU6IFwiXHU3NTI4XHU2MjM3XCIsXG4gICAgcGl4ZWxzOiBcIlx1NTBDRlx1N0QyMFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgZXN0aW1hdGVkVGltZTogXCJcdTk4ODRcdThCQTFcdTY1RjZcdTk1RjRcIixcbiAgICBpbml0TWVzc2FnZTogXCJcdTcwQjlcdTUxRkJcdTIwMUNcdTUyMURcdTU5Q0JcdTUzMTZcdTgxRUFcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkFcdTIwMURcdTVGMDBcdTU5Q0JcIixcbiAgICB3YWl0aW5nSW5pdDogXCJcdTdCNDlcdTVGODVcdTUyMURcdTU5Q0JcdTUzMTYuLi5cIixcbiAgICByZXNpemVTdWNjZXNzOiBcIlx1MjcwNSBcdTU2RkVcdTcyNDdcdTVERjJcdThDMDNcdTY1NzRcdTRFM0Ege3dpZHRofXh7aGVpZ2h0fVwiLFxuICAgIHBhaW50aW5nUGF1c2VkOiBcIlx1MjNGOFx1RkUwRiBcdTdFRDhcdTUyMzZcdTY2ODJcdTUwNUNcdTRFOEVcdTRGNERcdTdGNkUgWDoge3h9LCBZOiB7eX1cIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcdTY1NzBcIixcbiAgICBiYXRjaFNpemU6IFwiXHU2Mjc5XHU2QjIxXHU1OTI3XHU1QzBGXCIsXG4gICAgbmV4dEJhdGNoVGltZTogXCJcdTRFMEJcdTZCMjFcdTYyNzlcdTZCMjFcdTY1RjZcdTk1RjRcIixcbiAgICB1c2VBbGxDaGFyZ2VzOiBcIlx1NEY3Rlx1NzUyOFx1NjI0MFx1NjcwOVx1NTNFRlx1NzUyOFx1NkIyMVx1NjU3MFwiLFxuICAgIHNob3dPdmVybGF5OiBcIlx1NjYzRVx1NzkzQVx1ODk4Nlx1NzZENlx1NUM0MlwiLFxuICAgIG1heENoYXJnZXM6IFwiXHU2QkNGXHU2Mjc5XHU2NzAwXHU1OTI3XHU2QjIxXHU2NTcwXCIsXG4gICAgd2FpdGluZ0ZvckNoYXJnZXM6IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3MDoge2N1cnJlbnR9L3tuZWVkZWR9XCIsXG4gICAgdGltZVJlbWFpbmluZzogXCJcdTUyNjlcdTRGNTlcdTY1RjZcdTk1RjRcIixcbiAgICBjb29sZG93bldhaXRpbmc6IFwiXHUyM0YzIFx1N0I0OVx1NUY4NSB7dGltZX0gXHU1NDBFXHU3RUU3XHU3RUVELi4uXCIsXG4gICAgcHJvZ3Jlc3NTYXZlZDogXCJcdTI3MDUgXHU4RkRCXHU1RUE2XHU1REYyXHU0RkREXHU1QjU4XHU0RTNBIHtmaWxlbmFtZX1cIixcbiAgICBwcm9ncmVzc0xvYWRlZDogXCJcdTI3MDUgXHU1REYyXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjBcdTVERjJcdTdFRDhcdTUyMzZcIixcbiAgICBwcm9ncmVzc0xvYWRFcnJvcjogXCJcdTI3NEMgXHU1MkEwXHU4RjdEXHU4RkRCXHU1RUE2XHU1OTMxXHU4RDI1OiB7ZXJyb3J9XCIsXG4gICAgcHJvZ3Jlc3NTYXZlRXJyb3I6IFwiXHUyNzRDIFx1NEZERFx1NUI1OFx1OEZEQlx1NUVBNlx1NTkzMVx1OEQyNToge2Vycm9yfVwiLFxuICAgIGNvbmZpcm1TYXZlUHJvZ3Jlc3M6IFwiXHU1NzI4XHU1MDVDXHU2QjYyXHU0RTRCXHU1MjREXHU4OTgxXHU0RkREXHU1QjU4XHU1RjUzXHU1MjREXHU4RkRCXHU1RUE2XHU1NDE3XHVGRjFGXCIsXG4gICAgc2F2ZVByb2dyZXNzVGl0bGU6IFwiXHU0RkREXHU1QjU4XHU4RkRCXHU1RUE2XCIsXG4gICAgZGlzY2FyZFByb2dyZXNzOiBcIlx1NjUzRVx1NUYwM1wiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBtaW5pbWl6ZTogXCJcdTY3MDBcdTVDMEZcdTUzMTZcIixcbiAgICB3aWR0aDogXCJcdTVCQkRcdTVFQTZcIixcbiAgICBoZWlnaHQ6IFwiXHU5QUQ4XHU1RUE2XCIsXG4gICAga2VlcEFzcGVjdDogXCJcdTRGRERcdTYzMDFcdTdFQjVcdTZBMkFcdTZCRDRcIixcbiAgICBhcHBseTogXCJcdTVFOTRcdTc1MjhcIixcbiAgICBvdmVybGF5T246IFwiXHU4OTg2XHU3NkQ2XHU1QzQyOiBcdTVGMDBcdTU0MkZcIixcbiAgICBvdmVybGF5T2ZmOiBcIlx1ODk4Nlx1NzZENlx1NUM0MjogXHU1MTczXHU5NUVEXCIsXG4gICAgcGFzc0NvbXBsZXRlZDogXCJcdTI3MDUgXHU2Mjc5XHU2QjIxXHU1QjhDXHU2MjEwOiBcdTVERjJcdTdFRDhcdTUyMzYge3BhaW50ZWR9IFx1NTBDRlx1N0QyMCB8IFx1OEZEQlx1NUVBNjoge3BlcmNlbnR9JSAoe2N1cnJlbnR9L3t0b3RhbH0pXCIsXG4gICAgd2FpdGluZ0NoYXJnZXNSZWdlbjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTcwXHU2MDYyXHU1OTBEOiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTY1RjZcdTk1RjQ6IHt0aW1lfVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzQ291bnRkb3duOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1NzA6IHtjdXJyZW50fS97bmVlZGVkfSAtIFx1NTI2OVx1NEY1OToge3RpbWV9XCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHU2QjYzXHU1NzI4XHU4MUVBXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTgxRUFcdTUyQThcdTU0MkZcdTUyQThcdTYyMTBcdTUyOUZcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHU2NUUwXHU2Q0Q1XHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHVGRjBDXHU4QkY3XHU2MjRCXHU1MkE4XHU2NENEXHU0RjVDXHUzMDAyXCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTY4QzBcdTZENEJcdTUyMzBcdThDMDNcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEMwM1x1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1NzBCOVx1NTFGQlx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0VEOFx1NTIzNlx1NjMwOVx1OTRBRVwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcmV0cnlBdHRlbXB0OiBcIlx1RDgzRFx1REQwNCBcdTkxQ0RcdThCRDUge2F0dGVtcHR9L3ttYXhBdHRlbXB0c31cdUZGMENcdTdCNDlcdTVGODUge2RlbGF5fSBcdTc5RDIuLi5cIixcbiAgICByZXRyeUVycm9yOiBcIlx1RDgzRFx1RENBNSBcdTdCMkMge2F0dGVtcHR9L3ttYXhBdHRlbXB0c30gXHU2QjIxXHU1QzFEXHU4QkQ1XHU1MUZBXHU5NTE5XHVGRjBDXHU1QzA2XHU1NzI4IHtkZWxheX0gXHU3OUQyXHU1NDBFXHU5MUNEXHU4QkQ1Li4uXCIsXG4gICAgcmV0cnlGYWlsZWQ6IFwiXHUyNzRDIFx1OEQ4NVx1OEZDNyB7bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NUMxRFx1OEJENVx1NTkzMVx1OEQyNVx1MzAwMlx1N0VFN1x1N0VFRFx1NEUwQlx1NEUwMFx1NjI3OS4uLlwiLFxuICAgIG5ldHdvcmtFcnJvcjogXCJcdUQ4M0NcdURGMTAgXHU3RjUxXHU3RURDXHU5NTE5XHU4QkVGXHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QkQ1Li4uXCIsXG4gICAgc2VydmVyRXJyb3I6IFwiXHVEODNEXHVERDI1IFx1NjcwRFx1NTJBMVx1NTY2OFx1OTUxOVx1OEJFRlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEJENS4uLlwiLFxuICAgIHRpbWVvdXRFcnJvcjogXCJcdTIzRjAgXHU2NzBEXHU1MkExXHU1NjY4XHU4RDg1XHU2NUY2XHVGRjBDXHU2QjYzXHU1NzI4XHU5MUNEXHU4QkQ1Li4uXCJcbiAgfSxcblxuICAvLyBcdTUxOUNcdTU3M0FcdTZBMjFcdTU3NTdcdUZGMDhcdTVGODVcdTVCOUVcdTczQjBcdUZGMDlcbiAgZmFybToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTUxOUNcdTU3M0FcdTY3M0FcdTU2NjhcdTRFQkFcIixcbiAgICBzdGFydDogXCJcdTVGMDBcdTU5Q0JcIixcbiAgICBzdG9wOiBcIlx1NTA1Q1x1NkI2MlwiLFxuICAgIHN0b3BwZWQ6IFwiXHU2NzNBXHU1NjY4XHU0RUJBXHU1REYyXHU1MDVDXHU2QjYyXCIsXG4gICAgY2FsaWJyYXRlOiBcIlx1NjgyMVx1NTFDNlwiLFxuICAgIHBhaW50T25jZTogXCJcdTRFMDBcdTZCMjFcIixcbiAgICBjaGVja2luZ1N0YXR1czogXCJcdTY4QzBcdTY3RTVcdTcyQjZcdTYwMDFcdTRFMkQuLi5cIixcbiAgICBjb25maWd1cmF0aW9uOiBcIlx1OTE0RFx1N0Y2RVwiLFxuICAgIGRlbGF5OiBcIlx1NUVGNlx1OEZERiAoXHU2QkVCXHU3OUQyKVwiLFxuICAgIHBpeGVsc1BlckJhdGNoOiBcIlx1NkJDRlx1NjI3OVx1NTBDRlx1N0QyMFwiLFxuICAgIG1pbkNoYXJnZXM6IFwiXHU2NzAwXHU1QzExXHU2QjIxXHU2NTcwXCIsXG4gICAgY29sb3JNb2RlOiBcIlx1OTg5Q1x1ODI3Mlx1NkEyMVx1NUYwRlwiLFxuICAgIHJhbmRvbTogXCJcdTk2OEZcdTY3M0FcIixcbiAgICBmaXhlZDogXCJcdTU2RkFcdTVCOUFcIixcbiAgICByYW5nZTogXCJcdTgzMDNcdTU2RjRcIixcbiAgICBmaXhlZENvbG9yOiBcIlx1NTZGQVx1NUI5QVx1OTg5Q1x1ODI3MlwiLFxuICAgIGFkdmFuY2VkOiBcIlx1OUFEOFx1N0VBN1wiLFxuICAgIHRpbGVYOiBcIlx1NzRFNlx1NzI0NyBYXCIsXG4gICAgdGlsZVk6IFwiXHU3NEU2XHU3MjQ3IFlcIixcbiAgICBjdXN0b21QYWxldHRlOiBcIlx1ODFFQVx1NUI5QVx1NEU0OVx1OEMwM1x1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVFeGFtcGxlOiBcIlx1NEY4Qlx1NTk4MjogI0ZGMDAwMCwjMDBGRjAwLCMwMDAwRkZcIixcbiAgICBjYXB0dXJlOiBcIlx1NjM1NVx1ODNCN1wiLFxuICAgIHBhaW50ZWQ6IFwiXHU1REYyXHU3RUQ4XHU1MjM2XCIsXG4gICAgY2hhcmdlczogXCJcdTZCMjFcdTY1NzBcIixcbiAgICByZXRyaWVzOiBcIlx1OTFDRFx1OEJENVwiLFxuICAgIHRpbGU6IFwiXHU3NEU2XHU3MjQ3XCIsXG4gICAgY29uZmlnU2F2ZWQ6IFwiXHU5MTREXHU3RjZFXHU1REYyXHU0RkREXHU1QjU4XCIsXG4gICAgY29uZmlnTG9hZGVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NTJBMFx1OEY3RFwiLFxuICAgIGNvbmZpZ1Jlc2V0OiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1OTFDRFx1N0Y2RVwiLFxuICAgIGNhcHR1cmVJbnN0cnVjdGlvbnM6IFwiXHU4QkY3XHU2MjRCXHU1MkE4XHU3RUQ4XHU1MjM2XHU0RTAwXHU0RTJBXHU1MENGXHU3RDIwXHU0RUU1XHU2MzU1XHU4M0I3XHU1NzUwXHU2ODA3Li4uXCIsXG4gICAgYmFja2VuZE9ubGluZTogXCJcdTU0MEVcdTdBRUZcdTU3MjhcdTdFQkZcIixcbiAgICBiYWNrZW5kT2ZmbGluZTogXCJcdTU0MEVcdTdBRUZcdTc5QkJcdTdFQkZcIixcbiAgICBzdGFydGluZ0JvdDogXCJcdTZCNjNcdTU3MjhcdTU0MkZcdTUyQThcdTY3M0FcdTU2NjhcdTRFQkEuLi5cIixcbiAgICBzdG9wcGluZ0JvdDogXCJcdTZCNjNcdTU3MjhcdTUwNUNcdTZCNjJcdTY3M0FcdTU2NjhcdTRFQkEuLi5cIixcbiAgICBjYWxpYnJhdGluZzogXCJcdTY4MjFcdTUxQzZcdTRFMkQuLi5cIixcbiAgICBhbHJlYWR5UnVubmluZzogXCJcdTgxRUFcdTUyQThcdTUxOUNcdTU3M0FcdTVERjJcdTU3MjhcdThGRDBcdTg4NENcdTMwMDJcIixcbiAgICBpbWFnZVJ1bm5pbmdXYXJuaW5nOiBcIlx1ODFFQVx1NTJBOFx1N0VEOFx1NTZGRVx1NkI2M1x1NTcyOFx1OEZEMFx1ODg0Q1x1RkYwQ1x1OEJGN1x1NTE0OFx1NTE3M1x1OTVFRFx1NTE4RFx1NTQyRlx1NTJBOFx1ODFFQVx1NTJBOFx1NTE5Q1x1NTczQVx1MzAwMlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uQWxlcnQ6IFwiXHVEODNDXHVERkFGIFx1NTcyOFx1NTczMFx1NTZGRVx1NzY4NFx1N0E3QVx1NzY3RFx1NTMzQVx1NTdERlx1NkQ4Mlx1NEUwMFx1NEUyQVx1NTBDRlx1N0QyMFx1NEVFNVx1OEJCRVx1N0Y2RVx1NTE5Q1x1NTczQVx1NTMzQVx1NTdERlwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU2RDgyXHU1M0MyXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NTMzQVx1NTdERlx1OEJCRVx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVx1NTM0QVx1NUY4NDogNTAwcHhcIixcbiAgICBwb3NpdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1NTMzQVx1NTdERlx1OTAwOVx1NjJFOVx1OEQ4NVx1NjVGNlwiLFxuICAgIG1pc3NpbmdQb3NpdGlvbjogXCJcdTI3NEMgXHU4QkY3XHU1MTQ4XHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHVGRjA4XHU0RjdGXHU3NTI4XHUyMDFDXHU5MDA5XHU2MkU5XHU1MzNBXHU1N0RGXHUyMDFEXHU2MzA5XHU5NEFFXHVGRjA5XCIsXG4gICAgZmFybVJhZGl1czogXCJcdTUxOUNcdTU3M0FcdTUzNEFcdTVGODRcIixcbiAgICBwb3NpdGlvbkluZm86IFwiXHU1RjUzXHU1MjREXHU1MzNBXHU1N0RGXCIsXG4gICAgZmFybWluZ0luUmFkaXVzOiBcIlx1RDgzQ1x1REYzRSBcdTZCNjNcdTU3MjhcdTRFRTVcdTUzNEFcdTVGODQge3JhZGl1c31weCBcdTU3MjggKHt4fSx7eX0pIFx1NTE5Q1x1NTczQVwiLFxuICAgIHNlbGVjdEVtcHR5QXJlYTogXCJcdTI2QTBcdUZFMEYgXHU5MUNEXHU4OTgxOiBcdThCRjdcdTkwMDlcdTYyRTlcdTdBN0FcdTc2N0RcdTUzM0FcdTU3REZcdTRFRTVcdTkwN0ZcdTUxNERcdTUxQjJcdTdBODFcIixcbiAgICBub1Bvc2l0aW9uOiBcIlx1NjcyQVx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIGN1cnJlbnRab25lOiBcIlx1NTMzQVx1NTdERjogKHt4fSx7eX0pXCIsXG4gICAgYXV0b1NlbGVjdFBvc2l0aW9uOiBcIlx1RDgzQ1x1REZBRiBcdThCRjdcdTUxNDhcdTkwMDlcdTYyRTlcdTUzM0FcdTU3REZcdUZGMENcdTU3MjhcdTU3MzBcdTU2RkVcdTRFMEFcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcdTRFRTVcdThCQkVcdTdGNkVcdTUxOUNcdTU3M0FcdTUzM0FcdTU3REZcIlxuICB9LFxuXG4gIC8vIFx1NTE2Q1x1NTE3MVxuICBjb21tb246IHtcbiAgICB5ZXM6IFwiXHU2NjJGXCIsXG4gICAgbm86IFwiXHU1NDI2XCIsXG4gICAgb2s6IFwiXHU3ODZFXHU4QkE0XCIsXG4gICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgIGNsb3NlOiBcIlx1NTE3M1x1OTVFRFwiLFxuICAgIHNhdmU6IFwiXHU0RkREXHU1QjU4XCIsXG4gICAgbG9hZDogXCJcdTUyQTBcdThGN0RcIixcbiAgICBkZWxldGU6IFwiXHU1MjIwXHU5NjY0XCIsXG4gICAgZWRpdDogXCJcdTdGMTZcdThGOTFcIixcbiAgICBzdGFydDogXCJcdTVGMDBcdTU5Q0JcIixcbiAgICBzdG9wOiBcIlx1NTA1Q1x1NkI2MlwiLFxuICAgIHBhdXNlOiBcIlx1NjY4Mlx1NTA1Q1wiLFxuICAgIHJlc3VtZTogXCJcdTdFRTdcdTdFRURcIixcbiAgICByZXNldDogXCJcdTkxQ0RcdTdGNkVcIixcbiAgICBzZXR0aW5nczogXCJcdThCQkVcdTdGNkVcIixcbiAgICBoZWxwOiBcIlx1NUUyRVx1NTJBOVwiLFxuICAgIGFib3V0OiBcIlx1NTE3M1x1NEU4RVwiLFxuICAgIGxhbmd1YWdlOiBcIlx1OEJFRFx1OEEwMFwiLFxuICAgIGxvYWRpbmc6IFwiXHU1MkEwXHU4RjdEXHU0RTJELi4uXCIsXG4gICAgZXJyb3I6IFwiXHU5NTE5XHU4QkVGXCIsXG4gICAgc3VjY2VzczogXCJcdTYyMTBcdTUyOUZcIixcbiAgICB3YXJuaW5nOiBcIlx1OEI2Nlx1NTQ0QVwiLFxuICAgIGluZm86IFwiXHU0RkUxXHU2MDZGXCIsXG4gICAgbGFuZ3VhZ2VDaGFuZ2VkOiBcIlx1OEJFRFx1OEEwMFx1NURGMlx1NTIwN1x1NjM2Mlx1NEUzQSB7bGFuZ3VhZ2V9XCJcbiAgfSxcblxuICAvLyBcdTVCODhcdTYyQTRcdTZBMjFcdTU3NTdcbiAgZ3VhcmQ6IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4MUVBXHU1MkE4XHU1Qjg4XHU2MkE0XCIsXG4gICAgaW5pdEJvdDogXCJcdTUyMURcdTU5Q0JcdTUzMTZcdTVCODhcdTYyQTRcdTY3M0FcdTU2NjhcdTRFQkFcIixcbiAgICBzZWxlY3RBcmVhOiBcIlx1OTAwOVx1NjJFOVx1NTMzQVx1NTdERlwiLFxuICAgIGNhcHR1cmVBcmVhOiBcIlx1NjM1NVx1ODNCN1x1NTMzQVx1NTdERlwiLFxuICAgIHN0YXJ0UHJvdGVjdGlvbjogXCJcdTVGMDBcdTU5Q0JcdTVCODhcdTYyQTRcIixcbiAgICBzdG9wUHJvdGVjdGlvbjogXCJcdTUwNUNcdTZCNjJcdTVCODhcdTYyQTRcIixcbiAgICB1cHBlckxlZnQ6IFwiXHU1REU2XHU0RTBBXHU4OUQyXCIsXG4gICAgbG93ZXJSaWdodDogXCJcdTUzRjNcdTRFMEJcdTg5RDJcIixcbiAgICBwcm90ZWN0ZWRQaXhlbHM6IFwiXHU1M0Q3XHU0RkREXHU2MkE0XHU1MENGXHU3RDIwXCIsXG4gICAgZGV0ZWN0ZWRDaGFuZ2VzOiBcIlx1NjhDMFx1NkQ0Qlx1NTIzMFx1NzY4NFx1NTNEOFx1NTMxNlwiLFxuICAgIHJlcGFpcmVkUGl4ZWxzOiBcIlx1NEZFRVx1NTkwRFx1NzY4NFx1NTBDRlx1N0QyMFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTcwXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNDXHVERkE4IFx1NjhDMFx1NjdFNVx1NTNFRlx1NzUyOFx1OTg5Q1x1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1OTg5Q1x1ODI3Mlx1RkYwQ1x1OEJGN1x1NTcyOFx1N0Y1MVx1N0FEOVx1NEUwQVx1NjI1M1x1NUYwMFx1OEMwM1x1ODI3Mlx1Njc3Rlx1MzAwMlwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTc5Q0RcdTUzRUZcdTc1MjhcdTk4OUNcdTgyNzJcIixcbiAgICBpbml0U3VjY2VzczogXCJcdTI3MDUgXHU1Qjg4XHU2MkE0XHU2NzNBXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU2MjEwXHU1MjlGXCIsXG4gICAgaW5pdEVycm9yOiBcIlx1Mjc0QyBcdTVCODhcdTYyQTRcdTY3M0FcdTU2NjhcdTRFQkFcdTUyMURcdTU5Q0JcdTUzMTZcdTU5MzFcdThEMjVcIixcbiAgICBpbnZhbGlkQ29vcmRzOiBcIlx1Mjc0QyBcdTU3NTBcdTY4MDdcdTY1RTBcdTY1NDhcIixcbiAgICBpbnZhbGlkQXJlYTogXCJcdTI3NEMgXHU1MzNBXHU1N0RGXHU2NUUwXHU2NTQ4XHVGRjBDXHU1REU2XHU0RTBBXHU4OUQyXHU1RkM1XHU5ODdCXHU1QzBGXHU0RThFXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgYXJlYVRvb0xhcmdlOiBcIlx1Mjc0QyBcdTUzM0FcdTU3REZcdThGQzdcdTU5Mjc6IHtzaXplfSBcdTUwQ0ZcdTdEMjAgKFx1NjcwMFx1NTkyNzoge21heH0pXCIsXG4gICAgY2FwdHVyaW5nQXJlYTogXCJcdUQ4M0RcdURDRjggXHU2MzU1XHU4M0I3XHU1Qjg4XHU2MkE0XHU1MzNBXHU1N0RGXHU0RTJELi4uXCIsXG4gICAgYXJlYUNhcHR1cmVkOiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdTYzNTVcdTgzQjdcdTYyMTBcdTUyOUY6IHtjb3VudH0gXHU1MENGXHU3RDIwXHU1M0Q3XHU0RkREXHU2MkE0XCIsXG4gICAgY2FwdHVyZUVycm9yOiBcIlx1Mjc0QyBcdTYzNTVcdTgzQjdcdTUzM0FcdTU3REZcdTUxRkFcdTk1MTk6IHtlcnJvcn1cIixcbiAgICBjYXB0dXJlRmlyc3Q6IFwiXHUyNzRDIFx1OEJGN1x1NTE0OFx1NjM1NVx1ODNCN1x1NEUwMFx1NEUyQVx1NUI4OFx1NjJBNFx1NTMzQVx1NTdERlwiLFxuICAgIHByb3RlY3Rpb25TdGFydGVkOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVCODhcdTYyQTRcdTVERjJcdTU0MkZcdTUyQTggLSBcdTUzM0FcdTU3REZcdTc2RDFcdTYzQTdcdTRFMkRcIixcbiAgICBwcm90ZWN0aW9uU3RvcHBlZDogXCJcdTIzRjlcdUZFMEYgXHU1Qjg4XHU2MkE0XHU1REYyXHU1MDVDXHU2QjYyXCIsXG4gICAgbm9DaGFuZ2VzOiBcIlx1MjcwNSBcdTUzM0FcdTU3REZcdTVCODlcdTUxNjggLSBcdTY3MkFcdTY4QzBcdTZENEJcdTUyMzBcdTUzRDhcdTUzMTZcIixcbiAgICBjaGFuZ2VzRGV0ZWN0ZWQ6IFwiXHVEODNEXHVERUE4IFx1NjhDMFx1NkQ0Qlx1NTIzMCB7Y291bnR9IFx1NEUyQVx1NTNEOFx1NTMxNlwiLFxuICAgIHJlcGFpcmluZzogXCJcdUQ4M0RcdURFRTBcdUZFMEYgXHU2QjYzXHU1NzI4XHU0RkVFXHU1OTBEIHtjb3VudH0gXHU0RTJBXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcmVwYWlyZWRTdWNjZXNzOiBcIlx1MjcwNSBcdTVERjJcdTYyMTBcdTUyOUZcdTRGRUVcdTU5MEQge2NvdW50fSBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICByZXBhaXJFcnJvcjogXCJcdTI3NEMgXHU0RkVFXHU1OTBEXHU1MUZBXHU5NTE5OiB7ZXJyb3J9XCIsXG4gICAgbm9DaGFyZ2VzOiBcIlx1MjZBMFx1RkUwRiBcdTZCMjFcdTY1NzBcdTRFMERcdThEQjNcdUZGMENcdTY1RTBcdTZDRDVcdTRGRUVcdTU5MERcIixcbiAgICBjaGVja2luZ0NoYW5nZXM6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjhDMFx1NjdFNVx1NTMzQVx1NTdERlx1NTNEOFx1NTMxNi4uLlwiLFxuICAgIGVycm9yQ2hlY2tpbmc6IFwiXHUyNzRDIFx1NjhDMFx1NjdFNVx1NTFGQVx1OTUxOToge2Vycm9yfVwiLFxuICAgIGd1YXJkQWN0aXZlOiBcIlx1RDgzRFx1REVFMVx1RkUwRiBcdTVCODhcdTYyQTRcdTRFMkQgLSBcdTUzM0FcdTU3REZcdTUzRDdcdTRGRERcdTYyQTRcIixcbiAgICBsYXN0Q2hlY2s6IFwiXHU0RTBBXHU2QjIxXHU2OEMwXHU2N0U1OiB7dGltZX1cIixcbiAgICBuZXh0Q2hlY2s6IFwiXHU0RTBCXHU2QjIxXHU2OEMwXHU2N0U1OiB7dGltZX0gXHU3OUQyXHU1NDBFXCIsXG4gICAgYXV0b0luaXRpYWxpemluZzogXCJcdUQ4M0VcdUREMTYgXHU2QjYzXHU1NzI4XHU4MUVBXHU1MkE4XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgYXV0b0luaXRTdWNjZXNzOiBcIlx1MjcwNSBcdTgxRUFcdTUyQThcdTU0MkZcdTUyQThcdTYyMTBcdTUyOUZcIixcbiAgICBhdXRvSW5pdEZhaWxlZDogXCJcdTI2QTBcdUZFMEYgXHU2NUUwXHU2Q0Q1XHU4MUVBXHU1MkE4XHU1NDJGXHU1MkE4XHVGRjBDXHU4QkY3XHU2MjRCXHU1MkE4XHU2NENEXHU0RjVDXHUzMDAyXCIsXG4gICAgbWFudWFsSW5pdFJlcXVpcmVkOiBcIlx1RDgzRFx1REQyNyBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyQThcdTUyMURcdTU5Q0JcdTUzMTZcIixcbiAgICBwYWxldHRlRGV0ZWN0ZWQ6IFwiXHVEODNDXHVERkE4IFx1NURGMlx1NjhDMFx1NkQ0Qlx1NTIzMFx1OEMwM1x1ODI3Mlx1Njc3RlwiLFxuICAgIHBhbGV0dGVOb3RGb3VuZDogXCJcdUQ4M0RcdUREMEQgXHU2QjYzXHU1NzI4XHU2NDFDXHU3RDIyXHU4QzAzXHU4MjcyXHU2NzdGLi4uXCIsXG4gICAgY2xpY2tpbmdQYWludEJ1dHRvbjogXCJcdUQ4M0RcdURDNDYgXHU2QjYzXHU1NzI4XHU3MEI5XHU1MUZCXHU3RUQ4XHU1MjM2XHU2MzA5XHU5NEFFLi4uXCIsXG4gICAgcGFpbnRCdXR0b25Ob3RGb3VuZDogXCJcdTI3NEMgXHU2NzJBXHU2MjdFXHU1MjMwXHU3RUQ4XHU1MjM2XHU2MzA5XHU5NEFFXCIsXG4gICAgc2VsZWN0VXBwZXJMZWZ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTk3MDBcdTg5ODFcdTRGRERcdTYyQTRcdTUzM0FcdTU3REZcdTc2ODRcdTVERTZcdTRFMEFcdTg5RDJcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICBzZWxlY3RMb3dlclJpZ2h0OiBcIlx1RDgzQ1x1REZBRiBcdTczQjBcdTU3MjhcdTU3MjhcdTUzRjNcdTRFMEJcdTg5RDJcdTZEODJcdTRFMDBcdTRFMkFcdTUwQ0ZcdTdEMjBcIixcbiAgICB3YWl0aW5nVXBwZXJMZWZ0OiBcIlx1RDgzRFx1REM0NiBcdTdCNDlcdTVGODVcdTkwMDlcdTYyRTlcdTVERTZcdTRFMEFcdTg5RDIuLi5cIixcbiAgICB3YWl0aW5nTG93ZXJSaWdodDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDA5XHU2MkU5XHU1M0YzXHU0RTBCXHU4OUQyLi4uXCIsXG4gICAgdXBwZXJMZWZ0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1ODNCN1x1NURFNlx1NEUwQVx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIGxvd2VyUmlnaHRDYXB0dXJlZDogXCJcdTI3MDUgXHU1REYyXHU2MzU1XHU4M0I3XHU1M0YzXHU0RTBCXHU4OUQyOiAoe3h9LCB7eX0pXCIsXG4gICAgc2VsZWN0aW9uVGltZW91dDogXCJcdTI3NEMgXHU5MDA5XHU2MkU5XHU4RDg1XHU2NUY2XCIsXG4gICAgc2VsZWN0aW9uRXJyb3I6IFwiXHUyNzRDIFx1OTAwOVx1NjJFOVx1NTFGQVx1OTUxOVx1RkYwQ1x1OEJGN1x1OTFDRFx1OEJENVwiXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHpoSGFudCA9IHtcbiAgLy8gXHU1NTUzXHU1MkQ1XHU1NjY4XG4gIGxhdW5jaGVyOiB7XG4gICAgdGl0bGU6ICdXUGxhY2UgXHU4MUVBXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBJyxcbiAgICBhdXRvRmFybTogJ1x1RDgzQ1x1REYzRSBcdTgxRUFcdTUyRDVcdThGQjJcdTU4MzQnLFxuICAgIGF1dG9JbWFnZTogJ1x1RDgzQ1x1REZBOCBcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTYnLFxuICAgIGF1dG9HdWFyZDogJ1x1RDgzRFx1REVFMVx1RkUwRiBcdTgxRUFcdTUyRDVcdTVCODhcdThCNzcnLFxuICAgIHNlbGVjdGlvbjogJ1x1OTA3OFx1NjRDNycsXG4gICAgdXNlcjogJ1x1NzUyOFx1NjIzNycsXG4gICAgY2hhcmdlczogJ1x1NkIyMVx1NjU3OCcsXG4gICAgYmFja2VuZDogJ1x1NUY4Q1x1N0FFRicsXG4gICAgZGF0YWJhc2U6ICdcdTY1NzhcdTY0REFcdTVFQUInLFxuICAgIHVwdGltZTogJ1x1OTA0Qlx1ODg0Q1x1NjY0Mlx1OTU5MycsXG4gICAgY2xvc2U6ICdcdTk1RENcdTk1ODknLFxuICAgIGxhdW5jaDogJ1x1NTU1M1x1NTJENScsXG4gICAgbG9hZGluZzogJ1x1NTJBMFx1OEYwOVx1NEUyRFx1MjAyNicsXG4gICAgZXhlY3V0aW5nOiAnXHU1N0Y3XHU4ODRDXHU0RTJEXHUyMDI2JyxcbiAgICBkb3dubG9hZGluZzogJ1x1NkI2M1x1NTcyOFx1NEUwQlx1OEYwOVx1ODE3M1x1NjcyQ1x1MjAyNicsXG4gICAgY2hvb3NlQm90OiAnXHU5MDc4XHU2NEM3XHU0RTAwXHU1MDBCXHU2QTVGXHU1NjY4XHU0RUJBXHU0RTI2XHU5RURFXHU2NENBXHU1NTUzXHU1MkQ1JyxcbiAgICByZWFkeVRvTGF1bmNoOiAnXHU2RTk2XHU1MDk5XHU1NTUzXHU1MkQ1JyxcbiAgICBsb2FkRXJyb3I6ICdcdTUyQTBcdThGMDlcdTkzMkZcdThBQTQnLFxuICAgIGxvYWRFcnJvck1zZzogJ1x1NzEyMVx1NkNENVx1NTJBMFx1OEYwOVx1NjI0MFx1OTA3OFx1NkE1Rlx1NTY2OFx1NEVCQVx1MzAwMlx1OEFDQlx1NkFBMlx1NjdFNVx1N0RCMlx1N0Q2MVx1OTAyM1x1NjNBNVx1NjIxNlx1OTFDRFx1OEE2Nlx1MzAwMicsXG4gICAgY2hlY2tpbmc6ICdcdUQ4M0RcdUREMDQgXHU2QUEyXHU2N0U1XHU0RTJELi4uJyxcbiAgICBvbmxpbmU6ICdcdUQ4M0RcdURGRTIgXHU1NzI4XHU3RERBJyxcbiAgICBvZmZsaW5lOiAnXHVEODNEXHVERDM0IFx1OTZFMlx1N0REQScsXG4gICAgb2s6ICdcdUQ4M0RcdURGRTIgXHU2QjYzXHU1RTM4JyxcbiAgICBlcnJvcjogJ1x1RDgzRFx1REQzNCBcdTkzMkZcdThBQTQnLFxuICAgIHVua25vd246ICctJ1xuICB9LFxuXG4gIC8vIFx1N0U2QVx1NTcxNlx1NkEyMVx1NTg0QVxuICBpbWFnZToge1xuICAgIHRpdGxlOiBcIldQbGFjZSBcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTZcIixcbiAgICBpbml0Qm90OiBcIlx1NTIxRFx1NTlDQlx1NTMxNlx1ODFFQVx1NTJENVx1NkE1Rlx1NTY2OFx1NEVCQVwiLFxuICAgIHVwbG9hZEltYWdlOiBcIlx1NEUwQVx1NTBCM1x1NTcxNlx1NzI0N1wiLFxuICAgIHJlc2l6ZUltYWdlOiBcIlx1OEFCRlx1NjU3NFx1NTcxNlx1NzI0N1x1NTkyN1x1NUMwRlwiLFxuICAgIHNlbGVjdFBvc2l0aW9uOiBcIlx1OTA3OFx1NjRDN1x1NEY0RFx1N0Y2RVwiLFxuICAgIHN0YXJ0UGFpbnRpbmc6IFwiXHU5NThCXHU1OUNCXHU3RTZBXHU4OEZEXCIsXG4gICAgc3RvcFBhaW50aW5nOiBcIlx1NTA1Q1x1NkI2Mlx1N0U2QVx1ODhGRFwiLFxuICAgIHNhdmVQcm9ncmVzczogXCJcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcIixcbiAgICBsb2FkUHJvZ3Jlc3M6IFwiXHU1MkEwXHU4RjA5XHU5MDMyXHU1RUE2XCIsXG4gICAgY2hlY2tpbmdDb2xvcnM6IFwiXHVEODNEXHVERDBEIFx1NkFBMlx1NjdFNVx1NTNFRlx1NzUyOFx1OTg0Rlx1ODI3Mi4uLlwiLFxuICAgIG5vQ29sb3JzRm91bmQ6IFwiXHUyNzRDIFx1OEFDQlx1NTcyOFx1N0RCMlx1N0FEOVx1NEUwQVx1NjI1M1x1OTU4Qlx1OEFCRlx1ODI3Mlx1Njc3Rlx1NUY4Q1x1OTFDRFx1OEE2Nlx1RkYwMVwiLFxuICAgIGNvbG9yc0ZvdW5kOiBcIlx1MjcwNSBcdTYyN0VcdTUyMzAge2NvdW50fSBcdTdBMkVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzJcIixcbiAgICBsb2FkaW5nSW1hZ2U6IFwiXHVEODNEXHVEREJDXHVGRTBGIFx1NkI2M1x1NTcyOFx1NTJBMFx1OEYwOVx1NTcxNlx1NzI0Ny4uLlwiLFxuICAgIGltYWdlTG9hZGVkOiBcIlx1MjcwNSBcdTU3MTZcdTcyNDdcdTVERjJcdTUyQTBcdThGMDlcdUZGMENcdTY3MDlcdTY1NDhcdTUwQ0ZcdTdEMjAge2NvdW50fSBcdTUwMEJcIixcbiAgICBpbWFnZUVycm9yOiBcIlx1Mjc0QyBcdTU3MTZcdTcyNDdcdTUyQTBcdThGMDlcdTU5MzFcdTY1NTdcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1OEFDQlx1NTcyOFx1NEY2MFx1NjBGM1x1OTU4Qlx1NTlDQlx1N0U2QVx1ODhGRFx1NzY4NFx1NTczMFx1NjVCOVx1NTg1N1x1N0IyQ1x1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1RkYwMVwiLFxuICAgIHdhaXRpbmdQb3NpdGlvbjogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU0RjYwXHU1ODU3XHU1M0MzXHU4MDAzXHU1MENGXHU3RDIwLi4uXCIsXG4gICAgcG9zaXRpb25TZXQ6IFwiXHUyNzA1IFx1NEY0RFx1N0Y2RVx1OEEyRFx1N0Y2RVx1NjIxMFx1NTI5Rlx1RkYwMVwiLFxuICAgIHBvc2l0aW9uVGltZW91dDogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU5MDc4XHU2NEM3XHU4RDg1XHU2NjQyXCIsXG4gICAgcG9zaXRpb25EZXRlY3RlZDogXCJcdUQ4M0NcdURGQUYgXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU0RjREXHU3RjZFXHVGRjBDXHU4NjU1XHU3NDA2XHU0RTJELi4uXCIsXG4gICAgcG9zaXRpb25FcnJvcjogXCJcdTI3NEMgXHU0RjREXHU3RjZFXHU2QUEyXHU2RTJDXHU1OTMxXHU2NTU3XHVGRjBDXHU4QUNCXHU5MUNEXHU4QTY2XCIsXG4gICAgc3RhcnRQYWludGluZ01zZzogXCJcdUQ4M0NcdURGQTggXHU5NThCXHU1OUNCXHU3RTZBXHU4OEZELi4uXCIsXG4gICAgcGFpbnRpbmdQcm9ncmVzczogXCJcdUQ4M0VcdURERjEgXHU5MDMyXHU1RUE2OiB7cGFpbnRlZH0ve3RvdGFsfSBcdTUwQ0ZcdTdEMjAuLi5cIixcbiAgICBub0NoYXJnZXM6IFwiXHUyMzFCIFx1NkM5Mlx1NjcwOVx1NkIyMVx1NjU3OFx1MzAwMlx1N0I0OVx1NUY4NSB7dGltZX0uLi5cIixcbiAgICBwYWludGluZ1N0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NzUyOFx1NjIzN1x1NURGMlx1NTA1Q1x1NkI2Mlx1N0U2QVx1ODhGRFwiLFxuICAgIHBhaW50aW5nQ29tcGxldGU6IFwiXHUyNzA1IFx1N0U2QVx1ODhGRFx1NUI4Q1x1NjIxMFx1RkYwMVx1NTE3MVx1N0U2QVx1ODhGRCB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMFx1MzAwMlwiLFxuICAgIHBhaW50aW5nRXJyb3I6IFwiXHUyNzRDIFx1N0U2QVx1ODhGRFx1OTA0RVx1N0EwQlx1NEUyRFx1NTFGQVx1OTMyRlwiLFxuICAgIG1pc3NpbmdSZXF1aXJlbWVudHM6IFwiXHUyNzRDIFx1OEFDQlx1NTE0OFx1NTJBMFx1OEYwOVx1NTcxNlx1NzI0N1x1NEUyNlx1OTA3OFx1NjRDN1x1NEY0RFx1N0Y2RVwiLFxuICAgIHByb2dyZXNzOiBcIlx1OTAzMlx1NUVBNlwiLFxuICAgIHVzZXJOYW1lOiBcIlx1NzUyOFx1NjIzN1wiLFxuICAgIHBpeGVsczogXCJcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIGVzdGltYXRlZFRpbWU6IFwiXHU5ODEwXHU4QTA4XHU2NjQyXHU5NTkzXCIsXG4gICAgaW5pdE1lc3NhZ2U6IFwiXHU5RURFXHU2NENBXHUyMDFDXHU1MjFEXHU1OUNCXHU1MzE2XHU4MUVBXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBXHUyMDFEXHU5NThCXHU1OUNCXCIsXG4gICAgd2FpdGluZ0luaXQ6IFwiXHU3QjQ5XHU1Rjg1XHU1MjFEXHU1OUNCXHU1MzE2Li4uXCIsXG4gICAgcmVzaXplU3VjY2VzczogXCJcdTI3MDUgXHU1NzE2XHU3MjQ3XHU1REYyXHU4QUJGXHU2NTc0XHU3MEJBIHt3aWR0aH14e2hlaWdodH1cIixcbiAgICBwYWludGluZ1BhdXNlZDogXCJcdTIzRjhcdUZFMEYgXHU3RTZBXHU4OEZEXHU2NkFCXHU1MDVDXHU2NUJDXHU0RjREXHU3RjZFIFg6IHt4fSwgWToge3l9XCIsXG4gICAgcGl4ZWxzUGVyQmF0Y2g6IFwiXHU2QkNGXHU2Mjc5XHU1MENGXHU3RDIwXHU2NTc4XCIsXG4gICAgYmF0Y2hTaXplOiBcIlx1NjI3OVx1NkIyMVx1NTkyN1x1NUMwRlwiLFxuICAgIG5leHRCYXRjaFRpbWU6IFwiXHU0RTBCXHU2QjIxXHU2Mjc5XHU2QjIxXHU2NjQyXHU5NTkzXCIsXG4gICAgdXNlQWxsQ2hhcmdlczogXCJcdTRGN0ZcdTc1MjhcdTYyNDBcdTY3MDlcdTUzRUZcdTc1MjhcdTZCMjFcdTY1NzhcIixcbiAgICBzaG93T3ZlcmxheTogXCJcdTk4NkZcdTc5M0FcdTg5ODZcdTg0Q0JcdTVDNjRcIixcbiAgICBtYXhDaGFyZ2VzOiBcIlx1NkJDRlx1NjI3OVx1NjcwMFx1NTkyN1x1NkIyMVx1NjU3OFwiLFxuICAgIHdhaXRpbmdGb3JDaGFyZ2VzOiBcIlx1MjNGMyBcdTdCNDlcdTVGODVcdTZCMjFcdTY1Nzg6IHtjdXJyZW50fS97bmVlZGVkfVwiLFxuICAgIHRpbWVSZW1haW5pbmc6IFwiXHU1MjY5XHU5OTE4XHU2NjQyXHU5NTkzXCIsXG4gICAgY29vbGRvd25XYWl0aW5nOiBcIlx1MjNGMyBcdTdCNDlcdTVGODUge3RpbWV9IFx1NUY4Q1x1N0U3Q1x1N0U4Qy4uLlwiLFxuICAgIHByb2dyZXNzU2F2ZWQ6IFwiXHUyNzA1IFx1OTAzMlx1NUVBNlx1NURGMlx1NEZERFx1NUI1OFx1NzBCQSB7ZmlsZW5hbWV9XCIsXG4gICAgcHJvZ3Jlc3NMb2FkZWQ6IFwiXHUyNzA1IFx1NURGMlx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNjoge3BhaW50ZWR9L3t0b3RhbH0gXHU1MENGXHU3RDIwXHU1REYyXHU3RTZBXHU4OEZEXCIsXG4gICAgcHJvZ3Jlc3NMb2FkRXJyb3I6IFwiXHUyNzRDIFx1NTJBMFx1OEYwOVx1OTAzMlx1NUVBNlx1NTkzMVx1NjU1Nzoge2Vycm9yfVwiLFxuICAgIHByb2dyZXNzU2F2ZUVycm9yOiBcIlx1Mjc0QyBcdTRGRERcdTVCNThcdTkwMzJcdTVFQTZcdTU5MzFcdTY1NTc6IHtlcnJvcn1cIixcbiAgICBjb25maXJtU2F2ZVByb2dyZXNzOiBcIlx1NTcyOFx1NTA1Q1x1NkI2Mlx1NEU0Qlx1NTI0RFx1ODk4MVx1NEZERFx1NUI1OFx1NzU3Nlx1NTI0RFx1OTAzMlx1NUVBNlx1NTVDRVx1RkYxRlwiLFxuICAgIHNhdmVQcm9ncmVzc1RpdGxlOiBcIlx1NEZERFx1NUI1OFx1OTAzMlx1NUVBNlwiLFxuICAgIGRpc2NhcmRQcm9ncmVzczogXCJcdTY1M0VcdTY4QzRcIixcbiAgICBjYW5jZWw6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgbWluaW1pemU6IFwiXHU2NzAwXHU1QzBGXHU1MzE2XCIsXG4gICAgd2lkdGg6IFwiXHU1QkVDXHU1RUE2XCIsXG4gICAgaGVpZ2h0OiBcIlx1OUFEOFx1NUVBNlwiLFxuICAgIGtlZXBBc3BlY3Q6IFwiXHU0RkREXHU2MzAxXHU3RTMxXHU2QTZCXHU2QkQ0XCIsXG4gICAgYXBwbHk6IFwiXHU2MUM5XHU3NTI4XCIsXG4gICAgb3ZlcmxheU9uOiBcIlx1ODk4Nlx1ODRDQlx1NUM2NDogXHU5NThCXHU1NTUzXCIsXG4gICAgb3ZlcmxheU9mZjogXCJcdTg5ODZcdTg0Q0JcdTVDNjQ6IFx1OTVEQ1x1OTU4OVwiLFxuICAgIHBhc3NDb21wbGV0ZWQ6IFwiXHUyNzA1IFx1NjI3OVx1NkIyMVx1NUI4Q1x1NjIxMDogXHU1REYyXHU3RTZBXHU4OEZEIHtwYWludGVkfSBcdTUwQ0ZcdTdEMjAgfCBcdTkwMzJcdTVFQTY6IHtwZXJjZW50fSUgKHtjdXJyZW50fS97dG90YWx9KVwiLFxuICAgIHdhaXRpbmdDaGFyZ2VzUmVnZW46IFwiXHUyM0YzIFx1N0I0OVx1NUY4NVx1NkIyMVx1NjU3OFx1NjA2Mlx1NUZBOToge2N1cnJlbnR9L3tuZWVkZWR9IC0gXHU2NjQyXHU5NTkzOiB7dGltZX1cIixcbiAgICB3YWl0aW5nQ2hhcmdlc0NvdW50ZG93bjogXCJcdTIzRjMgXHU3QjQ5XHU1Rjg1XHU2QjIxXHU2NTc4OiB7Y3VycmVudH0ve25lZWRlZH0gLSBcdTUyNjlcdTk5MTg6IHt0aW1lfVwiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkQ1XHU1NTUzXHU1MkQ1XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NzEyMVx1NkNENVx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1RkYwQ1x1OEFDQlx1NjI0Qlx1NTJENVx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIHBhbGV0dGVEZXRlY3RlZDogXCJcdUQ4M0NcdURGQTggXHU1REYyXHU2QUEyXHU2RTJDXHU1MjMwXHU4QUJGXHU4MjcyXHU2NzdGXCIsXG4gICAgcGFsZXR0ZU5vdEZvdW5kOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTY0MUNcdTdEMjJcdThBQkZcdTgyNzJcdTY3N0YuLi5cIixcbiAgICBjbGlja2luZ1BhaW50QnV0dG9uOiBcIlx1RDgzRFx1REM0NiBcdTZCNjNcdTU3MjhcdTlFREVcdTY0Q0FcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTUuLi5cIixcbiAgICBwYWludEJ1dHRvbk5vdEZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTdFNkFcdTg4RkRcdTYzMDlcdTkyMTVcIixcbiAgICBtYW51YWxJbml0UmVxdWlyZWQ6IFwiXHVEODNEXHVERDI3IFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNlwiLFxuICAgIHJldHJ5QXR0ZW1wdDogXCJcdUQ4M0RcdUREMDQgXHU5MUNEXHU4QTY2IHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9XHVGRjBDXHU3QjQ5XHU1Rjg1IHtkZWxheX0gXHU3OUQyLi4uXCIsXG4gICAgcmV0cnlFcnJvcjogXCJcdUQ4M0RcdURDQTUgXHU3QjJDIHthdHRlbXB0fS97bWF4QXR0ZW1wdHN9IFx1NkIyMVx1NTYxN1x1OEE2Nlx1NTFGQVx1OTMyRlx1RkYwQ1x1NUMwN1x1NTcyOCB7ZGVsYXl9IFx1NzlEMlx1NUY4Q1x1OTFDRFx1OEE2Ni4uLlwiLFxuICAgIHJldHJ5RmFpbGVkOiBcIlx1Mjc0QyBcdThEODVcdTkwNEUge21heEF0dGVtcHRzfSBcdTZCMjFcdTU2MTdcdThBNjZcdTU5MzFcdTY1NTdcdTMwMDJcdTdFN0NcdTdFOENcdTRFMEJcdTRFMDBcdTYyNzkuLi5cIixcbiAgICBuZXR3b3JrRXJyb3I6IFwiXHVEODNDXHVERjEwIFx1N0RCMlx1N0Q2MVx1OTMyRlx1OEFBNFx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEE2Ni4uLlwiLFxuICAgIHNlcnZlckVycm9yOiBcIlx1RDgzRFx1REQyNSBcdTY3MERcdTUyRDlcdTU2NjhcdTkzMkZcdThBQTRcdUZGMENcdTZCNjNcdTU3MjhcdTkxQ0RcdThBNjYuLi5cIixcbiAgICB0aW1lb3V0RXJyb3I6IFwiXHUyM0YwIFx1NjcwRFx1NTJEOVx1NTY2OFx1OEQ4NVx1NjY0Mlx1RkYwQ1x1NkI2M1x1NTcyOFx1OTFDRFx1OEE2Ni4uLlwiXG4gIH0sXG5cbiAgLy8gXHU4RkIyXHU1ODM0XHU2QTIxXHU1ODRBXHVGRjA4XHU1Rjg1XHU1QkU2XHU3M0ZFXHVGRjA5XG4gIGZhcm06IHtcbiAgICB0aXRsZTogXCJXUGxhY2UgXHU4RkIyXHU1ODM0XHU2QTVGXHU1NjY4XHU0RUJBXCIsXG4gICAgc3RhcnQ6IFwiXHU5NThCXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBzdG9wcGVkOiBcIlx1NkE1Rlx1NTY2OFx1NEVCQVx1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIGNhbGlicmF0ZTogXCJcdTY4MjFcdTZFOTZcIixcbiAgICBwYWludE9uY2U6IFwiXHU0RTAwXHU2QjIxXCIsXG4gICAgY2hlY2tpbmdTdGF0dXM6IFwiXHU2QUEyXHU2N0U1XHU3MkMwXHU2MTRCXHU0RTJELi4uXCIsXG4gICAgY29uZmlndXJhdGlvbjogXCJcdTkxNERcdTdGNkVcIixcbiAgICBkZWxheTogXCJcdTVFRjZcdTkwNzIgKFx1NkJFQlx1NzlEMilcIixcbiAgICBwaXhlbHNQZXJCYXRjaDogXCJcdTZCQ0ZcdTYyNzlcdTUwQ0ZcdTdEMjBcIixcbiAgICBtaW5DaGFyZ2VzOiBcIlx1NjcwMFx1NUMxMVx1NkIyMVx1NjU3OFwiLFxuICAgIGNvbG9yTW9kZTogXCJcdTk4NEZcdTgyNzJcdTZBMjFcdTVGMEZcIixcbiAgICByYW5kb206IFwiXHU5NkE4XHU2QTVGXCIsXG4gICAgZml4ZWQ6IFwiXHU1NkZBXHU1QjlBXCIsXG4gICAgcmFuZ2U6IFwiXHU3QkM0XHU1NzBEXCIsXG4gICAgZml4ZWRDb2xvcjogXCJcdTU2RkFcdTVCOUFcdTk4NEZcdTgyNzJcIixcbiAgICBhZHZhbmNlZDogXCJcdTlBRDhcdTdEMUFcIixcbiAgICB0aWxlWDogXCJcdTc0RTZcdTcyNDcgWFwiLFxuICAgIHRpbGVZOiBcIlx1NzRFNlx1NzI0NyBZXCIsXG4gICAgY3VzdG9tUGFsZXR0ZTogXCJcdTgxRUFcdTVCOUFcdTdGQTlcdThBQkZcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlRXhhbXBsZTogXCJcdTRGOEJcdTU5ODI6ICNGRjAwMDAsIzAwRkYwMCwjMDAwMEZGXCIsXG4gICAgY2FwdHVyZTogXCJcdTYzNTVcdTczNzJcIixcbiAgICBwYWludGVkOiBcIlx1NURGMlx1N0U2QVx1ODhGRFwiLFxuICAgIGNoYXJnZXM6IFwiXHU2QjIxXHU2NTc4XCIsXG4gICAgcmV0cmllczogXCJcdTkxQ0RcdThBNjZcIixcbiAgICB0aWxlOiBcIlx1NzRFNlx1NzI0N1wiLFxuICAgIGNvbmZpZ1NhdmVkOiBcIlx1OTE0RFx1N0Y2RVx1NURGMlx1NEZERFx1NUI1OFwiLFxuICAgIGNvbmZpZ0xvYWRlZDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTUyQTBcdThGMDlcIixcbiAgICBjb25maWdSZXNldDogXCJcdTkxNERcdTdGNkVcdTVERjJcdTkxQ0RcdTdGNkVcIixcbiAgICBjYXB0dXJlSW5zdHJ1Y3Rpb25zOiBcIlx1OEFDQlx1NjI0Qlx1NTJENVx1N0U2QVx1ODhGRFx1NEUwMFx1NTAwQlx1NTBDRlx1N0QyMFx1NEVFNVx1NjM1NVx1NzM3Mlx1NUVBN1x1NkExOS4uLlwiLFxuICAgIGJhY2tlbmRPbmxpbmU6IFwiXHU1RjhDXHU3QUVGXHU1NzI4XHU3RERBXCIsXG4gICAgYmFja2VuZE9mZmxpbmU6IFwiXHU1RjhDXHU3QUVGXHU5NkUyXHU3RERBXCIsXG4gICAgc3RhcnRpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1NTUzXHU1MkQ1XHU2QTVGXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgc3RvcHBpbmdCb3Q6IFwiXHU2QjYzXHU1NzI4XHU1MDVDXHU2QjYyXHU2QTVGXHU1NjY4XHU0RUJBLi4uXCIsXG4gICAgY2FsaWJyYXRpbmc6IFwiXHU2ODIxXHU2RTk2XHU0RTJELi4uXCIsXG4gICAgYWxyZWFkeVJ1bm5pbmc6IFwiXHU4MUVBXHU1MkQ1XHU4RkIyXHU1ODM0XHU1REYyXHU1NzI4XHU5MDRCXHU4ODRDXHUzMDAyXCIsXG4gICAgaW1hZ2VSdW5uaW5nV2FybmluZzogXCJcdTgxRUFcdTUyRDVcdTdFNkFcdTU3MTZcdTZCNjNcdTU3MjhcdTkwNEJcdTg4NENcdUZGMENcdThBQ0JcdTUxNDhcdTk1RENcdTk1ODlcdTUxOERcdTU1NTNcdTUyRDVcdTgxRUFcdTUyRDVcdThGQjJcdTU4MzRcdTMwMDJcIixcbiAgICBzZWxlY3RQb3NpdGlvbjogXCJcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBzZWxlY3RQb3NpdGlvbkFsZXJ0OiBcIlx1RDgzQ1x1REZBRiBcdTU3MjhcdTU3MzBcdTU3MTZcdTc2ODRcdTdBN0FcdTc2N0RcdTUzNDBcdTU3REZcdTU4NTdcdTRFMDBcdTUwMEJcdTUwQ0ZcdTdEMjBcdTRFRTVcdThBMkRcdTdGNkVcdThGQjJcdTU4MzRcdTUzNDBcdTU3REZcIixcbiAgICB3YWl0aW5nUG9zaXRpb246IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1NEY2MFx1NTg1N1x1NTNDM1x1ODAwM1x1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHBvc2l0aW9uU2V0OiBcIlx1MjcwNSBcdTUzNDBcdTU3REZcdThBMkRcdTdGNkVcdTYyMTBcdTUyOUZcdUZGMDFcdTUzNEFcdTVGOTE6IDUwMHB4XCIsXG4gICAgcG9zaXRpb25UaW1lb3V0OiBcIlx1Mjc0QyBcdTUzNDBcdTU3REZcdTkwNzhcdTY0QzdcdThEODVcdTY2NDJcIixcbiAgICBtaXNzaW5nUG9zaXRpb246IFwiXHUyNzRDIFx1OEFDQlx1NTE0OFx1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1RkYwOFx1NEY3Rlx1NzUyOFx1MjAxQ1x1OTA3OFx1NjRDN1x1NTM0MFx1NTdERlx1MjAxRFx1NjMwOVx1OTIxNVx1RkYwOVwiLFxuICAgIGZhcm1SYWRpdXM6IFwiXHU4RkIyXHU1ODM0XHU1MzRBXHU1RjkxXCIsXG4gICAgcG9zaXRpb25JbmZvOiBcIlx1NzU3Nlx1NTI0RFx1NTM0MFx1NTdERlwiLFxuICAgIGZhcm1pbmdJblJhZGl1czogXCJcdUQ4M0NcdURGM0UgXHU2QjYzXHU1NzI4XHU0RUU1XHU1MzRBXHU1RjkxIHtyYWRpdXN9cHggXHU1NzI4ICh7eH0se3l9KSBcdThGQjJcdTU4MzRcIixcbiAgICBzZWxlY3RFbXB0eUFyZWE6IFwiXHUyNkEwXHVGRTBGIFx1OTFDRFx1ODk4MTogXHU4QUNCXHU5MDc4XHU2NEM3XHU3QTdBXHU3NjdEXHU1MzQwXHU1N0RGXHU0RUU1XHU5MDdGXHU1MTREXHU4ODVEXHU3QTgxXCIsXG4gICAgbm9Qb3NpdGlvbjogXCJcdTY3MkFcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBjdXJyZW50Wm9uZTogXCJcdTUzNDBcdTU3REY6ICh7eH0se3l9KVwiLFxuICAgIGF1dG9TZWxlY3RQb3NpdGlvbjogXCJcdUQ4M0NcdURGQUYgXHU4QUNCXHU1MTQ4XHU5MDc4XHU2NEM3XHU1MzQwXHU1N0RGXHVGRjBDXHU1NzI4XHU1NzMwXHU1NzE2XHU0RTBBXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXHU0RUU1XHU4QTJEXHU3RjZFXHU4RkIyXHU1ODM0XHU1MzQwXHU1N0RGXCJcbiAgfSxcblxuICAvLyBcdTUxNkNcdTUxNzFcbiAgY29tbW9uOiB7XG4gICAgeWVzOiBcIlx1NjYyRlwiLFxuICAgIG5vOiBcIlx1NTQyNlwiLFxuICAgIG9rOiBcIlx1NzhCQVx1OEE4RFwiLFxuICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICBjbG9zZTogXCJcdTk1RENcdTk1ODlcIixcbiAgICBzYXZlOiBcIlx1NEZERFx1NUI1OFwiLFxuICAgIGxvYWQ6IFwiXHU1MkEwXHU4RjA5XCIsXG4gICAgZGVsZXRlOiBcIlx1NTIyQVx1OTY2NFwiLFxuICAgIGVkaXQ6IFwiXHU3REU4XHU4RjJGXCIsXG4gICAgc3RhcnQ6IFwiXHU5NThCXHU1OUNCXCIsXG4gICAgc3RvcDogXCJcdTUwNUNcdTZCNjJcIixcbiAgICBwYXVzZTogXCJcdTY2QUJcdTUwNUNcIixcbiAgICByZXN1bWU6IFwiXHU3RTdDXHU3RThDXCIsXG4gICAgcmVzZXQ6IFwiXHU5MUNEXHU3RjZFXCIsXG4gICAgc2V0dGluZ3M6IFwiXHU4QTJEXHU3RjZFXCIsXG4gICAgaGVscDogXCJcdTVFNkJcdTUyQTlcIixcbiAgICBhYm91dDogXCJcdTk1RENcdTY1QkNcIixcbiAgICBsYW5ndWFnZTogXCJcdThBOUVcdThBMDBcIixcbiAgICBsb2FkaW5nOiBcIlx1NTJBMFx1OEYwOVx1NEUyRC4uLlwiLFxuICAgIGVycm9yOiBcIlx1OTMyRlx1OEFBNFwiLFxuICAgIHN1Y2Nlc3M6IFwiXHU2MjEwXHU1MjlGXCIsXG4gICAgd2FybmluZzogXCJcdThCNjZcdTU0NEFcIixcbiAgICBpbmZvOiBcIlx1NEZFMVx1NjA2RlwiLFxuICAgIGxhbmd1YWdlQ2hhbmdlZDogXCJcdThBOUVcdThBMDBcdTVERjJcdTUyMDdcdTYzREJcdTcwQkEge2xhbmd1YWdlfVwiXG4gIH0sXG5cbiAgLy8gXHU1Qjg4XHU4Qjc3XHU2QTIxXHU1ODRBXG4gIGd1YXJkOiB7XG4gICAgdGl0bGU6IFwiV1BsYWNlIFx1ODFFQVx1NTJENVx1NUI4OFx1OEI3N1wiLFxuICAgIGluaXRCb3Q6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XHU1Qjg4XHU4Qjc3XHU2QTVGXHU1NjY4XHU0RUJBXCIsXG4gICAgc2VsZWN0QXJlYTogXCJcdTkwNzhcdTY0QzdcdTUzNDBcdTU3REZcIixcbiAgICBjYXB0dXJlQXJlYTogXCJcdTYzNTVcdTczNzJcdTUzNDBcdTU3REZcIixcbiAgICBzdGFydFByb3RlY3Rpb246IFwiXHU5NThCXHU1OUNCXHU1Qjg4XHU4Qjc3XCIsXG4gICAgc3RvcFByb3RlY3Rpb246IFwiXHU1MDVDXHU2QjYyXHU1Qjg4XHU4Qjc3XCIsXG4gICAgdXBwZXJMZWZ0OiBcIlx1NURFNlx1NEUwQVx1ODlEMlwiLFxuICAgIGxvd2VyUmlnaHQ6IFwiXHU1M0YzXHU0RTBCXHU4OUQyXCIsXG4gICAgcHJvdGVjdGVkUGl4ZWxzOiBcIlx1NTNEN1x1NEZERFx1OEI3N1x1NTBDRlx1N0QyMFwiLFxuICAgIGRldGVjdGVkQ2hhbmdlczogXCJcdTZBQTJcdTZFMkNcdTUyMzBcdTc2ODRcdThCOEFcdTUzMTZcIixcbiAgICByZXBhaXJlZFBpeGVsczogXCJcdTRGRUVcdTVGQTlcdTc2ODRcdTUwQ0ZcdTdEMjBcIixcbiAgICBjaGFyZ2VzOiBcIlx1NkIyMVx1NjU3OFwiLFxuICAgIHdhaXRpbmdJbml0OiBcIlx1N0I0OVx1NUY4NVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGNoZWNraW5nQ29sb3JzOiBcIlx1RDgzQ1x1REZBOCBcdTZBQTJcdTY3RTVcdTUzRUZcdTc1MjhcdTk4NEZcdTgyNzIuLi5cIixcbiAgICBub0NvbG9yc0ZvdW5kOiBcIlx1Mjc0QyBcdTY3MkFcdTYyN0VcdTUyMzBcdTk4NEZcdTgyNzJcdUZGMENcdThBQ0JcdTU3MjhcdTdEQjJcdTdBRDlcdTRFMEFcdTYyNTNcdTk1OEJcdThBQkZcdTgyNzJcdTY3N0ZcdTMwMDJcIixcbiAgICBjb2xvcnNGb3VuZDogXCJcdTI3MDUgXHU2MjdFXHU1MjMwIHtjb3VudH0gXHU3QTJFXHU1M0VGXHU3NTI4XHU5ODRGXHU4MjcyXCIsXG4gICAgaW5pdFN1Y2Nlc3M6IFwiXHUyNzA1IFx1NUI4OFx1OEI3N1x1NkE1Rlx1NTY2OFx1NEVCQVx1NTIxRFx1NTlDQlx1NTMxNlx1NjIxMFx1NTI5RlwiLFxuICAgIGluaXRFcnJvcjogXCJcdTI3NEMgXHU1Qjg4XHU4Qjc3XHU2QTVGXHU1NjY4XHU0RUJBXHU1MjFEXHU1OUNCXHU1MzE2XHU1OTMxXHU2NTU3XCIsXG4gICAgaW52YWxpZENvb3JkczogXCJcdTI3NEMgXHU1RUE3XHU2QTE5XHU3MTIxXHU2NTQ4XCIsXG4gICAgaW52YWxpZEFyZWE6IFwiXHUyNzRDIFx1NTM0MFx1NTdERlx1NzEyMVx1NjU0OFx1RkYwQ1x1NURFNlx1NEUwQVx1ODlEMlx1NUZDNVx1OTgwOFx1NUMwRlx1NjVCQ1x1NTNGM1x1NEUwQlx1ODlEMlwiLFxuICAgIGFyZWFUb29MYXJnZTogXCJcdTI3NEMgXHU1MzQwXHU1N0RGXHU5MDRFXHU1OTI3OiB7c2l6ZX0gXHU1MENGXHU3RDIwIChcdTY3MDBcdTU5Mjc6IHttYXh9KVwiLFxuICAgIGNhcHR1cmluZ0FyZWE6IFwiXHVEODNEXHVEQ0Y4IFx1NjM1NVx1NzM3Mlx1NUI4OFx1OEI3N1x1NTM0MFx1NTdERlx1NEUyRC4uLlwiLFxuICAgIGFyZWFDYXB0dXJlZDogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU2MzU1XHU3MzcyXHU2MjEwXHU1MjlGOiB7Y291bnR9IFx1NTBDRlx1N0QyMFx1NTNEN1x1NEZERFx1OEI3N1wiLFxuICAgIGNhcHR1cmVFcnJvcjogXCJcdTI3NEMgXHU2MzU1XHU3MzcyXHU1MzQwXHU1N0RGXHU1MUZBXHU5MzJGOiB7ZXJyb3J9XCIsXG4gICAgY2FwdHVyZUZpcnN0OiBcIlx1Mjc0QyBcdThBQ0JcdTUxNDhcdTYzNTVcdTczNzJcdTRFMDBcdTUwMEJcdTVCODhcdThCNzdcdTUzNDBcdTU3REZcIixcbiAgICBwcm90ZWN0aW9uU3RhcnRlZDogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU4Qjc3XHU1REYyXHU1NTUzXHU1MkQ1IC0gXHU1MzQwXHU1N0RGXHU3NkUzXHU2M0E3XHU0RTJEXCIsXG4gICAgcHJvdGVjdGlvblN0b3BwZWQ6IFwiXHUyM0Y5XHVGRTBGIFx1NUI4OFx1OEI3N1x1NURGMlx1NTA1Q1x1NkI2MlwiLFxuICAgIG5vQ2hhbmdlczogXCJcdTI3MDUgXHU1MzQwXHU1N0RGXHU1Qjg5XHU1MTY4IC0gXHU2NzJBXHU2QUEyXHU2RTJDXHU1MjMwXHU4QjhBXHU1MzE2XCIsXG4gICAgY2hhbmdlc0RldGVjdGVkOiBcIlx1RDgzRFx1REVBOCBcdTZBQTJcdTZFMkNcdTUyMzAge2NvdW50fSBcdTUwMEJcdThCOEFcdTUzMTZcIixcbiAgICByZXBhaXJpbmc6IFwiXHVEODNEXHVERUUwXHVGRTBGIFx1NkI2M1x1NTcyOFx1NEZFRVx1NUZBOSB7Y291bnR9IFx1NTAwQlx1NTBDRlx1N0QyMC4uLlwiLFxuICAgIHJlcGFpcmVkU3VjY2VzczogXCJcdTI3MDUgXHU1REYyXHU2MjEwXHU1MjlGXHU0RkVFXHU1RkE5IHtjb3VudH0gXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgcmVwYWlyRXJyb3I6IFwiXHUyNzRDIFx1NEZFRVx1NUZBOVx1NTFGQVx1OTMyRjoge2Vycm9yfVwiLFxuICAgIG5vQ2hhcmdlczogXCJcdTI2QTBcdUZFMEYgXHU2QjIxXHU2NTc4XHU0RTBEXHU4REIzXHVGRjBDXHU3MTIxXHU2Q0Q1XHU0RkVFXHU1RkE5XCIsXG4gICAgY2hlY2tpbmdDaGFuZ2VzOiBcIlx1RDgzRFx1REQwRCBcdTZCNjNcdTU3MjhcdTZBQTJcdTY3RTVcdTUzNDBcdTU3REZcdThCOEFcdTUzMTYuLi5cIixcbiAgICBlcnJvckNoZWNraW5nOiBcIlx1Mjc0QyBcdTZBQTJcdTY3RTVcdTUxRkFcdTkzMkY6IHtlcnJvcn1cIixcbiAgICBndWFyZEFjdGl2ZTogXCJcdUQ4M0RcdURFRTFcdUZFMEYgXHU1Qjg4XHU4Qjc3XHU0RTJEIC0gXHU1MzQwXHU1N0RGXHU1M0Q3XHU0RkREXHU4Qjc3XCIsXG4gICAgbGFzdENoZWNrOiBcIlx1NEUwQVx1NkIyMVx1NkFBMlx1NjdFNToge3RpbWV9XCIsXG4gICAgbmV4dENoZWNrOiBcIlx1NEUwQlx1NkIyMVx1NkFBMlx1NjdFNToge3RpbWV9IFx1NzlEMlx1NUY4Q1wiLFxuICAgIGF1dG9Jbml0aWFsaXppbmc6IFwiXHVEODNFXHVERDE2IFx1NkI2M1x1NTcyOFx1ODFFQVx1NTJENVx1NTIxRFx1NTlDQlx1NTMxNi4uLlwiLFxuICAgIGF1dG9Jbml0U3VjY2VzczogXCJcdTI3MDUgXHU4MUVBXHU1MkQ1XHU1NTUzXHU1MkQ1XHU2MjEwXHU1MjlGXCIsXG4gICAgYXV0b0luaXRGYWlsZWQ6IFwiXHUyNkEwXHVGRTBGIFx1NzEyMVx1NkNENVx1ODFFQVx1NTJENVx1NTU1M1x1NTJENVx1RkYwQ1x1OEFDQlx1NjI0Qlx1NTJENVx1NjRDRFx1NEY1Q1x1MzAwMlwiLFxuICAgIG1hbnVhbEluaXRSZXF1aXJlZDogXCJcdUQ4M0RcdUREMjcgXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkQ1XHU1MjFEXHU1OUNCXHU1MzE2XCIsXG4gICAgcGFsZXR0ZURldGVjdGVkOiBcIlx1RDgzQ1x1REZBOCBcdTVERjJcdTZBQTJcdTZFMkNcdTUyMzBcdThBQkZcdTgyNzJcdTY3N0ZcIixcbiAgICBwYWxldHRlTm90Rm91bmQ6IFwiXHVEODNEXHVERDBEIFx1NkI2M1x1NTcyOFx1NjQxQ1x1N0QyMlx1OEFCRlx1ODI3Mlx1Njc3Ri4uLlwiLFxuICAgIGNsaWNraW5nUGFpbnRCdXR0b246IFwiXHVEODNEXHVEQzQ2IFx1NkI2M1x1NTcyOFx1OUVERVx1NjRDQVx1N0U2QVx1ODhGRFx1NjMwOVx1OTIxNS4uLlwiLFxuICAgIHBhaW50QnV0dG9uTm90Rm91bmQ6IFwiXHUyNzRDIFx1NjcyQVx1NjI3RVx1NTIzMFx1N0U2QVx1ODhGRFx1NjMwOVx1OTIxNVwiLFxuICAgIHNlbGVjdFVwcGVyTGVmdDogXCJcdUQ4M0NcdURGQUYgXHU1NzI4XHU5NzAwXHU4OTgxXHU0RkREXHU4Qjc3XHU1MzQwXHU1N0RGXHU3Njg0XHU1REU2XHU0RTBBXHU4OUQyXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgc2VsZWN0TG93ZXJSaWdodDogXCJcdUQ4M0NcdURGQUYgXHU3M0ZFXHU1NzI4XHU1NzI4XHU1M0YzXHU0RTBCXHU4OUQyXHU1ODU3XHU0RTAwXHU1MDBCXHU1MENGXHU3RDIwXCIsXG4gICAgd2FpdGluZ1VwcGVyTGVmdDogXCJcdUQ4M0RcdURDNDYgXHU3QjQ5XHU1Rjg1XHU5MDc4XHU2NEM3XHU1REU2XHU0RTBBXHU4OUQyLi4uXCIsXG4gICAgd2FpdGluZ0xvd2VyUmlnaHQ6IFwiXHVEODNEXHVEQzQ2IFx1N0I0OVx1NUY4NVx1OTA3OFx1NjRDN1x1NTNGM1x1NEUwQlx1ODlEMi4uLlwiLFxuICAgIHVwcGVyTGVmdENhcHR1cmVkOiBcIlx1MjcwNSBcdTVERjJcdTYzNTVcdTczNzJcdTVERTZcdTRFMEFcdTg5RDI6ICh7eH0sIHt5fSlcIixcbiAgICBsb3dlclJpZ2h0Q2FwdHVyZWQ6IFwiXHUyNzA1IFx1NURGMlx1NjM1NVx1NzM3Mlx1NTNGM1x1NEUwQlx1ODlEMjogKHt4fSwge3l9KVwiLFxuICAgIHNlbGVjdGlvblRpbWVvdXQ6IFwiXHUyNzRDIFx1OTA3OFx1NjRDN1x1OEQ4NVx1NjY0MlwiLFxuICAgIHNlbGVjdGlvbkVycm9yOiBcIlx1Mjc0QyBcdTkwNzhcdTY0QzdcdTUxRkFcdTkzMkZcdUZGMENcdThBQ0JcdTkxQ0RcdThBNjZcIlxuICB9XG59OyIsICJpbXBvcnQgeyBlcyB9IGZyb20gJy4vZXMuanMnO1xuaW1wb3J0IHsgZW4gfSBmcm9tICcuL2VuLmpzJztcbmltcG9ydCB7IGZyIH0gZnJvbSAnLi9mci5qcyc7XG5pbXBvcnQgeyBydSB9IGZyb20gJy4vcnUuanMnO1xuaW1wb3J0IHsgemhIYW5zIH0gZnJvbSAnLi96aC1IYW5zLmpzJztcbmltcG9ydCB7IHpoSGFudCB9IGZyb20gJy4vemgtSGFudC5qcyc7XG5cbi8vIElkaW9tYXMgZGlzcG9uaWJsZXNcbmV4cG9ydCBjb25zdCBBVkFJTEFCTEVfTEFOR1VBR0VTID0ge1xuICBlczogeyBuYW1lOiAnRXNwYVx1MDBGMW9sJywgZmxhZzogJ1x1RDgzQ1x1RERFQVx1RDgzQ1x1RERGOCcsIGNvZGU6ICdlcycgfSxcbiAgZW46IHsgbmFtZTogJ0VuZ2xpc2gnLCBmbGFnOiAnXHVEODNDXHVEREZBXHVEODNDXHVEREY4JywgY29kZTogJ2VuJyB9LFxuICBmcjogeyBuYW1lOiAnRnJhblx1MDBFN2FpcycsIGZsYWc6ICdcdUQ4M0NcdURERUJcdUQ4M0NcdURERjcnLCBjb2RlOiAnZnInIH0sXG4gIHJ1OiB7IG5hbWU6ICdcdTA0MjBcdTA0NDNcdTA0NDFcdTA0NDFcdTA0M0FcdTA0MzhcdTA0MzknLCBmbGFnOiAnXHVEODNDXHVEREY3XHVEODNDXHVEREZBJywgY29kZTogJ3J1JyB9LFxuICB6aEhhbnM6IHsgbmFtZTogJ1x1N0I4MFx1NEY1M1x1NEUyRFx1NjU4NycsIGZsYWc6ICdcdUQ4M0NcdURERThcdUQ4M0NcdURERjMnLCBjb2RlOiAnemgtSGFucycgfSxcbiAgemhIYW50OiB7IG5hbWU6ICdcdTdFNDFcdTlBRDRcdTRFMkRcdTY1ODcnLCBmbGFnOiAnXHVEODNDXHVEREU4XHVEODNDXHVEREYzJywgY29kZTogJ3poLUhhbnQnIH1cbn07XG5cbi8vIFRvZGFzIGxhcyB0cmFkdWNjaW9uZXNcbmNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgZXMsXG4gIGVuLFxuICBmcixcbiAgcnUsXG4gIHpoSGFucyxcbiAgemhIYW50XG59O1xuXG4vLyBFc3RhZG8gZGVsIGlkaW9tYSBhY3R1YWxcbmxldCBjdXJyZW50TGFuZ3VhZ2UgPSAnZXMnO1xubGV0IGN1cnJlbnRUcmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnNbY3VycmVudExhbmd1YWdlXTtcblxuLyoqXG4gKiBEZXRlY3RhIGVsIGlkaW9tYSBkZWwgbmF2ZWdhZG9yXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGRldGVjdGFkb1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0QnJvd3Nlckxhbmd1YWdlKCkge1xuICBjb25zdCBicm93c2VyTGFuZyA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgfHwgJ2VzJztcblxuICAvLyBFeHRyYWVyIHNvbG8gZWwgY1x1MDBGM2RpZ28gZGVsIGlkaW9tYSAoZWo6ICdlcy1FUycgLT4gJ2VzJylcbiAgY29uc3QgbGFuZ0NvZGUgPSBicm93c2VyTGFuZy5zcGxpdCgnLScpWzBdLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gVmVyaWZpY2FyIHNpIHRlbmVtb3Mgc29wb3J0ZSBwYXJhIGVzdGUgaWRpb21hXG4gIGlmICh0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdKSB7XG4gICAgcmV0dXJuIGxhbmdDb2RlO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgYSBlc3BhXHUwMEYxb2wgcG9yIGRlZmVjdG9cbiAgcmV0dXJuICdlcyc7XG59XG5cbi8qKlxuICogT2J0aWVuZSBlbCBpZGlvbWEgZ3VhcmRhZG8gKGRlc2hhYmlsaXRhZG8gLSBubyB1c2FyIGxvY2FsU3RvcmFnZSlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFNpZW1wcmUgcmV0b3JuYSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTYXZlZExhbmd1YWdlKCkge1xuICAvLyBObyB1c2FyIGxvY2FsU3RvcmFnZSAtIHNpZW1wcmUgcmV0b3JuYXIgbnVsbFxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBHdWFyZGEgZWwgaWRpb21hIChkZXNoYWJpbGl0YWRvIC0gbm8gdXNhciBsb2NhbFN0b3JhZ2UpXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ0NvZGUgLSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYXZlTGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgLy8gTm8gZ3VhcmRhciBlbiBsb2NhbFN0b3JhZ2UgLSBmdW5jaVx1MDBGM24gZGVzaGFiaWxpdGFkYVxuICByZXR1cm47XG59XG5cbi8qKlxuICogSW5pY2lhbGl6YSBlbCBzaXN0ZW1hIGRlIGlkaW9tYXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENcdTAwRjNkaWdvIGRlbCBpZGlvbWEgaW5pY2lhbGl6YWRvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplTGFuZ3VhZ2UoKSB7XG4gIC8vIFByaW9yaWRhZDogZ3VhcmRhZG8gPiBuYXZlZ2Fkb3IgPiBlc3BhXHUwMEYxb2xcbiAgY29uc3Qgc2F2ZWRMYW5nID0gZ2V0U2F2ZWRMYW5ndWFnZSgpO1xuICBjb25zdCBicm93c2VyTGFuZyA9IGRldGVjdEJyb3dzZXJMYW5ndWFnZSgpO1xuXG4gIGxldCBzZWxlY3RlZExhbmcgPSAnZXMnOyAvLyBmYWxsYmFjayBwb3IgZGVmZWN0b1xuXG4gIGlmIChzYXZlZExhbmcgJiYgdHJhbnNsYXRpb25zW3NhdmVkTGFuZ10pIHtcbiAgICBzZWxlY3RlZExhbmcgPSBzYXZlZExhbmc7XG4gIH0gZWxzZSBpZiAoYnJvd3NlckxhbmcgJiYgdHJhbnNsYXRpb25zW2Jyb3dzZXJMYW5nXSkge1xuICAgIHNlbGVjdGVkTGFuZyA9IGJyb3dzZXJMYW5nO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2Uoc2VsZWN0ZWRMYW5nKTtcbiAgcmV0dXJuIHNlbGVjdGVkTGFuZztcbn1cblxuLyoqXG4gKiBDYW1iaWEgZWwgaWRpb21hIGFjdHVhbFxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmdDb2RlIC0gQ1x1MDBGM2RpZ28gZGVsIGlkaW9tYVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgaWYgKCF0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdKSB7XG4gICAgY29uc29sZS53YXJuKGBJZGlvbWEgJyR7bGFuZ0NvZGV9JyBubyBkaXNwb25pYmxlLiBVc2FuZG8gJyR7Y3VycmVudExhbmd1YWdlfSdgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjdXJyZW50TGFuZ3VhZ2UgPSBsYW5nQ29kZTtcbiAgY3VycmVudFRyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9uc1tsYW5nQ29kZV07XG4gIHNhdmVMYW5ndWFnZShsYW5nQ29kZSk7XG5cbiAgLy8gRW1pdGlyIGV2ZW50byBwZXJzb25hbGl6YWRvIHBhcmEgcXVlIGxvcyBtXHUwMEYzZHVsb3MgcHVlZGFuIHJlYWNjaW9uYXJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5DdXN0b21FdmVudCkge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ2xhbmd1YWdlQ2hhbmdlZCcsIHtcbiAgICAgIGRldGFpbDogeyBsYW5ndWFnZTogbGFuZ0NvZGUsIHRyYW5zbGF0aW9uczogY3VycmVudFRyYW5zbGF0aW9ucyB9XG4gICAgfSkpO1xuICB9XG59XG5cbi8qKlxuICogT2J0aWVuZSBlbCBpZGlvbWEgYWN0dWFsXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hIGFjdHVhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudExhbmd1YWdlKCkge1xuICByZXR1cm4gY3VycmVudExhbmd1YWdlO1xufVxuXG4vKipcbiAqIE9idGllbmUgbGFzIHRyYWR1Y2Npb25lcyBhY3R1YWxlc1xuICogQHJldHVybnMge29iamVjdH0gT2JqZXRvIGNvbiB0b2RhcyBsYXMgdHJhZHVjY2lvbmVzIGRlbCBpZGlvbWEgYWN0dWFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VHJhbnNsYXRpb25zKCkge1xuICByZXR1cm4gY3VycmVudFRyYW5zbGF0aW9ucztcbn1cblxuLyoqXG4gKiBPYnRpZW5lIHVuIHRleHRvIHRyYWR1Y2lkbyB1c2FuZG8gbm90YWNpXHUwMEYzbiBkZSBwdW50b1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIENsYXZlIGRlbCB0ZXh0byAoZWo6ICdpbWFnZS50aXRsZScsICdjb21tb24uY2FuY2VsJylcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBQYXJcdTAwRTFtZXRyb3MgcGFyYSBpbnRlcnBvbGFjaVx1MDBGM24gKGVqOiB7Y291bnQ6IDV9KVxuICogQHJldHVybnMge3N0cmluZ30gVGV4dG8gdHJhZHVjaWRvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0KGtleSwgcGFyYW1zID0ge30pIHtcbiAgY29uc3Qga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICBsZXQgdmFsdWUgPSBjdXJyZW50VHJhbnNsYXRpb25zO1xuXG4gIC8vIE5hdmVnYXIgcG9yIGxhIGVzdHJ1Y3R1cmEgZGUgb2JqZXRvc1xuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIGsgaW4gdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWVba107XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihgQ2xhdmUgZGUgdHJhZHVjY2lcdTAwRjNuIG5vIGVuY29udHJhZGE6ICcke2tleX0nYCk7XG4gICAgICByZXR1cm4ga2V5OyAvLyBSZXRvcm5hciBsYSBjbGF2ZSBjb21vIGZhbGxiYWNrXG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICBjb25zb2xlLndhcm4oYENsYXZlIGRlIHRyYWR1Y2NpXHUwMEYzbiBubyBlcyBzdHJpbmc6ICcke2tleX0nYCk7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIC8vIEludGVycG9sYXIgcGFyXHUwMEUxbWV0cm9zXG4gIHJldHVybiBpbnRlcnBvbGF0ZSh2YWx1ZSwgcGFyYW1zKTtcbn1cblxuLyoqXG4gKiBJbnRlcnBvbGEgcGFyXHUwMEUxbWV0cm9zIGVuIHVuIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBUZXh0byBjb24gbWFyY2Fkb3JlcyB7a2V5fVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAtIFBhclx1MDBFMW1ldHJvcyBhIGludGVycG9sYXJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRleHRvIGNvbiBwYXJcdTAwRTFtZXRyb3MgaW50ZXJwb2xhZG9zXG4gKi9cbmZ1bmN0aW9uIGludGVycG9sYXRlKHRleHQsIHBhcmFtcykge1xuICBpZiAoIXBhcmFtcyB8fCBPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csIChtYXRjaCwga2V5KSA9PiB7XG4gICAgcmV0dXJuIHBhcmFtc1trZXldICE9PSB1bmRlZmluZWQgPyBwYXJhbXNba2V5XSA6IG1hdGNoO1xuICB9KTtcbn1cblxuLyoqXG4gKiBPYnRpZW5lIHRyYWR1Y2Npb25lcyBkZSB1bmEgc2VjY2lcdTAwRjNuIGVzcGVjXHUwMEVEZmljYVxuICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBTZWNjaVx1MDBGM24gKGVqOiAnaW1hZ2UnLCAnbGF1bmNoZXInLCAnY29tbW9uJylcbiAqIEByZXR1cm5zIHtvYmplY3R9IE9iamV0byBjb24gbGFzIHRyYWR1Y2Npb25lcyBkZSBsYSBzZWNjaVx1MDBGM25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlY3Rpb24oc2VjdGlvbikge1xuICBpZiAoY3VycmVudFRyYW5zbGF0aW9uc1tzZWN0aW9uXSkge1xuICAgIHJldHVybiBjdXJyZW50VHJhbnNsYXRpb25zW3NlY3Rpb25dO1xuICB9XG5cbiAgY29uc29sZS53YXJuKGBTZWNjaVx1MDBGM24gZGUgdHJhZHVjY2lcdTAwRjNuIG5vIGVuY29udHJhZGE6ICcke3NlY3Rpb259J2ApO1xuICByZXR1cm4ge307XG59XG5cbi8qKlxuICogVmVyaWZpY2Egc2kgdW4gaWRpb21hIGVzdFx1MDBFMSBkaXNwb25pYmxlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ0NvZGUgLSBDXHUwMEYzZGlnbyBkZWwgaWRpb21hXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBzaSBlc3RcdTAwRTEgZGlzcG9uaWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMYW5ndWFnZUF2YWlsYWJsZShsYW5nQ29kZSkge1xuICByZXR1cm4gISF0cmFuc2xhdGlvbnNbbGFuZ0NvZGVdO1xufVxuXG4vLyBJbmljaWFsaXphciBhdXRvbVx1MDBFMXRpY2FtZW50ZSBhbCBjYXJnYXIgZWwgbVx1MDBGM2R1bG9cbmluaXRpYWxpemVMYW5ndWFnZSgpO1xuIiwgImV4cG9ydCBjb25zdCAkID0gKHNlbCwgcm9vdCA9IGRvY3VtZW50KSA9PiByb290LnF1ZXJ5U2VsZWN0b3Ioc2VsKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlKGNzcykge1xuICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBzLnRleHRDb250ZW50ID0gY3NzOyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpOyByZXR1cm4gcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50U2hhZG93KGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkpIHtcbiAgY29uc3QgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvc3QuaWQgPSBcIndwbGFjZS1ib3Qtcm9vdFwiO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaG9zdCk7XG4gIGNvbnN0IHJvb3QgPSBob3N0LmF0dGFjaFNoYWRvdyA/IGhvc3QuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSkgOiBob3N0O1xuICByZXR1cm4geyBob3N0LCByb290IH07XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGRldGVjdGFyIHNpIGxhIHBhbGV0YSBkZSBjb2xvcmVzIGVzdFx1MDBFMSBhYmllcnRhXG5leHBvcnQgZnVuY3Rpb24gaXNQYWxldHRlT3BlbihkZWJ1ZyA9IGZhbHNlKSB7XG4gIC8vIEJ1c2NhciBlbGVtZW50b3MgY29tdW5lcyBkZSBsYSBwYWxldGEgZGUgY29sb3JlcyAobVx1MDBFOXRvZG8gb3JpZ2luYWwpXG4gIGNvbnN0IHBhbGV0dGVTZWxlY3RvcnMgPSBbXG4gICAgJ1tkYXRhLXRlc3RpZD1cImNvbG9yLXBpY2tlclwiXScsXG4gICAgJy5jb2xvci1waWNrZXInLFxuICAgICcucGFsZXR0ZScsXG4gICAgJ1tjbGFzcyo9XCJjb2xvclwiXVtjbGFzcyo9XCJwaWNrZXJcIl0nLFxuICAgICdbY2xhc3MqPVwicGFsZXR0ZVwiXSdcbiAgXTtcbiAgXG4gIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgcGFsZXR0ZVNlbGVjdG9ycykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Lm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkE4IFBhbGV0YSBkZXRlY3RhZGEgcG9yIHNlbGVjdG9yOiAke3NlbGVjdG9yfWApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIFxuICAvLyBCdXNjYXIgcG9yIGNvbG9yZXMgZW4gdW4gZ3JpZCBvIGxpc3RhIChtXHUwMEU5dG9kbyBvcmlnaW5hbClcbiAgY29uc3QgY29sb3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tzdHlsZSo9XCJiYWNrZ3JvdW5kLWNvbG9yXCJdLCBbc3R5bGUqPVwiYmFja2dyb3VuZDpcIl0sIC5jb2xvciwgW2NsYXNzKj1cImNvbG9yXCJdJyk7XG4gIGxldCB2aXNpYmxlQ29sb3JzID0gMDtcbiAgZm9yIChjb25zdCBlbCBvZiBjb2xvckVsZW1lbnRzKSB7XG4gICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCAmJiBlbC5vZmZzZXRXaWR0aCA+IDEwICYmIGVsLm9mZnNldEhlaWdodCA+IDEwKSB7XG4gICAgICB2aXNpYmxlQ29sb3JzKys7XG4gICAgICBpZiAodmlzaWJsZUNvbG9ycyA+PSA1KSB7XG4gICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBOCBQYWxldGEgZGV0ZWN0YWRhIHBvciBjb2xvcmVzIHZpc2libGVzOiAke3Zpc2libGVDb2xvcnN9YCk7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBTaSBoYXkgNSsgZWxlbWVudG9zIGRlIGNvbG9yIHZpc2libGVzXG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0RcdUREMEQgUGFsZXRhIG5vIGRldGVjdGFkYS4gQ29sb3JlcyB2aXNpYmxlczogJHt2aXNpYmxlQ29sb3JzfWApO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIGVuY29udHJhciB5IGhhY2VyIGNsaWMgZW4gZWwgYm90XHUwMEYzbiBkZSBQYWludFxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRBbmRDbGlja1BhaW50QnV0dG9uKGRlYnVnID0gZmFsc2UsIGRvdWJsZUNsaWNrID0gZmFsc2UpIHtcbiAgLy8gTVx1MDBFOXRvZG8gMTogQlx1MDBGQXNxdWVkYSBlc3BlY1x1MDBFRGZpY2EgcG9yIGNsYXNlcyAobVx1MDBFOXRvZG8gb3JpZ2luYWwsIG1cdTAwRTFzIGNvbmZpYWJsZSlcbiAgY29uc3Qgc3BlY2lmaWNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYnRuLmJ0bi1wcmltYXJ5LmJ0bi1sZywgYnV0dG9uLmJ0bi5idG4tcHJpbWFyeS5zbVxcXFw6YnRuLXhsJyk7XG4gIFxuICBpZiAoc3BlY2lmaWNCdXR0b24pIHtcbiAgICBjb25zdCBidXR0b25UZXh0ID0gc3BlY2lmaWNCdXR0b24udGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBoYXNQYWludFRleHQgPSBidXR0b25UZXh0LmluY2x1ZGVzKCdwYWludCcpIHx8IGJ1dHRvblRleHQuaW5jbHVkZXMoJ3BpbnRhcicpO1xuICAgIGNvbnN0IGhhc1BhaW50SWNvbiA9IHNwZWNpZmljQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZyBwYXRoW2QqPVwiMjQwLTEyMFwiXScpIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWNCdXR0b24ucXVlcnlTZWxlY3Rvcignc3ZnIHBhdGhbZCo9XCJNMTVcIl0nKTtcbiAgICBcbiAgICBpZiAoaGFzUGFpbnRUZXh0IHx8IGhhc1BhaW50SWNvbikge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkFGIEJvdFx1MDBGM24gUGFpbnQgZW5jb250cmFkbyBwb3Igc2VsZWN0b3IgZXNwZWNcdTAwRURmaWNvOiBcIiR7YnV0dG9uVGV4dH1cImApO1xuICAgICAgc3BlY2lmaWNCdXR0b24uY2xpY2soKTtcbiAgICAgIFxuICAgICAgLy8gU2kgc2UgcmVxdWllcmUgZG9ibGUgY2xpYywgaGFjZXIgc2VndW5kbyBjbGljIGRlc3B1XHUwMEU5cyBkZSB1biBkZWxheVxuICAgICAgaWYgKGRvdWJsZUNsaWNrKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBRiBTZWd1bmRvIGNsaWMgZW4gYm90XHUwMEYzbiBQYWludGApO1xuICAgICAgICAgIHNwZWNpZmljQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIE1cdTAwRTl0b2RvIDI6IEJcdTAwRkFzcXVlZGEgc2ltcGxlIHBvciB0ZXh0byAobVx1MDBFOXRvZG8gb3JpZ2luYWwpXG4gIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgIGNvbnN0IGJ1dHRvblRleHQgPSBidXR0b24udGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoKGJ1dHRvblRleHQuaW5jbHVkZXMoJ3BhaW50JykgfHwgYnV0dG9uVGV4dC5pbmNsdWRlcygncGludGFyJykpICYmIFxuICAgICAgICBidXR0b24ub2Zmc2V0UGFyZW50ICE9PSBudWxsICYmXG4gICAgICAgICFidXR0b24uZGlzYWJsZWQpIHtcbiAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzQ1x1REZBRiBCb3RcdTAwRjNuIFBhaW50IGVuY29udHJhZG8gcG9yIHRleHRvOiBcIiR7YnV0dG9uLnRleHRDb250ZW50LnRyaW0oKX1cImApO1xuICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICBcbiAgICAgIC8vIFNpIHNlIHJlcXVpZXJlIGRvYmxlIGNsaWMsIGhhY2VyIHNlZ3VuZG8gY2xpYyBkZXNwdVx1MDBFOXMgZGUgdW4gZGVsYXlcbiAgICAgIGlmIChkb3VibGVDbGljaykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdUQ4M0NcdURGQUYgU2VndW5kbyBjbGljIGVuIGJvdFx1MDBGM24gUGFpbnRgKTtcbiAgICAgICAgICBidXR0b24uY2xpY2soKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkb2ApO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIEZ1bmNpXHUwMEYzbiBwYXJhIHJlYWxpemFyIGF1dG8tY2xpY2sgZGVsIGJvdFx1MDBGM24gUGFpbnQgY29uIHNlY3VlbmNpYSBjb3JyZWN0YVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF1dG9DbGlja1BhaW50QnV0dG9uKG1heEF0dGVtcHRzID0gMywgZGVidWcgPSB0cnVlKSB7XG4gIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1RDgzRVx1REQxNiBJbmljaWFuZG8gYXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludCAobVx1MDBFMXhpbW8gJHttYXhBdHRlbXB0c30gaW50ZW50b3MpYCk7XG4gIFxuICBmb3IgKGxldCBhdHRlbXB0ID0gMTsgYXR0ZW1wdCA8PSBtYXhBdHRlbXB0czsgYXR0ZW1wdCsrKSB7XG4gICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNDXHVERkFGIEludGVudG8gJHthdHRlbXB0fS8ke21heEF0dGVtcHRzfSAtIEJ1c2NhbmRvIGJvdFx1MDBGM24gUGFpbnQuLi5gKTtcbiAgICBcbiAgICAvLyBWZXJpZmljYXIgc2kgbGEgcGFsZXRhIHlhIGVzdFx1MDBFMSBhYmllcnRhXG4gICAgaWYgKGlzUGFsZXR0ZU9wZW4oKSkge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHUyNzA1IFBhbGV0YSB5YSBlc3RcdTAwRTEgYWJpZXJ0YSwgYXV0by1jbGljayBjb21wbGV0YWRvYCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgLy8gQ0xJQyBcdTAwREFOSUNPOiBQcmVzaW9uYXIgUGFpbnQgdW5hIHNvbGEgdmV6IChzb2xvIHBhcmEgbW9zdHJhciBwYWxldGEvZGV0ZWN0YXIgY29sb3JlcylcbiAgICBpZiAoZmluZEFuZENsaWNrUGFpbnRCdXR0b24oZGVidWcsIGZhbHNlKSkge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHVEODNEXHVEQzQ2IENsaWMgZW4gYm90XHUwMEYzbiBQYWludCByZWFsaXphZG8gKHNpbiBzZWd1bmRvIGNsaWMpYCk7XG4gICAgICBcbiAgICAgIC8vIEVzcGVyYXIgdW4gcG9jbyBwYXJhIHF1ZSBsYSBVSS9wYWxldGEgYXBhcmV6Y2EgZW4gcGFudGFsbGFcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxNTAwKSk7XG4gICAgICBcbiAgICAgIC8vIFZlcmlmaWNhciBzaSBsYSBwYWxldGEgc2UgYWJyaVx1MDBGM1xuICAgICAgaWYgKGlzUGFsZXR0ZU9wZW4oKSkge1xuICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKGBbV1BBLVVJXSBcdTI3MDUgUGFsZXRhIGFiaWVydGEgZXhpdG9zYW1lbnRlIGRlc3B1XHUwMEU5cyBkZWwgaW50ZW50byAke2F0dGVtcHR9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHUyNkEwXHVGRTBGIFBhbGV0YSBubyBkZXRlY3RhZGEgdHJhcyBlbCBjbGljIGVuIGludGVudG8gJHthdHRlbXB0fS4gUmVpbnRlbnRhclx1MDBFMS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZyhgW1dQQS1VSV0gXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkbyBwYXJhIGNsaWMgZW4gaW50ZW50byAke2F0dGVtcHR9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIEVzcGVyYXIgYW50ZXMgZGVsIHNpZ3VpZW50ZSBpbnRlbnRvXG4gICAgaWYgKGF0dGVtcHQgPCBtYXhBdHRlbXB0cykge1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgICB9XG4gIH1cbiAgXG4gIGlmIChkZWJ1ZykgY29uc29sZS5sb2coYFtXUEEtVUldIFx1Mjc0QyBBdXRvLWNsaWNrIGZhbGxcdTAwRjMgZGVzcHVcdTAwRTlzIGRlICR7bWF4QXR0ZW1wdHN9IGludGVudG9zYCk7XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsICJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vY29yZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IGdldFNlc3Npb24gfSBmcm9tIFwiLi4vY29yZS93cGxhY2UtYXBpLmpzXCI7XG5pbXBvcnQgeyBndWFyZFN0YXRlLCBHVUFSRF9ERUZBVUxUUyB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IHsgZGV0ZWN0QXZhaWxhYmxlQ29sb3JzLCBhbmFseXplQXJlYVBpeGVscywgY2hlY2tGb3JDaGFuZ2VzIH0gZnJvbSBcIi4vcHJvY2Vzc29yLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVHdWFyZFVJLCBzaG93Q29uZmlybURpYWxvZyB9IGZyb20gXCIuL3VpLmpzXCI7XG5pbXBvcnQgeyBzYXZlUHJvZ3Jlc3MsIGxvYWRQcm9ncmVzcywgaGFzUHJvZ3Jlc3MgfSBmcm9tIFwiLi9zYXZlLWxvYWQuanNcIjtcbmltcG9ydCB7IGluaXRpYWxpemVMYW5ndWFnZSwgZ2V0U2VjdGlvbiwgdCB9IGZyb20gXCIuLi9sb2NhbGVzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBpc1BhbGV0dGVPcGVuLCBmaW5kQW5kQ2xpY2tQYWludEJ1dHRvbiB9IGZyb20gXCIuLi9jb3JlL2RvbS5qc1wiO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tIFwiLi4vY29yZS90aW1pbmcuanNcIjtcblxuLy8gR2xvYmFscyBkZWwgbmF2ZWdhZG9yXG5jb25zdCB7IHNldEludGVydmFsLCBjbGVhckludGVydmFsIH0gPSB3aW5kb3c7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5HdWFyZCgpIHtcbiAgbG9nKCdcdUQ4M0RcdURFRTFcdUZFMEYgSW5pY2lhbmRvIFdQbGFjZSBBdXRvLUd1YXJkJyk7XG4gIFxuICAvLyBJbmljaWFsaXphciBzaXN0ZW1hIGRlIGlkaW9tYXNcbiAgaW5pdGlhbGl6ZUxhbmd1YWdlKCk7XG4gIFxuICAvLyBWZXJpZmljYXIgY29uZmxpY3RvcyBjb24gb3Ryb3MgYm90c1xuICBpZiAoIWNoZWNrRXhpc3RpbmdCb3RzKCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIC8vIE1hcmNhciBjb21vIGVqZWN1dFx1MDBFMW5kb3NlXG4gIHdpbmRvdy5fX3dwbGFjZUJvdCA9IHsgXG4gICAgLi4ud2luZG93Ll9fd3BsYWNlQm90LCBcbiAgICBndWFyZFJ1bm5pbmc6IHRydWUgXG4gIH07XG4gIFxuICB0cnkge1xuICAgIC8vIE9idGVuZXIgdGV4dG9zIGVuIGVsIGlkaW9tYSBhY3R1YWxcbiAgICBjb25zdCB0ZXh0cyA9IGdldFNlY3Rpb24oJ2d1YXJkJyk7XG4gICAgXG4gICAgLy8gQ3JlYXIgVUlcbiAgICBndWFyZFN0YXRlLnVpID0gY3JlYXRlR3VhcmRVSSh0ZXh0cyk7XG4gICAgXG4gICAgLy8gQ29uZmlndXJhciBldmVudCBsaXN0ZW5lcnNcbiAgICBzZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgXG4gICAgLy8gRnVuY2lcdTAwRjNuIHBhcmEgYXV0by1pbmljaW8gZGVsIGJvdCAocm9idXN0YSk6IHZhbGlkYSBjb2xvcmVzIHJlYWxlcyB5IGhhY2UgZmFsbGJhY2sgYSBjbGljIGRlIFBhaW50XG4gICAgYXN5bmMgZnVuY3Rpb24gdHJ5QXV0b0luaXQoKSB7XG4gICAgICBsb2coJ1x1RDgzRVx1REQxNiBJbnRlbnRhbmRvIGF1dG8taW5pY2lvIGRlbCBHdWFyZC4uLicpO1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQucGFsZXR0ZU5vdEZvdW5kJyksICdpbmZvJyk7XG5cbiAgICAgIC8vIDEpIFNpIHBhcmVjZSBhYmllcnRhLCB2YWxpZGFyIHF1ZSBoYXlhIGNvbG9yZXMgcmVhbGVzXG4gICAgICBpZiAoaXNQYWxldHRlT3BlbigpKSB7XG4gICAgICAgIGxvZygnXHVEODNDXHVERkE4IFBhbGV0YSBwYXJlY2UgYWJpZXJ0YS4gVmFsaWRhbmRvIGNvbG9yZXMuLi4nKTtcbiAgICAgICAgY29uc3QgY29sb3JzTm93ID0gZGV0ZWN0QXZhaWxhYmxlQ29sb3JzKCk7XG4gICAgICAgIGlmIChjb2xvcnNOb3cubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLnBhbGV0dGVEZXRlY3RlZCcpLCAnc3VjY2VzcycpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIFBhbGV0YSBcImFiaWVydGFcIiBwZXJvIHNpbiBjb2xvcmVzIGRldGVjdGFkb3MuIEludGVudGFuZG8gcHJlc2lvbmFyIFBhaW50Li4uJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIDIpIEludGVudGFyIGhhY2VyIGNsaWMgZW4gZWwgYm90XHUwMEYzbiBQYWludFxuICAgICAgbG9nKCdcdUQ4M0RcdUREMEQgQnVzY2FuZG8gYm90XHUwMEYzbiBQYWludC4uLicpO1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuY2xpY2tpbmdQYWludEJ1dHRvbicpLCAnaW5mbycpO1xuICAgICAgaWYgKGZpbmRBbmRDbGlja1BhaW50QnV0dG9uKCkpIHtcbiAgICAgICAgbG9nKCdcdUQ4M0RcdURDNDYgQm90XHUwMEYzbiBQYWludCBlbmNvbnRyYWRvIHkgcHJlc2lvbmFkbycpO1xuICAgICAgICBhd2FpdCBzbGVlcCgzMDAwKTsgLy8gRXNwZXJhciBhIHF1ZSBjYXJndWVcblxuICAgICAgICAvLyBSZXZhbGlkYXI6IHByaW1lcm8gY29sb3JlcyByZWFsZXMsIGx1ZWdvIGZhbGxiYWNrIGEgaGV1clx1MDBFRHN0aWNhIGRlIHBhbGV0YVxuICAgICAgICBjb25zdCBjb2xvcnNBZnRlciA9IGRldGVjdEF2YWlsYWJsZUNvbG9ycygpO1xuICAgICAgICBpZiAoY29sb3JzQWZ0ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxvZygnXHUyNzA1IENvbG9yZXMgZGV0ZWN0YWRvcyB0cmFzIHByZXNpb25hciBQYWludCcpO1xuICAgICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLnBhbGV0dGVEZXRlY3RlZCcpLCAnc3VjY2VzcycpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1BhbGV0dGVPcGVuKCkpIHtcbiAgICAgICAgICBsb2coJ1x1MjcwNSBQYWxldGEgYWJpZXJ0YSwgcGVybyBzaW4gY29sb3JlcyBhY2Nlc2libGVzIGFcdTAwRkFuJyk7XG4gICAgICAgICAgLy8gQVx1MDBGQW4gY29uc2lkZXJhbW9zIGZhbGxpZG8gcGFyYSBmb3J6YXIgaW5pY2lvIG1hbnVhbFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZygnXHUyNzRDIExhIHBhbGV0YSBubyBzZSBhYnJpXHUwMEYzIGRlc3B1XHUwMEU5cyBkZSBoYWNlciBjbGljJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZygnXHUyNzRDIEJvdFx1MDBGM24gUGFpbnQgbm8gZW5jb250cmFkbycpO1xuICAgICAgfVxuXG4gICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5hdXRvSW5pdEZhaWxlZCcpLCAnd2FybmluZycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICAvLyBJbnRlbnRhciBhdXRvLWluaWNpbyBkZXNwdVx1MDBFOXMgZGUgcXVlIGxhIFVJIGVzdFx1MDBFOSBsaXN0YVxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuYXV0b0luaXRpYWxpemluZycpLCAnaW5mbycpO1xuICAgICAgICBsb2coJ1x1RDgzRVx1REQxNiBJbnRlbnRhbmRvIGF1dG8taW5pY2lvLi4uJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBhdXRvSW5pdFN1Y2Nlc3MgPSBhd2FpdCB0cnlBdXRvSW5pdCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGF1dG9Jbml0U3VjY2Vzcykge1xuICAgICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmF1dG9Jbml0U3VjY2VzcycpLCAnc3VjY2VzcycpO1xuICAgICAgICAgIGxvZygnXHUyNzA1IEF1dG8taW5pY2lvIGV4aXRvc28nKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBPY3VsdGFyIGVsIGJvdFx1MDBGM24gZGUgaW5pY2lhbGl6YWNpXHUwMEYzbiBtYW51YWxcbiAgICAgICAgICBndWFyZFN0YXRlLnVpLnNldEluaXRCdXR0b25WaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBFamVjdXRhciBsYSBsXHUwMEYzZ2ljYSBkZSBpbmljaWFsaXphY2lcdTAwRjNuIGRlbCBib3RcbiAgICAgICAgICBjb25zdCBpbml0UmVzdWx0ID0gYXdhaXQgaW5pdGlhbGl6ZUd1YXJkKHRydWUpOyAvLyB0cnVlID0gZXMgYXV0by1pbmljaW9cbiAgICAgICAgICBpZiAoaW5pdFJlc3VsdCkge1xuICAgICAgICAgICAgbG9nKCdcdUQ4M0RcdURFODAgR3VhcmQtQk9UIGF1dG8taW5pY2lhZG8gY29tcGxldGFtZW50ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5hdXRvSW5pdEZhaWxlZCcpLCAnd2FybmluZycpO1xuICAgICAgICAgIGxvZygnXHUyNkEwXHVGRTBGIEF1dG8taW5pY2lvIGZhbGxcdTAwRjMsIHNlIHJlcXVpZXJlIGluaWNpbyBtYW51YWwnKTtcbiAgICAgICAgICAvLyBBc2VndXJhciBxdWUgZWwgYm90XHUwMEYzbiBkZSBpbmljaW8gbWFudWFsIGVzdFx1MDBFOSB2aXNpYmxlXG4gICAgICAgICAgZ3VhcmRTdGF0ZS51aS5zZXRJbml0QnV0dG9uVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nKCdcdTI3NEMgRXJyb3IgZW4gYXV0by1pbmljaW86JywgZXJyb3IpO1xuICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5tYW51YWxJbml0UmVxdWlyZWQnKSwgJ3dhcm5pbmcnKTtcbiAgICAgIH1cbiAgfSwgMTAwMCk7IC8vIDFzLCBjb25zaXN0ZW50ZSBjb24gQXV0by1JbWFnZVxuICAgIFxuICAgIC8vIENsZWFudXAgYWwgY2VycmFyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcbiAgICAgIHN0b3BHdWFyZCgpO1xuICAgICAgaWYgKHdpbmRvdy5fX3dwbGFjZUJvdCkge1xuICAgICAgICB3aW5kb3cuX193cGxhY2VCb3QuZ3VhcmRSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgbG9nKCdcdTI3MDUgQXV0by1HdWFyZCBjYXJnYWRvIGNvcnJlY3RhbWVudGUnKTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBpbmljaWFsaXphbmRvIEF1dG8tR3VhcmQ6JywgZXJyb3IpO1xuICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5ndWFyZFJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tFeGlzdGluZ0JvdHMoKSB7XG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmltYWdlUnVubmluZykge1xuICAgIGFsZXJ0KCdBdXRvLUltYWdlIGVzdFx1MDBFMSBlamVjdXRcdTAwRTFuZG9zZS4gQ2lcdTAwRTlycmFsbyBhbnRlcyBkZSBpbmljaWFyIEF1dG8tR3VhcmQuJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/LmZhcm1SdW5uaW5nKSB7XG4gICAgYWxlcnQoJ0F1dG8tRmFybSBlc3RcdTAwRTEgZWplY3V0XHUwMEUxbmRvc2UuIENpXHUwMEU5cnJhbG8gYW50ZXMgZGUgaW5pY2lhciBBdXRvLUd1YXJkLicpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgY29uc3QgeyBlbGVtZW50cyB9ID0gZ3VhcmRTdGF0ZS51aTtcbiAgXG4gIGVsZW1lbnRzLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHN0b3BHdWFyZCgpO1xuICAgIGd1YXJkU3RhdGUudWkuZGVzdHJveSgpO1xuICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgIHdpbmRvdy5fX3dwbGFjZUJvdC5ndWFyZFJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIGVsZW1lbnRzLmluaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBpbml0aWFsaXplR3VhcmQoKSk7XG4gIGVsZW1lbnRzLnNlbGVjdEFyZWFCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RBcmVhU3RlcEJ5U3RlcCk7XG4gIGVsZW1lbnRzLmxvYWRBcmVhQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGVsZW1lbnRzLmFyZWFGaWxlSW5wdXQuY2xpY2soKTtcbiAgfSk7XG4gIFxuICBlbGVtZW50cy5hcmVhRmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoZWxlbWVudHMuYXJlYUZpbGVJbnB1dC5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBsb2FkUHJvZ3Jlc3MoZWxlbWVudHMuYXJlYUZpbGVJbnB1dC5maWxlc1swXSk7XG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoYFx1MjcwNSBQcm90ZWNjaVx1MDBGM24gY2FyZ2FkYTogJHtyZXN1bHQucHJvdGVjdGVkUGl4ZWxzfSBwXHUwMEVEeGVsZXMgcHJvdGVnaWRvc2AsICdzdWNjZXNzJyk7XG4gICAgICAgIGxvZyhgXHUyNzA1IFx1MDBDMXJlYSBkZSBwcm90ZWNjaVx1MDBGM24gY2FyZ2FkYSBkZXNkZSBhcmNoaXZvYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHUyNzRDIEVycm9yIGFsIGNhcmdhciBwcm90ZWNjaVx1MDBGM246ICR7cmVzdWx0LmVycm9yfWAsICdlcnJvcicpO1xuICAgICAgICBsb2coYFx1Mjc0QyBFcnJvciBjYXJnYW5kbyBhcmNoaXZvOiAke3Jlc3VsdC5lcnJvcn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBcbiAgZWxlbWVudHMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEd1YXJkKTtcbiAgZWxlbWVudHMuc3RvcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAvLyBTaW1wbGVtZW50ZSBkZXRlbmVyIGxhIHByb3RlY2NpXHUwMEYzbiBzaW4gb3BjaW9uZXMgZGUgZ3VhcmRhZG9cbiAgICBndWFyZFN0YXRlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICBndWFyZFN0YXRlLmxvb3BJZCA9IG51bGw7XG4gICAgZ3VhcmRTdGF0ZS51aS5zZXRSdW5uaW5nU3RhdGUoZmFsc2UpO1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKCdcdTIzRjlcdUZFMEYgUHJvdGVjY2lcdTAwRjNuIGRldGVuaWRhJywgJ3dhcm5pbmcnKTtcbiAgICBcbiAgICBpZiAoZ3VhcmRTdGF0ZS5jaGVja0ludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKGd1YXJkU3RhdGUuY2hlY2tJbnRlcnZhbCk7XG4gICAgICBndWFyZFN0YXRlLmNoZWNrSW50ZXJ2YWwgPSBudWxsO1xuICAgIH1cbiAgfSk7XG4gIFxuICAvLyBFdmVudG9zIHBhcmEgc2F2ZS9sb2FkL2RlbGV0ZVxuICBlbGVtZW50cy5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmICghaGFzUHJvZ3Jlc3MoKSkge1xuICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoJ1x1Mjc0QyBObyBoYXkgXHUwMEUxcmVhIHByb3RlZ2lkYSBwYXJhIGd1YXJkYXInLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgLy8gTW9zdHJhciBkaVx1MDBFMWxvZ28gZGUgc3BsaXRcbiAgICBjb25zdCBzcGxpdENvbmZpcm0gPSBhd2FpdCBzaG93Q29uZmlybURpYWxvZyhcbiAgICAgICdcdTAwQkZEZXNlYXMgZGl2aWRpciBlbCBcdTAwRTFyZWEgcHJvdGVnaWRhIGVuIHBhcnRlcyBwYXJhIG1cdTAwRkFsdGlwbGVzIHVzdWFyaW9zPzxicj48YnI+JyArXG4gICAgICAnPGxhYmVsIGZvcj1cInNwbGl0Q291bnRJbnB1dFwiPk5cdTAwRkFtZXJvIGRlIHBhcnRlcyAoMSA9IHNpbiBkaXZpZGlyKTo8L2xhYmVsPjxicj4nICtcbiAgICAgICc8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwic3BsaXRDb3VudElucHV0XCIgbWluPVwiMVwiIG1heD1cIjIwXCIgdmFsdWU9XCIxXCIgc3R5bGU9XCJtYXJnaW46IDVweCAwOyBwYWRkaW5nOiA1cHg7IHdpZHRoOiAxMDBweDsgYmFja2dyb3VuZDogIzM3NDE1MTsgYm9yZGVyOiAxcHggc29saWQgIzRiNTU2MzsgYm9yZGVyLXJhZGl1czogNHB4OyBjb2xvcjogI2QxZDVkYjtcIj4nLFxuICAgICAgJ09wY2lvbmVzIGRlIEd1YXJkYWRvJyxcbiAgICAgIHtcbiAgICAgICAgc2F2ZTogXCJHdWFyZGFyXCIsXG4gICAgICAgIGNhbmNlbDogXCJDYW5jZWxhclwiXG4gICAgICB9XG4gICAgKTtcbiAgICBcbiAgICBpZiAoc3BsaXRDb25maXJtID09PSAnc2F2ZScpIHtcbiAgICAgIGNvbnN0IHNwbGl0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3BsaXRDb3VudElucHV0Jyk7XG4gICAgICBjb25zdCBzcGxpdENvdW50ID0gcGFyc2VJbnQoc3BsaXRJbnB1dD8udmFsdWUpIHx8IDE7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzYXZlUHJvZ3Jlc3MobnVsbCwgc3BsaXRDb3VudCk7XG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXMoYFx1MjcwNSBQcm90ZWNjaVx1MDBGM24gZ3VhcmRhZGEke3NwbGl0Q291bnQgPiAxID8gYCAoZGl2aWRpZGEgZW4gJHtzcGxpdENvdW50fSBwYXJ0ZXMpYCA6ICcnfWAsICdzdWNjZXNzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyhgXHUyNzRDIEVycm9yIGFsIGd1YXJkYXI6ICR7cmVzdWx0LmVycm9yfWAsICdlcnJvcicpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gRXZlbnRvcyBwYXJhIGNvbmZpZ3VyYWNpXHUwMEYzbiBlZGl0YWJsZVxuICBlbGVtZW50cy5waXhlbHNQZXJCYXRjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgZ3VhcmRTdGF0ZS5waXhlbHNQZXJCYXRjaCA9IE1hdGgubWF4KDEsIE1hdGgubWluKDUwLCBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgfHwgMTApKTtcbiAgICBlLnRhcmdldC52YWx1ZSA9IGd1YXJkU3RhdGUucGl4ZWxzUGVyQmF0Y2g7XG4gIH0pO1xuXG4gIGVsZW1lbnRzLm1pbkNoYXJnZXNJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgIGd1YXJkU3RhdGUubWluQ2hhcmdlc1RvV2FpdCA9IE1hdGgubWF4KDEsIE1hdGgubWluKDEwMCwgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIHx8IDIwKSk7XG4gICAgZS50YXJnZXQudmFsdWUgPSBndWFyZFN0YXRlLm1pbkNoYXJnZXNUb1dhaXQ7XG4gIH0pO1xuXG4gIC8vIEFjdHVhbGl6YXIgaW5wdXRzIGNvbiB2YWxvcmVzIGRlbCBlc3RhZG9cbiAgZWxlbWVudHMucGl4ZWxzUGVyQmF0Y2hJbnB1dC52YWx1ZSA9IGd1YXJkU3RhdGUucGl4ZWxzUGVyQmF0Y2g7XG4gIGVsZW1lbnRzLm1pbkNoYXJnZXNJbnB1dC52YWx1ZSA9IGd1YXJkU3RhdGUubWluQ2hhcmdlc1RvV2FpdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZUd1YXJkKGlzQXV0b0luaXQgPSBmYWxzZSkge1xuICB0cnkge1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmNoZWNraW5nQ29sb3JzJyksICdpbmZvJyk7XG4gICAgXG4gICAgLy8gRGV0ZWN0YXIgY29sb3JlcyBkaXNwb25pYmxlc1xuICAgIGxldCBjb2xvcnMgPSBkZXRlY3RBdmFpbGFibGVDb2xvcnMoKTtcbiAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gRmFsbGJhY2s6IGludGVudGFyIGFicmlyIGxhIHBhbGV0YSBhdXRvbVx1MDBFMXRpY2FtZW50ZSBzaSBhXHUwMEZBbiBubyBoYXkgY29sb3Jlc1xuICAgICAgbG9nKCdcdTI2QTBcdUZFMEYgMCBjb2xvcmVzIGRldGVjdGFkb3MuIEludGVudGFuZG8gYWJyaXIgcGFsZXRhIChmYWxsYmFjaykuLi4nKTtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmNsaWNraW5nUGFpbnRCdXR0b24nKSwgJ2luZm8nKTtcbiAgICAgIGlmIChmaW5kQW5kQ2xpY2tQYWludEJ1dHRvbigpKSB7XG4gICAgICAgIGF3YWl0IHNsZWVwKDI1MDApO1xuICAgICAgICBjb2xvcnMgPSBkZXRlY3RBdmFpbGFibGVDb2xvcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLm5vQ29sb3JzRm91bmQnKSwgJ2Vycm9yJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGd1YXJkU3RhdGUuYXZhaWxhYmxlQ29sb3JzID0gY29sb3JzO1xuICAgIGd1YXJkU3RhdGUuY29sb3JzQ2hlY2tlZCA9IHRydWU7XG4gICAgXG4gICAgLy8gT2J0ZW5lciBpbmZvcm1hY2lcdTAwRjNuIGRlIHNlc2lcdTAwRjNuXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKTtcbiAgICBpZiAoc2Vzc2lvbi5zdWNjZXNzKSB7XG4gICAgICBndWFyZFN0YXRlLmN1cnJlbnRDaGFyZ2VzID0gc2Vzc2lvbi5kYXRhLmNoYXJnZXM7XG4gICAgICBndWFyZFN0YXRlLm1heENoYXJnZXMgPSBzZXNzaW9uLmRhdGEubWF4Q2hhcmdlcztcbiAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHMoeyBjaGFyZ2VzOiBNYXRoLmZsb29yKGd1YXJkU3RhdGUuY3VycmVudENoYXJnZXMpIH0pO1xuICAgICAgbG9nKGBcdUQ4M0RcdURDNjQgVXN1YXJpbzogJHtzZXNzaW9uLmRhdGEudXNlcj8ubmFtZSB8fCAnQW5cdTAwRjNuaW1vJ30gLSBDYXJnYXM6ICR7Z3VhcmRTdGF0ZS5jdXJyZW50Q2hhcmdlc31gKTtcbiAgICB9XG4gICAgXG4gICAgZ3VhcmRTdGF0ZS5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuY29sb3JzRm91bmQnLCB7IGNvdW50OiBjb2xvcnMubGVuZ3RoIH0pLCAnc3VjY2VzcycpO1xuICAgIGd1YXJkU3RhdGUudWkuc2hvd0FyZWFTZWN0aW9uKCk7XG4gICAgXG4gICAgLy8gU29sbyBtb3N0cmFyIGxvZyB1bmEgdmV6IChldml0YXIgZHVwbGljYWRvIGVuIGF1dG8taW5pY2lvKVxuICAgIGlmICghaXNBdXRvSW5pdCkge1xuICAgICAgbG9nKGBcdTI3MDUgJHtjb2xvcnMubGVuZ3RofSBjb2xvcmVzIGRpc3BvbmlibGVzIGRldGVjdGFkb3NgKTtcbiAgICB9XG4gICAgXG4gICAgLy8gTWFyY2FyIGNvbW8gaW5pY2lhbGl6YWRvIGV4aXRvc2FtZW50ZSBwYXJhIGRlc2hhYmlsaXRhciBlbCBib3RcdTAwRjNuXG4gICAgZ3VhcmRTdGF0ZS51aS5zZXRJbml0aWFsaXplZCh0cnVlKTtcbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2coJ1x1Mjc0QyBFcnJvciBpbmljaWFsaXphbmRvOicsIGVycm9yKTtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5pbml0RXJyb3InKSwgJ2Vycm9yJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIFZhcmlhYmxlIHBhcmEgYWxtYWNlbmFyIGZldGNoIG9yaWdpbmFsXG5sZXQgb3JpZ2luYWxGZXRjaCA9IHdpbmRvdy5mZXRjaDtcblxuYXN5bmMgZnVuY3Rpb24gc2VsZWN0QXJlYVN0ZXBCeVN0ZXAoKSB7XG4gIGxvZygnXHVEODNDXHVERkFGIEluaWNpYW5kbyBzZWxlY2NpXHUwMEYzbiBwYXNvIGEgcGFzbyBkZWwgXHUwMEUxcmVhJyk7XG4gIFxuICAvLyBFc3RhZG8gcGFyYSBsYSBzZWxlY2NpXHUwMEYzblxuICBsZXQgdXBwZXJMZWZ0Q29ybmVyID0gbnVsbDtcbiAgbGV0IGxvd2VyUmlnaHRDb3JuZXIgPSBudWxsO1xuICBsZXQgc2VsZWN0aW9uUGhhc2UgPSAndXBwZXJMZWZ0JzsgLy8gJ3VwcGVyTGVmdCcgfCAnbG93ZXJSaWdodCdcbiAgbGV0IHBvc2l0aW9uQ2FwdHVyZWQgPSBmYWxzZTtcbiAgXG4gIC8vIEZ1bmNpXHUwMEYzbiBwYXJhIHJlc3RhdXJhciBmZXRjaCBvcmlnaW5hbFxuICBjb25zdCByZXN0b3JlRmV0Y2ggPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5mZXRjaCAhPT0gb3JpZ2luYWxGZXRjaCkge1xuICAgICAgd2luZG93LmZldGNoID0gb3JpZ2luYWxGZXRjaDtcbiAgICAgIGxvZygnXHVEODNEXHVERDA0IEZldGNoIG9yaWdpbmFsIHJlc3RhdXJhZG8nKTtcbiAgICB9XG4gIH07XG4gIFxuICAvLyBGdW5jaVx1MDBGM24gcGFyYSBpbnRlcmNlcHRhciBwaW50YWRvIHkgY2FwdHVyYXIgY29vcmRlbmFkYXNcbiAgY29uc3Qgc2V0dXBGZXRjaEludGVyY2VwdGlvbiA9ICgpID0+IHtcbiAgICB3aW5kb3cuZmV0Y2ggPSBhc3luYyAodXJsLCBvcHRpb25zKSA9PiB7XG4gICAgICAvLyBTb2xvIGludGVyY2VwdGFyIHJlcXVlc3RzIGVzcGVjXHUwMEVEZmljb3MgZGUgcGludGFkbyBkdXJhbnRlIHNlbGVjY2lcdTAwRjNuXG4gICAgICBpZiAoIXBvc2l0aW9uQ2FwdHVyZWQgJiZcbiAgICAgICAgICB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyAmJiBcbiAgICAgICAgICB1cmwuaW5jbHVkZXMoJy9zMC9waXhlbC8nKSAmJiBcbiAgICAgICAgICBvcHRpb25zICYmIFxuICAgICAgICAgIG9wdGlvbnMubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbG9nKGBcdUQ4M0NcdURGQUYgSW50ZXJjZXB0YW5kbyByZXF1ZXN0IGRlIHBpbnRhZG86ICR7dXJsfWApO1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3JpZ2luYWxGZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChyZXNwb25zZS5vayAmJiBvcHRpb25zLmJvZHkpIHtcbiAgICAgICAgICAgIGxldCBib2R5RGF0YTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGJvZHlEYXRhID0gSlNPTi5wYXJzZShvcHRpb25zLmJvZHkpO1xuICAgICAgICAgICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgICAgICAgICBsb2coJ0Vycm9yIHBhcnNlYW5kbyBib2R5IGRlbCByZXF1ZXN0OicsIHBhcnNlRXJyb3IpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChib2R5RGF0YS5jb29yZHMgJiYgQXJyYXkuaXNBcnJheShib2R5RGF0YS5jb29yZHMpICYmIGJvZHlEYXRhLmNvb3Jkcy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICBjb25zdCBsb2NhbFggPSBib2R5RGF0YS5jb29yZHNbMF07XG4gICAgICAgICAgICAgIGNvbnN0IGxvY2FsWSA9IGJvZHlEYXRhLmNvb3Jkc1sxXTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIEV4dHJhZXIgdGlsZSBkZSBsYSBVUkxcbiAgICAgICAgICAgICAgY29uc3QgdGlsZU1hdGNoID0gdXJsLm1hdGNoKC9cXC9zMFxcL3BpeGVsXFwvKC0/XFxkKylcXC8oLT9cXGQrKS8pO1xuICAgICAgICAgICAgICBpZiAodGlsZU1hdGNoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZVggPSBwYXJzZUludCh0aWxlTWF0Y2hbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbGVZID0gcGFyc2VJbnQodGlsZU1hdGNoWzJdKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhciBjb29yZGVuYWRhcyBnbG9iYWxlc1xuICAgICAgICAgICAgICAgIGNvbnN0IGdsb2JhbFggPSB0aWxlWCAqIDMwMDAgKyBsb2NhbFg7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2xvYmFsWSA9IHRpbGVZICogMzAwMCArIGxvY2FsWTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uUGhhc2UgPT09ICd1cHBlckxlZnQnKSB7XG4gICAgICAgICAgICAgICAgICAvLyBDYXB0dXJhciBlc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYVxuICAgICAgICAgICAgICAgICAgdXBwZXJMZWZ0Q29ybmVyID0geyB4OiBnbG9iYWxYLCB5OiBnbG9iYWxZIH07XG4gICAgICAgICAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZUNvb3JkaW5hdGVzKHsgeDE6IGdsb2JhbFgsIHkxOiBnbG9iYWxZIH0pO1xuICAgICAgICAgICAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQudXBwZXJMZWZ0Q2FwdHVyZWQnLCB7IHg6IGdsb2JhbFgsIHk6IGdsb2JhbFkgfSksICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICBsb2coYFx1MjcwNSBFc3F1aW5hIHN1cGVyaW9yIGl6cXVpZXJkYSBjYXB0dXJhZGE6ICgke2dsb2JhbFh9LCAke2dsb2JhbFl9KWApO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBDYW1iaWFyIGEgZmFzZSBkZSBlc3F1aW5hIGluZmVyaW9yIGRlcmVjaGFcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblBoYXNlID0gJ2xvd2VyUmlnaHQnO1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25QaGFzZSA9PT0gJ2xvd2VyUmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuc2VsZWN0TG93ZXJSaWdodCcpLCAnaW5mbycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uUGhhc2UgPT09ICdsb3dlclJpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgLy8gQ2FwdHVyYXIgZXNxdWluYSBpbmZlcmlvciBkZXJlY2hhXG4gICAgICAgICAgICAgICAgICBsb3dlclJpZ2h0Q29ybmVyID0geyB4OiBnbG9iYWxYLCB5OiBnbG9iYWxZIH07XG4gICAgICAgICAgICAgICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZUNvb3JkaW5hdGVzKHsgeDI6IGdsb2JhbFgsIHkyOiBnbG9iYWxZIH0pO1xuICAgICAgICAgICAgICAgICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQubG93ZXJSaWdodENhcHR1cmVkJywgeyB4OiBnbG9iYWxYLCB5OiBnbG9iYWxZIH0pLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgbG9nKGBcdTI3MDUgRXNxdWluYSBpbmZlcmlvciBkZXJlY2hhIGNhcHR1cmFkYTogKCR7Z2xvYmFsWH0sICR7Z2xvYmFsWX0pYCk7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIENvbXBsZXRhciBzZWxlY2NpXHUwMEYzblxuICAgICAgICAgICAgICAgICAgcG9zaXRpb25DYXB0dXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICByZXN0b3JlRmV0Y2goKTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhciBcdTAwRTFyZWFcbiAgICAgICAgICAgICAgICAgIGlmICh1cHBlckxlZnRDb3JuZXIueCA+PSBsb3dlclJpZ2h0Q29ybmVyLnggfHwgdXBwZXJMZWZ0Q29ybmVyLnkgPj0gbG93ZXJSaWdodENvcm5lci55KSB7XG4gICAgICAgICAgICAgICAgICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmludmFsaWRBcmVhJyksICdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIENhcHR1cmFyIFx1MDBFMXJlYSBhdXRvbVx1MDBFMXRpY2FtZW50ZVxuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNhcHR1cmVBcmVhRnJvbUNvb3JkaW5hdGVzKHVwcGVyTGVmdENvcm5lciwgbG93ZXJSaWdodENvcm5lcik7XG4gICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZygnXHUyNzRDIEVycm9yIGludGVyY2VwdGFuZG8gcGl4ZWw6JywgZXJyb3IpO1xuICAgICAgICAgIHJlc3RvcmVGZXRjaCgpO1xuICAgICAgICAgIHJldHVybiBvcmlnaW5hbEZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gUGFyYSB0b2RvcyBsb3MgZGVtXHUwMEUxcyByZXF1ZXN0cywgdXNhciBmZXRjaCBvcmlnaW5hbFxuICAgICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICB9O1xuICB9O1xuICBcbiAgLy8gQ29uZmlndXJhciBpbnRlcmNlcHRhY2lcdTAwRjNuXG4gIHNldHVwRmV0Y2hJbnRlcmNlcHRpb24oKTtcbiAgXG4gIC8vIEluaWNpYXIgY29uIGVzcXVpbmEgc3VwZXJpb3IgaXpxdWllcmRhXG4gIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLnNlbGVjdFVwcGVyTGVmdCcpLCAnaW5mbycpO1xuICBcbiAgLy8gVGltZW91dCBwYXJhIHNlbGVjY2lcdTAwRjNuICgyIG1pbnV0b3MpXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICghcG9zaXRpb25DYXB0dXJlZCkge1xuICAgICAgcmVzdG9yZUZldGNoKCk7XG4gICAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5zZWxlY3Rpb25UaW1lb3V0JyksICdlcnJvcicpO1xuICAgICAgbG9nKCdcdTIzRjAgVGltZW91dCBlbiBzZWxlY2NpXHUwMEYzbiBkZSBcdTAwRTFyZWEnKTtcbiAgICB9XG4gIH0sIDEyMDAwMCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhcHR1cmVBcmVhRnJvbUNvb3JkaW5hdGVzKHVwcGVyTGVmdCwgbG93ZXJSaWdodCkge1xuICB0cnkge1xuICAgIGNvbnN0IGFyZWEgPSB7XG4gICAgICB4MTogdXBwZXJMZWZ0LngsXG4gICAgICB5MTogdXBwZXJMZWZ0LnksXG4gICAgICB4MjogbG93ZXJSaWdodC54LFxuICAgICAgeTI6IGxvd2VyUmlnaHQueVxuICAgIH07XG4gICAgXG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuY2FwdHVyaW5nQXJlYScpLCAnaW5mbycpO1xuICAgIFxuICAgIGNvbnN0IHBpeGVsTWFwID0gYXdhaXQgYW5hbHl6ZUFyZWFQaXhlbHMoYXJlYSk7XG4gICAgXG4gICAgZ3VhcmRTdGF0ZS5wcm90ZWN0aW9uQXJlYSA9IGFyZWE7XG4gICAgZ3VhcmRTdGF0ZS5vcmlnaW5hbFBpeGVscyA9IHBpeGVsTWFwO1xuICAgIGd1YXJkU3RhdGUuY2hhbmdlcy5jbGVhcigpO1xuICAgIFxuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlUHJvZ3Jlc3MoMCwgcGl4ZWxNYXAuc2l6ZSk7XG4gICAgZ3VhcmRTdGF0ZS51aS51cGRhdGVTdGF0dXModCgnZ3VhcmQuYXJlYUNhcHR1cmVkJywgeyBjb3VudDogcGl4ZWxNYXAuc2l6ZSB9KSwgJ3N1Y2Nlc3MnKTtcbiAgICBndWFyZFN0YXRlLnVpLmVuYWJsZVN0YXJ0QnRuKCk7XG4gICAgXG4gICAgbG9nKGBcdTI3MDUgXHUwMEMxcmVhIGNhcHR1cmFkYTogJHtwaXhlbE1hcC5zaXplfSBwXHUwMEVEeGVsZXMgcHJvdGVnaWRvc2ApO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZygnXHUyNzRDIEVycm9yIGNhcHR1cmFuZG8gXHUwMEUxcmVhOicsIGVycm9yKTtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5jYXB0dXJlRXJyb3InLCB7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0pLCAnZXJyb3InKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzdGFydEd1YXJkKCkge1xuICBpZiAoIWd1YXJkU3RhdGUucHJvdGVjdGlvbkFyZWEgfHwgIWd1YXJkU3RhdGUub3JpZ2luYWxQaXhlbHMuc2l6ZSkge1xuICAgIGd1YXJkU3RhdGUudWkudXBkYXRlU3RhdHVzKHQoJ2d1YXJkLmNhcHR1cmVGaXJzdCcpLCAnZXJyb3InKTtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIGd1YXJkU3RhdGUucnVubmluZyA9IHRydWU7XG4gIGd1YXJkU3RhdGUudWkuc2V0UnVubmluZ1N0YXRlKHRydWUpO1xuICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5wcm90ZWN0aW9uU3RhcnRlZCcpLCAnc3VjY2VzcycpO1xuICBcbiAgbG9nKCdcdUQ4M0RcdURFRTFcdUZFMEYgSW5pY2lhbmRvIHByb3RlY2NpXHUwMEYzbiBkZWwgXHUwMEUxcmVhJyk7XG4gIFxuICAvLyBDb25maWd1cmFyIGludGVydmFsbyBkZSB2ZXJpZmljYWNpXHUwMEYzblxuICBndWFyZFN0YXRlLmNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChjaGVja0ZvckNoYW5nZXMsIEdVQVJEX0RFRkFVTFRTLkNIRUNLX0lOVEVSVkFMKTtcbiAgXG4gIC8vIFByaW1lcmEgdmVyaWZpY2FjaVx1MDBGM24gaW5tZWRpYXRhXG4gIGF3YWl0IGNoZWNrRm9yQ2hhbmdlcygpO1xufVxuXG5mdW5jdGlvbiBzdG9wR3VhcmQoKSB7XG4gIGd1YXJkU3RhdGUucnVubmluZyA9IGZhbHNlO1xuICBcbiAgaWYgKGd1YXJkU3RhdGUuY2hlY2tJbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwoZ3VhcmRTdGF0ZS5jaGVja0ludGVydmFsKTtcbiAgICBndWFyZFN0YXRlLmNoZWNrSW50ZXJ2YWwgPSBudWxsO1xuICB9XG4gIFxuICBpZiAoZ3VhcmRTdGF0ZS51aSkge1xuICAgIGd1YXJkU3RhdGUudWkuc2V0UnVubmluZ1N0YXRlKGZhbHNlKTtcbiAgICBndWFyZFN0YXRlLnVpLnVwZGF0ZVN0YXR1cyh0KCdndWFyZC5wcm90ZWN0aW9uU3RvcHBlZCcpLCAnd2FybmluZycpO1xuICB9XG4gIFxuICBsb2coJ1x1MjNGOVx1RkUwRiBQcm90ZWNjaVx1MDBGM24gZGV0ZW5pZGEnKTtcbn1cbiIsICJpbXBvcnQgeyBydW5HdWFyZCB9IGZyb20gXCIuLi9ndWFyZC9pbmRleC5qc1wiO1xuaW1wb3J0IHsgYXV0b0NsaWNrUGFpbnRCdXR0b24gfSBmcm9tIFwiLi4vY29yZS9kb20uanNcIjtcblxuLy8gQXV0by1jbGljayBkZWwgYm90XHUwMEYzbiBQYWludCBhbCBpbmljaW9cbihhc3luYyBmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnW1dQQS1HdWFyZF0gXHVEODNFXHVERDE2IEluaWNpYW5kbyBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50Li4uJyk7XG4gICAgYXdhaXQgYXV0b0NsaWNrUGFpbnRCdXR0b24oMywgdHJ1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coJ1tXUEEtR3VhcmRdIFx1MjZBMFx1RkUwRiBFcnJvciBlbiBhdXRvLWNsaWNrIGRlbCBib3RcdTAwRjNuIFBhaW50OicsIGVycm9yKTtcbiAgfVxuICBcbiAgLy8gVmVyaWZpY2FyIHNpIHlhIGhheSB1biBib3QgR3VhcmQgY29ycmllbmRvXG4gIGlmICh3aW5kb3cuX193cGxhY2VCb3Q/Lmd1YXJkUnVubmluZykge1xuICAgIGFsZXJ0KCdBdXRvLUd1YXJkIHlhIGVzdFx1MDBFMSBjb3JyaWVuZG8uJyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRWplY3V0YXIgZWwgYm90XG4gICAgcnVuR3VhcmQoKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbV1BBLUdVQVJEXSBFcnJvciBlbiBBdXRvLUd1YXJkOicsIGVycm9yKTtcbiAgICAgIGlmICh3aW5kb3cuX193cGxhY2VCb3QpIHtcbiAgICAgICAgd2luZG93Ll9fd3BsYWNlQm90Lmd1YXJkUnVubmluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYWxlcnQoJ0F1dG8tR3VhcmQ6IGVycm9yIGluZXNwZXJhZG8uIFJldmlzYSBjb25zb2xhLicpO1xuICAgIH0pO1xuICB9XG59KSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBVU8sTUFBTSxNQUFNLElBQUksTUFBTSxRQUFRLElBQUksWUFBWSxHQUFHLENBQUM7OztBQ1J6RCxNQUFNLE9BQU87QUFFYixpQkFBc0IsYUFBYTtBQUpuQztBQUtFLFFBQUk7QUFDRixZQUFNLEtBQUssTUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUUsYUFBYSxVQUFVLENBQUMsRUFBRSxLQUFLLE9BQUssRUFBRSxLQUFLLENBQUM7QUFDbkYsWUFBTSxPQUFPLE1BQU07QUFDbkIsWUFBTSxLQUFJLHlCQUFJLFlBQVcsQ0FBQztBQUMxQixZQUFNLFVBQVU7QUFBQSxRQUNkLFFBQU8sT0FBRSxVQUFGLFlBQVc7QUFBQTtBQUFBLFFBQ2xCLE1BQUssT0FBRSxRQUFGLFlBQVM7QUFBQTtBQUFBLFFBQ2QsYUFBWSxPQUFFLGVBQUYsWUFBZ0I7QUFBQSxNQUM5QjtBQUVBLGFBQU87QUFB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QUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsSUFDWDtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixxQkFBcUI7QUFBQSxNQUNyQixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDVixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQix5QkFBeUI7QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixvQkFBb0I7QUFBQSxNQUNwQixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsSUFDaEI7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJB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QUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxFQUNGOzs7QUMzUE8sTUFBTSxLQUFLO0FBQUE7QUFBQSxJQUVoQixVQUFVO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsSUFDWDtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixxQkFBcUI7QUFBQSxNQUNyQixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDVixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQix5QkFBeUI7QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixvQkFBb0I7QUFBQSxNQUNwQixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsSUFDaEI7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxFQUNGOzs7QUMzUE8sTUFBTSxLQUFLO0FBQUE7QUFBQSxJQUVoQixVQUFVO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsSUFDWDtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixxQkFBcUI7QUFBQSxNQUNyQixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQix5QkFBeUI7QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixvQkFBb0I7QUFBQSxNQUNwQixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsSUFDaEI7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsTUFDcEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxFQUNGOzs7QUN6UE8sTUFBTSxTQUFTO0FBQUE7QUFBQSxJQUVwQixVQUFVO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsSUFDWDtBQUFBO0FBQUEsSUFHQSxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixxQkFBcUI7QUFBQSxNQUNyQixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDWixlQUFlO0FBQUEsTUFDZixxQkFBcUI7QUFBQSxNQUNyQix5QkFBeUI7QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixxQkFBcUI7QUFBQSxNQUNyQixvQkFBb0I7QUFBQSxNQUNwQixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsSUFDaEI7QUFBQTtBQUFBLElBR0EsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IscUJBQXFCO0FBQUEsTUFDckIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsTUFDakIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsa0JBQWtCO0FB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aUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsSUFDdEI7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsSUFDbkI7QUFBQTtBQUFBLElBR0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1B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RixpQkFBVyxHQUFHLGVBQWU7QUFFN0IsVUFBSSw2QkFBcUIsU0FBUyxJQUFJLHdCQUFxQjtBQUFBLElBRTdELFNBQVMsT0FBTztBQUNkLFVBQUksb0NBQTRCLEtBQUs7QUFDckMsaUJBQVcsR0FBRyxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxNQUFNLFFBQVEsQ0FBQyxHQUFHLE9BQU87QUFBQSxJQUN2RjtBQUFBLEVBQ0Y7QUFFQSxpQkFBZSxhQUFhO0FBQzFCLFFBQUksQ0FBQyxXQUFXLGtCQUFrQixDQUFDLFdBQVcsZUFBZSxNQUFNO0FBQ2pFLGlCQUFXLEdBQUcsYUFBYSxFQUFFLG9CQUFvQixHQUFHLE9BQU87QUFDM0Q7QUFBQSxJQUNGO0FBRUEsZUFBVyxVQUFVO0FBQ3JCLGVBQVcsR0FBRyxnQkFBZ0IsSUFBSTtBQUNsQyxlQUFXLEdBQUcsYUFBYSxFQUFFLHlCQUF5QixHQUFHLFNBQVM7QUFFbEUsUUFBSSxxREFBbUM7QUFHdkMsZUFBVyxnQkFBZ0IsWUFBWSxpQkFBaUIsZUFBZSxjQUFjO0FBR3JGLFVBQU0sZ0JBQWdCO0FBQUEsRUFDeEI7QUFFQSxXQUFTLFlBQVk7QUFDbkIsZUFBVyxVQUFVO0FBRXJCLFFBQUksV0FBVyxlQUFlO0FBQzVCLG9CQUFjLFdBQVcsYUFBYTtBQUN0QyxpQkFBVyxnQkFBZ0I7QUFBQSxJQUM3QjtBQUVBLFFBQUksV0FBVyxJQUFJO0FBQ2pCLGlCQUFXLEdBQUcsZ0JBQWdCLEtBQUs7QUFDbkMsaUJBQVcsR0FBRyxhQUFhLEVBQUUseUJBQXlCLEdBQUcsU0FBUztBQUFBLElBQ3BFO0FBRUEsUUFBSSxxQ0FBd0I7QUFBQSxFQUM5Qjs7O0FDN2RBLEdBQUMsaUJBQWlCO0FBSmxCO0FBS0UsUUFBSTtBQUNGLGNBQVEsSUFBSSxrRUFBd0Q7QUFDcEUsWUFBTSxxQkFBcUIsR0FBRyxJQUFJO0FBQUEsSUFDcEMsU0FBUyxPQUFPO0FBQ2QsY0FBUSxJQUFJLG9FQUF1RCxLQUFLO0FBQUEsSUFDMUU7QUFHQSxTQUFJLFlBQU8sZ0JBQVAsbUJBQW9CLGNBQWM7QUFDcEMsWUFBTSxrQ0FBK0I7QUFBQSxJQUN2QyxPQUFPO0FBRUwsZUFBUyxFQUFFLE1BQU0sV0FBUztBQUN4QixnQkFBUSxNQUFNLG9DQUFvQyxLQUFLO0FBQ3ZELFlBQUksT0FBTyxhQUFhO0FBQ3RCLGlCQUFPLFlBQVksZUFBZTtBQUFBLFFBQ3BDO0FBQ0EsY0FBTSwrQ0FBK0M7QUFBQSxNQUN2RCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsR0FBRzsiLAogICJuYW1lcyI6IFsidCJdCn0K
