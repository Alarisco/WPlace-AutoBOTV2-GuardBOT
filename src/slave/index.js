// Nota: WebSocket y setInterval ya están definidos como globals en eslint.config.js

import { log } from "../core/logger.js";
import { maybeCompressMessage, tryDecompressWrapper } from "../core/compression.js";
import { createSlaveUI } from "./ui.js";
import { SLAVE_CONFIG } from "./config.js"; // eliminado slaveState (no usado)
import { initializeLanguage } from "../locales/index.js";
import { sessionStart, sessionPing, sessionEnd, trackEvent } from "../core/metrics/client.js";
import { getMetricsConfig } from "../core/metrics/config.js";
import { getSession } from "../core/wplace-api.js";
// Importar directamente los módulos de los bots para ejecución local
import { runFarm } from "../farm/index.js";
import { runImage } from "../image/index.js";
// import { runGuard } from "../guard/index.js"; // UI completa (no usar en headless)
// (Guard modular) detección de colores y análisis ahora en Guard/guard.js
import { ensureGuardColors, handleGuardData as modularHandleGuardData, getPreviewData as modularGetPreviewData, startGuardAutomation as modularStartAutomation, applyGuardConfig as modularApplyGuardConfig, manualCheck as guardManualCheck, manualRepair as guardManualRepair, toggleWatchMode as guardToggleWatchMode, clearGuardState as guardClearState } from "./Guard/guard.js";
// Importar el sistema de turnstile para compartir tokens
import { ensureToken, invalidateToken, getPawtectToken, getFingerprint } from "../core/turnstile.js";
// NUEVO: API para enviar lotes de píxeles
// import { postPixelBatchImage } from "../core/wplace-api.js"; // now handled by paint.js helper
import { paintBatch as modPaintBatch, repairPixels as modRepairPixels } from "./paint.js";
// Para conocer el tamaño de tile y normalizar coords locales
import { GUARD_DEFAULTS } from "../guard/config.js";
import { prepareTokensForBot } from "../core/warmup.js";

// Globals del navegador
const { setInterval, clearInterval } = window;

class WPlaceSlave {
  constructor() {
    this.ws = null;
    this.slaveId = null;
    this.reconnectAttempts = 0;
    this.currentMode = null;
    this.currentBot = null;
    this.telemetryData = {
      repaired_pixels: 0,
      missing_pixels: 0,
      absent_pixels: 0,
      remaining_charges: 0,
      max_charges: 0
    };
    this.isRunning = false;
    this.projectConfig = null;
    this.masterServerUrl = 'ws://localhost:8000/ws/slave';
    this.connectionStatus = 'disconnected'; // disconnected, connecting, connected, error
    this.ui = null;
    this.isFavorite = false;
    this.telemetryInterval = null;
  this.manualDisconnect = false;
  this.abortPainting = false; // nuevo: bandera para abortar pintura en curso
  // Eliminado loop propio de análisis guard inline; se usa módulo Guard
  }

  // Anexa availableColors del guardState al preview si falta
  augmentPreview(preview) {
    try {
      const p = preview && typeof preview === 'object' ? { ...preview } : {};
      const gs = (typeof window !== 'undefined' && window.guardState) ? window.guardState : null;
      const colors = (gs && Array.isArray(gs.availableColors)) ? gs.availableColors : (p.availableColors || []);
      if (!p.availableColors && Array.isArray(colors)) {
        // Normalizar a objetos {id,r,g,b}
        p.availableColors = colors.map((c, idx) => {
          if (c && typeof c === 'object' && ('r' in c) && ('g' in c) && ('b' in c)) {
            return { id: (c.id ?? idx), r: c.r|0, g: c.g|0, b: c.b|0 };
          }
          return c;
        });
      }
      return p;
    } catch {
      return preview;
    }
  }

  // Envía un mensaje preview_data con preview enriquecido
  sendPreview(preview) {
    try {
      const enriched = this.augmentPreview(preview);
      this.sendToMaster({ type: 'preview_data', data: enriched });
    } catch {
      this.sendToMaster({ type: 'preview_data', data: preview });
    }
  }

  // Si hay availableColors conocidos, enviarlos en un preview_data mínimo
  sendAvailableColorsIfAny() {
    try {
      const gs = (typeof window !== 'undefined' && window.guardState) ? window.guardState : null;
      const colors = (gs && Array.isArray(gs.availableColors)) ? gs.availableColors : [];
      if (colors && colors.length) {
        const payload = { availableColors: colors.map((c, i) => ({ id: (c.id ?? i), r: c.r|0, g: c.g|0, b: c.b|0 })) };
        this.sendToMaster({ type: 'preview_data', data: payload });
      }
    } catch {}
  }

  async init(masterUrl) {
  this.masterServerUrl = this.normalizeWsUrl(masterUrl);
    log('🔗 Inicializando WPlace Slave...');
    
    // Asegurar que el sistema de turnstile esté disponible globalmente
    window.__WPA_TURNSTILE_SYSTEM__ = {
      ensureToken,
      invalidateToken,
      getPawtectToken,
      getFingerprint
    };
    
    await this.connectToMaster();
    this.startTelemetryLoop();
  }

  async derivePersistentId() {
    try {
      const session = await getSession();
      let username = 'ANON';
      if (session?.success && session?.data?.user) {
        const u = session.data.user;
        username = (u.username || u.name || u.user || (u.email ? String(u.email).split('@')[0] : '') || 'ANON');
      }
      username = String(username).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 18) || 'ANON';
      const id = `SLV_${username}`;
      localStorage.setItem('wplace_slave_id', id);
      return id;
    } catch (e) {
      try {
        const fallback = localStorage.getItem('wplace_slave_id');
        if (fallback) return fallback;
      } catch {}
      return 'SLV_ANON';
    }
  }

  async connectToMaster() {
    try {
      this.connectionStatus = 'connecting';
      this.updateUI();
      
      // Calcular ID persistente y adjuntarlo como query param
      this.slaveId = await this.derivePersistentId();
      // Normalizar esquema según contexto para evitar Mixed Content
      try {
        const pageIsHttps = typeof window !== 'undefined' && window.location?.protocol === 'https:';
        const u = new URL(this.masterServerUrl);
        const isWs = u.protocol === 'ws:';
        const isLocal = ['localhost', '127.0.0.1', '::1'].includes(u.hostname);
        if (pageIsHttps && isWs && !isLocal) {
          // Auto-upgrade a wss cuando la página es https y el destino no es local
          this.masterServerUrl = this.masterServerUrl.replace(/^ws:\/\//i, 'wss://');
          log('🔐 Página HTTPS: actualizando conexión a wss:// para evitar contenido mixto');
        }
      } catch {}
      const urlWithId = this.masterServerUrl.includes('?')
        ? `${this.masterServerUrl}&id=${encodeURIComponent(this.slaveId)}`
        : `${this.masterServerUrl}?id=${encodeURIComponent(this.slaveId)}`;

      log(`🔌 Conectando al servidor maestro: ${urlWithId}`);
      this.ws = new WebSocket(urlWithId);

      this.ws.onopen = async () => {
        log('✅ Conectado al servidor maestro');
        this.connectionStatus = 'connected';
        this.reconnectAttempts = 0;
        this.updateUI();

        // Enviar métricas de inicio de sesión
        try {
          await sessionStart({ 
            botVariant: 'auto-slave',
            metadata: { 
              slaveId: this.slaveId,
              masterUrl: this.masterServerUrl 
            }
          });
          
          // Configurar ping interval para mantener la sesión activa
          const mcfg = getMetricsConfig({ VARIANT: 'auto-slave' });
          if (mcfg.ENABLED) {
            if (!window.__wplaceMetrics) window.__wplaceMetrics = {};
            window.__wplaceMetrics.slaveSessionActive = true;
            
            const pingEvery = Math.max(60_000, mcfg.PING_INTERVAL_MS || 300_000);
            window.__wplaceMetrics.slavePingInterval = window.setInterval(
              () => sessionPing({ botVariant: 'auto-slave' }), 
              pingEvery
            );
          }
        } catch (error) {
          log(`⚠️ Error enviando métricas de inicio: ${error.message}`);
        }

        // Detectar paleta de colores lo antes posible y enviarla al master
        // Nota: esto permite que el primer slave conectado ya comparta availableColors
        try {
          await ensureGuardColors();
          this.sendAvailableColorsIfAny();
        } catch (e) {
          log('⚠️ No se pudieron detectar/enviar colores al conectar:', e);
        }

        // Enviar telemetría inicial inmediatamente (incluye cargas restantes)
        await this.updateTelemetry();
        this.sendTelemetry();

        // Iniciar bucle de telemetría
        this.startTelemetryLoop();

        // Notificar estado online
        this.sendToMaster({ type: 'status', status: 'online' });
      };

      this.ws.onmessage = async (event) => {
        try {
          // DEBUGGING: Log detallado del mensaje recibido
          const messageSize = event.data?.length || 0;
          log(`📨 [DEBUG] Mensaje recibido - Tamaño: ${messageSize} bytes`);
          
          // Detectar mensajes grandes que pueden causar problemas
          if (messageSize > 1048576) { // >1MB
            log(`⚠️ [DEBUG] Mensaje grande detectado: ${(messageSize/1048576).toFixed(2)}MB`);
          }
          
          // Intentar parsing JSON con manejo de errores detallado
          let data;
          try {
            data = JSON.parse(event.data);
            log(`✅ [DEBUG] JSON parseado correctamente`);
          } catch (parseError) {
            log(`❌ [DEBUG] Error parsing JSON: ${parseError.message}`);
            log(`🔍 [DEBUG] Datos recibidos (primeros 500 chars): ${event.data.substring(0, 500)}...`);
            return;
          }
          
          // Detectar si es un mensaje comprimido y debug decompresión
          if (data?.type === '__compressed__') {
            log(`🗜️ [DEBUG] Mensaje comprimido detectado - Encoding: ${data.encoding}`);
          }
          
          // Descomprimir usando función importada
          const msg = tryDecompressWrapper(data);
          
          // Log específico del contenido del mensaje (truncado para evitar spam)
          if (msg && typeof msg === 'object') {
            const logMessage = { ...msg };
            // Truncar campos grandes para el log
            Object.keys(logMessage).forEach(key => {
              if (typeof logMessage[key] === 'object' && logMessage[key] !== null) {
                const str = JSON.stringify(logMessage[key]);
                if (str.length > 200) {
                  logMessage[key] = `[Object: ${str.length} chars]`;
                }
              } else if (typeof logMessage[key] === 'string' && logMessage[key].length > 200) {
                logMessage[key] = logMessage[key].substring(0, 200) + '...';
              }
            });
            log(`📋 [DEBUG] Mensaje tipo: ${msg?.type}, contenido: ${JSON.stringify(logMessage)}`);
          }
          
          await this.handleMasterMessage(msg);
        } catch (e) {
          log('⚠️ [DEBUG] Error procesando mensaje del servidor: ' + (e?.message || e));
          log(`🔍 [DEBUG] Error stack trace: ${e?.stack || 'No stack available'}`);
        }
      };

      this.ws.onclose = (event) => {
        // DEBUGGING: Log detallado del cierre de conexión
        log(`❌ [DEBUG] Desconectado del servidor maestro - Código: ${event.code}, Razón: "${event.reason || 'Sin razón'}", WasClean: ${event.wasClean}`);
        
        // Códigos de cierre específicos para debugging
        const closeCodeMessages = {
          1000: 'Cierre normal',
          1001: 'Endpoint desconectándose',
          1002: 'Error de protocolo',
          1003: 'Tipo de datos no soportado',
          1004: 'Reservado',
          1005: 'Sin código de estado',
          1006: 'Cierre anormal',
          1007: 'Datos inconsistentes',
          1008: 'Violación de política',
          1009: 'Mensaje demasiado grande - ESTE ES EL PROBLEMA BUSCADO',
          1010: 'Extensión obligatoria',
          1011: 'Error interno del servidor',
          1015: 'Error de TLS handshake'
        };
        
        const codeMessage = closeCodeMessages[event.code] || `Código desconocido: ${event.code}`;
        log(`🔍 [DEBUG] Significado del código: ${codeMessage}`);
        
        if (event.code === 1009) {
          log(`🚨 [DEBUG] MENSAJE DEMASIADO GRANDE (1009) - ESTE ES EL PROBLEMA BUSCADO`);
        }
        
        this.connectionStatus = 'disconnected';
        this.updateUI();
        // Solo reintentar si no fue desconexión manual
        if (!this.manualDisconnect) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (error) => {
        // DEBUGGING: Log detallado del error de WebSocket
        log(`❌ [DEBUG] Error de WebSocket detectado:`);
        log(`🔍 [DEBUG] Error object: ${JSON.stringify(error, null, 2)}`);
        log(`🔍 [DEBUG] WebSocket readyState: ${this.ws?.readyState}`);
        log(`🔍 [DEBUG] WebSocket URL: ${this.ws?.url}`);
        log(`🔍 [DEBUG] Timestamp: ${new Date().toISOString()}`);
        
        // ReadyState meanings
        const readyStateMessages = {
          0: 'CONNECTING',
          1: 'OPEN', 
          2: 'CLOSING',
          3: 'CLOSED'
        };
        
        if (this.ws?.readyState !== undefined) {
          log(`🔍 [DEBUG] ReadyState significado: ${readyStateMessages[this.ws.readyState] || 'UNKNOWN'}`);
        }
        
        this.connectionStatus = 'error';
        this.updateUI();
      };
      
    } catch (error) {
      log(`❌ Error de conexión: ${error}`);
      this.connectionStatus = 'error';
      this.updateUI();
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectAttempts < SLAVE_CONFIG.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++;
      log(`🔄 Reintentando conexión en ${SLAVE_CONFIG.RECONNECT_INTERVAL/1000}s (intento ${this.reconnectAttempts})`);
      setTimeout(() => this.connectToMaster(), SLAVE_CONFIG.RECONNECT_INTERVAL);
    } else {
      log('❌ Máximo de intentos de reconexión alcanzado');
      this.connectionStatus = 'error';
      this.updateUI();
    }
  }

  async handleMasterMessage(message) {
    log(`📨 Comando recibido: ${message.type}`);
    
    switch (message.type) {
      case 'connected':
        // Usar el ID confirmado por el servidor, o mantener el calculado
        this.slaveId = message.slave_id || this.slaveId;
        log(`🆔 ID de Slave asignado: ${this.slaveId}`);
        this.updateUI();
        break;
        
      case 'setMode':
        this.setMode(message.mode);
        break;
        
      case 'loadProject':
        this.loadProject(message.config);
        break;
        
      case 'assignChunk':
        this.assignChunk(message.chunk);
        break;
        
      case 'control':
        this.handleControl(message.action);
        break;
      
      // NUEVO: orden directa de pintura desde el master
      case 'paintBatch':
  this.handlePaintBatch(message);
        break;
        
      // NUEVO: notificación de slave favorito
      case 'setFavorite':
        this.isFavorite = message.isFavorite || false;
        log(`⭐ Slave marcado como favorito: ${this.isFavorite}`);
        this.updateUI();
        if (this.isFavorite) {
          try { await prepareTokensForBot('Slave-Favorite'); } catch {}
          try { await ensureGuardColors(); } catch {}
          // Enviar paleta disponible inmediatamente si existe
          try { this.sendAvailableColorsIfAny(); } catch {}
          // Auto-iniciar Guard headless para asegurar preview/telemetría
          try {
            if (this.currentMode !== 'Guard') {
              await this.setMode('Guard');
            }
            if (!this.isRunning) {
              await this.startBot();
            }
          } catch (e) { log('⚠️ No se pudo auto-iniciar al ser favorito:', e); }
        }
        break;
      
      case 'favorite_status':
        this.isFavorite = message.is_favorite || false;
        log(`⭐ Estado de favorito actualizado: ${this.isFavorite}`);
        this.updateUI();
        if (this.isFavorite) {
          try { await prepareTokensForBot('Slave-Favorite'); } catch {}
          try { await ensureGuardColors(); } catch {}
          // Enviar paleta disponible inmediatamente si existe
          try { this.sendAvailableColorsIfAny(); } catch {}
          // Auto-iniciar Guard si aún no está corriendo
          try {
            if (this.currentMode !== 'Guard') {
              await this.setMode('Guard');
            }
            if (!this.isRunning) {
              await this.startBot();
            }
          } catch (e) { log('⚠️ No se pudo auto-iniciar (favorite_status):', e); }
        }
        break;
      
      case 'repairOrder':
        log(`🔧 Orden de reparación recibida: ${message.total_repairs} píxeles a reparar`);
        await this.handleRepairOrder(message);
        break;
      case 'guardData':
        await modularHandleGuardData(message, {
          setModeIfNeeded: async () => { if (this.currentMode !== 'Guard') await this.setMode('Guard'); },
          sendPreview: (preview) => this.sendPreview(preview),
          startAnalysisLoop: () => modularStartAutomation({
            sendPreview: (data)=> this.sendPreview(data),
            sendRepairSuggestion: (res)=> this.sendToMaster({ type: 'repair_suggestion', pixels: res.pixels, totalDiffs: res.totalDiffs, patternUsed: res.patternUsed, auto: true })
          })
        });
        break;
      case 'guardConfig':
        await modularApplyGuardConfig(message.config || {}, message.changed || {}, {
          onIntervalChange: (ms) => { /* El módulo maneja internamente el loop; nada adicional aquí */ }
        });
        // Si es favorito, garantizar que el Guard esté activo para usar la config
        if (this.isFavorite) {
          try {
            if (this.currentMode !== 'Guard') {
              await this.setMode('Guard');
            }
            if (!this.isRunning) {
              await this.startBot();
            }
          } catch (e) { log('⚠️ No se pudo iniciar tras guardConfig:', e); }
        }
        break;
      case 'guardControl':
        if (this.currentMode !== 'Guard') {
          await this.setMode('Guard');
        }
        if (message.action === 'check') {
          await guardManualCheck({ sendPreview: (data)=> this.sendPreview(data) });
        } else if (message.action === 'repair') {
          const params = message.params || {};
          // Modo nuevo: ejecutar un lote inmediato desde slave si limit > 0
          if (params.limit && params.limit > 0) {
            const suggested = await guardManualRepair(params, { sendPreview: (data)=> this.sendPreview(data) });
            if (suggested && Array.isArray(suggested.pixels) && suggested.pixels.length) {
              this.sendToMaster({ type: 'repair_ack', total_repairs: suggested.pixels.length, source: 'guard_one_batch' });
              this.abortPainting = false;
              await modRepairPixels({
                pixels: suggested.pixels,
                tileSize: GUARD_DEFAULTS?.TILE_SIZE || 1000,
                sendToMaster: (m) => this.sendToMaster(m),
                shouldAbort: () => this.abortPainting === true
              });
            } else {
              this.sendToMaster({ type: 'repair_complete', completed: 0, source: 'guard_one_batch' });
            }
          } else {
            // Comportamiento anterior: solo sugerir
            const result = await guardManualRepair(params, { sendPreview: (data)=> this.sendPreview(data) });
            if (result && Array.isArray(result.pixels)) {
              this.sendToMaster({ type: 'repair_suggestion', pixels: result.pixels, totalDiffs: result.totalDiffs || 0 });
            }
          }
        } else if (message.action === 'toggleWatch') {
          const newMode = await guardToggleWatchMode();
          this.sendToMaster({ type: 'status', status: 'watch_toggled', watchMode: newMode });
        } else if (message.action === 'clear') {
          // Abortar pintura en curso y limpiar estado completo del slave
          try {
            this.abortPainting = true;
            
            // Detener cualquier bot en ejecución
            if (this.isRunning) {
              await this.stopBot();
            }
            
            // Limpiar estado de Guard
            const ok = await guardClearState();
            
            // Reset completo del slave - volver a estado inicial
            this.currentMode = null;
            this.projectData = null;
            this.isRunning = false;
            
            // Limpiar telemetría
            this.telemetryData = {
              repaired_pixels: 0,
              missing_pixels: 0,
              absent_pixels: 0,
              remaining_charges: 0
            };
            
            // Enviar estado confirmando limpieza
            this.sendToMaster({ type: 'status', status: ok ? 'cleared' : 'clear_error' });
            
            // Enviar telemetría inmediata post-clear
            await this.updateTelemetry();
            this.sendTelemetry();
            
            // Actualizar UI para reflejar el reset
            this.updateUI();
            
            log('🧹 Slave completamente limpiado - vuelto a estado inicial');
          } catch (e) {
            this.sendToMaster({ type: 'status', status: 'clear_error', error: String(e?.message || e) });
          }
        }
        break;
        
      default:
        log(`❓ Comando desconocido: ${message.type}`);
    }
  }

  // NUEVO: manejar lote de pintura remoto (solo pinta lo que manda el master)
  async handlePaintBatch(message) {
    try {
      const { tileX, tileY, coords, colors, requestId, batchId } = message || {};
      if (!Array.isArray(coords) || !Array.isArray(colors) || coords.length !== colors.length || coords.length === 0) {
        this.sendToMaster({ type: 'paint_result', ok: false, error: 'Invalid coords/colors', tileX, tileY, painted: 0, requestId, batchId });
        return;
      }
      // Construir flat coords desde objetos ya locales
      const cleanCoordsFlat = [];
      for (const c of coords) {
        const x = Math.trunc(c?.x);
        const y = Math.trunc(c?.y);
        if (Number.isFinite(x) && Number.isFinite(y)) {
          const lx = ((x % 1000) + 1000) % 1000;
          const ly = ((y % 1000) + 1000) % 1000;
          cleanCoordsFlat.push(lx, ly);
        }
      }

      this.abortPainting = false;
      const res = await modPaintBatch({ 
        tileX, 
        tileY, 
        coordsFlat: cleanCoordsFlat, 
        colors, 
        // Propagar requestId en todos los mensajes de progreso
    sendToMaster: (m)=> {
          try {
            if (m && typeof m === 'object') {
      this.sendToMaster({ ...m, requestId, batchId });
            } else {
              this.sendToMaster(m);
            }
          } catch {
            this.sendToMaster(m);
          }
        }, 
        shouldAbort: ()=> this.abortPainting === true 
      });

      // Actualizar cargas y telemetría tras pintar
      await this.updateTelemetry();
      this.sendTelemetry();

      if (!res?.aborted) {
        // Incluir coords originales para tracking en el servidor
        this.sendToMaster({ type: 'paint_result', ok: !!res?.success, status: res?.status || 0, tileX, tileY, coords, painted: res?.painted || 0, requestId, batchId });
        
        // Enviar métricas de píxeles pintados si fue exitoso
        if (res?.success && res?.painted > 0) {
          try {
            const { pixelsPainted } = await import('../core/metrics/client.js');
            await pixelsPainted(res.painted, {
              botVariant: 'auto-slave',
              metadata: {
                slaveId: this.slaveId,
                mode: this.currentMode,
                tileX,
                tileY,
                batchId
              }
            });
          } catch (error) {
            // Silencioso para no interrumpir el flujo
          }
        }
      }
    } catch (err) {
      log(`❌ Error en handlePaintBatch: ${err?.message || err}`);
      this.sendToMaster({ type: 'paint_result', ok: false, error: String(err?.message || err), tileX: message?.tileX, tileY: message?.tileY, coords: message?.coords, painted: 0, requestId: message?.requestId, batchId: message?.batchId });
    }
  }

  // NUEVO: procesa una orden de reparación genérica agrupando por tile y usando handlePaintBatch
  async handleRepairOrder(message) {
    log(`🔧 Procesando orden de reparación: ${message.total_repairs} píxeles`);
    try {
      const { coords, colors, source } = message || {};
      if (!Array.isArray(coords) || !Array.isArray(colors) || coords.length !== colors.length) {
        log('❌ Orden de reparación inválida: coordenadas y colores no coinciden');
        return;
      }

      // Aviso de recepción
      this.sendToMaster({ type: 'repair_ack', total_repairs: coords.length, source });

      // Agrupar por tile para usar la API /s0/pixel/{tileX}/{tileY}
      const TILE = GUARD_DEFAULTS?.TILE_SIZE || 1000;
      const byTile = new Map(); // key "tx,ty" -> { tileX, tileY, coords: [{x,y}], colors: number[] }

      for (let i = 0; i < coords.length; i++) {
        const c = coords[i] || {};
        const col = colors[i];
        const gx = Math.trunc(c.x);
        const gy = Math.trunc(c.y);
        const tileX = Math.floor(gx / TILE);
        const tileY = Math.floor(gy / TILE);
        const lx = gx - tileX * TILE; // coord local dentro del tile [0..TILE)
        const ly = gy - tileY * TILE;
        const key = `${tileX},${tileY}`;
        if (!byTile.has(key)) byTile.set(key, { tileX, tileY, coords: [], colors: [] });
        const bucket = byTile.get(key);
        bucket.coords.push({ x: lx, y: ly });
        bucket.colors.push(col);
      }

      // Procesar tile por tile en pequeños lotes para no saturar
      const CHUNK = 50; // sub-lotes por tile; handlePaintBatch internamente trocea a 200
      let completed = 0;
      const total = coords.length;

      for (const [, group] of byTile) {
        if (this.abortPainting === true) {
          log('⏹️ Reparación abortada por Stop');
          break;
        }
        const { tileX, tileY, coords: lc, colors: cols } = group;
        for (let i = 0; i < lc.length; i += CHUNK) {
          if (this.abortPainting === true) { log('⏹️ Reparación abortada durante sub-lote'); break; }
          const partCoords = lc.slice(i, i + CHUNK);
          const partColors = cols.slice(i, i + CHUNK);
          const batchMsg = { tileX, tileY, coords: partCoords, colors: partColors };
          await this.handlePaintBatch(batchMsg);
          completed += partCoords.length;
          this.sendToMaster({ type: 'repair_progress', completed, total, source });
          log(`🎨 Progreso de reparación: ${completed}/${total}`);
          
          // Enviar métricas de píxeles reparados
          try {
            const { pixelsRepaired } = await import('../core/metrics/client.js');
            await pixelsRepaired(partCoords.length, {
              botVariant: 'auto-slave',
              metadata: {
                slaveId: this.slaveId,
                mode: this.currentMode,
                source,
                tileX,
                tileY,
                progress: `${completed}/${total}`
              }
            });
          } catch (error) {
            // Silencioso para no interrumpir el flujo
          }
          
          // Pequeña pausa para respiración de red/servidor
          await new Promise(r => setTimeout(r, 200));
        }
        if (this.abortPainting === true) break;
      }

      if (this.abortPainting === true) {
        this.sendToMaster({ type: 'repair_error', error: 'aborted', source });
        log('⏹️ Orden de reparación abortada');
      } else {
        this.sendToMaster({ type: 'repair_complete', completed, source });
        log(`✅ Orden de reparación completada: ${completed} píxeles reparados`);
      }
    } catch (err) {
      log(`❌ Error procesando orden de reparación: ${err?.message || err}`);
      this.sendToMaster({ type: 'repair_error', error: String(err?.message || err), source: message?.source });
    }
  }

  async setMode(mode) {
    try {
  // Normalizar modo recibido (puede venir en minúsculas desde la UI)
  mode = this.normalizeMode(mode);
      log(`🎯 Configurando modo: ${mode}`);
      this.currentMode = mode;
      
      // Detener bot actual si está ejecutándose
      if (this.currentBot && this.isRunning) {
        await this.stopCurrentBot();
      }
      
      // Inicializar el bot apropiado
      this.initializeBot(mode);
      
      this.sendToMaster({
        type: 'status',
        status: 'mode_set',
        mode: mode
      });
      
      this.updateUI();
      
    } catch (error) {
      log(`❌ Error configurando modo: ${error}`);
      this.sendToMaster({
        type: 'status',
        status: 'error',
        error: error.message
      });
    }
  }

  initializeBot(mode) {
  mode = this.normalizeMode(mode);
    switch (mode) {
      case 'Image':
        this.currentBot = {
          start: async () => {
            log('🎨 Iniciando bot de imagen...');
            window.__wplaceBot = { ...window.__wplaceBot, imageRunning: true };
            try { await prepareTokensForBot('Image'); } catch {}
            await runImage();
          },
          stop: () => {
            log('⏹️ Deteniendo bot de imagen');
            if (window.__wplaceBot) {
              window.__wplaceBot.imageRunning = false;
            }
          },
          pause: () => log('⏸️ Bot de imagen pausado'),
          getTelemetry: () => this.getImageTelemetry()
        };
        break;
        
      case 'Guard':
        this.currentBot = {
          start: async () => {
            // Headless guard: no UI, solo análisis y reparación vía órdenes externas
            log('🛡️ Iniciando Guard headless (sin UI)...');
            window.__wplaceBot = { ...window.__wplaceBot, guardRunning: true };
            try { await prepareTokensForBot('Guard'); } catch {}
            // Asegurar guardState básico sin lanzar UI completa
            try {
              if (typeof window !== 'undefined' && !window.guardState) {
                const mod = await import('../guard/config.js');
                window.guardState = mod.guardState;
              }
              // Intentar detectar colores para permitir análisis
                  await ensureGuardColors();
              log(`🎨 Colores headless disponibles: ${window.guardState?.availableColors?.length || 0}`);
            } catch (e) {
              log('⚠️ Error inicializando Guard headless:', e);
            }
          },
          stop: () => {
            log('⏹️ Deteniendo bot guardián');
            if (window.__wplaceBot) {
              window.__wplaceBot.guardRunning = false;
            }
          },
          pause: () => log('⏸️ Bot guardián pausado'),
          getTelemetry: () => this.getGuardTelemetry()
        };
        break;
        
      case 'Farm':
        this.currentBot = {
          start: async () => {
            log('🌾 Iniciando bot de farming...');
            window.__wplaceBot = { ...window.__wplaceBot, farmRunning: true };
            try { await prepareTokensForBot('Farm'); } catch {}
            await runFarm();
          },
          stop: () => {
            log('⏹️ Deteniendo bot de farming');
            if (window.__wplaceBot) {
              window.__wplaceBot.farmRunning = false;
            }
          },
          pause: () => log('⏸️ Bot de farming pausado'),
          getTelemetry: () => this.getFarmTelemetry()
        };
        break;
    }
  }

  normalizeMode(mode) {
    if (!mode || typeof mode !== 'string') return mode;
    const m = mode.toLowerCase();
    if (m === 'guard') return 'Guard';
    if (m === 'image' || m === 'painter' || m === 'overlay') return 'Image';
    if (m === 'farm') return 'Farm';
    return mode; // devolver tal cual si no coincidió
  }

  async loadProject(config) {
    log('📋 Cargando configuración del proyecto');
    this.projectConfig = config;
    
    if (this.currentBot && this.currentBot.loadConfig) {
      this.currentBot.loadConfig(config);
    }
    
    this.sendToMaster({
      type: 'status',
      status: 'project_loaded'
    });
    
    // Si es favorito y está en modo Guard, enviar datos de preview
    if (this.isFavorite && this.currentMode === 'Guard') {
      // Esperar un poco para que el Guard procese el archivo
      setTimeout(async () => {
        const previewData = await modularGetPreviewData();
        const enriched = this.augmentPreview(previewData);
        if (enriched) {
          this.sendToMaster({ type: 'preview_data', data: enriched });
          log('📊 Datos de preview enviados al servidor');
        }
      }, 1000);
    }
  }

  assignChunk(chunk) {
    log(`📦 Chunk asignado: ${JSON.stringify(chunk)}`);
    
    if (this.currentBot && this.currentBot.assignChunk) {
      this.currentBot.assignChunk(chunk);
    }
  }

  handleControl(action) {
    log(`🎮 Acción de control: ${action}`);
    
    switch (action) {
      case 'start':
        this.startBot();
        break;
      case 'pause':
        this.pauseBot();
        break;
      case 'stop':
        this.stopBot();
        break;
    }
  }

  async startBot() {
    if (!this.currentBot) {
      log('❌ No hay bot cargado');
      return;
    }
    
    try {
  try { await prepareTokensForBot(this.currentMode || 'Bot'); } catch {}
      this.isRunning = true;
      await this.currentBot.start();
      
      this.sendToMaster({
        type: 'status',
        status: 'running'
      });
      
      this.updateUI();
    } catch (error) {
      log(`❌ Error iniciando bot: ${error}`);
      this.isRunning = false;
      this.updateUI();
    }
  }

  // Normaliza entradas como "host" o "host:puerto" a ws(s)://host/ws/slave
  normalizeWsUrl(raw) {
    try {
      if (!raw) return '';
      let v = String(raw).trim();
      // http(s) -> ws(s)
      v = v.replace(/^http:\/\//i, 'ws://').replace(/^https:\/\//i, 'wss://');
      // Añadir esquema si falta
      if (!/^[a-z]+:\/\//i.test(v)) {
        const scheme = (typeof window !== 'undefined' && window.location?.protocol === 'https:') ? 'wss://' : 'ws://';
        v = scheme + v;
      }
      // Asegurar ruta por defecto si solo host[:puerto]
      try {
        const u = new URL(v);
        if (!u.pathname || u.pathname === '/') {
          u.pathname = '/ws/slave';
          v = u.toString();
        }
      } catch {}
      return v;
    } catch { return raw; }
  }

  pauseBot() {
    if (!this.currentBot || !this.isRunning) {
      log('❌ No hay bot ejecutándose');
      return;
    }
    
    this.isRunning = false;
    this.currentBot.pause();
    
    this.sendToMaster({
      type: 'status',
      status: 'paused'
    });
    
    this.updateUI();
  }

  stopBot() {
    if (!this.currentBot) {
      log('❌ No hay bot cargado');
      return;
    }
  // Señal de aborto para pintura en curso
  this.abortPainting = true;
    this.isRunning = false;
    this.currentBot.stop();
    
    this.sendToMaster({
      type: 'status',
      status: 'stopped'
    });
    
    this.updateUI();
  }

  async stopCurrentBot() {
    if (this.currentBot && this.isRunning) {
  // Abort any ongoing paint
  this.abortPainting = true;
      this.isRunning = false;
      this.currentBot.stop();
    }
  }

  startTelemetryLoop() {
    // Evitar múltiples intervalos
    if (this.telemetryInterval) {
      clearInterval(this.telemetryInterval);
    }
    
    this.telemetryInterval = setInterval(async () => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        await this.updateTelemetry();
        this.sendTelemetry();
        
        // Enviar session_ping para mantener métricas de usuarios activos
        try {
          await sessionPing({ 
            botVariant: 'auto-slave',
            metadata: { 
              slaveId: this.slaveId,
              currentMode: this.currentMode,
              isRunning: this.isRunning,
              telemetry: this.telemetryData
            }
          });
        } catch (error) {
          // Silencioso para evitar spam en logs
        }
      }
    }, SLAVE_CONFIG.TELEMETRY_INTERVAL);
  }

  async updateTelemetry() {
    if (this.currentBot && this.currentBot.getTelemetry) {
      const botTelemetry = this.currentBot.getTelemetry();
      this.telemetryData = { ...this.telemetryData, ...botTelemetry };
    }
    
    // Para el modo Guard, obtener datos específicos de telemetría
    if (this.currentMode === 'Guard') {
      const guardTelemetry = this.getGuardTelemetry();
      this.telemetryData = { ...this.telemetryData, ...guardTelemetry };
    }
    
    // Obtener cargas (restantes y máximas) desde la API de WPlace
    const ci = await this.getChargeInfo();
    this.telemetryData.remaining_charges = ci.remaining;
    this.telemetryData.max_charges = ci.max;
  }

  async getChargeInfo() {
    try {
      const sessionResult = await getSession();
      if (sessionResult.success) {
        const remaining = Math.floor(sessionResult.data.charges || 0);
        const max = Math.floor(sessionResult.data.maxCharges || 0);
        return { remaining, max };
      }
    } catch (error) {
      log('❌ Error obteniendo cargas desde API:', error);
    }
    return { remaining: 0, max: 0 };
  }

  getImageTelemetry() {
    // Integrar con telemetría real del bot de imagen
    return {
      repaired_pixels: Math.floor(Math.random() * 100),
      missing_pixels: Math.floor(Math.random() * 50),
      absent_pixels: Math.floor(Math.random() * 25)
    };
  }

  getGuardTelemetry() {
    // Obtener datos reales de análisis de Guard si está disponible
    if (typeof window !== 'undefined' && window.guardState) {
      const guardState = window.guardState;
      
      // Calcular estadísticas reales basadas en el estado actual de Guard
      const totalPixels = guardState.originalPixels ? guardState.originalPixels.size : 0;
      const changedPixels = guardState.changes ? guardState.changes.size : 0;
      const repairedPixels = guardState.totalRepaired || 0;
      const accuracy = totalPixels > 0 ? (((totalPixels - changedPixels) / totalPixels) * 100).toFixed(1) : '0.0';
      
      return {
        mode: 'guard',
        pixelsFixed: repairedPixels,
        pixelsMissing: changedPixels,
        totalPixels: totalPixels,
        accuracy: accuracy + '%',
  correctPixels: totalPixels - changedPixels, // estimado rápido
  incorrectPixels: changedPixels, // sin diferenciar missing vs incorrect aquí todavía
  missingPixels: 0, // se rellenará tras análisis detallado preview
        protectedArea: guardState.protectionArea || null,
        status: guardState.running ? (guardState.watchMode ? 'watching' : 'protecting') : 'stopped',
        charges: Math.floor(guardState.currentCharges || 0),
        maxCharges: guardState.maxCharges || 0,
        lastCheck: guardState.lastCheck || 0,
        isVirtualArea: guardState.isVirtualArea || false
      };
    }
    
    // Fallback a datos simulados si Guard no está disponible
    return {
      mode: 'guard',
      pixelsFixed: 0,
      pixelsMissing: 0,
      totalPixels: 0,
      accuracy: '0.0%',
  correctPixels: 0,
  incorrectPixels: 0,
  missingPixels: 0,
      protectedArea: null,
      status: 'unavailable',
      charges: 0,
      maxCharges: 0,
      lastCheck: 0,
      isVirtualArea: false
    };
  }

  getFarmTelemetry() {
    // Integrar con telemetría real del bot de farming
    return {
      repaired_pixels: Math.floor(Math.random() * 500),
      missing_pixels: 0,
      absent_pixels: 0
    };
  }

  async sendTelemetry() {
    let telemetryData = { ...this.telemetryData };
    
    // Si este slave es favorito y está en modo Guard, agregar datos de preview
    if (this.isFavorite && this.currentMode === 'Guard') {
      telemetryData.previewData = await modularGetPreviewData();
      // Añadir availableColors a la telemetría para persistencia inicial
      try {
        telemetryData.previewData = this.augmentPreview(telemetryData.previewData);
      } catch {}
      if (telemetryData.previewData && telemetryData.previewData.analysis) {
        const a = telemetryData.previewData.analysis;
        // Rellenar métricas detalladas para panel realtime
        telemetryData.correctPixels = a.correctPixels ?? a.correct ?? telemetryData.correctPixels;
        telemetryData.incorrectPixels = a.incorrectPixels ?? a.incorrect ?? telemetryData.incorrectPixels;
        telemetryData.missingPixels = a.missingPixels ?? a.missing ?? telemetryData.missingPixels;
        telemetryData.totalPixels = telemetryData.previewData.totalPixels || telemetryData.totalPixels;
      }
    }
    
    this.sendToMaster({
      type: 'telemetry',
      data: telemetryData
    });
  }

  sendToMaster(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        // DEBUGGING: Log detallado del envío de mensajes
        const messageStr = JSON.stringify(message);
        const messageSize = new Blob([messageStr]).size;
        
        log(`📤 [DEBUG] Enviando mensaje al master:`);
        log(`🔍 [DEBUG] Type: ${message.type || 'no-type'}`);
        log(`🔍 [DEBUG] Message size: ${(messageSize / 1024).toFixed(2)} KB`);
        
        if (messageSize > 1024 * 1024) { // > 1MB
          log(`⚠️ [DEBUG] MENSAJE GRANDE detectado: ${(messageSize / 1024 / 1024).toFixed(2)} MB`);
        }
        
        // Log específico para diferentes tipos de mensajes
        if (message.type === 'preview_data' && message.data) {
          const data = message.data;
          log(`🔍 [DEBUG] Preview data - keys: [${Object.keys(data).join(', ')}]`);
          if (data.pixels && Array.isArray(data.pixels)) {
            log(`🔍 [DEBUG] Pixels array length: ${data.pixels.length}`);
          }
          if (data.previewData) {
            log(`🔍 [DEBUG] Preview data nested present`);
          }
        }
        
        if (message.type === 'repair_suggestion' && message.pixels) {
          log(`🔍 [DEBUG] Repair suggestion - pixels: ${message.pixels.length}, totalDiffs: ${message.totalDiffs}`);
        }
        
        if (message.type === 'telemetry' && message.data) {
          const telemetryKeys = Object.keys(message.data);
          log(`🔍 [DEBUG] Telemetry data - keys: [${telemetryKeys.join(', ')}]`);
        }
        
        // Verificar si podría necesitar compresión
        if (messageSize > 5 * 1024 * 1024) { // > 5MB threshold
          log(`⚠️ [DEBUG] Mensaje excede threshold de compresión (5MB): ${(messageSize / 1024 / 1024).toFixed(2)} MB`);
        }
        
        const { json } = maybeCompressMessage(message);
        const compressedSize = new Blob([json]).size;
        
        if (compressedSize !== messageSize) {
          log(`🗜️ [DEBUG] Compresión aplicada: ${(messageSize / 1024).toFixed(2)} KB → ${(compressedSize / 1024).toFixed(2)} KB (ratio: ${(compressedSize/messageSize*100).toFixed(1)}%)`);
        }
        
        this.ws.send(json);
        log(`✅ [DEBUG] Mensaje enviado exitosamente`);
        
      } catch (e) {
        log(`❌ [DEBUG] Error en sendToMaster (trying compression):`);
        log(`🔍 [DEBUG] Error: ${e.message}`);
        log(`🔍 [DEBUG] Stack: ${e.stack}`);
        
        // Fallback plano
        try { 
          log(`🔄 [DEBUG] Intentando fallback sin compresión...`);
          const fallbackStr = JSON.stringify(message);
          const fallbackSize = new Blob([fallbackStr]).size;
          log(`🔍 [DEBUG] Fallback message size: ${(fallbackSize / 1024).toFixed(2)} KB`);
          
          if (fallbackSize > 16 * 1024 * 1024) { // > 16MB (likely to fail)
            log(`⚠️ [DEBUG] FALLBACK MENSAJE MUY GRANDE: ${(fallbackSize / 1024 / 1024).toFixed(2)} MB - probable fallo`);
          }
          
          this.ws.send(fallbackStr);
          log(`✅ [DEBUG] Fallback enviado exitosamente`);
        } catch (fallbackError) {
          log(`❌ [DEBUG] Error en fallback también:`);
          log(`🔍 [DEBUG] Fallback error: ${fallbackError.message}`);
        }
      }
    } else {
      log(`❌ [DEBUG] Cannot send to master - WebSocket not ready:`);
      log(`🔍 [DEBUG] ReadyState: ${this.ws?.readyState}`);
      log(`🔍 [DEBUG] Message type: ${message?.type || 'unknown'}`);
      
      // ReadyState meanings
      const readyStateMessages = {
        0: 'CONNECTING',
        1: 'OPEN', 
        2: 'CLOSING',
        3: 'CLOSED'
      };
      
      if (this.ws?.readyState !== undefined) {
        log(`🔍 [DEBUG] ReadyState significado: ${readyStateMessages[this.ws.readyState] || 'UNKNOWN'}`);
      }
    }
  }

  setUI(ui) {
    this.ui = ui;
  }
  
  updateUI() {
    if (this.ui && this.ui.updateStatus) {
      this.ui.updateStatus({
        connectionStatus: this.connectionStatus,
        slaveId: this.slaveId,
        currentMode: this.currentMode,
        isRunning: this.isRunning,
        telemetryData: this.telemetryData
      });
    }
  }

  disconnect() {
  this.manualDisconnect = true;
  
  // Enviar métricas de fin de sesión
  try {
    sessionEnd({
      botVariant: 'auto-slave',
      metadata: {
        slaveId: this.slaveId,
        mode: this.currentMode,
        disconnectReason: 'manual'
      }
    });
  } catch (error) {
    // Silencioso para no interrumpir el flujo
  }
  
  if (this.ws) {
      this.ws.close();
    }
    
    // Limpiar intervalo de telemetría
    if (this.telemetryInterval) {
      clearInterval(this.telemetryInterval);
      this.telemetryInterval = null;
    }
    
    // Limpiar intervalo de ping de métricas
    if (window.__wplaceMetrics?.slavePingInterval) {
      clearInterval(window.__wplaceMetrics.slavePingInterval);
      window.__wplaceMetrics.slavePingInterval = null;
      window.__wplaceMetrics.slaveSessionActive = false;
    }
    
    this.connectionStatus = 'disconnected';
    this.updateUI();
  // Resetear flag tras corto tiempo para permitir futuras reconexiones automáticas
  setTimeout(() => { this.manualDisconnect = false; }, 500);
  }
}

// Función principal para ejecutar el modo slave
export async function runSlave() {
  log('🚀 Iniciando WPlace Slave (versión modular)');
  
  // Inicializar sistema de idiomas
  initializeLanguage();
  
  // Inicializar o preservar el estado global
  window.__wplaceBot = { ...window.__wplaceBot, slaveRunning: true };
  
  try {
    // Crear instancia del slave
    const slave = new WPlaceSlave();
    
    // Crear interfaz de usuario
    const ui = createSlaveUI({
      onConnect: async (masterUrl) => {
        await slave.init(masterUrl);
      },
      onDisconnect: () => {
        slave.disconnect();
      },
      onClose: () => {
        log('👋 Cerrando slave');
        slave.disconnect();
        window.__wplaceBot.slaveRunning = false;
      }
    });
    
    // Conectar UI con slave
    slave.setUI(ui);
    
    // Hacer accesible globalmente para debugging
    window.__wplaceSlave = slave;
    
    log('✅ Slave inicializado correctamente');
    
    // Cleanup al cerrar la página (alineado con otros bots)
    window.addEventListener('beforeunload', () => {
      try { slave.disconnect(); } catch {}
      if (window.__wplaceBot) {
        window.__wplaceBot.slaveRunning = false;
      }
      // Limpiar métricas si quedaron activas
      try {
        if (window.__wplaceMetrics?.slavePingInterval) {
          clearInterval(window.__wplaceMetrics.slavePingInterval);
          window.__wplaceMetrics.slavePingInterval = null;
        }
        if (window.__wplaceMetrics?.slaveSessionActive) {
          sessionEnd({ botVariant: 'auto-slave' });
          window.__wplaceMetrics.slaveSessionActive = false;
        }
      } catch {}
    }, { once: true });
    
    
  } catch (error) {
    log('❌ Error inicializando Slave:', error);
    window.__wplaceBot.slaveRunning = false;
    try { 
      trackEvent('error', { 
        botVariant: 'slave', 
        metadata: { message: String(error?.message || error) } 
      }); 
    } catch {}
    throw error;
  }
}